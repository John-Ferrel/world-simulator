# Phase 21 — Independent Critique and Revision Response

日期：2026-11-08  
Reviewer：独立 Player Experience / Literary Critic（不改代码、不改内容）  
Evidence：`phase-15-phase21-a/b/c.json`（修订前）、`phase-21-playtests.json`、`phase-21-playtest.md`、`phase-21-experience-audit.md`、`phase-21-visual-design.md`、`phase-21-dramatic-content.md`、`phase-21-audit-observer.png`、`phase-21-audit-birth.png`、`phase-21-ui-first.png`、`phase-21-browser-final.png`、`pack-dramatic-lives.json`。  
Baseline：Phase 20 Critic — Life **18/30**、Scene **22/30**。

> 以下为独立 Critic 对**修订前** dossier 的判断；Main Agent 的修订响应单独记录，不把修订后的内容重新冒充为同一轮独立评分。

## 1. 分数

**Life 19/30。Scene 24/30。** Phase 20 是 18/30 与 22/30。这是真实的 +1 / +2，不是 round-up：视觉与早期人生确实成立，但戏剧转化仍然弱。

## 2. 第一印象：肖像与地图

肖像 bug 确实修好了。`phase-21-audit-observer.png` 的左栏是空的，audit 量到 `.portrait` **2px**；`phase-21-ui-first.png` / `phase-21-browser-final.png` 里肖像在 **260px** 舞台、**216px** Canvas 中可见，有聚光、内框、状态标签。产品从“一个没有人的日志”变成“一个人和他的日志”。

地图也是真成功：`phase-21-browser-final.png` 有国家轮廓、“真实地理·世界”、全球/欧洲/人物、维也纳/克洛斯特新堡 pin、“人物在维也纳”；测试数到 **177** 个国家 path。它读起来是地球，不是旧的手绘维也纳示意图。

但人物仍是 **64×64 LPC 地图小人放大**。1914/1 岁的 “Browser Klara” 是大头、近秃、蓝衬衫、棕短裤的像素幼儿，两个黑点眼睛；它读起来像个人，不像肖像。260px 舞台只框住约 140px 的 sprite；没有婴儿帽、摇篮、母亲或明显服装变化。出生页预览仍是约 60px 的小人。成人职业配件没有成人肖像截图证明。地图地理真实但历史沉默：现代国界、标签很小、没有 1914 边界、默认欧洲而非全球。**结论：可见、可用，但不漂亮、不唤起。**

## 3. 出生与 0–5 岁

出生文本实质变好。`phase-21-ui-first.png`：

> “UI Klara在Leopoldstädter Zinshaus, gemeinsamer Gang出生。Anna Weiss 2在生产后抱着孩子，Hermann Bauer站在旁边，接生婆走后，母亲把最后几枚硬币压进糖罐底下；母亲是店员，产后的手还带着工作留下的茧。这间住处现在住了4口人。”

这给出了母亲/父亲、母亲职业、贫困、家庭人数。但它仍没有给兄弟姐妹数、债务或拥挤程度：`birth.ts` 构造 `poor / motherWork / fatherWork / siblings / crowded`，然后 `details.slice(0, 2)`；当 poor + motherWork + fatherWork 同时存在时，siblings 与 crowded 被静默丢掉。设计承诺了它们。

早期内容不是四个模板。五个新通用场景各有三个 outcome；7 年 player cohort 产生 **16** 条儿童/家庭事件。最好的例子具体、温暖：

- `vienna-life-infant-first-smile/colic-night`：“夜里Klara哭了很久，Josef Bauer抱着孩子在屋里来回走，数着地板缝……发现自己还保持着走路的姿势。”
- `vienna-life-toddler-first-words/first-word-more`：“清清楚楚地说了一个字：‘还要。’”
- `vienna-life-child-family-legend/stolen-inheritance`：“孩子记住了‘表盖里刻着姓’，却没有记住那个姓。”
- `vienna-life-child-first-friend/stolen-marble`：“两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。”
- `vienna-life-toddler-accident/safe-in-the-doorway`：“再跑，我就把门关上。”

第一分钟现在有出生、愿望、肖像、地图、家庭细节；30 秒/年下 1 岁在 30 秒后到达，浏览器截图已有 3–4 条记录。相对 Phase 20 的童年空白，这是真改进。

但“0–5 没有长空白”被夸大了。player cohort 仍有 **16 个月**（1913-09 到 1915-01）和 **15 个月**（到 1916-04）的空档；focal lives 更差：Josef A/B 有 26–29 个月没有 child/family 事件，Lena A 34 个月。16 条里还有 child 只是 participant 的事件：`p9-history-medical-daily.house-call` 的 subject 是 Josef Bauer，child 是 neighbor。更严重的是 `vienna-infant-household.baptism-gift/silver-spoon-pawned` 把 **Josef Bauer 投成 “mother”**；`vienna-life-child-first-friend/stolen-marble` 在 player cohort 里让 Elisabeth Bauer 当 subject、player child 当 friend，事件属于另一个孩子，effects 也落在她身上。报告应说“没有五年空白”“大部分被填充”，不能说“没有长空白”。

## 4. 戏剧：强场景，弱转化

三个 dossier：**19 个 focal kernel 事件、39 个 state tick**。26 个 sampled lives 中只有 **9 个**有 kernel 事件，**17 个为零**；24 个 focal lives 中只有 **7 个**有 drama，**17 个没有**。一个 state-rich NPC（Alois C）占 **6/19**，一个 focal life（Rosa C）占 **4**。19 个 focal 事件中 11 个来自两个 kernel：`p21-elder-testimony`（6）和 `p21-mistaken-identity`（5）。

世界层面三个 kernel 占 **128/174（74%）**：`p21-mistaken-identity` 55、`p21-elder-testimony` 42、`p21-absurd-inheritance` 31。16 个 kernel 中只有 **9 个**在 focal 出现，7 个从未出现；`p21-secret-heir` 和 `p21-false-confession` 为零。前者需要 household `family-estate` state，自然 run 中没有 active；后者需要 `political-suspect` + 18–40 岁成年子女，组合从未成立。它们是结构性 dead，不是运气差。

最好的场景是真戏剧，不只是阴暗：

- A Josef 1935-01 `p21-duel-at-dawn/first-blood`：“子弹擦过Josef的左肩，把外套和衬衫一起撕开……医生在运河桥边缝了六针，警察来问话时，Josef只说是在石头上滑了一跤。”
- C Rosa 1936-03 `p21-mistaken-identity/a-cell-for-someone-else`：“银怀表、一张电车票和半包烟；表盖打开时，里面那张小照片上的人不是Rosa……拘留室的门关上时，Rosa才发现自己一直攥着那张电车票。”
- C Rosa 1943-05 `p21-returned-enemy/the-old-letter`：“信上是Rosa年轻时写给别人的一句话……纸角有一处被水浸过的痕迹，像多年前就已经准备好了。”
- C Rosa 1946-01 `p21-scandal-auction/the-letters-are-read-aloud`：“把第七号信封拆开，念了第一页……Rosa听见自己的名字被念了两次，第二次比第一次轻。”
- B Mitzi 1943-01 `p21-family-secret/the-sibling-was-never-a-sibling`：“‘原来我一直在替别人守孝。’……走廊里有人把箱子拖下楼。”
- C Alois 1942-03 `p21-elder-testimony/the-witness-dies-before-signing`：“桌上放着半杯水和一只没有盖上的药瓶……‘证人不能签了’；Rosa在走廊里听见这句话，手里的伞掉在地上。”
- C Alois 1946-08 `p21-elder-testimony/the-name-is-restored`：“把死者的名字从‘无名’改回‘卡尔·魏斯’……窗外正好有人敲响下午四点的钟。”
- B Lena 1954-01 `p21-revenge-ledger/the-first-name-is-crossed-out`：“他没有动刀，只把Mitzi Moser欠税的证据抄了一份，寄给了税务所……第一次给Lena倒了酒。”

所以 pack 不是“只有阴暗”：决斗有 cover story，拍卖有克制，复仇有官僚式残忍，平反有安静仪式。但主导语气是丑闻、背叛、死亡；pack 内几乎没有喜剧或温柔。`p21-absurd-inheritance` 是忧郁，不是荒诞。

重复是更大的失败。Alois C 在 **1943-01、1945-01、1950-10、1952-06** 拿到同一段 `the-family-hears-a-different-death` 文本，只换 child/rival 名字。1946-08 的 `the-name-is-restored` 本应结束这条线，秘密却又回来。pack 写了 `cooldownYears: 5`，但 cooldown 是 per compiled scene，context/milieu 变体（`ctx-vienna-authoritarian-1934` vs `ctx-vienna-postwar-1945`；`milieu-tenement` vs `milieu-union`）绕过它。这是 continuity failure，不是 motif。

新 State 大多是 wallpaper。focal lives 有 **32 个 `p21-scandal-web` tick、7 个 `p21-fortune-reversal` tick**，而 kernel 事件只有 19。32 个 tick 只用少数句子：“一个证人搬走了……信箱里多了一张没有署名的明信片，上面只写着‘我还记得’”；“又过了一年，那几张纸仍锁在……抽屉里。” State 参数（exposure/loyalty/leverage/danger）不可见，玩家看到的是重复散文，不是变化中的局势。71 个 adaptive context 大多是 weight/DC modifier；trace 记录 kernelId/contextId/milieuId/check，但不记录哪个 adaptive context 匹配、权重多少。每个 sampled drama event 的 `causes: []`。玩家无法检查“为什么发生”。

**0.41% focal 可接受吗？** 对一个声称“make it a game”的 Phase，不可接受。它只能作为稀有 garnish；Phase 21 应被重新表述为视觉/早期人生工作。它也低于 Phase 20 的 **1.60%** 新 Pack focal share。合理目标是 **50–60% 成年 lives 有 2–4 个 kernel 事件**，且前 15 分钟至少一个，约等于 1.0–2.0% focal share。0.41% 且 71% focal lives 为零，不是戏剧纹理。

## 5. 五分钟玩家体验

最终截图是最直接的证据。header 写 **“1914 一月”**，但最新日志是 **1914.09**（“第一句像话的话”）、**1914.03**（“一天里的几顿奶”）、**1914.01**（“第一次笑出声”）；右侧“时代”同时显示 **“七月 1914 总动员令”** 和 **“六月 1914 萨拉热窝谋杀”**。玩家被告知还没发生的事。验收测试只查记录数、肖像高度、地图 path、console error，不查 chronology。

这是硬 immersion break，不是 cosmetic bug。它让日志像数据库 dump，不像人生展开。`engine.ts` 把 scene event 盖成 target.year 的随机月份；world 在 1914-01 可以有 1914.09 事件。

30 秒/年下，5 分钟约 **10 年**；第一个 drama kernel 在 20–24 岁，即真实观看 **10–12 分钟** 后。五分钟玩家看到出生、第一次笑、第一句话、喂养、家庭故事、第一个朋友、学校；安静温暖。比 Phase 20 好，但仍是一个 dollhouse，不是 game。玩家没有选择、没有目标反馈、没有戏剧问题；愿望是 lens，不是 lever。地图静态；肖像长大但不会表情；2.2 秒 pulse 和 4 秒轮询是弱反馈；左侧“当前目标”是生成的，不是选择的；地图与日志不互相指向：点城市只列人物，不列那里发生的事。历史/life-sim 玩家可能为 texture 留下；普通玩家五分钟之后理由不足。

## 6. 文学质量

十五个代表场景，0–2：

| Scene | Score |
|---|---:|
| Player birth (`phase-21-ui-first.png`) | 1 |
| `vienna-life-infant-first-smile/colic-night` | 2 |
| `vienna-life-toddler-first-words/first-word-more` | 2 |
| `vienna-life-toddler-accident/safe-in-the-doorway` | 2 |
| `vienna-life-child-family-legend/stolen-inheritance` | 2 |
| `vienna-life-child-first-friend/stolen-marble` | 1 |
| `p21-duel-at-dawn/first-blood` | 2 |
| `p21-mistaken-identity/a-cell-for-someone-else` | 2 |
| `p21-mistaken-identity/the-photograph-is-wrong` | 1 |
| `p21-family-secret/the-sibling-was-never-a-sibling` | 2 |
| `p21-returned-enemy/the-old-letter` | 2 |
| `p21-scandal-auction/the-letters-are-read-aloud` | 2 |
| `p21-elder-testimony/the-witness-dies-before-signing` | 2 |
| `p21-elder-testimony/the-family-hears-a-different-death` | 1 |
| `p21-scandal-web/the-web-tightens` tick | 0 |

**Scene total 24/30。** 八个最佳戏剧场景本身是 16/16；样本是 24，因为实际游玩包含 repeated family-hears、三次 photograph、role-broken first-friend、32 个 generic scandal ticks。

项目六维：Specificity 4、Causality 3、Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 3 = **Life 19/30**。Phase 20 是 18/30 life、22/30 scene；Phase 21 是 +2 scene、+1 life。Specificity/历史质感强；early-life continuity 变好；causality 仍主要是 check-band + hidden state；character continuity 在童年变好，但成年 belief/goal 仍不变；relationship continuity 被 role swap 和重复 family revelation 伤害；dramatic shape 被 0.41% incidence、71% focal lives 为零、elder-testimony loop 伤害。

## 7. 下一步修订

1. **先修 chronology。** 用 elapsed year（`from.year`）或推进 header month；加“任何 event date 不得超过 world.date”的测试。1914-01 / 1914.09 矛盾是玩家第一眼看到的。
2. **加 per-life drama director 与 per-kernel cooldown。** 保证多数成年 lives 有 2–3 个 spaced kernel 事件；cooldown 按 `kernelId + personId`，不是 compiled scene；`the-name-is-restored` 后加 `oncePerPerson`/`notHasFlag`；cap state ticks（24 个月一次、最多两次），加 3–5 个 follow-up consumer。放宽 `p21-secret-heir` / `p21-false-confession` gate，或 seed 前置。目标 50–60% 成年 lives，不是 0.41% event share。
3. **修 role casting 与命名。** Josef Bauer 被投成 “mother”；first-friend 可让另一个 child 当 subject、player child 当 friend。加断言：child scene 的 subject 必须是 child；parent role 性别匹配；同名人物（Rosa/Rosa Lechner、Josef/Josef Bauer）加 disambiguating epithet。
4. **让后果可检查。** 显示 `p21-scandal-web` 四个参数条或“谁知道”列表；trace 记录 matched adaptive context IDs、weight、base/effective DC、check breakdown；给 state creation 加 `causes` 链接到 follow-up。否则 71 contexts / 25 consumers 是不可见机器。
5. **修视觉/历史身份。** 用更大的 portrait bust 或至少婴儿摇篮/儿童姿势替换/增强 LPC sprite；出生页用 260px 肖像；替换静态 1912 “此刻的世界”和 1900 landing copy；加 1914 边界 toggle 或明确标注“现代地理底图”。当前地图是真实地球，不是 1914 世界。

## 8. 结论

Phase 21 **两者都是**：真实的视觉/早期人生成功，也是 pack 层面的戏剧内容成功；但它**不是 player-experience 层面的 “make it a game” 成功**。

可以声称：肖像 bug 修好（260px stage、216px canvas）；地图 177 country paths、Vienna/Klosterneuburg pins 可用；birth text 有家庭细节；7 年 cohort 16 条 child/family 事件；drama pack 16 kernels/71 contexts/16 checks/224 compiled scenes；自然 run 174 world/19 focal drama、两个 states、repeatRate 0.2206；若干场景确实强；独立分数 **Scene 24/30、Life 19/30**。

不能声称：“make it a game” 已达成；drama 已是主纹理；0.41% focal 可接受；“14/16 kernels” 等于玩家看到 14；16 个 kernels 都可达；adaptive contexts 改变 prose 或可检查；states 可见/有意义；0–5 无 gap；地图是历史地图；肖像漂亮或 DoL 级；drama density 比 Phase 20 高（实际更低）；repeatRate 已修；16 条 child/family 事件都以 child 为主角。Phase 21 是更强的基础，不是完成的游戏。

## 9. Main Agent 修订响应

Critic 读的是修订前 dossier。Main Agent 的响应限定在可验证修正，不把未重跑的内容写成已完成：

- **已修 chronology**：ordinary event 现在用 elapsed year 的 `addMonths(from, eventMonth-1)`，不再盖 target.year 的随机未来月份；新增 `tests/v4-player-life.test.ts` 的 “never stamps an ordinary event after the world clock” 断言；自然 A/B/C 已重跑，最终数字以重跑后的 `phase-15-phase21-a/b/c.json` 与 `phase-21-playtests.json` 为准。
- **已修 birth detail 截断**：`details.slice(0, 2)` 仍可能丢 siblings/crowding；本轮没有改，列为下一轮。
- **已修 `.portrait` 2px**：260px stage / 192×192 Canvas / 裁边 LPC；素材失败 fallback。
- **已替换地图**：`ViennaMap` → `countries.geojson` 177 paths；现代地理底图，不是历史边界。
- **已加早期场景**：5 个通用场景 + feeding/fever rate；Engine 7 年 16 条 child/family 事件。
- **已注册 drama pack**：16 kernels/2 states/71 contexts/16 checks/16 conditional/224 scenes；chronology 修复后自然 **61,718 events / 5,123 focal**、drama **203 world / 22 focal（0.43%）**、repeatRate **0.2423**、badDates 0；10/16 kernels 出现；`p21-elder-testimony` 重复与 `p21-secret-heir`/`p21-staged-death`/`p21-false-confession`/`p21-public-humiliation`/`p21-love-power-bargain`/`p21-revenge-ledger` 自然 0 已记录，不声称已解决。
- **未修**：per-life drama director、per-kernel cooldown、role casting/命名、state 参数可视化、trace adaptive context、LPC 美术精度、历史边界、出生 detail 截断、first-friend subject swap。它们是下一轮首要工作。

Critic 的 **Scene 24/30、Life 19/30** 仍是修订前评分；本响应不修改它。
