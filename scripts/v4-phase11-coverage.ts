import { mkdirSync, writeFileSync } from 'node:fs';
import { createV4Birth } from '../packages/v4/birth.js';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
import type { EventFact, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import {
  ALL_EVENT_SCENES,
  ALL_TASKS,
  GENERATED_TASKS,
  PHASE9_TASKS,
} from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const COMPOSITION = process.env.V4_COMPOSITION === '0' ? undefined : DEFAULT_COMPOSITION;
const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

function specialWorld(): WorldState {
  let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  const birth = createV4Birth(
    world,
    {
      name: 'Sofia Beobachterin',
      sex: 'female',
      health: 0.92,
      wish: '能看穿别人没有说出口的顾虑，并因此找到自己的道路。',
      lifeMode: 'legendary',
      appearance: { skin: 1, hair: 2, clothes: 3 },
    },
    'phase9-coverage-special',
    'phase9-coverage-owner',
  );
  world = birth.world;
  const person = world.persons[birth.childId]!;
  person.lifeContract = {
    ...(person.lifeContract ?? {
      originalWish: '能看穿别人没有说出口的顾虑。',
      mode: 'legendary',
      createdAt: { ...world.date },
    }),
    capability: 'social_insight',
    compiledAt: { ...world.date },
    interpretation: '实验夹具：模拟 Birth Contract 的 social_insight 能力。',
  };
  person.life ??= {
    mood: 0,
    reputation: 0,
    skills: { literacy: 0.2, numeracy: 0.2, craft: 0.2, social: 0.5 },
    flags: [],
  };
  return world;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)]!;
}

function aggregate(
  rows: { stage: string; occupation: string; goal: string; tasks: number; events: number }[],
) {
  const byStage = new Map<string, { tasks: number[]; events: number[] }>();
  const byOccupation = new Map<string, { tasks: number[]; events: number[] }>();
  const byGoal = new Map<string, { tasks: number[]; events: number[] }>();
  const push = (
    map: Map<string, { tasks: number[]; events: number[] }>,
    key: string,
    tasks: number,
    events: number,
  ) => {
    const entry = map.get(key) ?? { tasks: [], events: [] };
    entry.tasks.push(tasks);
    entry.events.push(events);
    map.set(key, entry);
  };
  for (const row of rows) {
    push(byStage, row.stage, row.tasks, row.events);
    push(byOccupation, row.occupation, row.tasks, row.events);
    push(byGoal, row.goal, row.tasks, row.events);
  }
  const pack = (map: Map<string, { tasks: number[]; events: number[] }>, limit = 12) =>
    [...map.entries()]
      .map(([key, value]) => ({
        key,
        persons: value.tasks.length,
        avgTasks: Number((value.tasks.reduce((a, b) => a + b, 0) / value.tasks.length).toFixed(2)),
        medianTasks: median(value.tasks),
        minTasks: Math.min(...value.tasks),
        maxTasks: Math.max(...value.tasks),
        avgEvents: Number(
          (value.events.reduce((a, b) => a + b, 0) / value.events.length).toFixed(2),
        ),
        medianEvents: median(value.events),
      }))
      .sort((a, b) => b.persons - a.persons || a.key.localeCompare(b.key))
      .slice(0, limit);
  return {
    byStage: pack(byStage, 8),
    byOccupation: pack(byOccupation, 16),
    byGoal: pack(byGoal, 12),
  };
}

let world = specialWorld();
const initialComposition = COMPOSITION?.compile(
  applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED)),
  { year: 1912, month: 1 },
);
const allEvents: EventFact[] = [];
for (let index = 0; index < 35; index += 1) {
  const result = advanceV4Year(world, SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    composition: COMPOSITION,
    maxOrdinaryEventsPerPerson: 4,
  });
  world = result.world;
  allEvents.push(...result.events);
}
const people = Object.values(world.persons)
  .filter((person) => !person.died)
  .sort((a, b) => a.id.localeCompare(b.id));
// Audit every living named person; an arbitrary prefix slice can hide a whole
// life stage (for example all children or all elders).
const sample = people;
const rows = sample.map((person) => {
  refreshAgencyGoal(world, person, world.date);
  const audit = auditCandidatePools(world, person.id, world.date, SCENES, ALL_TASKS, COMPOSITION);
  return {
    id: person.id,
    name: person.name,
    age: world.date.year - person.born.year,
    stage: audit?.stage ?? 'unknown',
    occupation: person.employment?.occupation ?? '无固定职业',
    goal: audit?.goal ?? 'none',
    tasks: audit?.taskCount ?? 0,
    events: audit?.eventCount ?? 0,
    taskDomains: audit ? [...new Set(audit.tasks.map((task) => task.domain))] : [],
    taskSample: audit?.tasks.slice(0, 4).map((task) => task.title) ?? [],
    eventSample: audit?.events.slice(0, 4).map((event) => event.title) ?? [],
  };
});
const TASK_IDS = new Set(ALL_TASKS.map((task) => task.id));
const TASK_KERNEL_IDS = new Set(
  KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').map((kernel) => kernel.id),
);
const isTaskAction = (action: string) =>
  TASK_IDS.has(action.split('/')[0]!) || TASK_KERNEL_IDS.has(action.split('/')[0]!.split('::')[0]!);
const taskEvents = allEvents.filter((event) => isTaskAction(event.action));
const triggeredTaskIds = new Set(taskEvents.map((event) => event.action.split('/')[0]!));
const triggeredTaskKernels = new Set(
  taskEvents.map((event) => event.action.split('/')[0]!.split('::')[0]!),
);
const report = {
  generatedAt: new Date().toISOString(),
  date: world.date,
  content: {
    taskDefinitions: ALL_TASKS.length,
    phase8Tasks: GENERATED_TASKS.length,
    phase9Tasks: PHASE9_TASKS.length,
    eventDefinitions: SCENES.length,
    generatedEventScenes: ALL_EVENT_SCENES.length,
    composedEvents: allEvents.filter((event) => event.action.includes('::')).length,
    composedScenes: initialComposition?.scenes.length ?? 0,
    composedTasks: initialComposition?.tasks.length ?? 0,
    allTaskDefinitions: ALL_TASKS.length + (initialComposition?.tasks.length ?? 0),
    allEventDefinitions: SCENES.length + (initialComposition?.scenes.length ?? 0),
  },
  run: {
    events: allEvents.length,
    taskEvents: taskEvents.length,
    uniqueTriggeredTasks: triggeredTaskIds.size,
    uniqueTriggeredTaskKernels: triggeredTaskKernels.size,
    untriggeredTasks: ALL_TASKS.filter((task) => !triggeredTaskIds.has(task.id)).map((task) => ({
      id: task.id,
      domain: task.task.domain,
      goals: task.task.goals,
    })),
    livingPersons: people.length,
    sampledPersons: sample.length,
  },
  coverage: {
    avgTasks: Number(
      (rows.reduce((sum, row) => sum + row.tasks, 0) / Math.max(1, rows.length)).toFixed(2),
    ),
    medianTasks: median(rows.map((row) => row.tasks)),
    minTasks: Math.min(...rows.map((row) => row.tasks)),
    maxTasks: Math.max(...rows.map((row) => row.tasks)),
    avgEvents: Number(
      (rows.reduce((sum, row) => sum + row.events, 0) / Math.max(1, rows.length)).toFixed(2),
    ),
    medianEvents: median(rows.map((row) => row.events)),
    lowCoverage: rows.filter((row) => row.tasks < 3 || row.events < 4).slice(0, 20),
    ...aggregate(rows),
  },
  samples: rows.slice(0, 40),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-11-coverage.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      content: report.content,
      run: {
        events: report.run.events,
        taskEvents: report.run.taskEvents,
        uniqueTriggeredTasks: report.run.uniqueTriggeredTasks,
        untriggered: report.run.untriggeredTasks.length,
        living: report.run.livingPersons,
      },
      coverage: {
        avgTasks: report.coverage.avgTasks,
        medianTasks: report.coverage.medianTasks,
        minTasks: report.coverage.minTasks,
        maxTasks: report.coverage.maxTasks,
        avgEvents: report.coverage.avgEvents,
        lowCoverage: report.coverage.lowCoverage.length,
      },
      stages: report.coverage.byStage,
      goals: report.coverage.byGoal,
    },
    null,
    2,
  ),
);
