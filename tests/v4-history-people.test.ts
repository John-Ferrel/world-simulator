import { describe, expect, it } from 'vitest';
import { assertWorldV4 } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import {
  applyViennaHistoricalPeople,
  VIENNA_HISTORICAL_PEOPLE,
  VIENNA_HISTORY_PEOPLE_SOURCES,
} from '../packages/v4/content/vienna-history-people.js';

const CORE = [
  { id: 'person-sigmund-freud', qid: 'Q9215', born: { year: 1856, month: 5 } },
  { id: 'person-victor-adler', qid: 'Q366845', born: { year: 1852, month: 6 } },
  { id: 'person-karl-kraus', qid: 'Q44328', born: { year: 1874, month: 4 } },
  { id: 'person-arthur-schnitzler', qid: 'Q44331', born: { year: 1862, month: 5 } },
] as const;

const CORE_IDS: string[] = CORE.map((entry) => entry.id);
const applied = applyViennaHistoricalPeople(VIENNA_1912_SEED);

describe('Vienna historical people', () => {
  it('adds exactly the four core people with unique stable IDs', () => {
    const historical = Object.values(applied.persons).filter((person) => person.historicalIdentity);
    expect(historical.map((person) => person.id).sort()).toEqual([...CORE_IDS].sort());
    expect(Object.keys(VIENNA_HISTORICAL_PEOPLE).sort()).toEqual([...CORE_IDS].sort());

    for (const entry of CORE) {
      const person = applied.persons[entry.id];
      expect(person).toBeDefined();
      expect(person!.id).toBe(entry.id);
      expect(person!.born).toEqual(entry.born);
      expect(person!.historicalIdentity?.id).toBe(entry.qid);
      expect(person!.provenance.kind).toBe('historical_activation');
      expect(person!.provenance.sourceId).toBe(entry.qid);
    }
  });

  it('keeps real death dates as metadata only and never sets died', () => {
    for (const entry of CORE) {
      const person = applied.persons[entry.id]!;
      expect(person.died).toBeUndefined();
      expect(person.deathCause).toBeUndefined();
      expect(person.health.vitality).toBeGreaterThan(0);
      expect(person.historicalIdentity?.realWorldDeath).toBeDefined();
      expect(person.historicalIdentity?.biographyIsNotFate).toBe(true);
    }
  });

  it('gives each person a real identity, source list, household and place', () => {
    for (const entry of CORE) {
      const person = applied.persons[entry.id]!;
      const identity = person.historicalIdentity;
      expect(identity).toBeDefined();
      expect(identity!.birthPrecision).toBe('day');
      expect(identity!.occupation.length).toBeGreaterThan(0);
      expect(identity!.publicRole.length).toBeGreaterThan(0);
      expect(identity!.activityRegionIds).toContain('region-lower-austria');
      expect(identity!.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of identity!.sourceIds) {
        expect(VIENNA_HISTORY_PEOPLE_SOURCES[sourceId]).toBeDefined();
      }
      expect(identity!.activeFrom.year * 12 + identity!.activeFrom.month).toBeLessThanOrEqual(
        1900 * 12 + 1,
      );
      expect(identity!.activeTo).toBeDefined();
      expect(identity!.activeTo!.year).toBeGreaterThanOrEqual(1912);

      const household = applied.households[person.householdId];
      expect(household).toBeDefined();
      expect(household!.residenceId).toBe(person.locationId);
      expect(household!.memberIds).toContain(person.id);
      expect(applied.places[person.locationId]).toBeDefined();
      expect(applied.places[household!.residenceId]).toBeDefined();
    }
  });

  it('keeps historical households closed to player births', () => {
    for (const entry of CORE) {
      const person = applied.persons[entry.id]!;
      const household = applied.households[person.householdId]!;
      expect(household.guardianIds).toEqual([]);
      expect(household.memberIds).toEqual([person.id]);
      expect(person.guardianIds).toEqual([]);
    }
  });

  it('passes the domain invariant check', () => {
    expect(() => assertWorldV4(applied)).not.toThrow();
  });

  it('registers unique sources with http(s) URLs', () => {
    const entries = Object.entries(VIENNA_HISTORY_PEOPLE_SOURCES);
    expect(new Set(entries.map(([id]) => id)).size).toBe(entries.length);
    for (const [id, source] of entries) {
      expect(source.id).toBe(id);
      expect(source.title.length).toBeGreaterThan(0);
      expect(source.publisher.length).toBeGreaterThan(0);
      expect(source.note.length).toBeGreaterThan(0);
      expect(source.url).toMatch(/^https?:\/\//);
    }
  });

  it('connects curated organizations and positions to existing records', () => {
    const organizationIds = ['org-wednesday-psychological-society', 'org-sdap', 'org-die-fackel'];
    for (const organizationId of organizationIds) {
      const organization = applied.organizations[organizationId];
      expect(organization).toBeDefined();
      expect(applied.places[organization!.placeId]).toBeDefined();
      expect(organization!.memberIds.length).toBeGreaterThan(0);
      expect(organization!.positions.length).toBeGreaterThan(0);
      for (const memberId of organization!.memberIds) {
        expect(applied.persons[memberId]).toBeDefined();
      }
      for (const positionId of organization!.positions) {
        const position = applied.positions[positionId];
        expect(position).toBeDefined();
        expect(position!.organizationId).toBe(organizationId);
        expect(position!.holderId).toBeDefined();
        expect(applied.persons[position!.holderId!]).toBeDefined();
      }
    }

    expect(applied.organizations['org-wednesday-psychological-society']!.placeId).toBe(
      'place-wien-bergasse-19',
    );
    expect(applied.organizations['org-sdap']!.placeId).toBe('place-wien-arbeiter-zeitung');
    expect(applied.organizations['org-die-fackel']!.placeId).toBe('place-wien-die-fackel');

    const expectedPlaceKinds = {
      'place-wien-bergasse-19': 'home',
      'place-wien-adler-home': 'home',
      'place-wien-kraus-home': 'home',
      'place-wien-schnitzler-home': 'home',
      'place-wien-arbeiter-zeitung': 'other',
      'place-wien-die-fackel': 'other',
      'place-wien-cafe-central': 'cafe',
      'place-wien-burgtheater': 'other',
    } as const;
    for (const [placeId, kind] of Object.entries(expectedPlaceKinds)) {
      expect(applied.places[placeId]).toBeDefined();
      expect(applied.places[placeId]!.kind).toBe(kind);
    }
  });

  it('adds at most two sourced acquaintances among the historical people', () => {
    const relations = Object.values(applied.relations).filter(
      (relation) => CORE_IDS.includes(relation.a) && CORE_IDS.includes(relation.b),
    );
    expect(relations.length).toBeLessThanOrEqual(2);
    for (const relation of relations) {
      expect(relation.kind).toBe('acquaintance');
      expect(applied.persons[relation.a]!.relationshipIds).toContain(relation.id);
      expect(applied.persons[relation.b]!.relationshipIds).toContain(relation.id);
    }
  });

  it('does not mutate the input world and is idempotent', () => {
    expect(VIENNA_1912_SEED.persons['person-sigmund-freud']).toBeUndefined();

    const twice = applyViennaHistoricalPeople(applied);
    expect(Object.keys(twice.persons).length).toBe(Object.keys(applied.persons).length);
    expect(Object.keys(twice.relations).length).toBe(Object.keys(applied.relations).length);
    for (const entry of CORE) {
      expect(twice.persons[entry.id]!.relationshipIds).toEqual(
        applied.persons[entry.id]!.relationshipIds,
      );
    }
    expect(() => assertWorldV4(twice)).not.toThrow();
  });
});
