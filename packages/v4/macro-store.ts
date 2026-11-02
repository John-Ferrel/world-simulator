import { pool } from '../storage/index.js';
import {
  applyMacroProposal,
  defaultMacroState,
  materializeDevelopments,
  validateMacroProposal,
  type MacroProposal,
  type MacroState,
} from './macro.js';
import { loadV4World, type V4WorldMeta } from './store.js';
import { enqueueV4ContentJob } from './content-runtime-store.js';

/**
 * Phase 3 Director queue and application.
 *
 * A proposal is validated against a loaded world before the transaction, then
 * revalidated against the locked row/current macro. Revision bump means a
 * stale simulator snapshot cannot overwrite the applied macro state.
 */

export type V4MacroProposalRow = {
  id: string;
  world_id: string;
  region_id: string;
  world_year: number;
  status: 'pending' | 'running' | 'validated' | 'applied' | 'failed' | 'stale';
  attempts: number;
  model?: string;
  tokens: number;
  proposal?: MacroProposal;
  error?: string;
  snapshot_hash?: string;
  applied_revision?: number;
};

export async function enqueueV4MacroProposal(
  worldId: string,
  worldYear: number,
  intervalYears = 5,
): Promise<string | undefined> {
  const active = await pool.query(
    "SELECT 1 FROM v4_macro_proposals WHERE world_id=$1 AND status IN ('pending','running') LIMIT 1",
    [worldId],
  );
  if (active.rows.length > 0) return undefined;
  const recent = await pool.query(
    "SELECT 1 FROM v4_macro_proposals WHERE world_id=$1 AND status='applied' AND world_year > $2 LIMIT 1",
    [worldId, worldYear - Math.max(1, intervalYears)],
  );
  if (recent.rows.length > 0) return undefined;
  const id = `v4-macro-${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`;
  const row = await pool.query(
    `INSERT INTO v4_macro_proposals(id,world_id,region_id,world_year,status)
     VALUES($1,$2,$3,$4,'pending') RETURNING id`,
    [id, worldId, 'region-lower-austria', worldYear],
  );
  return row.rows[0]?.id;
}

export async function claimV4MacroProposal(): Promise<V4MacroProposalRow | undefined> {
  const row = await pool.query(
    `WITH next AS (
       SELECT id FROM v4_macro_proposals
       WHERE status='pending'
       ORDER BY created_at
       LIMIT 1
       FOR UPDATE SKIP LOCKED
     )
     UPDATE v4_macro_proposals p
     SET status='running', attempts=p.attempts+1, updated_at=now()
     FROM next WHERE p.id=next.id
     RETURNING p.*`,
  );
  return row.rows[0] as V4MacroProposalRow | undefined;
}

export async function finishV4MacroProposal(
  id: string,
  status: 'pending' | 'validated' | 'applied' | 'failed' | 'stale',
  values: {
    model?: string;
    tokens?: number;
    error?: string;
    proposal?: MacroProposal;
    appliedRevision?: number;
  } = {},
): Promise<void> {
  await pool.query(
    `UPDATE v4_macro_proposals
     SET status=$2, model=coalesce($3,model), tokens=coalesce($4,tokens),
         error=$5, proposal=coalesce($6,proposal), applied_revision=coalesce($7,applied_revision),
         updated_at=now()
     WHERE id=$1`,
    [
      id,
      status,
      values.model ?? null,
      values.tokens ?? null,
      values.error ?? null,
      values.proposal ? JSON.stringify(values.proposal) : null,
      values.appliedRevision ?? null,
    ],
  );
}

export async function applyV4MacroProposal(
  worldId: string,
  proposal: MacroProposal,
  model: string,
  proposalId: string,
  knownFamilies: Set<string>,
): Promise<{ revision: number; macro: MacroState }> {
  const world = await loadV4World(worldId);
  if (!world) throw new Error('v4 world missing');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const row = (
      await client.query(
        'SELECT revision,status,date_year,date_month,macro FROM v4_worlds WHERE id=$1 FOR UPDATE',
        [worldId],
      )
    ).rows[0];
    if (!row) throw new Error('v4 world missing');
    if (row.status !== 'running') throw new Error('v4 world is not running');
    const currentDate = { year: Number(row.date_year), month: Number(row.date_month) };
    const currentWorld = { ...world, date: currentDate };
    const state =
      row.macro && Object.keys(row.macro).length > 0
        ? (row.macro as MacroState)
        : defaultMacroState(currentWorld);
    const safe = validateMacroProposal(proposal, {
      world: currentWorld,
      state,
      knownFamilies,
    });
    let next = applyMacroProposal(state, safe, currentDate, model, proposalId);
    next = materializeDevelopments(currentWorld, next, safe, proposalId, currentDate);
    const revision = Number(row.revision) + 1;
    await client.query('UPDATE v4_worlds SET revision=$2,macro=$3 WHERE id=$1', [
      worldId,
      revision,
      JSON.stringify(next),
    ]);
    // New development organizations are real entities, not just macro text.
    for (const development of Object.values(next.developments ?? {})) {
      if (!development.organizationId) continue;
      const organization = currentWorld.organizations[development.organizationId];
      if (!organization) continue;
      await client.query(
        `INSERT INTO v4_organizations(world_id,id,payload)
         VALUES($1,$2,$3)
         ON CONFLICT(world_id,id) DO NOTHING`,
        [worldId, organization.id, JSON.stringify(organization)],
      );
    }
    await client.query(
      `UPDATE v4_macro_proposals
       SET status='applied', proposal=$3, model=$2, applied_revision=$4, updated_at=now()
       WHERE id=$1`,
      [proposalId, model, JSON.stringify(safe), revision],
    );
    await client.query('COMMIT');
    // A supported development can request new runtime content. The content
    // worker generates/validates/publishes it outside this transaction; the
    // simulator picks it up on the next tick.
    for (const development of Object.values(safe.developments)) {
      if (development.type !== 'social_change') continue;
      // Historical processes get a process-aware brief. The generated pack is
      // still validated against the ordinary scene/effect grammar and only
      // becomes live after publication.
      const briefId = 'vienna-historical-social-movement';
      await enqueueV4ContentJob(worldId, briefId, development.description.slice(0, 300)).catch(
        () => undefined,
      );
    }
    return { revision, macro: next };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function macroProposalSummary(worldId: string): Promise<{
  pending: number;
  running: number;
  applied: number;
  failed: number;
  last?: V4MacroProposalRow;
}> {
  const counts = await pool.query(
    'SELECT status,count(*)::int AS count FROM v4_macro_proposals WHERE world_id=$1 GROUP BY status',
    [worldId],
  );
  const last = await pool.query(
    'SELECT * FROM v4_macro_proposals WHERE world_id=$1 ORDER BY created_at DESC LIMIT 1',
    [worldId],
  );
  const by = Object.fromEntries(counts.rows.map((row: any) => [row.status, Number(row.count)]));
  return {
    pending: by.pending ?? 0,
    running: by.running ?? 0,
    applied: by.applied ?? 0,
    failed: by.failed ?? 0,
    last: last.rows[0] as V4MacroProposalRow | undefined,
  };
}

/** Read the current macro without loading the whole world (observer/API path). */
export async function v4MacroState(worldId: string): Promise<MacroState | undefined> {
  const row = (await pool.query('SELECT macro FROM v4_worlds WHERE id=$1', [worldId])).rows[0];
  if (!row?.macro || Object.keys(row.macro).length === 0) return undefined;
  return row.macro as MacroState;
}

export type { V4WorldMeta };
