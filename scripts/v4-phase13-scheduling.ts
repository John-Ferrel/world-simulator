/**
 * Phase 13 scheduling diagnosis.
 *
 * Counts where committed events actually come from and why scenes are blocked.
 * This is a read-only audit over the real engine; it does not change selection.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year, auditCandidatePools } from '../packages/v4/engine.js';
import type { EventFact, SceneDefinition, WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const BASE_SCENES: SceneDefinition[] = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

const years = Number(process.argv[2] ?? 20);
const maxOrdinary = Number(process.argv[3] ?? 4);
let world: WorldState = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
world.seed = 'phase13-scheduling';
const events: EventFact[] = [];
const blockedByScene = new Map<
  string,
  { base: number; composed: number; reasons: Map<string, number> }
>();
const yearly: unknown[] = [];
const schedulingTotals: any = {
  candidatePool: { base: 0, composed: 0 },
  ordinary: {
    draws: { base: 0, composed: 0 },
    ratePass: { base: 0, composed: 0 },
    preparedPass: { base: 0, composed: 0 },
    selected: { base: 0, composed: 0 },
  },
  resolved: { base: 0, composed: 0 },
  blocked: { base: 0, composed: 0 },
  paths: {} as Record<string, number>,
  blockedReasons: {} as Record<string, number>,
};
function addScheduling(value: any): void {
  if (!value) return;
  for (const key of ['candidatePool', 'resolved', 'blocked'] as const) {
    schedulingTotals[key].base += value[key]?.base ?? 0;
    schedulingTotals[key].composed += value[key]?.composed ?? 0;
  }
  for (const key of ['draws', 'ratePass', 'preparedPass', 'selected'] as const) {
    schedulingTotals.ordinary[key].base += value.ordinary?.[key]?.base ?? 0;
    schedulingTotals.ordinary[key].composed += value.ordinary?.[key]?.composed ?? 0;
  }
  for (const [key, count] of Object.entries(value.paths ?? {})) {
    schedulingTotals.paths[key] = (schedulingTotals.paths[key] ?? 0) + Number(count);
  }
  for (const [key, count] of Object.entries(value.blockedReasons ?? {})) {
    schedulingTotals.blockedReasons[key] =
      (schedulingTotals.blockedReasons[key] ?? 0) + Number(count);
  }
}

for (let year = 0; year < years; year += 1) {
  const result = advanceV4Year(world, BASE_SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    composition: DEFAULT_COMPOSITION,
    maxOrdinaryEventsPerPerson: maxOrdinary,
  });
  world = result.world;
  addScheduling(result.diagnostics.scheduling);
  events.push(...result.events);
  for (const scene of result.scenes) {
    if (scene.status !== 'blocked') continue;
    const composed = scene.sceneId.includes('::');
    const entry = blockedByScene.get(scene.sceneId) ?? {
      base: 0,
      composed: 0,
      reasons: new Map<string, number>(),
    };
    if (composed) entry.composed += 1;
    else entry.base += 1;
    const reason = scene.reason ?? 'unknown';
    const bucket = reason.split(':')[0]!;
    entry.reasons.set(bucket, (entry.reasons.get(bucket) ?? 0) + 1);
    blockedByScene.set(scene.sceneId, entry);
  }
  yearly.push({
    year: result.diagnostics.to.year,
    events: result.events.length,
    blocked: result.diagnostics.scenesBlocked,
  });
}

const compiled = DEFAULT_COMPOSITION.compile(world, world.date);
const definitionMeta = new Map<
  string,
  { source: 'base' | 'composed'; triggerMode: string; tags: string[] }
>();
for (const definition of BASE_SCENES) {
  definitionMeta.set(definition.id, {
    source: 'base',
    triggerMode: definition.triggerMode ?? 'statistical',
    tags: definition.tags ?? [],
  });
}
for (const definition of compiled.scenes) {
  definitionMeta.set(definition.id, {
    source: 'composed',
    triggerMode: definition.triggerMode ?? 'statistical',
    tags: definition.tags ?? [],
  });
}
for (const definition of compiled.tasks) {
  definitionMeta.set(definition.id, {
    source: 'composed',
    triggerMode: 'action',
    tags: definition.tags ?? [],
  });
}
for (const task of ALL_TASKS) {
  if (!definitionMeta.has(task.id)) {
    definitionMeta.set(task.id, { source: 'base', triggerMode: 'action', tags: task.tags ?? [] });
  }
}
const pathCounts = new Map<string, number>();
const triggerCounts = new Map<string, number>();
const taskKernelIds = new Set(
  KERNEL_LIBRARY.filter((kernel) => kernel.kind === 'task').map((kernel) => kernel.id),
);
const category = (event: EventFact): string => {
  if (event.action === 'birth') return 'birth';
  if (event.action.startsWith('statistical_')) return 'statistical';
  if (event.action.startsWith('agency:')) return 'agency_plan';
  if (event.action.startsWith('initiative:')) return 'bottom_up_initiative';
  const scenePart = event.action.split('/')[0] ?? event.action;
  if (scenePart.includes('::')) {
    const kernelId = scenePart.split('::')[0]!;
    return taskKernelIds.has(kernelId) ? 'composed_task' : 'composed_event';
  }
  if (event.action.includes('/')) return 'base_scene';
  return 'other';
};

const categories = new Map<string, number>();
const composedKernels = new Map<string, number>();
for (const event of events) {
  const key = category(event);
  categories.set(key, (categories.get(key) ?? 0) + 1);
  const sceneId = event.action.split('/')[0] ?? event.action;
  const meta = definitionMeta.get(sceneId);
  if (meta) {
    const pathKey = `${meta.source}|${key}`;
    pathCounts.set(pathKey, (pathCounts.get(pathKey) ?? 0) + 1);
    const triggerKey = `${meta.source}|${meta.triggerMode}`;
    triggerCounts.set(triggerKey, (triggerCounts.get(triggerKey) ?? 0) + 1);
  }
  if (key === 'composed_event' || key === 'composed_task') {
    const kernel = event.action.split('::')[0]!;
    composedKernels.set(kernel, (composedKernels.get(kernel) ?? 0) + 1);
  }
}

const blocked = [...blockedByScene.entries()]
  .map(([sceneId, entry]) => ({
    sceneId,
    base: entry.base,
    composed: entry.composed,
    reasons: Object.fromEntries([...entry.reasons.entries()].sort((a, b) => b[1] - a[1])),
  }))
  .sort(
    (a, b) => b.base + b.composed - (a.base + a.composed) || a.sceneId.localeCompare(b.sceneId),
  );

const living = Object.values(world.persons).filter((person) => !person.died);
const focalSamples = living
  .filter((person) => world.date.year - person.born.year >= 18)
  .sort((a, b) => a.id.localeCompare(b.id))
  .slice(0, 8)
  .map((person) => {
    const audit = auditCandidatePools(
      world,
      person.id,
      world.date,
      BASE_SCENES,
      ALL_TASKS,
      DEFAULT_COMPOSITION,
    );
    return {
      personId: person.id,
      name: person.name,
      age: world.date.year - person.born.year,
      composedScenes: audit?.events.filter((event) => event.id.includes('::')).length ?? 0,
      baseScenes: audit?.events.filter((event) => !event.id.includes('::')).length ?? 0,
      composedTasks: audit?.tasks.filter((task) => task.id.includes('::')).length ?? 0,
      baseTasks: audit?.tasks.filter((task) => !task.id.includes('::')).length ?? 0,
    };
  });

const report = {
  generatedAt: new Date().toISOString(),
  years,
  maxOrdinaryEventsPerPerson: maxOrdinary,
  persons: Object.keys(world.persons).length,
  alive: living.length,
  events: events.length,
  categories: Object.fromEntries([...categories.entries()].sort((a, b) => b[1] - a[1])),
  pathCounts: Object.fromEntries([...pathCounts.entries()].sort((a, b) => b[1] - a[1])),
  triggerCounts: Object.fromEntries([...triggerCounts.entries()].sort((a, b) => b[1] - a[1])),
  composedKernelsTriggered: composedKernels.size,
  topComposedKernels: [...composedKernels.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 40),
  blockedTop: blocked.slice(0, 40),
  schedulingTotals,
  blockedTotals: blocked.reduce(
    (sum, entry) => ({
      base: sum.base + entry.base,
      composed: sum.composed + entry.composed,
    }),
    { base: 0, composed: 0 },
  ),
  focalSamples,
  monthlyEventYears: yearly,
  limitation:
    'This measures one seed world and one ordinary cap. It is a scheduling diagnosis, not a content-quality verdict.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-13-scheduling.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      years,
      persons: report.persons,
      alive: report.alive,
      events: report.events,
      categories: report.categories,
      composedKernelsTriggered: report.composedKernelsTriggered,
      schedulingTotals: report.schedulingTotals,
      blockedTotals: report.blockedTotals,
      topBlocked: blocked.slice(0, 12),
      focalSamples,
    },
    null,
    2,
  ),
);
