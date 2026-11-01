import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import type { World } from '../packages/contracts/index.js';
import { LIFE_BEAT_CATALOG } from '../packages/life-trajectory/catalog.js';
import {
  deriveLifeTrajectoryContext,
  generateLifeTrajectory,
  lifeStageForAge,
} from '../packages/life-trajectory/index.js';
import { STAGE_AGE_RANGES, type LifeTrajectory } from '../packages/life-trajectory/schema.js';

type FamilyKind = 'elite' | 'middle' | 'poor' | 'destitute';

type FixtureOptions = {
  war?: number;
  famine?: number;
  epidemic?: number;
  family?: FamilyKind;
  urban?: boolean;
  health?: number;
  sex?: 'female' | 'male';
  year?: number;
};

function fixture(options: FixtureOptions = {}) {
  const world = createWorld('life-trajectory-test', 1, 300);
  const year = options.year ?? 1937;
  world.calendar = { startYear: year, mode: 'historical-simulation', sources: [] };
  world.month = 0;
  const settlement = world.settlements[0];
  const family = options.family ?? 'poor';
  const population = options.urban === false ? 600 : 900_000;
  settlement.sourcePopulation = population;
  settlement.cohort = {
    id: `cohort-${settlement.id}`,
    children: Math.floor(population * 0.24),
    adults: Math.floor(population * 0.66),
    elders: Math.floor(population * 0.1),
  };
  settlement.food = population * 4;
  settlement.prosperity =
    family === 'elite' ? 0.85 : family === 'middle' ? 0.55 : family === 'destitute' ? 0.18 : 0.25;
  settlement.scarcity = options.famine ?? 0;
  settlement.unrest = (options.famine ?? 0) * 0.3;
  settlement.economy = {
    unemployment: family === 'elite' ? 0.04 : family === 'middle' ? 0.08 : 0.18,
    healthcare: family === 'elite' ? 0.8 : family === 'middle' ? 0.55 : 0.2,
    education: family === 'elite' ? 0.8 : family === 'middle' ? 0.6 : 0.2,
    infrastructure: 0.4,
    inflation: 0.02,
    productionMultiplier: 1,
    tradeMultiplier: 1,
  };

  const child = world.persons[0];
  const mother = world.persons[1];
  const father = world.persons[2];
  for (const parent of [mother, father]) {
    parent.locationId = settlement.id;
    parent.householdId = 'household-fixture';
    parent.coin =
      family === 'elite' ? 500 : family === 'middle' ? 60 : family === 'destitute' ? 0 : 0;
    parent.occupation =
      family === 'elite'
        ? '医生'
        : family === 'middle'
          ? '教师'
          : family === 'destitute'
            ? '乞讨'
            : '劳力';
  }
  child.birth = 0;
  child.locationId = settlement.id;
  child.householdId = 'household-fixture';
  child.parents = [mother.id, father.id];
  child.sex = options.sex ?? 'female';
  child.health = options.health ?? (family === 'elite' ? 0.95 : family === 'middle' ? 0.9 : 0.85);
  child.occupation = '孩童';
  child.coin = 0;

  const shocks: NonNullable<World['shocks']> = [];
  if (options.war) {
    shocks.push({
      id: 'fixture-war',
      kind: 'war',
      title: '世界大战',
      locationIds: [settlement.id],
      started: 0,
      ends: 240,
      severity: options.war,
      causeId: 'cause-war',
    });
  }
  if (options.famine) {
    settlement.food = 0;
    shocks.push({
      id: 'fixture-famine',
      kind: 'supply',
      title: '粮食危机',
      locationIds: [settlement.id],
      started: 0,
      ends: 240,
      severity: options.famine,
      causeId: 'cause-famine',
    });
  }
  if (options.epidemic) {
    settlement.disease = {
      prevalence: options.epidemic,
      immune: 0.1,
      causeId: 'cause-epidemic',
    };
  }
  world.shocks = shocks;
  return { world, child, settlement };
}

type Mode = 'ordinary' | 'legendary';

function sample(
  world: World,
  child: ReturnType<typeof fixture>['child'],
  count: number,
  prefix: string,
  mode: Mode = 'ordinary',
  premiseTags: string[] = [],
): LifeTrajectory[] {
  return Array.from({ length: count }, (_, index) =>
    generateLifeTrajectory(world, child, { seed: `${prefix}-${index}`, mode, premiseTags }),
  );
}

function summarize(trajectories: LifeTrajectory[]) {
  let beats = 0;
  let extreme = 0;
  let deaths = 0;
  let earlyDeaths = 0;
  let forcedDisplacement = 0;
  let school = 0;
  let childLabour = 0;
  let sexWork = 0;
  let upward = 0;
  let riskOutcome = 0;
  const beatIds = new Set<string>();
  const riskKinds = new Set([
    'death',
    'disappearance',
    'criminalized',
    'detained',
    'institutionalized',
    'exploitation',
    'repression',
    'addiction',
    'injury',
  ]);
  for (const trajectory of trajectories) {
    beats += trajectory.beats.length;
    extreme += trajectory.stats.extremeBeatCount;
    if (trajectory.ending.kind === 'dead') deaths++;
    if (trajectory.stats.earlyDeath) earlyDeaths++;
    if (
      trajectory.beats.some(
        (beat) => beat.outcome.kind === 'displacement' || beat.effects.legalStatus === 'displaced',
      )
    )
      forcedDisplacement++;
    if (
      trajectory.beats.some(
        (beat) => beat.beatId === 'school_window' || beat.beatId === 'secondary_school',
      )
    )
      school++;
    if (trajectory.beats.some((beat) => beat.tags.includes('child_labor'))) childLabour++;
    if (trajectory.beats.some((beat) => beat.tags.includes('sex_work'))) sexWork++;
    if (trajectory.beats.some((beat) => beat.outcome.kind === 'upward')) upward++;
    if (trajectory.beats.some((beat) => riskKinds.has(beat.outcome.kind))) riskOutcome++;
    for (const beat of trajectory.beats) beatIds.add(beat.beatId);
  }
  const n = trajectories.length;
  return {
    n,
    beatIds,
    averageBeats: beats / n,
    extremeShare: beats === 0 ? 0 : extreme / beats,
    deathRate: deaths / n,
    earlyDeathRate: earlyDeaths / n,
    forcedDisplacementRate: forcedDisplacement / n,
    schoolRate: school / n,
    childLabourRate: childLabour / n,
    sexWorkRate: sexWork / n,
    upwardRate: upward / n,
    riskOutcomeRate: riskOutcome / n,
  };
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection++;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

describe('life trajectory draft', () => {
  it('is deterministic for the same seed and derives constraints from world state', () => {
    const { world, child, settlement } = fixture({ year: 1937, family: 'poor' });
    settlement.scarcity = 0.4;
    const context = deriveLifeTrajectoryContext(world, child);
    expect(context.era).toBe('interwar_1919_1938');
    expect(context.region).toBe('industrial_city');
    expect(context.familyClass).toBe('poor');
    expect(context.family.state).toBe('intact');
    expect(context.sex).toBe('female');
    expect(context.pressures.famine).toBeGreaterThan(0.2);

    const first = generateLifeTrajectory(world, child, { seed: 'stable-seed' });
    const second = generateLifeTrajectory(world, child, { seed: 'stable-seed' });
    expect(second).toEqual(first);
    expect(first.version).toBe(1);
    expect(first.startAge).toBe(0);
    expect(first.ending.certainty).toBe('projection');
    expect(first.disclaimer).toContain('不是保证发生的未来');
    expect(first.possibleEndings.length).toBeGreaterThan(0);
    expect(first.beats.length).toBeGreaterThan(0);
  });

  it('gives a middle-class rural child concrete beats before age seven in 1900', () => {
    const { world, child } = fixture({ year: 1900, family: 'middle', urban: false });
    const context = deriveLifeTrajectoryContext(world, child);
    expect(context.era).toBe('prewar_1900_1913');
    expect(context.region).toBe('rural');
    expect(context.familyClass).toBe('middle');
    expect(context.family.state).toBe('intact');

    const earlyDefinitions = LIFE_BEAT_CATALOG.filter((beat) => beat.ageWindow.min <= 6);
    expect(earlyDefinitions.length).toBeGreaterThanOrEqual(20);
    for (const beat of earlyDefinitions) {
      expect(
        beat.branches.some((branch) => branch.outcome.kind !== 'death'),
        `${beat.id} must offer a survival or long-term-consequence branch`,
      ).toBe(true);
    }

    for (const mode of ['ordinary', 'legendary'] as const) {
      const trajectories = sample(world, child, 300, `early-1900-${mode}`, mode);
      const earlyBeatIds = new Set<string>();
      let withEarlyNonDeath = 0;
      for (const trajectory of trajectories) {
        expect(trajectory.beats.length).toBeGreaterThan(0);
        expect(trajectory.beats[0].age).toBeLessThanOrEqual(6);
        expect(trajectory.beats[0].stage).toBe('infancy');
        const early = trajectory.beats.filter((beat) => beat.age <= 6);
        expect(early.length).toBeGreaterThan(0);
        if (early.some((beat) => beat.outcome.kind !== 'death')) withEarlyNonDeath++;
        for (const beat of early) earlyBeatIds.add(beat.beatId);
      }
      expect(earlyBeatIds.size).toBeGreaterThanOrEqual(5);
      expect(withEarlyNonDeath).toBeGreaterThan(200);
    }
  });

  it('produces materially different lives for elite and destitute backgrounds', () => {
    const eliteFixture = fixture({ family: 'elite' });
    const destituteFixture = fixture({ family: 'destitute' });
    const elite = summarize(sample(eliteFixture.world, eliteFixture.child, 900, 'elite'));
    const destitute = summarize(
      sample(destituteFixture.world, destituteFixture.child, 900, 'destitute'),
    );

    expect(elite.schoolRate).toBe(1);
    expect(destitute.schoolRate).toBe(0);
    expect(elite.childLabourRate).toBe(0);
    expect(destitute.childLabourRate).toBeGreaterThan(0.7);
    expect(elite.sexWorkRate).toBe(0);
    expect(destitute.sexWorkRate).toBeGreaterThan(0.1);
    expect(jaccard(elite.beatIds, destitute.beatIds)).toBeLessThan(0.5);
  });

  it('differentiates early childhood content by class', () => {
    const eliteFixture = fixture({ year: 1900, family: 'elite' });
    const destituteFixture = fixture({ year: 1900, family: 'destitute' });
    const elite = sample(eliteFixture.world, eliteFixture.child, 700, 'early-elite');
    const destitute = sample(
      destituteFixture.world,
      destituteFixture.child,
      700,
      'early-destitute',
    );
    const rate = (
      trajectories: LifeTrajectory[],
      predicate: (beat: LifeTrajectory['beats'][number]) => boolean,
    ) =>
      trajectories.filter((trajectory) => trajectory.beats.some(predicate)).length /
      trajectories.length;
    const byId = (id: string) => (beat: LifeTrajectory['beats'][number]) => beat.beatId === id;
    const byTag = (tag: string) => (beat: LifeTrajectory['beats'][number]) =>
      beat.tags.includes(tag);

    expect(rate(elite, byId('nursemaid_distance'))).toBeGreaterThan(0.8);
    expect(rate(destitute, byId('nursemaid_distance'))).toBe(0);
    expect(rate(destitute, byId('coal_picking'))).toBeGreaterThan(0.2);
    expect(rate(elite, byId('coal_picking'))).toBe(0);
    expect(rate(elite, byTag('elite_childhood'))).toBeGreaterThan(0.8);
    expect(rate(destitute, byTag('poverty_childhood'))).toBeGreaterThan(0.8);
    expect(rate(elite, byTag('poverty_childhood'))).toBe(0);
  });

  it('raises early death and forced displacement under war, famine and epidemic', () => {
    const peaceFixture = fixture({ family: 'poor' });
    const crisisFixture = fixture({
      family: 'poor',
      war: 0.9,
      famine: 0.85,
      epidemic: 0.6,
    });
    const peace = sample(peaceFixture.world, peaceFixture.child, 1200, 'peace');
    const crisis = sample(crisisFixture.world, crisisFixture.child, 1200, 'crisis');
    const peaceStats = summarize(peace);
    const crisisStats = summarize(crisis);

    expect(crisis[0].context.pressures.war).toBeGreaterThan(0.8);
    expect(crisis[0].context.pressures.famine).toBeGreaterThan(0.5);
    expect(crisis[0].context.pressures.epidemic).toBeGreaterThan(0.4);
    expect(crisisStats.earlyDeathRate).toBeGreaterThan(peaceStats.earlyDeathRate + 0.05);
    expect(crisisStats.forcedDisplacementRate).toBeGreaterThan(
      peaceStats.forcedDisplacementRate + 0.2,
    );
  });

  it('makes legendary mode wider and more dangerous without a protagonist halo', () => {
    const poorFixture = fixture({ family: 'poor' });
    const ordinary = summarize(
      sample(poorFixture.world, poorFixture.child, 1200, 'poor', 'ordinary'),
    );
    const legendary = summarize(
      sample(poorFixture.world, poorFixture.child, 1200, 'poor', 'legendary'),
    );
    expect(legendary.averageBeats).toBeGreaterThan(ordinary.averageBeats + 0.5);
    expect(legendary.sexWorkRate).toBeGreaterThan(ordinary.sexWorkRate + 0.08);
    expect(legendary.extremeShare).toBeGreaterThan(ordinary.extremeShare + 0.015);
    expect(legendary.riskOutcomeRate).toBeGreaterThanOrEqual(ordinary.riskOutcomeRate);

    const crisisFixture = fixture({
      family: 'poor',
      war: 0.9,
      famine: 0.85,
      epidemic: 0.6,
    });
    const crisisOrdinary = summarize(
      sample(crisisFixture.world, crisisFixture.child, 900, 'crisis-mode', 'ordinary'),
    );
    const crisisLegendary = summarize(
      sample(crisisFixture.world, crisisFixture.child, 900, 'crisis-mode', 'legendary'),
    );
    expect(crisisLegendary.deathRate).toBeGreaterThan(crisisOrdinary.deathRate + 0.05);
    expect(crisisLegendary.earlyDeathRate).toBeGreaterThan(crisisOrdinary.earlyDeathRate + 0.03);

    const eliteFixture = fixture({ family: 'elite' });
    const eliteOrdinary = summarize(
      sample(eliteFixture.world, eliteFixture.child, 900, 'elite-mode', 'ordinary'),
    );
    const eliteLegendary = summarize(
      sample(eliteFixture.world, eliteFixture.child, 900, 'elite-mode', 'legendary'),
    );
    expect(eliteLegendary.upwardRate).toBeGreaterThan(eliteOrdinary.upwardRate + 0.02);
    expect(eliteLegendary.averageBeats).toBeGreaterThan(eliteOrdinary.averageBeats + 0.4);
  });

  it('uses premiseTags as reproducible affinity weights', () => {
    const { world, child } = fixture({ year: 1900, family: 'destitute', urban: false });
    const baseline = sample(world, child, 900, 'premise-tags');
    const boosted = sample(world, child, 900, 'premise-tags', 'ordinary', ['coal_picking']);
    const coalRate = (trajectories: LifeTrajectory[]) =>
      trajectories.filter((trajectory) =>
        trajectory.beats.some((beat) => beat.beatId === 'coal_picking'),
      ).length / trajectories.length;

    expect(LIFE_BEAT_CATALOG.find((beat) => beat.id === 'coal_picking')?.tags).toContain(
      'coal_picking',
    );
    expect(coalRate(boosted)).toBeGreaterThan(coalRate(baseline) + 0.05);

    const first = generateLifeTrajectory(world, child, {
      seed: 'premise-stable',
      premiseTags: ['coal_picking'],
    });
    const second = generateLifeTrajectory(world, child, {
      seed: 'premise-stable',
      premiseTags: ['coal_picking'],
    });
    expect(second).toEqual(first);
  });

  it('never generates sexual or sex-work content before adulthood', () => {
    for (const beat of LIFE_BEAT_CATALOG) {
      if (beat.tags.includes('sex_work')) {
        expect(beat.stage).toBe('adulthood');
        expect(beat.ageWindow.min).toBeGreaterThanOrEqual(18);
      }
    }
    const forbiddenExplicitTerms = ['强奸', '轮奸', '性交', '口交', '阴道', '阴茎', '儿童色情'];
    const catalogText = JSON.stringify(LIFE_BEAT_CATALOG);
    for (const term of forbiddenExplicitTerms) expect(catalogText).not.toContain(term);

    const destituteFixture = fixture({ family: 'destitute' });
    const trajectories = sample(
      destituteFixture.world,
      destituteFixture.child,
      600,
      'minor-safety',
      'legendary',
    );
    for (const trajectory of trajectories) {
      for (const beat of trajectory.beats) {
        if (beat.tags.includes('sex_work')) {
          expect(beat.age).toBeGreaterThanOrEqual(18);
          expect(beat.stage).toBe('adulthood');
        }
        if (beat.age < 18) expect(beat.tags).not.toContain('sex_work');
      }
    }
  });

  it('keeps provenance, causal labels and stage/age windows on every beat', () => {
    expect(LIFE_BEAT_CATALOG.length).toBeGreaterThanOrEqual(30);
    const tags = new Set(LIFE_BEAT_CATALOG.flatMap((beat) => beat.tags));
    for (const required of [
      'war',
      'famine',
      'epidemic',
      'displacement',
      'child_labor',
      'apprenticeship',
      'marriage',
      'birth',
      'disease',
      'early_death',
      'crime',
      'punishment',
      'sex_work',
      'addiction',
      'religion',
      'cult',
      'disaster',
      'mobility',
      'migration',
      'disappearance',
      'death',
      'poverty',
      'gender',
      'class',
      'law',
      'stigma',
      'health',
      'labor',
      'orphan',
      'institution',
      'education',
      'elder',
    ]) {
      expect(tags.has(required), `missing theme ${required}`).toBe(true);
    }
    for (const beat of LIFE_BEAT_CATALOG) {
      expect(beat.sources.length).toBeGreaterThan(0);
      expect(beat.historicalBasis.length).toBeGreaterThan(10);
      expect(beat.branches.length).toBeGreaterThan(0);
      for (const branch of beat.branches) {
        expect(branch.causes.length).toBeGreaterThan(0);
        expect(Object.keys(branch.effects).length).toBeGreaterThan(0);
      }
      const stageRange = STAGE_AGE_RANGES[beat.stage];
      expect(beat.ageWindow.min).toBeGreaterThanOrEqual(stageRange.min);
      expect(beat.ageWindow.max).toBeLessThanOrEqual(stageRange.max);
    }

    const fixtureData = fixture({ family: 'destitute' });
    const trajectories = sample(fixtureData.world, fixtureData.child, 200, 'provenance');
    let inspected = 0;
    for (const trajectory of trajectories) {
      for (const beat of trajectory.beats) {
        inspected++;
        expect(beat.source.length).toBeGreaterThan(0);
        expect(beat.historicalBasis.length).toBeGreaterThan(10);
        expect(beat.triggerReasons.length).toBeGreaterThan(0);
        expect(beat.causes.length).toBeGreaterThan(0);
        expect(beat.causes.some((cause) => cause.startsWith('tag:'))).toBe(true);
        expect(beat.age).toBeGreaterThanOrEqual(beat.ageWindow.min);
        expect(beat.age).toBeLessThanOrEqual(beat.ageWindow.max);
        expect(lifeStageForAge(beat.age)).toBe(beat.stage);
        expect(beat.outcome.label.length).toBeGreaterThan(0);
      }
    }
    expect(inspected).toBeGreaterThan(300);
  });

  it('uses only the seeded random source', () => {
    const root = fileURLToPath(new URL('../packages/life-trajectory/', import.meta.url));
    for (const file of ['index.ts', 'catalog.ts', 'schema.ts']) {
      const source = readFileSync(`${root}${file}`, 'utf8');
      expect(source.includes('Math.random'), `${file} must not use Math.random`).toBe(false);
    }
  });
});
