# CAD-11976 Hub Revision Notes

## Part B / Part E compliance (per the CAD-11976 brief)

Every revision named in the brief is implemented in `src/pages/resources/people-science.md`:

- Key Takeaways block: 7 standalone, citable claims with numbered citations.
- Q&A-shaped module subheads (e.g. "Do structured 1:1s actually improve performance?", "Is the 9-box grid evidence-based, or corporate astrology?").
- "How to cite this document" with suggested citation + methodology & provenance note (including citation-verification date).
- Steelman section: "The strongest objection: doesn't connecting weak signals just compound noise?" — three-part response plus a falsifiability commitment.
- Engagement evidence refreshed: peer-reviewed Harter et al. (2002) retained as the foundational study, joined by Gallup's Q12 Meta-Analysis 11th edition (current iteration). The 70%-variance stat is pinned to its specific source — Gallup, *State of the American Manager* (2015) — with Gallup's exact "at least 70%" wording.
- Correlation-vs-causation clause added to the engagement/survey section.
- Goal-setting boundary-conditions note added, anchored to Locke & Latham's moderators and Ordóñez et al. (2009) "Goals Gone Wild."
- 9-box adverse-impact/EEOC line added (Uniform Guidelines framework, 29 C.F.R. 1607).
- Narrative: scene-based cold open (the Tuesday-morning resignation), named enemy — **"management by archaeology"** — and the refrain "AI develops managers, not replaces them" appears 4× (cold open, 1:1 section, scorecard synthesis, closing paragraph). "Who this is for" section added.
- **Part E (mandatory): every "Buyer-safe language:" label removed.** Each former labeled blockquote is now a plain confident assertion integrated into its section's prose. Rendered-HTML sweep confirms zero occurrences of "buyer-safe", "talk track", or "what we should claim".
- Protected elements preserved: Publication Status honesty ("What this document is — and is not"), "What Cadence Should Not Claim Yet" (verbatim), the availability/status column (labels taken verbatim from the site-spec availability ledger), and the research-vs-synthesis distinction (restated in the takeaways, the synthesis section, and the closing note).

## Improvements beyond the review (Maya)

1. **"Goals Gone Wild" citation added (ref 4).** The review asked for a boundary-conditions note; I anchored it to a verifiable Academy of Management Perspectives paper rather than leaving it as unsourced prose, and folded the anti-gaming design stance into the goals module bullets.
2. **Falsifiability paragraph in the steelman.** "What would change our mind" — deployment data showing convergence firing on noise, or metric-distortion outpacing coaching — states the test the integration thesis must pass. An evidence page that can't say what would falsify it isn't an evidence page.
3. **Goodhart's-law/gaming objection folded into the steelman** (managers performing rituals to keep tiles green) with an honest "better instrumentation, not immunity" response.
4. **FAQPage JSON-LD support added to `ArticleLayout.astro`** (backward-compatible `faq` frontmatter). The layout previously emitted only Article schema; every future resource article can now carry FAQ rich-result markup. The hub ships 5 FAQs mirroring real buyer queries.
5. **Numbered visible citations with anchor links** ([[n]](#ref-n)) replacing the draft's markdown-footnote syntax, which Astro's default pipeline does not render as footnotes. Citations are now visible, clickable, and AEO-legible.
6. **Hub↔spoke internal linking**: contextual links to 6 already-live resource articles (1:1s ×2, goals/recognition, 9-box guide, survey fatigue, job architecture). The 12 new spokes will link back to the hub when produced.
7. **Non-provisioned email risk removed**: an earlier draft of the provenance note referenced a corrections email address that does not exist; customer-facing copy points only at provisioned site paths (per the site-spec grep rule).
8. **Resources index card added** so the hub is discoverable from `/resources` ("Read the research summary →", per site-spec CTA copy).

## PDF render target (not in this PR — sequencing note for Cortana QA)

Per the CAD-9245 rule, the customer-facing download is a branded PDF built in the **app repo** (`wah-holdings/cadence`: `cadence-web/scripts/build-people-science-pdf.mjs` from `cadence-web/scripts/resources/people-science-whitepaper-source.md`, output `cadence-web/public/resources/people-science/the-science-of-management-cadence.pdf`). That source still contains the pre-revision text **including the "Buyer-safe language:" meta-leak labels**. A follow-up PR to the app repo must sync the revised source and regenerate the PDF before (or with) publish, or the live PDF will contradict the revised page. The revised hub page does not link the stale PDF for exactly this reason; the download link should be added when the regenerated PDF lands.

## Verification run (2026-07-27)

- `astro build`: 39 pages, success.
- `check:prohibited-marketing-claims`: pass (4 rules, 33 files).
- `check-marketing-reality`: pass (26/26). `check-marketing-sync`: pass (10/10). `check-route-aliases`: pass (16/16).
- Rendered `dist/resources/people-science.html`: Article + FAQPage schemas present; canonical `https://cadencehr.ai/resources/people-science`; meta-leak sweep clean (only match for /draft/i is the word "drafted" in the provenance note).
