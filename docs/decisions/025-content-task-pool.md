# ADR 025：内容驱动的主动 Task Pool

日期：2026-11-03  
状态：接受  
相关：`packages/v4/domain.ts`, `tasks.ts`, `engine.ts`, `generated.ts`, `content-author/phase8-briefs.ts`, `content/generated/tasks.ts`

## 背景

Phase 7 的 Agency 已能让人物自主找工作、开会、照护、支持/反对历史进程，但主动行为种类写死在 `agency.ts` 的 `AgencyActionKind`、`candidatesFor()` 和对应 switch 中。Content Author 只能扩人物遇到的事件，不能直接增加人物主动尝试的任务。结果：

- 有效生活候选仍少；
- 同一个职业/处境反复出现相同行动；
- 每次新增主动行为都要改 Engine；
- 内容工厂的规模优势只作用于 Event，不作用于 Agency。

## 决策

### 1. Task 复用 SceneDefinition 执行语法

`TaskDefinition = SceneDefinition & { task: TaskMeta }`。Task 使用同一套：

- 角色和年龄窗口；
- conditions；
- outcomes / narration；
- EffectBinding、commitEvent、followup；
- scene history / cooldown。

Task 与 Event 的区别只在入口：

- Event：`runEventYear` 按年发生率和权重抽样；
- Task：`runAgencyYear` 按人物状态、目标、效用和可行性选择。

不新增 Task DSL、Project 或 Effect 类型。

### 2. 内容工厂固定结构，模型只写事实和叙事

`GeneratedPack.kind = 'task'` 加 `GeneratedTaskMeta`。Brief 固定 id、stage、age、roles、conditions、allowedEffects、task 元数据；模型写 outcome 与 narration。`compileGeneratedTasks()` 把合法 JSON 编译为 TaskDefinition。

`task` 元数据是：

```ts
{
  domain: TaskDomain;
  goals: PersonAgencyGoal[];
  needs: TaskNeed[];
  baseUtility: number;
  risk?: number;
  skills?: Skill[];
  capability?: string;
}
```

这些是偏好/动机提示，不是成功保证。实际成功仍由 outcome 和类型化 Effect 结算。

### 3. 轻量、可解释的效用选择

`taskUtility()` 读取人物目标、现金/食物/健康、家庭照护、组织成员、性格、技能、风险、特殊能力和最近同 domain 行动。它只排名可行任务；可行性仍由 `sceneEligible`、角色 cast 和 outcome 条件决定。

任务选择与硬编码基线行动比较分数，按 seeded 随机决定，避免内容任务永远压过基础机制，也避免基础机制永远压过内容。

### 4. 索引和规模

Engine 把 tasks 按 `stage` 建 `Map<SceneStage, TaskDefinition[]>`；每个 actor 只扫描该 stage。角色 cast 只对选中的 task 执行。20k 合成基准记录任务开销，但当前不提前建百万级倒排索引；后续可按年龄/职业/组织/历史进程扩展。

### 5. 内容验证和 token 规范化

在核心验证之外，内容编译器做有限的、可审计的规范化：

- `{foreman}`/`{office}` 等自然别名映射到已声明角色，不改变事实；
- cash/food 强制 householdId = `$household`（内容 schema 本来就如此）；
- `vocational` → `apprenticeship`，`university` → `higher`；
- 0 数值 effect 丢弃；
- outcome narration key 固定为 outcome id；
- 未知 token 仍拒绝。

不为了通过率放宽角色、条件、效果或来源验证。

### 6. 重复与叙事

- Task 编译默认 `cooldownYears=2`，减少一个高效用任务垄断同一人物。
- 同一 domain 的近期行动有 0.55 倍重复惩罚。
- `LifePassage` 只把已提交 EventFact 按同年/同行动族组织成可读片段；不删除事实，不生成新事实。
- 真实长期照护/工作/组织行动可以持续发生；阅读层可合并，但不改变世界状态。

## 替代方案

- 继续在 `agency.ts` 加 switch：内容规模扩大后不可维护，放弃。
- 把 Task 强制做成 Event rate：无法表达主动意图、目标与可行性，放弃。
- 让模型直接输出可执行代码/Effect：无法验证，放弃。
- 只增加叙事变体：候选仍少，重复不会改善，放弃。
- 只加 cooldown/oncePerPerson：会让真实持续行动消失，放弃。

## 后果

- 新增主动行为只需发布合法 Task JSON；只有新的 Effect/条件原语才需要改 Engine。
- Task 选择是确定性和可复现的，但不是通用规划器；长期目标仍由 `Person.agency` 简化表达。
- 内容生成有 token/重试成本；失败内容不会发布。
- 任务与事件的候选池必须分开审计；定义数量不等于某个人的有效候选数。
- 20k 任务选择在合成基准中有额外成本；真实 PostgreSQL/API 规模仍待测。
