# Phase 12 — Event Recipes, world facts and bounded causality

Date: 2026-11-04

## 1. Verdict

Phase 12 delivered three things that Phase 11 did not have:

1. **Person- and region-level conditions actually compile and execute.** The same
   recipe can have different eligible actors, actions and effects depending on
   role, employment, education, cash, skill, capability, age, relation, region,
   war/reform/postwar process or legacy.
2. **A real, large executable library.** The kernel library grew from 150 to
   **1,011** kernels, **740** variants, **4,065** authored outcome texts,
   **2,551** compiled scenes + **191** compiled tasks in Vienna 1912, and
   **5,960** distinct compiled scene IDs across four historical scenarios.
3. **Bounded retrieval that meets the 20k target.** 20,000 synthetic persons
   run at **2.52 s/year** in the composed-content benchmark and **2.76 s/year**
   in the original Phase 11 benchmark, versus the Phase 11 baseline of about
   252.7 s/year problem and 41.9–226.5 s/year after the first Phase 12 cache.
   Heap is **397–444 MB**, not 1 GB+.

It also delivered an **Incident Trace** on committed events, a compiler that
drops an outcome when a major effect cannot resolve, and a real
**1,073,786 eligible person × scene × outcome situations** capacity check.

**Literary quality did not pass.** The independent Critic's first sample was
**2/20 pass, mean 28.75/40**; after 12 targeted rewrites the rewritten subset
was **9/12 pass, mean 33.58**, and the final excerpt re-score was **3/12 pass,
mean 30.50**. Subject identity improved substantially, but pronoun agreement
and effect visibility are still failures. This is not a literary success claim.

A mechanics review found and we fixed two hard engine bugs:

- the subject-role cache could cast the first same-signature subject into later
  persons' scenes (prose named the wrong person);
- birth scenes could cast a stranger as father.

The stricter partner rule then caused a **birth slowdown**: 237 births in the
Phase 11 88-year playtest versus **100** here. This is a real remaining
demographic regression, not hidden.

## 2. Architecture changes

### 2.1 Event Recipe kit, not a second engine

`packages/v4/content/kernels/recipes/kit.ts` expands compact authoring specs
into ordinary `PlotKernel` / `KernelOutcome` / `EventEffect` objects. The
existing composer and engine remain the only executor. The kit adds no runtime
state machine.

- `recipes([...])` → `PlotKernel[]`
- shorthand effects → standard `EventEffect[]`
- `when` on outcomes → `SceneOutcome.conditions`
- extra `subject`-kind role declarations → a `sex` condition or subject-sex
  override, not a second actor
- `trace: { motive, conflict, response }` → authored incident-trace fields

### 2.2 Person and region facts

Person-level branches compile to the existing `SceneCondition` grammar:
`hasRole`, `notHasRole`, `employment`, `education`, `cash`, `skill`,
`capability`, `age`, `hasRelation` and `sex`. Outcomes are filtered by the
existing `selectOutcome` path; there is no separate branch resolver.

A new `region` condition is copied from context profiles. A Vienna resident
does not receive a Klosterneuburg-only scene merely because both contexts share
the `peace` tag. Context selection now chooses the best context **per region**,
using tag-overlap score and priority, instead of letting the highest-priority
context swallow a generic kernel.

### 2.3 Incident Trace and effect failure

`EventFact.trace` records mechanism (kernel/context/milieu/variant/scene and
outcome), place, subject, participants, motive/conflict/response when authored,
and **post-application** effects with interpolated descriptions. The trace is a
projection of committed facts; it does not drive eligibility.

The composer now records unresolved effect placeholders. If a **major** effect
(`role`, `employment`, `education`, `move`, `death`, `birth`, `relation_end`,
`household`, `residence`, `condition`, `flag`, `organization_membership`) cannot
resolve, the whole outcome is dropped and an error is recorded. A story cannot
keep claiming a consequence whose effect silently vanished.

### 2.4 Retrieval

- Per-year person indexes for role casting (role, employer, residence,
  location, parent, sex, teacher, official, historical, union member,
  organizations by kind).
- Candidate pools keyed by structural facts (stage, exact age, location,
  region, employment organization, education, roles, sex, household size,
  place kinds). Cash, health, skills, capability and relations are checked per
  candidate.
- Milestone/lifecycle pools are split from ordinary pools.
- Large ordinary pools use a weighted alias sampler with a small number of
  deterministic draws; small pools keep the exact exhaustive scan.
- Partner casting looks up an existing partner directly; it no longer scans
  48 candidates and their relation lists to discover one.
- Composition is cached by active contexts/processes/legacies rather than by
  target year, so a 35-year audit does not recompile identical scenes 35 times.

## 3. Content production

Seventeen parallel domain batches produced **850 new recipes** (17 × 50) on top
of the Phase 11 library, plus the 11-recipe kit proof set.

| Wave | Batches | New recipes | Main domains |
|---|---|---:|---|
| 1 | 6 | 300 | childhood/education, work/commerce, family/social, health/crime, civic/war/migration, culture/faith/science |
| 2 | 6 | 300 | rural/agriculture, urban infrastructure, finance/law, domestic/leisure, higher education/media, religion/charity |
| 3 | 5 | 250 | war front/home front, crime/justice/prison, migration/refugee/exile, later adolescence, industrial work/transport/office |

Actual content cost: **17 subagent batches**, roughly **71k lines** of recipe and
kit code, about **55 minutes** wall-clock for wave 1+2 and about **20 minutes**
for wave 3, followed by integration, duplicate/pronoun cleanup, tests and
rewrites. This is development-time LLM authoring, not runtime LLM prose.

Validation performed:

- standalone `scripts/v4-recipe-check.ts` on every batch: role refs, text
  tokens, effect refs, major-effect rule, unique IDs;
- duplicate title/text scan: **0 duplicate titles, 0 exact duplicate texts**;
- typed library test: **1,011 kernels, 31 domains, 740 variants, 692
  person-branch outcomes**;
- exact `pnpm typecheck` and full test suite after integration.

## 4. The five distinct counts

Do not collapse these into “millions of events”.

| Count | Actual Phase 12 value | Notes |
|---|---:|---|
| Different event mechanisms | **1,011 kernels** | 960 event + 51 task |
| Different causal branches | **740 variant entries** + **692 outcomes with person conditions** | World/process variants and person-level outcome branches |
| Valid compiled situations | **2,551 scenes + 191 tasks** in Vienna 1912; **8,188 outcome paths**; **5,960 distinct compiled scene IDs** across 4 scenarios | Actual composer output after context, milieu, role, region and effect resolution |
| Eligible person × scene × outcome situations | **1,073,786** | Measured over 3,000 synthetic capacity profiles across peace/war/reform with the real engine's candidate audit |
| Actual executed events | **20,186 events / 88 years** in the final playtest; **443 composed events**, **203 distinct kernels** | Real `EventFact` log, not capacity |
| Narrative realizations | **4,065 authored outcomes** + 2,551 compiled scenes' narration variants | Exact-duplicate detection is clean; template repetition is not |

The **naive Cartesian bound is 8,694,688** for transparency, but it is not used
as a success claim. The 1,073,786 count is composed of real, profile-specific
eligibility checks that passed stage, age, region, role casting and outcome
conditions. It is still a candidate-capacity count, not a claim that all those
events were played.

## 5. Experiments

### A. Same recipe, different world conditions

`scripts/v4-phase12-experiment-a.ts` runs `kernel-civic.leaflet-night` under
peace-1912, war-1915 and reform-1930, with rate forced to 1 only as an
experimental control. Real EventFacts:

| Scenario | Compiled scenes | Variant | Actual events | Outcome / recorded effects |
|---|---:|---|---:|---|
| peace-1912 | 5 | base | 3 | `civic-leaflet-police` ×3; condition `under_police_observation`, flag, relation, reputation −0.03, knowledge |
| war-1915 | 3 | `civic-leaflet-war` + base | 3 | `civic-leaflet-war-ration` ×3; ration flag, two relations, cash −2, ration knowledge |
| reform-1930 | 1 | base | 0 | No eligible event in this controlled sample |

The same mechanism produces a police-warning leaflet in peace and a ration-cut
illegal print run in war. This is a change in action, effect and text, not a
renamed template.

### B. Same world, different people

Read-only candidate audit on the real seed world:

| Profile | Scene candidates | Task candidates |
|---|---:|---:|
| 12-year-old child in a tenement | 25 | 5 |
| 38-year-old print worker | 580 | 56 |
| 28-year-old employed woman | 140 | 34 |
| 44-year-old municipal official | 211 | 31 |
| oldest living person (63) | 18 | 10 |

The child gets childhood/family/school candidates; the print worker gets the
largest industrial/composed pool; the elder gets old-age/care scenes. Person
facts change access, not just text.

### Person-level branch control

`r1-work.market-stall-allotment` with all other facts equal:

| Household cash | Events | Outcome | Visible effects |
|---:|---:|---|---|
| 0 | 12 | `pushed-the-cart-to-the-corner` | denied-stall flag, `pushcart_vendor` role, neighbour relation |
| 100 | 12 | `bought-the-middle-place` | cash −5, reputation loss, bribe flag, market-master relation |

This is an actual engine settlement under a controlled outcome policy; it is
not a hand-written comparison table.

### C. Content expansion

| Metric | Phase 11 | Phase 12 |
|---|---:|---:|
| Kernels | 150 | **1,011** |
| Variants | 98 | **740** |
| Authored outcomes | 450 base | **3,050 base / 4,065 with variants** |
| Domains | ~9 | **31** |
| Compiled scenes (Vienna 1912) | 255 | **2,551** |
| Compiled tasks (Vienna 1912) | 151 | **191** |
| Distinct compiled scene IDs across scenarios | 996 | **5,960** |

### D. Million-scale capacity

`scripts/v4-phase12-capacity.ts` builds 1,000 synthetic but valid profiles per
scenario (age, sex, education, employment, roles, cash, health, skills,
organizations) and runs the real `auditCandidatePools` over peace-1912,
war-1915 and reform-1930.

Final measured totals:

- 3,000 person-scenario profiles
- **404,156 scene candidates**
- **66,459 task candidates**
- **1,073,786 eligible outcome situations**
- **73,199 conditional-outcome situations**
- 0 profiles with no scenes in the final run

This is the strongest honest “million-level” result: every counted situation
passed the actual eligibility, casting and outcome-condition path. It is not
the naive 8.69M product and it is not 1M committed events.

### E. Long-cycle lives

Final 88-year playtest (1912–2000):

- **20,186 events**, 229.39/year
- **443 composed events**, **203 distinct composed kernels**, 5 contexts, 8 milieus
- 482 named persons, 155 alive at the end, 100 births, 325 deaths
- **16,598 distinct texts**, reuse ratio **0.1777**
- 0 unresolved template tokens, 0 literal `None`/`undefined`, 0 empty participant
  lists, 0 events after subject death, 0 events before birth
- 17,978 events carry an Incident Trace; composed trace coverage **1.0**
- 63 scene-prefix repeat offenders (max 72), down from 382 (max 86) in the
  earlier Phase 12 run but still a real repetition problem

Focal lives remain uneven: Lena 213 events, Emil 556, Hedwig 523, Mitzi 450,
while Rosa has 6. That is not a solved life-diversity problem.

## 6. Performance

Final idle-machine measurements, 3 simulated years:

| Population | `phase12` composed-only benchmark | Heap |
|---:|---:|---:|
| 1,000 | 281 ms/year | 105 MB |
| 5,000 | 672 ms/year | 202 MB |
| 20,000 | **2,515 ms/year** | 444 MB |

The original Phase 11 benchmark (three synthetic base scenes + composition +
ALL/P9 tasks) at 20,000 persons:

- **2,760 ms/year**
- 397 MB heap
- 18,718 events over 3 years

Target: **<5,000 ms/year at 20k**. Met in both measurements.

The important optimizations were: role/person indexes, subject-id in the role
cache key, direct existing-partner lookup, no person-role reuse within an
incident, coarse candidate keys, alias sampling for large pools, prepared
eligibility without rechecking static conditions, composition reuse across
years, and removal of unnecessary array sorting in candidate merges.

A residual cost remains in blocked role casts (4,240 blocked scene attempts in
88 years) and in base content repetition. They do not violate the 5 s target
but they reduce event conversion.

## 7. Literary and mechanics review

### Literary

- Initial 20-event sample: **2/20 pass (≥34/40), mean 28.75**.
- 12 targeted rewrites: **9/12 pass, mean 33.58**.
- Post-rewrite composed sample: **1/4 pass, mean 32.00** (war-ration leaflet
  passes; police leaflet and both market branches near-miss/fail).
- Final 12-event excerpt re-score after engine fixes: **3/12 pass, mean 30.50**.
- Subject identity improved: all 12 final scored excerpts centered the trace
  subject. Pronoun agreement still fails (Hedwig `他`, Emil `她`), and effect
  visibility is now the main blocker (cash/health/relation/flag effects remain
  off-page in otherwise concrete scenes).

Report: `docs/v4/phase-12-critique.md`; rewrites:
`docs/v4/phase-12-rewrites.json`.

### Mechanics

- Initial 20-event sample: **6 pass / 14 flag**.
- Two hard engine bugs found and fixed: subject-role cache collision; stranger
  father in birth scenes.
- Re-audit after fixes: **7 pass / 7 flag**; subject-cache bug gone; partner
  miscast narrowed but birth scenes starved (`sameHousehold` issue), then partly
  restored by allowing existing cohabitants.
- Trace effects now exactly match committed effects; no raw `$role`/`{token}`
  remains in trace text.
- Remaining: birth rate 100 vs 237 in Phase 11, pronoun leaks in legacy
  generated packs, missing cash/relation details in some prose, and 91
  `unresolved_effect_ref` / 33 `invalid_relation` runtime warnings over 88 years.

Report: `docs/v4/phase-12-mechanics-critique.md`.

## 8. Browser evidence

- `pnpm test:e2e --config playwright.v4.config.ts` passes.
- `docs/v4/phase-12-browser.png` — three-pane observer, log, map, person hover.
- `docs/v4/phase-12-incident-trace.png` — event modal showing the **因果链**
  section and **机制: birth** for a committed birth event.
- The browser test opens an event with a trace, verifies `机制`, checks the
  semantic person hover, map pin and person dossier, and writes the screenshot.

The e2e config now uses ports 3012/5176 to avoid a stale local dev server on
3011/5174. It ignores only the expected 403 resource errors from private-event
detail requests; the modal shows the privacy notice for those.

## 9. Verification commands and actual results

```text
pnpm typecheck
  pass

pnpm exec vitest run tests/v4-*.test.ts
  32 files passed / 2 skipped; 195 tests passed / 8 skipped
  22.88s

pnpm test
  81 files passed / 7 skipped; 475 tests passed / 36 skipped
  160.32s

pnpm build
  pass; 2.83s

pnpm test:e2e --config playwright.v4.config.ts
  1 passed; 13.5s (test 9.9s)

pnpm exec tsx scripts/v4-phase12-performance.ts 1000 5000 20000
  281 / 672 / 2515 ms per year

V4_BENCH_COMPOSITION=1 V4_BENCH_TASKS=p9 \
  pnpm exec tsx scripts/v4-runtime-benchmark.ts 20000 3
  2,760 ms/year; 397 MB heap; 18,718 events

pnpm exec tsx scripts/v4-phase12-capacity.ts 1000
  1,073,786 eligible outcome situations; 7m15s

pnpm exec tsx scripts/v4-playtest.ts
  88 years; 20,186 events; 443 composed; 203 kernels
```

## 10. What is not done / limitations

1. **Literary quality is not at the target.** 3/12 final excerpt pass and
   30.50/40 mean; effect visibility and pronoun agreement remain.
2. **Births fell from 237 to 100 in the 88-year playtest.** The stranger-father
   bug is fixed, but strict partner casting starves some birth scenes. Further
   work should model partnership formation before birth, not loosen casting
   back into a stranger father.
3. **Composed events are still a minority of all events.** 443 / 20,186 in the
   final playtest. Many recipes are blocked by missing family/organization
   roles or region/place constraints. The 1,073,786 capacity count is real, but
   it is candidate capacity, not a played-event count.
4. **Base content repetition dominates the log.** Top repeated action
   `statistical_illness_worsened` and base social-movement/laundry scenes; 63
   prefix offenders, max 72 repeats for one person. The new kernel library did
   not replace Phase 9/10 base scenes.
5. **Trace coverage is 88.4% of all 35-year events.** Task/agency/statistical
   events do not all carry traces; composed trace coverage is 1.0.
6. **16 compilation errors remain** for unresolved placeholders in rural
   contexts (e.g. hospital/school effects where the rural context has no such
   place). They are recorded and the affected outcomes are dropped; they are
   not silently narrated.
7. **Runtime warnings remain:** 91 `unresolved_effect_ref`, 33
   `invalid_relation`, 74 `scheduled_event_ineligible` over 88 years. These are
   bounded but not zero.
8. **No production PostgreSQL/API load test at 1M events**, no multi-city world
   pack beyond Vienna/Klosterneuburg, and no 10k historical-person activation
   was performed in this phase.
9. **No runtime LLM narrative adapter was added.** Content was LLM-authored at
   development time; gameplay uses deterministic authored text and the
   Incident Trace. The model worker remains available but was not used to
   generate live prose during this acceptance run.

The repository does not claim a live public deployment, paid-service access or
production capacity beyond the local measurements above.
