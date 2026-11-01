import { newPerson } from '../../packages/world-packs/index.js';
import type { Person, World } from '../../packages/contracts/index.js';

/** Test-only fixture. The product no longer exposes adult creation. */
export function spawnAdult(
  w: World,
  options: {
    id: string;
    name: string;
    locationId: string;
    age?: number;
    ownerId?: string;
    occupation?: string;
  },
): Person {
  const settlement = w.settlements.find((s) => s.id === options.locationId);
  if (!settlement) throw new Error(`Unknown fixture location ${options.locationId}`);
  if (settlement.cohort.adults < 1) throw new Error('Fixture location has no adult cohort');
  settlement.cohort.adults--;
  const person = newPerson(
    w,
    options.id,
    options.locationId,
    w.persons.length,
    options.age ?? 24,
  );
  person.name = options.name;
  if (options.ownerId) person.ownerId = options.ownerId;
  if (options.occupation) person.occupation = options.occupation;
  w.persons.push(person);
  return person;
}
