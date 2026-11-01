import type { HistoricalEvent, World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { reconcileIndustrialOwnership } from '../industry/index.js';
import {
  requestSovereigntyTransition,
  authorityAt,
  foreignAuthority,
} from '../sovereignty/index.js';
import { clamp } from '../contracts/index.js';

export type StateEvolutionState = {
  version: 1;
  lastAdvancedMonth: number;
  industrialControlReceipts: string[];
  lastEventIds: string[];
};
type StateEvolutionWorld = World & { stateEvolution?: StateEvolutionState };

export function ensureStateEvolution(w: World): StateEvolutionState {
  const state = w as StateEvolutionWorld;
  return (state.stateEvolution ??= {
    version: 1,
    lastAdvancedMonth: -1,
    industrialControlReceipts: [],
    lastEventIds: [],
  });
}

/**
 * Reconcile state-owned industrial records after committed political control changes and before
 * industry production. Pass this tick's committed events so capacity transfers cite the actual
 * autonomy, independence, occupation, or recapture event that changed settlement.polityId.
 */
export function advanceStateEvolution(w: World, emit: Emit, events: HistoricalEvent[] = []) {
  if (!w.pack.id.startsWith('earth-')) return;
  reconcileWarTerritories(w, emit, events);
  const state = ensureStateEvolution(w),
    result = reconcileIndustrialOwnership(w, emit, events);
  const receipts = result.transfers.map((transfer) => transfer.eventId);
  state.industrialControlReceipts = [
    ...new Set([...state.industrialControlReceipts, ...receipts]),
  ].slice(-64);
  state.lastEventIds = [...new Set([...state.lastEventIds, ...result.state.lastEventIds])].slice(
    -64,
  );
  state.lastAdvancedMonth = w.month;
  return result;
}

/** A recognized new administration is either a lawful coalition member or a neutral territory. */
export function reconcileWarTerritories(w: World, emit: Emit, events: HistoricalEvent[]) {
  const changes = events.filter(
    (e) => e.kind === 'independence_declared' || e.kind === 'autonomy_granted',
  );
  if (!changes.length || !w.geopolitics) return;
  const cities = new Map(w.settlements.map((s) => [s.id, s]));
  for (const war of w.geopolitics.wars) {
    if (war.status !== 'active') continue;
    const affected = new Set(
      changes.flatMap((e) =>
        Array.isArray(e.data.settlementIds)
          ? (e.data.settlementIds as string[])
          : e.locationId
            ? [e.locationId]
            : [],
      ),
    );
    for (const id of affected) {
      const s = cities.get(id);
      if (!s) continue;
      const parent = foreignAuthority(w, s.polityId).authorityPolityId ?? s.polityId;
      const camp = war.campA.includes(parent)
        ? war.campA
        : war.campB.includes(parent)
          ? war.campB
          : undefined;
      if (camp && !camp.includes(s.polityId)) {
        camp.push(s.polityId);
        war.mobilized[s.polityId] ??= 0;
      }
    }
    const oldCount = war.fronts.length;
    const participants = new Set([...war.campA, ...war.campB]);
    const neutral = (id: string) =>
      affected.has(id) && !participants.has(cities.get(id)?.polityId ?? '');
    war.fronts = war.fronts.filter((f) => !neutral(f.aSettlementId) && !neutral(f.bSettlementId));
    war.occupied = war.occupied.filter((id) => !neutral(id));
    if (oldCount === war.fronts.length) continue;
    const e = emit(
      'war_fronts_revised',
      [],
      undefined,
      '新的政治控制权改变了交战边界；被承认为中立的地区不再凭旧战线参与作战。',
      { warId: war.id, previousFronts: oldCount, currentFronts: war.fronts.length },
      changes.map((e) => e.id),
      0.8,
    );
    war.causeIds = [...new Set([...war.causeIds, e.id])].slice(-16);
    if (!war.fronts.length) {
      war.status = 'ended';
      for (const id of participants) war.mobilized[id] = 0;
      const rel = w.geopolitics.relations[[war.a, war.b].sort().join('~')];
      if (rel?.status === 'war') {
        rel.status = 'peace';
        rel.causeIds = [e.id];
      }
      emit(
        'peace_treaty',
        [],
        undefined,
        '所有交战边界已因实际主权变化消失，这场战争结束。',
        { warId: war.id, reason: 'no-valid-fronts' },
        [e.id],
        0.9,
      );
    }
  }
}

/** Public organization and modeled mass support can change power, never a date-table branch. */
export function advancePoliticalOutcomes(w: World, emit: Emit) {
  if (!w.sovereignty || !w.movements) return;
  const byRegion = new Map<string, World['settlements']>();
  for (const s of w.settlements) {
    const region = s.regionId ?? s.polityId,
      list = byRegion.get(region) ?? [];
    list.push(s);
    byRegion.set(region, list);
  }
  let changed = 0;
  for (const movement of Object.values(w.movements.movements).sort((a, b) =>
    a.movementId.localeCompare(b.movementId),
  )) {
    if (movement.status !== 'active' || movement.lastMonth !== w.month) continue;
    const places = byRegion.get(movement.regionId) ?? [];
    const adults = places.reduce((n, s) => n + s.cohort.adults, 0);
    const support = Math.max(0, Math.min(1, movement.aggregateSupporters / Math.max(1, adults)));
    for (const s of places)
      if (s.polityId === movement.controller) s.unrest = clamp(s.unrest + support * 0.01);
    if (
      movement.orientation === 'reform' ||
      changed >= 4 ||
      movement.namedSupporterIds.length < 3 ||
      !places.length ||
      places.some((s) => s.polityId !== movement.controller)
    )
      continue;
    const current = authorityAt(w, places[0].id);
    if (movement.orientation === 'autonomy' && current?.current.status === 'autonomous') continue;
    const result = requestSovereigntyTransition(
      w,
      {
        action: movement.orientation,
        targetPolityId: movement.regionId,
        settlementIds: places.map((s) => s.id),
      },
      emit,
    );
    if (result.ok) {
      const refund = Math.max(0, movement.treasury);
      places[0].coin += refund;
      movement.treasury = 0;
      movement.status = 'dissolved';
      movement.lastChangeEventId = result.eventId;
      emit(
        'movement_goal_fulfilled',
        movement.namedSupporterIds.slice(0, 8),
        places[0].id,
        '运动实现了本阶段的政治诉求，剩余公共筹款交还当地。',
        { movementId: movement.movementId, refund },
        [result.eventId],
        0.75,
      );
      changed++;
    }
  }
}
