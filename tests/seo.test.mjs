import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

test('SEO: dist/robots.txt validation', () => {
  assert.ok(existsSync('dist/robots.txt'), 'dist/robots.txt must exist after build')
  const content = readFileSync('dist/robots.txt', 'utf8')
  assert.match(content, /User-agent:\s*\*/, 'robots.txt must declare User-agent: *')
  assert.match(content, /Sitemap:\s*https?:\/\//, 'robots.txt must include Sitemap URL')
})

test('SEO: dist/sitemap.xml validation', () => {
  assert.ok(existsSync('dist/sitemap.xml'), 'dist/sitemap.xml must exist after build')
  const content = readFileSync('dist/sitemap.xml', 'utf8')
  assert.match(content, /<\?xml version="1.0"/, 'sitemap.xml must have valid XML declaration')
  assert.match(content, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/, 'sitemap must have urlset schema')
  assert.match(content, /<loc>https?:\/\/.*\/<\/loc>/, 'sitemap must include homepage')
  assert.match(content, /<loc>https?:\/\/.*\/services<\/loc>/, 'sitemap must include services page')
  assert.match(content, /<loc>https?:\/\/.*\/life-line-horoscope<\/loc>/, 'sitemap must include Life Line Horoscope page')
})

test('SEO: Prerendered HTML pages structure', () => {
  const pages = ['dist/index.html', 'dist/about/index.html', 'dist/services/index.html', 'dist/homa/index.html']
  for (const page of pages) {
    assert.ok(existsSync(page), `${page} must exist as prerendered file`)
    const html = readFileSync(page, 'utf8')
    assert.match(html, /<title>[^<]+<\/title>/, `${page} must contain a non-empty <title>`)
    assert.match(html, /<meta name="description" content="[^"]+" \/>/, `${page} must contain a meta description`)
    assert.match(html, /<link rel="canonical" href="https?:\/\/[^"]+" \/>/, `${page} must contain a canonical URL`)
    assert.match(html, /<script type="application\/ld\+json"/, `${page} must contain structured JSON-LD data`)
  }
})
