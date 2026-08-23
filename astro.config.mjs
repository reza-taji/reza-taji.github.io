// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin — used by sitemap generation and canonical URLs.
  site: 'https://abutorab-pub.ir',

  // Static output: every page is pre-rendered to plain HTML at build time.
  // (This is the default in Astro 5, stated explicitly for clarity.)
  output: 'static',

  // Custom domain on GitHub Pages → base is '/'.
  // If you ever deploy to <user>.github.io/<repo>, set base: '/<repo>/'.
  base: '/',

  integrations: [react(), tailwind(), sitemap()],

  // RTL-friendly defaults: Astro generates the HTML shell; each layout sets
  // dir="rtl" lang="fa" on <html>. No trailing-slash juggling needed for
  // GitHub Pages since we emit real directory/index.html pages.
  trailingSlash: 'ignore',

  build: {
    // GitHub Pages serves everything from the branch/artifact; inline small
    // stylesheets for faster first paint on a static catalog.
    inlineStylesheets: 'auto',
  },
});
