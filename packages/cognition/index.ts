import {
  clamp,
  type Person,
  type HistoricalEvent,
  type World,
  type Goal,
} from '../contracts/index.js';
import { isDetained } from '../coercion/index.js';
export function remember(p: Person, e: HistoricalEvent, salience = e.significance) {
  if (p.memories.some((m) => m.eventId === e.id)) return;
  p.memories.push({ id: `memory-${p.id}-${e.id}`, eventId: e.id, month: e.month, salience });
}
/** Keep causal evidence compact while preserving the most recent distinct causes. */
export function appendCauseId(causeIds: string[], id: string, limit = 16): string[] {
  const recent = [...new Set(causeIds.filter((causeId) => causeId !== id)), id].slice(-limit);
  causeIds.splice(0, causeIds.length, ...recent);
  return causeIds;
}
export function reconsider(p: Person, e: HistoricalEvent, kind: Goal['kind']) {
  remember(p, e);
  const previous = p.goals.filter((g) => g.status === 'active' && g.kind !== kind);
  for (const g of previous) {
    g.status = 'abandoned';
    g.reason = e.kind;
    appendCauseId(g.causeIds, e.id);
  }
  let g = p.goals.find((g) => g.kind === kind && g.status === 'active');
  if (!g) {
    g = {
      id: `goal-${p.id}-${e.id}`,
      kind,
      strength: 0.7,
      progress: 0,
      status: 'active',
      causeIds: [e.id],
    };
    p.goals.push(g);
  }
  if (p.life) {
    if (e.kind === 'death' || e.kind === 'bereavement') {
      p.life.emotions.grief = clamp(p.life.emotions.grief + 0.4);
      p.life.emotions.hope = clamp(p.life.emotions.hope - 0.12);
      p.life.personality.extraversion = clamp(p.life.personality.extraversion - 0.025);
    }
    if (e.kind === 'job_lost' || e.kind === 'conviction_changed')
      p.life.emotions.anger = clamp(p.life.emotions.anger + 0.18);
  }
  p.stress = clamp(p.stress + 0.15 * (p.life ? 0.75 + p.life.personality.neuroticism * 0.5 : 1));
}
export function perception(w: World, p: Person) {
  const s = w.settlements.find((s) => s.id === p.locationId)!;
  return {
    actor: {
      id: p.id,
      version: p.version,
      name: p.name,
      background: p.background,
      title: p.title,
      historicalIdentity: p.historicalIdentity,
      isPoliticalLeader: w.polities.some((q) => q.leaderId === p.id),
      intention: p.intention,
      currentAgenda: w.agency?.agendas[p.id],
      replanningReason: w.agency?.needsReplan[p.id],
      social: w.society?.profiles[p.id],
      identity: w.identity?.profiles[p.id],
      politicalStanding: w.politics?.standing[p.id],
      goals: p.goals.filter((g) => g.status === 'active'),
      skills: p.skills,
      coin: p.coin,
      values: p.values,
      life: p.life,
      occupation: p.occupation,
      age: Math.floor((w.month - p.birth) / 12),
      plans: p.plans.filter((plan) => plan.status === 'active'),
      relationships: p.relationships
        .slice()
        .sort((a, b) => b.trust - a.trust)
        .slice(0, 8)
        .map((rel) => ({ ...rel, name: w.persons.find((q) => q.id === rel.personId)?.name })),
    },
    local: {
      id: s.id,
      name: s.name,
      food: s.food,
      scarcity: s.scarcity,
      economy: s.economy,
      government: w.geopolitics?.governments[s.polityId],
      industry: w.industry?.polities[s.polityId],
      diplomaticContacts: Object.values(w.geopolitics?.relations ?? {})
        .filter((r) => r.a === s.polityId || r.b === s.polityId)
        .slice(0, 8)
        .map((r) => ({
          targetId: r.a === s.polityId ? r.b : r.a,
          status: r.status,
          dispute: r.dispute,
        })),
      neighbors: s.neighbors.map((id) => ({
        id,
        name: w.settlements.find((t) => t.id === id)?.name,
      })),
      knownPeople: w.persons
        .filter(
          (q) =>
            q.locationId === s.id &&
            q.death === undefined &&
            !q.journey &&
            !isDetained(w, q) &&
            q.id !== p.id,
        )
        .slice(0, 8)
        .map((q) => ({ id: q.id, name: q.name, occupation: q.occupation, health: q.health })),
    },
    beliefs: p.beliefs.map((b) => ({
      ...b,
      proposition: w.claims.find((c) => c.id === b.claimId)
        ? {
            subjectId: w.claims.find((c) => c.id === b.claimId)!.subjectId,
            predicate: w.claims.find((c) => c.id === b.claimId)!.predicate,
          }
        : undefined,
    })),
    memories: p.memories.slice(-6),
    routes: w.routes?.filter((route) => route.from === p.locationId || route.to === p.locationId),
    organizations: w.organizations
      .filter(
        (o) =>
          o.status === 'active' && (o.memberIds.includes(p.id) || o.locationId === p.locationId),
      )
      .slice(0, 5),
    capabilities: ['move', 'research', 'found', 'publish'],
  };
}
