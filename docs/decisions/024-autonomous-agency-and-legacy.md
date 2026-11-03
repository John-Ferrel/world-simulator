# ADR 024：确定性自主行动、历史遗产与 Director 行动队列

日期：2026-11-03  
状态：接受  
相关：`packages/v4/agency.ts`, `packages/v4/history.ts`, `packages/v4/macro.ts`, `packages/v4/engine.ts`, `packages/v4/macro-director.ts`, `packages/v4/content-author/phase7-briefs.ts`

## 背景

Phase 6 已经有真实历史人物、可参与进程和事件化参与，但人物主要通过场景被动响应；组织没有持续自主行为；Director 基本只改 support/opposition；进程到达 `development.end` 会直接结束；阶段变化主要产生 outcome 字符串，没有持久制度后果；canonical 事件仍可能晚于死亡。

同时，如果为“主动性”新建 Agent Framework，会产生第二套目标、行动、权限、历史和持久化，与现有 Person/Organization/Project/Interaction 冲突。如果让 Director 直接写“某组织已经招募成功/某改革已经通过”，则绕过 Engine 资源和事实。

## 决策

### 1. 自主行动是 Engine 内的确定性年度循环

- `agency.ts` 只读取世界状态并返回有界 `AgencyPlan`；Engine 用现有 `commitEvent` 提交类型化 effects。
- 每个 actor 每年最多一次 initiative；actor 列表优先包含 owner、historical person、组织职位持有人、历史进程参与者，然后确定性轮转采样普通成年人。
- 儿童（<14）不执行成人组织/工作/招募行动；他们的生活仍由家庭、学校、健康和后续成年行动构成。
- 失败是允许的结果：只留下 mood/reputation/关系/未完成项目等真实后果，而不是保证成功。
- 活人 world 的 `advanceV4Year` 显式启用 `agency: true`；测试 fixture 默认关闭，避免改变旧场景断言。

### 2. 组织行动复用同一人物循环

- 有职位时由职位持有人代表；职位持有人失能/死亡时，由最健康、社会能力最高的成员代表。
- 招募、会议、会费、出版、互助、成立持续运动等仍使用 membership/treasury/project/relation/knowledge 等现有原语。
- 不新增“组织 AI”系统。

### 3. 底部历史由真实条件触发

- `planBottomUpProcess()` 只对仍在活动、有至少 2 名活成员、近 5 年有真实 agency 行动、且尚未有进程的组织生效。
- 满足条件后仍用确定性概率；不保证每个组织都成为历史进程。
- 新进程通过 `historical_process` effect 创建，实际成员和行动成为参与者；Director 之后可以在快照中看到它。

### 4. 生命周期不用固定年份结束

- `development.end` 是 expected review date，不是结束命令。
- 进程阶段由 support/opposition/resources/legitimacy/escalation/information、活参与者、活组织成员、最近一次真实参与/影响行动和 overdue 时长共同计算。
- 允许 `suspended` 阶段；连续无活动且无活载体才进入 `ended`。
- 反对者真实存在且冲突强时，可按确定性概率分裂成子进程；子进程有独立参与者、资源、阶段和 legacy。

### 5. Legacy 是独立于阶段字符串的持久世界条件

- `MacroState.legacy` 只保存有界记录：kind、来源进程、地区、开始时间、标签、结构性参数变化、事件族权重、来源事件。
- Legacy 在制度化/压制/结束/分裂时创建；同一个进程同一 kind 只创建一次。
- 结构性参数变化写入地区 baseline，只应用一次；事件权重通过 `eventPoolMultiplier` 影响未来抽样。
- 内容通过 `legacy` 条件读取；这允许后来出生的人不知道历史人物，却真实受到工时、病假、战后住房、公共卫生制度影响。
- 不用永久 `support +0.1` 代替 legacy。

### 6. Director 只提交有界行动提案

- `MacroProposal.actions` 最多 6 条；schema 限制 kind、actor/org/process/target IDs、title/description 和 intensity。
- MacroStore 只验证并写入 `MacroState.pendingActions`。
- Engine 在下一 tick 执行：组织项目、招募成员、创建 Interaction、出版知识、救济、压制、改革 legacy、从组织生成新进程。
- 每条行动生成 `macro_action:<action-id>` 事件；执行失败/跳过有 reason。重复 tick 通过 action id + event marker 幂等。
- LLM 仍不能直接写死亡、胜负、阶段、关系或已提交事实。

### 7. canonical 时序

- 死亡日期取该人物截至当时已提交事件的最晚日期；携带 death effect 的事件日期锚定到死亡日期。
- 死亡后不再参与场景/agency/Director action。
- 年度顺序：宏观效果过期 → 经济/统计月 → 到期 interaction/project → 事件/场景/agency → Director pending actions → 历史阶段/legacy → 死亡再检查。
- 这不是全库重写；旧事件保留，新的 canonical 事件按统一日期提交。

## 替代方案

- 新 Agent Framework：重复状态、权限和持久化，放弃。
- 每人每年 LLM 决策：成本/延迟/不可复现，放弃。
- 固定年份结束进程：会把仍有成员和冲突的运动错误终止，放弃。
- 只把 legacy 写成 chronicle：不影响后续内容/风险/权重，放弃。
- Director 直接执行行动：绕过 Engine 资源和事实，放弃。
- 把所有 optional role 文本直接提交：会产生 `{neighbor}` 之类未解析 token；现在候选 outcome 会过滤缺失角色引用。

## 后果

- 普通人会有更多自主事件，但也可能重复（例如长期照护）；后续需要继续增加内容多样性，而不是只增加数量。
- 组织没有正式职位时由非正式领袖代表，可能产生不完全符合真实组织章程的行为；当前以成员/资源/关系约束，不声称完整组织政治。
- Legacy 参数变化是结构性的，当前不做自动回滚/政策废除；这是明确的简化。
- 进程分裂是低频确定性规则，不是完整派系政治模拟。
- Director action 仍可能指向错误目标；执行器会跳过并留下 reason，不会伪造成功。
- 新世界/旧世界都保留；不 reset、不覆盖归档历史。
