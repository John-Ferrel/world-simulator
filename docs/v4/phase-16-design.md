# Phase 16 — Living Stories（活起来的人生）

日期：2026-11-06  
基线：Phase 15 State 机制层、Content Factory、历史参考库  
证据：`phase-16-report.md`、`phase-15-phase16-final-a.md/json`、`phase-15-phase16-live-e.md/json`、`phase-16-critique.md`

## 1. 本阶段的问题

Phase 15 已经能保存并执行 State / tick / reaction / transition / Position，但审计显示机制层没有稳定进入完整人生：

- 48 个 State 定义中只有 17–20 个在长跑中出现；
- 16k–19k 事件只有约 20 次 State Reaction、13–21 次 Transition；
- 诅咒、职位、子女、教育等状态可以被创建，但很少被后续内容消费；
- 状态内容在与数千个普通场景竞争时被稀释；
- 内容工厂的真实模型调用返回 403，PostgreSQL 没有真实执行；
- 20k 人口下 State 带来明显性能回退。

本阶段不重写 Engine，也不增加一个全知导演。改动集中在：**可及性（availability）、选择（selection）、执行（execution）、后果（consequence）和复用（reuse）**。

## 2. 诊断：五种不同的失败

一个机制没有出现在游戏中，可能不是同一个问题：

| 失败层 | 现象 | Phase 16 处理 |
|---|---|---|
| Availability | 定义存在，但没有任何 committed event 创建它 | `autoAttachOnBirth`、内容种子 kernel、历史种子 |
| Selection | State 已存在，但几千个普通场景把它挤出候选 | 专用 state/position opportunity lane，最低 rate 0.35，权重 ×1.5 |
| Execution | 选中后角色缺失、outcome 不合法或效果失败 | lane 在选择前预检 cast；每次最多尝试 5 个失败候选；成功后一年只结算一次 |
| Consequence | 事件写了故事，但没有 typed effect 改变人物/组织/世界 | 职位/组织/资金/关系/健康/调查等真实 effect；tick/reaction 绑定具体实例 |
| Reuse | 改变后没有后续内容读取 | 新 State、真实 Position、子女 link、历史 State 进入后续 kernel 与 reaction |

诊断数字来自 `stateOpportunity`（candidates/selected/resolved/missingRole/noOutcome/blocked）和 `activationDiagnostics`（state lifecycle、pack kernel hits、office、children、curse、world）。

## 3. 关键设计

### 3.1 State / Position opportunity lane

`runEventYear` 在生命周期事件之后、普通场景之前增加一个**有界的**机会通道：

1. 只考虑 `hasState` 或 `position` 条件的场景；
2. 先做结构/条件/rate 过滤；
3. **先 cast**，角色不齐的候选只计入 availability 失败，不进入加权抽取；
4. 加权抽取最多尝试 5 个候选；
5. 一旦成功结算一个 State/Position 场景，本人物本年停止该通道。

这不是第二个调度器：普通事件仍走原有 while 循环；lane 只是给“已经付出代价获得的处境”一个不被数千普通场景淹没的机会。成功上限仍是每人年一次。

### 3.2 State 也创造机会，而不只是限制

- `hasState` 条件可以驱动新机会（学校、职位、诅咒、调查、占领）。
- 新增 `$positionOrg` / `$positionId` / `$positionTitle` 通用 effect ref；一个真实 Position 可以被后续 hire/budget/favor/removal 场景使用。
- 多职位时选择**最近获得且仍有效**的 Position，避免所有场景都落在第一个职位上。
- `sceneUseKey = familyId ?? id`：同一 kernel 的不同 context/milieu 变体在一个 person-year 内只能结算一次，减少模板重复。

### 3.3 子女成为真实人物，而不是出生行

- `StateDefinition.autoAttachOnBirth`：`raising-child` 在真实 birth 后自动挂到 household，并保存 `links.child`。
- 新增通用 `child` role kind：从 `Person.parentIds` / `byParent` 索引选真实子女，不再把子女只当文本 token。
- 家庭 pack 的 school registration / child leaves / child returns 使用 `child` role；`school-registration` 改为消费已有的 `raising-child`，不再重复 `state_add`。
- State tick/reaction 会把 `links` 中的真实人物加入 text roles 和 participants；tick 的 `state_parameter` 自动绑定到当前 `StateInstance`，多个孩子的 progress 不再互相覆盖。
- 档案中的 State snapshot 现在显示 household/organization 状态、link 姓名和 ticks。

### 3.4 诅咒：从可触发到可执行后果

- 保留 `cursed-by-wish` 作为唯一判定机制；不新增诅咒引擎。
- 新 pack 提供 wish/ritual → real betrayal → reaction → notice/aftermath 的可达链。
- 成功分支在 betrayer 身上提交 health + condition；失败分支也提交 triggers，避免“反应发生了但状态没有变化”。
- 如果 betrayer  casts 成 subject 自己，reaction 不执行：自我背叛不能触发对他人的诅咒。
- reaction/tick 的 state effects 绑定到触发实例，避免多实例状态被写到同一个 state。

### 3.5 历史参与：从宏观日志到可生活的状态

- `pack-history-fork` 新增 3 个种子 kernel，用 `oncePerPerson` + era window 在合适年代创建 place/organization 状态（占领、清洗、罢工委员会）。
- `occupied-city-regime` / `institution-purge` / `strike-committee` 的后续 kernel 读取这些状态，产生征用、工作许可、忠诚问卷、职位空缺、罢工大会与结算。
- Place/region-owned State 现在可以选择当地活人作为 anchor，因而会 tick/expire；1945 liberation 事件可以移除占领状态。
- 这不是完整社会仿真：它是“历史背景产生一组可执行状态，状态再产生机会”的最小闭环。

### 3.6 性能

- State context / org 查询缓存按 revision 失效，state owner 与 organization 索引分开。
- `v4EventRate` 缓存每人每年的 state modifiers，避免每次候选重算；去掉 per-call `Set` 和 capability map 分配。
- agency 的 relation index 从 `world.events.length` 改为 `relationRevision`，不再每个事件重建全部关系桶。
- `personOrganizations` 只缓存组织成员/职位，employment 在读取时补入，避免不必要的失效。
- 不通过关闭 reaction、减少状态或隐藏内容来优化指标。

## 4. 被否决的方案

| 方案 | 否决原因 |
|---|---|
| 新的全知戏剧导演 | 会与现有 Engine 竞争；玩家应观察人物，不是看导演安排剧情 |
| 为每个愿望写专用 TypeScript 分支 | 不可组合，违背内容驱动；Phase 16 用通用 state/position/child 条件 |
| 把所有身份/关系/组织重写为 State | 会复制 Person/Relation/Organization 权威数据，破坏单一事实源 |
| 只增加几百个 State/Event | 不解决 Selection/Execution；Phase 16 先修 lane、cast、instance binding |
| 完整世界经济/政治/社会仿真 | 超出产品范围，且不会自动让故事更有趣 |
| 让 LLM 直接提交世界事实 | 继续遵守：LLM 只产生经过验证的 definitions/proposals，runtime 是唯一 writer |

## 5. 验收设计

- **普通人生**：8 focals × 50 年，无 forced outcome；阅读完整 subject events。
- **奇异愿望**：power/curse/love/knowledge/craft 等自然出生愿望，不保证每个愿望都有传奇结果。
- **世界影响**：Position → hire/budget/favor/removal → 真人 Position、organization membership、funds、relations；检查 downstream follow-up。
- **历史惯性**：9 个五年 review windows 的真实事件匹配/未匹配；占领/解放的时间一致性；fork signals。
- **内容开放性**：LLM 子代理创作并注册的 office/curse/history 内容在真实 runtime 中触发；区分 subagent 生产与 Content Factory API worker。
- **数据库**：embedded PostgreSQL 18.6，实际 migration / seed / save / reload / e2e。
- **性能**：20k synthetic，baseline / 1% / 5% state density，先 profile 再优化。

所有“受控实验”与“自然完整人生”在报告中分开标注；不把 forced outcome 当作自然证据。
