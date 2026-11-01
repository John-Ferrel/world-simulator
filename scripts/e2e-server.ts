import { spawn } from 'node:child_process';
import { migrate, pool } from '../packages/storage/index.js';
const url = process.env.DATABASE_URL;
if (!url || !new URL(url).pathname.endsWith('_e2e'))
  throw new Error('Browser test reset requires a database ending in _e2e');
await migrate();
await pool.query(
  'TRUNCATE outbox,events,journal,checkpoints,maps,narratives,jobs,commands,sessions,users,worlds,writer_lease,settings,admin_audit,model_budget,model_calls RESTART IDENTITY CASCADE',
);
await pool.end();
const child = spawn(process.execPath, ['--import', 'tsx', 'scripts/dev.ts'], {
  stdio: 'inherit',
  env: process.env,
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code ?? 0));
