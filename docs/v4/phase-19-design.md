# Phase 19 — Stories in Collision 设计

日期：2026-11-07  
基线：Phase 18 `4b3051b` — 99 states / 1,973 kernels / 25 generated packs。  
Evidence：`phase-18-report.md`、`phase-18-critique.md`、`content-catalog.json`、`creative-index.json`、`phase-18-playtests.json`。  
新增工具：`scripts/v4-cross-pack-map.ts`、`scripts/v4-story-editor.ts`、`scripts/v4-phase19-cooccurrence.ts`、`scripts/v4-phase19-experiments.ts`、`scripts/v4-phase19-summary.ts`。
ADR：`docs/decisions/ADR-019-cross-pack-collisions-and-life-continuity.md`。

## 1. 目标

Phase 19 不把内容库继续当作 25 个并排的主题包，而是让已有 State / Relation / Position / 历史环境与人物过去发生碰撞。

优先级：

1. **Cross-Pack Opportunity Map**：让作者能查询“两个已有 State 还没有被同一个 Kernel 消费”的组合。
2. **Collaborative Packs**：创作真正需要两个以上不同领域 State 才能成立的故事。
3. **Life continuity**：减少同一个人反复换职业、重复同一 State tick、伴侣/组织不断重置。
4. **Distribution**：让老年、童年、悬疑等 focal 转化弱的内容真正进入人物人生，而不是只做 NPC 墙纸。
5. **Natural evidence**：多种起始年龄、阶层、职业、关系、愿望的完整人生；受控碰撞实验只证明机制可执行，不作为自然发生率。

## 2. 基线诊断

Phase 18 的独立 Critic 给出：

- Life **17/30**（Phase 17 16/30），Scene sample **22/30**；
- 世界事件 9.65% 来自 Phase 18 Pack，但 focal 只有 8.37%；
- 世界层面 185/232 新 Kernel 触发，focal 层面只有 113/232；
- `oj18-odd-apprenticeship` 四个 seed 共 537 次 add，两个 tick 文本分别为 70/52 次；
- `em18-late-bloom` 171 次 add、只有 1 个 focal scene；
- `bc18-bureaucratic-ghost` 111 次 add，七条 Kernel 共享一个“文件改变现实”结构；
- 职业 sampler、伴侣滑动、状态 tick 重复是生活连续性的主要问题。

Phase 19 不试图一次修完所有长期问题。它选择：

- **可用内容解决**的：odd-jobs 入口上限、重复 tick、elder/mystery focal gate、attachment continuity；
- **可用轻量机制解决**的：state opportunity lane 的 cross-state affinity、不同起始年龄的 focal cohort；
- **仍留待以后**的：完整家庭/伴侣 slot machine 重写、horizon、生产级 LLM runtime。

## 3. Cross-Pack Opportunity Map

`scripts/v4-cross-pack-map.ts` 从 `ALL_STATES` / `KERNEL_LIBRARY` / `GENERATED_STATE_PACKS` 派生：

- 每个 State 的 consumers / creators / pack / owner / tags；
- 当前没有任何 Kernel 同时消费的跨 Pack State pair（open）；
- 已被同一 Kernel 消费的 pair（covered，用于避免把已有碰撞当作空白）；
- collision family：`romance_power`、`family_war`、`craft_luck`、`elder_history`、`money_crime`、`body_faith`、`default`；
- 每个 pair 的机会提示（blackmail、public confession、evacuation choice、late testimony 等）。

```bash
pnpm v4:cross-pack-map
pnpm v4:cross-pack-map -- --state known-affair
pnpm v4:cross-pack-map -- --pair known-affair,office-patronage
pnpm v4:cross-pack-map -- --gaps
```

输出：

- `docs/v4/cross-pack-opportunities.json`
- `docs/v4/cross-pack-opportunities.md`

实际共现：

```bash
pnpm v4:phase19-cooccurrence
```

读取已提交 dossier 中同一人物/家庭同时活跃的 State，输出 `docs/v4/phase-19-cooccurrence.json/md`。它回答“世界已经把哪些 State 放在同一个人身上”，比静态 pair 更接近真实机会。

这不是固定剧情图，也不是 runtime scheduler。一个 open pair 只说明“值得看”，不说明必须写；一个 covered pair 也可能已经有很好的故事。

## 4. Collaborative Content Packs

四个小组，每个 Pack 2 个新 State，约 18–22 Kernel，2–4 Outcomes/Kernel。

### 4.1 `pack-collision-power-love` (`pl19-`)

**Romance × political power / scandal / crime.**

新 State：

- `pl19-protected-scandal`（person）：一段私密关系被一个小型保护网络知道；参数 `exposure`、`protection`、`leverage`、`publicHeat`。创建于 `known-affair` / `forbidden-attachment` / `ld18-impossible-attachment` + `office-patronage` / `office-under-siege` / `public-scandal` / `fame`。
- `pl19-public-ally`（person）：伴侣/朋友成为公开的政治盟友或负债；参数 `visibility`、`loyalty`、`cost`。创建于 `fame` / `office-patronage` / `ld18-public-desire` + `known-affair` / `forbidden-attachment`。

至少 8 个 Kernel 同时消费两个来自不同 Pack 的 State。例子：

- 对手掌握私情，要求一份官职/合同；
- 情人主动利用政治关系，不问当事人；
- 当事人主动公开，以保住家人；
- 报纸认错情人；
- 丑闻意外增加支持率；
- 辞职后获得更大的民间影响力；
- 组织要求切割，伴侣成为谈判筹码；
- 孩子在学校听到传闻；
- 配偶/伴侣作为不在场证明；
- 对手的丑闻可以交换，但会制造新的债。

### 4.2 `pack-collision-family-war` (`fw19-`)

**Family × war / occupation / migration.**

新 State：

- `fw19-separated-household`（household）：家庭被疏散、征兵、占领或边境分开；参数 `distance`、`missing`、`dependents`、`hope`。创建于 `raising-child` + `occupied-city-regime` / `war-widow-with-children` / `mb17-newcomer` / `grief`。
- `fw19-war-ward`（person）：孩子/少年被安置到陌生家庭；参数 `safety`、`loyalty`、`originKnowledge`、`returnPressure`。创建于 `raising-child` + `grief` / `occupied-city-regime` / `mb17-newcomer`。

至少 8 个 Kernel 同时消费两个不同 Pack 的 State。例子：

- 母亲必须决定先带哪个孩子走；
- 失踪家庭成员多年后回来，但已经属于另一个家庭；
- 孩子被陌生家庭收养，战后两边都来认领；
- 一次普通善举在战后连接两个家庭；
- 家庭秘密成为政治迫害原因；
- 配给名单逼迫家庭内部排序；
- 学校/语言/宗教在流亡中改变孩子；
- 归来者发现自己的位置被顶替。

### 4.3 `pack-collision-luck-craft` (`lc19-`)

**Craft/work × supernatural luck / reputation.**

新 State：

- `lc19-borrowed-reputation`（person）：成功被归因于运气、他人或神迹；参数 `suspicion`、`debt`、`fame`、`proof`。创建于 `oj18-odd-apprenticeship` / `journeyman` + `df18-borrowed-luck` / `af17-lucky-idiot` / `fame`。
- `lc19-workshop-talisman`（person）：作坊把一个人当作幸运物/招牌；参数 `reliance`、`dignity`、`protection`、`debt`。创建于 `oj18-odd-apprenticeship` + `df18-borrowed-luck` / `wc17-master-craftsperson` / `suspected-witchcraft`。

至少 8 个 Kernel 同时消费两个不同 Pack 的 State。例子：

- 学徒意外完成师傅未完成的作品；
- 同事怀疑作弊，要求公开比试；
- 师傅利用学徒的好运参加比赛；
- 学徒在最不合适的时间获得晋升；
- 宗教团体把连续奇迹当成征兆；
- 借来的好运在展览当天到期；
- 作坊把学徒当吉祥物，不让他离开；
- 一次失败反而被解释为“替大家挡了灾”。

### 4.4 `pack-collision-elder-history` (`eh19-`)

**Old age / memory × historical legacy / politics.**

新 State：

- `eh19-late-testimony`（person）：老人被要求作证/回忆一段历史；参数 `memory`、`pressure`、`danger`、`truth`。创建于 `em18-family-archive` / `hs18-street-witness` + `political-suspect` / `occupied-city-regime` / `under-investigation`。
- `eh19-inherited-cause`（household）：后代继承一个政治主张/组织/未完成承诺；参数 `commitment`、`risk`、`legacy`、`division`。创建于 `em18-late-bloom` / `family-estate` + `grief` / `institution-purge` / `hs18-street-witness`。

至少 8 个 Kernel 同时消费两个不同 Pack 的 State。例子：

- 老证人被要求从照片里认出一个人；
- 孙子/孙女重新拾起被禁的组织；
- 家庭档案成为法律证据；
- 晚年爱情与政治过去冲突；
- 公开道歉的要求来自错误的一代；
- 家族保护了一辈子的历史谎言随房子一起继承；
- 老人在作证前发现自己记错了；
- 组织希望老人成为纪念符号，而不是证人。

## 5. Author rules

- 每个新 State 有 creation path、外部 consumer、tick/reaction/transition；
- 每个 Kernel 2–4 outcomes，40–220 中文字符，至少一个 typed effect；
- 至少 8 个 Kernel 同时消费 2 个不同 Pack 的 State；
- 至少 2 个 Kernel 使用家中/组织/职位或关系条件；
- 不新增任意代码、SQL、URL；不新增平行 Director；
- 先跑 `pnpm v4:creative-index -- --query ...` 和 `pnpm v4:cross-pack-map -- --state ...`；
- 写出最近邻 3 条 + divergence；
- Pack 文件只写自己的 JSON，不改 registry/catalog/index；
- 验证命令：`pnpm tsx scripts/v4-validate-state-pack.ts <file>`。

## 6. Editorial / Story Editor

新增 `scripts/v4-story-editor.ts`：

- 为每个 Kernel 计算确定性 **story shape**：role topology、state-condition skeleton、production targets（state_add/transition/position/organization）、outcome effect skeleton、branch count；
- 额外输出 **state-core clusters**（同一 standing state 的不同道具）和 **production clusters**（同一 state_add 入口的不同条件），用于召回官僚幽灵、奇职 sampler 等结构；
- 聚类并输出 `docs/v4/story-shapes.json/md`；
- `--pack <file>` 输出 review packet，供 LLM Editor 阅读；
- LLM Editor 不直接写入 runtime，只给 Author 修改建议；
- 目标不是把故事规范成统一模板，而是发现“换了人物和道具的同一故事”。

## 7. Runtime / content rhythm experiments

优先内容解决；必要时 Main Agent 统一做轻量 runtime 修改。

候选：

1. **Odd-jobs cap**：entry kernels 加 `notHasState`（odd apprenticeship + workplace legend）/ 更长 cooldown；`strange-year` 改为每 24 个月，进度值相应加倍，并增加两个 outcome 变体。当前 30 年 elder baseline 的 focal tick 从 5/4 降到 2 次量级。
2. **State opportunity cross-affinity**：state-driven scene 若匹配 2+ active state/position，获得 bounded weight bonus（1 + 0.2 × min(3, n−1)）；只在 state lane 内，记录 `crossStateCandidates` / `crossStateResolved`。
3. **Elder focal gate**：`em18-late-bloom` / `em18-family-archive` 的入口降低对死亡/空巢串联的依赖。
4. **Mystery resolution**：新增一个消费 `sm18-missing-object` 的 resolution kernel，而不是继续加“又一只抽屉”的 tick。
5. **Attachment continuity**：避免 `yf18-first-awakening` 在旧关系未结束前反复添加。

## 8. Playtests

### 8.1 Natural seeds

- 3 个 45 年主 seed（延续 Phase 18 方法）；
- 1 个 30 年“老年 cohort” seed：使用 1912 年已存在的 63/58/56/48/45 岁人物作为 focal，观察 60–90 岁；
- 1 个混合年龄 seed：同时包含 8/14/45/63 岁人物。

`scripts/v4-phase15-lives.ts` 新增 `--existing=<ids>` 与 `--existing-only`；existing-only 跳过八个新生 focal，只观察 seed 人物。已有 seed 人物不设置 `ownerId`，避免把观察选择变成事件率特权。

### 8.2 Controlled collision experiments

- Romance × Power：`known-affair` + `office-patronage` + `public-scandal`；
- Family × War：`raising-child` + `occupied-city-regime` + `grief`；
- Craft × Luck：`oj18-odd-apprenticeship` + `df18-borrowed-luck` + `fame`；
- Elder × History：`em18-family-archive` + `hs18-street-witness` + `political-suspect`。

受控实验只证明新 Kernel 可编译/执行；自然 seed 判断出现率与游戏价值。

## 9. Acceptance

- 10 个新 State（4 Pack × 2 + 可能 2 个补充）全部 validate，有 creation + consumer；
- 至少 60 个新 Kernel，至少 32 个同时消费 2+ 不同 Pack 的 State；
- 至少 8 个新 Kernel 在自然人生中产生跨领域 event；
- odd-jobs 重复显著下降，职业连续性改善；
- 老年 focal event 在 elder cohort 中实际出现；
- 新内容 focal share ≥ 12% or a documented, honest reason why not；
- repeatRate 不高于 Phase 18 的 0.220，最好低于 0.20；
- 独立 Critic 能指出至少 6 个由多个模块共同产生的具体故事；
- 不声称 runtime LLM 叙事、生产 DB、公网部署已完成。

## 10. Deliverables

- `docs/v4/phase-19-design.md`
- `docs/v4/cross-pack-opportunities.json/md`
- `docs/v4/story-shapes.json/md`
- `docs/v4/phase-19-content-collisions.md`
- `docs/v4/phase-19-playtests.json`
- `docs/v4/phase-19-critique.md`
- `docs/v4/phase-19-report.md`
- 更新 `content-catalog`、`creative-index`、README、plan、implementation report。
