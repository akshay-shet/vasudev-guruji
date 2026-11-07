import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { faqs } from '../data/faq'
import { jsonLdFor, SITE_URL, seoFor } from '../data/seo'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = value
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el) }
  el.href = href
}

/** Keeps the page title, description, keywords, canonical URL, social cards and JSON-LD in step with the route. */
export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const seo = seoFor(path)
    const url = SITE_URL + (path === '/' ? '/' : path)
    const image = SITE_URL + (seo.image ?? '/img/hero-desktop.jpg')
    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'keywords', seo.keywords.join(', '))
    setMeta('name', 'robots', path.startsWith('/legal') ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    setLink('canonical', url)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', seo.type === 'product' ? 'product' : seo.type === 'profile' ? 'profile' : 'website')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', image)
    let ld = document.getElementById('ld-page') as HTMLScriptElement | null
    if (!ld) { ld = document.createElement('script'); ld.id = 'ld-page'; ld.type = 'application/ld+json'; document.head.appendChild(ld) }
    ld.textContent = JSON.stringify(jsonLdFor(path, faqs.filter((f) => !f.hidden).map((f) => ({ q: f.q, a: f.a }))))
  }, [pathname])
  return null
}
