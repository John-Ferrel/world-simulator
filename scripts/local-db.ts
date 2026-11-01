import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve('.data/pg-bin/root'),
  bin = `${root}/usr/lib/postgresql/16/bin`,
  data = resolve('.data/postgres');
function run(command: string, args: string[], extra: Record<string, unknown> = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      LD_LIBRARY_PATH: `${root}/usr/lib/x86_64-linux-gnu:${process.env.LD_LIBRARY_PATH ?? ''}`,
    },
    ...extra,
  });
  if (result.status !== 0) throw new Error(`${command} failed (${result.status})`);
}
if (!existsSync(`${bin}/postgres`)) {
  if (process.platform !== 'linux')
    throw new Error('Use Docker Compose or an external PostgreSQL 16 database on this platform');
  const downloads = resolve('.data/pg-bin');
  mkdirSync(downloads, { recursive: true });
  run('apt', ['download', 'postgresql-16', 'postgresql-client-16', 'libpq5'], { cwd: downloads });
  for (const file of readdirSync(downloads).filter((f) => f.endsWith('.deb')))
    run('dpkg-deb', ['-x', `${downloads}/${file}`, root]);
}
if (!existsSync(`${data}/PG_VERSION`))
  run(`${bin}/initdb`, [
    '-D',
    data,
    '-L',
    `${root}/usr/share/postgresql/16`,
    '-A',
    'trust',
    '-U',
    process.env.USER ?? 'world',
    '--no-locale',
    '-E',
    'UTF8',
  ]);
const env = { ...process.env, LD_LIBRARY_PATH: `${root}/usr/lib/x86_64-linux-gnu` };
if (spawnSync(`${bin}/pg_ctl`, ['-D', data, 'status'], { env, stdio: 'ignore' }).status !== 0)
  run(`${bin}/pg_ctl`, [
    '-D',
    data,
    '-l',
    resolve('.data/postgres.log'),
    '-o',
    '-p 55432 -h 127.0.0.1 -k /tmp -c jit=off',
    'start',
  ]);
for (const name of ['living_world', 'living_world_test', 'living_world_e2e']) {
  const exists = spawnSync(
    `${bin}/psql`,
    [
      '-h',
      '127.0.0.1',
      '-p',
      '55432',
      '-U',
      process.env.USER ?? 'world',
      '-d',
      'postgres',
      '-tAc',
      `SELECT 1 FROM pg_database WHERE datname='${name}'`,
    ],
    { env, encoding: 'utf8' },
  );
  if (exists.stdout.trim() !== '1')
    run(`${bin}/createdb`, [
      '-h',
      '127.0.0.1',
      '-p',
      '55432',
      '-U',
      process.env.USER ?? 'world',
      name,
    ]);
}
console.log(
  'PostgreSQL ready on 127.0.0.1:55432; application, integration-test and browser-test databases available.',
);
