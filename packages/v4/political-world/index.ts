import type { WorldDate } from '../domain.js';
import { ALL_POLITIES, ALL_TENSIONS, POLITICAL_WORLD_ERAS } from './data.js';
import { POLITICAL_SOURCES, POLITICAL_SOURCES_BY_ID } from './sources.js';
import type {
  PoliticalLeader,
  PoliticalMapEntry,
  PoliticalParty,
  PoliticalPolity,
  PoliticalSnapshot,
  PoliticalSource,
  PoliticalTension,
} from './types.js';

export type {
  PartyInfluence,
  PolityKind,
  PoliticalLeader,
  PoliticalMapEntry,
  PoliticalParty,
  PoliticalPolity,
  PoliticalSnapshot,
  PoliticalSource,
  PoliticalTension,
  TensionRegion,
} from './types.js';
export { ALL_POLITIES, ALL_TENSIONS, POLITICAL_WORLD_ERAS } from './data.js';
export { POLITICAL_SOURCES, POLITICAL_SOURCES_BY_ID } from './sources.js';

function activeInYear<T extends { from?: number; to?: number }>(value: T, year: number): boolean {
  return (value.from ?? -Infinity) <= year && (value.to ?? Infinity) >= year;
}

function activeInDate(polity: PoliticalPolity, year: number, month: number): boolean {
  if (year < polity.from || year > polity.to) return false;
  if (year === polity.from && polity.fromMonth && month < polity.fromMonth) return false;
  if (year === polity.to && polity.toMonth && month > polity.toMonth) return false;
  return true;
}

function sortNewestFirst(a: PoliticalPolity, b: PoliticalPolity): number {
  return (b.mapPriority ?? 0) - (a.mapPriority ?? 0) || b.from - a.from || a.name.localeCompare(b.name);
}

/**
 * Country-level political map. Newer polity entries win when two periods overlap
 * (e.g. Austria-Hungary and the First Republic both exist in 1918), because the
 * more recent entry is the more specific description of that year.
 */
export function politicalMapForYear(year: number, month = 1): Record<string, PoliticalMapEntry> {
  const map: Record<string, PoliticalMapEntry> = {};
  for (const polity of ALL_POLITIES.filter((entry) => activeInDate(entry, year, month)).sort(sortNewestFirst)) {
    for (const iso of polity.isoCodes) {
      if (map[iso]) continue;
      map[iso] = {
        iso,
        polityId: polity.id,
        name: polity.name,
        color: polity.color,
        status: polity.kind,
        approximate: Boolean(polity.approximate),
        capital: polity.capital,
      };
    }
  }
  return map;
}

export function politicalSnapshot(year: number, month = 1): PoliticalSnapshot {
  const effectiveYear = Math.max(1912, Math.min(2000, year));
  const map = politicalMapForYear(effectiveYear, month);
  const mappedPolityIds = new Set(Object.values(map).map((entry) => entry.polityId));
  // Keep only polities that still own at least one modern ISO in the map
  // assignment. This drops predecessor states that share every ISO with a newer
  // transition entry (e.g. 1945 UK vs 1955 UK) without inventing a second map.
  const polities = ALL_POLITIES.filter(
    (entry) => activeInDate(entry, effectiveYear, month) && mappedPolityIds.has(entry.id),
  ).sort(sortNewestFirst);
  const leaders = polities.flatMap((polity) =>
    polity.leaders
      .filter((leader) => activeInYear(leader, effectiveYear))
      .map((leader) => ({ ...leader, polityId: polity.id, polityName: polity.name })),
  );
  const parties = polities.flatMap((polity) =>
    polity.parties
      .filter((party) => activeInYear(party, effectiveYear))
      .map((party) => ({ ...party, polityId: polity.id, polityName: polity.name })),
  );
  const tensions = ALL_TENSIONS.filter((tension) => activeInYear(tension, effectiveYear)).sort(
    (a, b) => b.severity - a.severity || a.title.localeCompare(b.title),
  );
  const viennaPolity = polities.find((polity) => polity.isoCodes.includes('AUT'));
  const sourceIds = new Set<string>(['source-cshapes', 'source-natural-earth']);
  for (const polity of polities) for (const id of polity.sourceIds) sourceIds.add(id);
  for (const tension of tensions) for (const id of tension.sourceIds) sourceIds.add(id);
  const sources = [...sourceIds]
    .map((id) => POLITICAL_SOURCES_BY_ID.get(id))
    .filter((source): source is PoliticalSource => Boolean(source));
  return {
    date: { year, month },
    polities,
    leaders,
    parties,
    tensions,
    viennaPolity,
    map,
    sources,
    note:
      '政权归属叠层：用现代国家几何按历史政权着色，不是测绘图。帝国、殖民地、占领区、争议边界与次国家边界均为近似；CShapes 2.0 的精确几何未打包。',
  };
}

export function politicalContextForYear(year: number): {
  viennaPolity?: PoliticalPolity;
  leaders: (PoliticalLeader & { polityId: string; polityName: string })[];
  parties: (PoliticalParty & { polityId: string; polityName: string })[];
  tensions: PoliticalTension[];
} {
  const snapshot = politicalSnapshot(year);
  return {
    viennaPolity: snapshot.viennaPolity,
    leaders: snapshot.leaders.filter((leader) => leader.polityId === snapshot.viennaPolity?.id),
    parties: snapshot.parties.filter((party) => party.polityId === snapshot.viennaPolity?.id),
    tensions: snapshot.tensions.filter(
      (tension) =>
        !tension.polityIds ||
        (snapshot.viennaPolity && tension.polityIds.includes(snapshot.viennaPolity.id)) ||
        tension.region === 'vienna' ||
        tension.region === 'central_europe' ||
        tension.region === 'global',
    ),
  };
}

export type PoliticalWorldValidation = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  polities: number;
  tensions: number;
  sources: number;
  isoCoverage: number;
};

export function validatePoliticalWorld(): PoliticalWorldValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const polityIds = new Set<string>();
  const tensionIds = new Set<string>();
  const sourceIds = new Set(POLITICAL_SOURCES.map((source) => source.id));
  for (const polity of ALL_POLITIES) {
    if (polityIds.has(polity.id)) errors.push(`duplicate polity id ${polity.id}`);
    polityIds.add(polity.id);
    if (polity.from > polity.to) errors.push(`${polity.id}: from > to`);
    if (polity.from < 1900 || polity.to > 2000)
      errors.push(`${polity.id}: period outside 1900–2000`);
    if (!/^#[0-9a-f]{6}$/i.test(polity.color)) errors.push(`${polity.id}: invalid color`);
    if (polity.isoCodes.length === 0) errors.push(`${polity.id}: no map iso codes`);
    if (new Set(polity.isoCodes).size !== polity.isoCodes.length)
      errors.push(`${polity.id}: duplicate iso code`);
    for (const id of polity.sourceIds)
      if (!sourceIds.has(id)) errors.push(`${polity.id}: unknown source ${id}`);
    for (const leader of polity.leaders) {
      if (!leader.name.trim()) errors.push(`${polity.id}: empty leader name`);
      if (leader.from !== undefined && leader.to !== undefined && leader.from > leader.to)
        errors.push(`${polity.id}: leader ${leader.name} from > to`);
    }
    for (const party of polity.parties) {
      if (!party.id.trim()) errors.push(`${polity.id}: party missing id`);
      if (!party.name.trim()) errors.push(`${polity.id}: party ${party.id} missing name`);
    }
  }
  for (const tension of ALL_TENSIONS) {
    if (tensionIds.has(tension.id)) errors.push(`duplicate tension id ${tension.id}`);
    tensionIds.add(tension.id);
    if (tension.from > tension.to) errors.push(`${tension.id}: from > to`);
    if (tension.severity < 0 || tension.severity > 1)
      errors.push(`${tension.id}: severity outside 0..1`);
    for (const id of tension.sourceIds)
      if (!sourceIds.has(id)) errors.push(`${tension.id}: unknown source ${id}`);
    for (const id of tension.polityIds ?? [])
      if (!polityIds.has(id)) warnings.push(`${tension.id}: unknown polity ${id}`);
  }
  const coverage = new Set(ALL_POLITIES.flatMap((polity) => polity.isoCodes)).size;
  if (coverage < 80) warnings.push(`only ${coverage} modern ISO codes are mapped`);
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    polities: ALL_POLITIES.length,
    tensions: ALL_TENSIONS.length,
    sources: POLITICAL_SOURCES.length,
    isoCoverage: coverage,
  };
}

export function politicalDateForSnapshot(date: WorldDate): PoliticalSnapshot {
  return politicalSnapshot(date.year, date.month);
}
