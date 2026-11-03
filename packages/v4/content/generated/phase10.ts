import type { SceneDefinition, TaskDefinition } from '../../domain.js';
import {
  compileGeneratedPack,
  compileGeneratedTasks,
  type GeneratedPack,
} from '../../generated.js';
import pack0 from './p10-crisis-migration.json';
import pack1 from './p10-edu-thresholds.json';
import pack2 from './p10-edu-work-tasks.json';
import pack3 from './p10-family-fate.json';
import pack4 from './p10-family-tasks.json';
import pack5 from './p10-migration-tasks.json';
import pack6 from './p10-politics-tasks.json';
import pack7 from './p10-work-career.json';

const PHASE10_PACKS = [
  pack0,
  pack1,
  pack2,
  pack3,
  pack4,
  pack5,
  pack6,
  pack7,
] as unknown as GeneratedPack[];

export const PHASE10_GENERATED_TASK_PACKS = PHASE10_PACKS.filter((pack) => pack.kind === 'task');
export const PHASE10_GENERATED_EVENT_PACKS = PHASE10_PACKS.filter((pack) => pack.kind !== 'task');

export const PHASE10_GENERATED_TASKS: TaskDefinition[] = PHASE10_GENERATED_TASK_PACKS.flatMap(
  (pack) => compileGeneratedTasks(pack),
);
export const PHASE10_GENERATED_EVENT_SCENES: SceneDefinition[] =
  PHASE10_GENERATED_EVENT_PACKS.flatMap((pack) => compileGeneratedPack(pack));
