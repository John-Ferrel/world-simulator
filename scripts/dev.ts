import '../packages/model/config.js';
import { spawn } from 'node:child_process';

/**
 * v4 development entry point. The old api/simulator are intentionally not
 * started: they persist the retired flat `worlds.state` document and would
 * compete for the same database. Only the v4 writer, v4 API and the observer
 * UI run here.
 */
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
