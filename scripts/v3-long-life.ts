import { writeFileSync, mkdirSync } from 'node:fs';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import {
  population,
  type BirthRequest,
  type HistoricalEvent,
} from '../packages/contracts/index.js';
import { ensureRuntime } from '../packages/rules/index.js';

const seed = process.argv[2] ?? 'v3-long-life-1';
const years = Math.max(18, Math.min(80, Number(process.argv[3] ?? 30)));
const outFile = process.argv[4] ?? `.data/${seed}.json`;
let world = createWorld(seed, 1, Math.max(300, years + 10));
const events: HistoricalEvent[] = [];
const request: BirthRequest = {
  name: '长线者',
  sex: 'female',
  health: 0.9,
  wish: '希望她幸福，也希望能听见别人的情绪。',
  preferredLocationId: 'town-0',
  appearance: { skin: 2, hair: 1, clothes: 3 },
};
const intake = advance(
  world,
  [{ id: 'long-birth', kind: 'birth', userId: 'long-life', request }],
  false,
);
events.push(...intake.events);
world = intake.world;
const birthId = (intake.results[0].value as { birthId: string }).birthId;
const compile = advance(
  world,
  [{ id: 'long-compile', kind: 'birth_compile', birthId, proposal: undefined, source: 'fallback' }],
  false,
);
events.push(...compile.events);
world = compile.world;
const childId = (compile.results[0].value as { personId: string }).personId;
const initialPopulation = population(world);
const milestones: { month: number; kind: string; text: string }[] = [];
for (let month = 0; month < years * 12; month++) {
  const step = advance(world);
  world = step.world;
  events.push(...step.events);
  for (const event of step.events)
    if (event.personIds.includes(childId) && event.kind === 'life_program_milestone')
      milestones.push({ month: event.month, kind: event.kind, text: event.text });
  if (world.persons.find((person) => person.id === childId)?.death !== undefined) break;
}
const child = world.persons.find((person) => person.id === childId)!;
const program = ensureRuntime(world).lifePrograms[childId];
const ability = ensureRuntime(world).abilities[childId];
const report = {
  generatedAt: new Date().toISOString(),
  seed,
  years,
  simulationMonths: world.month,
  initialPopulation,
  finalPopulation: population(world),
  birth: {
    request,
    childId,
    parents: child.parents,
    birthMonth: child.birth,
    deathMonth: child.death,
    deathCause: child.deathCause,
    age: Math.floor(((child.death ?? world.month) - child.birth) / 12),
    occupation: child.occupation,
    health: child.health,
    education: child.life?.education,
    goals: child.goals,
    relationships: child.relationships.length,
    program,
    ability,
    milestones,
  },
  eventCounts: {
    total: events.length,
    birth: events.filter((event) => event.kind === 'birth').length,
    milestones: events.filter((event) => event.kind === 'life_program_milestone').length,
    abilityUsed: events.filter((event) => event.kind === 'ability_used').length,
    illness: events.filter((event) => event.kind === 'illness').length,
    death: events.filter((event) => event.kind === 'death').length,
    ruleOccurrence: events.filter((event) => event.kind === 'rule_occurrence').length,
  },
  samples: events
    .filter(
      (event) =>
        event.personIds.includes(childId) &&
        [
          'birth',
          'life_program_milestone',
          'ability_used',
          'illness',
          'death',
          'adulthood',
        ].includes(event.kind),
    )
    .slice(0, 40),
};
mkdirSync('.data', { recursive: true });
writeFileSync(outFile, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    { outFile, years, child: report.birth, counts: report.eventCounts },
    null,
    2,
  ).slice(0, 5000),
);
