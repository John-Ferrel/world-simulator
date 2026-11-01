# ADR 021 — Phase 4：单岁人口、具名化、发展组织与运行时内容

日期：2026-11-02  
状态：accepted  
相关：`docs/v4/phase-4-report.md`

## 背景

Phase 3 已有宏观参数、统计风险和 LLM Director，但还存在三个断点：

1. 背景人口只有 5 段年龄，且不能变成具名人物；
2. Director 的组织/社会运动多数只能记录为 `other`/summary；
3. Content Author 只能离线 CLI，运行时不能发布新场景。

此外，旧的死亡/关系扫描在长审计中呈 O(n²)，限制了社会接触与人口规模。

## 决策

### 1. 单岁 × 性别人口队列

- 用 `unnamedByAgeSex[female|male][0..100]` 替代 5 段作为权威队列；
- 旧 5 段数据只作为兼容输入，读取时拆分；
- 年龄逐年推进；
- 出生、死亡、迁移只改变明确 cohort；
- 跨区移动使用 `moveBackgroundCohorts`，source/destination 同步扣加；
- 具名人物不计入未具名队列。

### 2. 背景人口具名化

- 只有 required role 缺失且现有候选为空时才具名化；
- 允许 neighbor/worker/teacher/official/partner；
- 从 subject 所在地区对应 age/sex cohort 扣一人；
- 创建稳定 Person、household、住址；
- 参与事件后建立持久 acquaintance relation；
- 每年最多 4 个新具名人物，避免事件和人口爆炸；
- 没 cohort/place 时场景 blocked，不凭空造人。

### 3. WorldDevelopment 与组织

- `WorldDevelopment` 是宏观状态的一部分；
- proposal 的 development 可带 organization 和 eventFamilyIds；
- 有合法地区/地点时创建真实 Organization；
- 同名组织复用，避免多轮重复；
- 组织 role 在 development 场景中优先匹配该组织，而不是任意军队/教会；
- 新增 `organization_membership` effect；
- 新增 authored `vienna-social-movement.*` 事件。

### 4. 宏观 effect 时间语义

- 参数变化写入 `MacroEffect`，有 start/end；
- 每 tick 过期清理并回退 baseline；
- 当前参数逐项 clamp；
- 不允许未来生效；
- 避免连续 delta 永久饱和。

### 5. 运行时 Content Author

- `v4_content_jobs` 队列 + `v4_content_packs` 发布表；
- worker 真实模型生成，`validateGeneratedPack` 通过后发布；
- simulator 每 tick `loadPublishedV4Scenes()`，无需重启；
- 新内容不修改历史；
- 失败有限重试，不阻塞世界。

### 6. 性能

- 关系查询按 person 建索引，避免每角色扫全关系；
- event identity 使用 historyMeta.sequence，不再 O(n) 扫描；
- 单岁/背景计算保持在地区×年龄，不随具名人口线性膨胀；
- 20k in-memory 单年 19.5s，仍不是生产 DB 压测。

## 替代方案

- 为全部背景人口创建 Person：拒绝；本轮内存/持久化无法承受。
- 每次缺少邻居就新建 Person：拒绝；会绕过人口账本并破坏连续性。
- 把 development 只写成 `stability -0.05`：拒绝；无法形成组织/成员/内容。
- 运行时让模型直接插入场景 JSON：拒绝；必须 schema/验证/发布。
- 持续无限生成内容：拒绝；有限 job/重试/发布。

## 后果

正面：

- 宏观变化可创建组织并产生人物成员/事件；
- 背景人口可具名化并持续互动；
- 单岁队列与迁移守恒；
- 运行时内容可在下一 tick 生效；
- 反事实测试能区分有/无 development 的世界。

限制：

- 具名人物迁出/迁入未闭环；
- 具名化按年龄/性别/地区，不是完整职业/阶层/家庭联合分布；
- 只有 `social_change` 自动触发内容 job；
- 急性疾病/产妇仍年度风险，不是逐月医疗仿真；
- 20k 完整 PostgreSQL/API 压测未做。
