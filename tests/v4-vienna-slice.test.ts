import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SEED,
  VIENNA_1912_SCENES,
} from '../packages/v4/content/vienna-1912.js';

function runViennaSlice() {
  let world = structuredClone(VIENNA_1912_SEED);
  const events = [];
  for (let year = 1912; year <= 1918; year++) {
    world = applyViennaTimeline(world);
    const result = advanceV4Year(world, VIENNA_1912_SCENES, {
      economy: { enabled: false },
      maxScenesPerPerson: 1,
    });
    world = result.world;
    events.push(...result.events);
  }
  return { world, events };
}

describe('Vienna 1912 vertical slice', () => {
  it('runs a concrete Anna Bauer life through injury, school and influenza', () => {
    const { world, events } = runViennaSlice();
    const anna = world.persons['person-anna-bauer'];
    expect(anna).toBeDefined();
    expect(events.length).toBeGreaterThan(5);
    const text = events.map((event) => event.immediateText).join('\n');
    expect(text).toContain('Josef');
    expect(text).toContain('房租');
    expect(text).toMatch(/学校|女子中学|作文/);
    expect(text).toContain('Elisabeth');
    expect(text).not.toContain('承担了更多职责');
    expect(text).not.toContain('把一部分时间用在');
    expect(text).not.toContain('一次尝试没有成功');
    expect(
      events.every((event) =>
        event.participants.every((participant) => Boolean(world.persons[participant.personId])),
      ),
    ).toBe(true);
  });

  it('does not let a blocked scene fabricate a character or event', () => {
    const { events } = runViennaSlice();
    expect(events.some((event) => event.immediateText.includes('missing_role'))).toBe(false);
    for (const event of events) {
      expect(event.participants.length).toBeGreaterThan(0);
      expect(event.immediateText.length).toBeGreaterThan(0);
    }
  });
});
