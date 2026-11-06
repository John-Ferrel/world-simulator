# Phase 18 — Expanding Possibilities 实施报告

日期：2026-11-07  
基线：Phase 17 `34783ec`（79 states / 1,740 kernels / 15 generated packs）  
设计：`docs/v4/phase-18-content-design.md`  
多样性方法：`docs/v4/phase-18-content-diversity.md`  
研究：`docs/v4/phase-18-research.md`  
ADR：`docs/decisions/ADR-018-creative-index-and-content-production.md`  
Creative Index：`docs/v4/creative-index.md` / `.json`  
Catalog：`docs/v4/content-catalog.md` / `.json`  
Playtest 汇总：`docs/v4/phase-18-playtests.json`  
独立批评：`docs/v4/phase-18-critique.md`

## 1. 结论摘要

Phase 18 把内容库从 **79 states / 1,740 kernels / 15 generated packs** 扩展到 **99 states / 1,973 kernels / 25 generated packs**，新增：

- **10 个主题 Pack**；
- **233 个独立 Kernel**（目标 200–240）；
- **710 个 Outcome**；
- **20 个 State**，每个都有 creation path 与外部 consumer；
- 1 个可查询、可重建的 **Creative Index**；
- 3 个 45 年自然人生主样本 + 1 个修订后验证样本。

新增内容确实进入了游戏，而不只是 Catalog 里的数字：

- 3 个主 seed 合计 **60,074 events / 5,067 focal events**；
- 新 Pack 贡献 **5,796 个世界事件（9.65%）**和 **424 个 focal events（8.37%）**，
  Phase 17 的对应 focal share 是 **3.1%**；
- **20/20 新 State** 在至少一个自然 seed 中出现；
- **185/232** 修订前新 Kernel 在 A/B/C 至少触发一次（79.7%）；但只有 **113/232（48.7%）** 到达 focal person，约 119 个只在 NPC/世界里发生；
- 10 个新 Pack 全部在自然人生中激活；
- 每个 focal 人物至少经历一次 Phase 18 事件；但分布不均：A–D 合计 elder-memory 仅 1 个 focal event，infant 30 个，small-mysteries 13 个，love-desire 58 个，youth-fire 155 个。

但这不是完整通过：

- focal share 仍低于 12% 目标；
- repeatRate 约 **0.220**，高于 Phase 17 的 0.1965，也高于我们设定的 baseline+0.01；
- 仍有 47 个修订前 Kernel 在 3 个 seed 中一次未触发；
- `em18-family-archive` 在 A/B 中缺席，只靠 C 的稀有 `lc17-empty-nest` 分支出现，因此追加了修订；
- 独立 Critic 的评分与具体失败见第 7 节，不能用「233 kernels」替代生活质量结论。

Phase 18 因此是**规模与多样性生产成功、转化部分成功**：新内容已经出现在 focal 人生里，但还没有成为主要生活纹理。

## 2. 内容库与生产结果

### 2.1 十个 Pack

| Pack | Kernels | Outcomes | States | Stage split | Tone | 主要方向 |
|---|---:|---:|---:|---|---|---|
| `pack-infant-wonder` | 22 | 75 | 2 | infancy 2 / childhood 19 / adulthood 1 | warm, eerie, comic | 想象朋友、童年秘密、学校小残忍、病床边 |
| `pack-youth-fire` | 24 | 72 | 2 | adolescence 20 / adulthood 4 | romantic, rebellious, dark, comic | 初恋、考试背叛、危险学徒、出逃、身体与政治觉醒 |
| `pack-elder-memory` | 24 | 73 | 2 | elderhood 19 / adulthood 5 | melancholy, warm, comic | 迟来的爱、身体否决、旧档案、遗产与晚年名声 |
| `pack-odd-jobs` | 23 | 69 | 2 | adulthood 23 | everyday, comic, suspense | 夜班、放映员、动物园、殡仪馆、香水、无线电 |
| `pack-black-comedy` | 23 | 69 | 2 | adulthood 23 | absurd, comic, dark | 错拿遗产、荒唐晋升、官僚幽灵、字面祝福 |
| `pack-dark-fantasy` | 24 | 72 | 2 | adulthood 19 / elderhood 5 | eerie, dark, absurd, religious | 印记、借来的好运、鬼魂、假神迹、暧昧诅咒 |
| `pack-history-street` | 24 | 72 | 2 | adulthood 21 / elderhood 3 | historical, political, gritty, comic | 面包队、占领、配给名单、收音机谣言、战后重建 |
| `pack-love-desire` | 24 | 72 | 2 | adolescence 2 / adulthood 22 | romantic, erotic, scandalous, absurd | 不能登记的伴侣、公开欲望、婚礼拒绝、离婚与流言 |
| `pack-small-mysteries` | 22 | 66 | 2 | adulthood 17 / elderhood 5 | suspense, everyday, uncanny, comic | 错信、失物、邻居秘密、假指控、没有答案的房间 |
| `pack-money-luck` | 23 | 70 | 2 | adulthood 23 | absurd, triumphant, dark, comic | 横财、赌桌、彩票、债务、骗局、运气倒转 |

阶段分布：**infancy 4 / childhood 82 / adolescence 165 / adulthood 1,669 / elderhood 53**。  
Phase 17 为 2 / 63 / 143 / 1,511 / 21；childhood +19、adolescence +22、elderhood +32。  
非成年阶段占新增 Kernel 的 **32.2%**（75/233），超过 15% 目标。

### 2.2 结构验证

- `pnpm v4:validate-packs`：25 packs，全部 `ok: true`；
- 每个新 Pack 2 个 State、22–24 个 Kernel、66–75 个 Outcome；
- 每个新 State 有 creation path、外部 consumer、tick/reaction/transition 中的至少两类；
- 每个 Kernel ≥2 outcomes，每个 outcome 至少一个 typed effect；
- 所有新 State ID / Kernel ID 唯一；
- `pack-odd-jobs` 是 Institution 最重的 Pack：13 个 `position` effect、23 个 organization effect；
- 其他 Pack 主要使用已有 State 作为入口：97 个新 Kernel 至少消费一个 Phase 18 之前的 State；`pack-love-desire`（15）、`pack-dark-fantasy`（13）、`pack-elder-memory`（11）最多。

## 3. Creative Index

`scripts/v4-creative-index.ts` 是 Phase 18 的工程核心之一。它从 runtime 内容派生轻量创作 metadata：

- Premise、Situation、Motivation、Conflict、Twist、Outcome Pattern、Tone、Setting、Motifs；
- 中文 bigram/trigram + Latin word token，TF-IDF cosine；
- 支持 query、kernel neighbor、gaps、duplicates、单个 Pack 的 novelty audit；
- 输出 `docs/v4/creative-index.json` / `.md`，Runtime Registry 仍是唯一权威。

```bash
pnpm v4:creative-index
pnpm v4:creative-index -- --query "一个贫穷裁缝收到律师来信，继承了陌生人的城堡"
pnpm v4:creative-index -- --kernel office16-hire.protege
pnpm v4:creative-index -- --gaps
pnpm v4:creative-index -- --duplicates 0.2
pnpm v4:creative-index -- --pack packages/v4/content/states/generated/pack-elder-memory.json
```

校准过程记录在 `phase-18-content-diversity.md`：

- 初版 substring 匹配把 1,137 个 Kernel 判成 “warm”（`war` 命中 `warm`），tone 不可用；
- 现在 Latin term 使用词边界，tone 只看作者 tags/domain/title；
- 阈值从 0.15 校准到 **0.20**；最终 1,973 条记录、**43 对 ≥0.20**；
- 43 对全部是旧库内部的机械近邻或同 Pack 的 state-arc 邻接；
- **0 个新 Kernel 与旧库达到 0.20**；最高跨库邻居 0.161（infant）、0.148（elder/dark fantasy）、0.139（love-desire）。

这不是「没有重复」的证明。它是 recall/editor 工具：同母题可以保留，只要 premise/conflict/twist/outcome 有真实差异。

## 4. 多 Author 生产流程

实际执行流程：

1. Main Agent 用 Phase 17 Catalog + Creative Index 找空白：infancy/childhood/elderhood、absurd/comic/eerie/erotic、revolution/luck/supernatural 等。
2. 给 10 个 Author 分别写 Brief：主题、阶段、tone、必须复用的 State、禁止克隆、规模、验证命令。
3. 每个 Author 在写 prose 前跑 2–3 个 Creative Index 查询，报告最近 3 条与 divergence。
4. Author 只写自己的 Pack 文件，不改 registry/docs。
5. Main Agent 逐个 validate、注册、重建 Catalog/Index。
6. 运行 3 个 45 年自然 seed；用 `scripts/v4-phase18-coverage.ts` 计算 Pack activation、State lifecycle、focal share。
7. 给独立 Critic 四份 dossier 与 Pack 文本，要求具体场景与失败。
8. 根据 A/B 的 `em18-family-archive` 缺席做内容修订，再跑 D seed 验证。

Author 之间不共享草稿，只共享已提交的 library 和 Brief；这减少了互相锚定。新增 Pack 的 `author` / `model` / `sourceBriefId` / `rationale` 均保留 provenance，模型文本仍只是被 validator 接受的静态内容，不是 runtime 执行代码。

## 5. 自然人生结果

### 5.1 三个主 Seed

机器可读汇总：`docs/v4/phase-18-playtests.json`。

| Seed | Years | Events | Persons | Distinct states | repeatRate | Births / Deaths | 新 Pack 事件 | 新 Pack 占比 | Focal 新事件 | Focal share |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase18-a` | 45 | 18,909 | 326 | 64 | 0.2257 | 108 / 140 | 1,672 | 8.84% | 109 / 1,469 | 7.42% |
| `phase18-b` | 45 | 20,759 | 359 | 61 | 0.2157 | 141 / 147 | 1,956 | 9.42% | 129 / 1,556 | 8.29% |
| `phase18-c` | 45 | 20,406 | 350 | 67 | 0.2191 | 132 / 156 | 2,168 | 10.62% | 186 / 2,042 | 9.11% |
| **合计** | — | **60,074** | — | — | **~0.220** | — | **5,796** | **9.65%** | **424 / 5,067** | **8.37%** |

Phase 17 基线 focal share **3.1%**（`phase-17-critique.md`）。Phase 18 是 **2.7×**，但仍未达到本阶段设定的 12%。

### 5.2 Pack activation（A+B+C 合计）

| Pack | Kernel events |
|---|---:|
| `pack-infant-wonder` | 1,306 |
| `pack-youth-fire` | 878 |
| `pack-black-comedy` | 656 |
| `pack-money-luck` | 607 |
| `pack-odd-jobs` | 521 |
| `pack-small-mysteries` | 490 |
| `pack-history-street` | 413 |
| `pack-elder-memory` | 323 |
| `pack-dark-fantasy` | 312 |
| `pack-love-desire` | 290 |

Infant 与 youth 的高量来自阶段普适性：每个孩子都会经过 infancy/childhood/adolescence，而 elderhood 只在少数人物上出现。这不是「老年内容失败」，但说明单看事件数不能比较 Pack 质量。

### 5.3 具体自然场景

以下是自然人生中实际提交的文本（不是 forced demo）：

- **Klara, 1914.01** `iw18-infancy.ceiling-shadows/the-shadow-bows`：煤气灯芯拧到最小，天花板上挂着的大衣被风推得晃了晃。Klara 躺在摇篮里忽然笑出声，朝那片影子伸出两只手。父亲抬头看了很久，只看见衣钩和一块掉漆的墙皮。
- **Josef, 1929.01** `yf18-runaway.bundle/buy-the-ticket-tonight`：Josef 趁父亲上夜班，把储钱罐砸在窗台上。硬币滚进床缝，他趴在地上摸到最后一枚，跑去南站买了一张最便宜的单程票；售票员问要不要往返，他说不用。
- **Josef, 1930.01** `oj18-perfume.apprentice/nose-returns`：感冒三天后，鼻子像塞了棉花。十二只小瓶排在柜台上，前十一只都答错；最后一只，他说出「佛手柑和一点旧木头」。师傅把瓶子推到一边，说「记住这个味道，它比你的名字值钱」。
- **Klara, 1935.08** `oj18-cinema.reel/cut-the-reel`：第十一本胶片在片门里卷成一团。Klara 剪掉烧焦的一截，发现后面接的是一卷没送审的新闻片：军靴踏过广场，镜头扫过一张张被按下去的脸。放映员在黑暗里说「接回正片」，她照做了。
- **Klara, 1943.01** `oj18-zoo.night/child-at-the-bear-pit`：一个男孩翻过熊池矮栏去捡帽子。Klara 没有喊，只提着苹果桶绕到下风处，把桶敲得咚咚响。母熊转身时，孩子被另一个男人拽了上来；她的腿在后来的很多年里还会在梦里发软。
- **Josef, 1939.01** `hs18-purge.ration-list/warn-the-family`：Josef 趁午休跑到熟人家，说今天别去窗口，名单上已经没有他们了。对方把桌上的面包收进柜子，问是谁划的。Josef 没有回答。
- **Klara, 1951.05** `bc18-fame.wrong-bust/plaque-stays`：市立蜡像馆新添「发明家厅」。揭幕那天，Klara 看见自己的蜡像握着一根安全火柴，铭牌上写着一个从未属于她的专利号；掌声很整齐，组织者把下一场讲解的酬劳塞进口袋，动作像在递一块糖。
- **Hedwig, 1930s** `ld18-wedding.objection/the-vow-is-said` / `ld18-intimacy.hairwash/the-comb-snaps`：婚礼誓言照常说完，亲密却发生在洗头发的日常里；这两条不是同一个模板：一条是公开仪式，一条是私密照护。

这些场景来自不同的 Pack、不同的 stage、不同的 tone；它们证明新增内容不是只换名词。

### 5.4 新 State 可达性

A/B/C 合计：

- **20/20** 新 State 至少出现一次；
- A: 19/20；B: 19/20；C: 20/20；
- 唯一在 A/B 缺席的是 `em18-family-archive`；C 中由 `lc17-empty-nest` 的稀有分支带入；
- `em18-late-bloom`、`oj18-odd-apprenticeship`、`ml18-sudden-fortune`、`yf18-first-awakening`、`bc18-ridiculous-fame` 等出现量较高；
- `hs18-blackout-rumor`、`sm18-town-secret`、`oj18-workplace-legend` 出现量低，但仍然可观察。

Kernel 覆盖：

- **185/232** 修订前新 Kernel 在 A/B/C 至少触发一次（79.7%）；但只有 **113/232（48.7%）** 到达 focal person，约 119 个只在 NPC/世界里发生；
- 130 个在 3 个 seed 都触发；28 个在 2 个；27 个只在 1 个；
- 47 个 0 次，其中不少依赖罕见 State/角色组合（例如 `df18-mark.bargain-to-remove`、`sm18-legend.sealed-room`、`ml18-loan.backroom-moneylender`）；
- 没有单个新 Kernel 超过世界事件的 5%。

### 5.5 修订：`em18-family-archive`

A/B 中没有出现 `em18-family-archive`。原 creation path：

- `em18-setup.funeral-bill`：45–59 岁，需要 sibling + official，且是死亡后账单；
- `em18-family-archive.sorting-day`：60–85 岁，需要 `lc17-empty-nest`。

问题不是「定义不可达」，而是**前置条件叠加太窄**：45 年 seed 的 focal 刚到 45 岁，NPC 又很少同时满足死亡、兄弟姐妹、空巢与老年。

修订：新增 **`em18-setup.cellar-box`**，45–70 岁，无外部 State；房东卖楼，住户清地窖，拖出上一任房客的铁盒。三个 outcome：

- 把盒子搬上楼、保留并整理；
- 让收废铁的人带走，只留下戏票；
- 邻居认出盒盖上的名字，把盒子藏进衣柜。

都创建 `em18-family-archive`，参数不同；20 年 cooldown。

验证 seed `phase18-d`（45 年）：

- 21,114 events / 352 persons / 68 distinct states；
- repeatRate 0.2183；
- 新 Pack 事件 2,047（9.69%）；focal 135 / 1,550 = 8.71%；
- **20/20 新 State 出现**；
- `em18-family-archive` 1 次 add、9 ticks、6 reactions、1 次 consume；
- `em18-setup.cellar-box` 触发 1 次。

这只能说明「状态不再完全依赖 C seed 的偶然」，不能说明它已经成为常见晚年经历。

## 6. 测试与命令

```bash
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm exec tsc --noEmit
pnpm test
pnpm exec vitest run tests/v4-phase18-content.test.ts tests/v4-creative-index.test.ts
```

- `pnpm v4:validate-packs`：25 packs，全部 `ok: true`，无 validator error；
- `pnpm exec tsc --noEmit`：通过；
- `pnpm build`：通过（Vite build 3.16 s）；
- `pnpm test`：**91 files passed / 8 skipped（99 files）；533 tests passed / 37 skipped**；
- 首轮全库测试发现 2 个内容缺陷：重复标题 `楼梯间的第三个人`，以及 `{link:beloved}` / `{link:other}` 未解析 token；修复后复测通过。这不是「测试一开始就全绿」的伪造记录。
- 专项：`tests/v4-phase18-content.test.ts` 4/4；`tests/v4-creative-index.test.ts` 3/3；`tests/v4-recipes.test.ts` 4/4；`tests/v4-playtest.test.ts` 6/6。

完整机器可读 playtest 汇总：`docs/v4/phase-18-playtests.json`。

## 7. 独立 Critic

独立 Critic 阅读了 A/B/C/D 四份 dossier 和 10 个 Pack 的完整 JSON，给出：

- **Life level：17/30**（Phase 17：16/30）；
- **Scene sample：22/30**（15 个新场景，按具体性/人物特异性/后果评分）；
- 四个新内容较多的 focal lives：19、21、18、14，均值 18.0，但项目层面仍约 17/30。

Critic 确认的最强场景包括 `iw18-infancy.first-word`、`yf18-friend.two-tickets`、`yf18-apprentice.press-guard`、`em18-late-bloom.legacy-walk`、`oj18-cinema.censor`、`bc18-inherit.parrot-condition`、`hs18-occupation.lineup`、`ld18-wedding.objection`。它同时指出三组结构性重复：

- 官僚幽灵：7 个 ID 共享「纸面说 X，于是 X 发生」；
- 奇职秘密测试：23 个 ID 共享「发现机构小罪 → 收钱闭嘴或拒绝受罚」；
- 金钱运气：23 个 ID 共享「横财 → 税/家庭/丑闻抽成」。

它验证了几个报告必须承认的硬数字：

- `oj18-odd-apprenticeship` 在四个 seed 中 **537 次 state add**；
- 两个 tick 文本在 focal lives 中出现 **70 / 52 次**；
- `em18-late-bloom` 有 171 次 add，但只有 **1 个 focal scene**；
- A/B/C 世界层面 185/232 Kernel 触发，但 **focal 层面只有 113/232（48.7%）**；
- 8.37% focal share 是 Phase 17 的 2.7×，但分布极不均：love/youth/odd-jobs 12–14%，elder 0.2%、infant 1.7%、mystery 2.0%。

Critic 的结论是：**内容生产成功、转化部分成功；不是两者都成功。** 它给出的下一轮优先级是 cap/differentiate odd-jobs、让 elder-memory focal-reachable、给 small-mysteries 一条 resolution chain、合并 black-comedy ghost arc、修 youth-fire attachment continuity。

Main Agent 的回应：

- 已执行 **Revision A**：为 `em18-family-archive` 增加 45–70 岁的地窖铁盒 creation path；D seed 20/20 State，但 archive 仍只有 1 次 add。
- 已修复 QA 发现的重复标题与未解析 token；
- **未执行** odd-jobs cap、elder focal gate、mystery resolution chain、ghost arc 合并、youth attachment continuity；这些明确留到 Phase 19，不在报告中冒充已修。

完整批评、15 场景评分表与修订建议：`docs/v4/phase-18-critique.md`。

## 8. 未完成与限制

- **Focal share 未达标**：8.37% vs 12%；新内容仍不是多数 focal 生活的主纹理。
- **repeatRate 未达标**：约 0.220 vs Phase 17 0.1965；Infant/Youth 的普适阶段 Kernel 与 state-arc 重复是重要来源，但本次没有做引擎级去重。
- **47 个 Kernel 零触发**：不是全部可达；且 world-level 触发不等于 focal 触发，只有 113/232 到达 focal person。
- **`em18-family-archive` 仍然稀有**：D 中只 add 一次；修订是可达性修复，不是频率修复。
- **新 State 的 focal 分布不均**：Mitzi 只有 2 个新事件，Hedwig 6 个，Emil/Lena 19 个；自然方差与角色路径都可能造成差异，不能把 A/B/C 当成平均值。
- **Creative Index 是 lexical，不是 semantic**：它无法可靠识别同结构换皮；阈值是 editor 召回，不是自动拒绝。
- **内容评审有主观性**：Author 自评、Main Agent 整合、独立 Critic 阅读都在同一项目语境里；不是外部盲审。
- **未做 runtime LLM 叙事 / 生产 DB / 公网部署**：本阶段是离线内容生产与自然人生验证。
- Phase 17 的家庭/伴侣/生育连续性、horizon、历史日期、new→new 组合等问题仍在；Phase 18 没有声称修复它们。

## 9. 结论

Phase 18 完成了本阶段最重要的承诺：**内容世界显著变大，并且新增内容真的进入了自然人生。** 10 个 Pack 覆盖了此前稀缺的婴幼儿、童年、老年、荒诞、黑色幽默、欲望、历史街面、小谜案与金钱运气；Creative Index 让作者在写作前能看到「这个故事是不是已经写过」；20 个新 State 与 233 个 Kernel 全部通过 validator，且不是静态 Catalog 数字。

但它没有完成全部验收：focal share 仍低、repeatRate 上升、47 个 Kernel 未触发、晚年档案仍然稀有。Phase 18 应被表述为：

> **一次成功的规模与多样性扩张，一次部分成功的自然人生转化；不是生活质量问题的最终解决。**

