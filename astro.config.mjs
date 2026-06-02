import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const base = process.env.ASTRO_BASE_PATH || '/';

export default defineConfig({
  base,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
