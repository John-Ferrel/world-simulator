# v4 Phase 3–4 完整复盘：从宏观参数到具名化与运行时内容

日期：2026-11-02  
范围：从 Phase 2 体系开发任务（基线 `52ab5a4`，Phase 2 交付 `c9fa220`）到 Phase 4 当前提交 `1a73e73`。  
目的：让未参与本轮的读者（包括另一个模型）零上下文理解：做了什么、哪些通过测试、哪些只是模型假设、哪些没有完成、哪些地方曾经做错。

---

## 0. 术语与阅读方法

- **engine**：`packages/v4/engine.ts`，年度场景/动作/状态结算器，世界状态的唯一权威执行者。
- **宏观层**：`MacroState`，描述地区条件（战争、粮食、卫生、医疗、稳定度、疫情）与事件池/发展，不直接规定寿命或死亡人数。
- **统计引擎**：`packages/v4/statistics.ts`，把宏观条件与个体年龄/性别/职业暴露转换为风险。
- **事件池**：可被 engine 选中的场景/事件族；通过 `EventPoolPolicy` 启用、停用、加权。
- **具名化**：把背景聚合人口中的一个无名个体升级为稳定 `Person`，并绑定 household/住址/关系。
- **WorldDevelopment**：宏观层中的历史发展对象，可创建 Organization、激活事件族。
- **运行时内容**：Content Author 生成的新事件包写入数据库，下一 tick 动态加载，无需重启世界。

本文的“已实现”指代码存在并实际运行；“已测试”指有自动测试或实际运行证据；“仍是假设”指未验证的模型/参数；“未完成”指本轮没有做到。

---

## 1. 时间线与用户输入

### 1.1 起点

Phase 2 基线 `52ab5a4` 时已有：

- 年度多事件运行时、followup 队列、请求/回应、家庭/住房/离婚/同性关系/继承第一版。
- 19 个作者场景、20 个通用人生场景、8 个家庭场景。
- 14 个 LLM 生成族、56 个生成场景、230 条叙事变体。
- Phase 1 审计：506 事件、6.33 事件/年、focal 97、因果 31、生成内容 56.1%。

### 1.2 Phase 2

Phase 2 目标：

- 内容工厂扩到 8 个新族；
- Birth Contract 2.0；
- API/世界读取分页；
- 1k/5k 持久化基准。

交付提交 `c9fa220`，但人口/死亡模型仍不成立。Phase 2 复盘提交 `caf356c`。

### 1.3 用户第一次纠偏

用户指出：

> 老年死亡原来是 oncePerPerson 且要求 health ≤0.45，存活一次后可能活到 140 岁；改为 72–118 岁每年可重复的死亡风险。  
> 以 20 世纪为例，非自然死亡应该是非常常见的吧。人口寿命也绝对没有这么高。  
> 这说明很多常识性问题都建模不对啊。你去自查。

我的理解：

- 不是修一个老年场景；
- 是死亡/人口/历史风险整体缺层；
- 需要先量化，再找根因。

### 1.4 用户第二次纠偏

用户进一步说明：

> 需要做好数据抽象，LLM 根据历史宏观进行调整。战争频发，战争死亡判定就更多，并且和地区相关；技术发展、社会稳定，人口增长/寿命参数也会调整。  
> LLM 还应该根据框架调整事件池。  
> 你先不要动手；主代理负责整体分析判断，执行交给子代理。

这个要求直接导致 Phase 3 的宏观层与 Director。

### 1.5 Phase 3

Phase 3 实现：

- `MacroState`；
- 统计风险；
- LLM Macro Director；
- EventPoolPolicy；
- 真实模型调用；
- 四情境；
- 战时内容族。

提交：

- `e38b51d`：宏观、统计、队列；
- `7174b8a`：Director、统计、场景、战时内容；
- `03d072b`：环境变量文档。

### 1.6 Phase 4 用户 prompt

用户要求：

- 单岁人口队列；
- 统一死亡语义；
- 宏观参数时间语义；
- 背景人口 → 具名人物 → 社会互动；
- Director 创造组织/历史发展；
- 运行时 Content Author；
- 出生能力真正改变人生；
- 固定 seed 反事实、人口统计、真实人生、性能；
- 主代理整体负责，子代理按语义分工。

提交：

- `d871403`：Phase 4 主要实现；
- `1a73e73`：最终证据。

---

## 2. Phase 3：实际完成

### 2.1 宏观状态

`packages/v4/macro.ts`：

- 参数包括战争/军事/平民暴露、粮食、卫生、医疗、技术、稳定度、迫害、失业、疫情、迁移压力。
- 参数 0..1，有边界、默认 1912 基线、地区/时间作用域。
- `MacroState` 包含地区、人口、事件池、发展、历史。
- 提案 `MacroProposal`：参数增量、事件池变化、developments、confidence、maintainStatus。

### 2.2 统计引擎

`packages/v4/statistics.ts`：

- 年龄别基础风险；
- 原因别：肺炎、结核、婴幼儿腹泻、产妇、战争、意外、暴力、饥荒、老年；
- 卫生/粮食/医疗/技术/战争/疫情修正；
- 军人 vs 平民；
- 产妇 `postpartumUntil`；
- 感染 → 恢复/恶化/死亡；
- 年度竞争风险。

### 2.3 统一死亡

- Phase 3 世界普通 health 伤害最低 0.01；
- 统计死亡通过 `commitEvent` 的 `death` effect；
- 旧基线死亡场景用 `baseline_mortality` 标记过滤；
- 死亡、继承、项目关闭统一走 `applyDeath`。

### 2.4 LLM Director

- 真实 `deepseek-v4.1-flash` 调用；
- `v4_macro_proposals` 队列；
- schema/范围/时间/事件族验证；
- revision-locked 应用；
- `v4-macro-worker` 异步；
- 实际 worker 证据：2,269 tokens；demo：2,259 tokens。

### 2.5 事件池与内容

- `EventPoolPolicy` 乘入 `v4EventRate`；
- 新增 `vienna-wartime-homefront` 4/12/24，真实生成 9,990 tokens；
- historical 审计触发 7 次，baseline 0 次；
- 四情境：历史/无战争/医疗改善/粮食危机。

### 2.6 Phase 3 测试

- 96 项 v4 测试（当时）；
- 全量 369 项通过；
- build/e2e 通过。

---

## 3. Phase 3 的偏差与失败

### 3.1 老年死亡修在内容层

第一次“修复”只是把老年死亡从 `oncePerPerson` 改成每年风险；仍然没有：

- 年龄别成人风险；
- 婴儿/产妇；
- 战争/流感；
- 结核/肺炎；
- 地区差异。

这是层错误：内容层无法承担人口学。

### 3.2 Phase 3 审计仍暴露小样本/因果问题

Phase 3 的 41 人审计：

- 0 个 <1 岁死亡；
- 0 个产妇死亡；
- 0 个 1918 流感/1914 动员；
- 中位死亡年龄 60；
- focal 事件 4（focal 儿童早逝）。

部分原因是 41 人太小，但也说明：

- 单次 focal 审计不能证明人口模型；
- 需要聚合队列/四情境，而不是只看事件数；
- 内容死亡和统计死亡需要统一。

### 3.3 `VIENNA_1912_TIMELINE` 的静态历史

Phase 3 已从 simulator 移除自动 timeline，但：

- 函数仍存在，旧测试/脚本可用；
- 默认历史不再强制；
- 审计默认 baseline 无导演历史；
- historical 审计用 `V4_AUDIT_SCENARIO` 显式应用参数。

这符合“架空历史不能强制现实战争”的要求，但文档/默认行为仍容易被误解。

### 3.4 性能问题

Phase 3 没有暴露：

- `nextEventIdentity` 每次扫描全部 events；
- `applyRelation` 每次扫描全部 relations；
- `roleCandidates` 的 partner 扫描全部 relations。

Phase 4 长审计才暴露 40 年 156 秒、80 年超时。修复后 80 年约 10 秒。

---

## 4. Phase 4：实际完成

### 4.1 单岁 × 性别人口队列

`RegionalPopulation` 改为：

```text
unnamedByAgeSex: { female: number[101], male: number[101] }
```

- age 0–99 单岁，100 是 100+；
- 旧 5 段 `unnamedByAgeBand` 读取时兼容拆分；
- `advanceAggregatePopulation` 精确老化一岁；
- 出生按 15–44 女性数生成，进入 age 0；
- 死亡按 age/sex 单元格扣除；
- 跨区迁移使用 `moveBackgroundCohorts`，两端同时变更；
- 总人口 = 出生 − 死亡 + 净迁移。

### 4.2 背景人口具名化

`engine`：

- required role 缺失且候选为空时，从 subject 所在地区 cohort 取人；
- 扣减背景人口，创建 Person/household/住址；
- `provenance = materialized_population`；
- 参与事件后建立持久 acquaintance relation；
- 第二年复用，不重复创建；
- 每年最多 4 个新人物，避免内容/人口爆炸；
- 无 cohort/place 时 blocked。

### 4.3 社会互动

- 角色系统仍用现有 Scope/Role；
- 具名化人物加入 household/place；
- 关系写入 Relation；
- 后续场景通过 roleCandidates 复用；
- 不强制预编写情侣/家庭/友谊。

### 4.4 宏观参数时间语义

- `MacroRegion.baselineParameters` + `effects[{start,end,changes}]`；
- 到期 `expireMacroEffects` 回退；
- 参数 clamp；
- 不允许未来生效；
- `effectiveFrom` 当前或过去 12 个月。

### 4.5 WorldDevelopment / Organization

- `WorldDevelopment` 包含类型、地区、起止、severity、eventFamilyIds、organization。
- `materializeDevelopments`：
  - 找地区合法 Place；
  - 创建真实 `Organization`；
  - 同名复用；
  - 无地点时 blocked。
- 新增 `organization_membership` effect；
- 事件池 organization role 优先匹配 development 组织；
- 新增 `vienna-social-movement.*` 4 个 authored 场景。

### 4.6 运行时 Content Author

- `v4_content_jobs` / `v4_content_packs`；
- content worker：真实模型 → 验证 → DB 发布；
- simulator 每 tick 动态加载；
- 真实 worker 生成 `vienna-social-movement` 4/12，11,046 tokens；
- 新内容下一 tick 实际触发。

### 4.7 出生能力

- 新增 `SceneCondition capability`；
- `vienna-life-literacy-gate` 只对 literacy 能力者触发；
- 无 capability 不触发，有 capability 触发；
- 能力仍有 costs/limits/权重。

### 4.8 两地区与反事实

- 默认 `region-lower-austria` + `region-klosterneuburg`；
- 背景队列迁移两端守恒；
- 内容 pressure 条件按 subject 地区读 macro；
- `v4-counterfactual`：相同 seed，有/无 social_change organization；
  - 控制组无 movement 事件；
  - 处理组有事件、组织成员、`organization_membership` 效果。

### 4.9 真实多轮 Director

- 1917：2,538 tokens；
- 1918：3,026 tokens；
- 第二轮 snapshot 包含第一轮组织/发展；
- 第二轮 summary 提及前一轮反战/组织背景。

### 4.10 Phase 4 指标

80 年审计：

| 指标           | baseline | historical |
| -------------- | -------: | ---------: |
| 具名总数/存活  |  586/298 |    524/225 |
| 事件           |    9,130 |      9,246 |
| 出生/死亡      |  241/286 |    178/297 |
| 统计死亡       |      274 |        280 |
| 统计感染       |      626 |        556 |
| 5 岁以下死亡   |       22 |         22 |
| 产妇死亡       |        4 |          2 |
| 死亡年龄中位数 |       61 |         63 |
| 零事件年份     |        0 |          0 |
| 生成内容占比   |    63.3% |      61.6% |

12 个具名人物、80 年：

- 9,030 事件，112.88/年；
- 5/12 活到 80；
- 死亡年龄：22（产后感染）、67、68、74、75、79、80；
- 单人 73–327 事件。

四情境（单岁队列）：

| 情境              | 1912 LE | 5 岁以下死亡 | 1916 军人战争风险 | 1918 肺炎风险 | 1920 人口 |
| ----------------- | ------: | -----------: | ----------------: | ------------: | --------: |
| 历史维也纳        |    45.4 |        24.4% |              5.7% |          3.8% |   740,727 |
| 无同规模战争      |    46.1 |        23.7% |                 0 |         0.07% |   886,326 |
| 医疗改善          |    60.1 |        12.7% |             0.37% |         0.03% |   949,534 |
| 严重粮食/卫生危机 |    21.2 |        45.3% |              2.5% |         0.14% |   713,465 |

性能（in-memory，含 macro）：

- 1k：56 ms/年；
- 5k：995 ms/年；
- 20k：19.5 s/年（单年；简化 benchmark）。

测试：

- v4：15 文件 / 103 项通过；
- 全量：62 passed / 7 skipped，375 passed / 36 skipped，154.75 s；
- build 2.88s；
- Playwright v4：1 passed，6.8s。

---

## 5. Phase 4 没完成 / 仍是假设

### 5.1 具名迁移

背景队列可跨区迁移，但：

- 具名人物迁出/迁入没有同步到人口账本的 named 计数；
- 没有跨区家庭/关系/住址迁移闭环；
- 没有迁移事件和目的地选择。

### 5.2 具名化分布

目前只按：

- 地区；
- 年龄；
- 性别；
- required role。

没有：

- 职业/阶层；
- 家庭结构；
- 宗教/语言；
- 社会网络；
- 住房质量。

所以具名人物是“合法的”，但不是“有完整社会分布的”。

### 5.3 急性疾病/产妇

- 有感染/恢复/恶化/死亡状态；
- 但仍是年度竞争风险；
- 没有月度病房、治疗、转归、医疗资源排队；
- 产妇风险只在年度统计，不是产程/产后逐月。

### 5.4 多地区真实历史

- 两地区数据和迁移已接通；
- 但真实 Director 多地区长期运行未完成；
- 两地区不同历史走势只有纯函数/数据层验证，不是长期 LLM 运行。

### 5.5 运行时内容治理

- content worker 真实可用；
- 只自动 enqueue `social_change`；
- 没有全局预算/优先级/审批；
- 动态 pack 存 DB，不进入静态 index；
- 没有完整版本回滚/停用 UI；
- 内容生成失败有限重试，但不是调度系统。

### 5.6 WorldDevelopment 限制

- 支持 `social_change` 创建组织；
- 其他类型仍会归一化为 `other` 或只记录参数/能力缺口；
- 没有完整组织演化（招募、资源、分裂、镇压、解散）；
- 组织成员事件主要通过 authored 场景和一条 membership effect。

### 5.7 UI/展示

- API 有 `/api/v4/macro`、`world.macro`；
- 观察器没有完整宏观/发展/组织面板；
- 死亡原因有英文内容字段（`stroke`、`crushing injury...`）；
- 日志主要仍是人物/家庭/地图。

### 5.8 20k

- 20k 单年 19.5s in-memory；
- 没有 20k PostgreSQL/API/WAL/恢复/完整内容压测；
- 不能宣称 20k 生产容量。

### 5.9 小样本统计

- 586/524 具名审计仍不是人口统计；
- 0 个 <1 岁死亡字段受年龄口径影响；
- `focalEvents 4` 是因为固定 focal 小孩早逝；内容人生由 12 个 life-demo 样本补充，不是人口统计。

### 5.10 旧存档兼容

- 5 段人口可迁移到单岁；
- 没有回写/验证所有归档世界的长期一致性。

---

## 6. 哪些是偏差/错误

### 6.1 层错误

早期把人口/死亡问题当成内容问题：

- 调老年场景年龄；
- 调家庭 provenance；
- 调 childbirth rate；
- 用静态 `VIENNA_1912_TIMELINE`。

正确层应是：

- 宏观条件；
- 统计风险；
- 唯一死亡入口；
- 事件池/内容。

### 6.2 验收指标错位

Phase 2/3 早期用：

- 事件数；
- 生成内容比例；
- schema 测试；
- 场景触发数。

这些不能证明：

- 婴儿/产妇死亡率；
- 年龄结构；
- 战争/疫情死因；
- 地区差异；
- 人生因果。

Phase 4 增加：

- 聚合队列；
- 四情境；
- 固定 seed 反事实；
- 具名 life demo；
- 20k runtime benchmark。

但仍不是完整人口学/生产验收。

### 6.3 性能错误

- `nextEventIdentity` 每次扫全部 events；
- `applyRelation` 每次扫全部 relations；
- partner role 每次扫全部 relations；
- 初期 materialization 每年 20 人导致审计 80 年超时。

修复：

- historyMeta.sequence；
- `relationsByPerson` WeakMap 索引；
- 具名化上限 4/年；
- 80 年审计从超时降到约 10 秒。

### 6.4 运行时内容边界

- 最初 content factory 只有离线 CLI；
- Phase 4 才接入 job/DB/动态加载；
- 但自动触发仍窄，不能称为“无限内容生态”。

### 6.5 声称“完成”的风险

测试通过不等于：

- 历史真实；
- 全球规模；
- 多地区长期演化；
- 完整人口学；
- 生产可用。

Phase 4 报告明确区分，但最终仍需以未完成项为准。

---

## 7. 用户提出的问题与我的回答

### 7.1 “20 世纪非自然死亡常见，寿命没这么高，很多常识建模不对”

我的回答/行动：

- 先量化：Phase 2 审计 75 出生/0 婴儿/0 产妇/0 战争流感/中位 74；
- 判断这是层错误；
- Phase 3 建统计引擎；
- Phase 4 加单岁人口、具名化、运行时内容；
- 现在 baseline 审计 22 个 5 岁以下死亡、4 个产妇死亡、286 死亡，原因包含肺炎/结核/腹泻/产后/意外/暴力/饥饿；
- 但小样本 0 个 <1 岁和 focal 早逝仍是真实限制，不掩盖。

### 7.2 “数据抽象，LLM 根据历史宏观调整，事件池，主代理/子代理”

回答：

- 不冲突；
- Phase 2 内容/出生/读取保留；
- Phase 3 建 MacroState/Director/EventPool；
- Phase 4 让 development 创建组织，content worker 运行时发布；
- 主代理负责契约/集成/验收，子代理执行独立模块。

### 7.3 “Phase 4 具体要求”

回答/交付：

- 单岁队列/具名化；
- WorldDevelopment 组织；
- runtime content；
- capability 门控；
- 两地区/迁移守恒；
- 反事实；
- 20k benchmark；
- 未完成项明确。

### 7.4 当前请求

本报告：

- 从 Phase 2 到 Phase 4；
- 完成/未完成/偏差；
- 用户问题；
- 解决方案；
- 自包含证据。

---

## 8. 我认为的解决方案/下一阶段

### 8.1 先补人口闭环

1. 具名迁出/迁入：
   - `move` effect 更新 named 计数；
   - 关系/家庭/住址；
   - 两地区总人口守恒。
2. 联合分布具名化：
   - 地区 × 年龄 × 性别 × 职业/阶层 × 家庭角色；
   - 不是随机抽一个邻居。
3. 聚合人口与具名人口对账：
   - 每年校验 total = named + unnamed；
   - 迁移两端；
   - 死亡/出生。

### 8.2 疾病/产妇时间过程

- 月度或到期事件；
- 感染 → 治疗/康复/恶化/死亡；
- 医疗资源/费用；
- 母婴风险；
- 死亡仍唯一入口。

### 8.3 多地区 Director

- 两地区独立 snapshot/参数/事件池；
- 至少 2 个地区、多个年代真实 LLM 运行；
- 观察组织/迁移/人物差异；
- 失败回退。

### 8.4 运行时内容治理

- 所有 content gap 可 enqueue；
- job 优先级/预算/重试；
- pack 版本/停用/回滚；
- 动态 index；
- 不按内容数量线性提高风险。

### 8.5 性能/规模

- 20k PostgreSQL/API/WAL/恢复；
- 事件表分区/归档；
- 每 tick 增量保存；
- 头less 30–60s/年；
- 真实 CPU/内存/数据库增长。

### 8.6 UI

- 宏观/发展/组织只读面板；
- 不增加管理/操作复杂度；
- 原因中文化；
- 保持人物/日志/地图为核心。

### 8.7 验收

- 固定 seed 反事实；
- 聚合人口统计；
- 具名人生样本；
- 多地区历史；
- 运行时内容触发；
- 20k 实测；
- 失败/未完成清单。

---

## 9. 可复现命令与证据

```text
pnpm typecheck
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
pnpm v4:phase3-scenarios
pnpm v4:life-demo
pnpm v4:multi-cycle
pnpm v4:phase4-demo
pnpm v4:audit 80
```

注意：

- `v4:multi-cycle`、`v4:phase4-demo`、content worker 使用真实模型，消耗 tokens；
- `v4:phase4-demo` 需要测试数据库；
- `v4:audit` 会写 `docs/v4/content-audit.json`；
- `v4:life-demo`/`phase3-scenarios` 是模型夹具，不是历史预测。

证据文件：

- `docs/v4/phase-4-report.md`
- `docs/v4/phase-4-development-demo.json`
- `docs/v4/phase-4-content-worker.json`
- `docs/v4/phase-4-multi-cycle.json`
- `docs/v4/phase-4-director-proposal.json`
- `docs/v4/phase-4-social-movement-pack.json`
- `docs/v4/content-audit.json`
- `docs/v4/content-audit-historical.json`
- `docs/v4/phase-3-life-demo.json`
- `docs/v4/phase-3-scenarios.json`

---

## 10. 结论

- Phase 2：工程交付真实，人口/历史模型不成立。
- Phase 3：建立宏观层、统计引擎、Director、事件池，真实 LLM 路径跑通，但具名化/长周期/内容运行时缺失。
- Phase 4：单岁人口、背景具名化、WorldDevelopment/组织、runtime content、capability 门控、两地区/反事实已实现；但具名迁移、联合分布、月度疾病、多地区长期 Director、内容治理和 20k 生产验收仍未完成。

最重要的结论：

**当前系统已经不是“固定剧情 + 随机数”，而是有宏观 → 风险 → 事件 → 人物 → 组织的真实链路；但它仍不是完整的全球历史模拟，也不是生产级 20k 共享世界。**

下一步应优先补：

1. 具名迁移/联合分布；
2. 月度疾病/产妇；
3. 多地区长期 Director；
4. 运行时内容治理；
5. 20k 数据库/API/恢复；
6. UI 和原因本地化。
