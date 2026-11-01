import { AgendaDefinitionSchema, AgendaProposalSchema } from './schema.js';
// Literal semantic aliases compile to existing mechanics. Unrecognized intentions never create new physics.
const aliases: [RegExp, string][] = [
  [/^(campaign|竞选|政治动员)(\b|\s|[：:]|$)/i, 'campaign'],
  [/^(negotiate|协商|外交谈判)(\b|\s|[：:]|$)/i, 'negotiate'],
  [/^(practice|rehearse|reflect|练习|反思)(\b|\s|[：:])/i, 'practice'],
  [/^(research|investigate|experiment|study|研究|调查|学习)(\b|\s|[：:])/i, 'research'],
  [/^(seek work|find a job|apply for work|求职|找工作)(\b|\s|[：:])/i, 'seek_work'],
  [/^(care for|tend to|照料|护理)(\b|\s|[：:])/i, 'care'],
  [/^(socialize|meet with|联络|结识)(\b|\s|[：:])/i, 'socialize'],
  [/^(relocate|migrate|迁居|迁移)(\b|\s|[：:])/i, 'relocate'],
  [/^(organize|found an association|建立组织|组织)(\b|\s|[：:])/i, 'organize'],
  [/^(petition|appeal|请愿|申请改革)(\b|\s|[：:])/i, 'petition'],
  [/^(publish|write|发表|写作)(\b|\s|[：:])/i, 'publish'],
  [/^(donate|provide aid|捐助|救济)(\b|\s|[：:])/i, 'aid'],
  [/^(develop a project|start a project|开展项目)(\b|\s|[：:])/i, 'project'],
];
export function compileAgendaOutput(raw: unknown) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw))
    return { value: raw, compilations: [] };
  const value = structuredClone(raw) as Record<string, unknown>,
    compilations: { index: number; sourceAction: string; boundedAction: string }[] = [];
  if (Array.isArray(value.steps))
    value.steps = value.steps.map((step, index) => {
      if (
        !step ||
        typeof step !== 'object' ||
        typeof step.action !== 'string' ||
        step.action.length > 300 ||
        step.action.includes('\0')
      )
        return step;
      const match = aliases.find(([test]) => test.test(step.action));
      if (!match) return step;
      if (step.action !== match[1])
        compilations.push({ index, sourceAction: step.action, boundedAction: match[1] });
      return { ...step, action: match[1] };
    });
  return { value, compilations };
}
export function compileAgendaProposal(raw: unknown) {
  const { value, compilations } = compileAgendaOutput(raw);
  return { proposal: AgendaProposalSchema.parse(value), compilations };
}
export function compileAgendaDefinition(raw: unknown) {
  return AgendaDefinitionSchema.parse(compileAgendaOutput(raw).value);
}
