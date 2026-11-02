/**
 * Chinese labels for the bounded historical vocabulary in packages/v4/domain.ts.
 * Unknown tokens stay visible instead of turning into a blank card.
 */
export const historicalPhaseLabels: Record<string, string> = {
  emerging: '初现',
  mobilizing: '动员',
  confrontation: '对峙',
  institutionalizing: '制度化',
  repression: '压制',
  declining: '衰落',
  ended: '结束',
};

export const historicalRoleLabels: Record<string, string> = {
  leader: '领导者',
  organizer: '组织者',
  participant: '参与者',
  supporter: '支持者',
  opponent: '反对者',
  executor: '执行者',
  perpetrator: '施暴者',
  victim: '受害者',
  witness: '见证者',
  rescuer: '救助者',
  affected: '受影响者',
};

export function historicalPhaseLabel(phase: string): string {
  return historicalPhaseLabels[phase] ?? phase;
}

export function historicalRoleLabel(role: string): string {
  return historicalRoleLabels[role] ?? role;
}

/** Participation influence is bounded 0..1; render it as a whole percentage. */
export function influencePercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value * 100)));
}

/** Relation scores are 0..1. Keep a visible dash for missing values. */
export function relationScoreText(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return `${Math.max(0, Math.min(100, Math.round(value * 100)))}%`;
}
