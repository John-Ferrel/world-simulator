# Phase 19 — Content Collisions

日期：2026-11-07  
设计：`docs/v4/phase-19-design.md`  
Opportunity Map：`docs/v4/cross-pack-opportunities.json` / `.md`  
Observed co-occurrence：`docs/v4/phase-19-cooccurrence.json` / `.md`  
Story shapes：`docs/v4/story-shapes.json` / `.md`

## 1. 诊断

Phase 18 的独立 Critic 已经给出问题清单：

- `oj18-odd-apprenticeship` 四个 seed 537 次 add；两个 tick 文本 70/52 次；
- `bc18-bureaucratic-ghost` 111 次 add，七条 Kernel 共享“文件改变现实”；
- `em18-late-bloom` 171 次 add、只有 1 个 focal scene；
- 世界层面 185/232 新 Kernel 触发，focal 层面只有 113/232；
- 8.37% focal share，分布极不均：elder 0.2%、infant 1.7%、mystery 2.0%。

Phase 19 不把“更多 Kernel”当作答案。它先找出：

1. 哪些 State 已经在同一个人身上同时出现；
2. 哪些 pair 还没有任何 Kernel 同时消费；
3. 哪些 pair 已被消费，但仍值得写不同的故事；
4. 哪些 State 只在 NPC 世界中循环。

## 2. Opportunity Map

`pnpm v4:cross-pack-map` 的当前结果：

| Metric | Count |
|---|---:|
| States | 99 |
| Kernels | 1,973 |
| Open cross-pack pairs | 3,710 |
| Already co-consumed pairs | 152 |

Open pair families（当前 107 states / 2,060 kernels）：

| Family | Pairs |
|---|---:|
| default | 2,580 |
| romance_power | 379 |
| money_crime | 299 |
| craft_luck | 275 |
| family_war | 112 |
| body_faith | 37 |
| elder_history | 28 |

这不是要求作者写 3,710 条内容。Top pairs 和 `--state` 查询只用于找到“这两个 State 已经在人物身上同时出现，但还没有故事消费它们”。

## 3. Observed co-occurrence

`pnpm v4:phase19-cooccurrence` 读取 Phase 18 的 A/B/C/D dossiers，按同一人物/家庭的 State 活跃区间计算重叠。Top 结果：

| Observed | People | State A | State B | Existing kernel? |
|---:|---:|---|---|---|
| 200 | 9 | `ml18-sudden-fortune` | `raising-child` | yes |
| 20 | 2 | `em18-family-archive` | `raising-child` | **open** |
| 18 | 2 | `em18-family-archive` | `ml18-sudden-fortune` | **open** |
| 14 | 2 | `mb17-remittance-web` | `raising-child` | **open** |
| 13 | 4 | `cursed-by-wish` | `suspected-witchcraft` | **open** |
| 13 | 3 | `oj18-odd-apprenticeship` | `wish-power` | **open** |
| 12 | 9 | `apprenticeship-contract` | `yf18-first-awakening` | **open** |
| 12 | 2 | `lc17-empty-nest` | `ml18-sudden-fortune` | **open** |
| 11 | 6 | `mb17-newcomer` | `oj18-odd-apprenticeship` | **open** |
| 11 | 5 | `office-under-siege` | `oj18-odd-apprenticeship` | **open** |

这些是 Phase 19 的优先素材。`ml18-sudden-fortune + raising-child` 已经有一个 Kernel 消费，但其他 open pair 说明世界已经把它们放在同一个人身上，内容却没有接住。

Phase 19 五个最终 dossier（A/B/C/elder/mixed）重新计算后，top open pair 包括：

| Observed | People | State A | State B |
|---:|---:|---|---|
| 159 | 12 | `ml18-sudden-fortune` | `raising-child` |
| 29 | 5 | `mb17-remittance-web` | `raising-child` |
| 8 | 2 | `eh19-late-testimony` | `em18-late-bloom` |
| 8 | 6 | `office-under-siege` | `oj18-odd-apprenticeship` |

`eh19-late-testimony + em18-late-bloom` 是 Phase 19 新 State 第一次进入真实共现表；它仍然 open，说明老年证词还有下游故事空间。

## 4. 四个 Collision Pack

| Pack | 领域 | 新 State | 目标 |
|---|---|---|---|
| `pack-collision-power-love` | romance × political power / scandal | `pl19-protected-scandal`, `pl19-public-ally` | 私情成为政治资产/负债；勒索、公开、误认、辞职后的影响力 |
| `pack-collision-family-war` | family × war / occupation / migration | `fw19-separated-household`, `fw19-war-ward` | 疏散选择、失踪者归来、儿童寄养、配给排序、家庭秘密成为迫害理由 |
| `pack-collision-luck-craft` | craft/work × supernatural luck | `lc19-borrowed-reputation`, `lc19-workshop-talisman` | 意外杰作、作弊嫌疑、师傅利用好运、宗教关注、借来的名声到期 |
| `pack-collision-elder-history` | old age / memory × historical legacy | `eh19-late-testimony`, `eh19-inherited-cause` | 老年证词、档案成为证据、孙辈重拾旧事业、迟来的道歉、被继承的历史谎言 |

每个 Pack 目标 20 个 Kernel；至少 8 个 Kernel 同时消费两个不同 Pack 的 State。具体结果见第 6 节（待集成后填写）。

## 5. Editorial process

`pnpm v4:story-editor` 生成 `docs/v4/story-shapes.json/md`：

- `shapeKey` = role topology + condition kinds + outcome effect skeleton + branch count；
- 聚类大于 1 的 shape 会列出；重复 8 字短语单独列出；
- `--pack <file>` 输出给 LLM Story Editor 的 review packet。

Story Editor 的任务不是“把所有故事改成不同模板”，而是找出：

- 官僚文件出错 → 现实被荒诞改变；
- 工作中发现秘密 → 收钱沉默或拒绝受罚；
- 横财 → 税/债主/亲戚抽成；
- 同一个“选择保护/出卖”结构换了人物和道具。

Editor 可以接受同一母题的优秀变体，但要求 premise/conflict/motivation/twist/outcome 至少两项有真实差异。

## 6. Integration result

四 Pack 已注册，库从 **99 / 1,973 / 25** 扩展到 **107 states / 2,060 kernels / 29 generated packs**。

| Pack | Kernels | States | Two-pack kernels | Notes |
|---|---:|---:|---:|---|
| `pack-collision-power-love` | 22 | 2 | 18 | 私情 × 官职/丑闻；保护网、公开盟友、勒索、媒体误认 |
| `pack-collision-family-war` | 20 | 2 | 20 | 疏散、寄养、失踪者归来、配给、家庭秘密；第二稿已重写 12 个 Kernel |
| `pack-collision-luck-craft` | 22 | 2 | 18 | 意外杰作、作坊吉祥物、借来的名声、展览到期 |
| `pack-collision-elder-history` | 23 | 2 | 20 | 老年证词、档案证据、孙辈重拾旧事业、被继承的历史谎言 |

所有 Pack 通过 `pnpm v4:validate-packs`。Power/luck/elder 各增加了 2 个 bridge kernel，让稀有 State 能从更常见的处境进入自然人生；总双 Pack Kernel 为 **76/87**。最终逐 Pack novelty：

- power-love：0 个 ≥0.20，top 0.199（`patronage-appointment` ↔ `office16-hire.protege`）；
- family-war：0 个 ≥0.20，top 0.144；
- luck-craft：0 个 ≥0.20，top 0.177（同 Pack 的 elder/workshop mascot 弧）；
- elder-history：0 个 ≥0.20，top 0.169（同 Pack 的 photo-face/old-comrade-photo）。

### 6.1 Editorial review

LLM Story Editor 读了四 Pack 与 `story-shapes` 后给出：

- **最强碰撞**：`pl19-scandal.confession`（保护网 + 公开丑闻）、`pl19-scandal.child-rumor`（私情 + 育儿）、`fw19-split.returned-father`（分离家庭 + 哀悼）、`fw19-split.other-family-claim`（战争寄养 + 占领）、`lc19-apprentice.masterpiece`（奇职 + 借来的好运）、`lc19-talisman.bad-luck`（作坊吉祥物 + 巫术嫌疑）、`eh19-testimony.late-love-list`（晚年爱情 + 政治嫌疑）、`eh19-inherited.house-lie`（继承事业 + 房产 + 家庭档案）。
- **仍然重复的结构**：power-love 的“秘密当货币”三拍（`rival-contract` / `trade`）；family-war 的“谁得到孩子”三拍（`other-family-claim` / `sibling-stays` / `returned-father` / `inlaws-claim`）；luck-craft 的“作坊把人当吉祥物”六拍；elder-history 的“继承事业三分法”十拍。
- **装饰性第二 State**：`pl19-ally.patronage-appointment`（爱人只是保护对象）、`lc19-reputation.promotion`（单 State）、`lc19-elder.workshop-mascot`（单 State）、`eh19-inherited.funeral-envelope`（late-bloom 只提供年龄）。
- **建议但本阶段未全部执行**：重写 `eh19-testimony.old-comrade-photo`（与 `photo-face` 同构）、`lc19-elder.workshop-mascot`（与 `workshop.mascot` 同椅）、`fw19-split.inlaws-claim`（第五个 custody trilemma）、`lc19-luck.exhibition-due`（横财被抽成）。

这不是“86 个故事都独特”的证明。四 Pack 的定量目标达到了，定性上大约三分之一仍是同一故事换道具；Phase 19 报告把这一点列为下一轮编辑任务，而不是隐藏。

## 7. Rhythm / continuity changes

- Odd-jobs：11 个 entry Kernel 加 `notHasState:oj18-odd-apprenticeship` / `oj18-workplace-legend`，cooldown ≥6 年；`strange-year` 改为 24 个月并加倍进度，增加 `learned-the-building` / `the-logbook-mislaid` 两个 outcome。主 A/B/C 的 state add 为 **87/95/70**，top tick 文本 **5/4/4/3**；Phase 18 为 537 adds / 70+52 ticks（四个 seed）。职业 sampler 明显收敛，但还不是完整职业系统。
- Cross-state / cross-pack：A 167/47、B 145/39、C 143/45（candidates/resolved）；多 State 场景确实被选中，但大多数仍是旧 Pack 的交叉，不是新 Pack 的下游。
- 新 State 主 A/B/C 观察 4/8；加 elder/mixed 后 6/8。`fw19-separated-household` 仍为 0；`eh19-inherited-cause` 在 mixed 出现 1 次、主 A/B/C 为 0。这是下一轮 entry 设计的明确缺口。
- 预 bridge A/B/C：16/12/5 新 Pack 事件，focal 0/0/3；bridge 后 pre-weight：25/20/24，focal 3/0/5；最终：29/14/35，focal 2/1/3。Bridge 让内容进入世界，但没有解决 focal 转化。

## 8. Natural evidence

### 8.1 自然人生汇总

| Cohort | Events | 新 Pack 事件 | 新 Pack 世界占比 | Focal 新事件 | Focal 占比 |
|---|---:|---:|---:|---:|---:|
| A/B/C 45 年 | 57,514 | 78 | 0.14% | 6 / 4,190 | 0.14% |
| elder 30 年 | 6,286 | 20 | 0.32% | 1 | 0.24% |
| mixed 35 年 | 13,966 | 59 | 0.42% | 5 | 0.36% |

- 主 A/B/C 观察 4/8 新 State；加 elder/mixed 后 6/8。
- `fw19-separated-household` 0；`eh19-inherited-cause` 只在 mixed 1 次；`eh19-late-testimony` 是主要可达新 State（elder 18、mixed 28）。
- 这是“新内容能进入世界，但 focal 仍然稀有”的诚实结果；不能把 87 个 Kernel 或 4 个 Pack 当作 focal share 已解决。

## 9. Limitations

- Open pair 不是必须写；covered pair 也不是自动合格。
- Story shape 是结构启发，不是文学判断。
- 受控实验只证明机制可执行，不代表自然发生率。
- NPC 人生也属于世界；不能要求每个 Pack 都在 focal 人物身上高频出现。
- 不声称 Phase 19 修复了家庭/伴侣 slot machine、horizon 或生产级 LLM runtime。
