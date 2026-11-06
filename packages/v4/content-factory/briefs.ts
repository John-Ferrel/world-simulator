import type { StateOwnerType } from '../domain.js';

/**
 * A brief is a request for a bounded content pack, not a script. It names the
 * gap, the state machinery the author may use, and the behaviours the critic
 * will check. A model may propose new states or events; it may not invent a
 * new effect or condition kind.
 */
export type StateContentBrief = {
  id: string;
  title: string;
  domain: string;
  owner: StateOwnerType;
  /** Why the existing content cannot tell this story yet. */
  gap: string;
  /** Concrete mechanical targets, not vibes. */
  requiredBehaviours: string[];
  /** Existing state ids/tags the author should compose with. */
  composeWith: string[];
  /** Suggested new state ids; the author may propose better ones. */
  suggestedStateIds: string[];
  /** Event situations that must be covered. */
  eventSituations: string[];
  /** A checked normal / rare / absurd outcome for each situation. */
  outcomeRequirement: string;
  forbidden: string[];
  /** Used by the deterministic fallback to build a minimal executable scaffold. */
  fallback: {
    stateId: string;
    slot?: string;
    tags: string[];
    durationMonths: [number, number];
    tickText: string;
    reactionTag: string;
    reactionText: string;
  };
};

export const PHASE15_BRIEFS: StateContentBrief[] = [
  {
    id: 'brief-education-continuity',
    title: '教育不是一次性事件',
    domain: 'education',
    owner: 'person',
    gap: 'Phase 14 的奖学金、退学、学徒和大学经常互相覆盖；人物拿到学位后，下一场事件又把他当成没读过书的人。',
    requiredBehaviours: [
      '一个教育状态必须占用 education slot，并在毕业/退学/被开除时留下可追踪转移。',
      '学费、家庭现金、成绩和兼职必须能改变后续结果，而不是只写进文本。',
      '毕业不会自动保证职位；它只改变机会和某些检定。',
      '同一人物不能同时是全职大学生和全职工厂工人。',
    ],
    composeWith: ['university-student', 'apprenticeship-contract', 'factory-employment'],
    suggestedStateIds: ['night-school', 'scholarship-holder', 'thesis-candidate'],
    eventSituations: [
      '贫困但聪明的孩子获得一次入学机会',
      '学费与家庭债务冲突',
      '夜校与全日制工作的 slot 冲突',
      '毕业后的第一份工作与学历不匹配',
    ],
    outcomeRequirement:
      '至少一个正常成功、一个部分成功、一个失败或退学；结果必须改变状态/现金/教育之一。',
    forbidden: ['直接授予职位', '无条件毕业', '只改 mood 的假结果'],
    fallback: {
      stateId: 'night-school',
      slot: 'education',
      tags: ['education', 'night_school', 'work'],
      durationMonths: [12, 36],
      tickText: '{subject}在夜校和工位之间来回；这一年没有退学，也没有真正学会多少。',
      reactionTag: 'unemployment',
      reactionText: '{subject}失业后第一次认真考虑把夜校读到底。',
    },
  },
  {
    id: 'brief-power-and-irony',
    title: '权力愿望：真实权力、傀儡与误认',
    domain: 'politics',
    owner: 'person',
    gap: '自由度最高的愿望目前只被编译成 focus 和几个数值；舞台上的国王与现实中的职位没有被机械地区分。',
    requiredBehaviours: [
      '真实任命必须写入 Position，带 authority；舞台角色只能写 state，不能写 Position。',
      '愿望可以成功、部分成功、反讽地实现或失败；不能每次都反噬。',
      '误认、傀儡职位和字面曲解必须由具体事件/状态组合产生。',
      '权力后果必须影响后续事件资格（position 条件）。',
    ],
    composeWith: ['wish-power', 'stage-king', 'royal-chef', 'political-suspect'],
    suggestedStateIds: ['puppet-office', 'court-favourite'],
    eventSituations: [
      '一个真正的职位空缺',
      '一个只有头衔没有预算的傀儡职位',
      '一场革命中的误认',
      '厨师被指认为沙皇',
    ],
    outcomeRequirement: '至少两种真实获得权力的路径，以及至少两种不获得权力的讽刺路径。',
    forbidden: ['把舞台头衔写成真实 authority', '无条件成为统治者', '所有愿望都必然反噬'],
    fallback: {
      stateId: 'court-favourite',
      slot: 'status',
      tags: ['court', 'power', 'favour'],
      durationMonths: [6, 24],
      tickText: '{subject}仍然被允许站在权力附近，但没有新的任命状。',
      reactionTag: 'humiliation',
      reactionText: '{subject}在公开场合被羞辱；这一次没有头衔可以挡在前面。',
    },
  },
  {
    id: 'brief-secret-intimacy',
    title: '秘密亲密关系与曝光',
    domain: 'family',
    owner: 'person',
    gap: 'Phase 14 的伴侣和孩子会无退出地重置；秘密、曝光和第三者的社会后果没有持续状态。',
    requiredBehaviours: [
      '秘密关系必须持有 lover 链接，而不是只写一个 flag。',
      '曝光必须依赖真实见证者/事件，而不是自动发生。',
      '关系结束、离婚、丧偶和再婚必须有可追踪的退出。',
      '不同受众（配偶、房东、雇主、公众）可以知道不同的事。',
    ],
    composeWith: ['secret-lover', 'public-scandal', 'grief', 'war-widow'],
    suggestedStateIds: ['forbidden-attachment', 'known-affair'],
    eventSituations: [
      '在婚姻中开始的秘密关系',
      '被邻居/同事看见',
      '勒索或政治利用',
      '选择离开家庭或结束关系',
    ],
    outcomeRequirement:
      '至少一个保留关系、一个曝光、一个主动结束；后果必须改变关系/住址/名誉之一。',
    forbidden: ['无退出地替换伴侣', '所有秘密关系都必然被发现', '只写情绪不写关系'],
    fallback: {
      stateId: 'known-affair',
      slot: 'secret',
      tags: ['love', 'scandal', 'secret'],
      durationMonths: [6, 24],
      tickText: '{subject}的私事仍是街谈巷议的一部分，但没有人再当面提起。',
      reactionTag: 'betrayal',
      reactionText: '{subject}发现所谓的秘密早已不是秘密。',
    },
  },
  {
    id: 'brief-curse-and-consequence',
    title: '诅咒、背叛与真实后果',
    domain: 'special',
    owner: 'person',
    gap: '特殊能力人生仍像一段插入的奇观；诅咒没有监听真实背叛、没有目标、没有反噬，也没有普通人的反应。',
    requiredBehaviours: [
      '诅咒必须由真实 betrayal 事件触发，并指向真实 betrayer。',
      '检定成功和失败都要有不同后果；不能只写气氛。',
      '后果必须进入普通关系/调查/恐惧系统，而不是专用引擎分支。',
      '可以被隐藏、被误解、被利用，也可以什么都不发生。',
    ],
    composeWith: ['cursed-by-wish', 'under-investigation', 'public-scandal', 'grief'],
    suggestedStateIds: ['curse-mark', 'suspected-witchcraft'],
    eventSituations: [
      '饭桌上的背叛',
      '背叛者病倒后的调查',
      '无辜者被怀疑',
      '诅咒持有者选择不使用它',
    ],
    outcomeRequirement: '至少一个造成真实伤害、一个反噬、一个被误解/调查；不能每次都成功。',
    forbidden: ['无条件杀死背叛者', '专用传播引擎', '把黑暗结果改写成道德教育'],
    fallback: {
      stateId: 'curse-mark',
      slot: 'special',
      tags: ['curse', 'mark', 'fear'],
      durationMonths: [120, 600],
      tickText: '{subject}身上的记号没有消失；看见它的人反应各不相同。',
      reactionTag: 'betrayal',
      reactionText: '{subject}又听见那声很轻的响；这一次没有人倒下。',
    },
  },
];
