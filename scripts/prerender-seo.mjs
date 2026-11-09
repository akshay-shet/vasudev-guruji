// After `vite build`: writes dist/<page>/index.html for every page with its own <title>, description,
// keywords, canonical, Open Graph / Twitter tags, JSON-LD and a crawlable text fallback,
// plus dist/sitemap.xml and dist/robots.txt. Runs automatically as part of `npm run build`.
import { build } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const out = await build({
  stdin: { contents: "export * from './src/data/seo'; export { faqs } from './src/data/faq'; export { services } from './src/data/content'; export { site } from './src/data/site'", resolveDir: process.cwd(), loader: 'ts' },
  bundle: true, write: false, format: 'esm', platform: 'node', define: { 'import.meta.env.BASE_URL': '"/"' }, logLevel: 'error',
})
const m = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'))
const { SITE_URL, allPaths, seoFor, jsonLdFor, notFoundSeo, faqs, services, site } = m

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const template = readFileSync('dist/index.html', 'utf8')
const faq = faqs.filter((f) => !f.hidden).map((f) => ({ q: f.q, a: f.a }))
const nav = [['/', 'Home'], ['/about', 'About Guruji'], ['/life-line-horoscope', 'Life Line Horoscope Book'], ['/services', 'Astrology Services'], ['/homa', 'Homa Booking'], ['/kundali-matching', 'Kundli Matching'], ['/shop', 'Shop'], ['/events', 'Events'], ['/gallery', 'Gallery'], ['/mantras', 'Mantras'], ['/contact', 'Contact']]

function render(path, seo, { notFound = false } = {}) {
  const url = SITE_URL + (path === '/' ? '/' : path)
  const image = SITE_URL + (seo.image ?? '/img/hero-desktop.jpg')
  const head = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords.join(', '))}" />`,
    `<meta name="robots" content="${notFound || path.startsWith('/legal') ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    notFound ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${seo.type === 'product' ? 'product' : seo.type === 'profile' ? 'profile' : 'website'}" />`,
    `<meta property="og:site_name" content="Vasudev Guruji" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    notFound ? '' : `<script type="application/ld+json" id="ld-page">${JSON.stringify(jsonLdFor(path, faq)).replace(/</g, '\\u003c')}</script>`,
    ...(path === '/' ? [
      // LCP: start downloading the correct hero image immediately, before the JS bundle runs
      '<link rel="preload" as="image" href="/img/hero-mobile.webp" type="image/webp" media="(max-width: 1023.98px)" fetchpriority="high" />',
      '<link rel="preload" as="image" href="/img/hero-desktop.webp" type="image/webp" media="(min-width: 1024px)" fetchpriority="high" />',
    ] : []),
  ].filter(Boolean).join('\n    ')
  const svc = path.startsWith('/services/') ? services.find((s) => s.slug === path.split('/')[2]) : null
  const fallback = `<noscript><main>
      <h1>${esc(svc ? svc.title : seo.title)}</h1><p>${esc(svc ? svc.about : seo.description)}</p>
      <p>Call or WhatsApp <a href="${site.phoneHref}">${site.phone}</a> · <a href="mailto:${site.email}">${site.email}</a><br/>${esc(site.address)} · ${esc(site.officeHours)}</p>
      <nav>${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join(' · ')}</nav>
      <h2>Services</h2><ul>${services.map((s) => `<li><a href="/services/${s.slug}">${esc(s.title)}</a> — ${esc(s.desc)}</li>`).join('')}</ul>
    </main></noscript>`
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="(description|keywords|robots|twitter:[a-z]+)"[^>]*>/g, '')
    .replace(/\s*<meta property="og:[a-z_]+"[^>]*>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    .replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback}`)
  return html
}

for (const path of allPaths) {
  const file = path === '/' ? 'dist/index.html' : join('dist', path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(path, seoFor(path)))
}
// Real 404 page (served with HTTP 404 by Vercel/Netlify for unknown URLs); the app shows "Page not found".
writeFileSync('dist/404.html', render('/404', notFoundSeo, { notFound: true }))

// Netlify: generate _headers from vercel.json so both hosts send identical security & caching headers.
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))
const toNetlify = (src) => src === '/(.*)' ? '/*' : src.replace('(.*)', '*')
const rules = vercel.headers.flatMap((h) => {
  const m = h.source.match(/^\/\(([^)]+)\)$/)
  const paths = m && m[1].includes('|') ? m[1].split('|').map((p) => '/' + p) : [toNetlify(h.source)]
  return paths.map((p) => `${p}\n${h.headers.map((x) => `  ${x.key}: ${x.value}`).join('\n')}`)
})
writeFileSync('dist/_headers', rules.join('\n\n') + '\n')

const today = new Date().toISOString().slice(0, 10)
const prio = (p) => (p === '/' ? '1.0' : ['/life-line-horoscope', '/services', '/contact', '/kundali-matching', '/homa'].includes(p) ? '0.9' : p.startsWith('/services/') ? '0.8' : p.startsWith('/legal') ? '0.2' : '0.6')
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${allPaths.filter((p) => !p.startsWith('/legal')).map((p) => {
  const s = seoFor(p)
  return `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' || p === '/events' ? 'weekly' : 'monthly'}</changefreq><priority>${prio(p)}</priority>${s.image ? `<image:image><image:loc>${SITE_URL}${s.image}</image:loc></image:image>` : ''}</url>`
}).join('\n')}\n</urlset>\n`)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /legal/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`SEO: ${allPaths.length} pages + 404.html, sitemap.xml, robots.txt and _headers written`)
