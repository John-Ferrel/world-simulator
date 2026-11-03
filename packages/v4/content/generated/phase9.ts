import type { SceneDefinition, TaskDefinition } from '../../domain.js';
import {
  compileGeneratedPack,
  compileGeneratedTasks,
  type GeneratedPack,
} from '../../generated.js';
import pack0 from './p9-childhood-adolescence.json';
import pack1 from './p9-childhood-apprenticeship.json';
import pack2 from './p9-childhood-household.json';
import pack3 from './p9-childhood-school.json';
import pack4 from './p9-childhood-youth-aspiration.json';
import pack5 from './p9-gap-adult-ordinary-day.json';
import pack6 from './p9-gap-adult-solitude.json';
import pack7 from './p9-gap-adult-unemployed.json';
import pack8 from './p9-gap-childhood-chores.json';
import pack9 from './p9-gap-elder-solitude.json';
import pack10 from './p9-gap-elderhood-care.json';
import pack11 from './p9-gap-elderhood-daily.json';
import pack12 from './p9-history-cultural-contact.json';
import pack13 from './p9-history-medical-daily.json';
import pack14 from './p9-history-public-action.json';
import pack15 from './p9-history-union-political.json';
import pack16 from './p9-history-war-homefront.json';
import pack17 from './p9-social-courtship-friendship.json';
import pack18 from './p9-social-daily-culture.json';
import pack19 from './p9-social-family-conflict-care.json';
import pack20 from './p9-social-relationship-initiative.json';
import pack21 from './p9-social-tenement-neighbors.json';
import pack22 from './p9-work-career.json';
import pack23 from './p9-work-jobsearch.json';
import pack24 from './p9-work-printshop.json';
import pack25 from './p9-work-shop.json';
import pack26 from './p9-work-transport.json';

const PHASE9_PACKS = [
  pack0,
  pack1,
  pack2,
  pack3,
  pack4,
  pack5,
  pack6,
  pack7,
  pack8,
  pack9,
  pack10,
  pack11,
  pack12,
  pack13,
  pack14,
  pack15,
  pack16,
  pack17,
  pack18,
  pack19,
  pack20,
  pack21,
  pack22,
  pack23,
  pack24,
  pack25,
  pack26,
] as unknown as GeneratedPack[];

export const PHASE9_TASK_PACKS = PHASE9_PACKS.filter((pack) => pack.kind === 'task');
export const PHASE9_EVENT_PACKS = PHASE9_PACKS.filter((pack) => pack.kind !== 'task');

export const PHASE9_TASKS: TaskDefinition[] = PHASE9_TASK_PACKS.flatMap((pack) =>
  compileGeneratedTasks(pack),
);
export const PHASE9_EVENT_SCENES: SceneDefinition[] = PHASE9_EVENT_PACKS.flatMap((pack) =>
  compileGeneratedPack(pack),
);
