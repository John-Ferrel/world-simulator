/**
 * Phase 20 natural-life summary.
 *
 * Reads committed dossiers and writes docs/v4/phase-20-playtests.json.
 * Adaptive storylets are counted by kernel.adaptiveContexts; the audit script
 * gives a deeper breakdown.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';

const phase20Packs = ['pack-adaptive-everyday', 'pack-living-consequences'];
const phase20Prefixes = ['ad20-', 'pc20-'];
const adaptiveKernels = new Set(
  KERNEL_LIBRARY.filter((kernel) => (kernel.adaptiveContexts?.length ?? 0) > 0).map(
    (kernel) => kernel.id,
  ),
);
const packForKernel = new Map<string, string>();
const packForState = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) packForKernel.set(kernel.id, pack.id);
  for (const state of pack.states) packForState.set(state.id, pack.id);
}
const primarySeeds = ['phase20-a', 'phase20-b', 'phase20-c'];
const cohortSeeds = ['phase20-elder', 'phase20-mixed'];

function summarize(seed: string) {
  const report = JSON.parse(readFileSync(resolve(`docs/v4/phase-15-${seed}.json`), 'utf8')) as {
    seed: string;
    years: number;
    events: number;
    persons: number;
    alive: number;
    critiques?: { metrics?: Record<string, number> };
    stateOpportunity?: Record<string, number>;
    activation?: {
      packActivation?: {
        pack: string;
        totalKernelEvents: number;
        stateAdds: Record<string, number>;
      }[];
      stateLifecycle?: Record<string, { adds: number; ticks: number; reactions: number }>;
    };
    lives?: { name: string; events?: { action: string; immediateText?: string }[] }[];
  };
  const activation = report.activation?.packActivation ?? [];
  const focal = (report.lives ?? []).flatMap((life) => life.events ?? []);
  const focalPhase20 = focal.filter((event) =>
    phase20Prefixes.some((prefix) => event.action.startsWith(prefix)),
  );
  const focalAdaptive = focal.filter((event) => adaptiveKernels.has(event.action.split('::')[0]!));
  const newPackEvents = phase20Packs.reduce(
    (sum, pack) => sum + (activation.find((entry) => entry.pack === pack)?.totalKernelEvents ?? 0),
    0,
  );
  const stateAdds = Object.fromEntries(
    phase20Packs.flatMap((pack) =>
      Object.entries(activation.find((entry) => entry.pack === pack)?.stateAdds ?? {}),
    ),
  );
  const newStates = Object.keys(stateAdds);
  return {
    seed,
    years: report.years,
    events: report.events,
    persons: report.persons,
    alive: report.alive,
    distinctStates: report.critiques?.metrics?.distinctStateDefinitions,
    repeatRate: report.critiques?.metrics?.repeatRate,
    newPackEvents,
    newPackShare: Number((newPackEvents / report.events).toFixed(4)),
    focalEvents: focal.length,
    focalNewEvents: focalPhase20.length,
    focalNewShare: Number((focalPhase20.length / Math.max(1, focal.length)).toFixed(4)),
    focalAdaptiveEvents: focalAdaptive.length,
    focalAdaptiveShare: Number((focalAdaptive.length / Math.max(1, focal.length)).toFixed(4)),
    stateAdds,
    newStatesObserved: newStates.filter((id) => (stateAdds[id] ?? 0) > 0).length,
    stateOpportunity: report.stateOpportunity ?? {},
    topAdaptiveKernels: Object.entries(
      focalAdaptive.reduce<Record<string, number>>((counts, event) => {
        const kernel = event.action.split('::')[0]!;
        counts[kernel] = (counts[kernel] ?? 0) + 1;
        return counts;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12),
  };
}

const primary = primarySeeds.map(summarize);
const cohorts = cohortSeeds.map(summarize);
const total = (key: keyof (typeof primary)[number]) =>
  primary.reduce((sum, seed) => sum + Number(seed[key] ?? 0), 0);
const aggregate = {
  events: total('events'),
  newPackEvents: total('newPackEvents'),
  newPackShare: Number((total('newPackEvents') / total('events')).toFixed(4)),
  focalEvents: total('focalEvents'),
  focalNewEvents: total('focalNewEvents'),
  focalNewShare: Number((total('focalNewEvents') / total('focalEvents')).toFixed(4)),
  focalAdaptiveEvents: total('focalAdaptiveEvents'),
  focalAdaptiveShare: Number((total('focalAdaptiveEvents') / total('focalEvents')).toFixed(4)),
  repeatRateMean: Number(
    (primary.reduce((sum, seed) => sum + Number(seed.repeatRate ?? 0), 0) / primary.length).toFixed(
      4,
    ),
  ),
  newStatesObserved: new Set(
    primary.flatMap((seed) =>
      Object.entries(seed.stateAdds ?? {})
        .filter(([, adds]) => adds > 0)
        .map(([id]) => id),
    ),
  ).size,
  newStatesTotal: 4,
};
const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Primary A/B/C are natural 45-year seeds. Elder and mixed cohorts use existing 1912 persons as focal lives; they are not fabricated births.',
  primarySeeds: primary,
  cohortSeeds: cohorts,
  aggregate,
  phase19Baseline: {
    focalNewShare: 0.0014,
    repeatRateMean: 0.2104,
    adaptiveKernels: 0,
  },
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-20-playtests.json', `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      aggregate,
      primary: primary.map((seed) => ({
        seed: seed.seed,
        events: seed.events,
        newPackEvents: seed.newPackEvents,
        focalNew: seed.focalNewEvents,
        focalAdaptive: seed.focalAdaptiveEvents,
        repeatRate: seed.repeatRate,
      })),
      cohorts: cohorts.map((seed) => ({
        seed: seed.seed,
        events: seed.events,
        newPackEvents: seed.newPackEvents,
        focalNew: seed.focalNewEvents,
        focalAdaptive: seed.focalAdaptiveEvents,
      })),
    },
    null,
    2,
  ),
);
