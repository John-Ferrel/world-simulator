import { historicalWarPressure } from './pressure.js';
import { historicalDisposition } from '../../worldlines/index.js';
import geography from './geography.json' with { type: 'json' };
import { clamp, type World } from '../../contracts/index.js';
import type { Emit } from '../../simulation-core/index.js';
import { random } from '../../simulation-core/random.js';
import { distance } from './geography.js';
import { history, historyMonth, harmful } from './history.js';
import { initializeLife } from '../../cognition/life.js';
const geographicCountry = new Map(geography.cities.map((c) => [c.id, c.countryId]));
const title = (q: NonNullable<World['shocks']>[number]) => q.title ?? q.id;
export function advanceEarthEvents(w: World, emit: Emit) {
  if (!w.pack.id.startsWith('earth-')) return;
  w.shocks ??= [];
  w.appliedSourceEvents ??= [];
  const startYear = w.calendar?.startYear ?? 1900;
  const locals = new Map<string, typeof w.persons>();
  for (const p of w.persons)
    if (p.death === undefined) {
      p.life ??= initializeLife(p, w);
      const list = locals.get(p.locationId) ?? [];
      list.push(p);
      locals.set(p.locationId, list);
    }
  for (const input of history) {
    const at = historyMonth(input.date, startYear);
    if (at < 0 || w.month < at || w.appliedSourceEvents.includes(input.id)) continue;
    w.appliedSourceEvents.push(input.id);
    const disposition = historicalDisposition(w, input);
    const peacefulSettlement =
      input.kind === 'war' &&
      input.countries.length > 0 &&
      input.countries.every((id) => {
        const gov = w.geopolitics?.governments[id],
          polity = w.polities.find((p) => p.id === id);
        return (
          gov &&
          polity &&
          polity.legitimacy > 0.85 &&
          gov.laws.pressFreedom > 0.65 &&
          gov.laws.labor > 0.55
        );
      });
    const duplicateEpisode =
      !!input.sourceDataset &&
      (w.shocks ?? []).some(
        (q) =>
          q.kind === 'war' &&
          q.ends > at &&
          q.started < at + input.duration &&
          !q.id.startsWith('ucdp-') &&
          input.countries.every((id) =>
            q.locationIds.some((sid) => geographicCountry.get(sid) === id),
          ),
      );
    if (disposition !== 'historical' || peacefulSettlement || duplicateEpisode) {
      const prior = (w.shocks ?? [])
        .filter((q) => q.kind === 'war')
        .slice(-3)
        .map((q) => q.causeId);
      emit(
        duplicateEpisode ? 'historical_reference' : 'history_diverged',
        [],
        undefined,
        duplicateEpisode
          ? `${input.title}的资料作为现有冲突的补充来源保留。`
          : `历史资料中的「${input.title}」在当前世界缺少相符前提，后续由实际行动继续演化。`,
        {
          sourceId: input.id,
          sourceUrl: input.url,
          historicalDate: input.date,
          classification: duplicateEpisode ? 'source-reference' : 'counterfactual-context',
          reason: peacefulSettlement
            ? 'political-settlement'
            : duplicateEpisode
              ? 'existing-process'
              : disposition,
        },
        prior,
        0.7,
      );
      continue;
    }
    const places = w.settlements.filter(
      (s) =>
        (!input.countries.length ||
          input.countries.includes(s.regionId ?? geographicCountry.get(s.id) ?? s.polityId)) &&
        (!input.center || distance(s as any, input.center) <= input.radiusKm!),
    );
    const ids = places.map((s) => s.id);
    const e = emit(
      'historical_source',
      [],
      undefined,
      `${w.parameters.openHistory && input.kind === 'war' ? '史料背景 · ' : ''}${input.precision === 'year' ? input.date.slice(0, 4) : input.date}：${input.title}。`,
      {
        sourceId: input.id,
        sourceUrl: input.url,
        historicalDate: input.date,
        precision: input.precision,
        classification:
          w.parameters.openHistory && input.kind === 'war'
            ? 'historical-reference'
            : 'historical-source',
        simulationEffects: true,
        affectedLocationIds: ids,
        sourceDataset: input.sourceDataset,
        sourceRecordId: input.sourceRecordId,
        participants: input.participants,
      },
      [],
      0.95,
    );
    const ends = input.endDate ? historyMonth(input.endDate, startYear) : at + input.duration;
    const q: NonNullable<World['shocks']>[number] = {
      id: input.id,
      title: input.title,
      sourceUrl: input.url,
      kind: input.kind,
      locationIds: ids,
      started: at,
      ends,
      severity: input.severity,
      causeId: e.id,
      stats: { casualties: 0, displaced: 0, relief: 0, consumedSupply: 0 },
    };
    if (input.kind === 'war' && w.parameters.openHistory) {
      q.historicalKind = 'war';
      q.kind = historicalWarPressure(
        w,
        { ...input, countries: [...new Set(places.map((s) => s.polityId))] },
        e.id,
        emit,
      );
      if (q.kind === 'crisis') q.title = `与${input.title}相关的政治危机`;
    }
    w.shocks.push(q);
    if (ends <= w.month) continue;
    for (const s of places) {
      if (input.kind === 'epidemic') s.disease = { prevalence: 0.0008, immune: 0, causeId: e.id };
      if (['earthquake', 'flood', 'attack'].includes(input.kind)) {
        const lost = s.food * input.severity * 0.16;
        s.food -= lost;
        w.audit.destroyedFood += lost;
        if (s.economy)
          s.economy.infrastructure = clamp(
            s.economy.infrastructure - input.severity * 0.35,
            0.1,
            1,
          );
      }
    }
  }
  const active = w.shocks.filter((q) => q.started <= w.month && q.ends > w.month),
    byLocation = new Map<string, typeof active>();
  for (const q of active)
    for (const id of q.locationIds) {
      const list = byLocation.get(id) ?? [];
      list.push(q);
      byLocation.set(id, list);
    }
  // New arrivals and late-created people encounter ongoing processes at their actual location.
  for (const p of w.persons) {
    if (p.death !== undefined) continue;
    const life = p.life;
    if (!life) continue;
    life.history ??= [];
    for (const exposure of life.history)
      exposure.status = (byLocation.get(p.locationId) ?? []).some((q) => q.id === exposure.sourceId)
        ? 'active'
        : 'past';
    for (const q of byLocation.get(p.locationId) ?? []) {
      if (life.history.some((h) => h.sourceId === q.id)) continue;
      const role = harmful(q.kind)
        ? p.occupation === '医护人员'
          ? 'caregiver'
          : p.occupation === '工程师'
            ? 'worker'
            : 'civilian'
        : 'worker';
      const e = emit(
        'world_impact',
        [p.id],
        p.locationId,
        `${p.name}在当地经历${title(q)}，${role === 'caregiver' ? '开始参与救护' : role === 'worker' ? '生活与工作受到时代变化影响' : '作为普通居民承受其影响'}。`,
        { sourceId: q.id, sourceUrl: q.sourceUrl, role, classification: 'simulated-consequence' },
        [q.causeId],
        0.8,
      );
      life.history.push({
        sourceId: q.id,
        causeId: e.id,
        role,
        since: w.month,
        contributions: 0,
        status: 'active',
      });
      if (harmful(q.kind)) p.stress = clamp(p.stress + q.severity * 0.1);
    }
    if (life.history.length > 64) life.history = life.history.slice(-64);
  }
  const locationIndex = new Map(w.settlements.map((s) => [s.id, s]));
  const polityById = new Map(w.polities.map((p) => [p.id, p]));
  for (const s of w.settlements) {
    if (!s.economy) continue;
    const effects = byLocation.get(s.id) ?? [],
      hazards = effects.filter((q) => harmful(q.kind));
    const pressure = Math.min(
      0.95,
      hazards.reduce(
        (n, q) =>
          n +
          q.severity * (q.kind === 'war' ? 1 : 1 - (w.month - q.started) / (q.ends - q.started)),
        0,
      ),
    );
    const war = hazards.filter(
        (q) => (q.kind === 'war' || q.kind === 'attack') && !q.actualConflictIds?.length,
      ),
      help = effects.filter((q) => !harmful(q.kind));
    if (s.disease) {
      const epidemic = effects.some((q) => q.kind === 'epidemic'),
        d = s.disease,
        health = s.economy.healthcare;
      const susceptible = Math.max(0, 1 - d.prevalence - d.immune),
        newly = Math.min(
          susceptible,
          (epidemic ? 1.35 - health * 0.2 : 0.2) * d.prevalence * susceptible,
        ),
        recovered = d.prevalence * (0.65 + health * 0.1);
      d.prevalence = clamp(d.prevalence + newly - recovered, 0, 0.35);
      d.immune = clamp(d.immune + recovered - 0.002 * d.immune, 0, 0.95);
    }
    s.economy.productionMultiplier = 1 - pressure * (war.length ? 0.35 : 0.15);
    s.economy.tradeMultiplier = 1 - pressure * 0.45;
    s.economy.unemployment = 0.05 + pressure * 0.25;
    s.economy.inflation = 0.02 + pressure * 0.18;
    s.unrest = clamp(s.unrest + pressure * 0.005 - help.length * 0.003);
    for (const q of help) {
      if (q.kind === 'innovation') {
        s.knowledge = clamp(s.knowledge + 0.0004 * q.severity);
        if (['penicillin-clinical', 'smallpox-eradication'].includes(q.id))
          s.economy.healthcare = clamp(s.economy.healthcare + 0.0003 * q.severity);
      }
      if (q.kind === 'reform')
        s.economy.education = clamp(s.economy.education + 0.0005 * q.severity);
    }
    // Sustained conflict consumes real supplies and removes cohort lives. No population is reset to historical totals.
    const n = s.cohort.children + s.cohort.adults + s.cohort.elders;
    for (const q of war) {
      q.stats ??= { casualties: 0, displaced: 0, relief: 0, consumedSupply: 0 };
      const lost = Math.min(s.food, n * 0.025 * q.severity);
      s.food -= lost;
      w.audit.destroyedFood += lost;
      q.stats.consumedSupply += lost;
      let deaths = Math.floor(n * 0.0005 * q.severity);
      const count = deaths;
      for (const k of ['adults', 'elders', 'children'] as const) {
        const take = Math.min(s.cohort[k], deaths);
        s.cohort[k] -= take;
        deaths -= take;
        w.audit.deaths += take;
      }
      q.stats.casualties += count - deaths;
      // War displacement transfers cohort residents to a safer connected region, preserving all lives.
      if (w.month % 3 === 0 && n > 100) {
        const target = s.neighbors
          .map((id) => locationIndex.get(id))
          .find(
            (t) =>
              t &&
              !(byLocation.get(t.id) ?? []).some((h) => h.kind === 'war' || h.kind === 'attack'),
          );
        if (target) {
          const moved = Math.min(s.cohort.adults, Math.floor(n * 0.001 * q.severity));
          s.cohort.adults -= moved;
          target.cohort.adults += moved;
          q.stats.displaced += moved;
        }
      }
    }
    const polity = polityById.get(s.polityId)!,
      cost = n * 0.001 * (1 + help.length);
    if (polity.treasury >= cost) {
      polity.treasury -= cost;
      s.coin += cost;
      s.economy.infrastructure = clamp(s.economy.infrastructure + 0.003, 0.1, 1);
    }
    for (const p of locals.get(s.id) ?? []) {
      if (!hazards.length) continue;
      const q = hazards[0],
        r = (k: string) => random(w.seed, w.month, p.id, q.id, k);
      if (
        (war.length || q.kind === 'displacement') &&
        p.coin >= 3 &&
        !p.plans.some((plan) => plan.status === 'active') &&
        r('evacuate') < pressure * 0.04
      ) {
        const target = s.neighbors
          .map((id) => locationIndex.get(id))
          .find(
            (t) =>
              t &&
              !(byLocation.get(t.id) ?? []).some((h) => h.kind === 'war' || h.kind === 'attack'),
          );
        if (target) {
          p.coin -= 3;
          s.coin += 3;
          const e = emit(
            'historical_evacuation',
            [p.id],
            s.id,
            `${p.name}为避开${title(q)}的危险，筹措旅费准备迁往${target.name}。`,
            {
              sourceId: q.id,
              sourceUrl: q.sourceUrl,
              targetId: target.id,
              cost: 3,
              classification: 'simulated-consequence',
            },
            [q.causeId],
            0.8,
          );
          p.plans.push({
            id: `evacuate-${e.id}`,
            kind: 'migrate',
            step: 0,
            targetId: target.id,
            reserved: 3,
            deadline: w.month + 8,
            status: 'active',
            causeIds: [e.id],
          });
          const exposure = p.life!.history?.find((h) => h.sourceId === q.id);
          if (exposure) exposure.role = 'displaced';
        }
      }
      if (war.length && r('injury') < pressure * 0.015) {
        p.life!.injury = '历史事件中的伤病';
        p.health = clamp(p.health - 0.12 - pressure * 0.15);
        emit(
          'historical_injury',
          [p.id],
          s.id,
          `${p.name}在${title(q)}期间受伤。`,
          { sourceId: q.id, sourceUrl: q.sourceUrl, classification: 'simulated-consequence' },
          [q.causeId],
          0.9,
        );
      }
      if (
        w.month % 6 === 0 &&
        ['医护人员', '工程师'].includes(p.occupation) &&
        p.health > 0.35 &&
        p.coin >= 1 &&
        p.life!.fatigue < 0.8
      ) {
        p.coin -= 1;
        s.coin += 1;
        p.life!.fatigue = clamp(p.life!.fatigue + 0.08);
        const exposure = p.life!.history?.find((h) => h.sourceId === q.id);
        if (exposure) exposure.contributions++;
        if (p.occupation === '医护人员') s.economy.healthcare = clamp(s.economy.healthcare + 0.001);
        else s.economy.infrastructure = clamp(s.economy.infrastructure + 0.001);
        q.stats ??= { casualties: 0, displaced: 0, relief: 0, consumedSupply: 0 };
        q.stats.relief++;
        emit(
          'historical_contribution',
          [p.id],
          s.id,
          `${p.name}投入积蓄和精力参与${p.occupation === '医护人员' ? '当地救护' : '设施修复'}。`,
          { sourceId: q.id, cost: 1, classification: 'simulated-consequence' },
          [q.causeId],
          0.7,
        );
      }
    }
  }
  const restricted = new Set(
    active.filter((q) => harmful(q.kind) && q.severity > 0.5).flatMap((q) => q.locationIds),
  );
  for (const route of w.routes ?? [])
    route.status = restricted.has(route.from) || restricted.has(route.to) ? 'restricted' : 'open';
  for (const q of w.shocks)
    if (q.ends <= w.month && !q.resolved) {
      q.resolved = true;
      emit(
        'historical_process_ended',
        [],
        undefined,
        `${title(q)}的本阶段模拟影响结束，已经造成的经历与损失仍被保留。`,
        { sourceId: q.id, stats: q.stats, classification: 'simulated-consequence' },
        [q.causeId],
        0.7,
      );
    }
}
