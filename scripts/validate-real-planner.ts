import { readFile, writeFile } from 'node:fs/promises';
import { activeWorld, pool } from '../packages/storage/index.js';
import { compileAgendaProposal } from '../packages/planning/compiler.js';
import { adoptAgenda } from '../packages/planning/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { remember } from '../packages/cognition/index.js';
try {
  const raw = JSON.parse(await readFile('.data/real-repair-output.json', 'utf8')),
    { proposal, compilations } = compileAgendaProposal(raw);
  const actual = (await activeWorld())!,
    w = structuredClone(actual),
    p = w.persons.find((p) => p.id === proposal.actorId)!;
  const event = adoptAgenda(
    w,
    proposal,
    (kind, personIds, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
      const e = {
        id: `audit-${++w.eventSeq}`,
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
      for (const id of personIds) {
        const actor = w.persons.find((p) => p.id === id);
        if (actor) remember(actor, e);
      }
      return e;
    },
  );
  let future = w;
  const outcomes: any[] = [];
  for (let i = 0; i < 6; i++) {
    const r = advance(future);
    future = r.world;
    outcomes.push(
      ...r.events
        .filter((e) => e.personIds.includes(p.id) && e.kind.startsWith('agenda_'))
        .map((e) => ({ kind: e.kind, text: e.text, month: e.month })),
    );
  }
  const call = (
    await pool.query('SELECT status,model,tokens FROM model_calls WHERE id=$1', [proposal.jobId])
  ).rows[0];
  const report = {
    mode: 'real-API-output/semantic-compilation/read-only-snapshot',
    world: actual.id,
    month: actual.month,
    call,
    proposal,
    compilations,
    adopted: event.kind,
    consequences: outcomes,
    finalStatus: future.agency?.agendas[p.id]?.status,
    worldWritten: false,
  };
  await writeFile('docs/metrics/real-planner-repair.json', JSON.stringify(report, null, 2));
  console.log({
    call,
    compiledActions: compilations.length,
    steps: proposal.steps.length,
    adopted: event.kind,
    consequences: outcomes.length,
    status: report.finalStatus,
  });
} finally {
  await pool.end();
}
