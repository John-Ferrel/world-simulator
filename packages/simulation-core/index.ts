import { normalizeEarthPolityLabels } from '../world-packs/earth/labels.js';
import { synchronizeHistoricalConflicts } from '../world-packs/earth/pressure.js';
import { applyWorldlineEffects } from '../worldlines/apply.js';
import { AgendaProposalSchema } from '../planning/schema.js';
import { adoptAgenda, advanceAgency, requestReplan } from '../planning/index.js';
import {
  advanceIndustry,
  applyIndustrialLabor,
  assertIndustrialLedger,
} from '../industry/index.js';
import {
  advanceGeopolitics,
  applyGeopoliticalEffects,
  initializeGeopolitics,
} from '../geopolitics/index.js';
import {
  advanceSociety,
  applySocietyToLife,
  laborWageFactor,
  applyLaborDisruption,
} from '../society/index.js';
import { advanceWorldlines } from '../worldlines/index.js';
import { occupationForYear } from '../world-packs/earth/era.js';
import { expandEarthGeography } from '../world-packs/earth/expand.js';
import { migrateEarthLandRouteModes } from '../world-packs/earth/geography.js';
import { advanceEarthEvents } from '../world-packs/earth/events.js';
import { advanceLife, initializeLife, lifeWage } from '../cognition/life.js';
import { runWorldSystems } from '../world-systems/index.js';
import {
  clamp,
  BirthRequestSchema,
  population,
  safeText,
  type World,
  type Person,
  type HistoricalEvent,
  type Command,
  type Transition,
  type Settlement,
} from '../contracts/index.js';
import { random } from './random.js';
import { newPerson } from '../world-packs/index.js';
import { advanceTravel } from '../travel/index.js';
import { advancePolitics } from '../politics/index.js';
import { advanceIdentity } from '../identity/index.js';
import { advanceCoercion, isDetained } from '../coercion/index.js';
import { repairDuplicateEarthSettlements } from '../world-packs/earth/repair-geography.js';
import { initializeSovereignty, enforceDependentDiplomacy } from '../sovereignty/index.js';
import { advanceCrises } from '../crises/index.js';
import { advanceMovements } from '../movements/index.js';
import { advanceStateEvolution, advancePoliticalOutcomes } from '../state-evolution/index.js';
import { compileDefinition, validateProposal } from '../dynamics/index.js';
import {
  advanceLifePrograms,
  advanceRules,
  applyDirectorProposal,
  assertRuleState,
  commitBirth,
  compileDirectorProposal,
  compileRule,
  createPendingBirth,
  definitionKey,
  ensureRuntime,
  expirePendingBirths,
  fallbackBirthCompilation,
  installDefinition,
  observeDirector,
  observeWorld,
  parseBirthProposal,
} from '../rules/index.js';
import { appendCauseId, remember, reconsider } from '../cognition/index.js';
export type Emit = (
  kind: string,
  people: string[],
  locationId: string | undefined,
  text: string,
  data?: Record<string, unknown>,
  causes?: string[],
  significance?: number,
) => HistoricalEvent;
export function advance(input: World, commands: Command[] = [], tick = true): Transition {
  // A deceased incumbent may still need office metadata cleared by succession.
  // Give that record transition-local ownership so the journal's prior state stays intact.
  const pendingOfficeholders = new Set(
    [
      ...input.polities.map((polity) => polity.leaderId),
      ...Object.values(input.politics?.polities ?? {}).map((power) => power.leaderId),
    ].filter((id): id is string => Boolean(id)),
  );
  const w = {
      ...structuredClone({ ...input, persons: [] }),
      persons: input.persons.map((p) => {
        if (p.death !== undefined && !pendingOfficeholders.has(p.id)) return p;
        // Closed goals are immutable history, just like deceased people. Retain every
        // record without copying its evidence arrays on every subsequent month.
        const copy: Person = structuredClone({ ...p, goals: [] });
        copy.goals = p.goals.map((goal) =>
          goal.status === 'active' ? structuredClone(goal) : goal,
        );
        return copy;
      }),
    },
    events: HistoricalEvent[] = [],
    results: Transition['results'] = [];
  if (w.status !== 'running') throw new Error('归档世界不可变更');
  if (tick) w.month++;
  w.revision++;
  const labelCorrections = normalizeEarthPolityLabels(w);
  const geographyRepairs = repairDuplicateEarthSettlements(w);
  const sovereignty = initializeSovereignty(w);
  const personIndex = new Map(w.persons.map((p) => [p.id, p]));
  const settlementIndex = new Map(w.settlements.map((s) => [s.id, s]));
  const livingOwners = new Set(
    w.persons.filter((p) => p.death === undefined && p.ownerId).map((p) => p.ownerId),
  );
  const locationEvents = new Map<string, HistoricalEvent[]>();
  const emit: Emit = (
    kind,
    personIds,
    locationId,
    text,
    data = {},
    causeIds = [],
    significance = 0.5,
  ) => {
    const e: HistoricalEvent = {
      id: `${w.id}:e${++w.eventSeq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds: [...new Set(personIds)],
      locationId,
      text: safeText(text),
      data,
      causeIds: [...new Set(causeIds)],
      significance,
    };
    events.push(e);
    if (locationId) {
      const list = locationEvents.get(locationId) ?? [];
      list.push(e);
      locationEvents.set(locationId, list);
    }
    for (const id of e.personIds) {
      const p = personIndex.get(id) ?? w.persons.find((p) => p.id === id);
      if (p && !personIndex.has(id)) personIndex.set(id, p);
      if (p && (p.death === undefined || (kind === 'death' && personIds[0] === p.id)))
        remember(p, e);
    }
    return e;
  };
  const find = (id: string) => personIndex.get(id)!;
  if (labelCorrections.length)
    emit(
      'polity_label_corrected',
      [],
      undefined,
      '地图中的政权专名已改用地理通称；这是名称资料修正，不代表政体更替。',
      { corrections: labelCorrections, classification: 'source-label-correction' },
      [],
      0.2,
    );
  if (geographyRepairs.length) {
    const event = emit(
      'geography_identity_repaired',
      [],
      undefined,
      '地图来源中重复的城市身份已校正；既有人生、人口和资源保留，错误记录以追加说明修正。',
      { repairs: geographyRepairs, classification: 'source-data-correction' },
      [],
      0.8,
    );
    w.migrations!.earthDuplicateSettlements!.eventId = event.id;
  }
  if (sovereignty && !sovereignty.initializedEventId) {
    const baseline = emit(
      'sovereignty_baseline_recorded',
      [],
      undefined,
      sovereignty.mode === 'historical-start'
        ? '1900年历史管辖起点已进入模拟；后续控制权取决于实际事件。'
        : '1900年历史管辖资料载入作为参考，既有世界控制权与人生保留。',
      {
        mode: sovereignty.mode,
        sourceSha256: sovereignty.sourceSha256,
        license: 'CC BY-NC-SA 4.0',
        classification: 'historical-jurisdiction-baseline',
      },
      [],
      0.8,
    );
    sovereignty.initializedEventId = baseline.id;
    for (const authority of Object.values(sovereignty.authorities))
      if (!authority.current.causeIds.length) authority.current.causeIds = [baseline.id];
  }
  for (const c of commands) {
    if (w.appliedCommands.includes(c.id)) {
      results.push({ id: c.id, ok: false, error: '重复指令' });
      continue;
    }
    try {
      if (c.kind === 'agenda') {
        adoptAgenda(w, c.proposal, emit);
        results.push({ id: c.id, ok: true });
      } else if (c.kind === 'expand_earth') {
        if (c.version !== 1) throw new Error('未知地理版本');
        const added = expandEarthGeography(w);
        if (added) {
          settlementIndex.clear();
          for (const s of w.settlements) settlementIndex.set(s.id, s);
        }
        if (added)
          emit(
            'geography_expanded',
            [],
            undefined,
            `地球区域细分新增${added}个城镇；人口与资源从既有区域守恒划分。`,
            {
              added,
              total: w.settlements.length,
              version: '1.1.0',
              classification: 'geography-refinement',
            },
          );
        results.push({ id: c.id, ok: true, value: { added } });
      } else if (c.kind === 'birth') {
        const request = BirthRequestSchema.parse(c.request);
        const pending = createPendingBirth(w, c.userId, request, c.id, emit);
        const fastBirth = process.env.BIRTH_FAST_PATH === 'true' && process.env.NODE_ENV !== 'test';
        if (fastBirth) {
          // The shared clock must not make a player wait behind a long
          // simulation batch for a deterministic birth. Model enrichment can
          // still be added later as private narrative work, but the child
          // enters the canonical world now.
          const compiled = fallbackBirthCompilation(w, pending);
          compiled.program.interpretation.translations.push(
            '快速出生：先以确定性人生底稿进入世界，不等待模型或下一批时钟。',
          );
          const child = commitBirth(
            w,
            pending,
            compiled,
            pending.registrationEventId ?? c.id,
            emit,
          );
          results.push({
            id: c.id,
            ok: true,
            value: {
              birthId: pending.id,
              personId: child.id,
              status: 'born',
              fast: true,
            },
          });
        } else {
          results.push({
            id: c.id,
            ok: true,
            value: {
              birthId: pending.id,
              jobId: pending.jobId,
              status: pending.status,
              deadline: pending.deadline,
            },
          });
        }
      } else if (c.kind === 'birth_compile') {
        const pending = w.runtime?.births[c.birthId];
        if (!pending) throw new Error('出生请求不存在');
        if (pending.status !== 'compiling') throw new Error('出生请求已结束，不能重复编译');
        let compiled: ReturnType<typeof fallbackBirthCompilation>;
        let usedFallback = c.source === 'fallback' || w.month > pending.deadline;
        let modelError: string | undefined;
        if (!usedFallback) {
          try {
            compiled = parseBirthProposal(w, pending, c.proposal);
          } catch (error) {
            usedFallback = true;
            modelError = (error as Error).message;
            compiled = fallbackBirthCompilation(w, pending);
          }
        } else compiled = fallbackBirthCompilation(w, pending);
        if (usedFallback) {
          compiled.program.interpretation.translations.push(
            modelError
              ? `模型出生编译未通过，使用确定性后备：${safeText(modelError).slice(0, 160)}`
              : '出生编译使用确定性后备，保留原始祝愿但未完成深度模型预演。',
          );
        }
        const child = commitBirth(w, pending, compiled, pending.registrationEventId ?? c.id, emit);
        results.push({
          id: c.id,
          ok: true,
          value: {
            birthId: pending.id,
            personId: child.id,
            source: compiled.program.source,
            fallback: usedFallback,
            modelError,
            ability: w.runtime?.lifePrograms[child.id]?.abilityDefinitionKey,
          },
        });
      } else if (c.kind === 'rule_proposal') {
        const authorRequest = c.jobId
          ? w.runtime?.authorRequests.find((item) => item.jobId === c.jobId)
          : undefined;
        if (authorRequest?.status === 'used')
          throw new Error('该事件创作任务已经被更早的提案解决，迟到结果不会改写历史');
        let compiled: ReturnType<typeof compileRule>;
        try {
          compiled = compileRule(c.proposal, w, {
            source: c.source,
            requireFeasible: false,
          });
        } catch (error) {
          emit(
            'rule_definition_rejected',
            [],
            undefined,
            '一条动态规则未通过自动编译，未进入世界。拒绝原因保留供修复。',
            {
              source: c.source,
              jobId: c.jobId,
              reason: safeText((error as Error).message).slice(0, 300),
              classification: 'rule-rejection',
            },
            [],
            0.35,
          );
          throw error;
        }
        const key = definitionKey(compiled.definition);
        const activation = emit(
          'rule_definition_activated',
          [],
          undefined,
          `规则「${compiled.definition.title}」通过自动编译并进入世界；历史实例将引用不可变版本。`,
          {
            definitionId: compiled.definition.id,
            definitionVersion: compiled.definition.version,
            definitionKey: key,
            kind: compiled.definition.kind,
            source: c.source,
            dryRun: {
              ok: compiled.dryRun.ok,
              units: compiled.dryRun.units,
              candidates: compiled.dryRun.candidates,
              reason: compiled.dryRun.reason,
            },
            provenance: compiled.definition.provenance,
            classification: 'rule-publish',
          },
          authorRequest?.causeIds ?? [],
          0.7,
        );
        const installed = installDefinition(w, compiled.definition, activation.id);
        if (c.jobId) {
          const request = w.runtime?.authorRequests.find((item) => item.jobId === c.jobId);
          if (request) request.status = 'used';
        }
        if (!installed.created) activation.data.idempotent = true;
        results.push({
          id: c.id,
          ok: true,
          value: {
            definitionId: compiled.definition.id,
            definitionVersion: compiled.definition.version,
            definitionKey: key,
            created: installed.created,
            dryRun: compiled.dryRun,
          },
        });
      } else if (c.kind === 'director_action') {
        const request = c.jobId
          ? w.runtime?.authorRequests.find((item) => item.jobId === c.jobId)
          : undefined;
        if (request?.status === 'used')
          throw new Error('该导演任务已经被更早的提案解决，迟到结果不会改写历史');
        let compiled: ReturnType<typeof compileDirectorProposal>;
        try {
          compiled = compileDirectorProposal(c.proposal, w, c.id);
        } catch (error) {
          emit(
            'director_proposal_rejected',
            [],
            undefined,
            '历史导演提案未通过规则预算或权限检查，未改写世界。',
            {
              jobId: c.jobId,
              reason: safeText((error as Error).message).slice(0, 300),
              classification: 'director-rejection',
            },
            [],
            0.35,
          );
          throw error;
        }
        const applied = applyDirectorProposal(w, compiled, request?.causeIds ?? [], emit);
        if (request) request.status = 'used';
        results.push({
          id: c.id,
          ok: true,
          value: {
            action: compiled.proposal.action,
            eventId: applied.event.id,
            definitionKey: applied.definition
              ? `${applied.definition.id}@${applied.definition.version}`
              : undefined,
          },
        });
      } else if (c.kind === 'close') {
        w.status = 'archived';
        w.terminalReason = 'operator';
        emit('world_ending', [], undefined, '本纪元由运营者归档。', { reason: 'operator' }, [], 1);
        results.push({ id: c.id, ok: true });
      } else {
        const { proposal: p, actor } = validateProposal(w, c.proposal);
        const s = settlementIndex.get(actor.locationId)!;
        if (p.action === 'move') {
          actor.coin -= 3;
          s.coin += 3;
          actor.plans.push({
            id: `plan-${p.jobId}`,
            kind: 'migrate',
            step: 0,
            targetId: p.targetId!,
            reserved: 3,
            deadline: w.month + 3,
            status: 'active',
            causeIds: [],
          });
          emit('journey_started', [actor.id], s.id, `${actor.name}准备启程前往邻近的城镇。`, {
            targetId: p.targetId,
          });
        }
        if (p.action === 'research') {
          actor.plans.push({
            id: `plan-${p.jobId}`,
            kind: 'research',
            step: 0,
            targetId: s.id,
            reserved: 0,
            deadline: w.month + 18,
            status: 'active',
            causeIds: [],
          });
          emit('research_started', [actor.id], s.id, `${actor.name}开始试验改良生产方法。`);
        }
        if (p.action === 'found') {
          const d = compileDefinition(p.definition);
          const orgId = `org-${p.jobId}`;
          actor.coin -= 12;
          w.organizations.push({
            id: orgId,
            name: d.name,
            kind: d.kind,
            locationId: s.id,
            creatorId: actor.id,
            leaderId: actor.id,
            memberIds: [actor.id],
            treasury: 12,
            founded: w.month,
            status: 'active',
            definition: d,
            progress: 0,
            insolventMonths: 0,
            adoption: 0,
            causeIds: [],
          });
          const e = emit(
            'institution_founded',
            [actor.id],
            s.id,
            `${actor.name}发起了「${d.name}」，规则将影响此后的生活。`,
            { organizationId: orgId, definition: d },
            [],
            0.9,
          );
          w.organizations.at(-1)!.causeIds = [e.id];
        }
        if (p.action === 'publish') {
          const claimId = `claim-${p.jobId}`;
          const policy = p.policy ?? {
            version: 1 as const,
            kind: 'cooperate' as const,
            strength: 0.05,
            ttlMonths: 24,
          };
          actor.coin -= 2;
          s.coin += 2;
          const e = emit(
            'idea_published',
            [actor.id],
            s.id,
            `${actor.name}提出了${policy.kind === 'cooperate' ? '互助合作' : policy.kind === 'seek_knowledge' ? '勤学精进' : '避险迁居'}的主张。`,
            { claimId },
          );
          w.claims.push({
            id: claimId,
            subjectId: actor.id,
            predicate: policy.kind,
            truth: 'unknown',
            sourceIds: [e.id],
          });
          actor.beliefs.push({ claimId, confidence: 0.8, sourceIds: [e.id] });
          actor.policy = { ...policy, adoptedAt: w.month, causeIds: [e.id] };
        }
        actor.version++;
        w.processedJobs.push(p.jobId);
        results.push({ id: c.id, ok: true });
      }
    } catch (err) {
      if (c.kind === 'agenda') {
        const parsed = AgendaProposalSchema.safeParse(c.proposal);
        const actor = parsed.success ? personIndex.get(parsed.data.actorId) : undefined;
        if (
          actor &&
          actor.death === undefined &&
          w.agency?.agendas[actor.id]?.status !== 'active'
        ) {
          const rejected = emit(
            'agenda_needs_revision',
            [actor.id],
            actor.locationId,
            `${actor.name}原先考虑的安排缺少可行条件，需要重新考虑。`,
            { reason: safeText((err as Error).message) },
            actor.memories.slice(-2).map((m) => m.eventId),
            0.7,
          );
          requestReplan(w, actor, `执行框架拒绝原计划：${safeText((err as Error).message)}`, [
            rejected.id,
          ]);
        }
      }
      results.push({ id: c.id, ok: false, error: (err as Error).message });
    }
    w.appliedCommands.push(c.id);
  }
  if (!tick || w.status === 'archived') return { world: w, events, results };
  const migratedRouteIds = migrateEarthLandRouteModes(w);
  if (migratedRouteIds) {
    const migration = emit(
      'earth_land_route_modes_migrated',
      [],
      undefined,
      `地球陆地邻国旧交通路线模式已按地理边界校正（${migratedRouteIds.length}条）。`,
      { migration: 'earth-land-route-modes', version: 1, changedRouteIds: migratedRouteIds },
    );
    w.migrations ??= {};
    w.migrations.earthLandRouteModes = { version: 1, eventId: migration.id, month: w.month };
  }
  const r = (id: string, key: string) => random(w.seed, w.month, id, key);
  let alive = w.persons.filter((p) => p.death === undefined);
  const locals = new Map<string, Person[]>();
  for (const s of w.settlements) locals.set(s.id, []);
  for (const p of alive) locals.get(p.locationId)!.push(p);
  if (w.calendar) {
    if (w.parameters.openHistory === undefined) w.parameters.openHistory = true;
    initializeGeopolitics(w, emit);
  }
  advanceEarthEvents(w, emit);
  enforceDependentDiplomacy(w, emit);
  advanceCrises(w, emit, events);
  if (w.calendar) {
    advanceWorldlines(w, emit, locals);
    applyWorldlineEffects(w, emit);
    for (const p of w.persons) personIndex.set(p.id, p);
    alive = w.persons.filter((p) => p.death === undefined);
    for (const list of locals.values()) list.length = 0;
    for (const p of alive) locals.get(p.locationId)!.push(p);
    advanceIndustry(w, emit, events);
    advanceGeopolitics(w, emit, locals);
    synchronizeHistoricalConflicts(w);
    applyGeopoliticalEffects(w, emit);
    applyIndustrialLabor(w);
    applyLaborDisruption(w);
  }
  advanceTravel(w, emit);
  for (const list of locals.values()) list.length = 0;
  for (const p of alive) if (!p.journey && !isDetained(w, p)) locals.get(p.locationId)!.push(p);
  runWorldSystems(w, locals, emit, events);
  const historicalHazards = new Map<string, NonNullable<World['shocks']>>();
  for (const q of w.shocks ?? [])
    if (
      q.ends > w.month &&
      !q.actualConflictIds?.length &&
      ['war', 'attack', 'earthquake', 'flood', 'displacement'].includes(q.kind)
    )
      for (const id of q.locationIds) {
        const list = historicalHazards.get(id) ?? [];
        list.push(q);
        historicalHazards.set(id, list);
      }

  const casualtyByPerson = new Map<
    string,
    NonNullable<World['geopolitics']>['pendingCasualties']
  >();
  for (const risk of w.geopolitics?.pendingCasualties ?? []) {
    const list = casualtyByPerson.get(risk.personId) ?? [];
    list.push(risk);
    casualtyByPerson.set(risk.personId, list);
  }
  const die = (p: Person, reason: string, causes: string[]) => {
    p.death = w.month;
    p.deathCause = reason;
    p.health = 0;
    delete p.journey;
    w.audit.deaths++;
    for (const plan of p.plans) if (plan.status === 'active') plan.status = 'failed';
    for (const g of p.goals)
      if (g.status === 'active') {
        g.status = 'abandoned';
        g.reason = 'death';
      }
    for (const cm of p.commitments) cm.status = 'closed';
    const heirs = p.relationships
      .filter((rel) => rel.kind === 'kin' || rel.kind === 'partner')
      .map((rel) => find(rel.personId))
      .filter((q) => q && q.death === undefined);
    const s = settlementIndex.get(p.locationId)!;
    if (heirs.length) heirs[0].coin += p.coin;
    else s.coin += p.coin;
    p.coin = 0;
    const e = emit(
      'death',
      [p.id, ...heirs.map((q) => q.id)],
      p.locationId,
      `${p.name}因${reason}离世，终年${Math.floor((w.month - p.birth) / 12)}岁。`,
      { reason, age: Math.floor((w.month - p.birth) / 12), roles: { deceased: p.id } },
      causes,
      1,
    );
    for (const rel of p.relationships) {
      const q = find(rel.personId);
      if (q && q.death === undefined) {
        if (rel.kind === 'acquaintance' || rel.kind === 'rival') {
          remember(q, e, 0.25);
          continue;
        }
        reconsider(q, e, 'belong');
        emit(
          'bereavement',
          [q.id, p.id],
          q.locationId,
          `${p.name}的离去让${q.name}重新思考自己的生活。`,
          { roles: { deceased: p.id, bereaved: q.id } },
          [e.id],
          0.9,
        );
      }
    }
    const runtime = ensureRuntime(w);
    const program = runtime.lifePrograms[p.id];
    if (program) {
      runtime.deathSummaries ??= {};
      runtime.deathSummaries[p.id] = {
        personId: p.id,
        birthMonth: p.birth,
        deathMonth: w.month,
        reason,
        lifeProgramId: program.id,
        wish: program.wish,
        source: program.source,
        milestones: [...(program.milestones ?? [])],
        eventIds: [...new Set([...p.memories.slice(-24).map((memory) => memory.eventId), e.id])],
        structured: `${p.name}生于第${p.birth}月，卒于第${w.month}月，死因：${reason}。出生愿望：「${program.wish}」。记录到的生命阶段：${(program.milestones ?? []).join('、') || '未到达公开里程碑'}。这份总结只引用已提交事件，不把隐藏预演当作已经发生。`,
      };
    }
  };
  for (const p of alive) {
    const s = settlementIndex.get(p.locationId)!;
    const age = (w.month - p.birth) / 12;
    if (w.parameters.lifeComplexity && Number.isInteger(age))
      emit(
        'birthday',
        [p.id],
        s.id,
        `${p.name}迎来了${age}岁生日。`,
        { age },
        [],
        age % 10 === 0 ? 0.5 : 0.2,
      );
    const war = w.conflicts.find((c) => c.status === 'active' && c.locationId === s.id);
    const causes = (locationEvents.get(s.id) ?? [])
      .filter((e) => e.kind === 'scarcity' || e.kind === 'war_started')
      .map((e) => e.id);
    advanceLife(w, p, emit, { persons: personIndex, settlements: settlementIndex });
    p.version++;
    if (p.policy && w.month > p.policy.adoptedAt + p.policy.ttlMonths) delete p.policy;
    p.stress = clamp(p.stress * 0.94 + s.scarcity * 0.13 + (war ? 0.05 : 0));
    p.health = clamp(p.health + 0.005 - s.scarcity * 0.07 - (war ? 0.01 : 0));
    const childLaborer =
      age >= 10 &&
      age < 18 &&
      !!p.life?.career.employed &&
      p.occupation !== '孩童' &&
      p.occupation !== '受抚养者';
    const wage = Math.min(
      s.coin,
      (age >= 18 && !p.journey && !isDetained(w, p)) ||
        (childLaborer && !p.journey && !isDetained(w, p))
        ? lifeWage(p, s.prosperity) * laborWageFactor(w, p.id) * (age >= 18 ? 1 : 0.45)
        : 0,
    );
    s.coin -= wage;
    p.coin += wage;
    const costs = isDetained(w, p) ? 0 : Math.min(p.coin, 0.25 * s.price);
    p.coin -= costs;
    s.coin += costs;
    const geopoliticalExposure = casualtyByPerson.get(p.id) ?? [];
    const coerciveRisk = geopoliticalExposure.reduce((n, x) => n + x.monthlyRisk, 0);
    if (coerciveRisk > 0 && r(p.id, 'political-mortality') < Math.min(0.5, coerciveRisk)) {
      die(
        p,
        geopoliticalExposure.some((x) => x.kind === 'persecution') ? '政治迫害' : '战争中的伤亡',
        [...new Set(geopoliticalExposure.flatMap((x) => x.causeIds))],
      );
      continue;
    }
    const mortality =
      0.00012 +
      Math.pow(Math.max(0, age - 40) / 60, 4) * 0.018 +
      s.scarcity * 0.008 +
      (war ? 0.002 : 0) +
      (1 - p.health) * 0.001 +
      (p.life?.illness?.severity ?? 0) * 0.001;
    const dangers = historicalHazards.get(s.id) ?? [];
    const historicalRisk = dangers.reduce(
      (n, q) => n + q.severity * (q.kind === 'war' ? 0.0015 : q.kind === 'attack' ? 0.005 : 0.0008),
      0,
    );
    if (dangers.length && r(p.id, 'historical-mortality') < historicalRisk) {
      const q = dangers[0];
      if (q.stats) q.stats.casualties++;
      die(p, `历史事件：${q.title ?? q.id}`, [
        q.causeId,
        ...(p.life?.history?.filter((h) => h.sourceId === q.id).map((h) => h.causeId) ?? []),
      ]);
      continue;
    }
    if (r(p.id, 'mortality') < mortality) {
      die(
        p,
        s.scarcity > 0.3 ? '饥病' : war ? '战乱' : age > 65 ? '衰老' : '疾病',
        causes.length ? causes : (war?.causeIds ?? []),
      );
      continue;
    }
    if (p.stress > 0.6 && !p.goals.some((g) => g.kind === 'survive' && g.status === 'active')) {
      const e = emit(
        'conviction_changed',
        [p.id],
        s.id,
        `困顿的生活让${p.name}放下旧有打算，先寻求安稳的生计。`,
        { previous: p.values.tradition },
        causes,
        0.9,
      );
      reconsider(p, e, 'survive');
    }
    for (const plan of p.plans.filter((a) => a.status === 'active')) {
      if (isDetained(w, p)) continue;
      if (p.journey && plan.kind !== 'migrate') continue;
      plan.step++;
      if (w.month > plan.deadline) {
        plan.status = 'failed';
        emit(
          'plan_failed',
          [p.id],
          s.id,
          `${p.name}的计划未能如期完成。`,
          { planId: plan.id },
          plan.causeIds,
          0.5,
        );
        continue;
      }
      if (plan.kind === 'migrate' && plan.step >= 2 && !w.calendar) {
        const target = settlementIndex.get(plan.targetId);
        if (target && s.neighbors.includes(target.id)) {
          p.locationId = target.id;
          plan.status = 'complete';
          p.stress = clamp(p.stress - 0.15);
          emit(
            'migration',
            [p.id],
            target.id,
            `${p.name}离开${s.name}，在${target.name}重新落脚。`,
            { from: s.id, to: target.id },
            plan.causeIds,
            0.8,
          );
        } else plan.status = 'failed';
      }
      if (plan.kind === 'research' && plan.step >= 6) {
        plan.status = 'complete';
        const previousKnowledge = s.knowledge,
          previousCraft = p.skills.craft;
        s.knowledge = clamp(
          s.knowledge + 0.015 * p.skills.learning * (w.parameters?.researchRate ?? 1),
        );
        p.skills.craft = clamp(p.skills.craft + 0.05);
        const gain = s.knowledge - previousKnowledge,
          improved = gain > 0 || p.skills.craft > previousCraft;
        const e = emit(
          improved ? 'innovation' : 'research_saturated',
          [p.id],
          s.id,
          improved ? `${p.name}通过反复试验改良了手艺。` : `${p.name}的试验暂未带来新的实用改进。`,
          {
            knowledge: s.knowledge,
            knowledgeGain: gain,
            craftGain: p.skills.craft - previousCraft,
          },
          plan.causeIds,
          0.7,
        );
        if (gain > 0) {
          (w.knowledgeEvidence ??= []).push(e.id);
          (w.discoveries ??= []).push({
            id: `discovery-${e.id}`,
            name: `${p.name}的工序改良`,
            creatorId: p.id,
            locationId: s.id,
            createdAt: w.month,
            mechanism: 'production_improvement',
            gain,
            causeIds: [e.id],
          });
        }
        const g = p.goals.find((g) => g.status === 'active' && g.kind === 'learn');
        if (g) {
          g.progress = 1;
          g.status = improved ? 'fulfilled' : 'abandoned';
          if (!improved) g.reason = 'supported_knowledge_limit';
          appendCauseId(g.causeIds, e.id);
        }
      }
    }
    if (
      s.scarcity > 0.15 - (p.policy?.kind === 'avoid_scarcity' ? p.policy.strength : 0) &&
      !p.plans.some((a) => a.status === 'active') &&
      p.coin >= 3
    ) {
      const target = w.settlements
        .filter((t) => s.neighbors.includes(t.id))
        .sort((a, b) => a.scarcity - b.scarcity || b.food - a.food)[0];
      if (target && target.scarcity < s.scarcity) {
        p.coin -= 3;
        s.coin += 3;
        p.plans.push({
          id: `plan-${p.id}-${w.month}`,
          kind: 'migrate',
          step: 0,
          targetId: target.id,
          reserved: 3,
          deadline: w.month + 4,
          status: 'active',
          causeIds: causes,
        });
      }
    }
    if (w.month % 12 === 0) {
      p.skills.learning = clamp(p.skills.learning + 0.004 + s.knowledge * 0.005);
      const e = emit(
        'quiet_life',
        [p.id],
        p.locationId,
        p.journey
          ? `${p.name}此刻仍在前往新居所的旅途上。`
          : isDetained(w, p)
            ? `${p.name}被限制自由，原有工作与安排中断。`
            : age < 18
              ? `${p.name}仍在成长，继续适龄学习和日常生活。`
              : p.life?.career.employed === false
                ? `${p.name}目前没有稳定岗位。${p.stress > 0.5 ? '生计压力尚未散去。' : '眼下仍在安排日常生活。'}`
                : `${p.name}目前以${p.occupation}工作。${p.stress > 0.5 ? '生活的压力尚未散去。' : '日子在劳作与来往中继续。'}`,
        { age: Math.floor(age), occupation: p.occupation },
        [],
        0.2,
      );
      for (const g of p.goals.filter((g) => g.status === 'active'))
        g.progress = clamp(g.progress + 0.02 * (1 - p.stress));
      if (
        !w.calendar &&
        p.skills.learning > 0.65 &&
        !p.plans.some((a) => a.status === 'active') &&
        r(p.id, 'research') < 0.15 + (p.policy?.kind === 'seek_knowledge' ? p.policy.strength : 0)
      )
        p.plans.push({
          id: `plan-research-${p.id}-${w.month}`,
          kind: 'research',
          step: 0,
          targetId: p.locationId,
          reserved: 0,
          deadline: w.month + 12,
          status: 'active',
          causeIds: [e.id],
        });
    }
  }
  if (w.calendar) {
    for (const list of locals.values()) list.length = 0;
    for (const p of w.persons)
      if (p.death === undefined && !p.journey && !isDetained(w, p))
        locals.get(p.locationId)!.push(p);
    advanceSociety(w, emit, locals);
    applySocietyToLife(w, locals);
    advanceAgency(w, emit);
  }
  // Local reciprocal contact; owner metadata is never consulted.
  for (const people of locals.values()) people.length = 0;
  for (const p of w.persons)
    if (p.death === undefined && !p.journey && !isDetained(w, p)) locals.get(p.locationId)!.push(p);
  for (const s of w.settlements) {
    const people = locals.get(s.id)!;
    for (const p of people) {
      if (
        people.length < 2 ||
        r(p.id, 'contact') >
          (p.life?.personality ? 0.12 + p.life.personality.extraversion * 0.3 : 0.28) +
            (p.policy?.kind === 'cooperate' ? p.policy.strength : 0)
      )
        continue;
      const familiar = p.relationships
        .filter((rel) => rel.kind !== 'kin')
        .sort((a, b) => b.trust - a.trust)
        .slice(0, 2)
        .map((rel) => find(rel.personId))
        .filter((q) => q && q.death === undefined && q.locationId === s.id);
      const contacts = familiar.length && r(p.id, 'familiar') < 0.7 ? familiar : people;
      const q = contacts[Math.floor(r(p.id, 'partner') * contacts.length)];
      if (q.id === p.id || q.death !== undefined) continue;
      let rel = p.relationships.find((a) => a.personId === q.id);
      if (!rel) {
        rel = { personId: q.id, trust: 0.2, attachment: 0.1, kind: 'acquaintance', since: w.month };
        p.relationships.push(rel);
        q.relationships.push({
          personId: p.id,
          trust: 0.2,
          attachment: 0.1,
          kind: 'acquaintance',
          since: w.month,
        });
        const e = emit(
          'encounter',
          [p.id, q.id],
          s.id,
          `${p.name}与${q.name}在${s.name}的日常往来中相识。`,
          {},
          [],
          0.5,
        );
        rel.causeIds = [e.id];
        rel.contacts = 1;
        const reciprocal = q.relationships.find((a) => a.personId === p.id);
        if (reciprocal) {
          reciprocal.causeIds = [e.id];
          reciprocal.contacts = 1;
        }
        if (p.goals.some((g) => g.kind === 'belong' && g.status === 'active'))
          appendCauseId(
            p.goals.find((g) => g.kind === 'belong' && g.status === 'active')!.causeIds,
            e.id,
          );
      } else {
        const reciprocal = q.relationships.find((a) => a.personId === p.id);
        rel.contacts = (rel.contacts ?? 1) + 1;
        const change = (p.values.care + q.values.care - 0.6) * 0.08;
        rel.trust = clamp(rel.trust + change, -1, 1);
        rel.attachment = clamp(rel.attachment + 0.03);
        if (reciprocal) {
          reciprocal.trust = rel.trust;
          reciprocal.attachment = rel.attachment;
        }
        if (rel.trust > 0.6 && rel.kind === 'acquaintance') {
          rel.kind = 'friend';
          if (reciprocal) reciprocal.kind = 'friend';
          const friendship = emit(
            'friendship',
            [p.id, q.id],
            s.id,
            `长久的来往让${p.name}与${q.name}成为朋友。`,
            {},
            rel.causeIds ?? [],
            0.7,
          );
          rel.causeIds ??= [];
          appendCauseId(rel.causeIds, friendship.id);
          if (reciprocal) reciprocal.causeIds = rel.causeIds;
        }
        if (
          w.month - p.birth >= 216 &&
          w.month - q.birth >= 216 &&
          rel.trust > 0.8 &&
          rel.attachment > 0.7 &&
          rel.kind === 'friend' &&
          !p.relationships.some((a) => a.kind === 'partner') &&
          !q.relationships.some((a) => a.kind === 'partner')
        ) {
          rel.kind = 'partner';
          if (reciprocal) reciprocal.kind = 'partner';
          p.householdId = q.householdId;
          emit(
            'partnership',
            [p.id, q.id],
            s.id,
            `${p.name}与${q.name}决定共同生活。`,
            { contacts: rel.contacts },
            rel.causeIds ?? [],
            0.9,
          );
        }
      }
      if (p.policy && !q.policy && q.values.care > 0.45 && r(q.id, `adopt-${p.id}`) < 0.03) {
        const e = emit(
          'norm_adopted',
          [q.id, p.id],
          s.id,
          `${q.name}受到${p.name}的影响，开始尝试一种新的处世方式。`,
          { policyKind: p.policy.kind },
          p.policy.causeIds,
          0.7,
        );
        q.policy = { ...p.policy, adoptedAt: w.month, causeIds: [e.id] };
      }
      for (const belief of p.beliefs.slice(-3)) {
        if (!q.beliefs.some((b) => b.claimId === belief.claimId) && q.beliefs.length < 24)
          q.beliefs.push({ ...belief, confidence: belief.confidence * 0.8 });
      }
    }
  }
  // Named births instantiate real kinship; cohort children are debited, preserving population.
  if (w.month % 12 === 0) {
    for (const p of w.persons.filter(
      (p) =>
        p.death === undefined && (w.month - p.birth) / 12 >= 20 && (w.month - p.birth) / 12 < 42,
    )) {
      const rel = p.relationships.find((a) => a.kind === 'partner');
      if (!rel || p.id > rel.personId || r(p.id, 'birth') > 0.08) continue;
      const q = find(rel.personId),
        s = settlementIndex.get(p.locationId)!;
      if (
        !q ||
        q.death !== undefined ||
        p.journey ||
        q.journey ||
        isDetained(w, p) ||
        isDetained(w, q) ||
        q.locationId !== p.locationId ||
        s.cohort.children < 1 ||
        s.scarcity > 0.2
      )
        continue;
      s.cohort.children--;
      const child = newPerson(w, `child-${p.id}-${w.month}`, s.id, w.persons.length, 0);
      child.parents = [p.id, q.id];
      child.householdId = p.householdId;
      child.coin = 0;
      child.occupation = '孩童';
      for (const par of [p, q]) {
        par.relationships.push({
          personId: child.id,
          kind: 'kin',
          trust: 0.8,
          attachment: 0.9,
          since: w.month,
        });
        child.relationships.push({
          personId: par.id,
          kind: 'kin',
          trust: 0.8,
          attachment: 0.9,
          since: w.month,
        });
      }
      w.persons.push(child);
      personIndex.set(child.id, child);
      emit(
        'birth',
        [p.id, q.id, child.id],
        s.id,
        `${p.name}与${q.name}迎来了孩子${child.name}。`,
        { childId: child.id },
        [],
        0.9,
      );
    }
  }
  for (const p of w.persons.filter(
    (p) => p.death === undefined && p.occupation === '孩童' && w.month - p.birth >= 216,
  )) {
    p.occupation = '学徒';
    emit('adulthood', [p.id], p.locationId, `${p.name}成年，开始独立谋生。`);
  }
  if (w.calendar) advancePolitics(w, emit, locals);
  for (const polity of w.polities) {
    const leader = find(polity.leaderId);
    if ((!leader || leader.death !== undefined) && !w.calendar) {
      const candidates = w.persons
        .filter(
          (p) =>
            p.death === undefined &&
            settlementIndex.get(p.locationId)?.polityId === polity.id &&
            w.month - p.birth >= 216,
        )
        .sort((a, b) => b.values.ambition - a.values.ambition);
      if (candidates.length) {
        polity.leaderId = candidates[0].id;
        candidates[0].title = w.calendar ? '地方代表（模拟）' : '议事长';
        emit(
          'political_succession',
          [candidates[0].id],
          candidates[0].locationId,
          w.calendar
            ? `${candidates[0].name}成为${polity.name}模拟地方议事机构的新代表。`
            : `${candidates[0].name}接任${polity.name}的议事长。`,
          { polityId: polity.id },
          leader?.memories
            .filter((m) => m.salience === 1)
            .slice(-1)
            .map((m) => m.eventId) ?? [],
          0.9,
        );
      }
    }
    if (polity.legitimacy < 0.35 && polity.tax > 0.05) {
      polity.tax -= 0.002;
      polity.legitimacy += 0.015;
      emit(
        'reform',
        [polity.leaderId],
        find(polity.leaderId)?.locationId,
        `${polity.name}因民生压力减轻征税。`,
        { tax: polity.tax },
        [],
        0.7,
      );
    }
    polity.military = Math.min(60, polity.military + 0.2);
  }
  // Promote cohort residents into persistent identities without adding population.
  const deficit = 1000 - w.persons.filter((p) => p.death === undefined).length;
  for (let i = 0; i < Math.min(4, deficit); i++) {
    const candidates = w.settlements.filter((s) => s.cohort.adults > 0);
    if (!candidates.length) break;
    const s = candidates[Math.floor(r('promotion', String(i)) * candidates.length)];
    s.cohort.adults--;
    const p = newPerson(
      w,
      `resident-${w.month}-${i}`,
      s.id,
      w.persons.length,
      18 + Math.floor(r(s.id, `age-${i}`) * 20),
    );
    p.coin = Math.min(p.coin, s.coin);
    s.coin -= p.coin;
    w.persons.push(p);
    personIndex.set(p.id, p);
    emit(
      'arrival',
      [p.id],
      s.id,
      `${p.name}的生活开始在此地的记录中留下痕迹。`,
      { originCohortId: s.cohort.id },
      [],
      0.3,
    );
  }
  if (w.calendar) {
    const priorCustody = new Set(Object.keys(w.coercion?.custody ?? {}));
    advanceMovements(w, emit, locals, events);
    advancePoliticalOutcomes(w, emit);
    advanceCoercion(w, emit, locals, events);
    for (const id of Object.keys(w.coercion?.custody ?? {}))
      if (!priorCustody.has(id)) {
        const p = personIndex.get(id);
        if (p) {
          for (const plan of p.plans) if (plan.status === 'active') plan.status = 'failed';
          if (p.life) p.life.career.employed = false;
        }
        for (const project of Object.values(w.agency?.projects ?? {}))
          if (project.creatorId === id && project.status === 'active') project.status = 'failed';
      }
    for (const list of locals.values())
      for (let i = list.length - 1; i >= 0; i--) if (isDetained(w, list[i])) list.splice(i, 1);
    advanceIdentity(w, emit, locals, events);
    advanceStateEvolution(w, emit, events);
  }
  // A birth must not block the shared clock. If a model compile has not arrived
  // by its deadline, the simulator commits an honest deterministic fallback.
  expirePendingBirths(w, emit);
  advanceLifePrograms(w, emit);
  // v3 rule runtime runs after existing systems so its occurrences are linked to
  // the month's real events. Effects call the same person/settlement/polity
  // state and are bounded by the definition's gas, caps and cooldowns.
  advanceRules(w, emit, events);
  // The observer only proposes authoring tasks; it never edits history.
  observeWorld(w, events);
  observeDirector(w, events);
  // Canonical ledger retains all events; active cognition retains a bounded salient working set.
  for (const p of w.persons) {
    if (p.death !== undefined && p.death !== w.month) continue;
    if (p.memories.length > 32)
      p.memories = p.memories
        .slice()
        .sort((a, b) => b.salience - a.salience || b.month - a.month)
        .slice(0, 32)
        .sort((a, b) => a.month - b.month);
    if (p.death !== undefined) {
      p.memories = p.memories.filter((m) => m.salience >= 0.7).slice(-32);
    }
  }
  if (w.geopolitics) w.geopolitics.pendingCasualties = [];
  assertIndustrialLedger(w);
  const total = population(w);
  w.collapseMonths = total < w.baselinePopulation * 0.2 ? w.collapseMonths + 1 : 0;
  if (w.collapseMonths >= 12 && w.terminalEvidence.length) {
    w.status = 'archived';
    w.terminalReason = 'civilization_collapse';
  } else if (w.settlements.every((s) => s.knowledge >= 0.98) && w.month > 120) {
    w.status = 'archived';
    w.terminalReason = 'transformation';
  } else if (w.month >= w.maxYears * 12) {
    w.status = 'archived';
    w.terminalReason = 'horizon';
  }
  if (w.status === 'archived')
    emit(
      'world_ending',
      [],
      undefined,
      w.terminalReason === 'horizon'
        ? '本纪元达到运营年限，历史已归档。这不是一场灾难。'
        : w.terminalReason === 'civilization_collapse'
          ? '持续的人口崩溃使旧文明走向终结。'
          : '遍及各地的知识变革开启了另一种文明。',
      { reason: w.terminalReason, population: total },
      w.terminalReason === 'transformation'
        ? (w.knowledgeEvidence ?? []).slice(-36)
        : w.terminalReason === 'civilization_collapse'
          ? w.terminalEvidence.slice(-12)
          : [],
      1,
    );
  assertWorld(w);
  return { world: w, events, results };
}
export function assertWorld(w: World) {
  const ids = new Set<string>();
  const locations = new Set(w.settlements.map((s) => s.id)),
    polities = new Set(w.polities.map((p) => p.id));
  if (locations.size !== w.settlements.length) throw new Error('Duplicate settlement identity');
  for (const p of w.persons) {
    if (ids.has(p.id)) throw new Error('Duplicate person');
    ids.add(p.id);
    if (
      !locations.has(p.locationId) ||
      !Number.isFinite(p.coin) ||
      p.coin < -1e-6 ||
      p.birth > w.month
    )
      throw new Error(`Invalid person ${p.id}`);
    if (p.death !== undefined && p.plans.some((a) => a.status === 'active'))
      throw new Error('Dead person has active plan');
  }
  for (const s of w.settlements) {
    if (
      s.food < -1e-6 ||
      s.coin < -1e-6 ||
      Object.values(s.cohort).some((v) => typeof v === 'number' && v < 0)
    )
      throw new Error('Negative settlement stock');
    if (!polities.has(s.polityId)) throw new Error('Invalid sovereignty');
  }
  for (const o of w.organizations) {
    if (o.memberIds.some((id) => !ids.has(id))) throw new Error('Unknown member');
  }
  const owners = w.persons.filter((p) => p.ownerId && p.death === undefined).map((p) => p.ownerId);
  if (new Set(owners).size !== owners.length) throw new Error('Multiple living subjects');
  assertRuleState(w);
}
