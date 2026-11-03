import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PHASE9_EVENT_SCENES, PHASE9_TASKS } from '../packages/v4/content/generated/index.js';
import { stageForAge } from '../packages/v4/domain.js';
import type { GeneratedPack } from '../packages/v4/generated.js';

const dir = resolve('packages/v4/content/generated');
const files = readdirSync(dir)
  .filter((file) => file.startsWith('p9-') && file.endsWith('.json'))
  .sort();
const packs = files.map(
  (file) => JSON.parse(readFileSync(resolve(dir, file), 'utf8')) as GeneratedPack,
);
const merged = JSON.parse(readFileSync(resolve('docs/v4/phase-9-content-batch.json'), 'utf8')) as {
  totals: Record<string, number>;
};

const stageRange: Record<string, [number, number]> = {
  infancy: [0, 2],
  childhood: [3, 11],
  adolescence: [12, 17],
  adulthood: [18, 59],
  elderhood: [60, 200],
};

const builtin = new Set([
  'subject',
  'place',
  'residence',
  'school',
  'workplace',
  'age',
  'year',
  'household',
  'child',
]);

function tokens(text: string): string[] {
  return [...text.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)].map((match) => match[1]!);
}

const effectCounts: Record<string, number> = {};
const conditionCounts: Record<string, number> = {};
const roleCounts: Record<string, number> = {};
const unresolved: { pack: string; node: string; outcome: string; token: string }[] = [];
const titleCounts = new Map<string, number>();
const outcomeTextCounts = new Map<string, number>();
const taskStageCounts: Record<string, number> = {};
const taskDomainCounts: Record<string, number> = {};
const eventStageCounts: Record<string, number> = {};
const effectiveWindows: { min: number; max: number; clippedMin: number; clippedMax: number }[] = [];

for (const pack of packs) {
  for (const node of pack.nodes) {
    const roles = new Set(node.roles.map((role) => role.key));
    titleCounts.set(node.title, (titleCounts.get(node.title) ?? 0) + 1);
    const [stageMin, stageMax] = stageRange[pack.stage]!;
    const effectiveMin = Math.max(pack.ageWindow.min, stageMin);
    const effectiveMax = Math.min(pack.ageWindow.max, stageMax);
    effectiveWindows.push({
      min: pack.ageWindow.min,
      max: pack.ageWindow.max,
      clippedMin: effectiveMin,
      clippedMax: effectiveMax,
    });
    for (const role of node.roles) {
      roleCounts[role.kind] = (roleCounts[role.kind] ?? 0) + 1;
    }
    for (const condition of [...(pack.conditions ?? []), ...(node.conditions ?? [])]) {
      conditionCounts[condition.kind] = (conditionCounts[condition.kind] ?? 0) + 1;
    }
    for (const outcome of node.outcomes) {
      outcomeTextCounts.set(
        outcome.text.replace(/\s+/g, ''),
        (outcomeTextCounts.get(outcome.text.replace(/\s+/g, '')) ?? 0) + 1,
      );
      for (const effect of outcome.effects) {
        effectCounts[effect.type] = (effectCounts[effect.type] ?? 0) + 1;
      }
      for (const token of tokens(outcome.text)) {
        if (!builtin.has(token) && !roles.has(token)) {
          unresolved.push({ pack: pack.id, node: node.id, outcome: outcome.id, token });
        }
      }
      for (const variant of outcome.narration ?? []) {
        for (const token of tokens(variant.text)) {
          if (!builtin.has(token) && !roles.has(token)) {
            unresolved.push({
              pack: pack.id,
              node: node.id,
              outcome: outcome.id,
              token,
            });
          }
        }
      }
    }
  }
  if (pack.kind === 'task') {
    taskStageCounts[pack.stage] = (taskStageCounts[pack.stage] ?? 0) + pack.nodes.length;
    for (const node of pack.nodes) {
      const domain = node.task?.domain ?? pack.task?.domain;
      if (domain) taskDomainCounts[domain] = (taskDomainCounts[domain] ?? 0) + 1;
    }
  } else {
    eventStageCounts[pack.stage] = (eventStageCounts[pack.stage] ?? 0) + pack.nodes.length;
  }
}

const totalNodes = packs.reduce((sum, pack) => sum + pack.nodes.length, 0);
const totalOutcomes = packs.reduce(
  (sum, pack) => sum + pack.nodes.reduce((inner, node) => inner + node.outcomes.length, 0),
  0,
);
const totalNarrations = packs.reduce(
  (sum, pack) =>
    sum +
    pack.nodes.reduce(
      (inner, node) =>
        inner + node.outcomes.reduce((n, outcome) => n + (outcome.narration?.length ?? 0), 0),
      0,
    ),
  0,
);
const duplicateTitles = [...titleCounts.entries()].filter(([, count]) => count > 1);
const duplicateTexts = [...outcomeTextCounts.entries()].filter(([, count]) => count > 1);

const report = {
  generatedAt: new Date().toISOString(),
  production: merged.totals,
  compiled: {
    phase9Tasks: PHASE9_TASKS.length,
    phase9Events: PHASE9_EVENT_SCENES.length,
    packs: packs.length,
    nodes: totalNodes,
    outcomes: totalOutcomes,
    narrations: totalNarrations,
    taskNodes: packs
      .filter((pack) => pack.kind === 'task')
      .reduce((sum, pack) => sum + pack.nodes.length, 0),
    eventNodes: packs
      .filter((pack) => pack.kind !== 'task')
      .reduce((sum, pack) => sum + pack.nodes.length, 0),
  },
  stages: {
    tasks: taskStageCounts,
    events: eventStageCounts,
  },
  taskDomains: taskDomainCounts,
  effects: Object.fromEntries(
    Object.entries(effectCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  ),
  conditions: Object.fromEntries(
    Object.entries(conditionCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  ),
  roles: Object.fromEntries(
    Object.entries(roleCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
  ),
  effectiveWindows: {
    clippedNodes: effectiveWindows.filter(
      (window) => window.min !== window.clippedMin || window.max !== window.clippedMax,
    ).length,
    totalNodes,
    minClipped: effectiveWindows.filter((window) => window.clippedMin > window.min).length,
    maxClipped: effectiveWindows.filter((window) => window.clippedMax < window.max).length,
  },
  duplicates: {
    titles: duplicateTitles,
    exactOutcomeTexts: duplicateTexts,
  },
  unresolvedTokens: unresolved,
  packs: packs.map((pack) => {
    const [stageMin, stageMax] = stageRange[pack.stage]!;
    return {
      id: pack.id,
      kind: pack.kind ?? 'event',
      stage: pack.stage,
      domain: pack.task?.domain,
      authoredAge: pack.ageWindow,
      effectiveAge: {
        min: Math.max(pack.ageWindow.min, stageMin),
        max: Math.min(pack.ageWindow.max, stageMax),
      },
      nodes: pack.nodes.length,
      outcomes: pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0),
      narrations: pack.nodes.reduce(
        (sum, node) =>
          sum + node.outcomes.reduce((n, outcome) => n + (outcome.narration?.length ?? 0), 0),
        0,
      ),
    };
  }),
};

writeFileSync('docs/v4/phase-9-content-report.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      production: report.production,
      compiled: report.compiled,
      stages: report.stages,
      taskDomains: report.taskDomains,
      effects: report.effects,
      effectiveWindows: report.effectiveWindows,
      duplicateTitles: report.duplicates.titles.length,
      duplicateOutcomeTexts: report.duplicates.exactOutcomeTexts.length,
      unresolvedTokens: report.unresolvedTokens.length,
    },
    null,
    2,
  ),
);
