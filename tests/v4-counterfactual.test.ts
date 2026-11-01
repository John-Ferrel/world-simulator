import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import {
  applyMacroProposal,
  defaultMacroState,
  materializeDevelopments,
  validateMacroProposal,
  type MacroProposal,
} from '../packages/v4/macro.js';
import type { EventFact, WorldState } from '../packages/v4/domain.js';

const date = { year: 1917, month: 1 };
const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
];

function seedWorld(): WorldState {
  const world = structuredClone(VIENNA_1912_SEED);
  world.date = date;
  world.macro = defaultMacroState(world, date);
  return world;
}

function proposal(): MacroProposal {
  return {
    version: 1,
    regionId: 'region-lower-austria',
    effectiveFrom: date,
    durationMonths: 36,
    summary: 'a new anti-war organization appears',
    confidence: 0.7,
    maintainStatus: false,
    developments: [
      {
        type: 'social_change',
        description: 'an anti-war committee forms in the tenements',
        severity: 0.7,
        organization: { name: 'Anti-War Committee', kind: 'other' },
        eventFamilyIds: ['vienna-social-movement'],
      },
    ],
    parameterChanges: {},
    eventPoolChanges: [],
  };
}

function run(world: WorldState): { world: WorldState; events: EventFact[] } {
  let current = world;
  const events: EventFact[] = [];
  for (let index = 0; index < 6; index += 1) {
    const result = advanceV4Year(current, scenes, {
      eventRuntime: true,
      economy: { enabled: false },
      statisticalModel: false,
      maxOrdinaryEventsPerPerson: 4,
    });
    current = result.world;
    events.push(...result.events);
  }
  return { world: current, events };
}

describe('Phase 4 counterfactual development', () => {
  it('changes the same 1917 world only when the organization development is applied', () => {
    const control = seedWorld();
    const treatment = seedWorld();
    const validated = validateMacroProposal(proposal(), {
      world: treatment,
      state: treatment.macro!,
      knownFamilies: new Set(['vienna-social-movement']),
    });
    let state = applyMacroProposal(
      treatment.macro!,
      validated,
      date,
      'test-model',
      'counterfactual',
    );
    state = materializeDevelopments(treatment, state, validated, 'counterfactual', date);
    treatment.macro = state;
    const org = Object.values(state.developments ?? {})[0]?.organizationId;
    expect(org).toBeDefined();

    const controlRun = run(control);
    const treatmentRun = run(treatment);
    const controlDevelopmentEvents = controlRun.events.filter((event) =>
      event.action.startsWith('vienna-social-movement.'),
    );
    const treatmentDevelopmentEvents = treatmentRun.events.filter((event) =>
      event.action.startsWith('vienna-social-movement.'),
    );
    expect(controlDevelopmentEvents).toHaveLength(0);
    expect(treatmentDevelopmentEvents.length).toBeGreaterThan(0);
    expect(treatmentRun.world.organizations[org!]?.memberIds.length).toBeGreaterThan(0);
    expect(
      treatmentDevelopmentEvents.some((event) =>
        event.effects.some((effect) => effect.type === 'organization_membership'),
      ),
    ).toBe(true);
  });
});
