import { describe, expect, it } from 'vitest';
import type {
  HistoricalEvent,
  Person,
  Polity,
  Settlement,
  World,
} from '../packages/contracts/index.js';
import { assessWorldline, isWorldlineAssessmentDue } from '../packages/worldline/drift.js';
import { buildWorldlinePrompt, WORLDLINE_SYSTEM_PROMPT } from '../packages/worldline/prompt.js';
import {
  parseWorldlineAssessment,
  type WorldlineAssessment,
  type WorldlineDimension,
} from '../packages/worldline/schema.js';

const WORLD_ID = 'worldline-test-world';

type Variant = 'calm' | 'crisis' | 'empty';

function settlement(
  id: string,
  polityId: string,
  cohort: Settlement['cohort'],
  overrides: Partial<Settlement> = {},
): Settlement {
  return {
    id,
    name: id === 'north' ? '北岸' : '南坡',
    regionId: polityId,
    x: 0,
    y: 0,
    biome: 'plains',
    neighbors: id === 'north' ? ['south'] : ['north'],
    polityId,
    cohort,
    food: 5000,
    coin: 1000,
    fertility: 1,
    knowledge: 0.08,
    prosperity: 0.65,
    scarcity: 0.02,
    price: 1,
    unrest: 0.02,
    birthRemainder: 0,
    deathRemainder: 0,
    economy: {
      unemployment: 0.05,
      healthcare: 0.4,
      education: 0.4,
      infrastructure: 0.4,
      inflation: 0.02,
      productionMultiplier: 1,
      tradeMultiplier: 1,
    },
    ...overrides,
  };
}

function polity(
  id: string,
  name: string,
  leaderId: string,
  overrides: Partial<Polity> = {},
): Polity {
  return {
    id,
    name,
    color: '#888888',
    treasury: 1000,
    legitimacy: 0.65,
    tax: 0.08,
    leaderId,
    military: 40,
    research: 0,
    realWorld: {
      iso3: id === 'polity-a' ? 'AAA' : 'BBB',
      population: 1000,
      populationYear: 1900,
      gdpMillions: 10,
    },
    ...overrides,
  };
}

function person(id: string, locationId: string, overrides: Partial<Person> = {}): Person {
  return {
    id,
    version: 0,
    name: id,
    birth: -400,
    locationId,
    originCohortId: `cohort-${locationId}`,
    parents: [],
    householdId: `household-${id}`,
    occupation: '农人',
    coin: 10,
    health: 1,
    stress: 0.1,
    values: { care: 0.5, ambition: 0.5, tradition: 0.5 },
    skills: { craft: 0.5, learning: 0.5 },
    goals: [],
    memories: [],
    beliefs: [],
    relationships: [],
    plans: [],
    commitments: [],
    appearance: { skin: 0, hair: 0, clothes: 0 },
    ...overrides,
  };
}

function event(
  id: string,
  kind: string,
  month: number,
  personIds: string[],
  locationId: string | undefined,
  data: Record<string, unknown>,
  causeIds: string[],
  significance: number,
  text: string,
): HistoricalEvent {
  return {
    id,
    worldId: WORLD_ID,
    month,
    kind,
    personIds,
    locationId,
    data,
    causeIds,
    significance,
    text,
  };
}

function makeWorld(variant: Variant): World {
  const base: World = {
    schema: 'slw/1',
    id: WORLD_ID,
    seed: 'worldline-drift',
    epoch: 1,
    month: 36,
    revision: 4,
    pack: { id: 'test-pack', version: '1' },
    status: 'running',
    calendar: { startYear: 1900, mode: 'historical-simulation', sources: [] },
    parameters: { researchRate: 1 },
    baselinePopulation: 0,
    collapseMonths: 0,
    maxYears: 100,
    settlements: [],
    polities: [],
    persons: [],
    organizations: [],
    conflicts: [],
    claims: [],
    eventSeq: 0,
    appliedCommands: [],
    processedJobs: [],
    audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
    terminalEvidence: [],
  };

  if (variant === 'empty') return base;

  const crisis = variant === 'crisis';
  const northCohort = crisis
    ? { id: 'cohort-north', children: 20, adults: 120, elders: 10 }
    : { id: 'cohort-north', children: 200, adults: 700, elders: 99 };
  const southCohort = crisis
    ? { id: 'cohort-south', children: 20, adults: 120, elders: 10 }
    : { id: 'cohort-south', children: 200, adults: 700, elders: 99 };

  const north = settlement('north', 'polity-a', northCohort, {
    food: crisis ? 100 : 5000,
    scarcity: crisis ? 0.62 : 0.02,
    unrest: crisis ? 0.58 : 0.02,
    disease: crisis ? { prevalence: 0.12, immune: 0, causeId: 'ev-scarcity' } : undefined,
    economy: {
      unemployment: crisis ? 0.35 : 0.05,
      healthcare: 0.35,
      education: 0.35,
      infrastructure: 0.35,
      inflation: crisis ? 0.3 : 0.02,
      productionMultiplier: 1,
      tradeMultiplier: 1,
    },
  });
  const south = settlement('south', 'polity-b', southCohort);

  const personA = person('person-a', 'north', {
    name: '甲',
    title: '议事长',
    historicalIdentity: {
      qid: 'Q-TEST-1',
      sourceUrl: 'https://example.test/q-test-1',
      birthPrecision: 'year',
    },
    death: crisis ? 35 : undefined,
    deathCause: crisis ? '饥病' : undefined,
  });
  const personB = person('person-b', 'south', { name: '乙', title: '议事长' });
  const personC = person('person-c', 'north', { name: '丙' });
  const persons = crisis ? [personA, personB, personC] : [personA, personB];

  const worldA = polity('polity-a', '北岸盟', 'person-a', {
    legitimacy: crisis ? 0.18 : 0.65,
    military: crisis ? 14 : 40,
  });
  const worldB = polity('polity-b', '南坡领', 'person-b', {
    legitimacy: crisis ? 0.45 : 0.65,
    military: 40,
  });

  return {
    ...base,
    baselinePopulation: 2000,
    settlements: [north, south],
    polities: [worldA, worldB],
    persons,
    conflicts: crisis
      ? [
          {
            id: 'war-1',
            a: 'polity-a',
            b: 'polity-b',
            locationId: 'north',
            months: 10,
            status: 'active',
            causeIds: ['ev-war'],
          },
        ]
      : [],
    shocks: crisis
      ? [
          {
            id: 'shock-war-1',
            kind: 'war',
            title: '北岸边境战争',
            historicalKind: 'war',
            locationIds: ['north'],
            started: 24,
            ends: 60,
            severity: 0.8,
            causeId: 'ev-war',
            stats: { casualties: 150, displaced: 23, relief: 0, consumedSupply: 0 },
          },
        ]
      : [],
    discoveries: [
      {
        id: 'disc-1',
        name: '试验性蒸汽泵',
        creatorId: 'person-a',
        locationId: 'north',
        createdAt: 30,
        mechanism: 'production_improvement',
        gain: 0.1,
        causeIds: [],
      },
    ],
    audit: crisis
      ? { producedFood: 800, consumedFood: 900, destroyedFood: 300, births: 90, deaths: 320 }
      : { producedFood: 3000, consumedFood: 2900, destroyedFood: 0, births: 120, deaths: 80 },
    eventSeq: crisis ? 4 : 0,
    terminalEvidence: crisis ? ['ev-war', 'ev-scarcity'] : [],
  };
}

const crisisEvents: HistoricalEvent[] = [
  event(
    'ev-war',
    'war_started',
    28,
    ['person-a'],
    'north',
    { attacker: 'polity-a', defender: 'polity-b' },
    [],
    0.9,
    '北岸的粮路争端升级为与南坡的边境战争。',
  ),
  event(
    'ev-scarcity',
    'scarcity',
    34,
    ['person-c', 'person-b'],
    'north',
    { scarcity: 0.62, production: 120, consumed: 190 },
    [],
    0.7,
    '北岸粮食不足，居民开始减少口粮。',
  ),
  event(
    'ev-death',
    'death',
    35,
    ['person-a'],
    'north',
    { reason: '饥病', age: 42 },
    ['ev-scarcity'],
    1,
    '甲在战争与饥病中离世。',
  ),
  event(
    'ev-unrest',
    'unrest',
    35,
    ['person-c'],
    'north',
    { unrest: 0.58 },
    ['ev-scarcity'],
    0.6,
    '北岸出现抢粮与抗议。',
  ),
];

function dimension(
  assessment: WorldlineAssessment,
  key: WorldlineDimension,
): WorldlineAssessment['dimensions'][number] {
  const found = assessment.dimensions.find((entry) => entry.dimension === key);
  if (!found) throw new Error(`missing dimension ${key}`);
  return found;
}

function evidenceById(assessment: WorldlineAssessment, id: string) {
  const found = assessment.evidence.find((entry) => entry.id === id);
  if (!found) throw new Error(`missing evidence ${id}`);
  return found;
}

describe('worldline drift assessment', () => {
  it('parses a normal state-derived assessment and preserves the seven dimensions', () => {
    const world = makeWorld('calm');
    const assessment = assessWorldline(world, []);
    expect(assessment.generatedBy).toBe('fallback');
    expect(assessment.overallStatus).toBe('assessed');
    expect(assessment.dimensions).toHaveLength(7);
    expect(assessment.dimensions.map((entry) => entry.dimension).sort()).toEqual(
      ['biography', 'economy', 'politics', 'population', 'society', 'technology', 'war'].sort(),
    );
    expect(assessment.overallScore).not.toBeNull();
    expect(assessment.requiresHumanReview).toBe(false);
    expect(() => parseWorldlineAssessment(assessment, { world, events: [] })).not.toThrow();

    const modelLike = { ...assessment, generatedBy: 'model' as const };
    expect(() => parseWorldlineAssessment(modelLike, { world, events: [] })).not.toThrow();
  });

  it('rejects forged event ids, unknown locations and unknown people', () => {
    const world = makeWorld('crisis');
    const assessment = assessWorldline(world, crisisEvents);
    expect(() =>
      parseWorldlineAssessment(assessment, { world, events: crisisEvents }),
    ).not.toThrow();

    const forgedEvent = structuredClone(assessment);
    const withEvent = forgedEvent.evidence.find((entry) => entry.eventIds.length > 0)!;
    withEvent.eventIds[0] = 'forged-event-id';
    expect(() => parseWorldlineAssessment(forgedEvent, { world, events: crisisEvents })).toThrow(
      /未知事件 forged-event-id/,
    );

    const forgedLocation = structuredClone(assessment);
    forgedLocation.evidence[0].locationIds.push('forged-location');
    expect(() => parseWorldlineAssessment(forgedLocation, { world, events: crisisEvents })).toThrow(
      /未知地点 forged-location/,
    );

    const forgedPerson = structuredClone(assessment);
    forgedPerson.evidence[0].personIds.push('forged-person');
    expect(() => parseWorldlineAssessment(forgedPerson, { world, events: crisisEvents })).toThrow(
      /未知人物 forged-person/,
    );

    const forgedBaseline = structuredClone(assessment);
    const population = forgedBaseline.dimensions.find((entry) => entry.dimension === 'population')!;
    population.baseline = {
      kind: 'historical-1900',
      value: 1,
      note: '伪造的 1900 人口基准',
    };
    expect(() => parseWorldlineAssessment(forgedBaseline, { world, events: crisisEvents })).toThrow(
      /1900 年人口合计/,
    );

    const noEvidence = structuredClone(assessment);
    const war = noEvidence.dimensions.find((entry) => entry.dimension === 'war')!;
    war.evidenceIds = [];
    expect(() => parseWorldlineAssessment(noEvidence, { world, events: crisisEvents })).toThrow(
      /assessed 维度必须至少引用一条证据/,
    );
  });

  it('rejects out-of-grammar and out-of-bounds interventions', () => {
    const world = makeWorld('crisis');
    const assessment = assessWorldline(world, crisisEvents);
    const evidenceId = assessment.evidence[0].id;

    const death = structuredClone(assessment) as unknown as {
      interventions: unknown[];
      requiresHumanReview: boolean;
    };
    death.interventions = [
      {
        type: 'death',
        personId: 'person-a',
        rationale: '直接杀死人物',
        evidenceIds: [evidenceId],
      },
    ];
    expect(() => parseWorldlineAssessment(death, { world, events: crisisEvents })).toThrow(
      /Invalid input|无效|discriminator|literal/i,
    );

    const tooLarge = structuredClone(assessment);
    tooLarge.interventions = [
      {
        type: 'unrest',
        siteId: 'north',
        amount: 0.9,
        rationale: '无界动荡修改',
        evidenceIds: [evidenceId],
      },
    ];
    expect(() => parseWorldlineAssessment(tooLarge, { world, events: crisisEvents })).toThrow();

    const unknownSite = structuredClone(assessment);
    unknownSite.interventions = [
      {
        type: 'unrest',
        siteId: 'missing-site',
        amount: -0.02,
        rationale: '不存在的地点',
        evidenceIds: [evidenceId],
      },
    ];
    expect(() => parseWorldlineAssessment(unknownSite, { world, events: crisisEvents })).toThrow(
      /未知地点 missing-site/,
    );

    const unknownTarget = structuredClone(assessment);
    unknownTarget.interventions = [
      {
        type: 'opportunity',
        siteId: 'north',
        title: '不存在的目标',
        action: 'aid',
        targetId: 'missing-target',
        rationale: '目标不存在',
        evidenceIds: [evidenceId],
      },
    ];
    expect(() => parseWorldlineAssessment(unknownTarget, { world, events: crisisEvents })).toThrow(
      /未知目标 missing-target/,
    );
  });

  it('keeps scores and evidence deterministic across event ordering', () => {
    const world = makeWorld('crisis');
    const before = structuredClone(world);
    const first = assessWorldline(world, crisisEvents);
    const second = assessWorldline(world, [...crisisEvents].reverse());
    expect(world).toEqual(before);
    expect(second).toEqual(first);
    expect(second.overallScore).toBe(first.overallScore);
    expect(second.evidence).toEqual(first.evidence);
  });

  it('suggests a 12-month cadence without scheduling or persistence', () => {
    expect(isWorldlineAssessmentDue(11)).toBe(false);
    expect(isWorldlineAssessmentDue(12)).toBe(true);
    expect(isWorldlineAssessmentDue(24)).toBe(true);
    expect(isWorldlineAssessmentDue(24, 12)).toBe(true);
    expect(isWorldlineAssessmentDue(20, 12)).toBe(false);
    expect(isWorldlineAssessmentDue(24, 24)).toBe(false);
    expect(isWorldlineAssessmentDue(0)).toBe(false);
    expect(isWorldlineAssessmentDue(-1)).toBe(false);
    expect(isWorldlineAssessmentDue(12, undefined, 0)).toBe(false);
  });

  it('raises war, famine and population drift with real evidence in a crisis', () => {
    const calmWorld = makeWorld('calm');
    const crisisWorld = makeWorld('crisis');
    const calm = assessWorldline(calmWorld, []);
    const crisis = assessWorldline(crisisWorld, crisisEvents);

    for (const key of ['war', 'economy', 'population', 'society'] as const)
      expect(dimension(crisis, key).score!).toBeGreaterThan(dimension(calm, key).score!);
    expect(crisis.overallScore!).toBeGreaterThan(calm.overallScore!);
    expect(crisis.requiresHumanReview).toBe(true);
    expect(calm.requiresHumanReview).toBe(false);

    const realEventIds = new Set(crisisEvents.map((entry) => entry.id));
    for (const evidence of crisis.evidence)
      for (const id of evidence.eventIds) expect(realEventIds.has(id)).toBe(true);

    const warEvidenceIds = dimension(crisis, 'war').evidenceIds.flatMap(
      (id) => evidenceById(crisis, id).eventIds,
    );
    const economyEvidenceIds = dimension(crisis, 'economy').evidenceIds.flatMap(
      (id) => evidenceById(crisis, id).eventIds,
    );
    const populationEvidenceIds = dimension(crisis, 'population').evidenceIds.flatMap(
      (id) => evidenceById(crisis, id).eventIds,
    );
    expect(warEvidenceIds).toContain('ev-war');
    expect(economyEvidenceIds).toContain('ev-scarcity');
    expect(populationEvidenceIds).toContain('ev-death');

    expect(crisis.anomalies.map((anomaly) => anomaly.dimension)).toEqual(
      expect.arrayContaining(['war', 'economy', 'population']),
    );
    expect(() =>
      parseWorldlineAssessment(crisis, { world: crisisWorld, events: crisisEvents }),
    ).not.toThrow();
  });

  it('marks unsupported dimensions unknown instead of fabricating history', () => {
    const empty = makeWorld('empty');
    const assessment = assessWorldline(empty, []);
    expect(assessment.overallStatus).toBe('unknown');
    expect(assessment.overallScore).toBeNull();
    expect(assessment.evidence).toEqual([]);
    expect(assessment.anomalies).toEqual([]);
    expect(assessment.interventions).toEqual([]);
    expect(assessment.dimensions.every((entry) => entry.status === 'unknown')).toBe(true);
    expect(assessment.limitations.join(' ')).toContain('unknown');
    expect(() => parseWorldlineAssessment(assessment, { world: empty, events: [] })).not.toThrow();

    // Population state alone is not history: without discoveries or historical
    // identities, technology and biography stay unknown and no event id appears.
    const noHistoryWorld = makeWorld('calm');
    noHistoryWorld.discoveries = [];
    for (const entry of noHistoryWorld.persons) delete entry.historicalIdentity;
    const stateOnly = assessWorldline(noHistoryWorld, []);
    expect(dimension(stateOnly, 'technology').status).toBe('unknown');
    expect(dimension(stateOnly, 'biography').status).toBe('unknown');
    expect(stateOnly.evidence.flatMap((entry) => entry.eventIds)).toEqual([]);
    expect(stateOnly.overallStatus).toBe('partial');
    expect(() =>
      parseWorldlineAssessment(stateOnly, { world: noHistoryWorld, events: [] }),
    ).not.toThrow();
  });

  it('builds a strict, injection-resistant assessment prompt from the snapshot', () => {
    const world = makeWorld('crisis');
    const future = event(
      'ev-future',
      'war_started',
      90,
      ['person-a'],
      'north',
      {},
      [],
      0.9,
      '未来事件不应进入提示词。',
    );
    const { system, user } = buildWorldlinePrompt(world, [...crisisEvents, future]);
    expect(system).toBe(WORLDLINE_SYSTEM_PROMPT);
    expect(system).toContain('只输出一个严格 JSON 对象');
    expect(system).toContain('禁止直接杀死');
    expect(system).toContain('不得编造 eventId');
    expect(user).toContain('month=36');
    expect(user).toContain('ev-war');
    expect(user).toContain('ev-scarcity');
    expect(user).not.toContain('ev-future');
    expect(user).toContain('<world_snapshot_json>');
    expect(user).toContain('<committed_events_json>');
  });
});
