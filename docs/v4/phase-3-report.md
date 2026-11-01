# v4 Phase 3 实现与验收报告：宏观世界、统计风险与 LLM Director

> Phase 4 已继续实现单岁人口、背景人口具名化、WorldDevelopment/组织、运行时 Content Author 和具名反事实；最新验收见 [phase-4-report.md](phase-4-report.md)。本页 Phase 3 数据保留为历史阶段。

日期：2026-11-01  
范围：基于 v4 `c9fa220` / Phase 2 复盘 `caf356c` 之后的 Phase 3 实现。  
原则：明确区分 **已实现**、**测试验证**、**仍是假设**、**尚未完成**。不以测试数量或字段数量代替游戏质量。

## 0. 状态总表

| 项目                  | 状态               | 证据 / 边界                                                                       |
| --------------------- | ------------------ | --------------------------------------------------------------------------------- |
| 宏观状态 `MacroState` | 已实现             | `packages/v4/macro.ts`；世界/地区、参数、人口账本、事件池、历史                   |
| 宏观持久化            | 已实现             | `005_v4_macro.sql`；`v4_worlds.macro`; seed/load/save/revision                    |
| 统计引擎              | 已实现             | `packages/v4/statistics.ts`；年龄别、原因别、战争/粮食/卫生/医疗/疫情修正         |
| 统一死亡裁决          | 已实现             | 统计死亡通过 `commitEvent` + `death` effect；Phase 3 世界健康伤害不再直接归零     |
| 人口账本              | 已实现（最小）     | 具名 `Person` + 地区未具名年龄队列；出生/死亡/迁移计数                            |
| LLM Macro Director    | 已实现并真实运行   | `macro-director.ts`、`v4-macro-worker`、真实 `deepseek-v4.1-flash` 调用           |
| Proposal 验证/应用    | 已实现             | zod/边界/地区/时间/事件族验证；revision-locked apply；失败回退                    |
| 事件池政策            | 已实现             | 启用/停用/权重/地区/阶段；engine 实际乘入 rate                                    |
| 新历史内容            | 已实现             | 新增 `vienna-wartime-homefront` 4 节点/12 outcome/24 narration，由 macro gap 触发 |
| 四种历史情境          | 已实现（统计夹具） | historical / peaceful / public-health / crisis；不宣称是完整全球史                |
| 具名人生验证          | 已实现             | 12 个固定出生、80 年实际事件引擎；见 `phase-3-life-demo.json`                     |
| 20k/全球人口          | 未验证             | 只有聚合人口和少量具名人物；未做 20k 完整压测                                     |
| 完整迁移/具名化       | 未完成             | 未把背景聚合人口转化为具名 Person                                                 |
| 玩家婚姻/死亡选择     | 未完成             | 仍是自动场景                                                                      |
| 生产部署              | 未完成             | 仅本地；Compose/公网未实测                                                        |

## 1. 实际执行的链路

```text
World / Region State
  → macroSnapshot()
  → LLM Macro Director (real chat)
  → MacroProposal (zod + bounds + scope + evidence)
  → v4_macro_proposals queue
  → applyV4MacroProposal (row lock + world revision)
  → WorldState.macro / RegionalPopulation
  → syncMacroPressures()
  → Statistical Engine (age/cause/exposure)
  → commitEvent(death / infection / recovery)
  → Event Engine (scenes, family, inheritance)
  → EventFact / person log / world history
  → next tick
```

事件池链路：

```text
MacroState / macroContentGaps()
  → EventPoolPolicy (family, weight, region, stage)
  → engine v4EventRate()
  → selected scene / content family
  → Content Author (generated family + validation)
```

## 2. 宏观状态

文件：`packages/v4/macro.ts`

### 2.1 参数

归一化 0..1 的参数：

- 战争：`warIntensity`、`militaryExposure`、`civilianExposure`
- 经济：`unemployment`
- 食物：`foodSupply`
- 公共卫生：`sanitation`、`epidemicInfluenza`、`epidemicTuberculosis`、`epidemicCholera`、`epidemicTyphus`
- 医疗：`healthcare`、`medicalTech`
- 社会政治：`stability`、`persecution`
- 人口：`migrationPressure`

每个参数有：

- 范围；
- 默认历史基线；
- 作用地区/有效时间；
- 来源；
- 统计引擎中的具体消费位置。

没有把“出生时预期寿命”或“年度死亡人数”作为控制参数；这些只能作为运行输出/审计指标。

### 2.2 人口账本

`RegionalPopulation`：

```text
regionId
unnamedByAgeBand: 0-4, 5-14, 15-44, 45-64, 65+
namedAlive
births, deaths, migrations
lastUpdated
```

约束：

- 总人口 = 具名存活 + 未具名年龄队列；
- 具名人口死亡不会重复计入未具名队列；
- 背景人口使用五段年龄队列，不创建 Person 行；
- 目前没有“把聚合人口具名化”的流程，这是明确缺口。

维也纳背景人口使用约 1.9M 的聚合基线；这是模型假设，不是精确人口普查。具名人物是独立样本，二者不会混算。

### 2.3 事件池

`EventPoolState`：

```text
familyId, enabled, weightMultiplier, regions?, stages?, source, updatedAt
```

engine 的 `v4EventRate` 会在最终 rate 上乘政策权重；禁用返回 0。事件池政策不会改变“同一类机会内选择哪条事件”的内容权重，二者分开。

## 3. 统计引擎

文件：`packages/v4/statistics.ts`

### 3.1 风险

年风险使用竞争风险：

```text
CauseHazard = Baseline(ageBand)
            × InfectionModifier(sanitation, food, healthcare, medicalTech)
            × CauseSpecificModifier
P(death in 12m) = 1 - exp(-Σ CauseHazard)
```

具体：

- 年龄别基础风险：婴儿、1–4、5–14、15–24、25–44、45–64、65–79、80+。
- 原因权重：婴幼儿腹泻、肺炎、结核、意外、暴力、战争、产妇、饥荒、老年、其他。
- 卫生：`0.7 + (1 - sanitation) × 1.2` 作用于感染。
- 食物：`1 + (1 - foodSupply) × 1.8`，饥荒另加 `0.035 × (1-food)^2`。
- 医疗：`1.25 - healthcare × 0.65`；医疗技术再降低感染/产妇风险。
- 战争：军人 `0.12 × warIntensity × militaryExposure`；平民 `0.012 × warIntensity × civilianExposure`。
- 稳定/迫害：暴力风险增加。
- 疫情：流感、霍乱、伤寒、结核进入对应原因。
- 产妇：`postpartumUntil` 窗口内的 `childbirth` 风险，仅作用于有生产记录的人。
- 婴儿：年龄 <1 的风险更高，不通过成人感染路径。

### 3.2 唯一死亡裁决

Phase 3 世界中：

- 普通 `health` 效果最低只能到 0.01，不允许通过“health=0”偷偷产生第二种死亡路径；
- 基础自然死亡由统计引擎产生；
- 明确的外部原因（工伤、战争、暴力等）仍允许内容 `death` effect；
- 所有死亡最终都经过 `commitEvent` 的 `death` effect / `applyDeath`；
- `vitality_exhausted` 不再出现在 Phase 3 世界；fallback 使用具体中文原因或“重伤与衰竭”；
- 统计死亡有具体叙事，不输出内部字段/参数。

### 3.3 病情过程

- `health.lastIllness` 保存感染名称、开始时间、严重度。
- 感染 → 下一年恢复/恶化/死亡。
- 恢复会清除 illness 并提交 `statistical_recovery`。
- 恶化会更新 severity 并提交 `statistical_illness_worsened`。
- 死亡提交 `statistical_death/<cause>`，带具体原因。
- 感染/恢复/恶化/死亡都写入 committed EventFact，日志可读。

## 4. LLM Macro Director

文件：

- `packages/v4/macro-director.ts`
- `packages/v4/macro-store.ts`
- `apps/v4-macro-worker/index.ts`
- `apps/v4-simulator/index.ts`
- `infra/migrations/005_v4_macro.sql`

### 4.1 输入快照

包含：

- 日期；
- 地区参数与有效期；
- 具名/未具名人口；
- 最近高显著性/公开事件；
- 当前事件池；
- 可用事件族列表。

### 4.2 输出

`MacroProposal`：

- `regionId`
- `effectiveFrom`
- `durationMonths`
- `summary`
- `confidence`
- `maintainStatus`
- `developments`（高层历史发展）
- `parameterChanges`（有界增量）
- `eventPoolChanges`（只引用已有 familyId）

验证：

- schema；
- 地区存在；
- 时间窗口；
- 参数白名单、单次 ±0.5、结果 0..1；
- 事件族白名单、权重 0..3；
- 未知 development type 规范化为 `other`；
- 未知 familyId 丢弃；
- 空提案只有在 `maintainStatus` 时有意义；
- 已提交历史不修改。

### 4.3 实际运行证据

真实 worker 运行：

- 模型：`deepseek-v4.1-flash`
- tokens：**2,269**
- proposal：战争背景、粮食/医疗/稳定度变化
- event pool：`vienna-wartime-homefront` 权重 1.6，另加 food queue/family separation/illness/tenement
- apply revision：1（测试世界）
- 结果文件：`docs/v4/phase-3-macro-worker.json`

`v4:macro-demo` 另一次真实调用：

- tokens：**2,259**
- 变更：foodSupply -0.08、warIntensity +0.05、civilianExposure +0.06、stability -0.04、healthcare -0.03 等
- 运行一年后出现 `statistical_death/other`，文本为具体人物死亡，不是内部字段
- 结果文件：`docs/v4/phase-3-macro-demo.json`

没有把模型输出直接执行代码、SQL、HTTP 或任意 effect list。

## 5. 内容工厂与事件池联动

### 5.1 新内容

新增 `vienna-wartime-homefront`：

- 4 个节点
- 12 个 outcome
- 24 条 narration
- tags：war/homefront/family/ration/separation
- 真实生成：成功 **9,990 tokens**；第一次尝试 8,311 tokens 失败后被验证器拒绝；第二次成功
- 只在 `war_supply_stress >= 0.2` 时激活

当前生成内容：

- 23 族
- 92 场景
- 251 outcome
- 447 narration

### 5.2 事件池实际效果

- `macroContentGaps` 检测 war/epidemic/famine/medical/unrest 缺口。
- `v4-content-author.ts --macro` 可读取宏观状态并输出缺口。
- 历史情景审计中 `vienna-wartime-homefront` 实际触发 **7 次**；baseline 审计中 **0 次**。
- `EventPoolPolicy` 在 engine 中真实改变 rate；单测覆盖启用/停用/权重。
- 不是“新增一千条内容就自动提高事故率”；rate 与内容选择分离。

## 6. 四种历史情境

`pnpm v4:phase3-scenarios` 输出：`docs/v4/phase-3-scenarios.json`

使用固定 93 万背景人口、1912–1920 年，按情境逐年应用参数：

| 情境                   | 1912 预期寿命 | 5 岁以下死亡 | 1916 军人战争风险 | 1918 肺炎风险 | 1920 聚合人口 |
| ---------------------- | ------------: | -----------: | ----------------: | ------------: | ------------: |
| 接近真实历史 1912–1920 |          45.4 |        24.4% |             5.70% |         3.80% |       839,049 |
| 没有同规模战争         |          46.1 |        23.7% |                 0 |         0.07% |       878,419 |
| 公共卫生/医疗改善      |          60.1 |        12.7% |             0.37% |         0.03% |       946,942 |
| 严重粮食/卫生危机      |          21.2 |        45.3% |             4.76% |         0.20% |       827,980 |

这些是**模型夹具**，不是历史统计表：

- 历史情境的 1912 预期寿命/5 岁以下死亡来自当前参数，不是精确拟合；
- 战争风险按军人暴露施加，不是全民统一死亡；
- 无战争线没有战争原因死亡；
- 改善线显著降低儿童死亡、提高预期寿命；
- 危机线显著恶化，并传递到聚合人口。

真实历史审计（具名小样本）：

| 指标           | baseline | historical |
| -------------- | -------: | ---------: |
| 人物/存活      |   41 / 6 |     36 / 6 |
| 事件           |    1,249 |      1,109 |
| 出生/死亡      |  14 / 33 |     9 / 28 |
| 统计死亡       |       33 |         28 |
| 婴儿死亡（<1） |        0 |          0 |
| 5 岁以下死亡   |        2 |          1 |
| 产妇死亡       |        0 |          0 |
| 死亡年龄中位数 |       60 |         60 |
| 最高频场景占比 |        — |          — |
| 战争内容触发   |        0 |          7 |
| 零事件年份     |        0 |          0 |

**必须明确：** 具名审计只有 36–41 人，不能当人口统计估计；0 婴儿死亡/0 产妇死亡在这个样本量下不能证明模型没有这些风险。风险模型用 93 万聚合队列和独立统计测试验证。具名审计的价值是事件/叙事/因果/家庭链，不是估计死亡率。

## 7. 具名人生验证

`pnpm v4:life-demo`：12 个固定出生、80 年实际事件引擎，输出 `docs/v4/phase-3-life-demo.json`。

结果：

- 12 个玩家出生；
- 80 年 3,631 个事件，45.39/年；
- 5 人活到 80 岁；
- 死亡年龄：22、67、74、75、79、80、80（以及若干 80 岁存活）；
- 死因包含肺炎、老年衰竭、急性疾病、饥饿与衰竭；
- 每个人的事件数约 36–309；
- 具体样例包含配给、住房、恋爱/家庭、疾病、老年失亲、统计感染/恢复/死亡。

这不是用固定死亡事件补出来的人生；每一条来自 committed EventFact。

## 8. 验证结果

```text
pnpm typecheck
→ 通过

TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 13 files passed
→ 96 tests passed（Phase 3 新增 macro/scenario/store 等）

pnpm test
→ 61 files passed / 6 skipped
→ 369 tests passed / 35 skipped
→ 158.20s

pnpm build
→ 通过（2.95s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（6.9s）
```

新增测试覆盖：

- 宏观 schema/范围/未知参数/未知事件族/维持现状；
- 事件池启停；
- 年龄别/原因别风险；
- 战争军人 vs 平民；
- 产妇风险；
- 无战争线无战争死亡；
- 公共卫生/危机/和平/历史四情境；
- 聚合人口与具名人口不重复；
- 真实统计死亡事件无内部字段、每人最多一次死亡；
- macro store seed/load/apply/revision；
- content gap。
- 真实 LLM 不进入自动测试，由 `v4:macro-demo` / worker 手动运行证据。

## 9. 仍未实现 / 明显偏差

1. **具名人口与背景人口没有互相转化**：背景 1.9M 只做聚合账本，不能把一部分具名化；长期具名人物可能灭绝而背景人口仍存在。
2. **人口校准不是最终历史拟合**：当前基准是 1912 维也纳的近似夹具，未对 1900–2000 做完整生命表校准；四情境不是精确历史预测。
3. **统计模型仍是粗粒度**：没有年龄×性别×职业×地区的完整暴露矩阵，没有疾病 compartment、治疗过程、慢性病进展、医疗资源排队。
4. **战争暴露依赖 soldier role/宏观 exposure**：没有真实军队编制、战线、地区占领和退伍流程；平民战争死亡是聚合概率。
5. **内容工厂不是运行时自动发布**：新增战争族是手动/CLI 生成并审查后写入；macro gap 可以建议，但没有自动“生成→验证→发布”守护进程。
6. **LLM Director 的真实覆盖面**：只验证了维也纳/1917 的一条路径；没有多地区、多国家、多轮长期自主 Director 运行。
7. **Director 的 developments 多数映射到参数/事件池**：无法表达的新组织、新技术、新政治力量会记录为 `other`/summary，不能凭空创建完整机制。
8. **20k/全球规模**：聚合人口是 O(地区×年龄段)，具名事件仍逐人；没有 20k 具名完整压测、没有全球 POP 经济。
9. **UI**：API 有 `/api/v4/macro` 和 world.macro；观察器尚未把宏观参数做成完整可视化面板。
10. **玩家选择**：婚姻/离婚/再婚/遗嘱仍是自动场景。
11. **真实历史审计的 focal 样本可能早逝**：这本身是模型的真实结果，但不能用单一 focal 代表内容覆盖率；`phase-3-life-demo` 的 12 个样本更适合看人生事件。
12. **死亡原因中文文本已具体化，但统计模型不是医学诊断**；报告不把“肺炎/老年衰竭”当作医学结论。

## 10. 结论

Phase 3 已经打通了第一条真实纵向链路：

```text
真实 LLM 1917 提案
→ schema/范围/事件族验证
→ revision-locked macro 持久化
→ food/war/health 参数变化
→ 统计风险/感染/死亡
→ 具体人物事件与日志
```

同时建立了：

- 宏观参数与事件池；
- 年龄/原因别统计风险；
- 唯一死亡裁决；
- 四种历史情境；
- 具名人物长周期验证；
- macro-driven 内容缺口与新战争内容族。

但这不是“全球历史模拟完成”。当前最需要继续做的不是增加字段，而是：

1. 具名/背景人口的迁移与具名化闭环；
2. 用可靠历史数据校准 1912–2000 的基础风险，并记录区间/来源；
3. 让 Director 在多个地区、多个年代真实运行并审计；
4. 把 content gap → 生成 → 验证 → 发布做成可重复流程；
5. 运行 20k 具名/并发 API 压测，拿出实测数字。

在这些完成前，不应宣称 Phase 3 已实现完整 1900 地球或精确历史。
