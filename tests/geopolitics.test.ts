import { describe, expect, it } from 'vitest';
import { createEarthWorld } from '../packages/world-packs/earth/index.js';
import {
  population,
  type HistoricalEvent,
  type Person,
  type World,
} from '../packages/contracts/index.js';
import {
  advanceGeopolitics,
  applyGeopoliticalEffects,
  type GeopoliticalState,
} from '../packages/geopolitics/index.js';
import { assertIndustrialLedger, initializeIndustry } from '../packages/industry/index.js';

function fixture() {
  const w = createEarthWorld('geopolitics-mechanics');
  let seq = 0;
  const events: HistoricalEvent[] = [];
  const emit = (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ): HistoricalEvent => {
    const event: HistoricalEvent = {
      id: `test-e${++seq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(event);
    return event;
  };
  const locals = new Map<string, Person[]>();
  for (const s of w.settlements) locals.set(s.id, []);
  for (const p of w.persons) if (p.death === undefined) locals.get(p.locationId)?.push(p);
  return { w, emit, events, locals };
}
function money(w: World) {
  return (
    w.persons.reduce((n, p) => n + p.coin, 0) +
    w.settlements.reduce((n, s) => n + s.coin, 0) +
    w.polities.reduce((n, p) => n + p.treasury, 0) +
    w.organizations.reduce((n, o) => n + o.treasury, 0)
  );
}

describe('deterministic geopolitics', () => {
  it('lazily creates political institutions and indexes diplomacy only across adjacent polities', () => {
    const { w, emit, events, locals } = fixture();
    advanceGeopolitics(w, emit, locals);
    const gp = (w as World & { geopolitics: GeopoliticalState }).geopolitics;
    expect(Object.keys(gp.governments)).toHaveLength(w.polities.length);
    expect(Object.keys(gp.relations).length).toBeGreaterThan(0);
    expect(Object.keys(gp.relations).length).toBeLessThan(
      (w.polities.length * (w.polities.length - 1)) / 2,
    );
    expect(
      Object.values(gp.governments).every((g) => g.parties.length === 5 && g.groups.length === 5),
    ).toBe(true);
    expect(events.every((e) => e.kind === 'government_formed')).toBe(true);
    const snapshot = structuredClone(gp);
    const eventCount = events.length;
    advanceGeopolitics(w, emit, locals);
    expect(gp).toEqual(snapshot);
    expect(events).toHaveLength(eventCount);
    const adjacent = Object.values(gp.relations).find((r) =>
      w.routes!.some((route) => {
        const a = w.settlements.find((s) => s.id === route.from)!;
        const b = w.settlements.find((s) => s.id === route.to)!;
        return (
          [a.polityId, b.polityId].sort().join('~') === [r.a, r.b].sort().join('~') &&
          route.km <= 120
        );
      }),
    )!;
    adjacent.dispute = 0.121;
    w.month = 1;
    advanceGeopolitics(w, emit, locals);
    const borderDispute = events.find(
      (e) => e.kind === 'border_dispute' && e.data.a === adjacent.a && e.data.b === adjacent.b,
    )!;
    expect(borderDispute.causeIds).toContain(
      events.find(
        (e) =>
          e.kind === 'border_pressure_observed' &&
          e.data.a === adjacent.a &&
          e.data.b === adjacent.b,
      )!.id,
    );
    const polity = w.polities[0];
    gp.governments[polity.id].groups.find((g) => g.kind === 'military')!.influence = 0.4;
    polity.legitimacy = 0.2;
    w.month = 48;
    advanceGeopolitics(w, emit, locals);
    expect(gp.governments[polity.id].regime).toBe('military');
    expect(
      events.some(
        (e) => e.kind === 'coup' && e.data.polityId === polity.id && e.causeIds.length > 0,
      ),
    ).toBe(true);
  });

  it('turns an evidenced border dispute into war, mobilizes existing adults and records front losses', () => {
    const { w, emit, events, locals } = fixture();
    initializeIndustry(w);
    advanceGeopolitics(w, emit, locals);
    const gp = (w as World & { geopolitics: GeopoliticalState }).geopolitics;
    const rel = Object.values(gp.relations).find((r) =>
      w.routes!.some((route) => {
        const s = w.settlements.find((q) => q.id === route.from)!;
        const t = w.settlements.find((q) => q.id === route.to)!;
        return (
          s.polityId !== t.polityId &&
          [s.polityId, t.polityId].sort().join('~') === [r.a, r.b].sort().join('~') &&
          route.km <= 10
        );
      }),
    )!;
    const evidence = emit('border_dispute', [], undefined, 'Committed border-pressure evidence.');
    rel.dispute = 0.7;
    rel.causeIds = [evidence.id];
    rel.disputeEvidenceId = evidence.id;
    // A supplied-front scenario: national inventory is staged at an actual border endpoint.
    // Other scenarios explicitly test that disconnected national stocks cannot reach fronts.
    const route = w.routes!.find((r) => {
      const a = w.settlements.find((s) => s.id === r.from)!;
      const b = w.settlements.find((s) => s.id === r.to)!;
      return [a.polityId, b.polityId].sort().join('~') === [rel.a, rel.b].sort().join('~');
    })!;
    for (const id of [route.from, route.to]) {
      const s = w.settlements.find((s) => s.id === id)!;
      w.militaryLogistics!.depotByPolity[s.polityId] = s.id;
    }
    w.month++;
    const before = population(w);
    const beforeMoney = money(w);
    advanceGeopolitics(w, emit, locals);
    const war = gp.wars[0];
    expect(war).toBeDefined();
    expect(war.fronts.length).toBeGreaterThan(0);
    expect(events.find((e) => e.kind === 'war_started')?.causeIds).toContain(evidence.id);
    expect(war.mobilized[war.a] + war.mobilized[war.b]).toBeGreaterThan(0);
    expect(war.casualties[war.a] + war.casualties[war.b]).toBeGreaterThanOrEqual(0);
    expect(war.consumedSupplies[war.a].arms + war.consumedSupplies[war.b].arms).toBeGreaterThan(0);
    // Population changes only when cohort deaths are recorded; mobilization itself is only a tag on existing adults.
    expect(before - population(w)).toBe(w.audit.deaths);
    expect(money(w)).toBeCloseTo(beforeMoney, 5);
    expect(gp.pendingCasualties.every((p) => p.causeIds.includes(war.causeIds[0]))).toBe(true);
    const landFront = war.fronts.find((front) => front.kind === 'land')!;
    const target = w.settlements.find((s) => s.id === landFront.bSettlementId)!;
    const oldOwner = target.polityId;
    // An already-favored control score alone cannot conquer anything. Stage
    // actual attacking supplies at this endpoint and exhaust the defending stock.
    war.fronts = [landFront];
    landFront.control = 0.95;
    const origin = w.settlements.find((s) => s.id === landFront.aSettlementId)!;
    w.militaryLogistics!.depotByPolity[origin.polityId] = origin.id;
    for (const id of [...war.campA, ...war.campB])
      for (const good of ['arms', 'oil'] as const) {
        const stock = w.industry!.polities[id];
        const amount = war.campA.includes(id) ? 100_000 : 0;
        w.industry!.ledger.initial[good] += amount - stock.goods[good];
        stock.goods[good] = amount;
      }
    war.months = 23; // Territorial outcomes, not a fixed eight-year timer, make peace feasible.
    w.month = 12;
    advanceGeopolitics(w, emit, locals);
    expect(war.status).toBe('ended');
    expect(Object.values(war.mobilized).every((n) => n === 0)).toBe(true);
    expect(war.winnerId).toBe(war.a);
    expect(war.occupied).toContain(target.id);
    expect(target.polityId).not.toBe(oldOwner);
    expect(events.some((e) => e.kind === 'peace_treaty' && e.data.warId === war.id)).toBe(true);
    expect(money(w)).toBeCloseTo(beforeMoney, 3);
    assertIndustrialLedger(w);
  });

  it('applies sanctions to route capacity and funds labor law from the treasury once per month', () => {
    const { w, emit, locals } = fixture();
    advanceGeopolitics(w, emit, locals);
    const gp = (w as World & { geopolitics: GeopoliticalState }).geopolitics;
    const rel = Object.values(gp.relations).find((r) =>
      w.routes!.some((route) => {
        const s = w.settlements.find((q) => q.id === route.from)!;
        const t = w.settlements.find((q) => q.id === route.to)!;
        return [s.polityId, t.polityId].sort().join('~') === [r.a, r.b].sort().join('~');
      }),
    )!;
    rel.status = 'sanctions';
    rel.trade = 0.1;
    const government = gp.governments[rel.a];
    government.laws.labor = 0.8;
    const route = w.routes!.find((q) => {
      const s = w.settlements.find((x) => x.id === q.from)!,
        t = w.settlements.find((x) => x.id === q.to)!;
      return [s.polityId, t.polityId].sort().join('~') === [rel.a, rel.b].sort().join('~');
    })!;
    const capacity = route.capacity;
    const beforeMoney = money(w);
    const governedSettlement = w.settlements.find((s) => s.polityId === rel.a)!;
    const unemployment = governedSettlement.economy!.unemployment;
    applyGeopoliticalEffects(w, emit);
    const afterFirst = money(w);
    expect(route.capacity).toBeLessThan(capacity);
    expect(governedSettlement.economy!.unemployment).toBeLessThan(unemployment);
    expect(afterFirst).toBeCloseTo(beforeMoney, 3);
    const coins = w.settlements.reduce((n, s) => n + s.coin, 0);
    applyGeopoliticalEffects(w, emit);
    expect(w.settlements.reduce((n, s) => n + s.coin, 0)).toBe(coins);
    expect(money(w)).toBeCloseTo(beforeMoney, 3);
    rel.status = 'peace';
    w.month++;
    applyGeopoliticalEffects(w, emit);
    expect(route.capacity).toBeCloseTo(gp.routeBaseCapacity[route.id], 6);
  });

  it('records attributable, abstract persecution evidence and preserves displaced cohort population', () => {
    const { w, emit, events, locals } = fixture();
    const s = w.settlements.find((q) =>
      q.neighbors.some((id) => w.settlements.find((t) => t.id === id)?.polityId !== q.polityId),
    )!;
    const polityId = s.polityId;
    const represented = w.persons[0];
    locals
      .get(represented.locationId)!
      .splice(locals.get(represented.locationId)!.indexOf(represented), 1);
    represented.locationId = s.id;
    locals.get(s.id)!.push(represented);
    s.unrest = 0.98;
    const before = population(w);
    advanceGeopolitics(w, emit, locals);
    const gp = (w as World & { geopolitics: GeopoliticalState }).geopolitics;
    gp.governments[polityId].regime = 'authoritarian';
    gp.governments[polityId].laws.pressFreedom = 0.05;
    w.month++;
    advanceGeopolitics(w, emit, locals);
    const persecution = events.find((e) => e.kind === 'persecution_documented');
    expect(persecution?.data).toMatchObject({
      perpetratorPolityId: polityId,
      targetGroup: 'political_dissidents',
      classification: 'documented-harm',
    });
    const record = gp.atrocities[0];
    expect(record.causeIds).toContain(persecution!.id);
    expect(
      events.some((e) => e.kind === 'persecution_evidence' && e.causeIds.includes(persecution!.id)),
    ).toBe(true);
    expect(record.deaths + record.displaced).toBeGreaterThanOrEqual(0);
    expect(record.displaced).toBeGreaterThan(0);
    expect(before - population(w)).toBe(w.audit.deaths);
    expect(
      gp.pendingCasualties.some(
        (p) => p.personId === represented.id && p.kind === 'persecution' && p.causeIds.length > 0,
      ),
    ).toBe(true);
    for (let i = 0; i < 11; i++)
      record.evidenceIds.push(
        emit('persecution_evidence_fixture', [], s.id, `Committed evidence ${i}.`).id,
      );
    const legitimacy = w.polities.find((p) => p.id === polityId)!.legitimacy;
    applyGeopoliticalEffects(w, emit);
    expect(record.accountable).toBe(true);
    expect(record.active).toBe(false);
    expect(w.polities.find((p) => p.id === polityId)!.legitimacy).toBeLessThan(legitimacy);
    expect(
      events.some(
        (e) =>
          e.kind === 'persecution_accountability' &&
          e.causeIds.includes(record.evidenceIds.at(-1)!),
      ),
    ).toBe(true);
    expect(
      Object.values(gp.relations).some(
        (r) => (r.a === polityId || r.b === polityId) && r.status === 'sanctions',
      ),
    ).toBe(true);
  });
});
