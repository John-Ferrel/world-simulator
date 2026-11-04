/**
 * Phase 12 Experiment B: the same world, different people.
 *
 * Read-only candidate-pool audit. It does not advance the world or select
 * outcomes; it asks the real engine which composed scenes/tasks the current
 * person facts make available.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { auditCandidatePools } from '../packages/v4/engine.js';
import type { WorldState } from '../packages/v4/domain.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const BASE_SCENES = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

type Profile = {
  label: string;
  select: (world: WorldState) => string | undefined;
};

const profiles: Profile[] = [
  {
    label: 'child in a tenement',
    select: (world) =>
      Object.values(world.persons).find(
        (person) =>
          !person.died && person.born.year >= 1900 && person.provenance.kind === 'initial',
      )?.id,
  },
  {
    label: 'adult print worker',
    select: (world) =>
      Object.values(world.persons).find(
        (person) =>
          !person.died &&
          Boolean(person.employment) &&
          (person.employment?.occupation.includes('print') || person.roles.includes('worker')),
      )?.id,
  },
  {
    label: 'employed woman',
    select: (world) =>
      Object.values(world.persons).find(
        (person) => !person.died && person.sex === 'female' && Boolean(person.employment),
      )?.id,
  },
  {
    label: 'official / organization member',
    select: (world) =>
      Object.values(world.persons).find(
        (person) =>
          !person.died &&
          (person.roles.includes('official') ||
            Object.values(world.organizations).some(
              (organization) =>
                organization.kind === 'state' && organization.memberIds.includes(person.id),
            )),
      )?.id,
  },
  {
    label: 'elder',
    select: (world) =>
      Object.values(world.persons).find(
        (person) => !person.died && world.date.year - person.born.year >= 65,
      )?.id,
  },
];

const world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
const results = [];
for (const profile of profiles) {
  const personId = profile.select(world);
  if (!personId) {
    results.push({ label: profile.label, personId: null, note: 'no matching seed person' });
    continue;
  }
  const audit = auditCandidatePools(
    world,
    personId,
    world.date,
    BASE_SCENES,
    ALL_TASKS,
    DEFAULT_COMPOSITION,
  );
  const person = world.persons[personId]!;
  results.push({
    label: profile.label,
    personId,
    name: person.name,
    age: world.date.year - person.born.year,
    sex: person.sex,
    occupation: person.employment?.occupation ?? null,
    roles: person.roles,
    sceneCandidates: audit?.eventCount ?? 0,
    taskCandidates: audit?.taskCount ?? 0,
    events: audit?.events ?? [],
    tasks: audit?.tasks ?? [],
  });
}

const output = {
  generatedAt: new Date().toISOString(),
  world: world.id,
  date: world.date,
  note: 'Candidate pools are read-only eligibility results from the real engine. They are not committed events.',
  results,
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-12-experiment-b.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(
  JSON.stringify(
    results.map((entry) => ({
      label: entry.label,
      name: entry.name ?? null,
      sceneCandidates: entry.sceneCandidates ?? 0,
      taskCandidates: entry.taskCandidates ?? 0,
      events: entry.events?.slice(0, 8),
    })),
    null,
    2,
  ),
);
