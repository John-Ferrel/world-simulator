/**
 * Phase 13 family and population experiment.
 *
 * Uses the real engine to measure partnership formation, cohabitation, births
 * and child deaths. This is the Phase 12 birth-decline audit, not a separate
 * demographic model.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { EventFact, Relation, WorldState } from '../packages/v4/domain.js';
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

const years = Number(process.argv[2] ?? 40);
let world: WorldState = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
world.seed = process.argv[3] ?? 'phase13-family';
const events: EventFact[] = [];
const yearly = [];
let partnerFormations = 0;
let interactionsCreated = 0;
let interactionsAccepted = 0;
let interactionsRejected = 0;
let births = 0;
let childDeaths = 0;
let partneredWomanYears = 0;
let womanYears = 0;

const activePartner = (world: WorldState, personId: string): Relation | undefined =>
  Object.values(world.relations).find(
    (relation) =>
      relation.kind === 'partner' &&
      relation.end === undefined &&
      (relation.a === personId || relation.b === personId),
  );

for (let index = 0; index < years; index += 1) {
  const result = advanceV4Year(world, BASE_SCENES, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    composition: DEFAULT_COMPOSITION,
    maxOrdinaryEventsPerPerson: 4,
    maxAgencyActorsPerYear: 96,
  });
  world = result.world;
  events.push(...result.events);
  let yearBirths = 0;
  let yearDeaths = 0;
  for (const event of result.events) {
    if (event.effects.some((effect) => effect.type === 'birth')) yearBirths += 1;
    if (event.effects.some((effect) => effect.type === 'relation' && effect.kind === 'partner')) {
      partnerFormations += 1;
    }
    if (event.effects.some((effect) => effect.type === 'interaction')) interactionsCreated += 1;
    if (event.effects.some((effect) => effect.type === 'death')) yearDeaths += 1;
  }
  births += yearBirths;
  for (const person of Object.values(world.persons)) {
    if (person.died || person.sex !== 'female') continue;
    const age = world.date.year - person.born.year;
    if (age < 16 || age > 49) continue;
    womanYears += 1;
    if (activePartner(world, person.id)) partneredWomanYears += 1;
  }
  const persons = Object.values(world.persons);
  yearly.push({
    year: world.date.year,
    births: yearBirths,
    deaths: yearDeaths,
    alive: persons.filter((person) => !person.died).length,
    partnerRelations: Object.values(world.relations).filter(
      (relation) => relation.kind === 'partner' && relation.end === undefined,
    ).length,
    households: Object.keys(world.households).length,
  });
}

const interactions = Object.values(world.interactions);
childDeaths = Object.values(world.persons).filter(
  (person) =>
    person.died !== undefined &&
    person.died.year >= VIENNA_1912_SEED.date.year &&
    person.died.year - person.born.year < 5,
).length;
interactionsAccepted = interactions.filter(
  (interaction) => interaction.status === 'accepted',
).length;
interactionsRejected = interactions.filter(
  (interaction) => interaction.status === 'rejected',
).length;
const living = Object.values(world.persons).filter((person) => !person.died);
const womenInAge = living.filter((person) => {
  const age = world.date.year - person.born.year;
  return person.sex === 'female' && age >= 16 && age <= 49;
});
const partneredWomen = womenInAge.filter((person) => activePartner(world, person.id));
const sampleFamilies = living
  .filter((person) => person.parentIds.length > 0)
  .sort((a, b) => a.born.year - b.born.year || a.id.localeCompare(b.id))
  .slice(0, 10)
  .map((person) => {
    const parents = person.parentIds
      .map((id) => world.persons[id])
      .filter((parent): parent is NonNullable<typeof parent> => Boolean(parent));
    return {
      personId: person.id,
      name: person.name,
      born: person.born,
      died: person.died,
      parents: parents.map((parent) => ({
        id: parent.id,
        name: parent.name,
        sex: parent.sex,
        occupation: parent.employment?.occupation ?? null,
      })),
    };
  });

const report = {
  generatedAt: new Date().toISOString(),
  seed: world.seed,
  years,
  startDate: VIENNA_1912_SEED.date,
  endDate: world.date,
  persons: Object.keys(world.persons).length,
  alive: living.length,
  births,
  childDeaths,
  partnerFormations,
  interactionsCreated,
  interactionsAccepted,
  interactionsRejected,
  womanYears,
  partneredWomanYears,
  partneredWomanShare: womanYears > 0 ? Number((partneredWomanYears / womanYears).toFixed(4)) : 0,
  birthsPerWomanYear: womanYears > 0 ? Number((births / womanYears).toFixed(4)) : 0,
  birthsPerPartneredWomanYear:
    partneredWomanYears > 0 ? Number((births / partneredWomanYears).toFixed(4)) : 0,
  livingWomen16to49: womenInAge.length,
  partneredWomen16to49: partneredWomen.length,
  yearly,
  sampleFamilies,
  limitation:
    'This is one seed world. Births include all birth effects, including stillbirths only when the content commits a birth fact; child deaths are counted from recorded death dates.',
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-13-family.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      years,
      persons: report.persons,
      alive: report.alive,
      births,
      childDeaths,
      partnerFormations,
      interactionsAccepted,
      womanYears,
      partneredWomanYears,
      partneredWomanShare: report.partneredWomanShare,
      birthsPerWomanYear: report.birthsPerWomanYear,
      birthsPerPartneredWomanYear: report.birthsPerPartneredWomanYear,
    },
    null,
    2,
  ),
);
