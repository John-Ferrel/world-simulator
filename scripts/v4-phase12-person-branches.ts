/**
 * Phase 12 controlled person-branch experiment.
 *
 * Same kernel, same world, same scene definitions; only household cash differs.
 * The outcome policy selects the first conditional outcome so the experiment
 * observes the authored branch rather than a generic weighted draw. Settlement,
 * effects and EventFacts are produced by the real engine.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, Household, SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';

const kernelId = process.argv[2] ?? 'r1-work.market-stall-allotment';
const kernel = KERNEL_LIBRARY.find((entry) => entry.id === kernelId);
if (!kernel) {
  console.error(`unknown kernel ${kernelId}`);
  process.exit(2);
}

function worldWithCash(cash: number): WorldState {
  const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  for (const household of Object.values(world.households)) {
    household.cash = cash;
    (household as Household).food = 10;
  }
  world.date = { year: 1912, month: 1 };
  return world;
}

function forcedScenes(world: WorldState): SceneDefinition[] {
  const compiled = DEFAULT_COMPOSITION.compile(world, world.date);
  return compiled.scenes
    .filter((scene) => scene.id.startsWith(`${kernelId}::`))
    .map((scene) => ({
      ...structuredClone(scene),
      rate: 1,
      cooldownYears: 0,
      oncePerPerson: false,
    }));
}

function summarize(cash: number) {
  const world = worldWithCash(cash);
  const scenes = forcedScenes(world);
  let events: EventFact[] = [];
  if (scenes.length > 0) {
    const result = advanceV4Year(world, scenes, {
      economy: { enabled: false },
      eventRuntime: true,
      statisticalModel: false,
      agency: false,
      materializePopulation: false,
      maxOrdinaryEventsPerPerson: 1,
      outcomePolicy: ({ outcomes }) =>
        outcomes.find((outcome) => (outcome.conditions?.length ?? 0) > 0)?.id ??
        outcomes[0]?.id ??
        null,
    });
    events = result.events.filter((event) => event.action.startsWith(`${kernelId}::`));
  }
  const outcomes = new Map<string, number>();
  for (const event of events) {
    const outcomeId = event.action.split('/')[1] ?? event.action;
    outcomes.set(outcomeId, (outcomes.get(outcomeId) ?? 0) + 1);
  }
  return {
    householdCash: cash,
    compiledScenes: scenes.length,
    events: events.length,
    outcomes: [...outcomes.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([outcomeId, count]) => ({ outcomeId, count })),
    sample: events.slice(0, 3).map((event) => ({
      action: event.action,
      text: event.immediateText,
      effects: event.effects.map((effect) => ({
        type: effect.type,
        ...(effect.type === 'cash' ? { amount: effect.amount } : {}),
        ...(effect.type === 'role' ? { role: effect.role } : {}),
        ...(effect.type === 'flag' ? { flag: effect.flag } : {}),
      })),
    })),
  };
}

const output = {
  generatedAt: new Date().toISOString(),
  kernelId,
  title: kernel.title,
  branchConditions: kernel.outcomes
    .filter((outcome) => outcome.when)
    .map((outcome) => ({ outcomeId: outcome.id, when: outcome.when })),
  scenarios: [summarize(0), summarize(100)],
  note:
    'Outcome policy is a controlled probe, not a gameplay default. EventFacts and effects are real engine output.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-person-branches.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      kernelId,
      branchConditions: output.branchConditions,
      scenarios: output.scenarios.map((scenario) => ({
        householdCash: scenario.householdCash,
        compiledScenes: scenario.compiledScenes,
        events: scenario.events,
        outcomes: scenario.outcomes,
        sampleEffects: scenario.sample[0]?.effects ?? [],
      })),
    },
    null,
    2,
  ),
);
