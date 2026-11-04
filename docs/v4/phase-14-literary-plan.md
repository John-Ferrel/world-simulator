# Phase 14 — Literary Plan: From Linked Fragments to Lives

**Status:** prospective plan. At the time of writing, all six `batch14-*.ts` files are empty scaffolds (`recipes([])`), and no Phase 14 playtest exists. This document specifies the chains, the whole-life rubric and the fixes that the Phase 14 content must satisfy. It does not claim that they are implemented.

**Source of evidence:** `docs/v4/playtest.json` (`generatedAt` 2026-11-04T12:34:26.433Z, seed `vienna-1912-vertical-slice`, 1912–2000, 31,830 events, 6,227 composed actions, 661 kernels, 757 persons); `docs/v4/phase-13-lives.md`; `docs/v4/phase-13-critique.md`; `docs/v4/phase-14-authoring.md`; the generated packs and `batch13-*` recipes behind the committed texts. I read the five 15-event excerpts as the dossier a player would read, and cross-read the full-life metadata (`focalLives`, `textAudit`, `schedulingAudit`, `warnings`) for evidence the excerpts hide. I did not rerun the simulation and did not modify code or content.

---

## 0. Executive summary

Phase 13 fixed the largest previous defect: the dossier is now about the named person, not the neighbour. That is real. But the five lives still read as **linked fragments with a strong composed micro-story layer**, not as biographies.

The reasons are structural, not mainly sentence-level:

1. **Intimates vanish.** Hedwig's son Friedrich 2 is born in 1942 and never returns in the dossier. Mitzi's daughter Rosa Winter is born in 1940 and never returns. Lena's son Franz (1932) and daughter Grete 2 (1946) exist only as birth events before her 1948 death. Emil's story moves from Lena (1932) to Marta (1939) to Anna (1942) with no transition.
2. **Seeds do not return.** The wooden horse, the blue doorplate, the concert ticket, the shop deposit, the clinic refusal and the flour loan are all concrete, state-changing seeds. None of them has a later scene in the dossier that reads the state it created.
3. **The full logs are dominated by templates, not threads.** Hedwig's full personal log records `vienna-illness-household.mother-falls` **19 times** and `p9-gap-childhood-chores.mind-sibling` **13 times**; Emil's records `p9-gap-childhood-chores.laundry-help` **13 times**; Mitzi's records it **11 times**. Across the 757-person world, the top repeated text is the second-person pawn-watch scene, **92 times**; the coal-credit scene appears **81 times**, the landlord rent scene **80 times**, the table-debt scene **74 times**. The 15-event excerpt hides this. A player who reads a full log does not see a life; they see the same transaction with different names.
4. **History is weather.** The 1945 liberation is hiding behind a door and collecting soup; the 1948 famine death is a statistical closure; the 1930 passport refusal is one scene and never becomes a paper trail. The great historical events do not change the chain's options; they change the weather.
5. **Endings are not scenes.** Anton (1923), Emil (1963), Mitzi (1981) and Lena (1948) all end in `statistical_death/*` events with no other participants. The best late scene, Hedwig's 1990 letter, has no addressee. The life stops; it does not close.

The Phase 14 answer is not another 300 isolated scenes. It is twelve cross-domain chains, a six-dimension whole-life rubric, and five fixes in this order: **life-thread scheduling, durable intimates, seed payoff, historical differentials, earned endings**. The two hardest prerequisites are engine-level and should be stated plainly: the library cannot yet cast a named child, and it cannot track an object except through flags and prose.

---

## 1. What the five lives actually establish

### 1.1 The dossier is a sample, not a life

| Life | Age at death / horizon | Subject events in excerpt | All personal events in full log | Largest gap between event years | Most repeated scene family in full log |
|---|---:|---:|---:|---:|---|
| Anton | 11 | 17 | 20 | 6 years | `market-line` ×3, `cigarette-card` ×3 |
| Hedwig | 88 (alive at horizon) | 261 | 467 | 4 years | `vienna-illness-household.mother-falls` ×19 |
| Emil | 51 | 256 | 534 | 3 years | `p9-gap-childhood-chores.laundry-help` ×13 |
| Mitzi | 69 | 322 | 516 | 2 years | `laundry-help` ×11, `childbirth` ×10 |
| Lena | 36 | 155 | 266 | 5 years | `birth` ×9, `childbirth` ×8 |

The excerpt column is `excerpts.totalEvents` (subject-only); the full-log column is `focalLives.events` (subject plus participant events). The distinction matters: the dossier prints 15 events per person, while the engine committed 20–534 personal events for the same people. The dossier is a curated reading text, not the life the engine actually produced. Both are evidence, but they answer different questions.

The playtest has eight focal lives; the dossier selects five. The other three — Matthias (d. 1970, age 58, 413 personal events), Franz (d. 1937, age 25, 103 events) and Rosa (d. 1916, age 4, 6 events) — have full-log metadata but no excerpt text, so they are outside this literary reading. Matthias is the only other long adult life and should be included in the next full-log check.

The full-log metadata is the more damaging evidence. Hedwig has 81 event-years and 467 personal events, yet her most frequent scene is her mother falling down the stairs **19 times**. That is not a life with a mother who has a chronic condition; it is a rate loop. The same is true of Emil's 13 laundry-help scenes and Mitzi's 11. The 15-event sample under-represents these repetitions, so the dossier looks more varied than the full log.

### 1.2 The five lives, read as lives

**Anton (1912–1923, age 11).** The strongest childhood vignettes in the set: the coal refusal, the wooden horse, the lost coin, the stolen cigarette card. They are precise about shame, objects and the body. But Anton is a sensor, not a character with a desire; his seed wish (“在工会里替工友说话”) never appears. His mother is present at birth, at the 1922 fever and at the 1923 lost coin; his father appears only at the coal scene. Hedwig, Anna Moser, Lena and Gustav Winter are one-scene figures. The death is a statistical event with no other participants and no link in the text to the 1923.02 infection. The life is a set of windows onto a childhood, not a childhood.

**Hedwig (1912–, age 88 at horizon).** The richest scene-by-scene life: the doorplate, the lost shoe at the museum, the fish divided in the corridor, the cinema with two sweets, the remade coat, the 1990 letter. It also has the least shape. The 1927 apprenticeship, 1931 registration, 1936 ledger refusal, 1939 apology, 1942 birth, 1945 liberation, 1953 quarrel, 1957 matchmaking, 1960 list, 1964 cinema, 1970 coat and 1990 letter are adjacent, not causal. Her son Friedrich 2 is named at birth and disappears. Her partner changes from Franz Moser 2 (1942) to Mitzi Stein (1953) without a separation, death or explanation in the dossier; by 1964 her cinema companion is Josef Stein. The 1990 letter is a superb ending image with no one to receive it.

**Emil (1912–1963, age 51).** The most events and the least relational continuity. The 1925 boarding-school pickle jar, the 1929 first wage, the 1932 reconciliation with Lena, the 1937 street musician, the 1939 fever, the 1942 sanatorium and the 1950 flour loan are individually strong. But three women enter his story with no transition — Lena (1932), Marta (1939), Anna (1942); a partner who is also a separate focal life (Lena) and a son (Franz Bauer, 1932) who is never acknowledged in Emil's dossier; and a death from “other” with no cause chain. Emil is a collection of good scenes about a man who never becomes one.

**Mitzi (1912–1981, age 69).** The clearest institutional victimhood: the 1931 clinic refusal, the 1934 dismissal as nerves, the 1943 hours ledger, the 1955 party recruitment, the 1959 ambulance train, the 1964 wrong tooth, the 1972 funeral. The clinic scenes set a real condition (`untreated_injury`) and a real flag (`denied_clinic_care_for_lack_of_papers`), but the later life never uses them. Her daughter Rosa Winter is born in 1940 and disappears; her partner Hermann Winter appears only at the birth; the 1951 childcare scene says “孩子” and casts a different partner. Her death is statistical pneumonia. Mitzi has a historical texture but no family and no ending.

**Lena (1912–1948, age 36).** The closest to a life. The 1930 passport refusal, the 1936 shop-licence refusal, the 1943 hunger, the 1944 gambling debt and the 1948 famine death form a rough downward economic arc. The paper boat folded from the goods list is a genuine motif. But the 1937 concert ticket is never answered, the son Franz and daughter Grete 2 disappear, the partners change, and the death is a statistical famine event with no children present. Lena is a fragmentary life with a spine, not a full life.

### 1.3 What is genuinely fixed

- **Subject identity.** The dossier now selects subject events; the old 32% participant drift is gone. This is the single largest improvement in Phase 13.
- **Composed micro-stories.** `return-home`, `collect-funeral-money`, `school-leaving`, `literacy-class`, `rent-contract` and the rewritten rescue have a subject, an institution, a cost and a turn. The composed layer is a real short-story layer.
- **Effect persistence in several important cases.** `home-care` is no longer empty; `son-born` records the six-krone debt; the rescue death is attached to a named neighbour. These are state fixes, not prose polish.
- **Residual hygiene.** 0 unresolved template tokens, 0 literal `None`/`undefined`, 0 post-death subject events in the final playtest. The text is clean at the token level.

The problem is that these wins are **event-level**. They do not add up to a life. The next section shows the gap in twelve passages.

---

## 2. Twelve passages: strong and weak

Each passage is quoted from `EventFact.immediateText` in `docs/v4/playtest.json`. The event id is shortened after `evt:world-vienna-1912:`. The craft judgment asks two questions: does the passage work as prose, and does it work as a moment in a life?

### 2.1 Anton, 1921.01 — the coal refusal

`001018` · `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` · effects: mood, food, skill, relation

> Anton空手站在窗口，听掌柜说“叫你Friedrich Hofer来”，耳朵一直红到脖子。后墙的渣堆冻得硬，Anton用鞋尖刨开表层，把煤核一颗颗捡进围裙。回家路上碰到同巷的孩子，Anton把纸袋往身后藏，进门才交给Friedrich Hofer。

**Craft judgment.** This is the best childhood scene in the five lives. The shame is never named; it is displaced into the ears, the frozen slag, the shoe tip, the apron and the bag hidden behind the back. It is Chekhovian in refusing the father's reaction, and Hemingway in the iceberg of what the boy does not say. The scene is also a precise causal seed: the merchant refuses credit because of the father's name, so the father is the cause of the humiliation. But the scene ends at the door. The father receives the bag and has no reaction, no shame, no debt, no later appearance. The `relation` effect is with a materialized neighbour, not with Friedrich Hofer; the father is a participant but has no relation effect. A strong seed; not yet a chain. Premise 1 is built on it.

### 2.2 Anton, 1922.05 — the wooden horse

`001119` · `p9-childhood-household.name-day-gift/wooden-horse` · effects: mood, relation

> Josefine Hofer把报纸包推到Anton面前，包得紧，Anton拆到第三层才看见木头。木马只有巴掌大，四条腿磨得圆滑，鬃毛是一刀一刀刻出来的。Anton把它揣进衣襟，上楼时用手护着，晚上放在枕头边，袖口蹭了一道黑印。

**Craft judgment.** The three layers of newspaper, the smoothed legs, the carved mane, the black cuff mark: this is a writer who knows how a child holds an object. Chekhov uses objects as compressed time; the horse could carry Anton's whole childhood. But the horse exists only in prose. It is not in the trace, not in the effects, and it never returns in the dossier — not at the 1923 infection, not at the death, not in the mother's hands. The reader remembers the horse; the life forgets it. This is the single best argument for an object flag and a keepsake chain (Premise 2), and a candid example of what the engine cannot yet represent.

### 2.3 Anton, 1923.08 — the death

`001326` · `statistical_death/pneumonia` · effect: death

> Anton在Leopoldstädter Zinshaus, gemeinsamer Gang发起高烧，咳嗽越来越深。邻居帮忙去请医生，医生到时只留下药粉和一张账单；几天后呼吸变得很浅。

**Craft judgment.** “医生到时只留下药粉和一张账单” is a good sentence; the bill is the only social relation in the death. But the scene is a template. No mother, father, Hedwig, horse, coin or card; no doctor's name; no cash effect; no other participants. It is not linked in the text to the 1923.02 `statistical_infection` or the 1922 washhouse fever, though the dates make a chain possible. Bierce's war deaths are ironic because the reader knows the specific person; Lu Xun's marginal deaths matter because the community's indifference is shown. Here the community is one sentence (“邻居帮忙去请医生”), and the death is a demographic closure. The ending does not recontextualize the coal, the horse or the stolen card; it stops the life.

### 2.4 Hedwig, 1931.02 — the blue doorplate

`003064` · `r3-mig.residency-registration::ctx-vienna-reform-1930::milieu-government::reform-new-register/paid-for-doorplate` · effects: cash, condition, flag, relation, knowledge

> Hedwig交了五克朗登记费和一克朗“门牌费”，Friedrich Hofer从抽屉里取出一块蓝底白字的门牌，说钉在门口，警察看见就知道这户登记过。Anna Winter接过门牌，翻过来看了看背面，说钉子要自己买。

**Craft judgment.** Kafka's bureaucracy is in the extra krone and the nails. The blue-and-white plate is a perfect object because it is both a house number and a police instrument; the state enters the household through a small purchase. The scene is also unusually good at money: five kroner plus one, plus the nails. But the plate never returns. There is no police check, no move, no eviction, no 1938 hiding, no 1945 liberation that reads the doorplate. The `condition`, `flag` and `knowledge` effects are recorded, but no later scene reads them. It is a model institutional seed and a model of what Phase 13 fails to do with one. Premise 9.

### 2.5 Hedwig, 1953.07 — the Sunday table

`009590` · `vienna-adult-social.sunday-table/sunday-table.argument` · effect: mood

> 星期天中午，Hedwig和Mitzi Stein在出租屋的厨房桌边分面包，话题从房租转到Hedwig母亲上个月的药钱。Mitzi Stein把刀放下，说这个家不能总先填那边的窟窿。面包凉了，汤也没再热。

**Craft judgment.** Maupassant's domestic stories turn a small money quarrel into a whole social world. Here the knife put down, the bread cooling and the soup not reheated are exact; “这个家不能总先填那边的窟窿” is the whole conflict between a household and a parent. But the effect is only `mood`. There is no relation change, no budget decision, no later silence, no mother's death, no partner's departure. The scene is a complete short story and a dead end in the life. A whole-life review asks: what did Hedwig choose? The text does not say, and the state does not record it. This is the clearest example of a consequence that does not return.

### 2.6 Hedwig, 1990.12 — the letter

`026198` · `p9-gap-elder-solitude.letter-to-kin/letter-no-reply-needed` · effects: mood, cash

> 她把信写完，末尾又加了一句“不必回信”，封口时手有些抖，浆糊抹到了纸边上。她用袖子蹭掉，翻出针线盒里的蜡头，还是决定只靠浆糊封，把信放在桌上等干。

**Craft judgment.** “不必回信” is the best line in the five lives: pride, fear and a lifetime of not asking. The glue on the edge, the candle stub and the decision not to seal with wax are Chekhovian late style. But the letter has no addressee. The son born in 1942, the mother, the partner from 1942, the friend from 1957 are all possible; the text says “远方的亲戚” and “她”, not a name. The scene is an ending without a chain. It would be devastating if it were addressed to Friedrich 2, or to the friend she introduced in 1957, or to the mother's grave. Premise 12 makes the addressee a state variable.

### 2.7 Emil, 1929.05 — the first wage

`002534` · `vienna-youth-threshold.first-wage/whole-envelope-home` · effects: cash, relation, mood

> Buchdruckerei Winter & Söhne把信封拍在Emil手心，八克朗，纸币边角还带着面粉味。回家路上Emil在电车轨道边站了很久，最后把整只信封放到Alois Lechner的针线篮里，只留下四赫勒电车钱，母亲数钱时手指停了一下。

**Craft judgment.** Hemingway's restraint: the envelope, the flour smell, the tram fare, the mother's paused fingers. The whole class bargain is in the four heller he keeps. But the scene is a closed loop. The envelope goes into the sewing basket and the life never returns to it. The trace's parent is Alois Lechner, while the text says “母亲”; the kin relation is attached to a person the text does not name. The father is absent from the prose, the mother is absent from the state. A first wage should establish a pattern — who holds the money, what is withheld, what it costs to leave — that changes under inflation, marriage and war. Here it is a beautiful still life, not a first link.

### 2.8 Emil, 1939.10 — the night fever

`005257` · `vienna-medical-treatment.night-fever/sweat-it-out` · effects: condition, relation

> 醋水的酸味混着汗气，屋子小得转不开身。玛尔塔把布拧到不滴水，敷上去时Emil打了个激灵。窗外送奶车吱呀碾过石板，她才想起自己家的炉子还灭着。

**Craft judgment.** The caregiver's own cold stove is a superb detail; it makes care a cost, not a sentiment. But “玛尔塔” is not in the cast. The trace participant is Matthias, and the relation effect is with Matthias. The text invents a woman, gives her a household, and then the state attaches the intimacy to a man. This is not a prose-polish issue; it is a continuity and casting failure. The reader cannot tell who is in the room, what the relationship is, or whether the fever has a cause. A whole-life rubric would fail relationship continuity even if the sentences are good. A rewrite alone cannot fix it; the role must be declared and the relation must match.

### 2.9 Mitzi, 1931.01 — the clinic

`003069` · `r2-urban.clinic-residence-paper::ctx-vienna-reform-1930::milieu-hospital::r2-urban.clinic-residence-paper-reform/turned-away` · effects: condition, flag, relation, knowledge, relation

> Maria Stein把Mitzi的申请推回来，说没有居住证明不能享受免费门诊。Mitzi说自己在码头干了三年，Maria Stein说那要码头开证明。Mitzi坐在走廊长椅上等到天黑，脚踝越肿越高，最后自己走回家。Hermann Lechner在楼梯口看见，扶了她一把。

**Craft judgment.** The bureaucratic loop — a certificate requires another certificate — is pure Kafka; the swollen ankle is the body's rebuttal. The scene is also a precise state change: `untreated_injury`, `denied_clinic_care_for_lack_of_papers`, and the knowledge that the clinic requires a residence certificate. This is exactly the kind of seed Phase 14 needs. But the next clinic scene (1934) is about coughing, not the ankle; the injury never becomes a limp, a lost job or a daughter's burden. The state is recorded; the life ignores it. Premise 3 is the consequence the scene deserves.

### 2.10 Mitzi, 1940.01 — the daughter

`005560` · `vienna-family-childbirth/daughter-born` · effects: birth, cash, relation

> Mitzi在Leopoldstädter Zinshaus, gemeinsamer Gang生下一个女婴，取名Rosa Winter。接生的人收六克朗，Hermann Winter在走廊烧水，邻居借来一只摇篮；Mitzi起身时眼前发黑，三天后腰还像断了一样，孩子哭声响亮，把屋里的冷气都顶了回去。

**Craft judgment.** The six kroner, the borrowed cradle, the postpartum dizziness and the cry pushing back the cold are strong; the body and the household economy are in the same frame. But the daughter is named and then vanishes from the dossier. The father Hermann Winter appears only here. The 1951 childcare scene says “孩子” and casts a different adult (Rosa Lechner 3) in the partner role. The birth is a state change (`birth`), not a relationship. A life-level review asks: where is Rosa at 10, at 20, at her mother's death? The library cannot answer. This is the clearest case for a child role and a family echo chain (Premise 6).

### 2.11 Lena, 1930.11 — the passport

`002766` · `major-crisis.border-papers/papers-refused` · effects: unemployment, cash, move, flag, relation

> 办事员把Lena的出生登记翻了三遍，说登记簿上的名字和申请表格差一个字母，不能发护照。Lena已经辞了工、退了房，只好把行李寄存在北站，跟Matthias挤回利奥波德城的一间转租屋。窗口在申请表上盖了一个蓝印：驳回；又另发一张限期离境的回执。

**Craft judgment.** The one-letter difference is a perfect Kafka machine; the blue stamp and the limited-time exit receipt are exact, and the costs are real: job, room, twelve kroner, a move back to Leopoldstadt. This is the strongest migration seed in the five lives. But the discrepancy never returns. The 1936 shop licence fails for a missing signature, not the name; the 1946 child registration is not shown; the 1948 death is famine. A chain of papers should accumulate, not reset. The `passport_refused` flag is a promise the life never keeps. Premise 4.

### 2.12 Lena, 1937.10 — the concert ticket

`004708` · `p9-social-courtship-friendship.friend-intercession/intercession-concert-ticket` · effects: cash, relation, relation

> Lena不再让Grete Bauer传话，托其带去一张星期天音乐会的站票，花了一克朗二十赫勒，位置在柱子后头。票上不写多余的字，只说若不方便，票留着也无妨。Grete Bauer把票揣进衬衫内袋，Lena则把找回来的铜板一枚枚放进铁盒，等一个回音。

**Craft judgment.** The ticket behind a pillar, the note that asks for nothing, the coins in the tin box and the waiting: Chekhovian courtship at its best. The scene understands that 1.20 kroner can be a whole risk. But it is an unearned turn. There is no reply, no refusal, no later meeting; the relation with Alois Stein is created and dropped, and by 1944 Lena is with Emil Weiss 2. “等一个回音” is a promise to the reader that the life never keeps. A whole-life rubric would score the scene high and the life low. Premise 5.

### 2.13 Template evidence — the same scene, two lives

These are not additional scored passages; they are the evidence that the library sometimes generates a scene, not a life.

- **Hedwig 1936.03** `004465` and **Mitzi 1967.09** `014882`, both `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse`, both titled 《工时表上的一行改动》. The texts are identical except for the name:

  > 学徒在旁边小声说，拒绝按手印的人名字会被单独抄在一张纸上。**Hedwig / Mitzi**没接话，把八克朗换成一克朗的硬币，数给家里时硬币在桌上滚了两圈才停。屋里的煤油灯芯剪得太短，光只够照亮手边的桌面。

  The same eight kroner in 1936 and 1967; the same moral choice for a 24-year-old and a 55-year-old; the same `reputation` and `relation` effects. No prior history changes the choice. This is a reusable labor-resistance unit, not a biographical event. The Phase 14 echo must make the 1967 refusal depend on what the 1936 refusal cost.

- **All five births** use the same frame: “X在Y出生。Z在生产后抱着孩子；这间住处现在住了N口人。” It is a census line, not a scene. The first event of every life is interchangeable. A whole-life rubric penalizes the absence of a first object, name, sound or memory.

### 2.14 Writer's lens for the missing scenes

The Phase 13 brief's writers are useful only where they fit a specific procedure:

- **Shirley Jackson** is the right register for Hedwig 1957.01 (`011090`) and the tenement denunciations: the violence of “这事就搁在那里”, the group that does not need a villain. The scene has the tone but not the pressure; a Jacksonian version would make the two men's silence cost something.
- **Dahl** is the right register for Mitzi 1964.01 (`013641`, the wrong tooth) and Emil 1956.09 (`010635`, the pharmacy label): a small institutional error becomes a black comedy because the victim has no recourse. Both scenes have the setup; neither has the return visit or the bill.
- **Vonnegut** is the right register for Hedwig 1945.01 (`007034`) and the missing conscription chain: the absurdity is administrative, not heroic. “躲在门后听见坦克履带” is a good sentence, but the scene needs the paperwork, the requisition or the missing man to be Vonnegut rather than a weather report.
- **Bierce** is the right register for Anton 1923.08 (`001326`) only if the death is tied to a specific delusion or irony; the current statistical death has the irony of a bill but no specific boy.
- **Lu Xun** is the right register for the statistical deaths of Anton and Lena: the community's indifference must be shown, not summarized. “邻居帮忙去请医生” is a summary; Lu Xun would show the neighbour deciding not to help.

These are not style recommendations for their own sake. Each writer names a **procedure** the current scene omits: Jackson the group, Dahl the institutional error, Vonnegut the paperwork, Bierce the specific irony, Lu Xun the community's cost. The Phase 14 chain supplies the procedure; the prose supplies the register.

---

## 3. Continuity failure patterns

### 3.1 People vanish

The dossier is full of one-scene intimates:

| Life | Person introduced | Date | Later trace in dossier |
|---|---|---|---|
| Anton | Hedwig (hoop game) | 1919.01 | none |
| Anton | Anna Moser (laundry, fall) | 1919.01, 1920.07 | none after 1920 |
| Anton | Lena (hoop loss) | 1921.08 | none |
| Anton | Gustav Winter (stolen card) | 1923.08 | none |
| Hedwig | Emil Weiss (museum) | 1933.12 | none |
| Hedwig | Otto Weiss 3 (bakery apology) | 1939.01 | none |
| Hedwig | Franz Moser 2 (son's father) | 1942.01 | none |
| Hedwig | Friedrich 2 (son) | 1942.01 | none |
| Emil | Lena (reconciliation) | 1932.01 | none in Emil's dossier |
| Emil | Marta (night fever) | 1939.10 | none |
| Emil | Anna (sanatorium letter) | 1942.10 | none |
| Emil | Franz Bauer (flour loan) | 1950.05 | none |
| Mitzi | Hermann Winter (daughter's father) | 1940.01 | none |
| Mitzi | Rosa Winter (daughter) | 1940.01 | none |
| Mitzi | Emil Kral (ambulance train) | 1959.11 | none |
| Lena | Alois Stein (concert ticket) | 1937.10 | none |
| Lena | Franz Bauer (son) | 1932.01 | none |
| Lena | Grete 2 (daughter) | 1946.01 | none |

Some of these people may appear in the full log outside the 15-event sample. The claim is about the dossier as a reading experience: the text introduces an intimate, gives them a body and a cost, and then never returns. The full log adds more events, but the top-prefix evidence suggests more one-scene neighbours and template loops, not more durable intimates.

### 3.2 Consequences do not return

The strongest seeds are objects and institutions:

- **Wooden horse** (`001119`): a gift from the mother, never pawned, lost, inherited or carved again.
- **Blue doorplate** (`003064`): a registration object, never checked by police, never moved, never hidden.
- **Clinic refusal** (`003069`): `untreated_injury` and `denied_clinic_care_for_lack_of_papers` are set, but the ankle never becomes a limp or a job loss.
- **Passport refusal** (`002766`): `passport_refused` is set, but the later shop licence fails for a different reason.
- **Shop deposit** (`004525`): the deposit is paid, the licence refused, the paper goods list folded into a boat; the loss never becomes debt, family blame or a second attempt.
- **Concert ticket** (`004708`): the ticket is sent, the reply never comes; the relation is created and dropped.
- **Flour loan** (`008570`): the bag is lent, the cupboard is emptier, the loan is never repaid or called in.
- **Union card (`002280`) / party membership (`010287`)**: a role is added, but no meeting, arrest, leaflet, denunciation or ideological conflict follows in the dossier.

A consequence does not have to be a punishment. It can be a return, a refusal, a repetition with a difference, a debt, a rumour, a child asking the same question. The point is that the later scene must read the earlier state.

### 3.3 Years are filled with templates, not threads

The full-log metadata is unambiguous:

- Hedwig: `vienna-illness-household.mother-falls` ×19; `p9-gap-childhood-chores.mind-sibling` ×13; `birth` ×10; `vienna-medical-treatment.night-fever` ×10; `vienna-family-childbirth` ×8.
- Emil: `p9-gap-childhood-chores.laundry-help` ×13; `market-line` ×9; `p9-history-union-political.meeting` ×8; `vienna-housing-move.sublet-room` ×8.
- Mitzi: `laundry-help` ×11; `vienna-family-childbirth` ×10; `vienna-life-injury-recovery` ×9; `birth` ×7.
- Lena: `birth` ×9; `vienna-family-childbirth` ×8; `laundry-help` ×6.
- Global top repeated texts: 92 pawn-watch, 82 pawn-watch chain, 81 coal-credit, 80 landlord rent, 74 table debt, 73 watch, 73 coal, 73 eviction, 61 rent. The top nine repeated texts are second-person (“你”), which suggests that a full-log read alternates between third-person biography and second-person generic address.

The gaps are also unshaped. Anton has no event between birth in 1912.01 and 1918.01 (age 6); Lena has no event between 1912 and 1917; Hedwig between 1914 and 1918; Emil between 1914 and 1917; Mitzi between 1913 and 1915. A six-year silence at the start of an eleven-year life is not a childhood; it is a sampling hole. The dossier should either include the early childhood scenes or mark the gap as unknown. The full log has 20 personal events for Anton and 266 for Lena, so the gap is partly a selection artifact; but the reader sees the gap, and the life rubric must score what the reader sees.

This is not a pacing problem in the ordinary sense. It is a **content-selection problem**: the rate pool gives the same generic scene many slots, and the history-conditioned scenes are either absent or blocked. The 15-event sample under-represents the loop, so the dossier looks varied. The full log does not.

### 3.4 Unearned turns

- **Hedwig 1945.01** (`007034`): the largest historical event of the century becomes hiding behind a door and collecting soup. No political danger, no family, no neighbour, no choice. The title “城里的旗子换了颜色” is not in the text.
- **Hedwig 1957.01** (`011090`): the title promises a matchmaking; the text ends “这事就搁在那里.” A non-event can be Chekhovian, but only if the non-event costs something. Here the effect is `cash, relation, mood` and the relation is with two men who are not named in the text.
- **Mitzi 1955.10** (`010287`): she joins Die Fackel and becomes a district contact. No later scene uses the membership. The 1959 ambulance train is a different kind of service; the 1967 ledger is a different kind of resistance.
- **Emil 1937.02** (`004719`): the café owner invites him inside to play by the stove. The scene is a good small kindness, but the `role` and `relation` are never used again.
- **All statistical deaths**: Anton, Emil, Mitzi, Lena. The cause is a demographic label; the life has no last scene.

### 3.5 Missing motivations

The dossier rarely answers “why this person, this choice, now?”:

- Why does Hedwig refuse the fingerprint in 1936? A coworker warns her; there is no prior blacklist, arrest or family experience to make the refusal costly or characteristic.
- Why does Mitzi join Die Fackel in 1955? A folded leaflet and an address. There is no prior political interest, no workplace grievance, no family tradition. The membership is a role effect, not a motive.
- Why does Lena try to open a shop in 1936? The text says a deposit was paid and a lease lacks a signature; there is no prior wish, training or family plan. Her seed wish (“识字，能在印刷厂找到不用把手指送进机器的活”) is not the shop.
- Why does Emil go to the party meeting in 1945? There is no prior union or political scene in his dossier except the first wage. The meeting is a `skill, reputation` effect without a motive.
- Why does Hedwig write to “远方的亲戚” in 1990? The letter has no addressee and no prior estrangement scene.

A motive can be a flag, a knowledge, a relation, a debt, a fear. The Phase 14 chain must seed it early and let the later scene read it. Otherwise the prose supplies a mood, not a reason.

### 3.6 Casting and POV failures

- `005257` invents “玛尔塔” when the cast is Matthias.
- `006127` says “安娜的信” when the cast is Elisabeth Lechner.
- `003882` invents “汉斯” with no relation effect.
- `009022` calls the subject “来者” and never names Mitzi.
- The top nine repeated texts are second-person; the excerpt mostly selects third-person scenes.
- `schedulingAudit` reports **18,925 missing-role blocks** out of 19,141 blocked scenes. The library's intended family/history scenes often cannot cast. The lives default to subject + neighbour/worker scenes because those are the roles that exist.

This is why the Phase 14 chains must declare roles that can actually be cast, and why `sharedHistoryTag` is necessary but not sufficient: it can only return someone who was already in a seed event.

### 3.7 History as weather

The historical texture is often excellent at the object level (doorplate, passport stamp, ration card, six-krone midwife fee) and weak at the causal level. The macro event changes prices and supplies, but not the chain's options. The same person could have the same scenes in 1923, 1934 or 1958 with different nouns. Phase 14 needs at least one branch where the historical context decides who can marry, move, work, inherit or hide.

---

## 4. Whole-life review rubric

### 4.1 What this rubric is for

The event-level 4×10 rubric answers: **is this text a good scene, faithful to its own trace and effects?** The whole-life rubric answers: **is this sequence of committed events a life?**

They are not substitutes. A library can have 15 scenes at 34/40 and a life at 17/30. Hedwig is the proof: three of her sampled scenes scored 34–35/40 in the final Phase 13 critique, but her life has no causal spine, no durable son and no earned ending. The event rubric cannot see that, because each scene is judged in isolation.

### 4.2 The six dimensions (0–5 each; total 30)

| Dimension | 1 — weak | 3 — competent | 5 — literary |
|---|---|---|---|
| **1. Specificity** | Interchangeable stock scenes; names and objects can be swapped without loss; generic second-person or template text. | Several concrete motifs (a trade, a room, an object), but they are decorative and do not change across the life. | A dense, consistent material world: objects, places, procedures and speech recur and acquire new meaning. A reader could identify the person from a page without the name. |
| **2. Causality** | Events are adjacent but not caused; deaths, illnesses and jobs appear from statistical templates; money and roles change without a scene. | Local chains work (illness→treatment→debt; job→wage→rent), but major turns (migration, marriage, death) are unexplained or reset. | Every major turn traces to a prior event or condition; delays and unintended consequences are visible; a reader can reconstruct why this happened to this person now; prose and committed effects agree. |
| **3. Character continuity** | Each scene resets to a generic subject; no memory, no change; skills and flags are labels. | Some traits and skills persist (occupation, literacy, caution), but the person does not reflect on change; early and late scenes could be different people with the same name. | A coherent arc: early experiences shape later choices; the person recognizes or resists the change; the ending reveals what they have become; contradictions are meaningful, not accidental. |
| **4. Relationship continuity** | Cast churn; strangers recast in every scene; key family members disappear; relations are one-scene effects. | Some recurring relations (partner, neighbour, foreman), but the most important intimates — children, parents, lovers — vanish or are replaced without a break. | A durable web: the same people occupy different roles over time (mentor→rival→dependent; lover→spouse→widow); exits and deaths are scenes; `sharedHistoryTag` returns real people, not strangers. |
| **5. Historical texture** | “War / famine / reform” labels; history happens off-page; generic scarcity. | Accurate period detail and some institutional scenes, but the macro event does not change the chain's options; the same scene could be any year. | Macro history and personal history are mutually legible: the same event means different things to different households; dates, prices, documents and gatekeepers are exact; the person's options change because of history. |
| **6. Dramatic shape** | No arc; random events; death is a stop; no setup or payoff. | A few strong turns, but the life lacks overall shape; the ending is not prepared; subplots are abandoned. | A shaped life with setup and payoff, a decisive middle, and an ending that recontextualizes earlier scenes; the horizon ending is explicit and not a fake catastrophe; minor motifs return. |

**0** on any dimension means absent, contradicted or impossible. **2/4** are the intermediate grades. The rubric is not a sum of event scores; do not average the 4×10 scores into it.

### 4.3 Scoring bands

| Score | Reading |
|---:|---|
| 26–30 | Reads as a life. Rare; requires full-log evidence, not a 15-event excerpt. |
| 20–25 | A partial life; strong spine, but at least one major continuity hole. |
| 14–19 | Linked fragments with a spine. The Phase 13 lives sit here. |
| 0–13 | An event sample, not a life. |

The bands are a proposal, not an acceptance threshold. If Phase 14 needs a single gate, use **20/30 plus no dimension below 2** for “a life with repair needed”; **26/30** for “publishable as a life.” Do not use a 15-event excerpt to award 5 on relationship continuity or causality; cap those at 4 and mark the score “sampled.”

### 4.4 Sampled scores for the five Phase 13 lives

These are **sampled-dossier scores** (15 events each), not full-log scores. They illustrate the rubric and the verdict; they are not a library-wide estimate.

| Life | Specificity | Causality | Character | Relationships | Historical texture | Dramatic shape | Total /30 | Reading |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Anton | 4 | 2 | 2 | 1 | 3 | 2 | **14** | Fragments |
| Hedwig | 5 | 2 | 3 | 1 | 4 | 2 | **17** | Fragments with a spine |
| Emil | 4 | 2 | 2 | 1 | 3 | 2 | **14** | Fragments |
| Mitzi | 4 | 2 | 3 | 1 | 4 | 2 | **16** | Fragments |
| Lena | 4 | 3 | 3 | 1 | 4 | 3 | **18** | Closest to a life |

The relationship score is 1 for all five because the dossier's most important intimates vanish or change without a scene. The historical texture scores are the highest because the object-level period detail is genuinely good. The dramatic shape scores are low because the deaths are statistical and the late scenes do not pay off earlier seeds.

### 4.5 How this differs from the event-level 4×10 rubric

| Question | Event rubric (4×10) | Whole-life rubric (6×5) |
|---|---|---|
| Unit | One text and its trace | The whole committed life, including years with no scene |
| Evidence | Sentence, object, mechanism, amount, POV | Cross-event recurrence, `historyRefs`, `followup` firing, relationship casting, state changes, ending |
| Dimensions | Specificity, drama, character/period, causality | Specificity, causality, character continuity, relationship continuity, historical texture, dramatic shape |
| Failure it catches | A scene that hides its cause or invents a person | A life whose scenes are individually good but do not connect |
| Blind spot | Cannot see that a brilliant scene is a dead end | Can forgive a weak sentence if it pays off a chain |
| Pass meaning | 34/40 = a good scene | 26/30 = a life, not a set of scenes |
| Use | Prose/effect hygiene; rewrite decisions | Selection, chain design, acceptance of a life dossier |

The practical rule: **score the event rubric on the text; score the life rubric on the log.** If you only have 15 events, say “sampled” and do not claim a life score.

The event rubric's “character/period” is a single 0–10 score; the life rubric splits it into character continuity and historical texture, because a person can be vividly period-specific in every scene and still have no historical arc or durable relationships. The event rubric's “drama” is local tension; the life rubric's “dramatic shape” is setup, reversal and payoff across decades. The event rubric's “causality” asks whether this scene's effects follow from its own action; the life rubric asks whether this scene follows from a prior one.

### 4.6 What evidence to collect for each dimension

- **Specificity:** list recurring nouns, places, objects and procedures; count returns. At least three meaningful returns (not repetitions) for a 5.
- **Causality:** for every major turn, find the prior event id in `historyRefs` or `causes`; check that the effect amount/role/relation matches. Unexplained death, marriage, move or job = max 2.
- **Character continuity:** list the subject's flags, skills, knowledge and relations at 3–4 points; check that later choices read them. A flag that is set but never read is not continuity.
- **Relationship continuity:** list named intimates and their event spans; count how many appear in more than one life stage. A child or partner with one event = max 2.
- **Historical texture:** for each historical context, identify the gatekeeper, price, document or risk that changed. If the scene could be moved to another year unchanged, max 2.
- **Dramatic shape:** identify the setup, the decisive middle, the reversal and the ending scene. If the ending is `statistical_death/*` with no other participants, max 2.

---

## 5. Twelve Phase 14 chain premises

Each premise is a **seed → state change → later opportunity → possible reversal → echo**. The seed is an event; the later opportunity can be an event or a task. All tags are lowercase snake_case. The conditions use the exact `SceneCondition` / `KernelVariantWhen` shapes from `packages/v4/domain.ts` and `docs/v4/phase-14-authoring.md`. The role declarations use `sharedHistoryTag` only for people who actually shared the seed event; a seed with no second participant cannot return anyone.

**Important:** a `history` tag only matches tags that were actually committed. Phase 13 events carry their own authored scene tags, not the new `r14-*` tags. When a premise continues a Phase 13 event directly, condition on its `actionPrefix` (`r3-mig.residency-registration`, `r2-urban.clinic-residence-paper`, etc.) or its recorded flag, or add a small bridge kernel that re-tags the state. Do not assume the new tag exists on the old event.

The snippets below are pseudo-TypeScript specifications: they show the exact condition, tag and role shape, not a compilable recipe. The recipe checker and a short playtest are the authority.

The twelve are deliberately cross-domain. They are not a complete Phase 14 batch; they are the spine the batches should share.

### Premise 1 — Coal credit → colliery trial → father's debt → ration board

**Domains:** work → family → history. **Seed stage:** childhood, 8–12. **Grounding:** Anton 1921.01 `001018`; the generated `vienna-market-debt.coal-credit` scene already has a `coal-scavenge-station` outcome.

**Seed event:** `r14-work.coal-credit-refused` (event). Roles: `subject`, `father` (`parent`), `coalMerchant` (`worker`, 40–70). The merchant refuses credit because the father's name is on the book; the child scavenges slag and hides the bag from other children.
**State change:** `flag: family_credit_refused`; `relation: father kin, trust -0.10`; `mood -0.08`; `food +1`; `skill.social +0.02`; tags `family_credit_refused`, `child_labour`, `shame`.

```ts
// seed tags
['family_credit_refused', 'child_labour', 'shame']
// consequence (task, adolescence 13–16)
conditions: [
  { kind: 'history', tag: 'family_credit_refused', minCount: 1, withinYears: 5 },
  { kind: 'hasFlag', flag: 'family_credit_refused' },
],
roles: {
  oldCoalMerchant: ['worker', { minAge: 40, maxAge: 75, sharedHistoryTag: 'family_credit_refused' }],
}
// outcomes
took-the-job: employment, cash +3, flag 'works_for_family_creditor'
refused: reputation -0.05, relation_end with oldCoalMerchant, flag 'blacklisted_coalyard'
```

**Later opportunity:** `r14-work.colliery-trial` (task). The same merchant offers a trial shift. The choice is not “job or no job”; it is “work for the man who humiliated my father” or “stay poor but refuse”.
**Possible reversal:** `r14-family.father-death-debt` (event, adulthood 20–35). The father dies of pneumonia (specific cause); the merchant produces the old debt. Branch on `hasFlag works_for_family_creditor`: wages are docked (`cash -4`) but the family keeps the room; branch on `blacklisted_coalyard`: the family loses the room (`move`, `cash -6`). Neither branch is a mood-only outcome.
**Echo:** `r14-history.ration-board` (event, adulthood 35–55; `ctx-vienna-authoritarian-1934` or `ctx-vienna-postwar-1945`). The same merchant sits on a ration board. Condition `{ kind: 'history', tag: 'family_credit_refused', minCount: 1, minYearsAgo: 15 }`; role `oldCoalMerchant` with `sharedHistoryTag: 'family_credit_refused'`. Outcome `remembered-the-boy` (`food +1`, relation) or `denied` (`food -1`, flag `ration_denied`). The childhood shame becomes a historical decision about who eats.

**Why it is a chain, not a scene:** the father is the cause, the merchant is the returning person, the debt is the state, and the ration board makes the private shame public. It also uses an existing generated mechanism (`coal-credit`) rather than inventing a new economy.

### Premise 2 — Wooden horse → pawn ticket → mother's drawer → child's inheritance

**Domains:** family → finance → migration → elderhood. **Seed stage:** childhood, 8–12. **Grounding:** Anton 1922.05 `001119`; the generated `vienna-market-debt.pawn-watch` scene establishes the pawn-ticket mechanism and the second-person prose to avoid.

**Seed event:** `r14-family.name-day-keepsake` (event). Roles: `subject`, `mother` (`parent`, female). The mother gives a carved wooden horse wrapped in newspaper.
**State change:** `flag: keeps_wooden_horse`; `relation: mother kin, trust +0.10, affection +0.10`; `mood +0.08`; tags `keepsake`, `maternal_gift`.

```ts
// seed tags
['keepsake', 'maternal_gift']
// consequence (task, adolescence/adulthood 14–25)
conditions: [
  { kind: 'hasFlag', flag: 'keeps_wooden_horse' },
  { kind: 'cash', max: 8 },
  { kind: 'history', tag: 'keepsake', minCount: 1, withinYears: 10 },
],
// outcomes
pawned: cash +2, flag 'lost_wooden_horse', flag 'pawn_ticket', mood -0.10
// also clear keeps_wooden_horse with a raw flag add:false so the branches are exclusive
kept: food -1, mood +0.05, relation mother +0.05
```

**Later opportunity:** `r14-family.pawn-keepsake` (task). The family needs coal or rent; the horse is the only object with a price. The pawnbroker offers two kroner. The player chooses whether the object or the body eats.
**Possible reversal:** `r14-family.mother-death-drawer` (event, adulthood 25–45). The mother dies of a stroke (specific cause, not “old age”). Branch `hasFlag pawn_ticket`: the ticket is in her drawer; she was saving to redeem it. Branch `hasFlag keeps_wooden_horse`: the horse is in her hand. The branch changes the grief: one is guilt, one is possession. The `death` effect targets `$mother` via `raw`, not `$subject`.
**Echo:** `r14-family.child-gets-horse` (event, elderhood 60+). Condition `{ kind: 'history', tag: 'keepsake', minCount: 1, minYearsAgo: 30 }`; role `child` (see the child-role limitation in Premise 6 and §6.1) or `neighbor` with `sameHousehold: true, minAge: 0, maxAge: 18`. If the horse survived, it is given; if it was pawned, the subject carves a new one (`skill.craft +0.05`, mood). The object's meaning changes from gift to debt to inheritance.

**Candid limitation:** the engine has no item inventory. `keeps_wooden_horse` and `pawn_ticket` are flags; the prose must not contradict them. This is acceptable for a memory token, but a Phase 14 "object chain" standard should require a flag pair (`keeps_X`, `lost_X`) and a `knowledge` proposition for who knows the object's story.

### Premise 3 — Clinic refusal → limp → daughter's care → the same clerk

**Domains:** health → work → family → elderhood. **Seed stage:** adulthood, 18–30. **Grounding:** Mitzi 1931.01 `003069` and 1934.01 `003971`; the condition `untreated_injury` and the flag `denied_clinic_care_for_lack_of_papers` already exist.

**Seed event:** `r14-health.clinic-paper-refusal` (event). Roles: `subject`, `clerk` (`official`), `doctor` (`worker`). The clinic refuses free treatment because the residence paper is wrong; the subject waits until dark and walks home with a swollen ankle.
**State change:** `condition: untreated_injury`; `flag: denied_clinic_care_for_lack_of_papers`; `knowledge: clinic_requires_residence_certificate` (0.9, source clerk); `relation: clerk rival, trust -0.10`; `cash -1`; tags `clinic_refusal`, `untreated_injury`, `residence_paper_trap`.

```ts
// seed tags
['clinic_refusal', 'untreated_injury', 'residence_paper_trap']
// consequence (task, adulthood 19–35)
conditions: [
  { kind: 'history', tag: 'clinic_refusal', minCount: 1, withinYears: 4 },
  { kind: 'hasFlag', flag: 'denied_clinic_care_for_lack_of_papers' },
  { kind: 'health', max: 0.75 },
],
// outcomes
hid-the-limp: cash +1, health -0.03, flag 'hidden_injury'
asked-for-light-duty: reputation -0.05, relation foreman +0.05, flag 'light_duty'
```

**Later opportunity:** `r14-work.limping-shift` (task). The foreman notices the limp. The subject can hide it (keep the wage, worsen the body) or ask for light duty (lose reputation, keep the job).
**Possible reversal:** `r14-health.chronic-wound` (event, adulthood 30–50). Condition `{ kind: 'history', tag: 'clinic_refusal', minCount: 1, minYearsAgo: 3 }`. Branch `hasFlag hidden_injury`: the wound abscesses, `condition chronic_limp`, `health -0.12`, `cash -6`; branch `hasFlag light_duty`: the job is kept but the wage is cut (`cash -2`), and the foreman's protection has a price. Neither is a mood-only complication.
**Echo:** `r14-elder.same-clerk` (event, elderhood 55+). Condition `{ kind: 'history', tag: 'clinic_refusal', minCount: 1, minYearsAgo: 20 }`; role `oldClerk: ['official', { minAge: 60, maxAge: 85, sharedHistoryTag: 'clinic_refusal' }]`. The clerk is now a patient in the same corridor. Outcome `helped` (mood, relation) or `refused` (mood, flag `denied_old_clerk`). The moral reversal is earned by the 30-year delay, not by a coincidence.

**Why it is a chain:** the clinic scene already records the exact state; the later scenes read it. The daughter's care branch (optional) uses `relationHistory` and a same-household child, and makes the untreated injury a family cost, not only a personal one.

### Premise 4 — Passport name error → shop deposit → bribe → child registration

**Domains:** migration → work → family → history. **Seed stage:** adulthood, 18–30. **Grounding:** Lena 1930.11 `002766` and 1936.01 `004525`; Hedwig 1931.02 `003064`.

**Seed event:** `r14-mig.passport-name-mismatch` (event). Roles: `subject`, `clerk` (`official`), `partner`. The birth register has one letter different from the application; the passport is refused after the subject has already quit the job and given up the room.
**State change:** `unemployment`; `cash -12`; `move` back to Leopoldstadt; `flag: passport_refused`; `flag: name_discrepancy`; `knowledge: name_discrepancy_blocks_passport` (0.9, clerk); `relation: clerk rival, trust -0.10`; tags `passport_refused`, `name_discrepancy`, `passport_paper_trap`.

```ts
// seed tags
['passport_refused', 'name_discrepancy', 'passport_paper_trap']
// consequence (task, adulthood 22–40)
conditions: [
  { kind: 'hasFlag', flag: 'passport_refused' },
  { kind: 'history', tag: 'passport_refused', minCount: 1, minYearsAgo: 2 },
  { kind: 'cash', min: 20 },
],
// outcomes
paid-deposit: cash -18, flag 'shop_deposit_paid', relation landlord
walked-away: mood -0.05, relation landlord -0.05
```

**Later opportunity:** `r14-work.shop-licence` (task). A landlord offers a lease; the licence office asks for the same residence paper that failed before. The deposit is real money; the failure is a real loss.
**Possible reversal:** `r14-mig.name-fix` (event, adulthood 25–45). Condition `hasFlag shop_deposit_paid` and `knowledge propositionIncludes: 'name'`. The old clerk offers to fix the record for six kroner. Branch `paid-bribe`: `cash -6`, `flag name_fixed`, `flag complicit_clerk`; branch `refused`: `flag blacklisted_office`, `unemployment`. If `complicit_clerk`, a later `r14-civic.investigation` can call the subject as a witness; `testified` vs `kept-silent` changes the family's standing.
**Echo:** `r14-family.child-registration` (event, adulthood 30–45). Condition `{ kind: 'history', tag: 'passport_refused', minCount: 1, minYearsAgo: 10 }`; role `oldClerk` with `sharedHistoryTag: 'passport_refused'`. A child needs a birth certificate; the old discrepancy resurfaces. Branch `lied`: `flag false_papers`; branch `told-truth`: `cash -4`, relation. The paper trail now spans a generation.

**Historical branch:** under `ctx-vienna-authoritarian-1934`, the clerk demands a political clearance; under `ctx-vienna-postwar-1945`, the office is purged and the old clerk is gone. The same kernel should produce different gatekeepers through `contexts`/`milieus` and a `when.history` branch, not through a different scene.

### Premise 5 — Concert ticket → reply or refusal → friend's betrayal → the old ticket

**Domains:** courtship → friendship → marriage → elderhood. **Seed stage:** adulthood, 20–30. **Grounding:** Lena 1937.10 `004708`; the ticket, the note and the tin box are already a complete seed.

**Seed event:** `r14-family.concert-ticket` (event). Roles: `subject`, `friend` (`neighbor`), `intended` (`neighbor`, opposite sex, 20–35). The subject sends a concert ticket through a friend; the note asks for nothing.
**State change:** `cash -1.2`; `relation: friend friend, trust +0.05`; `relation: intended acquaintance, trust +0.10`; `flag: waiting_for_reply`; `knowledge: ticket_sent` (0.8); tags `courtship`, `unanswered_ticket`, `friend_intercession`.

```ts
// seed tags
['courtship', 'unanswered_ticket', 'friend_intercession']
// consequence (event, adulthood 21–32)
conditions: [
  { kind: 'hasFlag', flag: 'waiting_for_reply' },
  { kind: 'history', tag: 'courtship', minCount: 1, withinYears: 2 },
],
// outcomes
accepted: relation partner, flag 'married_after_ticket'
// household merge only if a concrete household effect is available; otherwise
// the couple lives separately and the flag records the marriage.
refused: relation_end, mood -0.10, flag 'courtship_closed'
```

**Later opportunity:** `r14-family.reply-at-market` (event). The intended returns to the market; the friend is also there. The reply can be acceptance, refusal, or a confession that the friend intercepted the note.
**Possible reversal:** `r14-family.friend-confession` (event, adulthood 30–45). Condition `{ kind: 'history', tag: 'courtship', minCount: 1, minYearsAgo: 5 }`; role `oldFriend: ['neighbor', { minAge: 30, maxAge: 60, sharedHistoryTag: 'courtship' }]`. Branch `forgave`: relation trust +0.10, mood; branch `cut-off`: relation_end, `flag betrayal`. If `betrayal`, the elder echo changes from nostalgia to a closed book.
**Echo:** `r14-elder.old-ticket` (event, elderhood 60+). Condition `{ kind: 'history', tag: 'courtship', minCount: 1, minYearsAgo: 30 }`; role `oldFriend` with `sharedHistoryTag: 'courtship'`. If `married_after_ticket`, the spouse is dead and the ticket is in a prayer book; if `courtship_closed`, the intended is a stranger at the market; if `betrayal`, the friend confesses again and the subject decides whether to burn the stub. The object carries the whole life.

**Why it is a chain:** it turns a beautiful unearned turn into a 40-year relationship. The friend is not a plot device; she is the person who carried the note, and she returns with the cost of having carried it.

### Premise 6 — Daughter born → sent to a sister → daughter leaves → the empty room

**Domains:** family → migration → elderhood. **Seed stage:** adulthood, 25–40. **Grounding:** Mitzi 1940.01 `005560` and 1951.01 `009022`; Hedwig 1990.12 `026198`; Lena 1946.01 `007320`.

**Seed event:** `r14-family.daughter-born` (event). Roles: `subject`, `partner` (male), `midwife`. The daughter is born at home; the midwife is paid six kroner.
**State change:** `birth` (female); `health -0.06`; `cash -6`; `relation: midwife acquaintance`; `flag: has_infant`; tags `child_birth`, `daughter`, `maternal_debt`.

```ts
// seed tags
['child_birth', 'daughter', 'maternal_debt']
// consequence (task, adulthood 27–42)
conditions: [
  { kind: 'history', tag: 'child_birth', minCount: 1, withinYears: 5 },
  { kind: 'cash', max: 10 },
  { kind: 'hasRelation', relationKind: 'partner' },
],
// workaround role (no child role in the current engine)
child: ['neighbor', { minAge: 0, maxAge: 10, sameHousehold: true }],
// outcomes
sent: mood -0.05, relation sister +0.10, flag 'child_sent_away'
kept: cash -2, health -0.03
```

**Later opportunity:** `r14-family.send-child-to-sister` (task). The mother sends the child across the Danube for a month because she cannot work and care at the same time. The child returns with a white stone from the river and does not call her “mother” at the door.
**Possible reversal:** `r14-mig.daughter-leaves` (event, adulthood 45–60). Condition `{ kind: 'history', tag: 'child_birth', minCount: 1, minYearsAgo: 15 }`, `hasFlag child_sent_away`, and `{ kind: 'relationHistory', relationKind: 'kin', minSharedEvents: 1, minYears: 10 }`. The daughter leaves for a job in another city. Branch `blessed`: relation, `flag daughter_gone`; branch `stopped`: relation_end, mood -0.10. The mother's choice in the first scene is repaid in the second.
**Echo:** `r14-elder.empty-room` (event, elderhood 65+). Condition `{ kind: 'history', tag: 'child_birth', minCount: 1, minYearsAgo: 30 }` and `hasFlag daughter_gone`; role `child` or `oldFriend`. The mother keeps the room; a letter arrives or does not. This is the chain Hedwig's 1990 letter deserves.

**Candid limitation:** the current role vocabulary has no `child` kind. `birth` creates a child and a `kin` relation with `sharedEventIds: [birthEvent]`, but the child is not a participant in the birth event, so `sharedHistoryTag: 'child_birth'` cannot cast the child. The workaround is `neighbor` with `sameHousehold: true` plus `relationHistory` (`relationKind: 'kin'`, `minSharedEvents: 1`, `minYears: 10`). It can cast a child in the household, but not guaranteed the named daughter. **This is the largest content-mechanism blocker in Phase 14.** Add a `child`/`descendant` role and a `hasChild`/`parentOf` condition before relying on this chain.

### Premise 7 — Shop lease → first customer → eviction → inheritance dispute

**Domains:** work → family → law. **Seed stage:** adulthood, 25–45. **Grounding:** Lena 1936.01 `004525`; `r13-turn.starting-business` (`signed-the-lease`); the generated `vienna-housing-move.rent-notice` and `vienna-market-debt` scenes establish the rent/debt pressure.

**Seed event:** `r14-work.shop-lease` (event). Roles: `subject`, `landlord`, `spouse`. The subject pays eighteen kroner deposit and signs a lease for a small shop.
**State change:** `cash -18`; `flag: shop_lease`; `role: shopkeeper`; `relation: landlord acquaintance, trust +0.05`; tags `shop_lease`, `business_risk`, `family_money`.

```ts
// seed tags
['shop_lease', 'business_risk', 'family_money']
// follow-up (task, +6 months)
followup: { sceneId: 'r14-work.first-customer', delayMonths: 6 }
conditions: [{ kind: 'hasFlag', flag: 'shop_lease' }]
// outcomes
paid: cash +3, reputation +0.05, relation customer
credit: flag 'customer_debt', relation customer +0.05
// reversal conditions
{ kind: 'history', tag: 'shop_lease', minCount: 1, minYearsAgo: 2 }
// echo conditions
{ kind: 'history', tag: 'business_failure', minCount: 1, minYearsAgo: 20 }
```

**Later opportunity:** `r14-work.first-customer` (task, `baseRate: 0`). The first customer pays cash or asks for credit. The choice establishes whether the shop is a business or a favour network.
**Possible reversal:** `r14-work.eviction-notice` (event, adulthood 30–50). Condition `{ kind: 'history', tag: 'shop_lease', minCount: 1, minYearsAgo: 2 }` and `cash max: 5`. The landlord raises the rent. Branch `paid`: `cash -6`; branch `refused`: `unemployment`, `move`, `flag business_failure`, relation_end landlord. The shop fails for a reason the reader has seen (credit, rent, family draw), not for a randomizer.
**Echo:** `r14-family.inheritance-dispute` (event, elderhood 55+). Condition `{ kind: 'history', tag: 'business_failure', minCount: 1, minYearsAgo: 20 }`; role `oldLandlord: ['neighbor', { minAge: 50, maxAge: 85, sharedHistoryTag: 'shop_lease' }]`. The old lease or stock is contested. Branch `settled`: cash +, relation; branch `court`: cash -4, `flag estate_dispute`, knowledge. The shop's paper outlives the shop. If the landlord is dead, do not recast an heir via `sharedHistoryTag`; use a separate kernel gated on a `kin`/`relationHistory` condition or add a descendant role (see the child limitation in Premise 6 / §6.1).

**Why it is a chain:** it uses the existing shop/lease mechanism, makes the first customer a real choice, and lets the failure return as a family legal dispute. It also gives Lena's 1936 paper boat a later meaning: the goods list becomes evidence.

### Premise 8 — Union card → strike → blacklist → conscription and return

**Domains:** work → politics → war → family. **Seed stage:** adulthood, 18–30. **Grounding:** Lena 1928.01 `002280`; Hedwig 1936.03 `004465`; Mitzi 1955.10 `010287`; the blocked `vienna-life-wwii-conscription` (81 blocks) and the `blacklist`/`strike` mechanisms already in the library.

**Seed event:** `r14-work.union-card` (event). Roles: `subject`, `delegate` (`union_member`), `foreman` (`worker`). The subject pays one krone dues and receives a card.
**State change:** `role: union_member`; `cash -1`; `relation: delegate acquaintance, trust +0.10`; `knowledge: union_dues` (0.8); `flag: union_card`; tags `union_card`, `solidarity`.

```ts
// seed tags
['union_card', 'solidarity']
// consequence (task, adulthood 22–40)
conditions: [
  { kind: 'hasRole', role: 'union_member' },
  { kind: 'history', tag: 'union_card', minCount: 1, withinYears: 10 },
],
// outcomes
voted-strike: flag 'strike_participation', reputation +0.05, relation delegate +0.10
voted-no: flag 'stayed_out', relation delegate -0.05
```

**Later opportunity:** `r14-work.strike-vote` (task). The union votes on a strike. The subject can vote yes (solidarity, risk) or no (family wage, shame). The delegate remembers. Make sure the delegate is cast in this scene, not only in the card scene, so the later `sharedHistoryTag: 'strike_participation'` has a real person to return.
**Possible reversal:** `r14-work.blacklist` (event, adulthood 25–45). Condition `{ kind: 'history', tag: 'strike_participation', minCount: 1, withinYears: 3 }`. The foreman blacklists the subject. Branch `apologized`: reputation -0.10, `flag blacklisted`, cash -2; branch `refused`: `unemployment`, relation_end foreman, `flag blacklisted`. The blacklist is a state, not a mood.
**Echo:** `r14-war.conscription` (event, war years). Condition `hasFlag blacklisted` and `{ kind: 'history', tag: 'strike_participation', minCount: 1, minYearsAgo: 2 }`; role `oldDelegate: ['union_member', { minAge: 40, maxAge: 75, sharedHistoryTag: 'strike_participation' }]`. The blacklisted man is drafted anyway; the union card is in his pocket. Branch `served`: role `soldier`, `flag war_service`; branch `evaded`: `flag draft_evader`, reputation -0.10. A later `r14-war.return` uses `sharedHistoryTag: 'war_service'` with a comrade; the old delegate is dead or purged. The political choice of the 1930s becomes the war of 1939–45.

**Historical branch:** under `ctx-vienna-authoritarian-1934`, the strike is illegal and the union card is evidence; under `ctx-vienna-postwar-1945`, the strike is legal but the party purges the old delegates. The same chain should produce different gatekeepers and different risks.

### Premise 9 — Residence registration → rent arrears → eviction → hiding a family

**Domains:** housing → migration → war. **Seed stage:** adulthood, 18–30. **Grounding:** Hedwig 1931.02 `003064`; the global `vienna-housing-move.rent-notice` repeats (162/157); Hedwig 1945.01 `007034`.

**Seed event:** `r14-mig.residence-registration` (event). Roles: `subject`, `clerk` (`official`), `landlady` (`neighbor`). The subject pays five kroner registration and one krone for the blue doorplate; the landlady says the nails are extra. If this is chained directly from Hedwig 1931.02, reuse its recorded `condition: registered_address` and `flag: paid_registration_and_doorplate_fee` instead of inventing a parallel flag.
**State change:** `cash -6`; `condition: registered_address`; `flag: paid_registration_and_doorplate_fee`; `relation: landlady acquaintance, trust +0.05`; `knowledge: police_check_doorplate` (0.8); tags `residence_registration`, `housing_paper`.

```ts
// seed tags
['residence_registration', 'housing_paper']
// consequence (task, adulthood 22–40)
conditions: [
  { kind: 'hasFlag', flag: 'paid_registration_and_doorplate_fee' },
  { kind: 'history', tag: 'residence_registration', minCount: 1, withinYears: 8 },
],
// outcomes
paid: cash -3
refused: flag 'rent_arrears', relation landlady -0.10
```

**Later opportunity:** `r14-housing.rent-increase` (task). The landlord raises the rent; the registration paper is the only proof of tenancy.
**Possible reversal:** `r14-housing.eviction` (event, adulthood 25–45). Condition `{ kind: 'history', tag: 'rent_arrears', minCount: 1, minYearsAgo: 1 }`. Branch `moved`: `move`, `cash -4`; branch `hid`: `flag hidden_tenant`, `overcrowded` condition, mood -0.10. The doorplate becomes a liability: the police know the name on it.
**Echo:** `r14-war.hide-family` (event, war years; `ctx-vienna-authoritarian-1934`). Condition `hasFlag hidden_tenant` and `{ kind: 'history', tag: 'residence_registration', minCount: 1, minYearsAgo: 10 }`; role `oldLandlady: ['neighbor', { minAge: 50, maxAge: 80, sharedHistoryTag: 'residence_registration' }]`. The subject can hide a family behind the registered door or report them. Branch `hid-them`: `food -1`, relation, `flag hid_family`; branch `reported`: relation_end, `flag denounced`, reputation +0.10. The blue plate from 1931 is now a life-or-death object.

**Why it is a chain:** it connects the bureaucratic registration to the housing crisis and the war, using a person (the landlady) and an object (the doorplate) that already exist. It also gives the 1945 liberation scene a concrete alternative: hiding a family, not collecting soup.

### Premise 10 — Apprenticeship trial → master piece → tool theft → take an apprentice

**Domains:** education → work → family → legacy. **Seed stage:** adolescence, 13–16. **Grounding:** Hedwig 1927.01 `002103` (`trial-promised`); Mitzi 1925.01 `001634` (`apprenticeship-rejected`); the `r13-edu` and `r13-work` task layers.

**Seed event:** `r14-edu.apprenticeship-trial` (event). Roles: `subject`, `master` (`worker`, 30–60), `parent`. The master offers a half-day trial, no wage, one meal.
**State change:** `flag: trial_promised`; `relation: master colleague, trust +0.10`; `skill.craft +0.10`; `mood +0.05`; tags `apprenticeship`, `mentorship`, `craft_tool`.

```ts
// seed tags
['apprenticeship', 'mentorship', 'craft_tool']
// consequence (task, adulthood 17–25)
conditions: [
  { kind: 'history', tag: 'apprenticeship', minCount: 1, withinYears: 5 },
  { kind: 'skill', skill: 'craft', min: 0.30 },
],
// outcomes
passed: employment, role 'journeyman', cash +2, flag 'master_piece'
failed: mood -0.10, skill.craft +0.05, flag 'failed_piece'
```

**Later opportunity:** `r14-work.first-journeyman-piece` (task). The subject must make a piece to be accepted as a journeyman. The master judges it. The skill is real, not a label.
**Possible reversal:** `r14-work.tool-theft` (event, adulthood 20–35). Condition `{ kind: 'history', tag: 'apprenticeship', minCount: 1 }` and `{ kind: 'hasRelation', relationKind: 'colleague', minTrust: 0.10 }`. A tool is stolen from the workshop. Branch `returned`: relation trust +0.10; branch `blamed`: reputation -0.10, relation_end master, `flag false_accusation`. The apprenticeship's trust is tested by a concrete loss.
**Echo:** `r14-edu.take-apprentice` (event, adulthood 40–60). Condition `{ kind: 'history', tag: 'apprenticeship', minCount: 1, minYearsAgo: 20 }` and `{ kind: 'skill', skill: 'craft', min: 0.60 }`; role `oldMaster: ['worker', { minAge: 60, maxAge: 85, sharedHistoryTag: 'apprenticeship' }]`. The subject becomes the master; the old master recommends a child from the neighbourhood. Branch `took-one`: relation, role `master`, `flag repaid_craft`; branch `refused`: mood, `flag closed_shop`. The craft cycle closes.

**Why it is a chain:** it makes skill, mentorship and reputation into a 40-year arc. It also gives the 1927 trial-promised scene a consequence: the trial either becomes a trade or becomes a memory of exclusion.

### Premise 11 — Conscription → letter or comrade death → return → pension

**Domains:** war → family → memory. **Seed stage:** adulthood, 20–35. **Grounding:** the Phase 13 critique found no direct combat or mobilization in the 75 excerpts; `vienna-life-wwii-conscription` was blocked 81 times; the library has `batch3-war-front` and `major-crisis` mechanisms.

**Seed event:** `r14-war.conscription` (event, war context). Roles: `subject`, `comrade` (`worker`, 18–40), `partner` (`partner` or `neighbor`, 18–40, optional). The subject is drafted; the send-off is a paperwork scene, not a battle.
**State change:** `role: soldier`; `health -0.05`; `flag: war_service`; `relation: comrade friend, trust +0.10`; tags `war_service`, `comrade`, `separation`. If the world has a front place, use `move`; otherwise represent service with the role/flag and no invented place id.
**Later opportunity:** `r14-war.trench-letter` (task). The subject writes a letter home or receives one. Branch `sent`: relation, `flag letter_sent`; branch `lost`: mood -0.10, `flag letter_lost`. The letter is the only object that crosses the war.
**Possible reversal:** `r14-war.comrade-death` (event). Condition `{ kind: 'history', tag: 'war_service', minCount: 1 }`; role `comrade: ['worker', { minAge: 18, maxAge: 40, sharedHistoryTag: 'war_service' }]`. Branch `carried-body`: health -0.10, relation, `flag carried_comrade`; branch `fled`: reputation -0.10, `flag deserted`. The comrade is a person the reader has met, not a statistic. The death cause must be specific (“killed by a shell”, “died of wounds”), not “war”.
**Echo:** `r14-family.return-home` (event, postwar). Condition `{ kind: 'history', tag: 'war_service', minCount: 1, minYearsAgo: 2 }`; role `survivingComrade: ['worker', { minAge: 25, maxAge: 50, sharedHistoryTag: 'war_service' }]`. The soldier returns to a household that has changed; the letter is found in a coat; the comrade is dead or changed. Branch `reunited`: relation, mood; branch `estranged`: mood, `flag war_ghost`. The war is not a weather event; it is a set of specific absences. If no surviving comrade exists, use a family member or a solo variant; `sharedHistoryTag` must never materialize a stranger to fill the role.

**Why it is a chain:** it fills the largest content gap in Phase 13 and gives the historical texture a body. It also uses the Bierce/Vonnegut register correctly: the absurdity is in the paperwork and the survival, not in a generic “war is hell” paragraph.

### Premise 12 — Late letter → reply or silence → deathbed → funeral archive

**Domains:** elderhood → family → memory. **Seed stage:** elderhood, 65+. **Grounding:** Hedwig 1990.12 `026198`; Mitzi 1972.02 `017024`; the four statistical deaths of Anton, Emil, Mitzi and Lena; Hedwig is alive at the 2000 horizon.

**Seed event:** `r14-elder.letter-to-kin` (event). Roles: `subject`, `kin` (`neighbor` same household or `sibling`), `oldFriend` (`neighbor`, 65–90). The subject writes a letter and adds “不必回信.”
**State change:** `flag: letter_written`; `knowledge: family_address` (0.8); `mood -0.05`; `cash -0.1`; tags `late_letter`, `estrangement`, `keepsake`.

```ts
// seed tags
['late_letter', 'estrangement', 'keepsake']
// follow-up (event, +6–12 months)
followup: { sceneId: 'r14-elder.reply-or-silence', delayMonths: 9 }
conditions: [{ kind: 'hasFlag', flag: 'letter_written' }]
// outcomes
reply: relation, mood +0.10, flag 'reconciled'
silence: mood -0.10, flag 'unanswered'
```

**Later opportunity:** `r14-elder.reply-or-silence` (event, `baseRate: 0`). A reply arrives, or it does not. The reply is not a generic “letter from a relative”; it names the addressee chosen in the seed (`{kin}` or `{oldFriend}`).
**Possible reversal:** `r14-elder.deathbed` (event, elderhood 75+). Condition `{ kind: 'history', tag: 'late_letter', minCount: 1, minYearsAgo: 2 }` and `{ kind: 'health', max: 0.5 }`. Branch `hasFlag reconciled`: the child/friend arrives, relation, estate; branch `hasFlag unanswered`: the subject is alone, `flag died_alone`. The death is a scene with a person in it, not a statistical closure. The existing `statistical_death` supplies the specific cause (pneumonia, heart failure, etc.); the composed scene supplies the farewell.
**Echo:** `r14-elder.plan-funeral` (event, before death). Condition `{ kind: 'history', tag: 'late_letter', minCount: 1, minYearsAgo: 1 }`; role `oldFriend` with `sharedHistoryTag: 'late_letter'`. The subject chooses whether to be buried with the letter, whether to burn the letters, or whether to leave them to the child. The actual funeral is projected from the estate/journal, not simulated as the subject's post-death event.

**Why it is a chain:** it turns the best late scene into a decision with a reply, a deathbed and an archive. It also respects the engine's no-post-death-subject rule: the last scene is before death; the funeral is a projection.

### 5.1 Chain coverage map

| # | Chain | Seed stage | Domains | Returning person/role | Primary history tag |
|---|---|---|---|---|---|
| 1 | Coal credit → colliery → father's debt → ration board | childhood | work/family/history | `oldCoalMerchant` (`worker`) | `family_credit_refused` |
| 2 | Wooden horse → pawn → mother's drawer → child | childhood | family/finance/elder | `mother` / `child` | `keepsake` |
| 3 | Clinic refusal → limp → daughter → same clerk | adulthood | health/work/family | `oldClerk` (`official`) | `clinic_refusal` |
| 4 | Passport name → shop → bribe → child registration | adulthood | migration/work/family | `oldClerk` (`official`) | `passport_refused` |
| 5 | Concert ticket → reply → betrayal → old ticket | adulthood | courtship/friendship/elder | `oldFriend` (`neighbor`) | `courtship` |
| 6 | Daughter born → sent away → leaves → empty room | adulthood | family/migration/elder | `child` (blocked) | `child_birth` |
| 7 | Shop lease → customer → eviction → inheritance | adulthood | work/family/law | `oldLandlord` (`neighbor`) | `shop_lease` |
| 8 | Union card → strike → blacklist → conscription | adulthood | work/politics/war | `oldDelegate` (`union_member`) | `strike_participation` |
| 9 | Registration → arrears → eviction → hiding | adulthood | housing/migration/war | `oldLandlady` (`neighbor`) | `residence_registration` |
| 10 | Apprenticeship → master piece → theft → apprentice | adolescence | education/work/legacy | `oldMaster` (`worker`) | `apprenticeship` |
| 11 | Conscription → letter/death → return → pension | adulthood | war/family/memory | `survivingComrade` (`worker`) | `war_service` |
| 12 | Late letter → reply/silence → deathbed → archive | elderhood | elder/family/memory | `oldFriend` (`neighbor`) | `late_letter` |

### 5.2 Suggested batch placement

The six `batch14-*` files are not a partition of the twelve chains; a chain can span two files if the tag/role contract is identical. This is the least-bad split for the current scaffold:

| Batch file | Primary premises | Why |
|---|---|---|
| `batch14-career-chains.ts` | 1, 7, 8, 10 | coal/credit, shop lease, union card, apprenticeship |
| `batch14-education-chains.ts` | 10 (seed + master piece) | craft skill, exam/credential, apprenticeship |
| `batch14-family-chains.ts` | 2, 5, 6, 12 | keepsake, courtship, daughter, late letter |
| `batch14-history-consequences.ts` | 4, 9, 11; echoes for 1, 3, 8 | passport, housing, war, ration board, same clerk, blacklist |
| `batch14-social-echoes.ts` | 3, 5, 8, 9 | returning clerk, friend, delegate, landlady |
| `batch14-special-lives.ts` | 6, 11, 12 | child/parent chain, conscription, deathbed |

A chain's seed and echo should normally live in different files only if the echo re-declares the same tag and role. If the seed is in `career` and the echo in `history-consequences`, the tag string and `sharedHistoryTag` role key must be copied exactly; a typo silently kills the chain.

### 5.3 Chain acceptance checklist (for the batch authors)

A batch is not “Phase 14 complete” because it hits the 60% history / 40% follow-up quotas. Each chain should pass these checks:

1. **Specific tag.** The history key is a lowercase snake_case phrase that describes what happened, not a domain (`family_credit_refused`, not `family`).
2. **A real seed.** The seed changes a durable state: a role, relation, flag, knowledge, condition, cash/debt, move or household — not only mood.
3. **A returning person.** At least one later scene uses `sharedHistoryTag` on a role that was present in the seed; if the seed has no second participant, add one or do not claim a relationship echo.
4. **A readable state.** The later scene's text names the prior event/object/person, and the effects match the state. A `flag` that is set but never read is not continuity.
5. **A possible failure.** At least one outcome leaves a durable negative state (debt, blacklist, lost object, relation_end, condition, unemployment), not just `mood -0.1`.
6. **A historical branch.** At least one chain scene changes with `ctx-*`, `worldYear`, `historicalProcess` or `region`; the same scene must not be year-agnostic.
7. **A follow-up target with `baseRate: 0`.** A consequence that also fires at rate 1 on its own is not a consequence; it is ambient noise.
8. **A bounded delay.** Short consequences use `followup` (≤ 3 steps, ≤ 5 years); long echoes use `history` with `minYearsAgo` (10–30), never a 30-year queued event.
9. **No stranger payoff.** The emotional climax cannot be carried by a materialized stranger; use a person the subject already knows, or make the stranger's introduction a seed.
10. **An ending state.** The chain must be able to end in a scene (reconciliation, refusal, deathbed, funeral plan), not only in a statistical death.

---

## 6. The five most important literary fixes, in priority order

### Fix 1 — Make the life, not the year, the scheduling unit

**Evidence.** Hedwig's full log has 19 `mother-falls`; Emil's has 13 `laundry-help`; Mitzi's has 11. The global top repeated text is the pawn-watch scene, 92 times; the coal-credit scene, 81; the landlord rent scene, 80; the table-debt scene, 74. The 15-event excerpts hide these loops. A Phase 14 chain cannot survive if the base pool gives the same generic scene the slot every year.

**What to do.**
- Add per-person caps/cooldowns to generic base scenes (`cooldownYears` on the recipe; a `history` condition with `maxCount` on the scene's own tag for a hard cap).
- Prefer a history-conditioned scene over a generic scene when both are eligible. A chain consequence should outrank ambient laundry.
- Give every repeatable family/illness/neighbour scene a second, history-conditioned variant so the second occurrence is not the same text. Example: `mother-falls` first time is a fall; second time (condition `history tag mother_fall minCount: 1`) is a chronic condition with a different cost; third time is blocked by `maxCount: 2`.
- Audit per-person top scene prefixes, not only global text reuse. The `focalLives.topActionPrefixes` field is the right instrument.

**Why first.** This is the highest-leverage fix because it changes what the player actually reads across 88 years. Without it, Phase 14 will add twelve beautiful chains and the base pool will still fill the life with 19 mother-falls and 13 laundry-help scenes.

### Fix 2 — Cast and keep the intimates

**Evidence.** The dossier's most important people vanish: Friedrich 2 (1942), Rosa Winter (1940), Franz Bauer (1932), Grete 2 (1946), Alois Stein (1937), Hermann Winter (1940). Emil's story moves from Lena (1932) to Marta (1939) to Anna (1942) with no transition. `schedulingAudit` reports 18,925 `missing_role` blocks out of 19,141 blocked scenes. The current role vocabulary has no `child` kind; a birth creates a person and a `kin` relation, but later scenes cannot reliably cast that child.

**What to do.**
- Add a `child`/`descendant` role kind and a `hasChild` or `parentOf` condition, or a `relationHistory` + same-household workaround with a clear audit label.
- Use `sharedHistoryTag` for partners, mentors, foremen, comrades and old friends; never recast a stranger for an emotional payoff.
- Require at least one family echo per decade in a life: a child, parent, sibling or partner returns with a changed role.
- Treat a birth as a relationship seed, not a demographic event: the birth scene must set a flag or relation that a later scene reads. `birth` alone is not continuity.
- Fix the cast discipline: no hardcoded names outside the declared roles; no “来者” for the subject; no “玛尔塔” when the cast is Matthias.

**Why second.** A life is mostly the people in it. If the son, daughter, lover and mentor disappear, the reader cannot experience character continuity or relationship continuity, no matter how good the prose is.

### Fix 3 — Pay off the seed: follow-ups, echoes and objects

**Evidence.** The wooden horse, the blue doorplate, the concert ticket, the passport refusal, the shop deposit and the clinic refusal all set durable state and never read it. The Phase 14 contract's 40% follow-up / 60% history quotas are necessary but not sufficient: a batch can meet them with weak links that never return.

**What to do.**
- Every seed with `significance >= 0.7` must schedule at least one consequence (`followup`) or one standalone echo (`history` + `sharedHistoryTag`).
- Every object seed must define a flag pair (`keeps_X` / `lost_X`) and a later scene that reads one of them. The prose must not assert an object state the flags cannot support.
- Every institution seed must leave a document, debt, role, knowledge or membership that a later scene can name. A doorplate is not a mood; it is a police check waiting to happen.
- Add a chain-level test: at least one seed→consequence→echo triplet per batch, with a returning role and a failure branch. Check that the echo actually fires in a short playtest, not just that it compiles.
- Do not use a follow-up target that also has a high `baseRate`; set it to 0 or near 0 so it is a consequence, not ambient noise.

**Why third.** This is the difference between a scene and a story. The library already writes good seeds; it does not yet pay them off.

### Fix 4 — Make history differential and institutional

**Evidence.** Hedwig 1945.01 is hiding behind a door and collecting soup. Lena 1948.01 is a statistical famine death. Mitzi 1955.10 joins a party, and the dossier never shows her acting on the membership again. The 1930 passport refusal and the 1936 shop licence are adjacent but not causally linked. The historical texture is strong in objects and weak in options.

**What to do.**
- Every chain gets at least one historical branch: `ctx-vienna-authoritarian-1934`, `ctx-vienna-postwar-1945`, `ctx-vienna-late-1990`, or a `historicalProcess` condition.
- The same kernel under different contexts must change the gatekeeper, price, document, risk or permitted relation. A strike is illegal in 1934 and legal but purged in 1945; a passport is a police instrument in 1930 and a displaced-persons paper in 1945; a shop lease is a licence in 1936 and an empty shop in 1952.
- Use `worldYear`, `region`, `historicalProcess`, `milieus` and `contexts` in the conditions, not only in the prose.
- Do not use “war” as a mood. Use conscription, ration cards, requisition, blackout, evacuation, denunciation, missing men, changed borders. Bierce/Vonnegut are useful only when the absurdity is attached to a specific procedure.

**Why fourth.** History is the difference between a private soap opera and a life in a world. The current library has the objects; it needs the causal differentials.

### Fix 5 — Earn the ending

**Evidence.** Anton, Emil, Mitzi and Lena all end in `statistical_death/*` with no other participants. Hedwig's 1990 letter is the best ending image and has no addressee. The deaths are causes, not scenes.

**What to do.**
- Require a composed last scene before/with death: a deathbed, a farewell, a funeral plan, a letter, a final visit. The scene casts a survivor or carer, references an earlier flag/object, and closes or refuses a chain.
- Keep `statistical_death` as the demographic cause, but do not let it be the only event. The player should see the life end, not just the record stop.
- Branch the ending on the chain state: `reconciled` vs `unanswered`, `keeps_wooden_horse` vs `lost_wooden_horse`, `blacklisted` vs `works_for_family_creditor`. The ending should recontextualize the seed.
- For the 2000 horizon, make the ending explicit: the person is alive, the world stops, and the text says so. Do not fake a catastrophe or a death.
- Apply the POV gate to the ending: name the subject; no second-person “你” in the final scene.

**Why fifth.** Endings are where a life becomes legible. The current deaths are honest demographic events but literary non-events. A good ending can retroactively make a chain; a statistical death makes even a good chain look like a sample.

### 6.1 What the library cannot yet do (candid)

| Capability | Current state | Consequence for Phase 14 |
|---|---|---|
| Cast a named child | No `child` role; birth creates a person and a `kin` relation, but the child is not a participant in the birth event; `sharedHistoryTag: 'child_birth'` cannot cast the child. | Parent-child chains (Premises 2, 6, 12) need a `child` role and a `hasChild`/`parentOf` condition, or a same-household `neighbor` workaround with an audit label. |
| Track an object | No item inventory; only flags and prose. | The wooden horse / pawn ticket / doorplate chains are memory tokens; a later scene can contradict the prose. Standardize flag pairs and knowledge propositions. |
| Schedule a 20-year echo | `followup` is 2–3 steps; long echoes depend on `history` conditions and scene rates. | An echo can compile and never fire, especially if its age window is narrow or its role is blocked. Add a chain-firing audit. |
| Death as a scene | Four of five Phase 13 lives end in `statistical_death/*` (Anton, Emil, Mitzi, Lena) with no other participants; Hedwig is alive at the 2000 horizon. | Endings are unearned. A composed last-scene kernel that reliably precedes the statistical death is a prerequisite for Premise 12 and Fix 5. |
| War / occupation | The 75 excerpts contain no direct combat or mobilization; `vienna-life-wwii-conscription` blocked 81 times. | Premise 11 needs the war contexts and roles to be wired; otherwise the library's war remains scarcity. |
| Second-person base prose | The top nine repeated texts are second-person (“你”); the excerpt mostly selects third-person scenes. | A full-log read will break POV. Add a POV sweep or a subject-anchoring variant for the high-frequency base scenes. |
| Organization relations | `relation` targets people only; union/party/employer are memberships/roles. | A betrayal by an organization must be represented as a role loss, flag, knowledge or project, not a `relation` effect. |
| Effects match prose | 287 `unresolved_effect_ref`, 29 `invalid_relation`, 2 `effect_on_dead_or_missing`. | Phase 14 effect discipline needs the same audit; a beautiful chain with a missing cash/role effect will fail the life rubric. |
| Full-log reading | The dossier is 15 events; the full log is 20–534 personal events per focal life (155–322 subject events for the four adults). | Do not score a life from the dossier alone. Use `focalLives` and a full-log export for the rubric. |

---

## 7. Verdict: lives or linked fragments?

**Phase 13 reads as linked fragments with a strong composed micro-story layer, not as five lives.** The subject fix is real and important: 63/75 excerpt events have a trace subject, and every one of those is the focal person; the other 12 are birth/statistical/response events with no trace subject. The composed scenes have genuine turns. But the whole-life evidence is against the stronger claim.

- **People vanish.** The son, daughter, lover, mentor and friend are introduced with bodies and costs, then disappear. The dossier's relationship score is 1/5 for all five lives.
- **Seeds do not return.** The wooden horse, doorplate, ticket, passport, clinic refusal and shop deposit are all state-changing seeds; none has a later scene that reads the state.
- **The full logs are template loops.** Hedwig's mother falls 19 times; Emil's laundry-help 13 times; the world's top repeated text is the pawn-watch scene 92 times. The 15-event sample under-represents the loop, so the dossier looks more varied than the life.
- **History is weather.** 1945 is soup; 1948 is a statistical famine; 1955 is a folded leaflet. The historical objects are excellent; the historical options are not.
- **Endings are not scenes.** Four of five lives end in `statistical_death/*` with no other participants; the fifth ends in a letter with no addressee.

The strongest life is **Lena**: the passport, shop, debt and famine form a downward economic arc, and the paper boat is a real motif. The weakest is **Anton** (14/30; Emil ties the score at 14 but has 534 personal events and the same relational hole): four brilliant childhood vignettes and a statistical death, with no causal spine. **Hedwig** has the best scenes and the least shape; **Mitzi** has the strongest institutional texture and no family; **Emil** has the most events and the least relational continuity.

What would change the verdict:

1. A Phase 14 playtest where at least three of the twelve chains fire from seed to echo with a returning person and a failure branch.
2. A family chain that casts the same child at 5, 15 and 30, and a death scene with a survivor in the room.
3. A full-log score of at least 20/30 on the whole-life rubric for at least three of five lives, with no dimension below 2.
4. A visible reduction in the per-person template loops (Hedwig's 19 mother-falls, Emil's 13 laundry-help) and in the second-person base text.

Until then, the honest description is: **a subject-correct, causally improved, locally literary event library that has not yet learned to compose a life.** Phase 14's chains, if they are built as chains rather than themed scenes, are the right instrument to change that.

---

## Appendix A — Quote index

| # | Life | Date | Event id | Action | Use |
|---:|---|---|---|---|---|
| 1 | Anton | 1921.01 | `001018` | `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` | Strong seed, no return |
| 2 | Anton | 1922.05 | `001119` | `p9-childhood-household.name-day-gift/wooden-horse` | Object seed, no echo |
| 3 | Anton | 1923.08 | `001326` | `statistical_death/pneumonia` | Statistical ending |
| 4 | Hedwig | 1931.02 | `003064` | `r3-mig.residency-registration::.../paid-for-doorplate` | Institutional seed |
| 5 | Hedwig | 1953.07 | `009590` | `vienna-adult-social.sunday-table/sunday-table.argument` | Consequence without state |
| 6 | Hedwig | 1990.12 | `026198` | `p9-gap-elder-solitude.letter-to-kin/letter-no-reply-needed` | Unaddressed ending |
| 7 | Emil | 1929.05 | `002534` | `vienna-youth-threshold.first-wage/whole-envelope-home` | Strong scene, closed loop |
| 8 | Emil | 1939.10 | `005257` | `vienna-medical-treatment.night-fever/sweat-it-out` | Cast/prose contradiction |
| 9 | Mitzi | 1931.01 | `003069` | `r2-urban.clinic-residence-paper::.../turned-away` | State seed, unused |
| 10 | Mitzi | 1940.01 | `005560` | `vienna-family-childbirth/daughter-born` | Vanishing child |
| 11 | Lena | 1930.11 | `002766` | `major-crisis.border-papers/papers-refused` | Strong migration seed |
| 12 | Lena | 1937.10 | `004708` | `p9-social-courtship-friendship.friend-intercession/intercession-concert-ticket` | Unearned turn |
| T1 | Hedwig | 1936.03 | `004465` | `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` | Template duplicate |
| T2 | Mitzi | 1967.09 | `014882` | `vienna-legacy-worklife.hours-ledger/hours-ledger.refuse` | Template duplicate |

All ids are `evt:world-vienna-1912:<suffix>`. Texts are quoted from `EventFact.immediateText`; effects are from the committed fact, not from the recipe. The `trace` and `effects` in the playtest are the authority for the craft judgments.

## Appendix B — Full-log repetition evidence

From `docs/v4/playtest.json`:

- **Per-life max scene prefix:** Hedwig 19 (`vienna-illness-household.mother-falls`); Emil 13 (`p9-gap-childhood-chores.laundry-help`); Mitzi 11 (`laundry-help`); Lena 9 (`birth`); Anton 3 (`market-line` and `cigarette-card`).
- **Per-life top prefixes:** Hedwig `mother-falls` 19, `mind-sibling` 13, `birth` 10, `night-fever` 10, `family-childbirth` 8; Emil `laundry-help` 13, `market-line` 9, `union-political.meeting` 8, `housing-move.sublet-room` 8; Mitzi `laundry-help` 11, `family-childbirth` 10, `injury-recovery` 9, `birth` 7; Lena `birth` 9, `family-childbirth` 8, `laundry-help` 6.
- **Global top repeated texts:** 92 pawn-watch, 82 pawn-watch chain, 81 coal-credit, 80 landlord rent, 74 table debt, 73 watch, 73 coal, 73 eviction, 61 rent. The top nine repeated texts are second-person.
- **Scheduling:** 19,141 blocked scenes; 18,925 `missing_role`; 287 `unresolved_effect_ref`; 29 `invalid_relation`; 2 `effect_on_dead_or_missing`.
- **Composition:** 31,830 events; 6,227 composed actions (3,573 scenes + 2,654 tasks); 661 distinct kernels; 757 persons; 306 alive at 2000; 375 births; 449 deaths.

## Appendix C — Method and limits

- **Read:** all 75 excerpt events; the five focal-life summaries (`focalLives`); `textAudit`, `compositionAudit`, `schedulingAudit`, `anomalies`, `warnings`; the generated packs behind the quoted scenes (`vienna-market-debt`, `vienna-illness-household`, etc.); `batch13-*` recipes; the uncommitted Phase 14 continuity test `tests/v4-continuity.test.ts` and the `history`/`sharedHistoryTag`/`followup` implementation in `packages/v4/engine.ts`.
- **Not done:** no simulation rerun; no code/content edits; no new playtest; no LLM prose generation. The Phase 14 `batch14-*` files were empty at the time of reading, so the premises are proposals, not verified content.
- **Limit:** the five lives are 15-event excerpts. The full logs have 20–534 personal events (155–322 subject events for the four adults), and the excerpt selection hides repetition. The whole-life scores are sampled-dossier scores, not full-log scores. A full-log review would need an export of all subject events and the relationship/household state at each event.
- **Limit:** the twelve premises are content designs, not acceptance evidence. They compile in principle through the existing kit/conditions, but a recipe checker and a short playtest must verify that the seeds cast, the follow-ups fire, the echoes fire, and the effects match the prose.
- **No fake success:** this document does not claim that Phase 14 is implemented, that any new content meets the 75% target, or that the public site is live. Phase 13's final 15-event sample was 12/15 (80%), exactly at the line with zero margin; this document treats that as a local event-level result, not a life-level pass. It claims only what the committed Phase 13 texts and the current content mechanisms show.
