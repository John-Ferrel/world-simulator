# Phase 9：Large-Scale Life Content & Coverage 验收报告

日期：2026-11-03  
基线：Phase 8 `993dc6f` / 文档 `a1b8b46`  
目标：在**不新增 Engine** 的前提下，用现有 Task/Event 执行层真实生产、验证、发布并运行大规模人生内容；用有效候选、长期人生和性能证明内容扩张是否成立。

## 0. 状态总表

| 项目 | 状态 | 证据 / 边界 |
| --- | --- | --- |
| Phase 9 内容生产 | 完成（真实模型） | 27 Family / 162 nodes / 60 Task + 102 Event；见 `phase-9-content-batch.json` |
| Task/Event 同构 | 完成 | 继续使用 `TaskDefinition = SceneDefinition & { task }`；没有第二套执行器 |
| 内容验证 | 完成 | schema/role/condition/effect、token、近似去重、人工抽查；发布 27/27 |
| 有效候选审计 | 完成 | `phase-9-coverage.json`；按 stage/age/职业/目标统计，不以定义总数代替 |
| Phase 8 vs 9 对照 | 完成 | 3 seed × 35 年；Task 候选 1.25→6.83，事件候选 11.80→24.01 |
| 五种固定人生 | 完成 | 贫穷学徒/富裕青年/医生/活动者/特殊能力者 + 6 个随机出生 |
| 88 年 playtest | 完成（treatment/control） | 见第 6 节 |
| 88 年内容审计 | 完成 | 见 `phase-9-audit-treatment.json` / `phase-9-audit-control.json` |
| 性能 | 完成（有限规模） | 160 人真实内容 + 1k/5k/20k 合成人口；不是 20k 完整内容/DB |
| 浏览器 | 完成 | build 通过；Playwright v4 1 项通过（9.3s）；三栏/日志/地图未改布局 |
| 长期世界部署 | 未完成 | 无 20k 生产、无百万内容库、无全球城市迁移 |

## 1. 内容生产

模型：`opencode-go/deepseek-v4.1-flash`。全部内容经真实模型调用、现有 `generatePack`、严格验证和近似去重；失败内容不发布。

### 1.1 最终规模

| 指标 | 实际值 |
| --- | ---: |
| Phase 9 Family / pack | 27 |
| six-node definitions | 162 |
| Task nodes | 60 |
| Event nodes | 102 |
| outcomes | 487 |
| narration variants | 974 |
| 发布 pack | 27 / 27 |
| 最终发布 pack 的生成 tokens | 530,721 |
| 累计 tokens（含被丢弃的重生成） | 1,123,277 |
| 精确重复 outcome | 0 |
| 近似重复（字符 bigram ≥ 0.82） | 0 |

生产运行明细见 `phase-9-production-cost.json`（16 次批量生成运行、逐次 pack 与 tokens）。

Phase 9 发布后的实际池：

- 110 Task（Phase 8 50 + Phase 9 60）；
- 206 generated event scenes（Phase 8 104 + Phase 9 102）；
- 285 个 event definitions（含作者场景）；
- `ALL_TASKS` / `ALL_EVENT_SCENES` 进入游戏；Phase 8/9 分数组保留用于对照。

Task/Event 比例为 60:102（37% Task），不是只扩被动场景，也不是只堆 Task。

### 1.2 生产批次

| 批次 | 包数 | 内容 |
| --- | ---: | --- |
| childhood | 5 | 家庭、学校、青春期、学徒、青年志向 |
| work | 5 | 印刷、商店、运输、求职、职业生涯 |
| social | 5 | 求偶、家庭照护、邻里、关系主动、日常文化 |
| history | 5 | 医疗、工会政治、战争后方、公共行动、文化接触 |
| gaps | 5 | 儿童家务任务、失业者事件、普通成人日常、老年日常、老年任务 |
| solitude | 2 | 独居成人/独居老人普通事件 |

覆盖 stage：childhood（12 Event + 6 Task）、adolescence（6 Event + 12 Task）、adulthood（72 Event + 36 Task）、elderhood（12 Event + 6 Task）。infancy 没有 Task，符合婴幼儿不能主动执行成人任务的边界。

### 1.3 失败、重试与修复

- childhood：首次 `p9-childhood-household` 空节点；重跑通过。
- history：`medical-daily`/`cultural-contact` 首次 knowledge effect 形状错误；生成器加入 knowledge 规范化后重跑。
- `union-political`：模型使用未允许的 `food`/`knowledge` 和未声明的 `{union}`；按“互助厨房/工会组织”语义补入允许 effect 与 `union` organization role 后重跑。
- gaps：`adult-unemployed` 首次使用未允许的 knowledge effect；补入“求职线索”语义后重跑。
- 修复 narration token 过滤：此前会把所有含角色 token 的变体丢弃，导致 history 若干包只有 0–1 条 narration；现在只丢弃真正未解析的 token。
- 没有为了通过验证而放宽年龄、职业、地点、时代或关系条件；`subject-only` 独居内容也不凭空生成关系。

### 1.4 内容结构审计

`phase-9-content-report.json`：

- 0 个未解析 token（outcome + narration）；
- 0 个重复标题、0 条精确重复 outcome；
- 所有 Task 都有 domain/goals/needs/baseUtility；
- 所有 Event/Task 至少 2 个 outcome，至少 1 条 narration；
- 162 个节点中 120 个 authored ageWindow 被 stage bucket 裁剪；30 个下界被裁剪、108 个上界被裁剪。这是真实限制，不能声称所有 authored 年龄窗口都可达。

## 2. 执行层修正（不是新 Engine）

1. **只从可执行 Task 中选**：`chooseContentTask` 在加权选择前完成 role cast 与 outcome selection，避免高分但不可执行的 Family 占掉年度行动。
2. **Task 与 Agency 共存**：内容 Task 必须超过 Agency plan 的动态阈值；组织领袖的会议/招募/出版/过程行动优先，避免大 Task 池静默取代自下而上历史。
3. **生成事件作用于所有具名人物**：`compileGeneratedPack.subjectProvenance` 加入 `materialized_population` / `historical_activation`。此前 materialized 成人只能选 Task、没有被动事件；这是候选池为 0 的主因之一。
4. **生成事件 cooldown**：同一具体生成事件对同一人物至少隔 2 年，避免每年重播同一场景。
5. **Task 事件识别**：Phase 9 Task id 不以 `task-` 开头；报告改用 Task ID 集合分类，避免漏计。

## 3. 有效候选覆盖

`phase-9-coverage.json`：同一 Vienna 世界推进 35 年，审计**全部 139 名在世具名人物**（不再取任意前 120 人）。

| 指标 | Phase 9 内容池 |
| --- | ---: |
| Task definitions | 110 |
| Event definitions | 285 |
| 在世人物 | 139 |
| 实际事件 | 5,672 |
| Task 事件 | 754 |
| 实际触发不同 Task | 64 / 110 |
| 平均有效 Task 候选 | 7.17 |
| 中位有效 Task 候选 | 7 |
| Task 候选范围 | 0–23 |
| 平均有效 Event 候选 | 24.21 |
| 未触发 Task | 46 / 110 |

按 stage：

| stage | 人数 | 平均 Task 候选 | 平均 Event 候选 |
| --- | ---: | ---: | ---: |
| adulthood | 64 | 11.14 | 43.44 |
| elderhood | 27 | 7.56 | 13.89 |
| childhood | 32 | 2.00 | 4.75 |
| adolescence | 8 | 2.00 | 4.25 |
| infancy | 8 | 0 | 3.00 |

按职业（`byOccupation`）：

| 职业 | 人数 | 平均 Task 候选 | 平均 Event 候选 |
| --- | ---: | ---: | ---: |
| 无固定职业 | 108 | 6.19 | 24.73 |
| worker | 29 | 10.86 | 22.86 |
| Arzt | 1 | 7.00 | 16.00 |

“无固定职业”不再等于“没有事情可做”：其平均 Event 候选 24.73，和工人接近；Task 候选较低（6.19 vs 10.86），符合就业内容更多绑定工作/雇主的现实。但职业样本仍以无固定职业/worker 为主，不能据此宣称完整职业差异。

未触发 Task 主要分三类：

- Phase 8 的高条件职业/能力 Task；
- 需要四位真实历史人物之一仍在世/可接触的文化接触 Task；
- 需要特定家庭结构（伴侣、遗产、学徒考试）的 Task。

这不是“内容不存在”，而是 35 年单一样本没有走到；需要更长样本或多 seed 验证。没有为了把这些数字做高而放宽条件。

## 4. Phase 8 vs Phase 9 对照

`phase-9-compare.json`：同一引擎、同一初始世界、3 个 seed × 35 年。A = Phase 8 内容池，B = Phase 9 内容池。由于 Task 改变行动路径，不比较原始事件 ID 一一对应。

| 指标（3 seed 平均） | Phase 8 | Phase 9 | 变化 |
| --- | ---: | ---: | ---: |
| 事件总数 | 4,677.33 | 5,753.00 | +23.0% |
| 每年事件 | 133.64 | 164.37 | +23.0% |
| Task 事件 | 580.33 | 803.67 | +38.5% |
| 实际触发不同 Task | 34.00 | 64.00 | +88.2% |
| 不同 action prefix | 169.67 | 271.33 | +59.9% |
| 在世人物平均 Task 候选 | 1.25 | 6.83 | +446% |
| 在世人物中位 Task 候选 | 0 | 6.00 | — |
| 在世人物平均 Event 候选 | 11.80 | 24.01 | +103% |
| Task 候选为 0 的在世人物 | 72.00 | 22.67 | -68.5% |
| Event 候选为 0 的在世人物 | 1.67 | 0 | -100% |
| 历史人物关系数 | 107.67 | 111.33 | +3.4% |
| 35 年耗时 | 3,704.57 ms | 4,893.73 ms | +32.1% |
| 每年耗时 | 105.8 ms | 139.8 ms | +32.1% |
| 候选审计 | 3.45 ms/人 | 7.18 ms/人 | +108% |
| 堆内存 | 291.67 MB | 264.67 MB | -9.3% |

结论：

- Task 有效候选、Event 有效候选、实际 Task 事件、不同 Task 数和 action 多样性均显著增加；
- “Task 候选为 0”的在世人物从 72.00 降到 22.67，Event 候选为 0 从 1.67 降到 0；
- 代价是 35 年运行耗时约 +32%，候选审计约 +108%；这是内容池更大、且更多 materialized 人物进入事件候选的直接成本；
- 历史人物关系数略升（+3.4%），但不能据此宣称历史接触质量同步提升。

## 5. 长期人生（45 年 treatment/control）

`phase-9-lives.json`：同一世界，treatment 有 Task，control 无 Task；五种固定人生 + 6 个随机出生。

| 指标 | treatment | control |
| --- | ---: | ---: |
| 事件 | 11,349 | 8,283 |
| Task 事件 | 1,516 | 0 |
| Agency 事件 | 242 | 830 |
| 不同 Task | 73 / 110 | 0 |
| Task 事件占比 | 13.4% | 0 |
| historical developments | 7 | 9 |
| legacy | 3 reform | 未统计同口径 |

五种固定人生（treatment）：

| 人物 | 年龄 | 事件 | Task 事件 | 不同 Task | 历史接触 |
| --- | ---: | ---: | ---: | ---: | --- |
| Franz Lechner（贫穷学徒） | 50 | 167 | 48 | 18 | Schnitzler, Kraus, Freud |
| Otto Winter（富裕青年） | 69 | 224 | 63 | 24 | Schnitzler, Freud, Adler |
| Emil Weiss（医生） | 81 | 883 | 172 | 36 | Schnitzler, Freud, Kraus, Adler |
| Alois Lechner（活动者） | 73 | 273 | 53 | 23 | Schnitzler, Kraus |
| Sofia Beobachterin（特殊能力） | 45 | 328 | 53 | 22 | Schnitzler, Kraus |

随机出生样本（6 人）：

- Therese Ladenhüterin：301 事件 / 59 Task / 23 种 Task；
- Rudolf Schreiber：295 / 61 / 25；
- Helene Kontoristin：294 / 52 / 18；
- Anton Bäckerlehrling：270 / 49 / 20；
- Klara Näherin：5 岁去世，6 事件，0 Task；
- Emil Zugschaffner：2 岁去世，2 事件，0 Task。

婴幼儿死亡样本没有被“内容繁荣”掩盖；死亡仍由统计/事件因果产生。

重复边界：

- 单人同一 Task 的最高重复为 `organize-relief` 9 次 / 45 年；
- control 的 Agency 事件 830，高于 treatment 的 242；Task 内容确实替代了一部分通用 Agency 行动；
- treatment 的 historical developments 7 个，仍低于 control 9 个；组织领袖优先计划后仍不足以完全抵消 Task 的替代效应。这是明确的未达标项，不能宣称制度史同等丰富。

## 6. 88 年 playtest 与内容审计

`phase-9-playtest-treatment.json` / `phase-9-playtest-control.json`：同一 Vienna seed、88 年（1912–2000）。

| 指标 | treatment（有 Task） | control（无 Task） |
| --- | ---: | ---: |
| 事件 | 31,567 | 29,737 |
| 事件/年 | 358.72 | 337.92 |
| 具名人物 | 806 | 729 |
| 在世 | 427 | 374 |
| 出生 | 459 | 415 |
| 死亡 | 377 | 353 |
| 统计死亡 | 375 | 349 |
| Task 事件 | 3,673 | 0 |
| Task 事件占比 | 11.6% | 0 |
| 每具名人物年事件 | 0.445 | 0.464 |
| scene prefix >12 次/人 | 126 人 | 192 人 |
| 最高单人同 prefix | 71 | 44 |
| 运行耗时 | 115,336 ms | 164,392 ms |
| 未解析 token | 0 | 0 |
| 死亡后事件 | 0 | 0 |
| 所有 focal 死亡年份 | 无 | 1982 |

解释：

- 总事件数 treatment 更高（+6.2%），但**每具名人物年事件密度反而略低**（0.445 vs 0.464）。总事件增加主要来自更多出生/存活人物，而不是基础风险被内容数量直接放大。
- 统计死亡占死亡比例：treatment 375/377，control 349/353；没有出现“内容越多、疾病/事故死亡比例失控”的证据。
- treatment 的重复 offender 人数更少（126 vs 192，按每百人 15.6 vs 26.3），但最高单人同 prefix 更高（71 vs 44）。最高值来自 base `vienna-social-movement.meeting`，不是 Phase 9 生成内容；生成内容 cooldown 2 年只能缓解，不能消除。
- 88 年 treatment 存在 3,673 个 Task 事件，说明 Task 不是只在 35 年样本中偶然出现。
- treatment 的 focal 人物没有在 1982 前全部死亡，control 全部死亡；内容/行动改变了生存与人口轨迹，所以不能把两边的总事件数直接当作同一人口规模下的风险比较。

### 6.1 88 年内容审计

`phase-9-audit-treatment.json` / `phase-9-audit-control.json`（`pnpm v4:audit 88`）：

| 指标 | treatment | control |
| --- | ---: | ---: |
| 事件 | 30,716 | 25,120 |
| 事件/年 | 349.05 | 285.45 |
| 具名人物 | 770 | 650 |
| 在世 | 399 | 334 |
| 出生 | 414 | 337 |
| 死亡 | 369 | 314 |
| 统计死亡 | 365 | 313 |
| under-5 死亡 | 40 | 34 |
| 产妇死亡 | 6 | 7 |
| 死亡年龄中位数 | 65 | 65 |
| 零事件年份 | 0 | 0 |
| 生成内容事件占比 | 65.5% | 63.7% |
| 生成 Task 事件 | 3,220 | 0 |
| 触发生成 Family | 39 / 43 | 39 / 43 |
| 未解析文本 | 0 | 0 |
| 未知 effect 警告 | 0 | 0 |
| 最高频场景 | statistical_illness_worsened 3.1% | social_movement.recruitment 4.8% |

- 4 个未触发 Family 是 `vienna-wartime-homefront`、`vienna-war-aftermath-life`、`p9-history-war-homefront`、`p9-work-shop`。前三个需要真实战争过程/战后 legacy；这次世界线没有满足，属于正确的状态门控，不是内容缺失。`p9-work-shop` 需要商店 employment/placeKind，本次人物样本没有满足，是可达性缺口，不是验证失败。
- 生成内容占比高（65.5%）主要是因为生成事件现在也作用于 materialized population；最高频场景仍是统计疾病恶化（3.1%），没有一个生成场景独占事件量。
- 事件密度：treatment 0.453/人年 vs control 0.439/人年（+3.2%）；总事件 +22.3%、具名人物 +18.5%。密度只小幅上升，没有证据表明内容池扩张让基础疾病/事故风险按定义数量放大，但也不是完全不变。
- 统计死亡、under-5 死亡、产妇死亡没有恶化；但 population 与死亡年龄有差异，不能把 88 年两边当作同一人口规模。

## 7. 性能

### 7.1 真实内容、约 160 人

来自 `phase-9-compare.json`（3 seed × 35 年，含事件运行时、Agency、经济、全部 206 generated scenes + 110 Task）：

| 指标 | Phase 8 内容 | Phase 9 内容 |
| --- | ---: | ---: |
| 每年耗时 | 105.8 ms | 139.8 ms |
| 35 年耗时 | 3,704.57 ms | 4,893.73 ms |
| 候选审计（全部在世人物） | 3.45 ms/人 | 7.18 ms/人 |
| 堆内存 | 291.67 MB | 264.67 MB |

Phase 9 的真实内容运行成本约 +32%，候选审计 +108%。这不是“免费扩容”，但仍在单进程可接受范围；heap 的差异受 GC/人口波动影响，不应解读为 Phase 9 更省内存。

### 7.2 合成人口 1k / 5k / 20k

`phase-9-benchmark.json`，`scripts/v4-runtime-benchmark.ts`，3 年，macro 开启。合成世界没有内容事件，所有人物都是成年、任务条件近似全通过，因此这是**Task 选择最坏情况**，不是完整内容负载。

| 人口 | 无 Task | Phase 8 Task（50） | Phase 9 Task（110） |
| ---: | ---: | ---: | ---: |
| 1,000 | 55 ms/年 | 107 ms/年 | 95 ms/年 |
| 5,000 | 232 ms/年 | 555 ms/年 | 436 ms/年 |
| 20,000 | 967 ms/年 | 3,049 ms/年 | 2,363 ms/年 |

20k 时 heap：无 Task 226 MB、Phase 8 251 MB、Phase 9 400 MB；事件数三者均约 29,680（合成事件集）。Task 选择是主要成本，但 Phase 9 没有比 Phase 8 更慢：两者都受“候选预筛选 + 有限重试”保护。

### 7.3 已修复的扩展性瓶颈

第一版 `chooseContentTask` 为每个 actor cast 所有候选 Task；20k 合成人口 + 110 Task 时达到 **16,225 ms/年、685 MB**。改为：

1. 先用 stage/conditions/taskUtility 预筛选；
2. 加权抽一个候选；
3. 只有 cast/outcome 失败时才重试，最多 8 个候选。

同一 20k 合成负载降到 **2,363 ms/年、400 MB**。没有引入“每人每 Tick 扫描全部内容”的新路径；Task 仍按 stage 分桶，Event 仍按 stage/rate 候选。

### 7.4 内容加载

Phase 9 JSON 约 1.1 MB（`p9-*.json`），全部 generated JSON 约 2.1 MB。内容在启动时由 `phase9.ts` 静态导入并编译；没有每 Tick 重新读取/解析 JSON。

实测动态导入 `packages/v4/content/generated/index.ts`（tsx 进程已启动，模块加载 + JSON 解析 + 编译）：3 次 **72.1 / 74.0 / 73.5 ms**，加载后 heap 约 17–18 MB。20k 完整内容 + PostgreSQL/API 冷启动未测，明确列为未完成。

## 8. 浏览器与构建

最终执行：

```text
pnpm typecheck
→ tsc --noEmit，退出码 0

pnpm test
→ Test Files 76 passed | 7 skipped (83)
→ Tests 452 passed | 36 skipped (488)
→ 158.22s

pnpm build
→ Vite production build 通过，2.93s；存在字体/Pixi 资源体积提示

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed (9.3s)
→ register, give birth, read a concrete log and inspect the map
```

E2E 启动早期出现一次 Vite `/api/health` 代理 `ECONNREFUSED`（API 尚未就绪），随后 webServer 就绪、测试通过；不是页面错误。测试覆盖注册、创建孩子、读具体日志、切换人物、地图 pin 与地点人物面板，未新增管理 UI 或复杂导航。

## 9. 未完成 / 真实限制

- 27 个 Family / 162 nodes 仍是垂直切片，不是千级、百万级内容库；没有全球城市/职业矩阵。
- 120/162 节点的 authored 年龄窗口被 stage bucket 裁剪；实际可达窗口小于声明窗口。
- 童年 Task 平均有效候选 2.00，显著低于成人 11.14；童年主动行动仍薄弱，但已不是 0。
- infancy 没有 Task；这是设计边界，不是遗漏。
- 46/110 Task 在 35 年单样本中未触发；不能据此判断其不可达，但也没有证明全部可达。
- 生成事件扩展到 materialized population 后，事件总量和运行成本上升；基础统计风险未被内容数量直接放大，但需要继续监控。
- Task 内容减少通用 Agency 事件和 historical developments（45 年 7 vs 9）；内容 Task 尚未包含“创建组织/历史过程”的完整原语组合。
- 医生等职业仍会出现同一医疗事件多年重复；2 年 cooldown 只能缓解，不能消除。
- 历史人物关系数在 3 seed 对照中略升（107.67→111.33），但普通生活内容增加不等于历史接触质量自然提升。
- 未做 20k 完整内容 + PostgreSQL/API 生产负载；未做公网部署。
- 语义去重是字符 bigram + 人工抽查，不是语义向量/人工全量审阅。

## 10. 结论

Phase 9 达到了本轮最重要的可验证目标：在**同一个自主演化世界、同一 Engine**下，Phase 9 内容池让在世人物的有效 Task 候选从 1.25 提升到 6.83，有效 Event 候选从 11.80 提升到 24.01，实际 Task 事件 +38.5%，不同 Task +88.2%，并让 5 类固定人生与 6 个随机出生经历明显不同的生活领域。

但这不是“内容问题已经解决”。童年、婴幼儿、老年、职业深度、历史过程、重复和性能仍有明确缺口；本报告把这些缺口保留为下一轮生产输入，而不是用定义数量掩盖。
