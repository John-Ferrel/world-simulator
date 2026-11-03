import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type {
  EventEffect,
  Organization,
  PersonAgencyGoal,
  PersonLife,
  RoleRequirement,
  SceneCondition,
  TaskDomain,
  TaskNeed,
} from '../domain.js';
import type { GeneratedTaskMeta } from '../generated.js';

/**
 * Phase 9 content briefs: ordinary institutions under pressure.
 *
 * Three event packs (medical/public health, union/political life, war and
 * homefront aftermath) and two active-task packs (public action, cultural
 * contact). Event packs are scheduled by rate; task packs are offered by
 * Agency. Pack age windows preserve the requested thematic range, while
 * `stage` is the lifecycle slice the engine uses for the pool.
 *
 * The war family is gated on a war process or a war-aftermath legacy;
 * it never assumes that 1914 or 1918 happened. The cultural-contact tasks use
 * the four curated historical identities only through a concrete channel
 * (a branch letter, a subscription, a training request, a theatre letter)
 * and never promise an automatic audience with a celebrity.
 */

type Skill = keyof PersonLife['skills'];
type CapabilityName =
  | 'literacy'
  | 'numeracy'
  | 'social_insight'
  | 'craft_affinity'
  | 'frail_body'
  | 'craft'
  | 'social'
  | 'health';

function task(
  domain: TaskDomain,
  goals: PersonAgencyGoal[],
  needs: TaskNeed[],
  baseUtility: number,
  risk: number,
  skills: Skill[] = [],
  capability?: CapabilityName,
): GeneratedTaskMeta {
  return { domain, goals, needs, baseUtility, risk, skills, ...(capability ? { capability } : {}) };
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

const subject = (minAge: number, maxAge: number, sex?: RoleRequirement['sex']): RoleRequirement =>
  role('subject', 'subject', minAge, maxAge, true, sex ? { sex } : {});

const neighbor = (minAge = 18, maxAge = 75, required = true): RoleRequirement =>
  role('neighbor', 'neighbor', minAge, maxAge, required);

const worker = (minAge = 18, maxAge = 65, required = true, occupation?: string): RoleRequirement =>
  role('worker', 'worker', minAge, maxAge, required, occupation ? { occupation } : {});

const employer = (minAge = 35, maxAge = 70, required = true): RoleRequirement =>
  role('employer', 'employer', minAge, maxAge, required);

const unionMember = (minAge = 25, maxAge = 65, required = true): RoleRequirement =>
  role('unionMember', 'union_member', minAge, maxAge, required);

const official = (
  minAge = 30,
  maxAge = 65,
  required = true,
  organizationKind?: Organization['kind'],
): RoleRequirement =>
  role(
    'official',
    'official',
    minAge,
    maxAge,
    required,
    organizationKind ? { organizationKind } : {},
  );

const teacher = (minAge = 30, maxAge = 70, required = true): RoleRequirement =>
  role('teacher', 'teacher', minAge, maxAge, required);

const doctor = (required = true): RoleRequirement =>
  role('doctor', 'worker', 30, 70, required, { occupation: 'Arzt' });

const historical = (
  key: string,
  historicalId: string,
  minAge: number,
  maxAge: number,
  required = true,
): RoleRequirement => role(key, 'historical', minAge, maxAge, required, { historicalId });

const organization = (
  key: string,
  kind: Organization['kind'],
  required = false,
): RoleRequirement => ({
  key,
  kind: 'organization',
  required,
  organizationKind: kind,
});

const age = (min: number, max: number): SceneCondition => ({ kind: 'age', min, max });
const cash = (min?: number, max?: number): SceneCondition => ({
  kind: 'cash',
  ...(min !== undefined ? { min } : {}),
  ...(max !== undefined ? { max } : {}),
});
const health = (min?: number, max?: number): SceneCondition => ({
  kind: 'health',
  ...(min !== undefined ? { min } : {}),
  ...(max !== undefined ? { max } : {}),
});

const medicalEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'flag',
  'knowledge',
];

const politicsEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'role',
  'organization_membership',
  'skill',
  'employment',
  'unemployment',
  'flag',
  'knowledge',
];

const warEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'role',
  'employment',
  'unemployment',
  'flag',
  'knowledge',
];

const actionEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'health',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'role',
  'organization_membership',
  'skill',
  'employment',
  'unemployment',
  'flag',
  'knowledge',
];

const cultureEffects: EventEffect['type'][] = [
  'cash',
  'food',
  'mood',
  'reputation',
  'relation',
  'relation_end',
  'role',
  'skill',
  'education',
  'flag',
  'knowledge',
];

const node = (brief: ContentNodeBrief): ContentNodeBrief => brief;

export const PHASE9_HISTORY_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'p9-history-medical-daily',
    kind: 'event',
    title: '诊所、药房与卫生巡查',
    stage: 'adulthood',
    ageWindow: { min: 22, max: 70 },
    tags: ['health', 'medical', 'public_health', 'family', 'pharmacy', 'sanitation', 'daily'],
    baseRate: 0.2,
    conditions: [age(22, 70)],
    nodeBriefs: [
      node({
        id: 'p9-history-medical-daily.clinic-queue',
        title: '诊所门口的长队',
        premise:
          '天还没亮，诊所门口的队伍已经拐过街角。有人抱着发烧的孩子，有人捂着胸口，门房每隔一会儿出来喊一个号码；挂号费、转诊单和药费分别排在三个窗口。',
        weight: 1,
        rateShare: 0.18,
        conditions: [age(22, 70), cash(undefined, 45)],
        roles: [
          subject(22, 70),
          neighbor(1, 80),
          role('clerk', 'official', 30, 65, false, { occupation: 'Kanzleidiener' }),
        ],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '排到中午才进诊室，用最后几枚硬币付了挂号费，拿到一张去综合医院的转诊单',
          '把靠前的位置让给抱孩子的女人，自己去药房买退烧药，回家后烧得更厉害',
          '和门房为号码争吵，被推到街边，傍晚回来时队伍已经散了',
        ],
      }),
      node({
        id: 'p9-history-medical-daily.house-call',
        title: '雪夜里的出诊',
        premise:
          '夜里有人敲窗，说隔壁楼的孩子烧到抽搐。医生住在两条街外，出诊费要现付；雪把电车轨道埋了一半，屋里的人把仅有的煤都添进了炉子。',
        weight: 1,
        rateShare: 0.18,
        conditions: [age(22, 70), { kind: 'placeKind', in: ['home'] }, health(undefined, 0.9)],
        roles: [subject(22, 70), neighbor(1, 80), doctor()],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '冒雪去敲医生的门，先付一半出诊费，医生答应天亮前到',
          '背起孩子去综合医院，在急诊走廊等到早晨，孩子退了烧',
          '用湿布和退烧药熬到天亮，医生来时只留下一张饮食单',
        ],
      }),
      node({
        id: 'p9-history-medical-daily.pharmacy-shortage',
        title: '药房里最后一瓶药',
        premise:
          '药房的货架上空了一排，药剂师把最后一瓶止咳药水放在柜台上，说下批货不知道什么时候到。柜台另一边摆着更贵的进口药和几包草药；处方上的字被水洇开。',
        weight: 1,
        rateShare: 0.16,
        conditions: [age(22, 70), cash(undefined, 50), health(undefined, 0.95)],
        roles: [subject(22, 70), neighbor(18, 75, false), worker(30, 70, true, 'Apotheker')],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '买下最后一瓶，按处方分成两次服用，把药钱记在账本上',
          '听药剂师的话改用草药和热汤，省下钱买煤',
          '拿着处方去综合医院药房排队，直到傍晚才领到替代药',
        ],
      }),
      node({
        id: 'p9-history-medical-daily.patient-family',
        title: '病房外的家属',
        premise:
          '病房外的长椅上，家属把诊断书、费用单和一张写满借款名字的纸摊开。医生说手术还有机会，但要先交押金；家里的床、炉子和上学的孩子都要有人照看。',
        weight: 1,
        rateShare: 0.16,
        conditions: [
          age(22, 55),
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.1 },
          cash(undefined, 80),
        ],
        roles: [subject(22, 55), role('patient', 'parent', 55, 90), doctor()],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '签字同意手术，四处借钱交押金，把病人留给医院照看',
          '把病人接回家，按医生的单子换药，自己夜里守着',
          '和医生争起费用，要求先看明细，最后只付了药费',
        ],
      }),
      node({
        id: 'p9-history-medical-daily.suspicious-death',
        title: '一张写得含糊的死亡证明',
        premise:
          '楼下的房客夜里死了，早晨才被送牛奶的人发现。医生在死亡证明上写了“心力衰竭”，死者的妹妹却记得死者前一天刚从药房拿回一包白色药粉；房东已经在问谁来付欠租。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [age(22, 70), { kind: 'placeKind', in: ['home'] }],
        roles: [
          subject(22, 70),
          neighbor(18, 75),
          doctor(),
          role('clerk', 'official', 30, 65, false, { organizationKind: 'state' }),
        ],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '陪死者的妹妹去市政办事处，要求重新验尸并写下药粉的来路',
          '接受医生的说法，帮家属凑钱办葬礼，把药包扔进炉子',
          '去药房追问处方，被药剂师赶出来，只抄到半个名字',
        ],
      }),
      node({
        id: 'p9-history-medical-daily.sanitation-inspection',
        title: '院子里的卫生巡查',
        premise:
          '市政卫生巡查员带着本子走进院子，先看公共水龙头，再看厕所和垃圾箱。住户们把湿衣服往绳子上挤，房东不在，看门人说下水道去年就堵了；巡查员要每户派一个人在纸上签字。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(22, 70),
          { kind: 'placeKind', in: ['home'] },
          { kind: 'overcrowded', value: true },
        ],
        roles: [subject(22, 70), official(30, 65, true, 'state'), neighbor(18, 75)],
        allowedEffects: medicalEffects,
        outcomeHints: [
          '带头指出堵住的下水道，在巡查记录上签名，要求房东限期修理',
          '替不识字的邻居读表，只签自己那一户，不愿替别人出头',
          '和看门人一起把垃圾挪到后院，巡查员走后一切照旧',
        ],
      }),
    ],
  },
  {
    id: 'p9-history-union-political',
    kind: 'event',
    title: '工会后屋、传单与街头的名单',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['politics', 'union', 'party', 'meeting', 'leaflet', 'police', 'strike', 'reform'],
    baseRate: 0.2,
    conditions: [age(18, 65)],
    nodeBriefs: [
      node({
        id: 'p9-history-union-political.meeting',
        title: '后屋会议',
        premise:
          '工会后屋挤了三十多人，长凳不够，后来的人靠墙站着。桌上摊着会费账本和一张要求提高计件工价的草稿；有人主张先谈，有人主张直接停工，主持人把发言名单钉在门边。',
        weight: 1,
        rateShare: 0.18,
        conditions: [age(18, 65), { kind: 'placeKind', in: ['union', 'factory'] }],
        roles: [
          subject(18, 65),
          worker(18, 60),
          unionMember(25, 65),
          official(30, 65, false, 'state'),
        ],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '站起来报出自己车间的工价，要求把加薪写进动议',
          '只交会费，不发言，散会后帮主持人收拾椅子',
          '提议先派代表去找厂主，谈不成再投票停工',
        ],
      }),
      node({
        id: 'p9-history-union-political.leaflets',
        title: '楼梯口的传单',
        premise:
          '一份要求缩短工时、承认工会的传单要在早班前发完。油墨还没干，纸是大家凑钱买的；厂门口站着门房，街角有巡警，谁把传单塞进更衣柜就可能被记下名字。',
        weight: 1,
        rateShare: 0.17,
        conditions: [
          age(18, 65),
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'union_member' },
        ],
        roles: [
          subject(18, 65),
          worker(18, 60),
          official(30, 65, false, 'state'),
          organization('union', 'union'),
        ],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '把传单折进面包纸，早班前塞进更衣柜和工具柜',
          '在厂门外被巡警拦住，传单被没收，名字被记进本子',
          '放弃散发，把传单送到党部印刷所，改在星期天集市上发',
        ],
      }),
      node({
        id: 'p9-history-union-political.police-observation',
        title: '街对面的便衣',
        premise:
          '散会时，两个穿便衣的人站在街对面，其中一人已经跟了三条街。工会的律师说过，不要在现场争执，也不要替别人报住址；可门房已经开始盘问晚归的住户。',
        weight: 1,
        rateShare: 0.17,
        conditions: [
          age(18, 65),
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'placeKind', in: ['union', 'street'] },
        ],
        roles: [
          subject(18, 65),
          official(30, 65, true, 'state'),
          neighbor(18, 75),
          unionMember(25, 65, false),
        ],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '报了一个已经搬走的旧地址，第二天把会员册转移到别处',
          '停下来问对方姓名和所属机关，要求出示证件',
          '绕路去工会活动室，把被跟踪的事告诉当晚的主持人',
        ],
      }),
      node({
        id: 'p9-history-union-political.split',
        title: '一张桌子分成两边',
        premise:
          '会议开到一半，有人提出工会应该支持一个主张普选改革的委员会，另一些人说这会把整个组织拖进警察的名单。两边的名单都摊在桌上，主持人宣布休会十分钟；门外已经有人在等消息。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(18, 65),
          { kind: 'hasRole', role: 'union_member' },
          {
            kind: 'historicalProcess',
            processKind: 'social_movement',
            phases: ['mobilizing', 'confrontation', 'repression'],
          },
        ],
        roles: [
          subject(18, 65),
          worker(18, 60),
          unionMember(25, 65),
          organization('union', 'union'),
          official(30, 65, false, 'state'),
        ],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '站到支持改革委员会的一边，在少数派名单上签名，第二天被厂里叫去问话',
          '主张把两派的分歧写成公开辩论，不立刻表决，保住组织的会费',
          '把会员证放在桌上，退出会议，转去帮街区的互助厨房',
        ],
      }),
      node({
        id: 'p9-history-union-political.strike-vote',
        title: '罢工投票',
        premise:
          '车间停工一小时，工会把票箱放在食堂的长桌上。厂主说参加停工的人月底没有班可上，工会的罢工基金只够发两周；工人排成两列，有人把选票折得很小，有人干脆不拿。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(18, 65),
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'union_member' },
          {
            kind: 'historicalProcess',
            processKind: 'social_movement',
            phases: ['mobilizing', 'confrontation'],
          },
        ],
        roles: [subject(18, 65), worker(18, 60), employer(35, 70), unionMember(25, 65)],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '投赞成票，被选进罢工委员会，负责登记愿意停工的人',
          '投反对票，继续上工，午休时被工友冷落在一边',
          '不投票，替双方传话，晚上把厂主的原话带给工会',
        ],
      }),
      node({
        id: 'p9-history-union-political.reform-meeting',
        title: '改革会议上的请愿书',
        premise:
          '市政厅旁的礼堂开了一场关于房租、选举权和工时的公开会议。台上坐着官员和工会代表，台下有人举着写满签名的请愿书；会议记录员只记正式发言，门口的法警在数人数。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(18, 65),
          { kind: 'placeKind', in: ['government', 'union', 'other'] },
          {
            kind: 'education',
            in: ['primary', 'secondary', 'higher', 'apprenticeship'],
          },
        ],
        roles: [
          subject(18, 65),
          official(30, 65, true, 'state'),
          worker(18, 60),
          teacher(30, 65, false),
        ],
        allowedEffects: politicsEffects,
        outcomeHints: [
          '在提问时间读出请愿书上的三条要求，要求记录员逐条记下',
          '把请愿书交给工会代表，自己退到后排，避免被法警注意',
          '会议只通过成立一个研究委员会，散会后和工友在门口商量下一步',
        ],
      }),
    ],
  },
  {
    id: 'p9-history-war-homefront',
    kind: 'event',
    title: '动员、配给与战后的空床',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    tags: ['war', 'homefront', 'mobilization', 'rationing', 'hospital', 'veteran', 'memorial'],
    baseRate: 0.18,
    conditions: [age(18, 70)],
    nodeBriefs: [
      node({
        id: 'p9-history-war-homefront.mobilization-notice',
        title: '门缝里的动员通知',
        premise:
          '一封盖着军营印章的信从门缝塞进来，里面写着报到日期、车站和随身物品。家里的房租、煤和老人的药都还没有着落；厂主说位置可以留到月底，但工钱不会补。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          age(18, 50),
          {
            kind: 'historicalProcess',
            processKind: 'war_mobilization',
            phases: ['emerging', 'mobilizing', 'confrontation'],
          },
        ],
        roles: [subject(18, 50, 'male'), neighbor(18, 70), official(30, 70, true, 'army')],
        allowedEffects: warEffects,
        outcomeHints: [
          '按日期去兵营报到，把钥匙和半个月工钱交给邻居，托他照看家里',
          '先去找厂主和市政办事处问缓征，排了一天队，只拿到一张待查的纸条',
          '没有去报到，搭夜车去城外的亲戚家，让家里对外说已经收到通知',
        ],
      }),
      node({
        id: 'p9-history-war-homefront.rationing',
        title: '面包店门前的配给队',
        premise:
          '面包店六点开门，队伍四点就排到了街角。每人凭卡领一份黑面包，面粉和煤油另外登记；店里说今天的货只够前三十个人，后面的人只能明天再来。',
        weight: 1,
        rateShare: 0.18,
        conditions: [
          age(18, 70),
          {
            kind: 'historicalProcess',
            processKind: 'war_mobilization',
            phases: ['mobilizing', 'confrontation', 'repression'],
          },
        ],
        roles: [subject(18, 70), neighbor(18, 75), worker(30, 70, false, 'Bäcker')],
        allowedEffects: warEffects,
        outcomeHints: [
          '排到下午只领到半份面包，把一半留给家里的孩子',
          '用更高的价钱从街角的人手里买下一袋面粉，没有要收据',
          '和邻居合用一张卡，轮流排队，把多领的一份记在账上',
        ],
      }),
      node({
        id: 'p9-history-war-homefront.hospital',
        title: '医院走廊里的第三张床',
        premise:
          '医院走廊加了两张床，第三张只能靠在窗边。伤员从前线送回来，绷带和热水都不够；护士让家属自己带床单，医生只来得及看最重的几个。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(18, 70),
          {
            kind: 'historicalProcess',
            processKind: 'war_mobilization',
            phases: ['mobilizing', 'confrontation', 'repression', 'institutionalizing'],
          },
        ],
        roles: [subject(18, 70), neighbor(18, 70), doctor()],
        allowedEffects: warEffects,
        outcomeHints: [
          '留下来帮护士换床单、烧热水，直到夜里查房',
          '把伤员接回家，按医生写的单子换药，自己去药房排队',
          '找不到床位，只能把伤员送到城另一头的私人诊所，先付一笔押金',
        ],
      }),
      node({
        id: 'p9-history-war-homefront.missing-relative',
        title: '失踪名单上的名字',
        premise:
          '军营来的信只有两行：在某次战斗后失去联系，正在查询。家里的信箱从此每天开两次，市政办事处和红十字会各有一张不同的表；母亲把最后一封家信按日期排好。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [
          age(18, 50),
          { kind: 'hasRelation', relationKind: 'kin', minTrust: 0.2 },
          {
            kind: 'historicalProcess',
            processKind: 'war_mobilization',
            phases: ['mobilizing', 'confrontation', 'repression', 'institutionalizing'],
          },
        ],
        roles: [subject(18, 50), role('mother', 'parent', 45, 85), official(30, 70, true, 'army')],
        allowedEffects: warEffects,
        outcomeHints: [
          '按表格逐项填写，附上最后一封信的抄件，每隔两周去问一次',
          '托军营里的熟人查连队名册，得到一句“暂无记录”，没有收到正式通知',
          '不再等回信，去红十字会问战俘名单，又去墓地抄新立的木牌',
        ],
      }),
      node({
        id: 'p9-history-war-homefront.returning-veteran',
        title: '退伍军人回到院子里',
        premise:
          '他比离家时瘦了一圈，左手少了两根手指，夜里听见关门声会从床上坐起来。退伍证明和抚恤金申请放在桌上，厂主说原来的位置已经有人，邻居们站在楼梯口不知道该不该问。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [age(18, 70), { kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [subject(18, 70), neighbor(18, 70), employer(35, 70, false)],
        allowedEffects: warEffects,
        outcomeHints: [
          '陪他去市政办事处递抚恤金申请，又去厂里问有没有轻活',
          '介绍他去街角铺子做帮手，工钱按天算，不签长期合同',
          '听他讲完前线的事，之后尽量避开，怕他酒后砸东西',
        ],
      }),
      node({
        id: 'p9-history-war-homefront.war-memorial',
        title: '纪念碑上的空白',
        premise:
          '街区要在一面墙上刻战争死者的名字，委员会收了捐款，名单却一直定不下来。有人要求把失踪者也刻上，有人说自杀和逃兵不能算；寡妇们带着结婚证和军邮信在会场上等。',
        weight: 0.9,
        rateShare: 0.16,
        conditions: [age(18, 70), { kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [
          subject(18, 70),
          neighbor(18, 75),
          official(30, 65, false, 'state'),
          worker(18, 60, false),
        ],
        allowedEffects: warEffects,
        outcomeHints: [
          '把失踪者和没有墓碑的人补进名单，挨家收钱刻字',
          '在会上反对把逃兵的名字刻上去，散会后被一个寡妇拦住',
          '不参加委员会，只帮邻居把死者的军邮信抄进一本纪念册',
        ],
      }),
    ],
  },
  {
    id: 'p9-history-public-action',
    kind: 'task',
    task: task('politics', ['cause', 'belonging'], ['belonging', 'status'], 1.3, 0.35, [
      'social',
      'literacy',
    ]),
    title: '工会、政党与街头的行动',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['politics', 'union', 'party', 'activism', 'public_action', 'relief', 'leaflet'],
    baseRate: 0.1,
    conditions: [age(18, 65)],
    nodeBriefs: [
      node({
        id: 'p9-history-public-action.join-union-party',
        title: '工会活动室的两张表',
        premise:
          '工会活动室在印刷厂后面，墙上贴着会费和罢工基金的数字；隔壁党部的桌上也摆着一叠入党表。一个老会员把工会入会表推过来，问来者愿不愿意在下周会议上自我介绍；门边还靠着上次集会用过的木牌。',
        weight: 1,
        conditions: [
          age(18, 65),
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory', 'union'] },
          { kind: 'notHasRole', role: 'union_member' },
        ],
        roles: [
          subject(18, 65),
          unionMember(25, 65),
          organization('union', 'union'),
          organization('party', 'party', false),
        ],
        allowedEffects: actionEffects,
        task: task('politics', ['cause', 'belonging'], ['belonging', 'safety'], 1.3, 0.3, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '当场填表，按周交会费，名字被写进蓝皮会员册',
          '只去听一次会议，不签字，也不交罢工基金',
          '没有在工会表上签字，转去隔壁党部问入党手续和会费',
        ],
      }),
      node({
        id: 'p9-history-public-action.recruit-coworker',
        title: '午饭时的空座位',
        premise:
          '午饭时，一个年轻工友独自坐在窗边，抱怨工钱被扣。工会会员端着汤坐过去，先问他家里几口人，再问他知不知道下个月的请愿；食堂里有人竖起耳朵。',
        weight: 1,
        conditions: [
          age(18, 65),
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory'] },
          { kind: 'hasRole', role: 'union_member' },
        ],
        roles: [subject(18, 65), worker(18, 60), employer(35, 70, false)],
        allowedEffects: actionEffects,
        task: task('social', ['cause', 'belonging'], ['belonging', 'status'], 1.25, 0.4, [
          'social',
        ]),
        outcomeHints: [
          '工友第二天来交了会费，还带来同车间的两个人',
          '工友把谈话告诉了工头，下午工会会员就被叫去问话',
          '工友答应来听一次会，但始终没有在名册上签字',
        ],
      }),
      node({
        id: 'p9-history-public-action.publish-leaflet',
        title: '油印机旁的夜班',
        premise:
          '一份要求缩短工时和承认工会的传单要赶在星期一早班前印出来。纸张是大家凑钱买的，油墨从厂里刮来半罐；谁去分发，谁就可能被警察记下名字。',
        weight: 1,
        conditions: [
          age(18, 65),
          { kind: 'placeKind', in: ['factory', 'union'] },
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'capability', capability: 'literacy' },
        ],
        roles: [
          subject(18, 65),
          worker(18, 60, true, 'Buchdrucker'),
          official(30, 65, false, 'state'),
          organization('union', 'union'),
        ],
        allowedEffects: actionEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.35, 0.55, [
          'literacy',
          'craft',
        ]),
        outcomeHints: [
          '传单在早班前塞进更衣柜和面包袋，午休时已经有人在楼梯间读',
          '警察在厂门口搜包，传单被没收，还收到一张传唤单',
          '排字工不肯冒险开机，只好手写几张，贴到市场附近的墙上',
        ],
      }),
      node({
        id: 'p9-history-public-action.speak-meeting',
        title: '后屋的发言顺序',
        premise:
          '后屋挤了四十多人，长凳不够，后来的人靠墙站着。主持人把发言名单钉在门边，第一个名字被划掉，第二个名字就是来者；桌上只有半瓶啤酒和一只会停的钟。',
        weight: 1,
        conditions: [
          age(20, 65),
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'placeKind', in: ['union', 'factory', 'other'] },
        ],
        roles: [
          subject(20, 65),
          unionMember(30, 65),
          worker(18, 60),
          official(30, 65, false, 'state'),
        ],
        allowedEffects: actionEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.3, 0.45, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '把工价和工时讲清楚，会议通过了一项要求加薪的动议',
          '话被嘘声打断，会议分成两派，事后有人怪来者太急',
          '站到桌边又坐下，把发言让给了旁边的老工人',
        ],
      }),
      node({
        id: 'p9-history-public-action.negotiate-employer',
        title: '厂长办公室里的三个人',
        premise:
          '厂长把怀表放在桌上，说只能谈一刻钟。工会代表带着一张写满工价和工时的纸，门外站着两个被扣了工资的工人；窗台上摆着一盆快枯的常春藤。',
        weight: 1,
        conditions: [
          age(25, 65),
          { kind: 'employment', employed: true },
          { kind: 'placeKind', in: ['factory', 'government'] },
          { kind: 'hasRole', role: 'union_member' },
        ],
        roles: [
          subject(25, 65),
          employer(35, 70),
          official(30, 65, false, 'state'),
          worker(18, 60),
        ],
        allowedEffects: actionEffects,
        task: task('work', ['work', 'cause'], ['cash', 'safety'], 1.5, 0.6, ['social', 'numeracy']),
        outcomeHints: [
          '厂长同意给被扣工资的工人补一半，并答应下月再谈工时',
          '厂长叫来门房，把代表请出办公室，第二天车间门口贴出停工通知',
          '市政厅的官员把双方请去谈了两个小时，最后只成立了一个没有期限的委员会',
        ],
      }),
      node({
        id: 'p9-history-public-action.organize-relief',
        title: '互助厨房的账本',
        premise:
          '失业的印刷工和病人挤在同一条街上，工会想开一间互助厨房，但只有一只旧锅、半袋面粉和一本缺页的账本。教堂愿意借出侧厅，市政办事处要求先交一份名单；房东们则担心厨房会把闲人招来。',
        weight: 1,
        conditions: [age(18, 65), { kind: 'placeKind', in: ['home', 'union', 'church'] }, cash(3)],
        roles: [
          subject(18, 65),
          neighbor(18, 75),
          official(30, 65, false, 'state'),
          organization('church', 'church'),
        ],
        allowedEffects: actionEffects,
        task: task('politics', ['care', 'belonging'], ['food', 'belonging'], 1.4, 0.25, [
          'social',
          'numeracy',
        ]),
        outcomeHints: [
          '借下教堂侧厅，按名单每天煮一锅汤，账本贴在门口',
          '市政办事处不肯批名单，只好在工会后院支起炉子，先照顾最穷的几户',
          '面粉只够三天，和邻居分头去市场赊账，把欠款记在自己名下',
        ],
      }),
    ],
  },
  {
    id: 'p9-history-cultural-contact',
    kind: 'task',
    task: task('culture', ['knowledge', 'status'], ['knowledge', 'status'], 1.25, 0.2, [
      'literacy',
      'social',
    ]),
    title: '书信、讲堂与文化圈',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['culture', 'knowledge', 'letter', 'lecture', 'editor', 'training', 'circle'],
    baseRate: 0.1,
    conditions: [age(18, 65)],
    nodeBriefs: [
      node({
        id: 'p9-history-cultural-contact.letter-adler',
        title: '寄往党部的信',
        premise:
          '工会支部想请一位有名望的党领袖来维也纳郊区讲话，但总部离工厂很远。信纸上写了三遍称呼，最后决定由支部出名，附上会费收据和会议日期；街角的报摊已经卖完了当天的《工人报》。',
        weight: 1,
        conditions: [
          age(22, 65),
          { kind: 'hasRole', role: 'union_member' },
          { kind: 'placeKind', in: ['union', 'factory', 'home'] },
          cash(1),
          {
            kind: 'historicalProcess',
            processKind: 'social_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [
          subject(22, 65),
          historical('adler', 'Q366845', 58, 66),
          organization('party', 'party'),
        ],
        allowedEffects: cultureEffects,
        task: task('politics', ['cause', 'status'], ['belonging', 'status'], 1.35, 0.3, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Adler 回了信，答应派一位演说者，还附上一叠党的小册子',
          '回信很客气，只说总部排不出人，建议先和本地支部联系',
          '信在编辑部压了两个星期，来者索性搭电车进城，在门口等到散会',
        ],
      }),
      node({
        id: 'p9-history-cultural-contact.letter-kraus',
        title: '给《火炬》编辑部的一封信',
        premise:
          '《火炬》最近一篇关于新闻语言的文章在咖啡馆里被人反复引用。来者写了一封六页的信，指出文中一处自相矛盾，又附上自己的短文；信寄往洛林街的编辑部，信封里还放了回邮的邮票。',
        weight: 1,
        conditions: [
          age(20, 65),
          { kind: 'education', in: ['secondary', 'higher'] },
          { kind: 'placeKind', in: ['cafe', 'home'] },
          cash(2),
          {
            kind: 'historicalProcess',
            processKind: 'cultural_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [
          subject(20, 65),
          historical('kraus', 'Q44328', 37, 50),
          worker(30, 65, false, 'Redakteur'),
        ],
        allowedEffects: cultureEffects,
        task: task('knowledge', ['knowledge', 'status'], ['knowledge', 'status'], 1.25, 0.35, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Kraus 回了一张措辞尖刻的明信片，却在下一期里引用了他的短文',
          '信没有回音，一个月后原稿被退回，页边多了几处红笔批注',
          'Kraus 没有回信，但托人带话，请他去参加下一次朗读会',
        ],
      }),
      node({
        id: 'p9-history-cultural-contact.letter-freud',
        title: '寄往 Berggasse 19 的求学信',
        premise:
          '来者在综合医院做助理医生，想跟 Freud 学习神经病人的谈话和病历记录，但不知道他是否收学生、要不要先接受一段分析、费用怎么算。信里附上导师的推荐条和自己在病房抄的病例；回信通常很慢。',
        weight: 1,
        conditions: [
          age(22, 40),
          { kind: 'education', in: ['higher'] },
          { kind: 'employment', employed: true },
          { kind: 'hasRelation', relationKind: 'colleague', minTrust: 0.1 },
          cash(10),
          { kind: 'placeKind', in: ['home', 'hospital'] },
          {
            kind: 'historicalProcess',
            processKind: 'cultural_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [
          subject(22, 40),
          historical('freud', 'Q9215', 55, 66),
          role('mentor', 'worker', 40, 70, false, { occupation: 'Arzt' }),
        ],
        allowedEffects: cultureEffects,
        task: task('education', ['knowledge', 'status'], ['knowledge', 'status'], 1.3, 0.25, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Freud 回信说可以先来听周三的讨论，但要自己找一位分析者，费用另算',
          '回信只有一句：病房经验不够，先去综合医院做满一年助理',
          '信没有回音，来者把推荐条和病例收进抽屉，改去听大学的神经病理课',
        ],
      }),
      node({
        id: 'p9-history-cultural-contact.letter-schnitzler',
        title: '给剧作家的一封信与公开讲座',
        premise:
          'Burgtheater 要办一场公开讲座和朗读，票在正厅和楼座分别出售，作者本人可能到场。来者打算买票去听，先写信问清楚讲座后是否有讨论、能否把一篇习作交给在场的编辑；信寄到剧院，附上贴好邮票的回邮信封。',
        weight: 1,
        conditions: [
          age(20, 65),
          { kind: 'education', in: ['secondary', 'higher'] },
          cash(3),
          { kind: 'placeKind', in: ['cafe', 'other'] },
          {
            kind: 'historicalProcess',
            processKind: 'cultural_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [
          subject(20, 65),
          historical('schnitzler', 'Q44331', 48, 58),
          worker(30, 65, false, 'Redakteur'),
          teacher(30, 70, false),
        ],
        allowedEffects: cultureEffects,
        task: task('culture', ['knowledge', 'belonging'], ['belonging', 'status'], 1.2, 0.25, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          'Schnitzler 的秘书回了信，确认朗读后有讨论，但座位在前一天售罄',
          '来者买到楼座最后一张票，朗读后把习作交给一位编辑，没有见到 Schnitzler',
          '信没有回音，来者还是去了剧院，在门廊里等到散场，只远远看见 Schnitzler 上车',
        ],
      }),
      node({
        id: 'p9-history-cultural-contact.submit-editor',
        title: '编辑部窗下的稿子',
        premise:
          '稿子改了四遍，信封上写着《新自由报》副刊的地址。编辑部在环城大道旁，窗下堆着退稿和咖啡杯；作者在门口站了一会儿，才把信封投进铜口，回邮邮票用完了。',
        weight: 1,
        conditions: [
          age(20, 65),
          { kind: 'education', in: ['secondary', 'higher'] },
          { kind: 'capability', capability: 'literacy' },
          cash(2),
          { kind: 'placeKind', in: ['other', 'factory'] },
          {
            kind: 'historicalProcess',
            processKind: 'cultural_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [subject(20, 65), worker(30, 65, true, 'Redakteur'), neighbor(25, 65, false)],
        allowedEffects: cultureEffects,
        task: task('knowledge', ['knowledge', 'status'], ['status', 'knowledge'], 1.2, 0.35, [
          'literacy',
          'social',
        ]),
        outcomeHints: [
          '副刊用了这篇稿子，删去末尾两段，寄来稿费和一张约稿便条',
          '信封退回时夹着一张铅印退稿单，页边只有一句“材料尚可，写法太急”',
          '编辑把稿子留在抽屉里，说等下一个季度的版面，既没有答应也没有退回',
        ],
      }),
      node({
        id: 'p9-history-cultural-contact.join-circle',
        title: '咖啡馆后厅的文化圈',
        premise:
          '咖啡馆后厅每星期四晚上聚着一小圈人，读诗、谈剧，也传阅新到的刊物。进门要有人介绍，桌上按人头收咖啡钱；来者只认识其中一位会员，想在朗读后问问能不能加入。',
        weight: 1,
        conditions: [
          age(18, 65),
          { kind: 'education', in: ['secondary', 'higher'] },
          cash(3),
          { kind: 'hasRelation', relationKind: 'acquaintance', minTrust: 0.1 },
          { kind: 'placeKind', in: ['cafe', 'home'] },
          {
            kind: 'historicalProcess',
            processKind: 'cultural_movement',
            phases: ['emerging', 'mobilizing', 'confrontation', 'institutionalizing'],
          },
        ],
        roles: [
          subject(18, 65),
          neighbor(25, 65),
          teacher(30, 70, false),
          role('writer', 'worker', 30, 65, false, { occupation: 'Schriftsteller' }),
        ],
        allowedEffects: cultureEffects,
        task: task('culture', ['belonging', 'knowledge'], ['belonging', 'status'], 1.15, 0.2, [
          'social',
          'literacy',
        ]),
        outcomeHints: [
          '会员把来者介绍给桌边的人，读完一篇短稿后，大家同意下次还来',
          '有人嫌来者的口音和衣着，说来者不像这个圈子的人，话题很快转到别处',
          '来者没有加入，只留下地址，答应替圈子抄一份节目单',
        ],
      }),
    ],
  },
];
