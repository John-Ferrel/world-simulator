import { clamp, type HistoricalEvent, type Person, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import type { GeopoliticalState, Government } from '../geopolitics/index.js';
import type { SocietyState } from '../society/index.js';

export type CoercionAxis = 'political' | 'religious';
export type CustodyCase = {
  id: string;
  personId: string;
  polityId: string;
  locationId: string;
  axis: CoercionAxis;
  started: number;
  deadline: number;
  detentionEventId: string;
  causeIds: string[];
  leaderIdAtIntake: string;
  pressFreedomAtIntake: number;
  religiousFreedomAtIntake: number;
};
export type PublicActivity = {
  personId: string;
  polityId: string;
  locationId: string;
  axis: CoercionAxis;
  ideology?: string;
  tradition?: string;
  months: number[];
  evidenceIds: string[];
  lastActivity: number;
};
export type DetentionFacility = {
  polityId: string;
  capacity: number;
  coinTransferred: number;
  foodConsumed: number;
  maintainedDetaineeMonths: number;
  lastLocationId?: string;
};
export type CoercionState = {
  version: 1;
  lastAdvancedMonth: number;
  activities: Record<string, PublicActivity>;
  custody: Record<string, CustodyCase>;
  facilities: Record<string, DetentionFacility>;
  lastEventIds: string[];
};
type CoercionWorld = World & {
  geopolitics?: GeopoliticalState;
  society?: SocietyState;
  coercion?: CoercionState;
};
type Polity = World['polities'][number];
type Settlement = World['settlements'][number];

const EVIDENCE_WINDOW = 24;
const DETENTION_MONTHS = 6;
const MAX_CAPACITY = 24;
const alive = (person: Person) => person.death === undefined;
const adult = (person: Person, month: number) => month - person.birth >= 216;
const boundedUnique = (ids: string[], id?: string, limit = 16) => {
  const next = id ? [...new Set([...ids.filter((value) => value !== id), id])] : [...new Set(ids)];
  return next.slice(-limit);
};
function ensureState(w: CoercionWorld): CoercionState {
  return (w.coercion ??= {
    version: 1,
    lastAdvancedMonth: -1,
    activities: {},
    custody: {},
    facilities: {},
    lastEventIds: [],
  });
}

export function isDetained(w: World, personOrId: Person | string): boolean {
  const id = typeof personOrId === 'string' ? personOrId : personOrId.id;
  return !!(w as CoercionWorld).coercion?.custody[id];
}
function clearPersonActivities(state: CoercionState, personId: string) {
  for (const [key, activity] of Object.entries(state.activities))
    if (activity.personId === personId) delete state.activities[key];
}

function activityAxis(event: HistoricalEvent): CoercionAxis | undefined {
  if (
    ['political_meeting', 'political_commitment', 'campaign', 'coup', 'political_reform'].includes(
      event.kind,
    ) ||
    (event.kind === 'agenda_step_completed' &&
      ['campaign', 'publish'].includes(String(event.data.action))) ||
    (event.kind === 'social_identity_adopted' && event.data.axis === 'political')
  )
    return 'political';
  if (
    ['faith_witness', 'religious_gathering', 'religious_conversion'].includes(event.kind) ||
    (event.kind === 'agenda_step_completed' && event.data.action === 'faith') ||
    (event.kind === 'social_identity_adopted' && event.data.axis === 'religion')
  )
    return 'religious';
}

function ideologyId(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value === 'labor' ? 'socialist' : value === 'reform' ? 'liberal' : value;
}
function publicActivityIdeology(event: HistoricalEvent, person: Person, w: World) {
  const agenda = w.agency?.agendas[person.id];
  const fromAgenda =
    event.kind === 'agenda_step_completed' && event.data.action === 'campaign' && agenda
      ? agenda.steps[Math.max(0, agenda.cursor - 1)]?.ideology
      : undefined;
  return ideologyId(
    event.data.ideology ?? event.data.position ?? fromAgenda ?? event.data.identity,
  );
}
function governingIdeology(w: World, gov: Government) {
  return (
    w.politics?.polities[gov.polityId]?.governingIdeology ??
    gov.parties.slice().sort((a, b) => b.support - a.support || a.id.localeCompare(b.id))[0]
      ?.ideology
  );
}
function isAlignedWithGovernment(
  event: HistoricalEvent,
  person: Person,
  w: World,
  gov: Government,
) {
  const expressed = publicActivityIdeology(event, person, w);
  if (!expressed) return false;
  return expressed === governingIdeology(w, gov);
}
function explicitlySharesLeaderFaith(tradition: string, w: CoercionWorld, polity: Polity) {
  const leader = w.persons.find((candidate) => candidate.id === polity.leaderId);
  if (!leader) return false;
  if (!tradition.startsWith('faith:')) return false;
  const leaderTraditions = new Set([
    ...leader.beliefs
      .filter((belief) => belief.confidence >= 0.55 && belief.claimId.startsWith('faith:'))
      .map((belief) => belief.claimId),
    ...(w.society?.profiles[leader.id]?.religionId
      ? [w.society.profiles[leader.id].religionId!]
      : []),
  ]);
  return leaderTraditions.has(tradition);
}
function scheduleReplan(w: CoercionWorld, personId: string, causeId: string, reason: string) {
  if (!w.agency) return;
  const agenda = w.agency.agendas[personId];
  if (agenda?.status === 'active') agenda.status = 'replan';
  w.agency.needsReplan[personId] = { since: w.month, reason, causeIds: [causeId] };
}

function freedoms(gov: Government, axis: CoercionAxis) {
  return axis === 'religious' ? gov.laws.religiousFreedom : gov.laws.pressFreedom;
}
function crackdown(gov: Government, axis: CoercionAxis) {
  const freedom = freedoms(gov, axis);
  return axis === 'religious'
    ? freedom < 0.28
    : freedom < 0.24 ||
        ((gov.regime === 'authoritarian' || gov.regime === 'military') && freedom < 0.34);
}

function publicCost(w: World, polity: Polity, settlement: Settlement, food: number) {
  const coin = 0.25;
  if (polity.treasury + 1e-9 < coin || settlement.food + 1e-9 < food) return false;
  polity.treasury -= coin;
  settlement.coin += coin;
  settlement.food = Math.max(0, settlement.food - food);
  w.audit.consumedFood += food;
  return true;
}
function recordFacilityUpkeep(
  state: CoercionState,
  polityId: string,
  locationId: string,
  capacity: number,
  food: number,
) {
  const facility = (state.facilities[polityId] ??= {
    polityId,
    capacity,
    coinTransferred: 0,
    foodConsumed: 0,
    maintainedDetaineeMonths: 0,
  });
  facility.capacity = capacity;
  facility.lastLocationId = locationId;
  facility.coinTransferred += 0.25;
  facility.foodConsumed += food;
  facility.maintainedDetaineeMonths++;
}

/** Monthly, evidence-backed custody process. Call with only this tick's emitted/committed events. */
export function advanceCoercion(
  w0: World,
  emit: Emit,
  locals: Map<string, Person[]>,
  events: HistoricalEvent[],
): void {
  const w = w0 as CoercionWorld,
    state = ensureState(w);
  if (state.lastAdvancedMonth === w.month) return;
  state.lastAdvancedMonth = w.month;
  const personsById = new Map(w.persons.map((person) => [person.id, person]));
  const settlementsById = new Map(w.settlements.map((settlement) => [settlement.id, settlement]));
  const politiesById = new Map(w.polities.map((polity) => [polity.id, polity]));
  const governmentById = w.geopolitics?.governments ?? {};
  const currentEvents = events.filter((event) => event.month === w.month);

  for (const [id, activity] of Object.entries(state.activities)) {
    if (w.month - activity.lastActivity > EVIDENCE_WINDOW) delete state.activities[id];
  }
  for (const event of currentEvents) {
    const axis = activityAxis(event),
      locationId = event.locationId;
    if (!axis || !locationId) continue;
    const place = settlementsById.get(locationId);
    if (!place) continue;
    for (const personId of event.personIds) {
      const person = personsById.get(personId);
      if (
        !person ||
        !alive(person) ||
        !adult(person, w.month) ||
        person.journey ||
        person.locationId !== locationId ||
        (locals.get(locationId) ?? []).every((localPerson) => localPerson.id !== person.id)
      )
        continue;
      const gov = governmentById[place.polityId];
      if (gov && axis === 'political' && isAlignedWithGovernment(event, person, w, gov)) continue;
      const expressed = publicActivityIdeology(event, person, w),
        tradition = String(event.data.tradition ?? event.data.identity ?? '');
      const activityKey = `${person.id}:${axis}`;
      const existing = state.activities[activityKey];
      if (existing && existing.polityId !== place.polityId) delete state.activities[activityKey];
      const activity = (state.activities[activityKey] ??= {
        personId,
        polityId: place.polityId,
        locationId,
        axis,
        ideology: expressed,
        tradition: tradition.startsWith('faith:') ? tradition : undefined,
        months: [],
        evidenceIds: [],
        lastActivity: w.month,
      });
      activity.locationId = locationId;
      activity.lastActivity = w.month;
      if (!activity.months.includes(w.month)) activity.months.push(w.month);
      activity.months = activity.months
        .filter((month) => w.month - month <= EVIDENCE_WINDOW)
        .slice(-8);
      activity.evidenceIds = boundedUnique(activity.evidenceIds, event.id, 16);
    }
  }

  const localAdults: Record<string, number> = {};
  for (const settlement of w.settlements)
    localAdults[settlement.polityId] =
      (localAdults[settlement.polityId] ?? 0) + settlement.cohort.adults;

  // Existing custody has priority in the facility budget and is reviewed before new admissions.
  for (const [personId, caseFile] of Object.entries(state.custody)) {
    const person = personsById.get(personId),
      polity = politiesById.get(caseFile.polityId),
      place = settlementsById.get(caseFile.locationId),
      gov = governmentById[caseFile.polityId];
    const deathEvent = currentEvents.find(
      (event) => event.kind === 'death' && event.personIds.includes(personId),
    );
    if (!person || !alive(person)) {
      emit(
        'custody_ended_death',
        person ? [personId] : [],
        caseFile.locationId,
        '拘留记录因被拘留者死亡而终止。',
        { custodyId: caseFile.id, reason: 'death', classification: 'custody-closure' },
        boundedUnique(caseFile.causeIds, deathEvent?.id ?? caseFile.detentionEventId),
        0.72,
      );
      delete state.custody[personId];
      clearPersonActivities(state, personId);
      continue;
    }
    if (!polity || !place || !gov) {
      delete state.custody[personId];
      continue;
    }
    const freedomImproved =
      !crackdown(gov, caseFile.axis) &&
      freedoms(gov, caseFile.axis) >
        (caseFile.axis === 'religious'
          ? caseFile.religiousFreedomAtIntake
          : caseFile.pressFreedomAtIntake) +
          0.08;
    const regimeChange = polity.leaderId !== caseFile.leaderIdAtIntake;
    const lawCause = currentEvents.find(
      (event) =>
        ['law_reform', 'political_reform', 'political_succession'].includes(event.kind) &&
        event.data.polityId === caseFile.polityId,
    )?.id;
    const leadershipCause = currentEvents.find(
      (event) =>
        ['political_succession', 'political_reform', 'coup'].includes(event.kind) &&
        event.data.polityId === caseFile.polityId,
    )?.id;
    const releaseReason = freedomImproved
      ? 'rights_reformed'
      : regimeChange
        ? 'leadership_changed'
        : w.month >= caseFile.deadline
          ? 'term_expired'
          : undefined;
    if (releaseReason) {
      const causeIds = boundedUnique(
        caseFile.causeIds,
        freedomImproved ? lawCause : regimeChange ? leadershipCause : undefined,
      );
      const released = emit(
        'political_custody_released',
        [personId],
        caseFile.locationId,
        `${person.name}结束了有期限的行政拘留。`,
        { custodyId: caseFile.id, reason: releaseReason, classification: 'custody-release' },
        causeIds,
        0.75,
      );
      scheduleReplan(w, personId, released.id, '拘留结束，可以重新评估中断的计划。');
      state.lastEventIds = boundedUnique(state.lastEventIds, released.id, 64);
      delete state.custody[personId];
      clearPersonActivities(state, personId);
      continue;
    }
    if (!publicCost(w, polity, place, 1)) {
      polity.legitimacy = clamp(polity.legitimacy - 0.012);
      place.unrest = clamp(place.unrest + 0.012);
      const released = emit(
        'political_custody_released',
        [personId],
        caseFile.locationId,
        `${person.name}因拘留设施无法获得财政与口粮而获释；政府合法性和地方秩序受到损害。`,
        { custodyId: caseFile.id, reason: 'maintenance_failed', classification: 'custody-release' },
        caseFile.causeIds,
        0.78,
      );
      scheduleReplan(w, personId, released.id, '拘留设施无力维持，被拘留者获释。');
      state.lastEventIds = boundedUnique(state.lastEventIds, released.id, 64);
      delete state.custody[personId];
      clearPersonActivities(state, personId);
      continue;
    }
    recordFacilityUpkeep(
      state,
      polity.id,
      place.id,
      Math.min(MAX_CAPACITY, Math.max(1, Math.floor((localAdults[polity.id] ?? 0) * 0.01))),
      1,
    );
    person.stress = clamp(person.stress + 0.035);
    person.health = clamp(person.health - 0.004);
    if (person.life) {
      person.life.needs.safety = clamp(person.life.needs.safety + 0.035);
      person.life.needs.autonomy = clamp(person.life.needs.autonomy + 0.06);
    }
    polity.legitimacy = clamp(polity.legitimacy - 0.003);
    place.unrest = clamp(place.unrest + 0.003);
    const profile = w.society?.profiles[personId];
    if (profile) profile.alienation = clamp(profile.alienation + 0.012);
    const affectedRelations = new Map<string, number>();
    for (const rel of person.relationships)
      affectedRelations.set(
        rel.personId,
        Math.max(affectedRelations.get(rel.personId) ?? 0, rel.attachment),
      );
    for (const key of w.society?.relationIndex[personId] ?? []) {
      const relation = w.society?.relations[key];
      if (!relation) continue;
      const relativeId = relation.a === personId ? relation.b : relation.a;
      affectedRelations.set(
        relativeId,
        Math.max(affectedRelations.get(relativeId) ?? 0, relation.attachment),
      );
    }
    for (const [relativeId, attachment] of affectedRelations) {
      const relative = personsById.get(relativeId);
      if (
        !relative ||
        !alive(relative) ||
        relative.journey ||
        relative.locationId !== person.locationId
      )
        continue;
      relative.stress = clamp(relative.stress + Math.min(0.018, attachment * 0.015));
      if (relative.life)
        relative.life.needs.belonging = clamp(relative.life.needs.belonging + 0.015);
    }
  }

  const activeCount: Record<string, number> = {};
  for (const caseFile of Object.values(state.custody))
    activeCount[caseFile.polityId] = (activeCount[caseFile.polityId] ?? 0) + 1;

  for (const activity of Object.values(state.activities)) {
    if (state.custody[activity.personId] || w.month - activity.lastActivity > EVIDENCE_WINDOW)
      continue;
    const person = personsById.get(activity.personId),
      polity = politiesById.get(activity.polityId),
      place = settlementsById.get(activity.locationId),
      gov = governmentById[activity.polityId];
    if (
      !person ||
      !alive(person) ||
      !adult(person, w.month) ||
      person.journey ||
      !polity ||
      !place ||
      !gov ||
      polity.leaderId === person.id ||
      person.locationId !== activity.locationId ||
      place.polityId !== activity.polityId ||
      !crackdown(gov, activity.axis) ||
      (activity.axis === 'political' &&
        activity.ideology !== undefined &&
        activity.ideology === governingIdeology(w, gov)) ||
      (activity.axis === 'religious' &&
        activity.tradition !== undefined &&
        explicitlySharesLeaderFaith(activity.tradition, w, polity)) ||
      activity.months.length < 2 ||
      w.month - activity.months[0] > EVIDENCE_WINDOW
    )
      continue;
    const capacity = Math.min(
      MAX_CAPACITY,
      Math.max(1, Math.floor((localAdults[activity.polityId] ?? 0) * 0.01)),
    );
    if ((activeCount[activity.polityId] ?? 0) >= capacity) continue;
    if (!publicCost(w, polity, place, 1.15)) continue;
    recordFacilityUpkeep(state, polity.id, place.id, capacity, 1.15);
    const causeIds = boundedUnique(activity.evidenceIds);
    const detention = emit(
      activity.axis === 'religious' ? 'religious_custody_started' : 'political_custody_started',
      [person.id],
      place.id,
      `${person.name}因可核验的公开${activity.axis === 'religious' ? '信仰' : '政治'}活动，在低自由度法令下被行政拘留。`,
      {
        polityId: polity.id,
        axis: activity.axis,
        evidenceCount: activity.evidenceIds.length,
        evidenceMonths: activity.months.length,
        deadline: w.month + DETENTION_MONTHS,
        classification: 'time-limited-administrative-custody',
        allegation: '不代表指控已被证明为违法事实',
      },
      causeIds,
      0.78,
    );
    state.custody[person.id] = {
      id: `custody:${detention.id}`,
      personId: person.id,
      polityId: polity.id,
      locationId: place.id,
      axis: activity.axis,
      started: w.month,
      deadline: w.month + DETENTION_MONTHS,
      detentionEventId: detention.id,
      causeIds: [detention.id, ...causeIds].slice(-16),
      leaderIdAtIntake: polity.leaderId,
      pressFreedomAtIntake: gov.laws.pressFreedom,
      religiousFreedomAtIntake: gov.laws.religiousFreedom,
    };
    scheduleReplan(w, person.id, detention.id, '拘留中，原计划暂时无法执行。');
    activeCount[polity.id] = (activeCount[polity.id] ?? 0) + 1;
    state.lastEventIds = boundedUnique(state.lastEventIds, detention.id, 64);
  }
}
