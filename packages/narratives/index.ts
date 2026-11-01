import type { HistoricalEvent, Person, World } from '../contracts/index.js';
export function chronicle(events: HistoricalEvent[], personId?: string) {
  return events.filter((e) => !personId || e.personIds.includes(personId));
}
export function catchUp(events: HistoricalEvent[], personId: string, after: number) {
  const facts = chronicle(events, personId).filter((e) => e.month > after);
  return {
    after,
    count: facts.length,
    sourceIds: facts.map((e) => e.id),
    text: facts.length
      ? `这段时间留下了${facts.length}条记录。${
          facts
            .filter((e) => e.significance >= 0.7)
            .slice(-5)
            .map((e) => e.text)
            .join(' ') || facts.at(-1)!.text
        }`
      : '这段时间尚无新的生活记录。',
    perspective: 'recorded_facts',
  };
}
export function mapProjection(w: World) {
  const namedCounts = new Map<string, number>();
  for (const p of w.persons)
    if (p.death === undefined)
      namedCounts.set(p.locationId, (namedCounts.get(p.locationId) ?? 0) + 1);
  return {
    worldId: w.id,
    month: w.month,
    revision: w.revision,
    seed: w.seed,
    calendar: w.calendar,
    routes: w.routes,
    shocks: w.shocks,
    fronts:
      w.geopolitics?.wars
        .filter((x) => x.status === 'active')
        .flatMap((war) =>
          war.fronts.map((f) => ({
            from: f.aSettlementId,
            to: f.bSettlementId,
            control: f.control,
            supply: f.supply,
            warId: war.id,
          })),
        )
        .slice(0, 2000) ?? [],
    settlements: w.settlements.map((s) => ({
      id: s.id,
      name: s.name,
      x: s.x,
      y: s.y,
      lon: s.lon,
      lat: s.lat,
      economy: s.economy,
      disease: s.disease,
      biome: s.biome,
      polityId: s.polityId,
      food: Math.round(s.food),
      scarcity: s.scarcity,
      knowledge: s.knowledge,
      population:
        s.cohort.adults + s.cohort.children + s.cohort.elders + (namedCounts.get(s.id) ?? 0),
    })),
    polities: w.polities.map((p) => ({ id: p.id, name: p.name, color: p.color })),
    locations: Object.fromEntries(w.persons.map((p) => [p.id, p.locationId])),
  };
}
function occupationAt(life: HistoricalEvent[]) {
  for (const event of [...life].reverse()) {
    const role = event.data?.role;
    if (event.kind === 'job_found' && typeof role === 'string') return role;
    if (event.kind === 'career_progress') {
      const found = /在(.+?)的工作中/.exec(event.text)?.[1];
      if (found) return found;
    }
    if (event.kind === 'job_lost') {
      const occupation = event.data?.occupation;
      if (typeof occupation === 'string') return occupation;
    }
    if (event.kind === 'life_record') {
      const found = /以(.+?)为生/.exec(event.text)?.[1];
      if (found) return found;
    }
  }
  return '当时身份未记录';
}

export function personAt(p: Person, month: number, events: HistoricalEvent[]) {
  const life = events.filter((e) => e.personIds.includes(p.id) && e.month <= month);
  return {
    id: p.id,
    name: p.name,
    sex: p.sex,
    birth: p.birth,
    appearance: p.appearance,
    occupation: occupationAt(life),
    death: p.death !== undefined && p.death <= month ? p.death : undefined,
    age: Math.floor((Math.min(month, p.death ?? month) - p.birth) / 12),
    locationId:
      life.filter((e) => e.kind === 'migration' || e.kind === 'arrival' || e.kind === 'birth').at(-1)
        ?.locationId ?? p.locationId,
    projection: 'historical_events',
    note: '历史回放展示已记录的经历和地点；当前属性不用于还原过去的心理状态。',
  };
}
