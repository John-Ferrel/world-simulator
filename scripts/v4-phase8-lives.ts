import { mkdirSync, writeFileSync } from 'node:fs';
import { createV4Birth } from '../packages/v4/birth.js';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
import { buildLifePassages } from '../packages/v4/passages.js';
import type { EventFact, WorldDate, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES, GENERATED_TASKS } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';

const TASK_DOMAIN_BY_ID = new Map(GENERATED_TASKS.map((task) => [task.id, task.task.domain]));

const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];

function setup(): { world: WorldState; specialId: string } {
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
    'phase8-lives-special-birth',
    'phase8-lives-special-owner',
  );
  world = birth.world;
  const special = world.persons[birth.childId]!;
  special.lifeContract = {
    ...(special.lifeContract ?? {
      originalWish: '能看穿别人没有说出口的顾虑。',
      mode: 'legendary',
      createdAt: { ...world.date },
    }),
    capability: 'social_insight',
    interpretation: '实验夹具：模拟 Birth Contract 编译后的 social_insight 能力。',
    compiledAt: { ...world.date },
  };
  special.life ??= {
    mood: 0,
    reputation: 0,
    skills: { literacy: 0.2, numeracy: 0.2, craft: 0.2, social: 0.5 },
    flags: [],
  };
  if (!special.life.flags.includes('capability:social_insight'))
    special.life.flags.push('capability:social_insight');
  return { world, specialId: special.id };
}

type Run = { world: WorldState; events: EventFact[]; years: number };

function run(world: WorldState, years: number, tasks = true): Run {
  let current = world;
  const events: EventFact[] = [];
  for (let index = 0; index < years; index += 1) {
    const result = advanceV4Year(current, SCENES, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: true,
      ...(tasks ? { tasks: GENERATED_TASKS } : {}),
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events, years };
}

function summary(world: WorldState, event: EventFact) {
  const person = world.persons[event.subjectId];
  return {
    id: event.id,
    date: event.date,
    action: event.action,
    title: event.title,
    subject: person?.name ?? event.subjectId,
    text: event.immediateText,
    causes: event.causes,
    effects: event.effects.map((effect) => effect.type),
    participants: event.participants.map((participant) => ({
      id: participant.personId,
      name: world.persons[participant.personId]?.name ?? '无名',
      role: participant.role,
    })),
  };
}

function personTimeline(world: WorldState, events: EventFact[], personId: string) {
  const person = world.persons[personId];
  if (!person) return undefined;
  const personal = events.filter(
    (event) =>
      event.subjectId === personId ||
      event.participants.some((participant) => participant.personId === personId),
  );
  const taskEvents = personal.filter((event) => event.action.startsWith('task-'));
  const agencyEvents = personal.filter((event) => event.action.startsWith('agency:'));
  const historicalContacts = person.relationshipIds
    .map((id) => world.relations[id])
    .filter((relation): relation is NonNullable<typeof relation> => Boolean(relation))
    .map((relation) => {
      const otherId = relation.a === personId ? relation.b : relation.a;
      const other = world.persons[otherId];
      return other?.historicalIdentity
        ? {
            id: other.id,
            name: other.name,
            kind: relation.kind,
            trust: relation.trust,
            historicalId: other.historicalIdentity.id,
          }
        : undefined;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .filter((entry, index, all) => all.findIndex((other) => other.id === entry.id) === index);
  return {
    id: person.id,
    name: person.name,
    born: person.born,
    died: person.died,
    deathCause: person.deathCause,
    occupation: person.employment?.occupation,
    roles: person.roles,
    agency: person.agency,
    organizationMemberships: Object.values(world.organizations)
      .filter((organization) => organization.memberIds.includes(person.id))
      .map((organization) => ({
        id: organization.id,
        name: organization.name,
        kind: organization.kind,
      })),
    historicalContacts,
    eventCount: personal.length,
    taskEvents: taskEvents.length,
    agencyEvents: agencyEvents.length,
    taskIds: [...new Set(taskEvents.map((event) => event.action.split('/')[0]!))],
    taskDomains: [
      ...new Set(
        taskEvents
          .map((event) => TASK_DOMAIN_BY_ID.get(event.action.split('/')[0]!) ?? 'unknown')
          .filter((domain) => domain !== 'unknown'),
      ),
    ],
    uniqueTasks: new Set(taskEvents.map((event) => event.action.split('/')[0]!)).size,
    passages: buildLifePassages(personal, { maxPassages: 10 }),
    timeline: [
      ...new Map(
        [...personal.slice(0, 14), ...personal.slice(-30)].map((event) => [event.id, event]),
      ).values(),
    ].map((event) => summary(world, event)),
  };
}

function pool(world: WorldState, personId: string, date: WorldDate) {
  const person = world.persons[personId];
  if (!person) return undefined;
  refreshAgencyGoal(world, person, date);
  return auditCandidatePools(world, personId, date, SCENES, GENERATED_TASKS);
}

const treatment = setup();
const control = setup();
const treatmentRun = run(treatment.world, 45, true);
const controlRun = run(control.world, 45, false);
const focal = [
  { key: 'poor-apprentice', id: 'person-franz-lechner', date: { year: 1914, month: 1 } },
  { key: 'rich-youth', id: 'person-otto-winter', date: { year: 1914, month: 1 } },
  { key: 'doctor', id: 'person-emil-weiss', date: { year: 1914, month: 1 } },
  { key: 'activist', id: 'person-alois-lechner', date: { year: 1914, month: 1 } },
  { key: 'special-capability', id: treatment.specialId, date: { year: 1935, month: 1 } },
];

const lives = focal.map((entry) => {
  const timeline = personTimeline(treatmentRun.world, treatmentRun.events, entry.id);
  return {
    key: entry.key,
    poolAt: pool(treatmentRun.world, entry.id, entry.date),
    ...timeline,
  };
});

const allTaskEvents = treatmentRun.events.filter((event) => event.action.startsWith('task-'));
const allAgencyEvents = treatmentRun.events.filter((event) => event.action.startsWith('agency:'));
const taskCounts = allTaskEvents.reduce<Record<string, number>>((counts, event) => {
  const id = event.action.split('/')[0]!;
  counts[id] = (counts[id] ?? 0) + 1;
  return counts;
}, {});
const taskDomains = allTaskEvents.reduce<Record<string, number>>((counts, event) => {
  const task = GENERATED_TASKS.find((candidate) => event.action.startsWith(`${candidate.id}/`));
  const domain = task?.task.domain ?? 'unknown';
  counts[domain] = (counts[domain] ?? 0) + 1;
  return counts;
}, {});
const actionPrefixes = treatmentRun.events.reduce<Record<string, number>>((counts, event) => {
  const prefix = event.action.includes('/') ? event.action.split('/')[0]! : event.action;
  counts[prefix] = (counts[prefix] ?? 0) + 1;
  return counts;
}, {});
const maxRepeat = Object.entries(actionPrefixes).sort((a, b) => b[1] - a[1])[0];
const perPersonPrefixes = treatmentRun.events.reduce<Record<string, number>>((counts, event) => {
  const prefix = event.action.includes('/') ? event.action.split('/')[0]! : event.action;
  const key = `${event.subjectId}|${prefix}`;
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
const maxPersonRepeat = Object.entries(perPersonPrefixes).sort((a, b) => b[1] - a[1])[0];

const report = {
  generatedAt: new Date().toISOString(),
  years: 45,
  date: treatmentRun.world.date,
  taskDefinitions: GENERATED_TASKS.length,
  eventDefinitions: SCENES.length,
  treatment: {
    events: treatmentRun.events.length,
    taskEvents: allTaskEvents.length,
    agencyEvents: allAgencyEvents.length,
    uniqueTasks: Object.keys(taskCounts).length,
    untriggeredTasks: GENERATED_TASKS.filter((task) => !taskCounts[task.id]).map((task) => ({
      id: task.id,
      domain: task.task.domain,
      goals: task.task.goals,
    })),
    taskCounts,
    taskDomains,
    maxRepeatedAction: maxRepeat,
    maxPersonRepeatedAction: maxPersonRepeat,
    processes: Object.values(treatmentRun.world.macro?.developments ?? {}).filter(
      (development) => development.historical,
    ).length,
    legacies: Object.values(treatmentRun.world.macro?.legacy ?? {}).map((legacy) => ({
      kind: legacy.kind,
      title: legacy.title,
      processId: legacy.processId,
    })),
  },
  control: {
    events: controlRun.events.length,
    taskEvents: 0,
    agencyEvents: controlRun.events.filter((event) => event.action.startsWith('agency:')).length,
    uniqueTasks: 0,
    processes: Object.values(controlRun.world.macro?.developments ?? {}).filter(
      (development) => development.historical,
    ).length,
  },
  lives,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-8-lives.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      date: report.date,
      treatment: {
        events: report.treatment.events,
        taskEvents: report.treatment.taskEvents,
        agencyEvents: report.treatment.agencyEvents,
        uniqueTasks: report.treatment.uniqueTasks,
        taskDomains: report.treatment.taskDomains,
        maxRepeatedAction: report.treatment.maxRepeatedAction,
        maxPersonRepeatedAction: report.treatment.maxPersonRepeatedAction,
        legacy: report.treatment.legacies.map((legacy) => legacy.kind),
      },
      control: report.control,
      lives: lives.map((life) => ({
        key: life.key,
        name: life.name,
        age: life.born ? (life.died?.year ?? report.date.year) - life.born.year : null,
        goal: life.agency?.goal,
        events: life.eventCount,
        taskEvents: life.taskEvents,
        agencyEvents: life.agencyEvents,
        uniqueTasks: life.taskIds?.length ?? 0,
        domains: life.taskDomains,
        contacts: (life.historicalContacts ?? []).map((contact) => contact.name),
      })),
    },
    null,
    2,
  ),
);
