import type { SceneDefinition } from '../domain.js';

/**
 * Universal Vienna life scenes for player-born characters.
 *
 * Unlike the authored 1912 slice, these scenes do not know the child's name or
 * family ids. They use role-relative effect references (`$subject`, `$mother`,
 * `$household`, `$employerOrg`) and `{subject}` / `{mother}` / `{residence}`
 * text tokens, which the engine resolves against the actual cast at commit
 * time. They are restricted to `provenance.kind === 'birth'` so the authored
 * biographies of the seed cast stay intact.
 */

const P = {
  school: 'place-wien-volksschule-leopoldstadt',
  lyceum: 'place-wien-maedchenlyzeum',
  printshop: 'place-wien-printshop-winter',
  hospital: 'place-wien-allgemeines-krankenhaus',
  magistrate: 'place-wien-magistrat',
  market: 'place-wien-markthalle',
  barracks: 'place-wien-landwehr-barracks',
  union: 'place-wien-printers-union-hall',
  orphanage: 'place-wien-orphanage',
  tenement: 'place-wien-leopoldstadt-tenement',
  aunt: 'place-klosterneuburg-aunt-house',
};

const PACK = 'vienna-life';

const viennaBasis = {
  historicalBasis:
    'Vienna household, school, printshop and war conditions reconstructed from the source list in the 1912 content pack; the scenes are game mechanisms, not biographies.',
};

export const VIENNA_LIFE_SCENES: SceneDefinition[] = [
  {
    id: 'vienna-life-infant-feeding',
    version: 1,
    packId: PACK,
    title: '一天里的几顿奶',
    stage: 'infancy',
    ageWindow: { min: 0, max: 1 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 0, maxAge: 1 },
      {
        key: 'mother',
        kind: 'parent',
        required: true,
        minAge: 16,
        maxAge: 48,
        sex: 'female',
        sameHousehold: true,
      },
      {
        key: 'father',
        kind: 'parent',
        required: false,
        minAge: 16,
        maxAge: 60,
        sex: 'male',
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 0, max: 1 },
      { kind: 'stage', in: ['infancy'] },
      { kind: 'placeKind', in: ['home'] },
      { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.2 },
    ],
    outcomes: [
      {
        id: 'fed-enough',
        weight: 0.5,
        immediateText:
          '{mother}在{residence}给{subject}喂奶，随后把洗净的布尿片挂在窗边。孩子吃饱后睡着了，锅里还留着半碗燕麦糊。',
        effects: [
          { type: 'health', personId: '$subject', amount: 0.02, reason: 'fed through the day' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'milk and oatmeal' },
          {
            type: 'relation',
            a: '$mother',
            b: '$subject',
            kind: 'kin',
            affection: 0.04,
            obligation: 0.04,
            reason: 'daily feeding',
          },
        ],
      },
      {
        id: 'fed-bread-pap',
        weight: 0.3,
        immediateText:
          '奶水不够，{mother}把黑面包掰碎泡在热水里，加一点糖喂给{subject}。孩子夜里哭得更久，肚子鼓胀。',
        effects: [
          {
            type: 'health',
            personId: '$subject',
            amount: -0.03,
            reason: 'bread pap instead of milk',
          },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'stomach ache',
            add: true,
            reason: 'bread pap',
          },
          { type: 'cash', householdId: '$household', amount: -1, reason: 'bread and sugar' },
        ],
      },
      {
        id: 'fed-cows-milk',
        weight: 0.2,
        immediateText:
          '家里有人从街角奶店带回一小罐牛奶，{mother}兑水煮开，用小勺喂给{subject}。罐底有一层灰，奶店老板说这已经是最好的。',
        effects: [
          { type: 'cash', householdId: '$household', amount: -3, reason: 'cow milk' },
          { type: 'health', personId: '$subject', amount: 0.01, reason: 'cow milk' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'loose stools',
            add: true,
            reason: 'watered cow milk',
          },
        ],
      },
    ],
    tags: ['infancy', 'food', 'household'],
    sourceIds: [
      'source-wien-geschichte-saeuglingssterblichkeit',
      'source-wien-geschichte-molkerei',
    ],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-infant-fever',
    version: 1,
    packId: PACK,
    title: '婴儿夜里发烧',
    stage: 'infancy',
    ageWindow: { min: 0, max: 2 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 0, maxAge: 2 },
      {
        key: 'mother',
        kind: 'parent',
        required: true,
        minAge: 16,
        maxAge: 48,
        sex: 'female',
        sameHousehold: true,
      },
      {
        key: 'doctor',
        kind: 'worker',
        required: false,
        minAge: 24,
        maxAge: 75,
        occupation: 'Arzt',
      },
    ],
    conditions: [
      { kind: 'age', min: 0, max: 2 },
      { kind: 'stage', in: ['infancy'] },
      { kind: 'placeKind', in: ['home'] },
    ],
    outcomes: [
      {
        id: 'fever-passes',
        weight: 0.45,
        immediateText:
          '{subject}烧了两夜。{mother}用湿布擦额头，天亮时体温退下去，孩子开始要水喝。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.06, reason: 'two nights of fever' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'clean linen and fuel' },
        ],
      },
      {
        id: 'doctor-called',
        weight: 0.3,
        immediateText:
          '{mother}托邻居去请医生。医生在午后进门，听了孩子的胸口，留下药粉和一张账单，收了八克朗。',
        effects: [
          { type: 'cash', householdId: '$household', amount: -8, reason: 'doctor visit' },
          { type: 'health', personId: '$subject', amount: 0.02, reason: 'doctor treatment' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'recovering from fever',
            add: true,
            reason: 'treated fever',
          },
        ],
      },
      {
        id: 'fever-death',
        weight: 0.25,
        conditions: [{ kind: 'health', max: 0.55 }],
        immediateText:
          '第三个夜里，{subject}的呼吸变浅。{mother}一直抱着孩子坐到天亮，医生来时只摇了摇头。家里拿出四克朗办葬礼。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.8, reason: 'untreated infant fever' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'dehydration',
            add: true,
            reason: 'infant fever',
          },
          {
            type: 'death',
            personId: '$subject',
            cause: 'infant fever and dehydration',
            reason: 'died at home before effective treatment',
          },
          { type: 'cash', householdId: '$household', amount: -4, reason: 'burial' },
        ],
        significance: 0.85,
      },
    ],
    tags: ['infancy', 'illness', 'death'],
    sourceIds: ['source-wien-geschichte-saeuglingssterblichkeit'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-school-enrolment',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '第一次去国民学校',
    stage: 'childhood',
    ageWindow: { min: 6, max: 7 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 6, maxAge: 7 },
      {
        key: 'mother',
        kind: 'parent',
        required: true,
        minAge: 18,
        maxAge: 55,
        sex: 'female',
        sameHousehold: true,
      },
      {
        key: 'teacher',
        kind: 'teacher',
        required: true,
        minAge: 20,
        maxAge: 70,
      },
    ],
    conditions: [
      { kind: 'age', min: 6, max: 7 },
      { kind: 'stage', in: ['childhood'] },
      { kind: 'education', in: ['none', 'home'] },
      { kind: 'cash', householdId: 'subject', max: 500 },
    ],
    outcomes: [
      {
        id: 'enrolled',
        weight: 0.55,
        immediateText:
          '{mother}带{subject}到{school}报名。{teacher}在名册上写下孩子的姓名和出生月份，收了两克朗书本费，让孩子第二天带一块石板来。',
        effects: [
          {
            type: 'education',
            personId: '$subject',
            status: 'primary',
            level: 1,
            placeId: P.school,
            reason: 'enrolled at the district school',
          },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'school books' },
          { type: 'role', personId: '$subject', role: 'pupil', add: true, reason: 'enrolled' },
          {
            type: 'relation',
            a: '$subject',
            b: '$teacher',
            kind: 'acquaintance',
            respect: 0.1,
            reason: 'first teacher',
          },
        ],
      },
      {
        id: 'half-day-place',
        weight: 0.3,
        immediateText:
          '学校只收半日班，{teacher}说下午还有空位，但课本要家里自己买。{mother}先交了一克朗，把{subject}的名字写在候补名单上。',
        effects: [
          {
            type: 'education',
            personId: '$subject',
            status: 'primary',
            level: 1,
            placeId: P.school,
            reason: 'half-day school place',
          },
          { type: 'cash', householdId: '$household', amount: -1, reason: 'partial school fee' },
          { type: 'role', personId: '$subject', role: 'pupil', add: true, reason: 'enrolled' },
        ],
      },
      {
        id: 'kept-home',
        weight: 0.15,
        immediateText:
          '{mother}在报名处门口站了一会儿，最后把{subject}带回家。家里需要有人看小妹妹，学校可以明年再去。{teacher}在名册上把名字划掉了。',
        effects: [
          {
            type: 'education',
            personId: '$subject',
            status: 'home',
            reason: 'kept home to mind younger children',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'child_minder',
            add: true,
            reason: 'minding younger siblings',
          },
        ],
      },
    ],
    tags: ['childhood', 'school', 'fees'],
    sourceIds: ['source-wien-geschichte-schule', 'source-wien-geschichte-kinderarbeit'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-school-day',
    version: 1,
    packId: PACK,
    title: '石板、点名与冻僵的手指',
    stage: 'childhood',
    ageWindow: { min: 7, max: 11 },
    subjectProvenance: ['birth'],
    oncePerPerson: true,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 7, maxAge: 11 },
      { key: 'teacher', kind: 'teacher', required: true, minAge: 20, maxAge: 70 },
      {
        key: 'mother',
        kind: 'parent',
        required: false,
        minAge: 18,
        maxAge: 55,
        sex: 'female',
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 7, max: 11 },
      { kind: 'stage', in: ['childhood'] },
      { kind: 'education', in: ['primary'] },
    ],
    outcomes: [
      {
        id: 'recites',
        weight: 0.4,
        immediateText:
          '{teacher}让{subject}站到黑板前背乘法表。孩子背到七乘八时停了一下，还是背完了。放学时手指冻得发红，石板上的字被袖子擦掉一半。',
        effects: [
          {
            type: 'education',
            personId: '$subject',
            status: 'primary',
            level: 2,
            placeId: P.school,
            reason: 'completed another school term',
          },
          { type: 'health', personId: '$subject', amount: -0.01, reason: 'cold classroom' },
        ],
      },
      {
        id: 'punished',
        weight: 0.35,
        immediateText:
          '{subject}在课堂上和同桌说话，{teacher}用戒尺打了手心。孩子把红肿的手藏在桌下，放学后不敢让家里人看见。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'punishment at school' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'bruised palm',
            add: true,
            reason: 'school punishment',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$teacher',
            kind: 'acquaintance',
            fear: 0.12,
            trust: -0.04,
            reason: 'corporal punishment',
          },
        ],
      },
      {
        id: 'hungry-in-class',
        weight: 0.25,
        immediateText:
          '{subject}早上只喝了一碗清汤，第二节课时眼前发黑。{teacher}让孩子去走廊坐一会儿，给了半块面包。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.03, reason: 'went to school hungry' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'hungry',
            add: true,
            reason: 'no breakfast',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$teacher',
            kind: 'acquaintance',
            trust: 0.05,
            reason: 'teacher gave bread',
          },
        ],
      },
    ],
    tags: ['childhood', 'school', 'hunger'],
    sourceIds: ['source-wien-geschichte-schule'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-child-labour',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '放学后的折页活',
    stage: 'childhood',
    ageWindow: { min: 9, max: 11 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 9, maxAge: 12 },
      {
        key: 'mother',
        kind: 'parent',
        required: true,
        minAge: 18,
        maxAge: 55,
        sex: 'female',
        sameHousehold: true,
      },
      {
        key: 'employer',
        kind: 'employer',
        required: true,
        organizationKind: 'factory',
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 9, max: 11 },
      { kind: 'stage', in: ['childhood'] },
      { kind: 'education', in: ['primary', 'home'] },
      { kind: 'cash', householdId: 'subject', max: 45 },
    ],
    outcomes: [
      {
        id: 'folds-notices',
        weight: 0.55,
        immediateText:
          '{employer}把一捆教区通告交给{mother}带回家。{subject}放学后在厨房桌上折页到夜里，手指沾满油墨，两周后交回六千张，拿到三克朗二十赫勒。',
        effects: [
          {
            type: 'cash',
            householdId: '$household',
            amount: 3.2,
            reason: 'folding parish notices',
          },
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'late-night piecework' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'ink-stained fingers',
            add: true,
            reason: 'piecework at home',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'child_worker',
            add: true,
            reason: 'piecework',
          },
        ],
      },
      {
        id: 'runs-errands',
        weight: 0.3,
        immediateText:
          '{subject}放学后替{employer}的排字工送校样，穿过两条街，拿到一克朗。回家时天已经黑了，{mother}把饭留在锅里。',
        effects: [
          { type: 'cash', householdId: '$household', amount: 1, reason: 'running errands' },
          { type: 'health', personId: '$subject', amount: -0.01, reason: 'walking in the cold' },
          {
            type: 'role',
            personId: '$subject',
            role: 'child_worker',
            add: true,
            reason: 'errands',
          },
        ],
      },
      {
        id: 'refuses-extra-work',
        weight: 0.15,
        immediateText:
          '{mother}看见{subject}的手被纸边割破，把通告退回印刷厂。厂里的工头说不干有的是人干，{mother}拉着孩子走了。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'child_minder',
            add: true,
            reason: 'kept at home',
          },
          {
            type: 'relation',
            a: '$mother',
            b: '$subject',
            kind: 'kin',
            trust: 0.05,
            reason: 'mother refused extra work',
          },
        ],
      },
    ],
    tags: ['childhood', 'labour', 'piecework'],
    sourceIds: [
      'source-wien-geschichte-kinderarbeit',
      'source-wikisource-mkl-1888-fabrikgesetzgebung',
    ],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-flu-1918-child',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '1918 年秋天的流感',
    stage: 'childhood',
    ageWindow: { min: 5, max: 11 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 5, maxAge: 13 },
      {
        key: 'mother',
        kind: 'parent',
        required: true,
        minAge: 20,
        maxAge: 55,
        sex: 'female',
        sameHousehold: true,
      },
      {
        key: 'doctor',
        kind: 'worker',
        required: false,
        minAge: 24,
        maxAge: 75,
        occupation: 'Arzt',
      },
    ],
    conditions: [
      { kind: 'age', min: 5, max: 11 },
      { kind: 'stage', in: ['childhood'] },
      { kind: 'worldYear', min: 1918, max: 1918 },
      { kind: 'pressure', key: 'influenza_1918', min: 1 },
    ],
    outcomes: [
      {
        id: 'child-recovers',
        weight: 0.55,
        immediateText:
          '{subject}烧到第三天时，{mother}把湿布敷在额头上，整夜坐在床边。孩子退了烧，咳嗽又拖了两个星期，床头堆满用过的布。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'influenza' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'recovering from influenza',
            add: true,
            reason: '1918 influenza',
          },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'fuel and clean linen' },
        ],
      },
      {
        id: 'mother-dies',
        weight: 0.3,
        immediateText:
          '{mother}先病倒。她咳了三天，第四天凌晨在{residence}的床上停止呼吸。{subject}和邻居把遗体抬到外屋，下午防疫队来敲门。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.05, reason: 'influenza and grief' },
          {
            type: 'death',
            personId: '$mother',
            cause: 'influenza and pneumonia',
            reason: 'died during the October 1918 wave',
          },
          { type: 'cash', householdId: '$household', amount: -18, reason: 'burial and doctor' },
          {
            type: 'role',
            personId: '$subject',
            role: 'motherless',
            add: true,
            reason: 'mother died in the influenza wave',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$mother',
            kind: 'kin',
            affection: 0.1,
            reason: 'last weeks of care',
          },
        ],
        significance: 0.9,
      },
      {
        id: 'child-dies',
        weight: 0.15,
        conditions: [{ kind: 'health', max: 0.6 }],
        immediateText:
          '{subject}在夜里开始说胡话。{mother}抱着孩子跑到医院，门口排着担架，护士只来得及给一杯水。天亮前孩子死在走廊长椅上。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.8, reason: 'influenza and pneumonia' },
          {
            type: 'death',
            personId: '$subject',
            cause: 'influenza and pneumonia',
            reason: 'died in the overcrowded hospital corridor',
          },
          { type: 'cash', householdId: '$household', amount: -10, reason: 'hospital and burial' },
        ],
        significance: 0.95,
      },
    ],
    tags: ['childhood', 'epidemic', 'death'],
    sourceIds: ['source-orf-grippe-wien-1918', 'source-habsburger-spanische-grippe'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-flu-1918-adult',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '医院走廊里的高烧',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 55 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 55 },
      {
        key: 'doctor',
        kind: 'worker',
        required: false,
        minAge: 24,
        maxAge: 75,
        occupation: 'Arzt',
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 55 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'worldYear', min: 1918, max: 1918 },
      { kind: 'pressure', key: 'influenza_1918', min: 1 },
    ],
    outcomes: [
      {
        id: 'adult-recovers',
        weight: 0.5,
        immediateText:
          '{subject}烧了五天，起床时腿发软，走两步就要扶墙。工作丢了半个月，工头说位子已经有人顶替。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.12, reason: 'influenza' },
          { type: 'unemployment', personId: '$subject', reason: 'missed work during influenza' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'weak after influenza',
            add: true,
            reason: 'post-influenza weakness',
          },
        ],
      },
      {
        id: 'adult-pneumonia',
        weight: 0.3,
        immediateText:
          '医生在{residence}听了{subject}的肺，说是肺炎，留下药并嘱咐不要出门。家里人轮流守着，账单记在厨房门框上。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.2, reason: 'influenza pneumonia' },
          { type: 'cash', householdId: '$household', amount: -12, reason: 'doctor and medicine' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'damaged lungs',
            add: true,
            reason: 'pneumonia',
          },
        ],
      },
      {
        id: 'adult-dies',
        weight: 0.2,
        immediateText:
          '{subject}在第七天夜里停止呼吸。家里没有钱请第二次医生，邻居帮忙去市政办事处登记，棺材铺的人下午来量了尺寸。',
        effects: [
          { type: 'health', personId: '$subject', amount: -1, reason: 'influenza' },
          {
            type: 'death',
            personId: '$subject',
            cause: 'influenza and pneumonia',
            reason: 'died at home during the 1918 wave',
          },
          { type: 'cash', householdId: '$household', amount: -20, reason: 'burial' },
        ],
        significance: 0.9,
      },
    ],
    tags: ['adulthood', 'epidemic', 'death'],
    sourceIds: ['source-orf-grippe-wien-1918', 'source-habsburger-spanische-grippe'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-mobilization-1914',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '征兵通知送到门口',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 45 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'male' },
      {
        key: 'officer',
        kind: 'official',
        required: true,
        minAge: 25,
        maxAge: 65,
        organizationKind: 'army',
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 45 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'worldYear', min: 1914, max: 1918 },
      { kind: 'pressure', key: 'war_supply_stress', min: 0.1 },
    ],
    outcomes: [
      {
        id: 'drafted',
        weight: 0.65,
        immediateText:
          '{officer}把征召令交到{subject}手里，限三天内到{place}报到。{subject}把工票和钥匙交给家里，第二天一早在火车站排队，月台上全是背包和哭声。',
        effects: [
          { type: 'role', personId: '$subject', role: 'soldier', add: true, reason: 'mobilized' },
          { type: 'unemployment', personId: '$subject', reason: 'called up for military service' },
          {
            type: 'move',
            personId: '$subject',
            locationId: P.barracks,
            reason: 'reported to barracks',
          },
          { type: 'cash', householdId: '$household', amount: 8, reason: 'separation allowance' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'army pack and boots',
            add: true,
            reason: 'issued equipment',
          },
        ],
        significance: 0.8,
      },
      {
        id: 'reserved-worker',
        weight: 0.25,
        immediateText:
          '{officer}看了{subject}的工票，在名单上写了“保留工种”。印刷厂的军用表格还等着交货，{subject}被留在维也纳，但每天要去兵营点名。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'reserved_worker',
            add: true,
            reason: 'reserved occupation',
          },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'daily muster',
            add: true,
            reason: 'reserve duty',
          },
        ],
      },
      {
        id: 'medical-exemption',
        weight: 0.1,
        immediateText:
          '{officer}让{subject}脱掉上衣检查，在胸口听见杂音，最后写了“暂不合格”。{subject}回到印刷厂，工头没有再提征兵的事。',
        effects: [
          {
            type: 'health',
            personId: '$subject',
            amount: -0.05,
            reason: 'medical examination',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'exempted',
            add: true,
            reason: 'medical exemption',
          },
        ],
      },
    ],
    tags: ['war', 'mobilization', 'adulthood'],
    sourceIds: ['source-1914-1918-online-health', 'source-habsburger-provisioning'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-food-queue-1916',
    version: 1,
    packId: PACK,
    cooldownYears: 1,
    title: '配给店门前的长队',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 17 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 12, maxAge: 60 },
      {
        key: 'mother',
        kind: 'parent',
        required: false,
        minAge: 20,
        maxAge: 60,
        sex: 'female',
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 12, max: 17 },
      { kind: 'worldYear', min: 1915, max: 1918 },
      { kind: 'pressure', key: 'war_supply_stress', min: 0.5 },
    ],
    outcomes: [
      {
        id: 'gets-potatoes',
        weight: 0.45,
        immediateText:
          '{subject}天没亮就到{place}排队，站了四个小时，买到三公斤土豆和一块用纸包着的脂肪。回家时篮子在雪里拖出一道印子。',
        effects: [
          {
            type: 'food',
            householdId: '$household',
            amount: 5,
            reason: 'rationed potatoes and fat',
          },
          { type: 'cash', householdId: '$household', amount: -3, reason: 'ration payment' },
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'hours in the cold' },
        ],
      },
      {
        id: 'sold-out',
        weight: 0.35,
        immediateText:
          '轮到{subject}时，店员把“今日售完”的木牌挂出来。队伍里有人骂了一句，警察走过来，大家慢慢散开。{subject}空着篮子回家。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.04, reason: 'missed ration' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'hungry',
            add: true,
            reason: 'no food from the queue',
          },
        ],
      },
      {
        id: 'black-market',
        weight: 0.2,
        immediateText:
          '{subject}在巷口从一个穿军大衣的人手里买了黑市面粉，价格是官价的三倍。面粉里掺着麸皮，回家筛了半天。',
        effects: [
          { type: 'cash', householdId: '$household', amount: -9, reason: 'black-market flour' },
          { type: 'food', householdId: '$household', amount: 6, reason: 'black-market flour' },
        ],
      },
    ],
    tags: ['war', 'food', 'shortage'],
    sourceIds: ['source-wien-geschichte-lebensmittelkarten', 'source-habsburger-queues'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-apprenticeship',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '十四岁，进印刷厂当学徒',
    stage: 'adolescence',
    ageWindow: { min: 14, max: 16 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 14, maxAge: 16 },
      {
        key: 'employer',
        kind: 'employer',
        required: true,
        organizationKind: 'factory',
        minAge: 18,
        maxAge: 80,
      },
      {
        key: 'mother',
        kind: 'parent',
        required: false,
        minAge: 30,
        maxAge: 60,
        sex: 'female',
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 14, max: 16 },
      { kind: 'stage', in: ['adolescence'] },
      { kind: 'education', in: ['primary', 'secondary', 'home'] },
    ],
    outcomes: [
      {
        id: 'printshop-apprentice',
        weight: 0.5,
        immediateText:
          '{employer}让{subject}下周一到排字房报到，先搬铅字和扫地，月薪十八克朗。家里用第一笔预付工资买了双结实的鞋。',
        effects: [
          {
            type: 'education',
            personId: '$subject',
            status: 'apprenticeship',
            level: 1,
            placeId: P.printshop,
            reason: 'signed apprenticeship articles',
          },
          {
            type: 'employment',
            personId: '$subject',
            organizationId: '$employerOrg',
            occupation: 'Schriftsetzerlehrling',
            wage: 18,
            workplaceId: P.printshop,
            reason: 'apprenticeship at the printing works',
          },
          { type: 'cash', householdId: '$household', amount: 6, reason: 'apprentice advance' },
          {
            type: 'role',
            personId: '$subject',
            role: 'apprentice',
            add: true,
            reason: 'printshop apprentice',
          },
        ],
      },
      {
        id: 'factory-hand',
        weight: 0.3,
        immediateText:
          '{employer}把{subject}分到装订间，每天站十个小时，工钱按件算。第一周结束，{subject}的指关节肿了，工头说习惯就好。',
        effects: [
          {
            type: 'employment',
            personId: '$subject',
            organizationId: '$employerOrg',
            occupation: 'Buchbinderhilfe',
            wage: 20,
            workplaceId: P.printshop,
            reason: 'factory work at fourteen',
          },
          { type: 'health', personId: '$subject', amount: -0.04, reason: 'standing all day' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'swollen knuckles',
            add: true,
            reason: 'binding work',
          },
        ],
      },
      {
        id: 'kept-at-home',
        weight: 0.2,
        immediateText:
          '家里算了一笔账：学徒工钱扣掉车费和饭钱，剩不下多少。{subject}留在家里接缝纫店的零活，顺便照看弟弟妹妹。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'home_worker',
            add: true,
            reason: 'stayed home for piecework',
          },
          { type: 'cash', householdId: '$household', amount: 2, reason: 'home piecework' },
          { type: 'health', personId: '$subject', amount: -0.01, reason: 'cramped home work' },
        ],
      },
    ],
    tags: ['adolescence', 'work', 'apprenticeship'],
    sourceIds: ['source-wien-geschichte-kinderarbeit', 'source-wien-geschichte-arbeitsschutz'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-young-worker',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '工票、工会与第一次工伤',
    stage: 'adolescence',
    ageWindow: { min: 16, max: 17 },
    subjectProvenance: ['birth'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 16, maxAge: 18 },
      {
        key: 'employer',
        kind: 'employer',
        required: true,
        organizationKind: 'factory',
        minAge: 18,
        maxAge: 80,
      },
      {
        key: 'delegate',
        kind: 'union_member',
        required: false,
        minAge: 20,
        maxAge: 70,
      },
    ],
    conditions: [
      { kind: 'age', min: 16, max: 17 },
      { kind: 'stage', in: ['adolescence'] },
      { kind: 'employment', employed: true },
    ],
    outcomes: [
      {
        id: 'joins-union',
        weight: 0.45,
        immediateText:
          '工会的人在厂门口拦住{subject}，说学徒工也该有工票和保险。{subject}每月交一克朗会费，把会员证塞进上衣内袋。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'union_member',
            add: true,
            reason: 'joined the printers union',
          },
          { type: 'cash', householdId: '$household', amount: -1, reason: 'union dues' },
          {
            type: 'relation',
            a: '$subject',
            b: '$delegate',
            kind: 'acquaintance',
            trust: 0.08,
            respect: 0.05,
            reason: 'union recruitment',
          },
        ],
      },
      {
        id: 'hand-caught',
        weight: 0.35,
        immediateText:
          '{subject}在压纸时右手被滚轴卷进去，工头拉下电闸，血滴在铅字盘上。{employer}让人把{subject}送到医院，医药费先由厂里垫付。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.18, reason: 'hand caught in press' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'crushed right hand',
            add: true,
            reason: 'printing press accident',
          },
          { type: 'cash', householdId: '$household', amount: -4, reason: 'hospital transport' },
        ],
      },
      {
        id: 'long-shift',
        weight: 0.2,
        immediateText:
          '{subject}连续上了十二天夜班，最后一天在机器旁睡着，被工头踢醒。月底多拿了两克朗，咳嗽却一直没好。',
        effects: [
          { type: 'cash', householdId: '$household', amount: 2, reason: 'overtime pay' },
          { type: 'health', personId: '$subject', amount: -0.05, reason: 'night shifts' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'persistent cough',
            add: true,
            reason: 'overwork',
          },
        ],
      },
    ],
    tags: ['adolescence', 'labour', 'union'],
    sourceIds: ['source-gpa-djp-geschichte', 'source-parlament-125-jahre-unfallversicherung'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-work-injury',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '机器没有停',
    stage: 'adulthood',
    ageWindow: { min: 20, max: 58 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 20, maxAge: 58 },
      {
        key: 'employer',
        kind: 'employer',
        required: true,
        organizationKind: 'factory',
        minAge: 18,
        maxAge: 80,
      },
      {
        key: 'doctor',
        kind: 'worker',
        required: false,
        minAge: 24,
        maxAge: 75,
        occupation: 'Arzt',
      },
    ],
    conditions: [
      { kind: 'age', min: 20, max: 58 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'employment', employed: true },
      { kind: 'placeKind', in: ['factory'] },
    ],
    outcomes: [
      {
        id: 'crushed-hand',
        weight: 0.45,
        immediateText:
          '{subject}在换纸时左手被压板夹住。工友关掉机器，厂里的工头拿来急救箱，把伤手包起来送去医院。厂里先垫了医药费，事故报告写的是“操作不慎”。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.24, reason: 'crushed left hand' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'crushed left hand',
            add: true,
            reason: 'press accident',
          },
          {
            type: 'cash',
            householdId: '$household',
            amount: 10,
            reason: 'employer medical advance',
          },
        ],
      },
      {
        id: 'dismissed-after-accident',
        weight: 0.35,
        immediateText:
          '{employer}在事故后第三天通知{subject}不用再来了，说岗位不能一直空着。{subject}拿着医院证明去工会，医院写的诊断被工头压在抽屉里。',
        effects: [
          { type: 'unemployment', personId: '$subject', reason: 'dismissed after accident' },
          { type: 'health', personId: '$subject', amount: -0.12, reason: 'injury and lost job' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'medical treatment' },
        ],
      },
      {
        id: 'fatal-accident',
        weight: 0.2,
        conditions: [{ kind: 'health', max: 0.45 }],
        immediateText:
          '压板落下时{subject}没能把手抽出来。工友把人抬到门口，等救护车到时已经没有了呼吸。{employer}当天下午派人送来抚恤金。',
        effects: [
          { type: 'health', personId: '$subject', amount: -1, reason: 'fatal press accident' },
          {
            type: 'death',
            personId: '$subject',
            cause: 'crushing injury at the printing press',
            reason: 'workplace accident',
          },
          { type: 'cash', householdId: '$household', amount: 30, reason: 'employer death benefit' },
        ],
        significance: 0.9,
      },
    ],
    tags: ['adulthood', 'labour', 'injury'],
    sourceIds: [
      'source-parlament-125-jahre-unfallversicherung',
      'source-wien-geschichte-arbeitsschutz',
    ],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-depression',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '工厂门口的短工名单',
    stage: 'adulthood',
    ageWindow: { min: 20, max: 59 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 20, maxAge: 60 },
      {
        key: 'employer',
        kind: 'employer',
        required: false,
        organizationKind: 'factory',
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 20, max: 59 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'worldYear', min: 1929, max: 1938 },
      { kind: 'employment', employed: true },
    ],
    outcomes: [
      {
        id: 'laid-off',
        weight: 0.5,
        immediateText:
          '厂里把一张短工名单贴在厂门口。{subject}的名字在第三行，旁边写着“下周等通知”。等到月底，通知没有来，工票也停了。',
        effects: [
          { type: 'unemployment', personId: '$subject', reason: 'laid off in the depression' },
          { type: 'cash', householdId: '$household', amount: -5, reason: 'lost wages' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'unemployed',
            add: true,
            reason: 'factory layoff',
          },
        ],
      },
      {
        id: 'short-time',
        weight: 0.3,
        immediateText:
          '{subject}改成每周上三天班，工钱按日结算。家里的面包从每天一条变成隔天一条，{subject}开始把午饭省下来带回家。',
        effects: [
          { type: 'cash', householdId: '$household', amount: -3, reason: 'short-time work' },
          { type: 'health', personId: '$subject', amount: -0.04, reason: 'reduced food' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'hungry',
            add: true,
            reason: 'short-time wages',
          },
        ],
      },
      {
        id: 'leaves-vienna',
        weight: 0.2,
        immediateText:
          '{subject}听说下奥地利的砖厂还招人，收拾了一只箱子，坐早班火车离开维也纳。厂里的工头在背后说，走了就别回来。',
        effects: [
          {
            type: 'move',
            personId: '$subject',
            locationId: P.aunt,
            reason: 'left Vienna for work',
          },
          { type: 'unemployment', personId: '$subject', reason: 'left the Vienna factory' },
          {
            type: 'cash',
            householdId: '$household',
            amount: -8,
            reason: 'train ticket and lodgings',
          },
        ],
      },
    ],
    tags: ['adulthood', 'depression', 'work'],
    sourceIds: ['source-gpa-djp-geschichte'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-anschluss-1938',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '1938 年 3 月，街口的制服',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 59 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 16, maxAge: 70 },
      {
        key: 'official',
        kind: 'official',
        required: true,
        minAge: 25,
        maxAge: 70,
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 59 },
      { kind: 'worldYear', min: 1938, max: 1939 },
    ],
    outcomes: [
      {
        id: 'complies',
        weight: 0.45,
        immediateText:
          '{official}在街口设了登记桌，要求住户交出姓名、职业和宗教。{subject}排队填了表，回家把门牌擦干净。楼里有人连夜搬走，也有人站在阳台上挥手。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'registered_resident',
            add: true,
            reason: 'registered',
          },
          { type: 'cash', householdId: '$household', amount: -3, reason: 'new permits and stamps' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'fear of denunciation',
            add: true,
            reason: 'political pressure',
          },
        ],
      },
      {
        id: 'resists',
        weight: 0.3,
        immediateText:
          '{subject}在登记桌旁说了句“这里以前不是这样”。{official}记下地址，当晚两个穿制服的人来敲门，把{subject}带到警局，第二天放回来时脸上有伤。',
        effects: [
          {
            type: 'health',
            personId: '$subject',
            amount: -0.12,
            reason: 'beaten in police custody',
          },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'beaten by police',
            add: true,
            reason: 'political arrest',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'watched_by_police',
            add: true,
            reason: 'known resister',
          },
          { type: 'cash', householdId: '$household', amount: -5, reason: 'fine and lost work' },
        ],
        significance: 0.8,
      },
      {
        id: 'flees',
        weight: 0.25,
        immediateText:
          '{subject}在夜里收拾了一只箱子，把证件缝进外套内衬，搭上往西的火车。{official}第二天来查人，只看到空床和没关严的窗。',
        effects: [
          { type: 'move', personId: '$subject', locationId: P.aunt, reason: 'fled Vienna' },
          {
            type: 'role',
            personId: '$subject',
            role: 'refugee',
            add: true,
            reason: 'fled the annexation',
          },
          { type: 'cash', householdId: '$household', amount: -20, reason: 'escape and lodging' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'displaced',
            add: true,
            reason: 'left home',
          },
        ],
        significance: 0.85,
      },
    ],
    tags: ['politics', 'persecution', '1938'],
    sourceIds: ['source-1914-1918-online-health'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-wwii-conscription',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '第二次征召',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 45 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 45, sex: 'male' },
      {
        key: 'officer',
        kind: 'official',
        required: true,
        minAge: 25,
        maxAge: 70,
        organizationKind: 'army',
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 45 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'worldYear', min: 1939, max: 1945 },
    ],
    outcomes: [
      {
        id: 'drafted-again',
        weight: 0.55,
        immediateText:
          '{officer}把新的征召令拍在桌上，{subject}只有一天时间收拾。{subject}把工票、钥匙和一张全家照片交给家里，第二天到{place}报到。',
        effects: [
          { type: 'role', personId: '$subject', role: 'soldier', add: true, reason: 'conscripted' },
          { type: 'unemployment', personId: '$subject', reason: 'conscripted for war' },
          {
            type: 'move',
            personId: '$subject',
            locationId: P.barracks,
            reason: 'reported for duty',
          },
          { type: 'cash', householdId: '$household', amount: 6, reason: 'family allowance' },
        ],
      },
      {
        id: 'reserved-war-worker',
        weight: 0.3,
        immediateText:
          '{officer}看了{subject}的工票，把征召令收回，说工厂更需要人。{subject}继续在机器旁干活，每天多领一份配给，也每天听见前线的消息。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'war_worker',
            add: true,
            reason: 'reserved war worker',
          },
          { type: 'food', householdId: '$household', amount: 2, reason: 'extra worker ration' },
          { type: 'health', personId: '$subject', amount: -0.03, reason: 'long war shifts' },
        ],
      },
      {
        id: 'wounded',
        weight: 0.15,
        immediateText:
          '{subject}在前线被弹片击中腿部，被送回维也纳的医院。{officer}在站台上念了名字，{subject}拄着拐杖下车，裤管空了一截。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.3, reason: 'shrapnel wound' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'amputated left leg',
            add: true,
            reason: 'war wound',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'veteran',
            add: true,
            reason: 'wounded in war',
          },
          { type: 'cash', householdId: '$household', amount: 12, reason: 'military pension' },
        ],
        significance: 0.85,
      },
    ],
    tags: ['war', 'conscription', 'adulthood'],
    sourceIds: ['source-1914-1918-online-health'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-wwii-homefront',
    version: 1,
    packId: PACK,
    cooldownYears: 2,
    title: '空袭警报与地下室',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 59 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 15, maxAge: 65 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 59 },
      { kind: 'worldYear', min: 1939, max: 1945 },
      { kind: 'stage', in: ['adolescence', 'adulthood'] },
    ],
    outcomes: [
      {
        id: 'bombed-out',
        weight: 0.4,
        immediateText:
          '半夜的空袭把屋顶掀开一角。{subject}和邻居把家具拖到楼道，天亮后去市政办事处登记损失。窗户用木板钉上，一家人挤到地下室。',
        effects: [
          {
            type: 'move',
            personId: '$subject',
            locationId: P.tenement,
            reason: 'home damaged in air raid',
          },
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'air raid and cold' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'bombed out',
            add: true,
            reason: 'air raid damage',
          },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'repairs and moving' },
        ],
      },
      {
        id: 'hungry-winter',
        weight: 0.35,
        immediateText:
          '{subject}用配给卡换到半袋面粉和几根冻土豆。锅里煮的是稀汤，邻居送来一小块人造黄油，说孩子们先吃。',
        effects: [
          {
            type: 'food',
            householdId: '$household',
            amount: 2,
            reason: 'rationed flour and potatoes',
          },
          { type: 'health', personId: '$subject', amount: -0.04, reason: 'reduced rations' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'hungry',
            add: true,
            reason: 'wartime rationing',
          },
        ],
      },
      {
        id: 'shelter',
        weight: 0.25,
        immediateText:
          '警报响时{subject}躲进地下室，和十几户人挤在长凳上。头顶传来闷响，灰尘从梁上落下。警报解除后，街上多了一堆碎瓦。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'shelter conditions' },
          {
            type: 'relation',
            a: '$subject',
            b: '$neighbor',
            kind: 'acquaintance',
            trust: 0.05,
            reason: 'shared air-raid shelter',
          },
        ],
      },
    ],
    tags: ['war', 'homefront', 'shortage'],
    sourceIds: ['source-1914-1918-online-health'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-1945-liberation',
    version: 1,
    packId: PACK,
    oncePerPerson: true,
    title: '1945 年，城里的旗子换了颜色',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 59 },
    subjectProvenance: ['birth', 'initial'],
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 15, maxAge: 75 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 59 },
      { kind: 'worldYear', min: 1945, max: 1946 },
    ],
    outcomes: [
      {
        id: 'survives',
        weight: 0.5,
        immediateText:
          '苏联士兵进城时，{subject}躲在门后听见坦克履带压过石板路。几天后街口贴出告示，{subject}去领了一份汤和一块面包。',
        effects: [
          {
            type: 'role',
            personId: '$subject',
            role: 'liberated_1945',
            add: true,
            reason: 'survived the war',
          },
          { type: 'food', householdId: '$household', amount: 3, reason: 'relief soup and bread' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'replacement documents' },
        ],
      },
      {
        id: 'displaced',
        weight: 0.3,
        immediateText:
          '炮火把{subject}住的那条街烧掉一半。{subject}跟着人群走到城外，在临时收容所登记，床位上铺的是发霉的稻草。',
        effects: [
          {
            type: 'move',
            personId: '$subject',
            locationId: P.aunt,
            reason: 'displaced by fighting',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'displaced_person',
            add: true,
            reason: 'lost home',
          },
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'displacement and cold' },
          { type: 'cash', householdId: '$household', amount: -5, reason: 'temporary shelter' },
        ],
      },
      {
        id: 'postwar-illness',
        weight: 0.2,
        immediateText:
          '{subject}在战后第二个月病倒，医院没有足够的药，医生只给了退烧粉。邻居每天送来一碗汤，放在门口就走。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.15, reason: 'postwar illness' },
          { type: 'cash', householdId: '$household', amount: -4, reason: 'medicine' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'weak after the war',
            add: true,
            reason: 'postwar illness',
          },
        ],
      },
    ],
    tags: ['war', 'liberation', '1945'],
    sourceIds: ['source-1914-1918-online-health'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-old-age',
    version: 1,
    packId: PACK,
    title: '退休金与楼下的药房',
    stage: 'elderhood',
    ageWindow: { min: 60, max: 78 },
    subjectProvenance: ['birth', 'initial'],
    rate: 0.08,
    cooldownYears: 2,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 60, maxAge: 78 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 60, max: 78 },
      { kind: 'stage', in: ['elderhood'] },
    ],
    outcomes: [
      {
        id: 'retires',
        weight: 0.5,
        conditions: [{ kind: 'notHasRole', role: 'pensioner' }],
        immediateText:
          '{subject}把工票交回厂里，领到第一笔退休金。钱不多，但足够付房租和每天的面包。邻居帮忙把煤搬上楼。',
        effects: [
          { type: 'unemployment', personId: '$subject', reason: 'retired' },
          { type: 'role', personId: '$subject', role: 'pensioner', add: true, reason: 'retired' },
          { type: 'cash', householdId: '$household', amount: 12, reason: 'pension payment' },
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'old age' },
        ],
      },
      {
        id: 'chronic-illness',
        weight: 0.3,
        immediateText:
          '{subject}的腿在阴天肿起来，去药房买了药膏。医生说这是年轻时站得太久留下的毛病，除了休息没有别的办法。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'chronic leg pain' },
          { type: 'cash', householdId: '$household', amount: -5, reason: 'medicine' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'swollen legs',
            add: true,
            reason: 'chronic condition',
          },
        ],
      },
      {
        id: 'family-care',
        weight: 0.2,
        immediateText:
          '邻居每天来看{subject}，带来面包和报纸。{subject}坐在窗边读讣告，认出几个旧同事的名字，把报纸折好放在桌上。',
        effects: [
          { type: 'health', personId: '$subject', amount: 0.01, reason: 'neighbor care' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'bread and newspaper' },
          {
            type: 'relation',
            a: '$subject',
            b: '$neighbor',
            kind: 'friend',
            trust: 0.06,
            affection: 0.04,
            reason: 'daily visits',
          },
        ],
      },
    ],
    tags: ['elderhood', 'pension', 'health'],
    sourceIds: ['source-wien-geschichte-wohnbaupolitik'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-death-old-age',
    version: 1,
    packId: PACK,
    title: '最后一个冬天',
    stage: 'elderhood',
    ageWindow: { min: 72, max: 98 },
    subjectProvenance: ['birth', 'initial'],
    oncePerPerson: true,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 72, maxAge: 98 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 72, max: 98 },
      { kind: 'stage', in: ['elderhood'] },
      { kind: 'health', max: 0.45 },
    ],
    outcomes: [
      {
        id: 'dies-at-home',
        weight: 0.55,
        immediateText:
          '{subject}在睡梦中没有醒来。邻居早上来送面包，敲门没人应，找房东开了锁。桌上还放着昨天的药和一杯没喝完的水。',
        effects: [
          {
            type: 'death',
            personId: '$subject',
            cause: 'old age and heart failure',
            reason: 'died at home in old age',
          },
          { type: 'cash', householdId: '$household', amount: -15, reason: 'funeral' },
        ],
        significance: 0.9,
      },
      {
        id: 'dies-in-hospital',
        weight: 0.3,
        immediateText:
          '{subject}在家里摔倒后被送到医院。三周后，病房的窗帘拉开时，床上已经换了新的病人。医院把遗物装在一只纸袋里交给邻居。',
        effects: [
          {
            type: 'health',
            personId: '$subject',
            amount: -1,
            reason: 'fall and hospital decline',
          },
          {
            type: 'death',
            personId: '$subject',
            cause: 'fall and pneumonia in old age',
            reason: 'died in hospital',
          },
          { type: 'cash', householdId: '$household', amount: -20, reason: 'hospital and funeral' },
        ],
        significance: 0.9,
      },
      {
        id: 'survives-another-year',
        weight: 0.15,
        immediateText:
          '{subject}在医院住了两周又回到家，走路更慢了。邻居把药按早中晚分在小盒里，放在床头。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'old age decline' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'hospital visit' },
        ],
      },
    ],
    tags: ['elderhood', 'death'],
    sourceIds: ['source-wien-geschichte-tuberkulose'],
    ...viennaBasis,
  },

  {
    id: 'vienna-life-overcrowded-flat',
    version: 1,
    packId: PACK,
    title: '床铺不够的冬天',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    subjectProvenance: ['birth', 'initial'],
    rate: 0.12,
    cooldownYears: 4,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'overcrowded', value: true },
      { kind: 'placeKind', in: ['home'] },
    ],
    outcomes: [
      {
        id: 'move-to-shared-tenement',
        weight: 0.5,
        immediateText:
          '{subject}把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。新住处人多、墙薄，但至少每个人有一块能躺下的地方；押金和车钱花掉了八克朗。',
        effects: [
          {
            type: 'residence',
            householdId: '$household',
            residenceId: 'place-wien-leopoldstadt-tenement',
            reason: 'moved to a larger shared flat',
          },
          { type: 'cash', householdId: '$household', amount: -8, reason: 'deposit and cart' },
          { type: 'health', personId: '$subject', amount: -0.02, reason: 'moving in winter' },
        ],
      },
      {
        id: 'take-in-a-lodger',
        weight: 0.3,
        immediateText:
          '{subject}把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，孩子睡不踏实。',
        effects: [
          { type: 'cash', householdId: '$household', amount: 4, reason: 'lodger rent' },
          { type: 'health', personId: '$subject', amount: -0.04, reason: 'overcrowded housing' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'sleeping badly',
            add: true,
            reason: 'crowded flat',
          },
        ],
      },
      {
        id: 'apply-for-a-municipal-flat',
        weight: 0.2,
        immediateText:
          '{subject}去市政办事处登记申请更大的市营住宅。办事员收下表格和两克朗手续费，说前面还有几百户，至少要等两年。',
        effects: [
          {
            type: 'cash',
            householdId: '$household',
            amount: -2,
            reason: 'municipal housing application',
          },
          {
            type: 'role',
            personId: '$subject',
            role: 'housing_waitlist',
            add: true,
            reason: 'applied for a municipal flat',
          },
        ],
      },
    ],
    tags: ['housing', 'home', 'health', 'family'],
    sourceIds: ['source-push-wiener-wohnverhaeltnisse', 'source-wien-geschichte-wohnbaupolitik'],
    historicalBasis:
      'Viennese working-class flats were severely overcrowded; municipal housing and rent regulation changed access over the period.',
  },
];
