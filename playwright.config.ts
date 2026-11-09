import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end tests run against the production build (dist/) served by scripts/serve-prod.mjs,
 * which applies the same headers, redirects and 404 handling as vercel.json.
 * Run: npm run build && npm run test:e2e
 */
const PORT = 4300
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  webServer: { command: `node scripts/serve-prod.mjs ${PORT}`, url: `http://localhost:${PORT}`, reuseExistingServer: !process.env.CI, timeout: 20_000 },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 860 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
