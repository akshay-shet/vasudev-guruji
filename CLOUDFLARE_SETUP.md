# Serving images & videos from Cloudflare (R2 + CDN)

The website already loads every image and video through one setting, `VITE_MEDIA_BASE_URL`
(see `src/lib/media.ts`). When it is **empty** (today), media is served by the website host
(Vercel). When it is **set**, every image, video and poster is loaded from a Cloudflare R2
bucket through Cloudflare's CDN — close to visitors in India and worldwide, on Android and desktop.

Nothing changes on the live site until steps 5–6 are done.

## 1. Create the bucket (Cloudflare dashboard)
1. Cloudflare dashboard → **R2 Object Storage** → **Create bucket**
2. Name: `vasudev-guruji-media` · Location: *Automatic* (or a hint of *Asia-Pacific*)

## 2. Give the bucket a public address
Bucket → **Settings** → **Public access**:
- **Recommended:** *Custom Domains* → **Connect domain** → `media.<your-domain>`
  (the domain must be added to Cloudflare). Only a custom domain gets Cloudflare's full
  CDN caching.
- For a quick test only: enable the `r2.dev` subdomain (rate-limited, not for production).

## 3. Create an API token for uploading
R2 → **Manage R2 API Tokens** → **Create API token**
- Permission: **Object Read & Write**, limited to the `vasudev-guruji-media` bucket
- Copy the **Access Key ID**, **Secret Access Key** and your **Account ID**

Put them in `.env.local` in the project folder (this file is git-ignored — never commit it):
```
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_BUCKET=vasudev-guruji-media
```

## 4. Upload the media
```
npm run media:check     # lists what would be uploaded
npm run media:upload    # uploads public/img and public/videos (only new/changed files)
```
Files keep the same paths, e.g. `public/img/hero-desktop.webp` → `https://media.<your-domain>/img/hero-desktop.webp`.
Open one of those links in a browser to confirm it loads.

## 5. Allow the new address in the security policy
In `vercel.json`, add the media origin to `img-src` and `media-src` of the
`Content-Security-Policy`, e.g.
```
img-src 'self' data: https://media.<your-domain>; … media-src 'self' https://media.<your-domain>;
```
(The build stops with a clear message if this is forgotten, so images can never be silently blocked.)

## 6. Switch the website over
Vercel → Project → **Settings → Environment Variables** → add
`VITE_MEDIA_BASE_URL = https://media.<your-domain>/` (Production) → **Redeploy**.

## Recommended Cloudflare settings (media domain)
- **Caching → Cache Rules**: for hostname `media.<your-domain>` → *Eligible for cache*, Edge TTL **1 month**,
  Browser TTL *respect origin* (uploads send `max-age=604800, stale-while-revalidate=86400`).
- **Caching → Tiered Cache**: on.
- **Speed → Optimization → Protocol**: HTTP/3 on (default).

## Adding or replacing images/videos later
1. Put the file in `public/img/…` or `public/videos/…` as usual
2. `npm run media:upload`
3. Deploy the website
If a file is replaced under the same name, purge it in Cloudflare (Caching → Purge by URL) so visitors get the new one at once.

## Undo
Remove `VITE_MEDIA_BASE_URL` in Vercel and redeploy — media is served from the website again.
