# Shared Living World — Product Spec v2.0

> **Status:** product decisions frozen for the first full release. This is a *complete-game* specification, not a demo roadmap.  
> **Authority:** this document defines product behavior. `ARCHITECTURE.md` defines invariants and engine protocols; `CODING_SPEC.md` defines delivery work and acceptance.  
> **Chosen directions:** `person / creative / fast / constrained / radical / event / harsh`.

## 1. One-sentence game

A single shared, autonomous, fast-evolving fictional world. A user **creates a person's starting conditions**, then **watches their life** through a small pixel character, an evolving life chronicle and a map. Other users' people are real inhabitants of the same world, not scripted cameo characters. No user issues day-to-day commands.

Core promise: **You write the beginning of a life, not its ending.**

### 1.1 Player experience, in order

1. Open the URL. See one ongoing world, its current year and public world activity. No forced character-creation wizard before observing.
2. Create a person through natural language plus a few optional constraints: appearance, initial traits, values, origin, initial aspiration. The service explains any constrained/adjusted attributes **before entry**; no god-tier power or edits to other people's pasts.
3. Enter the shared world. The character evolves without player orders. Their initial values can **radically change** through lived experiences; the system does not protect their life, goals, reputation or happiness.
4. Open the page periodically. Read recent events live or use **private life replay** to catch up on years missed. The global world never pauses when an individual reads the past.
5. A character may die young, live an uneventful life, perpetrate harm, survive wars, found an institution, change a country, be forgotten or leave a lasting mark. All are legitimate outcomes when caused by the world.
6. At a world-level ending, the world is archived; a new shared world can start. At most **one active shared world** exists at a time (archives are read-only).

### 1.2 Visual experience

Desktop is the simple **three-column observer**, not a management game:

- **Left / Person:** composited pixel sprite, attire/aging, name, title, age, profession, place, short current state, major relationships, salient changes. Not an action panel.
- **Center / Life Chronicle (primary):** live and historical entries, major turning points, quiet everyday episodes, relationships, losses and consequences; world events appear **as they matter to this person**. People/places/events have hover (desktop) or tap (mobile) **preview only**. No complicated click-to-navigate workflows.
- **Right / World:** a WorldBox-like 2D pixel world map, current location marker, borders/settlements/change and a few local events. Display real world state, not synthetic decorations. World view is support for the life story, not the main control surface.

Mobile may stack or tab between these same three panes; this is responsive presentation, not three new game modes.

### 1.3 Non-goals

No armies to order, combat controls, construction UI, mission tracker, branching dialogue choices, chat room, guild management, territory management or repetitive login tasks. No full individual physical simulation, full commodity-by-commodity industrial economy or 60-FPS NPC movement. No forced re-enactment of real-world political history. No promise to compile arbitrary text into new executable physics.

## 2. World and time model

- One active **server-authoritative** world; one canonical simulation time and historical truth. All user-created people are in this world and obey identical in-world constraints as autonomous inhabitants.
- Initial pack: **original fictional low-fantasy world**, with recognizable geography, settlements, populations, institutions, trade, social differences and competing powers. This is not a reskinned 1900 Earth. It is a full playable pack, not placeholder random data.
- **Fast** default: **one simulated year per 20 real minutes**, configurable by the operator *for the entire world* (not per player). This means a plausible 70-year life can pass in about 23 hours. Treat this as a product default to tune, not a fixed universal physical constant.
- Engine computes logical months plus scheduled discrete events; rendering cadence is independent of simulation cadence. World advancement must not wait for an LLM API response.
- **Dynamic endings:** the world pack defines observable, state-driven terminal conditions (e.g., sustained global population collapse; irreversible civilization-wide transformation; explicit singular catastrophe) that require causal events and sustained conditions. No fixed “2050 apocalypse” or mandatory victory event.
- Operational guardrail: archive a world on an explicit operator-configured maximum horizon (default 300 simulated years) if no terminal event occurs. Archive reason is `horizon`, **not** a fabricated catastrophe. Automatically start a new epoch if configured; archives are always immutable.
- Current-world live mode and **life replay** are separate clocks. A private replay cursor never changes world time or other users' state. Read-only historical map snapshots and event summaries are shown alongside life replay where available.

## 3. Users and character creation

- One account can own **one currently living created character** in the active world. After death, user may create another subject to rate limits; previous biographies remain available. Administrators can change limits later; this is not a pay-to-win system.
- Users may create at any active world year; entry occurs in the **current** world state, not a personal timeline.
- Default entry is a young adult. Allow constrained alternate ages/origins if coherent with world-pack rules. To preserve population accounting, instantiate a person from an existing demographic cohort, decrementing the aggregate; do not conjure a new adult and all their resources out of nowhere.
- Natural-language creation is parsed into typed initial state. LLM can propose richly unusual people within the world's species/ability/institution schema. The validator enforces **explicit tradeoffs and provenance**: strong abilities require permitted origins/limits; exceptional wealth/political position must be acquired in-world, not asserted in a prompt.
- Claims about existing real players, preexisting characters or historical events cannot be forced by a character creation prompt. Unknown background facts can be generated within existing cohort, place and time constraints; retroactive backstory must not rewrite established world history.
- Player has no direct command authority over that person after creation, nor any privileged ability to revive, protect, edit, kill, teleport or control other characters. An observer can select whose public biography to view if UI later supports it; this is **read-only**.
- `owner_user_id` is for observation/authentication/notification entitlement, **not** an in-world stat or bonus.

## 4. Person-first simulation

The person is a persistent agent with a causal biography, not a floating bundle of random log events.

**Minimum mind state:** temperament/values, needs/pressures, competencies, personal and group identities, beliefs that may be false, witnessed experiences/episodic memories, durable relationships, active goals and commitments, ongoing plans, current mood/stress and culturally learned behaviors.

**Goal lifecycle:** acquire → prioritize → plan → attempt → experience consequences → persist/modify/abandon/replace. Radical autonomy means identity can transform substantially, **but only through traceable experiences and credible constraints**; model must not randomly overwrite traits each tick.

**Individual consequence loops:**
- Material: work, livelihood, illness, movement, survival.
- Social: friendship, attachment, marriage/partnership, kinship, rivalry, betrayal, mentorship, collective action.
- Cultural/cognitive: belief, rumor, education, invention, conversion, disillusionment.
- Organizational/political: join/found/lead/leave organizations, political conflict, institutional reform, war and repression.
- Demographic: aging, births, death, inheritance; death is irreversible in the base pack (pack-defined alternatives may exist).

**Personal causes matter:** A war changes employment, mortality, routes, loyalties and relationships; those personal outcomes can influence organizations, cities or international dynamics. The world does not exist merely to provide randomly selected backdrops.

**Population fidelity:** bulk residents are aggregate cohorts, long-lived named characters have persistent identities, and focal characters receive more nuanced cognitive decisions. A focal character has **no gameplay bonus**. Named NPCs interacting with focal characters also receive sufficient identity/knowledge fidelity to preserve credible relationships.

## 5. World evolution and creative LLM

The world genuinely evolves without calling LLMs: population and production, trade and transport, urban change, organizations and institutions, knowledge diffusion, conflict and power transfer all continue through executable processes.

**LLM's creative authority:** It may propose unexpected personal decisions, multi-stage strategies, organizations, customs, doctrines, technologies or institutions **using capabilities actually supported by the world pack**. It cannot write DB state, rewrite history, change ownership or assert victory. A new semantic concept is not equivalent to a new physical law.

**Every lasting generated concept must have:**
1. A durable entity and identity, with creator/provenance and initial state.
2. A **compiled executable behavior** from an approved, typed grammar: triggers, eligibility, costs/upkeep, effect operations, adoption/decay, TTL/termination and social propagation.
3. Preconditions and resource constraints; no free resources, free power or impossible geography.
4. A causal record of creation, adoption, effects and later revisions.
5. Useful fallback behavior **without LLM**; institutions do not vanish if the worker is down.

An idea whose world effect is unsupported may become a rumor, intention, artistic concept, failed experiment or unfulfilled theory, **not an asserted real technology**.

**LLM deliberation is selective:** use it for infrequent consequential decisions, creative innovations, and grounded narration. Routine movement, production and social maintenance use rule-driven agent policy. Budget by wall-time, simulated time, character and world; on outage/expiry the world advances with a deterministic fallback.

## 6. Harsh world and public experience

- **No plot armor:** believable illness, accidents, war, oppression, cruelty and early death can affect user-created people. Do not artificially lower their death probability to keep users engaged; do not enforce tragedy quotas either.
- In-world moral outcomes follow causal rules rather than “good people always win” or “evil people always lose.” Harmful actors can succeed, fail, learn or reform as supported by history.
- **Harsh simulation ≠ unrestricted public content:** public narration should avoid gratuitous graphic gore, explicit sexual violence or detailed abuse. World facts can record a serious event abstractly without rendering an explicit scene. Characters who are minors require age-appropriate depiction. Real-world identity and hate-targeting abuse from player prompts must not become a griefing tool.
- Privacy: account ownership is not necessarily public; render in-world identity, not the creator's personal information.
- The game can model ideological and religious disagreement without presenting generated propaganda as real-world truth.

## 7. Historical experience

Separate three layers:

1. **Canonical world commits:** sufficient durable state changes to recover the world.
2. **Historical facts:** selected significant events, participants, places and evidence/cause links; immutable after commit except additive corrections.
3. **Narratives:** a grounded, fallible *view* of the facts, possibly from a person's biased perspective; never a state-changing source.

World truth, character belief and public rumor are different data types. A player should be able to distinguish “this happened” from “this person believed it happened.” Do not claim definitive causes when only correlations are known.

Log relevance is **personal**, not a global news ticker copied into every timeline. Quiet periods can be represented by concise interval summaries; turning points deserve richer entries. Catch-up retrieves bounded events and composes summaries without losing the raw historical events.

## 8. Multiplayer is emergent, not a matchmaking UI

Users' characters share geography, institutions and social networks. They can encounter one another **if their schedules, location, interests and circumstances allow**. Do not force romances or meetings just because both are player-owned.

There is one public world history. Same event affecting two people creates consistent references, with potentially differing subjective interpretations. Moderation, identity boundaries and rate limits protect real users without softening the in-world simulation.

## 9. Release-level requirements

One deployable service bundle containing: authentication and bounded creation; world generation/initialization; authoritative simulation and dynamic ending; historical storage and replay; LLM-assisted creation/creative decisions/narration with graceful failure; one complete fictional world pack; pixel sprites + simple map + log; read-only archives; admin controls; tests and operational docs.

Initial **load design targets**, not unverified promises: ~30–50 settlements, ~5–8 political powers, 50,000+ aggregated residents, ~1,000 persistent named individuals, 100 concurrent observers, and 150+ simulated years if terminal conditions do not intervene. Record actual performance and reduce *only by explicitly declaring an unmet requirement*, not by quietly replacing it with fake content.

## 10. Product acceptance (observable)

- An arbitrary user's character can be genuinely forgotten, change values, move, form lasting ties, become influential or die without developer-authored story branches.
- Two people created by separate users can enter the same causal episode and their separate logs refer to the same historical event ID.
- World and organizations continue when no human is online and when LLM is disabled.
- A novel approved LLM-created institution changes at least one future executable process and remains causally visible after its creator dies.
- A character changing convictions has attributable experiences; a death has an actual cause and state effects. No magical “plot event” kills someone without ledger effects.
- Live and replay show consistent facts at different positions on a time axis; replay cannot rewrite shared history.
- World ends only when a recognized terminal rule or transparent horizon guardrail is reached; a new active world cannot overlap the prior one.

**Not promised:** perfect human realism, unrestricted new physics, guaranteed engrossing stories, unlimited users, unlimited LLM calls, or fully autonomous development with zero external deployment credentials.
