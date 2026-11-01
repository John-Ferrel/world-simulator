import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/browser',
  timeout: 120000,
  expect: { timeout: 15000 },
  workers: 1,
  use: { baseURL: 'http://localhost:5174', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium' } }],
  reporter: 'list',
  webServer: {
    command: 'pnpm exec tsx scripts/e2e-server.ts',
    url: 'http://localhost:5174/api/health',
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      DATABASE_URL: process.env.E2E_DATABASE_URL ?? 'postgres://localhost:55432/living_world_e2e',
      PORT: '3011',
      WEB_PORT: '5174',
      API_PROXY_URL: 'http://localhost:3011',
      WORLD_MINUTES_PER_YEAR: '0.5',
      SIM_MONTHS_PER_STEP: '6',
      BIRTH_FAST_PATH: 'false',
      WORLD_SEED: 'browser',
      LLM_API_KEY: '',
      WORLD_PACK: 'ashen-tides',
    },
  },
});
