import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { population, type HistoricalEvent, type World } from '../packages/contracts/index.js';
import { random } from '../packages/simulation-core/random.js';
import { assertIndustrialLedger } from '../packages/industry/index.js';
import type { SocietyState } from '../packages/society/index.js';

function tinyEarth(seed = 'cross-systems') {
  const w = createWorld(seed, 19, 300);
  w.pack = { id: 'earth-fictional', version: 'test' };
  w.calendar = { startYear: 1800, mode: 'historical-simulation', sources: [] };
  w.parameters.lifeComplexity = true;
  const keep = new Set(['town-0', 'town-1', 'town-6', 'town-7']);
  w.settlements = w.settlements.filter((s) => keep.has(s.id));
  for (const s of w.settlements) s.neighbors = s.neighbors.filter((id) => keep.has(id));
  w.persons = w.persons.filter((p) => keep.has(p.locationId));
  const people = new Set(w.persons.map((p) => p.id));
  for (const p of w.persons) {
    p.relationships = p.relationships.filter((r) => people.has(r.personId));
    p.parents = p.parents.filter((id) => people.has(id));
  }
  w.polities = w.polities.filter((p) => ['polity-0', 'polity-1'].includes(p.id));
  w.organizations = w.organizations.filter((o) => keep.has(o.locationId));
  for (const org of w.organizations) org.memberIds = org.memberIds.filter((id) => people.has(id));
  w.routes = [];
  const seen = new Set<string>();
  for (const s of w.settlements)
    for (const id of s.neighbors) {
      const pair = [s.id, id].sort().join(':');
      if (seen.has(pair)) continue;
      seen.add(pair);
      w.routes.push({
        id: pair,
        from: pair.split(':')[0],
        to: pair.split(':')[1],
        km: 5,
        mode: 'road',
        capacity: 1000,
        status: 'open',
      });
    }
  for (const s of w.settlements)
    s.economy = {
      unemployment: 0.05,
      healthcare: 0.45,
      education: 0.35,
      infrastructure: 0.4,
      inflation: 0.02,
      productionMultiplier: 1,
      tradeMultiplier: 1,
    };
  const institutionLocation = 'town-0';
  const members = w.persons.filter((p) => p.locationId === institutionLocation).slice(0, 4);
  const institutions: SocietyState['institutions'] = {
    'seeded-mutual-aid': {
      id: 'seeded-mutual-aid',
      kind: 'mutual_aid',
      label: 'test mutual aid',
      locationId: institutionLocation,
      members: members.map((p) => p.id),
      treasury: 73,
      dues: 1,
      monthlyUpkeep: 1,
      founded: 0,
      causeIds: [],
      status: 'active',
    },
  };
  w.society = {
    profiles: {},
    relations: {},
    institutions,
    relationIndex: {},
    locationIndex: {},
    month: -1,
    sequence: 0,
    lifeAppliedMonth: -1,
  };
  w.baselinePopulation = population(w);
  w.maxYears = 300;
  return w;
}

function money(w: World) {
  return (
    w.persons.reduce((n, p) => n + p.coin, 0) +
    w.settlements.reduce((n, s) => n + s.coin, 0) +
    w.polities.reduce((n, p) => n + p.treasury, 0) +
    w.organizations.reduce((n, o) => n + o.treasury, 0) +
    Object.values(w.society?.institutions ?? {}).reduce((n, i) => n + i.treasury, 0)
  );
}

function assertKnownCauses(events: HistoricalEvent[], known: Set<string>) {
  for (const event of events) {
    for (const cause of event.causeIds)
      expect(known.has(cause), `${event.kind} refers to missing cause ${cause}`).toBe(true);
    known.add(event.id);
  }
}

function assertWorldCauseRefs(w: World, known: Set<string>) {
  const visit = (value: unknown, key = ''): void => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      for (const child of value) visit(child);
      return;
    }
    for (const [childKey, child] of Object.entries(value)) {
      if (childKey === 'causeIds' && Array.isArray(child))
        for (const id of child)
          expect(known.has(String(id)), `state has missing cause ${String(id)}`).toBe(true);
      else if (childKey === 'causeId' && typeof child === 'string')
        expect(known.has(child), `state has missing cause ${child}`).toBe(true);
      else visit(child, childKey);
    }
    void key;
  };
  visit(w);
}

describe('cross-system Earth simulation', () => {
  it('runs all monthly systems with conserved money/population, committed causes, and owner parity', () => {
    const a0 = tinyEarth('cross-monthly');
    a0.persons[0].ownerId = 'player-subject';
    const b0 = structuredClone(a0);
    delete b0.persons[0].ownerId;
    let a = a0,
      b = b0;
    const initialPopulation = population(a);
    const initialMoney = money(a);
    const known = new Set<string>();
    for (let month = 0; month < 20; month++) {
      const nextA = advance(a),
        nextB = advance(b);
      assertKnownCauses(nextA.events, known);
      assertKnownCauses(nextB.events, new Set(known));
      a = nextA.world;
      b = nextB.world;
      expect(population(a)).toBe(initialPopulation + a.audit.births - a.audit.deaths);
      expect(population(b)).toBe(initialPopulation + b.audit.births - b.audit.deaths);
      expect(Math.abs(money(a) - initialMoney)).toBeLessThan(1e-6 * initialMoney);
      expect(Math.abs(money(b) - initialMoney)).toBeLessThan(1e-6 * initialMoney);
      const comparable = structuredClone(a);
      delete comparable.persons[0].ownerId;
      expect(comparable).toEqual(b);
    }
    expect(a.industry?.ledger.produced.coal).toBeGreaterThan(0);
    expect(Object.keys(a.geopolitics?.governments ?? {}).length).toBe(2);
    expect(Object.keys(a.society?.profiles ?? {}).length).toBeGreaterThan(0);
    expect(a.worldlines).toBeDefined();
    expect(Object.keys(a.agency?.agendas ?? {}).length).toBeGreaterThan(0);
    expect(a.society?.institutions['seeded-mutual-aid']).toBeDefined();
    assertIndustrialLedger(a);
    assertWorldCauseRefs(a, known);
  });

  it('sends a deterministic combat fatality through core death and inheritance handling', () => {
    let w = tinyEarth('cross-war-death');
    const initial = advance(w);
    w = initial.world;
    const geo = w.geopolitics!;
    const relation = Object.values(geo.relations).find((r) =>
      w.routes!.some((route) => {
        const a = w.settlements.find((s) => s.id === route.from)!;
        const b = w.settlements.find((s) => s.id === route.to)!;
        return [a.polityId, b.polityId].sort().join('~') === [r.a, r.b].sort().join('~');
      }),
    )!;
    const cause = initial.events.find(
      (e) => e.kind === 'government_formed' && e.data.polityId === relation.a,
    )!;
    relation.dispute = 0.8;
    relation.disputeEvidenceId = cause.id;
    relation.causeIds = [cause.id];
    const border = w.routes!.find((route) => {
      const a = w.settlements.find((s) => s.id === route.from)!;
      const b = w.settlements.find((s) => s.id === route.to)!;
      return (
        [a.polityId, b.polityId].sort().join('~') === [relation.a, relation.b].sort().join('~')
      );
    })!;
    const sideLocation =
      border.from && w.settlements.find((s) => s.id === border.from)!.polityId === relation.a
        ? border.from
        : border.to;
    const victim = w.persons.find((p) => p.locationId === sideLocation)!;
    const heir = w.persons.find((p) => p.id !== victim.id && p.locationId === sideLocation)!;
    const predictedMonth = w.month + 1;
    let proposalId: string | undefined;
    for (let i = 0; i < 200_000; i++) {
      const candidate = `exposed-combat-${i}`;
      if (random(w.seed, predictedMonth, candidate, 'political-mortality') < 0.0002) {
        proposalId = candidate;
        break;
      }
    }
    if (!proposalId) throw new Error('failed to find deterministic casualty seed');
    victim.id = proposalId;
    victim.ownerId = 'war-player';
    victim.coin = 40;
    victim.relationships = [
      {
        personId: heir.id,
        trust: 0.8,
        attachment: 0.8,
        kind: 'kin',
        since: w.month,
        causeIds: [cause.id],
      },
    ];
    victim.plans = [
      {
        id: 'plan-to-fail-on-death',
        kind: 'research',
        step: 1,
        targetId: sideLocation,
        reserved: 0,
        deadline: 99,
        status: 'active',
        causeIds: [cause.id],
      },
    ];
    const heirCoin = heir.coin;
    const result = advance(w);
    const dead = result.world.persons.find((p) => p.id === proposalId)!;
    const war = result.world.geopolitics!.wars[0];
    const death = result.events.find((e) => e.kind === 'death' && e.personIds.includes(proposalId));
    expect(war).toBeDefined();
    expect(dead.death).toBe(result.world.month);
    expect(dead.plans.some((p) => p.status === 'active')).toBe(false);
    expect(dead.coin).toBe(0);
    expect(result.world.persons.find((p) => p.id === heir.id)!.coin).toBeGreaterThan(heirCoin);
    expect(death?.causeIds).toContain(result.events.find((e) => e.kind === 'war_started')?.id);
    expect(result.world.audit.deaths).toBeGreaterThan(w.audit.deaths);
    expect(
      result.events.filter((e) => e.kind === 'death' && e.personIds.includes(proposalId!)),
    ).toHaveLength(1);
  });

  it('reduces actual industrial shipments under sanctions and restores them after peace', () => {
    let base = tinyEarth('cross-trade');
    base = advance(base).world;
    const a = Object.values(base.geopolitics!.relations)[0];
    const relationKey = Object.entries(base.geopolitics!.relations).find(
      ([, relation]) => relation.id === a.id,
    )![0];
    const endpoints = base.routes!.filter((route) => {
      const from = base.settlements.find((s) => s.id === route.from)!;
      const to = base.settlements.find((s) => s.id === route.to)!;
      return [from.polityId, to.polityId].sort().join('~') === [a.a, a.b].sort().join('~');
    });
    expect(endpoints.length).toBeGreaterThan(0);
    const makeStocks = (w: World) => {
      const stock = w.industry!;
      const seller = stock.polities[a.a],
        buyer = stock.polities[a.b];
      const old = seller.goods.coal + buyer.goods.coal;
      seller.goods.coal = 10;
      buyer.goods.coal = 0.0005;
      const removed = old - seller.goods.coal - buyer.goods.coal;
      if (removed >= 0) stock.ledger.consumed.coal += removed;
      else stock.ledger.produced.coal += -removed;
      for (const p of [seller, buyer]) {
        for (const good of Object.keys(p.capacity) as (keyof typeof p.capacity)[])
          p.capacity[good] = 0;
        p.capacity.coal = 0.001;
      }
      for (const route of w.routes!)
        if (endpoints.some((e) => e.id === route.id)) {
          w.geopolitics!.routeBaseCapacity[route.id] = 0.01;
          route.capacity = 0.01;
        }
      stock.month = w.month;
    };
    const free = structuredClone(base),
      sanctioned = structuredClone(base);
    makeStocks(free);
    makeStocks(sanctioned);
    free.geopolitics!.relations[relationKey].status = 'peace';
    sanctioned.geopolitics!.relations[relationKey].status = 'sanctions';
    sanctioned.geopolitics!.relations[relationKey].trade = 0.1;
    const freeBefore = free.industry!.polities[a.b].goods.coal;
    const sanctionedBefore = sanctioned.industry!.polities[a.b].goods.coal;
    const freeTick = advance(free),
      sanctionedTick = advance(sanctioned);
    const freeGain = freeTick.world.industry!.polities[a.b].goods.coal - freeBefore;
    const sanctionedGain =
      sanctionedTick.world.industry!.polities[a.b].goods.coal - sanctionedBefore;
    expect(freeGain).toBeGreaterThan(sanctionedGain);
    expect(sanctionedGain).toBeGreaterThan(0);
    const peace = sanctionedTick.world;
    peace.geopolitics!.relations[relationKey].status = 'peace';
    const restored = advance(peace);
    const restoredRoutes = restored.world.routes!.filter((r) =>
      endpoints.some((e) => e.id === r.id),
    );
    expect(
      restoredRoutes.every(
        (r) => r.capacity === restored.world.geopolitics!.routeBaseCapacity[r.id],
      ),
    ).toBe(true);
    const afterPeaceBefore = restored.world.industry!.polities[a.b].goods.coal;
    const afterPeace = advance(restored.world);
    const peaceGain = afterPeace.world.industry!.polities[a.b].goods.coal - afterPeaceBefore;
    expect(peaceGain).toBeGreaterThan(sanctionedGain);
    assertIndustrialLedger(afterPeace.world);
  });

  it('fails an infeasible self-chosen agenda and honestly labels its fallback without erasing the longer-term intention', () => {
    let w = advance(tinyEarth('cross-replan')).world;
    const actor = w.persons[0];
    const neighbor = w.persons.find((p) => p.locationId === actor.locationId && p.id !== actor.id)!;
    const intention = '找出一种改善当下生计的办法';
    actor.intention = intention;
    actor.health = 0.1;
    const proposal = {
      version: 1 as const,
      jobId: 'self-chosen-care',
      actorId: actor.id,
      actorVersion: actor.version,
      deadline: w.month + 1,
      intention,
      rationale: '根据目前观察尝试一次照护行动。',
      steps: [{ action: 'care' as const, targetId: neighbor.id, label: '照顾邻居', months: 1 }],
      evidenceIds: [actor.memories.at(-1)!.eventId],
    };
    const failed = advance(w, [{ id: 'adopt-self-plan', kind: 'agenda', proposal }]);
    w = failed.world;
    expect(failed.events.some((e) => e.kind === 'agenda_step_failed')).toBe(true);
    const originalId = w.agency!.agendas[actor.id].id;
    expect(w.agency!.needsReplan[actor.id]).toBeDefined();
    const laterEvents: HistoricalEvent[] = [];
    for (let i = 0; i < 3; i++) {
      const next = advance(w);
      w = next.world;
      laterEvents.push(...next.events);
    }
    const replacement = w.agency!.agendas[actor.id];
    expect(replacement).toBeDefined();
    expect(replacement.id).not.toBe(originalId);
    expect(w.persons.find((p) => p.id === actor.id)!.intention).toBe(intention);
    expect(replacement.source).toBe('rules_fallback');
    expect(replacement.rationale.length).toBeGreaterThan(0);
    expect(
      laterEvents.find(
        (e) => e.kind === 'agenda_adopted' && e.data.intention === replacement.intention,
      ),
    ).toBeDefined();
    const furtherRevision = w.agency!.needsReplan[actor.id];
    if (furtherRevision) {
      // A newly completed caring fallback may itself change identity; that new replan
      // must cite the committed new experience rather than repeat the old failed plan.
      expect(furtherRevision.since).toBeGreaterThan(failed.world.month);
      expect(
        furtherRevision.causeIds.some((id) =>
          laterEvents.some((e) => e.id === id && e.kind === 'identity_shift'),
        ),
      ).toBe(true);
    }
  });
});
