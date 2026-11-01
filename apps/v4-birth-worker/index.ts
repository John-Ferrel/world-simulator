import '../../packages/model/config.js';
import { ageAt, type Person } from '../../packages/v4/domain.js';
import { compileBirthContract } from '../../packages/v4/wish.js';
import { applyV4BirthContract } from '../../packages/v4/birth-contract-store.js';
import {
  claimV4BirthContract,
  finishV4BirthContract,
  loadV4World,
  migrateV4,
} from '../../packages/v4/store.js';

/**
 * Async birth-wish worker. The child already exists and the shared clock keeps
 * running; this process only enriches the saved life contract. A missing key,
 * timeout or invalid JSON leaves the original wish intact and retries at most
 * three times.
 */
await migrateV4();
console.log('v4 birth worker: ready');

let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopped = true;
  });

while (!stopped) {
  const job = await claimV4BirthContract();
  if (!job) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    continue;
  }
  try {
    const world = await loadV4World(job.world_id);
    if (!world) throw new Error('world missing');
    if (world.status !== 'running') {
      await finishV4BirthContract(job.id, 'failed', { error: 'world is archived' });
      continue;
    }
    const person = world.persons[job.person_id];
    if (!person || !person.lifeContract) throw new Error('person or life contract missing');
    const household = world.households[person.householdId];
    const place = world.places[person.locationId];
    const members = (household?.memberIds ?? [])
      .map((id) => world.persons[id])
      .filter((member): member is Person => Boolean(member))
      .map((member) => ({
        name: member.name,
        age: ageAt(member, world.date),
        occupation: member.employment?.occupation,
        relation:
          member.id === person.id
            ? '本人'
            : person.parentIds.includes(member.id)
              ? '父母'
              : member.guardianIds.includes(person.id)
                ? '监护人'
                : member.parentIds.includes(person.id)
                  ? '子女'
                  : '同住',
      }));
    const compiled = await compileBirthContract({
      name: person.name,
      sex: person.sex,
      health: person.health.vitality,
      body: person.health.conditions.find((condition) => condition !== 'newborn'),
      wish: person.lifeContract.originalWish,
      mode: person.lifeContract.mode,
      date: world.date,
      placeName: place?.name,
      household: { members },
    });
    await applyV4BirthContract(job.world_id, job.person_id, compiled.contract, compiled.model);
    await finishV4BirthContract(job.id, 'done', { model: compiled.model });
    console.log(
      JSON.stringify({
        kind: 'v4-wish',
        person: job.person_id,
        model: compiled.model,
        tokens: compiled.tokens,
        focus: compiled.contract.focus,
      }),
    );
  } catch (error) {
    const message = (error as Error).message.slice(0, 500);
    const retry = job.attempts < 3;
    await finishV4BirthContract(job.id, retry ? 'pending' : 'failed', {
      error: message,
    }).catch(() => undefined);
    console.error('v4 birth worker:', retry ? 'retry' : 'failed', message);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
