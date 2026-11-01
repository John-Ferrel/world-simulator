# Product decisions, tradeoffs and resolved conflicts — v2.0

This document records the user's binding seven choices and the architecture consequences so the coding agent does not silently revert to a safer but different game.

| ID | User choice | Meaning | Engineering consequence |
|---|---|---|---|
| D1 | **person** | A life is the primary narrative unit; world history is the cause/context of lives. | Character-indexed events, personal-interest filtering, durable psychology/relationships; world systems still real. |
| D2 | **creative** | LLM can invent novel but rule-constrained concepts, strategies, institutions. | Typed semantic compiler, reusable process/institution runtime, validated persistence. |
| D3 | **fast** | Observe years quickly, not long real-world nurturing. | Default 20 min/world year, server-only clock; catch-up and replay are first-class. |
| D4 | **constrained** | A player's starting conditions must obey world constraints. | Validator + cohort provenance + no forged history/authority. |
| D5 | **radical** | Characters may profoundly change desires, loyalty or identities. | Never pin initial traits as permanent; trace causal transformation through memories, commitments and events. |
| D6 | **event** | World ends based on simulated events, not a fixed date. | World-level terminal condition engine, archive transaction, transparent horizon guardrail. |
| D7 | **harsh** | Consequences including premature death are not softened for player-owned characters. | No plot armor; no tragedy quotas; public narration still content-limited and abuse-protected. |

## Five tensions and explicit resolutions

### T1: person × fast

A 70-year lifespan takes ~23.3 real hours at 20 min/year. A player can return to find their subject dead. **Accept this intentionally**. User experience is a living-history reader: “Since you last visited” summary, complete life timeline, optional replay cursor; not a daily tamagotchi. The user's observer controls cannot pause the world. Off-session events must be persisted and catch-up summaries derived from them. The world can finish while users are offline; archives remain readable.

### T2: constrained creation × radical personality

Creation is a contract about **initial facts**, not guaranteed future outcomes. Described virtues, convictions and goals can be abandoned by a credible sequence of experiences. Keep important memory/goal transitions with cause references; never produce “became evil” from ungrounded randomness. Disallow arbitrary modifications to established histories or other user's persons. Initial unusual backstories must pass provenance and resource checks.

### T3: harsh × multiplayer

Characters can injure or kill others if permitted by in-world mechanics. Nobody gets creator-specific protection. Conversely, an online human must not be able to abuse a creation prompt to force harm against a named user's character; no direct targeting by account, no puppet-master permissions, abuse throttling, and no personally identifying information in public logs. Content policy for generated prose is a *display* boundary, not an in-world immortality spell.

### T4: creative LLM × durable coherent reality

Novel social proposals are welcome; arbitrary rule rewriting is not. A concept compiles to the supported **Action / Process / Institution / Agent-Policy** mechanism grammar. If no executable mapping exists, it stays a claim/idea/failed project rather than becoming a fake capability. Approved institutions have real budgets, membership, upkeep, propagation, lifecycle and effect caps. A world pack's exotic mechanics require developer-supplied executable hooks.

### T5: event ending × rapid shared clock

A collapse could arrive very early; another world may survive centuries. Respect event causality; do not roll a random “world ended” result for pacing. Terminal rules require persistent objective thresholds and supporting event IDs. Apply an explicit max horizon (default 300 sim years) as an *operational archive reason*, not a pretense of apocalypse. The last canonical commit, archive seal and next-world startup are atomic at world-level. New users may join until terminal status is committed.

## Further tradeoffs decided by architecture (no more user questions required)

- One **active** shared world, many readonly past-world archives. Switching world packs occurs between worlds, never mid-season.
- Default pack is original low fantasy, not a politically disguised 1900 Earth. Historical Earth can be a future content pack after explicit content/policy review.
- “User-created” is an observation ownership attribute only; neither special combat strength nor mandatory protagonist arc.
- Long-lived historical figures have persistent ID; decision fidelity can change over time but biographies never vanish.
- Political simulations need actual institutions, allegiance, revenue, legitimacy, resources and coercive capacity; do not replace with a single “tension bar triggers war.”
- A core actor may formulate a creative plan and fail. Failure is a legitimate, logged result.
- AI-generated explanations are not guaranteed objectively true; character POV must be labeled and sourced to available beliefs.
- Automated checks protect **mechanical causality and consistency**. They do not “prove the game is fun”. Coding agent must provide qualitative run reports and candid limitations; no iterative manual-demo gate for the user.

## Remaining nonblocking operator parameters

`WORLD_MINUTES_PER_YEAR=20`, `WORLD_MAX_YEARS=300`, `MAX_LIVING_CREATED_PERSONS_PER_ACCOUNT=1`, `LLM_BUDGET_*`, `HISTORY_RETENTION_*`, `CHARACTER_CREATE_RATE_LIMIT_*`. Agent may tune defaults based on profiling but must document any departures from the numbers above.

No unasked product decision is required to begin implementation. New fundamental world physics and unrestricted natural-language spell systems are out of scope rather than unresolved requirements.
