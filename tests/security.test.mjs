import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Security Headers: vercel.json configuration', () => {
  const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'))
  assert.ok(Array.isArray(vercelConfig.headers), 'Headers must be an array')

  // Find general headers rule
  const rootHeaderRule = vercelConfig.headers.find((h) => h.source === '/(.*)')
  assert.ok(rootHeaderRule, 'Must define security headers for all routes')

  const headerKeys = rootHeaderRule.headers.map((h) => h.key.toLowerCase())
  assert.ok(headerKeys.includes('content-security-policy'), 'CSP header missing')
  assert.ok(headerKeys.includes('strict-transport-security'), 'HSTS header missing')
  assert.ok(headerKeys.includes('x-content-type-options'), 'X-Content-Type-Options missing')
  assert.ok(headerKeys.includes('x-frame-options'), 'X-Frame-Options missing')
  assert.ok(headerKeys.includes('referrer-policy'), 'Referrer-Policy missing')
  assert.ok(headerKeys.includes('permissions-policy'), 'Permissions-Policy missing')

  // Check CSP directives
  const csp = rootHeaderRule.headers.find((h) => h.key.toLowerCase() === 'content-security-policy').value
  assert.match(csp, /default-src 'self'/, 'CSP must enforce default-src self')
  assert.match(csp, /frame-ancestors ('self'|'none')/, 'CSP must restrict frame-ancestors to prevent clickjacking')
})

test('Security Headers: netlify.toml configuration', () => {
  const netlifyConfig = readFileSync('netlify.toml', 'utf8')
  assert.match(netlifyConfig, /Content-Security-Policy/, 'Netlify must include CSP')
  assert.match(netlifyConfig, /Strict-Transport-Security/, 'Netlify must include HSTS')
  assert.match(netlifyConfig, /X-Content-Type-Options/, 'Netlify must include nosniff')
  assert.match(netlifyConfig, /X-Frame-Options/, 'Netlify must include X-Frame-Options')
})

test('Data Sanitization: WhatsApp number and input sanitization', () => {
  const cleanPhone = (phone) => (phone || '').replace(/\D/g, '')
  assert.equal(cleanPhone('+91 90359 59911'), '919035959911')
  assert.equal(cleanPhone('91-90359-59911'), '919035959911')

  const cleanInput = (val, max = 200) =>
    typeof val === 'string' ? val.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '').slice(0, max) : ''

  const dirty = '\u0000Harmful\u001F Input \r\n'
  assert.equal(cleanInput(dirty), 'Harmful Input')
})

test('Secret Protection: .gitignore coverage', () => {
  const gitignore = readFileSync('.gitignore', 'utf8')
  assert.match(gitignore, /\.env/, '.gitignore must ignore .env files')
  assert.match(gitignore, /\.env\.local/, '.gitignore must ignore .env.local')
})
