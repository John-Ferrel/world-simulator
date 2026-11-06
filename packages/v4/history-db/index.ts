import countriesData from './data/countries.json' with { type: 'json' };
import citiesData from './data/cities.json' with { type: 'json' };
import peopleData from './data/people.json' with { type: 'json' };
import eventsData from './data/events.json' with { type: 'json' };
import fictionData from './data/fiction-hooks.json' with { type: 'json' };
import sourcesData from './data/sources.json' with { type: 'json' };
import manifestData from './data/manifest.json' with { type: 'json' };

/**
 * Historical reference index.
 *
 * This is reference material, not world state and not a scripted timeline.
 * `fact` records are sourced; `inference` records are explicitly aggregate or
 * interpretive; `fiction` hooks are counterfactual premises and are kept in a
 * separate collection so they can never be mistaken for history.
 */

export type HistoricalSourceType = 'fact' | 'inference' | 'fiction';

export type HistoricalDateRange = {
  start: string;
  end?: string;
  precision: 'day' | 'month' | 'year' | 'range';
  note?: string;
};

export type HistoricalCountryRecord = {
  id: string;
  recordType: 'country';
  title: string;
  date: HistoricalDateRange;
  countryCodes: string[];
  regionCodes: string[];
  sourceIds: string[];
  sourceType: HistoricalSourceType;
  confidence: number;
  causalTags?: string[];
  iso3?: string;
  capitalCityId?: string;
  existencePeriods?: { from: string; to: string; label: string; note?: string }[];
  notes?: string;
};

export type HistoricalCityRecord = {
  id: string;
  recordType: 'city';
  title: string;
  date: HistoricalDateRange;
  countryCodes: string[];
  regionCodes: string[];
  sourceIds: string[];
  sourceType: HistoricalSourceType;
  confidence: number;
  countryCode?: string;
  coordinates?: { lat: number; lon: number };
  roles?: string[];
  historicalContext?: string;
};

export type HistoricalPersonRecord = {
  id: string;
  recordType: 'person';
  title: string;
  date: HistoricalDateRange;
  countryCodes: string[];
  regionCodes: string[];
  sourceIds: string[];
  sourceType: HistoricalSourceType;
  confidence: number;
  causalTags?: string[];
  wikidataId?: string;
  wikidataUrl?: string;
  birth?: { date: string; precision: string };
  death?: { date: string; precision: string };
  occupation?: string;
  publicRole?: string;
  summary?: string;
  viennaRelevance?: string;
  notScriptedFate?: true;
};

export type HistoricalEventRecord = {
  id: string;
  recordType: 'event';
  title: string;
  date: HistoricalDateRange;
  countryCodes: string[];
  regionCodes: string[];
  sourceIds: string[];
  sourceType: HistoricalSourceType;
  confidence: number;
  causalTags?: string[];
  eventType?: string;
  placeCityIds?: string[];
  summary?: string;
  candidateHooks?: string[];
  candidateMaterial?: boolean;
  inferenceNote?: string;
};

export type HistoricalFictionHook = Omit<HistoricalEventRecord, 'recordType'> & {
  recordType: 'fiction_hook';
  fiction: true;
  notHistoricalClaim: true;
  disclaimer: string;
  anchorEventIds?: string[];
  divergence?: string;
};

export type HistoricalSourceRecord = {
  id: string;
  recordType: 'source';
  title: string;
  publisher?: string;
  url?: string;
  accessed?: string;
  kind?: string;
  license?: string;
  note?: string;
};

export type HistoricalCoverage = {
  totalRecords: number;
  counts: typeof manifestData.counts;
  bySourceType: Record<string, number>;
  eventsByDecade: Record<string, number>;
  eventsByCountry: Record<string, number>;
  unexplainedGaps: string[];
};

export type HistoricalIndex = {
  schemaVersion: string;
  manifest: typeof manifestData;
  countries: HistoricalCountryRecord[];
  cities: HistoricalCityRecord[];
  people: HistoricalPersonRecord[];
  events: HistoricalEventRecord[];
  fictionHooks: HistoricalFictionHook[];
  sources: HistoricalSourceRecord[];
  byId: Map<
    string,
    | HistoricalCountryRecord
    | HistoricalCityRecord
    | HistoricalPersonRecord
    | HistoricalEventRecord
    | HistoricalFictionHook
    | HistoricalSourceRecord
  >;
  sourcesById: Map<string, HistoricalSourceRecord>;
  eventsByYear: Map<number, HistoricalEventRecord[]>;
  peopleByBirthYear: Map<number, HistoricalPersonRecord[]>;
  eventsByCountry: Map<string, HistoricalEventRecord[]>;
  peopleByCountry: Map<string, HistoricalPersonRecord[]>;
  citiesByCountry: Map<string, HistoricalCityRecord[]>;
  coverage: HistoricalCoverage;
};

function yearOf(value: string): number {
  return Number(value.slice(0, 4));
}

function assertCollections(): void {
  const collections = [
    countriesData,
    citiesData,
    peopleData,
    eventsData,
    fictionData,
    sourcesData,
  ] as {
    records: { id: string; recordType: string; sourceType?: string }[];
  }[];
  const ids = new Set<string>();
  for (const collection of collections) {
    if (!Array.isArray(collection.records))
      throw new Error('history-db: collection has no records');
    for (const record of collection.records) {
      if (ids.has(record.id)) throw new Error(`history-db: duplicate id ${record.id}`);
      ids.add(record.id);
    }
  }
  const sourceIds = new Set(sourcesData.records.map((source) => source.id));
  for (const collection of collections.slice(0, 5)) {
    for (const record of collection.records as { id: string; sourceIds?: string[] }[]) {
      for (const sourceId of record.sourceIds ?? []) {
        if (!sourceIds.has(sourceId))
          throw new Error(`history-db: ${record.id} has unknown source ${sourceId}`);
      }
    }
  }
}

let cached: HistoricalIndex | undefined;

export function loadHistoricalIndex(): HistoricalIndex {
  if (cached) return cached;
  assertCollections();
  const countries = countriesData.records as unknown as HistoricalCountryRecord[];
  const cities = citiesData.records as unknown as HistoricalCityRecord[];
  const people = peopleData.records as unknown as HistoricalPersonRecord[];
  const events = eventsData.records as unknown as HistoricalEventRecord[];
  const fictionHooks = fictionData.records as unknown as HistoricalFictionHook[];
  const sources = sourcesData.records as unknown as HistoricalSourceRecord[];
  const byId = new Map<
    string,
    | HistoricalCountryRecord
    | HistoricalCityRecord
    | HistoricalPersonRecord
    | HistoricalEventRecord
    | HistoricalFictionHook
    | HistoricalSourceRecord
  >();
  const sourcesById = new Map<string, HistoricalSourceRecord>();
  for (const source of sources) {
    byId.set(source.id, source);
    sourcesById.set(source.id, source);
  }
  const eventsByYear = new Map<number, HistoricalEventRecord[]>();
  const eventsByCountry = new Map<string, HistoricalEventRecord[]>();
  const peopleByBirthYear = new Map<number, HistoricalPersonRecord[]>();
  const peopleByCountry = new Map<string, HistoricalPersonRecord[]>();
  const citiesByCountry = new Map<string, HistoricalCityRecord[]>();
  for (const record of [...countries, ...cities, ...people, ...events, ...fictionHooks]) {
    byId.set(record.id, record);
  }
  for (const event of events) {
    const year = yearOf(event.date.start);
    const list = eventsByYear.get(year) ?? [];
    list.push(event);
    eventsByYear.set(year, list);
    for (const country of event.countryCodes) {
      const byCountry = eventsByCountry.get(country) ?? [];
      byCountry.push(event);
      eventsByCountry.set(country, byCountry);
    }
  }
  for (const person of people) {
    if (person.birth) {
      const year = yearOf(person.birth.date);
      const list = peopleByBirthYear.get(year) ?? [];
      list.push(person);
      peopleByBirthYear.set(year, list);
    }
    for (const country of person.countryCodes) {
      const list = peopleByCountry.get(country) ?? [];
      list.push(person);
      peopleByCountry.set(country, list);
    }
  }
  for (const city of cities) {
    for (const country of city.countryCodes) {
      const list = citiesByCountry.get(country) ?? [];
      list.push(city);
      citiesByCountry.set(country, list);
    }
  }
  cached = {
    schemaVersion: manifestData.schemaVersion,
    manifest: manifestData,
    countries,
    cities,
    people,
    events,
    fictionHooks,
    sources,
    byId,
    sourcesById,
    eventsByYear,
    peopleByBirthYear,
    eventsByCountry,
    peopleByCountry,
    citiesByCountry,
    coverage: {
      totalRecords: manifestData.counts.totalRecords,
      counts: manifestData.counts,
      bySourceType: manifestData.coverage.bySourceType,
      eventsByDecade: manifestData.coverage.eventsByDecade,
      eventsByCountry: manifestData.coverage.eventsByCountry,
      unexplainedGaps: manifestData.limitations ?? [],
    },
  };
  return cached;
}

export type HistoricalQuery = {
  fromYear?: number;
  toYear?: number;
  countryCodes?: string[];
  regionCodes?: string[];
  eventTypes?: string[];
  sourceTypes?: HistoricalSourceType[];
  candidateOnly?: boolean;
  limit?: number;
};

export function queryHistoricalEvents(query: HistoricalQuery = {}): HistoricalEventRecord[] {
  const index = loadHistoricalIndex();
  const from = query.fromYear ?? 1900;
  const to = query.toYear ?? 2000;
  const countries = new Set(query.countryCodes ?? []);
  const regions = new Set(query.regionCodes ?? []);
  const types = new Set(query.eventTypes ?? []);
  const sourceTypes = new Set(query.sourceTypes ?? ['fact', 'inference']);
  const results: HistoricalEventRecord[] = [];
  for (const event of index.events) {
    const year = yearOf(event.date.start);
    if (year < from || year > to) continue;
    if (query.candidateOnly && event.candidateMaterial !== true) continue;
    if (sourceTypes.size > 0 && !sourceTypes.has(event.sourceType)) continue;
    if (countries.size > 0 && !event.countryCodes.some((code) => countries.has(code))) continue;
    if (regions.size > 0 && !event.regionCodes.some((code) => regions.has(code))) continue;
    if (types.size > 0 && (!event.eventType || !types.has(event.eventType))) continue;
    results.push(event);
  }
  results.sort((a, b) => a.date.start.localeCompare(b.date.start) || a.id.localeCompare(b.id));
  return query.limit ? results.slice(0, query.limit) : results;
}

export function queryHistoricalPeople(
  options: {
    fromYear?: number;
    toYear?: number;
    countryCodes?: string[];
    aliveInYear?: number;
    limit?: number;
  } = {},
): HistoricalPersonRecord[] {
  const index = loadHistoricalIndex();
  const from = options.fromYear ?? 1900;
  const to = options.toYear ?? 2000;
  const countries = new Set(options.countryCodes ?? []);
  const results = index.people.filter((person) => {
    const birth = person.birth ? yearOf(person.birth.date) : from;
    const death = person.death ? yearOf(person.death.date) : to;
    if (birth > to || death < from) return false;
    if (
      options.aliveInYear !== undefined &&
      (birth > options.aliveInYear || death < options.aliveInYear)
    )
      return false;
    if (countries.size > 0 && !person.countryCodes.some((code) => countries.has(code)))
      return false;
    return true;
  });
  results.sort(
    (a, b) => (a.birth?.date ?? '').localeCompare(b.birth?.date ?? '') || a.id.localeCompare(b.id),
  );
  return options.limit ? results.slice(0, options.limit) : results;
}

export function queryHistoricalCities(countryCode?: string): HistoricalCityRecord[] {
  const index = loadHistoricalIndex();
  if (!countryCode) return [...index.cities];
  return index.citiesByCountry.get(countryCode) ?? [];
}

export function historicalCountryPeriod(iso3: string, year: number) {
  const index = loadHistoricalIndex();
  const country = index.countries.find((candidate) => candidate.iso3 === iso3);
  if (!country) return undefined;
  const period = country.existencePeriods?.find(
    (candidate) => year >= yearOf(candidate.from) && year <= yearOf(candidate.to),
  );
  return (
    period ?? { label: country.title, note: 'No period annotation for this year in the index.' }
  );
}

/**
 * Candidate material for the macro director. It is explicitly not a timeline
 * command: each entry carries source type and confidence so the director can
 * ignore it if the current world no longer supports it.
 */
export function historicalCandidatesForWindow(
  fromYear: number,
  toYear: number,
  countryCodes: string[] = [],
): {
  id: string;
  year: number;
  title: string;
  sourceType: HistoricalSourceType;
  confidence: number;
  hooks: string[];
  summary: string;
  sourceIds: string[];
}[] {
  return queryHistoricalEvents({
    fromYear,
    toYear,
    countryCodes,
    candidateOnly: true,
    sourceTypes: ['fact', 'inference'],
    limit: 40,
  }).map((event) => ({
    id: event.id,
    year: yearOf(event.date.start),
    title: event.title,
    sourceType: event.sourceType,
    confidence: event.confidence,
    hooks: event.candidateHooks ?? [],
    summary: event.summary ?? '',
    sourceIds: event.sourceIds,
  }));
}

export function historicalIndexCoverage(): HistoricalCoverage {
  return loadHistoricalIndex().coverage;
}
