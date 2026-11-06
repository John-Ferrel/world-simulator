import loveSecrecy from './pack-love-secrecy.json' with { type: 'json' };
import familyContinuity from './pack-family-continuity.json' with { type: 'json' };
import historyFork from './pack-history-fork.json' with { type: 'json' };
import absurdPower from './pack-absurd-power.json' with { type: 'json' };
import curseBetrayal from './pack-curse-betrayal.json' with { type: 'json' };
import officeInfluence from './pack-office-influence.json' with { type: 'json' };
import type { PlotKernel } from '../../../composition/types.js';
import type { StatePack } from '../../../state/registry.js';
import type { StateDefinition } from '../../../state/types.js';

/**
 * LLM-authored content packs, validated by scripts/v4-validate-state-pack.ts
 * before being imported. `model` names the subagent model, not a runtime API
 * call; the runtime never reads model text directly.
 */
export const GENERATED_STATE_PACKS: StatePack[] = [
  loveSecrecy,
  familyContinuity,
  historyFork,
  absurdPower,
  curseBetrayal,
  officeInfluence,
] as unknown as StatePack[];

export const GENERATED_STATES: StateDefinition[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.states,
);

export const GENERATED_STATE_KERNELS: PlotKernel[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.kernels ?? [],
);
