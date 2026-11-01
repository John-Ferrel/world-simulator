import { pool } from '../storage/index.js';
import { validateBirthContract, type BirthContract } from './birth-contract.js';
import type { BirthClause, Person, PersonLife } from './domain.js';

/**
 * Persist the full Birth Contract 2.0 into the person payload.
 *
 * This is intentionally separate from the older `applyV4WishReading`: the
 * legacy projection dropped conditions/limits/costs, while the simulator now
 * needs those clauses to weight events and charge real costs. The world and
 * person rows are locked together and the world revision is bumped so a stale
 * simulator snapshot cannot overwrite the compiled contract.
 */
export async function applyV4BirthContract(
  worldId: string,
  personId: string,
  contract: BirthContract,
  model: string,
): Promise<boolean> {
  const safe = validateBirthContract(contract);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const world = (
      await client.query(
        'SELECT revision,date_year,date_month FROM v4_worlds WHERE id=$1 FOR UPDATE',
        [worldId],
      )
    ).rows[0];
    if (!world) throw new Error('world missing');
    const row = (
      await client.query('SELECT payload FROM v4_persons WHERE world_id=$1 AND id=$2 FOR UPDATE', [
        worldId,
        personId,
      ])
    ).rows[0];
    if (!row) throw new Error('person missing');
    const person = row.payload as Person;
    if (!person.lifeContract) throw new Error('person has no life contract');
    // Birth creation stores a placeholder interpretation, so presence of the
    // text alone does not mean a contract was compiled. Only compiledAt marks
    // that trait/skill deltas and the capability flag were already applied.
    const alreadyCompiled = Boolean(person.lifeContract.compiledAt);
    const traits = { ...person.traits };
    const life: PersonLife = {
      mood: person.life?.mood ?? 0,
      reputation: person.life?.reputation ?? 0,
      skills: {
        literacy: person.life?.skills.literacy ?? 0,
        numeracy: person.life?.skills.numeracy ?? 0,
        craft: person.life?.skills.craft ?? 0,
        social: person.life?.skills.social ?? 0,
      },
      flags: [...(person.life?.flags ?? [])],
    };
    if (!alreadyCompiled) {
      // A legacy/partial compile may have left an old capability flag behind.
      // Replace the whole capability slot so event weighting reads only the
      // contract that was actually applied.
      life.flags = life.flags.filter((flag) => !flag.startsWith('capability:'));
      for (const [key, value] of Object.entries(safe.traitDeltas)) {
        if (typeof value !== 'number' || !Number.isFinite(value)) continue;
        const trait = key as keyof typeof traits;
        if (!(trait in traits)) continue;
        traits[trait] = Math.max(
          0,
          Math.min(1, traits[trait] + Math.max(-0.08, Math.min(0.08, value))),
        );
      }
      for (const [key, value] of Object.entries(safe.skillDeltas)) {
        if (typeof value !== 'number' || !Number.isFinite(value)) continue;
        const skill = key as keyof typeof life.skills;
        if (!(skill in life.skills)) continue;
        life.skills[skill] = Math.max(
          0,
          Math.min(1, life.skills[skill] + Math.max(-0.15, Math.min(0.15, value))),
        );
      }
      if (safe.capability !== 'none') life.flags.push(`capability:${safe.capability}`);
    }
    const clauses = (
      values: Array<{ kind: string; text: string; tags: readonly string[]; maxEffect: number }>,
    ): BirthClause[] =>
      values.map((clause) => ({
        kind: clause.kind,
        text: clause.text,
        tags: [...clause.tags],
        maxEffect: clause.maxEffect,
      }));
    const lifeContract = {
      ...person.lifeContract,
      interpretation: safe.interpretation,
      privateGoal: safe.privateGoal,
      focus: safe.focus,
      traitDeltas: safe.traitDeltas,
      skillDeltas: safe.skillDeltas,
      capability: safe.capability,
      taboo: safe.taboo ?? undefined,
      conditions: clauses(safe.conditions),
      limits: clauses(safe.limits),
      costs: clauses(safe.costs),
      compiledBy: model,
      compiledAt: { year: Number(world.date_year), month: Number(world.date_month) },
    };
    await client.query('UPDATE v4_persons SET payload=$3 WHERE world_id=$1 AND id=$2', [
      worldId,
      personId,
      JSON.stringify({ ...person, traits, life, lifeContract }),
    ]);
    await client.query('UPDATE v4_worlds SET revision=revision+1 WHERE id=$1', [worldId]);
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
