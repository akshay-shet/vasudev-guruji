import type { Page } from '@playwright/test'

/** Public routes that must exist (mirrors src/data/seo.ts allPaths, minus legal pages). */
export const ROUTES = ['/', '/about', '/life-line-horoscope', '/services', '/services/vastu-expert', '/homa', '/kundali-matching', '/shop', '/events', '/gallery', '/mantras', '/contact', '/legal/privacy']

/** Collects console errors, page errors and CSP violations while a test runs. */
export function watchProblems(page: Page) {
  const problems: string[] = []
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`) })
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
  page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => console.error(`CSP ${e.violatedDirective} blocked ${e.blockedURI}`))
    try { sessionStorage.setItem('vg-intro', '1') } catch { /* ignore */ } // skip the opening door animation
    try { localStorage.setItem('vg-kaal-seen', new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10)) } catch { /* ignore */ } // keep the daily Kaal card out of the way
  })
  return problems
}

/** Waits for the app to render and reveals all scroll-in sections. */
export async function settle(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')))
  await page.waitForTimeout(300)
}
