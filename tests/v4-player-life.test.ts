import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SCENES,
  VIENNA_1912_SEED,
} from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { assertWorldV4, type EventFact, type WorldState } from '../packages/v4/domain.js';

function playerLife() {
  const birth = createV4Birth(
    structuredClone(VIENNA_1912_SEED),
    {
      name: 'Klara',
      sex: 'female',
      health: 0.8,
      wish: '识字，能在印刷厂找到不用把手指送进机器的活。',
      lifeMode: 'ordinary',
      appearance: { skin: 1, hair: 0, clothes: 2, doll: { bodyType: 'female' } },
    },
    'integration-life',
    'owner-integration',
  );
  let world: WorldState = birth.world;
  const childId = birth.childId;
  const events: EventFact[] = [birth.event];
  for (let i = 0; i < 42 && !world.persons[childId]?.died; i++) {
    world = applyViennaTimeline(world);
    const result = advanceV4Year(world, [...VIENNA_1912_SCENES, ...VIENNA_LIFE_SCENES], {
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    world = result.world;
    events.push(...result.events);
  }
  return { world, childId, events };
}

describe('player-born Vienna life', () => {
  it('runs from birth into adult work without unresolved template tokens', () => {
    const { world, childId, events } = playerLife();
    const childEvents = events.filter(
      (event) =>
        event.subjectId === childId ||
        event.participants.some((participant) => participant.personId === childId),
    );
    expect(childEvents.length).toBeGreaterThanOrEqual(6);
    for (const event of childEvents) {
      expect(event.immediateText).not.toContain('{');
      expect(event.immediateText).not.toContain('}');
      expect(event.immediateText.length).toBeGreaterThan(10);
      expect(event.participants.every((participant) => world.persons[participant.personId])).toBe(
        true,
      );
    }
    const generic = childEvents.filter((event) => event.action.startsWith('vienna-life-'));
    expect(generic.length).toBeGreaterThanOrEqual(5);
    expect(generic.some((event) => event.action.startsWith('vienna-life-school-enrolment'))).toBe(
      true,
    );
    expect(generic.some((event) => event.action.startsWith('vienna-life-apprenticeship'))).toBe(
      true,
    );
    // Same scene never resolves twice in the same year for the same subject.
    const keys = generic.map(
      (event) => `${event.subjectId}:${event.action.split('/')[0]}:${event.date.year}`,
    );
    expect(new Set(keys).size).toBe(keys.length);
    assertWorldV4(world);
  });

  it('applies universal scenes only to people the scene declares eligible', () => {
    const { world, events } = playerLife();
    for (const event of events) {
      if (!event.action.startsWith('vienna-life-')) continue;
      expect(['birth', 'initial']).toContain(world.persons[event.subjectId]?.provenance.kind);
    }
    const anna = world.persons['person-anna-bauer'];
    expect(anna?.provenance.kind).toBe('initial');
  });

  it('keeps the child either alive or dead with a concrete recorded death', () => {
    const { world, childId } = playerLife();
    const child = world.persons[childId]!;
    if (child.died) {
      expect(child.health.vitality).toBe(0);
      expect(child.deathCause).toBeTruthy();
    } else {
      expect(child.health.vitality).toBeGreaterThan(0);
    }
    assertWorldV4(world);
  });

  it('births into a living family with capacity instead of the first household', () => {
    const seed = structuredClone(VIENNA_1912_SEED);
    // Force the alphabetically first household out of the candidate pool; the
    // child must still find a real living family elsewhere.
    for (const id of ['person-josef-bauer', 'person-katharina-bauer']) {
      const person = seed.persons[id]!;
      person.died = { year: 1912, month: 1 };
      person.health.vitality = 0;
    }
    const birth = createV4Birth(
      seed,
      {
        name: 'Family check',
        sex: 'female',
        health: 0.8,
        wish: '有一个能住下的家。',
        lifeMode: 'ordinary',
        appearance: { skin: 1, hair: 0, clothes: 2 },
      },
      'family-choice',
      'owner-family-choice',
    );
    const child = birth.world.persons[birth.childId]!;
    const household = birth.world.households[child.householdId]!;
    const living = household.memberIds.filter((id) => {
      const person = birth.world.persons[id];
      return Boolean(person && !person.died);
    });
    const place = birth.world.places[household.residenceId]!;
    expect(child.householdId).not.toBe('hh-bauer');
    expect(child.parentIds.length).toBeGreaterThan(0);
    expect(child.parentIds.every((id) => !birth.world.persons[id]?.died)).toBe(true);
    expect(living.length).toBeLessThanOrEqual(place.capacity ?? 8);
    expect(living).toContain(child.id);
    expect(birth.event.immediateText).toContain('口人');
    expect(birth.event.immediateText).not.toContain('85口人');
  });
});
