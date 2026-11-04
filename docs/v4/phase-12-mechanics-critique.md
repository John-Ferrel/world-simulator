# Phase 12 — Mechanics Critique

**Scope:** independent review of committed event mechanics in the Phase 12 artifacts.
**Inputs read:** `docs/v4/playtest.json`, `docs/v4/phase-12-audit.json`, `docs/v4/phase-12-consistency.json`, `docs/v4/phase-12-experiment-a.json`, `docs/v4/phase-12-person-branches.json`, and the relevant `packages/v4/content/kernels/recipes/*.ts` sources.
**Changes:** none. This file is the only write.

**Sample:** 20 events total — 14 committed events from `playtest.excerpts` (3 lives) and 6 committed composed events (2 from `phase-12-experiment-a`, 4 from `phase-12-person-branches`). This satisfies the required minimum of 12 excerpt events and 4 composed events.
**Not used:** `phase-12-experiment-b.json`; its own note says those are candidate-pool eligibility results, not committed `EventFact`s. `phase-12-audit.json` runtime samples were used only for systemic context, not counted in the 20.

**Important distinction used below:** `event.effects` is the list of effects that actually committed. `trace.effects` is the pre-application plan and can contain effects that were rejected by `applyHealth`, `applyCash`, `applyRelation`, etc. A trace/committed difference is not automatically a bug; a missing effect is only flagged when the prose asserts a material state change and no ordinary fail-closed rule explains the drop.

---

## 1. Verdict table

| # | eventId / artifact ref | action | verdict | specific issue |
|---:|---|---|---|---|
| 1 | `evt:world-vienna-1912:000356` | `p9-childhood-household.name-day-gift/passed-gift-to-younger` | **pass** | Gift-to-sibling is only indirectly modelled (parent kin relation + `likes_reading`); the named sibling is not a participant and there is no item effect. Offstage Emil relation is effect-only. Soft content limitation, not a state contradiction. |
| 2 | `evt:world-vienna-1912:000461` | `vienna-childhood-street.washhouse-fever/fever-recover` | **flag** | Prose names Matthias; event subject is Anton. `mother` role is Friedrich Hofer (male). Planned health and committed condition/relation bind to Anton, not the person described. |
| 3 | `evt:world-vienna-1912:000607` | `p9-gap-childhood-chores.market-line/line-both-families` | **flag** | Prose names Matthias; event subject is Anton. `她` has no female antecedent in an all-male cast. Food/skill/relation bind to Anton. |
| 4 | `evt:world-vienna-1912:000732` | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | **flag** | Prose names Emil; event subject is Anton. Cash `+0.03` and relation bind to Anton's household; health is planned only in trace. `她` is used for male Emil. |
| 5 | `evt:world-vienna-1912:001018` | `p9-gap-childhood-chores.school-slate/slate-homemade-wood-ash` | **flag** | Prose names Anton; event subject is Mitzi. Literacy/mood/parent-relation bind to Mitzi. `她` is used for male Anton. |
| 6 | `evt:world-vienna-1912:001474` | `vienna-life-apprenticeship/printshop-apprentice` | **pass** | Education, employment (wage 18), advance cash 6 and apprentice role all present. Period caveat: 1926 “Kronen” monthly wage is a period veneer issue, not an effect-bound violation. |
| 7 | `evt:world-vienna-1912:002730` | `vienna-family-childbirth/difficult-birth` | **flag** | Birth, health −0.22, postpartum condition and cash −20 are present. “Otto Kral把钟表送进当铺” has no cash inflow or asset/estate effect. The only relation with Otto is a newly created acquaintance, so the `partner` role cast a stranger and the birth records him as father. |
| 8 | `evt:world-vienna-1912:003839` | `p9-history-medical-daily.suspicious-death/ask-pharmacy` | **flag** | Prose names Emil; event subject is Mitzi. Reputation/knowledge/relation bind to Mitzi, so Emil’s discovery is recorded as Mitzi’s knowledge. |
| 9 | `evt:world-vienna-1912:004755` | `p10-migration-tasks.find-lodging/lodging-no-guarantor` | **flag** | Trace subject is Elisabeth Winter (female); role `subject` is Mitzi (female); prose uses `他`. Mood/relations bind to Elisabeth. Planned health −0.03 is absent from committed effects; no failed-lodging flag/residence fact. |
| 10 | `evt:world-vienna-1912:006076` | `p9-gap-adult-solitude.river-walk/river-walk.far` | **flag** | Prose is correct (`她` = Mitzi), but `trace.participants` assigns role `subject` to Alois Moser 4 while `trace.subject` is Mitzi. Planned health −0.02 is absent from committed effects (only mood). |
| 11 | `evt:world-vienna-1912:012949` | `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` | **flag** | Prose names Anton Stein; event subject is Mitzi Kral. Cash −8/mood/`parent_hospitalized` bind to Mitzi Kral; health +0.06 binds to the `parent` role, which is the focal Mitzi (mother), not the father in the text. |
| 12 | `evt:world-vienna-1912:001839` | `vienna-adolescence.stolen-roll/caught-and-returned` | **pass** | Reputation −0.06, acquaintance relation and mood −0.1 match the prose. Trace effect descriptions contain literal `{neighbor}` / `{subject}` tokens; player-facing text is clean. |
| 13 | `evt:world-vienna-1912:004949` | `vienna-medical-treatment.toothache/barber-pull` | **flag** | Prose names Marie Huber; event subject is Matthias. Cash −1.2, health +0.03 and mood −0.02 bind to Matthias, not the person whose tooth is pulled. |
| 14 | `evt:world-vienna-1912:013542` | `statistical_death/other` | **pass** | Death effect present; cause (“acute illness”, no clear diagnosis) matches; no post-death date; participants non-empty. |
| 15 | `evt:world-vienna-1912:000001` (experiment A, peace-1912) | `kernel-civic.leaflet-night::ctx-vienna-1912::milieu-printshop/civic-leaflet-police` | **pass** | Kernel/context/milieu identified; condition, flag, relation, reputation −0.03 and knowledge all present. “New lock at the printshop” is flavour, not a persisted institutional effect. |
| 16 | `evt:world-vienna-1912:000002` (experiment A, war-1915) | `kernel-civic.leaflet-night::ctx-vienna-war-1915::milieu-factory::civic-leaflet-war/civic-leaflet-war-ration` | **flag** | Trace has both ration-officer and printer-colleague relations; committed effects contain only one relation. The coworker collusion (“Josef Bauer把机器踩得比平时慢”) is therefore not separately persisted. Trace token `{subjectPronoun}` unresolved. |
| 17 | `phase-12-person-branches: bought-the-middle-place[0]` | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/bought-the-middle-place` | **flag** | Cash −5, reputation, `bribed_market_master` and relation are present; the prose’s harm to Josef Bauer’s apple wall has no effect on the rival. No eventId in the artifact. |
| 18 | `phase-12-person-branches: bought-the-middle-place[2]` | same action | **flag** | Same rival-harm gap, here Otto Winter’s apples. Core bribe outcome is preserved. No eventId. |
| 19 | `phase-12-person-branches: pushed-the-cart-to-the-corner[0]` | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` | **flag** | All named participants are male, but the prose says `借她家门廊`. Authored cash −2 is not applied because household cash is 0; branch `maxCash: 3` allows 0, so the cost silently disappears. No eventId. |
| 20 | `phase-12-person-branches: pushed-the-cart-to-the-corner[2]` | same action | **pass** | `她` is defensible as Helene Winter (female helper); denied-stall flag, `pushcart_vendor` role and neighbour relation are present. No eventId. |

---

## 2. Counts

**Sample:** 20 events. **Pass: 6** (rows 1, 6, 12, 14, 15, 20). **Flag: 14** (rows 2–5, 7–11, 13, 16–19).

Multi-label failure categories (one event can appear in more than one):

| category | count | events |
|---|---:|---|
| A. Subject / participant identity mismatch | **9** | 2, 3, 4, 5, 8, 9, 10, 11, 13 |
| B. Pronoun or role-sex mismatch | **6** | 2, 3, 4, 5, 9, 19 |
| C. Missing or contradictory effect for a material claim | **6** | 7, 11, 16, 17, 18, 19 |
| D. Implausible money/health magnitude for period or bounds | **0** | — |
| E. Material trace/role contract defect | **2** | 10, 16 |
| F. Partner-role miscast (birth father) | **1** | 7 |
| Trace-surface raw role refs (not player-facing) | **9** | 1, 2, 3, 4, 5, 9, 12, 15, 16 |
| No effects at all | **0** | — |
| Empty participant list | **0** | — |
| Post-death event date | **0** | — |
| Fact-trigger / follow-up with unverifiable cause pointer | **0 verifiable in sample** | excerpts omit `causes`; see limitation |

These are **not 14 independent regressions**. Nine A flags are consistent with one engine-level role-casting bug; six B flags are two related content/prose-authoring gaps (hard-coded pronouns and non-sex-gated parent roles); most C flags are effect-prose reconciliation gaps. F is a second, independent engine bug in partner-role casting.

---

## 3. The main hard failure: role `subject` is cast to the wrong person

### 3.1 Observable pattern

In every A-flag excerpt, the event’s first participant is the real event subject (`trace.subject`), and the prose names a different person who appears as the `subject` role in `trace.participants`:

| event | first event participant / `trace.subject` | `trace.participants` role `subject` | person named in prose |
|---|---|---|---|
| `000461` | Anton | Matthias | Matthias |
| `000607` | Anton | Matthias | Matthias |
| `000732` | Anton | Emil | Emil |
| `001018` | Mitzi | Anton | Anton |
| `003839` | Mitzi | Emil | Emil |
| `004755` | Elisabeth Winter | Mitzi | `他` (male) |
| `006076` | Mitzi | Alois Moser 4 | `她` (Mitzi) |
| `012949` | Mitzi Kral | Anton Stein | Anton Stein |
| `004949` | Matthias | Marie Huber | Marie Huber |

`buildParticipants` always prepends the real subject (`packages/v4/engine.ts:2335-2350`), so this ordering is not a sampling artefact. The committed effects bind `$subject` to `draft.subjectId` (`commitEvent`, `packages/v4/engine.ts:4507-4518`), which is the same real subject passed to `resolveScene` (`packages/v4/engine.ts:4378-4380`). Narration, however, is interpolated from `roles` (`selectNarration`, `packages/v4/engine.ts:2352-2375`), including `roles.subject`. The resulting `participants` array can contain two entries with role `subject`: the real subject first, then the cached person. That is itself a contract violation independent of the prose.

So the prose describes the wrong actor while the cash/health/skill/knowledge/relation effects land on the right event subject. The event is internally half-correct: the simulation updates one person; the journal tells another person’s story.

Concrete examples:

- **`000732`**: prose says Emil earned three heller for hanging laundry; committed `cash` effect is `+0.03` on the event subject, Anton’s household.
- **`001018`**: prose says Anton practised writing; committed `skill literacy +0.02` goes to Mitzi.
- **`003839`**: prose says Emil discovered the pharmacy record; committed `knowledge` is held by Mitzi.
- **`004949`**: prose says Marie Huber had a tooth pulled; committed `cash −1.2`, `health +0.03` and `mood −0.02` go to Matthias.
- **`012949`**: prose says Anton Stein paid a hospital deposit for his father; committed `cash −8`, `mood` and `parent_hospitalized` go to Mitzi Kral, while `health +0.06` goes to the `parent` role, the focal Mitzi (mother), not a father.

### 3.2 Likely root cause

`castSceneRoles` builds a cache key that includes the subject’s location and employment but **only includes `subject.id` for `parent`, `guardian`, `sibling` and `partner` role kinds** (`packages/v4/engine.ts:1996-2018`). For `kind: 'subject'`, `roleCandidates` returns exactly `[subject.id]` (`packages/v4/engine.ts:1536-1541`), but the key does not include that subject id:

```ts
// packages/v4/engine.ts, around 1996-2025
const roleKey = [
  ...,
  subject.locationId,
  requirement.sameHousehold ? subject.householdId : '',
  subject.employment?.organizationId ?? '',
  requirement.kind === 'parent' ||
  requirement.kind === 'guardian' ||
  requirement.kind === 'sibling' ||
  requirement.kind === 'partner'
    ? subject.id
    : '',
].join('|');

let candidates = context.roleCastCache.get(roleKey);
if (!candidates) {
  candidates = roleCandidates(context, subject, requirement).filter(...);
  context.roleCastCache.set(roleKey, candidates);
}
```

The first subject cast for a given age/sex/location signature caches `[firstSubject]`. Every later subject in the same year and location reuses that cached candidate as `roles.subject`. The cache is per-year (`roleCastCache: new Map()` in the year context, `packages/v4/engine.ts:711`), which matches the observed year-by-year variation in wrong names. Because ordinary scene role keys also omit `definition.id`, the reuse can cross scene families, not just repeat within one scene.

This is a **hard engine bug**, not merely prose. It violates the contract that event prose and event effects describe the same causal transaction, and it makes replay/journal attribution unreliable. It also explains why the isolated experiment artifacts (small subject sets, short runs) look cleaner than the 88-year playtest: the cache collision needs many same-signature subjects before it becomes visible.

### 3.3 Separate content/role bug: `mother` can be male

In `000461`, the `mother` role is Friedrich Hofer (male). The role declaration is `kind: 'parent'` without `sex: 'female'`; the engine supports `requirement.sex`, so this is an authoring omission rather than a missing engine capability. It produces a direct contradiction between “母亲” and the participant’s sex.

### 3.4 Separate engine bug: `partner` need not be the subject's partner

`002730` has a `partner` role bound to Otto Kral, but the only relation effect with Otto is a newly created `acquaintance`. `materializedContactEffects` skips a pair that already has any relation (`packages/v4/engine.ts:4202-4231`), so this is evidence that Otto was not the subject’s existing partner. The scene’s `hasRelation partner` condition is checked on the subject, not on the role candidate, and `roleCandidates` for `kind: 'partner'` only requires “not partnered with someone else” unless `sameHousehold` is true (`packages/v4/engine.ts:1574-1613`). A single stranger therefore qualifies as the `partner`, and the `birth` effect records him as the father.

This is a second hard engine bug: it corrupts the parentage/genealogy chain, not just the prose. The content’s `partner` role needs either `sameHousehold: true` or an engine-side `partneredWithSubject` requirement. The current `sameHousehold !== true` path also excludes anyone in the subject’s household, so the actual co-resident partner is often ineligible while a single stranger is eligible.

---

## 4. Flag-by-flag evidence

### F1 — `evt:world-vienna-1912:000461` (A, B)

> “洗衣房的蒸汽让Matthias昏昏沉沉，回家路上就开始打颤。母亲把湿布叠成条敷在额头上，第三天清早Matthias才说要喝水。”

`trace.subject` is Anton; `trace.participants` has Matthias as `subject` and Friedrich Hofer as `mother`. Committed effects are `condition` and `relation`; trace also plans `health −0.1`. Planned health and committed condition/relation are bound to Anton, not Matthias. **Missing/contradictory effects:** `health` and `condition` on Matthias; `relation` between Matthias and his actual mother. **Role sex:** `mother` = Friedrich (male).

### F2 — `evt:world-vienna-1912:000607` (A, B)

> “队伍里有Emil Lechner提着饭盒挤过去，Matthias往墙边让了让。Friedrich Hofer塞给她几枚零钱，说照这个数找，别让谁家少了。”

All named people (Emil Lechner, Matthias, Friedrich Hofer) are male; `她` has no antecedent. Event subject is Anton, while the prose follows Matthias. Committed effects `food`, `relation`, `skill` bind to Anton. **Missing/contradictory effects:** `food`/`relation`/`skill` on Matthias; pronoun/sex agreement. The coins are change-making, so no net `cash` effect is defensible.

### F3 — `evt:world-vienna-1912:000732` (A, B)

> “绳上的床单比Emil还高，她踮脚把木夹子一个个卡上去，水珠顺着布角滴在脖子里。”

Emil is male; `她` is wrong. Event subject is Anton; `trace.participants` has Emil as `subject`. Committed `cash +0.03` and `relation` bind to Anton’s household; trace `health −0.03` is not committed. **Missing/contradictory effects:** `cash`, `health`, `relation` for Emil; pronoun agreement. This is the clearest example of “one person’s labour, another person’s cash.”

### F4 — `evt:world-vienna-1912:001018` (A, B)

> “煤灰和水调成糊，Anton用木片蘸着在板上写数字，写完用手掌一抹，掌纹里全是黑。她把板子立在墙角晾着，怕蹭到别人。”

Anton is male; `她` is wrong. Event subject is Mitzi; `trace.participants` has Anton as `subject`. Committed `skill literacy`, `mood` and `relation` bind to Mitzi. **Missing/contradictory effects:** literacy/mood/parent-relation for Anton; pronoun agreement.

### F5 — `evt:world-vienna-1912:002730` (C, F, soft asset gap)

> “Mitzi难产，接生的人守了两天。孩子最后生下来，取名Mitzi Kral，Mitzi却一直发烧，医院又收了一笔钱。Otto Kral把钟表送进当铺。”

Birth, `health −0.22`, postpartum condition and `cash −20` are present. The pawning of the watch is a material asset-to-cash transaction with no `cash +` or estate/asset effect. More seriously, the trace’s only relation with Otto is an engine-generated `acquaintance` (“met through Otto Kral’s household…”). `materializedContactEffects` only creates that relation when no relation exists between the pair (`packages/v4/engine.ts:4202-4231`), so Otto was not the subject’s existing partner: the `partner` role cast an unrelated person, and the `birth` effect records him as the father. `roleCandidates` for `kind: 'partner'` does not require `partneredWithSubject` when `sameHousehold` is false (`packages/v4/engine.ts:1574-1613`). **Missing/contradictory effects:** partner relation rather than a new acquaintance; positive `cash`/`estate` from pawning. The duplicate child name “Mitzi Kral” is a realism/name-generation issue, not a mechanics-bound failure.

### F6 — `evt:world-vienna-1912:003839` (A)

> “Emil把药包拍在柜台上，问这是谁开的方子。……推搡间Emil瞥见存根上半个名字，像‘施特凡’，又像‘施托尔’。”

Event subject is Mitzi; `trace.participants` has Emil as `subject`. Committed `reputation −0.02`, `knowledge` (“药房处方存根…”) and `relation` bind to Mitzi. **Missing/contradictory effects:** knowledge held by Emil; reputation/relation for Emil. This is especially serious because knowledge is persistent character state: the wrong person now “knows” the clue.

### F7 — `evt:world-vienna-1912:004755` (A, B)

> “看门人把身份证在灯下举起来看，说不是不信你，是规矩。他站在门口，箱子夹在两腿之间，最后提着箱子走了，轮子在门槛上磕了一下。”

`trace.subject` is Elisabeth Winter (female); `trace.participants` assigns `subject` to Mitzi (female); prose uses `他`. Either reading is a sex/pronoun contradiction. Committed `mood` and `relation` bind to Elisabeth. Trace plans `health −0.03` but it is not committed; no `flag` or `residence` fact records “no guarantor / no lodging.” **Missing/contradictory effects:** correct `subject` role; `health` on the person who slept in the station; a durable failed-lodging flag or residence fact; pronoun agreement.

### F8 — `evt:world-vienna-1912:006076` (A, E)

> “河上运煤的平底船一条接一条，对岸的树还是秃的。她走到铁路桥下才觉得脚累，回头看城市已经亮起灯来。”

This row is important because the prose is arguably correct: `她` is Mitzi, and `trace.subject` is Mitzi. But `trace.participants` assigns role `subject` to Alois Moser 4. The event’s participant/role contract is therefore wrong even when the prose does not expose it. Committed effect is `mood +0.05`; trace also plans `health −0.02`, which is not committed. **Missing/contradictory effects:** `health` on Mitzi (if not suppressed by the 0.01 vitality floor); correct `subject` participant. This is hard evidence that the bug is in role casting, not just name interpolation.

### F9 — `evt:world-vienna-1912:012949` (A, C)

> “医院的走廊比家里亮，Anton Stein把三克朗押金数了两遍。护士接过搪瓷杯，说探视时间在下午。父亲在病床上抬起手，Anton Stein握住那只手，指节比在家里更凉。”

Event subject is Mitzi Kral; prose follows Anton Stein. Committed `cash −8`, `flag parent_hospitalized`, `mood` and `relation` bind to Mitzi Kral; `health +0.06` binds to the `parent` role, the focal Mitzi (mother), not a father. The `cash −8` itself is plausible: the trace reason is “deposit and hospital supplies,” and the text separately mentions a cup and towel, so 3 + supplies can total 8. **Missing/contradictory effects:** father’s `health`/hospital flag; `cash` on the person who paid; correct `subject` role, and a father participant for the father’s health effect. No father appears in `trace.participants`.

### F10 — `evt:world-vienna-1912:004949` (A)

> “理发铺里还坐着等刮脸的老主顾，肥皂味和烟味混在一起。弗朗茨把围布往Marie Huber胸前一系，说忍着点。……牙出来时带着一小块肉，他用明矾水按住了。”

Event subject is Matthias; prose follows Marie Huber. Committed `cash −1.2`, `health +0.03` and `mood −0.02` bind to Matthias. **Missing/contradictory effects:** dental `cash`/`health`/`mood` on Marie; correct `subject` role. Franz’s `他` is correct (male barber), so this is not a pronoun failure.

### F11 — `evt:world-vienna-1912:000002` (experiment A, C, E)

> “配给办公室把面包分量又减了一成，Friedrich Hofer在告示上盖了章。他连夜排了一版号外……Josef Bauer把机器踩得比平时慢，怕声音传到街上。”

Kernel/context/milieu and the war variant are correctly identified. `flag printed_ration_leaflet`, `cash −2`, `knowledge` and one `relation` commit. The trace has **two** relations: ration officer and printer/colleague. Only one relation is in the committed effect list, so the pair is not both persisted; the prose’s material claim — Josef Bauer slowing the press — depends on the printer/colleague relation. The trace effect description also contains literal `{subjectPronoun}`. **Missing/contradictory effect:** one of the two `relation` effects is absent (likely the printer/colleague relation); resolved trace text.

### F12 — `phase-12-person-branches: bought-the-middle-place[0]` (C, soft)

> “Alois Lechner把五克朗折成小方块，压在Gustav Berg的登记簿下面。……第二天Alois Lechner的摊子到了棚中央，Josef Bauer的苹果墙被挤到排水沟边，有几只果子滚进了泥里。”

Core bribe outcome is preserved: `cash −5`, reputation, `flag bribed_market_master`, relation. The rival’s apple loss is a material economic harm to a named participant (Josef Bauer/rival) with no `cash`, `food`, or `relation` effect. **Missing effect:** rival’s loss/relation. This is authored prose exceeding authored mechanics.

### F13 — `phase-12-person-branches: bought-the-middle-place[2]` (C, soft)

> “Ferdinand Winter把五克朗折成小方块，压在Friedrich Hofer的登记簿下面。……第二天Ferdinand Winter的摊子到了棚中央，Otto Winter的苹果墙被挤到排水沟边，有几只果子滚进了泥里。”

Same as F12, with Otto Winter as the rival. **Missing effect:** rival’s loss/relation. No eventId is present in the branch artifact, so this cannot be replayed by ID.

### F14 — `phase-12-person-branches: pushed-the-cart-to-the-corner[0]` (B, C, soft)

> “Gustav Berg说今年的摊位排满了，让Alois Lechner去巷口试试。Alois Lechner把带来的秤放在独轮车上，Emil Weiss路过，问要不要借她家门廊摆一上午。”

All named participants are male; `她` has no female antecedent. `flag denied_market_stall`, `role pushcart_vendor` and `relation` commit. The authored `cash −2` is not applied because the scenario household cash is 0; the branch condition `maxCash: 3` allows 0, so the outcome’s cost silently disappears. The prose does not claim a payment, which is why this is a soft C rather than a hard contradiction. **Missing/contradictory effects:** pronoun agreement; `cash −2` or an explicit “no fee” variant. No eventId.

---

## 5. Passes with caveats

- **`000356`**: the authored outcome is “passed gift to younger”; the model persists a `kin` relation to the parent plus `likes_reading`, but not a sibling relation or the wooden horse. This is an abstraction gap, not a contradiction. The trace description still contains `$parent`.
- **`001474`**: education, employment, wage 18, advance 6 and apprentice role all match. The text’s “月薪十八克朗” is within the authored number, but the use of “Kronen” in 1926 Vienna is a period veneer issue; it is not an effect-bound violation.
- **`001839`**: effects match the prose; the trace contains `{neighbor}` / `{subject}` tokens. Player-facing text is clean. This is a trace-serialization defect, not a prose failure.
- **`013542`**: death effect, cause and date are consistent; no post-death date.
- **Experiment A `000001`**: all five committed effects match the police-stop narrative; the “new lock” is flavour without an institutional effect.
- **Person branches `pushed[2]`**: `她` is defensible as Helene Winter (female helper); role/flag/relation match. The artifact still has no eventId.

---

## 6. Prose omissions versus true contract failures

### True engine/contract failures

1. **Subject-role cache collision** (nine A flags). This is the main hard engine bug in the sample. It produces prose about person X while committed effects update person Y. It is not a “prose omitted detail” issue.
2. **Partner-role miscast** (`002730`). The `partner` role can be an unrelated stranger even when the scene condition requires the subject to have a partner; the birth effect then records that stranger as the father. This corrupts genealogy and parentage, not just narration.
3. **Trace/committed effect mismatch**, e.g. `000002`, `006076`, `004755`: the trace records a `relation`/`health` that the committed event does not contain. In `000002` one of the two planned relations is absent, and the prose’s coworker-collusion claim depends on the missing pair; in `006076` and `004755` the health effect is small and may be floor-suppressed. The engine does not record “planned vs applied” separately, so a reader cannot tell whether this is a rule rejection or a defect.
4. **Person-branch provenance gap**: `phase-12-person-branches.json` contains no eventIds; the four branch samples cannot be joined to the event journal by ID. The action string identifies kernel/context/milieu, but not the committed event. This is an experiment-artifact contract gap, not a gameplay bug.

### Hard content/authoring failures

1. **Hard-coded pronouns** in generated prose (`她`/`他`) are not resolved against subject sex. The prose audit already reports **268 hard-coded 她 and 727 hard-coded 他** in `phase-12-prose-audit.json`; this sample catches several where the cast is male. This is a content-pipeline failure, not a simulation-state bug.
2. **`mother` is not sex-gated** in `vienna-childhood-street.washhouse-fever`: `kind: 'parent'` with no `sex: 'female'` selects Friedrich Hofer. The engine has the capability; the content declaration omits it.
3. **Rival harm is narrated but not modelled** in `r1-work.market-stall-allotment/bought-the-middle-place`: the rival’s apples are damaged, but no effect targets the rival.
4. **Pawning a watch is narrated but not modelled** in the childbirth outcome: no positive cash or asset/estate effect.
5. **A costed branch accepts zero cash**: `pushed-the-cart-to-the-corner` has authored `cash −2` but its `maxCash: 3` condition includes 0; `applyCash` silently drops the debit. The text happens not to claim payment, so this is a soft mechanics gap, not a false narrative claim.

### Prose that merely omits detail (not counted as flags)

- The purchase of shoes from the apprentice advance (`001474`) is not separately persisted; the advance cash is.
- Coffee money in the café scenes is not itemised; the `cash` effect is.
- “A new lock at the printshop” (`experiment A 000001`) has no institutional effect; it is atmosphere, not a claim about a named participant’s state.
- The sibling’s wooden horse (`000356`) has no item/relation effect; the authored outcome is represented by parent `kin` and `likes_reading`. This is a modelling limitation, not a contradiction.

The distinction matters: if every unmodelled object were called a bug, the sample would flag nearly every event and hide the one severe identity failure.

---

## 7. Money, health, structural checks, and cause chains

### Money and health

No D flag was found in the 20-event sample.

- `cash +0.03` = three heller (`000732`) matches exactly.
- `cash −5` bribe (`bought-the-middle-place`) is large but within a plausible day-or-two wage range for 1912 Vienna.
- `cash −20` childbirth/hospital (`002730`) is plausible for midwife plus hospital in 1935; the trace reason includes both.
- `cash −8` hospital deposit plus supplies (`012949`) is consistent with the text’s 3 Kronen deposit plus cup/towel, because the trace reason says “deposit and hospital supplies.”
- `cash −1.2` barber tooth extraction (`004949`) is cheap but plausible.
- `cash +2.4` pawned watch chain (`011174`, inspected as context) matches the prose’s 2 Kronen 40 heller.
- Health effects range from `−0.22` (difficult childbirth) to `+0.06` (hospital treatment), all inside the 0–1 vitality bound.
- The only period caveat is the persistent use of “Kronen” after Austria’s 1925 currency change; that is a worldbuilding/period-veneer issue, not an effect-bound violation.

### Structural checks

- **No effects:** none in the sample. Birth facts use `effects: []` by design, but no birth event was selected.
- **Empty participants:** none. `playtest.anomalies.anyEmptyParticipantList = false`, count 0.
- **Unresolved tokens in player text:** none. `playtest.textAudit` and `phase-12-consistency` report 0; the consistency script scanned 45 events.
- **Unresolved tokens in trace:** present. `001839` has `{neighbor}`/`{subject}`; `000356`/`000461`/`000607`/`000732`/`001018`/`004755` have `$parent`/`$mother`/`$neighbor`/`$caretaker`; experiment A `000001`/`000002` have `$policeman`/`$rationOfficer` or `{subjectPronoun}`. These are audit-surface defects, not player-facing prose.
- **Post-death dates:** none in the sample. `013542` is the death event; all excerpt flags are false; `playtest.anomalies.eventsAfterSubjectDeath = 0`.
- **Fact-trigger/follow-up causes:** not verifiable from the sample. Excerpt events do not include `causes`; `trace.mechanism` identifies the scene/outcome, not a cause event. The audit reports 3 person-branch and 60 variant-branch events, but its samples also omit cause IDs. No dangling cause was observed, but absence cannot be proven from these artifacts. This is a provenance limitation, not a proven engine failure.

### Composed-event identity and branch preservation

All six composed sample actions carry `kernel::context::milieu` (experiment A also carries the `civic-leaflet-war` variant), so the identity half of the composition contract is met. Branch conditions also behave as authored: `householdCash: 0` selects `pushed-the-cart-to-the-corner`, `householdCash: 100` selects `bought-the-middle-place`, and the four branch samples preserve their core outcome semantics (denied stall / bribe, with the role, flag and affordable cash effects). The failures in rows 16–19 are secondary effects, pronouns and provenance, not a failure to identify the composed source. The person-branch artifact’s missing eventIds remain a separate provenance gap.

### Systemic context from `phase-12-audit.json`

- 16 compile errors, all unresolved placeholders in `ctx-klosterneuburg-rural-1912` milieus: 11 `move`, 3 `education`, 2 `employment` outcomes dropped. The compiler is fail-closed (major effects are rejected), which is safer than guessing, but the content loses those outcomes in rural contexts.
- 150 `unresolved_effect_ref` warnings and 211 `invalid_relation` warnings in the playtest. These are consistent with the dropped relation in experiment A `000002` and with other effect/prose mismatches; they are not proof for any single event.
- 7,848 `scene_blocked` warnings are expected for a large candidate pool and are not counted as defects.
- 270 composed events / 5,619 total in the 35-year audit; 319 / 25,551 in the 88-year playtest. Trace coverage is 0.879 overall and 1.0 for composed events, but trace presence is not semantic correctness.

---

## 8. Limitations

1. This is a **20-event judgment sample**, not a statistical estimate. The 14 excerpt events come from three selected lives and the 6 composed events come from two small experiments; the rates are not population rates.
2. Excerpt `effects` is a list of **types**, not full amounts. Amounts were read from `trace.effects` descriptions. `trace.effects` is the pre-application plan; `event.effects` is post-application. A missing `health`/`cash` can be a deliberate floor or insufficient-funds rejection, so I did not treat every trace/committed difference as a bug.
3. Sex for non-focal participants was inferred from names and roles; there is no complete person dump in the excerpt. The focal persons’ sexes are explicit in `focalLives` (Anton male, Emil male, Matthias male, Mitzi female).
4. The person-branch artifact has no eventIds and no full world snapshot; branch samples were labelled by scenario and array index. The action strings identify kernel/context/milieu, but not a committed event.
5. The subject-role cache collision and the partner-role miscast are supported by code inspection and by the artifact traces; I did not run a separate targeted reproduction or mutate the engine. The observable contract failures are nevertheless clear.
6. Cause-chain checks are not possible from the excerpt format because `causes` is omitted. No claim is made that all cause pointers are valid or invalid.
7. Keyword/effect checks are not a formal proof. `phase-12-consistency.json` checks only death/job-loss/move/marriage/birth keywords against effect types; it does not check subject identity, gender, amounts, third-party harm, or trace/committed reconciliation. Its 45-event / 0-flag result is therefore compatible with the 14/20 flags found here.
8. I did not audit all 25,551 playtest events or all 1,011 kernels; the sample is intentionally small and manual.

---

## 9. Bottom line

- **Sample:** 20 events (14 playtest excerpts + 6 composed: 2 experiment A + 4 person branches).
- **Pass/flag:** **6 pass, 14 flag**.
- **Top failure categories:** **A. subject/participant identity mismatch — 9**; **B. pronoun/role-sex mismatch — 6**; **C. missing or contradictory effect — 6**. There is also **1 partner-role miscast** and 2 material trace/role contract defects. No money/health magnitude flags. Nine events have raw `$role`/`{token}` refs in trace-only effect descriptions; player-facing unresolved tokens are 0.
- **Hard engine bugs:** **yes, two.** (1) The role `subject` cache key omits `subject.id` for `kind: 'subject'`, so the first subject in a year/location is reused as the narrated subject while effects bind to the real event subject. (2) The `partner` role need not be the subject’s actual partner; `002730` records a newly met man as the birth father. These are release-blocking identity/causality failures: the journal can say Emil earned the money while Anton’s household receives it, or say Emil learned the pharmacy clue while Mitzi’s knowledge state changes.
- **Hard content failures:** hard-coded pronouns without sex resolution; `mother` role not sex-gated; rival harm and pawned-watch transactions narrated without effects; a zero-cash branch silently drops its authored cost.
- **Not hard failures:** missing item/asset detail, coffee/shoe purchases, atmospheric “new lock” prose, and small trace/committed health differences that may be floor/clamp behaviour.
- **No evidence of:** no-effect events, empty participant lists, post-death dates, or implausible health/money magnitudes in this sample.

The highest-value fixes are, in order: (1) include `subject.id` in the role-cast cache key for `kind: 'subject'` (and ideally include `definition.id` for ordinary role pools), and require `partneredWithSubject` for `kind: 'partner'` (or `sameHousehold: true`), with regression tests that resolve the same scene for two same-age subjects in one year and assert `roles.subject === event.subjectId`; (2) add pronoun resolution or sex-gated prose and sex-gate `mother`/`landlady`-style roles; (3) record planned-versus-applied effects and dropped reasons, so trace/committed reconciliation is auditable; (4) either model rival harm and pawned assets or trim those prose claims; (5) expose eventIds and cause IDs in experiment artifacts.

---

## 10. Post-fix re-audit

**Date:** 2026-11-04, after the subject-cache, partner-casting and trace-rebuild fixes. Sections 1–9 above are the pre-fix audit; this section supersedes their engine conclusions where they differ.
**Artifacts:** regenerated `docs/v4/playtest.json` (`generatedAt 2026-11-04T07:09:33Z`, 88 years, 17,701 events), `phase-12-person-branches.json` and `phase-12-experiment-a.json` (both still `generatedAt 2026-11-04T06:42Z`, i.e. pre-fix), plus read-only code inspection and in-memory probes.
**Sample:** 10 events from the new excerpts + 4 composed events (2 experiment A, 2 person-branch). One of the 10 excerpt events (`002781`) is itself composed, so the post-fix composed path is represented in both groups.

### 10.1 Verdict table

| # | eventId / artifact ref | action | verdict | specific issue |
|---:|---|---|---|---|
| 1 | `evt:world-vienna-1912:000397` | `p9-childhood-household.name-day-gift/passed-gift-to-younger` | **pass** | Subject role = `trace.subject` = Anton. Parent kin, mood and reading flag all present. Sibling gift and offstage Anna relation are still prose-only/abstract. |
| 2 | `evt:world-vienna-1912:000540` | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | **flag** | Subject role = Anton (correct), but prose uses `她` for male Anton. Josefine Hofer is cast as `neighbor` and the relation effect is `acquaintance` with Anton’s mother; no `kin` effect is added. |
| 3 | `evt:world-vienna-1912:000510` | `vienna-early-childhood.fever-night/father-absent` | **pass** | Subject/mother/father roles are correct; health/mood/relation effects match. Trace relation description names only Friedrich and hides that the effect is mother↔father; presentation caveat, not a state error. |
| 4 | `evt:world-vienna-1912:000659` | `p9-gap-childhood-chores.market-line/line-both-families` | **flag** | Subject role = Anton (correct), but `Emil Weiss塞给她几枚零钱` uses `她` for male Anton; all named participants are male. Food/skill/relations are otherwise correct. |
| 5 | `evt:world-vienna-1912:000688` | `vienna-childhood-street.cigarette-card/card-stolen` | **pass** | Event subject is Elisabeth Bauer, not the excerpt focal Anton; prose follows Elisabeth and Anton is the neighbour. This is a correct non-focal-subject event, not a cache collision. |
| 6 | `evt:world-vienna-1912:002101` | `major-family.proposal-refused/proposal-refused.bad-blood` | **pass** | Subject Hedwig; `partner` role is the refused suitor in a courtship/marriage scene, which is allowed. Role/flag/cash present. Offstage mother/sister are prose-only. |
| 7 | `evt:world-vienna-1912:002781` | `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-tenement/pharmacy-last-bottle` | **flag** | Subject Hedwig is female but prose says `他把瓶子塞进内袋`. The medicine is bought at three times the official price, yet no `cash` effect is committed. Health/condition/knowledge/role/relation are present. |
| 8 | `evt:world-vienna-1912:014348` | `task-vienna-daily-culture.cinema-concert/cinema-concert.top-balcony` | **flag** | Subject Hedwig is female but prose says `他把票根折进背心口袋` and `他用手指...`. Cash/mood/relation are present. |
| 9 | `evt:world-vienna-1912:005187` | `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` | **pass** | Event subject is Mitzi Berg, focal Mitzi is the neighbour; prose follows both correctly. Friend relation and mood match. Correct non-focal-subject event. |
| 10 | `evt:world-vienna-1912:007657` | `vienna-medical-treatment.sanatorium/home-rest` | **flag** | Subject Mitzi is correct, but the prose’s caregiver is `安娜` while the only non-subject participant is Franz Weiss, and the food/relation effects bind to Franz. The landlord publicly announces Mitzi’s tuberculosis; no reputation/knowledge/privacy effect records the disclosure. |
| 11 | `evt:world-vienna-1912:000001` (experiment A, peace-1912) | `kernel-civic.leaflet-night::ctx-vienna-1912::milieu-printshop/civic-leaflet-police` | **pass** | Kernel/context/milieu and subject match; condition/flag/relation/reputation/knowledge all present. Artifact is pre-fix but text/effects are coherent. |
| 12 | `evt:world-vienna-1912:000002` (experiment A, war-1915) | `kernel-civic.leaflet-night::ctx-vienna-war-1915::milieu-factory::civic-leaflet-war/civic-leaflet-war-ration` | **flag** | Pre-fix artifact: trace has two relations but only one is committed; `Josef Bauer把机器踩得比平时慢` is not separately persisted. The old `{subjectPronoun}` token remains in this stale artifact. |
| 13 | `phase-12-person-branches: bought-the-middle-place[0]` | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/bought-the-middle-place` | **flag** | Core bribe outcome is present (`cash −5`, flag, relation), but the rival’s apple wall is damaged with no `cash`/`food`/`relation` effect on the rival. The current recipe still has this prose-only harm. |
| 14 | `phase-12-person-branches: pushed-the-cart-to-the-corner[2]` | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` | **pass** | On the artifact, `她` refers to Helene Winter (female) and flag/role/relation match. The artifact predates the market-stall rewrite; current recipe uses `{subjectPronoun}` and a 2-Kronen fee, so this pass does not validate the rewrite. |

**Counts:** 14 sampled. **7 pass / 7 flag.**
- 10 new excerpts: **5 pass / 5 flag.**
- 4 composed: **2 pass / 2 flag.**
- Remaining flags are mostly **pronoun/gender** (4: `000540`, `000659`, `002781`, `014348`), **participant/effect identity** (2: `000540` mother-as-neighbour, `007657` Anna/Franz), and **missing/contradictory effect** (4: `002781` cash, `007657` privacy/reputation, `000002` relation, `bought[0]` rival harm). No subject-cache flag.
- No empty participants, no post-death dates, no player-facing unresolved tokens, and no implausible money/health magnitude in this 14-event sample.

| re-audit category | count | events |
|---|---:|---|
| Subject-role cache collision | **0** | — |
| Pronoun / gender mismatch | **4** | 2, 4, 7, 8 |
| Participant/name identity mismatch | **2** | 2, 10 |
| Missing or contradictory effect | **4** | 7, 10, 12, 13 |
| Partner/birth-scene starvation | **1 systemic** | not in 14; probe + aggregate births |
| Stale composed artifact | **2** | 12 (flagged), 14 (pass caveat) |

Counts are multi-label: `000540` is both a pronoun and a mother-as-neighbour relation issue; `007657` is both a named-participant and privacy/effect issue; `000002` and `bought[0]` are composed artifact-level gaps.

### 10.2 Fix 1 — subject-role cache: fixed

The new excerpts no longer show the old “first participant = real subject, second participant = narrated subject” pattern:

- All **39** traced excerpt events have exactly **one** `participants` entry with role `subject`, and its `personId` equals `trace.subject.id`. **0 mismatches.**
- The dedicated regression test `tests/v4-composition.test.ts` (“casts the subject role to the actual event subject, not a cached neighbour”) passes.
- `roleKey` now includes `subject.id` for `kind: 'subject'` (`packages/v4/engine.ts:2015-2021`).
- The old failure examples are gone: `000540` now has Anton as role `subject` (not a sibling), `000659` has Anton, `007657` has Mitzi, and the non-focal events (`000688`, `005187`) correctly keep the non-focal person as subject.

**Verdict: fixed.** The remaining identity failures in this sample are prose pronouns/names, not the subject cache.

### 10.3 Fix 2 — partner casting: stranger-father bug fixed, but birth scenes are now blocked

The code now requires `partneredWithSubject` unless the scene is courtship/marriage/wedding/family-formation (`packages/v4/engine.ts:2025-2032`, `1574-1608`). That does stop an unrelated stranger from being cast as the birth father.

However, the fix is incomplete because the partner candidate pool still excludes anyone in the subject’s household when `sameHousehold` is not true:

```ts
if (person.householdId === subject.householdId && requirement.sameHousehold !== true)
  continue;
```

`vienna-family-childbirth` declares `partner` without `sameHousehold: true`. Co-resident partners are therefore ineligible, and the scenario is blocked rather than casting the actual partner.

Read-only probes against `VIENNA_1912_SEED` confirm this:

- A generic scene with a default `partner` role produced **0 events**; diagnostics for Rosa Lechner, Josefine Hofer and Katharina Bauer were `scene_blocked: missing_role:partner`.
- The same scene with `sameHousehold: true` produced **4 events**, including Rosa + Alois Lechner.
- Running the real `VIENNA_FAMILY_RUNTIME_SCENES` blocked `vienna-family-childbirth` for Rosa, Josefine and Katharina with `missing_role:partner`.
- The same family scenes with only the childbirth `partner` role changed to `sameHousehold: true` in memory produced **3 childbirth events** with the correct fathers: Josefine/Friedrich, Katharina/Josef, Rosa/Alois.

The regenerated playtest is consistent with this: births fell from **237** in the pre-fix run to **57**, and total named persons from **615** to **431** (alive 237 → 143). This is not solely attributable to the partner change without a controlled run, but the in-memory probe isolates the mechanism.

**Verdict: the stranger-as-father bug is fixed, but the partner fix is not complete.** It replaces “wrong father” with “no birth scene for co-resident partners.” This is a remaining hard engine/demographic failure, not a prose issue. The correct fix is to allow same-household partners when the scene requires an existing partner (or set `sameHousehold: true` on the `vienna-family-childbirth` partner role).

### 10.4 Fix 3 — trace rebuild/interpolation: fixed, with a display caveat

- Across **39/39** traced excerpt events, the ordered `trace.effects` types exactly match the committed `event.effects` types.
- No `$role` or `{token}` remains in excerpt trace descriptions.
- The old `{subjectPronoun}` / `$parent` / `$neighbor` trace defects are gone from the new excerpts.
- Remaining display caveat: `describeIncidentEffect` still prints only the `b` endpoint for a relation, so a mother↔father partner effect is rendered as “与 Friedrich Hofer 建立 partner 关系” and can look like a relation to the event subject. This is misleading provenance, not a wrong state change.

**Verdict: fixed** for post-application/type/token correctness; endpoint labelling remains a minor trace-quality issue.

### 10.5 Remaining failures and their character

1. **Pronoun/gender content failures remain.** `她` for Anton in `000540` and `000659`; `他` for Hedwig in `002781` and `014348`. These are hard-coded prose, not the subject cache. The subject and effects are now correct; the words are not.
2. **Hard-coded names can still replace the cast participant.** In `007657`, the prose says `安娜` while the participant is Franz Weiss; the food/relation effects bind to Franz. This is a subject/participant identity failure at the prose layer, not the cache.
3. **Missing cash for a material purchase.** In `002781`, the text says the quinine costs three times the official price, but no `cash` effect is committed.
4. **Family members cast as neighbours.** In `000540`, Josefine Hofer (Anton’s mother, as established by `000510`) is cast as `neighbor`; the effect is `acquaintance`, not `kin`. The neighbour role candidate pool does not exclude the subject’s household.
5. **Privacy disclosure is not persisted.** In `007657`, the landlord publicly announces Mitzi’s tuberculosis; no reputation, knowledge or privacy effect records who heard it. The excerpt does not expose event `visibility`, so the intended privacy scope cannot be verified.
6. **Composed artifacts are stale.** `phase-12-experiment-a.json` and `phase-12-person-branches.json` were generated at `06:42Z`, before the `07:09Z` playtest. The person-branch `pushed` text still has the old `她` and no 2-Kronen fee, while the current recipe has `{subjectPronoun}` and the fee. The artifact has no eventIds. Its flags are therefore artifact-level, not proof of current engine behavior.
7. **Global warnings are lower but not zero:** the new playtest still reports 33 `invalid_relation` and 67 `unresolved_effect_ref` warnings (down from 211 and 150). These are not attributed to the 14 sampled events except the stale experiment A relation; they remain a systemic effect-drop signal.

### 10.6 Bottom line for the re-audit

- **Subject-role cache collision:** **fixed.** 39/39 traced excerpt events have a consistent subject role; the dedicated test passes.
- **Partner miscast:** **narrowly fixed** — no stranger father appears, and the code now requires an existing partner outside courtship/marriage/family-formation. **But the fix is incomplete:** default partner scenes exclude co-resident partners, so `vienna-family-childbirth` is blocked for actual mothers; births fall 237 → 57. This is a remaining hard failure.
- **Trace rebuild/interpolation:** **fixed** for applied-effect types and tokens; relation endpoint display remains a minor caveat.
- **Remaining hard failures in the 14-event sample:** hard-coded pronouns/names (4 events), a participant/name/effect mismatch (`007657`), a missing `cash` effect (`002781`), and two artifact-level composed effect gaps. No subject-cache failure remains.
- **Limitations:** 10 excerpts + 4 composed is a judgment sample. The person-branch/experiment A artifacts predate the fixes, and the playtest excerpts contain no childbirth event; the birth-block finding comes from read-only in-memory probes plus the aggregate birth/population drop, not from a controlled A/B run. Keyword/effect checks remain non-formal.
