# Phase 18 — Research Notes for Content Authors

Date: 2026-11-07  
Purpose: give Phase 18 Authors and future Content Factory briefs a compact set of narrative patterns, failure modes and coverage heuristics. This is design research, not runtime code and not a plot-chain specification.

## 1. Eight patterns that produce episodes without a fixed chain

These are generators. They define a pressure and a few outcome shapes; they do not prescribe a sequence of scenes.

1. **The Errand That Grows** (picaresque/farce)  
   One missing stamp, signature or receipt turns a five-minute errand into a tour of offices. Each refusal adds a fee, a witness or an obligation. Outcomes: done by accident and miscredited; lost into an inheritance; resurfaces as evidence.
2. **The Wrong Death** (black comedy/fate reversal)  
   A rumor says the subject is dead, promoted or married while still alive. Every correction removes someone’s benefit. Outcomes: accept the role and its cash/status; correct it and gain an enemy; let it stand until a widow or office claims it.
3. **The Benefactor’s Small Test** (fairy tale)  
   A powerful stranger gives a modest gift — a coin, knife, introduction or job — without terms. It is useful now and costly later. Outcomes: an irrelevant kindness passes; competence fails; selling it creates a claim.
4. **The Masked Hour** (absurd/erotic)  
   A festival, masked ball or one-night job suspends identity. The mask permits one unacknowledgeable act. Outcomes: later recognition (attachment or blackmail); the act blamed on the mask; a token left in the costume.
5. **The Debt With Two Creditors** (comic failure)  
   A debt or favor is sold, inherited or called in by a new creditor. Payment satisfies the letter, not the relationship. Outcomes: pay twice; disprove it and insult a patron; accept it and inherit the creditor’s enemies.
6. **The Quiet Diagnosis** (Chekhovian)  
   A routine exam, audit or inspection finds something slow and serious; the day continues. Ticks change habits and who is told. Outcomes: tell no one and buy cures; tell a rival; tell the household and rearrange work. None resolves it.
7. **The Inheritance of an Argument** (folk tale)  
   The dead leave not property but a claim, grudge or letter to deliver. Two heirs have incompatible memories; ambiguity is the inheritance. Outcomes: pursue and lose the land; burn it and keep peace at the cost of a relation; deliver it and start a feud.
8. **The Machine That Works** (industrial farce)  
   A labor-saving device or reform creates new labor, injury or status. It works, which is the problem. Outcomes: sabotage it and be blamed for lost output; become its only operator (position/dependence); it enriches the owner and makes workers disposable.

## 2. Failure that is not the absence of success

- **Leave a thing**: a debt, scar, nickname, witness, obligation or changed object. “It did not work” with no consequence is a no-op with prose.
- **Use disproportion**: small cause/large cost, huge effort/trivial result; record both sides.
- **Succeed on the wrong problem**: the permit arrives for the dead brother; the rescue reaches the wrong building.
- **Use two axes**: task done/dignity lost; task failed/ally gained; postponed/interest accrued.
- **Attribute failure**: it should trace to a prior commitment or colliding obligation, not authorial humiliation.

## 3. Making a small object matter over decades

- Track **custody and version**: a key, receipt, photograph, borrowed kettle, debt note, recipe, letter or rumor; who holds it, which version, what it means.
- Give it **three readings**: a receipt is thrift to one person, evidence to another, a love letter to a third.
- Let **decades mark it**: repair the handle, rewrite the inscription, lose a page, add a child’s name.
- Use **absence** as an event: a search, accusation, false memory or inheritance dispute can be stronger than the object being present.
- **Read it at the end**: a coda that hands it to a new holder turns a prop into a life.

## 4. History as pressure, not curriculum

- Prefer **institutions over events**: permits, ration cards, curfews, denunciation forms, currency, queues.
- Build irony from the **gap between official value and operation**: a loyalty oath at a wedding; a purge that saves a mediocre official; a victory parade that requisitions the last horses.
- Let great events arrive as **weather, prices and rumors**. Characters may misunderstand them plausibly and argue about the wrong consequence.
- Use **two clocks**: personal time and historical time. The irony is betting on the wrong one without explaining the period.

## 5. Ten motif seeds for underused tones

1. **revolution** — a bakery’s ovens become a meeting place; heat, smell and flour can betray it.
2. **luck** — a lucky coin makes its owner a mascot; strangers touch it, and he loses the right to private bad luck.
3. **supernatural** — a dead mother’s recipe works only if followed exactly; family call it a miracle, neighbors call it poisoning.
4. **betrayal** — a clerk denounces a friend to save a sibling; the office reuses his wording against the sibling.
5. **love** — two people meet only while nursing the same dying person; the death ends the only reason to meet.
6. **escape** — a smuggler can take one person across the border; the unchosen one’s letters arrive for years.
7. **erotic** — a glove in a piano bench starts anonymous notes; the danger is being identified, not desire.
8. **eerie** — the previous tenant still gets mail describing the new tenant’s life; every explanation threatens.
9. **absurd** — a town medals the wrong hero; the real hero cannot read the citation, and the impostor gives speeches.
10. **triumphant** — a failed singer gets funeral applause for the wrong reason, costing one friend.

## 6. Common samey traps and premise-level fixes

- **Theme-first premise**  
  Before: two friends fall out over money.  
  After: two sisters co-own a dress shop; one sells the other’s wedding dress to a stranger for rent, and the stranger wears it to the wedding.
- **Symmetrical moral accounting**  
  Before: the honest clerk is promoted.  
  After: he is promoted to sign the order ruining his brother-in-law; refusing costs him both.
- **Stat-swap outcomes**  
  Before: inheritance raises cash, lowers reputation.  
  After: the will also makes him guardian of the dead man’s mistress’s child, who knows his voice from the fire.
- **Period wallpaper**  
  Before: the family struggles under the new regime.  
  After: a printer miscreases a plebiscite ballot, and a loyal man is investigated because his paper folds the wrong way.
- **Explanation cures misunderstanding**  
  Before: she explains the letter; they reconcile.  
  After: he believes her; the sister who forged it now feels betrayed, and the wedding proceeds without her.

## 7. Content-system conclusions used in Phase 18

- Derive creative metadata rather than adding it to the runtime schema.
- Use lexical TF-IDF as a deterministic recall layer; embeddings are optional editor recall, not a runtime gate.
- Similarity is an editor prompt, not a rejection rule. A shared motif is allowed when premise, conflict, twist or outcome differs.
- Distinguish same-kernel repetition, structural repetition and prose-template repetition; each has a different fix.
- Measure stage/tone entropy, reachability funnel, focal share, top-kernel share and flat-repeat rate; do not reward raw kernel count.
- Keep authors isolated from each other’s drafts; check similarity before prose; validate with a different agent where practical.
- The runtime remains the sole canonical writer. Model output is untrusted static content until validated and registered.

## 8. References that informed the patterns

The research pass drew on the design traditions of Fallen London/StoryNexus, Crusader Kings, RimWorld, Dwarf Fortress, The Sims, BitLife, Cultist Simulator, Reigns, Caves of Qud and tabletop random-event design; and on black comedy, absurdism, historical irony, folklore/fairy-tale structures, farce, picaresque episodes and Chekhovian quiet stories. The useful lesson is not a mechanic to copy: it is the combination of a concrete pressure, a small object, a character-specific desire and an outcome that changes something the next year can use.

All Phase 18 pack text is original. No existing game text was copied.
