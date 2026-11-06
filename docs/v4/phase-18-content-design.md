# Phase 18 — Content Design & Production Architecture

Date: 2026-11-07  
Baseline: Phase 17 `34783ec` — 79 states / 1,740 kernels / 15 generated packs.  
Catalog: `docs/v4/content-catalog.md`  
Creative Index: `docs/v4/creative-index.md`, `docs/v4/creative-index.json`  
Runtime authority: `ALL_STATES` / `KERNEL_LIBRARY` / `GENERATED_STATE_PACKS`; the index is only an author/editor aid.

## 1. Goal

Phase 18 is a **content expansion** phase, not an engine rewrite. The target is a substantially larger and more diverse story space that still validates, integrates and appears in natural lives.

The library is already large in kernel count but uneven:

- stage coverage: **infancy 2 / childhood 63 / adolescence 143 / adulthood 1,511 / elderhood 21**;
- tone: dark 880, historical 732, warm 455, gritty 331 dominate; absurd 28, triumphant 20, eerie 18, erotic 10, comic 4;
- motifs: work/class/scandal/family/illness/crime dominate; revolution 8, luck 22, supernatural 28, love 38, betrayal 44, escape 45, inheritance 56;
- 29 of 79 states were absent from the Phase 17 primary 50-year sample;
- new packs mostly consumed old states; new→new composition was weak;
- Phase 17’s independent Critic scored the pre-revision sample 16/30 and called it “a content-production success and a conversion failure.”

Phase 18 therefore targets **breadth and creative difference first**, with reachability/coverage metrics as guardrails. Cross-pack collision and deep continuity remain later work, though authors may use existing states.

## 2. Creative Index

`scripts/v4-creative-index.ts` builds a deterministic index over runtime content:

- extracts `premise`, `situation`, `motivation`, `conflict`, `twist`, `outcomePattern`, `tone`, `setting`, `motifs` from kernel title/tags/conditions/outcome text/effects;
- tokenizes Chinese bigrams/trigrams + Latin words;
- computes TF-IDF cosine similarity and tag/outcome-pattern similarity;
- supports query, kernel-neighbor, gaps, and high-similarity-pair modes.

```bash
pnpm v4:creative-index
pnpm v4:creative-index -- --query "一个贫穷裁缝收到律师来信，继承了陌生人的城堡"
pnpm v4:creative-index -- --kernel office16-hire.protege
pnpm v4:creative-index -- --gaps
pnpm v4:creative-index -- --duplicates 0.2
```

The current index reports **43 pairs >= 0.20** across 1,973 kernels (138 pairs at the older 0.15 threshold). These are **editor candidates, not automatic rejects**. The highest pairs include:

- `kernel-edu.attend-night-school` <> `kernel-work.task-evening-trade-course` (0.611) — same night-school premise;
- `r15-love.forbidden-attachment` <> `r15-love.borrowed-room` (0.470);
- `r1-fam.widowhood` <> `r13-turn.widowhood` (0.397);
- `office16-favor.private-sinecure` <> `ds17-office.archive-post` (0.246) — patronage job for a lover;
- `r13-fam.care-sick-parent` <> `r13-fam.care-for-elder` (0.268).

Authors must query their core idea and list the nearest 3 kernels plus a one-line divergence statement. A shared motif is allowed when the **conflict, motivation, twist, or outcome pattern** differs.

## 3. Production batches

### Batch 1 — gap cards and six packs

1. **`pack-infant-wonder`** prefix `iw18-`
   - stage: infancy/childhood (0–12), with at least 6 childhood and 2 infancy kernels;
   - tones: warm, eerie, comic;
   - motifs: play, imaginary friend, first memory, family secret, school, illness, small cruelty, wonder;
   - states: `iw18-imaginary-friend`, `iw18-child-secret`;
   - 20–24 kernels.
2. **`pack-youth-fire`** prefix `yf18-`
   - stage: adolescence/early adulthood (13–25);
   - tones: romantic, rebellious, dark, comic;
   - motifs: first love, exam, friendship betrayal, dangerous dare, body, political awakening, escape plan;
   - states: `yf18-first-awakening`, `yf18-runaway-plan`;
   - 20–24 kernels.
3. **`pack-elder-memory`** prefix `em18-`
   - stage: elderhood (60+), with some adult setup kernels;
   - tones: melancholy, warm, comic;
   - motifs: memory, late love, estrangement, grandchild, legacy, absurd late fame, illness, death settlement;
   - states: `em18-late-bloom`, `em18-family-archive`;
   - 20–24 kernels.
4. **`pack-odd-jobs`** prefix `oj18-`
   - stage: adulthood;
   - tones: everyday, comic, suspense;
   - motifs: night watchman, cinema projectionist, zoo keeper, taxi driver, mortician, perfume clerk, radio repair, hospital porter;
   - states: `oj18-odd-apprenticeship`, `oj18-workplace-legend`;
   - 20–24 kernels.
5. **`pack-black-comedy`** prefix `bc18-`
   - stage: adulthood;
   - tones: absurd, comic, dark;
   - motifs: mistaken identity, bureaucratic error, ridiculous promotion, disastrous luck, terrible success, inheritance condition, public humiliation;
   - states: `bc18-ridiculous-fame`, `bc18-bureaucratic-ghost`;
   - 20–24 kernels.
6. **`pack-dark-fantasy`** prefix `df18-`
   - stage: adulthood/elderhood;
   - tones: eerie, dark, absurd/religious;
   - motifs: curse, blessing, unusual body, prophetic dream, ghost, miracle fraud, omen, borrowed luck;
   - states: `df18-uncanny-mark`, `df18-borrowed-luck`;
   - 20–24 kernels;
   - no new supernatural engine: use existing states/effects/conditions; ambiguity is allowed.

### Batch 2 — four packs after editor review

7. **`pack-history-street`** prefix `hs18-`
   - stages: adulthood/elderhood, 1910–1955;
   - tones: historical, political, gritty, comic;
   - motifs: newspaper/radio/cinema, inflation, refugees, revolution, occupation, reconstruction, political rumor, historical figure encounter;
   - states: `hs18-street-witness`, `hs18-blackout-rumor`;
   - 20–24 kernels.
8. **`pack-love-desire`** prefix `ld18-`
   - stages: adolescence/adulthood;
   - tones: romantic, erotic, scandalous, absurd;
   - motifs: queer desire, forbidden love, jealousy, marriage/divorce, erotic tension, love letters, public scandal;
   - states: `ld18-impossible-attachment`, `ld18-public-desire`;
   - 20–24 kernels.
9. **`pack-small-mysteries`** prefix `sm18-`
   - stages: adulthood/elderhood;
   - tones: suspense, everyday, uncanny, comic;
   - motifs: misdelivered letter, lost object, neighbor secret, false accusation, local legend, coincidence, amateur detection;
   - states: `sm18-missing-object`, `sm18-town-secret`;
   - 20–24 kernels.
10. **`pack-money-luck`** prefix `ml18-`
    - stages: adulthood;
    - tones: absurd, triumphant, dark, comic;
    - motifs: sudden wealth, gambling, bad investment, lottery, debt, inheritance, scam, luck reversal;
    - states: `ml18-sudden-fortune`, `ml18-reversal`;
    - 20–24 kernels.

Target: **200–240 new independent kernels and ~20 new states**, not counting composer expansions. If an author cannot reach 20 without repetition, return fewer and say why; quality beats quota.

### Final produced library (2026-11-07)

| Pack | Kernels | Outcomes | States | Stage split | Tone | Rarity |
|---|---:|---:|---:|---|---|---|
| `pack-infant-wonder` | 22 | 75 | 2 | infancy 2 / childhood 19 / adulthood 1 | warm, eerie, comic | common |
| `pack-youth-fire` | 24 | 72 | 2 | adolescence 20 / adulthood 4 | romantic, rebellious, dark, comic | uncommon |
| `pack-elder-memory` | 24 | 73 | 2 | elderhood 19 / adulthood 5 | melancholy, warm, comic | uncommon |
| `pack-odd-jobs` | 23 | 69 | 2 | adulthood 23 | everyday, comic, suspense | uncommon |
| `pack-black-comedy` | 23 | 69 | 2 | adulthood 23 | absurd, comic, dark | rare |
| `pack-dark-fantasy` | 24 | 72 | 2 | adulthood 19 / elderhood 5 | eerie, dark, absurd, religious | rare |
| `pack-history-street` | 24 | 72 | 2 | adulthood 21 / elderhood 3 | historical, political, gritty, comic | uncommon |
| `pack-love-desire` | 24 | 72 | 2 | adolescence 2 / adulthood 22 | romantic, erotic, scandalous, absurd | uncommon |
| `pack-small-mysteries` | 22 | 66 | 2 | adulthood 17 / elderhood 5 | suspense, everyday, uncanny, comic | common |
| `pack-money-luck` | 23 | 70 | 2 | adulthood 23 | absurd, triumphant, dark, comic | uncommon |
| **Total** | **233** | **710** | **20** | 158 adulthood; 75 outside adulthood (32.2%): 2 infancy, 19 childhood, 22 adolescence, 32 elderhood | 10 distinct pack registers | — |

The library therefore moved from **79 states / 1,740 kernels / 15 packs** to **99 / 1,973 / 25**. Of the 233 new kernels, 97 consume at least one pre-existing state; every new state has at least two creation paths and multiple downstream consumers. `pack-elder-memory` gained `em18-setup.cellar-box` after A/B showed `em18-family-archive` was too dependent on a death/empty-nest sequence. `pack-odd-jobs` is the institution-heavy pack (13 `position` effects and 23 organization effects); the other packs deliberately stay smaller and more situational.

### Novelty result against the existing library

The pack audit (`--pack`, self-matches excluded) found:

- 8 kernels at text similarity >= 0.20, all **inside their own pack** and all parts of a deliberate state arc: `iw18-friend.sugar-cube`/`farewell`, `yf18-runaway.north-station`/`returned`, `oj18-cinema.reel`/`censor`, and adjacent family-archive/ghost kernels;
- 0 new kernels at >= 0.20 against pre-Phase-18 content;
- highest cross-library neighbour 0.161 (infant pack), 0.148 (elder/dark-fantasy), 0.125 (history-street), 0.139 (love-desire), 0.094 (money-luck).

This is a lexical result, not proof of originality. It does show that the themed briefs produced new vocabulary and situations rather than name-swapped versions of the Phase 17 library.

## 4. Author rules

Every pack:

- 2–3 states, each with a real creation path and a real consumer (kernel condition / state_parameter / state_remove / transition / tick / reaction);
- 18–24 kernels, 2–4 outcomes each;
- at least 4 kernels consume an existing state or a state from another Phase 18 pack;
- at least 2 kernels use a non-default stage/age (child, elder, adolescence) if the pack theme allows;
- every outcome has at least one typed effect; mood alone is not enough;
- text 40–220 Chinese characters; concrete period detail; no modern internet slang, no engine jargon;
- no duplicate state/kernel IDs; use the assigned prefix;
- no code, SQL, URLs, scripts; runtime remains sole writer;
- pack metadata: `id`, `version`, `title`, `description`, `author`, `model`, `sourceBriefId`, `rationale`, `themes`, `era`, `tone`, `scope`, `rarity`, `contentWarnings`.

Before production, authors must run 2–3 Creative Index queries and record:

```text
idea:
nearest existing:
  - id / title / score
divergence:
  - premise:
  - conflict:
  - twist/outcome:
```

The editor can reject a concept that is only a name-swapped version of an existing kernel. It should **accept** a shared motif with a different engine.

## 5. Diversity rubric

For each new kernel, judge:

1. **Premise** — is the initial situation particular, not a generic category?
2. **Motivation** — does the subject want/avoid something specific?
3. **Conflict** — is the obstacle different from the nearest existing kernel?
4. **Twist** — is there a genuine reversal, misunderstanding, irony, or unexpected consequence?
5. **Outcome pattern** — do the outcomes change different things (resources, relations, status, body, identity, institutions, mobility)?
6. **Tone** — is the emotional register distinct from the pack next door?
7. **Setting** — does it use a concrete place/institution/object of the period?
8. **Long-term potential** — does it leave a state, relation, organization, position, knowledge or obligation that can matter later?

Reject only *mechanical* sameness. Do not reject a love story because another love story exists.

## 6. Integration and acceptance

```bash
pnpm tsx scripts/v4-validate-state-pack.ts packages/v4/content/states/generated/pack-<name>.json
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm exec tsc --noEmit
pnpm exec vitest run tests/v4-phase17-content.test.ts
```

Then Main Agent:

1. de-duplicates IDs/concepts;
2. registers packs in `generated/index.ts`;
3. regenerates catalog + creative index;
4. runs 2–3 natural 45–50 year seeds;
5. computes pack activation, state creation/consumption, repeatRate, focal share;
6. sends full dossiers to an independent Critic;
7. revises at least one pack based on evidence.

Acceptance is not “200 kernels exist.” It is:

- every pack validates and compiles;
- every new state has creation + consumer;
- at least 150 new kernels are reachable in natural lives;
- new content appears across multiple focal lives, not only NPCs;
- at least 8 clear premise-level divergences from existing kernels;
- repeatRate is not materially worse than Phase 17’s ~0.19;
- the Critic can name new, specific, non-template scenes.

## 7. Narrative patterns from research

These are pattern generators, not fixed plots. Use them to alter premise/conflict, not to add a scripted chain.

1. **The Errand That Grows** — one missing stamp becomes a tour of offices; each refusal adds a fee/witness/obligation. Outcomes: done by accident and miscredited; lost into an inheritance; resurfaces as evidence.
2. **The Wrong Death** — a rumor says the subject is dead/promoted/married while alive. Outcomes: accept the role and its benefits; correct it and gain an enemy; let it stand until someone claims the widow/office.
3. **The Benefactor's Small Test** — a powerful stranger gives a modest gift (coin, knife, introduction) without terms. It is useful now, costly later; reactions fire when it is used, sold or regifted.
4. **The Masked Hour** — a festival/masked ball suspends identity for one night. The mask permits one unacknowledgeable act; later recognition, blackmail, or a token left in the costume.
5. **The Debt With Two Creditors** — a debt/favor is sold, inherited or called in by a new creditor. Payment satisfies the letter, not the relationship.
6. **The Quiet Diagnosis** — a routine exam/audit/inspection finds something slow and serious; the day continues. Ticks change habits and who is told; nothing resolves it.
7. **The Inheritance of an Argument** — the dead leave not property but a claim, grudge, or letter to deliver. Two heirs have incompatible memories; ambiguity is the inheritance.
8. **The Machine That Works** — a labor-saving device/reform creates new labor, injury, or status. It works, which is the problem.

### Failure and detail

- Failure must leave **a thing**: a debt, scar, nickname, witness, obligation, or changed object. “It did not work” is a no-op with prose.
- Use **disproportion**: small cause/large cost, huge effort/trivial result. Record both.
- **Succeed on the wrong problem**: the permit arrives for the dead brother; the rescue reaches the wrong building.
- **Two-axis outcomes**: task done/dignity lost; task failed/ally gained; postponed/interest accrued.
- A memorable object should have **custody, version and three readings** — a receipt is thrift to one, evidence to another, a love letter to a third. Let decades mark it, and let a coda hand it to someone new.

### History as pressure, not curriculum

Prefer institutions over events: permits, ration cards, curfews, denunciation forms, currency. Build irony from the gap between official value and operation (a loyalty oath at a wedding; a purge that saves a mediocre official; a victory parade that requisitions the last horses). Let great events arrive as weather, prices and rumors; characters may misunderstand them plausibly. Use two clocks: personal time and historical time.

### Common samey traps

- **Theme-first premise**: two friends fall out over money → two sisters co-own a dress shop; one sells the other’s wedding dress to a stranger for rent, and the stranger wears it to the wedding.
- **Symmetrical moral accounting**: honest clerk promoted → he is promoted to sign the order ruining his brother-in-law; refusing costs him both.
- **Stat-swap outcomes**: inheritance raises cash/lowers reputation → the will also makes him guardian of the dead man’s mistress’s child, who knows his voice from the fire.
- **Period wallpaper**: family struggles under the new regime → a printer miscreases a plebiscite ballot, and a loyal man is investigated because his paper folds the wrong way.
- **Explanation cures misunderstanding**: she explains the letter and they reconcile → he believes her; the sister who forged it now feels betrayed, and the wedding proceeds without her.
