/**
 * Summarize Phase 18 pack activation and focal share from a life dossier.
 *
 *   tsx scripts/v4-phase18-coverage.ts docs/v4/phase-15-phase18-final-a.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const input = process.argv[2] ?? 'docs/v4/phase-15-phase18-final-a.json';
const file = resolve(input);
const report = JSON.parse(readFileSync(file, 'utf8')) as {
  seed: string;
  years: number;
  events: number;
  persons: number;
  stateEvents: number;
  stateTicks: number;
  stateReactions: number;
  stateTransitions: number;
  stateOpportunity: Record<string, number>;
  critiques?: { metrics?: { distinctStateDefinitions?: number; repeatRate?: number; births?: number; deaths?: number } };
  activation?: {
    packActivation?: {
      pack: string;
      totalKernelEvents: number;
      stateAdds: Record<string, number>;
      kernelHits: Record<string, number>;
    }[];
    stateLifecycle?: Record<string, { adds: number; active: number; ended: number; ticks: number; reactions: number }>;
    crossPack?: { counts: Record<string, number>; samples?: unknown[] };
  };
  lives?: { name: string; events?: { action: string }[] }[];
};

const prefixes = ['iw18-', 'yf18-', 'em18-', 'oj18-', 'bc18-', 'df18-', 'hs18-', 'ld18-', 'sm18-', 'ml18-'];
const isPhase18 = (value: string): boolean => prefixes.some((prefix) => value.startsWith(prefix));
const packs = report.activation?.packActivation ?? [];
const phase18PackIds = new Set([
  'pack-infant-wonder',
  'pack-youth-fire',
  'pack-elder-memory',
  'pack-odd-jobs',
  'pack-black-comedy',
  'pack-dark-fantasy',
  'pack-history-street',
  'pack-love-desire',
  'pack-small-mysteries',
  'pack-money-luck',
]);
const p18Packs = packs.filter((pack) => phase18PackIds.has(pack.pack));
const focalEvents = (report.lives ?? []).flatMap((life) => life.events ?? []);
const focal18 = focalEvents.filter((event) => isPhase18(event.action));
const packKernelEvents = packs.reduce((sum, pack) => sum + pack.totalKernelEvents, 0);
const p18KernelEvents = p18Packs.reduce((sum, pack) => sum + pack.totalKernelEvents, 0);
const newStateIds = new Set(
  Object.entries(report.activation?.stateLifecycle ?? {})
    .filter(([id]) => prefixes.some((prefix) => id.startsWith(prefix)))
    .map(([id]) => id),
);
const lifecycle = Object.entries(report.activation?.stateLifecycle ?? {})
  .filter(([id]) => newStateIds.has(id))
  .map(([id, data]) => ({ state: id, ...data }));
const summary = {
  source: input,
  seed: report.seed,
  years: report.years,
  events: report.events,
  persons: report.persons,
  stateEvents: report.stateEvents,
  stateTicks: report.stateTicks,
  stateReactions: report.stateReactions,
  stateTransitions: report.stateTransitions,
  distinctStates: report.critiques?.metrics?.distinctStateDefinitions,
  repeatRate: report.critiques?.metrics?.repeatRate,
  births: report.critiques?.metrics?.births,
  deaths: report.critiques?.metrics?.deaths,
  stateOpportunity: report.stateOpportunity,
  phase18: {
    packs: p18Packs.map((pack) => ({
      pack: pack.pack,
      kernelEvents: pack.totalKernelEvents,
      stateAdds: pack.stateAdds,
      topKernels: Object.entries(pack.kernelHits)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    })),
    kernelEvents: p18KernelEvents,
    allKernelEvents: packKernelEvents,
    kernelEventShare: report.events > 0 ? p18KernelEvents / report.events : 0,
    focalEvents: focalEvents.length,
    focalPhase18Events: focal18.length,
    focalPhase18Share: focalEvents.length > 0 ? focal18.length / focalEvents.length : 0,
    states: lifecycle,
    observedStates: lifecycle.filter((entry) => entry.adds > 0).length,
    crossPack: report.activation?.crossPack?.counts ?? {},
  },
};
writeFileSync('docs/v4/phase-18-coverage.json', `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
