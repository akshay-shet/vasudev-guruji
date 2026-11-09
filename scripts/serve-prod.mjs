// Local production-like server for testing the built site (dist/).
// Mirrors the Vercel deployment: clean URLs (/about -> /about/index.html), redirects and
// headers from vercel.json, gzip/brotli compression and a real 404 status with 404.html.
// Usage: node scripts/serve-prod.mjs [port]   (default 4300)
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { brotliCompressSync, gzipSync } from 'node:zlib'

const root = resolve('dist')
const port = Number(process.argv[2] ?? 4300)
const cfg = JSON.parse(readFileSync('vercel.json', 'utf8'))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.ico': 'image/x-icon' }
const compressible = /\.(html|js|css|json|xml|txt|svg)$/

// vercel.json "source" patterns -> RegExp (supports :param, (.*) and :path*)
const toRe = (src) => new RegExp('^' + src.replace(/\(\.\*\)/g, '§').replace(/:(\w+)\*/g, '§').replace(/:(\w+)/g, '[^/]+').replace(/[.]/g, '\\.').replace(/§/g, '.*') + '$')

function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  const base = join(root, clean)
  if (!base.startsWith(root)) return null // path traversal guard
  for (const c of [base, base + '.html', join(base, 'index.html')]) if (existsSync(c) && statSync(c).isFile()) return c
  return null
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://x')
  let path = url.pathname
  if (!['GET', 'HEAD'].includes(req.method ?? '')) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end() }
  if (cfg.trailingSlash === false && path.length > 1 && path.endsWith('/')) { res.writeHead(308, { Location: path.slice(0, -1) + url.search }); return res.end() }
  for (const r of cfg.redirects ?? []) if (toRe(r.source).test(path)) { res.writeHead(r.permanent ? 308 : 307, { Location: r.destination }); return res.end() }

  let file = resolveFile(path)
  let status = 200
  if (!file) { file = join(root, '404.html'); status = 404 }
  const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', Vary: 'Accept-Encoding' }
  for (const h of cfg.headers ?? []) if (toRe(h.source).test(path)) for (const { key, value } of h.headers) headers[key] = value

  let body = readFileSync(file)
  const ae = String(req.headers['accept-encoding'] ?? '')
  if (compressible.test(file) && body.length > 1024) {
    if (ae.includes('br')) { body = brotliCompressSync(body); headers['Content-Encoding'] = 'br' }
    else if (ae.includes('gzip')) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip' }
  }
  headers['Content-Length'] = body.length
  res.writeHead(status, headers)
  res.end(req.method === 'HEAD' ? undefined : body)
}).listen(port, () => console.log(`serving dist on http://localhost:${port}`))
