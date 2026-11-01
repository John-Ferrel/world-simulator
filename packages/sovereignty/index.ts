import type { Polity, World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { isDetained } from '../coercion/index.js';
import cshapesIndex from '../../data/historical-sovereignty/cshapes-1900-jurisdictions.json' with { type: 'json' };

export const SOVEREIGNTY_STATE_VERSION = 1 as const;

/** Explicit, reviewed GW-to-ISO3 correspondences for 1900 independent authorities.
 * Codes whose state has no one-to-one present ISO polity (e.g. Austria-Hungary, Transvaal)
 * intentionally have no entry. A code is usable only if that polity also exists in World.
 */
export const DEFAULT_GW_TO_ISO3: Readonly<Record<number, string>> = Object.freeze({
  2: 'USA',
  20: 'CAN',
  41: 'HTI',
  42: 'DOM',
  70: 'MEX',
  90: 'GTM',
  91: 'HND',
  92: 'SLV',
  93: 'NIC',
  94: 'CRI',
  100: 'COL',
  101: 'VEN',
  130: 'ECU',
  135: 'PER',
  140: 'BRA',
  145: 'BOL',
  150: 'PRY',
  155: 'CHL',
  160: 'ARG',
  165: 'URY',
  200: 'GBR',
  210: 'NLD',
  211: 'BEL',
  212: 'LUX',
  220: 'FRA',
  225: 'CHE',
  230: 'ESP',
  235: 'PRT',
  255: 'DEU',
  325: 'ITA',
  340: 'SRB',
  341: 'MNE',
  350: 'GRC',
  355: 'BGR',
  360: 'ROU',
  365: 'RUS',
  380: 'SWE',
  390: 'DNK',
  450: 'LBR',
  530: 'ETH',
  600: 'MAR',
  630: 'IRN',
  640: 'TUR',
  698: 'OMN',
  710: 'CHN',
  740: 'JPN',
  790: 'NPL',
  800: 'THA',
});

export type BaselineStatus =
  'independent' | 'colony' | 'protectorate' | 'occupied' | 'leased territory' | 'unknown';
export type CurrentStatus = BaselineStatus | 'autonomous';
export type AuthoritySource =
  | 'cshapes-1900-baseline'
  | 'existing-world-controller'
  | 'occupied-territory-controller'
  | 'live-settlement-controller'
  | 'settlement-control-event'
  | 'simulated-transition'
  | 'unknown';
export type SovereigntyAuthority = {
  settlementId: string;
  modernRegionId?: string;
  /** Modern/local polity at initialization; deliberately separate from historical authority. */
  initialLocalPolityId: string;
  /** Last local polity written by a committed, synchronized control event. */
  observedSettlementPolityId: string;
  baseline: {
    matchStatus: string;
    historicalUnitCode?: number;
    historicalUnitName?: string;
    status: BaselineStatus;
    sovereignGwCode?: number;
    sovereignName?: string;
    sovereignPolityId?: string;
    borderDefined?: 0 | 1;
    sourceFeatureId?: number;
  };
  current: {
    status: CurrentStatus;
    sovereignPolityId?: string;
    controllerPolityId?: string;
    source: AuthoritySource;
    changedAt?: number;
    causeIds: string[];
  };
};
export type SovereigntyControlChange = {
  id: string;
  month: number;
  action: 'autonomy' | 'independence' | 'control';
  settlementIds: string[];
  previousControllerPolityId: string;
  newControllerPolityId: string;
  previousSovereignPolityId?: string;
  newSovereignPolityId?: string;
  causeIds: string[];
};
export type SovereigntyRevenueReceipt = {
  id: string;
  month: number;
  settlementId: string;
  recipientPolityId: string;
  amount: number;
  eventId?: string;
};
export type SovereigntyState = {
  version: typeof SOVEREIGNTY_STATE_VERSION;
  mode: 'historical-start' | 'reference-only';
  baselineDate: '1900-01-01';
  sourceSha256: string;
  initializedMonth: number;
  initializedEventId?: string;
  /** Original modern-polity definitions kept as templates if a region later re-forms. */
  modernPolityRegistry: Polity[];
  controlApplied?: boolean;
  authorities: Record<string, SovereigntyAuthority>;
  changes: SovereigntyControlChange[];
  revenueReceipts: SovereigntyRevenueReceipt[];
};

export type AuthoritySummary = {
  polityId: string;
  kind: 'foreign' | 'same' | 'mixed' | 'partially-known' | 'unknown';
  authorityPolityId?: string;
  authorityPolityIds: string[];
  mappedSettlementCount: number;
  unknownSettlementCount: number;
  historicalUnitCodes: number[];
};
export type DiplomacyDecision = {
  allowed: boolean;
  reason?: 'same-sovereign-authority' | 'authority-unknown' | 'self-conflict';
  sharedAuthorityPolityId?: string;
  sourceSettlementIds: string[];
};
export type DependentWarCancellation = {
  warId: string;
  authorityPolityId: string;
  eventId?: string;
};
export type SovereigntyTransitionRequest = {
  action: 'autonomy' | 'independence';
  settlementIds: string[];
  targetPolityId: string;
  cost?: number;
};
export type SovereigntyTransitionResult =
  | {
      ok: true;
      eventId: string;
      organizationId: string;
      cost: number;
      changedSettlementIds: string[];
    }
  | { ok: false; error: string };
export type RevenueResult =
  | { ok: true; receipt: SovereigntyRevenueReceipt }
  | {
      ok: false;
      amount: 0;
      reason: 'invalid-amount' | 'authority-unknown' | 'recipient-missing' | 'no-available-funds';
    };

type CShapesUnit = {
  gwCode: number;
  name: string;
  status: string;
  sovereignGwCode: number | null;
  sovereignName?: string;
  borderDefined?: 0 | 1;
  featureId: number;
};
type CShapesMapping = {
  settlementId: string;
  modernRegionId: string;
  matchStatus: string;
  historicalUnitCode: number | null;
  candidateHistoricalUnitCodes: number[];
};
type CShapesIndex = {
  schema: string;
  source: { archiveSha256: string };
  baselineDate: '1900-01-01';
  units: CShapesUnit[];
  settlements: CShapesMapping[];
};
const source = cshapesIndex as CShapesIndex;
if (source.schema !== 'historical-sovereignty-index/v1' || source.baselineDate !== '1900-01-01')
  throw new Error('Unsupported CShapes sovereignty data version');
const sourceUnits = new Map(source.units.map((unit) => [unit.gwCode, unit]));
const sourceMappings = new Map(
  source.settlements.map((mapping) => [mapping.settlementId, mapping]),
);
const baselineStatus = (raw: string | undefined): BaselineStatus => {
  if (
    raw === 'independent' ||
    raw === 'colony' ||
    raw === 'protectorate' ||
    raw === 'occupied' ||
    raw === 'leased territory'
  )
    return raw;
  return 'unknown';
};
const HISTORICAL_AUTHORITY_UNITS = [300, 563, 564, 730] as const;
const HISTORICAL_POLITY_IDS: Readonly<Record<(typeof HISTORICAL_AUTHORITY_UNITS)[number], string>> =
  Object.freeze({
    300: 'historical-gw-300',
    563: 'historical-gw-563',
    564: 'historical-gw-564',
    730: 'historical-gw-730',
  });

/** Create the four independent 1900 authorities not represented by one modern ISO polity.
 * These administrative authority records begin with zero money, no people and no leader identity.
 */
export function materializeHistoricalAuthorities(w: World): string[] {
  if (w.pack.id !== 'earth-1900' || w.month !== 0 || w.calendar?.startYear !== 1900 || stateOf(w))
    return [];
  const added: string[] = [];
  for (const gwCode of HISTORICAL_AUTHORITY_UNITS) {
    const unit = sourceUnits.get(gwCode);
    if (!unit) throw new Error(`CShapes 1900 source is missing historical authority GW ${gwCode}`);
    const id = HISTORICAL_POLITY_IDS[gwCode];
    const existing = w.polities.find((polity) => polity.id === id);
    if (existing) {
      if (existing.name !== unit.name)
        throw new Error(`Historical authority ID collision for ${id}`);
      continue;
    }
    w.polities.push({
      id,
      name: unit.name,
      color: '#777777',
      treasury: 0,
      legitimacy: 0.5,
      tax: 0,
      leaderId: '',
      military: 0,
      research: 0,
    });
    added.push(id);
  }
  return added;
}

function polityIdForGw(
  gwCode: number,
  crosswalk: Readonly<Record<number, string>>,
): string | undefined {
  return (
    HISTORICAL_POLITY_IDS[gwCode as (typeof HISTORICAL_AUTHORITY_UNITS)[number]] ??
    crosswalk[gwCode]
  );
}
function stateOf(w: World): SovereigntyState | undefined {
  return (w as World & { sovereignty?: SovereigntyState }).sovereignty;
}

type SovereigntyContext = {
  settlementsRef: World['settlements'];
  settlementCount: number;
  politiesRef: World['polities'];
  polityCount: number;
  authoritiesRef: SovereigntyState['authorities'];
  settlementById: Map<string, World['settlements'][number]>;
  polityById: Map<string, World['polities'][number]>;
  authorityById: Map<string, SovereigntyAuthority>;
  authoritiesByRegion: Map<string, SovereigntyAuthority[]>;
};
const sovereigntyContexts = new WeakMap<World, SovereigntyContext>();

/** Indexes retain object references, so in-place occupation/controller mutations are read live. */
function contextOf(w: World): SovereigntyContext | undefined {
  const state = stateOf(w);
  if (!state) return undefined;
  const cached = sovereigntyContexts.get(w);
  if (
    cached &&
    cached.settlementsRef === w.settlements &&
    cached.settlementCount === w.settlements.length &&
    cached.politiesRef === w.polities &&
    cached.polityCount === w.polities.length &&
    cached.authoritiesRef === state.authorities
  )
    return cached;
  const settlementById = new Map(w.settlements.map((settlement) => [settlement.id, settlement]));
  const polityById = new Map(w.polities.map((polity) => [polity.id, polity]));
  const authorityById = new Map<string, SovereigntyAuthority>();
  const authoritiesByRegion = new Map<string, SovereigntyAuthority[]>();
  for (const [settlementId, authority] of Object.entries(state.authorities)) {
    authorityById.set(settlementId, authority);
    if (!authority.modernRegionId) continue;
    const rows = authoritiesByRegion.get(authority.modernRegionId) ?? [];
    rows.push(authority);
    authoritiesByRegion.set(authority.modernRegionId, rows);
  }
  const context: SovereigntyContext = {
    settlementsRef: w.settlements,
    settlementCount: w.settlements.length,
    politiesRef: w.polities,
    polityCount: w.polities.length,
    authoritiesRef: state.authorities,
    settlementById,
    polityById,
    authorityById,
    authoritiesByRegion,
  };
  sovereigntyContexts.set(w, context);
  return context;
}

function effectiveAuthority(
  w: World,
  authority: SovereigntyAuthority,
  context = contextOf(w),
): SovereigntyAuthority {
  const settlement = context?.settlementById.get(authority.settlementId);
  const observed =
    authority.observedSettlementPolityId ??
    authority.initialLocalPolityId ??
    authority.current.controllerPolityId;
  if (!settlement || settlement.polityId === observed) return authority;
  // A newly observed controller is exposed immediately without mutating persisted state. The
  // simulation owner should call synchronizeSovereigntyControl with the committed control event
  // so a later return to the original local polity also remains authoritative.
  return {
    ...authority,
    current: {
      ...authority.current,
      status: 'occupied',
      controllerPolityId: settlement.polityId,
      source: 'live-settlement-controller',
      changedAt: w.month,
      causeIds: [],
    },
  };
}

function diplomaticAuthorityId(authority: SovereigntyAuthority): string | undefined {
  if (authority.current.status === 'autonomous')
    return authority.current.sovereignPolityId ?? authority.current.controllerPolityId;
  return authority.current.controllerPolityId ?? authority.current.sovereignPolityId;
}

/** Initialize only a fresh 1900 Earth world; later worlds receive references but retain current authority. */
export function initializeSovereignty(
  w: World,
  emit?: Emit,
  options: { gwToIso3?: Readonly<Record<number, string>> } = {},
): SovereigntyState | undefined {
  if (!w.pack.id.startsWith('earth-')) return undefined;
  const holder = w as World & { sovereignty?: SovereigntyState };
  if (holder.sovereignty) return holder.sovereignty;
  const crosswalk = options.gwToIso3 ?? DEFAULT_GW_TO_ISO3;
  const historicalStart =
    w.month === 0 && w.calendar?.startYear === 1900 && w.pack.id === 'earth-1900';
  const historicalAuthorityIds = new Set(Object.values(HISTORICAL_POLITY_IDS));
  const modernPolityRegistry = historicalStart
    ? structuredClone(w.polities.filter((polity) => !historicalAuthorityIds.has(polity.id)))
    : [];
  if (historicalStart) materializeHistoricalAuthorities(w);
  const byPolityId = new Set(w.polities.map((polity) => polity.id));
  const authorities: Record<string, SovereigntyAuthority> = {};
  for (const settlement of w.settlements) {
    const mapping = sourceMappings.get(settlement.id);
    const unit =
      mapping?.historicalUnitCode == null ? undefined : sourceUnits.get(mapping.historicalUnitCode);
    const mappedSovereignPolityId =
      unit?.sovereignGwCode == null ? undefined : polityIdForGw(unit.sovereignGwCode, crosswalk);
    const sovereignPolityId =
      mappedSovereignPolityId && byPolityId.has(mappedSovereignPolityId)
        ? mappedSovereignPolityId
        : undefined;
    let current: SovereigntyAuthority['current'];
    if (!historicalStart) {
      current = {
        status: 'unknown',
        sovereignPolityId: settlement.polityId,
        controllerPolityId: settlement.polityId,
        source: 'existing-world-controller',
        causeIds: [],
      };
    } else if (unit && sovereignPolityId) {
      current = {
        status: baselineStatus(unit.status),
        sovereignPolityId,
        controllerPolityId: sovereignPolityId,
        source: 'cshapes-1900-baseline',
        causeIds: [],
      };
    } else {
      current = { status: 'unknown', source: 'unknown', causeIds: [] };
    }
    authorities[settlement.id] = {
      settlementId: settlement.id,
      modernRegionId: mapping?.modernRegionId,
      initialLocalPolityId: settlement.polityId,
      observedSettlementPolityId: settlement.polityId,
      baseline: {
        matchStatus: mapping?.matchStatus ?? 'unmatched',
        historicalUnitCode: unit?.gwCode,
        historicalUnitName: unit?.name,
        status: baselineStatus(unit?.status),
        sovereignGwCode: unit?.sovereignGwCode ?? undefined,
        sovereignName: unit?.sovereignName,
        sovereignPolityId,
        borderDefined: unit?.borderDefined,
        sourceFeatureId: unit?.featureId,
      },
      current,
    };
  }
  const state: SovereigntyState = {
    version: SOVEREIGNTY_STATE_VERSION,
    mode: historicalStart ? 'historical-start' : 'reference-only',
    baselineDate: '1900-01-01',
    sourceSha256: source.source.archiveSha256,
    initializedMonth: w.month,
    modernPolityRegistry,
    authorities,
    changes: [],
    revenueReceipts: [],
  };
  if (emit) {
    const event = emit(
      historicalStart ? 'sovereignty_baseline_initialized' : 'sovereignty_reference_loaded',
      [],
      undefined,
      historicalStart
        ? '1900 年主权基线以历史地域和现有国家权力交叉核验后进入模拟。'
        : '历史主权资料作为参考载入；现有模拟控制权保持不变。',
      {
        baselineDate: state.baselineDate,
        mode: state.mode,
        sourceSha256: state.sourceSha256,
        settlementCount: w.settlements.length,
        uniquelyMapped: Object.values(authorities).filter(
          (a) => a.baseline.matchStatus === 'unique-point-match',
        ).length,
        unknownAuthority: Object.values(authorities).filter((a) => !a.current.controllerPolityId)
          .length,
        dataLicense: 'CC BY-NC-SA 4.0',
        classification: historicalStart
          ? 'historical-start-authority'
          : 'historical-reference-only',
      },
      [],
      0.8,
    );
    state.initializedEventId = event.id;
  }
  holder.sovereignty = state;
  sovereigntyContexts.delete(w);
  return state;
}

/**
 * Apply the 1900 authority model to the actual owner field consumed by economics, geopolitics and
 * leadership. Geographic identity stays in `regionId`; late worlds are reference-only. The
 * operation is intended for the fresh world factory and is idempotent for an already-applied state.
 */
export function applyHistoricalStartControl(w: World, emit?: Emit): SovereigntyState | undefined {
  const eligible = w.pack.id === 'earth-1900' && w.month === 0 && w.calendar?.startYear === 1900;
  const state = initializeSovereignty(w, emit);
  if (!state || !eligible || state.mode !== 'historical-start' || state.controlApplied)
    return state;
  const assets: Array<'treasury'> = ['treasury'];
  const originalPolities = state.modernPolityRegistry;
  const originalById = new Map(originalPolities.map((polity) => [polity.id, polity]));
  const livePolityById = new Map(w.polities.map((polity) => [polity.id, polity]));
  const treasuryBefore = w.polities.reduce((sum, polity) => sum + polity.treasury, 0);
  const regionWorld = w as World & {
    settlements: (World['settlements'][number] & { regionId?: string })[];
  };
  const sourceWeights = new Map<string, Map<string, number>>();
  for (const settlement of regionWorld.settlements) {
    const authority = state.authorities[settlement.id];
    const sourcePolityId = authority?.initialLocalPolityId ?? settlement.polityId;
    const targetPolityId =
      authority?.current.controllerPolityId &&
      livePolityById.has(authority.current.controllerPolityId)
        ? authority.current.controllerPolityId
        : sourcePolityId;
    const weights = sourceWeights.get(sourcePolityId) ?? new Map<string, number>();
    const population =
      settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders;
    weights.set(targetPolityId, (weights.get(targetPolityId) ?? 0) + population);
    sourceWeights.set(sourcePolityId, weights);
    settlement.regionId = authority?.modernRegionId ?? sourcePolityId;
    settlement.polityId = targetPolityId;
    if (authority) authority.observedSettlementPolityId = targetPolityId;
  }

  // Move source polity balances by the population of its original cities. Use a final-recipient
  // remainder so floating point rounding cannot create or destroy an aggregate balance.
  for (const asset of assets) {
    const totals = new Map<string, number>();
    for (const sourcePolity of originalPolities) {
      const amount = livePolityById.get(sourcePolity.id)?.[asset] ?? sourcePolity[asset];
      if (!Number.isFinite(amount))
        throw new Error(`Non-finite ${asset} in source polity ${sourcePolity.id}`);
      const byTarget = sourceWeights.get(sourcePolity.id);
      const weighted = [...(byTarget ?? new Map<string, number>())].filter(
        ([, weight]) => weight > 0,
      );
      const totalWeight = weighted.reduce((sum, [, weight]) => sum + weight, 0);
      if (totalWeight <= 0) {
        totals.set(sourcePolity.id, (totals.get(sourcePolity.id) ?? 0) + amount);
        continue;
      }
      weighted.sort(([a], [b]) => a.localeCompare(b));
      let assigned = 0;
      for (let i = 0; i < weighted.length; i++) {
        const [targetId, weight] = weighted[i]!;
        const share =
          i === weighted.length - 1 ? amount - assigned : amount * (weight / totalWeight);
        assigned += share;
        totals.set(targetId, (totals.get(targetId) ?? 0) + share);
      }
    }
    for (const polity of w.polities)
      if (originalById.has(polity.id) || Object.values(HISTORICAL_POLITY_IDS).includes(polity.id))
        polity[asset] = 0;
    for (const [id, amount] of totals) {
      const recipient = livePolityById.get(id);
      if (!recipient) throw new Error(`Historical authority allocation target ${id} is missing`);
      recipient[asset] += amount;
    }
  }

  // Military and research are bounded capability indices, not inventories. Combine the source
  // regional indices by their represented population; never add them across colonies.
  for (const capability of ['military', 'research'] as const) {
    const weightedTotals = new Map<string, number>();
    const populationWeights = new Map<string, number>();
    for (const settlement of regionWorld.settlements) {
      const sourcePolity = originalById.get(
        state.authorities[settlement.id]?.initialLocalPolityId ??
          settlement.regionId ??
          settlement.polityId,
      );
      const sourceOwner = sourcePolity?.id;
      const destination = settlement.polityId;
      const weight =
        settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders;
      if (!sourcePolity || !sourceOwner || weight <= 0) continue;
      const liveSourceCapability =
        livePolityById.get(sourcePolity.id)?.[capability] ?? sourcePolity[capability];
      weightedTotals.set(
        destination,
        (weightedTotals.get(destination) ?? 0) + liveSourceCapability * weight,
      );
      populationWeights.set(destination, (populationWeights.get(destination) ?? 0) + weight);
    }
    for (const polity of w.polities) {
      const weight = populationWeights.get(polity.id) ?? 0;
      const sourceFallback =
        livePolityById.get(polity.id)?.[capability] ?? originalById.get(polity.id)?.[capability];
      if (weight > 0) polity[capability] = weightedTotals.get(polity.id)! / weight;
      else if (sourceFallback !== undefined) polity[capability] = sourceFallback;
    }
  }

  const activeOwnerIds = new Set(regionWorld.settlements.map((settlement) => settlement.polityId));
  w.polities = w.polities.filter((polity) => {
    if (!originalById.has(polity.id) || activeOwnerIds.has(polity.id)) return true;
    // Capability indices are not inventories. Only an unassigned cash balance keeps a polity alive.
    return polity.treasury !== 0;
  });
  const treasuryAfter = w.polities.reduce((sum, polity) => sum + polity.treasury, 0);
  const roundingRemainder = treasuryBefore - treasuryAfter;
  if (roundingRemainder !== 0 && w.polities.length) {
    const reconciliationTarget = [...w.polities].sort(
      (a, b) => Math.abs(a.treasury) - Math.abs(b.treasury) || a.id.localeCompare(b.id),
    )[0]!;
    reconciliationTarget.treasury += roundingRemainder;
  }
  state.controlApplied = true;
  sovereigntyContexts.delete(w);
  return state;
}

export function authorityAt(w: World, settlementId: string): SovereigntyAuthority | undefined {
  const authority = contextOf(w)?.authorityById.get(settlementId);
  return authority ? effectiveAuthority(w, authority) : undefined;
}

/**
 * Persist a committed settlement-owner change using its already-emitted source event. Call after
 * the canonical simulator changes Settlement.polityId. Reads stay pure; this explicit commit is
 * what makes later recapture by the original local polity distinguishable from the 1900 baseline.
 */
export function synchronizeSovereigntyControl(
  w: World,
  settlementIds: readonly string[],
  committedEventId: string,
): SovereigntyControlChange[] {
  const state = stateOf(w);
  const context = contextOf(w);
  if (!state || !committedEventId.trim()) return [];
  const changes: SovereigntyControlChange[] = [];
  for (const settlementId of new Set(settlementIds)) {
    const settlement = context?.settlementById.get(settlementId);
    const authority = context?.authorityById.get(settlementId);
    if (!settlement || !authority) continue;
    const previousController = authority.current.controllerPolityId;
    const newController = settlement.polityId;
    authority.observedSettlementPolityId = settlement.polityId;
    if (!newController || !previousController || newController === previousController) continue;
    const previousSovereign = authority.current.sovereignPolityId;
    authority.current.controllerPolityId = newController;
    authority.current.status =
      newController === authority.initialLocalPolityId ? authority.baseline.status : 'occupied';
    authority.current.source = 'settlement-control-event';
    authority.current.changedAt = w.month;
    authority.current.causeIds = [committedEventId];
    const change: SovereigntyControlChange = {
      id: `${committedEventId}:sovereignty:${settlementId}`,
      month: w.month,
      action: 'control',
      settlementIds: [settlementId],
      previousControllerPolityId: previousController,
      newControllerPolityId: newController,
      previousSovereignPolityId: previousSovereign,
      newSovereignPolityId: previousSovereign,
      causeIds: [committedEventId],
    };
    state.changes.push(change);
    changes.push(change);
  }
  return changes;
}

/** Returns an exact region-level authority only when every represented settlement agrees. */
export function foreignAuthority(w: World, polityId: string): AuthoritySummary {
  const context = contextOf(w);
  const rows = context?.authoritiesByRegion.get(polityId) ?? [];
  const authorities = new Set<string>();
  const unitCodes = new Set<number>();
  let unknownSettlementCount = 0;
  for (const baselineRow of rows) {
    const row = effectiveAuthority(w, baselineRow, context);
    if (row.baseline.historicalUnitCode !== undefined)
      unitCodes.add(row.baseline.historicalUnitCode);
    const currentAuthority = diplomaticAuthorityId(row);
    if (currentAuthority) authorities.add(currentAuthority);
    else unknownSettlementCount++;
  }
  const values = [...authorities].sort();
  let kind: AuthoritySummary['kind'];
  if (!rows.length || (!values.length && unknownSettlementCount)) kind = 'unknown';
  else if (values.length > 1) kind = 'mixed';
  else if (unknownSettlementCount) kind = 'partially-known';
  else kind = values[0] === polityId ? 'same' : 'foreign';
  return {
    polityId,
    kind,
    ...(values.length === 1 && !unknownSettlementCount ? { authorityPolityId: values[0] } : {}),
    authorityPolityIds: values,
    mappedSettlementCount: rows.length - unknownSettlementCount,
    unknownSettlementCount,
    historicalUnitCodes: [...unitCodes].sort((a, b) => a - b),
  };
}

export function diplomacyDecision(
  w: World,
  aPolityId: string,
  bPolityId: string,
): DiplomacyDecision {
  if (aPolityId === bPolityId)
    return { allowed: true, reason: 'self-conflict', sourceSettlementIds: [] };
  const a = foreignAuthority(w, aPolityId);
  const b = foreignAuthority(w, bPolityId);
  if (a.authorityPolityId && a.authorityPolityId === b.authorityPolityId)
    return {
      allowed: false,
      reason: 'same-sovereign-authority',
      sharedAuthorityPolityId: a.authorityPolityId,
      sourceSettlementIds: [aPolityId, bPolityId]
        .flatMap((id) => contextOf(w)?.authoritiesByRegion.get(id) ?? [])
        .filter(
          (authority) =>
            diplomaticAuthorityId(effectiveAuthority(w, authority)) === a.authorityPolityId,
        )
        .map((authority) => authority.settlementId)
        .slice(0, 64),
    };
  if (
    a.kind === 'unknown' ||
    b.kind === 'unknown' ||
    a.kind === 'partially-known' ||
    b.kind === 'partially-known' ||
    a.kind === 'mixed' ||
    b.kind === 'mixed'
  )
    return { allowed: true, reason: 'authority-unknown', sourceSettlementIds: [] };
  return { allowed: true, sourceSettlementIds: [] };
}

export function diplomaticCamp(w: World, polityId: string): string[] {
  const context = contextOf(w);
  const historicalAuthorityId = Object.values(HISTORICAL_POLITY_IDS).includes(polityId);
  const authority =
    foreignAuthority(w, polityId).authorityPolityId ??
    (historicalAuthorityId && context?.polityById.has(polityId) ? polityId : undefined);
  if (!authority) return [polityId];
  const members = new Set([authority, polityId]);
  for (const polity of w.polities) {
    const rows = context?.authoritiesByRegion.get(polity.id) ?? [];
    if (rows.length && regionAuthorityId(w, rows, context) === authority) members.add(polity.id);
  }
  return [...members].filter((id) => context?.polityById.has(id)).sort();
}

function regionAuthorityId(
  w: World,
  rows: SovereigntyAuthority[],
  context: SovereigntyContext | undefined,
): string | undefined {
  let exact: string | undefined;
  for (const baselineRow of rows) {
    const row = effectiveAuthority(w, baselineRow, context);
    const authorityId = diplomaticAuthorityId(row);
    if (!authorityId || (exact && exact !== authorityId)) return undefined;
    exact = authorityId;
  }
  return exact;
}

/** End an already-active war that violates a known shared sovereign authority. */
export function enforceDependentDiplomacy(w: World, emit: Emit): DependentWarCancellation[] {
  const wars = w.geopolitics?.wars ?? [];
  const cancelled: DependentWarCancellation[] = [];
  for (const war of wars) {
    if (war.status !== 'active') continue;
    const decision = diplomacyDecision(w, war.a, war.b);
    if (decision.allowed || !decision.sharedAuthorityPolityId) continue;
    war.status = 'ended';
    for (const id of new Set([...war.campA, ...war.campB])) war.mobilized[id] = 0;
    const relation = w.geopolitics?.relations[[war.a, war.b].sort().join('~')];
    if (relation?.status === 'war') relation.status = 'peace';
    const event = emit(
      'dependent_diplomacy_blocked',
      [],
      war.fronts[0]?.aSettlementId,
      '已知的同一宗主权关系阻止属地之间维持独立战争；当地政治争端仍可通过自治、改革或独立过程演化。',
      {
        warId: war.id,
        polityA: war.a,
        polityB: war.b,
        sharedAuthorityPolityId: decision.sharedAuthorityPolityId,
        classification: 'sovereignty-diplomacy-constraint',
      },
      [
        ...new Set([
          ...war.causeIds,
          ...(stateOf(w)?.initializedEventId ? [stateOf(w)!.initializedEventId!] : []),
        ]),
      ],
      0.85,
    );
    cancelled.push({
      warId: war.id,
      authorityPolityId: decision.sharedAuthorityPolityId,
      eventId: event.id,
    });
  }
  return cancelled;
}

/** Transfer actual money from a settlement to its current controller; baseline-only unknowns cannot collect tax. */
export function remitSovereignRevenue(
  w: World,
  settlementId: string,
  requestedAmount: number,
  emit?: Emit,
): RevenueResult {
  if (!Number.isFinite(requestedAmount) || requestedAmount <= 0)
    return { ok: false, amount: 0, reason: 'invalid-amount' };
  const context = contextOf(w);
  const settlement = context?.settlementById.get(settlementId);
  const authority = context?.authorityById.get(settlementId);
  if (!settlement || !authority) return { ok: false, amount: 0, reason: 'authority-unknown' };
  const currentAuthority = effectiveAuthority(w, authority, context);
  // Autonomous administrations keep sovereign remittances flowing to the parent. Local revenue
  // retention is not modeled here; a separate fiscal rule may retain an independently recorded share.
  const effectiveRecipientId =
    currentAuthority.current.status === 'autonomous'
      ? currentAuthority.current.sovereignPolityId
      : currentAuthority.current.controllerPolityId;
  if (!effectiveRecipientId) return { ok: false, amount: 0, reason: 'authority-unknown' };
  const recipient = context?.polityById.get(effectiveRecipientId);
  if (!recipient) return { ok: false, amount: 0, reason: 'recipient-missing' };
  const amount = Math.min(Math.max(0, settlement.coin), requestedAmount);
  if (amount <= 0) return { ok: false, amount: 0, reason: 'no-available-funds' };
  settlement.coin -= amount;
  recipient.treasury += amount;
  const id = `${w.id}:sovereignty-revenue:${w.month}:${settlementId}:${stateOf(w)?.revenueReceipts.length ?? 0}`;
  const event = emit?.(
    'sovereign_revenue_remitted',
    [],
    settlementId,
    `当地公共收入中有 ${amount.toFixed(2)} 单位转入实际控制权当局。`,
    {
      settlementId,
      recipientPolityId: effectiveRecipientId,
      amount,
      baselineUnitCode: authority.baseline.historicalUnitCode,
      classification: 'simulated-fiscal-transfer',
    },
    authority.current.causeIds,
    0.6,
  );
  const receipt: SovereigntyRevenueReceipt = {
    id,
    month: w.month,
    settlementId,
    recipientPolityId: effectiveRecipientId,
    amount,
    eventId: event?.id,
  };
  const state = stateOf(w);
  if (state) {
    state.revenueReceipts.push(receipt);
    if (state.revenueReceipts.length > 4096)
      state.revenueReceipts.splice(0, state.revenueReceipts.length - 4096);
  }
  return { ok: true, receipt };
}

function hasCrisis(w: World, settlementIds: Set<string>): { active: boolean; causeIds: string[] } {
  const causes = new Set<string>();
  const highUnrest = w.settlements.some(
    (settlement) => settlementIds.has(settlement.id) && settlement.unrest >= 0.25,
  );
  for (const shock of w.shocks ?? [])
    if (
      shock.started <= w.month &&
      shock.ends > w.month &&
      shock.locationIds.some((id) => settlementIds.has(id))
    )
      causes.add(shock.causeId);
  for (const conflict of w.conflicts)
    if (conflict.status === 'active' && settlementIds.has(conflict.locationId))
      conflict.causeIds.forEach((id) => causes.add(id));
  for (const war of w.geopolitics?.wars ?? [])
    if (war.status === 'active')
      for (const front of war.fronts)
        if ([front.aSettlementId, front.bSettlementId].some((id) => settlementIds.has(id)))
          war.causeIds.forEach((id) => causes.add(id));
  return { active: highUnrest || causes.size > 0, causeIds: [...causes].slice(-24) };
}

function parentExitCondition(
  w: World,
  parentPolityId: string,
  context: SovereigntyContext | undefined,
): { allowed: boolean; kind?: 'legitimacy-collapse' | 'war-supply-collapse'; causeIds: string[] } {
  const parent = context?.polityById.get(parentPolityId);
  if (!parent) return { allowed: false, causeIds: [] };
  const government = w.geopolitics?.governments[parentPolityId];
  if (parent.legitimacy <= 0.2)
    return {
      allowed: true,
      kind: 'legitimacy-collapse',
      causeIds: [...(government?.causeIds ?? [])],
    };
  for (const war of w.geopolitics?.wars ?? []) {
    const includesParent =
      war.a === parentPolityId ||
      war.b === parentPolityId ||
      war.campA.includes(parentPolityId) ||
      war.campB.includes(parentPolityId);
    if (
      war.status === 'active' &&
      includesParent &&
      war.months >= 6 &&
      (war.supplyFulfillment[parentPolityId] ?? 1) <= 0.15
    )
      return { allowed: true, kind: 'war-supply-collapse', causeIds: [...war.causeIds] };
  }
  return { allowed: false, causeIds: [] };
}

/** Apply a costly, organization-backed status change after an actual local crisis; no year schedule is consulted. */
export function requestSovereigntyTransition(
  w: World,
  request: SovereigntyTransitionRequest,
  emit: Emit,
): SovereigntyTransitionResult {
  const state = stateOf(w);
  if (!state) return { ok: false, error: 'Sovereignty baseline has not been initialized' };
  let context = contextOf(w);
  const ids = [...new Set(request.settlementIds)];
  if (!ids.length || ids.length !== request.settlementIds.length)
    return { ok: false, error: 'Select at least one unique settlement' };
  const settlements = ids.map((id) => context?.settlementById.get(id));
  if (settlements.some((settlement) => !settlement))
    return { ok: false, error: 'Settlement is missing' };
  const selected = settlements as NonNullable<(typeof settlements)[number]>[];
  const authorities = selected.map((settlement) => context?.authorityById.get(settlement.id));
  if (authorities.some((authority) => !authority))
    return { ok: false, error: 'Authority is unknown for part of the selected territory' };
  const storedAuthorities = authorities as SovereigntyAuthority[];
  const effectiveAuthorities = storedAuthorities.map((authority) =>
    effectiveAuthority(w, authority, context),
  );
  if (effectiveAuthorities.some((authority) => !authority.current.controllerPolityId))
    return { ok: false, error: 'Authority is unknown for part of the selected territory' };
  const controllerIds = new Set(
    effectiveAuthorities.map((authority) => authority.current.controllerPolityId!),
  );
  if (controllerIds.size !== 1)
    return { ok: false, error: 'Selected settlements have different current controllers' };
  const previousController = [...controllerIds][0];
  const alreadyControlsTarget = previousController === request.targetPolityId;
  const autonomyCanBecomeIndependent =
    request.action === 'independence' &&
    effectiveAuthorities.every(
      (authority) =>
        authority.current.status === 'autonomous' &&
        authority.current.sovereignPolityId !== request.targetPolityId,
    );
  if (alreadyControlsTarget && !autonomyCanBecomeIndependent)
    return { ok: false, error: 'Target polity already controls this territory' };
  const registeredTarget = (state.modernPolityRegistry ?? []).find(
    (polity) => polity.id === request.targetPolityId,
  );
  const isHistoricalAuthority = Object.values(HISTORICAL_POLITY_IDS).includes(
    request.targetPolityId,
  );
  if (!registeredTarget && !isHistoricalAuthority)
    return { ok: false, error: 'Target polity is not in the historical-start registry' };
  if (!context?.polityById.has(request.targetPolityId) && !registeredTarget)
    return { ok: false, error: 'Target historical authority is not materialized' };
  if (new Set(effectiveAuthorities.map((authority) => authority.initialLocalPolityId)).size !== 1)
    return { ok: false, error: 'A sovereignty transition must concern one modern region' };
  const crisis = hasCrisis(w, new Set(ids));
  if (!crisis.active) return { ok: false, error: 'No qualifying local crisis or high unrest' };
  const cost = request.cost ?? (request.action === 'autonomy' ? 2 : 5);
  if (!Number.isFinite(cost) || cost <= 0 || cost > 1000)
    return { ok: false, error: 'Transition cost must be within 0..1000' };
  const personById = new Map(w.persons.map((person) => [person.id, person]));
  const eligibleLocalMember = (memberId: string) => {
    const person = personById.get(memberId);
    return (
      !!person &&
      person.death === undefined &&
      !person.journey &&
      !isDetained(w, person) &&
      ids.includes(person.locationId)
    );
  };
  const supporterCandidates = w.organizations
    .filter(
      (organization) =>
        organization.status === 'active' &&
        ids.includes(organization.locationId) &&
        organization.treasury >= cost,
    )
    .map((organization) => ({
      organization,
      localMembers: organization.memberIds.filter(eligibleLocalMember),
    }))
    .filter((candidate) => candidate.localMembers.length > 0)
    .sort(
      (a, b) =>
        b.localMembers.length - a.localMembers.length ||
        b.organization.treasury - a.organization.treasury ||
        a.organization.id.localeCompare(b.organization.id),
    );
  const supporterMemberIds = new Set(
    supporterCandidates.flatMap((candidate) => candidate.localMembers),
  );
  const localPopulation = selected.reduce(
    (total, settlement) =>
      total + settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders,
    0,
  );
  const requiredSupporters = Math.max(3, Math.ceil(localPopulation * 0.001));
  const regionId = selected[0].regionId ?? effectiveAuthorities[0].modernRegionId;
  const adultCohort = selected.reduce((n, s) => n + s.cohort.adults, 0);
  const movement = Object.values(w.movements?.movements ?? {}).find(
    (candidate) =>
      candidate.status === 'active' &&
      candidate.regionId === regionId &&
      candidate.controller === previousController &&
      candidate.orientation === request.action &&
      candidate.lastMonth === w.month &&
      candidate.sourceIds.length > 0 &&
      candidate.namedSupporterIds.filter((id) => supporterMemberIds.has(id)).length >= 3 &&
      candidate.organizationIds.some((id) =>
        supporterCandidates.some((c) => c.organization.id === id),
      ),
  );
  const aggregateSupport =
    movement && Number.isFinite(movement.aggregateSupporters)
      ? Math.max(0, Math.min(adultCohort, Math.floor(movement.aggregateSupporters)))
      : 0;
  if (
    supporterMemberIds.size < 3 ||
    supporterMemberIds.size + aggregateSupport < requiredSupporters
  )
    return {
      ok: false,
      error: `Local organizations need ${requiredSupporters} present, living supporters (found ${supporterMemberIds.size})`,
    };
  const supporterCandidate = supporterCandidates[0];
  if (!supporterCandidate)
    return {
      ok: false,
      error: 'An active local organization with living members must support the transition',
    };
  const supporter = supporterCandidate.organization;
  const targetIsSovereign = request.action === 'independence';
  const previousSovereignIds = new Set(
    effectiveAuthorities
      .map((authority) => authority.current.sovereignPolityId)
      .filter((id): id is string => !!id),
  );
  if (previousSovereignIds.size > 1)
    return { ok: false, error: 'Selected territory has mixed sovereignty' };
  const previousSovereign = [...previousSovereignIds][0];
  if (!targetIsSovereign && previousSovereign) {
    const parent = context?.polityById.get(previousSovereign);
    const government = w.geopolitics?.governments[previousSovereign];
    const consent =
      !!government &&
      government.laws.suffrage >= 0.35 &&
      government.laws.pressFreedom >= 0.35 &&
      government.parties
        .filter((p) => p.ideology === 'liberal' || p.ideology === 'socialist')
        .reduce((n, p) => n + p.support, 0) >= 0.4 &&
      supporterMemberIds.size + aggregateSupport >= Math.max(3, Math.ceil(localPopulation * 0.02));
    if (!parent || (parent.legitimacy > 0.35 && !consent))
      return {
        ok: false,
        error:
          'Autonomy requires weakened imperial control or a participating reform coalition with material public support',
      };
  }
  const exitCondition =
    targetIsSovereign && previousSovereign
      ? parentExitCondition(w, previousSovereign, context)
      : { allowed: false, causeIds: [] as string[] };
  if (
    targetIsSovereign &&
    (!previousSovereign || previousSovereign === request.targetPolityId || !exitCondition.allowed)
  )
    return {
      ok: false,
      error:
        'Independence requires the parent authority to collapse (legitimacy <= 0.2 or a six-month active war with supply <= 0.15)',
    };
  if (!context?.polityById.has(request.targetPolityId)) {
    const restored: Polity = {
      id: registeredTarget!.id,
      name: registeredTarget!.name,
      color: registeredTarget!.color,
      treasury: 0,
      legitimacy: 0.5,
      tax: Math.max(0.02, Math.min(0.2, registeredTarget!.tax || 0.08)),
      leaderId: '',
      military: 0,
      research: 0,
    };
    w.polities.push(restored);
    sovereigntyContexts.delete(w);
    context = contextOf(w);
  }
  supporter.treasury -= cost;
  selected[0].coin += cost;
  const causes = [
    ...new Set([
      ...supporter.causeIds,
      ...crisis.causeIds,
      ...exitCondition.causeIds,
      ...(movement?.sourceIds.slice(-4) ?? []),
      ...effectiveAuthorities.flatMap((authority) => authority.current.causeIds),
    ]),
  ].slice(-24);
  const event = emit(
    request.action === 'independence' ? 'independence_declared' : 'autonomy_granted',
    [...supporterMemberIds].slice(0, 8),
    selected[0].id,
    request.action === 'independence'
      ? '当地组织在危机中承担实际成本，推动建立独立政治权力。'
      : '当地组织在危机中承担实际成本，争取到可执行的自治权。',
    {
      action: request.action,
      settlementIds: ids,
      previousControllerPolityId: previousController,
      targetPolityId: request.targetPolityId,
      organizationId: supporter.id,
      organizationCost: cost,
      localSupportMembers: supporterMemberIds.size,
      aggregateSupportTags: aggregateSupport,
      movementId: movement?.movementId,
      localPopulation,
      localSupportRatio: localPopulation > 0 ? supporterMemberIds.size / localPopulation : 0,
      parentExitCondition: exitCondition.kind,
      classification: 'simulated-sovereignty-transition',
    },
    causes,
    0.95,
  );
  for (const authority of storedAuthorities) {
    authority.current.status = request.action === 'independence' ? 'independent' : 'autonomous';
    authority.current.controllerPolityId = request.targetPolityId;
    if (targetIsSovereign) authority.current.sovereignPolityId = request.targetPolityId;
    authority.current.source = 'simulated-transition';
    authority.current.changedAt = w.month;
    authority.current.causeIds = [event.id];
    const settlement = context?.settlementById.get(authority.settlementId);
    if (settlement) {
      settlement.polityId = request.targetPolityId;
      authority.observedSettlementPolityId = request.targetPolityId;
    }
  }
  const change: SovereigntyControlChange = {
    id: event.id,
    month: w.month,
    action: request.action,
    settlementIds: ids,
    previousControllerPolityId: previousController,
    newControllerPolityId: request.targetPolityId,
    previousSovereignPolityId: previousSovereign,
    newSovereignPolityId: targetIsSovereign ? request.targetPolityId : previousSovereign,
    causeIds: causes,
  };
  state.changes.push(change);
  return {
    ok: true,
    eventId: event.id,
    organizationId: supporter.id,
    cost,
    changedSettlementIds: ids,
  };
}
