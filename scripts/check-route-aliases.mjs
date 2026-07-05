import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const redirects = readFileSync(join(root, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const requiredAliases = [
  ["/privacy", "https://app.cadencehr.ai/privacy"],
  ["/terms", "https://app.cadencehr.ai/terms"],
  ["/dpa", "https://app.cadencehr.ai/dpa"],
  ["/subprocessors", "https://app.cadencehr.ai/subprocessors"],
  ["/signup", "https://app.cadencehr.ai/signup?intent=self-serve&source=apex-alias"],
  ["/demo", "https://app.cadencehr.ai/demo"],
  ["/demo-personality", "https://app.cadencehr.ai/demo-personality"],
  ["/personality", "https://app.cadencehr.ai/personality"],
];

const redirectSet = new Set(redirects);
const failures = [];

for (const [source, destination] of requiredAliases) {
  for (const alias of [source, `${source}/`]) {
    const expected = `${alias} ${destination} 302`;
    if (!redirectSet.has(expected)) {
      failures.push(`missing redirect: ${expected}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Route alias check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Route alias check passed (${requiredAliases.length * 2}/${requiredAliases.length * 2}).`);
