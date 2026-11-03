import {
  ageAt,
  monthIndex,
  type Person,
  type TaskDefinition,
  type WorldDate,
  type WorldState,
} from './domain.js';

/**
 * Utility is deliberately small and inspectable. It is not a planner and it
 * never decides success; it only ranks feasible content-authored tasks against
 * the person's current goal, needs, traits, skills and recent experience.
 */
export function taskUtility(
  world: WorldState,
  person: Person,
  definition: TaskDefinition,
  date: WorldDate,
): number {
  if (person.died) return 0;
  const meta = definition.task;
  const age = ageAt(person, date);
  if (age < definition.ageWindow.min || age > definition.ageWindow.max) return 0;
  const goal = person.agency?.goal;
  const traits = person.traits;
  const skills = person.life?.skills;
  const household = world.households[person.householdId];
  const members = (household?.memberIds ?? [])
    .map((id) => world.persons[id])
    .filter((member): member is Person => Boolean(member) && !member.died);
  const sickKin = members.some(
    (member) =>
      member.id !== person.id &&
      (member.health.vitality < 0.5 || member.health.conditions.length > 0),
  );
  const childKin = members.some((member) => member.id !== person.id && ageAt(member, date) < 12);
  const isMember = Object.values(world.organizations).some(
    (organization) =>
      organization.status === 'active' && organization.memberIds.includes(person.id),
  );
  const capability =
    person.lifeContract?.capability ??
    person.life?.flags.find((flag) => flag.startsWith('capability:'))?.slice(11);

  let score = Math.max(0.1, meta.baseUtility);
  if (goal && meta.goals.includes(goal)) score += 0.85;
  if (isMember) score += meta.needs.includes('belonging') ? 0.35 : 0;
  if ((household?.cash ?? 0) < 5) score += meta.needs.includes('cash') ? 0.7 : 0;
  if ((household?.food ?? 0) < 3) score += meta.needs.includes('food') ? 0.65 : 0;
  if (person.health.vitality < 0.5) score += meta.needs.includes('health') ? 0.75 : 0;
  if (person.health.vitality < 0.3) score -= 0.25;
  if (sickKin) {
    score += meta.needs.includes('care') ? 0.55 : 0;
    score += meta.goals.includes('care') ? 0.25 : 0;
  }
  if (childKin) score += meta.needs.includes('care') ? 0.15 : 0;
  if ((person.life?.reputation ?? 0) < 0) score += meta.needs.includes('status') ? 0.25 : 0;
  if (person.historicalIdentity) {
    score += ['history', 'politics', 'culture', 'knowledge'].includes(meta.domain) ? 0.25 : 0;
  }

  const domain = meta.domain;
  const ambitionBias =
    domain === 'work' || domain === 'politics' || meta.needs.includes('status')
      ? traits.ambition * 0.45
      : domain === 'knowledge' || domain === 'culture' || domain === 'education'
        ? traits.openness * 0.35
        : 0;
  const careBias =
    domain === 'family' || domain === 'health' || meta.needs.includes('care')
      ? traits.care * 0.45
      : 0;
  const disciplineBias =
    domain === 'work' || domain === 'education' ? traits.conscientiousness * 0.25 : 0;
  const socialBias =
    domain === 'social' || domain === 'politics' || domain === 'culture'
      ? traits.extraversion * 0.25 + traits.agreeableness * 0.15
      : 0;
  score += ambitionBias + careBias + disciplineBias + socialBias;

  for (const skill of meta.skills ?? []) {
    score += (skills?.[skill] ?? 0) * 0.55;
  }
  const risk = Math.max(0, Math.min(1, meta.risk ?? 0));
  if (risk > 0) {
    const caution = traits.tradition * 0.45 + traits.conscientiousness * 0.25;
    const exhaustion = Math.max(0, 0.5 - person.health.vitality) * 1.2;
    score -= risk * (0.55 + caution + exhaustion) * 0.9;
  }
  if (meta.capability && capability === meta.capability) score += 0.8;
  if (person.agency?.lastActionKind?.includes(`task:${domain}`)) score *= 0.55;
  if (person.agency?.lastActionKind === 'care_for_kin' && meta.needs.includes('care')) score *= 0.7;
  // A task that requires a relationship or organization is already filtered by
  // casting; do not add a second hidden bonus for merely being available.
  return Math.max(0.05, Math.min(4, score));
}

/** Stable ordering is required for seeded choice and reproducible experiments. */
export function rankTasks(
  world: WorldState,
  person: Person,
  tasks: readonly TaskDefinition[],
  date: WorldDate,
): { definition: TaskDefinition; score: number }[] {
  return tasks
    .map((definition) => ({
      definition,
      score: taskUtility(world, person, definition, date),
    }))
    .filter((entry) => entry.score > 0.1)
    .sort(
      (a, b) =>
        b.score - a.score || a.definition.id.localeCompare(b.definition.id) || monthIndex(date),
    );
}
