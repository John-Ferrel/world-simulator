# Phase 14 authoring contract — long-life chains and echoes

This document is for content agents writing `batch14-*` kernels. Read
`packages/v4/content/kernels/recipes/kit.ts` and an existing batch first.
Everything here compiles through the ordinary composer and is settled by the
ordinary engine. Do not add a parallel state machine.

## The shape we want

A Phase 14 batch is not 50 unrelated accidents. Write **chains**:

1. **Seed** — a concrete event that changes state (job, relation, skill,
   knowledge, flag, household, organization, body).
2. **Consequence** — a later event or Task whose `conditions` include a
   `history` condition on the seed's semantic tag. It must be possible for a
   person who did not live the seed to never see it.
3. **Echo** — a still later event that reuses the same person through
   `sharedHistoryTag` on a role. The old foreman, lover, rival, teacher or
   comrade returns; they are not recast as a stranger.

At least 60% of kernels in your batch must carry a `history` condition
(scene-level `conditions` or outcome-level `when.history`). At least 40% of
outcomes must schedule a follow-up. A batch may contain both `kind: 'event'`
and `kind: 'task'`; tasks are attempts a person chooses, events are things that
happen to them.

## History conditions

Scene-level (raw `SceneCondition`, inside `conditions: [...]`):

```ts
{ kind: 'history', tag: 'mentorship', minCount: 1, withinYears: 12 }
{ kind: 'history', kernelId: 'r14-edu.scholarship', outcome: 'won', minYearsAgo: 1 }
{ kind: 'history', actionPrefix: 'vienna-family-courtship', includeParticipants: true }
{ kind: 'history', tag: 'war_service', withRole: 'comrade', minCount: 1 }
{ kind: 'relationshipHistory' } // see below
```

Fields:

- `tag` — semantic tag written on the earlier scene's `tags` (or derived from a
  settled effect: `death`, `unemployment`, `employment`, `partnership`,
  `separation`, `household`, `migration`, `birth`, `injury`).
- `kernelId` / `actionPrefix` / `outcome` — match a specific earlier mechanism.
- `minCount` / `maxCount` — number of matching incidents (default 1).
- `withinYears` — recency window.
- `minYearsAgo` — minimum calendar-year distance. Use `1` for "a previous
  year", `2+` when at least one full year must have passed between the events.
- `includeParticipants` — count incidents the person witnessed, not only ones
  where they were the subject.
- `withRole` — require the past incident to have a participant in that role.
- `minSignificance` — only count weighty incidents.

Outcome-level branch shorthand (`when`):

```ts
when: { history: { tag: 'betrayal', minCount: 1, withinYears: 8 } }
when: { hasFlag: 'blacklisted_after_strike' }
```

Other useful existing conditions: `hasRelation`, `relationHistory`,
`knowledge`, `project`, `hasFlag`, `employment`, `cash`, `skill`,
`historicalProcess`, `legacy`, `worldYear`, `region`.

`relationHistory` requires a durable relationship:

```ts
{ kind: 'relationHistory', relationKind: 'friend', minSharedEvents: 2, minTrust: 0.2, minYears: 5 }
```

`knowledge` / `project` / `hasFlag`:

```ts
{ kind: 'knowledge', propositionIncludes: 'blacklist', minConfidence: 0.6 }
{ kind: 'project', projectKind: 'workshop', state: 'active' }
{ kind: 'hasFlag', flag: 'widowed_by_war' }
```

## Returning people

Role declaration in `kit.ts`:

```ts
roles: {
  oldForeman: ['worker', { minAge: 45, maxAge: 80, sharedHistoryTag: 'work_injury' }],
  formerLover: ['neighbor', { minAge: 30, maxAge: 65, sharedHistoryTag: 'courtship' }],
}
```

`sharedHistoryTag` starts from people who actually shared an event carrying
that tag with the subject, then applies age/sex/place constraints. It never
materializes a stranger. If the role is `required: true`, the scene blocks when
no such person exists; that is deliberate. Prefer the role in an **echo** kernel
gated by `history` on the same tag.

On follow-ups, the engine already prefers the cause event's participant in the
same role, so a scheduled consequence keeps the original partner/foreman when
possible.

## Follow-ups

```ts
outcomes: [
  {
    id: 'signed-the-lease',
    text: '...',
    significance: 0.8,
    fx: { cash: -18, flag: 'shop_lease', role: 'shopkeeper' },
    followup: { sceneId: 'r14-career.first-customer', delayMonths: 6 },
  },
]
```

- `sceneId` is a **kernel id**, not a compiled scene id. The engine resolves it
  against the contexts active when the follow-up is due.
- `delayMonths` defaults to next year.
- `subjectRole` targets a participant instead of the subject.
- The target kernel should have `baseRate: 0` (or a low rate) so it normally
  happens only as a consequence; a rate-1 target will also appear on its own.
- Keep follow-up chains to 2–3 steps. Long-term echoes should be standalone
  history-conditioned scenes, not a queue that waits 30 years.

## Semantic tags

Give every seed a small set of lowercase snake_case tags that describe what
happened, not the domain: `mentorship`, `betrayal`, `blacklist`,
`work_injury`, `war_service`, `political_arrest`, `exile`, `lost_child`,
`business_failure`, `public_humiliation`, `unexpected_inheritance`,
`forbidden_affair`, `strike_participation`, `saved_a_life`, `killed_a_man`,
`published_first_book`. Later kernels reference these exact strings.

Do not use broad tags (`work`, `family`, `history`) as the only history key;
they will match too much.

## Goal and task continuity

- `taskMeta(domain, goals, needs, baseUtility, risk, skills)` uses the existing
  goal vocabulary.
- A Task that a person has already attempted gets a focus bonus in the same
  domain; make follow-up tasks specific, not repetitive.
- A task with `conditions` can require a flag, knowledge, project, relation or
  past event. Use this to make schooling, a craft, a courtship or a political
  cause a multi-year effort.
- Failure is allowed. A failed exam, rejected proposal or bankrupt shop should
  produce a real state change (flag, debt, relation, role), not only mood.

## Effect discipline

- Every outcome has at least one real effect.
- `significance >= 0.7` must carry a major effect: `role`, `education`,
  `employment`, `unemployment`, `relation_end`, `household`, `residence`,
  `birth`, `death`, `estate`, `move`, `condition`, `flag`,
  `organization_membership`.
- Money is kronen unless the context is explicitly heller; state the exact sum
  in the text and make it match `cash`.
- Do not claim a move, job, marriage, birth or death that has no effect.
- Do not create a new relation with an organization; `relation` targets people.
- Deaths need a specific cause and should be rare.

## Prose

- 90–220 Chinese characters per outcome; concrete object, place, body,
  procedure, dialogue or institutional detail.
- Use `{subject}` and declared role tokens. Never hardcode `他`/`她` for the
  subject; use `{subjectPronoun}` if needed.
- Vary the mode: Chekhovian restraint, Maupassant social cruelty, Kafka
  bureaucracy, Shirley Jackson group pressure, Bierce/Vonnegut war absurdity,
  Dahl reversal, Hemingway action.
- The text must describe the **actual** outcome; do not write a hopeful ending
  when the effect is a dismissal, debt or death.

## Validation

```bash
pnpm exec tsx scripts/v4-recipe-check.ts packages/v4/content/kernels/recipes/batch14-<your-file>.ts <EXPORT>
pnpm typecheck
pnpm exec vitest run tests/v4-recipes.test.ts tests/v4-kernels.test.ts
```

Fix every ERROR. Report count, task/event split, history-conditioned kernels,
followups, shared-history roles, and three notable chains.
