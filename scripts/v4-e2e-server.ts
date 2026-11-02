import { spawn } from 'node:child_process';
import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { migrateV4, seedV4World } from '../packages/v4/store.js';

const url = process.env.DATABASE_URL;
if (!url || !new URL(url).pathname.endsWith('_e2e'))
  throw new Error('v4 browser test reset requires a database ending in _e2e');

await migrateV4();
await pool.query(
  `TRUNCATE v4_birth_contracts, v4_birth_requests, v4_events, v4_scenes, v4_knowledge, v4_relations,
   v4_interactions, v4_projects, v4_positions, v4_organizations, v4_persons,
   v4_households, v4_places, v4_worlds, sessions, users RESTART IDENTITY CASCADE`,
);
await seedV4World(
  applyViennaHistoricalWorld({
    ...structuredClone(VIENNA_1912_SEED),
    id: 'world-vienna-e2e',
    timePolicy: { secondsPerYear: 5, monthsPerTick: 12 },
  }),
);
await pool.end();

const child = spawn(process.execPath, ['--import', 'tsx', 'scripts/dev.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DATABASE_URL: url,
    PORT: process.env.PORT ?? '3011',
    WEB_PORT: process.env.WEB_PORT ?? '5174',
    API_PROXY_URL: process.env.API_PROXY_URL ?? 'http://localhost:3011',
    V4_ECONOMY: '0',
    V4_WISH_WORKER: '0',
    V4_DIRECTOR: '0',
    V4_CONTENT_WORKER: '0',
  },
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code ?? 0));
