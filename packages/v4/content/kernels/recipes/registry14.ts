import type { PlotKernel } from '../../../composition/types.js';
import { BATCH14_EDUCATION_CHAINS } from './batch14-education-chains.js';
import { BATCH14_CAREER_CHAINS } from './batch14-career-chains.js';
import { BATCH14_FAMILY_CHAINS } from './batch14-family-chains.js';
import { BATCH14_SOCIAL_ECHOES } from './batch14-social-echoes.js';
import { BATCH14_HISTORY_CONSEQUENCES } from './batch14-history-consequences.js';
import { BATCH14_SPECIAL_LIVES } from './batch14-special-lives.js';

/** Phase 14 long-life chains and cross-event echoes. */
export const PHASE14_RECIPE_PACKS: PlotKernel[] = [
  ...BATCH14_EDUCATION_CHAINS,
  ...BATCH14_CAREER_CHAINS,
  ...BATCH14_FAMILY_CHAINS,
  ...BATCH14_SOCIAL_ECHOES,
  ...BATCH14_HISTORY_CONSEQUENCES,
  ...BATCH14_SPECIAL_LIVES,
];
