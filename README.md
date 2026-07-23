# Cadence Marketing Site

Multi-page marketing website for cadencehr.ai. Built as plain HTML/CSS with a shared design system — ready to deploy directly via Cloudflare Pages or convert to Astro components.

**Author:** Casey Torres (Content Strategist, CAD-2006)  
**Date:** 2026-05-14  
**Status:** Content complete, ready for Riley to build into Astro + deploy pipeline

---

## Pages

| File | URL | Status |
|---|---|---|
| `index.html` | `/` | Complete |
| `product.html` | `/product` | Complete — 8 modules with UI mockups |
| `solutions.html` | `/solutions` | Complete — 4 personas (IC, Manager, L2, CHRO) |
| `pricing.html` | `/pricing` | Complete — 3 tiers, feature matrix, FAQ |
| `security.html` | `/security` | Complete — compliance, consent, DPA, SOC 2 roadmap |
| `resources.html` | `/resources` | Complete — manifesto, competitive teardown, buyer's guide |
| `beta.html` | `/beta` | Complete — lead capture form (mailto fallback, needs wiring) |
| `about.html` | `/about` | Complete — founder bio, team, values |

---

## Design System

All brand tokens live in `css/cadence.css`. Pages link to this shared stylesheet and add page-specific styles inline.

### Brand colors
```css
--primary:    #1E3A5F  /* deep navy */
--secondary:  #4A90D9  /* blue */
--accent:     #F5A623  /* orange */
```

### Typography
- Font: Inter (Google Fonts)
- Weights used: 400, 500, 600, 700, 800, 900

### Key components in `cadence.css`
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.btn-white`, `.btn-white-outline`
- `.page-hero` — dark navy page header for inner pages
- `.section-badge` — pill-style section label
- `.section-headline` — responsive heading
- `.section-cta` — gradient CTA block
- `footer` — full footer with 5-column link grid
- `.feature-block`, `.feature-block.reverse` — alternating feature sections
- `.fade-up` + JS IntersectionObserver — scroll animations

---

## How to edit content

Each page is standalone HTML. Find the section you want to edit by looking for the HTML comment (e.g. `<!-- MODULE 01: 1:1 ENGINE -->`). All copy is in the HTML, not in a CMS.

### Marketing-truth CI guard

`npm run check:prohibited-marketing-claims` scans customer-facing `src/pages/**` and `src/content/**` before the site builds. Add a narrow rule to `src/content/prohibitedMarketingClaims.json` for a newly prohibited claim; use `requiredQualifier` when a non-GA capability is acceptable only when clearly marked Coming, Roadmap, or Preview. Add a path-and-rule-specific allowlist entry only for an intentional exception, then add a negative fixture under `scripts/fixtures/` and run it locally to prove the guard fails.

To change pricing: edit `pricing.html` — update the three `.pricing-card` sections and the feature comparison table.

To update the beta form: edit `beta.html` — the `handleSubmit()` function currently uses a mailto fallback. Wire to a real endpoint (Google Forms or Paperclip API) by replacing the `window.location.href = mailto:...` line with a `fetch()` POST.

---

## How to deploy (Cloudflare Pages)

### Direct deploy (current holding page approach)
```bash
# Push the marketing-site directory to the wah-holdings/cadence-marketing-site repo
# Cloudflare Pages auto-deploys on push to main
```

### Riley's Astro build (target architecture)
1. `npx create-astro@latest cadence-marketing-site` — use the blank starter
2. Move the CSS tokens from `css/cadence.css` into Astro's global CSS
3. Create layout components for: `Nav.astro`, `Footer.astro`, `PageHero.astro`, `SectionCTA.astro`
4. Convert each HTML page to an `.astro` file in `src/pages/`
5. Deploy to Cloudflare Pages: `npm run build` → `dist/` → Pages project

### Preview locally
```bash
# No build step needed for the HTML version — just open any file in a browser
# Or use a simple server:
npx serve /path/to/marketing-site
```

---

## Beta form wiring — Tally (decided 2026-05-14)

The `/beta` form currently uses a mailto fallback. **Tally** is the confirmed path for this sprint (Maya, CAD-2006 comment 8cf9841d).

**Riley's Tally setup steps:**
1. Create a free Tally account at tally.so
2. Build the form using the field spec in CAD-2006 (comment 5269572e) — 9 fields, copy/labels already drafted
3. In Tally settings: set notification email to `hello@cadencehr.ai` (submits go to Phillip's inbox AND Tally dashboard)
4. Enable the auto-acknowledge email — template is in CAD-2006 comment 5269572e; map the `Work email` field as the respondent email so Tally fires it to submitters
5. Enable the success/thank-you page — copy is in CAD-2006 comment 5269572e
6. Get the Tally embed snippet and replace the `<form id="beta-form">` block and `<script>` in `beta.html` with the inline widget embed
7. Test a submission end-to-end before setting live; confirm Phillip's inbox receives it

**Post-sprint follow-up:** File an issue to integrate Tally webhook → Paperclip lead issue + Frappe HR CRM after CAD-2006 closes.

**Content sign-off gate:** Maya must approve form copy (CAD-2006 comment 5269572e) before Riley configures Tally. 24h turnaround from 2026-05-14T21:18 ET.

---

## Content decisions logged

- **Pricing:** Used $12/$24/$48 per issue spec (GA targets). The one-pager used $12/$19/$48 — corrected to match the spec's confirmed tiers.
- **About page:** Described team as distributed, lean, AI-augmented. Included honest disclosure note (per issue spec: "handle carefully, Phillip's call"). Phillip should review the team section before this page goes live.
- **Security:** Reflected actual compliance state (CCPA done, GDPR in progress, SOC 2 roadmap Q3-Q4 2026). Based on CAD-1849 privacy framework doc.
- **Resources manifesto:** Phillip's voice, based on the "management by design, not by luck" thesis from the product DNA. He should review and personalize before publication.
