# Phase 21 — Dramatic Content

日期：2026-11-08  
Pack：`pack-dramatic-lives`（`p21-`）  
设计：`docs/v4/phase-21-game-design.md`  
Catalog：`docs/v4/content-catalog.md`  
Creative Index：`docs/v4/creative-index.md`

## 1. 规模

| 项 | 数量 |
|---|---:|
| Kernels | 16 |
| States | 2（`p21-scandal-web`、`p21-fortune-reversal`） |
| Outcomes | 64（每 Kernel 4 个） |
| Adaptive contexts | 71 |
| Check kernels | 16 |
| Conditional-outcome kernels | 16 |
| State creation effects | 54 |
| State consumers | 25 |
| Compiled scenes | 224 |
| 高相似度（≥0.20） | 0 |
| 最高相似度 | 0.162（与未注册的并行草稿；正式库无 ≥0.20） |

`p21-scandal-web`（person）：秘密/谣言网络；参数 `exposure / loyalty / leverage / danger`。  
`p21-fortune-reversal`（person）：公开的财富/地位逆转；参数 `height / fragility / witnesses / debt`。  
两者都有 creation path、外部 consumer、12 个月 tick 与 2 个 reaction。

## 2. 16 个 Kernel

| Kernel | 核心冲突 | 强场景 |
|---|---|---|
| `p21-blackmail-wedding` | 私情变成强迫婚姻；勒索信、私密婚约、公开预告、证人反悔 | 登记结婚 / 公开预告 / 反勒索 / 证人翻供 |
| `p21-secret-heir` | 活着的继承人带着洗礼簿来到家族产业 | 认下 / 分产 / 判为伪造 / 留在门房 |
| `p21-duel-at-dawn` | 采石场清晨决斗、警察调查、债务 | 打偏 / 受伤 / 死亡 / 被调查 |
| `p21-staged-death` | 假死逃债、空棺、欺诈案 | 空棺 / 真尸 / 封案 / 逃亡 |
| `p21-suspicious-death` | 可疑死亡、遗产、毒物 | 指控 / 掩盖 / 反控 |
| `p21-returned-enemy` | 旧敌带借据回来 | 结盟 / 复仇 / 债务清算 |
| `p21-false-confession` | 假认罪、保护某人、监狱 | 认罪 / 翻供 / 嫁祸 |
| `p21-public-humiliation` | 公开羞辱、人群、权力 | 逆转 / 崩溃 / 荒诞成名 |
| `p21-absurd-inheritance` | 荒诞遗嘱、强制条件、假亲戚 | 接受 / 烧掉 / 拒绝 / 冒充 |
| `p21-mistaken-identity` | 被误认成别人、政治任命、替身 | 顺势 / 澄清 / 被利用 |
| `p21-love-power-bargain` | 爱情×权力交易、组织、婚姻 | 交易 / 私奔 / 背叛 |
| `p21-family-secret` | 家族秘密、兄弟姐妹、遗产 | 揭开 / 掩埋 / 分裂 |
| `p21-ruin-reversal` | 破产/失势后的逆转 | 翻身 / 再次坠落 / 假翻身 |
| `p21-revenge-ledger` | 复仇账本、旧债、名单 | 执行 / 放弃 / 反噬 |
| `p21-scandal-auction` | 密封信件拍卖、丑闻网络 | 买下 / 空手套 / 当众朗读 / 反勒索 |
| `p21-elder-testimony` | 老年证词、历史翻案、死亡 | 作证 / 翻供 / 沉默 / 死后平反 |

## 3. 机制使用

- **16/16 有 check**，并且每个 Kernel 的 adaptive `checkBonus` 可以改变 DC/结果。
- **16/16 有 conditional outcome**：不同秘密、关系、财富、组织、历史会开出不同结局。
- **71 个 adaptive contexts**：每个 Kernel 4–6 个；使用 `hasState` / `hasRelation` / `relationHistory` / `attribute` / `history`，不是只加 cash。
- **持久后果**：`state_add` / `state_parameter` / `state_transition` / `relation` / `relation_end` / `knowledge` / `flag` / `cash` / `health` / `death` / `position` / `organization_found` / `employment` / `unemployment`。
- **两个新 State 不是硬门槛**：主 eligibility 仍以 age / 一个常见 State 为主；`p21-scandal-web` 和 `p21-fortune-reversal` 主要作为 optional context 与 conditional outcome 的支点。
- **与 Phase 20 的关系**：Phase 20 提供日常敏感入口；Phase 21 提供高戏剧入口；两者共享 AdaptiveContext / Check / Conditional Outcome / 持久化。

## 4. 强场景

1. **`p21-blackmail-wedding`**：一封旧情书、一场只有两桌人的婚礼、一个坐在最后一排的勒索者。公开预告分支会把私事变成街头事件；证人翻供分支会让婚姻变成一场公开审判。
2. **`p21-secret-heir`**：洗礼簿、家族产业、活着的 claimant。认下她 / 分一份产业 / 判为伪造 / 让她留在门房，四种结局都能留下 `p21-fortune-reversal` 或关系后果。
3. **`p21-scandal-auction`**：密封信件被拍卖。买下、发现是空手套、当众朗读、反勒索拍卖人；公开朗读会把 `p21-scandal-web` transition 成 `public-scandal`，是“秘密网络塌成公开丑闻”的直接机制。
4. **`p21-duel-at-dawn`**：采石场、第二声枪响、警察调查。打偏/受伤/死亡都会留下不同的关系、健康、调查或死亡事实。
5. **`p21-elder-testimony`**：老年证词可以翻案、可以再次毁掉一个人，也可以在死后才被相信；这是“过去没有过去”的最直接内容。

## 5. 与 Phase 20 的差异

Phase 20 的强项是“普通事件对不同处境敏感”；Phase 21 的强项是“事件本身有真正的动机冲突和反转”。Phase 21 不再只写“遇到问题 → 检定 → 成功/失败”，而是：

```text
A 有秘密
B 有相反利益
C 误解了局面
        ↓
对峙 / 仪式 / 公开场合
        ↓
意外揭露
        ↓
多个结局
        ↓
新的关系 / State / 后续事件
```

## 6. 自然发生率

A/B/C 45 年（chronology 修复后）：**61,718 events / 5,123 focal**；drama **203 世界事件（0.33%）/ 22 focal（0.43%）**；两个新 State 都出现；16 个 Kernel 中 **10 个**自然出现；`p21-secret-heir`、`p21-staged-death`、`p21-false-confession`、`p21-public-humiliation`、`p21-love-power-bargain`、`p21-revenge-ledger` 为 0。

命中最多：`p21-elder-testimony` 63、`p21-mistaken-identity` 50、`p21-returned-enemy` 28、`p21-absurd-inheritance` 28、`p21-scandal-auction` 14。

重复问题：`p21-elder-testimony` 在 C 中多次出现同一文本；这是下一轮要修的 outcome/条件分支问题，不是“内容不存在”。

## 7. 限制

- 16 个 Kernel 仍不是完整戏剧库；需要更多日常×戏剧桥接。
- 两个新 State 的长期 tick/reaction 仍偏少；后续应增加 3–5 年后的后果。
- 角色门槛：`p21-returned-enemy` 需要 past betrayal shared history，`p21-false-confession` / `p21-elder-testimony` 需要成年子女，`p21-love-power-bargain` 需要活跃 state organization；这些会降低自然出现率。
- `p21-staged-death` 的 unemployment effect 在无工作时可能被丢弃；事件仍通过 state_remove debt-bondage 提交。
- 死亡效果（duel / elder testimony）是刻意的，可能提前结束人物。
- 没有逐年历史国界/战争位置；戏剧背景仍主要靠文本。
- 内容含暴力、死亡、勒索、私情；pack metadata 有 content warnings，但没有分级 UI。
