import type { PlotKernel } from '../../composition/types.js';
import { CHILDHOOD_EDUCATION_KERNELS } from './childhood-education.js';
import { WORK_COMMERCE_KERNELS } from './work-commerce.js';
import { FAMILY_SOCIAL_KERNELS } from './family-social.js';
import { HEALTH_VIOLENCE_WAR_KERNELS } from './health-violence-war.js';
import { CIVIC_CULTURE_MIGRATION_KERNELS } from './civic-culture-migration.js';
import { KIT_RECIPES } from './recipes/kit-recipes.js';
import { RECIPE_PACKS } from './recipes/registry.js';
import { PHASE13_RECIPE_PACKS } from './recipes/registry13.js';
import { PHASE14_RECIPE_PACKS } from './recipes/registry14.js';
import { BATCH15_STATE_KERNELS } from './recipes/batch15-state-kernels.js';
import { GENERATED_STATE_KERNELS } from '../states/generated/index.js';

/** Plot Kernel registry. Each domain file exports its own independent array. */
export const KERNEL_LIBRARY: PlotKernel[] = [
  ...CHILDHOOD_EDUCATION_KERNELS,
  ...WORK_COMMERCE_KERNELS,
  ...FAMILY_SOCIAL_KERNELS,
  ...HEALTH_VIOLENCE_WAR_KERNELS,
  ...CIVIC_CULTURE_MIGRATION_KERNELS,
  ...KIT_RECIPES,
  ...RECIPE_PACKS,
  ...PHASE13_RECIPE_PACKS,
  ...PHASE14_RECIPE_PACKS,
  ...BATCH15_STATE_KERNELS,
  ...GENERATED_STATE_KERNELS,
];
