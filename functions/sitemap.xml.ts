import { proxySeoAsset } from "./_seoProxy";

const articlePaths = [
  "/resources/managing-remote-hybrid-visibility",
  "/resources/why-1-1s-fail",
  "/resources/what-is-a-management-operating-plane",
  "/resources/connect-goals-feedback-recognition",
  "/resources/management-chasm-signs",
  "/resources/how-to-run-effective-1-1s",
  "/resources/9-box-talent-calibration-guide",
  "/resources/job-architecture-from-scratch",
  "/resources/measure-culture-without-survey-fatigue",
  "/resources/ai-in-performance-management",
  "/resources/manager-coaching-at-scale",
  "/resources/choose-people-management-platform",
  "/resources/ai-native-hr-software-2026",
  "/resources/build-vs-buy-people-stack",
  "/resources/ai-people-ops-privacy",
  "/resources/ai-that-develops-humans",
  "/resources/management-record-system-of-record",
];

const articleEntries = articlePaths
  .map(
    (path) => `<url><loc>https://cadencehr.ai${path}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
  )
  .join("");

// /sitemap.xml keeps the app-generated canonical URLs, then adds Pages-only
// article routes that do not exist on the app host.
export const onRequestGet: PagesFunction = async (context) => {
  const upstream = await proxySeoAsset("/sitemap.xml")(context);
  if (!upstream.ok) return upstream;

  const body = await upstream.text();
  if (!body.includes("</urlset>")) return upstream;

  const headers = new Headers(upstream.headers);
  headers.set("content-type", "application/xml; charset=utf-8");
  return new Response(body.replace("</urlset>", `${articleEntries}</urlset>`), {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
};
