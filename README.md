# نشر مکتب ابوتراب

Static Persian/RTL publisher website for author outreach and professional collaboration. There is no catalog, storefront, backend, or submission form; conversations and file submission begin in Bale.

## Configuration

- Set the real support account in `src/utils/bale.ts` (`BALE_ID`). `Abutorab_Admin` is a placeholder, not a verified account.
- Set the verified Bale channel URL, email, and phone in `src/config.ts`. Empty values display an honest “coming soon” state and are excluded from structured data.
- Replace `public/logo.svg` with your official logo and update `PUBLISHER.logoUrl` if needed.
- Review the proposed publishing fields, manuscript guidelines, and collaboration copy before launch.

## Development

Use Node.js 22.12+ and npm 10.8.2+. If your npm is older, run `npm install --global npm@11` after selecting Node 22.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Deployment

Commit `package-lock.json` with the source. In GitHub repository settings, select **Pages → Source → GitHub Actions** and configure `abutorab-pub.ir` as the custom domain. The workflow publishes the complete `dist/` artifact, including styles and self-hosted fonts. `public/CNAME`, `public/robots.txt`, and the generated sitemap use the custom domain. Do not upload source files or just the HTML files.

Routes: `/`, `/submit-manuscript/`, `/collaboration/`, `/contact/`, and a real `404.html`. The about section is at `/#about`. Legacy React pages are prefixed with `_` so Astro ignores them; they are not part of the published site.

The React Vite plugin is pinned to `6.1.1` to match the compiler peer range required by `@astrojs/react@7.0.0`. Recheck those peer requirements before removing the override or upgrading the integration.
