# Phase 20 — Adaptive Content

日期：2026-11-07  
设计：`docs/v4/phase-20-design.md`  
Catalog：`docs/v4/content-catalog.md`  
Creative Index：`docs/v4/creative-index.md`

## 1. 两个新 Pack

| Pack | Kernels | States | Adaptive contexts | Check kernels | Conditional-outcome kernels | Novelty |
|---|---:|---:|---:|---:|---:|---|
| `pack-adaptive-everyday` | 24 | 2 | 108 | 8 | 16 | 0 pairs ≥0.20; top 0.135 |
| `pack-living-consequences` | 24 | 2 | 97 | 9 | 24 | 0 pairs ≥0.20; top 0.168 |

新 State：

- `ad20-public-attention`：普通生活被公众注意；`attention/sympathy/danger/opportunity`。
- `ad20-private-bargain`：私下的帮助/交易/人情持续存在；`leverage/trust/debt/exit`。
- `pc20-second-chance`：失败/失散/失势后的第二次机会；`credibility/debt/hope/suspicion`。
- `pc20-public-reversal`：公开翻案/再次指控；`proof/pressure/support/danger`。

每个新 State 都有 creation path 与外部 consumer；`tests/v4-phase20-content.test.ts` 验证。

## 2. Adaptive Everyday

Primary eligibility 故意宽：21 个 Kernel 只用年龄，2 个用 `raising-child`，1 个用 `chronic-illness`。真正改变故事的是可选情境：

- 求职面试：`fame` +3、`public-scandal` −3、`blacklisted` −3、`private-bargain` +1；
- 房东来访：`public-attention` +3、`public-scandal` +2、`private-bargain` +1、贫穷 −2；
- 学校会议：`public-attention` +2、`fame` +2、`blacklisted` −3、照护负担 −1；
- 贷款：`office-patronage` +2、`debt-bondage` −2、private-bargain trust +1；
- 公开演讲：`fame` +3、`public-scandal` −3、`known-affair` −2、`ad20-public-attention` +2、charisma +2；
- census form：`public-attention` / `private-bargain` / `mb17-newcomer` 分支。

强场景：

1. **`ad20-job-interview`**：同一个面试间，fame 让 DC 从 12 降到 9，public-scandal 让另一个人的结果变成 failure；不是换文本，是同一事件在不同人生里真的不同。
2. **`ad20-public-speech`**：fame +3 vs public-scandal −3；成功创建 `ad20-public-attention`，critical failure 创建敌对 attention。
3. **`ad20-loan`**：office-patronage +2 vs debt-bondage −2；成功创建 `ad20-private-bargain`，critical failure 制造掠夺性借据。
4. **`ad20-census-form`**：年龄 only primary；第七个名字分支同时使用两个新 State，是“普通官僚表格承载持久状态”的最佳展示。
5. **`ad20-wedding` / `ad20-market-day` / `ad20-family-dinner`** — 温暖、comic、家庭压力由这些普通场景承担。

## 3. Living Consequences

Primary 消费一个已有转折 State；可选情境决定修复/恶化/留白：

- 分居复合：`fw19-separated-household` + `raising-child`/`grief`/`relationHistory`；
- 失败学徒二次作坊：`failed-apprentice` + `wc17-master-craftsperson`/`fame`/`debt-bondage`；
- 政治翻案：`political-suspect` + `fame`/`under-investigation`/`history`；
- 私情回头：`known-affair` + `raising-child`/`fame`/`grief`；
- 愿望字面/部分/反讽：`cursed-by-wish` + partner/neighbor/wealth；
- 旧敌成盟友、朋友再次背叛、家族秘密、死者的承诺、父母错误、纪念碑、回家。

强场景：

1. **`pc20-separation.return-key`**：同一把钥匙，`same-key` / `sign-here` / `leave-the-key` 三种方向；受 adaptive context 和 check 影响。
2. **`pc20-apprentice.second-workshop`**：失败学徒重新开张 / 扫地 / 借别人的工作台；师承不是一次性事件。
3. **`pc20-investigation.exoneration`**：cleared / re-accused / quiet-exoneration；政治嫌疑有持久后果。
4. **`pc20-affair.return`**：reunite-carefully / close-the-door / child-introduction；私情不是永远停在曝光。
5. **`pc20-wish.literal-return`**：curse-lifted / curse-returns / partial-return；同一个愿望三种兑现。
6. **`pc20-public.monument`**：纪念一个人，还是把活人变成符号；public-reversal 的下游。

## 4. 旧 Kernel Retrofit

8 个旧 Kernel、25 个 adaptive contexts：

| Kernel | Contexts |
|---|---|
| `oj18-cinema.reel` | fame ×1.8/+2; public-scandal ×1.6/−2; blacklisted ×1.5/−3; chronic-illness ×1.4/−2 |
| `oj18-zoo.night` | fame ×1.7/+1; grief ×1.6/−2; chronic-illness ×1.5/−3 |
| `oj18-mortuary.first-body` | grief ×1.8/−2; fame ×1.5/+2; under-investigation ×1.6/−2 |
| `em18-late-bloom.radio-hour` | family-estate ×1.5/+1; chronic-illness ×1.6/−2; fame-history ×1.7/+1 |
| `em18-family-archive.grandchild-photo` | grief ×1.7/−2; fame ×1.5/+1; raising-child ×1.6/+2 |
| `ml18-lottery.same-numbers` | debt-bondage ×1.8/−2; raising-child ×1.6/+1; public-scandal ×1.5/−2 |
| `sm18-object.false-accusation` | under-investigation ×1.8/−3; office-patronage ×1.5/+1; fame ×1.6/−1 |
| `ld18-wedding.objection` | known-affair ×1.9/−2; fame ×1.6/+1; raising-child ×1.5/−1 |

注意：这 8 个旧 Kernel 大多没有 `check`，所以 checkBonus 目前是“结构有效但未触发”；weightMultiplier 已经实际生效。后续可以把它们改成带 check 的 Kernel，或只保留权重。

## 5. 受控证据

`pnpm v4:phase20-experiments`：

- **A — same interview, different lives**：fame 的 Klara 得到 `hired-on-probation`（DC 9），public-scandal 的 Klara 得到 `thanks-but-no`（DC 15，failure）；同一事件、不同人生。
- **B — ordinary curse**：`cursed-by-wish` 的 Rosa 在 `pc20-wish.literal-return` 中得到 `curse-lifted`，文本是“这顿饭终于只是顿饭”。
- **C — reconciliation**：`fw19-separated-household` 的 Josef 得到 `same-key`，Partner 把箱子放在门槛上。
- **D — public reversal**：`political-suspect` 的 Theresia 得到 `re-accused`，通知背面有另一个日期。

4/4 受控场景通过；这些只证明机制可执行，不证明自然发生率。

## 6. 自然发生率

主 A/B/C（45 年）：

- **65,137 events / 5,593 focal events**
- 新 Pack **1,227 事件（1.88% 世界）**
- 新 Pack **97 个 focal 事件（1.73%）**
- 来自带 `adaptiveContexts` 的 Kernel 的 **125 个 focal 事件（2.23%）**
- 4/4 新 State 至少出现一次
- repeatRate **0.2290**

Cohort：

- elder：7,116 events；新 Pack 84；focal 3；adaptive 5
- mixed：15,468 events；新 Pack 361；focal 40；adaptive 51

Phase 19 的对应 focal share 是 0.14%；Phase 20 的 1.7%–2.2% 是显著改善，但仍低于 12% 目标。自然人生中实际出现的 adaptive 场景包括：

- Klara 1941 `ad20-police-stop/sent-on`：证件被翻两遍，警察说“走大路”；她走出十几步才发现自己一直屏着呼吸。
- Klara 1944 `ad20-loan/sign-here`：借据最后一行写“若逾期，担保人承担”；她问清担保人名字才签字。
- Josef 1930 `ad20-apprenticeship-review/kept-on`：师傅/市政人员把榫头对着光看，最后说“明天开始，你自己接活”。
- Josef 1941 `ad20-apprenticeship-review/tools-returned`：工具一件件摆上桌，师傅说“不是手艺不好，是店里养不起”；布袋比来时轻。
- Josef 1942 `pc20-apprentice.second-workshop/sweep-up`：工作台擦干净，刨花扫进麻袋，钥匙还给 Maria Moser；木牌背面还留着没刻完的名字。
- Mitzi 1933 `ad20-census-form/the-clerk-reads-aloud`：登记表念到“同住人”，她说没有；门外脚步慢了一拍。
- Mitzi 1947 `ad20-job-interview/name-stays-on-the-list`：雇主问是不是报纸上被提过的人；她说同名同姓；背面那行字是让下一个雇主去问谁。
- Lena 1933 `ad20-favor-called-in/do-the-favor`：她替人送箱子，因为当年对方垫过一笔医药费。

这些不是 forced demo；它们来自自然 A/B/C dossier。`phase-20-adaptive-audit.json` 显示 56 个 adaptive Kernel 中 40 个在 5 个 dossier 中出现，16 个未出现（A/B/C 为 37）（多为 `pc20` 的后续分支）。注意：自然统计按 Kernel 是否带 `adaptiveContexts` 计数，**不证明某次事件真的匹配了某个 context**；context 实际改变权重的证据来自受控实验与 trace/DC。

## 7. 限制

- AdaptiveContext 只改变选择/检定；持久后果仍必须写入 State/Relation/Flag/Knowledge/Position。
- 旧 Kernel retrofit 的 checkBonus 大多休眠；不要声称旧 Kernel 已全部获得检定差异。
- 新 Pack 仍可能 focal 转化不足；自然数据决定结论。
- 没有新增 runtime LLM、生产 DB、公网部署。
- 结构重复（custody/inheritance）仍需内容压缩；本阶段优先普通事件敏感性和转折后续。
- `ad20-job-interview` / `ad20-apprenticeship-review` / `ad20-former-employer` 的 `employer` role 有时投成组织，但 prose 按 person 写；少数 relation effect 被丢弃。自然例子见 `phase-20-report.md` 的限制节。
