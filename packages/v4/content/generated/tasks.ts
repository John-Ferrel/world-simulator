import type { TaskDefinition } from '../../domain.js';
import { compileGeneratedTasks, type GeneratedPack } from '../../generated.js';
import activist from './task-vienna-activist.json';
import bourgeoisYouth from './task-vienna-bourgeois-youth.json';
import dailyCulture from './task-vienna-daily-culture.json';
import familyCare from './task-vienna-family-care.json';
import medicalWork from './task-vienna-medical-work.json';
import poorApprentice from './task-vienna-poor-apprentice.json';
import specialCapability from './task-vienna-special-capability.json';
import writerResearcher from './task-vienna-writer-researcher.json';
import { VIENNA_EXTRA_TASKS } from '../vienna-task-extra.js';

const TASK_PACKS = [
  poorApprentice,
  bourgeoisYouth,
  medicalWork,
  activist,
  specialCapability,
  dailyCulture,
  familyCare,
  writerResearcher,
] as unknown as GeneratedPack[];

/**
 * Content-factory active tasks. These are compiled from the same validated
 * JSON grammar as events, but are selected by Agency utility rather than the
 * annual event-rate schedule. No task-specific switch exists in engine.ts.
 */
export const GENERATED_TASKS: TaskDefinition[] = [
  ...TASK_PACKS.flatMap((pack) => compileGeneratedTasks(pack)),
  ...VIENNA_EXTRA_TASKS,
];
