/**
 * Long-life headless playtest and anomaly audit for the v4 shared world.
 *
 * This is deliberately read-only with respect to the simulation: it owns no
 * world rules. It starts from the default Vienna seed, adds eight player-born
 * focal children, advances the real engine year by year, then audits the
 * committed facts and stored person/household records.
 *
 * Run with:
 *   pnpm tsx scripts/v4-playtest.ts
 *
 * The report is written to docs/v4/playtest.json. `runV4Playtest` is exported
 * so tests can run a shorter, fixed-seed version of the same audit.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ageAt, type EventFact, type Person, type WorldState } from '../packages/v4/domain.js';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { defaultMacroState, syncMacroPressures } from '../packages/v4/macro.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';

export type PlaytestOptions = {
  /** Hard horizon in simulated years from 1912. Defaults to 88 (1912–2000). */
  years?: number;
  /** Number of player-born focal children. Defaults to 8. */
  focalCount?: number;
  /** Soft cap passed to the real event runtime. Defaults to 4. */
  maxOrdinaryEventsPerPerson?: number;
  /** Focal scene cap per person-year. Defaults to the engine default (1). */
  maxScenesPerPerson?: number;
  /** Whether household economy months run. Defaults to true. */
  economy?: boolean;
};

type FocalSeed = {
  name: string;
  sex: 'female' | 'male';
  health: number;
  wish: string;
};

const FOCAL_SEEDS: FocalSeed[] = [
  {
    name: 'Lena',
    sex: 'female',
    health: 0.9,
    wish: '识字，能在印刷厂找到不用把手指送进机器的活。',
  },
  {
    name: 'Matthias',
    sex: 'male',
    health: 0.86,
    wish: '学徒出师，有一间自己的小作坊。',
  },
  {
    name: 'Rosa',
    sex: 'female',
    health: 0.94,
    wish: '把弟弟妹妹养大，家里不再欠房租。',
  },
  {
    name: 'Emil',
    sex: 'male',
    health: 0.88,
    wish: '活着看到战后的维也纳重新有面包和煤。',
  },
  {
    name: 'Hedwig',
    sex: 'female',
    health: 0.92,
    wish: '读完书，做一个能自己拿主意的女人。',
  },
  {
    name: 'Anton',
    sex: 'male',
    health: 0.85,
    wish: '在工会里替工友说话，不让自己人白白死掉。',
  },
  {
    name: 'Mitzi',
    sex: 'female',
    health: 0.95,
    wish: '有一张自己的床，不用再和三个孩子挤一间屋。',
  },
  {
    name: 'Franz',
    sex: 'male',
    health: 0.89,
    wish: '学会一门手艺，老了还能自己挣饭吃。',
  },
];

const TEXT_NONE = /\bNone\b/;
const TEXT_UNDEFINED = /\bundefined\b/;
const TEXT_BRACES = /[{}]/;
const WORK_ACTION = /work|employ|apprent|factory|print|wage|job|school|factory/i;

/**
 * The exact content arrays loaded by this audit. The postwar pack was added by
 * the main agent after its owner landed content/vienna-postwar.ts.
 */
export function playtestScenes() {
  return [
    ...VIENNA_1912_SCENES,
    ...VIENNA_LIFE_SCENES,
    ...VIENNA_POSTWAR_SCENES,
    ...VIENNA_DEVELOPMENT_SCENES,
    ...VIENNA_FAMILY_RUNTIME_SCENES,
    ...GENERATED_SCENES,
  ];
}

function eventText(event: EventFact): string {
  return event.title ? `${event.immediateText}\n${event.title}` : event.immediateText;
}

function personalEvents(events: EventFact[], personId: string): EventFact[] {
  return events.filter(
    (event) =>
      event.subjectId === personId ||
      event.participants.some((participant) => participant.personId === personId),
  );
}

function sortedByDate(events: EventFact[]): EventFact[] {
  return [...events].sort((a, b) => {
    const monthA = a.date.year * 12 + a.date.month;
    const monthB = b.date.year * 12 + b.date.month;
    return monthA - monthB || a.id.localeCompare(b.id);
  });
}

function prefixOf(event: EventFact): string {
  return event.action.split('/')[0] ?? event.action;
}

function countValues(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function topCounts(counts: Map<string, number>, limit: number) {
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

/** Deterministic even sample that always keeps the first and last event. */
function sampleEvents(events: EventFact[], max: number): EventFact[] {
  if (events.length <= max) return events;
  const sampled: EventFact[] = [];
  for (let index = 0; index < max; index += 1) {
    const sourceIndex = Math.round((index * (events.length - 1)) / Math.max(1, max - 1));
    const event = events[sourceIndex];
    if (event && !sampled.includes(event)) sampled.push(event);
  }
  return sampled;
}

function textAudit(events: EventFact[]) {
  const braces = events.filter((event) => TEXT_BRACES.test(eventText(event)));
  const none = events.filter((event) => TEXT_NONE.test(eventText(event)));
  const undef = events.filter((event) => TEXT_UNDEFINED.test(eventText(event)));
  const emptyParticipants = events.filter((event) => event.participants.length === 0);
  return {
    unresolvedTemplateTokenEvents: braces.length,
    unresolvedTemplateTokenSamples: braces.slice(0, 10).map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
    literalNoneEvents: none.length,
    literalNoneSamples: none.slice(0, 10).map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
    literalUndefinedEvents: undef.length,
    literalUndefinedSamples: undef.slice(0, 10).map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
    emptyParticipantEvents: emptyParticipants.length,
    emptyParticipantSamples: emptyParticipants.slice(0, 10).map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
  };
}

function personPrefixCounts(
  events: EventFact[],
  personId: string,
): { prefixes: Map<string, number>; actions: Map<string, number>; personal: EventFact[] } {
  const personal = personalEvents(events, personId);
  return {
    prefixes: countValues(personal.map(prefixOf)),
    actions: countValues(personal.map((event) => event.action)),
    personal,
  };
}

function focalLifeReport(
  world: WorldState,
  events: EventFact[],
  personId: string,
  sceneByFamilyAction: Map<string, string>,
) {
  const person = world.persons[personId];
  const { prefixes, actions, personal } = personPrefixCounts(events, personId);
  const dated = sortedByDate(personal);
  const years = [...new Set(dated.map((event) => event.date.year))].sort((a, b) => a - b);
  let largestGap = 0;
  for (let index = 1; index < years.length; index += 1) {
    largestGap = Math.max(largestGap, years[index]! - years[index - 1]!);
  }
  const flagged = dated.filter(
    (event) =>
      TEXT_BRACES.test(eventText(event)) ||
      TEXT_NONE.test(eventText(event)) ||
      TEXT_UNDEFINED.test(eventText(event)) ||
      event.participants.length === 0,
  );
  const deathEvent = dated.find((event) =>
    event.effects.some((effect) => effect.type === 'death' && effect.personId === personId),
  );
  const died = person?.died;
  const afterDeath = (event: EventFact) =>
    Boolean(died && event.date.year * 12 + event.date.month > died.year * 12 + died.month);
  const postDeathEvents = dated.filter(afterDeath);
  const topPrefix = topCounts(prefixes, 8)[0];
  const topAction = topCounts(actions, 8)[0];
  return {
    id: personId,
    name: person?.name ?? null,
    sex: person?.sex ?? null,
    born: person?.born ?? null,
    died: person?.died ?? null,
    deathCause: person?.deathCause ?? null,
    deathEventId: deathEvent?.id ?? null,
    deathEventDate: deathEvent?.date ?? null,
    deathEventAction: deathEvent?.action ?? null,
    alive: Boolean(person && !person.died),
    age: person ? ageAt(person, person.died ?? world.date) : null,
    events: dated.length,
    yearsWithEvents: years.length,
    eventYears: years,
    largestGapBetweenEventYears: largestGap,
    firstEventYear: dated[0]?.date.year ?? null,
    lastEventYear: dated.at(-1)?.date.year ?? null,
    eventsAfterRecordedDeath: postDeathEvents.length,
    eventsAfterRecordedDeathSamples: postDeathEvents.slice(0, 8).map((event) => ({
      eventId: event.id,
      year: event.date.year,
      month: event.date.month,
      action: event.action,
      text: event.immediateText,
    })),
    eventsBeforeRecordedBirth: dated.filter(
      (event) =>
        Boolean(person) &&
        event.date.year * 12 + event.date.month < person!.born.year * 12 + person!.born.month,
    ).length,
    topActionPrefixes: topCounts(prefixes, 8),
    topActions: topCounts(actions, 8),
    maxScenePrefixRepeat: topPrefix?.count ?? 0,
    maxScenePrefix: topPrefix?.key ?? null,
    maxActionRepeat: topAction?.count ?? 0,
    maxAction: topAction?.key ?? null,
    textAnomalies: {
      anyTextAnomaly: flagged.length > 0,
      flaggedEvents: flagged.length,
      braces: flagged.filter((event) => TEXT_BRACES.test(eventText(event))).length,
      literalNone: flagged.filter((event) => TEXT_NONE.test(eventText(event))).length,
      literalUndefined: flagged.filter((event) => TEXT_UNDEFINED.test(eventText(event))).length,
      emptyParticipants: flagged.filter((event) => event.participants.length === 0).length,
      samples: flagged.slice(0, 8).map((event) => ({
        year: event.date.year,
        action: event.action,
        text: event.immediateText,
      })),
    },
    // Kept for readers who want to know which scene family dominated a life.
    sceneFamilies: [...prefixes.entries()]
      .map(([key, count]) => ({ key, count, sceneFamily: sceneByFamilyAction.get(key) ?? null }))
      .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
      .slice(0, 8),
  };
}

function buildExcerpt(
  world: WorldState,
  events: EventFact[],
  personId: string,
  kind: 'short_lived_child' | 'long_lived_adult' | 'working_adult',
  selectionBasis: string,
) {
  const person = world.persons[personId];
  const personal = sortedByDate(personalEvents(events, personId));
  const died = person?.died;
  const afterDeath = (event: EventFact) =>
    Boolean(died && event.date.year * 12 + event.date.month > died.year * 12 + died.month);
  const beforeBirth = (event: EventFact) =>
    Boolean(
      person && event.date.year * 12 + event.date.month < person.born.year * 12 + person.born.month,
    );
  // A life excerpt must not present facts dated after the recorded death as if
  // they belonged to the life. The impossible facts are reported globally in
  // anomalies.eventsAfterSubjectDeath instead.
  const duringLife = personal.filter((event) => !afterDeath(event));
  const sampled = sampleEvents(duringLife, 15);
  return {
    kind,
    selectionBasis,
    personId,
    name: person?.name ?? null,
    born: person?.born ?? null,
    died: person?.died ?? null,
    deathCause: person?.deathCause ?? null,
    age: person ? ageAt(person, person.died ?? world.date) : null,
    totalEvents: personal.length,
    eventsBeforeRecordedDeath: duringLife.length,
    excludedPostDeathEvents: personal.length - duringLife.length,
    excerptEventCount: sampled.length,
    truncated: sampled.length < duringLife.length,
    events: sampled.map((event) => ({
      eventId: event.id,
      date: event.date,
      action: event.action,
      title: event.title ?? null,
      text: event.immediateText,
      participants: event.participants.map((participant) => participant.personId),
      afterRecordedDeath: afterDeath(event),
      beforeRecordedBirth: beforeBirth(event),
    })),
  };
}

export function runV4Playtest(options: PlaytestOptions = {}) {
  const years = Math.max(1, Math.floor(options.years ?? 88));
  const focalCount = Math.max(1, Math.min(FOCAL_SEEDS.length, Math.floor(options.focalCount ?? 8)));
  const maxOrdinaryEventsPerPerson = Math.max(
    0,
    Math.min(20, Math.floor(options.maxOrdinaryEventsPerPerson ?? 4)),
  );
  const maxScenesPerPerson = options.maxScenesPerPerson;
  const economyEnabled = options.economy !== false;
  const startedAt = Date.now();

  let world = structuredClone(VIENNA_1912_SEED);
  world.macro = defaultMacroState(world);
  syncMacroPressures(world, world.macro);
  const scenes = playtestScenes();
  const sceneByFamilyAction = new Map<string, string>();
  for (const scene of scenes) {
    sceneByFamilyAction.set(scene.id, scene.familyId ?? scene.packId);
  }

  const focalIds: string[] = [];
  const birthEvents: EventFact[] = [];
  for (let index = 0; index < focalCount; index += 1) {
    const seed = FOCAL_SEEDS[index]!;
    const birth = createV4Birth(
      world,
      {
        name: seed.name,
        sex: seed.sex,
        health: seed.health,
        wish: seed.wish,
        lifeMode: 'ordinary',
        appearance: {
          skin: (index % 4) + 1,
          hair: index % 3,
          clothes: (index + 1) % 3,
          doll: { bodyType: seed.sex },
        },
      },
      `playtest-focal-${String(index + 1).padStart(2, '0')}`,
      'playtest-owner',
    );
    world = birth.world;
    focalIds.push(birth.childId);
    birthEvents.push(birth.event);
  }

  const runEvents: EventFact[] = [];
  const yearly: { year: number; events: number; deaths: number; persons: number; alive: number }[] =
    [];
  const warnings = new Map<string, number>();
  let stopReason: 'horizon' | 'world_not_running' = 'horizon';
  let yearsRun = 0;
  let allFocalDeadAtYear: number | null = null;
  let maxLivingDuringRun = 0;
  let maxLivingDuringRunYear: number | null = null;
  let maxLivingDuringRunHousehold: string | null = null;
  let overfullLivingHouseholdObservations = 0;
  const overfullLivingHouseholdIds = new Set<string>();
  const overfullLivingHouseholdSamples: {
    year: number;
    householdId: string;
    living: number;
    recordedMemberIds: number;
  }[] = [];
  for (let index = 0; index < years; index += 1) {
    if (world.status !== 'running') {
      stopReason = 'world_not_running';
      break;
    }
    const result = advanceV4Year(world, scenes, {
      economy: { enabled: economyEnabled },
      eventRuntime: true,
      maxOrdinaryEventsPerPerson,
      ...(maxScenesPerPerson === undefined ? {} : { maxScenesPerPerson }),
    });
    world = result.world;
    runEvents.push(...result.events);
    yearsRun += 1;
    for (const warning of result.diagnostics.warnings) {
      warnings.set(warning.code, (warnings.get(warning.code) ?? 0) + 1);
    }
    const alive = Object.values(world.persons).filter((person) => !person.died).length;
    for (const household of Object.values(world.households)) {
      const living = household.memberIds.reduce((count, personId) => {
        const person = world.persons[personId];
        return count + (person && !person.died ? 1 : 0);
      }, 0);
      if (living > maxLivingDuringRun) {
        maxLivingDuringRun = living;
        maxLivingDuringRunYear = world.date.year;
        maxLivingDuringRunHousehold = household.id;
      }
      if (living > 12) {
        overfullLivingHouseholdObservations += 1;
        overfullLivingHouseholdIds.add(household.id);
        if (overfullLivingHouseholdSamples.length < 20) {
          overfullLivingHouseholdSamples.push({
            year: world.date.year,
            householdId: household.id,
            living,
            recordedMemberIds: household.memberIds.length,
          });
        }
      }
    }
    yearly.push({
      year: result.diagnostics.to.year,
      events: result.events.length,
      deaths: result.diagnostics.deaths.length,
      persons: Object.keys(world.persons).length,
      alive,
    });
    if (focalIds.every((id) => world.persons[id]?.died)) {
      allFocalDeadAtYear ??= world.date.year;
    }
  }

  const persons = Object.values(world.persons);
  const alivePersons = persons.filter((person) => !person.died);
  const allEvents = world.events;
  const birthEventCount = allEvents.filter((event) => event.action === 'birth').length;
  const deathEvents = allEvents.filter((event) =>
    event.effects.some((effect) => effect.type === 'death'),
  );
  const statisticalDeaths = allEvents.filter((event) =>
    event.action.startsWith('statistical_death/'),
  ).length;
  const macroBirths = world.macro
    ? Object.values(world.macro.population).reduce((sum, population) => sum + population.births, 0)
    : null;
  const macroDeaths = world.macro
    ? Object.values(world.macro.population).reduce((sum, population) => sum + population.deaths, 0)
    : null;

  const householdStats = Object.values(world.households)
    .map((household) => {
      const members = household.memberIds
        .map((personId) => world.persons[personId])
        .filter((person): person is Person => Boolean(person));
      const living = members.filter((person) => !person.died).length;
      const place = world.places[household.residenceId];
      return {
        householdId: household.id,
        residenceId: household.residenceId,
        residence: place?.name ?? null,
        capacity: place?.capacity ?? null,
        living,
        recordedMemberIds: household.memberIds.length,
        historicalOrDeadMemberIds: household.memberIds.length - living,
        deadMemberIds: members.filter((person) => person.died).length,
      };
    })
    .sort(
      (a, b) =>
        b.living - a.living ||
        b.recordedMemberIds - a.recordedMemberIds ||
        a.householdId.localeCompare(b.householdId),
    );
  const maxLivingHousehold = householdStats[0];
  const overfullLivingHouseholds = householdStats.filter((household) => household.living > 12);
  const peakHousehold =
    maxLivingDuringRunHousehold === null
      ? undefined
      : world.households[maxLivingDuringRunHousehold];
  const peakResidence = peakHousehold ? world.places[peakHousehold.residenceId] : undefined;

  const prefixCountsByPerson = new Map<string, Map<string, number>>();
  for (const event of allEvents) {
    const ids = new Set([
      event.subjectId,
      ...event.participants.map((participant) => participant.personId),
    ]);
    for (const personId of ids) {
      const counts = prefixCountsByPerson.get(personId) ?? new Map<string, number>();
      const prefix = prefixOf(event);
      counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
      prefixCountsByPerson.set(personId, counts);
    }
  }
  const prefixOffenders = [...prefixCountsByPerson.entries()]
    .flatMap(([personId, counts]) =>
      [...counts.entries()]
        .filter(([, count]) => count > 12)
        .map(([prefix, count]) => ({
          personId,
          name: world.persons[personId]?.name ?? personId,
          prefix,
          count,
        })),
    )
    .sort(
      (a, b) =>
        b.count - a.count ||
        a.personId.localeCompare(b.personId) ||
        a.prefix.localeCompare(b.prefix),
    );

  const text = textAudit(allEvents);
  const deadMissingCause = persons.filter(
    (person) => person.died && (!person.deathCause || person.deathCause.trim().length === 0),
  );
  const diedYearBeforeBorn = persons.filter(
    (person) => person.died && person.died.year < person.born.year,
  );
  const diedDateBeforeBorn = persons.filter(
    (person) =>
      person.died &&
      person.died.year * 12 + person.died.month < person.born.year * 12 + person.born.month,
  );
  const eventsAfterSubjectDeath = allEvents.filter((event) => {
    const person = world.persons[event.subjectId];
    return Boolean(
      person?.died &&
      event.date.year * 12 + event.date.month > person.died.year * 12 + person.died.month,
    );
  });
  const eventsBeforeSubjectBirth = allEvents.filter((event) => {
    const person = world.persons[event.subjectId];
    return Boolean(
      person && event.date.year * 12 + event.date.month < person.born.year * 12 + person.born.month,
    );
  });

  const focalLives = focalIds.map((personId) =>
    focalLifeReport(world, allEvents, personId, sceneByFamilyAction),
  );
  const focalZero = focalLives.filter((life) => life.events === 0);

  const decades = new Map<number, { events: number; years: Set<number> }>();
  for (const event of allEvents) {
    const decade = Math.floor(event.date.year / 10) * 10;
    const entry = decades.get(decade) ?? { events: 0, years: new Set<number>() };
    entry.events += 1;
    entry.years.add(event.date.year);
    decades.set(decade, entry);
  }
  const perDecade = [...decades.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([decade, entry]) => ({
      decade,
      label: `${decade}s`,
      events: entry.events,
      observedYears: entry.years.size,
      eventsPerObservedYear: Number((entry.events / Math.max(1, entry.years.size)).toFixed(2)),
    }));

  const focalCandidates = focalLives.map((life) => ({ life, person: world.persons[life.id]! }));
  const earlyDeaths = focalCandidates
    .filter(({ life }) => life.died && (life.age ?? 0) < 18)
    .sort((a, b) => b.life.events - a.life.events || (a.life.age ?? 0) - (b.life.age ?? 0));
  const shortestLives = [...focalCandidates].sort((a, b) => {
    const aAge = a.life.age ?? 999;
    const bAge = b.life.age ?? 999;
    return aAge - bAge || b.life.events - a.life.events;
  });
  const shortSource = earlyDeaths[0] ?? shortestLives[0]!;
  const shortBasis =
    earlyDeaths.length > 0
      ? 'focal child who died before 18; chosen for the most recorded events among early deaths'
      : 'no focal child died before 18; showing the shortest-lived focal person instead';

  const adultCandidates = focalCandidates
    .filter(({ life }) => (life.age ?? 0) >= 18)
    .sort((a, b) => (b.life.age ?? 0) - (a.life.age ?? 0) || b.life.events - a.life.events);
  const longSource =
    adultCandidates[0] ??
    [...focalCandidates].sort(
      (a, b) => (b.life.age ?? 0) - (a.life.age ?? 0) || b.life.events - a.life.events,
    )[0]!;
  const longBasis =
    adultCandidates.length > 0
      ? 'focal adult with the greatest age at death (or at the horizon)'
      : 'no focal person reached 18; showing the oldest focal person instead';

  const workScore = (lifeId: string) => {
    const personal = personalEvents(allEvents, lifeId);
    const employmentEffects = personal.reduce(
      (sum, event) =>
        sum +
        event.effects.filter((effect) => effect.type === 'employment' && effect.personId === lifeId)
          .length,
      0,
    );
    const workActions = personal.filter(
      (event) =>
        WORK_ACTION.test(event.action) || event.action.startsWith('vienna-life-apprenticeship'),
    ).length;
    return employmentEffects * 6 + workActions;
  };
  const workingCandidates = focalCandidates
    .filter(({ life }) => (life.age ?? 0) >= 18)
    .sort(
      (a, b) =>
        workScore(b.life.id) - workScore(a.life.id) ||
        (b.life.age ?? 0) - (a.life.age ?? 0) ||
        b.life.events - a.life.events,
    );
  const workingSource =
    workingCandidates.find(
      (candidate) =>
        candidate.life.id !== longSource.life.id && candidate.life.id !== shortSource.life.id,
    ) ??
    workingCandidates[0] ??
    focalCandidates[0]!;
  const workingBasis =
    workingCandidates.length === 0
      ? 'no focal person reached 18; showing the first focal person instead'
      : workScore(workingSource.life.id) > 0
        ? 'focal adult with the most recorded employment/apprenticeship facts'
        : 'no employment fact was recorded; showing the focal adult with the most events';

  const excerpts = [
    buildExcerpt(world, allEvents, shortSource.life.id, 'short_lived_child', shortBasis),
    buildExcerpt(world, allEvents, longSource.life.id, 'long_lived_adult', longBasis),
    buildExcerpt(world, allEvents, workingSource.life.id, 'working_adult', workingBasis),
  ];

  const report = {
    generatedAt: new Date().toISOString(),
    worldId: world.id,
    seed: world.seed,
    startDate: VIENNA_1912_SEED.date,
    date: world.date,
    status: world.status,
    yearsRequested: years,
    yearsRun,
    stopReason,
    allFocalDeadAtYear,
    runtimeMs: Date.now() - startedAt,
    options: {
      eventRuntime: true,
      statisticalModel: true,
      economyEnabled,
      maxOrdinaryEventsPerPerson,
      maxScenesPerPerson: maxScenesPerPerson ?? 1,
      focalCount,
      scenes: scenes.length,
      contentPacks: {
        vienna1912: VIENNA_1912_SCENES.length,
        viennaLife: VIENNA_LIFE_SCENES.length,
        viennaDevelopment: VIENNA_DEVELOPMENT_SCENES.length,
        viennaFamily: VIENNA_FAMILY_RUNTIME_SCENES.length,
        viennaPostwar: VIENNA_POSTWAR_SCENES.length,
        generated: GENERATED_SCENES.length,
      },
    },
    totalPersons: persons.length,
    alive: alivePersons.length,
    births: birthEventCount,
    playerBirths: birthEvents.length,
    macroBirthsLastYear: macroBirths,
    deaths: deathEvents.length,
    deathEvents: deathEvents.length,
    deadPersons: persons.length - alivePersons.length,
    statisticalDeaths,
    macroDeathsLastYear: macroDeaths,
    events: allEvents.length,
    eventsDuringRun: runEvents.length,
    eventsPerYear: Number((allEvents.length / Math.max(1, yearsRun)).toFixed(2)),
    perYear: yearly,
    perDecade,
    population: {
      totalNamedPersons: persons.length,
      alive: alivePersons.length,
      dead: persons.length - alivePersons.length,
      birthsInMacroStateLastYear: macroBirths,
      deathsInMacroStateLastYear: macroDeaths,
    },
    households: {
      maxLiving: maxLivingDuringRun,
      maxLivingDuringRun,
      maxLivingDuringRunYear,
      maxLivingDuringRunHousehold,
      maxLivingHousehold:
        maxLivingDuringRunHousehold === null
          ? null
          : {
              householdId: maxLivingDuringRunHousehold,
              residenceId: peakHousehold?.residenceId ?? null,
              residence: peakResidence?.name ?? null,
              capacity: peakResidence?.capacity ?? null,
              living: maxLivingDuringRun,
              recordedMemberIds: peakHousehold?.memberIds.length ?? null,
              asOfYear: maxLivingDuringRunYear,
            },
      maxLivingFinal: maxLivingHousehold?.living ?? 0,
      maxLivingHouseholdFinal: maxLivingHousehold ?? null,
      totalHouseholds: householdStats.length,
      livingHouseholds: householdStats.filter((household) => household.living > 0).length,
      overfullLivingHouseholdObservations,
      overfullLivingHouseholdCount: overfullLivingHouseholdIds.size,
      overfullLivingHouseholdSamples,
      worstRecordCounts: householdStats.slice(0, 10),
      worstByLiving: householdStats.slice(0, 10),
      worstByRecordedMembers: [...householdStats]
        .sort(
          (a, b) =>
            b.recordedMemberIds - a.recordedMemberIds ||
            b.living - a.living ||
            a.householdId.localeCompare(b.householdId),
        )
        .slice(0, 10),
    },
    focalLives,
    excerpts,
    textAudit: text,
    anomalies: {
      anyLivingHouseholdOver12:
        overfullLivingHouseholdObservations > 0 || overfullLivingHouseholds.length > 0,
      livingHouseholdsOver12: overfullLivingHouseholds.length,
      livingHouseholdsOver12DuringRun: overfullLivingHouseholdIds.size,
      overfullLivingHouseholdObservations,
      overfullLivingHouseholdSamples,
      livingHouseholdsOver12Details: overfullLivingHouseholds,
      anyUnresolvedTemplateToken: text.unresolvedTemplateTokenEvents > 0,
      unresolvedTemplateTokenEvents: text.unresolvedTemplateTokenEvents,
      anyLiteralNone: text.literalNoneEvents > 0,
      literalNoneEvents: text.literalNoneEvents,
      anyLiteralUndefined: text.literalUndefinedEvents > 0,
      literalUndefinedEvents: text.literalUndefinedEvents,
      anyEmptyParticipantList: text.emptyParticipantEvents > 0,
      emptyParticipantEvents: text.emptyParticipantEvents,
      anyFocalPersonWithZeroEvents: focalZero.length > 0,
      focalPersonsWithZeroEvents: focalZero.map((life) => ({
        id: life.id,
        name: life.name,
      })),
      anyScenePrefixRepeatedOver12ForOnePerson: prefixOffenders.length > 0,
      scenePrefixRepeatOffenders: prefixOffenders.slice(0, 20),
      scenePrefixRepeatOffenderCount: prefixOffenders.length,
      maxScenePrefixRepeat: prefixOffenders[0]?.count ?? 0,
      anyDeadPersonMissingDeathCause: deadMissingCause.length > 0,
      deadPersonsMissingDeathCause: deadMissingCause.length,
      deadPersonsMissingDeathCauseDetails: deadMissingCause.slice(0, 20).map((person) => ({
        id: person.id,
        name: person.name,
        died: person.died ?? null,
      })),
      anyDiedYearBeforeBorn: diedYearBeforeBorn.length > 0,
      diedYearBeforeBornCount: diedYearBeforeBorn.length,
      diedYearBeforeBornDetails: diedYearBeforeBorn.slice(0, 20).map((person) => ({
        id: person.id,
        name: person.name,
        born: person.born,
        died: person.died ?? null,
      })),
      anyDeathDateBeforeBirthDate: diedDateBeforeBorn.length > 0,
      deathDateBeforeBirthDateCount: diedDateBeforeBorn.length,
      anyEventAfterSubjectDeath: eventsAfterSubjectDeath.length > 0,
      eventsAfterSubjectDeath: eventsAfterSubjectDeath.length,
      eventsAfterSubjectDeathSamples: eventsAfterSubjectDeath.slice(0, 20).map((event) => ({
        eventId: event.id,
        year: event.date.year,
        month: event.date.month,
        personId: event.subjectId,
        name: world.persons[event.subjectId]?.name ?? null,
        died: world.persons[event.subjectId]?.died ?? null,
        action: event.action,
        text: event.immediateText,
      })),
      anyEventBeforeSubjectBirth: eventsBeforeSubjectBirth.length > 0,
      eventsBeforeSubjectBirth: eventsBeforeSubjectBirth.length,
      eventsBeforeSubjectBirthSamples: eventsBeforeSubjectBirth.slice(0, 20).map((event) => ({
        eventId: event.id,
        year: event.date.year,
        month: event.date.month,
        personId: event.subjectId,
        name: world.persons[event.subjectId]?.name ?? null,
        born: world.persons[event.subjectId]?.born ?? null,
        action: event.action,
        text: event.immediateText,
      })),
    },
    warnings: [...warnings.entries()]
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code)),
  };
  return report;
}

export type V4PlaytestReport = ReturnType<typeof runV4Playtest>;

function printSummary(report: V4PlaytestReport, reportPath: string) {
  const anomalyLabels = [
    'anyLivingHouseholdOver12',
    'anyUnresolvedTemplateToken',
    'anyFocalPersonWithZeroEvents',
    'anyScenePrefixRepeatedOver12ForOnePerson',
    'anyDeadPersonMissingDeathCause',
    'anyDiedYearBeforeBorn',
    'anyEventAfterSubjectDeath',
    'anyEventBeforeSubjectBirth',
  ] as const;
  const raised = anomalyLabels.filter((key) => report.anomalies[key]);
  console.log(
    `v4 playtest ${report.startDate.year}-${report.date.year}: ${report.yearsRun} years, ` +
      `${report.events} events (${report.eventsPerYear}/year), ${report.runtimeMs}ms`,
  );
  console.log(
    `  persons=${report.totalPersons} alive=${report.alive} deadPersons=${report.deadPersons} ` +
      `births=${report.births} deaths=${report.deaths} deathEvents=${report.deathEvents} ` +
      `statisticalDeaths=${report.statisticalDeaths}`,
  );
  console.log(
    `  maxLivingHousehold=${report.households.maxLiving} ` +
      `(${report.households.maxLivingHousehold?.householdId ?? 'none'}) ` +
      `scenes=${report.options.scenes}`,
  );
  console.log(
    `  focalEventCounts=${report.focalLives.map((life) => `${life.name}:${life.events}`).join(', ')}`,
  );
  console.log(`  allFocalDeadAtYear=${report.allFocalDeadAtYear ?? 'none'}`);
  console.log(
    `  anomalies=${raised.length === 0 ? 'none' : raised.join(', ')}` +
      (report.anomalies.scenePrefixRepeatOffenderCount > 0
        ? ` (prefixRepeatOffenders=${report.anomalies.scenePrefixRepeatOffenderCount}, ` +
          `max=${report.anomalies.maxScenePrefixRepeat})`
        : '') +
      (report.anomalies.eventsAfterSubjectDeath > 0
        ? ` (postDeathEvents=${report.anomalies.eventsAfterSubjectDeath})`
        : ''),
  );
  console.log(`  report: ${reportPath}`);
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(resolve(entry)).href;
}

if (isMainModule()) {
  const reportPath = resolve('docs/v4/playtest.json');
  const report = runV4Playtest();
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  printSummary(report, reportPath);
}
