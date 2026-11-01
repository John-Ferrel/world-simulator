import { describe, expect, it } from 'vitest';
import type { Person, World } from '../packages/contracts/index.js';
import { createWorld, newPerson } from '../packages/world-packs/index.js';
import { AgendaDefinitionSchema } from '../packages/planning/schema.js';
import { buildBaselineContext, selectBaselineAgenda } from '../packages/planning/baseline.js';

function fixture(ids = ['actor']) {
  const w = createWorld('baseline-fixture');
  const place = w.settlements[0]!;
  const persons = ids.map((id, index) => newPerson(w, id, place.id, index, 28));
  w.persons = persons;
  for (const p of persons) {
    p.life = {
      needs: {
        food: 0.1,
        rest: 0.8,
        safety: 0.1,
        belonging: 0.1,
        purpose: 0.5,
        autonomy: 0.5,
      },
      emotions: { hope: 0.5, fear: 0.1, grief: 0, anger: 0.1 },
      personality: {
        openness: 0.5,
        conscientiousness: 0.5,
        extraversion: 0.5,
        agreeableness: 0.5,
        neuroticism: 0.5,
      },
      career: { role: p.occupation, level: 1, experience: 0, employed: true, burnout: 0 },
      education: { level: 0, months: 0, field: 'general' },
      housing: { quality: 0.5, rent: 0 },
      debt: 0,
      fatigue: 0,
    };
  }
  return { w, persons, place };
}
const action = (world: World, person: Person) =>
  selectBaselineAgenda(world, person).steps[0]!.action;

describe('bounded baseline agenda selection', () => {
  it('prioritizes work under scarcity and never spends unavailable move costs', () => {
    const { w, persons, place } = fixture();
    const [p] = persons;
    p.coin = 1;
    p.life!.career.employed = false;
    place.scarcity = 0.95;
    place.neighbors = ['town-1'];
    expect(action(w, p)).toBe('seek_work');
    expect(selectBaselineAgenda(w, p).steps.some((step) => step.action === 'relocate')).toBe(false);

    p.coin = 6;
    p.life!.career.employed = true;
    p.life!.needs.safety = 0.9;
    place.scarcity = 0;
    const plan = selectBaselineAgenda(w, p);
    expect(plan.steps[0]).toMatchObject({ action: 'relocate', targetId: 'town-1' });
    expect(AgendaDefinitionSchema.parse(plan)).toEqual(plan);
    p.life!.needs.safety = 0.1;
    expect(selectBaselineAgenda(w, p).steps[0]?.action).not.toBe('relocate');
  });

  it('uses a present close relationship for care and avoids targets during travel', () => {
    const { w, persons } = fixture(['caregiver', 'kin', 'visitor', 'hungry']);
    const [caregiver, kin, visitor, hungry] = persons;
    caregiver.relationships.push({
      personId: kin.id,
      kind: 'kin',
      trust: 0.8,
      attachment: 0.9,
      since: 0,
    });
    kin.health = 0.35;
    expect(selectBaselineAgenda(w, caregiver).steps[0]).toMatchObject({
      action: 'care',
      targetId: kin.id,
    });
    caregiver.relationships.push({
      personId: hungry.id,
      kind: 'kin',
      trust: 0.8,
      attachment: 0.9,
      since: 0,
    });
    kin.health = 0.9;
    hungry.life!.needs.food = 0.95;
    expect(selectBaselineAgenda(w, caregiver).steps[0]).toMatchObject({
      action: 'care',
      targetId: hungry.id,
    });

    visitor.journey = {
      planId: 'p',
      routeId: 'r',
      fromId: 'town-0',
      toId: 'town-1',
      departed: 0,
      distanceKm: 10,
      progressKm: 1,
      lastApplied: 0,
      blockedMonths: 0,
      causeIds: [],
    };
    const travelerPlan = selectBaselineAgenda(w, visitor);
    expect(travelerPlan.steps.every((step) => !step.targetId)).toBe(true);
    expect(travelerPlan.steps[0]?.action).toBe('practice');
  });

  it('lets identity axes change real social and political choices', () => {
    const { w, persons, place } = fixture([
      'helper',
      'neighbor',
      'organizer',
      'organizer-neighbor',
    ]);
    const [helper, neighbor, organizer, organizerNeighbor] = persons;
    helper.coin = 20;
    neighbor.coin = 1;
    w.identity = {
      version: 1,
      profiles: {
        [helper.id]: {
          personId: helper.id,
          axes: {
            care: 0.5,
            ambition: 0.5,
            tradition: 0.5,
            solidarity: 0.9,
            autonomy: 0.5,
            pluralism: 0.5,
            institutionalTrust: 0.5,
          },
          pressure: {},
          inertia: 0.5,
          evidenceIds: [],
          lastShiftMonth: 0,
        },
        [organizer.id]: {
          personId: organizer.id,
          axes: {
            care: 0.5,
            ambition: 0.5,
            tradition: 0.5,
            solidarity: 0.1,
            autonomy: 0.5,
            pluralism: 0.5,
            institutionalTrust: 0.5,
          },
          pressure: {},
          inertia: 0.5,
          evidenceIds: [],
          lastShiftMonth: 0,
        },
        [organizerNeighbor.id]: {
          personId: organizerNeighbor.id,
          axes: {
            care: 0.5,
            ambition: 0.5,
            tradition: 0.5,
            solidarity: 0.9,
            autonomy: 0.5,
            pluralism: 0.5,
            institutionalTrust: 0.5,
          },
          pressure: {},
          inertia: 0.5,
          evidenceIds: [],
          lastShiftMonth: 0,
        },
      },
      processedEventSequence: 0,
      processedOpaqueEventIds: [],
    };
    expect(action(w, helper)).toBe('aid');
    w.persons = [organizer, organizerNeighbor];
    helper.coin = 30;
    organizer.coin = 30;
    organizerNeighbor.coin = 30;
    organizerNeighbor.occupation = '学徒';
    organizer.goals[0]!.kind = 'belong';
    organizerNeighbor.goals[0]!.kind = 'belong';
    w.organizations = [];
    const high = selectBaselineAgenda(w, organizerNeighbor);
    const low = selectBaselineAgenda(w, organizer);
    expect(high.steps[0]?.action).toBe('organize');
    expect(low.steps[0]?.action).not.toBe('organize');
    w.organizations.push({
      id: 'existing-guild',
      name: 'Existing local guild',
      kind: 'guild',
      locationId: place.id,
      creatorId: organizer.id,
      leaderId: organizer.id,
      memberIds: [organizer.id],
      treasury: 10,
      founded: 0,
      status: 'active',
      definition: {
        version: 1,
        kind: 'guild',
        name: 'Existing local guild',
        mechanism: 'pooled_production',
        upkeep: 1,
        dues: 1,
        effect: 0.025,
        ttlMonths: 120,
        maxMembers: 32,
      },
      progress: 0,
      insolventMonths: 0,
      adoption: 0.5,
      causeIds: [],
    });
    expect(action(w, organizerNeighbor)).not.toBe('organize');

    organizer.goals[0]!.kind = 'learn';
    organizerNeighbor.goals[0]!.kind = 'learn';
    w.geopolitics = {
      governments: {
        [place.polityId]: {
          polityId: place.polityId,
          regime: 'parliamentary',
          parties: [{ id: 'party-socialist', ideology: 'socialist', support: 0.2, seats: 6 }],
          groups: [],
          laws: { suffrage: 0.5, labor: 0.5, religiousFreedom: 0.5, pressFreedom: 0.5 },
          causeIds: [],
        },
      },
      relations: {},
    } as unknown as NonNullable<World['geopolitics']>;
    for (const p of [organizer, organizerNeighbor]) {
      w.identity!.profiles[p.id]!.political = {
        id: 'socialist',
        confidence: 0.8,
        evidenceIds: [],
      };
    }
    w.identity!.profiles[organizer.id]!.axes.institutionalTrust = 0.1;
    w.identity!.profiles[organizerNeighbor.id]!.axes.institutionalTrust = 0.9;
    expect(action(w, organizer)).toBe('campaign');
    expect(action(w, organizerNeighbor)).toBe('research');
  });

  it('uses explicit religious identity and never invents a faith for tradition alone', () => {
    const { w, persons } = fixture();
    const [p] = persons;
    p.coin = 8;
    p.goals[0]!.kind = 'belong';
    p.values.tradition = 0.9;
    expect(action(w, p)).not.toBe('faith');
    w.identity = {
      version: 1,
      profiles: {
        [p.id]: {
          personId: p.id,
          axes: {
            care: 0.5,
            ambition: 0.5,
            tradition: 0.9,
            solidarity: 0.5,
            autonomy: 0.5,
            pluralism: 0.5,
            institutionalTrust: 0.5,
          },
          pressure: {},
          inertia: 0.5,
          evidenceIds: [],
          lastShiftMonth: 0,
          religion: { id: 'faith:lantern_path', confidence: 0.8, evidenceIds: ['event-1'] },
        },
      },
      processedEventSequence: 0,
      processedOpaqueEventIds: [],
    };
    expect(selectBaselineAgenda(w, p).steps[0]).toMatchObject({
      action: 'faith',
      traditionId: 'faith:lantern_path',
    });
  });

  it('ignores owner metadata and produces schema-valid bounded plans', () => {
    const first = fixture().w;
    const second = fixture().w;
    const a = first.persons[0]!;
    const b = second.persons[0]!;
    a.coin = b.coin = 10;
    a.ownerId = 'owner-1';
    b.ownerId = undefined;
    expect(selectBaselineAgenda(first, a)).toEqual(selectBaselineAgenda(second, b));
    expect(AgendaDefinitionSchema.parse(selectBaselineAgenda(first, a))).toEqual(
      selectBaselineAgenda(first, a),
    );
    expect(selectBaselineAgenda(first, a).steps.length).toBeLessThanOrEqual(12);
  });

  it('reuses a shared population context without iterating the world population per actor', () => {
    const { w, persons } = fixture(['actor', 'neighbor']);
    const [actor] = persons;
    const context = buildBaselineContext(w);
    w.persons = new Proxy(w.persons, {
      get(target, property, receiver) {
        if (property === Symbol.iterator) throw new Error('per-actor population scan');
        return Reflect.get(target, property, receiver);
      },
    });
    expect(() => selectBaselineAgenda(w, actor, context)).not.toThrow();
  });
});

it('does not invent another job for a cash-poor person who is already employed', () => {
  const { w, persons } = fixture();
  const p = persons[0];
  p.coin = 0;
  expect(action(w, p)).not.toBe('seek_work');
  p.life!.career.employed = false;
  expect(action(w, p)).toBe('seek_work');
});
