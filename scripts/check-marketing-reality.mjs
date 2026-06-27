import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const readJson = (path) => JSON.parse(read(path));

const registry = readJson("src/content/capabilities.json");
const manifest = readJson("src/content/marketingClaims.json");

const getPath = (source, dottedPath) =>
  dottedPath.split(".").reduce((value, key) => (value == null ? undefined : value[key]), source);

const normalizeText = (value) => String(value).replace(/\s+/g, " ").trim();

const loadFixture = () => {
  const fixturePath = process.env.MARKETING_REALITY_FIXTURE;
  if (!fixturePath) return null;

  const resolved = resolve(root, fixturePath);
  if (!existsSync(resolved)) {
    throw new Error(`MARKETING_REALITY_FIXTURE does not exist: ${resolved}`);
  }

  return JSON.parse(readFileSync(resolved, "utf8"));
};

const fixture = loadFixture();
const sourceCache = new Map();

const sourceFor = (page) => {
  if (!sourceCache.has(page)) {
    sourceCache.set(page, read(page));
  }

  let source = sourceCache.get(page);
  for (const patch of fixture?.sourcePatches ?? []) {
    if (patch.page !== page) continue;
    if (!source.includes(patch.find)) {
      throw new Error(`Fixture patch for ${page} did not find ${JSON.stringify(patch.find)}`);
    }
    source = source.replace(patch.find, patch.replace);
  }

  return source;
};

const capabilityFor = (claim, failures) => {
  if (!claim.capability) return null;

  const capability = registry.capabilities[claim.capability];
  if (!capability) {
    failures.push(`${claim.id}: unknown capability ${claim.capability}`);
    return null;
  }

  return capability;
};

const assertCapabilityCanBePromoted = (claim, capability, failures) => {
  if (!claim.publicPromotion || !capability) return;

  if (capability.marketingLabel !== "available") {
    failures.push(
      `${claim.id}: ${claim.capability} is status=${capability.status} but marketingLabel=${capability.marketingLabel}; public promotion requires marketingLabel=available`,
    );
  }
};

const assertExpectedText = (claim, source, failures) => {
  const expected =
    claim.expectedText ??
    (claim.factPath ? getPath(registry.facts, claim.factPath) : undefined);

  if (expected == null) {
    failures.push(`${claim.id}: no expectedText or factPath value found`);
    return;
  }

  const sourceExpression = claim.sourceExpression ? `{${claim.sourceExpression}}` : null;
  if (!source.includes(String(expected)) && (!sourceExpression || !source.includes(sourceExpression))) {
    failures.push(`${claim.id}: expected ${JSON.stringify(expected)} or registry expression ${sourceExpression} in ${claim.page}`);
  }
};

const failures = [];

for (const claim of manifest.claims) {
  const source = sourceFor(claim.page);
  const capability = capabilityFor(claim, failures);

  if (claim.sourceContains && !source.includes(claim.sourceContains)) {
    failures.push(`${claim.id}: missing tagged source text ${JSON.stringify(claim.sourceContains)} in ${claim.page}`);
  }

  if (claim.requiredSourceExpression && !source.includes(claim.requiredSourceExpression)) {
    failures.push(`${claim.id}: page must source freshness from ${claim.requiredSourceExpression}`);
  }

  if (claim.type === "retention_fact" || claim.type === "hard_number") {
    assertExpectedText(claim, source, failures);
  }

  if (claim.type === "pricing_feature" || claim.type === "competitor_superiority") {
    assertCapabilityCanBePromoted(claim, capability, failures);
  }
}

if (fixture) {
  console.log(`Applied marketing reality fixture: ${fixture.description ?? process.env.MARKETING_REALITY_FIXTURE}`);
}

if (failures.length > 0) {
  console.error("Marketing reality check failed:");
  for (const failure of failures) console.error(`- ${normalizeText(failure)}`);
  process.exit(1);
}

console.log(`Marketing reality check passed (${manifest.claims.length}/${manifest.claims.length}).`);
