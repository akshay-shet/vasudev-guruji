/**
 * Base URL for images and videos.
 *
 * By default media is served from the site itself (public/img, public/videos).
 * Set VITE_MEDIA_BASE_URL (e.g. https://media.vasudevguruji.com/) at build time to serve every
 * image and video from a Cloudflare R2 bucket on Cloudflare's CDN instead — see CLOUDFLARE_SETUP.md.
 * The bucket must mirror public/ (img/…, videos/…); `npm run media:upload` does that.
 */
const fromEnv = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)?.trim()
export const MEDIA: string = fromEnv ? (fromEnv.endsWith('/') ? fromEnv : fromEnv + '/') : import.meta.env.BASE_URL

/** Absolute or base-relative URL for a file under public/, e.g. media('img/hero-desktop.webp'). */
export const media = (path: string) => MEDIA + path.replace(/^\//, '')
