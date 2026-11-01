import type { ContentFamilyBrief } from './briefs.js';
import type { RoleRequirement, SceneCondition } from '../domain.js';

const subject = (): RoleRequirement => ({
  key: 'subject',
  kind: 'subject',
  required: true,
  minAge: 18,
  maxAge: 60,
});
const organization = (): RoleRequirement => ({
  key: 'organization',
  kind: 'organization',
  required: true,
});
const neighbor = (): RoleRequirement => ({
  key: 'neighbor',
  kind: 'neighbor',
  required: true,
  minAge: 18,
  maxAge: 70,
});
const official = (): RoleRequirement => ({
  key: 'official',
  kind: 'official',
  required: false,
  minAge: 25,
  maxAge: 65,
});

const conditions: SceneCondition[] = [
  { kind: 'age', min: 18, max: 60 },
  { kind: 'developmentType', type: 'social_change' },
];

/** Runtime Content Author brief for a validated social movement development. */
export const PHASE4_FAMILY_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'vienna-social-movement',
    title: '传单、后屋与名单',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['development', 'social_movement', 'organization', 'politics'],
    baseRate: 0.18,
    conditions,
    nodeBriefs: [
      {
        id: 'vienna-social-movement.leaflet',
        title: '楼梯下的一张传单',
        premise:
          '一张没有署名的传单被塞进门缝，上面写着集会地址和一句要求面包与停战的话。纸边被雨打湿，墨迹在手指上留下黑印。',
        weight: 1,
        rateShare: 0.25,
        conditions,
        roles: [subject(), organization(), neighbor()],
        allowedEffects: [
          'organization_membership',
          'relation',
          'relation_end',
          'mood',
          'reputation',
          'skill',
          'role',
          'flag',
          'condition',
          'cash',
          'food',
          'health',
          'employment',
          'unemployment',
        ],
        outcomeHints: [
          '去集会并加入组织，承担街区联络',
          '把传单藏起来，暂时不表态',
          '把传单交给门房或警察',
        ],
      },
      {
        id: 'vienna-social-movement.meeting',
        title: '后屋会议',
        premise:
          '后屋的桌上摊着会费账本、旧报纸和半瓶啤酒。有人报告哪个工厂在招人，有人说房东又涨了租。窗外有脚步声经过。',
        weight: 1,
        rateShare: 0.3,
        conditions,
        roles: [subject(), organization(), neighbor(), official()],
        allowedEffects: [
          'organization_membership',
          'relation',
          'relation_end',
          'mood',
          'reputation',
          'skill',
          'role',
          'flag',
          'condition',
          'cash',
          'food',
          'health',
          'employment',
          'unemployment',
        ],
        outcomeHints: ['在会议上发言，承担组织工作', '保持沉默，只交会费', '警察突袭，组织被查禁'],
      },
      {
        id: 'vienna-social-movement.raid',
        title: '门被敲响的夜晚',
        premise:
          '便衣警察在夜里敲门，手里拿着一份名单。楼道里的灯坏了，邻居把门开了一条缝又关上。桌上还有没来得及收起的油印纸。',
        weight: 1,
        rateShare: 0.25,
        conditions: [...conditions, { kind: 'worldYear', min: 1914, max: 1938 }],
        roles: [subject(), organization(), official(), neighbor()],
        allowedEffects: [
          'organization_membership',
          'relation',
          'relation_end',
          'mood',
          'reputation',
          'skill',
          'role',
          'flag',
          'condition',
          'cash',
          'food',
          'health',
          'employment',
          'unemployment',
        ],
        outcomeHints: [
          '把名单藏进墙缝，自己承担审问',
          '交出名单，换取放行',
          '从后门离开，暂时消失',
        ],
      },
      {
        id: 'vienna-social-movement.aftermath',
        title: '组织留下的名单',
        premise:
          '组织被查禁后，旧账本里还留着二十几个名字。有人搬走，有人被工厂开除，也有人仍然在周末来敲门，问下一次会议在哪里。',
        weight: 1,
        rateShare: 0.2,
        conditions,
        roles: [subject(), organization(), neighbor()],
        allowedEffects: [
          'organization_membership',
          'relation',
          'relation_end',
          'mood',
          'reputation',
          'skill',
          'role',
          'flag',
          'condition',
          'cash',
          'food',
          'health',
          'employment',
          'unemployment',
        ],
        outcomeHints: [
          '保留名单，继续在暗处联络',
          '烧掉名单，退出公开活动',
          '把名单交给警察，换取安全',
        ],
      },
    ],
  },
];
