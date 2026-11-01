import { clamp, type Person, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { advanceMilitaryLogistics, investMilitaryTransport } from '../military/index.js';
import { populationMean } from '../world-systems/aggregation.js';
import {
  diplomacyDecision,
  diplomaticCamp,
  foreignAuthority,
  synchronizeSovereigntyControl,
} from '../sovereignty/index.js';

export type Ideology = 'liberal' | 'conservative' | 'socialist' | 'nationalist' | 'religious';
export type Party = { id: string; ideology: Ideology; support: number; seats: number };
export type InterestGroup = {
  id: string;
  kind: 'landowners' | 'workers' | 'merchants' | 'military' | 'clergy';
  influence: number;
  satisfaction: number;
};
export type Government = {
  polityId: string;
  regime: 'parliamentary' | 'oligarchy' | 'military' | 'theocracy' | 'authoritarian';
  parties: Party[];
  groups: InterestGroup[];
  laws: { suffrage: number; labor: number; religiousFreedom: number; pressFreedom: number };
  causeIds: string[];
};
export type DiplomaticRelation = {
  id: string;
  a: string;
  b: string;
  affinity: number;
  dispute: number;
  trade: number;
  status: 'peace' | 'alliance' | 'sanctions' | 'war' | 'armistice';
  treatySince: number;
  causeIds: string[];
  disputeEvidenceId?: string;
};
export type Front = {
  aSettlementId: string;
  bSettlementId: string;
  control: number;
  supply: number;
  kind: 'land' | 'coastal_abstract';
  forceA: number;
  forceB: number;
  occupierId?: string;
};
export type War = {
  id: string;
  a: string;
  b: string;
  campA: string[];
  campB: string[];
  started: number;
  status: 'active' | 'ceasefire' | 'ended';
  causeIds: string[];
  fronts: Front[];
  mobilized: Record<string, number>;
  supplyFulfillment: Record<string, number>;
  consumedSupplies: Record<string, { arms: number; fuel: number }>;
  casualties: Record<string, number>;
  /** Sub-person losses carry forward; monthly rounding must not erase sustained combat. */
  casualtyRemainder?: Record<string, number>;
  occupied: string[];
  months: number;
  settlementOwnerBefore: Record<string, string>;
  winnerId?: string;
};
export type Atrocity = {
  id: string;
  perpetratorPolityId: string;
  targetGroup:
    'political_dissidents' | 'religious_minority' | 'ethnic_minority' | 'civilian_population';
  locationId: string;
  started: number;
  active: boolean;
  deaths: number;
  displaced: number;
  causeIds: string[];
  evidenceIds: string[];
  accountable?: boolean;
};
export type CasualtyProposal = {
  personId: string;
  causeIds: string[];
  monthlyRisk: number;
  kind: 'combat' | 'persecution';
};
export type GeopoliticalState = {
  version: 1;
  governments: Record<string, Government>;
  relations: Record<string, DiplomaticRelation>;
  wars: War[];
  atrocities: Atrocity[];
  lastEventIds: string[];
  pendingCasualties: CasualtyProposal[];
  lastAdvancedMonth: number;
  lastEffectsMonth: number;
  routeBaseCapacity: Record<string, number>;
  routeBaseStatus: Record<string, 'open' | 'restricted'>;
  lastAtrocityStarted: Record<string, number>;
};
type LocalEmit = Emit;
const cap = (n: number, lo = 0, hi = 1) => clamp(n, lo, hi);
const pairKey = (a: string, b: string) => [a, b].sort().join('~');

function supportSeed(seed: string, polity: string, ideology: Ideology) {
  // Stable hash, deliberately independent from iteration order and global random streams.
  let h = 2166136261;
  for (const c of `${seed}|${polity}|${ideology}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return 0.08 + ((h >>> 0) % 1000) / 10000;
}
function livingTotal(w: World, polityId: string) {
  let n = 0;
  for (const s of w.settlements)
    if (s.polityId === polityId) n += s.cohort.children + s.cohort.adults + s.cohort.elders;
  return n;
}
function createState(w: World, emit: LocalEmit, onlyGovernments?: Set<string>): GeopoliticalState {
  const governments: Record<string, Government> = {};
  const relations: Record<string, DiplomaticRelation> = {};
  for (const p of w.polities) {
    if (onlyGovernments && !onlyGovernments.has(p.id)) continue;
    const ideologies: Ideology[] = [
      'liberal',
      'conservative',
      'socialist',
      'nationalist',
      'religious',
    ];
    const raw = ideologies.map((ideology) => ({
      ideology,
      n: supportSeed(w.seed, p.id, ideology),
    }));
    const total = raw.reduce((n, q) => n + q.n, 0);
    const parties = raw.map((q) => ({
      id: `${p.id}:${q.ideology}`,
      ideology: q.ideology,
      support: q.n / total,
      seats: Math.round((q.n / total) * 30),
    }));
    const military = cap(p.military / 120);
    governments[p.id] = {
      polityId: p.id,
      regime: military > 0.82 ? 'military' : p.legitimacy < 0.25 ? 'authoritarian' : 'oligarchy',
      parties,
      groups: [
        {
          id: `${p.id}:landowners`,
          kind: 'landowners',
          influence: 0.25,
          satisfaction: cap(0.7 - p.tax),
        },
        {
          id: `${p.id}:workers`,
          kind: 'workers',
          influence: 0.25,
          satisfaction: cap(0.7 - p.tax - p.legitimacy * -0.1),
        },
        { id: `${p.id}:merchants`, kind: 'merchants', influence: 0.18, satisfaction: 0.62 },
        {
          id: `${p.id}:military`,
          kind: 'military',
          influence: cap(0.12 + military * 0.35),
          satisfaction: cap(p.treasury / Math.max(1, p.realWorld?.population ?? 1) / 4),
        },
        { id: `${p.id}:clergy`, kind: 'clergy', influence: 0.2, satisfaction: 0.65 },
      ],
      laws: { suffrage: 0.08, labor: 0.05, religiousFreedom: 0.3, pressFreedom: 0.2 },
      causeIds: [],
    };
    const initialized = emit(
      'government_formed',
      [],
      undefined,
      `${p.name}的政体与利益集团进入模拟。`,
      {
        polityId: p.id,
        regime: governments[p.id].regime,
        baseline: 'synthetic',
        classification: 'synthetic-baseline',
        historicalClaim: false,
      },
      [],
      0.35,
    );
    governments[p.id].causeIds = [initialized.id];
  }
  // Indexed from settlement adjacency, O(V+E), with no polity cross product.
  const settlementById = new Map(w.settlements.map((s) => [s.id, s]));
  const borderPairs = new Set<string>();
  for (const s of w.settlements)
    for (const nid of s.neighbors) {
      const other = settlementById.get(nid);
      if (other && other.polityId !== s.polityId)
        borderPairs.add(pairKey(s.polityId, other.polityId));
    }
  for (const key of borderPairs) {
    const [a, b] = key.split('~');
    const ra = w.polities.find((p) => p.id === a)!,
      rb = w.polities.find((p) => p.id === b)!;
    relations[key] = {
      id: `diplomacy:${key}`,
      a,
      b,
      affinity: 0,
      dispute: 0,
      trade: 0.35,
      status: 'peace',
      treatySince: w.month,
      causeIds: [],
    };
    // Resource and relative power differences create modest, inspectable claims over time.
    if (Math.abs(ra.legitimacy - rb.legitimacy) > 0.55) relations[key].affinity = -0.1;
  }
  return {
    version: 1,
    governments,
    relations,
    wars: [],
    atrocities: [],
    lastEventIds: [],
    pendingCasualties: [],
    lastAdvancedMonth: -1,
    lastEffectsMonth: -1,
    routeBaseCapacity: Object.fromEntries((w.routes ?? []).map((r) => [r.id, r.capacity])),
    routeBaseStatus: Object.fromEntries((w.routes ?? []).map((r) => [r.id, r.status])),
    lastAtrocityStarted: {},
  };
}

export function initializeGeopolitics(w: World, emit: Emit) {
  if (!w.pack.id.startsWith('earth-')) return;
  if (!w.geopolitics) {
    w.geopolitics = createState(w, emit);
    return;
  }
  const state = w.geopolitics;
  const missing = new Set(w.polities.filter((p) => !state.governments[p.id]).map((p) => p.id));
  const additions = createState(w, emit, missing);
  Object.assign(state.governments, additions.governments);
  for (const [key, relation] of Object.entries(additions.relations))
    if (!state.relations[key]) state.relations[key] = relation;
  for (const route of w.routes ?? []) {
    state.routeBaseCapacity[route.id] ??= route.capacity;
    state.routeBaseStatus[route.id] ??= route.status;
  }
}

/** Deterministic, bounded state politics and diplomacy. Call after historical inputs so existing wars are visible. */
export function advanceGeopolitics(w: World, emit: LocalEmit, locals: Map<string, Person[]>) {
  if (!w.pack.id.startsWith('earth-')) return;
  initializeGeopolitics(w, emit);
  const holder = w as World & { geopolitics?: GeopoliticalState };
  const state = holder.geopolitics ?? (holder.geopolitics = createState(w, emit));
  if (state.lastAdvancedMonth === w.month) return;
  const polityById = new Map(w.polities.map((p) => [p.id, p]));
  const settlementById = new Map(w.settlements.map((s) => [s.id, s]));
  const settlementsByPolity = new Map<string, World['settlements']>();
  for (const s of w.settlements) {
    const list = settlementsByPolity.get(s.polityId) ?? [];
    list.push(s);
    settlementsByPolity.set(s.polityId, list);
  }
  const bordersByPair = new Map<
    string,
    Array<[World['settlements'][number], World['settlements'][number]]>
  >();
  const routeByPair = new Map((w.routes ?? []).map((r) => [pairKey(r.from, r.to), r]));
  for (const s of w.settlements)
    for (const id of s.neighbors) {
      const t = settlementById.get(id);
      if (!t || s.polityId === t.polityId || s.id > t.id) continue;
      const route = routeByPair.get(pairKey(s.id, t.id));
      const land =
        route?.mode === 'rail' || route?.mode === 'road' || (route?.km ?? Infinity) <= 10;
      const abstractCoastal = !!route && !land && route.km <= 120;
      if (!land && !abstractCoastal) continue;
      const key = pairKey(s.polityId, t.polityId);
      const list = bordersByPair.get(key) ?? [];
      list.push([s, t]);
      bordersByPair.set(key, list);
    }
  const alreadyAtWar = new Set<string>();
  for (const c of w.conflicts) if (c.status === 'active') alreadyAtWar.add(pairKey(c.a, c.b));
  for (const war of state.wars)
    if (war.status === 'active' || war.status === 'ceasefire')
      alreadyAtWar.add(pairKey(war.a, war.b));
  // Historical shock coverage blocks endogenous duplicate wars for nations already at war.
  const historicalWarPolities = new Set<string>();
  for (const q of w.shocks ?? [])
    if (q.kind === 'war' && q.started <= w.month && q.ends > w.month)
      for (const sid of q.locationIds) {
        const s = settlementById.get(sid);
        if (s) historicalWarPolities.add(s.polityId);
      }

  for (const p of w.polities) {
    const gov = state.governments[p.id];
    if (!gov) continue;
    const settlements = settlementsByPolity.get(p.id) ?? [];
    const unrest = populationMean(settlements, (s) => s.unrest);
    const scarcity = populationMean(settlements, (s) => s.scarcity);
    const stress = cap(unrest * 0.65 + scarcity * 0.8 + (1 - p.legitimacy) * 0.25);
    const interest = new Map(gov.groups.map((g) => [g.kind, g]));
    for (const g of gov.groups) {
      const pressure =
        g.kind === 'workers'
          ? scarcity + unrest
          : g.kind === 'military'
            ? 1 - interest.get('military')!.satisfaction
            : g.kind === 'clergy'
              ? 1 - gov.laws.religiousFreedom
              : g.kind === 'landowners'
                ? gov.laws.labor
                : p.tax;
      g.satisfaction = cap(g.satisfaction * 0.985 + (0.58 - pressure) * 0.015);
      g.influence = cap(g.influence + (g.satisfaction < 0.3 ? 0.002 : -0.0004), 0.03, 0.6);
    }
    for (const party of gov.parties) {
      const modifier =
        party.ideology === 'socialist'
          ? scarcity * 0.03 + unrest * 0.02
          : party.ideology === 'nationalist'
            ? (p.military / 100) * 0.008
            : party.ideology === 'religious'
              ? interest.get('clergy')!.influence * 0.004
              : party.ideology === 'liberal'
                ? (1 - gov.laws.pressFreedom) * 0.004
                : 0;
      party.support = cap(party.support + modifier - party.support * 0.002, 0.015, 0.8);
    }
    const ps = gov.parties.reduce((n, q) => n + q.support, 0);
    const representation = 0.15 + gov.laws.suffrage * 0.85;
    for (const party of gov.parties) {
      party.support /= ps;
      party.seats = Math.round(party.support * 100 * representation);
    }
    // Parliamentary bargaining: reform if reformist support and distress align; repressive turn if the cabinet feels threatened.
    const reformist =
      gov.parties.find((q) => q.ideology === 'liberal')!.support +
      gov.parties.find((q) => q.ideology === 'socialist')!.support;
    if (w.month % 12 === 0 && stress > 0.32 && reformist > 0.36 && gov.regime === 'parliamentary') {
      const before = gov.laws.labor;
      gov.laws.labor = cap(gov.laws.labor + 0.025, 0, 0.8);
      gov.laws.suffrage = cap(gov.laws.suffrage + 0.012, 0, 0.9);
      if (gov.laws.labor > before) {
        const causeIds = gov.causeIds.length ? gov.causeIds : [];
        const e = emit(
          'law_reform',
          [],
          undefined,
          `${p.name}的议会在社会压力下扩大劳动保障与选举参与。`,
          {
            polityId: p.id,
            labor: gov.laws.labor,
            suffrage: gov.laws.suffrage,
            classification: 'legislative-change',
          },
          causeIds,
          0.65,
        );
        gov.causeIds = [e.id];
        state.lastEventIds.push(e.id);
      }
    } else if (w.month % 12 === 0 && stress > 0.72 && gov.laws.pressFreedom > 0.04) {
      gov.laws.pressFreedom = cap(gov.laws.pressFreedom - 0.004);
      p.legitimacy = cap(p.legitimacy - 0.002);
      const e = emit(
        'political_repression',
        [],
        undefined,
        `${p.name}当局压缩新闻空间以应对持续的国内危机。`,
        {
          polityId: p.id,
          pressFreedom: gov.laws.pressFreedom,
          unrest,
          classification: 'coercive-policy',
        },
        gov.causeIds,
        0.55,
      );
      gov.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    }
    if (w.month > 0 && w.month % 48 === 0) {
      const politicalLifecycleActive = Boolean((w as World & { politics?: unknown }).politics);
      const previousRegime = gov.regime;
      if (!politicalLifecycleActive) {
        const religious = gov.parties.find((q) => q.ideology === 'religious')!;
        if (p.legitimacy < 0.32 && interest.get('military')!.influence > 0.3)
          gov.regime = 'military';
        else if (gov.laws.suffrage > 0.25) gov.regime = 'parliamentary';
        else if (religious.support > 0.36 && gov.laws.religiousFreedom < 0.18)
          gov.regime = 'theocracy';
        else gov.regime = 'oligarchy';
      }
      const participation = 0.15 + gov.laws.suffrage * 0.85;
      for (const party of gov.parties)
        party.seats = Math.round(party.support * 100 * participation);
      const e = emit(
        politicalLifecycleActive || previousRegime === gov.regime
          ? 'election'
          : gov.regime === 'military'
            ? 'coup'
            : 'government_transition',
        [],
        undefined,
        politicalLifecycleActive || previousRegime === gov.regime
          ? `${p.name}完成一次受选举权法令约束的选举。`
          : `${p.name}发生政体转换，统治联盟被新的力量取代。`,
        {
          polityId: p.id,
          previousRegime,
          regime: gov.regime,
          suffrage: gov.laws.suffrage,
          participation,
          reservedSeats: 100 - gov.parties.reduce((n, q) => n + q.seats, 0),
          parties: gov.parties.map((q) => ({
            ideology: q.ideology,
            support: q.support,
            seats: q.seats,
          })),
          classification: 'simulated-political-transition',
          baseline: 'synthetic',
        },
        gov.causeIds,
        0.75,
      );
      if (!politicalLifecycleActive && previousRegime !== gov.regime)
        p.legitimacy = cap(p.legitimacy - (gov.regime === 'military' ? 0.12 : 0.035));
      gov.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    }
  }

  // Relations already have a spatial border index. Diplomatic escalation needs concrete local strain.
  for (const rel of Object.values(state.relations)) {
    const a = polityById.get(rel.a),
      b = polityById.get(rel.b);
    if (!a || !b) continue;
    const aLoc = settlementsByPolity.get(rel.a) ?? [],
      bLoc = settlementsByPolity.get(rel.b) ?? [];
    const pressureA = populationMean(aLoc, (s) => s.unrest + s.scarcity);
    const pressureB = populationMean(bLoc, (s) => s.unrest + s.scarcity);
    const borderPressure =
      Math.abs((a.realWorld?.population ?? 1) - (b.realWorld?.population ?? 1)) /
      Math.max(a.realWorld?.population ?? 1, b.realWorld?.population ?? 1);
    const increment = Math.max(
      0,
      (pressureA + pressureB) * 0.0012 + borderPressure * 0.00012 - rel.trade * 0.00008,
    );
    rel.dispute = cap(rel.dispute + increment, 0, 2);
    rel.affinity = cap(rel.affinity + rel.trade * 0.0012 - rel.dispute * 0.0015, -1, 1);
    if (w.month % 12 === 0 && rel.status === 'peace' && rel.affinity > 0.55 && rel.trade > 0.35) {
      const causeIds = rel.causeIds.length
        ? rel.causeIds
        : [state.governments[rel.a].causeIds[0], state.governments[rel.b].causeIds[0]].filter(
            Boolean,
          );
      const e = emit(
        'alliance_treaty',
        [],
        undefined,
        `${a.name}与${b.name}签署防务与贸易协作条约。`,
        { a: a.id, b: b.id, trade: rel.trade, classification: 'binding-treaty' },
        causeIds,
        0.55,
      );
      rel.status = 'alliance';
      rel.treatySince = w.month;
      rel.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    }
    if (
      w.month % 12 === 0 &&
      rel.dispute > 0.3 &&
      rel.status !== 'war' &&
      rel.status !== 'armistice' &&
      rel.status !== 'sanctions'
    ) {
      const causeIds = rel.causeIds.length
        ? rel.causeIds
        : [state.governments[rel.a].causeIds[0], state.governments[rel.b].causeIds[0]].filter(
            Boolean,
          );
      const e = emit(
        'economic_sanctions',
        [],
        undefined,
        `${a.name}与${b.name}的边境争端引发有限贸易制裁，双边交易受到约束。`,
        {
          a: a.id,
          b: b.id,
          previousTrade: rel.trade,
          dispute: rel.dispute,
          classification: 'economic-sanctions',
        },
        causeIds,
        0.6,
      );
      rel.trade = cap(rel.trade - 0.1, 0, 1);
      rel.status = 'sanctions';
      rel.causeIds = [e.id];
      state.lastEventIds.push(e.id);
    }
    if (rel.dispute > 0.12 && !rel.disputeEvidenceId) {
      const locationId = bordersByPair.get(pairKey(rel.a, rel.b))?.[0]?.[0].id;
      if (!locationId) continue;
      const observation = emit(
        'border_pressure_observed',
        [],
        locationId,
        `${a.name}与${b.name}的边境资源与地方压力持续上升。`,
        {
          a: a.id,
          b: b.id,
          dispute: rel.dispute,
          borderPressure,
          localStress: pressureA + pressureB,
          classification: 'measured-pressure',
        },
        [],
        0.45,
      );
      const evidence = emit(
        'border_dispute',
        [],
        locationId,
        `${a.name}与${b.name}在边境资源、税收和地方安全问题上积累争端。`,
        {
          a: a.id,
          b: b.id,
          dispute: rel.dispute,
          borderPressure,
          localStress: pressureA + pressureB,
          classification: 'emergent-cause',
        },
        [observation.id],
        0.6,
      );
      rel.disputeEvidenceId = evidence.id;
      rel.causeIds = [evidence.id];
      state.lastEventIds.push(evidence.id);
    }
    if (
      !['peace', 'alliance', 'sanctions'].includes(rel.status) ||
      rel.dispute < 0.55 ||
      !diplomacyDecision(w, rel.a, rel.b).allowed ||
      foreignAuthority(w, rel.a).kind === 'foreign' ||
      foreignAuthority(w, rel.b).kind === 'foreign' ||
      alreadyAtWar.has(pairKey(rel.a, rel.b)) ||
      historicalWarPolities.has(rel.a) ||
      historicalWarPolities.has(rel.b)
    )
      continue;
    const campA = [
      ...new Set([
        ...diplomaticCamp(w, a.id),
        ...Object.values(state.relations)
          .filter((r) => r.status === 'alliance' && (r.a === a.id || r.b === a.id))
          .map((r) => (r.a === a.id ? r.b : r.a)),
      ]),
    ];
    const campB = [
      ...new Set([
        ...diplomaticCamp(w, b.id),
        ...Object.values(state.relations)
          .filter((r) => r.status === 'alliance' && (r.a === b.id || r.b === b.id))
          .map((r) => (r.a === b.id ? r.b : r.a)),
      ]),
    ].filter((id) => !campA.includes(id));
    const fronts: Front[] = [];
    for (const memberA of campA)
      for (const memberB of campB)
        for (const [s, other] of bordersByPair.get(pairKey(memberA, memberB)) ?? []) {
          const route = routeByPair.get(pairKey(s.id, other.id));
          const kind =
            route?.mode === 'rail' || route?.mode === 'road' || (route?.km ?? Infinity) <= 10
              ? 'land'
              : 'coastal_abstract';
          fronts.push(
            s.polityId === memberA
              ? {
                  aSettlementId: s.id,
                  bSettlementId: other.id,
                  control: 0.5,
                  supply: 0.75,
                  forceA: 0,
                  forceB: 0,
                  kind,
                }
              : {
                  aSettlementId: other.id,
                  bSettlementId: s.id,
                  control: 0.5,
                  supply: 0.75,
                  forceA: 0,
                  forceB: 0,
                  kind,
                },
          );
        }
    if (!fronts.length) continue;
    const causeIds = [
      ...new Set([rel.disputeEvidenceId, ...rel.causeIds].filter((id): id is string => !!id)),
    ];
    const e = emit(
      'war_started',
      [],
      fronts[0].aSettlementId,
      `${a.name}与${b.name}在持续边境争端后进入战争状态。`,
      {
        a: a.id,
        b: b.id,
        causeIds,
        brokenTreaty: rel.status === 'alliance' ? 'alliance' : undefined,
        frontCount: fronts.length,
        classification: 'declared-war',
      },
      causeIds,
      0.95,
    );
    const participants = [...campA, ...campB];
    const war: War = {
      id: `war:${rel.id}:${w.month}`,
      a: a.id,
      b: b.id,
      campA,
      campB,
      started: w.month,
      status: 'active',
      causeIds: [e.id, ...causeIds],
      fronts,
      mobilized: Object.fromEntries(participants.map((id) => [id, 0])),
      supplyFulfillment: Object.fromEntries(participants.map((id) => [id, 1])),
      consumedSupplies: Object.fromEntries(participants.map((id) => [id, { arms: 0, fuel: 0 }])),
      casualties: Object.fromEntries(participants.map((id) => [id, 0])),
      occupied: [],
      months: 0,
      settlementOwnerBefore: {},
    };
    state.wars.push(war);
    rel.status = 'war';
    rel.causeIds = [e.id];
    alreadyAtWar.add(pairKey(a.id, b.id));
    state.lastEventIds.push(e.id);
  }

  advanceWars(w, state, emit, locals, settlementById, polityById, settlementsByPolity);
  advanceAtrocities(w, state, emit, locals, polityById, settlementsByPolity, settlementById);
  const pending = new Map<string, CasualtyProposal>();
  const propose = (proposal: CasualtyProposal) => {
    const old = pending.get(proposal.personId);
    if (!old)
      pending.set(proposal.personId, { ...proposal, causeIds: proposal.causeIds.slice(0, 16) });
    else {
      old.monthlyRisk = Math.min(0.01, old.monthlyRisk + proposal.monthlyRisk);
      old.causeIds = [...new Set([...old.causeIds, ...proposal.causeIds])].slice(-16);
      if (proposal.kind === 'combat') old.kind = 'combat';
    }
  };
  // Emit one bounded proposal per represented person, indexed by location. Core owns death and inheritance handling.
  for (const war of state.wars)
    if (war.status === 'active')
      for (const front of war.fronts) {
        if (front.forceA + front.forceB <= 0) continue;
        for (const locationId of [front.aSettlementId, front.bSettlementId]) {
          const exposure = locals.get(locationId) ?? [];
          for (const person of exposure)
            propose({
              personId: person.id,
              causeIds: war.causeIds,
              monthlyRisk: 0.00035 * front.supply,
              kind: 'combat',
            });
        }
      }
  for (const atrocity of state.atrocities)
    if (atrocity.active)
      for (const person of locals.get(atrocity.locationId) ?? [])
        propose({
          personId: person.id,
          causeIds: [...atrocity.causeIds, ...atrocity.evidenceIds.slice(-1)],
          monthlyRisk: 0.00012,
          kind: 'persecution',
        });
  state.pendingCasualties = [...pending.values()];
  if (state.lastEventIds.length > 256) state.lastEventIds = state.lastEventIds.slice(-256);
  state.lastAdvancedMonth = w.month;
}

/** Applies executable law and treaty effects before market/macro production for this month. */
export function applyGeopoliticalEffects(w: World, emit: LocalEmit) {
  if (!w.pack.id.startsWith('earth-')) return;
  const state = (w as World & { geopolitics?: GeopoliticalState }).geopolitics;
  if (!state || state.lastEffectsMonth === w.month) return;
  const polityById = new Map(w.polities.map((p) => [p.id, p]));
  const settlementById = new Map(w.settlements.map((s) => [s.id, s]));
  const settlementsByPolity = new Map<string, World['settlements']>();
  const adultsByPolity = new Map<string, number>();
  for (const s of w.settlements) {
    const list = settlementsByPolity.get(s.polityId) ?? [];
    list.push(s);
    settlementsByPolity.set(s.polityId, list);
    adultsByPolity.set(s.polityId, (adultsByPolity.get(s.polityId) ?? 0) + s.cohort.adults);
  }
  const activeMobilized = new Map<string, number>();
  for (const war of state.wars)
    if (war.status === 'active')
      for (const [id, n] of Object.entries(war.mobilized))
        activeMobilized.set(id, (activeMobilized.get(id) ?? 0) + n);
  for (const route of w.routes ?? []) {
    const a = settlementById.get(route.from)?.polityId;
    const b = settlementById.get(route.to)?.polityId;
    if (!a || !b || a === b) continue;
    const relation = state.relations[pairKey(a, b)];
    state.routeBaseCapacity[route.id] ??= route.capacity;
    const base = state.routeBaseCapacity[route.id];
    const factor = !relation
      ? 1
      : relation.status === 'war'
        ? 0.05
        : relation.status === 'sanctions'
          ? 0.2 + relation.trade * 0.8
          : relation.status === 'alliance'
            ? 1.15
            : 1;
    route.capacity = base * factor;
    route.status =
      relation?.status === 'war' ? 'restricted' : (state.routeBaseStatus[route.id] ?? 'open');
  }
  for (const [polityId, government] of Object.entries(state.governments)) {
    const polity = polityById.get(polityId);
    const settlements = settlementsByPolity.get(polityId) ?? [];
    if (!polity || !settlements.length) continue;
    const total = settlements.reduce(
      (n, s) => n + s.cohort.children + s.cohort.adults + s.cohort.elders,
      0,
    );
    const transfer = Math.min(
      polity.treasury,
      total * (government.laws.labor * 0.00018 + government.laws.suffrage * 0.00008),
    );
    if (transfer > 0 && total > 0) {
      polity.treasury -= transfer;
      let remaining = transfer;
      for (let i = 0; i < settlements.length; i++) {
        const s = settlements[i];
        const local = s.cohort.children + s.cohort.adults + s.cohort.elders;
        const amount = i === settlements.length - 1 ? remaining : (transfer * local) / total;
        s.coin += amount;
        remaining -= amount;
      }
    }
    for (const s of settlements) {
      const mobilized = activeMobilized.get(polityId) ?? 0;
      const adults = Math.max(1, s.cohort.adults);
      const localMobilized =
        total > 0 ? (mobilized * adults) / Math.max(1, adultsByPolity.get(polityId) ?? 0) : 0;
      if (s.economy) {
        s.economy.unemployment = cap(
          s.economy.unemployment + (localMobilized / adults) * 0.35 - government.laws.labor * 0.012,
          0,
          0.95,
        );
        s.economy.education = cap(s.economy.education + government.laws.suffrage * 0.00012);
        s.economy.infrastructure = cap(
          s.economy.infrastructure + government.laws.labor * 0.00003,
          0.1,
          1,
        );
        s.economy.productionMultiplier *=
          1 - (localMobilized / adults) * 0.3 + government.laws.labor * 0.004;
      }
      s.prosperity = cap(
        s.prosperity + government.laws.labor * 0.0004 - (localMobilized / adults) * 0.001,
      );
    }
  }
  // Evidence-driven accountability is a legal/political response with external consequences.
  for (const atrocity of state.atrocities) {
    if (atrocity.accountable || atrocity.evidenceIds.length < 12) continue;
    atrocity.accountable = true;
    atrocity.active = false;
    const perpetrator = polityById.get(atrocity.perpetratorPolityId);
    if (perpetrator) perpetrator.legitimacy = cap(perpetrator.legitimacy - 0.12);
    const evidence = emit(
      'persecution_accountability',
      [],
      atrocity.locationId,
      '调查机构根据持续证据确认迫害责任，启动问责并引发外交制裁。',
      {
        atrocityId: atrocity.id,
        perpetratorPolityId: atrocity.perpetratorPolityId,
        legitimacy: perpetrator?.legitimacy,
        classification: 'accountability',
      },
      atrocity.evidenceIds.slice(-1),
      0.9,
    );
    state.lastEventIds.push(evidence.id);
    for (const relation of Object.values(state.relations)) {
      if (
        relation.a !== atrocity.perpetratorPolityId &&
        relation.b !== atrocity.perpetratorPolityId
      )
        continue;
      relation.status = 'sanctions';
      relation.trade = cap(relation.trade - 0.15);
    }
  }
  state.lastEffectsMonth = w.month;
}

function advanceWars(
  w: World,
  state: GeopoliticalState,
  emit: LocalEmit,
  locals: Map<string, Person[]>,
  settlementById: Map<string, World['settlements'][number]>,
  polityById: Map<string, World['polities'][number]>,
  settlementsByPolity: Map<string, World['settlements']>,
) {
  const allocatedMobilized = new Map<string, number>();
  const occupiedThisMonth = new Set<string>();
  for (const war of state.wars) {
    if (war.status !== 'active') continue;
    const signedTruce = state.relations[pairKey(war.a, war.b)];
    if (signedTruce?.status === 'armistice') {
      war.status = 'ended';
      for (const id of Object.keys(war.mobilized)) war.mobilized[id] = 0;
      const e = emit(
        'peace_treaty',
        [],
        war.fronts[0]?.aSettlementId,
        '外交协商促成停火，部队解除动员并保留已形成的控制线。',
        { warId: war.id, classification: 'negotiated-peace' },
        [...signedTruce.causeIds, ...war.causeIds].slice(-16),
        0.9,
      );
      signedTruce.status = 'peace';
      signedTruce.causeIds = [e.id];
      state.lastEventIds.push(e.id);
      continue;
    }
    war.months++;
    const sides = [...war.campA, ...war.campB];
    for (const side of sides) {
      const polity = polityById.get(side)!;
      const capacity = livingTotal(w, side);
      const currentAdults = (settlementsByPolity.get(side) ?? []).reduce(
        (n, s) => n + s.cohort.adults,
        0,
      );
      const nationalAvailable = Math.max(
        0,
        Math.min(currentAdults, Math.floor(capacity * 0.025)) - (allocatedMobilized.get(side) ?? 0),
      );
      war.mobilized[side] = Math.min(war.mobilized[side] ?? 0, nationalAvailable);
      const target = Math.min(
        Math.floor(capacity * 0.025),
        Math.floor(capacity * (0.0015 + Math.min(0.006, polity.military / 10000))),
      );
      const need = Math.max(0, target - (war.mobilized[side] ?? 0));
      // Mobilized people remain inside the existing adult cohort and are never double counted as a new population bucket.
      const available = (settlementsByPolity.get(side) ?? []).reduce(
        (n, s) => n + Math.max(0, s.cohort.adults - 1),
        0,
      );
      const recruited = Math.min(
        need,
        available,
        Math.max(0, nationalAvailable - war.mobilized[side]),
      );
      war.mobilized[side] = (war.mobilized[side] ?? 0) + recruited;
      allocatedMobilized.set(side, (allocatedMobilized.get(side) ?? 0) + war.mobilized[side]);
      // Military reserve is included in population via reversible cohort transfers on demobilization.
      const upkeep = recruited * 0.12 + (war.mobilized[side] ?? 0) * 0.018;
      const spend = Math.min(polity.treasury, upkeep);
      polity.treasury -= spend;
      const supplierFront = war.fronts.find(
        (f) =>
          settlementById.get(f.aSettlementId)?.polityId === side ||
          settlementById.get(f.bSettlementId)?.polityId === side,
      );
      const supplier =
        supplierFront &&
        [
          settlementById.get(supplierFront.aSettlementId),
          settlementById.get(supplierFront.bSettlementId),
        ].find((s) => s?.polityId === side);
      const receiver =
        supplier ??
        settlementsByPolity.get(side)?.[0] ??
        settlementById.get(war.fronts[0]?.aSettlementId);
      if (receiver) receiver.coin += spend;
      else polity.treasury += spend;
      if (!w.industry) {
        war.supplyFulfillment[side] = spend >= upkeep * 0.5 ? 0.8 : 0.4;
      }
      polity.military = Math.max(
        0,
        polity.military - spend / Math.max(1, (polity.realWorld?.population ?? capacity) * 0.01),
      );
    }
  }
  // Mobilize all wars before allocating a single shared national stock and route budget.
  if (w.industry && w.month % 6 === 0) {
    for (const [id, mobilized] of allocatedMobilized) {
      const prior = w.militaryLogistics?.lastResult?.polities[id];
      if (mobilized > 0 && prior && prior.routeFulfillment < 0.5) {
        const maritime = state.wars.some(
          (war) =>
            war.status === 'active' &&
            [...war.campA, ...war.campB].includes(id) &&
            war.fronts.some((f) => f.kind === 'coastal_abstract'),
        );
        investMilitaryTransport(w, id, maritime ? 'sea' : 'land', 50, emit);
      }
    }
  }
  const logistics = w.industry ? advanceMilitaryLogistics(w, emit) : undefined;
  for (const war of state.wars) {
    if (war.status !== 'active') continue;
    const sides = [...war.campA, ...war.campB];
    const supplied = logistics?.wars[war.id];
    for (const id of sides)
      if (supplied) {
        war.supplyFulfillment[id] = supplied.sideFulfillment[id] ?? 0;
        const used = supplied.consumedByPolity[id];
        if (used) {
          war.consumedSupplies[id] ??= { arms: 0, fuel: 0 };
          war.consumedSupplies[id].arms += used.arms;
          war.consumedSupplies[id].fuel += used.fuel;
        }
      }
    const lossThisMonth: Record<string, number> = Object.fromEntries(sides.map((id) => [id, 0]));
    const expectedLosses: Record<string, number> = Object.fromEntries(sides.map((id) => [id, 0]));
    const owners = new Map(w.settlements.map((place) => [place.id, place.polityId]));
    const occupations = new Map<
      string,
      { settlement: World['settlements'][number]; polityId: string; front: Front; strength: number }
    >();

    const frontsA = Math.max(1, war.fronts.length);
    const frontsB = Math.max(1, war.fronts.length);
    for (const [frontIndex, front] of war.fronts.entries()) {
      const frontSupply = supplied?.frontLogistics[frontIndex];
      const sa = settlementById.get(front.aSettlementId),
        sb = settlementById.get(front.bSettlementId);
      if (!sa || !sb) continue;
      const forceA =
        war.campA.reduce(
          (n, id) =>
            n +
            (war.mobilized[id] ?? 0) *
              (frontSupply ? frontSupply.supplyA : (war.supplyFulfillment[id] ?? 0)),
          0,
        ) / frontsA;
      const forceB =
        war.campB.reduce(
          (n, id) =>
            n +
            (war.mobilized[id] ?? 0) *
              (frontSupply ? frontSupply.supplyB : (war.supplyFulfillment[id] ?? 0)),
          0,
        ) / frontsB;
      front.forceA = forceA;
      front.forceB = forceB;
      const balance = (forceA - forceB) / Math.max(1, forceA + forceB);
      front.control = cap(front.control + balance * front.supply * 0.075, 0, 1);
      front.supply = cap(
        front.supply - 0.0005 + (sa.food + sb.food > 20 ? 0.0002 : -0.001),
        0.05,
        1,
      );
      // Scenario intensity, not a historical casualty estimate. Only mutually
      // engaged, supplied forces create combat losses; keep fractions across months.
      const engagement = Math.min(forceA, forceB);
      const expected = engagement * 0.004 * (1.1 - front.supply);
      for (const [camp, place, force] of [
        [war.campA, sa, forceA],
        [war.campB, sb, forceB],
      ] as const) {
        const total = camp.reduce((n, id) => n + (war.mobilized[id] ?? 0), 0);
        if (engagement > 0 && total > 0)
          for (const id of camp)
            expectedLosses[id] += (expected * (war.mobilized[id] ?? 0)) / total;
        const s = place;
        const cost = Math.min(s.food, Math.max(0, force * 0.0008));
        s.food -= cost;
        w.audit.destroyedFood += cost;
      }
      // Front endpoint owners can change through another front. Resolve all
      // claims from this war against one ownership snapshot, using fixed camps.
      const attacking =
        front.kind !== 'land'
          ? undefined
          : front.control > 0.68 && forceA >= 1 && forceA > forceB
            ? {
                target: sb,
                origin: sa,
                camp: war.campA,
                enemy: war.campB,
                principal: war.a,
                strength: forceA - forceB,
              }
            : front.control < 0.32 && forceB >= 1 && forceB > forceA
              ? {
                  target: sa,
                  origin: sb,
                  camp: war.campB,
                  enemy: war.campA,
                  principal: war.b,
                  strength: forceB - forceA,
                }
              : undefined;
      if (
        attacking &&
        attacking.enemy.includes(owners.get(attacking.target.id) ?? '') &&
        !occupiedThisMonth.has(attacking.target.id)
      ) {
        const originOwner = owners.get(attacking.origin.id)!;
        const polityId = attacking.camp.includes(originOwner) ? originOwner : attacking.principal;
        const prior = occupations.get(attacking.target.id);
        if (
          polityById.has(polityId) &&
          (!prior ||
            attacking.strength > prior.strength ||
            (attacking.strength === prior.strength && polityId.localeCompare(prior.polityId) < 0))
        )
          occupations.set(attacking.target.id, {
            settlement: attacking.target,
            polityId,
            front,
            strength: attacking.strength,
          });
      }
    }
    war.casualtyRemainder ??= {};
    for (const id of sides) {
      const accrued = (war.casualtyRemainder[id] ?? 0) + expectedLosses[id];
      const due = Math.floor(accrued + 1e-10);
      war.casualtyRemainder[id] = Math.max(0, accrued - due);
      let owed = Math.min(due, war.mobilized[id] ?? 0),
        actual = 0;
      for (const home of settlementsByPolity.get(id) ?? []) {
        if (home.polityId !== id || owed <= 0) continue;
        const taken = Math.min(home.cohort.adults, owed);
        home.cohort.adults -= taken;
        owed -= taken;
        actual += taken;
      }
      w.audit.deaths += actual;
      lossThisMonth[id] = actual;
      war.mobilized[id] = Math.max(0, (war.mobilized[id] ?? 0) - actual);
    }
    // One committed control result per city/month. Simultaneous wars use the same
    // established oldest-war priority as national mobilization, never loop flips.
    for (const [id, occupation] of [...occupations].sort(([a], [b]) => a.localeCompare(b))) {
      const { settlement, polityId, front } = occupation;
      if (occupiedThisMonth.has(id) || settlement.polityId === polityId) continue;
      const previousOwner = settlement.polityId;
      war.settlementOwnerBefore[id] ??= previousOwner;
      settlement.polityId = polityId;
      front.occupierId = polityId;
      occupiedThisMonth.add(id);
      if (!war.occupied.includes(id)) war.occupied.push(id);
      const occupationEvent = emit(
        'territory_occupied',
        [],
        id,
        `${polityById.get(polityId)?.name ?? polityId}控制了前线地区。`,
        {
          warId: war.id,
          settlementId: id,
          previousOwner,
          occupierId: polityId,
          classification: 'military-occupation',
        },
        war.causeIds,
        0.85,
      );
      synchronizeSovereigntyControl(w, [id], occupationEvent.id);
    }
    war.occupied = Object.entries(war.settlementOwnerBefore)
      .filter(([id, previous]) => {
        const current = settlementById.get(id)?.polityId;
        return (
          current !== previous &&
          ((war.campA.includes(current ?? '') && war.campB.includes(previous)) ||
            (war.campB.includes(current ?? '') && war.campA.includes(previous)))
        );
      })
      .map(([id]) => id)
      .sort();
    for (const side of sides) {
      war.casualties[side] = (war.casualties[side] ?? 0) + lossThisMonth[side];
      // Return non-casualty mobilized persons gradually after demobilization only; active forces remain part of population.
    }
    if (
      Object.values(lossThisMonth).some((n) => n > 0) ||
      war.months === 1 ||
      war.months % 3 === 0
    ) {
      const battle = emit(
        'military_campaign',
        [],
        war.fronts[0]?.aSettlementId,
        `战争进入第${war.months}个月，前线行动受到兵力、运输与军需的共同约束。`,
        {
          warId: war.id,
          lossesByPolity: lossThisMonth,
          mobilized: { ...war.mobilized },
          supplyFulfillment: { ...war.supplyFulfillment },
          fronts: war.fronts.slice(0, 12).map((f) => ({
            a: f.aSettlementId,
            b: f.bSettlementId,
            control: f.control,
            forceA: f.forceA,
            forceB: f.forceB,
          })),
          classification: 'committed-military-campaign',
        },
        [...war.causeIds, ...(w.militaryLogistics?.lastEventIds.slice(-2) ?? [])].slice(-16),
        0.8,
      );
      war.causeIds = [
        ...new Set([...war.causeIds.slice(0, 2), ...war.causeIds.slice(-10), battle.id]),
      ];
    }
    if (war.months % 12 === 0) {
      const weakest = Math.min(
        ...sides.map(
          (id) =>
            polityById.get(id)!.treasury /
            Math.max(1, polityById.get(id)!.realWorld?.population ?? livingTotal(w, id)),
        ),
      );
      if (
        war.months >= 12 &&
        (weakest < 0.08 ||
          Math.min(...Object.values(war.supplyFulfillment)) < 0.1 ||
          war.fronts.filter((f) => f.control > 0.9 || f.control < 0.1).length >=
            Math.max(1, Math.ceil(war.fronts.length * 0.75)))
      ) {
        war.status = 'ceasefire';
        const armistice = emit(
          'armistice',
          [],
          war.fronts[0]?.aSettlementId,
          '战争双方因财政与补给压力达成停火，前线进入谈判状态。',
          {
            warId: war.id,
            months: war.months,
            casualties: war.casualties,
            occupied: war.occupied,
            classification: 'negotiated-ceasefire',
          },
          war.causeIds,
          0.85,
        );
        state.lastEventIds.push(armistice.id);
        const territoryScore = war.fronts.reduce((n, f) => n + f.control - 0.5, 0);
        const winnerId =
          Math.abs(territoryScore) < 0.00001 ? undefined : territoryScore > 0 ? war.a : war.b;
        war.winnerId = winnerId;
        if (winnerId) {
          const losers = war.campA.includes(winnerId) ? war.campB : war.campA;
          for (const loserId of losers) {
            const loser = polityById.get(loserId)!,
              winner = polityById.get(winnerId)!;
            const reparations = Math.min(loser.treasury, war.occupied.length * 1000);
            loser.treasury -= reparations;
            winner.treasury += reparations;
            loser.legitimacy = cap(loser.legitimacy - 0.025);
          }
        }
        // A signed settlement immediately ends fighting; mobilized adults return to civilian availability.
        for (const side of sides) war.mobilized[side] = 0;
        war.status = 'ended';
        const rel = state.relations[pairKey(war.a, war.b)];
        if (rel) {
          rel.status = 'peace';
          rel.trade = cap(rel.trade + 0.1);
          rel.dispute = Math.max(0, rel.dispute - 0.35);
        }
        const e = emit(
          'peace_treaty',
          [],
          war.fronts[0]?.aSettlementId,
          winnerId
            ? `${polityById.get(winnerId)?.name ?? '胜方'}与战败方签署和平安排，结算赔偿并恢复外交渠道。`
            : '双方签署停战和平安排，未能改变战线归属。',
          {
            warId: war.id,
            months: war.months,
            winnerId,
            casualties: war.casualties,
            occupied: war.occupied,
            classification: 'peace-settlement',
          },
          [armistice.id, ...war.causeIds],
          0.9,
        );
        if (rel) {
          rel.treatySince = w.month;
          rel.causeIds = [e.id];
        }
        state.lastEventIds.push(e.id);
      }
    }
  }
}

function advanceAtrocities(
  w: World,
  state: GeopoliticalState,
  emit: LocalEmit,
  locals: Map<string, Person[]>,
  polityById: Map<string, World['polities'][number]>,
  settlementsByPolity: Map<string, World['settlements']>,
  settlementById: Map<string, World['settlements'][number]>,
) {
  for (const gov of Object.values(state.governments)) {
    const polity = polityById.get(gov.polityId)!;
    const local = (settlementsByPolity.get(polity.id) ?? []).filter((s) => s.unrest > 0.75);
    const coercion = gov.regime === 'authoritarian' || gov.regime === 'military' ? 0.15 : 0;
    const lowFreedom = 1 - gov.laws.pressFreedom;
    const location = local.sort((a, b) => b.unrest - a.unrest)[0];
    if (
      location &&
      !state.atrocities.some((a) => a.active && a.perpetratorPolityId === polity.id) &&
      w.month - (state.lastAtrocityStarted[polity.id] ?? -1000) >= 120 &&
      coercion + lowFreedom * location.unrest > 0.65
    ) {
      const targetGroup =
        gov.laws.religiousFreedom < 0.2 ? 'religious_minority' : 'political_dissidents';
      const priorCause = gov.causeIds.length ? gov.causeIds : state.lastEventIds.slice(-2);
      const evidence = emit(
        'persecution_documented',
        [],
        location.id,
        `${polity.name}当局对抽象群体实施了持续迫害；伤亡、流离与证据将逐月记录。`,
        {
          perpetratorPolityId: polity.id,
          targetGroup,
          mechanism: 'state-coercion',
          classification: 'documented-harm',
        },
        priorCause,
        0.85,
      );
      state.atrocities.push({
        id: `atrocity:${polity.id}:${w.month}`,
        perpetratorPolityId: polity.id,
        targetGroup,
        locationId: location.id,
        started: w.month,
        active: true,
        deaths: 0,
        displaced: 0,
        causeIds: [evidence.id, ...priorCause],
        evidenceIds: [evidence.id],
      });
      state.lastAtrocityStarted[polity.id] = w.month;
      state.lastEventIds.push(evidence.id);
    }
  }
  for (const atrocity of state.atrocities) {
    if (!atrocity.active) continue;
    const s = settlementById.get(atrocity.locationId);
    if (!s) {
      atrocity.active = false;
      continue;
    }
    const deaths = Math.min(
      s.cohort.adults,
      Math.floor((s.cohort.children + s.cohort.adults + s.cohort.elders) * 0.000025),
    );
    s.cohort.adults -= deaths;
    w.audit.deaths += deaths;
    atrocity.deaths += deaths;
    const target = s.neighbors
      .map((id) => settlementById.get(id))
      .find((q) => q && q.polityId !== s.polityId);
    const displaced = Math.min(
      s.cohort.adults,
      Math.floor((s.cohort.children + s.cohort.adults + s.cohort.elders) * 0.00008),
    );
    if (target && displaced > 0) {
      s.cohort.adults -= displaced;
      target.cohort.adults += displaced;
      atrocity.displaced += displaced;
      target.unrest = cap(
        target.unrest + Math.min(0.04, (displaced / Math.max(1, target.cohort.adults)) * 2),
      );
      if (target.economy)
        target.economy.unemployment = cap(target.economy.unemployment + 0.02, 0, 0.95);
    }
    const e = emit(
      'persecution_evidence',
      [],
      s.id,
      `${polityById.get(atrocity.perpetratorPolityId)?.name ?? '当局'}迫害仍在持续，记录到${deaths}名死者与${target ? displaced : 0}名流离者。`,
      {
        atrocityId: atrocity.id,
        perpetratorPolityId: atrocity.perpetratorPolityId,
        targetGroup: atrocity.targetGroup,
        deaths,
        displaced: target ? displaced : 0,
        evidenceCount: atrocity.evidenceIds.length + 1,
        classification: 'documented-harm',
      },
      atrocity.causeIds,
      0.8,
    );
    atrocity.evidenceIds.push(e.id);
    if (atrocity.evidenceIds.length >= 24 || w.month - atrocity.started >= 36)
      atrocity.active = false;
  }
}
