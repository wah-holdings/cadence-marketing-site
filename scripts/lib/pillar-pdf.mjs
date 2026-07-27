/**
 * CAD-11976 — shared renderer for People Science leave-behind PDFs.
 *
 * Turns a pillar page's markdown into the print-ready HTML that Chromium
 * prints. Kept separate from the build script so the CI guard
 * (scripts/check-pdf-assets.mjs) can assert against the exact same HTML
 * without shelling out to a browser.
 *
 * Hard rules enforced here (CAD-9245 + AGENTS.md):
 *   - frontmatter and any internal SEO-metadata blockquote are stripped, so no
 *     internal working note can reach a customer-facing asset;
 *   - anchor citations ([[7]](#ref-7)) render as VISIBLE numbered citations
 *     linked to the numbered reference list;
 *   - body copy — including availability labels — is carried verbatim.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const PAGES_DIR = resolve(siteRoot, 'src/pages/resources');
export const PDF_DIR = resolve(siteRoot, 'public/resources/pdf');
export const PDF_URL_PREFIX = '/resources/pdf';

// Pillar pages only: the hub (pillar-credibility) and its 12 spokes (pillar-spoke).
const PILLAR_STAGES = new Set(['pillar-credibility', 'pillar-spoke']);

/* ---------------------------------------------------------------- frontmatter */

export function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---\n', 3);
  if (end === -1) return { meta: {}, body: raw };
  const block = raw.slice(4, end);
  const body = raw.slice(end + 5);

  // Only the scalar keys this script needs; the FAQ list is intentionally ignored.
  const meta = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^([a-zA-Z-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value) meta[m[1]] = value;
  }
  return { meta, body };
}

/** Internal working notes must never reach a customer-facing asset. */
function stripInternalNotes(body) {
  return body
    .split('\n')
    .filter((line) => !/^>\s*_?SEO metadata/i.test(line.trim()))
    .join('\n');
}

/* ----------------------------------------------------------------- inline pass */

const PH = String.fromCharCode(0); // sentinel: cannot occur in markdown, survives HTML escaping

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function inline(value) {
  const held = [];
  const hold = (html) => `${PH}${held.push(html) - 1}${PH}`;

  let out = value;

  // Reference anchors authored as raw HTML in the numbered reference list.
  out = out.replace(/<a id="([^"]+)"><\/a>/g, (_m, id) => hold(`<span id="${escapeHtml(id)}"></span>`));

  // Visible numbered citation: [[7]](#ref-7)
  out = out.replace(/\[\[(\d+)\]\]\(#ref-(\d+)\)/g, (_m, label, id) =>
    hold(`<a class="cite" href="#ref-${escapeHtml(id)}">[${escapeHtml(label)}]</a>`)
  );

  // Ordinary links: [text](url) — link text keeps its own emphasis markup.
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) =>
    hold(`<a href="${escapeHtml(href)}">${inline(text)}</a>`)
  );

  out = escapeHtml(out)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  return out.replace(new RegExp(`${PH}(\\d+)${PH}`, 'g'), (_m, i) => held[Number(i)]);
}

/* ------------------------------------------------------------------ block pass */

function parseBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  const isBlockStart = (line) =>
    !line.trim() ||
    /^#{1,6}\s/.test(line) ||
    line.startsWith('|') ||
    line.startsWith('> ') ||
    /^[-*]\s/.test(line) ||
    /^\d+\.\s/.test(line) ||
    /^---\s*$/.test(line) ||
    line.startsWith('```');

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', text: code.join('\n') });
      continue;
    }

    if (/^---\s*$/.test(line)) {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: Math.min(heading[1].length, 4), text: heading[2] });
      i += 1;
      continue;
    }

    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i]);
        i += 1;
      }
      blocks.push({ type: 'table', rows });
      continue;
    }

    if (line.startsWith('> ') || line.trim() === '>') {
      const quoted = [];
      while (i < lines.length && (lines[i].startsWith('> ') || lines[i].trim() === '>')) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ type: 'quote', text: quoted.join(' ').trim() });
      continue;
    }

    const ordered = /^\d+\.\s/.test(line);
    if (ordered || /^[-*]\s/.test(line)) {
      const marker = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < lines.length && marker.test(lines[i])) {
        const item = [lines[i].replace(marker, '')];
        i += 1;
        // Wrapped continuation lines belong to the item they follow.
        while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
          item.push(lines[i].trim());
          i += 1;
        }
        items.push(item.join(' '));
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

function renderTable(rows) {
  const parsed = rows
    .filter((row) => !/^\|\s*:?-{2,}/.test(row))
    .map((row) =>
      row
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim())
    );
  const [head, ...body] = parsed;
  return `<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
}

function renderBlocks(blocks) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `<h${block.level}>${inline(block.text)}</h${block.level}>`;
        case 'paragraph':
          return `<p>${inline(block.text)}</p>`;
        case 'quote':
          return `<blockquote>${inline(block.text)}</blockquote>`;
        case 'ul':
          return `<ul>${block.items.map((it) => `<li>${inline(it)}</li>`).join('')}</ul>`;
        case 'ol':
          return `<ol>${block.items.map((it) => `<li>${inline(it)}</li>`).join('')}</ol>`;
        case 'table':
          return renderTable(block.rows);
        case 'code':
          return `<pre>${escapeHtml(block.text)}</pre>`;
        case 'hr':
          return '<hr />';
        default:
          return '';
      }
    })
    .join('\n');
}

/* ---------------------------------------------------------------------- layout */

const STYLE = `
@page { size: Letter; margin: 0.7in 0.65in; }
* { box-sizing: border-box; }
body {
  margin: 0; background: #fff; color: #334155;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 10.5pt; line-height: 1.5;
}
h1, h2, h3, h4, blockquote, pre { break-inside: avoid; }
h2, h3, h4 { break-after: avoid; }
/* Rows, not whole tables: the hub evidence map is taller than a page, and
   break-inside:avoid on the table itself strands it and wastes a page. */
tr { break-inside: avoid; }
thead { display: table-header-group; }
.masthead { display: flex; align-items: baseline; gap: 10pt; margin: 0 0 6pt; }
.wordmark { color: #1E3A5F; font-size: 13pt; font-weight: 800; letter-spacing: .14em; }
.tagline { color: #526174; font-size: 8pt; letter-spacing: .02em; }
.accent-rule { width: 78pt; height: 5pt; margin: 0 0 16pt; background: #FCD34D; }
.pillar-kicker { color: #245F99; font-size: 8.5pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin: 0 0 8pt; }
h1 { margin: 0 0 10pt; color: #1E3A5F; font-size: 26pt; line-height: 1.08; letter-spacing: -.01em; }
.deck { margin: 0 0 14pt; color: #245F99; font-size: 12.5pt; font-weight: 600; line-height: 1.3; }
.docmeta { margin: 0 0 20pt; padding: 8pt 0; border-top: .75pt solid #E2E8F0; border-bottom: .75pt solid #E2E8F0; color: #526174; font-size: 8pt; line-height: 1.45; }
.docmeta .url { color: #245F99; }
h2 { margin: 22pt 0 7pt; color: #1E3A5F; font-size: 15pt; line-height: 1.2; }
h3 { margin: 15pt 0 5pt; color: #254a78; font-size: 11.5pt; line-height: 1.25; }
h4 { margin: 12pt 0 4pt; color: #254a78; font-size: 10.5pt; }
p { margin: 0 0 8pt; }
ul, ol { margin: 4pt 0 10pt 16pt; padding: 0; }
li { margin: 0 0 5pt; }
blockquote { margin: 10pt 0 12pt; padding: 9pt 13pt; background: rgba(252,211,77,.14); border-left: 3pt solid #FCD34D; color: #1E3A5F; }
blockquote p { margin: 0; }
hr { margin: 16pt 0; border: 0; border-top: .75pt solid #E2E8F0; }
a { color: #245F99; text-decoration: none; overflow-wrap: anywhere; }
a.cite { color: #245F99; font-size: 7.5pt; font-weight: 700; vertical-align: super; text-decoration: none; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9pt; }
pre { margin: 10pt 0; padding: 9pt 11pt; background: #F1F5F9; border: .75pt solid #E2E8F0; border-radius: 4pt; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8pt; line-height: 1.4; white-space: pre-wrap; }
table { width: 100%; margin: 10pt 0 14pt; border-collapse: collapse; font-size: 8.25pt; line-height: 1.35; }
th { padding: 6pt; color: #1E3A5F; background: #F1F5F9; border: .75pt solid #CBD5E1; text-align: left; vertical-align: top; }
td { padding: 6pt; border: .75pt solid #E2E8F0; vertical-align: top; }
tr:nth-child(even) td { background: #F8FAFC; }
/* The reference list is the anchor target for every [n] citation above. */
h2#references-heading + ol { font-size: 8.5pt; line-height: 1.4; }
.colophon { margin-top: 24pt; padding-top: 9pt; border-top: .75pt solid #E2E8F0; color: #526174; font-size: 7.5pt; line-height: 1.45; }
`;

export function buildHtml({ title, deck, canonicalUrl, contentHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>${STYLE}</style>
</head>
<body>
  <div class="accent-rule"></div>
  <div class="masthead">
    <span class="wordmark">CADENCE</span>
    <span class="tagline">Management by design, not by luck.</span>
  </div>
  <p class="pillar-kicker">People Science &middot; Research synthesis</p>
  <h1>${inline(title)}</h1>
  ${deck ? `<p class="deck">${inline(deck)}</p>` : ''}
  <p class="docmeta">
    Read the live version at <span class="url">${escapeHtml(canonicalUrl)}</span><br />
    Research synthesis published by Cadence, July 2026. Citations are numbered in the text and listed in full under References; every source was verified to resolve as of 2026-07-27.
  </p>
  ${contentHtml}
  <p class="colophon">&copy; 2026 Cadence. This document is a research synthesis, not a Cadence customer-outcome claim. Product availability is labeled per module at the point of mention; roadmap capability is marked as such and is not sold as available today.</p>
</body>
</html>`;
}


/* -------------------------------------------------------------------- sources */

/** Every People Science pillar page, hub first, then spokes alphabetically. */
export function discoverPillarPages() {
  const pages = readdirSync(PAGES_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => {
      const { meta, body } = splitFrontmatter(readFileSync(join(PAGES_DIR, name), 'utf8'));
      return { name, slug: name.replace(/\.md$/, ''), meta, body };
    })
    .filter((page) => PILLAR_STAGES.has(page.meta['funnel-stage']));

  if (pages.length === 0) throw new Error('No pillar pages found — check funnel-stage frontmatter.');
  return pages.sort((a, b) => (a.meta['funnel-stage'] === 'pillar-credibility' ? -1 : b.meta['funnel-stage'] === 'pillar-credibility' ? 1 : a.slug.localeCompare(b.slug)));
}

/** Full print HTML for one pillar page. */
export function renderPageHtml(page) {
  const blocks = parseBlocks(stripInternalNotes(page.body));

  // The page H1 and its bold standfirst move into the cover block.
  const h1 = blocks.find((b) => b.type === 'heading' && b.level === 1);
  const rest = blocks.filter((b) => b !== h1);
  let deck = '';
  const first = rest[0];
  if (first && first.type === 'paragraph' && /^\*\*[^*]+\*\*$/.test(first.text.trim())) {
    deck = first.text.trim().slice(2, -2);
    rest.shift();
  }

  const contentHtml = renderBlocks(rest).replace(
    '<h2>References</h2>',
    '<h2 id="references-heading">References</h2>'
  );

  return buildHtml({
    title: h1 ? h1.text : page.meta.title || page.slug,
    deck,
    canonicalUrl: `https://cadencehr.ai${page.meta.slug || `/resources/${page.slug}`}`,
    contentHtml,
  });
}
