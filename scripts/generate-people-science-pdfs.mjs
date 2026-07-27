#!/usr/bin/env node
/**
 * CAD-11976 — generate the People Science leave-behind PDFs.
 *
 * Prints the built Astro pages (dist/) to PDF with Chrome so the PDF is the
 * same content the site serves: anchor citations, availability labels, and
 * reference lists all come straight from the rendered article. Site chrome
 * (nav, footer, breadcrumb, download CTA) is stripped by the @media print
 * rules in public/css/cadence.css + src/layouts/ArticleLayout.astro.
 *
 *   npm run build && npm run pdf:people-science
 *
 * Output: public/pdf/<slug>.pdf — one per article, wired to each page via the
 * `pdf:` frontmatter key that ArticleLayout renders as the Download CTA.
 */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(ROOT, 'public', 'pdf');

/** Hub first, then the 12 spokes in the published Tier 1 → 3 order. */
const SLUGS = [
  'people-science',
  'manager-effect',
  'continuous-performance-management',
  'organizational-justice-fair-process',
  'feedback-that-doesnt-backfire',
  'employee-recognition-science',
  'goal-setting-theory-practice',
  'people-analytics-without-dashboard-theater',
  'role-clarity-job-architecture',
  'management-by-proximity-is-dead',
  'can-ai-be-fair',
  'compounding-organization',
  'people-science-glossary',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
};

function serveDist() {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let filePath = path.join(DIST, decodeURIComponent(url.pathname));
    if (!filePath.startsWith(DIST)) return res.writeHead(403).end();
    if (!existsSync(filePath) && existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;
    try {
      const body = await readFile(filePath);
      res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

const footerTemplate = `
  <div style="width:100%;font-family:Inter,Helvetica,Arial,sans-serif;font-size:7pt;color:#526174;
              padding:0 16mm;display:flex;justify-content:space-between;">
    <span>cadencehr.ai &middot; Management by design, not by luck.</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const server = await serveDist();
  const { port } = server.address();
  const browser = await puppeteer.launch({ headless: 'new' });
  let failures = 0;

  try {
    for (const slug of SLUGS) {
      const page = await browser.newPage();
      // Local dist + webfonts only; analytics has no place in a printed asset.
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const host = new URL(request.url()).hostname;
        const allowed = host === '127.0.0.1' || host.endsWith('googleapis.com') || host.endsWith('gstatic.com');
        return allowed ? request.continue() : request.abort();
      });
      const url = `http://127.0.0.1:${port}/resources/${slug}.html`;
      const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });
      if (!response || response.status() !== 200) {
        console.error(`✗ ${slug}: HTTP ${response ? response.status() : 'no response'}`);
        failures += 1;
        await page.close();
        continue;
      }
      // Google Fonts is remote; fall back to the local stack rather than hang.
      await page.evaluateHandle('document.fonts.ready');
      await page.emulateMediaType('print');
      const outPath = path.join(OUT_DIR, `${slug}.pdf`);
      await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        displayHeaderFooter: true,
        // Chrome falls back to its default footer (the localhost build URL) if
        // displayHeaderFooter is on and no template is supplied. Always pass both.
        headerTemplate: '<span></span>',
        footerTemplate,
        margin: { top: '14mm', bottom: '16mm', left: '16mm', right: '16mm' },
      });
      const title = await page.title();
      console.log(`✓ ${slug}.pdf — ${title}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures) {
    console.error(`\n${failures} page(s) failed to render.`);
    process.exit(1);
  }
  console.log(`\n${SLUGS.length} PDFs written to public/pdf/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
