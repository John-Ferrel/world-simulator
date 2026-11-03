import type { TaskDefinition } from '../domain.js';

/**
 * Two authored adolescence tasks fill a coverage gap the generated apprentice
 * pack cannot cover: a poor pupil who is not yet employed still needs a way to
 * actively look for a trial position and ask an older worker to teach him.
 */
export const VIENNA_EXTRA_TASKS: TaskDefinition[] = [
  {
    id: 'task-vienna-youth-apprenticeship-search',
    version: 1,
    packId: 'vienna-extra-tasks',
    familyId: 'vienna-extra-tasks',
    title: '在印刷厂门口问学徒位置',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 17 },
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 12, maxAge: 17 },
      { key: 'foreman', kind: 'worker', required: true, minAge: 25, maxAge: 70 },
      { key: 'relative', kind: 'neighbor', required: false, minAge: 30, maxAge: 75 },
    ],
    conditions: [
      { kind: 'age', min: 12, max: 17 },
      { kind: 'employment', employed: false },
      { kind: 'cash', max: 60 },
    ],
    tags: ['task', 'task:work', 'work', 'adolescence', 'apprenticeship'],
    triggerMode: 'action',
    rate: 0,
    cooldownYears: 2,
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    outcomes: [
      {
        id: 'trial-promised',
        weight: 1,
        immediateText:
          '{subject}在印刷厂门口等到工头出来，把姓名、住址和会写的字报了一遍。{foreman}让他下周一早来试半天，先不给工钱，只管一顿午饭。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$foreman',
            kind: 'acquaintance',
            trust: 0.04,
            obligation: 0.03,
            reason: 'promised a trial half-day',
          },
          {
            type: 'flag',
            personId: '$subject',
            flag: 'apprenticeship_trial_promised',
            add: true,
            reason: 'received a trial promise',
          },
          {
            type: 'mood',
            personId: '$subject',
            amount: 0.05,
            reason: 'got a chance at a trial',
          },
        ],
      },
      {
        id: 'no-vacancy',
        weight: 1,
        immediateText:
          '{subject}问了三家印刷厂，得到的回答都是“今年不收学徒”。最后一家让他把名字写在纸角上，说有空缺再通知，但谁都知道那张纸会被压在账本下面。',
        effects: [
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.05,
            reason: 'no apprenticeship vacancy',
          },
          {
            type: 'knowledge',
            holderId: '$subject',
            proposition: '今年印刷厂大多不收新学徒。',
            confidence: 0.8,
            sourceKind: 'witnessed',
            visibility: 'private',
            trueInWorld: true,
          },
        ],
      },
    ],
    task: {
      domain: 'work',
      goals: ['survival', 'work'],
      needs: ['cash', 'autonomy'],
      baseUtility: 1.7,
      risk: 0.2,
      skills: ['social'],
    },
  },
  {
    id: 'task-vienna-youth-ask-old-worker',
    version: 1,
    packId: 'vienna-extra-tasks',
    familyId: 'vienna-extra-tasks',
    title: '请老工人教一遍手势',
    stage: 'adolescence',
    ageWindow: { min: 13, max: 17 },
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 13, maxAge: 17 },
      { key: 'oldWorker', kind: 'worker', required: true, minAge: 45, maxAge: 75 },
    ],
    conditions: [
      { kind: 'age', min: 13, max: 17 },
      { kind: 'cash', max: 60 },
      { kind: 'hasRelation', relationKind: 'colleague', minTrust: 0.1 },
    ],
    tags: ['task', 'task:education', 'work', 'apprenticeship', 'learning'],
    triggerMode: 'action',
    rate: 0,
    cooldownYears: 3,
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    outcomes: [
      {
        id: 'lesson-given',
        weight: 1,
        immediateText:
          '{subject}等老工人收拾完字盘，才开口问那道总夹不紧的铅字。{oldWorker}让他把手放低，示范了三遍，又让他自己做一遍；最后只说“明天再练”。',
        effects: [
          {
            type: 'skill',
            personId: '$subject',
            skill: 'craft',
            amount: 0.05,
            reason: 'learned a printing gesture from an older worker',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$oldWorker',
            kind: 'colleague',
            trust: 0.04,
            respect: 0.03,
            reason: 'asked for and received a lesson',
          },
          {
            type: 'knowledge',
            holderId: '$subject',
            proposition: '铅字夹不紧时，先放松手腕再重新上力。',
            confidence: 0.8,
            sourceKind: 'witnessed',
            personId: '$oldWorker',
            visibility: 'private',
            trueInWorld: true,
          },
        ],
      },
      {
        id: 'too-busy',
        weight: 1,
        immediateText:
          '{subject}刚开口，老工人就把字盘推回架子上，说今天还有一版急活。{subject}只好把问题咽回去，站在旁边看了半刻钟，学会的只有怎么把废纸折成垫片。',
        effects: [
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.03,
            reason: 'the older worker was too busy to teach',
          },
          {
            type: 'knowledge',
            holderId: '$subject',
            proposition: '老工人忙的时候，问手艺要等收工以后。',
            confidence: 0.7,
            sourceKind: 'inferred',
            visibility: 'private',
            trueInWorld: true,
          },
        ],
      },
    ],
    task: {
      domain: 'education',
      goals: ['knowledge', 'work'],
      needs: ['knowledge', 'status'],
      baseUtility: 1.4,
      risk: 0.1,
      skills: ['craft', 'social'],
    },
  },
];
