import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    env: {
      SIM_MONTHS_PER_STEP: '1',
      BIRTH_FAST_PATH: 'false',
      ...(process.env.TEST_DATABASE === '1'
        ? {
            WORLD_PACK: 'ashen-tides',
            DATABASE_URL:
              process.env.TEST_DATABASE_URL ?? 'postgres://localhost:55432/living_world_test',
          }
        : {}),
    },
    include: ['tests/**/*.test.ts'],
    testTimeout: 60000,
    hookTimeout: 60000,
    pool: 'forks',
    maxWorkers: 1,
    fileParallelism: false,
  },
});
