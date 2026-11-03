import type { SceneDefinition, TaskDefinition } from '../domain.js';
import { MAJOR_EDUCATION_EVENTS, MAJOR_WORK_EVENTS } from './major-education-work.js';
import { MAJOR_FAMILY_EVENTS } from './major-family.js';
import { MAJOR_CRISIS_EVENTS } from './major-crisis.js';
import { MAJOR_LIFE_TASKS } from './major-life-tasks.js';
import { PHASE10_GENERATED_EVENT_SCENES, PHASE10_GENERATED_TASKS } from './generated/phase10.js';

/**
 * Phase 10 combines hand-authored decisive-life scenes with generated concrete
 * families. Authored packs guarantee that the most important transitions have
 * real typed consequences; generated packs provide breadth and literary
 * variants through the same SceneDefinition/TaskDefinition runtime.
 */
export const PHASE10_AUTHORED_EVENT_SCENES: SceneDefinition[] = [
  ...MAJOR_EDUCATION_EVENTS,
  ...MAJOR_WORK_EVENTS,
  ...MAJOR_FAMILY_EVENTS,
  ...MAJOR_CRISIS_EVENTS,
];

export const PHASE10_AUTHORED_TASKS: TaskDefinition[] = [...MAJOR_LIFE_TASKS];

export const PHASE10_EVENT_SCENES: SceneDefinition[] = [
  ...PHASE10_AUTHORED_EVENT_SCENES,
  ...PHASE10_GENERATED_EVENT_SCENES,
];

export const PHASE10_TASKS: TaskDefinition[] = [
  ...PHASE10_AUTHORED_TASKS,
  ...PHASE10_GENERATED_TASKS,
];
