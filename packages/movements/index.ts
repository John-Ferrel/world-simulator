import { clamp, type HistoricalEvent, type Person, type World } from '../contracts/index.js';
import { isDetained } from '../coercion/index.js';
import { authorityAt } from '../sovereignty/index.js';
import type { Emit } from '../simulation-core/index.js';

export type MovementOrientation = 'autonomy' | 'independence' | 'reform';
export type MovementStatus = 'active' | 'dissolved';
export type PoliticalMovement = {
  movementId: string;
  regionId: string;
  controller: string;
  organizationIds: string[];
  namedSupporterIds: string[];
  /** An abstract count of potential supporters, not added people or a census estimate. */
  aggregateSupporters: number;
  orientation: MovementOrientation;
  sourceIds: string[];
  lastMonth: number;
  status: MovementStatus;
  treasury: number;
  lastChangeEventId?: string;
};
export type MovementState = {
  version: 1;
  month: number;
  movements: Record<string, PoliticalMovement>;
};
export type MovementSupportSummary = {
  regionId: string;
  controller: string;
  orientation: MovementOrientation;
  movementId: string;
  namedOrganizerCount: number;
  namedSupporterIds: string[];
  aggregateSupporters: number;
  totalSupportTags: number;
  sourceIds: string[];
  lastMonth: number;
  qualified: boolean;
  interpretation: 'normalized-scenario-support-tags-not-a-poll';
};

type MovementWorld = World & { movements?: MovementState };
type Activity = { person: Person; settlementId: string; event: HistoricalEvent };
const clampCount = (n: number, maximum: number) => Math.max(0, Math.min(maximum, Math.floor(n)));
const movementKey = (regionId: string, controller: string, orientation: MovementOrientation) =>
  JSON.stringify([regionId, controller, orientation]);
const eligibleActions = new Set(['campaign', 'petition', 'organize']);
const currentSubordinate = (w: World, settlementId: string) => {
  const authority = authorityAt(w, settlementId);
  return Boolean(
    authority &&
    ['colony', 'protectorate', 'occupied', 'leased territory', 'autonomous'].includes(
      authority.current.status,
    ),
  );
};

function ensureState(w: MovementWorld): MovementState {
  return (w.movements ??= { version: 1, month: -1, movements: {} });
}

function movementOrganizations(w: World, people: Person[]): string[] {
  const members = new Set(people.map((person) => person.id));
  const ids = w.organizations
    .filter(
      (organization) =>
        organization.status === 'active' && organization.memberIds.some((id) => members.has(id)),
    )
    .map((organization) => organization.id);
  for (const institution of Object.values(w.society?.institutions ?? {}))
    if (institution.status === 'active' && institution.members.some((id) => members.has(id)))
      ids.push(`society:${institution.id}`);
  return [...new Set(ids)].sort().slice(0, 32);
}

function visiblePressure(w: World, places: World['settlements'], openRouteCount: number) {
  const education = places.length
    ? places.reduce((sum, place) => sum + (place.economy?.education ?? 0), 0) / places.length
    : 0;
  const press = places.length
    ? places.reduce((sum, place) => {
        const authority = authorityAt(w, place.id);
        const polityId = authority?.current.controllerPolityId ?? place.polityId;
        return sum + (w.geopolitics?.governments[polityId]?.laws.pressFreedom ?? 0.35);
      }, 0) / places.length
    : 0.35;
  const stress = places.length
    ? places.reduce(
        (sum, place) =>
          sum +
          clamp(
            place.unrest * 0.45 + place.scarcity * 0.35 + (place.economy?.unemployment ?? 0) * 0.2,
          ),
        0,
      ) / places.length
    : 0;
  const routes = clamp(openRouteCount / Math.max(1, places.length));
  return { education: clamp(education), press: clamp(press), stress, routes };
}

function orient(
  w: World,
  settlementId: string,
  action: string,
  ideology?: unknown,
): MovementOrientation {
  const subordinate = currentSubordinate(w, settlementId);
  if (subordinate && action === 'campaign' && ideology === 'nationalist') return 'independence';
  if (subordinate) return 'autonomy';
  return 'reform';
}

function sourceEvents(events: readonly HistoricalEvent[], month: number): HistoricalEvent[] {
  return events.filter(
    (event) =>
      event.month === month &&
      event.kind === 'agenda_step_completed' &&
      eligibleActions.has(String(event.data.action)) &&
      event.data.classification === 'executed-agent-action',
  );
}

/**
 * Record evidence-backed local political movements. Aggregate support is a bounded scenario
 * index, never a population ledger and never a historical polling estimate.
 */
export function advanceMovements(
  w: World,
  emit: Emit,
  locals: Map<string, Person[]>,
  events: readonly HistoricalEvent[],
): void {
  const state = ensureState(w as MovementWorld);
  if (state.month === w.month) return;
  state.month = w.month;

  const places = new Map(w.settlements.map((settlement) => [settlement.id, settlement]));
  const placesByRegion = new Map<string, World['settlements']>();
  for (const place of w.settlements) {
    const region = place.regionId ?? authorityAt(w, place.id)?.modernRegionId ?? place.id;
    const list = placesByRegion.get(region) ?? [];
    list.push(place);
    placesByRegion.set(region, list);
  }
  const regionByPlace = new Map<string, string>();
  for (const [region, regionPlaces] of placesByRegion)
    for (const place of regionPlaces) regionByPlace.set(place.id, region);
  const openRouteIdsByRegion = new Map<string, Set<string>>();
  for (const route of w.routes ?? []) {
    if (route.status !== 'open') continue;
    for (const region of new Set([regionByPlace.get(route.from), regionByPlace.get(route.to)])) {
      if (!region) continue;
      const ids = openRouteIdsByRegion.get(region) ?? new Set<string>();
      ids.add(route.id);
      openRouteIdsByRegion.set(region, ids);
    }
  }
  const pressureCache = new Map<string, ReturnType<typeof visiblePressure>>();
  const pressureFor = (regionId: string) => {
    let pressure = pressureCache.get(regionId);
    if (!pressure) {
      pressure = visiblePressure(
        w,
        placesByRegion.get(regionId) ?? [],
        openRouteIdsByRegion.get(regionId)?.size ?? 0,
      );
      pressureCache.set(regionId, pressure);
    }
    return pressure;
  };
  const available = new Map<string, Person>();
  for (const people of locals.values())
    for (const person of people)
      if (person.death === undefined && !person.journey && !isDetained(w, person))
        available.set(person.id, person);

  type Group = {
    key: string;
    regionId: string;
    controller: string;
    orientation: MovementOrientation;
    organizers: Map<string, Person>;
    sourceIds: Set<string>;
    activityLocations: Set<string>;
  };
  const groups = new Map<string, Group>();
  for (const event of sourceEvents(events, w.month)) {
    if (!event.locationId || !places.has(event.locationId)) continue;
    const action = String(event.data.action);
    const place = places.get(event.locationId)!;
    const authority = authorityAt(w, place.id);
    const controller = authority?.current.controllerPolityId ?? place.polityId;
    const regionId = place.regionId ?? authority?.modernRegionId ?? place.id;
    const orientation = orient(w, place.id, action, event.data.ideology);
    const key = movementKey(regionId, controller, orientation);
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        regionId,
        controller,
        orientation,
        organizers: new Map(),
        sourceIds: new Set(),
        activityLocations: new Set(),
      };
      groups.set(key, group);
    }
    group.sourceIds.add(event.id);
    group.activityLocations.add(place.id);
    for (const id of event.personIds) {
      const person = available.get(id);
      if (!person || person.locationId !== place.id || w.month - person.birth < 18 * 12) continue;
      group.organizers.set(person.id, person);
    }
  }

  const repressionEvents = new Map<string, string[]>();
  const reformEvents = new Map<string, string[]>();
  for (const event of events) {
    if (event.month !== w.month || !event.locationId) continue;
    const target = ['political_repression', 'political_custody_started'].includes(event.kind)
      ? repressionEvents
      : ['political_reform', 'reform'].includes(event.kind)
        ? reformEvents
        : undefined;
    if (target) target.set(event.locationId, [...(target.get(event.locationId) ?? []), event.id]);
  }

  // Update existing movements first so each movement has at most one monthly budgeted action.
  let decayEvents = 0;
  for (const movement of Object.values(state.movements)) {
    if (movement.status !== 'active') continue;
    const regionPlaces = placesByRegion.get(movement.regionId) ?? [];
    const adultCapacity = regionPlaces.reduce((sum, place) => sum + place.cohort.adults, 0);
    const named = movement.namedSupporterIds.filter((id) => {
      const person = available.get(id);
      return Boolean(
        person && person.locationId && regionPlaces.some((place) => place.id === person.locationId),
      );
    });
    movement.namedSupporterIds = [...new Set(named)].sort().slice(0, 256);
    const maxAggregate = Math.max(0, adultCapacity - movement.namedSupporterIds.length);
    const pressureCauses = regionPlaces.flatMap((place) => repressionEvents.get(place.id) ?? []);
    const reformCauses = regionPlaces.flatMap((place) => reformEvents.get(place.id) ?? []);
    const pressured = pressureCauses.length > 0;
    const reformed = reformCauses.length > 0;
    const pressure = pressureFor(movement.regionId);
    const attrition = pressured ? 0.035 : reformed ? 0.012 : 0.0015 + (1 - pressure.press) * 0.003;
    const supportBeforeDecay = movement.aggregateSupporters;
    movement.aggregateSupporters = clampCount(
      movement.aggregateSupporters * (1 - attrition),
      maxAggregate,
    );
    const decayCauses = [...new Set([...pressureCauses, ...reformCauses])];
    if (decayCauses.length)
      movement.sourceIds = [...new Set([...movement.sourceIds, ...decayCauses])].slice(-256);
    if (
      decayCauses.length &&
      supportBeforeDecay > movement.aggregateSupporters &&
      decayEvents < 128
    ) {
      const event = emit(
        'movement_support_decayed',
        [],
        regionPlaces[0]?.id,
        pressured
          ? '已记录的政治压制使运动的聚合支持标签减少。'
          : '已记录的政治改革使部分诉求得到回应，运动的聚合支持标签缓慢减少。',
        {
          movementId: movement.movementId,
          before: supportBeforeDecay,
          after: movement.aggregateSupporters,
          reason: pressured ? 'political_repression' : 'political_reform',
          normalizedScenarioIndex: true,
        },
        decayCauses,
        0.36,
      );
      movement.lastChangeEventId = event.id;
      decayEvents++;
    }
    movement.lastMonth = w.month;
    if (!movement.namedSupporterIds.length && movement.aggregateSupporters < 1)
      movement.status = 'dissolved';
    if (movement.status === 'dissolved') {
      const refund = regionPlaces[0] ? Math.max(0, movement.treasury) : 0;
      if (regionPlaces[0]) {
        regionPlaces[0].coin += refund;
        movement.treasury = 0;
      }
      const causeIds = movement.sourceIds.slice(-4);
      emit(
        'movement_dissolved',
        [],
        regionPlaces[0]?.id,
        `当地运动因支持关系逐渐消散而结束。`,
        {
          movementId: movement.movementId,
          aggregateSupporters: movement.aggregateSupporters,
          refund,
        },
        causeIds,
        0.42,
      );
    }
  }

  let processed = 0;
  for (const group of [...groups.values()].sort((a, b) => a.key.localeCompare(b.key))) {
    if (processed >= 128 || group.organizers.size < 3) continue;
    processed++;
    const organizers = [...group.organizers.values()].sort((a, b) => a.id.localeCompare(b.id));
    const key = group.key;
    let movement = state.movements[key];
    const first = !movement;
    if (!movement) {
      movement = state.movements[key] = {
        movementId: `movement-${key}`,
        regionId: group.regionId,
        controller: group.controller,
        organizationIds: movementOrganizations(w, organizers),
        namedSupporterIds: [],
        aggregateSupporters: 0,
        orientation: group.orientation,
        sourceIds: [],
        lastMonth: w.month,
        status: 'active',
        treasury: 0,
      };
    }
    movement.status = 'active';
    movement.organizationIds = [
      ...new Set([...movement.organizationIds, ...movementOrganizations(w, organizers)]),
    ]
      .sort()
      .slice(0, 32);
    movement.namedSupporterIds = [
      ...new Set([...movement.namedSupporterIds, ...organizers.map((person) => person.id)]),
    ]
      .sort()
      .slice(0, 256);
    movement.sourceIds = [...new Set([...movement.sourceIds, ...group.sourceIds])].slice(-256);

    const regionPlaces = placesByRegion.get(group.regionId) ?? [];
    const adultCapacity = regionPlaces.reduce((sum, place) => sum + place.cohort.adults, 0);
    const maxAggregate = Math.max(0, adultCapacity - movement.namedSupporterIds.length);
    const pressure = pressureFor(group.regionId);
    const donationLimit = 0.25;
    const location = [...group.activityLocations].sort()[0];
    const place = places.get(location)!;
    // Local contributions are a real transfer into the movement fund and capped per month.
    const localDonation = Math.min(donationLimit, Math.max(0, place.coin) * 0.001);
    place.coin -= localDonation;
    movement.treasury += localDonation;
    const organizerDonationLimit = 0.25;
    const offered = organizers.reduce((sum, person) => sum + Math.max(0, person.coin) * 0.001, 0);
    let remaining = Math.min(organizerDonationLimit, offered);
    for (const person of organizers) {
      if (remaining <= 0) break;
      const donation = Math.min(person.coin, remaining, Math.max(0.01, person.coin * 0.001));
      if (donation <= 0) continue;
      person.coin -= donation;
      movement.treasury += donation;
      remaining -= donation;
    }
    const campaignCost = 0.1;
    const funded = movement.treasury + 1e-9 >= campaignCost;
    if (funded) {
      movement.treasury -= campaignCost;
      place.coin += campaignCost;
      const leverage = clamp(
        0.25 +
          pressure.education * 0.25 +
          pressure.press * 0.25 +
          pressure.routes * 0.15 +
          pressure.stress * 0.25,
        0.08,
        0.9,
      );
      const growth =
        Math.max(0, adultCapacity - movement.namedSupporterIds.length) * 0.0008 * leverage;
      movement.aggregateSupporters = Math.min(maxAggregate, movement.aggregateSupporters + growth);
      const event = emit(
        first ? 'movement_formed' : 'movement_support_shift',
        organizers.map((person) => person.id).slice(0, 8),
        location,
        first
          ? `数名在地组织者以公开行动发起了${{ autonomy: '自治', independence: '独立', reform: '政治改革' }[group.orientation]}诉求运动。`
          : `持续的公开行动扩大了当地运动的影响。`,
        {
          movementId: movement.movementId,
          regionId: movement.regionId,
          controller: movement.controller,
          orientation: movement.orientation,
          namedOrganizers: movement.namedSupporterIds.length,
          aggregateSupporters: movement.aggregateSupporters,
          campaignCost,
          localDonation,
          normalizedScenarioIndex: true,
          populationAdded: 0,
        },
        [...group.sourceIds],
        first ? 0.72 : 0.48,
      );
      movement.lastChangeEventId = event.id;
    } else if (first) {
      // No public organization is created unless the first meeting can actually be financed.
      delete state.movements[key];
    } else {
      const event = emit(
        'movement_funding_shortfall',
        organizers.map((person) => person.id).slice(0, 8),
        location,
        '当地运动无法筹足会议与宣传费用，支持范围没有扩大。',
        { movementId: movement.movementId, treasury: movement.treasury, required: campaignCost },
        [...group.sourceIds],
        0.3,
      );
      movement.lastChangeEventId = event.id;
    }
    movement.lastMonth = w.month;
  }
}

/** Summary for a later sovereignty decision. This does not itself change territorial control. */
export function summarizeMovementSupport(
  w: World,
  regionId: string,
  controller: string,
  orientation?: MovementOrientation,
): MovementSupportSummary[] {
  const state = (w as MovementWorld).movements;
  if (!state) return [];
  return Object.values(state.movements)
    .filter(
      (movement) =>
        movement.status === 'active' &&
        movement.regionId === regionId &&
        movement.controller === controller &&
        (!orientation || movement.orientation === orientation),
    )
    .sort((a, b) => a.orientation.localeCompare(b.orientation))
    .map((movement) => ({
      regionId: movement.regionId,
      controller: movement.controller,
      orientation: movement.orientation,
      movementId: movement.movementId,
      namedOrganizerCount: movement.namedSupporterIds.length,
      namedSupporterIds: movement.namedSupporterIds.slice(),
      aggregateSupporters: Math.floor(movement.aggregateSupporters),
      totalSupportTags:
        movement.namedSupporterIds.length + Math.floor(movement.aggregateSupporters),
      sourceIds: movement.sourceIds.slice(-64),
      lastMonth: movement.lastMonth,
      qualified: movement.namedSupporterIds.length >= 3 && movement.sourceIds.length > 0,
      interpretation: 'normalized-scenario-support-tags-not-a-poll',
    }));
}
