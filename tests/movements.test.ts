import { describe, expect, it } from 'vitest';
import type { HistoricalEvent, Person, Settlement, World } from '../packages/contracts/index.js';
import {
  advanceMovements,
  summarizeMovementSupport,
  type MovementState,
} from '../packages/movements/index.js';
import type { Emit } from '../packages/simulation-core/index.js';

const place = (): Settlement => ({
  id: 'town',
  regionId: 'region-x',
  name: 'Town',
  x: 0,
  y: 0,
  biome: 'plains',
  neighbors: ['nearby'],
  polityId: 'local',
  cohort: { id: 'town-cohort', children: 100, adults: 10000, elders: 50 },
  food: 10000,
  coin: 1000,
  fertility: 0.5,
  knowledge: 0.2,
  prosperity: 0.5,
  scarcity: 0.15,
  price: 1,
  unrest: 0.25,
  birthRemainder: 0,
  deathRemainder: 0,
  economy: {
    unemployment: 0.15,
    healthcare: 0.5,
    education: 0.4,
    infrastructure: 0.3,
    inflation: 0.02,
    productionMultiplier: 1,
    tradeMultiplier: 1,
  },
});
const person = (id: string, ownerId?: string): Person => ({
  id,
  version: 0,
  name: `Person ${id}`,
  ownerId,
  birth: -480,
  locationId: 'town',
  originCohortId: 'cohort-x',
  parents: [],
  householdId: `home-${id}`,
  occupation: '织工',
  coin: 40,
  health: 1,
  stress: 0.2,
  values: { care: 0.7, ambition: 0.5, tradition: 0.5 },
  skills: { craft: 0.3, learning: 0.2 },
  goals: [],
  memories: [],
  beliefs: [],
  relationships: [],
  plans: [],
  commitments: [],
  appearance: { skin: 0, hair: 0, clothes: 0 },
});
function world(coin = 1000): World {
  const town = place();
  town.coin = coin;
  return {
    schema: 'slw/1',
    id: 'movement-world',
    seed: 'movement-seed',
    epoch: 0,
    month: 17,
    revision: 0,
    pack: { id: 'test', version: '1' },
    status: 'running',
    parameters: { researchRate: 1 },
    baselinePopulation: 10150,
    collapseMonths: 0,
    maxYears: 100,
    settlements: [town],
    polities: [],
    persons: [person('p1'), person('p2'), person('p3')],
    organizations: [],
    conflicts: [],
    claims: [],
    eventSeq: 0,
    appliedCommands: [],
    processedJobs: [],
    audit: { producedFood: 0, consumedFood: 0, destroyedFood: 0, births: 0, deaths: 0 },
    terminalEvidence: [],
  };
}
function eventsFor(
  w: World,
  actions: string[],
  people = w.persons.map((p) => p.id),
): HistoricalEvent[] {
  return actions.map((action, i) => ({
    id: `e-${w.month}-${i}-${action}`,
    worldId: w.id,
    month: w.month,
    kind: 'agenda_step_completed',
    personIds: [people[i % people.length]!],
    locationId: 'town',
    text: 'Public action',
    data: {
      action,
      ideology: action === 'campaign' ? 'nationalist' : undefined,
      classification: 'executed-agent-action',
    },
    causeIds: [],
    significance: 0.6,
  }));
}
function emitter(events: HistoricalEvent[]): Emit {
  return (kind, people, locationId, text, data = {}, causeIds = [], significance = 0.5) => {
    const event: HistoricalEvent = {
      id: `out-${events.length + 1}`,
      worldId: 'movement-world',
      month: 17,
      kind,
      personIds: people,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(event);
    return event;
  };
}
function installSubordinateAuthority(w: World) {
  (w as World & { sovereignty?: unknown }).sovereignty = {
    version: 1,
    mode: 'historical-start',
    baselineDate: '1900-01-01',
    sourceSha256: 'fixture',
    initializedMonth: 0,
    modernPolityRegistry: [],
    authorities: {
      town: {
        settlementId: 'town',
        modernRegionId: 'region-x',
        initialLocalPolityId: 'local',
        observedSettlementPolityId: 'local',
        baseline: { matchStatus: 'matched', status: 'colony' },
        current: {
          status: 'colony',
          sovereignPolityId: 'empire',
          controllerPolityId: 'local',
          source: 'cshapes-1900-baseline',
          causeIds: [],
        },
      },
    },
    changes: [],
    revenueReceipts: [],
  };
}
function locals(w: World) {
  return new Map([['town', w.persons.filter((p) => p.death === undefined && !p.journey)]]);
}
function totalMoney(w: World) {
  return (
    w.settlements.reduce((sum, s) => sum + s.coin, 0) +
    w.persons.reduce((sum, p) => sum + p.coin, 0) +
    Object.values((w as World & { movements?: MovementState }).movements?.movements ?? {}).reduce(
      (sum, movement) => sum + movement.treasury,
      0,
    )
  );
}
const movementState = (w: World) => (w as World & { movements?: MovementState }).movements;

describe('evidence-based political movements', () => {
  it('requires three present adult organizers, real public evidence, and available funds', () => {
    const w = world(0);
    installSubordinateAuthority(w);
    w.persons.forEach((p) => (p.coin = 0));
    const output: HistoricalEvent[] = [];
    advanceMovements(w, emitter(output), locals(w), []);
    expect(movementState(w)?.movements).toEqual({});

    w.month++;
    advanceMovements(w, emitter(output), locals(w), eventsFor(w, ['campaign', 'campaign']));
    expect(Object.keys(movementState(w)!.movements)).toHaveLength(0);

    w.month++;
    w.settlements[0]!.coin = 1000;
    const evidence = eventsFor(w, ['campaign', 'campaign', 'campaign']);
    advanceMovements(w, emitter(output), locals(w), evidence);
    const summaries = summarizeMovementSupport(w, 'region-x', 'local');
    expect(summaries).toHaveLength(1);
    expect(summaries[0]!.orientation).toBe('independence');
    expect(summaries[0]!.qualified).toBe(true);
    expect(summaries[0]!.sourceIds).toEqual(evidence.map((event) => event.id));
  });

  it('transfers campaign money without changing total resources or cohort population', () => {
    const w = world();
    installSubordinateAuthority(w);
    const beforeMoney = totalMoney(w);
    const beforePopulation = w.settlements[0]!.cohort.adults + w.settlements[0]!.cohort.children;
    const output: HistoricalEvent[] = [];
    const evidence = eventsFor(w, ['campaign', 'campaign', 'campaign']);
    advanceMovements(w, emitter(output), locals(w), evidence);
    expect(totalMoney(w)).toBeCloseTo(beforeMoney);
    expect(w.settlements[0]!.cohort.adults + w.settlements[0]!.cohort.children).toBe(
      beforePopulation,
    );
    const movement = Object.values(
      (w as World & { movements?: MovementState }).movements!.movements,
    )[0]!;
    expect(movement.treasury).toBeGreaterThan(0);
    expect(output.some((event) => event.kind === 'movement_formed')).toBe(true);
    expect(output.find((event) => event.kind === 'movement_formed')!.data.populationAdded).toBe(0);
  });

  it('builds bounded normalized support over decades, idempotently, without changing population', () => {
    const w = world();
    installSubordinateAuthority(w);
    const output: HistoricalEvent[] = [];
    const startMonth = w.month;
    for (let month = startMonth; month < startMonth + 480; month++) {
      w.month = month;
      advanceMovements(
        w,
        emitter(output),
        locals(w),
        eventsFor(w, ['campaign', 'campaign', 'campaign']),
      );
      if (month === 17) {
        const snapshot = structuredClone(movementState(w));
        const emitted = output.length;
        advanceMovements(
          w,
          emitter(output),
          locals(w),
          eventsFor(w, ['campaign', 'campaign', 'campaign']),
        );
        expect(movementState(w)).toEqual(snapshot);
        expect(output).toHaveLength(emitted);
      }
    }
    const summary = summarizeMovementSupport(w, 'region-x', 'local')[0]!;
    expect(summary.aggregateSupporters).toBeGreaterThan(10);
    expect(summary.aggregateSupporters).toBeLessThanOrEqual(10000 - summary.namedOrganizerCount);
    expect(summary.interpretation).toBe('normalized-scenario-support-tags-not-a-poll');
    expect(w.settlements[0]!.cohort.adults).toBe(10000);
  });

  it('lets repression and reform change support decay with recorded causes', () => {
    const base = world();
    installSubordinateAuthority(base);
    const output: HistoricalEvent[] = [];
    advanceMovements(
      base,
      emitter(output),
      locals(base),
      eventsFor(base, ['campaign', 'campaign', 'campaign']),
    );
    for (let i = 0; i < 120; i++) {
      base.month++;
      advanceMovements(
        base,
        emitter(output),
        locals(base),
        eventsFor(base, ['campaign', 'campaign', 'campaign']),
      );
    }
    const pressed = structuredClone(base);
    const reformed = structuredClone(base);
    const previous = summarizeMovementSupport(base, 'region-x', 'local')[0]!.aggregateSupporters;
    pressed.month++;
    const repression: HistoricalEvent = {
      id: 'repression-proof',
      worldId: pressed.id,
      month: pressed.month,
      kind: 'political_repression',
      personIds: [],
      locationId: 'town',
      text: 'Public repression record',
      data: {},
      causeIds: [],
      significance: 0.8,
    };
    advanceMovements(pressed, emitter([]), locals(pressed), [repression]);
    reformed.month++;
    const reform: HistoricalEvent = {
      id: 'reform-proof',
      worldId: reformed.id,
      month: reformed.month,
      kind: 'political_reform',
      personIds: [],
      locationId: 'town',
      text: 'Public reform record',
      data: {},
      causeIds: [],
      significance: 0.8,
    };
    advanceMovements(reformed, emitter([]), locals(reformed), [reform]);
    expect(
      summarizeMovementSupport(pressed, 'region-x', 'local')[0]!.aggregateSupporters,
    ).toBeLessThan(previous);
    expect(
      summarizeMovementSupport(reformed, 'region-x', 'local')[0]!.aggregateSupporters,
    ).toBeLessThan(previous);
    expect(
      summarizeMovementSupport(pressed, 'region-x', 'local')[0]!.aggregateSupporters,
    ).toBeLessThan(summarizeMovementSupport(reformed, 'region-x', 'local')[0]!.aggregateSupporters);
  });

  it('gives owned organizers the same movement physics as NPC organizers', () => {
    const a = world();
    const b = structuredClone(a);
    installSubordinateAuthority(a);
    installSubordinateAuthority(b);
    a.persons[0]!.ownerId = 'owner';
    const outA: HistoricalEvent[] = [];
    const outB: HistoricalEvent[] = [];
    const evidenceA = eventsFor(a, ['campaign', 'campaign', 'campaign']);
    const evidenceB = eventsFor(b, ['campaign', 'campaign', 'campaign']);
    advanceMovements(a, emitter(outA), locals(a), evidenceA);
    advanceMovements(b, emitter(outB), locals(b), evidenceB);
    delete a.persons[0]!.ownerId;
    expect(movementState(a)).toEqual(movementState(b));
    expect(outA).toEqual(outB);
  });

  it('does not create movements from two organizers or make any sovereignty change', () => {
    const w = world();
    installSubordinateAuthority(w);
    const beforeAuthority = structuredClone(
      (w as World & { sovereignty: { authorities: unknown } }).sovereignty.authorities,
    );
    const output: HistoricalEvent[] = [];
    advanceMovements(w, emitter(output), locals(w), eventsFor(w, ['petition', 'organize']));
    expect(Object.keys(movementState(w)!.movements)).toHaveLength(0);
    expect(
      (w as World & { sovereignty: { authorities: unknown } }).sovereignty.authorities,
    ).toEqual(beforeAuthority);
    expect(summarizeMovementSupport(w, 'region-x', 'local')).toEqual([]);
  });
});
