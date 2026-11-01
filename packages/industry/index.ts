import { clamp, type HistoricalEvent, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { populationMean } from '../world-systems/aggregation.js';
export const goods = ['coal', 'ore', 'steel', 'oil', 'arms', 'medicine'] as const;
export type Good = (typeof goods)[number];
export type Stocks = Record<Good, number>;
export type IndustrialPolity = {
  goods: Stocks;
  capacity: Stocks;
  prices: Stocks;
  technology: number;
  investment: number;
  laborShare: number;
  lastShortages: Good[];
};
export type IndustrialCapacityShare = {
  ownerPolityId: string;
  capacity: Stocks;
  lastCauseId?: string;
};
export type IndustrialState = {
  version: 1;
  month: number;
  polities: Record<string, IndustrialPolity>;
  /** Normalized productive capacity stays attached to physical settlements. */
  capacityShares?: Record<string, IndustrialCapacityShare>;
  ownershipReceipts?: string[];
  ledger: { initial: Stocks; produced: Stocks; consumed: Stocks; destroyed: Stocks };
  lastEventIds: string[];
};
const endowment = (id: string, g: Good) => {
  let h = 2166136261;
  for (const c of `${id}:${g}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return 0.15 + ((h >>> 0) % 1700) / 1000;
};
const zero = (): Stocks => ({ coal: 0, ore: 0, steel: 0, oil: 0, arms: 0, medicine: 0 });
const initialRates: Stocks = {
  coal: 0.0006,
  ore: 0.0005,
  steel: 0.0002,
  oil: 0.00015,
  arms: 0.00008,
  medicine: 0.00004,
};
const rates: Stocks = {
  coal: 0.00012,
  ore: 0.0001,
  steel: 0.00004,
  oil: 0.000035,
  arms: 0.000012,
  medicine: 0.000006,
};
const cost: Stocks = { coal: 0.4, ore: 0.5, steel: 1, oil: 0.6, arms: 2, medicine: 1.5 };
const recipes: Partial<Record<Good, Partial<Stocks>>> = {
  steel: { ore: 1.5, coal: 1 },
  arms: { steel: 1.3, coal: 0.4, oil: 0.1 },
  medicine: { coal: 0.1, oil: 0.1, steel: 0.02 },
};
export function initializeIndustry(w: World): IndustrialState {
  if (w.industry) return w.industry;
  const polities: IndustrialState['polities'] = {},
    initial = zero();
  const pop = new Map<string, number>();
  for (const s of w.settlements)
    pop.set(
      s.polityId,
      (pop.get(s.polityId) ?? 0) + s.cohort.adults + s.cohort.children + s.cohort.elders,
    );
  for (const p of w.polities) {
    const n = pop.get(p.id) ?? 0,
      stock = zero(),
      capacity = zero(),
      prices = { ...cost };
    for (const g of goods) {
      stock[g] = n * initialRates[g];
      initial[g] += stock[g];
      capacity[g] = n * rates[g] * endowment(p.id, g);
    }
    polities[p.id] = {
      goods: stock,
      capacity,
      prices,
      technology: 0.1,
      investment: 0,
      laborShare: 0.06,
      lastShortages: [],
    };
  }
  const capacityShares: IndustrialState['capacityShares'] = {};
  for (const s of w.settlements) {
    const population = s.cohort.adults + s.cohort.children + s.cohort.elders,
      polityPopulation = pop.get(s.polityId) ?? 0,
      share = zero(),
      polityCapacity = polities[s.polityId]?.capacity;
    for (const g of goods)
      share[g] =
        polityPopulation > 0 ? ((polityCapacity?.[g] ?? 0) * population) / polityPopulation : 0;
    capacityShares[s.id] = { ownerPolityId: s.polityId, capacity: share };
  }
  return (w.industry = {
    version: 1,
    month: -1,
    polities,
    capacityShares,
    ownershipReceipts: [],
    ledger: { initial, produced: zero(), consumed: zero(), destroyed: zero() },
    lastEventIds: [],
  });
}

const populationOf = (s: World['settlements'][number]) =>
  s.cohort.adults + s.cohort.children + s.cohort.elders;
const sumCapacity = (shares: IndustrialCapacityShare[]) => {
  const total = zero();
  for (const share of shares) for (const g of goods) total[g] += share.capacity[g];
  return total;
};
const scaleCapacity = (capacity: Stocks, factor: number): Stocks => {
  const result = zero();
  for (const g of goods) result[g] = capacity[g] * factor;
  return result;
};
const findOwnershipCause = (settlementId: string, events: HistoricalEvent[]) =>
  [...events].reverse().find((event) => {
    if (
      ![
        'territory_occupied',
        'territory_liberated',
        'independence_declared',
        'autonomy_granted',
        'settlement_control_changed',
      ].includes(event.kind)
    )
      return false;
    const data = event.data as Record<string, unknown>;
    return (
      event.locationId === settlementId ||
      data.settlementId === settlementId ||
      (Array.isArray(data.settlementIds) && data.settlementIds.includes(settlementId))
    );
  });

/**
 * Add zero-stock records for new polities and reconcile productive capacity to live city control.
 * A control transfer is applied only when its committed event is supplied in `events`.
 */
export function reconcileIndustrialOwnership(w: World, emit: Emit, events: HistoricalEvent[] = []) {
  const state = initializeIndustry(w),
    polityIds = new Set(w.polities.map((polity) => polity.id));
  state.ownershipReceipts ??= [];
  for (const polity of w.polities)
    if (!state.polities[polity.id])
      state.polities[polity.id] = {
        goods: zero(),
        capacity: zero(),
        prices: { ...cost },
        technology: 0.1,
        investment: 0,
        laborShare: 0.06,
        lastShortages: [],
      };

  // Upgrade old saves once by spreading each existing national capacity across its current cities.
  if (
    !(state as IndustrialState & { capacityShares?: IndustrialState['capacityShares'] })
      .capacityShares
  ) {
    state.capacityShares = {};
    const byPolity = new Map<string, World['settlements']>();
    for (const settlement of w.settlements) {
      const list = byPolity.get(settlement.polityId) ?? [];
      list.push(settlement);
      byPolity.set(settlement.polityId, list);
    }
    for (const [polityId, industrial] of Object.entries(state.polities)) {
      const places = byPolity.get(polityId) ?? [],
        totalPopulation = places.reduce((sum, s) => sum + populationOf(s), 0);
      for (const settlement of places) {
        const ratio = totalPopulation > 0 ? populationOf(settlement) / totalPopulation : 0;
        state.capacityShares[settlement.id] = {
          ownerPolityId: polityId,
          capacity: scaleCapacity(industrial.capacity, ratio),
        };
      }
      if (!places.length) industrial.capacity = zero();
    }
    const migration = emit(
      'industrial_capacity_shares_migrated',
      [],
      undefined,
      '旧工业存档的国家产能按当前城市人口守恒摊分到城市；此迁移不增加库存、产能或资源总量。',
      { classification: 'bounded-state-migration', units: 'normalized-industrial-units' },
      state.lastEventIds.slice(-4),
      0.25,
    );
    state.ownershipReceipts = [migration.id];
    state.lastEventIds = [...state.lastEventIds, migration.id].slice(-64);
  }
  const capacityShares = (state.capacityShares ??= {});

  const changed: Array<{
    settlementId: string;
    from: string;
    to: string;
    sourceEvent: HistoricalEvent;
  }> = [];
  for (const settlement of w.settlements) {
    let share = capacityShares[settlement.id];
    if (!share) {
      // A newly registered area has no free factories or mines. Existing capacity is
      // retained; explicit funded construction/refinement must transfer it separately.
      const capacity = zero();
      share = capacityShares[settlement.id] = {
        ownerPolityId: settlement.polityId,
        capacity,
      };
    }
    if (share.ownerPolityId === settlement.polityId) continue;
    const sourceEvent = findOwnershipCause(settlement.id, events);
    if (!sourceEvent) continue;
    changed.push({
      settlementId: settlement.id,
      from: share.ownerPolityId,
      to: settlement.polityId,
      sourceEvent,
    });
    share.ownerPolityId = settlement.polityId;
  }
  const transfers: Array<{
    settlementId: string;
    from: string;
    to: string;
    sourceEventId: string;
    eventId: string;
  }> = [];
  for (const transfer of changed) {
    const share = capacityShares[transfer.settlementId]!;
    const e = emit(
      'industrial_capacity_control_transferred',
      [],
      transfer.settlementId,
      '该城市的模拟产能随已提交的实际控制权变更转入新控制方；既有库存不随领土自动转移。',
      {
        settlementId: transfer.settlementId,
        fromPolityId: transfer.from,
        toPolityId: transfer.to,
        capacity: share.capacity,
        classification: 'control-bound-capacity-transfer',
      },
      [transfer.sourceEvent.id],
      0.6,
    );
    share.lastCauseId = e.id;
    state.ownershipReceipts = [...(state.ownershipReceipts ?? []), e.id].slice(-64);
    state.lastEventIds = [...state.lastEventIds, e.id].slice(-64);
    transfers.push({
      settlementId: transfer.settlementId,
      from: transfer.from,
      to: transfer.to,
      sourceEventId: transfer.sourceEvent.id,
      eventId: e.id,
    });
  }

  // Legacy writes to aggregate capacity remain supported when no ownership changed this tick.
  if (!changed.length) {
    const sharesByOwner = new Map<string, Array<{ id: string; share: IndustrialCapacityShare }>>();
    for (const [id, share] of Object.entries(capacityShares)) {
      const list = sharesByOwner.get(share.ownerPolityId) ?? [];
      list.push({ id, share });
      sharesByOwner.set(share.ownerPolityId, list);
    }
    for (const polityId of polityIds) {
      const industrial = state.polities[polityId]!;
      const shares = sharesByOwner.get(polityId) ?? [];
      const current = sumCapacity(shares.map(({ share }) => share));
      for (const g of goods)
        if (current[g] > 0 && Math.abs(industrial.capacity[g] - current[g]) > 1e-10) {
          const ratio = industrial.capacity[g] / current[g];
          for (const { share } of shares) share.capacity[g] *= ratio;
        }
    }
  }
  for (const industrial of Object.values(state.polities)) industrial.capacity = zero();
  for (const share of Object.values(capacityShares)) {
    const owner = state.polities[share.ownerPolityId];
    if (owner) for (const g of goods) owner.capacity[g] += share.capacity[g];
  }
  return { state, transfers };
}
export function consumeMilitarySupplies(
  w: World,
  polityId: string,
  armsNeed: number,
  fuelNeed: number,
) {
  const state = w.industry,
    p = state?.polities[polityId];
  if (!p) return { arms: 0, fuel: 0, fulfillment: 0 };
  const take = (g: 'arms' | 'oil', need: number) => {
    const n = Math.min(p.goods[g], Math.max(0, need));
    p.goods[g] -= n;
    state!.ledger.consumed[g] += n;
    return n;
  };
  const arms = take('arms', armsNeed),
    fuel = take('oil', fuelNeed);
  return {
    arms,
    fuel,
    fulfillment: Math.min(armsNeed > 0 ? arms / armsNeed : 1, fuelNeed > 0 ? fuel / fuelNeed : 1),
  };
}
/** Normalized industrial units, not claims of historical tonnes or mine locations. Fiscal payments always have a receiving treasury. */
export function advanceIndustry(w: World, emit: Emit, events: HistoricalEvent[] = []) {
  if (!w.pack.id.startsWith('earth-')) return;
  const first = !w.industry,
    state = initializeIndustry(w);
  reconcileIndustrialOwnership(w, emit, events);
  if (state.month === w.month) return;
  state.month = w.month;
  const byPolity = new Map<string, World['settlements']>();
  for (const s of w.settlements) {
    const list = byPolity.get(s.polityId) ?? [];
    list.push(s);
    byPolity.set(s.polityId, list);
  }
  if (first) {
    const e = emit(
      'industrial_baseline',
      [],
      undefined,
      '工业生产与库存进入模拟；初始资源为有界场景估计，不是历史矿产统计。',
      { goods, classification: 'scenario-initialization', units: 'normalized-industrial-units' },
      [],
      0.3,
    );
    state.lastEventIds.push(e.id);
  }
  for (const polity of w.polities) {
    const p = state.polities[polity.id];
    if (!p) continue;
    const places = byPolity.get(polity.id) ?? [],
      supplier = places[0];
    if (!supplier) continue;
    const knowledge = populationMean(places, (s) => s.knowledge),
      infrastructure = populationMean(places, (s) => s.economy?.infrastructure ?? 0.4);
    const stress = populationMean(places, (s) => (s.economy?.unemployment ?? 0) + s.unrest * 0.3);
    let output = clamp(
      (0.4 + infrastructure * 0.6) * (1 - Math.min(0.7, stress)) * (0.8 + p.technology * 0.4),
      0.05,
      1.5,
    );
    const absent = Object.values(w.society?.laborDisputes ?? {})
      .filter(
        (d) =>
          d.status === 'active' &&
          d.starts <= w.month &&
          d.until > w.month &&
          places.some((s) => s.id === d.locationId),
      )
      .reduce((n, d) => n + d.participants.length, 0);
    const labor = places.reduce((n, s) => n + s.cohort.adults, 0);
    output *= 1 - Math.min(0.3, absent / Math.max(1, labor)) * 0.75;
    const beforeShortages = [...p.lastShortages];
    p.lastShortages = [];
    for (const g of goods) {
      let quantity = Math.min(p.capacity[g] * output, polity.treasury / cost[g]);
      for (const [input, need] of Object.entries(recipes[g] ?? {}))
        quantity = Math.min(quantity, p.goods[input as Good] / need!);
      quantity = Math.max(0, quantity);
      for (const [input, need] of Object.entries(recipes[g] ?? {})) {
        p.goods[input as Good] -= quantity * need!;
        state.ledger.consumed[input as Good] += quantity * need!;
      }
      const paid = quantity * cost[g];
      polity.treasury -= paid;
      supplier.coin += paid;
      p.goods[g] += quantity;
      state.ledger.produced[g] += quantity;
      if (quantity < p.capacity[g] * 0.3) p.lastShortages.push(g);
      const desired = p.capacity[g] * 4;
      p.prices[g] = clamp(
        cost[g] * (0.6 + desired / Math.max(1, p.goods[g])),
        cost[g] * 0.4,
        cost[g] * 8,
      );
    }
    // Medicine is expended by actual public-care services, rather than an uncosted healing modifier.
    const demand = p.capacity.medicine * 0.8,
      used = Math.min(demand, p.goods.medicine);
    p.goods.medicine -= used;
    state.ledger.consumed.medicine += used;
    if (demand > 0)
      for (const s of places)
        if (s.economy)
          s.economy.healthcare = clamp(s.economy.healthcare + (used / demand - 0.75) * 0.0005);
    const invest = Math.min(polity.treasury, Math.max(0, p.capacity.steel * 0.04));
    if (invest > 0 && p.goods.steel > invest * 0.1 && knowledge > 0.25) {
      polity.treasury -= invest;
      supplier.coin += invest;
      p.goods.steel -= invest * 0.1;
      state.ledger.consumed.steel += invest * 0.1;
      p.investment += invest;
      p.technology = clamp(p.technology + 0.0002 * knowledge, 0, 2);
      const factor = 1 + 0.0001 * knowledge;
      for (const g of goods) p.capacity[g] *= factor;
      for (const share of Object.values(state.capacityShares ?? {}))
        if (share.ownerPolityId === polity.id) for (const g of goods) share.capacity[g] *= factor;
    }
    if (
      w.month % 12 === 0 &&
      p.lastShortages.length &&
      p.lastShortages.join(',') !== beforeShortages.join(',')
    ) {
      const e = emit(
        'industrial_shortage',
        [],
        supplier.id,
        `${polity.name}部分产业因原料、财政或基础设施不足而减产。`,
        { polityId: polity.id, goods: p.lastShortages, classification: 'simulated-consequence' },
        state.lastEventIds.slice(-4),
        0.6,
      );
      state.lastEventIds.push(e.id);
    }
  }
  // Sparse bilateral market, indexed by available transport edges; sanctions and wars bind actual transfers.
  const edges = new Map<string, { a: string; b: string; capacity: number }>(),
    locations = new Map(w.settlements.map((s) => [s.id, s]));
  for (const r of w.routes ?? []) {
    const a = locations.get(r.from)?.polityId,
      b = locations.get(r.to)?.polityId;
    if (!a || !b || a === b) continue;
    const key = [a, b].sort().join('~'),
      e = edges.get(key) ?? { a, b, capacity: 0 };
    e.capacity += r.capacity * (r.status === 'restricted' ? 0.25 : 1);
    edges.set(key, e);
  }
  const polities = new Map(w.polities.map((p) => [p.id, p]));
  for (const [key, edge] of edges) {
    const a = state.polities[edge.a],
      b = state.polities[edge.b];
    if (!a || !b) continue;
    const diplomacy = w.geopolitics?.relations[key],
      factor = diplomacy?.status === 'war' ? 0 : diplomacy?.status === 'sanctions' ? 0.2 : 1;
    for (const g of goods) {
      const desiredA = a.capacity[g] * 3,
        desiredB = b.capacity[g] * 3,
        ratioA = a.goods[g] / Math.max(1, desiredA),
        ratioB = b.goods[g] / Math.max(1, desiredB);
      const seller = ratioA > ratioB ? a : b,
        buyer = seller === a ? b : a,
        sellerId = seller === a ? edge.a : edge.b,
        buyerId = seller === a ? edge.b : edge.a;
      const sellerTreasury = polities.get(sellerId)!,
        buyerTreasury = polities.get(buyerId)!,
        price = (seller.prices[g] + buyer.prices[g]) / 2;
      const amount = Math.max(
        0,
        Math.min(
          seller.goods[g] - seller.capacity[g] * 3,
          buyer.capacity[g] * 3 - buyer.goods[g],
          edge.capacity * 0.02 * factor,
          buyerTreasury.treasury / price,
        ),
      );
      if (amount <= 0) continue;
      seller.goods[g] -= amount;
      buyer.goods[g] += amount;
      const paid = amount * price;
      buyerTreasury.treasury -= paid;
      sellerTreasury.treasury += paid;
    }
  }
  state.lastEventIds = state.lastEventIds.slice(-64);
}
/** Apply after base economic multipliers have been recomputed; this never compounds last month's multiplier. */
export function applyIndustrialLabor(w: World) {
  if (!w.industry) return;
  for (const s of w.settlements) {
    const p = w.industry.polities[s.polityId];
    if (!p || !s.economy) continue;
    s.economy.productionMultiplier *= 1 - p.laborShare * 0.3;
    if (p.lastShortages.length)
      s.economy.unemployment = clamp(s.economy.unemployment + p.lastShortages.length * 0.005);
  }
}
export function assertIndustrialLedger(w: World) {
  const state = w.industry;
  if (!state) return;
  for (const g of goods) {
    const actual = Object.values(state.polities).reduce((n, p) => n + p.goods[g], 0),
      expected =
        state.ledger.initial[g] +
        state.ledger.produced[g] -
        state.ledger.consumed[g] -
        state.ledger.destroyed[g];
    if (
      !Number.isFinite(actual) ||
      actual < -0.00001 ||
      Math.abs(actual - expected) > Math.max(0.001, Math.abs(expected) * 1e-8)
    )
      throw new Error(`Industrial ledger mismatch: ${g}`);
  }
}
