import {
  clamp,
  type Goal,
  type HistoricalEvent,
  type Person,
  type World,
} from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';

export type IdentityAxis =
  | 'care'
  | 'ambition'
  | 'tradition'
  | 'solidarity'
  | 'autonomy'
  | 'pluralism'
  | 'institutionalTrust';
export type IdentityAffiliation = { id: string; confidence: number; evidenceIds: string[] };
export type IdentityProfile = {
  personId: string;
  axes: Record<IdentityAxis, number>;
  pressure: Partial<Record<IdentityAxis, number>>;
  inertia: number;
  evidenceIds: string[];
  lastShiftMonth: number;
  religion?: IdentityAffiliation;
  political?: IdentityAffiliation;
};
export type IdentityState = {
  version: 1;
  profiles: Record<string, IdentityProfile>;
  processedEventSequence: number;
  processedOpaqueEventIds: string[];
};
type AgencyBridge = {
  version: 1;
  agendas: Record<string, { id: string; status: string }>;
  projects: Record<string, unknown>;
  needsReplan: Record<string, { since: number; reason: string; causeIds: string[] }>;
};
type IdentityWorld = World & { identity?: IdentityState; agency?: AgencyBridge };
type Effect = {
  values: Partial<Record<IdentityAxis, number>>;
  goal?: Goal['kind'];
  reason: string;
};

const clampAxis = (n: number) => clamp(n, 0.03, 0.97);
const FAITH_ID = /^faith:[a-z0-9][a-z0-9_-]{0,47}$/;
const POLITICAL_ID =
  /^(?:political:|ideology:)(liberal|conservative|socialist|nationalist|religious|labor|civic)$/;
const validBeliefSource = (p: Person, sourceIds: string[], known: Set<string>) =>
  sourceIds.some((id) => known.has(id) || p.memories.some((memory) => memory.eventId === id));
const eventSequence = (worldId: string, eventId: string) => {
  const match = eventId.match(new RegExp(`^${escapeRegExp(worldId)}:e([0-9]+)$`));
  return match ? Number(match[1]) : undefined;
};
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function ensureIdentity(w: World): IdentityState {
  const state = ((w as IdentityWorld).identity ??= {
    version: 1,
    profiles: {},
    processedEventSequence: 0,
    processedOpaqueEventIds: [],
  });
  return state;
}

/** Apply attributable experiences and sparse, evidence-backed belief transmission. */
export function advanceIdentity(
  w: World,
  emit: Emit,
  locals: Map<string, Person[]>,
  experiences: HistoricalEvent[],
): IdentityState {
  const state = ensureIdentity(w),
    world = w as IdentityWorld,
    people = new Map(w.persons.map((p) => [p.id, p]));
  const fresh = uniqueFreshEvents(w.id, state, experiences);
  const knownEvidence = new Set(fresh.map((event) => event.id));
  const presentByLocation = new Map(
    [...locals].map(([locationId, present]) => [locationId, new Set(present.map((p) => p.id))]),
  );
  const byPerson = new Map<string, HistoricalEvent[]>();
  const politicalContacts = new Map<string, { ideology: string; event: HistoricalEvent }>();
  for (const event of fresh)
    for (const personId of new Set(event.personIds)) {
      const person = people.get(personId);
      if (!person) continue;
      const list = byPerson.get(personId) ?? [];
      list.push(event);
      byPerson.set(personId, list);
      const contact = politicalContactForEvent(world, person, event);
      if (contact) politicalContacts.set(personId, contact);
    }

  for (const [personId, candidates] of byPerson) {
    const person = people.get(personId)!;
    if (person.death !== undefined) continue;
    const selected = candidates
      .filter((event) => event.significance >= 0.5)
      .sort(
        (a, b) => b.significance - a.significance || a.month - b.month || a.id.localeCompare(b.id),
      )
      .slice(0, 8)
      .sort((a, b) => a.month - b.month || a.id.localeCompare(b.id));
    if (!selected.length) continue;
    const profile = getProfile(state, person);
    const aggregate: Partial<Record<IdentityAxis, number>> = {};
    const causes: string[] = [];
    let targetGoal: Goal['kind'] | undefined,
      shiftReason = '';
    for (const event of selected) {
      const effect = experienceEffect(person, event);
      if (!effect) continue;
      const weight = clamp(event.significance, 0.4, 1);
      for (const [axis, raw] of Object.entries(effect.values) as [IdentityAxis, number][]) {
        const delta = raw * weight * (1 - profile.inertia * 0.6);
        if (!delta) continue;
        const before = axisValue(profile, person, axis);
        // Existing values outside the profile's preferred interval move gradually;
        // clipping is never falsely reported as a response to an experience.
        const after = clamp(before + delta, Math.min(before, 0.03), Math.max(before, 0.97));
        const applied = after - before;
        if (Math.abs(applied) < 1e-9) continue;
        setAxis(profile, person, axis, after);
        profile.pressure[axis] = clamp((profile.pressure[axis] ?? 0) + applied, -0.3, 0.3);
        aggregate[axis] = (aggregate[axis] ?? 0) + applied;
      }
      causes.push(event.id);
      if (effect.goal) targetGoal = effect.goal;
      shiftReason = effect.reason;
      profile.evidenceIds = appendUnique(profile.evidenceIds, event.id, 32);
    }
    if (!causes.length) continue;
    const peak = Math.max(0, ...Object.values(aggregate).map((x) => Math.abs(x ?? 0)));
    const accumulated = Math.max(...Object.values(profile.pressure).map((x) => Math.abs(x ?? 0)));
    if (peak > 0 && (peak >= 0.035 || accumulated >= 0.075)) {
      const evidence = causes.slice(-8);
      const e = emit(
        'identity_shift',
        [person.id],
        person.locationId,
        `${person.name}因${shiftReason}，${describeIdentityShift(aggregate)}。`,
        {
          changes: Object.fromEntries(
            Object.entries(aggregate).filter(([, delta]) => Math.abs(delta ?? 0) >= 1e-9),
          ),
          reason: shiftReason,
          classification: 'experience-attributed-identity-change',
        },
        evidence,
        0.78,
      );
      profile.lastShiftMonth = w.month;
      profile.evidenceIds = appendUnique(profile.evidenceIds, e.id, 32);
      for (const axis of Object.keys(aggregate) as IdentityAxis[]) profile.pressure[axis] = 0;
      if (targetGoal) transitionGoal(person, targetGoal, e.id, shiftReason);
      requestIdentityReplan(world, person, e.id, shiftReason);
    } else if (
      targetGoal &&
      !person.goals.some((goal) => goal.status === 'active' && goal.kind === targetGoal)
    ) {
      const labels: Record<Goal['kind'], string> = {
        survive: '应对眼前的生存处境',
        belong: '重新建立归属与依靠',
        learn: '继续求知与探索',
        reform: '改变造成伤害的制度',
        prosper: '改善物质生活',
      };
      const e = emit(
        'goal_transition',
        [person.id],
        person.locationId,
        `${person.name}因${shiftReason}，将生活重心转向${labels[targetGoal]}。`,
        {
          adopted: targetGoal,
          abandonedGoalIds: person.goals
            .filter((goal) => goal.status === 'active')
            .map((goal) => goal.id),
          reason: shiftReason,
          classification: 'experience-attributed-priority-change',
        },
        causes.slice(-8),
        0.78,
      );
      transitionGoal(person, targetGoal, e.id, shiftReason);
      profile.evidenceIds = appendUnique(profile.evidenceIds, e.id, 32);
      requestIdentityReplan(world, person, e.id, shiftReason);
    }
  }

  const propagated = new Set<string>();
  let propagationCount = 0;
  for (const event of fresh) {
    if (!isBeliefContact(event)) continue;
    const rumor =
      event.kind === 'rumor' ||
      event.kind === 'belief_rumor' ||
      event.data.classification === 'rumor';
    for (const sourceId of event.personIds.slice(0, 16)) {
      const source = people.get(sourceId);
      if (
        !source ||
        source.death !== undefined ||
        source.journey ||
        !presentByLocation.get(source.locationId)?.has(source.id)
      )
        continue;
      const claims = source.beliefs
        .filter(
          (belief) =>
            belief.confidence >= 0.35 && validBeliefSource(source, belief.sourceIds, knownEvidence),
        )
        .slice(-2);
      if (!claims.length) continue;
      for (const { person: recipient, tieStrength } of reachablePeople(
        w,
        source,
        presentByLocation,
        people,
      )) {
        if (recipient.id === source.id || recipient.death !== undefined) continue;
        for (const belief of claims) {
          if (propagationCount >= 256) break;
          const key = `${event.id}\u0000${source.id}\u0000${recipient.id}\u0000${belief.claimId}`;
          if (propagated.has(key)) continue;
          propagated.add(key);
          const prior = recipient.beliefs.find((item) => item.claimId === belief.claimId);
          const before = prior?.confidence ?? 0;
          const delta = rumor ? -0.035 * tieStrength : 0.08 * tieStrength;
          const next = clamp(before + delta, rumor ? 0 : 0.08, 0.94);
          if (Math.abs(next - before) < 0.005) continue;
          const sourceEvidence = belief.sourceIds.slice(-2);
          const influence = emit(
            'belief_influenced',
            [source.id, recipient.id],
            recipient.locationId,
            `${recipient.name}通过与熟人的接触调整了对一项主张的信心。`,
            {
              claimId: belief.claimId,
              previousConfidence: before,
              confidence: next,
              transmission: rumor ? 'rumor' : 'relationship-or-institution',
              classification: 'belief-not-fact',
            },
            [event.id, ...sourceEvidence],
            0.48,
          );
          if (prior) {
            prior.confidence = next;
            prior.sourceIds = appendUnique(prior.sourceIds, influence.id, 8);
          } else if (!rumor && recipient.beliefs.length < 24) {
            recipient.beliefs.push({
              claimId: belief.claimId,
              confidence: next,
              sourceIds: [belief.sourceIds.at(-1)!, event.id, influence.id]
                .filter(Boolean)
                .slice(-8),
            });
          }
          const targetProfile = getProfile(state, recipient);
          targetProfile.evidenceIds = appendUnique(targetProfile.evidenceIds, influence.id, 32);
          propagationCount++;
        }
      }
    }
  }

  for (const person of w.persons) {
    if (person.death !== undefined) continue;
    const profile = state.profiles[person.id];
    const social = world.society?.profiles[person.id];
    if (
      !person.beliefs.length &&
      !profile?.religion &&
      !profile?.political &&
      !social?.religionId &&
      !social?.politicalId &&
      !politicalContacts.has(person.id)
    )
      continue;
    reconcileAffiliations(
      world,
      person,
      profile ?? getProfile(state, person),
      emit,
      politicalContacts.get(person.id),
    );
  }
  return state;
}

function uniqueFreshEvents(worldId: string, state: IdentityState, input: HistoricalEvent[]) {
  const opaque = new Set(state.processedOpaqueEventIds),
    seenBatch = new Set<string>();
  const ordered = input
    .filter((event) => event.worldId === worldId)
    .slice()
    .sort((a, b) => a.month - b.month || compareSequence(worldId, a.id, b.id));
  const fresh: HistoricalEvent[] = [];
  for (const event of ordered) {
    if (seenBatch.has(event.id)) continue;
    seenBatch.add(event.id);
    const sequence = eventSequence(worldId, event.id);
    if (sequence !== undefined) {
      if (sequence <= state.processedEventSequence) continue;
      state.processedEventSequence = sequence;
    } else {
      if (opaque.has(event.id)) continue;
      state.processedOpaqueEventIds.push(event.id);
      opaque.add(event.id);
    }
    fresh.push(event);
  }
  if (state.processedOpaqueEventIds.length > 4096)
    state.processedOpaqueEventIds = state.processedOpaqueEventIds.slice(-4096);
  return fresh;
}

function compareSequence(worldId: string, a: string, b: string) {
  const x = eventSequence(worldId, a),
    y = eventSequence(worldId, b);
  return x !== undefined && y !== undefined ? x - y : a.localeCompare(b);
}

function experienceEffect(p: Person, event: HistoricalEvent): Effect | undefined {
  const kind = event.kind.toLowerCase(),
    victimIds = event.personIds.filter((id) => id !== p.id);
  if (kind === 'goal_transition' && typeof event.data.fulfilled !== 'string') return undefined;
  if (kind === 'bereavement') {
    const close = victimIds.some((id) => {
      const rel = p.relationships.find((r) => r.personId === id);
      return (
        p.parents.includes(id) ||
        (rel !== undefined &&
          ['kin', 'partner', 'friend'].includes(rel.kind) &&
          rel.attachment >= 0.35)
      );
    });
    if (!close) return undefined;
    return {
      values: close
        ? { care: 0.045, solidarity: 0.075, tradition: 0.018, autonomy: 0.012 }
        : { care: 0.018, solidarity: 0.028 },
      goal: 'belong',
      reason: close ? '亲密关系丧失' : '关系网络中的死亡',
    };
  }
  if (isPersecution(event))
    return {
      values: { solidarity: 0.085, autonomy: 0.065, institutionalTrust: -0.075, tradition: -0.022 },
      goal: 'reform',
      reason: '亲历政治迫害或群体排斥',
    };
  if (kind === 'social_betrayal') {
    const betrayed = event.personIds[0] !== p.id;
    return betrayed
      ? {
          values: { institutionalTrust: -0.085, autonomy: 0.045, solidarity: -0.018 },
          goal: 'reform',
          reason: '信任关系中的背叛',
        }
      : {
          values: { ambition: 0.025, care: -0.035, institutionalTrust: -0.015 },
          reason: '以个人收益破坏互助承诺',
        };
  }
  if (['agency_aid', 'mutual_aid', 'aid_received', 'relief_received'].includes(kind)) {
    const recipient = event.personIds.at(-1) === p.id || event.data.recipientId === p.id;
    return recipient
      ? {
          values: { care: 0.022, solidarity: 0.065, institutionalTrust: 0.052 },
          reason: '获得来自他人或团体的救助',
        }
      : {
          values: { care: 0.04, solidarity: 0.048, autonomy: 0.015 },
          reason: '实际参与救助',
        };
  }
  if (isWarExperience(event))
    return {
      values: { care: 0.026, solidarity: 0.052, autonomy: 0.032, tradition: -0.012 },
      goal: 'survive',
      reason: '亲历战争或流离风险',
    };
  if (
    ['agenda_step_failed', 'plan_failed', 'research_saturated', 'project_failed'].includes(kind)
  ) {
    const resourceFailure = /资金|资源|工资|生活费/.test(String(event.data.reason ?? event.text));
    return {
      values: resourceFailure
        ? { ambition: -0.025, autonomy: -0.034, institutionalTrust: -0.012 }
        : { autonomy: -0.025, pluralism: 0.028, ambition: -0.008 },
      reason: resourceFailure ? '资源约束使计划失败' : '尝试失败后修正判断',
    };
  }
  if (
    [
      'agenda_step_completed',
      'innovation',
      'career_progress',
      'job_found',
      'goal_transition',
    ].includes(kind)
  ) {
    const action = String(event.data.action ?? ''),
      targetedCare = ['care', 'aid', 'socialize'].includes(action),
      chosenGoal: Goal['kind'] | undefined =
        action === 'campaign' ? 'reform' : kind === 'innovation' ? 'learn' : undefined;
    return targetedCare
      ? {
          values: { care: 0.023, solidarity: 0.035, autonomy: 0.012 },
          reason: '付出行动改善他人处境',
        }
      : {
          values: {
            ambition: 0.028,
            autonomy: 0.018,
            pluralism: kind === 'innovation' || action === 'research' ? 0.038 : 0.018,
            tradition: action === 'faith' ? 0.025 : 0,
          },
          goal: chosenGoal,
          reason: '行动成功或能力取得进展',
        };
  }
  if (kind === 'conviction_changed')
    return {
      values: { ambition: -0.022, autonomy: -0.024, institutionalTrust: -0.018 },
      goal: 'survive',
      reason: '持续困顿改变了生活优先级',
    };
  return undefined;
}

function isPersecution(event: HistoricalEvent) {
  return (
    /persecution|political_repression|persecution_evidence|custody_started/i.test(event.kind) ||
    event.data.kind === 'persecution' ||
    event.data.classification === 'persecution-evidence'
  );
}
function isWarExperience(event: HistoricalEvent) {
  return (
    /combat_casualty|war_casualty|battle|civilian_displacement|war_exposure/i.test(event.kind) ||
    event.data.kind === 'war_casualty' ||
    event.data.classification === 'war-casualty' ||
    (event.data.kind === 'war' && event.personIds.length > 0)
  );
}
function isBeliefContact(event: HistoricalEvent) {
  return (
    [
      'faith_witness',
      'belief_shared',
      'political_meeting',
      'political_commitment',
      'agency_aid',
      'mutual_aid',
    ].includes(event.kind) ||
    (event.kind === 'agenda_step_completed' &&
      ['campaign', 'faith', 'publish'].includes(String(event.data.action))) ||
    event.kind === 'rumor' ||
    event.kind === 'belief_rumor' ||
    event.data.classification === 'rumor'
  );
}

function getProfile(state: IdentityState, p: Person): IdentityProfile {
  return (state.profiles[p.id] ??= {
    personId: p.id,
    axes: {
      care: p.values.care,
      ambition: p.values.ambition,
      tradition: p.values.tradition,
      solidarity: clampAxis(p.values.care),
      autonomy: clampAxis(p.life?.needs.autonomy ?? 0.5),
      pluralism: clampAxis(p.life?.personality.openness ?? p.skills.learning),
      institutionalTrust: 0.5,
    },
    pressure: {},
    inertia: 0.35,
    evidenceIds: [],
    lastShiftMonth: -1,
  });
}
function axisValue(profile: IdentityProfile, p: Person, axis: IdentityAxis) {
  if (axis === 'care' || axis === 'ambition' || axis === 'tradition') return p.values[axis];
  return profile.axes[axis];
}
function setAxis(profile: IdentityProfile, p: Person, axis: IdentityAxis, value: number) {
  profile.axes[axis] = value;
  if (axis === 'care' || axis === 'ambition' || axis === 'tradition') p.values[axis] = value;
}
function appendUnique(list: string[], value: string, limit: number) {
  return [value, ...list.filter((item) => item !== value)].slice(0, limit);
}
function describeIdentityShift(changes: Partial<Record<IdentityAxis, number>>) {
  const descriptions: Record<IdentityAxis, [string, string]> = {
    care: ['更重视照料与关怀', '降低了照料与关怀的优先度'],
    ambition: ['更看重个人成就', '减少了对个人成就的追求'],
    tradition: ['更看重传统延续', '降低了传统对选择的影响'],
    solidarity: ['更重视互助与共同承担', '减少了对集体互助的投入'],
    autonomy: ['更重视自主决定', '更愿意接受他人安排'],
    pluralism: ['更愿意考虑不同观点', '更少考虑相异观点'],
    institutionalTrust: ['更信任现有制度', '不再像以前那样信任现有制度'],
  };
  const strongest = Object.entries(changes)
    .filter((entry): entry is [IdentityAxis, number] => Math.abs(entry[1] ?? 0) >= 0.005)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]) || a[0].localeCompare(b[0]))
    .slice(0, 2);
  const phrases = strongest.map(([axis, delta]) => descriptions[axis][delta > 0 ? 0 : 1]);
  return phrases.length ? phrases.join('，并且') : '调整了部分生活优先级';
}

function transitionGoal(p: Person, kind: Goal['kind'], causeId: string, reason: string) {
  const active = p.goals.find((goal) => goal.status === 'active' && goal.kind === kind);
  if (active) {
    active.strength = clamp(active.strength + 0.08);
    active.causeIds = appendUnique(active.causeIds, causeId, 12);
    active.reason = reason;
    return;
  }
  for (const goal of p.goals)
    if (goal.status === 'active') {
      goal.status = 'abandoned';
      goal.reason = `identity:${reason}`;
      goal.causeIds = appendUnique(goal.causeIds, causeId, 12);
    }
  p.goals.push({
    id: `goal-${p.id}-${causeId}`,
    kind,
    strength: 0.58,
    progress: 0,
    status: 'active',
    causeIds: [causeId],
    reason,
  });
}

function requestIdentityReplan(w: IdentityWorld, p: Person, causeId: string, reason: string) {
  const agency = (w.agency ??= { version: 1, agendas: {}, projects: {}, needsReplan: {} }),
    previous = agency.needsReplan[p.id];
  if (previous) {
    previous.reason = `身份经历：${reason}`;
    previous.causeIds = appendUnique(previous.causeIds, causeId, 12).reverse();
  } else {
    agency.needsReplan[p.id] = {
      since: w.month,
      reason: `身份经历：${reason}`,
      causeIds: [causeId],
    };
  }
}

function reachablePeople(
  w: World,
  source: Person,
  presentByLocation: Map<string, Set<string>>,
  people: Map<string, Person>,
) {
  if (source.journey || !presentByLocation.get(source.locationId)?.has(source.id)) return [];
  const strengths = new Map<string, number>();
  for (const rel of source.relationships
    .slice()
    .sort((a, b) => b.trust - a.trust || a.personId.localeCompare(b.personId))
    .slice(0, 8)) {
    if (rel.trust < 0.35) continue;
    strengths.set(rel.personId, Math.max(strengths.get(rel.personId) ?? 0, clamp(rel.trust, 0, 1)));
  }
  const social = w.society?.profiles[source.id];
  for (const institutionId of (social?.institutionIds ?? []).slice(0, 3)) {
    const institution = w.society?.institutions[institutionId];
    for (const id of (institution?.members ?? []).slice(0, 16))
      strengths.set(id, Math.max(strengths.get(id) ?? 0, 0.52));
  }
  for (const organization of w.organizations.slice(0, 128))
    if (organization.status === 'active' && organization.memberIds.includes(source.id))
      for (const id of organization.memberIds.slice(0, 16))
        strengths.set(id, Math.max(strengths.get(id) ?? 0, 0.5));
  return [...strengths]
    .sort(([a, ax], [b, bx]) => bx - ax || a.localeCompare(b))
    .slice(0, 4)
    .flatMap(([id, tieStrength]) => {
      const person = people.get(id),
        present = presentByLocation.get(source.locationId)?.has(id);
      return person && !person.journey && present ? [{ person, tieStrength }] : [];
    });
}

function reconcileAffiliations(
  w: IdentityWorld,
  p: Person,
  profile: IdentityProfile,
  emit: Emit,
  politicalContact: { ideology: string; event: HistoricalEvent } | undefined,
) {
  const evidenced = new Set([
    ...p.memories.map((memory) => memory.eventId),
    ...profile.evidenceIds,
  ]);
  const candidates = p.beliefs
    .filter(
      (belief) => belief.confidence >= 0.65 && validBeliefSource(p, belief.sourceIds, evidenced),
    )
    .sort((a, b) => b.confidence - a.confidence);
  const faith = candidates.find((belief) => FAITH_ID.test(belief.claimId));
  const political = candidates.find((belief) => POLITICAL_ID.test(belief.claimId));
  const weakFaith =
    profile.religion && p.beliefs.find((belief) => belief.claimId === profile.religion!.id);
  const weakPolitical =
    profile.political &&
    p.beliefs.find(
      (belief) => belief.claimId.replace(/^(political:|ideology:)/, '') === profile.political!.id,
    );
  const social = w.society?.profiles[p.id];
  const socialEvidence = (axis: 'religion' | 'political') =>
    social?.identityEvidence[axis]?.find((id) => evidenced.has(id));
  const faithId =
    faith?.claimId ??
    (social?.religionId && socialEvidence('religion') ? social.religionId : undefined);
  const politicalId =
    political?.claimId.replace(/^(political:|ideology:)/, '') ??
    politicalContact?.ideology ??
    (social?.politicalId && socialEvidence('political') ? social.politicalId : undefined);
  updateAffiliation(
    w,
    p,
    profile,
    'religion',
    faithId,
    faith?.confidence ?? (faithId ? 0.68 : (weakFaith?.confidence ?? 0.68)),
    faith?.sourceIds ?? [],
    emit,
  );
  updateAffiliation(
    w,
    p,
    profile,
    'political',
    politicalId,
    political?.confidence ??
      (politicalContact ? 0.72 : politicalId ? 0.68 : (weakPolitical?.confidence ?? 0.68)),
    political?.sourceIds ?? (politicalContact ? [politicalContact.event.id] : []),
    emit,
  );
}

function politicalContactForEvent(w: IdentityWorld, p: Person, event: HistoricalEvent) {
  const agenda = w.agency?.agendas[p.id] as
    { cursor: number; steps?: { action?: string; ideology?: string }[] } | undefined;
  let ideology = typeof event.data.ideology === 'string' ? event.data.ideology : undefined;
  if (event.kind === 'agenda_step_completed' && event.data.action === 'campaign') {
    const step = agenda?.steps?.[Math.max(0, agenda.cursor - 1)];
    ideology ??= step?.ideology ?? 'liberal';
  }
  if (!ideology && ['political_commitment', 'political_meeting', 'campaign'].includes(event.kind))
    ideology = typeof event.data.position === 'string' ? event.data.position : undefined;
  if (
    ideology &&
    /^(liberal|conservative|socialist|nationalist|religious|labor|civic)$/.test(ideology)
  )
    return { ideology, event };
}

function updateAffiliation(
  w: IdentityWorld,
  p: Person,
  profile: IdentityProfile,
  axis: 'religion' | 'political',
  next: string | undefined,
  confidence: number,
  sourceIds: string[],
  emit: Emit,
) {
  const current = profile[axis];
  if (current && next && current.id === next) {
    current.confidence = clamp(confidence);
    const latestEvidence = sourceIds.at(-1);
    if (latestEvidence) current.evidenceIds = appendUnique(current.evidenceIds, latestEvidence, 8);
    return;
  }
  if (!next) {
    if (current && confidence <= 0.35) {
      delete profile[axis];
      const lost = emit(
        'identity_affiliation_lost',
        [p.id],
        p.locationId,
        `${p.name}对原有身份归属的信心已明显减弱。`,
        { axis, before: current.id, confidence },
        current.evidenceIds.slice(-4),
        0.7,
      );
      requestIdentityReplan(w, p, lost.id, `${axis}归属改变`);
    }
    return;
  }
  if (axis === 'religion' && !FAITH_ID.test(next)) return;
  if (
    axis === 'political' &&
    !/^(liberal|conservative|socialist|nationalist|religious|labor|civic)$/.test(next)
  )
    return;
  const e = emit(
    'identity_affiliation_changed',
    [p.id],
    p.locationId,
    `${p.name}因明确的信念或团体经历形成了新的${axis === 'religion' ? '信仰' : '政治'}归属。`,
    { axis, before: current?.id, after: next, confidence, classification: 'evidenced-affiliation' },
    [...new Set([...sourceIds, ...(current?.evidenceIds ?? [])])].slice(-8),
    0.72,
  );
  profile[axis] = {
    id: next,
    confidence: clamp(confidence),
    evidenceIds: [e.id, ...sourceIds].slice(0, 8),
  };
  transitionGoal(p, axis === 'religion' ? 'belong' : 'reform', e.id, `${axis}归属改变`);
  requestIdentityReplan(w, p, e.id, `${axis}归属改变`);
}
