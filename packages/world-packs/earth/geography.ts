import geographyData from './geography.json' with { type: 'json' };
import type { World } from '../../contracts/index.js';
let landBorders: Set<string> | undefined;
export function countriesShareLandBorder(a: string, b: string) {
  if (!landBorders) {
    landBorders = new Set();
    const owners = new Map<string, string[]>();
    const visit = (value: unknown, id: string) => {
      if (!Array.isArray(value)) return;
      if (value.length >= 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
        const key = `${Math.round(value[0] * 10000)},${Math.round(value[1] * 10000)}`,
          other = owners.get(key) ?? [];
        for (const country of other)
          if (country !== id) landBorders!.add([id, country].sort().join('~'));
        if (!other.includes(id)) other.push(id);
        owners.set(key, other);
      } else for (const child of value) visit(child, id);
    };
    for (const c of geographyData.countries) visit(c.geometry.coordinates, c.id);
  }
  return landBorders.has([a, b].sort().join('~'));
}
/** Corrects the legacy international mode assigned to routes crossing a land border. */
export function migrateEarthLandRouteModes(w: World): string[] | undefined {
  if (
    !w.pack.id.startsWith('earth-') ||
    !w.calendar ||
    w.migrations?.earthLandRouteModes?.version === 1
  )
    return undefined;
  const settlements = new Map(w.settlements.map((s) => [s.id, s]));
  const changed: string[] = [];
  for (const route of w.routes ?? []) {
    const from = settlements.get(route.from),
      to = settlements.get(route.to);
    if (
      !from ||
      !to ||
      from.polityId === to.polityId ||
      !countriesShareLandBorder(from.regionId ?? from.polityId, to.regionId ?? to.polityId)
    )
      continue;
    if (route.mode === 'sea' || route.mode === 'air') {
      route.mode = route.km < 1500 ? 'rail' : 'road';
      changed.push(route.id);
    }
  }
  return changed;
}
export const distance = (a: { lon: number; lat: number }, b: { lon: number; lat: number }) => {
  const rad = Math.PI / 180,
    dl = (b.lon - a.lon) * rad,
    dp = (b.lat - a.lat) * rad;
  const h =
    Math.sin(dp / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dl / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)));
};
let cached: { signature: string; edges: { from: string; to: string; km: number }[] } | undefined;
export function connectEarthCities(w: World) {
  const signature = w.settlements
    .map((s) => `${s.id}:${s.lon}:${s.lat}:${s.regionId ?? s.polityId}`)
    .join('|');
  if (cached?.signature !== signature) {
    const edges: { from: string; to: string; km: number }[] = [],
      seen = new Set<string>();
    const add = (a: (typeof w.settlements)[number], b: typeof a, km: number) => {
      const id = [a.id, b.id].sort().join(':');
      if (!seen.has(id)) {
        seen.add(id);
        edges.push({ from: a.id, to: b.id, km: Math.round(km) });
      }
    };
    for (const a of w.settlements) {
      const same: { b: typeof a; km: number }[] = [],
        outside: typeof same = [];
      for (const b of w.settlements) {
        if (a === b) continue;
        const list = (a.regionId ?? a.polityId) === (b.regionId ?? b.polityId) ? same : outside,
          limit = list === same ? 3 : 2;
        const km = distance(a as any, b as any);
        if (list.length === limit && km >= list[list.length - 1].km) continue;
        list.push({ b, km });
        list.sort((x, y) => x.km - y.km);
        if (list.length > limit) list.pop();
      }
      for (const { b, km } of [...same, ...outside]) add(a, b, km);
    }
    // A deterministic domestic backbone prevents disconnected local clusters.
    for (const regionId of new Set(w.settlements.map((s) => s.regionId ?? s.polityId))) {
      const cities = w.settlements
        .filter((s) => (s.regionId ?? s.polityId) === regionId)
        .sort((a, b) => a.lon! - b.lon! || a.id.localeCompare(b.id));
      for (let i = 1; i < cities.length; i++)
        add(cities[i - 1], cities[i], distance(cities[i - 1] as any, cities[i] as any));
    }
    cached = { signature, edges };
  }
  const byId = new Map(w.settlements.map((s) => [s.id, s]));
  w.routes = [];
  for (const s of w.settlements) s.neighbors = [];
  for (const e of cached.edges) {
    const a = byId.get(e.from)!,
      b = byId.get(e.to)!;
    a.neighbors.push(b.id);
    b.neighbors.push(a.id);
    w.routes.push({
      ...e,
      id: [a.id, b.id].sort().join(':'),
      mode:
        (a.regionId ?? a.polityId) === (b.regionId ?? b.polityId) ||
        countriesShareLandBorder(a.regionId ?? a.polityId, b.regionId ?? b.polityId)
          ? e.km < 1500
            ? 'rail'
            : 'road'
          : w.calendar && w.calendar.startYear + Math.floor(w.month / 12) < 1920
            ? 'sea'
            : 'air',
      capacity: Math.max(
        500,
        Math.sqrt(Math.min(a.sourcePopulation ?? 1, b.sourcePopulation ?? 1)) * 0.5,
      ),
      status: 'open',
    });
  }
}
