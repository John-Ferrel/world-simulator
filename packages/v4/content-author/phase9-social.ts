import type { ContentFamilyBrief } from './briefs.js';
import type {
  EventEffect,
  PersonAgencyGoal,
  PersonLife,
  RoleRequirement,
  TaskDomain,
  TaskNeed,
} from '../domain.js';
import type { GeneratedTaskMeta } from '../generated.js';

/**
 * Phase 9 social-life briefs.
 *
 * Three event packs (courtship, family conflict/care, tenement neighbours) and
 * two active-task packs (relationship initiative, daily culture). The event
 * packs keep the yearly rate; the task packs are offered through Agency.
 *
 * Runtime caveat: scenes and tasks are bucketed by `stageForAge`, so a pack has
 * one lifecycle stage. The requested 17-40, 16-80 and 18-80 windows therefore
 * keep those exact pack age windows, but the adulthood slice means the
 * effective runtime window is 18-59 except where the engine separately provides
 * adolescence or elderhood content.
 *
 * Role kinds are the domain vocabulary. `friend` and `kin` are relation kinds,
 * not role kinds, so those roles are cast as `neighbor` with explicit keys; a
 * `hasRelation` condition makes the relationship real where the scene needs it.
 */

type Skill = keyof PersonLife['skills'];

const role = (
  key: string,
  kind: RoleRequirement['kind'],
  minAge: number,
  maxAge: number,
  required = true,
  extra: Partial<RoleRequirement> = {},
): RoleRequirement => ({ key, kind, required, minAge, maxAge, ...extra });

const subject = (minAge: number, maxAge: number): RoleRequirement =>
  role('subject', 'subject', minAge, maxAge);
const partner = (minAge = 17, maxAge = 45, required = true): RoleRequirement =>
  role('partner', 'partner', minAge, maxAge, required);
const friend = (minAge = 17, maxAge = 45, required = true): RoleRequirement =>
  role('friend', 'neighbor', minAge, maxAge, required);
const friendB = (minAge = 17, maxAge = 45, required = true): RoleRequirement =>
  role('friendB', 'neighbor', minAge, maxAge, required);
const neighbor = (minAge = 18, maxAge = 80, required = true): RoleRequirement =>
  role('neighbor', 'neighbor', minAge, maxAge, required);
const neighborB = (minAge = 18, maxAge = 80, required = true): RoleRequirement =>
  role('neighborB', 'neighbor', minAge, maxAge, required);
const kin = (minAge = 18, maxAge = 80, required = true): RoleRequirement =>
  role('kin', 'neighbor', minAge, maxAge, required);
const sibling = (minAge = 18, maxAge = 75, required = true): RoleRequirement =>
  role('sibling', 'sibling', minAge, maxAge, required);
const parent = (minAge = 45, maxAge = 95, required = true): RoleRequirement =>
  role('parent', 'parent', minAge, maxAge, required);
const worker = (minAge = 18, maxAge = 65, required = true): RoleRequirement =>
  role('worker', 'worker', minAge, maxAge, required);
const official = (minAge = 30, maxAge = 65, required = true): RoleRequirement =>
  role('official', 'official', minAge, maxAge, required);
const teacher = (minAge = 25, maxAge = 65, required = true): RoleRequirement =>
  role('teacher', 'teacher', minAge, maxAge, required);

function task(
  domain: TaskDomain,
  goals: PersonAgencyGoal[],
  needs: TaskNeed[],
  baseUtility: number,
  risk: number,
  skills: Skill[] = [],
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills };
}

const socialEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'relation',
  'relation_end',
];
const householdEffects: EventEffect['type'][] = [
  ...socialEffects,
  'move',
  'household',
  'residence',
  'role',
];
const familyMoneyEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'flag',
];
const neighbourEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'flag',
];

export const PHASE9_SOCIAL_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-social-courtship-friendship',
    kind: 'event',
    title: '第一次照面、友人的周旋与一场回绝',
    stage: 'adulthood',
    ageWindow: { min: 17, max: 40 },
    tags: ['courtship', 'friendship', 'social', 'adulthood', 'reputation', 'leopoldstadt'],
    baseRate: 0.22,
    conditions: [{ kind: 'age', min: 17, max: 40 }],
    nodeBriefs: [
      {
        id: 'p9-social-courtship-friendship.fasching-dance',
        title: '狂欢节舞会上的第一支舞',
        premise:
          '利奥波德城一家酒馆的二楼在狂欢节最后一周办舞会，入场三十赫勒，大衣和围巾交给老板娘看管。乐队只有三个人，奏完一支波尔卡就停下来收小费；对方由家里的姑母陪着坐在靠墙的长凳上，舞卡还空着。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
          { kind: 'cash', min: 1 },
        ],
        roles: [subject(17, 40), partner(17, 40), friend(17, 45)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '请对方跳下一支波尔卡，散场时问到对方住在哪条街',
          '只隔着人群看了几眼，回程时托同来的友人去打听',
          '在衣帽间替对方找回被拿错的围巾，借机说了第一句话',
        ],
      },
      {
        id: 'p9-social-courtship-friendship.friend-intercession',
        title: '友人在面包店门口把人拦住',
        premise:
          '友人听说对方家里正在打听这门亲事，自作主张在面包店门口把人拦下，替当事人说了许多好话。对方母亲站在几步外，手里的网兜装着 Semmel 和盐；友人回来时只说“成了三分”，却不肯讲到底夸了什么。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
          { kind: 'hasRelation', relationKind: 'friend', minTrust: 0.15 },
        ],
        roles: [subject(17, 40), friend(17, 50), partner(17, 40)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '让友人正式去对方家里问一次，自己留在家里等回话',
          '嫌友人说过了头，亲自上门解释，反而把话说僵',
          '托友人带去一张星期天音乐会的票，不再让第三人传话',
        ],
      },
      {
        id: 'p9-social-courtship-friendship.opened-letter',
        title: '被拆开的信',
        premise:
          '一封信从门缝塞进来，信封上只写了街名和门牌。合租的走廊里谁都能看见，最后是房东的侄女把信拆开，又照着听来的意思讲了一遍；等话传到当事人耳里，已经变成对方家里嫌他工钱少。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(17, 40), partner(17, 40), neighbor(18, 70)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '当晚走到对方家楼下，请看门人把原信送上去',
          '相信听来的话，把回信写得又短又冷',
          '请友人把两人约到教堂前的台阶上，当面把信读完',
        ],
      },
      {
        id: 'p9-social-courtship-friendship.rival-at-table',
        title: '骑自行车来的另一位客人',
        premise:
          '星期天下午，对方家里已经有客人。来人在区公所做事，穿硬领，骑一辆新自行车，车铃在院子里响了两声；他带了一盒糖果，还会弹客厅里的钢琴。主人把最好的椅子让给他，把旧椅子留给了后来的人。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(17, 40), partner(17, 40), neighbor(18, 45)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '留下来吃完点心，当着主人的面约对方下星期去普拉特',
          '把带来的便宜花放下就走，第二天不再登门',
          '去打听那位助理的薪水和住处，再决定还要不要争',
        ],
      },
      {
        id: 'p9-social-courtship-friendship.kahlenberg-sunday',
        title: '星期天的卡伦山',
        premise:
          '八月的星期天，两人搭电车到格林青，再沿葡萄园间的路往上走。对方带了一位友人同行，篮子里有面包、盐和半瓶水；山道上尽是穿礼拜服的家庭，谁停下来歇脚，旁人都看得见。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
          { kind: 'cash', min: 4 },
        ],
        roles: [subject(17, 40), partner(17, 40), friend(17, 45)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '在山顶的观景台请两人喝汽水，回程的电车票也一并买了',
          '走到半山就下雨，三人挤在酒农的棚子下分完面包',
          '因为对方与友人一路说笑，回程时没有再开口',
        ],
      },
      {
        id: 'p9-social-courtship-friendship.returned-sugar-box',
        title: '退回的糖盒',
        premise:
          '提亲的话已经由介绍人带到，对方家里没有当场回绝，只说“再商量”。三天后，介绍人把糖盒和一张写得很客气的纸条送回来；母亲把糖盒放在桌上，父亲问是不是工钱的事，屋里没有人先动晚饭。',
        weight: 0.8,
        rateShare: 0.12,
        conditions: [
          { kind: 'age', min: 17, max: 40 },
          { kind: 'notHasRelation', relationKind: 'partner' },
        ],
        roles: [subject(17, 40), partner(17, 40), parent(45, 90, false), neighbor(35, 70)],
        allowedEffects: socialEffects,
        outcomeHints: [
          '把糖盒原样收进柜子，托介绍人再去问一次原因',
          '亲自去对方家，把话说清后不再登门',
          '接受回绝，第二天照常上工，只把那张纸条留着',
        ],
      },
    ],
  },
  {
    id: 'p9-social-family-conflict-care',
    kind: 'event',
    title: '兄弟姐妹、病床与一张房契',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    tags: ['family', 'care', 'siblings', 'inheritance', 'housing', 'money'],
    baseRate: 0.2,
    conditions: [{ kind: 'age', min: 18, max: 70 }],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      {
        id: 'p9-social-family-conflict-care.sibling-medicine-bill',
        title: '母亲药费的分摊',
        premise:
          '母亲的药费单压在厨房的糖罐底下，一共十四克朗。大哥说按月分摊，二姐说上次住院的钱还没有算清；桌上摆着三只咖啡杯和一本写满数字的旧练习本，窗外收废品的车正经过。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 18, max: 70 },
          { kind: 'cash', max: 60 },
        ],
        roles: [subject(18, 70), sibling(18, 75), parent(55, 95, false)],
        allowedEffects: familyMoneyEffects,
        outcomeHints: [
          '按人头平摊，把每人该付的数目写在练习本上',
          '自己先垫上，条件是以后母亲的房间归自己照看',
          '拒绝再出钱，把药费单推回桌子中央',
        ],
      },
      {
        id: 'p9-social-family-conflict-care.sick-parent-night',
        title: '夜里的药粉和便盆',
        premise:
          '父亲从秋天起咳得厉害，医生说肺尖有阴影，要静养，也要有人夜里扶他起身。屋里只有一只便盆、一盏煤油灯和半包药粉；白天还得有人去上工，床边的椅子已经坐塌了一边。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 18, max: 70 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
        ],
        roles: [subject(18, 70), parent(55, 95), sibling(18, 75, false), neighbor(30, 75, false)],
        allowedEffects: householdEffects,
        outcomeHints: [
          '与兄妹轮班守夜，把医生嘱咐的休息天数写在门后',
          '请邻居白天来照看，付她每天的饭钱和煤钱',
          '把父亲送进医院，自己留下来凑押金和住院用品',
        ],
      },
      {
        id: 'p9-social-family-conflict-care.school-fork',
        title: '国民学校毕业后的岔路',
        premise:
          '孩子拿回一张国民学校的毕业成绩单，班主任在背面写了两种去处：继续读市民学校，或者去印刷厂做学徒。市民学校要交书本费和服装费，学徒却能立刻带回一点工钱；母亲把两张纸都压在桌布下面。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 28, max: 55 },
          { kind: 'householdSize', min: 3 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'cash', max: 80 },
        ],
        roles: [subject(28, 55), teacher(25, 65), official(30, 65, false)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        outcomeHints: [
          '咬牙交上市民学校的书本费，把家里的肉钱减半',
          '让孩子去印刷厂做学徒，先换来一张工资袋',
          '去学校问减免和奖学金，把决定拖到开学前一周',
        ],
      },
      {
        id: 'p9-social-family-conflict-care.notary-inheritance',
        title: '公证人桌上的房契',
        premise:
          '父亲还活着，却要把那间带院子的房子提前分清楚。公证人的桌上摊着房契、修缮账和一张写了一半的遗嘱；大哥说自己出过修屋顶的钱，二姐说自己照顾了卧病的母亲两年，墨水瓶旁边堆着三把不同的钥匙。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 25, max: 70 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
        ],
        roles: [subject(25, 70), sibling(25, 75), parent(60, 95), official(30, 65)],
        allowedEffects: [
          'cash',
          'mood',
          'reputation',
          'relation',
          'relation_end',
          'flag',
          'household',
        ],
        outcomeHints: [
          '在公证人面前签下放弃继承的声明，换一笔现钱',
          '要求先把修屋顶和照护的账算清，再谈房子归谁',
          '不签字，把文件留在公证人那里，等父亲自己改主意',
        ],
      },
      {
        id: 'p9-social-family-conflict-care.cousin-bed',
        title: '表亲提着藤箱进门',
        premise:
          '一个从下奥地利来的表亲提着藤箱站在门口，说城里的活计黄了，想借住几个星期。家里只有一间半房，厨房的行军床白天要收起，夜里才能铺开；楼道里的看门人已经开始问这箱子是谁的。',
        weight: 0.9,
        rateShare: 0.15,
        conditions: [
          { kind: 'age', min: 18, max: 70 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
          { kind: 'overcrowded', value: false },
          { kind: 'householdSize', max: 5 },
        ],
        roles: [subject(18, 70), kin(18, 75), sibling(18, 75, false)],
        allowedEffects: householdEffects,
        outcomeHints: [
          '让表亲睡厨房的行军床，按月收一点饭钱',
          '只答应住三天，托人打听便宜的床位',
          '直说家里腾不出地方，塞给对方车费和一块面包',
        ],
      },
      {
        id: 'p9-social-family-conflict-care.christmas-soup',
        title: '圣诞节前的一锅汤',
        premise:
          '为分摊药费吵翻以后，兄妹已经三个月没有同坐一张桌子。圣诞节前的星期天，母亲留下的汤锅被端出来，里面只有扁豆、面粉团和一小块熏肉；桌边多摆了一把椅子，谁也没有先坐下。',
        weight: 0.8,
        rateShare: 0.15,
        conditions: [
          { kind: 'age', min: 25, max: 70 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.05 },
        ],
        roles: [subject(25, 70), sibling(25, 75), parent(55, 95, false)],
        allowedEffects: familyMoneyEffects,
        outcomeHints: [
          '先给兄妹盛一碗，把药费的事留到吃完再说',
          '把旧账本摊在桌上，要求当场算清才肯坐下',
          '只送来一罐果酱，没有进门，算是先递个话',
        ],
      },
    ],
  },
  {
    id: 'p9-social-tenement-neighbors',
    kind: 'event',
    title: '公共厨房、晾衣绳与楼梯间的话',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 80 },
    tags: ['housing', 'neighbors', 'tenement', 'daily', 'money', 'reputation'],
    baseRate: 0.24,
    conditions: [
      { kind: 'age', min: 18, max: 80 },
      { kind: 'placeKind', in: ['home'] },
    ],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      {
        id: 'p9-social-tenement-neighbors.stove-and-line',
        title: '星期一早晨的炉子与晾衣绳',
        premise:
          '星期一，过道尽头的公共厨房从天亮起就没空过，四只洗衣盆沿墙排开。阁楼上的晾衣绳只够两家人用，三楼的床单已经搭在栏杆上；谁先烧热水、谁把湿衣服挪开，都要在楼梯间说清楚。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'householdSize', min: 2 },
        ],
        roles: [subject(18, 80), neighbor(18, 80), neighborB(18, 80, false)],
        allowedEffects: neighbourEffects,
        outcomeHints: [
          '按先来后到分炉子和绳子，把时辰写在厨房门后',
          '把自己的衣服挪到绳尾，换邻居帮忙看一会儿炉子',
          '为一条被挪开的床单吵起来，最后各自回屋生闷气',
        ],
      },
      {
        id: 'p9-social-tenement-neighbors.rent-note',
        title: '看门人送来的涨租纸条',
        premise:
          '看门人把一张折成四折的纸条塞进门缝：下个月起房租涨两克朗，理由是楼梯间的窗户换了玻璃。纸条上没有房东的签名，只有事务所的印章；楼下已经有两家在传，谁先去找房东谁就先被记下名字。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'cash', max: 50 },
        ],
        roles: [subject(18, 80), neighbor(25, 80), official(30, 65, false)],
        allowedEffects: householdEffects,
        outcomeHints: [
          '按月付上涨的房租，先从伙食里省出两克朗',
          '和同楼两家一起去找房东的事务所，要求先修窗户',
          '开始打听更便宜的床位，准备月底搬走',
        ],
      },
      {
        id: 'p9-social-tenement-neighbors.gramophone-wall',
        title: '院子上空的留声机',
        premise:
          '楼上新搬来的一户人家有一台留声机，晚饭后反复放同一支进行曲。院子四面都是墙，声音在晾衣绳和窗台之间打转；做夜班的印刷工刚躺下，隔壁的鞋匠又开始敲鞋跟，谁都说自己有理。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
        ],
        roles: [subject(18, 80), neighbor(18, 80)],
        allowedEffects: neighbourEffects,
        outcomeHints: [
          '上楼敲门，请他们把留声机挪离墙边，约好十点后不再放',
          '去找看门人，让房东在楼梯间贴一张作息告示',
          '忍到天亮，第二天买棉花塞耳朵，不再与楼上说话',
        ],
      },
      {
        id: 'p9-social-tenement-neighbors.flour-loan',
        title: '借出去的一袋面粉',
        premise:
          '隔壁的女人敲门，说这个月的面粉已经见底，想借一袋，等男人发薪就还。她手里拿着一只空口袋和一张写着上次借煤日期的小纸片；厨房的柜子里只剩两袋面粉和半罐猪油。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'cash', max: 40 },
        ],
        roles: [subject(18, 80), neighbor(18, 80)],
        allowedEffects: neighbourEffects,
        outcomeHints: [
          '把一袋面粉倒进她的口袋，说发薪再还',
          '只借半袋，要求把上次的煤钱一起记在纸上',
          '说自家也不够，关门前塞给她两块面包',
        ],
      },
      {
        id: 'p9-social-tenement-neighbors.evicted-neighbours',
        title: '三楼那家的箱子搬到了走廊',
        premise:
          '三楼的男人失了工，房东的事务所派人来收房。箱子、床架和一只煤箱堆在走廊里，女人坐在楼梯上给孩子喂水；看门人把大门钥匙收走，说明天早上之前必须腾空。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
          { kind: 'cash', max: 60 },
        ],
        roles: [subject(18, 80), neighbor(18, 80), official(30, 65, false)],
        allowedEffects: householdEffects,
        outcomeHints: [
          '先让他们把箱子搬进自家厨房，腾出一块干地方',
          '去区公所替他们问救济和临时床位，排一下午的队',
          '关上门，只从门缝递出一壶热水，不再多管',
        ],
      },
      {
        id: 'p9-social-tenement-neighbors.stairwell-rumor',
        title: '楼梯间传开的那句话',
        premise:
          '有人在洗衣房说，二楼新来的女房客夜里常有男人上楼；话从看门人的妻子传到面包店，又传回楼梯间。女房客白天在缝纫作坊上工，晚上替人改衣服，门口确实常有人来送活。',
        weight: 0.8,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 18, max: 80 },
          { kind: 'placeKind', in: ['home'] },
        ],
        roles: [subject(18, 80), neighbor(30, 80), neighborB(18, 80, false)],
        allowedEffects: ['mood', 'reputation', 'relation', 'relation_end', 'flag'],
        outcomeHints: [
          '在楼梯间当面问清来送活的人是谁，把话止住',
          '把听来的话又讲给面包店的人，第二天全楼都知道了',
          '不传话，只提醒女房客夜里把门闩好',
        ],
      },
    ],
  },
  {
    id: 'p9-social-relationship-initiative',
    kind: 'task',
    task: task('social', ['belonging', 'family'], ['belonging', 'autonomy'], 1.2, 0.25, ['social']),
    title: '开口、道歉与把两张床并到一间房里',
    stage: 'adulthood',
    ageWindow: { min: 17, max: 45 },
    tags: ['courtship', 'friendship', 'family', 'social', 'initiative', 'housing'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 17, max: 45 }],
    allowedResidenceIds: ['place-wien-leopoldstadt-tenement', 'place-klosterneuburg-aunt-house'],
    nodeBriefs: [
      {
        id: 'p9-social-relationship-initiative.invite-to-theatre',
        title: '请人去看星期天的轻歌剧',
        premise:
          '对方在书店柜台后站着，手边是一叠包好的乐谱。星期天下午的剧院还有楼座，票价比正厅少一半；但开口之前要先想好，是请对方一个人，还是连常同行的友人一起请。',
        conditions: [
          { kind: 'age', min: 17, max: 45 },
          { kind: 'notHasRelation', relationKind: 'partner' },
          { kind: 'cash', min: 3 },
        ],
        roles: [subject(17, 45), partner(17, 45), friend(17, 45, false)],
        allowedEffects: socialEffects,
        task: task('social', ['belonging'], ['belonging', 'autonomy'], 1.2, 0.2, ['social']),
        outcomeHints: [
          '买两张楼座票，约在剧院门口见，连对方的友人一起请',
          '只请对方沿多瑙运河散步，把票留在口袋里，等下一次再说',
          '话到嘴边改成问路，回家后写了一张没有署名的便条',
        ],
      },
      {
        id: 'p9-social-relationship-initiative.apology-at-bakery',
        title: '面包店门口的那句道歉',
        premise:
          '上次为一笔借出去的钱吵得很僵，对方已经两个星期不来往。面包店早上七点开门，对方每天来买一只 Semmel；道歉的话在嘴里练了几遍，手里还攥着一小束从市场买的紫罗兰。',
        conditions: [
          { kind: 'age', min: 17, max: 45 },
          { kind: 'hasRelation', relationKind: 'friend', minTrust: 0.05 },
        ],
        roles: [subject(17, 45), friend(17, 45), neighbor(30, 70, false)],
        allowedEffects: socialEffects,
        task: task('social', ['belonging', 'care'], ['belonging', 'safety'], 1.15, 0.15, [
          'social',
        ]),
        outcomeHints: [
          '在柜台前把话说清，承认自己上次算错了账',
          '把花放在门口就走，等对方先开口',
          '只买了两只 Semmel，递过去一只，没有提旧事',
        ],
      },
      {
        id: 'p9-social-relationship-initiative.borrow-handcart',
        title: '借一辆手推车和十克朗',
        premise:
          '搬家定在星期天，手推车还没有着落，房租又差十克朗。能开口的只剩一个在印厂做事的友人；对方自己也有老婆孩子，上个月刚替人作过保，桌上的账本还没有合上。',
        conditions: [
          { kind: 'age', min: 17, max: 45 },
          { kind: 'cash', max: 40 },
        ],
        roles: [subject(17, 45), friend(17, 45), worker(18, 60, false)],
        allowedEffects: [
          'cash',
          'mood',
          'reputation',
          'relation',
          'relation_end',
          'household',
          'flag',
        ],
        task: task('social', ['survival', 'belonging'], ['cash', 'autonomy'], 1.3, 0.3, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '开口借车和钱，写下还款日期，按月还',
          '只借手推车，钱改去当铺想办法',
          '什么也没借，转身去找搬运行，花掉最后的现钱',
        ],
      },
      {
        id: 'p9-social-relationship-initiative.share-one-room',
        title: '把两张床并到一间房里',
        premise:
          '两人已经来往了一年，房租却各自付着。对方的房间朝北，冬天墙上有水汽；这边离印厂近，但只有一张床和一只煤箱。把地址并到一处，要去警察局报备，还要过房东和看门人这一关。',
        conditions: [
          { kind: 'age', min: 18, max: 45 },
          { kind: 'hasRelation', relationKind: 'partner', minTrust: 0.3 },
          { kind: 'cash', min: 10 },
        ],
        roles: [subject(18, 45), partner(18, 45)],
        allowedEffects: householdEffects,
        task: task('family', ['family', 'belonging'], ['belonging', 'autonomy'], 1.35, 0.4, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '退掉一间房，把两张床并到离印厂近的那间',
          '先只把地址报在一起，家具和房租仍旧分开',
          '对方家里反对，事情搁下，各自保留原来的房间',
        ],
      },
      {
        id: 'p9-social-relationship-initiative.introduce-two-people',
        title: '咖啡馆里多摆一把椅子',
        premise:
          '一边是做了多年工的老友，一边是刚搬到同楼的缝纫女工。星期天下午的咖啡馆人不多，侍者把三把椅子摆到窗边；介绍的话要说得自然，既不能像说媒，也不能让任何一方觉得被安排。',
        conditions: [
          { kind: 'age', min: 17, max: 45 },
          { kind: 'cash', min: 3 },
        ],
        roles: [subject(17, 45), friend(17, 45), friendB(18, 45)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('social', ['belonging', 'status'], ['belonging', 'status'], 1.15, 0.15, [
          'social',
        ]),
        outcomeHints: [
          '让两人自己聊起缝纫和印厂，只负责续咖啡',
          '话说得太多，把两边都夸过了头，气氛反而僵住',
          '介绍完就借故离开，让他们自己决定要不要再见面',
        ],
      },
      {
        id: 'p9-social-relationship-initiative.cut-the-guarantee',
        title: '替人作保的那张纸',
        premise:
          '一位老友第三次来借钱，前两次都说是临时周转，这次却拿出一张赌债的字据，请人替他作保。印厂的工资袋刚发下来，桌上还有房租和母亲的药费；对方说只要签个名字，月底一定还。',
        conditions: [
          { kind: 'age', min: 17, max: 45 },
          { kind: 'hasRelation', relationKind: 'friend', minTrust: 0.05 },
        ],
        roles: [subject(17, 45), friend(17, 45), neighbor(30, 70, false)],
        allowedEffects: [
          'cash',
          'health',
          'mood',
          'reputation',
          'relation',
          'relation_end',
          'flag',
        ],
        task: task('social', ['survival', 'belonging'], ['safety', 'autonomy'], 1.4, 0.35, [
          'social',
        ]),
        outcomeHints: [
          '拒绝签字，把前两次的借条收好，从此不再来往',
          '替他还掉一小部分，条件是对方去戒酒并交出赌债字据',
          '陪对方去酒馆把账谈清，但不再作保',
        ],
      },
    ],
  },
  {
    id: 'p9-social-daily-culture',
    kind: 'task',
    task: task('culture', ['rest', 'belonging'], ['belonging', 'status'], 1.0, 0.05, ['social']),
    title: '站票、咖啡馆与星期天的远足',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 80 },
    tags: ['daily', 'culture', 'leisure', 'cafe', 'music', 'walk'],
    baseRate: 0.1,
    conditions: [{ kind: 'age', min: 16, max: 80 }],
    nodeBriefs: [
      {
        id: 'p9-social-daily-culture.last-standing-ticket',
        title: '剧院顶层的最后一张站票',
        premise:
          '约瑟夫施塔特剧院的售票窗口在下午四点开，站票只要几十赫勒，比楼座便宜一半。队伍沿墙排到街角，前面的人带着小凳和报纸，后面的人不断问还有没有；窗口里的女人只说“一个一个来”。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 1 },
        ],
        roles: [subject(16, 80), neighbor(18, 80)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('culture', ['rest', 'belonging'], ['belonging', 'status'], 1.05, 0.05, [
          'social',
        ]),
        outcomeHints: [
          '买下最后一张站票，倚着栏杆看完两幕',
          '嫌队伍太长，转去教堂听免费的管风琴',
          '替前面的老人代买一张，自己站在更后面的位置',
        ],
      },
      {
        id: 'p9-social-daily-culture.cafe-newspaper',
        title: '咖啡馆窗边的第三杯 Melange',
        premise:
          '下午三点，咖啡馆里已经坐满看报的人。侍者把咖啡放在大理石桌上，杯旁是一小杯水；报纸夹在木架上，谁先拿到谁先看。窗外下着细雨，玻璃上全是电车和伞的影子。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 1 },
        ],
        roles: [subject(16, 80), neighbor(18, 80)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('daily', ['rest', 'belonging'], ['belonging', 'status'], 1.0, 0.05, ['social']),
        outcomeHints: [
          '续一杯咖啡，把报纸从头读到尾',
          '和邻桌谈起电车票价，坐到傍晚',
          '只喝一杯就走，把座位让给等位的人',
        ],
      },
      {
        id: 'p9-social-daily-culture.lending-library',
        title: '借书处的押金',
        premise:
          '街角的租书店按本收租，借一部小说要先押两克朗。书架上的书脊用纸条重新粘过，最上面一排是游记和劝善故事；管理员翻开借书卡，问上次借的那本为什么迟了四天。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 2 },
        ],
        roles: [subject(16, 80), worker(25, 70)],
        allowedEffects: ['cash', 'mood', 'relation', 'skill', 'flag'],
        task: task('knowledge', ['knowledge', 'rest'], ['knowledge', 'autonomy'], 1.05, 0.05, [
          'literacy',
        ]),
        outcomeHints: [
          '押两克朗借走一部小说，按期还书再换一部',
          '嫌押金太贵，去免费的 Volksbibliothek 办一张阅览证',
          '只站在书架前读了半章，记下页码回家',
        ],
      },
      {
        id: 'p9-social-daily-culture.singing-club',
        title: '酒馆后厅的合唱排练',
        premise:
          '工人合唱团每星期四在酒馆后厅排练，入会要交四十赫勒月费，还要买一枚铜制徽章。后厅的钢琴缺了一个音，墙上挂着褪色的旗帜；团长说下个月的演唱会在郊外的花园举行，缺席的人要提前打招呼。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 2 },
        ],
        roles: [subject(16, 80), neighbor(25, 75), worker(18, 65, false)],
        allowedEffects: ['cash', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('social', ['belonging', 'status'], ['belonging', 'status'], 1.15, 0.15, [
          'social',
        ]),
        outcomeHints: [
          '交月费和徽章钱，站进第二排跟着唱',
          '只去听一次排练，没有在名册上签字',
          '问清演唱会的车费谁出，再决定入不入会',
        ],
      },
      {
        id: 'p9-social-daily-culture.sunday-hill',
        title: '星期天去卡伦山的路',
        premise:
          '星期天早上，电车挤满了去郊外的人。到格林青的车票要转一次，山道上的酒农把长凳摆在葡萄架下，卖新酒和面包；同去的人想走到山顶，另一个人只想在第一个酒棚坐下。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 2 },
        ],
        roles: [subject(16, 80), friend(16, 80), neighbor(30, 80, false)],
        allowedEffects: ['cash', 'food', 'health', 'mood', 'relation', 'skill', 'flag'],
        task: task('daily', ['rest', 'belonging'], ['belonging', 'autonomy'], 1.0, 0.05, [
          'social',
        ]),
        outcomeHints: [
          '按原计划走到山顶，回程在酒棚里喝一杯新酒',
          '在第一个酒棚坐下，打牌到下午，不再往上爬',
          '半路下雨，改乘电车回家，把带去的面包分给同车的人',
        ],
      },
      {
        id: 'p9-social-daily-culture.pictures-or-concert',
        title: '影戏棚与音乐厅之间',
        premise:
          '星期六晚上有两处可去：普拉特附近的新影戏棚放映一刻钟的活动影戏，门口挂着手绘的招牌，棚里只有一架钢琴伴奏；音乐厅的楼座则有一场贝多芬音乐会，票价贵一倍，衣服也要体面些。',
        conditions: [
          { kind: 'age', min: 16, max: 80 },
          { kind: 'cash', min: 2 },
        ],
        roles: [subject(16, 80), friend(16, 80), neighbor(30, 70, false)],
        allowedEffects: ['cash', 'food', 'mood', 'reputation', 'relation', 'skill', 'flag'],
        task: task('culture', ['rest', 'belonging'], ['belonging', 'status'], 1.1, 0.1, ['social']),
        outcomeHints: [
          '买影戏棚的便宜座，看完还站在门口看下一场的招牌',
          '咬牙买音乐厅楼座，借来一件硬领衬衫',
          '两处都不去，在酒馆听人拉琴，省下票钱',
        ],
      },
    ],
  },
];
