/**
 * CAD-11976 — CI guard for the People Science leave-behind PDFs.
 *
 * Runs without a browser, so it can gate every PR: it re-renders the print HTML
 * from the live markdown (same module the generator uses) and asserts the
 * committed PDF for each pillar page exists and is clean.
 *
 * Catches the three ways this asset set can rot:
 *   1. a pillar page ships with no PDF, or with no download link wired;
 *   2. internal working notes (frontmatter, SEO metadata, DRAFT status) leak
 *      into a customer-facing document;
 *   3. a PDF is regenerated with headers/footers on, stamping the builder's
 *      local file path into the asset.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { discoverPillarPages, PDF_DIR, PDF_URL_PREFIX, renderPageHtml } from './lib/pillar-pdf.mjs';

// Substrings that must never appear in a rendered document or a shipped PDF.
const FORBIDDEN_IN_DOCUMENT = [
  'funnel-stage',
  'target-query',
  'meta-description',
  'SEO metadata',
  'layout: ../',
  'DRAFT —',
  'pending Cortana QA',
];
const FORBIDDEN_IN_PDF_BYTES = ['file:///', '/Users/', 'CortanaShare'];
const MIN_PDF_BYTES = 50_000;

const failures = [];
const pages = discoverPillarPages();

for (const page of pages) {
  const where = `${page.slug}`;
  const expectedPdfPath = `${PDF_URL_PREFIX}/${page.slug}.pdf`;

  // 1. The live page must link its own PDF (ArticleLayout renders the CTA from this).
  if (page.meta.pdf !== expectedPdfPath) {
    failures.push(`${where}: frontmatter \`pdf\` is ${page.meta.pdf ?? '(missing)'}, expected ${expectedPdfPath}`);
  }

  // 2. Rendered document content must be clean and fully converted.
  const html = renderPageHtml(page);
  for (const needle of FORBIDDEN_IN_DOCUMENT) {
    if (html.includes(needle)) failures.push(`${where}: internal marker "${needle}" leaked into the PDF document`);
  }
  if (/\[\[\d+\]\]/.test(html)) failures.push(`${where}: unconverted citation markup ([[n]]) in the document`);
  if (/\]\(https?:/.test(html)) failures.push(`${where}: unconverted markdown link in the document`);

  const cited = [...html.matchAll(/href="#ref-(\d+)"/g)].map((m) => m[1]);
  if (cited.length === 0) failures.push(`${where}: no visible numbered citations rendered`);
  for (const id of new Set(cited)) {
    if (!html.includes(`id="ref-${id}"`)) failures.push(`${where}: citation [${id}] has no matching reference anchor`);
  }
  if (!html.includes('id="references-heading"')) failures.push(`${where}: no References section rendered`);

  // 3. The committed PDF must exist and carry no builder-local path.
  const pdfPath = join(PDF_DIR, `${page.slug}.pdf`);
  if (!existsSync(pdfPath)) {
    failures.push(`${where}: missing PDF at public${expectedPdfPath} — run \`npm run build:pdfs\``);
    continue;
  }
  const bytes = readFileSync(pdfPath, 'latin1');
  if (!bytes.startsWith('%PDF-')) failures.push(`${where}: PDF has no %PDF header`);
  if (!bytes.trimEnd().endsWith('%%EOF')) failures.push(`${where}: PDF is truncated (no %%EOF)`);
  if (statSync(pdfPath).size < MIN_PDF_BYTES) failures.push(`${where}: PDF is implausibly small`);
  for (const needle of FORBIDDEN_IN_PDF_BYTES) {
    if (bytes.includes(needle)) failures.push(`${where}: PDF embeds a local path ("${needle}") — regenerate with headers off`);
  }
}

if (failures.length > 0) {
  console.error('People Science PDF asset check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`People Science PDF asset check passed (${pages.length} pillar pages, ${pages.length} PDFs).`);
