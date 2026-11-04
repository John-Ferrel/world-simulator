import {
  addMonths,
  ageAt,
  monthIndex,
  type EventEffect,
  type EventParticipant,
  type Id,
  type Organization,
  type Person,
  type PersonAgency,
  type PersonAgencyGoal,
  type Project,
  type WorldDate,
  type WorldState,
} from './domain.js';
import { regionIdForPerson } from './macro.js';

/**
 * Deterministic, bounded initiative for people and organizations.
 *
 * This is deliberately not an agent framework and never calls a model. It
 * derives a small set of feasible actions from the same Person, Relation,
 * Organization, Knowledge and HistoricalProcess state the rest of the engine
 * uses, then returns a typed plan whose effects are committed by the engine in
 * the ordinary event transaction. Failure is possible and leaves a real trace.
 */

export type AgencyActionKind =
  | 'organize_meeting'
  | 'recruit_members'
  | 'raise_funds'
  | 'publish'
  | 'seek_work'
  | 'join_organization'
  | 'attend_meeting'
  | 'support_process'
  | 'oppose_process'
  | 'care_for_kin'
  | 'request_help'
  | 'found_process';

export type AgencyPlan = {
  kind: AgencyActionKind;
  goal: PersonAgencyGoal;
  title: string;
  text: string;
  effects: EventEffect[];
  participants: EventParticipant[];
  placeId?: Id;
  significance: number;
  success: boolean;
  organizationId?: Id;
  processId?: Id;
  projectId?: Id;
  /** Utility score of the selected hardcoded action. */
  score: number;
};

type Candidate = {
  kind: AgencyActionKind;
  score: number;
  organizationId?: Id;
  processId?: Id;
  targetPersonIds?: Id[];
  placeId?: Id;
};

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

/** Factories and hospitals are workplaces, not civic vehicles for meetings. */
const CIVIC_ORGANIZATION_KINDS = new Set(['union', 'party', 'church', 'other']);
const NON_CIVIC_PLACE_KINDS = new Set(['hospital', 'factory', 'government', 'barracks', 'school']);

export function isCivicOrganization(world: WorldState, organization: Organization): boolean {
  if (!CIVIC_ORGANIZATION_KINDS.has(organization.kind)) return false;
  const place = world.places[organization.placeId];
  return Boolean(place && !NON_CIVIC_PLACE_KINDS.has(place.kind));
}
const roundMoney = (value: number): number => Math.round(value * 100) / 100;

function living(world: WorldState, id: Id): Person | undefined {
  const person = world.persons[id];
  return person && !person.died ? person : undefined;
}

function activeProcesses(world: WorldState, regionId: string) {
  return Object.values(world.macro?.developments ?? {})
    .filter(
      (development) =>
        development.historical &&
        development.status !== 'ended' &&
        development.status !== 'blocked' &&
        development.historical.regionIds.includes(regionId),
    )
    .sort(
      (a, b) =>
        b.severity - a.severity ||
        b.historical!.metrics.support - a.historical!.metrics.support ||
        a.id.localeCompare(b.id),
    );
}

function relationTo(world: WorldState, a: Id, b: Id) {
  return Object.values(world.relations).find(
    (relation) =>
      relation.end === undefined &&
      ((relation.a === a && relation.b === b) || (relation.a === b && relation.b === a)),
  );
}

function orgMembers(world: WorldState, organizationId: Id): Person[] {
  const organization = world.organizations[organizationId];
  if (!organization || organization.status !== 'active') return [];
  return organization.memberIds
    .map((id) => living(world, id))
    .filter((person): person is Person => Boolean(person));
}

function organizationLeader(
  world: WorldState,
  person: Person,
  organization: Organization,
): boolean {
  if (organization.status !== 'active') return false;
  const positionHolder = organization.positions
    .map((id) => world.positions[id]?.holderId)
    .map((id) => (id ? living(world, id) : undefined))
    .find((candidate) => candidate && candidate.health.vitality >= 0.25);
  if (positionHolder) return positionHolder.id === person.id;
  const top = organization.memberIds
    .map((id) => living(world, id))
    .filter((candidate): candidate is Person => Boolean(candidate))
    .filter((candidate) => candidate.health.vitality >= 0.2)
    .sort(
      (a, b) =>
        (b.life?.skills.social ?? 0) +
        (b.life?.reputation ?? 0) * 0.3 -
        ((a.life?.skills.social ?? 0) + (a.life?.reputation ?? 0) * 0.3),
    )[0];
  return top?.id === person.id;
}

function processForOrganization(world: WorldState, organizationId: Id) {
  return activeProcesses(world, 'region-lower-austria').find(
    (development) => development.organizationId === organizationId,
  );
}

function heldOrganizations(world: WorldState, personId: Id): Organization[] {
  const ids = new Set<string>();
  for (const position of Object.values(world.positions)) {
    if (position.holderId === personId && position.end === undefined)
      ids.add(position.organizationId);
  }
  for (const organization of Object.values(world.organizations)) {
    if (organization.status !== 'active') continue;
    if (organization.memberIds.includes(personId)) ids.add(organization.id);
  }
  return [...ids]
    .map((id) => world.organizations[id])
    .filter((organization): organization is Organization => Boolean(organization));
}

function hasRecentEvent(
  world: WorldState,
  personId: Id,
  actionPrefix: string,
  years: number,
  date: WorldDate,
): boolean {
  const cutoff = monthIndex(date) - years * 12;
  for (let index = world.events.length - 1; index >= 0; index -= 1) {
    const event = world.events[index]!;
    if (monthIndex(event.date) < cutoff) break;
    if (event.subjectId === personId && event.action.startsWith(actionPrefix)) return true;
  }
  return false;
}

function goalFor(world: WorldState, person: Person, date: WorldDate): PersonAgency {
  const household = world.households[person.householdId];
  const members = (household?.memberIds ?? [])
    .map((id) => living(world, id))
    .filter((member): member is Person => Boolean(member));
  const dependent = members.find(
    (member) =>
      member.id !== person.id &&
      (ageAt(member, date) < 12 || (ageAt(member, date) >= 65 && member.health.vitality < 0.55)),
  );
  const sickKin = members.find(
    (member) =>
      member.id !== person.id &&
      (member.health.vitality < 0.5 || member.health.conditions.length > 0),
  );
  const regionId = regionIdForPerson(world, person);
  const process = activeProcesses(world, regionId).find(
    (development) => development.historical?.participants[person.id],
  );
  let goal: PersonAgencyGoal = 'work';
  let summary = '维持工作与家庭生活，寻找更稳定的收入。';
  if (person.health.vitality < 0.38) {
    goal = 'rest';
    summary = '身体已经吃不消，先减少外出和重活。';
  } else if (person.historicalIdentity) {
    const identity =
      `${person.historicalIdentity.occupation} ${person.historicalIdentity.publicRole}`.toLowerCase();
    if (/politik|party|sozialdemokrat|staatsmann|abgeordnet/.test(identity)) {
      goal = 'cause';
      summary = `继续以${person.historicalIdentity.occupation}的身份活动，争取组织与政策上的实际结果。`;
    } else if (/arzt|psychoanal|psycholog|forscher|wissenschaft|professor/.test(identity)) {
      goal = 'knowledge';
      summary = `继续以${person.historicalIdentity.occupation}的身份工作，推进病例、写作、研究或教学。`;
    } else if (
      /schriftsteller|dichter|publizist|journalist|kritiker|schauspieler|editor/.test(identity)
    ) {
      goal = 'knowledge';
      summary = `继续以${person.historicalIdentity.occupation}的身份写作、出版和公开表达。`;
    } else {
      goal = 'status';
      summary = `维持${person.historicalIdentity.publicRole}的公开位置，并处理随之而来的关系与责任。`;
    }
  } else if (sickKin) {
    goal = 'care';
    summary = `照顾家里的${sickKin.name}，同时想办法补上收入和食物。`;
  } else if (!person.employment || (household?.cash ?? 0) < 3) {
    goal = 'survival';
    summary = '家里现金和食物都不够，先找到工作或向熟人求助。';
  } else if (dependent) {
    goal = 'family';
    summary = `照顾${dependent.name}，让孩子或老人能撑过这段时间。`;
  } else if (process) {
    goal = 'cause';
    summary = '继续参与自己已经卷入的历史进程，争取它不要半途消失。';
  } else if (
    person.employment &&
    /arzt|lehrer|schriftsteller|journalist|forscher|professor|schauspieler|publizist/i.test(
      person.employment.occupation,
    )
  ) {
    goal = 'knowledge';
    summary = `继续以${person.employment.occupation}的身份积累专业能力，处理病人、学生、读者或研究问题。`;
  } else if (heldOrganizations(world, person.id).length > 0) {
    goal = 'belonging';
    summary = '维持组织里的位置，让同伴和会费继续撑下去。';
  }
  const current = person.agency;
  if (current?.goal === goal) {
    return { ...current, summary };
  }
  return {
    goal,
    summary,
    since: { ...date },
    lastAction: current?.lastAction,
    lastActionKind: current?.lastActionKind,
    attempts: current?.attempts ?? 0,
  };
}

export function refreshAgencyGoal(
  world: WorldState,
  person: Person,
  date: WorldDate,
): PersonAgency {
  const goal = goalFor(world, person, date);
  person.agency = goal;
  return goal;
}

function candidatesFor(world: WorldState, person: Person, date: WorldDate): Candidate[] {
  const candidates: Candidate[] = [];
  const regionId = regionIdForPerson(world, person);
  const processes = activeProcesses(world, regionId);
  const organizations = heldOrganizations(world, person.id);
  const participation = processes
    .map((development) => ({
      development,
      entry: development.historical?.participants[person.id],
    }))
    .find((entry) => entry.entry);
  const age = ageAt(person, date);
  const social = person.life?.skills.social ?? 0.3;
  const reputation = person.life?.reputation ?? 0;
  const settlementId = world.places[person.locationId]?.settlementId;

  // Life-sustaining actions are available to anyone whose condition supports
  // them. They are not restricted to a special "agent" role.
  if (
    !person.historicalIdentity &&
    !person.employment &&
    age >= 14 &&
    person.health.vitality >= 0.25
  ) {
    const employers = Object.values(world.organizations)
      .filter((organization) => organization.status === 'active')
      .filter((organization) => {
        const place = world.places[organization.placeId];
        return (
          place &&
          place.settlementId === settlementId &&
          ['factory', 'shop', 'other', 'school', 'hospital'].includes(place.kind) &&
          organization.treasury >= 8
        );
      })
      .sort((a, b) => b.treasury - a.treasury || a.id.localeCompare(b.id));
    if (employers.length > 0)
      candidates.push({
        kind: 'seek_work',
        score: 1.25,
        organizationId: employers[0]!.id,
        placeId: employers[0]!.placeId,
      });
  }
  const household = world.households[person.householdId];
  if ((household?.cash ?? 0) < 4 && age >= 14) {
    const helper = Object.values(world.relations)
      .filter(
        (relation) =>
          relation.end === undefined &&
          (relation.a === person.id || relation.b === person.id) &&
          relation.trust >= 0.2,
      )
      .map((relation) => (relation.a === person.id ? relation.b : relation.a))
      .map((id) => living(world, id))
      .filter((helper): helper is Person => Boolean(helper))
      .sort(
        (a, b) =>
          (relationTo(world, person.id, b.id)?.trust ?? 0) -
          (relationTo(world, person.id, a.id)?.trust ?? 0),
      );
    if (helper.length > 0)
      candidates.push({
        kind: 'request_help',
        score: 0.8,
        targetPersonIds: [helper[0]!.id],
        placeId: helper[0]!.locationId,
      });
  }
  const sickKin = (household?.memberIds ?? [])
    .map((id) => living(world, id))
    .filter((member): member is Person => Boolean(member))
    .find(
      (member) =>
        member.id !== person.id &&
        (member.health.vitality < 0.45 ||
          (member.health.vitality < 0.6 && member.health.conditions.length > 0)),
    );
  const recentCare =
    person.agency?.lastActionKind === 'care_for_kin' &&
    person.agency.lastAction !== undefined &&
    date.year - person.agency.lastAction.year < 2;
  if (sickKin && person.health.vitality >= 0.3 && !recentCare)
    candidates.push({
      kind: 'care_for_kin',
      score: person.agency?.goal === 'care' ? 1.2 : 0.55,
      targetPersonIds: [sickKin.id],
      placeId: world.households[person.householdId]?.residenceId,
    });

  for (const organization of organizations) {
    if (!isCivicOrganization(world, organization)) continue;
    const members = orgMembers(world, organization.id);
    const process = processForOrganization(world, organization.id);
    const isLeader = organizationLeader(world, person, organization);
    if (isLeader && organization.treasury < 18 && members.length > 1) {
      candidates.push({
        kind: 'raise_funds',
        score: 0.75,
        organizationId: organization.id,
        placeId: organization.placeId,
      });
    }
    if (isLeader && members.length < 16 && (organization.kind !== 'other' || members.length >= 2)) {
      candidates.push({
        kind: 'recruit_members',
        score: process ? 0.95 : 1.25,
        organizationId: organization.id,
        placeId: organization.placeId,
        processId: process?.id,
      });
    }
    if (isLeader && (process || members.length >= (organization.kind === 'other' ? 2 : 1))) {
      candidates.push({
        kind: 'organize_meeting',
        score: process ? 1.25 : isLeader ? 1.05 : 0.5,
        organizationId: organization.id,
        processId: process?.id,
        placeId: organization.placeId,
      });
    }
    if (isLeader && members.length >= 3 && !process) {
      const prior = hasRecentEvent(world, person.id, 'agency:organize_meeting', 6, date);
      const recentProcess = Object.values(world.macro?.developments ?? {}).some(
        (development) =>
          development.organizationId === organization.id &&
          development.start.year >= date.year - 20,
      );
      if (prior && !recentProcess)
        candidates.push({
          kind: 'found_process',
          score: 1.15,
          organizationId: organization.id,
          placeId: organization.placeId,
        });
    }
    if (isLeader && organization.kind === 'other' && person.life?.skills.literacy) {
      candidates.push({
        kind: 'publish',
        score: 0.35,
        organizationId: organization.id,
        placeId: organization.placeId,
      });
    }
  }

  // A person already in a process can maintain, split from or oppose it. A
  // person without a participation record may attend a public meeting only
  // when the process has a real organisation and visible public support.
  if (participation?.entry && participation.development.historical) {
    const process = participation.development;
    const roles = participation.entry.roles;
    candidates.push({
      kind: 'support_process',
      score: roles.includes('leader') || roles.includes('organizer') ? 1.15 : 0.9,
      processId: process.id,
      placeId: process.organizationId
        ? world.organizations[process.organizationId]?.placeId
        : undefined,
    });
    if (roles.includes('opponent'))
      candidates.push({
        kind: 'oppose_process',
        score: 1.1,
        processId: process.id,
        placeId: process.organizationId
          ? world.organizations[process.organizationId]?.placeId
          : undefined,
      });
  } else if (age >= 16 && age <= 75) {
    const visible = processes.find((development) => {
      const process = development.historical!;
      if (process.metrics.support < 0.16) return false;
      if (!['mobilizing', 'confrontation', 'institutionalizing'].includes(process.phase))
        return false;
      const organization = development.organizationId
        ? world.organizations[development.organizationId]
        : undefined;
      const place = organization ? world.places[organization.placeId] : undefined;
      if (place && place.settlementId !== settlementId) return false;
      return Boolean(place);
    });
    const lastMeetingYear =
      person.agency?.lastActionKind === 'attend_meeting' && person.agency.lastAction
        ? person.agency.lastAction.year
        : undefined;
    const meetingCooldown = lastMeetingYear !== undefined && date.year - lastMeetingYear < 3;
    if (visible && !meetingCooldown) {
      const organization = visible.organizationId
        ? world.organizations[visible.organizationId]
        : undefined;
      candidates.push({
        kind: 'attend_meeting',
        score: 0.45,
        processId: visible.id,
        organizationId: organization?.id,
        placeId: organization?.placeId,
      });
    }
  }

  if (
    !person.historicalIdentity &&
    !person.employment &&
    !organizations.some((organization) => isCivicOrganization(world, organization))
  ) {
    const nearby = Object.values(world.organizations)
      .filter(
        (organization) =>
          organization.status === 'active' && isCivicOrganization(world, organization),
      )
      .filter((organization) => {
        const place = world.places[organization.placeId];
        return place && place.settlementId === settlementId && organization.memberIds.length > 0;
      })
      .filter((organization) =>
        organization.memberIds.some((id) => relationTo(world, person.id, id)),
      )
      .sort((a, b) => a.id.localeCompare(b.id));
    if (nearby.length > 0)
      candidates.push({
        kind: 'join_organization',
        score: 0.55,
        organizationId: nearby[0]!.id,
        placeId: nearby[0]!.placeId,
      });
  }

  // Historical people and process leaders should be able to act even when they
  // are not officers in a formal organisation.
  if (person.historicalIdentity && processes.length > 0 && candidates.length === 0) {
    candidates.push({
      kind: 'publish',
      score: 0.6,
      processId: processes[0]!.id,
      placeId: person.locationId,
    });
  }
  // Bounded goal bias: ambition likes public action, care prefers kin, and
  // survival prefers material fixes.
  const ambition = person.traits.ambition;
  for (const candidate of candidates) {
    if (candidate.kind === 'organize_meeting' || candidate.kind === 'found_process')
      candidate.score *= 0.8 + ambition * 0.5;
    if (candidate.kind === 'care_for_kin') candidate.score *= 0.8 + person.traits.care * 0.5;
    if (candidate.kind === 'request_help') candidate.score *= 0.9 + (1 - ambition) * 0.2;
    candidate.score *= 1 + Math.min(0.2, Math.max(0, reputation) * 0.2);
    // Avoid doing the exact same kind of thing every single year; a real
    // person alternates between work, care, organisation and open action.
    if (person.agency?.lastActionKind === candidate.kind) candidate.score *= 0.55;
  }
  return candidates.slice(0, 8);
}

function pickOrganizationTarget(
  world: WorldState,
  person: Person,
  organization: Organization,
  date: WorldDate,
): Person | undefined {
  const settlementId = world.places[organization.placeId]?.settlementId;
  const existing = new Set(organization.memberIds);
  return Object.values(world.persons)
    .filter(
      (candidate) =>
        !candidate.died &&
        candidate.id !== person.id &&
        !existing.has(candidate.id) &&
        candidate.provenance.kind !== 'historical_activation' &&
        ageAt(candidate, date) >= 16 &&
        ageAt(candidate, date) <= 70 &&
        world.places[candidate.locationId]?.settlementId === settlementId,
    )
    .sort((a, b) => {
      const sa = (a.life?.skills.social ?? 0) + (a.employment ? 0.1 : 0);
      const sb = (b.life?.skills.social ?? 0) + (b.employment ? 0.1 : 0);
      return sb - sa || a.id.localeCompare(b.id);
    })[0];
}

function successChance(
  world: WorldState,
  person: Person,
  candidate: Candidate,
  date: WorldDate,
): number {
  const social = person.life?.skills.social ?? 0.3;
  const literacy = person.life?.skills.literacy ?? 0.2;
  const reputation = person.life?.reputation ?? 0;
  const organization = candidate.organizationId
    ? world.organizations[candidate.organizationId]
    : undefined;
  const process = candidate.processId
    ? world.macro?.developments?.[candidate.processId]?.historical
    : undefined;
  const members = organization ? orgMembers(world, organization.id).length : 0;
  const base: Record<AgencyActionKind, number> = {
    organize_meeting:
      0.3 + social * 0.25 + Math.max(0, reputation) * 0.2 + Math.min(0.2, members * 0.02),
    recruit_members: 0.34 + social * 0.3 + Math.max(0, reputation) * 0.15,
    raise_funds: 0.35 + social * 0.2 + Math.min(0.25, members * 0.03),
    publish: 0.35 + literacy * 0.3 + Math.max(0, reputation) * 0.2,
    seek_work:
      0.28 + (person.education.level ?? 0) * 0.04 + (person.life?.skills.craft ?? 0.2) * 0.25,
    join_organization: 0.4 + social * 0.25,
    attend_meeting: 0.55 + social * 0.2,
    support_process: 0.5 + social * 0.2,
    oppose_process: 0.4 + social * 0.15 + Math.max(0, reputation) * 0.15,
    care_for_kin: 0.7 + person.traits.care * 0.2,
    request_help: 0.35 + social * 0.2,
    found_process:
      0.2 + social * 0.2 + Math.max(0, reputation) * 0.2 + Math.min(0.2, members * 0.02),
  };
  let chance = base[candidate.kind];
  if (process) chance -= process.metrics.opposition * 0.2;
  if (person.health.vitality < 0.4) chance -= 0.15;
  if (candidate.kind === 'seek_work' && !person.employment) chance += 0.1;
  return Math.max(0.05, Math.min(0.92, chance));
}

function projectFor(person: Person, candidate: Candidate, date: WorldDate, title: string): Project {
  const id = `project:agency:${person.id}:${candidate.kind}:${date.year}`;
  return {
    id,
    ownerId: person.id,
    kind: `agency_${candidate.kind}`,
    title,
    participants: [{ personId: person.id, role: 'organizer' }],
    placeId: candidate.placeId,
    state: 'active',
    stage: 0,
    required: { people: 2 },
    committed: {},
    deadline: addMonths(date, 12),
    blockers: [],
    causeIds: [],
    history: [{ date: { ...date }, note: 'initiative_started' }],
  };
}

function planText(
  world: WorldState,
  person: Person,
  candidate: Candidate,
  success: boolean,
  target?: Person,
): string {
  const place = candidate.placeId ? world.places[candidate.placeId]?.name : undefined;
  const organization = candidate.organizationId
    ? world.organizations[candidate.organizationId]
    : undefined;
  const process = candidate.processId
    ? world.macro?.developments?.[candidate.processId]
    : undefined;
  const processName = process?.description.replace(/[。！？；\s]+$/g, '').slice(0, 45);
  switch (candidate.kind) {
    case 'organize_meeting':
      return success
        ? `${person.name}在${place ?? '借来的房间'}召集了一次小范围会议，和${target?.name ?? '几位熟人'}把下一次行动、会费和分工写在纸上。`
        : `${person.name}原定在${place ?? '后屋'}开会，但来的人不够，或者有人临时退缩；最后只留下几张没发完的纸条。`;
    case 'recruit_members':
      return success
        ? `${person.name}找到${target?.name ?? '一名新成员'}，把${organization?.name ?? '组织'}的章程和会费说清楚；对方留下地址，答应下次再来。`
        : `${person.name}试图招募${target?.name ?? '一名新成员'}，但对方担心工作和警察，没有给出承诺。`;
    case 'raise_funds':
      return success
        ? `${person.name}向${organization?.name ?? '组织'}的几户成员收了这个月的会费，把零钱记在账本上；钱不多，但足够付油印和房租。`
        : `${person.name}想收会费，但几户人家这个月连自己的房租都付不出，账本上只多了一行欠款。`;
    case 'publish':
      return success
        ? `${person.name}把一篇短文交到印刷所，谈${processName ?? '当前的争论'}；几天后，认识字的人在咖啡馆里传阅它。`
        : `${person.name}写完了稿子，却没有找到愿意印的人；手稿被折起来放回抽屉。`;
    case 'seek_work':
      return success
        ? `${person.name}在${place ?? '招工处'}问到一份工作，工钱按周结算；回家后把第一天的工牌放在桌上。`
        : `${person.name}去了${place ?? '几家工场'}问工，得到的回答都是“下个月再来”。`;
    case 'join_organization':
      return success
        ? `${person.name}通过熟人介绍加入了${organization?.name ?? '一个组织'}，在名册上写下住址，并答应参加下一次聚会。`
        : `${person.name}想加入${organization?.name ?? '一个组织'}，但介绍人不在，其他人没有替其担保。`;
    case 'attend_meeting':
      return success
        ? `${person.name}去了${place ?? '一场公开集会'}，坐在后排听完了关于${processName ?? '当前处境'}的争论；散会时带走一张油印提纲。`
        : `${person.name}走到${place ?? '会场'}门口，看见便衣和拥挤的人群，最终没有进去。`;
    case 'support_process':
      return success
        ? `${person.name}为${processName ?? '正在进行的行动'}出了力：整理名单、传递消息或替同伴作证，名字被记进参与记录。`
        : `${person.name}想帮忙，但组织者不信任新来的人，只让其在外围等消息。`;
    case 'oppose_process':
      return success
        ? `${person.name}公开反对${processName ?? '当前行动'}的做法，和原来的同伴发生争执；有人开始回避其名字。`
        : `${person.name}提出反对，但会上没有人接话，最后只能把意见写在纸上。`;
    case 'care_for_kin':
      return success
        ? `${person.name}留在家里照顾${target?.name ?? '生病的家人'}，煮水、换布、去药房排队；夜里才想起自己还没吃饭。`
        : `${person.name}想照顾${target?.name ?? '生病的家人'}，但工作脱不开身，只能托邻居带一锅汤回去。`;
    case 'request_help':
      return success
        ? `${person.name}去找${target?.name ?? '熟人'}借了一点钱和食物，答应下个月还；对方没有多问，只把钱包里最小的票子抽出来。`
        : `${person.name}去找${target?.name ?? '熟人'}求助，对方也正被房租和病人拖住，只能摇头。`;
    case 'found_process':
      return success
        ? `${person.name}和${organization?.name ?? '同伴'}把几年前的互助、会费和争执整理成一份公开纲领；这不再只是一次帮忙，而是持续的运动。`
        : `${person.name}提出把互助会变成公开运动，但成员担心分裂和警察，会议没有通过。`;
  }
}

export function planAgencyAction(
  world: WorldState,
  personId: Id,
  date: WorldDate,
  roll: () => number,
): AgencyPlan | undefined {
  const person = living(world, personId);
  if (!person) return undefined;
  // Children do not run organizations, negotiate with employers or recruit
  // adults. Their lives are still shaped by family scenes and later agency.
  if (ageAt(person, date) < 14) return undefined;
  const goal = refreshAgencyGoal(world, person, date);
  const holdsOffice = Object.values(world.positions).some(
    (position) => position.holderId === person.id && position.end === undefined,
  );
  if (goal.goal === 'rest' && person.health.vitality < 0.18 && !holdsOffice) return undefined;
  const candidates = candidatesFor(world, person, date);
  if (candidates.length === 0) return undefined;
  const total = candidates.reduce((sum, candidate) => sum + Math.max(0, candidate.score), 0);
  if (total <= 0) return undefined;
  let draw = roll() * total;
  let selected = candidates[candidates.length - 1]!;
  for (const candidate of candidates) {
    draw -= Math.max(0, candidate.score);
    if (draw <= 0) {
      selected = candidate;
      break;
    }
  }
  const organization = selected.organizationId
    ? world.organizations[selected.organizationId]
    : undefined;
  if (
    (selected.kind === 'recruit_members' ||
      selected.kind === 'join_organization' ||
      selected.kind === 'seek_work') &&
    !organization
  )
    return undefined;
  const target =
    selected.targetPersonIds?.[0] !== undefined
      ? living(world, selected.targetPersonIds[0])
      : selected.kind === 'recruit_members' && organization
        ? pickOrganizationTarget(world, person, organization, date)
        : selected.kind === 'join_organization' && organization
          ? orgMembers(world, organization.id)[0]
          : selected.kind === 'organize_meeting' && organization
            ? orgMembers(world, organization.id).find((member) => member.id !== person.id)
            : undefined;
  if (
    (selected.kind === 'recruit_members' && !target) ||
    (selected.kind === 'join_organization' && !target && !organization) ||
    (selected.kind === 'request_help' && !target) ||
    (selected.kind === 'care_for_kin' && !target)
  )
    return undefined;

  const success = roll() < successChance(world, person, selected, date);
  const effects: EventEffect[] = [];
  const participants: EventParticipant[] = [{ personId: person.id, role: 'subject' }];
  const pushTarget = (role: string) => {
    if (target) participants.push({ personId: target.id, role });
  };
  const text = planText(world, person, selected, success, target);
  const projectTitle: Record<string, string> = {
    organize_meeting: `${person.name}召集的会议`,
    recruit_members: `招募新成员`,
    raise_funds: `收取会费`,
    publish: `一篇公开短文`,
    seek_work: `寻找工作`,
    join_organization: `加入组织`,
    attend_meeting: `参加公开集会`,
    support_process: `支持一场运动`,
    oppose_process: `反对一场运动`,
    care_for_kin: `照护家人`,
    request_help: `向熟人求助`,
    found_process: `建立持续运动`,
  };
  let significance = 0.35;
  if (selected.kind === 'organize_meeting' || selected.kind === 'found_process')
    significance = 0.65;
  if (selected.kind === 'publish' || selected.kind === 'support_process') significance = 0.5;
  if (!success) significance = Math.max(0.25, significance - 0.15);

  if (success) {
    switch (selected.kind) {
      case 'organize_meeting': {
        const project = projectFor(person, selected, date, projectTitle[selected.kind]!);
        if (target) project.participants.push({ personId: target.id, role: 'participant' });
        effects.push({ type: 'project', project });
        if (selected.processId && world.macro?.developments?.[selected.processId]) {
          effects.push({
            type: 'historical_participation',
            processId: selected.processId,
            personId: person.id,
            role: 'organizer',
            influence: 0.04,
            reason: 'organised a meeting',
          });
          effects.push({
            type: 'historical_influence',
            processId: selected.processId,
            personId: person.id,
            dimension: 'support',
            amount: 0.03,
            reason: 'meeting strengthened the process',
          });
          effects.push({
            type: 'knowledge',
            holderId: person.id,
            proposition: `我召集了一次关于${world.macro.developments[selected.processId]!.description.slice(0, 40)}的会议。`,
            confidence: 0.9,
            sourceKind: 'witnessed',
            visibility: 'shared',
            trueInWorld: true,
          });
        }
        if (target)
          effects.push({
            type: 'relation',
            a: person.id,
            b: target.id,
            kind: 'colleague',
            trust: 0.04,
            obligation: 0.03,
            reason: 'worked together at a meeting',
          });
        effects.push({
          type: 'reputation',
          personId: person.id,
          amount: 0.02,
          reason: 'took responsibility for a meeting',
        });
        pushTarget('participant');
        break;
      }
      case 'recruit_members': {
        if (!target || !organization) break;
        effects.push({
          type: 'organization_membership',
          personId: target.id,
          organizationId: organization.id,
          add: true,
          reason: 'recruited by a member',
        });
        effects.push({
          type: 'relation',
          a: person.id,
          b: target.id,
          kind: 'acquaintance',
          trust: 0.05,
          obligation: 0.02,
          reason: 'recruited into an organization',
        });
        if (selected.processId)
          effects.push({
            type: 'historical_participation',
            processId: selected.processId,
            personId: target.id,
            role: 'supporter',
            influence: 0.02,
            reason: 'joined the organization behind the process',
          });
        effects.push({
          type: 'knowledge',
          holderId: target.id,
          proposition: `我通过${person.name}加入了${organization.name}。`,
          confidence: 0.9,
          sourceKind: 'witnessed',
          personId: person.id,
          visibility: 'private',
          trueInWorld: true,
        });
        pushTarget('recruit');
        break;
      }
      case 'raise_funds': {
        if (!organization) break;
        const members = orgMembers(world, organization.id)
          .filter((member) => member.householdId !== person.householdId)
          .filter((member) => (world.households[member.householdId]?.cash ?? 0) >= 1)
          .slice(0, 3);
        for (const member of members) {
          effects.push({
            type: 'cash',
            householdId: member.householdId,
            amount: -1,
            reason: `dues to ${organization.name}`,
          });
          effects.push({
            type: 'organization_funds',
            organizationId: organization.id,
            amount: 1,
            reason: `dues collected by ${person.name}`,
          });
        }
        if (members.length === 0)
          effects.push({
            type: 'organization_funds',
            organizationId: organization.id,
            amount: 1,
            reason: `${person.name} contributed personal funds`,
          });
        break;
      }
      case 'publish': {
        const listeners = Object.values(world.persons)
          .filter(
            (candidate) =>
              !candidate.died &&
              candidate.id !== person.id &&
              regionIdForPerson(world, candidate) === regionIdForPerson(world, person) &&
              (candidate.life?.skills.literacy ?? 0) >= 0.3,
          )
          .sort((a, b) => (b.life?.skills.literacy ?? 0) - (a.life?.skills.literacy ?? 0))
          .slice(0, 4);
        for (const listener of listeners) {
          effects.push({
            type: 'knowledge',
            holderId: listener.id,
            proposition: `我读到${person.name}关于${world.macro?.developments?.[selected.processId ?? '']?.description.slice(0, 40) ?? '当前争论'}的文字。`,
            confidence: 0.75,
            sourceKind: 'document',
            personId: person.id,
            visibility: 'shared',
            trueInWorld: true,
          });
          participants.push({ personId: listener.id, role: 'reader' });
        }
        if (selected.processId)
          effects.push({
            type: 'historical_influence',
            processId: selected.processId,
            personId: person.id,
            dimension: 'information',
            amount: 0.08,
            reason: 'published an argument',
          });
        effects.push({
          type: 'reputation',
          personId: person.id,
          amount: 0.03,
          reason: 'published an argument',
        });
        break;
      }
      case 'seek_work': {
        if (!organization) break;
        const wage = roundMoney(16 + (person.life?.skills.craft ?? 0.2) * 20);
        effects.push({
          type: 'employment',
          personId: person.id,
          organizationId: organization.id,
          occupation: person.education.status === 'higher' ? 'clerk' : 'worker',
          wage,
          workplaceId: organization.placeId,
          reason: 'found work through the local labour market',
        });
        effects.push({
          type: 'mood',
          personId: person.id,
          amount: 0.08,
          reason: 'found paid work',
        });
        participants.push({ personId: person.id, role: 'worker' });
        break;
      }
      case 'join_organization': {
        if (!organization) break;
        effects.push({
          type: 'organization_membership',
          personId: person.id,
          organizationId: organization.id,
          add: true,
          reason: 'joined through a personal introduction',
        });
        if (target)
          effects.push({
            type: 'relation',
            a: person.id,
            b: target.id,
            kind: 'acquaintance',
            trust: 0.04,
            reason: 'introduced to an organization',
          });
        if (selected.processId)
          effects.push({
            type: 'historical_participation',
            processId: selected.processId,
            personId: person.id,
            role: 'supporter',
            influence: 0.02,
            reason: 'joined an organization tied to the process',
          });
        pushTarget('introducer');
        break;
      }
      case 'attend_meeting': {
        if (!selected.processId) break;
        effects.push({
          type: 'historical_participation',
          processId: selected.processId,
          personId: person.id,
          role: 'participant',
          influence: 0.015,
          reason: 'attended a public meeting',
        });
        effects.push({
          type: 'knowledge',
          holderId: person.id,
          proposition: `我参加了${world.macro?.developments?.[selected.processId]?.description.slice(0, 50) ?? '一场公开集会'}。`,
          confidence: 0.85,
          sourceKind: 'witnessed',
          visibility: 'private',
          trueInWorld: true,
        });
        effects.push({
          type: 'mood',
          personId: person.id,
          amount: 0.03,
          reason: 'attended a public meeting',
        });
        break;
      }
      case 'support_process': {
        if (!selected.processId) break;
        effects.push({
          type: 'historical_participation',
          processId: selected.processId,
          personId: person.id,
          role: 'supporter',
          influence: 0.03,
          reason: 'maintained the process',
        });
        effects.push({
          type: 'historical_influence',
          processId: selected.processId,
          personId: person.id,
          dimension: 'resources',
          amount: 0.02,
          reason: 'contributed time and money',
        });
        effects.push({
          type: 'reputation',
          personId: person.id,
          amount: 0.015,
          reason: 'kept a movement alive',
        });
        break;
      }
      case 'oppose_process': {
        if (!selected.processId) break;
        effects.push({
          type: 'historical_participation',
          processId: selected.processId,
          personId: person.id,
          role: 'opponent',
          influence: 0.03,
          reason: 'publicly opposed the process',
        });
        effects.push({
          type: 'historical_influence',
          processId: selected.processId,
          personId: person.id,
          dimension: 'opposition',
          amount: 0.04,
          reason: 'organised opposition',
        });
        effects.push({
          type: 'reputation',
          personId: person.id,
          amount: 0.01,
          reason: 'took a public opposing position',
        });
        break;
      }
      case 'care_for_kin': {
        if (!target) break;
        effects.push({
          type: 'health',
          personId: target.id,
          amount: 0.04,
          reason: 'received nursing and food at home',
        });
        effects.push({
          type: 'relation',
          a: person.id,
          b: target.id,
          kind: 'kin',
          trust: 0.04,
          obligation: 0.03,
          reason: 'cared for a sick relative',
        });
        effects.push({
          type: 'mood',
          personId: person.id,
          amount: 0.02,
          reason: 'kept a sick relative alive',
        });
        pushTarget('patient');
        break;
      }
      case 'request_help': {
        if (!target) break;
        effects.push({
          type: 'cash',
          householdId: person.householdId,
          amount: 2,
          reason: `help from ${target.name}`,
        });
        effects.push({
          type: 'relation',
          a: person.id,
          b: target.id,
          kind: 'acquaintance',
          trust: 0.02,
          obligation: -0.03,
          reason: 'accepted material help',
        });
        pushTarget('helper');
        break;
      }
      case 'found_process': {
        if (!organization) break;
        const id = `development:initiative-${organization.id}-${date.year}`.slice(0, 160);
        effects.push({
          type: 'historical_process',
          process: {
            id,
            kind: 'social_movement',
            title: `${organization.name}的持续运动`,
            description: `${person.name}和${organization.name}把互助、会费和争执整理成公开纲领，形成一场由实际成员推动的地方运动。`,
            regionId: regionIdForPerson(world, person),
            organizationId: organization.id,
            objectives: ['维持成员互助并争取更稳定的劳动条件'],
            sourceIds: [],
          },
        });
        effects.push({
          type: 'historical_participation',
          processId: id,
          personId: person.id,
          role: 'organizer',
          influence: 0.08,
          reason: 'founded a bottom-up process',
        });
        effects.push({
          type: 'project',
          project: projectFor(person, selected, date, projectTitle[selected.kind]!),
        });
        break;
      }
    }
  } else {
    effects.push({
      type: 'mood',
      personId: person.id,
      amount: -0.04,
      reason: 'an initiative failed',
    });
    if (person.life && person.life.reputation > 0.05)
      effects.push({
        type: 'reputation',
        personId: person.id,
        amount: -0.01,
        reason: 'a public initiative fell short',
      });
    pushTarget('present');
  }
  if (effects.length === 0) return undefined;
  const immunity = world.persons[person.id]?.historicalIdentity ? 'historical' : 'ordinary';
  void immunity;
  return {
    kind: selected.kind,
    goal: goal.goal,
    title: projectTitle[selected.kind] ?? '一次自主行动',
    text,
    effects,
    participants,
    placeId: selected.placeId,
    significance,
    success,
    score: selected.score,
    organizationId: selected.organizationId,
    processId: selected.processId,
    projectId:
      effects.find((effect) => effect.type === 'project')?.type === 'project'
        ? (
            effects.find((effect) => effect.type === 'project') as Extract<
              EventEffect,
              { type: 'project' }
            >
          ).project.id
        : undefined,
  };
}

/** Bounded annual actor list: historical people, owners, officers, process leaders. */
export function agencyActorIds(world: WorldState, date: WorldDate, ordinaryLimit = 48): Id[] {
  const ids = new Set<Id>();
  for (const person of Object.values(world.persons)) {
    if (person.died) continue;
    if (person.ownerId || person.historicalIdentity) ids.add(person.id);
  }
  for (const position of Object.values(world.positions)) {
    if (position.holderId && living(world, position.holderId)) ids.add(position.holderId);
  }
  for (const development of Object.values(world.macro?.developments ?? {})) {
    const process = development.historical;
    if (!process) continue;
    for (const id of Object.keys(process.participants)) {
      if (living(world, id)) ids.add(id);
    }
  }
  // An organization without a formal position still has an informal leader:
  // the most socially capable living member. That person is sampled so the
  // organization can act autonomously instead of waiting for a Director.
  for (const organization of Object.values(world.organizations)) {
    if (organization.status !== 'active') continue;
    if (!isCivicOrganization(world, organization)) continue;
    const leader = organization.memberIds
      .map((id) => living(world, id))
      .filter((person): person is Person => Boolean(person))
      .sort(
        (a, b) =>
          (b.life?.skills.social ?? 0) +
          (b.life?.reputation ?? 0) * 0.3 -
          ((a.life?.skills.social ?? 0) + (a.life?.reputation ?? 0) * 0.3),
      )[0];
    if (leader) ids.add(leader.id);
  }
  const ordinary = Object.values(world.persons)
    .filter(
      (person) =>
        !person.died &&
        !ids.has(person.id) &&
        // Children can actively seek school help, friends or chores; they are
        // not limited to passive family events.
        ageAt(person, date) >= 6 &&
        ageAt(person, date) <= 80 &&
        person.provenance.kind !== 'materialized_population',
    )
    .sort((a, b) => a.id.localeCompare(b.id));
  // Deterministic rotating sample rather than a permanent first-N list.
  const offset = ordinary.length > 0 ? (date.year * 17) % ordinary.length : 0;
  for (let index = 0; index < Math.min(ordinaryLimit, ordinary.length); index += 1) {
    ids.add(ordinary[(offset + index) % ordinary.length]!.id);
  }
  return [...ids].sort();
}

export type BottomUpProcessPlan = {
  id: string;
  organizationId: string;
  actorPersonId: string;
  memberIds: string[];
  title: string;
  description: string;
  regionId: string;
  placeId: string;
};

/**
 * An organization that has sustained real actions (meetings, recruitment,
 * dues, projects) can become a historical process without Director approval.
 * The rule reads actual events and members; it does not select a pre-written
 * outcome or create a process for an inactive shell organization.
 */
export function planBottomUpProcess(
  world: WorldState,
  date: WorldDate,
): BottomUpProcessPlan | undefined {
  const cutoff = monthIndex(date) - 5 * 12;
  const candidates = Object.values(world.organizations)
    .filter((organization) => organization.status === 'active')
    .filter((organization) => isCivicOrganization(world, organization))
    .filter((organization) => {
      const members = orgMembers(world, organization.id);
      if (members.length < 2) return false;
      // One organised wave per twenty years is enough. Without this cooldown a
      // long-lived union would spawn a new "movement" every few years after
      // each previous wave ended, which is neither realistic nor useful.
      const hasProcess = Object.values(world.macro?.developments ?? {}).some(
        (development) =>
          development.organizationId === organization.id &&
          development.start.year >= date.year - 20,
      );
      if (hasProcess) return false;
      const memberIds = new Set(members.map((member) => member.id));
      const actions = world.events.filter(
        (event) =>
          monthIndex(event.date) >= cutoff &&
          event.action.startsWith('agency:') &&
          memberIds.has(event.subjectId),
      ).length;
      return actions >= 2;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
  if (candidates.length === 0) return undefined;
  const organization = candidates[0]!;
  let hash = 2166136261;
  for (const char of [world.seed, 'bottom-up', organization.id, date.year].join('|')) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  if (((hash >>> 0) % 1000) / 1000 >= 0.4) return undefined;
  const members = orgMembers(world, organization.id).sort(
    (a, b) =>
      (b.life?.skills.social ?? 0) +
      (b.life?.reputation ?? 0) * 0.3 -
      ((a.life?.skills.social ?? 0) + (a.life?.reputation ?? 0) * 0.3),
  );
  const actor = members[0];
  if (!actor) return undefined;
  const place = world.places[organization.placeId];
  const id = `development:initiative-${organization.id}-${date.year}`.slice(0, 160);
  if (world.macro?.developments?.[id]) return undefined;
  return {
    id,
    organizationId: organization.id,
    actorPersonId: actor.id,
    memberIds: members.slice(0, 5).map((member) => member.id),
    title: `${organization.name}的持续运动`,
    description: `${organization.name}在${place?.name ?? '本地'}经过数年的招募、会议和互助，把分散的行动整理成公开纲领；这不是预先写好的历史，而是成员自己累积出来的运动。`,
    regionId: place?.regionId ?? 'region-lower-austria',
    placeId: organization.placeId,
  };
}
