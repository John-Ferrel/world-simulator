import type { EventEffect, Place, RoleRequirement, SceneCondition, SceneStage } from '../domain.js';
import type { GeneratedPack, GeneratedTaskMeta } from '../generated.js';

/**
 * A node brief is the structural contract the model fills with prose and
 * outcomes. Ids, roles, stage and rate stay authored here so generated JSON
 * can be cast and scheduled without trusting the model with runtime shape.
 */
export type ContentNodeBrief = {
  id: string;
  title: string;
  premise: string;
  weight?: number;
  rateShare?: number;
  tags?: string[];
  conditions?: SceneCondition[];
  roles: RoleRequirement[];
  /** Effect types this node may emit; keeps structural effects honest. */
  allowedEffects?: EventEffect['type'][];
  /** Tokens the prose must not use even if they appear in nearby templates. */
  forbiddenTokens?: string[];
  /** Fixed task metadata for active-task packs. */
  task?: GeneratedTaskMeta;
  outcomeHints: string[];
};

export type ContentFamilyBrief = Omit<GeneratedPack, 'nodes'> & {
  nodeBriefs: ContentNodeBrief[];
  /** Fixed seed residences a housing move may target. */
  allowedResidenceIds?: Place['id'][];
  forbidden?: string[];
};

const subject = (
  minAge: number,
  maxAge: number,
  sex?: RoleRequirement['sex'],
): RoleRequirement => ({
  key: 'subject',
  kind: 'subject',
  required: true,
  minAge,
  maxAge,
  ...(sex ? { sex } : {}),
});

const parent = (minAge = 30, maxAge = 60): RoleRequirement => ({
  key: 'parent',
  kind: 'parent',
  required: true,
  minAge,
  maxAge,
});

const neighbor = (minAge = 18, maxAge = 75, sex?: RoleRequirement['sex']): RoleRequirement => ({
  key: 'neighbor',
  kind: 'neighbor',
  required: true,
  minAge,
  maxAge,
  ...(sex ? { sex } : {}),
});

const teacher = (minAge = 25, maxAge = 65): RoleRequirement => ({
  key: 'teacher',
  kind: 'teacher',
  required: true,
  minAge,
  maxAge,
});

const partner = (minAge = 18, maxAge = 45, sameHousehold = false): RoleRequirement => ({
  key: 'partner',
  kind: 'partner',
  required: true,
  minAge,
  maxAge,
  ...(sameHousehold ? { sameHousehold: true } : {}),
});

const employer = (minAge = 30, maxAge = 70): RoleRequirement => ({
  key: 'employer',
  kind: 'employer',
  required: true,
  minAge,
  maxAge,
  organizationKind: 'factory',
});

const worker = (minAge = 18, maxAge = 60): RoleRequirement => ({
  key: 'worker',
  kind: 'worker',
  required: true,
  minAge,
  maxAge,
});

const official = (minAge = 25, maxAge = 65): RoleRequirement => ({
  key: 'official',
  kind: 'official',
  required: true,
  minAge,
  maxAge,
});

/**
 * The eight Phase-2 families. Each has exactly four nodes. The model writes
 * the outcomes and narration; roles, conditions and ids are fixed here.
 */
export const PHASE2_FAMILY_BRIEFS = [
  {
    id: 'vienna-youth-threshold',
    title: '十六岁前后的门槛',
    stage: 'adolescence' satisfies SceneStage,
    ageWindow: { min: 12, max: 17 },
    tags: ['adolescence', 'school', 'work', 'family', 'transition'],
    baseRate: 0.34,
    conditions: [{ kind: 'age', min: 12, max: 17 }],
    nodeBriefs: [
      {
        id: 'vienna-youth-threshold.school-leaving',
        title: '离开国民学校',
        premise:
          '学年最后一天，班主任把成绩单和离校证明交到少年手里。家里已经打听好印刷厂、杂货铺和夜校三条路，但没有一条是免费的。',
        weight: 1,
        rateShare: 0.3,
        conditions: [
          { kind: 'age', min: 12, max: 15 },
          { kind: 'education', in: ['primary'] },
        ],
        roles: [subject(12, 15), teacher()],
        allowedEffects: ['education', 'skill', 'cash', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '去印刷厂问工，约好下周试工，先不算正式雇用',
          '再读一年，准备商业学校考试',
          '留在家里照看弟妹，等下一个招工季',
        ],
      },
      {
        id: 'vienna-youth-threshold.first-wage',
        title: '第一只工资信封',
        premise:
          '少年在作坊干满一个月，工头把装着纸币和硬币的信封交给他。回家的路上要经过电车轨道、鞋铺和母亲常去的面包店。',
        weight: 1,
        rateShare: 0.3,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(13, 17), parent(32, 60), employer()],
        allowedEffects: ['cash', 'food', 'mood', 'relation', 'health', 'flag'],
        outcomeHints: [
          '把整只信封交给家里，只留下电车钱',
          '留下一半买一双不漏水的鞋',
          '和家里为钱的用法吵一架',
        ],
      },
      {
        id: 'vienna-youth-threshold.night-class',
        title: '夜校的座位',
        premise:
          '商业夜校在冬天开课，教师把课程表和书本费写在黑板上。少年白天要上工，晚上只有一张公共长桌和一盏煤气灯。',
        weight: 1,
        rateShare: 0.2,
        conditions: [{ kind: 'age', min: 14, max: 17 }],
        roles: [subject(14, 17), teacher(25, 65)],
        allowedEffects: ['education', 'skill', 'cash', 'mood', 'health', 'relation'],
        outcomeHints: [
          '报名夜校，用夜里的时间换一张证书',
          '为了加班费放弃座位',
          '借同学的笔记，自己在家抄',
        ],
      },
      {
        id: 'vienna-youth-threshold.sibling-departure',
        title: '兄姐的箱子',
        premise:
          '年长的兄姐要去下奥地利的工厂，或者跟同乡去汉堡上船。家里凑车票，半张床和一份工钱都要重新分配。',
        weight: 0.8,
        rateShare: 0.2,
        conditions: [{ kind: 'age', min: 12, max: 17 }],
        roles: [
          subject(12, 17),
          {
            key: 'sibling',
            kind: 'sibling',
            required: true,
            minAge: 17,
            maxAge: 26,
          },
        ],
        allowedEffects: ['cash', 'food', 'mood', 'relation', 'skill', 'health', 'flag'],
        outcomeHints: [
          '把攒下的零钱塞进兄姐的箱子',
          '接过空出来的床，也接过家里的账',
          '为谁该走、谁该留吵到深夜',
        ],
      },
    ],
  },
  {
    id: 'vienna-courtship-courtyard',
    title: '院子里的恋爱与分手',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 45 },
    tags: ['adulthood', 'courtship', 'partner', 'social', 'family'],
    baseRate: 0.24,
    conditions: [{ kind: 'age', min: 18, max: 45 }],
    nodeBriefs: [
      {
        id: 'vienna-courtship-courtyard.sunday-walk',
        title: '星期天的散步',
        premise:
          '星期天下午，两人沿着多瑙运河走，经过卖烤栗子的摊子和关着门的成衣店。走到第二个桥洞时，谁都没有先提下周还见不见。',
        weight: 1,
        rateShare: 0.3,
        conditions: [
          { kind: 'age', min: 18, max: 45 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(18, 45), partner(18, 45)],
        allowedEffects: ['relation', 'mood', 'reputation', 'cash', 'food', 'flag'],
        outcomeHints: [
          '约好下星期天还在同一座桥边见',
          '走进咖啡馆，各自付了自己的那杯',
          '在桥洞前分开，之后没有再提',
        ],
      },
      {
        id: 'vienna-courtship-courtyard.letter-answer',
        title: '没有回音的信',
        premise:
          '一封折成四折的信从门缝底下塞进来，或者迟迟没有来。写信的人知道对方住在哪条街，却不知道对方家里谁先拆信。',
        weight: 1,
        rateShare: 0.25,
        conditions: [
          { kind: 'age', min: 18, max: 45 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(18, 45), partner(18, 45), neighbor(18, 70)],
        allowedEffects: ['relation', 'mood', 'reputation', 'cash', 'flag'],
        outcomeHints: [
          '收到回信，约在街角的面包店见面',
          '信被对方的母亲先拆了，话传得很难听',
          '把信烧掉，不再等回音',
        ],
      },
      {
        id: 'vienna-courtship-courtyard.family-table',
        title: '见家长的一顿饭',
        premise:
          '星期天中午，桌上摆着汤、煮牛肉和一小碟芥末。对方的父亲问工钱、问房租、问以后住哪一间房；母亲把最好的一块肉推过来。',
        weight: 0.9,
        rateShare: 0.25,
        conditions: [
          { kind: 'age', min: 18, max: 45 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(18, 45), partner(18, 45), parent(40, 70)],
        allowedEffects: ['relation', 'mood', 'reputation', 'cash', 'food', 'flag'],
        outcomeHints: [
          '长辈点头，但要求先攒够一套锅碗',
          '被问到工钱时答不上来，饭桌冷下来',
          '两人提前离席，在楼梯间说清楚',
        ],
      },
      {
        id: 'vienna-courtship-courtyard.breakup',
        title: '院子里的分手',
        premise:
          '两人已经一起走过几个季节，现在要把钥匙、照片和一件借来的外套还清。院子里晾着床单，楼上有人把窗户推开又关上。',
        weight: 0.7,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 18, max: 45 },
          { kind: 'hasRelation', relationKind: 'partner' },
        ],
        roles: [subject(18, 45), partner(18, 45), neighbor(18, 70)],
        allowedEffects: ['relation', 'relation_end', 'mood', 'reputation', 'cash', 'flag'],
        outcomeHints: [
          '把关系结束，各自搬回自己的住处',
          '因为房租和习惯继续在一起，但不再提以后',
          '在院子里吵开，邻居听见了全部',
        ],
      },
    ],
  },
  {
    id: 'vienna-housing-move',
    title: '涨租、看房与搬家',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 70 },
    tags: ['housing', 'home', 'rent', 'family', 'money'],
    baseRate: 0.28,
    conditions: [{ kind: 'placeKind', in: ['home'] }],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      {
        id: 'vienna-housing-move.rent-notice',
        title: '门缝里的涨租通知',
        premise:
          '一张折起来的纸从门缝塞进来：下个月起房租涨两克朗，理由是修了楼梯间的窗户。房东本人不露面，只让楼下的看门人传话。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 70), neighbor(25, 75)],
        allowedEffects: ['cash', 'food', 'mood', 'health', 'relation', 'flag'],
        outcomeHints: [
          '按月付上涨的房租，先把冬天熬过去',
          '要求先修好漏水的墙，再谈涨租',
          '和同楼的住户一起去找房东',
        ],
      },
      {
        id: 'vienna-housing-move.flat-viewing',
        title: '看一间更小的房',
        premise:
          '看门人带人穿过两道上锁的门，去看一间朝北的单间。窗户对着通风井，墙纸下有潮气，但租金比现在少三克朗。',
        weight: 1,
        rateShare: 0.3,
        conditions: [
          { kind: 'placeKind', in: ['home'] },
          { kind: 'householdSize', min: 4 },
        ],
        roles: [subject(18, 70), neighbor(25, 75)],
        allowedEffects: ['cash', 'food', 'mood', 'health', 'relation', 'residence', 'flag'],
        outcomeHints: [
          '当场付定金，搬进利奥波德城的合租房',
          '嫌潮气太重，继续找下一间',
          '先租下床位，把家人留在旧住处',
        ],
      },
      {
        id: 'vienna-housing-move.moving-day',
        title: '搬家那天的箱子',
        premise:
          '搬家定在月初，借来的手推车只能装三趟。床架、煤箱、锅和一只装照片的铁盒都要下楼，楼道里还堆着别人的自行车。',
        weight: 0.9,
        rateShare: 0.2,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 70), neighbor(18, 75)],
        allowedEffects: ['cash', 'food', 'mood', 'health', 'relation', 'residence', 'flag'],
        outcomeHints: [
          '雇一辆马车，把东西一次拉到新住处',
          '和邻居用手推车搬三趟，省下运费',
          '把旧家具卖给收破烂的，只带走箱子',
        ],
      },
      {
        id: 'vienna-housing-move.sublet-room',
        title: '把空床租出去',
        premise:
          '空出来的那张床可以租给一个学徒或独身工人。租金能补上房租，但厨房、钥匙、作息和名声都要重新谈。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'placeKind', in: ['home'] },
          { kind: 'overcrowded', value: false },
        ],
        roles: [subject(18, 70), worker(18, 60), neighbor(18, 75)],
        allowedEffects: ['cash', 'food', 'mood', 'health', 'relation', 'household', 'flag'],
        outcomeHints: [
          '让学徒搬进来，按月收床位钱',
          '只出租白天，夜里不留人',
          '被邻居提醒风险后反悔',
        ],
      },
    ],
  },
  {
    id: 'vienna-medical-treatment',
    title: '诊所、医院与药费',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 75 },
    tags: ['health', 'medical', 'family', 'money'],
    baseRate: 0.3,
    conditions: [{ kind: 'health', max: 0.92 }],
    nodeBriefs: [
      {
        id: 'vienna-medical-treatment.night-fever',
        title: '夜里的高烧',
        premise:
          '入夜后体温升到说胡话，床单被汗浸透。家里只有湿布、醋水和半瓶退烧药；去综合医院要坐电车，还要先交一笔押金。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'health', max: 0.75 }],
        roles: [subject(18, 75), neighbor(25, 75)],
        allowedEffects: ['health', 'condition', 'cash', 'food', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '连夜去综合医院，交押金并留下观察',
          '请街角医生上门，开药粉并嘱咐卧床',
          '用湿布熬到天亮，省下诊费',
        ],
      },
      {
        id: 'vienna-medical-treatment.toothache',
        title: '拔牙的价钱',
        premise:
          '半边脸肿了三天，牙神经一跳一跳。牙医按颗收费，拔牙、补牙和止痛药水各有各的价；街角理发师也能用钳子解决。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'age', min: 18, max: 75 }],
        roles: [subject(18, 75), neighbor(25, 75)],
        allowedEffects: ['health', 'condition', 'cash', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '去牙医那里拔掉，付钱并咬住纱布',
          '找理发师用钳子拔，省下一半',
          '买止痛药水，继续忍着',
        ],
      },
      {
        id: 'vienna-medical-treatment.work-injury',
        title: '冲床咬住手指',
        premise:
          '机器的护罩少了一颗螺丝，手指被压住，工头先关机器再骂人。厂里说可以去医院，但当天工时和这个月的奖金要另算。',
        weight: 0.9,
        rateShare: 0.25,
        conditions: [
          { kind: 'age', min: 18, max: 65 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [subject(18, 65), employer(), worker(18, 60)],
        allowedEffects: ['health', 'condition', 'cash', 'mood', 'relation', 'unemployment', 'flag'],
        outcomeHints: [
          '去医院缝合，让厂里出医药费',
          '让工头用干净布包一下，继续上工',
          '和工友一起去找工会代表',
        ],
      },
      {
        id: 'vienna-medical-treatment.sanatorium',
        title: '疗养院的车票',
        premise:
          '咳嗽拖了两个月，诊所拍片后说肺尖有阴影。疗养院在城外的松树林边，车票、住宿和证明都要自己先垫。',
        weight: 0.7,
        rateShare: 0.2,
        conditions: [{ kind: 'health', max: 0.65 }],
        roles: [subject(18, 75), neighbor(25, 75)],
        allowedEffects: ['health', 'condition', 'cash', 'food', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '买票去疗养院，把屋子托给邻居照看',
          '留在家里休养，靠邻居送饭',
          '把诊断书收进抽屉，继续上工',
        ],
      },
    ],
  },
  {
    id: 'vienna-parish-aid',
    title: '教区、互助会与最后一篮煤',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 80 },
    tags: ['faith', 'parish', 'mutual_aid', 'poverty', 'family'],
    baseRate: 0.22,
    conditions: [{ kind: 'placeKind', in: ['home', 'church'] }],
    nodeBriefs: [
      {
        id: 'vienna-parish-aid.rent-box',
        title: '圣文森特会的门铃',
        premise:
          '教区互助会的访客提着篮子站在门口，篮里有面包、豆子和一小袋煤。她们先问家里几口人，再问这个月房租还差多少。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 80), neighbor(30, 75)],
        allowedEffects: ['food', 'cash', 'mood', 'relation', 'skill', 'flag'],
        outcomeHints: [
          '收下面包和煤，在册子上按下手印',
          '只收食物，请她们帮忙介绍零工',
          '说自己还能撑，把篮子推回去',
        ],
      },
      {
        id: 'vienna-parish-aid.funeral-society',
        title: '丧葬互助会的会费',
        premise:
          '互助会每月收几赫勒，谁家死了人就从公账里出棺材和弥撒钱。收会费的人站在楼梯口，手里翻着写满名字的蓝皮本。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'placeKind', in: ['home', 'church'] }],
        roles: [subject(18, 80), neighbor(30, 75)],
        allowedEffects: ['cash', 'food', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '按周交会费，把名字留在蓝皮本上',
          '这个月先欠着，等发工钱再补',
          '退出互助会，把钱留给煤和面包',
        ],
      },
      {
        id: 'vienna-parish-aid.soup-kitchen',
        title: '汤厨房的长队',
        premise:
          '教堂侧门在十一点开，队伍沿墙根排到街角。每人一只碗，孩子可以多领半勺；修女记得谁家上个月来过。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'placeKind', in: ['home', 'church'] }],
        roles: [subject(18, 80), neighbor(18, 70)],
        allowedEffects: ['food', 'cash', 'mood', 'relation', 'skill', 'health', 'flag'],
        outcomeHints: [
          '领一碗汤，再替家里带一罐回去',
          '留下来帮修女洗锅，换一顿午饭',
          '看见熟人排在前面，转身离开',
        ],
      },
      {
        id: 'vienna-parish-aid.sick-call',
        title: '给病人送药',
        premise:
          '教区听说楼上有户人家病了，让邻居带一包药粉和半块肥皂去看看。病人家里没有男人，炉子也快灭了。',
        weight: 0.8,
        rateShare: 0.2,
        conditions: [{ kind: 'placeKind', in: ['home', 'church'] }],
        roles: [subject(18, 80), neighbor(25, 75)],
        allowedEffects: ['food', 'cash', 'health', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '上楼帮忙生火、煮粥，把药钱垫上',
          '只把药包交给门口的孩子',
          '请神父或修女一起上门',
        ],
      },
    ],
  },
  {
    id: 'vienna-market-debt',
    title: '赊账、当铺与债主',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 70 },
    tags: ['market', 'debt', 'money', 'home', 'shop'],
    baseRate: 0.26,
    conditions: [{ kind: 'cash', max: 35 }],
    nodeBriefs: [
      {
        id: 'vienna-market-debt.pawn-watch',
        title: '当掉父亲的表',
        premise:
          '当铺的柜台很高，托盘上垫着绒布。银壳怀表能当八克朗，赎当的期限写在窄窄的票上；逾期不赎，表就归柜台上的人。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'cash', max: 30 }],
        roles: [subject(18, 70), neighbor(25, 75)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'flag'],
        outcomeHints: ['当掉怀表，拿钱先付房租', '只当表链，留住表壳', '把表放回口袋，去别处借钱'],
      },
      {
        id: 'vienna-market-debt.coal-credit',
        title: '煤店的赊账本',
        premise:
          '煤店的账本摊在秤旁边，上一页还有没划掉的旧账。老板只肯赊半筐煤，要求下个发薪日连本带利一起还。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'cash', max: 25 }],
        roles: [subject(18, 70), neighbor(25, 75)],
        allowedEffects: ['cash', 'food', 'health', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '赊半筐煤，把账记在自己名下',
          '先付一半，剩下的用旧家具抵',
          '不赊了，去火车站捡煤渣',
        ],
      },
      {
        id: 'vienna-market-debt.rent-arrears',
        title: '房东的最后一张纸条',
        premise:
          '门缝里塞进第三张纸条：欠租两周，月底前不清就换锁。楼道里的邻居都看见了，看门人开始把垃圾桶挪到别处。',
        weight: 0.9,
        rateShare: 0.25,
        conditions: [{ kind: 'cash', max: 20 }],
        roles: [subject(18, 70), neighbor(30, 75)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'health', 'flag'],
        outcomeHints: [
          '向工友借钱，先把欠租补齐',
          '和房东谈分期，写下还款日期',
          '把家具卖给收旧货的，准备搬走',
        ],
      },
      {
        id: 'vienna-market-debt.wage-garnishment',
        title: '工资袋里的扣款',
        premise:
          '发薪日，工头从工资袋里抽走一部分，说债主已经拿着字据找过厂里。剩下的钱不够付房租，也不够买下个月的煤。',
        weight: 0.8,
        rateShare: 0.2,
        conditions: [
          { kind: 'cash', max: 30 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 65), employer(), worker(18, 60)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'flag'],
        outcomeHints: [
          '接受扣款，先保住工作',
          '找债主重写欠条，拉长还款期',
          '和工友一起去找工会代表',
        ],
      },
    ],
  },
  {
    id: 'vienna-women-housework',
    title: '洗衣、炉子与计件活',
    stage: 'adulthood' satisfies SceneStage,
    ageWindow: { min: 18, max: 70 },
    tags: ['gender', 'housework', 'home', 'labour', 'family'],
    baseRate: 0.3,
    conditions: [{ kind: 'placeKind', in: ['home'] }],
    nodeBriefs: [
      {
        id: 'vienna-women-housework.wash-day',
        title: '公共水龙头前的洗衣日',
        premise:
          '星期一的水龙头前排着木盆和铁桶，热水要自己在灶上烧。床单、衬衣和男人的工服都泡在碱水里，手指很快裂开。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 70, 'female'), neighbor(18, 75, 'female')],
        allowedEffects: ['health', 'cash', 'mood', 'reputation', 'relation', 'flag'],
        outcomeHints: [
          '抢在中午前洗完，把床单晾到院子里',
          '把工服送给洗衣妇，付钱换半天时间',
          '为水龙头的顺序和邻居吵起来',
        ],
      },
      {
        id: 'vienna-women-housework.coal-stove',
        title: '炉子灭了',
        premise:
          '早晨的炉子只剩一层灰，火柴受潮，煤筐见了底。孩子要吃饭，男人的工服还没干，屋里的水汽结在窗上。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 70, 'female'), neighbor(18, 75)],
        allowedEffects: ['cash', 'food', 'health', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '去煤店买一小筐煤，先把炉子生起来',
          '端一只旧锅去邻居家借火',
          '用旧报纸和木片凑合，屋里冷一天',
        ],
      },
      {
        id: 'vienna-women-housework.piecework-bundle',
        title: '一捆衬衫领子',
        premise:
          '中间人送来一捆裁好的领子，做完一件给几赫勒，线和服务自己出。交活时要用尺子量针脚，返工的不算钱。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [subject(18, 70, 'female'), worker(18, 60), neighbor(18, 75)],
        allowedEffects: ['cash', 'health', 'mood', 'reputation', 'relation', 'flag'],
        outcomeHints: [
          '连夜做完一捆，赶在星期六交活',
          '发现工价被压低，和中间人争',
          '把做坏的领子藏在篮底，先交好的',
        ],
      },
      {
        id: 'vienna-women-housework.care-old-parent',
        title: '床边的一碗汤',
        premise:
          '年老的母亲搬来同住，夜里要人扶着去厕所，白天要喝汤吃药。家里的计件活、洗衣和炉子都落在一个人身上。',
        weight: 0.8,
        rateShare: 0.2,
        conditions: [{ kind: 'placeKind', in: ['home'] }],
        roles: [
          subject(25, 70, 'female'),
          {
            key: 'mother',
            kind: 'parent',
            required: true,
            minAge: 55,
            maxAge: 90,
            sex: 'female',
          },
          neighbor(18, 75),
        ],
        allowedEffects: ['cash', 'food', 'health', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '自己守着，少接一捆计件活',
          '请邻居白天来搭把手，付一点钱',
          '把母亲送去医院或养老院，先凑费用',
        ],
      },
    ],
  },
  {
    id: 'vienna-elder-bereavement',
    title: '晚年、葬礼与空下来的房间',
    stage: 'elderhood' satisfies SceneStage,
    ageWindow: { min: 60, max: 90 },
    tags: ['elderhood', 'bereavement', 'family', 'health', 'memory', 'housing'],
    baseRate: 0.2,
    conditions: [{ kind: 'age', min: 60, max: 90 }],
    allowedResidenceIds: ['place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      {
        id: 'vienna-elder-bereavement.spouse-death',
        title: '床边的最后一夜',
        premise:
          '同住多年的伴侣在夜里呼吸变浅，手脚发凉。家里没有电话，最近的医生在两条街外；桌上还摆着没吃完的晚饭。',
        weight: 0.8,
        rateShare: 0.25,
        conditions: [
          { kind: 'age', min: 60, max: 90 },
          { kind: 'hasRelation', relationKind: 'partner' },
        ],
        roles: [subject(60, 90), partner(60, 90, true), neighbor(30, 80)],
        allowedEffects: ['death', 'estate', 'mood', 'health', 'cash', 'relation', 'flag'],
        outcomeHints: [
          '守到天亮，请邻居去叫医生和神父',
          '连夜敲开医生的门，但人已经走了',
          '握着伴侣的手，把最后的话听完',
        ],
      },
      {
        id: 'vienna-elder-bereavement.old-colleague-funeral',
        title: '老同事的讣告',
        premise:
          '印刷厂的老同事去世，讣告贴在工会活动室的门口。葬礼在星期天下午，去的人要自己买黑纱，或者只带一束便宜的花。',
        weight: 0.9,
        rateShare: 0.25,
        conditions: [{ kind: 'age', min: 60, max: 90 }],
        roles: [subject(60, 90), worker(55, 85), neighbor(30, 80)],
        allowedEffects: ['death', 'cash', 'food', 'mood', 'relation', 'flag'],
        outcomeHints: [
          '去墓地送一程，在工会簿上签名',
          '托邻居带去一束花，自己留在家里',
          '在葬礼后陪遗属清点工具和工票',
        ],
      },
      {
        id: 'vienna-elder-bereavement.empty-room',
        title: '空下来的房间',
        premise:
          '同住的人走后，房间里多出一张空床、一只旧箱子和一副不再有人戴的眼镜。房租还在，煤也还要买。',
        weight: 1,
        rateShare: 0.3,
        conditions: [{ kind: 'age', min: 65, max: 90 }],
        roles: [subject(65, 90), neighbor(18, 70)],
        allowedEffects: [
          'cash',
          'food',
          'mood',
          'health',
          'relation',
          'household',
          'residence',
          'flag',
        ],
        forbiddenTokens: ['partner'],
        outcomeHints: [
          '把空床租给一个年轻工人，家里重新有动静',
          '搬去城外亲戚家，把旧家具处理掉',
          '保留房间原样，每天擦一遍桌子',
        ],
      },
      {
        id: 'vienna-elder-bereavement.grave-visit',
        title: '公墓里的星期天',
        premise:
          '星期天的公墓门口卖蜡烛、常春藤和一小把丁香。墓碑上的字被雨水冲淡，守墓人记得每一排住过谁。',
        weight: 0.8,
        rateShare: 0.2,
        conditions: [{ kind: 'age', min: 60, max: 90 }],
        roles: [subject(60, 90), neighbor(30, 80)],
        allowedEffects: ['cash', 'food', 'mood', 'health', 'relation', 'flag'],
        outcomeHints: [
          '自己擦碑、换蜡烛，坐一会儿再走',
          '付钱请守墓人照料墓地',
          '走到门口又折返，没有进去',
        ],
      },
    ],
  },
] satisfies ContentFamilyBrief[];

export function briefById(id: string): ContentFamilyBrief | undefined {
  return PHASE2_FAMILY_BRIEFS.find((brief) => brief.id === id);
}
