# Phase 22 — Independent Critique and Revision Response

日期：2026-11-09  
Reviewer：独立 Player Experience / Literary Critic（不改代码、不改内容）  
Evidence：`phase-15-phase22-a/b/c.json`（修订前）、`phase-22-playtests.json`、`phase-22-playtests.md`、`phase-22-creative-direction.md`、`phase-22-dramatic-content.md`、`phase-22-visual-design.md`、`phase-22-portrait.png`、`phase-22-adult-portrait.png`、`phase-22-birth-portrait.png`、`phase-22-browser-final.png`、`pack-dramatic-overhaul.json`、`pack-early-life-drama.json`、`pack-dramatic-lives.json`、`OriginalPortrait.tsx`。  
Baseline：Phase 21 Critic — Scene **24/30**、Life **19/30**；Phase 22 自然 A/B/C 62,267 events / 4,104 focal；drama 144 focal（3.51%）；early 119，adult 25（0.61%）；repeatRate 0.2613。

> 以下为独立 Critic 对**修订前** dossier 的判断；Main Agent 的修订响应单独记录，不把修订后的内容重新冒充为同一轮独立评分。

## 1. 分数

**Scene 24/30。Life 20/30。** Phase 21 是 24/30、19/30。Phase 22 是真实的内容扩张和真实的视觉替换，但不是完成的 Creative Overhaul。Aggregate drama 数字确实变好；玩家体验仍有相同的结构性问题，并新增一个视觉占位。

## 2. 戏剧密度：7× 是真的，3.08% 不是“成年戏剧”

113 focal drama / 3,674 = **3.08%**，从 0.43% 提升是真实的。但 **69/113 是早期人生事件**；只有 **44 是成年戏剧**，即 **1.20% focal**。24 个 focal lives 中 **13 个没有成年 drama**，只有 **3 个**达到 2–4 个成年事件。两个人物（A Emil 9、B Mitzi 11）占 **20/44，45%** 的成年 drama。所以“多数人生遇到戏剧”只在把 early-life omen 算进去时成立；“多数成年人生有 2–4 个 kernel 事件”是假的。

世界分布也集中。20 个 overhaul kernels 都出现了，但 **8 个 ≤6 世界事件**，top 10 占 **595/641（93%）**。`p22-child-matchmaker` 单独 **203/641（32%）**——最常见的“新戏剧”是孩子把相册带到学校，不是高风险反转。承诺的 5 comic / 5 romantic / 5 dark / 5 warm 在实际游玩中不是平衡的：warm 240、dark 218、comic 110、romantic **73（11%）**。五个 romantic kernels 里三个几乎死掉（`p22-love-letter-serial` 3、`p22-two-weddings` 3、`p22-bureaucratic-reunion` 3）。Pack 是长尾 + warm/dark 头部，不是平衡 overhaul。

好场景确实好：

- `p22-enemy-wedding/the-bride-names-the-debt`（A Emil 1940-01）：“新娘在圣坛前没有说‘愿意’，而是从袖子里抽出那张借据，念出了七年来每一笔利息……散场后，借据被钉在教堂门口的告示板上。” 公共、具体、残酷得恰到好处。
- `p22-apology-proposal/the-editor-adds-a-question`（A Emil 1941-01）：“Marie Huber为了版面好看，把道歉信末尾改成了一句问句……Emil赶到编辑部时，印刷机已经开始印第二版。” 真正的喜剧引擎，不只是阴暗。
- `p22-inherited-debt/the-house-was-already-sold`（A Emil 1942-05）：“他站在门口，手里攥着一把打不开的钥匙，身后是还没搬进去的箱子。他把钥匙插进锁孔，听见里面有人走动的声响。” Pack 里最好的单一意象。
- `p22-forged-review/the-real-critic-was-alive`（C Lena 1931-01）：“那位‘死去’的评论家拄着拐杖走进编辑部，说自己只是去了趟格拉茨……那天晚上，歌剧院的海报被一张张撕下来。”
- `p22-goat-heir/goat-sold-at-auction`（C Rosa 1936-08）：“买主把它牵走时，它回头看了一眼那栋楼。” 荒诞、忧郁，不解释自己。
- `p22-cursed-lottery/the-ticket-was-already-claimed`（C Hedwig 1944-01）：“领奖人是一个三年前去世的人……Hedwig站在窗口前，忽然想起这张外套是从旧货市场买来的。”
- `p22-opera-benefit/the-critic-comes-in-person`（B Josef 1935-01）：“观众先是安静，然后开始退场……他站在台边，听见自己的名字被念成另一个人的名字。”

Wallpaper 也清楚。`p22-child-matchmaker/the-album-is-shown-at-school` 在 B Mitzi **1937-01、1940-01、1947-01** 触发，同 outcome、同文本，只换敌人名字。`p22-forged-review/the-review-becomes-a-school` 在 C Anton **1933-01、1934-01** 一年内触发，尽管 cooldown 4 年，因为 compiled context/milieu 变了。Cooldown 仍是 per compiled scene，不是 per `kernelId + personId`；这正是 Phase 21 `elder-testimony` 失败换了衣服。`p22-dead-voice-child` 和 `p22-enemy-wedding` 也在 B Mitzi 重复两次。报告不能说 cooldown/repetition 已修。

## 3. 早期人生：纸面上多样，游玩中前重后轻、偏诡异

16 个 early kernels 在前提上是真改进：家庭中心，最好的有触感：

- `p22-warm-fathers-letter/the-recipe-arrives`（A Emil 1912-12）：“里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。”
- `p22-comic-name-register/the-clerk-hears-a-sneeze`（B Klara 1912-12）：“登记员把Klara打喷嚏的声音当成了名字，低头就写……等到拿着纸回家，才发现孩子的名字里多了一个‘嚏’。”
- `p22-drama-fire/the-neighbour-catches-the-child`（B Mitzi 1914-04）：“孩子的头发全是烟味，人还醒着，邻居的手一直抖，孩子记得。”
- `p22-drama-sibling-runs-away/the-sibling-was-hiding`（C Josef 1918-12）：“两个人蹲在煤灰里，谁也没有先说话，煤灰沾在两个人的膝盖上。”
- `p22-strange-cradle-secret/the-bundle-in-the-lining`（B Rosa 1912-07）：“一小块油布，里面包着一张当票和一缕头发……她看了很久，又把油布缝回去，针脚比原来更密。”
- `p22-warm-naming-feast/the-name-is-too-long`（B Mitzi 1912-12）：“两个祖母的名字都想要，最后写在纸上连成一串……蛋糕上只插了一根蜡烛。”

孩子是 schema subject，但常常不是 agent。婴儿期可以接受；3–7 岁偏弱，太多 kernel 是 caregiver 记得/害怕什么。好反例是 `p22-drama-inheritance-papers/the-child-remembers-the-number`：“孩子忽然念出一串数字，说是‘那天在桌上听见的’。” 那才是孩子推动情节。

Role/POV 问题没有修。男性 caregiver 被叫“她”：`p22-strange-cradle-secret/the-ticket-is-redeemed`（A Emil 1912-05）“Josef Bauer拿着当票去赎……回家后她把勺子塞进Emil手里”；`p22-strange-doctor-prediction`（C Emil 1912-04）“Josef Bauer把这句话记了很多年；每年春天，她都要说一遍.” 女性 subject 被叫“他”：B Lena 的 `p22-mistaken-inheritance/the-estate-comes-with-a-family` 结尾“他把借据一张张摊开”；C Lena 的 `p22-apology-confession/the-confession-is-believed` “天黑时，Lena还没有回家。他在笔录上签了字.” `p22-drama-sibling-runs-away` 硬编码“哥哥”，B Mitzi 的 sibling 也叫 Mitzi Lechner；文本变成“邻居说在车站看见Mitzi Lechner……Mitzi问哥哥呢.” `p22-warm-night-move` 有“Rosa Lechner抱着摇篮，Rosa抱着一只枕头”——一句话两个 Rosa。Phase 21 的 Josef-as-mother bug 没解决。

分布不连续。24 个 focal lives 中我数到 **69** 个 early-pack kernel 事件，不是 playtests 里的 107；差距未解释。69 个中 **51（74%）是 0–2 岁**，只有 **18（26%）是 3–7 岁**。四个 seed-A focal lives 有 **0** 个 early-pack 事件。0–7 日志仍有 8–24 个月空档。**14/69** 事件低于 kernel min age：`p22-drama-fire` 2 岁（min 3）、`p22-comic-job-or-child` 3 岁（min 4）、`p22-drama-sibling-runs-away` 3 岁（min 4）。两个 early kernels 从未出现：`p22-strange-midwife-face` 和 `p22-drama-factory-accident` 0 world。早期 pack 不是“continuous”，是出生前重、之后稀疏，而且更诡异而不是温暖：strange 26/69、comic 22、warm 13、dramatic 8。孩子最初几年被医生和摇篮支配，不是命名宴。

## 4. 视觉身份：真实替换，仍是程序员 SVG

婴儿肖像最好：软帽、圆脸、小肩、蓝色上衣，像婴儿。成年肖像是失败：Arthur Schnitzler 是宽脸、长黑发、灰西装、白口袋巾，没有胡子、没有 1918 维也纳轮廓、没有可辨认 likeness；可以是任何成年 NPC。同一屏左边 **55 岁**，日志头 **56 岁 · 晚年**，身份 **学生**。出生预览是小型通用头像。

代码解释：每个成人用同一 `headW=78`、`headH=92` 几何和同一眼睛/嘴路径；`longHair` 在 `style % 4 === 2` 时男性也会变长；`glasses` 由 coat/student 推导；配件是徽章。没有 beard/mustache 层，尽管 visual-design 写了“胡须阴影”。这是对 LPC 的真实替换——分层 SVG、年龄阶段、服装、状态配件——但不是 real art overhaul。单一最大弱点是 **sameness**：脸是面具，不是肖像；没有骨相、阶层、时代、个人历史。Character art 4.5/10、visual identity 4/10 是公平的。周围 UI（深绿/金、地图、字体、三栏）比美术强得多。

## 5. 五分钟玩家判断：第一分钟更好，仍不是让人停不下来的游戏

第一分钟更好：家庭细节、可见肖像、真实地图、时代面板。但提供的截图有硬 immersion break：`phase-22-birth-portrait.png` 日期 **1954 年一月**，但“此刻的世界”仍写“奥匈帝国进入第二个十年……战争、配给和流感还没有发生”；`phase-22-adult-portrait.png` header **1918 一月**，右侧“时代”第一条却是 **“十一月 1918 停战与帝国解体”**——未来已经在屏幕上。同屏 55/56 岁、55 岁“学生”。这不是 cosmetic；它告诉玩家世界时钟不可信。

循环仍被动。30 秒/年，5 分钟约 10 年；新成年戏剧从 18 岁开始，所以五分钟玩家看到童年/学校，不是婚礼/债务/彩票。早期 pack 给 1–3 个记忆点（常常是医生/摇篮/洗礼），然后长空档。没有选择、目标、关系管理，反馈只有 pulse 和 refresh。历史/life-sim 玩家可能留下；普通玩家五分钟之后理由不足。声称的 `phase-22-browser-final.png` 在 `docs/v4/` 不存在；唯一完整浏览器证据是出生和成年屏。0–5/drama/map 互动没有被视觉证明。

## 6. 文学质量

十五个代表场景，0–2：

| # | Scene | Score |
|---|---|---:|
| 1 | `vienna-life-birth-letter-from-the-dead/the-letter-is-real` | 2 |
| 2 | `p22-warm-fathers-letter/the-recipe-arrives` | 2 |
| 3 | `p22-strange-doctor-prediction/the-doctor-writes-nothing` | 2 |
| 4 | `p22-comic-name-register/the-clerk-hears-a-sneeze` | 2 |
| 5 | `p22-drama-fire/the-neighbour-catches-the-child` | 2 |
| 6 | `p22-warm-night-move/the-cradle-goes-first` | 1 |
| 7 | `p22-drama-sibling-runs-away/the-neighbour-saw-him` | 1 |
| 8 | `p22-enemy-wedding/the-bride-names-the-debt` | 2 |
| 9 | `p22-apology-proposal/the-editor-adds-a-question` | 2 |
| 10 | `p22-inherited-debt/the-house-was-already-sold` | 2 |
| 11 | `p22-mistaken-inheritance/the-estate-comes-with-a-family` | 1 |
| 12 | `p22-forged-review/the-real-critic-was-alive` | 2 |
| 13 | `p22-apology-confession/the-confession-is-believed` | 2 |
| 14 | `p22-child-matchmaker/the-album-is-shown-at-school` | 1 |
| 15 | `p22-family-legend/a-detail-goes-missing` state tick | 0 |

**Scene 24/30。** 十个 2，四个 1，一个 0。Phase 21 是 24/30（八个 2、六个 1、一个 0）。上限更高（喜剧和温暖是真的），但地板一样，重复更糟。

六维：Specificity 4、Causality 3、Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 4 = **Life 20/30**。Phase 21 是 19/30；只有 dramatic shape 提升。Specificity 保持（李子饺子、当票、名字里的“嚏”、半个“冬”字、打不开的钥匙）；Causality 没有（每个 sampled drama event `causes: []`，matched adaptive context/weight 不在 trace，state 参数不可见）；Character continuity 没有（belief/goal 不变，肖像一张脸，55 岁学生）；Relationship continuity 没有（Rosa/Rosa、Mitzi/Mitzi、sibling 叫“哥哥”、重复 family revelation）；Historical texture 只在文本里，不在框架（1954/1912 copy、1918 future sidebar）；Dramatic shape 场景层更好，但成年 incidence 仍 1.20%、13/24 成年 lives 为零。

## 7. 下一步修订

1. **Per-kernel/per-person cooldown 和 dedupe。** Key cooldown by `kernelId + personId`，不是 compiled scene。给 revelation kernel 加 `oncePerPerson`。修 `p22-child-matchmaker`（B Mitzi 1937→1940，3 年 vs 5 年 cooldown）和 `p22-forged-review`（C Anton 1933→1934，1 年 vs 4 年）。这是 repeatRate 的直接修复。
2. **重新平衡 early life 并强制 age gates。** 降 `p22-strange-doctor-prediction`（11 focal/15 world）、`p22-strange-cradle-secret`（12/20）、`p22-comic-mistaken-child`（155/4）、`p22-strange-grandmother-voice`（147/3）、`p22-warm-fathers-letter`（109/3）的 baseRate/weight；给高频 outcome 加 2–3 个文本变体；保证 3–7 岁 focal 事件不少于 0–2；修 14/69 below-min-age；让两个 dead kernels 可达或删除。
3. **修 role casting、pronoun、名字。** 加断言：caregiver sex/pronoun、subject pronoun、sibling sex、parent sex、unique display names、child-as-subject。具体失败见上：Josef Bauer“她”、Lena“他”、Mitzi Lechner“哥哥”、Rosa/Rosa、Emil Weiss/Emil。
4. **让 State 可见、不重复。** 四个新 State 产生 **282 个 focal state events，只有 96 个 distinct texts**；`p22-family-legend/a-detail-goes-missing` 重复 **13×**，`p22-child-omen/the-coincidence-repeats` **11×**，`p22-scandal-engine/a-new-scandal-feeds-it` **5×**。显示 3–4 个参数条或“谁知道”列表；cap ticks；按参数 band 写 tick 文本。否则“4/4 states appear”是 wallpaper claim。
5. **修视觉/历史身份和证据。** 加 3–5 个脸型、8–12 个发型、1912/1918/1938/1955 时代服装、mustache/beard 层、每个年龄 3 个表情。修 1954 出生页的 1912 copy、1918 sidebar 的未来条目、55/56 + “学生”矛盾。产出缺失的 `phase-22-browser-final.png`，展示 0–5、drama、地图、肖像。

## 8. 结论：两者都是，但不是完成的 Creative Overhaul

Phase 22 是 **真实的内容成功 + 视觉占位**。内容注册、生成、偶尔优秀：20/20 overhaul kernels 出现、14/16 early kernels 出现、113 focal tagged events、若干值得引用的场景。视觉是对 LPC 的真实替换，不是换色 sprite。但玩家体验没有被 overhaul：成年戏剧 1.20%、13/24 成年 lives 为零、repeatRate 回归 0.2586、State 不可见且重复、role/POV bug 仍在、早期前重后轻、历史框架自相矛盾。

可以声称：62,267 events / 4,104 focal；144 focal tagged drama（3.51%）；early-pack 119 focal / 1,283 world（2.06%）；adult drama 25 focal（0.61%）；18/20 overhaul kernels appeared、15/16 early；4/4 states appeared（`p22-child-omen` 39 adds）；repeatRate 0.2613；browser e2e 9.4s；原创 200×240 layered SVG bust 替换 LPC；Scene 24/30、Life 20/30。

不能声称：“drama is now the main texture”；“most adult lives have 2–4 drama events”（3/24）；“3.08% is adult drama”（1.20%）；“0–5 is continuously alive”（69 focal early events、74% age 0–2、4/8 seed-A lives zero）；“all 16 early kernels are reachable”（2 zero）；“17/20 overhaul kernels appeared”（20/20 appeared，但 8 个 ≤6 events，两个 zero 在 early pack）；“cooldown fixed”；“role casting fixed”；“states are meaningful/visible”；“chronology and dynamic era text are fixed”；“portrait is DoL-level or historically recognizable”；“browser-final screenshot exists”；“five-minute experience is fixed”。

Phase 22 是比 Phase 21 更强的内容基础，最好的新场景确实好；它不是报告描述的那个完成 Creative Overhaul。

## 9. Main Agent 修订响应

Critic 读的是修订前 dossier。Main Agent 的响应限定在可验证修正：

- **已修 age gates**：ordinary event 现在按 person birthday 与 scene minAge clamp event date；不再有 2 岁触发 min 3 的事件。
- **已修 cooldown key**：scene history/cooldown 现在按 base `kernelId + personId` 记录，context/milieu 变体共享 cooldown；减少 `p22-child-matchmaker`/`p22-forged-review` 一年内重复。
- **已修 chronicle future**：API chronicle 现在按 year+month 过滤，1918-01 不再显示 1918-11。
- **已修 birth 动态文本**：`birthWorldText(year)` 按 1912/1914/1918/1934/1938/1945/1955 分段；1954 出生页不再显示 1912 copy。
- **已修部分 pronoun/name**：Josef “她”、Lena “他”、sibling “哥哥”、Rosa/Rosa 的具体文本；未全库修。
- **已降 State tick**：四个新 State tick 从 12 个月改为 24 个月；仍不能声称不重复。
- **已重新跑自然 A/B/C**；最终数字以 `phase-22-playtests.json` 为准。Critic 的 **Scene 24/30、Life 20/30** 仍是修订前评分；不冒充修订后。
- **未修**：per-kernel `oncePerPerson`、early pack 高频降权/文本变体、全库 role/pronoun/name、State 参数可视化、原创肖像脸型/时代服装、浏览器最终截图（本轮会补）、成年 drama 1.20% 的结构性分布。
