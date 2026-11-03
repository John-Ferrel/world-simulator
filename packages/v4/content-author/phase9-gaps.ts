import type { ContentFamilyBrief } from './briefs.js';
import type {
  EventEffect,
  PersonAgencyGoal,
  PersonLife,
  RoleRequirement,
  SceneCondition,
  TaskDomain,
  TaskNeed,
} from '../domain.js';
import type { GeneratedTaskMeta } from '../generated.js';

/**
 * Phase 9 coverage-gap briefs.
 *
 * The first production wave left three weak spots visible in the candidate
 * audit: childhood had events but no active tasks, unemployed adults had very
 * few passive events, and elderhood had almost no content. These families are
 * deliberately broad on occupation and rely on age/household/employment
 * conditions instead of inventing a second simulation system.
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
const parent = (minAge = 25, maxAge = 65, required = true): RoleRequirement =>
  role('parent', 'parent', minAge, maxAge, required);
const sibling = (minAge = 2, maxAge = 16, required = false): RoleRequirement =>
  role('sibling', 'sibling', minAge, maxAge, required);
const neighbor = (minAge = 18, maxAge = 80, required = true): RoleRequirement =>
  role('neighbor', 'neighbor', minAge, maxAge, required);
const neighborB = (minAge = 18, maxAge = 80, required = false): RoleRequirement =>
  role('neighborB', 'neighbor', minAge, maxAge, required);
const teacher = (minAge = 25, maxAge = 65, required = true): RoleRequirement =>
  role('teacher', 'teacher', minAge, maxAge, required);
const worker = (minAge = 18, maxAge = 60, required = false): RoleRequirement =>
  role('worker', 'worker', minAge, maxAge, required);
const employer = (minAge = 35, maxAge = 70, required = false): RoleRequirement =>
  role('employer', 'employer', minAge, maxAge, required);
const official = (minAge = 30, maxAge = 65, required = true): RoleRequirement =>
  role('official', 'official', minAge, maxAge, required);
const organization = (
  key: string,
  kind: NonNullable<RoleRequirement['organizationKind']>,
  required = false,
): RoleRequirement => role(key, 'organization', 18, 90, required, { organizationKind: kind });

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

const age = (min: number, max: number): SceneCondition => ({ kind: 'age', min, max });
const cash = (min?: number, max?: number): SceneCondition => ({
  kind: 'cash',
  householdId: 'subject',
  ...(min === undefined ? {} : { min }),
  ...(max === undefined ? {} : { max }),
});
const householdSize = (min?: number, max?: number): SceneCondition => ({
  kind: 'householdSize',
  ...(min === undefined ? {} : { min }),
  ...(max === undefined ? {} : { max }),
});
const employed = (value: boolean): SceneCondition => ({ kind: 'employment', employed: value });
const education = (values: string[]): SceneCondition => ({
  kind: 'education',
  in: values as never,
});

const ordinaryEffects: EventEffect['type'][] = [
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
const childEffects: EventEffect['type'][] = [...ordinaryEffects, 'education'];
const elderEffects: EventEffect['type'][] = [...ordinaryEffects];
const unemployedEffects: EventEffect['type'][] = [...ordinaryEffects, 'unemployment'];

export const PHASE9_GAP_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-gap-childhood-chores',
    kind: 'task',
    title: '孩子在狭窄院子里的活计',
    stage: 'childhood',
    ageWindow: { min: 6, max: 11 },
    tags: ['childhood', 'household', 'chores', 'school', 'task', 'daily'],
    baseRate: 0.5,
    conditions: [age(6, 11)],
    task: task('daily', ['family', 'survival'], ['food', 'cash', 'belonging'], 1.15, 0.1, [
      'social',
      'numeracy',
    ]),
    nodeBriefs: [
      {
        id: 'p9-gap-childhood-chores.fetch-coal',
        title: '去煤铺赊一筐煤',
        premise:
          '家里的煤筐见了底，母亲把一只旧木筐和一张写着门牌号的纸交给孩子，让去街角煤铺跟掌柜说月底一起结。煤铺里全是黑灰，掌柜正给一车煤过秤，柜台边还站着两个同样来赊账的邻居。',
        weight: 1,
        rateShare: 0.18,
        tags: ['childhood', 'coal', 'errand', 'household'],
        conditions: [age(6, 11), householdSize(3), cash(0, 20)],
        roles: [subject(6, 11), parent(25, 60), neighbor(18, 70)],
        allowedEffects: childEffects,
        outcomeHints: [
          '掌柜同意赊半筐，孩子自己把煤搬回家，路上洒了一地碎渣',
          '掌柜不肯赊，孩子用捡来的木片和纸换了一小袋煤核',
          '邻居替孩子说了句话，掌柜记下门牌，但要求明天先还两赫勒',
        ],
        task: task('daily', ['family', 'survival'], ['food', 'cash'], 1.2, 0.1, ['social']),
      },
      {
        id: 'p9-gap-childhood-chores.mind-sibling',
        title: '看住最小的弟妹',
        premise:
          '母亲要去洗衣房做半天工，把还走不稳的小弟妹留在院子里，让大孩子看着。院门口就是煤车经过的巷子，井台边没有栏杆，邻家的孩子正拿一根木棍敲铁皮桶。',
        weight: 1,
        rateShare: 0.16,
        tags: ['childhood', 'sibling', 'care', 'household'],
        conditions: [age(6, 11), householdSize(4)],
        roles: [subject(6, 11), sibling(1, 5), parent(25, 60), neighbor(18, 70)],
        allowedEffects: childEffects,
        outcomeHints: [
          '孩子把弟妹背在背上走了一下午，没出大事，但晚上胳膊抬不起来',
          '弟妹在井台边摔了一跤，邻居帮忙抱回屋，孩子被母亲责骂',
          '孩子用木盆和旧布搭了个小棚，弟妹睡着，自己却错过了和同伴去河边的约',
        ],
        task: task('family', ['family', 'care'], ['care', 'belonging'], 1.3, 0.15, ['social']),
      },
      {
        id: 'p9-gap-childhood-chores.market-line',
        title: '替家里排一次配给队',
        premise:
          '市场外的配给队从面包房拐到肉铺后墙，母亲把布袋和几个硬币塞给孩子，让她在队伍里站着，自己去上工。前面的人说今天的面粉只够卖到中午，后面的人不断往前挤。',
        weight: 1,
        rateShare: 0.17,
        tags: ['childhood', 'market', 'food', 'queue'],
        conditions: [age(6, 11), householdSize(3)],
        roles: [subject(6, 11), neighbor(18, 70), worker(18, 55)],
        allowedEffects: childEffects,
        outcomeHints: [
          '孩子守住了位置，买到半袋面粉，但被人踩掉了鞋跟',
          '轮到孩子时已经卖完，她用剩下的钱买了几个土豆',
          '一个邻居让孩子站到前面，孩子替两家都领了面包，回家路上被母亲问清每一笔',
        ],
        task: task('daily', ['survival', 'family'], ['food', 'cash'], 1.2, 0.1, ['numeracy']),
      },
      {
        id: 'p9-gap-childhood-chores.school-slate',
        title: '弄到一块能写字的石板',
        premise:
          '学校里每个孩子都有自己的石板和石笔，孩子的石板裂了一条缝，写上去的字总是断。老师说不带石板的人只能站着听课；家里的钱刚够买盐和煤，母亲让她先借同学的。',
        weight: 1,
        rateShare: 0.16,
        tags: ['childhood', 'school', 'supplies', 'education'],
        conditions: [age(6, 11), education(['primary', 'home'])],
        roles: [subject(6, 11), teacher(25, 65), parent(25, 60)],
        allowedEffects: childEffects,
        outcomeHints: [
          '老师把自己的旧石板借给孩子，让她每天放学后留下来擦干净',
          '孩子用捡来的木板和煤灰自制了一块练习板，字迹一擦就花',
          '母亲用攒下的几赫勒买了一块二手石板，孩子把它包在布里带去学校',
        ],
        task: task('education', ['knowledge', 'status'], ['knowledge', 'belonging'], 1.25, 0.05, [
          'literacy',
        ]),
      },
      {
        id: 'p9-gap-childhood-chores.laundry-help',
        title: '帮邻居晾一院子的床单',
        premise:
          '邻家洗衣妇接了一批旅馆的床单，院子里两根绳子不够用，她看见孩子在门口，便问愿不愿意帮着拧干、递夹子，干完给几赫勒。水盆里的碱水烫手，床单比孩子还高。',
        weight: 1,
        rateShare: 0.16,
        tags: ['childhood', 'laundry', 'work', 'neighbor'],
        conditions: [age(6, 11), householdSize(2)],
        roles: [subject(6, 11), neighbor(18, 70), worker(18, 55)],
        allowedEffects: childEffects,
        outcomeHints: [
          '孩子干到天黑，拿到三赫勒，手指被碱水泡得发白',
          '孩子把床单拖到地上，邻居扣了一半工钱，还让她重新洗一角',
          '孩子和邻居家的孩子一起把床单晾完，邻居给了她一包剩面包',
        ],
        task: task('daily', ['survival', 'work'], ['cash', 'food'], 1.15, 0.1, ['social']),
      },
      {
        id: 'p9-gap-childhood-chores.stay-after-school',
        title: '求老师让自己留下来补课',
        premise:
          '孩子在算术课上总跟不上，黑板上的竖式还没抄完就被擦掉。放学后老师要锁门，孩子站在讲台边，手里攥着写满错题的纸，想问能不能每天多留一刻钟。',
        weight: 1,
        rateShare: 0.17,
        tags: ['childhood', 'school', 'teacher', 'learning'],
        conditions: [age(6, 11), education(['primary', 'home'])],
        roles: [subject(6, 11), teacher(25, 65)],
        allowedEffects: childEffects,
        outcomeHints: [
          '老师答应每周留两次，但要求孩子先把教室的炉灰倒掉',
          '老师说自己要赶去另一所学校兼课，只给孩子写了一张练习清单',
          '孩子鼓起勇气问，老师让她第二天早到半小时，在黑板前单独讲一遍',
        ],
        task: task('education', ['knowledge', 'status'], ['knowledge', 'belonging'], 1.2, 0.05, [
          'numeracy',
          'literacy',
        ]),
      },
    ],
  },
  {
    id: 'p9-gap-adult-unemployed',
    kind: 'event',
    title: '没有固定工作的一天',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['adulthood', 'unemployment', 'casual_labour', 'poverty', 'daily'],
    baseRate: 0.16,
    conditions: [age(18, 60), employed(false)],
    nodeBriefs: [
      {
        id: 'p9-gap-adult-unemployed.dock-morning',
        title: '码头清晨的零工',
        premise:
          '天没亮，码头铁门外的石阶上已经站了二十多个人，手里拿着自己的麻绳和钩子。工头出来时只点了几个人，剩下的继续等；河面的雾把对岸的仓库遮成一片灰。',
        weight: 1,
        rateShare: 0.18,
        tags: ['unemployment', 'dock', 'casual_labour'],
        conditions: [age(18, 60), employed(false)],
        roles: [subject(18, 60), worker(18, 60), neighbor(18, 70)],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '被点中去卸一船煤，干到午后拿到几克朗，肩膀磨破',
          '等到中午也没被点上，只帮人看了半天工具，赚到一顿汤',
          '和邻居合搬一车木箱，工头少算了一个人的工钱，两人当场争起来',
        ],
      },
      {
        id: 'p9-gap-adult-unemployed.pawnshop',
        title: '当铺柜台上的一只表',
        premise:
          '当铺的柜台很高，伙计戴着袖套，把每件东西翻过来看背面。排在前面的女人当了一只银顶针，后面的人抱着一卷冬衣；轮到时，柜台上只剩一只还能走的旧怀表。',
        weight: 1,
        rateShare: 0.17,
        tags: ['unemployment', 'pawn', 'cash', 'poverty'],
        conditions: [age(18, 60), employed(false), cash(0, 12)],
        roles: [subject(18, 60), worker(25, 65), neighbor(18, 70)],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '当到一笔钱，约定三个月内赎回，出门时把当票折得很小',
          '伙计只肯给半价，说表壳有划痕，最后没当',
          '邻居悄悄替她添了几克朗，把表赎回，但要求下月还',
        ],
      },
      {
        id: 'p9-gap-adult-unemployed.soup-kitchen',
        title: '救济厨房的长队',
        premise:
          '教堂后院的救济厨房每天中午开一小时，门口排着拿各种容器的人。锅里的汤用豆子和骨头熬，每人一勺，孩子可以多领半勺；轮到时，锅底已经见了。',
        weight: 1,
        rateShare: 0.17,
        tags: ['unemployment', 'relief', 'food', 'church'],
        conditions: [age(18, 60), employed(false)],
        roles: [
          subject(18, 60),
          neighbor(18, 70),
          organization('church', 'church'),
          official(25, 65),
        ],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '领到一勺汤和半块面包，在墙根吃完，身上暖了些',
          '轮到之前锅空了，管事的让她明天早些来',
          '她帮着切了一筐土豆，换到两份汤，带一份回家',
        ],
      },
      {
        id: 'p9-gap-adult-unemployed.labour-exchange',
        title: '职业介绍所的木牌',
        premise:
          '介绍所的墙上钉满木牌，写着招工的地点和工钱，但大半已经被翻过去。柜台后的职员说今天只有一项清扫活，工钱按天算，要先交登记费；旁边有人把地址抄在烟盒纸上。',
        weight: 1,
        rateShare: 0.17,
        tags: ['unemployment', 'labour_exchange', 'bureaucracy'],
        conditions: [age(18, 60), employed(false)],
        roles: [subject(18, 60), official(25, 65), worker(18, 60)],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '交登记费拿到清扫活，第二天去时工头说人已招满',
          '她记下地址直接找去，雇主让她试半天，留下做临时工',
          '她没交登记费，和旁边的工人交换了另一处招工消息',
        ],
      },
      {
        id: 'p9-gap-adult-unemployed.factory-gate',
        title: '工厂门口的招工纸',
        premise:
          '厂门口贴着一张新纸，招两名包装工，要求识字、能搬二十公斤。门房把纸压在玻璃后面，不让揭；门外站着几个和她一样看到消息赶来的人，彼此不说名字。',
        weight: 1,
        rateShare: 0.16,
        tags: ['unemployment', 'factory', 'hiring'],
        conditions: [age(18, 60), employed(false)],
        roles: [subject(18, 60), worker(18, 60), employer(35, 70), official(25, 65)],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '门房收下她的名字，让她第二天带证件来，但没保证录用',
          '她挤到前面报了名字，被后面的人指责插队，门房把两个人一起赶开',
          '她发现纸上的工钱比传说少，转身去另一条街问工',
        ],
      },
      {
        id: 'p9-gap-adult-unemployed.moving-job',
        title: '替人搬半天家',
        premise:
          '楼里的鞋匠要搬到城外的新住处，家具装了一辆手推车，楼梯窄得转不过弯。鞋匠在院子里问有没有人愿意帮半天，工钱不多，但管一顿午饭。',
        weight: 1,
        rateShare: 0.15,
        tags: ['unemployment', 'moving', 'casual_labour', 'neighbor'],
        conditions: [age(18, 60), employed(false)],
        roles: [subject(18, 60), neighbor(18, 70), worker(18, 60)],
        allowedEffects: unemployedEffects,
        outcomeHints: [
          '搬完柜子和床架，拿到工钱和一顿午饭，腰酸了三天',
          '柜脚在楼梯上磕裂，鞋匠扣了工钱，只给了一半',
          '她和另一个帮工把最重的书箱抬下楼，鞋匠多给了几个赫勒',
        ],
      },
    ],
  },
  {
    id: 'p9-gap-adult-ordinary-day',
    kind: 'event',
    title: '没有大事发生的一天',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 80 },
    tags: ['adulthood', 'daily', 'leisure', 'neighborhood', 'ordinary'],
    baseRate: 0.13,
    conditions: [age(18, 80)],
    nodeBriefs: [
      {
        id: 'p9-gap-adult-ordinary-day.organ-grinder',
        title: '街角的手摇风琴',
        premise:
          '一个戴旧礼帽的乐师把手摇风琴推到街角，琴箱上蹲着一只系红绳的猴子。他摇一支圆舞曲，猴子端着帽子绕圈；楼上的窗子开了几扇，有人扔下铜板，也有人泼下一盆水。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'music', 'street', 'leisure'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80), neighbor(18, 80), worker(18, 60)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她站着听完两支曲子，往帽子里放了一枚铜板',
          '楼上的水泼到琴箱上，乐师骂了一句，围观的人散开',
          '她跟着猴子走了半条街，最后在面包店门口和乐师聊了几句',
        ],
      },
      {
        id: 'p9-gap-adult-ordinary-day.wedding-procession',
        title: '邻居家的婚礼队伍',
        premise:
          '隔壁院子的女儿出嫁，队伍从教堂回来，前面两个孩子在撒纸花，后面跟着提嫁妆箱的亲戚。新郎在门口被拦住要唱一支歌，围观的人起哄，院子里摆开了长桌。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'wedding', 'neighbor', 'celebration'],
        conditions: [age(18, 80), householdSize(2)],
        roles: [subject(18, 80), neighbor(18, 80), neighborB(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她被拉进院子喝了一杯酒，随了很少的礼，吃到一块婚礼蛋糕',
          '她站在门外看了一会儿，想起自己家里还没办过这样的席',
          '婚礼队伍挡住了巷子，她帮忙搬开长桌，邻居塞给她一包喜糖',
        ],
      },
      {
        id: 'p9-gap-adult-ordinary-day.market-closing',
        title: '市场收摊前的降价',
        premise:
          '傍晚市场收摊，卖菜的把剩下的菜叶拢成一堆，卖鱼的刮着案板上的冰。摊主们开始喊最后的价格，买菜的人拎着篮子来回比较，地上全是湿纸和菜梗。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'market', 'food', 'bargain'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80), worker(18, 60), neighbor(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她用很少的钱买到一兜碰伤的苹果，回家削掉坏处煮了一锅',
          '她和一个邻居同时看中最后一把菠菜，两人各分了一半',
          '收摊的人把卖剩的鱼头给了她，她拿回家熬汤，味道很重',
        ],
      },
      {
        id: 'p9-gap-adult-ordinary-day.wash-day',
        title: '洗衣日的院子',
        premise:
          '星期一院子里全是洗衣盆，热水从厨房一桶桶提出来，绳子上的床单被风吹得鼓起来。几个女人一边搓衣领一边说楼上的闲话，孩子们在湿石板之间钻来钻去。',
        weight: 1,
        rateShare: 0.16,
        tags: ['daily', 'laundry', 'neighbor', 'household'],
        conditions: [age(18, 80), householdSize(2)],
        roles: [subject(18, 80), neighbor(18, 80), neighborB(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她洗完自己的被单，又帮邻居拧干一条厚毯子，手上起了皱',
          '风把一件衬衫吹到泥地里，两家为谁该重洗争了几句',
          '她听着邻居讲楼上的闲话，没接茬，晾完衣服就回屋',
        ],
      },
      {
        id: 'p9-gap-adult-ordinary-day.lost-dog',
        title: '巷子里的一条走失的狗',
        premise:
          '一条带皮项圈的小狗在巷子里转了半天，鼻子贴着墙根嗅，尾巴夹着。它不怕人，但也不让人碰项圈；巷口卖煤的说是从环城道那边跑来的，主人也许正在找。',
        weight: 1,
        rateShare: 0.16,
        tags: ['daily', 'animal', 'neighbor', 'ordinary'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80), neighbor(18, 80), worker(18, 60)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她给狗喂了半块面包，狗跟着她走到院门口，被主人寻来领走',
          '她照着项圈上的地址找去，主人不在家，只好把狗留在门房',
          '狗跟着一个孩子跑远，她追了两条街没追上，回来时鞋底磨破',
        ],
      },
      {
        id: 'p9-gap-adult-ordinary-day.flea-market-cup',
        title: '旧货摊上的一只杯子',
        premise:
          '环城道边的旧货摊上摆着缺口的瓷器、旧纽扣和拆下来的铜把手。一只描金边的小杯子夹在中间，摊主说是从一位老小姐的遗产里收来的，开价不高，但杯底有一道细裂纹。',
        weight: 1,
        rateShare: 0.17,
        tags: ['daily', 'flea_market', 'object', 'ordinary'],
        conditions: [age(18, 80)],
        roles: [subject(18, 80), worker(18, 60), neighbor(18, 80)],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '她买下杯子，回家装了一次茶，裂纹渗水，只好放在柜子上看',
          '她和摊主还价，最后用几个赫勒买下，觉得自己占了便宜',
          '她放下杯子走了，走到街口又回来，杯子已经被人买走',
        ],
      },
    ],
  },
  {
    id: 'p9-gap-elderhood-daily',
    kind: 'event',
    title: '老年生活里的窗口、炉子和旧人',
    stage: 'elderhood',
    ageWindow: { min: 60, max: 85 },
    tags: ['elderhood', 'daily', 'pension', 'housing', 'care'],
    baseRate: 0.14,
    conditions: [age(60, 85)],
    nodeBriefs: [
      {
        id: 'p9-gap-elderhood-daily.pension-window',
        title: '养老金窗口前的队',
        premise:
          '养老金发放日的队伍从办事处门口排到楼梯口，老人们带着身份纸、旧工资册和装硬币的布袋。窗口只开两个，办事员隔一会儿就起身去后面翻册子，队伍里有人开始数自己还差几个月。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'pension', 'bureaucracy', 'cash'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85), official(25, 65), neighbor(55, 85)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '她领到了当月的钱，发现比上月少了一点，办事员说是扣了保险',
          '她的工资册缺一页，窗口让她下周带证明再来',
          '队伍里的老人替她证明工龄，窗口补发了少算的部分',
        ],
      },
      {
        id: 'p9-gap-elderhood-daily.landlord-heat',
        title: '房东来查暖气',
        premise:
          '房东带着修炉工上楼，说今年煤价涨了，暖气只在早晚各烧两小时。老人屋里的温度计停在很低的位置，窗缝用报纸塞着；修炉工蹲在炉边敲了两下，说烟道该清了。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'housing', 'heating', 'winter'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85), neighbor(30, 65), worker(18, 60)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '房东同意多加一小时暖气，但房租也涨了一点',
          '修炉工清了烟道，屋里暖起来，老人把攒下的旧报纸给了他',
          '她和房东争了几句，最后自己买了一只小铁炉，放在厨房里',
        ],
      },
      {
        id: 'p9-gap-elderhood-daily.old-colleague-funeral',
        title: '旧同事的葬礼',
        premise:
          '旧同事在冬天去世，讣告贴在工会活动室门口，葬礼在城外的公墓。老人翻出唯一一件黑外套，袖口已经磨亮；同去的人不多，大家在电车站在寒风里等车。',
        weight: 1,
        rateShare: 0.16,
        tags: ['elderhood', 'funeral', 'colleague', 'memory'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85), neighbor(50, 85), worker(50, 80)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '她去了葬礼，在墓前站了很久，回来时把旧工资册翻了一遍',
          '电车误点，她赶到时仪式已经结束，只在门口签了名',
          '她在葬礼上遇到多年不见的工友，两人约好下月喝茶',
        ],
      },
      {
        id: 'p9-gap-elderhood-daily.lodger-night',
        title: '年轻房客住进来的第一夜',
        premise:
          '老人把朝院子的小房间租给一个刚进城的年轻女工，租金不高，但说好不能带人过夜、不能用厨房的煤。第一夜，房客在屋里收拾到很晚，木板墙把每一声都传过来。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'lodger', 'housing', 'household'],
        conditions: [age(60, 85), householdSize(1, 3)],
        roles: [subject(60, 85), neighbor(18, 35), official(30, 65)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '房客很安静，第二天早起把炉台擦干净，老人稍微放心',
          '房客半夜带了一个人回来，老人敲门提醒，双方都说得很客气',
          '房客交不出第一个月租金，老人让她先住下，但把话说清楚',
        ],
      },
      {
        id: 'p9-gap-elderhood-daily.coal-basket',
        title: '冬天的煤筐',
        premise:
          '煤价又涨，老人把煤筐提到楼下，数着还剩几块。院里的人家都在省煤，有人把旧木箱拆了当柴；天色阴沉，楼梯口的窗户结着薄冰，送煤的人说这周不一定能来。',
        weight: 1,
        rateShare: 0.17,
        tags: ['elderhood', 'coal', 'winter', 'poverty'],
        conditions: [age(60, 85), cash(0, 20)],
        roles: [subject(60, 85), neighbor(18, 80), worker(18, 60)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '邻居分给她半筐煤，她记下数目，说下月一定还',
          '她自己拖着煤筐去煤铺，路上歇了三次，买回一小袋',
          '送煤的人答应先赊一筐，但要在圣诞节前结清',
        ],
      },
      {
        id: 'p9-gap-elderhood-daily.church-fair',
        title: '教堂义卖的旧桌',
        premise:
          '教堂大厅里摆满捐来的旧物，桌布上放着针线盒、铜烛台和几件改过的旧衣。义卖的钱用来给穷人买煤；老人们坐在长桌后收钱，年轻人进来翻拣，孩子伸手去够高处的玩具。',
        weight: 1,
        rateShare: 0.16,
        tags: ['elderhood', 'church', 'charity', 'social'],
        conditions: [age(60, 85)],
        roles: [subject(60, 85), neighbor(18, 80), organization('church', 'church')],
        allowedEffects: elderEffects,
        outcomeHints: [
          '她在桌后坐了一下午，卖出一堆旧物，自己也买了一只铜烛台',
          '一个年轻人把标价念错，她纠正后双方都笑了',
          '义卖结束时剩下一箱旧衣，她挑了两件，剩下的送去救济厨房',
        ],
      },
    ],
  },
  {
    id: 'p9-gap-elderhood-care',
    kind: 'task',
    title: '老了以后仍能主动做的事',
    stage: 'elderhood',
    ageWindow: { min: 60, max: 85 },
    tags: ['elderhood', 'care', 'pension', 'housing', 'task'],
    baseRate: 0.5,
    conditions: [age(60, 85)],
    task: task('daily', ['rest', 'family'], ['cash', 'health', 'belonging'], 1.1, 0.1, ['social']),
    nodeBriefs: [
      {
        id: 'p9-gap-elderhood-care.pension-appeal',
        title: '去养老金局问一次补发',
        premise:
          '老人发现这个月的养老金少了几克朗，工资册上有一页工龄被划掉。办事窗口在二楼，楼梯没有扶手；她带着旧工资册、身份纸和一张邻居写的证明，想问清楚该找谁。',
        weight: 1,
        rateShare: 0.17,
        conditions: [age(60, 85)],
        roles: [subject(60, 85), official(25, 65), neighbor(18, 80)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '办事员找出缺页，答应补发，但要她下月再来一次',
          '她跑了两趟，第二次才有人受理，补发的钱扣了手续费',
          '窗口说工龄无法证明，她失望回家，邻居帮她把旧工资册又翻了一遍',
        ],
        task: task('daily', ['survival', 'rest'], ['cash', 'safety'], 1.15, 0.1, ['numeracy']),
      },
      {
        id: 'p9-gap-elderhood-care.ask-neighbor-repair',
        title: '请邻居帮忙修一次炉子',
        premise:
          '炉门关不严，煤烟倒灌进屋里，老人咳了半夜。修炉工要价太高，她想起楼下住着一个在铁工厂干活的邻居，便端着一小锅汤下楼，想问能不能抽空看一眼。',
        weight: 1,
        rateShare: 0.16,
        conditions: [age(60, 85), householdSize(1, 4)],
        roles: [subject(60, 85), neighbor(18, 60), worker(18, 60)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '邻居当天傍晚来修好炉门，没收钱，只喝了那锅汤',
          '邻居说要换零件，让她先别用炉子，第二天带工具来',
          '邻居没空，教她用湿报纸临时堵住缝，烟小了些',
        ],
        task: task('daily', ['rest', 'care'], ['safety', 'health'], 1.15, 0.1, ['social']),
      },
      {
        id: 'p9-gap-elderhood-care.take-lodger',
        title: '把空房间租给一个安静的人',
        premise:
          '朝院子的房间空了一个冬天，老人靠养老金付房租有些吃力。她在面包店门口听说一个年轻女工在找住处，便让邻居带话，说房间小，但干净，租金可以商量。',
        weight: 1,
        rateShare: 0.17,
        conditions: [age(60, 85), householdSize(1, 3)],
        roles: [subject(60, 85), neighbor(18, 35), worker(18, 60)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '女工来看房，当场定下，租金不高但按时交',
          '女工嫌房间太冷，没有租，老人把租金又降了一点',
          '邻居替女工担保，老人同意先试住一个月',
        ],
        task: task('daily', ['survival', 'belonging'], ['cash', 'belonging'], 1.2, 0.1, ['social']),
      },
      {
        id: 'p9-gap-elderhood-care.clinic-recheck',
        title: '去医院复查一次',
        premise:
          '医生上回说三个月后复查，老人拖了半年，胸口偶尔发闷。医院在城另一头，挂号要早起排队；她把药盒和旧处方装进布袋，想让医生把药换成便宜一点的。',
        weight: 1,
        rateShare: 0.17,
        conditions: [age(60, 85)],
        roles: [
          subject(60, 85),
          role('doctor', 'worker', 30, 70, true, { occupation: 'Arzt' }),
          neighbor(18, 80),
        ],
        allowedEffects: elderEffects,
        outcomeHints: [
          '医生给她换了便宜的药，但说要少吃盐，她记在药盒背面',
          '排队到中午没挂上号，她坐在医院门口歇了很久',
          '邻居陪她去，医生同意下个月再复诊，药量先减一半',
        ],
        task: task('health', ['survival', 'rest'], ['health', 'safety'], 1.2, 0.15, ['social']),
      },
      {
        id: 'p9-gap-elderhood-care.join-aid',
        title: '加入教会的互助会',
        premise:
          '教堂的互助会每月收一点会费，会员生病时有人送汤，去世时有人帮忙料理。老人算了算养老金，觉得会费不算轻，但楼上独居的老太太上个月刚被互助会送去医院。',
        weight: 1,
        rateShare: 0.16,
        conditions: [age(60, 85)],
        roles: [
          subject(60, 85),
          official(30, 65),
          organization('church', 'church'),
          neighbor(55, 85),
        ],
        allowedEffects: elderEffects,
        outcomeHints: [
          '她交了会费，名字被写进册子，回家时觉得踏实了一些',
          '会费比她想的贵，她只交了半年，说以后再补',
          '邻居替她垫了第一个月的会费，她答应下月还',
        ],
        task: task('social', ['belonging', 'rest'], ['belonging', 'safety'], 1.2, 0.05, ['social']),
      },
      {
        id: 'p9-gap-elderhood-care.give-tools',
        title: '把旧工具送给年轻学徒',
        premise:
          '柜子底下还放着丈夫留下的刨子、凿子和一把小锯，木柄被手磨得发亮。楼里新搬来一个在细木作坊当学徒的年轻人，老人看他用的工具太钝，想把这一套送出去，又有点舍不得。',
        weight: 1,
        rateShare: 0.17,
        conditions: [age(60, 85)],
        roles: [subject(60, 85), neighbor(14, 25), worker(18, 60)],
        allowedEffects: elderEffects,
        outcomeHints: [
          '她把工具擦干净送给年轻人，对方当场试了刨子，说比自己的好用',
          '她只送了一把凿子，剩下的仍放回柜底',
          '年轻人不好意思收，答应每周来帮她劈柴作为交换',
        ],
        task: task('social', ['care', 'belonging'], ['belonging', 'status'], 1.1, 0.05, [
          'craft',
          'social',
        ]),
      },
    ],
  },
];
