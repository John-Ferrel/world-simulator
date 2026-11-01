import { it, expect } from 'vitest';
import { createWorld } from '../packages/world-packs/index.js';
import { initializeGeopolitics } from '../packages/geopolitics/index.js';
import {
  historicalWarPressure,
  synchronizeHistoricalConflicts,
} from '../packages/world-packs/earth/pressure.js';
import { historicalDisposition } from '../packages/worldlines/index.js';
import { adoptAgenda, advanceAgency } from '../packages/planning/index.js';
import type { HistoricalEvent, World } from '../packages/contracts/index.js';
const emitFor =
  (w: World, events: HistoricalEvent[]) =>
  (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ) => {
    const e = {
      id: `e${++w.eventSeq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(e);
    for (const id of personIds) {
      const p = w.persons.find((p) => p.id === id);
      if (p)
        p.memories.push({ id: `m-${e.id}`, eventId: e.id, month: w.month, salience: significance });
    }
    return e;
  };
const setup = () => {
  const w = createWorld('open-history');
  w.pack.id = 'earth-test';
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  w.parameters.openHistory = true;
  const events: HistoricalEvent[] = [],
    emit = emitFor(w, events);
  initializeGeopolitics(w, emit);
  return { w, events, emit };
};
it('makes an imported interstate war a negotiable crisis and respects existing alliances', () => {
  const { w, emit } = setup(),
    relation = Object.values(w.geopolitics!.relations)[0],
    input = {
      id: 'source-crisis',
      title: '历史冲突',
      countries: [relation.a, relation.b],
      severity: 0.85,
    };
  expect(historicalWarPressure(w, input, 'documented-source', emit)).toBe('crisis');
  expect(w.geopolitics!.wars).toHaveLength(0);
  expect(relation.causeIds).toContain('documented-source');
  const before = relation.dispute;
  relation.status = 'alliance';
  historicalWarPressure(w, input, 'another-source', emit);
  expect(relation.dispute).toBeLessThan(before);
});
it('allows actual political reform to mediate a domestic conflict instead of forcing its historical outcome', () => {
  const { w, emit } = setup(),
    p = w.polities[0],
    g = w.geopolitics!.governments[p.id];
  p.legitimacy = 0.95;
  g.laws.suffrage = 0.8;
  g.laws.labor = 0.8;
  expect(
    historicalWarPressure(
      w,
      { id: 'domestic', title: '国内冲突', countries: [p.id], severity: 0.9 },
      'source',
      emit,
    ),
  ).toBe('crisis');
  g.laws.labor = 0.1;
  expect(
    historicalWarPressure(
      w,
      { id: 'domestic', title: '国内冲突', countries: [p.id], severity: 0.9 },
      'source',
      emit,
    ),
  ).toBe('war');
});
it('requires an actual declared conflict before a historical war pressure satisfies downstream history', () => {
  const { w } = setup();
  w.month = 1939 * 12 - 1900 * 12 + 8;
  w.shocks = [
    {
      id: 'wwi',
      historicalKind: 'war',
      kind: 'crisis',
      causeId: 'source-wwi',
      locationIds: [],
      started: 174,
      ends: 2000,
      severity: 0.8,
    },
    {
      id: 'versailles',
      kind: 'reform',
      causeId: 'source-treaty',
      locationIds: [],
      started: 200,
      ends: 1000,
      severity: 0.5,
    },
  ];
  w.polities.push({ ...w.polities[0], id: 'DEU' }, { ...w.polities[0], id: 'POL' });
  expect(historicalDisposition(w, { id: 'wwii-europe', date: '1939-09', countries: ['DEU'] })).toBe(
    'branched',
  );
  const war = { id: 'actual-war', status: 'active', causeIds: ['source-wwi'] } as any;
  w.geopolitics!.wars = [war];
  synchronizeHistoricalConflicts(w);
  expect(w.shocks[0].kind).toBe('war');
  expect(w.shocks[0].actualConflictIds).toEqual(['actual-war']);
  expect(historicalDisposition(w, { id: 'wwii-europe', date: '1939-09', countries: ['DEU'] })).toBe(
    'historical',
  );
});
it('executes a model-chosen diplomatic plan only with real authority and changes later war conditions', () => {
  const { w, emit } = setup(),
    rel = Object.values(w.geopolitics!.relations)[0],
    region = w.settlements.find((s) => s.polityId === rel.a)!,
    p = w.persons.find((p) => p.locationId === region.id)!;
  w.polities.find((q) => q.id === rel.a)!.leaderId = p.id;
  p.coin = 20;
  rel.status = 'sanctions';
  rel.dispute = 0.24;
  const e = emit('negotiation_context', [p.id], p.locationId, '外交争端已被观察。');
  adoptAgenda(
    w,
    {
      version: 1,
      jobId: 'diplomatic-plan',
      actorId: p.id,
      actorVersion: p.version,
      deadline: 20,
      intention: '通过协商保住贸易通道',
      rationale: '根据已观察的争端寻求缓和',
      evidenceIds: [e.id],
      steps: [{ action: 'negotiate', targetId: rel.b, label: '与邻国协商贸易安排', months: 1 }],
    },
    emit,
  );
  const before = rel.dispute;
  advanceAgency(w, emit);
  expect(rel.dispute).toBeLessThan(before);
  expect(rel.status).toBe('peace');
});
