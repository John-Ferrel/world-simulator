import '../../packages/model/config.js';
import { migrateV4, loadV4World } from '../../packages/v4/store.js';
import {
  applyV4MacroProposal,
  claimV4MacroProposal,
  finishV4MacroProposal,
} from '../../packages/v4/macro-store.js';
import { compileMacroProposal, knownMacroFamilyIds } from '../../packages/v4/macro-director.js';
import { defaultMacroState } from '../../packages/v4/macro.js';

await migrateV4();
console.log('v4 macro worker: ready');

let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopped = true;
  });

while (!stopped) {
  const job = await claimV4MacroProposal();
  if (!job) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    continue;
  }
  try {
    const world = await loadV4World(job.world_id);
    if (!world) throw new Error('world missing');
    if (world.status !== 'running') {
      await finishV4MacroProposal(job.id, 'stale', { error: 'world is archived' });
      continue;
    }
    const state = world.macro ?? defaultMacroState(world);
    const knownFamilies = knownMacroFamilyIds();
    const compiled = await compileMacroProposal({ world, state, knownFamilies });
    const applied = await applyV4MacroProposal(
      job.world_id,
      compiled.proposal,
      compiled.model,
      job.id,
      new Set(knownFamilies),
    );
    await finishV4MacroProposal(job.id, 'applied', {
      model: compiled.model,
      tokens: compiled.tokens,
      proposal: compiled.proposal,
      appliedRevision: applied.revision,
    });
    console.log(
      JSON.stringify({
        kind: 'v4-macro-proposal',
        world: job.world_id,
        id: job.id,
        model: compiled.model,
        tokens: compiled.tokens,
        summary: compiled.proposal.summary,
        region: compiled.proposal.regionId,
        changes: compiled.proposal.parameterChanges,
        eventPoolChanges: compiled.proposal.eventPoolChanges,
        revision: applied.revision,
      }),
    );
  } catch (error) {
    const message = (error as Error).message.slice(0, 500);
    const retry = job.attempts < 3;
    await finishV4MacroProposal(job.id, retry ? 'pending' : 'failed', { error: message }).catch(
      () => undefined,
    );
    console.error('v4 macro worker:', retry ? 'retry' : 'failed', message);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
