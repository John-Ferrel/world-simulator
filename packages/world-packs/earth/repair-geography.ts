import geography from './geography.json' with { type: 'json' };
import type { Settlement, World } from '../../contracts/index.js';
import { countriesShareLandBorder, distance } from './geography.js';

type RepairWorld = World & {
  migrations?: World['migrations'] & {
    earthDuplicateSettlements?: { version: 1; appliedMonth: number };
  };
};
export type EarthGeographyRepair = {
  version: 1;
  month: number;
  duplicateId: string;
  keptSettlementId: string;
  addedSettlementId: string;
  sourceCityId: string;
  addedRouteIds: string[];
  recalculatedRouteIds: string[];
};

const pointDistance = (a: Settlement, b: { lon: number; lat: number }) =>
  a.lon === undefined || a.lat === undefined
    ? Number.POSITIVE_INFINITY
    : distance({ lon: a.lon, lat: a.lat }, b);
const settlementDistance = (a: Settlement, b: Settlement) =>
  a.lon === undefined || a.lat === undefined || b.lon === undefined || b.lat === undefined
    ? Number.POSITIVE_INFINITY
    : distance({ lon: a.lon, lat: a.lat }, { lon: b.lon, lat: b.lat });
const pairKey = (a: string, b: string) => [a, b].sort().join('\u0000');
const routeIdFor = (a: string, b: string) => [a, b].sort().join(':');

/** Repair duplicate Natural Earth settlement IDs without moving resources or references. */
export function repairDuplicateEarthSettlements(w: World): EarthGeographyRepair[] {
  if (!w.pack.id.startsWith('earth-')) return [];
  const world = w as RepairWorld;
  if (world.migrations?.earthDuplicateSettlements?.version === 1) return [];

  const grouped = new Map<string, Settlement[]>();
  for (const settlement of w.settlements) {
    const list = grouped.get(settlement.id) ?? [];
    list.push(settlement);
    grouped.set(settlement.id, list);
  }
  const duplicateGroups = [...grouped]
    .filter(([, settlements]) => settlements.length > 1)
    .sort(([a], [b]) => a.localeCompare(b));
  const oldRoutes = w.routes ?? [];
  const repairs: EarthGeographyRepair[] = [];

  for (const [duplicateId, settlements] of duplicateGroups) {
    const legacyCity = geography.cities.find((city) => city.id === duplicateId);
    if (!legacyCity) continue;
    const ordered = settlements
      .map((settlement) => ({ settlement, km: pointDistance(settlement, legacyCity) }))
      .sort((a, b) => a.km - b.km || a.settlement.lon! - b.settlement.lon!);
    const kept = ordered[0]!.settlement;
    const renamed = ordered[1]!.settlement;
    const renamedCity = closestSourceCity(renamed, duplicateId);
    if (!renamedCity) continue;
    let addedId = renamedCity.id;
    if (w.settlements.some((settlement) => settlement !== renamed && settlement.id === addedId))
      addedId = `${renamedCity.id}-recovered-${coordinateSuffix(renamed)}`;

    const originalNeighbors = [...new Set(renamed.neighbors)];
    renamed.id = addedId;
    renamed.cohort.id = `cohort-${addedId}`;
    const retainedNeighbors = originalNeighbors.filter(
      (id) =>
        id !== duplicateId &&
        id !== addedId &&
        w.settlements.some((s) => s !== renamed && s.id === id),
    );
    renamed.neighbors = [...new Set(retainedNeighbors)];
    kept.neighbors = [
      ...new Set(kept.neighbors.filter((id) => id !== addedId && id !== duplicateId)),
    ];

    const recalculatedRouteIds: string[] = [];
    const settlementById = new Map(
      w.settlements.filter((s) => s !== renamed).map((s) => [s.id, s]),
    );
    for (const route of oldRoutes) {
      if (route.from !== duplicateId && route.to !== duplicateId) continue;
      const other = settlementById.get(route.from === duplicateId ? route.to : route.from);
      if (
        !other ||
        kept.lon === undefined ||
        kept.lat === undefined ||
        other.lon === undefined ||
        other.lat === undefined
      )
        continue;
      route.km = Math.round(settlementDistance(kept, other));
      recalculatedRouteIds.push(route.id);
    }

    const neighborIds = retainedNeighbors.length
      ? retainedNeighbors
      : nearestNeighbors(w, renamed, duplicateId);
    const addedRouteIds: string[] = [];
    const byPair = new Map(oldRoutes.map((route) => [pairKey(route.from, route.to), route]));
    for (const neighborId of neighborIds) {
      const neighbor = settlementById.get(neighborId);
      if (!neighbor || neighbor.id === renamed.id) continue;
      const id = routeIdFor(renamed.id, neighbor.id);
      if (oldRoutes.some((route) => route.id === id)) continue;
      const source = byPair.get(pairKey(duplicateId, neighborId));
      const km = Math.round(settlementDistance(renamed, neighbor));
      const route = {
        id,
        from: renamed.id,
        to: neighbor.id,
        km,
        mode: source?.mode ?? routeMode(w, renamed, neighbor, km),
        capacity:
          source?.capacity ??
          Math.max(
            500,
            Math.sqrt(Math.min(renamed.sourcePopulation ?? 1, neighbor.sourcePopulation ?? 1)) *
              0.5,
          ),
        status: source?.status ?? ('open' as const),
      };
      oldRoutes.push(route);
      addedRouteIds.push(id);
      renamed.neighbors.push(neighbor.id);
      if (!neighbor.neighbors.includes(renamed.id)) neighbor.neighbors.push(renamed.id);
    }
    renamed.neighbors = [...new Set(renamed.neighbors)].sort();
    repairs.push({
      version: 1,
      month: w.month,
      duplicateId,
      keptSettlementId: kept.id,
      addedSettlementId: renamed.id,
      sourceCityId: renamedCity.id,
      addedRouteIds,
      recalculatedRouteIds: [...new Set(recalculatedRouteIds)].sort(),
    });
  }

  const seenIds = new Set<string>();
  const unresolved = w.settlements.find((settlement) => {
    if (seenIds.has(settlement.id)) return true;
    seenIds.add(settlement.id);
    return false;
  });
  if (unresolved)
    throw new Error(`Earth geography repair left duplicate settlement ID: ${unresolved.id}`);
  if (repairs.length) w.routes = oldRoutes;
  (world.migrations ??= {}).earthDuplicateSettlements = { version: 1, appliedMonth: w.month };
  return repairs;
}

function closestSourceCity(settlement: Settlement, duplicateId: string) {
  const candidates = geography.cities
    .filter((city) => city.id !== duplicateId)
    .map((city) => ({ city, km: pointDistance(settlement, city) }))
    .sort((a, b) => a.km - b.km || a.city.id.localeCompare(b.city.id));
  const nearest = candidates[0];
  return nearest && nearest.km <= 25 ? nearest.city : undefined;
}

function nearestNeighbors(w: World, point: Settlement, duplicateId: string) {
  const candidates = w.settlements
    .filter((settlement) => settlement.id !== duplicateId && settlement !== point)
    .map((settlement) => ({ settlement, km: settlementDistance(point, settlement) }))
    .filter(({ km }) => Number.isFinite(km));
  const domestic = candidates
    .filter(({ settlement }) => settlement.polityId === point.polityId)
    .sort((a, b) => a.km - b.km || a.settlement.id.localeCompare(b.settlement.id))
    .slice(0, 3);
  const foreign = candidates
    .filter(({ settlement }) => settlement.polityId !== point.polityId)
    .sort((a, b) => a.km - b.km || a.settlement.id.localeCompare(b.settlement.id))
    .slice(0, 2);
  return [...domestic, ...foreign].map(({ settlement }) => settlement.id);
}

function routeMode(w: World, from: Settlement, to: Settlement, km: number) {
  if (from.polityId === to.polityId || countriesShareLandBorder(from.polityId, to.polityId))
    return km < 1500 ? 'rail' : 'road';
  return w.calendar && w.calendar.startYear + Math.floor(w.month / 12) < 1920 ? 'sea' : 'air';
}

function coordinateSuffix(settlement: Settlement) {
  return `${Math.round((settlement.lon ?? 0) * 10000)}-${Math.round((settlement.lat ?? 0) * 10000)}`;
}
