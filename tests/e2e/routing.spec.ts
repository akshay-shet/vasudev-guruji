import { expect, test } from '@playwright/test'
import { ROUTES, settle } from './helpers'

test.describe('routing, 404 and redirects', () => {
  for (const path of ROUTES) {
    test(`${path} returns 200 with its own title, canonical and one h1`, async ({ page, request }) => {
      const res = await request.get(path)
      expect(res.status()).toBe(200)
      const html = await res.text()
      expect(html).toMatch(/<title>[^<]{10,}<\/title>/)
      expect(html).toContain(`<link rel="canonical" href="https://vasudev-guruji.vercel.app${path === '/' ? '/' : path}"`)
      await page.goto(path)
      await settle(page)
      await expect(page.locator('h1').first()).toBeVisible()
    })
  }

  test('unknown URLs get a real 404, noindex and a friendly page', async ({ page, request }) => {
    for (const path of ['/nope', '/services/not-a-service', '/legal/unknown']) {
      const res = await request.get(path)
      expect(res.status(), path).toBe(404)
      expect(await res.text()).toContain('noindex')
    }
    await page.goto('/services/not-a-service')
    await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('old and trailing-slash URLs redirect permanently', async ({ request }) => {
    const a = await request.get('/discourses', { maxRedirects: 0 })
    expect(a.status()).toBe(308)
    expect(a.headers()['location']).toBe('/gallery')
    const b = await request.get('/about/', { maxRedirects: 0 })
    expect(b.status()).toBe(308)
    expect(b.headers()['location']).toBe('/about')
  })

  test('sitemap lists public pages only and robots points to it', async ({ request }) => {
    const sm = await (await request.get('/sitemap.xml')).text()
    expect(sm).toContain('/services/vastu-expert</loc>')
    expect(sm).not.toContain('/legal/')
    expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://vasudev-guruji.vercel.app/sitemap.xml')
  })

  test('client-side navigation updates title and canonical', async ({ page, isMobile }) => {
    await page.goto('/')
    await settle(page)
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'Contact', exact: true }).click()
    } else {
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Contact', exact: true }).click()
    }
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page).toHaveTitle(/Contact Vasudev Guruji/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://vasudev-guruji.vercel.app/contact')
  })
})

test.describe('caching headers', () => {
  test('fingerprinted assets are immutable, HTML revalidates, media is cached', async ({ request }) => {
    const res = await request.get('/')
    expect(res.headers()['cache-control']).toBe('public, max-age=0, must-revalidate')
    const html = await res.text()
    const js = html.match(/src="(\/assets\/index-[^"]+\.js)"/)![1]
    expect((await request.get(js)).headers()['cache-control']).toBe('public, max-age=31536000, immutable')
    expect((await request.get('/img/hero-mobile.webp')).headers()['cache-control']).toContain('max-age=604800')
    expect((await request.get('/sitemap.xml')).headers()['cache-control']).toBe('public, max-age=3600')
  })
})
