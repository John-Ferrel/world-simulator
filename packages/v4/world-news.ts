import type { EventFact, WorldDate, WorldState } from './domain.js';
import { politicalSnapshot, type PoliticalSnapshot } from './political-world/index.js';
import anchorsData from './content/world-news/anchors.json' with { type: 'json' };
import templatesData from './content/world-news/templates.json' with { type: 'json' };

export type NewsScope = 'global' | 'regional' | 'local';
export type NewsCategory =
  | 'war'
  | 'diplomacy'
  | 'politics'
  | 'economy'
  | 'society'
  | 'culture'
  | 'science'
  | 'scandal'
  | 'disaster'
  | 'other';
export type NewsProvenance = 'reference' | 'simulation' | 'ambient' | 'rumor';
export type NewsReliability = 'confirmed' | 'reported' | 'rumor';

export type WorldNewsItem = {
  id: string;
  date: WorldDate;
  scope: NewsScope;
  category: NewsCategory;
  title: string;
  summary: string;
  provenance: NewsProvenance;
  reliability: NewsReliability;
  polityId?: string;
  placeId?: string;
  sourceUrls?: string[];
  relatedEventIds?: string[];
  tags?: string[];
};

type NewsAnchor = {
  id: string;
  date: WorldDate;
  scope: NewsScope;
  category: NewsCategory;
  title: string;
  summary: string;
  region?: string;
  polityId?: string;
  sourceUrls?: string[];
  referenceOnly: true;
};

type NewsTemplate = {
  id: string;
  scope: NewsScope;
  category: NewsCategory;
  title: string;
  summary: string;
  weight: number;
};

const anchors = (anchorsData as { anchors: NewsAnchor[] }).anchors;
const ambientTemplates = (templatesData as { ambient: NewsTemplate[] }).ambient;
const rumorTemplates = (templatesData as { rumors: NewsTemplate[] }).rumors;

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return Math.abs(result);
}

function pickDeterministic<T>(values: T[], seed: string, count: number): T[] {
  if (values.length === 0 || count <= 0) return [];
  const selected: T[] = [];
  const used = new Set<number>();
  let cursor = hash(seed) % values.length;
  while (selected.length < Math.min(count, values.length)) {
    let guard = 0;
    while (used.has(cursor) && guard < values.length) {
      cursor = (cursor + 1) % values.length;
      guard += 1;
    }
    used.add(cursor);
    selected.push(values[cursor]!);
    cursor = (cursor + 7) % values.length;
  }
  return selected;
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function categoryForEvent(event: EventFact): NewsCategory {
  const action = typeof event.action === 'string' ? event.action : '';
  const tags = new Set([
    ...(event.tags ?? []).filter((tag): tag is string => typeof tag === 'string'),
    ...(action ? [action] : []),
  ]);
  const has = (values: string[]) => values.some((value) => tags.has(value));
  if (has(['war', 'mobilization', 'front', 'battle', 'occupation'])) return 'war';
  if (has(['diplomacy', 'treaty', 'foreign', 'alliance'])) return 'diplomacy';
  if (has(['scandal', 'affair', 'rumour', 'rumor', 'blackmail'])) return 'scandal';
  if (has(['election', 'party', 'parliament', 'office', 'political', 'government'])) return 'politics';
  if (has(['strike', 'union', 'protest', 'riot', 'demonstration'])) return 'society';
  if (has(['bank', 'debt', 'economy', 'market', 'loan', 'inflation', 'rent'])) return 'economy';
  if (has(['opera', 'theatre', 'music', 'film', 'culture', 'cabaret', 'book'])) return 'culture';
  if (has(['science', 'medicine', 'hospital', 'doctor', 'research'])) return 'science';
  if (has(['fire', 'flood', 'accident', 'disaster', 'epidemic'])) return 'disaster';
  return 'other';
}

const newsCategoryLabel: Record<NewsCategory, string> = {
  war: '前线消息',
  diplomacy: '外交消息',
  politics: '政坛消息',
  economy: '经济消息',
  society: '社会消息',
  culture: '文化消息',
  science: '科学消息',
  scandal: '丑闻消息',
  disaster: '灾情消息',
  other: '世界消息',
};

function scopeForEvent(event: EventFact): NewsScope {
  const action = typeof event.action === 'string' ? event.action : '';
  const tags = new Set([
    ...(event.tags ?? []).filter((tag): tag is string => typeof tag === 'string'),
    ...(action ? [action] : []),
  ]);
  if (
    ['war', 'diplomacy', 'military', 'front', 'battle', 'treaty', 'alliance'].some((tag) =>
      tags.has(tag),
    )
  )
    return 'global';
  if (event.placeId?.includes('wien') || event.placeId?.includes('klosterneuburg')) return 'local';
  return 'regional';
}

function referenceNews(year: number): WorldNewsItem[] {
  return anchors
    .filter((anchor) => anchor.date.year === year)
    .map((anchor) => ({
      id: `news-ref-${anchor.id}`,
      date: { ...anchor.date },
      scope: anchor.scope,
      category: anchor.category,
      title: anchor.title,
      summary: anchor.summary,
      provenance: 'reference',
      reliability: 'confirmed',
      ...(anchor.polityId ? { polityId: anchor.polityId } : {}),
      ...(anchor.sourceUrls ? { sourceUrls: [...anchor.sourceUrls] } : {}),
      tags: ['reference', 'historical-anchor', ...(anchor.region ? [anchor.region] : [])],
    }));
}

function simulationNews(world: WorldState, year: number): WorldNewsItem[] {
  return world.events
    .filter((event) => {
      if (event.date.year !== year) return false;
      const action = typeof event.action === 'string' ? event.action : '';
      const tags = new Set(
        (event.tags ?? []).filter((tag): tag is string => typeof tag === 'string'),
      );
      const publicTag = ['public', 'fame', 'public-scandal', 'scandal', 'political', 'war', 'strike'].some(
        (tag) => tags.has(tag),
      );
      if (
        (event.provenance?.kind === 'birth' ||
          action.startsWith('death') ||
          action.startsWith('statistical_death')) &&
        !publicTag
      )
        return false;
      return event.visibility === 'public' || publicTag;
    })
    .sort((a, b) => b.significance - a.significance || a.date.month - b.date.month)
    .slice(0, 8)
    .map((event) => {
      const category = categoryForEvent(event);
      return {
        id: `news-sim-${event.id}`,
        date: { ...event.date },
        scope: scopeForEvent(event),
        category,
        title: event.title?.trim() || newsCategoryLabel[category],
        summary: truncate(event.immediateText, 180),
      provenance: 'simulation',
      reliability: 'confirmed',
      ...(event.placeId ? { placeId: event.placeId } : {}),
        relatedEventIds: [event.id],
        tags: ['simulation', ...(event.tags ?? []).slice(0, 5)],
      };
    });
}

function ambientNews(
  world: WorldState,
  year: number,
  snapshot: PoliticalSnapshot,
  maxMonth: number,
): WorldNewsItem[] {
  const local = ambientTemplates.filter((template) => template.scope === 'local');
  const regional = ambientTemplates.filter((template) => template.scope === 'regional');
  const global = ambientTemplates.filter((template) => template.scope === 'global');
  const selected = [
    ...pickDeterministic(local, `${world.seed}:${year}:local`, 2),
    ...pickDeterministic(regional, `${world.seed}:${year}:regional`, 1),
    ...pickDeterministic(global, `${world.seed}:${year}:global`, 1),
  ];
  return selected.map((template, index) => ({
    id: `news-amb-${year}-${template.id}`,
    date: { year, month: 1 + (hash(`${world.seed}:${year}:${template.id}:${index}`) % Math.max(1, maxMonth)) },
    scope: template.scope,
    category: template.category,
    title: template.title,
    summary: template.summary,
    provenance: 'ambient',
    reliability: 'reported',
    ...(template.scope === 'local' && snapshot.viennaPolity
      ? { polityId: snapshot.viennaPolity.id }
      : {}),
    tags: ['ambient', template.category],
  }));
}

function rumorNews(world: WorldState, year: number, maxMonth: number): WorldNewsItem[] {
  const selected = pickDeterministic(rumorTemplates, `${world.seed}:${year}:rumor`, 2);
  return selected.map((template, index) => ({
    id: `news-rum-${year}-${template.id}`,
    date: { year, month: 1 + (hash(`${world.seed}:${year}:${template.id}:${index}`) % Math.max(1, maxMonth)) },
    scope: template.scope,
    category: template.category,
    title: template.title,
    summary: template.summary,
    provenance: 'rumor',
    reliability: 'rumor',
    tags: ['rumor', 'unconfirmed', template.category],
  }));
}

function pressureForTensions(snapshot: PoliticalSnapshot): Record<string, number> {
  const severity = (patterns: string[]) => {
    const matching = snapshot.tensions.filter((tension) =>
      patterns.some((pattern) => tension.title.includes(pattern) || tension.description.includes(pattern)),
    );
    return matching.reduce((max, tension) => Math.max(max, tension.severity), 0);
  };
  return {
    political_tension: Math.max(
      0.2,
      snapshot.tensions.reduce((max, tension) => Math.max(max, tension.severity), 0),
    ),
    war_fear: Math.max(0.15, severity(['战争', '总体战', '巴尔干', '军备', '冷战', '入侵', '围城'])),
    persecution_pressure: Math.max(0.08, severity(['迫害', '大屠杀', '清洗', '占领', '恐怖', '反犹'])),
  };
}

function economicAnxiety(year: number): number {
  if (year >= 1914 && year <= 1918) return 0.62;
  if (year >= 1919 && year <= 1925) return 0.76;
  if (year >= 1929 && year <= 1938) return 0.8;
  if (year >= 1939 && year <= 1945) return 0.7;
  if (year >= 1945 && year <= 1955) return 0.52;
  if (year >= 1991 && year <= 2000) return 0.35;
  return 0.3;
}

/**
 * Add news and era pressures to a world. Deterministic and idempotent: repeated
 * calls with the same world/date do not duplicate items. Called at seed time and
 * at the end of every annual advance; it never invents a committed EventFact.
 */
export function ensureWorldNews(world: WorldState, date: WorldDate = world.date): WorldState {
  const existing = world.news ?? [];
  const byId = new Map(existing.map((item) => [item.id, item]));
  const snapshot = politicalSnapshot(date.year, date.month);
  for (const anchor of anchors) {
    if (anchor.date.year > date.year) continue;
    if (anchor.date.year === date.year && anchor.date.month > date.month) continue;
    const item = referenceNews(anchor.date.year).find((entry) => entry.id === `news-ref-${anchor.id}`);
    if (item && !byId.has(item.id)) byId.set(item.id, item);
  }
  for (const item of [
    ...simulationNews(world, date.year),
    ...ambientNews(world, date.year, snapshot, date.month),
    ...rumorNews(world, date.year, date.month),
  ]) {
    if (!byId.has(item.id)) byId.set(item.id, item);
  }
  const merged = [...byId.values()]
    .sort(
      (a, b) =>
        b.date.year - a.date.year ||
        b.date.month - a.date.month ||
        a.id.localeCompare(b.id),
    )
    .slice(0, 420);
  world.news = merged;
  const pressures = pressureForTensions(snapshot);
  world.pressures = world.pressures ?? {};
  for (const [key, value] of Object.entries(pressures)) {
    world.pressures[key] = Math.max(world.pressures[key] ?? 0, value);
  }
  world.pressures.economic_anxiety = Math.max(
    world.pressures.economic_anxiety ?? 0,
    economicAnxiety(date.year),
  );
  return world;
}

export function recentWorldNews(
  world: WorldState,
  options: { limit?: number; scope?: NewsScope; provenance?: NewsProvenance } = {},
): WorldNewsItem[] {
  const limit = Math.max(1, Math.min(200, options.limit ?? 40));
  return (world.news ?? [])
    .filter((item) => !options.scope || item.scope === options.scope)
    .filter((item) => !options.provenance || item.provenance === options.provenance)
    .sort(
      (a, b) =>
        b.date.year - a.date.year ||
        b.date.month - a.date.month ||
        a.id.localeCompare(b.id),
    )
    .slice(0, limit);
}
