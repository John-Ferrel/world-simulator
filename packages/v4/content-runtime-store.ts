import { pool } from '../storage/index.js';
import { compileGeneratedPack, validateGeneratedPack, type GeneratedPack } from './generated.js';
import type { SceneDefinition } from './domain.js';

export type V4ContentJob = {
  id: string;
  world_id?: string;
  brief_id: string;
  reason: string;
  status: 'pending' | 'running' | 'published' | 'failed';
  attempts: number;
  tokens: number;
  error?: string;
};

export async function loadPublishedV4ContentPacks(): Promise<GeneratedPack[]> {
  const rows = (
    await pool.query(
      "SELECT payload FROM v4_content_packs WHERE status='published' ORDER BY pack_id",
    )
  ).rows;
  const packs: GeneratedPack[] = [];
  for (const row of rows) {
    const validation = validateGeneratedPack(row.payload);
    if (validation.errors.length === 0) packs.push(row.payload as GeneratedPack);
  }
  return packs;
}

export async function loadPublishedV4Scenes(): Promise<SceneDefinition[]> {
  try {
    return (await loadPublishedV4ContentPacks()).flatMap((pack) => compileGeneratedPack(pack));
  } catch {
    return [];
  }
}

export async function publishV4ContentPack(pack: GeneratedPack, source = 'runtime-author') {
  const validation = validateGeneratedPack(pack);
  if (validation.errors.length > 0)
    throw new Error(`content pack ${pack.id} invalid: ${validation.errors.slice(0, 3).join('; ')}`);
  await pool.query(
    `INSERT INTO v4_content_packs(pack_id,version,status,payload,source,updated_at)
     VALUES($1,1,'published',$2,$3,now())
     ON CONFLICT(pack_id) DO UPDATE SET
       version=v4_content_packs.version+1,status='published',payload=EXCLUDED.payload,
       source=EXCLUDED.source,updated_at=now()`,
    [pack.id, JSON.stringify(pack), source],
  );
}

export async function enqueueV4ContentJob(
  worldId: string | undefined,
  briefId: string,
  reason: string,
): Promise<string | undefined> {
  const published = await pool.query(
    "SELECT 1 FROM v4_content_packs WHERE pack_id=$1 AND status='published'",
    [briefId],
  );
  if (published.rows.length > 0) return undefined;
  const pending = await pool.query(
    "SELECT 1 FROM v4_content_jobs WHERE brief_id=$1 AND status IN ('pending','running') LIMIT 1",
    [briefId],
  );
  if (pending.rows.length > 0) return undefined;
  const id = `v4-content-${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`;
  await pool.query(
    `INSERT INTO v4_content_jobs(id,world_id,brief_id,reason,status)
     VALUES($1,$2,$3,$4,'pending')`,
    [id, worldId ?? null, briefId, reason],
  );
  return id;
}

export async function claimV4ContentJob(): Promise<V4ContentJob | undefined> {
  const row = await pool.query(
    `WITH next AS (
       SELECT id FROM v4_content_jobs WHERE status='pending'
       ORDER BY created_at LIMIT 1 FOR UPDATE SKIP LOCKED
     )
     UPDATE v4_content_jobs j SET status='running', attempts=j.attempts+1, updated_at=now()
     FROM next WHERE j.id=next.id RETURNING j.*`,
  );
  return row.rows[0] as V4ContentJob | undefined;
}

export async function finishV4ContentJob(
  id: string,
  status: 'pending' | 'published' | 'failed',
  values: { tokens?: number; error?: string } = {},
) {
  await pool.query(
    `UPDATE v4_content_jobs SET status=$2,tokens=coalesce($3,tokens),error=$4,updated_at=now()
     WHERE id=$1`,
    [id, status, values.tokens ?? null, values.error ?? null],
  );
}

export async function contentJobsSummary(worldId: string) {
  const rows = (
    await pool.query(
      'SELECT status,count(*)::int AS count FROM v4_content_jobs WHERE world_id=$1 GROUP BY status',
      [worldId],
    )
  ).rows;
  return Object.fromEntries(rows.map((row: any) => [row.status, Number(row.count)]));
}
