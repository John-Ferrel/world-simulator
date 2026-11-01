import { clamp, type World } from '../../contracts/index.js';
import type { Emit } from '../../simulation-core/index.js';
/** Source events are political opportunities/pressures. Existing treaties and reforms can change their consequences. */
export function historicalWarPressure(
  w: World,
  input: { id: string; title: string; countries: string[]; severity: number },
  causeId: string,
  emit: Emit,
): 'war' | 'crisis' {
  if (!w.parameters.openHistory || !w.geopolitics) return 'war';
  const state = w.geopolitics;
  if (input.countries.length <= 1) {
    const id = input.countries[0],
      gov = state.governments[id],
      polity = w.polities.find((p) => p.id === id);
    if (
      gov &&
      polity &&
      polity.legitimacy > 0.8 &&
      gov.laws.suffrage > 0.5 &&
      gov.laws.labor > 0.45
    ) {
      emit(
        'historical_crisis_mediated',
        [],
        undefined,
        '已有政治参与和劳动保障让新的国内冲突压力进入协商渠道。',
        { sourceId: input.id, polityId: id },
        [causeId, ...gov.causeIds.slice(-2)],
        0.7,
      );
      return 'crisis';
    }
    return 'war';
  }
  for (const relation of Object.values(state.relations)) {
    if (!input.countries.includes(relation.a) || !input.countries.includes(relation.b)) continue;
    const a = state.governments[relation.a],
      b = state.governments[relation.b];
    const freedom = ((a?.laws.pressFreedom ?? 0.2) + (b?.laws.pressFreedom ?? 0.2)) / 2;
    if (relation.status === 'alliance' || relation.status === 'armistice') {
      relation.dispute = clamp(relation.dispute - 0.02, 0, 2);
      continue;
    }
    // Historical pressures raise stakes, while diplomatic action can reduce them before declaration.
    const pressure = 0.3 + input.severity * 0.22 + (1 - freedom) * 0.05;
    relation.dispute = Math.max(relation.dispute, pressure);
    relation.causeIds = [...new Set([...relation.causeIds, causeId])].slice(-16);
    relation.disputeEvidenceId = causeId;
  }
  return 'crisis';
}
/** Attach recorded history to actual wars only when their causal evidence reaches a declared conflict. */
export function synchronizeHistoricalConflicts(w: World) {
  const byCause = new Map<string, NonNullable<World['geopolitics']>['wars']>();
  for (const war of w.geopolitics?.wars ?? [])
    for (const id of war.causeIds) {
      const list = byCause.get(id) ?? [];
      list.push(war);
      byCause.set(id, list);
    }
  for (const q of w.shocks ?? []) {
    if (q.historicalKind !== 'war') continue;
    const wars = byCause.get(q.causeId) ?? [];
    if (!wars.length) continue;
    q.kind = 'war';
    q.actualConflictIds = wars.map((x) => x.id);
    if (wars.every((x) => x.status === 'ended')) q.ends = Math.min(q.ends, w.month);
  }
}
