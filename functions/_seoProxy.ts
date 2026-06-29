// Shared helper for SEO/AEO discoverability assets (CAD-8204 / CAD-7651).
//
// The apex/www marketing host is Cloudflare Pages (static Astro). It has no
// robots.txt / sitemap.xml / llms.txt / ai-facts.json, so unmatched paths fell
// through to homepage HTML (content-type text/html), breaking crawlers and AEO.
//
// The canonical assets are already generated and served correctly by the app
// host (app.cadencehr.ai / Cloud Run), and their bodies already self-reference
// https://cadencehr.ai. Proxying these exact paths keeps a single source of
// truth (no drift, satisfies the marketing feature-honesty rule for
// ai-facts.json) and mirrors the existing functions/qbo proxy precedent.
//
// Files prefixed with "_" are excluded from Cloudflare Pages route generation,
// so this module is a shared lib, not a route.

const APP_ORIGIN = "https://app.cadencehr.ai";

export const proxySeoAsset = (path: string): PagesFunction => async ({ request }) => {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(path, APP_ORIGIN);
  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("cf-connecting-ip");
  headers.delete("cf-ipcountry");
  headers.delete("cf-ray");
  headers.delete("cf-visitor");
  headers.set("x-forwarded-host", incomingUrl.host);
  headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));

  const upstream = await fetch(targetUrl.toString(), {
    method: "GET",
    headers,
    redirect: "manual",
  });

  // Pass the body and content-type through; add a short crawler-friendly cache.
  const outHeaders = new Headers(upstream.headers);
  outHeaders.delete("content-encoding");
  outHeaders.delete("transfer-encoding");
  outHeaders.set("cache-control", "public, max-age=3600");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
};
