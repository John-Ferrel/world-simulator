import { randomUUID } from 'node:crypto';
import { backupDatabase, restoreDatabase } from '../packages/storage/backup.js';
import {
  pool,
  migrate,
  activeWorld,
  recover,
  checksum,
  bootstrap,
} from '../packages/storage/index.js';
const [action, ...args] = process.argv.slice(2);
await migrate();
try {
  if (action === 'init') {
    console.log({ world: (await bootstrap()).id });
  } else if (action === 'status') {
    const w = await activeWorld();
    console.log({
      world: w?.id,
      month: w?.month,
      revision: w?.revision,
      lease: (await pool.query('SELECT * FROM writer_lease')).rows,
      jobs: (await pool.query('SELECT status,count(*) FROM jobs GROUP BY status')).rows,
      settings: (await pool.query('SELECT * FROM settings')).rows,
      databaseBytes: (await pool.query('SELECT pg_database_size(current_database()) AS bytes'))
        .rows[0].bytes,
    });
  } else if (action === 'pause' || action === 'resume') {
    await pool.query(
      "INSERT INTO settings(key,value) VALUES('paused',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [action === 'pause'],
    );
    console.log(action);
  } else if (action === 'speed') {
    const value = Number(args[0]);
    if (!Number.isFinite(value) || value < 0.01 || value > 1440)
      throw new Error('Speed must be 0.01–1440 real minutes/year');
    await pool.query(
      "INSERT INTO settings(key,value) VALUES('minutesPerYear',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [value],
    );
    console.log({ minutesPerYear: value });
  } else if (action === 'expand-earth') {
    const w = await activeWorld();
    if (!w || !w.pack.id.startsWith('earth-')) throw new Error('No active Earth world');
    const id = randomUUID();
    await pool.query('INSERT INTO commands(id,world_id,payload) VALUES($1,$2,$3)', [
      id,
      w.id,
      { id, kind: 'expand_earth', version: 1 },
    ]);
    console.log({ commandId: id });
  } else if (action === 'close') {
    const w = await activeWorld();
    if (!w) throw new Error('No active world');
    const id = randomUUID();
    await pool.query('INSERT INTO commands(id,world_id,payload) VALUES($1,$2,$3)', [
      id,
      w.id,
      { id, kind: 'close', reason: 'operator' },
    ]);
    console.log({ commandId: id });
  } else if (action === 'verify') {
    const head = (
      await pool.query("SELECT id,revision,checksum FROM worlds WHERE status='running'")
    ).rows[0];
    if (!head) throw new Error('No active world');
    const restored = await recover(head.id);
    if (restored.revision !== Number(head.revision) || checksum(restored) !== head.checksum)
      throw new Error('Recovery mismatch or world advanced during verification; pause and retry');
    console.log({
      world: head.id,
      revision: Number(head.revision),
      checksum: head.checksum,
      recovery: 'exact',
    });
  } else if (action === 'backup') {
    if (!args[0]) throw new Error('Supply output path');
    console.log(await backupDatabase(pool, args[0]));
  } else if (action === 'restore') {
    if (!args[0]) throw new Error('Supply backup path');
    console.log(await restoreDatabase(pool, args[0]));
  } else
    throw new Error(
      'Usage: pnpm admin init|status|pause|resume|speed MINUTES_PER_YEAR|close|expand-earth|verify|backup PATH|restore PATH',
    );
  await pool.query('INSERT INTO admin_audit(action,payload) VALUES($1,$2)', [action, { args }]);
} catch (e) {
  console.error((e as Error).message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
