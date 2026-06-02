const rawBase = import.meta.env.BASE_URL || '/';
const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (path === '/') return base ? `${base}/` : '/';
  return `${base}${path}`;
}
