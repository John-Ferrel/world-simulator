# ADR 026：内容规模扩张与有效候选反馈

日期：2026-11-03  
状态：接受  
相关：`packages/v4/content-author/phase9-*`, `packages/v4/content/generated/phase9.ts`, `scripts/v4-phase9-*`

## 背景

Phase 8 已证明内容定义的 Task 可以进入 Agency，但内容规模仍然有限：约 50 个 Task、183 个 event scenes。不同人物的有效 Task 候选只有 2–7 个；长期日志仍重复。

Phase 9 的主要瓶颈不是 Engine 能力，而是：

- 具体生活领域覆盖不足；
- 某些职业/年龄/阶层没有内容；
- 生产流程没有按有效候选反馈；
- 内容定义数量与某个人实际可执行内容之间的差距没有被持续测量。

## 决策

### 1. 不为内容扩张新增 Engine

继续用 `TaskDefinition` / `SceneDefinition`、Agency、Event Runtime、Effect、Project/Interaction、Legacy。内容生产不改变世界物理。

### 2. Phase 8 与 Phase 9 内容分数组保存

- `GENERATED_SCENES` / `GENERATED_TASKS` 保留 Phase 8；
- `PHASE9_EVENT_SCENES` / `PHASE9_TASKS` 是 Phase 9 发布内容；
- `ALL_EVENT_SCENES` / `ALL_TASKS` 用于实际游戏。

这样 before/after 使用相同 Engine 和初始世界，只改变内容池，避免把架构变化混入内容效果。

### 3. 领域矩阵生产

第一轮 20 个 Family × 6 nodes；第二轮按候选审计补 7 个 Family（儿童任务、失业、普通成人、老年日常、老年任务、独居成人、独居老人），最终 27 个 Family / 162 nodes：

- childhood/education（5 包）
- work/occupation（5 包）
- social/family/daily（5 包）
- health/politics/history/cultural contact（5 包）
- coverage gaps（5 包）
- solitude（2 包）

最终 60 Task / 102 Event。每包固定结构（roles/conditions/allowedEffects/3 outcomeHints），模型写具体 outcome/narration。这样生成吞吐提高，同时不让模型决定运行时结构。

### 4. 批量生产与验证

Content Author 按 group 生成，失败重试有上限；发布前：

- schema/role/condition/effect 验证；
- token 解析；
- 角色/年龄/时代合理性；
- 文本与 effect 的因果关系；
- 近似语义去重（字符 bigram + 现有内容种子）；
- 记录 tokens、失败原因、通过数、Task/Event 比例。

### 5. 有效候选池是生产反馈

`auditCandidatePools()` 按人物实际 stage/age/职业/教育/关系/能力统计：

- Event 候选；
- Task 候选；
- domain 分布；
- 低覆盖人物。

不用“放宽条件”制造假覆盖；缺口作为下一批生产目标。

### 6. 内容规模不改变基础风险

Event rate 与 Task utility 分开；新增内容不会让事故/疾病基础概率乘以定义数。task 选择只扫描当前 stage 的 task 池，不扫描全部内容。

同时修正两个候选层问题：

- `chooseContentTask` 只在可 cast、可选 outcome 的 Task 中加权选择，避免“高分数但不可执行”的 Family 占掉年度行动；
- 组织领袖的会议/招募/出版/过程行动优先于个人 Task，避免大 Task 池静默取代自下而上历史。

### 7. 生成事件作用于所有具名人物

`compileGeneratedPack` 的 `subjectProvenance` 从 `['birth','initial']` 扩展到 `['birth','initial','materialized_population','historical_activation']`。

原因：候选审计显示 79/164 名在世人物事件池为 0，其中多数是 materialized 成人；他们已经有真实 household、职业和关系，却只能选 Task，不能经历被动事件。继续限制会让“内容池扩大”只对玩家出生人物生效。该修改不改变基础疾病/事故率，只让已存在人物进入同一内容候选。

### 8. 独居事件与 stage 缺口

部分成人/老人没有可 cast 的邻居或工人，导致事件池为 0。新增 subject-only 事件族（独居成人与独居老人），不凭空生成关系；事件只改变 subject/household 的状态。

### 9. 长期人生比较

固定 seed + 多 seed：

- Phase 8 content vs Phase 9 content；
- 比较有效候选、实际任务/事件数、职业/阶层差异、重复、历史接触、统计与性能；
- 不要求事件 ID 一一对应；比较覆盖与质量。

## 替代方案

- 继续每轮只生成 4 个 Family：无法解决覆盖，放弃。
- 重新设计 Task DSL：Phase 8 已够用，放弃。
- 用模板复制修改姓名/地点凑数量：语义重复，不发布。
- 让模型直接写 Engine 分支：不可验证，放弃。
- 仅用 cooldown 掩盖重复：不增加生活，放弃。

## 后果

- 内容生产是主要成本；真实模型调用可能失败，需要重试和记录。
- 新增大量内容增加候选搜索，但按 stage/条件预筛选；20k PostgreSQL/API 仍待测。
- 内容仍受 stage bucket 限制；单 stage 的年龄窗口不会跨 stage。
- 语义去重是近似工具，仍需人工抽查。
- 长期事实不会被展示层删除；LifePassage 只做投影。
