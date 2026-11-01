import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { pool } from '../packages/storage/index.js';
import {
  decodeV4PersonCursor,
  encodeV4PersonCursor,
  migrateV4,
  normalizeV4PersonLimit,
  V4CursorError,
  V4_PERSON_PAGE_DEFAULT,
  V4_PERSON_PAGE_MAX,
  v4PersonDetail,
  v4PersonSearch,
  v4PersonSummaries,
  v4WorldIndex,
} from '../packages/v4/store.js';
import type { EventFact, Household, Person, Place, Relation } from '../packages/v4/domain.js';

describe('v4 person page cursor (pure)', () => {
  it('round-trips a keyset cursor', () => {
    const cursor = { owned: 0 as const, name: 'anna bauer', id: 'person-anna-bauer' };
    expect(decodeV4PersonCursor(encodeV4PersonCursor(cursor))).toEqual(cursor);
  });

  it('rejects malformed or out-of-range cursors', () => {
    for (const value of [
      '',
      'not-base64-json',
      Buffer.from(JSON.stringify({ v: 2, o: 0, n: 'a', i: 'b' })).toString('base64url'),
      Buffer.from(JSON.stringify({ v: 1, o: 3, n: 'a', i: 'b' })).toString('base64url'),
      Buffer.from(JSON.stringify({ v: 1, o: 0, n: 7, i: 'b' })).toString('base64url'),
    ])
      expect(() => decodeV4PersonCursor(value)).toThrow(V4CursorError);
  });

  it('defaults and bounds the page size', () => {
    expect(normalizeV4PersonLimit(undefined)).toBe(V4_PERSON_PAGE_DEFAULT);
    expect(normalizeV4PersonLimit(1)).toBe(1);
    expect(normalizeV4PersonLimit(V4_PERSON_PAGE_MAX)).toBe(V4_PERSON_PAGE_MAX);
    expect(() => normalizeV4PersonLimit(0)).toThrow(RangeError);
    expect(() => normalizeV4PersonLimit(V4_PERSON_PAGE_MAX + 1)).toThrow(RangeError);
    expect(() => normalizeV4PersonLimit(1.5)).toThrow(RangeError);
  });
});

const databaseUrl = process.env.DATABASE_URL ?? '';
const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
const enabled = process.env.TEST_DATABASE === '1' && /_test$/.test(databaseName);

function traits(): Person['traits'] {
  return {
    care: 0.5,
    ambition: 0.5,
    tradition: 0.5,
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  };
}

function person(
  id: string,
  name: string,
  householdId: string,
  options: { ownerId?: string; died?: { year: number; month: number } } = {},
): Person {
  return {
    id,
    name,
    ownerId: options.ownerId,
    sex: 'female',
    born: { year: 1900, month: 1 },
    died: options.died,
    deathCause: options.died ? 'read-path test death' : undefined,
    locationId: 'place-home',
    householdId,
    parentIds: [],
    guardianIds: [],
    health: { vitality: options.died ? 0 : 0.8, conditions: [], nutrition: 0.8 },
    traits: traits(),
    education: { status: 'primary', level: 1 },
    roles: [],
    projectIds: [],
    relationshipIds: [],
    knowledgeIds: [],
    life: {
      mood: 0,
      reputation: 0,
      skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
      flags: [],
    },
    provenance: { kind: 'initial' },
  };
}

function event(
  id: string,
  subjectId: string,
  visibility: EventFact['visibility'],
  options: { participantId?: string; placeId?: string } = {},
): EventFact {
  return {
    id,
    date: { year: 1912, month: 1 },
    placeId: options.placeId,
    subjectId,
    participants: [
      { personId: subjectId, role: 'subject' },
      ...(options.participantId ? [{ personId: options.participantId, role: 'sibling' }] : []),
    ],
    action: 'read-path-event',
    causes: [],
    effects: [],
    immediateText: 'A committed read-path event.',
    significance: 0.2,
    visibility,
    provenance: { kind: 'system' },
  };
}

describe.skipIf(!enabled)('v4 read path against PostgreSQL', () => {
  const worldId = `v4-read-path-${randomUUID()}`;
  const persons: Person[] = [];
  const places: Place[] = [
    {
      id: 'place-home',
      name: 'Home',
      kind: 'home',
      settlementId: 'vienna',
      offers: [],
    },
    {
      id: 'place-workshop',
      name: 'Workshop',
      kind: 'factory',
      settlementId: 'vienna',
      offers: [],
    },
  ];
  const households: Household[] = [
    {
      id: 'hh-a',
      residenceId: 'place-home',
      memberIds: ['person-anna', 'person-bea'],
      guardianIds: [],
      cash: 1,
      food: 1,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'pooled',
    },
    {
      id: 'hh-b',
      residenceId: 'place-home',
      memberIds: ['person-cara', 'person-dora', 'person-eli'],
      guardianIds: [],
      cash: 1,
      food: 1,
      debt: 0,
      rent: 1,
      obligations: [],
      assets: [],
      sharingRules: 'pooled',
    },
  ];
  const anna = person('person-anna', 'Anna', 'hh-a');
  const bea = person('person-bea', 'Bea', 'hh-a');
  const cara = person('person-cara', 'Cara', 'hh-b');
  const dora = person('person-dora', 'Dora', 'hh-b', { ownerId: 'user-read-path' });
  const eli = person('person-eli', 'Eli', 'hh-b', { died: { year: 1911, month: 12 } });
  persons.push(anna, bea, cara, dora, eli);
  const relation: Relation = {
    id: 'relation-anna-bea',
    a: 'person-anna',
    b: 'person-bea',
    kind: 'kin',
    trust: 0.7,
    affection: 0.6,
    obligation: 0.5,
    fear: 0,
    respect: 0.5,
    start: { year: 1900, month: 1 },
    sharedEventIds: [],
  };
  anna.relationshipIds.push(relation.id);
  bea.relationshipIds.push(relation.id);
  const events: EventFact[] = [
    event('event-anna-public', 'person-anna', 'public'),
    event('event-anna-private', 'person-anna', 'private'),
    event('event-anna-workshop', 'person-anna', 'public', {
      participantId: 'person-bea',
      placeId: 'place-workshop',
    }),
    event('event-bea-public', 'person-bea', 'public'),
  ];

  beforeAll(async () => {
    await migrateV4();
    await pool.query(
      `INSERT INTO v4_worlds(id,seed,status,date_year,date_month,seconds_per_year,months_per_tick,pressures,history_meta,revision,last_tick_at)
       VALUES($1,'read-path-test','archived',1912,1,30,12,'{}','{}',1,now())`,
      [worldId],
    );
    await pool.query(
      `INSERT INTO v4_places(world_id,id,payload)
       SELECT $1,item->>'id',item FROM jsonb_array_elements($2::jsonb) AS item`,
      [worldId, JSON.stringify(places)],
    );
    await pool.query(
      `INSERT INTO v4_households(world_id,id,payload)
       SELECT $1,item->>'id',item FROM jsonb_array_elements($2::jsonb) AS item`,
      [worldId, JSON.stringify(households)],
    );
    await pool.query(
      `INSERT INTO v4_persons(world_id,id,payload)
       SELECT $1,item->>'id',item FROM jsonb_array_elements($2::jsonb) AS item`,
      [worldId, JSON.stringify(persons)],
    );
    await pool.query(
      `INSERT INTO v4_relations(world_id,id,payload)
       SELECT $1,item->>'id',item FROM jsonb_array_elements($2::jsonb) AS item`,
      [worldId, JSON.stringify([relation])],
    );
    await pool.query(
      `INSERT INTO v4_events(world_id,id,date_year,date_month,subject_id,payload)
       SELECT $1,item->>'id',(item->'date'->>'year')::int,
              (item->'date'->>'month')::int,item->>'subjectId',item
       FROM jsonb_array_elements($2::jsonb) AS item`,
      [worldId, JSON.stringify(events)],
    );
  });

  afterAll(async () => {
    try {
      const tables = [
        'v4_birth_contracts',
        'v4_birth_requests',
        'v4_events',
        'v4_scenes',
        'v4_knowledge',
        'v4_relations',
        'v4_interactions',
        'v4_projects',
        'v4_positions',
        'v4_organizations',
        'v4_persons',
        'v4_households',
        'v4_places',
      ];
      for (const table of tables)
        await pool.query(`DELETE FROM ${table} WHERE world_id=$1`, [worldId]);
      await pool.query('DELETE FROM v4_worlds WHERE id=$1', [worldId]);
    } finally {
      await pool.end();
    }
  });

  it('returns world counts and reference lists without person payloads', async () => {
    const index = await v4WorldIndex(worldId);
    expect(index).toBeDefined();
    expect(index!.peopleTotal).toBe(5);
    expect(index!.peopleAlive).toBe(4);
    expect(index!.householdCount).toBe(2);
    expect(index!.places.map((place) => place.id).sort()).toEqual(['place-home', 'place-workshop']);
    expect(index!.organizations).toEqual([]);
    expect((index as any).persons).toBeUndefined();
  });

  it('pages person summaries by keyset, owned first, without full payloads', async () => {
    const first = await v4PersonSummaries(worldId, { limit: 2 });
    expect(first.total).toBe(5);
    expect(first.alive).toBe(4);
    expect(first.people.map((summary) => summary.id)).toEqual(['person-dora', 'person-anna']);
    expect(first.nextCursor).toBeTruthy();
    expect(first.people[1]!.placeName).toBe('Home');
    expect(first.people[1]!.health.vitality).toBe(0.8);
    expect((first.people[1] as any).traits).toBeUndefined();
    expect((first.people[1] as any).life).toBeUndefined();
    expect((first.people[1] as any).projectIds).toBeUndefined();

    const second = await v4PersonSummaries(worldId, {
      limit: 2,
      cursor: first.nextCursor,
    });
    expect(second.people.map((summary) => summary.id)).toEqual(['person-bea', 'person-cara']);
    expect(second.nextCursor).toBeTruthy();

    const third = await v4PersonSummaries(worldId, {
      limit: 2,
      cursor: second.nextCursor,
    });
    expect(third.people.map((summary) => summary.id)).toEqual(['person-eli']);
    expect(third.nextCursor).toBeUndefined();
    expect(third.people[0]!.died).toEqual({ year: 1911, month: 12 });
  });

  it('rejects a tampered cursor instead of silently restarting', async () => {
    await expect(v4PersonSummaries(worldId, { cursor: 'tampered' })).rejects.toBeInstanceOf(
      V4CursorError,
    );
  });

  it('searches names with literal matching and a bounded result set', async () => {
    expect((await v4PersonSearch(worldId, 'ann')).map((person) => person.id)).toEqual([
      'person-anna',
    ]);
    expect(await v4PersonSearch(worldId, '%')).toEqual([]);
    expect(await v4PersonSearch(worldId, '   ')).toEqual([]);
  });

  it('loads one person with household, relations and only their events', async () => {
    const detail = await v4PersonDetail(worldId, 'person-anna');
    expect(detail).toBeDefined();
    expect(detail!.person.id).toBe('person-anna');
    expect(detail!.person.traits.care).toBe(0.5);
    expect(detail!.household?.id).toBe('hh-a');
    expect(detail!.residence?.id).toBe('place-home');
    expect(detail!.place?.id).toBe('place-home');
    expect(detail!.relations.map((item) => item.id)).toEqual(['relation-anna-bea']);
    expect(detail!.events.map((item) => item.id).sort()).toEqual([
      'event-anna-private',
      'event-anna-public',
      'event-anna-workshop',
    ]);
    expect(detail!.worldEvents.map((item) => item.id).sort()).toEqual([
      'event-anna-private',
      'event-anna-public',
      'event-anna-workshop',
      'event-bea-public',
    ]);
    expect(detail!.people.map((item) => item.id).sort()).toEqual(['person-anna', 'person-bea']);
    expect(detail!.lookups.personNames['person-bea']).toBe('Bea');
    expect(detail!.lookups.placeNames['place-workshop']).toBe('Workshop');
  });

  it('returns undefined for a person outside the requested world', async () => {
    expect(await v4PersonDetail(worldId, 'person-missing')).toBeUndefined();
  });
});
