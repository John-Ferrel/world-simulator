# Phase 17 — Content Library Architecture & Author Brief

Date: 2026-11-06  
Baseline: Phase 16 `703500f` (52 states, 1,652 kernels, 6 generated packs, real PostgreSQL and natural-life runners). Phase 17 final: **79 states / 1,740 kernels / 15 generated packs** (43 generated states, 135 generated kernels).

## 1. Design goal

Phase 17 is a **content production** phase. The runtime already has the expressive machinery:

- `StateDefinition` / `StateInstance` with parameters, typed links, ticks, reactions and transitions;
- `PlotKernel` → compiled `SceneDefinition` / `TaskDefinition`;
- conditions, weighted outcomes, d20 checks, effects, positions, organizations and historical processes;
- state/position opportunity lane, `child` role, `$positionOrg` / `$positionId` / `$positionTitle`;
- Content Factory validation, PostgreSQL persistence and natural-life dossiers.

The goal is to make the library **broad, combinable and legible** without adding a second engine. A new author should be able to:

1. read the catalog;
2. find an under-consumed state or a missing life stage;
3. write a validated StatePack;
4. register it;
5. run a natural life and see whether it actually appears.

## 2. Library layers

```text
Runtime registry
  ALL_STATES / KERNEL_LIBRARY / GENERATED_STATE_PACKS
        ↑
Pack layer (versioned, author-owned)
  package/v4/content/states/generated/pack-*.json
        ↑
Catalog layer (generated, queryable)
  docs/v4/content-catalog.json / .md
        ↑
Author layer (Markdown briefs, research, validation)
  docs/v4/phase-17-*.md
```

The catalog is generated from the runtime imports. It must not become a second source of truth. If the catalog disagrees with `ALL_STATES` or `KERNEL_LIBRARY`, regenerate it:

```bash
pnpm v4:content-catalog
```

## 3. Directories and naming

| Path | Purpose |
|---|---|
| `packages/v4/content/states/core-states.ts` | Small authored core mechanisms; stable shared states |
| `packages/v4/content/states/wish-states.ts` | Wish archetypes; not a generic event pool |
| `packages/v4/content/states/generated/pack-*.json` | Versioned generated/authored StatePacks |
| `packages/v4/content/states/generated/index.ts` | Explicit import + registration of packs |
| `packages/v4/content/kernels/` | Base/recipe kernels; do not add new Phase 17 packs here unless they need engine-level composition |
| `docs/v4/content-catalog.*` | Generated catalog and coverage view |
| `data/phase15-content/` | Content Factory registry/report output; runtime does not read it directly |

### Pack metadata

Every pack must include:

```json
{
  "id": "pack-example-domain",
  "version": 1,
  "title": "short human title",
  "description": "what gap this closes and which states it composes",
  "author": "phase17-content-author/<role>",
  "model": "deepseek-v4.1-flash-subagent",
  "sourceBriefId": "phase17-...",
  "rationale": "why this is a useful, non-duplicate addition",
  "states": [],
  "kernels": []
}
```

Use a unique prefix per pack for all state IDs and kernel IDs:

| Pack | Prefix | Theme |
|---|---|---|
| `pack-life-course` | `lc17-` | childhood, growing up, aging, care, inheritance |
| `pack-desire-scandal` | `ds17-` | desire, intimacy, secrecy, jealousy, reputation |
| `pack-crime-justice` | `cj17-` | crime, police, courts, prison, debt, escape |
| `pack-migration-belonging` | `mb17-` | migration, borders, diaspora, return, belonging |
| `pack-faith-miracles` | `fm17-` | religion, cults, relics, visions, fraud, doubt |
| `pack-fame-art` | `fa17-` | art, performance, media, plagiarism, celebrity |
| `pack-absurd-fortune` | `af17-` | luck, mistaken identity, absurd inheritance, wishes |
| `pack-work-craft` | `wc17-` | craft, factories, unions, class, career reinvention |

Do not reuse a state ID with a different meaning. New states should be reusable across at least two packs; a one-pack-only state is acceptable only when it is a genuinely unique story hook.

## 4. Shared semantic hooks

These existing states are intended as cross-pack hooks. New content should consume them, not duplicate them:

- `secret-lover`, `forbidden-attachment`, `known-affair`, `jealous-rival`, `public-scandal`
- `raising-child`, `grief`, `family-estate`, `war-widow-with-children`
- `apprenticeship-contract`, `journeyman`, `failed-apprentice`, `factory-employment`, `blacklisted`, `strike-wave`, `strike-committee`
- `university-student`, `university-graduate`, `university-dropout`
- `cursed-by-wish`, `curse-bargain`, `suspected-witchcraft`
- `office-patronage`, `office-under-siege`, `political-suspect`, `under-investigation`, `detained`
- `fame`, `stage-king`, `stage-sovereign`
- `occupied-city-regime`, `institution-purge`
- `debt-bondage`, `chronic-illness`
- `wish-*` states

The catalog lists current consumers for each state. Prefer adding a consumer to `university-graduate`, `chronic-illness`, `debt-bondage`, `city-under-occupation`, or the low-consumption states before creating a near-duplicate.

## 5. What a good State is

A State should carry a **situation that changes future choices**, not only a label:

- owner: person, household, organization, place, region;
- 2–6 typed parameters (bounded numbers/booleans/strings);
- tags that other content can match;
- optional `modifiers` (scene weight/check bonus);
- 1–2 ticks with real effects or transitions;
- 1–2 reactions to committed tags/roles (betrayal, death, school, strike, liberation, publication, etc.);
- 0–2 transitions with explicit conditions;
- a clear exit/duration rule.

A light state may be only tags + one modifier + one reaction. Do not inflate every state into a mini-game.

### Example: reusable state with a downstream consumer

```json
{
  "id": "ds17-double-life",
  "title": "双重生活",
  "description": "一个人同时维持两套亲密关系；每一次见面、每一封信和每一个节日都可能让两套生活相撞。",
  "owner": "person",
  "slot": "secret",
  "conflict": "replace",
  "tags": ["secret", "intimacy", "risk", "identity", "relationship"],
  "parameters": {
    "strain": { "type": "number", "default": 20, "min": 0, "max": 100 },
    "exposure": { "type": "number", "default": 10, "min": 0, "max": 100 }
  },
  "durationMonths": { "min": 6, "max": 60 },
  "modifiers": [
    { "kind": "scene_weight", "tags": ["intimacy", "secret", "scandal"], "multiplier": 1.4 }
  ],
  "reactions": [
    {
      "id": "a-name-slip",
      "onTags": ["public", "scandal"],
      "chance": 0.5,
      "effects": [
        { "type": "state_parameter", "ownerType": "person", "ownerId": "$subject",
          "stateId": "ds17-double-life", "key": "exposure", "delta": 20,
          "reason": "a public event brought the two lives closer" }
      ],
      "text": "{subject}在公开场合听见有人同时提起两个名字，端杯子的手停了一下。",
      "cooldownMonths": 12
    }
  ]
}
```

The pack must also include kernels that **consume** `ds17-double-life` (for example a wedding, a police interview, a lover's return, a child's school event), not only create it.

## 6. What a good Event/Kernel is

- One required `subject` role; 1–3 optional/required roles chosen from the supported role kinds;
- stage and age window that match the subject, not the child/partner;
- 2–4 outcomes with genuinely different consequences, not just different prose;
- every outcome has at least one typed effect;
- text 40–220 Chinese characters; concrete nouns, time, place, money, weather, objects;
- use existing states in conditions (`hasState`/`notHasState`, owner `person`/`household`/`organization`/`place`);
- use `position` conditions for real offices;
- use `history`/`hasFlag`/`relationHistory` for continuity;
- allow dark, erotic, violent, criminal, absurd and happy outcomes; do not moralize every branch;
- do not hardcode a seed, a player name, or a historical person's private details;
- do not rely on a state only being created by this same kernel unless the entry branch is reachable.

### Allowed roles

`subject`, `parent`, `guardian`, `sibling`, `child`, `partner`, `teacher`, `employer`, `worker`, `union_member`, `neighbor`, `official`, `organization`, `historical`.

### Allowed conditions

`age`, `stage`, `cash`, `householdSize`, `overcrowded`, `health`, `skill`, `education`, `employment`, `placeKind`, `hasRole`, `notHasRole`, `development`, `developmentType`, `capability`, `historicalProcess`, `legacy`, `hasRelationWith`, `hasRelation`, `notHasRelation`, `worldYear`, `region`, `sex`, `pressure`, `history`, `knowledge`, `project`, `relationHistory`, `hasFlag`, `hasState`, `notHasState`, `attribute`, `position`.

### Allowed effects

`cash`, `food`, `health`, `condition`, `mood`, `reputation`, `skill`, `flag`, `education`, `employment`, `unemployment`, `relation`, `relation_end`, `role`, `organization_membership`, `project`, `interaction`, `move`, `household`, `residence`, `birth`, `death`, `estate`, `organization_funds`, `knowledge`, `historical_participation`, `historical_influence`, `historical_process`, `state_add`, `state_remove`, `state_parameter`, `state_transition`, `position`, `organization_found`.

### Text tokens

Declared role keys plus builtins: `subject`, `residence`, `place`, `school`, `workplace`, `age`, `year`, `child`, `milieu`, `context`.

## 6b. Creative Index (Phase 18)

Before writing a new premise, query the Creative Index:

```bash
pnpm v4:creative-index -- --query "a poor tailor receives a lawyer's letter about a stranger's castle"
pnpm v4:creative-index -- --kernel <existing-kernel-id>
pnpm v4:creative-index -- --gaps
```

Record the nearest existing kernels and explain the divergence in premise, conflict, twist or outcome pattern. Similarity is an editor prompt, not a prohibition. Phase 18 reports 43 pairs >= 0.20 across 1,973 kernels (138 at 0.15); the highest pairs are mechanical near-duplicates, while shared motifs with different engines are allowed.

## 7. Author workflow

1. Read `docs/v4/content-catalog.md`, this brief, and 2–3 existing packs (`pack-office-influence`, `pack-curse-betrayal`, `pack-family-continuity`).
2. Pick one gap: an unconsumed state, a weak life stage, a low-coverage domain, or a cross-pack combination.
3. Write `packages/v4/content/states/generated/pack-<name>.json`.
4. Validate:
   ```bash
   pnpm tsx scripts/v4-validate-state-pack.ts packages/v4/content/states/generated/pack-<name>.json
   ```
   Fix until `ok: true`.
5. Register the pack in `packages/v4/content/states/generated/index.ts` (import and add to `GENERATED_STATE_PACKS`).
6. Regenerate the catalog:
   ```bash
   pnpm v4:content-catalog
   ```
7. Run:
   ```bash
   pnpm exec tsc --noEmit
   pnpm exec vitest run tests/v4-phase15-content.test.ts tests/v4-kernels.test.ts
   ```
8. Report: pack id, states, kernels, scenarios, expected cross-combinations, validation output, and one natural-life observation.

## 8. Editorial rules

- **No duplicate concepts.** Search the catalog and existing pack JSON before creating a state. If a close state exists, add a consumer or a parameter/transition instead.
- **No empty chains.** A state that is created and never consumed is a failure. At least one kernel or reaction must read it.
- **No template inflation.** Do not add twenty near-identical outcomes. Two or three distinct consequences are better than eight name-swapped variants.
- **No forced plot.** Do not make every holder succeed, marry, die or become famous. Outcomes should include failure, refusal, delay, misunderstanding and unintended consequences.
- **No moralizing.** A corrupt official can be competent; a criminal can be loyal; a victim can be cruel.
- **Keep historical texture specific.** Use Vienna/Old Austria institutions, paper, currency, rooms, work, food, religious practice and period language; avoid generic modern psychology.
- **State is not a second Person.** Do not store permanent identity facts (name, birth, death) in state parameters; use Person/Relation/Organization effects.
- **World authority stays in runtime.** The pack contains definitions only; no code, SQL, HTTP, URLs, scripts or direct world mutation.

## 9. Review loop

1. **Author self-review:** validation + one focused natural-life run.
2. **Cross-review:** another author reads one life and checks role casts, repetition, historical texture and whether the state actually matters.
3. **Critic:** independent reader scores multiple full lives; identify template repetition and missing consequence branches.
4. **Main Agent:** integrate, remove duplicates, adjust weights/conditions, regenerate catalog, rerun tests and dossiers.

The content library is successful when a new author can find a gap, reuse an existing state, and produce a pack that shows up in a natural life without a runtime code change.
