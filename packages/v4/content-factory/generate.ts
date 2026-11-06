import { chat, modelConfig, parseModelJSON } from '../../model/config.js';
import type { WorldState } from '../domain.js';
import type { StatePack } from '../state/registry.js';
import type { StateDefinition } from '../state/types.js';
import type { StateContentBrief } from './briefs.js';
import { validateStateContentPack } from './validate.js';

export type StatePackAttempt = {
  attempt: number;
  tokens: number;
  model?: string;
  rawFile?: string;
  errors: string[];
  warnings: string[];
};

export type StatePackGeneration = {
  ok: boolean;
  pack?: StatePack;
  usedFallback: boolean;
  tokens: number;
  attempts: StatePackAttempt[];
  model?: string;
  validation?: ReturnType<typeof validateStateContentPack>;
  error?: string;
};

export type GenerateStatePackOptions = {
  maxAttempts?: number;
  maxTokens?: number;
  timeoutMs?: number;
  /** Never call the model, even if a key exists. */
  forceFallback?: boolean;
};

const EFFECT_NAMES = [
  'cash',
  'food',
  'health',
  'condition',
  'mood',
  'reputation',
  'skill',
  'flag',
  'education',
  'employment',
  'unemployment',
  'relation',
  'relation_end',
  'role',
  'organization_membership',
  'move',
  'household',
  'residence',
  'birth',
  'death',
  'estate',
  'knowledge',
  'state_add',
  'state_remove',
  'state_parameter',
  'state_transition',
  'position',
  'organization_found',
].join(', ');

const CONDITION_NAMES = [
  'age',
  'stage',
  'cash',
  'householdSize',
  'overcrowded',
  'health',
  'skill',
  'education',
  'employment',
  'placeKind',
  'hasRole',
  'notHasRole',
  'development',
  'developmentType',
  'capability',
  'historicalProcess',
  'legacy',
  'hasRelationWith',
  'hasRelation',
  'notHasRelation',
  'worldYear',
  'region',
  'sex',
  'pressure',
  'history',
  'knowledge',
  'project',
  'relationHistory',
  'hasFlag',
  'hasState',
  'notHasState',
  'attribute',
  'position',
].join(', ');

export function stateAuthorMessages(
  brief: StateContentBrief,
  existingStateIds: string[],
  previousErrors: string[] = [],
): { role: string; content: string }[] {
  const example = {
    id: `pack-${brief.id}`,
    version: 1,
    title: brief.title,
    description: 'one bounded content pack',
    author: 'state-author-agent',
    model: 'configured-model',
    sourceBriefId: brief.id,
    rationale: brief.gap,
    states: [
      {
        id: brief.suggestedStateIds[0] ?? 'new-state',
        version: 1,
        packId: `pack-${brief.id}`,
        title: '一个带机制的处境',
        description: '这个状态如何持续改变机会和后果',
        owner: brief.owner,
        slot: brief.fallback.slot,
        conflict: 'replace',
        tags: brief.fallback.tags,
        parameters: {
          progress: { type: 'number', default: 0, min: 0, max: 100 },
        },
        enterConditions: [{ kind: 'age', min: 16, max: 70 }],
        durationMonths: {
          min: brief.fallback.durationMonths[0],
          max: brief.fallback.durationMonths[1],
        },
        modifiers: [
          {
            kind: 'scene_weight',
            tags: brief.fallback.tags,
            multiplier: 1.4,
          },
        ],
        ticks: [
          {
            id: 'annual',
            everyMonths: 12,
            check: { attribute: 'willpower', dc: 11 },
            outcomes: [
              {
                id: 'held',
                result: 'success',
                weight: 2,
                text: '{subject}又撑过了一年；处境没有消失，但也没有恶化。',
                effects: [{ type: 'mood', personId: '$subject', amount: 0.02, reason: 'held on' }],
              },
              {
                id: 'slipped',
                result: 'failure',
                weight: 1,
                text: '{subject}在这一年失去了一点余地。',
                effects: [{ type: 'mood', personId: '$subject', amount: -0.03, reason: 'slipped' }],
              },
            ],
          },
        ],
        reactions: [
          {
            id: 'reaction',
            onTags: [brief.fallback.reactionTag],
            chance: 0.6,
            effects: [
              {
                type: 'flag',
                personId: '$subject',
                flag: `${brief.fallback.stateId}:reacted`,
                add: true,
                reason: 'the state answered a real event',
              },
            ],
            text: brief.fallback.reactionText,
            cooldownMonths: 12,
          },
        ],
        provenance: {
          kind: 'generated',
          author: 'state-author-agent',
          model: 'configured-model',
          rationale: 'bounded mechanism requested by the brief',
        },
      },
    ],
    kernels: [
      {
        id: 'r15-generated.example',
        title: '示例事件',
        domain: brief.domain,
        kind: 'event',
        stage: 'adulthood',
        ageWindow: { min: 18, max: 60 },
        tags: [brief.domain, 'generated'],
        conditions: [{ kind: 'hasState', stateId: brief.suggestedStateIds[0] ?? 'new-state' }],
        roles: [{ key: 'subject', kind: 'subject' }],
        outcomes: [
          {
            id: 'normal',
            weight: 1,
            text: '{subject}遇到一次与这个处境直接相关的机会，结果必须改变真实状态或资源。',
            effects: [
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId: brief.suggestedStateIds[0] ?? 'new-state',
                key: 'progress',
                delta: 10,
                reason: 'the opportunity moved the state',
              },
            ],
          },
        ],
      },
    ],
  };
  const content = [
    `You are the State Author in a content factory for a historical life simulator.`,
    `Write one JSON StatePack for this brief. The runtime will validate and may reject it.`,
    ``,
    `BRIEF`,
    JSON.stringify(brief, null, 2),
    ``,
    `Existing state ids you can compose with: ${existingStateIds.join(', ')}`,
    `Allowed effect types: ${EFFECT_NAMES}`,
    `Allowed condition kinds: ${CONDITION_NAMES}`,
    ``,
    `Hard rules:`,
    `- Output only one JSON object, no Markdown.`,
    `- 1-3 states, 3-10 kernels. Every state id used by a condition/effect must be defined in this pack or be an existing id listed above.`,
    `- Every outcome must have at least one typed effect that changes a real persisted fact (state, cash, health, education, employment, relation, position, organisation, death). Mood alone is not enough.`,
    `- Use state_add/state_transition/state_parameter/position/organization_found for Phase 15 mechanics. Do not invent effect or condition kinds.`,
    `- A real office must use a position effect. A stage title must use a state with a performance/court tag and must not create authority.`,
    `- Cover at least one normal, one rare, and one absurd/black-humour outcome where the brief allows it. Do not make every wish backfire.`,
    `- No code, SQL, URLs, HTML, scripts, or arbitrary keys. Unknown keys are rejected.`,
    `- EVERY effect must be a JSON object with a literal \"type\" string from the allowed list. Never use a state id or a concept name as the effect type.`,
    `- Required effect shapes: state_add {type,stateId,ownerType,ownerId,parameters?,links?,reason}; state_parameter {type,ownerType,ownerId,stateId,key,delta OR value,reason}; state_transition {type,fromStateId,toStateId,ownerType,ownerId,reason}; position {type,organizationId?,title,holderId,authority,reason}; organization_found {type,organization:{id?,name,kind,placeId?},reason}.`,
    `- A bare effect like {\"debt-bondage\": ...} or {\"effects\":[...]} without a type is invalid and wastes the attempt.`,
    `- Text must use only declared role tokens or builtins {subject},{residence},{place},{school},{workplace},{age},{year},{child},{milieu},{context}.`,
    `- Do not change committed history; write opportunities, not decrees.`,
    ...(previousErrors.length > 0
      ? [
          `Previous attempt failed validation. Fix these errors:\n- ${previousErrors.slice(0, 12).join('\n- ')}`,
        ]
      : []),
    ``,
    `Example shape (values are illustrative, not facts):`,
    JSON.stringify(example, null, 2),
  ].join('\n');
  return [
    { role: 'system', content },
    {
      role: 'user',
      content: `Brief id: ${brief.id}\nProduce the JSON StatePack now.`,
    },
  ];
}

/** Deterministic, clearly-labelled scaffold. It is not presented as model content. */
export function fallbackStatePack(brief: StateContentBrief): StatePack {
  const stateId = brief.fallback.stateId;
  const definition: StateDefinition = {
    id: stateId,
    version: 1,
    packId: `pack-${brief.id}`,
    title: brief.title,
    description: brief.gap,
    owner: brief.owner,
    ...(brief.fallback.slot ? { slot: brief.fallback.slot } : {}),
    conflict: 'replace',
    tags: [...brief.fallback.tags, 'fallback'],
    parameters: { progress: { type: 'number', default: 0, min: 0, max: 100 } },
    durationMonths: {
      min: brief.fallback.durationMonths[0],
      max: brief.fallback.durationMonths[1],
    },
    modifiers: [{ kind: 'scene_weight', tags: brief.fallback.tags, multiplier: 1.25 }],
    ticks: [
      {
        id: 'annual',
        everyMonths: 12,
        outcomes: [
          {
            id: 'continue',
            weight: 1,
            text: brief.fallback.tickText,
            effects: [
              { type: 'mood', personId: '$subject', amount: 0.01, reason: 'state continues' },
              {
                type: 'state_parameter',
                ownerType: 'person',
                ownerId: '$subject',
                stateId,
                key: 'progress',
                delta: 5,
                reason: 'a year inside the state',
              },
            ],
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'reaction',
        onTags: [brief.fallback.reactionTag],
        chance: 0.5,
        effects: [
          {
            type: 'flag',
            personId: '$subject',
            flag: `${stateId}:reacted`,
            add: true,
            reason: 'the state answered a real event',
          },
        ],
        text: brief.fallback.reactionText,
        cooldownMonths: 12,
      },
    ],
    provenance: {
      kind: 'generated',
      author: 'deterministic-fallback',
      model: 'none',
      rationale: 'No model available; this is an executable scaffold, not LLM-authored content.',
    },
  };
  return {
    id: `pack-${brief.id}`,
    version: 1,
    title: brief.title,
    description: brief.gap,
    author: 'deterministic-fallback',
    model: 'none',
    sourceBriefId: brief.id,
    rationale:
      'Deterministic scaffold generated without a model. It is valid executable content but does not satisfy the LLM authoring requirement.',
    states: [definition],
  };
}

export async function generateStatePack(
  brief: StateContentBrief,
  existingStateIds: string[],
  world: WorldState,
  options: GenerateStatePackOptions = {},
): Promise<StatePackGeneration> {
  const config = modelConfig();
  if (options.forceFallback || !config.apiKey) {
    const pack = fallbackStatePack(brief);
    return {
      ok: true,
      pack,
      usedFallback: true,
      tokens: 0,
      attempts: [],
      validation: validateStateContentPack(pack, world, world.date, new Set(existingStateIds)),
      error: config.apiKey ? 'fallback forced' : 'no model credentials',
    };
  }
  const attempts: StatePackAttempt[] = [];
  let previousErrors: string[] = [];
  let tokens = 0;
  const maxAttempts = Math.max(1, Math.min(4, options.maxAttempts ?? 2));
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await chat(stateAuthorMessages(brief, existingStateIds, previousErrors), {
        conversation: `v4-state-author:${brief.id}:${attempt}`,
        maxTokens: options.maxTokens ?? 8000,
        timeoutMs: options.timeoutMs ?? 180000,
        json: true,
      });
      tokens += result.tokens;
      const parsed = parseModelJSON(result.text) as StatePack;
      const validation = validateStateContentPack(
        parsed,
        world,
        world.date,
        new Set(existingStateIds),
      );
      attempts.push({
        attempt,
        tokens: result.tokens,
        model: result.model,
        errors: validation.errors,
        warnings: validation.warnings,
      });
      if (validation.ok) {
        return {
          ok: true,
          pack: parsed,
          usedFallback: false,
          tokens,
          attempts,
          model: result.model,
          validation,
        };
      }
      previousErrors = validation.errors;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      attempts.push({ attempt, tokens: 0, errors: [message], warnings: [] });
      previousErrors = [message];
    }
  }
  const pack = fallbackStatePack(brief);
  return {
    ok: false,
    pack,
    usedFallback: true,
    tokens,
    attempts,
    validation: validateStateContentPack(pack, world, world.date, new Set(existingStateIds)),
    error: previousErrors.slice(0, 4).join(' | '),
  };
}
