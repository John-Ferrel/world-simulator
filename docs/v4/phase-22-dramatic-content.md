# Phase 22 — Dramatic Content Overhaul

日期：2026-11-09  
Pack：`pack-dramatic-overhaul`（`p22-`）+ `pack-early-life-drama`（`p22-`）  
设计：`docs/v4/phase-22-creative-direction.md`  
Catalog：`docs/v4/content-catalog.md`  
Creative Index：`docs/v4/creative-index.md`

## 1. 规模

| Pack | Kernels | States | Adaptive contexts | Checks | Conditional outcomes | Compiled scenes |
|---|---:|---:|---:|---:|---:|---:|
| `pack-dramatic-overhaul` | 20 | 2 | 100 | 20 | 20 | 280 |
| `pack-early-life-drama` | 16 | 2 | 49 | 8 | 16 | 224 |

两个新 State 组：

- `p22-scandal-engine`（person）：`heat / reach / leverage / shame`；谣言/秘密机器。
- `p22-wild-fortune`（person）：`height / absurdity / witnesses / fragility`；荒诞/真实的命运逆转。
- `p22-family-legend`（person）：`warmth / secrecy / danger / promise`；家族故事。
- `p22-child-omen`（person）：`strangeness / attention / protection / fear`；围绕孩子的异象。

每个 State 都有 creation + external consumer，tick >=12 个月，1–2 个 reaction。

## 2. Dramatic Overhaul（20 kernels）

方向刻意混合，不再只写黑暗：

**Comic / absurd（5）**
- `p22-goat-heir`：山羊继承了整栋楼。
- `p22-forged-review`：伪造的剧评让一个人成名，也让真正的作者找上门。
- `p22-bureaucratic-miracle`：一个公务员把表格填错，意外制造了职位、遗产或婚姻。
- `p22-banker-novel`：银行家坚信自己是一本小说里的人物。
- `p22-lost-circus`：失踪的马戏团演员带着一头会认字的驴回来。

**Romantic / scandalous（5）**
- `p22-enemy-wedding`：仇人家的婚礼，债务、私情和公开朗读同时发生。
- `p22-apology-proposal`：公开道歉被误读成求婚。
- `p22-love-letter-serial`：一封信被连载、误读、转手，最后变成政治丑闻。
- `p22-fake-engagement`：假订婚变成真继承权。
- `p22-two-weddings`：同一天两场婚礼，只有一位新娘知道全部名单。

**Dark / reversal（5）**
- `p22-mistaken-inheritance`：继承文件被调换。
- `p22-dead-voice-child`：孩子说起死人的口头禅。
- `p22-apology-confession`：道歉变成认罪。
- `p22-inherited-debt`：继承的不是钱，是债。
- `p22-cursed-lottery`：中奖的彩票带着诅咒。

**Warm / ironic（5）**
- `p22-child-matchmaker`：孩子把两个不该在一起的人凑成一对。
- `p22-debt-bakery`：面包店用债务换配方，最后救了一家人。
- `p22-opera-benefit`：一场为死人办的义演，让活人重新说话。
- `p22-bureaucratic-reunion`：档案错误让失散的人重逢。
- `p22-blacklist-soup`：被列入黑名单的人靠一锅汤重新进入公共生活。

每个 Kernel 4 outcomes；weight 2.7–3.0、baseRate 0.22–0.26、cooldown 4–5 年；高权重使它们能在普通人生中出现。全部 20 个 Kernel 带 `high_drama` tag，Engine 额外 ×1.9 权重。

## 3. Early-Life Drama（16 kernels）

年龄 0–7，全部 `subjectProvenance: ['birth']`；Composer 已修复 kernel-level provenance 复制，因此只对玩家出生角色生效。

**Warm（4）**：`p22-warm-fathers-letter`、`p22-warm-anonymous-gifts`、`p22-warm-naming-feast`、`p22-warm-night-move`。  
**Comic（4）**：`p22-comic-christening`、`p22-comic-mistaken-child`、`p22-comic-job-or-child`、`p22-comic-name-register`。  
**Strange/dark（4）**：`p22-strange-midwife-face`、`p22-strange-grandmother-voice`、`p22-strange-cradle-secret`、`p22-strange-doctor-prediction`。  
**Dramatic（4）**：`p22-drama-inheritance-papers`、`p22-drama-sibling-runs-away`、`p22-drama-fire`、`p22-drama-factory-accident`。

- 8 个 infancy（0–2）+ 8 个 childhood（3–7）。
- baseRate 0.32–0.50、weight 1.5–1.8、cooldown 5–8 年。
- 16/16 有 conditional outcome；8 个有 check；49 个 adaptive contexts。
- 孩子始终是 subject，但行动者是父母、产婆、邻居、医生、公证人、工头；婴儿不写成小型成人。
- 只有 1 个死亡 outcome（`p22-drama-fire`，weight 0.1，health ≤0.55），明确标注 content warning。
- 两个 State 被后续 Kernel 消费：family legend 影响命名/继承/兄弟姐妹；child omen 影响误认/祖母声音/医生预言/火灾生存。

## 4. 旧内容 Retrofit

本阶段给 4 个高频 base scene 加了 adaptive contexts：

- `vienna-family-courtship`：fame / public-scandal / grief / debt-bondage。
- `vienna-life-school-enrolment`：fame / blacklisted / grief。
- `vienna-life-injury-recovery`：chronic-illness / debt-bondage / fame。
- `vienna-life-child-labour`：debt-bondage / raising-child / fame。

另外新增 3 个通用早期 base scenes：

- `vienna-life-birth-letter-from-the-dead`：死人的信、旧债、邻居截信。
- `vienna-life-toddler-wrong-cradle`：陌生被子、抱错孩子的传闻。
- `vienna-life-child-inherited-wish`：孩子重复死去外婆的愿望。

这些是“旧内容敏感化”的起点，不是全库改造；2,160 个 Kernel 中的绝大多数仍需要后续 retrofit。

## 5. Drama Density 机制

- `narrativeTierMultiplier`：`extraordinary` ×2.2、`high_drama` ×1.9、`drama` ×1.4；只影响带 tag 的内容，不改变 base scene 语义。
- Phase 21 drama pack 也标记为 `high_drama`；Phase 22 两个新 Pack 分别标记 `high_drama` / `drama`。
- 这是“内容分布”机制，不是新的 Director；仍走普通/生命周期/state lane。
- 目标：让戏剧内容更常出现，同时不把每条日常都改成灾难。

## 6. 与 Phase 21 的差异

- Phase 21：16 kernels，0.43% focal，主要是黑暗/背叛/死亡。
- Phase 22：36 个新 drama kernels（20 overhaul + 16 early-life）+ 3 个早期 base scenes + 4 个 retrofit；有喜剧、荒诞、温暖、反讽；weight 更高；早期人生有独立内容。
- 仍不声称“戏剧已经成为主纹理”；自然数据决定结论。

## 7. 限制

- 两个新 Pack 的 4 个 State 仍只有少量 tick/reaction；长期后果不如文本丰富。
- `p22-scandal-engine` 的 non-creator consumer 只有 `p22-blacklist-soup`；需要更多下游。
- 角色门槛（partner/child/sibling/occupation）会降低自然出现率。
- 没有逐年历史国界/战争位置；历史质感靠文本。
- 旧库 retrofit 只有 4 个 base scene + 3 个早期 scene；不是全库。
- State 参数仍未可视化；玩家看不到 heat/reach/leverage/shame。
- 内容含暴力、死亡、勒索、私情；有 content warnings，但没有分级 UI。
