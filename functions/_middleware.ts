// Canonical-host guard for the Cloudflare Pages marketing site.
//
// `www.cadencehr.ai` and `cadencehr.ai` are both custom domains on this
// Pages project. A path redirect in public/_redirects would apply to both;
// this function is deliberately host-aware so only www redirects.
export const onRequest: PagesFunction = async ({ request, next }) => {
  const requestUrl = new URL(request.url);
  const host = requestUrl.hostname.toLowerCase();

  if (host === "www.cadencehr.ai") {
    requestUrl.protocol = "https:";
    requestUrl.hostname = "cadencehr.ai";
    return Response.redirect(requestUrl.toString(), 301);
  }

  return next();
};
