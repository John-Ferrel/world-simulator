import type { PlotKernel } from '../composition/types.js';
import { indexStateDefinitions, type StateDefinitionIndex } from './runtime.js';
import {
  validateStateLibrary,
  validateStateDefinition,
  type StateDefinition,
  type StateLibraryValidation,
} from './types.js';

/**
 * A versioned unit of generated/authored mechanism content. The runtime never
 * reads a model's raw response; it only sees validated StateDefinition objects
 * and their provenance.
 */
export type StatePack = {
  id: string;
  version: number;
  title: string;
  description: string;
  /** Author role/agent and optional model, never a world fact. */
  author: string;
  model?: string;
  generatedAt?: string;
  sourceBriefId?: string;
  states: StateDefinition[];
  /** Kernels that consume the states; compiled by the existing composer. */
  kernels?: PlotKernel[];
  /** Why this pack exists and which gap it closes. */
  rationale?: string;
  sourceIds?: string[];
  /** Optional library metadata for authors and the generated catalog. */
  themes?: string[];
  era?: string;
  tone?: string[];
  scope?: string[];
  rarity?: 'common' | 'uncommon' | 'rare' | 'exceptional';
  contentWarnings?: string[];
};

export type StatePackValidation = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  hash: string;
  stateCount: number;
  kernelCount: number;
};

export type RegisteredStatePack = {
  pack: StatePack;
  hash: string;
  status: 'validated' | 'published' | 'rejected';
  registeredAt: string;
};

export type MechanicExtensionRequest = {
  id: string;
  requestedBy: string;
  /** The concept that cannot be expressed. */
  need: string;
  /** Concrete examples; not code. */
  examples: string[];
  /** How often it should occur. */
  frequency?: string;
  /** What the content does if the extension is refused. */
  fallback: string;
  status: 'open' | 'accepted' | 'rejected' | 'deferred';
  decision?: string;
};

export type StateRegistry = {
  packs: Record<string, RegisteredStatePack>;
  /** Deterministically sorted published definitions. */
  definitions: StateDefinition[];
  index: StateDefinitionIndex;
  extensionRequests: MechanicExtensionRequest[];
};

export function statePackHash(pack: StatePack): string {
  const value = JSON.stringify({
    id: pack.id,
    version: pack.version,
    states: pack.states,
    kernels: pack.kernels ?? [],
  });
  let h1 = 2166136261;
  let h2 = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    h1 = Math.imul(h1 ^ code, 16777619) >>> 0;
    h2 = Math.imul(h2 ^ (code + index), 16777619) >>> 0;
  }
  return `${h1.toString(16).padStart(8, '0')}${h2.toString(16).padStart(8, '0')}`;
}

export function validateStatePack(
  pack: StatePack,
  baseStateIds: Set<string> = new Set(),
): StatePackValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!pack || typeof pack !== 'object') {
    return {
      ok: false,
      errors: ['pack is not an object'],
      warnings,
      hash: '',
      stateCount: 0,
      kernelCount: 0,
    };
  }
  if (!pack.id || !/^[a-z0-9][a-z0-9._-]{2,119}$/.test(pack.id))
    errors.push('pack id must be a stable slug');
  if (!Number.isInteger(pack.version) || pack.version < 1) errors.push('pack version must be >= 1');
  if (!pack.title) errors.push('pack title missing');
  if (!pack.author) errors.push('pack author missing');
  if (!pack.description) errors.push('pack description missing');
  if (!Array.isArray(pack.states) || pack.states.length === 0)
    errors.push('pack has no state definitions');
  const library = validateStateLibrary(pack.states ?? [], baseStateIds);
  errors.push(...library.errors);
  warnings.push(...library.warnings);
  for (const state of pack.states ?? []) {
    if (state.provenance?.kind === 'generated' && !state.provenance.model) {
      warnings.push(`${state.id}: generated state has no model provenance`);
    }
  }
  for (const kernel of pack.kernels ?? []) {
    if (!kernel.id || !Array.isArray(kernel.outcomes) || kernel.outcomes.length === 0)
      errors.push(`kernel ${kernel.id ?? '?'} has no outcomes`);
    for (const outcome of kernel.outcomes ?? []) {
      for (const effect of outcome.effects) {
        if (
          effect.type === 'state_add' &&
          !pack.states.some((state) => state.id === effect.stateId) &&
          !baseStateIds.has(effect.stateId)
        ) {
          errors.push(
            `${kernel.id}/${outcome.id}: state_add ${effect.stateId} is not in this pack or the base library`,
          );
        }
      }
    }
  }
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    hash: statePackHash(pack),
    stateCount: pack.states?.length ?? 0,
    kernelCount: pack.kernels?.length ?? 0,
  };
}

export function createStateRegistry(packs: StatePack[] = []): StateRegistry {
  const registry: StateRegistry = {
    packs: {},
    definitions: [],
    index: indexStateDefinitions([]),
    extensionRequests: [],
  };
  for (const pack of packs) registerStatePack(registry, pack);
  return registry;
}

/**
 * Register a validated pack. A rejected pack is retained for audit but its
 * definitions never reach the runtime. Duplicate ids across packs are an error,
 * except an exact same-version republish, which is idempotent.
 */
export function registerStatePack(
  registry: StateRegistry,
  pack: StatePack,
): { ok: boolean; validation: StatePackValidation } {
  const validation = validateStatePack(pack);
  const existing = registry.packs[pack.id];
  if (!validation.ok) {
    registry.packs[pack.id] = {
      pack,
      hash: validation.hash,
      status: 'rejected',
      registeredAt: new Date().toISOString(),
    };
    return { ok: false, validation };
  }
  if (existing && existing.hash === validation.hash) {
    return { ok: true, validation };
  }
  if (existing && existing.pack.version >= pack.version) {
    return {
      ok: false,
      validation: {
        ...validation,
        ok: false,
        errors: [
          ...validation.errors,
          `pack ${pack.id} version ${pack.version} is not newer than ${existing.pack.version}`,
        ],
      },
    };
  }
  registry.packs[pack.id] = {
    pack,
    hash: validation.hash,
    status: 'published',
    registeredAt: new Date().toISOString(),
  };
  rebuildRegistryDefinitions(registry);
  return { ok: true, validation };
}

function rebuildRegistryDefinitions(registry: StateRegistry): void {
  const byId = new Map<string, StateDefinition>();
  for (const entry of Object.values(registry.packs)) {
    if (entry.status !== 'published') continue;
    for (const state of entry.pack.states) byId.set(state.id, state);
  }
  registry.definitions = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  registry.index = indexStateDefinitions(registry.definitions);
}

export function addExtensionRequest(
  registry: StateRegistry,
  request: MechanicExtensionRequest,
): void {
  if (!registry.extensionRequests.some((existing) => existing.id === request.id)) {
    registry.extensionRequests.push(request);
  }
}

/** Combine packs into the flat definition array the engine accepts. */
export function stateDefinitionsFromPacks(packs: StatePack[]): StateDefinition[] {
  const registry = createStateRegistry(packs);
  return registry.definitions;
}

export function validateSingleState(candidate: StateDefinition): StateLibraryValidation {
  const errors = validateStateDefinition(candidate);
  return {
    errors,
    warnings: errors.length === 0 ? [] : [],
  };
}
