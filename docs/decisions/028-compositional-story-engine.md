# ADR 028：Context × Milieu × Plot Kernel 组合编译

日期：2026-11-03  
状态：接受  
相关：`packages/v4/composition/*`, `packages/v4/content/kernels/*`, `packages/v4/engine.ts`

## 背景

Phase 10 证明可以批量增加静态 Scene/Task，但新增 78 个定义并没有改变内容生产方式。每个事件仍把地点、职业、年代、角色和结果写死在一个 Family 里；同一个“求职/考试/婚姻”机制无法因城市、战争、行业或社会关系产生真正不同的因果路径。

## 决策

### 1. 增加编译层，不增加执行器

Kernel 不是新的运行时。`Composer` 只把 `ContextProfile`、`MilieuProfile` 和 `PlotKernel` 编译成现有 `SceneDefinition` / `TaskDefinition`，继续由 `castSceneRoles`、`selectOutcome`、typed effects 和 EventFact 提交。

### 2. Context 与 Milieu 分离

- Context 回答“这是哪个年代/地区/制度/危机”；
- Milieu 回答“人物实际在家庭、学校、工厂、医院、工会还是咖啡馆”。

同一个 Kernel 可以进入多个 Context/Milieu，但必须由 tags、conditions、roles 和 variants 真正改变可达性/角色/成本/结果，而不是只换名字。

### 3. Context variant 是第一等公民

Kernel `variants` 可替换 outcomes、roles、conditions 和 rate；例如战争上下文把“求职试工”改成“战时替工与配给券”。只改文本的 variant 不算 C 级因果变化。

### 4. 组合结果必须可回放

Composed scene ID 固定为：

```text
kernelId::contextId::milieuId[::variantId]
```

EventFact `action` 保留该 ID；因此可以从一条已提交事实反查 Kernel、Context、Milieu 与 outcome。组合不依赖运行时随机重建来“猜”过去发生了什么。

### 5. 缓存与预筛选

Composer 按 `world.id + year + active contexts + process/legacy signature` 缓存编译结果。Kernel 先按 context/milieu tags 预筛选，再由现有 Engine 做角色 cast/outcome 选择；不扫描所有人物的所有组合。

### 6. 容量统计分开

报告必须区分：

- naive theoretical upper bound；
- context/milieu-screened compiled Scene/Task；
- 编译 outcome paths；
- 实际 simulated trigger；
- distinct causal kernels。

理论组合数不能当成已实现事件数。

## 替代方案

- 继续生产静态 Family：无法随城市/年代/制度变化，放弃。
- 每个 Context 复制整套 JSON：不可维护，放弃。
- 在运行时让 LLM 即兴生成事件：不可验证、不可重放，放弃。
- 新增 Composed Event Executor：重复执行器，放弃。

## 后果

- Kernel 更抽象，但必须附带 roles/conditions/effects 和至少部分 context variants，创作门槛更高。
- Composer 增加编译耗时和内存；需要缓存、benchmark 和实际候选审计。
- 组合空间可能膨胀出大量语义重复；需要 Kernel 级去重、context-specific variant 和实际触发统计。
- 现有 Engine 的 `worldYear`/`placeKind`/role cast/effect 仍是权威边界；组合不能绕过它们。
