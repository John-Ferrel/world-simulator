import { defineConfig, devices } from '@playwright/test';

/**
 * Browser acceptance for the v4 observer against a dedicated *_e2e database.
 * The server script truncates only v4/auth tables, seeds a fresh Vienna world
 * with a 5-second year, and starts the v4 API, simulator and Vite proxy.
 */
export default defineConfig({
  testDir: 'tests/v4-browser',
  timeout: 120000,
  expect: { timeout: 20000 },
  workers: 1,
  use: {
    baseURL: 'http://localhost:5176',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium' } }],
  reporter: 'list',
  webServer: {
    command: 'pnpm exec tsx scripts/v4-e2e-server.ts',
    url: 'http://localhost:5176/api/health',
    reuseExistingServer: false,
    timeout: 90000,
    env: {
      DATABASE_URL: process.env.E2E_DATABASE_URL ?? 'postgres://localhost:55432/living_world_e2e',
      PORT: '3012',
      WEB_PORT: '5176',
      API_PROXY_URL: 'http://localhost:3012',
      V4_ECONOMY: '0',
      V4_DIRECTOR: '0',
      V4_CONTENT_WORKER: '0',
    },
  },
});
