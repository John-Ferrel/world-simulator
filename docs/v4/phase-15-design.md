# Phase 15 — Composable Story Engine & LLM Content Factory

Date: 2026-11-05  
Baseline: Phase 14 `e4edf63`  
Status: architecture frozen for implementation; results in `phase-15-report.md`.

## 1. Why this phase exists

Phase 14 made facts causal (`tags`, `historyRefs`, `sharedHistoryTag`) and made
long chains possible, but it still treats a life as a sequence of scenes. The
critique found three structural failures that content volume cannot fix:

1. **Nothing persists a role long enough to be consumed.** A scholarship, an
   apprenticeship, a marriage or a prison term is an event, not a thing that
   occupies time and keeps changing what can happen next.
2. **Content only composes through casting.** A kernel can reuse a person, but
   it cannot say "this person is a student with unpaid tuition, a secret lover
   and a curse; therefore these three otherwise unrelated scenes change."
3. **The LLM is restricted to filling templates.** It cannot propose a bounded
   mechanic, and the runtime cannot safely accept one.

Phase 15 adds the missing middle layer: **State**. It is not a second engine.
It is a persisted, typed mechanism layer that the existing Scene/Task/Kernel
pipeline queries and drives.

## 2. Options considered

### Option A — State-centric replacement engine

Convert Person/Organization/Project into generic entities with attribute bags
and a universal state machine, then reimplement scene scheduling around it.

- **Expression**: highest.
- **Cost**: duplicates the engine's casting, effects, history, macro and
  persistence; every existing kernel and every old save would need migration.
- **Risk**: high. The project already has a working world authority; replacing
  it would create the parallel engine the brief forbids.
- **Verdict**: rejected.

### Option B — More event recipes only

Keep the current scene model and add states as tags/flags plus many more
recipes.

- **Expression**: low. Tags cannot hold parameters, durations, slots, ticks,
  transitions or reactions; "education continuity" remains a sequence of
  unrelated events.
- **Cost**: low, but it spends content volume to hide an absent mechanism.
- **Verdict**: rejected.

### Option C — State as a mechanism layer over the existing engine (chosen)

- `StateDefinition` is authored/validated content. `StateInstance` is persisted
  world state owned by a Person, Organization, Household, Place, Region or the
  World.
- The existing `SceneDefinition` / `TaskDefinition` / `PlotKernel` remain the
  event vocabulary. They gain **conditions** (`hasState`, `attribute`) and
  **effects** (`state_add`, `state_remove`, `state_parameter`,
  `state_transition`) plus an optional **check** that branches outcomes.
- Existing `Person.education`, `Person.employment`, `Relation`, `Project`,
  `Organization` and `HistoricalProcess` stay authoritative for their own facts.
  A state never duplicates those values; it supplies the mechanism, duration
  and obligations around them and drives them through ordinary effects.
- Slots are content-declared conflict domains (education, employment, legal,
  health, residence, secret, power, wish). They are not a global schema.
- A state may be simple (a name + duration + one weight modifier) or complex
  (ticks, checks, transitions, reactions). Complexity is opt-in per definition.

**Why this fits this repository**: it reuses `SceneDefinition`, `EventEffect`,
`EventFact`, casting, agency, historical processes, macro state and the existing
PostgreSQL/JSON persistence. It adds one table for instances and one optional
field to the annual options. It is cheap when unused.

## 3. Runtime contract

### 3.1 Definition

```ts
type StateDefinition = {
  id: string;
  version: number;
  packId: string;
  title: string;
  owner: 'person' | 'organization' | 'household' | 'place' | 'region' | 'world';
  slot?: string;
  conflict?: 'block' | 'replace' | 'stack';
  maxStacks?: number;
  tags: string[];
  enterConditions?: SceneCondition[];
  durationMonths?: { min: number; max: number };
  modifiers?: StateModifier[];       // event weight / check bonus
  ticks?: StateTick[];                // periodic checks and transitions
  transitions?: StateTransition[];    // automatic condition-driven change
  reactions?: StateReaction[];        // respond to committed event tags
  exitWhen?: SceneCondition[];
  onEnter?: EventEffect[];
  onExit?: EventEffect[];
  provenance: StateProvenance;
};
```

A definition is data, not code. It may reference only the existing typed
condition/effect vocabulary. No model-authored string is executed.

### 3.2 Instance

```ts
type StateInstance = {
  id: string;
  definitionId: string;
  version: number;
  ownerType: StateOwnerType;
  ownerId: string;
  since: WorldDate;
  expiresAt?: WorldDate;
  parameters: Record<string, number | string | boolean>;
  sourceEventId: string;
  active: boolean;
  endedAt?: WorldDate;
  endReason?: string;
  lastTickAt?: WorldDate;
  tickCount: number;
};
```

Instances live in `world.states`. Persistence is one additive table
(`v4_states`), loaded with the other entity tables. Old saves have no states and
remain valid. Replay does not need a second narrative memory: every instance
creation/removal is recorded in a committed `EventFact.effects` entry and in
the instance's `sourceEventId`.

### 3.3 Annual lifecycle

1. **State tick pass** (after the year's scenes, before historical processes):
   expire due states, evaluate `exitWhen`, run due ticks with seeded d20 checks,
   apply tick effects, commit a `state_tick` fact per state-year with a concrete
   outcome. Ticks never block the clock.
2. **Event reactions**: after any committed fact, active states whose
   `reaction.onTags` / `onActionPrefix` match may roll once. A reaction commits
   its own fact with `causes: [triggeringEventId]`. Recursion is depth-limited.
3. **Scene eligibility/weight**: `hasState` conditions and state modifiers are
   read during the ordinary scheduling pass. They do not create a second
   candidate pool.
4. **Effects**: state changes are critical effects (validated before commit).
   A scene that says "enrolled" but whose state cannot be created is refused.

### 3.4 Slots

When adding a state in slot `S`:

- `block` (default): fail if another active state with the same owner and slot.
- `replace`: end the occupying state first, log `replacedBy`.
- `stack`: allow up to `maxStacks`, then fail.

Replacement is an authored consequence, not a silent field overwrite. The
committed event records both the removed and added instance ids.

### 3.5 Checks

`SceneDefinition.check` (and state ticks) use a deterministic d20:

```
roll = 1 + floor(rng()*20)
modifier = attributeBonus + skillBonus + state bonuses + history bonus
success if roll + modifier >= dc
natural 20 / natural 1 are critical
```

Attribute resolution reads `Person.attributes` when present, otherwise derives
a stable value from traits and skills. Content may branch to different outcome
ids for success, failure, critical success and critical failure. The check and
its modifiers are stored in the event trace, so a reader can see why an outcome
happened.

This is not a second resolution system: `selectOutcome` still returns a normal
`SceneOutcome`; the check only selects which one.

### 3.6 Non-person owners

Organizations, households, places, regions and the world can hold states
(e.g. `under_occupation`, `purge_ongoing`, `strike_wave`). Conditions on a
person's scenes can query their household/organization/region state. Tick facts
need a person subject; the engine anchors them to a leader/member/head of
household. A state with no living anchor still changes conditions/weights but
does not fabricate an event subject.

## 4. Wish compilation

A wish is still untrusted text. Phase 15 adds a bounded **wish state** layer:

- The deterministic compiler maps the wish to an archetype
  (`power`, `knowledge`, `love`, `wealth`, `revenge`, `freedom`, `faith`,
  `fame`, `craft`, `survival`, `adventure`, `none`), an intensity and a
  literal/ironic bias.
- It attaches a pre-authored `wish-*` state with parameters. The state provides
  opportunities and reactions; it does not grant an outcome.
- New wish mechanics come from the content factory as new state definitions +
  event kernels, validated and versioned. Runtime only sees the bounded schema.
- Real power requires real world records: a `position` effect creates/removes a
  Position in an Organization. Playing a king on stage only creates a
  `stage_king` state; it does not create state authority.
- Irony is produced by content outcomes (mistaken identity, puppet office,
  literal curse), not by a global "monkey paw" rule. A wish can also simply
  succeed.

## 5. Generation / runtime boundary

| Layer | May do | May not do |
|---|---|---|
| Author (LLM or human) | propose StateDefinitions, kernels, outcomes, parameters, text | write arbitrary effects, code, SQL, URLs or world facts |
| Validator | schema, bounds, references, compile, reachability dry-run | execute model text |
| Registry | version, hash, provenance, status, extension requests | mutate a running world |
| Runtime | evaluate typed conditions, roll, commit facts | call an LLM per ordinary person-year |
| Critic | read lives and propose fixes | edit world history |

The runtime content worker may request new content for a high-value situation
(wish, strange state combination, history fork). The result is a pack that must
pass the same validator and is published as new content; it never writes world
facts directly. If no model key works, deterministic authored content and
fallbacks keep the world running.

## 6. Historical layer

- Keep the existing CShapes/conflict and Vienna curricula as source data.
- Add a versioned historical index with explicit `sourceType`
  (`fact`, `inference`, `fiction`), coverage by country/city/person/event and a
  query API. Facts are never silently mixed with current-world facts.
- Historical candidates are emitted as ordinary content/scene conditions, not a
  scripted timeline. Strong inertia comes from weighting and from existing
  macro/historical processes.
- A low-frequency review (4–6 years) compares the current world to the index and
  records divergences. It may add new架空 candidates; it may not rewrite
  committed events or force a reset to the real timeline.
- A fork is durable: if a major intervention changes the conditions, later
  candidates are filtered by the actual world state.

## 7. Acceptance strategy

- Unit tests for definition validation, slot conflicts, ticks, reactions,
  checks, wish compilation and persistence round-trip.
- Integration tests that a state actually changes candidate eligibility and
  produces committed consequences.
- Content packs authored by independent agents, validated and compiled.
- Full lives read by an independent critic, not just test counts.
- Same-seed A/B: with/without a state, with different wishes.
- Real measurements: event counts, state ticks/reactions, coverage, 20k
  performance, zero unresolved tokens, zero post-death events.

## 8. Explicit non-goals

- No full economic/law/political simulation.
- No per-person LLM call.
- No universal entity rewrite or second event engine.
- No guarantee that every wish is literally achievable.
- No silent return to the real timeline after a fork.

## 9. Implemented refinements (post-review)

The first design draft lacked four things the independent mechanics review and
the content brief caught. They are now part of the implementation:

1. **Typed state links.** A state can declare `links` (`lover`, `creditor`,
   `eldestChild`, `patron`) and hold real ids. Effects can target them with
   `$link:lover`; a secret affair is not a string in a flag.
2. **Per-outcome state conditions.** `SceneCondition` supports `hasState`,
   `notHasState`, `attribute` and `position`; `PlotKernel` outcomes and the
   recipe kit can carry them. `position` only matches real `Position` records,
   never a stage title.
3. **Per-tick schedules.** `StateInstance.tickHistory` keeps a separate date per
   tick. A short 12-month tick can no longer starve a 60-month tick.
4. **Read-time effectiveness and preflight.** A state past `expiresAt` is
   ineffective even before the annual tick pass, and new critical
   state/position/organisation effects are preflighted before any of them
   mutates the world. `organization_found` + `position` in one fact is
   explicitly supported.

The content factory also has a deterministic fallback scaffold. It is labelled
as fallback and has no event kernels; it is not counted as model-authored
content. The actual Phase 15 packs were authored by LLM subagents, validated by
the same gate, and imported as static JSON.

## 10. Final interface names

- Types: `packages/v4/state/types.ts`
- Runtime/query: `packages/v4/state/runtime.ts`
- Pack validation/registry: `packages/v4/state/registry.ts`
- Engine effects/conditions/ticks/reactions: `packages/v4/engine.ts`
- Wish compiler: `packages/v4/wish-compiler.ts`
- Content factory: `packages/v4/content-factory/`
- Historical index: `packages/v4/history-db/`
- Authored/generated state content: `packages/v4/content/states/`
- Consuming kernels: `packages/v4/content/kernels/recipes/batch15-state-kernels.ts`
