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
    subjectProvenance: ['birth', 'initial'],
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
    subjectProvenance: ['birth', 'initial'],
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
    subjectProvenance: ['birth', 'initial'],
    rate: 1,
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
    subjectProvenance: ['birth', 'initial'],
    rate: 0.12,
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

  {
    id: 'vienna-family-courtship',
    version: 1,
    packId: PACK,
    title: '提出共同生活',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 35 },
    subjectProvenance: ['birth', 'initial'],
    rate: 0.35,
    cooldownYears: 2,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 35 },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45, sex: 'opposite' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 35 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner', sameHousehold: true },
      { kind: 'health', min: 0.2 },
    ],
    outcomes: [
      {
        id: 'ask-to-share-a-home',
        weight: 0.7,
        immediateText:
          '{subject}在{place}向{partner}提出一起过日子：合付房租、共用一张桌子，先把日子过稳。{partner}没有当场回答，只说要想一想。',
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
                acceptIf: { minTrust: 0, chance: 0.7 },
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
          '{subject}把话咽回去，只说等明年工钱稳一点再谈。{partner}没有追问，两人把桌上的面包分完，各自去上工。',
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
    subjectProvenance: ['birth', 'initial'],
    rate: 0.08,
    cooldownYears: 5,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 20, maxAge: 55 },
      {
        key: 'partner',
        kind: 'partner',
        required: true,
        minAge: 20,
        maxAge: 60,
        sameHousehold: true,
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
        immediateText:
          '{subject}和{partner}把床铺分开，米和煤也各算各的。两人仍住在{residence}，因为谁都没有钱再租一间房；孩子在两张床之间来回。',
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
          '{partner}把一只箱子和自己的工票搬去合租房，带走一半锅碗。{subject}留在{residence}，把空出来的床租给了一个学徒，用租金补房租。',
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
          '{subject}和{partner}在楼道里吵到半夜，最后因为下个月的房租又坐回同一张桌子。谁都没有提和好，只把账本重新摊开。',
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
    subjectProvenance: ['birth', 'initial'],
    rate: 0.12,
    cooldownYears: 3,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 40, sex: 'female' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 40, sex: 'female' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 40 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner', sameHousehold: true },
    ],
    outcomes: [
      {
        id: 'private-household',
        weight: 0.55,
        immediateText:
          '{subject}和{partner}合租一间房，对外说是表姐妹。两人共用一只炉子、一本账和一张床，白天各自上工，晚上把门闩好。',
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
          '楼里的邻居开始议论{subject}和{partner}。有人把她们的门牌记下来，房东来敲门，说这栋楼不接受“这种住法”。{partner}当晚收拾了箱子。',
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
    subjectProvenance: ['birth', 'initial'],
    rate: 0.1,
    cooldownYears: 3,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'male' },
      { key: 'partner', kind: 'partner', required: true, minAge: 18, maxAge: 45, sex: 'male' },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 45 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'notHasRelation', relationKind: 'partner', sameHousehold: true },
    ],
    outcomes: [
      {
        id: 'private-arrangement',
        weight: 0.55,
        immediateText:
          '{subject}和{partner}在城边租了一间小屋，对外只说是同事合住。两人不同时出门，信件用假名，夜里把窗帘拉严。',
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
          '旅店伙计记下了{subject}和{partner}的名字。几天后警察来敲门，把两人带去问话；{subject}丢了工位，{partner}的家里把他接走。',
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
          '{subject}和{partner}没有等到下一次敲门。两人把能卖的东西卖掉，买了去城外的车票，约好在不同车站上车。',
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
