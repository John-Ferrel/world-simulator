import { describe, expect, it } from 'vitest';
import {
  historicalPhaseLabel,
  historicalPhaseLabels,
  historicalRoleLabel,
  historicalRoleLabels,
  influencePercent,
  relationScoreText,
} from '../apps/web/src/historicalLabels.js';

describe('historical observer labels', () => {
  it('maps every bounded phase and role to Chinese text', () => {
    expect(Object.keys(historicalPhaseLabels).sort()).toEqual(
      [
        'confrontation',
        'declining',
        'emerging',
        'ended',
        'institutionalizing',
        'mobilizing',
        'repression',
      ].sort(),
    );
    expect(historicalPhaseLabel('mobilizing')).toBe('动员');
    expect(historicalPhaseLabel('institutionalizing')).toBe('制度化');

    expect(historicalRoleLabels).toMatchObject({
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
    });
    expect(historicalRoleLabel('victim')).toBe('受害者');
  });

  it('keeps unknown tokens visible and renders bounded numbers safely', () => {
    expect(historicalPhaseLabel('blocked')).toBe('blocked');
    expect(historicalRoleLabel('observer')).toBe('observer');
    expect(influencePercent(0.126)).toBe(13);
    expect(influencePercent(-1)).toBe(0);
    expect(influencePercent(Number.NaN)).toBe(0);
    expect(relationScoreText(0.8)).toBe('80%');
    expect(relationScoreText(Number.NaN)).toBe('—');
  });
});
