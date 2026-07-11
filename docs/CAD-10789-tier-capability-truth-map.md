# CAD-10789 — Tier → Capability Truth Map

**Owner:** Quinn Hart  
**As of:** 2026-07-11  
**Truth source:** `src/content/capabilities.json`  
**Status vocabulary:** **LIVE in prod** means `status: ga`, `marketingLabel: available`, and a GA date in the capability registry. **Coming** means preview or roadmap and is not included in a paid tier.

## Job Architecture claim map

| Capability advertised on a tiered or comparison surface | Essentials | Professional | Enterprise | Production truth / marketing constraint |
|---|---|---|---|---|
| Job Architecture — admin import, role definitions, level context, and assignment | LIVE in prod | LIVE in prod | LIVE in prod | GA 2026-06-26; `job_architecture`. Administrative foundation only: no comp planning, market benchmarking, org-design analytics, or career-path claim. |
| Role expectations that guide shared manager–employee 1:1 agendas | Coming | Coming | Coming | `job_architecture.role_expectations_in_one_on_one`; not production-verified. Never call live or included. AI suggestions require human approval; they never auto-insert or score people. |

## Surface-to-registry sync

| Surface / registry | Claim status | Constraint |
|---|---|---|
| `src/pages/product.astro` | Live admin foundation + Coming shared 1:1 steering | The buyer’s problem is expectations disconnected from the next 1:1; Cadence is the guide. No career-path, role-recasting, comp, benchmarking, or org-design claim. |
| `src/content/marketingData.ts` | Shared source strings | Live and Coming labels stay distinct. |
| `src/content/capabilities.json` | Canonical capability truth | Registry controls promotion status. |
| `src/content/marketingClaims.json` | Enforcement manifest | The staged claim must retain its literal `Coming:` label until registry flip and rendered production verification. |

## Verification

`npm run check:marketing-reality` and `npm run check:marketing-sync` must both pass before review.
