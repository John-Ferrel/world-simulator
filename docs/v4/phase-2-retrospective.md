# v4 Phase 2 复盘、偏差与 Phase 3 方案

日期：2026-11-01  
范围：从 Phase 2 体系开发任务（基线 `52ab5a4`）到当前提交 `c9fa220`，以及之后用户对人口/历史建模的批评。  
目的：让未参与本轮的读者（包括另一个模型）零上下文理解：做了什么、哪里做错、为什么测试通过但产品仍不成立、下一步应该怎样抽象。

---

## 0. 术语

- **内容层**：场景 JSON、事件族、outcome、叙事文本、角色要求、单场景 rate/weight。
- **engine**：`packages/v4/engine.ts`，负责选角、触发、条件判定、效果结算、事件提交。它是世界状态的唯一权威执行器。
- **宏观层**：本报告建议新增的一层。描述一个地区/年代的人口风险、战争/瘟疫/饥荒/医疗/稳定度/技术等参数，供 engine 计算个体风险；不是逐人剧情。
- **事件池**：当前可被 engine 选中的事件族/场景集合，以及它们在各地区、年代、年龄段的启用状态和权重。
- **provenance**：人物来源标记，当前有 `birth`（玩家出生/后代）和 `initial`（1912 作者初始人口）等。
- **pressure**：`WorldState.pressures` 中的一组全局数值，目前是静态时间表驱动的临时压力。

---

## 1. 基线与提交

Phase 1 结束时（`52ab5a4` 之前）已经有：

- 年度多事件运行时、事件队列、人物请求/回应、家庭/住房/离婚/同性关系/继承第一版。
- 19 个作者场景、20 个通用人生场景、8 个家庭场景。
- 14 个 LLM 生成族、56 个生成场景、230 条叙事变体。
- 80 年审计：506 事件、6.33 事件/年、focal 97 事件/52 年、因果 31、请求回应 1、生成内容占 56.1%、最高频场景 13.4%。

本轮提交：

| 提交      | 内容                                                               |
| --------- | ------------------------------------------------------------------ |
| `52ab5a4` | Phase 2 基线；显式 followup target、因果内容链                     |
| `c9fa220` | Phase 2 交付：内容工厂、Birth Contract 2.0、读取投影、若干集成修复 |

当前工作树干净；旧世界保留归档，未做破坏性 reset。

---

### 1.1 更早的体系开发（Phase 1 前史）

在 Phase 2 之前，v4 已经完成：

- v4 领域模型：Person / Household / Place / Organization / Position / Project / Interaction / Relation / Knowledge / EventFact / SceneDefinition / SceneInstance，以及 `assertWorldV4` 不变量。
- PostgreSQL 实体/事件存储、revision 检查、出生请求/契约队列、归档世界。
- Fastify API、认证、cookie session、SSE、公开事件过滤、人物日志权限。
- 三栏观察器、纸娃娃、维也纳地图、出生页/等待页。
- 年度场景引擎：角色选角、类型化效果、家庭经济、出生、死亡、继承第一版。
- 19 个 Vienna 1912 作者场景、20 个通用人生场景、8 个家庭场景。
- 异步出生愿望 LLM；真实 `deepseek-v4.1-flash` 调用。
- 旧 v1–v3 世界归档；开发服务器只启动 v4。

Phase 1 的明显空白：

- 内容规模小，生成场景只有 56 个。
- 出生愿望只是有界读法，能力/代价没有进入事件。
- API 全量读取世界。
- 人口/死亡机制没有宏观参数层；战争、流感、婴幼儿/产妇死亡只有零散内容。
- 事件数量、人物寿命和历史结构没有形成验收指标。

这些空白是 Phase 2 选择“内容 + 出生契约 + 读取路径”的原因，但也说明 Phase 2 没有从宏观层解决问题。

## 2. 本轮原始目标

`docs/v4/phase-2-plan.md` 把工作拆成三条：

### A. 内容工厂 2.0

- 新增 8 个 Vienna 事件族，每族 4 节点，每节点 2–3 outcome，每 outcome ≥2 narration。
- 覆盖 12–18 岁、成年恋爱、住房、疾病、教区、市场债务、女性家务、老年失亲。
- 增加 content-author CLI、覆盖审计、真实模型生成、验证后落盘。

### B. Birth Compiler 2.0

- 把自由祝愿编译成有界 Birth Contract：privateGoal、focus、trait/skill 微调、白名单 capability、conditions/limits/costs。
- 能力必须有真实代价/限制，不保证实现；失败保留原愿望。

### C. 读取路径与规模

- 世界摘要、人物分页、单人详情、搜索，不再每次全量加载世界。
- 1k/5k 人物持久化基准。
- 不破坏现有 UI 和归档世界。

### 验收门槛

typecheck、v4 测试 ≥60、全量测试、build、e2e、内容审计、capability 实际影响事件、1k/5k benchmark，不宣称 20k。

**这个目标本身没有包含“历史宏观参数层”和“LLM 动态事件池治理”。** 这是后续问题的根源之一。

---

## 3. 实际完成的内容

### 3.1 内容工厂 2.0

新增 8 族：

- `vienna-youth-threshold`
- `vienna-courtship-courtyard`
- `vienna-housing-move`
- `vienna-medical-treatment`
- `vienna-parish-aid`
- `vienna-market-debt`
- `vienna-women-housework`
- `vienna-elder-bereavement`

当前总量：

| 指标      | Phase 1 | Phase 2 |
| --------- | ------: | ------: |
| 生成族    |      14 |      22 |
| 生成场景  |      56 |      88 |
| outcome   |     143 |     239 |
| narration |     230 |     423 |

新增 `packages/v4/content-author/` 与 `scripts/v4-content-author.ts`：

- 覆盖报告；
- 单族生成；
- `--generate-missing`；
- 真实模型调用；
- 先过 `packages/v4/generated.ts` 校验，再写文件；
- 输出 tokens、文件、失败原因。

真实生成调用（子代理报告）：

- 8 次成功共 **73,458 tokens**；
- 失败/重试共 **82,941 tokens**；
- 失败内容只在 `/tmp/opencode/*.attempt-*.raw.json`，未入库。

同时修正了 13 个既有生成包中的无效字段（skill/education/flag/condition/role），并新增 `education.status`、`skill` 白名单校验。发现模型会自造 `vocational` 这类枚举，已拒绝并改为合法的 `apprenticeship`。

### 3.2 内容审计

`pnpm v4:audit 80` 当前结果：

| 指标                                      |           数值 |
| ----------------------------------------- | -------------: |
| 80 年结束时间                             |           1992 |
| 人物总数 / 存活                           |       102 / 69 |
| 事件总数                                  |          3,657 |
| 事件/年                                   |          45.71 |
| focal 事件 / 覆盖年份                     |       279 / 66 |
| 因果事件                                  |            358 |
| 请求/回应                                 |             74 |
| 出生                                      |             75 |
| 死亡                                      |             31 |
| 零事件年份                                |              0 |
| 生成事件                                  | 2,967（81.1%） |
| 最高频场景占比                            |           7.9% |
| 22 个生成族实际触发                       |          22/22 |
| 未解析 token / 未知 effect / 重复文本告警 |      0 / 0 / 0 |

审计同时输出：

- 按 stage/family 的事件数；
- 未触发族；
- `scene_blocked` 原因（共 2,304 次，主因 `missing_role:partner` 955、`missing_role:subject,partner` 452、`missing_role:subject` 372）；
- focal 事件族分布；
- 文本告警和样例事件。

### 3.3 Birth Contract 2.0

新增：

- `packages/v4/birth-contract.ts`：schema、白名单、边界、禁止字段、文本不可信处理。
- `packages/v4/birth-contract-store.ts`：事务锁 + revision、服务端复核、以 `compiledAt` 防止重复应用。
- `tests/v4-birth-contract.test.ts`：8 项测试。
- `wish.ts` 暴露 `compileBirthContract()`；worker 改用完整 contract。

engine 实际消费：

- `focus` 与 conditions 调整事件权重；
- capability 映射到 education/work/social/health 标签；
- `limits` 限制契约带来的总权重优势；
- `costs` 每年最多结算一次真实健康/情绪/照护代价。

真实模型样本返回合法契约，约 **1,343 tokens**。模型把 `traitDeltas/skillDeltas` 输出为数组的情况已做规范化。

### 3.4 读取路径

新增：

- `latestV4WorldMeta`
- `v4PersonSummaries`（keyset 分页，默认 200/最大 500）
- `v4PersonSummariesByIds`
- `v4WorldIndex`
- `v4PersonDetail`
- `v4EventDetail`
- `v4PersonSearch`
- `v4EventLookups`
- cursor 编解码

API/UI：

- `/api/v4/world` 返回当前页人物和 `peopleTotal/peopleAlive/householdCount/peopleNextCursor`；
- `/api/v4/persons/:id` 轻量单人查询；
- `/api/v4/events/:id`、`/search` 不再全量加载；
- 坏 cursor 返回 400；
- UI 支持“加载更多人物”和地图已载入提示；
- participants-only 事件现在只允许当前用户拥有任一参与者时读取。

1k/5k PostgreSQL 实测（最终）：

|  人物 | 首次 save | 重复 save | 全量 load | overview |   人物页 | 单人详情 |    搜索 |
| ----: | --------: | --------: | --------: | -------: | -------: | -------: | ------: |
| 1,000 |  69.43 ms |  52.49 ms |  28.16 ms |  1.58 ms |  4.35 ms |  4.11 ms | 0.96 ms |
| 5,000 | 327.05 ms | 303.66 ms |  63.26 ms |  3.38 ms | 10.44 ms |  5.25 ms | 3.04 ms |

只测了 1k/5k；没有 20k/并发 API 结论。

### 3.5 主代理在集成中修的机制问题

这些是 Phase 2 期间实际发现并修复的：

1. 老年死亡原来 `oncePerPerson` 且要求 health ≤0.45；存活一次可能活到 140 岁。改为 72–118 岁每年可重复。
2. `courtship:$eventId` 嵌入引用不展开，所有求偶互动塌缩到同一个 id。
3. 家庭场景只对 `birth` 开放，初始 1912 人口只死亡不繁殖。改为 `birth + initial`。
4. 88 个场景淹没生育/求偶；加入 `lifecycle` 专用尝试槽。
5. `childbirth` 的 `cash max:120` 错误拒绝现金较多的家庭，移除。
6. 非同居 `partner` 会挡住 `notHasRelation partner`；新增 `sameHousehold` 条件。
7. `alreadyCompiled` 用占位 interpretation 判断，导致增量不应用；改为 `compiledAt`。
8. participants 事件可见性判断错误；改为按参与者所有权判断。

### 3.6 验证结果

```text
pnpm typecheck
→ 通过

TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 10 files passed, 79 tests passed

pnpm test
→ 59 files passed / 5 skipped
→ 353 tests passed / 34 skipped
→ 153.96s

pnpm build
→ 通过（3.11s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（6.8s）
```

---

## 4. 未完成、部分完成、明确未验证

| 项目                        | 状态   | 说明                                                    |
| --------------------------- | ------ | ------------------------------------------------------- |
| 历史宏观参数层              | 未开始 | 没有 `MacroRegime`/`RegimeLedger`；`pressures` 是静态表 |
| LLM Historical Director     | 未开始 | LLM 只做 Birth Contract 和离线内容工厂                  |
| 事件池治理                  | 未开始 | 没有运行时启用/停用/加权策略；内容固定编译进数组        |
| 原因别死亡模型              | 未完成 | 只有显式 `death` effect 和 vitality=0 fallback          |
| 婴幼儿/产妇/战争/流感死亡   | 未完成 | 当前审计为 0；见第 5 节                                 |
| 地区差异                    | 未完成 | 没有地区级风险参数                                      |
| 玩家婚姻/离婚/再婚/遗嘱选择 | 未完成 | 全是自动场景                                            |
| 运行时内容发布              | 未完成 | 内容工厂是离线 CLI                                      |
| 20k/并发持久化              | 未验证 | 只有 1k/5k                                              |
| 生产部署/Compose 实测       | 未完成 | 仅本地                                                  |
| 玩家间持久互动              | 未完成 | Relation/Interaction 可存储，但无跨玩家场景/UI          |
| History Director            | 未完成 | 没有宏观史官                                            |
| 完整继承/债务/资产分配      | 部分   | 只有家庭灭绝时现金转移                                  |
| 个人日志事件分页            | 未完成 | 单人详情一次取最多 200 条本人事件                       |

---

## 5. 核心偏差：测试通过，但历史与人口不成立

### 5.1 实测人口结果与常识冲突

用当前提交、固定审计出生 ID、80 年模拟，实际结果：

- 102 人，75 次出生，31 次死亡，69 人存活。
- 死亡年龄：5、24、34、40、43、47、48、50、50、51、66、72、73、73、73、74、76、76、78、79、79、80、81、82、82、82、83、84、85、86、88。
- 中位死亡年龄 **74**，均值 **66**，最大 **88**。
- 0 个 1 岁以下死亡，0 个 5 岁以下死亡（只有 1 个 5 岁死亡）。
- 0 个产妇死亡。
- 0 个 1918 流感事件/死亡。
- 0 个 1914 动员事件/死亡。
- 死亡原因只有三类：
  - “old age and heart failure” 13
  - “fall and pneumonia in old age” 7
  - `vitality_exhausted` 11

这不是 1912 维也纳，也不是 20 世纪上半叶。即使不要求精确拟合，**75 次出生、0 婴儿死亡、0 产妇死亡、0 战争/流感死亡、死亡中位数 74** 也明显不成立。

### 5.2 死亡机制本身错了

- 大多数场景死亡来自显式 `death` effect；没有基线死亡风险。
- 健康可以从食物/事件恢复到 1；慢性病、结核、肺炎、产后感染、婴幼儿腹泻没有持续风险。
- 老年死亡只从 72 岁开始；50–71 岁如果没有显式事件，几乎不会死亡。
- 战争内容没有死亡 outcome：1914 动员只是加 `soldier` role 和失业；二战征召只有“wounded -0.3 health”，没有死亡。
- 1918 流感场景要求 `subjectProvenance: ['birth']`，initial 人口被排除；且只有极少数人恰好在 1918 年符合年龄。
- `vitality_exhausted` 是系统 fallback，死亡原因字符串会进入 `Person.deathCause`，UI 可能直接显示内部字段。
- 工伤致命 outcome 要求 health ≤0.45，健康人几乎不会触发。
- 没有结核、肺炎、儿童腹泻、产妇感染、暴力、自杀、交通事故等基础死因。

### 5.3 这是“层”的错误，不是“数字”的错误

上一轮我的修法：

- 调整老龄场景的年龄段和重复率；
- 调整家庭场景的 provenance 和生育率；
- 调整 `VIENNA_1912_TIMELINE` 的静态压力；
- 用内容场景补人口数字。

这些都属于**内容层**。真正缺的是：

- 历史宏观参数层；
- 原因别、年龄别、地区别的风险计算；
- LLM 对宏观参数和事件池的低频治理；
- 对人口结果的验收指标。

所以继续加内容、调场景 rate，只会得到“事件很多，但人口结构仍然假”的结果。

### 5.4 其他偏差

- **初始人口被历史事件排除**：很多 `vienna-life` 场景 `subjectProvenance: ['birth']`，导致 1914/1918/工伤等不会作用于 initial 成年人。
- **人口增长是调参产物**：把 childbirth rate 调到 1、cooldown 调到 1 后，出生数上去了，但没有婴儿死亡/产妇死亡抵消，人口结果不真实。
- **事件量膨胀**：45.7 事件/年、102 人、81.1% 生成内容；大量事件并不等于历史真实。
- **选角失败 2,304 次**：partner/worker 角色供给不足，说明内容与社会网络没有形成稳定结构。
- **公共事件流几乎为空**：大多数场景是 participants 可见，世界栏主要靠 chronicle。
- **测试验收错位**：测试验证 schema、触发、类型、分页，没有验证“1912 维也纳的死亡结构是否合理”。
- **Phase 2 报告措辞过强**：把“工程交付完成”写成了接近“产品完成”，没有把人口/历史模型的失败放在同等显眼的位置。

---

## 6. 用户提出的问题

### 6.1 第一次批评

用户指出：

> 老年死亡原来是 oncePerPerson 且要求健康 ≤0.45，存活一次后可能活到 140 岁；改为 72–118 岁每年可重复的死亡风险。  
> 以 20 世纪为例，非自然死亡应该是非常常见的吧。人口寿命也绝对没有这么高。  
> 这说明很多常识性问题都建模不对啊。你去自查。

我的理解：

- 不是只修老年场景；
- 是整个人口/死亡/历史机制不成立；
- 需要先量化，再找根因。

### 6.2 第二次批评/设计澄清

用户进一步说明：

> 根本上，你没有理解该如何做这个游戏。我的理解是：需要做好数据抽象，LLM 可以根据历史宏观进行调整。比如如果战争频发，那么战争带来的死亡判定就会更多（当然也和地区相关）；如果技术提取发展、社会稳定，可能人口增长/人口寿命相关的参数也会得到调整。  
> 同时，LLM 就应该根据框架调整事件池等等。  
> 你先不要动手，你能理解吗？和最新的方案冲突吗？  
> 你作为 main agent，要负责整体分析判断，把执行交给 subagent 去。

我的理解：

- 不是让 LLM 直接决定某个人死；
- 是建立可验证的宏观参数与事件池策略层；
- LLM 低频提出调整，engine 执行，数据层记录；
- 主代理负责契约/审查，子代理负责实现。

### 6.3 与最新方案的关系

**不冲突，但优先级要改。**

Phase 2 的内容工厂、Birth Contract、读取投影仍可保留；它们是内容供给、个体起点和观察能力。

冲突的是：

- 静态 `VIENNA_1912_TIMELINE`；
- 静态老龄死亡；
- 内容场景直接承担人口学；
- LLM 只做离线内容和出生契约；
- 没有事件池治理和宏观参数。

因此，用户的要求不是“再加一个功能”，而是要求把系统从“内容驱动”改成“宏观参数 + 事件池 + engine 结算”。

---

## 7. 根因分析

### 7.1 领域模型缺一层

`WorldState.pressures` 只是一个 `Record<string, number>`：

- 没有地区；
- 没有年龄/性别/职业；
- 没有原因别；
- 没有生效时间/证据/置信度；
- 没有版本和 ledger；
- 没有“出生率/死亡率/迁移/医疗/稳定度/技术”的结构化字段。

`SceneDefinition.rate` 是内容字段，不能表达“战争频发 → 该地区适龄男性战争死亡风险上升”。

### 7.2 LLM 角色太窄

当前 LLM 只用于：

- Birth Contract；
- 离线内容生成。

没有：

- 世界快照；
- 宏观参数提案；
- 事件池调整；
- 证据/置信度；
- 失败回退和延迟响应处理。

### 7.3 验收指标错位

Phase 2 验收主要看：

- 事件数量；
- 生成族触发；
- schema 校验；
- 测试通过；
- 分页性能。

没有看：

- 婴儿死亡率；
- 5 岁以下死亡率；
- 产妇死亡率；
- 死因结构；
- 战争/瘟疫/饥荒死亡占比；
- 分地区/分年代预期寿命；
- 人口年龄结构；
- 事件池是否与宏观参数一致。

### 7.4 流程问题

- 子代理按文件边界拆任务，缺少“宏观语义”边界；
- 主代理在集成时用内容补丁修复长跑问题，没有先设计宏观层；
- 长跑审计只统计事件，不统计人口；
- 用户反馈后，我先做了 Phase 3 口头方案，但没有写成可执行契约，也没有量化当前失败。

---

## 8. 建议的 Phase 3：历史宏观层与事件池治理

### 8.1 设计原则

1. **参数不是剧情**：LLM 不写具体人的死法，只提出风险参数/事件池策略。
2. **地区/年代/人群是作用域**：所有参数必须带 scope、生效时间、证据、置信度、上限。
3. **寿命是结果，不是输入**：不直接设定“寿命=50”，而是年龄别/原因别风险，让寿命自然涌现。
4. **事件池是治理对象**：启用/停用/加权/限定范围，不是任意插入文本。
5. **单写者与可追溯**：engine 仍唯一写世界；提案、审批、应用、过期都写入 ledger。
6. **不追溯改写**：迟到/失败的提案只影响未来 tick，不重写已提交历史。
7. **默认确定性回退**：LLM 不可用时使用上次 regime/历史基线。
8. **玩家不豁免**：owner 只影响观察/访问，不改变世界物理。

### 8.2 数据抽象

建议新增（名字可调整）：

```text
MacroRegime
  id, version, scope(region/city/world), validFrom, validTo
  mortality:
    ageBands: 0, 1-4, 5-14, 15-24, 25-44, 45-64, 65-79, 80+
    causes: infection, tuberculosis, pneumonia, maternal, infant, war,
            accident, violence, famine, chronic, other
    baselineHazardByBand
    causeMultipliers / causeHazards
    modifiers: sex, occupation, class, household density, region
  fertility:
    ageSpecificBirthRate, marriageRate, maternalRisk
  migration: in/out, displacement, refugee
  economyFood: foodAvailability, priceStress, famineRisk
  healthSystem: doctorAccess, hospitalCapacity, sanitation
  stability: warIntensity, persecution, crime, riot
  technology: water, housing, medicine, transport
  uncertainty: confidence, sourceIds, notes
```

```text
MacroProposal
  id, regimeId, proposedBy(model/worker), createdAt
  deltas: typed field -> bounded delta
  scope, effectiveFrom, expiresAt
  evidence: event ids / chronicle ids / source ids
  rationale
  confidence
  status: proposed | validated | applied | rejected | expired
```

```text
EventPoolPolicy
  id, version, scope, validFrom/To
  operations:
    enable/disable family/scene
    weight delta (bounded)
    region/stage/age/role constraints
    required coverage guards
  source/evidence/rationale
```

```text
RegimeLedger
  append-only:
  proposal -> validation result -> applied tick -> superseded/expired
  worldRevision, simulator identity
```

关键点：

- `MacroRegime` 是**数据**，不是代码；模型不能写 SQL/JS/HTTP。
- 每个字段有白名单、数值范围、单位、作用域和有效期。
- 缺少证据或超出范围的 proposal 拒绝。
- 事件池操作只能引用已注册的事件族/场景 id，不能凭空创建运行时事件。

### 8.3 LLM Historical Director

低频运行（例如每年/每个历史转折点，或按需），输入：

- 世界日期、地区、人口结构、近期死亡/出生/迁徙；
- 当前 regime；
- 近期 committed events；
- 事件池覆盖/阻塞；
- 历史证据（chronicle/source）。

输出：

- 一个或多个 `MacroProposal`；
- 或 `EventPoolPolicy` 提案；
- 或“无变化”；
- 不得引用未提交事件作为事实，不得预测未来。

流程：

```text
snapshot
 -> LLM proposal
 -> schema validation / bounds / scope / evidence
 -> queue (world revision)
 -> next tick boundary apply
 -> ledger
 -> engine uses regime
 -> audit / observer
```

失败/超时：

- 不阻塞时钟；
- 沿用当前 regime；
- 记录失败原因；
- 迟到 proposal 不会改写过去，只能影响未来或过期丢弃。

### 8.4 engine 消费方式

对每个人、每年/每月：

1. 读取当前 regime（世界/地区/阶层/职业等 scope）。
2. 组合个体暴露：年龄、性别、职业、家庭密度、地区、战争状态、粮食、医疗。
3. 计算原因别风险；不是直接读一个“死亡率”。
4. 生成具体事件/结果；死亡必须有具体原因和叙事，不能输出 `vitality_exhausted` 这类内部字段。
5. 记录 regime id/version 到事件或 ledger，便于复盘。
6. 高风险/低风险都要有可解释的因果链。

事件池：

- engine 根据 `EventPoolPolicy` 过滤/加权已注册场景；
- 内容工厂根据 policy 生成新候选包；
- 二者都经过 schema/coverage/validation。

### 8.5 验收指标

必须从“事件数量”改成“人口/历史结构”：

- 婴儿死亡率（<1 岁死亡/出生）；
- 5 岁以下死亡率；
- 产妇死亡率；
- 年龄别死亡率和预期寿命（出生时/5 岁时/成年）；
- 死因结构（感染、结核、肺炎、战争、事故、暴力、孕产、老年）；
- 战争/瘟疫/饥荒年份的死亡峰值；
- 地区/年代差异；
- 人口年龄结构/性别比；
- 事件池覆盖和阻塞原因；
- 所有死亡原因必须是具体、可读、无内部字段；
- 审计可重复（固定 seed/出生 id/regime 版本）。

不要求精确拟合，但要求落在有来源的合理区间，并明确不确定性。

### 8.6 与现有代码的迁移

- 保留 Phase 2 的 `BirthContract`、内容工厂、读取投影。
- 把 `VIENNA_1912_TIMELINE` 和静态老龄场景降级为 **baseline regime pack** 的种子数据，而不是最终物理。
- 新世界从当前 regime 开始；旧归档世界不改写。
- 当前活动世界只从下一个 tick 应用新 regime，不追溯。
- 事件池政策与内容工厂版本化；旧事件仍可 replay。

### 8.7 子代理拆分建议

- **子代理 A：宏观领域与持久化**
  - `MacroRegime`、`MacroProposal`、`RegimeLedger`、store、migration/projection；
  - 只加数据结构和读写，不碰 engine 调度。
- **子代理 B：Historical Director**
  - prompt、严格 schema、worker、边界验证、失败回退、延迟处理；
  - 不写世界状态。
- **子代理 C：事件池治理与审计**
  - `EventPoolPolicy`、运行时启用/加权、覆盖审计、内容工厂接入；
  - 不改 engine 物理。
- **主代理**
  - 统一契约、ADR、engine 消费接口、跨模块集成、审查、全量验收；
  - 不让多个子代理同时编辑 `engine.ts`。

### 8.8 开放问题

1. **LLM 提案是自动应用还是人工/规则审批？**
   - 建议：小范围、白名单字段、在界内的 proposal 自动应用并记录；大范围/跨地区/长期变化进入审批或二次验证。
2. **历史校准数据从哪里来？**
   - 用仓库已有来源 + 公开历史统计；不追求单点精确，使用区间和置信度；明确“这是模型，不是历史档案”。
3. **地区粒度到哪里？**
   - 先 world/city/district/occupation 四层；不要一开始做全球每城。
4. **event pool 是否允许 LLM 直接关闭某个族？**
   - 建议只允许 bounded policy，必须有覆盖 guard；关闭后不能导致年龄/阶段完全无事件。
5. **当前 Phase 2 的静态补丁怎么处理？**
   - 保留为 fallback baseline；新 regime 覆盖后再移除硬编码判断，避免双重计算。

---

## 9. 结论

- Phase 2 的**工程交付**是真实的：内容 22 族/88 场景、Birth Contract、分页读取、79 项 v4 测试、353 项全量测试、build/e2e 都通过。
- Phase 2 的**产品/历史模型**不成立：没有宏观层，死亡结构是内容补丁，75 次出生/0 婴儿死亡/0 产妇死亡/0 战争流感死亡/死亡中位数 74。
- 用户批评的核心不是“再加死亡场景”，而是“先做数据抽象，让 LLM 在框架内调整宏观参数和事件池，engine 结算”。
- 这与 Phase 2 不冲突；Phase 2 应作为 Phase 3 的内容、契约和读取基础，但静态死亡/静态 pressure 必须被替换或降级为 baseline。
- 在 Phase 3 契约完成前，不应该继续用内容数量或场景 rate 去补人口数字。

下一步应由主代理先写 Phase 3 的 ADR/契约/验收指标，再拆给子代理；本轮不继续实现。
