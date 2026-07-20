import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), 'utf8');
const stylesheets = ['css/cadence.css', 'public/css/cadence.css'].map(read);
const layout = read('src/layouts/BaseLayout.astro');

const checks = [
  ['stylesheets keep .fade-up visible without JavaScript', stylesheets.every((css) => /\.fade-up\s*\{\s*opacity:\s*1;\s*transform:\s*none;\s*\}/.test(css))],
  ['hidden state is scoped to the enhancement class', stylesheets.every((css) => /\.fade-up-enabled \.fade-up\s*\{\s*opacity:\s*0;/.test(css))],
  ['reduced-motion users retain visible content', stylesheets.every((css) => /prefers-reduced-motion:\s*reduce/.test(css))],
  ['layout enables animation only with observer support', layout.includes("'IntersectionObserver' in window") && layout.includes("classList.add('fade-up-enabled')")],
  ['layout exposes a callback failure failsafe', layout.includes('window.setTimeout(revealAll, 1600)') && layout.includes('catch {\n    revealAll();')],
];

const failures = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failures.length) {
  console.error('Fade-up reliability check failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Fade-up reliability check passed (${checks.length}/${checks.length}).`);
