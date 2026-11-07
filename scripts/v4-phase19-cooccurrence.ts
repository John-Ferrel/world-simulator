/**
 * Phase 19 observed state co-occurrence.
 *
 * Reads committed life dossiers and counts state definitions that were active
 * on the same person/household at the same time. It is diagnostic evidence for
 * the Cross-Pack Opportunity Map; it does not create content or change runtime.
 *
 *   pnpm v4:phase19-cooccurrence
 *   pnpm v4:phase19-cooccurrence docs/v4/phase-15-phase18-a.json,...
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { GENERATED_STATE_PACKS } from '../packages/v4/content/states/index.js';

type DossierState = {
  definitionId: string;
  ownerType: string;
  ownerId: string;
  active: boolean;
  since?: { year: number; month: number };
  endedAt?: { year: number; month: number };
};

type Dossier = {
  seed: string;
  years: number;
  date: { year: number; month: number };
  lives: { id: string; name: string; states?: DossierState[] }[];
};

const packForState = new Map<string, string>();
for (const pack of GENERATED_STATE_PACKS) {
  for (const state of pack.states) packForState.set(state.id, pack.id);
}

const defaults = [
  'docs/v4/phase-15-phase18-a.json',
  'docs/v4/phase-15-phase18-b.json',
  'docs/v4/phase-15-phase18-c.json',
  'docs/v4/phase-15-phase18-d.json',
];
const input = process.argv.slice(2).find((arg) => !arg.startsWith('--')) ?? defaults.join(',');
const files = input.split(',').map((file) => file.trim()).filter(Boolean);

type Observation = {
  key: string;
  a: string;
  b: string;
  packA: string;
  packB: string;
  occurrences: number;
  seeds: Set<string>;
  people: Set<string>;
};

const observations = new Map<string, Observation>();
for (const file of files) {
  const dossier = JSON.parse(readFileSync(resolve(file), 'utf8')) as Dossier;
  const endMonth = dossier.date.year * 12 + dossier.date.month;
  for (const life of dossier.lives) {
    const states = (life.states ?? []).filter(
      (state) => state.since && state.ownerType !== 'world',
    );
    for (let i = 0; i < states.length; i += 1) {
      const left = states[i]!;
      const leftStart = left.since!.year * 12 + left.since!.month;
      const leftEnd = left.endedAt ? left.endedAt.year * 12 + left.endedAt.month : endMonth;
      for (let j = i + 1; j < states.length; j += 1) {
        const right = states[j]!;
        if (left.ownerType !== right.ownerType || left.ownerId !== right.ownerId) continue;
        if (left.definitionId === right.definitionId) continue;
        const rightStart = right.since!.year * 12 + right.since!.month;
        const rightEnd = right.endedAt ? right.endedAt.year * 12 + right.endedAt.month : endMonth;
        if (Math.max(leftStart, rightStart) >= Math.min(leftEnd, rightEnd)) continue;
        const a = left.definitionId < right.definitionId ? left.definitionId : right.definitionId;
        const b = left.definitionId < right.definitionId ? right.definitionId : left.definitionId;
        const packA = packForState.get(a) ?? 'base';
        const packB = packForState.get(b) ?? 'base';
        if (packA === packB) continue;
        const key = `${a}|${b}`;
        const entry =
          observations.get(key) ??
          ({
            key,
            a,
            b,
            packA,
            packB,
            occurrences: 0,
            seeds: new Set<string>(),
            people: new Set<string>(),
          } satisfies Observation);
        entry.occurrences += 1;
        entry.seeds.add(dossier.seed);
        entry.people.add(`${dossier.seed}:${life.id}`);
        observations.set(key, entry);
      }
    }
  }
}

const map = JSON.parse(readFileSync(resolve('docs/v4/cross-pack-opportunities.json'), 'utf8')) as {
  covered?: { key: string }[];
};
const covered = new Set((map.covered ?? []).map((pair) => pair.key));
const rows = [...observations.values()]
  .map((entry) => ({
    ...entry,
    seeds: [...entry.seeds].sort(),
    people: entry.people.size,
    covered: covered.has(entry.key),
  }))
  .sort(
    (a, b) =>
      b.occurrences - a.occurrences ||
      b.people - a.people ||
      a.key.localeCompare(b.key),
  );

mkdirSync('docs/v4', { recursive: true });
writeFileSync(
  'docs/v4/phase-19-cooccurrence.json',
  `${JSON.stringify(
    {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      sources: files,
      counts: {
        files: files.length,
        pairs: rows.length,
        openPairs: rows.filter((row) => !row.covered).length,
        coveredPairs: rows.filter((row) => row.covered).length,
      },
      rows,
    },
    null,
    2,
  )}\n`,
);
const md: string[] = [
  '# Phase 19 — Observed State Co-occurrence',
  '',
  `Sources: ${files.join(', ')}`,
  '',
  'Counts state definitions that were active on the same person/household at the same time. It is diagnostic evidence, not a content registry.',
  '',
  '## Top cross-pack co-occurrences',
  '',
  '| Observed | People | Seeds | State A | State B | Packs | Existing kernel? |',
  '|---:|---:|---:|---|---|---|---|',
  ...rows.slice(0, 60).map(
    (row) =>
      `| ${row.occurrences} | ${row.people} | ${row.seeds.length} | ${row.a} | ${row.b} | ${row.packA} / ${row.packB} | ${row.covered ? 'yes' : '**open**'} |`,
  ),
  '',
  '## Use',
  '',
  'A pair with high co-occurrence and `open` means the world already puts these states on the same person but no kernel consumes both. That is a concrete Phase 19 authoring target. A `covered` pair may still need a better or different story.',
];
writeFileSync('docs/v4/phase-19-cooccurrence.md', `${md.join('\n')}\n`);
console.log(
  JSON.stringify({
    files: files.length,
    pairs: rows.length,
    openPairs: rows.filter((row) => !row.covered).length,
    coveredPairs: rows.filter((row) => row.covered).length,
    top: rows.slice(0, 10).map((row) => ({
      a: row.a,
      b: row.b,
      occurrences: row.occurrences,
      people: row.people,
      covered: row.covered,
    })),
  }),
);
