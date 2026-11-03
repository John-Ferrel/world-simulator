/**
 * Named-life validation for Phase 3.
 *
 * Creates a fixed cohort of player-born children, runs the real event engine
 * with macro statistical mortality, and records each life's events, death age
 * and a concrete sample. This is not a statistical estimator; the scenario
 * script handles population-level rates.
 */
import { writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import {
  GENERATED_SCENES,
  GENERATED_TASKS,
  ALL_EVENT_SCENES,
  ALL_TASKS,
} from '../packages/v4/content/generated/index.js';
import { defaultMacroState, syncMacroPressures } from '../packages/v4/macro.js';

let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
if (!world.macro) world.macro = defaultMacroState(world);
syncMacroPressures(world, world.macro);
const children: string[] = [];
for (let index = 0; index < 12; index += 1) {
  const birth = createV4Birth(
    world,
    {
      name: `Life ${String(index + 1).padStart(2, '0')}`,
      sex: index % 2 === 0 ? 'female' : 'male',
      health: 0.9,
      wish: '在一个会变化的世界里活下来，留下自己的记录。',
      lifeMode: 'ordinary',
      appearance: { skin: 1, hair: 0, clothes: 2 },
    },
    `phase3-life-${index + 1}`,
    `phase3-life-owner-${index + 1}`,
  );
  world = birth.world;
  children.push(birth.childId);
}
const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];
const events: import('../packages/v4/domain.js').EventFact[] = [];
const yearly: number[] = [];
for (let year = 0; year < 80; year += 1) {
  const result = advanceV4Year(world, scenes, {
    economy: { enabled: true },
    eventRuntime: true,
    agency: true,
    tasks: ALL_TASKS,
    maxOrdinaryEventsPerPerson: 4,
  });
  world = result.world;
  events.push(...result.events);
  yearly.push(result.events.length);
}
const lives = children.map((id) => {
  const person = world.persons[id];
  const personal = events.filter(
    (event) =>
      event.subjectId === id ||
      event.participants.some((participant) => participant.personId === id),
  );
  return {
    id,
    name: person?.name,
    born: person?.born,
    died: person?.died,
    deathCause: person?.deathCause,
    alive: Boolean(person && !person.died),
    age: person ? (person.died ? person.died.year : world.date.year) - person.born.year : null,
    events: personal.length,
    sample: personal.slice(-8).map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
  };
});
const report = {
  years: 80,
  date: world.date,
  population: world.macro?.population,
  totalEvents: events.length,
  eventsPerYear: Number((events.length / 80).toFixed(2)),
  lives,
  yearlyEvents: yearly,
};
writeFileSync('docs/v4/phase-3-life-demo.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
