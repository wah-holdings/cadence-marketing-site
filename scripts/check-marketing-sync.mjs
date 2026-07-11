import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");

const files = {
  data: read("src/content/marketingData.ts"),
  home: read("src/pages/index.astro"),
  product: read("src/pages/product.astro"),
  solutions: read("src/pages/solutions.astro"),
  pricing: read("src/pages/pricing.astro"),
  compare: read("src/pages/compare.astro"),
  resources: read("src/pages/resources.astro"),
  security: read("src/pages/security.astro"),
  about: read("src/pages/about.astro"),
  layout: read("src/layouts/BaseLayout.astro"),
  personas: read("src/content/personaPages.ts"),
  personaRoute: read("src/pages/for/[persona].astro"),
};

const hasTierParam = (content, tier) =>
  content.includes(`tier=${tier}`) || content.includes(`tier: '${tier}'`) || content.includes(`tier: "${tier}"`);

const requiredPhrases = [
  "Management Operating Plane for Distributed Teams",
  "Close the remote-contributor management chasm.",
  "See product proof",
  "Live workspace access",
  "Shipped scope labeled",
  "Humans own decisions",
];

const appRequiredPhrases = [
  "Management operating plane for distributed teams",
  "Close the remote-contributor management chasm.",
  "See product proof",
  "Live workspace access",
  "Shipped scope labeled",
  "Humans own decisions",
];

const checks = [
  {
    name: "single public-site marketing data module carries canonical hero/trust phrases",
    ok: requiredPhrases.every((phrase) => files.data.includes(phrase)),
  },
  {
    name: "homepage renders canonical app-marketing hero and proof CTA",
    ok:
      files.home.includes("heroMessaging.headline") &&
      files.home.includes("heroMessaging.secondaryCta.label") &&
      files.home.includes('id="proof"'),
  },
  {
    name: "homepage exposes expandable real product proof screenshots",
    ok:
      files.home.includes("proofScreenshots.map") &&
      files.home.includes("target=\"_blank\"") &&
      files.data.includes("cadence-calendar-meetings-rendered-2026-07-10.webp"),
  },
  {
    name: "deeper public pages no longer use stale sales-led request-access CTAs",
    ok: ["product", "solutions", "compare", "about"].every(
      (key) => !/Request (beta )?access|we.ll reach out|schedule a walkthrough/i.test(files[key]),
    ),
  },
  {
    name: "public signup CTAs use app tier parameter, not stale plan parameter",
    ok:
      hasTierParam(files.home, "essentials") &&
      hasTierParam(files.home, "professional") &&
      hasTierParam(files.pricing, "essentials") &&
      hasTierParam(files.pricing, "professional") &&
      !Object.values(files).some((content) => /app\.cadencehr\.ai\/signup\?[^"']*plan=/.test(content)),
  },
  {
    name: "beta-era primary CTA copy is not used on public non-beta pages",
    ok: ["home", "product", "solutions", "pricing", "compare", "resources", "security", "about", "layout"].every(
      (key) => !files[key].includes("Request beta access"),
    ),
  },
  {
    name: "compare route is first-class and not a homepage fallback",
    ok:
      files.compare.includes('activeNav="compare"') &&
      files.layout.includes("withBase('/compare')") &&
      files.compare.includes("Cadence is the management operating plane") &&
      !files.compare.includes("heroMessaging.headline"),
  },
  {
    name: "persona routes are first-class Astro pages, not stale app-only marketing routes",
    ok:
      files.personaRoute.includes("getStaticPaths") &&
      files.personaRoute.includes("personaPages.flatMap") &&
      files.personas.includes("slug: 'employees'") &&
      files.personas.includes("slug: 'managers'") &&
      files.personas.includes("slug: 'senior-leaders'") &&
      files.personas.includes("slug: 'chro'") &&
      files.personas.includes("slug: 'ceo'") &&
      files.layout.includes("withBase('/for/employees')") &&
      files.layout.includes("withBase('/for/senior-leaders')"),
  },
  {
    name: "public pages do not render stale Culture Scorecard live-direction copy",
    ok:
      !["home", "product", "solutions", "pricing", "compare", "resources", "security", "about"].some((key) =>
        /live direction/i.test(files[key]),
      ) &&
      files.home.includes("Manager scorecard and org-health heatmap views are live"),
  },
  {
    name: "public pages do not overstate Culture Scorecard package availability",
    ok:
      !["home", "product", "solutions", "pricing", "compare", "resources", "security", "about"].some((key) =>
        /Culture Scorecard visibility|Full Culture Scorecard/i.test(files[key]),
      ) &&
      files.pricing.includes("Manager scorecard and org-health heatmap") &&
      files.compare.includes("Manager scorecard and org-health heatmap") &&
      files.resources.includes("manager scorecards, and org-health heatmaps"),
  },
];

const appPagePath = process.env.CADENCE_APP_MARKETING_PAGE
  ? resolve(process.env.CADENCE_APP_MARKETING_PAGE)
  : resolve(root, "../code/cadence-web/src/app/page.tsx");
const appMarketingDataPath = process.env.CADENCE_APP_MARKETING_DATA
  ? resolve(process.env.CADENCE_APP_MARKETING_DATA)
  : resolve(root, "../code/cadence-web/src/components/marketing/marketingData.ts");

if (existsSync(appPagePath) || existsSync(appMarketingDataPath)) {
  const appPage = existsSync(appPagePath) ? readFileSync(appPagePath, "utf8") : "";
  const appData = existsSync(appMarketingDataPath) ? readFileSync(appMarketingDataPath, "utf8") : "";
  const appSource = `${appPage}\n${appData}`.toLowerCase();
  const missingAppPhrases = appRequiredPhrases.filter((phrase) => !appSource.includes(phrase.toLowerCase()));
  if (missingAppPhrases.length > 0) {
    console.warn(
      `Legacy app marketing source is stale relative to canonical Astro copy; missing phrases: ${missingAppPhrases.join(", ")}`,
    );
  }
} else {
  console.warn(
    `Skipping app marketing comparison; set CADENCE_APP_MARKETING_PAGE or CADENCE_APP_MARKETING_DATA. Checked: ${appPagePath} and ${appMarketingDataPath}`,
  );
}

const failures = checks.filter((check) => !check.ok);

if (failures.length > 0) {
  console.error("Marketing sync check failed:");
  for (const failure of failures) console.error(`- ${failure.name}`);
  process.exit(1);
}

console.log(`Marketing sync check passed (${checks.length}/${checks.length}).`);

const realityCheck = spawnSync(process.execPath, [join(root, "scripts/check-marketing-reality.mjs")], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

if (realityCheck.status !== 0) {
  process.exit(realityCheck.status ?? 1);
}
