import type { GeneratedPack } from '../generated.js';
import type { SceneStage } from '../domain.js';

export const LIFE_STAGES: SceneStage[] = [
  'infancy',
  'childhood',
  'adolescence',
  'adulthood',
  'elderhood',
];

/** Tags the Phase-2 brief explicitly targets. */
export const TARGET_TAGS = [
  'adolescence',
  'courtship',
  'housing',
  'medical',
  'health',
  'faith',
  'market',
  'debt',
  'housework',
  'bereavement',
  'elderhood',
] as const;

/**
 * Stage/tag cells that should exist for a playable Vienna life. A missing cell
 * is a content gap, not a failure of the engine.
 */
export const REQUIRED_STAGE_TAGS: Record<SceneStage, string[]> = {
  infancy: ['health', 'family'],
  childhood: ['school', 'family', 'street'],
  adolescence: ['adolescence', 'school', 'work', 'family'],
  adulthood: ['courtship', 'housing', 'health', 'faith', 'market', 'debt', 'housework', 'family'],
  elderhood: ['bereavement', 'health', 'family'],
};

export type StageCoverage = {
  packs: number;
  scenes: number;
  outcomes: number;
  narrations: number;
};

export type FamilyCoverage = {
  id: string;
  title: string;
  stage: SceneStage;
  ageWindow: { min: number; max: number };
  tags: string[];
  baseRate: number;
  nodes: number;
  outcomes: number;
  narrations: number;
};

export type PackCoverageReport = {
  packs: number;
  scenes: number;
  outcomes: number;
  narrations: number;
  stages: Record<string, StageCoverage>;
  tags: Record<string, { packs: number; scenes: number }>;
  families: FamilyCoverage[];
  missingStages: SceneStage[];
  missingTags: string[];
  missingStageTags: { stage: SceneStage; tag: string }[];
  thinFamilies: { id: string; nodes: number; narrations: number }[];
};

export function auditPacks(packs: GeneratedPack[]): PackCoverageReport {
  const stages = Object.fromEntries(
    LIFE_STAGES.map((stage) => [
      stage,
      { packs: 0, scenes: 0, outcomes: 0, narrations: 0 },
    ]),
  ) as Record<string, StageCoverage>;
  const tags: Record<string, { packs: number; scenes: number }> = {};
  const families: FamilyCoverage[] = [];
  let scenes = 0;
  let outcomes = 0;
  let narrations = 0;

  for (const pack of packs) {
    const packNarrations = pack.nodes.reduce(
      (sum, node) =>
        sum + node.outcomes.reduce((inner, outcome) => inner + (outcome.narration?.length ?? 0), 0),
      0,
    );
    const packOutcomes = pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0);
    scenes += pack.nodes.length;
    outcomes += packOutcomes;
    narrations += packNarrations;
    const stage = stages[pack.stage];
    if (stage) {
      stage.packs += 1;
      stage.scenes += pack.nodes.length;
      stage.outcomes += packOutcomes;
      stage.narrations += packNarrations;
    }
    for (const tag of pack.tags) {
      const entry = tags[tag] ?? { packs: 0, scenes: 0 };
      entry.packs += 1;
      entry.scenes += pack.nodes.length;
      tags[tag] = entry;
    }
    families.push({
      id: pack.id,
      title: pack.title,
      stage: pack.stage,
      ageWindow: pack.ageWindow,
      tags: pack.tags,
      baseRate: pack.baseRate,
      nodes: pack.nodes.length,
      outcomes: packOutcomes,
      narrations: packNarrations,
    });
  }

  const missingStages = LIFE_STAGES.filter((stage) => (stages[stage]?.packs ?? 0) === 0);
  const missingTags = TARGET_TAGS.filter((tag) => !tags[tag]);
  const missingStageTags: { stage: SceneStage; tag: string }[] = [];
  for (const stage of LIFE_STAGES) {
    const stagePacks = packs.filter((pack) => pack.stage === stage);
    for (const tag of REQUIRED_STAGE_TAGS[stage]) {
      if (!stagePacks.some((pack) => pack.tags.includes(tag))) {
        missingStageTags.push({ stage, tag });
      }
    }
  }
  const thinFamilies = families
    .filter((family) => family.nodes < 4 || family.narrations < family.outcomes * 2)
    .map((family) => ({
      id: family.id,
      nodes: family.nodes,
      narrations: family.narrations,
    }));

  return {
    packs: packs.length,
    scenes,
    outcomes,
    narrations,
    stages,
    tags,
    families,
    missingStages,
    missingTags,
    missingStageTags,
    thinFamilies,
  };
}

export type ExistingAuditSummary = {
  date?: unknown;
  years?: number;
  events?: number;
  generatedEvents?: number;
  generatedShare?: number;
  focalEvents?: number;
  untriggeredFamilies?: string[];
  sceneBlockedReasons?: { reason: string; count: number }[];
  textWarnings?: string[];
  generated?: {
    packs?: number;
    scenes?: number;
    outcomes?: number;
    narrations?: number;
  };
};

export function summarizeAudit(audit: unknown): ExistingAuditSummary | null {
  if (!audit || typeof audit !== 'object') return null;
  const record = audit as Record<string, unknown>;
  return {
    date: record.date,
    years: typeof record.years === 'number' ? record.years : undefined,
    events: typeof record.events === 'number' ? record.events : undefined,
    generatedEvents:
      typeof record.generatedEvents === 'number' ? record.generatedEvents : undefined,
    generatedShare:
      typeof record.generatedShare === 'number' ? record.generatedShare : undefined,
    focalEvents: typeof record.focalEvents === 'number' ? record.focalEvents : undefined,
    untriggeredFamilies: Array.isArray(record.untriggeredFamilies)
      ? record.untriggeredFamilies.filter((value): value is string => typeof value === 'string')
      : undefined,
    sceneBlockedReasons: Array.isArray(record.sceneBlockedReasons)
      ? record.sceneBlockedReasons.filter(
          (value): value is { reason: string; count: number } =>
            Boolean(value) &&
            typeof value === 'object' &&
            typeof (value as { reason?: unknown }).reason === 'string' &&
            typeof (value as { count?: unknown }).count === 'number',
        )
      : undefined,
    textWarnings: Array.isArray(record.textWarnings)
      ? record.textWarnings.filter((value): value is string => typeof value === 'string')
      : undefined,
    generated:
      record.generated && typeof record.generated === 'object'
        ? (record.generated as ExistingAuditSummary['generated'])
        : undefined,
  };
}
