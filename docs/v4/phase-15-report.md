# Phase 15 — Composable Story Engine & LLM Content Factory

Date: 2026-11-05  
Baseline: Phase 14 `e4edf63`  
Design: `phase-15-design.md` · ADR: `docs/decisions/ADR-016-state-mechanism-layer.md`  
Independent review: `phase-15-mechanics-review.md` · `phase-15-critique.md`

## 1. What was delivered

Phase 15 adds a **State mechanism layer** over the existing v4 engine, a
**validated content-factory pipeline**, a **historical reference index with a
five-year review**, and actual content/lives that use them.

| Area | Result |
|---|---:|
| State definitions | **48** (24 core, 12 wish archetypes, 12 LLM-authored) |
| State-consuming kernels | **56** Phase 15 kernels: 29 `r15-*` batch kernels + 27 generated-pack kernels (`r15-love`, `r15-fam`, `hist15`, `absurd15`) |
| Wish archetypes | **12** (power, knowledge, love, wealth, revenge, freedom, faith, fame, craft, survival, adventure, beauty) |
| Historical records | **446** (79 countries, 166 cities, 93 people, 98 events, 10 fiction hooks) + 517 sources |
| Generated packs published | **4** (`pack-love-secrecy`, `pack-family-continuity`, `pack-history-fork`, `pack-absurd-power`) |
| Full lives | **2 × 60 years**, 16,438 / 18,555 events; **18 complete dossiers** |
| Controlled experiments | **6/6 pass** |
| Tests | `pnpm test` 88 files / **517 pass**, 36 skip; v4 39 files / **237 pass**, 8 skip |
| Build | pass, 2.96 s |
| Model API | **blocked: HTTP 403** |

## 2. Runtime: what a state actually is

A state is a persisted mechanism, not a tag. It can carry:

- owner type (`person`, `organization`, `household`, `place`, `region`, `world`);
- slot + conflict policy (`block`, `replace`, `stack`);
- bounded parameters and **typed links** (`lover`, `creditor`, `eldestChild`);
- enter conditions, duration, exit conditions;
- scene-weight/check modifiers;
- per-tick schedules with independent `tickHistory` (a 12-month tick cannot
  starve a 60-month tick);
- d20 checks with success/failure/critical bands;
- transitions to another state;
- reactions to committed event tags, with `requiresRoles`, chance, check,
  cooldown and `failureText`;
- onEnter/onExit effects through the existing typed vocabulary.

The engine additions are deliberately small:

- `hasState` / `notHasState` conditions (with parameters and owner scope);
- `attribute` and `position` conditions;
- `SceneDefinition.check` with outcome branch ids;
- `state_add/remove/parameter/transition`, `position`, `organization_found`
  effects;
- a state tick pass, a reaction pass, preflight of the new critical effects,
  and persistence in `world.states`.

`Person.education`, `Person.employment`, `Relation`, `Position`, `Project`,
`Organization` and `HistoricalProcess` remain authoritative. `university-student`
does not replace `Person.education`; it drives it and adds the tuition,
progress, failure and graduation mechanics. A real office is a `Position`; a
stage king is a state with no authority.

## 3. Content factory

`packages/v4/content-factory/` contains:

- `briefs.ts` — 4 structured briefs (education continuity, power/irony,
  secret intimacy, curse/consequence);
- `generate.ts` — model prompt, JSON parse, retries, validation, labelled
  deterministic fallback scaffold;
- `validate.ts` — forbidden keys, whitelists, typed refs, text tokens, state
  refs, and **real composer compile**;
- `store.ts` — versioned pack files, registry, hash, provenance, status;
- `critic.ts` — deterministic run metrics/verdict.

The runtime never reads model text. A pack is published only after the same
validator used by tests. Generated packs are static JSON imported into the game,
so a process restart cannot silently load an unpublished pack.

**Actual model call:** the configured endpoint returned `HTTP 403
(server_error)` on both attempts. The factory therefore used the labelled
fallback scaffold for the smoke run; that scaffold has a state and **zero event
kernels**, and is not counted as success. The four delivered packs were written
by LLM subagents in this session (model field
`deepseek-v4.1-flash-subagent`), then validated by the same gate:

```text
pack-love-secrecy.json      ok  states=3 kernels=6 compiled=84
pack-family-continuity.json ok  states=3 kernels=7 compiled=98
pack-history-fork.json      ok  states=3 kernels=7 compiled=98
pack-absurd-power.json      ok  states=3 kernels=7 compiled=98
```

This is LLM-authored content, but it is **not** evidence that the runtime API
worker works in this environment.

## 4. Historical layer

`packages/v4/history-db/` is a reference index, not world state:

- 79 countries, 166 cities, 93 people, 98 events (90 `fact`, 8 `inference`),
  10 `fiction` hooks kept in a separate collection, 517 source records.
- Every record carries stable id, date range, country/region codes, source ids,
  `sourceType`, confidence and curation.
- Fiction hooks have zero confidence and an explicit disclaimer; they cannot be
  loaded as history.
- Query functions expose events/people/cities/country periods/candidates.
- `reviewHistoricalWorld` runs every 5 in-world years. It records which
  candidates have a committed event sharing a hook or title term, which do not,
  which real people are alive, and fork signals. It never resets the timeline
  and explicitly says similarity is not proof the real event happened.
- The result is stored in `macro.historyReview` / bounded `historyReviews` and
  appears in the Macro Director snapshot.

The delivered index is **Europe/Vienna-heavy and incomplete**: 22 of 79
countries have no event record; Africa/Latin America/Asia coverage is thin.
This is reported honestly in `phase-15-history-coverage.md`.

## 5. Lives: the state layer in actual play

### 5.1 Klara — a power wish that really produced offices

From `phase-15-phase15-a.md`:

> **1931.08** `absurd15-wish.crown-for-a-day/real-tiny-office` — “一个市民代表团真的来到Klara门口，带来一份任命书：公共礼仪官，负责节庆、吊唁和接待。职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。”
> _effects: organization_found 市民礼仪处 (state); position 公共礼仪官 @org:absurd15-wish-office:evt:…; reputation 0.08_

The dossier also contains `r15-wish.found-faction/founded` in 1942 and
`absurd15-wish.crown-for-a-day/real-tiny-office` again in 1953. The positions
are real `Position` records with authority, not mood text. They close at their
terms; the last ends at Klara's death in 1957.06. The wish did not merely write
“she felt powerful”; it created organizations, positions and authority that
other content can query with the `position` condition.

What it does not show: the office is never *used* in a later scene. The
authority is a record, not yet a lever. This is a content gap, not a state-layer
gap.

### 5.2 Mitzi — two states with real links and exits

From `phase-15-phase15-a.md`:

```text
wish-knowledge (ended 1970.1: owner_died) intensity .55 fixation .5
forbidden-attachment (ended 1959.1: duration expired) discretion 45
  reciprocity 61 exposure 60 jealousy 25 origin choice
  links.lover person-materialized-world-vienna-1912-119
```

That is not a list of flags. The affair carries the lover as a real person id,
the wish carries a lifelong attention bias, and the state ends with a recorded
reason rather than being silently reset. Mitzi is not a happy showcase — she is
a working life with a secret that expires — but the continuity is mechanical.

### 5.3 Hedwig — the curse in full play vs the forced experiment

In the final 60-year dossier the curse **does not fire**: Hedwig dies in 1946.11
before a betrayal carrying a `betrayer` role occurs. Her state ends
`owner_died`, `triggers 0`. The earlier draft of this report claimed a full-life
curse reaction; that was a prior run and is **not** evidence for the delivered
dossier.

The controlled C experiment forces the success band and shows a real
cross-person consequence: the reaction event `curse:000022` causes
`person-hermann-kral: -0.18` health. The failure branch (curse recoils on its
holder, different `failureText`) is tested by the state test. The mechanism is
real; its open-play reachability is not yet proven.

### 5.4 Continuity improvements and remaining holes

What improved:

- education no longer jumps from scholarship to apprenticeship at random when a
  state slot is occupied; transitions are committed (`state_transition` facts);
- a partner/affair state carries the lover link and can transition to
  `known-affair` / `public-scandal` rather than resetting to a new stranger;
- a real office is a `Position`; a stage title is a state with no authority;
- state ticks no longer fire before the state_add for the same instance, and
  death ends all active person states with `endedStateIds`.

What did not improve enough:

- base content still has pronoun errors (e.g. “他” for a female subject) and
  repeated event titles;
- some state text is repetitive: `stage-sovereign` ticks 16 times in seed A and
  21 in seed B, mostly with short authored variants;
- seed A has no university chain in the selected dossiers; seed B has 3
  `university-student` states, 1 transition and 1 dropout, so the content is
  reachable but not consistently;
- the war-widow state is absent from both final runs after the female/partner
  gate; it is authored but not demonstrated in open play;
- positions created by a local club are not automatically closed when a person
  moves city; death does close them;
- the full lives still contain ordinary fragments that are not caused by the
  state layer. State count is not a literary score.

## 6. Controlled experiments (A–F)

`pnpm v4:phase15-experiments` — all six pass:

| Experiment | Evidence |
|---|---|
| A education | poor clever adolescent → `university-student` → 3 `term` ticks → `state_transition` → `university-graduate` |
| B power | power wish → `organization_found` + `position` “临时主席” with `召集会议`; stage title does **not** create a position |
| C curse | forced success band: real betrayal → `state_reaction:cursed-by-wish` → betrayer health **−0.18**; full-play success not observed |
| D indirect link | teacher patronage commits a `university-student` state on a **different** person, who later graduates |
| E organisation | organisation-owned `strike-wave` changes a member’s opportunities; a strike settlement ends it with a committed reason |
| F history | 13 real candidates reviewed, 2 matched / 11 unobserved; review explicitly refuses to treat that as proof of history or divergence |

The experiments deliberately narrow the content pool and, for D, force a known
outcome to isolate the mechanism. They are evidence that the mechanism works,
not a claim that every branch is equally likely in open play.

## 7. Historical familiarity and divergence (60-year runs)

The five-year reviews in seed A:

| Window | Matched | Unobserved | Examples matched |
|---|---:|---:|---|
| 1911–1915 | 3 | 0 | July Crisis, Sarajevo, WWI |
| 1916–1920 | 5 | 4 | Franz Joseph’s death, 1918 influenza |
| 1921–1925 | 1 | 0 | League of Nations loan |
| 1926–1930 | 2 | 1 | Wall Street Crash, Depression unemployment |
| 1931–1935 | 2 | 1 | Creditanstalt, Dollfuss assassination |
| 1936–1940 | 2 | 1 | Anschluss, WWII |
| 1941–1945 | 3 | 0 | occupied Vienna fuel/food crisis, Vienna Offensive |
| 1946–1950 | 1 | 0 | Marshall Plan |
| 1951–1955 | 1 | 1 | Austrian State Treaty |
| 1956–1960 | 1 | 0 | Hungarian refugees |

Seed B differs in details (e.g. the July Revolt matched in B, unobserved in A;
WWII unobserved in B). This is expected: the review uses committed events and
shared hooks, not a hidden real-history timeline. It does **not** prove the
simulation is historically accurate, and it does not force a reset. The
`historyReview` note says so explicitly.

## 8. Performance (20,000 synthetic persons, 3 years, no DB)

Command:

```bash
V4_BENCH_COMPOSITION=1 [V4_BENCH_STATES=1 V4_BENCH_STATE_DENSITY=...] \
  ./node_modules/.bin/tsx scripts/v4-runtime-benchmark.ts 20000 3
```

| Load | ms / year | heap |
|---|---:|---:|
| Phase 14 baseline (composition, no state option) | **4,283** | 471 MB |
| + states, 1% density (200 instances) | **6,414** | 711 MB |
| + states, 5% density (1,000 instances) | **8,286** | 526 MB |

The state option is **above the Phase 14 5 s/年 target** at both densities.
Profiling showed the first cost was `personOrganizations`/agency scanning;
organization and relation indexes reduced the 5% case from 74 s/year to 8.3
s/year. The remaining state overhead is lookup/weight/agency interaction.
This is not a production PostgreSQL or API measurement.

## 9. Verification

```text
pnpm test
  88 files passed / 7 skipped; 517 tests passed / 36 skipped
pnpm exec vitest run tests/v4-*.test.ts
  39 files passed / 2 skipped; 237 tests passed / 8 skipped
pnpm build
  pass, 2.96 s
pnpm test:e2e --config playwright.v4.config.ts
  BLOCKED: ECONNREFUSED 127.0.0.1:55432 (no local PostgreSQL)
```

New tests:

- `tests/v4-phase15-state.test.ts` — 10 tests: library validation, state add,
  ticks, transition, duration expiry, slot replacement, curse reaction, typed
  link + org state, real Position vs stage title, deterministic state world.
- `tests/v4-phase15-content.test.ts` — 5 tests: kernel count/refs, state
  library, pack validation, century-wide compilation, text tokens.
- `tests/v4-phase15-history.test.ts` — 5 tests: index facts/fiction split,
  queries, candidates, review, macro snapshot.

Data artifacts:

- `docs/v4/phase-15-phase15-a.md` / `.json` — 60 years, 16,438 events,
  432 persons, 213 alive, 386 state facts, 254 ticks, 24 reactions,
  13 transitions, 24 active states, 16 positions, 17 state types.
- `docs/v4/phase-15-phase15-b.md` / `.json` — 60 years, 18,555 events,
  438 persons, 221 alive, 439 state facts, 278 ticks, 23 reactions,
  21 transitions, 26 active states, 14 positions, 20 state types.
- `docs/v4/phase-15-experiments.json` — A–F.
- `docs/v4/phase-15-history-coverage.md` — exact coverage and gaps.
- `data/phase15-content/` — content-factory registry, accepted fallback
  scaffolds, and generation report including the HTTP 403 attempts.

## 10. Known problems / not done

1. **Model API is blocked (HTTP 403).** Runtime content generation was not
   proven. The delivered packs are subagent-authored and offline-validated.
2. **No PostgreSQL verification.** `v4_states` migration and persistence code
   exist, but no local DB was available; `pnpm test:integration` and e2e could
   not run.
3. **Performance target missed under synthetic state load.** 1% state density
   is 6.41 s/year; 5% is 8.29 s/year. Real-game density and DB latency are
   unmeasured.
4. **Reachability is uneven.** 56 Phase 15 kernels exist; only a subset appears in
   any one 60-year run, and only **17/48** (seed A) / **20/48** (seed B) state
   definitions appear. Curse success branch, university chains and some
   generated absurd kernels are rare. The dossier explicitly records what
   appeared, not what was authored.
5. **State text repetition.** Long-running states tick every year with short
   authored variants; `stage-sovereign` ticks 16/21 times in the two runs with
   only a few texts. More variants/cooldowns are needed.
6. **State lifecycle edges.** Local positions survive a move; nested onEnter/onExit
   effects are now included in the committed fact, but a failed nested critical
   effect can still leave the state created; `state_remove` without an
   `instanceId` removes all matching stacked instances. `Person.education`
   remains authoritative, but `university-student.onEnter` writes it through a
   nested effect; a scene that changes education without exiting the state can
   disagree until the annual tick. Orphan state cleanup is conservative.
7. **History coverage is partial.** 22/79 countries have no event record;
   Africa/Latin America/Asia are thin; most sources are tertiary
   Wikipedia/Wikidata.
8. **Literary quality is not established.** The deterministic critic says
   “pass” on consequence/repetition thresholds; that is not a literary pass.
   The independent critique in `phase-15-critique.md` is the authority.
9. **No runtime LLM Macro Director call** in this environment. The historical
   review is deterministic and written to the Director snapshot; a real model
   proposal cannot be re-verified.
10. **The full 88-year/20k production runs were not repeated** under the final
    code. The 60-year two-seed runs are the delivered life evidence.
11. **Children and parents are not durable state.** They are committed birth
    effects and relations, but no `raising-child` state is reliably attached in
    the final dossiers; children still disappear from the centre of a life.

## 11. Reproduction

```bash
pnpm install
pnpm test
pnpm exec vitest run tests/v4-*.test.ts
pnpm build
pnpm v4:phase15-experiments
pnpm v4:phase15-lives -- 60 phase15-a,phase15-b
pnpm v4:phase15-author -- --all --fallback
```

The last command demonstrates the factory gate and labelled fallback; without
`--fallback` it tries the configured model and records the 403 attempts.

## 12. Candid verdict

Phase 15 proves that a small typed state layer can make education, apprenticeship,
employment, widowhood, secret intimacy, investigation, real office, stage
authority and a curse **persist and compose** without a second engine. The
controlled experiments are the strongest evidence; the full lives show the
layer operating inside noisy, sometimes repetitive, real content.

The independent critique (`phase-15-critique.md`) initially scored the lives at
17.25/30 and then, after the lifecycle fixes, added a final note confirming:
**0 tick-before-add**, **0 active person states on dead people**, real death
facts for the checked short lives, and offices that close at term/death. The
addendum re-scored the affected lives to a mean of **18.0/30**, still below
Phase 14's 19.0 and below the 26/30 “reads as a life” gate. Its
remaining three issues are:

1. the curse is reachable and consequential in the forced experiment but not in
   either 60-year dossier;
2. real authority is recorded but never exercised by later scenes;
3. children remain birth effects rather than durable state, and some long
   states still need stricter duration/exit coverage.

It does **not** prove that every wish, state or historical fork is routinely
reachable, that the runtime LLM factory works, that the simulation is
historically faithful, or that the lives are consistently literary. One
correction to the critique's final note: the seeded `cursed-by-wish` definition
has a 600-month duration, so Hedwig's 418 months is inside its term; the
12–240 month figure belongs to the generated `curse-mark` state. The next
phase should prioritise:

1. reachability and variant depth for the states that already exist (especially
   curse success, university, absurd power, and organisation states);
2. a durable child/parent mechanism and authority-exercising content;
3. real PostgreSQL + model API verification, then 20k performance with DB.

The state layer is worth keeping. It is not yet the whole game.
