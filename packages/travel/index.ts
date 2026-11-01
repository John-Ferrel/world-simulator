import { clamp, type World, type Person } from '../contracts/index.js';
import type { Emit } from '../simulation-core/index.js';
import { requestReplan } from '../planning/index.js';
import { isDetained } from '../coercion/index.js';

// Monthly scenario rates, not historical timetable or passenger statistics.
const speed = { road: 350, rail: 1800, sea: 2200, air: 9000 };
export function isTravelling(p: Person) {
  return p.journey !== undefined;
}

/** Existing migration plans use real routes. New plans depart on the next tick. */
export function advanceTravel(w: World, emit: Emit) {
  if (!w.calendar || !w.routes) return;
  const towns = new Map(w.settlements.map((s) => [s.id, s]));
  const routes = new Map(w.routes.map((r) => [r.id, r]));
  const byPair = new Map<string, NonNullable<World['routes']>[number]>();
  const routeTime = (r: NonNullable<World['routes']>[number]) =>
    r.capacity <= 0 ? Infinity : r.km / speed[r.mode] / (r.status === 'restricted' ? 0.35 : 1);
  for (const r of [...w.routes].sort((a, b) => a.id.localeCompare(b.id))) {
    const key = [r.from, r.to].sort().join('~'),
      old = byPair.get(key);
    if (!old || routeTime(r) < routeTime(old)) byPair.set(key, r);
  }
  const occupied = new Map<string, number>();
  for (const p of w.persons)
    if (p.death === undefined && p.journey)
      occupied.set(p.journey.routeId, (occupied.get(p.journey.routeId) ?? 0) + 1);
  // Rotate ties independently of account ownership, so a busy route cannot always favor low IDs.
  const people = w.persons
    .filter((p) => p.death === undefined && !isDetained(w, p))
    .sort((a, b) => a.id.localeCompare(b.id));
  const pivot = people.length ? w.month % people.length : 0;
  for (const p of [...people.slice(pivot), ...people.slice(0, pivot)]) {
    const provision = (from: World['settlements'][number]) => {
      const supplies = Math.min(1, from.food);
      from.food -= supplies;
      w.audit.consumedFood += supplies;
      if (supplies < 1) {
        p.health = clamp(p.health - 0.01);
        p.stress = clamp(p.stress + 0.02);
      }
    };
    const plan = p.journey
      ? p.plans.find((x) => x.id === p.journey!.planId)
      : p.plans.find((x) => x.kind === 'migrate' && x.status === 'active');
    if (!plan) {
      delete p.journey;
      continue;
    }
    const fail = (reason: string) => {
      plan.status = 'failed';
      const journey = p.journey;
      const e = emit(
        'journey_failed',
        [p.id],
        p.locationId,
        `${p.name}的迁徙未能完成：${reason}。`,
        {
          planId: plan.id,
          reason,
          fromId: journey?.fromId,
          targetId: plan.targetId,
          progressKm: journey?.progressKm ?? 0,
          classification: 'travel-outcome',
        },
        journey?.causeIds ?? plan.causeIds,
        0.7,
      );
      delete p.journey;
      requestReplan(w, p, reason, [e.id]);
    };
    if (plan.status !== 'active') {
      delete p.journey;
      continue;
    }
    if (w.month > plan.deadline) {
      fail('行程超过可承担的时间窗口');
      continue;
    }
    const from = towns.get(p.journey?.fromId ?? p.locationId);
    const to = towns.get(plan.targetId);
    const route = p.journey
      ? routes.get(p.journey.routeId)
      : from && to
        ? byPair.get([from.id, to.id].sort().join('~'))
        : undefined;
    if (
      !from ||
      !to ||
      !route ||
      ![route.from, route.to].includes(from.id) ||
      ![route.from, route.to].includes(to.id)
    ) {
      fail('原定交通线路已不存在或已经改道');
      continue;
    }
    const rel = w.geopolitics?.relations[[from.polityId, to.polityId].sort().join('~')];
    const enemyCamp = w.geopolitics?.wars.some(
      (war) =>
        war.status === 'active' &&
        ((war.campA.includes(from.polityId) && war.campB.includes(to.polityId)) ||
          (war.campB.includes(from.polityId) && war.campA.includes(to.polityId))),
    );
    const blocked = route.capacity <= 0 || rel?.status === 'war' || enemyCamp;
    if (blocked) {
      if (!p.journey) {
        fail('交战或停运使边境无法通行');
        continue;
      }
      if (p.journey.lastApplied === w.month) continue;
      p.journey.lastApplied = w.month;
      p.journey.blockedMonths++;
      provision(from);
      p.stress = clamp(p.stress + 0.025);
      const fee = Math.min(p.coin, 0.2);
      p.coin -= fee;
      from.coin += fee;
      if (p.journey.blockedMonths === 1) {
        const e = emit(
          'journey_blocked',
          [p.id],
          from.id,
          `${p.name}的行程因路线封锁而滞留。`,
          { routeId: route.id, planId: plan.id },
          [...plan.causeIds, ...(rel?.causeIds ?? [])],
          0.7,
        );
        p.journey.causeIds = [...p.journey.causeIds, e.id].slice(-12);
      }
      continue;
    }
    if (!p.journey) {
      const seats = Math.max(
        0,
        Math.floor(route.capacity * 0.01 * (route.status === 'restricted' ? 0.25 : 1)),
      );
      if ((occupied.get(route.id) ?? 0) >= seats) continue;
      const fee = Math.max(0.15, Math.min(3, route.km / 2000));
      if (p.coin < fee) {
        fail('无法承担路费和途中食宿');
        continue;
      }
      p.coin -= fee;
      from.coin += fee;
      const e = emit(
        'journey_started',
        [p.id],
        from.id,
        `${p.name}启程离开${from.name}，前往${to.name}。`,
        { planId: plan.id, routeId: route.id, targetId: to.id, distanceKm: route.km, fee },
        plan.causeIds,
        0.6,
      );
      p.journey = {
        planId: plan.id,
        routeId: route.id,
        fromId: from.id,
        toId: to.id,
        departed: w.month,
        distanceKm: Math.max(1, route.km),
        progressKm: 0,
        lastApplied: -1,
        blockedMonths: 0,
        causeIds: [e.id, ...plan.causeIds].slice(-12),
      };
      occupied.set(route.id, (occupied.get(route.id) ?? 0) + 1);
    }
    const j = p.journey;
    if (j.lastApplied === w.month) continue;
    j.lastApplied = w.month;
    // The origin is a last confirmed location. No local job or encounters occur while travelling.
    const maintenance = Math.min(p.coin, 0.12);
    p.coin -= maintenance;
    from.coin += maintenance;
    const latitude = Math.abs(from.lat ?? 30);
    const calendarMonth = w.month % 12;
    const winterMonths = (from.lat ?? 30) < 0 ? [5, 6, 7] : [11, 0, 1];
    const winter = latitude > 45 && winterMonths.includes(calendarMonth);
    const factor =
      (route.status === 'restricted' ? 0.35 : 1) *
      (winter && route.mode === 'road' ? 0.55 : 1) *
      (0.4 + p.health * 0.6);
    j.progressKm = Math.min(j.distanceKm, j.progressKm + speed[route.mode] * factor);
    plan.step++;
    if (p.life) p.life.fatigue = clamp(p.life.fatigue + 0.025);
    if (j.progressKm < j.distanceKm) {
      provision(from);
      continue;
    }
    p.locationId = to.id;
    plan.status = 'complete';
    p.stress = clamp(p.stress - 0.08);
    const arrival = emit(
      'migration',
      [p.id],
      to.id,
      `${p.name}经过旅途抵达${to.name}，开始重新安顿生活。`,
      {
        planId: plan.id,
        from: from.id,
        to: to.id,
        routeId: route.id,
        distanceKm: j.distanceKm,
        travelMonths: w.month - j.departed + 1,
        classification: 'completed-journey',
      },
      j.causeIds,
      0.8,
    );
    plan.causeIds = [...plan.causeIds, arrival.id].slice(-12);
    delete p.journey;
  }
}
