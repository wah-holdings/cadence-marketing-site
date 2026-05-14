import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
