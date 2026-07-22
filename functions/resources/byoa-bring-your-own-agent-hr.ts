// This article was withdrawn because its availability claims were premature.
// Keep an explicit dynamic route so the removed canonical path cannot fall
// back to a stale static Pages asset or be reintroduced by a content build.
export const onRequest: PagesFunction = () =>
  new Response("Not found", {
    status: 410,
    headers: {
      "cache-control": "no-store, max-age=0",
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });
