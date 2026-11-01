import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { activeWorld, pool } from '../packages/storage/index.js';
import { reserveTokens, finishTokens } from '../packages/storage/budget.js';
import { perception } from '../packages/cognition/index.js';
import { chat, parseModelJSON } from '../packages/model/config.js';
import { planningPrompt } from '../packages/planning/prompt.js';
import { AgendaProposalSchema } from '../packages/planning/schema.js';
import { adoptAgenda } from '../packages/planning/index.js';
import { remember } from '../packages/cognition/index.js';
import { advance } from '../packages/simulation-core/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
const id = `planner-audit-${randomUUID()}`;
try {
  const actual = await activeWorld();
  if (!actual) throw new Error('No active world');
  const w = structuredClone(actual);
  const used = new Map(
    (
      await pool.query(
        "SELECT substring(bucket from 7) AS actor,tokens FROM model_budget WHERE day=current_date AND bucket LIKE 'actor:%'",
      )
    ).rows.map((r) => [r.actor, Number(r.tokens)]),
  );
  const p = w.persons.find((p) => p.death === undefined && (used.get(p.id) ?? 0) < 2500)!;
  const facts = (
    await pool.query(
      'SELECT payload FROM events WHERE world_id=$1 AND person_ids @> ARRAY[$2]::text[] ORDER BY cursor DESC LIMIT 8',
      [w.id, p.id],
    )
  ).rows.map((r) => r.payload);
  for (const e of facts) remember(p, e);
  const full = perception(w, p);
  const payload = {
    jobId: id,
    actorId: p.id,
    actorVersion: p.version,
    deadline: w.month + 3,
    perception: {
      actor: {
        id: p.id,
        name: p.name,
        occupation: p.occupation,
        coin: p.coin,
        goals: p.goals.filter((g) => g.status === 'active').slice(0, 2),
        skills: p.skills,
        values: p.values,
      },
      local: {
        id: full.local.id,
        name: full.local.name,
        scarcity: full.local.scarcity,
        neighbors: full.local.neighbors.slice(0, 2),
        knownPeople: full.local.knownPeople.slice(0, 2),
      },
      memories: p.memories.slice(-2),
      observations: facts.slice(0, 2),
    },
  };
  if (!(await reserveTokens(id, p.id, 2000, 'open-agenda/1-real-audit')))
    throw new Error('Model budget exhausted');
  const result = await chat(
    [
      { role: 'system', content: planningPrompt },
      { role: 'user', content: JSON.stringify(payload) },
    ],
    { conversation: `${w.id}:${p.id}:planning-audit`, maxTokens: 600 },
  );
  await finishTokens(id, result.tokens || 2000, result.model);
  const proposal = AgendaProposalSchema.parse(parseModelJSON(result.text));
  if (
    proposal.actorId !== p.id ||
    proposal.actorVersion !== p.version ||
    proposal.jobId !== id ||
    proposal.deadline !== payload.deadline
  )
    throw new Error('Scope mismatch');
  const events: HistoricalEvent[] = [];
  const emitted = adoptAgenda(
    w,
    proposal,
    (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
      const e = {
        id: `audit-e${++w.eventSeq}`,
        worldId: w.id,
        month: w.month,
        kind,
        personIds,
        locationId,
        text,
        data,
        causeIds,
        significance,
      };
      events.push(e);
      for (const id of personIds) {
        const actor = w.persons.find((p) => p.id === id);
        if (actor) remember(actor, e);
      }
      return e;
    },
  );
  let future = w;
  const outcomes: HistoricalEvent[] = [];
  for (
    let i = 0;
    i <
    Math.min(
      8,
      proposal.steps.reduce((n, s) => n + s.months, 0),
    );
    i++
  ) {
    const next = advance(future);
    future = next.world;
    outcomes.push(
      ...next.events.filter((e) => e.personIds.includes(p.id) && e.kind.startsWith('agenda_')),
    );
  }
  const report = {
    mode: 'real-model/read-only-snapshot/headless-consequences',
    world: actual.id,
    month: actual.month,
    actor: p.id,
    model: result.model,
    tokens: result.tokens,
    proposal,
    adoption: emitted.kind,
    consequences: outcomes.map((e) => ({ kind: e.kind, text: e.text, month: e.month })),
    finalAgenda: future.agency?.agendas[p.id]?.status,
    replanning: future.agency?.needsReplan[p.id],
  };
  await writeFile('docs/metrics/real-planner.json', JSON.stringify(report, null, 2));
  console.log({
    model: result.model,
    tokens: result.tokens,
    intention: proposal.intention,
    steps: proposal.steps.length,
    adoption: emitted.kind,
    outcomes: outcomes.length,
    status: report.finalAgenda,
  });
} catch (e) {
  await finishTokens(id, 2000, 'opencode-go/deepseek-v4.1-flash', 'failed');
  throw e;
} finally {
  await pool.end();
}
