import type { World, Person } from '../contracts/index.js';
const classNames: Record<string, string> = {
  destitute: '生活困顿',
  working: '劳动者',
  skilled: '熟练职业者',
  professional: '专业人士',
  elite: '富裕阶层',
};
const relationNames: Record<string, string> = {
  kin: '亲属',
  companion: '相识',
  friend: '朋友',
  dependent: '相互依靠',
  mentor: '师徒',
  rival: '竞争',
  enemy: '敌对',
};
export function personalContext(w: World, p: Person) {
  const profile = w.society?.profiles[p.id],
    agenda = w.agency?.agendas[p.id],
    need = w.agency?.needsReplan[p.id];
  const relations = (w.society?.relationIndex[p.id] ?? [])
    .map((id) => w.society!.relations[id])
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.trust) - Math.abs(a.trust))
    .slice(0, 6)
    .map((r) => ({
      personId: r.a === p.id ? r.b : r.a,
      kind: relationNames[r.kind] ?? r.kind,
      trust: r.trust,
      causeIds: r.causeIds.slice(-3),
    }));
  return {
    identity: w.identity?.profiles[p.id]
      ? {
          religion: w.identity.profiles[p.id].religion?.id,
          political: w.identity.profiles[p.id].political?.id,
          evidenceIds: w.identity.profiles[p.id].evidenceIds.slice(0, 4),
        }
      : undefined,
    journey: p.journey
      ? {
          from: w.settlements.find((s) => s.id === p.journey!.fromId)?.name,
          to: w.settlements.find((s) => s.id === p.journey!.toId)?.name,
          progress: p.journey.progressKm / Math.max(1, p.journey.distanceKm),
          blocked: p.journey.blockedMonths > 0 && p.journey.lastApplied === w.month,
        }
      : undefined,
    historicalIdentity: p.historicalIdentity,
    custody: w.coercion?.custody[p.id]
      ? {
          axis: w.coercion.custody[p.id].axis,
          since: w.coercion.custody[p.id].started,
          until: w.coercion.custody[p.id].deadline,
          causeIds: w.coercion.custody[p.id].causeIds,
        }
      : undefined,
    socialClass: profile ? classNames[profile.socialClass] : undefined,
    affiliations: profile?.institutionIds
      .map((id) => w.society!.institutions[id])
      .filter((i) => i?.status === 'active')
      .map((i) => ({ id: i.id, name: i.label, kind: i.kind }))
      .slice(0, 4),
    relations,
    agenda: agenda
      ? {
          intention: agenda.intention,
          status: agenda.status,
          currentStep: agenda.steps[agenda.cursor]?.label,
          progress: agenda.progress,
          steps: agenda.steps.length,
          completed: agenda.cursor,
          lastFailure: agenda.lastFailure,
        }
      : undefined,
    replanning: need ? { reason: need.reason, since: need.since } : undefined,
    projects: Object.values(w.agency?.projects ?? {})
      .filter((x) => x.creatorId === p.id)
      .slice(-4)
      .map((x) => ({
        id: x.id,
        name: x.name,
        status: x.status,
        progress: x.progress,
        required: x.required,
        causeIds: x.causeIds,
      })),
  };
}
export function placeContext(w: World, id: string) {
  const s = w.settlements.find((s) => s.id === id);
  if (!s) return;
  const polity = w.polities.find((p) => p.id === s.polityId),
    gov = w.geopolitics?.governments[s.polityId],
    industrial = w.industry?.polities[s.polityId];
  const wars = w.geopolitics?.wars
    .filter(
      (x) =>
        x.status === 'active' && (x.campA.includes(s.polityId) || x.campB.includes(s.polityId)),
    )
    .map((x) => ({
      id: x.id,
      months: x.months,
      mobilized: x.mobilized[s.polityId] ?? 0,
      casualties: x.casualties[s.polityId] ?? 0,
      supply: x.supplyFulfillment[s.polityId] ?? 0,
      causeIds: x.causeIds.slice(-4),
    }));
  return {
    polity: polity?.name,
    leader: w.persons.find((p) => p.id === polity?.leaderId)?.name,
    vacancySince: w.politics?.polities[s.polityId]?.vacancySince,
    logistics: w.militaryLogistics?.lastResult?.polities[s.polityId],
    regime: gov?.regime,
    laws: gov?.laws,
    shortages: industrial?.lastShortages,
    activeWars: wars ?? [],
    historicalProcesses: w.shocks
      ?.filter((q) => q.ends > w.month && q.locationIds.includes(id))
      .map((q) => ({
        id: q.id,
        title: q.title,
        kind: q.kind,
        causeId: q.causeId,
        sourceUrl: q.sourceUrl,
      }))
      .slice(0, 6),
  };
}
