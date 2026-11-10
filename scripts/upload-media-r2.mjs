// Uploads public/img and public/videos to a Cloudflare R2 bucket so Cloudflare's CDN serves them.
// Only new or changed files are sent (compared by MD5/ETag). Nothing is ever deleted from the bucket.
//
//   R2_ACCOUNT_ID=…  R2_ACCESS_KEY_ID=…  R2_SECRET_ACCESS_KEY=…  R2_BUCKET=vasudev-guruji-media  npm run media:upload
//   add  --dry-run  to only list what would be uploaded.
// Credentials come from the environment (or an untracked .env.local) — never commit them. See CLOUDFLARE_SETUP.md.
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'
import { loadEnv } from 'vite'

const env = { ...loadEnv('production', process.cwd(), 'R2_'), ...process.env }
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = env
const dry = process.argv.includes('--dry-run')
if (!dry && !(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET)) {
  console.error('Missing R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET (see CLOUDFLARE_SETUP.md).')
  process.exit(1)
}

const TYPES = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm' }
// Images/videos keep their file names when replaced, so use a week + stale-while-revalidate (same as vercel.json),
// not "immutable". Cloudflare's edge caches them; browsers revalidate after a week.
const CACHE = 'public, max-age=604800, stale-while-revalidate=86400'

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p] })
const files = ['public/img', 'public/videos'].flatMap(walk).filter((f) => TYPES[extname(f).toLowerCase()])

const s3 = dry ? null : new S3Client({ region: 'auto', endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY } })
let sent = 0, same = 0, bytes = 0
for (const f of files) {
  const Key = relative('public', f).split(sep).join('/')
  const Body = readFileSync(f)
  const md5 = createHash('md5').update(Body).digest('hex')
  if (dry) { console.log('would upload', Key); continue }
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key }))
    if (head.ETag?.replace(/"/g, '') === md5) { same++; continue }
  } catch { /* not in the bucket yet */ }
  await s3.send(new PutObjectCommand({ Bucket: R2_BUCKET, Key, Body, ContentType: TYPES[extname(f).toLowerCase()], CacheControl: CACHE }))
  sent++; bytes += Body.length
  console.log('↑', Key)
}
console.log(dry ? `${files.length} files would be checked.` : `Done: ${sent} uploaded (${(bytes / 1048576).toFixed(1)} MB), ${same} unchanged.`)
