import {
  clamp,
  type World,
  type Person,
  type Settlement,
  type HistoricalEvent,
} from '../contracts/index.js';
import { random } from '../simulation-core/random.js';
import { isDetained } from '../coercion/index.js';
import { authorityAt, remitSovereignRevenue } from '../sovereignty/index.js';
import type { Emit } from '../simulation-core/index.js';
export function runWorldSystems(
  w: World,
  locals: Map<string, Person[]>,
  emit: Emit,
  events: HistoricalEvent[],
) {
  const r = (id: string, key: string) => random(w.seed, w.month, id, key);
  const settlementIndex = new Map(w.settlements.map((s) => [s.id, s]));
  const routeIndex = new Map(w.routes?.map((r) => [[r.from, r.to].sort().join(':'), r]));
  const personIndex = new Map(w.persons.map((p) => [p.id, p]));
  const organizationsByLocation = new Map<string, World['organizations']>();
  for (const org of w.organizations) {
    const list = organizationsByLocation.get(org.locationId) ?? [];
    list.push(org);
    organizationsByLocation.set(org.locationId, list);
  }
  const find = (id: string) => personIndex.get(id)!;
  const legitimacyPressure = new Map<string, { weighted: number; population: number }>();
  // Resource production, consumption, prices and cohort demography precede social decisions.
  for (const s of w.settlements) {
    const people = locals.get(s.id)!;
    const n = s.cohort.children + s.cohort.adults + s.cohort.elders + people.length;
    const polity = w.polities.find((p) => p.id === s.polityId)!;
    const atWar = w.conflicts.some((c) => c.status === 'active' && c.locationId === s.id);
    const season = 1 + 0.15 * Math.sin((w.month / 12) * Math.PI * 2);
    const drought = r(s.id, `climate-${Math.floor(w.month / 12)}`) < 0.055;
    const guilds = (organizationsByLocation.get(s.id) ?? []).filter(
      (o) =>
        o.status === 'active' &&
        o.locationId === s.id &&
        o.memberIds.length >= 3 &&
        o.insolventMonths === 0,
    );
    const boost = guilds
      .filter((o) => o.definition.mechanism === 'pooled_production')
      .reduce((n, o) => n + o.definition.effect * o.adoption, 0);
    const production =
      n *
      s.fertility *
      season *
      (drought ? 0.55 : 1) *
      (atWar ? 0.73 : 1) *
      (1 + s.knowledge * 0.25 + Math.min(boost, 0.3)) *
      (s.economy?.productionMultiplier ?? 1);
    s.food += production;
    w.audit.producedFood += production;
    const consumed = Math.min(s.food, n);
    s.food -= consumed;
    w.audit.consumedFood += consumed;
    s.scarcity = n > 0 ? clamp(1 - consumed / n) : 0;
    s.price = 1 + s.scarcity * 4 + (n > 0 ? 1 / (1 + s.food / n) : 0);
    s.prosperity = n > 0 ? clamp(0.5 + s.food / (n * 16) - s.scarcity) : 0.5;
    s.unrest = clamp(
      s.unrest * 0.95 +
        s.scarcity * 0.3 +
        (polity.tax - 0.08) * 0.1 -
        (polity.legitimacy - 0.4) * 0.015,
    );
    if ((drought || s.scarcity > 0.08) && (w.month % 6 === 0 || s.scarcity > 0.4)) {
      const e = emit(
        'scarcity',
        people
          .filter((p) => p.stress < 0.8)
          .slice(0, 8)
          .map((p) => p.id),
        s.id,
        `${s.name}的${drought ? '歉收' : '粮食不足'}正在影响当地生计。`,
        { scarcity: s.scarcity, production, consumed },
        [],
        0.7,
      );
      if (s.scarcity > 0.2) w.terminalEvidence.push(e.id);
    }
    const born = n * 0.00165 * (1 - s.scarcity) + s.birthRemainder;
    const births = Math.floor(born);
    s.birthRemainder = born - births;
    s.cohort.children += births;
    w.audit.births += births;
    const adult = Math.floor(s.cohort.children / 216);
    s.cohort.children -= adult;
    s.cohort.adults += adult;
    const elder = Math.floor(s.cohort.adults / 600);
    s.cohort.adults -= elder;
    s.cohort.elders += elder;
    const mortality =
      s.cohort.children * 0.0003 +
      s.cohort.adults * 0.00035 +
      s.cohort.elders * 0.006 +
      n * s.scarcity * 0.012 +
      n * (s.disease?.prevalence ?? 0) * 0.001 +
      (atWar ? n * 0.0006 : 0) +
      s.deathRemainder;
    let deaths = Math.floor(mortality);
    s.deathRemainder = mortality - deaths;
    for (const key of ['elders', 'adults', 'children'] as const) {
      const lost = Math.min(s.cohort[key], deaths);
      s.cohort[key] -= lost;
      deaths -= lost;
      w.audit.deaths += lost;
    }
    const revenue = Math.min(s.coin, n * polity.tax * 0.05);
    const jurisdiction = authorityAt(w, s.id);
    const remittance =
      jurisdiction?.current.status === 'autonomous' &&
      jurisdiction.current.sovereignPolityId !== s.polityId
        ? remitSovereignRevenue(w, s.id, revenue * 0.35)
        : undefined;
    const localRevenue = revenue - (remittance?.ok ? remittance.receipt.amount : 0);
    s.coin -= localRevenue;
    polity.treasury += localRevenue;
    const pressure = legitimacyPressure.get(polity.id) ?? { weighted: 0, population: 0 };
    pressure.weighted += n * ((s.prosperity - 0.65) * 0.002 - s.scarcity * 0.01);
    pressure.population += n;
    legitimacyPressure.set(polity.id, pressure);
  }
  for (const polity of w.polities) {
    const pressure = legitimacyPressure.get(polity.id);
    if (pressure && pressure.population > 0)
      polity.legitimacy = clamp(polity.legitimacy + pressure.weighted / pressure.population);
  }
  // Capacity-limited trade transports real grain across graph edges and pays sellers.
  for (const a of w.settlements)
    for (const id of a.neighbors.filter((id) => id > a.id)) {
      const b = settlementIndex.get(id)!;
      const rich = a.food > b.food ? a : b,
        poor = rich === a ? b : a;
      const pop = (s: Settlement) =>
        s.cohort.children + s.cohort.adults + s.cohort.elders + (locals.get(s.id)?.length ?? 0);
      const route = routeIndex.get([a.id, b.id].sort().join(':'));
      const amount = Math.min(
        (route?.capacity ?? 160) *
          (route?.status === 'restricted' ? 0.25 : 1) *
          Math.min(a.economy?.tradeMultiplier ?? 1, b.economy?.tradeMultiplier ?? 1),
        Math.max(0, rich.food - pop(rich) * 2),
        Math.max(0, pop(poor) * 2 - poor.food),
        poor.coin / Math.max(1, rich.price),
      );
      if (
        amount > 0 &&
        !w.conflicts.some(
          (c) => c.status === 'active' && (c.locationId === a.id || c.locationId === b.id),
        )
      ) {
        rich.food -= amount;
        poor.food += amount;
        poor.coin -= amount * rich.price;
        rich.coin += amount * rich.price;
        poor.knowledge += Math.min(0.0002, Math.max(0, rich.knowledge - poor.knowledge) * 0.01);
      }
    }
  for (const org of w.organizations.filter((o) => o.status === 'active')) {
    const s = w.settlements.find((s) => s.id === org.locationId)!;
    org.memberIds = org.memberIds.filter((id) => find(id) && find(id).death === undefined);
    const members = org.memberIds
      .map(find)
      .filter((p) => !p.journey && !isDetained(w, p) && p.locationId === s.id);
    if (!members.some((p) => p.id === org.leaderId) && members.length) {
      org.leaderId = [...members].sort((a, b) => b.skills.craft - a.skills.craft)[0].id;
      emit(
        'succession',
        [org.leaderId],
        s.id,
        `${find(org.leaderId).name}接任「${org.name}」的职责。`,
        { organizationId: org.id },
        org.causeIds,
        0.8,
      );
    }
    const candidates = (locals.get(s.id) ?? []).filter(
      (p) =>
        !org.memberIds.includes(p.id) &&
        p.values.care + org.adoption > 0.5 &&
        p.coin >= org.definition.dues,
    );
    if (
      org.memberIds.length < org.definition.maxMembers &&
      candidates.length &&
      r(org.id, 'recruit') < 0.45
    ) {
      const p = candidates[Math.floor(r(org.id, 'candidate') * candidates.length)];
      org.memberIds.push(p.id);
      const e = emit(
        'joined',
        [p.id, org.leaderId],
        s.id,
        `${p.name}加入了「${org.name}」。`,
        { organizationId: org.id },
        org.causeIds,
        0.5,
      );
      p.commitments.push({
        id: `commit-${e.id}`,
        kind: 'membership',
        targetId: org.id,
        status: 'active',
        causeIds: [e.id],
      });
    }
    for (const p of members) {
      const dues = Math.min(p.coin, org.definition.dues);
      p.coin -= dues;
      org.treasury += dues;
    }
    const upkeep = Math.min(org.treasury, org.definition.upkeep);
    org.treasury -= upkeep;
    s.coin += upkeep;
    if (upkeep < org.definition.upkeep) org.insolventMonths++;
    else org.insolventMonths = 0;
    org.adoption = clamp(org.memberIds.length / 10);
    if (
      org.insolventMonths >= 6 ||
      w.month - org.founded >= org.definition.ttlMonths ||
      !org.memberIds.length
    ) {
      org.status = 'dissolved';
      const refund = org.treasury;
      org.treasury = 0;
      s.coin += refund;
      emit(
        'institution_dissolved',
        org.memberIds,
        s.id,
        `「${org.name}」结束了运作。`,
        { organizationId: org.id },
        org.causeIds,
        0.7,
      );
      continue;
    }
    if (org.definition.splitOnConflict && members.length >= 8 && w.organizations.length < 128) {
      const dissent = members.filter(
        (p) => Math.abs(p.values.tradition - (find(org.leaderId)?.values.tradition ?? 0.5)) > 0.5,
      );
      if (dissent.length >= 3 && org.treasury >= 24) {
        const ids = dissent.slice(0, Math.floor(members.length / 2)).map((p) => p.id);
        if (ids.length >= 3) {
          const treasury = Math.floor(org.treasury / 2);
          org.treasury -= treasury;
          org.memberIds = org.memberIds.filter((id) => !ids.includes(id));
          const id = `split-${org.id}-${w.month}`,
            name = `${org.name.slice(0, 45)}·新约`;
          const e = emit(
            'organization_split',
            ids,
            s.id,
            `因对共同规则的分歧，「${org.name}」的一部分成员另立了「${name}」。`,
            { parentId: org.id, organizationId: id, transferredTreasury: treasury },
            org.causeIds,
            0.9,
          );
          w.organizations.push({
            id,
            name,
            kind: org.kind,
            locationId: org.locationId,
            creatorId: ids[0],
            leaderId: ids[0],
            memberIds: ids,
            treasury,
            founded: w.month,
            status: 'active',
            definition: { ...org.definition, name, splitOnConflict: false },
            progress: 0,
            insolventMonths: 0,
            adoption: 0,
            causeIds: [e.id],
          });
          for (const p of dissent.filter((p) => ids.includes(p.id))) {
            for (const c of p.commitments.filter((c) => c.targetId === org.id)) c.status = 'closed';
            p.commitments.push({
              id: `commit-${p.id}-${e.id}`,
              kind: 'membership',
              targetId: id,
              status: 'active',
              causeIds: [e.id],
            });
          }
        }
      }
    }
    if (org.memberIds.length < 3 || org.insolventMonths) continue;
    if (org.definition.mechanism === 'research') {
      org.progress +=
        org.definition.effect *
        (w.parameters?.researchRate ?? 1) *
        (1 + members.reduce((n, p) => n + p.skills.learning, 0));
      if (org.progress >= 1) {
        org.progress -= 1;
        const previousKnowledge = s.knowledge;
        s.knowledge = clamp(s.knowledge + org.definition.effect * (w.parameters.researchRate ?? 1));
        const gain = s.knowledge - previousKnowledge;
        const e = emit(
          gain > 0 ? 'innovation' : 'research_saturated',
          org.memberIds,
          s.id,
          gain > 0
            ? `「${org.name}」的试验改进了当地生产方法。`
            : `「${org.name}」的试验尚未带来进一步改进。`,
          { organizationId: org.id, knowledge: s.knowledge, knowledgeGain: gain },
          org.causeIds,
          0.8,
        );
        if (gain > 0) {
          (w.knowledgeEvidence ??= []).push(e.id);
          (w.discoveries ??= []).push({
            id: `discovery-${e.id}`,
            name: `${org.name}的改良法`,
            creatorId: org.creatorId,
            locationId: s.id,
            createdAt: w.month,
            mechanism: 'production_improvement',
            gain,
            causeIds: [e.id],
          });
        }
      }
    }
    if (org.definition.mechanism === 'mutual_aid') {
      for (const p of members) {
        const aid = Math.min(org.treasury, org.definition.effect * 3);
        org.treasury -= aid;
        p.coin += aid;
        p.stress = clamp(p.stress - org.definition.effect * 0.1);
        p.values.care = clamp(p.values.care + 0.001);
        if (!p.policy)
          p.policy = {
            version: 1,
            kind: 'cooperate',
            strength: org.definition.effect,
            ttlMonths: 12,
            adoptedAt: w.month,
            causeIds: org.causeIds,
          };
      }
      s.unrest = clamp(s.unrest - org.definition.effect * 0.05);
    }
  }
  // Border conflict derives from food pressure, legitimacy, adjacent jurisdiction and supply.
  for (const a of w.geopolitics ? [] : w.settlements) {
    if (a.scarcity < 0.15 && a.unrest < 0.45) continue;
    const b = w.settlements.find(
      (s) => a.neighbors.includes(s.id) && s.polityId !== a.polityId && s.food > a.food + 100,
    );
    if (
      !b ||
      w.conflicts.some((c) => c.status === 'active' && (c.a === a.polityId || c.b === a.polityId))
    )
      continue;
    const pa = w.polities.find((p) => p.id === a.polityId)!;
    if (pa.treasury < 80 || pa.military < 10) continue;
    const causes = events
      .filter((e) => e.locationId === a.id && e.kind === 'scarcity')
      .map((e) => e.id);
    const e = emit(
      'war_started',
      (locals.get(a.id) ?? []).slice(0, 5).map((p) => p.id),
      a.id,
      `${a.name}的粮路争端升级为与${b.name}的边境冲突。`,
      { attacker: pa.id, defender: b.polityId },
      causes,
      0.9,
    );
    w.conflicts.push({
      id: `war-${e.id}`,
      a: pa.id,
      b: b.polityId,
      locationId: b.id,
      months: 0,
      status: 'active',
      causeIds: [e.id],
    });
  }
  for (const c of w.conflicts.filter((c) => c.status === 'active')) {
    c.months++;
    const a = w.polities.find((p) => p.id === c.a)!,
      b = w.polities.find((p) => p.id === c.b)!;
    const s = w.settlements.find((s) => s.id === c.locationId)!;
    const supply = Math.min(a.treasury, 30);
    a.treasury -= supply;
    s.coin += supply;
    const lost = Math.min(s.food, 45);
    s.food -= lost;
    w.audit.destroyedFood += lost;
    a.military = Math.max(0, a.military - 0.5);
    b.military = Math.max(0, b.military - 0.7);
    s.unrest = clamp(s.unrest + 0.015);
    if (c.months >= 12 || supply < 20 || a.military < 10) {
      c.status = 'ended';
      if (supply >= 20 && a.military > b.military * 0.9) {
        s.polityId = a.id;
        b.legitimacy = clamp(b.legitimacy - 0.1);
      }
      emit(
        'war_ended',
        (locals.get(s.id) ?? []).slice(0, 8).map((p) => p.id),
        s.id,
        `${s.name}的边境冲突结束，居民承受了粮食与生计的损失。`,
        { controller: s.polityId },
        c.causeIds,
        0.9,
      );
    }
  }
}
