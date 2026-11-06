import { CORE_STATES } from './core-states.js';
import { WISH_STATES } from './wish-states.js';
import { GENERATED_STATES, GENERATED_STATE_PACKS } from './generated/index.js';
import type { StateDefinition } from '../../state/types.js';
import type { StatePack } from '../../state/registry.js';

/** All authored Phase 15 mechanism states loaded by the default game. */
export const ALL_STATES: StateDefinition[] = [...CORE_STATES, ...WISH_STATES, ...GENERATED_STATES];

export const PHASE15_STATE_PACKS: StatePack[] = [
  ...GENERATED_STATE_PACKS,
  {
    id: 'phase15-core-states',
    version: 1,
    title: 'Phase 15 core mechanism states',
    description:
      'Education, apprenticeship, work, legal, health, family, performance and organisation states that consume the existing scene grammar.',
    author: 'phase15-content-factory/mechanics-architect',
    generatedAt: '2026-11-05',
    rationale:
      'Baseline state layer: every state uses the existing typed conditions/effects and is exercised by tests and lives.',
    states: CORE_STATES,
  },
  {
    id: 'phase15-wish-archetypes',
    version: 1,
    title: 'Wish archetype states',
    description:
      'Bounded lifelong wish states compiled from player text. They shape attention and opportunities without guaranteeing outcomes.',
    author: 'phase15-content-factory/wish-designer',
    generatedAt: '2026-11-05',
    rationale: 'Free wishes need persistent mechanics without becoming arbitrary superpowers.',
    states: WISH_STATES,
  },
];

export { CORE_STATES, WISH_STATES, GENERATED_STATES };
export { CORE_STATE_IDS } from './core-states.js';
export { WISH_STATE_IDS } from './wish-states.js';
export { GENERATED_STATE_PACKS, GENERATED_STATE_KERNELS } from './generated/index.js';
