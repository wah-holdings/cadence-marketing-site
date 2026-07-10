const SITE_ORIGIN = "https://cadencehr.ai";
const LASTMOD = "2026-07-10T00:00:00.000Z";

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/product", changefreq: "weekly", priority: "0.95" },
  { path: "/solutions", changefreq: "weekly", priority: "0.9" },
  { path: "/pricing", changefreq: "weekly", priority: "0.85" },
  { path: "/compare", changefreq: "monthly", priority: "0.8" },
  { path: "/security", changefreq: "monthly", priority: "0.8" },
  { path: "/resources", changefreq: "weekly", priority: "0.75" },
  { path: "/about", changefreq: "monthly", priority: "0.65" },
  { path: "/accessibility", changefreq: "yearly", priority: "0.5" },
  { path: "/beta", changefreq: "monthly", priority: "0.45" },
];

const urlFor = (path: string) => `${SITE_ORIGIN}${path === "/" ? "/" : path}`;

const textResponse = (body: string, contentType: string) =>
  new Response(body, {
    headers: {
      "content-type": `${contentType}; charset=utf-8`,
      "cache-control": "public, max-age=3600",
    },
  });

export const sitemapXml = () => {
  const urls = routes
    .map(
      (route) => `<url>
<loc>${urlFor(route.path)}</loc>
<lastmod>${LASTMOD}</lastmod>
<changefreq>${route.changefreq}</changefreq>
<priority>${route.priority}</priority>
</url>`,
    )
    .join("\n");

  return textResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    "application/xml",
  );
};

export const robotsTxt = () =>
  textResponse(
    `User-Agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard
Disallow: /internal/
Disallow: /meetings/
Disallow: /one-on-ones/
Disallow: /owner/
Disallow: /preferences/
Disallow: /qbo/
Disallow: /reset-password
Disallow: /set-password
Disallow: /welcome

Host: ${SITE_ORIGIN}
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`,
    "text/plain",
  );

export const llmsTxt = () =>
  textResponse(
    `# Cadence

> Human-owned management operating plane for remote and hybrid teams.

Cadence helps distributed organizations close the remote-contributor management chasm with structured 1:1s, goals, recognition, employee relations, surveys, job architecture, culture intelligence, and AI coaching that develops managers while humans remain accountable.

## Primary Pages

- Homepage: ${SITE_ORIGIN}/
- Product: ${SITE_ORIGIN}/product
- Solutions by role: ${SITE_ORIGIN}/solutions
- Pricing: ${SITE_ORIGIN}/pricing
- Compare: ${SITE_ORIGIN}/compare
- Security and trust: ${SITE_ORIGIN}/security
- Resources and docs index: ${SITE_ORIGIN}/resources
- About: ${SITE_ORIGIN}/about
- Accessibility statement: ${SITE_ORIGIN}/accessibility

## Live Capabilities

- Structured 1:1 agendas and meeting records
- AI-generated summaries and private coaching where enabled
- Goals and OKR creation, updates, and progress tracking
- Recognition feed, posting, and history
- Employee relations case lifecycle and context
- Pulse survey response capture and aggregate analytics
- Job architecture import, versioned role definitions, level context, and role assignment
- Culture Scorecard manager scorecard and org-health heatmap views
- 9-box talent calibration
- Connected Agents (BYOA) over MCP with audit logging
- Enterprise SSO through OIDC and SAML

## Preview- and Roadmap-Labeled Capabilities

- Personality Intelligence working-style profile and team view
- Personality prompts woven into 1:1s and coaching
- Recognition ratio analysis and enforcement
- KVD, 9-box movement analytics, and intervention workflows
- SCIM provisioning
- Manager-level survey attribution and AI open-text themes
- Predictive retention inputs
- Board-ready Culture Scorecard reporting
- Automated retention intervention workflows

## AI Usage Position

Cadence uses AI to develop managers and employees while preserving human accountability. Human leaders own external communication, employment decisions, and policy decisions.

## Machine-Readable Facts

- Sitemap: ${SITE_ORIGIN}/sitemap.xml
- Robots: ${SITE_ORIGIN}/robots.txt
`,
    "text/plain",
  );
