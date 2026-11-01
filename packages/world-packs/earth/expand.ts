import geography from './geography.json' with { type: 'json' };
import type { World, Settlement } from '../../contracts/index.js';
import { connectEarthCities, distance } from './geography.js';
// Split existing catchment regions; never reset history, people, resources or the shared clock.
export function expandEarthGeography(w: World) {
  if (!w.pack.id.startsWith('earth-')) throw new Error('仅地球世界可扩充地理');
  const existing = new Map(w.settlements.map((s) => [s.id, s]));
  const original = new Map(geography.cities.map((c) => [c.id, c.countryId]));
  const groups = new Map<
    string,
    { city: (typeof geography.cities)[number]; settlement?: Settlement }[]
  >();
  const representedRegions = new Set(
    w.settlements.map((s) => s.regionId ?? original.get(s.id) ?? s.polityId),
  );
  for (const c of geography.cities) {
    if (existing.has(c.id) || !representedRegions.has(c.countryId)) continue;
    const donors = w.settlements.filter((s) => (s.regionId ?? original.get(s.id)) === c.countryId);
    let donor: Settlement | undefined,
      km = Infinity;
    for (const s of donors) {
      const d = distance(c, s as any);
      if (d < km) {
        donor = s;
        km = d;
      }
    }
    if (!donor) throw new Error(`缺少国家既有区域: ${c.countryId}`);
    const group = groups.get(donor.id) ?? [];
    group.push({ city: c });
    groups.set(donor.id, group);
  }
  let added = 0;
  for (const [id, group] of groups) {
    const donor = existing.get(id)!;
    const oldCity = geography.cities.find((c) => c.id === id)!;
    const parts = [{ city: oldCity, settlement: donor }, ...group];
    const total = parts.reduce((n, p) => n + p.city.population, 0),
      before = structuredClone(donor);
    const beforeCapacity = w.industry?.capacityShares?.[id]
      ? structuredClone(w.industry.capacityShares[id])
      : undefined;
    const splits = (value: number, integer = false) => {
      let left = value;
      return parts.map((p, i) => {
        const amount =
          i === parts.length - 1
            ? left
            : integer
              ? Math.floor((value * p.city.population) / total)
              : (value * p.city.population) / total;
        left -= amount;
        return amount;
      });
    };
    const quantities = Object.fromEntries(
      ['food', 'coin', 'birthRemainder', 'deathRemainder', 'sourcePopulation'].map((key) => [
        key,
        splits((before as any)[key] ?? 0),
      ]),
    );
    const cohorts = {
      children: splits(before.cohort.children, true),
      adults: splits(before.cohort.adults, true),
      elders: splits(before.cohort.elders, true),
    };
    for (let i = 0; i < parts.length; i++) {
      const { city } = parts[i];
      const s = i === 0 ? donor : structuredClone(before);
      if (i > 0) {
        s.id = city.id;
        s.regionId = city.countryId;
        s.name = city.name;
        s.lon = city.lon;
        s.lat = city.lat;
        s.x = (city.lon + 180) * 4;
        s.y = (85 - city.lat) * 4;
        s.cohort = { ...s.cohort, id: `cohort-${city.id}` };
        w.settlements.push(s);
        added++;
        for (const shock of w.shocks ?? [])
          if (shock.locationIds.includes(id)) shock.locationIds.push(s.id);
      }
      for (const key of Object.keys(quantities)) (s as any)[key] = quantities[key][i];
      for (const key of ['children', 'adults', 'elders'] as const) s.cohort[key] = cohorts[key][i];
      if (beforeCapacity && w.industry?.capacityShares) {
        const snapshot = beforeCapacity;
        w.industry.capacityShares[s.id] = {
          ...snapshot,
          capacity: Object.fromEntries(
            Object.entries(snapshot.capacity).map(([good, amount]) => [
              good,
              (amount * parts[i].city.population) / total,
            ]),
          ) as typeof snapshot.capacity,
        };
      }
    }
  }
  if (added) {
    connectEarthCities(w);
    w.pack.version = '1.1.0';
  }
  return added;
}
