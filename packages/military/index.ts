import type { World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { consumeMilitarySupplies } from '../industry/index.js';
import type { Front, GeopoliticalState, War } from '../geopolitics/index.js';

export type TransportMode = 'land' | 'sea';
export type MilitaryLogisticsInvestment = {
  landCapacity: number;
  seaCapacity: number;
  steelSpent: number;
  oilSpent: number;
  treasurySpent: number;
  investedThisMonth: number;
  investmentMonth: number;
};
export type MilitaryRouteFlow = {
  routeId: string;
  mode: 'rail' | 'road' | 'sea';
  capacity: number;
  used: number;
  utilization: number;
  seasonalFactor: number;
  restricted: boolean;
  maritimeInterdiction: boolean;
  causeIds: string[];
};
export type FrontLogistics = {
  warId: string;
  frontIndex: number;
  aSettlementId: string;
  bSettlementId: string;
  stagingA?: string;
  stagingB?: string;
  supplyA: number;
  supplyB: number;
  freightA: number;
  freightB: number;
  routeIdsA: string[];
  routeIdsB: string[];
  interdictedRouteIdsA: string[];
  interdictedRouteIdsB: string[];
  causeIds: string[];
};
export type WarLogistics = {
  frontLogistics: FrontLogistics[];
  sideFulfillment: Record<string, number>;
  consumedByPolity: Record<string, { arms: number; fuel: number }>;
};
export type PolityLogistics = {
  mobilized: number;
  requestedArms: number;
  requestedFuel: number;
  routeFulfillment: number;
  stockFulfillment: number;
  fulfillment: number;
  consumedArms: number;
  consumedFuel: number;
};
export type MilitaryLogisticsResult = {
  month: number;
  wars: Record<string, WarLogistics>;
  polities: Record<string, PolityLogistics>;
  routes: Record<string, MilitaryRouteFlow>;
  unsupportedAirRoutes: number;
};
export type MilitaryLogisticsState = {
  version: 1;
  lastAdvancedMonth: number;
  depotByPolity: Record<string, string>;
  investments: Record<string, MilitaryLogisticsInvestment>;
  lastReportedFulfillment: Record<string, number>;
  lastEventIds: string[];
  lastResult?: MilitaryLogisticsResult;
};

type Route = NonNullable<World['routes']>[number];
type Settlement = World['settlements'][number];
type SupplyRequest = {
  war: War;
  frontIndex: number;
  side: 'A' | 'B';
  polityId: string;
  mobilized: number;
  freight: number;
  targetId: string;
  stagingId?: string;
  routeIds: string[];
  routeFactor: number;
  causeIds: string[];
};
type Edge = {
  route: Route;
  to: string;
  capacity: number;
  cost: number;
  causes: string[];
  interdicted: boolean;
  seasonal: number;
};
const ARMS_PER_MOBILIZED = 0.00045;
const FUEL_PER_MOBILIZED = 0.0002;
const FREIGHT_PER_MOBILIZED = 0.05;
const MAX_INVESTMENT_PER_MONTH = 250;
const MAX_INVESTMENT_TOTAL = 2000;

const cap = (n: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, Number.isFinite(n) ? n : lo));
const pairKey = (a: string, b: string) => [a, b].sort().join('~');
const settlementPopulation = (s: Settlement) =>
  s.cohort.children + s.cohort.adults + s.cohort.elders;

function stateOf(w: World): MilitaryLogisticsState {
  const holder = w as World & { militaryLogistics?: MilitaryLogisticsState };
  holder.militaryLogistics ??= {
    version: 1,
    lastAdvancedMonth: -1,
    depotByPolity: {},
    investments: {},
    lastReportedFulfillment: {},
    lastEventIds: [],
  };
  return holder.militaryLogistics;
}

class MinHeap {
  private values: { id: string; cost: number }[] = [];
  push(value: { id: string; cost: number }) {
    const a = this.values;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >>> 1;
      if (a[p].cost <= value.cost) break;
      a[i] = a[p];
      i = p;
    }
    a[i] = value;
  }
  pop(): { id: string; cost: number } | undefined {
    const a = this.values;
    if (!a.length) return undefined;
    const first = a[0],
      last = a.pop()!;
    if (a.length) {
      let i = 0;
      while (true) {
        const left = i * 2 + 1,
          right = left + 1;
        if (left >= a.length) break;
        const child = right < a.length && a[right].cost < a[left].cost ? right : left;
        if (a[child].cost >= last.cost) break;
        a[i] = a[child];
        i = child;
      }
      a[i] = last;
    }
    return first;
  }
}

function seasonalFactor(w: World, route: Route, settlements: Map<string, Settlement>): number {
  const a = settlements.get(route.from),
    b = settlements.get(route.to);
  const lat = Math.max(Math.abs(a?.lat ?? 0), Math.abs(b?.lat ?? 0));
  const month = ((w.month % 12) + 12) % 12;
  // Bounded scenario-weather heuristic only. No claim of reconstructed historical weather.
  if (lat >= 50 && [10, 11, 0, 1, 2].includes(month)) return route.mode === 'sea' ? 0.75 : 0.9;
  if (lat >= 35 && route.mode === 'sea' && [0, 1].includes(month)) return 0.9;
  return 1;
}

function originalOwner(war: War, settlement: Settlement): string {
  return war.settlementOwnerBefore[settlement.id] ?? settlement.polityId;
}

function depotFor(
  w: World,
  state: MilitaryLogisticsState,
  polityId: string,
  settlements: Map<string, Settlement>,
  byPolity: Map<string, Settlement[]>,
): string | undefined {
  const old = state.depotByPolity[polityId],
    oldSettlement = old ? settlements.get(old) : undefined;
  if (oldSettlement?.polityId === polityId) return old;
  const candidates = byPolity.get(polityId) ?? [];
  const selected = [...candidates].sort(
    (a, b) => settlementPopulation(b) - settlementPopulation(a) || a.id.localeCompare(b.id),
  )[0];
  if (selected) state.depotByPolity[polityId] = selected.id;
  return selected?.id;
}

function friendlyGroup(war: War, polityId: string): Set<string> {
  return war.campA.includes(polityId) ? new Set(war.campA) : new Set(war.campB);
}
function hostileGroup(war: War, polityId: string): Set<string> {
  return war.campA.includes(polityId) ? new Set(war.campB) : new Set(war.campA);
}

function routeCapacityFor(
  w: World,
  state: MilitaryLogisticsState,
  route: Route,
  settlements: Map<string, Settlement>,
  edgeCounts: Map<string, number>,
  geopolitics?: GeopoliticalState,
): { capacity: number; causes: string[]; interdicted: boolean; seasonal: number } {
  const from = settlements.get(route.from),
    to = settlements.get(route.to);
  const a = from?.polityId,
    b = to?.polityId;
  const relation = a && b && a !== b ? geopolitics?.relations[pairKey(a, b)] : undefined;
  const restrictedFactor = route.status === 'restricted' ? 0.25 : 1;
  const seasonal = seasonalFactor(w, route, settlements);
  const investment = (owner: string | undefined) => {
    if (!owner) return 0;
    const q = state.investments[owner];
    const key: TransportMode = route.mode === 'sea' ? 'sea' : 'land';
    const count = edgeCounts.get(`${owner}:${key}`) ?? 0;
    return count > 0 ? (q?.[key === 'sea' ? 'seaCapacity' : 'landCapacity'] ?? 0) / count : 0;
  };
  const interdicted = route.mode === 'sea' && route.status === 'restricted';
  const interdictionFactor = interdicted ? 0.2 : 1;
  return {
    capacity: Math.max(
      0,
      route.capacity * restrictedFactor * seasonal * interdictionFactor +
        investment(a) +
        investment(b),
    ),
    causes: relation?.causeIds.slice(-8) ?? [],
    interdicted,
    seasonal,
  };
}

function makeGraph(
  w: World,
  state: MilitaryLogisticsState,
  war: War,
  polityId: string,
  settlements: Map<string, Settlement>,
  edgeCounts: Map<string, number>,
  geopolitics?: GeopoliticalState,
): {
  graph: Map<string, Edge[]>;
  routeMeta: Map<string, Omit<MilitaryRouteFlow, 'used' | 'utilization'>>;
  unsupportedAir: number;
} {
  const graph = new Map<string, Edge[]>(),
    routeMeta = new Map<string, Omit<MilitaryRouteFlow, 'used' | 'utilization'>>();
  const friendly = friendlyGroup(war, polityId),
    hostile = hostileGroup(war, polityId);
  let unsupportedAir = 0;
  for (const route of w.routes ?? []) {
    if (route.mode === 'air') {
      unsupportedAir++;
      continue;
    }
    if (route.mode === 'sea' && route.status === 'restricted') {
      // Keep the route as a low-capacity, interdicted civilian shipping lane; this is not naval combat.
    }
    const from = settlements.get(route.from),
      to = settlements.get(route.to);
    if (!from || !to || (route.mode !== 'sea' && route.mode !== 'rail' && route.mode !== 'road'))
      continue;
    if (
      !friendly.has(from.polityId) ||
      !friendly.has(to.polityId) ||
      hostile.has(from.polityId) ||
      hostile.has(to.polityId)
    )
      continue;
    const c = routeCapacityFor(w, state, route, settlements, edgeCounts, geopolitics);
    if (c.capacity <= 0) continue;
    // Existing geopolitics records treaty/war routes. Unallied third-country transit remains unavailable.
    const pair =
      from.polityId !== to.polityId
        ? geopolitics?.relations[pairKey(from.polityId, to.polityId)]
        : undefined;
    if (pair && pair.status === 'war') continue;
    const cost = Math.max(1, route.km) + 10000 / Math.max(1, c.capacity);
    const edge = {
      route,
      capacity: c.capacity,
      cost,
      causes: c.causes,
      interdicted: c.interdicted,
      seasonal: c.seasonal,
    };
    const forward = graph.get(route.from) ?? [];
    forward.push({ ...edge, to: route.to });
    graph.set(route.from, forward);
    const reverse = graph.get(route.to) ?? [];
    reverse.push({ ...edge, to: route.from });
    graph.set(route.to, reverse);
    routeMeta.set(route.id, {
      routeId: route.id,
      mode: route.mode,
      capacity: c.capacity,
      seasonalFactor: c.seasonal,
      restricted: route.status === 'restricted',
      maritimeInterdiction: c.interdicted,
      causeIds: c.causes,
    });
  }
  return { graph, routeMeta, unsupportedAir };
}

function shortestPath(
  graph: Map<string, Edge[]>,
  source: string,
  target: string,
): Edge[] | undefined {
  if (source === target) return [];
  const distances = new Map<string, number>([[source, 0]]),
    previous = new Map<string, { from: string; edge: Edge }>();
  const heap = new MinHeap();
  heap.push({ id: source, cost: 0 });
  while (true) {
    const node = heap.pop();
    if (!node) break;
    if (node.cost !== distances.get(node.id)) continue;
    if (node.id === target) break;
    for (const edge of graph.get(node.id) ?? []) {
      const next = node.cost + edge.cost;
      if (next >= (distances.get(edge.to) ?? Infinity)) continue;
      distances.set(edge.to, next);
      previous.set(edge.to, { from: node.id, edge });
      heap.push({ id: edge.to, cost: next });
    }
  }
  if (!distances.has(target)) return undefined;
  const path: Edge[] = [];
  let cursor = target;
  while (cursor !== source) {
    const p = previous.get(cursor);
    if (!p) return undefined;
    path.push(p.edge);
    cursor = p.from;
  }
  path.reverse();
  return path;
}

function stageSettlement(
  war: War,
  side: 'A' | 'B',
  front: Front,
  settlements: Map<string, Settlement>,
  friendly: Set<string>,
): string | undefined {
  const targetId = side === 'A' ? front.aSettlementId : front.bSettlementId;
  const target = settlements.get(targetId);
  if (!target) return undefined;
  if (friendly.has(target.polityId)) return target.id;
  // An occupied endpoint cannot receive supply. Stage at the nearest still-controlled coalition settlement.
  const candidates = [...settlements.values()].filter((s) => friendly.has(s.polityId));
  candidates.sort(
    (a, b) =>
      Math.hypot(a.x - target.x, a.y - target.y) - Math.hypot(b.x - target.x, b.y - target.y) ||
      a.id.localeCompare(b.id),
  );
  return candidates[0]?.id;
}

function edgeCountByOwner(w: World): Map<string, number> {
  const counts = new Map<string, number>(),
    byId = new Map(w.settlements.map((s) => [s.id, s]));
  for (const r of w.routes ?? []) {
    const mode = r.mode === 'sea' ? 'sea' : r.mode === 'air' ? undefined : 'land';
    if (!mode) continue;
    for (const owner of new Set([byId.get(r.from)?.polityId, byId.get(r.to)?.polityId]))
      if (owner) counts.set(`${owner}:${mode}`, (counts.get(`${owner}:${mode}`) ?? 0) + 1);
  }
  return counts;
}

function emptyResult(month: number): MilitaryLogisticsResult {
  return { month, wars: {}, polities: {}, routes: {}, unsupportedAirRoutes: 0 };
}

/**
 * Resolve every active war together, after mobilization and before combat. One national inventory
 * is charged once, while line-haul capacity is shared by all fronts and wars that use each route.
 */
export function advanceMilitaryLogistics(w: World, emit: Emit): MilitaryLogisticsResult {
  if (!w.pack.id.startsWith('earth-')) return emptyResult(w.month);
  const state = stateOf(w);
  if (state.lastAdvancedMonth === w.month && state.lastResult)
    return structuredClone(state.lastResult);
  const geo = w.geopolitics,
    wars = geo?.wars.filter((war) => war.status === 'active') ?? [];
  const result = emptyResult(w.month);
  result.unsupportedAirRoutes = new Set(
    (w.routes ?? []).filter((route) => route.mode === 'air').map((route) => route.id),
  ).size;
  if (!wars.length) {
    state.lastAdvancedMonth = w.month;
    state.lastResult = result;
    return result;
  }
  const settlements = new Map(w.settlements.map((s) => [s.id, s])),
    byPolity = new Map<string, Settlement[]>();
  for (const s of w.settlements) {
    const list = byPolity.get(s.polityId) ?? [];
    list.push(s);
    byPolity.set(s.polityId, list);
  }
  const edgeCounts = edgeCountByOwner(w),
    totalMob = new Map<string, number>(),
    requests: SupplyRequest[] = [];
  const graphCache = new Map<string, ReturnType<typeof makeGraph>>();
  for (const war of wars) {
    const fronts = war.fronts;
    result.wars[war.id] = { frontLogistics: [], sideFulfillment: {}, consumedByPolity: {} };
    if (!fronts.length) continue;
    for (const side of ['A', 'B'] as const) {
      const participants = side === 'A' ? war.campA : war.campB;
      const friendly = new Set(participants);
      for (const polityId of participants) {
        const mobilized = Math.max(0, war.mobilized[polityId] ?? 0);
        if (!mobilized) continue;
        totalMob.set(polityId, (totalMob.get(polityId) ?? 0) + mobilized);
        const depot = depotFor(w, state, polityId, settlements, byPolity);
        if (!depot) continue;
        const cacheKey = `${war.id}:${polityId}`;
        let built = graphCache.get(cacheKey);
        if (!built) {
          built = makeGraph(w, state, war, polityId, settlements, edgeCounts, geo);
          graphCache.set(cacheKey, built);
        }
        for (let frontIndex = 0; frontIndex < fronts.length; frontIndex++) {
          const front = fronts[frontIndex],
            staging = stageSettlement(war, side, front, settlements, friendly);
          const share = mobilized / fronts.length;
          if (!staging || share <= 0) {
            requests.push({
              war,
              frontIndex,
              side,
              polityId,
              mobilized: share,
              freight: share * FREIGHT_PER_MOBILIZED,
              targetId: side === 'A' ? front.aSettlementId : front.bSettlementId,
              stagingId: staging,
              routeIds: [],
              routeFactor: 0,
              causeIds: war.causeIds.slice(-8),
            });
            continue;
          }
          const path = shortestPath(built.graph, depot, staging);
          const causes = [
            ...new Set([...war.causeIds, ...(path ?? []).flatMap((e) => e.causes)]),
          ].slice(-16);
          requests.push({
            war,
            frontIndex,
            side,
            polityId,
            mobilized: share,
            freight: share * FREIGHT_PER_MOBILIZED,
            targetId: side === 'A' ? front.aSettlementId : front.bSettlementId,
            stagingId: staging,
            routeIds: path?.map((e) => e.route.id) ?? [],
            routeFactor: path ? 1 : 0,
            causeIds: causes,
          });
        }
      }
    }
  }
  // Apply one proportional congestion factor per shared route, iterating to honor overlapping paths.
  const graphMeta = new Map<string, Omit<MilitaryRouteFlow, 'used' | 'utilization'>>();
  for (const built of graphCache.values())
    for (const [id, meta] of built.routeMeta) graphMeta.set(id, meta);
  for (const req of requests)
    if (
      !req.routeIds.length &&
      req.stagingId &&
      req.stagingId === state.depotByPolity[req.polityId]
    )
      req.routeFactor = 1;
  for (let iteration = 0; iteration < 8; iteration++) {
    const routeDemand = new Map<string, number>();
    for (const req of requests)
      if (req.routeFactor > 0)
        for (const id of req.routeIds)
          routeDemand.set(id, (routeDemand.get(id) ?? 0) + req.freight * req.routeFactor);
    let changed = false;
    for (const [id, demand] of routeDemand) {
      const capacity = graphMeta.get(id)?.capacity ?? 0;
      if (demand <= capacity + 1e-9 || demand <= 0) continue;
      const factor = capacity / demand;
      for (const req of requests) if (req.routeIds.includes(id)) req.routeFactor *= factor;
      changed = true;
    }
    if (!changed) break;
  }
  const routeUsage = new Map<string, number>();
  for (const req of requests)
    if (req.routeFactor > 0)
      for (const id of req.routeIds)
        routeUsage.set(id, (routeUsage.get(id) ?? 0) + req.freight * req.routeFactor);
  for (const [id, meta] of graphMeta) {
    const used = Math.min(meta.capacity, routeUsage.get(id) ?? 0);
    result.routes[id] = {
      ...meta,
      used,
      utilization: meta.capacity > 0 ? cap(used / meta.capacity) : 0,
    };
  }

  const routeWeighted = new Map<string, { delivered: number; requested: number }>();
  for (const req of requests) {
    const q = routeWeighted.get(req.polityId) ?? { delivered: 0, requested: 0 };
    q.requested += req.freight;
    q.delivered += req.freight * req.routeFactor;
    routeWeighted.set(req.polityId, q);
  }
  const consumption: Record<string, { arms: number; fuel: number }> = {};
  for (const [polityId, mobilized] of totalMob) {
    const requestedArms = mobilized * ARMS_PER_MOBILIZED,
      requestedFuel = mobilized * FUEL_PER_MOBILIZED;
    const rw = routeWeighted.get(polityId) ?? { delivered: 0, requested: 0 };
    const routeFulfillment = rw.requested > 0 ? cap(rw.delivered / rw.requested) : 0;
    const routedArms = requestedArms * routeFulfillment,
      routedFuel = requestedFuel * routeFulfillment;
    const consumed = w.industry
      ? consumeMilitarySupplies(w, polityId, routedArms, routedFuel)
      : { arms: 0, fuel: 0, fulfillment: 0 };
    const stockFulfillment =
      routedArms + routedFuel > 0
        ? cap(
            Math.min(
              routedArms > 0 ? consumed.arms / routedArms : 1,
              routedFuel > 0 ? consumed.fuel / routedFuel : 1,
            ),
          )
        : 0;
    const fulfillment = routeFulfillment * stockFulfillment;
    result.polities[polityId] = {
      mobilized,
      requestedArms,
      requestedFuel,
      routeFulfillment,
      stockFulfillment,
      fulfillment,
      consumedArms: consumed.arms,
      consumedFuel: consumed.fuel,
    };
    consumption[polityId] = { arms: consumed.arms, fuel: consumed.fuel };
  }
  const deliveredByPolity = new Map<string, number>();
  for (const req of requests)
    deliveredByPolity.set(
      req.polityId,
      (deliveredByPolity.get(req.polityId) ?? 0) + req.freight * req.routeFactor,
    );
  for (const req of requests) {
    const warResult = result.wars[req.war.id];
    const totalDelivered = deliveredByPolity.get(req.polityId) ?? 0;
    const share = totalDelivered > 0 ? (req.freight * req.routeFactor) / totalDelivered : 0;
    const old = warResult.consumedByPolity[req.polityId] ?? { arms: 0, fuel: 0 };
    const total = consumption[req.polityId] ?? { arms: 0, fuel: 0 };
    warResult.consumedByPolity[req.polityId] = {
      arms: old.arms + total.arms * share,
      fuel: old.fuel + total.fuel * share,
    };
  }
  for (const war of wars) {
    const wr = result.wars[war.id];
    for (let frontIndex = 0; frontIndex < war.fronts.length; frontIndex++) {
      const front = war.fronts[frontIndex];
      const reqA = requests.filter(
        (r) => r.war.id === war.id && r.frontIndex === frontIndex && r.side === 'A',
      );
      const reqB = requests.filter(
        (r) => r.war.id === war.id && r.frontIndex === frontIndex && r.side === 'B',
      );
      const weighted = (list: SupplyRequest[]) => {
        const n = list.reduce((n, r) => n + r.mobilized, 0);
        return n > 0
          ? cap(
              list.reduce(
                (sum, r) =>
                  sum +
                  r.mobilized *
                    r.routeFactor *
                    (result.polities[r.polityId]?.stockFulfillment ?? 0),
                0,
              ) / n,
            )
          : 0;
      };
      const paths = (list: SupplyRequest[]) => [...new Set(list.flatMap((r) => r.routeIds))];
      const causes = [...new Set([...reqA, ...reqB].flatMap((r) => r.causeIds))].slice(0, 24);
      const frontResult: FrontLogistics = {
        warId: war.id,
        frontIndex,
        aSettlementId: front.aSettlementId,
        bSettlementId: front.bSettlementId,
        stagingA: reqA.find((r) => r.stagingId)?.stagingId,
        stagingB: reqB.find((r) => r.stagingId)?.stagingId,
        supplyA: weighted(reqA),
        supplyB: weighted(reqB),
        freightA: reqA.reduce((n, r) => n + r.freight * r.routeFactor, 0),
        freightB: reqB.reduce((n, r) => n + r.freight * r.routeFactor, 0),
        routeIdsA: paths(reqA),
        routeIdsB: paths(reqB),
        interdictedRouteIdsA: paths(reqA).filter((id) => result.routes[id]?.maritimeInterdiction),
        interdictedRouteIdsB: paths(reqB).filter((id) => result.routes[id]?.maritimeInterdiction),
        causeIds: causes,
      };
      wr.frontLogistics.push(frontResult);
    }
  }
  for (const [polityId, info] of Object.entries(result.polities)) {
    const key = `${w.month}:${polityId}`;
    const previous = state.lastReportedFulfillment[polityId] ?? 1;
    if (info.fulfillment < 0.5 && (previous >= 0.5 || previous - info.fulfillment >= 0.15)) {
      const war = wars.find((q) => q.campA.includes(polityId) || q.campB.includes(polityId));
      const depot = state.depotByPolity[polityId];
      const causes = [
        ...new Set([...(war?.causeIds ?? []), ...(w.industry?.lastEventIds.slice(-4) ?? [])]),
      ].slice(-16);
      const event = emit(
        'military_supply_shortfall',
        [],
        depot,
        `${polityId}的军需受到库存或前线运输限制。`,
        {
          polityId,
          fulfillment: info.fulfillment,
          routeFulfillment: info.routeFulfillment,
          stockFulfillment: info.stockFulfillment,
          classification: 'simulated-consequence',
        },
        causes,
        0.75,
      );
      state.lastEventIds.push(event.id);
    }
    state.lastReportedFulfillment[polityId] = info.fulfillment;
    void key;
  }
  for (const war of wars)
    for (const side of [...war.campA, ...war.campB]) {
      const q = result.polities[side];
      if (q) result.wars[war.id].sideFulfillment[side] = q.fulfillment;
    }
  if (state.lastEventIds.length > 256) state.lastEventIds = state.lastEventIds.slice(-256);
  state.lastAdvancedMonth = w.month;
  state.lastResult = structuredClone(result);
  return result;
}

/** Invest in road/rail or civilian sea-lift capacity. This is normalized cargo capacity, not a fleet. */
export function investMilitaryTransport(
  w: World,
  polityId: string,
  mode: TransportMode,
  capacity: number,
  emit: Emit,
): { ok: boolean; investment?: MilitaryLogisticsInvestment; causeId?: string; error?: string } {
  if (!w.pack.id.startsWith('earth-'))
    return { ok: false, error: 'Military transport investment requires an Earth world' };
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > MAX_INVESTMENT_PER_MONTH)
    return { ok: false, error: 'Investment capacity must be an integer from 1 to 250' };
  const state = stateOf(w);
  if (state.lastAdvancedMonth === w.month)
    return { ok: false, error: 'Monthly logistics were already finalized' };
  const polity = w.polities.find((p) => p.id === polityId),
    industry = w.industry?.polities[polityId];
  if (!polity || !industry)
    return { ok: false, error: 'Polity or industrial ledger is unavailable' };
  const investment = (state.investments[polityId] ??= {
    landCapacity: 0,
    seaCapacity: 0,
    steelSpent: 0,
    oilSpent: 0,
    treasurySpent: 0,
    investedThisMonth: 0,
    investmentMonth: -1,
  });
  if (investment.investmentMonth !== w.month) {
    investment.investmentMonth = w.month;
    investment.investedThisMonth = 0;
  }
  if (
    investment.investedThisMonth + capacity > MAX_INVESTMENT_PER_MONTH ||
    investment[mode === 'land' ? 'landCapacity' : 'seaCapacity'] + capacity > MAX_INVESTMENT_TOTAL
  )
    return {
      ok: false,
      error: 'Transport investment reaches its monthly or lifetime capacity bound',
    };
  const steel = capacity * (mode === 'sea' ? 0.05 : 0.025),
    oil = capacity * (mode === 'sea' ? 0.04 : 0.015),
    money = capacity * 2;
  if (industry.goods.steel < steel || industry.goods.oil < oil || polity.treasury < money)
    return { ok: false, error: 'Insufficient steel, oil, or treasury funds' };
  industry.goods.steel -= steel;
  industry.goods.oil -= oil;
  w.industry!.ledger.consumed.steel += steel;
  w.industry!.ledger.consumed.oil += oil;
  polity.treasury -= money;
  const receiver = w.settlements.find((s) => s.polityId === polityId);
  if (receiver) receiver.coin += money;
  else polity.treasury += money;
  investment[mode === 'sea' ? 'seaCapacity' : 'landCapacity'] += capacity;
  investment.steelSpent += steel;
  investment.oilSpent += oil;
  investment.treasurySpent += money;
  investment.investedThisMonth += capacity;
  const causes = w.industry!.lastEventIds.slice(-8);
  const event = emit(
    'military_transport_investment',
    [],
    receiver?.id,
    `${polity.name}投入钢材、燃料和财政资源扩充${mode === 'sea' ? '民用海运' : '陆路'}军需运输能力。`,
    {
      polityId,
      mode,
      normalizedCapacity: capacity,
      steel,
      oil,
      money,
      fleetCreated: false,
      classification: 'simulated-investment',
    },
    causes,
    0.6,
  );
  state.lastEventIds.push(event.id);
  return { ok: true, investment: structuredClone(investment), causeId: event.id };
}
