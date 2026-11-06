/**
 * Run a command against a real, temporary PostgreSQL server.
 *
 *   pnpm tsx scripts/v4-with-postgres.ts "pnpm exec vitest run tests/v4-macro-store.test.ts"
 *
 * This starts an actual PostgreSQL binary (embedded-postgres), creates the
 * test databases, runs the command with DATABASE_URL/TEST_DATABASE set, and
 * stops the server. It does not touch any external or production database.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import EmbeddedPostgres from 'embedded-postgres';

const command = process.argv.slice(2).join(' ');
if (!command) {
  console.error('usage: v4-with-postgres.ts "<command>"');
  process.exit(1);
}

const databaseDir = resolve('/tmp/opencode/v4-postgres-data-55433');
mkdirSync(databaseDir, { recursive: true });
const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'postgres',
  password: 'postgres',
  port: 55433,
  persistent: true,
  autoRehydrateSymlinks: true,
});

let started = false;
try {
  if (!existsSync(resolve(databaseDir, 'PG_VERSION'))) {
    await pg.initialise();
  }
  await pg.start();
  started = true;
  for (const database of ['living_world', 'living_world_test', 'living_world_e2e']) {
    try {
      await pg.createDatabase(database);
    } catch (error) {
      const message = String(error);
      if (!message.includes('already exists')) console.error(`create ${database}: ${message}`);
    }
  }
  const databaseUrl = 'postgres://postgres:postgres@localhost:55433/living_world_test';
  const child = spawn(command, {
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      TEST_DATABASE: '1',
      TEST_DATABASE_URL: databaseUrl,
      E2E_DATABASE_URL: 'postgres://postgres:postgres@localhost:55433/living_world_e2e',
      NODE_ENV: 'test',
    },
  });
  const code = await new Promise<number>((resolveCode) => {
    child.on('close', (exitCode) => resolveCode(exitCode ?? 1));
  });
  // Give pg sockets one short turn to close after stdio is done before the
  // server is asked to shut down; otherwise an already-finished command can
  // print spurious "terminating connection" noise.
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  process.exitCode = code;
} finally {
  if (started) await pg.stop().catch(() => undefined);
}
