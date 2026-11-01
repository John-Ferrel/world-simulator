# ADR 019 — v4 Phase 2：有界内容、出生契约与读取投影

日期：2026-11-01  
状态：accepted  
相关：`docs/v4/phase-2-plan.md`、`docs/v4/phase-2-report.md`

## 背景

Phase 1 已经证明年度多事件运行时、类型化效果和 LLM 内容工厂可以工作，但有四个缺口：

1. 内容量仍集中在少数事件族，成年恋爱、住房、疾病、教区、市场债务、女性家务和老年失亲覆盖不足。
2. 出生愿望只是“有界读法”，能力/代价/条件没有进入真实事件资格或结算。
3. API 每次读取整个世界的 persons payload；5k 人物时页面传输和序列化不可接受。
4. 作者家庭场景只对 `provenance.kind === 'birth'` 生效；初始维也纳人口老龄后没有替代，且老年死亡是一次性场景，存活者可能长期不死。

## 决策

### 1. 内容工厂保持离线、验证后落盘

- 生成包先经 `packages/v4/generated.ts` 的 schema、角色、token、效果引用和重复文本验证。
- 只有通过验证的包才编译为 `SceneDefinition`；运行时不再调用模型生成事件或叙事。
- Phase 2 新增 8 个族、32 个节点、96 个 outcome、193 条 narration。当前 22 族 / 88 场景 / 239 outcome / 423 narration。
- `v4-content-author` CLI 支持覆盖报告、单族生成和 `--generate-missing`；生成结果必须重新验证后才能写文件。

**替代方案**：运行时按缺口自动生成并立即发布。拒绝，因为无法在共享时钟内可靠审计，且模型失败会污染世界。

### 2. Birth Contract 2.0 只产生有界契约

- `BirthContract` 包含 interpretation、privateGoal、focus、traitDeltas、skillDeltas、白名单 capability、taboo、conditions、limits、costs。
- 服务端在写库前再次 `validateBirthContract()`，不信任 worker 输出。
- `compiledAt` 是“增量已应用”的唯一标志；出生时写入的占位 interpretation 不算已编译。
- engine 实际消费：
  - `focus` 与匹配标签提高事件权重；
  - `conditions` 按匹配标签提高权重；
  - capability 映射到教育/工作/社交/健康等标签；
  - `limits` 限制契约带来的总权重优势；
  - `costs` 在匹配事件上每年最多结算一次真实健康/情绪/照护代价。
- 模型输出 `[{trait,delta}]` 这类数组会被规范化为对象；未知键丢弃，禁止字段仍拒绝。

**替代方案**：把 capability 写成任意效果列表或脚本。拒绝，因为模型文本不能成为可执行权限。

### 3. 观察 API 使用投影，模拟器仍全量读写

- 新增 `latestV4WorldMeta`、`v4PersonSummaries`（keyset 分页，默认 200/最大 500）、`v4PersonSummaryById`、`v4PersonDetail`、`v4EventDetail`、`v4WorldIndex`、`v4PersonSearch`。
- `/api/v4/world` 返回计数、地点/组织摘要、分页人物和最近公共事件，不再返回全部人物 payload。
- `/api/v4/persons/:id` 只读目标人物、家庭、关系、本人事件和最近公共事件。
- 模拟器仍用 `loadV4World`/`saveV4World` 保证单写者和整世界事务；读取优化不改写路径。
- events-only 可见性修正为“当前用户拥有任一参与者”，不再把 subject 与自身比较。

**替代方案**：把模拟器也改成增量写入。推迟到存储层单独设计，避免本阶段同时改变世界物理和持久化契约。

### 4. 生命周期事件优先，但不绕过规则

- 家庭包的所有场景带 `lifecycle` 标签。
- 每人每年在 milestone 之后、普通加权池之前，获得一次专门的生命周期尝试；仍经过年龄、角色、条件、rate、cooldown 和 outcome 验证。
- 家庭场景对 `birth` 和 `initial` 都开放，避免初始人口只死亡不繁殖。
- 老年死亡从“一次性、且要求健康 ≤0.45”改为 72–118 岁每年可重复的风险；避免 100 岁以上人物因一次存活而永久不死。
- `$eventId` 等嵌入引用现在按 token 展开；此前 `courtship:$eventId` 保持字面量，所有求偶互动塌缩到同一个 id，后续提议被覆盖。

**替代方案**：让 engine 每年硬编码出生/死亡概率。拒绝，因为会把内容叙事和世界机制拆开；当前方案仍由内容定义结果和文本。

## 后果

正面：

- 内容审计 80 年出现 3,657 事件、279 条 focal 事件、358 条因果事件、75 次出生；22/22 生成族实际触发；零事件年份 0。
- 出生能力会改变事件权重并产生真实年度代价，不只停留在 JSON。
- 1k/5k 人物基准下世界首页与单人详情不再传输全部人物；分页无重叠，坏 cursor 返回 400。
- 初始人口可以形成新家庭，老年死亡不再是一次性豁免。

代价与限制：

- 事件量上升（45.7/年，102 人），日志仍需要按人物裁剪；审计的 `scene_blocked` 2,304 次，主因是寻找 partner/worker 等角色失败。
- `limits` 目前只限制契约带来的事件权重优势，不截断所有下游效果类型。
- 契约文本过滤是启发式；权威边界仍是结构化 schema、白名单标签和数值上限。
- 内容工厂不会自动排期；当前仍需手动/运维调用 CLI。
- 人口模型仍是场景驱动，不是完整人口学；婴儿死亡、产妇死亡和迁移只有内容覆盖到的部分。
