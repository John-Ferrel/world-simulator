import { mkdirSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { createV4Birth } from '../packages/v4/birth.js';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
import { buildLifePassages } from '../packages/v4/passages.js';
import type { EventFact, TaskDefinition, WorldDate, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import {
  ALL_EVENT_SCENES,
  ALL_TASKS,
  GENERATED_SCENES,
  GENERATED_TASKS,
  PHASE9_EVENT_SCENES,
  PHASE9_TASKS,
} from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';

const BASE_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
];
const P8 = { scenes: [...BASE_SCENES, ...GENERATED_SCENES], tasks: GENERATED_TASKS };
const P9 = { scenes: [...BASE_SCENES, ...ALL_EVENT_SCENES], tasks: ALL_TASKS };
const SEEDS = ['phase9-seed-a', 'phase9-seed-b', 'phase9-seed-c'];
const taskId = (action: string) => action.split('/')[0]!;
const P8_TASK_IDS = new Set(GENERATED_TASKS.map((task) => task.id));
const P9_TASK_IDS = new Set(ALL_TASKS.map((task) => task.id));

function setup(seed: string): { world: WorldState; specialId: string } {
  let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  world.seed = seed;
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
    `phase9-compare-special-${seed}`,
    `phase9-compare-owner-${seed}`,
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
  return { world, specialId: person.id };
}

function run(
  world: WorldState,
  scenes: WorldState extends never ? never : any,
  tasks: TaskDefinition[],
  years: number,
) {
  let current = world;
  const events: EventFact[] = [];
  const started = performance.now();
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, scenes, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: true,
      tasks,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return {
    world: current,
    events,
    runtimeMs: Number((performance.now() - started).toFixed(1)),
    heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
  };
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)]!;
}

function personPool(
  world: WorldState,
  personId: string,
  date: WorldDate,
  tasks: TaskDefinition[],
  scenes: any[],
) {
  const person = world.persons[personId];
  if (!person) return undefined;
  refreshAgencyGoal(world, person, date);
  return auditCandidatePools(world, personId, date, scenes, tasks);
}

function summarize(
  world: WorldState,
  events: EventFact[],
  scenes: any[],
  tasks: TaskDefinition[],
  samples: { id: string; date: WorldDate; label: string }[],
  taskIds: Set<string>,
) {
  const taskEvents = events.filter((event) => taskIds.has(taskId(event.action)));
  const actionPrefixes = events.reduce<Record<string, number>>((counts, event) => {
    const prefix = event.action.includes('/') ? event.action.split('/')[0]! : event.action;
    counts[prefix] = (counts[prefix] ?? 0) + 1;
    return counts;
  }, {});
  const perPerson = events.reduce<Record<string, number>>((counts, event) => {
    const prefix = event.action.includes('/') ? event.action.split('/')[0]! : event.action;
    const key = `${event.subjectId}|${prefix}`;
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
  const deaths = events.filter(
    (event) => event.action === 'statistical_death' || event.action === 'death',
  );
  const births = events.filter((event) => event.action === 'birth');
  const dead = Object.values(world.persons).filter((person) => person.died);
  const ages = dead.map((person) => person.died!.year - person.born.year).sort((a, b) => a - b);
  const contacts = Object.values(world.relations)
    .filter((relation) => relation.end === undefined)
    .filter((relation) => {
      const a = world.persons[relation.a];
      const b = world.persons[relation.b];
      return Boolean(a?.historicalIdentity || b?.historicalIdentity);
    });
  const processCount = Object.values(world.macro?.developments ?? {}).filter(
    (development) => development.historical,
  ).length;
  const legacy = Object.values(world.macro?.legacy ?? {}).map((entry) => entry.kind);
  const livingPersons = Object.values(world.persons).filter((person) => !person.died);
  const poolStarted = performance.now();
  const livingPools = livingPersons
    .map((person) => {
      refreshAgencyGoal(world, person, world.date);
      return auditCandidatePools(world, person.id, world.date, scenes, tasks);
    })
    .filter((pool): pool is NonNullable<typeof pool> => Boolean(pool));
  const poolAuditMs = Number((performance.now() - poolStarted).toFixed(1));
  const livingTaskCounts = livingPools.map((pool) => pool.taskCount);
  const livingEventCounts = livingPools.map((pool) => pool.eventCount);
  const avg = (values: number[]) =>
    values.length === 0
      ? 0
      : Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2));
  return {
    events: events.length,
    perYear: Number((events.length / 35).toFixed(2)),
    taskEvents: taskEvents.length,
    uniqueTasks: new Set(taskEvents.map((event) => taskId(event.action))).size,
    distinctActionPrefixes: Object.keys(actionPrefixes).length,
    maxAction: Object.entries(actionPrefixes).sort((a, b) => b[1] - a[1])[0],
    maxPersonAction: Object.entries(perPerson).sort((a, b) => b[1] - a[1])[0],
    persons: Object.keys(world.persons).length,
    alive: Object.values(world.persons).filter((person) => !person.died).length,
    births: births.length,
    deaths: deaths.length,
    medianAgeAtDeath: median(ages),
    historicalContacts: contacts.length,
    processes: processCount,
    legacyKinds: [...new Set(legacy)],
    livingTaskPoolAvg: avg(livingTaskCounts),
    livingTaskPoolMedian: median(livingTaskCounts),
    livingTaskPoolMin: livingTaskCounts.length ? Math.min(...livingTaskCounts) : 0,
    livingTaskPoolMax: livingTaskCounts.length ? Math.max(...livingTaskCounts) : 0,
    livingEventPoolAvg: avg(livingEventCounts),
    livingEventPoolMedian: median(livingEventCounts),
    livingEventPoolMin: livingEventCounts.length ? Math.min(...livingEventCounts) : 0,
    livingEventPoolMax: livingEventCounts.length ? Math.max(...livingEventCounts) : 0,
    livingWithZeroTasks: livingTaskCounts.filter((count) => count === 0).length,
    livingWithZeroEvents: livingEventCounts.filter((count) => count === 0).length,
    livingAudited: livingPools.length,
    poolAuditMs,
    poolAuditMsPerPerson: Number((poolAuditMs / Math.max(1, livingPools.length)).toFixed(3)),
    pools: samples.map((sample) => {
      const pool = personPool(world, sample.id, sample.date, tasks, scenes);
      return {
        label: sample.label,
        id: sample.id,
        age: world.persons[sample.id]
          ? sample.date.year - world.persons[sample.id]!.born.year
          : undefined,
        tasks: pool?.taskCount ?? 0,
        events: pool?.eventCount ?? 0,
        taskDomains: pool ? [...new Set(pool.tasks.map((task) => task.domain))] : [],
      };
    }),
  };
}

function lifeSnippet(
  world: WorldState,
  events: EventFact[],
  personId: string,
  taskIds: Set<string>,
) {
  const person = world.persons[personId];
  if (!person) return undefined;
  const personal = events.filter(
    (event) =>
      event.subjectId === personId ||
      event.participants.some((participant) => participant.personId === personId),
  );
  return {
    id: person.id,
    name: person.name,
    born: person.born,
    died: person.died,
    events: personal.length,
    tasks: personal.filter((event) => taskIds.has(taskId(event.action))).length,
    passages: buildLifePassages(personal, { maxPassages: 8 }),
    timeline: personal.slice(-16).map((event) => ({
      date: event.date,
      action: event.action,
      title: event.title,
      text: event.immediateText,
    })),
  };
}

const results: any[] = [];
for (const seed of SEEDS) {
  const p8 = setup(seed);
  const p9 = setup(seed);
  const p8Run = run(p8.world, P8.scenes, P8.tasks, 35);
  const p9Run = run(p9.world, P9.scenes, P9.tasks, 35);
  const samples = [
    { id: 'person-franz-lechner', date: { year: 1914, month: 1 }, label: 'poor apprentice' },
    { id: 'person-otto-winter', date: { year: 1914, month: 1 }, label: 'rich youth' },
    { id: 'person-emil-weiss', date: { year: 1914, month: 1 }, label: 'doctor' },
    { id: 'person-alois-lechner', date: { year: 1914, month: 1 }, label: 'activist' },
    { id: p9.specialId, date: { year: 1935, month: 1 }, label: 'special capability' },
  ];
  results.push({
    seed,
    phase8: {
      definitions: { tasks: P8.tasks.length, events: P8.scenes.length },
      runtimeMs: p8Run.runtimeMs,
      msPerYear: Number((p8Run.runtimeMs / 35).toFixed(1)),
      heapMB: p8Run.heapMB,
      ...summarize(p8Run.world, p8Run.events, P8.scenes, P8.tasks, samples, P8_TASK_IDS),
      lives: [
        lifeSnippet(p8Run.world, p8Run.events, 'person-franz-lechner', P8_TASK_IDS),
        lifeSnippet(p8Run.world, p8Run.events, 'person-emil-weiss', P8_TASK_IDS),
        lifeSnippet(p8Run.world, p8Run.events, p9.specialId, P8_TASK_IDS),
      ],
    },
    phase9: {
      definitions: { tasks: P9.tasks.length, events: P9.scenes.length },
      runtimeMs: p9Run.runtimeMs,
      msPerYear: Number((p9Run.runtimeMs / 35).toFixed(1)),
      heapMB: p9Run.heapMB,
      ...summarize(p9Run.world, p9Run.events, P9.scenes, P9.tasks, samples, P9_TASK_IDS),
      lives: [
        lifeSnippet(p9Run.world, p9Run.events, 'person-franz-lechner', P9_TASK_IDS),
        lifeSnippet(p9Run.world, p9Run.events, 'person-emil-weiss', P9_TASK_IDS),
        lifeSnippet(p9Run.world, p9Run.events, p9.specialId, P9_TASK_IDS),
      ],
    },
  });
}

const averages = (key: 'phase8' | 'phase9') => {
  const list = results.map((result) => result[key]) as any[];
  const avg = (field: string) =>
    Number((list.reduce((sum, entry) => sum + (entry[field] ?? 0), 0) / list.length).toFixed(2));
  return {
    events: avg('events'),
    perYear: avg('perYear'),
    taskEvents: avg('taskEvents'),
    uniqueTasks: avg('uniqueTasks'),
    distinctActionPrefixes: avg('distinctActionPrefixes'),
    persons: avg('persons'),
    alive: avg('alive'),
    births: avg('births'),
    deaths: avg('deaths'),
    medianAgeAtDeath: avg('medianAgeAtDeath'),
    historicalContacts: avg('historicalContacts'),
    runtimeMs: avg('runtimeMs'),
    msPerYear: avg('msPerYear'),
    heapMB: avg('heapMB'),
    poolAuditMs: avg('poolAuditMs'),
    poolAuditMsPerPerson: avg('poolAuditMsPerPerson'),
    livingTaskPoolAvg: avg('livingTaskPoolAvg'),
    livingTaskPoolMedian: avg('livingTaskPoolMedian'),
    livingEventPoolAvg: avg('livingEventPoolAvg'),
    livingEventPoolMedian: avg('livingEventPoolMedian'),
    livingWithZeroTasks: avg('livingWithZeroTasks'),
    livingWithZeroEvents: avg('livingWithZeroEvents'),
    livingAudited: avg('livingAudited'),
    avgTaskPool: Number(
      (
        list.reduce(
          (sum, entry) =>
            sum + entry.pools.reduce((inner: number, pool: any) => inner + pool.tasks, 0),
          0,
        ) /
        (list.length * 5)
      ).toFixed(2),
    ),
    avgEventPool: Number(
      (
        list.reduce(
          (sum, entry) =>
            sum + entry.pools.reduce((inner: number, pool: any) => inner + pool.events, 0),
          0,
        ) /
        (list.length * 5)
      ).toFixed(2),
    ),
  };
};

const report = {
  generatedAt: new Date().toISOString(),
  seeds: SEEDS,
  years: 35,
  content: {
    phase8Tasks: GENERATED_TASKS.length,
    phase8EventScenes: GENERATED_SCENES.length,
    phase9Tasks: PHASE9_TASKS.length,
    phase9EventScenes: PHASE9_EVENT_SCENES.length,
    allTasks: ALL_TASKS.length,
    allEventScenes: ALL_EVENT_SCENES.length,
  },
  averages: { phase8: averages('phase8'), phase9: averages('phase9') },
  results,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-9-compare.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ content: report.content, averages: report.averages }, null, 2));
