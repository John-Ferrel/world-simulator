import '../packages/model/config.js';
import { spawn, spawnSync } from 'node:child_process';

/**
 * v4 development entry point. The old api/simulator are intentionally not
 * started: they persist the retired flat `worlds.state` document and would
 * compete for the same database. Only the v4 writer, v4 API and the observer
 * UI run here.
 *
 * The local PostgreSQL bundle is started automatically for the default local
 * URL, so a fresh checkout only needs `pnpm install` and `pnpm dev`. External
 * DATABASE_URL values are left untouched.
 */
const databaseUrl = process.env.DATABASE_URL ?? 'postgres://localhost:55432/living_world';
if (/localhost:55432|127\.0\.0\.1:55432/.test(databaseUrl)) {
  const db = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/local-db.ts'], {
    stdio: 'inherit',
    env: process.env,
  });
  if (db.status !== 0) {
    console.error('v4 dev: local PostgreSQL could not be started');
    process.exit(db.status ?? 1);
  }
}
const entries = ['apps/v4-api/index.ts', 'apps/v4-simulator/index.ts'];
if (process.env.V4_WISH_WORKER !== '0') entries.push('apps/v4-birth-worker/index.ts');
if (process.env.V4_DIRECTOR !== '0') entries.push('apps/v4-macro-worker/index.ts');
if (process.env.V4_CONTENT_WORKER !== '0') entries.push('apps/v4-content-worker/index.ts');
const children = entries.map((entry) =>
  spawn(process.execPath, ['--watch', '--import', 'tsx', entry], {
    stdio: 'inherit',
    env: process.env,
  }),
);
children.push(
  spawn(
    process.execPath,
    ['node_modules/vite/bin/vite.js', '--config', 'apps/web/vite.config.ts'],
    { stdio: 'inherit', env: process.env },
  ),
);
let stopping = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopping = true;
    children.forEach((c) => c.kill(signal));
    setTimeout(() => process.exit(), 700);
  });
children.forEach((c) =>
  c.on('exit', (code) => {
    if (code && !stopping) {
      stopping = true;
      children.forEach((child) => child.kill());
      process.exit(code);
    }
  }),
);
