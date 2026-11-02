import { mkdirSync, writeFileSync } from 'node:fs';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import type { EventFact, SceneInstance } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { defaultMacroState, syncMacroPressures } from '../packages/v4/macro.js';
import { applyScenarioToMacro, type MacroScenarioName } from '../packages/v4/macro-scenarios.js';
import { populationSummary } from '../packages/v4/statistics.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_PACKS, GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { validateGeneratedPack } from '../packages/v4/generated.js';

const years = Number(process.argv[2] ?? 80);
let world = structuredClone(VIENNA_1912_SEED);
world.macro = defaultMacroState(world);
syncMacroPressures(world, world.macro);
const scenario = process.env.V4_AUDIT_SCENARIO as MacroScenarioName | undefined;
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
  `audit-content-${years}`,
  'audit-owner',
);
world = birth.world;
const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_POSTWAR_SCENES,
  ...VIENNA_DEVELOPMENT_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];
const events: EventFact[] = [];
const sceneInstances: SceneInstance[] = [];
const warnings: { code: string; message: string; personId?: string; sceneId?: string }[] = [];
const materializations: {
  year: number;
  personId: string;
  role: string;
  kind: string;
  regionId: string;
  reason: string;
}[] = [];
const scenesByYear: number[] = [];
for (let i = 0; i < years; i += 1) {
  const yearStarted = Date.now();
  if (scenario) {
    world.macro = applyScenarioToMacro(world.macro!, scenario, world.date.year);
    syncMacroPressures(world, world.macro);
  }
  const result = advanceV4Year(world, scenes, {
    economy: { enabled: true },
    eventRuntime: true,
    maxOrdinaryEventsPerPerson: 4,
  });
  world = result.world;
  events.push(...result.events);
  sceneInstances.push(...result.scenes);
  warnings.push(...result.diagnostics.warnings);
  for (const materialization of result.diagnostics.materializations)
    materializations.push({ year: world.date.year, ...materialization });
  scenesByYear.push(result.events.length);
  if (process.env.V4_AUDIT_VERBOSE) {
    console.error(
      JSON.stringify({
        year: world.date.year,
        ms: Date.now() - yearStarted,
        persons: Object.keys(world.persons).length,
        alive: Object.values(world.persons).filter((person) => !person.died).length,
        events: events.length,
        heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      }),
    );
  }
}

const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
const generatedFamilyIds = new Set(GENERATED_PACKS.map((pack) => pack.id));

function eventScene(event: EventFact) {
  const sceneId = event.action.split('/')[0]!;
  return sceneById.get(sceneId);
}

function eventFamily(event: EventFact): string {
  const definition = eventScene(event);
  return definition?.familyId ?? definition?.id ?? event.action.split('/')[0]!;
}

function eventStage(event: EventFact): string {
  return eventScene(event)?.stage ?? 'unknown';
}

const actionCounts = new Map<string, number>();
const stageEventCounts = new Map<string, number>();
const familyEventCounts = new Map<string, number>();
const focalFamilyCounts = new Map<string, number>();
const generatedStageCounts = new Map<string, number>();
for (const event of events) {
  const key = event.action.split('/')[0]!;
  actionCounts.set(key, (actionCounts.get(key) ?? 0) + 1);
  const family = eventFamily(event);
  stageEventCounts.set(eventStage(event), (stageEventCounts.get(eventStage(event)) ?? 0) + 1);
  familyEventCounts.set(family, (familyEventCounts.get(family) ?? 0) + 1);
}
const sorted = [...actionCounts.entries()].sort((a, b) => b[1] - a[1]);
const top = sorted[0];
const focalEvents = events.filter(
  (event) =>
    event.subjectId === birth.childId ||
    event.participants.some((participant) => participant.personId === birth.childId),
);
const focalYears = new Set(focalEvents.map((event) => event.date.year));
for (const event of focalEvents) {
  const family = eventFamily(event);
  focalFamilyCounts.set(family, (focalFamilyCounts.get(family) ?? 0) + 1);
}
const generated = events.filter((event) => generatedFamilyIds.has(eventFamily(event)));
const generatedSet = new Set(generated);
for (const event of generated) {
  generatedStageCounts.set(
    eventStage(event),
    (generatedStageCounts.get(eventStage(event)) ?? 0) + 1,
  );
}
const untriggeredFamilies = [...generatedFamilyIds].filter(
  (family) => (familyEventCounts.get(family) ?? 0) === 0,
);
const triggeredGeneratedFamilies = [...generatedFamilyIds].filter(
  (family) => (familyEventCounts.get(family) ?? 0) > 0,
);

const warningCounts = new Map<string, number>();
for (const warning of warnings) {
  warningCounts.set(warning.code, (warningCounts.get(warning.code) ?? 0) + 1);
}

const blocked = sceneInstances.filter((scene) => scene.status === 'blocked');
const blockedReasonCounts = new Map<string, number>();
const blockedFamilyCounts = new Map<string, number>();
const blockedSceneCounts = new Map<string, number>();
for (const scene of blocked) {
  const reason = scene.reason ?? 'unknown';
  blockedReasonCounts.set(reason, (blockedReasonCounts.get(reason) ?? 0) + 1);
  const definition = sceneById.get(scene.sceneId);
  const family = definition?.familyId ?? scene.sceneId;
  blockedFamilyCounts.set(family, (blockedFamilyCounts.get(family) ?? 0) + 1);
  blockedSceneCounts.set(scene.sceneId, (blockedSceneCounts.get(scene.sceneId) ?? 0) + 1);
}

const textWarnings: { packId: string; warning: string }[] = [];
for (const pack of GENERATED_PACKS) {
  const validation = validateGeneratedPack(pack);
  for (const warning of validation.warnings) {
    if (warning.startsWith('duplicate text:') || warning.startsWith('near-duplicate text:')) {
      textWarnings.push({ packId: pack.id, warning });
    }
  }
}

const generatedOutcomes = GENERATED_PACKS.flatMap((pack) =>
  pack.nodes.flatMap((node) => node.outcomes),
);
const generatedNarrations = generatedOutcomes.reduce(
  (sum, outcome) => sum + (outcome.narration?.length ?? 0),
  0,
);

const familyCounts = [...familyEventCounts.entries()]
  .map(([id, count]) => {
    const definition = GENERATED_SCENES.find((scene) => scene.familyId === id);
    return {
      id,
      title: definition?.title ?? id,
      stage: definition?.stage ?? 'unknown',
      generated: generatedFamilyIds.has(id),
      events: count,
      scenes: scenes.filter((scene) => scene.familyId === id).length,
      focalEvents: focalFamilyCounts.get(id) ?? 0,
    };
  })
  .sort((a, b) => b.events - a.events || a.id.localeCompare(b.id));

const deathEvents = events.filter((event) =>
  event.effects.some((effect) => effect.type === 'death'),
);
const deathCauseCounts = new Map<string, number>();
const ageAtDeath: number[] = [];
for (const event of deathEvents) {
  const cause = event.effects.find((effect) => effect.type === 'death');
  if (cause && cause.type === 'death')
    deathCauseCounts.set(cause.cause, (deathCauseCounts.get(cause.cause) ?? 0) + 1);
  const person = world.persons[event.subjectId];
  if (person) ageAtDeath.push(event.date.year - person.born.year);
}
const population = world.macro ? populationSummary(world.macro) : undefined;

const report = {
  years,
  scenario: scenario ?? 'baseline-no-directed-history',
  date: world.date,
  persons: Object.keys(world.persons).length,
  alive: Object.values(world.persons).filter((person) => !person.died).length,
  events: events.length,
  eventsPerYear: Number((events.length / years).toFixed(2)),
  focalEvents: focalEvents.length,
  focalEventYears: focalYears.size,
  focalEventFamilyCounts: [...focalFamilyCounts.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id)),
  causalEvents: events.filter((event) => event.causes.length > 0).length,
  interactionResponses: events.filter((event) => event.action === 'interaction_response').length,
  births: events.filter((event) => event.action === 'birth').length,
  deaths: deathEvents.length,
  statisticalDeaths: events.filter((event) => event.action.startsWith('statistical_death/')).length,
  statisticalInfections: events.filter((event) => event.action === 'statistical_infection').length,
  statisticalRecoveries: events.filter((event) => event.action === 'statistical_recovery').length,
  infantDeaths: deathEvents.filter((event) => {
    const person = world.persons[event.subjectId];
    return person ? event.date.year - person.born.year < 1 : false;
  }).length,
  under5Deaths: deathEvents.filter((event) => {
    const person = world.persons[event.subjectId];
    return person ? event.date.year - person.born.year < 5 : false;
  }).length,
  maternalDeaths: deathEvents.filter((event) => {
    const cause = event.effects.find((effect) => effect.type === 'death');
    return cause?.type === 'death' && /childbirth|产后|maternal/i.test(cause.cause);
  }).length,
  medianAgeAtDeath: ageAtDeath.length
    ? [...ageAtDeath].sort((a, b) => a - b)[Math.floor(ageAtDeath.length / 2)]
    : null,
  deathCauseCounts: [...deathCauseCounts.entries()]
    .map(([cause, count]) => ({ cause, count }))
    .sort((a, b) => b.count - a.count || a.cause.localeCompare(b.cause)),
  population,
  zeroEventYears: scenesByYear.filter((count) => count === 0).length,
  materializations: {
    total: materializations.length,
    byRole: [...new Set(materializations.map((entry) => entry.role))]
      .map((role) => ({
        role,
        count: materializations.filter((entry) => entry.role === role).length,
      }))
      .sort((a, b) => b.count - a.count || a.role.localeCompare(b.role)),
    byKind: [...new Set(materializations.map((entry) => entry.kind))]
      .map((kind) => ({
        kind,
        count: materializations.filter((entry) => entry.kind === kind).length,
      }))
      .sort((a, b) => b.count - a.count || a.kind.localeCompare(b.kind)),
    samples: materializations.slice(0, 20),
  },
  generated: {
    packs: GENERATED_PACKS.length,
    scenes: GENERATED_SCENES.length,
    outcomes: generatedOutcomes.length,
    narrations: generatedNarrations,
    familiesTriggered: triggeredGeneratedFamilies.length,
    familiesTotal: generatedFamilyIds.size,
    events: generated.length,
    shareOfEvents: Number((generated.length / Math.max(1, events.length)).toFixed(3)),
    stageEventCounts: [...generatedStageCounts.entries()]
      .map(([stage, count]) => ({ stage, count }))
      .sort((a, b) => b.count - a.count || a.stage.localeCompare(b.stage)),
    untriggeredFamilies,
  },
  generatedEvents: generated.length,
  generatedShare: Number((generated.length / Math.max(1, events.length)).toFixed(3)),
  unresolvedTextEvents: events.filter((event) =>
    /\{[a-zA-Z_][a-zA-Z0-9_]*\}/.test(event.immediateText),
  ).length,
  unresolvedTextSamples: events
    .filter((event) => /\{[a-zA-Z_][a-zA-Z0-9_]*\}/.test(event.immediateText))
    .slice(0, 10)
    .map((event) => ({
      year: event.date.year,
      action: event.action,
      text: event.immediateText,
    })),
  unknownEffectWarnings: warningCounts.get('unknown_effect') ?? 0,
  coverage: {
    eventStageCounts: [...stageEventCounts.entries()]
      .map(([stage, count]) => ({ stage, count }))
      .sort((a, b) => b.count - a.count || a.stage.localeCompare(b.stage)),
    familyCounts,
    familiesWithoutEvents: [...generatedFamilyIds].filter(
      (family) => (familyEventCounts.get(family) ?? 0) === 0,
    ),
    generatedFamilyEvents: [...generatedFamilyIds]
      .map((id) => ({
        id,
        events: familyEventCounts.get(id) ?? 0,
        focalEvents: focalFamilyCounts.get(id) ?? 0,
      }))
      .sort((a, b) => b.events - a.events || a.id.localeCompare(b.id)),
  },
  sceneBlocked: {
    total: blocked.length,
    reasons: [...blockedReasonCounts.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count || a.reason.localeCompare(b.reason)),
    families: [...blockedFamilyCounts.entries()]
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id)),
    scenes: [...blockedSceneCounts.entries()]
      .map(([sceneId, count]) => ({ sceneId, count }))
      .sort((a, b) => b.count - a.count || a.sceneId.localeCompare(b.sceneId))
      .slice(0, 30),
  },
  sceneBlockedReasons: [...blockedReasonCounts.entries()]
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count || a.reason.localeCompare(b.reason)),
  textWarnings,
  generatedTextWarnings: textWarnings.length,
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
    generated: generatedSet.has(event),
  })),
};
mkdirSync('docs/v4', { recursive: true });
writeFileSync('docs/v4/content-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
