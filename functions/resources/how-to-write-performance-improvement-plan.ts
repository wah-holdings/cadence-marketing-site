const notFound = () => new Response("Not Found", { status: 404 });

// This article is intentionally held from the approved marketing release.
export const onRequest = notFound;
