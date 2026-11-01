import { clamp, type Person, type Settlement, type World } from '../contracts/index.js';
import { random } from '../simulation-core/random.js';
import { LIFE_BEAT_CATALOG } from './catalog.js';
import {
  STAGE_AGE_RANGES,
  LifeTrajectoryOptionsSchema,
  type ActiveShock,
  type EraBand,
  type FamilyClass,
  type FamilyState,
  type GeneratedLifeBeat,
  type LifeBeat,
  type LifeBranch,
  type LifeEffects,
  type LifeStage,
  type LifeTrajectory,
  type LifeTrajectoryContext,
  type LifeTrajectoryMode,
  type LifeTrajectoryOptionsInput,
  type LifeTrajectoryEnding,
  type PersonSex,
  type PossibleEnding,
  type PressureKind,
  type ProjectedLifeState,
  type RegionType,
  type WorldShockKind,
} from './schema.js';

const STAGE_ORDER: LifeStage[] = ['infancy', 'childhood', 'adolescence', 'adulthood', 'elderhood'];

const STAGE_DRAWS: Record<LifeTrajectoryMode, Record<LifeStage, number>> = {
  ordinary: { infancy: 1, childhood: 2, adolescence: 2, adulthood: 3, elderhood: 2 },
  legendary: { infancy: 1, childhood: 3, adolescence: 3, adulthood: 4, elderhood: 3 },
};

const DEFAULT_END_AGE = 85;
const MAX_END_AGE = 110;

const unique = <T>(values: T[]): T[] => [...new Set(values)];

export function eraForYear(year: number): EraBand {
  if (year < 1900 || year > 1950) return 'outside_1900_1950';
  if (year <= 1913) return 'prewar_1900_1913';
  if (year <= 1918) return 'great_war_1914_1918';
  if (year <= 1938) return 'interwar_1919_1938';
  if (year <= 1945) return 'world_war_1939_1945';
  return 'postwar_1946_1950';
}

export function lifeStageForAge(age: number): LifeStage {
  if (age < 3) return 'infancy';
  if (age < 12) return 'childhood';
  if (age < 18) return 'adolescence';
  if (age < 60) return 'adulthood';
  return 'elderhood';
}

function personAgeYears(world: World, person: Person): number {
  return Math.max(0, Math.floor((world.month - person.birth) / 12));
}

function settlementPopulation(settlement: Settlement): number {
  if (settlement.sourcePopulation !== undefined && settlement.sourcePopulation > 0) {
    return settlement.sourcePopulation;
  }
  const cohort = settlement.cohort;
  return Math.max(0, cohort.children + cohort.adults + cohort.elders);
}

function regionFor(world: World, settlement: Settlement): RegionType {
  const hasSeaRoute = (world.routes ?? []).some(
    (route) => route.mode === 'sea' && (route.from === settlement.id || route.to === settlement.id),
  );
  const population = settlementPopulation(settlement);
  if (hasSeaRoute) return 'coastal_port';
  if (population >= 1_500_000) return 'metropolis';
  if (population >= 150_000) return 'industrial_city';
  if (population >= 20_000) return 'provincial_town';
  return 'rural';
}

function occupationPrestige(occupation: string | undefined): number {
  if (!occupation) return 0.35;
  const value = occupation.trim();
  if (!value) return 0.35;
  if (/医生|医师|doctor|physician/i.test(value)) return 0.8;
  if (/医护|护士|nurse|midwife|助产/i.test(value)) return 0.7;
  if (/工程师|engineer|研究员|research/i.test(value)) return 0.72;
  if (/教师|teacher|教授|professor|抄写员|clerk|文书/i.test(value)) return 0.62;
  if (/商|merchant|店主|shop|贸易|trader/i.test(value)) return 0.58;
  if (/设计师|designer|程序员|programmer|技术/i.test(value)) return 0.65;
  if (/工|worker|矿|miner|农|farmer|fisher|船工|机械/i.test(value)) return 0.32;
  if (/家仆|servant|佣|maid|跑腿|苦力|劳力|laborer/i.test(value)) return 0.25;
  if (/乞|beggar|无业|unemployed|失业|流浪/i.test(value)) return 0.12;
  return 0.4;
}

function percentileRank(values: number[], value: number): number {
  if (values.length === 0) return 0.5;
  let below = 0;
  let equal = 0;
  for (const candidate of values) {
    if (candidate < value) below++;
    else if (candidate === value) equal++;
  }
  return clamp((below + equal * 0.5) / values.length);
}

function familyStateFor(
  world: World,
  person: Person,
): { state: FamilyState; parents: Person[]; caregivers: Person[]; householdSize: number } {
  const listedParents = person.parents
    .map((id) => world.persons.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is Person => candidate !== undefined);
  const livingParents = listedParents.filter((parent) => parent.death === undefined);
  let state: FamilyState = 'unknown';
  if (person.parents.length > 0) {
    if (listedParents.length === 0) state = 'unknown';
    else if (livingParents.length === 0) state = 'orphan';
    else if (livingParents.length === 1) state = 'single_parent';
    else state = 'intact';
  }
  const household = world.persons.filter(
    (candidate) =>
      candidate.id !== person.id &&
      candidate.death === undefined &&
      person.householdId !== '' &&
      candidate.householdId === person.householdId,
  );
  return {
    state,
    parents: livingParents,
    caregivers: livingParents.length > 0 ? livingParents : household,
    householdSize: Math.max(1, household.length + 1),
  };
}

function activeShocksFor(world: World, settlementId: string): ActiveShock[] {
  return (world.shocks ?? [])
    .filter((shock) => {
      if (shock.resolved) return false;
      if (world.month < shock.started || world.month >= shock.ends) return false;
      return shock.locationIds.length === 0 || shock.locationIds.includes(settlementId);
    })
    .map((shock) => ({
      id: shock.id,
      kind: shock.kind as WorldShockKind,
      severity: clamp(shock.severity),
      title: shock.title,
    }));
}

const maxShock = (shocks: ActiveShock[], ...kinds: WorldShockKind[]): number =>
  shocks
    .filter((shock) => kinds.includes(shock.kind))
    .reduce((maximum, shock) => Math.max(maximum, shock.severity), 0);

function derivePressures(
  world: World,
  settlement: Settlement,
  shocks: ActiveShock[],
): Record<PressureKind, number> {
  const population = settlementPopulation(settlement);
  const foodNeed = Math.max(1, population * 2.5);
  const foodShortage = clamp((foodNeed - settlement.food) / foodNeed);
  const activeConflict = world.conflicts.find(
    (conflict) =>
      conflict.status === 'active' &&
      (conflict.locationId === settlement.id ||
        conflict.a === settlement.polityId ||
        conflict.b === settlement.polityId),
  );
  const conflictPressure = activeConflict ? clamp(0.55 + activeConflict.months / 120) : 0;
  const economy = settlement.economy;

  const war = clamp(
    Math.max(maxShock(shocks, 'war', 'attack'), conflictPressure, maxShock(shocks, 'attack')),
  );
  const famine = clamp(
    settlement.scarcity * 0.72 +
      foodShortage * 0.6 +
      maxShock(shocks, 'supply') * 0.55 +
      maxShock(shocks, 'crisis') * 0.2,
  );
  const epidemic = clamp(
    (settlement.disease?.prevalence ?? 0) * 1.25 + maxShock(shocks, 'epidemic'),
  );
  const displacement = clamp(
    maxShock(shocks, 'displacement') * 0.9 + war * 0.25 + maxShock(shocks, 'attack') * 0.5,
  );
  const unrest = clamp(settlement.unrest + maxShock(shocks, 'crisis') * 0.55);
  const persecution = clamp(
    war * 0.22 + unrest * 0.25 + displacement * 0.2 + (economy?.unemployment ?? 0) * 0.1,
  );

  return {
    war: clamp(war),
    famine: clamp(famine),
    epidemic: clamp(epidemic),
    displacement: clamp(displacement),
    unrest: clamp(unrest),
    persecution: clamp(persecution),
  };
}

function sexFor(world: World, person: Person): PersonSex {
  if (person.sex) return person.sex;
  const dollType = person.appearance?.doll?.bodyType;
  if (dollType === 'male') return 'male';
  if (dollType === 'female') return 'female';
  const roll = random(world.seed, person.id, 'life-trajectory-sex');
  if (roll < 0.005) return 'intersex';
  return roll < 0.5025 ? 'female' : 'male';
}

/**
 * Build the immutable birth context. All later eligibility checks read this
 * snapshot plus a purely local projected state; the world is never mutated.
 */
export function deriveLifeTrajectoryContext(
  world: World,
  person: Person,
  seed = `${world.seed}:${person.id}:${world.month}`,
): LifeTrajectoryContext {
  const settlement = world.settlements.find((candidate) => candidate.id === person.locationId);
  if (!settlement) throw new Error(`life trajectory: settlement ${person.locationId} not found`);

  const family = familyStateFor(world, person);
  const peers = world.persons.filter(
    (candidate) =>
      candidate.death === undefined &&
      candidate.locationId === settlement.id &&
      candidate.id !== person.id,
  );
  const localCoins = peers.map((candidate) => candidate.coin).sort((a, b) => a - b);
  const caregiverCoin =
    family.caregivers.length > 0
      ? family.caregivers.reduce((sum, parent) => sum + parent.coin, 0) / family.caregivers.length
      : person.coin;
  // A newborn's own coin is not family wealth. Without a known caregiver, use a
  // neutral low rank instead of allowing starting pocket money to fake a class.
  const parentWealthRank =
    family.caregivers.length > 0 ? percentileRank(localCoins, caregiverCoin) : 0.35;
  const parentPrestige =
    family.caregivers.length > 0
      ? family.caregivers.reduce((sum, parent) => sum + occupationPrestige(parent.occupation), 0) /
        family.caregivers.length
      : occupationPrestige(person.occupation);
  const housingQuality =
    family.caregivers.length > 0
      ? family.caregivers.reduce((sum, parent) => sum + (parent.life?.housing.quality ?? 0.5), 0) /
        family.caregivers.length
      : 0.5;
  const prosperity = clamp(settlement.prosperity);
  let classScore = clamp(
    prosperity * 0.45 + parentPrestige * 0.28 + parentWealthRank * 0.17 + housingQuality * 0.1,
  );
  if (family.state === 'orphan') classScore = clamp(classScore - 0.08);
  if (family.state === 'unknown' && family.caregivers.length === 0)
    classScore = clamp(prosperity * 0.5 + parentWealthRank * 0.2 + 0.1);
  const familyClass: FamilyClass =
    classScore < 0.22
      ? 'destitute'
      : classScore < 0.38
        ? 'poor'
        : classScore < 0.58
          ? 'working'
          : classScore < 0.78
            ? 'middle'
            : 'elite';

  const year = (world.calendar?.startYear ?? 1900) + Math.floor(world.month / 12);
  const shocks = activeShocksFor(world, settlement.id);
  const pressures = derivePressures(world, settlement, shocks);
  const health = clamp(person.health);
  const ageYears = personAgeYears(world, person);
  const stage = lifeStageForAge(ageYears);
  const vulnerability = clamp(
    (1 - health) * 0.55 +
      (1 - classScore) * 0.25 +
      settlement.scarcity * 0.15 +
      (family.state === 'orphan' ? 0.1 : 0) +
      pressures.war * 0.1,
  );
  const opportunities = clamp(
    classScore * 0.5 +
      prosperity * 0.3 +
      (1 - settlement.scarcity) * 0.2 -
      pressures.war * 0.25 -
      pressures.unrest * 0.1,
  );
  const constraints = [
    `era:${eraForYear(year)}`,
    `region:${regionFor(world, settlement)}`,
    `class:${familyClass}`,
    `sex:${sexFor(world, person)}`,
    `stage:${stage}`,
    `health:${health.toFixed(2)}`,
    `family:${family.state}`,
  ];
  for (const kind of [
    'war',
    'famine',
    'epidemic',
    'displacement',
    'unrest',
    'persecution',
  ] as const) {
    if (pressures[kind] >= 0.15) constraints.push(`pressure:${kind}=${pressures[kind].toFixed(2)}`);
  }
  for (const shock of shocks) {
    if (shock.severity >= 0.2) constraints.push(`shock:${shock.kind}=${shock.severity.toFixed(2)}`);
  }

  return {
    worldId: world.id,
    personId: person.id,
    seed,
    year,
    month: world.month,
    era: eraForYear(year),
    stage,
    ageYears,
    sex: sexFor(world, person),
    health,
    familyClass,
    classScore,
    region: regionFor(world, settlement),
    settlement: {
      id: settlement.id,
      name: settlement.name,
      polityId: settlement.polityId,
      population: settlementPopulation(settlement),
      prosperity,
      scarcity: clamp(settlement.scarcity),
      unrest: clamp(settlement.unrest),
      healthcare: clamp(settlement.economy?.healthcare ?? settlement.prosperity * 0.5),
      unemployment: clamp(settlement.economy?.unemployment ?? 0.06),
    },
    family: {
      state: family.state,
      parentsAlive: family.parents.length,
      householdSize: family.householdSize,
      parentWealthRank,
      parentPrestige,
      guardianOccupation: family.caregivers[0]?.occupation,
    },
    pressures,
    activeShocks: shocks,
    vulnerability,
    opportunities,
    constraints,
  };
}

function triggerMatches(
  beat: LifeBeat,
  context: LifeTrajectoryContext,
  state: ProjectedLifeState,
  priorBeatIds: Set<string>,
): boolean {
  const triggers = beat.triggers;
  if (triggers.stages && !triggers.stages.includes(beat.stage)) return false;
  if (
    triggers.age &&
    (beat.ageWindow.max < (triggers.age.min ?? 0) || beat.ageWindow.min > (triggers.age.max ?? 110))
  )
    return false;
  if (
    triggers.years &&
    (context.year < (triggers.years.min ?? 1800) || context.year > (triggers.years.max ?? 2200))
  )
    return false;
  if (triggers.eras && !triggers.eras.includes(context.era)) return false;
  if (triggers.regions && !triggers.regions.includes(context.region)) return false;
  if (triggers.classes && !triggers.classes.includes(context.familyClass)) return false;
  if (triggers.sexes && !triggers.sexes.includes(context.sex)) return false;
  if (
    triggers.health &&
    (state.health < (triggers.health.min ?? 0) || state.health > (triggers.health.max ?? 1))
  )
    return false;
  if (triggers.familyStates && !triggers.familyStates.includes(context.family.state)) return false;
  for (const [kind, threshold] of Object.entries(triggers.minPressures ?? {})) {
    if (threshold !== undefined && context.pressures[kind as PressureKind] < threshold)
      return false;
  }
  if (
    triggers.anyPressures &&
    !triggers.anyPressures.some((threshold) => context.pressures[threshold.kind] >= threshold.min)
  )
    return false;
  if (triggers.minScarcity !== undefined && context.settlement.scarcity < triggers.minScarcity)
    return false;
  if (triggers.maxScarcity !== undefined && context.settlement.scarcity > triggers.maxScarcity)
    return false;
  if (triggers.minUnrest !== undefined && context.settlement.unrest < triggers.minUnrest)
    return false;
  if (
    triggers.maxHealthcare !== undefined &&
    context.settlement.healthcare > triggers.maxHealthcare
  )
    return false;
  if (
    triggers.minProsperity !== undefined &&
    context.settlement.prosperity < triggers.minProsperity
  )
    return false;
  if (
    triggers.maxProsperity !== undefined &&
    context.settlement.prosperity > triggers.maxProsperity
  )
    return false;
  if (
    triggers.minUnemployment !== undefined &&
    context.settlement.unemployment < triggers.minUnemployment
  )
    return false;
  if (
    triggers.activeShockKinds &&
    !context.activeShocks.some((shock) => triggers.activeShockKinds!.includes(shock.kind))
  )
    return false;
  if (triggers.requiresPriorBeat && !triggers.requiresPriorBeat.some((id) => priorBeatIds.has(id)))
    return false;
  if (triggers.requiresMigration && state.internationalMigrations <= 0) return false;
  return true;
}

function weightFor(beat: LifeBeat, mode: LifeTrajectoryMode, premiseTags: string[] = []): number {
  const base =
    mode === 'ordinary' ? beat.weight : beat.weight * Math.max(0.02, 1 + beat.volatilityBias * 1.8);
  const affinities = premiseTags.filter((tag) => beat.tags.includes(tag)).length;
  return base * Math.min(3.5, 1 + affinities * 0.55);
}

function weightedPick<T>(items: T[], weight: (item: T) => number, roll: number): T | undefined {
  if (items.length === 0) return undefined;
  const total = items.reduce((sum, item) => sum + Math.max(0, weight(item)), 0);
  if (total <= 0) return items[0];
  let cursor = clamp(roll, 0, 0.999999999) * total;
  for (const item of items) {
    cursor -= Math.max(0, weight(item));
    if (cursor <= 0) return item;
  }
  return items[items.length - 1];
}

function explainTrigger(
  beat: LifeBeat,
  context: LifeTrajectoryContext,
  state: ProjectedLifeState,
  age: number,
): string[] {
  const reasons = [`age:${age}`, `stage:${beat.stage}`];
  if (beat.triggers.eras) reasons.push(`era:${context.era}`);
  if (beat.triggers.regions) reasons.push(`region:${context.region}`);
  if (beat.triggers.classes) reasons.push(`class:${context.familyClass}`);
  if (beat.triggers.sexes) reasons.push(`sex:${context.sex}`);
  if (beat.triggers.familyStates) reasons.push(`family:${context.family.state}`);
  if (beat.triggers.health)
    reasons.push(
      `health:${state.health.toFixed(2)} in [${beat.triggers.health.min ?? 0},${beat.triggers.health.max ?? 1}]`,
    );
  for (const [kind, threshold] of Object.entries(beat.triggers.minPressures ?? {})) {
    if (threshold !== undefined)
      reasons.push(
        `pressure:${kind}>=${threshold} actual=${context.pressures[kind as PressureKind].toFixed(2)}`,
      );
  }
  for (const threshold of beat.triggers.anyPressures ?? []) {
    if (context.pressures[threshold.kind] >= threshold.min)
      reasons.push(`pressure:${threshold.kind}>=${threshold.min}`);
  }
  if (beat.triggers.minScarcity !== undefined)
    reasons.push(`scarcity>=${beat.triggers.minScarcity}`);
  if (beat.triggers.minUnrest !== undefined) reasons.push(`unrest>=${beat.triggers.minUnrest}`);
  if (beat.triggers.maxHealthcare !== undefined)
    reasons.push(`healthcare<=${beat.triggers.maxHealthcare}`);
  if (beat.triggers.activeShockKinds)
    reasons.push(
      `shock:${beat.triggers.activeShockKinds
        .filter((kind) => context.activeShocks.some((shock) => shock.kind === kind))
        .join(',')}`,
    );
  if (beat.triggers.requiresPriorBeat)
    reasons.push(`prior:${beat.triggers.requiresPriorBeat.join('|')}`);
  if (beat.triggers.requiresMigration) reasons.push('migration:international');
  return unique(reasons);
}

function initialState(
  context: LifeTrajectoryContext,
  person: Person,
  startAge: number,
): ProjectedLifeState {
  const stress =
    0.1 + (context.pressures.war + context.pressures.famine + context.pressures.epidemic) * 0.08;
  return {
    alive: true,
    age: startAge,
    health: context.health,
    wealth: context.classScore,
    safety: clamp(1 - context.vulnerability),
    relationships: context.family.state === 'orphan' ? 0.25 : 0.55,
    education: clamp(0.2 + context.classScore * 0.45),
    stress: clamp(stress),
    stigma: 0,
    addiction: 0,
    fertility: 0.5,
    occupation: startAge >= 12 ? person.occupation : '受抚养者',
    legalStatus: context.family.state === 'orphan' ? 'orphaned' : 'free',
    migrations: 0,
    internationalMigrations: 0,
    disappeared: false,
  };
}

function applyEffects(state: ProjectedLifeState, effects: LifeEffects): void {
  state.health = clamp(state.health + (effects.health ?? 0));
  state.wealth = clamp(state.wealth + (effects.wealth ?? 0));
  state.safety = clamp(state.safety + (effects.safety ?? 0));
  state.relationships = clamp(state.relationships + (effects.relationships ?? 0));
  state.education = clamp(state.education + (effects.education ?? 0));
  state.stress = clamp(state.stress + (effects.stress ?? 0));
  state.stigma = clamp(state.stigma + (effects.stigma ?? 0));
  state.addiction = clamp(state.addiction + (effects.addiction ?? 0));
  state.fertility = clamp(state.fertility + (effects.fertility ?? 0));
  if (effects.occupation) state.occupation = effects.occupation;
  if (effects.legalStatus) state.legalStatus = effects.legalStatus;
  if (effects.migration) {
    state.migrations++;
    if (effects.migration.scope === 'international') state.internationalMigrations++;
  }
}

function pickBranch(
  beat: LifeBeat,
  seed: string,
  personId: string,
  age: number,
  mode: LifeTrajectoryMode,
): LifeBranch {
  const selected = weightedPick(
    beat.branches,
    (item) => item.weight,
    random(seed, personId, 'branch', beat.id, age, mode),
  );
  return selected ?? beat.branches[0];
}

function assignAges(
  beats: LifeBeat[],
  stage: LifeStage,
  stageStart: number,
  stageEnd: number,
  seed: string,
  personId: string,
): Array<{ beat: LifeBeat; age: number }> {
  const sorted = [...beats].sort((a, b) => {
    const midpoint =
      (a.ageWindow.min + a.ageWindow.max) / 2 - (b.ageWindow.min + b.ageWindow.max) / 2;
    return midpoint || a.id.localeCompare(b.id);
  });
  const result: Array<{ beat: LifeBeat; age: number }> = [];
  let cursor = stageStart;
  for (let index = 0; index < sorted.length; index++) {
    const beat = sorted[index];
    const low = Math.max(stageStart, cursor, beat.ageWindow.min);
    const high = Math.min(stageEnd, beat.ageWindow.max);
    if (low > high) continue;
    const remaining = sorted.length - index - 1;
    const latest = Math.max(low, high - remaining);
    const spread = Math.max(1, latest - low + 1);
    const age = low + Math.floor(random(seed, personId, 'age', stage, beat.id) * spread);
    result.push({ beat, age });
    cursor = age + 1;
  }
  return result;
}

function endingFor(
  state: ProjectedLifeState,
  deathAt: number | undefined,
  deathLabel: string | undefined,
  endAge: number,
): LifeTrajectoryEnding {
  if (deathAt !== undefined) {
    return {
      kind: 'dead',
      label: deathLabel ?? '在推演中死亡',
      atAge: deathAt,
      certainty: 'projection',
    };
  }
  if (!state.alive) {
    return {
      kind: 'dead',
      label: deathLabel ?? '在推演中死亡',
      atAge: state.age,
      certainty: 'projection',
    };
  }
  if (state.disappeared) {
    return {
      kind: 'unknown',
      label: '下落不明；归期、死亡与重逢都不能由本底稿断言',
      atAge: endAge,
      certainty: 'projection',
    };
  }
  if (state.legalStatus === 'institutionalized') {
    return {
      kind: 'institutionalized',
      label: '推演结束时仍在机构收容中，未来取决于世界规则',
      atAge: endAge,
      certainty: 'projection',
    };
  }
  if (state.legalStatus === 'criminalized' || state.legalStatus === 'detained') {
    return {
      kind: 'criminalized',
      label: '推演结束时仍受刑罚或案底约束',
      atAge: endAge,
      certainty: 'projection',
    };
  }
  if (state.legalStatus === 'stateless') {
    return {
      kind: 'stateless',
      label: '推演结束时仍无稳定国籍与证件',
      atAge: endAge,
      certainty: 'projection',
    };
  }
  if (state.internationalMigrations > 0) {
    return {
      kind: 'migrated',
      label: '推演结束时已在异地生活，未来仍可被世界事件推翻',
      atAge: endAge,
      certainty: 'projection',
    };
  }
  return {
    kind: 'open',
    label: '推演在既定年龄窗口结束；这不是死亡，也不是保证发生的未来',
    atAge: endAge,
    certainty: 'projection',
  };
}

function drawStage(
  stage: LifeStage,
  stageStart: number,
  stageEnd: number,
  count: number,
  context: LifeTrajectoryContext,
  state: ProjectedLifeState,
  priorBeatIds: Set<string>,
  seed: string,
  personId: string,
  mode: LifeTrajectoryMode,
  premiseTags: string[] = [],
): LifeBeat[] {
  const selected: LifeBeat[] = [];
  const planned = new Set<string>();
  const candidates = LIFE_BEAT_CATALOG.filter((beat) => {
    if (beat.stage !== stage) return false;
    if (beat.ageWindow.max < stageStart || beat.ageWindow.min > stageEnd) return false;
    if (beat.incompatibleWith?.some((id) => priorBeatIds.has(id) || planned.has(id))) return false;
    return triggerMatches(beat, context, state, new Set([...priorBeatIds, ...planned]));
  });
  if (candidates.length === 0) return selected;
  for (let draw = 0; draw < count; draw++) {
    const available = candidates.filter((beat) => !planned.has(beat.id));
    if (available.length === 0) break;
    const picked = weightedPick(
      available,
      (beat) => weightFor(beat, mode, premiseTags),
      random(seed, personId, 'select', stage, draw, mode),
    );
    if (!picked) break;
    selected.push(picked);
    planned.add(picked.id);
  }
  return selected;
}

/**
 * Generate one probabilistic life draft. Pure with respect to `world` and
 * `person`: no mutation, no I/O, no clock read, and no model call. The same
 * world/person/options/seed yields the same object.
 *
 * The result is deliberately provisional. It supplies causal candidates and
 * abstract effects to the simulator, which remains free to ignore, override or
 * kill any projected beat when real world state diverges.
 */
export function generateLifeTrajectory(
  world: World,
  person: Person,
  rawOptions: LifeTrajectoryOptionsInput = {},
): LifeTrajectory {
  const options = LifeTrajectoryOptionsSchema.parse(rawOptions);
  const seed = options.seed ?? `${world.seed}:${person.id}:${world.month}`;
  const startAge = Math.min(109, Math.max(0, options.startAge ?? personAgeYears(world, person)));
  const endAge = Math.max(startAge + 1, Math.min(MAX_END_AGE, options.endAge ?? DEFAULT_END_AGE));
  const context = deriveLifeTrajectoryContext(world, person, seed);
  context.ageYears = startAge;
  context.stage = lifeStageForAge(startAge);
  context.constraints = unique([
    ...context.constraints.filter((constraint) => !constraint.startsWith('stage:')),
    `stage:${context.stage}`,
  ]);

  const state = initialState(context, person, startAge);
  const beats: GeneratedLifeBeat[] = [];
  const priorBeatIds = new Set<string>();
  const possibleEndings = new Map<string, PossibleEnding>();
  let deathAt: number | undefined;
  let deathLabel: string | undefined;
  let deathRolls = 0;

  for (const stage of STAGE_ORDER) {
    if (!state.alive) break;
    if (beats.length >= options.maxBeats) break;
    const range = STAGE_AGE_RANGES[stage];
    const stageStart = Math.max(startAge, range.min);
    const stageEnd = Math.min(endAge, range.max);
    if (stageEnd < stageStart) continue;
    const drawCount = Math.min(STAGE_DRAWS[options.mode][stage], options.maxBeats - beats.length);
    if (drawCount <= 0) continue;
    const selected = drawStage(
      stage,
      stageStart,
      stageEnd,
      drawCount,
      context,
      state,
      priorBeatIds,
      seed,
      person.id,
      options.mode,
      options.premiseTags,
    );
    const aged = assignAges(selected, stage, stageStart, stageEnd, seed, person.id);
    for (const { beat, age } of aged) {
      if (!state.alive) break;
      const branch = pickBranch(beat, seed, person.id, age, options.mode);
      const triggerReasons = explainTrigger(beat, context, state, age);
      const causes = unique([
        ...beat.tags.map((tag) => `tag:${tag}`),
        ...branch.causes,
        ...context.constraints,
        `projection:${options.mode}`,
      ]);
      const generated: GeneratedLifeBeat = {
        beatId: beat.id,
        title: beat.title,
        stage: beat.stage,
        age,
        ageWindow: { ...beat.ageWindow },
        branchId: branch.id,
        branchLabel: branch.label,
        outcome: { ...branch.outcome },
        effects: { ...branch.effects },
        tags: [...beat.tags],
        source: beat.sources.join(' / '),
        historicalBasis: beat.historicalBasis,
        triggerReasons,
        causes,
        volatilityBias: beat.volatilityBias,
      };
      for (const candidate of beat.branches) {
        const key = `${candidate.outcome.kind}|${candidate.outcome.label}`;
        const existing = possibleEndings.get(key);
        if (existing) {
          if (!existing.sourceBeatIds.includes(beat.id)) existing.sourceBeatIds.push(beat.id);
        } else {
          possibleEndings.set(key, {
            kind: candidate.outcome.kind,
            label: candidate.outcome.label,
            sourceBeatIds: [beat.id],
          });
        }
      }

      applyEffects(state, branch.effects);
      state.age = age;
      if (branch.outcome.kind === 'disappearance') state.disappeared = true;
      const risk = clamp(branch.effects.deathRisk ?? (branch.outcome.kind === 'death' ? 1 : 0));
      if (risk > 0) {
        deathRolls++;
        if (random(seed, person.id, 'mortality', beat.id, branch.id, age, options.mode) < risk) {
          state.alive = false;
          state.health = 0;
          deathAt = age;
          deathLabel = branch.outcome.label;
        }
      }
      beats.push(generated);
      priorBeatIds.add(beat.id);
      if (!state.alive) break;
    }
  }

  if (state.alive) state.age = endAge;
  const ending = endingFor(state, deathAt, deathLabel, endAge);
  const warnings: string[] = [];
  if (beats.length === 0)
    warnings.push('该背景与年龄段没有命中的候选 beat；底稿为空而非“无事发生”。');
  if (context.era === 'outside_1900_1950')
    warnings.push('该世界年份在1900–1950历史内容窗口之外，部分时代触发条件不会生效。');
  if (options.mode === 'legendary')
    warnings.push('传奇模式同时提高极端机会与极端风险，不提供主角保护或必然成功。');

  return {
    version: 1,
    seed,
    mode: options.mode,
    worldId: world.id,
    personId: person.id,
    startAge,
    endAge,
    context,
    beats,
    projected: { ...state },
    possibleEndings: [...possibleEndings.values()],
    ending,
    stats: {
      beatCount: beats.length,
      extremeBeatCount: beats.filter((beat) => beat.volatilityBias >= 0.6).length,
      riskBeatCount: beats.filter((beat) => (beat.effects.deathRisk ?? 0) > 0).length,
      migrationCount: state.migrations,
      deathRolls,
      earlyDeath: deathAt !== undefined && deathAt <= 12,
    },
    disclaimer:
      '这是出生时生成的概率化人生底稿，不是保证发生的未来。它只说明在该时代、地区、阶层、性别、家庭与健康条件下，哪些经历更可能发生。世界事件、他人行动、疾病与引擎规则都可以推翻任何未发生分支；已发生的世界历史也不会被此文件改写。',
    warnings,
  };
}
