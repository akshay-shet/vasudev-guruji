import { expect, test } from '@playwright/test'
import { settle, watchProblems } from './helpers'

test('home page hero: only the hero for this screen size is rendered and preloaded', async ({ page, isMobile }) => {
  const images: string[] = []
  page.on('request', (r) => { if (r.resourceType() === 'image') images.push(new URL(r.url()).pathname) })
  await page.goto('/')
  await settle(page)
  const hero = await page.locator('main img').first().getAttribute('src')
  expect(hero).toBe(isMobile ? '/img/hero-mobile.webp' : '/img/hero-desktop.webp')
  // the other screen size's hero is never fetched (hero-desktop may still appear later as a small card background)
  if (!isMobile) expect(images).not.toContain('/img/hero-mobile.webp')
  expect(images[0]).toBe(isMobile ? '/img/hero-mobile.webp' : '/img/hero-desktop.webp')
})

test('chat answers a known question and falls back to Call/WhatsApp otherwise', async ({ page }) => {
  await page.goto('/')
  await settle(page)
  await page.getByRole('button', { name: /open chat/i }).click()
  await page.locator('#chatw-in').fill('what are the office hours')
  await page.keyboard.press('Enter')
  await expect(page.getByText(/10:00 AM to 6:00 PM/)).toBeVisible()
  await page.locator('#chatw-in').fill('what is the capital of france')
  await page.keyboard.press('Enter')
  await expect(page.getByText(/call or WhatsApp Guruji’s office directly/).last()).toBeVisible()
  await expect(page.getByRole('dialog').getByRole('link', { name: /call guruji/i }).last()).toHaveAttribute('href', 'tel:+919035959911')
})

test('shop: add, change quantity and enquire on WhatsApp', async ({ page }) => {
  await page.goto('/shop')
  await settle(page)
  await page.locator('button:has-text("+ Add")').first().click()
  await page.getByRole('button', { name: /^Add one/ }).first().click()
  const link = page.getByRole('link', { name: /enquire on whatsapp/i })
  await expect(link).toBeVisible()
  const href = decodeURIComponent((await link.getAttribute('href'))!)
  expect(href).toMatch(/^https:\/\/wa\.me\/919035959911\?text=/)
  expect(href).toMatch(/× 2/)
})

test('Guna Milan calculator shows a score out of 36', async ({ page }) => {
  await page.goto('/kundali-matching')
  await settle(page)
  await expect(page.getByText(/\/ 36/).first()).toBeVisible()
})

test('language switch to Kannada loads lazily and translates, then back to English', async ({ page }) => {
  const problems = watchProblems(page)
  await page.goto('/contact')
  await settle(page)
  const before = await page.locator('h1').innerText()
  await page.evaluate(() => sessionStorage.setItem('vg-lang', 'te'))
  await page.reload()
  await settle(page)
  await expect.poll(() => page.locator('html').getAttribute('lang')).toBe('te')
  await expect.poll(async () => (await page.locator('main').innerText()).match(/[ఀ-౿]/) !== null).toBe(true)
  await page.evaluate(() => sessionStorage.setItem('vg-lang', 'en'))
  await page.reload()
  await settle(page)
  expect(await page.locator('h1').innerText()).toBe(before)
  expect(problems).toEqual([])
})

test('gallery shows media in place without a popup', async ({ page }) => {
  await page.goto('/gallery')
  await settle(page)
  await page.locator('figure img').first().click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('figure video')).toHaveCount(4)
})

test('JSON-LD on the home page is valid and describes the business', async ({ page }) => {
  await page.goto('/')
  await settle(page)
  const ld = JSON.parse((await page.locator('#ld-page').textContent())!)
  const types = ld['@graph'].map((g: { '@type': string | string[] }) => [].concat(g['@type'] as never).join('/'))
  expect(types).toEqual(expect.arrayContaining(['WebSite', 'ProfessionalService/LocalBusiness', 'Person', 'FAQPage']))
  const biz = ld['@graph'].find((g: { '@type': unknown }) => Array.isArray(g['@type']))
  expect(biz.telephone).toBe('+91-90359-59911')
  expect(biz.address.postalCode).toBe('571438')
})
