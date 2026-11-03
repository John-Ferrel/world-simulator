# Phase 10 Critique & Rewrite Review

**Reviewer:** Critic & Rewrite subagent  
**Date:** 2026-11-03  
**Scope:** `packages/v4/content/major-education-work.ts`, `packages/v4/content/major-family.ts`, `packages/v4/content/major-crisis.ts`, `packages/v4/content/major-life-tasks.ts`  
**Rubric:** `docs/v4/phase-10-literary-review.md`

**Method.** Close reading of 13 outcomes across education, work, family, crisis, war, migration and active tasks. Every sampled node is decisive/major content, so I applied the major threshold of **36/50**. Scores are editorial, not statistical. I did not use an LLM, run tests, use git, or edit any existing content file. Citations are scene/outcome ids only; no line numbers are invented.

**Headline.** **13 samples: 5 pass, 8 fail.** The strongest material is in family and work character scenes; the weakest is in crisis/war/migration and active tasks, where institutions, payments and consequences are often asserted rather than dramatized. The corpus has a real voice, but that voice is narrowing into one cadence.

---

## Score summary

Legend: **S** specificity, **M** motivation, **C** causality, **T** tension, **Sty** style, **Tw** twist, **N** naturalness, **P** period, **F** fact consistency, **Mem** memorability.

| # | Scene / outcome | S | M | C | T | Sty | Tw | N | P | F | Mem | Total | Verdict |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `major-education-scholarship-examination` / `full-scholarship` | 5 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 3 | 4 | **39** | PASS |
| 2 | `major-education-withdrawal` / `withdrawn-to-printshop` | 4 | 5 | 3 | 4 | 4 | 3 | 4 | 1 | 3 | 4 | **35** | FAIL |
| 3 | `major-work-dismissal` / `short-time-instead` | 5 | 3 | 3 | 4 | 5 | 3 | 5 | 4 | 2 | 5 | **39** | PASS |
| 4 | `major-work-injury` / `injury-compensation-granted` | 5 | 3 | 4 | 5 | 4 | 3 | 4 | 3 | 2 | 5 | **38** | PASS |
| 5 | `major-work-retirement` / `pension-granted` | 4 | 3 | 2 | 2 | 3 | 2 | 3 | 1 | 1 | 3 | **24** | FAIL |
| 6 | `major-family.child-death` / `child-death.diphtheria` | 5 | 3 | 2 | 5 | 4 | 2 | 4 | 2 | 1 | 5 | **33** | FAIL |
| 7 | `major-family.marriage-pressure` / `marriage-pressure.dowry-dispute` | 4 | 4 | 3 | 4 | 5 | 3 | 4 | 4 | 2 | 4 | **37** | PASS |
| 8 | `major-family.separation-widowhood` / `widowed-tin-box` | 5 | 4 | 5 | 4 | 5 | 2 | 5 | 5 | 4 | 5 | **44** | PASS |
| 9 | `major-crisis.police-raid` / `held-overnight` | 5 | 4 | 4 | 4 | 3 | 3 | 4 | 1 | 3 | 4 | **35** | FAIL |
| 10 | `major-crisis.front-wound` / `abdomen-wound` | 5 | 2 | 3 | 4 | 4 | 2 | 3 | 2 | 2 | 4 | **31** | FAIL |
| 11 | `major-crisis.border-papers` / `papers-refused` | 4 | 3 | 3 | 4 | 4 | 3 | 4 | 3 | 3 | 4 | **35** | FAIL |
| 12 | `major-task.strike-meeting` / `meeting-broken-up` | 4 | 4 | 3 | 4 | 3 | 2 | 4 | 4 | 1 | 3 | **32** | FAIL |
| 13 | `major-task.relocation-klosterneuburg` / `moved-with-work` | 4 | 3 | 2 | 2 | 3 | 2 | 4 | 3 | 1 | 3 | **27** | FAIL |

**By category:** education 1 pass / 1 fail; work 2 / 1; family 2 / 1; crisis 0 / 1; war 0 / 1; migration 0 / 1; active tasks 0 / 2.

---

## Sample-by-sample review

### 1. `major-education-scholarship-examination` — 奖学金考试的墨水瓶

**Outcome:** `full-scholarship` — **39/50, PASS**

> 考试设在女子中学的二层教室。{teacher}当着{subject}的面拆开牛皮纸袋：一篇作文、两道算术、一段听写。{subject}写到最后一个数字时，手心里全是墨。三周后学校寄来通知，学费全免，每年另发三十克朗书籍费；条件是期末平均分不得低于良。

**Assessment.** Specificity 5: the exam has three named parts, a paper envelope, an exact grant and a condition. Motivation 4: the scholarship is a clean engine, but the required `parent` role never appears in this outcome; the family's sacrifice is only implied. Causality 4: exam → result → enrollment is clean, but the “average must stay at 良” condition is announced and never tracked by any flag or later check. Tension 4: the ink and the three-week wait work; there is no obstacle beyond the exam itself. Style 4: restrained and period-specific. Twist 3: no twist, and none is needed. Naturalness 4: “手心里全是墨” is slightly overstated (ink sits on the fingers, not the palm), otherwise natural. Period 4: the girls' lyceum, fees and book grant fit; “牛皮纸袋” is plausible by 1900. Fact 3: education/cash/role/relation all match, but the annual grant is booked as one payment. Memorability 4: the ink and the envelope are memorable.

**Targeted rewrite.** Change “每年另发三十克朗书籍费” to “首年发三十克朗书籍费，余下按学期发” (or add a recurring grant); either use `{parent}` in this outcome — one beat about whether the grant money goes to coal or books — or make `parent` optional; if the “平均分不得低于良” condition matters, add a later check/flag rather than leaving it as a sentence.

---

### 2. `major-education-withdrawal` — 名册上的最后一行

**Outcome:** `withdrawn-to-printshop` — **35/50, FAIL**

> 账本摊在桌上：房租十四克朗，煤三克朗，下面还有五张嘴。{teacher}说再读两年能考助学金，{parent}把算术本拿去垫桌脚，说助学金是明年的，面包是今天的。第二天，{subject}跟着{employer}的工头进了印刷厂，先扫地、搬纸、给机器添墨，月底拿九克朗。

**Assessment.** Specificity 4: the ledger, rent 14, coal 3, five mouths and wage 9 answer who/what/obstacle/result; the numbers are almost too tidy. Motivation 5: “助学金是明年的，面包是今天的” is the best motive line in the sample; the parent's choice is economically and emotionally legible. Causality 3: the family decision leads directly to the factory, but the legal/institutional step — school release, truancy, factory age — is missing. Tension 4: the teacher-versus-parent argument is real. Style 4: no ornament, strong verbs. Twist 3: no twist; the irony is arithmetic. Naturalness 4: good, except “下面还有五张嘴” is a slightly writerly summary. Period 1: a 12–13-year-old in a factory is a hard error for 1900–1935; the 1885 factory law and compulsory schooling to 14 make this illegal, and the scene treats it as a normal family choice. Fact 3: the effects match the prose (education none, employment, wage 9), but the employment is institutionally impossible. Memorability 4: the arithmetic book under the table leg.

**Targeted rewrite.** Make the employer a small master printer/workshop, not a factory: use a `master`/`worker` role with a workshop place, and keep the boy as an errand boy (`Laufbursche`) in a shop. Add one line that the school register is not formally released and the family risks a truancy fine, or raise the subject age to 14+ and keep the factory. Separately, `kept-home-to-mind-children` says “家里的婴儿” but only requires `householdSize >= 4`; add a younger child/sibling condition or rewrite that outcome so the work is stove-watching and market gleaning, not infant care.

---

### 3. `major-work-dismissal` — 信封里的解雇通知

**Outcome:** `short-time-instead` — **39/50, PASS (with a required correction)**

> 厂里没有把{subject}的名字写进解雇名单，只把班次改成每周三天，工钱按日算，月底二十四克朗。{employer}说等订单回来再恢复；{subject}点头，把新的排班表折好，压在饭桌玻璃板下。{worker}把自己的班次换给{subject}一天，下一天又换回去。房租没有按日算，面包也没有。

**Assessment.** Specificity 5: three days, 24 kroner, a shift swap, a glass-topped table, a last line that lands. Motivation 3: the subject mostly accepts; the only active choice is the coworker's shift swap, which is good but secondary. Causality 3: short time → hunger is right, but the wage arithmetic only works if the full wage was 48; at the pack's established 30-kroner helper wage, three days a week is about 15, not 24. Tension 4: the quiet dread works. Style 5: the last line is the best sentence in the sample; no sentimentality. Twist 3: “short time instead of dismissal” is a mild reversal, not a twist. Naturalness 5: it sounds like a works office. Period 4: short-time work fits the printing trade; the wage figure needs a stated full wage. Fact 2: the 24-kroner line contradicts the earlier 30-kroner helper wage unless the scene establishes a 48-kroner full wage. Memorability 5: “房租没有按日算，面包也没有。”

**Targeted rewrite.** Change “月底二十四克朗” to “月底十五克朗” if full-time is 30, or raise the full wage to 48 and keep 24 as half-time pay. Align the `-4` cash effect with the actual shortfall. Keep the last line.

---

### 4. `major-work-injury` — 压板落下的三秒钟

**Outcome:** `injury-compensation-granted` — **38/50, PASS (with a required correction)**

> 压板落下时，{subject}的右手还在滚筒边。{worker}拉下电闸，{employer}的工头拿来急救箱，把两根手指包进纱布。医院截掉了指尖，事故报告写“操作不慎”；六周后保险会寄来二十八克朗，厂里却通知{subject}不用再来了，因为机器需要两只完整的手。

**Assessment.** Specificity 5: press, two fingers, first aid, hospital, accident report, insurance, dismissal. Motivation 3: the accident is external; the only motive is the firm's productivity, which is credible but not complex. Causality 4: accident → amputation → claim → dismissal is strong; the only break is the six-week insurance payment being credited immediately. Tension 5: the machine and the hand are visceral without being gratuitous. Style 4: restrained; “机器需要两只完整的手” is a cold, memorable line. Twist 3: the dismissal after the claim is a real reversal, but it is not prepared beyond the firm's earlier behavior. Naturalness 4: good, except the future tense inside an immediate effect. Period 3: accident insurance exists, but the amount/timing needs a check. Fact 2: the cash effect fires now while the text says six weeks; the scene also duplicates the crisis press accident. Memorability 5: the two fingers and the line about complete hands.

**Targeted rewrite.** Change “六周后保险会寄来二十八克朗” to “厂里先垫二十八克朗，六周后保险结算” and keep the immediate cash, or make the payment delayed. Add `notHasFlag accident_compensation` / `notHasRole disabled_worker` to the crisis press-accident scene, or merge the two events. Do not lose “机器需要两只完整的手.”

---

### 5. `major-work-retirement` — 养老金申请表

**Outcome:** `pension-granted` — **24/50, FAIL**

> 工厂医生用听诊器在{subject}背上听了很久，在表格上写“尘肺，不宜继续”。{official}翻完工票和保险册，说缴费年数够，可以办提前退休。第一个月领到十八克朗，{subject}把围裙交回车间，回家路上买了一块猪油和两袋煤。

**Assessment.** Specificity 4: doctor, form, contribution book, 18 kroner, pork fat and coal. Motivation 3: the doctor and official decide; the subject has no choice or resistance. Causality 2: “dust lungs” in a printshop is the wrong trade disease; early retirement at 56–59 needs invalidity framing, not a general old-age pension. Tension 2: the scene is a queue, not a conflict. Style 3: competent but formulaic; “把围裙交回车间” is the one live detail. Twist 2: none. Naturalness 3: “尘肺” and “提前退休” read like modern medical/administrative language. Period 1: the pension institution and the diagnosis are both wrong as written for 1900–1935; the rejected outcome hardcodes 1907–1909. Fact 1: “用了三十年的排字尺” strains the 56–59 age band (a compositor starting at 14 would have 42–45 years); the 1907–1909 record reference is impossible before 1907. Memorability 3: pork fat and two sacks of coal.

**Targeted rewrite.** This is not a line edit; it is a mechanism rewrite that keeps the form-and-queue structure. Gate all outcomes on `worldYear >= 1909`, or make 1900–1908 a sickness-fund/工厂福利 scene rather than a pension. Call the outcome an invalidity pension (`Invaliditätsrente`) or “krankheitshalber pensioniert,” not general early retirement. Replace “尘肺” with lead poisoning in a compositor — blue line on the gums, colic, tremor — or specify paper/ink dust and avoid the modern pneumoconiosis diagnosis. Replace “1907年到1909年” with “早年缴费记录缺页.” Change “三十年” to “四十年” or “从学徒时用到现在.”

---

### 6. `major-family.child-death` — 小棺材

**Outcome:** `child-death.diphtheria` — **33/50, FAIL**

> 孩子咳了三天，喉咙里像塞着棉花。医生来看过一次，说是白喉，留下几包药粉；药粉是白的，冲在水里像石灰。第四天早上，{subject}把{child}抱起来时，身体已经凉了。{partner}去市政办事处登记，回来时带了一块小木板，自己在厨房钉成棺材。

**Assessment.** Specificity 5: cough, throat, powder, cold body, registration, a small board, a coffin nailed in the kitchen. Motivation 3: the parents are helpless; the doctor's treatment is not really a choice. Causality 2: diphtheria in 1900s Vienna would be treated with antitoxin serum, not a white powder; the child's death is medically muddled. Tension 5: the domestic horror is real. Style 4: restrained, no melodrama. Twist 2: none. Naturalness 4: “喉咙里像塞着棉花” is good; “药粉是白的，冲在水里像石灰” is vivid but wrong. Period 2: the treatment is wrong; the rest of the death/burial detail is plausible. Fact 1: the `child` role is a `neighbor` in the same household, not guaranteed to be the subject's child, yet the subject gets `bereaved_parent` and the partner acts as parent. Memorability 5: the small board and the kitchen coffin.

**Targeted rewrite.** Add a parent-child condition/role so `$child` is actually the subject's child, or rewrite the scene as a neighbor's/landlord's child and remove `bereaved_parent`. Make `{partner}`'s relation to the child explicit. Replace “几包药粉” with “白喉血清” and a syringe/ice box, or have the doctor arrive too late to administer it. Keep the small board and the kitchen coffin.

---

### 7. `major-family.marriage-pressure` — 嫁妆单子

**Outcome:** `marriage-pressure.dowry-dispute` — **37/50, PASS**

> 媒人把最后一块杏仁糕吃完，两家还在为二十克朗争。{partner}的父亲说少一个子儿也不行，{subject}的母亲把清单揉成一团。媒人把盘子往自己那边挪了挪，继续吃。{partner}送{subject}到巷口，从口袋里掏出那枚戒指，又放回去；两人在巷口站了一会儿，各自回家。

**Assessment.** Specificity 4: almond cake, 20 kroner, the ring, the alley. Motivation 4: the parents' pride and the matchmaker's appetite drive the scene; the couple's passivity is the point. Causality 3: the dispute ends the match, but the matchmaker is an optional role and the returned ring/gifts have no effect. Tension 4: the comedy is tense because the negotiation is real. Style 5: the matchmaker moving the plate is the best comic beat in the corpus. Twist 3: no twist; the comedy is the reversal. Naturalness 4: good, though “站了一会儿” is a recurring phrase. Period 4: dowry and matchmaker fit; the amounts are plausible. Fact 2: the optional matchmaker may not exist in the cast; the cash effect covers coffee/pastries but not the ring; `returned_home` is an odd role. Memorability 4: the plate.

**Targeted rewrite.** Make `matchmaker` required, or rewrite the opening so the two mothers/fathers carry the negotiation without a matchmaker. Add a small effect for the returned ring/gifts (cash or flag), since the text makes them material. Keep the matchmaker eating the almond cake; that is the scene's life.

---

### 8. `major-family.separation-widowhood` — 两个地址

**Outcome:** `separation-widowhood.widowed-tin-box` — **44/50, PASS (benchmark)**

> {partner}咳了半年，最后一个月连楼梯都上不去。{subject}把床让给对方，自己睡在厨房的长凳上。{partner}死在清晨，{subject}去市政办事处登记，又去{partner}上工的地方结清工钱；葬礼从简，神父念完经，{subject}把{partner}的工票和剃刀收进一只铁盒。

**Assessment.** Specificity 5: cough, stairs, bed/bench, death at dawn, registry, final wages, funeral, tin box. Motivation 4: caregiving and grief are shown through logistics, not declarations. Causality 5: TB → death → registration → wages → funeral → tin box is complete. Tension 4: quiet, but the decline is relentless. Style 5: no over-explanation; the tin box is earned. Twist 2: none, and none needed. Naturalness 5: the best dialogue-free scene in the sample. Period 5: TB, home death, parish funeral, final wages all fit. Fact 4: death, cash and mood effects match; no widow's pension/insurance is modeled, which is a gap but not a contradiction. Memorability 5: the work ticket and razor in the tin box.

**Targeted rewrite.** Add one institutional consequence: a widow's/ survivor's insurance claim, or an explicit “没有抚恤金，只有最后工钱.” If the priest remains, add a confession/religion condition or use “教会” without naming a specific rite. Do not add ornament; this is the style benchmark.

---

### 9. `major-crisis.police-raid` — 会场的门从外面被推开

**Outcome:** `held-overnight` — **35/50, FAIL**

> 警察把{subject}和{worker}带上停在巷口的警车，理由是“妨碍检查”。他们在市政府的附属讯问室里坐到天亮，轮流被问谁印了传单；{subject}的手腕被铁环磨破，天亮前被放出来。回到工厂时，工头让他把工具柜清空，说警察来过电话。

**Assessment.** Specificity 5: plainclothes men, signature book, union card in a sock, iron ring, toolbox. Motivation 4: attendance is enough; the subject's politics are not established, but the raid supplies the pressure. Causality 4: meeting → raid → detention → dismissal is clean. Tension 4: the door, the list, the phone call. Style 3: strong details, but the opener (“两个穿便衣的人堵住门口”) and the closing stare are house style; the middle is better. Twist 3: no twist; bureaucratic menace is the point. Naturalness 4: good, except the police car. Period 1: a police car at a 1912 union meeting is a hard anachronism; the scene runs 1912–1925, and the early end is impossible. Fact 3: effects mostly match, but `role: police_record` is a record, not a social role; “市政府的附属讯问室” is vague. Memorability 4: the union card in the sock.

**Targeted rewrite.** Replace “警车” with “警用马车” or “分局的囚车,” or raise the scene's `worldYear` floor to the mid-1920s and say it is a motor patrol. Replace “市政府的附属讯问室” with “区公所的讯问室.” Change `role: police_record` to `detained_activist`, or keep only the flag. Keep the union card in the sock.

---

### 10. `major-crisis.front-wound` — 战壕里的泥和铁

**Outcome:** `abdomen-wound` — **31/50, FAIL**

> 战壕的胸墙被一发炮弹掀开。{subject}被气浪推倒，半截身体埋在湿土里，左手还攥着半块硬面包；{neighbor}把他拖到救护所时，腹部的伤口已经不再流血。医生在担架旁登记姓名，把一枚银质勇敢奖章和二十五克朗的抚恤金装进信封，地址被雨水泡开，还是寄往维也纳。

**Assessment.** Specificity 5: shell, parapet, mud, half a hard bread, aid station, envelope, rain. Motivation 2: the subject has no choice and no act; the death is an event that happens to him. Causality 3: shell → wound → death is clear, but the doctor registering the name and packing a bravery medal plus death benefit is institutionally wrong. Tension 4: the buried body and the bread are strong. Style 4: good detail, but the ending (“地址被雨水泡开，还是寄往维也纳”) is sentimental and over-explained. Twist 2: the medal is not prepared by any act of bravery. Naturalness 3: the aid-station procedure reads like a later memorial scene. Period 2: medals and death benefits were handled through military/paymaster channels, not by a doctor at the dressing station; the sibling leg outcome also says “换弹匣” for the period service rifle. Fact 2: cash is credited to the household immediately while the text says an envelope is being sent; no medal effect. Memorability 4: the half bread in the hand.

**Targeted rewrite.** Move the medal and death benefit out of the aid station: let `{neighbor}` take the pay book, a letter and the half bread; make the medal/benefit a later home-front or regimental scene, or have an officer mention it without producing it. If the medal stays, first write the act that earned it. Change “换弹匣” in `leg-amputated` to “压弹夹/拉枪机.” Keep the bread.

---

### 11. `major-crisis.border-papers` — 北站行李房里的印章

**Outcome:** `papers-refused` — **35/50, FAIL**

> 办事员把{subject}的出生登记翻了三遍，说洗礼簿上的名字和申请表格差一个字母，不能发护照。{subject}已经辞了工、退了房，只好把行李寄存在北站，跟{neighbor}挤回利奥波德城的一间转租屋。窗口在护照上盖了一个蓝印：退回原籍。

**Assessment.** Specificity 4: birth register, baptism book, one-letter discrepancy, luggage at the North Station, a sublet. Motivation 3: quitting job and flat before the passport is reckless; it needs a con man/agent promise to be believable. Causality 3: name mismatch → refusal is fine, but stamping a refused passport “return to origin” is procedurally backwards. Tension 4: the window and the luggage work. Style 4: dry, good. Twist 3: no twist; bureaucracy is the antagonist. Naturalness 4: good, except “退回原籍” on a passport. Period 3: passport/return procedures exist, but the document logic and the universal baptism book need conditions. Fact 3: move/residence/unemployment match, but the passport itself is contradictory. Memorability 4: the luggage in the station.

**Targeted rewrite.** Change “在护照上盖了一个蓝印：退回原籍” to stamp the application “abgewiesen” and issue a separate `Rückkehrbescheid`/residence deadline paper. Replace “洗礼簿” with “出生登记/Matrikel” and add a religion/document condition. Add one line that a ticket agent promised the passport was routine, so quitting the job and flat has a motive. The title says “北站行李房” but the scene is at the magistrate; either set it in the station baggage office or change the title.

---

### 12. `major-task.strike-meeting` — 把罢工的纸条传进车间

**Outcome:** `meeting-broken-up` — **32/50, FAIL**

> 会议开到一半，巡警从后门进来，把桌上的名单收走，记下几个人的名字。{subject}被带到分局关了一夜，第二天厂里通知不用再来了。{delegate}在门口等着，把工会律师的地址写在烟盒背面，又塞给{subject}几克朗车钱。

**Assessment.** Specificity 4: three copies, 60 people, a wooden box, a police list, a lawyer's address on a cigarette box. Motivation 4: wages/hours and fear of stopped machines are real. Causality 3: meeting → raid → detention → dismissal is clear, but the effects add a beating, cracked ribs and a fine that the prose never shows. Tension 4: the raid is well staged. Style 3: good details, but the closing “塞给{subject}几克朗车钱” is a house-style soft landing. Twist 2: none. Naturalness 4: good. Period 4: union meeting and police repression fit; “巡警” and “分局” are fine. Fact 1: `health -0.12`, `bruised ribs`, and `cash -10` have no textual basis; the scene also duplicates the crisis police raid. Memorability 3: the cigarette-box address.

**Targeted rewrite.** Either add the beating and the fine to the prose — one line in the district-office corridor and one line about the ten-kroner fine — or delete `health -0.12`, `bruised ribs` and `cash -10`. Make this a strike-committee arrest with a specific warrant, not a second general union-meeting raid; that differentiates it from `major-crisis.police-raid/held-overnight`. Keep the lawyer's address on the cigarette box.

---

### 13. `major-task.relocation-klosterneuburg` — 把行李装上开往克洛斯特新堡的火车

**Outcome:** `moved-with-work` — **27/50, FAIL**

> {subject}在户籍办事处排了两个上午，才把迁出证明和劳工证办齐。{official}在表格上盖了章，提醒到克洛斯特新堡后三天内去镇公所报到。月底，一家人把锅、被子和工具捆上手推车，搬进姑妈家的阁楼；姑妈说葡萄园正缺短工，天亮就去。

**Assessment.** Specificity 4: exit certificate, labor card, three-day registration, handcart, attic, vineyard. Motivation 3: there is no push factor; why leave Vienna now? The aunt's attic is a destination, not a motive. Causality 2: papers → move is clear, but the outcome id says “with work” and the effect is unemployment; only a promise of work exists. Tension 2: no obstacle after the papers are issued. Style 3: competent but formulaic. Twist 2: none. Naturalness 4: good domestic detail. Period 3: registration/labor card fit, but “劳工证” needs a check; the handcart/train transition is missing. Fact 1: the effect contradicts the outcome name; no employment effect. Memorability 3: the pots, quilts and tools on the handcart.

**Targeted rewrite.** Add a vineyard day-work `employment` effect to `moved-with-work`, or rename the outcome to `moved-with-promise` and add a flag. Add a push factor — a rent increase, a dismissal, or the landlord reclaiming the flat. Make the transport consistent: handcart to the station, train, handcart from the station. Replace the name-mismatch obstacle with a different one (the labor card is not recognized in Klosterneuburg; the attic is not ready), because it duplicates `major-crisis.border-papers/papers-refused`.

---

## Top five concrete problems

### 1. Duplicate decisive events, with no cross-pack exclusion

This is the most serious content problem because it corrupts a life history, not just a sentence.

- `major-work-injury` and `major-crisis.press-accident` are the same printshop press accident: crushed hand, amputated fingers, insurance payment, unemployment, `disabled_worker`. `major-work-injury` is `oncePerPerson: true`; the crisis scene is not, and it has a five-year cooldown. The `light-duty` outcome keeps the subject employed, so the crisis scene can fire later. Nothing excludes the pair.
- `major-crisis.police-raid/held-overnight` and `major-task.strike-meeting/meeting-broken-up` are the same sequence: union meeting → police list/raid → overnight detention → dismissal/blacklist. A person can be detained twice for the same kind of meeting; the prose repeats the same dismissal beat.
- `major-education-scholarship-examination` and `major-education-teacher-recommendation` are parallel 13–15 scholarship mechanisms. They do not hard double-award, because the first changes education status and the second requires `primary`; but the failure path can feed the appeal, and the two scenes claim the same transition with different institutions and amounts. Treat them as one scholarship ladder, not two independent chances.
- `major-education-apprenticeship-exam` and `major-task.trade-qualification` are two journeyman exams for the same printing trade, with different wages (72 vs 88) and different exam forms. The `journeyman` role blocks a second *success*, but the failure/retake paths can still produce two exam narratives.

**Fix.** One canonical node per life transition. Use shared flags/roles and `notHasFlag`/`notHasRole` conditions, or merge the duplicates. Do not solve this by changing prose alone; the registry must prevent the second event.

### 2. Effects contradict the prose; the simulator is asked to believe a different event

The prose is the contract, but several outcomes commit something else:

- `major-education-scholarship-examination/full-scholarship`: “每年另发三十克朗书籍费” → `cash +30` once. Annual is not one-time.
- `major-work-injury/injury-compensation-granted`: “六周后保险会寄来二十八克朗” → `cash +28` immediately. Same in `major-crisis.press-accident/hand-crushed` (“六周后……二十四克朗”).
- `major-task.strike-meeting/meeting-broken-up`: the text has no beating, no cracked ribs and no fine; the effects add `health -0.12`, `bruised ribs`, `cash -10`.
- `major-crisis.rent-increase/locks-changed`: the subject refuses to sign the “自愿迁出” paper, but the effect moves the household into the rear shared room.
- `major-task.promotion-request/promotion-granted`: “三个人的名字被红笔划掉” — but no effects for those workers, no reputation hit for the subject, no relation change. The world is told three people lost shifts and then does nothing.
- `major-task.relocation-klosterneuburg/moved-with-work`: the outcome says “with work”; the effect is `unemployment`.
- `major-family.marriage-pressure/dowry-agreed`: “余下的答应秋收后补齐” but the flag is `dowry_paid`.
- `major-family.marriage-pressure/shop-counter-bride`: “工钱直接交给婆婆” but no employment or wage effect.
- `major-work-own-shop/lease-bankrupt`: “又向{employer}借了三十克朗” but the net effect is a single `-70`; no loan, no repayment.
- `major-crisis.rent-increase/pay-the-increase`: the increase is 14 kroner, the subject pays 18 “补款”; the extra 4 is unexplained.
- `major-education-university-registration/matriculated`: “月租十二克朗” but no rent effect; the move is free.

Smaller versions of the same problem: `major-crisis.street-violence/witness-drag-him-out` charges “bandages and a cab” although the text says they dragged the man into the pharmacy; `major-crisis.street-violence/victim-in-the-gutter` adds two cracked ribs that the prose never diagnoses; `major-family.child-death/scalded` applies a `trust -0.06` “blamed each other” penalty while the text says no one spoke; `major-crisis.police-raid/back-stairwell` adds later surveillance and continued organising that the text does not show.

**Fix.** Enforce an effect-text contract: every effect needs a phrase in the prose, and every material change in the prose needs an effect. For delayed payments, use a flag/outbox or say “first installment/advance.” Add a lint that flags `cash` effects whose reason says “annual,” “six weeks,” or “later,” and prose that says “signed/paid/sold” without a matching effect.

### 3. Casting holes: prose assumes people and relationships the conditions do not guarantee

This is where a literary scene becomes mechanically false:

- `major-family.child-death`: `child` is `kind: 'neighbor'`, `sameHousehold: true`; there is no parent relation to the subject. The prose says “孩子,” the subject gets `bereaved_parent`, and the partner acts as parent. A younger sibling or a lodger's child would be killed, and the subject would become a bereaved parent.
- `major-education-withdrawal/kept-home-to-mind-children`: “家里的婴儿需要人抱,” but the only condition is `householdSize >= 4`. The household may contain four adults and no infant.
- `major-education-university-registration/matriculated`: “洗礼证明” and “父亲的税单” are required, but there is no religion condition and no `parent` role; a Jewish applicant or a fatherless applicant cannot produce the documents the prose demands.
- `major-education-scholarship-examination/full-scholarship`: `parent` is required, but the outcome never uses `{parent}`. The role is cast and then ignored.
- `major-family.marriage-pressure`: `matchmaker` is `required: false`, but a matchmaker drives the two negotiation outcomes. If the role is absent, the prose still invents one; if it is always present, the role should be required.
- `major-work-first-employment`: the `employer` role is `kind: 'worker'`, but the text gives him hiring authority — he looks at hands, asks the subject to read, and writes the name in the register. A coworker cannot hire. `$employerOrg` resolves through his own employment, so the effect works, but the institution does not.
- Related: weak motives in `major-work-retirement/pension-granted`, `major-crisis.front-wound/abdomen-wound`, and `major-task.relocation-klosterneuburg/moved-with-work`. The subject does not want, fear or choose anything before the institution or accident acts. Accidents can be passive, but the scene still needs a stake (a debt, a child, a promised visit) so the outcome lands on a person rather than a case file.

**Fix.** Add the missing conditions/roles or make the prose role-neutral. Required roles must appear; optional roles must not carry the plot. For `child-death`, add a parent-child relation check; for `kept-home`, add a younger child; for `university-registration`, add a parent or replace “父亲的税单” with “家庭收入证明.”

### 4. Period and institutional errors are concentrated in crisis, war, migration and retirement

These are not “prose polish” issues; they change what the world is:

- `major-crisis.police-raid/held-overnight`: “停在巷口的警车” in a scene gated 1912–1925. A motorized police car at the early end is a hard anachronism.
- `major-education-withdrawal/withdrawn-to-printshop`: a 12–13-year-old in a factory. The 1885 factory law and compulsory schooling to 14 make this illegal; the scene treats it as a normal family choice.
- `major-family.proposal-accepted/registry-office`: a civil marriage at the magistrate presented as a normal option for a Catholic couple. Canonical marriage was the legal form; civil marriage needs a confession/no-confession condition or a mixed-marriage dispensation.
- `major-family.proposal-accepted/uncle-tavern-debt`: “舅舅说正月前还清.” “正月” is the Chinese first lunar month; a Viennese tavern keeper would say “到年底” or “到圣烛节.”
- `major-work-retirement`: “尘肺” in a printshop; “提前退休” at 56–59; `pension-rejected` hardcodes “1907年到1909年”; `reduced-pension` says “用了三十年的排字尺” for a 56–59-year-old. The pension institution, the disease and the arithmetic all need rework.
- `major-family.child-death/diphtheria`: white powder mixed with water as the diphtheria treatment. The specific period treatment was antitoxin serum; if the point is that the family could not afford or obtain it, say that explicitly instead of presenting the powder as the treatment.
- `major-crisis.front-wound/leg-amputated`: “换弹匣” for the Austro-Hungarian service rifle of the period (the Mannlicher M1895 used en-bloc clips); “压弹夹/拉枪机” is the period-correct action.
- `major-crisis.border-papers/ticket-and-transit`: 32 kroner for a steamship ticket through Bremen to America. That is implausibly low for a transatlantic steerage passage plus agent fee; make it a deposit or raise it.
- `major-crisis.border-papers/return-after-war`: nine kroner for three months' advance rent in postwar Vienna. If the scene is 1921, that is implausibly low unless it is a rent-controlled shared room; specify the room/rent regime or raise the sum.
- `major-work-dismissal/short-time-instead`: 24 kroner for three days a week only works if the full wage was 48; the pack's established helper wage is 30, so the figure reads as an error unless the scene states the higher wage.
- `major-crisis.rent-increase/pay-the-increase`: a 14-kroner increase but an 18-kroner payment. The extra 4 is unexplained.

**Fix.** A one-page period fact sheet per pack: who signs, what document is issued, what it costs, who receives the money, what the legal minimum age is, what the church/civil marriage rule is. Gate scenes on `worldYear` when the institution did not exist yet. Check arithmetic separately from prose.

### 5. One authorial cadence is flattening distinct lives

The corpus is **not** collapsing into generic AI lyricism. It has a specific, disciplined object-based realism. But it is collapsing into a single authorial cadence: a precise price, a short declarative sentence, then a silence or an object close.

- **Closing-object endings.** `major-education-scholarship-examination/exam-failed`: “把借来的课本包好，压在床板底下.” `major-education-apprenticeship-exam/exam-failed-repeat-year`: “把它折成四折，塞进工帽的衬里.” `major-task.scholarship-application/application-refused`: “把申请表折成四折.” `major-task.marriage-proposal/proposal-refused`: “把戒指重新包进手帕，放回抽屉.” `major-task.strike-meeting/strike-vote-deferred`: “把剩下的传单收进柜子.” `major-work-retirement/reduced-pension`: “箱子里只有一把用了三十年的排字尺.” `major-family.separation-widowhood/boots-sold`: “顺手把门牌上的灰擦了.” Individually good; together, a formula.
- **Silence beats.** `major-work-dismissal/dismissed-with-notice`: “半包烟，什么也没说.” `major-family.child-death/scalded`: “谁也没有先开口.” `major-education-withdrawal/free-place`: “没有立刻说话，把账本合上，又打开.” `major-task.promotion-request/promotion-granted`: “沉默了一会儿.” `major-work-promotion/accepts-foreman-post`: “原来那张长凳上的工友没有再留位置.” Silence is doing too much emotional work.
- **Counting twice.** `major-family.childbirth/daughter-in-a-drawer`: “数她的手指，数了两遍.” `major-crisis.rent-increase/pay-the-increase`: “把钱数了两遍.” `major-family.marriage-pressure/shop-counter-bride`: “婆婆每天把铜板数两遍.” Three “数两遍” in different scenes is a tic, not a motif.
- **Blue stamps and windows.** `major-education-apprenticeship-exam/exam-failed-repeat-year`: “蓝章”; `major-task.scholarship-application/scholarship-granted`: “盖蓝印的信”; `major-crisis.border-papers/papers-refused`: “蓝印.” `major-education-university-registration`, `major-work-retirement`, `major-crisis.border-papers`, `major-task.relocation-klosterneuburg` and `major-task.scholarship-application` all hinge on a window/clerk/stamp. A reader could swap the officials and not notice.
- **Over-explained codas and decorative detail.** `major-crisis.front-wound/abdomen-wound` ends on “地址被雨水泡开，还是寄往维也纳,” which explains a sentiment the scene has not earned; `major-education-teacher-recommendation/appeal-rejected` ends with the subject staying to clean the blackboard, a decorative soft landing after the bureaucratic rejection; `major-family.proposal-accepted/church-wedding` spends its last sentence on a shoe rack made from a coal box. The first two substitute a mood for a consequence; the third is charming and anchored, so it is not a failure, but it shows how often the corpus reaches for an object to close.
- **Hands.** `major-education-scholarship-examination`: “手心里全是墨”; `major-work-injury`: the right hand; `major-family.child-death/scalded`: “掌心也烫掉了皮”; `major-family.childbirth`: “数她的手指”; `major-task.trade-qualification`: “手指被油墨弄得发黑.” Hands are the right central image for this world of print and laundry, but they are everywhere.

**Verdict:** varied in subject matter and in the best scenes; converging in sentence rhythm and closing gesture. The strongest counterexamples — `widowed-tin-box`, `dowry-dispute`, `child-death.scalded`, `police-raid/names-taken`, `dismissed-with-notice` — prove the range exists. The weakest — the scholarship/university/pension/border-papers cluster — read like the same clerk scene with different documents.

**Fix (targeted, not a pack rewrite).** In the next pass, require a non-object ending in at least half the outcomes: a line of dialogue, an unresolved action, a bureaucratic consequence, a cost. Cut one of the two “折成四折.” Replace one “数了两遍.” Keep one blue stamp, not three. Give the clerk, the foreman, the priest and the child different registers; do not let every character retreat into silence.

---

## Rewrite queue for Main

**P0 — do not ship as-is; these are the first rewrites.**

| Node | Why | Targeted change |
|---|---|---|
| `major-work-retirement` (all outcomes) | 24/50; wrong disease, wrong pension institution, hardcoded 1907–09, 30-year tool strains the age band | Gate on 1909+; invalidity pension; lead poisoning symptoms; relative records; 40-year rule |
| `major-family.child-death` (all outcomes) | 33/50; child is a neighbor, subject becomes `bereaved_parent`; diphtheria powder | Parent-child condition; serum or late doctor; explicit partner-parent relation |
| `major-work-injury` + `major-crisis.press-accident` | Duplicate press accidents; future payment credited now | Merge or add mutual exclusion; “advance vs six weeks” |
| `major-crisis.police-raid/held-overnight` | 35/50; police car in 1912 | Horse-drawn/paddy wagon or 1925+; district office; role fix |
| `major-crisis.front-wound/abdomen-wound` (+ `leg-amputated`) | 31/50; doctor awards medal/benefit; “换弹匣” | Move medal/benefit; add act of bravery if kept; fix rifle action |
| `major-crisis.border-papers/papers-refused` + `ticket-and-transit` | 35/50; passport stamped after refusal; 32-kroner Atlantic ticket | Stamp application + return order; period fare or deposit |
| `major-task.strike-meeting/meeting-broken-up` | 32/50; beating/ribs/fine not in text; duplicate police raid | Add or cut the effects; make it a strike-committee arrest |
| `major-task.relocation-klosterneuburg/moved-with-work` | 27/50; outcome says work, effect says unemployment | Add employment or rename; push factor; transport; new obstacle |
| `major-education-withdrawal/withdrawn-to-printshop` | 35/50; 12–13-year-old in a factory | Workshop/master, or age 14+; truancy consequence |
| `major-family.proposal-accepted/registry-office` | Civil marriage as normal Catholic option | Confession condition; canonical/mixed marriage; or church + registry |
| `major-task.marriage-proposal/proposal-accepted` | “Spouse” roles without a wedding; partner moves in | Engagement/cohabitation roles, or add a wedding effect |

**P1 — pass, but fix before the next review.**

- `major-education-scholarship-examination/full-scholarship`: annual grant vs one-time cash; unused `parent`.
- `major-work-dismissal/short-time-instead`: 24 kroner for three days/week; set 15–18 or raise full wage.
- `major-task.promotion-request/promotion-granted`: three names crossed off, no effects; add layoffs or cut the line.
- `major-task.scholarship-application`: age 18–28, place is a Volksschule, effect is `higher, level 2`; separate this adult scholarship from the 13–15 lyceum ladder.
- `major-crisis.street-violence/swing-first`: the worker is killed without being established as the brick thrower; make him the thrower or a mistaken identity.
- `major-crisis.rent-increase/pay-the-increase`: 14-kroner increase vs 18-kroner payment; explain the 4 or change it.
- `major-work-own-shop/lease-bankrupt`: 30-kroner loan but a single -70 effect; show the loan/repayment.
- `major-family.marriage-pressure/dowry-agreed`: `dowry_paid` while half is unpaid; use `dowry_partial` or add an obligation.
- `major-family.marriage-pressure/shop-counter-bride`: wages to the mother-in-law but no employment/wage effect.
- `major-education-night-technical-school/night-school-certificate`: a mechanical-drawing certificate sets `education status secondary, level 2`; check that this is a vocational secondary level, not a Matura-equivalent.

---

## What would change the verdict

- **S2 withdrawal** (35): workshop/master instead of factory, plus a truancy/legal consequence → period 1→4, causality 3→4; passes around 39.
- **S5 retirement** (24): this needs a mechanism rewrite, not a line edit. Invalidity pension + lead poisoning + relative records + 40-year rule could move period/fact/causality/tension enough to reach 36; as written it is not a near-miss.
- **S6 child-death** (33): parent-child condition + serum + explicit partner relation → fact 1→3/4, causality 2→4; passes around 38–39.
- **S9 police raid** (35): “警车” → horse-drawn/paddy wagon, plus one less formulaic opening → period 1→4, style 3→4; passes around 39.
- **S10 war** (31): move the medal/benefit, add an act of bravery or cut the medal, fix “换弹匣,” cut the sentimental address line → fact/period/motivation/naturalness up; passes around 37–38.
- **S11 papers** (35): application stamp + return order, document/religion condition, agent promise → fact/period/motivation up; passes around 39.
- **S12 strike** (32): add the beating/fine to the prose or cut the effects; differentiate from the police raid → fact 1→4, style 3→4; passes around 36.
- **S13 relocation** (27): employment effect or rename, push factor, transport fix, new obstacle → fact 1→4, causality 2→4, motivation 3→4, tension 2→3; still borderline, so it also needs a real scene-level obstacle, not just a condition fix.

---

## Limitations

- This is a 13-outcome sample, not an exhaustive audit of all 30 authored scenes. A full pass should sample every scene at least once and every outcome with a distinct effect bundle.
- Scores are editorial judgments against the ten rubric dimensions; they are not inter-rater validated.
- I did not run the simulator, tests or validation. Some “period” calls (pension ages, ticket fares) should be checked against the repository's source notes before the rewrite; the factory-age claim is supported by the repository's own 1885 source note, but I did not do a source-by-source audit. I have flagged all period items as concrete risks, not as proven legal history.
- No content files were changed. This report is the only new file.
