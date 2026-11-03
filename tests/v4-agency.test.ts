import { describe, expect, it } from 'vitest';
import { advanceV4Year } from '../packages/v4/engine.js';
import type { WorldState } from '../packages/v4/domain.js';
import { VIENNA_1912_SEED, VIENNA_1912_SCENES } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { refreshAgencyGoal } from '../packages/v4/agency.js';

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

describe('autonomous living world', () => {
  it('lets historical people and ordinary people act, join and change organizations without injected outcomes', () => {
    let current = world();
    const events: WorldState['events'] = [];
    for (let year = 0; year < 10; year += 1) {
      const result = advanceV4Year(current, scenes, {
        economy: { enabled: true },
        eventRuntime: true,
        agency: true,
        maxOrdinaryEventsPerPerson: 4,
      });
      current = result.world;
      events.push(...result.events);
    }
    const agency = events.filter((event) => event.action.startsWith('agency:'));
    expect(agency.length).toBeGreaterThan(20);
    const historicalActors = ['person-sigmund-freud', 'person-victor-adler'];
    for (const id of historicalActors) {
      const person = current.persons[id]!;
      expect(person.agency?.lastAction).toBeDefined();
      expect(agency.some((event) => event.subjectId === id)).toBe(true);
    }
    const social = current.macro!.developments!['development:seed-vienna-social-democracy-1912']!;
    expect(Object.keys(social.historical!.participants).length).toBeGreaterThan(1);
    const union = current.organizations['org-printers-union']!;
    expect(union.memberIds.length).toBeGreaterThan(1);
    const bottomUp = Object.values(current.macro!.developments!).find((development) =>
      development.id.startsWith('development:initiative-org-printers-union-'),
    );
    expect(bottomUp).toBeDefined();
    expect(bottomUp!.historical!.source).toBe('event');
    expect(bottomUp!.historical!.organizationRoles['org-printers-union']).toContain('vehicle');
    expect(
      events.some(
        (event) =>
          event.action.startsWith('initiative:found_process') &&
          event.effects.some((effect) => effect.type === 'historical_process'),
      ),
    ).toBe(true);
    expect(
      agency.some((event) =>
        event.effects.some((effect) => effect.type === 'historical_participation'),
      ),
    ).toBe(true);
  });

  it('is deterministic for the same seed and options', () => {
    const run = () => {
      let current = world();
      for (let year = 0; year < 5; year += 1) {
        current = advanceV4Year(current, scenes, {
          economy: { enabled: true },
          eventRuntime: true,
          agency: true,
          maxOrdinaryEventsPerPerson: 4,
        }).world;
      }
      return JSON.stringify({
        date: current.date,
        agency: Object.values(current.persons)
          .map((person) => [person.id, person.agency])
          .filter((entry) => Boolean(entry[1])),
        processes: Object.values(current.macro?.developments ?? {}).map((development) => [
          development.id,
          development.historical?.phase,
          Object.keys(development.historical?.participants ?? {}).length,
        ]),
        organizations: Object.values(current.organizations).map((organization) => [
          organization.id,
          organization.memberIds.length,
          organization.treasury,
        ]),
      });
    };
    expect(run()).toBe(run());
  });

  it('executes a validated Director action as real projects, relations and events', () => {
    const current = world();
    current.macro!.pendingActions = [
      {
        id: 'macro-action:test:0',
        kind: 'organize',
        actorPersonId: 'person-victor-adler',
        organizationId: 'org-sdap',
        processId: 'development:seed-vienna-social-democracy-1912',
        title: '组织一次工人街区会议',
        description: '由现有党部召集成员，讨论租金、工时和下一次公开集会。',
        intensity: 0.7,
        created: { ...current.date },
        status: 'pending',
        sourceProposalId: 'test-proposal',
      },
    ];
    const result = advanceV4Year(current, scenes, {
      economy: { enabled: true },
      eventRuntime: true,
      agency: false,
      maxOrdinaryEventsPerPerson: 4,
    });
    const event = result.events.find(
      (entry) => entry.action === 'macro_action:macro-action:test:0',
    );
    expect(event).toBeDefined();
    expect(event!.subjectId).toBe('person-victor-adler');
    expect(event!.effects.some((effect) => effect.type === 'project')).toBe(true);
    const project = Object.values(result.world.projects).find(
      (entry) => entry.id === 'project:macro:macro-action:test:0',
    );
    expect(project).toBeDefined();
    expect(project!.participants.length).toBeGreaterThan(0);
    const process =
      result.world.macro!.developments!['development:seed-vienna-social-democracy-1912']!
        .historical!;
    expect(process.participants['person-victor-adler']).toBeDefined();
    expect(process.metrics.support).toBeGreaterThan(0.3);
    expect(result.world.macro!.pendingActions?.[0]?.status).toBe('applied');
    expect(result.world.macro!.pendingActions?.[0]?.eventId).toBe(event!.id);
  });

  it('gives historical people different goals from occupation and public role', () => {
    const current = world();
    const goals = new Map(
      [
        'person-sigmund-freud',
        'person-victor-adler',
        'person-karl-kraus',
        'person-arthur-schnitzler',
      ].map((id) => [id, refreshAgencyGoal(current, current.persons[id]!, current.date).goal]),
    );
    expect(goals.get('person-victor-adler')).toBe('cause');
    expect(goals.get('person-sigmund-freud')).toBe('knowledge');
    expect(new Set(goals.values()).size).toBeGreaterThan(1);
  });
});
