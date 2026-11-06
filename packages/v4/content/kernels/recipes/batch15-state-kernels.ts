import type { PlotKernel } from '../../../composition/types.js';
import { recipes, type Fx } from './kit.js';

/**
 * Phase 15 state-consuming kernels.
 *
 * These are ordinary PlotKernels. Their only new vocabulary is the typed
 * state condition/effect; the composer and engine execute them unchanged.
 * The batch deliberately tests: education continuity, apprenticeship, work
 * loss, secret attachment with a typed link, a curse reacting to betrayal,
 * real office vs stage title, organisation state, indirect patronage and a
 * d20 check with different outcomes.
 */

const state = (
  stateId: string,
  parameters?: Record<string, string | number | boolean>,
  links?: Record<string, string>,
  durationMonths?: number,
): Fx['raw'] => [
  {
    type: 'state_add',
    ownerType: 'person',
    ownerId: '$subject',
    stateId,
    ...(parameters ? { parameters } : {}),
    ...(links ? { links } : {}),
    ...(durationMonths !== undefined ? { durationMonths } : {}),
    reason: `${stateId} entered through a committed scene`,
  },
];

const orgState = (
  stateId: string,
  parameters?: Record<string, string | number | boolean>,
): Fx['raw'] => [
  {
    type: 'state_add',
    ownerType: 'organization',
    ownerId: '$employerOrg',
    stateId,
    ...(parameters ? { parameters } : {}),
    reason: `${stateId} placed on an organisation`,
  },
];

export const BATCH15_STATE_KERNELS: PlotKernel[] = recipes([
  {
    id: 'r15-edu.scholarship-grant',
    title: '奖学金名单上的名字',
    domain: 'education',
    stage: 'adulthood',
    ages: [17, 22],
    tags: ['education', 'scholarship', 'university', 'poverty', 'ambition'],
    contexts: ['schooling', 'university', 'reform', 'postwar', 'crisis'],
    conditions: [
      { kind: 'cash', max: 20 },
      { kind: 'notHasState', tag: 'education' },
      { kind: 'notHasRole', role: 'graduate' },
    ],
    cooldownYears: 8,
    weight: 4,
    baseRate: 0.2,
    roles: {
      teacher: ['teacher', { minAge: 24, maxAge: 70 }],
      rival: ['worker', { minAge: 16, maxAge: 20, required: false }],
    },
    outcomes: [
      {
        id: 'full-scholarship',
        w: 0.3,
        text: '{teacher}把一张盖了章的纸推到{subject}面前：学费全免，另有一笔按月发放的补助。{subject}签字时手很稳，回家却在楼梯间坐了很久。那张纸意味着可以继续读书，也意味着每年都要证明自己配得上它。',
        significance: 0.85,
        fx: [
          {
            cash: 6,
            flag: 'scholarship_won',
            reputation: 0.05,
            raw: state('university-student', { scholarship: true, progress: 12 }),
          },
        ],
        followup: { sceneId: 'r15-edu.tuition-crisis', delayMonths: 24 },
      },
      {
        id: 'partial-fee-waiver',
        w: 0.45,
        text: '学校只免一半学费。{subject}把通知单带回家，家里把买冬衣的钱先挪了出来。{teacher}说这已经是好结果，但好结果也要每月付账。',
        significance: 0.7,
        fx: [
          {
            cash: -2,
            flag: 'partial_scholarship',
            mood: -0.03,
            raw: state('university-student', { scholarship: false, progress: 10 }),
          },
        ],
      },
      {
        id: 'lost-to-rival',
        w: 0.25,
        text: '名单上最后一行是{rival}的名字。{teacher}说名额只有一个，作文分差两分。{subject}把准考证折起来，回家路上经过大学门口，没有停。',
        significance: 0.7,
        fx: {
          mood: -0.12,
          flag: 'scholarship_lost',
          raw: [
            {
              type: 'state_add',
              ownerType: 'person',
              ownerId: '$subject',
              stateId: 'failed-apprentice',
              durationMonths: 24,
              reason: 'the scholarship loss narrowed immediate options',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'r15-edu.public-scholarship',
    title: '一张贴在市政厅的考试通知',
    domain: 'education',
    stage: 'adulthood',
    ages: [16, 22],
    tags: ['education', 'scholarship', 'university', 'ambition', 'poverty'],
    contexts: ['schooling', 'university', 'reform', 'postwar', 'crisis', 'peace'],
    weight: 4,
    baseRate: 0.2,
    cooldownYears: 4,
    conditions: [
      { kind: 'attribute', attribute: 'intelligence', min: 0.6 },
      { kind: 'notHasState', tag: 'education' },
      { kind: 'cash', max: 40 },
    ],
    roles: {
      teacher: ['teacher', { minAge: 24, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'won-place',
        w: 0.45,
        text: '{subject}在一张市政厅贴出的考试通知上看见了自己的名字。奖学金不多，但足够交第一年的学费。{teacher}把通知从墙上揭下来，折好交给{subject}，说别弄丢。',
        significance: 0.85,
        fx: [
          {
            cash: 3,
            reputation: 0.04,
            flag: 'public_scholarship',
            raw: state('university-student', { scholarship: true, progress: 10 }),
          },
        ],
        followup: { sceneId: 'r15-edu.tuition-crisis', delayMonths: 18 },
      },
      {
        id: 'place-without-money',
        w: 0.35,
        text: '{subject}考上了，但奖学金只覆盖一半。家里把准备换屋顶的钱先拿了出来。{teacher}说这已经比大多数人幸运，{subject}点头，心里却在算下一年。',
        significance: 0.72,
        fx: [
          {
            cash: -3,
            mood: -0.02,
            flag: 'unfunded_university_place',
            raw: state('university-student', { scholarship: false, progress: 8 }),
          },
        ],
        followup: { sceneId: 'r15-edu.tuition-crisis', delayMonths: 18 },
      },
      {
        id: 'name-missing',
        w: 0.2,
        text: '名单上的人名一行行往下排，{subject}看到最后，没有自己的名字。回家的路上{subject}绕到大学门口，站了一会儿，又走开。',
        significance: 0.6,
        fx: { mood: -0.1, flag: 'public_scholarship_rejected' },
      },
    ],
  },
  {
    id: 'r15-edu.tuition-crisis',
    title: '学费、房租和最后一学期',
    domain: 'education',
    stage: 'adulthood',
    ages: [18, 30],
    tags: ['education', 'university', 'debt', 'poverty', 'student'],
    contexts: ['schooling', 'university', 'reform', 'postwar', 'crisis'],
    conditions: [
      { kind: 'hasState', stateId: 'university-student' },
      { kind: 'cash', max: 6 },
    ],
    roles: {
      teacher: ['teacher', { minAge: 24, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'pay-anyway',
        w: 0.35,
        text: '家里把过冬的煤钱先交了学费。{subject}在注册处拿到收据，回家时厨房比平时冷。没有人抱怨，但那天晚上谁都没多说话。',
        significance: 0.7,
        fx: {
          cash: -6,
          mood: -0.04,
          raw: [
            {
              type: 'state_parameter',
              ownerType: 'person',
              ownerId: '$subject',
              stateId: 'university-student',
              key: 'progress',
              delta: 10,
              reason: 'kept the registration alive',
            },
          ],
        },
      },
      {
        id: 'work-at-night',
        w: 0.35,
        text: '{subject}开始白天上课、晚上在印刷所排字。手指上沾着油墨，第二天在课堂上被老师点名，答得比平时慢。',
        significance: 0.65,
        fx: [
          {
            health: -0.03,
            mood: -0.03,
            skill: { craft: 0.02 },
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'university-student',
                key: 'failures',
                delta: 1,
                reason: 'overwork threatens the course',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-edu.last-term-decision', delayMonths: 18 },
      },
      {
        id: 'leave-for-good',
        w: 0.3,
        text: '{subject}在最后一学期退了学，因为家里再也寄不出钱。{teacher}帮{subject}把宿舍里的书装箱，箱底压着没写完的论文。去车站买票时，{subject}看见同学抱着书从图书馆出来，便转身走进旁边的巷子，等他们走远。',
        significance: 0.85,
        fx: [
          {
            mood: -0.12,
            flag: 'left_university_for_money',
            raw: [
              {
                type: 'state_transition',
                ownerType: 'person',
                ownerId: '$subject',
                fromStateId: 'university-student',
                toStateId: 'university-dropout',
                reason: 'tuition could not be paid',
              },
              {
                type: 'education',
                personId: '$subject',
                status: 'secondary',
                reason: 'left university without a degree',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-edu.scholarship-rescue',
    title: '一笔迟到的助学金',
    domain: 'education',
    stage: 'adulthood',
    ages: [18, 28],
    tags: ['education', 'university', 'scholarship', 'mentor', 'poverty'],
    contexts: ['schooling', 'university', 'reform', 'postwar'],
    conditions: [
      { kind: 'hasState', stateId: 'university-student', parameter: 'scholarship', equals: false },
      { kind: 'history', tag: 'scholarship_lost', maxCount: 0 },
    ],
    roles: {
      teacher: ['teacher', { minAge: 26, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'foundation-grant',
        w: 0.45,
        text: '{teacher}替{subject}找到一笔私人助学金。钱不多，刚好够交下一年的学费。{subject}去办公室道谢时，对方只说：“别让这笔钱白花。”',
        significance: 0.75,
        fx: [
          {
            cash: 5,
            reputation: 0.04,
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'university-student',
                key: 'scholarship',
                value: true,
                reason: 'a private grant covers tuition',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-edu.tuition-crisis', delayMonths: 36 },
      },
      {
        id: 'no-money-left',
        w: 0.3,
        text: '{teacher}写了两封信，都没有回音。{subject}把信纸收进课本，照常去上课。下一年的学费还没有着落。',
        significance: 0.55,
        fx: { mood: -0.04 },
      },
      {
        id: 'mentor-pays-personally',
        w: 0.25,
        text: '{teacher}从自己的薪水里拿出一部分，替{subject}补上学费。{subject}不肯收，{teacher}说这不是礼物，是借。两个人没有写借条，但都记得。',
        significance: 0.8,
        fx: [
          {
            cash: 4,
            relation: ['teacher', 'friend', 0.12, 0.08],
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'university-student',
                key: 'scholarship',
                value: false,
                reason: 'a personal loan, not an institutional grant',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'owes_teacher_tuition',
                add: true,
                reason: 'a private tuition loan',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-edu.last-term-decision',
    title: '论文、夜班和最后一学期',
    domain: 'education',
    stage: 'adulthood',
    ages: [20, 35],
    tags: ['education', 'university', 'student', 'debt', 'mentor'],
    contexts: ['schooling', 'university', 'reform', 'postwar'],
    conditions: [{ kind: 'hasState', stateId: 'university-student' }],
    roles: {
      teacher: ['teacher', { minAge: 26, maxAge: 75, required: false }],
      employer: ['employer', { minAge: 22, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'finish-thesis',
        w: 0.35,
        text: '{subject}把夜班往后推了一个月，把论文写完。答辩那天，{teacher}在门外等到最后。分数不高，但学位是真的。',
        significance: 0.85,
        fx: [
          {
            mood: 0.08,
            reputation: 0.05,
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'university-student',
                key: 'progress',
                delta: 30,
                reason: 'finished the thesis',
              },
            ],
          },
        ],
      },
      {
        id: 'take-the-job',
        w: 0.45,
        text: '{employer}开出的工钱足够付房租。{subject}把论文锁进抽屉，先去上工。最初只说做一年，后来抽屉的钥匙放进了另一个盒子。',
        significance: 0.75,
        fx: [
          {
            employment: ['employer', 'clerk', 3],
            mood: -0.02,
            raw: [
              {
                type: 'state_transition',
                ownerType: 'person',
                ownerId: '$subject',
                fromStateId: 'university-student',
                toStateId: 'university-dropout',
                reason: 'a paid job replaced the final year',
              },
            ],
          },
        ],
      },
      {
        id: 'collapse',
        w: 0.2,
        text: '{subject}在图书馆里睡了一夜，第二天没有去答辩。系里的秘书把材料退回，说下一年还可以重新申请。{subject}把那张表夹进一本从不翻开的书里。',
        significance: 0.7,
        fx: [
          {
            health: -0.05,
            mood: -0.12,
            flag: 'thesis_abandoned',
            raw: [
              {
                type: 'state_transition',
                ownerType: 'person',
                ownerId: '$subject',
                fromStateId: 'university-student',
                toStateId: 'university-dropout',
                reason: 'collapsed before the defence',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-work.master-takes-on',
    title: '师傅收徒',
    domain: 'work',
    stage: 'adolescence',
    ages: [13, 18],
    tags: ['work', 'craft', 'apprentice', 'trade', 'poverty'],
    contexts: ['industrial', 'reform', 'postwar', 'crisis'],
    conditions: [
      { kind: 'notHasState', stateId: 'apprenticeship-contract' },
      { kind: 'notHasState', stateId: 'journeyman' },
      { kind: 'notHasRole', role: 'journeyman' },
      { kind: 'notHasRole', role: 'graduate' },
    ],
    cooldownYears: 6,
    weight: 4,
    baseRate: 0.2,
    roles: {
      master: ['worker', { minAge: 24, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'signed-contract',
        w: 0.5,
        text: '{master}把学徒契约摊在桌上，指给{subject}看期限、工钱和出师考试。{subject}签了名，第二天站到刨床前，手指上多了第一道木刺。',
        significance: 0.8,
        fx: [
          {
            relation: ['master', 'employer', 0.1, 0.04],
            raw: state('apprenticeship-contract', {
              trade: '木工',
              paid: true,
              progress: 10,
            }),
          },
        ],
        followup: { sceneId: 'r15-work.journeyman-test', delayMonths: 24 },
      },
      {
        id: 'unpaid-trial',
        w: 0.3,
        text: '{master}先说试三个月，不给工钱，只管一顿午饭。家里同意了，因为多一张嘴比多一双手更难。{subject}每天最早到，最晚走，三个月后师傅才把契约拿出来。',
        significance: 0.7,
        fx: [
          {
            food: 1,
            mood: -0.04,
            raw: state('apprenticeship-contract', {
              trade: '木工',
              paid: false,
              progress: 8,
            }),
          },
        ],
        followup: { sceneId: 'r15-work.journeyman-test', delayMonths: 36 },
      },
      {
        id: 'turned-away',
        w: 0.2,
        text: '{master}看了看{subject}的手，说太小，拿不稳凿子。{subject}回家没有提这件事，第二天去码头找零工。',
        significance: 0.55,
        fx: { mood: -0.08, flag: 'apprenticeship_refused' },
      },
    ],
  },
  {
    id: 'r15-work.journeyman-test',
    title: '出师考试',
    domain: 'work',
    stage: 'adulthood',
    ages: [17, 30],
    tags: ['work', 'craft', 'apprentice', 'exam', 'journeyman'],
    contexts: ['industrial', 'reform', 'postwar'],
    conditions: [
      { kind: 'hasState', stateId: 'apprenticeship-contract', parameter: 'progress', min: 35 },
    ],
    roles: {
      master: ['worker', { minAge: 24, maxAge: 75 }],
    },
    check: {
      attribute: 'resilience',
      skill: 'craft',
      dc: 11,
      stateBonus: { craft: 1 },
      successOutcomeIds: ['passed', 'passed-with-praise'],
      failureOutcomeIds: ['failed', 'failed-but-kept'],
      criticalSuccessOutcomeIds: ['passed-with-praise'],
      criticalFailureOutcomeIds: ['failed'],
    },
    outcomes: [
      {
        id: 'passed',
        w: 1,
        text: '{subject}把最后一块接榫敲进去，严丝合缝。{master}没有夸，只把成品翻过来看了看底，然后在自己名字旁边写下{subject}的名字。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.06,
            flag: 'passed_journeyman_test',
            raw: [
              {
                type: 'state_transition',
                ownerType: 'person',
                ownerId: '$subject',
                fromStateId: 'apprenticeship-contract',
                toStateId: 'journeyman',
                reason: 'passed the journeyman test',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-work.first-commission', delayMonths: 12 },
      },
      {
        id: 'passed-with-praise',
        w: 0.3,
        text: '{subject}的成品被留在作坊临街的窗台上，路过的人都能看见。{master}说这不是最好的活，但是最像{subject}自己的活。',
        significance: 0.9,
        fx: [
          {
            reputation: 0.1,
            mood: 0.08,
            flag: 'promising_journeyman',
            raw: [
              {
                type: 'state_transition',
                ownerType: 'person',
                ownerId: '$subject',
                fromStateId: 'apprenticeship-contract',
                toStateId: 'journeyman',
                reason: 'passed with unusual work',
              },
            ],
          },
        ],
      },
      {
        id: 'failed',
        w: 1,
        text: '{subject}的接榫敲裂了。{master}把废料扔进柴堆，说再练一年。{subject}没有争辩，晚上留下来把裂口重新刨平。',
        significance: 0.7,
        fx: [
          {
            mood: -0.1,
            flag: 'failed_journeyman_test',
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'apprenticeship-contract',
                key: 'failures',
                delta: 1,
                reason: 'failed the trade test',
              },
            ],
          },
        ],
      },
      {
        id: 'failed-but-kept',
        w: 0.5,
        text: '考试没有通过，但{master}让{subject}继续留在作坊。工钱减半，名字没有从墙上摘下来。{subject}知道这不是仁慈，是缺人。',
        significance: 0.75,
        fx: [
          {
            mood: -0.06,
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'apprenticeship-contract',
                key: 'progress',
                delta: 8,
                reason: 'kept on after a failed test',
              },
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'apprenticeship-contract',
                key: 'failures',
                delta: 1,
                reason: 'a failed test',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-work.first-commission',
    title: '第一笔自己的订单',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['work', 'craft', 'journeyman', 'commerce', 'reputation'],
    contexts: ['industrial', 'reform', 'postwar'],
    conditions: [{ kind: 'hasState', tag: 'journeyman' }],
    roles: {
      customer: ['neighbor', { minAge: 22, maxAge: 80, required: false }],
    },
    outcomes: [
      {
        id: 'paid-in-full',
        w: 0.5,
        text: '{customer}来取货，把工钱一张张数在桌上。{subject}第一次没有经过师傅的手接过钱。晚上收工后，{subject}把工具箱擦了一遍，又把订单簿翻到新的一页。',
        significance: 0.75,
        fx: {
          cash: 4,
          reputation: 0.05,
          mood: 0.06,
          raw: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'first_independent_commission',
              add: true,
              reason: 'first order paid directly',
            },
          ],
        },
      },
      {
        id: 'haggled-down',
        w: 0.35,
        text: '{customer}挑了三处毛病，把价钱压下去一半。{subject}没有争，因为下个月的房租已经到期。成品被搬走时，{subject}看见自己的名字还留在底部。',
        significance: 0.6,
        fx: { cash: 2, mood: -0.03, flag: 'underpaid_first_commission' },
      },
      {
        id: 'kept-for-family',
        w: 0.15,
        text: '{subject}没有把成品卖出去，而是搬回了家。家里有人说这能换钱，{subject}说先放着。那张桌子后来用了很多年。',
        significance: 0.6,
        fx: [
          {
            mood: 0.05,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'kept_first_masterwork',
                add: true,
                reason: 'kept the first independent piece',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-work.factory-hiring',
    title: '工厂门口的长队',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 55],
    tags: ['work', 'factory', 'employment', 'industrial', 'wage'],
    contexts: ['industrial', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'employment', employed: false }],
    weight: 3,
    baseRate: 0.15,
    roles: {
      employer: ['employer', { minAge: 24, maxAge: 75, organizationKind: 'factory' }],
    },
    outcomes: [
      {
        id: 'hired',
        w: 0.5,
        text: '{employer}把{subject}的名字写在班次表上。工钱不高，工时很长，但下个星期开始有固定的收入。{subject}回家时绕路买了一小块肥皂。',
        significance: 0.75,
        fx: [
          {
            employment: ['employer', 'factory worker', 3],
            raw: state('factory-employment', { wage: 3, seniority: 0 }),
          },
        ],
      },
      {
        id: 'hired-on-probation',
        w: 0.3,
        text: '工厂只肯先签六周。{employer}说干得好再续，干不好随时走。{subject}点头，把这句话记在心里，也记住了门口那块写着“本厂不负责任何工伤”的牌子。',
        significance: 0.65,
        fx: [
          {
            employment: ['employer', 'factory worker', 2],
            mood: -0.02,
            raw: state('factory-employment', { wage: 2, seniority: 0 }, undefined, 6),
          },
        ],
      },
      {
        id: 'turned-away',
        w: 0.2,
        text: '招工的人扫了一眼{subject}的鞋，说今天满了。{subject}在门口站到中午，看见后来的人被领进去，才转身离开。',
        significance: 0.55,
        fx: { mood: -0.08, flag: 'factory_rejected' },
      },
    ],
  },
  {
    id: 'r15-work.foreman-blacklist',
    title: '工头的小本子',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['work', 'factory', 'union', 'blacklist', 'politics', 'employment'],
    contexts: ['industrial', 'war', 'crisis', 'postwar'],
    conditions: [
      { kind: 'hasState', stateId: 'factory-employment' },
      { kind: 'hasRole', role: 'union_member' },
    ],
    roles: {
      foreman: ['employer', { minAge: 26, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'blacklisted',
        w: 0.45,
        text: '{foreman}把{subject}的名字从班次表上划掉，又在另一本册子上写了一遍。没有解雇通知，只有一句“下个月不用来了”。{subject}去别的厂问，门房都说没有空位。',
        significance: 0.8,
        fx: [
          {
            unemployment: true,
            mood: -0.1,
            raw: state('blacklisted', { reason: 'union activity', severity: 0.7 }),
          },
        ],
        followup: { sceneId: 'r15-work.blacklist-echo', delayMonths: 18 },
      },
      {
        id: 'warned-only',
        w: 0.35,
        text: '{foreman}没有划掉名字，只把{subject}叫到机器后面，说再替工会说话就自己走。{subject}回到工位，手上的活没有停，但那天没有再说一句话。',
        significance: 0.65,
        fx: [
          {
            mood: -0.05,
            flag: 'union_warning',
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'political-suspect',
                parameters: { heat: 0.35, file: 'factory foreman note' },
                reason: 'the foreman started a file',
              },
            ],
          },
        ],
      },
      {
        id: 'collective-refusal',
        w: 0.2,
        text: '整个班组在早班前把工具放下了。{foreman}骂了几句，最后没有划掉任何人的名字。{subject}第一次看见“一个人被开除”可以变成“所有人一起停下”。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.06,
            relation: ['foreman', 'rival', -0.1, -0.05],
            raw: [
              {
                type: 'state_add',
                ownerType: 'organization',
                ownerId: '$employerOrg',
                stateId: 'strike-wave',
                parameters: { demands: '撤回黑名单', strength: 0.55 },
                reason: 'a spontaneous walkout',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-work.blacklist-echo',
    title: '黑名单上的旧名字',
    domain: 'work',
    stage: 'adulthood',
    ages: [20, 65],
    tags: ['work', 'blacklist', 'union', 'employment', 'stigma'],
    contexts: ['industrial', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', stateId: 'blacklisted' }],
    roles: {
      employer: ['employer', { minAge: 24, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'small-shop-takes-him',
        w: 0.4,
        text: '{employer}的小作坊不看黑名单，只看手。工钱比大厂低两成，没有保险，但{subject}又有了每天要去的地方。',
        significance: 0.7,
        fx: [
          {
            employment: ['employer', 'workshop hand', 2],
            mood: 0.05,
            raw: [
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                reason: 'a small workshop ignored the blacklist',
              },
            ],
          },
        ],
      },
      {
        id: 'still-shut-out',
        w: 0.4,
        text: '每一家厂都说没有空位。{subject}最后在火车站替人搬行李，按件收钱。没有人问名字，也没有人问过去。',
        significance: 0.6,
        fx: { cash: 1, mood: -0.04, flag: 'informal_work_after_blacklist' },
      },
      {
        id: 'blacklist-lifted',
        w: 0.2,
        text: '工会替{subject}谈了一次。厂方没有道歉，只把名字从册子上划掉。{subject}回到车间时，机器还是那几台，工头换了人。',
        significance: 0.75,
        fx: [
          {
            employment: ['employer', 'factory worker', 3],
            raw: [
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                reason: 'the blacklist was lifted',
              },
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'factory-employment',
                parameters: { wage: 3, seniority: 0 },
                reason: 'rehired after the blacklist',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-love.forbidden-attachment',
    title: '不能带到饭桌上的名字',
    domain: 'family',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['love', 'intimacy', 'secret', 'courtship', 'family'],
    contexts: ['peace', 'war', 'crisis', 'postwar'],
    conditions: [
      { kind: 'hasRelation', relationKind: 'partner', minTrust: 0.2 },
      { kind: 'notHasState', tag: 'secret' },
    ],
    weight: 3,
    baseRate: 0.2,
    cooldownYears: 4,
    roles: {
      lover: ['neighbor', { minAge: 18, maxAge: 50, required: true }],
    },
    outcomes: [
      {
        id: 'begins',
        w: 0.5,
        text: '{subject}和{lover}开始在咖啡馆后门见面。每次只有半个钟头，说的都是不能在家里说的话。{subject}回家前会在街角站一会儿，把围巾重新系好。',
        significance: 0.8,
        fx: [
          {
            relation: ['lover', 'friend', 0.15, 0.18],
            mood: 0.06,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'secret-lover',
                parameters: { intensity: 0.6, exposed: false },
                links: { lover: '$lover' },
                reason: 'a secret attachment began',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-love.exposure', delayMonths: 12 },
      },
      {
        id: 'refused',
        w: 0.3,
        text: '{lover}在第三次见面时说不能再这样。{subject}没有挽留，只把对方落下的手套收进抽屉。后来每次打开抽屉，都能看见那双手套。',
        significance: 0.65,
        fx: [
          {
            mood: -0.08,
            relation: ['lover', 'acquaintance', 0.02, 0],
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'secret_love_refused',
                add: true,
                reason: 'the attachment ended before it began',
              },
            ],
          },
        ],
      },
      {
        id: 'chose-family',
        w: 0.2,
        text: '{subject}没有去后门。那天晚上，{subject}把{lover}写的纸条烧了，灰倒进厨房的水槽。第二天在楼梯间碰见，两个人都点了头。',
        significance: 0.7,
        fx: [
          {
            mood: -0.06,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'chose_family_over_lover',
                add: true,
                reason: 'the attachment was not pursued',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-love.exposure',
    title: '被看见的两个人',
    domain: 'family',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['love', 'secret', 'scandal', 'family', 'reputation'],
    contexts: ['peace', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', stateId: 'secret-lover' }],
    roles: {
      witness: ['neighbor', { minAge: 18, maxAge: 80, required: false }],
      lover: ['neighbor', { minAge: 18, maxAge: 55, required: false }],
    },
    outcomes: [
      {
        id: 'seen',
        w: 0.35,
        text: '{witness}在街角看见{subject}和{lover}并肩走。第二天，邻居的问话里多了一个不该出现的名字。{subject}没有否认，也没有解释。',
        significance: 0.8,
        fx: [
          {
            reputation: -0.08,
            mood: -0.06,
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'secret-lover',
                key: 'exposed',
                value: true,
                reason: 'the attachment was seen',
              },
            ],
          },
        ],
      },
      {
        id: 'denied',
        w: 0.4,
        text: '被问到的时候，{subject}说只是顺路。{witness}没有再追问，但从此每次见面都多看一眼。{lover}后来问起，{subject}只说“没事”。',
        significance: 0.65,
        fx: [
          {
            mood: -0.04,
            raw: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'secret-lover',
                key: 'intensity',
                delta: -0.1,
                reason: 'the secret became more cautious',
              },
            ],
          },
        ],
      },
      {
        id: 'chose-to-leave',
        w: 0.25,
        text: '{subject}没有再回家。{lover}在车站等着，两个人的行李都不多。{subject}把那串钥匙留在门垫下面，没有留字条。',
        significance: 0.85,
        fx: [
          {
            mood: 0.04,
            reputation: -0.06,
            flag: 'left_household_for_lover',
            raw: [
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'secret-lover',
                reason: 'the secret became an open departure',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-curse.betrayal-at-table',
    title: '饭桌上的背叛',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['betrayal', 'social', 'family', 'trust', 'secret'],
    contexts: ['peace', 'war', 'crisis', 'postwar'],
    weight: 3,
    baseRate: 0.18,
    roles: {
      betrayer: ['neighbor', { minAge: 16, maxAge: 80, required: true }],
      witness: ['neighbor', { minAge: 16, maxAge: 80, required: false }],
    },
    outcomes: [
      {
        id: 'sold-a-secret',
        w: 0.4,
        text: '{betrayer}把{subject}在饭桌上说过的名字和地址卖给了别人。几天后，{subject}发现自己的话出现在一封不该出现的信里。{betrayer}没有否认，只说“大家都要活”。',
        significance: 0.85,
        fx: [
          {
            mood: -0.12,
            relation: ['betrayer', 'rival', -0.2, -0.1],
            flag: 'betrayed_after_trusting',
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'under-investigation',
                parameters: { progress: 15, charge: '泄露政治言论' },
                reason: 'a trusted person sold information',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-curse.aftermath', delayMonths: 6 },
      },
      {
        id: 'took-the-room',
        w: 0.3,
        text: '{betrayer}趁{subject}不在，把租约上的名字改成了自己。{subject}回家时，门口多了一只不属于自己的箱子；{betrayer}站在门里，说房东已经同意。',
        significance: 0.9,
        fx: [
          {
            mood: -0.14,
            relation: ['betrayer', 'rival', -0.25, -0.15],
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'home_taken_by_betrayal',
                add: true,
                reason: 'the home was taken through a betrayal',
              },
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'grief',
                parameters: { loss: '住处', years: 0 },
                reason: 'loss of home',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-curse.aftermath', delayMonths: 6 },
      },
      {
        id: 'lie-that-stuck',
        w: 0.3,
        text: '{betrayer}告诉所有人{subject}偷了东西。没有人找到赃物，但每个人都在传。{subject}去市场时，摊主把零钱放在柜台上，不再递到手里。',
        significance: 0.8,
        fx: [
          {
            reputation: -0.1,
            mood: -0.08,
            relation: ['betrayer', 'rival', -0.15, -0.08],
            flag: 'false_accusation',
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'public-scandal',
                reason: 'a false accusation became public',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-curse.aftermath', delayMonths: 6 },
      },
    ],
  },
  {
    id: 'r15-curse.aftermath',
    title: '墙里的一声响',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['curse', 'fear', 'supernatural', 'revenge'],
    contexts: ['peace', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', stateId: 'cursed-by-wish' }],
    roles: {
      betrayer: ['neighbor', { minAge: 16, maxAge: 80, required: false }],
      investigator: ['official', { minAge: 24, maxAge: 70, required: false }],
    },
    outcomes: [
      {
        id: 'fear-spreads',
        w: 0.35,
        text: '{betrayer}病倒以后，楼里开始有人避开{subject}。没有人说是诅咒，但每个人都在数{subject}最近和谁说过话。',
        significance: 0.75,
        fx: [
          {
            reputation: -0.04,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'curse_suspected',
                add: true,
                reason: 'people connect the curse to the illness',
              },
            ],
          },
        ],
      },
      {
        id: 'investigation',
        w: 0.3,
        text: '{investigator}来问过一次话。问题围绕{betrayer}的病，也围绕{subject}最近有没有说过什么威胁的话。{subject}如实回答，{investigator}把每个名字都写进了本子。',
        significance: 0.7,
        fx: [
          {
            mood: -0.05,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'under-investigation',
                parameters: { progress: 10, charge: '疑似投毒' },
                reason: 'an unexplained illness attracted attention',
              },
            ],
          },
        ],
      },
      {
        id: 'quiet-mercy',
        w: 0.35,
        text: '{betrayer}病好以后来敲过门。两个人隔着门槛站了很久。{subject}没有说原谅，只把一包药放在对方手里。{betrayer}走后，{subject}把门关上，背靠着它坐了一会儿。',
        significance: 0.85,
        fx: [
          {
            mood: 0.05,
            relation: ['betrayer', 'acquaintance', 0.05, 0.03],
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'curse_mercy',
                add: true,
                reason: 'the curse was not answered with another blow',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-wish.power-offer',
    title: '一张空着的椅子',
    domain: 'politics',
    stage: 'adulthood',
    ages: [20, 65],
    tags: ['politics', 'power', 'wish', 'office', 'status'],
    contexts: ['reform', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', tag: 'wish:power' }],
    weight: 5,
    baseRate: 0.25,
    cooldownYears: 3,
    roles: {
      patron: ['official', { minAge: 28, maxAge: 75 }],
      organization: ['organization', { organizationKind: 'party' }],
      rival: ['official', { minAge: 26, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'real-appointment',
        w: 0.25,
        text: '{patron}把一份任命书推到{subject}面前。职位不大，但有印章、有预算、有能签字的地方。{subject}签下名字时，第一次觉得那件一直想着的事有了一个可以摸到的边。',
        significance: 0.9,
        fx: [
          {
            reputation: 0.12,
            raw: [
              {
                type: 'position',
                organizationId: '$organization',
                title: '部门主管',
                holderId: '$subject',
                wage: 8,
                authority: ['签字', '预算', '人事'],
                reason: 'a real appointment with budget and authority',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-wish.power-intrigue', delayMonths: 18 },
      },
      {
        id: 'puppet-office',
        w: 0.35,
        text: '报纸把{subject}称作“新任主席”，照片很大，办公室很漂亮。真正的决定在另一间屋里做出。{subject}每天签字，签的都是别人写好的东西。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.08,
            mood: -0.04,
            raw: [
              {
                type: 'position',
                organizationId: '$organization',
                title: '名誉主席',
                holderId: '$subject',
                wage: 4,
                authority: [],
                reason: 'a title without real authority',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'puppet_office',
                add: true,
                reason: 'a real title with no authority',
              },
            ],
          },
        ],
      },
      {
        id: 'stage-understudy',
        w: 0.2,
        text: '正式职位没有落到{subject}头上，但剧院正在排一出关于权力的戏。{patron}说{subject}的形象合适，可以在舞台上扮演那位即将被处决的国王。',
        significance: 0.8,
        fx: [
          {
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'stage-king',
                parameters: { role: '被处决的国王', audience: 400 },
                durationMonths: 3,
                reason: 'cast as a king on stage',
              },
              {
                type: 'reputation',
                personId: '$subject',
                amount: 0.05,
                reason: 'a visible stage role',
              },
            ],
          },
        ],
      },
      {
        id: 'mistaken-identity',
        w: 0.15,
        text: '一个代表团走错了房间，把{subject}当成新来的部长，围着说了十分钟的请求。{subject}没有纠正。等人走后，{subject}坐在那张不属于自己的椅子上，听见走廊里有人在找真正的部长。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.04,
            mood: 0.02,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'stage-king',
                parameters: { role: '被误认的部长', audience: 12 },
                durationMonths: 2,
                reason: 'a delegation mistook the person for an official',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'mistaken_for_official',
                add: true,
                reason: 'mistaken identity',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-wish.found-faction',
    title: '一间借来的办公室',
    domain: 'politics',
    stage: 'adulthood',
    ages: [20, 60],
    tags: ['politics', 'power', 'wish', 'organization', 'office', 'status'],
    contexts: ['reform', 'war', 'crisis', 'postwar', 'peace'],
    conditions: [{ kind: 'hasState', tag: 'wish:power' }],
    weight: 5,
    baseRate: 0.25,
    cooldownYears: 3,
    roles: {
      ally: ['neighbor', { minAge: 20, maxAge: 70, required: false }],
      official: ['official', { minAge: 26, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'founded',
        w: 0.4,
        text: '{subject}和{ally}在咖啡馆后间成立了一个小小的政治俱乐部。桌子是借的，章程是手写的，但签名、印章和一间可以锁门的办公室是真的。{official}没有到场，只送来一句“先看看你们能撑多久”。',
        significance: 0.88,
        fx: [
          {
            cash: -2,
            reputation: 0.06,
            raw: [
              {
                type: 'organization_found',
                organization: {
                  id: 'org:r15-faction:$eventId',
                  name: '权力俱乐部',
                  kind: 'party',
                  treasury: 1,
                  authorityRules: ['founder chairs meetings', 'members vote on admissions'],
                },
                reason: 'founded a small political club',
              },
              {
                type: 'position',
                organizationId: 'org:r15-faction:$eventId',
                title: '发起人',
                holderId: '$subject',
                wage: 0,
                authority: ['召集会议', '签署决议'],
                reason: 'the founder holds the only real office',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-wish.faction-price', delayMonths: 12 },
      },
      {
        id: 'took-over-a-club',
        w: 0.35,
        text: '一个快要散掉的政治俱乐部让{subject}接手。会员只剩十一个人，欠着两个月房租，但那间办公室的门牌还挂着。{subject}在第一次会上没有讲理想，只把账本翻开。',
        significance: 0.8,
        fx: [
          {
            reputation: 0.04,
            raw: [
              {
                type: 'organization_found',
                organization: {
                  id: 'org:r15-club:$eventId',
                  name: '接手后的俱乐部',
                  kind: 'party',
                  treasury: 0,
                  authorityRules: ['chair sets the agenda'],
                },
                reason: 'took over a dying political club',
              },
              {
                type: 'position',
                organizationId: 'org:r15-club:$eventId',
                title: '临时主席',
                holderId: '$subject',
                wage: 0,
                authority: ['召集会议'],
                reason: 'acting chair of a dying club',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-wish.faction-price', delayMonths: 12 },
      },
      {
        id: 'nobody-came',
        w: 0.25,
        text: '第一次会议只来了三个人，其中一个是房东，来问房租。{subject}把章程念完，没有人反对，也没有人加入。办公室的钥匙还在，但那间屋子比街上更安静。',
        significance: 0.7,
        fx: [
          {
            mood: -0.08,
            reputation: -0.02,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'faction_failed_to_form',
                add: true,
                reason: 'the political club never formed',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-wish.faction-price',
    title: '俱乐部里的第二把椅子',
    domain: 'politics',
    stage: 'adulthood',
    ages: [21, 70],
    tags: ['politics', 'power', 'wish', 'organization', 'intrigue', 'office'],
    contexts: ['reform', 'war', 'crisis', 'postwar', 'peace'],
    conditions: [{ kind: 'position', titleIncludes: '发起人' }],
    roles: {
      rival: ['official', { minAge: 24, maxAge: 75, required: false }],
      member: ['neighbor', { minAge: 18, maxAge: 70, required: false }],
    },
    outcomes: [
      {
        id: 'grew',
        w: 0.4,
        text: '俱乐部从十一人变成四十人。{subject}仍然坐主席的位置，但每次开会前都要先和{member}对一遍名单。有人开始叫{subject}“主席”，也有人只在需要签字时才来。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.08,
            raw: [
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: '俱乐部扩大后，真正的权力不在主席的椅子上，而在会前对名单的修改。',
                confidence: 0.7,
                sourceKind: 'witnessed',
                visibility: 'private',
                trueInWorld: true,
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'faction_grew',
                add: true,
                reason: 'the club grew',
              },
            ],
          },
        ],
      },
      {
        id: 'split',
        w: 0.35,
        text: '俱乐部在一次表决中分裂。{rival}带走了将近一半的人，留下的那间办公室突然显得很大。{subject}把两把没人坐的椅子搬到墙边，没有扔掉。',
        significance: 0.8,
        fx: [
          {
            reputation: -0.05,
            mood: -0.08,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'faction_split',
                add: true,
                reason: 'the club split',
              },
            ],
          },
        ],
      },
      {
        id: 'absorbed',
        w: 0.25,
        text: '一个更大的组织提出合并。{subject}保住了“副主席”的头衔，但新的章程把召集权交给了别人。签字那天，{subject}把自己的印章留在旧办公室的抽屉里。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.05,
            mood: -0.04,
            raw: [
              {
                type: 'position',
                title: '发起人',
                holderId: '$subject',
                remove: true,
                reason: 'the club was absorbed and the founder lost the chair',
              },
              {
                type: 'flag',
                personId: '$subject',
                flag: 'absorbed_into_larger_org',
                add: true,
                reason: 'the club was absorbed',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-wish.power-intrigue',
    title: '权力走廊里的第二次谈话',
    domain: 'politics',
    stage: 'adulthood',
    ages: [22, 70],
    tags: ['politics', 'power', 'wish', 'intrigue', 'office'],
    contexts: ['reform', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', tag: 'wish:power' }],
    roles: {
      rival: ['official', { minAge: 26, maxAge: 75 }],
      patron: ['official', { minAge: 28, maxAge: 80, required: false }],
    },
    outcomes: [
      {
        id: 'outmaneuvered',
        w: 0.4,
        text: '{rival}在会议上先一步拿到了多数。{subject}的提案被改成一段附注，连名字都没有留下。散会后，{subject}在走廊里站了一会儿，然后去下一间办公室。',
        significance: 0.75,
        fx: [
          {
            reputation: -0.05,
            mood: -0.06,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'political-suspect',
                parameters: { heat: 0.3, file: '内部竞争记录' },
                reason: 'a rival opened a file',
              },
            ],
          },
        ],
      },
      {
        id: 'made-a-deal',
        w: 0.4,
        text: '{subject}和{rival}在咖啡馆后间谈了一个钟头。没有人知道他们交换了什么，但第二天，两个人都投了对方的票。',
        significance: 0.8,
        fx: [
          {
            reputation: 0.06,
            relation: ['rival', 'colleague', 0.08, 0.02],
            raw: [
              {
                type: 'knowledge',
                holderId: '$subject',
                proposition: '我知道{rival}在关键委员会里真正想要什么，也知道这笔交易的价格。',
                confidence: 0.75,
                sourceKind: 'witnessed',
                visibility: 'private',
                trueInWorld: true,
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-wish.power-price', delayMonths: 24 },
      },
      {
        id: 'crossed-the-line',
        w: 0.2,
        text: '{subject}让人去查{rival}的私人材料。材料没有查到，但查的人被看见了。第二天，{patron}把{subject}叫去，只说了一句：“你比我以为的更急。”',
        significance: 0.85,
        fx: [
          {
            reputation: -0.06,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'under-investigation',
                parameters: { progress: 20, charge: '滥用职权' },
                reason: 'an attempt to dig up dirt was noticed',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-wish.power-price',
    title: '权力的价格',
    domain: 'politics',
    stage: 'adulthood',
    ages: [24, 75],
    tags: ['politics', 'power', 'wish', 'office', 'betrayal'],
    contexts: ['reform', 'war', 'crisis', 'postwar'],
    conditions: [
      { kind: 'hasState', tag: 'wish:power' },
      { kind: 'position', authority: '预算' },
    ],
    roles: {
      ally: ['official', { minAge: 26, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'protected-ally',
        w: 0.35,
        text: '{ally}被指控挪用公款。{subject}用自己刚拿到的签字权压下了调查，条件是{ally}从此在委员会里站自己这一边。{subject}知道这不是干净的交易，也知道自己已经离不开它。',
        significance: 0.9,
        fx: [
          {
            reputation: -0.04,
            relation: ['ally', 'colleague', 0.15, 0.02],
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'under-investigation',
                parameters: { progress: 15, charge: '滥用签字权' },
                reason: 'a protected ally attracted scrutiny',
              },
            ],
          },
        ],
      },
      {
        id: 'let-ally-fall',
        w: 0.4,
        text: '{subject}没有插手。{ally}被带走时看了{subject}一眼，没有求情。{subject}回到办公室，把那份本来要签的豁免文件锁进抽屉。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.03,
            mood: -0.05,
            relation: ['ally', 'rival', -0.15, -0.08],
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'let_ally_fall',
                add: true,
                reason: 'a political ally was abandoned',
              },
            ],
          },
        ],
      },
      {
        id: 'resigned',
        w: 0.25,
        text: '{subject}在任职满两年后递了辞呈。对外说是身体原因，实际是{subject}第一次发现，自己拿到的东西和当初想要的不是同一件东西。',
        significance: 0.9,
        fx: [
          {
            mood: 0.04,
            reputation: -0.02,
            raw: [
              {
                type: 'position',
                title: '部门主管',
                holderId: '$subject',
                remove: true,
                reason: 'resigned from the office',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-absurd.stage-execution',
    title: '戏演到最后一幕',
    domain: 'culture',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['performance', 'theatre', 'revolution', 'power', 'irony', 'death'],
    contexts: ['war', 'crisis', 'revolution', 'postwar'],
    conditions: [{ kind: 'hasState', stateId: 'stage-king' }],
    roles: {
      officer: ['official', { minAge: 24, maxAge: 70, required: false }],
      crowd: ['neighbor', { minAge: 16, maxAge: 80, required: false }],
    },
    outcomes: [
      {
        id: 'mistaken-for-real',
        w: 0.25,
        text: '革命者冲进剧院时，{subject}还穿着戏服。有人指着{subject}喊“就是他”，人群便围了上来。{officer}没有听{subject}解释，只问了一句：“你是国王吗？”{subject}张了张嘴，戏里的台词先出来了。',
        significance: 0.95,
        fx: [
          {
            mood: -0.2,
            reputation: 0.1,
            death: '被误认为国王后处决',
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'executed_as_stage_king',
                add: true,
                reason: 'a stage role was mistaken for real sovereignty',
              },
            ],
          },
        ],
      },
      {
        id: 'escaped-in-costume',
        w: 0.4,
        text: '{subject}从后台翻窗出去，戏服外面套了一件借来的工人外套。街上没有人拦一个满脸油彩、抱着假王冠的人。第二天报纸说“国王已逃”，{subject}在城郊的旅店里把王冠扔进了炉子。',
        significance: 0.9,
        fx: [
          {
            mood: 0.05,
            reputation: -0.04,
            raw: [
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'stage-king',
                reason: 'fled in costume',
              },
              {
                type: 'move',
                personId: '$subject',
                locationId: '$residence',
                reason: 'fled the theatre district',
              },
            ],
          },
        ],
      },
      {
        id: 'protected-by-crowd',
        w: 0.35,
        text: '人群里有人认出{subject}只是演员，喊了一声“那是戏”。{officer}犹豫了一下，{subject}被推到后台。卸妆时手一直在抖，油彩擦了三遍才擦干净。',
        significance: 0.85,
        fx: [
          {
            mood: -0.08,
            reputation: 0.04,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'spared_as_stage_king',
                add: true,
                reason: 'the crowd knew the difference between a role and a ruler',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-absurd.chef-identified',
    title: '厨房里的沙皇',
    domain: 'history',
    stage: 'adulthood',
    ages: [22, 70],
    tags: ['court', 'revolution', 'power', 'irony', 'royal', 'death'],
    contexts: ['war', 'crisis', 'revolution'],
    conditions: [{ kind: 'hasState', stateId: 'royal-chef' }],
    roles: {
      officer: ['official', { minAge: 24, maxAge: 70 }],
      courtier: ['official', { minAge: 24, maxAge: 80, required: false }],
    },
    outcomes: [
      {
        id: 'pointed-at',
        w: 0.25,
        text: '士兵冲进厨房时，{courtier}忽然指向{subject}，说这就是沙皇。{subject}穿着沾满面粉的围裙，手里还握着一把汤勺。{officer}看了看{subject}，又看了看{courtier}，最后让人把{subject}带走。没有人问那件围裙。',
        significance: 0.95,
        fx: [
          {
            mood: -0.2,
            reputation: 0.08,
            death: '被当作沙皇处决',
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'died_as_substitute_tsar',
                add: true,
                reason: 'a courtier pointed at the cook',
              },
            ],
          },
        ],
      },
      {
        id: 'escaped-through-pantry',
        w: 0.45,
        text: '{subject}从储藏室的门出去，围裙还系在身上。街上到处是枪声和喊声，没有人注意一个满身面粉的厨子。{subject}走了三条街，才把围裙解下来扔进垃圾堆。',
        significance: 0.85,
        fx: [
          {
            mood: -0.05,
            flag: 'escaped_revolution_as_cook',
            raw: [
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'royal-chef',
                reason: 'the royal kitchen ended',
              },
              {
                type: 'move',
                personId: '$subject',
                locationId: '$residence',
                reason: 'fled the palace',
              },
            ],
          },
        ],
      },
      {
        id: 'hid-the-real-one',
        w: 0.3,
        text: '{subject}把真正的主人藏进冷库，自己站出去应付士兵。士兵问了几句话，拿走了几块银器，没有抓人。{subject}后来没有向任何人提起这件事。',
        significance: 0.9,
        fx: [
          {
            reputation: 0.06,
            mood: -0.04,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'sheltered_royal_fugitive',
                add: true,
                reason: 'protected a real royal during the revolution',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-history.street-assembly',
    title: '街角的集会',
    domain: 'politics',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['politics', 'assembly', 'organization', 'history', 'risk'],
    contexts: ['war', 'crisis', 'reform', 'postwar'],
    conditions: [{ kind: 'hasState', tag: 'wish:power' }],
    roles: {
      organizer: ['official', { minAge: 24, maxAge: 75, required: false }],
      officer: ['official', { minAge: 24, maxAge: 70, required: false }],
    },
    outcomes: [
      {
        id: 'spoke',
        w: 0.45,
        text: '{subject}站在一只倒扣的木箱上讲了十分钟。开始时只有十几个人，讲到房租和工时，巷口已经站满了。{organizer}把{subject}的名字记进名单，说下次还来。',
        significance: 0.85,
        fx: [
          {
            reputation: 0.08,
            raw: [
              {
                type: 'historical_participation',
                processId: 'historical:social_movement',
                personId: '$subject',
                role: 'organizer',
                influence: 0.08,
                reason: 'spoke at a street assembly',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-history.movement-price', delayMonths: 12 },
      },
      {
        id: 'scattered',
        w: 0.35,
        text: '警察在第三个人发言时赶到。人群散得很快，{subject}跟着别人拐进巷子，鞋底踩过一堆碎玻璃。第二天没有人被抓，但街角多了一个穿便衣的人。',
        significance: 0.7,
        fx: [
          {
            mood: -0.05,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'political-suspect',
                parameters: { heat: 0.4, file: '集会记录' },
                reason: 'seen at a dispersed assembly',
              },
            ],
          },
        ],
      },
      {
        id: 'walked-past',
        w: 0.2,
        text: '{subject}在巷口停了一下，没有走进去。第二天听说集会散了，没有人受伤。{subject}说不清自己是松了一口气，还是有点后悔。',
        significance: 0.55,
        fx: { mood: -0.02, flag: 'avoided_assembly' },
      },
    ],
  },
  {
    id: 'r15-history.movement-price',
    title: '运动里的位置',
    domain: 'politics',
    stage: 'adulthood',
    ages: [20, 75],
    tags: ['politics', 'movement', 'power', 'risk', 'history'],
    contexts: ['war', 'crisis', 'reform', 'postwar'],
    conditions: [
      { kind: 'hasState', tag: 'wish:power' },
      {
        kind: 'historicalProcess',
        processKind: 'social_movement',
        phases: ['mobilizing', 'confrontation'],
      },
    ],
    roles: {
      rival: ['official', { minAge: 24, maxAge: 75, required: false }],
      officer: ['official', { minAge: 24, maxAge: 70, required: false }],
      organization: ['organization', { organizationKind: 'party', required: true }],
    },
    outcomes: [
      {
        id: 'took-the-chair',
        w: 0.35,
        text: '会议开到一半，原来的主持人被人叫走。{subject}被推到那把椅子上，没有人反对。散会时，{subject}手里多了一串钥匙和一份需要签字的名单。',
        significance: 0.9,
        fx: [
          {
            reputation: 0.1,
            raw: [
              {
                type: 'position',
                organizationId: '$organization',
                title: '委员会主席',
                holderId: '$subject',
                wage: 0,
                authority: ['召集会议', '签署决议'],
                reason: 'took the chair of a movement committee',
              },
            ],
          },
        ],
      },
      {
        id: 'purged',
        w: 0.3,
        text: '有人翻出{subject}两年前的一次妥协，说那是立场问题。{subject}被移出名单，办公室的钥匙当天收回。{rival}接替了位置，没有看{subject}一眼。',
        significance: 0.85,
        fx: [
          {
            mood: -0.1,
            reputation: -0.06,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'political-suspect',
                parameters: { heat: 0.7, file: '运动内部审查' },
                reason: 'a movement purge marked the person',
              },
            ],
          },
        ],
      },
      {
        id: 'walked-away',
        w: 0.35,
        text: '{subject}没有接那把椅子。会后{subject}照常来，但不再坐在前排。运动继续，{subject}的名字还在名单上，只是越来越靠后。',
        significance: 0.7,
        fx: [
          {
            mood: 0.02,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'stepped_back_from_movement',
                add: true,
                reason: 'declined a leadership position',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-link.teacher-patronage',
    title: '老师替另一个孩子交了学费',
    domain: 'education',
    stage: 'adulthood',
    ages: [22, 65],
    tags: ['education', 'mentor', 'family', 'patronage', 'indirect'],
    contexts: ['reform', 'postwar', 'crisis', 'peace'],
    conditions: [
      { kind: 'history', tag: 'education', minCount: 2 },
      { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.2 },
    ],
    roles: {
      teacher: ['teacher', { minAge: 26, maxAge: 75, required: true }],
      sibling: ['sibling', { minAge: 14, maxAge: 24, required: true }],
    },
    outcomes: [
      {
        id: 'paid-for-sibling',
        w: 0.4,
        text: '{teacher}记得{subject}当年在课堂上的样子，所以愿意为{sibling}写一封推荐信，又从自己的薪水里垫了第一学期的费用。{sibling}不知道这笔钱是怎么来的，只知道有人替自己把门推开了一条缝。',
        significance: 0.85,
        fx: [
          {
            cash: -3,
            relation: ['sibling', 'kin', 0.1, 0.05],
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$sibling',
                stateId: 'university-student',
                parameters: { scholarship: true, progress: 10 },
                reason: 'a teacher financed the sibling',
              },
              {
                type: 'education',
                personId: '$sibling',
                status: 'higher',
                reason: 'enrolled with a mentor recommendation',
              },
            ],
          },
        ],
      },
      {
        id: 'letter-only',
        w: 0.35,
        text: '{teacher}写了一封很长的推荐信，但没有钱。{sibling}拿着信去考试，考完出来说题目不难，只是手一直抖。',
        significance: 0.65,
        fx: [
          {
            raw: [
              {
                type: 'skill',
                personId: '$sibling',
                skill: 'literacy',
                amount: 0.04,
                reason: 'a recommendation letter and coaching',
              },
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$sibling',
                stateId: 'university-student',
                parameters: { scholarship: false, progress: 6 },
                reason: 'enrolled without a grant',
              },
            ],
          },
        ],
      },
      {
        id: 'refused',
        w: 0.25,
        text: '{teacher}这些年帮过太多人，已经帮不动了。{subject}没有责怪，只把{sibling}领回家。{sibling}第二天自己去找了一份工作，没有再提读书。',
        significance: 0.6,
        fx: [
          {
            mood: -0.04,
            relation: ['sibling', 'kin', 0, -0.02],
            raw: [
              {
                type: 'flag',
                personId: '$sibling',
                flag: 'education_support_refused',
                add: true,
                reason: 'the family could not finance a sibling',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-org.workshop-closure',
    title: '车间门口的封条',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['work', 'factory', 'organization', 'unemployment', 'collective'],
    contexts: ['industrial', 'war', 'crisis', 'postwar'],
    conditions: [
      { kind: 'employment', employed: true },
      { kind: 'history', tag: 'work', minCount: 1 },
    ],
    weight: 3,
    baseRate: 0.2,
    roles: {
      employer: ['employer', { minAge: 24, maxAge: 75, organizationKind: 'factory' }],
      coworker: ['worker', { minAge: 16, maxAge: 70, required: false }],
    },
    outcomes: [
      {
        id: 'closed',
        w: 0.4,
        text: '老板在早班前把所有人叫到院子里，说厂子撑不下去了。{employer}没有看任何人的眼睛。中午之前，封条贴上了车间门。{subject}把工具柜里的东西装进纸袋，发现里面还有两年前的一双工作手套。',
        significance: 0.9,
        fx: [
          {
            unemployment: true,
            mood: -0.12,
            raw: [
              {
                type: 'state_add',
                ownerType: 'organization',
                ownerId: '$employerOrg',
                stateId: 'purge-ongoing',
                parameters: { target: 'all employees', intensity: 1 },
                reason: 'the workshop closed',
              },
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                parameters: { reason: 'factory closure', severity: 0.3 },
                reason: 'the closure blacklisted the whole workforce',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-org.cooperative-reopening', delayMonths: 12 },
      },
      {
        id: 'wages-cut',
        w: 0.35,
        text: '厂子没有关，但工钱减了三成，工时加了一个钟头。{employer}说这是暂时的。没有人相信“暂时”，但也没有人当场走。',
        significance: 0.75,
        fx: [
          {
            cash: -2,
            mood: -0.06,
            raw: [
              {
                type: 'state_add',
                ownerType: 'organization',
                ownerId: '$employerOrg',
                stateId: 'strike-wave',
                parameters: { demands: '恢复工钱', strength: 0.4 },
                reason: 'a wage cut provoked a strike wave',
              },
            ],
          },
        ],
        followup: { sceneId: 'r15-org.strike-settlement', delayMonths: 6 },
      },
      {
        id: 'bought-by-new-owner',
        w: 0.25,
        text: '一个新老板买下了厂子，机器没有停，门房换了人。{subject}的工位还在，工号换了。新老板说会保留所有老工人，至少这个季度会。',
        significance: 0.7,
        fx: [
          {
            mood: 0.02,
            raw: [
              {
                type: 'state_add',
                ownerType: 'organization',
                ownerId: '$employerOrg',
                stateId: 'under-investigation',
                parameters: { progress: 5, charge: '所有权变更' },
                reason: 'a change of ownership brought scrutiny',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-org.cooperative-reopening',
    title: '工人自己开的门',
    domain: 'work',
    stage: 'adulthood',
    ages: [20, 65],
    tags: ['work', 'factory', 'cooperative', 'organization', 'collective'],
    contexts: ['industrial', 'postwar', 'crisis'],
    conditions: [
      { kind: 'history', tag: 'unemployment', minCount: 1 },
      { kind: 'hasState', stateId: 'blacklisted' },
    ],
    roles: {
      coworker: ['worker', { minAge: 18, maxAge: 70, required: true }],
      official: ['official', { minAge: 26, maxAge: 75, required: false }],
    },
    outcomes: [
      {
        id: 'cooperative-opened',
        w: 0.35,
        text: '{subject}和{coworker}把旧车间的钥匙凑了出来。机器还在，订单很少，但门重新开了。第一天的工钱是每个人从自己口袋里掏出来的。',
        significance: 0.95,
        fx: [
          {
            cash: -4,
            reputation: 0.1,
            raw: [
              {
                type: 'organization_found',
                organization: {
                  name: '工人合作社',
                  kind: 'factory',
                  treasury: 2,
                  authorityRules: ['one member one vote', 'wages set by assembly'],
                },
                reason: 'workers reopened the closed workshop as a cooperative',
              },
              {
                type: 'state_remove',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                reason: 'the cooperative did not honor the old blacklist',
              },
              {
                type: 'employment',
                personId: '$subject',
                organizationId: '$employerOrg',
                occupation: 'cooperative worker',
                wage: 2,
                workplaceId: '$workplace',
                reason: 'works in the reopened cooperative',
              },
            ],
          },
        ],
      },
      {
        id: 'failed-to-open',
        w: 0.4,
        text: '钱没有凑够，房东把钥匙收了回去。{subject}和{coworker}在门口站到天黑，最后各自回家。第二天，{subject}去码头等零工。',
        significance: 0.75,
        fx: [
          {
            mood: -0.08,
            cash: -1,
            raw: [
              {
                type: 'flag',
                personId: '$subject',
                flag: 'cooperative_failed',
                add: true,
                reason: 'the cooperative could not reopen',
              },
            ],
          },
        ],
      },
      {
        id: 'official-bought-in',
        w: 0.25,
        text: '{official}给合作社批了一笔小额贷款，条件是账目每月送审。{subject}签了字，知道这笔钱不是白给的，但门至少开了。',
        significance: 0.8,
        fx: [
          {
            cash: 3,
            raw: [
              {
                type: 'organization_found',
                organization: {
                  name: '受监管的工人合作社',
                  kind: 'factory',
                  treasury: 1,
                  authorityRules: ['monthly audit', 'assembly with official observer'],
                },
                reason: 'a supervised cooperative reopened',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-org.strike-settlement',
    title: '罢工的第七天',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['work', 'strike', 'union', 'negotiation', 'organization'],
    contexts: ['industrial', 'war', 'crisis', 'postwar'],
    conditions: [{ kind: 'hasState', owner: 'organization', tag: 'strike' }],
    roles: {
      employer: ['employer', { minAge: 24, maxAge: 75, required: false }],
      coworker: ['worker', { minAge: 16, maxAge: 70, required: false }],
    },
    outcomes: [
      {
        id: 'won-a-little',
        w: 0.4,
        text: '第七天，厂方同意把工钱加回一成，并撤掉两个最积极的名字。{subject}回到车间，发现机器上落了薄薄一层灰。{coworker}说这不是胜利，但至少不是白站。',
        significance: 0.85,
        fx: [
          {
            cash: 1,
            reputation: 0.04,
            raw: [
              {
                type: 'state_remove',
                ownerType: 'organization',
                ownerId: '$employerOrg',
                stateId: 'strike-wave',
                reason: 'a partial settlement ended the strike',
              },
            ],
          },
        ],
      },
      {
        id: 'lost',
        w: 0.35,
        text: '厂方没有让步，罢工的人先撑不住了。{employer}在门口贴出新的招工启事，第一批回来的人被录用，最后回来的人发现岗位已经满了。',
        significance: 0.85,
        fx: [
          {
            unemployment: true,
            mood: -0.12,
            reputation: -0.04,
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                parameters: { reason: 'strike leader', severity: 0.8 },
                reason: 'the strike lost and the leaders were blacklisted',
              },
            ],
          },
        ],
      },
      {
        id: 'settled-without-him',
        w: 0.25,
        text: '工会和厂方谈成了，条件是{subject}不再回到车间。没有人当面说这是代价，但{subject}在签字那天没有被叫进会议室。',
        significance: 0.8,
        fx: [
          {
            unemployment: true,
            mood: -0.1,
            flag: 'sacrificed_in_strike_settlement',
            raw: [
              {
                type: 'state_add',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'blacklisted',
                parameters: { reason: 'strike settlement', severity: 0.6 },
                reason: 'the settlement excluded the person',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'r15-ordinary.quiet-year',
    title: '没有大事的一年',
    domain: 'daily',
    stage: 'adulthood',
    ages: [18, 80],
    tags: ['ordinary', 'daily', 'family', 'leisure', 'peace'],
    contexts: ['peace', 'reform', 'postwar', 'industrial'],
    outcomes: [
      {
        id: 'small-good-day',
        w: 0.45,
        text: '这一年没有发生什么大事。{subject}把窗台擦干净，邻居送来一把樱桃，孩子在走廊里跑来跑去。晚上熄灯前，{subject}想起一件很久以前的事，笑了一下。',
        significance: 0.4,
        fx: { mood: 0.04, food: 1, flag: 'ordinary_good_year' },
      },
      {
        id: 'small-loss',
        w: 0.35,
        text: '这一年没有发生什么大事，只是{subject}常常觉得累。柜子里的一只碗被碰掉了，{subject}把碎片扫起来，没有扔，放在抽屉最里面。',
        significance: 0.35,
        fx: { mood: -0.03, flag: 'ordinary_sad_year' },
      },
      {
        id: 'neighborhood-help',
        w: 0.2,
        text: '隔壁家的男人病了一个月，{subject}每天替他们提水。没有人提报酬。后来那家人搬走时，把一把钥匙留给{subject}，说以后路过可以进来坐。',
        significance: 0.55,
        fx: { mood: 0.02, flag: 'neighborhood_help' },
      },
    ],
  },
]);

export const BATCH15_STATE_KERNEL_IDS = new Set(BATCH15_STATE_KERNELS.map((kernel) => kernel.id));
