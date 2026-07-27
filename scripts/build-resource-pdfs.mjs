/**
 * CAD-11976 — People Science leave-behind PDF generator.
 *
 * Generates one branded, print-ready PDF per People Science pillar page (hub +
 * 12 spokes) from the SAME markdown that renders the live page, so a PDF can
 * never drift from published content. Content rules live in scripts/lib/pillar-pdf.mjs.
 *
 * Printing goes through the DevTools protocol rather than `--print-to-pdf`
 * because Chromium ≥149 ignores `--print-to-pdf-no-header` and stamps the local
 * `file://` path and the build timestamp into every page footer — a leak in a
 * customer-facing asset. `Page.printToPDF` with displayHeaderFooter:false is the
 * only reliable way to suppress it.
 *
 * Usage:  npm run build:pdfs        (needs a local Chromium; CHROMIUM_BIN overrides)
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { discoverPillarPages, PDF_DIR, renderPageHtml } from './lib/pillar-pdf.mjs';

const chromiumPath = process.env.CHROMIUM_BIN || '/opt/homebrew/bin/chromium';
// Fixed so regenerating unchanged content produces byte-identical PDFs.
const FIXED_PDF_DATE = "D:20260727000000+00'00'";

if (!existsSync(chromiumPath)) {
  throw new Error(`Chromium not found at ${chromiumPath}. Set CHROMIUM_BIN to a local Chromium binary.`);
}

/* ------------------------------------------------------------------ devtools */

async function launchChromium(userDataDir) {
  const child = spawn(
    chromiumPath,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );

  // Chromium prints the chosen debugging port to stderr on startup.
  const wsUrl = await new Promise((resolvePort, reject) => {
    let buffered = '';
    const timer = setTimeout(() => reject(new Error('Chromium did not report a DevTools endpoint')), 30_000);
    child.stderr.on('data', (chunk) => {
      buffered += chunk;
      const match = buffered.match(/ws:\/\/[^\s]+/);
      if (match) {
        clearTimeout(timer);
        resolvePort(match[0]);
      }
    });
    child.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Chromium exited early (code ${code})`));
    });
  });

  return { child, wsUrl };
}

/** Minimal CDP client: one browser socket, flattened session per page. */
function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const waiters = [];
  let nextId = 0;

  const ready = new Promise((resolveOpen, reject) => {
    socket.addEventListener('open', resolveOpen, { once: true });
    socket.addEventListener('error', () => reject(new Error('DevTools socket error')), { once: true });
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== undefined && pending.has(message.id)) {
      const { resolve: done, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(`${message.error.message} (${JSON.stringify(message.error.data ?? '')})`));
      else done(message.result);
      return;
    }
    for (let i = waiters.length - 1; i >= 0; i -= 1) {
      if (waiters[i].method === message.method && (!waiters[i].sessionId || waiters[i].sessionId === message.sessionId)) {
        waiters.splice(i, 1)[0].resolve(message.params);
      }
    }
  });

  return {
    ready,
    send(method, params = {}, sessionId) {
      const id = (nextId += 1);
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
      });
    },
    once(method, sessionId) {
      return new Promise((resolve) => waiters.push({ method, sessionId, resolve }));
    },
    close() {
      socket.close();
    },
  };
}

/* ---------------------------------------------------------------------- main */

const userDataDir = mkdtempSync(join(tmpdir(), 'cadence-pdf-'));
const htmlDir = mkdtempSync(join(tmpdir(), 'cadence-pdf-html-'));


// Spot-render knobs (evidence/debugging): PDF_ONLY=<slug>, PDF_PAGE_RANGES=5-5,
// PDF_OUT_DIR=<dir>. Unset in normal builds, which regenerate every pillar PDF.
const onlySlug = process.env.PDF_ONLY;
const pageRanges = process.env.PDF_PAGE_RANGES;
const outDir = process.env.PDF_OUT_DIR ? resolve(process.env.PDF_OUT_DIR) : PDF_DIR;

const pages = discoverPillarPages().filter((page) => !onlySlug || page.slug === onlySlug);
if (pages.length === 0) throw new Error(`No pillar page matched PDF_ONLY=${onlySlug}`);
mkdirSync(outDir, { recursive: true });
const { child, wsUrl } = await launchChromium(userDataDir);
const cdp = connect(wsUrl);
await cdp.ready;

try {
  for (const page of pages) {
    const htmlPath = join(htmlDir, `${page.slug}.html`);
    writeFileSync(htmlPath, renderPageHtml(page));

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    await cdp.send('Page.enable', {}, sessionId);
    const loaded = cdp.once('Page.loadEventFired', sessionId);
    await cdp.send('Page.navigate', { url: `file://${htmlPath}` }, sessionId);
    await loaded;
    await sleep(150); // let webfont/layout settle before paginating

    const { data } = await cdp.send(
      'Page.printToPDF',
      {
        printBackground: true,
        displayHeaderFooter: false, // no local path / timestamp stamped into the asset
        preferCSSPageSize: true, // honour the @page rule in the document
        generateTaggedPDF: false,
        ...(pageRanges ? { pageRanges } : {}),
      },
      sessionId
    );
    await cdp.send('Target.closeTarget', { targetId });

    const pdfPath = join(outDir, `${page.slug}.pdf`);
    rmSync(pdfPath, { force: true });
    const bytes = Buffer.from(data, 'base64')
      .toString('latin1')
      .replace(/\/CreationDate \(D:\d{14}[^)]*\)/, `/CreationDate (${FIXED_PDF_DATE})`)
      .replace(/\/ModDate \(D:\d{14}[^)]*\)/, `/ModDate (${FIXED_PDF_DATE})`);
    writeFileSync(pdfPath, bytes, 'latin1');

    console.log(`  ✓ ${page.slug}.pdf`);
  }
} finally {
  cdp.close();
  child.kill();
  rmSync(userDataDir, { recursive: true, force: true });
  rmSync(htmlDir, { recursive: true, force: true });
}

console.log(`Wrote ${pages.length} PDF(s) to ${outDir}`);
