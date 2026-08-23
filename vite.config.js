import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages SPA fallback plugin.
 *
 * GitHub Pages serves a 404.html for any path that doesn't match a real file,
 * and — crucially — it returns it with a 200 status while preserving the
 * original URL in the address bar. By mirroring index.html to 404.html at
 * build time, client-side routes like /books/abu-001 work on a refresh or
 * deep link instead of showing GitHub's 404 page.
 *
 * (This is the SPA "404.html trick". It only works on github.io / Pages
 *  hosting; a custom domain on Pages inherits the same behavior.)
 */
function ghPagesSpaFallback() {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const indexHtml = resolve(process.cwd(), 'dist', 'index.html');
      const notFoundHtml = resolve(process.cwd(), 'dist', '404.html');
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml);
        // eslint-disable-next-line no-console
        console.log('[gh-pages-spa-fallback] wrote dist/404.html');
      } else {
        console.warn('[gh-pages-spa-fallback] dist/index.html not found; skipping 404.html');
      }
    },
  };
}

// Custom domain (abutorab-pub.ir) → base is '/'.
// If you ever revert to a *.github.io/<repo> URL, set base: '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), ghPagesSpaFallback()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
