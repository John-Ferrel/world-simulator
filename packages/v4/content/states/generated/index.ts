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
import infantWonder from './pack-infant-wonder.json' with { type: 'json' };
import darkFantasy from './pack-dark-fantasy.json' with { type: 'json' };
import smallMysteries from './pack-small-mysteries.json' with { type: 'json' };
import elderMemory from './pack-elder-memory.json' with { type: 'json' };
import blackComedy from './pack-black-comedy.json' with { type: 'json' };
import loveDesire from './pack-love-desire.json' with { type: 'json' };
import moneyLuck from './pack-money-luck.json' with { type: 'json' };
import youthFire from './pack-youth-fire.json' with { type: 'json' };
import oddJobs from './pack-odd-jobs.json' with { type: 'json' };
import historyStreet from './pack-history-street.json' with { type: 'json' };
import adaptiveEveryday from './pack-adaptive-everyday.json' with { type: 'json' };
import livingConsequences from './pack-living-consequences.json' with { type: 'json' };
import dramaticLives from './pack-dramatic-lives.json' with { type: 'json' };
import dramaticOverhaul from './pack-dramatic-overhaul.json' with { type: 'json' };
import earlyLifeDrama from './pack-early-life-drama.json' with { type: 'json' };
import phase23HighStakes from './pack-phase23-high-stakes.json' with { type: 'json' };
import collisionPowerLove from './pack-collision-power-love.json' with { type: 'json' };
import collisionFamilyWar from './pack-collision-family-war.json' with { type: 'json' };
import collisionLuckCraft from './pack-collision-luck-craft.json' with { type: 'json' };
import collisionElderHistory from './pack-collision-elder-history.json' with { type: 'json' };
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
  infantWonder,
  darkFantasy,
  smallMysteries,
  elderMemory,
  blackComedy,
  loveDesire,
  moneyLuck,
  youthFire,
  oddJobs,
  historyStreet,
  collisionPowerLove,
  collisionFamilyWar,
  collisionLuckCraft,
  collisionElderHistory,
  adaptiveEveryday,
  livingConsequences,
  dramaticLives,
  dramaticOverhaul,
  earlyLifeDrama,
  phase23HighStakes,
] as unknown as StatePack[];

export const GENERATED_STATES: StateDefinition[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.states,
);

export const GENERATED_STATE_KERNELS: PlotKernel[] = GENERATED_STATE_PACKS.flatMap(
  (pack) => pack.kernels ?? [],
);
