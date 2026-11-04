/**
 * Phase 14 special-capability life.
 *
 * Creates one owner birth with an explicit wish, applies the deterministic
 * birth-contract fallback (the same bounded contract the worker uses when no
 * model is configured), then runs a real life and writes every subject event.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { ageAt, type EventFact, type Person, type WorldState } from '../packages/v4/domain.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { fallbackBirthContract } from '../packages/v4/birth-contract.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { ALL_EVENT_SCENES, ALL_TASKS } from '../packages/v4/content/generated/index.js';
import { DEFAULT_COMPOSITION } from '../packages/v4/composition/default.js';

const years = Number(process.argv[2] ?? 55);
const seed = process.argv[3] ?? 'phase14-special';
const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...ALL_EVENT_SCENES,
];

let world = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
world.seed = seed;
const birth = createV4Birth(
  world,
  {
    name: 'Klara',
    sex: 'female',
    health: 0.9,
    wish: '我想识字，能读信、读书，也能看穿别人没有说出口的话。',
    lifeMode: 'ordinary',
    appearance: { skin: 1, hair: 0, clothes: 2, doll: { bodyType: 'female' } },
  },
  'phase14-special-birth',
  'phase14-special-owner',
);
world = birth.world;
const child = world.persons[birth.childId]!;
const householdMembers = world.households[child.householdId]!.memberIds.map(
  (id) => world.persons[id],
).filter((person): person is Person => Boolean(person) && person.id !== child.id);
const contract = fallbackBirthContract({
  name: child.name,
  sex: child.sex,
  health: child.health.vitality,
  wish: child.lifeContract?.originalWish ?? '我想识字。',
  mode: 'ordinary',
  date: world.date,
  household: {
    members: householdMembers.map((person) => ({
      name: person.name,
      age: ageAt(person, world.date),
      occupation: person.employment?.occupation,
      relation: person.parentIds.includes(child.id) ? 'parent' : 'household',
    })),
  },
});
child.lifeContract = {
  ...structuredClone(child.lifeContract!),
  interpretation: contract.interpretation,
  privateGoal: contract.privateGoal,
  capability: contract.capability,
  compiledAt: { ...world.date },
  compiledBy: 'deterministic-fallback',
};
if (!child.life) {
  child.life = {
    mood: 0,
    reputation: 0,
    skills: { literacy: 0, numeracy: 0, craft: 0, social: 0 },
    flags: [],
  };
}
child.life.flags = child.life.flags.filter((flag) => !flag.startsWith('capability:'));
if (contract.capability !== 'none') child.life.flags.push(`capability:${contract.capability}`);
for (const [skill, amount] of Object.entries(contract.skillDeltas ?? {})) {
  const key = skill as keyof typeof child.life.skills;
  if (key in child.life.skills) {
    child.life.skills[key] = Math.max(0, Math.min(1, child.life.skills[key] + Number(amount)));
  }
}

const events: EventFact[] = [];
for (let index = 0; index < years; index += 1) {
  const result = advanceV4Year(world, scenes, {
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
}

const person = world.persons[child.id]!;
const personal = events
  .filter((event) => event.subjectId === child.id)
  .sort(
    (a, b) =>
      a.date.year * 12 + a.date.month - (b.date.year * 12 + b.date.month) ||
      a.id.localeCompare(b.id),
  );

const lines = [
  '# Phase 14 — Special Life',
  '',
  `Seed ${seed}, ${years} years. Birth contract compiled by the deterministic fallback (no model configured).`,
  '',
  `**${person.name}**, born ${person.born.year}.${String(person.born.month).padStart(2, '0')}. ` +
    `Capability: **${contract.capability}**. ${person.died ? `Died ${person.died.year}.${String(person.died.month).padStart(2, '0')}.` : 'Still living.'}`,
  '',
  `Wish: ${person.lifeContract?.originalWish ?? ''}`,
  '',
  `Contract: ${contract.interpretation}`,
  '',
  `Goal: ${contract.privateGoal}`,
  '',
  `${personal.length} committed subject events.`,
  '',
];
for (const event of personal) {
  lines.push(
    `- **${event.date.year}.${String(event.date.month).padStart(2, '0')} · ${ageAt(person, event.date)}岁** ${event.title ? `《${event.title}》` : ''} \`${event.action}\``,
    `  ${event.immediateText}`,
    event.effects.length > 0
      ? `  _effects: ${event.effects.map((effect) => effect.type).join(', ')}_`
      : '',
    '',
  );
}
lines.push(
  '## Notes',
  '',
  '- The capability is a bounded contract flag, not a guarantee. It only changes utility/eligibility where content asks for it.',
  '- This run exists to show a capability-gated life; it is not a claim that every birth receives a capability.',
);
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/phase-14-special-life.md', `${lines.join('\n')}\n`);
writeFileSync(
  'docs/v4/phase-14-special-life.json',
  `${JSON.stringify(
    {
      seed,
      years,
      capability: contract.capability,
      contract,
      person: {
        id: person.id,
        name: person.name,
        born: person.born,
        died: person.died ?? null,
        events: personal.map((event) => ({
          id: event.id,
          date: event.date,
          action: event.action,
          title: event.title ?? null,
          text: event.immediateText,
          tags: event.tags ?? [],
          effects: event.effects.map((effect) => effect.type),
          causes: event.causes,
          historyRefs: event.historyRefs ?? [],
        })),
      },
      world: {
        persons: Object.keys(world.persons).length,
        alive: Object.values(world.persons).filter((entry) => !entry.died).length,
        events: events.length,
      },
    },
    null,
    2,
  )}\n`,
);
console.log(
  JSON.stringify(
    {
      name: person.name,
      capability: contract.capability,
      born: person.born,
      died: person.died ?? null,
      events: personal.length,
      worldEvents: events.length,
    },
    null,
    2,
  ),
);
