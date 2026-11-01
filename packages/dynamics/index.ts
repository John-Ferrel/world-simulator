import {
  DefinitionSchema,
  ProposalSchema,
  safeText,
  type World,
  type Proposal,
  type Definition,
  type Person,
} from '../contracts/index.js';
export function compileDefinition(input: unknown): Definition {
  const d = DefinitionSchema.parse(input);
  if (
    (d.kind === 'academy') !== (d.mechanism === 'research') ||
    (d.kind === 'council') !== (d.mechanism === 'mutual_aid')
  )
    throw new Error('机构类型与机制不匹配');
  return { ...d, name: safeText(d.name) };
}
export function validateProposal(w: World, input: unknown): { proposal: Proposal; actor: Person } {
  const p = ProposalSchema.parse(input);
  const actor = w.persons.find((a) => a.id === p.actorId);
  if (!actor || actor.death !== undefined) throw new Error('人物已不具备行动能力');
  if (actor.version !== p.actorVersion || w.month > p.deadline)
    throw new Error('提案已过期或人物状态改变');
  if (w.processedJobs.includes(p.jobId)) throw new Error('重复提案');
  if (p.action === 'publish' && actor.coin < 2) throw new Error('传播主张需要基本生活资助');
  if (p.action === 'found') {
    if (!p.definition) throw new Error('缺少机构定义');
    compileDefinition(p.definition);
    if (actor.coin < 12) throw new Error('创办资金不足');
  }
  if (p.action === 'move') {
    const s = w.settlements.find((s) => s.id === actor.locationId)!;
    if (!p.targetId || !s.neighbors.includes(p.targetId)) throw new Error('目的地不相邻');
    if (actor.coin < 3) throw new Error('旅费不足');
  }
  return { proposal: p, actor };
}
