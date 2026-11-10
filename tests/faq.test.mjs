import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from 'esbuild'

// Bundle faq.ts to verify functions without TS runtime overhead
const out = await build({
  stdin: { contents: "export * from './src/data/faq'; export { site } from './src/data/site'", resolveDir: process.cwd(), loader: 'ts' },
  bundle: true, write: false, format: 'esm', platform: 'node',
  define: {
    'import.meta.env.BASE_URL': '"/"',
    'import.meta.env.VITE_MEDIA_BASE_URL': 'undefined',
  },
  logLevel: 'error',
})
const m = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'))
const { faqs, matchFaq, site } = m

test('Vedic FAQ: Data integrity', () => {
  assert.ok(Array.isArray(faqs), 'faqs must be an array')
  assert.ok(faqs.length >= 10, 'faqs must have at least 10 core questions')

  for (const f of faqs) {
    assert.ok(f.id, 'FAQ item must have an id')
    assert.ok(f.q && typeof f.q === 'string', 'FAQ must have a question')
    assert.ok(f.a && typeof f.a === 'string', 'FAQ must have an answer')
  }
})

test('Vedic FAQ: Matcher algorithm', () => {
  const match1 = matchFaq('Where is Guruji located?')
  assert.ok(match1, 'Must match location question')
  assert.equal(match1.id, 'location')

  const match2 = matchFaq('How can I book a homa?')
  assert.ok(match2, 'Must match homa booking')
  assert.equal(match2.id, 'book')

  const match3 = matchFaq('How does Guna Milan work?')
  assert.ok(match3, 'Must match guna milan')
  assert.equal(match3.id, 'gunamilan')
})

test('Site Config: Phone and Contact details integrity', () => {
  assert.ok(site.phone, 'site.phone must be defined')
  assert.ok(site.whatsapp, 'site.whatsapp must be defined')
  assert.match(site.whatsapp, /^\d+$/, 'site.whatsapp must only contain digits')
  assert.ok(site.email.includes('@'), 'site.email must be valid email format')
})
