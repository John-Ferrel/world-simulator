import type { PlotKernel } from '../../composition/types.js';
import { CHILDHOOD_EDUCATION_KERNELS } from './childhood-education.js';
import { WORK_COMMERCE_KERNELS } from './work-commerce.js';
import { FAMILY_SOCIAL_KERNELS } from './family-social.js';
import { HEALTH_VIOLENCE_WAR_KERNELS } from './health-violence-war.js';
import { CIVIC_CULTURE_MIGRATION_KERNELS } from './civic-culture-migration.js';

/** Plot Kernel registry. Each domain file exports its own independent array. */
export const KERNEL_LIBRARY: PlotKernel[] = [
  ...CHILDHOOD_EDUCATION_KERNELS,
  ...WORK_COMMERCE_KERNELS,
  ...FAMILY_SOCIAL_KERNELS,
  ...HEALTH_VIOLENCE_WAR_KERNELS,
  ...CIVIC_CULTURE_MIGRATION_KERNELS,
];
