import type { ContentFamilyBrief } from './briefs.js';
import type { EventEffect, RoleRequirement } from '../domain.js';

const subject = (): RoleRequirement => ({
  key: 'subject',
  kind: 'subject',
  required: true,
  minAge: 18,
  maxAge: 65,
});
const neighbor = (): RoleRequirement => ({
  key: 'neighbor',
  kind: 'neighbor',
  required: true,
  minAge: 18,
  maxAge: 75,
});
const worker = (): RoleRequirement => ({
  key: 'worker',
  kind: 'worker',
  required: false,
  minAge: 18,
  maxAge: 65,
});
const employer = (): RoleRequirement => ({
  key: 'employer',
  kind: 'employer',
  required: false,
  minAge: 25,
  maxAge: 75,
});
const official = (): RoleRequirement => ({
  key: 'official',
  kind: 'official',
  required: false,
  minAge: 25,
  maxAge: 70,
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
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'household',
  'residence',
];

/**
 * Phase 7 content briefs are about what a durable historical consequence feels
 * like years later. They deliberately avoid historical effects: the process has
 * already happened, and these are ordinary lives living with its institutions.
 */
export const PHASE7_FAMILY_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'vienna-legacy-worklife',
    title: '改革之后的工场与家庭',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 65 },
    tags: ['legacy', 'work', 'family', 'reform', 'ordinary_life'],
    baseRate: 0.16,
    conditions: [
      { kind: 'age', min: 18, max: 65 },
      { kind: 'legacy', legacyKind: 'reform' },
    ],
    nodeBriefs: [
      {
        id: 'vienna-legacy-worklife.hours-ledger',
        title: '工时表上的一行改动',
        premise:
          '工场新贴出的工时表把星期六下午划掉了。老工人不相信真会执行，年轻学徒已经在算少掉的工钱和空出来的半天。工头让每个人在表上按手印。',
        weight: 1,
        rateShare: 0.27,
        conditions: [{ kind: 'legacy', legacyKind: 'reform' }],
        roles: [subject(), worker(), employer()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '按新表留下名字，接受少一点的工钱换半天休息',
          '拒绝按手印，要求先补上被拖欠的计件工资',
          '替不识字的工友读表，并记下谁被漏掉',
        ],
      },
      {
        id: 'vienna-legacy-worklife.union-office',
        title: '工会办公室的欠账',
        premise:
          '工会办公室的账本上有一笔旧欠款，来自几年前那场争取工时的运动。现在的成员想把它销掉，老成员坚持要追。窗外有人来问入会，接待的人一时不知道怎么开口。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'legacy', legacyKind: 'reform' }],
        roles: [subject(), worker(), neighbor()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '把旧账公开贴在墙上，让新成员自己判断',
          '先替来问的人办入会，欠账留到下次会议',
          '主张销账，承认当年的承诺没有全部兑现',
        ],
      },
      {
        id: 'vienna-legacy-worklife.apprentice-wage',
        title: '学徒的第一张工资袋',
        premise:
          '学徒第一次领到按新规定计算的工资，比师兄说的多出几枚硬币。掌柜说这是“暂时的”，师兄让他别到处讲。工资袋上还沾着油墨。',
        weight: 1,
        rateShare: 0.24,
        conditions: [{ kind: 'legacy', legacyKind: 'reform' }],
        roles: [subject(), employer(), worker()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '把钱交给家里，没有声张新规定',
          '拿着工资袋去问掌柜为什么师兄的没有涨',
          '请师兄喝酒，顺便问清楚当年是谁争来的',
        ],
      },
      {
        id: 'vienna-legacy-worklife.sick-fund',
        title: '病假簿与互助金',
        premise:
          '一个工友在机器旁晕倒。互助金只够付两天药费，新的病假规定还没有人真正用过。大家看着墙上的规章，谁也不想第一个去填表。',
        weight: 1,
        rateShare: 0.24,
        conditions: [{ kind: 'legacy', legacyKind: 'reform' }],
        roles: [subject(), worker(), neighbor(), official()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '替工友填表，自己去衙门排队',
          '先拿互助金垫药费，再追着雇主补手续',
          '劝工友别填表，怕被记成闹事的人',
        ],
      },
    ],
  },
  {
    id: 'vienna-war-aftermath-life',
    title: '战后余波里的普通人家',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 70 },
    tags: ['legacy', 'war_aftermath', 'family', 'veteran', 'ordinary_life'],
    baseRate: 0.18,
    conditions: [
      { kind: 'age', min: 18, max: 70 },
      { kind: 'legacy', legacyKind: 'war_aftermath' },
    ],
    nodeBriefs: [
      {
        id: 'vienna-war-aftermath-life.pension-office',
        title: '抚恤金窗口',
        premise:
          '抚恤金窗口前排着一条很长的队。退伍军人、寡妇和替兄弟来问的人挤在一起，每个人手里都拿着不同年份的纸。窗口后的职员只说“下一个”。',
        weight: 1,
        rateShare: 0.27,
        conditions: [{ kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [subject(), official(), neighbor()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '替不识字的人读表，把自己的号让出去',
          '为了缺一张证明和职员争起来',
          '放弃排队，去黑市买更贵的面粉',
        ],
      },
      {
        id: 'vienna-war-aftermath-life.broken-clock',
        title: '停摆的挂钟',
        premise:
          '家里那口挂钟停在男人离家那天。现在有人提议修好它，也有人觉得修好了就等于承认他不会回来。桌上还放着一封没有拆开的官方信。',
        weight: 1,
        rateShare: 0.24,
        conditions: [{ kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [subject(), neighbor(), official()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '拆开官方信，按上面的地址去问',
          '把钟修好，不再等一个不会回来的人',
          '把信收进抽屉，先去给邻居家帮忙',
        ],
      },
      {
        id: 'vienna-war-aftermath-life.missing-room',
        title: '空出来的床铺',
        premise:
          '家里空出一张床，房东想把房间转租给两个新来的工人。租金能补上欠账，但那床铺上还留着旧军毯。新租客已经在门口等着看房。',
        weight: 1,
        rateShare: 0.25,
        conditions: [{ kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [subject(), neighbor(), worker()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '把床铺租出去，先把欠账补上',
          '留下床铺，替可能回来的人保留位置',
          '只租给带孩子的女人，租金少收一点',
        ],
      },
      {
        id: 'vienna-war-aftermath-life.rebuilding-crew',
        title: '修屋顶的临时工',
        premise:
          '街区组织临时工修一栋被战争拖坏屋顶的公寓。工钱按天算，材料不够，住户各有各的说法。有人提议先把钱留给寡妇家。',
        weight: 1,
        rateShare: 0.24,
        conditions: [{ kind: 'legacy', legacyKind: 'war_aftermath' }],
        roles: [subject(), worker(), neighbor()],
        allowedEffects: ordinaryEffects,
        outcomeHints: [
          '先修寡妇家的屋顶，自己的工钱以后再算',
          '要求按天结清工钱，否则不上去',
          '把材料账记下来，让住户自己决定顺序',
        ],
      },
    ],
  },
];
