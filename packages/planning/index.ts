import { clamp, safeText, type World, type Person } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { random } from '../simulation-core/random.js';
import { buildBaselineContext, selectBaselineAgenda } from './baseline.js';
import { isDetained } from '../coercion/index.js';
import { foreignAuthority } from '../sovereignty/index.js';
import { submitCrisisOffer } from '../crises/index.js';
import { AgendaProposalSchema, type AgendaDefinition, type AgendaProposal } from './schema.js';
export type Agenda = {
  source?: 'model' | 'creation' | 'rules_fallback';
  id: string;
  actorId: string;
  intention: string;
  rationale: string;
  steps: AgendaDefinition['steps'];
  cursor: number;
  progress: number;
  status: 'active' | 'complete' | 'failed' | 'replan';
  adopted: number;
  lastApplied: number;
  causeIds: string[];
  lastFailure?: string;
  waitingPlanId?: string;
  recipientId?: string;
};
export type Project = {
  id: string;
  creatorId: string;
  name: string;
  domain: NonNullable<AgendaDefinition['steps'][number]['domain']>;
  locationId: string;
  status: 'active' | 'complete' | 'failed';
  progress: number;
  required: number;
  spent: number;
  started: number;
  causeIds: string[];
  output?: string;
};
export type AgencyState = {
  version: 1;
  agendas: Record<string, Agenda>;
  projects: Record<string, Project>;
  needsReplan: Record<string, { since: number; reason: string; causeIds: string[] }>;
};
export const ensureAgency = (w: World): AgencyState =>
  (w.agency ??= { version: 1, agendas: {}, projects: {}, needsReplan: {} });
const costFor = (action: string) =>
  action === 'seek_work'
    ? 0
    : action === 'organize'
      ? 12
      : action === 'relocate'
        ? 3
        : action === 'aid'
          ? 2
          : action === 'project'
            ? 2
            : 1;
export function adoptAgenda(
  w: World,
  raw: unknown,
  emit: Emit,
  source: 'model' | 'creation' | 'rules_fallback' = 'model',
) {
  const p = AgendaProposalSchema.parse(raw),
    actor = w.persons.find((q) => q.id === p.actorId);
  if (
    !actor ||
    actor.death !== undefined ||
    actor.journey !== undefined ||
    isDetained(w, actor) ||
    actor.version !== p.actorVersion ||
    w.month > p.deadline
  )
    throw new Error('计划已过期、人物版本改变或尚在旅途中');
  if (w.processedJobs.includes(p.jobId)) throw new Error('计划任务已处理');
  const evidence = new Set(actor.memories.map((m) => m.eventId));
  if (p.evidenceIds.some((id) => !evidence.has(id))) throw new Error('计划引用未观察事实');
  let local = w.settlements.find((s) => s.id === actor.locationId)!;
  for (const step of p.steps) {
    if (step.targetId && ['care', 'socialize'].includes(step.action)) {
      const q = w.persons.find((q) => q.id === step.targetId);
      if (
        !q ||
        q.death !== undefined ||
        q.journey !== undefined ||
        isDetained(w, q) ||
        (q.locationId !== actor.locationId && !actor.relationships.some((r) => r.personId === q.id))
      )
        throw new Error('计划目标不在可观察社交范围');
    }
    if (step.action === 'relocate') {
      if (!step.targetId || !local.neighbors.includes(step.targetId))
        throw new Error('迁移需要已知相邻地点');
      local = w.settlements.find((s) => s.id === step.targetId)!;
    }
  }
  const state = ensureAgency(w);
  const old = state.agendas[actor.id];
  if (old?.status === 'active') {
    old.status = 'replan';
    const project = state.projects[`project-${old.id}-${old.cursor}`];
    if (project?.status === 'active') project.status = 'failed';
    const waiting = actor.plans.find((x) => x.id === old.waitingPlanId);
    if (waiting?.status === 'active') waiting.status = 'failed';
  }
  const e = emit(
    'agenda_adopted',
    [actor.id],
    actor.locationId,
    `${actor.name}决定尝试：${safeText(p.intention)}。`,
    {
      intention: safeText(p.intention),
      rationale: safeText(p.rationale),
      steps: p.steps.map((s) => ({ action: s.action, label: safeText(s.label) })),
      source,
      classification: 'agent-plan',
    },
    p.evidenceIds,
    0.7,
  );
  state.agendas[actor.id] = {
    source,
    id: `agenda-${e.id}`,
    actorId: actor.id,
    intention: safeText(p.intention),
    rationale: safeText(p.rationale),
    steps: p.steps.map((step) => ({ ...step, label: safeText(step.label) })),
    cursor: 0,
    progress: 0,
    status: 'active',
    adopted: w.month,
    lastApplied: -1,
    causeIds: [e.id],
  };
  // A temporary fallback plan must state its real purpose without silently
  // replacing the person's freely formulated longer-term intention.
  if (source !== 'rules_fallback' || !actor.intention) actor.intention = safeText(p.intention);
  delete state.needsReplan[actor.id];
  if (source !== 'rules_fallback') w.processedJobs.push(p.jobId);
  actor.version++;
  return e;
}
export function requestReplan(w: World, p: Person, reason: string, causeIds: string[] = []) {
  const state = ensureAgency(w),
    old = state.needsReplan[p.id];
  if (old) {
    old.reason = reason;
    old.causeIds = [...new Set([...old.causeIds, ...causeIds])].slice(-12);
    return;
  }
  state.needsReplan[p.id] = { since: w.month, reason, causeIds: causeIds.slice(-12) };
}
/** The model chooses intentions/steps. This resolver owns costs, duration, feasibility and actual consequences. */
export function advanceAgency(w: World, emit: Emit) {
  if (!w.calendar) return;
  const state = ensureAgency(w),
    people = new Map(w.persons.map((p) => [p.id, p])),
    places = new Map(w.settlements.map((s) => [s.id, s]));
  const localPeople = new Map<string, Person[]>();
  for (const p of w.persons)
    if (p.death === undefined && !p.journey && !isDetained(w, p)) {
      const list = localPeople.get(p.locationId) ?? [];
      list.push(p);
      localPeople.set(p.locationId, list);
    }
  const baselineContext = buildBaselineContext(w, localPeople, places);
  const stopWork = (a: Agenda, p: Person) => {
    const project = state.projects[`project-${a.id}-${a.cursor}`];
    if (project?.status === 'active') project.status = 'failed';
    if (a.waitingPlanId) {
      const plan = p.plans.find((x) => x.id === a.waitingPlanId);
      if (plan?.status === 'active') plan.status = 'failed';
    }
  };
  for (const p of w.persons) {
    if (p.death !== undefined) {
      const a = state.agendas[p.id];
      if (a?.status === 'active') {
        stopWork(a, p);
        a.status = 'failed';
      }
      delete state.needsReplan[p.id];
      continue;
    }
    if (p.journey || isDetained(w, p)) continue;
    if (!p.memories.length) {
      const e = emit(
        'deliberation_context',
        [p.id],
        p.locationId,
        `${p.name}根据眼下的生活条件考虑下一步打算。`,
        { coin: p.coin, occupation: p.occupation, actorVersion: p.version },
        [],
        0.2,
      );
      if (!p.memories.some((m) => m.eventId === e.id))
        p.memories.push({
          id: `memory-${p.id}-${e.id}`,
          eventId: e.id,
          month: w.month,
          salience: 0.2,
        });
    }
    const a = state.agendas[p.id];
    if (!a || a.status !== 'active') {
      // LifeProgram / dynamic event opportunities are invitations, not commands.
      // The person accepts or declines using their actual values and situation.
      const opportunity = Object.values(w.runtime?.opportunities ?? {})
        .filter(
          (item) =>
            item.personId === p.id &&
            item.status === 'open' &&
            item.dueMonth >= w.month &&
            (w.month - p.birth) / 12 >= 16,
        )
        .sort((x, y) => x.dueMonth - y.dueMonth || x.id.localeCompare(y.id))[0];
      if (opportunity) {
        const careWeight = p.values.care * 0.25;
        const ambitionWeight = p.values.ambition * 0.2;
        const acceptance =
          opportunity.action === 'aid' || opportunity.action === 'care'
            ? 0.35 + careWeight + ambitionWeight * 0.4
            : opportunity.action === 'organize' ||
                opportunity.action === 'negotiate' ||
                opportunity.action === 'campaign'
              ? 0.3 + ambitionWeight + careWeight * 0.5
              : 0.45 + careWeight + ambitionWeight;
        if (random(w.seed, w.month, p.id, opportunity.id, 'accept') > Math.min(0.9, acceptance)) {
          opportunity.status = 'expired';
          emit(
            'opportunity_declined',
            [p.id],
            p.locationId,
            `${p.name}没有接受「${opportunity.title}」这个机会。`,
            { opportunityId: opportunity.id, action: opportunity.action },
            opportunity.causeIds.slice(-4),
            0.4,
          );
        } else {
          const evidenceIds = opportunity.causeIds.filter((id) =>
            p.memories.some((memory) => memory.eventId === id),
          );
          const fallbackEvidence = p.memories.slice(-1).map((memory) => memory.eventId);
          try {
            adoptAgenda(
              w,
              {
                version: 1,
                jobId: `opportunity-${opportunity.id.slice(-70)}-${w.month}`,
                actorId: p.id,
                actorVersion: p.version,
                deadline: w.month,
                intention: opportunity.title,
                rationale: '这是世界中实际出现的机会，是否参与由人物当前的处境和意愿决定。',
                steps: [
                  {
                    action: opportunity.action,
                    label: opportunity.title.slice(0, 160),
                    months: 2,
                    targetId: opportunity.targetId,
                  },
                ],
                evidenceIds: (evidenceIds.length ? evidenceIds : fallbackEvidence).slice(-6),
              },
              emit,
              'rules_fallback',
            );
            opportunity.status = 'taken';
            emit(
              'opportunity_taken',
              [p.id],
              p.locationId,
              `${p.name}接受了「${opportunity.title}」，开始按自己的判断行动。`,
              { opportunityId: opportunity.id, action: opportunity.action },
              opportunity.causeIds.slice(-4),
              0.5,
            );
          } catch (error) {
            opportunity.status = 'expired';
            emit(
              'opportunity_failed',
              [p.id],
              p.locationId,
              `${p.name}考虑了「${opportunity.title}」，但现实条件不允许按此行动。`,
              {
                opportunityId: opportunity.id,
                action: opportunity.action,
                reason: safeText((error as Error).message).slice(0, 200),
              },
              opportunity.causeIds.slice(-4),
              0.4,
            );
          }
        }
        continue;
      }
      const need = state.needsReplan[p.id];
      if (need && w.month - need.since >= 3) {
        const fallback = selectBaselineAgenda(w, p, baselineContext);
        adoptAgenda(
          w,
          {
            version: 1,
            jobId: `fallback-${p.id}-${w.month}`,
            actorId: p.id,
            actorVersion: p.version,
            deadline: w.month,
            intention: fallback.intention,
            rationale: fallback.rationale,
            steps: fallback.steps,
            evidenceIds: [
              ...new Set([...need.causeIds, ...p.memories.slice(-1).map((m) => m.eventId)]),
            ]
              .filter((id) => p.memories.some((m) => m.eventId === id))
              .slice(-6),
          },
          emit,
          'rules_fallback',
        );
      } else if (!need)
        requestReplan(
          w,
          p,
          '形成与当前处境相符的生活计划',
          p.memories.slice(-2).map((m) => m.eventId),
        );
      continue;
    }
    if (a.status !== 'active' || a.lastApplied === w.month) continue;
    a.lastApplied = w.month;
    const s = places.get(p.locationId)!;
    const waitingOutcome = p.plans.find((plan) => plan.id === a.waitingPlanId);
    const disruptive = p.memories
      .filter(
        (m) =>
          m.month > a.adopted &&
          m.salience >= 0.8 &&
          !(waitingOutcome?.status === 'complete' && waitingOutcome.causeIds.includes(m.eventId)),
      )
      .slice(-3);
    if (disruptive.length && w.month > a.adopted + 1) {
      stopWork(a, p);
      a.status = 'replan';
      const interruption = emit(
        'agenda_interrupted',
        [p.id],
        p.locationId,
        `${p.name}因新的重要经历中止原安排，重新考虑如何实现自己的打算。`,
        { agendaId: a.id, intention: a.intention },
        disruptive.map((m) => m.eventId),
        0.7,
      );
      requestReplan(w, p, '新经历改变了原计划的前提', [
        interruption.id,
        ...disruptive.map((m) => m.eventId),
      ]);
      continue;
    }
    const step = a.steps[a.cursor];
    if (!step) {
      a.status = 'complete';
      requestReplan(w, p, '上一项人生计划已经完成', a.causeIds.slice(-2));
      continue;
    }
    const fail = (reason: string) => {
      stopWork(a, p);
      a.status = 'failed';
      a.lastFailure = reason;
      const e = emit(
        'agenda_step_failed',
        [p.id],
        s.id,
        `${p.name}尝试${safeText(step.label)}，但${reason}。`,
        { agendaId: a.id, action: step.action, reason },
        a.causeIds.slice(-3),
        0.65,
      );
      requestReplan(w, p, reason, [e.id]);
    };
    if (p.health < 0.25 || (p.life?.illness?.severity && p.life.illness.severity > 0.75)) {
      fail('身体状况无法支撑原来的安排');
      continue;
    }
    if (a.waitingPlanId) {
      const plan = p.plans.find((x) => x.id === a.waitingPlanId);
      if (plan?.status === 'active') continue;
      if (plan?.status !== 'complete') {
        fail('迁移途中未能完成安排');
        continue;
      }
      delete a.waitingPlanId;
      a.progress = step.months;
    }
    if (!a.progress) {
      const cost =
        step.action === 'practice' && w.month - p.birth < 18 * 12 ? 0 : costFor(step.action);
      if (p.coin < cost) {
        fail('缺少所需的生活费与启动资金');
        continue;
      }
      if (
        ['care', 'socialize'].includes(step.action) &&
        (!step.targetId ||
          !people.has(step.targetId) ||
          people.get(step.targetId)!.death !== undefined ||
          people.get(step.targetId)!.journey !== undefined ||
          isDetained(w, step.targetId) ||
          people.get(step.targetId)!.locationId !== s.id)
      ) {
        fail('目标人物已不在当地或已经离世');
        continue;
      }
      p.coin -= cost;
      if (step.action === 'aid') {
        const needy = (localPeople.get(s.id) ?? [])
          .filter((q) => q.id !== p.id)
          .sort((x, y) => x.coin - y.coin || x.id.localeCompare(y.id))[0];
        if (needy) {
          needy.coin += cost;
          a.recipientId = needy.id;
          const aid = emit(
            'agency_aid',
            [p.id, needy.id],
            s.id,
            `${p.name}向${needy.name}提供了生活救助。`,
            { amount: cost, agendaId: a.id, roles: { giver: p.id, recipient: needy.id } },
            a.causeIds.slice(-3),
            0.65,
          );
          a.causeIds = [...a.causeIds, aid.id].slice(-12);
        } else s.coin += cost;
      } else s.coin += cost;
      if (step.action === 'relocate') {
        if (!step.targetId || !s.neighbors.includes(step.targetId)) {
          fail('可行的交通路线已改变');
          continue;
        }
        const id = `agency-move-${a.id}-${a.cursor}`;
        p.plans.push({
          id,
          kind: 'migrate',
          targetId: step.targetId,
          step: 0,
          reserved: cost,
          deadline: w.month + 8,
          status: 'active',
          causeIds: a.causeIds.slice(-3),
        });
        a.waitingPlanId = id;
        a.progress = 1;
        continue;
      }
      if (step.action === 'project') {
        const id = `project-${a.id}-${a.cursor}`;
        state.projects[id] = {
          id,
          creatorId: p.id,
          name: safeText(step.label),
          domain: step.domain ?? 'craft',
          locationId: s.id,
          status: 'active',
          progress: 0,
          required: step.months,
          spent: cost,
          started: w.month,
          causeIds: a.causeIds.slice(-3),
        };
      }
    }
    a.progress++;
    if (p.life) p.life.fatigue = clamp(p.life.fatigue + 0.008);
    const project = state.projects[`project-${a.id}-${a.cursor}`];
    if (project && project.status === 'active') {
      if (p.coin < 1) {
        project.status = 'failed';
        fail('项目无法继续承担开销');
        continue;
      }
      p.coin--;
      s.coin++;
      project.spent++;
      project.progress++;
    }
    if (a.progress < step.months) continue;
    if (step.action === 'campaign' && !step.ideology) {
      fail('政治主张尚未明确，不能默认替人物选择立场');
      continue;
    }
    if (step.action === 'negotiate') {
      const polity = w.polities.find((q) => q.id === s.polityId);
      const key = [s.polityId, step.targetId ?? ''].sort().join('~');
      if (
        polity?.leaderId !== p.id ||
        foreignAuthority(w, s.polityId).kind === 'foreign' ||
        !w.geopolitics?.relations[key]
      ) {
        fail('没有相应外交授权或可接触的对方');
        continue;
      }
    }
    const r = random(w.seed, w.month, p.id, a.id, a.cursor),
      skill = (p.skills.craft + p.skills.learning) / 2;
    if (
      ['project', 'research', 'petition'].includes(step.action) &&
      r > clamp(0.25 + skill * 0.6 - s.scarcity * 0.2, 0.05, 0.9)
    ) {
      if (project) project.status = 'failed';
      fail('实际能力、支持或条件不足，尝试未奏效');
      continue;
    }
    if (step.action === 'seek_work' && p.life?.career.employed) {
      fail('已有工作；当前求职动作不提供额外职位或加薪');
      continue;
    }
    if (step.action === 'seek_work' && r <= (s.economy?.unemployment ?? 0.1)) {
      fail('当地没有接纳这次求职');
      continue;
    }
    const e = emit(
      'agenda_step_completed',
      [
        p.id,
        ...(step.targetId && people.has(step.targetId) ? [step.targetId] : []),
        ...(a.recipientId ? [a.recipientId] : []),
      ],
      s.id,
      `${p.name}完成了一次关于「${safeText(step.label)}」的${project ? '项目工作' : '行动'}。`,
      {
        agendaId: a.id,
        action: step.action,
        ...(step.action === 'campaign' ? { ideology: step.ideology } : {}),
        projectId: project?.id,
        classification: 'executed-agent-action',
      },
      a.causeIds.slice(-4),
      0.65,
    );
    if (step.action === 'practice') p.skills.craft = clamp(p.skills.craft + 0.012);
    if (step.action === 'seek_work' && p.life) {
      p.life.career.employed = true;
      p.life.career.role = p.occupation;
    }
    if (step.action === 'care') {
      const q = people.get(step.targetId!)!;
      q.health = clamp(q.health + (p.occupation === '医护人员' ? 0.015 : 0.005));
      if (q.life) q.life.emotions.hope = clamp(q.life.emotions.hope + 0.015);
    }
    if (step.action === 'socialize') {
      const q = people.get(step.targetId!)!;
      for (const [from, to] of [
        [p, q],
        [q, p],
      ]) {
        const rel = from.relationships.find((r) => r.personId === to.id);
        if (rel) {
          rel.trust = clamp(rel.trust + 0.035, -1, 1);
          rel.causeIds = [...(rel.causeIds ?? []), e.id].slice(-12);
        } else
          from.relationships.push({
            personId: to.id,
            kind: 'acquaintance',
            trust: 0.2,
            attachment: 0.1,
            since: w.month,
            causeIds: [e.id],
          });
      }
    }
    if (step.action === 'research') {
      p.skills.learning = clamp(p.skills.learning + 0.012);
      const gain = 0.002 * p.skills.learning * (w.parameters.researchRate ?? 1);
      s.knowledge = clamp(s.knowledge + gain);
      (w.discoveries ??= []).push({
        id: `discovery-${e.id}`,
        name: safeText(step.label),
        creatorId: p.id,
        locationId: s.id,
        createdAt: w.month,
        mechanism: 'production_improvement',
        gain,
        causeIds: [e.id],
      });
    }
    if (step.action === 'organize') {
      const kind = step.institution ?? 'council',
        mechanism =
          kind === 'guild' ? 'pooled_production' : kind === 'academy' ? 'research' : 'mutual_aid';
      w.organizations.push({
        id: `org-${e.id}`,
        name: safeText(step.label),
        kind,
        locationId: s.id,
        creatorId: p.id,
        leaderId: p.id,
        memberIds: [p.id],
        treasury: 0,
        founded: w.month,
        status: 'active',
        definition: {
          version: 1,
          kind,
          name: safeText(step.label).slice(0, 60),
          mechanism,
          dues: 1,
          upkeep: 1,
          effect: 0.025,
          ttlMonths: 120,
          maxMembers: 32,
        },
        progress: 0,
        insolventMonths: 0,
        adoption: 0.1,
        causeIds: [e.id],
      });
    }
    if (step.action === 'petition') {
      const polity = w.polities.find((x) => x.id === s.polityId),
        gov = w.geopolitics?.governments[s.polityId],
        support = p.relationships.filter((r) => r.trust > 0.6).length;
      if (gov && support >= 3) {
        gov.laws.labor = clamp(gov.laws.labor + 0.005);
        gov.causeIds = [e.id];
        if (polity) polity.legitimacy = clamp(polity.legitimacy + 0.002);
      } else s.unrest = clamp(s.unrest + 0.002);
    }
    if (step.action === 'campaign') {
      const gov = w.geopolitics?.governments[s.polityId];
      const party = gov?.parties.find((q) => q.ideology === step.ideology);
      if (party && gov) {
        const claimId = `political:${party.ideology}`;
        if (!w.claims.some((c) => c.id === claimId))
          w.claims.push({
            id: claimId,
            subjectId: s.polityId,
            predicate: `政治主张：${party.ideology}`,
            truth: 'unknown',
            sourceIds: [e.id],
          });
        const belief = p.beliefs.find((b) => b.claimId === claimId);
        if (belief) {
          belief.confidence = Math.max(0.7, belief.confidence);
          belief.sourceIds = [...new Set([...belief.sourceIds, e.id])].slice(-8);
        } else p.beliefs.push({ claimId, confidence: 0.7, sourceIds: [e.id] });
        const support = p.relationships.filter((r) => r.trust > 0.5).length;
        party.support += Math.min(0.01, 0.001 * (1 + support));
        const total = gov.parties.reduce((n, q) => n + q.support, 0);
        for (const q of gov.parties) q.support /= total;
        gov.causeIds = [e.id];
        if (gov.laws.pressFreedom < 0.2) p.stress = clamp(p.stress + 0.03);
      }
    }
    if (step.action === 'negotiate') {
      const rel = w.geopolitics!.relations[[s.polityId, step.targetId!].sort().join('~')];
      rel.affinity = clamp(rel.affinity + 0.025, -1, 1);
      rel.dispute = clamp(rel.dispute - 0.025, 0, 2);
      rel.causeIds = [e.id];
      if (rel.status === 'war' && rel.dispute < 0.25 && rel.affinity > 0.1)
        rel.status = 'armistice';
      if (rel.status === 'sanctions' && rel.dispute < 0.25) {
        rel.status = 'peace';
        rel.trade = clamp(rel.trade + 0.05);
      }
    }
    if (step.action === 'faith') {
      const id =
        step.traditionId ??
        `faith:tradition_${w.month}_${p.id
          .replace(/[^a-z0-9]/gi, '')
          .toLowerCase()
          .slice(-24)}`;
      if (!w.claims.some((q) => q.id === id))
        w.claims.push({
          id,
          subjectId: p.id,
          predicate: safeText(step.label),
          truth: 'unknown',
          sourceIds: [e.id],
        });
      for (const belief of p.beliefs)
        if (belief.claimId.startsWith('faith:') && belief.claimId !== id) belief.confidence *= 0.4;
      const existing = p.beliefs.find((b) => b.claimId === id);
      if (existing) {
        existing.confidence = 0.7;
        existing.sourceIds = [...existing.sourceIds, e.id].slice(-8);
      } else p.beliefs.push({ claimId: id, confidence: 0.7, sourceIds: [e.id] });
    }
    if (step.action === 'publish') {
      const id = `claim-${e.id}`;
      w.claims.push({
        id,
        subjectId: p.id,
        predicate: safeText(step.label),
        truth: 'unknown',
        sourceIds: [e.id],
      });
      p.beliefs.push({ claimId: id, confidence: 0.6, sourceIds: [e.id] });
    }
    if (project) {
      project.status = 'complete';
      project.output = safeText(step.label);
      if (project.domain === 'medicine' && s.economy)
        s.economy.healthcare = clamp(s.economy.healthcare + 0.002);
      else if (project.domain === 'civic') s.unrest = clamp(s.unrest - 0.005);
      else if (project.domain === 'science')
        s.knowledge = clamp(s.knowledge + 0.002 * (w.parameters.researchRate ?? 1));
      else p.skills.craft = clamp(p.skills.craft + 0.01);
      if (project.domain === 'commerce' || project.domain === 'civic') {
        const kind = project.domain === 'commerce' ? 'guild' : 'council',
          mechanism = kind === 'guild' ? 'pooled_production' : 'mutual_aid';
        w.organizations.push({
          id: `project-org-${project.id}`,
          name: project.name,
          kind,
          locationId: s.id,
          creatorId: p.id,
          leaderId: p.id,
          memberIds: [p.id],
          treasury: 0,
          founded: w.month,
          status: 'active',
          definition: {
            version: 1,
            kind,
            name: project.name.slice(0, 60),
            mechanism,
            dues: 1,
            upkeep: 1,
            effect: 0.015,
            ttlMonths: 120,
            maxMembers: 24,
          },
          progress: 0,
          insolventMonths: 0,
          adoption: 0.05,
          causeIds: [e.id],
        });
        project.output = `organization:project-org-${project.id}`;
      }
      if (project.domain === 'culture') {
        const claimId = `artwork-${project.id}`;
        w.claims.push({
          id: claimId,
          subjectId: p.id,
          predicate: `作品：${project.name}`,
          truth: 'unknown',
          sourceIds: [e.id],
        });
        p.beliefs.push({ claimId, confidence: 0.7, sourceIds: [e.id] });
        project.output = `cultural-work:${claimId}`;
      }
    }
    a.causeIds = [...a.causeIds, e.id].slice(-12);
    delete a.recipientId;
    a.cursor++;
    a.progress = 0;
    if (step.action === 'negotiate') {
      const crisis = Object.values(w.crises?.cases ?? {}).find(
        (c) =>
          c.status === 'active' &&
          ((c.a === s.polityId && c.b === step.targetId) ||
            (c.b === s.polityId && c.a === step.targetId)),
      );
      if (crisis && crisis.offers[s.polityId]?.submittedMonth !== w.month)
        submitCrisisOffer(
          w,
          {
            crisisId: crisis.id,
            polityId: s.polityId,
            actorId: p.id,
            actionEventId: e.id,
            action: 'negotiate',
            source: a.source === 'model' ? 'llm' : 'institution',
            evidenceVersion: crisis.evidenceVersion,
            causeIds: [e.id, ...crisis.sourceEvidenceIds.slice(-2)],
          },
          emit,
          [e],
        );
    }
    if (a.cursor >= a.steps.length) {
      a.status = 'complete';
      requestReplan(w, p, '这一阶段的计划已完成', [e.id]);
    }
  }
}
