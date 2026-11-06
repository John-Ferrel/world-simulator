# Phase 15 — Content Brief: State, Wish and Consequence

Date: 2026-11-05  
Status: authoring brief, not an implementation report.  
Scope: state definitions, kernel/event concepts, wish archetypes, and schema gaps for Phase 15. No runtime code, schema or test result is claimed here.

This brief is written against the frozen architecture in `phase-15-design.md`. State ids and kernel ids are proposals. Each concept is chosen because it changes **what can happen next**, not because it adds a mood label. The test is simple: if the state were deleted, at least three kernels would lose their eligibility, weight or outcome; if not, it is not a state, it is a flag.

Four Phase 14 failures drive the selection: a scholarship erased by an apprenticeship in the same month; a child who disappears after birth; partners who reset without exits; and deaths that happen in a place the person never lived. Each state below is judged by whether it makes one of those failures harder to commit.

Notation:

- `d20 + attribute/skill vs DC` is the deterministic check from the design. Modifiers come from attributes, skills, state tags and history.
- `state_parameter` means the ordinary typed effect, not a new mechanism.
- “Weight” means the scene scheduler's candidate weight, not a guarantee.
- `targetId` strings are an interim authoring device. Typed state targets are a schema gap (see §4).
- All cash is kronen unless stated.

**Working ids vs registered ids.** A concurrent implementation in `packages/v4/content/states/` already registers some of these mechanics under shorter ids. This brief keeps descriptive working ids for readability. Before authoring a kernel, map them to the registered definition, or add the missing definition through the same validator. The mechanics below are the requirement; the id is not.

| Working id in this brief | Registered / closest existing id |
|---|---|
| `st.education_contract` | `university-student` + `apprenticeship-contract` (one slot family, two definitions) |
| `st.debt_bondage` | `debt-bondage` |
| `st.forbidden_attachment` | `secret-lover` (wish-love is a parameterised origin, not a second relationship state) |
| `st.chronic_illness` | `chronic-illness` |
| `st.war_widow` | `war-widow` |
| `st.political_suspect` | `political-suspect` (plus `under-investigation`, `detained`) |
| `st.blacklisted_worker` | `blacklisted` |
| `st.court_kitchen_appointment` | `royal-chef` |
| `st.stage_king` | `stage-king` |
| `st.wish_power` | `wish-power` (the wish archetype state) |
| `st.wish_cursed` | `cursed-by-wish` |
| `st.fame` | `fame` (plus `public-scandal` as a separate state) |
| `st.grief` | `grief` |
| `st.workshop_closure` | no exact match; `strike-wave`, `purge-ongoing` and `city-under-occupation` are adjacent but do not carry wage arrears or a reopen chance |

The mapping is informative, not an instruction to merge definitions. If the registered definition already owns the slot, use it; do not add a duplicate state with a new id.

---

## 1. Fourteen state concepts

### 1.1 `st.education_contract` — 学籍/学徒契约

**Owner / slot / conflict / duration.** Person; slot `education`; conflict `block`; 24–60 months. One slot family, two definitions (or one definition with a `track` parameter). A university contract and an apprenticeship contract cannot both be active; entering one while the other is active must go through an explicit exit or a `replace`, and the committed event records both instance ids.

**Parameters.** `track` (`university` | `apprenticeship`), `year` 1–5, `standing` 0–100, `arrears` 0–40, `skillHours` 0–1000, `masterTrust` 0–100, `scholarship` boolean, `faculty` string, `masterId` string, `examReady` boolean.

**What it changes.** `track=university` opens registration, seminar, thesis, student politics and professor-patronage kernels; it down-weights full-time employment and early marriage. `track=apprenticeship` opens workshop, journeyman-exam, master-household and runaway kernels; it down-weights university scenes. `arrears > 8` raises the bursar/creditor kernel weight; `standing < 35` raises remedial and dropout kernels; `skillHours > 600` makes the journeyman exam eligible; `scholarship=true` adds a check bonus to tuition scenes but also raises obligation kernels.

**Ticks / transitions.**
1. Academic year (`track=university`): `d20 + intelligence vs 11`. Success: `standing +6`, `year +1`. Failure: `standing -8`, flag `probation`. Critical failure: transition to `st.debt_bondage` with `principal = arrears`, end reason `expelled_for_debt`.
2. Workshop year (`track=apprenticeship`): `d20 + resilience vs 11`. Success: `skillHours +180`, `masterTrust +5`. Failure: `health -0.04`, `masterTrust -8`. Critical failure: `contractPenalty +10` and transition to `st.debt_bondage`.
3. Completion guard: if `year >= 4` and `examReady=false`, the next tick must choose between `repeat-year` and `withdraw`; it cannot silently renew forever.

**Reactions.**
- On committed tag `family_crisis`: roll `willpower vs 12`; failure `standing -10`, success `standing +3` (“held on”).
- On committed tag `public_humiliation`: success `standing +5`, failure `standing -8`; the scene text must name the classroom, the lecturer or the missed dinner, not just “humiliation.”

**Exit consequences.** University graduate: ordinary `education: higher`, role `graduate`, reputation +0.08, one alumni relation; the state stores `thesisTitle` for later echo. Journeyman: role `journeyman`, wage +, `education: apprenticeship level 4`. Dropout: `education` is not silently upgraded; `st.debt_bondage` may open; flag `left_last_semester` and a `keeps_unfinished_thesis` object for a later kernel. A replacement by the other track must produce a scene: the apprenticeship contract is torn up, or the university place is surrendered; no silent overlap.

**Consumed by.** `ed.registration-window`, `ed.tuition-deadline`, `ed.seminar-humiliation`, `ed.thesis-or-wages`, `ed.apprentice-exam`, `ed.master-household`, `ed.runaway-apprentice`.

---

### 1.2 `st.debt_bondage` — 债务束缚

**Owner / slot / conflict / duration.** Person; slot `legal`; conflict `stack`, max 3 (multiple creditors must be distinguishable); 6–60 months. A person can owe a landlord, a merchant and a scholarship fund at once; each instance has its own principal and collateral.

**Parameters.** `principal` 0–200, `rate` 0–20, `monthsRemaining` 0–60, `creditorKind` (`landlord` | `merchant` | `scholarship` | `uncle` | `bank` | `heir`), `creditorId` string, `collateral` (`tools` | `room` | `labour` | `none`), `labourOwedMonths` 0–24, `escaped` boolean, `courtOrder` boolean.

**What it changes.** Blocks or heavily down-weights travel, marriage, strike participation and education entry while `principal > 40`; raises creditor visits, wage garnishment, pawn, labour-for-interest and flight. If `collateral=tools`, work-injury scenes can seize the tools and make the person unemployable. If `courtOrder=true`, police and prison kernels become eligible. A debt is not a mood: it changes the candidate list every year until it is paid, transferred or escaped.

**Ticks / transitions.**
1. Interest and repayment: `d20 + numeracy vs 12`. Success: `principal -3` (a payment was made), `monthsRemaining -1`. Failure: `principal +2`, `monthsRemaining -1`. Critical failure: collateral seized (`tools` removed, `room` changes residence, `labourOwedMonths +6`).
2. Creditor pressure: `d20 + charisma vs 13`. Success: extension (`monthsRemaining +3`, `rate +1`). Failure: `labourOwedMonths +3`, creditor relation −0.1. Critical failure: `escaped=true` is forced by the next scene; the creditor obtains a court order.
3. Transition: `principal <= 0` exits as `paid`; creditor death branches to `inherited` (heir) or `cancelled`; `escaped` exits to `st.political_suspect` with `charges=debt`.

**Reactions.**
- On committed tag `marriage`: the creditor demands settlement. If cash < principal, `relation_end` with the new partner or a new `collateral=room`; the marriage scene cannot simply proceed.
- On committed tag `inheritance`: the debt can be paid; if the heir is the creditor, the debt transfers with a new `creditorKind=heir` and `principal +10%`.

**Exit consequences.** Paid: flag `debt_free`, reputation +0.05, one year of credit eligibility; the ledger is stamped and kept as an object. Default: collateral seized, move to a worse residence, `st.blacklisted_worker` if the creditor controls the trade. Escaped: move, false name, `st.political_suspect`; the debt remains in the old name and can return as a `history` condition years later.

**Consumed by.** `debt.creditor-at-the-door`, `debt.labour-for-interest`, `debt.inherited-ledger`, `debt.player-guarantor`, plus `ed.tuition-deadline`, `work.*`, `court.*`.

---

### 1.3 `st.forbidden_attachment` — 秘密关系（含愿望之爱）

**Owner / slot / conflict / duration.** Person; slot `secret`; conflict `stack`, max 2; 6–120 months. One chosen lover and one wished/arranged attachment can coexist, but each adds exposure. The state never replaces the ordinary `Relation`; it wraps the relation with discretion, reciprocity and discovery mechanics.

**Parameters.** `targetId` string, `origin` (`choice` | `wish` | `arranged` | `political`), `discretion` 0–100, `reciprocity` 0–100, `exposure` 0–100, `jealousy` 0–100, `compulsion` 0–100, `publicFigure` boolean.

**What it changes.** Opens secret meetings, coded letters, alibis, inns, borrowed rooms and gift scenes. Blocks public courtship with another person and ordinary marriage while the attachment is undisclosed; if the person is married, the marriage kernel is replaced by an affair kernel. `exposure > 60` raises discovery, blackmail, scandal and duel; `reciprocity < 20` raises obsession and stalking; `compulsion > 70` means the target can appear in scenes without being cast by ordinary means and “love” checks use compulsion, not affection. This is the difference between a wish for love and a wish for a person who loves you back.

**Ticks / transitions.**
1. Discretion: `d20 + cunning vs 12`. Success: `exposure -5`, `discretion +5`. Failure: `exposure +15`. Critical failure: public scandal (`reputation -0.15`, `relation_end` with spouse, possible duel).
2. Reciprocity: `d20 + empathy vs 12`. Success: `reciprocity +8`. Failure: `jealousy +15`, target relation −0.1. Critical failure: target ends the affair; `exposure +20`; exit to `st.grief`.
3. Transition: `exposure >= 100` exits as `scandal`; `reciprocity >= 90` and both free exits to ordinary partnership/marriage; `compulsion >= 90` forces a `wish-love` outcome, not a normal romance.

**Reactions.**
- On committed tag `public_humiliation`: the lover either defends (`reciprocity +10`, `exposure +5`) or stays away (`exposure -5`, `reciprocity -10`); the choice must depend on the lover's relation trust, not a coin flip.
- On committed tag `betrayal`: `exposure +25`, `jealousy +20`; if the betrayer is the lover, exit to `st.grief` and keep the letter/object as a flag.

**Exit consequences.** Elopement: move, marriage, `st.fame` if the scandal is public, `st.grief` for the abandoned spouse. Exposure: divorce, reputation loss, `st.political_suspect` if the lover is powerful or foreign. Abandonment: `st.grief`, a kept object (`keeps_letter`, `keeps_photograph`), and a later `history` condition. The state must not leave a spouse and a lover both active without an exit scene.

**Consumed by.** `love.secret-meeting`, `love.ultimatum`, `love.wish-love`, `social.player-rumour`, `police.denunciation`, `debt.creditor-at-the-door` (lover pays).

---

### 1.4 `st.chronic_illness` — 慢性病

**Owner / slot / conflict / duration.** Person; slot `health`; conflict `stack`, max 2 (e.g., tuberculosis and rheumatism); 12–240 months. Some instances are permanent; the state can stabilize rather than exit.

**Parameters.** `severity` 0–100, `workCapacity` 0–100, `treatment` (`none` | `clinic` | `sanatorium` | `quack`), `infectious` boolean, `symptom` (`cough` | `fever` | `pain` | `fatigue` | `breath`), `careDebt` 0–100, `diagnosisKnown` boolean.

**What it changes.** Blocks heavy labour, military service and long travel; raises clinic, sanatorium, priest, employer-dismissal and deathbed kernels. If `infectious=true`, household scenes gain quarantine/removal variants and children can be sent away. `workCapacity < 40` makes only light-work tasks eligible; `severity > 70` makes the deathbed kernel eligible; `careDebt >= 40` adds `st.debt_bondage`. Courtship weight drops while severity is high, but a partner may enter a carer relation instead.

**Ticks / transitions.**
1. Body: `d20 + resilience vs 12`. Success: `severity -4`, `workCapacity +2`. Failure: `severity +6`, `workCapacity -4`. Critical failure: `severity = 90`, unlock deathbed; do not kill on a tick without a committed death scene.
2. Treatment: `d20 + literacy vs 11`. Success: `careDebt -5`, `diagnosisKnown=true`. Failure: `careDebt +8`, `treatment=none`. Critical failure: transition to `st.debt_bondage` with `principal=careDebt`.
3. Transition: `severity <= 20` and `workCapacity >= 70` exits as `recovered`; `severity >= 90` exits only through a deathbed or death kernel.

**Reactions.**
- On committed tag `work_injury`: `severity +10`, `workCapacity -5`; the injury and the illness must be described as compounding, not two unrelated scenes.
- On committed tag `death` of a carer: `treatment=none`, `severity +10`, and a `st.grief` state for the carer.

**Exit consequences.** Recovered: flag `survived_illness`, health +0.1, a medical bill paid or a sanatorium discharge paper. Stabilized: state remains with `workCapacity` capped at 60; the person can work, but not at the old job. Death: estate/household effects, a named witness, and `st.grief` for survivors; the cause must be the illness, not `statistical_death`.

**Consumed by.** `ed.thesis-or-wages`, `court.taster-duty`, `grief.anniversary`, `work.blacklist-gate`, `wish.*` (body cost), `debt.labour-for-interest`.

---

### 1.5 `st.war_widow` — 战争寡妇

**Owner / slot / conflict / duration.** Person; slot `civil_status`; conflict `block` against any state tagged `married` (today marriage is a `Relation`, so the entry condition also requires `notHasRelation(partner)`); 24–120 months or until remarriage/death.

**Parameters.** `pensionStatus` (`pending` | `paid` | `denied` | `fraud`), `monthlyPension` 0–40, `dependentCount` 0–6, `deadHusbandRank` string, `griefMonths` 0–60, `arrearsMonths` 0–12, `associationMember` boolean, `remarried` boolean.

**What it changes.** Opens pension office, war-widow association, memorial, widow's rent and charity kernels. Blocks remarriage scenes for the first 12 months or replaces them with gossip/scandal variants. `dependentCount > 2` raises food, clothing, school and child-illness weights; `pensionStatus=denied` opens `st.debt_bondage` and informal work; `associationMember=true` opens collective petition kernels. It is not “grief with a label”: the pension is a recurring eligibility and cash mechanism.

**Ticks / transitions.**
1. Pension office: `d20 + literacy vs 11`. Success: `pensionStatus=paid`, `arrearsMonths -1`. Failure: `arrearsMonths +1`, `pensionStatus=pending`. Critical failure: `pensionStatus=denied`, flag `widow_pension_denied`.
2. Grief year: `d20 + resilience vs 11`. Success: `griefMonths +6`. Failure: add `st.grief` with `severity +10`; `functionality -10`.
3. Transition: remarriage triggers a pension review (50% cut, 50% continuation if the new husband is incapacitated); all dependents grown exits as `pension_ended`; fraud discovery exits to `st.political_suspect` with `charges=fraud`.

**Reactions.**
- On committed tag `war_death_news` (a friend's husband): `griefMonths +3`, `st.grief` severity +5; the scene must name the friend and the photograph, not “the war.”
- On committed tag `inflation` or `currency_reform`: `monthlyPension` real value −20%; the next tick's DC rises by 2.

**Exit consequences.** Remarriage: flag `remarried_widow`, pension ends or is reduced, reputation ±, children may gain a step-parent relation. Death: children to a named guardian, `st.grief` for them. Fraud: fine, `st.political_suspect`, association expulsion. Pension paid: a stamped booklet that can be read in a later scene.

**Consumed by.** `grief.anniversary`, `hist.fork-1938`, `hist.fork-1945`, `police.trial` (character witness), `org.wage-arrears-delegation` (widow as petitioner).

---

### 1.6 `st.political_suspect` — 政治嫌疑人

**Owner / slot / conflict / duration.** Person; slot `legal`; conflict `stack`, max 2 (a police file and a warrant are different instances); 6–84 months.

**Parameters.** `fileThickness` 0–100, `surveillance` 0–3, `evidence` 0–100, `charges` (`sedition` | `espionage` | `black_market` | `moral` | `debt` | `poison`), `protector` boolean, `bail` 0–100, `informer` boolean.

**What it changes.** Blocks travel abroad, university entry, public office and some employment; raises police visits, informer offers, raids, trials and exile. `surveillance >= 2` adds a tail to every meeting kernel; `evidence > 60` makes trial/escape the only high-weight branches; `protector=true` opens the protector kernel but also makes the protector a target. It lowers the weight of public fame and raises the weight of quiet charity, false papers and emigration.

**Ticks / transitions.**
1. File review: `d20 + cunning vs 12`. Success: `fileThickness -8`. Failure: `fileThickness +10`, `surveillance +1`. Critical failure: arrest; the state exits with `endReason=arrested` and the engine applies the ordinary prison condition.
2. Protector: `d20 + charisma vs 13`. Success: `fileThickness -15`, `protector=true`. Failure: `protector=false`, `fileThickness +5`. Critical failure: the protector denounces; `evidence +25`.
3. Transition: `evidence >= 100` schedules the trial kernel; `fileThickness <= 10` and `surveillance=0` exits as `cleared`; conviction exits to prison; exile exits with a move.

**Reactions.**
- On committed tag `denunciation`: `evidence +20`, `surveillance +1`; the denouncer must be a real cast person, not an anonymous clerk.
- On committed tag `amnesty` or `war_end`: `fileThickness -30`; if `charges=sedition`, 50% chance of full clearance, 50% of file retained with a new `charges=espionage`.

**Exit consequences.** Cleared: flag `police_file_closed`, reputation +0.05, but the file can reopen on a new `history` condition. Convicted: prison, unemployment, family `st.grief`, `st.blacklisted_worker` on release. Exiled: move, `st.grief`, `st.fame` if the exile writes or organizes. Killed: death with a named witness and a cause.

**Consumed by.** `police.first-visit`, `police.informer-offer`, `police.trial`, `police.protector`, `police.denunciation`, `hist.fork-1938`, `hist.fork-1945`, `wish.power-*`.

---

### 1.7 `st.blacklisted_worker` — 黑名单工人

**Owner / slot / conflict / duration.** Person; slot `employment`; conflict `block`; 6–60 months. A formal job is not a state, so the block is enforced by hiring-kernel conditions and weight modifiers, not by duplicating `Person.employment`. A person can be blacklisted and still work under a false name; that is a parameter, not a second state.

**Parameters.** `scope` (`factory` | `sector` | `city`), `monthsActive` 0–60, `falseName` boolean, `discovered` boolean, `wagePenalty` 0–50, `keeperOrgId` string.

**What it changes.** Formal hiring kernels are blocked or reduced to a bribe/false-name branch; odd-job, migration, informer and underground-work kernels gain weight. `scope=city` limits work to the informal sector; `falseName=true` adds a discovery kernel; `wagePenalty` reduces pay in any employment outcome. A labour shortage or war can temporarily shrink the scope; a strike can escalate it from factory to sector.

**Ticks / transitions.**
1. List cools: `d20 + cunning vs 12`. Success: `monthsActive -3`. Failure: `monthsActive +3`, `wagePenalty +5`. Critical failure: `discovered=true`, unemployment, fine.
2. Odd job: `d20 + resilience vs 12`. Success: cash +4, `health -0.03`. Failure: cash −2, `health -0.05`. Critical failure: injury; add `st.chronic_illness`.
3. Transition: `monthsActive <= 0` exits as `list_expired`; `discovered` exits as `discovered`; migration exits as `left_city`.

**Reactions.**
- On committed tag `strike_participation`: `scope` escalates one step (factory → sector → city); `monthsActive +6`.
- On committed tag `labour_shortage` or `war_mobilization`: `scope` shrinks one step; if `scope=factory`, 50% chance to exit as `emergency_hiring`.

**Exit consequences.** Expired: flag `former_blacklist`, formal work eligible, but a `history` condition can still trigger a foreman's memory. Discovered: fine, reputation −0.1, possible `st.political_suspect`. Left city: move, new job, but `st.grief` for the left household and a `keeps_union_card` object.

**Consumed by.** `work.blacklist-gate`, `work.false-name-payday`, `work.strike-recidivism`, `work.employer-pardon`, `org.wage-arrears-delegation`.

---

### 1.8 `st.court_kitchen_appointment` — 宫廷厨房职位

**Owner / slot / conflict / duration.** Person; slot `court_service`; conflict `block`; 12–120 months. This state is deliberately narrow: it is a court appointment, not a generic chef job. It carries access, taster duty and court politics.

**Parameters.** `courtId` string, `clearance` 0–3, `favor` 0–100, `tasterDuty` boolean, `enemyCook` boolean, `dishesServed` 0–1000, `poisonScares` 0–5, `wage` 0–20.

**What it changes.** Opens palace, banquet, royal tasting, food-politics and promotion kernels; blocks ordinary market/factory scenes while the court is in session. `favor < 30` restricts to scullery and errand scenes; `clearance >= 2` opens private chambers and overheard politics; `tasterDuty=true` adds poison checks; `enemyCook=true` adds sabotage and blame. It is the main entry point for the “chef identified as tsar” branch.

**Ticks / transitions.**
1. Kitchen service: `d20 + craft vs 12`. Success: `favor +8`, `wage +1`, `dishesServed +50`. Failure: `favor -10`, `poisonScares +1`. Critical failure: blamed for a poisoning; transition to `st.political_suspect` with `charges=poison`.
2. Court politics: `d20 + cunning vs 13`. Success: `clearance +1`. Failure: `enemyCook=true`, `favor -10`. Critical failure: dismissed; add `st.blacklisted_worker` with `scope=sector` (court service).
3. Transition: `favor >= 90` promotes to role `chef`, `wage +5`; court fall/revolution exits as `court_fell`; a noble's death by poison exits to `st.political_suspect`.

**Reactions.**
- On committed tag `royal_banquet`: `favor` moves by the dish outcome; a failed dish is a real `reputation -0.05` at court, not a mood.
- On committed tag `food_poisoning`: `tasterDuty=true`, `health -0.08`, `poisonScares +1`; the cook and the taster are different people and the scene must name which one is which.

**Exit consequences.** Promotion: role `chef`, `st.fame(scope=city)`, a court reference. Dismissal: reference letter or `st.blacklisted_worker`; the reference can be read in a later `history` condition. Court falls: unemployment, exile, `st.grief`; the recipe book is an object. Poison conviction: `st.political_suspect`, trial, possible death.

**Consumed by.** `court.chef-first-banquet`, `court.taster-duty`, `court.chef-identified-as-tsar`, `stage.mistaken-procession` (cross-cast), `hist.fork-1945`.

---

### 1.9 `st.stage_king` — 舞台国王

**Owner / slot / conflict / duration.** Person; slot `performance`; conflict `stack`, max 2 (an actor can play two roles in repertory); 3–24 months. The definition declares `authority: none` and never emits a `position` effect. A real office is an ordinary `Position` in an `Organization`; this state can coexist with it, but it cannot create it.

**Parameters.** `production` string, `role` string, `performances` 0–100, `publicBelief` 0–100, `costumeQuality` 0–100, `scandal` 0–100, `understudy` boolean, `realAuthority` false.

**What it changes.** Opens stage, rehearsal, mistaken-procession, lèse-majesté and stage-execution kernels; blocks anonymous life while `publicBelief > 40`; raises crowd, police and political-faction scenes. `publicBelief > 60` makes a crowd treat the actor as a sovereign; `scandal > 70` makes arrest/execution eligible; `costumeQuality` affects whether the mistake is plausible. Conditions for “commands are obeyed” must require a real `Position`, not this state; if only `st.stage_king` is present, the outcome is “ignored,” “laughed at” or “arrested,” never a real command.

**Ticks / transitions.**
1. Performance run: `d20 + charisma vs 12`. Success: `publicBelief +10`, `performances +5`. Failure: `publicBelief -10`, `scandal +5`. Critical failure: riot at the theatre; add `st.political_suspect` with `charges=sedition`.
2. Costume check: `d20 + craft vs 11`. Success: `costumeQuality +10`. Failure: `scandal +10` (a wardrobe failure is read as mockery). Critical failure: real insignia sewn onto the costume; add `st.political_suspect`, and the mistaken-procession kernel becomes eligible.
3. Transition: `publicBelief >= 90` schedules the mistaken procession; `scandal >= 80` schedules the stage execution; the run ends normally at `performances >= 100` and exits as `run_ended`.

**Reactions.**
- On committed tag `revolution`: the crowd storms the theatre; `publicBelief +20`, `scandal +10`; the actor can become a symbol or a hostage.
- On committed tag `royal_death`: a mourning crowd mistakes the actor for the successor; `publicBelief +15`, `st.political_suspect` risk +.

**Exit consequences.** Run ends: state exits, reputation +0.05, a playbill and a costume piece as objects. Mistaken sovereign: `st.fame` (scope city/realm) and/or `st.political_suspect`; the actor may be offered a real office only through a separate `position` effect and a scene that says who grants it. Stage execution: the play execution is fake (`publicBelief +20`, `scandal -10`); a real execution requires a death effect, a cause, a place and a witness. The state never kills by itself.

**Consumed by.** `stage.king-cast`, `stage.mistaken-procession`, `stage.execution`, `stage.king-after-the-run`, `court.chef-identified-as-tsar`, `wish.power-mistaken`.

---

### 1.10 `st.wish_power` — 权力愿望

**Owner / slot / conflict / duration.** Person; slot `wish`; conflict `block`; 12–120 months. This is the mechanism that turns an untrusted wish for power into opportunities, not a grant.

**Parameters.** `intensity` 1–5, `ironyBias` 0–100, `mode` (`none` | `patron` | `puppet` | `usurper` | `believed`), `realAuthority` boolean, `puppetDepth` 0–100, `suspicion` 0–100, `patronId` string.

**What it changes.** Opens power-opportunity kernels (a patron, a vacant office, a faction, a stage, a court). Weight scales with `intensity`; `realAuthority=false` gates “commands ignored,” “puppet” and “borrowed authority”; `mode=believed` gates mistaken identity; `suspicion > 60` opens coup/assassination; `puppetDepth > 70` makes escape from the patron the main branch. It does not create a Position; a real office requires the ordinary `position` effect in an outcome.

**Ticks / transitions.**
1. Consolidation: `d20 + willpower vs 12`. Success: `puppetDepth -5`; if `realAuthority=false`, `suspicion -5`. Failure: `suspicion +10`, `puppetDepth +10`. Critical failure: public humiliation; `st.fame` with `scandal +15`.
2. Court intrigue: `d20 + cunning vs 13`. Success: `suspicion -10`, one enemy relation −0.1. Failure: `suspicion +15`. Critical failure: coup attempt; `st.political_suspect` with `charges=sedition`.
3. Transition: `realAuthority=true` and `puppetDepth < 30` exits as `real_power` with a `position` effect; `suspicion >= 80` transitions to `st.political_suspect`; `puppetDepth >= 90` exits as `puppet_exposed`; `mode=believed` plus `st.stage_king` schedules the mistaken-sovereign kernel.

**Reactions.**
- On committed tag `betrayal`: `suspicion +20`, one purge kernel becomes eligible; the purge must name the betrayer and the office, not “enemies.”
- On committed tag `public_acclaim`: roll `charisma vs 13`; success `realAuthority` progress (+1 legitimacy token), failure `suspicion +10` (“the crowd is not an appointment”).

**Exit consequences.** Real power: `position` in an existing organization, `st.fame`, a named enemy relation, and the ordinary obligations of the office. Puppet exposed: `st.political_suspect`, loss of patron, `st.debt_bondage` if the patron calls in gifts. Believed: `st.fame` + `st.political_suspect`; the person may be executed, exiled or kept as a mascot. Death: succession crisis in the organization, not a silent reset.

**Consumed by.** `wish.power-real`, `wish.power-puppet`, `wish.power-mistaken`, `stage.mistaken-procession`, `court.chef-identified-as-tsar`.

---

### 1.11 `st.wish_cursed` — 愿望诅咒

**Owner / slot / conflict / duration.** Person; slot `curse`; conflict `stack`, max 2; 12–240 months. A curse is not a global “monkey paw” rule. It is a state with a form, a severity and a trigger count; it changes which wish-related outcomes are eligible.

**Parameters.** `curseForm` (`literal` | `inversion` | `delay` | `transfer` | `hunger`), `severity` 0–100, `triggerCount` 0–9, `benefactorId` string, `knowsCurse` boolean, `broken` boolean, `wishTag` string.

**What it changes.** Every wish-related kernel gains a curse variant; the variant weight rises with `severity`. `severity > 60` opens exorcism, ritual and bargaining; `knowsCurse=true` opens the break kernel; `curseForm=transfer` adds a risk to family scenes; `curseForm=hunger` makes the wish consume money, food or health every time it is used. It is the mechanism that makes “the wish came true” a scene with a cost, not a narrator's aside.

**Ticks / transitions.**
1. Curse pressure: `d20 + willpower vs 12`. Success: `severity -5`. Failure: `triggerCount +1`, apply a concrete curse effect (`cash -3`, `health -0.05`, or a relation −0.1). Critical failure: `curseForm=transfer`; a loved one gains `st.chronic_illness` or `st.grief`.
2. Omen reading: `d20 + perception vs 11`. Success: `knowsCurse=true`. Failure: `severity +5`. Critical failure: misinterpretation; `triggerCount +2`.
3. Transition: `severity <= 10` exits as `dormant`; `triggerCount >= 9` exits as `fulfilled` (the curse completes: death, ruin or a fate worse than death, chosen by content); `broken` exits as `broken`.

**Reactions.**
- On committed tag `wish_granted`: immediate twist (`severity +10`, `triggerCount +1`). The twist must use the wish's own object or wording; “everything goes wrong” is not a reaction.
- On committed tag `betrayal`: `severity +20`; if the betrayer is the benefactor, `curseForm=transfer` becomes eligible.

**Exit consequences.** Broken: flag `curse_broken`, reputation +0.1, the benefactor loses a relation or a position. Fulfilled: death or `st.fame` with `scandal`; the estate/household is affected. Transferred: the target gets the state; the original person keeps a `keeps_curse_token` object and a `history` condition. Dormant: the curse can return on a `history` condition; it is not erased from the world.

**Consumed by.** `wish.curse-twist`, `wish.curse-betrayal`, `wish.curse-break`, `love.wish-love`, `fame.first-press` (ironic fame).

---

### 1.12 `st.fame` — 名声

**Owner / slot / conflict / duration.** Person; slot `public`; conflict `stack`, max 2; 6–120 months. Fame and notoriety are one mechanism with two parameters; “famous for being shamed” is not a separate state.

**Parameters.** `scope` (`street` | `city` | `realm` | `international`), `notoriety` 0–100, `scandal` 0–100, `privacy` 0–100, `income` 0–20, `audience` string.

**What it changes.** Opens patronage, invitations, press, impostor and public-demand kernels; blocks anonymous crime, quiet courtship and ordinary queue scenes while `notoriety` is high. `scandal > 60` raises blackmail, disgrace and withdrawal; `scope=international` opens exile and foreign-press kernels; `privacy < 20` makes private scenes public variants. It changes who is allowed to cast the person: a famous person can be recognized by a stranger without `sharedHistoryTag`.

**Ticks / transitions.**
1. Public eye: `d20 + charisma vs 12`. Success: `notoriety +5`, `income +1`. Failure: `scandal +10`, `privacy -10`. Critical failure: public disgrace; add `st.political_suspect` if the scandal has a legal charge.
2. Press cycle: `d20 + literacy vs 11`. Success: `scandal -5`. Failure: `scandal +5`. Critical failure: an obituary is printed by mistake; `notoriety +10`, `income +2`, flag `read_own_obituary`.
3. Transition: `notoriety <= 10` exits as `faded`; `scandal >= 100` exits as `disgraced`; death can create a posthumous fame condition for the estate, not a living state.

**Reactions.**
- On committed tag `public_humiliation`: `scandal +20`, `privacy -10`; a rival or patron must react in the same fact.
- On committed tag `charity` or `masterpiece`: `notoriety +10`, `scandal -5`; the scene must name the object or the beneficiary.

**Exit consequences.** Faded: flag `former_fame`, income stops, one impostor kernel remains possible. Disgraced: reputation −0.2, `st.political_suspect` if legal, `st.grief` if family; a later comeback kernel can read the `history` tag. Death: posthumous fame can change the estate and the surviving family's eligibility, but cannot act as a living state.

**Consumed by.** `fame.first-press`, `fame.impostor`, `social.player-rumour`, `stage.king-after-the-run`, `court.chef-first-banquet`, `wish.curse-twist`.

---

### 1.13 `st.grief` — 丧恸

**Owner / slot / conflict / duration.** Person; slot `bereavement`; conflict `stack`, max 2; 6–60 months. It is not “sadness”; it changes work capacity, courtship, object scenes and the risk of somatic illness.

**Parameters.** `deceasedRelation` (`partner` | `child` | `parent` | `sibling` | `friend` | `lover`), `monthsSince` 0–60, `functionality` 0–100, `anger` 0–100, `object` string, `accepted` boolean.

**What it changes.** Blocks courtship for the first 6 months; raises empty-room, anniversary, deathbed, neglected-work and object-return kernels. `functionality < 40` down-weights work and child-care scenes and opens debt/illness; `anger > 60` opens revenge, denunciation and duel kernels; `accepted=true` opens memorial and remarriage kernels. A named object is part of the state, not a separate flag.

**Ticks / transitions.**
1. Mourning year: `d20 + resilience vs 11`. Success: `monthsSince +6`, `functionality +5`. Failure: `functionality -10`, `anger +10`. Critical failure: add `st.chronic_illness` (somatic) or `st.debt_bondage` (neglect).
2. Object return: `d20 + empathy vs 11`. Success: `accepted=true`, `anger -10`. Failure: `anger +10`. Critical failure: the object is lost or stolen; `functionality -15`, flag `lost_mourning_object`.
3. Transition: `accepted=true` and `monthsSince >= 12` exits as `mourning_done`; `anger >= 90` can exit to a revenge crime (`st.political_suspect`) or to `st.chronic_illness`.

**Reactions.**
- On committed tag `anniversary`: `functionality -5`; if `accepted=true`, `functionality +2` instead.
- On committed tag `remarriage`: roll `empathy vs 12`; success `accepted=true`; failure `anger +15`, and the remarriage scene must show the object or the absent person.

**Exit consequences.** Mourning done: flag `mourning_done`, the object is kept or given away, a memorial relation; the person can court again. Unresolved: `st.chronic_illness` or `st.political_suspect` (revenge); the state can also become permanent with a lower `functionality` cap. Death of the mourner: the object passes to an heir and can start a new `st.grief` in another person.

**Consumed by.** `grief.empty-room`, `grief.anniversary`, `love.ultimatum`, `police.trial` (family), `wish.curse-betrayal`.

---

### 1.14 `st.workshop_closure` — 工场停工

**Owner / slot / conflict / duration.** Organization; slot `operation`; conflict `block`; 3–36 months. This is the one non-person state in the core set. It is the mechanism by which one committed event changes the candidate list of every employee, their households and the town.

**Parameters.** `cause` (`bankruptcy` | `fire` | `strike` | `war` | `purge` | `theft`), `employeesAffected` 0–500, `wageArrears` 0–12, `reopenChance` 0–100, `ownerId` string, `machinesSeized` boolean.

**What it changes.** For employees: blocks ordinary employment scenes at that organization, raises job search, wage claims, migration, strike, blacklist and debt. For the owner/manager: raises liquidation, arson, suicide and flight. For the town/region: raises unrest, charity, emigration and price scenes. It is the concrete bridge from an organizational fact to many personal lives; a person does not need to “witness” the closure to lose the job.

**Ticks / transitions.**
1. Liquidation: `d20 + numeracy vs 12`, anchored to the owner or manager. Success: `wageArrears -1`. Failure: `wageArrears +1`. Critical failure: `machinesSeized=true`, `employeesAffected +50`.
2. Reopening: `d20 + charisma vs 13`, anchored to the owner/manager or a workers' delegation. Success: `reopenChance +15`. Failure: `reopenChance -10`. Critical failure: the buyer is a front for the old owner; strike leaders get `st.blacklisted_worker`.
3. Transition: `reopenChance >= 100` exits as `reopened`; `wageArrears >= 12` exits as `permanent_closure`; `war_end` triggers a reopening check.

**Reactions.**
- On committed tag `strike`: close the workshop (`cause=strike`); if the strike is already in `st.blacklisted_worker`, escalate the blacklist scope.
- On committed tag `war_end`: `reopenChance +20`; if the owner is dead, the heirs must be cast before reopening.

**Exit consequences.** Reopened: employees rehired, 50% of wage arrears paid, `st.blacklisted_worker` may expire; the reopening scene must name the buyer and the first shift. Permanent closure: unemployment, migration, owner `st.debt_bondage`, organizers `st.blacklisted_worker`; the machines and the empty floor are objects. Fire: arson investigation, `st.political_suspect` for the owner or a scapegoat.

**Consumed by.** `org.workshop-closure`, `org.wage-arrears-delegation`, `social.player-rumour` (a player's household works there), `hist.fork-1945`.

---

## 2. Event and kernel concepts (45)

The concepts below are grouped by domain. Each is a candidate kernel, not a finished recipe. “Needs” names the state and the minimum parameter; “Check” is optional. Outcomes are labelled **normal**, **rare** and **absurd/black-humour**; the absurd branch is not random — it must be produced by a concrete institution, object or mistake. Every outcome changes a state, a relation, a fact or a resource.

### A. Education and apprenticeship continuity (7)

#### A1. `ed.registration-window` — 注册窗口
**Needs:** no active `st.education_contract`, or `track=university, year=0`; age 17–20.  
**Check:** `literacy + intelligence vs 11`.  
- **Normal — enrolled:** tuition −6, `state_add st.education_contract(track=university, year=1, standing=55, arrears=0)`, `education: higher`; a named clerk, a queue and a stamped index card.  
- **Rare — scholarship:** the examination score is high enough for a full grant: cash +30 book money, `scholarship=true`, `standing=65`, a teacher relation +0.12; the grant carries a “good average” condition that the first tick can fail.  
- **Normal — conditional:** the family pays half; `arrears=8`, `standing=45`, flag `conditional_enrollment`; the bursar's window closes at noon and the next scene is `ed.tuition-deadline`.  
- **Absurd — wrong faculty:** a clerk files the surname under the theology ledger because the ink ran; the student is enrolled, but `faculty=theology`, the first seminar is in Latin, and the dormitory is a former monastery. `education: higher`, cash −2, flag `wrong_faculty`; a later appeal kernel can correct it or make it a career.

#### A2. `ed.tuition-deadline` — 缴费截止日
**Needs:** `st.education_contract(track=university, arrears >= 8)`.  
**Check:** `willpower vs 12`; `scholarship=true` gives +2.  
- **Normal — paid:** cash −arrears, `arrears=0`, `standing +5`; the receipt is a physical object that can be found later.  
- **Rare — professor pays:** the professor covers the arrears; `arrears=0`, relation professor obligation +0.2, flag `professor_paid_tuition`; a later kernel asks for a favour that is not academic.  
- **Normal — sells the instruments:** cash +8, `skill craft -0.05`, `standing -5`, flag `sold_instruments`; the buyer is another student who fails the exam with those instruments, and the seller is asked to tutor him.  
- **Absurd — the bursar's error:** the ledger has the student listed as “paid” because a different Lechner paid; `arrears=0`, flag `paid_by_wrong_ledger`; three years later the audit discovers it and demands the sum with interest, exactly when the thesis is due.

#### A3. `ed.seminar-humiliation` — 研讨课上的打断
**Needs:** `st.education_contract(track=university, standing < 70)`.  
**Check:** `charisma + intelligence vs 12`.  
- **Normal — defended:** `standing +10`, reputation +0.04, relation classmate rival −0.1; the scene names the page, the interruption and the water glass.  
- **Normal — silence:** `standing -8`, mood −0.1, flag `seminar_silence`; the professor moves on, and the student's name is not in the minutes.  
- **Rare — plagiarism:** the student uses a forgotten article; `standing +15`, flag `plagiarized_seminar`, knowledge `the source is in the reserve shelf`; a later `history` condition exposes it.  
- **Absurd — mistaken for the lecturer:** the lecturer assumes the student is the visiting speaker and leaves the room; the student teaches the seminar, `standing +5`, reputation +0.06, flag `mistaken_for_lecturer`; the real speaker arrives an hour later and is furious.

#### A4. `ed.thesis-or-wages` — 论文与工钱
**Needs:** `st.education_contract(track=university, year >= 3)` plus (`st.debt_bondage` or `st.chronic_illness`).  
**Check:** `intelligence vs 13`; `arrears` gives −1 per 10.  
- **Normal — finished:** `standing +20`, `thesisProgress=100`, exit `graduate`; `education: higher`, role `graduate`, reputation +0.08.  
- **Normal — dropped for wages:** exit `withdraw`, `st.debt_bondage(principal=arrears)`, employment; flag `thesis_in_drawer`; a later kernel can find the drawer.  
- **Rare — sold the thesis:** cash +15, flag `ghostwritten_thesis`, reputation −0.05; the buyer becomes a professor and hires the author as an assistant, which is worse than poverty.  
- **Absurd — wrote it in the sanatorium:** if `st.chronic_illness(treatment=sanatorium)`, the thesis is finished on the sanatorium balcony; `severity +10`, `standing +25`, exit `graduate`; the dedication page names a nurse, and the university objects to the subject matter.

#### A5. `ed.apprentice-exam` — 出师考试
**Needs:** `st.education_contract(track=apprenticeship, skillHours >= 600)`; `masterTrust >= 30`.  
**Check:** `craft vs 12`; `masterTrust/20` as a state bonus.  
- **Normal — journeyman:** exit `journeyman`, role `journeyman`, wage +2, `education: apprenticeship level 4`; the certificate is signed by the master and the guild.  
- **Normal — failed:** re-indenture 12 months, `contractPenalty +10`, `masterTrust -15`; the failed piece is kept in the workshop as a warning.  
- **Rare — bought certificate:** cash −10, pass, flag `bought_certificate`, knowledge `the examiner sells passes`; a later inspection kernel can revoke it.  
- **Absurd — the examiner grades by glue smell:** the examiner is drunk and passes the worst cabinet because it smells of good hide glue; the cabinet collapses in the town hall a year later; the journeyman keeps the certificate but gains `reputation -0.08` and a court summons.

#### A6. `ed.master-household` — 师傅家的饭桌
**Needs:** `st.education_contract(track=apprenticeship)` plus `st.forbidden_attachment` where the target is the master's child, spouse or another apprentice.  
**Check:** `discretion vs 13`.  
- **Normal — secret kept:** `exposure -5`, relation target +0.1, `masterTrust +3`; the scene is a kitchen table, a second plate and a lie about the lathe.  
- **Normal — dismissed:** exit apprenticeship, `contractPenalty +20`, `st.debt_bondage`, reputation −0.1; the master tears the contract in the yard.  
- **Rare — forced marriage:** if the target is free and the master needs the alliance, the affair becomes a marriage: exit apprenticeship, marriage, dowry +10, role `spouse`; the master gains a relation, the apprentice loses the trade.  
- **Absurd — the master thinks it is about stolen tools:** the master finds the two in the workshop and assumes they are stealing chisels; he rewards the apprentice for “honesty” with a set of tools and keeps a closer watch on the toolbox. `masterTrust +10`, `exposure +10`, relation target +0.1; the affair continues under a shelf of saws.

#### A7. `ed.runaway-apprentice` — 逃跑的学徒
**Needs:** `st.education_contract(track=apprenticeship, masterTrust < 25)` or `contractPenalty > 10`.  
**Check:** `cunning vs 12`.  
- **Normal — escaped:** move to another city, exit `runaway`, flag `runaway_apprentice`; the penalty remains as a debt in the old name.  
- **Normal — caught:** `contractPenalty +20`, `masterTrust -20`, health −0.05; the master chains the toolbox, not the boy.  
- **Rare — master covers:** the master cancels the penalty and says the apprentice was sent to buy stock; `masterTrust +15`, relation +0.2, flag `master_covered_absence`; the favour is called in later.  
- **Absurd — joins the army:** a recruiting sergeant pays the penalty to the master and enlists the apprentice; role `soldier`, state exits, debt clears. Years later the soldier returns as a recruiting sergeant and tries to enlist the master.

### B. Debt, work and blacklist (7)

#### B1. `debt.creditor-at-the-door` — 门口的债主
**Needs:** `st.debt_bondage(monthsRemaining > 0)`.  
**Check:** `charisma vs 12`; `collateral` gives −2 if tools.  
- **Normal — extension:** `monthsRemaining +3`, `principal +2`, creditor relation −0.1; the creditor writes the new date on the back of the old receipt.  
- **Normal — collateral:** the tools or the room are seized; `collateral=tools` removes the tool skill bonus, `collateral=room` forces a move; cash −2.  
- **Rare — lover pays:** if `st.forbidden_attachment` exists, the lover pays the principal; cash −principal, `exposure +10`, relation lover obligation +0.2; the creditor looks at the lover's shoes and remembers the face.  
- **Absurd — the ledger is lost:** the creditor dies before the visit; the heirs cannot find the ledger, so the state exits as `cancelled`; three years later a copy appears in a trunk, and the debt returns with interest. Flag `debt_lost_with_creditor`.

#### B2. `debt.labour-for-interest` — 以工抵债
**Needs:** `st.debt_bondage(collateral=labour or principal > 20)`.  
**Check:** `resilience vs 12`.  
- **Normal — worked off:** `principal -8`, `monthsRemaining -2`, health −0.06; the creditor's clerk initials the ledger each week.  
- **Normal — injury:** health −0.12, add `st.chronic_illness`; the principal is unchanged because the creditor deducts the medical cost.  
- **Rare — escape:** move, exit `escaped`, add `st.political_suspect(charges=debt)`; the creditor posts a reward, and the old neighbours are questioned.  
- **Absurd — the factory burns:** the creditor's workshop burns with the ledger; the debt is sold as scrap paper to a ragpicker; the state exits, but the person loses the job and gains `st.blacklisted_worker` for being at the fire.

#### B3. `debt.inherited-ledger` — 继承来的账本
**Needs:** `st.debt_bondage` plus a committed creditor death.  
**Check:** `literacy vs 11`.  
- **Normal — cancelled:** state exits `cancelled`, flag `debt_cancelled_by_death`; the family burns the receipt and keeps the ashes in a tin.  
- **Normal — transferred:** `creditorKind=heir`, `principal +10%`, relation heir −0.15; the heir is younger, politer and less willing to wait.  
- **Rare — contested:** a trial; legal costs −4, `st.political_suspect` risk; the court asks for a document that no one has.  
- **Absurd — a charity buys the debt:** a charity forgives the debt but requires attendance at twelve lectures on thrift; state exits, flag `charity_lectures`, knowledge `the charity collects debts for the lecture hall`; the person attends nine and is cited for the remaining three.

#### B4. `work.blacklist-gate` — 厂门口的黑名单
**Needs:** `st.blacklisted_worker(scope=factory|sector)`.  
**Check:** `cunning vs 12`.  
- **Normal — turned away:** cash −2, `monthsActive +1`, flag `turned_away`; the gatekeeper does not even read the name.  
- **Normal — false name:** employment, `falseName=true`, `wagePenalty=20`, knowledge `a false surname gets past the gate`; the name is a cousin's, and the cousin will need a favour.  
- **Rare — bribe the foreman:** cash −6, employment, flag `bribed_foreman`, relation foreman +0.1; the bribe is recorded in the foreman's own notebook.  
- **Absurd — the foreman is illiterate:** he reads the wrong line and hires the person; `falseName=false`, employment, flag `hired_by_illiterate_foreman`; the pay clerk discovers it in the first month.

#### B5. `work.false-name-payday` — 假名发薪日
**Needs:** `st.blacklisted_worker(falseName=true)`.  
**Check:** `cunning vs 13`.  
- **Normal — paid:** wage +, `monthsActive -1`; the pay envelope has the false name and the real amount.  
- **Normal — discovered:** `discovered=true`, unemployment, fine −5, reputation −0.1; the pay clerk compares the birth date with the insurance card.  
- **Rare — blackmail:** the clerk demands a share; cash −2 per month, relation clerk obligation +0.2; the blackmail continues until the clerk is transferred.  
- **Absurd — the name belongs to a wanted man:** the police arrest the person, then offer a job as an informer because the wanted man's file is useful; add `st.political_suspect(informer=true, fileThickness=30)`, cash +3, flag `arrested_as_wrong_name`.

#### B6. `work.strike-recidivism` — 第二次罢工
**Needs:** `st.blacklisted_worker` plus current employment or odd job.  
**Check:** `charisma vs 12`; `former_blacklist` gives +2.  
- **Normal — organize:** union relation +0.15, reputation +0.05, `scope` escalates one step, employer crackdown; the strike fund is a cigar box.  
- **Normal — inform:** cash +5, reputation −0.15, flag `informer`; the blacklist is lifted for the person and tightened for everyone else.  
- **Rare — leave:** move, exit `left_city`, `st.grief`; the person sends for the family and the letter is opened at the border.  
- **Absurd — no one can be fired:** everyone on the shift is blacklisted, so the employer cannot replace them; the strike wins a wage rise by accident, flag `blacklist_paradox`; the employer puts the organizers on a second list.

#### B7. `work.employer-pardon` — 老板的赦免
**Needs:** `st.blacklisted_worker` plus a labour shortage (`war_mobilization` or `boom`).  
**Check:** none, or `charisma vs 11`.  
- **Normal — rehired with back pay:** state exits, cash +arrears, employment, flag `pardoned`; the foreman reads the old name aloud and then crosses it out.  
- **Normal — rehired as a scab:** employment, relation union −0.2, reputation −0.05; the old mates do not share the bench.  
- **Rare — refused:** state remains, `monthsActive +6`; the employer hires someone younger and cheaper.  
- **Absurd — asked to blacklist himself:** the boss needs a name on the list to satisfy a quota; the worker writes his own name, gets a bonus and keeps the job; `st.blacklisted_worker` remains, flag `self_blacklisted`, cash +3.

### C. Law, politics and historical forks (6)

#### C1. `police.first-visit` — 第一次上门
**Needs:** `st.political_suspect(surveillance <= 1)`.  
**Check:** `cunning vs 12`.  
- **Normal — released:** `fileThickness +5`, `surveillance +1`; the detective drinks the tea and leaves the saucer unwashed.  
- **Normal — file thickened:** `fileThickness +15`, knowledge `the informer lives on the same stair`; a neighbour is named, not a generic “someone.”  
- **Rare — recruited as an informer:** `informer=true`, cash +3, relation detective +0.1; the first report is about a harmless meeting, which makes it worse.  
- **Absurd — the detective is an old classmate:** he asks for help with his son's Latin exam; `fileThickness -10`, relation detective +0.15, flag `detective_owes_favour`; the favour is later called in during a trial.

#### C2. `police.informer-offer` — 告密者的提议
**Needs:** `st.political_suspect(fileThickness > 30, informer=false)`.  
**Check:** `willpower vs 13`.  
- **Normal — refuse:** `fileThickness +10`, `surveillance +1`, flag `refused_informer`; the offer is repeated next year with a worse price.  
- **Normal — accept:** `informer=true`, cash +5, `fileThickness -10`; the person is now paid to attend meetings they believe in.  
- **Rare — double agent:** `informer=true`, knowledge `both sides use the same dead drop`, flag `double_agent`; the next meeting is watched by both services.  
- **Absurd — both sides use the same dead drop:** the reports cross; the person is paid twice and trusted by both; flag `double_pay`, `suspicion +20`; the handler and the comrade are the same person in different coats.

#### C3. `police.trial` — 审判
**Needs:** `st.political_suspect(evidence >= 60)`.  
**Check:** `charisma + literacy vs 14`; `protector=true` gives +2.  
- **Normal — acquitted:** `fileThickness -20`, reputation +0.05, flag `acquitted`; the court keeps a copy of the file.  
- **Normal — prison:** prison condition, unemployment, family `st.grief`, state exits `convicted`; the sentence names the paragraph and the judge.  
- **Rare — exile:** move, state exits `exiled`, `st.grief`, flag `exiled`; the border guard keeps the passport.  
- **Absurd — convicted of the wrong paragraph:** the clerk reads the wrong charge; the person is deported to the city he actually wanted to move to, with a criminal record; flag `wrong_paragraph`, move to the desired city, state exits.

#### C4. `police.protector` — 保护人
**Needs:** `st.political_suspect` plus a relation with an official/aristocrat, reputation > 0.3.  
**Check:** `charisma vs 13`.  
- **Normal — file closed:** state exits `protected`, relation protector +0.15, flag `protected`; the protector's name is never written down.  
- **Normal — transferred:** `fileThickness -10`, move to another district, `surveillance -1`; the transfer is a promotion with a smaller office.  
- **Rare — protector falls:** the protector gains `st.political_suspect`; the person's `fileThickness +20`; the same file now has two names.  
- **Absurd — the protector needs a favour:** he asks the person to spy on his wife; `fileThickness -15`, relation protector +0.1, add `st.forbidden_attachment` (the wife is the target) or a blackmail flag; the file is closed, the marriage is not.

#### C5. `police.denunciation` — 告发
**Needs:** `st.political_suspect` or `st.blacklisted_worker` or `st.forbidden_attachment`; a named denouncer.  
**Check:** `perception vs 12` to identify the denouncer.  
- **Normal — search:** cash −2, `fileThickness +10`, relation denouncer −0.2; the search leaves the mattress on the floor.  
- **Normal — arrest:** prison, state exits `arrested`; the denouncer is not named in the record.  
- **Rare — warning:** `fileThickness -5`, relation denouncer +0.1; the denouncer is a friend who gave a false name.  
- **Absurd — the denunciation is a love letter misfiled:** the police return it; the person discovers an admirer, and `st.forbidden_attachment` starts with `origin=choice`; the file is closed because the clerk is embarrassed.

#### C6. `hist.fork-1938` — 1938 年的岔路
**Needs:** `st.political_suspect` or `st.war_widow` or `st.blacklisted_worker` or `st.fame`; historical process `anschluss` active.  
**Check:** none; the fork is a set of conditions, not a roll.  
- **Normal — flee:** move, cash −20, state exits `fled`, `st.grief`, flag `fled_1938`; the passport is stamped and the furniture is left.  
- **Normal — stay and accommodate:** employment, reputation −0.1, flag `accommodated`; the person signs a loyalty declaration and keeps the shop.  
- **Rare — resist:** `fileThickness +30`, arrest/exile, `st.political_suspect`; the resistance contact is a real prior relation.  
- **Absurd — hired to teach loyalty because of a misread file:** the new regime reads “dangerous” as “useful”; employment, `st.fame(scope=city)`, but the file remains and a later purge kernel uses it. Flag `misread_file`.

### D. Love, fame and grief (7)

#### D1. `love.secret-meeting` — 借来的房间
**Needs:** `st.forbidden_attachment(discretion > 30)`.  
**Check:** `discretion vs 12`.  
- **Normal — meeting:** relation +0.1, `exposure -5`; the room is borrowed from a friend who wants it back by six.  
- **Normal — discovered by a child:** `exposure +20`, relation child −0.15; the child is old enough to understand and young enough to say it at dinner.  
- **Rare — the spouse has a secret too:** mutual silence; `exposure -10`, knowledge `the spouse is also meeting someone`; the marriage becomes a truce, not a repair.  
- **Absurd — the landlady sells tickets:** she charges the neighbours to watch the door; `exposure +30`, cash +5, reputation −0.1, add `st.fame(scope=street, scandal=20)`; the lovers are now a local entertainment.

#### D2. `love.ultimatum` — 最后通牒
**Needs:** `st.forbidden_attachment(exposure > 60)`; target free or subject married.  
**Check:** `charisma vs 13`.  
- **Normal — leave the spouse:** divorce, `relation_end`, marriage with target, `st.grief` for the ex, reputation −0.1; the furniture is divided by a neighbour.  
- **Normal — end the affair:** state exits, `st.grief`, flag `chose_family`; the lover returns the key in an envelope.  
- **Rare — double life:** `exposure +10`, `discretion -10`, both relations persist; the person keeps two address books and one coat.  
- **Absurd — the spouse and the lover open a shop together:** they become business partners; `exposure -20`, `st.fame(scope=street)`, cash +5; the person is the treasurer and the only one who does not know the accounts.

#### D3. `love.wish-love` — 被许愿的爱
**Needs:** `st.forbidden_attachment(origin=wish, compulsion > 60)`.  
**Check:** `willpower vs 14`.  
- **Normal — genuine love:** `compulsion=0`, `reciprocity +20`, state becomes an ordinary attachment/partnership; the target's consent must be a scene, not a parameter.  
- **Normal — obsession:** `compulsion +20`, target flees, `st.grief`, `st.political_suspect` if the person follows; the letters are evidence.  
- **Rare — the target loves the idea:** the target loves the person's fame or safety, not the person; `reciprocity -10`, `st.fame +5`, `exposure +15`; the wedding is well attended.  
- **Absurd — the wish breaks on a technicality:** the compiler bound the wish to “someone who will never leave”; the target is a prisoner serving life, a soldier posted to a remote garrison, or a person who is already engaged to someone else. The state exits, `st.grief` starts, and the person keeps the object; the content must choose one concrete case, not a joke list.

#### D4. `fame.first-press` — 第一次上报
**Needs:** `st.fame(scope=city, notoriety > 20)`.  
**Check:** `charisma vs 11`.  
- **Normal — good profile:** `notoriety +10`, `income +2`, one invitation; the article gets the age wrong but the coat right.  
- **Normal — scandal:** `scandal +15`, `privacy -10`; the photograph is from a funeral, not a premiere.  
- **Rare — mistaken quote:** reputation −0.05, `st.political_suspect` risk; the quote is a sentence the person said to a lover.  
- **Absurd — obituary printed by mistake:** `notoriety +20`, `income +5`, flag `read_own_obituary`; people send condolences, the person attends the memorial, and the newspaper offers a correction on page nine.

#### D5. `fame.impostor` — 冒充者
**Needs:** `st.fame(scope >= city)`.  
**Check:** `perception vs 12`.  
- **Normal — exposed:** `notoriety +5`, impostor relation rival −0.2; the impostor is a failed actor with the right coat.  
- **Normal — hired double:** cash −5, `privacy +10`, impostor relation friend +0.1; the double is useful until he starts giving interviews.  
- **Rare — blackmail:** cash −10, `scandal +15`; the impostor knows a real secret, not just the public one.  
- **Absurd — the impostor is more competent:** the public prefers him; the real person is hired as his assistant, `income +3`, `notoriety -10`, flag `assistant_to_own_impostor`; the impostor is better at the job and kinder to the staff.

#### D6. `grief.empty-room` — 空房间
**Needs:** `st.grief(deceasedRelation=partner|child, functionality < 60)`.  
**Check:** `resilience vs 11`.  
- **Normal — keeps the room:** cash −3 per month, `functionality -5`, flag `kept_room`; the room is dusted and the bed is made.  
- **Normal — rents it out:** cash +4, relation tenant +0.1, `functionality +3`; the tenant puts a box on the dead person's chair.  
- **Rare — burns the objects:** `functionality -10`, `anger +15`; then `accepted` may rise next tick because the room is empty, not because the grief is gone.  
- **Absurd — the room is rented to a theatre props master:** the room fills with furniture from the dead person's favourite play; the person attends the opening, `functionality +10`, flag `props_in_the_room`; the play is bad and the furniture is right.

#### D7. `grief.anniversary` — 周年
**Needs:** `st.grief` or `st.war_widow`.  
**Check:** `resilience vs 12`.  
- **Normal — memorial:** relation family +0.1, `functionality +5`; the wreath is paid for by three neighbours.  
- **Normal — breakdown:** `functionality -15`, add `st.chronic_illness` if health is low; the person misses work and the employer sends a warning.  
- **Rare — new love:** `st.forbidden_attachment` or an ordinary relation starts; guilt gives `functionality -5` for one tick; the new person knows the dead person's name.  
- **Absurd — the wreath is reused at a wedding:** the florist mixes the orders; the person sees the wreath at a wedding and laughs, then cries; `functionality +5`, `st.fame(scope=street, notoriety=5)`; the bride is a distant cousin.

### E. Court, stage and mistaken sovereignty (7)

#### E1. `court.chef-first-banquet` — 第一场国宴
**Needs:** `st.court_kitchen_appointment(favor > 20)`.  
**Check:** `craft vs 12`.  
- **Normal — favor:** `favor +15`, `wage +2`, `clearance +1`; the dish is named after a minor noble who did not eat it.  
- **Normal — poisoned guest:** the guest falls ill; add `st.political_suspect(charges=poison, evidence=30)`, trial; the chef's knife is taken as evidence.  
- **Normal — blamed by the enemy cook:** `favor -20`, `enemyCook=true`; the blame is a missing receipt, not a magical conspiracy.  
- **Absurd — the king's dog eats the dish:** the dog survives and becomes the official taster; `favor +10`, flag `dog_taster`, knowledge `the dog eats better than the court`; the chef must now cook two versions of every dish.

#### E2. `court.taster-duty` — 试毒
**Needs:** `st.court_kitchen_appointment(tasterDuty=true, poisonScares > 0)`.  
**Check:** `resilience vs 13`.  
- **Normal — survives:** `favor +5`, health −0.03, knowledge `the poison is in the wine, not the soup`; the physician is paid to say “indigestion.”  
- **Normal — poisoned:** add `st.chronic_illness(severity=40, symptom=pain)`, `favor +10` for loyalty, time off; the court sends a basket of pears.  
- **Rare — refuses:** `favor -20`, dismissal; the refusal is read as guilt, not fear.  
- **Absurd — the poison is bad salt:** the cook is executed for nothing; the chef is promoted, but knows the truth; `favor +20`, flag `innocent_cook_executed`, knowledge `the salt was from the wrong barrel`; the salt barrel is still in the kitchen.

#### E3. `court.chef-identified-as-tsar` — 被认成沙皇的厨子
**Needs:** `st.court_kitchen_appointment(clearance >= 2)` plus (`st.fame` or `st.stage_king` or `st.political_suspect`); a mistaken-identity trigger (borrowed coat, medal, palace door).  
**Check:** `perception vs 14` to notice the mistake before acting.  
- **Normal — treated as sovereign:** add `st.wish_power(mode=believed, realAuthority=false, puppetDepth=40)`, cash +20, `favor +20`, but `st.political_suspect(surveillance=2)`; the courtiers ask for a decree and the chef asks for a kitchen.  
- **Normal — arrested:** the real authorities arrest the chef for impersonation; trial, prison, state exits `court_fell` or `convicted`; the coat is exhibit one.  
- **Rare — flees:** move, `st.fame(scope=international, notoriety=40)`, `st.grief`; the chef becomes a newspaper story in three countries.  
- **Absurd — the real tsar is washing dishes:** the actual sovereign is in the scullery, hiding from a coup; the chef is made a scapegoat, then a hero, then a cook again; `st.fame(scope=city)`, `st.political_suspect`, flag `dishwashing_tsar`; the menu is preserved in a museum.

#### E4. `stage.king-cast` — 国王的选角
**Needs:** `st.stage_king` entry or an audition; `charisma` high.  
**Check:** `charisma vs 11`.  
- **Normal — triumph:** `publicBelief +20`, `performances +10`, reputation +0.05; the costume fits and the crown is tin.  
- **Normal — farce:** `publicBelief -10`, `scandal +10`; the audience laughs at the wrong line, and the actor learns to pause.  
- **Rare — the real monarch is in the audience:** `st.political_suspect(surveillance=1)`; the monarch laughs and invites the actor to dinner, which is worse than an arrest.  
- **Absurd — the monarch invites the actor to perform at court:** `st.fame(scope=city)`, `favor` with the court, but the actor is mistaken for a courtier and asked for an opinion on a real decree; `st.political_suspect` risk +.

#### E5. `stage.mistaken-procession` — 被抬进宫的车
**Needs:** `st.stage_king(publicBelief > 60)`.  
**Check:** none; the crowd does the casting.  
- **Normal — acclaimed:** `st.fame(scope=city|realm)`, cash +10, add `st.wish_power(mode=believed, realAuthority=false)`; the actor waves from a carriage and the guards salute the costume.  
- **Normal — arrested:** `st.political_suspect(charges=sedition)`, trial; the actor's defence is the playbill, which the police file as evidence of intent.  
- **Rare — used by a faction:** a patron relation +0.2, `st.wish_power(mode=puppet, puppetDepth=50)`; the faction wants a face, not a king.  
- **Absurd — the crowd carries the actor to the palace:** the guards salute because the uniform is correct; the actor sits on the throne for an hour and signs a meaningless decree that later becomes law; `st.fame(scope=realm)`, `st.political_suspect`, flag `accidental_decree`; the decree is about theatre funding.

#### E6. `stage.execution` — 舞台上的处决
**Needs:** `st.stage_king(scandal > 70)` or a revolution; a real or staged execution.  
**Check:** `resilience vs 13`.  
- **Normal — play execution:** fake blood, `publicBelief +20`, `scandal -10`; the audience thinks it is the best scene of the run.  
- **Normal — real execution:** death, estate, `st.grief` for the troupe; the cause is a real charge and a named executioner.  
- **Rare — rescued by the audience:** move, `st.fame(scope=city)`, `st.political_suspect`; the crowd opens the cart and the actor escapes in the costume.  
- **Absurd — the executioner is the understudy:** he refuses to upstage the lead; the execution becomes a negotiation, the actor survives, `st.fame +10`, flag `executioner_understudy`; the play is shut down for health and safety.

#### E7. `stage.king-after-the-run` — 散场之后
**Needs:** `st.stage_king` exiting (`performances >= 100` or run cancelled).  
**Check:** none.  
- **Normal — return to poverty:** state exits, cash −2, flag `returned_to_poverty`; the costume is returned and the boots are kept.  
- **Normal — typecast:** employment as an actor, wage low, flag `typecast_king`; every audition asks for the same crown.  
- **Rare — politician:** `st.fame(scope=city)`, `st.wish_power` or a real `position` if a party recruits the actor; the first speech is the play's third act.  
- **Absurd — offered a real office because “he knows the lines”:** a `position` effect with real authority, `st.fame`, flag `office_from_the_stage`; the actor is competent at ceremonies and helpless at budgets.

### F. Wish, curse and betrayal (6)

#### F1. `wish.power-real` — 真正的权力
**Needs:** `st.wish_power(realAuthority=true or mode=usurper, intensity >= 3)`.  
**Check:** `willpower vs 13`.  
- **Normal — real position:** `position` in an existing organization, state exits `real_power`, `st.fame(scope=city)`, one named enemy relation; the appointment has a document and a wage.  
- **Normal — puppet:** `realAuthority=false`, `puppetDepth +30`, state remains; the office is real, the signature is not.  
- **Rare — coup:** `st.political_suspect`, prison/exile, maybe position; the coup succeeds or fails as a committed event, not a mood.  
- **Absurd — the office is real but the treasury is a prop:** `position`, wage 0, `st.debt_bondage(principal=salary arrears)`, flag `prop_treasury`; the new minister must borrow money to pay the guards.

#### F2. `wish.power-puppet` — 傀儡
**Needs:** `st.wish_power(puppetDepth > 50)`.  
**Check:** `cunning vs 13`.  
- **Normal — puppet:** state remains, cash +5, `suspicion -5`; the patron sends a carriage and a list of decisions.  
- **Normal — break free:** `puppetDepth -30`, `suspicion +20`, add `st.political_suspect`; the patron's secretary is the first to notice.  
- **Rare — exposed:** state exits `puppet_exposed`, `st.fame(scandal=30)`, `st.political_suspect`; the public learns who signs the decisions.  
- **Absurd — the strings are literal and visible:** everyone sees the strings, but no one cuts them because they are official property; `st.fame(scope=city)`, `puppetDepth` stays, flag `official_strings`; the puppeteer is a government department.

#### F3. `wish.power-mistaken` — 被认错的权力
**Needs:** `st.wish_power(mode=believed)` plus `st.stage_king` or `st.court_kitchen_appointment`.  
**Check:** `perception vs 14`.  
- **Normal — mistaken sovereign:** `st.fame(scope=city)`, cash +15, `st.wish_power(realAuthority=false, puppetDepth=50)`; the mistake is maintained by a coat and a crowd.  
- **Normal — arrested:** `st.political_suspect(charges=sedition)`, trial; the court asks for the appointment document and there is none.  
- **Rare — escape:** move, `st.fame(scope=international)`, `st.grief`; the person becomes a story, not a ruler.  
- **Absurd — the real official is the one who bows:** the actual office holder assumes the person is his superior and asks for instructions; the person gives a trivial instruction that is carried out, creating a real precedent; `position` with `authority=ceremonial`, `st.fame`, `st.political_suspect`; the precedent is used against him later.

#### F4. `wish.curse-twist` — 愿望的扭曲
**Needs:** `st.wish_cursed` plus any wish state or `wish_granted` history.  
**Check:** none; the curse is already authored.  
- **Normal — literal:** the wish is granted exactly; `severity +20`, `triggerCount +1`; the concrete cost is a named object, person or body part.  
- **Normal — inversion:** the opposite happens; `severity +10`, `st.grief` or `st.debt_bondage`; the scene names the wording that was inverted.  
- **Rare — delay:** `triggerCount +1`, `severity -5`; the curse waits, and a later `history` condition triggers the payment.  
- **Absurd — a permit denies the wish:** the curse is fulfilled by a bureaucracy that classifies the wish as “not permitted”; `st.political_suspect` risk, flag `permit_curse`; the person has the right to appeal, and the appeal is the curse.

#### F5. `wish.curse-betrayal` — 背叛与诅咒
**Needs:** `st.wish_cursed` plus (`st.forbidden_attachment` or `st.fame`); a betrayer role.  
**Check:** `perception vs 13` to see the betrayal coming.  
- **Normal — the lover betrays to break the curse:** the curse transfers to the lover; `st.grief`, state exits `transferred`; the lover's new life is the price.  
- **Normal — the betrayal makes the curse worse:** `severity +30`, `st.political_suspect` if the betrayal is public; the person becomes dangerous to know.  
- **Rare — mutual curse:** both people gain `st.wish_cursed`; they are forced to cooperate, `st.fame(scope=street)`, flag `cursed_pair`; the only way to survive is to stay in the same room.  
- **Absurd — both cursed and forced to share a flat:** the lease is in both names and neither can leave without breaking the curse; `st.grief`, `st.fame(scope=street)`, flag `cursed_roommates`; the neighbours sell tickets to the arguments.

#### F6. `wish.curse-break` — 解除诅咒
**Needs:** `st.wish_cursed(knowsCurse=true)`.  
**Check:** `literacy + willpower vs 14`.  
- **Normal — broken:** state exits `broken`, flag `curse_broken`, reputation +0.1; the object used in the ritual is kept.  
- **Normal — transferred:** state exits `transferred`; the target gains `st.wish_cursed`; `st.grief` for the relationship.  
- **Rare — fake break:** `severity -10`, flag `fake_break`; the curse returns at the next `triggerCount`.  
- **Absurd — a notarized apology:** the curse requires a notarized apology; the notary is the benefactor; the person apologizes publicly, pays a fee, and the curse is broken; `st.fame(scope=street, scandal=10)`, flag `notarized_apology`; the benefactor frames the receipt.

### G. Organizations and indirect player influence (5)

#### G1. `org.workshop-closure` — 关厂
**Needs:** `st.workshop_closure` active on the subject's employer organization; the subject is an employee or a household member of one.  
**Check:** none for the layoff; `charisma vs 12` for the delegation branch.  
- **Normal — layoff:** unemployment, cash −6, `st.debt_bondage(principal=wage arrears)`, `st.blacklisted_worker` if the person was a strike organizer; the last wage is paid in coins on the loading dock.  
- **Normal — wage arrears:** `st.debt_bondage(principal=wageArrears)`, `st.grief` if the household cannot buy food; the ledger is nailed to the gate.  
- **Rare — migration:** move to another city, `st.grief`, new job; the train ticket is bought with the last savings.  
- **Absurd — the workers buy the machines:** the machines are sold as scrap; the workers form a cooperative, `organization_found`, `st.workshop_closure` exits, roles `cooperative_member`; the first order is for the same product, and the old owner buys one.

#### G2. `org.wage-arrears-delegation` — 讨薪代表
**Needs:** `st.workshop_closure(wageArrears > 3)`; a delegation including the subject and at least one other worker (possibly another player).  
**Check:** `charisma vs 12`; `st.fame` or `st.blacklisted_worker` gives +1.  
- **Normal — paid:** `wageArrears -3`, cash +, relation owner −0.1; the owner pays in small notes and asks for a receipt.  
- **Normal — delegation arrested:** `st.political_suspect(charges=sedition)`, prison; the delegation is photographed at the gate.  
- **Rare — owner flees:** permanent closure, `st.debt_bondage` for the owner, unemployment; the delegation becomes a search party.  
- **Absurd — paid in goods:** the workers receive two hundred boxes of buttons; `st.workshop_closure` exits, cash +2, `st.fame(scope=street)`, role `button_hawker`; the person becomes a minor specialist in buttons and is asked to appraise a dowry.

#### G3. `social.player-rumour` — 玩家之间的传闻
**Needs:** player A has `st.fame(scandal > 40)` or `st.forbidden_attachment(exposure > 50)`; player B shares a household, employer or neighbourhood with A.  
**Check:** `charisma vs 12` for A to manage it; `perception vs 12` for B to trace it.  
- **Normal — the rumour spreads:** B's reputation −0.08, A's `scandal +10`; B's courtship kernel is blocked for one year.  
- **Normal — denied:** A's `notoriety +5`, B's relation +0.1; the denial is printed in the same column as the rumour.  
- **Rare — confirmed:** B gains `st.political_suspect` or `st.grief`; A's `scandal +20`; the confirmation is a document, not gossip.  
- **Absurd — the rumour is true but about the wrong player:** B gains a short `st.fame(scope=street, scandal=25)` copied from A's scandal, while A receives B's good news and a temporary `notoriety +5`; both are invited to the same reception and neither knows why. Flag `swapped_scandal`; the two states are not actually exchanged, only misattributed, and the next press kernel can correct or deepen it.

#### G4. `debt.player-guarantor` — 担保人
**Needs:** player B has `st.debt_bondage`; player A has cash or a relation with B; the creditor accepts a guarantor.  
**Check:** `literacy vs 11`.  
- **Normal — guaranteed:** B's `principal -10`, A gains flag `guarantor_for_B` and a relation obligation +0.2; the contract is signed at the kitchen table. If B later defaults, a `debt.*` kernel gated on that flag adds `st.debt_bondage` to A with `creditorKind=guarantor`.  
- **Normal — refused:** relation −0.1, B's creditor takes collateral; A's refusal is remembered.  
- **Rare — forged signature:** A forges B's signature; both debts exist, `st.political_suspect(charges=fraud)` risk; the handwriting is a plot object.  
- **Absurd — the creditor dies and the ledger is lost:** both debts vanish; A and B spend three years waiting for a knock; flag `debt_ghost`; the only proof is a remembered sum, and they argue about it every winter.

#### G5. `hist.fork-1945` — 1945 年的岔路
**Needs:** `st.war_widow` or `st.political_suspect` or `st.blacklisted_worker` or `st.workshop_closure`; historical process `liberation` active.  
**Check:** none.  
- **Normal — liberation:** `fileThickness -30`; `st.blacklisted_worker.scope` steps down one level (city → sector → factory → expired); `st.workshop_closure` reopens; the person is on a list of survivors and a list of suspects at the same time.  
- **Normal — revenge:** the person denounces a former informer; the informer gains `st.political_suspect`; the person gains `st.fame` or `st.grief`, depending on whether the denunciation was true.  
- **Rare — exile:** move, `st.grief`, flag `postwar_exile`; the border is a different border now.  
- **Absurd — the new regime hires the former blacklisted worker to run the factory:** `position`, `st.fame(scope=city)`, but the old owner returns and claims the building; the worker must manage the owner as an employee, flag `boss_and_owner`.

---

## 3. Ten wish archetype compilations

The wish text remains untrusted. The deterministic compiler maps it to one archetype, an intensity, a literal/ironic bias and a bounded set of parameters. The archetype attaches a pre-authored state and a small kernel set; it does not grant an outcome. The numbers below are starting values, not a balance claim.

### 3.1 Power — 权力
**Parameters:** `intensity` 1–5, `ironyBias` 0–100, `legitimacy` 0–100, `patience` 0–100, `target` (court/council/factory/street).  
**Starting state:** `st.wish_power(mode=none, realAuthority=false, puppetDepth=20)`.  
**Kernels:** `wish.power-real`, `wish.power-puppet`, `wish.power-mistaken`, `stage.mistaken-procession`, `court.chef-identified-as-tsar`.  
**Outcome shapes:**
1. **Real power:** a position with a document, a wage and an enemy; the wish succeeds, and the person discovers that the office is mostly signatures.
2. **Puppet:** a patron gives the person a real title and a fake authority; `puppetDepth` rises, `suspicion` rises, and the first independent decision is punished.
3. **Mistaken sovereign:** the person is treated as a ruler because of a coat, a stage or a court kitchen; the mistake creates a real precedent but no real appointment.

### 3.2 Love — 爱
**Parameters:** `targetType` (known/stranger/ideal), `reciprocity` 0–100, `compulsion` 0–100, `discretion` 0–100, `jealousy` 0–100.  
**Starting state:** `st.forbidden_attachment(origin=wish)`.  
**Kernels:** `love.wish-love`, `love.secret-meeting`, `love.ultimatum`, `wish.curse-betrayal`.  
**Outcome shapes:**
1. **Genuine:** compulsion falls to zero, reciprocity rises, and the relationship becomes ordinary — with the ordinary problem that the target can leave.
2. **Obsession:** the target is compelled but not reciprocating; the person gets devotion and loses trust; the state turns into surveillance and scandal.
3. **Scandal:** the wish is fulfilled in public; the lover is real, the exposure is real, and the marriage/office/family that surrounds them is the cost.

### 3.3 Knowledge — 知识
**Parameters:** `domain` (medicine/law/occult/engineering), `depth` 1–5, `proof` 0–100, `patience` 0–100.  
**Starting state:** `st.education_contract(track=university, scholarship=true)` plus a `knowledge` proposition; no new state.  
**Kernels:** `ed.registration-window`, `ed.tuition-deadline`, `ed.thesis-or-wages`, `fame.first-press`.  
**Outcome shapes:**
1. **Discovery:** the person finds the thing they wanted to know; the proof is a document, a specimen or a patient; the cost is a patron or a belief.
2. **Plagiarism:** the person knows the answer but cannot prove authorship; the thesis is published under another name, and the person is hired to defend it.
3. **Madness/body:** the knowledge is real but the body or the household pays; add `st.chronic_illness` or `st.debt_bondage`, and the discovery is still true.

### 3.4 Wealth — 财富
**Parameters:** `amount` 1–5, `source` (inheritance/lottery/theft/marriage), `obligation` 0–100, `visibility` 0–100.  
**Starting state:** cash effect plus `st.fame` if `visibility > 50`, and `st.debt_bondage` if `obligation > 50`; no dedicated wealth state.  
**Kernels:** `debt.inherited-ledger`, `fame.first-press`, `police.trial`, `love.ultimatum`.  
**Outcome shapes:**
1. **Inheritance with a condition:** the money arrives with a house, a dependant or a debt; cash +, `st.debt_bondage` or `st.grief`, and a legal document.
2. **Public windfall:** the money is visible; `st.fame` and `st.political_suspect` rise; relatives, charities and tax clerks arrive in that order.
3. **Theft that works:** the person gets the money and the fear; `st.political_suspect(charges=black_market)`, and the money is spent on lawyers.

### 3.5 Revenge — 复仇
**Parameters:** `target` (person/office/family), `intensity` 1–5, `patience` 0–100, `legality` 0–100.  
**Starting state:** `st.grief(anger > 60)` or `st.political_suspect`, plus a `targetId`.  
**Kernels:** `police.denunciation`, `police.trial`, `love.ultimatum`, `wish.curse-betrayal`.  
**Outcome shapes:**
1. **Legal ruin:** the person uses a court, a newspaper or a pension office; the target loses a position, and the person gains a reputation as someone who does not forgive.
2. **Murder:** the target dies; the person gains `st.political_suspect`, `st.grief` does not end, and the object used in the killing becomes a flag.
3. **Forgiveness that costs:** the person chooses not to retaliate, but demands a public admission; the target complies, and the person loses the support of the people who wanted blood.

### 3.6 Freedom — 自由
**Parameters:** `from` (debt/prison/marriage/blacklist/court), `method` (legal/escape/ritual), `risk` 0–100, `destination` (city/country/abroad).  
**Starting state:** whichever unfreedom state is active: `st.debt_bondage`, `st.political_suspect`, `st.blacklisted_worker`, `st.forbidden_attachment`.  
**Kernels:** `debt.creditor-at-the-door`, `work.blacklist-gate`, `police.trial`, `love.ultimatum`.  
**Outcome shapes:**
1. **Legal release:** the debt is paid, the file is closed, the contract is bought out; the person is free and poorer, and the institution remembers them.
2. **Escape:** move, false name, `st.political_suspect`; freedom is a rented room and a fear of the door.
3. **Worse cage:** the person escapes one bond and enters another (a patron, a marriage, a movement); the new state is more comfortable and less escapable.

### 3.7 Faith — 信仰
**Parameters:** `deity` (church/party/cause/self), `doubt` 0–100, `practice` 0–100, `community` 0–100.  
**Starting state:** `st.grief` and/or `st.chronic_illness`; a `knowledge` proposition about the doctrine.  
**Kernels:** `grief.anniversary`, `police.trial`, `court.taster-duty`, `wish.curse-break`.  
**Outcome shapes:**
1. **Consolation:** the practice gives `functionality +10`, a community relation, and a real obligation (a weekly duty, a donation, a burial).
2. **Heresy:** the person interprets the doctrine differently; `st.political_suspect(charges=sedition)` or a church trial; the community splits.
3. **Ambiguous miracle:** a recovery, a coincidence or a relic; the state changes (`st.chronic_illness` severity −10) but the text does not confirm the metaphysics; the community draws its own conclusion.

### 3.8 Fame — 名声
**Parameters:** `scope` (street/city/realm/international), `talent` 0–100, `scandal` 0–100, `patience` 0–100.  
**Starting state:** `st.fame(scope=street, notoriety=10)`.  
**Kernels:** `fame.first-press`, `fame.impostor`, `stage.king-cast`, `stage.king-after-the-run`.  
**Outcome shapes:**
1. **Celebrated:** notoriety rises, income rises, a patron appears; the person loses privacy and gains a public that believes it owns them.
2. **Notorious:** scandal rises faster than notoriety; the person is famous for the wrong thing and cannot correct it without repeating it.
3. **Posthumous:** the work is recognized after death; the estate and the surviving family gain `st.fame`, but the person cannot use it. This is an ending, not a living reward.

### 3.9 Craft — 手艺
**Parameters:** `medium` (wood/print/metal/music/food), `mastery` 0–100, `bodyCost` 0–100, `patron` 0–100.  
**Starting state:** `st.education_contract(track=apprenticeship)`; if the wish is intense, add `st.chronic_illness(workCapacity=70)`.  
**Kernels:** `ed.apprentice-exam`, `ed.master-household`, `ed.runaway-apprentice`, `fame.first-press`.  
**Outcome shapes:**
1. **Masterpiece:** the object is finished and survives; `st.fame` and a patron, but the body or the marriage is damaged.
2. **Forgery:** the person can make the thing but not sign it; cash +, `st.political_suspect` risk, and the object is sold under another name.
3. **Body fails:** the hands or lungs give out; `st.chronic_illness`, the craft continues at a lower capacity, and the best piece is unfinished.

### 3.10 Survival — 生存
**Parameters:** `threat` (illness/war/debt/persecution), `willingness` 0–100, `luck` 0–100, `household` 0–100.  
**Starting state:** `st.chronic_illness`, `st.war_widow`, `st.debt_bondage` or `st.political_suspect`.  
**Kernels:** `debt.labour-for-interest`, `work.blacklist-gate`, `grief.empty-room`, `hist.fork-1945`.  
**Outcome shapes:**
1. **Survive at a cost:** the threat passes, but the person loses a job, a room or a relation; the state exits with a permanent flag.
2. **Bargain:** the person trades labour, loyalty or a secret for protection; `st.debt_bondage` or `st.political_suspect` changes owner, and the protector becomes a recurring role.
3. **Death:** the threat wins; the death has a cause, a place, a witness and an object; the household loses a member and the state passes to the survivors as `st.grief`.

---

## 4. Schema capabilities the design does not yet express

Ranked by the approximate number of concepts in §2 that would use them. Overlap is deliberate; these are not independent requests.

Two things are deliberately **not** on this list because the design already covers them: a person's scene can query household/organization/region state (§3.6), and a real office is a `position` effect in an existing organization, not a state (§4). The concurrent implementation in this repository also appears to resolve employer/household/region state and expose a `position` condition, so those are not gaps to request again.

| Rank | Capability | Concepts helped | Why it is needed | Bounded shape (no arbitrary code) |
|---:|---|---:|---|---|
| 1 | State-aware outcome/variant branching | 41/45 | Almost every kernel has 3–5 outcomes that depend on a parameter (`arrears > 8`, `exposure > 60`, `puppetDepth > 70`). `hasState` exists as a scene condition, but the kernel `when` shorthand and outcome selection do not carry it. Without this, authors must split one scene into many near-duplicate scenes. | Add `hasState` / `stateParameter` to the outcome/variant condition vocabulary, with the same exact/tag/parameter/min/max/equals fields. It selects an authored outcome; it does not execute anything. |
| 2 | Typed state targets and cast binding | 24/45 | `targetId`, `creditorId`, `patronId`, `masterId`, `courtId` are strings. The state cannot validate that the target exists, is alive, is the right kind, or can fill a role. Secret lover, debt, war widow, court kitchen, stage king and wish-power all need this. | Add a bounded `targets` array to the definition and instance: `{ key, kind: person|organization|place|household, required, role }`. Conditions can require a target; casting can bind `$lover`, `$creditor`, `$deceased` from it. No model-authored query. |
| 3 | State visibility / who knows | 15/45 | A secret lover, a police file, a curse, a false name and a scandal all depend on who knows. A single `exposure` scalar cannot tell the spouse from the landlady from the police. | Add a bounded `knownBy` set on the instance or a `state_visibility` parameter (`private`, `household`, `organization`, `public`) plus a `stateKnownBy` condition for one cast person. Keep it a set of ids, not a general belief simulation. |
| 4 | Per-instance selection and stack addressing | 13/45 | Three debts, two illnesses, two lovers: `hasState` currently tests whether **any** matching instance satisfies a parameter threshold. A scene must be able to target the creditor with the largest principal or the illness with the highest severity. | Add `select: 'first' | 'max' | 'min' | 'any'` on a parameter, plus an instance id parameter on outcomes. Bound the stack count (already declared). |
| 5 | State transition history as a content condition | 11/45 | “Formerly blacklisted,” “debt paid,” “curse broken,” “widow remarried” are not the same as the active state. A later scene must read the transition, not a generic flag. | Record transition facts (`state_id`, `from`, `to`, `reason`, `eventId`) and expose a `stateHistory` condition with tag/outcome/year window. This is a read-only history query, like the existing `history` condition. |
| 6 | State transfer / inheritance / ownership change | 8/45 | A debt passes to an heir; a curse transfers to a lover; a workshop closes and the owner's obligation passes to a buyer; a widow's pension passes to children. | Add `state_transfer` (from owner/target to another owner/target) with a bounded reason and a required committed event. It is an effect, not a background mutation. |
| 7 | Player-to-player state propagation | 4/45 | A rumour, a guarantor or a household scandal must change another player's actual candidate list, not just their mood. | Add a bounded `state_link` effect that applies a state or parameter to a named relation/household member, with a cause event and a visibility rule. One hop only; no chain reaction without a committed reaction. |
| 8 | Historical fork condition on the state layer | 2/45 | The historical index emits candidates, but a fork needs to say “this state exists *because* the world diverged at 1938/1945,” not just “the year is 1938.” | Add `historicalFork` as a condition that references the index entry and the divergence id; keep it read-only and additive to the existing `historicalProcess`. |

The top three are also the three that cannot be replaced by more content: without #1 the outcomes collapse into separate scenes; without #2 the states cannot reliably cast the lover/creditor/patron; without #3 a secret, a file or a curse cannot distinguish its audience, so every discovery scene has to guess.

Two smaller gaps are worth naming but not ranking: (a) a `state_family` / variant registry so 14 states do not become 60 near-duplicates; (b) a `state_end_reason` convention so epilogues can read why a state ended. Both are authoring/registry capabilities, not runtime authority.

---

## 5. Anti-boring checklist for Phase 15 content

Use this before submitting a state or kernel. A “no” is a reason to rewrite, not a reason to add prose.

1. **A state must be consumed at least three times, and it must cost something.** If deleting it changes one scene, it is a flag. Every state needs a refusal, a loss and a price: a scholarship lost, a debt seized, a secret discovered, a title revoked, a cure paid for.
2. **Every outcome must change a parameter, a relation, a resource or a fact.** “Mood −0.1” alone is not an outcome. If the only effect is mood, cut the branch or add a concrete consequence.
3. **The wish must be allowed to succeed — and to fail mundanely.** One branch grants the wish exactly and still charges for it; one branch produces no magic at all: a clerk, a loan, a bad address, a person who simply does not love the wisher.
4. **Returning people and objects must be named.** A later scene that reads history must mention the earlier object, line, place or person. “They had changed” is not a return; a reused template with a new name is not a chain.
5. **A secret needs a discoverer, a date and a price; a death needs a cause, a place, a witness and one prior state/object.** No “the secret came out,” no `statistical_death` in a residence the person never lived in.
6. **Absurdity must be institutional or material.** The best black humour comes from a permit, a uniform, a ledger, a dog, a wrong name, a coffin ordered to the wrong measurements. Random surrealism is not causality.
7. **History must change eligibility, not just weather.** A war changes papers, curfews, prices, blacklists, pensions and who can travel. If the scene reads the same in 1912 and 1945 with a changed date, it is not historical.
8. **No free promotion, no partner reset.** A role, degree, office or title needs a reachable prior state or a transition scene; a new lover needs an exit from the old one, or a deliberate, texted double life with `exposure` consequences.
9. **Every organization state must reach at least three people** (owner, worker, household), and every indirect player-to-player effect must be traceable through the state, the relation/household path and the committed event. “The algorithm decided” is not causality.
10. **The check must be readable.** Record the roll, the DC, the attribute/skill and the state/history bonuses. Failure must produce a different concrete outcome, not just “you fail.”
11. **Keep the cast bounded.** A state target is one person, organization or place, not a crowd. A crowd can be a participant role, but it needs a named representative before it can own or change a state.
12. **End the arc.** Every state needs an exit condition, even if the exit is death, permanent stabilization or “dormant.” A state that can never end is a second world.

---

## 6. Coverage check against the brief

| Required coverage | Where it is carried |
|---|---|
| University/apprenticeship continuity | `st.education_contract`, A1–A7 |
| Debt bondage | `st.debt_bondage`, B1–B3, G4 |
| Secret lover | `st.forbidden_attachment`, D1–D3 |
| Chronic illness | `st.chronic_illness`, A4, E2, D7 |
| War widow | `st.war_widow`, D7, C6, G5 |
| Political suspect | `st.political_suspect`, C1–C6 |
| Blacklisted worker | `st.blacklisted_worker`, B4–B7 |
| Royal chef | `st.court_kitchen_appointment`, E1–E3 |
| Stage king / mistaken sovereign | `st.stage_king`, E4–E7, F3 |
| Cursed by wish | `st.wish_cursed`, F4–F6 |
| Wish-for-power | `st.wish_power`, F1–F3, E3 |
| Wish-for-love | `st.forbidden_attachment(origin=wish)`, D3 |
| Fame | `st.fame`, D4–D5, G3 |
| Grief | `st.grief`, D6–D7, F5 |
| Education continuity chain | A1 → A2 → A3 → A4 (or A5/A6/A7) |
| Power wish branches | F1 real, F2 puppet, F3 mistaken, E6 stage execution, E3 chef-as-tsar |
| Curse/betrayal reaction | F5, plus `st.wish_cursed` reactions |
| Historical fork | C6 (1938), G5 (1945) |
| Indirect player-to-player influence | G3 rumour, G4 guarantor, G2 delegation |
| Organisational state affecting many | `st.workshop_closure`, G1–G2 |

The count is 14 states and 45 event/kernel concepts. The next authoring step should be to cut each concept into a real recipe with a check, 3–5 outcomes and an effect list, then run the existing recipe validator; this brief deliberately does not write JSON yet.
