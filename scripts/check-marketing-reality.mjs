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

const setPath = (source, dottedPath, nextValue) => {
  const keys = dottedPath.split(".");
  const lastKey = keys.pop();
  if (keys[0] === "capabilities" && keys.length > 1) {
    const capabilityKey = keys.slice(1).join(".");
    if (!source.capabilities?.[capabilityKey]) {
      throw new Error(`Registry fixture patch references unknown capability: ${capabilityKey}`);
    }
    source.capabilities[capabilityKey][lastKey] = nextValue;
    return;
  }

  const target = keys.reduce((value, key) => {
    if (value[key] == null || typeof value[key] !== "object") value[key] = {};
    return value[key];
  }, source);
  target[lastKey] = nextValue;
};

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
for (const patch of fixture?.registryPatches ?? []) {
  setPath(registry, patch.path, patch.value);
}

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

  if (!isCapabilityMarketable(capability)) {
    failures.push(
      `${claim.id}: ${claim.capability} is status=${capability.status}, gaDate=${capability.gaDate}, marketingLabel=${capability.marketingLabel}; public promotion requires status=ga, gaDate, and marketingLabel=available`,
    );
  }
};

const isCapabilityMarketable = (capability) =>
  capability?.status === "ga" && capability.marketingLabel === "available" && Boolean(capability.gaDate);

const assertRegistryFlipPublishing = (claim, capability, source, failures) => {
  if (!claim.registryFlipPublishing || !capability) return;

  if (claim.stagedSourceContains && !source.includes(claim.stagedSourceContains)) {
    failures.push(`${claim.id}: missing staged comparison/AEO source text ${JSON.stringify(claim.stagedSourceContains)} in ${claim.page}`);
  }

  if (isCapabilityMarketable(capability)) {
    if (claim.liveSourceContains && !source.includes(claim.liveSourceContains)) {
      failures.push(`${claim.id}: ${claim.capability} is marketable but missing live source text ${JSON.stringify(claim.liveSourceContains)} in ${claim.page}`);
    }
    return;
  }

  if (claim.publicPromotion) {
    failures.push(`${claim.id}: ${claim.capability} is not marketable; staged registry-flip content must keep publicPromotion=false until real GA`);
  }

  if (!claim.roadmapSourceContains) {
    failures.push(`${claim.id}: registry-flip staged content requires roadmapSourceContains while ${claim.capability} is not marketable`);
    return;
  }

  if (!source.includes(claim.roadmapSourceContains)) {
    failures.push(`${claim.id}: ${claim.capability} is not marketable; staged comparison/AEO content must stay roadmap-labeled with ${JSON.stringify(claim.roadmapSourceContains)} in ${claim.page}`);
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

  assertRegistryFlipPublishing(claim, capability, source, failures);
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
