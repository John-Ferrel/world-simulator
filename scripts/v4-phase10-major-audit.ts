import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { buildLifePassages } from '../packages/v4/passages.js';
import type { EventEffect, EventFact, WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';

const SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];
const TASK_IDS = new Set(ALL_TASKS.map((task) => task.id));
const MAJOR_EFFECTS = new Set<EventEffect['type']>([
  'education',
  'employment',
  'unemployment',
  'relation_end',
  'household',
  'residence',
  'role',
  'organization_membership',
  'birth',
  'death',
  'estate',
  'move',
  'condition',
]);
const MAJOR_ACTIONS = new Set([
  'birth',
  'death',
  'statistical_death',
  'historical_participation',
  'historical_influence',
  'historical_process',
]);

function familyId(event: EventFact): string {
  return event.action.includes('/') ? event.action.split('/')[0]! : event.action;
}

function isMajor(event: EventFact): boolean {
  return (
    event.significance >= 0.7 ||
    MAJOR_ACTIONS.has(event.action) ||
    event.effects.some((effect) => MAJOR_EFFECTS.has(effect.type)) ||
    false
  );
}

function effectSummary(event: EventFact): string[] {
  return [...new Set(event.effects.map((effect) => effect.type))];
}

let world: WorldState = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const allEvents: EventFact[] = [];
const years = 45;
for (let year = 0; year < years; year += 1) {
  const result = advanceV4Year(world, SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    maxOrdinaryEventsPerPerson: 4,
  });
  world = result.world;
  allEvents.push(...result.events);
}

const major = allEvents.filter(isMajor);
const effectCounts: Record<string, number> = {};
const familyCounts: Record<string, number> = {};
const personMajorCounts: Record<string, number> = {};
for (const event of major) {
  for (const effect of event.effects) {
    effectCounts[effect.type] = (effectCounts[effect.type] ?? 0) + 1;
  }
  const family = familyId(event);
  familyCounts[family] = (familyCounts[family] ?? 0) + 1;
  personMajorCounts[event.subjectId] = (personMajorCounts[event.subjectId] ?? 0) + 1;
  for (const participant of event.participants) {
    personMajorCounts[participant.personId] = (personMajorCounts[participant.personId] ?? 0) + 1;
  }
}

const changedPersons = Object.keys(personMajorCounts);
const topPersons = changedPersons
  .map((id) => ({
    id,
    name: world.persons[id]?.name ?? id,
    events: personMajorCounts[id] ?? 0,
  }))
  .sort((a, b) => b.events - a.events || a.id.localeCompare(b.id))
  .slice(0, 12);

const samples = major
  .slice()
  .sort((a, b) => b.significance - a.significance || b.date.year - a.date.year)
  .slice(0, 40)
  .map((event) => ({
    id: event.id,
    date: event.date,
    action: event.action,
    title: event.title,
    subject: world.persons[event.subjectId]?.name,
    text: event.immediateText,
    significance: event.significance,
    effects: effectSummary(event),
    participants: event.participants.map((participant) => ({
      id: participant.personId,
      name: world.persons[participant.personId]?.name ?? '无名',
      role: participant.role,
    })),
  }));

const lives = topPersons.slice(0, 5).map((entry) => {
  const personal = allEvents.filter(
    (event) =>
      event.subjectId === entry.id ||
      event.participants.some((participant) => participant.personId === entry.id),
  );
  return {
    ...entry,
    age: world.persons[entry.id]
      ? (world.persons[entry.id]!.died?.year ?? world.date.year) -
        world.persons[entry.id]!.born.year
      : undefined,
    occupation: world.persons[entry.id]?.employment?.occupation,
    majorEvents: personal.filter(isMajor).length,
    passages: buildLifePassages(personal, { maxPassages: 10 }),
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  years,
  date: world.date,
  content: {
    tasks: ALL_TASKS.length,
    eventDefinitions: SCENES.length,
    generatedEvents: ALL_EVENT_SCENES.length,
  },
  totals: {
    events: allEvents.length,
    majorEvents: major.length,
    majorShare: Number((major.length / Math.max(1, allEvents.length)).toFixed(3)),
    changedPersons: changedPersons.length,
    living: Object.values(world.persons).filter((person) => !person.died).length,
  },
  effects: Object.fromEntries(
    Object.entries(effectCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  ),
  families: Object.fromEntries(
    Object.entries(familyCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 250),
  ),
  topPersons,
  phase10Families: Object.fromEntries(
    Object.entries(familyCounts)
      .filter(([id]) => id.startsWith('major-') || id.startsWith('p10-'))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  ),
  samples,
  lives,
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-10-major-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      content: report.content,
      totals: report.totals,
      effects: report.effects,
      topFamilies: Object.entries(report.families).slice(0, 12),
      topPersons: topPersons.slice(0, 8),
    },
    null,
    2,
  ),
);
