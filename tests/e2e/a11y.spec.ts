import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { ROUTES, settle } from './helpers'

// WCAG 2.2 A/AA automated checks (axe-core). Automated tools catch roughly a third of issues;
// keyboard and screen-reader passes are still needed — see PRODUCTION_READINESS_REPORT.md.
for (const path of ROUTES) {
  test(`no serious or critical axe violations on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await settle(page)
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })
}

test('keyboard: skip link is first and moves focus to main', async ({ page }) => {
  await page.goto('/about')
  await settle(page)
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: /skip to content/i })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('focus is visible on interactive elements', async ({ page }) => {
  await page.goto('/contact')
  await settle(page)
  await page.locator('#eq-name').focus()
  const outline = await page.locator('#eq-name').evaluate((el) => { const s = getComputedStyle(el); return s.outlineStyle !== 'none' || s.boxShadow !== 'none' })
  expect(outline).toBe(true)
})
