import { clamp, type World } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import type { WorldlineEffect } from './index.js';
const seen = new WeakMap<World, number>();
/** Source rules submit bounded effects to the same canonical resolver as other processes. */
export function applyWorldlineEffects(w: World, emit: Emit) {
  const state = w.worldlines;
  if (!state || seen.get(w) === w.month) return;
  seen.set(w, w.month);
  const apply = (e: WorldlineEffect, factor = 1) => {
    if (e.kind === 'end-shock') {
      const q = w.shocks?.find((q) => q.id === e.shockId);
      if (q) q.ends = Math.min(q.ends, w.month);
      return;
    }
    if (e.kind === 'polity-legitimacy-delta' || e.kind === 'polity-military-delta') {
      const p = w.polities.find((p) => p.id === e.polityId);
      if (p) {
        if (e.kind === 'polity-legitimacy-delta')
          p.legitimacy = clamp(p.legitimacy + e.delta * factor);
        else p.military = clamp(p.military + e.delta * factor, 0, 100);
      }
      return;
    }
    for (const s of w.settlements)
      if ((s.regionId ?? s.polityId) === e.countryId) {
        if (e.kind === 'settlement-knowledge-delta')
          s.knowledge = clamp(s.knowledge + e.delta * factor);
        if (e.kind === 'settlement-unrest-delta') s.unrest = clamp(s.unrest + e.delta * factor);
        if (e.kind === 'settlement-healthcare-delta' && s.economy)
          s.economy.healthcare = clamp(s.economy.healthcare + e.delta * factor);
      }
  };
  const due = state.pendingEffects.filter((p) => p.dueMonth <= w.month);
  for (const p of due) {
    if (
      !state.effects.some(
        (m) => m.inputId === p.inputId && m.started <= w.month && m.ends > w.month,
      )
    )
      apply(p.effect);
    emit(
      'worldline_effect_applied',
      [],
      undefined,
      '实际发生的历史过程产生了已验证的后续影响。',
      {
        effectId: p.id,
        inputId: p.inputId,
        effect: p.effect,
        classification: 'simulated-consequence',
      },
      p.causeIds,
      0.6,
    );
  }
  state.pendingEffects = state.pendingEffects.filter((p) => p.dueMonth > w.month);
  for (const m of state.effects)
    if (m.started <= w.month && m.ends > w.month)
      apply(m.effect, 1 / Math.max(1, m.ends - m.started));
}
