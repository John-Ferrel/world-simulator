# ADR 015：出生时生成概率化人生轨迹，再由引擎消耗

状态：accepted（实现中）  
日期：2026-10-31  
相关：ADR 007（开放意图）、计划 `docs/plan.md`、实现审计（生命周期）。

## 背景

当前出生 LLM 只写 `traits/goals/ability` 和一份从未被引擎读取的 `hiddenFutures`。之后人物一生主要由 `advanceLife` 的年龄分支、14 种短期动作和硬编码事件文案决定。因此：

- 出生时的历史背景、家庭、阶层、性别、健康和时代压力，不能形成一条可执行的人生结构；
- 儿童只是“不工作的成人”，没有童工、失学、收养、失散、早夭风险；
- 成年后的分支只是短期 agenda，无法表达“求学/进厂/逃荒/入伍/堕落/迁徙”等长期路径；
- 叙事层只能在少数模板事件里挑三句，无法产生具体人生。

直接让 LLM 写更长的日志会伪造状态，不解决问题。需要的是：**概率化的人生分支图 + 引擎真实状态/事件 + 叙事投影**。

## 决策

采用“方案 A：`LifeProgram.trajectory` + `advanceLifePrograms` 消费”。

### 1. 轨迹的定位

轨迹是**带条件的候选分支图**，不是保证发生的剧本，也不是第二套世界状态。

- 出生时根据当前 `World`、地点、家庭、阶层、时代、健康、性别和已发生的世界压力生成；
- 使用稳定 seed（`world.seed + birth.id + child.id`）和 `packages/simulation-core/random.ts`；
- 每个 beat 有年龄窗口、触发条件、权重、分支后果和来源标签；
- 到年龄窗口时，只有条件满足的分支才可被选择；
- 世界状态（战争、饥荒、死亡、迁徙、监禁、家庭变化）可以阻断、延迟或提前结束轨迹；
- 选择结果必须落成**真实事件**和**真实状态变化**，不能只写文本；
- 死亡、财富、关系、迁徙、法律状态必须走既有的死亡/继承/旅行/关系机制，不能由轨迹直接改写。

### 2. 持久化

存放在：

```ts
runtime.lifePrograms[personId].trajectory
```

不放到 `Person`，避免公开 API 泄漏隐藏未来。轨迹随 world JSONB/journal/outbox 单事务持久化，不需要新表。

限制：每轨迹最多 12 个 beats，每 beat 最多 4 个 branches，每个字符串最多 200 字符；防止 journal 膨胀。

### 3. 引擎消费

在现有 `advanceLifePrograms`（`packages/rules/birth.ts`）中调用新的纯应用函数。顺序：

1. 死者/已中断：标记 `interrupted`，不再处理；
2. 旅途中/被拘留：暂停；
3. 找到下一个年龄窗口已到且未解决的 beat；
4. 条件不满足：等待或标记 `blocked` 并发出可追溯的重规划事件；
5. 条件满足：按权重和 seeded roll 选择 branch；
6. 发 `life_program_beat` 事件（`causeIds` 指向当前真实事件或 beat 来源）；
7. 通过 adapter 修改真实状态：健康、压力、教育、职业、迁移计划、关系、家庭资源；
8. 记录 `resolved`（beatId、branchId、month、eventId、roll）。

第一切片只接：

- `education` vs `early_work`（先改教育/职业目标，不支付童工工资）；
- `stay` vs `migrate`（创建真实 travel plan，由现有旅行系统执行）；
- 父母死亡/战争/稀缺导致分支 blocked；
- 一个可由 `advanceAgency` 接受/拒绝的 opportunity。

性工作、犯罪、收养、虐待、成瘾、债务、难产、家庭失散暂不写文本；必须先有真实状态字段和机制，再接入。

### 4. 模型输出

`BirthProposalSchema.trajectory` 必须是可选字段：

- 模型只能提出候选 beats/branches/conditions，不得输出已发生事实、死亡名单或未来结局；
- 解析失败或超时：使用确定性 generator；
- worker 只写 `jobs.result`，不写 world；
- `hiddenFutures` 保留为私有 forecast，不参与执行。

### 5. 叙事

叙事不把 projected life 当历史。年度章节只引用已提交事件和已 resolved beats；未来分支只可在 owner 的私有预览中显示，公开视角不可见。

### 6. 世界线层

世界线偏移评估独立于个人轨迹，周期性读取已提交世界状态；它只能提出有界、有证据的 `pressure/opportunity/event definition` 建议，经 compiler/审核后进入世界。个人轨迹不能修改世界线，世界线也不能强制个人结局。

## 不变量

- 单一 canonical writer；worker/API 不直接写 world。
- 死亡不可逆；轨迹的 `deathRisk` 只改健康/暴露，不直接 `die`。
- 货币/人口守恒；轨迹财富只能来自已有家庭/地点资源。
- owner 不提供物理保护。
- causeIds 必须是已提交事件 ID。
- 旧快照和旧测试兼容；轨迹字段可选。
- 确定性：同 seed/同初始状态结果一致。

## 替代方案

1. **把轨迹编译成 RuleDefinition**：受 512 definition 上限和 person scope 不可动态加入限制，不适合每个孩子一条；只适合共享时代事件。
2. **把轨迹挂到 Person**：公开 API 会泄漏隐藏未来；不可接受。
3. **直接使用 `hiddenFutures` 字符串**：conditions 是自然语言，不能执行，会把 LLM 预测当事实。
4. **只改 prompt/叙事模板**：没有真实状态和分支，仍是假内容。

## 后续扩展

按真实状态逐步加入：住房/驱逐/露宿、童工工资、家庭失散/收养、成瘾/债务、难产/婴儿死亡、性工作与犯罪（成年、非露骨、带法律/健康/污名后果）、地方历史事件包。每一项必须先有状态、触发、后果和测试，再写叙事。
