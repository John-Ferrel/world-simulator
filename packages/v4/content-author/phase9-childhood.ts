import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type { GeneratedTaskMeta } from '../generated.js';
import type {
  EventEffect,
  PersonAgencyGoal,
  PersonLife,
  RoleRequirement,
  TaskDomain,
  TaskNeed,
} from '../domain.js';

/**
 * Phase 9 childhood and youth briefs.
 *
 * These packs fill the life slice before adulthood: the crowded household, the
 * Volksschule, the courtyard peer group, the first workshop and the first
 * attempt at further education. Event packs are sampled by annual rate; task
 * packs are offered through Agency and carry their own utility metadata.
 *
 * A pack has one runtime stage. Where the requested theme range crosses the
 * engine's stage boundary, the age window preserves the requested span and the
 * node conditions stay inside the stage slice the engine can actually offer.
 */

type Skill = keyof PersonLife['skills'];

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

function role(
  key: string,
  kind: RoleRequirement['kind'],
  minAge: number,
  maxAge: number,
  required = true,
  extra: Partial<RoleRequirement> = {},
): RoleRequirement {
  return { key, kind, required, minAge, maxAge, ...extra };
}

const subject = (minAge: number, maxAge: number): RoleRequirement =>
  role('subject', 'subject', minAge, maxAge);
const parent = (minAge = 24, maxAge = 55, required = true): RoleRequirement =>
  role('parent', 'parent', minAge, maxAge, required);
const sibling = (minAge = 3, maxAge = 16, required = true): RoleRequirement =>
  role('sibling', 'sibling', minAge, maxAge, required);
const teacher = (minAge = 22, maxAge = 65, required = true): RoleRequirement =>
  role('teacher', 'teacher', minAge, maxAge, required);
const employer = (minAge = 32, maxAge = 68, required = true): RoleRequirement =>
  role('employer', 'employer', minAge, maxAge, required, { organizationKind: 'factory' });
const worker = (minAge = 18, maxAge = 55, required = true): RoleRequirement =>
  role('worker', 'worker', minAge, maxAge, required);
const neighbor = (minAge = 18, maxAge = 70, required = true): RoleRequirement =>
  role('neighbor', 'neighbor', minAge, maxAge, required);
const official = (minAge = 30, maxAge = 60, required = true): RoleRequirement =>
  role('official', 'official', minAge, maxAge, required);

function organization(
  key: string,
  kind: NonNullable<RoleRequirement['organizationKind']>,
  required = true,
): RoleRequirement {
  return { key, kind: 'organization', required, organizationKind: kind };
}

const homeEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'flag',
];
const schoolEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'relation',
  'relation_end',
];
const peerEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'relation',
  'relation_end',
  'flag',
];
const workEffects: EventEffect['type'][] = [
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
  'relation_end',
];
const aspirationEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'role',
];
const trialEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'relation',
  'flag',
];
const recommendationEffects: EventEffect['type'][] = [
  'cash',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'relation',
];
const siblingShiftEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'relation',
];
const studyEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'relation',
];
const clubEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'mood',
  'reputation',
  'skill',
  'relation',
  'role',
  'flag',
];

const node = (brief: ContentNodeBrief): ContentNodeBrief => brief;

export const PHASE9_CHILDHOOD_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-childhood-household',
    kind: 'event',
    title: '灶台边的孩子',
    stage: 'childhood',
    ageWindow: { min: 3, max: 11 },
    tags: ['childhood', 'family', 'household', 'home', 'siblings', 'illness', 'neighbors'],
    baseRate: 0.18,
    conditions: [{ kind: 'placeKind', in: ['home'] }],
    nodeBriefs: [
      node({
        id: 'p9-childhood-household.supper-bowl',
        title: '一锅土豆汤',
        premise:
          '冬天的晚饭是一锅土豆汤，母亲把稠的舀给做了一天工的父亲，剩下的按碗分。孩子数着锅底还有没有一片香肠；窗外五点钟就黑了，楼道里有人提着煤筐上楼。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 3, max: 8 },
          { kind: 'householdSize', min: 4 },
          { kind: 'cash', max: 45 },
        ],
        roles: [subject(3, 8), parent(22, 50), sibling(2, 14, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '把自己碗里的土豆拨给更小的弟妹，只喝汤水',
          '趁母亲转身再添半勺，被父亲看见后放下碗',
          '说自己在外面吃过，把面包留到第二天早上',
        ],
      }),
      node({
        id: 'p9-childhood-household.water-and-coal',
        title: '上学前的两桶水',
        premise:
          '天还没亮，院子里的公共水龙头前已经排了木桶。孩子要提两桶水上楼，再去煤棚捧一筐煤球；母亲在灶台边催，学校的钟七点响。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 6, max: 11 },
          { kind: 'householdSize', min: 4 },
          { kind: 'health', min: 0.4 },
        ],
        roles: [subject(6, 11), parent(25, 55), sibling(3, 12, false), neighbor(30, 70, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '先把两桶水提上楼，再一路跑到学校，迟到被记了名字',
          '帮楼下的老人把煤筐抬进门，换到一块面包，自己迟到',
          '装作没听见母亲的喊声，空手去上学，晚上被罚挑水',
        ],
      }),
      node({
        id: 'p9-childhood-household.half-bed',
        title: '半张床的界线',
        premise:
          '一张床睡三个孩子，枕头是卷起来的外套。年长的兄姐把被子往自己那边拉，最小的孩子半夜滚到地上；母亲在隔壁听见哭声，却没有起身。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 5, max: 11 },
          { kind: 'householdSize', min: 5 },
          { kind: 'overcrowded', value: true },
        ],
        roles: [subject(5, 11), sibling(3, 16), parent(25, 55, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '用粉笔在床板上划一条线，谁越线就推回去',
          '把靠墙的位置让给最小的弟妹，自己睡床尾',
          '半夜去厨房长凳上睡，第二天被父亲发现',
        ],
      }),
      node({
        id: 'p9-childhood-household.fever-night',
        title: '夜里的湿毛巾',
        premise:
          '孩子半夜发起高热，额头烫，手脚却冷。家里只有湿布、醋水和半包退烧药粉；去综合医院要坐电车，急诊要先交押金，母亲把围巾裹在孩子身上。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 3, max: 10 },
          { kind: 'health', max: 0.8 },
        ],
        roles: [subject(3, 10), parent(22, 50), neighbor(25, 70, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '母亲抱着去综合医院，先交押金并留下观察',
          '请邻居去叫街角医生，拿回药粉和一张饮食单',
          '用湿布和醋水熬到天亮，省下诊费',
        ],
      }),
      node({
        id: 'p9-childhood-household.name-day-gift',
        title: '名字日的纸包',
        premise:
          '名字日的早晨，桌上多了一个用旧报纸包起来的小包。里面可能是一双补过底的鞋、一只木马，或者一本从旧书摊买来的图画书；母亲说今年只能有一样。',
        weight: 0.9,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 4, max: 11 },
          { kind: 'cash', max: 60 },
          { kind: 'worldYear', min: 1900, max: 1935 },
        ],
        roles: [subject(4, 11), parent(22, 50), neighbor(25, 65, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '收下木马，整天抱在怀里，睡觉时放在枕边',
          '把礼物让给更小的弟妹，自己只要一本图画书',
          '拆开发现是一双旧鞋，仍穿上并说合脚',
        ],
      }),
      node({
        id: 'p9-childhood-household.strap-by-the-door',
        title: '门后的皮带',
        premise:
          '孩子打碎了厨房里唯一一只瓷碗，或者把买盐的钱弄丢了。父亲解下门后的皮带，母亲站在灶台边没有出声；楼道里邻居的脚步慢了下来。',
        weight: 1,
        rateShare: 0.12,
        conditions: [
          { kind: 'age', min: 5, max: 11 },
          { kind: 'householdSize', min: 3 },
        ],
        roles: [subject(5, 11), parent(25, 55), neighbor(25, 70, false)],
        allowedEffects: homeEffects,
        outcomeHints: [
          '伸手认罚，挨了几下后把碎碗扫干净',
          '父亲举起皮带又放下，罚他晚饭后不许出门',
          '邻居敲门借盐，父亲把皮带挂回去，改口骂了几句',
        ],
      }),
    ],
  },
  {
    id: 'p9-childhood-school',
    kind: 'event',
    title: '国民学校的长凳',
    stage: 'childhood',
    ageWindow: { min: 6, max: 14 },
    tags: ['childhood', 'school', 'teacher', 'peers', 'lessons', 'truancy'],
    baseRate: 0.16,
    conditions: [{ kind: 'education', in: ['primary'] }],
    nodeBriefs: [
      node({
        id: 'p9-childhood-school.spelling-and-cane',
        title: '黑板前的听写',
        premise:
          '教室里八十个孩子挤在长凳上，黑板上的单词被粉笔擦得发白。老师点名让孩子站到讲台前听写，错了就在手心敲一下；窗外的雪落在院子的煤堆上。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 6, max: 9 },
          { kind: 'placeKind', in: ['school'] },
        ],
        roles: [subject(6, 9), teacher(22, 65), neighbor(6, 11, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '拼对全部单词，老师让全班跟着读一遍',
          '卡在一个长词上，手心挨了一下，放学留下来抄十遍',
          '偷偷看同桌的石板，写对了却不敢抬头',
        ],
      }),
      node({
        id: 'p9-childhood-school.report-card',
        title: '成绩单上的红字',
        premise:
          '学期末，老师把成绩单和一张要家长签字的纸条发下来。算术一栏是红字，操行一栏写着“上课说话”；母亲不识字，让邻居念给她听。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 9, max: 11 },
          { kind: 'placeKind', in: ['school'] },
          { kind: 'householdSize', min: 3 },
        ],
        roles: [subject(9, 11), teacher(22, 65), parent(25, 55), neighbor(25, 65, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '把成绩单藏在课本里，自己模仿母亲的签名',
          '拿给母亲，邻居念出红字，家里取消他周末去普拉特的计划',
          '去找老师补考，老师答应给一次机会',
        ],
      }),
      node({
        id: 'p9-childhood-school.corner-punishment',
        title: '讲台边的墙角',
        premise:
          '因为上课学鸡叫，老师让孩子站到讲台边的墙角，双手举着石板。下课铃响后，别的孩子涌向院子，只有他还站在那里，胳膊发酸。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 7, max: 11 },
          { kind: 'placeKind', in: ['school'] },
          { kind: 'health', min: 0.4 },
        ],
        roles: [subject(7, 11), teacher(22, 65), neighbor(7, 11, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '站满一节课，回座位时胳膊抬不起来',
          '老师被校长叫走，同桌偷偷替他举了一会儿石板',
          '他趁老师转身把石板放下，被后排同学看见',
        ],
      }),
      node({
        id: 'p9-childhood-school.bench-friend',
        title: '长凳中间的位置',
        premise:
          '新学期排座位，一个从别的区转来的孩子被安排在他旁边。那孩子身上带着煤烟味，午饭只有一块干面包；班上的孩子给他起外号。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 7, max: 11 },
          { kind: 'placeKind', in: ['school'] },
          { kind: 'notHasRelation', relationKind: 'friend' },
        ],
        roles: [subject(7, 11), neighbor(7, 11), teacher(22, 65, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '分半块面包给同桌，放学一起走一段路',
          '跟着别人叫外号，回家后觉得不舒服',
          '请同桌一起做值日，老师看见后把两人调开',
        ],
      }),
      node({
        id: 'p9-childhood-school.truant-prater',
        title: '逃学的下午',
        premise:
          '下午有算术课，几个孩子约好去多瑙运河边看运煤船。他口袋里有两赫勒，够买一只烤土豆；学校点名册上，他的名字还空着。',
        weight: 0.9,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 9, max: 11 },
          { kind: 'cash', max: 20 },
          { kind: 'placeKind', in: ['street', 'home'] },
        ],
        roles: [subject(9, 11), neighbor(9, 12), official(30, 60, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '在河边待到天黑，回家被母亲闻出煤烟味',
          '被学校巡查员在桥头拦住，记下名字并通知家长',
          '走到半路折回学校，从后门溜进教室',
        ],
      }),
      node({
        id: 'p9-childhood-school.schoolyard-hat',
        title: '操场上的帽子',
        premise:
          '课间，一个高年级孩子把他的帽子抢走，扔到院墙边的雪堆里。帽子里还缝着母亲的名字布条；围观的孩子等着看他敢不敢去捡。',
        weight: 1,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 8, max: 11 },
          { kind: 'placeKind', in: ['school'] },
          { kind: 'health', min: 0.4 },
        ],
        roles: [subject(8, 11), neighbor(9, 14), teacher(22, 65, false)],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '冲过去把帽子抢回来，两人在雪地里扭打',
          '忍到上课，课后去雪堆里捡，帽檐已经踩坏',
          '报告老师，老师让高年级孩子当面道歉',
        ],
      }),
    ],
  },
  {
    id: 'p9-childhood-adolescence',
    kind: 'event',
    title: '街角、第一份工与不能说的话',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 17 },
    tags: ['adolescence', 'friendship', 'identity', 'work', 'school', 'secret', 'church'],
    baseRate: 0.13,
    conditions: [{ kind: 'age', min: 12, max: 17 }],
    nodeBriefs: [
      node({
        id: 'p9-childhood-adolescence.courtyard-gang',
        title: '院子里的那伙人',
        premise:
          '傍晚，院子的水泵边聚着五六个少年，有人刚替码头搬完货，有人在等面包房关门买剩面包。他们要去普拉特看人放焰火，或者只是沿多瑙运河走到桥下；母亲在楼上喊他回家。',
        weight: 1,
        rateShare: 0.2,
        conditions: [
          { kind: 'age', min: 12, max: 15 },
          { kind: 'placeKind', in: ['street', 'home'] },
        ],
        roles: [subject(12, 15), neighbor(12, 17), parent(32, 55, false)],
        allowedEffects: peerEffects,
        outcomeHints: [
          '跟着他们走到普拉特，回家时门已经锁了',
          '只送到街角就折返，第二天被那伙人嘲笑',
          '拉上一个更小的邻居一起去，回来被那家母亲堵在门口',
        ],
      }),
      node({
        id: 'p9-childhood-adolescence.first-errand-job',
        title: '第一份跑腿钱',
        premise:
          '杂货铺老板要人把一筐面包送到火车站附近的客栈，来回一小时，给二十赫勒。少年还没到十四岁，但个子高，老板说只算“帮忙”，不算雇工；路上要经过两段电车轨道。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'employment', employed: false },
          { kind: 'cash', max: 40 },
        ],
        roles: [subject(13, 17), role('shopkeeper', 'neighbor', 30, 65), worker(18, 50, false)],
        allowedEffects: [
          'cash',
          'food',
          'health',
          'mood',
          'reputation',
          'skill',
          'relation',
          'flag',
        ],
        outcomeHints: [
          '送完货拿到二十赫勒，又接了第二趟',
          '面包在车上压扁，老板扣了一半钱',
          '拒绝这份“帮忙”，去码头问正式的搬运工',
        ],
      }),
      node({
        id: 'p9-childhood-adolescence.church-club',
        title: '教区青年会的长凳',
        premise:
          '教区青年会在星期天下午借用教堂侧厅，桌上摆着歌本和一副旧牌。修女说下个月要去乡下远足，每人交十赫勒车费；几个在工厂做事的年轻人坐在最后一排。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 12, max: 17 },
          { kind: 'cash', min: 1 },
          { kind: 'placeKind', in: ['church', 'home'] },
        ],
        roles: [subject(12, 17), neighbor(14, 20), organization('parishYouth', 'church', false)],
        allowedEffects: [...peerEffects, 'role'],
        outcomeHints: [
          '交钱报名，在歌本最后一页写下自己的名字',
          '只去听了一次，觉得歌太旧，再没有去',
          '没有交钱，却跟着队伍走到车站，被修女认出来',
        ],
      }),
      node({
        id: 'p9-childhood-adolescence.borrowed-coin',
        title: '借来的硬币',
        premise:
          '朋友从他母亲围裙口袋里拿了两克朗，说下星期就还。现在那家人发现钱少了，朋友让他发誓不说；两个人站在楼梯间的煤油灯下，楼下有人正在数落孩子。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'hasRelation', relationKind: 'friend', minTrust: 0.2 },
          { kind: 'placeKind', in: ['home', 'street'] },
        ],
        roles: [subject(13, 17), neighbor(13, 17), role('friendMother', 'neighbor', 35, 55, false)],
        allowedEffects: peerEffects,
        outcomeHints: [
          '替他保密，但从此不再一起去那家面包店',
          '劝朋友把钱放回去，朋友照做，两人都挨了一顿骂',
          '把这件事告诉自己的母亲，母亲去敲了那家的门',
        ],
      }),
      node({
        id: 'p9-childhood-adolescence.secret-in-the-stairwell',
        title: '楼梯间的秘密',
        premise:
          '朋友被继父赶出家门，已经在印刷厂的纸料间睡了三夜。朋友求他不要把这件事告诉任何人，尤其不要告诉教区；纸料间的窗户关不严，夜里只有旧报纸盖着。',
        weight: 0.9,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'hasRelation', relationKind: 'friend', minTrust: 0.1 },
          { kind: 'placeKind', in: ['home', 'street', 'factory'] },
        ],
        roles: [subject(13, 17), neighbor(13, 17), worker(25, 55, false), parent(32, 55, false)],
        allowedEffects: peerEffects,
        outcomeHints: [
          '从家里带一块面包和一条旧毯子，答应替他保密',
          '告诉母亲，母亲在厨房多摆一副碗筷，让朋友住下',
          '去问工头能不能让朋友留在纸料间，工头说要通知教区',
        ],
      }),
      node({
        id: 'p9-childhood-adolescence.school-leaving-exam',
        title: '离校证明',
        premise:
          '国民学校的最后一年，黑板上写着离校考试的日期。通过的人拿到一张证明，可以去作坊应征；没有证明的人只能做零工。老师把报名表按在讲台上，母亲已经在打听印刷厂要不要人。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 13, max: 15 },
          { kind: 'placeKind', in: ['school'] },
        ],
        roles: [
          subject(13, 15),
          teacher(25, 65),
          parent(30, 55, false),
          role('employer', 'employer', 35, 65, false, { organizationKind: 'factory' }),
        ],
        allowedEffects: schoolEffects,
        outcomeHints: [
          '通过考试，拿到证明，去印刷厂问学徒位',
          '算术没及格，只能领一张肄业证明，先去做跑腿',
          '缺考去帮家里搬煤，老师把证明留在抽屉里',
        ],
      }),
    ],
  },
  {
    id: 'p9-childhood-apprenticeship',
    kind: 'task',
    task: task('work', ['work', 'status'], ['cash', 'status'], 1.4, 0.25, ['craft', 'social']),
    title: '作坊门槛：试工、工时与推荐',
    stage: 'adolescence',
    ageWindow: { min: 12, max: 17 },
    tags: ['adolescence', 'work', 'apprenticeship', 'labour', 'training', 'family'],
    baseRate: 0.5,
    conditions: [{ kind: 'age', min: 12, max: 17 }],
    nodeBriefs: [
      node({
        id: 'p9-childhood-apprenticeship.ask-for-trial',
        title: '门口问一句试工',
        premise:
          '印刷作坊的门半开着，里面传出压印机和裁纸刀的声音。少年在门口站了很久，手里攥着母亲写的地址；老板正把一叠纸样翻过来量尺寸，围裙上全是墨。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 12, max: 15 },
          { kind: 'employment', employed: false },
          { kind: 'cash', max: 40 },
        ],
        roles: [
          subject(12, 15),
          role('master', 'worker', 35, 68),
          employer(32, 68, false),
          worker(18, 50, false),
        ],
        allowedEffects: trialEffects,
        task: task('work', ['work', 'status'], ['cash', 'status'], 1.45, 0.3, ['craft', 'social']),
        outcomeHints: [
          '老板让他把一叠纸码齐，答应试工三天，管一顿午饭',
          '老板嫌他太小，让他明年再来，或先去送面包',
          '他不敢开口，跟着送纸的推车走了一段',
        ],
      }),
      node({
        id: 'p9-childhood-apprenticeship.learn-the-task',
        title: '师傅手里的字盘',
        premise:
          '试工第二天，师傅让他把一页价目表排齐。铅字夹得太松，字距歪了；旁边的伙计停下手里的活，等他犯错。师傅只说了一句“手腕别抖”，把字盘拿回去重新锁紧。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
        ],
        roles: [subject(13, 17), worker(20, 55), employer(32, 68, false)],
        allowedEffects: workEffects,
        task: task('work', ['work', 'knowledge'], ['knowledge', 'status'], 1.3, 0.15, ['craft']),
        outcomeHints: [
          '按师傅的手法排完一页，师傅让他独立排一张小广告',
          '连续排错两行，被派去搬纸和洗墨辊',
          '偷偷把铅字擦得太亮，印出来反光，师傅让他重来',
        ],
      }),
      node({
        id: 'p9-childhood-apprenticeship.negotiate-hours',
        title: '星期六的工时',
        premise:
          '作坊星期六通常做到下午三点，但这一批账本和传单要赶在月底交货。师傅问他能不能每天多留两小时，工钱按小时算；少年算着母亲要交的房租和妹妹的鞋。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'cash', max: 50 },
        ],
        roles: [subject(13, 17), employer(32, 68), worker(20, 55, false)],
        allowedEffects: workEffects,
        task: task('work', ['work', 'survival'], ['cash', 'autonomy'], 1.5, 0.35, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '谈成每天多留一小时，星期六照常下班',
          '师傅只肯按整批活给一笔加班费，他算下来不划算',
          '他拒绝加班，师傅把最费时的活派给别人',
        ],
      }),
      node({
        id: 'p9-childhood-apprenticeship.cover-for-sibling',
        title: '替妹妹顶一班',
        premise:
          '妹妹在洗衣房做计件，手指被碱水泡裂，今天实在抬不起胳膊。她求他去替半天，把一筐床单送到客户家里；洗衣房的女工头不认识他，工钱按件算。',
        weight: 0.9,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 13, max: 17 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
          { kind: 'health', min: 0.4 },
        ],
        roles: [
          subject(13, 17),
          sibling(9, 16),
          role('forewoman', 'worker', 30, 60, false),
          parent(30, 55, false),
        ],
        allowedEffects: siblingShiftEffects,
        task: task('family', ['family', 'care'], ['cash', 'care'], 1.35, 0.4, ['social', 'craft']),
        outcomeHints: [
          '替妹妹送完床单，拿到按件工钱，妹妹的手多歇一天',
          '女工头认出他不是本人，扣下工钱，还说要告诉妹妹的雇主',
          '他送到一半被客户嫌床单有潮气，只好拿回家重洗',
        ],
      }),
      node({
        id: 'p9-childhood-apprenticeship.leave-bad-workshop',
        title: '走出那间作坊',
        premise:
          '印刷作坊的通风窗被木板钉死，油墨和清洗剂的味道整天散不出去。上个月一个伙计咳得直不起腰走了，师傅只说“换个地方也一样”。少年开始头晕，早上起床时手指发麻。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'health', max: 0.8 },
        ],
        roles: [subject(14, 17), employer(32, 68), worker(20, 55, false), neighbor(25, 65, false)],
        allowedEffects: workEffects,
        task: task('work', ['work', 'survival'], ['safety', 'autonomy'], 1.45, 0.5, [
          'social',
          'craft',
        ]),
        outcomeHints: [
          '辞工，去街对面的作坊问位子，工钱少一点但窗户开着',
          '要求师傅开窗、换清洗剂，师傅答应一半，他留下',
          '不告而别，最后一个月的工钱没有拿到',
        ],
      }),
      node({
        id: 'p9-childhood-apprenticeship.teacher-recommendation',
        title: '老师的一封推荐信',
        premise:
          '离校一年后，少年回到国民学校找原来的班主任。老师正在批改作业，桌上放着一叠推荐信；她记得他的字写得整齐，也记得他最后一个学期缺了十几节课。',
        weight: 0.9,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 13, max: 16 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
          { kind: 'employment', employed: false },
          { kind: 'cash', max: 60 },
        ],
        roles: [subject(13, 16), teacher(25, 65), employer(32, 68, false)],
        allowedEffects: recommendationEffects,
        task: task('education', ['knowledge', 'work'], ['knowledge', 'status'], 1.3, 0.1, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '老师写信给印刷厂，附上他的作业本，让他下星期去面试',
          '老师提起缺课的事，只肯写一封普通的品行证明',
          '老师建议他先上夜校，等拿到证书再推荐',
        ],
      }),
    ],
  },
  {
    id: 'p9-childhood-youth-aspiration',
    kind: 'task',
    task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.3, 0.2, [
      'literacy',
      'numeracy',
    ]),
    title: '夜校、书本与出师后的路',
    stage: 'adolescence',
    ageWindow: { min: 14, max: 20 },
    tags: ['adolescence', 'education', 'aspiration', 'school', 'books', 'club', 'exam'],
    baseRate: 0.5,
    conditions: [{ kind: 'age', min: 14, max: 17 }],
    nodeBriefs: [
      node({
        id: 'p9-childhood-youth-aspiration.trade-school-application',
        title: '职业学校报名处',
        premise:
          '市立职业学校在第九区，报名处设在一间借来的教室里。桌上摊着报名表、出生证明和一张课程表；学费一学期十二克朗，夜班便宜一半，但白天要自己找活干。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 14, max: 16 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
          { kind: 'cash', min: 5 },
        ],
        roles: [subject(14, 16), teacher(28, 65), official(30, 60, false)],
        allowedEffects: studyEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.45, 0.2, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '交表并付第一期学费，拿到夜班课表',
          '缺一张小学毕业证明，报名处让他下星期补',
          '学费不够，他改报免费的教会补习班',
        ],
      }),
      node({
        id: 'p9-childhood-youth-aspiration.save-for-books',
        title: '攒钱买一本教科书',
        premise:
          '《机械制图》旧书摊上要三克朗，新书要五克朗。少年把送面包的零钱藏在火柴盒里，母亲已经问过两次那盒火柴为什么摇起来会响。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'cash', max: 35 },
          { kind: 'placeKind', in: ['home', 'shop', 'street'] },
        ],
        roles: [subject(14, 17), parent(30, 55, false), worker(25, 60, false)],
        allowedEffects: studyEffects,
        task: task('daily', ['knowledge', 'survival'], ['cash', 'knowledge'], 1.2, 0.1, [
          'numeracy',
        ]),
        outcomeHints: [
          '攒够三克朗买下旧书，书脊用布条重新粘过',
          '钱被母亲拿去交煤费，他在图书馆抄了半本',
          '和书摊老板谈成先付一克朗，剩下的下月补',
        ],
      }),
      node({
        id: 'p9-childhood-youth-aspiration.ask-a-mentor',
        title: '去找那位排字师傅',
        premise:
          '印刷厂的老排字工每星期天上午在咖啡馆看报。少年带着自己抄的字母表和一封没写完的信，想问他能不能教自己排一版；老师傅的桌上只有一杯咖啡和一副磨旧的眼镜。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
          { kind: 'cash', min: 1 },
        ],
        roles: [subject(14, 17), worker(40, 65), teacher(25, 65, false)],
        allowedEffects: studyEffects,
        task: task('education', ['knowledge', 'belonging'], ['knowledge', 'safety'], 1.25, 0.15, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '老师傅让他每星期天来一小时，先学认字盘',
          '老师傅说自己眼睛不行，只借给他一本旧字样本',
          '老师傅让他先回去把字母表抄整齐，下个月再来',
        ],
      }),
      node({
        id: 'p9-childhood-youth-aspiration.job-or-school',
        title: '工钱袋与听课证',
        premise:
          '印刷厂愿意给他一份正式工的位子，每周十八克朗；职业学校的夜班也在同一天开课。母亲把两份纸放在桌上，一份是工钱袋，一份是听课证，让他自己选。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 15, max: 17 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'cash', max: 60 },
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.2 },
        ],
        roles: [
          subject(15, 17),
          parent(30, 55),
          role('employer', 'employer', 32, 68),
          teacher(25, 65, false),
        ],
        allowedEffects: aspirationEffects,
        task: task('education', ['family', 'status'], ['autonomy', 'status'], 1.5, 0.35, [
          'numeracy',
          'social',
        ]),
        outcomeHints: [
          '选正式工，把听课证收进抽屉，答应明年再报',
          '选夜班，白天接零活，工钱少了一半',
          '和厂主谈成每周少上一天工，用那天去上课',
        ],
      }),
      node({
        id: 'p9-childhood-youth-aspiration.join-a-club',
        title: '工人青年会的门',
        premise:
          '工人青年会在印刷厂后面租了一间屋子，门口挂着读书会和合唱团的牌子。屋里有人在下棋，有人在抄歌本；会员每月交十赫勒，可以借书，也可以参加夏天的郊游。',
        weight: 0.9,
        rateShare: 0.14,
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'cash', min: 1 },
          { kind: 'placeKind', in: ['union', 'street', 'home'] },
        ],
        roles: [subject(14, 17), neighbor(16, 25), organization('workersYouth', 'union')],
        allowedEffects: clubEffects,
        task: task('social', ['belonging', 'status'], ['belonging', 'status'], 1.15, 0.15, [
          'social',
        ]),
        outcomeHints: [
          '交会费入会，借了一本讲蒸汽机的书',
          '只去了一次，觉得屋里太吵，没有再交下月会费',
          '没有钱交会费，提出替人抄歌本抵会费',
        ],
      }),
      node({
        id: 'p9-childhood-youth-aspiration.prepare-exam',
        title: '考试前夜的煤油灯',
        premise:
          '职业学校的入学考试在星期一上午，考算术、德语和一篇短文。家里只有一盏煤油灯，弟弟妹妹已经睡了，桌上的面包屑和铅笔头混在一起；母亲说明天一早要用水。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          { kind: 'age', min: 14, max: 17 },
          { kind: 'education', in: ['primary', 'apprenticeship'] },
          { kind: 'health', min: 0.4 },
          { kind: 'placeKind', in: ['home'] },
        ],
        roles: [subject(14, 17), teacher(25, 65, false), parent(30, 55, false)],
        allowedEffects: studyEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'autonomy'], 1.3, 0.2, [
          'literacy',
          'numeracy',
        ]),
        outcomeHints: [
          '复习到半夜，第二天算错一道题，但文章写得清楚',
          '煤油用完，他借着面包房的灯光背公式，考试时睡着了',
          '他把公式抄在手心，进考场前又洗掉，靠记忆答完',
        ],
      }),
    ],
  },
];
