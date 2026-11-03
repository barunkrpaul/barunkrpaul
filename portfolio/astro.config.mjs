import { defineConfig } from 'astro/config';

// Set `site` to the final domain once it is chosen (used for canonical URLs and the sitemap).
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
});
