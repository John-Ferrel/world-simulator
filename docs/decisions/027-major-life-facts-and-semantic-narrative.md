# ADR 027：重大人生事实与语义叙事引用

日期：2026-11-03  
状态：接受  
相关：`packages/v4/content/major-*.ts`, `apps/v4-api/index.ts`, `packages/v4/store.ts`, `apps/web/src/main.tsx`

## 背景

Phase 9 已把内容池扩到 110 Task / 285 Event，但长期人生仍偏日常：就业、教育、婚姻、迁移、组织参与和死亡等决定性问题缺少足够内容，或者叙事宣称的变化没有对应 effect。观察器也只显示纯文本，不能稳定地用人物/事件/进程 ID 跳转。

## 决策

### 1. 重大事件必须有 typed consequence

所有 Phase 10 重大事件 outcome 至少包含一个真实 effect：

- `education` / `employment` / `unemployment`
- `relation` / `relation_end` / `household` / `birth` / `death` / `estate`
- `health` / `condition`
- `move` / `residence`
- `role` / `organization_membership`
- `cash` / `flag` / `knowledge`

`mood` / `reputation` 可以补充，但不能单独承担“获得工作/结婚/被拘捕/残疾/迁移”等重大变化。Narration 只描述 effect 已经提交的事实。

### 2. 不新增执行器

重大事件仍使用 `SceneDefinition` / `TaskDefinition`、同一 cast/outcome/effect 管线。必要的“重大性”通过 `significance`、conditions、roles 和 effects 表达。

### 3. 生成内容与手工骨架并用

手工 authored pack 提供机制正确、可验证的决定性事件；生成 pack 提供规模和文学变体。生成失败不发布；手工内容也必须通过同一 validator 与 runtime 测试。

### 4. 语义引用由 API 产生

Event 文本由 `projectEvent` 基于实际 `participants`、lookups 和 processes 产生 segments：

- person refs 使用真实 Person ID；
- historical role 来自 `historicalIdentity`；
- process refs 来自 `historical_participation` / `historical_influence` / `historical_process` effects；
- 不对任意文本做姓名猜测。

### 5. UI 不做世界推断

Hover/点击只读取 API 提供的实体引用和现有 world/detail 数据；不根据文本内容推断亲缘、职业或历史身份。点击人物切换当前观察对象；点击事件/进程打开档案视图。

## 替代方案

- 用 `mood`/`reputation` 代替就业、婚姻、死亡：不可验证，放弃。
- 让模型直接写 Engine 分支：不可验证，放弃。
- 用正则从自由文本中识别人名：会误伤、无法稳定 ID，放弃。
- 为重大事件新增独立执行器：重复且破坏统一事实，放弃。

## 后果

- 重大内容生产成本更高，但可用真实 effect 和后续事件消费。
- UI API 响应略增（segments/processRefs），但只对事件投影生成一次。
- 某些缺少原语的重大事件（如正式逮捕/监禁）必须降级为可执行事实或明确列为缺口，不能叙事造假。
- 内容规模仍受 stage bucket、角色可达性与实际世界状态限制；不能把定义数当作发生数。
