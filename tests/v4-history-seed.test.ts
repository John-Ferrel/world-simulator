import { describe, expect, it } from 'vitest';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { createV4Birth } from '../packages/v4/birth.js';
import { assertWorldV4 } from '../packages/v4/domain.js';

const world = () => applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));

describe('Vienna historical initial world', () => {
  it('installs stable real people and two sourced 1912 processes', () => {
    const w = world();
    assertWorldV4(w);
    for (const id of [
      'person-sigmund-freud',
      'person-victor-adler',
      'person-karl-kraus',
      'person-arthur-schnitzler',
    ]) {
      expect(w.persons[id]).toBeDefined();
      expect(w.persons[id]!.historicalIdentity?.biographyIsNotFate).toBe(true);
      expect(w.persons[id]!.died).toBeUndefined();
      expect(w.persons[id]!.roles).toContain('historical');
    }
    const social = w.macro!.developments!['development:seed-vienna-social-democracy-1912'];
    const psycho = w.macro!.developments!['development:seed-vienna-psychoanalytic-circle-1912'];
    expect(social?.historical?.kind).toBe('social_movement');
    expect(social?.historical?.participants['person-victor-adler']?.roles).toContain('leader');
    expect(psycho?.historical?.kind).toBe('cultural_movement');
    expect(psycho?.historical?.participants['person-sigmund-freud']?.roles).toContain('leader');
    expect(w.macro!.eventPool['vienna-history-social-democracy']).toBeDefined();
  });

  it('keeps curated households out of player-birth family selection', () => {
    const w = world();
    const birth = createV4Birth(
      w,
      {
        name: 'Ordinary Child',
        sex: 'female',
        health: 0.8,
        wish: '过一个普通人的一生。',
        lifeMode: 'ordinary',
        appearance: { skin: 1, hair: 0, clothes: 2 },
      },
      'history-family-check',
      'owner-history-check',
    );
    expect(birth.world.persons[birth.childId]!.householdId).not.toBe('hh-freud');
    expect(birth.world.persons[birth.childId]!.householdId).not.toBe('hh-adler');
    expect(birth.world.persons[birth.childId]!.householdId).not.toBe('hh-kraus');
    expect(birth.world.persons[birth.childId]!.householdId).not.toBe('hh-schnitzler');
  });

  it('is idempotent when applied twice', () => {
    const first = world();
    const second = applyViennaHistoricalWorld(first);
    expect(Object.keys(second.persons)).toHaveLength(Object.keys(first.persons).length);
    expect(Object.keys(second.macro!.developments ?? {})).toHaveLength(
      Object.keys(first.macro!.developments ?? {}).length,
    );
    assertWorldV4(second);
  });
});
