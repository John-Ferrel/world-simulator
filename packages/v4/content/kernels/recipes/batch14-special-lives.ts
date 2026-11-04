import type { PlotKernel } from '../../../composition/types.js';
import type { RoleRequirement } from '../../../domain.js';
import type { RoleDecl } from './kit.js';
import { recipes, taskMeta } from './kit.js';

/**
 * Phase 14 · distinctive lives, special mechanisms.
 *
 * Sixteen tasks are attempts a person chooses (submit a manuscript, forge a
 * passport, take a shameful role, sell an organ) and twenty-four events are
 * things that happen to them (a patron's challenge, a body on the riverbank,
 * a trial, an obituary). The batch is built as chains: the proofreader who
 * accepted the first book returns when the second fails; the accomplice from
 * the last burglary is still standing by the river when the body is found; the
 * client whose passport was forged turns up in a registry error. All effects
 * run through the ordinary composer and engine.
 */

type ReturningRoleOptions = {
  minAge?: number;
  maxAge?: number;
  sex?: 'female' | 'male' | 'opposite';
  sameHousehold?: boolean;
  required?: boolean;
  sharedHistoryTag?: string;
};

/**
 * `kit.ts` does not yet declare `sharedHistoryTag` in its compact RoleDecl
 * tuple, although `RoleRequirement` and the engine support it. This helper
 * keeps the cast narrow and lets returning people be cast from real shared
 * history instead of materialised strangers.
 */
function returning(kind: RoleRequirement['kind'], options: ReturningRoleOptions): RoleDecl {
  return [kind, options] as unknown as RoleDecl;
}

export const BATCH14_SPECIAL_LIVES: PlotKernel[] = recipes([
  // 1. The first submission -----------------------------------------------
  {
    id: 'r14-spec.writer-first-submission',
    title: '退稿信上的咖啡渍',
    domain: 'culture',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['writing', 'publishing', 'manuscript', 'rejection', 'ambition'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'literacy' }],
    roles: {
      editor: ['worker', { minAge: 28, maxAge: 70 }],
      rival: ['worker', { minAge: 18, maxAge: 45 }],
    },
    cooldownYears: 8,
    outcomes: [
      {
        id: 'accepted-by-the-supplement',
        w: 0.3,
        text: '《晨报》副刊的{editor}把校样推过来，纸上还留着咖啡杯底的圆印。{subject}看见自己的名字被排成小号铅字，排在一位连载小说家下面，稿费三克朗，装在信封里，封口没有粘牢。{rival}在门口探头，问是不是登了，{subject}把校样折起来，说只是去校对错字。',
        significance: 0.82,
        followup: { sceneId: 'r14-spec.writer-fame-or-failure', delayMonths: 18 },
        fx: {
          cash: 3,
          reputation: 0.06,
          role: 'author',
          relation: ['editor', 'colleague', 0.12, 0],
          flag: ['spec14_first_book', 'spec14_supplement_author'],
          knowledge: ['the supplement pays three kronen for a first story', 0.8, 'editor'],
        },
      },
      {
        id: 'paid-for-by-the-author',
        w: 0.3,
        text: '印刷所要求先付十四克朗，{editor}说这不算出版，只算给自己印一叠体面的纸。{subject}把母亲留下的银顶针送进当铺，换回三百本薄薄的书，堆在床底下。{rival}拿走一本，翻到最后一页，问为什么没有价格，{subject}说书不是拿来卖的。',
        significance: 0.72,
        followup: { sceneId: 'r14-spec.writer-fame-or-failure', delayMonths: 24 },
        fx: {
          cash: -14,
          reputation: -0.04,
          flag: ['spec14_first_book', 'spec14_vanity_published'],
          relation: ['editor', 'rival', -0.08, 0],
          mood: -0.04,
        },
      },
      {
        id: 'rejected-at-the-door',
        w: 0.4,
        text: '{editor}把稿子退回来，信封上写着“恕不采用”，字迹比正文还工整。{subject}在印刷所门口站了一会儿，花一克朗买了半磅煤，把稿子塞进外套，转身去问排字房要不要临时工。{rival}在街角等着，接过那叠纸翻了两页，说至少纸是好的，可以拿去包鱼。',
        significance: 0.62,
        fx: {
          cash: -1,
          skill: { literacy: 0.03 },
          flag: 'spec14_manuscript_rejected',
          mood: -0.1,
          knowledge: ['the supplement returns most unsolicited manuscripts without comment', 0.7],
        },
      },
    ],
    task: {
      ...taskMeta('culture', ['status', 'knowledge'], ['status', 'knowledge'], 0.55, 0.2, [
        'literacy',
      ]),
      capability: 'literacy',
    },
  },

  // 2. First publication returns as fame, failure or pulp ------------------
  {
    id: 'r14-spec.writer-fame-or-failure',
    title: '第二本书的印数',
    domain: 'culture',
    stage: 'adulthood',
    ages: [26, 59],
    tags: ['writing', 'publishing', 'fame', 'failure', 'review'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', kernelId: 'r14-spec.writer-first-submission', minYearsAgo: 1 }],
    roles: {
      editor: returning('worker', { minAge: 30, maxAge: 75, sharedHistoryTag: 'publishing' }),
      critic: ['worker', { minAge: 28, maxAge: 75 }],
    },
    baseRate: 0.0015,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'a-famous-second-book',
        w: 0.35,
        text: '第二本书印了八千册，书店橱窗里摆着{subject}的肖像，{editor}在庆功宴上把香槟杯碰得很响，当场结了十二克朗版税。评论家{critic}在报纸上写“本世纪最会写饥饿的人”，可{subject}已经三年没有饿过。夜里回到公寓，{subjectPronoun}把第一本书从书架上抽出来，发现扉页上自己当年的签名已经褪成灰色。',
        significance: 0.86,
        when: { hasFlag: 'spec14_first_book' },
        fx: {
          cash: 12,
          reputation: 0.18,
          role: 'celebrated_author',
          relation: ['editor', 'colleague', 0.15, 0],
          flag: 'spec14_literary_fame',
          knowledge: ['the second book sold eight thousand copies', 0.9, 'editor'],
        },
      },
      {
        id: 'four-hundred-copies',
        w: 0.35,
        text: '第二本书只卖出四百册，{editor}把退货单叠在桌上，说仓库要腾地方。{critic}在专栏里写“重复自己”，结尾还引了{subject}第一本书的句子，像是提醒读者曾经有过好时光。{subject}去仓库搬走剩下的书，付了四克朗运费；纸箱底被水汽泡软，一摞书散在月台上。',
        significance: 0.76,
        when: { hasFlag: 'spec14_first_book' },
        fx: {
          cash: -4,
          reputation: -0.12,
          mood: -0.14,
          flag: 'spec14_second_book_failed',
          relation: ['critic', 'rival', -0.1, 0],
          knowledge: ['the second printing was returned almost unsold', 0.85, 'editor'],
        },
      },
      {
        id: 'the-pulp-memoir',
        w: 0.3,
        text: '{editor}带来一份合同，要{subject}把第一本书里那个饿死的孩子写成自己的童年，再加两章酒馆和女人。预付六克朗，印数一万。{subject}在合同背面算了算房租，签了名。{critic}后来在电车上遇见{subject}，问那孩子是不是真的，{subject}说读者要真的，就给真的。',
        significance: 0.72,
        fx: {
          cash: 6,
          reputation: -0.08,
          flag: 'spec14_pulp_memoir',
          relation: ['editor', 'colleague', 0.05, 0],
          knowledge: ['the publisher wants a scandalous memoir, not a novel', 0.8, 'editor'],
        },
      },
    ],
  },

  // 3. The lost manuscript -------------------------------------------------
  {
    id: 'r14-spec.writer-lost-manuscript',
    title: '阁楼里的蓝纸包',
    domain: 'culture',
    stage: 'adulthood',
    ages: [42, 59],
    tags: ['writing', 'publishing', 'manuscript', 'archive', 'memory'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform'],
    conditions: [
      { kind: 'history', kernelId: 'r14-spec.writer-first-submission', minYearsAgo: 18 },
      { kind: 'hasFlag', flag: 'spec14_first_book' },
    ],
    roles: {
      editor: returning('worker', { minAge: 35, maxAge: 85, sharedHistoryTag: 'publishing' }),
      neighbor: ['neighbor', { minAge: 25, maxAge: 75 }],
    },
    baseRate: 0.001,
    cooldownYears: 30,
    outcomes: [
      {
        id: 'read-on-the-stairs',
        w: 0.4,
        text: '搬家那天，{neighbor}从阁楼梁上摸出一个蓝纸包，里面是{subject}二十岁时写的长篇，稿纸边缘被老鼠咬成锯齿。{editor}赶来，坐在楼梯上读到天黑，说这本书比后来印出来的都好，先付十克朗。{subject}摸着封面上自己用铅笔写的书名，发现最后一个字已经被潮气泡开。',
        significance: 0.82,
        fx: {
          cash: 10,
          reputation: 0.08,
          role: 'author',
          relation: ['editor', 'colleague', 0.1, 0],
          flag: 'spec14_manuscript_recovered',
          knowledge: ['the attic manuscript is the first novel, not the second', 0.9, 'editor'],
        },
      },
      {
        id: 'sold-to-the-archive',
        w: 0.3,
        text: '{editor}把蓝纸包带到大学图书馆，馆员用棉线重新装订，编了号，放在“未刊稿”柜子里。{subject}拿到十四克朗的收购费，条件是不再改动一个字。回家的电车上，{subjectPronoun}想起书里有个情节写错了，可稿子已经锁进铁柜，钥匙在别人手里。',
        significance: 0.78,
        fx: {
          cash: 14,
          reputation: 0.05,
          flag: 'spec14_manuscript_archived',
          knowledge: ['the manuscript is sealed in the university archive', 0.9],
        },
      },
      {
        id: 'burned-in-the-yard',
        w: 0.3,
        text: '{neighbor}在院子里烧旧纸，{subject}看见蓝纸包的一角从火里翘起来，伸手去抢，只抓到一把烫手的灰。{editor}后来问起那本书，{subject}说写的是年轻时的事，记不清了。夜里{subjectPronoun}梦见稿纸上的字一个个浮起来，又被风吹回炉膛。',
        significance: 0.76,
        fx: {
          mood: -0.15,
          health: -0.02,
          flag: 'spec14_manuscript_burned',
          knowledge: [
            'the only draft of the first novel was burned in a courtyard fire',
            0.8,
            'neighbor',
          ],
        },
      },
    ],
  },

  // 4. The compromising negative ------------------------------------------
  {
    id: 'r14-spec.photographer-negative',
    title: '底片上的第三个人',
    domain: 'culture',
    stage: 'adulthood',
    ages: [22, 59],
    tags: ['photography', 'negative', 'scandal', 'darkroom', 'army'],
    contexts: ['vienna', 'urban', 'peace', 'war', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'history', tag: 'army', minCount: 1, includeParticipants: true, withinYears: 20 },
      { kind: 'capability', capability: 'craft_affinity' },
    ],
    roles: {
      editor: ['worker', { minAge: 30, maxAge: 68 }],
      client: ['official', { minAge: 35, maxAge: 75 }],
      assistant: ['worker', { minAge: 18, maxAge: 45 }],
    },
    baseRate: 0.01,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'a-second-print',
        w: 0.35,
        text: '{subject}在暗房里把底片放大，第三个人影从{client}的肩膀后面浮出来，手正伸向桌上的信封。{editor}看完照片，说这张不能登，登了就是诽谤。{subject}把相纸挂回绳上，让它慢慢干；{assistant}在旁边问要不要再印一张，{subject}说印，印两张。',
        significance: 0.8,
        fx: {
          reputation: -0.04,
          relation: ['client', 'rival', -0.2, 0],
          flag: 'spec14_negative_kept',
          mood: 0.06,
          knowledge: [
            'the negative shows a third hand reaching for the envelope',
            0.9,
            'assistant',
          ],
        },
      },
      {
        id: 'sold-to-the-scandal-sheet',
        w: 0.35,
        text: '{subject}把底片卖给一家专登丑闻的小报，换了十四克朗。{client}的律师第二天就找上暗房，把药水盘掀翻在地。{editor}听说后，把{subject}的下一组稿子退了回来，说报纸可以登丑闻，但不能由自己的人卖出去。',
        significance: 0.82,
        fx: {
          cash: 14,
          reputation: -0.14,
          relation: [
            ['editor', 'rival', -0.15, 0],
            ['client', 'rival', -0.2, 0],
          ],
          flag: 'spec14_negative_sold',
          knowledge: ['the scandal sheet paid fourteen kronen for the negative', 0.85],
        },
      },
      {
        id: 'a-match-in-the-darkroom',
        w: 0.3,
        text: '{subject}把底片举到灯下看了很久，最后划着一根火柴。火苗沿着胶片边缘爬，第三个人影先变黑，再变成一小截卷曲的灰。{assistant}伸手去抢，晚了一步；{subject}说有些证据过了太久，只会变成另一种谎话。',
        significance: 0.66,
        fx: {
          health: -0.02,
          relation: ['assistant', 'friend', 0.05, 0],
          flag: 'spec14_negative_burned',
          mood: -0.08,
        },
      },
    ],
  },

  // 5. The patron's portrait ----------------------------------------------
  {
    id: 'r14-spec.painter-patron-portrait',
    title: '赞助人袖口的金线',
    domain: 'culture',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['art', 'painting', 'patronage', 'portrait', 'commission'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'reform', 'crisis'],
    conditions: [{ kind: 'skill', skill: 'craft', min: 0.25 }],
    roles: {
      patron: ['official', { minAge: 35, maxAge: 78 }],
      model: ['neighbor', { minAge: 18, maxAge: 55 }],
    },
    cooldownYears: 6,
    outcomes: [
      {
        id: 'the-narrower-chin',
        w: 0.35,
        text: '{patron}坐在窗边，要求把下巴画窄一寸，把勋章画大两指。{subject}照做了，颜料未干就拿到尾款十八克朗。{patron}把画挂进会客厅，逢人便说是“老朋友的手笔”。{model}在厨房听见，低声问那幅画里到底有没有一个人，{subject}说画的是{patron}愿意付钱的那张脸。',
        significance: 0.8,
        fx: {
          cash: 18,
          reputation: 0.08,
          role: 'portraitist',
          relation: ['patron', 'colleague', 0.18, 0],
          flag: 'spec14_patron_kept',
        },
      },
      {
        id: 'the-vein-and-the-hand',
        w: 0.4,
        text: '{subject}把{patron}眼下的青筋和那只萎缩的右手都画了进去。画展开幕时，{patron}在众人面前站了很久，说这不是肖像，是一份病历。尾款只付了六克朗，其余的说等画展结束；{model}把画布从框上拆下来，卷好，塞进{subject}的怀里。当晚{patron}的秘书送来一张决斗的口信。',
        significance: 0.82,
        followup: { sceneId: 'r14-spec.duel', delayMonths: 2 },
        fx: {
          cash: 6,
          reputation: 0.12,
          relation: ['patron', 'rival', -0.2, 0],
          flag: ['spec14_patron_kept', 'spec14_patron_betrayed'],
        },
      },
      {
        id: 'a-study-they-refused',
        w: 0.25,
        text: '{subject}没有画大幅肖像，只交了一张巴掌大的速写，袖口的金线用了最便宜的颜料。{patron}把画翻过来，看见背面写着“预付款不退”，脸色沉下去。{model}把速写包进纸里，说至少这张不用挂在会客厅。{subject}收下钱袋，里面只有一克朗，没有数第二遍。',
        significance: 0.62,
        fx: {
          cash: 1,
          relation: ['patron', 'rival', -0.05, 0],
          flag: 'spec14_patron_sketch_refused',
          mood: 0.03,
        },
      },
    ],
    task: taskMeta('craft', ['status', 'work'], ['status', 'cash'], 0.55, 0.25, ['craft']),
  },

  // 5. The audition --------------------------------------------------------
  {
    id: 'r14-spec.musician-audition',
    title: '排练厅的第三把椅子',
    domain: 'culture',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['music', 'audition', 'orchestra', 'hearing', 'ambition'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'craft' }],
    roles: {
      conductor: ['teacher', { minAge: 35, maxAge: 70 }],
      rival: ['worker', { minAge: 18, maxAge: 42 }],
    },
    cooldownYears: 6,
    outcomes: [
      {
        id: 'third-chair',
        w: 0.35,
        text: '{conductor}用定音叉敲了三下，让{subject}从第二把椅子的位置重来。铜管在身后炸开时，{subject}的耳朵里像塞进一只蜜蜂。{conductor}说下周跟团去外地，工钱三克朗一场。{rival}在门口拎着琴盒，问试上了没有，{subject}只看见对方嘴唇在动，没听清。',
        significance: 0.78,
        fx: {
          cash: 3,
          health: -0.04,
          role: 'orchestra_member',
          relation: ['conductor', 'colleague', 0.12, 0],
          flag: 'spec14_orchestra_hired',
        },
      },
      {
        id: 'stopped-at-bar-four',
        w: 0.35,
        text: '{conductor}听到第四小节就抬起手，说{subject}的拍子像在赶火车。{rival}被叫进去，门关上后，里面传来一段干净的独奏。{subject}在走廊里把琴盒扣好，发现方才紧张时把松香蹭到了裤腿上，白了一片，怎么拍也拍不掉。',
        significance: 0.62,
        fx: {
          mood: -0.12,
          skill: { craft: 0.02 },
          flag: 'spec14_audition_failed',
          relation: ['rival', 'rival', -0.06, 0],
        },
      },
      {
        id: 'the-loud-pit',
        w: 0.3,
        text: '{subject}坐进第三把椅子，{conductor}让全团把音量推到最强。排练到第三个小时，右耳忽然只剩下一层薄薄的嗡鸣，像有人在耳道里拉一根不断的线。散场后{conductor}拍着{subject}的肩说很好，递来两克朗排练费；{subject}看着那张嘴，点了点头，没说自己已经听不见低音部。',
        significance: 0.84,
        fx: {
          cash: 2,
          health: -0.1,
          condition: 'tinnitus',
          role: 'orchestra_member',
          relation: ['conductor', 'colleague', 0.08, 0],
          flag: ['spec14_orchestra_hired', 'spec14_hearing_damaged'],
          knowledge: ['the brass section sits directly behind the third chair', 0.8],
        },
      },
    ],
    task: {
      ...taskMeta('culture', ['status', 'belonging'], ['status', 'belonging'], 0.6, 0.3, ['craft']),
      capability: 'craft',
    },
  },

  // 6. The scandalous role -------------------------------------------------
  {
    id: 'r14-spec.actor-scandal',
    title: '散场后的花边小报',
    domain: 'culture',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['theatre', 'actor', 'scandal', 'press', 'humiliation'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'social' }],
    roles: {
      impresario: ['worker', { minAge: 35, maxAge: 70 }],
      reporter: ['worker', { minAge: 20, maxAge: 55 }],
    },
    cooldownYears: 6,
    outcomes: [
      {
        id: 'the-goose-in-a-dress',
        w: 0.4,
        text: '首演夜，{subject}在第三幕把台词改了一句，把台下的市长讽刺成一只穿礼服的鹅。观众笑到拍椅子，{reporter}第二天在头版画了一幅漫画。{impresario}数着售票窗口的钱，说这出戏能演四十场，当场分了八克朗；{subject}在化妆间卸妆，发现油彩下面的脸比台上老。',
        significance: 0.82,
        followup: { sceneId: 'r14-spec.absurd-official-honor', delayMonths: 12 },
        fx: {
          cash: 8,
          reputation: -0.1,
          role: 'scandalous_actor',
          relation: ['impresario', 'colleague', 0.1, 0],
          flag: 'spec14_stage_scandal',
        },
      },
      {
        id: 'the-back-door-story',
        w: 0.35,
        text: '{reporter}没有写戏，只写{subject}深夜从{impresario}的公寓后门出来，连鞋跟都踩在雨水里。报纸上市那天，{impresario}的妻子坐在第一排看完整场，谢幕时把手套一只一只戴好。{subject}在后台听见前厅的掌声，手里攥着{reporter}塞来的两克朗线人钱，分不清那是给角色的，还是给丑闻的。',
        significance: 0.8,
        followup: { sceneId: 'r14-spec.absurd-official-honor', delayMonths: 12 },
        fx: {
          cash: 2,
          reputation: -0.2,
          relation: [
            ['reporter', 'rival', -0.15, 0],
            ['impresario', 'rival', -0.1, 0],
          ],
          flag: 'spec14_press_scandal',
        },
      },
      {
        id: 'withdrew-after-the-poster',
        w: 0.25,
        text: '{subject}在彩排后把剧本合上，说这角色会毁掉一条街上的名声。{impresario}把合同翻到违约金那一条，用指甲划了划。{subject}把定金数回去，差三克朗；第二天报纸登出“临阵换角”的消息，配了一张{subject}在雨里等电车的照片。',
        significance: 0.62,
        fx: {
          cash: -3,
          reputation: -0.04,
          relation: ['impresario', 'rival', -0.08, 0],
          flag: 'spec14_withdrew_role',
          mood: -0.05,
        },
      },
    ],
    task: {
      ...taskMeta('culture', ['status', 'belonging'], ['status', 'belonging'], 0.5, 0.35, [
        'social',
      ]),
      capability: 'social',
    },
  },

  // 7. The source ----------------------------------------------------------
  {
    id: 'r14-spec.journalist-protect-source',
    title: '邮局后门的暗号',
    domain: 'knowledge',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 58],
    tags: ['journalism', 'source', 'press', 'secrecy', 'exposure'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'social_insight' }],
    roles: {
      source: ['worker', { minAge: 22, maxAge: 65 }],
      editor: ['worker', { minAge: 30, maxAge: 65 }],
    },
    cooldownYears: 8,
    outcomes: [
      {
        id: 'name-struck-out',
        w: 0.35,
        text: '排版前夜，{subject}把{source}的名字从稿子里删掉，换成“一名不愿具名的职员”。{editor}看完，沉默了一会儿，把清样上的地址也划掉。报纸上市后，{source}在邮局后门塞给{subject}一包烟和四克朗稿费，说名字没登出来，家里的门就不用换了。',
        significance: 0.78,
        fx: {
          cash: 4,
          reputation: 0.1,
          relation: ['source', 'friend', 0.2, 0],
          flag: 'spec14_source_protected',
          knowledge: ['the source can be quoted only without a name', 0.85, 'source'],
        },
      },
      {
        id: 'name-and-staff-number',
        w: 0.4,
        text: '{editor}说证据不够，除非把{source}的名字和工号一起登出来。{subject}照做了，头版卖得很快，十克朗奖金当天发下来。第三天，{source}的丈夫来报社门口站着，手里攥着那张报纸；同一天，{source}没有去上工，公寓的钥匙插在门内，从外面拧不动。',
        significance: 0.84,
        followup: { sceneId: 'r14-spec.disappearance', subjectRole: 'source', delayMonths: 2 },
        fx: {
          cash: 10,
          reputation: 0.16,
          relation: ['source', 'rival', -0.3, 0],
          flag: 'spec14_source_exposed',
          mood: -0.1,
        },
      },
      {
        id: 'spiked-in-the-drawer',
        w: 0.25,
        text: '{subject}把稿子压在抽屉最底层，{editor}催了三次，最后自己撤了版。{source}在约定地点等到路灯亮，问是不是不登了。{subject}说再等等，还赔进去两克朗排版费；{source}把围巾往上拉了拉，说等可以，别让名字先登出来。',
        significance: 0.68,
        fx: {
          cash: -2,
          relation: ['editor', 'rival', -0.12, 0],
          flag: 'spec14_story_spiked',
          knowledge: [
            'the editor will kill the story rather than risk a libel suit',
            0.8,
            'editor',
          ],
          mood: -0.04,
        },
      },
    ],
    task: {
      ...taskMeta('knowledge', ['knowledge', 'status'], ['knowledge', 'status'], 0.6, 0.35, [
        'social',
        'literacy',
      ]),
      capability: 'social_insight',
    },
  },

  // 8. The forger ----------------------------------------------------------
  {
    id: 'r14-spec.forger-craft',
    title: '一枚不属于任何人的印章',
    domain: 'crime',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['crime', 'forgery', 'craft', 'debt', 'risk'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'history', tag: 'debt', minCount: 1, withinYears: 8 },
      { kind: 'capability', capability: 'craft_affinity' },
    ],
    roles: {
      client: ['official', { minAge: 30, maxAge: 70 }],
      fence: ['worker', { minAge: 25, maxAge: 65 }],
    },
    cooldownYears: 10,
    outcomes: [
      {
        id: 'the-passport-that-took',
        w: 0.4,
        text: '{subject}用一枚旧印章在空白护照上试了七次，最后挑出纸纹最接近的一张。{client}把护照翻到签证页，对着灯看了很久，说看不出。十二克朗放在桌上，{client}没有数，{subject}也没有送。{fence}在门口提醒，最近巡警在查旅馆的登记簿。',
        significance: 0.8,
        followup: {
          sceneId: 'r14-spec.bureaucracy-mistake',
          subjectRole: 'client',
          delayMonths: 3,
        },
        fx: {
          cash: 12,
          skill: { craft: 0.05 },
          relation: ['client', 'colleague', 0.1, 0],
          flag: 'spec14_forged_passport',
          knowledge: [
            'the client will carry the forged passport into a registry office',
            0.8,
            'client',
          ],
        },
      },
      {
        id: 'the-smudged-surname',
        w: 0.35,
        text: '印泥太湿，{client}的姓在落款处晕开一小块。{subject}说可以补，{client}已经把护照塞进内袋，赶去赶火车。四克朗定金已经花掉一半；两周后，{fence}带来消息，说边境扣了一个人，护照上的号码对不上。{subject}把刻刀收进抽屉，第一次觉得那枚印章太重。',
        significance: 0.8,
        followup: {
          sceneId: 'r14-spec.bureaucracy-mistake',
          subjectRole: 'client',
          delayMonths: 4,
        },
        fx: {
          cash: 4,
          relation: ['client', 'rival', -0.2, 0],
          flag: 'spec14_forgery_traced',
          mood: -0.08,
          knowledge: [
            'the border police kept the passport with the smudged surname',
            0.85,
            'fence',
          ],
        },
      },
      {
        id: 'knife-put-away',
        w: 0.25,
        text: '{client}把定金推到{subject}面前，{subject}没有接那叠钱，只把空白证件推回去，说这双手今天不想再刻一个别人的名字，一克朗纸钱也不用留。{client}把钞票一张张收回钱包，临走时把门带得很轻。{fence}在楼下问成了没有，{subject}说没有，今晚想睡个整觉。',
        significance: 0.6,
        fx: {
          relation: ['client', 'rival', -0.1, 0],
          flag: 'spec14_forgery_refused',
          mood: 0.06,
        },
      },
    ],
    task: {
      ...taskMeta('craft', ['survival', 'status'], ['cash', 'status'], 0.55, 0.55, ['craft']),
      capability: 'craft_affinity',
    },
  },

  // 9. The last job --------------------------------------------------------
  {
    id: 'r14-spec.thief-last-job',
    title: '最后一次踩点',
    domain: 'crime',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['crime', 'theft', 'night', 'risk', 'last_job'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'unemployment', minCount: 1, withinYears: 3 }],
    roles: {
      partner: ['worker', { minAge: 20, maxAge: 55 }],
      fence: ['worker', { minAge: 28, maxAge: 68 }],
    },
    cooldownYears: 10,
    outcomes: [
      {
        id: 'clean-through-the-back-window',
        w: 0.4,
        text: '{subject}从后窗翻进去，{partner}在巷口学猫叫。保险箱的锁比预想的旧，{subject}用了不到一刻钟，拿走现金和一只银烟盒，原样把抽屉推回去。{fence}在后屋点完十六克朗，抽了三成，说这活儿干净，可以再接一次。',
        significance: 0.78,
        fx: {
          cash: 16,
          skill: { craft: 0.02 },
          relation: ['partner', 'friend', 0.15, 0],
          flag: 'spec14_last_job_clean',
        },
      },
      {
        id: 'the-candlestick',
        w: 0.35,
        text: '第三道门后面睡着守夜人，{partner}失手把铜烛台砸在对方太阳穴上。{subject}拖着{partner}从后门跑出去时，听见屋里有人开始咳嗽，像呛了水。钱袋在巷口散了一半，{fence}只肯收整钞，最后给了八克朗。第二天，河堤上多了一件不属于任何人的外套。',
        significance: 0.88,
        followup: { sceneId: 'r14-spec.body-found', delayMonths: 2 },
        fx: {
          cash: 8,
          health: -0.04,
          relation: ['partner', 'colleague', 0.1, 0],
          flag: 'spec14_last_job_violence',
          mood: -0.1,
          knowledge: ['the watchman was still breathing when they left', 0.8, 'partner'],
        },
      },
      {
        id: 'a-smaller-job-instead',
        w: 0.25,
        text: '{subject}在屋顶等到巡警换第三次岗，最后没有进那扇门，只顺走了楼下空铺子里的一只铜天平。{partner}在巷口骂了一句，说这不算活儿。{fence}还是收了天平，给了两克朗，说至少今晚不用空手回去。',
        significance: 0.62,
        fx: {
          cash: 2,
          flag: 'spec14_last_job_small',
          relation: ['partner', 'rival', -0.08, 0],
          mood: -0.03,
        },
      },
    ],
    task: taskMeta('special', ['survival', 'status'], ['cash', 'safety'], 0.5, 0.65, ['craft']),
  },

  // 10. The body on the riverbank -----------------------------------------
  {
    id: 'r14-spec.body-found',
    title: '河堤上的外套',
    domain: 'crime',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['crime', 'body', 'false_accusation', 'theft', 'river'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'theft', minCount: 1, withinYears: 2 }],
    roles: {
      partner: returning('worker', { minAge: 20, maxAge: 65, sharedHistoryTag: 'theft' }),
      accuser: ['neighbor', { minAge: 25, maxAge: 70 }],
      official: ['official', { minAge: 28, maxAge: 68 }],
    },
    baseRate: 0,
    cooldownYears: 25,
    outcomes: [
      {
        id: 'the-pawn-ticket',
        w: 0.55,
        text: '{official}把{subject}带到河堤边，外套摊在草地上，口袋里有一张当票，日期正是最后一趟活儿的第二天。{accuser}站在警戒线外，说那晚看见两个人从后巷跑出来。{partner}没有出现。{subject}盯着那张当票，想起自己确实把它塞进过外套，又确实把外套留在屋里。',
        significance: 0.88,
        followup: { sceneId: 'r14-spec.murderer-trial', delayMonths: 4 },
        fx: {
          reputation: -0.2,
          condition: 'under_suspicion',
          relation: ['accuser', 'rival', -0.3, 0],
          flag: 'spec14_false_accusation',
          knowledge: ['the pawn ticket places the coat near the river that night', 0.9, 'official'],
        },
      },
      {
        id: 'the-coat-in-the-coal-sack',
        w: 0.45,
        text: '{subject}花四克朗雇了一条摆渡船，趁天亮前回到河堤，把外套从尸体身上扯下来，塞进装煤的麻袋。{partner}在桥下等着，问有没有人看见。{subject}说没有，可手一直抖，连火柴都划不着。第二天，{official}在河里打捞起一只空麻袋，袋口的绳结是{subject}惯用的双套结。',
        significance: 0.8,
        followup: { sceneId: 'r14-spec.murderer-trial', delayMonths: 10 },
        fx: {
          cash: -4,
          relation: ['partner', 'colleague', 0.1, 0],
          flag: ['spec14_false_accusation', 'spec14_hid_body_evidence'],
          mood: -0.15,
          knowledge: [
            'the coal sack was pulled from the river with the coat inside',
            0.85,
            'official',
          ],
        },
      },
    ],
  },

  // 11. The trial ----------------------------------------------------------
  {
    id: 'r14-spec.murderer-trial',
    title: '陪审团席上的空位',
    domain: 'crime',
    stage: 'adulthood',
    ages: [20, 68],
    tags: ['crime', 'trial', 'false_accusation', 'court', 'consequence'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'false_accusation', minCount: 1, withinYears: 3 }],
    roles: {
      accuser: returning('neighbor', {
        minAge: 25,
        maxAge: 75,
        sharedHistoryTag: 'false_accusation',
      }),
      counsel: ['official', { minAge: 30, maxAge: 70 }],
      judge: ['official', { minAge: 40, maxAge: 75 }],
    },
    baseRate: 0.005,
    cooldownYears: 30,
    outcomes: [
      {
        id: 'seven-years',
        w: 0.4,
        text: '{accuser}在证人席上把河堤那晚说成一场预谋，{counsel}翻遍案卷，只找到一张被雨水泡开的当票。{judge}念判决时，旁听席上有人在剥一颗糖，纸响得刺耳。{subject}被带走前回头看了一眼，{accuser}正把那颗糖放进嘴里，眼睛没有抬。',
        significance: 0.9,
        fx: {
          reputation: -0.3,
          role: 'convict',
          condition: 'prison',
          health: -0.06,
          mood: -0.15,
          flag: 'spec14_convicted',
          knowledge: ['the court accepted the pawn ticket as proof of presence', 0.9, 'judge'],
        },
      },
      {
        id: 'the-date-that-did-not-fit',
        w: 0.35,
        text: '{counsel}让法警把外套口袋翻出来，当票上的日期比死者失踪晚了三天。{accuser}改口说记错了，{judge}敲了两次槌。{subject}走出法院时，太阳照在台阶上，{accuser}站在街对面等车，两个人隔着一条马路，谁也没有动。',
        significance: 0.82,
        fx: {
          reputation: 0.08,
          relation: ['accuser', 'rival', -0.25, 0],
          flag: 'spec14_acquitted',
          mood: 0.1,
          knowledge: ['the pawn ticket was dated after the disappearance', 0.9, 'counsel'],
        },
      },
      {
        id: 'the-empty-envelope',
        w: 0.25,
        text: '{counsel}念到第三页，发现证物清单上有两个编号，其中一个对应的是一只空信封。{judge}让法警去取，书记员跑了三趟，回来时脸色发白。{accuser}在证人席上突然咳嗽起来，审判延期，六克朗诉讼费照收；报纸第二天只登了一行小字：证据不足。',
        significance: 0.78,
        fx: {
          cash: -6,
          relation: ['counsel', 'colleague', 0.12, 0],
          flag: 'spec14_trial_collapsed',
          knowledge: ['one evidence number referred to an empty envelope', 0.85, 'counsel'],
          mood: 0.04,
        },
      },
    ],
  },

  // 12. The con artist -----------------------------------------------------
  {
    id: 'r14-spec.conartist-mark',
    title: '借来的乡绅口音',
    domain: 'crime',
    stage: 'adulthood',
    ages: [22, 62],
    tags: ['crime', 'fraud', 'betrayal', 'mark', 'con'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'history', tag: 'bankruptcy', minCount: 1, withinYears: 10 },
      { kind: 'capability', capability: 'social_insight' },
    ],
    roles: {
      mark: ['neighbor', { minAge: 30, maxAge: 75 }],
      accomplice: ['worker', { minAge: 20, maxAge: 55 }],
    },
    baseRate: 0.02,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'the-mine-that-was-not',
        w: 0.4,
        text: '{subject}穿着借来的礼服，在火车站替{mark}提箱子，口音一会儿是维也纳，一会儿是布达佩斯。三天后，{mark}把存折交给{subject}，说等矿山的手续办完就一起去看地。{accomplice}在旅馆后门接过十八克朗，问要不要留一点给那位老先生做路费；{subject}说不用，{mark}还有退休金。',
        significance: 0.84,
        followup: {
          sceneId: 'r14-spec.capability-social-insight',
          subjectRole: 'mark',
          delayMonths: 18,
        },
        fx: {
          cash: 18,
          reputation: -0.05,
          relation: ['mark', 'rival', -0.3, 0],
          flag: 'spec14_con_success',
          knowledge: ['the mark has no family who will ask questions', 0.8, 'accomplice'],
        },
      },
      {
        id: 'the-name-of-the-river',
        w: 0.35,
        text: '{mark}在签字前忽然问起矿山那条河的名字，{subject}答得太快，把两条河说混了。{mark}把存折收回口袋，站起来时椅子腿在地板上刮出一声长响。{accomplice}已经在后门消失。{subject}走出旅馆，发现外面下着雨，礼服是借的，不能淋。',
        significance: 0.78,
        followup: {
          sceneId: 'r14-spec.capability-social-insight',
          subjectRole: 'mark',
          delayMonths: 9,
        },
        fx: {
          reputation: -0.12,
          relation: ['mark', 'rival', -0.2, 0],
          flag: 'spec14_con_exposed',
          mood: -0.1,
          knowledge: ['the mark once worked on a river barge and knows the names', 0.9, 'mark'],
        },
      },
      {
        id: 'the-story-put-down',
        w: 0.25,
        text: '{subject}把存折推回去，说矿山是假的，自己也不是什么伯爵。{mark}愣了很久，伸手把桌上的糖块拿了一颗，说早就觉得那口音不对，只是很久没人陪自己说话。{subject}把两克朗酒钱留在桌上，走出旅馆时，{accomplice}在街对面骂了一句，转身走了。',
        significance: 0.64,
        fx: {
          cash: -2,
          flag: 'spec14_con_abandoned',
          relation: ['mark', 'acquaintance', 0.05, 0],
          mood: 0.06,
        },
      },
    ],
  },

  // 13. The gambler's debt -------------------------------------------------
  {
    id: 'r14-spec.gambler-debt',
    title: '牌桌下的借条',
    domain: 'special',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['gambling', 'debt', 'loan', 'risk', 'cash'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'cash', max: 8 }],
    roles: {
      lender: ['worker', { minAge: 30, maxAge: 70 }],
      dealer: ['worker', { minAge: 20, maxAge: 60 }],
    },
    cooldownYears: 6,
    outcomes: [
      {
        id: 'signed-for-ten',
        w: 0.4,
        text: '{subject}在牌桌上输掉最后一张钞票，{lender}把十克朗借条推过来，说利息按周算，签字就行。{dealer}洗牌时看了{subject}一眼，什么也没说。{subject}写下名字，忽然想起母亲说过，赌桌上借来的钱，最后都要用别的东西还。',
        significance: 0.78,
        followup: { sceneId: 'r14-spec.fortune-prediction', delayMonths: 2 },
        fx: {
          cash: 10,
          condition: 'debt',
          relation: ['lender', 'rival', -0.15, 0],
          flag: 'spec14_gambling_debt',
          mood: -0.08,
        },
      },
      {
        id: 'the-two-rings',
        w: 0.35,
        text: '{subject}把妻子的两枚戒指押在桌角，{dealer}用放大镜看了看成色，推到{subject}手边。第四把牌翻出来时，戒指已经不在{subject}面前了。两枚戒指在第四把牌后归了庄家，值八克朗；{lender}递来第二张借条，说这回不用签字，按个手印就行。印泥是红的，像刚从谁的指头上蘸过。',
        significance: 0.74,
        followup: { sceneId: 'r14-spec.fortune-prediction', delayMonths: 3 },
        fx: {
          cash: -8,
          condition: 'debt',
          relation: ['lender', 'rival', -0.2, 0],
          flag: ['spec14_gambling_debt', 'spec14_rings_lost'],
          mood: -0.12,
        },
      },
      {
        id: 'next-months-wages',
        w: 0.25,
        text: '{subject}没有现钱，{lender}让在借条上多写一行：下个月的工钱先扣一半。{dealer}把牌收进盒子，说这桌今晚不开了。{subject}走出后屋，巷子里的风把借条吹得啪啪响；{subjectPronoun}把纸折小，塞进鞋垫下面，走路时一直觉得脚底硌着一粒石子。',
        significance: 0.7,
        fx: {
          condition: 'debt',
          relation: ['lender', 'rival', -0.12, 0],
          flag: 'spec14_wages_pledged',
          mood: -0.06,
          knowledge: ['half of next months wages are already pledged', 0.9, 'lender'],
        },
      },
    ],
    task: taskMeta('special', ['survival', 'status'], ['cash', 'status'], 0.45, 0.7, ['numeracy']),
  },

  // 14. The arsonist -------------------------------------------------------
  {
    id: 'r14-spec.arsonist-motive',
    title: '第三桶煤油',
    domain: 'crime',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['crime', 'arson', 'fire', 'revenge', 'eviction'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'eviction', minCount: 1, withinYears: 6 }],
    roles: {
      neighbor: ['neighbor', { minAge: 20, maxAge: 70 }],
      owner: ['official', { minAge: 35, maxAge: 75 }],
    },
    baseRate: 0.01,
    cooldownYears: 25,
    outcomes: [
      {
        id: 'the-warehouse',
        w: 0.4,
        text: '{subject}把三桶煤油泼在仓库的木托盘上，火柴划到第三根才着。火从窗口卷出来时，{owner}还站在街对面数保险单，脸上被热浪照得发红。{neighbor}提着水桶跑来，看见{subject}站在人群最后，手上没有灰，鞋底却沾着煤油。',
        significance: 0.86,
        followup: { sceneId: 'r14-spec.haunted-room', delayMonths: 18 },
        fx: {
          reputation: -0.1,
          mood: 0.05,
          relation: ['owner', 'rival', -0.25, 0],
          flag: 'spec14_arson_committed',
          knowledge: ['the warehouse insurance was renewed the week before the fire', 0.8, 'owner'],
        },
      },
      {
        id: 'the-washing-line',
        w: 0.35,
        text: '火比预想快，先烧穿仓库的顶棚，再顺着晾衣绳跳到隔壁。{neighbor}抱着孩子从楼梯上下来，头发焦了一绺；{subject}伸手去接，被热灰烫得缩回来。{owner}在街上喊保险号码，没有人听。天亮时，整排房子只剩下一堵墙，十克朗赔偿单贴在墙上，旁边还挂着{subject}家的门牌。',
        significance: 0.88,
        followup: { sceneId: 'r14-spec.haunted-room', delayMonths: 6 },
        fx: {
          cash: -10,
          health: -0.05,
          condition: 'smoke_inhalation',
          relation: ['neighbor', 'rival', -0.2, 0],
          flag: 'spec14_arson_spread',
          mood: -0.1,
        },
      },
      {
        id: 'a-shed-and-a-cat',
        w: 0.25,
        text: '{subject}蹲到后半夜，最后只把煤油泼在院子角落的破棚上。火苗窜起来时，一只猫从棚顶跳下去，碰翻了{neighbor}的洗衣盆。{neighbor}提着灯出来，看见{subject}手里还攥着火柴和两克朗一桶的煤油，什么也没问，只把盆扶起来，说棚子早就该拆了。',
        significance: 0.62,
        fx: {
          cash: -2,
          relation: ['neighbor', 'friend', 0.08, 0],
          flag: 'spec14_arson_minor',
          mood: -0.04,
        },
      },
    ],
  },

  // 15. The doctor's mistake ----------------------------------------------
  {
    id: 'r14-spec.doctor-fatal-mistake',
    title: '病历上被划掉的一行',
    domain: 'health',
    stage: 'adulthood',
    ages: [28, 59],
    tags: ['medicine', 'error', 'death', 'hospital', 'guilt'],
    contexts: ['vienna', 'urban', 'medical', 'postwar', 'reform', 'crisis'],
    conditions: [
      { kind: 'education', in: ['higher'] },
      { kind: 'employment', employed: true },
    ],
    roles: {
      nurse: ['worker', { minAge: 20, maxAge: 60 }],
      patient: ['neighbor', { minAge: 16, maxAge: 80 }],
      chief: ['official', { minAge: 40, maxAge: 75 }],
    },
    baseRate: 0.02,
    cooldownYears: 25,
    outcomes: [
      {
        id: 'the-blue-lips',
        w: 0.4,
        text: '病历上青霉素那一行被划掉了，可夜班交接时没有人看见。{subject}把针头推进{patient}的胳膊，十分钟后对方开始喘，嘴唇变成灰蓝色。{nurse}推来急救车，{chief}在走廊里喊肾上腺素。抢救到天亮，{patient}没有再醒；{subject}站在洗手池前，肥皂打了三遍，指甲缝里还是白的。',
        significance: 0.9,
        fx: {
          health: -0.04,
          condition: 'guilt',
          mood: -0.25,
          flag: 'spec14_fatal_error',
          knowledge: [
            'the penicillin order had been struck out at the previous shift',
            0.9,
            'nurse',
          ],
          raw: [
            {
              type: 'death',
              personId: '$patient',
              cause:
                'anaphylactic shock after a discontinued penicillin order was missed at handover',
              reason: 'a struck-out allergy order was not read at the night handover',
            },
          ],
        },
      },
      {
        id: 'the-line-recopied',
        w: 0.3,
        text: '{subject}把划掉的那一行重新抄在另一张病历上，日期往前挪了一天。{nurse}在门口看见，什么也没说，只把急救记录本合上。{chief}问起时，{subject}说病人是心衰，年纪也到了。葬礼那天，{subject}站在人群最后，手里攥着一支没有墨水的钢笔。',
        significance: 0.86,
        fx: {
          reputation: 0.04,
          relation: ['nurse', 'rival', -0.15, 0],
          flag: 'spec14_error_hidden',
          mood: -0.2,
          knowledge: ['the nurse saw the chart being recopied', 0.85, 'nurse'],
        },
      },
      {
        id: 'the-morning-meeting',
        w: 0.3,
        text: '{subject}在晨会上把病历摊开，说那一针是自己的错。{chief}让所有人出去，关上门，问{subject}知不知道这样会毁掉科室。{subject}说知道，但{patient}的家属还在等一个说法。下午，{subject}被停职，工牌收进信封；走廊里的家属没有骂，只问了一句，为什么不早说。',
        significance: 0.88,
        fx: {
          unemployment: 'suspended after reporting a fatal medication error',
          reputation: -0.12,
          relation: ['chief', 'rival', -0.15, 0],
          flag: 'spec14_error_reported',
          mood: -0.15,
          health: -0.03,
        },
      },
    ],
  },

  // 16. The priest's confession -------------------------------------------
  {
    id: 'r14-spec.priest-confession',
    title: '忏悔室里的名字',
    domain: 'special',
    kind: 'task',
    stage: 'adulthood',
    ages: [25, 68],
    tags: ['faith', 'confession', 'priest', 'secret', 'crisis'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      penitent: ['worker', { minAge: 20, maxAge: 70 }],
      bishop: ['official', { minAge: 45, maxAge: 80 }],
      sexton: ['worker', { minAge: 30, maxAge: 75 }],
    },
    cooldownYears: 10,
    outcomes: [
      {
        id: 'the-seal-kept',
        w: 0.4,
        text: '{penitent}在格栅后面说出一个名字，又说出一个日期。{subject}的手指停在念珠上，直到对方说完，才问是否愿意自己去警局。{penitent}说家里还有两个孩子。{subject}没有追问，只在告解结束后把帘子拉好；{sexton}在门外扫地，扫帚一下一下，像在替谁数着日子。',
        significance: 0.8,
        fx: {
          relation: ['penitent', 'acquaintance', 0.1, 0],
          flag: 'spec14_confession_kept',
          mood: -0.1,
          knowledge: [
            'the penitent named the man who was killed and the night it happened',
            0.9,
            'penitent',
          ],
        },
      },
      {
        id: 'the-name-on-paper',
        w: 0.3,
        text: '{subject}在警局把名字写在纸上，写完才发现手在抖。{penitent}当天下午被带走，家里的窗户一直黑着。{bishop}把{subject}叫去，说告解的秘密不是拿来换良心的。{subject}回到教堂，跪了很久，听见{sexton}在祭坛后面钉一块松动的木板。',
        significance: 0.88,
        fx: {
          reputation: -0.2,
          relation: [
            ['penitent', 'rival', -0.4, 0],
            ['bishop', 'rival', -0.2, 0],
          ],
          flag: 'spec14_confession_broken',
          mood: -0.15,
          knowledge: ['the police acted on a confession that should have been sealed', 0.9],
        },
      },
      {
        id: 'the-vestments-folded',
        w: 0.3,
        text: '{subject}在弥撒进行到一半时停下来，看着台下那些等面包和赦免的脸，忽然说不下去了。{bishop}从侧门走进来，接过经书，替{subject}念完最后一段。当天夜里，{subject}把法衣叠好放在圣器室的桌上，钥匙压在下面；{sexton}第二天早上才发现。',
        significance: 0.84,
        fx: {
          loseRole: 'priest',
          reputation: -0.1,
          mood: -0.2,
          flag: 'spec14_faith_crisis',
          knowledge: [
            'the parish will be served by a replacement from the cathedral',
            0.8,
            'bishop',
          ],
        },
      },
    ],
    task: taskMeta('special', ['belonging', 'knowledge'], ['belonging', 'safety'], 0.5, 0.4, [
      'social',
    ]),
  },

  // 17. The courier --------------------------------------------------------
  {
    id: 'r14-spec.spy-courier',
    title: '雨伞柄里的胶片',
    domain: 'special',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 58],
    tags: ['espionage', 'courier', 'secrecy', 'risk', 'handler'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'war'],
    conditions: [
      { kind: 'history', tag: 'secrecy', minCount: 1, withinYears: 8 },
      { kind: 'capability', capability: 'social_insight' },
    ],
    roles: {
      handler: ['official', { minAge: 35, maxAge: 70 }],
      contact: ['worker', { minAge: 20, maxAge: 60 }],
    },
    cooldownYears: 8,
    outcomes: [
      {
        id: 'the-other-umbrella',
        w: 0.4,
        text: '{subject}把胶片卷进雨伞柄，在咖啡馆坐了两个钟头，等一个戴灰帽的人把伞拿走，留下另一把。{handler}在街对面看着，等灰帽走远才进来，说这次干净。十二克朗压在糖罐下面。{contact}后来在电车上遇见{subject}，两人都没有点头。',
        significance: 0.8,
        fx: {
          cash: 12,
          skill: { social: 0.03 },
          relation: ['handler', 'colleague', 0.15, 0],
          flag: 'spec14_delivery_done',
          knowledge: ['the grey hat leaves the payment under the sugar bowl', 0.85, 'handler'],
        },
      },
      {
        id: 'the-closed-eye',
        w: 0.35,
        text: '{subject}在车站发现有人跟了三条街，雨伞柄里的胶片还没有送出去。{handler}在约定地点没有出现，只让报童送来一张纸条，上面画着一只闭眼的鸟。当晚{subject}的公寓被翻过，床垫划开，四克朗应急钱不见了，棉花堆在门口。{contact}的名字从通讯录上撕掉了半页。',
        significance: 0.84,
        followup: { sceneId: 'r14-spec.disappearance', subjectRole: 'handler', delayMonths: 1 },
        fx: {
          cash: -4,
          health: -0.04,
          condition: 'surveillance',
          relation: ['handler', 'rival', -0.1, 0],
          flag: 'spec14_courier_blown',
          knowledge: ['the handler uses a drawing of a closed eye to mean abort', 0.8],
        },
      },
      {
        id: 'umbrella-handed-back',
        w: 0.25,
        text: '{subject}把雨伞还给{handler}，说这活儿干不了。{handler}没有生气，只问是不是钱不够。{subject}说钱够，是夜里睡不着。{handler}把伞收起来，伞尖在石板路上点了一下，说那就当今天没见。{subject}把两克朗车钱留在桌上，走出咖啡馆，觉得街上每个人都在看自己。',
        significance: 0.62,
        fx: {
          cash: -2,
          relation: ['handler', 'rival', -0.15, 0],
          flag: 'spec14_refused_courier',
          mood: 0.04,
        },
      },
    ],
    task: {
      ...taskMeta('special', ['cause', 'survival'], ['safety', 'cash'], 0.5, 0.75, ['social']),
      capability: 'social_insight',
    },
  },

  // 18. The fortune teller -------------------------------------------------
  {
    id: 'r14-spec.fortune-prediction',
    title: '咖啡渣里的黑鸟',
    domain: 'special',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['fortune', 'prediction', 'superstition', 'debt', 'fortune_told'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'gambling', minCount: 1, withinYears: 4 }],
    roles: {
      fortune: ['neighbor', { minAge: 35, maxAge: 80 }],
      friend: ['neighbor', { minAge: 18, maxAge: 70 }],
    },
    baseRate: 0,
    cooldownYears: 12,
    outcomes: [
      {
        id: 'the-bird-in-the-clock-tower',
        w: 0.4,
        text: '{fortune}把{subject}的杯子扣在碟子上，转了三圈，指着杯底一圈黑渣说，看见一只鸟飞进钟楼。{subject}问是谁的钟楼，{fortune}不答，只把铜币推回来，说这卦不收钱。出门时，街对面的钟正好敲了四下，{subject}忽然想起借条上的还款日也是星期四。',
        significance: 0.78,
        followup: { sceneId: 'r14-spec.death-notice-alive', delayMonths: 6 },
        fx: {
          mood: -0.15,
          flag: 'spec14_death_predicted',
          knowledge: ['the fortune teller refuses payment for a death prediction', 0.8, 'fortune'],
        },
      },
      {
        id: 'a-water-road',
        w: 0.3,
        text: '{fortune}从杯底刮出一小撮咖啡渣，摊在掌心，说看见一条水路和一只旧箱子。{subject}笑了笑，说连房租都欠着，哪来的船票。{fortune}把一克朗铜币收下，说水不必是真的，想走的心是真的就行。回家路上，{subject}第一次绕到车站去看时刻表。',
        significance: 0.64,
        fx: {
          cash: -1,
          mood: 0.1,
          flag: 'spec14_journey_predicted',
          knowledge: ['the fortune teller saw a water journey and an old trunk', 0.7, 'fortune'],
        },
      },
      {
        id: 'the-grey-coat',
        w: 0.3,
        text: '{fortune}没有看杯子，只看{subject}的手，说最近有一个穿灰外套的人要来收东西，让{subject}把要紧的物件先藏起来。{friend}在门口听见，问要不要陪着回去。{subject}把一克朗卦钱放在碟子边，说不用，却在路上把口袋里那只银烟盒换到了内衬的暗袋。',
        significance: 0.68,
        fx: {
          cash: -1,
          relation: ['friend', 'friend', 0.08, 0],
          flag: 'spec14_creditor_predicted',
          knowledge: ['a grey-coated creditor is expected before the months end', 0.75, 'fortune'],
        },
      },
    ],
  },

  // 19. The strange inheritance -------------------------------------------
  {
    id: 'r14-spec.strange-inheritance',
    title: '陌生人的遗产',
    domain: 'civic',
    stage: 'adulthood',
    ages: [24, 58],
    tags: ['inheritance', 'estate', 'stranger', 'law', 'money'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      notary: ['official', { minAge: 35, maxAge: 75 }],
      claimant: ['neighbor', { minAge: 25, maxAge: 75 }],
    },
    baseRate: 0.02,
    cooldownYears: 40,
    outcomes: [
      {
        id: 'three-keys-and-one-rusty',
        w: 0.4,
        text: '公证人{notary}把遗嘱念到第三页，{subject}才听明白，那个从未见过的远房表亲把一间面粉店留给了自己。{claimant}坐在对面，手里攥着一份更早的遗嘱，说店里还有自己的一半。{subject}签了字，接过二十二克朗的存折；钥匙串上挂着三把钥匙，其中一把已经锈死。',
        significance: 0.84,
        fx: {
          cash: 22,
          relation: ['claimant', 'rival', -0.15, 0],
          flag: 'spec14_strange_inheritance',
          knowledge: ['the flour shop has a second will and a disputed back room', 0.85, 'notary'],
        },
      },
      {
        id: 'the-shop-given-away',
        w: 0.3,
        text: '{subject}看完遗嘱，问{notary}能不能把店捐给面粉工人工会。{notary}的钢笔停在半空，说遗嘱上没有这一条。{claimant}忽然笑了，说这大概是这间店里最像人话的一句。{subject}付了两克朗公证费，在转让书上签了字，出门时觉得口袋比来时轻。',
        significance: 0.7,
        fx: {
          cash: -2,
          reputation: 0.1,
          relation: ['claimant', 'acquaintance', 0.08, 0],
          flag: 'spec14_inheritance_refused',
          mood: 0.06,
        },
      },
      {
        id: 'the-photograph-in-the-ledger',
        w: 0.3,
        text: '{notary}翻出一张旧照片，照片上站在面粉店门口的女人，和{subject}母亲年轻时一模一样。{claimant}把照片接过去，看了很久，说难怪遗嘱上写的是这个姓。{subject}没有争店，只拿走十二克朗折价、照片和一只量面粉的铜升；回家量了量，升底刻着外祖母的名字。',
        significance: 0.8,
        fx: {
          cash: 12,
          relation: ['claimant', 'acquaintance', 0.05, 0],
          flag: 'spec14_inheritance_kin',
          knowledge: ['the dead stranger was a cousin of the subjects mother', 0.9, 'notary'],
          mood: -0.08,
        },
      },
    ],
  },

  // 20. The bureaucracy mistake -------------------------------------------
  {
    id: 'r14-spec.bureaucracy-mistake',
    title: '死亡登记处的活人',
    domain: 'civic',
    stage: 'adulthood',
    ages: [20, 78],
    tags: ['bureaucracy', 'mistake', 'identity', 'state', 'bureaucratic_error'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      clerk: ['official', { minAge: 25, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 20, maxAge: 75 }],
    },
    baseRate: 0.03,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'dead-for-three-years',
        w: 0.4,
        text: '{clerk}把死亡登记簿翻到新的一页，指着上面的名字说系统里{subject}已经死了三年。{subject}把身份证、工票和房租收据排在柜台上，{clerk}一张张看完，说这些都不能证明人还活着。柜台收走六克朗证明费；傍晚{subject}回到公寓，{neighbor}正在门口挂黑纱，说是街道让挂的。',
        significance: 0.88,
        fx: {
          cash: -6,
          condition: 'civil_death',
          reputation: -0.1,
          flag: 'spec14_declared_dead',
          knowledge: [
            'the registry has a death certificate with the subjects name and birth date',
            0.9,
            'clerk',
          ],
        },
      },
      {
        id: 'the-criminal-with-the-same-birthday',
        w: 0.35,
        text: '{clerk}把另一个人的犯罪记录归到{subject}名下，原因是两人的出生日期只差一天。{subject}去解释，窗口让填一张更正表；表交上去，又被退回，说缺少原案卷宗。{neighbor}在楼道里听见风声，第二天把晾在两家之间的床单收了回去。',
        significance: 0.82,
        fx: {
          reputation: -0.15,
          relation: ['clerk', 'rival', -0.1, 0],
          flag: 'spec14_name_mixed',
          mood: -0.1,
          knowledge: [
            'a criminal record with the same birth date is filed under the subjects name',
            0.9,
            'clerk',
          ],
        },
      },
      {
        id: 'blue-pen-through-the-card',
        w: 0.25,
        text: '{clerk}在档案柜最底层找到那张写错的卡片，用蓝笔划掉，重新抄了一遍。{subject}在窗口等了四个钟头，交了两克朗抄录费，拿到一张盖了三个章的证明。{clerk}说以后每年都要来核一次，不然系统还会把人写死。{subject}把证明折好，出门时发现天已经黑了，路灯刚亮。',
        significance: 0.66,
        fx: {
          cash: -2,
          relation: ['clerk', 'colleague', 0.08, 0],
          flag: 'spec14_record_corrected',
          mood: 0.04,
        },
      },
    ],
  },

  // 21. The permit office --------------------------------------------------
  {
    id: 'r14-spec.permit-appeal',
    title: '三号窗口的第二十三次叫号',
    domain: 'civic',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 75],
    tags: ['bureaucracy', 'permit', 'appeal', 'office', 'bureaucratic_error'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'bureaucratic_error', minCount: 1, withinYears: 10 }],
    roles: {
      clerk: returning('official', {
        minAge: 25,
        maxAge: 70,
        sharedHistoryTag: 'bureaucratic_error',
      }),
      supervisor: ['official', { minAge: 40, maxAge: 75 }],
    },
    cooldownYears: 10,
    outcomes: [
      {
        id: 'the-seventh-stamp',
        w: 0.35,
        text: '{clerk}从铁柜里抽出{subject}的卷宗，封皮上已经盖了七个日期不同的章。{supervisor}在最后一页签了名，说下不为例。{subject}交了三克朗印花税，拿到许可证时纸还是热的，窗外的队伍已经排到楼梯口。{clerk}低声说，别把这张纸折，折了就不算数。',
        significance: 0.78,
        fx: {
          cash: -3,
          relation: ['clerk', 'acquaintance', 0.05, 0],
          flag: 'spec14_permit_granted',
          mood: 0.06,
        },
      },
      {
        id: 'the-unlabelled-box',
        w: 0.4,
        text: '{clerk}当着{subject}的面把卷宗放进待归档的推车，第二天推车空了，柜子里多了一只没有标签的纸箱。{supervisor}说没有编号就查不到，让{subject}回去等通知。{subject}赔进去两克朗车费，在窗口站到下班，听见铁帘子一节一节放下来，像有人在数数。',
        significance: 0.74,
        fx: {
          cash: -2,
          condition: 'bureaucratic_limbo',
          mood: -0.14,
          flag: 'spec14_permit_lost',
          knowledge: [
            'the file was moved to an unlabelled box after the clerk signed for it',
            0.8,
            'clerk',
          ],
        },
      },
      {
        id: 'the-twelve-kronen-rush',
        w: 0.25,
        text: '{supervisor}在走廊尽头低声说，三号窗口的事可以办，但要另交十二克朗的“加急费”。{subject}把钱数过去，收据上写的是“档案复印”。三天后许可证下来了，纸张和别人的一样，只是角上多了一枚小小的订书钉。',
        significance: 0.76,
        fx: {
          cash: -12,
          relation: ['supervisor', 'rival', -0.1, 0],
          flag: 'spec14_permit_bought',
          mood: -0.08,
          knowledge: ['the supervisor sells priority at the third window', 0.85, 'supervisor'],
        },
      },
    ],
    task: taskMeta('special', ['autonomy', 'survival'], ['autonomy', 'safety'], 0.45, 0.35, [
      'literacy',
      'numeracy',
    ]),
  },

  // 22. The neighbourhood curse -------------------------------------------
  {
    id: 'r14-spec.neighborhood-curse',
    title: '门楣上的红绳',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 78],
    tags: ['neighborhood', 'curse', 'rumor', 'fear', 'community'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      neighbor: ['neighbor', { minAge: 20, maxAge: 75 }],
      widow: ['neighbor', { minAge: 40, maxAge: 85 }],
    },
    baseRate: 0.02,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'the-red-thread',
        w: 0.35,
        text: '红绳是{neighbor}先系在门楣上的，说是从教堂墓地捡回来的。第三天，巷口的面包店炉子灭了，第五天，{widow}的猫死在窗台下。大家开始绕开{subject}家的门走，买菜时把零钱放在门槛上，不递到手里。{subject}没有解那根绳，只在夜里听见风把绳子吹得一下一下敲墙。',
        significance: 0.74,
        fx: {
          reputation: -0.08,
          relation: ['neighbor', 'rival', -0.15, 0],
          flag: 'spec14_curse_marked',
          mood: -0.12,
        },
      },
      {
        id: 'copper-wire-and-a-date',
        w: 0.35,
        text: '{subject}搬来梯子，把红绳解下来，发现绳结里裹着一小段铜丝和一张写着日期的纸。{neighbor}说是求平安的旧法子，铜丝导电，纸是愿文。{subject}把纸展开给大家看，{widow}第一个笑出声，说自家猫是吃了药死的老鼠。那天下午，巷子里有人重新开了炉子。',
        significance: 0.68,
        fx: {
          reputation: 0.08,
          relation: ['neighbor', 'friend', 0.1, 0],
          flag: 'spec14_curse_broken',
          knowledge: [
            'the red thread contains copper wire and a written date, not a spell',
            0.85,
            'neighbor',
          ],
        },
      },
      {
        id: 'the-iron-box',
        w: 0.3,
        text: '{subject}顺着红绳找到{neighbor}家的后院，土里埋着一只铁盒，盒里是{subject}家丢了两年的门牌和一缕头发。{neighbor}站在门口，说红绳不是咒人，是提醒自己别忘了那笔旧账。{widow}在墙外听见，转身就走。{subject}把铁盒盖上，手心里全是土。',
        significance: 0.76,
        fx: {
          relation: [
            ['widow', 'rival', -0.2, 0],
            ['neighbor', 'rival', -0.2, 0],
          ],
          flag: 'spec14_curse_revenge',
          mood: -0.06,
          knowledge: ['the neighbour kept the missing house plaque buried in the yard', 0.9],
        },
      },
    ],
  },

  // 23. The haunted room ---------------------------------------------------
  {
    id: 'r14-spec.haunted-room',
    title: '顶层那间锁着的房',
    domain: 'special',
    stage: 'adulthood',
    ages: [18, 78],
    tags: ['haunted', 'room', 'ambiguity', 'fear', 'arson'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'arson', minCount: 1, withinYears: 15 }],
    roles: {
      neighbor: returning('neighbor', { minAge: 20, maxAge: 80, sharedHistoryTag: 'arson' }),
      landlord: ['official', { minAge: 35, maxAge: 75 }],
    },
    baseRate: 0.005,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'scratching-in-the-wall',
        w: 0.4,
        text: '顶层的房间锁了半年，夜里总有指甲刮木板的声音。{subject}搬进去第一晚，声音从墙里开始，沿着水管走到床脚。{landlord}说那是老房子的铁管，冬天会响；{neighbor}却站在门口不肯进来，说火那年，这间屋里确实住过人。{subject}点上灯，声音停了。',
        significance: 0.76,
        fx: {
          mood: -0.18,
          health: -0.03,
          condition: 'sleeplessness',
          flag: 'spec14_haunted_room',
          knowledge: ['the scratching follows the water pipe, not the room', 0.7, 'landlord'],
        },
      },
      {
        id: 'the-unregistered-tenant',
        w: 0.3,
        text: '{subject}撬开锁，发现屋里住着一个没有登记的孩子，用旧报纸铺床，靠楼下的水管取水。孩子说声音是自己弄的，怕被赶走。{neighbor}送来半条面包，站在门口没有进去。{landlord}后来补了一张租约，把顶层写成储藏室；{subject}花两克朗买了木板，把漏风的窗钉上。',
        significance: 0.72,
        fx: {
          cash: -2,
          relation: ['neighbor', 'friend', 0.1, 0],
          flag: 'spec14_squatter_found',
          mood: 0.05,
          knowledge: ['the scratching was made by a child hiding in the attic', 0.9],
        },
      },
      {
        id: 'the-bell-in-the-flue',
        w: 0.3,
        text: '{subject}请人把墙皮铲到砖，在烟道里掏出一窝死老鼠和一只生锈的铃铛。声音从此没有了，可每到夜里，{subject}还是会醒一次，等着那阵刮擦。{landlord}把房间重新租出去，给了三克朗清理费；新租客来看房时，{subject}没有提铃铛的事。',
        significance: 0.68,
        fx: {
          cash: 3,
          health: -0.02,
          flag: 'spec14_room_cleared',
          mood: 0.05,
          knowledge: ['a rusted bell and dead rats were lodged in the chimney flue', 0.85],
        },
      },
    ],
  },

  // 24. The circus ---------------------------------------------------------
  {
    id: 'r14-spec.circus-apprentice',
    title: '空中飞人的保险绳',
    domain: 'special',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 38],
    tags: ['circus', 'performance', 'apprentice', 'risk', 'body'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'craft_affinity' }],
    roles: {
      master: ['worker', { minAge: 28, maxAge: 60 }],
      partner: ['worker', { minAge: 18, maxAge: 38 }],
      owner: ['official', { minAge: 35, maxAge: 70 }],
    },
    cooldownYears: 8,
    outcomes: [
      {
        id: 'learn-to-fall-first',
        w: 0.4,
        text: '{master}把保险绳系在{subject}腰上，说先学会掉下来，再学飞。{subject}在秋千上荡到第三下，胃里翻上来，还是把腿勾住了横杆。{partner}在下面拍手，{owner}掀开帐篷帘子看了一眼，说下个月可以进节目单，先给五克朗排练费。',
        significance: 0.8,
        fx: {
          cash: 5,
          skill: { craft: 0.06 },
          role: 'circus_performer',
          relation: ['master', 'colleague', 0.15, 0],
          flag: 'spec14_circus_act',
        },
      },
      {
        id: 'the-waxed-knot',
        w: 0.35,
        text: '{subject}在第三次排练时松手早了半拍，背先落在网绳上，再滑到地面。{master}跑过来时，{subject}的右手腕已经肿成一只手套。{partner}把保险绳解开，发现绳结是新的，有人在上面打过蜡。{owner}站在帐篷门口，说四克朗医药费从下个月的工钱里扣。',
        significance: 0.82,
        followup: { sceneId: 'r14-spec.mountain-accident', delayMonths: 6 },
        fx: {
          cash: -4,
          health: -0.1,
          condition: 'broken_wrist',
          relation: ['master', 'rival', -0.08, 0],
          flag: 'spec14_circus_injury',
          knowledge: ['the safety knot had been waxed before the rehearsal', 0.8, 'partner'],
        },
      },
      {
        id: 'the-yawn-in-the-front-row',
        w: 0.25,
        text: '{subject}在看了一场夜场后把保险绳挂回钉子上，说不想再上去了。{master}没有挽留，只把一双旧鞋递给{subject}，说走夜路用得着。{partner}追到车站，问是不是因为昨天那一跤；{subject}把两克朗车钱塞进售票口，说不是，是看见观众席第一排有人在打哈欠。',
        significance: 0.6,
        fx: {
          cash: -2,
          relation: [
            ['master', 'rival', -0.08, 0],
            ['partner', 'colleague', 0.05, 0],
          ],
          flag: 'spec14_circus_quit',
          mood: -0.04,
        },
      },
    ],
    task: {
      ...taskMeta('special', ['status', 'belonging'], ['status', 'belonging'], 0.5, 0.65, [
        'craft',
      ]),
      capability: 'craft_affinity',
    },
  },

  // 25. The duel -----------------------------------------------------------
  {
    id: 'r14-spec.duel',
    title: '黎明前的两把手枪',
    domain: 'special',
    stage: 'adulthood',
    ages: [20, 58],
    tags: ['duel', 'honor', 'violence', 'patronage', 'risk'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'patronage', minCount: 1, withinYears: 5 }],
    roles: {
      patron: returning('official', { minAge: 35, maxAge: 80, sharedHistoryTag: 'patronage' }),
      second: ['worker', { minAge: 25, maxAge: 60 }],
    },
    baseRate: 0.01,
    cooldownYears: 25,
    outcomes: [
      {
        id: 'a-hole-through-the-shoulder',
        w: 0.4,
        text: '黎明时雾很低，{second}数到十，{patron}的枪先响。{subject}觉得左肩被马鞭抽了一下，血把外套的翻领粘在脖子上。{patron}把枪交给{second}，说这一枪算清账。医生剪开衬衣时，{subject}看见伤口边缘烧焦的布丝，想起画布上那道没有画完的金线。',
        significance: 0.86,
        fx: {
          health: -0.15,
          condition: 'gunshot_wound',
          reputation: 0.1,
          relation: ['patron', 'rival', -0.3, 0],
          flag: 'spec14_duel_wounded',
        },
      },
      {
        id: 'the-second-shot',
        w: 0.25,
        text: '{patron}的子弹擦过{subject}的耳廓，{subject}的第二枪打中对方的胸口。{patron}在湿草地上坐下去，手指还扣着扳机，像在等一个迟到的答复。{second}把两把枪都踢进沟里，说今天谁也没来过。{subject}走回城里时，天已经亮了，面包房的炉门正往外冒白汽。',
        significance: 0.9,
        fx: {
          reputation: -0.1,
          mood: -0.15,
          flag: 'spec14_killed_in_duel',
          knowledge: ['the patron died on the wet grass before the doctor arrived', 0.9, 'second'],
          raw: [
            {
              type: 'death',
              personId: '$patron',
              cause: 'pistol shot to the chest at a dawn duel',
              reason: 'a duel over the betrayed portrait ended with the patrons death',
            },
          ],
        },
      },
      {
        id: 'two-shots-into-the-fog',
        w: 0.35,
        text: '两枪都打在雾里。{patron}把枪举向天空，放掉最后一颗子弹，说这样谁都不欠谁。{second}收起手帕，医生从树后走出来，给两人各倒了一口白兰地。{subject}回到画室，发现画布上的金线已经干了，刮不掉，只能用新的颜色盖住。',
        significance: 0.72,
        fx: {
          reputation: 0.04,
          relation: ['patron', 'rival', -0.2, 0],
          flag: 'spec14_duel_missed',
          mood: -0.05,
        },
      },
    ],
  },

  // 26. The disappearance --------------------------------------------------
  {
    id: 'r14-spec.disappearance',
    title: '没有寄出的行李',
    domain: 'family',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['missing', 'absence', 'family', 'mystery', 'loss'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      sibling: ['sibling', { minAge: 16, maxAge: 75 }],
      landlord: ['official', { minAge: 30, maxAge: 70 }],
    },
    baseRate: 0.01,
    cooldownYears: 30,
    outcomes: [
      {
        id: 'a-key-and-a-postcard',
        w: 0.4,
        text: '{sibling}在第三周收到一把钥匙和一张没有署名的明信片，邮戳是边境小站。{subject}的房间里，行李箱还开着，牙刷是干的，窗台上那盆天竺葵已经蔫了。{landlord}来收租，站在门口不肯进去，只说下个月的房子不能空着。',
        significance: 0.84,
        followup: { sceneId: 'r14-spec.mistaken-identity', delayMonths: 24 },
        fx: {
          mood: -0.2,
          condition: 'absence',
          flag: 'spec14_disappeared',
          knowledge: [
            'the postcard was posted from a border station three weeks after the room was left',
            0.85,
            'sibling',
          ],
        },
      },
      {
        id: 'found-at-the-relief-station',
        w: 0.3,
        text: '{sibling}在另一个区的救济站找到{subject}，人瘦了一圈，鞋底磨穿，手里还攥着半张车票。{subject}说只是走错了方向，不让通知家里。{sibling}花四克朗买了车票和两碗汤；{subject}喝到一半，忽然问今天是不是又下雨了。',
        significance: 0.76,
        fx: {
          cash: -4,
          health: -0.04,
          relation: ['sibling', 'friend', 0.1, 0],
          flag: 'spec14_found_after_absence',
          knowledge: [
            'the subject spent three weeks in a relief station across the river',
            0.8,
            'sibling',
          ],
        },
      },
      {
        id: 'the-sweet-water-stain',
        w: 0.3,
        text: '{landlord}拿着欠租单上门时，{subject}已经从后门走了。三天后，一封从港口寄来的信说人已在船上，信纸却带着本城文具店的印记。{landlord}把屋里的旧家具折了六克朗买下；{sibling}把信翻来覆去地看，发现信封上的水渍是甜的，像有人用茶杯压过。',
        significance: 0.74,
        fx: {
          cash: 6,
          relation: ['landlord', 'rival', -0.15, 0],
          flag: 'spec14_staged_disappearance',
          knowledge: ['the letter from the port was written on local stationery', 0.85, 'sibling'],
          mood: -0.04,
        },
      },
    ],
  },

  // 27. The mistaken identity ---------------------------------------------
  {
    id: 'r14-spec.mistaken-identity',
    title: '站台上被认错的人',
    domain: 'identity',
    stage: 'adulthood',
    ages: [18, 78],
    tags: ['identity', 'mistake', 'station', 'missing', 'family'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'missing', minCount: 1, withinYears: 20 }],
    roles: {
      sibling: returning('sibling', { minAge: 16, maxAge: 80, sharedHistoryTag: 'missing' }),
      official: ['official', { minAge: 28, maxAge: 70 }],
    },
    baseRate: 0.005,
    cooldownYears: 30,
    outcomes: [
      {
        id: 'the-rain-ruined-photograph',
        w: 0.4,
        text: '{official}在站台上拦住{subject}，手里举着一张寻人启事，照片上的脸被雨水泡花了。{sibling}从车厢另一头跑过来，喊了一个陌生的名字，抓住{subject}的手腕不放。{subject}闻到对方袖口上的樟脑味，忽然想起自己确实有件大衣留在旧家。',
        significance: 0.8,
        followup: { sceneId: 'r14-spec.bureaucracy-mistake', delayMonths: 3 },
        fx: {
          reputation: 0.04,
          relation: ['sibling', 'friend', 0.2, 0],
          flag: 'spec14_mistaken_for_missing',
          mood: -0.08,
          knowledge: [
            'the missing person was last seen wearing a coat like the subjects',
            0.8,
            'sibling',
          ],
        },
      },
      {
        id: 'the-identity-card',
        w: 0.3,
        text: '{subject}把身份证摊在{official}的登记簿上，又说了自己母亲的名字。{sibling}退后一步，围巾从肩上滑下来，连声说对不起。站台的钟敲了四下，{subject}上了另一趟车，隔着玻璃看见{sibling}还站在原地，把寻人启事重新折好。',
        significance: 0.64,
        fx: {
          relation: ['sibling', 'acquaintance', 0.05, 0],
          flag: 'spec14_identity_corrected',
          mood: 0.04,
          knowledge: ['the sibling has been meeting every train for seven years', 0.8, 'sibling'],
        },
      },
      {
        id: 'the-name-signed-at-the-bank',
        w: 0.3,
        text: '{sibling}把{subject}领回家，饭桌上摆着一副空碗筷，说是给失踪的人留了七年。{subject}没有纠正，第二天去银行签了那个名字，取出十四克朗。{official}后来上门核对，{subject}隔着门说人已经回来了，声音模仿得很像。',
        significance: 0.82,
        followup: { sceneId: 'r14-spec.bureaucracy-mistake', delayMonths: 6 },
        fx: {
          cash: 14,
          reputation: -0.1,
          relation: ['sibling', 'rival', -0.2, 0],
          flag: 'spec14_identity_fraud',
          knowledge: ['the missing persons savings were still open at the bank', 0.9],
        },
      },
    ],
  },

  // 28. The ship passage ---------------------------------------------------
  {
    id: 'r14-spec.ship-passage',
    title: '统舱里的船票',
    domain: 'migration',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 55],
    tags: ['migration', 'ship', 'passage', 'departure', 'fare'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'cash', min: 3 }],
    roles: {
      agent: ['official', { minAge: 30, maxAge: 65 }],
      steward: ['worker', { minAge: 22, maxAge: 60 }],
      compatriot: ['neighbor', { minAge: 18, maxAge: 55 }],
    },
    cooldownYears: 12,
    outcomes: [
      {
        id: 'a-corner-torn-off',
        w: 0.4,
        text: '{agent}把统舱票从窗口推出来，票价十八克朗，铺位在锅炉房旁边。{subject}把行李捆成一只窄包，塞进两件衬衣和一本旧地图。船票要在港口换，先坐夜车去的里雅斯特。{steward}在跳板口收走船票，撕下一个角还回来。船离岸时，{compatriot}在码头上挥帽子，{subject}没有挥，只把那张票角攥在掌心。',
        significance: 0.86,
        followup: { sceneId: 'r14-spec.disappearance', delayMonths: 6 },
        fx: {
          cash: -18,
          move: ['@station', 'left the district for the emigrant ship at the port'],
          flag: 'spec14_ship_passage',
          mood: 0.08,
          knowledge: ['the steerage berth is beside the boiler room', 0.8, 'steward'],
        },
      },
      {
        id: 'the-ship-that-was-scrapped',
        w: 0.3,
        text: '{agent}把票面上的铅字指给{subject}看，说这是今年新印的。连路费一共二十克朗；到了港口，{steward}只看了一眼就把票推回来，说这条船去年就拆了。{subject}在售票厅等到天黑，{agent}的窗口已经换成另一个人的名字。{compatriot}借了回程车费，两人在候车室里坐到天亮。',
        significance: 0.8,
        fx: {
          cash: -20,
          relation: ['agent', 'rival', -0.25, 0],
          flag: 'spec14_fake_ticket',
          mood: -0.15,
          knowledge: [
            'the shipping line sold tickets for a vessel already broken up',
            0.9,
            'steward',
          ],
        },
      },
      {
        id: 'the-ticket-given-away',
        w: 0.3,
        text: '{subject}把船票让给{compatriot}，说自己再等一年。{compatriot}在上船前把地址写在烟盒背面；十八克朗的票只退回八克朗，{subject}损失十克朗，字被雨打湿，回家后只剩一半。{subject}回到公寓，{agent}在楼下问是不是不走了；{subject}说是，先不走了。当天夜里，{subject}把那只窄包重新塞回床底。',
        significance: 0.68,
        fx: {
          cash: -10,
          relation: ['compatriot', 'friend', 0.1, 0],
          flag: 'spec14_stayed_behind',
          mood: -0.04,
        },
      },
    ],
    task: taskMeta('migration', ['survival', 'belonging'], ['cash', 'safety'], 0.6, 0.5, [
      'numeracy',
    ]),
  },

  // 29. The mountain accident ---------------------------------------------
  {
    id: 'r14-spec.mountain-accident',
    title: '雾里的冰裂缝',
    domain: 'special',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['mountain', 'accident', 'weather', 'rescue', 'injury'],
    contexts: ['vienna', 'rural', 'peace', 'postwar', 'crisis', 'reform'],
    roles: {
      guide: ['worker', { minAge: 30, maxAge: 68 }],
      comrade: ['neighbor', { minAge: 18, maxAge: 58 }],
    },
    baseRate: 0.01,
    cooldownYears: 25,
    outcomes: [
      {
        id: 'hauled-out-of-the-crevasse',
        w: 0.45,
        text: '雾从谷底漫上来时，{subject}脚下的雪层忽然塌了，整个人滑进一条冰裂缝，肩膀卡在两壁之间。{guide}把绳子在岩石上绕了三圈，{comrade}在下面拉着，手套被冰水浸透。拉上来时，{subject}的左耳已经冻白，{guide}用掌心捂着，说别揉，揉了就掉了。',
        significance: 0.8,
        fx: {
          health: -0.08,
          condition: 'frostbite',
          relation: ['guide', 'friend', 0.15, 0],
          flag: 'spec14_mountain_rescued',
          mood: 0.05,
          knowledge: ['the snow bridge collapsed under a layer of fresh drift', 0.85, 'guide'],
        },
      },
      {
        id: 'the-rope-with-no-weight',
        w: 0.2,
        text: '{subject}走在队伍最后，雾把前面的人影吞掉时，脚下的雪桥断了。{comrade}听见一声很短的回响，绳子从手里滑出去，末端只剩一个空扣。{guide}带着人下到裂缝边，看见冰壁上有一道新鲜的划痕，再往下，雾太厚，手电照不到底。第三天，搜索队放弃了。',
        significance: 0.92,
        fx: {
          death: 'fell into a crevasse in fog; the body was recovered three days later',
          flag: 'spec14_mountain_death',
          knowledge: ['the crevasse was deeper than the rescue rope', 0.9, 'guide'],
        },
      },
      {
        id: 'the-guide-takes-the-fall',
        w: 0.35,
        text: '{guide}在前面试路，冰镐凿下去时带出一整块雪檐。{subject}扑过去抓住背包带，两个人一起滑了十几米，最后被一块岩脊挡住。{guide}的小腿以不自然的角度弯着，{comrade}用两根登山杖和一条围巾做了夹板。下山的路走了七个钟头，{subject}一直听见伤者在数自己的呼吸。',
        significance: 0.86,
        fx: {
          health: -0.1,
          relation: ['guide', 'friend', 0.2, 0],
          flag: 'spec14_guide_injured',
          mood: -0.1,
          knowledge: ['the guide will not walk without a limp again', 0.8, 'comrade'],
        },
      },
    ],
  },

  // 30. The public execution ----------------------------------------------
  {
    id: 'r14-spec.public-execution',
    title: '广场上的木台',
    domain: 'civic',
    stage: 'adulthood',
    ages: [20, 78],
    tags: ['execution', 'public', 'witness', 'army', 'state'],
    contexts: ['vienna', 'urban', 'war', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'history', tag: 'army', minCount: 1, includeParticipants: true, withinYears: 20 },
    ],
    roles: {
      comrade: returning('worker', { minAge: 22, maxAge: 75, sharedHistoryTag: 'army' }),
      official: ['official', { minAge: 30, maxAge: 70 }],
      condemned: ['worker', { minAge: 20, maxAge: 70 }],
    },
    baseRate: 0.005,
    cooldownYears: 30,
    outcomes: [
      {
        id: 'chestnuts-still-warm',
        w: 0.35,
        text: '{official}宣读判决书时，广场上有人在卖烤栗子。{condemned}被带上木台，脚镣在石板上拖出一串响声。{subject}站在人群第三排，看见{comrade}把帽子摘下来，又戴上，反复了三次。绳子拉紧时，卖栗子的人捂住孩子的眼睛，栗子锅还在冒白汽。',
        significance: 0.78,
        fx: {
          mood: -0.15,
          health: -0.02,
          flag: 'spec14_execution_witness',
          knowledge: ['the execution was carried out in the square before noon', 0.9, 'official'],
        },
      },
      {
        id: 'the-corporal-from-the-trench',
        w: 0.4,
        text: '{condemned}转过脸来，{subject}认出了战壕里那个总把面包分给别人的下士。{comrade}也认出来了，嘴唇动了动，没有出声。{official}问有没有人认识犯人，人群往后退了半步。{subject}没有举手，只把口袋里那枚旧军章攥紧，边缘硌进掌心。',
        significance: 0.84,
        fx: {
          relation: ['condemned', 'acquaintance', 0.1, 0],
          mood: -0.2,
          flag: 'spec14_recognized_condemned',
          knowledge: ['the condemned man once served in the same trench', 0.9, 'comrade'],
        },
      },
      {
        id: 'walked-away-before-the-rope',
        w: 0.25,
        text: '{subject}在绳子拉紧前转过身，沿着广场边的巷子走。{comrade}跟上来，问要不要去喝一杯。{subject}说不了，还得去上工。两人在街角分开，谁也没有提刚才看见的脸。{subject}走回车间，听见皮带轮照常转，才发现自己一整天都没有说一句话。',
        significance: 0.66,
        fx: {
          mood: -0.08,
          health: -0.01,
          relation: ['comrade', 'colleague', 0.05, 0],
          flag: 'spec14_execution_turned_away',
        },
      },
    ],
  },

  // 31. Capability-gated social insight -----------------------------------
  {
    id: 'r14-spec.capability-social-insight',
    title: '笑容背面的价码',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['capability', 'social', 'insight', 'betrayal', 'trust'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'capability', capability: 'social_insight' },
      { kind: 'history', tag: 'betrayal', minCount: 1, includeParticipants: true, withinYears: 20 },
    ],
    roles: {
      betrayer: returning('neighbor', { minAge: 20, maxAge: 80, sharedHistoryTag: 'betrayal' }),
      friend: ['neighbor', { minAge: 18, maxAge: 70 }],
    },
    baseRate: 0.01,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'three-sentences-in-the-corridor',
        w: 0.4,
        text: '{betrayer}在宴会上谈笑，袖口露出一截新表链，{subject}却看见对方的左手一直在数酒杯。{friend}正要把积蓄拿出来合伙开铺子。{subject}把{friend}拉到走廊，说了三句话，{friend}的脸色从红变白。第二天，{betrayer}的马车没有在约定的钟点出现。',
        significance: 0.8,
        fx: {
          relation: ['friend', 'friend', 0.15, 0],
          reputation: 0.05,
          flag: 'spec14_saw_through_con',
          mood: 0.08,
          knowledge: ['the betrayer was counting the glasses to time the proposal', 0.85],
        },
      },
      {
        id: 'the-envelope-every-month',
        w: 0.35,
        text: '{subject}在楼梯间拦住{betrayer}，把一张旧借条和一份假合同并排放在窗台上。{betrayer}看了很久，问要多少。{subject}说十克朗，以后每月五克朗。钱在信封里递过来时，{subject}听见楼上有人在练钢琴，同一个音反复敲，像在提醒什么。',
        significance: 0.82,
        fx: {
          cash: 10,
          reputation: -0.12,
          relation: ['betrayer', 'rival', -0.2, 0],
          flag: 'spec14_blackmailed_con',
          mood: -0.04,
          knowledge: ['the betrayer will pay to keep the old contract quiet', 0.85, 'betrayer'],
        },
      },
      {
        id: 'the-ring-taken-from-the-table',
        w: 0.25,
        text: '{subject}在宴会角落里看见{betrayer}把{friend}的戒指从桌上摸走，指法很轻，像从盘子里拿一颗糖。{subject}端着酒杯，没有动。{friend}后来问有没有看见戒指，{subject}说没有。那天夜里，{subject}把手洗了三遍，仍觉得指缝里有糖的黏。',
        significance: 0.66,
        fx: {
          relation: ['friend', 'rival', -0.05, 0],
          flag: 'spec14_silent_witness',
          mood: -0.08,
          knowledge: ['the betrayer took the ring during the toast', 0.9],
        },
      },
    ],
  },

  // 32. Capability-gated artistic vision ----------------------------------
  {
    id: 'r14-spec.capability-artistic-vision',
    title: '只有一个人看见的颜色',
    domain: 'culture',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['capability', 'art', 'vision', 'painting', 'patronage'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'capability', capability: 'craft_affinity' },
      { kind: 'history', tag: 'patronage', minCount: 1, withinYears: 15 },
    ],
    roles: {
      patron: returning('official', { minAge: 35, maxAge: 80, sharedHistoryTag: 'patronage' }),
      model: ['neighbor', { minAge: 18, maxAge: 55 }],
    },
    baseRate: 0.01,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'a-face-made-of-blue',
        w: 0.4,
        text: '{subject}把{patron}的肖像涂成一片没有脸的蓝，只在领口留一道金线。{patron}站在画前，问这算不算侮辱。{subject}说画的是光落在袖口上的样子，不是人。画被退回来，挂在画室最里面；三个月后，一个年轻评论家在咖啡馆听说这幅画，专门找上门来。',
        significance: 0.82,
        fx: {
          reputation: 0.15,
          role: 'innovator',
          relation: ['patron', 'rival', -0.1, 0],
          flag: 'spec14_new_style',
          mood: 0.1,
          knowledge: ['a younger critic has asked to see the blue portrait', 0.8, 'model'],
        },
      },
      {
        id: 'all-the-faces-scraped-off',
        w: 0.3,
        text: '{subject}花两克朗买了松节油，把画室里所有带脸的画都刮了，颜料铲进一只铁桶，第二天倒进多瑙河。{model}来送饭，看见墙上只剩钉子和一圈圈灰印。{subject}说终于看清了，以前画的都是别人要的东西。{model}把饭盒放下，没有劝，只问晚上还回不回家。',
        significance: 0.74,
        fx: {
          cash: -2,
          health: -0.02,
          mood: -0.15,
          flag: 'spec14_paintings_destroyed',
          knowledge: ['the studio walls are empty except for nail holes', 0.8, 'model'],
        },
      },
      {
        id: 'the-dealer-buys-the-colour',
        w: 0.3,
        text: '一个画商看中了{subject}画里那种不属于任何人的颜色，提出包下整间画室。十六克朗，外加一箱新颜料。{patron}听说后，托人带话，说愿意按原来的价钱再画一幅带脸的。{subject}把两个信封并排放在桌上，最后把画商的定金收进了抽屉。',
        significance: 0.78,
        fx: {
          cash: 16,
          reputation: 0.05,
          relation: ['patron', 'colleague', 0.05, 0],
          flag: 'spec14_vision_sold',
          knowledge: ['the dealer wants a whole room of the new colour', 0.8],
        },
      },
    ],
  },

  // 33. Capability-gated medical intuition --------------------------------
  {
    id: 'r14-spec.capability-medical-intuition',
    title: '退烧药后面的阴影',
    domain: 'health',
    stage: 'adulthood',
    ages: [22, 75],
    tags: ['capability', 'medicine', 'intuition', 'diagnosis', 'injury'],
    contexts: ['vienna', 'urban', 'medical', 'postwar', 'reform', 'crisis'],
    conditions: [
      { kind: 'capability', capability: 'health' },
      { kind: 'history', tag: 'injury', minCount: 1, withinYears: 4 },
    ],
    roles: {
      doctor: ['worker', { minAge: 28, maxAge: 75, occupation: 'Arzt' }],
      patient: ['neighbor', { minAge: 8, maxAge: 80 }],
      nurse: ['worker', { minAge: 20, maxAge: 60 }],
    },
    baseRate: 0.01,
    cooldownYears: 15,
    outcomes: [
      {
        id: 'the-hard-lump-behind-the-ear',
        w: 0.4,
        text: '{subject}在候诊室看见{patient}一直挠耳后，顺手摸了一下，指腹下面有一粒硬结。{doctor}说是腮腺炎，让回家热敷。{subject}没有走，把{patient}的衣领翻下去，露出一小片发红的皮肤。{doctor}的脸色变了，改口让去拍片；{nurse}在门口听见，悄悄把病历往前挪了一页。',
        significance: 0.8,
        fx: {
          reputation: 0.08,
          relation: ['doctor', 'rival', -0.1, 0],
          flag: 'spec14_diagnosis_caught',
          mood: 0.06,
          knowledge: ['the swelling behind the ear is not mumps', 0.9, 'doctor'],
        },
      },
      {
        id: 'not-a-medical-opinion',
        w: 0.35,
        text: '{subject}说{patient}的烧退得太快，不像普通的感冒。{doctor}从眼镜上方看了一眼，问{subject}是哪一年进的医学院。{nurse}把下一位病人叫进来，走廊里的椅子在地上磨出一声。{subject}把要说的话咽回去，回家后翻出那本旧解剖图，翻到淋巴那一页。',
        significance: 0.7,
        fx: {
          relation: ['doctor', 'rival', -0.05, 0],
          mood: -0.12,
          health: -0.03,
          flag: 'spec14_dismissed_intuition',
          knowledge: ['the doctor refuses to examine the lymph nodes again', 0.8, 'doctor'],
        },
      },
      {
        id: 'gauze-and-alcohol-at-home',
        w: 0.25,
        text: '{subject}没有去门诊，花八克朗买了纱布和酒精，每天傍晚替{patient}换药。{doctor}后来在楼梯间撞见，问是不是在拿别人的命练手。{subject}说只是换药，没动刀。{patient}的肿消下去那天，家里煮了一锅汤，{nurse}也被叫来喝了一碗。',
        significance: 0.72,
        fx: {
          cash: -8,
          health: 0.04,
          relation: [
            ['patient', 'friend', 0.15, 0],
            ['nurse', 'colleague', 0.08, 0],
          ],
          flag: 'spec14_private_treatment',
        },
      },
    ],
  },

  // 34. The absurd official honour ----------------------------------------
  {
    id: 'r14-spec.absurd-official-honor',
    title: '一枚镀铜的勋章',
    domain: 'civic',
    stage: 'adulthood',
    ages: [25, 75],
    tags: ['honor', 'state', 'absurd', 'humiliation', 'ceremony'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'humiliation', minCount: 1, withinYears: 10 }],
    roles: {
      impresario: returning('worker', { minAge: 30, maxAge: 80, sharedHistoryTag: 'humiliation' }),
      official: ['official', { minAge: 35, maxAge: 75 }],
    },
    baseRate: 0.005,
    cooldownYears: 20,
    outcomes: [
      {
        id: 'the-long-citation',
        w: 0.4,
        text: '{official}在市政厅念了一份很长的表彰词，说{subject}以艺术服务城市，把一枚镀铜勋章别在{subject}胸口，另给四克朗车马费。{impresario}站在第二排鼓掌，掌心的汗把节目单浸软。酒会上，有人认出{subject}就是去年报纸上那桩丑闻的主角，{official}说那正是城市包容的证明。',
        significance: 0.78,
        fx: {
          cash: 4,
          reputation: 0.12,
          role: 'medal_holder',
          relation: ['impresario', 'colleague', 0.1, 0],
          flag: 'spec14_official_honor',
          knowledge: ['the citation was written before the scandal was printed', 0.85, 'official'],
        },
      },
      {
        id: 'the-medal-handed-back',
        w: 0.3,
        text: '{subject}把勋章盒推回{official}面前，说去年同一双手签过一份禁演令。{official}的笑容没有变，只把盒子盖好，说勋章不是给{subject}的，是给城市自己的。{impresario}在门口等着，手里夹着两张下一场演出的票，问要不要换个城市。',
        significance: 0.74,
        fx: {
          reputation: 0.08,
          relation: ['official', 'rival', -0.2, 0],
          flag: 'spec14_honor_refused',
          mood: 0.06,
        },
      },
      {
        id: 'the-wrong-name-engraved',
        w: 0.3,
        text: '{official}念到名字时，{subject}站起来，却发现勋章上的刻字是另一个人的姓。{impresario}凑近看了一眼，说可能是书记员抄错了。{official}让人去查，酒会继续，铜管乐队照常演奏。{subject}把那枚勋章放进口袋，回家后用它压住一叠旧账单。',
        significance: 0.7,
        fx: {
          reputation: -0.08,
          relation: ['official', 'rival', -0.05, 0],
          flag: 'spec14_wrong_medal',
          mood: -0.1,
          knowledge: ['the engraved name belongs to a different honoree', 0.9, 'impresario'],
        },
      },
    ],
  },

  // 35. The remembered ledger ---------------------------------------------
  {
    id: 'r14-spec.capability-memory',
    title: '账本上的缺页',
    domain: 'knowledge',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 59],
    tags: ['capability', 'memory', 'ledger', 'bureaucracy', 'fraud'],
    contexts: ['vienna', 'urban', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'capability', capability: 'numeracy' }],
    roles: {
      clerk: ['official', { minAge: 28, maxAge: 68 }],
      partner: ['worker', { minAge: 20, maxAge: 60 }],
    },
    cooldownYears: 10,
    outcomes: [
      {
        id: 'seventeen-families',
        w: 0.4,
        text: '{clerk}把烧掉半边的账本摊在桌上，说缺的那一页关系到十七户人家的抚恤。{subject}闭上眼，从第一行数字开始背，背到第十一行时停了一下，又接下去。{clerk}照着写，写完核对，一分不差，付了六克朗酬劳。{partner}在门外听见，说这脑子该去银行做事，不该在码头扛包。',
        significance: 0.78,
        followup: { sceneId: 'r14-spec.bureaucracy-mistake', delayMonths: 3 },
        fx: {
          cash: 6,
          skill: { numeracy: 0.04 },
          relation: ['clerk', 'colleague', 0.1, 0],
          flag: 'spec14_ledger_restored',
          knowledge: [
            'the missing page held the pension figures for seventeen families',
            0.9,
            'clerk',
          ],
        },
      },
      {
        id: 'two-numbers-reversed',
        w: 0.3,
        text: '{clerk}问到第三遍时，{subject}把两个数字说反了，账本上的缺口对不上。{clerk}把钢笔放下，说再想不起来就只能按最低标准赔。{subject}盯着桌角那块墨渍，越看越像一只闭着的眼。回家的路上，{subject}一直在心里重数，可数字像沙子，攥得越紧漏得越快。',
        significance: 0.68,
        fx: {
          reputation: -0.06,
          relation: ['clerk', 'rival', -0.1, 0],
          flag: 'spec14_memory_failed',
          mood: -0.12,
        },
      },
      {
        id: 'the-entry-that-was-not-a-pension',
        w: 0.3,
        text: '{subject}背到第七行时，忽然认出其中一笔是去年冬天从码头账上划走的款子，签字的人已经调走。{clerk}问怎么了，{subject}说没什么，只是记得这一笔。{partner}在门外等着，手里提着两碗面；{subject}没有提账本的事，只问面里有没有放葱。',
        significance: 0.74,
        fx: {
          relation: ['partner', 'friend', 0.05, 0],
          flag: 'spec14_memory_crime',
          mood: -0.1,
          knowledge: [
            'a missing pension entry was actually a transfer signed by a transferred clerk',
            0.85,
          ],
        },
      },
    ],
    task: {
      ...taskMeta('knowledge', ['work', 'knowledge'], ['status', 'autonomy'], 0.5, 0.3, [
        'numeracy',
      ]),
      capability: 'numeracy',
    },
  },

  // 36. The black-market clinic -------------------------------------------
  {
    id: 'r14-spec.blackmarket-organ',
    title: '诊所后门的价目表',
    domain: 'health',
    kind: 'task',
    stage: 'adulthood',
    ages: [20, 50],
    tags: ['black_market', 'medicine', 'surgery', 'debt', 'risk'],
    contexts: ['vienna', 'urban', 'medical', 'postwar', 'crisis', 'reform'],
    conditions: [
      { kind: 'history', tag: 'debt', minCount: 1, withinYears: 6 },
      { kind: 'health', min: 0.55 },
    ],
    roles: {
      broker: ['worker', { minAge: 28, maxAge: 65 }],
      surgeon: ['worker', { minAge: 32, maxAge: 72, occupation: 'Arzt' }],
      nurse: ['worker', { minAge: 22, maxAge: 60 }],
    },
    cooldownYears: 25,
    outcomes: [
      {
        id: 'twenty-six-kronen',
        w: 0.35,
        text: '{broker}把价目表压在茶杯下面，说二十六克朗，术后休息两周，不耽误上工。{subject}在一张印着“自愿捐献”的纸上签了名，字迹比平时小。{surgeon}戴着口罩，只露出一双熬夜的眼睛；{nurse}把帘子拉上时，{subject}看见窗外有人在晒床单。醒来时腰侧多了一条绷带，钱已经塞在外套内袋。',
        significance: 0.86,
        followup: {
          sceneId: 'r14-spec.doctor-fatal-mistake',
          subjectRole: 'surgeon',
          delayMonths: 3,
        },
        fx: {
          cash: 26,
          health: -0.28,
          condition: 'missing_kidney',
          relation: ['broker', 'colleague', 0.1, 0],
          flag: 'spec14_organ_sold',
          knowledge: ['the clinic pays cash and keeps no patient register', 0.85, 'broker'],
        },
      },
      {
        id: 'the-doctor-who-never-came',
        w: 0.4,
        text: '{broker}收了六克朗的“检查费”，让{subject}在诊所后门等，说医生马上到。等到天黑，后门一直没有开，只有一只猫从台阶上跳下来。{nurse}第二天说那个诊所上周就搬走了。{subject}把收据翻过来，背面印着另一家店的名字，墨迹还没干。',
        significance: 0.76,
        fx: {
          cash: -6,
          health: -0.02,
          relation: ['broker', 'rival', -0.3, 0],
          flag: 'spec14_organ_scam',
          mood: -0.15,
          knowledge: ['the clinic moved last week and left the back door unlocked', 0.8, 'nurse'],
        },
      },
      {
        id: 'the-table-without-a-lamp',
        w: 0.25,
        text: '{subject}跟着{broker}走进后门，看见走廊尽头的手术台上铺着塑料布，灯还没有开。{surgeon}在洗手，水声很响。{subject}站了一会儿，说今天不做了，把两克朗挂号费留在窗台，转身往外走；{broker}在后面喊价钱可以再谈。{subject}没有回头，走到街上才发现自己的外套还搭在诊所的椅背上。',
        significance: 0.62,
        fx: {
          cash: -2,
          health: -0.01,
          flag: 'spec14_organ_refused',
          mood: 0.04,
        },
      },
    ],
    task: taskMeta('special', ['survival'], ['cash', 'health'], 0.35, 0.8, ['numeracy']),
  },

  // 36. The hoax -----------------------------------------------------------
  {
    id: 'r14-spec.hoax-newspaper',
    title: '整版登出的火星人',
    domain: 'culture',
    kind: 'task',
    stage: 'adulthood',
    ages: [18, 58],
    tags: ['hoax', 'newspaper', 'media', 'humiliation', 'fraud'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'humiliation', minCount: 1, withinYears: 10 }],
    roles: {
      editor: ['worker', { minAge: 30, maxAge: 68 }],
      rival: ['worker', { minAge: 20, maxAge: 55 }],
      printer: ['worker', { minAge: 25, maxAge: 65 }],
    },
    cooldownYears: 8,
    outcomes: [
      {
        id: 'the-canals-of-mars',
        w: 0.35,
        text: '{subject}把一篇“火星运河观测”的稿子放在{editor}桌上，附了一张自己画的星图。{editor}问证据在哪，{subject}说天文学家太忙，没空否认。报纸加印两次，街上有人仰头看天，{printer}连夜排字，手指沾满黑铅。八克朗广告分成装进信封；三天后，{rival}在另一家报纸上写文章驳斥，反而让更多人买了头版。',
        significance: 0.78,
        fx: {
          cash: 8,
          reputation: 0.05,
          relation: ['editor', 'colleague', 0.12, 0],
          flag: 'spec14_hoax_success',
          knowledge: ['the star chart was drawn around the rim of a coffee cup', 0.8],
        },
      },
      {
        id: 'the-compass-and-the-cup',
        w: 0.4,
        text: '{rival}找到那张星图的底稿，发现运河的弧度是用圆规照着咖啡杯口画的。文章登出来时，{editor}把{subject}叫进办公室，桌上摊着两天的报纸。{subject}说读者爱看，{editor}说报社爱活，三克朗更正费从薪水里扣。当天下午，更正启事和{subject}的解聘通知一起排上了版。',
        significance: 0.82,
        fx: {
          cash: -3,
          reputation: -0.2,
          unemployment: 'dismissed after fabricating a Mars observation',
          relation: ['rival', 'rival', -0.15, 0],
          flag: 'spec14_hoax_exposed',
          mood: -0.12,
        },
      },
      {
        id: 'pulled-before-the-print-run',
        w: 0.25,
        text: '{subject}在付印前把底稿抽回来，向{editor}承认星图是假的。{editor}盯着那张纸看了很久，问为什么。{subject}说本来只想气一气{printer}，没想到会印到头版。{printer}在旁边笑了一声，说这年头，假星星比真新闻好卖；{editor}扣下一克朗排版费，把稿子锁进抽屉，没有再提。',
        significance: 0.64,
        fx: {
          cash: -1,
          relation: ['editor', 'colleague', 0.05, 0],
          flag: 'spec14_hoax_confessed',
          mood: 0.04,
          knowledge: ['the editor keeps rejected hoaxes in the bottom drawer', 0.75, 'editor'],
        },
      },
    ],
    task: taskMeta('culture', ['status', 'knowledge'], ['status', 'autonomy'], 0.5, 0.4, [
      'literacy',
      'social',
    ]),
  },

  // 37. The death notice ---------------------------------------------------
  {
    id: 'r14-spec.death-notice-alive',
    title: '讣告栏里的自己',
    domain: 'special',
    stage: 'adulthood',
    ages: [25, 80],
    tags: ['death', 'newspaper', 'mistake', 'notoriety', 'fortune_told'],
    contexts: ['vienna', 'urban', 'peace', 'postwar', 'crisis', 'reform'],
    conditions: [{ kind: 'history', tag: 'fortune_told', minCount: 1, withinYears: 6 }],
    roles: {
      printer: ['worker', { minAge: 25, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 20, maxAge: 80 }],
    },
    baseRate: 0.005,
    cooldownYears: 40,
    outcomes: [
      {
        id: 'the-black-frame',
        w: 0.4,
        text: '{printer}把晨报递过来时，{subject}先看见黑框，再看见自己的名字。讣告说{subject}于本周二病逝，享年五十一岁，葬礼在中央公墓。{neighbor}在报摊旁边探头看了一眼，手里的牛奶瓶差点滑下去。{subject}把那段话读了三遍，最后花一克朗从报童手里买了最后一份；{printer}说这一版印了八千份，报摊早就空了。',
        significance: 0.82,
        fx: {
          cash: -1,
          reputation: 0.1,
          mood: -0.12,
          flag: 'spec14_obituary_alive',
          knowledge: [
            'the obituary page lists the subjects name, address and funeral time',
            0.9,
            'printer',
          ],
        },
      },
      {
        id: 'the-debtors-and-the-wreath',
        w: 0.3,
        text: '{subject}把讣告剪下来，寄给三个债权人，附言说人已经死了，债务请找遗产。{neighbor}在楼道里碰见{subject}，愣了一下，问是不是见鬼了。{subject}说大概是重名。第二天，债主们没有来，倒是有个花圈店送来一只写错名字的纸花圈；{subject}把它退回去，换回八克朗。',
        significance: 0.8,
        fx: {
          cash: 8,
          relation: ['neighbor', 'rival', -0.1, 0],
          flag: 'spec14_faked_death',
          mood: -0.05,
          knowledge: ['the creditors read the obituary and stopped calling', 0.85],
        },
      },
      {
        id: 'one-letter-in-the-typeset',
        w: 0.3,
        text: '{subject}拿着报纸去编辑部，{printer}查了排字盘，发现死者的名字和{subject}只差一个字母。更正启事登在第二天的中缝，字号小得像一粒芝麻。{neighbor}把两份报纸并排贴在楼道里，说这样大家就都知道了。{subject}又花一克朗买了两份，看了很久，觉得那个黑框还是像一张嘴。',
        significance: 0.62,
        fx: {
          cash: -1,
          relation: ['printer', 'acquaintance', 0.05, 0],
          flag: 'spec14_obituary_corrected',
          mood: 0.04,
          knowledge: [
            'the obituary belonged to a man whose name differed by one letter',
            0.9,
            'printer',
          ],
        },
      },
    ],
  },

  // 38. The inventor's machine --------------------------------------------
  {
    id: 'r14-spec.inventor-failed-machine',
    title: '第三次试飞的铁鸟',
    domain: 'special',
    stage: 'adulthood',
    ages: [22, 65],
    tags: ['invention', 'machine', 'failure', 'workshop', 'bankruptcy'],
    contexts: ['vienna', 'urban', 'industrial', 'peace', 'postwar', 'crisis'],
    conditions: [{ kind: 'history', tag: 'bankruptcy', minCount: 1, withinYears: 12 }],
    roles: {
      backer: ['official', { minAge: 35, maxAge: 75 }],
      mechanic: ['worker', { minAge: 20, maxAge: 60 }],
    },
    baseRate: 0.01,
    cooldownYears: 15,
    outcomes: [
      {
        id: 'into-the-wheat',
        w: 0.4,
        text: '第三次试飞，铁鸟离地不到两米，左翼的帆布先撕裂，接着整台机器栽进麦田。{backer}站在田埂上，帽子被风刮走也没有去捡。{mechanic}从残骸里拖出{subject}，一条腿以不自然的角度弯着，八克朗修理费当场记在账上。围观的人开始笑，后来不笑了，因为{subject}还在试着把螺旋桨扶正。',
        significance: 0.84,
        followup: { sceneId: 'r14-spec.bureaucracy-mistake', delayMonths: 2 },
        fx: {
          cash: -8,
          health: -0.08,
          reputation: -0.1,
          relation: ['backer', 'rival', -0.2, 0],
          flag: 'spec14_machine_failed',
          mood: -0.12,
          knowledge: ['the left wing strut was made of the wrong gauge of wire', 0.85, 'mechanic'],
        },
      },
      {
        id: 'four-minutes-over-the-field',
        w: 0.35,
        text: '铁鸟在麦田上飞了整整四分钟，落地时{mechanic}追着跑，帽子掉了两次。{backer}当场写下第二笔款子，说先去申请专利，再把机器卖给邮政。{subject}坐在机翼下，手还在抖，耳朵里全是风；{backer}塞来六克朗试飞费，那天晚上请了半条街的人喝酒。',
        significance: 0.82,
        fx: {
          cash: 6,
          reputation: 0.12,
          role: 'inventor',
          relation: ['backer', 'colleague', 0.15, 0],
          flag: 'spec14_machine_worked',
          mood: 0.1,
        },
      },
      {
        id: 'drawings-for-two-kronen',
        w: 0.25,
        text: '{subject}把图纸和模型一起卖给{backer}，换了两克朗和一张收据。{backer}说这机器还要改三年，改好了再请{subject}来看。{mechanic}把工具收进木箱，问以后还做不做。{subject}说做，但不再借钱做。回家的路上，{subject}看见自己的影子被路灯拉得很长，像一只还没起飞的鸟。',
        significance: 0.7,
        fx: {
          cash: 2,
          relation: ['backer', 'rival', -0.1, 0],
          flag: 'spec14_patent_sold',
          mood: -0.06,
          knowledge: ['the backer will keep the drawings and the patent', 0.8, 'backer'],
        },
      },
    ],
  },
]);
