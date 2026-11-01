import { writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SEED,
  VIENNA_1912_SCENES,
} from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';

const years = Number(process.argv[2] ?? 80);
let world = structuredClone(VIENNA_1912_SEED);
const birth = createV4Birth(
  world,
  {
    name: 'Audit Klara',
    sex: 'female',
    health: 0.9,
    wish: '识字，能在印刷厂找到不用把手指送进机器的活。',
    lifeMode: 'ordinary',
    appearance: { skin: 1, hair: 0, clothes: 2, doll: { bodyType: 'female' } },
  },
  `audit-${Date.now().toString(36)}`,
  'audit-owner',
);
world = birth.world;
const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];
const events = [];
const warnings = [];
const scenesByYear = [];
for (let i = 0; i < years; i += 1) {
  world = applyViennaTimeline(world);
  const result = advanceV4Year(world, scenes, {
    economy: { enabled: true },
    eventRuntime: true,
    maxOrdinaryEventsPerPerson: 4,
  });
  world = result.world;
  events.push(...result.events);
  warnings.push(...result.diagnostics.warnings);
  scenesByYear.push(result.events.length);
}
const actionCounts = new Map<string, number>();
for (const event of events) {
  const key = event.action.split('/')[0]!;
  actionCounts.set(key, (actionCounts.get(key) ?? 0) + 1);
}
const sorted = [...actionCounts.entries()].sort((a, b) => b[1] - a[1]);
const top = sorted[0];
const focalEvents = events.filter(
  (event) =>
    event.subjectId === birth.childId ||
    event.participants.some((participant) => participant.personId === birth.childId),
);
const focalYears = new Set(focalEvents.map((event) => event.date.year));
const generated = events.filter((event) =>
  [
    'vienna-printshop-daily',
    'vienna-school-childhood',
    'vienna-tenement-neighbors',
    'vienna-market-household',
    'vienna-apprentice-printshop',
    'vienna-illness-household',
  ].some((prefix) => event.action.startsWith(prefix)),
);
const warningCounts = new Map<string, number>();
for (const warning of warnings) {
  const key = warning.code;
  warningCounts.set(key, (warningCounts.get(key) ?? 0) + 1);
}
const report = {
  years,
  date: world.date,
  persons: Object.keys(world.persons).length,
  alive: Object.values(world.persons).filter((person) => !person.died).length,
  events: events.length,
  eventsPerYear: Number((events.length / years).toFixed(2)),
  focalEvents: focalEvents.length,
  focalEventYears: focalYears.size,
  causalEvents: events.filter((event) => event.causes.length > 0).length,
  interactionResponses: events.filter((event) => event.action === 'interaction_response').length,
  births: events.filter((event) => event.action === 'birth').length,
  deaths: events.filter(
    (event) => event.action === 'death' || event.effects.some((effect) => effect.type === 'death'),
  ).length,
  zeroEventYears: scenesByYear.filter((count) => count === 0).length,
  generatedEvents: generated.length,
  generatedShare: Number((generated.length / Math.max(1, events.length)).toFixed(3)),
  narrationVariants: scenes.reduce((sum, scene) => sum + (scene.narration?.length ?? 0), 0),
  topScene: top
    ? { action: top[0], count: top[1], share: Number((top[1] / events.length).toFixed(3)) }
    : null,
  actionCounts: sorted.slice(0, 30),
  warnings: [...warningCounts.entries()].sort((a, b) => b[1] - a[1]),
  sampleEvents: events.slice(-20).map((event) => ({
    year: event.date.year,
    title: event.title,
    text: event.immediateText,
    action: event.action,
  })),
};
writeFileSync('docs/v4/content-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
