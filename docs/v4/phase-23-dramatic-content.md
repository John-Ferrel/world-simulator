# Phase 23 — Dramatic Content

日期：2026-11-12  
Pack：`packages/v4/content/states/generated/pack-phase23-high-stakes.json`  
设计：`docs/v4/phase-23-design.md`  
标题覆盖：`packages/v4/content/event-title-overrides.ts`、`docs/v4/phase-23-title-overrides.json`

## 1. 规模

| 项 | 实测 |
|---|---:|
| Kernels | **18** |
| States | **2**（`p23-dangerous-secret`、`p23-political-debt`） |
| Outcomes | **72**（每个 kernel 4 个） |
| Adaptive contexts | **97**（11 个 kernel 5 个，7 个 6 个） |
| Checks | **15** |
| Conditional outcomes | **18/18 kernels，28 个 conditional outcomes** |
| Compiled scenes | **252** |
| 年龄 | 16–75（stage adulthood 实际 18+） |
| Weight | 2.2–3.1 |
| baseRate | 0.16–0.27 |
| Cooldown | 5–7 年 |
| 每个 outcome 的标题 | **72/72** |

## 2. 两个 State

### `p23-dangerous-secret`

参数：`exposure`、`leverage`、`bodies`、`loyalty`。  
含义：一个会伤害人的秘密；曝光、筹码、牵连人数、忠诚。  
Tick：36 个月；2 个 reactions（证人开口、忠诚沉默）。  
Creation：16 个 kernel；external consumer：`p23-father-sells-daughter`。

### `p23-political-debt`

参数：`favor`、`threat`、`visibility`、`conscience`。  
含义：政治恩情/债务；人情、威胁、可见度、良心。  
Tick：36 个月；2 个 reactions（恩情被兑现、清洗抬高价格）。  
Creation：5 个 kernel；external consumer：`p23-witness-recants`。

## 3. 18 个 Kernel

### 爱情、欲望、嫉妒、痴迷、背叛

- `p23-lovers-ledger`《情人的账本》——账本被寄到对方家里 / 锁进保险箱 / 情人先烧掉 / 两个人用账本开了间店。
- `p23-wedding-dress`《寄到门口的婚纱》——尺寸一分不差 / 婚纱被穿去别人婚礼 / 裁缝说订裙的人已经死了 / 两个人把婚纱改成窗帘。
- `p23-revenge-marriage`《和仇人家结了亲》——婚礼上仇人成了自家人 / 婚书写了别人的名字 / 仇人退回嫁妆 / 两个人决定真的过下去。
- `p23-bigamist-collision`《两个家在同一天找上门》——两个家撞见 / 两个家都被养了下来 / 第二个家早就知道 / 三个人坐下来分账。

### 暴力、恐惧、犯罪、复仇、痛苦

- `p23-witness-recants`《证人改了口供》——邻居被押上囚车 / 真凶在车站被认出 / 恋人承认自己才是目击者 / 邻居的女儿送来一把钥匙。
- `p23-officer-names-friend`《名单上的朋友》——朋友在审讯室签了字 / 孩子自己走进警察局 / 名单上多了一个假名字 / 朋友替人养了三天孩子。
- `p23-border-smuggler`《边境线上的箱子》——哨兵放走整辆车 / 箱子里是孩子的药 / 同伙在雪地里开枪 / 把货交出去，自己留下。
- `p23-duel-misprint`《报纸印错了一个名字》——两个人在黎明开枪 / 决斗取消 / 对手认出旧识 / 子弹打中印刷机。

### 财富、权力、政治阴谋、命运逆转

- `p23-ex-lover-judge`《审判席上的旧情人》——旧情人当庭念出名字 / 案卷换成旧情书 / 当庭说出旧名 / 两个人一起烧掉案卷。
- `p23-national-hero`《报纸把一个无名者写成了民族英雄》——报纸印出民族英雄 / 真正的英雄从战俘营回来 / 奖金捐给阵亡者家属 / 借着名声进候选人名单。
- `p23-coup-through-wall`《墙那边在商量政变》——政变提前 / 政变者递来名单 / 那只是一场排演 / 消息卖给两家报社。
- `p23-strike-betrayal`《罢工委员会投了降》——委员会第三天投降 / 工人把票投给新人 / 名单交给警察 / 罢工赢了，组织者被留在门外。

### 荒诞、黑色幽默、极端幸运

- `p23-emperor-dies-twice`《皇帝死了两次》——皇帝死讯卖了两回 / 第二个皇帝从棺材里坐起来 / 真皇帝死了，替身却活了 / 报纸更正了，没人相信。
- `p23-conman-amnesia`《骗子遇见了不记旧账的受害者》——受害者请客 / 把假名当真名 / 警察坐在隔壁桌 / 把钱塞回口袋。
- `p23-funeral-lottery`《葬礼上的奖券》——死人中了头彩 / 奖券是给孤儿院买的 / 另一个遗属拿着同一张券 / 奖金被埋进棺材。

### 家庭秘密、代际悲剧、重逢

- `p23-father-sells-daughter`《父亲在借据上按了手印》——父亲把女儿卖给债主 / 女儿偷出借据烧了 / 家里拿出藏了十年的嫁妆 / 债主认出自己的笔迹。
- `p23-dead-sister-returns`《死了十年的姐姐回来了》——姐姐站在门口，鞋上全是土 / 姐姐带回别人的名字 / 棺材里躺着的是别人 / 两个人决定不再问这些年。
- `p23-good-deed-disaster`《好心惹出的祸》——一袋煤引发一场火 / 被救的人把恩人告了 / 整条街修好了屋顶 / 学会了先问再帮。

## 4. 机制适配

- 18/18 使用至少一个现有 State：`fame` 9、`public-scandal` 15、`known-affair` 5、`office-patronage` 6、`debt-bondage` 6、`raising-child` 3、`grief` 6、`failed-apprentice` 3、`political-suspect` 5、`under-investigation` 12、`blacklisted` 3、`cursed-by-wish` 2、`df18-borrowed-luck` 2。
- 18/18 使用 `hasState` / `hasRelation` / `relationHistory` / `attribute` / `history`，不是只看现金。
- Pressure 使用：`political_tension` 6、`war_fear` 6、`persecution_pressure` 3、`economic_anxiety` 7。Phase 23 新闻/政治世界写入这些键。
- `p23-emperor-dies-twice` 绑定 1916–1918，让“皇帝死了两次”发生在真实的帝国黄昏。
- 15 个 kernel 有 check；3 个（`witness-recants`、`dead-sister-returns`、`bigamist-collision`）用加权 conditional outcomes。
- 15 个 kernel 标记 `oncePerPerson`，避免“同一个秘密曝光五次”。`good-deed-disaster` 降权到 2.2 / baseRate 0.16 / cooldown 7，避免它成为新的 wallpaper。

## 5. Event Titles

### 架构

- `SceneOutcome.title?: string`、`KernelOutcome.title?: string`。
- Composer 复制 outcome title。
- Engine 提交 `EventFact.title` 时使用 `eventTitleFor(action, sceneTitle, outcomeTitle)`。
- `packages/v4/event-titles.ts` 优先级：exact action overlay → baseScene/outcome overlay → outcome title → scene title → fallback。
- API `projectEvent` 改为优先 `event.title`，不再被 `sceneTitles` 覆盖。
- 旧内容通过 `event-title-overrides.ts` 升级：**103 个 scene/outcome + 19 个 state tick/reaction** 标题。
- 日志：标题用 serif/加粗；正文 3 行折叠；`展开全文`；`更多细节` 显示 motive/conflict/response、tags、event id；标题点击打开事件档案。

### 真实标题例子

- 《房东把租金又涨了一截》
- 《死人的信问孩子像不像他》
- 《登记员把喷嚏写进名字》
- 《墨团底下露出半个“冬”字》
- 《山羊被牵走时回头看了一眼》
- 《蓝铅笔把“无名”改回姓名》
- 《床单拖过煤渣，工钱扣了一半》
- 《空碗推回去，孩子说“还要”》
- 《邻居认错被子，孩子敲勺判案》
- 《追白鹅没追到，捡回一篮鸭蛋》
- 《证件缝进外套，夜车向西》
- 《理发师把钳子伸进嘴里》
- 《新娘在圣坛前念出借据》
- 《继承的房子三年前就卖了》
- 《道歉信被改成了一句问句》
- 《孩子把相册带到了学校》

## 6. 自然出现（Phase 23 首轮）

三个 45 年 seed：

| Seed | Events | Focal | p23 focal | Total drama focal | p23 world | repeatRate |
|---|---:|---:|---:|---:|---:|---:|
| `phase23-a` | 19,022 | 1,198 | 15 | 66 | 175 | 0.2293 |
| `phase23-b` | 17,215 | 1,198 | 8 | 38 | 119 | 0.2143 |
| `phase23-c` | 28,022 | 1,796 | 15 | 66 | 208 | 0.2338 |
| **合计** | **64,259** | **4,192** | **38** | **170** | **502** | **0.2258** |

- Adult drama focal **95 / 3,094 = 3.07%**，Phase 22 adult 为 0.61%。
- 27 个 focal lives 中 **17 个**有 adult drama，**14 个**有 p23 kernel。
- p23 单独 **38 / 4,192 = 0.91% focal**；它不是全部成年戏剧，但把成年戏剧从“几乎为零”推到“多数人生可遇到”。
- `p23-lovers-ledger` 144、`p23-wedding-dress` 91、`p23-revenge-marriage` 90 是头部；前三个占 502 的 65%。
- `p23-father-sells-daughter` 与 `p23-dead-sister-returns` 仍为零出现；`p23-emperor-dies-twice` 5、`p23-strike-betrayal` 6，修订后已可达。
- `p23-good-deed-disaster` 首轮过强（26/21/24 world），已降权、加 `oncePerPerson` 与 debt-bondage 条件。

## 7. 限制

- 72 个 outcome 都有标题，但旧库 2,000+ kernels 没有全部逐条标题；overlay 只覆盖 103 个高频 scene/outcome + 19 个 state tick/reaction。
- `p23-father-sells-daughter` 需要女性 subject + 男性 parent + creditor + official + kin relation；普通人生中可能太窄。
- `p23-dead-sister-returns` 需要 grief + 女性 sibling；`p23-emperor-dies-twice` 绑定 1916–1918；`p23-duel-misprint` 仍是名声/丑闻语境。
- `p23-bigamist-collision` 受引擎“一人一个 active partner”限制，第二个家只能作为 neighbor/flag/state，不是真正的双重婚姻。
- 部分角色是 generic cast（creditor=neighbor、judge=official、second=neighbor），文本可能比 cast 元数据更强。
- 没有 explicit sexual content；暴力是强烈的但不猎奇；大屠杀/迫害内容以严肃方式处理。
- State 参数仍不可视化；玩家看不到 exposure/leverage/bodies/loyalty。
- 没有 LLM 实时生成；内容由作者/编辑/验证流程产出。
