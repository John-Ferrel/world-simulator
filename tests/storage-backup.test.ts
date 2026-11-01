import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import pg from 'pg';
import { mkdtemp, readFile, writeFile, rm, stat, open } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { backupDatabase, restoreDatabase } from '../packages/storage/backup.js';

const enabled = process.env.TEST_DATABASE === '1';
const TABLES = [
  'worlds',
  'users',
  'sessions',
  'commands',
  'journal',
  'checkpoints',
  'events',
  'outbox',
  'maps',
  'narratives',
  'jobs',
  'settings',
  'admin_audit',
  'model_budget',
  'model_calls',
];
describe.skipIf(!enabled)('bounded PostgreSQL backup and transactional restore', () => {
  const url = new URL(
    process.env.BACKUP_TEST_DATABASE_URL ??
      'postgres://localhost:55432/living_world_storage_backup_test',
  );
  if (!url.pathname.endsWith('_backup_test'))
    throw new Error('Dedicated *_backup_test database required');
  const adminUrl = new URL(url);
  adminUrl.pathname = '/postgres';
  const admin = new pg.Pool({ connectionString: adminUrl.href });
  const pool = new pg.Pool({ connectionString: url.href, max: 3 });
  let directory: string;
  const clear = () =>
    pool.query(`TRUNCATE ${TABLES.join(',')},writer_lease RESTART IDENTITY CASCADE`);
  beforeAll(async () => {
    const name = decodeURIComponent(url.pathname.slice(1));
    if (!(await admin.query('SELECT 1 FROM pg_database WHERE datname=$1', [name])).rowCount)
      await admin.query(`CREATE DATABASE "${name.replaceAll('"', '""')}"`);
    await pool.query(
      await readFile(new URL('../infra/migrations/001_initial.sql', import.meta.url), 'utf8'),
    );
    directory = await mkdtemp(join(tmpdir(), 'world-backup-'));
  });
  beforeEach(async () => {
    await clear();
  });
  afterAll(async () => {
    await pool.end();
    await admin.end();
    if (directory) await rm(directory, { recursive: true, force: true });
  });
  async function fixture(large = false) {
    const stamp = '2026-10-31T04:00:00.123456Z';
    await pool.query(
      `INSERT INTO worlds(id,status,revision,state,checksum,created_at) VALUES('w0','archived',9007199254740993,$1,'checksum',$2)`,
      [
        `{"id":"w0","month":2,"bigint":9007199254740993,"unicode":"人物🌍\\n雪","padding":"${large ? 'x'.repeat(2 * 1024 * 1024) : 'fixture-text'}"}`,
        stamp,
      ],
    );
    await pool.query(
      "INSERT INTO users(id,username,password_hash,created_at) VALUES('u0','fixture-user','fixture-hash',$1)",
      [stamp],
    );
    await pool.query("INSERT INTO sessions VALUES('session-token','u0',$1)", [stamp]);
    await pool.query(
      "INSERT INTO commands(id,world_id,user_id,payload,status,result,created_at) VALUES('c0','w0','u0','{\"kind\":\"test\"}','complete','{\"done\":true}',$1)",
      [stamp],
    );
    await pool.query(
      "INSERT INTO journal VALUES('w0',3,2,'previous','checksum','{\"kind\":\"fixture\"}','[]',$1)",
      [stamp],
    );
    await pool.query("INSERT INTO checkpoints VALUES('w0',3,'{\"month\":2}','checksum')");
    await pool.query(
      `INSERT INTO events(cursor,id,world_id,month,person_ids,payload) OVERRIDING SYSTEM VALUE VALUES(9007199254740993,'e0','w0',2,ARRAY['p0','p1'],'{"number":9007199254740993,"text":"fixture-text"}')`,
    );
    await pool.query('INSERT INTO outbox VALUES(9007199254740993,\'w0\',\'{"event":"e0"}\')');
    await pool.query("INSERT INTO maps VALUES('w0',2,'{\"settlements\":[]}')");
    await pool.query(
      "INSERT INTO narratives VALUES('n0','w0','p0',2,ARRAY['e0'],'[\"A recorded event\"]','fallback')",
    );
    await pool.query(
      "INSERT INTO jobs(id,world_id,actor_id,actor_version,observed_month,deadline,kind,payload,status,result,audit,created_at) VALUES('j0','w0','p0',1,2,3,'fixture','{}','complete','{}','{}',$1)",
      [stamp],
    );
    await pool.query("INSERT INTO settings VALUES('fixture','{\"value\":true}')");
    await pool.query(
      "INSERT INTO admin_audit(id,action,payload,created_at) OVERRIDING SYSTEM VALUE VALUES(9007199254740995,'fixture','{}',$1)",
      [stamp],
    );
    await pool.query("INSERT INTO model_budget VALUES('2026-10-31','world',37)");
    await pool.query(
      "INSERT INTO model_calls(id,actor_id,reserved,tokens,status,model,prompt_version,created_at) VALUES('mc0','p0',40,37,'complete','fixture-model','fixture-v1',$1)",
      [stamp],
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('events','cursor'),9007199254741111,true)",
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('admin_audit','id'),9007199254742222,true)",
    );
  }
  async function readback() {
    const result: Record<string, string[]> = {};
    for (const table of TABLES)
      result[table] = (
        await pool.query(`SELECT row_to_json(t)::text AS row FROM ${table} t ORDER BY 1`)
      ).rows.map((row) => row.row);
    return result;
  }
  async function expectEmpty() {
    for (const table of TABLES)
      expect((await pool.query(`SELECT count(*)::int AS n FROM ${table}`)).rows[0].n).toBe(0);
    expect(
      (await pool.query('SELECT last_value::text,is_called FROM events_cursor_seq')).rows[0],
    ).toEqual({ last_value: '1', is_called: false });
    expect(
      (await pool.query('SELECT last_value::text,is_called FROM admin_audit_id_seq')).rows[0],
    ).toEqual({ last_value: '1', is_called: false });
  }
  it('streams every table and restores exact JSON, FK rows, timestamp microseconds and sequence gaps', async () => {
    await fixture(true);
    const before = await readback(),
      path = join(directory, 'roundtrip.ndjson');
    const backedUp = await backupDatabase(pool, path);
    expect(backedUp.rows).toBe(TABLES.length);
    expect((await stat(path)).mode & 0o777).toBe(0o600);
    await clear();
    const restored = await restoreDatabase(pool, path);
    expect(restored.rows).toBe(TABLES.length);
    expect(restored.version).toBe(2);
    expect(await readback()).toEqual(before);
    expect(
      (await pool.query("SELECT nextval(pg_get_serial_sequence('events','cursor'))::text AS n"))
        .rows[0].n,
    ).toBe('9007199254741112');
    expect(
      (await pool.query("SELECT nextval(pg_get_serial_sequence('admin_audit','id'))::text AS n"))
        .rows[0].n,
    ).toBe('9007199254742223');
    expect(
      (
        await pool.query(
          "SELECT to_char(created_at AT TIME ZONE 'UTC','YYYY-MM-DD HH24:MI:SS.US') AS stamp FROM users",
        )
      ).rows[0].stamp,
    ).toBe('2026-10-31 04:00:00.123456');
  });
  it('uses one repeatable-read snapshot while a concurrent connection adds a later row', async () => {
    await fixture();
    let injected = false;
    const source = {
      connect: async () => {
        const client = await pool.connect();
        return {
          release: () => client.release(),
          query: async (sql: string, args?: unknown[]) => {
            const result = await client.query(sql, args);
            if (sql === 'FETCH FORWARD 1 FROM backup_row' && !injected) {
              injected = true;
              await pool.query("INSERT INTO settings VALUES('after-snapshot','true')");
            }
            return result;
          },
        };
      },
    } as unknown as pg.Pool;
    const path = join(directory, 'snapshot.ndjson');
    await backupDatabase(source, path);
    expect(injected).toBe(true);
    expect((await pool.query("SELECT 1 FROM settings WHERE key='after-snapshot'")).rowCount).toBe(
      1,
    );
    await clear();
    await restoreDatabase(pool, path);
    expect((await pool.query("SELECT 1 FROM settings WHERE key='after-snapshot'")).rowCount).toBe(
      0,
    );
  });
  it('rejects missing EOF footer, torn newline, tampering, extra records and unknown columns with full rollback', async () => {
    await fixture();
    const path = join(directory, 'valid.ndjson');
    await backupDatabase(pool, path);
    const content = await readFile(path, 'utf8');
    const records = content.trimEnd().split('\n');
    const badColumn =
      records
        .map((line) => {
          const data = JSON.parse(line);
          if (data.type === 'row' && data.table === 'users')
            data.row['user_input; DROP TABLE worlds; --'] = true;
          return JSON.stringify(data);
        })
        .join('\n') + '\n';
    const cases = [
      records.slice(0, -1).join('\n') + '\n',
      content.slice(0, -1),
      content.replace('fixture-text', 'tampered-text'),
      content + '{}\n',
      badColumn,
    ];
    await clear();
    for (let i = 0; i < cases.length; i++) {
      const bad = join(directory, `corrupt-${i}.ndjson`);
      await writeFile(bad, cases[i]);
      await expect(restoreDatabase(pool, bad)).rejects.toThrow();
      await expectEmpty();
    }
  });
  it('refuses existing output and nonempty target even if only settings or writer lease exists', async () => {
    const path = join(directory, 'do-not-overwrite.ndjson');
    await writeFile(path, 'original');
    await expect(backupDatabase(pool, path)).rejects.toThrow(/overwrite/);
    expect(await readFile(path, 'utf8')).toBe('original');
    const valid = join(directory, 'empty.ndjson');
    await backupDatabase(pool, valid);
    await pool.query("INSERT INTO settings VALUES('existing','true')");
    await expect(restoreDatabase(pool, valid)).rejects.toThrow(/empty database/);
    expect((await pool.query('SELECT key FROM settings')).rows).toEqual([{ key: 'existing' }]);
    await clear();
    await pool.query(
      "INSERT INTO writer_lease VALUES(1,'active-writer',7,now()+interval '1 hour')",
    );
    await expect(restoreDatabase(pool, valid)).rejects.toThrow(/empty database/);
  });
  it('rolls back restored rows and transactional sequence restart when COMMIT fails', async () => {
    await fixture();
    const path = join(directory, 'commit-failure.ndjson');
    await backupDatabase(pool, path);
    await clear();
    await pool.query(
      'ALTER TABLE sessions ADD CONSTRAINT backup_deferred_test FOREIGN KEY(token_hash) REFERENCES users(id) DEFERRABLE INITIALLY DEFERRED',
    );
    try {
      await expect(restoreDatabase(pool, path)).rejects.toThrow(/backup_deferred_test/);
      await expectEmpty();
    } finally {
      await pool.query('ALTER TABLE sessions DROP CONSTRAINT backup_deferred_test');
    }
  });
  it('restores bounded legacy-v1 JSON with defaults and rebuilds identity sequences', async () => {
    const path = join(directory, 'legacy.json');
    await writeFile(
      path,
      JSON.stringify({
        version: 1,
        worlds: [
          {
            id: 'legacy-world',
            status: 'running',
            revision: '0',
            state: { month: 0 },
            checksum: 'c',
          },
        ],
        users: [{ id: 'legacy-user', username: 'legacy', password_hash: 'h' }],
        events: [
          {
            cursor: '17',
            id: 'legacy-event',
            world_id: 'legacy-world',
            month: 0,
            person_ids: ['p'],
            payload: { text: 'legacy fact' },
          },
        ],
      }),
    );
    const result = await restoreDatabase(pool, path);
    expect(result.version).toBe(1);
    expect(result.rows).toBe(3);
    expect((await pool.query('SELECT state FROM worlds')).rows[0].state).toEqual({ month: 0 });
    expect(
      (await pool.query("SELECT nextval(pg_get_serial_sequence('events','cursor'))::text AS n"))
        .rows[0].n,
    ).toBe('18');
    expect(
      (await pool.query("SELECT nextval(pg_get_serial_sequence('admin_audit','id'))::text AS n"))
        .rows[0].n,
    ).toBe('1');
    await clear();
    const big = join(directory, 'oversized-legacy.json'),
      file = await open(big, 'wx', 0o600);
    try {
      await file.writeFile('{"version":1,');
      await file.truncate(256 * 1024 * 1024 + 1);
    } finally {
      await file.close();
    }
    await expect(restoreDatabase(pool, big)).rejects.toThrow(/Legacy v1.*limit/);
    await expectEmpty();
  });
});
