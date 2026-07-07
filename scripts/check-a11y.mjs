import http from "node:http";
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import pa11y from "pa11y";

const port = Number(process.env.A11Y_PORT || 4174);
const host = "127.0.0.1";
const baseUrl = process.env.A11Y_BASE_URL || `http://${host}:${port}`;
const routes = (process.env.A11Y_ROUTES || "/,/product,/solutions,/pricing,/security,/compare,/resources,/beta")
  .split(",")
  .map((route) => route.trim())
  .filter(Boolean);

const startCommand = process.env.A11Y_START_COMMAND || `npm run preview -- --host ${host} --port ${port}`;
const maxAttempts = Number(process.env.A11Y_READY_ATTEMPTS || 60);
const retryDelayMs = Number(process.env.A11Y_READY_DELAY_MS || 1000);
const baselinePath = new URL("./a11y-baseline.json", import.meta.url);
const updateBaseline = process.env.A11Y_UPDATE_BASELINE === "1";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function request(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode || 0);
    });
    req.on("error", reject);
    req.setTimeout(2000, () => {
      req.destroy(new Error("Timed out waiting for accessibility target"));
    });
  });
}

async function waitForServer() {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const status = await request(baseUrl);
      if (status >= 200 && status < 500) {
        return;
      }
    } catch {
      // Server is still booting.
    }
    await sleep(retryDelayMs);
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
}

function startServer() {
  const child = spawn(startCommand, {
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port), HOST: host },
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[a11y server] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[a11y server] ${chunk}`));

  return child;
}

function formatIssue(issue) {
  return [
    `${issue.typeCode || issue.code}: ${issue.message}`,
    `  selector: ${issue.selector || "(none)"}`,
    `  context: ${issue.context || "(none)"}`,
  ].join("\n");
}

function fingerprint(issue) {
  return [
    issue.code || issue.typeCode || "unknown",
    issue.selector || "(none)",
    issue.message,
  ].join(" | ");
}

async function readBaseline() {
  try {
    const content = await readFile(baselinePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

const server = startServer();
let failed = false;
const baseline = await readBaseline();
const nextBaseline = {};

try {
  await waitForServer();

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    const result = await pa11y(url, {
      standard: "WCAG2AA",
      runners: ["axe"],
      includeWarnings: false,
      includeNotices: false,
      wait: 500,
      chromeLaunchConfig: {
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
      },
    });

    const errors = result.issues.filter((issue) => issue.type === "error");
    const fingerprints = errors.map(fingerprint).sort();
    nextBaseline[route] = fingerprints;
    const acknowledged = new Set(baseline[route] || []);
    const newErrors = errors.filter((issue) => !acknowledged.has(fingerprint(issue)));

    if (errors.length === 0) {
      console.log(`PASS a11y ${route}`);
      continue;
    }

    if (newErrors.length === 0) {
      console.log(`PASS a11y ${route}: ${errors.length} acknowledged WCAG2AA baseline error(s)`);
      continue;
    }

    failed = true;
    console.error(`FAIL a11y ${route}: ${newErrors.length} new WCAG2AA error(s), ${errors.length} total`);
    for (const issue of newErrors) {
      console.error(formatIssue(issue));
    }
  }
} finally {
  server.kill("SIGTERM");
}

if (updateBaseline) {
  await writeFile(baselinePath, `${JSON.stringify(nextBaseline, null, 2)}\n`);
  console.log(`Updated accessibility baseline at ${baselinePath.pathname}`);
  process.exitCode = 0;
} else if (failed) {
  process.exitCode = 1;
}
