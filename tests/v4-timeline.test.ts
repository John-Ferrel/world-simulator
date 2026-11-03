import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { monthIndex, type WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';

const scenes = [
  ...VIENNA_1912_SCENES,
  ...VIENNA_LIFE_SCENES,
  ...VIENNA_HISTORY_SCENES,
  ...VIENNA_FAMILY_RUNTIME_SCENES,
  ...GENERATED_SCENES,
];

function world(): WorldState {
  return applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
}

describe('canonical simulation chronology', () => {
  it('never dates a subject event after that subject death and never dates a cause after its consequence', () => {
    let current = world();
    const events: WorldState['events'] = [];
    for (let year = 0; year < 20; year += 1) {
      const result = advanceV4Year(current, scenes, {
        economy: { enabled: true },
        eventRuntime: true,
        agency: true,
        maxOrdinaryEventsPerPerson: 4,
      });
      current = result.world;
      events.push(...result.events);
    }
    for (const event of events) {
      const subject = current.persons[event.subjectId];
      if (subject?.died) {
        expect(
          monthIndex(event.date),
          `${event.action} for ${subject.name} is after death ${subject.died.year}-${subject.died.month}`,
        ).toBeLessThanOrEqual(monthIndex(subject.died));
      }
    }
    const byId = new Map(events.map((event) => [event.id, event]));
    for (const event of events) {
      for (const causeId of event.causes) {
        const cause = byId.get(causeId);
        if (!cause) continue;
        expect(
          monthIndex(cause.date),
          `${cause.action} is later than its consequence ${event.action}`,
        ).toBeLessThanOrEqual(monthIndex(event.date));
      }
    }
  });
});
