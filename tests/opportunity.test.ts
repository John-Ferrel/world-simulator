import { describe, expect, it } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { advanceAgency } from '../packages/planning/index.js';
import { random } from '../packages/simulation-core/random.js';
import { ensureRuntime } from '../packages/rules/index.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';

function emitFor(w: ReturnType<typeof createWorld>) {
  const events: HistoricalEvent[] = [];
  let seq = 0;
  const emit = (
    kind: string,
    people: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causes: string[] = [],
    significance = 0.5,
  ) => {
    const event: HistoricalEvent = {
      id: `${w.id}:opp${++seq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds: people,
      locationId,
      text,
      data,
      causeIds: causes,
      significance,
    };
    events.push(event);
    return event;
  };
  return { emit, events };
}

describe('LifeProgram and director opportunities', () => {
  it('lets a real person accept an opportunity into an observable agenda', () => {
    const w = createWorld('opportunity-accept');
    w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
    const people = w.persons.filter((p) => p.death === undefined).slice(0, 40);
    const person = people.find(
      (p) => random(w.seed, w.month, p.id, 'opportunity-accept', 'accept') < 0.8,
    )!;
    person.values.care = 1;
    person.values.ambition = 1;
    ensureRuntime(w).opportunities['opportunity-accept'] = {
      id: 'opportunity-accept',
      personId: person.id,
      definitionKey: 'director:test@1',
      title: '参加本地互助讨论',
      action: 'aid',
      dueMonth: w.month + 12,
      status: 'open',
      causeIds: [],
      siteId: person.locationId,
    };
    const { emit, events } = emitFor(w);
    advanceAgency(w, emit);
    const opportunity = ensureRuntime(w).opportunities['opportunity-accept'];
    expect(['taken', 'expired']).toContain(opportunity.status);
    if (opportunity.status === 'taken') {
      expect(w.agency?.agendas[person.id]?.intention).toBe('参加本地互助讨论');
      expect(events.some((event) => event.kind === 'opportunity_taken')).toBe(true);
    } else {
      expect(events.some((event) => event.kind === 'opportunity_declined')).toBe(true);
    }
  });

  it('allows refusal without silently forcing the action', () => {
    const w = createWorld('opportunity-refuse');
    w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
    const people = w.persons.filter((p) => p.death === undefined).slice(0, 80);
    const person = people.find(
      (p) => random(w.seed, w.month, p.id, 'opportunity-refuse', 'accept') > 0.4,
    )!;
    person.values.care = 0;
    person.values.ambition = 0;
    ensureRuntime(w).opportunities['opportunity-refuse'] = {
      id: 'opportunity-refuse',
      personId: person.id,
      definitionKey: 'director:test@1',
      title: '承担一项高成本组织工作',
      action: 'organize',
      dueMonth: w.month + 12,
      status: 'open',
      causeIds: [],
      siteId: person.locationId,
    };
    const { emit, events } = emitFor(w);
    advanceAgency(w, emit);
    const opportunity = ensureRuntime(w).opportunities['opportunity-refuse'];
    expect(opportunity.status).toBe('expired');
    expect(w.agency?.agendas[person.id]).toBeUndefined();
    expect(events.some((event) => event.kind === 'opportunity_declined')).toBe(true);
  });
});
