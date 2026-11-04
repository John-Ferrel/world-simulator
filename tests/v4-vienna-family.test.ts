import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import { createV4Birth } from '../packages/v4/birth.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SCENES,
  VIENNA_1912_SEED,
} from '../packages/v4/content/vienna-1912.js';
import {
  VIENNA_FAMILY_RUNTIME_SCENES,
  VIENNA_FAMILY_SCENES,
} from '../packages/v4/content/vienna-family.js';
import { assertWorldV4, type WorldState } from '../packages/v4/domain.js';
import { defaultMacroState } from '../packages/v4/macro.js';

const scenes = [
  ...VIENNA_FAMILY_RUNTIME_SCENES.filter((scene) => !scene.id.startsWith('vienna-family-same-sex')),
  ...VIENNA_1912_SCENES,
];
const personIds = new Set(Object.keys(VIENNA_1912_SEED.persons));
const householdIds = new Set(Object.keys(VIENNA_1912_SEED.households));
const tokens = new Set([
  '$subject',
  '$mother',
  '$father',
  '$partner',
  '$household',
  '$residence',
  '$school',
  '$workplace',
  '$student',
]);

function runLife() {
  const birth = createV4Birth(
    structuredClone(VIENNA_1912_SEED),
    {
      name: 'Klara',
      sex: 'female',
      health: 0.92,
      wish: '识字，能自己决定要不要进印刷厂。',
      lifeMode: 'ordinary',
      appearance: { skin: 1, hair: 0, clothes: 2, doll: { bodyType: 'female' } },
    },
    'family-integration',
    'owner-family',
  );
  let world: WorldState = birth.world;
  world.macro = defaultMacroState(world);
  const events = [birth.event];
  for (let i = 0; i < 45 && !world.persons[birth.childId]?.died; i++) {
    world = applyViennaTimeline(world);
    const result = advanceV4Year(world, scenes, {
      economy: { enabled: false },
      statisticalModel: false,
      maxScenesPerPerson: 1,
    });
    world = result.world;
    events.push(...result.events);
  }
  return { world, childId: birth.childId, events };
}

describe('family formation content and engine', () => {
  it('has valid ids, roles, tokens and effects', () => {
    expect(VIENNA_FAMILY_SCENES.length).toBe(8);
    expect(new Set(VIENNA_FAMILY_SCENES.map((scene) => scene.id)).size).toBe(
      VIENNA_FAMILY_SCENES.length,
    );
    for (const scene of VIENNA_FAMILY_SCENES) {
      expect(scene.subjectProvenance).toEqual(['birth', 'initial', 'materialized_population']);
      const roleKeys = new Set(scene.roles.map((role) => role.key));
      expect(roleKeys.has('subject')).toBe(true);
      expect(roleKeys.has('partner')).toBe(true);
      for (const outcome of scene.outcomes ?? []) {
        expect(outcome.effects.length).toBeGreaterThan(0);
        for (const effect of outcome.effects) {
          if (effect.type === 'birth') {
            expect(effect.parentIds.length).toBeGreaterThan(0);
            for (const parentId of effect.parentIds)
              expect(tokens.has(parentId) || personIds.has(parentId)).toBe(true);
          }
          if (effect.type === 'household') {
            expect(effect.personId === '$partner' || personIds.has(effect.personId)).toBe(true);
            expect(
              effect.householdId === '$household' || householdIds.has(effect.householdId),
            ).toBe(true);
          }
        }
        for (const match of outcome.immediateText.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)) {
          expect(
            roleKeys.has(match[1]!) ||
              ['subject', 'residence', 'place', 'child'].includes(match[1]!),
          ).toBe(true);
        }
      }
    }
  });

  it('marries a partner, moves them in and creates a real child with a birth fact', () => {
    const { world, childId, events } = runLife();
    const familyEvents = events.filter(
      (event) =>
        event.action.startsWith('vienna-family') &&
        (event.subjectId === childId ||
          event.participants.some((participant) => participant.personId === childId)),
    );
    expect(
      familyEvents.some(
        (event) =>
          event.action.startsWith('vienna-family-partnership') ||
          event.action.startsWith('vienna-family-courtship'),
      ),
    ).toBe(true);
    expect(
      familyEvents.some(
        (event) =>
          event.action.startsWith('vienna-family-childbirth') ||
          event.action.startsWith('vienna-family-fatherhood'),
      ),
    ).toBe(true);

    const parent = world.persons[childId]!;
    const children = Object.values(world.persons).filter((person) =>
      person.parentIds.includes(childId),
    );
    expect(children.length).toBeGreaterThan(0);
    for (const child of children) {
      expect(child.provenance.kind).toBe('birth');
      expect(child.parentIds).toContain(childId);
      expect(child.name).not.toContain('{');
      const birthFact = events.find(
        (event) => event.action === 'birth' && event.subjectId === child.id,
      );
      expect(birthFact).toBeDefined();
      expect(birthFact!.causes.length).toBe(1);
      const cause = events.find((event) => event.id === birthFact!.causes[0]);
      expect(
        cause?.action.startsWith('vienna-family-childbirth') ||
          cause?.action.startsWith('vienna-family-fatherhood'),
      ).toBe(true);
    }
    // A newborn starts in the mother's household, but divorce or a later move
    // can separate the parents. A minor must still have an adult in the home;
    // grandparents are a real Vienna arrangement, so a parent is not required
    // to be physically present after the first move.
    for (const child of children) {
      const household = world.households[child.householdId]!;
      const hasAdult = household.memberIds.some((memberId) => {
        const member = world.persons[memberId];
        return Boolean(member && !member.died && world.date.year - member.born.year >= 18);
      });
      if (!hasAdult) {
        const p = child.parentIds.map((id) => world.persons[id]).find((x) => x && !x.died && world.date.year - x.born.year >= 18);
        const ph = p ? world.households[p.householdId] : undefined;
        console.log('DBG child', child.id, 'hh', child.householdId, 'guardian', p?.id, p?.householdId, 'ph ages', ph?.memberIds.map((id) => world.date.year - world.persons[id]!.born.year), 'ph adults', ph?.memberIds.filter((id) => world.date.year - world.persons[id]!.born.year >= 18).length, 'minor hh cap', household.memberIds.length);
      }
      expect(hasAdult).toBe(true);
    }
    const partner = Object.values(world.relations).find(
      (relation) =>
        relation.kind === 'partner' && (relation.a === childId || relation.b === childId),
    );
    expect(partner).toBeDefined();
    // Interaction ids use embedded `$eventId` refs. They must resolve per event:
    // the old resolver left the literal token, collapsing every courtship onto
    // one interaction and dropping later proposals.
    const interactionIds = Object.values(world.interactions).map((interaction) => interaction.id);
    expect(interactionIds.length).toBeGreaterThan(0);
    for (const id of interactionIds) expect(id).not.toContain('$');
    assertWorldV4(world);
  });

  it('keeps unresolved template tokens out of family logs', () => {
    const { events } = runLife();
    for (const event of events) {
      expect(event.immediateText).not.toContain('{');
      expect(event.immediateText).not.toContain('}');
    }
  });
});
