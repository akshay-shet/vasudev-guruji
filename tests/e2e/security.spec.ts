import { expect, test } from '@playwright/test'
import { ROUTES, settle, watchProblems } from './helpers'

test.describe('security headers', () => {
  test('HTML responses carry the full header set', async ({ request }) => {
    for (const path of ['/', '/about', '/services/vastu-expert', '/does-not-exist']) {
      const res = await request.get(path, { maxRedirects: 0 })
      const h = res.headers()
      const csp = h['content-security-policy'] ?? ''
      expect(csp, path).toContain("default-src 'self'")
      expect(csp).toContain("script-src 'self'")
      expect(csp).not.toContain('unsafe-inline')
      expect(csp).not.toContain('unsafe-eval')
      expect(csp).toContain("frame-ancestors 'none'")
      expect(csp).toContain("object-src 'none'")
      expect(h['strict-transport-security']).toMatch(/max-age=\d{7,}/)
      expect(h['x-content-type-options']).toBe('nosniff')
      expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin')
      expect(h['permissions-policy']).toContain('camera=()')
      expect(h['cross-origin-opener-policy']).toBe('same-origin')
    }
  })

  test('no deprecated or leaky headers', async ({ request }) => {
    const h = (await request.get('/')).headers()
    expect(h['x-powered-by']).toBeUndefined()
    expect(h['x-xss-protection']).toBeUndefined()
    expect(h['set-cookie']).toBeUndefined() // the site sets no cookies at all
  })

  for (const path of ROUTES) {
    test(`no CSP violations or console errors on ${path}`, async ({ page }) => {
      const problems = watchProblems(page)
      await page.goto(path)
      await settle(page)
      await page.mouse.wheel(0, 4000)
      await page.waitForTimeout(500)
      expect(problems).toEqual([])
    })
  }

  test('only POST-free methods are accepted by the static host', async ({ request }) => {
    const res = await request.post('/', { data: 'x' })
    expect(res.status()).toBe(405)
  })

  test('path traversal does not escape the site root', async ({ request }) => {
    const res = await request.get('/..%2f..%2fpackage.json')
    expect(res.status()).toBe(404)
    expect(await res.text()).not.toContain('"devDependencies"')
  })

  test('build output contains no secrets or source maps', async ({ request }) => {
    const html = await (await request.get('/')).text()
    const js = html.match(/src="(\/assets\/index-[^"]+\.js)"/)![1]
    const bundle = await (await request.get(js)).text()
    expect(bundle).not.toMatch(/sk-(proj|ant)-[A-Za-z0-9_-]{10,}/)
    expect(bundle).not.toContain('sourceMappingURL')
    expect((await request.get(js + '.map')).status()).toBe(404)
  })
})

test.describe('user input is never executed', () => {
  test('chat renders typed HTML as text (no XSS)', async ({ page }) => {
    const problems = watchProblems(page)
    await page.goto('/')
    await settle(page)
    await page.getByRole('button', { name: /open chat/i }).click()
    const payload = '<img src=x onerror="window.__xss=1"><script>window.__xss=1</script>'
    await page.locator('#chatw-in').fill(payload)
    await page.keyboard.press('Enter')
    await expect(page.getByText(payload, { exact: true })).toBeVisible()
    await page.waitForTimeout(800)
    expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined()
    expect(problems).toEqual([])
  })

  test('enquiry form builds a WhatsApp link with the input safely encoded', async ({ page, context }) => {
    // Capture the outgoing WhatsApp URL without contacting WhatsApp.
    let sent = ''
    await context.route(/https:\/\/(wa\.me|api\.whatsapp\.com)\/.*/, (route) => { sent = route.request().url(); return route.fulfill({ status: 200, body: 'ok' }) })
    await page.goto('/contact')
    await settle(page)
    await page.locator('#eq-name').fill('Test & <b>Devotee</b>')
    await page.locator('#eq-phone').fill('+91 98765 43210')
    await page.locator('#eq-msg').fill('line1\nline2 #?&=')
    await page.getByRole('button', { name: /send on whatsapp/i }).click()
    await expect.poll(() => sent).toMatch(/^https:\/\/(wa\.me|api\.whatsapp\.com)\//)
    const text = new URL(sent).searchParams.get('text') ?? ''
    expect(text).toContain('Test & <b>Devotee</b>')
    expect(text).toContain('line2 #?&=')
    expect(new URL(sent).pathname).toContain('919035959911')
  })

})
