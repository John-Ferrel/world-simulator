import { z } from 'zod';
import { safeText, type BirthRequest, type Person, type World } from '../contracts/index.js';
import { initializeInfantLife } from '../cognition/life.js';
import { random } from '../simulation-core/random.js';
import { newPerson } from '../world-packs/index.js';
import { isDetained } from '../coercion/index.js';
import {
  AbilityDefinitionSchema,
  MAX_BIRTHS,
  MAX_LIFE_PROGRAMS,
  type AbilityDefinition,
  type HiddenFuture,
  type HiddenFutures,
  type LifeGoalCandidate,
  type LifeInterpretation,
  type LifeProgram,
  type PendingBirth,
} from './schema.js';
import { compileRule } from './compiler.js';
import { advanceLifeTrajectory, createLifeTrajectoryRuntime } from '../life-trajectory/apply.js';
import { definitionKey } from './compiler.js';
import { ensureRuntime, grantAbility, installDefinition, type RuleEmit } from './runtime.js';

export const MAX_ACTIVE_ABILITIES = 3;
export const BIRTH_COMPILE_MONTHS = 2;

const shortText = z.string().min(1).max(240);
const shortList = z.array(shortText).max(8);

export const BirthProposalSchema = z
  .object({
    version: z.literal(1),
    birthId: z.string().min(1).max(160),
    jobId: z.string().min(1).max(160),
    interpretation: z
      .object({
        hopes: shortList.default([]),
        conditions: shortList.default([]),
        costs: shortList.default([]),
        translations: shortList.default([]),
      })
      .strict(),
    traits: z
      .object({
        health: z.number().min(0.2).max(1),
        temperament: z
          .object({
            care: z.number().min(0.2).max(0.8),
            ambition: z.number().min(0.2).max(0.8),
            tradition: z.number().min(0.2).max(0.8),
          })
          .strict(),
        personality: z
          .object({
            openness: z.number().min(0.2).max(0.8),
            conscientiousness: z.number().min(0.2).max(0.8),
            extraversion: z.number().min(0.2).max(0.8),
            agreeableness: z.number().min(0.2).max(0.8),
            neuroticism: z.number().min(0.2).max(0.8),
          })
          .strict(),
      })
      .strict(),
    goals: z
      .array(
        z
          .object({
            kind: z.enum(['survive', 'belong', 'learn', 'reform', 'prosper']),
            weight: z.number().min(0).max(1),
            reason: z.string().min(1).max(240),
          })
          .strict(),
      )
      .min(1)
      .max(4),
    opportunities: z.array(z.string().min(1).max(80)).max(8).default([]),
    replanTriggers: z.array(z.string().min(1).max(80)).max(8).default([]),
    hiddenFutures: z
      .array(
        z
          .object({
            title: z.string().min(1).max(120),
            probability: z.number().min(0).max(1),
            conditions: z.array(z.string().min(1).max(200)).max(6).default([]),
            outcome: z.string().min(1).max(400),
          })
          .strict(),
      )
      .min(1)
      .max(6),
    ability: AbilityDefinitionSchema.optional(),
  })
  .strict();
export type BirthProposal = z.infer<typeof BirthProposalSchema>;

export type BirthFamily = { siteId: string; parentIds: string[] };

function ownedLiving(w: World, userId: string) {
  return w.persons.some((p) => p.ownerId === userId && p.death === undefined);
}

function activeAbilityCount(w: World) {
  return Object.keys(w.runtime?.abilities ?? {}).length;
}

export function anomalyBudget(w: World) {
  const named = w.persons.filter((p) => p.death === undefined).length;
  return Math.max(1, Math.min(MAX_ACTIVE_ABILITIES, Math.floor(named / 5000) + 1));
}

export function chooseBirthSite(w: World, request: BirthRequest): string | undefined {
  const caregivers = new Map<string, number>();
  for (const person of w.persons) {
    if (person.death !== undefined || person.journey || isDetained(w, person)) continue;
    const age = (w.month - person.birth) / 12;
    if (age < 18 || age > 45) continue;
    caregivers.set(person.locationId, (caregivers.get(person.locationId) ?? 0) + 1);
  }
  const viable = (siteId: string) => {
    const site = w.settlements.find((s) => s.id === siteId);
    return !!site && site.cohort.children >= 1 && (caregivers.get(siteId) ?? 0) > 0;
  };
  if (request.preferredLocationId && viable(request.preferredLocationId))
    return request.preferredLocationId;
  const candidates = w.settlements
    .filter((s) => s.cohort.children >= 1 && (caregivers.get(s.id) ?? 0) > 0)
    .sort(
      (a, b) =>
        (caregivers.get(b.id) ?? 0) +
          b.cohort.children +
          b.cohort.adults -
          ((caregivers.get(a.id) ?? 0) + a.cohort.children + a.cohort.adults) ||
        a.id.localeCompare(b.id),
    )
    .slice(0, 64);
  if (!candidates.length) return undefined;
  const pick = Math.floor(random(w.seed, w.month, request.name, 'birth-site') * candidates.length);
  return candidates[Math.min(candidates.length - 1, pick)].id;
}

export function selectBirthFamily(w: World, siteId: string): string[] {
  const site = w.settlements.find((s) => s.id === siteId);
  if (!site) return [];
  const adults = w.persons
    .filter(
      (p) =>
        p.death === undefined &&
        p.locationId === siteId &&
        !p.journey &&
        !isDetained(w, p) &&
        (w.month - p.birth) / 12 >= 18 &&
        (w.month - p.birth) / 12 <= 45,
    )
    .sort((a, b) => a.id.localeCompare(b.id));
  if (!adults.length) return [];
  const couples: [Person, Person][] = [];
  for (const p of adults) {
    const partner = p.relationships.find(
      (r) =>
        r.kind === 'partner' && adults.some((q) => q.id === r.personId && q.locationId === siteId),
    );
    if (partner && p.id < partner.personId)
      couples.push([p, adults.find((q) => q.id === partner.personId)!]);
  }
  const chosen =
    couples.length > 0
      ? couples[
          Math.floor(random(w.seed, w.month, siteId, 'birth-family') * couples.length) %
            couples.length
        ]
      : [adults[Math.floor(random(w.seed, w.month, siteId, 'birth-guardian') * adults.length)]];
  return chosen.map((p) => p.id);
}

export function createPendingBirth(
  w: World,
  userId: string,
  request: BirthRequest,
  causeId: string,
  emit: RuleEmit,
): PendingBirth {
  const r = ensureRuntime(w);
  if (Object.keys(r.births).length >= MAX_BIRTHS)
    throw new Error('当前世界的出生记录已达到安全上限');
  if (ownedLiving(w, userId)) throw new Error('每个账户只能有一位在世人物');
  if (
    Object.values(r.births).some((birth) => birth.userId === userId && birth.status === 'compiling')
  )
    throw new Error('这个账户已有一个正在编译的出生请求');
  const siteId = chooseBirthSite(w, request);
  if (!siteId) throw new Error('当前世界没有可承载新生儿的真实家庭');
  const parentIds = selectBirthFamily(w, siteId);
  if (!parentIds.length) throw new Error('出生地没有符合真实家庭条件的照护者');
  const id = `birth-${causeId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(-80)}`;
  if (r.births[id]) return r.births[id];
  const birth: PendingBirth = {
    id,
    userId,
    siteId,
    parentIds,
    createdMonth: w.month,
    deadline: w.month + BIRTH_COMPILE_MONTHS,
    jobId: `birth-${w.id}-${id}`,
    status: 'compiling',
    request: {
      name: safeText(request.name),
      sex: request.sex,
      health: request.health,
      body: request.body ? safeText(request.body) : undefined,
      appearance: {
        skin: request.appearance.skin,
        hair: request.appearance.hair,
        clothes: request.appearance.clothes,
        doll: request.appearance.doll,
      },
      wish: safeText(request.wish),
      preferredLocationId: request.preferredLocationId,
      lifeMode: request.lifeMode ?? 'ordinary',
      creationHints: request.creationHints
        ? {
            familyBackground: request.creationHints.familyBackground
              ? safeText(request.creationHints.familyBackground)
              : undefined,
            personalityTendency: request.creationHints.personalityTendency
              ? safeText(request.creationHints.personalityTendency)
              : undefined,
            secret: request.creationHints.secret
              ? safeText(request.creationHints.secret)
              : undefined,
            destinyHook: request.creationHints.destinyHook
              ? safeText(request.creationHints.destinyHook)
              : undefined,
            omen: request.creationHints.omen ? safeText(request.creationHints.omen) : undefined,
            tags: request.creationHints.tags?.slice(0, 12),
          }
        : undefined,
    },
  };
  r.births[id] = birth;
  const parents = parentIds
    .map((pid) => w.persons.find((p) => p.id === pid)?.name)
    .filter((name): name is string => !!name);
  const registration = emit(
    'birth_registration',
    parentIds,
    siteId,
    `${birth.request.name}的出生登记已进入${w.settlements.find((s) => s.id === siteId)?.name ?? '当地'}；家庭与人生编译正在世界内完成。`,
    {
      birthId: id,
      childName: birth.request.name,
      parentIds,
      parentNames: parents,
      status: 'compiling',
      classification: 'birth-intake',
    },
    [causeId],
    0.6,
  );
  birth.registrationEventId = registration.id;
  return birth;
}

function wishSignals(wish: string) {
  const text = wish.toLowerCase();
  return {
    happiness: /幸福|快乐|平安|安稳|happ|joy|content/.test(text),
    empathy: /情绪|感受|心情|共情|读懂|听见他人|empath|emotion|feel/.test(text),
    healing: /治愈|医疗|医术|救人|heal|medicine|cure/.test(text),
    knowledge: /知识|智慧|求知|看见真相|真相|learn|wisdom|know/.test(text),
    influence: /说服|影响|魅力|领导|persuad|influence|charm|lead/.test(text),
    movement: /瞬移|飞行|自由移动|远行|teleport|fly|movement/.test(text),
    production: /丰收|富足|生产|财富|prosper|harvest|wealth/.test(text),
    communication: /传话|心灵沟通|千里传音|通信|telepath|communicat/.test(text),
    domination: /全球统治|国王|皇帝|首富|无敌|不死|god|king|emperor|immortal|rule the world/.test(
      text,
    ),
    harm: /杀死|死亡|让.*死|kill|death to/.test(text),
  };
}

function chooseAbility(w: World, wish: string): AbilityDefinition | undefined {
  if (activeAbilityCount(w) >= anomalyBudget(w)) return undefined;
  const s = wishSignals(wish);
  const base = {
    potency: 0.18,
    rangeKm: 0,
    cost: 1,
    healthCost: 0.01,
    cooldown: 3,
    maxUses: 12,
    exposureRisk: 0.18,
    countermeasures: ['现场见证', '隔离与观察', '组织调查'],
  };
  if (s.empathy)
    return { ...base, mode: 'sense', potency: 0.25, cost: 0, cooldown: 2, exposureRisk: 0.12 };
  if (s.healing)
    return { ...base, mode: 'healing', potency: 0.2, cost: 2, healthCost: 0.02, cooldown: 4 };
  if (s.knowledge)
    return { ...base, mode: 'knowledge', potency: 0.2, cost: 1, cooldown: 6, exposureRisk: 0.1 };
  if (s.influence)
    return { ...base, mode: 'influence', potency: 0.15, cost: 1, cooldown: 6, exposureRisk: 0.25 };
  if (s.movement)
    return { ...base, mode: 'movement', potency: 0.2, cost: 3, healthCost: 0.03, cooldown: 8 };
  if (s.production)
    return { ...base, mode: 'production', potency: 0.15, cost: 2, cooldown: 6, exposureRisk: 0.2 };
  if (s.communication)
    return {
      ...base,
      mode: 'communication',
      potency: 0.2,
      cost: 1,
      cooldown: 4,
      exposureRisk: 0.15,
    };
  return undefined;
}

function familyConditions(w: World, birth: PendingBirth) {
  const site = w.settlements.find((s) => s.id === birth.siteId);
  const parents = birth.parentIds
    .map((id) => w.persons.find((p) => p.id === id))
    .filter((p): p is Person => !!p);
  const conditions: string[] = [];
  if (site) {
    conditions.push(
      `${site.name}的粮食余量${site.scarcity > 0.2 ? '紧张' : '尚可'}，当地动荡${site.unrest > 0.3 ? '明显' : '有限'}。`,
    );
    if (site.disease) conditions.push(`当地正有疾病流行，婴儿健康会受到影响。`);
    if (w.conflicts.some((c) => c.status === 'active' && c.locationId === site.id))
      conditions.push('出生地处于实际冲突影响范围。');
  }
  for (const parent of parents)
    conditions.push(
      `${parent.name}是${parent.occupation}，家庭能提供的起点受实际收入与照料时间限制。`,
    );
  return conditions;
}

function wishAllowsAbility(wish: string, mode: AbilityDefinition['mode']) {
  const s = wishSignals(wish);
  if (mode === 'sense') return s.empathy;
  if (mode === 'healing') return s.healing;
  if (mode === 'knowledge') return s.knowledge;
  if (mode === 'influence') return s.influence;
  if (mode === 'movement') return s.movement;
  if (mode === 'production') return s.production;
  return s.communication;
}

export function fallbackLifeProgram(
  w: World,
  birth: PendingBirth,
): { program: LifeProgram; hidden: HiddenFutures; ability?: AbilityDefinition } {
  const s = wishSignals(birth.request.wish);
  const site = w.settlements.find((x) => x.id === birth.siteId);
  const conditions = familyConditions(w, birth);
  const ability = chooseAbility(w, birth.request.wish);
  const translations: string[] = [];
  if (s.domination)
    translations.push(
      '“全球统治/首富/不死”等超预算愿望不直接改写世界；保留为长期志向、误解与未来条件性追求。',
    );
  if (s.harm)
    translations.push('要求他人死亡或受伤的愿望不会被直接执行；保留为愿望语义与关系风险。');
  if (ability) translations.push('异常愿望被编译为有范围、消耗、冷却、暴露和反制路径的受限能力。');
  else if (s.empathy || s.healing || s.movement)
    translations.push(
      '异常语义被保留，但当前世界异常配额或条件不允许直接赋能力；只影响倾向与机会。',
    );
  const temperament = {
    care: 0.5 + (s.happiness || s.healing || s.empathy ? 0.18 : 0) + (s.harm ? -0.2 : 0),
    ambition: 0.5 + (s.domination || s.production ? 0.18 : 0) + (s.knowledge ? 0.08 : 0),
    tradition: 0.5 + (s.domination ? 0.05 : 0),
  };
  const goals: LifeGoalCandidate[] = [];
  if (s.happiness || s.healing)
    goals.push({ kind: 'belong', weight: 0.7, reason: '愿望强调平安与关系' });
  if (s.knowledge) goals.push({ kind: 'learn', weight: 0.75, reason: '愿望强调求知与真相' });
  if (s.domination || s.production)
    goals.push({ kind: 'prosper', weight: 0.7, reason: '愿望强调财富/地位，但降级为可失败志向' });
  if (s.empathy || s.harm)
    goals.push({ kind: 'reform', weight: 0.55, reason: '愿望涉及改变他人处境' });
  if (!goals.length)
    goals.push({ kind: 'belong', weight: 0.6, reason: '没有明确指令时，成长以归属与安全为先' });
  const health = Math.max(0.2, Math.min(1, birth.request.health + (site?.scarcity ?? 0) * -0.1));
  const program: LifeProgram = {
    version: 1,
    id: `life-${birth.id}`,
    personId: birth.id,
    source: 'fallback',
    createdMonth: w.month,
    wish: birth.request.wish,
    interpretation: {
      hopes: s.happiness
        ? ['希望拥有安稳、被爱的生活']
        : s.knowledge
          ? ['希望理解世界并获得知识']
          : ['希望在世界中形成自己的位置'],
      conditions,
      costs: ability
        ? [
            `能力消耗${ability.cost} coin、冷却${ability.cooldown}月、最多${ability.maxUses}次。`,
            `能力暴露风险约${Math.round(ability.exposureRisk * 100)}%，可能引来组织反应。`,
          ]
        : ['没有可执行异常能力；愿望只影响倾向与机会，不保证结果。'],
      translations,
    },
    traits: {
      health,
      temperament: {
        care: Math.max(0.2, Math.min(0.8, temperament.care)),
        ambition: Math.max(0.2, Math.min(0.8, temperament.ambition)),
        tradition: Math.max(0.2, Math.min(0.8, temperament.tradition)),
      },
      personality: {
        openness: s.knowledge ? 0.7 : 0.5,
        conscientiousness: s.production ? 0.65 : 0.5,
        extraversion: s.influence ? 0.65 : 0.5,
        agreeableness: s.happiness || s.healing ? 0.65 : 0.5,
        neuroticism: s.harm || s.domination ? 0.6 : 0.45,
      },
    },
    goals,
    opportunities: [
      site && site.knowledge > 0.2 ? 'education' : 'family-care',
      site && site.scarcity > 0.2 ? 'scarcity-relief' : 'local-apprenticeship',
      'relationship',
    ],
    replanTriggers: ['major-loss', 'ability-exposure', 'war', 'migration', 'rare-opportunity'],
    abilitySpec: ability,
    milestones: [],
    status: 'active',
    causeIds: [],
  };
  const hidden: HiddenFutures = {
    birthId: birth.id,
    inputHash: `fallback:${w.id}:${birth.id}:${birth.createdMonth}`,
    model: 'fallback',
    possibilities: [
      {
        title: '平凡成长',
        probability: 0.6,
        conditions: ['家庭与地区没有遭遇重大冲击'],
        outcome: '在家庭与邻里中长大，可能继承当地职业与关系。',
      },
      {
        title: '抓住教育或迁徙机会',
        probability: 0.28,
        conditions: ['当地知识资源或交通条件改善', '家庭愿意承担机会成本'],
        outcome: '离开出生地或进入新的学习/职业路径，关系网随之改变。',
      },
      {
        title: ability ? '异常能力暴露' : '时代冲击',
        probability: 0.12,
        conditions: ability
          ? ['能力在证人面前使用', '组织开始调查']
          : ['战争、疾病或政治动员抵达当地'],
        outcome: ability
          ? '能力被社会承认或压制，家庭与本人承担长期后果。'
          : '家庭被迫迁移或失去收入，人生目标重估。',
      },
    ],
  };
  return { program, hidden, ability };
}

function proposalToLifeProgram(
  w: World,
  birth: PendingBirth,
  proposal: BirthProposal,
): { program: LifeProgram; hidden: HiddenFutures; ability?: AbilityDefinition } {
  const ability = proposal.ability;
  if (ability && !wishAllowsAbility(birth.request.wish, ability.mode)) {
    const fallback = fallbackLifeProgram(w, birth);
    fallback.program.interpretation.translations.push(
      '模型提出的能力与原始祝愿语义不一致，已降级为愿望/机会，不赋予异常能力。',
    );
    return { ...fallback, ability: undefined };
  }
  if (ability && activeAbilityCount(w) >= anomalyBudget(w)) {
    // The model may propose an anomaly, but the world's rare quota is authoritative.
    const fallback = fallbackLifeProgram(w, birth);
    fallback.program.interpretation.translations.push(
      '模型提出了异常能力，但当前世界异常配额已满；编译降级为无条件能力。',
    );
    return { ...fallback, ability: undefined };
  }
  const program: LifeProgram = {
    version: 1,
    id: `life-${birth.id}`,
    personId: birth.id,
    source: 'model',
    createdMonth: w.month,
    wish: birth.request.wish,
    interpretation: proposal.interpretation,
    traits: proposal.traits,
    goals: proposal.goals,
    opportunities: proposal.opportunities,
    replanTriggers: proposal.replanTriggers,
    abilitySpec: ability,
    milestones: [],
    status: 'active',
    causeIds: [],
  };
  const hidden: HiddenFutures = {
    birthId: birth.id,
    inputHash: `model:${birth.jobId}:${proposal.jobId}`,
    model: 'model',
    possibilities: proposal.hiddenFutures,
  };
  return { program, hidden, ability };
}

export function parseBirthProposal(
  w: World,
  birth: PendingBirth,
  raw: unknown,
): { program: LifeProgram; hidden: HiddenFutures; ability?: AbilityDefinition } {
  const proposal = BirthProposalSchema.parse(raw);
  if (proposal.birthId !== birth.id || proposal.jobId !== birth.jobId)
    throw new Error('Birth proposal scope mismatch');
  return proposalToLifeProgram(w, birth, proposal);
}

function installBirthAbility(
  w: World,
  birth: PendingBirth,
  child: Person,
  ability: AbilityDefinition,
  causeId: string,
): string {
  const raw = {
    schemaVersion: 1 as const,
    id: `birth.ability.${child.id}`,
    version: 1,
    kind: 'ability' as const,
    title: `受限天赋：${ability.mode}`,
    scope: { kind: 'person' as const, ids: [child.id] },
    roles: [{ name: 'holder', personId: child.id, willingness: 1, sameSite: true }],
    trigger: { kind: 'periodic' as const, interval: 12 },
    conditions: { op: 'all' as const, args: [] },
    effects: [{ type: 'health' as const, role: 'holder', amount: 0.002 }],
    chance: 1,
    cooldown: ability.cooldown,
    maxOccurrences: 1,
    gas: 400,
    significance: 0.4,
    ability,
    provenance: {
      source: 'birth' as const,
      jobId: birth.jobId,
      model: 'birth/1',
      observedMonth: birth.createdMonth,
      compiler: 'rules/1' as const,
    },
  };
  const compiled = compileRule(raw, w, { source: 'birth', jobId: birth.jobId });
  installDefinition(w, compiled.definition, causeId);
  grantAbility(w, child.id, definitionKey(compiled.definition), causeId);
  return definitionKey(compiled.definition);
}

export function commitBirth(
  w: World,
  pending: PendingBirth,
  compiled: { program: LifeProgram; hidden: HiddenFutures; ability?: AbilityDefinition },
  causeId: string,
  emit: RuleEmit,
): Person {
  const r = ensureRuntime(w);
  if (Object.keys(r.lifePrograms).length >= MAX_LIFE_PROGRAMS)
    throw new Error('当前世界的人生程序已达到安全上限');
  if (pending.status !== 'compiling') throw new Error('birth is not compiling');
  if (ownedLiving(w, pending.userId)) throw new Error('每个账户只能有一位在世人物');
  const site = w.settlements.find((s) => s.id === pending.siteId);
  if (!site || site.cohort.children < 1) throw new Error('出生地已无法承载这个新生儿');
  let parentIds = pending.parentIds.filter((id) => {
    const p = w.persons.find((q) => q.id === id);
    return !!p && p.death === undefined && p.locationId === site.id && !p.journey;
  });
  if (!parentIds.length) parentIds = selectBirthFamily(w, site.id);
  if (!parentIds.length) {
    pending.status = 'failed';
    pending.failure = 'no-family';
    throw new Error('真实家庭在编译期间消失，出生未能提交');
  }
  const child = newPerson(w, `person-${pending.id}`, site.id, w.persons.length, 0);
  child.name = pending.request.name;
  child.ownerId = pending.userId;
  child.parents = parentIds;
  child.householdId =
    w.persons.find((p) => p.id === parentIds[0])?.householdId ?? `household-${child.id}`;
  child.occupation = '孩童';
  child.coin = 0;
  child.health = Math.max(
    0.2,
    Math.min(1, (pending.request.health + compiled.program.traits.health) / 2),
  );
  child.sex = pending.request.sex;
  child.body = pending.request.body ? { condition: pending.request.body } : undefined;
  child.appearance = pending.request.appearance;
  child.birth = w.month;
  child.values = {
    care: compiled.program.traits.temperament.care,
    ambition: compiled.program.traits.temperament.ambition,
    tradition: compiled.program.traits.temperament.tradition,
  };
  child.life = initializeInfantLife(child, w);
  child.life.personality = { ...compiled.program.traits.personality };
  child.goals = compiled.program.goals.map((goal, index) => ({
    id: `goal-${child.id}-${index}`,
    kind: goal.kind,
    strength: goal.weight,
    progress: 0,
    status: 'active' as const,
    causeIds: [] as string[],
    reason: goal.reason,
  }));
  for (const parentId of parentIds) {
    const parent = w.persons.find((p) => p.id === parentId);
    if (!parent) continue;
    parent.relationships.push({
      personId: child.id,
      kind: 'kin',
      trust: 0.8,
      attachment: 0.9,
      since: w.month,
    });
    child.relationships.push({
      personId: parent.id,
      kind: 'kin',
      trust: 0.8,
      attachment: 0.9,
      since: w.month,
    });
  }
  w.persons.push(child);
  site.cohort.children--;
  const event = emit(
    'birth',
    [...parentIds, child.id],
    site.id,
    `${child.name}出生在${site.name}的真实家庭中；此后的人生由世界经历决定。`,
    {
      childId: child.id,
      birthId: pending.id,
      parentIds,
      lifeProgramId: compiled.program.id,
      source: compiled.program.source,
      classification: 'birth',
    },
    [causeId],
    0.95,
  );
  for (const goal of child.goals) goal.causeIds = [event.id];
  const program: LifeProgram = {
    ...compiled.program,
    personId: child.id,
    createdMonth: w.month,
    causeIds: [event.id],
  };
  if (compiled.ability) {
    const key = installBirthAbility(w, pending, child, compiled.ability, event.id);
    program.abilityDefinitionKey = key;
  }
  program.creationHints = pending.request.creationHints;
  program.lifeTrajectory = createLifeTrajectoryRuntime(
    w,
    child,
    pending.request.lifeMode ?? 'ordinary',
    pending.request.creationHints?.tags,
  );
  r.lifePrograms[child.id] = program;
  r.hiddenFutures[child.id] = {
    ...compiled.hidden,
    birthId: pending.id,
  };
  pending.status = 'born';
  pending.childId = child.id;
  return child;
}

export function fallbackBirthCompilation(w: World, pending: PendingBirth) {
  return fallbackLifeProgram(w, pending);
}

/**
 * Milestones turn the private LifeProgram into real goals and education state.
 * They are not a scripted future: each milestone emits an actual event and can
 * be interrupted by death, war, migration or scarcity.
 */
export function advanceLifePrograms(w: World, emit: RuleEmit): number {
  const r = ensureRuntime(w);
  let changed = 0;
  for (const [personId, program] of Object.entries(r.lifePrograms)) {
    if (program.status !== 'active') continue;
    const person = w.persons.find((p) => p.id === personId && p.death === undefined);
    if (!person) continue;
    changed += advanceLifeTrajectory(w, person, program, emit);
    program.milestones ??= [];
    const age = (w.month - person.birth) / 12;
    const addGoal = (
      kind: 'survive' | 'belong' | 'learn' | 'reform' | 'prosper',
      weight: number,
      reason: string,
      milestone: string,
    ) => {
      if (program.milestones!.includes(milestone)) return;
      program.milestones!.push(milestone);
      const alreadyActive = person.goals.some(
        (goal) => goal.status === 'active' && goal.kind === kind,
      );
      const event = emit(
        'life_program_milestone',
        [person.id],
        person.locationId,
        `${person.name}的人生条件进入「${milestone}」阶段；出生愿望开始通过实际经历影响选择。`,
        {
          lifeProgramId: program.id,
          milestone,
          goalKind: kind,
          goalAlreadyActive: alreadyActive,
          source: program.source,
          classification: 'life-program',
        },
        program.causeIds.slice(-4),
        0.5,
      );
      if (!alreadyActive) {
        person.goals.push({
          id: `goal-${person.id}-${milestone}`,
          kind,
          strength: weight,
          progress: 0,
          status: 'active',
          causeIds: [event.id],
          reason,
        });
        changed++;
      }
    };
    if (age >= 6 && age < 18) {
      addGoal('learn', 0.65, '进入适龄学习阶段', 'education-6');
      if (person.life) {
        person.life.education.level = Math.max(1, person.life.education.level);
        person.life.education.months = Math.max(
          person.life.education.months,
          Math.min(72, Math.floor((age - 6) * 12)),
        );
      }
    }
    if (age >= 12 && age < 18) {
      addGoal('prosper', 0.55, '开始接触实际谋生技能', 'apprenticeship-12');
      if (person.life) {
        person.life.education.level = Math.max(2, person.life.education.level);
        person.life.education.months = Math.max(person.life.education.months, 72);
      }
    }
    if (age >= 18) {
      const top = [...program.goals].sort((a, b) => b.weight - a.weight)[0];
      addGoal(
        top?.kind ?? 'belong',
        top?.weight ?? 0.5,
        top?.reason ?? '成年后形成独立目标',
        'adult-18',
      );
      if (person.occupation === '孩童') person.occupation = '学徒';
      if (person.life) {
        person.life.education.level = Math.max(
          program.opportunities.includes('education') ? 3 : 2,
          person.life.education.level,
        );
        person.life.education.months = Math.max(person.life.education.months, 144);
      }
    }
  }
  return changed;
}

/**
 * The shared clock never waits for a model. A pending birth that misses its
 * compile deadline is committed with an honest deterministic fallback.
 */
export function expirePendingBirths(w: World, emit: RuleEmit): number {
  const r = ensureRuntime(w);
  let committed = 0;
  for (const pending of Object.values(r.births)) {
    if (pending.status !== 'compiling' || w.month <= pending.deadline) continue;
    try {
      const fallback = fallbackLifeProgram(w, pending);
      fallback.program.interpretation.translations.push(
        '出生编译超过期限，世界使用确定性后备；原始祝愿仍保留，但不声称完成深度预演。',
      );
      commitBirth(w, pending, fallback, pending.registrationEventId ?? pending.id, emit);
      committed++;
    } catch (error) {
      pending.status = 'failed';
      pending.failure = (error as Error).message.slice(0, 240);
      emit(
        'birth_failed',
        [],
        pending.siteId,
        `${pending.request.name}的出生未能提交；家庭或人口条件已改变。`,
        {
          birthId: pending.id,
          reason: pending.failure,
          classification: 'birth-failure',
        },
        pending.registrationEventId ? [pending.registrationEventId] : [],
        0.7,
      );
    }
  }
  return committed;
}

export function birthJobPayload(w: World, pending: PendingBirth) {
  const site = w.settlements.find((s) => s.id === pending.siteId);
  const parents = pending.parentIds
    .map((id) => w.persons.find((p) => p.id === id))
    .filter((p): p is Person => !!p);
  const localOrgs = w.organizations
    .filter((o) => o.status === 'active' && o.locationId === pending.siteId)
    .slice(0, 8)
    .map((o) => ({ id: o.id, name: o.name, kind: o.kind, members: o.memberIds.length }));
  return {
    birthId: pending.id,
    jobId: pending.jobId,
    request: pending.request,
    world: {
      id: w.id,
      month: w.month,
      year: w.calendar
        ? w.calendar.startYear + Math.floor(w.month / 12)
        : Math.floor(w.month / 12) + 1,
      site: site
        ? {
            id: site.id,
            name: site.name,
            scarcity: site.scarcity,
            unrest: site.unrest,
            knowledge: site.knowledge,
            disease: site.disease?.prevalence ?? 0,
            food: site.food,
            polityId: site.polityId,
            prosperity: site.prosperity,
            price: site.price,
            economy: site.economy,
            cohort: site.cohort,
          }
        : undefined,
      calendar: w.calendar,
      activeShocks: (w.shocks ?? [])
        .filter((shock) => !shock.resolved && w.month >= shock.started && w.month < shock.ends)
        .slice(0, 12)
        .map((shock) => ({
          id: shock.id,
          kind: shock.kind,
          title: shock.title,
          severity: shock.severity,
          started: shock.started,
          ends: shock.ends,
        })),
      activeConflicts: w.conflicts
        .filter((conflict) => conflict.status === 'active')
        .slice(0, 12)
        .map((conflict) => ({
          id: conflict.id,
          locationId: conflict.locationId,
          a: conflict.a,
          b: conflict.b,
          months: conflict.months,
        })),
      family: parents.map((p) => ({
        id: p.id,
        name: p.name,
        occupation: p.occupation,
        health: p.health,
        coin: p.coin,
        historicalIdentity: p.historicalIdentity?.qid,
      })),
      organizations: localOrgs,
      anomalyBudget: anomalyBudget(w),
      activeAnomalies: activeAbilityCount(w),
      recentEvents: [] as Array<Record<string, unknown>>,
    },
  };
}

export function pendingBirthPublic(pending: PendingBirth) {
  return {
    id: pending.id,
    status: pending.status,
    siteId: pending.siteId,
    childId: pending.childId,
    createdMonth: pending.createdMonth,
    deadline: pending.deadline,
    parentIds: pending.parentIds,
    failure: pending.failure,
  };
}

export const LifeProgramSchema = z
  .object({
    version: z.literal(1),
    id: z.string(),
    personId: z.string(),
    source: z.enum(['model', 'fallback']),
    createdMonth: z.number().int(),
    wish: z.string(),
    interpretation: z.object({
      hopes: z.array(z.string()),
      conditions: z.array(z.string()),
      costs: z.array(z.string()),
      translations: z.array(z.string()),
    }),
    traits: z.unknown(),
    goals: z.array(z.unknown()),
    opportunities: z.array(z.string()),
    replanTriggers: z.array(z.string()),
    abilitySpec: z.unknown().optional(),
    abilityDefinitionKey: z.string().optional(),
    status: z.enum(['active', 'superseded']),
    causeIds: z.array(z.string()),
  })
  .strict();
