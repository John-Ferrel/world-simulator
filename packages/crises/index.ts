import { clamp, type HistoricalEvent, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import type { DiplomaticRelation, GeopoliticalState, Government } from '../geopolitics/index.js';
import { consumeMilitarySupplies } from '../industry/index.js';
import { isDetained } from '../coercion/index.js';

export type CrisisAction = 'negotiate' | 'concede' | 'mobilize' | 'hold';
export type CrisisOfferSource = 'institution' | 'llm';
export type CrisisOffer = {
  polityId: string;
  action: Exclude<CrisisAction, 'hold'>;
  source: CrisisOfferSource;
  submittedMonth: number;
  causeIds: string[];
};
export type CrisisActionRecord = {
  month: number;
  polityId: string;
  action: CrisisAction;
  source: CrisisOfferSource | 'rule';
  coinPaid: number;
  armsConsumed: number;
  oilConsumed: number;
  eventId: string;
};
export type DiplomaticCrisis = {
  id: string;
  relationId: string;
  a: string;
  b: string;
  sourceShockIds: string[];
  sourceSeverity: number;
  evidenceVersion: number;
  sourceEvidenceIds: string[];
  opened: number;
  deadline: number;
  status: 'active' | 'resolved' | 'expired' | 'war';
  causeIds: string[];
  borderEvidenceIds: string[];
  offers: Record<string, CrisisOffer>;
  lastAction: Record<string, CrisisAction>;
  actions: CrisisActionRecord[];
  rounds: number;
  stalemateMonths: number;
};
export type ClosedCrisis = {
  id: string;
  relationId: string;
  sourceShockIds: string[];
  status: Exclude<DiplomaticCrisis['status'], 'active'>;
  opened: number;
  closedAt: number;
  eventId: string;
};
export type CrisisState = {
  version: 1;
  lastAdvancedMonth: number;
  /** Active cases keyed by the bounded geopolitical relation index. */
  cases: Record<string, DiplomaticCrisis>;
  /** Bounded summaries; journal events remain the complete history. */
  closedCatalog: ClosedCrisis[];
  handledSources: Record<string, string[]>;
  lastEventIds: string[];
};
export type CrisisOfferProposal = {
  crisisId: string;
  polityId: string;
  actorId: string;
  actionEventId: string;
  action: 'negotiate';
  source: 'institution' | 'llm';
  evidenceVersion: number;
  causeIds: string[];
};
type CrisisWorld = World & {
  geopolitics?: GeopoliticalState;
  crises?: CrisisState;
};
type Polity = World['polities'][number];
type Settlement = World['settlements'][number];
type HistoricalShock = NonNullable<World['shocks']>[number];

const MAX_CLOSED_CASES = 256;
const MAX_ACTIONS = 24;
const MAX_CAUSES = 16;
const MAX_OFFER_CAUSES = 4;
const MAX_HANDLED_SOURCES = 24;
const pairKey = (a: string, b: string) => [a, b].sort().join('~');
const clamp01 = (n: number) => clamp(n, 0, 1);
const uniqueRecent = (ids: string[], next?: string) =>
  [...new Set(next ? [...ids.filter((id) => id !== next), next] : ids)].slice(-MAX_CAUSES);

function ensureState(w: CrisisWorld): CrisisState {
  return (w.crises ??= {
    version: 1,
    lastAdvancedMonth: -1,
    cases: {},
    closedCatalog: [],
    handledSources: {},
    lastEventIds: [],
  });
}
function getPolityPopulation(populations: Map<string, number>, polityId: string) {
  return populations.get(polityId) ?? 0;
}
function localReceiver(
  shock: HistoricalShock,
  polityId: string,
  settlementById: Map<string, Settlement>,
  settlementsByPolity: Map<string, Settlement[]>,
) {
  const sourcePlace = shock.locationIds
    .map((id) => settlementById.get(id))
    .find((settlement) => settlement?.polityId === polityId);
  return sourcePlace ?? settlementsByPolity.get(polityId)?.[0];
}
function causesForCase(crisis: DiplomaticCrisis) {
  return uniqueRecent([...crisis.causeIds, ...crisis.borderEvidenceIds]);
}
/** Add a bounded, typed offer through the simulator's canonical writer. Cause references must belong to the case. */
export function submitCrisisOffer(
  w0: World,
  proposal: CrisisOfferProposal,
  emit: Emit,
  events: HistoricalEvent[],
): HistoricalEvent {
  const w = w0 as CrisisWorld,
    state = w.crises,
    crisis = state
      ? Object.values(state.cases).find((candidate) => candidate.id === proposal.crisisId)
      : undefined;
  if (!crisis || crisis.status !== 'active') throw new Error('外交危机已结束或不存在');
  if (
    typeof proposal.crisisId !== 'string' ||
    proposal.crisisId.length > 160 ||
    typeof proposal.polityId !== 'string' ||
    proposal.polityId.length > 80 ||
    typeof proposal.actorId !== 'string' ||
    proposal.actorId.length > 120 ||
    typeof proposal.actionEventId !== 'string' ||
    proposal.actionEventId.length > 160 ||
    !Number.isSafeInteger(proposal.evidenceVersion)
  )
    throw new Error('外交提议字段格式无效');
  if (proposal.polityId !== crisis.a && proposal.polityId !== crisis.b)
    throw new Error('提出方不属于该危机的相关国家');
  if (proposal.action !== 'negotiate') throw new Error('外部提议仅可提交已经授权的谈判行动');
  if (!['institution', 'llm'].includes(proposal.source)) throw new Error('提议来源无效');
  if (
    !Array.isArray(proposal.causeIds) ||
    proposal.causeIds.length === 0 ||
    proposal.causeIds.length > MAX_OFFER_CAUSES
  )
    throw new Error('因果证据超出危机提议上限');
  if (proposal.evidenceVersion !== crisis.evidenceVersion)
    throw new Error('危机证据版本已变化，需要基于当前材料重新评估');
  const polity = w.polities.find((candidate) => candidate.id === proposal.polityId),
    actor = w.persons.find((candidate) => candidate.id === proposal.actorId);
  if (
    !polity ||
    polity.leaderId !== proposal.actorId ||
    !actor ||
    actor.death !== undefined ||
    actor.journey
  )
    throw new Error('只有在世、在地且未被拘留的本国现任领导人可以代表政府提交谈判');
  if (
    !w.settlements.some(
      (settlement) => settlement.id === actor.locationId && settlement.polityId === polity.id,
    )
  )
    throw new Error('领导人必须在本国境内亲自完成外交谈判');
  if (isDetained(w, actor)) throw new Error('被拘留者不能代表政府提交谈判');
  const actionEvent = events.find((event) => event.id === proposal.actionEventId),
    agenda = w.agency?.agendas[actor.id],
    completedStep = agenda?.steps[Math.max(0, (agenda?.cursor ?? 0) - 1)];
  if (
    !actionEvent ||
    actionEvent.month !== w.month ||
    actionEvent.kind !== 'agenda_step_completed' ||
    actionEvent.data.action !== 'negotiate' ||
    actionEvent.data.classification !== 'executed-agent-action' ||
    !actionEvent.personIds.includes(actor.id) ||
    !agenda ||
    actionEvent.data.agendaId !== agenda.id ||
    completedStep?.action !== 'negotiate' ||
    completedStep.targetId !== (proposal.polityId === crisis.a ? crisis.b : crisis.a)
  )
    throw new Error('必须引用本月实际完成且指向危机对方的外交谈判行动');
  if (crisis.offers[proposal.polityId]?.submittedMonth === w.month)
    throw new Error('该国本月已提交此危机的正式提议');
  if (
    !Array.isArray(proposal.causeIds) ||
    proposal.causeIds.length < 2 ||
    proposal.causeIds.length > MAX_OFFER_CAUSES ||
    proposal.causeIds.some((id) => typeof id !== 'string' || id.length > 160)
  )
    throw new Error('外交提议因果引用格式无效');
  const permitted = new Set([...crisis.sourceEvidenceIds, actionEvent.id]);
  if (proposal.causeIds.some((id) => !permitted.has(id)))
    throw new Error('外交提议包含未记录的危机证据');
  const causeIds = uniqueRecent(proposal.causeIds);
  if (!causeIds.includes(actionEvent.id) || !causeIds.some((id) => id !== actionEvent.id))
    throw new Error('外交提议必须引用已完成的谈判行动与危机证据');
  const event = emit(
    'diplomatic_crisis_offer',
    [],
    undefined,
    '一方通过外交渠道提出谈判。',
    {
      crisisId: crisis.id,
      polityId: proposal.polityId,
      action: 'negotiate',
      source: proposal.source,
      classification: 'bounded-diplomatic-offer',
    },
    causeIds,
    0.65,
  );
  crisis.offers[proposal.polityId] = {
    polityId: proposal.polityId,
    action: 'negotiate',
    source: proposal.source,
    submittedMonth: w.month,
    causeIds: [event.id],
  };
  crisis.causeIds = uniqueRecent(crisis.causeIds, event.id);
  const relation = w.geopolitics?.relations[crisis.relationId];
  if (relation) relation.causeIds = uniqueRecent(relation.causeIds, event.id);
  state!.lastEventIds = uniqueRecent(state!.lastEventIds, event.id);
  return event;
}

function currentOffer(
  crisis: DiplomaticCrisis,
  polityId: string,
  month: number,
  score: number,
  canMobilize: boolean,
  relation: DiplomaticRelation,
): { action: CrisisAction; source: CrisisActionRecord['source'] } {
  const submitted = crisis.offers[polityId];
  if (submitted?.submittedMonth === month)
    return { action: submitted.action, source: submitted.source };
  if (score >= 0.55 && canMobilize) return { action: 'mobilize', source: 'rule' };
  if (score < 0.35 || relation.trade >= 0.55 || relation.status === 'alliance')
    return { action: 'negotiate', source: 'rule' };
  if (score < 0.45 && relation.trade >= 0.4) return { action: 'concede', source: 'rule' };
  return { action: 'hold', source: 'rule' };
}

function policyScore(
  w: World,
  crisis: DiplomaticCrisis,
  polity: Polity,
  gov: Government,
  relation: DiplomaticRelation,
  severity: number,
  alliedSupport: number,
) {
  const military = gov.groups.find((group) => group.kind === 'military'),
    militaryPressure = military
      ? military.influence * (1 - military.satisfaction) + 0.2 * (1 - military.satisfaction)
      : 0,
    regimeFactor = ['authoritarian', 'military'].includes(gov.regime) ? 0.06 : 0,
    support = new Map<string, number>(gov.parties.map((party) => [party.ideology, party.support])),
    leaders = w.politics?.polities[gov.polityId],
    rulingIdeology =
      leaders?.governingIdeology ??
      gov.parties.slice().sort((a, b) => b.support - a.support || a.id.localeCompare(b.id))[0]
        ?.ideology,
    rulingSupport = rulingIdeology ? (support.get(rulingIdeology) ?? 0) : 0,
    partyPressure =
      (support.get('nationalist') ?? 0) * 0.11 +
      (support.get('religious') ?? 0) * (1 - gov.laws.religiousFreedom) * 0.08 +
      (support.get('socialist') ?? 0) * (1 - gov.laws.labor) * 0.07 -
      (support.get('liberal') ?? 0) * gov.laws.pressFreedom * 0.06 +
      (support.get('conservative') ?? 0) * 0.025 +
      (rulingIdeology === 'nationalist' ? rulingSupport * 0.045 : 0) +
      (rulingIdeology === 'religious'
        ? rulingSupport * (1 - gov.laws.religiousFreedom) * 0.035
        : 0) +
      (rulingIdeology === 'socialist' ? rulingSupport * (1 - gov.laws.labor) * 0.03 : 0) -
      (rulingIdeology === 'liberal' ? rulingSupport * gov.laws.pressFreedom * 0.04 : 0),
    deadlockPressure = Math.min(0.16, crisis.stalemateMonths * 0.012);
  return clamp(
    relation.dispute * 0.28 +
      severity * 0.18 +
      (1 - gov.laws.pressFreedom) * 0.13 +
      militaryPressure * 0.12 +
      (1 - polity.legitimacy) * 0.1 +
      clamp01(polity.military / 100) * 0.08 +
      regimeFactor +
      partyPressure +
      deadlockPressure -
      relation.trade * 0.2 -
      alliedSupport * 0.18,
    0,
    1,
  );
}

function activeWar(w: World, relation: DiplomaticRelation) {
  return (
    w.conflicts.some(
      (conflict) =>
        conflict.status === 'active' &&
        pairKey(conflict.a, conflict.b) === pairKey(relation.a, relation.b),
    ) ||
    (w.geopolitics?.wars ?? []).some(
      (war) =>
        (war.status === 'active' || war.status === 'ceasefire') &&
        pairKey(war.a, war.b) === pairKey(relation.a, relation.b),
    )
  );
}

function closeCase(
  crisis: DiplomaticCrisis,
  status: DiplomaticCrisis['status'],
  reason: string,
  w: World,
  relation: DiplomaticRelation | undefined,
  emit: Emit,
  state: CrisisState,
) {
  crisis.status = status;
  const event = emit(
    status === 'resolved'
      ? 'diplomatic_crisis_resolved'
      : status === 'war'
        ? 'diplomatic_crisis_war'
        : 'diplomatic_crisis_expired',
    [],
    undefined,
    status === 'resolved'
      ? '危机双方通过谈判、让步或外交联系降低了争端。'
      : status === 'war'
        ? '地缘政治系统已将该危机升级为战争，危机流程停止重复施压。'
        : '外交危机超过期限，后续走向交由实际外交和军事状态决定。',
    {
      crisisId: crisis.id,
      a: crisis.a,
      b: crisis.b,
      reason,
      dispute: relation?.dispute,
      classification: `diplomatic-crisis-${status}`,
    },
    causesForCase(crisis),
    0.78,
  );
  crisis.causeIds = uniqueRecent(crisis.causeIds, event.id);
  if (relation) relation.causeIds = uniqueRecent(relation.causeIds, event.id);
  delete state.cases[crisis.relationId];
  state.closedCatalog.push({
    id: crisis.id,
    relationId: crisis.relationId,
    sourceShockIds: crisis.sourceShockIds.slice(-MAX_CAUSES),
    status: status as ClosedCrisis['status'],
    opened: crisis.opened,
    closedAt: w.month,
    eventId: event.id,
  });
  state.closedCatalog = state.closedCatalog.slice(-MAX_CLOSED_CASES);
  state.handledSources[crisis.relationId] = [
    ...new Set([...(state.handledSources[crisis.relationId] ?? []), ...crisis.sourceShockIds]),
  ].slice(-MAX_HANDLED_SOURCES);
  state.lastEventIds = uniqueRecent(state.lastEventIds, event.id);
}

/** Opens and advances bounded diplomatic crises after Earth events and before geopolitics resolves wars. */
export function advanceCrises(w0: World, emit: Emit, _events: HistoricalEvent[] = []): void {
  const w = w0 as CrisisWorld,
    geo = w.geopolitics;
  if (!w.pack.id.startsWith('earth-') || !geo) return;
  const state = ensureState(w);
  if (state.lastAdvancedMonth === w.month) return;
  state.lastAdvancedMonth = w.month;
  const polityById = new Map(w.polities.map((polity) => [polity.id, polity]));
  const relationById = new Map(
    Object.values(geo.relations).map((relation) => [relation.id, relation]),
  );
  const settlementById = new Map(w.settlements.map((settlement) => [settlement.id, settlement]));
  const settlementsByPolity = new Map<string, Settlement[]>(),
    populations = new Map<string, number>(),
    alliesByPolity = new Set<string>(),
    shockById = new Map((w.shocks ?? []).map((shock) => [shock.id, shock]));
  for (const settlement of w.settlements) {
    const locations = settlementsByPolity.get(settlement.polityId) ?? [];
    locations.push(settlement);
    settlementsByPolity.set(settlement.polityId, locations);
    populations.set(
      settlement.polityId,
      (populations.get(settlement.polityId) ?? 0) +
        (settlement.sourcePopulation ??
          settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders),
    );
  }
  for (const relation of Object.values(geo.relations))
    if (relation.status === 'alliance') {
      alliesByPolity.add(relation.a);
      alliesByPolity.add(relation.b);
    }
  const shocksByPolity = new Map<string, Map<string, HistoricalShock>>();
  for (const shock of w.shocks ?? []) {
    if (
      shock.kind !== 'crisis' ||
      (shock.historicalKind !== 'war' && !shock.sourceUrl) ||
      shock.started > w.month ||
      shock.ends <= w.month
    )
      continue;
    for (const settlementId of shock.locationIds) {
      const polityId = settlementById.get(settlementId)?.polityId;
      if (!polityId) continue;
      const list = shocksByPolity.get(polityId) ?? new Map<string, HistoricalShock>();
      list.set(shock.id, shock);
      shocksByPolity.set(polityId, list);
    }
  }

  // A relation is considered once, using its actual source and border-dispute evidence.
  for (const relation of Object.values(geo.relations)) {
    if (relation.dispute < 0.12 || !relation.disputeEvidenceId) continue;
    const bShockIds = new Set(shocksByPolity.get(relation.b)?.keys() ?? []),
      pairShocks = [...(shocksByPolity.get(relation.a)?.values() ?? [])].filter((shock) =>
        bShockIds.has(shock.id),
      );
    if (!pairShocks.length || activeWar(w, relation)) continue;
    let crisis = state.cases[relation.id];
    if (crisis) {
      for (const shock of pairShocks) {
        if (!crisis.sourceShockIds.includes(shock.id)) {
          crisis.sourceShockIds = uniqueRecent(crisis.sourceShockIds, shock.id);
          crisis.sourceEvidenceIds = uniqueRecent(crisis.sourceEvidenceIds, shock.causeId);
          crisis.evidenceVersion++;
        }
        crisis.sourceSeverity = Math.max(crisis.sourceSeverity, shock.severity);
        crisis.causeIds = uniqueRecent(crisis.causeIds, shock.causeId);
      }
      continue;
    }
    const alreadyHandled = (state.handledSources[relation.id] ?? []).some((sourceId) =>
      pairShocks.some((shock) => shock.id === sourceId),
    );
    if (alreadyHandled) continue;
    const sourceIds = pairShocks.map((shock) => shock.causeId).slice(-MAX_CAUSES),
      borderEvidenceId = relation.disputeEvidenceId,
      firstShock = pairShocks[0],
      id = `crisis:${relation.id}:${firstShock.id}`,
      opened = emit(
        'diplomatic_crisis_opened',
        [],
        undefined,
        `历史危机压力与现有边界争端促使${polityById.get(relation.a)?.name ?? relation.a}和${polityById.get(relation.b)?.name ?? relation.b}进入限期谈判与姿态阶段。`,
        {
          crisisId: id,
          relationId: relation.id,
          a: relation.a,
          b: relation.b,
          sourceShockIds: pairShocks.map((shock) => shock.id),
          borderEvidenceId,
          deadline: w.month + 18,
          classification: 'bounded-diplomatic-crisis',
        },
        uniqueRecent([...sourceIds, borderEvidenceId, ...relation.causeIds]),
        0.72,
      );
    crisis = {
      id,
      relationId: relation.id,
      a: relation.a,
      b: relation.b,
      sourceShockIds: pairShocks.map((shock) => shock.id).slice(-MAX_CAUSES),
      sourceSeverity: Math.max(...pairShocks.map((shock) => shock.severity)),
      evidenceVersion: 1,
      sourceEvidenceIds: uniqueRecent([...sourceIds, borderEvidenceId]),
      opened: w.month,
      deadline: w.month + 18,
      status: 'active',
      causeIds: [opened.id, ...sourceIds].slice(-MAX_CAUSES),
      borderEvidenceIds: [borderEvidenceId],
      offers: {},
      lastAction: {},
      actions: [],
      rounds: 0,
      stalemateMonths: 0,
    };
    state.cases[relation.id] = crisis;
    relation.causeIds = uniqueRecent(relation.causeIds, opened.id);
    state.lastEventIds = uniqueRecent(state.lastEventIds, opened.id);
  }

  const activeCases = Object.values(state.cases)
    .filter((crisis) => crisis.status === 'active')
    .sort((a, b) => a.opened - b.opened || a.id.localeCompare(b.id));
  for (const crisis of activeCases) {
    const relation = relationById.get(crisis.relationId);
    if (!relation) {
      closeCase(crisis, 'expired', 'relation-removed', w, undefined, emit, state);
      continue;
    }
    if (activeWar(w, relation)) {
      closeCase(crisis, 'war', 'geopolitical-war-committed', w, relation, emit, state);
      continue;
    }
    if (w.month >= crisis.deadline) {
      closeCase(crisis, 'expired', 'deadline', w, relation, emit, state);
      continue;
    }
    const polityA = polityById.get(crisis.a),
      polityB = polityById.get(crisis.b),
      govA = geo.governments[crisis.a],
      govB = geo.governments[crisis.b];
    if (!polityA || !polityB || !govA || !govB) continue;
    const allyA = alliesByPolity.has(crisis.a),
      allyB = alliesByPolity.has(crisis.b);
    const scoreA = policyScore(
        w,
        crisis,
        polityA,
        govA,
        relation,
        crisis.sourceSeverity,
        allyA ? 1 : 0,
      ),
      scoreB = policyScore(
        w,
        crisis,
        polityB,
        govB,
        relation,
        crisis.sourceSeverity,
        allyB ? 1 : 0,
      );
    const sourceShock = crisis.sourceShockIds
      .map((shockId) => shockById.get(shockId))
      .find((shock): shock is HistoricalShock => !!shock);
    if (!sourceShock) {
      closeCase(crisis, 'expired', 'historical-source-ended', w, relation, emit, state);
      continue;
    }
    const receiverA = localReceiver(sourceShock, crisis.a, settlementById, settlementsByPolity),
      receiverB = localReceiver(sourceShock, crisis.b, settlementById, settlementsByPolity);
    const canMobilize = (polity: Polity, receiver: Settlement | undefined) => {
      const population = Math.max(1, getPolityPopulation(populations, polity.id));
      const coin = Math.max(0.05, population * 0.00001);
      const arms = Math.max(0.01, population * 0.00000002);
      const oil = Math.max(0.01, population * 0.000000015);
      const stocks = w.industry?.polities[polity.id]?.goods;
      return (
        !!receiver &&
        polity.treasury >= coin &&
        !!stocks &&
        stocks.arms >= arms &&
        stocks.oil >= oil
      );
    };
    const offerA = currentOffer(
        crisis,
        crisis.a,
        w.month,
        scoreA,
        canMobilize(polityA, receiverA),
        relation,
      ),
      offerB = currentOffer(
        crisis,
        crisis.b,
        w.month,
        scoreB,
        canMobilize(polityB, receiverB),
        relation,
      );
    const outcomes = [
      { polity: polityA, receiver: receiverA, gov: govA, offer: offerA },
      { polity: polityB, receiver: receiverB, gov: govB, offer: offerB },
    ];
    for (const outcome of outcomes) {
      const { polity, receiver, offer } = outcome;
      if (offer.action !== 'mobilize') continue;
      const population = Math.max(1, getPolityPopulation(populations, polity.id)),
        coin = Math.max(0.05, population * 0.00001),
        armsNeed = Math.max(0.01, population * 0.00000002),
        oilNeed = Math.max(0.01, population * 0.000000015);
      const stocks = w.industry?.polities[polity.id]?.goods;
      if (
        !receiver ||
        polity.treasury < coin ||
        !stocks ||
        stocks.arms < armsNeed ||
        stocks.oil < oilNeed
      ) {
        offer.action = 'hold';
        const blocked = emit(
          'crisis_posture_blocked',
          [],
          receiver?.id,
          `${polity.name}提出的军事姿态因财政或军需不足未能执行。`,
          {
            crisisId: crisis.id,
            polityId: polity.id,
            reason: !receiver || polity.treasury < coin ? 'fiscal-capacity' : 'military-supplies',
            requiredCoin: coin,
            requiredArms: armsNeed,
            requiredOil: oilNeed,
            classification: 'unfunded-military-posture',
          },
          causesForCase(crisis),
          0.58,
        );
        crisis.causeIds = uniqueRecent(crisis.causeIds, blocked.id);
        relation.causeIds = uniqueRecent(relation.causeIds, blocked.id);
        crisis.actions.push({
          month: w.month,
          polityId: polity.id,
          action: 'hold',
          source: offer.source,
          coinPaid: 0,
          armsConsumed: 0,
          oilConsumed: 0,
          eventId: blocked.id,
        });
        crisis.actions = crisis.actions.slice(-MAX_ACTIONS);
        state.lastEventIds = uniqueRecent(state.lastEventIds, blocked.id);
        continue;
      }
      const supplies = consumeMilitarySupplies(w, polity.id, armsNeed, oilNeed);
      if (supplies.fulfillment < 0.999) {
        offer.action = 'hold';
        continue;
      }
      polity.treasury -= coin;
      receiver.coin += coin;
      const posture = emit(
        'crisis_military_posture',
        [],
        receiver.id,
        `${polity.name}为边境危机支付了有限军事戒备费用并消耗军备与燃油。`,
        {
          crisisId: crisis.id,
          polityId: polity.id,
          coinPaid: coin,
          armsConsumed: supplies.arms,
          oilConsumed: supplies.fuel,
          disputeBefore: relation.dispute,
          classification: 'costly-military-posture',
        },
        causesForCase(crisis),
        0.72,
      );
      crisis.causeIds = uniqueRecent(crisis.causeIds, posture.id);
      relation.causeIds = uniqueRecent(relation.causeIds, posture.id);
      crisis.actions.push({
        month: w.month,
        polityId: polity.id,
        action: 'mobilize',
        source: offer.source,
        coinPaid: coin,
        armsConsumed: supplies.arms,
        oilConsumed: supplies.fuel,
        eventId: posture.id,
      });
      crisis.actions = crisis.actions.slice(-MAX_ACTIONS);
      crisis.lastAction[polity.id] = 'mobilize';
      state.lastEventIds = uniqueRecent(state.lastEventIds, posture.id);
    }

    const actionA = offerA.action,
      actionB = offerB.action,
      bothNegotiate = actionA === 'negotiate' && actionB === 'negotiate',
      anyConcede = actionA === 'concede' || actionB === 'concede',
      anyMobilize = actionA === 'mobilize' || actionB === 'mobilize';
    crisis.rounds++;
    if (anyConcede && !anyMobilize) {
      const before = relation.dispute;
      for (const [polityId, offer, polity, receiver] of [
        [crisis.a, offerA, polityA, receiverA],
        [crisis.b, offerB, polityB, receiverB],
      ] as const) {
        if (offer.action !== 'concede') continue;
        const cost = Math.max(0.01, getPolityPopulation(populations, polityId) * 0.000005),
          paid = !!receiver && polity.treasury >= cost;
        if (paid) {
          polity.treasury -= cost;
          receiver.coin += cost;
          relation.dispute = Math.max(0, relation.dispute - 0.014);
          relation.trade = clamp01(relation.trade + 0.01);
        }
        const event = emit(
          'crisis_concession',
          [],
          receiver?.id,
          paid
            ? `${polity.name}支付了有限补偿并作出外交让步。`
            : `${polity.name}提出的外交让步因财政资源不足而未能兑现。`,
          {
            crisisId: crisis.id,
            polityId,
            coinPaid: paid ? cost : 0,
            disputeBefore: before,
            disputeAfter: relation.dispute,
            classification: paid ? 'paid-diplomatic-concession' : 'unfunded-diplomatic-concession',
          },
          causesForCase(crisis),
          0.7,
        );
        crisis.causeIds = uniqueRecent(crisis.causeIds, event.id);
        relation.causeIds = uniqueRecent(relation.causeIds, event.id);
        crisis.actions.push({
          month: w.month,
          polityId,
          action: paid ? 'concede' : 'hold',
          source: offer.source,
          coinPaid: paid ? cost : 0,
          armsConsumed: 0,
          oilConsumed: 0,
          eventId: event.id,
        });
        crisis.actions = crisis.actions.slice(-MAX_ACTIONS);
        state.lastEventIds = uniqueRecent(state.lastEventIds, event.id);
      }
      if (relation.status === 'sanctions') relation.status = 'peace';
    } else if (bothNegotiate) {
      const costA = Math.max(0.01, getPolityPopulation(populations, crisis.a) * 0.000002),
        costB = Math.max(0.01, getPolityPopulation(populations, crisis.b) * 0.000002);
      const paidBoth =
        !!receiverA && !!receiverB && polityA.treasury >= costA && polityB.treasury >= costB;
      if (paidBoth) {
        polityA.treasury -= costA;
        polityB.treasury -= costB;
        receiverA.coin += costA;
        receiverB.coin += costB;
      }
      const before = relation.dispute;
      if (paidBoth) {
        relation.dispute = Math.max(0, relation.dispute - 0.018);
        relation.trade = clamp01(relation.trade + 0.015);
      }
      for (const [polityId, offer, cost, paid] of [
        [crisis.a, offerA, costA, paidBoth],
        [crisis.b, offerB, costB, paidBoth],
      ] as const) {
        const receiver = polityId === crisis.a ? receiverA : receiverB;
        const event = emit(
          'crisis_negotiation_round',
          [],
          receiver?.id,
          paidBoth
            ? '双方通过付费外交磋商交换有限的降级方案。'
            : '双方提出外交磋商，但资金不足使协议未能兑现。',
          {
            crisisId: crisis.id,
            polityId,
            offer: offer.action,
            coinPaid: paid ? cost : 0,
            disputeBefore: before,
            disputeAfter: relation.dispute,
            classification: paidBoth
              ? 'paid-diplomatic-negotiation'
              : 'unfunded-diplomatic-negotiation',
          },
          causesForCase(crisis),
          0.68,
        );
        crisis.causeIds = uniqueRecent(crisis.causeIds, event.id);
        relation.causeIds = uniqueRecent(relation.causeIds, event.id);
        crisis.actions.push({
          month: w.month,
          polityId,
          action: offer.action,
          source: offer.source,
          coinPaid: paid ? cost : 0,
          armsConsumed: 0,
          oilConsumed: 0,
          eventId: event.id,
        });
        crisis.actions = crisis.actions.slice(-MAX_ACTIONS);
        crisis.lastAction[polityId] = offer.action;
        state.lastEventIds = uniqueRecent(state.lastEventIds, event.id);
      }
      if (relation.status === 'sanctions') relation.status = 'peace';
      if (relation.dispute < 0.42)
        closeCase(crisis, 'resolved', 'mutual-paid-negotiation', w, relation, emit, state);
      else crisis.stalemateMonths = 0;
    } else if (anyMobilize) {
      crisis.stalemateMonths = 0;
      const disputeBefore = relation.dispute;
      relation.dispute = Math.min(
        2,
        relation.dispute + (actionA === 'mobilize' && actionB === 'mobilize' ? 0.009 : 0.002),
      );
      if (actionA === 'mobilize' && actionB !== 'mobilize')
        relation.dispute = Math.min(2, relation.dispute + (scoreB < 0.35 ? 0 : 0.001));
      if (actionB === 'mobilize' && actionA !== 'mobilize')
        relation.dispute = Math.min(2, relation.dispute + (scoreA < 0.35 ? 0 : 0.001));
      if (relation.dispute !== disputeBefore) {
        const escalation = emit(
          'crisis_dispute_escalated',
          [],
          undefined,
          '付费军事姿态提高了既有边境争端水平。',
          {
            crisisId: crisis.id,
            disputeBefore,
            disputeAfter: relation.dispute,
            offers: { [crisis.a]: actionA, [crisis.b]: actionB },
            classification: 'costed-diplomatic-escalation',
          },
          causesForCase(crisis),
          0.7,
        );
        crisis.causeIds = uniqueRecent(crisis.causeIds, escalation.id);
        relation.causeIds = uniqueRecent(relation.causeIds, escalation.id);
        state.lastEventIds = uniqueRecent(state.lastEventIds, escalation.id);
      }
    } else crisis.stalemateMonths++;
    if (relation.dispute < 0.42 && crisis.status === 'active') {
      if (relation.status === 'sanctions') relation.status = 'peace';
      closeCase(
        crisis,
        'resolved',
        'dispute-fell-below-negotiation-level',
        w,
        relation,
        emit,
        state,
      );
    }
  }
}
