import type {
  EventEffect,
  SceneCondition,
  SceneDefinition,
  SceneOutcome,
  TaskDefinition,
  WorldDate,
  WorldState,
} from '../domain.js';
import type {
  ComposedContent,
  CompositionSource,
  CompositionCompileError,
  CompositionTrace,
  ContextPlaceholder,
  ContextProfile,
  KernelOutcome,
  KernelVariant,
  KernelVariantWhen,
  MilieuProfile,
  PlotKernel,
} from './types.js';
import { CONTEXT_PROFILES, MILIEU_PROFILES } from './contexts.js';

const COMPOSITION_VERSION = 1;
const PLACEHOLDER = /^@/;
const CONTEXT_PLACEHOLDERS = new Set<ContextPlaceholder>([
  '@school',
  '@workplace',
  '@factory',
  '@market',
  '@hospital',
  '@government',
  '@church',
  '@cafe',
  '@station',
  '@home',
  '@rural',
  '@university',
]);

function activeProcessKinds(world: WorldState, kinds: string[] | undefined): boolean {
  if (!kinds || kinds.length === 0) return true;
  return Object.values(world.macro?.developments ?? {}).some(
    (development) =>
      development.status === 'active' &&
      development.historical !== undefined &&
      kinds.includes(development.historical.kind),
  );
}

function activeLegacyKinds(world: WorldState, kinds: string[] | undefined): boolean {
  if (!kinds || kinds.length === 0) return true;
  return Object.values(world.macro?.legacy ?? {}).some(
    (legacy) => legacy.status === 'active' && kinds.includes(legacy.kind),
  );
}

function activeContexts(world: WorldState, target: WorldDate): ContextProfile[] {
  return CONTEXT_PROFILES.filter((context) => {
    if (target.year < context.from || target.year > context.to) return false;
    if (!activeProcessKinds(world, context.requiresProcessKinds)) return false;
    if (!activeLegacyKinds(world, context.requiresLegacyKinds)) return false;
    return true;
  });
}

function contextMatchScore(kernel: PlotKernel, context: ContextProfile): number {
  const tags = kernel.contexts;
  if (!tags || tags.length === 0) return 0;
  return tags.filter((tag) => context.tags.includes(tag)).length;
}

function intersects(left: string[] | undefined, right: string[] | undefined): boolean {
  if (!left || left.length === 0 || !right || right.length === 0) return true;
  return left.some((value) => right.includes(value));
}

function compileTimeMatches(
  when: KernelVariantWhen | undefined,
  world: WorldState,
  context: ContextProfile,
  milieu: MilieuProfile,
): boolean {
  if (!when) return true;
  if (!intersects(when.contextTags, context.tags)) return false;
  if (!intersects(when.milieuTags, milieu.tags)) return false;
  if (!activeProcessKinds(world, when.processKinds)) return false;
  if (!activeLegacyKinds(world, when.legacyKinds)) return false;
  return true;
}

function personConditions(when: KernelVariantWhen | undefined): SceneCondition[] {
  if (!when) return [];
  const conditions: SceneCondition[] = [];
  const roles = Array.isArray(when.hasRole) ? when.hasRole : when.hasRole ? [when.hasRole] : [];
  for (const role of roles) conditions.push({ kind: 'hasRole', role });
  if (when.notHasRole) conditions.push({ kind: 'notHasRole', role: when.notHasRole });
  if (when.employment !== undefined) {
    conditions.push({ kind: 'employment', employed: when.employment });
  }
  if (when.education && when.education.length > 0) {
    conditions.push({ kind: 'education', in: when.education as never });
  }
  if (when.minCash !== undefined || when.maxCash !== undefined) {
    conditions.push({
      kind: 'cash',
      ...(when.minCash !== undefined ? { min: when.minCash } : {}),
      ...(when.maxCash !== undefined ? { max: when.maxCash } : {}),
    });
  }
  if (when.skill) {
    conditions.push({
      kind: 'skill',
      skill: when.skill.name as never,
      ...(when.skill.min !== undefined ? { min: when.skill.min } : {}),
      ...(when.skill.max !== undefined ? { max: when.skill.max } : {}),
    });
  }
  if (when.capability) conditions.push({ kind: 'capability', capability: when.capability });
  if (when.minAge !== undefined || when.maxAge !== undefined) {
    conditions.push({
      kind: 'age',
      ...(when.minAge !== undefined ? { min: when.minAge } : {}),
      ...(when.maxAge !== undefined ? { max: when.maxAge } : {}),
    });
  }
  if (when.relationKind) {
    conditions.push({ kind: 'hasRelation', relationKind: when.relationKind as never });
  }
  if (when.sex) conditions.push({ kind: 'sex', in: [when.sex] });
  if (when.health) {
    conditions.push({
      kind: 'health',
      ...(when.health.min !== undefined ? { min: when.health.min } : {}),
      ...(when.health.max !== undefined ? { max: when.health.max } : {}),
    });
  }
  if (when.hasFlag) conditions.push({ kind: 'hasFlag', flag: when.hasFlag });
  if (when.hasState) conditions.push({ kind: 'hasState', ...when.hasState });
  if (when.attribute)
    conditions.push({
      kind: 'attribute',
      attribute: when.attribute.key,
      ...(when.attribute.min !== undefined ? { min: when.attribute.min } : {}),
      ...(when.attribute.max !== undefined ? { max: when.attribute.max } : {}),
    });
  if (when.position)
    conditions.push({
      kind: 'position',
      ...(when.position.titleIncludes ? { titleIncludes: when.position.titleIncludes } : {}),
      ...(when.position.authority ? { authority: when.position.authority } : {}),
      ...(when.position.organizationId ? { organizationId: when.position.organizationId } : {}),
    });
  if (when.history) {
    conditions.push({ kind: 'history', ...when.history });
  }
  return conditions;
}

function resolveContextValue(value: string, context: ContextProfile): string | undefined {
  if (!PLACEHOLDER.test(value)) return value;
  if (!CONTEXT_PLACEHOLDERS.has(value as ContextPlaceholder)) return undefined;
  return context.places[value as ContextPlaceholder];
}

function resolveEffect(effect: EventEffect, context: ContextProfile): EventEffect | undefined {
  const clone = structuredClone(effect) as unknown as Record<string, unknown>;
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string' && PLACEHOLDER.test(value)) {
      return resolveContextValue(value, context);
    }
    if (Array.isArray(value)) {
      return value.map(walk);
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, walk(entry)]),
      );
    }
    return value;
  };
  const resolved = walk(clone) as Record<string, unknown>;
  if (Object.values(resolved).some((value) => value === undefined)) return undefined;
  if (resolved.type === 'employment' && typeof resolved.wage === 'number') {
    resolved.wage = Math.max(0, Math.round(resolved.wage * (context.wageMultiplier ?? 1)));
  }
  if (typeof resolved.reason !== 'string' || resolved.reason.length === 0) {
    resolved.reason = `composed ${context.id} consequence`;
  }
  if (PLACEHOLDER.test(String(resolved.organizationId ?? ''))) return undefined;
  if (PLACEHOLDER.test(String(resolved.workplaceId ?? ''))) return undefined;
  if (PLACEHOLDER.test(String(resolved.placeId ?? ''))) return undefined;
  if (PLACEHOLDER.test(String(resolved.residenceId ?? ''))) return undefined;
  return resolved as unknown as EventEffect;
}

function resolveText(text: string, context: ContextProfile, milieu: MilieuProfile): string {
  return text
    .replace(/\{milieu\}/g, milieu.label)
    .replace(/\{context\}/g, context.title)
    .replace(/\{flavor\}/g, context.flavor);
}

const MAJOR_EFFECT_TYPES = new Set<EventEffect['type']>([
  'education',
  'employment',
  'unemployment',
  'relation_end',
  'household',
  'residence',
  'role',
  'organization_membership',
  'birth',
  'death',
  'estate',
  'move',
  'condition',
  'flag',
]);

function compileOutcomes(
  kernelId: string,
  outcomes: KernelOutcome[],
  context: ContextProfile,
  milieu: MilieuProfile,
  world: WorldState,
  errors: CompositionCompileError[],
): SceneOutcome[] {
  const result: SceneOutcome[] = [];
  for (const outcome of outcomes) {
    if (outcome.when && !compileTimeMatches(outcome.when, world, context, milieu)) {
      continue;
    }
    const branchConditions = [...personConditions(outcome.when), ...(outcome.conditions ?? [])];
    const effects: EventEffect[] = [];
    let majorFailure = false;
    for (const effect of outcome.effects) {
      const resolved = resolveEffect(effect, context);
      if (resolved) {
        effects.push(resolved);
        continue;
      }
      errors.push({
        kernelId,
        outcomeId: outcome.id,
        effectType: effect.type,
        reason: `unresolved placeholder in ${context.id}/${milieu.id}`,
      });
      if (MAJOR_EFFECT_TYPES.has(effect.type)) majorFailure = true;
    }
    if (majorFailure || effects.length === 0) continue;
    result.push({
      id: outcome.id,
      weight: outcome.weight,
      ...(outcome.title ? { title: resolveText(outcome.title, context, milieu) } : {}),
      immediateText: resolveText(outcome.text, context, milieu),
      effects,
      ...(branchConditions.length > 0 ? { conditions: branchConditions } : {}),
      ...(outcome.trace ? { trace: outcome.trace } : {}),
      ...(outcome.significance !== undefined ? { significance: outcome.significance } : {}),
      ...(outcome.followupIds && outcome.followupIds.length > 0
        ? { followupSceneIds: [...outcome.followupIds] }
        : {}),
      ...(outcome.followupTargets && outcome.followupTargets.length > 0
        ? { followupTargets: structuredClone(outcome.followupTargets) }
        : {}),
    });
  }
  return result;
}

function compileKernel(
  kernel: PlotKernel,
  context: ContextProfile,
  milieu: MilieuProfile,
  world: WorldState,
  errors: CompositionCompileError[],
): { scene?: SceneDefinition; task?: TaskDefinition; trace?: CompositionTrace } {
  if (!intersects(kernel.contexts, context.tags)) return {};
  if (!intersects(kernel.milieus, milieu.tags)) return {};
  const variant: KernelVariant | undefined = kernel.variants?.find((entry) =>
    compileTimeMatches(entry.when, world, context, milieu),
  );
  const outcomes = compileOutcomes(
    kernel.id,
    variant?.outcomes ?? kernel.outcomes,
    context,
    milieu,
    world,
    errors,
  );
  if (outcomes.length === 0) return {};

  const roles = [...kernel.roles, ...(variant?.roles ?? [])].map((role) => ({ ...role }));
  if (kernel.subjectOccupation) {
    const subject = roles.find((role) => role.kind === 'subject');
    const occupation =
      kernel.subjectOccupation === 'primary'
        ? milieu.occupations?.[0]
        : (milieu.occupations?.[1] ?? milieu.occupations?.[0]);
    if (!subject || !occupation) return {};
    subject.occupation = occupation;
  }

  const conditions: SceneCondition[] = [
    ...(kernel.conditions ?? []),
    ...(context.conditions ?? []),
    ...(milieu.conditions ?? []),
    ...(variant?.conditions ?? []),
    { kind: 'worldYear', min: context.from, max: context.to },
    ...(context.regionIds && context.regionIds.length > 0
      ? [{ kind: 'region', in: context.regionIds } as SceneCondition]
      : []),
    ...(context.requiresProcessKinds ?? []).map(
      (kind) =>
        ({
          kind: 'historicalProcess',
          processKind: kind as never,
          sameRegion: true,
        }) as SceneCondition,
    ),
    ...(context.requiresLegacyKinds ?? []).map(
      (kind) => ({ kind: 'legacy', legacyKind: kind, sameRegion: true }) as SceneCondition,
    ),
  ];
  if (milieu.placeKind) conditions.push({ kind: 'placeKind', in: [milieu.placeKind] });

  const id = `${kernel.id}::${context.id}::${milieu.id}${variant ? `::${variant.id}` : ''}`;
  const title = variant?.title ?? kernel.title;
  const tags = [
    ...new Set([
      ...kernel.tags,
      ...context.tags,
      ...milieu.tags,
      'composed',
      `kernel:${kernel.id}`,
      `context:${context.id}`,
      `milieu:${milieu.id}`,
    ]),
  ];
  const base = {
    id,
    version: COMPOSITION_VERSION,
    packId: 'composition',
    title,
    stage: kernel.stage,
    ageWindow: { ...kernel.ageWindow },
    roles,
    conditions,
    tags,
    familyId: kernel.familyId ?? kernel.id,
    subjectProvenance:
      variant?.subjectProvenance ??
      kernel.subjectProvenance ??
      ([
        'birth',
        'initial',
        'materialized_population',
        'historical_activation',
      ] as SceneDefinition['subjectProvenance']),
    cooldownYears: kernel.cooldownYears ?? 2,
    oncePerPerson: kernel.oncePerPerson ?? false,
    weight: kernel.weight ?? 1,
    ...(kernel.adaptiveContexts || variant?.adaptiveContexts
      ? {
          adaptiveContexts: [
            ...(kernel.adaptiveContexts ?? []),
            ...(variant?.adaptiveContexts ?? []),
          ],
        }
      : {}),
    ...(kernel.historicalBasis ? { historicalBasis: kernel.historicalBasis } : {}),
    ...(kernel.sourceIds ? { sourceIds: kernel.sourceIds } : {}),
  };
  const trace: CompositionTrace = {
    kernelId: kernel.id,
    kernelVersion: COMPOSITION_VERSION,
    contextId: context.id,
    milieuId: milieu.id,
    compiledSceneId: id,
    ...(variant ? { variantId: variant.id } : {}),
    outcomeCount: outcomes.length,
  };
  if (kernel.kind === 'task') {
    const task = kernel.task;
    if (!task) return {};
    const definition: TaskDefinition = {
      ...base,
      triggerMode: 'action',
      rate: 0,
      outcomes,
      task: { ...task } as TaskDefinition['task'],
    };
    return { task: definition, trace };
  }
  const scene: SceneDefinition = {
    ...base,
    ...(kernel.check ? { check: kernel.check } : {}),
    rate: Math.max(0, (kernel.baseRate ?? 0.12) * (variant?.rateMultiplier ?? 1)),
    outcomes,
  };
  return { scene, trace };
}

function signature(world: WorldState, target: WorldDate): string {
  const contexts = activeContexts(world, target).map((context) => context.id);
  const processes = Object.values(world.macro?.developments ?? {})
    .filter((development) => development.historical)
    .map(
      (development) => `${development.id}:${development.status}:${development.historical!.phase}`,
    )
    .sort();
  const legacies = Object.values(world.macro?.legacy ?? {})
    .filter((legacy) => legacy.status === 'active')
    .map((legacy) => `${legacy.id}:${legacy.kind}`)
    .sort();
  return `${world.id}|${contexts.join(',')}|${processes.join(',')}|${legacies.join(',')}`;
}

export function createCompositionSource(kernels: PlotKernel[]): CompositionSource {
  const cache = new Map<string, ComposedContent>();
  return {
    compile(world: WorldState, target: WorldDate): ComposedContent {
      const key = signature(world, target);
      const cached = cache.get(key);
      if (cached) return { ...cached, stats: { ...cached.stats, cacheHit: true } };

      const contexts = activeContexts(world, target).sort(
        (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
      );
      const bestContextCache = new Map<string, Set<string>>();
      const bestContextIdsFor = (kernel: PlotKernel, milieu: MilieuProfile): Set<string> => {
        const key = `${kernel.id}|${milieu.id}`;
        const cached = bestContextCache.get(key);
        if (cached) return cached;
        const byRegion = new Map<
          string,
          { context: ContextProfile; score: number; priority: number }
        >();
        for (const candidate of contexts) {
          if (!intersects(kernel.contexts, candidate.tags)) continue;
          if (!intersects(milieu.contextTags, candidate.tags)) continue;
          const score = contextMatchScore(kernel, candidate);
          const regions =
            candidate.regionIds && candidate.regionIds.length > 0
              ? candidate.regionIds
              : ['@default'];
          for (const region of regions) {
            const previous = byRegion.get(region);
            const priority = candidate.priority ?? 0;
            if (
              !previous ||
              score > previous.score ||
              (score === previous.score && priority > previous.priority)
            ) {
              byRegion.set(region, { context: candidate, score, priority });
            }
          }
        }
        const ids = new Set([...byRegion.values()].map((entry) => entry.context.id));
        bestContextCache.set(key, ids);
        return ids;
      };
      const scenes: SceneDefinition[] = [];
      const tasks: TaskDefinition[] = [];
      const trace: CompositionTrace[] = [];
      const errors: CompositionCompileError[] = [];
      let kernelsConsidered = 0;
      let skippedByContext = 0;
      let skippedByMilieu = 0;
      const activeMilieus = new Set<string>();

      for (const context of contexts) {
        const milieus = MILIEU_PROFILES.filter((milieu) =>
          intersects(milieu.contextTags, context.tags),
        );
        for (const milieu of milieus) {
          activeMilieus.add(milieu.id);
          for (const kernel of kernels) {
            kernelsConsidered += 1;
            if (!intersects(kernel.contexts, context.tags)) {
              skippedByContext += 1;
              continue;
            }
            if (!intersects(kernel.milieus, milieu.tags)) {
              skippedByMilieu += 1;
              continue;
            }
            if (!bestContextIdsFor(kernel, milieu).has(context.id)) {
              continue;
            }
            const result = compileKernel(kernel, context, milieu, world, errors);
            if (result.scene) scenes.push(result.scene);
            if (result.task) tasks.push(result.task);
            if (result.trace) trace.push(result.trace);
          }
        }
      }

      const content: ComposedContent = {
        scenes,
        tasks,
        trace,
        errors,
        stats: {
          activeContexts: contexts.length,
          activeMilieus: activeMilieus.size,
          kernelsConsidered,
          compiledScenes: scenes.length,
          compiledTasks: tasks.length,
          skippedByContext,
          skippedByMilieu,
          cacheHit: false,
        },
      };
      cache.set(key, content);
      if (cache.size > 32) cache.delete(cache.keys().next().value as string);
      return content;
    },
  };
}
