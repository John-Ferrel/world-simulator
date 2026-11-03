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

function intersects(left: string[] | undefined, right: string[] | undefined): boolean {
  if (!left || left.length === 0 || !right || right.length === 0) return true;
  return left.some((value) => right.includes(value));
}

function variantMatches(
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

function compileOutcomes(
  outcomes: KernelOutcome[],
  context: ContextProfile,
  milieu: MilieuProfile,
): SceneOutcome[] {
  const result: SceneOutcome[] = [];
  for (const outcome of outcomes) {
    const effects = outcome.effects
      .map((effect) => resolveEffect(effect, context))
      .filter((effect): effect is EventEffect => Boolean(effect));
    if (effects.length === 0) continue;
    result.push({
      id: outcome.id,
      weight: outcome.weight,
      immediateText: resolveText(outcome.text, context, milieu),
      effects,
      ...(outcome.significance !== undefined ? { significance: outcome.significance } : {}),
    });
  }
  return result;
}

function compileKernel(
  kernel: PlotKernel,
  context: ContextProfile,
  milieu: MilieuProfile,
  world: WorldState,
): { scene?: SceneDefinition; task?: TaskDefinition; trace?: CompositionTrace } {
  if (!intersects(kernel.contexts, context.tags)) return {};
  if (!intersects(kernel.milieus, milieu.tags)) return {};
  const variant: KernelVariant | undefined = kernel.variants?.find((entry) =>
    variantMatches(entry.when, world, context, milieu),
  );
  const outcomes = compileOutcomes(variant?.outcomes ?? kernel.outcomes, context, milieu);
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
    subjectProvenance: [
      'birth',
      'initial',
      'materialized_population',
      'historical_activation',
    ] as SceneDefinition['subjectProvenance'],
    cooldownYears: kernel.cooldownYears ?? 2,
    weight: 1,
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
    rate: Math.max(0, (kernel.baseRate ?? 0.08) * (variant?.rateMultiplier ?? 1)),
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
  return `${world.id}|${target.year}|${contexts.join(',')}|${processes.join(',')}|${legacies.join(',')}`;
}

const cache = new Map<string, ComposedContent>();

export function createCompositionSource(kernels: PlotKernel[]): CompositionSource {
  return {
    compile(world: WorldState, target: WorldDate): ComposedContent {
      const key = signature(world, target);
      const cached = cache.get(key);
      if (cached) return { ...cached, stats: { ...cached.stats, cacheHit: true } };

      const contexts = activeContexts(world, target).sort(
        (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
      );
      const scenes: SceneDefinition[] = [];
      const tasks: TaskDefinition[] = [];
      const trace: CompositionTrace[] = [];
      let kernelsConsidered = 0;
      let skippedByContext = 0;
      let skippedByMilieu = 0;
      const activeMilieus = new Set<string>();
      const chosen = new Set<string>();

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
            const precedenceKey = `${kernel.id}|${milieu.id}`;
            if (chosen.has(precedenceKey)) continue;
            const result = compileKernel(kernel, context, milieu, world);
            if (result.scene || result.task) chosen.add(precedenceKey);
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
