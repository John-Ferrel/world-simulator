import { z } from 'zod';
import type { HistoricalEvent, World } from '../contracts/index.js';

/**
 * Strict, data-only contract for periodic worldline drift assessment.
 *
 * This module is intentionally a *proposal* format. It cannot mutate the world.
 * Every intervention mirrors an existing bounded effect or a compiler brief;
 * death, resurrection, history rewriting, code, SQL and HTTP have no
 * representation in the grammar.
 */

export const WORLDLINE_DIMENSIONS = [
  'politics',
  'war',
  'economy',
  'population',
  'technology',
  'society',
  'biography',
] as const;
export type WorldlineDimension = (typeof WORLDLINE_DIMENSIONS)[number];

export const WORLDLINE_DIMENSION_LABELS: Readonly<Record<WorldlineDimension, string>> =
  Object.freeze({
    politics: '政治',
    war: '战争',
    economy: '经济',
    population: '人口',
    technology: '技术',
    society: '社会',
    biography: '人物历史',
  });

/**
 * Weights only decide how the seven dimension scores roll up. They are not
 * claims about real history. Assessed dimensions are re-normalized, so an
 * unknown dimension never contributes a fabricated zero.
 */
export const WORLDLINE_DIMENSION_WEIGHTS: Readonly<Record<WorldlineDimension, number>> =
  Object.freeze({
    politics: 0.18,
    war: 0.2,
    economy: 0.15,
    population: 0.15,
    technology: 0.1,
    society: 0.12,
    biography: 0.1,
  });

export const PRESSURE_KINDS = ['epidemic', 'supply', 'crisis', 'innovation', 'reform'] as const;
export const KNOWLEDGE_FIELDS = ['craft', 'learning', 'education', 'knowledge'] as const;
export const OPPORTUNITY_ACTIONS = [
  'practice',
  'seek_work',
  'care',
  'socialize',
  'relocate',
  'organize',
  'petition',
  'research',
  'publish',
  'aid',
  'project',
  'faith',
  'campaign',
  'negotiate',
] as const;
export const EVENT_DEFINITION_TRIGGERS = [
  'periodic',
  'birth',
  'death',
  'migration',
  'war',
  'shortage',
  'tech',
  'event',
] as const;
/** Mirrors bounded EffectSchema entries from packages/rules/schema.ts. */
export const EVENT_DEFINITION_EFFECT_TYPES = [
  'transfer',
  'learn',
  'relate',
  'offer',
  'pressure',
  'ability',
  'policy',
  'health',
  'knowledge',
  'unrest',
  'legitimacy',
  'military',
  'disease',
] as const;

const idString = z
  .string()
  .min(1)
  .max(180)
  .regex(/^[A-Za-z0-9_:.~/-]+$/, '标识符只能包含字母、数字和 _ : . ~ / -');

const claimText = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .regex(/^[^\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]*$/u, '文本包含控制字符');

const score = z.number().finite().min(0).max(1);

export const WorldlineCalendarSchema = z
  .object({
    year: z.number().int().min(-100000).max(100000),
    month: z.number().int().min(1).max(12),
  })
  .strict();
export type WorldlineCalendar = z.infer<typeof WorldlineCalendarSchema>;

export const WorldlineEvidenceSchema = z
  .object({
    id: idString,
    claim: claimText(500),
    eventIds: z.array(idString).max(8).default([]),
    locationIds: z.array(idString).max(8).default([]),
    personIds: z.array(idString).max(8).default([]),
  })
  .strict()
  .superRefine((evidence, ctx) => {
    const total =
      evidence.eventIds.length + evidence.locationIds.length + evidence.personIds.length;
    if (total === 0)
      ctx.addIssue({
        code: 'custom',
        path: ['eventIds'],
        message: '证据必须至少引用一个真实事件、地点或人物',
      });
    for (const [key, values] of [
      ['eventIds', evidence.eventIds],
      ['locationIds', evidence.locationIds],
      ['personIds', evidence.personIds],
    ] as const) {
      if (new Set(values).size !== values.length)
        ctx.addIssue({ code: 'custom', path: [key], message: `${key} 不能包含重复标识符` });
    }
  });
export type WorldlineEvidence = z.infer<typeof WorldlineEvidenceSchema>;

export const WorldlineBaselineSchema = z
  .object({
    kind: z.enum(['historical-1900', 'observed-start', 'event-derived', 'none']),
    value: z.number().finite().min(0).max(1e15).nullable(),
    note: claimText(300),
  })
  .strict()
  .superRefine((baseline, ctx) => {
    if (baseline.kind === 'none') {
      if (baseline.value !== null)
        ctx.addIssue({
          code: 'custom',
          path: ['value'],
          message: 'baseline 为 none 时 value 必须为 null',
        });
      return;
    }
    if (baseline.value === null)
      ctx.addIssue({
        code: 'custom',
        path: ['value'],
        message: '有基线的评估必须给出 baseline value',
      });
  });
export type WorldlineBaseline = z.infer<typeof WorldlineBaselineSchema>;

export const WorldlineDimensionAssessmentSchema = z
  .object({
    dimension: z.enum(WORLDLINE_DIMENSIONS),
    status: z.enum(['assessed', 'unknown']),
    score: score.nullable(),
    baseline: WorldlineBaselineSchema,
    evidenceIds: z.array(idString).max(12).default([]),
    explanation: claimText(600),
  })
  .strict()
  .superRefine((dimension, ctx) => {
    if (dimension.status === 'unknown') {
      if (dimension.score !== null)
        ctx.addIssue({
          code: 'custom',
          path: ['score'],
          message: 'unknown 维度不得给出分数',
        });
      if (dimension.evidenceIds.length !== 0)
        ctx.addIssue({
          code: 'custom',
          path: ['evidenceIds'],
          message: 'unknown 维度不得附带被当作事实的证据',
        });
      if (dimension.baseline.kind !== 'none')
        ctx.addIssue({
          code: 'custom',
          path: ['baseline', 'kind'],
          message: 'unknown 维度必须标记 baseline 为 none',
        });
      return;
    }
    if (dimension.score === null)
      ctx.addIssue({
        code: 'custom',
        path: ['score'],
        message: 'assessed 维度必须有 0..1 分数',
      });
    if (dimension.evidenceIds.length === 0)
      ctx.addIssue({
        code: 'custom',
        path: ['evidenceIds'],
        message: 'assessed 维度必须至少引用一条证据',
      });
    if (dimension.baseline.kind === 'none')
      ctx.addIssue({
        code: 'custom',
        path: ['baseline', 'kind'],
        message: 'assessed 维度必须说明比较基线或明确的事件导出基线',
      });
  });
export type WorldlineDimensionAssessment = z.infer<typeof WorldlineDimensionAssessmentSchema>;

export const WorldlineAnomalySchema = z
  .object({
    id: idString,
    dimension: z.enum(WORLDLINE_DIMENSIONS),
    severity: score,
    description: claimText(400),
    evidenceIds: z.array(idString).min(1).max(6),
  })
  .strict();
export type WorldlineAnomaly = z.infer<typeof WorldlineAnomalySchema>;

const interventionBase = {
  rationale: claimText(400),
  evidenceIds: z.array(idString).min(1).max(6),
};
const nonzero = (min: number, max: number, label: string) =>
  z
    .number()
    .finite()
    .min(min)
    .max(max)
    .refine((value) => Math.abs(value) > 1e-9, { message: `${label} 不能为 0` });

export const WorldlineInterventionSchema = z.discriminatedUnion('type', [
  z
    .object({
      type: z.literal('pressure'),
      siteId: idString,
      pressureKind: z.enum(PRESSURE_KINDS),
      severity: z.number().finite().min(0.01).max(0.25),
      months: z.number().int().min(1).max(120),
      cost: z.number().finite().min(0).max(20).default(0),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('disease'),
      siteId: idString,
      prevalence: z.number().finite().min(0).max(1),
      months: z.number().int().min(1).max(120),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('unrest'),
      siteId: idString,
      amount: nonzero(-0.3, 0.3, 'unrest amount'),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('legitimacy'),
      polityId: idString,
      amount: nonzero(-0.2, 0.2, 'legitimacy amount'),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('military'),
      polityId: idString,
      amount: nonzero(-0.2, 0.2, 'military amount'),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('knowledge'),
      siteId: idString,
      field: z.enum(KNOWLEDGE_FIELDS),
      amount: nonzero(-0.2, 0.2, 'knowledge amount'),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('opportunity'),
      siteId: idString,
      title: claimText(120),
      action: z.enum(OPPORTUNITY_ACTIONS),
      targetId: idString.optional(),
      ...interventionBase,
    })
    .strict(),
  z
    .object({
      type: z.literal('event-definition'),
      title: claimText(120),
      trigger: z.enum(EVENT_DEFINITION_TRIGGERS),
      scope: z
        .object({
          kind: z.enum(['person', 'site', 'polity', 'world']),
          ids: z.array(idString).max(8).default([]),
        })
        .strict()
        .superRefine((scope, ctx) => {
          if (scope.kind === 'world' && scope.ids.length !== 0)
            ctx.addIssue({
              code: 'custom',
              path: ['ids'],
              message: 'world scope 不能带 ids',
            });
          if (scope.kind !== 'world' && scope.ids.length === 0)
            ctx.addIssue({
              code: 'custom',
              path: ['ids'],
              message: `${scope.kind} scope 至少需要一个 id`,
            });
        }),
      effectTypes: z.array(z.enum(EVENT_DEFINITION_EFFECT_TYPES)).min(1).max(6),
      ...interventionBase,
    })
    .strict(),
]);
export type WorldlineIntervention = z.infer<typeof WorldlineInterventionSchema>;

export const WorldlineAssessmentSchema = z
  .object({
    schemaVersion: z.literal(1),
    worldId: idString,
    month: z.number().int().min(0),
    calendar: WorldlineCalendarSchema.nullable(),
    generatedBy: z.enum(['fallback', 'model']),
    overallStatus: z.enum(['assessed', 'partial', 'unknown']),
    overallScore: score.nullable(),
    dimensions: z.array(WorldlineDimensionAssessmentSchema).length(WORLDLINE_DIMENSIONS.length),
    evidence: z.array(WorldlineEvidenceSchema).max(48).default([]),
    anomalies: z.array(WorldlineAnomalySchema).max(24).default([]),
    interventions: z.array(WorldlineInterventionSchema).max(8).default([]),
    requiresHumanReview: z.boolean(),
    limitations: z.array(claimText(400)).min(1).max(8),
  })
  .strict()
  .superRefine((assessment, ctx) => {
    const seenDimensions = new Set<WorldlineDimension>();
    for (const [index, dimension] of assessment.dimensions.entries()) {
      if (seenDimensions.has(dimension.dimension))
        ctx.addIssue({
          code: 'custom',
          path: ['dimensions', index, 'dimension'],
          message: `重复维度 ${dimension.dimension}`,
        });
      seenDimensions.add(dimension.dimension);
    }
    for (const dimension of WORLDLINE_DIMENSIONS)
      if (!seenDimensions.has(dimension))
        ctx.addIssue({
          code: 'custom',
          path: ['dimensions'],
          message: `缺少维度 ${dimension}`,
        });

    const evidenceIds = new Set<string>();
    for (const [index, evidence] of assessment.evidence.entries()) {
      if (evidenceIds.has(evidence.id))
        ctx.addIssue({
          code: 'custom',
          path: ['evidence', index, 'id'],
          message: `重复证据 id ${evidence.id}`,
        });
      evidenceIds.add(evidence.id);
    }
    const requireEvidence = assessment.overallStatus !== 'unknown';
    if (requireEvidence && assessment.evidence.length === 0)
      ctx.addIssue({
        code: 'custom',
        path: ['evidence'],
        message: '非 unknown 评估必须包含证据',
      });

    const checkEvidenceRefs = (
      refs: readonly string[],
      path: (string | number)[],
      label: string,
    ) => {
      if (new Set(refs).size !== refs.length)
        ctx.addIssue({ code: 'custom', path, message: `${label} 不能包含重复引用` });
      for (const ref of refs)
        if (!evidenceIds.has(ref))
          ctx.addIssue({
            code: 'custom',
            path,
            message: `${label} 引用了不存在的证据 ${ref}`,
          });
    };
    for (const [index, dimension] of assessment.dimensions.entries())
      checkEvidenceRefs(dimension.evidenceIds, ['dimensions', index, 'evidenceIds'], '维度证据');

    const anomalyIds = new Set<string>();
    for (const [index, anomaly] of assessment.anomalies.entries()) {
      if (anomalyIds.has(anomaly.id))
        ctx.addIssue({
          code: 'custom',
          path: ['anomalies', index, 'id'],
          message: `重复异常 id ${anomaly.id}`,
        });
      anomalyIds.add(anomaly.id);
      const dimension = assessment.dimensions.find((d) => d.dimension === anomaly.dimension);
      if (!dimension || dimension.status !== 'assessed')
        ctx.addIssue({
          code: 'custom',
          path: ['anomalies', index, 'dimension'],
          message: '异常点只能引用已评估的维度',
        });
      checkEvidenceRefs(anomaly.evidenceIds, ['anomalies', index, 'evidenceIds'], '异常证据');
    }

    for (const [index, intervention] of assessment.interventions.entries())
      checkEvidenceRefs(
        intervention.evidenceIds,
        ['interventions', index, 'evidenceIds'],
        '干预证据',
      );

    const assessed = assessment.dimensions.filter((d) => d.status === 'assessed').length;
    const expectedStatus =
      assessed === WORLDLINE_DIMENSIONS.length
        ? 'assessed'
        : assessed === 0
          ? 'unknown'
          : 'partial';
    if (assessment.overallStatus !== expectedStatus)
      ctx.addIssue({
        code: 'custom',
        path: ['overallStatus'],
        message: `overallStatus 应为 ${expectedStatus}`,
      });

    const expectedScore = computeWorldlineOverallScore(assessment.dimensions);
    if (expectedScore === null) {
      if (assessment.overallScore !== null)
        ctx.addIssue({
          code: 'custom',
          path: ['overallScore'],
          message: '全部维度 unknown 时 overallScore 必须为 null',
        });
    } else if (
      assessment.overallScore === null ||
      Math.abs(assessment.overallScore - expectedScore) > 0.02
    )
      ctx.addIssue({
        code: 'custom',
        path: ['overallScore'],
        message: `overallScore 与维度加权分数不一致（应为 ${expectedScore}）`,
      });

    if (assessment.overallStatus === 'unknown') {
      if (assessment.anomalies.length !== 0)
        ctx.addIssue({
          code: 'custom',
          path: ['anomalies'],
          message: 'unknown 评估不得虚构异常点',
        });
      if (assessment.interventions.length !== 0)
        ctx.addIssue({
          code: 'custom',
          path: ['interventions'],
          message: 'unknown 评估不得提出干预',
        });
    }

    const reviewRequired =
      assessment.interventions.length > 0 ||
      (assessment.overallScore ?? 0) >= 0.5 ||
      assessment.anomalies.some((anomaly) => anomaly.severity >= 0.7);
    if (reviewRequired && !assessment.requiresHumanReview)
      ctx.addIssue({
        code: 'custom',
        path: ['requiresHumanReview'],
        message: '存在干预、高偏移或严重异常时必须要求人工复核',
      });
  });
export type WorldlineAssessment = z.infer<typeof WorldlineAssessmentSchema>;

export function computeWorldlineOverallScore(
  dimensions: readonly Pick<WorldlineDimensionAssessment, 'dimension' | 'status' | 'score'>[],
): number | null {
  let weighted = 0;
  let weight = 0;
  for (const dimension of dimensions) {
    if (dimension.status !== 'assessed' || dimension.score === null) continue;
    const w = WORLDLINE_DIMENSION_WEIGHTS[dimension.dimension];
    weighted += dimension.score * w;
    weight += w;
  }
  if (weight <= 0) return null;
  return Math.round((weighted / weight) * 10000) / 10000;
}

export type WorldlineValidationContext = {
  world: World;
  /** All committed events the caller can prove, not only the prompt window. */
  events?: readonly HistoricalEvent[];
  /** Optional full-history event ids when the caller did not load every event row. */
  knownEventIds?: readonly string[];
};

export class WorldlineAssessmentError extends Error {
  readonly issues: string[];
  constructor(issues: readonly string[]) {
    super(`世界线评估被拒绝：${issues.join('；')}`);
    this.name = 'WorldlineAssessmentError';
    this.issues = [...issues];
  }
}

function calendarOf(world: World): WorldlineCalendar | null {
  if (!world.calendar) return null;
  return {
    year: world.calendar.startYear + Math.floor(world.month / 12),
    month: (world.month % 12) + 1,
  };
}

function collectKnownEventIds(world: World): Set<string> {
  const ids = new Set<string>();
  const add = (value: string | undefined) => {
    if (value) ids.add(value);
  };
  for (const id of world.terminalEvidence ?? []) add(id);
  for (const id of world.knowledgeEvidence ?? []) add(id);
  for (const shock of world.shocks ?? []) add(shock.causeId);
  for (const conflict of world.conflicts ?? []) for (const id of conflict.causeIds ?? []) add(id);
  for (const effect of world.worldlines?.pendingEffects ?? [])
    for (const id of effect.causeIds ?? []) add(id);
  for (const effect of world.worldlines?.effects ?? [])
    for (const id of effect.causeIds ?? []) add(id);
  for (const organization of world.organizations ?? [])
    for (const id of organization.causeIds ?? []) add(id);
  for (const discovery of world.discoveries ?? [])
    for (const id of discovery.causeIds ?? []) add(id);
  for (const person of world.persons ?? [])
    for (const memory of person.memories ?? []) add(memory.eventId);
  return ids;
}

/**
 * Validate both the strict JSON shape and its references. Throws
 * WorldlineAssessmentError rather than returning a partially accepted object.
 */
export function parseWorldlineAssessment(
  input: unknown,
  context: WorldlineValidationContext,
): WorldlineAssessment {
  const parsed = WorldlineAssessmentSchema.safeParse(input);
  if (!parsed.success) {
    throw new WorldlineAssessmentError(
      parsed.error.issues.map((issue) => {
        const path = issue.path.length ? issue.path.join('.') : '(root)';
        return `${path}: ${issue.message}`;
      }),
    );
  }
  const assessment = parsed.data;
  const issues: string[] = [];
  const { world } = context;

  if (assessment.worldId !== world.id)
    issues.push(`worldId ${assessment.worldId} 与当前世界 ${world.id} 不一致`);
  if (assessment.month !== world.month)
    issues.push(`评估月份 ${assessment.month} 不是当前世界月份 ${world.month}`);
  const expectedCalendar = calendarOf(world);
  if (JSON.stringify(assessment.calendar) !== JSON.stringify(expectedCalendar))
    issues.push(
      `评估日历 ${JSON.stringify(assessment.calendar)} 与当前世界 ${JSON.stringify(expectedCalendar)} 不一致`,
    );

  const eventById = new Map<string, HistoricalEvent>();
  for (const event of context.events ?? []) eventById.set(event.id, event);
  const knownEventIds = new Set(eventById.keys());
  for (const id of context.knownEventIds ?? []) knownEventIds.add(id);
  for (const id of collectKnownEventIds(world)) knownEventIds.add(id);

  const locationIds = new Set(world.settlements.map((settlement) => settlement.id));
  const personIds = new Set(world.persons.map((person) => person.id));
  for (const event of eventById.values()) for (const id of event.personIds ?? []) personIds.add(id);

  const external1900Baseline = world.polities.reduce(
    (sum, polity) =>
      polity.realWorld?.populationYear === 1900
        ? sum + Math.max(0, polity.realWorld.population)
        : sum,
    0,
  );

  for (const [index, evidence] of assessment.evidence.entries()) {
    for (const [refIndex, id] of evidence.eventIds.entries()) {
      if (!knownEventIds.has(id)) {
        issues.push(`evidence.${index}.eventIds.${refIndex}: 未知事件 ${id}`);
        continue;
      }
      const event = eventById.get(id);
      if (event && event.worldId !== world.id)
        issues.push(`evidence.${index}.eventIds.${refIndex}: 事件 ${id} 属于其他世界`);
    }
    for (const [refIndex, id] of evidence.locationIds.entries())
      if (!locationIds.has(id))
        issues.push(`evidence.${index}.locationIds.${refIndex}: 未知地点 ${id}`);
    for (const [refIndex, id] of evidence.personIds.entries())
      if (!personIds.has(id))
        issues.push(`evidence.${index}.personIds.${refIndex}: 未知人物 ${id}`);
  }

  for (const [index, dimension] of assessment.dimensions.entries()) {
    const baseline = dimension.baseline;
    if (baseline.kind === 'historical-1900') {
      if (dimension.dimension !== 'population') {
        issues.push(`dimensions.${index}.baseline: 只有人口维度存在可验证的 1900 年基准`);
        continue;
      }
      if (external1900Baseline <= 0) {
        issues.push(`dimensions.${index}.baseline: 当前世界没有可验证的 1900 年人口基线`);
        continue;
      }
      if ((baseline.value ?? 0) <= 0) {
        issues.push(`dimensions.${index}.baseline.value: 1900 年基线必须大于 0`);
        continue;
      }
      if (
        Math.abs((baseline.value ?? 0) - external1900Baseline) >
        Math.max(1, external1900Baseline * 0.01)
      )
        issues.push(
          `dimensions.${index}.baseline.value: 与政权 realWorld 1900 年人口合计 ${Math.round(external1900Baseline)} 不一致`,
        );
    } else if (baseline.kind === 'observed-start') {
      if (dimension.dimension !== 'population' || world.baselinePopulation <= 0) {
        issues.push(`dimensions.${index}.baseline: 没有可验证的开局人口观测基准`);
        continue;
      }
      if ((baseline.value ?? 0) <= 0) {
        issues.push(`dimensions.${index}.baseline.value: 开局观测基准必须大于 0`);
        continue;
      }
      if (
        Math.abs((baseline.value ?? 0) - world.baselinePopulation) >
        Math.max(1, world.baselinePopulation * 0.01)
      )
        issues.push(
          `dimensions.${index}.baseline.value: 与 world.baselinePopulation ${Math.round(world.baselinePopulation)} 不一致`,
        );
    }
  }

  const siteIds = new Set(world.settlements.map((settlement) => settlement.id));
  const polityIds = new Set(world.polities.map((polity) => polity.id));
  const organizationIds = new Set(
    (world.organizations ?? []).map((organization) => organization.id),
  );
  for (const [index, intervention] of assessment.interventions.entries()) {
    if (intervention.type === 'legitimacy' || intervention.type === 'military') {
      if (!polityIds.has(intervention.polityId))
        issues.push(`interventions.${index}.polityId: 未知政权 ${intervention.polityId}`);
      continue;
    }
    if (intervention.type === 'event-definition') {
      for (const id of intervention.scope.ids) {
        if (intervention.scope.kind === 'site' && !siteIds.has(id))
          issues.push(`interventions.${index}.scope.ids: 未知地点 ${id}`);
        if (intervention.scope.kind === 'polity' && !polityIds.has(id))
          issues.push(`interventions.${index}.scope.ids: 未知政权 ${id}`);
        if (intervention.scope.kind === 'person' && !personIds.has(id))
          issues.push(`interventions.${index}.scope.ids: 未知人物 ${id}`);
      }
      continue;
    }
    if (!siteIds.has(intervention.siteId))
      issues.push(`interventions.${index}.siteId: 未知地点 ${intervention.siteId}`);
    if (
      intervention.type === 'opportunity' &&
      intervention.targetId &&
      !siteIds.has(intervention.targetId) &&
      !personIds.has(intervention.targetId) &&
      !polityIds.has(intervention.targetId) &&
      !organizationIds.has(intervention.targetId)
    )
      issues.push(`interventions.${index}.targetId: 未知目标 ${intervention.targetId}`);
  }

  if (issues.length) throw new WorldlineAssessmentError(issues);
  return assessment;
}

export type WorldlineParseResult =
  | { success: true; data: WorldlineAssessment }
  | { success: false; error: WorldlineAssessmentError };

export function safeParseWorldlineAssessment(
  input: unknown,
  context: WorldlineValidationContext,
): WorldlineParseResult {
  try {
    return { success: true, data: parseWorldlineAssessment(input, context) };
  } catch (error) {
    if (error instanceof WorldlineAssessmentError) return { success: false, error };
    return {
      success: false,
      error: new WorldlineAssessmentError([
        error instanceof Error ? error.message : '未知解析错误',
      ]),
    };
  }
}
