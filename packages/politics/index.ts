import { clamp, type Person, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import type { GeopoliticalState, Ideology } from '../geopolitics/index.js';
import type { SocietyState } from '../society/index.js';
import { random } from '../simulation-core/random.js';
import { isDetained } from '../coercion/index.js';
import { settlementMass } from '../world-systems/aggregation.js';

export type PoliticalStanding = {
  personId: string;
  score: number;
  service: number;
  network: number;
  causeIds: string[];
  lastServiceEvidenceIds?: string[];
};

export type PolityPower = {
  polityId: string;
  leaderId?: string;
  governingIdeology?: Ideology | 'military';
  vacancySince?: number;
  incapacitatedMonths: number;
  absentMonths: number;
  lastContestMonth: number;
  causeIds: string[];
  successionCount: number;
  challengeCount: number;
  failedChallenges: number;
};

export type PoliticsState = {
  version: 1;
  lastAdvancedMonth: number;
  polities: Record<string, PolityPower>;
  standing: Record<string, PoliticalStanding>;
  lastEventIds: string[];
};

type PoliticalWorld = World & {
  geopolitics?: GeopoliticalState;
  society?: SocietyState;
  politics?: PoliticsState;
};
type Government = GeopoliticalState['governments'][string];
type Candidate = {
  person: Person;
  standing: PoliticalStanding;
  score: number;
  military: boolean;
  alignment?: Ideology;
};

const cap = (n: number, lo = 0, hi = 1) => clamp(n, lo, hi);
const alive = (p: Person) => p.death === undefined;
const adult = (p: Person, month: number) => month - p.birth >= 216;
const recognizedTitle = (p: Person) =>
  /代表|议员|市长|部长|官员|委员|领袖|主席|将军|军官/.test(p.title ?? '');
const militaryService = (p: Person) => /军|兵|警|卫戍|将/.test(`${p.occupation} ${p.title ?? ''}`);
const civicService = (p: Person) =>
  /教师|医生|医士|记者|学者|组织者|工会|牧师|社工|办事/.test(p.occupation);

function ensureState(w: PoliticalWorld): PoliticsState {
  if (w.politics) return w.politics;
  const polities: Record<string, PolityPower> = {};
  for (const polity of w.polities)
    polities[polity.id] = {
      polityId: polity.id,
      leaderId: polity.leaderId || undefined,
      governingIdeology: undefined,
      incapacitatedMonths: 0,
      absentMonths: 0,
      lastContestMonth: -48,
      causeIds: [],
      successionCount: 0,
      challengeCount: 0,
      failedChallenges: 0,
    };
  return (w.politics = {
    version: 1,
    lastAdvancedMonth: -1,
    polities,
    standing: {},
    lastEventIds: [],
  });
}

function pushCause(target: string[], ids: (string | undefined)[]) {
  for (const id of ids) if (id && !target.includes(id)) target.push(id);
  if (target.length > 8) target.splice(0, target.length - 8);
}

function recentMemoryCauses(person: Person | undefined) {
  return person?.memories.slice(-3).map((memory) => memory.eventId) ?? [];
}

function eventCauses(
  power: PolityPower,
  government: Government | undefined,
  people: (Person | undefined)[],
  state: PoliticsState,
) {
  const result = [...power.causeIds];
  for (const person of people) {
    pushCause(result, recentMemoryCauses(person));
    if (person) pushCause(result, state.standing[person.id]?.causeIds ?? []);
  }
  pushCause(result, government?.causeIds ?? []);
  return result.slice(-8);
}

function politicalMemberships(w: PoliticalWorld) {
  const memberOf = new Map<string, number>();
  const organizationLeaders = new Map<string, number>();
  const membershipCauses = new Map<string, string[]>();
  const polityByLocation = new Map(w.settlements.map((s) => [s.id, s.polityId]));
  for (const org of w.organizations) {
    if (org.status !== 'active') continue;
    const polityId = polityByLocation.get(org.locationId);
    if (!polityId) continue;
    organizationLeaders.set(org.leaderId, (organizationLeaders.get(org.leaderId) ?? 0) + 1);
    for (const id of org.memberIds) {
      memberOf.set(id, (memberOf.get(id) ?? 0) + 1);
      const causes = membershipCauses.get(id) ?? [];
      pushCause(causes, org.causeIds);
      membershipCauses.set(id, causes);
    }
    const causes = membershipCauses.get(org.leaderId) ?? [];
    pushCause(causes, org.causeIds);
    membershipCauses.set(org.leaderId, causes);
  }
  const politicalInstitutions = new Map<string, number>();
  for (const institution of Object.values(w.society?.institutions ?? {}))
    if (institution.status === 'active' && institution.kind === 'political')
      for (const id of institution.members)
        politicalInstitutions.set(id, (politicalInstitutions.get(id) ?? 0) + 1);
  for (const institution of Object.values(w.society?.institutions ?? {}))
    if (institution.status === 'active' && institution.kind === 'political')
      for (const id of institution.members) {
        const causes = membershipCauses.get(id) ?? [];
        pushCause(causes, institution.causeIds);
        membershipCauses.set(id, causes);
      }
  return { memberOf, organizationLeaders, politicalInstitutions, membershipCauses };
}

function ideologyForIdentity(identity: string | undefined): Ideology | undefined {
  if (identity === 'labor') return 'socialist';
  if (identity === 'civic') return 'liberal';
  if (
    identity === 'liberal' ||
    identity === 'conservative' ||
    identity === 'socialist' ||
    identity === 'nationalist' ||
    identity === 'religious'
  )
    return identity;
  return undefined;
}

function updateStanding(
  state: PoliticsState,
  peopleByPolity: Map<string, Person[]>,
  w: PoliticalWorld,
) {
  const membership = politicalMemberships(w);
  const personById = new Map<string, Person>();
  const polityByPerson = new Map<string, string>();
  for (const [polityId, people] of peopleByPolity)
    for (const person of people) {
      personById.set(person.id, person);
      polityByPerson.set(person.id, polityId);
    }
  const activityEvidence = new Map<string, string[]>();
  const addActivityEvidence = (personId: string, ids: string[]) => {
    if (!ids.length) return;
    const causes = activityEvidence.get(personId) ?? [];
    pushCause(causes, ids);
    activityEvidence.set(personId, causes);
  };
  for (const org of w.organizations)
    if (org.status === 'active' && org.founded === w.month)
      addActivityEvidence(org.creatorId, org.causeIds);
  for (const institution of Object.values(w.society?.institutions ?? {}))
    if (institution.status === 'active' && institution.founded === w.month)
      for (const id of institution.members) addActivityEvidence(id, institution.causeIds);
  const living = new Set<string>();
  for (const [polityId, people] of peopleByPolity) {
    for (const person of people) {
      if (!alive(person) || person.journey || isDetained(w, person) || !adult(person, w.month))
        continue;
      living.add(person.id);
      const standing =
        state.standing[person.id] ??
        (state.standing[person.id] = {
          personId: person.id,
          score: 0,
          service: 0,
          network: 0,
          causeIds: [],
        });
      const trustedLinks = person.relationships.filter((relationship) => {
        if (relationship.trust <= 0.65 || relationship.attachment <= 0.35) return false;
        const supporter = personById.get(relationship.personId);
        return (
          !!supporter &&
          alive(supporter) &&
          !supporter.journey &&
          !isDetained(w, supporter) &&
          polityByPerson.get(supporter.id) === polityId
        );
      }).length;
      const officeCount = membership.organizationLeaders.get(person.id) ?? 0;
      const politicalGroup = membership.politicalInstitutions.get(person.id) ?? 0;
      const activeWork =
        person.life?.career.employed === true &&
        person.health >= 0.35 &&
        (person.life.illness?.severity ?? 0) < 0.65;
      const relevantDecision =
        person.life?.lastDecision?.month === w.month &&
        ['organize', 'care'].includes(person.life.lastDecision.kind) &&
        person.life.lastDecision.causeIds.length > 0
          ? person.life.lastDecision.causeIds
          : [];
      const evidence = [...(activityEvidence.get(person.id) ?? []), ...relevantDecision].slice(-8);
      const seenEvidence =
        standing.lastServiceEvidenceIds ?? (standing.lastServiceEvidenceIds = []);
      const freshEvidence = evidence.find((id) => !seenEvidence.includes(id));
      if (freshEvidence) {
        seenEvidence.push(freshEvidence);
        if (seenEvidence.length > 32) seenEvidence.splice(0, seenEvidence.length - 32);
      }
      pushCause(standing.causeIds, evidence);
      const eventService = freshEvidence ? 0.01 : 0;
      const publicService = activeWork && civicService(person) ? 0.0018 : 0;
      const organizationService = activeWork
        ? Math.min(0.008, officeCount * 0.003 + politicalGroup * 0.002)
        : 0;
      const networkService = Math.min(0.004, trustedLinks * 0.0006);
      standing.service = cap(
        standing.service + publicService + organizationService + eventService,
        0,
        1,
      );
      standing.network = cap(standing.network + networkService, 0, 1);
      standing.score = cap(
        standing.score * 0.999 +
          publicService +
          organizationService +
          eventService +
          networkService,
        0,
        1,
      );
      for (const cause of recentMemoryCauses(person)) pushCause(standing.causeIds, [cause]);
      pushCause(
        standing.causeIds,
        w.society?.profiles[person.id]?.identityEvidence.political ?? [],
      );
      if (officeCount || politicalGroup)
        pushCause(standing.causeIds, membership.membershipCauses.get(person.id) ?? []);
    }
  }
  for (const [id, standing] of Object.entries(state.standing))
    if (!living.has(id)) {
      standing.score *= 0.98;
      standing.network *= 0.98;
    }
  return membership;
}

function makeCandidates(
  w: PoliticalWorld,
  polityId: string,
  people: Person[],
  state: PoliticsState,
  membership: ReturnType<typeof politicalMemberships>,
  settlementById: Map<string, World['settlements'][number]>,
): Candidate[] {
  const candidates: Candidate[] = [];
  for (const person of people) {
    if (!alive(person) || person.journey || isDetained(w, person) || !adult(person, w.month))
      continue;
    const standing = state.standing[person.id];
    if (!standing) continue;
    const local = settlementById.get(person.locationId)?.polityId === polityId;
    if (!local) continue;
    const orgLeader = membership.organizationLeaders.has(person.id);
    const politicalGroup = membership.politicalInstitutions.has(person.id);
    const military = militaryService(person);
    const alignment = ideologyForIdentity(w.society?.profiles[person.id]?.politicalId);
    const formal = recognizedTitle(person) || orgLeader || politicalGroup || military || alignment;
    if (!formal && standing.score < 0.2) continue;
    const network = Math.min(
      0.18,
      person.relationships.filter((r) => r.trust > 0.55).length * 0.015,
    );
    const score =
      standing.score +
      (recognizedTitle(person) ? 0.2 : 0) +
      (orgLeader ? 0.16 : 0) +
      (politicalGroup ? 0.12 : 0) +
      (alignment ? 0.08 : 0) +
      (military ? 0.08 : 0) +
      network +
      person.values.ambition * 0.04;
    candidates.push({ person, standing, score, military, alignment });
  }
  return candidates.sort((a, b) => b.score - a.score || a.person.id.localeCompare(b.person.id));
}

function polityPeople(w: PoliticalWorld) {
  const settlements = new Map(w.settlements.map((s) => [s.id, s]));
  const peopleByPolity = new Map<string, Person[]>();
  for (const person of w.persons) {
    if (!alive(person) || person.journey || isDetained(w, person)) continue;
    const polityId = settlements.get(person.locationId)?.polityId;
    if (!polityId) continue;
    const people = peopleByPolity.get(polityId) ?? [];
    people.push(person);
    peopleByPolity.set(polityId, people);
  }
  return peopleByPolity;
}

function spendPublicCost(
  w: PoliticalWorld,
  polityId: string,
  locationId: string,
  fraction = 0.001,
) {
  const polity = w.polities.find((p) => p.id === polityId);
  const settlement = w.settlements.find((s) => s.id === locationId);
  if (!polity || !settlement) return 0;
  const cost = Math.min(
    polity.treasury,
    Math.max(0.25, Math.min(25_000, polity.treasury * fraction)),
  );
  if (cost < 0.25) return 0;
  polity.treasury -= cost;
  settlement.coin += cost;
  return cost;
}

function setLeaderTitle(previous: Person | undefined, next: Person) {
  if (previous?.title === '国家议事代表（模拟）') delete previous.title;
  next.title = '国家议事代表（模拟）';
}

function diplomacyVacuum(w: PoliticalWorld, polityId: string) {
  for (const relation of Object.values(w.geopolitics?.relations ?? {}))
    if (relation.a === polityId || relation.b === polityId)
      relation.affinity = cap(relation.affinity - 0.035, -1, 1);
}

/** Updates political standing, contests leadership vacancies, and resolves evidence-backed challenges. */
export function advancePolitics(w0: World, emit: Emit, _locals?: Map<string, Person[]>): void {
  if (!w0.calendar || !w0.pack.id.startsWith('earth-')) return;
  const w = w0 as PoliticalWorld;
  const state = ensureState(w);
  if (state.lastAdvancedMonth === w.month) return;
  const peopleByPolity = polityPeople(w);
  const membership = updateStanding(state, peopleByPolity, w);
  const settlementById = new Map(w.settlements.map((s) => [s.id, s]));
  const stressByPolity = new Map<string, { total: number; count: number }>();
  for (const s of w.settlements) {
    const stress = stressByPolity.get(s.polityId) ?? { total: 0, count: 0 };
    const population = settlementMass(s);
    stress.total += (s.unrest + s.scarcity) * population;
    stress.count += population;
    stressByPolity.set(s.polityId, stress);
  }
  for (const polity of w.polities) {
    const power =
      state.polities[polity.id] ??
      (state.polities[polity.id] = {
        polityId: polity.id,
        leaderId: polity.leaderId || undefined,
        governingIdeology: undefined,
        incapacitatedMonths: 0,
        absentMonths: 0,
        lastContestMonth: -48,
        causeIds: [],
        successionCount: 0,
        challengeCount: 0,
        failedChallenges: 0,
      });
    const people = peopleByPolity.get(polity.id) ?? [];
    const byId = new Map(people.map((p) => [p.id, p]));
    let incumbent = byId.get(power.leaderId ?? polity.leaderId);
    if (!incumbent && polity.leaderId) incumbent = w.persons.find((p) => p.id === polity.leaderId);
    const incapacitated = !!incumbent && alive(incumbent) && incumbent.health < 0.08;
    power.incapacitatedMonths = incapacitated ? power.incapacitatedMonths + 1 : 0;
    const locallyPresent =
      !!incumbent &&
      !incumbent.journey &&
      !isDetained(w, incumbent) &&
      adult(incumbent, w.month) &&
      settlementById.get(incumbent.locationId)?.polityId === polity.id;
    power.absentMonths = locallyPresent ? 0 : power.absentMonths + 1;
    const vacant =
      !incumbent || !alive(incumbent) || power.incapacitatedMonths >= 2 || power.absentMonths >= 3;
    const government = w.geopolitics?.governments[polity.id];
    if (government && !power.governingIdeology) {
      const governing = [...government.parties].sort(
        (a, b) => b.seats - a.seats || b.support - a.support,
      )[0];
      power.governingIdeology = governing?.ideology;
    }
    if (!power.causeIds.length) {
      const baseline = emit(
        'political_power_baseline',
        [],
        undefined,
        `${polity.name}的领导职位、继任规则和政治参与进入模拟。`,
        {
          polityId: polity.id,
          baseline: 'synthetic',
          classification: 'political-institution-baseline',
        },
        government?.causeIds ?? [],
        0.35,
      );
      power.causeIds = [baseline.id];
      state.lastEventIds.push(baseline.id);
    }

    if (vacant) {
      if (power.vacancySince === undefined) {
        power.vacancySince = w.month;
        const causes = eventCauses(power, government, [incumbent], state);
        const e = emit(
          'political_power_vacuum',
          incumbent ? [incumbent.id] : [],
          incumbent?.locationId,
          `${polity.name}的最高政治职位出现权力真空，继任者需要通过公开竞争取得支持。`,
          {
            polityId: polity.id,
            classification: 'political-power-vacancy',
            incapacitated,
            absentMonths: power.absentMonths,
          },
          causes,
          0.8,
        );
        power.causeIds = [e.id];
        state.lastEventIds.push(e.id);
      }
      polity.leaderId = '';
      const candidates = makeCandidates(w, polity.id, people, state, membership, settlementById);
      if (candidates.length && power.lastContestMonth !== w.month) {
        power.lastContestMonth = w.month;
        const contenders = candidates.slice(0, 8);
        const causes = eventCauses(
          power,
          government,
          [incumbent, ...contenders.map((c) => c.person)],
          state,
        );
        const contest = emit(
          'succession_contest',
          contenders.map((c) => c.person.id),
          contenders[0].person.locationId,
          `${polity.name}的继任竞争由具备地方服务、组织或社会支持的人参与。`,
          {
            polityId: polity.id,
            candidates: contenders.map((c) => ({ personId: c.person.id, score: c.score })),
            classification: 'competitive-succession',
          },
          causes,
          0.75,
        );
        power.causeIds = [contest.id];
        const winner = candidates[0];
        const cost = spendPublicCost(w, polity.id, winner.person.locationId, 0.001);
        if (cost > 0) {
          const previous = incumbent;
          power.leaderId = winner.person.id;
          power.vacancySince = undefined;
          power.incapacitatedMonths = 0;
          power.successionCount++;
          polity.leaderId = winner.person.id;
          setLeaderTitle(previous, winner.person);
          polity.legitimacy = cap(polity.legitimacy + Math.min(0.025, winner.score * 0.02));
          const e = emit(
            'political_succession',
            [winner.person.id, ...(incumbent ? [incumbent.id] : [])],
            winner.person.locationId,
            `${winner.person.name}经继任竞争成为${polity.name}的政治领导人；公共资金承担了组织竞争的成本。`,
            {
              polityId: polity.id,
              previousLeaderId: previous?.id,
              leaderId: winner.person.id,
              cost,
              supportScore: winner.score,
              legitimacy: polity.legitimacy,
              classification: 'evidence-backed-succession',
            },
            [contest.id, ...eventCauses(power, government, [winner.person], state)].slice(-8),
            0.95,
          );
          power.causeIds = [e.id];
          state.lastEventIds.push(e.id);
        } else {
          polity.legitimacy = cap(polity.legitimacy - 0.015);
          diplomacyVacuum(w, polity.id);
          const failed = emit(
            'political_succession_failed',
            [winner.person.id],
            winner.person.locationId,
            `${polity.name}的继任者获得提名，但财政不足以组织竞争，职位继续空缺且外交信任受损。`,
            {
              polityId: polity.id,
              candidateId: winner.person.id,
              cost: 0,
              legitimacy: polity.legitimacy,
              classification: 'unfunded-succession',
            },
            [contest.id],
            0.8,
          );
          power.causeIds = [failed.id];
          state.lastEventIds.push(failed.id);
        }
      } else {
        polity.legitimacy = cap(polity.legitimacy - 0.006);
        diplomacyVacuum(w, polity.id);
        if (w.month % 12 === 0) {
          const causes = eventCauses(power, government, [incumbent], state);
          const e = emit(
            'political_vacuum_cost',
            [],
            undefined,
            `${polity.name}未能形成可承担责任的继任联盟，合法性与外交信任继续下降。`,
            {
              polityId: polity.id,
              legitimacy: polity.legitimacy,
              classification: 'vacuum-consequence',
            },
            causes,
            0.7,
          );
          power.causeIds = [e.id];
          state.lastEventIds.push(e.id);
        }
      }
      continue;
    }

    if (!incumbent || !alive(incumbent)) continue;

    power.leaderId = incumbent.id;
    polity.leaderId = incumbent.id;
    power.vacancySince = undefined;
    if (w.month % 12 !== 0 || power.lastContestMonth === w.month) continue;
    const parties = government?.parties ?? [];
    const opposingParties = parties.filter((party) => party.ideology !== power.governingIdeology);
    const opposition = [...opposingParties].sort(
      (a, b) => b.support - a.support || b.seats - a.seats,
    )[0];
    const oppositionSupport = opposition?.support ?? 0;
    const militaryGroup = government?.groups.find((group) => group.kind === 'military');
    const militaryPressure =
      (militaryGroup?.influence ?? 0) * (1 - (militaryGroup?.satisfaction ?? 1));
    const localStressEntry = stressByPolity.get(polity.id) ?? { total: 0, count: 0 };
    const localStress = localStressEntry.total / Math.max(1, localStressEntry.count);
    const pressFreedom = government?.laws.pressFreedom ?? 1;
    const repressionPressure = (1 - pressFreedom) * oppositionSupport;
    const pressure =
      repressionPressure + militaryPressure + localStress * 0.25 + (1 - polity.legitimacy) * 0.12;
    const militaryChallenge =
      (militaryGroup?.influence ?? 0) > 0.28 &&
      (militaryGroup?.satisfaction ?? 1) < 0.3 &&
      (polity.legitimacy < 0.58 || pressFreedom < 0.15);
    const reformChallenge =
      oppositionSupport > 0.34 &&
      pressFreedom < 0.26 &&
      (polity.legitimacy < 0.68 || localStress > 0.55);
    if (
      w.month > 0 &&
      w.month % 48 === 0 &&
      government &&
      government.regime !== 'military' &&
      government.laws.suffrage > 0.12
    ) {
      const electedParty = [...parties].sort(
        (a, b) => b.seats - a.seats || b.support - a.support,
      )[0];
      if (electedParty && electedParty.ideology !== power.governingIdeology) {
        const candidate = makeCandidates(
          w,
          polity.id,
          people,
          state,
          membership,
          settlementById,
        ).find(
          (item) => item.person.id !== incumbent.id && item.alignment === electedParty.ideology,
        );
        const cost = candidate
          ? spendPublicCost(w, polity.id, candidate.person.locationId, 0.001)
          : 0;
        if (candidate && cost > 0) {
          setLeaderTitle(incumbent, candidate.person);
          power.leaderId = candidate.person.id;
          power.governingIdeology = electedParty.ideology;
          polity.leaderId = candidate.person.id;
          government.regime = government.laws.suffrage >= 0.25 ? 'parliamentary' : 'oligarchy';
          polity.legitimacy = cap(polity.legitimacy + 0.02);
          const causes = eventCauses(power, government, [incumbent, candidate.person], state);
          const e = emit(
            'election_government_transfer',
            [incumbent.id, candidate.person.id],
            candidate.person.locationId,
            `${polity.name}的议会席位变化使${electedParty.ideology}联盟组阁，竞选与交接支出由公共财政承担。`,
            {
              polityId: polity.id,
              previousLeaderId: incumbent.id,
              leaderId: candidate.person.id,
              governingIdeology: electedParty.ideology,
              seats: electedParty.seats,
              cost,
              legitimacy: polity.legitimacy,
              classification: 'electoral-government-transfer',
            },
            causes,
            0.95,
          );
          power.causeIds = [e.id];
          power.lastContestMonth = w.month;
          state.lastEventIds.push(e.id);
          continue;
        }
      }
    }
    if ((!militaryChallenge && !reformChallenge) || pressure < 0.45) continue;

    const candidates = makeCandidates(w, polity.id, people, state, membership, settlementById);
    const challenger = candidates.find(
      (candidate) =>
        candidate.person.id !== incumbent.id &&
        (militaryChallenge ? candidate.military : candidate.alignment === opposition?.ideology),
    );
    power.lastContestMonth = w.month;
    const campaignCost = spendPublicCost(w, polity.id, incumbent.locationId, 0.002);
    const causes = eventCauses(power, government, [incumbent, challenger?.person], state);
    const successOdds = cap(
      0.18 +
        oppositionSupport * 0.38 +
        militaryPressure * 0.42 +
        pressure * 0.18 -
        polity.legitimacy * 0.16,
      0.05,
      0.88,
    );
    const succeeds =
      !!challenger &&
      campaignCost > 0 &&
      random(w.seed, w.month, polity.id, 'political-challenge') < successOdds;
    power.challengeCount++;
    if (succeeds && challenger) {
      const previousLeaderId = incumbent.id;
      power.leaderId = challenger.person.id;
      polity.leaderId = challenger.person.id;
      setLeaderTitle(incumbent, challenger.person);
      if (militaryChallenge && government) {
        government.regime = 'military';
        power.governingIdeology = 'military';
        if (militaryGroup) militaryGroup.satisfaction = cap(militaryGroup.satisfaction + 0.12);
        government.laws.pressFreedom = cap(government.laws.pressFreedom - 0.08);
        government.laws.suffrage = cap(government.laws.suffrage - 0.04);
        polity.legitimacy = cap(polity.legitimacy - 0.08);
      } else if (government) {
        power.governingIdeology = challenger.alignment ?? power.governingIdeology;
        government.laws.suffrage = cap(government.laws.suffrage + 0.045);
        government.laws.labor = cap(government.laws.labor + 0.025);
        government.laws.pressFreedom = cap(government.laws.pressFreedom + 0.02);
        government.regime = government.laws.suffrage >= 0.25 ? 'parliamentary' : government.regime;
        polity.legitimacy = cap(polity.legitimacy + 0.035);
      }
      const e = emit(
        militaryChallenge ? 'coup' : 'political_reform',
        [incumbent.id, challenger.person.id],
        challenger.person.locationId,
        militaryChallenge
          ? `${polity.name}的军方不满与政治危机促成政变；领导权转移并收紧部分公民权利。`
          : `${polity.name}的反对派在压制与社会压力下组织改革，选举参与、劳动保障和新闻空间扩大。`,
        {
          polityId: polity.id,
          previousLeaderId,
          leaderId: challenger.person.id,
          pressure,
          successOdds,
          cost: campaignCost,
          regime: government?.regime,
          laws: government?.laws,
          legitimacy: polity.legitimacy,
          classification: militaryChallenge ? 'costly-coup' : 'costly-reform',
        },
        causes,
        0.95,
      );
      power.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    } else {
      power.failedChallenges++;
      polity.legitimacy = cap(polity.legitimacy - (campaignCost > 0 ? 0.025 : 0.04));
      if (militaryChallenge && militaryGroup)
        militaryGroup.satisfaction = cap(militaryGroup.satisfaction - 0.04);
      if (government && !militaryChallenge)
        government.laws.pressFreedom = cap(government.laws.pressFreedom - 0.015);
      const e = emit(
        militaryChallenge ? 'coup_failed' : 'reform_failed',
        challenger ? [challenger.person.id] : [incumbent.id],
        challenger?.person.locationId ?? incumbent.locationId,
        militaryChallenge
          ? `${polity.name}的政变尝试因支持不足或组织资源耗尽而失败，合法性与军方信任受损。`
          : `${polity.name}的改革尝试未能取得足够支持，组织成本已经支付，反对压力进一步累积。`,
        {
          polityId: polity.id,
          challengerId: challenger?.person.id,
          pressure,
          successOdds,
          cost: campaignCost,
          legitimacy: polity.legitimacy,
          classification: militaryChallenge ? 'failed-coup' : 'failed-reform',
        },
        causes,
        0.8,
      );
      power.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    }
  }
  state.lastAdvancedMonth = w.month;
  state.lastEventIds = state.lastEventIds.slice(-64);
}
