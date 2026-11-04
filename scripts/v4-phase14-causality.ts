/**
 * Phase 14 long-term causality audit.
 *
 * Reads committed facts only. A causal link exists when a later event carries
 * the earlier event id in `causes` (explicit follow-up) or in `historyRefs`
 * (a history condition matched that earlier fact). This is deliberately
 * narrower than "the same person appears twice": the link must be recorded by
 * the engine at commit time.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { ageAt, type EventFact, type Person, type WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const BASE_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

const years = Number(process.argv[2] ?? 70);
const seed = process.argv[3] ?? 'phase14-causality';
let world: WorldState = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
world.seed = seed;
const events: EventFact[] = [];
for (let index = 0; index < years; index += 1) {
  const result = advanceV4Year(world, BASE_SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    composition: DEFAULT_COMPOSITION,
    maxOrdinaryEventsPerPerson: 4,
    maxAgencyActorsPerYear: 96,
  });
  world = result.world;
  events.push(...result.events);
}

const byId = new Map(events.map((event) => [event.id, event]));
const month = (event: EventFact) => event.date.year * 12 + event.date.month;
const linked = events
  .map((event) => {
    const refs = [...new Set([...(event.causes ?? []), ...(event.historyRefs ?? [])])]
      .filter((id) => id !== event.id && byId.has(id))
      .map((id) => byId.get(id)!)
      .filter((cause) => month(cause) <= month(event));
    if (refs.length === 0) return undefined;
    return { event, causes: refs };
  })
  .filter((entry): entry is { event: EventFact; causes: EventFact[] } => Boolean(entry));

const personLives = new Map<string, EventFact[]>();
for (const event of events) {
  const list = personLives.get(event.subjectId) ?? [];
  list.push(event);
  personLives.set(event.subjectId, list);
}
for (const list of personLives.values()) list.sort((a, b) => month(a) - month(b));

const chains = linked.map(({ event, causes }) => {
  const root = causes[0]!;
  const samePerson = causes.filter((cause) => cause.subjectId === event.subjectId).length;
  const sharedParticipants = causes.filter((cause) =>
    cause.participants.some((participant) =>
      event.participants.some((other) => other.personId === participant.personId),
    ),
  ).length;
  return {
    personId: event.subjectId,
    personName: world.persons[event.subjectId]?.name ?? event.subjectId,
    root: {
      id: root.id,
      date: root.date,
      action: root.action,
      title: root.title ?? null,
      tags: root.tags ?? [],
      effects: root.effects.map((effect) => effect.type),
      significance: root.significance,
    },
    later: {
      id: event.id,
      date: event.date,
      action: event.action,
      title: event.title ?? null,
      tags: event.tags ?? [],
      effects: event.effects.map((effect) => effect.type),
      significance: event.significance,
    },
    gapYears: event.date.year - root.date.year,
    via: event.causes?.includes(root.id) ? 'cause' : 'history',
    samePerson,
    sharedParticipants,
    causeCount: causes.length,
  };
});

const longChains = chains.filter((chain) => chain.gapYears >= 3);
const multiStep = new Map<string, number>();
for (const chain of chains) {
  const key = `${chain.root.id}->${chain.later.id}`;
  multiStep.set(key, (multiStep.get(key) ?? 0) + 1);
}

const topPeople = [...personLives.entries()]
  .map(([personId, list]) => ({
    personId,
    name: world.persons[personId]?.name ?? personId,
    events: list.length,
    links: chains.filter((chain) => chain.personId === personId).length,
    longLinks: longChains.filter((chain) => chain.personId === personId).length,
    born: world.persons[personId]?.born,
    died: world.persons[personId]?.died ?? null,
  }))
  .sort((a, b) => b.longLinks - a.longLinks || b.links - a.links)
  .slice(0, 30);

const report = {
  generatedAt: new Date().toISOString(),
  seed,
  years,
  startDate: VIENNA_1912_SEED.date,
  endDate: world.date,
  persons: Object.keys(world.persons).length,
  alive: Object.values(world.persons).filter((person) => !person.died).length,
  events: events.length,
  eventsWithExplicitCause: events.filter((event) => (event.causes ?? []).length > 0).length,
  eventsWithHistoryRefs: events.filter((event) => (event.historyRefs ?? []).length > 0).length,
  linkedEvents: chains.length,
  longChains: longChains.length,
  distinctLongChainPeople: new Set(longChains.map((chain) => chain.personId)).size,
  topPeople,
  samples: [...longChains]
    .sort(
      (a, b) =>
        b.gapYears - a.gapYears ||
        b.sharedParticipants - a.sharedParticipants ||
        b.root.significance - a.root.significance,
    )
    .slice(0, 40),
  limitation:
    'Only committed EventFacts with explicit causes/historyRefs are counted. A history condition may honestly match an old fact without a follow-up queue. Same-person recurrence alone is not treated as causality.',
};

mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-14-causality.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      seed,
      years,
      events: report.events,
      linkedEvents: report.linkedEvents,
      longChains: report.longChains,
      distinctLongChainPeople: report.distinctLongChainPeople,
      eventsWithExplicitCause: report.eventsWithExplicitCause,
      eventsWithHistoryRefs: report.eventsWithHistoryRefs,
      topPeople: report.topPeople.slice(0, 10),
      samples: report.samples.slice(0, 8),
    },
    null,
    2,
  ),
);
