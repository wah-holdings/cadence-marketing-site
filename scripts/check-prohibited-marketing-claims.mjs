import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const config = JSON.parse(readFileSync(join(root, "src/content/prohibitedMarketingClaims.json"), "utf8"));
const extensions = new Set([".astro", ".md", ".mdx", ".ts", ".tsx", ".json"]);

const collectFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : extensions.has(extname(path)) ? [path] : [];
  });

const sources = new Map(
  ["src/pages", "src/content"].flatMap((directory) =>
    collectFiles(join(root, directory))
      .filter((path) => path !== join(root, "src/content/prohibitedMarketingClaims.json"))
      .map((path) => [relative(root, path), readFileSync(path, "utf8")]),
  ),
);

const fixturePath = process.env.MARKETING_TRUTH_FIXTURE;
if (fixturePath) {
  const resolved = resolve(root, fixturePath);
  if (!existsSync(resolved)) throw new Error(`MARKETING_TRUTH_FIXTURE does not exist: ${resolved}`);
  const fixture = JSON.parse(readFileSync(resolved, "utf8"));
  for (const patch of fixture.sourcePatches ?? []) {
    const source = sources.get(patch.path);
    if (!source?.includes(patch.find)) throw new Error(`Fixture patch did not find ${JSON.stringify(patch.find)} in ${patch.path}`);
    sources.set(patch.path, source.replace(patch.find, patch.replace));
  }
  console.log(`Applied prohibited-claims fixture: ${fixture.description ?? fixturePath}`);
}

const isAllowed = (rule, path, text) =>
  config.allowlist.some((entry) => entry.ruleId === rule.id && entry.path === path && new RegExp(entry.pattern, entry.flags ?? "i").test(text));

const failures = [];
for (const rule of config.rules) {
  for (const [path, source] of sources) {
    const pattern = new RegExp(rule.pattern, rule.flags);
    for (const match of source.matchAll(pattern)) {
      const offset = match.index ?? 0;
      const context = source.slice(Math.max(0, offset - 120), offset + match[0].length + 240);
      if (isAllowed(rule, path, match[0])) continue;
      if (rule.requiredQualifier && new RegExp(rule.requiredQualifier, "i").test(context)) continue;
      failures.push(`${rule.id}: ${path} contains ${JSON.stringify(match[0])} without the required roadmap qualifier`);
    }
  }
}

if (failures.length) {
  console.error("Prohibited marketing-claims check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Prohibited marketing-claims check passed (${config.rules.length} rules, ${sources.size} files).`);
