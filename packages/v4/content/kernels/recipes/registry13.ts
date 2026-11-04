import type { PlotKernel } from '../../../composition/types.js';
import { BATCH13_EDUCATION_TASKS } from './batch13-education-tasks.js';
import { BATCH13_WORK_TASKS } from './batch13-work-tasks.js';
import { BATCH13_FAMILY_SOCIAL_TASKS } from './batch13-family-social-tasks.js';
import { BATCH13_CIVIC_HEALTH_TASKS } from './batch13-civic-health-tasks.js';
import { BATCH13_MAJOR_TURNS_EVENTS } from './batch13-major-turns-events.js';
import { BATCH13_RELATIONSHIP_EVENTS } from './batch13-relationship-events.js';

/** Phase 13 active tasks and life-turn recipes. */
export const PHASE13_RECIPE_PACKS: PlotKernel[] = [
  ...BATCH13_EDUCATION_TASKS,
  ...BATCH13_WORK_TASKS,
  ...BATCH13_FAMILY_SOCIAL_TASKS,
  ...BATCH13_CIVIC_HEALTH_TASKS,
  ...BATCH13_MAJOR_TURNS_EVENTS,
  ...BATCH13_RELATIONSHIP_EVENTS,
];
