# Shared Living World — Architecture and domain contracts v2.0

## 0. Design constraint

**Person-first, fast, creative, constrained-start, radically-autonomous, event-ending, harsh** in a single persistent shared world. Every mechanical subsystem must eventually yield changes to real people and real geography. Narration is a read model, never the authority.

The architectural unit of work is not “LLM writes the next paragraph”. It is **a causally committed transition from world state S(t) to S(t+Δ)**. LLM can supply proposed decisions/novel semantic definitions, and may synthesize retrospective narration; it cannot assert transitions as facts.

## 1. Processes and deployment

```text
[ browser: React + PixiJS ]
   | HTTPS (commands / queries), SSE (append-only event cursor)
   v
[ api: Fastify ] -- auth, character creation intake, read views, replay, archive
   | command inbox / read model
   v
[ PostgreSQL ] <--------- [ llm worker ]
   ^         ^                 |
   |         | verified proposal / narrative result (not world mutation)
   |         +-- durable bounded jobs and model audit records
   |
[ simulator: single active authority / leader lease and fencing token ]
   | scheduler -> world systems -> person policies -> plan compiler -> resolver
   | atomic state delta + State Journal + historical event + outbox
   +--> snapshots / indices / read projections
```

Use one **pnpm TypeScript monorepo** and one production compose deployment. No microservices-by-default; different processes are for isolation and failure handling, not independent domain ownership. The canonical simulator core must run headless with no network/DB requirement.

Suggested runtime libraries: Fastify, PostgreSQL (SQL migrations; Drizzle acceptable), TypeScript, Zod or equivalent explicit JSON schemas, React/Vite, PixiJS, Vitest, fast-check, Playwright. SQL-backed work queue; do not add Redis unless a measured requirement justifies it. Avoid importing large, incompatible third-party agent harnesses into core.

## 2. Core state: types and invariants

Domain objects (IDs never recycled):

```ts
type World = {
  id: WorldId; pack: {id: string; version: string};
  seed: string; simTime: SimMinute; revision: bigint;
  status: 'booting'|'running'|'ending'|'archived';
  terminalReason?: 'civilization_collapse'|'transformation'|'catastrophe'|'horizon'|'operator';
};

type Region = {
  id: RegionId; biome: string; tiles: TileSetRef;
  neighborIds: RegionId[]; routes: RouteRef[];
  naturalStocks: StockLedger; demographics: DemographicCohorts;
  controllingPolityId?: PolityId;
};

type Person = {
  id: PersonId; observerOwnerUserId?: UserId;
  birth: SimMinute; death?: SimMinute; locationId: LocationId;
  ancestry: PersonId[]; originCohortId?: CohortId;
  traits: TraitProfile; values: ValueProfile; drives: DriveState;
  skills: SkillState; holdings: HoldingsRef;
  relationships: RelationRef[];
  beliefs: BeliefRef[]; memories: EpisodicMemoryRef[];
  goals: GoalRef[]; commitments: CommitmentRef[]; policyProfileId: string;
  lifeStatus: LifeState; appearance: PaperDollState;
};

type Organization = {
  id: OrgId; kind: string; foundedAt: SimMinute;
  membership: MembershipRef[]; offices: OfficeRef[];
  treasury: StockLedger; property: AssetRef[];
  interests: GoalRef[]; influence: DomainInfluence;
  institutionalRules: InstitutionRuleRef[]; state: OrgLifecycle;
};

type Claim = {
  id: ClaimId; proposition: TypedProposition;
  sourceIds: EvidenceRef[];
  truth?: 'true'|'false'|'unknown'; // canonical fact evaluation, not the holder's confidence
};

type Belief = {personId: PersonId; claimId: ClaimId; confidence: number; lastUpdated: SimMinute};
```

**Key design note:** any `InstitutionRule`, `PolicyProfile`, `Process` or `Technology` needs **both** semantic descriptions and typed executable hooks. No untyped JSON blob can grant new in-world power.

Invariants:

- Alive persons have a valid location, age and valid population provenance; dead persons never issue new voluntary actions.
- Family and historical event IDs never silently change; marriage may change, ancestry cannot be overwritten by an LLM.
- Every inventory/treasury movement debits a source and credits a destination, or explicitly attributes creation/destruction to a permitted production/consumption mechanism. Track units.
- A region cannot have two exclusive sovereign owners at the same canonical instant. Contested control is a distinct typed condition.
- An act of government requires actor/institution authority and resources; a LLM-proposed law is not effective just by being proposed.
- A user's ownership can affect *read access and optional LLM deliberation priority*, **not** survival probabilities, resource endowments or social success.
- World packs cannot redefine the engine's core consistency, storage or security invariants.

## 3. Fidelity and time

Use **three scales of simulation**, plus cognitive events:

| Layer | State | Cadence | Typical transitions |
|---|---|---|---|
| Macro world | geography, resources, population, routes, polity capacity, disease/climate (pack-specific) | monthly or seasonally | production/consumption, migration, prosperity, environment |
| Meso society | settlements, organizations, institutions, technologies, factions | periodic plus scheduled | formation, recruitment, budgets, policies, conflict, adoption |
| Micro person | named individuals, households, local encounters, plans, memories | event driven, personal timeouts, life milestones | bonds, betrayal, work, movement, harm, goals |
| Deliberation | focused person's/leader's complex decisions | when triggers and budgets allow | novel plans, beliefs, institutions, life-changing pivots |

Bulk non-named residents exist as **cohorts** (place, demographic bands, skill/occupation/culture distributions). Named persistent persons are instantiated from cohorts or legitimate births, with cohort ledger changes. Ordinary named persons can be low-frequency; focal persons receive more detailed *observation and decision modeling*, not lower risk or guaranteed significance.

Temporal scheduler uses deterministic order `(sim_time, phase_priority, stable_sequence, entity_id)`. `sim_time` is simulation time, independent of wall-clock; seed and recorded LLM outputs define replay. Per-entity derived PRNG streams avoid global random-sequence coupling. Scheduled event processing is bounded per batch, and a no-progress safety guard prevents infinite same-time loops.

**Phase order per logical interval:**

1. Lock scheduler batch and ingest already accepted external Commands that arrived within their deadline; resolve one canonical ordering.
2. Resolve due life/movement/legal events from previous commitments.
3. Advance resources, settlements, trade and population (including birth/death) for the interval.
4. Apply social and organizational processes, institutions, diffusion and conflict front lines.
5. Recompute individual circumstances and beliefs from *perceived* events; activate goals and decisions.
6. Resolve due valid planned actions, produce canonical state transitions, schedule follow-up processes.
7. Evaluate world terminal conditions from committed state and sustained intervals.
8. Atomic commit of state delta, State Journal, historical events and outbox, then optionally checkpoint.

Phases may be implemented in more granular events for accuracy; never allow observation order to make world facts contradictory. The scheduler must be deterministic given same inputs.

## 4. People: causal agency rather than traits-to-random-actions

**Agent cognition contract**

```text
Observe(world slice the agent could know)
 -> Update beliefs and memories
 -> Update drives/goals/commitments
 -> Generate affordances (physically/socially feasible alternatives)
 -> Decide (rule policy OR selectively LLM)
 -> Compile plan to typed commands
 -> Reserve / execute steps over time
 -> Feedback becomes memory and changed goals
```

- Goals have stable ID, inception cause, strength, horizon, progress, constraints, status and abandonment reason. A remembered promise can persist for decades or be broken with a logged cause.
- Drives and traits affect *priorities, interpretation, persistence and risk tolerance*, not unconditional outcomes. Belief can be false; observation must be restricted to known facts and plausible rumor routes.
- **Radical autonomy** means goals, loyalties and traits are editable by world experience. Changes need `trigger_event_ids` or gradual `experience_span`; no periodic personality reseed.
- Plans have intermediate steps, known assumptions, resource reservations, dependencies, cancellation conditions and deadlines. Interrupted plans can fail or be revised rather than magically finish.
- Routine choices are deterministic or probabilistic policies. Reserve LLM for novel contexts, clashes of core values, organizational strategies or significant identity revisions; use a low-cost fallback on missing/invalid model output.
- Social relationship emergence requires plausible co-location/contact channels, time, familiarity and reciprocal responses. Do not force two user-owned people to meet because their creators exist.

The engine does not have to model every conversation utterance. An encounter may be a discrete `social_interaction` with participants, context, change in trust/belief/relationship and an event summary. Model-written dialogue is optional read-only narration.

## 5. World dynamics: small primitives, expressive processes

The fundamental semantic taxonomy is **not a list of fixed story verbs**:

1. **Actions:** bounded one-time intents (`move`, `exchange`, `join`, `publish`, `petition`, `attack`, `make_commitment`), which compile to effects.
2. **Processes:** timed ongoing transformations (`trade_loop`, `cultivate`, `recruit`, `spread_belief`, `campaign`, `research`, `fight`, `illness_progression`). Every process has entry requirements, upkeep, resource flow, progress, expiration and failure handling.
3. **Institutions:** durable constraints, privileges and incentives (`inheritance_rule`, `tax_policy`, `religious_norm`, `organization_charter`, `travel_restriction`) with membership/jurisdiction, activation/deactivation, compliance and effect caps.
4. **Agent policies:** behavior biases and strategies (including culturally adopted norms) that influence future decisions but cannot bypass action validators.

The generator can compose predefined **effect primitives**: stock ledger, movement/travel path, social ties, information flow, population/life, member/office change, territory/control influence, production/research modifiers, permission/legal change, and scheduled obligations. This grammar also supports predicates, bounded triggers, effect scope, duration, resource cost, cooldown, decay and explicit version.

**Never accept generated JavaScript, Python, SQL, eval, arbitrary web calls, or recursively generated unbounded loops as in-world rules.** All World Pack executable extensions are authored/tested code shipped with pack versions, not dynamically installed by users.

### Example: generated grain guild

```json
{
  "definition_type": "institution",
  "kind": "trade_guild",
  "creator_person_id": "person_41",
  "jurisdiction": ["settlement_3"],
  "entry": {"op":"requires_members", "min":3},
  "upkeep": {"resource":"coin", "per_month":12},
  "process_refs": ["pooled_buying", "route_transport", "recruitment"],
  "adoption": {"channel":"membership", "max_growth_rate":0.15},
  "termination": {"op":"insolvent_for_months", "value":6}
}
```

The guild **does not automatically succeed**. It must recruit, acquire stock, own assets, face risks, and keep its treasury balanced. It may change supplies and prosperity over years; its leader may die and the guild can keep operating. If an unknown idea cannot be compiled, the engine records it as `proposed_idea` / `unsupported_effect` / `failed_attempt` rather than materializing magic.

### Minimal connected world-system contracts

- **Economy:** stocks, labor, production and upkeep, prices as signals, routes/transport capacity; scarcity shifts living costs, opportunities and migration.
- **Demography:** age, mortality, births and cohort shifts; cross-check named/aggregate residents; households and lineage.
- **Politics:** organized interests, membership, legitimacy/support, revenue, administrative reach, force and jurisdiction; policies need actual implementers and persistence.
- **Conflict:** mobilization takes people and stocks; success depends on logistics, geography, organization and opposition; territory, casualties, displacement and social memories update together.
- **Information/knowledge:** ideas, evidence, messages/rumors, access channels, adoption/rejection by individuals and institutions. A rumor does not become canonical truth via repetition.
- **Environment/geography:** transport paths, climate/hazards and regional resources; settlement/site development affects visible map state.

Each system **must publish causal events consumed by at least one other system and by personal life narratives**. Avoid independent “random war”, “random marriage”, “random famine” log generators.

## 6. LLM intent/definition protocol

Two separate paths:

**A. Character decision**: structured action/goal update proposals constrained by sensed world state and allowed capabilities.

**B. Creative definition**: structured new idea, organization, custom, research direction or institution; must compile to typed executable process/institution or remain a *non-implemented* concept.

Example simplified contracts (implementation must use versioned runtime schemas):

```ts
type DeliberationTask = {
  jobId: string; actorId: PersonId|OrgId; kind: 'decision'|'creative_definition';
  observedAt: SimMinute; deadline: SimMinute;
  requiredEntityVersions: Record<string, number>;
  perception: AgentObservation; allowedCapabilities: string[];
  maxProposalEffects: number; promptVersion: string;
};

type ActionProposal = {
  jobId: string; actorId: string; intention: string;
  goalChanges?: Array<{goalId?:string; operation:'adopt'|'modify'|'abandon'; rationale:string}>;
  steps?: Array<{operation:string; args:unknown; preconditions:unknown[]; horizon:SimMinute}>;
  definition?: unknown; // validated against a versioned process/institution schema
};

type CompiledCommand = {
  idempotencyKey: string; actorId: string;
  capability: string; args: TypedCapabilityArgs;
  requirements: WorldPredicate[]; authorityScope: string[];
  expiry: SimMinute; cost: StockDelta[]; sourceProposalId?: string;
};
```

Pipeline:

1. Simulator creates bounded **perception snapshot**, with no unauthorized secrets and an explicit allowed-capability list, then stores a durable LLM task.
2. LLM worker independently invokes configured model and returns **candidate proposal only**, recorded with model/version/usage. Treat prompt text, character backstories, rumors and output as untrusted data.
3. Typed schema validation, constrained compiler and policy validation reject unknown operation names or unsafe/unbounded definitions.
4. At scheduled action time, authority verifies **entity-dependent versions and current preconditions**, not global world revision equality. Stale proposals may be replanned **if budget and deadline allow**; otherwise use baseline policy or explicit failure.
5. Single simulator authority commits actual effects and social/environmental feedback; job idempotency ensures late, repeated, out-of-order replies are harmless.
6. The outcome triggers memories and follow-on events. LLM workers never write world tables, even indirectly.

Time deadlines and bounded job cost are mandatory. World simulation is never blocked on a single model call. A proposal may have never been tried or may fail; do not confuse model intent with outcome.

**Cost and fidelity policy:** operator-configured world+wallclock token/currency budgets; adaptive priority for current consequential crises, organization leadership, and focal characters; still no in-world outcome boost for player-owned characters. Persistent memoization for reusable semantic descriptions and scoped retrieval of relevant events. Log actual cost/usage and fallback rates.

## 7. Canonical facts, history and replay

Three separate storages:

- **Operational state:** current normalized projection/loaded simulation state. Partition or index by region, time and entity ID; keep only active working sets in memory.
- **State Journal:** every durable change required to restore exact canonical state, including deterministic command inputs, chosen RNG stream/outcomes, per-commit effects or sufficient delta, and version/checksum. Transactional with world revision.
- **Historical Event Ledger:** selected meaningful historical facts with event ID, participants, location, time, causal parents, consequences, significance, visibility. May aggregate thousands of small simulation transactions into one player-facing development; must not invent transitions.

`Narrative` is a projection of Historical Event Ledger and character beliefs. It includes source event IDs, perspective, language, typed entity references and generator version. AI prose may add style but not new *facts*. Claim-level hallucinations should be checked against structured evidence when possible; otherwise emit conservative template summaries.

**Cause is not just previous in time:** attach actual triggers, satisfied conditions, commitments or dependency links at resolution. Use `cause_ids` only for supported links. Narrative may say “influenced by” for uncertain causality but not “caused by” solely from temporal proximity.

**Replay:** event timeline per person and coarse annual/periodic map projections; cannot be implemented by asking LLM to reconstruct missing past. Periodic state snapshots plus complete State Journal permit recovery; historical map views may use independent per-period read projections. Model outputs are recorded input facts for deterministic replay. Historical prose may be re-rendered but canonical facts cannot.

**Persistence atomicity:** transaction updates state rows, world_revision, journal, event ledger and outbox. Publish SSE after commit. Client reconnection uses cursor (`Last-Event-ID` or query cursor) and backfill; read authorization by viewer scope. If crash occurs after DB commit but before push, outbox retries. If crash occurs before commit, retry idempotent command.

**Failover:** one active simulator writer with lease and monotonically fencing epoch. Old writer commits fail on DB-side fencing check. A recovered instance loads a valid checkpoint, replays journal if necessary, resumes scheduled tasks and never replays effects twice.

## 8. Event-driven world ending

The world-ending engine evaluates **committed aggregate state** only. World pack declares types and thresholds:

```ts
type TerminalRule = {
  id: string;
  mode: 'sustained_threshold'|'irreversible_transition'|'specific_catastrophe';
  predicate: WorldPredicate;
  sustainForMonths?: number;
  requiredEvidenceKinds: string[];
};
```

Example: sustained global collapse if inhabited population across all regions remains under a configured proportion of the world's initialized baseline for 12 months **and** the cause involves logged widespread famine/war/disease/resource failure. Only specific irreversible states should end the world; a single country falling is not terminal.

State machine: `running -> ending -> archived`. `ending` closes creation/commands, resolves already due transactions under a defined cutoff, seals final journal/checkpoint, summarizes ending from actual events, and exposes a read-only archive. Then the epoch controller can start the next new world, with a new seed and *same or explicitly configured* world pack. The default max horizon is 300 years, archive reason `horizon`, clearly distinguished from narrative ends. World status transitions are idempotent and fenced.

A deliberately cruel setting can destroy civilizations, but an LLM sentence cannot fire an end condition.

## 9. Web and API read-model contracts

A minimal coherent API (agent may adjust route naming without changing semantics):

```text
GET  /world/active                       # status, year, pack, public summary
GET  /world/map?at=<time>                # current or archived/replay projection
GET  /world/events?cursor=<id>           # bounded public, ordered, typed refs
GET  /persons/:id                        # current/lifetime biography and public state
GET  /persons/:id/chronicle?cursor=...   # personal historical event index
GET  /persons/:id/catch-up?after=...     # last-seen-to-now summary from facts
POST /persons/creation-draft             # LLM-assisted, no world mutation
POST /persons                            # validated creation command
GET  /preview/:type/:id                  # tiny hover/tap preview, scoped
GET  /archives                           # read-only past worlds
GET  /stream?cursor=...                  # SSE outbox/cursor
```

User identity required to create; public and owner-only views differ. `/stream` should not expose private thoughts/beliefs unless the viewer is authorized; even owners do **not** automatically get omniscient access to the person's secrets if the game's perspective is defined as character-observable.

UI can persist local read cursor. The right map displays world state at selected replay time if historical projections exist; otherwise state clearly that it is current. Clicking a log reference presents a **preview overlay only**. Never add deep links, detail panels, navigation and editable country controls by default.

Map implementation: PixiJS renders pre-generated terrain tiles/vector-derived chunk textures, settlement and territory overlays, active-person location and a small number of significant regional indicators. Geography simulation runs on a graph of regions/routes, not a per-NPC pixel physics loop. Sprite paper doll uses composited assets; appearance can change with age/wealth/role and must be grounded in person state.

## 10. World Pack interface

World pack contains:

- Manifest/version, setting and era; supported species/life rules, map seed and projection, settlement seeds, cohorts, cultures/polities, organization kinds.
- Static executable **developer-owned** mechanics modules selected by typed capability identifiers; approved action/process/institution/effect schema.
- Data-only parameters (rates, constraints, costs, policy templates, tech/abilities, terminal conditions).
- Visual assets, narrative voice/content constraints and creation affordance schema.

Creative definitions can select and parameterize only declared mechanisms. No user-authored runtime code. Switching packs occurs only when initializing a new world, not during a running world. Every saved world pins pack and simulation version for replay compatibility.

## 11. Security, moderation and operability

- Authn, bounded creation, rate limiting, role scopes, schema validation and sanitization for prompts and output. User prompts are *data* and may include attempted instruction overrides; never place them in the developer/system control plane unquoted.
- Moderation of generated public text, safe handling of minors and severe violence; preserve necessary canonical state as structured facts without gratuitous explicit narration.
- No external user-supplied code, no arbitrary tool/network access for model, no model-controlled world DB credentials.
- Admin CLI/dashboard can inspect time, revision/lease, sim lag, queue depth, LLM failure/cost, event density, population and economy invariants, current terminal state; pause/resume/backup/close world with audit.
- Record schema/world pack/software versions, observable tracing IDs (`job`, `proposal`, `command`, `commit`, `event`, `narrative`) and periodic checkpoints.

## 12. Architectural non-negotiables

1. Canonical state has exactly one writer at any moment. All writes are journaled and atomically committed.
2. Novel model-written concepts do not assert actual results or abilities unless compiled and validated into durable executable effects.
3. Personal goal/identity change is causal and persistently recorded; player-created characters are **not protected protagonists**.
4. The fast shared world is authoritative; private replay is read-only and can outlive a world season.
5. A world can end from state-driven events; calendar horizon is labeled `horizon`, not apocalypse.
6. Simulated rules, not narrative prose, cause geography, resources, life/death, politics and technological consequences.
7. The whole game must be deployable with one configurable LLM API; it must run without that API via baseline policy, with reduced creativity clearly documented.

## 13. Two representative causal traces (requirements, not scripted plots)

### A. Person-first: identity change through war

1. A transport disruption raises food scarcity in region R; a local organization raises requisition/levies in response to war.
2. A focal person's household loses assets or a relative; canonical injury/death/ownership effects are committed.
3. Person receives a witnessed-event memory and a belief about responsibility (which may be wrong based on information exposure), changes trust in an authority and reevaluates goals.
4. Person attempts to flee, organize, collaborate or retaliate; feasibility depends on skills, local contacts and transport. Failure is allowed.
5. These choices affect local organizations, kinship networks and other people's opportunities; the person's chronicle includes **personal loss, personal choice and world consequence**, not only the war headline.
6. If beliefs/values change profoundly, record memory and goal transition links. If the person dies, plans terminate and surviving people retain consequences; **no last-minute rescue scene**.

### B. Creative growth: individual insight becomes a durable norm

1. A character or organization recognizes a labor/cultural problem, proposes an unusual cooperative arrangement through LLM creativity.
2. Compiler maps proposal to an approved organization type + membership admission + dues + pooled production/transfer process + optional cultural practice modifier.
3. Cost/eligibility checked; real participants consent or refuse based on their own policies and incentives. The proposal can fail.
4. Once founded, process changes wages/resource flow and local social contact patterns over months. Neighboring cities may copy it if information spread, incentives and local authority permit.
5. Other people react to the new institution with counter-organization, adoption, migration or policy change. These are subsequent independent actions, not an LLM-generated success narration.
6. Founder may die or turn against their own creation. Institution continues or collapses according to membership, upkeep and political pressures. An archive can trace downstream effects with actual causal links.

## 14. Bounded memory and scaling policy

- Episodic memories are immutable references to witnessed/believed events plus bounded semantic summaries; retrieve recent, salient and goal-relevant memories rather than sending an entire life transcript to each LLM call.
- Maintain periodic deterministic summaries/profiles of low-frequency agent history, but do not delete the canonical events or replace provenance with ungrounded prose. For old individuals, archive inactive goals and compact low-salience cognition, not ancestry or permanent identity.
- Store and update aggregate region/city stocks in batch; index relationships, scheduling and social proximity; lazy-load noncurrent historical figures.
- Backpressure: use separate bounded queues for cognition, creative definition and narrative (narration may lag without slowing world). Prioritize active crisis decisions while preventing a single organization/player from monopolizing model budgets. Report dropped/deferred work honestly.

## 15. Architectural reading (informative, not a dependency)

- AI Town: https://github.com/a16z-infra/ai-town/blob/main/ARCHITECTURE.md — useful precedent for engine-owned state, player/agent command inputs and asynchronous LLM actions. Its documented all-state-in-memory / small-world design does **not** meet our intended scale; do not transplant it unmodified.
- Concordia: https://github.com/google-deepmind/concordia — useful agent/environment/GM decomposition; its LLM-mediated environment resolution is *not* our canonical authority mechanism.
- Historical Figure background: https://dwarffortresswiki.org/index.php/Historical_figure — reminder to separate tracked identities from aggregated populations.
