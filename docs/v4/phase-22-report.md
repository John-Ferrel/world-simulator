# Phase 22 — Creative Overhaul 实施报告

日期：2026-11-09  
基线：Phase 21 `10925ba` — 113 states / 2,124 kernels / 32 packs；Critic Life 19/30、Scene 24/30；自然 A/B/C 61,718 events / 5,123 focal；drama 0.43% focal；repeatRate 0.2423。  
设计：`docs/v4/phase-22-creative-direction.md`  
戏剧内容：`docs/v4/phase-22-dramatic-content.md`  
视觉：`docs/v4/phase-22-visual-design.md`  
试玩：`docs/v4/phase-22-playtests.md`  
Critic：`docs/v4/phase-22-critique.md`

## 1. 结论摘要

Phase 22 是真实的 **内容 + 视觉替换**，但不是完成的 Creative Overhaul。

- **内容**：新增 `pack-dramatic-overhaul`（20 kernels / 2 states / 100 adaptive / 20 checks / 20 conditional / 280 scenes）和 `pack-early-life-drama`（16 kernels / 2 states / 49 adaptive / 8 checks / 16 conditional / 224 scenes）；新增 3 个早期 base scenes；4 个高频 base scene retrofit；`high_drama` ×1.9 / `drama` ×1.4 权重层。
- **规模**：**117 states / 2,160 kernels / 34 packs**。
- **自然 A/B/C**：62,267 events / 4,104 focal；**144 focal drama（3.51%）**，其中 **early 119**、**adult 25（0.61%）**；early-life pack **1,283 world（2.06%）**；4/4 新 State 出现；repeatRate **0.2613**。
- **视觉**：LPC 64×64 被 **原创 200×240 分层 SVG 半身像**替换；年龄、发型、服装、职业配件、fame/scandal/grief/chronic-illness/debt/curse、情绪/健康、死亡都有层。
- **浏览器**：`tests/v4-browser/phase22.spec.ts` 通过（9.4s）；`docs/v4/phase-22-browser-final.png` 显示 1913/1 岁、7 条记录、原创婴儿肖像、真实世界地图、早期家庭故事。

## 2. 内容

### 2.1 Dramatic Overhaul

20 kernels、2 states、100 adaptive contexts、20 checks、20 conditional outcomes。Tone mix：5 comic、5 romantic、5 dark、5 warm。强场景：

- `p22-goat-heir`：山羊继承整栋楼，钥匙挂在角上。
- `p22-enemy-wedding`：新娘在圣坛前念出七年利息，借据钉在教堂门口。
- `p22-apology-proposal`：道歉信被编辑改成问句，印刷机开始印第二版。
- `p22-inherited-debt`：继承的房子三年前已卖掉，钥匙插进锁孔听见里面有人走动。
- `p22-dead-voice-child`：孩子说起死人的口头禅，邻居上门问话。
- `p22-forged-review`：死去的评论家拄拐走进编辑部。
- `p22-cursed-lottery`：领奖人是一个三年前去世的人。

自然命中：18/20 kernels 出现，但 `p22-banker-novel`、`p22-cursed-lottery` 为 0；`p22-lost-circus`/`p22-love-letter-serial`/`p22-blacklist-soup` 仅 1。`p22-child-matchmaker` 221、`p22-strange-grandmother-voice` 252、`p22-comic-mistaken-child` 244 是高频头部。

### 2.2 Early-Life Drama

16 kernels、2 states、49 adaptive contexts、8 checks、16 conditional outcomes；8 infancy + 8 childhood；baseRate 0.32–0.50。强场景：

- 死去的叔叔寄来李子饺子食谱。
- 登记员把孩子打喷嚏的声音写进名字。
- 摇篮衬里缝着当票和一缕头发。
- 匿名礼物、命名宴、夜间搬家、火灾、兄弟姐妹出走、继承文件调包。
- 医生留下半个“冬”字，孩子报出旧宅包裹编号。

自然命中：15/16 kernels 出现；`p22-strange-midwife-face` 0、`p22-drama-factory-accident` 2；`p22-child-matchmaker` 221 是最高频。

### 2.3 Retrofit

- `vienna-family-courtship`：fame/public-scandal/grief/debt adaptive contexts。
- `vienna-life-school-enrolment`：fame/blacklisted/grief。
- `vienna-life-injury-recovery`：chronic-illness/debt/fame。
- `vienna-life-child-labour`：debt/raising-child/fame。
- 新增 `vienna-life-birth-letter-from-the-dead`、`toddler-wrong-cradle`、`child-inherited-wish`。

## 3. 视觉

- `OriginalPortrait`：200×240 SVG；背景光环、肩/胸、头/颈/耳、头发、眼/眉/鼻/嘴、脸颊/皱纹、服装/领口/纽扣/领结、眼镜/耳环、fame 金别针、scandal 暗围巾、grief 黑臂章、debt 补丁、curse 红线、死亡灰度、病容。
- 年龄阶段：婴儿软帽/大头、幼儿、儿童、少年、成年、老年灰发/披肩/皱纹。
- 自动外观：医生/官员/作家/教授外套+领结+眼镜；学生背带；士兵肩章；艺术家围巾；工人围裙。
- 截图：`phase-22-portrait.png`（婴儿）、`phase-22-adult-portrait.png`（Arthur Schnitzler 成年）、`phase-22-birth-portrait.png`、`phase-22-browser-final.png`。
- 独立 Visual Critic 给 Character art **4.5/10**、Visual identity **4/10**：真实替换 LPC，但仍是程序化半身像，不是 DoL 级；最大弱点是“同一张脸/头骨”。

## 4. 独立 Critic

独立 Player/Literary Critic（修订前 dossier）给 **Scene 24/30、Life 20/30**；Phase 21 是 **24/30、19/30**。这是 **+1 Life / +0 Scene**，不是完成 overhaul。Visual Critic 另给 Character art **4.5/10**、Visual identity **4/10**。

Critic 的具体判断：

- **3.51% 不是成年戏剧**：144 focal drama 中 119 是 early-life，adult 只有 25（0.61%）；24 个 focal lives 中 13 个没有成年 drama，只有 3 个达到 2–4 个成年事件。
- **新 pack 世界分布集中**：top 10 overhaul kernels 占 595/641；`p22-child-matchmaker` 203/641；romantic 5 kernels 只有 73 世界事件，三个几乎死掉。
- **重复仍严重**：`p22-child-matchmaker` 在 B Mitzi 1937/1940/1947 重复；`p22-forged-review` 在 C Anton 1933/1934 一年内重复；cooldown 仍按 compiled scene，而不是 `kernelId+personId`。
- **早期人生前重后轻**：69 个 focal early 事件中 51（74%）在 0–2 岁；3–7 岁只有 18；14/69 低于 kernel min age；两个 early kernels 0。
- **Role/POV bug**：Josef Bauer 被叫“她”、Lena 被叫“他”、sibling 硬编码“哥哥”、Rosa/Rosa 同句；Phase 21 的 bug 未全修。
- **视觉**：原创 SVG 是真实替换，但同一张脸/头骨；Arthur 55 岁仍像通用 NPC；出生页 1954 仍写 1912（已修）；1918 sidebar 出现 1918-11（已修）；55/56 + 学生（已修）。
- **分数**：Scene 24/30、Life 20/30；Specificity 4、Causality 3、Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 4。

Main Agent 修订响应（不改变 Critic 的 20/24）：

- 已修 age gates（event date 按生日/minAge clamp）、cooldown base kernel key、chronicle month filter、动态出生文本、部分 pronoun/name、State tick 24 个月；重跑 A/B/C。
- 未修：per-kernel `oncePerPerson`、early 高频降权/文本变体、全库 role/pronoun/name、State 参数可视化、原创脸型/时代服装、adult drama 1.20%→0.61% 的结构性分布。
- 最终数字以 `phase-22-playtests.json` 为准；Critic 分数仍是修订前评分。

## 5. 测试与命令

```bash
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm v4:story-editor
pnpm v4:phase20-lives 45 phase22-a,phase22-b,phase22-c
pnpm exec vitest run tests/v4-phase22-content.test.ts tests/v4-vienna-life.test.ts tests/v4-player-life.test.ts
LD_LIBRARY_PATH=.data/browser-libs/root/usr/lib/x86_64-linux-gnu \
  pnpm exec playwright test --config playwright.v4.config.ts tests/v4-browser/phase22.spec.ts
pnpm exec tsc --noEmit
pnpm build
pnpm test
```

| 命令 | 结果 |
|---|---|
| `pnpm v4:validate-packs` | **34 packs / 0 failed**；`pack-dramatic-overhaul` 280 scenes、`pack-early-life-drama` 224 scenes，errors 0 |
| `pnpm v4:content-catalog` | **117 states / 2,160 kernels / 34 packs**；45 high-similarity pairs |
| `pnpm v4:creative-index` | 2,160 records；45 high-similarity pairs |
| `pnpm v4:story-editor` | 2,160 kernels / 2,129 distinct shapes |
| `pnpm v4:phase20-lives 45 phase22-a,phase22-b,phase22-c` | 62,267 events / 4,104 focal；total drama 144（3.51%），early 119，adult 25（0.61%）；repeat 0.2613 |
| `pnpm exec vitest run tests/v4-phase22-content.test.ts tests/v4-vienna-life.test.ts tests/v4-player-life.test.ts` | 14/14 passed |
| `tests/v4-kernels.test.ts` | 2/2 passed |
| `tests/v4-browser/phase22.spec.ts` | **1 passed（9.4s）** |
| `pnpm exec tsc --noEmit` | 通过 |
| `pnpm build` | 通过（Vite built in 2.91s） |
| `pnpm test` | **102 files passed / 8 skipped（110）**；**576 tests passed / 37 skipped（613）**；215.72s |

## 6. 未完成与限制

- **Adult drama 只有 25 focal（0.61%）**：3.51% 总量主要来自 early-life（119）；13/24 成年 focal lives 仍没有成年 drama；不能声称“戏剧已是成年人生主纹理”。
- **repeatRate 0.2613**：高于 Phase 21 0.2423；高频 early kernels（`p22-child-matchmaker` 221、`p22-comic-mistaken-child` 244、`p22-strange-grandmother-voice` 252）与 State tick 是主要来源；per-kernel cooldown 已按 base kernel 共享，但仍不是 `oncePerPerson`。
- **早期分布前重后轻**：多数 early-pack focal 事件在 0–2 岁；3–7 岁仍偏少；`p22-strange-midwife-face` 0、`p22-drama-factory-accident` 2。
- **State 参数不可见**：`p22-scandal-engine` 318 adds、`p22-wild-fortune` 175、`p22-family-legend` 373、`p22-child-omen` 39；玩家看不到 heat/reach/leverage/shame 等条。
- **Role/POV 未全修**：已修若干具体句子（Josef“她”、Lena“他”、sibling“哥哥”），但全库 role/pronoun/name 断言仍未完成；同名 Rosa/Rosa、Mitzi/Mitzi 仍可能出现。
- **视觉不是 DoL 级**：原创 SVG 半身像，脸型/发型/时代服装仍少；出生预览与成年肖像不是历史 likeness。
- **历史框架**：动态出生文本已按年代分段，chronicle 已按 year+month 过滤；但地图仍是现代地理，没有逐年国界。
- **没有真实玩家留存数据**；本报告是浏览器 + Engine dossier，不是用户研究。
- **没有生产部署/公网验收**；没有 runtime LLM 参与本轮内容。

## 7. 结论

Phase 22 是 **真实的内容成功 + 视觉替换 + 早期人生成功**，但不是完成的 Creative Overhaul：

- 可以声称：117/2,160/34；36 个新 drama kernels；18/20 overhaul kernels 出现；early-life 1,283 world；4/4 新 State；3.51% total drama focal（但 adult 0.61%）；原创分层 SVG 替换 LPC；浏览器 e2e 通过。
- 不能声称：成年戏剧已成为主纹理；repeatRate 已修；0–5 完全连续；所有 early kernels 可达；State 可见；肖像达到 DoL 级；历史边界完成；大规模玩家留存验证完成。

下一步最值得投入：per-kernel `oncePerPerson`/cooldown、early pack 高频降权与文本变体、adult drama 权重/桥接、State 参数可视化、原创脸型/时代服装。
