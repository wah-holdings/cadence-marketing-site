const APP_QBO_ORIGIN = "https://app.cadencehr.ai";

export const onRequest: PagesFunction<{ path?: string[] }> = async ({ request, params }) => {
  const incomingUrl = new URL(request.url);
  const qboPath = params.path?.join("/") ?? "";
  const targetUrl = new URL(`/qbo/${qboPath}`, APP_QBO_ORIGIN);
  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("cf-connecting-ip");
  headers.delete("cf-ipcountry");
  headers.delete("cf-ray");
  headers.delete("cf-visitor");
  headers.set("x-forwarded-host", incomingUrl.host);
  headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: "manual",
  });
};
