import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Caching Headers: immutable static assets in vercel.json', () => {
  const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'))
  const assetRule = vercelConfig.headers.find((h) => h.source === '/assets/(.*)')
  assert.ok(assetRule, 'Missing caching rule for /assets/(.*)')

  const cacheHeader = assetRule.headers.find((h) => h.key === 'Cache-Control')
  assert.ok(cacheHeader, 'Missing Cache-Control header for /assets/(.*)')
  assert.match(cacheHeader.value, /immutable/, 'Static fingerprinted assets must be marked immutable')
  assert.match(cacheHeader.value, /max-age=31536000/, 'Static assets must have 1-year cache')
})

test('Caching Headers: public media in vercel.json', () => {
  const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'))
  const mediaRule = vercelConfig.headers.find((h) => h.source === '/(img|videos)/(.*)')
  assert.ok(mediaRule, 'Missing caching rule for images and videos')

  const cacheHeader = mediaRule.headers.find((h) => h.key === 'Cache-Control')
  assert.ok(cacheHeader, 'Missing Cache-Control for media')
  assert.match(cacheHeader.value, /stale-while-revalidate/, 'Media should allow stale-while-revalidate')
})
