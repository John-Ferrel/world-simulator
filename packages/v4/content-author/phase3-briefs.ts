import type { ContentFamilyBrief, ContentNodeBrief } from './briefs.js';
import type { RoleRequirement, SceneCondition } from '../domain.js';

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
const partner = (sameHousehold = true): RoleRequirement => ({
  key: 'partner',
  kind: 'partner',
  required: true,
  minAge: 18,
  maxAge: 60,
  ...(sameHousehold ? { sameHousehold: true } : {}),
});
const neighbor = (): RoleRequirement => ({
  key: 'neighbor',
  kind: 'neighbor',
  required: true,
  minAge: 18,
  maxAge: 75,
});
const employer = (): RoleRequirement => ({
  key: 'employer',
  kind: 'employer',
  required: true,
  minAge: 30,
  maxAge: 70,
  organizationKind: 'factory',
});
const official = (): RoleRequirement => ({
  key: 'official',
  kind: 'official',
  required: true,
  minAge: 25,
  maxAge: 65,
});

const node = (
  id: string,
  title: string,
  premise: string,
  roles: RoleRequirement[],
  outcomeHints: string[],
  conditions: SceneCondition[] = [],
): ContentNodeBrief => ({
  id,
  title,
  premise,
  roles,
  conditions,
  weight: 1,
  rateShare: 0.25,
  outcomeHints,
  allowedEffects: [
    'cash',
    'food',
    'health',
    'condition',
    'mood',
    'relation',
    'unemployment',
    'employment',
    'household',
    'role',
    'flag',
    'death',
  ],
});

/**
 * Phase 3 macro-driven content family. It is activated only when the macro
 * pressure `war_supply_stress` is present, so the same pack can stay dormant
 * in a peaceful alternate history.
 */
export const PHASE3_FAMILY_BRIEFS: ContentFamilyBrief[] = [
  {
    id: 'vienna-wartime-homefront',
    title: '战时的家书、配给与空位',
    stage: 'adulthood',
    ageWindow: { min: 18, max: 60 },
    tags: ['war', 'homefront', 'family', 'ration', 'separation'],
    baseRate: 0.24,
    conditions: [
      { kind: 'age', min: 18, max: 60 },
      { kind: 'pressure', key: 'war_supply_stress', min: 0.2 },
    ],
    nodeBriefs: [
      node(
        'vienna-wartime-homefront.field-letter',
        '前线的信与厨房里的回信',
        '邮差把一封折得很小的前线来信塞进门缝。信纸上没有写阵地位置，只说鞋底磨穿了，问家里能不能寄一双旧鞋。厨房里还留着昨天的面包皮。',
        [subject(18, 55), partner()],
        [
          '把家里仅剩的糖和鞋垫寄出去，自己少买一次煤',
          '先把信收进抽屉，等发薪日再回信',
          '去教区问能不能替前线士兵募一双鞋',
        ],
        [{ kind: 'pressure', key: 'war_supply_stress', min: 0.2 }],
      ),
      node(
        'vienna-wartime-homefront.ration-card',
        '配给卡上的一格',
        '面包店门口的队伍拐过街角。配给卡上这个月的面粉格已经被划掉，店员说下周也许有土豆。邻居压低声音提到黑市，但价格是官价的三倍。',
        [subject(18, 60), neighbor()],
        [
          '按配给卡排到底，接受缺斤少两',
          '向邻居借钱去黑市买一小袋面粉',
          '放弃面粉，改用萝卜和旧面包煮汤',
        ],
        [{ kind: 'pressure', key: 'war_supply_stress', min: 0.35 }],
      ),
      node(
        'vienna-wartime-homefront.war-work',
        '工厂里的空缺与女工',
        '车间里少了几个熟悉的男工。工头把一张新的工序表钉在墙上，说军需订单不能停；女工和学徒被安排到更重的机器旁，工钱却没有按同样标准计算。',
        [subject(18, 55), employer()],
        [
          '接受更重的工序，换取稳定的周薪',
          '和工友一起要求按岗位补足工钱',
          '以照护家里老人为由减少班次',
        ],
        [{ kind: 'pressure', key: 'war_supply_stress', min: 0.4 }],
      ),
      node(
        'vienna-wartime-homefront.return-or-absence',
        '门口的空位',
        '火车站传来复员和失踪名单的消息。家里把一只旧箱子从床底拖出来，里面是走时留下的工票、剃刀和一件没补完的衬衣。没有人知道该把它放回去还是继续等。',
        [subject(18, 60), partner(false), official()],
        [
          '去车站和办事处排队确认消息',
          '先替缺席的人保住工作，接受更长的班次',
          '把箱子收好，按失踪者的家属登记领取补助',
        ],
        [{ kind: 'pressure', key: 'war_supply_stress', min: 0.4 }],
      ),
    ],
  },
];
