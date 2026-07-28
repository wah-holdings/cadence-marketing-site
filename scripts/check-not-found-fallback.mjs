import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];
const notFoundPage = join(root, "dist", "404.html");
const redirects = readFileSync(join(root, "public", "_redirects"), "utf8");
const heldResources = [
  "how-to-write-performance-improvement-plan",
  "hris-vs-people-ops-platform",
];

if (!existsSync(notFoundPage)) {
  failures.push("missing dist/404.html; Cloudflare Pages would serve index.html for an unknown path");
} else if (!readFileSync(notFoundPage, "utf8").includes("Page not found")) {
  failures.push("dist/404.html does not contain the not-found response");
}

if (/^\/\*\s+\/?(?:index\.html)?\s+200\s*$/m.test(redirects)) {
  failures.push("public/_redirects contains a catch-all 200 fallback");
}

for (const slug of heldResources) {
  if (existsSync(join(root, "dist", "resources", slug, "index.html"))) {
    failures.push(`held resource was generated: /resources/${slug}`);
  }
}

if (failures.length > 0) {
  console.error("Not-found fallback check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Not-found fallback check passed (404 artifact + ${heldResources.length} held routes absent).`);
