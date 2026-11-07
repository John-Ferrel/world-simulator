import type { AdaptiveContext, SceneCondition } from '../domain.js';

export type AdaptiveContextTotals = {
  weightMultiplier: number;
  checkBonus: number;
  matchedIds: string[];
};

/**
 * Pure adaptive-context evaluation. The engine supplies the condition
 * predicate; this module owns only the bounded arithmetic and deterministic
 * ordering. It is deliberately independent of world state so it can be tested
 * and reused by authoring tools.
 */
export function adaptiveContextTotals(
  contexts: AdaptiveContext[] | undefined,
  matches: (conditions: SceneCondition[]) => boolean,
): AdaptiveContextTotals {
  let weightMultiplier = 1;
  let checkBonus = 0;
  const matchedIds: string[] = [];
  for (const context of contexts ?? []) {
    if (!matches(context.conditions)) continue;
    matchedIds.push(context.id);
    const multiplier = context.weightMultiplier ?? 1;
    if (Number.isFinite(multiplier)) {
      weightMultiplier *= Math.max(0.25, Math.min(4, multiplier));
    }
    const bonus = context.checkBonus ?? 0;
    // A context can contribute both weight and a check modifier; each is
    // bounded independently, then the total check bonus is clamped again.
    if (Number.isFinite(bonus)) {
      checkBonus += Math.max(-10, Math.min(10, bonus));
    }
  }
  return {
    weightMultiplier: Number(Math.max(0.25, Math.min(4, weightMultiplier)).toFixed(4)),
    checkBonus: Math.max(-10, Math.min(10, checkBonus)),
    matchedIds,
  };
}
