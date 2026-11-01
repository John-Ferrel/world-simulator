import { describe, expect, it } from 'vitest';
import { advance } from '../packages/simulation-core/index.js';
import { createWorld } from '../packages/world-packs/index.js';
import type { World } from '../packages/contracts/index.js';
import type { AgencyState } from '../packages/planning/index.js';

function fixture(km = 1800) {
  const w = createWorld('travel-integration');
  // A calendar enables the real life/agenda/travel ordering without importing Earth baseline shocks.
  w.pack.id = 'calendar-test-world';
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  w.parameters.lifeComplexity = true;
  const origin = w.settlements.find((s) => s.id === 'town-0')!;
  const destination = w.settlements.find((s) => s.id === 'town-1')!;
  for (const s of w.settlements) s.neighbors = [];
  origin.neighbors = [destination.id];
  destination.neighbors = [origin.id];
  w.routes = [
    {
      id: 'integration-road',
      from: origin.id,
      to: destination.id,
      km,
      mode: 'road',
      capacity: 100_000,
      status: 'open',
    },
  ];
  const [traveller, local, observer] = w.persons;
  for (const p of [traveller, local, observer]) {
    p.locationId = origin.id;
    p.coin = 100;
    p.health = 1;
    p.plans = [];
    p.relationships = [];
  }
  traveller.plans.push({
    id: 'integration-trip',
    kind: 'migrate',
    step: 0,
    targetId: destination.id,
    reserved: 3,
    deadline: 40,
    status: 'active',
    causeIds: [],
  });
  return { w, origin, destination, traveller, local, observer };
}

describe('travel integrated with the canonical monthly simulation', () => {
  it('keeps a traveller at the last confirmed location when a route disappears', () => {
    const f = fixture();
    const first = advance(f.w);
    expect(first.world.persons[0].journey).toBeDefined();
    expect(first.world.persons[0].locationId).toBe(f.origin.id);

    first.world.routes = [];
    const second = advance(first.world);
    const p = second.world.persons[0];
    expect(p.locationId).toBe(f.origin.id);
    expect(p.journey).toBeUndefined();
    expect(p.plans.find((plan) => plan.id === 'integration-trip')?.status).toBe('failed');
    expect(
      second.events.some(
        (event) => event.kind === 'journey_failed' && event.personIds.includes(p.id),
      ),
    ).toBe(true);
  });

  it('does not allow an active hostile war to teleport an in-flight person across its border', () => {
    const f = fixture();
    const first = advance(f.w);
    const w = first.world;
    const destination = w.settlements.find((s) => s.id === f.destination.id)!;
    destination.polityId = w.polities[1].id;
    const key = [w.settlements.find((s) => s.id === f.origin.id)!.polityId, destination.polityId]
      .sort()
      .join('~');
    const sideA = w.settlements.find((s) => s.id === f.origin.id)!.polityId;
    const sideB = destination.polityId;
    w.geopolitics = {
      version: 1,
      governments: {},
      relations: {
        [key]: {
          id: key,
          a: sideA,
          b: sideB,
          affinity: -0.5,
          dispute: 1,
          trade: 0,
          status: 'war',
          treatySince: 0,
          causeIds: ['war-declaration'],
        },
      },
      wars: [
        {
          id: 'war-block',
          a: sideA,
          b: sideB,
          campA: [sideA],
          campB: [sideB],
          started: 0,
          status: 'active',
          causeIds: ['war-declaration'],
          fronts: [],
          mobilized: {},
          supplyFulfillment: {},
          consumedSupplies: {},
          casualties: {},
          occupied: [],
          months: 0,
          settlementOwnerBefore: {},
        },
      ],
      atrocities: [],
      lastEventIds: [],
      pendingCasualties: [],
      lastAdvancedMonth: -1,
      lastEffectsMonth: -1,
      routeBaseCapacity: {},
      routeBaseStatus: {},
      lastAtrocityStarted: {},
    };
    const progress = w.persons[0].journey!.progressKm;
    const blocked = advance(w);
    const p = blocked.world.persons[0];
    expect(p.journey?.progressKm).toBe(progress);
    expect(p.journey?.blockedMonths).toBe(1);
    expect(p.locationId).toBe(f.origin.id);
    expect(
      blocked.events.some(
        (event) => event.kind === 'journey_blocked' && event.causeIds.includes('war-declaration'),
      ),
    ).toBe(true);
  });

  it('suspends the traveller’s local work and leaves local encounters to people who are present', () => {
    const f = fixture();
    const first = advance(f.w);
    const w = first.world;
    const p = w.persons.find((person) => person.id === f.traveller.id)!;
    const actor = w.persons.find((person) => person.id === f.observer.id)!;
    const careerBefore = p.life!.career.experience;
    const educationBefore = p.life!.education.months;
    const knowledgeBefore = f.origin.knowledge;
    p.plans.push({
      id: 'research-during-trip',
      kind: 'research',
      step: 5,
      targetId: f.origin.id,
      reserved: 0,
      deadline: w.month + 10,
      status: 'active',
      causeIds: [],
    });
    w.agency = {
      version: 1,
      projects: {},
      needsReplan: {},
      agendas: {
        [actor.id]: {
          id: 'agenda-socialize-traveller',
          actorId: actor.id,
          intention: '看望当地熟人',
          rationale: '测试旅途中的本地可达性',
          steps: [{ action: 'socialize', targetId: p.id, label: '与熟人交谈', months: 1 }],
          cursor: 0,
          progress: 0,
          status: 'active',
          adopted: w.month,
          lastApplied: -1,
          causeIds: [],
        },
      },
    } satisfies AgencyState;
    const next = advance(w);
    const after = next.world.persons.find((person) => person.id === p.id)!;
    expect(after.journey).toBeDefined();
    expect(after.locationId).toBe(f.origin.id);
    expect(after.life!.career.experience).toBe(careerBefore);
    expect(after.life!.education.months).toBe(educationBefore);
    expect(after.plans.find((plan) => plan.id === 'research-during-trip')).toMatchObject({
      status: 'active',
      step: 5,
    });
    expect(next.world.settlements.find((s) => s.id === f.origin.id)!.knowledge).toBe(
      knowledgeBefore,
    );
    expect(
      next.events.some(
        (event) =>
          ['innovation', 'research_saturated'].includes(event.kind) &&
          event.personIds.includes(p.id),
      ),
    ).toBe(false);
    expect(
      next.events.some(
        (event) =>
          event.kind === 'agenda_step_completed' &&
          event.personIds.includes(p.id) &&
          event.data.action === 'socialize',
      ),
    ).toBe(false);
    expect(after.relationships.some((relationship) => relationship.personId === actor.id)).toBe(
      false,
    );
  });

  it('holds an agenda relocation until the linked route journey actually arrives', () => {
    const f = fixture(1800);
    f.traveller.plans = [];
    let w = advance(f.w).world;
    const actor = w.persons.find((p) => p.id === f.traveller.id)!;
    expect(actor.journey).toBeUndefined();
    const evidenceId = actor.memories.at(-1)?.eventId;
    expect(evidenceId).toBeDefined();
    const command = {
      id: 'agenda-relocation-command',
      kind: 'agenda' as const,
      proposal: {
        version: 1,
        jobId: 'agenda-relocation-job',
        actorId: actor.id,
        actorVersion: actor.version,
        deadline: w.month + 1,
        intention: '迁往相邻城镇',
        rationale: '当地工作机会更好',
        evidenceIds: [evidenceId],
        steps: [{ action: 'relocate', targetId: f.destination.id, label: '迁居', months: 1 }],
      },
    };
    let transition = advance(w, [command]);
    w = transition.world;
    expect(transition.results.find((result) => result.id === command.id)).toEqual({
      id: command.id,
      ok: true,
    });
    expect(w.persons.find((p) => p.id === actor.id)!.journey).toBeUndefined();
    expect(w.persons.find((p) => p.id === actor.id)!.locationId).toBe(f.origin.id);
    const agenda = () => w.agency!.agendas[actor.id];
    const waitId = agenda().waitingPlanId;
    expect(waitId).toBeDefined();
    expect(
      transition.events.some(
        (event) => event.kind === 'agenda_step_completed' && event.personIds.includes(actor.id),
      ),
    ).toBe(false);

    let guard = 0;
    while (
      w.persons.find((p) => p.id === actor.id)!.locationId !== f.destination.id &&
      guard++ < 12
    ) {
      transition = advance(w);
      w = transition.world;
      if (w.persons.find((p) => p.id === actor.id)!.journey)
        expect(w.persons.find((p) => p.id === actor.id)!.locationId).toBe(f.origin.id);
      if (w.agency!.agendas[actor.id].waitingPlanId)
        expect(w.agency!.agendas[actor.id].waitingPlanId).toBe(waitId);
    }
    expect(w.persons.find((p) => p.id === actor.id)!.locationId).toBe(f.destination.id);
    expect(
      w.persons.find((p) => p.id === actor.id)!.plans.find((plan) => plan.id === waitId)?.status,
    ).toBe('complete');
    expect(w.agency!.agendas[actor.id].waitingPlanId).toBeUndefined();
    expect(
      transition.events.some(
        (event) => event.kind === 'migration' && event.personIds.includes(actor.id),
      ),
    ).toBe(true);
    expect(
      transition.events.some(
        (event) => event.kind === 'agenda_step_completed' && event.personIds.includes(actor.id),
      ),
    ).toBe(true);
  });

  it('clears an in-flight journey and fails its migration plan when core death handling runs', () => {
    const f = fixture();
    const first = advance(f.w);
    const w: World = first.world;
    const p = w.persons.find((person) => person.id === f.traveller.id)!;
    w.geopolitics = {
      version: 1,
      governments: {},
      relations: {},
      wars: [],
      atrocities: [],
      lastEventIds: [],
      pendingCasualties: [
        { personId: p.id, causeIds: ['fatal-event'], monthlyRisk: 1, kind: 'combat' },
      ],
      lastAdvancedMonth: -1,
      lastEffectsMonth: -1,
      routeBaseCapacity: {},
      routeBaseStatus: {},
      lastAtrocityStarted: {},
    };
    const result = advance(w);
    const dead = result.world.persons.find((person) => person.id === p.id)!;
    expect(dead.death).toBe(result.world.month);
    expect(dead.journey).toBeUndefined();
    expect(dead.plans.find((plan) => plan.id === 'integration-trip')?.status).toBe('failed');
  });
});
