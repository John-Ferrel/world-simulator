# Phase 19 — Independent Critique and Revision Response

日期：2026-11-07  
Reviewer：独立 Playtest / 文学 Critic（不改代码、不改内容）  
Evidence：`phase-15-phase19-a/b/c/elder/mixed.json`（3×45 年 + 30 年老年 cohort + 35 年混合 cohort）、`phase-19-playtests.json`、`phase-19-pre-bridge.json`、`phase-19-post-bridge-pre-weight.json`、`phase-19-content-collisions.md`、`story-shapes.md`、四个 Collision Pack。  
Baseline：Phase 18 独立 Critic — Life **17/30**，Scene **22/30**。

> 以下为独立 Critic 的修订前判断；Main Agent 的修订响应单独记录，不把修订后的内容重新冒充为同一轮独立评分。

## 1. 分数

**Scene sample：21/30。Life level：17/30。**  
Phase 19 是真实的内容/工具 Phase，但还不是在游玩中真正发生的 collision Phase。库里有真正的双 State 场景；自然人生大多执行 bridge 与 state tick。报告可以声称前者，不能声称后者。

严格按“两个不同 Pack 的 State”规则，87 个新 Kernel 中只有 **76/87** 是双 Pack（power-love 18、family-war 20、luck-craft 18、elder-history 20），不是 78/86。Elder-history 是 20/23：`eh19-bridge.first-question`、`family-promise`、`question-arrives` 是单 State/无 State。

## 2. 哪些 collision 真正成立

| Kernel | States | Evidence | 判断 |
|---|---|---|---|
| `pl19-scandal.protection-offer` | `known-affair` + `office-patronage` | “侍者、楼下的门房和一位记账的修女都拿{patron}的薪水……第一次觉得被人看见也可以是一种被安排好的安全。” | **真碰撞**：没有 patronage 就没有保护网；没有私情就没有要保护的东西。 |
| `pl19-scandal.alibi` | `pl19-protected-scandal` + partner | “房子归Gustav Winter，Lena保留探视权……这不是帮忙，是一次结账。” | **场景真，后果弱**：房子转移没有建模，只有 cash/relation/state parameter。 |
| `fw19-split.orphan-marking` | `raising-child` + `occupied-city-regime` | “校长说孤儿名册能换来救济粮……Berta Moser看见自己的姓被墨水盖住。” | **真碰撞**：占领制造孤儿名单，家庭提供孩子。 |
| `fw19-split.other-family-claim` | `fw19-war-ward` + occupation | “两个家长都拿着照片……孩子说‘我先回去把课桌收拾一下’。” | **真碰撞，但第四个 custody trilemma。** |
| `fw19-split.borrowed-goat` | `raising-child` + occupation | “借来的山羊……第一碗送给Hedwig，第二碗留给Ferdinand，自己舔了舔碗边。” | **装饰性**：文本和机制都没有 occupation，也没有 `fw19` state。 |
| `lc19-apprentice.masterpiece` | `oj18-odd-apprenticeship` + `df18-borrowed-luck` | “师傅在楼上咳嗽，说这是‘借来的手气’。没有人问学徒的名字，门却被抬进了市议会。” | **半真**：手艺驱动动作；borrowed luck 提供解释，不是冲突。 |
| `lc19-luck.exhibition-due` | `lc19-borrowed-reputation` + `df18-borrowed-luck` | “展签写着‘材料：借来的运气，未结清’。” | **真碰撞**：名声与债都必要。 |
| `eh19-testimony.photo-face` | `em18-family-archive` + `hs18-street-witness` | “说得出他当年的绰号，却说不清那天自己站在哪一边。” | **真碰撞**：档案提供照片，见证记忆提供辨认。 |

**转化问题**：五个 cohort 中，154 个新 Pack 事件里只有 **10 个**执行了消费新 State 的 Kernel；**80 个**是 bridge。只有 **3 个 focal 事件**消费新 State：Lena 的 `pl19-scandal.alibi`、Alois 的 `eh19-testimony.wrong-apology` / `newspaper-caption`（修订后为 `newspaper-caption`）。库能碰撞，人生大多没有。

## 3. 人生质量

- **Mitzi A（188 events）**：`pl19-bridge.first-ally`（1943）创建 `pl19-public-ally`，随后产生 7 个 tick/reaction；但 tick 文本逐字重复：“有人问盟友，晚上回家时会不会替Mitzi数钱……”3 次，“盟友替Mitzi办了一件没有记者在场的小事”2 次。盟友 Otto 在 1947 年住房场景回来，1941 年再婚也引用未解决的 `known-affair`。State → later scenes：有，但主要是 tick。
- **Lena C（326 events）**：`pl19-bridge.public-rumor`（1941）创建 `pl19-protected-scandal`；`pl19-scandal.alibi`（1942）是最强 focal collision：“Gustav Winter愿意作证，但要在分居协议上多写一条：房子归Gustav Winter，Lena保留探视权……这不是帮忙，是一次结账。”机制上只有 cash −3、relation −0.05、两个 state parameter；没有房产、分居或 household state。1943 年离婚失败（“拿不出证人”），1944–1949 又和同一个 Gustav 生了孩子。1933–1949 有 **17 个“产床与借来的摇篮”**，1938–1949 连续 12 年，名字重复（Anton 两次、Anna 三次、Berta 两次、Katharina 两次）。分居被后六年推翻。
- **Alois Lechner，mixed（227 events）**：四次 `question-arrives`（1938-09、1939-01、1944-02、1946-12）创建/重置 `eh19-late-testimony`。`wrong-apology`（1946-01）是真道德选择：“该道歉的不是那一年，而是后来把责任推给死人的那些人。”它把 truth 从 43 提到 51；1946-12 的问卷又把 state 替换成 truth 45；1947-01 `newspaper-caption` 再降到 39：“死人需要一个好听的名字……活人还可以不说话。”过去在 prose/child 里回来，但机制擦掉了修正。State 还产生 19 个 tick/reaction，`someone-coaches` 3 次、`rehearsed` 2 次。
- **Maria Kral，elder（82 events）**：两次 `question-arrives`（1934-07、1935-10）；第二次替换第一次，state 在她 1938 年死亡时过期。文本是“拿着问话单去敲隔壁的门……最后只确认了门牌号”。没有 testimony kernel 触发。Elder cohort 的 23 个 `eh19` 事件是 21 个 `question-arrives` + 2 个 `first-question`，**零** archive/witness kernel。
- **Luise Lechner，C（207 events）**：`fw19-split.borrowed-goat`（1940）是唯一新 focal 事件；occupation 不在场景里，没有 `fw19` state，没有后续。最弱的“条件贴上”。

**最强涌现故事**：NPC Josef Bauer 的 luck-craft 链 — `lc19-apprentice.masterpiece`（1930-01）→ `lc19-reputation.public-proof`（1930-05）→ `lc19-luck.exhibition-due`（1931-01）。学徒完成师傅的门，功劳被归为“借来的运气”，公开证明改变 proof/suspicion，债被挂上展墙：“材料：借来的运气，未结清。”有开头、中段、结尾和状态变化；但它不是 focal。最强 focal 弧是 Alois 1946–47 的更正/照片说明，prose 更强，机制却重置。

## 4. 重复

**同 Kernel**：`eh19-bridge.question-arrives` 在 Alois 身上 4 次、Theresia 4 次、Maria 2 次；elder cohort **21/23**、mixed **39/41**。8 年 cooldown 按 composed scene ID 计算，换 context/milieu 就绕过；1938-09 与 1939-01 相隔不到一年。State tick 也逐字重复：Mitzi `a-question-too-far` 3 次、`a-private-thanks` 2 次；Alois `someone-coaches` 3 次、`rehearsed` 2 次；Lena “有人替Lena挡了一次采访”4 次。

**结构**：family-war 仍有 4–5 个“谁留下孩子”Kernel（`other-family-claim`、`returned-father`、`inlaws-claim`、`sibling-stays`、`evacuation-list`）；Editor 自己把 `inlaws-claim` 称为第五个 custody trilemma。但游玩里 family-war 高频的是 `borrowed-goat` 21、`deserter` 26、`orphan-marking` 9，custody 只有 1 次。Elder-history 有十个 `eh19-inherited.*` trilemma，但 `eh19-inherited-cause` 在五个 cohort 中只有 mixed 1 次；观察到的重复是通用问卷，不是继承。

**文字**：`story-shapes.md` 仍有 31 个“在门口站了一会儿”、13 个“门口站了一会儿把”、11 个“门口站了很久最后”、10 个“笔尖在纸上停了一”。新 Pack 短模板重复：16 个“第二天”、10 个“那天夜里”、9 个“在桌上，说”。新 Pack 内部 8 字重复低，但 state tick 是逐字重复。

**Odd-jobs**：entry adds 从 Phase 18 的 537 降到 A/B/C 的 **252**（87/95/70），top focal tick 从 70/52 降到 **5/4**（A）。这是真改善，不是修复：252 adds 仍在；repeatRate **0.2035/0.2071/0.2205**，均值 **0.2104**，只比 Phase 18 的 0.2202 低 0.0098；C 仍高于 0.220 上限。报告不能拿 elder baseline 的“2 ticks”当最终结果；最终主日志是 5/4/3、4/4/3、4/3/3。

## 5. 分布

| Pack | World events（5 cohort） | Focal 新事件 | 判断 |
|---|---:|---:|---|
| `pack-collision-power-love` | 22 | 5 | Focal 可达，但 5 个里 4 个是 `public-rumor`/`first-ally` bridge；只有 1 个是双 State `alibi`。 |
| `pack-collision-family-war` | 60 | 1 | NPC 墙纸；`separated-household` 0 adds，`war-ward` 5；goat 21、deserter 26。 |
| `pack-collision-luck-craft` | 8 | 0 | NPC-only 链（Josef Bauer）；无 focal。 |
| `pack-collision-elder-history` | 64 | 12 | Cohort 显微镜：10 个 `question-arrives`、2 个 testimony；0 个 archive/witness 或 inherited-cause。 |

五个 cohort 的 State adds：**13 `pl19-protected-scandal`、6 `pl19-public-ally`、0 `fw19-separated-household`、5 `fw19-war-ward`、4 `lc19-borrowed-reputation`、1 `lc19-workshop-talisman`、62 `eh19-late-testimony`、0 `eh19-inherited-cause`**（修订后 18/28 late-testimony，inherited-cause 1）。两个新 State 从未存在；一个只存在一次。62 个 late-testimony adds 占全部新 State adds 的 68%。

Existing-person cohort 是合法观察窗口，不是玩家路径。主 45 年新生 seed 的 **6 个 focal collision events / 4,190 = 0.14%**，低于 12% 验收目标，也低于 Phase 18 的 8.37% all-pack share。只有 3 个 focal 事件消费新 State。Family-war、luck-craft 和 archive/inherited 半边是 world texture；power-love 的 bridge/alibi 与 mixed cohort 的两个 testimony 是 player-facing 碎片。

## 6. 连续性

Cross-state weighting 改变了数量，没有改变玩家结果。A/B/C 新 Pack 事件 16/12/5 → bridge 后 25/20/24 → cross-pack weight 后 **29/14/35**；focal 0/0/3 → 3/0/5 → **2/1/3**。Cross-state resolutions 37/28/33 → 47/39/45，但 focal collision events 下降。Bridge 是主动因素；weighting 主要增加世界事件。

State carry 真实但薄：Mitzi 的 public-ally → 7 ticks；Lena 的 protected-scandal → alibi + 5 ticks；Alois 的 late-testimony → 2 kernels + 19 ticks；Josef Bauer 的 borrowed-reputation → 2 kernels。`fw19-separated-household` 与 `eh19-inherited-cause` 没有 carry，因为几乎没有存在。Career churn 在 tick 层改善（B 的 Josef 有一个 1925–1930 apprenticeship，不是 Phase 18 的出租车/动物园 sampler），但 252 odd-jobs adds 仍在；这是 cap，不是职业模型。Partner continuity 只部分改善：Mitzi 的 `yf18-first-awakening` 只加一次，不是四次；但 Lena 的 alibi 分居被后六年出生/同居推翻。Slot machine 变成固定 slot，但 payout 仍矛盾。

## 7. 文学样本

评分：2 = 具体、人物特定、持久后果；1 = prose 强但只有参数或结构重复；0 = 装饰性。

| Scene | Score |
|---|---:|
| `pl19-scandal.protection-offer` | 2 |
| `pl19-scandal.alibi` | 1 |
| `pl19-scandal.resignation` | 2 |
| `fw19-split.orphan-marking` | 2 |
| `fw19-split.other-family-claim` | 1 |
| `fw19-split.returned-father` | 1 |
| `fw19-split.borrowed-goat` | 1 |
| `lc19-apprentice.masterpiece` | 2 |
| `lc19-luck.exhibition-due` | 1 |
| `lc19-talisman.bad-luck` | 1 |
| `eh19-testimony.photo-face` | 2 |
| `eh19-inherited.house-lie` | 2 |
| `eh19-testimony.wrong-apology` | 1 |
| `eh19-testimony.newspaper-caption` | 1 |
| `eh19-bridge.question-arrives` | 1 |

**Total 21/30**（6 个 2、9 个 1）。Phase 18 为 22/30。Phase 19 最好的六个场景强于 Phase 18 平均，但样本包含更多 bridge 和参数式结尾；不向上取整。

Project-level life score（Phase 17/18 六维）：**Specificity 4, Causality 3, Character continuity 2, Relationship continuity 2, Historical texture 4, Dramatic shape 2 = 17/30**。与 Phase 18 相同。新内容抬高上限，不抬高 median life。

## 8. Verdict

**Phase 19 是工具成功、转化弱；只有在内容库层面才是真正的 collision phase。** 最强 Kernel 真的需要两个 State；Cross-Pack Map、Co-occurrence、Story Shape、Existing-person cohort 都是真工具。但自然游玩大多执行 entry bridge 和 tick：0.14% 主 focal share、154 个新事件里 10 个消费新 State、3 个 focal、2 个死 State、elder 21/23 + mixed 39/41 来自一个无 State 问卷。

报告可以合法声称：4 Pack、8 State、87 Kernel；76 个严格双 State Kernel；验证与受控执行；工具；odd-jobs tick 重复下降；attachment churn 下降；existing-person cohort；若干强场景；mean repeatRate 0.2104。  
不能声称：78/86；12% focal gate；family-war/luck-craft/elder archive 是 player-facing；8 个 State 都可 reach；custody/inheritance 重复已修；cross-pack weighting 改善了 focal；repeatRate 低于 0.20；partner slot machine 已修。还应把 86/87 与 2,059/2,060 的旧草稿统一。

## 9. 五个优先修订

1. **Gate/de-duplicate elder bridge**：`question-arrives` 要求 archive/witness/political-suspect；cooldown 按 kernel/family ID 而非 composed scene ID；不要用新 state 替换 active `eh19-late-testimony`。这会直接移除 elder 21/23 与 mixed 39/41 的重复。
2. **让 family-war 的中心 State 可达且有后果**：确保 `evacuation-list`/`widow-crossing`/`grief-address` 创建 `fw19-separated-household`；加两个消费它的 follow-up；gate/rewrite `borrowed-goat`；至少一条 focal 路径。当前最频繁场景是最不 collision-dependent 的。
3. **持久化 power-love 后果**：`alibi` 应创建分居/房产 state 或 `relation_end`，不只是 cash −3；`public-ally` 应在 cost/loyalty 上 transition；`protection-offer` 的 leverage 应进入后续。Prose 已经做了，机制不该擦掉。
4. **重平衡分布与观察窗口**：加 60+ 起始或 60 年主 seed；给 luck-craft/family-war focal entry；state-lane bonus 偏向新 State consumer 与低频 pair，而不是旧高频 pair。不要把 existing-person cohort 当 player-facing 分布。
5. **去重结构家族**：family-war custody 从 4–5 拍压到 2；elder inherited-cause 从 10 压到 5；重写 `old-comrade-photo`/`photo-face`、`lc19-elder.workshop-mascot`/`workshop.mascot`、`inlaws-claim`/`other-family-claim`。Story Shape v2 当前对四个新 Pack 几乎 1:1 shape，不是 novelty 证据。

## 10. Main Agent 的修订响应

- **已执行（critic 后）**：给 `eh19-bridge.question-arrives` / `first-question` / `family-promise` 加 `notHasState`，防止新问卷替换 active `eh19-late-testimony`/`eh19-inherited-cause`。Elder cohort 的 `eh19` 事件从 23 降到 18、focal 从 2 降到 1；mixed 从 41 降到 32、focal 从 10 降到 5，但 `eh19-inherited-cause` 首次出现 1 次。这是“减少重置、牺牲数量”的修订，不是分数提升。
- **已执行（critic 前）**：family-war 第一稿 84 个 intra-pack top pairs → 第二稿重写 12 个 Kernel，0 个 ≥0.20；power/luck/elder 各加 2 个 bridge；elder 加 1 个无 State 问卷 entry；odd-jobs entry cap + 24 月 tick + 2 变体。
- **未执行**：family-war 中心 State 的 focal 后果、power-love 分居/房产持久化、60+ 主 seed、story-shape 粗粒度 premise signature、custody/inheritance 结构压缩。这些保留为 Phase 20 的内容/机制修订，不在本报告冒充已修。
- 报告已把 76/87、87 Kernel、2,060 总数、2,029 shapes 统一；不再使用旧的 78/86 或 2,059。
