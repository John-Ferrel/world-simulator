import type { SceneDefinition } from '../domain.js';

/**
 * Family formation for player-born people and their descendants. These scenes
 * are deliberately restricted to `provenance.kind === 'birth'`: the authored
 * 1912 cast keeps its written biography, while a player's child can marry,
 * move in with a partner and have children of their own.
 *
 * The engine creates the child as a real Person with parent/guardian relations,
 * household membership and its own birth EventFact. Names are drawn
 * deterministically from a small Vienna name pool unless the scene names one.
 */

const PACK = 'vienna-family';

const basis =
  'Marriage, cohabitation, childbirth and infant mortality are modelled as household-level mechanisms in early twentieth-century Vienna; the scenes are not biographies of specific people.';

export const VIENNA_FAMILY_SCENES: SceneDefinition[] = [
  {
    id: 'vienna-family-partnership-female',
    version: 1,
    packId: PACK,
    title: '订婚与搬进同一间住处',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 35 },
    subjectProvenance: ['birth'],
    cooldownYears: 2,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 35, sex: 'female' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 60, sex: 'male' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 35 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner' },
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
    subjectProvenance: ['birth'],
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
    ageWindow: { min: 19, max: 40 },
    subjectProvenance: ['birth'],
    cooldownYears: 3,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 19, maxAge: 40, sex: 'female' },
      {
        key: 'partner',
        kind: 'partner',
        required: true,
        minAge: 18,
        maxAge: 65,
        sex: 'male',
        sameHousehold: true,
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
      { kind: 'hasRelation', relationKind: 'partner', minTrust: 0.05 },
      { kind: 'cash', householdId: 'subject', max: 120 },
    ],
    outcomes: [
      {
        id: 'daughter-born',
        weight: 0.35,
        immediateText:
          '{subject}在{residence}生下一个女婴，取名{child}。{partner}在走廊烧水，邻居借来一只摇篮；孩子哭声响亮，接生的人收下六克朗。',
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
          '{subject}在{residence}生下一个男婴，取名{child}。{partner}把消息带到工厂，工友凑了几个克朗；家里把唯一的摇篮重新刷了一遍。',
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
          '{subject}难产，接生的人守了两天。孩子最后生下来，取名{child}，{subject}却一直发烧，医院又收了一笔钱。{partner}把钟表送进当铺。',
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
          '孩子生下来没有哭声。接生的人把布盖上去，{partner}在楼梯间坐了很久。{subject}在床上躺了三天，家里没有办葬礼，只去市政办事处登记。',
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
    subjectProvenance: ['birth'],
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
    ],
    outcomes: [
      {
        id: 'child-born-at-home',
        weight: 0.55,
        immediateText:
          '{partner}在{residence}生下一个孩子，取名{child}。{subject}在厨房和走廊之间来回，接生的人让他去烧水、拿布、付钱。孩子天亮后睡着了。',
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
          '孩子出生后取名{child}，{partner}一直出血。{subject}跑去医院，医生来晚了，只留下药和账单。{subject}抱着孩子坐在床边，直到邻居把汤送来。',
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
          '孩子出生时已经没有呼吸。{subject}去市政办事处登记，回来时{partner}还躺在床上看着天花板。邻居把借来的摇篮搬走了。',
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
    tags: ['family', 'childbirth', 'death'],
    sourceIds: ['source-wien-geschichte-saeuglingssterblichkeit'],
    historicalBasis: basis,
  },
];
