import type { Pool, PoolClient } from 'pg';
import { createReadStream } from 'node:fs';
import { open, link, unlink, stat, readFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { dirname } from 'node:path';

// Dependency order is fixed by application code, never supplied SQL in a backup.
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
] as const;
type Table = (typeof TABLES)[number];
type Column = { name: string; type: string; identity: string };
type Sequence = {
  table: 'events' | 'admin_audit';
  column: 'cursor' | 'id';
  lastValue: string;
  isCalled: boolean;
};
type Header = {
  type: 'header';
  format: 'world-simulator-backup';
  version: 2;
  recordedAt: string;
  tables: readonly Table[];
  columns: Record<Table, Column[]>;
  sequences: Sequence[];
};
type Counts = Record<Table, number>;
// A world/checkpoint can itself be large. Memory is bounded by the largest single
// database row/JSON parse, not the entire database. Reject still larger records.
const MAX_RECORD_BYTES = 512 * 1024 * 1024;
const MAX_HEADER_BYTES = 64 * 1024;
const MAX_LEGACY_BYTES = 256 * 1024 * 1024;
const ADVISORY_LOCK = 617334;
const ident = (name: string) => '"' + name.replaceAll('"', '""') + '"';
const qualified = (table: Table) => `public.${ident(table)}`;
const counts = (): Counts => Object.fromEntries(TABLES.map((table) => [table, 0])) as Counts;
const isObject = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

async function columnsFor(client: PoolClient): Promise<Record<Table, Column[]>> {
  const columns = {} as Record<Table, Column[]>;
  for (const table of TABLES) {
    columns[table] = (
      await client.query(
        `SELECT column_name AS name, udt_name AS type, is_identity AS identity
       FROM information_schema.columns WHERE table_schema='public' AND table_name=$1
       ORDER BY ordinal_position`,
        [table],
      )
    ).rows;
    if (!columns[table].length) throw new Error(`Backup schema missing table: ${table}`);
  }
  return columns;
}
async function sequenceName(client: PoolClient, table: string, column: string) {
  const result = (
    await client.query(
      `SELECT n.nspname AS schema,c.relname AS name
     FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
     WHERE c.oid=pg_get_serial_sequence($1,$2)::regclass`,
      [`public.${table}`, column],
    )
  ).rows[0];
  if (!result) throw new Error(`Backup schema missing identity sequence: ${table}.${column}`);
  return {
    sql: `${ident(result.schema)}.${ident(result.name)}`,
    regclass: `${ident(result.schema)}.${ident(result.name)}`,
  };
}
async function sequencesFor(client: PoolClient): Promise<Sequence[]> {
  const sequences: Sequence[] = [];
  for (const [table, column] of [
    ['events', 'cursor'],
    ['admin_audit', 'id'],
  ] as const) {
    const name = await sequenceName(client, table, column);
    const row = (await client.query(`SELECT last_value::text AS value,is_called FROM ${name.sql}`))
      .rows[0];
    sequences.push({ table, column, lastValue: row.value, isCalled: row.is_called });
  }
  return sequences;
}
function validSequence(sequence: unknown, index: number): sequence is Sequence {
  if (!isObject(sequence)) return false;
  const expected = [
    ['events', 'cursor'],
    ['admin_audit', 'id'],
  ][index];
  return (
    !!expected &&
    sequence.table === expected[0] &&
    sequence.column === expected[1] &&
    typeof sequence.lastValue === 'string' &&
    /^[1-9][0-9]{0,18}$/.test(sequence.lastValue) &&
    BigInt(sequence.lastValue) <= 9223372036854775807n &&
    typeof sequence.isCalled === 'boolean'
  );
}
async function restoreSequences(client: PoolClient, sequences: Sequence[]) {
  for (const sequence of sequences) {
    const name = await sequenceName(client, sequence.table, sequence.column);
    // RESTART takes a transactional sequence lock. Unlike setval(), rolling back
    // this transaction restores the original sequence relation as well as rows.
    await client.query(`ALTER SEQUENCE ${name.sql} RESTART WITH ${sequence.lastValue}`);
    if (sequence.isCalled) await client.query('SELECT nextval($1::regclass)', [name.regclass]);
  }
}

export async function backupDatabase(pool: Pool, path: string) {
  if (!path) throw new Error('Supply backup output path');
  try {
    await stat(path);
    throw new Error('Backup output already exists; refusing overwrite');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  const temporary = `${path}.partial-${randomUUID()}`;
  const client = await pool.connect();
  let file;
  try {
    file = await open(temporary, 'wx', 0o600);
  } catch (error) {
    client.release();
    throw error;
  }
  const hash = createHash('sha256'),
    tableRows = counts();
  let rows = 0,
    bytes = 0,
    inTransaction = false;
  // Await each bounded chunk's disk write. FileHandle.writeFile completes partial
  // writes and uses the current offset, giving explicit backpressure without a
  // second unbounded queue of rows or serializing the whole database.
  const write = async (part: string, hashed = true) => {
    if (hashed) hash.update(part);
    bytes += Buffer.byteLength(part);
    await file.writeFile(part);
  };
  try {
    await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
    inTransaction = true;
    const header: Header = {
      type: 'header',
      format: 'world-simulator-backup',
      version: 2,
      recordedAt: new Date().toISOString(),
      tables: TABLES,
      columns: await columnsFor(client),
      sequences: await sequencesFor(client),
    };
    await write(JSON.stringify(header) + '\n');
    for (const table of TABLES) {
      await client.query(
        `DECLARE backup_row NO SCROLL CURSOR FOR SELECT row_to_json(t)::text AS row FROM ${qualified(table)} AS t`,
      );
      while (true) {
        const result = await client.query('FETCH FORWARD 1 FROM backup_row');
        if (!result.rowCount) break;
        const row = result.rows[0].row as string;
        if (Buffer.byteLength(row) > MAX_RECORD_BYTES - 128)
          throw new Error(`Backup row exceeds ${MAX_RECORD_BYTES} byte limit in ${table}`);
        await write(`{"type":"row","table":"${table}","row":`);
        // Avoid concatenating a second full-sized copy of a large JSON world.
        for (let offset = 0; offset < row.length;) {
          let end = Math.min(row.length, offset + 65536);
          // Do not split a UTF-16 surrogate pair across separate UTF-8 writes.
          if (
            end < row.length &&
            row.charCodeAt(end - 1) >= 0xd800 &&
            row.charCodeAt(end - 1) <= 0xdbff
          )
            end--;
          await write(row.slice(offset, end));
          offset = end;
        }
        await write('}\n');
        rows++;
        tableRows[table]++;
      }
      await client.query('CLOSE backup_row');
    }
    const sha256 = hash.digest('hex');
    await write(
      JSON.stringify({ type: 'footer', version: 2, rows, tableRows, sha256 }) + '\n',
      false,
    );
    await client.query('COMMIT');
    inTransaction = false;
    await file.sync();
    await file.close();
    // Atomic publication without replacement, even if another backup wins a race.
    await link(temporary, path);
    await unlink(temporary);
    const directory = await open(dirname(path), 'r');
    try {
      await directory.sync();
    } finally {
      await directory.close();
    }
    return { path, version: 2 as const, rows, tableRows, sha256, bytes };
  } catch (error) {
    if (inTransaction) await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await file.close().catch(() => {});
    await unlink(temporary).catch(() => {});
  }
}

// Bounded line framing rejects a malicious missing newline before buffering an
// entire file. The only large allocation allowed is one explicitly bounded row.
async function* lines(path: string): AsyncGenerator<Buffer> {
  let parts: Buffer[] = [],
    length = 0,
    first = true;
  for await (const chunk of createReadStream(path, { highWaterMark: 65536 })) {
    const buffer = chunk as Buffer;
    let start = 0;
    while (start < buffer.length) {
      const newline = buffer.indexOf(10, start),
        end = newline < 0 ? buffer.length : newline;
      const part = buffer.subarray(start, end);
      length += part.length;
      if (length > (first ? MAX_HEADER_BYTES : MAX_RECORD_BYTES))
        throw new Error('Backup record exceeds bounded size limit');
      parts.push(part);
      if (newline < 0) break;
      yield Buffer.concat(parts, length);
      parts = [];
      length = 0;
      first = false;
      start = newline + 1;
    }
  }
  if (length) throw new Error('Truncated backup: final newline missing');
}

async function ensureEmpty(client: PoolClient) {
  // Block ordinary writers as well as cooperating bootstrap/restore operators.
  await client.query(
    `LOCK TABLE ${TABLES.map(qualified).join(',')},public.writer_lease IN ACCESS EXCLUSIVE MODE`,
  );
  for (const table of [...TABLES, 'writer_lease']) {
    const existing = await client.query(`SELECT 1 FROM public.${ident(table)} LIMIT 1`);
    if (existing.rowCount)
      throw new Error('Restore requires an empty database; select a new database URL');
  }
}
async function insertRow(client: PoolClient, table: Table, row: string, columns: Column[]) {
  const names = columns.map((column) => column.name);
  // JSON decoding and bigint/date/array conversion happen inside PostgreSQL, so
  // backups preserve integers above JS's safe range and timestamp microseconds.
  // Reject unknown fields; neither row keys nor file strings become SQL.
  const quoted = names.map(ident).join(',');
  const selected = names.map((name) => `record.${ident(name)}`).join(',');
  const result = await client.query(
    `WITH input AS MATERIALIZED (SELECT $1::json AS row), validated AS (
       SELECT row FROM input WHERE CASE WHEN json_typeof(row)='object'
         THEN NOT EXISTS (SELECT 1 FROM json_object_keys(row) AS k WHERE NOT (k=ANY($2::text[])))
         ELSE false END)
     INSERT INTO ${qualified(table)} (${quoted}) OVERRIDING SYSTEM VALUE
     SELECT ${selected} FROM validated
     CROSS JOIN LATERAL json_populate_record(NULL::${qualified(table)},validated.row) AS record`,
    [row, names],
  );
  if (result.rowCount !== 1) throw new Error(`Invalid backup row or unknown columns in ${table}`);
}

export async function restoreDatabase(pool: Pool, path: string) {
  if (!path) throw new Error('Supply backup path');
  const info = await stat(path);
  if (!info.isFile()) throw new Error('Backup path must be a regular file');
  const prefixFile = await open(path, 'r');
  const prefix = Buffer.alloc(256);
  let prefixLength: number;
  try {
    prefixLength = (await prefixFile.read(prefix, 0, prefix.length, 0)).bytesRead;
  } finally {
    await prefixFile.close();
  }
  const legacy = /^\s*\{\s*"version"\s*:\s*1(?:\s|,|})/.test(
    prefix.subarray(0, prefixLength!).toString('utf8'),
  );
  if (legacy && info.size > MAX_LEGACY_BYTES)
    throw new Error(
      `Legacy v1 JSON backup exceeds bounded ${MAX_LEGACY_BYTES} byte limit; use a v2 streaming backup`,
    );
  const client = await pool.connect();
  const tableRows = counts();
  let rows = 0;
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock($1::bigint)', [ADVISORY_LOCK]);
    await ensureEmpty(client);
    const columns = await columnsFor(client);
    if (legacy) {
      const data: unknown = JSON.parse(await readFile(path, 'utf8'));
      if (
        !isObject(data) ||
        data.version !== 1 ||
        Object.keys(data).some((key) => key !== 'version' && !TABLES.includes(key as Table))
      )
        throw new Error('Invalid legacy backup tables');
      for (const table of TABLES) {
        if (data[table] !== undefined && !Array.isArray(data[table]))
          throw new Error(`Invalid legacy table ${table}`);
        for (const row of data[table] ?? []) {
          if (!isObject(row)) throw new Error(`Invalid legacy row ${table}`);
          const names = Object.keys(row);
          const selectedColumns = columns[table].filter((column) => names.includes(column.name));
          if (
            !names.length ||
            names.some((name) => !selectedColumns.some((column) => column.name === name))
          )
            throw new Error(`Unknown legacy columns in ${table}`);
          await insertRow(client, table, JSON.stringify(row), selectedColumns);
          rows++;
          tableRows[table]++;
        }
      }
      const sequences: Sequence[] = [];
      for (const [table, column] of [
        ['events', 'cursor'],
        ['admin_audit', 'id'],
      ] as const) {
        const maximum = (
          await client.query(
            `SELECT max(${ident(column)})::text AS maximum FROM ${qualified(table)}`,
          )
        ).rows[0].maximum;
        sequences.push({ table, column, lastValue: maximum ?? '1', isCalled: maximum !== null });
      }
      await restoreSequences(client, sequences);
      await client.query('COMMIT');
      return {
        path,
        version: 1 as const,
        rows,
        tableRows,
        limitations: [
          'Legacy v1 did not record sequence gaps; sequences reconstructed from restored rows',
        ],
      };
    }
    const hash = createHash('sha256');
    let header: Header | undefined,
      footer: Record<string, any> | undefined,
      lastTable = 0;
    for await (const line of lines(path)) {
      if (footer) throw new Error('Backup has trailing records after footer');
      const text = new TextDecoder('utf-8', { fatal: true }).decode(line);
      if (!header) {
        const candidate: unknown = JSON.parse(text);
        if (
          !isObject(candidate) ||
          candidate.type !== 'header' ||
          candidate.format !== 'world-simulator-backup' ||
          candidate.version !== 2 ||
          !same(candidate.tables, TABLES) ||
          !isObject(candidate.columns) ||
          !same(candidate.columns, columns) ||
          !Array.isArray(candidate.sequences) ||
          candidate.sequences.length !== 2 ||
          !candidate.sequences.every(validSequence)
        )
          throw new Error('Unsupported or incompatible backup header');
        header = candidate as Header;
        hash.update(line).update('\n');
        continue;
      }
      if (text.startsWith('{"type":"row","table":"')) {
        const match = /^\{"type":"row","table":"([a-z_]+)","row":/.exec(text);
        const table = match?.[1] as Table;
        const index = TABLES.indexOf(table);
        if (!match || index < lastTable || index < 0 || !text.endsWith('}'))
          throw new Error('Invalid backup table or row order');
        lastTable = index;
        await insertRow(client, table, text.slice(match[0].length, -1), columns[table]);
        hash.update(line).update('\n');
        rows++;
        tableRows[table]++;
      } else {
        const candidate: unknown = JSON.parse(text);
        if (
          !isObject(candidate) ||
          candidate.type !== 'footer' ||
          candidate.version !== 2 ||
          candidate.rows !== rows ||
          !same(candidate.tableRows, tableRows) ||
          candidate.sha256 !== hash.digest('hex')
        )
          throw new Error('Backup footer count or checksum mismatch');
        footer = candidate;
      }
    }
    if (!header || !footer)
      throw new Error('Truncated backup: complete header and EOF footer required');
    await restoreSequences(client, header.sequences);
    await client.query('COMMIT');
    return { path, version: 2 as const, rows, tableRows, sha256: footer.sha256 as string };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
