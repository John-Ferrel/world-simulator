# AGENTS.md — Autonomous Coding Agent operating rules (v2.0)

## Scope and authority

Build the one complete game specified by these repository files, in this priority order:

1. `PRODUCT_SPEC.md` — product promise, player experience, chosen tradeoffs.
2. `DECISIONS_AND_CONFLICTS.md` — exact seven user choices and resolved tensions.
3. `ARCHITECTURE.md` — domain invariants, runtime authority, persistence and action contracts.
4. `CODING_SPEC.md` — implementation work, dependency order, automated acceptance.

**Never turn this into a prototype plan, repeated Q&A, or a static narrative demo.** Treat all milestones as integrated sections of one finished program.

## Autonomous workflow

1. Inspect repository/dependencies; create `docs/plan.md` with a complete critical path and update it after each code change. Create ADRs in `docs/decisions/` for nontrivial choices, with rationale and alternatives.
2. Implement module interfaces and concrete mechanics before writing elaborate LLM prompts. The LLM must not be used to conceal absent simulation systems.
3. Keep `pnpm test`, typecheck and a bootable Compose application viable throughout development. Apply migrations and automatic integration tests yourself; resolve failures before advancing.
4. Build dependencies in the order M0 through M5 in `CODING_SPEC.md`, but continue autonomously after milestones. Do not ask the user to test each increment or decide ordinary tech details.
5. Never fabricate implementation, benchmarks, test results, narrative facts or external service access. If external API credentials, paid resources or production deployment access are unavailable, finish everything possible locally and mark precisely what is blocked.
6. Maintain `docs/implementation-report.md` with current completed/unmet/blocked table, exact commands/results, real metrics, interesting generated histories and actual limitations.
7. Treat `owner_user_id` as access/observation metadata, never immunity or preferential world physics. Preserve harsh, radical character evolution.
8. The simulator is **sole canonical writer**. Web/API/LLM worker submit validated commands or proposals. Keep world state/revision/journal/historical event/outbox in one transaction.
9. All generated definitions compile to **bounded, predeclared** action/process/institution/policy grammar. No runtime arbitrary code, SQL or HTTP from model/worldpack text. Unknown mechanic means idea/claim/failed invention, not miracle.
10. All contexts untrusted: user prompt, imported world pack strings, belief contents, narrative inputs, external model outputs. Validate schemas, scope, bounds, time and permissions.
11. Make actual causality inspectable. A log entry must refer to committed events; a change in personality needs relevant experiences; an institution must affect future behavior via executable rules.
12. Handle model failure with deterministic fallback; no blocking the shared clock; late responses never rewrite the past.
13. Implement dynamic terminal logic; horizon ending is explicit and **not** misrepresented as a simulated catastrophe.
14. Keep UI minimal: character sprite, personal log, world map, light hover/tap previews, replay/catch-up. Do not add management UI or complex navigation.
15. No work requiring irreversible production deployment, purchasing credits or setting secrets without user authorization. Don't silently claim the public site is live.

## No fake success

- A randomizer emitting “war broke out” is not a war system.
- A model-written “guild founded” without persisted organization and executable upkeep/behavior is not an institution.
- A paragraph saying “she changed beliefs” without belief/goal/memory state updates is not autonomous character development.
- A “replay” generated from generic LLM memory is not replay. It must derive from recorded history.
- CI passing mock LLM tests does not mean a real LLM model is configured or functioning.
- Do not silently reduce scope, fake load capacity or use static event lists as permanent world state.

## Exit status

Deliver repository with one-command documented startup, default fictional world pack, migrations, auth, creation, three-pane browser, simulator, LLM adapter (key optional for fallback), journals/replay, event endings, archives, tests, operations and candid acceptance report. State precisely what is not done, if anything. Never claim work completed without evidence.
