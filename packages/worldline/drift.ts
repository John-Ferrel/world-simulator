import { population, safeText } from '../contracts/index.js';
import type { HistoricalEvent, Person, Settlement, World } from '../contracts/index.js';
import {
  WORLDLINE_DIMENSIONS,
  WORLDLINE_DIMENSION_LABELS,
  computeWorldlineOverallScore,
  parseWorldlineAssessment,
  type WorldlineAssessment,
  type WorldlineBaseline,
  type WorldlineDimension,
  type WorldlineDimensionAssessment,
  type WorldlineEvidence,
  type WorldlineIntervention,
} from './schema.js';

/**
 * Deterministic, state-derived fallback for periodic worldline assessment.
 *
 * It never predicts, never invents events and never mutates the world. Every
 * claim is anchored to a settlement, a person that exists in the snapshot, or a
 * committed event supplied by the caller. Dimensions with no defensible data
 * stay `unknown` instead of receiving a fabricated score.
 */

type EvidenceRefs = {
  eventIds?: readonly string[];
  locationIds?: readonly string[];
  personIds?: readonly string[];
};

type DimensionDraft = {
  dimension: WorldlineDimension;
  status: 'assessed' | 'unknown';
  score: number | null;
  baseline: WorldlineBaseline;
  evidenceIds: string[];
  explanation: string;
  anomaly?: { severity: number; description: string };
};

const round = (value: number, digits = 3) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const mean = (values: readonly number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const fmt = (value: number, digits = 2) =>
  Number.isFinite(value) ? value.toFixed(digits) : '未知';

const clean = (value: string, max: number) =>
  safeText(String(value)).replace(/\s+/g, ' ').trim().slice(0, max) || '未命名记录';

const unknownDraft = (dimension: WorldlineDimension, explanation: string): DimensionDraft => ({
  dimension,
  status: 'unknown',
  score: null,
  baseline: { kind: 'none', value: null, note: '没有可用于比较的可验证基线或证据' },
  evidenceIds: [],
  explanation,
});

const eventBaseline = (value: number, note: string): WorldlineBaseline => ({
  kind: 'event-derived',
  value: Math.max(0, value),
  note,
});

function calendarOf(world: World): { year: number; month: number } | null {
  if (!world.calendar) return null;
  return {
    year: world.calendar.startYear + Math.floor(world.month / 12),
    month: (world.month % 12) + 1,
  };
}

const cohortPopulation = (settlement: Settlement) =>
  settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders;

const isWarEvent = (event: HistoricalEvent) =>
  event.kind === 'battle' ||
  event.kind === 'military_campaign' ||
  event.kind === 'territory_occupied' ||
  event.kind === 'peace_treaty' ||
  event.kind === 'armistice' ||
  event.kind.startsWith('war_') ||
  event.kind === 'war';

const isFamineEvent = (event: HistoricalEvent) =>
  event.kind === 'scarcity' ||
  event.kind === 'famine' ||
  (event.kind === 'shock' && event.data.kind === 'supply');

const isUnrestEvent = (event: HistoricalEvent) =>
  event.kind === 'unrest' ||
  event.kind === 'riot' ||
  event.kind === 'labor_strike' ||
  event.kind === 'political_repression' ||
  event.kind === 'persecution_documented' ||
  event.kind === 'movement_dissolved' ||
  event.kind.startsWith('society_');

const isPoliticalEvent = (event: HistoricalEvent) =>
  event.kind.startsWith('political_') ||
  event.kind === 'government_transition' ||
  event.kind === 'reform_failed' ||
  event.kind === 'law_reform' ||
  event.kind === 'institution_founded' ||
  event.kind === 'institution_dissolved' ||
  event.kind === 'succession_contest';

const isTechnologyEvent = (event: HistoricalEvent) =>
  event.kind.includes('research') ||
  event.kind.includes('discov') ||
  event.kind.includes('innovation') ||
  event.kind.includes('technology');

const isDeathEvent = (event: HistoricalEvent) => event.kind === 'death';

class EvidenceBook {
  readonly items: WorldlineEvidence[] = [];

  add(claim: string, refs: EvidenceRefs): string | undefined {
    const eventIds = [...new Set(refs.eventIds ?? [])].slice(0, 8);
    const locationIds = [...new Set(refs.locationIds ?? [])].slice(0, 8);
    const personIds = [...new Set(refs.personIds ?? [])].slice(0, 8);
    if (eventIds.length + locationIds.length + personIds.length === 0) return undefined;
    const id = `ev-${this.items.length + 1}`;
    this.items.push({
      id,
      claim: clean(claim, 500),
      eventIds,
      locationIds,
      personIds,
    });
    return id;
  }
}

export function assessWorldline(
  world: World,
  recentEvents: readonly HistoricalEvent[] = [],
): WorldlineAssessment {
  const settlements = world.settlements;
  const polities = world.polities;
  const persons = world.persons;
  const settlementById = new Map(settlements.map((settlement) => [settlement.id, settlement]));
  const polityById = new Map(polities.map((polity) => [polity.id, polity]));
  const personById = new Map(persons.map((person) => [person.id, person]));
  const livingPersons = persons.filter((person) => person.death === undefined);

  const settlementsByPolity = new Map<string, Settlement[]>();
  for (const settlement of settlements) {
    const list = settlementsByPolity.get(settlement.polityId) ?? [];
    list.push(settlement);
    settlementsByPolity.set(settlement.polityId, list);
  }
  for (const list of settlementsByPolity.values())
    list.sort((a, b) => cohortPopulation(b) - cohortPopulation(a) || a.id.localeCompare(b.id));

  const livingBySettlement = new Map<string, Person[]>();
  for (const person of livingPersons) {
    const list = livingBySettlement.get(person.locationId) ?? [];
    list.push(person);
    livingBySettlement.set(person.locationId, list);
  }
  for (const list of livingBySettlement.values()) list.sort((a, b) => a.id.localeCompare(b.id));

  const representativeAt = (settlementId: string | undefined): Person | undefined =>
    settlementId ? livingBySettlement.get(settlementId)?.[0] : undefined;
  const representativeRef = (settlementId: string | undefined): string[] => {
    const person = representativeAt(settlementId);
    return person ? [person.id] : [];
  };
  const leaderOf = (polityId: string): Person | undefined => {
    const polity = polityById.get(polityId);
    const leader = polity ? personById.get(polity.leaderId) : undefined;
    if (leader && leader.death === undefined) return leader;
    const settlement = settlementsByPolity.get(polityId)?.[0];
    return representativeAt(settlement?.id);
  };
  const leaderRef = (polityId: string): string[] => {
    const person = leaderOf(polityId);
    return person ? [person.id] : [];
  };
  const largestSettlement = [...settlements].sort(
    (a, b) => cohortPopulation(b) - cohortPopulation(a) || a.id.localeCompare(b.id),
  )[0];
  const largestSettlements = [...settlements]
    .sort((a, b) => cohortPopulation(b) - cohortPopulation(a) || a.id.localeCompare(b.id))
    .slice(0, 3);

  const aliveCountBySettlement = new Map<string, number>();
  for (const person of livingPersons)
    aliveCountBySettlement.set(
      person.locationId,
      (aliveCountBySettlement.get(person.locationId) ?? 0) + 1,
    );
  const polityPopulation = (polityId: string) =>
    (settlementsByPolity.get(polityId) ?? []).reduce(
      (sum, settlement) =>
        sum + cohortPopulation(settlement) + (aliveCountBySettlement.get(settlement.id) ?? 0),
      0,
    );

  const totalPopulation = population(world);

  let ignoredFuture = 0;
  let ignoredForeign = 0;
  const sortedEvents = recentEvents
    .filter((event) => {
      if (event.worldId !== world.id) {
        ignoredForeign++;
        return false;
      }
      if (!Number.isFinite(event.month) || event.month < 0 || event.month > world.month) {
        ignoredFuture++;
        return false;
      }
      return true;
    })
    .slice()
    .sort((a, b) => a.month - b.month || a.id.localeCompare(b.id));
  const committedEvents = [
    ...new Map(sortedEvents.map((event) => [event.id, event] as const)).values(),
  ];
  const eventById = new Map(committedEvents.map((event) => [event.id, event]));
  const windowStart = Math.max(0, world.month - 24);
  const recentWindow = committedEvents.filter((event) => event.month >= windowStart);

  const eventRefs = (event: HistoricalEvent): EvidenceRefs => ({
    eventIds: [event.id],
    locationIds: event.locationId && settlementById.has(event.locationId) ? [event.locationId] : [],
    personIds: event.personIds.filter((id) => personById.has(id)).slice(0, 4),
  });
  const addEventEvidence = (
    book: EvidenceBook,
    event: HistoricalEvent,
    claim: string,
  ): string | undefined => book.add(claim, eventRefs(event));

  const book = new EvidenceBook();
  const drafts: DimensionDraft[] = [];

  // Politics -----------------------------------------------------------------
  const politics = ((): DimensionDraft => {
    if (!polities.length) return unknownDraft('politics', '世界快照中没有政权记录。');
    const legitimacyValues = polities.map((polity) => polity.legitimacy);
    const averageLegitimacy = mean(legitimacyValues);
    const spread = Math.max(...legitimacyValues) - Math.min(...legitimacyValues);
    const lowest = [...polities].sort(
      (a, b) => a.legitimacy - b.legitimacy || a.id.localeCompare(b.id),
    )[0];
    const lowestSettlement = settlementsByPolity.get(lowest.id)?.[0];
    const lowestLeader = leaderOf(lowest.id);
    const politicalEvents = recentWindow.filter(isPoliticalEvent);
    const evidenceIds: string[] = [];
    const stateEvidence = book.add(
      `${lowest.name}的合法性为 ${fmt(lowest.legitimacy)}，为当前 ${polities.length} 个政权中最低；政权合法性均值 ${fmt(averageLegitimacy)}，离散度 ${fmt(spread)}。`,
      {
        locationIds: lowestSettlement ? [lowestSettlement.id] : [],
        personIds: lowestLeader ? [lowestLeader.id] : [],
      },
    );
    if (stateEvidence) evidenceIds.push(stateEvidence);
    for (const event of politicalEvents.slice(-2)) {
      const id = addEventEvidence(book, event, `已提交政治事件「${event.kind}」：${event.text}`);
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length)
      return unknownDraft('politics', '没有可引用真实人物的政权或政治事件证据。');
    const score = round(
      clamp01(
        0.04 +
          Math.max(0, 0.62 - averageLegitimacy) * 1.5 +
          Math.max(0, spread - 0.18) * 0.8 +
          Math.min(0.2, politicalEvents.length * 0.025),
      ),
    );
    return {
      dimension: 'politics',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        politicalEvents.length,
        '没有保存 1900 年政体合法性时间序列；以当前合法性、离散度和已提交政治事件为相对基线。',
      ),
      evidenceIds,
      explanation: `政权均值合法性 ${fmt(averageLegitimacy)}，最低为 ${lowest.name} ${fmt(lowest.legitimacy)}；最近窗口政治事件 ${politicalEvents.length} 条。分数是当前压力与偏离度，不是对真实历史政体的准确性断言。`,
      anomaly:
        score >= 0.5 || lowest.legitimacy < 0.35
          ? {
              severity: round(score),
              description: `${lowest.name}合法性偏低（${fmt(lowest.legitimacy)}），政治秩序出现可证据化压力。`,
            }
          : undefined,
    };
  })();
  drafts.push(politics);

  // War ----------------------------------------------------------------------
  const activeConflicts = world.conflicts.filter((conflict) => conflict.status === 'active');
  const activeWarShocks = (world.shocks ?? []).filter(
    (shock) =>
      shock.started <= world.month &&
      shock.ends > world.month &&
      (shock.kind === 'war' || shock.kind === 'attack'),
  );
  const warEvents = recentWindow.filter(isWarEvent);

  const war = ((): DimensionDraft => {
    if (
      !settlements.length &&
      !activeConflicts.length &&
      !activeWarShocks.length &&
      !warEvents.length
    )
      return unknownDraft('war', '没有聚落、冲突、战争冲击或战争事件数据。');
    const conflictMonths = activeConflicts.reduce(
      (sum, conflict) => sum + Math.min(24, Math.max(0, conflict.months)),
      0,
    );
    const casualties = activeWarShocks.reduce(
      (sum, shock) => sum + Math.max(0, shock.stats?.casualties ?? 0),
      0,
    );
    const maxSeverity = activeWarShocks.length
      ? Math.max(...activeWarShocks.map((shock) => clamp01(shock.severity)))
      : 0;
    const score = round(
      clamp01(
        0.02 +
          activeConflicts.length * 0.2 +
          activeWarShocks.length * 0.15 +
          maxSeverity * 0.2 +
          Math.min(1, conflictMonths / 24) * 0.15 +
          Math.min(0.4, (casualties / Math.max(1, totalPopulation)) * 40) +
          Math.min(0.15, warEvents.length * 0.03),
      ),
    );
    const evidenceIds: string[] = [];
    for (const conflict of activeConflicts.slice(0, 2)) {
      const location = settlementById.get(conflict.locationId);
      const causeEvent = conflict.causeIds
        .map((id) => eventById.get(id))
        .find((event): event is HistoricalEvent => Boolean(event));
      const id = book.add(
        `活动冲突 ${conflict.id} 已持续 ${conflict.months} 个月，地点 ${location?.name ?? conflict.locationId}，交战方 ${conflict.a} / ${conflict.b}。`,
        {
          eventIds: causeEvent ? [causeEvent.id] : [],
          locationIds: location ? [location.id] : [],
          personIds: location ? representativeRef(location.id) : [],
        },
      );
      if (id) evidenceIds.push(id);
    }
    for (const shock of activeWarShocks.slice(0, 2)) {
      const causeEvent = eventById.get(shock.causeId);
      const location = shock.locationIds
        .map((id) => settlementById.get(id))
        .find((settlement): settlement is Settlement => Boolean(settlement));
      const id = book.add(
        `战争冲击 ${shock.id}（${shock.kind}）在评估月仍有效，严重度 ${fmt(shock.severity)}，已记录伤亡 ${Math.round(shock.stats?.casualties ?? 0)}。`,
        {
          eventIds: causeEvent ? [causeEvent.id] : [],
          locationIds: location ? [location.id] : [],
          personIds: location ? representativeRef(location.id) : [],
        },
      );
      if (id) evidenceIds.push(id);
    }
    const strongestWarEvent = [...warEvents].sort(
      (a, b) => b.significance - a.significance || b.month - a.month,
    )[0];
    if (strongestWarEvent) {
      const id = addEventEvidence(
        book,
        strongestWarEvent,
        `已提交战争事件「${strongestWarEvent.kind}」：${strongestWarEvent.text}`,
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length && largestSettlement) {
      const id = book.add(
        `评估月记录中活动冲突为 ${activeConflicts.length}，活动战争冲击为 ${activeWarShocks.length}；该聚落用于锚定世界级无战争状态，不代表其他地点。`,
        {
          locationIds: [largestSettlement.id],
          personIds: leaderRef(largestSettlement.polityId),
        },
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length) return unknownDraft('war', '没有可引用的真实地点、人物或战争事件。');
    return {
      dimension: 'war',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        activeConflicts.length + activeWarShocks.length,
        '没有外部 1900 战争时间序列；以活动冲突、活动冲击、持续时间、伤亡记录和已提交战争事件为基线。',
      ),
      evidenceIds,
      explanation: `活动冲突 ${activeConflicts.length} 个，活动战争冲击 ${activeWarShocks.length} 个，窗口战争事件 ${warEvents.length} 条，已记录冲击伤亡 ${Math.round(casualties)}。`,
      anomaly:
        activeConflicts.length || activeWarShocks.length || score >= 0.5
          ? {
              severity: round(Math.max(score, 0.5)),
              description: `评估月存在 ${activeConflicts.length} 个活动冲突和 ${activeWarShocks.length} 个活动战争冲击。`,
            }
          : undefined,
    };
  })();
  drafts.push(war);

  // Economy ------------------------------------------------------------------
  const settlementsByScarcity = [...settlements].sort(
    (a, b) => b.scarcity - a.scarcity || a.id.localeCompare(b.id),
  );
  const worstScarcity = settlementsByScarcity[0];
  const agricultural = settlements.filter((settlement) => settlement.economy);
  const averageScarcity = mean(settlements.map((settlement) => settlement.scarcity));
  const maxScarcity = worstScarcity?.scarcity ?? 0;
  const foodPerCapita =
    totalPopulation > 0
      ? settlements.reduce((sum, settlement) => sum + settlement.food, 0) / totalPopulation
      : 0;
  const averageUnemployment = agricultural.length
    ? mean(agricultural.map((settlement) => settlement.economy?.unemployment ?? 0))
    : 0;
  const averageInflation = agricultural.length
    ? mean(agricultural.map((settlement) => settlement.economy?.inflation ?? 0))
    : 0;
  const famineEvents = recentWindow.filter(isFamineEvent);

  const economy = ((): DimensionDraft => {
    if (!settlements.length) return unknownDraft('economy', '世界快照中没有聚落经济记录。');
    const score = round(
      clamp01(
        0.03 +
          averageScarcity * 0.7 +
          maxScarcity * 0.2 +
          averageUnemployment * 0.25 +
          Math.max(0, averageInflation - 0.05) * 0.15 +
          (foodPerCapita < 0.25 ? 0.2 : 0) +
          Math.min(0.12, famineEvents.length * 0.03),
      ),
    );
    const evidenceIds: string[] = [];
    if (worstScarcity) {
      const id = book.add(
        `${worstScarcity.name}稀缺度 ${fmt(worstScarcity.scarcity)}、粮食存量 ${fmt(worstScarcity.food, 1)}、价格 ${fmt(worstScarcity.price)}，为当前稀缺度最高聚落。`,
        {
          locationIds: [worstScarcity.id],
          personIds: representativeRef(worstScarcity.id),
        },
      );
      if (id) evidenceIds.push(id);
    }
    for (const event of famineEvents.slice(-2)) {
      const id = addEventEvidence(book, event, `已提交短缺事件「${event.kind}」：${event.text}`);
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length && largestSettlement) {
      const id = book.add(
        `世界平均稀缺度 ${fmt(averageScarcity)}，粮食/人 ${fmt(foodPerCapita)}；该聚落是最大人口点，用于锚定世界级经济读数。`,
        {
          locationIds: [largestSettlement.id],
          personIds: leaderRef(largestSettlement.polityId),
        },
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length) return unknownDraft('economy', '没有可引用的真实聚落或短缺事件。');
    return {
      dimension: 'economy',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        averageScarcity,
        '没有外部 1900 物价/粮食时间序列；以当前稀缺度、粮食/人、失业、通胀和已提交短缺事件为相对基线。',
      ),
      evidenceIds,
      explanation: `平均稀缺度 ${fmt(averageScarcity)}，最高 ${fmt(maxScarcity)}，粮食/人 ${fmt(foodPerCapita)}，失业均值 ${fmt(averageUnemployment)}，窗口短缺事件 ${famineEvents.length} 条。`,
      anomaly:
        averageScarcity >= 0.2 || maxScarcity >= 0.4 || score >= 0.5
          ? {
              severity: round(score),
              description: `粮食稀缺压力可证据化：平均值 ${fmt(averageScarcity)}，最高聚落 ${fmt(maxScarcity)}。`,
            }
          : undefined,
    };
  })();
  drafts.push(economy);

  // Population ---------------------------------------------------------------
  const externalBaselinePolities = polities.filter(
    (polity) =>
      polity.realWorld &&
      polity.realWorld.populationYear === 1900 &&
      polity.realWorld.population > 0,
  );
  const externalBaseline = externalBaselinePolities.reduce(
    (sum, polity) => sum + (polity.realWorld?.population ?? 0),
    0,
  );
  const externalCurrent = externalBaselinePolities.reduce(
    (sum, polity) => sum + polityPopulation(polity.id),
    0,
  );
  const observedBaseline = world.baselinePopulation > 0 ? world.baselinePopulation : 0;
  const populationBaseline = externalBaseline > 0 ? externalBaseline : observedBaseline;
  const populationCurrent = externalBaseline > 0 ? externalCurrent : totalPopulation;
  const populationBaselineKind: WorldlineBaseline['kind'] =
    externalBaseline > 0 ? 'historical-1900' : observedBaseline > 0 ? 'observed-start' : 'none';
  const populationRatio = populationBaseline > 0 ? populationCurrent / populationBaseline : null;
  const mortalityTotal = world.audit.births + world.audit.deaths;
  const mortalityShare = mortalityTotal > 0 ? world.audit.deaths / mortalityTotal : null;
  const deathEvents = recentWindow.filter(isDeathEvent);

  const populationDraft = ((): DimensionDraft => {
    if (!populationBaseline || populationRatio === null)
      return unknownDraft(
        'population',
        '没有可验证的 1900 政权人口基准或开局观测人口；拒绝凭空估算历史人口。',
      );
    const decline = populationRatio < 1 ? (1 - populationRatio) * 1.4 : 0;
    const growth = populationRatio > 1 ? Math.min(0.25, (populationRatio - 1) * 0.05) : 0;
    const mortalityPressure = mortalityShare === null ? 0 : Math.max(0, mortalityShare - 0.6) * 1.2;
    const score = round(clamp01(0.02 + decline + growth + mortalityPressure));
    const evidenceIds: string[] = [];
    if (externalBaseline > 0) {
      const worst = [...externalBaselinePolities]
        .map((polity) => {
          const baseline = polity.realWorld?.population ?? 0;
          const current = polityPopulation(polity.id);
          return { polity, baseline, current, ratio: baseline > 0 ? current / baseline : 1 };
        })
        .sort((a, b) => a.ratio - b.ratio || a.polity.id.localeCompare(b.polity.id))[0];
      const settlement = settlementsByPolity.get(worst.polity.id)?.[0];
      const leader = leaderOf(worst.polity.id);
      const id = book.add(
        `${worst.polity.name}当前人口 ${Math.round(worst.current)}，1900 年单点基准 ${Math.round(worst.baseline)}，比值 ${fmt(worst.ratio)}；这是外部人口单点，不是完整历史增长曲线。`,
        {
          locationIds: settlement ? [settlement.id] : [],
          personIds: leader ? [leader.id] : [],
        },
      );
      if (id) evidenceIds.push(id);
    } else if (largestSettlements.length) {
      const leaders = largestSettlements
        .map((settlement) => leaderOf(settlement.polityId)?.id)
        .filter((id): id is string => Boolean(id));
      const id = book.add(
        `世界当前人口 ${Math.round(populationCurrent)}，开局观测基准 ${Math.round(populationBaseline)}（${populationBaselineKind}），比值 ${fmt(populationRatio)}；人口为聚落队列与在世具名人物的总和。`,
        {
          locationIds: largestSettlements.map((settlement) => settlement.id),
          personIds: leaders,
        },
      );
      if (id) evidenceIds.push(id);
    }
    for (const event of deathEvents.slice(-2)) {
      const id = addEventEvidence(book, event, `已提交死亡事件：${event.text}`);
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length)
      return unknownDraft('population', '有基准但没有可引用的真实地点、人物或死亡事件。');
    const baselineNote =
      populationBaselineKind === 'historical-1900'
        ? '使用政权 realWorld 中的 1900 年单点人口合计；不推断后续真实历史人口曲线。'
        : '使用世界创建时记录的观测人口；没有外部 1900 对照。';
    return {
      dimension: 'population',
      status: 'assessed',
      score,
      baseline: {
        kind: populationBaselineKind,
        value: Math.max(0, populationBaseline),
        note: baselineNote,
      },
      evidenceIds,
      explanation: `当前人口 ${Math.round(populationCurrent)}，基准 ${Math.round(populationBaseline)}，比值 ${fmt(populationRatio)}；累计出生 ${world.audit.births}，累计死亡 ${world.audit.deaths}，窗口死亡事件 ${deathEvents.length} 条。`,
      anomaly:
        populationRatio < 0.85 || (mortalityShare ?? 0) > 0.65 || score >= 0.5
          ? {
              severity: round(score),
              description: `人口相对基准比值 ${fmt(populationRatio)}，累计死亡占比 ${mortalityShare === null ? '未知' : fmt(mortalityShare)}。`,
            }
          : undefined,
    };
  })();
  drafts.push(populationDraft);

  // Technology ---------------------------------------------------------------
  const technologyEvents = recentWindow.filter(isTechnologyEvent);
  const discoveries = world.discoveries ?? [];
  const technologyIndustries = world.industry ? Object.values(world.industry.polities) : [];

  const technology = ((): DimensionDraft => {
    if (!technologyIndustries.length && !discoveries.length && !technologyEvents.length)
      return unknownDraft(
        'technology',
        '没有产业技术值、发现记录或已提交技术事件；缺少可验证的 1900 技术基线，保持 unknown。',
      );
    const techValues = technologyIndustries.map((polity) => polity.technology);
    const averageTechnology = mean(techValues);
    const spread = techValues.length ? Math.max(...techValues) - Math.min(...techValues) : 0;
    const score = round(
      clamp01(
        0.03 +
          Math.max(0, averageTechnology - 0.1) * 0.35 +
          spread * 0.15 +
          Math.min(0.3, discoveries.length * 0.05) +
          Math.min(0.2, technologyEvents.length * 0.03),
      ),
    );
    const evidenceIds: string[] = [];
    for (const discovery of discoveries.slice(-2)) {
      const creator = personById.get(discovery.creatorId);
      const location = settlementById.get(discovery.locationId);
      const id = book.add(
        `发现「${discovery.name}」由 ${creator?.name ?? discovery.creatorId} 在 ${location?.name ?? discovery.locationId} 记录，机制 ${discovery.mechanism}，增益 ${fmt(discovery.gain)}。`,
        {
          locationIds: location ? [location.id] : [],
          personIds: creator ? [creator.id] : [],
        },
      );
      if (id) evidenceIds.push(id);
    }
    for (const event of technologyEvents.slice(-2)) {
      const id = addEventEvidence(book, event, `已提交技术事件「${event.kind}」：${event.text}`);
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length && settlements.length) {
      const mostKnowledgeable = [...settlements].sort(
        (a, b) => b.knowledge - a.knowledge || a.id.localeCompare(b.id),
      )[0];
      const id = book.add(
        `当前知识最高聚落 ${mostKnowledgeable.name} 的知识值 ${fmt(mostKnowledgeable.knowledge)}；没有可引用的发现或技术事件，不能据此断言真实历史技术水平。`,
        {
          locationIds: [mostKnowledgeable.id],
          personIds: representativeRef(mostKnowledgeable.id),
        },
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length) return unknownDraft('technology', '没有可引用的技术证据。');
    return {
      dimension: 'technology',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        discoveries.length + technologyEvents.length,
        '没有外部 1900 技术时间序列；只按当前知识/产业值与已提交技术事件评分。',
      ),
      evidenceIds,
      explanation: `产业技术均值 ${techValues.length ? fmt(averageTechnology) : '未知'}，离散度 ${fmt(spread)}，发现 ${discoveries.length} 项，窗口技术事件 ${technologyEvents.length} 条。该分数不是对真实历史技术水平的断言。`,
      anomaly:
        score >= 0.55 || spread >= 0.8
          ? {
              severity: round(score),
              description: `技术活动或产业技术分布出现可证据化偏移（均值 ${techValues.length ? fmt(averageTechnology) : '未知'}，离散度 ${fmt(spread)}）。`,
            }
          : undefined,
    };
  })();
  drafts.push(technology);

  // Society ------------------------------------------------------------------
  const settlementsByUnrest = [...settlements].sort(
    (a, b) => b.unrest - a.unrest || a.id.localeCompare(b.id),
  );
  const worstUnrest = settlementsByUnrest[0];
  const averageUnrest = mean(settlements.map((settlement) => settlement.unrest));
  const maxUnrest = worstUnrest?.unrest ?? 0;
  const unrestEvents = recentWindow.filter(isUnrestEvent);

  const society = ((): DimensionDraft => {
    if (!settlements.length) return unknownDraft('society', '世界快照中没有聚落社会记录。');
    const score = round(
      clamp01(
        0.03 + averageUnrest * 0.8 + maxUnrest * 0.2 + Math.min(0.18, unrestEvents.length * 0.03),
      ),
    );
    const evidenceIds: string[] = [];
    if (worstUnrest) {
      const id = book.add(
        `${worstUnrest.name}动荡值 ${fmt(worstUnrest.unrest)}，为当前最高；社会事件窗口 ${unrestEvents.length} 条。`,
        {
          locationIds: [worstUnrest.id],
          personIds: representativeRef(worstUnrest.id),
        },
      );
      if (id) evidenceIds.push(id);
    }
    for (const event of unrestEvents.slice(-2)) {
      const id = addEventEvidence(book, event, `已提交社会事件「${event.kind}」：${event.text}`);
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length) return unknownDraft('society', '没有可引用的真实聚落或社会事件。');
    return {
      dimension: 'society',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        averageUnrest,
        '没有外部 1900 社会动荡时间序列；以当前动荡、社会事件和最高聚落为相对基线。',
      ),
      evidenceIds,
      explanation: `平均动荡 ${fmt(averageUnrest)}，最高 ${fmt(maxUnrest)}，窗口社会事件 ${unrestEvents.length} 条。`,
      anomaly:
        score >= 0.5 || maxUnrest >= 0.55
          ? {
              severity: round(score),
              description: `社会动荡可证据化：平均 ${fmt(averageUnrest)}，最高 ${fmt(maxUnrest)}。`,
            }
          : undefined,
    };
  })();
  drafts.push(society);

  // Biography ----------------------------------------------------------------
  const historicalPersons = persons.filter((person) => person.historicalIdentity);
  const historicalIds = new Set(historicalPersons.map((person) => person.id));
  const historicalEvents = recentWindow.filter((event) =>
    event.personIds.some((id) => historicalIds.has(id)),
  );
  const recentHistoricalDeaths = historicalPersons.filter(
    (person) =>
      person.death !== undefined &&
      person.death <= world.month &&
      person.death >= Math.max(0, world.month - 12),
  );
  const strongestHistoricalEvent = [...historicalEvents].sort(
    (a, b) => b.significance - a.significance || b.month - a.month,
  )[0];

  const biography = ((): DimensionDraft => {
    if (!historicalPersons.length)
      return unknownDraft('biography', '世界中没有带历史身份的人物记录；未建立人物历史基线。');
    const score = round(
      clamp01(
        0.03 +
          Math.min(0.4, historicalEvents.length * 0.04) +
          Math.min(0.4, recentHistoricalDeaths.length * 0.15) +
          ((strongestHistoricalEvent?.significance ?? 0) >= 0.9 ? 0.1 : 0),
      ),
    );
    const evidenceIds: string[] = [];
    for (const person of recentHistoricalDeaths.slice(0, 2)) {
      const event = [...historicalEvents]
        .filter(
          (candidate) =>
            candidate.kind === 'death' &&
            candidate.personIds.includes(person.id) &&
            candidate.month === person.death,
        )
        .sort((a, b) => a.id.localeCompare(b.id))[0];
      const id = book.add(
        `历史身份人物 ${person.name} 在评估前 12 个月内死亡（第 ${person.death} 月，原因：${person.deathCause ?? '未记录'}）。`,
        {
          eventIds: event ? [event.id] : [],
          locationIds: settlementById.has(person.locationId) ? [person.locationId] : [],
          personIds: [person.id],
        },
      );
      if (id) evidenceIds.push(id);
    }
    if (strongestHistoricalEvent) {
      const id = addEventEvidence(
        book,
        strongestHistoricalEvent,
        `涉及历史身份人物的最高显著性窗口事件「${strongestHistoricalEvent.kind}」：${strongestHistoricalEvent.text}`,
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length) {
      const sample = [...historicalPersons].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 3);
      const id = book.add(
        `当前有 ${historicalPersons.length} 名带历史身份的人物，评估前 24 个月没有涉及他们的已提交事件；仅记录人物存在，不推断其真实命运。`,
        {
          locationIds: sample
            .map((person) => person.locationId)
            .filter((id) => settlementById.has(id)),
          personIds: sample.map((person) => person.id),
        },
      );
      if (id) evidenceIds.push(id);
    }
    if (!evidenceIds.length)
      return unknownDraft('biography', '有历史人物记录，但没有可引用的真实人物/地点/事件证据。');
    return {
      dimension: 'biography',
      status: 'assessed',
      score,
      baseline: eventBaseline(
        historicalEvents.length,
        '没有真实人物命运时间序列；只按模拟中带历史身份人物的已提交事件和死亡记录评分。',
      ),
      evidenceIds,
      explanation: `带历史身份人物 ${historicalPersons.length} 名，窗口事件 ${historicalEvents.length} 条，近 12 个月死亡 ${recentHistoricalDeaths.length} 人。该分数只描述模拟记录，不声称符合真实人物结局。`,
      anomaly:
        recentHistoricalDeaths.length >= 2 || score >= 0.5
          ? {
              severity: round(score),
              description: `近 12 个月有 ${recentHistoricalDeaths.length} 名历史身份人物死亡，人物历史出现可证据化偏离。`,
            }
          : undefined,
    };
  })();
  drafts.push(biography);

  // -------------------------------------------------------------------------
  // Bounded intervention proposals. These are suggestions, never applied here.
  // -------------------------------------------------------------------------
  const interventions: WorldlineIntervention[] = [];
  const pushIntervention = (intervention: WorldlineIntervention) => {
    if (interventions.length >= 3) return;
    interventions.push(intervention);
  };

  const activeConflict = activeConflicts[0];
  if (activeConflict) {
    const location = settlementById.get(activeConflict.locationId);
    const warDraft = drafts.find((draft) => draft.dimension === 'war');
    const evidenceIds = (warDraft?.evidenceIds ?? []).slice(0, 2);
    if (location && evidenceIds.length)
      pushIntervention({
        type: 'unrest',
        siteId: location.id,
        amount: -0.02,
        rationale:
          '冲突地点存在已记录战争压力；建议小幅降低地方动荡作为有界试点，不直接结束战争、不保证结果。',
        evidenceIds,
      });
  }

  const epidemicSite = [...settlements]
    .filter((settlement) => (settlement.disease?.prevalence ?? 0) > 0.05)
    .sort(
      (a, b) =>
        (b.disease?.prevalence ?? 0) - (a.disease?.prevalence ?? 0) || a.id.localeCompare(b.id),
    )[0];
  if (epidemicSite) {
    const evidenceId = book.add(
      `${epidemicSite.name}疾病流行率 ${fmt(epidemicSite.disease?.prevalence ?? 0)}，存在可引用的疾病状态。`,
      {
        locationIds: [epidemicSite.id],
        personIds: representativeRef(epidemicSite.id),
      },
    );
    if (evidenceId)
      pushIntervention({
        type: 'disease',
        siteId: epidemicSite.id,
        prevalence: 0,
        months: 6,
        rationale: '对已记录疾病状态提出清零式防控试点；须经编译和审核，不能直接宣称治愈具体人物。',
        evidenceIds: [evidenceId],
      });
  }

  const scarcitySite = settlementsByScarcity.find((settlement) => settlement.scarcity >= 0.35);
  if (scarcitySite && populationDraft.status === 'assessed') {
    const evidenceId = book.add(
      `${scarcitySite.name}稀缺度 ${fmt(scarcitySite.scarcity)}、粮食存量 ${fmt(scarcitySite.food, 1)}，人口维度偏移分 ${fmt(populationDraft.score ?? 0)}。`,
      {
        locationIds: [scarcitySite.id],
        personIds: representativeRef(scarcitySite.id),
      },
    );
    if (evidenceId)
      pushIntervention({
        type: 'event-definition',
        title: '饥荒配给与公共厨房',
        trigger: 'shortage',
        scope: { kind: 'site', ids: [scarcitySite.id] },
        effectTypes: ['transfer', 'unrest', 'knowledge'],
        rationale:
          '针对已记录粮食稀缺提出有界事件定义建议；具体角色、资源上限与冷却必须由现有编译器校验，不能凭空生成粮食或死亡。',
        evidenceIds: [evidenceId],
      });
  }

  const lowestLegitimacy = [...polities].sort(
    (a, b) => a.legitimacy - b.legitimacy || a.id.localeCompare(b.id),
  )[0];
  if (lowestLegitimacy && lowestLegitimacy.legitimacy < 0.35) {
    const politicsDraft = drafts.find((draft) => draft.dimension === 'politics');
    const evidenceIds = (politicsDraft?.evidenceIds ?? []).slice(0, 2);
    if (evidenceIds.length)
      pushIntervention({
        type: 'legitimacy',
        polityId: lowestLegitimacy.id,
        amount: 0.02,
        rationale:
          '最低合法性政权存在已记录压力；建议小幅合法性修正作为有界试点，须人工复核，不能改写历史或指定继承。',
        evidenceIds,
      });
  }

  if (worstUnrest && worstUnrest.unrest >= 0.5) {
    const societyDraft = drafts.find((draft) => draft.dimension === 'society');
    const evidenceIds = (societyDraft?.evidenceIds ?? []).slice(0, 2);
    if (evidenceIds.length)
      pushIntervention({
        type: 'unrest',
        siteId: worstUnrest.id,
        amount: -0.03,
        rationale:
          '最高动荡聚落存在已记录社会压力；建议小幅降低动荡，须经编译与人工复核，不直接改变人物信念。',
        evidenceIds,
      });
  }

  // -------------------------------------------------------------------------
  const dimensions: WorldlineDimensionAssessment[] = drafts.map((draft) => ({
    dimension: draft.dimension,
    status: draft.status,
    score: draft.score,
    baseline: draft.baseline,
    evidenceIds: draft.evidenceIds,
    explanation: clean(draft.explanation, 600),
  }));

  const anomalies = drafts
    .filter(
      (draft): draft is DimensionDraft & { anomaly: NonNullable<DimensionDraft['anomaly']> } =>
        Boolean(draft.anomaly),
    )
    .map((draft) => ({
      id: `anomaly-${draft.dimension}`,
      dimension: draft.dimension,
      severity: round(clamp01(draft.anomaly.severity)),
      description: clean(draft.anomaly.description, 400),
      evidenceIds: draft.evidenceIds.slice(0, 4),
    }));

  const assessedCount = dimensions.filter((dimension) => dimension.status === 'assessed').length;
  const overallStatus =
    assessedCount === WORLDLINE_DIMENSIONS.length
      ? 'assessed'
      : assessedCount === 0
        ? 'unknown'
        : 'partial';
  const overallScore = computeWorldlineOverallScore(dimensions);

  const unknownDimensions = dimensions
    .filter((dimension) => dimension.status === 'unknown')
    .map((dimension) => WORLDLINE_DIMENSION_LABELS[dimension.dimension]);
  const limitations = [
    '仅使用当前世界快照与已提交且不晚于评估月份的事件；未提交或未来事件没有进入评分。',
    '除人口维度可用的 1900 单点人口基准外，没有外部历史时间序列；分数表示相对偏离与风险，不构成对真实历史结果的准确性断言。',
    '技术维度只依据世界内知识/产业值与已提交技术事件，缺少外部 1900 技术基线。',
    '所有干预均为有界提案，必须经过现有编译器与人工复核；本模块不直接修改世界状态。',
  ];
  if (unknownDimensions.length)
    limitations.push(
      `以下维度缺少可验证数据或基线，保持 unknown：${unknownDimensions.join('、')}。`,
    );
  if (ignoredFuture) limitations.push(`忽略 ${ignoredFuture} 条晚于评估月份或月份无效的事件。`);
  if (ignoredForeign) limitations.push(`忽略 ${ignoredForeign} 条属于其他世界的事件。`);
  if (discoveries.length === 0 && technologyIndustries.length === 0)
    limitations.push('没有发现或产业技术记录，技术偏移无法与 1900 年外部水平比较。');

  const requiresHumanReview =
    interventions.length > 0 ||
    (overallScore ?? 0) >= 0.5 ||
    anomalies.some((anomaly) => anomaly.severity >= 0.7);

  const candidate: WorldlineAssessment = {
    schemaVersion: 1,
    worldId: world.id,
    month: world.month,
    calendar: calendarOf(world),
    generatedBy: 'fallback',
    overallStatus,
    overallScore,
    dimensions,
    evidence: book.items.slice(0, 48),
    anomalies,
    interventions,
    requiresHumanReview,
    limitations: limitations.slice(0, 8).map((limitation) => clean(limitation, 400)),
  };

  // A fallback must obey the same contract as a model answer. Failing here is a
  // bug in this module, not permission to write a malformed assessment.
  return parseWorldlineAssessment(candidate, { world, events: committedEvents });
}

/**
 * Suggested cadence for a future worker integration: once per 12 world months.
 * This helper is pure; it does not persist the last assessed month or schedule
 * anything. Callers must store the checkpoint atomically with the assessment.
 */
export const WORLDLINE_ASSESSMENT_INTERVAL_MONTHS = 12;

export function isWorldlineAssessmentDue(
  worldMonth: number,
  lastAssessedMonth?: number,
  intervalMonths = WORLDLINE_ASSESSMENT_INTERVAL_MONTHS,
): boolean {
  if (!Number.isInteger(worldMonth) || worldMonth < 0) return false;
  if (!Number.isInteger(intervalMonths) || intervalMonths < 1 || intervalMonths > 120) return false;
  if (lastAssessedMonth === undefined) return worldMonth > 0 && worldMonth % intervalMonths === 0;
  if (
    !Number.isInteger(lastAssessedMonth) ||
    lastAssessedMonth < 0 ||
    lastAssessedMonth > worldMonth
  )
    return false;
  return worldMonth - lastAssessedMonth >= intervalMonths;
}

export { WORLDLINE_DIMENSIONS };
