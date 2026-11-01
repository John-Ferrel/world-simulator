# Shared Living World — Executable Coding Spec v2.0

> Read `PRODUCT_SPEC.md`, `DECISIONS_AND_CONFLICTS.md`, `ARCHITECTURE.md`, then this file. Deliver **one functioning, deployable complete release**, not demos that the user must approve one by one. Integrate and automatically check each milestone yourself. Do not claim tests passed without actually running them.

## 1. Technology and repository

### Default stack

- **Node.js + TypeScript**, pnpm workspaces, strict TypeScript config, ESLint/formatter, Vitest/fast-check, Playwright.
- **Fastify** for API; **PostgreSQL** for canonical tables, journals, snapshot metadata, background jobs and durable outbox. Drizzle or equivalent typed SQL migrator.
- **React/Vite + PixiJS** for web observer and map. CSS/SVG/HTML for the non-map interface. Do not use engine tick as browser animation frame.
- **LLM adapter** with OpenAI-compatible HTTP endpoint config, model-specific structured-output handling, strict timeout, retry/expiry, job queue and accounting. Mock/stub adapter used for automated tests; external API key only required for real generative mode.
- Docker Compose: database, api, simulator, llm-worker, web (production server/static), migration/bootstrap routine.

### Repo shape

```text
apps/
  api/                       # auth, HTTP endpoints, SSE, read models
  web/                       # person / chronicle / map and creation flow
  simulator/                 # one world writer, clock, events, end lifecycle
  llm-worker/                # bounded prompts and typed proposal output
packages/
  contracts/                 # ids, versioned schemas, action/commit/event formats
  simulation-core/           # pure state transition, time, PRNG, scheduler
  world-systems/             # demographics, geography, economy, society, conflict
  cognition/                 # memories, goals, perception, social, decision policy
  dynamics/                  # bounded action/process/institution compiler/executor
  narratives/                # relevance, catch-up, grounded text, typed refs
  world-packs/               # starter pack, mechanics registration, assets manifest
  storage/                   # Postgres adapters, journal, snapshots, read models
  visuals/                   # paper doll atlas, sprite descriptor, map tile pipeline
infra/
  docker-compose.yml
  migrations/
docs/
  plan.md
  decisions/
  implementation-report.md
  deployment.md
  operations.md
```

Use explicitly versioned package contracts. Keep simulation-core and domain rules testable without Postgres, web, LLM or network. Avoid split-brain ownership of domain state.

## 2. Implement real world semantics, not a set of disconnected modules

### 2.1 World terrain and persistence

- Generate and persist a fictional continent with natural regions, path adjacency, resource distribution, 30–50 settlements, 5–8 powers and meaningful geography. Use reproducible world seed and assets. Do not hardcode fake map labels disconnected from states.
- Map is chunk/tiles or raster tiles, with polity/region/settlement overlays generated from actual simulation state. World-pack map presentation must not determine economics/war physics.
- Implement cohorts (50,000+ aggregate population load target), named individuals (~1,000 persistent named load target), households, organizations and history indices. Instantiate users from a valid existing cohort, preserving population accounting.
- State-change versioning, atomic journaling, checkpoint/restore and world pack version pinning are required **before** enabling asynchronous model actions.

### 2.2 Strongly coupled world systems

Implement these systems with typed inputs/outputs and causal effects, not just periodic random events:

1. **Demography/lifecycle:** age, illness mortality, fertility, births, death, kinship, inheritance, named/cohort balance, migration.
2. **Geography/travel:** routes, distances, restrictions, transit risk, location, trade/disease/war movement.
3. **Economy:** stocks, production/consumption, transport, basic prices, labor participation, settlement prosperity, taxes/treasury.
4. **Social relations:** contact opportunities, trust/loyalty/attachment/rivalry, family, friendship, partnership, recruitment, rumor.
5. **Politics/organizations:** membership, assets, leadership, legitimacy, influence, policies, succession, dissolution and split, enforcement of laws.
6. **Conflict:** escalation from incentives/disputes, recruitment/mobilization and supply, casualties and displacement, territorial change, power/legitimacy feedback.
7. **Knowledge/culture/technology:** learning, communication, research progress, beliefs with provenance, adoption thresholds, normative effects on future behavior.
8. **World terminal:** sustained rules, evidence, end state sealing and next epoch creation.

Each system must have a documented dependency/feedback into others. The coding agent must write `docs/world-feedback.md` listing **concrete bidirectional consequence loops** implemented in code, e.g. scarcity → livelihood → unrest → coercion/taxation → scarcity; friendship → collective action → reform → social opportunity → new relationships. A subsystem that only emits prose is incomplete.

### 2.3 Cognition and relationship fidelity

- Define `Goal`, `Commitment`, `Belief`, `Memory`, `Relationship` as durable entities with IDs and update events.
- Include cue-driven deliberation: major loss, betrayal, severe stress, new relationship, migration, economic shock, political opportunity, success/failure, identity conflict. No random “yearly personality rewrite.”
- Implement rule-based baseline policy for ordinary life decisions; LLM proposals may alter goals, strategies, doctrines and policies but still depend on capabilities and state.
- Long-term multi-step plans reserve required resources and can be interrupted. Failed/abandoned goals have causes. A major personality transformation must include memory/event references (or explicitly bounded long-term environmental pressure).
- Social encounter index uses shared geography, institutions, occupation, kinship and network overlap; it cannot magically connect everyone in the world. Two creator-owned characters are ordinary potential participants.
- Character death closes plans and living-only duties; organizations may appoint successors and relationships/memories of others still point to the deceased.

### 2.4 Generated dynamics

- Implement versioned Action, Process, Institution, and AgentPolicy grammars. Unknown actions **never** invoke arbitrary model-created SQL or custom executable code.
- Typed compiler from `ActionProposal` or `CreativeDefinitionProposal` into capabilities with preconditions, cost, authority, effect bounds and follow-up schedules.
- Process lifecycle: establish → run in bounded time steps → consume upkeep → propagate/adopt → succeed/fail/decay/dissolve. Durable semantics survive restarts and LLM outage.
- Implement at least a complete **social institution path** (new guild/association), a **knowledge/technology path** (research innovation within world pack capabilities), and a **policy/cultural diffusion path** (new norm affects future actor behavior). These are **integrated mechanics**, not hard-coded story examples.
- A model can *propose* a novel magical idea; unless supported by the pack, its result must be unimplemented belief/aspiration rather than newly functioning magic.

### 2.5 LLM worker contract

- Character-creation drafting supports natural-language details with explicit acceptance/normalization results before committing.
- Perception assembly respects what actor can know. Prompt includes subjective beliefs (with confidence) distinct from canonical facts the actor has learned.
- Separate bounded jobs for personality decisions, organization strategy, innovation, and narrative summaries. Do not eagerly run LLM for all named people per month.
- Parse and validate schema, reject invalid or budget-exceeding outputs, capture model/version/prompt version/usage, idempotency keys, entity-dependent version checks and hard simulation-time deadlines.
- Worker writes proposal or narration **in non-canonical tables**. Only simulator changes world. Fallback baseline policy does not require API access; real generative mode requires a configured model/key and reports availability honestly.
- Narratives generated from event facts/knowledge; public logs must not expose private model context or print unverified LLM assertions as objective history.

### 2.6 Web UX

- Show active world and public chronicle without login; creation requires account.
- Left pane: configurable composited pixel character, body/attire/age/title/condition, with actual state updates, not a placeholder unrelated to state.
- Center pane: person-centered log with quiet-life summaries, turning points, relationships, context-specific world events; typed reference previews (hover/tap); “Since last visit” and read-only life replay. The log is the primary screen area.
- Right pane: pixel map with location marker, polity borders, settlement changes and regional events; current/replay map time must be clear, and any missing historical map projection must be labeled rather than fabricated.
- No side game UI for commanding armies, editing personalities, managing factories or clicking deep into detail views. In-world labels can have tiny previews only.
- SSE new event stream with monotonic cursor and reconnect/backfill; paginate past history. 100 simultaneous viewers target.
- Archive screen is read-only for past-world histories. World ending displays a grounded summary and transition to new shared epoch.

## 3. Integration path and hard exit conditions

Milestones are **implementation dependency order**, not invitation to ask for manual approvals. One integrated codebase remains bootable at every step.

| Phase | Build | Hard exit criterion (agent-run) |
|---|---|---|
| **M0 Contract and environment** | schemas, IDs, world pack spec, logical clock, migration/bootstrap, compose/CI, precise engine protocols | builds; migrations run; one active world invariant; simulator core pure tests |
| **M1 Canonical simulation** | seeded world, populations/persons, society, organizations, geography, economy, politics/conflict and causal history | headless evolution changes real state across coupled systems; no mock log substitutes |
| **M2 Dynamic behavior + LLM** | goals/memories, baseline policies, bounded proposals, action/process/institution compiler, async jobs, fallback | changes in source events alter real future behavior; generated institution persists with LLM off |
| **M3 Game presentation and multiplayer** | creation, auth, 3-pane web, sprites, map, chronicle, previews, replay and catch-up, simultaneous users | browser end-to-end reads actual server state; two users' linked events share one event ID |
| **M4 Ending, archive and reliability** | world terminal state, archive next epoch, recovery/replay, backup, observability, full-system tests, deployment docs | event/horizon terminal paths verified, no double world writers, restart/reconnect pass |
| **M5 Release and report** | final app/pack, performance and quality tuning, issue fixes, reports, explicit limits | acceptance matrix filled with actual commands/results and honest failures |

Do not stop after M1 and call it an MVP. Do not substitute a cardboard UI plus random paragraphs for M2/M3. If environment/cost blocks real API or deployment, continue with all local work and mark externally blocked items explicitly.

## 4. Automated verification matrix (agent owns all of it)

### 4.1 Mechanics and property tests

- State invariants for population cohort transfers, inventory debit/credit, valid lineage/death, membership, exclusive territory, legal authority, resource costs and no duplicate scheduled executions.
- Seeded deterministic comparison: same world-pack + seed + commands + recorded model proposals + binary/version must produce identical canonical state checksums at checkpoints.
- Metamorphic tests: altered valid context (food shock, social network split, leader's death) changes relevant downstream probabilities/events, rather than merely the prose.
- Wrong/unsupported LLM proposal is rejected without canonical side effects; no generated code execution; fallback continues simulation.
- A generated process/institution persists, affects later production/social/governance state and decays under upkeep; switching off the LLM does not freeze or delete it.
- Beliefs can disagree with truth; rumor can spread without silently changing canonical `Claim.truth`.
- World-level ending occurs for intentionally induced legitimate global terminal state; local city collapse alone does not end the world. Horizon archiving remains distinct from narrative end.

### 4.2 Persistence and concurrent authority

- Power-cut/fault injection at pre-commit/post-commit/publish points; restore exact state, no lost or duplicate effects.
- Stale/duplicate/out-of-order LLM job results cannot alter already committed world history.
- A second simulator with stale fencing epoch cannot commit.
- Import/export/backup/restore archive preserves event source and person/organization references.
- Two users creating at near the same wall time cannot double-reserve cohort population or bypass 1-living-character limit.

### 4.3 Person-first and harsh behavior tests

- A high-salience personal loss can change memory/goals/relationships and trigger a non-scripted plan; changes have supported event IDs, not personality reseed.
- Multiple runs/seeds include plausible early deaths, peaceful lives, failed ambitions and outcomes harmful to focal characters. **Do not** hardcode a quota of deaths, horrors or “stories per user”; use distributional diagnostics to spot implausibility.
- Player-owned and ordinary matched NPCs use identical in-world outcome mechanics when other variables are equal.
- No malicious creation prompt can grant a fictional sovereign office, declare a relationship with an existing person, or alter past world facts.
- A creator-owned person can encounter another creator-owned person via legitimate local social channels; both chronicle views share canonical event IDs but may differ by perspective.
- Fast forward a plausible lifespan, leave for a simulated period, return to catch-up and life replay; exact events and dates match canonical history, even after death/world ending.

### 4.4 Long-running and UI E2E

- Run **at least 150 simulated years headlessly** without fabricated events; if the world terminates naturally earlier, run alternative stable seeds/configs to exercise 150-year survivability. Also test full 300-year horizon behavior using a valid simulation, not setting its terminal status directly.
- Metrics: run duration, CPU/RAM, memory growth, database size, population/economy trends, factions/organizations lifespans, event density/diversity, LLM job/cost/fallback distribution, dead-letter/error rates.
- Load scenario with 50,000+ aggregate residents, 1,000 named individuals, dozens of settlements, and 100 event-stream observers. Report actual tested machine and observed performance. Do not invent SLA numbers.
- Playwright path: open world → create person with constrained natural-language concept → see live person/map/log → second user creates person → legitimate shared interaction → original person changes or dies → read catch-up and archive.
- Test SSE disconnect/reconnect and event cursor without gaps or duplicates; test responsive pane arrangement and hover/tap previews.
- Narration regression checks on a sampled event set for entity/reference grounding and perspective distinction. A failed LLM request yields an informative fallback entry, not blank UI.

### 4.5 Quality report is not an endless user-testing loop

Produce `docs/implementation-report.md` containing:

- Exact executed test commands with pass/fail and environment, **not** claimed outcomes.
- Honest performance metrics and assumptions.
- Architecture decisions and known limitations.
- At least 3 generated world histories analyzed for causal coherence and repetitive pathologies, with references to canonical events; highlight unresolved concerns and any content filters applied.
- Explicit table for every acceptance requirement (`complete / blocked / unmet`) and next required action only where unavoidable.

Automatic tests prove correctness properties, not that stories are artistically excellent. Do not declare “immersive” as automatically proven by a CI green checkmark.

## 5. Operational and security requirements

- Secrets via environment, not committed files; allow OpenAI-compatible base URL/model keys, global usage/cost cap, per-character job caps and system cooldowns.
- No LLM makes arbitrary HTTP calls or writes to canonical DB; the API also never writes canonical state directly.
- All public text passes content filter/display policy. Protect identity and restrict public profile exposure of creators; render violent/abusive events at appropriate abstraction. Allow fictional conflicts without endorsing real-world hate.
- Admin commands: initialize pack, inspect status, pause/resume, change global speed within supported range, close/roll epoch, backup/restore, diagnostics. All auditable.
- Simulator logs world lag but must never skip canonical world decisions unnoticed to “catch up” to wall-clock. If it cannot maintain configured speed, expose real measured lag.
- Stored histories are immutable read models for ended worlds; operational migrations preserve old pack-version compatibility or provide explicit versioned readers.

## 6. Completion condition

The deliverable is **a reproducibly deployable browser game** where a created person lives independently inside a changing social/geographic world; where model-created plans and institutions have durable constrained effects; where harsh personal outcomes and radical identity changes are real; where users share one history; and where endings arise from actual world events. All major subsystems need integrated behavior, source files, tests, ops and documentation. Do not ship mocked story text as if it were simulation.

This is a demanding goal; coding agent must report actual progress, blockers and measured results, not promise completion merely from a long prompt.
