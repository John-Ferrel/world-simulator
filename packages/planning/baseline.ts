import type { Organization, Person, Settlement, World } from '../contracts/index.js';
import type { AgendaDefinition } from './schema.js';
import { isDetained } from '../coercion/index.js';

type IdentityAxes = {
  solidarity?: number;
  autonomy?: number;
  pluralism?: number;
  institutionalTrust?: number;
};
type IdentityAffiliation = { id: string; confidence: number };
type BaselineWorld = World & {
  identity?: {
    profiles: Record<
      string,
      { axes?: IdentityAxes; religion?: IdentityAffiliation; political?: IdentityAffiliation }
    >;
  };
};
type Step = AgendaDefinition['steps'][number];
export type BaselineContext = {
  peopleByLocation: Map<string, Person[]>;
  peopleById: Map<string, Person>;
  personIdsByLocation: Map<string, Set<string>>;
  places: Map<string, Settlement>;
  organizationKindsByLocation: Set<string>;
  activeProjectDomains: Set<string>;
  riskyLocations: Set<string>;
  restrictedRoutes: Set<string>;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const goalOf = (p: Person) => p.goals.find((goal) => goal.status === 'active')?.kind;
const placeKindKey = (locationId: string, kind: string) => `${locationId}\u0000${kind}`;
const routeKey = (a: string, b: string) => [a, b].sort().join('\u0000');

/** Build once per agency pass and share across actors; existing location maps can be reused. */
export function buildBaselineContext(
  w: World,
  peopleByLocation?: Map<string, Person[]>,
  places?: Map<string, Settlement>,
): BaselineContext {
  const peopleById = new Map(w.persons.map((person) => [person.id, person]));
  const present =
    (peopleByLocation
      ? new Map(
          [...peopleByLocation].map(([id, people]) => [
            id,
            people.filter((p) => p.death === undefined && !p.journey && !isDetained(w, p)),
          ]),
        )
      : undefined) ??
    (() => {
      const byLocation = new Map<string, Person[]>();
      for (const person of w.persons) {
        if (person.death !== undefined || person.journey || isDetained(w, person)) continue;
        const list = byLocation.get(person.locationId) ?? [];
        list.push(person);
        byLocation.set(person.locationId, list);
      }
      return byLocation;
    })();
  const idsByLocation = new Map(
    [...present].map(([locationId, people]) => [locationId, new Set(people.map((p) => p.id))]),
  );
  const organizationKindsByLocation = new Set<string>();
  for (const organization of w.organizations as Organization[])
    if (organization.status === 'active')
      organizationKindsByLocation.add(placeKindKey(organization.locationId, organization.kind));
  for (const institution of Object.values(w.society?.institutions ?? {})) {
    if (institution.status !== 'active') continue;
    const kind =
      institution.kind === 'union'
        ? 'guild'
        : institution.kind === 'mutual_aid'
          ? 'council'
          : institution.kind;
    organizationKindsByLocation.add(placeKindKey(institution.locationId, kind));
  }
  const riskyLocations = new Set<string>();
  for (const conflict of w.conflicts)
    if (conflict.status === 'active') riskyLocations.add(conflict.locationId);
  for (const shock of w.shocks ?? [])
    if (!shock.resolved && shock.kind === 'war')
      for (const locationId of shock.locationIds) riskyLocations.add(locationId);
  return {
    peopleByLocation: present,
    peopleById,
    personIdsByLocation: idsByLocation,
    places: places ?? new Map(w.settlements.map((place) => [place.id, place])),
    organizationKindsByLocation,
    activeProjectDomains: new Set(
      Object.values(w.agency?.projects ?? {})
        .filter((project) => project.status === 'active')
        .map((project) => project.domain),
    ),
    riskyLocations,
    restrictedRoutes: new Set(
      (w.routes ?? [])
        .filter((route) => route.status !== 'open')
        .map((route) => routeKey(route.from, route.to)),
    ),
  };
}

const activeOrg = (context: BaselineContext, locationId: string, kind: string) =>
  context.organizationKindsByLocation.has(placeKindKey(locationId, kind));

/** Deterministic, bounded fallback intentions based only on current world state. */
export function selectBaselineAgenda(
  w: World,
  p: Person,
  context = buildBaselineContext(w),
): AgendaDefinition {
  const world = w as BaselineWorld;
  const place = context.places.get(p.locationId);
  const profile = world.identity?.profiles[p.id];
  const axes: Required<IdentityAxes> = {
    solidarity: clamp01(profile?.axes?.solidarity ?? p.values.care),
    autonomy: clamp01(profile?.axes?.autonomy ?? p.life?.needs.autonomy ?? 0.5),
    pluralism: clamp01(
      profile?.axes?.pluralism ?? p.life?.personality.openness ?? p.skills.learning,
    ),
    institutionalTrust: clamp01(profile?.axes?.institutionalTrust ?? 0.5),
  };
  const activeGoal = goalOf(p);
  const projectAvailable = (domain: string) => !context.activeProjectDomains.has(domain);
  const lastAgenda = w.agency?.agendas[p.id];
  const lastStep = lastAgenda?.steps[Math.max(0, lastAgenda.cursor - 1)];
  const coolingDown = (action: Step['action'], months = 8) =>
    lastAgenda?.status === 'complete' &&
    lastStep?.action === action &&
    w.month - lastAgenda.adopted < months;
  const one = (intention: string, rationale: string, step: Step): AgendaDefinition => ({
    intention,
    rationale,
    steps: [step],
  });

  if (p.journey)
    return one('在旅途中维持谋生与学习准备', '旅途尚未结束，当前没有可实际接触的当地对象。', {
      action: 'practice',
      label: '整理并练习已有技能',
      months: 2,
    });

  if (w.month - p.birth < 18 * 12)
    return one('继续适龄学习与成长', '年龄与当前生活阶段适合积累基础技能。', {
      action: 'practice',
      label: '练习当前可用技能',
      months: 4,
    });

  if (!place)
    return one('稳住当前生活安排', '当前地点资料不足，选择不依赖地点目标的日常行动。', {
      action: 'practice',
      label: '练习已有谋生技能',
      months: 3,
    });

  const safeNeighbor = bestNeighbor(context, place);
  const localWar = context.riskyLocations.has(place.id);
  const unsafe = localWar || place.scarcity > 0.82 || (p.life?.needs.safety ?? 0) > 0.76;
  if (unsafe && p.coin >= 3 && safeNeighbor && !coolingDown('relocate', 18))
    return one(
      '寻找更安全且可维持生活的邻近地点',
      '当前地点有显著安全或供给压力，邻近地点条件较稳且迁移路线可行。',
      {
        action: 'relocate',
        targetId: safeNeighbor.id,
        label: `迁往${safeNeighbor.name}，寻找安全与谋生机会`,
        months: 1,
      },
    );

  const localPeople = context.peopleByLocation.get(place.id) ?? [];
  const localIds = context.personIdsByLocation.get(place.id) ?? new Set<string>();
  const vulnerableTie = p.relationships
    .filter((relation) => relation.attachment >= 0.35)
    .map((relation) => ({ relation, person: context.peopleById.get(relation.personId) }))
    .filter((entry): entry is { relation: (typeof p.relationships)[number]; person: Person } =>
      Boolean(entry.person && localIds.has(entry.person.id) && entry.person.id !== p.id),
    )
    .sort(
      (a, b) =>
        a.person.health -
          (a.person.life?.needs.food ?? 0) -
          (b.person.health - (b.person.life?.needs.food ?? 0)) ||
        a.person.id.localeCompare(b.person.id),
    )[0];
  if (
    vulnerableTie &&
    (vulnerableTie.person.health < 0.65 || (vulnerableTie.person.life?.needs.food ?? 0) > 0.7) &&
    p.coin >= 1 &&
    !coolingDown('care')
  )
    return one('照料身边陷入困境的亲友', '在场的亲近者健康或基本需要较差，照料能直接改善其处境。', {
      action: 'care',
      targetId: vulnerableTie.person.id,
      label: `照料${vulnerableTie.person.name}的健康与希望`,
      months: 1,
    });

  const unemployed = p.life ? !p.life.career.employed : p.occupation === '失业' || p.coin < 4;
  if (unemployed) {
    const steps: Step[] = [{ action: 'seek_work', label: '寻找能够维持生活的工作', months: 1 }];
    if (p.coin >= 2 && p.skills.craft < 0.65)
      steps.push({ action: 'practice', label: '练习当前职业所需技能', months: 3 });
    return {
      intention: '取得稳定收入并改善谋生能力',
      rationale: unemployed
        ? '当前没有工作收入，需要先尝试进入当地劳动市场。'
        : '可用钱币或当地供给偏紧，先优先寻找收入来源。',
      steps,
    };
  }

  const aidTarget = localPeople
    .filter((q) => q.id !== p.id)
    .sort((a, b) => a.coin - b.coin || a.id.localeCompare(b.id))[0];
  const canAid =
    p.coin >= 2 &&
    aidTarget &&
    (aidTarget.coin < p.coin - 2 || (aidTarget.life?.needs.food ?? 0) > 0.7) &&
    axes.solidarity >= 0.68;
  if (canAid && !coolingDown('aid', 12))
    return one(
      '用有限资源帮助身边更困难的人',
      '较强的互助取向与可支配钱币支持一次有实际转移的救助。',
      {
        action: 'aid',
        label: '向当地最缺少钱币的人提供生活救助',
        months: 1,
      },
    );

  if (
    p.health >= 0.25 &&
    (p.life?.illness?.severity ?? 0) >= 0.5 &&
    (place.economy?.healthcare ?? 0.5) < 0.5 &&
    p.coin >= 4 &&
    projectAvailable('medicine') &&
    !coolingDown('project', 12)
  )
    return one('改善当地可获得的医疗知识', '持续疾病与医疗供给不足构成了明确的公共健康需要。', {
      action: 'project',
      domain: 'medicine',
      label: `改善${place.name}的医疗知识与照护条件`,
      months: 2,
    });

  const socialTie = p.relationships
    .filter((relation) => relation.trust < 0.65 || relation.attachment < 0.5)
    .map((relation) => context.peopleById.get(relation.personId))
    .filter((q): q is Person => Boolean(q && q.id !== p.id && localIds.has(q.id)))
    .sort((a, b) => a.id.localeCompare(b.id))[0];
  const localTrustedSupport = p.relationships.filter(
    (relation) => relation.trust > 0.6 && localIds.has(relation.personId),
  ).length;
  if (
    socialTie &&
    ((p.life?.needs.belonging ?? 0) > 0.58 || activeGoal === 'belong') &&
    !coolingDown('socialize', 6)
  )
    return one(
      '经营一段真实的本地关系',
      '当前目标或归属需要强调关系，而目标人物在场且已经可识别。',
      {
        action: 'socialize',
        targetId: socialTie.id,
        label: `与${socialTie.name}保持联系并增进信任`,
        months: 1,
      },
    );

  const beliefPolitical = p.beliefs
    .filter(
      (belief) =>
        belief.confidence >= 0.65 &&
        /^(?:political:|ideology:)(?:liberal|conservative|socialist|nationalist|religious|labor|civic)$/.test(
          belief.claimId,
        ) &&
        belief.sourceIds.some((id) => p.memories.some((memory) => memory.eventId === id)),
    )
    .sort((a, b) => b.confidence - a.confidence)[0];
  const identityPolitical = profile?.political;
  const explicitPoliticalId =
    identityPolitical && identityPolitical.confidence >= 0.65
      ? identityPolitical.id
      : beliefPolitical?.claimId;
  const ideology = politicalIdeology(explicitPoliticalId);
  const government = w.geopolitics?.governments[place.polityId];
  const party =
    ideology && government?.parties.find((candidate) => candidate.ideology === ideology);
  if (
    party &&
    p.coin >= 1 &&
    (activeGoal === 'reform' || axes.autonomy > 0.72 || axes.institutionalTrust < 0.28) &&
    !coolingDown('campaign', 12)
  )
    return one(
      '通过现有政治组织表达诉求',
      '政治立场有信念或经历来源，且当地政府存在相应政治组织。',
      {
        action: 'campaign',
        ideology,
        label: `支持${ideology}取向的公共议题`,
        months: 2,
      },
    );

  const diplomacyTarget = w.polities
    .filter((polity) => {
      const key = [place.polityId, polity.id].sort().join('~');
      const relation = w.geopolitics?.relations?.[key];
      return (
        polity.id !== place.polityId &&
        w.geopolitics?.governments[place.polityId]?.polityId === place.polityId &&
        polity.leaderId === p.id &&
        (relation?.status === 'war' || relation?.status === 'sanctions')
      );
    })
    .sort((a, b) => a.id.localeCompare(b.id))[0];
  if (diplomacyTarget && p.coin >= 1 && !coolingDown('negotiate', 8))
    return one(
      '尝试降低与邻近政权的冲突',
      '人物拥有本政权领导权限，且两方存在可识别的战争或制裁关系。',
      {
        action: 'negotiate',
        targetId: diplomacyTarget.id,
        label: `与${diplomacyTarget.name}接触并降低争端`,
        months: 1,
      },
    );

  const faithId = profile?.religion?.id;
  if (
    faithId &&
    p.coin >= 1 &&
    /^faith:[a-z0-9][a-z0-9_-]{0,47}$/.test(faithId) &&
    profile!.religion!.confidence >= 0.65 &&
    (activeGoal === 'belong' || p.values.tradition >= 0.72) &&
    !coolingDown('faith', 12)
  )
    return one('依照自己已有证据的信仰实践', '信仰归属已有明确依据，且生活目标重视归属或传统。', {
      action: 'faith',
      traditionId: faithId,
      label: `依照${faithId.slice(6)}传统实践并互相支持`,
      months: 1,
    });

  const socialClass = w.society?.profiles[p.id]?.socialClass;
  const laborLinked =
    ['destitute', 'working'].includes(socialClass ?? '') ||
    /农|织|学徒|工|矿|仆|佣/.test(p.occupation);
  const institution = laborLinked ? 'guild' : p.skills.learning >= 0.65 ? 'academy' : 'council';
  const organizationMotive =
    (axes.solidarity >= 0.74 && (activeGoal === 'belong' || activeGoal === 'reform')) ||
    (institution === 'academy' && activeGoal === 'learn' && axes.pluralism >= 0.65);
  if (
    organizationMotive &&
    p.coin >= 12 &&
    !activeOrg(context, place.id, institution) &&
    !coolingDown('organize', 18)
  )
    return one(
      '组织本地互助与劳动协作',
      '互助取向、可用资金和组织空缺同时支持建立一个可运行的团体。',
      {
        action: 'organize',
        institution,
        label:
          institution === 'guild'
            ? '本地互助与技能协作会'
            : institution === 'academy'
              ? '本地学习与研究小组'
              : '本地公共互助议事会',
        months: 1,
      },
    );

  if (activeGoal === 'learn' && p.coin >= 1 && !coolingDown('research', 8))
    return one('围绕已有技能进行学习', '当前目标重视学习，研究会留下可验证的技能与知识成果。', {
      action: 'research',
      domain: p.skills.learning >= 0.55 ? 'science' : 'craft',
      label: `${p.occupation}相关的实际改进`,
      months: 3,
    });

  if (
    (place.unrest > 0.55 || axes.institutionalTrust < 0.25) &&
    p.coin >= 1 &&
    localTrustedSupport >= 3 &&
    !coolingDown('petition', 12)
  )
    return one('联合可信关系提出公共诉求', '地方压力明显且已有足够互信网络支持一次请愿。', {
      action: 'petition',
      label: '改善劳动与公共服务规则',
      months: 1,
    });

  if (
    activeGoal === 'learn' &&
    p.coin >= 4 &&
    projectAvailable(projectDomain(place)) &&
    !coolingDown('project', 12)
  )
    return one('开展一项短期公共改善项目', '有可承担的启动资金，项目领域按当地短板选择。', {
      action: 'project',
      domain: projectDomain(place),
      label: projectLabel(place),
      months: 2,
    });

  if (
    axes.pluralism >= 0.74 &&
    p.coin >= 1 &&
    activeGoal !== 'survive' &&
    !coolingDown('research', 6)
  )
    return one('比较不同方法后继续学习', '开放性取向较高，当前当地知识条件允许尝试多种解释。', {
      action: 'research',
      domain: 'culture',
      label: '比较不同地方的生产与生活方法',
      months: 3,
    });

  return one(
    '改善谋生技能并照料日常生活',
    '当前没有更紧迫且已具备条件的机会，继续积累可迁移技能。',
    {
      action: 'practice',
      label: `练习${p.occupation}相关技能`,
      months: 4,
    },
  );
}

function bestNeighbor(context: BaselineContext, place: Settlement): Settlement | undefined {
  return place.neighbors
    .map((id) => context.places.get(id))
    .filter((candidate): candidate is Settlement => Boolean(candidate))
    .filter((candidate) => {
      return (
        !context.restrictedRoutes.has(routeKey(place.id, candidate.id)) &&
        !context.riskyLocations.has(candidate.id)
      );
    })
    .sort((a, b) => neighborScore(b) - neighborScore(a) || a.id.localeCompare(b.id))[0];
}
function neighborScore(place: Settlement) {
  return (
    (place.economy?.unemployment ?? 0.1) * -0.2 +
    (place.economy?.healthcare ?? 0.5) * 0.15 +
    (place.prosperity ?? 0.5) * 0.25 -
    place.scarcity * 0.3 -
    place.unrest * 0.1
  );
}
function projectDomain(place: Settlement): NonNullable<Step['domain']> {
  if ((place.economy?.healthcare ?? 0.5) < 0.35) return 'medicine';
  if (place.unrest > 0.5) return 'civic';
  if (place.knowledge < 0.3) return 'science';
  return 'commerce';
}
function projectLabel(place: Settlement) {
  if ((place.economy?.healthcare ?? 0.5) < 0.35) return `改善${place.name}的医疗知识`;
  if (place.unrest > 0.5) return `改善${place.name}的公共协作`;
  if (place.knowledge < 0.3) return `改善${place.name}的生产知识`;
  return `改善${place.name}的本地贸易`;
}
function politicalIdeology(id: string | undefined) {
  const value = id?.replace(/^(political:|ideology:)/, '');
  if (value === 'labor') return 'socialist';
  if (value === 'civic') return 'liberal';
  return ['liberal', 'conservative', 'socialist', 'nationalist', 'religious'].includes(value ?? '')
    ? (value as 'liberal' | 'conservative' | 'socialist' | 'nationalist' | 'religious')
    : undefined;
}
