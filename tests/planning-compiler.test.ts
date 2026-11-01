import { it, expect } from 'vitest';
import { compileAgendaProposal } from '../packages/planning/compiler.js';
const base = {
  version: 1,
  jobId: 'job',
  actorId: 'p',
  actorVersion: 1,
  deadline: 3,
  intention: '改进教学',
  rationale: '根据近期经历',
  evidenceIds: ['real-event'],
};
it('compiles descriptive model verbs transparently into predeclared mechanics', () => {
  const { proposal, compilations } = compileAgendaProposal({
    ...base,
    steps: [
      { action: 'Practice one weekly classroom routine', label: '练习教学', months: 1 },
      { action: 'Research teaching methods', label: '研究方法', months: 2 },
      { action: 'Reflect on routines and adjust notes', label: '反思安排', months: 1 },
    ],
  });
  expect(proposal.steps.map((s) => s.action)).toEqual(['practice', 'research', 'practice']);
  expect(compilations).toHaveLength(3);
});
it('rejects unknown mechanics, executable text and injected effect fields', () => {
  for (const action of ['eval', 'process.exit()', 'SQL DROP TABLE users', 'teleport'])
    expect(() =>
      compileAgendaProposal({ ...base, steps: [{ action, label: '想法', months: 1 }] }),
    ).toThrow();
  expect(() =>
    compileAgendaProposal({
      ...base,
      steps: [{ action: 'research methods', label: '研究', months: 1, effect: { coin: 1e9 } }],
    }),
  ).toThrow();
});
