import { compileDefinition } from '../dynamics/index.js';
import { clamp, type Person, type World, type LifeState } from '../contracts/index.js';
import { random } from '../simulation-core/random.js';
import { isDetained } from '../coercion/index.js';
import type { Emit } from '../simulation-core/index.js';
import { appendCauseId, reconsider } from './index.js';
export function initializeLife(p: Person, w: World): LifeState {
  const r = (k: string) => random(w.seed, p.id, k);
  const learned = ['教师', '医护人员', '工程师', '程序员', '研究员'].includes(p.occupation);
  return (p.life = {
    needs: { food: 0.1, rest: 0.15, safety: 0.1, belonging: 0.55, purpose: 0.4, autonomy: 0.3 },
    emotions: { hope: 0.65, fear: 0.1, grief: 0, anger: 0 },
    personality: {
      openness: r('open'),
      conscientiousness: r('conscientious'),
      extraversion: r('extravert'),
      agreeableness: p.values.care,
      neuroticism: r('neurotic'),
    },
    career: {
      role: p.occupation,
      level: learned ? 2 : 1,
      experience: 0,
      employed: r('employment') > 0.06,
      burnout: 0,
    },
    education: { level: learned ? 3 : 1, months: 0, field: p.occupation },
    housing: { quality: 0.55, rent: 0.5 },
    debt: 0,
    fatigue: 0.1,
  });
}
export function initializeInfantLife(p: Person, w: World): LifeState {
  const life = initializeLife(p, w);
  life.career = { role: '孩童', level: 0, experience: 0, employed: false, burnout: 0 };
  life.education = { level: 0, months: 0, field: '成长' };
  life.housing = { quality: 0.5, rent: 0 };
  life.needs = { food: 0.1, rest: 0.3, safety: 0.2, belonging: 0.8, purpose: 0.1, autonomy: 0.05 };
  return life;
}
export function advanceLife(
  w: World,
  p: Person,
  emit: Emit,
  context?: {
    persons: Map<string, Person>;
    settlements: Map<string, World['settlements'][number]>;
  },
) {
  if (!w.parameters.lifeComplexity || p.death !== undefined) return;
  const life = p.life ?? initializeLife(p, w),
    s = context?.settlements.get(p.locationId) ?? w.settlements.find((s) => s.id === p.locationId)!,
    economy = s.economy;
  const age = (w.month - p.birth) / 12;
  const r = (k: string) => random(w.seed, w.month, p.id, 'life', k);
  const recent = p.memories
    .filter((m) => w.month - m.month <= 6)
    .sort((a, b) => b.salience - a.salience)
    .slice(0, 2)
    .map((m) => m.eventId);
  if (
    !p.journey &&
    !life.illness &&
    s.disease &&
    r('infection') < s.disease.prevalence * (1.1 + 0.3 * life.personality.extraversion)
  ) {
    const e = emit(
      'illness',
      [p.id],
      s.id,
      `${p.name}出现呼吸道疾病症状，日常工作和生活受到影响。`,
      { classification: 'simulated-consequence' },
      [s.disease.causeId],
      0.8,
    );
    life.illness = {
      kind: 'respiratory',
      severity: clamp(0.3 + (1 - p.health) * 0.5 + r('severity') * 0.3),
      started: w.month,
      remaining: 2 + Math.floor(r('duration') * 2),
      causeIds: [e.id],
    };
  }
  if (life.illness) {
    p.health = clamp(p.health - life.illness.severity * 0.035);
    life.fatigue = clamp(life.fatigue + 0.06);
    p.stress = clamp(p.stress + 0.025);
    life.illness.remaining--;
    if (life.illness.remaining <= 0) {
      emit(
        'illness_recovered',
        [p.id],
        s.id,
        `${p.name}的身体逐渐恢复，开始重新安排日常生活。`,
        {},
        life.illness.causeIds,
        0.7,
      );
      delete life.illness;
    }
  }
  if (p.journey || isDetained(w, p)) {
    life.needs.safety = clamp(p.stress * 0.6 + 0.2);
    life.needs.rest = clamp(life.fatigue);
    life.lastDecision = {
      kind: p.journey ? 'travel' : 'custody',
      reason: p.journey ? '途中暂时无法参与当地工作和学习' : '拘留期间无法参与当地工作和学习',
      month: w.month,
      causeIds: (p.journey?.causeIds ?? w.coercion!.custody[p.id].causeIds).slice(-4),
    };
    return;
  }
  if (age < 18) {
    life.career.employed = false;
    // Infants and toddlers are cared for; formal education months begin at six.
    if (age >= 6) life.education.months++;
    life.needs.purpose = age < 6 ? 0.1 : 0.2;
    life.needs.belonging = clamp(
      0.9 - p.relationships.filter((r) => r.kind === 'kin').length * 0.04,
    );
    return;
  }
  const active = p.goals
    .filter((g) => g.status === 'active')
    .sort((a, b) => b.strength - a.strength)[0];
  life.emotions.grief *= 0.94;
  life.emotions.anger *= 0.96;
  life.emotions.fear = clamp(life.emotions.fear * 0.9 + p.stress * 0.07 + s.scarcity * 0.1);
  life.emotions.hope = clamp(
    0.7 - p.stress * 0.45 + life.personality.openness * 0.1 - life.emotions.grief * 0.3,
  );
  life.needs.food = clamp(s.scarcity + (p.coin < 2 ? 0.25 : 0));
  life.needs.safety = clamp(p.stress * 0.4 + (1 - p.health) * 0.4);
  life.needs.rest = clamp(life.fatigue);
  life.needs.belonging = clamp(0.8 - p.relationships.filter((r) => r.trust > 0.6).length * 0.16);
  life.needs.purpose = clamp(active?.kind === 'learn' ? 0.6 : 0.4 - life.career.level * 0.05);
  life.needs.autonomy = clamp(0.2 + life.debt * 0.005 + life.career.burnout * 0.4);
  const unemployment = economy?.unemployment ?? 0.06;
  if (life.career.employed && r('layoff') < 0.002 + Math.max(0, unemployment - 0.06) * 0.035) {
    life.career.employed = false;
    const e = emit(
      'job_lost',
      [p.id],
      s.id,
      `${p.name}所在的岗位缩减，暂时失去了${life.career.role}的收入。`,
      { unemployment, occupation: life.career.role },
      recent,
      0.8,
    );
    reconsider(p, e, 'survive');
  }
  let decision = 'work',
    reason = '维持收入并积累职业经验';
  if (!life.career.employed) {
    decision = 'job_search';
    reason = '收入中断，需要找到能负担生活的新工作';
    const contacts = p.relationships.filter((r) => r.trust > 0.5).length;
    if (
      r('hiring') <
      clamp(0.18 + p.skills.craft * 0.2 + contacts * 0.015 - unemployment * 0.45, 0.03, 0.65)
    ) {
      life.career.employed = true;
      life.career.role = p.occupation;
      emit(
        'job_found',
        [p.id],
        s.id,
        `${p.name}通过求职重新获得了${p.occupation}的工作。`,
        { role: p.occupation, networkContacts: contacts },
        recent,
        0.8,
      );
    }
  }
  const pressure = life.needs.rest + life.needs.safety;
  if ((pressure > 1.05 || life.illness) && p.coin > 3) {
    decision = 'recover';
    reason = '疲惫和身体状况已经影响生活，需要休整';
    life.fatigue = clamp(life.fatigue - 0.2);
    p.stress = clamp(p.stress - 0.06);
    const fee = Math.min(p.coin, 0.4);
    p.coin -= fee;
    s.coin += fee;
    p.health = clamp(p.health + (economy?.healthcare ?? 0.5) * 0.02);
  } else if (life.career.employed) {
    life.career.experience++;
    life.fatigue = clamp(life.fatigue + 0.018 - life.personality.conscientiousness * 0.012);
    life.career.burnout = clamp(life.career.burnout * 0.97 + life.fatigue * 0.012);
  }
  if (active?.kind === 'learn' && p.coin >= 1.2 && life.fatigue < 0.7) {
    decision = 'study';
    reason = '为了长期的学习目标，投入时间与学费';
    const fee = 0.35;
    p.coin -= fee;
    s.coin += fee;
    life.education.months++;
    p.skills.learning = clamp(p.skills.learning + 0.002 * (economy?.education ?? 0.5));
    life.fatigue = clamp(life.fatigue + 0.015);
    if (life.education.months % 12 === 0 && life.education.level < 5) {
      life.education.level++;
      const e = emit(
        'education',
        [p.id],
        s.id,
        `${p.name}完成了${life.education.field}的一阶段进修。`,
        { educationLevel: life.education.level, monthsStudied: life.education.months },
        active.causeIds,
        0.75,
      );
      active.progress = clamp(active.progress + 0.25);
      appendCauseId(active.causeIds, e.id);
    }
  }
  if (
    life.career.employed &&
    life.career.level < 5 &&
    life.career.experience >= life.career.level * 24 &&
    p.skills.craft + life.education.level * 0.12 > 0.35 + life.career.level * 0.14
  ) {
    life.career.level++;
    p.skills.craft = clamp(p.skills.craft + 0.035);
    emit(
      'career_progress',
      [p.id],
      s.id,
      `${p.name}在${life.career.role}的工作中承担了更多职责。`,
      { level: life.career.level, experience: life.career.experience },
      recent,
      0.75,
    );
  }
  life.housing.rent = 0.3 + s.price * 0.12 + life.housing.quality * 0.2;
  const rent = Math.min(p.coin, life.housing.rent);
  p.coin -= rent;
  s.coin += rent;
  if (rent < life.housing.rent) {
    life.housing.quality = clamp(life.housing.quality - 0.02, 0.1, 0.95);
    p.stress = clamp(p.stress + 0.025);
  } else if (p.coin > 60 && life.housing.quality < 0.8) {
    life.housing.quality += 0.005;
  }
  const sick = p.relationships
    .filter((r) => ['kin', 'partner', 'friend'].includes(r.kind) && r.trust > 0.55)
    .map((r) =>
      context ? context.persons.get(r.personId) : w.persons.find((q) => q.id === r.personId),
    )
    .find(
      (q) =>
        q &&
        q.death === undefined &&
        !q.journey &&
        !isDetained(w, q) &&
        q.locationId === p.locationId &&
        q.health < 0.55,
    );
  if (sick && p.values.care > 0.6 && p.coin > 3) {
    decision = 'care';
    reason = `照料身体欠佳的${sick.name}`;
    const help = 0.5;
    p.coin -= help;
    sick.coin += help;
    life.fatigue = clamp(life.fatigue + 0.03);
    if (w.month % 6 === 0)
      emit(
        'caregiving',
        [p.id, sick.id],
        s.id,
        `${p.name}抽出时间和生活费照顾${sick.name}。`,
        { support: help, roles: { caregiver: p.id, recipient: sick.id } },
        recent,
        0.65,
      );
  }
  if (
    active?.kind === 'belong' &&
    p.relationships.some((r) => ['friend', 'partner', 'kin'].includes(r.kind) && r.trust > 0.7)
  ) {
    active.progress = 1;
    active.status = 'fulfilled';
    const next = p.values.ambition > 0.6 && life.personality.openness < 0.65 ? 'prosper' : 'learn';
    const e = emit(
      'goal_transition',
      [p.id],
      s.id,
      `${p.name}渐渐找到了归属，开始考虑${next === 'prosper' ? '更稳定富足的生活' : '学习新的本领'}。`,
      { fulfilled: 'belong', adopted: next },
      active.causeIds.slice(-2),
      0.7,
    );
    p.goals.push({
      id: `goal-${p.id}-${e.id}`,
      kind: next,
      strength: 0.55,
      progress: 0,
      status: 'active',
      causeIds: [e.id],
    });
  }
  if (active?.kind === 'prosper') {
    active.progress = clamp(p.coin / 100);
    if (p.coin >= 100) {
      active.status = 'fulfilled';
      const e = emit(
        'savings_goal',
        [p.id],
        s.id,
        `${p.name}终于攒下了自己希望拥有的一笔生活储备。`,
        { savings: p.coin },
        active.causeIds,
        0.75,
      );
      appendCauseId(active.causeIds, e.id);
    }
  }
  if (life.emotions.grief > 0.55 && p.coin > 5) {
    decision = 'grieve';
    reason = '给自己留一点时间，逐渐适应失去重要之人的生活';
    life.fatigue = clamp(life.fatigue - 0.025);
  }
  if (
    active?.kind === 'reform' &&
    p.coin >= 25 &&
    p.relationships.filter((r) => r.trust > 0.6).length >= 2 &&
    r('organize') < 0.04 &&
    !w.organizations.some((o) => o.creatorId === p.id && o.status === 'active') &&
    w.organizations.length < 128
  ) {
    const definition = compileDefinition({
      version: 1,
      kind: 'council',
      name: `${s.name}互助议事会`,
      mechanism: 'mutual_aid',
      upkeep: 1,
      dues: 1,
      effect: 0.08,
      ttlMonths: 240,
      maxMembers: 40,
    });
    p.coin -= 12;
    const id = `civic-${p.id}-${w.month}`;
    const e = emit(
      'institution_founded',
      [p.id],
      s.id,
      `${p.name}联系了身边的朋友，发起「${definition.name}」，尝试改善共同的生活处境。`,
      { organizationId: id, definition },
      active.causeIds,
      0.85,
    );
    w.organizations.push({
      id,
      name: definition.name,
      kind: 'council',
      locationId: s.id,
      creatorId: p.id,
      leaderId: p.id,
      memberIds: [p.id],
      treasury: 12,
      founded: w.month,
      status: 'active',
      definition,
      progress: 0,
      insolventMonths: 0,
      adoption: 0,
      causeIds: [e.id],
    });
    decision = 'organize';
    reason = '将改变处境的愿望付诸集体行动';
    active.progress = clamp(active.progress + 0.3);
    appendCauseId(active.causeIds, e.id);
  }
  life.lastDecision = { kind: decision, reason, month: w.month, causeIds: recent };
  p.stress = clamp(p.stress * 0.99 + life.needs.autonomy * 0.005 + life.needs.belonging * 0.002);
  life.fatigue = clamp(life.fatigue - 0.015 * (1 - p.stress));
}
export function lifeWage(p: Person, prosperity: number) {
  if (!p.life) return (0.5 + p.skills.craft) * prosperity;
  if (!p.life.career.employed) return 0;
  return (
    (0.65 + p.skills.craft + p.life.career.level * 0.3 + p.life.education.level * 0.12) *
    prosperity *
    (1 - p.life.career.burnout * 0.3)
  );
}
