import { clamp, type Person, type World } from '../contracts/index.js';
import { isDetained } from '../coercion/index.js';
import type {
  LifeProgram,
  LifeTrajectoryResolution,
  LifeTrajectoryRuntime,
} from '../rules/schema.js';
import type { RuleEmit } from '../rules/runtime.js';
import { generateLifeTrajectory } from './index.js';
import type { GeneratedLifeBeat, LifeTrajectoryMode } from './schema.js';

const MAX_BIRTH_BEATS = 12;

function ageAt(world: World, person: Person) {
  return Math.max(0, Math.floor((world.month - person.birth) / 12));
}

function placeName(world: World, person: Person) {
  return world.settlements.find((site) => site.id === person.locationId)?.name ?? '当地';
}

function addEducation(person: Person, delta: number) {
  if (!person.life || delta === 0) return false;
  const education = person.life.education;
  const previous = education.months;
  education.months = clamp(education.months + delta * 36, 0, 240);
  if (delta < 0) education.level = Math.max(0, Math.min(education.level, 1));
  else if (education.months >= 72) education.level = Math.max(2, education.level);
  else if (education.months >= 36) education.level = Math.max(1, education.level);
  return education.months !== previous;
}

function applySupportedEffects(
  world: World,
  person: Person,
  beat: GeneratedLifeBeat,
): { applied: string[]; skipped: string[] } {
  const applied: string[] = [];
  const skipped: string[] = [];
  const effects = beat.effects;

  if (effects.health !== undefined) {
    const before = person.health;
    person.health = clamp(person.health + effects.health, 0.02, 1);
    if (person.health !== before) applied.push('health');
  }
  if (effects.education !== undefined) {
    if (addEducation(person, effects.education)) applied.push('education');
  }
  if (effects.occupation) {
    person.occupation = effects.occupation;
    if (person.life) {
      person.life.career.role = effects.occupation;
      person.life.career.employed = true;
    }
    applied.push('occupation');
  }
  if (effects.stress !== undefined) {
    person.stress = clamp(person.stress + effects.stress);
    applied.push('stress');
  }
  if (effects.safety !== undefined && person.life) {
    person.life.needs.safety = clamp(person.life.needs.safety + effects.safety);
    applied.push('safety');
  }
  if (effects.wealth !== undefined) {
    const site = world.settlements.find((candidate) => candidate.id === person.locationId);
    if (site) {
      const unit = Math.max(0.5, site.price * 2.5);
      const delta = effects.wealth * unit;
      if (delta > 0) {
        const amount = Math.min(site.coin, delta);
        if (amount > 0.001) {
          site.coin -= amount;
          person.coin += amount;
          applied.push('wealth');
        }
      } else if (delta < 0) {
        const amount = Math.min(person.coin, -delta);
        if (amount > 0.001) {
          person.coin -= amount;
          site.coin += amount;
          applied.push('wealth');
        }
      }
    }
  }
  if (effects.relationships !== undefined && person.relationships.length > 0) {
    let touched = 0;
    for (const relationship of person.relationships.slice(0, 2)) {
      relationship.trust = clamp(relationship.trust + effects.relationships * 0.12, -1, 1);
      relationship.attachment = clamp(relationship.attachment + effects.relationships * 0.08);
      touched++;
    }
    if (touched) applied.push('relationships');
  }
  for (const key of ['stigma', 'addiction', 'fertility', 'migration', 'legalStatus'] as const) {
    if (effects[key] !== undefined) skipped.push(key);
  }
  // A projected death is a hazard, never an execution order. The existing
  // monthly mortality and health systems decide whether the person actually dies.
  if (effects.deathRisk !== undefined) {
    person.health = clamp(person.health - effects.deathRisk * 0.25, 0.02, 1);
    applied.push('deathRisk');
  }
  if (person.life && beat.outcome.kind === 'death' && effects.deathRisk === undefined) {
    person.health = clamp(person.health - 0.2, 0.02, 1);
    applied.push('deathRisk');
  }
  return { applied, skipped };
}

function eventText(world: World, person: Person, beat: GeneratedLifeBeat, age: number) {
  void world;
  // A branch label is an outcome summary; at the moment of the event only its
  // immediate clause is known. Never let a newborn's chapter say "for years"
  // or otherwise borrow a future outcome that has not happened yet.
  const immediate = beat.branchLabel.split(/[，,；;]/)[0]?.trim() || beat.title;
  const occupation =
    beat.effects.occupation && age >= 10 ? `此后以${beat.effects.occupation}为生。` : '';
  const schooling =
    beat.effects.education !== undefined && beat.effects.education < 0 && age >= 5
      ? '读书的路径中断了。'
      : beat.effects.education !== undefined && beat.effects.education > 0 && age >= 5
        ? '又争取到一段读书的时间。'
        : '';
  const condition = (beat.effects.health ?? 0) < -0.1 ? '病后很虚弱。' : '';
  return `${person.name}经历「${beat.title}」：${immediate}。${schooling}${occupation}${condition}`;
}

function resolutionFor(
  beat: GeneratedLifeBeat,
  month: number,
  roll: number,
  applied: string[],
  skipped: string[],
  eventId?: string,
): LifeTrajectoryResolution {
  return {
    beatId: beat.beatId,
    branchId: beat.branchId,
    month,
    eventId,
    roll,
    outcome: beat.outcome.kind,
    applied,
    skipped,
  };
}

/**
 * Advance one stored life trajectory. It never writes a second world: the
 * existing health, education, occupation, event and mortality systems receive
 * real deltas. A projection can be interrupted by death, travel or custody.
 */
export function advanceLifeTrajectory(
  world: World,
  person: Person,
  program: LifeProgram,
  emit: RuleEmit,
): number {
  const runtime = program.lifeTrajectory;
  if (!runtime || runtime.status !== 'active') return 0;
  if (person.death !== undefined) {
    runtime.status = 'interrupted';
    return 1;
  }
  if (person.journey || isDetained(world, person)) return 0;

  const age = ageAt(world, person);
  let changed = 0;
  let guard = 0;
  while (runtime.cursor < runtime.trajectory.beats.length && guard++ < 8) {
    const beat = runtime.trajectory.beats[runtime.cursor]!;
    if (age < beat.age) break;
    if (age > beat.ageWindow.max + 2) {
      runtime.resolved.push(resolutionFor(beat, world.month, 0, [], ['expired']));
      runtime.cursor++;
      changed++;
      continue;
    }

    const { applied, skipped } = applySupportedEffects(world, person, beat);
    if (applied.length === 0) {
      runtime.resolved.push(
        resolutionFor(beat, world.month, 0, [], [...skipped, 'no-supported-effect']),
      );
      runtime.cursor++;
      changed++;
      continue;
    }

    const place = placeName(world, person);
    const event = emit(
      'life_beat',
      [person.id],
      person.locationId,
      eventText(world, person, beat, age),
      {
        trajectoryId: program.id,
        beatId: beat.beatId,
        branchId: beat.branchId,
        outcome: beat.outcome.kind,
        applied,
        skipped,
        age,
        place,
        beatTitle: beat.title,
        immediate: beat.branchLabel.split(/[，,；;]/)[0]?.trim() ?? beat.branchLabel,
        tags: beat.tags,
        historicalBasis: beat.historicalBasis,
        source: beat.source,
        projection: true,
      },
      program.causeIds.slice(-4),
      0.72 + Math.min(0.2, beat.volatilityBias * 0.2),
    );
    runtime.resolved.push(resolutionFor(beat, world.month, 0, applied, skipped, event.id));
    runtime.cursor++;
    changed++;
    break;
  }
  if (runtime.cursor >= runtime.trajectory.beats.length) runtime.status = 'completed';
  return changed;
}

/** Build the private birth-time trajectory. Never throws into the birth transaction. */
export function createLifeTrajectoryRuntime(
  world: World,
  person: Person,
  mode: LifeTrajectoryMode = 'ordinary',
  premiseTags: string[] = [],
): LifeTrajectoryRuntime | undefined {
  try {
    return {
      status: 'active',
      cursor: 0,
      resolved: [],
      trajectory: generateLifeTrajectory(world, person, {
        seed: `${world.seed}:${person.id}:${world.month}:trajectory`,
        mode,
        maxBeats: MAX_BIRTH_BEATS,
        startAge: 0,
        endAge: 85,
        premiseTags,
      }),
    };
  } catch {
    return undefined;
  }
}
