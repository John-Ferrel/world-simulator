# Phase 20 — Living Consequences 设计

日期：2026-11-07  
基线：Phase 19 `578bac0` — 107 states / 2,060 kernels / 29 packs；主 A/B/C focal collision share 0.14%。  
Evidence：`phase-19-report.md`、`phase-19-critique.md`、`phase-19-playtests.json`、`content-catalog.json`、`creative-index.json`、`phase-19-cooccurrence.json`、`story-shapes.json`。  
新增机制：`AdaptiveContext`（可选情境）与 `adaptiveContextTotals`。

## 1. 目标

Phase 19 证明了“严格双 State”可以写出真正的碰撞，但也暴露了转化问题：

- 154 个新 Pack 事件中只有 10 个消费新 State；
- 主 A/B/C 的 4,190 个 focal 事件中只有 6 个新 Pack 事件；
- `fw19-separated-household`、`eh19-inherited-cause` 几乎不存在；
- 重要转折（Lena 的分居、Alois 的证词）被后续事件重置；
- 大多数自然事件仍来自旧库。

Phase 20 的核心不是再加 100 个硬条件 Kernel，而是：

> **一个主要处境提供事件机会；其他 State / Relation / Attribute / History / World Context 影响概率、角色、检定和结果。**

同一个“求职”“家庭晚餐”“房东来访”“报纸采访”，对不同人物应该有不同的机会与后果。

## 2. AdaptiveContext（最小扩展）

在 `SceneDefinition` / `PlotKernel` 上增加可选字段：

```ts
type AdaptiveContext = {
  id: string;
  conditions: SceneCondition[];
  weightMultiplier?: number; // 0.25..4
  checkBonus?: number;       // -10..10
  tags?: string[];
};
```

语义：

- **不 gate 场景**。`conditions` 只决定这个可选情境是否激活；主 eligibility 仍由 `SceneDefinition.conditions` 决定。
- 激活后：
  - `weightMultiplier` 乘到普通/生命周期/state lane 的选择权重；
  - `checkBonus` 加到 d20 检定（正数更容易）；
  - `SceneOutcome.conditions` 仍然决定具体 outcome 是否可选。
- 多个 adaptive context 可以同时匹配；权重相乘、checkBonus 相加，最后整体 clamp 到 `0.25..4` / `-10..10`。
- 只使用现有 `SceneCondition`、`SceneOutcome.conditions`、`SceneCheckSpec`、`RoleRequirement` 和 typed effects；没有第二套执行器。
- 可选 context 不写入 `EventFact` 作为新事实；它是选择/检定期的 modifier。需要持久影响的，仍用 State / Relation / Flag / Knowledge / Position。

实现位置：

- `packages/v4/composition/adaptive.ts`：纯函数、边界 clamp；
- `packages/v4/domain.ts`：`AdaptiveContext` + `SceneDefinition.adaptiveContexts`；
- `packages/v4/composition/types.ts`：`PlotKernel.adaptiveContexts` / variant；
- `packages/v4/composition/composer.ts`：复制到编译后的 Scene；
- `packages/v4/engine.ts`：普通/生命周期/state lane 权重、`selectOutcome` 的 checkBonus；
- `packages/v4/content-factory/validate.ts`：条件、ID、权重/checkBonus 边界。

## 3. 现有能力的复用

- **Conditional Outcomes**：`SceneOutcome.conditions` 已经支持 `hasState`、`hasRelation`、`attribute`、`history`、`hasFlag`、`knowledge`、`position` 等；不需要新 schema。
- **Check modifiers**：`SceneCheckSpec` 已有 `stateBonus` / `historyBonus`；AdaptiveContext 增加跨情境的 `checkBonus`，避免为每个 State 写一份 check。
- **Role binding**：现有 `RoleRequirement` 的 `sharedHistoryTag`、`sameHousehold`、`relationKind`、`minAge` 等继续使用。
- **State modifiers**：现有 `StateModifier` 仍可做 scene_weight/check_bonus；AdaptiveContext 是更通用的可选 context 层。
- **Outcome effects**：全部 typed effects；不新增任意代码/SQL/HTTP。

## 4. 内容生产

### 4.1 `pack-adaptive-everyday` (`ad20-`)

24 个 Kernel，2 个新 State：

- `ad20-public-attention`（person）：普通生活被公众注意；参数 `attention`、`sympathy`、`danger`、`opportunity`。创建于 `fame` / `public-scandal` / `known-affair` 等 context；下游用于采访、邻居、家庭、工作。
- `ad20-private-bargain`（person）：一个私下的帮助/交易/人情持续存在；参数 `leverage`、`trust`、`debt`、`exit`。创建于债务/犯罪/官职/人情 context；下游用于背叛、偿还、退出、再次求助。

主题：

- 求职/面试、房东来访、学校会议、市场日、婚礼、葬礼、医院、火车、邻里纠纷、贷款、公开演讲、家庭晚餐、商店开张、警察盘问。
- Primary eligibility 只用 1–2 个常见 State（`fame`、`public-scandal`、`raising-child`、`chronic-illness`、`factory-employment`、`office-patronage`、`debt-bondage`、`journeyman`、`grief` 等）。
- 每个 Kernel 至少 2 个 AdaptiveContext；至少 8 个 Kernel 使用 State/Relation/Attribute/History context，而不是只有 cash。
- 至少 6 个 Kernel 有 `check` 且 adaptive `checkBonus` 改变结果；至少 6 个 Kernel 有 conditional outcome。
- 允许普通、温暖、荒诞、黑暗、反讽。

### 4.2 `pack-living-consequences` (`pc20-`)

24 个 Kernel，2 个新 State：

- `pc20-second-chance`（person）：失败/失势/分居后获得第二次机会；参数 `credibility`、`debt`、`hope`、`suspicion`。创建于 `failed-apprentice`、`fw19-separated-household`、`public-scandal` 等；下游用于复合、复职、再次失败。
- `pc20-public-reversal`（person）：公开的翻案/平反/再次指控；参数 `proof`、`pressure`、`support`、`danger`。创建于 `eh19-late-testimony`、`political-suspect`、`under-investigation`、`fame` 等；下游用于道歉、报复、纪念碑、家庭分裂。

主题：

- 分居/复合/离婚/再次同居；
- 失业/复职/转行/师承回归；
- 证词反悔/翻案/再次指控；
- 旧敌成盟友/旧友成敌人；
- 诅咒/幸运/愿望的字面/部分/反讽兑现；
- 家族秘密/遗产/下一代。

要求：

- 至少 8 个 Kernel 消费一个已有“转折” State（`fw19-separated-household`、`failed-apprentice`、`public-scandal`、`political-suspect`、`eh19-late-testimony`、`cursed-by-wish`、`df18-borrowed-luck`、`wish-*` 等）。
- 至少 8 个 Kernel 的 adaptive contexts 包含 `history` / `relationHistory` / `hasRelation` / `attribute` / `hasFlag`。
- 至少 6 个 Kernel 有 conditional outcome，明确“修复/恶化/留白”三种方向。
- 结果必须能持久：state_add/transition/remove、relation/relation_end、position、organization、knowledge、flag、cash、health 等，不只 mood。

### 4.3 Retrofit 旧 Kernel

选择 6–8 个已有 Kernel 添加 AdaptiveContext，不重写整包：

- `pack-odd-jobs`：`oj18-cinema.reel`、`oj18-zoo.night`、`oj18-mortuary.first-body`；
- `pack-elder-memory`：`em18-late-bloom.radio-hour`、`em18-family-archive.grandchild-photo`；
- `pack-money-luck`：`ml18-lottery.same-numbers`；
- `pack-small-mysteries`：`sm18-object.false-accusation`；
- `pack-love-desire`：`ld18-wedding.objection`。

每个旧 Kernel 加 2–4 个 adaptive contexts（例如 `fame`、`public-scandal`、`chronic-illness`、`grief`、`debt-bondage`、`office-patronage`、`under-investigation`、`history`），权重 1.3–2.0，checkBonus -3..+4；不改原有 outcome 文本，除非增加 conditional outcome。

## 5. 机制与内容边界

- 不新增任意代码/SQL/HTTP；AdaptiveContext 只引用现有 `SceneCondition`。
- 不新建平行 Director；所有选择仍在现有 ordinary/lifecycle/state lane。
- 主 eligibility 太窄的内容仍然难出现；Authors 必须提供至少一个 common-state 或 bridge entry。
- AdaptiveContext 不是永久事实；持久后果必须写入 State/Relation/Flag/Knowledge/Position。
- 一个事件可以在不同人物身上有不同 outcome；不要为每个人物写专属剧情链。
- 允许留白、误解、谎言和没有后续；不是每个选择都必须有结局。

## 6. 实验 A–E

- **A — One Event, Different Lives**：同一求职/房东事件，给不同财富、职业、关系、人格、State 的人物；观察权重/角色/outcome 差异。
- **B — Ordinary Life Meets Extraordinary State**：诅咒/幸运/愿望放进日常爱情、工作、家庭；观察特殊 outcome。
- **C — Reconciliation and Reversal**：分居/背叛/失业/失势后，允许复合/复职/翻案/反悔；观察持续影响。
- **D — Social and Historical Consequences**：职位/组织/关系影响他人机会；用历史背景制造后果。
- **E — Natural Emergence**：多 Seed 自然人生，寻找没有预写完整剧情的组合命运。

受控实验只证明机制；自然人生判断体验。

## 7. 验收

- AdaptiveContext schema + validator + engine 权重/check 生效；
- 2 个新 Pack 共 ≥44 Kernel，≥4 新 State，每个 State creation + consumer；
- 至少 8 个旧 Kernel 被 retrofit；
- 至少 8 个 Kernel 在不同 context 下有实际不同 outcome；
- 自然 A/B/C 中至少 20 个 adaptive-context 事件，至少 6 个 focal；
- 分居/失业/证词等转折有 ≥3 个自然后续（复合/复职/翻案/恶化）；
- repeatRate 不高于 Phase 19 的 0.2104；
- 独立 Critic 能指出 ≥6 个自然涌现故事；
- 不声称 runtime LLM、生产 DB、公网部署已完成。
