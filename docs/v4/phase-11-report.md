# Phase 11：Compositional Story Engine 验收报告

日期：2026-11-04  
基线：Phase 10 `bc47bd2`  
核心：把内容从静态 Family/Node 改为 **World Context × Milieu × Plot Kernel × Person** 的组合编译；Engine、Agency、Task、Event、Historical Process 保留。

## 0. 状态总表

| 项目 | 状态 | 证据 / 边界 |
| --- | --- | --- |
| 五层组合架构 | 完成 | Context / Milieu / Kernel / Composer / Engine 已接通 |
| Plot Kernel Library | 完成（150） | 5 领域 × 30；100 Event / 50 Task；98 variants；450 base outcomes |
| Context Packs | 完成（10） | 年代、制度、战争/战后/改革/医疗/农村/港口/大学；12 Milieus |
| Engine 接入 | 完成 | `V4AdvanceOptions.composition`；仍由原 cast/effect/EventFact 提交 |
| 组合容量 | 百万级上界 | naive upper bound 1,265,143；compiled 255 scenes / 151 tasks；996 跨情境 scene IDs；293 实际触发 |
| 有效候选 | 完成 | 588 Event / 291 Task 定义；avg Task 8.04 / Event 25.60 |
| 长周期人生 | 完成（88 年） | 23,802 事件 / 2,965 Task / 27 repeat offender / 0 未解析 token |
| 文学审校 | **未通过** | Critic 20 样本：9 通过 / 11 失败，均分 31.5/40；本报告不宣称文学达标 |
| UI | 完成 | 既有 semantic person/event/process 高亮/档案继续工作；e2e 通过 |
| 大规模 20k 内容执行 | **未达标** | 20k 合成人口 + composition：约 252,656 ms/年、447 MB；这是明确瓶颈 |

## 1. 组合架构

### 1.1 类型

- `ContextProfile`：id、有效年代、tags、地区、process/legacy gate、place map、工资乘数、flavor、causal notes、priority。
- `MilieuProfile`：家庭、学校、印刷厂、工厂、商店、医院、工会、咖啡馆、军队、农庄、大学、市政；placeKind、occupations、conditions。
- `PlotKernel`：stage/ageWindow、contexts/milieus tags、roles、conditions、2–3 outcomes、typed effects、variants、task meta。
- `KernelVariant`：`when.contextTags/milieuTags/processKinds/legacyKinds`，可替换 outcomes/roles/conditions/rate。
- `CompositionTrace`：kernel/context/milieu/variant/compiledSceneId/outcomeCount。

### 1.2 Composer

`packages/v4/composition/composer.ts`：

- 只激活当前年份/世界 macro 满足的 Context；
- 用 context/milieu tags 预筛选 Kernel；
- 同一 `kernel+milieu` 由最高优先 Context 编译，避免战争/工厂/大学上下文重复；
- 解析 `@school/@workplace/@factory/@market/@hospital/@government/@cafe/@station/@home/@rural/@university` 与工资乘数；
- 编译成原 `SceneDefinition` / `TaskDefinition`；
- 按 `world.id + year + active contexts + process/legacy signature` 缓存；
- 生成稳定 `kernel::context::milieu[::variant]` ID。

### 1.3 Engine 接入

`advanceV4Year` 新增 `composition` 选项：

```text
compose → definitions/tasks
→ usableDefinitions
→ existing scene cast / outcome select / typed effects
→ EventFact
```

没有新增 Event/Task 执行器。`auditCandidatePools` 也接受 composition。`parseComposedAction()` 可从已提交 action 反查 kernel/context/milieu/variant。

## 2. Kernel 资产

| 指标 | 实际值 |
| --- | ---: |
| Kernels | **150** |
| Event kernels | 100 |
| Task kernels | 50 |
| Base outcomes | 450 |
| Variants | 98 |
| Contexts | 10 |
| Milieus | 12 |
| 领域 | childhood/education、work/commerce、family/social、health/violence/war、civic/culture/migration |

成本口径见 `phase-11-production-cost.json`：Content Author API 调用 0；Kernel 由并行 Subagent 创作，仓库无法计量其 token，不把 0 API 调用说成零成本。

每个 Kernel 都通过 `tests/v4-kernels.test.ts`：唯一 id、subject role、role kinds、outcome/effects、`$` role refs、`@` placeholders、task metadata、variants。

### 2.1 因果变化

- 98 个 variants，覆盖 war/crisis/reform/postwar/rural/medical 等上下文。
- Composer 选择第一个匹配的 variant；variant 可替换 outcomes/roles/conditions。
- 例：`kernel-test.workshop-job` 在 1912 编译为工厂试工；在 war 上下文替换为战时替工/配给券（测试中验证 outcome id 不同）。
- 但 Critic 指出：98 个 variants 中只有 1 个 key 在 `milieuTags`，只有 1/686 outcome 使用 `{milieu}`；大量变化仍是 B 级（地点/工资/资格），不是 C 级制度因果。报告不掩盖这一点。

## 3. 容量统计

`phase-11-composition-audit.json`：

| 指标 | 值 |
| --- | ---: |
| naive theoretical upper bound | **1,265,143** |
| compiled scenes（默认 Vienna 1912） | 255 |
| compiled tasks | 151 |
| compiled outcome paths | 1,189 |
| 跨 4 个情境的 distinct compiled scene IDs | 996 |
| distinct compiled kernels | 140 / 150 |
| 35 年 composed events | 293 |
| distinct triggered kernels | 56 |
| triggered contexts / milieus | 6 / 9 |
| 35 年总事件 | 5,027 |
| 35 年 runtime | 5,364 ms（153.2 ms/年） |

**容量口径**：

- `1,265,143` 是 `kernels × contexts × milieus × averageOutcomes × 8 role binding profiles × 3 situation profiles` 的透明上界；不是已验证实例数。
- `255 + 151` 是默认 Vienna 年真实编译、经 context/milieu/role/effect 解析的 Scene/Task。
- `996` 是 1912/1915/1930 战后/1930 改革四个情境的 distinct compiled scene IDs。
- `293` 是 35 年默认世界实际提交的 composed events；56 个不同 Kernel 真正触发。
- 其余 94 个 Kernel 在该单一世界线未触发；不能称全部可达。

## 4. 有效候选与长周期

`phase-11-coverage.json`（35 年，118 living）：

| 指标 | Phase 10 | Phase 11 |
| --- | ---: | ---: |
| base Task / Event 定义 | 140 / 333 | 140 / 333 |
| composed Task / Event | 0 | 151 / 255 |
| all Task / Event 定义 | 140 / 333 | **291 / 588** |
| 实际事件 | 5,910 | 5,288 |
| Task 事件 | 798 | 682 |
| 实际不同 Task | 76 | 114（101 kernel-level） |
| 平均 Task 候选 | 7.13 | 8.04 |
| 平均 Event 候选 | 23.95 | 25.60 |
| 未触发 Task | 64 | 58 |
| composed events | 0 | 324 |

`phase-11-playtest.json`（88 年）：

- 23,802 事件 / 270.48 每年；
- 638 具名人物 / 271 在世 / 262 出生 / 365 死亡；
- 2,965 Task 事件；
- 27 个 scene-prefix 重复 offender（Phase 10 44），最高单人同 prefix 32（Phase 10 81）；
- 0 未解析 token、0 死亡后事件；
- 65,980 ms；密度 0.424/人年。

重复下降不等于文学质量提升；critic 仍判定 11/20 样本失败。

## 5. 性能

### 5.1 真实内容约 160 人

`phase-11-compare.json`（Phase 8 vs Phase 11 composition）：

| 指标 | Phase 8 | Phase 11 |
| --- | ---: | ---: |
| 事件 | 4,677.33 | 5,209.33 |
| Task 事件 | 580.33 | 578.67 |
| 不同 Task | 34 | 76 |
| action prefixes | 169.67 | 397 |
| living Task 候选 | 1.25 | 7.97 |
| living Event 候选 | 11.80 | 23.92 |
| Task 候选为 0 的人 | 72 | 14.33 |
| 历史人物关系 | 107.67 | 126.67 |
| 每年耗时 | 98.13 ms | 147.73 ms |
| 候选审计 | 2.93 ms/人 | 6.21 ms/人 |

### 5.2 合成人口 composition benchmark

| 人口 | composition 每模拟年 | heap |
| ---: | ---: | ---: |
| 1,000 | 535 ms | 79 MB |
| 5,000 | 10,389 ms | 248 MB |
| 20,000 | **252,656 ms** | 447 MB |

20k 是明显瓶颈：599 个 Event definitions + 20k 人物，每人大约三轮 stage 扫描。已加入 place/employment/education/role/cash/health/household 的预筛选索引，但对 20k 仍不足。不能宣称已解决百万级运行时。

### 5.3 编译/缓存

- 默认 Vienna 年 compose 约 **2 ms**，255 scenes + 151 tasks。
- 缓存按 world/year/contexts/process/legacy signature；同一世界年重复调用命中。
- 内容不是每 Tick 重新解析 JSON；Kernel/Context 是模块级静态数据。

## 6. 文学审校

`phase-11-critique.md`：20 个样本，**9 通过 / 11 失败，均分 31.5/40**；按 major 门槛 34/40 不通过。

主要问题：

1. 80 个 Kernel 含性别代词，但 subject role 未限定 sex；civic 30/30 使用“她”，health 21 个使用“他”。这会把男性 cast 进“她”文本、女性 cast 进“他”文本。
2. 货币/工资不稳定：22–36 克朗月薪与 108–260 基线、1.5 克朗/日与 4.5/月、2 vs 8 克朗的同一双鞋、1900 年 Kreuzer、1925 前 25 Schilling。
3. 集体事件（罢工、选举、游行、工会、住房改革）多数只改 flag/role/reputation，没有工资、政策、席位、住房或组织容量变化。
4. 重大声称缺少 typed effect：最后的朋友没有 `death`；流亡只是 move 到车站；难民没有 `household`；退休只是 unemployment 没有养老金；罢工调解恢复了一个从未改变的工资。
5. 条件太薄：24/30 civic 只有 age/stage；出版没有 literacy gate；选举没有选举权 gate；晋升/遣散没有 tenure gate。
6. 重复：15.6% base outcomes 用“第二天”，16.2%“门口”，27.8%“克朗”，14.4% 同一官僚窗口，5.3% 沉默结尾。
7. Context 多数是 B 级：只有 1/98 variants 按 `milieuTags`；1/686 outcome 使用 `{milieu}`；没有 outcome 使用 `{context}`/`{flavor}`。地点/工资变化多于制度因果。

结论：**组合架构与数量扩容完成；文学质量未完成。** 不能把 150 个 Kernel 或 1.26M 上界当作文学成功。

## 7. 测试与浏览器

```text
pnpm typecheck
→ 通过

pnpm exec vitest run tests/v4-*.test.ts
→ 31 files passed / 2 skipped
→ 183 tests passed / 8 skipped
→ 21.33s

pnpm test
→ 80 files passed / 7 skipped
→ 463 tests passed / 36 skipped
→ 159.75s

pnpm build
→ 通过，2.85s

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed (13.3s total; test 9.4s)
```

e2e 覆盖出生、日志、人物切换、semantic person hover、事件档案、进程档案、地图；组合事件使用同一 API/UI 投影。

## 8. 未完成 / 真实限制

- **百万是上界，不是已验证实例**：1,265,143 是 naive combinatorial bound；实际 35 年只触发 293 composed events / 56 kernels。
- 150 个 Kernel 不是数千/百万内容库；76/150 在单世界线未触发。
- Context 只有 10 个、Milieu 12 个；没有国家/城市层级继承、没有 10k 历史人物索引、没有真实多城市世界。
- 大量 Context 变化仍是地点/工资/资格；C 级制度因果只有少数 variants。
- 文学质量未通过 Critic：性别代词、货币、集体效果、条件、重复、B 级 context 都是真实缺陷。
- 20k composition 约 252 秒/年，不能用于生产；需要更强的按 context/milieu/role 候选索引和增量预算。
- 没有正式的养老金/租金持久 effect、逮捕/监禁 effect、跨世界迁徙地点、真实大学组织；这些内容只能降级或跳过。
- Kernel 由 Subagent 创作，未调用 Content Author API；没有可比的真实 API token 成本。不能把 0 调用说成 0 成本。
- 没有公网部署、没有 20k PostgreSQL/API 组合负载。

## 9. 结论

Phase 11 交付了实际运行的组合编译层：

- 150 个 Kernel、10 个 Context、12 个 Milieu、98 个 variants；
- 默认 Vienna 年编译 255 Scene + 151 Task，跨四情境 996 个不同 compiled scene IDs；
- 35 年 5,027 事件，其中 293 个 composed events，56 个 Kernel 实际触发；
- 88 年 23,802 事件 / 2,965 Task / 27 repeat offenders；
- 1.26M naive 上界，但只有 293 实际触发。

这不是“百万故事已经完成”。它证明现有 Engine 可以消费 Context × Kernel 组合，并把同一机制编译成不同 Scene/Task；同时暴露出真正的瓶颈：C 级制度因果不足、文学质量未过线、20k 运行时不可接受、单世界触发覆盖有限。下一步应优先修文学契约与 20k 候选索引，而不是继续增加静态 JSON。
