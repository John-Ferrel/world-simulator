import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type { GeneratedTaskMeta } from '../generated.js';
import type {
  EventEffect,
  PersonAgencyGoal,
  RoleRequirement,
  TaskDomain,
  TaskNeed,
} from '../domain.js';

/**
 * Phase 9 work content: three ordinary event families and two active-task
 * families about looking for work and building a working life in 1912 Vienna.
 *
 * Every role, condition and id here is fixed; the content author supplies the
 * prose and the typed outcomes. Event packs keep a rate share that sums to one
 * so compilation preserves the family's base rate. Task packs are offered by
 * Agency, so their baseRate is metadata only and excludes them from the annual
 * event lottery.
 *
 * The age windows preserve the requested brief ranges. The runtime still gates
 * every definition by `stageForAge`, so the effective adulthood slice is 18-59
 * even where a brief window reaches 16 or 65.
 */

const role = (
  key: string,
  kind: RoleRequirement['kind'],
  minAge: number,
  maxAge: number,
  required = true,
  extra: Partial<RoleRequirement> = {},
): RoleRequirement => ({ key, kind, required, minAge, maxAge, ...extra });

const subject = (minAge: number, maxAge: number) => role('subject', 'subject', minAge, maxAge);
const worker = (minAge = 18, maxAge = 60, required = true) =>
  role('worker', 'worker', minAge, maxAge, required);
const employer = (minAge = 35, maxAge = 70, required = true) =>
  role('employer', 'employer', minAge, maxAge, required);
const neighbor = (minAge = 18, maxAge = 75, required = true) =>
  role('neighbor', 'neighbor', minAge, maxAge, required);
const official = (minAge = 30, maxAge = 65, required = true) =>
  role('official', 'official', minAge, maxAge, required);
const teacher = (minAge = 30, maxAge = 65, required = true) =>
  role('teacher', 'teacher', minAge, maxAge, required);
const unionMember = (minAge = 25, maxAge = 65, required = true) =>
  role('unionMember', 'union_member', minAge, maxAge, required);

function task(
  domain: TaskDomain,
  goals: PersonAgencyGoal[],
  needs: TaskNeed[],
  baseUtility: number,
  risk: number,
  skills: string[] = [],
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills };
}

const ordinaryWorkEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'employment',
  'unemployment',
  'relation',
];
const shopEffects: EventEffect['type'][] = [...ordinaryWorkEffects];
const transportEffects: EventEffect['type'][] = [...ordinaryWorkEffects];
const jobSearchEffects: EventEffect['type'][] = [...ordinaryWorkEffects, 'role'];
const careerEffects: EventEffect['type'][] = [...ordinaryWorkEffects, 'role', 'education'];

const node = (brief: ContentNodeBrief): ContentNodeBrief => brief;

export const PHASE9_WORK_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-work-printshop',
    kind: 'event',
    title: '排字房、油墨与急活',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['work', 'printshop', 'printing', 'compositor', 'craft', 'workshop'],
    baseRate: 0.12,
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'employment', employed: true },
    ],
    nodeBriefs: [
      node({
        id: 'p9-work-printshop.type-case',
        title: '字盘里少了一个字母',
        premise:
          '早班刚开机，一版百货店的广告就要在中午前交五百份。排字工发现小写 e 的字格空了半格，学徒昨天把整盘铅字撒在楼梯间，工头已经在门口催。',
        weight: 1,
        rateShare: 0.18,
        tags: ['typesetting', 'rush_order'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [
          subject(18, 60),
          role('foreman', 'worker', 35, 65),
          role('apprentice', 'worker', 14, 19, false),
        ],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '停工半小时，去街对面的印厂借一盒同号铅字，回来赶在午饭前上机',
          '用小一号的字补上空位，远看整齐，近看行距发虚，工头扣了半天工钱',
          '让学徒趴在地上按字母捡字，自己先排标题，活拖到下午才交',
        ],
      }),
      node({
        id: 'p9-work-printshop.ink-barrel',
        title: '见底的油墨桶',
        premise:
          '一桶黑墨见了底，订的墨还压在货运站。急活是一张剧院海报，红黑两色，主顾站在柜台前等样张。工头说桶底刮一刮还能印，颜色发灰就多上一遍。',
        weight: 1,
        rateShare: 0.16,
        tags: ['ink', 'rush_order', 'supplies'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [
          subject(18, 60),
          role('foreman', 'worker', 35, 65),
          role('inkGrinder', 'worker', 18, 60, false),
        ],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '用松节油把桶底的墨调稀，印出来的黑发灰，主顾只收下一半',
          '拿自己的工钱去颜料店买一小罐好墨，赶完急活，工头装作没看见',
          '停机等送货车，把别的活往后推，下午被工头记了一笔误工',
        ],
      }),
      node({
        id: 'p9-work-printshop.press-accident',
        title: '压印机咬住袖口',
        premise:
          '压印机的护罩少了一颗螺丝，换纸时袖子被滚筒卷住。工头先关机器，再让人去叫门房；事故簿摊在桌上，保险会的表格要填受伤的时间和机器编号。',
        weight: 1,
        rateShare: 0.16,
        tags: ['accident', 'injury', 'press', 'insurance'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'health', min: 0.4 },
        ],
        roles: [subject(18, 60), role('foreman', 'worker', 35, 65), worker(18, 60)],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '去医院缝合，让工头把事故写进簿子，月底领到一笔伤残补助',
          '用干净抹布裹住手，先把下午的活干完，后来那根手指伸不直',
          '拒绝在事故单上按手印，和工头争执，第二天被调去搬纸',
        ],
      }),
      node({
        id: 'p9-work-printshop.foreman-favor',
        title: '工头手里的一张轻活单',
        premise:
          '工头把活分成两摞：一摞是轻的卡片，一摞是受潮的厚纸。加班名单也在他口袋里。有人递上一瓶李子酒，有人替他修好了家里的炉子；排字工站在两摞纸中间。',
        weight: 1,
        rateShare: 0.18,
        tags: ['foreman', 'favoritism', 'overtime'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [subject(18, 60), role('foreman', 'worker', 35, 65), worker(18, 60)],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '替工头的女儿印一版婚礼请柬，换到轻活和星期六的加班名额',
          '当着工友的面拒绝，第二天被排到最重的纸垛旁',
          '把轻活让给手上有伤的老工人，自己去搬纸，工头没有表态',
        ],
      }),
      node({
        id: 'p9-work-printshop.wage-dispute',
        title: '计件单上被划掉的数字',
        premise:
          '新价目表贴在更衣室门口：排版按行算，机器调试的时间不再另计。工头说这是厂里跟同业公会谈好的价，谁不愿意可以走。工会代表星期五晚上在活动室等人。',
        weight: 1,
        rateShare: 0.16,
        tags: ['wages', 'piecework', 'union', 'dispute'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [subject(18, 60), employer(35, 70), worker(18, 60), unionMember(25, 65, false)],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '在价目表上签名，月底少拿三克朗，但保住了下个月的班次',
          '和几个工友去找工会代表，厂里把新价目暂时收回',
          '拒签，把自己每天的行数和工时记在小本上，工头暗示下月不用来了',
        ],
      }),
      node({
        id: 'p9-work-printshop.printed-secret',
        title: '不该排的一版',
        premise:
          '打烊后有人从后门进来，拿出一张没有署名的传单，要印三百份，说星期天以前必须送到各区。纸钱先付，原稿不留。工头说机器空着，警察若来问，就说不知道。',
        weight: 0.9,
        rateShare: 0.16,
        tags: ['secret', 'handbill', 'night_work', 'risk'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [
          subject(18, 60),
          role('foreman', 'worker', 35, 65),
          role('customer', 'neighbor', 25, 65),
          official(30, 65, false),
        ],
        allowedEffects: ordinaryWorkEffects,
        outcomeHints: [
          '收下钱，夜里开机印完，把废页和原稿一起烧掉',
          '要求来人在单子上写下姓名和地址，那人收起纸转身走了',
          '把事告诉工头，工头让他照印，但把原稿锁进自己的抽屉',
        ],
      }),
    ],
  },
  {
    id: 'p9-work-shop',
    kind: 'event',
    title: '柜台、赊账与送货',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 65 },
    tags: ['work', 'shop', 'retail', 'merchant', 'credit', 'delivery'],
    baseRate: 0.15,
    conditions: [
      { kind: 'age', min: 16, max: 65 },
      { kind: 'placeKind', in: ['shop'] },
      { kind: 'employment', employed: true },
    ],
    nodeBriefs: [
      node({
        id: 'p9-work-shop.rich-customer',
        title: '戴皮手套的太太',
        premise:
          '星期六上午，一位戴皮手套的太太走进铺子，要两磅咖啡和一整匹细布，指定中午以前送到她的公寓。她不愿付现钱，说月底和别的账一起结；送货的孩子正发烧躺在后屋。',
        weight: 1,
        rateShare: 0.18,
        tags: ['customer', 'wealth', 'credit', 'delivery'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(16, 65),
          role('customer', 'neighbor', 30, 65, true, { sex: 'female' }),
          role('shopkeeper', 'worker', 35, 70),
          role('shopBoy', 'worker', 14, 19, false),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '先送她的货，把账记在她名下，月底再结，掌柜在账本上皱了眉',
          '请她付现钱，再让学徒跑一趟，太太觉得受了怠慢，只买了一半',
          '自己提着包裹送去她的公寓，回来时铺子已打烊，掌柜扣了半小时工钱',
        ],
      }),
      node({
        id: 'p9-work-shop.credit-ledger',
        title: '赊账本上的一行字',
        premise:
          '洗衣妇每周来买面粉、蜡烛和一小袋盐，账本上的欠款已经写到第二页。今天她只带了三赫勒，说男人这个月没有活。掌柜把铅笔搁下，让她自己跟柜台后的人说。',
        weight: 1,
        rateShare: 0.17,
        tags: ['credit', 'poverty', 'ledger'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
        ],
        roles: [
          subject(16, 65),
          role('customer', 'neighbor', 30, 75, true, { sex: 'female' }),
          role('shopkeeper', 'worker', 35, 70),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '在账本上再记一行，先从自己的工钱里垫上一部分',
          '按掌柜的话拒绝，她把面粉放回柜台，孩子在门口看着',
          '让她用半打鸡蛋抵掉一部分，账本上划去两行',
        ],
      }),
      node({
        id: 'p9-work-shop.bad-debt',
        title: '收不回来的欠账',
        premise:
          '一个老主顾欠了九克朗，两个月没露面。地址写在赊账本边上：法沃里滕的一条后院巷子。掌柜把欠条和电车票钱一起推过来，说收不回就从工钱里扣。',
        weight: 1,
        rateShare: 0.17,
        tags: ['debt', 'collection', 'credit'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
          { kind: 'cash', max: 70 },
        ],
        roles: [
          subject(16, 65),
          role('debtor', 'neighbor', 25, 60),
          role('shopkeeper', 'worker', 35, 70),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '上门只收回两克朗和一句“下月再说”，回来被掌柜扣了差额',
          '在门口等到他的妻子，留下欠条，约好每周还五十赫勒',
          '把欠条转给街角的收债人，拿回一半，那家人从此不再进店',
        ],
      }),
      node({
        id: 'p9-work-shop.stocktake',
        title: '盘点少了半袋糖',
        premise:
          '星期六打烊后盘点：糖账上写着十二公斤，秤上只有九公斤半。麻袋底下有潮印，墙角有老鼠屎，也可能是学徒记错了数。掌柜把每个人的围裙口袋都看了一遍。',
        weight: 1,
        rateShare: 0.16,
        tags: ['inventory', 'stocktake', 'suspicion'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(16, 65),
          role('shopkeeper', 'worker', 35, 70),
          role('apprentice', 'worker', 14, 19, false),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '重新过秤，发现账本把两袋糖记重了，改账后差额还在',
          '掌柜坚持搜每个人的包，学徒当场哭了，第二天没有来',
          '把差额算在自己头上，赔了钱，换来继续管仓库的钥匙',
        ],
      }),
      node({
        id: 'p9-work-shop.delivery',
        title: '雪里的送货小车',
        premise:
          '运河对岸的咖啡馆订了一箱蜡烛和一袋面粉，说开门前必须送到。送货的孩子病了，手推车只有一辆，桥面上的雪被马蹄踩成黑泥。',
        weight: 1,
        rateShare: 0.16,
        tags: ['delivery', 'winter', 'errand'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
          { kind: 'health', min: 0.5 },
        ],
        roles: [
          subject(16, 65),
          role('porter', 'worker', 18, 60, false),
          role('cafeKeeper', 'neighbor', 30, 70),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '推车过桥，在咖啡馆开门前送到，鞋湿透，拿到一笔小费',
          '车轮陷进雪里，打碎半箱蜡烛，回来照价赔',
          '分两趟送，第二趟迟到，咖啡馆老板只付了一半',
        ],
      }),
      node({
        id: 'p9-work-shop.shoplifting',
        title: '柜台前的一只空袖子',
        premise:
          '一个穿旧外套的男孩在柜台前站了很久，出门时袖子里多了一只沙丁鱼罐头。巡警就在街角，掌柜说按规矩该叫进来；男孩的母亲在洗衣房上工，住在同一条巷子。',
        weight: 1,
        rateShare: 0.16,
        tags: ['shoplifting', 'theft', 'police', 'neighborhood'],
        conditions: [
          { kind: 'age', min: 16, max: 65 },
          { kind: 'placeKind', in: ['shop'] },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(16, 65),
          role('boy', 'neighbor', 10, 20),
          role('shopkeeper', 'worker', 35, 70),
          official(30, 65, false),
        ],
        allowedEffects: shopEffects,
        outcomeHints: [
          '把男孩叫到后屋，收回罐头，让他每周来擦地板抵账',
          '按掌柜的意思叫来巡警，男孩被带走，街坊从此对铺子冷淡',
          '装作没看见，自己垫了钱，月底盘点时被发现',
        ],
      }),
    ],
  },
  {
    id: 'p9-work-transport',
    kind: 'event',
    title: '汽笛、货场与夜班',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['work', 'factory', 'railway', 'transport', 'shift', 'labour'],
    baseRate: 0.13,
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'employment', employed: true },
    ],
    nodeBriefs: [
      node({
        id: 'p9-work-transport.shift-change',
        title: '早班电车误了点',
        premise:
          '早班汽笛响过六分钟，电车还停在道口，前面是一列慢行的货车。工人跑到厂门口时，接班的老人已经多站了一刻钟，工头把考勤簿翻到新的一页。',
        weight: 1,
        rateShare: 0.17,
        tags: ['shift', 'commute', 'tram', 'lateness'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(18, 60),
          role('foreman', 'worker', 35, 65),
          role('reliefWorker', 'worker', 40, 65),
        ],
        allowedEffects: transportEffects,
        outcomeHints: [
          '在考勤簿上签了迟到，扣一刻钟工钱，接班的老人多干了一班',
          '解释电车被货车堵住，工头不听，给了一张书面警告',
          '和老人商量，自己接手他剩下的半小时，把迟到记成换班',
        ],
      }),
      node({
        id: 'p9-work-transport.machine-speed',
        title: '皮带轮又转快了一格',
        premise:
          '为了赶一批急活，工头把传动皮带挪到更快的轮槽。机器开始发颤，送料的手要跟得更紧，计件价却没有变。墙上还贴着上次事故后写的“注意护罩”。',
        weight: 1,
        rateShare: 0.17,
        tags: ['machine', 'speedup', 'piecework', 'safety'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
        ],
        roles: [subject(18, 60), role('foreman', 'worker', 35, 65), worker(18, 60)],
        allowedEffects: transportEffects,
        outcomeHints: [
          '跟着加速干完这批活，拿到一点加班费，晚上耳朵还在响',
          '趁工头不在把皮带挪回慢槽，被看见后记了一笔',
          '和工友一起去找工会代表，要求先装好护罩再开机',
        ],
      }),
      node({
        id: 'p9-work-transport.loading-yard',
        title: '货场上的一只木箱',
        premise:
          '货场上有一只标着“120 公斤”的木箱，要装上敞车。起重机在另一条轨上，工头说两个人抬得动。跳板结着薄冰，箱角已经裂开。',
        weight: 1,
        rateShare: 0.17,
        tags: ['loading', 'freight', 'injury', 'yard'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'health', min: 0.5 },
        ],
        roles: [subject(18, 60), worker(18, 60), role('foreman', 'worker', 35, 65)],
        allowedEffects: transportEffects,
        outcomeHints: [
          '和工友一起抬，腰闪了一下，还是把箱子推上车',
          '拒绝徒手搬，去找来手推车，耽误半小时但没人受伤',
          '让新来的工人抬另一头，箱子落地裂开，货主来查',
        ],
      }),
      node({
        id: 'p9-work-transport.coupling-injury',
        title: '两节车厢之间',
        premise:
          '调车场的夜里没有月台灯，两节车厢慢慢退过来。工人弯腰去挂钩，信号灯在远处晃了一下，缓冲器撞上他的小腿。站长在值班室里听见叫声，先骂了一句，才去拿事故单。',
        weight: 1,
        rateShare: 0.17,
        tags: ['railway', 'shunting', 'injury', 'accident'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'health', min: 0.4 },
        ],
        roles: [
          subject(18, 60),
          role('yardMaster', 'worker', 40, 70),
          role('brakeman', 'worker', 18, 55, false),
        ],
        allowedEffects: transportEffects,
        outcomeHints: [
          '被抬到医务室，脚踝压伤，铁路按事故保险付了药费，但把他调离调车组',
          '忍着痛把车钩好，第二天脚肿得穿不进鞋，才去上报',
          '拒绝在事故单上写“自己不小心”，和站长吵起来，被停班一周',
        ],
      }),
      node({
        id: 'p9-work-transport.foreman-favor',
        title: '加班名单上的名字',
        premise:
          '星期天的加班名单贴在更衣室门上，双倍工钱，只写八个名字。工头的内弟在名单上，一个家里有病人的老工人不在。有人开始往工头家里送东西。',
        weight: 1,
        rateShare: 0.16,
        tags: ['overtime', 'foreman', 'favoritism'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 60), role('foreman', 'worker', 35, 65), worker(18, 60)],
        allowedEffects: transportEffects,
        outcomeHints: [
          '替工头修好家里的炉子，星期天名单上添了自己的名字',
          '把名额让给家里有病人的工友，工头记下了这个人情',
          '当面问按什么排班，工头说他多事，名单没有改',
        ],
      }),
      node({
        id: 'p9-work-transport.strike-rumor',
        title: '更衣室里的罢工传闻',
        premise:
          '更衣室里传开一句话：货场和机器厂要一起停工，要求每小时多两赫勒。工会活动室晚上开会，工头在门口转来转去，说谁去谁自己承担。',
        weight: 1,
        rateShare: 0.16,
        tags: ['strike', 'rumor', 'union', 'solidarity'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(18, 60),
          worker(18, 60),
          unionMember(25, 65, false),
          role('foreman', 'worker', 35, 65, false),
        ],
        allowedEffects: transportEffects,
        outcomeHints: [
          '下班后去工会活动室听会，签名支持，但没答应站到队伍最前面',
          '把传闻告诉工头，第二天被工友孤立，柜门上写着他的名字',
          '谁也不告诉，照常上工，罢工那天厂门口只来了一半人',
        ],
      }),
    ],
  },
  {
    id: 'p9-work-jobsearch',
    kind: 'task',
    title: '找工、试工与谈工钱',
    stage: 'adulthood',
    ageWindow: { min: 16, max: 60 },
    tags: ['work', 'job_search', 'negotiation', 'wages', 'employment', 'task'],
    baseRate: 0.5,
    conditions: [{ kind: 'age', min: 16, max: 60 }],
    task: task('work', ['work', 'survival'], ['cash', 'autonomy'], 1.5, 0.3, [
      'social',
      'numeracy',
    ]),
    nodeBriefs: [
      node({
        id: 'p9-work-jobsearch.ask-trial',
        title: '在厂门口问一次试工',
        premise:
          '工场门口的黑板上没有招工字样。工人等到午休，趁工头出来抽烟，报上姓名、住址和干过的活，问能不能先试半天；他的袖口还沾着上一家作坊的灰。',
        weight: 1,
        tags: ['job_search', 'trial', 'factory'],
        conditions: [
          { kind: 'age', min: 16, max: 60 },
          { kind: 'employment', employed: false },
        ],
        roles: [
          subject(16, 60),
          role('foreman', 'worker', 30, 65),
          role('journeyman', 'worker', 20, 45, false),
        ],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'survival'], ['cash', 'autonomy'], 1.7, 0.25, [
          'social',
          'craft',
        ]),
        outcomeHints: [
          '工头让他明早来试半天，只管一顿午饭，干得好再谈工钱',
          '工头说没有空缺，让他把名字写在纸角上，月底再来问',
          '工头要他先交一笔工具押金，他拿不出，转身去了下一家',
        ],
      }),
      node({
        id: 'p9-work-jobsearch.request-raise',
        title: '把一年的活计摊在桌上',
        premise:
          '干满一年，工钱还是每周二十六克朗。工人把一年的活计记在一张纸上：做完多少件活、替谁顶过班、修过几次机器。厂长把怀表放在桌上，只给一刻钟。',
        weight: 1,
        tags: ['wages', 'raise', 'negotiation'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 60), employer(35, 70), worker(18, 60, false)],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'status'], ['cash', 'status'], 1.5, 0.5, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '厂长答应每周加一克朗，但要他兼管仓库钥匙和月底盘点',
          '厂长说这个月订单少，加薪的事推到明年，连具体月份都没说',
          '他把同行的工钱说漏了嘴，厂长收回原本要加的那一克朗',
        ],
      }),
      node({
        id: 'p9-work-jobsearch.railway-depot',
        title: '南站货场的招工日',
        premise:
          '南站货场的招工日，天没亮就排了三十多人。站务员要看出生证明、洗礼证明和上一任东家的离职证明，还要在体检时看视力和听力。临时装卸工按日结钱，干得好才可能补进正式名册。',
        weight: 1,
        tags: ['job_search', 'railway', 'depot', 'hiring'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: false },
        ],
        roles: [
          subject(18, 60),
          role('stationForeman', 'worker', 35, 65),
          official(30, 65, false),
          worker(18, 55, false),
        ],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'survival'], ['cash', 'status'], 1.8, 0.3, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '站务员收下证明，让他下周先做临时装卸工，按日结钱',
          '体检时视力不合格，只留下名字，等货场有空缺再叫',
          '他拿不出洗礼证明，跑了一趟教区，回来时名额已经满了',
        ],
      }),
      node({
        id: 'p9-work-jobsearch.relative-introduction',
        title: '舅公家的星期天',
        premise:
          '星期天下午，母亲让他提一包点心去舅公家。舅公在一家商号管仓库，认识几个工头。点心放在桌上，舅公先问了他这半年干了什么，又问打算干到哪一步。',
        weight: 1,
        tags: ['job_search', 'relative', 'introduction', 'favor'],
        conditions: [
          { kind: 'age', min: 16, max: 60 },
          { kind: 'cash', max: 60 },
        ],
        roles: [
          subject(16, 60),
          role('relative', 'neighbor', 35, 70),
          role('foreman', 'worker', 30, 65, false),
          employer(35, 70, false),
        ],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'belonging'], ['cash', 'belonging'], 1.3, 0.2, ['social']),
        outcomeHints: [
          '舅公带他去见工头，工头答应让他下星期试工，先做杂活',
          '舅公口头答应，到了星期天却不在家，介绍的事没有再提',
          '舅公愿意引见，但要他先替自己看两个月的仓库',
        ],
      }),
      node({
        id: 'p9-work-jobsearch.negotiate-hours',
        title: '星期六下午的价钱',
        premise:
          '工人想改的是星期六：现在从早上七点干到晚上八点，午休只有半小时。东家说顾客星期六最多，少一个下午就少一天的生意。柜台上摆着同业公会的工时表。',
        weight: 1,
        tags: ['hours', 'negotiation', 'saturday', 'union'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 60), employer(35, 70), worker(18, 60, false)],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'family'], ['autonomy', 'health'], 1.4, 0.35, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '谈成星期六下午歇半天，工钱按日扣，他第一次能在天亮时回家',
          '东家只答应把午休延长一刻钟，实际下班时间没变',
          '他拿公会的工时表来谈，东家叫他下个月不用来了',
        ],
      }),
      node({
        id: 'p9-work-jobsearch.leave-bad-employer',
        title: '欠薪的作坊与街对面的招工',
        premise:
          '这家作坊欠了两个月工钱，机器没有护罩，东家骂人时把工具摔在案上。街对面的工头托人带话，说缺一个熟手，但工钱要从小工算起。房租下星期到期。',
        weight: 1,
        tags: ['job_search', 'bad_employer', 'resignation', 'risk'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'cash', max: 50 },
        ],
        roles: [subject(18, 60), employer(35, 70), worker(18, 60, false)],
        allowedEffects: jobSearchEffects,
        task: task('work', ['work', 'survival'], ['safety', 'autonomy'], 1.1, 0.7, ['social']),
        outcomeHints: [
          '当场辞工，工钱没结清，靠工友借的钱撑到下个月',
          '先到街对面谈好位置再辞，走时只带走自己的工具',
          '留下来要求补发欠薪，东家答应分期，却把他调去看仓库',
        ],
      }),
    ],
  },
  {
    id: 'p9-work-career',
    kind: 'task',
    title: '学徒、证明与自己的招牌',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['work', 'career', 'craft', 'clerk', 'education', 'task'],
    baseRate: 0.5,
    conditions: [{ kind: 'age', min: 18, max: 60 }],
    task: task('work', ['work', 'status'], ['status', 'autonomy'], 1.4, 0.3, ['craft', 'social']),
    nodeBriefs: [
      node({
        id: 'p9-work-career.journeyman-exam',
        title: '出师考试的那张工作台',
        premise:
          '学徒期最后一个月，师傅把一张工作台腾出来，让他独立做一件活：一只燕尾榫的抽屉，或者一版要上机的整页。考试费、材料费和师傅的评语都写在纸上，出师后工钱按伙计算。',
        weight: 1,
        tags: ['apprentice', 'journeyman', 'exam', 'craft'],
        conditions: [
          { kind: 'age', min: 18, max: 30 },
          { kind: 'education', in: ['apprenticeship'] },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 30), role('master', 'worker', 40, 70), worker(20, 40, false)],
        allowedEffects: careerEffects,
        task: task('work', ['work', 'status'], ['status', 'autonomy'], 1.6, 0.2, ['craft']),
        outcomeHints: [
          '做出合格的活，拿到出师证明，工钱从下周起按伙计算',
          '活做得急，接缝不严，师傅让他再干三个月才给出师',
          '他付不出考试费，师傅替他垫上，条件是多留一年',
        ],
      }),
      node({
        id: 'p9-work-career.reference',
        title: '一封写得恰到好处的证明',
        premise:
          '新东家要一封离职证明。旧东家把纸铺在柜台上，问他想写什么；证明上的每个词都有分量，“勤勉”与“尚称勤勉”之间差着一份工作。旧东家还想把他留到年底。',
        weight: 1,
        tags: ['reference', 'certificate', 'employer'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'employment', employed: true },
        ],
        roles: [subject(18, 60), employer(35, 70), worker(18, 60, false)],
        allowedEffects: careerEffects,
        task: task('work', ['work', 'status'], ['status', 'safety'], 1.3, 0.15, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '旧东家写下“勤勉可靠”，他拿着证明去了新东家',
          '证明上只写“已离职，无欠款”，新东家看了一眼就放下',
          '旧东家愿意写好评语，但要他再干半年，把新人带出来',
        ],
      }),
      node({
        id: 'p9-work-career.night-course',
        title: '夜校里的簿记课',
        premise:
          '区里的商业夜校在十月开课，簿记、商业算术和书信三门，每星期三晚。学费六克朗，课本另买。工人下工后赶去，教室里只有煤气灯和一张长桌，窗外是电车轨道。',
        weight: 1,
        tags: ['education', 'night_school', 'bookkeeping', 'certificate'],
        conditions: [
          { kind: 'age', min: 18, max: 60 },
          { kind: 'cash', min: 5 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
        ],
        roles: [subject(18, 60), teacher(30, 65), role('classmate', 'worker', 18, 50, false)],
        allowedEffects: careerEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.2, 0.1, [
          'numeracy',
          'literacy',
        ]),
        outcomeHints: [
          '他交费报名，每星期三去上课，年底拿到一张结业证',
          '上了两次就因加班缺课，学费没有退',
          '他和同桌轮流抄笔记，考试前在咖啡馆复习到半夜',
        ],
      }),
      node({
        id: 'p9-work-career.clerk-post',
        title: '写字间里的空椅子',
        premise:
          '保险公司的写字间空出一把椅子。考试的题目是抄一页信、算一张利息表、把一段话用速记记下来。录用后月薪七十克朗，但要先交一笔保证金，还要有保人。',
        weight: 1,
        tags: ['clerk', 'office', 'application', 'white_collar'],
        conditions: [
          { kind: 'age', min: 18, max: 40 },
          { kind: 'education', in: ['secondary', 'apprenticeship', 'higher'] },
          { kind: 'cash', min: 10 },
        ],
        roles: [
          subject(18, 40),
          role('seniorClerk', 'official', 35, 65),
          employer(35, 70, false),
          worker(20, 50, false),
        ],
        allowedEffects: careerEffects,
        task: task('work', ['work', 'status'], ['status', 'cash'], 1.7, 0.3, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '他的字和算术都过了关，被录用为试用办事员，月薪七十克朗',
          '主考说要交一笔保证金，他拿不出，位置给了别人',
          '他写得一手好字，却不会速记，被安排去抄档案，等下次机会',
        ],
      }),
      node({
        id: 'p9-work-career.client-list',
        title: '主顾名单上的新名字',
        premise:
          '手艺人在一本小册子上记主顾：医生的太太、街角咖啡馆、楼下的杂货铺。有人要他把价钱压到最低，有人愿意多付一点，但要他随叫随到。他还没有自己的招牌，只有一张写名字的纸片。',
        weight: 1,
        tags: ['craft', 'clients', 'reputation', 'independence'],
        conditions: [
          { kind: 'age', min: 22, max: 60 },
          { kind: 'cash', min: 5 },
          { kind: 'employment', employed: true },
        ],
        roles: [
          subject(22, 60),
          role('client', 'neighbor', 25, 70),
          role('fellowCraftsman', 'worker', 25, 60, false),
          employer(35, 70, false),
        ],
        allowedEffects: careerEffects,
        task: task('work', ['work', 'status'], ['cash', 'status'], 1.4, 0.35, ['social', 'craft']),
        outcomeHints: [
          '他给咖啡馆修好一批椅子，老板把他介绍给杂货铺，名单添了三户',
          '他把价钱压得太低，活接不完，主顾却只认便宜',
          '医生的太太要他上门做活，他犹豫后答应，旧主顾觉得他攀高枝',
        ],
      }),
      node({
        id: 'p9-work-career.security-or-independence',
        title: '固定薪水与自己的招牌',
        premise:
          '一份固定的办事员职位摆在桌上：按月发薪，年底有补贴，生病可以请假。另一边是租一间小门面，挂自己的招牌，头几个月不知道有没有活。积蓄只够撑一个季度，房租月底到期。',
        weight: 1,
        tags: ['career', 'independence', 'security', 'decision'],
        conditions: [
          { kind: 'age', min: 25, max: 60 },
          { kind: 'employment', employed: true },
          { kind: 'cash', min: 40 },
        ],
        roles: [
          subject(25, 60),
          employer(35, 70),
          role('partner', 'partner', 22, 55, false, { sameHousehold: true }),
          role('landlord', 'neighbor', 35, 70, false),
        ],
        allowedEffects: careerEffects,
        task: task('work', ['work', 'status'], ['autonomy', 'safety'], 1.6, 0.6, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '接下固定职位，把开店的念头锁进抽屉，每月薪水按时拿回家',
          '辞工挂牌，用积蓄租下小门面，头三个月只有零星的活',
          '他和东家谈成半天帮工、半天自己做活，收入不稳但招牌挂了出去',
        ],
      }),
    ],
  },
];
