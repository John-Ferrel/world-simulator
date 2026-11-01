import { writeFileSync } from 'node:fs';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import {
  defaultMacroState,
  applyMacroProposal,
  materializeDevelopments,
} from '../packages/v4/macro.js';
import { compileMacroProposal, knownMacroFamilyIds } from '../packages/v4/macro-director.js';

const world = structuredClone(VIENNA_1912_SEED);
world.date = { year: 1917, month: 1 };
world.macro = defaultMacroState(world, world.date);
const knownFamilies = knownMacroFamilyIds();
const first = await compileMacroProposal({
  world,
  state: world.macro,
  knownFamilies,
  maxTokens: 2000,
});
let state = applyMacroProposal(world.macro, first.proposal, world.date, first.model, 'multi-1');
state = materializeDevelopments(world, state, first.proposal, 'multi-1', world.date);
world.macro = state;
world.date = { year: 1918, month: 1 };
const second = await compileMacroProposal({
  world,
  state,
  knownFamilies,
  maxTokens: 2000,
});
const report = {
  model: first.model,
  calls: [
    { cycle: 1, tokens: first.tokens, proposal: first.proposal },
    { cycle: 2, tokens: second.tokens, proposal: second.proposal },
  ],
  existingDevelopments: Object.values(state.developments ?? {}).map((development) => ({
    id: development.id,
    type: development.type,
    description: development.description,
    organizationId: development.organizationId,
  })),
  secondCycleMentionsPrevious:
    second.proposal.summary.includes('Anti-War') ||
    second.proposal.summary.includes('反战') ||
    second.proposal.summary.includes('组织'),
};
writeFileSync('docs/v4/phase-4-multi-cycle.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
