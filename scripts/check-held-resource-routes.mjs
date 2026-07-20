import { spawn } from "node:child_process";

const port = 8788;
const baseUrl = `http://127.0.0.1:${port}`;
const heldRoutes = [
  "/resources/how-to-write-performance-improvement-plan",
  "/resources/hris-vs-people-ops-platform",
];

const server = spawn(
  "npx",
  ["--yes", "wrangler@4.112.0", "pages", "dev", "dist", "--port", String(port), "--ip", "127.0.0.1", "--compatibility-date", "2026-01-14"],
  { stdio: ["ignore", "pipe", "pipe"] },
);

let output = "";
server.stdout.on("data", (chunk) => { output += chunk; });
server.stderr.on("data", (chunk) => { output += chunk; });

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      await fetch(baseUrl);
      return;
    } catch {
      await sleep(1_000);
    }
  }
  throw new Error(`Cloudflare Pages local runtime did not start:\n${output}`);
}

try {
  await waitForServer();
  for (const route of heldRoutes) {
    const response = await fetch(`${baseUrl}${route}`);
    if (response.status !== 404) {
      throw new Error(`${route}: expected 404, got ${response.status}`);
    }
    console.log(`PASS ${route}: 404`);
  }
} finally {
  server.kill("SIGTERM");
}
