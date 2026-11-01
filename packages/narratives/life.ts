import type { HistoricalEvent, Person, World } from '../contracts/index.js';

export type LifeChapter = {
  id: string;
  year: number;
  fromMonth: number;
  toMonth: number;
  age: number;
  title: string;
  text: string;
  kind: string;
  significance: number;
  sourceIds: string[];
  sources: {
    id: string;
    month: number;
    kind: string;
    text: string;
    significance: number;
  }[];
};

type Beat = {
  event: HistoricalEvent;
  group: string;
  priority: number;
  text: string;
  sourceIds: string[];
};

const label: Record<string, string> = {
  birth: '出生',
  birth_registration: '出生登记',
  life_program_milestone: '成长',
  life_beat: '人生',
  death: '离世',
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

const groupByKind: Record<string, string> = {
  birth: 'birth',
  death: 'death',
  bereavement: 'loss',
  family_loss: 'loss',
  migration: 'move',
  journey_started: 'move',
  arrival: 'move',
  partnership: 'bond',
  friendship: 'bond',
  encounter: 'encounter',
  society_encounter: 'encounter',
  family_support: 'support',
  agency_aid: 'support',
  job_lost: 'work',
  job_found: 'work',
  career_progress: 'work',
  education: 'learning',
  life_program_milestone: 'learning',
  life_beat: 'trajectory',
  adulthood: 'learning',
  illness: 'health',
  illness_recovered: 'health',
  ability_used: 'anomaly',
  ability_exposed: 'anomaly',
  anomaly_witnessed: 'anomaly',
  anomaly_investigation: 'anomaly',
  rule_occurrence: 'world',
  director_action: 'world',
  historical_source: 'world',
  world_impact: 'world',
  historical_contribution: 'world',
  war_started: 'world',
  scarcity: 'world',
  institution_founded: 'institution',
  institution_dissolved: 'institution',
  joined: 'institution',
  conviction_changed: 'belief',
  identity_shift: 'belief',
  goal_transition: 'belief',
  agenda_adopted: 'intent',
  agenda_step_completed: 'intent',
  agenda_step_failed: 'intent',
};

const priorityByKind: Record<string, number> = {
  death: 100,
  birth: 100,
  life_program_milestone: 58,
  life_beat: 66,
  ability_exposed: 96,
  director_action: 92,
  rule_occurrence: 90,
  war_started: 88,
  partnership: 84,
  bereavement: 82,
  family_loss: 78,
  ability_used: 76,
  migration: 74,
  historical_source: 68,
  world_impact: 66,
  historical_contribution: 64,
  scarcity: 62,
  illness: 58,
  job_lost: 56,
  education: 54,
  career_progress: 50,
  job_found: 48,
  conviction_changed: 46,
  identity_shift: 44,
  goal_transition: 42,
  institution_founded: 46,
  institution_dissolved: 44,
  joined: 38,
  friendship: 52,
  arrival: 40,
  journey_started: 38,
  caregiving: 42,
  renewal: 40,
  adulthood: 34,
  agency_aid: 32,
  family_support: 30,
  encounter: 26,
  society_encounter: 22,
  agenda_step_completed: 12,
  agenda_step_failed: 18,
  agenda_adopted: 20,
};

function dataString(event: HistoricalEvent, key: string) {
  const value = event.data?.[key];
  return typeof value === 'string' ? value : undefined;
}

function dataNumber(event: HistoricalEvent, key: string) {
  const value = event.data?.[key];
  return typeof value === 'number' ? value : undefined;
}

function roleOf(event: HistoricalEvent, role: string) {
  const roles = event.data?.roles;
  if (!roles || typeof roles !== 'object') return undefined;
  const value = (roles as Record<string, unknown>)[role];
  return typeof value === 'string' ? value : undefined;
}

function nameOf(world: World, id: string | undefined) {
  return id ? world.persons.find((person) => person.id === id)?.name : undefined;
}

function placeName(world: World, id: string | undefined) {
  return id ? world.settlements.find((settlement) => settlement.id === id)?.name : undefined;
}

function ageAt(person: Person, month: number) {
  return Math.max(0, Math.floor((month - person.birth) / 12));
}

function monthName(month: number) {
  return `${(month % 12) + 1}月`;
}

function ensureSentence(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  return /[。！？.!?]$/.test(clean) ? clean : `${clean}。`;
}

function otherNames(world: World, event: HistoricalEvent, person: Person) {
  return event.personIds
    .filter((id) => id !== person.id)
    .map((id) => nameOf(world, id))
    .filter((name): name is string => !!name);
}

/** The birth event can also include the parents and must not be mistaken for the parent's own birth. */
function ownBirth(person: Person, event: HistoricalEvent) {
  return (
    event.kind === 'birth' &&
    (dataString(event, 'childId') === person.id ||
      (event.personIds.includes(person.id) && event.month === person.birth))
  );
}

/** The simulator writes the deceased person as personIds[0] on a death event. */
function ownDeath(person: Person, event: HistoricalEvent) {
  return event.kind === 'death' && event.personIds[0] === person.id;
}

function isRecurringBookkeeping(event: HistoricalEvent) {
  return (
    event.kind === 'birthday' ||
    event.kind === 'quiet_life' ||
    event.kind === 'life_record' ||
    event.kind === 'deliberation_context' ||
    event.kind === 'birth_registration' ||
    event.kind === 'historical_person_activated'
  );
}

function describeEvent(world: World, person: Person, event: HistoricalEvent): string | undefined {
  if (isRecurringBookkeeping(event)) return undefined;
  if (event.kind === 'death' && !ownDeath(person, event)) return undefined;
  if (event.kind === 'birth') return undefined;

  const other = otherNames(world, event, person).slice(0, 2);
  switch (event.kind) {
    case 'death': {
      const reason = dataString(event, 'reason') ?? '时代与身体共同造成的结局';
      const age = dataNumber(event, 'age') ?? ageAt(person, event.month);
      return `${monthName(event.month)}去世，终年${age}岁。死因是${reason}。`;
    }
    case 'bereavement':
    case 'family_loss': {
      const deceased = nameOf(world, roleOf(event, 'deceased')) ?? other[0];
      return deceased
        ? `失去${deceased}，这件事迫使${person.name}重新安排往后的生活。`
        : '失去了一位重要的人，往后的生活被迫重新安排。';
    }
    case 'migration': {
      const from = placeName(world, dataString(event, 'from'));
      const to = placeName(world, dataString(event, 'to')) ?? placeName(world, event.locationId);
      if (from && to) return `离开${from}，迁往${to}；旧关系被路程重新计算。`;
      if (to) return `迁往${to}，生活从新的住处重新开始。`;
      return '离开旧居，迁往另一个地方重新安顿。';
    }
    case 'journey_started':
      return other.length
        ? `与${other.join('、')}一起启程，离开熟悉的地方。`
        : '启程离开熟悉的地方，去往下一处落脚地。';
    case 'arrival':
      return `在${placeName(world, event.locationId) ?? '新的地方'}落下脚。`;
    case 'partnership':
      return other.length
        ? `与${other[0]}决定共同生活，家庭成为此后许多选择的中心。`
        : '决定与另一个人共同生活。';
    case 'friendship':
      return other.length ? `与${other[0]}的来往变成了真正的友谊。` : '一段关系变得牢固。';
    case 'encounter':
    case 'society_encounter':
      return other.length
        ? `在${placeName(world, event.locationId) ?? '当地'}认识了${other[0]}。`
        : undefined;
    case 'family_support':
    case 'agency_aid': {
      const giver = roleOf(event, 'giver') ?? roleOf(event, 'caregiver');
      const recipient = roleOf(event, 'recipient') ?? roleOf(event, 'dependent');
      if (giver === person.id) {
        const target = nameOf(world, recipient) ?? other[0];
        return target ? `向${target}提供了生活上的帮助。` : undefined;
      }
      if (recipient === person.id) {
        const source = nameOf(world, giver) ?? other[0];
        return source ? `${source}接济了${person.name}的生活。` : undefined;
      }
      if (!other.length) break;
      return event.personIds[0] === person.id
        ? `向${other.join('、')}提供了生活上的帮助。`
        : `${other.join('、')}接济了${person.name}的生活。`;
    }
    case 'scarcity': {
      const scarcity = dataNumber(event, 'scarcity');
      return scarcity !== undefined && scarcity > 0.4
        ? '城里粮食明显短缺，家里的饭桌先感受到了时代。'
        : '当地供应紧张，日常开销变得更难安排。';
    }
    case 'illness':
      return '疾病打断了工作和日常，身体第一次成为生活的中心。';
    case 'illness_recovered':
      return '病情慢慢好转，但虚弱和花费还留在家里。';
    case 'job_lost':
      return `岗位缩减，暂时失去了${dataString(event, 'occupation') ?? '原有'}的收入。`;
    case 'job_found':
      return `通过求职重新获得了${dataString(event, 'role') ?? '一份'}工作。`;
    case 'education':
    case 'career_progress':
      return event.text;
    case 'life_beat': {
      const title =
        dataString(event, 'beatTitle') ?? /经历「(.+?)」/.exec(event.text)?.[1] ?? '人生经历';
      const body = event.text.includes('：')
        ? event.text.split('：').slice(1).join('：')
        : event.text;
      const immediate = body.split(/[，,；;。]/)[0]?.trim();
      return immediate ? `经历「${title}」：${immediate}。` : event.text;
    }
    case 'caregiving': {
      const caregiver = roleOf(event, 'caregiver');
      const recipient = roleOf(event, 'recipient');
      if (caregiver === person.id) {
        const target = nameOf(world, recipient) ?? other[0];
        return target ? `开始照料${target}，时间被切成更小的片段。` : undefined;
      }
      if (recipient === person.id) {
        const source = nameOf(world, caregiver) ?? other[0];
        return source ? `${source}开始照料${person.name}，生活的节奏被迫改变。` : undefined;
      }
      return other.length
        ? `${other[0]}开始照料${person.name}，生活的节奏被迫改变。`
        : '有人开始照料这个家里最虚弱的人。';
    }
    case 'conviction_changed':
    case 'identity_shift':
      return event.text;
    case 'goal_transition':
      return event.text;
    case 'social_mobility': {
      const rank: Record<string, string> = {
        destitute: '赤贫',
        working: '劳作',
        skilled: '熟练',
        professional: '专业',
        elite: '上层',
      };
      const before = rank[dataString(event, 'before') ?? ''] ?? dataString(event, 'before');
      const after = rank[dataString(event, 'after') ?? ''] ?? dataString(event, 'after');
      if (before && after) return `家庭境况的变化使社会位置从${before}移向${after}。`;
      return event.text;
    }
    case 'ability_used':
      return '使用了一次不该被常人拥有的能力；它有效，也留下了代价。';
    case 'ability_exposed':
      return '异常能力被真实证人看见，秘密开始有了社会重量。';
    case 'anomaly_investigation':
      return '组织开始调查发生在身边的异常，能力不再只是个人的秘密。';
    case 'anomaly_witnessed':
      return '亲眼看见了无法用日常经验解释的事。';
    case 'rule_occurrence':
      return event.text;
    case 'director_action': {
      const rationale = dataString(event, 'rationale');
      return rationale ? `历史的方向被一次干预推动：${rationale}` : '历史的方向被一次干预推动。';
    }
    case 'war_started':
      return '战争爆发，城里的年轻人和物资都被卷入更大的冲突。';
    case 'historical_source':
    case 'world_impact':
    case 'historical_contribution':
      return event.text;
    case 'institution_founded':
    case 'institution_dissolved':
    case 'joined':
      return event.text;
    case 'life_program_milestone': {
      const milestone = dataString(event, 'milestone');
      if (milestone?.startsWith('education'))
        return '到了该读书识字的年纪，家里开始为学费和照护安排发愁。';
      if (milestone?.startsWith('apprenticeship')) return '开始跟着成年人学一门能糊口的手艺。';
      if (milestone?.startsWith('adult')) return '成年后，童年的设想第一次要面对真实的生计。';
      return '成长进入新的阶段。';
    }
    case 'agenda_adopted': {
      const intention = dataString(event, 'intention');
      if (!intention) return undefined;
      return `这一年的力气有一部分放在「${intention}」上。`;
    }
    case 'agenda_step_completed': {
      const action = /关于「(.+?)」的行动/.exec(event.text)?.[1];
      return action ? `把一部分时间用在「${action}」上。` : undefined;
    }
    case 'agenda_step_failed': {
      const action = /关于「(.+?)」的行动/.exec(event.text)?.[1];
      return action ? `试着「${action}」，但没有成功。` : '一次尝试没有成功。';
    }
    default:
      if (event.significance >= 0.6) return event.text;
      return undefined;
  }
}

function beatForEvent(
  world: World,
  person: Person,
  event: HistoricalEvent,
  yearEvents: HistoricalEvent[],
): Beat | undefined {
  if (event.kind === 'birth' || event.kind === 'birth_registration') return undefined;
  if (event.kind === 'death' && !ownDeath(person, event)) return undefined;
  if (isRecurringBookkeeping(event)) return undefined;
  // These are state-machine bookkeeping, not story beats. They remain in the
  // raw record but must not become the main narrative sentence.
  if (
    event.kind === 'agenda_step_completed' ||
    event.kind === 'career_progress' ||
    event.kind === 'agenda_step_failed' ||
    event.kind === 'agenda_adopted' ||
    event.kind === 'identity_shift' ||
    event.kind === 'conviction_changed'
  )
    return undefined;
  if (
    event.kind === 'caregiving' &&
    roleOf(event, 'caregiver') === person.id &&
    ageAt(person, event.month) < 12
  )
    return undefined;
  if (
    (event.kind === 'encounter' || event.kind === 'society_encounter') &&
    ageAt(person, event.month) < 13
  )
    return undefined;
  if (event.kind === 'arrival' && yearEvents.some((candidate) => candidate.kind === 'migration'))
    return undefined;

  const text = describeEvent(world, person, event);
  if (!text) return undefined;
  const group = groupByKind[event.kind] ?? (event.significance >= 0.75 ? 'world' : 'other');
  return {
    event,
    group,
    priority: priorityByKind[event.kind] ?? (event.significance >= 0.75 ? 36 : 10),
    text: ensureSentence(text),
    sourceIds: [event.id],
  };
}

function supportBeat(world: World, person: Person, events: HistoricalEvent[]): Beat | undefined {
  const support = events.filter(
    (event) => event.kind === 'family_support' || event.kind === 'agency_aid',
  );
  const first = support[0];
  if (!first) return undefined;
  const text = describeEvent(world, person, first);
  if (!text) return undefined;
  return {
    event: first,
    group: 'support',
    priority: priorityByKind[first.kind] ?? 30,
    text: ensureSentence(text),
    sourceIds: support.slice(0, 4).map((event) => event.id),
  };
}

function selectedBeats(
  world: World,
  person: Person,
  yearEvents: HistoricalEvent[],
  lastIntent: string | undefined,
) {
  const candidates = yearEvents
    .map((event) => {
      if (
        event.kind === 'agenda_adopted' &&
        dataString(event, 'intention') &&
        dataString(event, 'intention') === lastIntent
      )
        return undefined;
      return beatForEvent(world, person, event, yearEvents);
    })
    .filter((beat): beat is Beat => !!beat);
  const support = supportBeat(world, person, yearEvents);
  if (support) candidates.push(support);
  candidates.sort(
    (a, b) =>
      b.priority - a.priority ||
      b.event.significance - a.event.significance ||
      a.event.month - b.event.month,
  );

  const chosen: Beat[] = [];
  const groups = new Set<string>();
  for (const candidate of candidates) {
    if (chosen.length >= 3) break;
    if (groups.has(candidate.group)) continue;
    groups.add(candidate.group);
    chosen.push(candidate);
  }
  return { chosen: chosen.sort((a, b) => a.event.month - b.event.month), primary: candidates[0] };
}

function opening(
  world: World,
  person: Person,
  year: number,
  age: number,
  events: HistoricalEvent[],
) {
  const birth = events.find((event) => ownBirth(person, event));
  const placeId = events.findLast((event) => event.locationId)?.locationId ?? person.locationId;
  const place = placeName(world, placeId) ?? '当地';
  if (birth) {
    const parentIds = Array.isArray(birth.data.parentIds)
      ? (birth.data.parentIds as string[])
      : person.parents;
    const parents = parentIds
      .map((id) => nameOf(world, id))
      .filter((name): name is string => !!name);
    const family = parents.length ? `，在${parents.join('与')}的家庭里` : '';
    return {
      birth,
      text: `${year}年，${person.name}出生在${place}${family}来到这个世界。`,
    };
  }
  return { birth: undefined, text: `${year}年，${person.name}，${age}岁，生活在${place}。` };
}

/**
 * Deterministic life narrative compiler. It selects only a few grounded events
 * per year, writes from real names, places, ages and event data, and leaves the
 * mechanical record available as source references. It never turns an event
 * into a guaranteed future or invents a fact.
 */
export function compileLifeChapters(
  world: World,
  person: Person,
  events: HistoricalEvent[],
): LifeChapter[] {
  const ordered = events
    .filter((event) => event.personIds.includes(person.id))
    .sort((a, b) => a.month - b.month || a.id.localeCompare(b.id));
  const byYear = new Map<number, HistoricalEvent[]>();
  for (const event of ordered) {
    const year = Math.floor(event.month / 12);
    const list = byYear.get(year) ?? [];
    list.push(event);
    byYear.set(year, list);
  }

  const chapters: LifeChapter[] = [];
  let lastIntent: string | undefined;
  for (const [yearIndex, list] of [...byYear.entries()].sort((a, b) => a[0] - b[0])) {
    const ownDeathEvent = list.find((event) => ownDeath(person, event));
    if (ownDeathEvent) {
      const year = (world.calendar?.startYear ?? 1900) + yearIndex;
      const deathAge = dataNumber(ownDeathEvent, 'age') ?? ageAt(person, ownDeathEvent.month);
      const openingText = opening(world, person, year, deathAge, list).text;
      const text = `${openingText}${ensureSentence(describeEvent(world, person, ownDeathEvent) ?? '')}`;
      const sources = [ownDeathEvent, ...list.filter((event) => ownBirth(person, event))]
        .filter((event, index, all) => all.findIndex((other) => other.id === event.id) === index)
        .map((event) => ({
          id: event.id,
          month: event.month,
          kind: event.kind,
          text: event.text,
          significance: event.significance,
        }));
      chapters.push({
        id: `${person.id}:${yearIndex}`,
        year,
        fromMonth: list[0].month,
        toMonth: list.at(-1)!.month,
        age: deathAge,
        title: `${year} · 离世`,
        text,
        kind: 'death',
        significance: 1,
        sourceIds: sources.map((source) => source.id),
        sources,
      });
      break;
    }

    const { chosen: rawChosen, primary: rawPrimary } = selectedBeats(
      world,
      person,
      list,
      lastIntent,
    );
    const first = rawChosen[0]?.event ?? list[0];
    if (!first) continue;
    const year = (world.calendar?.startYear ?? 1900) + yearIndex;
    const age = ageAt(person, list.at(-1)!.month);
    const started = opening(world, person, year, age, list);
    const chosen =
      started.birth && rawChosen.some((beat) => beat.group !== 'support' && beat.group !== 'intent')
        ? rawChosen
            .filter((beat) => beat.group !== 'support' && beat.group !== 'intent')
            .slice(0, 1)
        : started.birth
          ? []
          : rawChosen;
    const primary =
      rawPrimary && chosen.some((beat) => beat.event.id === rawPrimary.event.id)
        ? rawPrimary
        : chosen[0];
    const intentBeat = chosen.find((beat) => beat.event.kind === 'agenda_adopted');
    if (intentBeat) lastIntent = dataString(intentBeat.event, 'intention') ?? lastIntent;
    const sentences = [started.text];
    if (started.birth) {
      const wish = world.runtime?.lifePrograms[person.id]?.wish?.trim();
      if (wish && !['无', 'none', '没有', 'null'].includes(wish.toLocaleLowerCase())) {
        sentences.push(`世界给这个孩子的第一个愿望是「${wish}」。`);
      }
    }
    const seen = new Set<string>();
    for (const beat of chosen) {
      const key = beat.text.replace(/\s/g, '').slice(0, 18);
      if (seen.has(key)) continue;
      seen.add(key);
      sentences.push(beat.text);
    }
    if (chosen.length === 0 && !started.birth) {
      sentences.push(
        age < 3
          ? '日子主要围着照护和成长打转。'
          : age < 18
            ? '日子在玩耍、读书和家里的安排之间过去。'
            : '日子在劳作、来往和琐事中继续。',
      );
    }
    const main = primary ?? chosen[0];
    const titleKind = started.birth
      ? '出生'
      : main?.event.kind === 'life_beat'
        ? (dataString(main.event, 'beatTitle') ?? '人生')
        : (label[main?.event.kind] ?? (main?.event.significance >= 0.7 ? '生活' : '日常'));
    const sourceIds = [
      ...(started.birth ? [started.birth.id] : []),
      ...chosen.flatMap((beat) => beat.sourceIds),
    ].filter((id, index, all) => all.indexOf(id) === index);
    const sourceEvents = sourceIds
      .map((id) => list.find((event) => event.id === id))
      .filter((event): event is HistoricalEvent => !!event);
    if (!sourceEvents.length && list[0]) sourceEvents.push(list[0]);
    const allSourceIds = sourceEvents.map((event) => event.id);
    chapters.push({
      id: `${person.id}:${yearIndex}`,
      year,
      fromMonth: list[0].month,
      toMonth: list.at(-1)!.month,
      age,
      title: `${year} · ${titleKind}`,
      text: sentences.join(''),
      kind: main?.event.kind ?? first.kind,
      significance: Math.max(...sourceEvents.map((event) => event.significance)),
      sourceIds: allSourceIds,
      sources: sourceEvents.map((event) => ({
        id: event.id,
        month: event.month,
        kind: event.kind,
        text: event.text,
        significance: event.significance,
      })),
    });
  }
  return chapters;
}

export function compileLifeProgramWish(world: World, person: Person) {
  const program = world.runtime?.lifePrograms[person.id];
  if (!program) return undefined;
  return {
    wish: program.wish,
    source: program.source,
    ability: program.abilitySpec?.mode,
    milestones: program.milestones ?? [],
  };
}
