import type { PlotKernel } from '../../../composition/types.js';
import { BATCH1_CHILDHOOD_EDUCATION } from './batch1-childhood-education.js';
import { BATCH1_WORK_COMMERCE } from './batch1-work-commerce.js';
import { BATCH1_FAMILY_SOCIAL } from './batch1-family-social.js';
import { BATCH1_HEALTH_CRIME } from './batch1-health-crime.js';
import { BATCH1_CIVIC_WAR_MIGRATION } from './batch1-civic-war-migration.js';
import { BATCH1_CULTURE_FAITH_SCIENCE } from './batch1-culture-faith-science.js';
import { BATCH2_RURAL_AGRICULTURE } from './batch2-rural-agriculture.js';
import { BATCH2_URBAN_INFRASTRUCTURE } from './batch2-urban-infrastructure.js';
import { BATCH2_FINANCE_LAW } from './batch2-finance-law.js';
import { BATCH2_DOMESTIC_LEISURE } from './batch2-domestic-leisure.js';
import { BATCH2_HIGHER_EDUCATION_MEDIA } from './batch2-higher-education-media.js';
import { BATCH2_RELIGION_CHARITY } from './batch2-religion-charity.js';
import { BATCH3_WAR_FRONT } from './batch3-war-front.js';
import { BATCH3_CRIME_JUSTICE } from './batch3-crime-justice.js';
import { BATCH3_MIGRATION_REFUGEE } from './batch3-migration-refugee.js';
import { BATCH3_CHILD_ADOLESCENT_2 } from './batch3-child-adolescent-2.js';
import { BATCH3_WORK_INDUSTRY_2 } from './batch3-work-industry-2.js';

/** Phase 12 recipe packs. Each batch is independently authored and validated. */
export const RECIPE_PACKS: PlotKernel[] = [
  ...BATCH1_CHILDHOOD_EDUCATION,
  ...BATCH1_WORK_COMMERCE,
  ...BATCH1_FAMILY_SOCIAL,
  ...BATCH1_HEALTH_CRIME,
  ...BATCH1_CIVIC_WAR_MIGRATION,
  ...BATCH1_CULTURE_FAITH_SCIENCE,
  ...BATCH2_RURAL_AGRICULTURE,
  ...BATCH2_URBAN_INFRASTRUCTURE,
  ...BATCH2_FINANCE_LAW,
  ...BATCH2_DOMESTIC_LEISURE,
  ...BATCH2_HIGHER_EDUCATION_MEDIA,
  ...BATCH2_RELIGION_CHARITY,
  ...BATCH3_WAR_FRONT,
  ...BATCH3_CRIME_JUSTICE,
  ...BATCH3_MIGRATION_REFUGEE,
  ...BATCH3_CHILD_ADOLESCENT_2,
  ...BATCH3_WORK_INDUSTRY_2,
];
