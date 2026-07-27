# CAD-11976 — People Science PDF leave-behinds

Closing item on CAD-11976. Per HARD RULE CAD-9245, customer-facing human assets ship as PDF;
the `.md` sources stay in-repo and remain the source of truth.

## How the PDFs are produced

`scripts/generate-people-science-pdfs.mjs` prints the **built** pages (`dist/`) to PDF with Chrome:

```bash
npm run build
npm run pdf:people-science     # → public/pdf/<slug>.pdf
```

The PDF is therefore the same content the site serves — anchor citations, availability labels,
reference lists and all. There is no second copy of the prose to drift out of sync. Regenerate
after any edit to an article's `.md`.

Site chrome is removed by `@media print` rules in two places:

- `public/css/cadence.css` — hides `#main-nav` and `footer` site-wide.
- `src/layouts/ArticleLayout.astro` — hides the breadcrumb and Download CTA, flattens the article
  card, sets print typography, and restores list markers (the global `* { padding: 0 }` reset
  otherwise drops them, which would leave the numbered reference entries unnumbered — unresolvable
  on paper, where the `[n]` anchors can't be clicked).

Branding: a print-only cover block (wordmark + "Management by design, not by luck." + canonical URL)
plus a Chrome footer template carrying the tagline and `Page N of M` on every page.

## Download wiring

Each of the 13 articles carries a `pdf:` frontmatter key (e.g. `pdf: /pdf/manager-effect.pdf`).
`ArticleLayout` renders it as the Download PDF CTA. An article without the key renders no CTA, so
the other resources articles are unaffected.

## Assets (13)

Hub: `people-science`. Spokes: `manager-effect`, `continuous-performance-management`,
`organizational-justice-fair-process`, `feedback-that-doesnt-backfire`, `employee-recognition-science`,
`goal-setting-theory-practice`, `people-analytics-without-dashboard-theater`,
`role-clarity-job-architecture`, `management-by-proximity-is-dead`, `can-ai-be-fair`,
`compounding-organization`, `people-science-glossary`.

## Verification performed (2026-07-27)

| Check | Method | Result |
|---|---|---|
| Meta-leak | pdfjs text extraction on all 13 → sweep for `SEO metadata`, `target-query`, `funnel-stage`, `meta-description`, `CAD-####`, draft/QA status strings | 0 hits (only article prose such as "drafted in July 2026") |
| Site chrome | same extraction → sweep for nav/footer/CTA strings | 0 hits |
| Build-host leak | sweep for `127.0.0.1` / `localhost` | 0 hits |
| Numbered citations | rendered page images of hub p11 (refs 1–22) and `manager-effect` p1/p7 | inline `[n]` anchors and numbered reference entries both render; two-digit markers unclipped |
| Availability labels | extraction + rendered evidence-map table | "Live today" / "Coming Q3 / roadmap, not GA" / "Preview, not GA" intact |
| Branding | extraction | cover block on p1 + tagline footer on every page, 13/13 |
| Download links | every `href="*.pdf"` in `dist/resources/*.html` resolved against `dist/` | 13/13 resolve |
| CI checks | `check:prohibited-marketing-claims`, `check:marketing-sync`, `build`, `a11y:ci` | pass (4 rules/45 files; 10/10 + 26/26; 51 pages; 26/26 a11y) |

## Known follow-up (not in this PR)

Ordered/unordered list markers are suppressed **on screen** across all resources articles by the
global `* { padding: 0 }` reset. This PR restores them for print only, so the PDFs meet the
visible-citation requirement without changing live page rendering. Fixing the screen rendering
site-wide is a separate call for Cortana.
