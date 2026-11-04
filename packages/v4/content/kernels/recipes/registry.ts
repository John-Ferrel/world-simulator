import type { PlotKernel } from '../../../composition/types.js';
import { BATCH1_CHILDHOOD_EDUCATION } from './batch1-childhood-education.js';
import { BATCH1_WORK_COMMERCE } from './batch1-work-commerce.js';
import { BATCH1_FAMILY_SOCIAL } from './batch1-family-social.js';
import { BATCH1_HEALTH_CRIME } from './batch1-health-crime.js';
import { BATCH1_CIVIC_WAR_MIGRATION } from './batch1-civic-war-migration.js';
import { BATCH1_CULTURE_FAITH_SCIENCE } from './batch1-culture-faith-science.js';

/** Phase 12 recipe packs. Each batch is independently authored and validated. */
export const RECIPE_PACKS: PlotKernel[] = [
  ...BATCH1_CHILDHOOD_EDUCATION,
  ...BATCH1_WORK_COMMERCE,
  ...BATCH1_FAMILY_SOCIAL,
  ...BATCH1_HEALTH_CRIME,
  ...BATCH1_CIVIC_WAR_MIGRATION,
  ...BATCH1_CULTURE_FAITH_SCIENCE,
];
