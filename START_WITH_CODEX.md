# Primary handoff prompt — Codex / OpenCode / equivalent coding agent

You are implementing an integrated browser game, **Shared Living World**, in the current repository. This is not a request for another design brainstorm or a small Demo.

First, fully read and follow (in precedence order):

1. `PRODUCT_SPEC.md`
2. `DECISIONS_AND_CONFLICTS.md`
3. `ARCHITECTURE.md`
4. `CODING_SPEC.md`
5. `AGENTS.md`

The seven decisions are binding: **person / creative / fast / constrained / radical / event / harsh**. One active shared world, not separate personal games.

### Non-negotiable implementation target

A user creates a world-consistent starting person; that character independently changes, forms relationships, may suffer and die, and leaves a fact-grounded chronicle. World geography, population, organizations, economy, politics and institutions evolve independently of browsers and LLM availability. Consequential LLM plans can create **compiled, validated, durable** processes/institutions, not just generated prose. People from different users can share the same causal events. World endings arise from state-driven conditions or a clearly-labeled operational horizon. The UI is intentionally simple: person sprite / personal log / world map, with only lightweight reference previews and private read-only history replay.

### How to work

- Start by writing `docs/architecture.md`, `docs/plan.md` and identifying dependency contracts and invariants; then **implement** them rather than stopping for planning approval.
- Work continuously through the dependencies and integration phases M0–M5 in `CODING_SPEC.md`. Keep the product bootable, tested and incrementally integrated. Update plan and ADRs.
- Implement the authoritative State Journal, action/process/institution semantics and causal person memory/goal lifecycle before relying on LLM prose. Do not attempt to turn raw free-form text directly into arbitrary physics.
- Execute unit/property/integration/E2E/load/headless checks yourself; diagnose and fix errors. No repeated requests that the user manually test small builds.
- Use a mock LLM for automated tests; allow a real OpenAI-compatible model through environment variables. Distinguish unsupported model providers from working integrations.
- Do not pause after each milestone to ask “should I continue?”. Continue until full acceptance or a genuine external blocker. Never invent passing results, deployed servers or test execution.
- Produce `docs/implementation-report.md` and an explicit completion table, with factual commands, performance numbers, remaining gaps and any blocked external setup.
- Only ask the user if truly indispensable for external credentials, payments, irreversible public deployment or unresolved permission barriers; ordinary implementation choices are your responsibility and must be recorded as ADRs.

Begin with repository inspection, architecture/plan authoring, then implementation. No further product ideation is needed unless the written specifications logically contradict one another.
