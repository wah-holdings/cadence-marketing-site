# Analytics — Plausible (cadencehr.ai)

**Status:** LIVE on production as of 2026-06-12 (commit adding the beacon to `src/layouts/BaseLayout.astro`).

## What's installed
Privacy-friendly **Plausible Analytics** is the site-wide analytics for cadencehr.ai. It is the data source
for the PLG / demand-gen KPI layer (Cadence Paperclip CAD-3685 / CAD-3674 / CAD-3264).

The tracking snippet lives ONCE in the shared head of `src/layouts/BaseLayout.astro` (immediately above
`<slot name="head" />`), so every page that extends BaseLayout is instrumented automatically:

```html
<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-y43F0IpV5uMSLp_dayM-v.js"></script>
<script>
 window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
 plausible.init()
</script>
```

## RULE for future marketing-site work
- **Any NEW page or layout MUST extend `BaseLayout.astro`** (or otherwise include the snippet above in its
  `<head>`) so it is tracked. If you introduce a new top-level layout, copy the snippet into its head.
- **Do not remove or alter** the Plausible snippet without coordinating with Cortana / the Growth owner —
  it is load-bearing for the demand-gen metrics.
- The `data-domain` is implicit in the hosted script (`pa-...js`); keep `site_id = cadencehr.ai` consistent.

## Reading metrics (for agents)
- **Plausible Stats API v2** (read): `POST https://plausible.io/api/v2/query` with
  `Authorization: Bearer <key>` and body e.g. `{"site_id":"cadencehr.ai","metrics":["visitors","pageviews"],"date_range":"7d"}`.
- Realtime: `GET https://plausible.io/api/v1/stats/realtime/visitors?site_id=cadencehr.ai`.
- **API key** is in 1Password: Infrastructure vault, item **"API Credentials Plausible"** (`credential` field).
  Verified working 2026-06-12 (authenticates, recognizes cadencehr.ai, returns data).

## Custom events / goals (for funnel instrumentation)
Use `plausible('EventName', {props:{...}})` in the browser, or server-side
`POST https://plausible.io/api/event` with `{"name":"...","url":"...","domain":"cadencehr.ai"}`.
Wire signup / checkout-start / activation events here for the source-attributed funnel (CAD-3590 lineage).
