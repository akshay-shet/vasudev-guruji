# Production Audit — Vasudev Guruji website

_Audit date: 2026-11-07 · Commit audited: `b60aa3d`_

## 1. Current architecture (as found)

| Area | Finding |
|---|---|
| Frontend | React 18.3.1 + TypeScript 5.5 + Vite 5.4.6 + Tailwind 3.4. Client-side rendered SPA (`react-router-dom` 6.26.2, `BrowserRouter`; `MemoryRouter` only for the claude.ai preview build). |
| Rendering | CSR. A post-build script (`scripts/prerender-seo.mjs`) writes one HTML file per public route with page-specific meta tags, JSON-LD and a `<noscript>` text fallback. Body content is rendered by JavaScript. |
| Backend / API | **None.** The former `api/chat.ts` serverless function was removed; the chat now answers from a fixed list in `src/data/faq.ts`. |
| Database / ORM | **None.** All content lives in TypeScript data files (`src/data/*.ts`). |
| Authentication / sessions | **None.** No accounts, logins, tokens or cookies. |
| Payments | **None on the site.** Orders, bookings and enquiries open WhatsApp (`wa.me`) with a pre-filled message that the visitor sends themselves. |
| Storage | `sessionStorage` only, for language, theme and "intro shown" flags. No personal data is stored. |
| Third parties | WhatsApp deep links, Google Maps links (outbound only), YouTube-nocookie iframe (only if a `youtubeId` is configured — currently empty), self-hosted fonts (Fontsource). No analytics, no trackers, no external scripts. |
| Caching | None configured. No `Cache-Control` rules in `vercel.json`/`netlify.toml`; platform defaults only. |
| Hosting | Vercel (`vercel.json`: catch-all rewrite to `/index.html`) with a Netlify fallback (`netlify.toml`). Not yet deployed (push to GitHub pending on the owner's machine). |
| Env / secrets | No environment variables are required. `.env` is git-ignored; the previously pasted OpenAI key was removed from the project and never committed (verified with `git grep`). |
| Tests | **None.** |
| CI/CD | **None.** No GitHub Actions, no dependency or secret scanning. |
| Monitoring | **None.** No error boundary, no error reporting, no Web Vitals collection. |

## 2. Already production-ready

- Per-page SEO (titles, descriptions, canonical, OG/Twitter, JSON-LD, sitemap, robots) — added in the previous change.
- No server, so there is no server-side attack surface (no SQLi/NoSQLi/SSRF/IDOR/auth issues are possible).
- No `dangerouslySetInnerHTML`, `eval` or `new Function` in app code; all user text is rendered through React (auto-escaped).
- WhatsApp messages are built with `encodeURIComponent`.
- External links use `rel="noopener"`.
- Fonts self-hosted (no third-party font requests).
- `prefers-reduced-motion` respected in CSS.

## 3. Findings and risks

| # | Severity | Finding | Recommendation |
|---|---|---|---|
| 1 | **High** | `react-router-dom` 6.26.2 → `@remix-run/router` ≤1.23.2: open-redirect / XSS advisories (GHSA-2w69-qvjg-hvjx, GHSA-2j2x-hqr9-3h42). Shipped to browsers. | Upgrade to 6.30.x (same major, no API changes). |
| 2 | **High** | No HTTP security headers (no CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors). Site can be framed (clickjacking) and has no XSS defence-in-depth. | Add headers in `vercel.json` (and Netlify `_headers`). Strict CSP with `script-src 'self'`. |
| 3 | **High** (build-time) | `postcss` ≤8.5.22 advisories (source-map file read, `</style>` XSS in stringify). Dev/build-time only. | Upgrade to 8.5.x latest. |
| 4 | Medium | Every unknown URL returns HTTP 200 with the home page (soft 404). Bad for SEO; `/services/anything` is indexable. | Serve prerendered routes as static files; real 404 status with `404.html` (`noindex`). |
| 5 | Medium | No caching policy: fingerprinted assets and 7.6 MB of media revalidate on every visit. | `immutable` for `/assets/*`, long-lived caching for images/fonts/video, `no-cache` for HTML. |
| 6 | Medium | Mobile performance: Lighthouse 50, LCP 9.6 s (lab). The hero image is discovered only after the 452 KB JS bundle runs; both hero images (≈930 KB JPEG) download on phones. | Preload the right hero per viewport, render only the visible one, WebP images, route-level code splitting. |
| 7 | Medium | Three components inject inline `<style>` elements, which would force `style-src 'unsafe-inline'` in a CSP. | Move the keyframes into `index.css`. |
| 8 | Medium | No error boundary: any render error shows a blank page. | Add a top-level error boundary with a friendly fallback and Call/WhatsApp links. |
| 9 | Medium | No automated tests, CI, dependency or secret scanning. | Unit tests (data/logic), Playwright end-to-end tests (routes, headers, CSP, a11y), GitHub Actions, Dependabot. |
| 10 | Medium | Accessibility issues (Lighthouse/axe): colour contrast on some small text, a prohibited ARIA attribute, accessible names not matching visible labels, small touch targets. | Fix without visual redesign. |
| 11 | Low | `esbuild` ≤0.24.2 advisory (dev server can be read by other sites). Dev-only; Vite 5 pins esbuild 0.21. | Keep dev server on localhost; fix with the Vite 6+ upgrade later (major version — not done blindly). |
| 12 | Low | Dead code: `Discourses` page still bundled although `/discourses` redirects to `/gallery`. | Remove. |
| 13 | Low | No trailing-slash normalisation (`/about/` and `/about` both served). | `trailingSlash: false`. |
| 14 | Low | Social links in `site.ts` point at platform home pages (placeholders). | Owner to supply real URLs. |
| 15 | Info | Content risks (not code): the Life Line poster shows the prices reversed (999 large, 499 struck out); the Samruddhi signboard shows another astrologer's name and number. | Owner to correct artwork. |

### Not applicable (no server / database / accounts)

Password hashing, login throttling, session/token handling, CSRF, server-side authorization/IDOR, SQL/NoSQL injection, SSRF, file uploads, API rate limiting, server/database caching, query optimisation, connection pooling, migrations, backups of a database. These become relevant only if a backend is added later — see `SECURITY_IMPLEMENTATION.md` §"If a backend is added".

## 4. Baseline measurements (before changes)

Lighthouse 12.6.1, local production-like server (`scripts/serve-prod.mjs`, brotli, no CDN), simulated throttling. **Lab data only — not field data.**

| Page | Perf | A11y | Best practices | SEO | LCP | TBT | CLS | Transfer |
|---|---|---|---|---|---|---|---|---|
| Home (mobile) | 50 | 91 | 100 | 100 | 9.6 s | 460 ms | 0 | 2,009 KiB |
| Home (desktop) | 85 | 91 | 100 | 100 | 1.9 s | 0 ms | 0.007 | 2,009 KiB |
| About (mobile) | 77 | 100 | 100 | 100 | 3.9 s | 40 ms | 0 | 749 KiB |

`npm audit`: 6 vulnerabilities (5 high, 1 moderate). Main JS bundle 452 KB (160 KB gzip).

## 5. Implementation plan (priority order)

1. Dependency upgrades (#1, #3) and security headers + CSP (#2, #7).
2. Static routing with real 404s, redirects, caching headers (#4, #5, #13).
3. Error boundary (#8), dead code (#12).
4. Performance: hero preload/selection, WebP, code splitting (#6).
5. Accessibility fixes (#10).
6. Tests, CI, Dependabot, secret scanning (#9).
7. Documentation and final verification.

## 6. Deployment prerequisites

- Vercel (or Netlify) project connected to the GitHub repository. Framework preset **Vite**; build command `npm run build`; output `dist`.
- HTTPS on the production domain (required for HSTS — Vercel/Netlify provide it automatically).
- No environment variables needed.
