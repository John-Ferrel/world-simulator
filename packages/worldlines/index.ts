import { historicalCareer } from './careers.js';
import { safeText } from '../contracts/index.js';
import type { Person, World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { initializeLife } from '../cognition/life.js';
import { newPerson } from '../world-packs/index.js';
import peopleData from './historical-people.json' with { type: 'json' };

/** Declarative, bounded grammar. No input field is ever evaluated as code. */
export type WorldCondition =
  | { kind: 'polity-exists'; id: string }
  | { kind: 'shock-active'; id: string }
  | { kind: 'shock-exists'; id: string }
  | { kind: 'leader-alive'; polityId: string }
  | { kind: 'person-alive'; personId: string }
  | { kind: 'discovery-exists'; id: string }
  | {
      kind: 'industry-stock-at-least';
      polityId: string;
      good: 'coal' | 'ore' | 'steel' | 'oil' | 'arms' | 'medicine';
      amount: number;
    }
  | { kind: 'industry-technology-at-least'; polityId: string; value: number }
  | { kind: 'legitimacy-below'; polityId: string; value: number }
  | { kind: 'month-at-least'; month: number }
  | { kind: 'not'; condition: WorldCondition }
  | { kind: 'all'; conditions: readonly WorldCondition[] }
  | { kind: 'any'; conditions: readonly WorldCondition[] };

export type InputDisposition = 'historical' | 'branched' | 'suppressed';
export type HistoricalInput = {
  id: string;
  date: string;
  countries?: string[];
  requires?: readonly WorldCondition[];
  excludes?: readonly WorldCondition[];
};

// These causal links make downstream historical inputs contingent on the world's actual earlier
// state. They refer only to source shock IDs already understood by the Earth history pack.
export const HISTORICAL_CAUSAL_LINKS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'wwi-us-entry': ['wwi'],
  'armistice-1918': ['wwi'],
  versailles: ['armistice-1918'],
  'league-nations': ['versailles'],
  'china-war-1937': ['manchuria'],
  'wwii-europe': ['wwi', 'versailles'],
  'soviet-war': ['wwii-europe'],
  'pacific-war': ['wwii-europe'],
  'penicillin-clinical': ['penicillin-discovery'],
  'd-day': ['wwii-europe'],
  hiroshima: ['pacific-war'],
  nagasaki: ['pacific-war'],
  'japan-reconstruction': ['pacific-war'],
  'korea-armistice': ['korean-war'],
});
export const HISTORICAL_POLITY_REQUIREMENTS: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    'wwii-europe': ['DEU', 'POL'],
    'pacific-war': ['JPN', 'USA'],
    'korean-war': ['KOR', 'PRK'],
    'arab-israeli-1948': ['ISR'],
    'six-day-war': ['ISR'],
    'gulf-war': ['IRQ', 'KWT'],
  });
export const HISTORICAL_PERSON_REQUIREMENTS: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    'russia-revolution': ['Q1394'],
    'wwii-europe': ['Q352'],
    'soviet-war': ['Q855'],
    'india-partition': ['Q1001'],
  });

/** A bounded proposal for the canonical simulator to apply; this module never mutates core mechanics. */
export type WorldlineEffect =
  | { kind: 'polity-legitimacy-delta'; polityId: string; delta: number }
  | { kind: 'polity-military-delta'; polityId: string; delta: number }
  | { kind: 'settlement-knowledge-delta'; countryId: string; delta: number }
  | { kind: 'settlement-unrest-delta'; countryId: string; delta: number }
  | { kind: 'settlement-healthcare-delta'; countryId: string; delta: number }
  | { kind: 'end-shock'; shockId: string };
export type PendingWorldlineEffect = {
  id: string;
  inputId: string;
  dueMonth: number;
  effect: WorldlineEffect;
  causeIds: string[];
};
export type ActiveWorldlineModifier = {
  id: string;
  inputId: string;
  started: number;
  ends: number;
  effect: WorldlineEffect;
  causeIds: string[];
};
export type WorldlineState = {
  version: 1;
  firedInputs: string[];
  effects: ActiveWorldlineModifier[];
  pendingEffects: PendingWorldlineEffect[];
  activatedPeople: string[];
  personCursor: number;
  pendingPeople: number;
};

type Rule = {
  id: string;
  date: string;
  title: string;
  sourceUrl: string;
  requires: WorldCondition[];
  excludes: WorldCondition[];
  after?: { inputId: string; delayMonths: number };
  effect?: WorldlineEffect;
  durationMonths?: number;
};

// These are evidence-backed compatibility adapters for already observed source events, not a
// pre-authored alternate-history tree. Character plans and branches are decided by the runtime.
export const WORLDLINE_RULES: readonly Rule[] = [
  {
    id: 'wwi-armistice-effect',
    date: '1918-11',
    title: '停战协议结束实际战争',
    sourceUrl: 'https://www.nationalarchives.gov.uk/education/resources/first-world-war-1914-1918/',
    requires: [
      { kind: 'shock-exists', id: 'wwi' },
      { kind: 'shock-exists', id: 'armistice-1918' },
    ],
    excludes: [],
    effect: { kind: 'end-shock', shockId: 'wwi' },
  },
  {
    id: 'japan-surrender-effect',
    date: '1945-09',
    title: '日本投降结束太平洋战争',
    sourceUrl: 'https://www.nationalarchives.gov.uk/education/resources/second-world-war/',
    requires: [
      { kind: 'shock-exists', id: 'pacific-war' },
      { kind: 'shock-exists', id: 'japan-reconstruction' },
    ],
    excludes: [],
    effect: { kind: 'end-shock', shockId: 'pacific-war' },
  },
  {
    id: 'clinical-penicillin-healthcare',
    date: '1941-01',
    title: '青霉素临床应用提升医疗能力',
    sourceUrl: 'https://www.nobelprize.org/prizes/medicine/1945/fleming/facts/',
    requires: [
      { kind: 'shock-exists', id: 'penicillin-discovery' },
      { kind: 'shock-exists', id: 'penicillin-clinical' },
    ],
    excludes: [],
    effect: { kind: 'settlement-healthcare-delta', countryId: 'GBR', delta: 0.04 },
    durationMonths: 120,
  },
];

function stateOf(w: World): WorldlineState {
  const host = w as World & { worldlines?: WorldlineState };
  host.worldlines ??= {
    version: 1,
    firedInputs: [],
    effects: [],
    pendingEffects: [],
    activatedPeople: [],
    personCursor: 0,
    pendingPeople: HISTORICAL_PEOPLE.length,
  };
  return host.worldlines;
}

function validCondition(value: unknown, depth = 0): value is WorldCondition {
  if (depth > 5 || !value || typeof value !== 'object' || Array.isArray(value)) return false;
  const c = value as Record<string, unknown>;
  const exact = (...keys: string[]) =>
    Object.keys(c).length === keys.length + 1 && keys.every((k) => k in c) && 'kind' in c;
  if (c.kind === 'not') return exact('condition') && validCondition(c.condition, depth + 1);
  if (c.kind === 'all' || c.kind === 'any')
    return (
      exact('conditions') &&
      Array.isArray(c.conditions) &&
      c.conditions.length <= 16 &&
      c.conditions.every((x) => validCondition(x, depth + 1))
    );
  if (
    ['polity-exists', 'shock-active', 'shock-exists', 'discovery-exists'].includes(c.kind as string)
  )
    return exact('id') && typeof c.id === 'string' && c.id.length <= 80;
  if (c.kind === 'leader-alive' || c.kind === 'person-alive') {
    const key = c.kind === 'leader-alive' ? 'polityId' : 'personId';
    return exact(key) && typeof c[key] === 'string' && c[key].length <= 120;
  }
  if (c.kind === 'industry-stock-at-least')
    return (
      exact('polityId', 'good', 'amount') &&
      typeof c.polityId === 'string' &&
      c.polityId.length <= 80 &&
      ['coal', 'ore', 'steel', 'oil', 'arms', 'medicine'].includes(c.good as string) &&
      typeof c.amount === 'number' &&
      Number.isFinite(c.amount) &&
      c.amount >= 0 &&
      c.amount <= 1e15
    );
  if (c.kind === 'industry-technology-at-least')
    return (
      exact('polityId', 'value') &&
      typeof c.polityId === 'string' &&
      c.polityId.length <= 80 &&
      typeof c.value === 'number' &&
      Number.isFinite(c.value) &&
      c.value >= 0 &&
      c.value <= 2
    );
  if (c.kind === 'legitimacy-below')
    return (
      exact('polityId', 'value') &&
      typeof c.polityId === 'string' &&
      c.polityId.length <= 80 &&
      typeof c.value === 'number' &&
      Number.isFinite(c.value) &&
      c.value >= 0 &&
      c.value <= 1
    );
  return (
    c.kind === 'month-at-least' &&
    exact('month') &&
    Number.isInteger(c.month) &&
    (c.month as number) >= 0 &&
    (c.month as number) <= 100000
  );
}

function condition(w: World, c: WorldCondition, depth = 0): boolean {
  if (!validCondition(c, depth)) return false;
  switch (c.kind) {
    case 'polity-exists':
      return w.polities.some((p) => p.id === c.id);
    case 'shock-active':
      return !!w.shocks?.some((q) => q.id === c.id && q.started <= w.month && q.ends > w.month);
    case 'shock-exists':
      return !!w.shocks?.some(
        (q) => q.id === c.id && (q.historicalKind !== 'war' || q.kind === 'war'),
      );
    case 'leader-alive': {
      const p = w.polities.find((q) => q.id === c.polityId);
      return !!p && w.persons.some((q) => q.id === p.leaderId && q.death === undefined);
    }
    // A source person not yet activated is unknown, not dead. Only a committed simulated death
    // makes this predicate false.
    case 'person-alive': {
      const p = w.persons.find((q) => q.id === c.personId);
      return !p || p.death === undefined;
    }
    case 'discovery-exists':
      return !!w.discoveries?.some((q) => q.id === c.id);
    case 'industry-stock-at-least':
      return (w.industry?.polities[c.polityId]?.goods[c.good] ?? 0) >= c.amount;
    case 'industry-technology-at-least':
      return (w.industry?.polities[c.polityId]?.technology ?? 0) >= c.value;
    case 'legitimacy-below': {
      const p = w.polities.find((q) => q.id === c.polityId);
      return !!p && p.legitimacy < c.value;
    }
    case 'month-at-least':
      return w.month >= c.month;
    case 'not':
      return !condition(w, c.condition, depth + 1);
    case 'all':
      return c.conditions.every((q) => condition(w, q, depth + 1));
    case 'any':
      return c.conditions.some((q) => condition(w, q, depth + 1));
  }
}

function witnessEvents(w: World, conditions: readonly WorldCondition[]): string[] {
  const ids: string[] = [];
  const visit = (c: WorldCondition): void => {
    if (!condition(w, c)) return;
    if (c.kind === 'shock-exists' || c.kind === 'shock-active') {
      const q = w.shocks?.find((q) => q.id === c.id);
      if (q) ids.push(q.causeId);
    } else if (c.kind === 'discovery-exists') {
      const d = w.discoveries?.find((d) => d.id === c.id);
      if (d) ids.push(...d.causeIds);
    } else if (c.kind === 'industry-stock-at-least' || c.kind === 'industry-technology-at-least') {
      ids.push(...(w.industry?.lastEventIds ?? []));
    } else if (c.kind === 'leader-alive') {
      const polity = w.polities.find((p) => p.id === c.polityId);
      const person = polity && w.persons.find((p) => p.id === polity.leaderId);
      if (person) for (const memory of person.memories) ids.push(memory.eventId);
    } else if (c.kind === 'person-alive') {
      const person = w.persons.find((p) => p.id === c.personId);
      if (person) for (const memory of person.memories) ids.push(memory.eventId);
    } else if (c.kind === 'not') {
      // A negated predicate establishes absence, not a causal event to cite.
    } else if (c.kind === 'all' || c.kind === 'any') for (const child of c.conditions) visit(child);
  };
  for (const c of conditions) visit(c);
  return [...new Set(ids)].slice(0, 32);
}

function monthOf(date: string, startYear: number): number | undefined {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(date)) return;
  const [year, month] = date.split('-').map(Number);
  return (year - startYear) * 12 + month - 1;
}

/** Tell the historical-source layer whether a source event still fits the live world. */
export function historicalDisposition(w: World, input: HistoricalInput): InputDisposition {
  if (
    !input ||
    typeof input.id !== 'string' ||
    input.id.length > 100 ||
    typeof input.date !== 'string' ||
    !Array.isArray(input.requires ?? []) ||
    !Array.isArray(input.excludes ?? []) ||
    (input.countries !== undefined &&
      (!Array.isArray(input.countries) ||
        input.countries.length > 200 ||
        input.countries.some((id) => typeof id !== 'string' || id.length > 80)))
  )
    return 'suppressed';
  const required = input.requires ?? [],
    excluded = input.excludes ?? [];
  if (
    required.length > 16 ||
    excluded.length > 16 ||
    !required.every((c) => validCondition(c)) ||
    !excluded.every((c) => validCondition(c))
  )
    return 'suppressed';
  const startYear = w.calendar?.startYear ?? 1900;
  const at = monthOf(input.date, startYear);
  if (at === undefined || at < 0 || w.month < at) return 'historical';
  if (input.countries?.length && !input.countries.some((id) => w.polities.some((p) => p.id === id)))
    return 'suppressed';
  if (
    (HISTORICAL_POLITY_REQUIREMENTS[input.id] ?? []).some(
      (id) => !w.polities.some((p) => p.id === id),
    )
  )
    return 'suppressed';
  if (
    (HISTORICAL_PERSON_REQUIREMENTS[input.id] ?? []).some((qid) =>
      w.persons.some((p) => p.id === `historical-${qid}` && p.death !== undefined),
    )
  )
    return 'branched';
  const causalParents = HISTORICAL_CAUSAL_LINKS[input.id] ?? [];
  if (
    causalParents.some(
      (id) =>
        !w.shocks?.some((q) => q.id === id && (q.historicalKind !== 'war' || q.kind === 'war')),
    )
  )
    return 'branched';
  if (required.some((c) => !condition(w, c)) || excluded.some((c) => condition(w, c)))
    return 'branched';
  return 'historical';
}

/** Query an installed worldline by its declared id; unknown ids remain ordinary historical inputs. */
export function evaluateHistoricalInput(w: World, id: string): InputDisposition {
  const rule = WORLDLINE_RULES.find((r) => r.id === id);
  if (!rule) return 'historical';
  return historicalDisposition(w, {
    id: rule.id,
    date: rule.date,
    requires: rule.requires,
    excludes: rule.excludes,
  });
}

/** Advance bounded worldline rules and activate eligible registered people without changing population. */
export function advanceWorldlines(w: World, emit: Emit, locals: Map<string, Person[]>): void {
  if (!w.pack.id.startsWith('earth-')) return;
  const state = stateOf(w),
    startYear = w.calendar?.startYear ?? 1900;
  const byRule = new Set(state.firedInputs);
  for (const rule of WORLDLINE_RULES) {
    if (byRule.has(rule.id)) continue;
    const at = monthOf(rule.date, startYear);
    if (at === undefined || w.month < at) continue;
    if (rule.after && !byRule.has(rule.after.inputId)) continue;
    if (!rule.requires.every((c) => condition(w, c)) || rule.excludes.some((c) => condition(w, c)))
      continue;
    const source = emit(
      'worldline_effect_scheduled',
      [],
      undefined,
      `${rule.title}：已发生的历史输入满足因果条件，提交有界模拟效果。`,
      {
        sourceId: rule.id,
        sourceUrl: rule.sourceUrl,
        classification: 'worldline-effect',
        simulationEffects: true,
      },
      witnessEvents(w, [...rule.requires, ...rule.excludes]),
      0.9,
    );
    state.firedInputs.push(rule.id);
    if (rule.effect) {
      const dueMonth = w.month + (rule.after?.delayMonths ?? 0);
      if (rule.durationMonths)
        state.effects.push({
          id: `${rule.id}:modifier`,
          inputId: rule.id,
          started: dueMonth,
          ends: dueMonth + rule.durationMonths,
          effect: rule.effect,
          causeIds: [source.id],
        });
      else
        state.pendingEffects.push({
          id: `${rule.id}:effect`,
          inputId: rule.id,
          dueMonth,
          effect: rule.effect,
          causeIds: [source.id],
        });
    }
  }
  // The canonical simulation consumes pendingEffects/effects and applies bounded domain changes.
  // Keep due proposals until consumed so persistence/retry cannot silently lose a causal effect.
  state.effects = state.effects.filter((m) => m.ends > w.month);

  activateRegisteredPeople(w, emit, locals);
}

export function activateRegisteredPeople(
  w: World,
  emit: Emit,
  locals: Map<string, Person[]>,
  records: readonly HistoricalPersonRecord[] = HISTORICAL_PEOPLE,
): void {
  const state = stateOf(w);
  const activated = new Set(state.activatedPeople);
  const existingIds = new Set(w.persons.map((p) => p.id));
  const startYear = w.calendar?.startYear ?? 1900;
  const baselineMonth = (startYear - 1900) * 12;
  const worldMonth = baselineMonth + w.month;
  const currentYear = startYear + Math.floor(w.month / 12);
  const lowerYear = currentYear - 110,
    upperYear = currentYear;
  const lowerBound = (year: number) => {
    let lo = 0,
      hi = records.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (records[mid].birthYear < year) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const first = lowerBound(lowerYear),
    afterLast = lowerBound(upperYear + 1),
    last = afterLast - 1;
  if (first > last || !records.length || w.month < 0) {
    state.pendingPeople = Math.max(0, HISTORICAL_PEOPLE.length - activated.size);
    return;
  }
  const locations = new Map<string, typeof w.settlements>();
  for (const s of w.settlements) {
    const geographicRegion = s.regionId ?? s.polityId;
    const list = locations.get(geographicRegion) ?? [];
    list.push(s);
    locations.set(geographicRegion, list);
  }
  for (const list of locations.values())
    list.sort((a, b) => b.cohort.adults - a.cohort.adults || a.id.localeCompare(b.id));
  const cursor = new Map<string, number>();
  let personIndex = state.personCursor;
  if (personIndex < first || personIndex > last) personIndex = first;
  let scanned = 0,
    added = 0;
  const SCAN_BUDGET = 5000,
    ACTIVATION_BUDGET = 128;
  while (scanned < SCAN_BUDGET && added < ACTIVATION_BUDGET) {
    if (personIndex > last) personIndex = first;
    const record = records[personIndex++];
    scanned++;
    if (activated.has(record.qid)) continue;
    // Historical death dates screen out people who were already dead at the selected baseline;
    // a later date is never applied as a simulated death.
    if (
      (record.deathYear !== undefined && record.deathYear < startYear) ||
      (record.deathMonth !== undefined && record.deathMonth < baselineMonth)
    )
      continue;
    const personId = `historical-${record.qid}`;
    if (existingIds.has(personId)) {
      state.activatedPeople.push(record.qid);
      activated.add(record.qid);
      continue;
    }
    const ageMonths =
      record.birthMonth === undefined
        ? (currentYear - record.birthYear) * 12
        : worldMonth - record.birthMonth;
    if (ageMonths < 0 || ageMonths > 110 * 12) continue;
    const cohortKey = ageMonths < 18 * 12 ? 'children' : ageMonths >= 65 * 12 ? 'elders' : 'adults';
    const cursorKey = `${record.countryId}:${cohortKey}`;
    const candidates = locations.get(record.countryId) ?? [];
    let locationIndex = cursor.get(cursorKey) ?? 0;
    while (locationIndex < candidates.length && candidates[locationIndex].cohort[cohortKey] < 1)
      locationIndex++;
    cursor.set(cursorKey, locationIndex);
    const location = candidates[locationIndex];
    if (!location) continue;
    const locationId = location.id;
    const p = newPerson(
      w,
      personId,
      locationId,
      state.activatedPeople.length,
      Math.floor(ageMonths / 12),
    );
    p.name = safeText(record.name);
    p.historicalIdentity = {
      qid: record.qid,
      sourceUrl: record.sourceUrl,
      birthPrecision: record.birthPrecision,
      careerHint: record.sourcedOccupation,
    };
    const role = historicalCareer(record.sourcedOccupation);
    if (role && ageMonths >= 18 * 12) p.occupation = role;
    // The engine stores months. For year-only source dates this is an age anchor, not a claimed birthday.
    p.birth =
      record.birthMonth === undefined
        ? w.month - Math.floor(ageMonths / 12) * 12
        : record.birthMonth - baselineMonth;
    if (ageMonths < 18 * 12) {
      p.occupation = '孩童';
      p.coin = 0;
      p.skills.craft *= ageMonths / (18 * 12);
    }
    p.coin = Math.min(location.coin, p.coin);
    location.coin -= p.coin;
    p.background = `真实人物资料：Pantheon 2.0 / Wikidata ${record.qid}；出生日期精度为${record.birthPrecision}，地理依据为${record.countryBasis}。模拟中的经历、观点和死亡均由世界状态决定。`;
    p.title = '历史人物（模拟角色）';
    initializeLife(p, w);
    location.cohort[cohortKey]--;
    w.persons.push(p);
    existingIds.add(personId);
    const list = locals.get(locationId) ?? [];
    list.push(p);
    locals.set(locationId, list);
    state.activatedPeople.push(record.qid);
    activated.add(record.qid);
    added++;
    emit(
      'historical_person_activated',
      [p.id],
      locationId,
      `${p.name}作为具名人物进入模拟；此后经历由实际世界决定。`,
      {
        sourceId: record.qid,
        sourceUrl: record.sourceUrl,
        wikidataUrl: record.wikidataUrl,
        classification: 'historical-identity',
        biographyIsNotFate: true,
        cohort: cohortKey,
        age: Math.floor(ageMonths / 12),
      },
      [],
      0.65,
    );
  }
  state.personCursor = personIndex > last ? first : personIndex;
  state.pendingPeople = Math.max(0, HISTORICAL_PEOPLE.length - activated.size);
}

/** Imported records carry only sourced identity metadata. A stated historical death date is not a death command. */
export type HistoricalPersonRecord = {
  qid: string;
  name: string;
  birthYear: number;
  birthMonth?: number;
  birthDay?: number;
  birthPrecision: 'year' | 'day';
  deathYear?: number;
  deathMonth?: number;
  deathDay?: number;
  deathPrecision?: 'year' | 'day';
  countryId: string;
  countryLabel: string;
  countryBasis: 'birthplace-modern-country';
  languageEditions: number;
  sourceUrl: string;
  wikidataUrl: string;
  sourcedOccupation?: string;
};
export const HISTORICAL_PEOPLE_SOURCE = 'Pantheon 2.0 Person Dataset (2025 release), CC BY-SA 4.0';
export const HISTORICAL_PEOPLE_SOURCE_URL = 'https://pantheon.world/data/datasets';
const imported = (peopleData as { people?: unknown }).people;
if (!Array.isArray(imported) || imported.length > 150000)
  throw new Error('Historical people pack exceeds its declared 150,000-record safety bound');
export const HISTORICAL_PEOPLE: readonly HistoricalPersonRecord[] = Object.freeze(
  (Array.isArray(imported) ? imported : [])
    .filter((x): x is HistoricalPersonRecord => {
      if (!x || typeof x !== 'object') return false;
      const p = x as Partial<HistoricalPersonRecord>;
      return (
        typeof p.qid === 'string' &&
        /^Q[1-9][0-9]{0,11}$/.test(p.qid) &&
        typeof p.name === 'string' &&
        p.name.length > 0 &&
        p.name.length <= 160 &&
        Number.isSafeInteger(p.birthYear) &&
        (p.birthMonth === undefined || Number.isSafeInteger(p.birthMonth)) &&
        (p.birthDay === undefined ||
          (Number.isInteger(p.birthDay) && p.birthDay >= 1 && p.birthDay <= 31)) &&
        ['year', 'day'].includes(p.birthPrecision ?? '') &&
        typeof p.countryId === 'string' &&
        /^[A-Z]{3}$/.test(p.countryId) &&
        typeof p.countryLabel === 'string' &&
        p.countryLabel.length <= 100 &&
        p.countryBasis === 'birthplace-modern-country' &&
        typeof p.languageEditions === 'number' &&
        Number.isSafeInteger(p.languageEditions) &&
        p.languageEditions >= 30 &&
        p.sourceUrl === HISTORICAL_PEOPLE_SOURCE_URL &&
        p.wikidataUrl === `https://www.wikidata.org/wiki/${p.qid}` &&
        (p.deathYear === undefined || Number.isSafeInteger(p.deathYear)) &&
        (p.deathMonth === undefined || Number.isSafeInteger(p.deathMonth)) &&
        (p.deathDay === undefined ||
          (Number.isInteger(p.deathDay) && p.deathDay >= 1 && p.deathDay <= 31))
      );
    })
    .sort(
      (a, b) =>
        a.birthYear - b.birthYear ||
        (a.birthMonth ?? -1) - (b.birthMonth ?? -1) ||
        a.qid.localeCompare(b.qid),
    ),
);
