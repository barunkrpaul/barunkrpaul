import { defineConfig } from 'astro/config';

// Change `site` if you move to your own domain.
export default defineConfig({
  site: 'https://portfoliodp.web.app',
  output: 'static',
  trailingSlash: 'ignore',
});
