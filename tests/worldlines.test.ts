import { describe, expect, it } from 'vitest';
import { population, type HistoricalEvent } from '../packages/contracts/index.js';
import type { Emit } from '../packages/simulation-core/index.js';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import {
  activateRegisteredPeople,
  advanceWorldlines,
  evaluateHistoricalInput,
  HISTORICAL_PEOPLE,
  HISTORICAL_PEOPLE_SOURCE_URL,
  historicalDisposition,
  type HistoricalPersonRecord,
  type WorldlineState,
} from '../packages/worldlines/index.js';

function collector() {
  const events: HistoricalEvent[] = [];
  const emit: Emit = (
    kind,
    personIds,
    locationId,
    text,
    data = {},
    causeIds = [],
    significance = 0.5,
  ) => {
    const e: HistoricalEvent = {
      id: `test:e${events.length + 1}`,
      worldId: 'test',
      month: 0,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(e);
    return e;
  };
  return { events, emit };
}

describe('historical input dispositions', () => {
  it('separates future inputs, incompatible conditions, and missing geographies', () => {
    const w = createEarthWorld('worldline-dispositions');
    expect(historicalDisposition(w, { id: 'future', date: '1940-01' })).toBe('historical');
    w.month = 40 * 12;
    expect(
      historicalDisposition(w, {
        id: 'blocked',
        date: '1939-01',
        requires: [{ kind: 'shock-exists', id: 'wwii-europe' }],
      }),
    ).toBe('branched');
    expect(historicalDisposition(w, { id: 'wwii-europe', date: '1939-09' })).toBe('suppressed');
    // A different fixture establishes Poland; absence of the earlier war chain then
    // produces a branch rather than silently creating a state from a date-table.
    const poland = w.sovereignty!.modernPolityRegistry.find((p) => p.id === 'POL')!;
    w.polities.push({ ...poland, treasury: 0 });
    expect(historicalDisposition(w, { id: 'wwii-europe', date: '1939-09' })).toBe('branched');
    expect(
      historicalDisposition(w, { id: 'outside-map', date: '1939-01', countries: ['ZZZ'] }),
    ).toBe('suppressed');
    expect(evaluateHistoricalInput(w, 'unknown-input')).toBe('historical');
    expect(evaluateHistoricalInput(w, 'wwi-armistice-effect')).toBe('branched');
    w.shocks = [
      {
        id: 'wwi',
        kind: 'war',
        locationIds: [],
        started: 174,
        ends: 240,
        severity: 0.4,
        causeId: 'event:wwi',
      },
      {
        id: 'versailles',
        kind: 'reform',
        locationIds: [],
        started: 233,
        ends: 245,
        severity: 0.2,
        causeId: 'event:versailles',
      },
    ];
    expect(
      historicalDisposition(w, { id: 'wwii-europe', date: '1939-09', countries: ['DEU', 'POL'] }),
    ).toBe('historical');
    w.polities = w.polities.filter((p) => p.id !== 'POL');
    expect(historicalDisposition(w, { id: 'wwii-europe', date: '1939-09' })).toBe('suppressed');
  });

  it('treats an unactivated person as unknown and only branches after a committed death', () => {
    const w = createEarthWorld('worldline-person-condition');
    w.month = 20 * 12;
    const input = {
      id: 'leadership-dependent',
      date: '1918-01',
      requires: [{ kind: 'person-alive', personId: 'historical-Q1394' }] as const,
    };
    expect(historicalDisposition(w, input)).toBe('historical');
    const p = w.persons[0];
    p.id = 'historical-Q1394';
    p.death = w.month;
    p.deathCause = '已记录的模拟死亡';
    expect(historicalDisposition(w, input)).toBe('branched');
  });

  it('reads typed industrial stocks and technology from actual world state', () => {
    const w = createEarthWorld('worldline-industry-condition');
    w.month = 12;
    const input = {
      id: 'industrial-readiness',
      date: '1901-01',
      requires: [
        { kind: 'industry-stock-at-least', polityId: 'USA', good: 'medicine', amount: 5 },
        { kind: 'industry-technology-at-least', polityId: 'USA', value: 0.5 },
      ] as const,
    };
    expect(historicalDisposition(w, input)).toBe('branched');
    const stocks = { coal: 0, ore: 0, steel: 0, oil: 0, arms: 0, medicine: 5 };
    w.industry = {
      version: 1,
      month: 12,
      polities: {
        USA: {
          goods: stocks,
          capacity: stocks,
          prices: stocks,
          technology: 0.7,
          investment: 0,
          laborShare: 0.5,
          lastShortages: [],
        },
      },
      ledger: { initial: stocks, produced: stocks, consumed: stocks, destroyed: stocks },
      lastEventIds: ['industry-event-1'],
    };
    expect(historicalDisposition(w, input)).toBe('historical');
  });

  it('schedules bounded effects only from observed source shocks and carries their causal witnesses', () => {
    const w = createEarthWorld('worldline-causality');
    w.month = 45 * 12 + 8;
    w.shocks = [
      {
        id: 'wwi',
        kind: 'war',
        locationIds: [],
        started: 174,
        ends: 226,
        severity: 0.5,
        causeId: 'event:wwi',
      },
      {
        id: 'armistice-1918',
        kind: 'peace',
        locationIds: [],
        started: 226,
        ends: 238,
        severity: 0.2,
        causeId: 'event:armistice',
      },
      {
        id: 'pacific-war',
        kind: 'war',
        locationIds: [],
        started: 503,
        ends: 700,
        severity: 0.6,
        causeId: 'event:pacific-war',
      },
      {
        id: 'japan-reconstruction',
        kind: 'reform',
        locationIds: [],
        started: 548,
        ends: 560,
        severity: 0.3,
        causeId: 'event:surrender',
      },
      {
        id: 'penicillin-discovery',
        kind: 'innovation',
        locationIds: [],
        started: 336,
        ends: 348,
        severity: 0.2,
        causeId: 'event:penicillin-discovery',
      },
      {
        id: 'penicillin-clinical',
        kind: 'innovation',
        locationIds: [],
        started: 492,
        ends: 504,
        severity: 0.3,
        causeId: 'event:penicillin-clinical',
      },
    ];
    const { emit, events } = collector();
    advanceWorldlines(w, emit, new Map());
    const state = (w as typeof w & { worldlines?: WorldlineState }).worldlines!;
    expect(state.firedInputs).toEqual(
      expect.arrayContaining([
        'wwi-armistice-effect',
        'japan-surrender-effect',
        'clinical-penicillin-healthcare',
      ]),
    );
    const armistice = events.find((e) => e.data.sourceId === 'wwi-armistice-effect')!;
    expect(armistice.causeIds).toEqual(expect.arrayContaining(['event:wwi', 'event:armistice']));
    expect(
      state.pendingEffects.some(
        (e) =>
          e.effect.kind === 'end-shock' &&
          e.effect.shockId === 'wwi' &&
          e.causeIds.includes(armistice.id),
      ),
    ).toBe(true);
    expect(
      state.pendingEffects.some(
        (e) => e.effect.kind === 'end-shock' && e.effect.shockId === 'pacific-war',
      ),
    ).toBe(true);
    expect(
      state.effects.some(
        (e) =>
          e.effect.kind === 'settlement-healthcare-delta' &&
          e.inputId === 'clinical-penicillin-healthcare',
      ),
    ).toBe(true);
    expect(events.filter((e) => e.kind === 'worldline_effect_scheduled')).toHaveLength(3);
    expect(events.filter((e) => e.kind === 'historical_person_activated')).toHaveLength(128);
  });
});

it('ships a substantial, source-linked named-person catalogue without treating coverage as population', () => {
  expect(HISTORICAL_PEOPLE.length).toBeGreaterThan(20000);
  expect(new Set(HISTORICAL_PEOPLE.map((p) => p.qid)).size).toBe(HISTORICAL_PEOPLE.length);
  expect(new Set(HISTORICAL_PEOPLE.map((p) => p.countryId)).size).toBeGreaterThan(100);
  expect(
    HISTORICAL_PEOPLE.every(
      (p) =>
        p.sourceUrl === HISTORICAL_PEOPLE_SOURCE_URL &&
        p.wikidataUrl === `https://www.wikidata.org/wiki/${p.qid}`,
    ),
  ).toBe(true);
  const ids = new Set(HISTORICAL_PEOPLE.map((p) => p.qid));
  for (const qid of ['Q352', 'Q1394', 'Q1001', 'Q8016', 'Q937', 'Q5816', 'Q76', 'Q7747'])
    expect(ids.has(qid)).toBe(true);
});

it('activates a registered historical person from an adult cohort exactly once and does not impose historical death', () => {
  const w = createEarthWorld('worldline-people');
  const country = w.polities.find((p) => p.id === 'GBR')!;
  const record: HistoricalPersonRecord = {
    qid: 'Q42',
    name: 'Example sourced person',
    birthYear: 1870,
    birthMonth: -30 * 12,
    birthPrecision: 'day',
    countryId: country.id,
    countryLabel: 'United Kingdom',
    countryBasis: 'birthplace-modern-country',
    languageEditions: 50,
    deathYear: 1980,
    deathMonth: 80 * 12,
    sourceUrl: HISTORICAL_PEOPLE_SOURCE_URL,
    wikidataUrl: 'https://www.wikidata.org/wiki/Q42',
  };
  const before = population(w),
    { emit } = collector(),
    locals = new Map();
  const cashBefore =
    w.settlements.reduce((n, s) => n + s.coin, 0) + w.persons.reduce((n, p) => n + p.coin, 0);
  activateRegisteredPeople(w, emit, locals, [record]);
  expect(w.persons.find((p) => p.id === 'historical-Q42')?.name).toBe(record.name);
  expect(w.persons.find((p) => p.id === 'historical-Q42')?.death).toBeUndefined();
  expect(population(w)).toBe(before);
  expect(
    w.settlements.reduce((n, s) => n + s.coin, 0) + w.persons.reduce((n, p) => n + p.coin, 0),
  ).toBe(cashBefore);
  activateRegisteredPeople(w, emit, locals, [record]);
  expect(w.persons.filter((p) => p.id === 'historical-Q42')).toHaveLength(1);
  expect(population(w)).toBe(before);
  const young = { ...record, qid: 'Q43', birthYear: 1890, birthMonth: -10 * 12 };
  activateRegisteredPeople(w, emit, locals, [young]);
  expect(w.persons.find((p) => p.id === 'historical-Q43')?.occupation).toBe('孩童');
  const baselineDead = { ...record, qid: 'Q44', deathYear: 1899, deathMonth: -12 };
  activateRegisteredPeople(w, emit, locals, [baselineDead]);
  expect(w.persons.some((p) => p.id === 'historical-Q44')).toBe(false);
});

it('uses the selected calendar baseline and persists a fair activation budget', () => {
  const w = createEarthWorld('worldline-activation-budget', 1, 300, 2020);
  const country = w.polities.find((p) => p.id === 'USA')!;
  const seed: HistoricalPersonRecord = {
    qid: 'Q42',
    name: 'Budget sample',
    birthYear: 1990,
    birthMonth: 90 * 12 + 5,
    birthPrecision: 'day',
    countryId: country.id,
    countryLabel: 'United States',
    countryBasis: 'birthplace-modern-country',
    languageEditions: 50,
    deathYear: 2050,
    deathMonth: 150 * 12,
    sourceUrl: HISTORICAL_PEOPLE_SOURCE_URL,
    wikidataUrl: 'https://www.wikidata.org/wiki/Q42',
  };
  const rows = Array.from({ length: 300 }, (_, i) => ({
    ...seed,
    qid: `Q${1000 + i}`,
    name: `Person ${i}`,
    wikidataUrl: `https://www.wikidata.org/wiki/Q${1000 + i}`,
  }));
  let { emit } = collector();
  activateRegisteredPeople(w, emit, new Map(), rows);
  expect(w.persons.length).toBe(1500 + 128);
  const state = (w as typeof w & { worldlines?: WorldlineState }).worldlines!;
  expect(state.personCursor).toBeGreaterThan(0);
  expect(state.pendingPeople).toBeGreaterThan(0);
  // 1990/June is 30 years old in a 2020 world: stored month offsets must remain baseline-relative.
  const person = w.persons.find((p) => p.id === 'historical-Q1000')!;
  expect(w.month - person.birth).toBe(1440 - seed.birthMonth!);
  activateRegisteredPeople(w, emit, new Map(), rows);
  expect(w.persons.length).toBe(1500 + 256);
  expect(w.persons.find((p) => p.id === 'historical-Q1000')!.death).toBeUndefined();
});

it('activates a historical child from the child cohort without an adulthood survival guarantee', () => {
  const w = createEarthWorld('historical-child');
  const before = population(w),
    children = w.settlements.reduce((n, s) => n + s.cohort.children, 0),
    adults = w.settlements.reduce((n, s) => n + s.cohort.adults, 0);
  const child: HistoricalPersonRecord = {
    qid: 'Q987654',
    name: 'Historical child fixture',
    birthYear: 1895,
    birthPrecision: 'year',
    countryId: 'FRA',
    countryLabel: 'France',
    countryBasis: 'birthplace-modern-country',
    languageEditions: 50,
    sourceUrl: HISTORICAL_PEOPLE_SOURCE_URL,
    wikidataUrl: 'https://www.wikidata.org/wiki/Q987654',
  };
  const { emit } = collector();
  activateRegisteredPeople(w, emit, new Map(), [child]);
  const p = w.persons.find((p) => p.id === 'historical-Q987654')!;
  expect(p.occupation).toBe('孩童');
  expect(p.coin).toBe(0);
  expect(w.month - p.birth).toBe(5 * 12);
  expect(w.settlements.reduce((n, s) => n + s.cohort.children, 0)).toBe(children - 1);
  expect(w.settlements.reduce((n, s) => n + s.cohort.adults, 0)).toBe(adults);
  expect(population(w)).toBe(before);
});
