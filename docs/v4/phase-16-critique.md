# Phase 16 — Independent Critique and Revision Response

Date: 2026-11-06  
Reviewer: independent mechanism/gameplay Critic (no code or content edits)  
Primary evidence reviewed: `phase-15-phase16-live-g.md/json` (40 years, 13,360 events, 294 persons), `phase-15-phase16-live-e.md/json` (45 years, 14,491 events), four generated pack JSONs, and the activation diagnostics.

> This critique was written **before** the revision round. It is kept as the independent finding. The “Revision response” section records what was changed afterwards and what evidence was rerun; it is not a second independent score.

## 1. Score

**19/30** for the observed lives.

| Dimension | Score | Why |
|---|---:|---|
| Specificity | 4/5 | Exact rooms, seals, stamps, tools and ledgers: the seal in the drawer, the “顾问” lunch menu, the 17–17 vote, the father’s lathe. |
| Causality | 3/5 | Offices are used and the curse reacts to named betrayals, but the curse’s success branch often committed no health effect on the betrayer, the occupation state never ended, and the work permit created no job. |
| Character continuity | 3/5 | Klara’s power arc and Hedwig’s curse theory are real; Mitzi, Rosa, Anton and Lena reset between scenes, and several state/person records disagree. |
| Relationship continuity | 3/5 | Children now have real ids and some scenes, but the dominant family state named no child, and a sibling inheritance scene committed only an `acquaintance` relation. |
| Historical texture | 4/5 | Anschluss, occupation, requisitions, black market and liberation are lived, not just reported. Dates are January placeholders, and occupation continued after liberation. |
| Dramatic shape | 2/5 | Strong individual scenes, but seven of eight live-g focals are alive at 1952 and simply stop; one focal “full life” is a single death event. |
| **Total** | **19/30** | A real mechanism improvement at the top, not a higher floor. |

The eight-life mean was **18.0/30**, the same as Phase 15’s final mean; the best life (Hedwig) was **23/30**, Klara **21/30**, Josef **5/30** because his life contains one subject event. Phase 16 raised the ceiling, not the median.

## 2. Strongest concrete moments

1. **Klara, 1937.01 — the seal in the drawer.**  
   `curse15-betrayal.signature::ctx-vienna-authoritarian-1934::milieu-tenement/the-seal-was-used`. Helene Hofer uses Klara’s seal to sign a purchase order, sells the last coal, and puts the old ink pad back. Effects: `cash -3`, `reputation -0.10`, a rival relation, a condition, and `flag: seal_used_by_trusted_hand`. The office creates the paper trail that later endangers her.

2. **Klara, 1937.09 — the sinecure and the lunch menu.**  
   `office16-favor.private-sinecure::ctx-vienna-authoritarian-1934::milieu-tenement/sinecure-created`. Klara adds a “顾问” line to the establishment table at two kronen a month; the advisor’s only document turns out to be the clerk’s lunch menu. Effects: a real `Position`, `organization_funds -2`, a friend relation, a flag and knowledge. This is the clearest proof that a position can be used, and that it has a cost.

3. **Klara, 1948.01 — the tie.**  
   `office16-rival.removal-motion::ctx-vienna-postwar-1945::milieu-tenement/the-vote-ties`. The second ballot is 17–17; the chair may cast a second vote; Klara reads her own name twice; Katharina Weiss says she will bring more people next time; Klara says “椅子够用.” Effects: `reputation -0.02`, a rival relation, `organization_funds -1`, `flag: tie_broken_by_chair`, and knowledge of the rule.

4. **Hedwig, 1936.01 and 1940.01 — the curse becomes a theory and then a price.**  
   `curse15-notice.the-second-illness/counts-the-interval`: she writes the dates of two betrayals and two fevers on one paper, finds eleven days between them, hides it in the sewing box, and starts salting the doorway. `curse15-notice.borrowed-mourning/it-turns-in-the-hand`: she takes money to point the curse at Emil Winter 2; the flame runs up her sleeve; he puts it out without calling anyone. This is the best “the curse has a price” sequence in the project.

5. **Hedwig, 1951.04 — the father’s lathe.**  
   `r1-fam.inheritance-dispute::ctx-vienna-postwar-1945::milieu-government/inheritance.split`. Hedwig divides the tools; Anton takes the plane and chisel and leaves the old lathe; under the lathe she finds the inscription “给肯留下来的那个.” Effects: `cash 2`, a flag, a role, and knowledge. The object carries family history. The weakness: the committed relation is only `acquaintance`, so the graph does not know what the scene knows.

**Honorable mention:** Lena, 1946.01, `r15-fam.school-registration/.../wrong-register`. The registrar writes Anna 3’s name as Lena’s childhood name; the child laughs all the way home. This is what the family pack can do when it casts the child.

## 3. Weaknesses

### 3.1 The family state was a school-tick generator, not a child mechanism

`raising-child` was the largest new state: **95 instances, 627 ticks, 405 reactions, 1,032 of 13,360 events (7.7%)**, and 308 events consumed by other scenes. It was also the most repetitive:

- Klara’s 267-event life contained **44 `raising-child` ticks and 32 `school-note` reactions** — 76 events, 28.5% of the life. Exact duplicate texts totalled **95 of 267 (35.6%)**; the three `school-year` texts repeated 23, 21 and 32 times.
- Hedwig, 1939.01, had **four `school-year/struggles` ticks in one year**, pushing `schoolProgress` 22 → 17 → 12 → 7 → 2; 1940.01 had four `learns` ticks pushing 11 → 19 → 27 → 35 → 43. The numbers looked like one child collapsing and recovering four times; they were four child states ticking independently.
- The tick text never used the linked child. The `state_add` from birth carried `links.child`, but the prose said only “孩子今年学会了自己系鞋带” for 19 years and five children. Klara had six births and only **two child-participant events**; Hedwig had five births and **one**. `child-leaves`/`child-returns` fired 4/2 times in the world but **zero times in the eight focal lives**.
- `raising-child` was household-owned and was **not shown in the dossier’s State snapshot**. A reader saw dozens of school events but could not see the state, its parameters, or which child it belonged to.
- The `school-year` tick ran every 24 months and the state lasted 216–300 months. It did not stop at school-leaving age; Klara’s 1942.01 ticks continued at `schoolProgress: 100` while the text still said the child was learning to tie shoes.

### 3.2 The curse was reachable, but its signature consequence was still prose-only

Reachability genuinely improved: Hedwig had **five `state_reaction:cursed-by-wish/curse-betrayal` events** (1931.01, 1934.01, 1937.02, 1941.01, 1950.01), against zero in the Phase 15 final dossier. But the committed effects did not deliver the promised cross-person consequence:

- The 1931.01 success text said “第二天，Karl Kraus病倒了,” but the effects were only `state_parameter cursed-by-wish.triggers 0 -> 1` and `mood +0.02`. There was **no health effect on Karl Kraus**.
- The 1950.01 success text said “第二天，Friedrich Lechner病倒了,” but again only `triggers 1 -> 2` and `mood +0.02`. No health effect on Friedrich Lechner.
- The snapshot said `triggers: 2` after five reactions. The three recoil reactions did not increment the counter.
- The 1937.02 recoil text self-cast the betrayer: “Hedwig自己发起了高烧；**Hedwig**第二天照常出门.” The cause `evt:...005717` was not in her subject-event list, so the reader could not see the betrayal that triggered it.
- The force C experiment’s `person-hermann-kral: -0.18` was a harness assertion; the live success branch did not reproduce it.

### 3.3 The occupation state never ended, and the historical timeline was incoherent

The history pack became reachable — **344 kernel events**, mostly `hist15-occ.requisition-notice` (212) and `hist15-occ.work-permit` (80). But the delivered world was still occupied after it had been liberated:

- `occupied-city-regime`: **19 instances, 19 active, 0 ended**, despite a 24–30 month duration.
- 1945.01 `vienna-life-1945-liberation` scenes were followed by post-1945 requisitions: Hedwig 1951.01 `name-the-neighbor`, Lena 1951.01 `name-the-neighbor`, Rosa 1951.01 `work-permit`, and earlier 1947/1948/1950 requisitions.
- Anton’s 1940.11 `r3-war.liberation-flag/raised-flag-on-liberation-day` was followed by `hist15-occ.seed-occupation` in **1941.07**. Lena’s occupation seed was **1946.03**, after 1945 liberation.
- The Anschluss was 1938.01 and liberation 1945.01, although the real events were March 1938 and April 1945. `worldYear` conditions fired in January.
- `work-permit` fired **80 times** but only added a `permit_holder` role, a flag and knowledge. It did not create employment. The text promised a job at a repair works; the same people remained unemployed and received the permit again two years later.

### 3.4 Offices were used in a scene, but not downstream

- **74 office events, 22 positions created, 10 ended, `heldPositions: 3`, `followUpEvents: 1`.** In the whole 40-year run, the office pack produced **one** event that followed up on a previous office action.
- The positive `office-patronage` state had **0 adds**. The only durable office state was `office-under-siege` (12 adds, 5 ticks), which is pressure, not influence.
- The only gate was `conditions: [{kind: "position"}]`. It did not check authority or title. Klara’s `名誉主席` was a real `Position` with `authority: []` from 1932 to 1951; it was never used or lost.
- Scenes rarely named the position or organization. The 1937.09 sinecure did not say “夜校同学会”; the 1944.01 removal motion did not say which office was at stake.
- The ledger was not credible: `organizationTreasury` was 5,092,314.64 while office scenes deducted 1–2 funds and said “预算只够半个位置.” The scarcity language and the treasury could not both be true.
- Organizations were founded, not consolidated: Klara founded `权力俱乐部` in 1934 and `接手后的俱乐部` in 1944; `夜校同学会` was founded twice (1933 and 1936) with the same name; the same organization got two `initiative:found_process` events (1937 and 1938).

### 3.5 Wishes, education and repetition

- **Wish archetypes were mostly labels.** Emil’s `wish-love` produced six identical `state_tick:wish-love/love-pressure/press-on` texts and two generic `love-betrayal` reactions; he never got a `forbidden-attachment` state. Mitzi’s `wish-knowledge` produced eight `press-on`/`put-away` ticks and three humiliation reactions, with no knowledge or education opportunity. Josef’s `wish-craft` had zero ticks; he died at four. Only Klara’s `wish-power` had a real arc.
- **Education disagreed with the person record.** Hedwig’s `apprenticeship-contract` said `trade: 木工`, but her employment was `Schriftsetzer`; the `journeyman` transition wrote `education apprenticeship level 3`, while the header said `secondary 1`. Klara’s state was a carpentry apprenticeship, while the header said `primary 4`.
- **The new layer increased exact repetition.** The deterministic critic reported `repeatRate: 0.1763` in live-g and `0.1787` in live-e, against Phase 15’s 0.118 and 0.091. It still returned `findings: []` and `verdict: "pass"`.
- **The focal sample was not eight full lives.** Josef was one subject event, `statistical_death/violence` at 1916.01, age four. Live-e Lena was five events, `statistical_death/infant_diarrhoea` at 1915.05, age three.
- **Base prose still broke character.** Anton was “她” in 1931.02, 1932.12, 1933.09, 1941.10, 1943.01 and 1946.01; Klara was “他” in 1927.01 and 1940.01. Anton’s 1935.11 rent-arrears and Rosa’s 1945.07 moving-day used second-person “你.”
- **No explicit horizon.** Seven of eight live-g focals were alive at 1952 and the dossier simply stopped. Only Klara had a death scene.

## 4. Revision priorities

1. **Make `raising-child` a child, not a household school meter.** Use `links.child` in every tick/reaction; show household states in the dossier; age-gate school events; end/cap the state when the child leaves; prevent multiple identical ticks.
2. **Make the curse’s success branch commit a real cross-person effect.** Health/condition on `$betrayer`; increment `triggers` on every reaction; reject self-cast betrayers; include the triggering betrayal in the trace.
3. **End the occupation at liberation and anchor history to months; make the permit a job.** Enforce duration for place-owned states; react to liberation; narrow the occupation seed; make `work-permit` create employment or a concrete opportunity; reduce requisition volume.
4. Lower priority: authority-specific office conditions, name the position/organization in prose, create office-patronage follow-ups, fix the treasury scale, wire love/knowledge/craft wishes, repair `trade`/`education` disagreement, make the critic flag high repetition and one-event focal lives.

## 5. Verdict

**Phase 16 is meaningfully different from Phase 15 in mechanism, but not yet in median life quality.**

What genuinely changed:

- A real `Position` is now used in later scenes: Klara’s 1937 sinecure, 1944 removal motion, 1948 tie vote and 1950 hire are committed Position effects. This is the first time an office is a lever, not a label.
- The curse fires on named betrayals in full play, not only in the forced experiment. Hedwig’s 1931/1934/1937/1941/1950 chain is a real narrative spine.
- The Anschluss and occupation change food, cash, work and reputation; the history pack is no longer only a backdrop.
- The family state persists care and creates school scenes; the best family scene shows the mechanism can cast a child.

What did not change enough:

- The eight-life mean was **18.0/30**, the same as Phase 15’s final mean. The best life was 23/30; the worst 5/30. The improvement was concentrated in Klara and Hedwig.
- Event volume was dominated by one generic family state and one generic occupation kernel. The consequence branches — child-leaves, scandal, remarriage, after-the-run, office-patronage — were rare or zero.
- The curse’s promised health consequence was often missing on the betrayer; the occupation never ended; the work permit created no job; the positive office network rarely formed.
- The love, knowledge and craft wishes were template ticks, not engines. Only power worked.
- The automated critic passed a dossier with 17.6% exact repetition and a one-event focal “full life.”

The honest summary was: **“Phase 15 was a real mechanism inside a still-fragmented life simulator; Phase 16 is a real mechanism that is occasionally used downstream, inside a still-fragmented life simulator.”**

## 6. Revision response (after the critique)

The following changes were implemented and rerun. They are a response to the critique, not a claim that the critique was wrong.

### 6.1 Children

- State tick/reaction text now receives the state’s typed `links` as real roles and participants. `raising-child` ticks name the linked child (`{child}`), and the child is a participant in the committed fact.
- `state_parameter`/`state_remove` effects authored as `$household`/`$subject`/`$subjectOrg`/`$subjectPlace` now bind to the **current StateInstance** before resolution. Before this fix, four child states’ ticks all wrote to the first active state; after it, each child has independent progress (e.g. revision-c: Berta 23→18, Gustav 21→29 in the same year).
- The dossier now shows household and organization states for the focal person, with `ownerType`, `linkNames`, parameters and ticks.
- Family pack text now names the child in school ticks, school notes and budget ticks.
- Revision seed `phase16-final-a`: **191 births, 184 raising-child states, 1,015 school ticks, 24 child-leaves, 7 child-returns**, 10 state reactions/curse etc. The number of ticks is still high; the identical-template problem is reduced by child names and per-instance binding, not eliminated.

### 6.2 Curse

- Success branch now commits health **and** a `condition` on `$betrayer`; failure branch also increments `triggers`. A self-cast betrayer is rejected by a generic reaction guard.
- Revision seed `phase16-final-a`: **136 curse-pack events, 10 `cursed-by-wish` reactions, 11 suspected-witchcraft adds**; success branches show `health -0.18` and/or `condition` where the target can receive it. Targets already at the health floor or dead still produce no health delta; the condition is the fallback, and this limitation is reported.

### 6.3 History

- Place/region-owned states now get a living local anchor and can tick/expire. `occupied-city-regime` went from **19 active / 0 ended** in live-g to **7 instances, 6 ended, 1 active** in final-a.
- A new `liberation-ends-occupation` reaction removes the occupation state on `liberation` events; the seed is narrowed to 1938–1945, and requisition/work-permit rates and cooldowns are reduced.
- `hist15-purge.loyalty-questionnaire` no longer requires an absent `political_repression` process; it consumes the real institution-purge state.
- History pack events dropped from **344** (live-g) to **127** (final-a), with **7 occupation adds, 9 purge adds, 14 strike-committee adds**. The occupation is no longer an infinite state; one active state in a place with no anchor remains an edge case.
- The work-permit still does not create employment. That is now explicitly a limitation, not a success claim.

### 6.4 What remains

The critique’s larger verdict still stands after this revision:

- the eight-life median is not demonstrably above Phase 15’s 18/30;
- `office-patronage` remains rare; office follow-ups remain few;
- love/knowledge/craft wishes are still mostly ticks;
- the organization treasury scale is still not credible;
- focal short lives and January date placeholders remain;
- the deterministic critic still reports a high repeat rate and does not fail a one-event focal life;
- the occupation timeline is approximate, not a full historical fork.

The revision fixed the most concrete family, curse and occupation execution failures; it did not turn Phase 16 into “living stories” across all lives. That is the honest result.
