import type { HistoricalEvent, Person, World } from '../contracts/index.js';

/**
 * Deterministic prose for one already-recorded life-year.
 *
 * This module is deliberately a *reader*: it does not emit events, mutate the
 * world, call a model or turn a projected branch into a fact. Every sentence is
 * derived from committed events plus the recorded person/place/relationship
 * state supplied by the caller. If a fact is not in those inputs, it is simply
 * not written.
 */

export type LifeProsePreviousChapter = {
  year?: number;
  age?: number;
  title?: string;
  kind?: string;
  text?: string;
  /** Optional historical snapshot fields. Prefer these over current state. */
  locationId?: string;
  occupation?: string;
  sourceIds?: string[];
};

export type LifeProseBeatHint = {
  beatId?: string;
  beatTitle?: string;
  branchId?: string;
  branchLabel?: string;
  age?: number;
  place?: string;
  applied?: string[];
  skipped?: string[];
};

export type ComposeLifeProseInput = {
  world: World;
  person: Person;
  /** Events belonging to one life-year. Events from other years are ignored. */
  events: readonly HistoricalEvent[];
  /** The previous chapter is optional context, never a source of new facts. */
  previousChapter?: LifeProsePreviousChapter;
  /** A trajectory projection hint. Committed event data still wins. */
  trajectoryBeat?: LifeProseBeatHint;
  /** Explicit year, useful only for empty event lists. */
  year?: number;
};

export type LifeProse = {
  version: 1;
  year: number;
  age: number;
  title: string;
  text: string;
  kind: string;
  significance: number;
  sourceEventIds: string[];
  /** Event-provided trajectory metadata, never printed as raw internal state. */
  beatId?: string;
  branchId?: string;
  branchLabel?: string;
  applied: string[];
  skipped: string[];
};

type Sentence = {
  text: string;
  sourceIds: string[];
  group: string;
  priority: number;
  essential?: boolean;
  internal?: boolean;
};

type Fact = {
  text: string;
  event: HistoricalEvent;
  group: string;
  priority: number;
};

const DEFAULT_START_YEAR = 1900;

const INTERNAL_KINDS = new Set([
  'identity_shift',
  'conviction_changed',
  'goal_transition',
  'agenda_adopted',
  'agenda_step_completed',
  'agenda_step_failed',
  'agenda_interrupted',
  'career_progress',
  'plan_failed',
  'research_saturated',
  'life_program_milestone',
]);

const BOOKKEEPING_KINDS = new Set([
  'birthday',
  'birth_registration',
  'life_record',
  'deliberation_context',
  'historical_person_activated',
]);

const FORBIDDEN = [
  /承担了更多职责/,
  /把一部分时间用在/,
  /一次尝试没有成功/,
  /修正判断/,
  /接受他人安排/,
  /练习[^。！？]{0,8}技能/,
  /(?:健康|压力|信任|好感|财富|金钱|体力|安全)\s*[=:：]?\s*\d/,
  /(?:health|stress|trust|wealth|coin)\s*[=:：]\s*\d/i,
];

const TITLE_LABEL: Record<string, string> = {
  birth: '出生',
  death: '离世',
  life_beat: '人生',
  life_program_milestone: '成长',
  migration: '远行',
  journey_started: '启程',
  arrival: '落脚',
  partnership: '相伴',
  friendship: '情谊',
  encounter: '相遇',
  society_encounter: '相遇',
  illness: '病中',
  illness_recovered: '康复',
  scarcity: '匮乏',
  war_started: '战火',
  historical_source: '时代',
  world_impact: '亲历时代',
  historical_contribution: '时代中的行动',
  ability_used: '异常',
  ability_exposed: '暴露',
  anomaly_witnessed: '目击',
  anomaly_investigation: '调查',
  rule_occurrence: '世变',
  director_action: '历史干预',
  job_lost: '失业',
  job_found: '谋生',
  education: '求学',
  career_progress: '营生',
  caregiving: '照料',
  conviction_changed: '转变',
  identity_shift: '转变',
  bereavement: '失去',
  family_loss: '失去',
  innovation: '新知',
  institution_founded: '共同事业',
  institution_dissolved: '散场',
  joined: '归属',
  agenda_adopted: '打算',
  agenda_step_completed: '日常',
  agenda_step_failed: '受挫',
  goal_transition: '新的方向',
  adulthood: '成年',
  family_support: '家计',
  agency_aid: '互助',
  election: '选举',
  reform: '改革',
  succession: '继任',
  movement_formed: '共同行动',
  movement_support_shift: '共同行动',
  historic_person_activated: '历史人物',
  life_record: '生活',
  quiet_life: '日常',
};

const FACT_GROUP: Record<string, string> = {
  birth: 'birth',
  death: 'loss',
  bereavement: 'loss',
  family_loss: 'loss',
  migration: 'move',
  journey_started: 'move',
  arrival: 'move',
  partnership: 'partner',
  friendship: 'friend',
  encounter: 'friend',
  society_encounter: 'friend',
  family_support: 'support',
  agency_aid: 'support',
  job_lost: 'work',
  job_found: 'work',
  education: 'learning',
  adulthood: 'adulthood',
  illness: 'health',
  illness_recovered: 'health',
  scarcity: 'scarcity',
  war_started: 'war',
  ability_used: 'anomaly',
  ability_exposed: 'anomaly',
  anomaly_witnessed: 'anomaly',
  anomaly_investigation: 'anomaly',
  rule_occurrence: 'world',
  director_action: 'world',
  historical_source: 'history',
  world_impact: 'history',
  historical_contribution: 'history',
  institution_founded: 'institution',
  institution_dissolved: 'institution',
  joined: 'institution',
  caregiving: 'care',
};

const FACT_PRIORITY: Record<string, number> = {
  death: 100,
  birth: 94,
  migration: 82,
  partnership: 78,
  bereavement: 76,
  family_loss: 74,
  war_started: 72,
  ability_exposed: 80,
  ability_used: 74,
  rule_occurrence: 76,
  director_action: 78,
  illness: 66,
  scarcity: 64,
  job_lost: 62,
  job_found: 60,
  education: 56,
  caregiving: 54,
  friendship: 54,
  family_support: 50,
  agency_aid: 50,
  encounter: 46,
  society_encounter: 44,
  institution_founded: 58,
  institution_dissolved: 50,
  joined: 46,
  historical_source: 60,
  world_impact: 58,
  historical_contribution: 56,
  journey_started: 60,
  arrival: 52,
  adulthood: 42,
  illness_recovered: 44,
};

function compareStrings(a: string, b: string) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function compareEvents(a: HistoricalEvent, b: HistoricalEvent) {
  return a.month - b.month || compareStrings(a.id, b.id);
}

function compareFacts(a: Fact, b: Fact) {
  return (
    a.event.month - b.event.month ||
    b.priority - a.priority ||
    compareStrings(a.event.id, b.event.id)
  );
}

function dataOf(event: HistoricalEvent): Record<string, unknown> {
  return event.data && typeof event.data === 'object' ? event.data : {};
}

function dataString(event: HistoricalEvent, key: string): string | undefined {
  const value = dataOf(event)[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function dataNumber(event: HistoricalEvent, key: string): number | undefined {
  const value = dataOf(event)[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function dataStrings(event: HistoricalEvent, key: string): string[] {
  const value = dataOf(event)[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.length > 0)
    : [];
}

function cleanText(value: string, max = 180): string {
  const text = value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const last = Math.max(cut.lastIndexOf('，'), cut.lastIndexOf('；'), cut.lastIndexOf('、'));
  return (last > 50 ? cut.slice(0, last) : cut).trim();
}

function asSentence(value: string, max = 180): string {
  const text = cleanText(value, max)
    .replace(/[。！？!?；;]+$/u, '')
    .trim();
  return text ? `${text}。` : '';
}

function splitSentences(value: string): string[] {
  return value
    .split(/[。！？!?]+/u)
    .map((part) => cleanText(part))
    .filter(Boolean);
}

function isForbidden(text: string): boolean {
  return FORBIDDEN.some((expression) => expression.test(text));
}

function hash32(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickVariant(seed: string, variants: string[]): string {
  return variants[hash32(seed) % variants.length]!;
}

function monthName(month: number): string {
  return `${(((month % 12) + 12) % 12) + 1}月`;
}

function ageAt(person: Person, month: number): number {
  return Math.max(0, Math.floor((month - person.birth) / 12));
}

function aliveAt(person: Person, month: number): boolean {
  return person.death === undefined || person.death > month;
}

function settlementName(world: World, id: string | undefined): string | undefined {
  if (!id) return undefined;
  const name = world.settlements.find((settlement) => settlement.id === id)?.name;
  return name?.trim() || undefined;
}

function personName(world: World, id: string | undefined): string | undefined {
  if (!id) return undefined;
  const name = world.persons.find((person) => person.id === id)?.name;
  return name?.trim() || undefined;
}

function otherNames(world: World, event: HistoricalEvent, person: Person): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const id of event.personIds) {
    if (id === person.id) continue;
    const name = personName(world, id);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }
  return names;
}

function ownDeathEvent(person: Person, event: HistoricalEvent): boolean {
  return (
    event.kind === 'death' &&
    (event.personIds[0] === person.id || dataString(event, 'personId') === person.id)
  );
}

function ownBirthEvent(person: Person, event: HistoricalEvent): boolean {
  if (event.kind !== 'birth') return false;
  if (dataString(event, 'childId') === person.id) return true;
  return dataString(event, 'childId') === undefined && event.month === person.birth;
}

function eventPlace(
  world: World,
  person: Person,
  event: HistoricalEvent,
  previous?: LifeProsePreviousChapter,
): string {
  const hinted = dataString(event, 'place');
  if (hinted) return cleanText(hinted, 40);
  return (
    settlementName(world, event.locationId) ??
    settlementName(world, dataString(event, 'to')) ??
    settlementName(world, dataString(event, 'targetId')) ??
    settlementName(world, previous?.locationId) ??
    settlementName(world, person.locationId) ??
    '当地'
  );
}

function openingPlace(
  world: World,
  person: Person,
  yearEvents: HistoricalEvent[],
  yearEnd: number,
  previous?: LifeProsePreviousChapter,
): string {
  const move = yearEvents.find((event) => event.kind === 'migration');
  if (move) {
    return (
      settlementName(world, dataString(move, 'from')) ??
      settlementName(world, move.locationId) ??
      settlementName(world, previous?.locationId) ??
      (yearEnd < world.month ? undefined : settlementName(world, person.locationId)) ??
      '当地'
    );
  }
  const located = yearEvents.find(
    (event) =>
      event.kind === 'birth' ||
      event.kind === 'death' ||
      event.kind === 'life_beat' ||
      event.kind === 'arrival',
  );
  return (
    (located ? settlementName(world, located.locationId) : undefined) ??
    settlementName(world, previous?.locationId) ??
    (yearEnd < world.month ? undefined : settlementName(world, person.locationId)) ??
    '当地'
  );
}

function extractBranchLabel(event: HistoricalEvent): string | undefined {
  const stored = dataString(event, 'branchLabel');
  if (stored) return cleanText(stored, 120);
  const match = /经历[「“]([^」”]+)[」”]\s*[：:]\s*([^。！？]+)/u.exec(event.text);
  return match?.[2] ? cleanText(match[2], 120) : undefined;
}

function beatTail(event: HistoricalEvent, applied: string[]): string | undefined {
  const parts = splitSentences(event.text).slice(1);
  if (!parts.length) return undefined;
  for (const part of parts) {
    if (isForbidden(part)) continue;
    const relevant =
      (applied.includes('occupation') && /为生|工作|活计|职业|营生/u.test(part)) ||
      (applied.includes('education') && /读书|上学|进修|教育|课程|识字/u.test(part)) ||
      ((applied.includes('health') || applied.includes('deathRisk')) &&
        /身体|病|伤|弱|健康|咳|疼/u.test(part)) ||
      (applied.includes('relationships') && /家|亲|友|关系|照看/u.test(part)) ||
      (applied.includes('wealth') && /钱|积蓄|收入|财|工钱/u.test(part));
    if (relevant) return part;
  }
  return undefined;
}

function providedSentence(event: HistoricalEvent): string | undefined {
  const part = splitSentences(event.text).find(
    (candidate) => candidate.length >= 4 && !isForbidden(candidate),
  );
  return part ? asSentence(part) : undefined;
}

function factForEvent(world: World, person: Person, event: HistoricalEvent): Fact | undefined {
  if (BOOKKEEPING_KINDS.has(event.kind) || INTERNAL_KINDS.has(event.kind)) return undefined;
  if (event.kind === 'quiet_life') return undefined;
  if (event.kind === 'life_beat') return undefined;

  const place = eventPlace(world, person, event);
  const others = otherNames(world, event, person);
  const other = others[0];
  const priority = FACT_PRIORITY[event.kind] ?? (event.significance >= 0.7 ? 40 : 0);
  const group = FACT_GROUP[event.kind] ?? event.kind;
  const make = (text: string | undefined): Fact | undefined =>
    text ? { text: asSentence(text), event, group, priority } : undefined;

  switch (event.kind) {
    case 'birth': {
      if (ownBirthEvent(person, event)) {
        const parentIds = [
          ...dataStrings(event, 'parentIds'),
          ...(Array.isArray(dataOf(event).parentIds) ? [] : person.parents),
        ];
        const parents = [...new Set(parentIds)]
          .filter((id) => id !== person.id)
          .map((id) => personName(world, id))
          .filter((name): name is string => !!name)
          .slice(0, 2);
        const family = parents.length ? `，家里有${parents.join('和')}` : '';
        return make(`${monthName(event.month)}，${person.name}出生在${place}${family}`);
      }
      const childId = dataString(event, 'childId');
      const child = personName(world, childId);
      if (!child) return undefined;
      const coParent = others.find((name) => name !== child);
      return make(
        coParent
          ? `${person.name}与${coParent}迎来了孩子${child}`
          : `${person.name}家里添了孩子${child}`,
      );
    }
    case 'death': {
      if (ownDeathEvent(person, event)) {
        const age = dataNumber(event, 'age') ?? ageAt(person, event.month);
        const reason = dataString(event, 'reason') ?? person.deathCause;
        return make(
          reason
            ? `${monthName(event.month)}，${person.name}在${place}去世，终年${age}岁，死因是${cleanText(reason, 40)}`
            : `${monthName(event.month)}，${person.name}在${place}去世，终年${age}岁`,
        );
      }
      if (!other) return undefined;
      const reason = dataString(event, 'reason');
      return make(
        reason
          ? `${monthName(event.month)}，${other}去世，死因是${cleanText(reason, 40)}`
          : `${monthName(event.month)}，${other}去世`,
      );
    }
    case 'bereavement':
    case 'family_loss': {
      if (!other) return undefined;
      return make(`失去${other}以后，${person.name}往后的安排被迫改动`);
    }
    case 'migration': {
      const from = settlementName(world, dataString(event, 'from'));
      const to =
        settlementName(world, dataString(event, 'to')) ?? settlementName(world, event.locationId);
      if (!to) return undefined;
      return make(from ? `${person.name}离开${from}，迁往${to}` : `${person.name}迁往${to}`);
    }
    case 'journey_started': {
      const to =
        settlementName(world, dataString(event, 'targetId')) ??
        settlementName(world, dataString(event, 'to'));
      return to ? make(`${person.name}准备启程前往${to}`) : undefined;
    }
    case 'arrival':
      return make(`${person.name}在${place}落脚`);
    case 'partnership':
      return other ? make(`${person.name}与${other}决定共同生活`) : undefined;
    case 'friendship':
      return other ? make(`长久的来往让${person.name}与${other}成了朋友`) : undefined;
    case 'encounter':
    case 'society_encounter':
      return other && ageAt(person, event.month) >= 13
        ? make(`${person.name}在${place}认识了${other}`)
        : undefined;
    case 'family_support':
    case 'agency_aid': {
      if (!other) return undefined;
      const giver = event.personIds[0] === person.id;
      return make(
        giver ? `${person.name}向${other}提供了生活上的接济` : `${other}接济了${person.name}的生活`,
      );
    }
    case 'scarcity': {
      const scarcity = dataNumber(event, 'scarcity');
      if (scarcity !== undefined && scarcity > 0.4)
        return make(`${place}的粮食供应很紧，饭桌先感受到了短缺`);
      if (scarcity !== undefined && scarcity > 0.15)
        return make(`${place}的粮食不足，日常开销变得更难安排`);
      return make(`${place}的收成和粮价都让人发愁`);
    }
    case 'illness': {
      const condition = /呼吸道|肺炎|结核|伤寒|霍乱|流感|麻疹|白喉/u.exec(event.text)?.[0];
      return make(
        condition
          ? `${person.name}染上${condition}，日常的活计被打断`
          : `${person.name}病了一场，日常的活计被打断`,
      );
    }
    case 'illness_recovered':
      return make(`${person.name}的病情缓下来，重新安排日常生活`);
    case 'job_lost': {
      const occupation = dataString(event, 'occupation');
      return make(
        occupation
          ? `${person.name}失去了${cleanText(occupation, 24)}的收入`
          : `${person.name}失去了原来的工作`,
      );
    }
    case 'job_found': {
      const role = dataString(event, 'role');
      return make(
        role
          ? `${person.name}重新找到${cleanText(role, 24)}的工作`
          : `${person.name}重新找到了工作`,
      );
    }
    case 'education':
      return make(providedSentence(event));
    case 'caregiving':
      return other ? make(`${person.name}抽出时间和生活费照顾${other}`) : undefined;
    case 'war_started':
      return make(providedSentence(event));
    case 'institution_founded':
    case 'institution_dissolved':
    case 'joined':
      return make(providedSentence(event));
    case 'ability_used':
    case 'ability_exposed':
    case 'anomaly_witnessed':
    case 'anomaly_investigation':
      return make(providedSentence(event));
    case 'rule_occurrence':
    case 'director_action':
      return make(providedSentence(event));
    case 'historical_source':
    case 'world_impact':
    case 'historical_contribution':
      return make(providedSentence(event));
    case 'adulthood':
      return make(providedSentence(event));
    default:
      return priority > 0 ? make(providedSentence(event)) : undefined;
  }
}

function selectFacts(facts: Fact[], limit: number): Fact[] {
  const chosen: Fact[] = [];
  const groups = new Set<string>();
  for (const fact of [...facts].sort(
    (a, b) =>
      b.priority - a.priority ||
      a.event.month - b.event.month ||
      compareStrings(a.event.id, b.event.id),
  )) {
    if (chosen.length >= limit) break;
    if (groups.has(fact.group)) continue;
    groups.add(fact.group);
    chosen.push(fact);
  }
  return chosen.sort(compareFacts);
}

function beatSentences(
  world: World,
  person: Person,
  event: HistoricalEvent,
  year: number,
  place: string,
  deathKnown: boolean,
  hint?: LifeProseBeatHint,
): Sentence[] {
  const title =
    dataString(event, 'beatTitle') ??
    dataString(event, 'title') ??
    hint?.beatTitle ??
    event.text.match(/「([^」]+)」/u)?.[1] ??
    '一次人生经历';
  const age = dataNumber(event, 'age') ?? hint?.age ?? ageAt(person, event.month);
  const branch =
    extractBranchLabel(event) ?? (hint?.branchLabel ? cleanText(hint.branchLabel, 120) : undefined);
  const outcome = dataString(event, 'outcome');
  const applied = dataStrings(event, 'applied');
  const effectiveApplied = applied.length ? applied : (hint?.applied ?? []);
  const sentences: Sentence[] = [];

  const scene = pickVariant(`${world.id}:${person.id}:${event.id}:beat`, [
    `${year}年${monthName(event.month)}，${age}岁的${person.name}在${place}遇上「${title}」。`,
    `${year}年${monthName(event.month)}，${place}的${person.name}只有${age}岁，却撞上了「${title}」。`,
    `${year}年${monthName(event.month)}，${place}，${age}岁的${person.name}没有躲开「${title}」。`,
  ]);
  sentences.push({
    text: asSentence(scene),
    sourceIds: [event.id],
    group: 'beat',
    priority: 100,
    essential: true,
  });

  const deathInBranch =
    outcome === 'death' || /夭折|死亡|死去|丧生|去世|离世|死在/u.test(branch ?? '');
  if (branch) {
    if (deathInBranch && deathKnown) {
      // The committed death record below will state the death once. The branch
      // label is retained as metadata, not repeated as a second death.
    } else if (deathInBranch) {
      sentences.push({
        text: asSentence(`记录里写的是最坏的一支；那一关过去时，${person.name}还活着`),
        sourceIds: [event.id],
        group: 'beat',
        priority: 98,
        essential: true,
      });
    } else {
      sentences.push({
        text: asSentence(branch),
        sourceIds: [event.id],
        group: 'beat',
        priority: 98,
        essential: true,
      });
    }
  }

  const tail = beatTail(event, effectiveApplied);
  if (tail) {
    sentences.push({
      text: asSentence(tail),
      sourceIds: [event.id],
      group: 'beat',
      priority: 90,
    });
  }
  return sentences;
}

function openingSentence(
  world: World,
  person: Person,
  year: number,
  place: string,
  age: number,
): Sentence {
  const text = pickVariant(`${world.id}:${person.id}:${year}:opening`, [
    `${year}年，${age}岁的${person.name}在${place}。`,
    `${year}年，${person.name}${age}岁，住在${place}。`,
    `${place}，${year}年；${person.name}这一年${age}岁。`,
  ]);
  return {
    text: asSentence(text),
    sourceIds: [],
    group: 'opening',
    priority: 100,
    essential: true,
  };
}

function relationshipSentence(world: World, person: Person, yearEnd: number): Sentence | undefined {
  // Relation *kind* is current state and may have changed after this year, so
  // the quiet prose names the recorded people without asserting a later role.
  const entries: string[] = [];
  const seen = new Set<string>();
  for (const relation of [...person.relationships].sort((a, b) =>
    compareStrings(a.personId, b.personId),
  )) {
    if (!['partner', 'kin', 'friend'].includes(relation.kind)) continue;
    if (relation.since > yearEnd) continue;
    const target = world.persons.find((candidate) => candidate.id === relation.personId);
    if (!target || !target.name || target.id === person.id) continue;
    if (target.death !== undefined && target.death <= yearEnd) continue;
    if (seen.has(target.name)) continue;
    seen.add(target.name);
    entries.push(target.name);
    if (entries.length >= 2) break;
  }
  if (!entries.length) return undefined;
  return {
    text: asSentence(`${person.name}身边有${entries.join('、')}`),
    sourceIds: [],
    group: 'quiet-relations',
    priority: 20,
  };
}

function quietOccupation(
  world: World,
  person: Person,
  yearEvents: HistoricalEvent[],
  previous: LifeProsePreviousChapter | undefined,
  yearEnd: number,
): { occupation?: string; sourceId?: string } {
  for (const event of [...yearEvents].sort(compareEvents).reverse()) {
    if (event.kind === 'quiet_life') {
      const occupation = dataString(event, 'occupation');
      if (occupation) return { occupation, sourceId: event.id };
    }
    if (event.kind === 'job_found') {
      const role = dataString(event, 'role');
      if (role) return { occupation: role, sourceId: event.id };
    }
    if (event.kind === 'job_lost') {
      const occupation = dataString(event, 'occupation');
      if (occupation) return { occupation, sourceId: event.id };
    }
  }
  if (previous?.occupation) return { occupation: previous.occupation };
  // The live Person object is a snapshot *after* earlier years. Do not copy its
  // occupation backwards into a year that has already passed without an event
  // or a caller-supplied historical chapter.
  if (yearEnd < world.month) return {};
  const role = person.life?.career.role || person.occupation;
  return role ? { occupation: role } : {};
}

function quietSentences(
  world: World,
  person: Person,
  yearEvents: HistoricalEvent[],
  yearEnd: number,
  age: number,
  previous: LifeProsePreviousChapter | undefined,
  hasWorldPressure: boolean,
): Sentence[] {
  const sentences: Sentence[] = [];
  const alive = aliveAt(person, yearEnd);
  const { occupation, sourceId } = quietOccupation(world, person, yearEvents, previous, yearEnd);
  const usefulOccupation =
    occupation && !/^(无|none|null|孩童|受抚养者|无业)$/iu.test(occupation.trim()) && alive;

  if (usefulOccupation) {
    const text =
      age < 18
        ? `${person.name}的身份是${cleanText(occupation, 24)}`
        : `${person.name}仍以${cleanText(occupation, 24)}为生`;
    sentences.push({
      text: asSentence(text),
      sourceIds: sourceId ? [sourceId] : [],
      group: 'quiet-work',
      priority: 24,
    });
  } else if (age < 6) {
    sentences.push({
      text: asSentence(`${person.name}还需要人照看`),
      sourceIds: [],
      group: 'quiet-age',
      priority: 22,
    });
  }

  const relations = relationshipSentence(world, person, yearEnd);
  if (relations) sentences.push(relations);

  if (!hasWorldPressure) {
    sentences.push({
      text: asSentence('这一年的记录里没有饥荒、战事或疫病'),
      sourceIds: [],
      group: 'quiet-environment',
      priority: 18,
    });
  }

  if (!sentences.length) {
    sentences.push({
      text: asSentence(`${person.name}${age}岁，这一年的记录很少`),
      sourceIds: [],
      group: 'quiet-fallback',
      priority: 16,
    });
  }
  return sentences.slice(0, 2);
}

function internalAftereffect(
  world: World,
  person: Person,
  event: HistoricalEvent,
): Sentence | undefined {
  if (event.kind === 'identity_shift') {
    const raw = dataOf(event).changes;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
    const changes = Object.entries(raw as Record<string, unknown>)
      .filter((entry): entry is [string, number] => typeof entry[1] === 'number' && entry[1] !== 0)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]) || compareStrings(a[0], b[0]));
    const strongest = changes[0];
    if (!strongest) return undefined;
    const [axis, delta] = strongest;
    const consequences: Record<string, { up: string; down: string }> = {
      autonomy: {
        up: `此后${person.name}更愿意自己拿主意`,
        down: `此后${person.name}做决定时更谨慎，很少再把话说死`,
      },
      ambition: {
        up: `此后${person.name}更愿意争一争自己的处境`,
        down: `此后${person.name}很少再谈改变自己的处境`,
      },
      care: {
        up: `此后${person.name}对家里人的难处看得更重`,
        down: `此后${person.name}把心肠收紧了一些`,
      },
      solidarity: {
        up: `此后有人开口求助时，${person.name}更少推辞`,
        down: `此后${person.name}对共同行动的承诺更谨慎`,
      },
      tradition: {
        up: `此后${person.name}重新守起一些旧规矩`,
        down: `此后一些旧规矩在${person.name}那里松动了`,
      },
      pluralism: {
        up: `此后${person.name}更愿意听一听不同的说法`,
        down: `此后${person.name}对陌生的说法更警惕`,
      },
      institutionalTrust: {
        up: `此后${person.name}对官面和机构的承诺多信了一分`,
        down: `此后${person.name}对官面和机构的承诺多了一层戒心`,
      },
    };
    const consequence = consequences[axis]?.[delta > 0 ? 'up' : 'down'];
    if (!consequence) return undefined;
    return {
      text: asSentence(consequence),
      sourceIds: [event.id],
      group: 'internal',
      priority: 10,
      internal: true,
    };
  }
  if (event.kind === 'conviction_changed') {
    const text = /安稳|生存/u.test(event.text)
      ? `此后，${person.name}把安稳的生计排在了旧打算前面`
      : `此后，${person.name}不再把旧打算放在最前面`;
    return {
      text: asSentence(text),
      sourceIds: [event.id],
      group: 'internal',
      priority: 10,
      internal: true,
    };
  }
  return undefined;
}

function fallbackSentence(year: number, person: Person, place: string): Sentence {
  return {
    text: asSentence(`${year}年，${place}，${person.name}这一年的记录很少`),
    sourceIds: [],
    group: 'fallback',
    priority: 5,
  };
}

function trimAndFinish(
  sentences: Sentence[],
  year: number,
  person: Person,
  place: string,
): Sentence[] {
  const seen = new Set<string>();
  let list = sentences.filter((sentence) => {
    if (!sentence.text || isForbidden(sentence.text)) return false;
    if (seen.has(sentence.text)) return false;
    seen.add(sentence.text);
    return true;
  });

  while (list.length > 5) {
    const internalIndex = list.findIndex((sentence) => sentence.internal);
    if (internalIndex >= 0) {
      list = list.filter((_, index) => index !== internalIndex);
      continue;
    }
    const optionalIndex = list.findIndex((sentence) => !sentence.essential);
    if (optionalIndex >= 0) {
      list = list.filter((_, index) => index !== optionalIndex);
      continue;
    }
    list = list.slice(0, 5);
  }

  if (list.length < 2) {
    if (!list.some((sentence) => sentence.group === 'opening')) {
      list.unshift({
        text: asSentence(`${year}年，${place}，${person.name}`),
        sourceIds: [],
        group: 'opening',
        priority: 100,
      });
    }
    if (list.length < 2) list.push(fallbackSentence(year, person, place));
  }
  return list;
}

function chooseYearIndex(
  world: World,
  input: ComposeLifeProseInput,
  events: HistoricalEvent[],
): number {
  if (typeof input.year === 'number' && Number.isFinite(input.year)) {
    return Math.floor(input.year - (world.calendar?.startYear ?? DEFAULT_START_YEAR));
  }
  if (events.length) {
    const primary = [...events].sort(
      (a, b) => b.significance - a.significance || a.month - b.month || compareStrings(a.id, b.id),
    )[0]!;
    return Math.floor(primary.month / 12);
  }
  return Math.floor(world.month / 12);
}

export function composeLifeProse(input: ComposeLifeProseInput): LifeProse;
export function composeLifeProse(
  world: World,
  person: Person,
  events: readonly HistoricalEvent[],
  options?: Omit<ComposeLifeProseInput, 'world' | 'person' | 'events'>,
): LifeProse;
export function composeLifeProse(
  inputOrWorld: ComposeLifeProseInput | World,
  personArg?: Person,
  eventsArg?: readonly HistoricalEvent[],
  optionsArg?: Omit<ComposeLifeProseInput, 'world' | 'person' | 'events'>,
): LifeProse {
  const input: ComposeLifeProseInput =
    'person' in inputOrWorld && 'events' in inputOrWorld
      ? inputOrWorld
      : {
          world: inputOrWorld,
          person: personArg!,
          events: eventsArg ?? [],
          ...optionsArg,
        };
  const { world, person } = input;
  const allEvents = [...(input.events ?? [])].filter(Boolean).sort(compareEvents);

  const startYear = world.calendar?.startYear ?? DEFAULT_START_YEAR;
  const yearIndex = chooseYearIndex(world, input, allEvents);
  const year = startYear + yearIndex;
  const yearEnd = yearIndex * 12 + 11;
  const inYear = allEvents.filter((event) => Math.floor(event.month / 12) === yearIndex);
  const yearEvents = typeof input.year === 'number' ? inYear : inYear.length ? inYear : allEvents;

  const deathEvent = yearEvents.find((event) => ownDeathEvent(person, event));
  const deathKnown = !!deathEvent || (person.death !== undefined && person.death <= yearEnd);
  const endMonth = person.death !== undefined && person.death <= yearEnd ? person.death : yearEnd;
  const age = ageAt(person, endMonth);
  const place = openingPlace(world, person, yearEvents, yearEnd, input.previousChapter);

  const beatEvent = yearEvents
    .filter((event) => event.kind === 'life_beat')
    .sort(
      (a, b) => b.significance - a.significance || a.month - b.month || compareStrings(a.id, b.id),
    )[0];
  const beatTitle = beatEvent
    ? (dataString(beatEvent, 'beatTitle') ??
      dataString(beatEvent, 'title') ??
      input.trajectoryBeat?.beatTitle ??
      beatEvent.text.match(/「([^」]+)」/u)?.[1] ??
      '人生')
    : undefined;
  const eventApplied = beatEvent ? dataStrings(beatEvent, 'applied') : [];
  const eventSkipped = beatEvent ? dataStrings(beatEvent, 'skipped') : [];
  const applied = eventApplied.length ? eventApplied : (input.trajectoryBeat?.applied ?? []);
  const skipped = eventSkipped.length ? eventSkipped : (input.trajectoryBeat?.skipped ?? []);

  const facts = yearEvents
    .map((event) => factForEvent(world, person, event))
    .filter((fact): fact is Fact => !!fact);
  const selectedFacts = selectFacts(facts, beatEvent ? 2 : 3);
  const primaryFact = [...selectedFacts].sort(
    (a, b) =>
      b.priority - a.priority ||
      a.event.month - b.event.month ||
      compareStrings(a.event.id, b.event.id),
  )[0];

  const sentences: Sentence[] = [];
  let mainKind = 'quiet_life';
  let mainTitle = '日常';

  if (beatEvent) {
    const beatPlace = cleanText(
      dataString(beatEvent, 'place')?.trim() ||
        input.trajectoryBeat?.place?.trim() ||
        eventPlace(world, person, beatEvent, input.previousChapter),
      40,
    );
    sentences.push(
      ...beatSentences(world, person, beatEvent, year, beatPlace, deathKnown, input.trajectoryBeat),
    );
    mainKind = 'life_beat';
    mainTitle = cleanText(beatTitle ?? '人生', 30);
  } else {
    sentences.push(openingSentence(world, person, year, place, age));
    if (primaryFact) {
      mainKind = primaryFact.event.kind;
      mainTitle =
        TITLE_LABEL[primaryFact.event.kind] ??
        (primaryFact.event.significance >= 0.7 ? '生活' : '日常');
    }
  }

  for (const fact of selectedFacts) {
    const isDeath = ownDeathEvent(person, fact.event);
    sentences.push({
      text: fact.text,
      sourceIds: [fact.event.id],
      group: fact.group,
      priority: fact.priority,
      essential: isDeath || fact.event.kind === 'birth',
    });
  }

  const hasWorldPressure =
    facts.some((fact) => ['scarcity', 'war', 'health'].includes(fact.group)) ||
    (beatEvent
      ? dataStrings(beatEvent, 'tags').some((tag) =>
          ['war', 'famine', 'epidemic', 'health', 'disaster'].includes(tag),
        )
      : false);

  if (sentences.length < 2) {
    sentences.push(
      ...quietSentences(
        world,
        person,
        yearEvents,
        yearEnd,
        age,
        input.previousChapter,
        hasWorldPressure,
      ),
    );
  }

  if (!deathKnown && sentences.length < 5) {
    const internal = yearEvents
      .filter((event) => event.kind === 'identity_shift' || event.kind === 'conviction_changed')
      .sort(
        (a, b) =>
          b.significance - a.significance || a.month - b.month || compareStrings(a.id, b.id),
      )
      .map((event) => internalAftereffect(world, person, event))
      .find((sentence): sentence is Sentence => !!sentence);
    if (internal) sentences.push(internal);
  }

  const finished = trimAndFinish(sentences, year, person, place);
  const sourceEventIds = [...new Set(finished.flatMap((sentence) => sentence.sourceIds))].sort(
    (a, b) => {
      const left = allEvents.find((event) => event.id === a);
      const right = allEvents.find((event) => event.id === b);
      if (left && right) return compareEvents(left, right);
      return compareStrings(a, b);
    },
  );
  const sourceEvents = sourceEventIds
    .map((id) => allEvents.find((event) => event.id === id))
    .filter((event): event is HistoricalEvent => !!event);
  const significance = sourceEvents.length
    ? Math.max(...sourceEvents.map((event) => event.significance))
    : 0.2;

  return {
    version: 1,
    year,
    age: beatEvent
      ? (dataNumber(beatEvent, 'age') ??
        input.trajectoryBeat?.age ??
        ageAt(person, beatEvent.month))
      : age,
    title: `${year} · ${mainTitle}`,
    text: finished.map((sentence) => sentence.text).join(''),
    kind: mainKind,
    significance,
    sourceEventIds,
    ...(beatEvent
      ? {
          beatId:
            dataString(beatEvent, 'beatId') ??
            dataString(beatEvent, 'trajectoryBeatId') ??
            input.trajectoryBeat?.beatId,
          branchId: dataString(beatEvent, 'branchId') ?? input.trajectoryBeat?.branchId,
          // A death-shaped branch is only a hazard unless a death was actually
          // recorded. Do not leak the projected death label as a second fact.
          branchLabel:
            dataString(beatEvent, 'outcome') === 'death' && !deathKnown
              ? undefined
              : (extractBranchLabel(beatEvent) ??
                (input.trajectoryBeat?.branchLabel
                  ? cleanText(input.trajectoryBeat.branchLabel, 120)
                  : undefined)),
        }
      : {}),
    applied,
    skipped,
  };
}
