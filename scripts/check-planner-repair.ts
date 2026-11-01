import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { activeWorld, pool } from '../packages/storage/index.js';
import { reserveTokens, finishTokens } from '../packages/storage/budget.js';
import { chat, parseModelJSON } from '../packages/model/config.js';
import { AgendaProposalSchema } from '../packages/planning/schema.js';
import { adoptAgenda } from '../packages/planning/index.js';
const id = `repair-${randomUUID()}`;
try {
  const actual = await activeWorld();
  if (!actual) throw new Error('No active world');
  const w = structuredClone(actual);
  const p = w.persons.find((p) => p.death === undefined && p.coin >= 3 && p.memories.length)!;
  if (!(await reserveTokens(id, p.id, 750, 'open-agenda/1-repair-audit')))
    throw new Error('Budget exhausted');
  const context = {
    jobId: id,
    actorId: p.id,
    actorVersion: p.version,
    deadline: w.month + 3,
    coin: p.coin,
    occupation: p.occupation,
    goal: p.goals.find((g) => g.status === 'active')?.kind,
    eventId: p.memories.at(-1)!.eventId,
  };
  const r = await chat(
    [
      {
        role: 'system',
        content:
          'Repair a rejected life plan: an earlier attempt referenced a person outside observed scope. Choose two feasible self-scoped steps using practice or research, months 1..3. Invent a short intention suited to occupation and goal. Return ONLY JSON {version:1,jobId,actorId,actorVersion,deadline,intention,rationale,steps:[{action,label,months}],evidenceIds:[eventId]}. Copy ids/versions exactly; keep intention/rationale/labels short. No targetId, code, free resources or guaranteed outcomes.',
      },
      { role: 'user', content: JSON.stringify(context) },
    ],
    { conversation: `${w.id}:${p.id}:repair-audit`, maxTokens: 300 },
  );
  await finishTokens(id, r.tokens || 750, r.model);
  const raw = parseModelJSON(r.text);
  await writeFile('.data/real-repair-output.json', JSON.stringify(raw, null, 2));
  const proposal = AgendaProposalSchema.parse(raw);
  if (proposal.jobId !== id || proposal.actorId !== p.id || proposal.actorVersion !== p.version)
    throw new Error('Scope mismatch');
  const event = adoptAgenda(
    w,
    proposal,
    (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => ({
      id: `repair-audit-${++w.eventSeq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    }),
  );
  const report = {
    mode: 'real-API-repair/read-only-snapshot',
    world: actual.id,
    month: actual.month,
    provider: 'opencode-go',
    model: r.model,
    tokens: r.tokens,
    previousFailure: 'target outside observed social scope',
    proposal,
    accepted: event.kind,
    worldWritten: false,
  };
  await writeFile('docs/metrics/real-planner-repair.json', JSON.stringify(report, null, 2));
  console.log({
    model: r.model,
    tokens: r.tokens,
    intention: proposal.intention,
    steps: proposal.steps.length,
    accepted: event.kind,
  });
} catch (e) {
  await finishTokens(id, 750, 'deepseek-v4.1-flash', 'failed');
  throw e;
} finally {
  await pool.end();
}
