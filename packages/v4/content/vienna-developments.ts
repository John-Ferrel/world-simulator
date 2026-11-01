import type { SceneDefinition } from '../domain.js';

/**
 * Authored runtime content for supported WorldDevelopment objects.
 *
 * The scenes are dormant unless a validated macro proposal creates a matching
 * development. They demonstrate the bridge from an LLM-created organization to
 * concrete person opportunities, membership and consequences.
 */
export const VIENNA_DEVELOPMENT_SCENES: SceneDefinition[] = [
  {
    id: 'vienna-social-movement.recruitment',
    version: 1,
    packId: 'vienna-developments',
    title: '一张折起来的传单',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60 },
      {
        key: 'organization',
        kind: 'organization',
        required: true,
      },
      { key: 'neighbor', kind: 'neighbor', required: true, minAge: 18, maxAge: 70 },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'developmentType', type: 'social_change' },
    ],
    tags: ['development', 'social_movement', 'organization', 'politics'],
    rate: 0.35,
    cooldownYears: 2,
    outcomes: [
      {
        id: 'join-and-carry',
        weight: 0.5,
        immediateText:
          '{subject}在楼梯下面接到一张折成四折的传单。纸上没有署名，只写着下一次集会的地址。{subject}去了，在昏暗的屋里报上姓名，成为{organization}的一员，并答应负责自己所在街区的联络。',
        effects: [
          {
            type: 'organization_membership',
            personId: '$subject',
            organizationId: '$organization',
            add: true,
            reason: 'joined a new social movement',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'movement_member',
            add: true,
            reason: 'movement member',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$neighbor',
            kind: 'acquaintance',
            trust: 0.03,
            reason: 'met at a movement meeting',
          },
        ],
      },
      {
        id: 'read-and-decline',
        weight: 0.3,
        immediateText:
          '{subject}把传单读了两遍，记下上面的地址，却没有去。第二天照常上工；午休时听见两个工友低声谈论同一场集会。',
        effects: [
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.01,
            reason: 'a political invitation declined',
          },
        ],
      },
      {
        id: 'report-to-official',
        weight: 0.2,
        immediateText:
          '{subject}把传单交给楼里的门房。门房没有接，只让{subject}自己去找警察局。那天傍晚，两个穿便衣的人在街口站了很久。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'denouncer',
            add: true,
            reason: 'reported a political leaflet',
          },
          {
            type: 'reputation',
            personId: '$subject',
            amount: 0.02,
            reason: 'official report',
          },
        ],
      },
    ],
    sourceIds: ['source-gpa-djp-geschichte'],
    historicalBasis:
      'Political and social organizations recruited through informal networks, print and meetings; police surveillance was a real risk.',
  },
  {
    id: 'vienna-social-movement.meeting',
    version: 1,
    packId: 'vienna-developments',
    title: '后屋里的会议',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 65 },
      { key: 'organization', kind: 'organization', required: true },
      { key: 'official', kind: 'official', required: false, minAge: 25, maxAge: 65 },
      { key: 'neighbor', kind: 'neighbor', required: true, minAge: 18, maxAge: 75 },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 65 },
      { kind: 'developmentType', type: 'social_change' },
      { kind: 'hasRole', role: 'movement_member' },
    ],
    tags: ['development', 'social_movement', 'organization', 'meeting'],
    rate: 0.4,
    cooldownYears: 1,
    outcomes: [
      {
        id: 'speak-and-organize',
        weight: 0.45,
        immediateText:
          '{subject}在后屋的会议上报出自己街区的名字：谁家缺煤，谁被房东催租，谁知道哪间印刷厂还在招人。{organization}把这些事记进一本旧账本，散会时每个人带走一叠更小的纸条。',
        effects: [
          {
            type: 'skill',
            personId: '$subject',
            skill: 'social',
            amount: 0.04,
            reason: 'organizing a neighbourhood',
          },
          {
            type: 'reputation',
            personId: '$subject',
            amount: 0.02,
            reason: 'known in the movement',
          },
        ],
      },
      {
        id: 'police-raid',
        weight: 0.3,
        conditions: [{ kind: 'worldYear', min: 1914, max: 1938 }],
        immediateText:
          '会议还没结束，楼下传来皮鞋和门栓的声音。{subject}把账本塞进炉子，大家从后门散去；第二天，{organization}的两个名字已经写在警察局的纸上。',
        effects: [
          {
            type: 'organization_membership',
            personId: '$subject',
            organizationId: '$organization',
            add: false,
            reason: 'organization broken up by police',
          },
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.08,
            reason: 'police raid and fear',
          },
        ],
      },
      {
        id: 'quiet-solidarity',
        weight: 0.25,
        immediateText:
          '{subject}没有发言，只把带来的面包分成几份。散会时，一个不认识的女人把她的地址塞给{subject}，说那条街还需要有人继续收会费。',
        effects: [
          {
            type: 'relation',
            a: '$subject',
            b: '$neighbor',
            kind: 'acquaintance',
            trust: 0.02,
            reason: 'shared bread at a meeting',
          },
        ],
      },
    ],
    sourceIds: ['source-gpa-djp-geschichte'],
    historicalBasis:
      'Working-class associations met in back rooms and courtyards; meetings could build solidarity or invite police repression.',
  },
  {
    id: 'vienna-social-movement.aftermath',
    version: 1,
    packId: 'vienna-developments',
    title: '组织留下的名单',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 65 },
      { key: 'organization', kind: 'organization', required: true },
      { key: 'official', kind: 'official', required: false, minAge: 25, maxAge: 65 },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 65 },
      { kind: 'developmentType', type: 'social_change' },
      { kind: 'hasRole', role: 'movement_member' },
    ],
    tags: ['development', 'social_movement', 'organization', 'consequence'],
    rate: 0.2,
    cooldownYears: 3,
    outcomes: [
      {
        id: 'keep-the-list',
        weight: 0.45,
        immediateText:
          '{subject}把{organization}的名单藏进缝纫机抽屉的夹层。名单上有二十几个名字，其中两个已经搬走，一个被工厂开除。{subject}没有把最后一行划掉。',
        effects: [
          {
            type: 'flag',
            personId: '$subject',
            flag: 'movement_list_holder',
            add: true,
            reason: 'kept the organization list',
          },
          {
            type: 'reputation',
            personId: '$subject',
            amount: 0.03,
            reason: 'trusted with the list',
          },
        ],
      },
      {
        id: 'burn-the-list',
        weight: 0.35,
        immediateText:
          '{subject}在厨房的炉子里烧掉名单。纸灰卷起来，像黑色的叶子。{subject}仍然去上工，但从那以后不再在公开场合提起{organization}。',
        effects: [
          {
            type: 'organization_membership',
            personId: '$subject',
            organizationId: '$organization',
            add: false,
            reason: 'left the movement after pressure',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'movement_member',
            add: false,
            reason: 'left the movement',
          },
          {
            type: 'mood',
            personId: '$subject',
            amount: -0.03,
            reason: 'political retreat',
          },
        ],
      },
      {
        id: 'testify',
        weight: 0.2,
        immediateText:
          '{subject}在警察局走廊里等了一下午，最后把知道的地址写在纸上。回家时，楼道里有人把门关得很轻；{subject}知道他们听见了脚步声。',
        effects: [
          {
            type: 'organization_membership',
            personId: '$subject',
            organizationId: '$organization',
            add: false,
            reason: 'left after giving a statement',
          },
          {
            type: 'reputation',
            personId: '$subject',
            amount: -0.05,
            reason: 'seen at the police station',
          },
        ],
      },
    ],
    sourceIds: ['source-gpa-djp-geschichte'],
    historicalBasis:
      'Political lists, denunciations and police pressure shaped whether working-class organizations persisted.',
  },
];
