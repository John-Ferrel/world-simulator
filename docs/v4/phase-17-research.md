# Phase 17 — Game Design Research Notes

Date: 2026-11-06  
Purpose: extract content-organization and story-generation patterns for Another History, not to copy any game's text or proprietary content.

## 1. Fallen London / StoryNexus, Cultist Simulator, Reigns

### Fallen London / StoryNexus

- **One primitive: the quality.** Stats, menaces, money, relationships and plot progress are all numeric/level qualities. A storylet is a data row with eligibility ranges, branches, effects, frequency and optional one-shot/living-story timers.
- **Many pieces read the same quality at different ranges.** Long arcs are built from several storylets keyed to disjoint quality bands, not from one scripted chain.
- **Airs / decks** add texture: a shared rolling quality gates many storylets, so one roll textures several cards. Storylets belong to area decks; pinned storylets bypass the deck.
- **Menace zones** are deck swaps, not just a fail state. A menace at a threshold relocates the character into a special area with its own content.
- **Repetition is controlled by quality ranges, one-shot locks, deck membership and narrative framing** — not by a single global cooldown.

**What to borrow:** many-to-many state/content relations, parameter bands, pinned opportunity lanes, one-shot locks, area/context decks.

**What not to borrow:** storylet-per-beat (a 40-year life cannot carry near-duplicate cards), hidden quality soup, menace grind loops.

### Cultist Simulator

- **Content is a predicate/effect table over cards.** Every object, follower, mood, lore fragment and resource is a card with aspects. Verbs expose slots; recipes match slot contents and aspect thresholds, consume inputs, and emit cards/effects.
- **Consumption is the anti-repetition mechanism.** A recipe cannot fire again until its inputs are rebuilt. Warmups and aspect thresholds create timing and scarcity.
- **The heartbeat creates pressure**, not a director: time passes, funds drain, dread/fascination/notoriety appear, and failure emerges from resource collisions.
- **Progression is threshold-based**, and an ambition selects endgame recipes; a legacy carries a few cards into the next run.

**What to borrow:** recipe-like reuse, two-axis costs (gain one thing, lose another), input scarcity, aspect/state thresholds, legible failure.

**What not to borrow:** opaque recipe failure, real-time pressure, a meta-progression that breaks one canonical world.

### Reigns

- **One card, two choices, four meters.** Every card is a compact situation with a character, a question and two swipes; each swipe moves multiple meters.
- **Cards carry requirements, flags and once-per-reign locks**, and form character arcs. A meter at zero/max ends the reign.
- **Short runs hide repetition** behind a new monarch and newly unlocked cards.

**What to borrow:** compact decisions with two-axis consequences, once-per-life locks, a clear end condition, character-arc gating.

**What not to borrow:** four interchangeable stat meters that erase long-term character difference; cross-reign meta-unlocks that violate one shared world.

## 2. Crusader Kings, RimWorld, The Sims

### Crusader Kings (CK2/CK3)

- **Character-sheet-first.** Traits are few, persistent and legible; events are triggered by conditions plus MTTH/on_action weights; outcomes are options with AI weights and typed effects on titles, opinion, prestige/piety, health, gold and traits.
- **Accumulated situation interlocks:** an office creates vassals and obligations, a marriage an alliance, a secret a hook, a child an inheritance problem. Prestige, piety, fame, dread and opinion are separate, so a character can be feared, pious and broke at once.
- **Content volume is large but per-life exposure is bounded** by triggers, one-shot flags, cooldowns and realms.

**Borrow:** legible traits/states, obligation cycles, office constituencies, separate reputation dimensions, family/inheritance pressure.

**Avoid:** hidden stat screens as the only explanation; DLC silos that do not interlock.

### RimWorld

- **Pawn-first and systemic.** Traits, backstory, passions, a visible mood-thought ledger, health hediffs with body-part capacities, skills by use, wealth-scaled incidents, quests and a storyteller pacing budget.
- **Outcomes are systemic** — injury, death, mood, relations, resources — not only authored branches.
- **Long-term memory lives in tales, graves, art and relationships.**

**Borrow:** state parameters that change capacities, incident pacing, systemic consequences, art/grave/legend as memory, the distinction between minor messages and major letters.

**Avoid:** a hidden storyteller that decides a personal climax; pure survival pressure without social meaning.

### The Sims

- **Household/object-first.** Traits, aspiration, reward traits, dominant emotion, friendship/romance bars plus sentiments, life stages, careers, holidays, chance cards and neighborhood stories.
- **Breadth comes from packs and objects**, but per-day exposure is thin and packs are siloed.
- **Accumulation is optional:** skills, career, fame, family tree, milestones; the player supplies the plot.

**Borrow:** life-stage framing, buffs/moods as short-term color, household relationships, ordinary social rituals.

**Avoid:** breadth without consequence; too many cosmetic buffs; content silos.

## 3. Dwarf Fortress, Caves of Qud, BitLife, tabletop

### Dwarf Fortress

- **History is a by-product of local simulation.** Worldgen creates sites, civilizations, lineages and wars; adventure mode walks the residue. Artifacts carry provenance (maker, theft, journey), figures carry kill lists and grudges.
- **Legends is an archive, not a narrator.** It links figures, sites, artifacts, wars and lineages; engravings re-tell committed events. The deepest historical memory in the medium, but retrieval is hard: the past rarely addresses the present without the player digging.
- **Family continuity is biological/positional** — heirs, grudges, heirlooms — but not thematic.

### Caves of Qud

- **Sultan histories are generated from a compact grammar** and attached to relics, murals, books and sites. A relic compresses a reign into a portable sentence: made by X, carried to Y, used to kill Z.
- **This is the strongest legibility model**: one event, several witnesses. The weakness is that it is often a museum label, rarely re-entering play as a cause.

### BitLife

- **Age-gated cards and stat trades** with generations and inheritance. It is memorable when absurd specificity (“attacked by a swan”) collides with jobs, family and money.
- **Readable but not emergent**: curated randomness with a family-tree wrapper; little accumulates beyond assets and genes.

### Apocalypse World / Burning Wheel / tabletop

- **Fronts and countdown clocks** turn offscreen threats into visible pressure; **beliefs, instincts and Artha** make commitments the engine of plot.
- **Burning Wheel’s instinct is the cheapest drama**: a reflex that creates trouble without an author.
- Neither simulates a world; both rely on a human facilitator. The lesson is to make commitments/obligations mechanically visible, not to add a hidden GM.

### Readability vs. noise

Readability is **reference**, not prose: name an agent, a date, a place, an object, a before/after value, and a reason tied to a prior committed event. Noise comes from template variation without state change, events with no downstream reader, adjectives instead of consequences, and scale confusion.

### Shape without a hidden director

- Shape comes from initial conditions, incompatible commitments, scarcity, committed-event clocks and public consequences.
- A secret “drama score” is still a hidden director. Weighting must be inspectable and justified by state (`exposure ≥ 60`), not an invisible pacing curve.
- The state opportunity lane is defensible because it surfaces situations the character already paid for; a global tension meter is not.
- Tragedy from accumulated cost, irony from two states in tension, elegy from outliving everyone — readings of state, not authored arcs.

**Additional author rules from this research:**

11. **States as pressure clocks:** every durable state needs a parameter advanced by committed tags, a threshold that opens a transition, and explicit exits.
12. **Collision scenes:** require two incompatible states + one relational role; each outcome changes both states and a relation.
13. **Witness/obligation ledger:** prefer named two-party memories (“A saw B sign the order”, “A owes B a seat”) over anonymous flags; gate later content on the original event.
14. **Death as settlement:** a focal death should read positions, debts, relations and states and commit consequences to named survivors, not just cash.
15. **Chronicle contract:** every event should answer who/when/where/what-changed/why-now; render chains, not a flat feed.

## 4. Synthesis for Another History

The runtime already has the right primitives: State, Condition, Kernel, Outcome, Check, Effect, State opportunity, Position, Organization, History. Phase 17's main risk is **conversion**, not expression.

### Rules for content authors

1. **Consumer-first.** Every new state must be read by at least one kernel or reaction outside its own creation branch. Prefer adding a consumer to an orphan state (`chronic-illness`, `debt-bondage`, `university-graduate`, `city-under-occupation`) before adding a near-duplicate.
2. **Parameter bands, not presence.** A binary state gives one scene; thresholds give escalation. `debt-bondage.strain` low → letter; mid → wage seizure; high → escape at the cost of a relationship or office.
3. **Collision kernels.** Require two states from different packs: `secret-lover` + `raising-child`; `office-patronage` + `under-investigation`; `cursed-by-wish` + `fame`; `strike-committee` + `family-estate`. Specific combinations feel authored without being scripted.
4. **Two-axis outcomes and a delay/refusal branch.** Accept (relationship +, cash −), refuse (relationship −, autonomy +), postpone (flag + follow-up). One outcome should leave the situation unresolved.
5. **Phase durable states and give them exits.** Onset → crisis → chronic → remission/death; favor → obligation → rupture; depend → school → leave → return. Ticks should change the situation, not restate it.
6. **Tone is a ratio of consequences, not events.** Ordinary life needs mechanical teeth (relations, skill, state parameters), and dark/absurd/spectacular content must remain rare enough to feel special.
7. **Pacing memory.** Use cooldowns, `oncePerPerson`, `sceneUseKey`, `notHasState` incompatibilities (grief vs. courtship, occupation vs. festival) and aftermath follow-ups. Independent per-year rolls must not pile up incoherently.
8. **Legibility.** Every consequential event should name its cause in text or a trace. A state that cannot appear in the dossier and alter a later scene is noise.
9. **Content budget.** Measure state appearance, distinct consumers, repeat rate and causal chains after each pack. Reject zero-consumer packs and packs whose scenes never appear.
10. **No hidden director.** Use conditions and RNG, not a personal climax schedule. A character can have a quiet life, a lucky break, a stupid death or no dramatic arc at all.

### Cross-pack concepts worth building

- **`public-narrative`** (person/household): the story circulating about someone, with reach/belief/controversy. Created by crime, office, fame and faith; consumed by courts, employers, spouses and enemies. It fixes the single-scalar reputation problem.
- **`obligation-ledger`** (person/organization): a favor, debt, appointment or secret owed, with weight/leverage/due date. Created by office, crime, work and migration; consumed by promotion, betrayal, trial and inheritance.
- **`household-care-load`** (household): dependents as pressure rather than per-child ticks, with dependents/strain/years-to-release. Consumed by life-course, work, migration and health. This attacks the family tick-spam at its source.

These are suggestions for future packs, not requirements for every author.
