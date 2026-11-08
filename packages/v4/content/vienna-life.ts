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
    rate: 0.6,
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
    rate: 0.45,
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
          '{subject}烧了两夜，{mother}用湿布擦额头，又换了两回干净床单，煤和肥皂花去两克朗。天亮时体温退下去，孩子开始要水喝；{mother}把湿布搭在椅背上，手还在抖，却先去数了数还剩几块煤。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.06, reason: 'two nights of fever' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'clean linen and fuel' },
        ],
      },
      {
        id: 'doctor-called',
        weight: 0.3,
        immediateText:
          '{mother}托邻居去请医生。医生在午后进门，听了孩子的胸口，留下药粉和一张账单，收了八克朗；{subject}的烧在傍晚退了些，{mother}把药粉分成小包，账单压在糖罐底下，手指在八克朗那几个字上停了一会儿。',
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
          '第三个夜里，{subject}的呼吸变浅，嘴唇干得起了皮。{mother}一直抱着孩子坐到天亮，医生来时只摇了摇头；家里拿出四克朗办葬礼，{subject}的小衣服被叠好收进箱底，床边的水碗还温着，屋里没人敢去倒。',
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
    narration: [
      {
        id: 'vienna-life-infant-fever.fever-passes.alt1',
        key: 'fever-passes',
        text: '湿布换到第七回，{mother}的手背已经冻得发红。天亮时{subject}睁开眼要水，{mother}把杯子凑过去，才发现自己的手抖得比孩子还厉害。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-infant-fever.fever-passes.alt2',
        key: 'fever-passes',
        text: '两克朗换回一筐煤和一块新肥皂，床单洗到半夜才烘干。{subject}退烧后睡得很沉，{mother}坐在床边数煤块，数到一半就靠在墙上睡着了。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-infant-fever.doctor-called.alt1',
        key: 'doctor-called',
        text: '医生把听诊器贴在孩子胸口，听了一会儿，说肺里还干净。八克朗从糖罐里数出去，{mother}把药粉分成六包，每一包都用纸角折紧。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-infant-fever.doctor-called.alt2',
        key: 'doctor-called',
        text: '账单压在糖罐底下，{mother}把糖罐挪了挪，怕潮气洇了字。{subject}傍晚退了烧，开始抓{mother}的衣襟；屋里药味很重，八克朗却买回一个能睡着的晚上。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-infant-fever.fever-death.alt1',
        key: 'fever-death',
        text: '天快亮时，孩子的呼吸轻得听不见。{mother}把耳朵贴过去，又贴了一会儿，才抬头看门口；医生来后只摇了摇头，四克朗的葬礼钱从抽屉最底下拿出来。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-infant-fever.fever-death.alt2',
        key: 'fever-death',
        text: '小衣服叠好放进箱底，{mother}把水碗留在床边，谁也没有去倒。{subject}的名字后来只写在一张薄纸上，四克朗换回一小块墓地。',
        tone: ['dry'],
      },
    ],
    tags: ['infancy', 'illness', 'death', 'baseline_mortality'],
    sourceIds: ['source-wien-geschichte-saeuglingssterblichkeit'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-infant-first-smile',
    version: 1,
    packId: PACK,
    title: '第一次笑出声',
    stage: 'infancy',
    ageWindow: { min: 0, max: 1 },
    subjectProvenance: ['birth'],
    oncePerPerson: true,
    rate: 0.55,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 0, maxAge: 1 },
      {
        key: 'caregiver',
        kind: 'parent',
        required: true,
        minAge: 16,
        maxAge: 60,
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
        id: 'smile-at-the-lamp',
        weight: 0.5,
        immediateText:
          '{caregiver}把{subject}抱到窗边，煤汽灯罩上有一圈晃动的光。孩子盯着看了很久，忽然笑出声，口水滴在{caregiver}的袖口上。屋里的人都停了一下，像是听见了什么了不起的消息。',
        effects: [
          { type: 'mood', personId: '$caregiver', amount: 0.04, reason: 'the baby laughed for the first time' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', affection: 0.05, reason: 'a first laugh' },
          { type: 'health', personId: '$subject', amount: 0.01, reason: 'a good day' },
        ],
      },
      {
        id: 'colic-night',
        weight: 0.3,
        immediateText:
          '夜里{subject}哭了很久，{caregiver}抱着孩子在屋里来回走，数着地板缝。天快亮时孩子终于打了个嗝，安静下来；{caregiver}坐在床沿，发现自己还保持着走路的姿势。',
        effects: [
          { type: 'mood', personId: '$caregiver', amount: -0.03, reason: 'a sleepless night with a colicky baby' },
          { type: 'health', personId: '$caregiver', amount: -0.01, reason: 'lost sleep' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', obligation: 0.03, reason: 'carried the baby through the night' },
        ],
      },
      {
        id: 'neighbour-warning',
        weight: 0.2,
        immediateText:
          '隔壁的女人探头进来，说孩子笑得太早，老人讲这不是好兆头。{caregiver}没有接话，只把{subject}往怀里拢了拢；孩子却伸手去抓那女人围裙上的扣子，抓得不肯松。',
        effects: [
          { type: 'mood', personId: '$caregiver', amount: -0.01, reason: 'a neighbour\'s superstition' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', affection: 0.02, reason: 'held the child closer' },
          { type: 'flag', personId: '$subject', flag: 'early_smile_omen', add: true, reason: 'a neighbour called the early smile an omen' },
        ],
      },
    ],
    tags: ['infancy', 'family', 'first', 'warm'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-toddler-first-words',
    version: 1,
    packId: PACK,
    title: '第一句像话的话',
    stage: 'infancy',
    ageWindow: { min: 1, max: 3 },
    subjectProvenance: ['birth'],
    oncePerPerson: true,
    rate: 0.55,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 1, maxAge: 3 },
      {
        key: 'caregiver',
        kind: 'parent',
        required: true,
        minAge: 16,
        maxAge: 65,
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 1, max: 3 },
      { kind: 'stage', in: ['infancy'] },
      { kind: 'placeKind', in: ['home'] },
    ],
    outcomes: [
      {
        id: 'first-word-more',
        weight: 0.35,
        immediateText:
          '{subject}把空碗推回{caregiver}面前，清清楚楚地说了一个字：“还要。”{caregiver}愣住，随后把锅底最后一点糊刮进碗里。孩子学会了用一句话让世界再转一圈。',
        effects: [
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.04, reason: 'learned to ask for more' },
          { type: 'mood', personId: '$caregiver', amount: 0.03, reason: 'the first clear word' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', affection: 0.04, reason: 'the first clear word' },
        ],
      },
      {
        id: 'first-word-door',
        weight: 0.35,
        immediateText:
          '门外有人上楼，{subject}忽然指着门说：“爸爸。”{caregiver}看了看空门口，没有纠正。那天晚上，孩子把家里每个人的名字都叫了一遍，叫错两个，却叫得很认真。',
        effects: [
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.03, reason: 'named the household' },
          { type: 'mood', personId: '$caregiver', amount: 0.02, reason: 'a child learning names' },
          { type: 'flag', personId: '$subject', flag: 'first_word_door', add: true, reason: 'the first word was aimed at the door' },
        ],
      },
      {
        id: 'first-word-nonsense',
        weight: 0.3,
        immediateText:
          '{subject}说了一长串谁也听不懂的话，最后用力点头，像是在宣布一件已经决定的事。{caregiver}认真听完，也点了点头；孩子满意地爬走了，留下大人们互相看着，忍不住笑。',
        effects: [
          { type: 'mood', personId: '$caregiver', amount: 0.04, reason: 'a serious nonsense speech' },
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.02, reason: 'practised talking' },
        ],
      },
    ],
    tags: ['infancy', 'family', 'first', 'comic'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-toddler-accident',
    version: 1,
    packId: PACK,
    title: '楼梯口的一瞬间',
    stage: 'infancy',
    ageWindow: { min: 2, max: 4 },
    subjectProvenance: ['birth'],
    rate: 0.38,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 2, maxAge: 4 },
      {
        key: 'caregiver',
        kind: 'parent',
        required: true,
        minAge: 16,
        maxAge: 65,
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 2, max: 4 },
      { kind: 'stage', in: ['infancy'] },
    ],
    outcomes: [
      {
        id: 'bruised-arm',
        weight: 0.45,
        immediateText:
          '{subject}在楼梯口追一只滚下去的线轴，脚下一滑，胳膊先撞在铁扶手上。{caregiver}听见哭声跑出来，用冷水毛巾敷住那块青紫，嘴里说着“没事”，手却一直在抖。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.05, reason: 'fell at the stairwell' },
          { type: 'condition', personId: '$subject', condition: 'bruised arm', add: true, reason: 'a fall on the stairs' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', affection: 0.03, reason: 'carried the child after a fall' },
          { type: 'mood', personId: '$caregiver', amount: -0.03, reason: 'a child\'s fall' },
        ],
      },
      {
        id: 'scalded-hand',
        weight: 0.25,
        immediateText:
          '厨房的锅盖没有盖严，{subject}伸手去够桌上的勺子，蒸汽先扑到手腕上。{caregiver}把孩子抱到水缸边，一瓢一瓢地浇冷水；孩子哭得打嗝，锅里的汤还在冒泡。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'scalded hand' },
          { type: 'condition', personId: '$subject', condition: 'scalded hand', add: true, reason: 'steam from a cooking pot' },
          { type: 'cash', householdId: '$household', amount: -1, reason: 'bandages and ointment' },
          { type: 'mood', personId: '$caregiver', amount: -0.05, reason: 'a preventable burn' },
        ],
      },
      {
        id: 'safe-in-the-doorway',
        weight: 0.3,
        immediateText:
          '{caregiver}在最后一刻抓住了{subject}的后领。孩子悬在两级台阶之间，鞋底蹭着地，手里还攥着那只线轴。{caregiver}把孩子放回地上，蹲下来看了很久，才说：“再跑，我就把门关上。”',
        effects: [
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', fear: 0.04, obligation: 0.03, reason: 'a narrow escape at the stairs' },
          { type: 'mood', personId: '$caregiver', amount: -0.02, reason: 'fright at the stairwell' },
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.01, reason: 'learned a boundary' },
        ],
      },
    ],
    tags: ['infancy', 'accident', 'family', 'danger'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-child-family-legend',
    version: 1,
    packId: PACK,
    title: '家里的那个故事',
    stage: 'childhood',
    ageWindow: { min: 3, max: 5 },
    subjectProvenance: ['birth'],
    oncePerPerson: true,
    rate: 0.5,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 3, maxAge: 5 },
      {
        key: 'caregiver',
        kind: 'parent',
        required: true,
        minAge: 18,
        maxAge: 70,
        sameHousehold: true,
      },
    ],
    conditions: [
      { kind: 'age', min: 3, max: 5 },
      { kind: 'stage', in: ['childhood'] },
      { kind: 'placeKind', in: ['home'] },
    ],
    outcomes: [
      {
        id: 'lost-relative',
        weight: 0.4,
        immediateText:
          '{caregiver}在收拾箱子时翻出一张没有署名的照片，说那是家里一个“去了很远地方”的人。{subject}问还回不回来，{caregiver}把照片翻过去，说先把名字记住，别在饭桌上问。',
        effects: [
          { type: 'knowledge', holderId: '$subject', proposition: '家里有一张没有署名的照片，照片上的人去了很远的地方。', confidence: 0.6, sourceKind: 'told', visibility: 'private', trueInWorld: true },
          { type: 'flag', personId: '$subject', flag: 'family_legend_photo', add: true, reason: 'saw the unsigned photograph' },
          { type: 'mood', personId: '$subject', amount: -0.01, reason: 'a story with a closed door' },
        ],
      },
      {
        id: 'stolen-inheritance',
        weight: 0.3,
        immediateText:
          '{caregiver}说，家里本来有一件东西，后来被“更会说话的人”拿走了。{subject}问是什么，{caregiver}只说是一块表，表盖里刻着姓。孩子记住了“表盖里刻着姓”，却没有记住那个姓。',
        effects: [
          { type: 'knowledge', holderId: '$subject', proposition: '家里有一块表盖里刻着姓的表，被一个更会说话的人拿走了。', confidence: 0.55, sourceKind: 'told', visibility: 'private', trueInWorld: true },
          { type: 'flag', personId: '$subject', flag: 'family_legend_watch', add: true, reason: 'heard about the stolen watch' },
        ],
      },
      {
        id: 'happy-legend',
        weight: 0.3,
        immediateText:
          '{caregiver}讲起自己小时候在乡下追一只白鹅，追到河边，鹅没追到，倒捡回一篮鸭蛋。{subject}笑得从凳子上滑下来，{caregiver}也跟着笑，说这个家不是只有欠账和葬礼。',
        effects: [
          { type: 'mood', personId: '$subject', amount: 0.04, reason: 'a happy family story' },
          { type: 'mood', personId: '$caregiver', amount: 0.02, reason: 'telling a happy story' },
          { type: 'relation', a: '$caregiver', b: '$subject', kind: 'kin', affection: 0.04, reason: 'a shared family story' },
        ],
      },
    ],
    tags: ['childhood', 'family', 'secret', 'story'],
    ...viennaBasis,
  },
  {
    id: 'vienna-life-child-first-friend',
    version: 1,
    packId: PACK,
    title: '楼道里的第一个朋友',
    stage: 'childhood',
    ageWindow: { min: 4, max: 6 },
    subjectProvenance: ['birth'],
    oncePerPerson: true,
    rate: 0.5,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 4, maxAge: 6 },
      {
        key: 'friend',
        kind: 'neighbor',
        required: true,
        minAge: 3,
        maxAge: 8,
      },
    ],
    conditions: [
      { kind: 'age', min: 4, max: 6 },
      { kind: 'stage', in: ['childhood'] },
    ],
    outcomes: [
      {
        id: 'shared-toy',
        weight: 0.45,
        immediateText:
          '{friend}在楼道里滚一只铁环，{subject}站在门口看。{friend}把铁环推过来，说“你推一次，我推一次”。两个人从楼梯口推到院子里，铁环倒下的声音把午睡的大人吵醒了一排。',
        effects: [
          { type: 'relation', a: '$subject', b: '$friend', kind: 'friend', trust: 0.12, affection: 0.08, reason: 'played with a hoop in the stairwell' },
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.05, reason: 'made a first friend' },
          { type: 'mood', personId: '$subject', amount: 0.05, reason: 'a first friend' },
        ],
      },
      {
        id: 'stolen-marble',
        weight: 0.3,
        immediateText:
          '{friend}把{subject}的玻璃弹珠藏进鞋里，被当场看见。{friend}说只是“替你拿着”，{subject}没有揭穿，也没有再拿出第二颗。两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。',
        effects: [
          { type: 'relation', a: '$subject', b: '$friend', kind: 'friend', trust: 0.03, affection: 0.04, reason: 'a small theft and a silence' },
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.02, reason: 'learned to keep a suspicion' },
          { type: 'mood', personId: '$subject', amount: -0.01, reason: 'a friend took something' },
        ],
      },
      {
        id: 'imaginary-friend',
        weight: 0.25,
        immediateText:
          '院子里没有别的孩子，{subject}给墙上的裂纹起了一个名字，每天吃饭时给它留一个位置。家里的人没有纠正，只在摆碗时多放一只空碗；{friend}从门口经过，问{subject}在等谁。',
        effects: [
          { type: 'skill', personId: '$subject', skill: 'social', amount: 0.03, reason: 'invented a companion' },
          { type: 'flag', personId: '$subject', flag: 'imaginary_friend', add: true, reason: 'named a crack in the wall' },
          { type: 'relation', a: '$subject', b: '$friend', kind: 'friend', trust: 0.06, affection: 0.03, reason: 'a neighbour noticed the imaginary friend' },
        ],
      },
    ],
    tags: ['childhood', 'friendship', 'family', 'comic'],
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
          '{teacher}让{subject}站到黑板前背乘法表。孩子背到七乘八时停了一下，还是背完了；放学时手指冻得发红，石板上的字被袖子擦掉一半，{teacher}在名册上给了一个小小的勾，{subject}把石板抱在胸前，一路没舍得放进书包。',
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
          '{subject}在课堂上和同桌说话，{teacher}用戒尺打了手心。孩子把红肿的手藏在桌下，放学后不敢让家里人看见；此后听见戒尺敲桌沿，{subject}的肩膀就先缩一下，对{teacher}也多了几分怕。',
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
          '{subject}早上只喝了一碗清汤，第二节课时眼前发黑。{teacher}让孩子去走廊坐一会儿，给了半块面包；{subject}把面包屑拢在手心吃完，胃里还是空的，但看{teacher}的眼神软了些，回到座位时把腰挺直了一点。',
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
    narration: [
      {
        id: 'vienna-life-school-day.recites.alt1',
        key: 'recites',
        text: '七乘八卡在喉咙里，{subject}看见{teacher}的眉毛动了一下，赶紧把答案补上。黑板上的粉笔灰落进袖口，放学时手指已经僵得弯不过来。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-school-day.recites.alt2',
        key: 'recites',
        text: '{teacher}在名册上打勾时，笔尖顿了一下。{subject}回到座位，把石板上的字又描了一遍；窗外的雪没有停，教室里却比刚才暖了一点。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-school-day.punished.alt1',
        key: 'punished',
        text: '戒尺落下来时，{subject}没有躲，只把牙咬紧。掌心慢慢肿起一道红印，{teacher}叫坐下，{subject}把左手塞进袖口，一节课没再拿出来。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-school-day.punished.alt2',
        key: 'punished',
        text: '放学路上，{subject}把手揣在口袋里，碰一下就疼。回到家门口，{subject}先把手背在身后，等{mother}转身才敢看；那道红印到晚上还没有消。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-school-day.hungry-in-class.alt1',
        key: 'hungry-in-class',
        text: '黑板上的字忽然变成一片白，{subject}扶住桌沿才没栽下去。{teacher}让去走廊坐着，过了一会儿递来半块面包；面包很干，{subject}嚼得很慢。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-school-day.hungry-in-class.alt2',
        key: 'hungry-in-class',
        text: '半块面包用报纸垫着，{teacher}什么也没问。{subject}把面包屑拢在手心，连报纸上的碎屑一起倒进嘴里；回到座位时，肚子还在叫。',
        tone: ['dry'],
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
          '{employer}把一捆教区通告交给{mother}带回家。{subject}放学后在厨房桌上折页到夜里，手指沾满油墨，两周后交回六千张，拿到三克朗二十赫勒；钱交给{mother}时，{subject}的指尖已经洗不干净，指甲缝里留着一圈黑；家里从此多了一个能挣几个铜板的孩子。',
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
          '{subject}放学后替{employer}的排字工送校样，穿过两条街，拿到一克朗。回家时天已经黑了，{mother}把饭留在锅里；{subject}的鞋底磨薄，脚后跟起了泡，却把那一克朗捏得平平整整，放进{mother}的围裙口袋；这跑腿的差事从此固定下来，{subject}也算家里一个能挣钱的孩子。',
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
          '{mother}看见{subject}的手被纸边割破，把通告退回印刷厂。厂里的工头说不干有的是人干，{mother}拉着孩子走了；{subject}从此留在家里看弟妹，手上的口子结了痂，{mother}夜里替人缝补补上那点工钱，灯油却多烧了一截。',
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
    narration: [
      {
        id: 'vienna-life-child-labour.folds-notices.alt1',
        key: 'folds-notices',
        text: '厨房桌上的通告摞得比课本高，{subject}一张张对折，再压平。两周后交回六千张，{employer}数了两遍，把三克朗二十赫勒推过来；{mother}接过去，先摸了摸{subject}的手指。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-child-labour.folds-notices.alt2',
        key: 'folds-notices',
        text: '油墨沾在指缝里，用肥皂搓了三遍也洗不掉。{subject}把钱放在桌上，三克朗二十赫勒，铜板还带着体温；{mother}没有说话，只把灯芯挑亮了一点。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-child-labour.runs-errands.alt1',
        key: 'runs-errands',
        text: '校样用绳子扎着，{subject}怕折了角，一直抱在胸前。送到时排字工正在吃饭，接过校样，从口袋里摸出一克朗；{subject}跑回家，饭已经凉了。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-child-labour.runs-errands.alt2',
        key: 'runs-errands',
        text: '脚后跟的泡磨破了，{subject}把鞋脱在门口，光脚走进厨房。{mother}把锅里的饭盛出来，{subject}先把一克朗放在桌上，才坐下。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-child-labour.refuses-extra-work.alt1',
        key: 'refuses-extra-work',
        text: '工头把通告往桌上一推，说不想干就滚。{mother}把{subject}的手翻过来看了看，拉着孩子就走；那捆纸留在柜台上，油墨味跟了一路。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-child-labour.refuses-extra-work.alt2',
        key: 'refuses-extra-work',
        text: '手上的口子结痂后发痒，{subject}总想去抠。{mother}夜里替人缝补，针脚密得像一排小字；{subject}坐在旁边看弟妹，听见灯芯噼啪响了一声。',
        tone: ['tender'],
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
    tags: ['childhood', 'epidemic', 'death', 'baseline_mortality'],
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
          '{subject}烧了五天，起床时腿发软，走两步就要扶墙。工作丢了半个月，工头说位子已经有人顶替；{subject}摸着楼梯扶手慢慢下楼，肺里还像塞着一团湿棉花，咳一声要歇半天，工票也被压在了抽屉最底下。',
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
          '医生在{residence}听了{subject}的肺，说是肺炎，留下药并嘱咐不要出门。家里人轮流守着，账单记在厨房门框上，一共十二克朗；{subject}的胸口像压着一块砖，咳出来的痰带着铁锈色；医生说这肺以后好不全，夜里只能半坐着睡。',
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
          '{subject}在第七天夜里停止呼吸。家里没有钱请第二次医生，邻居帮忙去市政办事处登记；棺材铺的人下午来量了尺寸，葬礼花去二十克朗，{subject}的工票还挂在门后的钉子上，谁也没有去取。',
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
    narration: [
      {
        id: 'vienna-life-flu-1918-adult.adult-recovers.alt1',
        key: 'adult-recovers',
        text: '五天里{subject}只记得天花板和送水的手。起床时腿一软，扶住床沿才没跪下；工头托人带话，说位子已经有人顶了。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-flu-1918-adult.adult-recovers.alt2',
        key: 'adult-recovers',
        text: '楼梯扶手上有一层灰，{subject}一级一级往下挪，走两步就要停。街上的电车照常响，工厂的汽笛也照常响，只有{subject}的工票被压在了抽屉最底下。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-flu-1918-adult.adult-pneumonia.alt1',
        key: 'adult-pneumonia',
        text: '医生把听诊器挪了三个位置，最后停在左边，说这里有杂音。十二克朗的药和诊费记在门框上，家里人轮流守夜；{subject}半坐着睡，背后垫了两只枕头。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-flu-1918-adult.adult-pneumonia.alt2',
        key: 'adult-pneumonia',
        text: '痰吐在旧报纸里，带一点铁锈色。{subject}看见家里人把报纸团起来，谁也没有说话；厨房门框上的账单又添了一行，十二克朗，字写得很小。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-flu-1918-adult.adult-dies.alt1',
        key: 'adult-dies',
        text: '第七天夜里，{subject}的呼吸一阵比一阵浅。家里人把窗户打开一条缝，天亮时再去摸额头，已经凉了；市政办事处的登记排到下午，棺材铺的人来得更早。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-flu-1918-adult.adult-dies.alt2',
        key: 'adult-dies',
        text: '二十克朗的葬礼钱从亲戚家凑来，工票还挂在门后的钉子上。{subject}的旧外套被取下来，口袋里有半张电车票和一枚磨平的铜板。',
        tone: ['dry'],
      },
    ],
    tags: ['adulthood', 'epidemic', 'death', 'baseline_mortality'],
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
          '{subject}天没亮就到{place}排队，站了四个小时，买到三公斤土豆和一块用纸包着的脂肪，付了三克朗。回家时篮子在雪里拖出一道印子，{subject}的脚趾冻得发麻，但锅里有东西可煮了，晚饭的汤总算能见到油花。',
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
          '轮到{subject}时，店员把“今日售完”的木牌挂出来。队伍里有人骂了一句，警察走过来，大家慢慢散开；{subject}空着篮子回家，胃里一阵阵发紧，晚饭只喝了盐水汤，夜里饿得睡不着，听见自己的肚子在响。',
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
          '{subject}在巷口从一个穿军大衣的人手里买了黑市面粉，九克朗，价格是官价的三倍。面粉里掺着麸皮，回家筛了半天；{subject}把面粉装进铁罐，没敢让邻居看见，锅里的面包总算有了着落。',
        effects: [
          { type: 'cash', householdId: '$household', amount: -9, reason: 'black-market flour' },
          { type: 'food', householdId: '$household', amount: 6, reason: 'black-market flour' },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-life-food-queue-1916.gets-potatoes.alt1',
        key: 'gets-potatoes',
        text: '队伍在雪里挪得很慢，{subject}把篮子换了两只手。轮到窗口时，店员称了三公斤土豆，又从木箱底刮出一块脂肪；三克朗递进去，找回的铜板冻得粘手。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-food-queue-1916.gets-potatoes.alt2',
        key: 'gets-potatoes',
        text: '回家路上篮子越来越沉，{subject}在雪里拖出一道印子。进门时脚趾已经没了知觉，{mother}把土豆接过去，先切了一小块脂肪下锅；屋里很快有了油香。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-food-queue-1916.sold-out.alt1',
        key: 'sold-out',
        text: '木牌挂出来时，队伍里安静了一瞬，随即有人骂出声。警察往这边走了两步，大家慢慢散开；{subject}把空篮子夹在腋下，回头看了一眼关上的窗口。',
        tone: ['bureaucratic'],
      },
      {
        id: 'vienna-life-food-queue-1916.sold-out.alt2',
        key: 'sold-out',
        text: '晚饭只有盐水汤，{subject}把碗底最后一点咸味舔干净。夜里饿得睡不着，听见自己的肚子在响；窗外的雪还在下，配给店门口已经有人开始排明天的队。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-food-queue-1916.black-market.alt1',
        key: 'black-market',
        text: '穿军大衣的人把面粉袋夹在腋下，先收了钱才松手。{subject}把九克朗数过去，袋子比看上去轻；回家筛出半碗麸皮，铁罐盖扣得很紧。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-food-queue-1916.black-market.alt2',
        key: 'black-market',
        text: '面粉里掺着麸皮，筛子摇到手臂发酸。{subject}把铁罐藏到床底下，邻居来敲门时没有开；锅里的面包烤出来发黑，却比盐水汤顶饿。',
        tone: ['matter-of-fact'],
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
          '{subject}在换纸时左手被压板夹住。工友关掉机器，工头拿来急救箱，把伤手包起来送去医院；厂里先垫了十克朗医药费，事故报告写的是“操作不慎”。{subject}的左手从此握不紧拳，指尖总是凉的，天阴时骨缝里发疼。',
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
          '{employer}在事故后第三天通知{subject}不用再来了，说岗位不能一直空着。{subject}拿着医院证明去工会，诊断书被工头压在抽屉里；治伤花去六克朗，{subject}的手还没好，工作先没了，工牌交回去时手指还缠着纱布。',
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
          '压板落下时{subject}没能把手抽出来。工友把人抬到门口，等救护车到时已经没有了呼吸；{employer}当天下午派人送来三十克朗抚恤金，车间里的机器停了一个钟头，又响起来，像什么都没有发生过。',
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
    narration: [
      {
        id: 'vienna-life-work-injury.crushed-hand.alt1',
        key: 'crushed-hand',
        text: '压板抬起来时，{subject}的左手已经扁了一块。工头把急救箱拎过来，纱布绕了三圈就渗红；十克朗的医药费由厂里先垫，事故报告上写着“操作不慎”。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-work-injury.crushed-hand.alt2',
        key: 'crushed-hand',
        text: '医院给{subject}拍了片，说骨头接得回去，筋却难说。回到车间，机器已经重新响了；{subject}试着握拳，指尖凉得像别人的手。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-work-injury.dismissed-after-accident.alt1',
        key: 'dismissed-after-accident',
        text: '工头把辞退的话说得很短，眼睛看着机器。{subject}把工牌放在桌上，纱布里还透着一点红；医院证明递过去，工头顺手压进抽屉，说以后再说。',
        tone: ['bureaucratic'],
      },
      {
        id: 'vienna-life-work-injury.dismissed-after-accident.alt2',
        key: 'dismissed-after-accident',
        text: '工会的人看了证明，问有没有目击者。{subject}说当时只有机器响；六克朗治伤钱先记在账上，工作却已经没了。回家路上，{subject}把伤手插在口袋里，怕人看见。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-work-injury.fatal-accident.alt1',
        key: 'fatal-accident',
        text: '机器停了一个钟头，工友们站在门口，谁也没有说话。{employer}派人送来三十克朗，钱放在桌上，用一只旧信封压着；下午机器又响了。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-work-injury.fatal-accident.alt2',
        key: 'fatal-accident',
        text: '救护车来时，{subject}已经被抬到门口。三十克朗抚恤金交到家里，信封上没有写名字；车间里的考勤牌第二天就换了新名字。',
        tone: ['dry'],
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
    title: '老年的冬天',
    stage: 'elderhood',
    ageWindow: { min: 72, max: 118 },
    subjectProvenance: ['birth', 'initial'],
    // Old age is a recurring risk, not a one-off milestone: surviving one hard
    // winter must not make a person immortal for the rest of the run.
    rate: 0.16,
    cooldownYears: 1,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 72, maxAge: 118 },
      {
        key: 'neighbor',
        kind: 'neighbor',
        required: false,
        minAge: 18,
        maxAge: 80,
      },
    ],
    conditions: [
      { kind: 'age', min: 72, max: 118 },
      { kind: 'stage', in: ['elderhood'] },
    ],
    outcomes: [
      {
        id: 'dies-at-home',
        weight: 0.55,
        immediateText:
          '{subject}在睡梦中没有醒来。邻居早上来送面包，敲门没人应，找房东开了锁；桌上还放着昨天的药和一杯没喝完的水。葬礼花去十五克朗，{subject}的旧外套被邻居叠好，放在椅背上，口袋里有一张过期的药方。',
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
          '{subject}在家里摔倒后被送到医院。三周后，病房的窗帘拉开时，床上已经换了新的病人；医院把遗物装在一只纸袋里交给邻居，住院和葬礼一共二十克朗，纸袋里只有一副眼镜和半块肥皂。',
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
        weight: 0.3,
        immediateText:
          '{subject}在医院住了两周又回到家，走路更慢了。六克朗的住院费从积蓄里出，邻居把药按早中晚分在小盒里，放在床头；{subject}夜里还是咳，但第二天早上能自己坐到窗边，看楼下的人扫雪。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.08, reason: 'old age decline' },
          { type: 'cash', householdId: '$household', amount: -6, reason: 'hospital visit' },
        ],
      },
    ],
    narration: [
      {
        id: 'vienna-life-death-old-age.dies-at-home.alt1',
        key: 'dies-at-home',
        text: '邻居敲了三回门，最后找房东拿钥匙。锁开后，屋里很静，桌上的水还剩半杯；十五克朗的葬礼钱从抽屉里找到，用手帕包着。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-death-old-age.dies-at-home.alt2',
        key: 'dies-at-home',
        text: '{subject}的旧外套被叠好放在椅背上，口袋里有一张过期的药方。邻居把窗打开，街上的面包车正好经过；屋里没有别的声响。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-death-old-age.dies-in-hospital.alt1',
        key: 'dies-in-hospital',
        text: '摔倒时{subject}还够得到桌角，送到医院后就没再清醒。三周后窗帘拉开，床上换了新病人；纸袋里一副眼镜、半块肥皂，二十克朗的账单夹在袋口。',
        tone: ['clinical'],
      },
      {
        id: 'vienna-life-death-old-age.dies-in-hospital.alt2',
        key: 'dies-in-hospital',
        text: '邻居把纸袋拎回家，放在桌上，一时不知道该怎么处理后事。住院和葬礼一共二十克朗；{subject}的眼镜腿是歪的，像还架在鼻梁上。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-death-old-age.survives-another-year.alt1',
        key: 'survives-another-year',
        text: '出院时{subject}扶着墙走，六克朗的住院费从手帕里数出去。邻居把药分进三个小盒，早中晚各一格；窗台上的雪化了，水滴到楼下。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-death-old-age.survives-another-year.alt2',
        key: 'survives-another-year',
        text: '夜里还是会咳，但天亮后{subject}能自己坐到窗边。楼下有人扫雪，铁锹刮着石板；{subject}看了一会儿，把药盒往手边挪了挪。',
        tone: ['dry'],
      },
    ],
    tags: ['elderhood', 'death', 'baseline_mortality'],
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
          '{subject}把床架拆开，用绳子捆在借来的手推车上，搬进利奥波德城的合租房。押金和车钱花掉八克朗；新住处人多、墙薄，但至少每个人有一块能躺下的地方，{subject}的腰在冷风里疼了一路，夜里却第一次不用侧着身睡。',
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
          '{subject}把厨房角落隔出一块，租给一个在附近上工的学徒。每月多四克朗，但煤、水和厕所都要排队；夜里有人咳嗽，{subject}睡不踏实，第二天眼下发青，孩子也在床上翻来覆去，四克朗换来一屋子醒着的人。',
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
          '{subject}去市政办事处登记申请更大的市营住宅。办事员收下表格和两克朗手续费，说前面还有几百户，至少要等两年；{subject}把回执折好，回家路上看见新盖的市营楼房，窗户亮着，门却还进不去。',
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
    narration: [
      {
        id: 'vienna-life-overcrowded-flat.move-to-shared-tenement.alt1',
        key: 'move-to-shared-tenement',
        text: '床架绑在手推车上，过石子路时吱呀作响。八克朗付了押金和车钱，{subject}把铺盖搬进合租房；隔壁有人在咳，墙薄得能听见翻身。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-overcrowded-flat.move-to-shared-tenement.alt2',
        key: 'move-to-shared-tenement',
        text: '新住处只有一扇小窗，但每个人总算有一块能躺下的地方。{subject}把床架拼好，腰疼得直不起来；夜里第一次不用侧着身睡，却听见整栋楼的呼吸。',
        tone: ['tender'],
      },
      {
        id: 'vienna-life-overcrowded-flat.take-in-a-lodger.alt1',
        key: 'take-in-a-lodger',
        text: '学徒把铺盖卷放在厨房角落，四克朗先付了一个月。夜里学徒咳了两声，{subject}就醒了；煤、水和厕所都要排队，早上出门时谁也没抢到先。',
        tone: ['dry'],
      },
      {
        id: 'vienna-life-overcrowded-flat.take-in-a-lodger.alt2',
        key: 'take-in-a-lodger',
        text: '四克朗放在桌上，{subject}数了一遍，又添进房租的信封。孩子半夜翻来覆去，学徒在厨房里咳嗽；{subject}睁着眼到天亮，眼下青了一圈。',
        tone: ['matter-of-fact'],
      },
      {
        id: 'vienna-life-overcrowded-flat.apply-for-a-municipal-flat.alt1',
        key: 'apply-for-a-municipal-flat',
        text: '办事员把表格翻到最后一页，收了两个克朗，在角上盖了个章。{subject}问要等多久，办事员说前面还有几百户；回执上的号码写得很小。',
        tone: ['bureaucratic'],
      },
      {
        id: 'vienna-life-overcrowded-flat.apply-for-a-municipal-flat.alt2',
        key: 'apply-for-a-municipal-flat',
        text: '回家路上经过新盖的市营楼房，窗户亮着，晾衣绳上挂着床单。{subject}把回执折好放进内袋，两克朗换回一张纸；自己的厨房里还睡着学徒。',
        tone: ['dry'],
      },
    ],
    tags: ['housing', 'home', 'health', 'family'],
    sourceIds: ['source-push-wiener-wohnverhaeltnisse', 'source-wien-geschichte-wohnbaupolitik'],
    historicalBasis:
      'Viennese working-class flats were severely overcrowded; municipal housing and rent regulation changed access over the period.',
  },

  {
    id: 'vienna-life-injury-recovery',
    version: 1,
    packId: PACK,
    title: '伤后的几天',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    subjectProvenance: ['birth', 'initial'],
    triggerTags: ['injury'],
    // A person can be injured more than once, but the same recovery vignette
    // should not appear every single year of a long working life.
    cooldownYears: 3,
    rate: 0,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 18, maxAge: 60 },
      {
        key: 'doctor',
        kind: 'worker',
        required: false,
        minAge: 25,
        maxAge: 75,
        occupation: 'Arzt',
      },
    ],
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'stage', in: ['adulthood'] },
      { kind: 'health', max: 0.9 },
    ],
    outcomes: [
      {
        id: 'clinic-treatment',
        weight: 0.5,
        immediateText:
          '{subject}在受伤后的第三天去了诊所。医生清洗伤口、换药，收下诊费，嘱咐不要急着回机器旁。{subject}把药方折好，回家路上买了纱布。',
        effects: [
          { type: 'health', personId: '$subject', amount: 0.05, reason: 'wound treatment' },
          { type: 'cash', householdId: '$household', amount: -8, reason: 'clinic and bandages' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'bandaged wound',
            add: true,
            reason: 'treated injury',
          },
        ],
      },
      {
        id: 'home-care',
        weight: 0.3,
        immediateText:
          '{subject}没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.03, reason: 'untreated wound' },
          { type: 'cash', householdId: '$household', amount: -2, reason: 'clean cloth' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'inflamed wound',
            add: true,
            reason: 'home care',
          },
        ],
      },
      {
        id: 'wound-infection',
        weight: 0.2,
        immediateText:
          '{subject}的伤口在几天后肿起来，手腕发热。医生说要切开引流，费用比上次更高；{subject}看着账单，先问能不能分两次付。',
        effects: [
          { type: 'health', personId: '$subject', amount: -0.12, reason: 'wound infection' },
          { type: 'cash', householdId: '$household', amount: -14, reason: 'drainage and medicine' },
          {
            type: 'condition',
            personId: '$subject',
            condition: 'infected wound',
            add: true,
            reason: 'wound infection',
          },
        ],
      },
    ],
    tags: ['health', 'work', 'family'],
    sourceIds: ['source-wien-geschichte-arbeitsschutz', 'source-wien-geschichte-tuberkulose'],
    historicalBasis:
      'Work injuries and wound infections were common in Vienna; treatment depended on household cash and access to a doctor.',
  },

  {
    id: 'vienna-life-literacy-gate',
    version: 1,
    packId: PACK,
    title: '一张能读懂的纸',
    stage: 'childhood',
    ageWindow: { min: 6, max: 14 },
    subjectProvenance: ['birth', 'initial'],
    cooldownYears: 2,
    roles: [
      { key: 'subject', kind: 'subject', required: true, minAge: 6, maxAge: 14 },
      { key: 'neighbor', kind: 'neighbor', required: false, minAge: 18, maxAge: 70 },
    ],
    conditions: [
      { kind: 'age', min: 6, max: 14 },
      { kind: 'capability', capability: 'literacy' },
    ],
    tags: ['education', 'literacy', 'family'],
    rate: 0.4,
    outcomes: [
      {
        id: 'read-the-rent-notice',
        weight: 0.55,
        immediateText:
          '{subject}把房东塞进门缝的通知读给家里人听。纸上写着下个月的房租和一行很小的附加费；母亲让{subject}再读一遍，确认自己没有听错。',
        effects: [
          {
            type: 'skill',
            personId: '$subject',
            skill: 'literacy',
            amount: 0.04,
            reason: 'read a rent notice',
          },
          { type: 'mood', personId: '$subject', amount: 0.02, reason: 'useful reading' },
        ],
      },
      {
        id: 'teach-a-neighbor',
        weight: 0.3,
        immediateText:
          '邻居拿来一张药房的说明，问{subject}上面写的是什么。{subject}一字一字念完，邻居把药名记在手心，临走时塞给{subject}一块糖。',
        effects: [
          {
            type: 'skill',
            personId: '$subject',
            skill: 'social',
            amount: 0.03,
            reason: 'read for a neighbor',
          },
          {
            type: 'relation',
            a: '$subject',
            b: '$neighbor',
            kind: 'acquaintance',
            trust: 0.03,
            reason: 'read a medicine label',
          },
        ],
      },
      {
        id: 'hide-the-letter',
        weight: 0.15,
        immediateText:
          '{subject}把一封写给父亲的信藏进课本里。信上说工厂要缩短工时；{subject}读得懂，却不知道该不该在晚饭前说出来。',
        effects: [
          { type: 'mood', personId: '$subject', amount: -0.02, reason: 'a difficult letter' },
          {
            type: 'flag',
            personId: '$subject',
            flag: 'read_family_letter',
            add: true,
            reason: 'read a private letter',
          },
        ],
      },
    ],
    sourceIds: ['source-oeaw-wiener-arbeiterhaushalte-1912'],
    ...viennaBasis,
  },
];
