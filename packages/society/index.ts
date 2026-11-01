import { clamp, type Person, type World } from '../contracts/index.js';
import { appendCauseId } from '../cognition/index.js';
import type { Emit } from '../simulation-core/index.js';
import { z } from 'zod';

export const FaithTraditionSchema = z
  .string()
  .regex(/^faith:[a-z0-9][a-z0-9_-]{0,47}$/)
  .max(54);

export type SocialClass = 'destitute' | 'working' | 'skilled' | 'professional' | 'elite';
export type SocietyRelationKind =
  'kin' | 'companion' | 'friend' | 'dependent' | 'mentor' | 'rival' | 'enemy';
export type SocietyRelation = {
  a: string;
  b: string;
  kind: SocietyRelationKind;
  trust: number;
  attachment: number;
  reciprocity: number;
  contacts: number;
  since: number;
  causeIds: string[];
  lastContact: number;
};
export type SocialProfile = {
  personId: string;
  socialClass: SocialClass;
  cultureId: string;
  religionId?: string;
  politicalId?: string;
  institutionIds: string[];
  identityEvidence: Record<string, string[]>;
  activeStrikeId?: string;
  wagePressure: number;
  safetyNet: number;
  mobility: number;
  alienation: number;
  bereavedIds: string[];
};
export type SocialInstitution = {
  id: string;
  kind: 'faith' | 'union' | 'mutual_aid' | 'political';
  label: string;
  locationId: string;
  beliefId?: string;
  position?: 'reform' | 'traditional' | 'labor' | 'civic';
  members: string[];
  treasury: number;
  dues: number;
  monthlyUpkeep: number;
  founded: number;
  causeIds: string[];
  status: 'active' | 'dissolved';
};
export type LaborDispute = {
  id: string;
  locationId: string;
  participants: string[];
  starts: number;
  until: number;
  status: 'active' | 'ended';
  causeIds: string[];
};
export type SocietyState = {
  laborDisputes?: Record<string, LaborDispute>;
  profiles: Record<string, SocialProfile>;
  relations: Record<string, SocietyRelation>;
  institutions: Record<string, SocialInstitution>;
  relationIndex: Record<string, string[]>;
  locationIndex: Record<string, string[]>;
  month: number;
  sequence: number;
  lifeAppliedMonth: number;
};

type SocietyWorld = World & { society?: SocietyState };
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};
const relationKey = (a: string, b: string) => JSON.stringify([a, b].sort());
const live = (p: Person) => p.death === undefined;
const faithKey = (claim: string): string | undefined => {
  const parsed = FaithTraditionSchema.safeParse(claim);
  return parsed.success ? parsed.data.slice(6) : undefined;
};
const classFor = (p: Person): SocialClass => {
  const life = p.life;
  const resources = p.coin + (life?.education.level ?? 0) * 9 + (life?.career.level ?? 0) * 4;
  if (resources < 5 || p.occupation === '失业') return 'destitute';
  if (resources < 24 || /农|工|役|学徒|仆|佣|矿/.test(p.occupation)) return 'working';
  if (resources < 70 || (life?.career.level ?? 0) < 3) return 'skilled';
  if (resources < 220) return 'professional';
  return 'elite';
};
function ensureState(w: SocietyWorld): SocietyState {
  return (w.society ??= {
    profiles: {},
    relations: {},
    institutions: {},
    relationIndex: {},
    locationIndex: {},
    month: -1,
    sequence: 0,
    lifeAppliedMonth: -1,
  });
}

/** Monthly social systems. Linear indexing and a fixed contact budget keep the pass safe for large populations. */
export function advanceSociety(w: World, emit: Emit, locals: Map<string, Person[]>): void {
  const state = ensureState(w as SocietyWorld);
  if (state.month === w.month) return;
  state.month = w.month;
  state.laborDisputes ??= {};
  for (const dispute of Object.values(state.laborDisputes))
    if (dispute.status === 'active' && w.month >= dispute.until) {
      dispute.status = 'ended';
      for (const id of dispute.participants)
        if (state.profiles[id]?.activeStrikeId === dispute.id)
          delete state.profiles[id].activeStrikeId;
      emit(
        'labor_action_ended',
        dispute.participants.slice(0, 8),
        dispute.locationId,
        '本次停工行动结束，诉求与人际关系的后果仍然保留。',
        { disputeId: dispute.id },
        dispute.causeIds,
        0.65,
      );
    }

  const liveById = new Map<string, Person>();
  const settlementIndex = new Map(w.settlements.map((s) => [s.id, s]));
  const allById = new Map<string, Person>(w.persons.map((p) => [p.id, p]));
  let classEvents = 0;
  state.locationIndex = {};
  for (const [locationId, input] of locals) {
    for (const p of input) allById.set(p.id, p);
    const people = input.filter(live).sort((a, b) => a.id.localeCompare(b.id));
    state.locationIndex[locationId] = people.map((p) => p.id);
    for (const p of people) liveById.set(p.id, p);
    for (const p of people) {
      let profile = state.profiles[p.id];
      if (!profile) {
        const parents = p.parents.filter((id) => state.profiles[id]);
        const inheritedCulture = parents.map((id) => state.profiles[id].cultureId).sort()[0];
        profile = state.profiles[p.id] = {
          personId: p.id,
          socialClass: classFor(p),
          cultureId: inheritedCulture ?? `local:${p.originCohortId}`,
          institutionIds: [],
          identityEvidence: inheritedCulture
            ? {
                culture: parents.flatMap((id) => state.profiles[id].identityEvidence.culture ?? []),
              }
            : {},
          wagePressure: 0,
          safetyNet: 0,
          mobility: 0,
          alienation: 0,
          bereavedIds: [],
        };
        // Baseline culture is sourced from originCohortId; an initial value is not a change event.
      }
      const nextClass = classFor(p);
      if (nextClass !== profile.socialClass) {
        const before = profile.socialClass;
        profile.socialClass = nextClass;
        profile.mobility = clamp(
          profile.mobility +
            (['destitute', 'working', 'skilled', 'professional', 'elite'].indexOf(nextClass) -
              ['destitute', 'working', 'skilled', 'professional', 'elite'].indexOf(before)) *
              0.2,
          -1,
          1,
        );
        if (classEvents < 128) {
          const e = emit(
            'social_mobility',
            [p.id],
            p.locationId,
            `${p.name}的生活资源与职业经历使其社会阶层从${before}转为${nextClass}。`,
            { before, after: nextClass, coin: p.coin, occupation: p.occupation },
            [],
            0.62,
          );
          profile.identityEvidence.class = [...(profile.identityEvidence.class ?? []), e.id].slice(
            -8,
          );
          classEvents++;
        }
      }
      const settlement = settlementIndex.get(locationId);
      profile.wagePressure = clamp(
        (settlement?.scarcity ?? 0) * 0.48 +
          (settlement?.unrest ?? 0) * 0.2 +
          (settlement?.economy?.unemployment ?? 0) * 0.45 +
          (profile.socialClass === 'destitute' ? 0.25 : 0),
      );
      profile.alienation = clamp(profile.alienation - 0.003 + profile.wagePressure * 0.004);
      if (profile.religionId) {
        const confidence = p.beliefs
          .filter((b) => `faith:${faithKey(b.claimId)}` === profile.religionId)
          .reduce((n, b) => Math.max(n, b.confidence), 0);
        if (confidence < 0.25) {
          const causeId = profile.identityEvidence.religion?.[0];
          if (causeId) leaveFaith(state, p, profile, w, emit, causeId);
        }
      }
    }
  }
  for (const p of liveById.values())
    for (const id of p.parents) {
      const q = liveById.get(id);
      if (q) addRelation(state, p, q, 'kin', 0.55, w.month, []);
    }
  // Mirror already-committed core ties into the social graph; this enriches existing pairs without creating a second marriage.
  for (const p of liveById.values())
    for (const legacy of p.relationships) {
      const q = liveById.get(legacy.personId);
      if (!q) continue;
      const kind: SocietyRelationKind =
        legacy.kind === 'kin'
          ? 'kin'
          : legacy.kind === 'friend'
            ? 'friend'
            : legacy.kind === 'rival'
              ? 'rival'
              : 'companion';
      const key = relationKey(p.id, q.id),
        existed = !!state.relations[key];
      addRelation(state, p, q, kind, legacy.trust, legacy.since, legacy.causeIds ?? []);
      if (!existed) {
        const relation = state.relations[key];
        relation.trust = legacy.trust;
        relation.attachment = legacy.attachment;
        relation.contacts = legacy.contacts ?? 0;
      }
    }

  // Bereavement is a durable personal consequence sourced from a recorded death.
  const baseUpdated = new Set<string>();
  for (const p of liveById.values()) {
    const profile = state.profiles[p.id];
    for (const parentId of p.parents) {
      const parent = allById.get(parentId);
      if (!parent || parent.death === undefined || profile.bereavedIds.includes(parentId)) continue;
      const prior = state.relations[relationKey(p.id, parentId)];
      const e = emit(
        'family_loss',
        [p.id],
        p.locationId,
        `${p.name}失去了亲人${parent.name}；两人之间积累的亲缘依附使其承受哀伤。`,
        { deceasedId: parentId, attachment: prior?.attachment ?? 0.45 },
        prior?.causeIds ?? [],
        0.82,
      );
      profile.bereavedIds.push(parentId);
      profile.identityEvidence.family = [e.id, ...(profile.identityEvidence.family ?? [])].slice(
        0,
        8,
      );
      p.stress = clamp(p.stress + 0.12, 0, 1);
      if (p.life) {
        p.life.emotions.grief = clamp(p.life.emotions.grief + 0.22);
        p.life.needs.belonging = clamp(p.life.needs.belonging - 0.18);
      }
      for (const goal of p.goals)
        if (goal.status === 'active' && goal.kind === 'belong') appendCauseId(goal.causeIds, e.id);
    }
  }

  // Existing households seed kin/dependent ties without duplicating Person.relationships.
  const householdMembers = new Map<string, Person[]>();
  for (const p of liveById.values()) {
    const xs = householdMembers.get(p.householdId) ?? [];
    xs.push(p);
    householdMembers.set(p.householdId, xs);
  }
  for (const xs of householdMembers.values())
    if (xs.length > 1) {
      xs.sort((a, b) => a.id.localeCompare(b.id));
      // A sparse chain gives each large household an inspectable local tie without all-pairs work.
      for (let i = 1; i < xs.length; i++) {
        const a = xs[i - 1],
          b = xs[i];
        if (a.parents.includes(b.id) || b.parents.includes(a.id))
          addRelation(state, a, b, 'kin', 0.52, w.month, []);
        else if (!state.relations[relationKey(a.id, b.id)])
          addRelation(state, a, b, 'dependent', 0.35, w.month, []);
      }
    }

  // Household dependence moves coin from an able caregiver to a poor child or elder.
  const supported = new Set<string>();
  for (const person of liveById.values()) {
    for (const key of state.relationIndex[person.id] ?? []) {
      if (supported.has(key)) continue;
      const relation = state.relations[key];
      if (!relation || !['kin', 'dependent'].includes(relation.kind)) continue;
      const otherId = relation.a === person.id ? relation.b : relation.a,
        other = liveById.get(otherId);
      if (!other) continue;
      const agePerson = w.month - person.birth,
        ageOther = w.month - other.birth;
      const personNeeds = agePerson < 216 || agePerson > 780 || person.coin < 2;
      const otherNeeds = ageOther < 216 || ageOther > 780 || other.coin < 2;
      const caregiver =
        personNeeds && !otherNeeds ? other : otherNeeds && !personNeeds ? person : undefined;
      const dependent = caregiver === person ? other : person;
      if (!caregiver || caregiver.coin <= 8 || dependent.coin >= 5) continue;
      const amount = Math.min(2, caregiver.coin - 8, 5 - dependent.coin);
      if (amount <= 0) continue;
      supported.add(key);
      caregiver.coin -= amount;
      dependent.coin += amount;
      relation.trust = clamp(relation.trust + 0.04, -1, 1);
      relation.attachment = clamp(relation.attachment + 0.025);
      const e = emit(
        'family_support',
        [caregiver.id, dependent.id],
        caregiver.locationId,
        `${caregiver.name}把部分积蓄交给需要照护的${dependent.name}，维持其日常生活。`,
        {
          amount,
          relation: relation.kind,
          roles: { giver: caregiver.id, dependent: dependent.id },
        },
        relation.causeIds,
        0.64,
      );
      appendCauseId(relation.causeIds, e.id);
      state.profiles[dependent.id].safetyNet = clamp(
        state.profiles[dependent.id].safetyNet + amount / 20,
      );
    }
  }

  // Every connected person receives one deterministic bond update per month, rotating through their ties.
  for (const p of liveById.values()) {
    const keys = state.relationIndex[p.id] ?? [];
    if (!keys.length) continue;
    const relation = state.relations[keys[w.month % keys.length]];
    if (!relation || baseUpdated.has(relation.a + '\0' + relation.b)) continue;
    const counterpart = relation.a === p.id ? relation.b : relation.a;
    const q = liveById.get(counterpart);
    if (!q) continue;
    baseUpdated.add(relation.a + '\0' + relation.b);
    relation.contacts++;
    relation.lastContact = w.month;
    relation.attachment = clamp(
      relation.attachment +
        (relation.kind === 'kin' || relation.kind === 'dependent' ? 0.008 : 0.003),
    );
    relation.trust = clamp(
      relation.trust +
        (p.values.care + q.values.care - 0.8) * 0.012 -
        (p.stress + q.stress) * 0.003,
      -1,
      1,
    );
    if (relation.kind === 'companion' && relation.trust > 0.58) {
      relation.kind = 'friend';
      const e = emit(
        'society_friendship',
        [p.id, q.id],
        p.locationId,
        `${p.name}与${q.name}在持续的日常往来中建立互信。`,
        { trust: relation.trust, contacts: relation.contacts },
        relation.causeIds,
        0.58,
      );
      appendCauseId(relation.causeIds, e.id);
    }
  }

  // Deterministic, bounded contact selection: at most 256 pairs and at most one attempt per person.
  const candidates: { location: string; a: Person; b: Person; score: number }[] = [];
  for (const [location, ids] of Object.entries(state.locationIndex)) {
    if (ids.length < 2) continue;
    for (const id of ids) {
      const i = hash(`${w.seed}:${w.month}:society:${id}`) % ids.length;
      let j = (i + 1 + (hash(`${id}:neighbor`) % (ids.length - 1))) % ids.length;
      if (ids[j] === id) j = (j + 1) % ids.length;
      const a = liveById.get(id)!,
        b = liveById.get(ids[j])!;
      if (a.id === b.id) continue;
      candidates.push({
        location,
        a,
        b,
        score: hash(`${w.seed}:${w.month}:${relationKey(a.id, b.id)}`),
      });
    }
  }
  candidates.sort((a, b) => a.score - b.score || a.a.id.localeCompare(b.a.id));
  const start = candidates.length ? (w.month * 256) % candidates.length : 0;
  const touched = new Set<string>();
  let pairCount = 0,
    scanned = 0;
  while (scanned < candidates.length && pairCount < 256) {
    const c = candidates[(start + scanned++) % candidates.length];
    const key = relationKey(c.a.id, c.b.id);
    if (touched.has(c.a.id) || touched.has(c.b.id)) continue;
    touched.add(c.a.id);
    touched.add(c.b.id);
    pairCount++;
    const rel = state.relations[key];
    if (!rel) {
      const e = emit(
        'society_encounter',
        [c.a.id, c.b.id],
        c.location,
        `${c.a.name}与${c.b.name}在日常生活中相识。`,
        {},
        [],
        0.42,
      );
      addRelation(state, c.a, c.b, 'companion', 0.18, w.month, [e.id]);
    } else {
      const shared = (c.a.values.care + c.b.values.care - 0.8) * 0.035;
      rel.contacts++;
      rel.lastContact = w.month;
      rel.attachment = clamp(
        rel.attachment + (rel.kind === 'kin' || rel.kind === 'dependent' ? 0.012 : 0.006),
      );
      rel.reciprocity = clamp(rel.reciprocity + 0.025, 0, 1);
      rel.trust = clamp(rel.trust + shared - ((c.a.stress + c.b.stress) / 2) * 0.006, -1, 1);
      if (rel.trust > 0.58 && ['companion', 'dependent'].includes(rel.kind)) {
        rel.kind = 'friend';
        const e = emit(
          'society_friendship',
          [c.a.id, c.b.id],
          c.location,
          `${c.a.name}与${c.b.name}经过持续往来建立了互信。`,
          { trust: rel.trust, contacts: rel.contacts },
          rel.causeIds,
          0.58,
        );
        appendCauseId(rel.causeIds, e.id);
      } else if (rel.trust < -0.35 && rel.kind !== 'enemy' && rel.kind !== 'rival') {
        rel.kind = 'rival';
        const e = emit(
          'social_rivalry',
          [c.a.id, c.b.id],
          c.location,
          `${c.a.name}与${c.b.name}的反复冲突形成竞争关系。`,
          { trust: rel.trust },
          rel.causeIds,
          0.62,
        );
        appendCauseId(rel.causeIds, e.id);
      }
    }
    const pa = state.profiles[c.a.id],
      pb = state.profiles[c.b.id];
    // Only explicit synthetic faith declarations qualify; other claims are not religion.
    for (const [p, profile, other, otherProfile] of [
      [c.a, pa, c.b, pb],
      [c.b, pb, c.a, pa],
    ] as const) {
      const belief = p.beliefs
        .slice()
        .reverse()
        .find((b) => faithKey(b.claimId));
      if (!belief || belief.confidence < 0.55) continue;
      const target = `faith:${faithKey(belief.claimId)}`;
      const otherBelief = other.beliefs.find(
        (b) => `faith:${faithKey(b.claimId)}` === target && b.confidence >= 0.55,
      );
      if (!otherBelief) continue;
      const e = emit(
        'faith_witness',
        [p.id, other.id],
        c.location,
        `${p.name}与${other.name}共同实践了双方明确持有的信仰传统。`,
        { tradition: target },
        state.relations[key]?.causeIds ?? [],
        0.55,
      );
      const institution = findOrFound(state, 'faith', c.location, target, p.id, w, emit);
      for (const [member, memberProfile] of [
        [p, profile],
        [other, otherProfile],
      ] as const) {
        if (memberProfile.religionId === target) continue;
        if (memberProfile.religionId) leaveFaith(state, member, memberProfile, w, emit, e.id);
        if (!institution.members.includes(member.id))
          joinInstitution(state, institution, member, memberProfile, 'religion', target, w, emit);
      }
    }
    const relation = state.relations[key];
    if (relation && relation.trust < -0.65 && relation.kind === 'rival') {
      relation.kind = 'enemy';
    }
  }

  // Workplace organization emerges from shared wage hardship; treasury transfers are conserved.
  const workplaces = new Map<string, Person[]>();
  for (const p of liveById.values()) {
    const key = JSON.stringify([p.locationId, p.occupation]);
    const xs = workplaces.get(key) ?? [];
    xs.push(p);
    workplaces.set(key, xs);
  }
  const workplaceEntries = [...workplaces.entries()].sort(([a], [b]) => a.localeCompare(b));
  const workplaceStart = workplaceEntries.length ? (w.month * 32) % workplaceEntries.length : 0;
  for (let workOffset = 0; workOffset < Math.min(32, workplaceEntries.length); workOffset++) {
    const [key, workers] =
      workplaceEntries[(workplaceStart + workOffset) % workplaceEntries.length];
    if (workers.length < 3) continue;
    const [location] = JSON.parse(key) as [string, string];
    const place = w.settlements.find((s) => s.id === location);
    const hardship = place
      ? clamp(place.unrest * 0.55 + place.scarcity * 0.3 + (place.economy?.unemployment ?? 0) * 0.4)
      : 0;
    if (hardship < 0.42) continue;
    let union = Object.values(state.institutions).find(
      (i) =>
        i.kind === 'union' &&
        i.locationId === location &&
        i.status === 'active' &&
        i.position === 'labor',
    );
    if (!union) union = findOrFound(state, 'union', location, undefined, workers[0].id, w, emit);
    const sample = workers
      .slice()
      .sort(
        (a, b) =>
          hash(`${w.seed}:${Math.floor(w.month / 3)}:union:${a.id}`) -
          hash(`${w.seed}:${Math.floor(w.month / 3)}:union:${b.id}`),
      )
      .slice(0, Math.min(8, workers.length));
    for (const p of sample)
      if (!union.members.includes(p.id))
        joinInstitution(state, union, p, state.profiles[p.id], 'political', 'labor', w, emit);
    const senior = sample
      .slice()
      .sort(
        (a, b) =>
          (b.life?.career.experience ?? b.skills.craft * 24) -
            (a.life?.career.experience ?? a.skills.craft * 24) || a.id.localeCompare(b.id),
      )[0];
    const junior = sample
      .slice()
      .sort(
        (a, b) =>
          (a.life?.education.months ?? a.skills.learning * 24) -
            (b.life?.education.months ?? b.skills.learning * 24) || a.id.localeCompare(b.id),
      )[0];
    const experienceGap =
      (senior.life?.career.experience ?? senior.skills.craft * 24) -
      (junior.life?.education.months ?? junior.skills.learning * 24);
    if (senior.id !== junior.id && experienceGap > 6) {
      const e = emit(
        'career_mentorship',
        [senior.id, junior.id],
        location,
        `${senior.name}凭借较丰富的${senior.occupation}经验指导${junior.name}。`,
        { occupation: senior.occupation, experienceGap },
        union.causeIds,
        0.55,
      );
      const key = relationKey(senior.id, junior.id);
      addRelation(state, senior, junior, 'mentor', 0.56, w.month, [e.id]);
      state.relations[key].kind = 'mentor';
      appendCauseId(state.relations[key].causeIds, e.id);
    }
    for (const p of sample) {
      const contribution = Math.min(Math.max(0, p.coin), union.dues);
      p.coin -= contribution;
      union.treasury += contribution;
    }
    const reliefBudget = Math.min(
      Math.max(0, union.treasury - union.monthlyUpkeep),
      Math.floor(union.members.length * 0.25),
    );
    if (reliefBudget > 0) {
      const poor = sample
        .filter((p) => p.coin < 8)
        .sort((a, b) => a.coin - b.coin || a.id.localeCompare(b.id));
      let pool = reliefBudget;
      for (const p of poor) {
        if (pool <= 0) break;
        const transfer = Math.min(pool, Math.max(0, 8 - p.coin));
        p.coin += transfer;
        union.treasury -= transfer;
        pool -= transfer;
        state.profiles[p.id].safetyNet = clamp(state.profiles[p.id].safetyNet + transfer / 20);
      }
      if (pool < reliefBudget)
        emit(
          'mutual_aid',
          [...poor.slice(0, 4).map((p) => p.id)],
          location,
          '工友互助会按可用会费向困难成员发放救济。',
          { paid: reliefBudget - pool, remaining: union.treasury },
          union.causeIds,
          0.7,
        );
    }
    if (
      w.month % 3 === 0 &&
      sample.length >= 3 &&
      !Object.values(state.laborDisputes).some(
        (d) => d.status === 'active' && d.locationId === location,
      )
    ) {
      const people = sample.map((p) => p.id);
      const e = emit(
        'labor_strike',
        people,
        location,
        `${workers[0].occupation}工友因长期生计压力组织停工，要求改善劳动条件。`,
        { workers: sample.length, hardship, unionId: union.id, treasury: union.treasury },
        union.causeIds,
        0.72,
      );
      const disputeId = `strike-${e.id}`;
      state.laborDisputes[disputeId] = {
        id: disputeId,
        locationId: location,
        participants: people,
        starts: w.month + 1,
        until: w.month + 4,
        status: 'active',
        causeIds: [e.id],
      };
      if (place) place.unrest = clamp(place.unrest + 0.005);
      for (const p of sample) {
        state.profiles[p.id].activeStrikeId = disputeId;
        p.stress = clamp(p.stress + 0.025, 0, 1);
        state.profiles[p.id].alienation = clamp(state.profiles[p.id].alienation + 0.03);
      }
      const memberSet = new Set(union.members);
      const crossers = workers
        .filter((p) => !memberSet.has(p.id))
        .filter(
          (p) => p.values.ambition > 0.58 || hash(`${w.seed}:${w.month}:cross:${p.id}`) % 4 === 0,
        )
        .slice(0, 2);
      for (const crosser of crossers) {
        let paid = 0;
        if (place && place.coin > 0) {
          paid = Math.min(1, place.coin);
          place.coin -= paid;
          crosser.coin += paid;
        }
        const betrayal = emit(
          'social_betrayal',
          [crosser.id, ...sample.slice(0, 4).map((p) => p.id)],
          location,
          `${crosser.name}在工友停工时继续上工，获得工资并破坏了同事间的互信。`,
          { strikeId: e.id, wage: paid, unionId: union.id },
          [e.id],
          0.75,
        );
        for (const member of sample.slice(0, 4)) {
          const key = relationKey(crosser.id, member.id);
          if (!state.relations[key])
            addRelation(state, crosser, member, 'rival', -0.48, w.month, [betrayal.id]);
          else {
            const relation = state.relations[key];
            relation.trust = clamp(relation.trust - 0.35, -1, 1);
            relation.kind = 'rival';
            appendCauseId(relation.causeIds, betrayal.id);
          }
          state.profiles[member.id].alienation = clamp(state.profiles[member.id].alienation + 0.05);
        }
        crosser.stress = clamp(crosser.stress + 0.015, 0, 1);
      }
      union.causeIds = [...union.causeIds, e.id].slice(-12);
    }
  }
  // Institutions pay upkeep from accumulated dues; insolvency dissolves them with a causal record.
  for (const institution of Object.values(state.institutions))
    if (institution.status === 'active') {
      const departed = institution.members.filter(
        (id) => !liveById.has(id) || liveById.get(id)!.locationId !== institution.locationId,
      );
      if (departed.length) {
        institution.members = institution.members.filter((id) => !departed.includes(id));
        for (const id of departed) {
          const p = allById.get(id),
            profile = state.profiles[id];
          if (!profile) continue;
          profile.institutionIds = profile.institutionIds.filter((x) => x !== institution.id);
          loseInstitutionIdentity(
            profile,
            p,
            institution,
            p?.death !== undefined ? 'death' : 'migration',
            w,
            emit,
          );
        }
      }
      if (institution.kind !== 'union') {
        for (const id of institution.members) {
          const member = liveById.get(id);
          if (!member) continue;
          const contribution = Math.min(institution.dues, Math.max(0, member.coin));
          member.coin -= contribution;
          institution.treasury += contribution;
        }
        const needy = institution.members
          .map((id) => liveById.get(id))
          .filter((p): p is Person => !!p && p.coin < 8)
          .sort((a, b) => a.coin - b.coin || a.id.localeCompare(b.id))
          .slice(0, 8);
        let aidFunds = Math.max(0, institution.treasury - institution.monthlyUpkeep);
        for (const member of needy) {
          if (aidFunds <= 0) break;
          const transfer = Math.min(aidFunds, 8 - member.coin);
          member.coin += transfer;
          institution.treasury -= transfer;
          aidFunds -= transfer;
          state.profiles[member.id].safetyNet = clamp(
            state.profiles[member.id].safetyNet + transfer / 20,
          );
          if (transfer > 0)
            emit(
              'mutual_aid',
              [member.id],
              institution.locationId,
              `${institution.label}从共同基金向${member.name}提供救济。`,
              { institutionId: institution.id, paid: transfer, remaining: institution.treasury },
              institution.causeIds,
              0.62,
            );
        }
      }
      const expense = Math.min(institution.treasury, institution.monthlyUpkeep);
      institution.treasury -= expense;
      const settlement = w.settlements.find((s) => s.id === institution.locationId);
      if (settlement) settlement.coin += expense;
      if (expense < institution.monthlyUpkeep) {
        institution.status = 'dissolved';
        const e = emit(
          'institution_dissolved',
          institution.members.slice(0, 8),
          institution.locationId,
          `${institution.label}因会费不足无法维持开支而解散。`,
          { institutionId: institution.id, treasury: institution.treasury },
          institution.causeIds,
          0.65,
        );
        appendCauseId(institution.causeIds, e.id);
        for (const id of institution.members) {
          const profile = state.profiles[id];
          if (!profile) continue;
          profile.institutionIds = profile.institutionIds.filter((x) => x !== institution.id);
          loseInstitutionIdentity(
            profile,
            liveById.get(id),
            institution,
            'institution-dissolved',
            w,
            emit,
          );
        }
        institution.members = [];
      }
    }
}

function addRelation(
  s: SocietyState,
  a: Person,
  b: Person,
  kind: SocietyRelationKind,
  trust: number,
  month: number,
  causeIds: string[],
) {
  if (a.id === b.id) return;
  const key = relationKey(a.id, b.id);
  let rel = s.relations[key];
  if (!rel) {
    rel = s.relations[key] = {
      a: [a.id, b.id].sort()[0],
      b: [a.id, b.id].sort()[1],
      kind,
      trust,
      attachment: kind === 'kin' ? 0.8 : kind === 'dependent' ? 0.6 : 0.18,
      reciprocity: 0.5,
      contacts: 0,
      since: month,
      causeIds: [],
      lastContact: month,
    };
    for (const causeId of causeIds) appendCauseId(rel.causeIds, causeId);
    (s.relationIndex[rel.a] ??= []).push(key);
    (s.relationIndex[rel.b] ??= []).push(key);
  } else if (kind === 'kin') {
    rel.kind = 'kin';
    rel.trust = Math.max(rel.trust, trust);
  }
}
function leaveFaith(
  s: SocietyState,
  p: Person,
  profile: SocialProfile,
  w: World,
  emit: Emit,
  causeId: string,
) {
  const previous = profile.religionId;
  const old = Object.values(s.institutions).find(
    (i) => i.kind === 'faith' && i.beliefId === previous && i.members.includes(p.id),
  );
  if (old) old.members = old.members.filter((id) => id !== p.id);
  profile.institutionIds = profile.institutionIds.filter((id) => id !== old?.id);
  profile.religionId = undefined;
  const e = emit(
    'religious_conversion',
    [p.id],
    p.locationId,
    `${p.name}在新的共同信仰实践后离开原有宗教归属。`,
    { before: previous, causeId, month: w.month },
    [causeId, ...(profile.identityEvidence.religion ?? []).slice(0, 1)],
    0.72,
  );
  profile.identityEvidence.religion = [e.id, ...(profile.identityEvidence.religion ?? [])].slice(
    0,
    8,
  );
}
function loseInstitutionIdentity(
  profile: SocialProfile,
  p: Person | undefined,
  institution: SocialInstitution,
  reason: string,
  w: World,
  emit: Emit,
) {
  const axis =
    institution.kind === 'faith'
      ? 'religion'
      : institution.kind === 'union'
        ? 'political'
        : undefined;
  if (!axis) return;
  const current = axis === 'religion' ? profile.religionId : profile.politicalId;
  if (institution.kind === 'faith' ? current !== institution.beliefId : current !== 'labor') return;
  const continuingBelief =
    axis === 'religion'
      ? !!p?.beliefs.some((b) => b.claimId === current && b.confidence >= 0.25)
      : profile.wagePressure > 0.3;
  if (!continuingBelief) {
    if (axis === 'religion') profile.religionId = undefined;
    else profile.politicalId = undefined;
  }
  const e = emit(
    'social_belonging_lost',
    [profile.personId],
    p?.locationId ?? institution.locationId,
    `${p?.name ?? '成员'}因${reason === 'institution-dissolved' ? '团体解散' : reason === 'death' ? '离世' : '迁离'}而失去${institution.label}的身份归属。`,
    { institutionId: institution.id, axis, reason },
    institution.causeIds,
    0.6,
  );
  profile.identityEvidence[axis] = [e.id, ...(profile.identityEvidence[axis] ?? [])].slice(0, 8);
  if (axis === 'political' && !continuingBelief)
    for (const goal of p?.goals ?? [])
      if (goal.kind === 'reform' && goal.status === 'active') {
        goal.status = 'abandoned';
        goal.reason = `${institution.label}不再维持`;
        appendCauseId(goal.causeIds, e.id);
      }
}

/** Apply this month's social outputs after advanceLife, which recomputes baseline needs. */
export function applySocietyToLife(w: World, locals: Map<string, Person[]>): void {
  const state = (w as SocietyWorld).society;
  if (!state || state.lifeAppliedMonth === w.month) return;
  state.lifeAppliedMonth = w.month;
  const people = new Map<string, Person>();
  for (const xs of locals.values()) for (const p of xs) if (live(p)) people.set(p.id, p);
  for (const [id, p] of people) {
    const profile = state.profiles[id],
      life = p.life;
    if (!profile) continue;
    const bonds = (state.relationIndex[id] ?? [])
      .slice(-32)
      .map((key) => state.relations[key])
      .filter((r) => r && r.trust > 0.55);
    const close = bonds.filter(
      (r) =>
        r.kind === 'kin' || r.kind === 'friend' || r.kind === 'mentor' || r.kind === 'dependent',
    ).length;
    const mentorship = bonds.filter((r) => r.kind === 'mentor').length;
    const evidence = [
      ...(profile.identityEvidence.political ?? []),
      ...(profile.identityEvidence.religion ?? []),
      ...(profile.identityEvidence.class ?? []),
    ]
      .filter(Boolean)
      .slice(0, 8);
    if (life) {
      life.needs.belonging = clamp(
        life.needs.belonging -
          Math.min(0.16, close * 0.035 + profile.institutionIds.length * 0.045) +
          profile.alienation * 0.12,
      );
      life.needs.safety = clamp(
        life.needs.safety - profile.safetyNet * 0.12 + profile.wagePressure * 0.08,
      );
      life.needs.purpose = clamp(
        life.needs.purpose -
          Math.min(0.08, profile.mobility * 0.04 + profile.institutionIds.length * 0.025),
      );
      life.emotions.hope = clamp(
        life.emotions.hope +
          profile.safetyNet * 0.035 +
          Math.max(0, profile.mobility) * 0.02 -
          profile.alienation * 0.04,
      );
      life.emotions.anger = clamp(
        life.emotions.anger + profile.alienation * 0.07 + profile.wagePressure * 0.04,
      );
      if (mentorship) {
        life.education.months += Math.min(1, mentorship * 0.25);
        p.skills.learning = clamp(p.skills.learning + Math.min(0.01, mentorship * 0.002));
      }
      if (profile.institutionIds.length && evidence.length)
        p.values.care = clamp(p.values.care + 0.001);
      if (profile.religionId && profile.identityEvidence.religion?.length)
        p.values.tradition = clamp(p.values.tradition + 0.001);
    }
    if (
      profile.politicalId === 'labor' &&
      profile.identityEvidence.political?.length &&
      !p.goals.some((g) => g.kind === 'reform' && g.status === 'active')
    ) {
      p.goals.push({
        id: `society-goal:reform:${id}:${w.month}`,
        kind: 'reform',
        strength: 0.32,
        progress: 0,
        status: 'active',
        causeIds: profile.identityEvidence.political.slice(0, 4),
        reason: '在共同劳动组织中争取更安全与公平的工作条件',
      });
    }
    if (profile.religionId && profile.identityEvidence.religion?.length) {
      const goal = p.goals.find((g) => g.kind === 'belong' && g.status === 'active');
      if (goal)
        for (const causeId of profile.identityEvidence.religion.slice(0, 2))
          appendCauseId(goal.causeIds, causeId);
    }
    for (const goal of p.goals)
      if (goal.status === 'active' && goal.kind === 'belong' && profile.institutionIds.length)
        goal.progress = clamp(goal.progress + 0.002 * profile.institutionIds.length);
  }
}
function findOrFound(
  s: SocietyState,
  kind: SocialInstitution['kind'],
  location: string,
  beliefId: string | undefined,
  founder: string,
  w: World,
  emit: Emit,
) {
  const existing = Object.values(s.institutions).find(
    (i) =>
      i.kind === kind &&
      i.locationId === location &&
      i.status === 'active' &&
      (kind !== 'faith' || i.beliefId === beliefId),
  );
  if (existing) return existing;
  const id = `society:${kind}:${location}:${beliefId ?? 'labor'}:${++s.sequence}`;
  const e = emit(
    'institution_founded',
    [founder],
    location,
    kind === 'faith'
      ? '共同信仰者开始维持固定的礼拜与互助组织。'
      : '工友建立组织以共同处理劳动与救济事务。',
    { institutionId: id, kind, beliefId },
    [],
    0.66,
  );
  return (s.institutions[id] = {
    id,
    kind,
    label: kind === 'faith' ? `信仰团体 ${beliefId}` : '工友互助会',
    locationId: location,
    beliefId,
    position: kind === 'union' ? 'labor' : undefined,
    members: [],
    treasury: 0,
    dues: 1,
    monthlyUpkeep: 1,
    founded: w.month,
    causeIds: [e.id],
    status: 'active',
  });
}
function joinInstitution(
  s: SocietyState,
  i: SocialInstitution,
  p: Person,
  profile: SocialProfile,
  axis: 'religion' | 'political',
  identity: string,
  w: World,
  emit: Emit,
) {
  i.members.push(p.id);
  profile.institutionIds.push(i.id);
  if (axis === 'religion') profile.religionId = identity;
  else profile.politicalId = identity;
  const e = emit(
    'social_identity_adopted',
    [p.id],
    p.locationId,
    axis === 'religion'
      ? `${p.name}经由持续信仰实践加入${i.label}。`
      : `${p.name}在共同劳动处境中形成工人互助立场。`,
    { axis, identity, institutionId: i.id, experience: 'repeated-contact' },
    i.causeIds,
    0.58,
  );
  profile.identityEvidence[axis] = [e.id, ...(profile.identityEvidence[axis] ?? [])].slice(0, 8);
  i.causeIds = [...i.causeIds, e.id].slice(-12);
  const dues = Math.min(i.dues, Math.max(0, p.coin));
  p.coin -= dues;
  i.treasury += dues;
  void s;
  void w;
}

/** A strike is an ongoing labor process, not only a log entry. */
export function laborWageFactor(w: World, personId: string) {
  const id = w.society?.profiles[personId]?.activeStrikeId,
    d = id ? w.society?.laborDisputes?.[id] : undefined;
  return d?.status === 'active' && d.starts <= w.month && d.until > w.month ? 0.25 : 1;
}
export function applyLaborDisruption(w: World) {
  const places = new Map(w.settlements.map((s) => [s.id, s]));
  for (const d of Object.values(w.society?.laborDisputes ?? {}))
    if (d.status === 'active' && d.starts <= w.month && d.until > w.month) {
      const s = places.get(d.locationId);
      if (!s?.economy) continue;
      const workers = s.cohort.adults + (w.society?.locationIndex[s.id]?.length ?? 0);
      const lostShare = Math.min(0.3, d.participants.length / Math.max(1, workers));
      s.economy.productionMultiplier *= 1 - lostShare * 0.75;
      s.unrest = clamp(s.unrest + 0.001);
    }
}
