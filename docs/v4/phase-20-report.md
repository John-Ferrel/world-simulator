# Phase 20 — Living Consequences 实施报告

日期：2026-11-07  
基线：Phase 19 `578bac0` — 107 states / 2,060 kernels / 29 packs；主 A/B/C focal collision share 0.14%。  
设计：`docs/v4/phase-20-design.md`  
ADR：`docs/decisions/ADR-020-adaptive-storylets-and-living-consequences.md`  
内容：`docs/v4/phase-20-content.md`  
Adaptive audit：`docs/v4/phase-20-adaptive-audit.json` / `.md`  
Playtests：`docs/v4/phase-20-playtests.json`  
独立批评：`docs/v4/phase-20-critique.md`

## 1. 结论摘要

Phase 20 把内容库从 **107 states / 2,060 kernels / 29 packs** 扩展到 **111 states / 2,108 kernels / 31 packs**，新增：

- **2 个 Adaptive Pack**：`pack-adaptive-everyday`、`pack-living-consequences`；
- **48 个新 Kernel**、**4 个新 State**；
- **8 个旧 Kernel 的 AdaptiveContext retrofit**（25 个 context）；
- **56 个 adaptive Kernel / 230 个 adaptive context**；
- 4 个受控实验 A–D（全部通过）+ 自然 E；
- 5 个自然 dossier（3×45 年 + elder + mixed）。

主 A/B/C：

- **65,137 events / 5,593 focal events**
- 新 Pack **1,227 事件（1.88% 世界）**
- 新 Pack **97 个 focal 事件（1.73%）**
- 来自带 `adaptiveContexts` 的 Kernel 的 **125 个 focal 事件（2.23%）**
- **4/4 新 State** 自然出现
- repeatRate **0.2290**

Phase 19 的 focal share 是 0.14%；Phase 20 提升到 1.7%–2.2%，是数量级改善，但仍低于 12% 目标。RepeatRate 从 0.2104 升到 0.2290，是真实回归，不能隐藏；adaptive Kernel 本身重复不高，重复主要来自状态 tick（含新 State 的 tick）。

Phase 20 的核心成果不是“又多了 48 个 Kernel”，而是：**普通事件开始对人物处境敏感，转折开始有后续。**

## 2. 从 Phase 19 到 Phase 20

Phase 19 的独立 Critic 给出 Life **17/30**、Scene **21/30**，并指出：

- 154 个新 Pack 事件中只有 10 个消费新 State；80 个是 bridge；
- 主 A/B/C 的 4,190 个 focal 事件中只有 6 个新 Pack 事件；
- `fw19-separated-household` 0 adds、`eh19-inherited-cause` 0 adds（mixed 1）；
- Lena 的分居被后六年出生/同居推翻；Alois 的证词修正被后续问卷重置；
- family-war 最频繁的是 `borrowed-goat`，不是中心 collision；
- odd-jobs tick 已改善，但 252 adds 仍在。

Phase 20 因此不再以“更多硬双 State”为主，而是引入 **AdaptiveContext**：一个主 eligibility 提供事件机会，其他 State/Relation/Attribute/History 作为可选情境改变概率、检定和结果。

## 3. AdaptiveContext 机制

```ts
type AdaptiveContext = {
  id: string;
  conditions: SceneCondition[];
  weightMultiplier?: number; // 0.25..4
  checkBonus?: number;       // -10..10
  tags?: string[];
};
```

- 可选，不 gate 场景；
- 普通/生命周期/state lane 的权重相乘；
- `selectOutcome` 把 checkBonus 转成更低的 DC；
- `SceneOutcome.conditions` 继续承担 conditional outcome；
- 多 context 同时匹配时权重相乘、checkBonus 相加，整体 clamp；
- 没有第二套执行器，没有任意代码/SQL/HTTP。

新增文件/修改：

- `packages/v4/composition/adaptive.ts`
- `packages/v4/domain.ts`
- `packages/v4/composition/types.ts`
- `packages/v4/composition/composer.ts`
- `packages/v4/engine.ts`
- `packages/v4/content-factory/validate.ts`

## 4. 内容

### 4.1 两个 Adaptive Pack

| Pack | Kernels | States | Adaptive contexts | Check kernels | Conditional-outcome kernels |
|---|---:|---:|---:|---:|---:|
| `pack-adaptive-everyday` | 24 | 2 | 108 | 8 | 16 |
| `pack-living-consequences` | 24 | 2 | 97 | 9 | 24 |

新 State：`ad20-public-attention`、`ad20-private-bargain`、`pc20-second-chance`、`pc20-public-reversal`。每个 State 有 creation path 与外部 consumer。

### 4.2 Retrofit

8 个旧 Kernel 加 25 个 adaptive contexts：`oj18-cinema.reel`、`oj18-zoo.night`、`oj18-mortuary.first-body`、`em18-late-bloom.radio-hour`、`em18-family-archive.grandchild-photo`、`ml18-lottery.same-numbers`、`sm18-object.false-accusation`、`ld18-wedding.objection`。这 8 个 Kernel 多数没有 `check`，所以 checkBonus 休眠；weightMultiplier 已生效。

完整表与强场景见 `docs/v4/phase-20-content.md`。

## 5. 人生连续性

Phase 20 的转折不是“新剧情链”，而是已有 State 的后续：

- `fw19-separated-household` → `pc20-separation.return-key` / `last-box` → `pc20-second-chance`；
- `failed-apprentice` → `pc20-apprentice.second-workshop` / `master-return` → 重新开张/共用工作台；
- `public-scandal` / `political-suspect` / `eh19-late-testimony` → `pc20-public-reversal` → 道歉/翻案/再次指控/纪念碑；
- `known-affair` → `pc20-affair.return` / `child-question`；
- `cursed-by-wish` / `df18-borrowed-luck` / `wish-*` → `pc20-wish.*`；
- `em18-family-archive` → `pc20-family.secret-papers`。

自然例子：

- Josef 1930 `ad20-apprenticeship-review/kept-on`：榫头被对着光看，最后“明天开始，你自己接活”；1941 同一 Kernel 的 `tools-returned` 又把工具摆上桌，说“不是手艺不好，是店里养不起”。同一套职业状态在 11 年后产生相反结果。
- Josef 1942 `pc20-apprentice.second-workshop/sweep-up`：工作台擦干净、刨花扫进麻袋、钥匙还给 Maria Moser；木牌背面还留着没刻完的名字。失败学徒有后续，不是一次性标签。
- Mitzi 1933 `ad20-census-form/the-clerk-reads-aloud`：登记表念到“同住人”，她说没有；门外脚步慢了一拍。普通表格承载了私生活的压力。
- Mitzi 1947 `ad20-job-interview/name-stays-on-the-list`：雇主问是不是报纸上被提过的人；她说同名同姓；背面那行字是让下一个雇主去问谁。
- Lena 1933 `ad20-favor-called-in/do-the-favor`：她替人送箱子，因为当年对方垫过一笔医药费；人情账在多年后回来。
- Klara 1941 `ad20-police-stop/sent-on`：证件被翻两遍，警察说“走大路”；她走出十几步才发现自己一直屏着呼吸。

## 6. 受控实验 A–E

`pnpm v4:phase20-experiments` 4/4 通过：

- **A — same interview, different lives**：fame 的 Klara 得到 `hired-on-probation`（DC 9），public-scandal 的 Klara 得到 `thanks-but-no`（DC 15，failure）；同一个 `ad20-job-interview`，不同人生。
- **B — ordinary curse**：`cursed-by-wish` 的 Rosa 在 `pc20-wish.literal-return` 得到 `curse-lifted`，文本是“这顿饭终于只是顿饭”。
- **C — reconciliation**：`fw19-separated-household` 的 Josef 在 `pc20-separation.return-key` 得到 `same-key`，Partner 把箱子放在门槛上。
- **D — public reversal**：`political-suspect` 的 Theresia 在 `pc20-investigation.exoneration` 得到 `re-accused`，通知背面有另一个日期。

受控实验只证明机制可执行；自然发生率见第 7 节。

## 7. 自然人生

### 7.1 主 A/B/C

| Seed | Events | 新 Pack 事件 | 世界占比 | Focal 新事件 / focal | Focal 占比 | Adaptive focal | Adaptive 占比 | repeatRate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase20-a` | 21,096 | 404 | 1.92% | 40 / 2,205 | 1.81% | 51 | 2.31% | 0.2372 |
| `phase20-b` | 23,162 | 456 | 1.97% | 36 / 2,046 | 1.76% | 46 | 2.25% | 0.2143 |
| `phase20-c` | 20,879 | 367 | 1.76% | 21 / 1,342 | 1.56% | 28 | 2.09% | 0.2354 |
| **合计** | **65,137** | **1,227** | **1.88%** | **97 / 5,593** | **1.73%** | **125** | **2.23%** | **0.2290** |

### 7.2 Cohort

| Cohort | Events | 新 Pack 事件 | Focal 新事件 | Adaptive focal | State adds |
|---|---:|---:|---:|---:|---|
| `phase20-elder` | 7,116 | 84 | 3 | 5 | `ad20-public-attention` 13、`ad20-private-bargain` 8、`pc20-second-chance` 1、`pc20-public-reversal` 6 |
| `phase20-mixed` | 15,468 | 361 | 40 | 51 | `ad20-public-attention` 50、`ad20-private-bargain` 19、`pc20-second-chance` 59、`pc20-public-reversal` 34 |

主 A/B/C 的 4 个新 State 全部出现；elder/mixed 也观察到 4 个。`phase-20-adaptive-audit.json`：56 个 adaptive Kernel / 230 个 context，37 个 Kernel 在 A/B/C 出现；加 elder/mixed 后 40 个出现，181 个来自 adaptive-capable Kernel 的 focal 事件 / 7,751 focal = 2.34%。该统计按 Kernel 是否带 `adaptiveContexts` 计数，不证明每次事件都匹配了具体 context；context 实际改变权重的证据来自受控实验与 trace/DC。

### 7.3 自然场景

- **Klara 1941** `ad20-police-stop/sent-on`：证件被翻两遍，警察说“走大路”；她走出十几步才发现自己一直屏着呼吸。
- **Klara 1944** `ad20-loan/sign-here`：借据最后一行写“若逾期，担保人承担”；她问清担保人名字才签字。
- **Josef 1930** `ad20-apprenticeship-review/kept-on`：榫头被对着光看，最后“明天开始，你自己接活”；1941 的 `tools-returned` 又把工具摆上桌，说“不是手艺不好，是店里养不起”。
- **Josef 1942** `pc20-apprentice.second-workshop/sweep-up`：工作台擦干净，刨花扫进麻袋，钥匙还给 Maria Moser；木牌背面还留着没刻完的名字。
- **Mitzi 1933** `ad20-census-form/the-clerk-reads-aloud`：登记表念到“同住人”，她说没有；门外脚步慢了一拍。
- **Mitzi 1947** `ad20-job-interview/name-stays-on-the-list`：雇主问是不是报纸上被提过的人；她说同名同姓；背面那行字是让下一个雇主去问谁。
- **Lena 1933** `ad20-favor-called-in/do-the-favor`：她替人送箱子，因为当年对方垫过一笔医药费。

### 7.4 重复与分布

RepeatRate 0.2290，高于 Phase 19 的 0.2104；这是真实回归。Adaptive Kernel 本身的 top 重复很低（`oj18-zoo.night` 10 次，`ad20-neighbor-dispute` 6，`ad20-police-stop` 6；其余 1–5），但新 State 的 tick/reaction 本身也是新内容：A/B/C 新 State ticks 约 288–354/seed，focal 事件从 Phase 19 的 1,306–1,526/seed 增至 1,342–2,205/seed。重复主要来自状态 tick（含新 State），不能简单归因于“旧 base tick”。新 Pack 的 focal share 1.73%，仍低于 12%，但比 Phase 19 的 0.14% 提升约 11×。

## 8. 独立 Critic

独立 Critic（修订前 dossier）给 **Scene 22/30、Life 18/30**；Phase 19 是 **21/30、17/30**。这是真实但温和的进步，不是跃迁。完整批评见 `docs/v4/phase-20-critique.md`。

Critic 的具体判断：

- **Adaptive 机制成立，但多数只改赔率**：178 个 adaptive-capable focal 事件中 62 个有 check；42 个有非零 adaptive DC 变化；只有 **5 个真正翻转 success/failure**。Josef A 的 `ad20-apprenticeship-review`（failed-apprentice −3，DC 12→15 仍 success）、Hermann Stein 的 `pc20-testimony.retraction`（+3，DC 12→9，翻成 success）、Klara B 的 `ad20-job-interview`（work history +1，DC 12→11，翻成 success）是具体证据。
- **同一事件不同人生**：Mitzi A 1947 的 `name-stays-on-the-list` 与 Mitzi mixed 1947 的 `hired-on-probation` 是同一 Kernel、同一年、不同结果；Rosa A 的 `ld18-wedding.objection` 因 `known-affair` 1.9× weight 让拒绝变得可读；Hedwig 的 `pc20-wish.literal-return` 一次 curse-lifted、一次 curse-returns。但 Mitzi A 的报纸句子是 false specificity：`name-stays-on-the-list` 是无条件 critical-failure，当时没有 `public-scandal`/`fame`。
- **Living consequences 不均衡**：failed apprenticeship 最强（Josef A 1941→1942→1945→1949→1950 的 `pc20-second-chance` 链）；public reversal 半真实（Hermann 的 retraction→quiet-exoneration 干净，Theresia 却只有三次相同 file-disappears tick）；separation 很薄且同月 birth/divorce 碰撞（Hedwig C 1943）；testimony 的 truth 被 `newspaper-caption`/`wrong-apology` 重置，不是携带。
- **自然涌现**：Josef A、Rosa A、Hedwig C、Josef Bauer B、Hermann Stein 是 5 个可引用的多状态故事；Theresia Huber 是反例。
- **重复**：repeatRate 0.2274 的 duplicate mass 主要来自旧 state tick（`raising-child`、`ld18-impossible-attachment`、`eh19-late-testimony` 等）和新的 `pc20-public-reversal/file-moves` tick；不是 AdaptiveContext 本身。新 Pack focal share 1.60% 是 11–15× 改善，但仍低；`pack-living-consequences` 24 个 Kernel 中 13 个未出现，实际被 `pc20-family.parent-mistake`（8）、`pc20-testimony.retraction`（7）、`pc20-apprentice.second-workshop`（6）三个模板主导。
- **Retrofit**：8 个旧 Kernel 全部没有 check，25 个 `checkBonus` 休眠；weight 也大多没有匹配。唯一明确成功是 `ld18-wedding.objection` 的 `known-affair` 1.9×。
- **Role/effect 问题**：`employer` role 有时投成组织，prose 按 person 写；少数 relation effect 被丢弃，文本出现组织名（Josef 1941 `ad20-apprenticeship-review/tools-returned` 是例子）。这是下一轮要修的绑定问题。

Main Agent 的修订响应（不改变 Critic 的 18/30）：

- 给 `ad20-job-interview` 增加 `k01-scandal`（`public-scandal`，weight 1.5，checkBonus −3），修复 Critic 指出的 Experiment A 无效 arm；重跑后 Klara Shamed 的 DC 是 15，Klara Famous 是 9。
- 重新生成实验、自然 dossier、summary 与 audit；最终数字以重跑后的 `phase-20-playtests.json` / `phase-20-adaptive-audit.json` 为准。
- 修正 audit 口径（adaptive-capable kernel，不证明 context match）与未观测数（5 dossiers：40 observed / 16 unobserved；A/B/C 37）。
- 重跑后的最终主 A/B/C：**65,137 events / 5,593 focal**；新 Pack **1,227（1.88%）/ focal 97（1.73%）/ adaptive-capable focal 125（2.23%）**；repeatRate **0.2290**；5 dossiers audit **40 observed / 16 unobserved**。Critic 的 18/30 仍是修订前评分。
- 记录但未修：separation birth/divorce 碰撞、testimony truth 重置、`pc20-public-reversal` 6 个月 tick、旧 Kernel 休眠 checkBonus、base scene 未接入、adaptive context 未写入 trace。

## 9. 测试与命令

```bash
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm v4:story-editor
pnpm v4:phase20-adaptive-audit
pnpm v4:phase20-experiments
pnpm v4:phase20-lives 45 phase20-a,phase20-b,phase20-c
pnpm v4:phase20-summary
pnpm exec tsc --noEmit
pnpm test
```

实际结果（2026-11-07）：

| 命令 | 结果 |
|---|---|
| `pnpm v4:validate-packs` | **31 packs / 0 failed**；两个新 Pack 各 `compiledScenes: 336`、`errors: []` |
| `pnpm v4:content-catalog` | **111 states / 2,108 kernels / 31 packs**；45 high-similarity pairs |
| `pnpm v4:creative-index` | 2,108 records；45 high-similarity pairs |
| `pnpm v4:story-editor` | 2,108 kernels / 2,077 distinct shapes |
| `pnpm v4:phase20-experiments` | **4/4 passed** |
| `pnpm v4:phase20-summary` | 主 A/B/C 65,137 events；aggregate 见第 7 节 |
| `pnpm v4:phase20-adaptive-audit` | 56 adaptive kernels / 230 contexts；5 dossiers 中 40 observed |
| `pnpm exec tsc --noEmit` | 通过 |
| `pnpm build` | 通过（`tsc --noEmit` + Vite build，built in 3.31s） |
| `pnpm test` | **100 files passed / 8 skipped（108）**；**567 tests passed / 37 skipped（604）**；210.82s |
| `pnpm exec vitest run tests/v4-adaptive-context.test.ts tests/v4-phase20-content.test.ts tests/v4-phase20-experiments.test.ts` | **14/14 passed** |

## 10. 未完成与限制

- **Focal share 仍未达标**：新 Pack 只占主 A/B/C focal 事件的 **1.73%**，来自 adaptive-capable Kernel 的事件占 **2.23%**；设计目标是 12%。这是数量级改善，但不是“普通人生已经被新内容主导”。
- **RepeatRate 回归**：主 A/B/C 平均 **0.2290**，高于 Phase 19 的 **0.2104**。新 State 的 tick/reaction 增加了状态事件量（A/B/C 新 State ticks 约 288–354/seed），focal 事件也从 Phase 19 的 1,306–1,526/seed 增至 1,342–2,205/seed。不能把回归简单归因于 adaptive Kernel；它是“更多状态生命周期 + 更多事件”共同造成的。
- **自然统计的边界**：`phase-20-adaptive-audit` 按 Kernel 是否带 `adaptiveContexts` 计数，不记录每次事件实际匹配了哪个 context。Context 真正改变权重/检定的证据来自受控实验 A–D 和 `trace.check.dc`，不是自然 audit 的 2.23%。
- **16 个 adaptive Kernel 未自然出现**：多为 `pc20-*` 的后续分支（`pc20-investigation.exoneration`、`pc20-public.monument`、`pc20-affair.return`、`pc20-home.return` 等）。受控实验能执行，不等于自然人生中常见。
- **旧 Kernel retrofit 的 checkBonus 多数休眠**：8 个旧 Kernel 中多数没有 `check`，所以只有 `weightMultiplier` 实际生效；不能声称它们已经获得“检定差异”。
- **新 State 的节奏偏密**：`ad20-public-attention` 每 6 个月 tick、`pc20-public-reversal/file-moves` 每 6 个月 tick，容易在同一人物身上重复文本；这是 repeatRate 回归的部分来源，也是下一步最直接的修正点。
- **内容覆盖仍偏窄**：56 个 adaptive Kernel / 2,108 个 Kernel；旧库绝大多数仍没有 optional context。普通 base scene（医疗、房租、邻里、求偶）尚未系统接入 AdaptiveContext。
- **部分 role 绑定不干净**：`ad20-job-interview`、`ad20-apprenticeship-review`、`ad20-former-employer` 使用 `kind: "employer"`；引擎有时把它投成组织，prose 却按 person 写，导致少数 relation effect 被丢弃或文本出现组织名。自然例子：Josef 1941 `ad20-apprenticeship-review/tools-returned` 的文本是“Wiener Psychoanalytische Vereinigung把Josef的工具……”，但 relation 指向 Sigmund Freud。下一步应把这些 role 改成 person kind，或拆成独立的 `interviewer`/`foreman` person role + `employer` organization role。
- **家庭/伴侣 slot machine、horizon、生产 runtime 未修**：这些是前几 Phase 的遗留限制，本 Phase 没有解决；分居/复合仍有 birth/residence 覆盖风险。
- **没有 runtime LLM、生产 DB、公网部署**：本 Phase 的所有证据来自本地确定性 Runtime 和已提交 dossier；不得声称生产环境已上线。
- **Critic 只读一轮**：独立 Critic 阅读的是修订前/本轮 dossier；报告不把 Critic 的分数当成修订后重新评分。若后续做 rhythm 修订，需要重新跑第二轮并单独记录。

## 11. 结论

Phase 20 是一个**真实的机制 + 内容 Phase**，但不是“人生连续性问题已经解决”的 Phase。

可以声称：

- `AdaptiveContext` 已进入现有 Engine/Composer/Validator/Runtime，普通、生命周期和 state lane 都能使用；
- 同一事件在 fame / public-scandal / curse / separation / political-suspect 等情境下，确实产生不同的 DC、outcome 和持久状态（受控 A–D 4/4）；
- 2 个新 Pack 的 48 个 Kernel、4 个 State、230 个 context 全部通过验证，且 4/4 新 State 在自然人生中出现；
- 新 Pack focal share 从 Phase 19 的 0.14% 提升到 1.73%，adaptive-capable Kernel 达到 2.23%，是数量级改善；
- 分居、失败学徒、公开翻案、证词、私情、诅咒/愿望等转折有了可执行的内容路径；其中 failed apprenticeship 最强，separation / public reversal 的自然 follow-up 仍不均衡。

不能声称：

- 12% focal share 目标已达成；
- repeatRate 已低于 Phase 19；
- 旧库已被广泛改造；
- 每个 adaptive Kernel 都在自然人生中出现；
- 家庭/伴侣 slot machine、horizon、生产 runtime 已修；
- 公网/生产环境已上线。

结论：**机制成立，内容有效，分布仍弱。** 下一步最值得投入的不是再加 100 个新 Kernel，而是：把 AdaptiveContext 接入高频 base scenes、降低新 State tick 密度/增加变体、让 `pc20-*` 下游更容易被自然触发，并继续处理分居/复合与 birth/residence 的覆盖冲突。
