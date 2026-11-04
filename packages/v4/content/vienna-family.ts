import type { SceneDefinition } from '../domain.js';

/**
 * Family formation for the player's descendants and the initial Vienna cast.
 * Both `birth` and `initial` people may court, marry, separate and have
 * children; otherwise the authored 1912 population would age out without
 * replacement. The engine creates every child as a real Person with
 * parent/guardian relations, household membership and its own birth EventFact.
 * Names are drawn deterministically from a small Vienna name pool unless the
 * scene names one.
 */

const PACK = 'vienna-family';

const basis =
  'Marriage, cohabitation, childbirth and infant mortality are modelled as household-level mechanisms in early twentieth-century Vienna; the scenes are not biographies of specific people.';

const FAMILY_SCENE_DEFINITIONS: SceneDefinition[] = [
  {
    id: 'vienna-family-partnership-female',
    version: 1,
    packId: PACK,
    title: '订婚与搬进同一间住处',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 35 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    cooldownYears: 2,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 35, sex: 'female' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 60, sex: 'male' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 35 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner', sameHousehold: true },
    ],
    outcomes: [
      {
        id: 'marry-and-move-in',
        weight: 0.55,
        immediateText:
          '{subject}和{partner}在利奥波德城的教区教堂举行婚礼。{partner}把一只箱子搬进{residence}，箱子里有他的工票、两件衬衫和一把旧剃刀；家里多摆了一张床。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.12,
            affection: 0.15,
            obligation: 0.15,
            reason: 'married',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: '$household',
            reason: 'moved in after marriage',
          },
          { type: 'role', personId: '$subject', role: 'wife', add: true, reason: 'married' },
          { type: 'role', personId: '$partner', role: 'husband', add: true, reason: 'married' },
          { type: 'cash', householdId: '$household', amount: -15, reason: 'wedding and license' },
        ],
      },
      {
        id: 'cohabit-without-wedding',
        weight: 0.3,
        immediateText:
          '{subject}和{partner}没有办婚礼。{partner}在月底把铺盖搬到{residence}，邻居在楼道里看了很久，{subject}没有解释。两人把工钱合在一起付房租。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.08,
            affection: 0.1,
            obligation: 0.08,
            reason: 'cohabiting',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: '$household',
            reason: 'moved in together',
          },
          { type: 'role', personId: '$subject', role: 'partner', add: true, reason: 'cohabiting' },
          { type: 'role', personId: '$partner', role: 'partner', add: true, reason: 'cohabiting' },
        ],
      },
      {
        id: 'engagement-postponed',
        weight: 0.15,
        immediateText:
          '{subject}和{partner}说好先攒钱。{partner}每周日来{residence}吃饭，走时把工资的一部分留在桌上。两人没有定下日期，楼里的邻居开始问。',
        effects: [
          { type: 'cash', householdId: '$household', amount: 2, reason: 'partner contribution' },
        ],
      },
    ],
    tags: ['family', 'marriage', 'household'],
    sourceIds: [
      'source-oeaw-wiener-arbeiterhaushalte-1912',
      'source-push-wiener-wohnverhaeltnisse',
    ],
    historicalBasis: basis,
  },
  {
    id: 'vienna-family-partnership-male',
    version: 1,
    packId: PACK,
    title: '男人的婚事',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 40 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    oncePerPerson: true,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60, sex: 'male' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 35, sex: 'female' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 40 },
      { kind: 'stage', in: ['adulthood'] },
    ],
    outcomes: [
      {
        id: 'marry-and-bring-her-home',
        weight: 0.6,
        immediateText:
          '{subject}在教区教堂娶了{partner}。新娘把一只木箱和缝纫机搬进{residence}，{subject}在门口钉了一块新门牌；两人开始按周计算房租和煤钱。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.12,
            affection: 0.15,
            obligation: 0.15,
            reason: 'married',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: '$household',
            reason: 'moved in after marriage',
          },
          { type: 'role', personId: '$subject', role: 'husband', add: true, reason: 'married' },
          { type: 'role', personId: '$partner', role: 'wife', add: true, reason: 'married' },
          { type: 'cash', householdId: '$household', amount: -18, reason: 'wedding and furniture' },
        ],
      },
      {
        id: 'marry-with-debt',
        weight: 0.25,
        immediateText:
          '{subject}和{partner}借钱办了婚礼。宴席只有面包、香肠和啤酒，欠条写在小店老板的账本上。{partner}搬进{residence}时，带来一床旧被子和一只铜锅。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.08,
            affection: 0.1,
            obligation: 0.12,
            reason: 'married with debt',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: '$household',
            reason: 'moved in after marriage',
          },
          { type: 'cash', householdId: '$household', amount: -25, reason: 'wedding debt' },
          { type: 'role', personId: '$subject', role: 'husband', add: true, reason: 'married' },
        ],
      },
    ],
    tags: ['family', 'marriage', 'household'],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    historicalBasis: basis,
  },
  {
    id: 'vienna-family-childbirth',
    version: 1,
    packId: PACK,
    title: '产床与借来的摇篮',
    stage: 'adulthood',
    ageWindow: { min: 19, max: 45 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 0.75,
    cooldownYears: 1,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 19, maxAge: 40, sex: 'female' },
      {
        key: 'partner',
        kind: 'partner',
        required: true,
        minAge: 18,
        maxAge: 65,
        sex: 'male',
      },
      {
        key: 'midwife',
        kind: 'neighbor',
        required: false,
        minAge: 45,
        maxAge: 75,
        sex: 'female',
      },
    ],
    conditions: [
      { kind: 'age', min: 19, max: 40 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'hasRelation', relationKind: 'partner', minTrust: 0.05, partnerSex: 'male' },
      { kind: 'householdSize', max: 12 },
    ],
    outcomes: [
      {
        id: 'daughter-born',
        weight: 0.35,
        immediateText:
          '{subject}在{residence}生下一个女婴，取名{child}。接生的人收六克朗，{partner}在走廊烧水，邻居借来一只摇篮；{subject}起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。',
        effects: [
          {
            type: 'birth',
            parentIds: ['$subject', '$partner'],
            childSex: 'female',
            reason: 'daughter born',
          },
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'childbirth' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'midwife fee' },
        ],
        significance: 0.8,
      },
      {
        id: 'son-born',
        weight: 0.35,
        immediateText:
          '{subject}在{residence}生下一个男婴，取名{child}。工友凑的钱抵了一部分，家里还是从糖罐里数出六克朗给接生的人；{partner}把消息带到工厂，回来时把唯一的摇篮重新刷了一遍，{subject}躺在床上出了一身虚汗。',
        effects: [
          {
            type: 'birth',
            parentIds: ['$subject', '$partner'],
            childSex: 'male',
            reason: 'son born',
          },
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'childbirth' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'midwife fee' },
        ],
        significance: 0.8,
      },
      {
        id: 'difficult-birth',
        weight: 0.2,
        immediateText:
          '{subject}难产，接生的人守了两天。孩子最后生下来，取名{child}；{subject}一直发烧，医院又收走二十克朗，{partner}把钟表送进当铺。{subject}落下产后虚弱的毛病，抱孩子时手臂发抖，站久了眼前就发黑。',
        effects: [
          {
            type: 'birth',
            parentIds: ['$subject', '$partner'],
            childSex: 'female',
            reason: 'difficult birth',
          },
          { type: 'health', personId: '$subject', amount: -0.22, reason: 'difficult childbirth' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'postpartum weakness',
            add: true,
            reason: 'difficult birth',
          },
          { type: 'cash', householdId: '$household', amount: -20, reason: 'midwife and hospital' },
        ],
        significance: 0.85,
      },
      {
        id: 'stillbirth',
        weight: 0.1,
        immediateText:
          '孩子生下来没有哭声。接生的人把布盖上去，{partner}在楼梯间坐了很久；{subject}在床上躺了三天，家里没有办葬礼，只去市政办事处登记，付了六克朗。登记表上母亲一栏写着{subject}的名字；此后邻居提起{subject}，只说“那个没了孩子的母亲”，柜子里还留着没拆的襁褓。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.12, reason: 'stillbirth' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'midwife and burial' },
          {
            type: 'role',
            personId: '$subject',
            role: 'grieving_mother',
            add: true,
            reason: 'stillbirth',
          },
        ],
        significance: 0.85,
      },
    ],
    narration: [
      {
        id: 'vienna-family-childbirth.daughter-born.alt1',
        key: 'daughter-born',
        text: '水壶在走廊的炉子上响起来，{partner}两手都是煤灰。接生的人把六克朗点清，{subject}听见孩子哭，才把攥着床单的手松开。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-childbirth.daughter-born.alt2',
        key: 'daughter-born',
        text: '邻居把摇篮推进门时，轮子卡在门槛上。{subject}躺在床上看了一会儿，伸手碰了碰孩子的脸；{partner}把借来的摇篮擦了一遍，没说这钱什么时候还。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-childbirth.son-born.alt1',
        key: 'son-born',
        text: '工友们把铜板放在{partner}的帽子里，有人还塞了半包烟。{subject}听见{partner}在门外说“是个儿子”，声音压得很低，脚步却比平时快。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-childbirth.son-born.alt2',
        key: 'son-born',
        text: '摇篮上的旧漆被砂纸磨掉，{partner}刷到半夜。{subject}醒来时看见孩子睡在里头，六克朗已经付出去，糖罐轻了一截，屋里却多了一口呼吸。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-childbirth.difficult-birth.alt1',
        key: 'difficult-birth',
        text: '接生的人把袖子挽到肘上，两天没有脱外套。{partner}在当铺门口站了一会儿，把钟表推过柜台；换来的钱正好够医院收的那二十克朗。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-family-childbirth.difficult-birth.alt2',
        key: 'difficult-birth',
        text: '{subject}醒来时先摸到孩子的手，再摸到自己的额头，还是烫的。{partner}把当票压在药瓶底下，说钟表以后还能赎；{subject}没有力气答话，只把眼睛闭上。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-childbirth.stillbirth.alt1',
        key: 'stillbirth',
        text: '接生的人把六克朗收进围裙口袋，又回头把布角掖好。{partner}在楼梯间坐到天亮，烟抽完了，手指还在口袋里摸。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-family-childbirth.stillbirth.alt2',
        key: 'stillbirth',
        text: '市政办事处的表格有一栏“死产”，办事员问了两遍才落笔。{subject}躺在床上听见{partner}进门，谁也没有说孩子的事，只把炉子生了起来。',
        tone: ['dry'],
      },
    ],
    tags: ['family', 'childbirth', 'death'],
    sourceIds: ['source-wien-geschichte-saeuglingssterblichkeit'],
    historicalBasis: basis,
  },
  {
    id: 'vienna-family-fatherhood',
    version: 1,
    packId: PACK,
    title: '产房外的男人',
    stage: 'adulthood',
    ageWindow: { min: 19, max: 45 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 0.08,
    cooldownYears: 3,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 19, maxAge: 45, sex: 'male' },
      {
        key: 'partner',
        kind: 'partner',
        required: true,
        minAge: 19,
        maxAge: 40,
        sex: 'female',
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 19, max: 45 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'hasRelation', relationKind: 'partner', minTrust: 0.05 },
      { kind: 'householdSize', max: 12 },
    ],
    outcomes: [
      {
        id: 'child-born-at-home',
        weight: 0.55,
        immediateText:
          '{partner}在{residence}生下一个孩子，取名{child}。{subject}在厨房和走廊之间来回，接生的人让烧水、拿布、付六克朗；孩子天亮后睡着了，{subject}从此在户籍表上多了“父亲”一栏，手背上还留着烫水壶的红印。',
        effects: [
          {
            type: 'birth',
            parentIds: ['$partner', '$subject'],
            childSex: 'female',
            reason: 'child born at home',
          },
          { type: 'health', personId: '$partner', amount: -0.08, reason: 'childbirth' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'midwife fee' },
          {
            type: 'role',
            personId: '$subject',
            role: 'father',
            add: true,
            reason: 'became a father',
          },
        ],
        significance: 0.8,
      },
      {
        id: 'child-and-mother-weak',
        weight: 0.3,
        immediateText:
          '孩子出生后取名{child}，{partner}一直出血。{subject}跑去医院，医生来晚了，只留下药和十八克朗的账单；{partner}落下产后虚弱的毛病，{subject}抱着孩子坐在床边，直到邻居把汤送来，才发现自己的鞋穿反了。',
        effects: [
          {
            type: 'birth',
            parentIds: ['$partner', '$subject'],
            childSex: 'male',
            reason: 'child born during a difficult delivery',
          },
          { type: 'health', personId: '$partner', amount: -0.2, reason: 'postpartum bleeding' },
          { type: 'cash', householdId: '$household', amount: -18, reason: 'doctor and medicine' },
          {
            type: 'condition',
            personId: '$partner',
            condition: 'postpartum weakness',
            add: true,
            reason: 'difficult delivery',
          },
        ],
        significance: 0.85,
      },
      {
        id: 'child-dies-at-birth',
        weight: 0.15,
        immediateText:
          '孩子出生时已经没有呼吸。{subject}去市政办事处登记，付了六克朗，回来时{partner}还躺在床上看着天花板；邻居把借来的摇篮搬走了，{subject}成了丧子的父亲，屋里没人知道该说什么，只有炉子还在响。',
        effects: [
          { type: 'health', personId: '$partner', amount: -0.12, reason: 'stillbirth' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'midwife and burial' },
          {
            type: 'role',
            personId: '$subject',
            role: 'grieving_father',
            add: true,
            reason: 'child died at birth',
          },
        ],
        significance: 0.85,
      },
    ],
    narration: [
      {
        id: 'vienna-family-fatherhood.child-born-at-home.alt1',
        key: 'child-born-at-home',
        text: '{subject}把六克朗数给接生的人，手指被热水烫得发红。屋里终于安静下来，{partner}闭着眼，孩子的小手从布里露出来，攥着一截空气。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-fatherhood.child-born-at-home.alt2',
        key: 'child-born-at-home',
        text: '走廊里的水壶响了三回，{subject}才想起给自己倒一杯。接生的人说母子都好，{subject}点头，把“父亲”两个字在心里念了一遍。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-fatherhood.child-and-mother-weak.alt1',
        key: 'child-and-mother-weak',
        text: '医生把十八克朗的账单压在药瓶下，说还要观察。{subject}抱着孩子在床边坐了一夜，天亮时才发现鞋穿反了，脚背磨出一道红印。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-family-fatherhood.child-and-mother-weak.alt2',
        key: 'child-and-mother-weak',
        text: '邻居把汤放在门口，没敢多问。{partner}睁开眼第一句是问孩子，{subject}把襁褓往前送了送，手臂抖得厉害。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-fatherhood.child-dies-at-birth.alt1',
        key: 'child-dies-at-birth',
        text: '市政办事处的人问了三遍孩子的名字，{subject}才说还没有取。六克朗换回一张薄纸，出门时风把纸吹得贴在手上。',
        tone: ['bureaucratic'],
      },
      {
        id: 'vienna-family-fatherhood.child-dies-at-birth.alt2',
        key: 'child-dies-at-birth',
        text: '邻居把摇篮搬走时，轮子在门槛上磕了一下。{subject}扶着门框让开路，回头看见{partner}还盯着天花板，嘴唇动了一下，没有出声。',
        tone: ['dry'],
      },
    ],
    tags: ['family', 'childbirth', 'death'],
    sourceIds: ['source-wien-geschichte-saeuglingssterblichkeit'],
    historicalBasis: basis,
  },

  {
    id: 'vienna-family-courtship',
    version: 1,
    packId: PACK,
    title: '提出共同生活',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 42 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 1,
    cooldownYears: 1,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 35 },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45, sex: 'opposite' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 35 },
      { kind: 'stage', in: ['adulthood'] },
      // Any living partner blocks courtship; a separated or non-cohabiting
      // partner is still a relationship, not an invitation to shop for a new one.
      { kind: 'notHasRelation', relationKind: 'partner' },
      { kind: 'health', min: 0.2 },
    ],
    outcomes: [
      {
        id: 'ask-to-share-a-home',
        weight: 0.7,
        immediateText:
          '{subject}在{place}靠窗的桌边，把一只空咖啡杯转了半圈，说房租两人合付、桌子两人共用。{partner}的手停在糖罐盖上，问了一句“要是过不下去呢”，没有当场答应，只说要想一想；杯里的咖啡凉了，话还悬在桌面上。',
        effects: [
          {
            type: 'interaction',
            interaction: {
              id: 'courtship:$eventId',
              initiatorId: '$subject',
              counterpartyIds: ['$partner'],
              kind: 'proposal',
              subject: '是否一起生活',
              status: 'pending',
              created: { year: 1, month: 1 },
              proposal: {
                acceptIf: { minTrust: 0, chance: 0.86 },
                causeEventId: '$eventId',
                acceptText:
                  '{counterparty}在几天后找到{subject}，说可以试试。两人开始合付房租，也把各自欠的账摊在桌上。',
                rejectText:
                  '{counterparty}没有答应，只说现在不合适。{subject}把这件事收回去，之后见面仍点头。',
                acceptEffects: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$counterparty',
                    kind: 'partner',
                    trust: 0.1,
                    affection: 0.12,
                    obligation: 0.1,
                    reason: 'agreed to share a household',
                  },
                  {
                    type: 'household',
                    personId: '$counterparty',
                    householdId: '$household',
                    reason: 'moved in together',
                  },
                  {
                    type: 'role',
                    personId: '$subject',
                    role: 'partner',
                    add: true,
                    reason: 'shared household',
                  },
                  {
                    type: 'role',
                    personId: '$counterparty',
                    role: 'partner',
                    add: true,
                    reason: 'shared household',
                  },
                ],
                rejectEffects: [
                  {
                    type: 'relation',
                    a: '$subject',
                    b: '$counterparty',
                    kind: 'acquaintance',
                    trust: -0.04,
                    reason: 'declined to share a household',
                  },
                ],
              },
              responses: [],
              visibility: 'participants',
            },
          },
        ],
      },
      {
        id: 'wait-for-a-better-year',
        weight: 0.3,
        immediateText:
          '{subject}把话咽回去，只说等明年工钱稳一点再谈。{partner}没有追问，两人把桌上的面包分完，各自去上工；出门时{subject}回头看了一眼，{partner}正把掉在桌上的面包屑拢进掌心，谁也没有把那个话头重新拾起来。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'acquaintance',
            trust: 0.02,
            reason: 'postponed the conversation',
          },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-family-courtship.ask-to-share-a-home.alt1',
        key: 'ask-to-share-a-home',
        text: '糖罐盖上的手停了一会儿才拿开。{partner}说这不是一句“合付房租”就能答的事，起身时把椅子推回桌下，动作比平时轻。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-courtship.ask-to-share-a-home.alt2',
        key: 'ask-to-share-a-home',
        text: '{subject}把房租、煤钱和两个人的工钱在纸上算了一遍，推到{partner}面前。{partner}看完没有点头，只把纸折起来收进袖口，说再想想。',
        tone: ['matter-of-fact'],
      },
      {
        id: 'vienna-family-courtship.wait-for-a-better-year.alt1',
        key: 'wait-for-a-better-year',
        text: '面包只剩最后一角，{partner}掰成两半，把大的那块推过来。{subject}没有接话，窗外的电车响了一声，两人同时站起来。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-courtship.wait-for-a-better-year.alt2',
        key: 'wait-for-a-better-year',
        text: '柜台后的钟敲了四下。{subject}把没说完的话咽回去，{partner}也没有追问，只把两个人的杯子摞在一起端走。',
        tone: ['tender'],
      },
    ],
    tags: ['family', 'courtship', 'household', 'social'],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    historicalBasis: basis,
  },

  {
    id: 'vienna-family-divorce',
    version: 1,
    packId: PACK,
    title: '共同生活走到尽头',
    stage: 'adulthood',
    ageWindow: { min: 20, max: 55 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 0.12,
    cooldownYears: 10,
    // One separation per person is enough for this slice. Without this, two
    // spouses can alternate as subjects and dissolve every new household within
    // a year or two, preventing any stable birth window.
    oncePerPerson: true,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 20, maxAge: 55 },
      {
        key: 'partner',
        kind: 'partner',
        required: true,
        minAge: 20,
        maxAge: 60,
      },
    ],
    conditions: [
      { kind: 'age', min: 20, max: 55 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'hasRelation', relationKind: 'partner' },
    ],
    outcomes: [
      {
        id: 'separate-under-one-roof',
        weight: 0.45,
        conditions: [{ kind: 'hasRelation', relationKind: 'partner', sameHousehold: true }],
        immediateText:
          '{subject}和{partner}把床铺分开，米和煤也各算各的。两人仍住在{residence}，因为谁都没有钱再租一间房；孩子在两床之间来回，三克朗买了隔开的锅碗和煤油，家里从此有两本账，夜里两盏灯先后熄灭。',
        effects: [
          {
            type: 'relation_end',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            reason: 'separated but could not afford two homes',
          },
          { type: 'mood', personId: '$subject', amount: -0.08, reason: 'separation' },
          { type: 'mood', personId: '$partner', amount: -0.08, reason: 'separation' },
          {
            type: 'cash',
            householdId: '$household',
            amount: -3,
            reason: 'separate household goods',
          },
        ],
      },
      {
        id: 'partner-moves-to-shared-housing',
        weight: 0.35,
        immediateText:
          '{partner}把一只箱子和工票搬去合租房，带走一半锅碗。{subject}留在{residence}，把空出来的床租给一个学徒，用租金补房租；搬家花掉四克朗，{subject}在户籍上成了分居的人，夜里听见隔壁床板响，总要愣一下。',
        effects: [
          {
            type: 'relation_end',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            reason: 'divorced and moved out',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: 'household:shared-tenement',
            reason: 'moved into shared housing after separation',
          },
          {
            type: 'cash',
            householdId: '$household',
            amount: -4,
            reason: 'moving and separate goods',
          },
          { type: 'mood', personId: '$subject', amount: -0.06, reason: 'separation' },
          {
            type: 'role',
            personId: '$subject',
            role: 'separated',
            add: true,
            reason: 'marriage ended',
          },
        ],
      },
      {
        id: 'reconcile-for-now',
        weight: 0.2,
        immediateText:
          '{subject}和{partner}在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌。谁都没有提和好，只把账本重新摊开；{partner}把煤钱推过来，{subject}接过去数了两遍，手指碰到一起又分开，屋里的灯亮到很晚。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.03,
            obligation: 0.05,
            reason: 'stayed together for practical reasons',
          },
          { type: 'mood', personId: '$subject', amount: -0.03, reason: 'unresolved conflict' },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-family-divorce.separate-under-one-roof.alt1',
        key: 'separate-under-one-roof',
        text: '床架被挪开半尺，墙上的旧钉眼露出来。{subject}把自己的杯子放到桌角左边，{partner}看了一眼，把另一只杯子放到右边。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-divorce.separate-under-one-roof.alt2',
        key: 'separate-under-one-roof',
        text: '三克朗买回两只新锅和一小罐煤油。孩子半夜醒来，站在两张床之间看了一会儿，最后爬回{subject}这边；{partner}翻了个身，没有出声。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-divorce.partner-moves-to-shared-housing.alt1',
        key: 'partner-moves-to-shared-housing',
        text: '箱子在楼梯口磕掉一块木角，{partner}没有回头捡。{subject}把四克朗搬家钱数出去，回头看见空出来的床板上留着一圈灰印。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-divorce.partner-moves-to-shared-housing.alt2',
        key: 'partner-moves-to-shared-housing',
        text: '学徒把铺盖卷放在空床上，问这屋子原来住的是谁。{subject}说是个远房亲戚，转身去灶上烧水；夜里隔壁床板一响，{subject}还是醒了。',
        tone: ['matter-of-fact'],
      },
      {
        id: 'vienna-family-divorce.reconcile-for-now.alt1',
        key: 'reconcile-for-now',
        text: '账本摊在桌上，两个人都没有先翻页。{partner}把煤钱推过来，{subject}数了两遍，最后把多出的一枚铜板推回去。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-divorce.reconcile-for-now.alt2',
        key: 'reconcile-for-now',
        text: '楼道里的灯灭了，两人摸黑坐了一会儿。{partner}说下个月房租不能拖，{subject}嗯了一声；谁也没有提“以后”，但谁也没有起身走。',
        tone: ['tender'],
      },
    ],
    tags: ['family', 'marriage', 'divorce', 'housing'],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    historicalBasis: basis,
  },
  {
    id: 'vienna-family-same-sex-female',
    version: 1,
    packId: PACK,
    title: '两个女人的共同生活',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 40 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 0.04,
    cooldownYears: 10,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 40, sex: 'female' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 40, sex: 'female' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 40 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner' },
    ],
    outcomes: [
      {
        id: 'private-household',
        weight: 0.55,
        immediateText:
          '{subject}和{partner}合租一间房，对外说是表姐妹。两人共用一只炉子、一本账和一张床，白天各自上工，晚上把门闩好；房租从两人的工钱里各出一半，日子紧，却比各自的旧住处暖，窗台上还并排晾着两只杯子。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.1,
            affection: 0.15,
            obligation: 0.08,
            reason: 'private same-sex partnership',
          },
          {
            type: 'household',
            personId: '$partner',
            householdId: '$household',
            reason: 'moved in as a companion',
          },
          { type: 'mood', personId: '$subject', amount: 0.06, reason: 'companionship' },
        ],
      },
      {
        id: 'public-suspicion',
        weight: 0.3,
        immediateText:
          '楼里的邻居开始议论{subject}和{partner}。有人把门牌记下来，房东来敲门，说这栋楼不接受“这种住法”；{partner}把箱子拖出来又推回床下，搬家花掉五克朗，两人那一夜都没睡稳。{subject}在院子里被人盯着看，门上的名字也被人用手指划过。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.05,
            affection: 0.08,
            fear: 0.1,
            reason: 'relationship under social pressure',
          },
          {
            type: 'reputation',
            personId: '$subject',
            amount: -0.12,
            reason: 'neighbourhood gossip',
          },
          { type: 'mood', personId: '$subject', amount: -0.1, reason: 'social exposure' },
          { type: 'cash', householdId: '$household', amount: -5, reason: 'moving and lost rent' },
          {
            type: 'role',
            personId: '$subject',
            role: 'watched_by_neighbours',
            add: true,
            reason: 'same-sex household noticed',
          },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-family-same-sex-female.private-household.alt1',
        key: 'private-household',
        text: '门闩是{partner}新换的，推上去有点涩。{subject}把两只杯子并排放在窗台，房东在楼下喊了一声，两人同时停住，听见脚步声走远才继续说话。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-same-sex-female.private-household.alt2',
        key: 'private-household',
        text: '账本上两个人的工钱写在同一页，中间只隔一道竖线。{partner}把房租数出来，{subject}把煤钱补上；炉子上的水开了，屋里总算有点热气。',
        tone: ['matter-of-fact'],
      },
      {
        id: 'vienna-family-same-sex-female.public-suspicion.alt1',
        key: 'public-suspicion',
        text: '房东的手指在门框上敲了两下，说这楼里住的是正经人家。{partner}把箱子拖出来，又推回床下；{subject}站在门后，听见邻居在楼梯口压低声音说话。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-same-sex-female.public-suspicion.alt2',
        key: 'public-suspicion',
        text: '五克朗付了搬家的车钱，箱子最后还是留在屋里。{subject}把门上的名字擦了一遍，第二天又被人用手指划过；{partner}说要不走吧，{subject}没有答。',
        tone: ['matter-of-fact'],
      },
    ],
    tags: ['family', 'intimacy', 'same_sex', 'housing'],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    historicalBasis: basis,
  },
  {
    id: 'vienna-family-same-sex-male',
    version: 1,
    packId: PACK,
    title: '不能见光的同住',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 45 },
    subjectProvenance: ['birth', 'initial', 'materialized_population'],
    rate: 0.1,
    cooldownYears: 4,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'male' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45, sex: 'male' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 45 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner' },
    ],
    outcomes: [
      {
        id: 'private-arrangement',
        weight: 0.55,
        immediateText:
          '{subject}和{partner}在城边租了一间小屋，对外只说是同事合住。房租四克朗，两人不同时出门，信件用假名，夜里把窗帘拉严；{partner}在门后放了一根木棍，{subject}把两人的工票分开放，连咳嗽都压着声。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.08,
            affection: 0.12,
            fear: 0.08,
            reason: 'private same-sex relationship',
          },
          { type: 'mood', personId: '$subject', amount: 0.04, reason: 'private companionship' },
          { type: 'cash', householdId: '$household', amount: -4, reason: 'separate room rent' },
        ],
      },
      {
        id: 'denounced-to-police',
        weight: 0.3,
        immediateText:
          '旅店伙计记下了{subject}和{partner}的名字。几天后警察来敲门，把两人带去问话；{subject}丢了工位，罚了八克朗，{partner}的家里把人接走。{subject}在档案里留下一条警察记录，手指上还留着问话时磕出的淤青。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: -0.05,
            fear: 0.2,
            reason: 'police denunciation',
          },
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'police questioning' },
          { type: 'reputation', personId: '$subject', amount: -0.2, reason: 'public denunciation' },
          { type: 'unemployment', personId: '$subject', reason: 'dismissed after police visit' },
          { type: 'cash', householdId: '$household', amount: -8, reason: 'fine and lost work' },
          {
            type: 'role',
            personId: '$subject',
            role: 'police_record',
            add: true,
            reason: 'same-sex conduct recorded',
          },
        ],
      },
      {
        id: 'leave-vienna',
        weight: 0.15,
        immediateText:
          '{subject}和{partner}没有等到下一次敲门。两人把能卖的东西卖掉，买了两张去城外的车票，一共十二克朗，约好在不同车站上车；到了克洛斯特新堡的姑母家，两人把行李放在同一间屋里，才算把气喘匀。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$partner',
            kind: 'partner',
            trust: 0.08,
            affection: 0.1,
            fear: 0.1,
            reason: 'left together',
          },
          {
            type: 'move',
            personId: '$subject',
            locationId: 'place-klosterneuburg-aunt-house',
            reason: 'left Vienna',
          },
          {
            type: 'move',
            personId: '$partner',
            locationId: 'place-klosterneuburg-aunt-house',
            reason: 'left Vienna',
          },
          {
            type: 'cash',
            householdId: '$household',
            amount: -12,
            reason: 'train tickets and lodging',
          },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-family-same-sex-male.private-arrangement.alt1',
        key: 'private-arrangement',
        text: '窗帘是旧床单改的，边上还留着原来的花。{partner}把木棍倚在门后，{subject}把两封信分开藏；楼下的门一响，两人都停下手里的活。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-same-sex-male.private-arrangement.alt2',
        key: 'private-arrangement',
        text: '四克朗房租放在桌上，{partner}数了一遍，{subject}又数了一遍。两人不同时出门，一个先走，一个在窗后看着街角；屋子小，却总算有一扇能关严的门。',
        tone: ['tender'],
      },
      {
        id: 'vienna-family-same-sex-male.denounced-to-police.alt1',
        key: 'denounced-to-police',
        text: '警察把两人的名字分开写，问谁先开口。{subject}说自己是房客，{partner}低着头；八克朗罚金放在桌上，工牌被收走，出门时天已经黑了。',
        tone: ['bureaucratic'],
      },
      {
        id: 'vienna-family-same-sex-male.denounced-to-police.alt2',
        key: 'denounced-to-police',
        text: '{partner}的家里来人在门口等着，把人接走时没有看{subject}。{subject}站在台阶上，手指上的淤青慢慢发紫，档案里那行字却比淤青留得久。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-same-sex-male.leave-vienna.alt1',
        key: 'leave-vienna',
        text: '两张车票分开买，{subject}在月台这头，{partner}在那头。火车开动后两人才在车厢连接处站到一起，谁也没有说话，只把行李往同一张座位底下推。',
        tone: ['dry'],
      },
      {
        id: 'vienna-family-same-sex-male.leave-vienna.alt2',
        key: 'leave-vienna',
        text: '姑母家的门开着，厨房里飘出汤味。{subject}和{partner}把箱子放在同一间屋里，十二克朗的车票钱已经花光；姑母没有多问，只添了两只碗。',
        tone: ['tender'],
      },
    ],
    tags: ['family', 'intimacy', 'same_sex', 'persecution'],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    historicalBasis: basis,
  },
];

/**
 * Tag the whole family pack as lifecycle content. The engine gives one
 * lifecycle scene a dedicated attempt per person-year before the ordinary
 * weighted pool, so a courtship or birth is not crowded out by dozens of
 * smaller neighbourhood events.
 */
export const VIENNA_FAMILY_SCENES: SceneDefinition[] = FAMILY_SCENE_DEFINITIONS.map((scene) => ({
  ...scene,
  tags: [...new Set([...scene.tags, 'lifecycle'])],
}));

/** The runtime uses the request/response courtship path, not the legacy instant-marriage scenes. */
export const VIENNA_FAMILY_RUNTIME_SCENES = VIENNA_FAMILY_SCENES.filter(
  (scene) => !scene.id.startsWith('vienna-family-partnership-'),
);
