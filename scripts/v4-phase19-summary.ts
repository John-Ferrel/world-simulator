/**
 * Phase 19 natural-life summary.
 *
 * Reads committed dossiers and writes docs/v4/phase-19-playtests.json. It does
 * not run the simulator; it summarizes real committed facts.
 *
 *   pnpm v4:phase19-summary
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { KERNEL_LIBRARY } from '../packages/v4/content/kernels/index.js';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';

const packs = [
  'pack-collision-power-love',
  'pack-collision-family-war',
  'pack-collision-luck-craft',
  'pack-collision-elder-history',
];
const prefixes = ['pl19-', 'fw19-', 'lc19-', 'eh19-'];
const primarySeeds = ['phase19-a', 'phase19-b', 'phase19-c'];
const elderSeed = 'phase19-elder';
const mixedSeed = 'phase19-mixed';

const packForKernel = new Map<string, string>();
const packForState = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const kernel of pack.kernels ?? []) packForKernel.set(kernel.id, pack.id);
  for (const state of pack.states) packForState.set(state.id, pack.id);
}
const crossPackKernels = new Set(
  KERNEL_LIBRARY.filter((kernel) => {
    const ids = new Set<string>();
    for (const condition of kernel.conditions ?? []) {
      if (condition.kind === 'hasState' && condition.stateId) ids.add(condition.stateId);
    }
    return new Set([...ids].map((id) => packForState.get(id) ?? 'base')).size >= 2;
  }).map((kernel) => kernel.id),
);

function isNewAction(action: string): boolean {
  return prefixes.some((prefix) => action.startsWith(prefix));
}

function summarize(seed: string) {
  const report = JSON.parse(
    readFileSync(resolve(`docs/v4/phase-15-${seed}.json`), 'utf8'),
  ) as {
    seed: string;
    years: number;
    date: { year: number; month: number };
    events: number;
    persons: number;
    alive: number;
    critiques?: { metrics?: Record<string, number> };
    stateOpportunity?: Record<string, number>;
    activation?: {
      packActivation?: {
        pack: string;
        totalKernelEvents: number;
        kernelHits: Record<string, number>;
        stateAdds: Record<string, number>;
      }[];
      stateLifecycle?: Record<string, { adds: number; active: number; ended: number; ticks: number; reactions: number }>;
      crossPack?: { counts?: Record<string, number> };
    };
    lives?: { name: string; events?: { action: string; subjectId?: string; immediateText?: string }[] }[];
  };
  const packActivation = report.activation?.packActivation ?? [];
  const newPackEvents = packs.reduce(
    (sum, id) => sum + (packActivation.find((pack) => pack.pack === id)?.totalKernelEvents ?? 0),
    0,
  );
  const focal = (report.lives ?? []).flatMap((life) => life.events ?? []);
  const focalNew = focal.filter((event) => isNewAction(event.action));
  const focalCross = focalNew.filter((event) => crossPackKernels.has(event.action.split('::')[0]!));
  const newStates = Object.keys(report.activation?.stateLifecycle ?? {}).filter((id) =>
    prefixes.some((prefix) => id.startsWith(prefix)),
  );
  const observedStates = newStates.filter(
    (id) => (report.activation?.stateLifecycle?.[id]?.adds ?? 0) > 0,
  );
  const tickCounts: Record<string, number> = {};
  for (const life of report.lives ?? []) {
    for (const event of life.events ?? []) {
      if (event.action.startsWith('state_tick:')) {
        tickCounts[event.action] = (tickCounts[event.action] ?? 0) + 1;
      }
    }
  }
  const oddJobs = packActivation.find((pack) => pack.pack === 'pack-odd-jobs');
  const stateOpportunity = report.stateOpportunity ?? {};
  return {
    seed,
    years: report.years,
    end: report.date,
    events: report.events,
    persons: report.persons,
    alive: report.alive,
    distinctStates: report.critiques?.metrics?.distinctStateDefinitions,
    repeatRate: report.critiques?.metrics?.repeatRate,
    births: report.critiques?.metrics?.births,
    deaths: report.critiques?.metrics?.deaths,
    newPackEvents,
    newPackShare: Number((newPackEvents / report.events).toFixed(4)),
    focalEvents: focal.length,
    focalNewEvents: focalNew.length,
    focalShare: Number((focalNew.length / Math.max(1, focal.length)).toFixed(4)),
    focalCrossPackEvents: focalCross.length,
    focalCrossPackShare: Number((focalCross.length / Math.max(1, focalNew.length)).toFixed(4)),
    newStatesObserved: observedStates.length,
    newStatesTotal: newStates.length,
    stateAdds: Object.fromEntries(
      packs.flatMap((id) =>
        Object.entries(packActivation.find((pack) => pack.pack === id)?.stateAdds ?? {}),
      ),
    ),
    packEvents: Object.fromEntries(
      packs.map((id) => [
        id,
        packActivation.find((pack) => pack.pack === id)?.totalKernelEvents ?? 0,
      ]),
    ),
    stateOpportunity,
    oddJobs: {
      kernelEvents: oddJobs?.totalKernelEvents ?? 0,
      stateAdds: oddJobs?.stateAdds ?? {},
      topTickTexts: Object.entries(tickCounts)
        .filter(([action]) => action.startsWith('state_tick:oj18-odd-apprenticeship/'))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    },
    crossPackCounts: report.activation?.crossPack?.counts ?? {},
    topCrossPackKernels: Object.entries(
      focalCross.reduce<Record<string, number>>((counts, event) => {
        const kernel = event.action.split('::')[0]!;
        counts[kernel] = (counts[kernel] ?? 0) + 1;
        return counts;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
  };
}

const primary = primarySeeds.map(summarize);
const elder = summarize(elderSeed);
const mixed = summarize(mixedSeed);
const total = (key: keyof (typeof primary)[number]) =>
  primary.reduce((sum, seed) => sum + Number(seed[key] ?? 0), 0);
const aggregate = {
  events: total('events'),
  newPackEvents: total('newPackEvents'),
  newPackShare: Number((total('newPackEvents') / total('events')).toFixed(4)),
  focalEvents: total('focalEvents'),
  focalNewEvents: total('focalNewEvents'),
  focalShare: Number((total('focalNewEvents') / total('focalEvents')).toFixed(4)),
  focalCrossPackEvents: total('focalCrossPackEvents'),
  focalCrossPackShare: Number(
    (total('focalCrossPackEvents') / Math.max(1, total('focalNewEvents'))).toFixed(4),
  ),
  repeatRateMean: Number(
    (primary.reduce((sum, seed) => sum + Number(seed.repeatRate ?? 0), 0) / primary.length).toFixed(4),
  ),
  newStatesObserved: new Set(
    primary.flatMap((seed) =>
      Object.entries(seed.stateAdds ?? {})
        .filter(([, adds]) => adds > 0)
        .map(([id]) => id),
    ),
  ).size,
  newStatesTotal: 8,
};
const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  note: 'Primary A/B/C are natural 45-year seeds. Elder and mixed are cohort checks using existing 1912 persons as focal lives; they are not fabricated births.',
  primarySeeds: primary,
  elderCohort: elder,
  mixedCohort: mixed,
  aggregate,
  preBridge: JSON.parse(
    readFileSync(resolve('docs/v4/phase-19-pre-bridge.json'), 'utf8'),
  ).seeds,
  postBridgePreWeight: JSON.parse(
    readFileSync(resolve('docs/v4/phase-19-post-bridge-pre-weight.json'), 'utf8'),
  ).seeds,
  phase18Baseline: {
    focalShare: 0.0837,
    repeatRate: 0.2202,
    worldNewPackShare: 0.0965,
    focalKernelReach: '113/232',
  },
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-19-playtests.json', `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      aggregate,
      primary: primary.map((seed) => ({
        seed: seed.seed,
        events: seed.events,
        focalShare: seed.focalShare,
        repeatRate: seed.repeatRate,
        cross: seed.focalCrossPackEvents,
      })),
      elder: {
        seed: elder.seed,
        events: elder.events,
        focalShare: elder.focalShare,
        newStates: `${elder.newStatesObserved}/${elder.newStatesTotal}`,
        cross: elder.focalCrossPackEvents,
      },
      mixed: {
        seed: mixed.seed,
        events: mixed.events,
        focalShare: mixed.focalShare,
        cross: mixed.focalCrossPackEvents,
      },
    },
    null,
    2,
  ),
);
