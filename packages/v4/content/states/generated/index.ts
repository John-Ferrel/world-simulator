import loveSecrecy from './pack-love-secrecy.json' with { type: 'json' };
import familyContinuity from './pack-family-continuity.json' with { type: 'json' };
import historyFork from './pack-history-fork.json' with { type: 'json' };
import absurdPower from './pack-absurd-power.json' with { type: 'json' };
import curseBetrayal from './pack-curse-betrayal.json' with { type: 'json' };
import officeInfluence from './pack-office-influence.json' with { type: 'json' };
import factoryEducation from './pack-factory-education.json' with { type: 'json' };
import fameArt from './pack-fame-art.json' with { type: 'json' };
import migrationBelonging from './pack-migration-belonging.json' with { type: 'json' };
import absurdFortune from './pack-absurd-fortune.json' with { type: 'json' };
import lifeCourse from './pack-life-course.json' with { type: 'json' };
import crimeJustice from './pack-crime-justice.json' with { type: 'json' };
import desireScandal from './pack-desire-scandal.json' with { type: 'json' };
import workCraft from './pack-work-craft.json' with { type: 'json' };
import faithMiracles from './pack-faith-miracles.json' with { type: 'json' };
import type { PlotKernel } from '../../../composition/types.js';
import type { StatePack } from '../../../state/registry.js';
import type { StateDefinition } from '../../../state/types.js';

/**
 * Content packs validated by scripts/v4-validate-state-pack.ts before being
 * imported. Some are authored by LLM subagents, one is a normalized real
 * Content Factory output. `model` is provenance only; the runtime never reads
 * model text directly.
 */
export const GENERATED_STATE_PACKS: StatePack[] = [
  loveSecrecy,
  familyContinuity,
  historyFork,
  absurdPower,
  curseBetrayal,
  officeInfluence,
  factoryEducation,
  fameArt,
  migrationBelonging,
  absurdFortune,
  lifeCourse,
  crimeJustice,
  desireScandal,
  workCraft,
  faithMiracles,
] as unknown as StatePack[];

export const GENERATED_STATES: StateDefinition[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.states,
);

export const GENERATED_STATE_KERNELS: PlotKernel[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.kernels ?? [],
);
