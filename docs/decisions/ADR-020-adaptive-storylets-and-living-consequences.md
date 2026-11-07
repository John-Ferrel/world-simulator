# ADR-020 — Adaptive Storylets and Living Consequences

日期：2026-11-07  
状态：Accepted  
Phase：20  
相关：`docs/v4/phase-20-design.md`、`docs/v4/phase-20-content.md`、`docs/v4/phase-20-report.md`、ADR-019

## 1. 背景

Phase 19 用严格双 State 条件写出了真正的跨 Pack 碰撞，但自然转化很低：主 A/B/C 的 5,887 个 focal 事件中，新 Pack 只有 6 个（0.14%）。原因是：

- 双 State 同时存在是稀有事件；
- 很多内容只有 bridge entry，没有后续；
- 普通事件不知道人物过去的职业、关系、名声、疾病、诅咒和选择；
- 为每个 State 写一套专属事件会把 2,000+ Kernel 的库变成互不相通的剧情链。

Phase 20 需要一种轻量、可复用、不会把 eligibility 收窄的表达方式。

## 2. 决策

引入 `AdaptiveContext`：

```ts
type AdaptiveContext = {
  id: string;
  conditions: SceneCondition[];
  weightMultiplier?: number; // 0.25..4
  checkBonus?: number;       // -10..10
  tags?: string[];
};
```

规则：

1. **不 gate 场景。** `SceneDefinition.conditions` / `PlotKernel.conditions` 仍然决定主 eligibility；adaptive context 只决定“这个可选情境是否激活”。
2. **只改变选择与检定。** 匹配后权重相乘、`checkBonus` 加到 d20（实现为降低 DC）；多个 context 同时匹配时权重相乘、bonus 相加，整体 clamp。
3. **条件结果复用现有 `SceneOutcome.conditions`。** 不新增第二套 outcome 系统；不同情境下走不同 authored outcome。
4. **持久后果仍写 State / Relation / Flag / Knowledge / Position / Organization。** AdaptiveContext 本身不是永久事实，不写入 EventFact。
5. **不新增执行器。** 普通、生命周期、state lane 都走现有 Engine；Composer 只把 context 复制到编译后的 Scene；Validator 检查 ID、非空 conditions、边界。
6. **内容优先。** 新增 2 个 Pack，并对 8 个旧 Kernel 做 retrofit；不为每个 State 写专属剧情链。
7. **严格双 State 仍然保留。** 真正依赖两个前提的事件继续使用硬条件；AdaptiveContext 不是替代品，而是补充。

## 3. 备选方案

| 方案 | 为什么不选 |
|---|---|
| 继续增加严格双 State Kernel | 能写出碰撞，但自然出现率极低；Phase 19 已证明转化问题 |
| 新建平行 Director / 第二套事件解析器 | 会绕开既有 State/Event/Outcome 权威，产生两套因果与持久化语义 |
| 让 LLM 即兴改写普通事件 | 无法验证、无法 replay、无法保证持久后果；且模型失败会阻塞时钟 |
| 为每个 State 写 `check` 专属 modifier | 内容量爆炸，普通事件仍然不敏感；AdaptiveContext 提供跨场景的通用层 |
| 把 adaptive 条件放进主 `conditions` | 会重新变成硬 gate，回到 Phase 19 的低转化问题 |
| 用 `StateModifier` 代替 | 现有 modifier 已能做部分 scene_weight/check_bonus，但不能按 Kernel 的多个可选情境组合、不能和 conditional outcome 一起表达；AdaptiveContext 是更窄、更可审计的补充 |

## 4. 后果

正面：

- 同一事件可以在 fame / scandal / curse / separation / political-suspect 等不同处境下产生不同 DC 和 outcome；
- 普通 age-only 事件也能被特殊 State 影响，不需要双 State 门槛；
- 受控实验 A–D 4/4 通过；
- 新 Pack focal share 从 0.14% 提升到 1.60%，adaptive-capable Kernel 事件 2.07%；
- 所有 context 都是数据，可被 Catalog / Creative Index / Story Editor / Validator 检索和检查。

负面 / 未解决：

- 自然 focal share 仍低于 12%；
- repeatRate 从 0.2104 升到 0.2274，新 State tick/reaction 增加了状态事件量；
- 8 个旧 Kernel 多数没有 `check`，`checkBonus` 结构有效但休眠；
- 自然 audit 只按 Kernel 是否带 context 计数，不证明每次匹配了哪个 context；
- 高频 base scene 尚未系统接入 AdaptiveContext；
- 家庭/伴侣 slot machine、horizon、生产 runtime 不在本 ADR 范围内。

## 5. 复审触发条件

出现以下情况时重新评估本 ADR：

- 12% focal share 目标连续两个 Phase 未改善；
- AdaptiveContext 被用于绕过主 eligibility 或写入任意代码/SQL/HTTP；
- 新 State tick 继续推高 repeatRate；
- base scene 接入后 context 数量失控，Catalog/Editor 无法审计；
- 需要跨世界/跨存档的 context 版本迁移。
