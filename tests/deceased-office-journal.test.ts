import { expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advance } from '../packages/simulation-core/index.js';
import { createStatePatch, applyStatePatch } from '../packages/storage/patch.js';
import { checksum } from '../packages/storage/index.js';

function freeze(value: unknown) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
}
it('journals a deceased incumbent office change without mutating the previous committed person', () => {
  let w = createWorld('deceased-office-journal');
  w.pack.id = 'earth-succession-fixture';
  w.calendar = { startYear: 1800, mode: 'historical-simulation', sources: [] };
  w.parameters.lifeComplexity = true;
  w = advance(w).world;
  const polity = w.polities[0],
    incumbent = w.persons.find((p) => p.id === polity.leaderId)!;
  const candidate = w.persons.find(
    (p) =>
      p.id !== incumbent.id && p.locationId === incumbent.locationId && w.month - p.birth >= 216,
  )!;
  // A valid seeded post-death snapshot, before its office has found a successor.
  incumbent.death = w.month;
  incumbent.coin = 0;
  incumbent.title = '国家议事代表（模拟）';
  for (const plan of incumbent.plans) if (plan.status === 'active') plan.status = 'failed';
  for (const goal of incumbent.goals) if (goal.status === 'active') goal.status = 'abandoned';
  for (const commitment of incumbent.commitments) commitment.status = 'closed';
  candidate.title = '市议会代表';
  w.politics!.standing[candidate.id] = {
    personId: candidate.id,
    score: 0.8,
    service: 0.5,
    network: 0.3,
    causeIds: w.geopolitics!.governments[polity.id].causeIds,
  };
  const before = structuredClone(w);
  freeze(incumbent);
  const result = advance(w);
  expect(w).toEqual(before);
  expect(result.world.polities[0].leaderId).not.toBe(incumbent.id);
  expect(result.world.persons.find((p) => p.id === incumbent.id)!.title).toBeUndefined();
  expect(result.events.some((e) => e.kind === 'political_succession')).toBe(true);
  const encoded = JSON.parse(JSON.stringify(createStatePatch(before, result.world)));
  expect(checksum(applyStatePatch(before, encoded))).toBe(checksum(result.world));
});
