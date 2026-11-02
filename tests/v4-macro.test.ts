import { describe, expect, it } from 'vitest';
import type { Person, Place, WorldDate, WorldState } from '../packages/v4/domain.js';
import {
  advanceDevelopmentLifecycle,
  applyMacroProposal,
  populationFromAgeBands,
  defaultMacroState,
  eventPoolMultiplier,
  expireMacroEffects,
  materializeDevelopments,
  moveBackgroundCohorts,
  MACRO_DEFAULT_PARAMETERS,
  syncMacroPressures,
  validateMacroProposal,
  type MacroParameters,
  type MacroProposal,
  type RegionalPopulation,
} from '../packages/v4/macro.js';
import {
  advanceAggregatePopulation,
  estimateAnnualRisks,
  type DeathCause,
} from '../packages/v4/statistics.js';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';

const date: WorldDate = { year: 1912, month: 1 };

function place(id = 'place:home'): Place {
  return { id, name: id, kind: 'home', settlementId: 'settlement:vienna', offers: [] };
}

function person(age: number, id = 'person:test', sex: Person['sex'] = 'female'): Person {
  return {
    id,
    name: id,
    sex,
    born: { year: date.year - age, month: 1 },
    locationId: 'place:home',
    householdId: 'household:test',
    parentIds: [],
    guardianIds: [],
    health: { vitality: 1, conditions: [], nutrition: 1 },
    traits: {
      care: 0.5,
      ambition: 0.5,
      tradition: 0.5,
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5,
    },
    education: { status: 'none', level: 0 },
    roles: [],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    provenance: { kind: 'initial' },
  };
}

function world(): WorldState {
  return {
    id: 'world:test',
    seed: 'macro-test',
    date,
    timePolicy: { secondsPerYear: 30, monthsPerTick: 12 },
    places: { 'place:home': place() },
    households: {
      'household:test': {
        id: 'household:test',
        residenceId: 'place:home',
        memberIds: ['person:test'],
        guardianIds: [],
        cash: 10,
        food: 10,
        debt: 0,
        rent: 1,
        obligations: [],
        assets: [],
        sharingRules: 'pooled',
      },
    },
    persons: { 'person:test': person(30) },
    organizations: {},
    positions: {},
    projects: {},
    interactions: {},
    relations: {},
    knowledge: {},
    events: [],
    scenes: [],
    pressures: {},
    historyMeta: { sequence: 0 },
    status: 'running',
  };
}

function region(parameters: MacroParameters = { ...MACRO_DEFAULT_PARAMETERS }) {
  return {
    id: 'region-lower-austria',
    name: 'Vienna',
    scope: 'region' as const,
    effectiveFrom: date,
    parameters,
    source: 'test',
  };
}

function survivalCurve(parameters: MacroParameters, soldier = false): number {
  let survival = 1;
  let expected = 0;
  for (let age = 0; age <= 105; age += 1) {
    const risk = estimateAnnualRisks(person(age), date, region(parameters), { soldier }).total;
    const deaths = survival * risk;
    expected += deaths * (age + 0.5);
    survival *= 1 - risk;
    if (survival < 1e-7) break;
  }
  return expected;
}

function proposal(overrides: Partial<MacroProposal> = {}): MacroProposal {
  return {
    version: 1,
    regionId: 'region-lower-austria',
    effectiveFrom: date,
    durationMonths: 12,
    summary: 'a bounded macro change',
    confidence: 0.6,
    maintainStatus: false,
    developments: [{ type: 'food_shortage', description: 'bread supply falls', severity: 0.6 }],
    parameterChanges: { foodSupply: -0.1 },
    eventPoolChanges: [],
    ...overrides,
  };
}

describe('v4 macro contract', () => {
  it('creates a typed regional baseline and keeps pressures as projections', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    expect(w.macro.regions['region-lower-austria']).toBeDefined();
    expect(w.macro.population['region-lower-austria']?.namedAlive).toBe(1);
    syncMacroPressures(w, w.macro);
    expect(w.pressures.war_supply_stress).toBe(0);
    expect(w.pressures.influenza_1918).toBe(0);
  });

  it('applies bounded deltas and event-pool policy', () => {
    const w = world();
    const state = defaultMacroState(w);
    const validated = validateMacroProposal(
      proposal({
        eventPoolChanges: [{ familyId: 'vienna-life-flu-1918-adult', weightMultiplier: 1.5 }],
      }),
      { world: w, state, knownFamilies: new Set(['vienna-life-flu-1918-adult']) },
    );
    const next = applyMacroProposal(state, validated, date, 'test-model', 'proposal:1');
    expect(next.regions['region-lower-austria']!.parameters.foodSupply).toBeCloseTo(0.8, 5);
    expect(next.eventPool['vienna-life-flu-1918-adult']!.weightMultiplier).toBe(1.5);
    expect(next.history).toHaveLength(1);
    expect(
      eventPoolMultiplier(
        next,
        {
          id: 'vienna-life-flu-1918-adult',
          familyId: 'vienna-life-flu-1918-adult',
          stage: 'adulthood',
          tags: ['flu'],
        },
        'region-lower-austria',
      ),
    ).toBe(1.5);
  });

  it('rejects out-of-range, unknown and empty proposals', () => {
    const w = world();
    const state = defaultMacroState(w);
    const context = { world: w, state, knownFamilies: new Set<string>() };
    expect(() =>
      validateMacroProposal(proposal({ parameterChanges: { foodSupply: -0.9 } }), context),
    ).toThrow();
    expect(() =>
      validateMacroProposal(proposal({ parameterChanges: { nonexistent: 0.1 } as any }), context),
    ).toThrow();
    expect(() =>
      validateMacroProposal(proposal({ parameterChanges: {}, eventPoolChanges: [] }), context),
    ).toThrow();
    expect(
      validateMacroProposal(
        proposal({ maintainStatus: true, parameterChanges: {}, developments: [] }),
        context,
      ).maintainStatus,
    ).toBe(true);
  });

  it('normalizes an unfamiliar development type and drops unknown event families', () => {
    const w = world();
    const state = defaultMacroState(w);
    const validated = validateMacroProposal(
      proposal({
        developments: [
          {
            type: 'new_public_health_campaign' as any,
            description: 'a new campaign',
            severity: 0.4,
          },
        ],
        eventPoolChanges: [{ familyId: 'invented-family', weightMultiplier: 1.5 }],
      }),
      { world: w, state, knownFamilies: new Set<string>() },
    );
    expect(validated.developments[0]?.type).toBe('other');
    expect(validated.eventPoolChanges).toEqual([]);
  });

  it('disables an event family through the engine policy', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    w.macro.eventPool['test-family'] = {
      familyId: 'test-family',
      enabled: false,
      weightMultiplier: 1,
      source: 'test',
      updatedAt: date,
    };
    const scene = {
      id: 'test-policy-scene',
      version: 1,
      packId: 'test',
      title: 'policy',
      stage: 'adulthood' as const,
      ageWindow: { min: 18, max: 60 },
      roles: [{ key: 'subject', kind: 'subject' as const, required: true, minAge: 18, maxAge: 60 }],
      conditions: [{ kind: 'age' as const, min: 18, max: 60 }],
      tags: ['test'],
      familyId: 'test-family',
      rate: 1,
      outcomes: [{ id: 'ok', weight: 1, immediateText: 'ok', effects: [] }],
    };
    const disabled = advanceV4Year(w, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(disabled.events.some((event) => event.action === 'test-policy-scene/ok')).toBe(false);
    w.macro.eventPool['test-family']!.enabled = true;
    const enabled = advanceV4Year(w, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(enabled.events.some((event) => event.action === 'test-policy-scene/ok')).toBe(true);
  });
});

describe('v4 statistical engine', () => {
  it('produces age-specific and cause-specific risks', () => {
    const infant = estimateAnnualRisks(person(0), date, region());
    const adult = estimateAnnualRisks(person(30), date, region());
    const elder = estimateAnnualRisks(person(80), date, region());
    expect(infant.total).toBeGreaterThan(adult.total);
    expect(elder.total).toBeGreaterThan(adult.total);
    expect(infant.causes.infant_diarrhoea + infant.causes.pneumonia).toBeGreaterThan(0);
    expect(adult.causes.old_age).toBe(0);
  });

  it('changes life expectancy under war, public health and food crises', () => {
    const baseline = survivalCurve({ ...MACRO_DEFAULT_PARAMETERS });
    const war = survivalCurve({
      ...MACRO_DEFAULT_PARAMETERS,
      warIntensity: 0.8,
      militaryExposure: 0.8,
      civilianExposure: 0.5,
      foodSupply: 0.6,
    });
    const improved = survivalCurve({
      ...MACRO_DEFAULT_PARAMETERS,
      sanitation: 0.9,
      healthcare: 0.8,
      medicalTech: 0.6,
      foodSupply: 0.95,
    });
    const crisis = survivalCurve({
      ...MACRO_DEFAULT_PARAMETERS,
      foodSupply: 0.15,
      sanitation: 0.25,
      healthcare: 0.1,
      epidemicCholera: 0.5,
    });
    expect(war).toBeLessThan(baseline);
    expect(improved).toBeGreaterThan(baseline);
    expect(crisis).toBeLessThan(baseline);
  });

  it('distinguishes soldiers from civilians and postpartum maternal risk', () => {
    const params = {
      ...MACRO_DEFAULT_PARAMETERS,
      warIntensity: 0.8,
      militaryExposure: 0.7,
      civilianExposure: 0.2,
    };
    const soldier = estimateAnnualRisks(
      person(25, 'person:soldier', 'male'),
      date,
      region(params),
      {
        soldier: true,
      },
    );
    const civilian = estimateAnnualRisks(
      person(25, 'person:civilian', 'female'),
      date,
      region(params),
    );
    expect(soldier.causes.war).toBeGreaterThan(civilian.causes.war);
    const mother = person(28);
    mother.health.postpartumUntil = { year: 1912, month: 6 };
    const maternal = estimateAnnualRisks(mother, date, region());
    expect(maternal.causes.childbirth).toBeGreaterThan(0);
    expect(civilian.causes.childbirth).toBe(0);
  });

  it('has no war deaths in a world line without war', () => {
    const risks = estimateAnnualRisks(person(25, 'person:soldier', 'male'), date, region(), {
      soldier: true,
    });
    expect(risks.causes.war).toBe(0);
  });

  it('keeps named and unnamed population separate while aggregating births and deaths', () => {
    const aggregate = populationFromAgeBands(
      'region-lower-austria',
      { '0-4': 12000, '5-14': 18000, '15-44': 45000, '45-64': 20000, '65+': 5000 },
      26,
      date,
    );
    const next = advanceAggregatePopulation(
      aggregate,
      { ...MACRO_DEFAULT_PARAMETERS },
      { year: 1913, month: 1 },
      25,
    );
    expect(next.namedAlive).toBe(25);
    expect(next.births).toBeGreaterThan(0);
    expect(next.deaths).toBeGreaterThan(0);
    expect(next.unnamedByAgeSex.female.reduce((a, b) => a + b, 0)).toBeGreaterThan(0);
  });

  it('produces concrete statistical death events without internal causes', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    w.macro.regions['region-lower-austria']!.parameters.foodSupply = 0.15;
    w.macro.regions['region-lower-austria']!.parameters.sanitation = 0.2;
    w.macro.regions['region-lower-austria']!.parameters.healthcare = 0.1;
    const household = w.households['household:test']!;
    for (let i = 0; i < 80; i += 1) {
      const copy = person(90, `person:elder-${i}`);
      w.persons[copy.id] = copy;
      household.memberIds.push(copy.id);
    }
    const result = advanceV4Year(w, [], {
      economy: { enabled: false },
      eventRuntime: true,
      statisticalModel: true,
    });
    const deaths = result.events.filter((event) =>
      event.effects.some((effect) => effect.type === 'death'),
    );
    expect(deaths.length).toBeGreaterThan(0);
    for (const event of deaths) {
      expect(event.immediateText).not.toContain('vitality');
      const death = event.effects.find((effect) => effect.type === 'death') as
        { cause?: string } | undefined;
      expect(death?.cause).not.toBe('vitality_exhausted');
      expect(death?.cause).not.toContain('region-lower-austria');
    }
    const ids = new Set<string>();
    for (const event of deaths) ids.add(event.subjectId);
    expect(ids.size).toBe(deaths.length);
  });

  it('materializes a background person into a stable named social contact', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    const before =
      w.macro.population['region-lower-austria']!.unnamedByAgeSex!.female.reduce(
        (a, b) => a + b,
        0,
      ) +
      w.macro.population['region-lower-austria']!.unnamedByAgeSex!.male.reduce((a, b) => a + b, 0);
    const scene = {
      id: 'test-social-contact',
      version: 1,
      packId: 'test',
      title: 'Neighbour',
      stage: 'adulthood' as const,
      ageWindow: { min: 18, max: 60 },
      roles: [
        { key: 'subject', kind: 'subject' as const, required: true, minAge: 18, maxAge: 60 },
        { key: 'neighbor', kind: 'neighbor' as const, required: true, minAge: 18, maxAge: 60 },
      ],
      conditions: [{ kind: 'age' as const, min: 18, max: 60 }],
      tags: ['social'],
      rate: 1,
      outcomes: [{ id: 'meet', weight: 1, immediateText: 'neighbour met', effects: [] }],
    };
    const first = advanceV4Year(w, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(first.world.persons['person:test']).toBeDefined();
    const materialized = Object.values(first.world.persons).find(
      (person) => person.provenance.kind === 'materialized_population',
    );
    expect(materialized).toBeDefined();
    expect(first.world.households[materialized!.householdId]!.memberIds).toContain(
      materialized!.id,
    );
    expect(
      Object.values(first.world.relations).some(
        (relation) =>
          (relation.a === 'person:test' && relation.b === materialized!.id) ||
          (relation.b === 'person:test' && relation.a === materialized!.id),
      ),
    ).toBe(true);
    const after = first.world.macro!.population['region-lower-austria']!;
    const afterTotal =
      after.unnamedByAgeSex!.female.reduce((a, b) => a + b, 0) +
      after.unnamedByAgeSex!.male.reduce((a, b) => a + b, 0);
    expect(before - afterTotal).toBeCloseTo(1, 5);
    const second = advanceV4Year(first.world, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(
      Object.values(second.world.persons).filter(
        (person) => person.provenance.kind === 'materialized_population',
      ),
    ).toHaveLength(1);
  });

  it('expires duration-bound macro effects instead of stacking forever', () => {
    const w = world();
    const state = defaultMacroState(w);
    const validated = validateMacroProposal(proposal({ effectiveFrom: date, durationMonths: 1 }), {
      world: w,
      state,
      knownFamilies: new Set(),
    });
    const applied = applyMacroProposal(state, validated, date, 'test-model', 'proposal:expiry');
    expect(applied.regions['region-lower-austria']!.parameters.foodSupply).toBeCloseTo(0.8, 5);
    const expired = expireMacroEffects(applied, { year: 1912, month: 3 });
    expect(expired.regions['region-lower-austria']!.parameters.foodSupply).toBeCloseTo(0.9, 5);
  });

  it('turns a social-change proposal into an organization and a real event', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    const known = new Set(['vienna-social-movement']);
    const organizationProposal = proposal({
      developments: [
        {
          type: 'social_change',
          description: 'a new anti-war group forms',
          severity: 0.7,
          organization: { name: 'Leopoldstadt Anti-War Group', kind: 'other' },
          eventFamilyIds: ['vienna-social-movement'],
        },
      ],
      parameterChanges: { stability: -0.05 },
    });
    const validated = validateMacroProposal(organizationProposal, {
      world: w,
      state: w.macro,
      knownFamilies: known,
    });
    let state = applyMacroProposal(w.macro, validated, date, 'test-model', 'proposal:org');
    state = materializeDevelopments(w, state, validated, 'proposal:org', date);
    w.macro = state;
    const development = Object.values(state.developments ?? {})[0];
    expect(development?.organizationId).toBeDefined();
    expect(w.organizations[development!.organizationId!]).toBeDefined();
    const scene = {
      ...VIENNA_DEVELOPMENT_SCENES[0]!,
      rate: 1,
      outcomes: [VIENNA_DEVELOPMENT_SCENES[0]!.outcomes![0]!],
    };
    const result = advanceV4Year(w, [scene], {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 1,
    });
    expect(
      result.events.some((event) => event.action.startsWith('vienna-social-movement.recruitment')),
    ).toBe(true);
    expect(result.world.organizations[development!.organizationId!]!.memberIds).toContain(
      'person:test',
    );
  });

  it('moves single-year cohorts between regions without changing world population', () => {
    const state = defaultMacroState(world());
    state.regions['region-other'] = {
      ...structuredClone(state.regions['region-lower-austria']!),
      id: 'region-other',
      name: 'Other',
    };
    state.population['region-other'] = populationFromAgeBands(
      'region-other',
      { '0-4': 100, '5-14': 100, '15-44': 100, '45-64': 100, '65+': 100 },
      0,
      date,
    );
    const total = (population: RegionalPopulation) =>
      population.namedAlive +
      population.unnamedByAgeSex.female.reduce((sum, value) => sum + value, 0) +
      population.unnamedByAgeSex.male.reduce((sum, value) => sum + value, 0);
    const before =
      total(state.population['region-lower-austria']!) + total(state.population['region-other']!);
    moveBackgroundCohorts(state, 'region-lower-austria', 'region-other', [
      { age: 25, sex: 'female', count: 10 },
    ]);
    const after =
      total(state.population['region-lower-austria']!) + total(state.population['region-other']!);
    expect(after).toBeCloseTo(before, 5);
    expect(state.population['region-other']!.migrations).toBeCloseTo(10, 5);
  });

  it('lets an organization development decline and end when it has no members', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    w.macro.developments = {
      'development:test': {
        id: 'development:test',
        type: 'social_change',
        regionId: 'region-lower-austria',
        description: 'empty movement',
        severity: 0.5,
        start: date,
        end: { year: 1920, month: 1 },
        status: 'active',
        eventFamilyIds: ['vienna-social-movement'],
        organizationId: 'org-development-test',
        source: 'test',
      },
    };
    w.organizations['org-development-test'] = {
      id: 'org-development-test',
      name: 'Empty Movement',
      kind: 'other',
      placeId: 'place:home',
      memberIds: [],
      positions: [],
      treasury: 0,
      authorityRules: [],
      projects: [],
      status: 'active',
      causeIds: [],
    };
    let state = advanceDevelopmentLifecycle(w, w.macro, date);
    expect(state.developments!['development:test']!.status).toBe('declining');
    state = advanceDevelopmentLifecycle(w, state, { year: 1913, month: 1 });
    expect(state.developments!['development:test']!.status).toBe('ended');
  });

  it('closes a persistent acute illness instead of logging worsening forever', () => {
    const w = world();
    w.macro = defaultMacroState(w);
    w.persons['person:test']!.born = { year: 1872, month: 1 };
    w.persons['person:test']!.health.vitality = 0.8;
    w.persons['person:test']!.health.lastIllness = {
      name: 'pneumonia',
      since: { year: 1912, month: 1 },
      severity: 0.5,
    };
    const result = advanceV4Year(w, [], {
      eventRuntime: false,
      economy: { enabled: false },
      maxScenesPerPerson: 0,
    });
    const personal = result.events.filter((event) => event.subjectId === 'person:test');
    const worsening = personal.filter((event) => event.action === 'statistical_illness_worsened');
    const resolved = personal.filter(
      (event) => event.action === 'statistical_recovery' || event.action === 'statistical_death',
    );
    expect(worsening.length).toBeLessThanOrEqual(2);
    expect(resolved.length).toBe(1);
    expect(result.world.persons['person:test']!.health.lastIllness).toBeUndefined();
  });
});
