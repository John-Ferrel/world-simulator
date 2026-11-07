# Phase 19 — Stories in Collision 实施报告

日期：2026-11-07  
基线：Phase 18 `4b3051b` — 99 states / 1,973 kernels / 25 generated packs。  
设计：`docs/v4/phase-19-design.md`  
Opportunity Map：`docs/v4/cross-pack-opportunities.md`  
Co-occurrence：`docs/v4/phase-19-cooccurrence.md`  
Story shapes：`docs/v4/story-shapes.md`  
Content collisions：`docs/v4/phase-19-content-collisions.md`  
Playtests：`docs/v4/phase-19-playtests.json`  
独立批评：`docs/v4/phase-19-critique.md`  
ADR：`docs/decisions/ADR-019-cross-pack-collisions-and-life-continuity.md`

## 1. 结论摘要

Phase 19 把内容库从 **99 states / 1,973 kernels / 25 packs** 扩展到 **107 states / 2,060 kernels / 29 packs**，新增：

- 4 个 Collision Pack；
- 87 个新 Kernel；
- 8 个新 State；
- 1 个 Cross-Pack Opportunity Map；
- 1 个 Observed State Co-occurrence 报告；
- 1 个 Story Shape v2 编辑工具；
- 1 个 existing-person cohort 运行方式；
- 4 个受控碰撞实验。

但 Phase 19 的主要目标不是 87 个新 Kernel，而是让已有/新增 State 真正组合。四个 Pack 的 87 个 Kernel 全部至少有 1 个 `hasState` 条件；其中 **76/87** 同时消费两个不同 Pack 的 State（power-love 18、family-war 20、luck-craft 18、elder-history 20）。每个 Pack 的新 State 都有 creation path 与外部 consumer。

自然人生与节奏：

- 3 个 45 年主 seed（A/B/C）；
- 1 个 30 年老年 cohort（existing-only，63/58/56/48/45 岁）；
- 1 个 35 年混合年龄 seed（8/14/45/63 岁 + 新生 focal）；
- 受控实验 4/4 执行了多 State 场景。

- 主 A/B/C：**57,514 events / 4,190 focal events**；新 Pack **78 事件（0.14% 世界）**、**6 个 focal 事件（0.14% focal）**；repeatRate **0.2104**。
- 老年 cohort：6,286 events；新 Pack 20 事件；`eh19-late-testimony` 18 次 add；**1 个 focal 事件**（0.24% focal）。
- 混合 cohort：13,966 events；新 Pack 59 事件；`eh19-late-testimony` 28 次 add、`eh19-inherited-cause` 1 次 add；**5 个 focal 事件**（0.36% focal）。
- 8 个新 State 中，主 A/B/C 观察到 4 个；加上 elder/mixed 观察到 6 个。`fw19-separated-household` 仍为 0；`eh19-inherited-cause` 只在 mixed 出现 1 次。
- 预 bridge A/B/C：新 Pack 16/12/5 事件，focal 0/0/3；bridge 后 pre-weight：25/20/24，focal 3/0/5；最终：29/14/35，focal 2/1/3。Bridge 让新内容进入世界，但**没有把 focal share 提升到 Phase 18 水平**。
- Odd-jobs：A/B/C 的 add 为 87/95/70，top tick 文本 5/4/4/3（Phase 18 为 70/52 across four seeds）；职业 sampler 明显收敛。
- Cross-state/cross-pack：A 167/47 candidates/resolved；B 145/39；C 143/45；cross-pack 与 cross-state 几乎同量。

## 2. 诊断

Phase 18 的独立 Critic 给出 Life 17/30、Scene 22/30，并指出：

- `oj18-odd-apprenticeship` 四个 seed 537 次 add；两个 tick 文本 70/52 次；
- `bc18-bureaucratic-ghost` 111 次 add，七条 Kernel 共享一个“文件改变现实”；
- `em18-late-bloom` 171 次 add、只有 1 个 focal scene；
- 世界层面 185/232 新 Kernel 触发，focal 层面只有 113/232；
- 8.37% focal share，elder 0.2%、infant 1.7%、mystery 2.0%。

Phase 19 的诊断结论：**内容不是不够多，而是内容之间缺少可执行的交叉入口，且高频 State 的节奏把日志填满了。**

## 3. Cross-Pack Opportunity Map 与 Co-occurrence

`pnpm v4:cross-pack-map` 从 runtime 派生：

- State consumers / creators / packs / owner / tags；
- 当前没有 Kernel 同时消费的跨 Pack pair（open）；
- 已被同一 Kernel 消费的 pair（covered）；
- collision family（romance_power、family_war、craft_luck、elder_history、money_crime、body_faith、default）；
- opportunity prompts（blackmail、evacuation choice、late testimony 等）。

当前：**107 states / 2,060 kernels / 3,710 open pairs / 152 covered pairs**。Open pair 增加不是“内容空白变大”，而是新增 8 个 State 与 87 个 Kernel 后，地图重新计算了组合空间。

`pnpm v4:phase19-cooccurrence` 读取已提交 dossier，按同一人物/家庭 State 活跃区间计算实际重叠。Phase 18 A/B/C/D 的 top open pair 包括：

- `em18-family-archive` + `raising-child`（20 次、2 人、open）；
- `em18-family-archive` + `ml18-sudden-fortune`（18 次、2 人、open）；
- `mb17-remittance-web` + `raising-child`（14 次、2 人、open）；
- `cursed-by-wish` + `suspected-witchcraft`（13 次、4 人、open）；
- `oj18-odd-apprenticeship` + `wish-power`（13 次、3 人、open）。

这些不是“必须写”的剧情，而是“世界已经把两个状态放在同一个人身上”的证据。

## 4. Collision Packs

| Pack | Kernels | States | 不同 Pack 双 State Kernel | 主要碰撞 |
|---|---:|---:|---:|---|
| `pack-collision-power-love` | 22 | 2 | 18 | 私情 × 官职/丑闻/保护网/公开盟友 |
| `pack-collision-family-war` | 20 | 2 | 20 | 家庭 × 疏散/占领/寄养/配给/归来 |
| `pack-collision-luck-craft` | 22 | 2 | 18 | 手艺 × 借来的好运/名声/作坊吉祥物 |
| `pack-collision-elder-history` | 23 | 2 | 20 | 老年记忆 × 证词/档案/政治遗产 |

新 State：

- `pl19-protected-scandal`、`pl19-public-ally`；
- `fw19-separated-household`、`fw19-war-ward`；
- `lc19-borrowed-reputation`、`lc19-workshop-talisman`；
- `eh19-late-testimony`、`eh19-inherited-cause`。

所有 Pack 通过 `pnpm v4:validate-packs`；每个新 State 有 creation path 与外部 consumer；每个 Kernel ≥2 outcomes。

### 4.1 Editorial revision

`pack-collision-family-war` 第一稿虽然 20/20 都是双 State，但 Creative Index 发现 **84 个 intra-pack pairs** 进入 top-100，最高 0.359；20/20 Kernel 的最近邻都 ≥0.20。原因是成人 + 孩子 + official/neighbor + 登记/照片/火车/交接的同一拓扑。

Author 做了第二稿：保留 20 Kernel / 2 State / 20 个双 State Kernel，重写至少 8 个 premise，增加：
- 借来的山羊与配给卡；
- 床底下的军装；
- 阵亡通知之前的遗嘱；
- 房租按人头算；
- 站台边的价码；
- 孩子叫另一个人爹；
- 工牌上的年龄；
- 点名册上的孤儿栏。

第二稿结果：**0 个 Kernel ≥0.20，最高 0.144**。这不是“文字不同”，而是 premise/conflict/role mix 真正变化。

### 4.2 新内容进入自然人生

主 A/B/C 与年龄 cohort 中实际出现的新 Pack 事件（自然提交，非 forced）：

- **Mitzi，1943.01** `pl19-bridge.first-ally/the-ally-speaks-first`：集会前助手们争论谁先上台，Otto 把外套搭在椅背上，说“我先去”，把 Mitzi 这些年替选区做的事讲了三件。Mitzi 站在侧幕后面，第一次觉得丑闻不一定只能一个人扛。
- **Emil，1938.01** `pl19-bridge.public-rumor/the-back-room-opens`：报纸卖完后，Otto 把 Emil 领进洗衣房后面的小间；桌上坐着门房、排字工和两个不肯说名字的人。他们没有问绯闻真假，只问 Emil 以后还打不打算出门。
- **Lena，1942.01** `pl19-scandal.alibi/the-alibi-has-a-price`：Gustav 愿意作证，但要在分居协议上多写一条：房子归他，Lena 保留探视权。Lena 签字后明白，“这不是帮忙，是一次结账。”
- **Luise Lechner，1940.01** `fw19-split.borrowed-goat/goat-gives-milk`：隔壁借来山羊，Ferdinand 在门口挤奶；第一碗送回去，第二碗留给他，Luise 自己舔了舔碗边。
- **Maria Kral，1934.07** `eh19-bridge.question-arrives/ask-a-neighbor-first`：她拿着问话单去敲隔壁的门，开门的人比她年轻二十岁，说那年还没搬来；两人只确认了门牌号。

这些场景证明新内容不是完全静态。但它们大多是 **bridge/entry**，不是下游 collision；主 A/B/C 的 focal 新事件只有 6 个。`eh19` 的 mixed cohort 有 5 个 focal 事件，说明老年内容需要老年观察窗口，而不是 45 年新生 cohort。

### 4.3 Novelty / editorial

最终 pack audit（阈值 0.20）：

| Pack | Kernels | ≥0.20 | Top neighbour |
|---|---:|---:|---:|
| power-love | 22 | 0 | 0.199 |
| family-war | 20 | 0 | 0.144 |
| luck-craft | 22 | 0 | 0.177 |
| elder-history | 23 | 0 | 0.169 |

Family-war 第一稿 84 个 intra-pack top-100 pairs、20/20 nearest ≥0.20；第二稿重写 12 个 Kernel，0 个 ≥0.20。Story Editor 仍指出 power-love 的“秘密当货币”、family-war 的 custody trilemma、luck-craft 的 mascot chair、elder-history 的 inheritance trilemma；这些是下一轮编辑任务，不在本报告中冒充已解决。

## 5. Story Editor v2

`scripts/v4-story-editor.ts` 从 Kernel 派生：

- role topology（subject/intimate/kin/institution/community）；
- exact state-condition skeleton；
- production targets（state_add / state_transition / position / organization）；
- outcome effect skeleton；
- branch count。

它输出：

- `docs/v4/story-shapes.json/md`；
- **state-core clusters**：同一 standing state 的不同道具；
- **production clusters**：同一 state_add 入口的不同条件；
- repeated 8-character phrases。

当前 2,060 kernels / 2,029 distinct shapes / 27 shape clusters。State-core 集群成功召回：

- 5 个 `bc18-ghost.*` Kernel 共享 `bc18-bureaucratic-ghost`；
- 10 个 `oj18-*` entry Kernel 共享 `state_add:oj18-odd-apprenticeship`。

LLM Story Editor 读取 `--pack` review packet 后给出具体修订；工具本身不调用模型、不修改 runtime。

## 6. Rhythm / continuity changes

### 6.1 Odd-jobs

- 11 个 entry Kernel 加 `notHasState:oj18-odd-apprenticeship` + `notHasState:oj18-workplace-legend`；
- entry cooldown 至少 6 年；
- `strange-year` 从每 12 个月改为 **24 个月**，进度值加倍（保持达到 transition 的年限不变）；
- 新增 `learned-the-building` / `the-logbook-mislaid` 两个 outcome 变体。

Phase 18 基线：四个 seed 537 次 add、两个 tick 文本 70/52 次。  
Phase 19 30 年 elder baseline：59 次 add、focal tick 文本 2 次（修订后），45 年 baseline：90 次 add、16/15 次。自然主 seed 的最终数字见 playtests。

### 6.2 Cross-state affinity

在现有 state opportunity lane 内，若 scene 需要 2+ distinct standing state/position：

```text
weight = base × 1.5 × (1 + 0.2 × min(3, n−1))
```

即 1.2×–1.6×，不是新的 scheduler，不改变每人每年最多一个 state scene 的上限。诊断记录 `crossStateCandidates` / `crossStateResolved`。45 年 baseline 记录 187 candidates / 32 resolved；最终主 seed 见 playtests。

### 6.3 Existing-person cohorts

`scripts/v4-phase15-lives.ts` 新增：

```bash
pnpm v4:phase19-lives 30 phase19-elder \
  --existing=person-theresia-huber,person-hedwig-stein,person-anna-moser,person-hermann-kral,person-maria-kral \
  --existing-only
```

`--existing-only` 跳过八个新生 focal，只观察 1912 年已经存在的 63/58/56/48/45 岁人物；不设置 `ownerId`，不把观察选择变成事件率特权。老年 cohort 与新生 45 年 control 分开报告。

## 7. Natural-life evidence

### 7.1 主样本 A/B/C（45 年）

| Seed | Events | Persons | Distinct states | repeatRate | 新 Pack 事件 | 世界占比 | Focal 新事件 / focal | Focal 占比 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase19-a` | 19,883 | 356 | 70 | 0.2035 | 29 | 0.15% | 2 / 1,358 | 0.15% |
| `phase19-b` | 19,499 | 321 | 68 | 0.2071 | 14 | 0.07% | 1 / 1,526 | 0.07% |
| `phase19-c` | 18,132 | 346 | 66 | 0.2205 | 35 | 0.19% | 3 / 1,306 | 0.23% |
| **合计** | **57,514** | — | — | **0.2104** | **78** | **0.14%** | **6 / 4,190** | **0.14%** |

这不是“新 Pack 主导人生”。它是“新 Pack 能进入世界，但在 45 年新生 focal 里仍然稀有”。与 Phase 18 的 8.37% focal share 相比，这个数字更低；原因是 Phase 19 的 collision 条件比 Phase 18 的日常 Pack 更窄，且主 focal 是 1912 年出生的新生队列，无法覆盖老年内容。

### 7.2 年龄 cohort

| Cohort | Years | Events | 新 Pack 事件 | Focal 新事件 | 说明 |
|---|---:|---:|---:|---:|---|
| `phase19-elder` | 30 | 6,286 | 20 | 1 | 5 个 1912 年已存在的 45–63 岁人物；`eh19-late-testimony` 18 次 add；`em18-late-bloom` 14、`hs18-street-witness` 16 |
| `phase19-mixed` | 35 | 13,966 | 59 | 5 | 8/14/45/63 岁混合；`eh19-late-testimony` 28 次 add、`eh19-inherited-cause` 1 次 add；老年证词链实际进入 Alois/Theresia 的人生 |

老年 cohort 证明 `eh19` 不是纯静态：`question-arrives` → `eh19-late-testimony` → `newspaper-caption` 在 Alois Lechner 身上形成 1946–47 的公开记忆链。主 A/B/C 没有这个窗口，不能用来否定老年内容。

### 7.3 实际跨领域场景

- **Mitzi，1943.01**：`pl19-bridge.first-ally` — 集会前 Otto 先说“我先去”，把 Mitzi 替选区做的事讲了三件；她第一次觉得丑闻不一定只能一个人扛。私情/名声 + 公共盟友。
- **Emil，1938.01**：`pl19-bridge.public-rumor` — 洗衣房后间，门房、排字工和两个不肯说名字的人只问“以后还打不打算出门”。丑闻 + 保护网。
- **Lena，1942.01**：`pl19-scandal.alibi` — Gustav 作证的代价是房子归他、Lena 保留探视权；“这不是帮忙，是一次结账。”私情 + 分居/调查。
- **Luise Lechner，1940.01**：`fw19-split.borrowed-goat` — 借来的山羊、半桶奶、第一碗还回去；战争配给下的温暖/荒诞。
- **Maria Kral，1934.07**：`eh19-bridge.question-arrives` — 她拿着问话单去敲隔壁的门，开门的人比她年轻二十岁；两人只确认了门牌号。
- **Alois Lechner，1946.01**：`eh19-testimony.newspaper-caption` — “死人需要一个好听的名字……活人还可以不说话。”那天晚上，他把照片翻过来，背面什么也没写。

### 7.4 节奏与连续性

- Odd-jobs 主 A/B/C 的 state add 为 **87/95/70**，top tick 文本 **5/4/4/3**；Phase 18 为 537 adds / 70+52 ticks（四个 seed）。职业 sampler 明显收敛，但仍不是完整职业系统。
- Cross-state / cross-pack：A 167/47、B 145/39、C 143/45（candidates/resolved）；说明多 State 场景确实被选中，但多数仍是旧 Pack 的交叉，不是新 Pack 的下游。
- 新 State 主 A/B/C 观察 4/8；加 elder/mixed 后 6/8。`fw19-separated-household` 仍为 0；`eh19-inherited-cause` 只在 mixed 出现 1 次。这是下一轮 entry 设计的明确缺口。
- 预 bridge A/B/C：16/12/5 新 Pack 事件，focal 0/0/3；bridge 后 pre-weight：25/20/24，focal 3/0/5；最终：29/14/35，focal 2/1/3。Bridge 让内容进入世界，但没有解决 focal 转化。


## 8. 独立 Critic

独立 Critic 阅读五个 cohort、四个 Pack、pre/post bridge 数据后给出：

- **Life level：17/30**（Phase 18：17/30；没有提升）；
- **Scene sample：21/30**（Phase 18：22/30；不向上取整）；
- 严格双 Pack Kernel 为 **76/87**，不是 78/86；
- 修订前 154 个新 Pack 事件中只有 **10 个**消费新 State，**80 个**是 bridge；只有 **3 个 focal 事件**消费新 State；
- 主 A/B/C focal collision share **0.14%**；修订前 elder 21/23、mixed 39/41 来自 `question-arrives` 一个无 State 问卷；
- `fw19-separated-household` 0 adds、`eh19-inherited-cause` 0 adds（修订后 mixed 1）；
- family-war 最频繁的场景是 `borrowed-goat` 21 次，custody 只有 1 次；elder-history 的 inherited trilemma 没有在自然人生中发生；
- odd-jobs entry adds 537 → 252，top tick 70/52 → 5/4；repeatRate 0.2104，只比 Phase 18 低 0.0098，C 仍 0.2205；
- Lena 的 `alibi` 分居被后六年出生/同居推翻；Alois 的 truth 被后续问卷重置；Mitzi 的 public-ally 主要是 7 个 tick。

Critic 的结论：**工具成功、转化弱；只有内容库层面是真正的 collision phase。** 报告可以声称 4 Pack / 8 State / 87 Kernel、76 严格双 State、工具、受控执行、odd-jobs 改善、existing-person cohort、若干强场景；不能声称 12% focal gate、所有 State 可达、custody/inheritance 重复已修、cross-pack weighting 改善 focal、repeatRate 低于 0.20。

Main Agent 的修订响应：

- Critic 后已给 `eh19-bridge.question-arrives` / `first-question` / `family-promise` 加 `notHasState`，避免问卷替换 active state；elder 18、mixed 32，`eh19-inherited-cause` mixed 首次 1 次；数量下降，质量改善。
- 未执行 family-war 中心 State 后果、power-love 分居/房产持久化、60+ 主 seed、story-shape 粗粒度 premise signature、custody/inheritance 压缩；这些是 Phase 20 的明确任务。
- 报告已统一 76/87、87 Kernel、2,060 总数、2,029 shapes。

完整批评、15 场景评分与修订建议：`docs/v4/phase-19-critique.md`。

## 9. 测试与命令

```bash
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm v4:cross-pack-map
pnpm v4:story-editor
pnpm v4:phase19-cooccurrence
pnpm v4:phase19-experiments
pnpm v4:phase19-summary
pnpm exec tsc --noEmit
pnpm test
```

- `pnpm v4:validate-packs`：29 packs，全部 `ok: true`；
- `pnpm exec tsc --noEmit`：通过；
- `pnpm build`：通过（Vite build 2.78 s）；
- `pnpm test`：**97 files passed / 8 skipped（105 files）；553 tests passed / 37 skipped**；
- 首轮全库测试发现 `eh19-bridge` 简化角色后仍引用 `$official`/`$sibling` 的悬空 relation effect；移除后复测通过。这是实际发现并修复的缺陷，不是“一开始全绿”。
- 专项：`tests/v4-phase19-content.test.ts` 5/5；`v4-cross-pack-map` 3/3；`v4-story-editor` 4/4；`v4-phase19-cooccurrence` 3/3；`v4-phase19-experiments` 2/2。

## 10. 未完成与限制

- 受控实验证明多 State 场景可以执行，不代表自然发生率。
- 45 年新生 cohort 仍然无法验证老年内容；老年 cohort 是观察样本，不是玩家 owner。
- `pack-collision-family-war` 第二稿解决了 lexical/结构拥挤，但仍有 20 个家庭/战争 Kernel，题材密度高。
- Cross-state affinity 只影响 state lane，不会让普通事件优先选择多 State 内容。
- Story Editor 是结构启发，不是文学判断；LLM Editor 仍可能误判。
- 家庭/伴侣 slot machine、horizon、历史日期、生产级 LLM runtime 仍未修复。
- 不声称 107 states / 2,060 kernels 或 8.37% 的 Phase 18 focal share 已经解决生活质量问题。

## 11. 结论

Phase 19 的核心成果不是“又多了 87 个 Kernel”，而是：

1. 作者可以在写作前看到 open pair 与真实 co-occurrence；
2. 新内容必须以两个不同领域的 State 为条件；
3. state lane 对多 State 场景有界加权；
4. 高频 odd-jobs 的节奏与入口被内容级修复；
5. 老年/混合 cohort 可以用真实 seed 人物观察；
6. Story Editor 能召回 Phase 18 Critic 指出的结构家族。

## 12. 最终结论

Phase 19 的核心成果不是“又多了 87 个 Kernel”，而是：

1. 作者可以在写作前看到 open pair 与真实 co-occurrence；
2. 新内容必须以两个不同领域的 State 为条件；
3. state lane 对多 State / 跨 Pack 场景有界加权；
4. 高频 odd-jobs 的节奏与入口被内容级修复；
5. 老年/混合 cohort 可以用真实 seed 人物观察；
6. Story Editor v2 能召回 Phase 18 Critic 指出的结构家族；
7. family-war 第一稿的 84 个 intra-pack 高相似 pair 被重写为 0 个 ≥0.20。

但独立 Critic 的结论同样必须保留：

> **Phase 19 是工具成功、转化弱；只有在内容库层面才是真正的 collision phase。** 自然人生大多执行 bridge 和 tick；主 focal collision share 0.14%，新 Pack 事件大多仍是 bridge；两个 State 几乎不可达；Lena 的分居、Alois 的证词修正被后续状态重置/生育推翻。

因此 Phase 19 应被表述为：

> **一次成功的碰撞工具、内容结构与节奏修复；一次部分成功的自然人生转化；不是人生质量问题的最终解决。**

Phase 20 应优先做 Critic 的五项修订：elder bridge gate、family-war 中心 State 后果、power-love 分居/房产持久化、60+ 主 seed 与 focal entry、custody/inheritance 结构压缩。
