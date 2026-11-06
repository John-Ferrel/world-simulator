import type { StateDefinition } from '../../state/types.js';

const AUTHOR = 'phase15-content-factory/mechanics-architect';

function base(
  id: string,
  title: string,
  description: string,
  extra: Partial<StateDefinition>,
): StateDefinition {
  return {
    id,
    version: 1,
    packId: 'phase15-core-states',
    title,
    description,
    owner: 'person',
    tags: [id],
    provenance: {
      kind: 'authored',
      author: AUTHOR,
      rationale: 'Phase 15 baseline mechanism; all effects use the existing typed vocabulary.',
    },
    ...extra,
  };
}

export const CORE_STATES: StateDefinition[] = [
  base(
    'university-student',
    '大学在读',
    '一段有学费、课程、考试和退学风险的真实教育状态。它不复制 Person.education，只围绕它提供机制。',
    {
      owner: 'person',
      slot: 'education',
      conflict: 'replace',
      tags: ['education', 'student', 'university', 'youth'],
      parameters: {
        progress: { type: 'number', default: 10, min: 0, max: 100 },
        failures: { type: 'number', default: 0, min: 0, max: 10 },
        scholarship: { type: 'boolean', default: false },
        institution: { type: 'string', default: '维也纳大学' },
      },
      enterConditions: [
        { kind: 'age', min: 17, max: 35 },
        { kind: 'education', in: ['secondary', 'apprenticeship', 'higher'] },
      ],
      durationMonths: { min: 24, max: 72 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['education', 'knowledge', 'student', 'science', 'research'],
          multiplier: 1.8,
        },
        { kind: 'scene_weight', tags: ['work', 'factory', 'apprentice'], multiplier: 0.55 },
        {
          kind: 'check_bonus',
          tags: ['education', 'knowledge', 'research'],
          bonus: 1,
        },
      ],
      onEnter: [
        {
          type: 'education',
          personId: '$subject',
          status: 'higher',
          level: 5,
          reason: 'registered as a university student',
        },
        {
          type: 'role',
          personId: '$subject',
          role: 'student',
          add: true,
          reason: 'university enrolment',
        },
      ],
      onExit: [
        {
          type: 'role',
          personId: '$subject',
          role: 'student',
          add: false,
          reason: 'university status ended',
        },
      ],
      ticks: [
        {
          id: 'term',
          everyMonths: 12,
          check: { attribute: 'intelligence', skill: 'literacy', dc: 11 },
          outcomes: [
            {
              id: 'pass-term',
              result: 'success',
              weight: 3,
              text: '{subject}通过了这一年的课程，成绩不算漂亮，但足以继续注册。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'university-student',
                  key: 'progress',
                  delta: 18,
                  reason: 'completed a university year',
                },
                {
                  type: 'skill',
                  personId: '$subject',
                  skill: 'literacy',
                  amount: 0.03,
                  reason: 'a year of university reading',
                },
                { type: 'mood', personId: '$subject', amount: 0.03, reason: 'academic progress' },
              ],
            },
            {
              id: 'barely-pass',
              result: 'failure',
              weight: 2,
              text: '{subject}勉强交上了作业。有一门课的老师在名单上停了一下，还是把名字留了下来。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'university-student',
                  key: 'progress',
                  delta: 6,
                  reason: 'barely completed a university year',
                },
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'university-student',
                  key: 'failures',
                  delta: 1,
                  reason: 'an academic year nearly failed',
                },
                {
                  type: 'mood',
                  personId: '$subject',
                  amount: -0.05,
                  reason: 'academic insecurity',
                },
              ],
            },
          ],
        },
        {
          id: 'tuition',
          everyMonths: 12,
          conditions: [
            {
              kind: 'hasState',
              stateId: 'university-student',
              parameter: 'scholarship',
              equals: false,
            },
          ],
          outcomes: [
            {
              id: 'pay-tuition',
              weight: 1,
              text: '{subject}又交了一次学费。收据被折成很小一块，塞进课本里。',
              effects: [
                {
                  type: 'cash',
                  householdId: '$household',
                  amount: -4,
                  reason: 'university tuition',
                },
              ],
            },
          ],
        },
      ],
      transitions: [
        {
          id: 'graduate',
          to: 'university-graduate',
          conditions: [
            { kind: 'hasState', stateId: 'university-student', parameter: 'progress', min: 60 },
          ],
          reason: 'completed enough terms to graduate',
          effects: [
            {
              type: 'education',
              personId: '$subject',
              status: 'higher',
              level: 6,
              reason: 'graduated from university',
            },
            {
              type: 'role',
              personId: '$subject',
              role: 'graduate',
              add: true,
              reason: 'graduation',
            },
          ],
        },
        {
          id: 'dropout',
          to: 'university-dropout',
          conditions: [
            { kind: 'hasState', stateId: 'university-student', parameter: 'failures', min: 2 },
          ],
          reason: 'two failed years ended the course',
          effects: [
            {
              type: 'education',
              personId: '$subject',
              status: 'secondary',
              reason: 'left university without a degree',
            },
            {
              type: 'flag',
              personId: '$subject',
              flag: 'university_dropout',
              add: true,
              reason: 'left university',
            },
          ],
        },
      ],
    },
  ),
  base(
    'university-graduate',
    '大学毕业生',
    '学历已经完成；它打开一些门，但不保证职位、收入或尊重。',
    {
      owner: 'person',
      slot: 'education',
      conflict: 'replace',
      tags: ['education', 'graduate', 'university'],
      durationMonths: { min: 120, max: 120 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['education', 'knowledge', 'profession', 'politics'],
          multiplier: 1.35,
        },
      ],
      onEnter: [
        {
          type: 'education',
          personId: '$subject',
          status: 'higher',
          level: 6,
          reason: 'university degree',
        },
      ],
    },
  ),
  base(
    'university-dropout',
    '大学退学',
    '没有拿到学位的人。别人会记住这件事，但人生不会因此结束。',
    {
      owner: 'person',
      slot: 'education',
      conflict: 'replace',
      tags: ['education', 'dropout', 'stigma'],
      durationMonths: { min: 60, max: 240 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['work', 'factory', 'apprentice', 'poverty'],
          multiplier: 1.2,
        },
        { kind: 'scene_weight', tags: ['education', 'profession'], multiplier: 0.7 },
      ],
      onEnter: [
        {
          type: 'flag',
          personId: '$subject',
          flag: 'university_dropout',
          add: true,
          reason: 'left university without a degree',
        },
      ],
      onExit: [
        {
          type: 'flag',
          personId: '$subject',
          flag: 'university_dropout',
          add: false,
          reason: 'the dropout identity is no longer the active frame',
        },
      ],
    },
  ),
  base(
    'apprenticeship-contract',
    '学徒契约',
    '有师傅、期限、工钱和出师考试的真实训练关系。它不是一条保证成功的成长线。',
    {
      owner: 'person',
      slot: 'education',
      conflict: 'replace',
      tags: ['education', 'craft', 'apprentice', 'work'],
      parameters: {
        progress: { type: 'number', default: 10, min: 0, max: 100 },
        failures: { type: 'number', default: 0, min: 0, max: 10 },
        trade: { type: 'string', default: '印刷' },
        paid: { type: 'boolean', default: true },
      },
      enterConditions: [{ kind: 'age', min: 12, max: 28 }],
      durationMonths: { min: 18, max: 60 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['craft', 'work', 'apprentice', 'workshop'],
          multiplier: 1.7,
        },
        { kind: 'scene_weight', tags: ['education', 'school'], multiplier: 0.8 },
        { kind: 'check_bonus', tags: ['craft', 'work'], bonus: 1 },
      ],
      onEnter: [
        {
          type: 'education',
          personId: '$subject',
          status: 'apprenticeship',
          reason: 'signed an apprenticeship contract',
        },
        {
          type: 'role',
          personId: '$subject',
          role: 'apprentice',
          add: true,
          reason: 'apprenticeship',
        },
      ],
      onExit: [
        {
          type: 'role',
          personId: '$subject',
          role: 'apprentice',
          add: false,
          reason: 'apprenticeship ended',
        },
      ],
      ticks: [
        {
          id: 'workshop-year',
          everyMonths: 12,
          check: { attribute: 'resilience', skill: 'craft', dc: 10 },
          outcomes: [
            {
              id: 'learned',
              result: 'success',
              weight: 3,
              text: '{subject}又学会了一道工序。师傅没有夸，只把下一块料推到面前。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'apprenticeship-contract',
                  key: 'progress',
                  delta: 20,
                  reason: 'a year in the workshop',
                },
                {
                  type: 'skill',
                  personId: '$subject',
                  skill: 'craft',
                  amount: 0.04,
                  reason: 'workshop practice',
                },
                { type: 'mood', personId: '$subject', amount: 0.02, reason: 'visible progress' },
              ],
            },
            {
              id: 'mistake',
              result: 'failure',
              weight: 2,
              text: '{subject}废掉了一块料，师傅扣了工钱。晚饭时谁也没提这件事。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'apprenticeship-contract',
                  key: 'failures',
                  delta: 1,
                  reason: 'a costly workshop mistake',
                },
                { type: 'cash', householdId: '$household', amount: -1, reason: 'wasted material' },
                { type: 'mood', personId: '$subject', amount: -0.04, reason: 'a public mistake' },
              ],
            },
          ],
        },
      ],
      transitions: [
        {
          id: 'journeyman',
          to: 'journeyman',
          conditions: [
            {
              kind: 'hasState',
              stateId: 'apprenticeship-contract',
              parameter: 'progress',
              min: 55,
            },
          ],
          reason: 'passed the journeyman test',
          effects: [
            {
              type: 'education',
              personId: '$subject',
              status: 'apprenticeship',
              level: 3,
              reason: 'journeyman',
            },
            {
              type: 'role',
              personId: '$subject',
              role: 'journeyman',
              add: true,
              reason: 'passed the trade test',
            },
            {
              type: 'reputation',
              personId: '$subject',
              amount: 0.05,
              reason: 'a recognized trade',
            },
          ],
        },
        {
          id: 'expelled',
          to: 'failed-apprentice',
          conditions: [
            { kind: 'hasState', stateId: 'apprenticeship-contract', parameter: 'failures', min: 2 },
          ],
          reason: 'the master ended the contract',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'failed_apprenticeship',
              add: true,
              reason: 'contract ended',
            },
            { type: 'mood', personId: '$subject', amount: -0.08, reason: 'a public failure' },
          ],
        },
      ],
    },
  ),
  base('journeyman', '出师工匠', '有可被雇主识别的手艺和身份，但仍要找工作、应付工头和市场。', {
    owner: 'person',
    slot: 'education',
    conflict: 'replace',
    tags: ['craft', 'work', 'journeyman', 'skill'],
    durationMonths: { min: 120, max: 240 },
    modifiers: [
      { kind: 'scene_weight', tags: ['craft', 'work', 'workshop', 'trade'], multiplier: 1.5 },
      { kind: 'check_bonus', tags: ['craft', 'work'], bonus: 2 },
    ],
  }),
  base('failed-apprentice', '学徒契约终止', '没有出师的人。它是一段可追踪的失败，不是人格污点。', {
    owner: 'person',
    slot: 'education',
    conflict: 'replace',
    tags: ['craft', 'work', 'failure', 'stigma'],
    durationMonths: { min: 24, max: 120 },
    modifiers: [
      { kind: 'scene_weight', tags: ['work', 'factory', 'poverty'], multiplier: 1.15 },
      { kind: 'scene_weight', tags: ['craft', 'apprentice'], multiplier: 0.65 },
    ],
  }),
  base(
    'factory-employment',
    '工厂雇佣',
    '一份持续的雇佣关系：工钱、工龄、工伤风险和随时被解雇的可能。',
    {
      owner: 'person',
      slot: 'employment',
      conflict: 'replace',
      tags: ['work', 'factory', 'employment', 'industrial'],
      parameters: {
        seniority: { type: 'number', default: 0, min: 0, max: 50 },
        wage: { type: 'number', default: 2, min: 0, max: 20 },
        injured: { type: 'boolean', default: false },
      },
      durationMonths: { min: 6, max: 240 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['work', 'factory', 'industrial', 'wage', 'union'],
          multiplier: 1.45,
        },
        { kind: 'scene_weight', tags: ['education', 'leisure', 'travel'], multiplier: 0.75 },
      ],
      ticks: [
        {
          id: 'shift-year',
          everyMonths: 12,
          check: { attribute: 'resilience', dc: 10 },
          outcomes: [
            {
              id: 'held-on',
              result: 'success',
              weight: 3,
              text: '{subject}又在机器边站满了一年。手指上的茧比去年硬，工钱没有涨。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'factory-employment',
                  key: 'seniority',
                  delta: 1,
                  reason: 'another year on the factory floor',
                },
              ],
            },
            {
              id: 'hurt',
              result: 'failure',
              weight: 1,
              text: '{subject}在换班时被机器擦伤了手臂。工头让她去水龙头下面冲一冲，然后回来继续。',
              effects: [
                { type: 'health', personId: '$subject', amount: -0.05, reason: 'factory accident' },
                {
                  type: 'condition',
                  personId: '$subject',
                  condition: 'work injury',
                  add: true,
                  reason: 'machine injury',
                },
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'factory-employment',
                  key: 'injured',
                  value: true,
                  reason: 'a machine injury',
                },
              ],
            },
          ],
        },
      ],
    },
  ),
  base(
    'blacklisted',
    '雇主黑名单',
    '被一个或几个雇主联合排斥。它不阻止所有工作，但会让正规就业机会显著变窄。',
    {
      owner: 'person',
      slot: 'employment',
      conflict: 'replace',
      tags: ['work', 'stigma', 'politics', 'employment'],
      parameters: {
        reason: { type: 'string', default: 'union activity' },
        severity: { type: 'number', default: 0.6, min: 0, max: 1 },
      },
      durationMonths: { min: 12, max: 60 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['work', 'factory', 'employment', 'profession'],
          multiplier: 0.35,
        },
        {
          kind: 'scene_weight',
          tags: ['crime', 'informal', 'mutual_aid', 'union'],
          multiplier: 1.5,
        },
      ],
      onEnter: [
        {
          type: 'flag',
          personId: '$subject',
          flag: 'blacklisted',
          add: true,
          reason: 'employer blacklist',
        },
      ],
      onExit: [
        {
          type: 'flag',
          personId: '$subject',
          flag: 'blacklisted',
          add: false,
          reason: 'blacklist lifted',
        },
      ],
      reactions: [
        {
          id: 'caught-again',
          onTags: ['employment'],
          chance: 0.35,
          effects: [
            {
              type: 'mood',
              personId: '$subject',
              amount: -0.04,
              reason: 'a new job is shadowed by the old blacklist',
            },
          ],
          text: '{subject}拿到一份短工，工头却在第二天被上头叫走。黑名单没有写在纸上，但每个人都像看过它。',
          significance: 0.35,
          cooldownMonths: 12,
        },
      ],
    },
  ),
  base(
    'secret-lover',
    '秘密恋情',
    '一段不能被公开看见的亲密关系。它提供温度，也制造被发现、被勒索和被抛弃的风险。',
    {
      owner: 'person',
      slot: 'secret',
      conflict: 'replace',
      tags: ['love', 'intimacy', 'secret', 'courtship', 'secret_intimacy'],
      parameters: {
        intensity: { type: 'number', default: 0.6, min: 0, max: 1 },
        exposed: { type: 'boolean', default: false },
      },
      links: { lover: 'person' },
      durationMonths: { min: 6, max: 60 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['love', 'courtship', 'intimacy', 'social'],
          multiplier: 1.6,
        },
        { kind: 'scene_weight', tags: ['scandal', 'law', 'family'], multiplier: 1.3 },
      ],
      ticks: [
        {
          id: 'keep-secret',
          everyMonths: 12,
          check: { attribute: 'cunning', dc: 12 },
          outcomes: [
            {
              id: 'still-hidden',
              result: 'success',
              weight: 3,
              text: '{subject}把那段关系继续藏在日常的缝隙里。一次擦肩、一张没有署名的纸条，都足够撑过一个月。',
              effects: [
                {
                  type: 'mood',
                  personId: '$subject',
                  amount: 0.03,
                  reason: 'a private attachment',
                },
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'secret-lover',
                  key: 'intensity',
                  delta: 0.05,
                  reason: 'the secret deepens',
                },
              ],
            },
            {
              id: 'exposed',
              result: 'failure',
              weight: 1,
              text: '{subject}在回家路上被人看见。第二天，邻居的问话里多了一个不该出现的名字。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'secret-lover',
                  key: 'exposed',
                  value: true,
                  reason: 'the affair was seen',
                },
                {
                  type: 'reputation',
                  personId: '$subject',
                  amount: -0.08,
                  reason: 'public scandal',
                },
                { type: 'mood', personId: '$subject', amount: -0.07, reason: 'exposure' },
              ],
            },
          ],
        },
      ],
      transitions: [
        {
          id: 'become-scandal',
          to: 'public-scandal',
          conditions: [
            { kind: 'hasState', stateId: 'secret-lover', parameter: 'exposed', equals: true },
          ],
          reason: 'the secret became public',
        },
      ],
    },
  ),
  base(
    'public-scandal',
    '公开丑闻',
    '一段被公开谈论的私事。它改变别人接近这个人的方式，也可能被政治或家庭利用。',
    {
      owner: 'person',
      slot: 'secret',
      conflict: 'replace',
      tags: ['scandal', 'reputation', 'social'],
      durationMonths: { min: 6, max: 36 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['scandal', 'politics', 'media', 'family', 'law'],
          multiplier: 1.5,
        },
        { kind: 'scene_weight', tags: ['courtship', 'marriage', 'profession'], multiplier: 0.7 },
      ],
      reactions: [
        {
          id: 'gossip',
          onTags: ['social', 'rumor'],
          chance: 0.4,
          effects: [
            { type: 'mood', personId: '$subject', amount: -0.03, reason: 'the scandal is retold' },
            {
              type: 'reputation',
              personId: '$subject',
              amount: -0.03,
              reason: 'the scandal is retold',
            },
          ],
          text: '{subject}走进咖啡馆时，邻桌的声音低了一拍。没有人当面说什么，但每个人都知道该说什么。',
          significance: 0.35,
          cooldownMonths: 12,
        },
      ],
    },
  ),
  base(
    'chronic-illness',
    '慢性病',
    '一种会持续占用身体、工钱和注意力的状况。它不是一次性事件，也不会按剧情需要自动痊愈。',
    {
      owner: 'person',
      slot: 'health',
      conflict: 'replace',
      tags: ['health', 'illness', 'body'],
      parameters: {
        severity: { type: 'number', default: 0.5, min: 0, max: 1 },
        years: { type: 'number', default: 0, min: 0, max: 60 },
      },
      durationMonths: { min: 12, max: 240 },
      modifiers: [
        { kind: 'scene_weight', tags: ['health', 'illness', 'medical', 'care'], multiplier: 1.7 },
        { kind: 'scene_weight', tags: ['work', 'factory', 'travel'], multiplier: 0.65 },
      ],
      ticks: [
        {
          id: 'body-year',
          everyMonths: 12,
          check: { attribute: 'resilience', dc: 12 },
          outcomes: [
            {
              id: 'stable',
              result: 'success',
              weight: 2,
              text: '{subject}又撑过了一年。病没有走，但也没有立刻把人带走。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'chronic-illness',
                  key: 'years',
                  delta: 1,
                  reason: 'a year with chronic illness',
                },
              ],
            },
            {
              id: 'worse',
              result: 'failure',
              weight: 1,
              text: '{subject}的病在今年加重。医生换了一种药，账单比药更让人喘不过气。',
              effects: [
                {
                  type: 'health',
                  personId: '$subject',
                  amount: -0.06,
                  reason: 'chronic illness worsened',
                },
                { type: 'cash', householdId: '$household', amount: -2, reason: 'medical costs' },
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'chronic-illness',
                  key: 'severity',
                  delta: 0.1,
                  reason: 'the illness worsened',
                },
              ],
            },
          ],
        },
      ],
      exitWhen: [{ kind: 'health', min: 0.9 }],
    },
  ),
  base(
    'cursed-by-wish',
    '被愿望诅咒',
    '一个会在背叛发生时自行判定的状态。它不是全知诅咒：只有真实发生的背叛、真实在场的背叛者，才会触发。',
    {
      owner: 'person',
      slot: 'special',
      conflict: 'replace',
      tags: ['wish', 'curse', 'supernatural', 'revenge', 'special'],
      parameters: {
        severity: { type: 'number', default: 0.5, min: 0, max: 1 },
        triggers: { type: 'number', default: 0, min: 0, max: 20 },
      },
      durationMonths: { min: 600, max: 600 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['betrayal', 'revenge', 'supernatural', 'crime'],
          multiplier: 1.4,
        },
        { kind: 'check_bonus', tags: ['betrayal', 'revenge'], bonus: 1 },
      ],
      reactions: [
        {
          id: 'curse-betrayal',
          onTags: ['betrayal'],
          requiresRoles: ['betrayer'],
          chance: 0.85,
          check: { attribute: 'willpower', dc: 11 },
          effects: [
            {
              type: 'health',
              personId: '$betrayer',
              amount: -0.18,
              reason: 'the curse answers a real betrayal',
            },
            {
              type: 'condition',
              personId: '$betrayer',
              condition: 'cursed illness',
              add: true,
              reason: 'the curse leaves a visible mark on the betrayer',
            },
            {
              type: 'state_parameter',
              ownerType: 'person',
              ownerId: '$subject',
              stateId: 'cursed-by-wish',
              key: 'triggers',
              delta: 1,
              reason: 'the curse answered a betrayal',
            },
            {
              type: 'mood',
              personId: '$subject',
              amount: 0.02,
              reason: 'the curse is not passive',
            },
          ],
          failureEffects: [
            {
              type: 'health',
              personId: '$subject',
              amount: -0.05,
              reason: 'the curse turns back on its holder',
            },
            {
              type: 'state_parameter',
              ownerType: 'person',
              ownerId: '$subject',
              stateId: 'cursed-by-wish',
              key: 'triggers',
              delta: 1,
              reason: 'the curse answered, even when it recoiled',
            },
            { type: 'mood', personId: '$subject', amount: -0.06, reason: 'the curse recoils' },
          ],
          text: '背叛发生后的夜里，{subject}听见墙里有一声很轻的响。第二天，{betrayer}病倒了；没有人把这两件事放在一起。',
          failureText:
            '背叛发生后的夜里，{subject}自己发起了高烧；{betrayer}第二天照常出门。没有人把这两件事放在一起。',
          significance: 0.8,
          cooldownMonths: 12,
          maxPerYear: 1,
        },
      ],
    },
  ),
  base('stage-king', '舞台上的国王', '在戏里扮演国王。掌声是真的，王冠是道具，权力不是这个人的。', {
    owner: 'person',
    slot: 'performance',
    conflict: 'replace',
    tags: ['performance', 'theatre', 'status', 'irony'],
    parameters: {
      role: { type: 'string', default: '国王' },
      audience: { type: 'number', default: 100, min: 0, max: 100000 },
    },
    durationMonths: { min: 1, max: 6 },
    modifiers: [
      {
        kind: 'scene_weight',
        tags: ['culture', 'performance', 'theatre', 'reputation'],
        multiplier: 1.7,
      },
    ],
    onEnter: [
      {
        type: 'flag',
        personId: '$subject',
        flag: 'stage_king',
        add: true,
        reason: 'cast as a stage king',
      },
      { type: 'reputation', personId: '$subject', amount: 0.04, reason: 'a visible stage role' },
    ],
    onExit: [
      {
        type: 'flag',
        personId: '$subject',
        flag: 'stage_king',
        add: false,
        reason: 'the play closed',
      },
    ],
    reactions: [
      {
        id: 'mistaken-for-real',
        onTags: ['power', 'crowd', 'revolution'],
        chance: 0.15,
        effects: [
          { type: 'mood', personId: '$subject', amount: 0.04, reason: 'mistaken for a real king' },
          {
            type: 'reputation',
            personId: '$subject',
            amount: 0.05,
            reason: 'a dangerous resemblance',
          },
          {
            type: 'flag',
            personId: '$subject',
            flag: 'mistaken_for_sovereign',
            add: true,
            reason: 'a crowd mistook the role for the person',
          },
        ],
        text: '散场后有人隔着街喊{subject}“陛下”。{subject}没有纠正，因为对方已经跪了下去。',
        significance: 0.6,
        cooldownMonths: 60,
      },
    ],
  }),
  base(
    'royal-chef',
    '皇家厨房',
    '能在宫廷厨房工作，知道谁吃什么、谁和谁一起吃饭。它提供接触权力的通道，不提供权力本身。',
    {
      owner: 'person',
      slot: 'employment',
      conflict: 'replace',
      tags: ['work', 'court', 'power', 'kitchen'],
      parameters: {
        access: { type: 'number', default: 0.4, min: 0, max: 1 },
        household: { type: 'string', default: '宫廷' },
      },
      durationMonths: { min: 12, max: 240 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['court', 'politics', 'power', 'history', 'work'],
          multiplier: 1.4,
        },
        { kind: 'scene_weight', tags: ['hunger', 'poverty'], multiplier: 0.7 },
      ],
      reactions: [
        {
          id: 'overheard-secret',
          onTags: ['politics', 'secret', 'court'],
          chance: 0.3,
          check: { attribute: 'perception', dc: 11 },
          effects: [
            {
              type: 'knowledge',
              holderId: '$subject',
              proposition: '我在宫廷厨房听见了一件不该外传的事。',
              confidence: 0.7,
              sourceKind: 'witnessed',
              visibility: 'private',
              trueInWorld: true,
            },
          ],
          failureEffects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'suspected_eavesdropper',
              add: true,
              reason: 'caught listening',
            },
          ],
          text: '{subject}端着一盘冷掉的汤站在门外，听见里面有人提了一个名字，又立刻压低声音。',
          significance: 0.5,
          cooldownMonths: 24,
        },
      ],
    },
  ),
  base(
    'political-suspect',
    '政治嫌疑',
    '被警察或雇主注意的人。它不会自动导致逮捕，但会让工作、集会和出行都变得危险。',
    {
      owner: 'person',
      slot: 'legal',
      conflict: 'replace',
      tags: ['politics', 'repression', 'legal', 'surveillance'],
      parameters: {
        heat: { type: 'number', default: 0.4, min: 0, max: 1 },
        file: { type: 'string', default: '政治档案' },
      },
      durationMonths: { min: 12, max: 120 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['politics', 'surveillance', 'police', 'court', 'repression'],
          multiplier: 1.6,
        },
        { kind: 'scene_weight', tags: ['work', 'profession', 'travel'], multiplier: 0.7 },
      ],
      ticks: [
        {
          id: 'police-interest',
          everyMonths: 12,
          check: { attribute: 'cunning', dc: 12 },
          outcomes: [
            {
              id: 'avoided',
              result: 'success',
              weight: 2,
              text: '{subject}换了路线，避开那家咖啡馆和门口的两个便衣。档案里又添了一页，但今年没有传唤。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'political-suspect',
                  key: 'heat',
                  delta: -0.05,
                  reason: 'avoided police attention',
                },
              ],
            },
            {
              id: 'detained',
              result: 'failure',
              weight: 1,
              text: '{subject}在回家路上被拦住，问话从晚上八点持续到凌晨。没有正式指控，但名字被写进了另一本册子。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'political-suspect',
                  key: 'heat',
                  delta: 0.15,
                  reason: 'police detention',
                },
                { type: 'mood', personId: '$subject', amount: -0.08, reason: 'police questioning' },
              ],
            },
          ],
        },
      ],
      transitions: [
        {
          id: 'arrested',
          to: 'detained',
          conditions: [
            { kind: 'hasState', stateId: 'political-suspect', parameter: 'heat', min: 0.8 },
          ],
          reason: 'the file became an arrest',
          effects: [
            {
              type: 'flag',
              personId: '$subject',
              flag: 'political_arrest',
              add: true,
              reason: 'arrested on political suspicion',
            },
          ],
        },
      ],
    },
  ),
  base('detained', '被拘留', '一段时间里失去自由。工作、家庭和计划都被真实地中断。', {
    owner: 'person',
    slot: 'legal',
    conflict: 'replace',
    tags: ['legal', 'prison', 'detention', 'absence'],
    parameters: {
      charge: { type: 'string', default: '政治嫌疑' },
      months: { type: 'number', default: 6, min: 1, max: 60 },
    },
    durationMonths: { min: 3, max: 36 },
    modifiers: [
      { kind: 'scene_weight', tags: ['prison', 'legal', 'court', 'politics'], multiplier: 1.8 },
      { kind: 'scene_weight', tags: ['work', 'family', 'leisure', 'travel'], multiplier: 0.3 },
    ],
    onEnter: [
      { type: 'unemployment', personId: '$subject', reason: 'detained' },
      {
        type: 'flag',
        personId: '$subject',
        flag: 'detained',
        add: true,
        reason: 'held in detention',
      },
    ],
    onExit: [
      {
        type: 'flag',
        personId: '$subject',
        flag: 'detained',
        add: false,
        reason: 'released from detention',
      },
      {
        type: 'flag',
        personId: '$subject',
        flag: 'released_from_detention',
        add: true,
        reason: 'returned from detention',
      },
    ],
  }),
  base('grief', '丧亲之痛', '一个具体的失去持续占据注意力。它不是病理诊断，也不会按时间表消失。', {
    owner: 'person',
    slot: 'mind',
    conflict: 'replace',
    tags: ['grief', 'death', 'family', 'mind'],
    parameters: {
      loss: { type: 'string', default: '亲人' },
      years: { type: 'number', default: 0, min: 0, max: 30 },
    },
    durationMonths: { min: 6, max: 48 },
    modifiers: [
      { kind: 'scene_weight', tags: ['grief', 'death', 'family', 'memory'], multiplier: 1.5 },
      { kind: 'scene_weight', tags: ['work', 'leisure', 'courtship'], multiplier: 0.75 },
    ],
    ticks: [
      {
        id: 'anniversary',
        everyMonths: 12,
        check: { attribute: 'willpower', dc: 11 },
        outcomes: [
          {
            id: 'carried',
            result: 'success',
            weight: 2,
            text: '{subject}又过了一年。那个人的名字不再每天出现，但在某些气味和街道上仍会回来。',
            effects: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'grief',
                key: 'years',
                delta: 1,
                reason: 'a year of grief',
              },
              {
                type: 'mood',
                personId: '$subject',
                amount: 0.02,
                reason: 'grief becomes bearable',
              },
            ],
          },
          {
            id: 'overwhelmed',
            result: 'failure',
            weight: 1,
            text: '{subject}在整理旧衣服时突然停下来。那天剩下的活没有做完。',
            effects: [
              { type: 'mood', personId: '$subject', amount: -0.06, reason: 'grief overwhelms' },
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'grief',
                key: 'years',
                delta: 1,
                reason: 'a hard anniversary',
              },
            ],
          },
        ],
      },
    ],
    exitWhen: [{ kind: 'hasState', stateId: 'grief', parameter: 'years', min: 4 }],
  }),
  base('fame', '公众名声', '名字被陌生人认识。它带来机会、窥视和一种无法完全收回的公共身份。', {
    owner: 'person',
    slot: 'status',
    conflict: 'replace',
    tags: ['fame', 'reputation', 'media', 'status'],
    parameters: {
      level: { type: 'number', default: 0.4, min: 0, max: 1 },
      notoriety: { type: 'boolean', default: false },
    },
    durationMonths: { min: 12, max: 120 },
    modifiers: [
      {
        kind: 'scene_weight',
        tags: ['media', 'performance', 'politics', 'culture', 'reputation'],
        multiplier: 1.6,
      },
      { kind: 'scene_weight', tags: ['scandal', 'crime', 'public'], multiplier: 1.4 },
    ],
    reactions: [
      {
        id: 'scandal',
        onTags: ['scandal'],
        chance: 0.6,
        effects: [
          { type: 'reputation', personId: '$subject', amount: -0.08, reason: 'a public scandal' },
          {
            type: 'state_parameter',
            ownerType: 'person',
            ownerId: '$subject',
            stateId: 'fame',
            key: 'notoriety',
            value: true,
            reason: 'fame turned into notoriety',
          },
        ],
        text: '{subject}的名字出现在报纸上，但这次不是在文化版。街角的报童把那一版折到最上面。',
        significance: 0.6,
        cooldownMonths: 24,
      },
    ],
  }),
  base(
    'debt-bondage',
    '债务束缚',
    '欠债不是一句背景，而是一种持续的关系：债主可以决定工作、住处和行动。',
    {
      owner: 'person',
      slot: 'economic',
      conflict: 'replace',
      tags: ['debt', 'work', 'poverty', 'legal'],
      parameters: {
        debt: { type: 'number', default: 20, min: 0, max: 1000 },
        creditor: { type: 'string', default: '债主' },
      },
      links: { creditor: 'person' },
      durationMonths: { min: 6, max: 120 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['debt', 'work', 'crime', 'poverty', 'legal'],
          multiplier: 1.5,
        },
        { kind: 'scene_weight', tags: ['education', 'travel', 'leisure'], multiplier: 0.55 },
      ],
      ticks: [
        {
          id: 'interest',
          everyMonths: 12,
          outcomes: [
            {
              id: 'pay-interest',
              weight: 1,
              text: '{subject}又付了一年的利息。本金几乎没动，债主的账本却翻到了新一页。',
              effects: [
                { type: 'cash', householdId: '$household', amount: -3, reason: 'debt interest' },
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'debt-bondage',
                  key: 'debt',
                  delta: 2,
                  reason: 'interest outran the payment',
                },
              ],
            },
          ],
        },
      ],
    },
  ),
  base('war-widow', '战争遗属', '配偶死在战争里。它改变家庭收入、照护负担和再婚的社会条件。', {
    owner: 'person',
    slot: 'family',
    conflict: 'replace',
    tags: ['war', 'family', 'widow', 'grief', 'welfare'],
    parameters: {
      pension: { type: 'number', default: 1, min: 0, max: 10 },
      years: { type: 'number', default: 0, min: 0, max: 60 },
    },
    durationMonths: { min: 24, max: 240 },
    modifiers: [
      {
        kind: 'scene_weight',
        tags: ['war', 'family', 'welfare', 'grief', 'work'],
        multiplier: 1.35,
      },
      { kind: 'scene_weight', tags: ['courtship', 'marriage'], multiplier: 0.8 },
    ],
    ticks: [
      {
        id: 'widow-year',
        everyMonths: 12,
        outcomes: [
          {
            id: 'pension-arrives',
            weight: 1,
            text: '{subject}去办事处领了遗属抚恤金。窗口后面的人换了，表格没有换。',
            effects: [
              { type: 'cash', householdId: '$household', amount: 1, reason: 'war widow pension' },
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: 'war-widow',
                key: 'years',
                delta: 1,
                reason: 'another year as a war widow',
              },
            ],
          },
        ],
      },
    ],
  }),
  base(
    'city-under-occupation',
    '城市被占领',
    '占领不是一条新闻，而是一组持续改变普通人机会的条件：宵禁、征用、检查、暴力和黑市。',
    {
      owner: 'place',
      slot: 'political',
      conflict: 'replace',
      tags: ['war', 'occupation', 'place', 'violence'],
      parameters: {
        authority: { type: 'string', default: '占领军' },
        severity: { type: 'number', default: 0.5, min: 0, max: 1 },
      },
      durationMonths: { min: 6, max: 120 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['war', 'occupation', 'military', 'police', 'shortage'],
          multiplier: 1.8,
        },
        {
          kind: 'scene_weight',
          tags: ['leisure', 'culture', 'travel', 'education'],
          multiplier: 0.5,
        },
      ],
    },
  ),
  base(
    'strike-wave',
    '罢工潮',
    '一个组织或城市里的劳动行动。它改变工钱、工时、被解雇的风险和参与者的名声。',
    {
      owner: 'organization',
      slot: 'political',
      conflict: 'replace',
      tags: ['work', 'union', 'strike', 'politics'],
      parameters: {
        demands: { type: 'string', default: '提高工钱' },
        strength: { type: 'number', default: 0.5, min: 0, max: 1 },
      },
      durationMonths: { min: 1, max: 12 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['work', 'union', 'strike', 'politics', 'police'],
          multiplier: 1.7,
        },
      ],
    },
  ),
  base(
    'purge-ongoing',
    '组织清洗',
    '一个组织正在清除它认为不可靠的人。成员会面临告密、降职、失踪或退出。',
    {
      owner: 'organization',
      slot: 'political',
      conflict: 'replace',
      tags: ['politics', 'repression', 'organization', 'purge'],
      parameters: {
        target: { type: 'string', default: '不可靠成员' },
        intensity: { type: 'number', default: 0.5, min: 0, max: 1 },
      },
      durationMonths: { min: 3, max: 36 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['politics', 'repression', 'surveillance', 'organization'],
          multiplier: 1.9,
        },
        { kind: 'scene_weight', tags: ['social', 'leisure', 'culture'], multiplier: 0.6 },
      ],
    },
  ),
  base(
    'under-investigation',
    '被调查',
    '有一个具体的人或机构在收集关于这个人的材料。调查可能结束，也可能变成起诉。',
    {
      owner: 'person',
      slot: 'legal',
      conflict: 'replace',
      tags: ['legal', 'police', 'investigation', 'risk'],
      parameters: {
        progress: { type: 'number', default: 10, min: 0, max: 100 },
        charge: { type: 'string', default: '未知' },
      },
      durationMonths: { min: 3, max: 36 },
      modifiers: [
        {
          kind: 'scene_weight',
          tags: ['police', 'court', 'legal', 'crime', 'surveillance'],
          multiplier: 1.8,
        },
        { kind: 'scene_weight', tags: ['work', 'social', 'travel'], multiplier: 0.7 },
      ],
      ticks: [
        {
          id: 'case-progress',
          everyMonths: 6,
          outcomes: [
            {
              id: 'evidence',
              weight: 1,
              text: '调查员又来找{subject}谈了一次。问话比上次具体，记录也比上次长。',
              effects: [
                {
                  type: 'state_parameter',
                  ownerType: 'person',
                  ownerId: '$subject',
                  stateId: 'under-investigation',
                  key: 'progress',
                  delta: 15,
                  reason: 'the investigation advances',
                },
                {
                  type: 'mood',
                  personId: '$subject',
                  amount: -0.04,
                  reason: 'investigation pressure',
                },
              ],
            },
          ],
        },
      ],
    },
  ),
];

export const CORE_STATE_IDS = new Set(CORE_STATES.map((state) => state.id));
