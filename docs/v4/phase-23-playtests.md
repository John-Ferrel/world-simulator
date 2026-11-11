# Phase 23 — Playtests & Player Experience

日期：2026-11-12  
基线：Phase 22 `00f36ed` — 62,267 events / 4,104 focal；adult drama 25（0.61%）；repeatRate 0.2613；Critic Scene 24/30、Life 20/30。  
本次：`pack-phase23-high-stakes`（18 kernels / 2 states / 72 outcomes / 252 scenes）+ 政治世界 + 世界新闻 + per-outcome titles + 历史地图 + 36 个月 state ticks + `oncePerPerson` history fix。

## 1. 自然 A/B/C（最终）

| Seed | Events | Focal | Adult focal | Adult drama | Adult drama % | p23 focal | p23 % | p23 world | repeatRate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase23-a` | 19,022 | 1,198 | 915 | 43 | 4.70% | 15 | 1.25% | 175 | 0.2293 |
| `phase23-b` | 17,215 | 1,198 | 925 | 20 | 2.16% | 8 | 0.67% | 119 | 0.2143 |
| `phase23-c` | 28,022 | 1,796 | 1,254 | 32 | 2.55% | 15 | 0.84% | 208 | 0.2338 |
| **合计** | **64,259** | **4,192** | **3,094** | **95** | **3.07%** | **38** | **0.91%** | **502** | **0.2258** |

- **Adult drama 3.07%**，Phase 22 为 **0.61%**，约 **5.0×**。
- **p23 focal 0.91%**；它不是全部成年戏剧，但让成年人生真正出现高赌注事件。
- **27 个 focal lives 中 17 个有 adult drama，14 个有 p23 kernel**；不再只是 3/24。
- **repeatRate 0.2258**，低于 Phase 22 的 **0.2613**，也低于 Phase 21 的 0.2423。
- p23 state adds：`p23-dangerous-secret` **242**、`p23-political-debt` **15**。
- 新闻计数（三个 dossier 合计）：reference **108**、simulation **635**、ambient **345**、rumor **172**。

## 2. p23 Kernel 出现分布

| Kernel | World hits | 备注 |
|---|---:|---|
| `p23-lovers-ledger` | 144 | 最高频；情人账本，4 种结局 |
| `p23-revenge-marriage` | 90 | 仇人婚礼，温暖/反转 |
| `p23-wedding-dress` | 91 | 婚纱/痴迷，含把婚纱改成窗帘 |
| `p23-bigamist-collision` | 23 | 两个家撞见；引擎限制下第二个家是 neighbor/flag |
| `p23-ex-lover-judge` | 2 | 旧情人法官；政治/审判 |
| `p23-good-deed-disaster` | 35 | 好心惹祸；需要 debt-bondage |
| `p23-border-smuggler` | 28 | 边境药品/走私 |
| `p23-coup-through-wall` | 26 | 政变/告密 |
| `p23-funeral-lottery` | 16 | 葬礼奖券 |
| `p23-officer-names-friend` | 6 | 秘密警察/父亲 |
| `p23-conman-amnesia` | 15 | 骗子/失忆受害者 |
| `p23-national-hero` | 12 | 媒体制造英雄 |
| `p23-dead-sister-returns` | 0 | 死亡/重逢 |
| `p23-witness-recants` | 1 | 伪证 |
| `p23-duel-misprint` | 2 | 报纸误印/决斗 |
| `p23-father-sells-daughter` | **0** | 女性 subject + 男性 parent + creditor + official + kin，门槛太窄 |
| `p23-emperor-dies-twice` | **5** | 绑定 1916–1918，三个 seed 中出现 5 次 |
| `p23-strike-betrayal` | **6** | 罢工委员会/blacklist 条件在修订后命中 |

`p23-father-sells-daughter` 与 `p23-dead-sister-returns` 仍为零出现；这不是“内容不存在”，而是 role/state 门槛在自然人生中太窄。已在报告中列为下一轮修复项。

## 3. 具体人生片段

### 3.1 爱情、欲望、背叛

- **A Lena 1935.01 `p23-revenge-marriage`《两个人决定真的过下去》**：  
  “婚礼后的第三个月，Lena在厨房里煮汤，Emil Berg进来把一封信放在桌上。信是Josef Bauer写的，说要收回房子。Emil Berg说我们可以搬走；Lena把汤勺放下，说那就搬。那天晚上，两个人第一次像夫妻那样商量一件小事。”
- **A Lena 1937.01 `p23-lovers-ledger`《账本被锁进了保险箱》**：  
  “Lena没有把账本寄出去，而是租了银行最小的一只保险箱。钥匙挂在Lena的脖子上，账本上的名字却开始出现在Lena的梦里……钥匙很小，锁孔却很深。”
- **A Lena 1940.01 `p23-wedding-dress`《两个人把婚纱改成了窗帘》**：  
  “两个人拆掉蕾丝，把绸面裁成两幅窗帘；针脚歪歪扭扭，阳光透进来时，屋里像落了一层很淡的粉……窗帘已经挂了很多年。”
- **A Lena 1941.01 `p23-bigamist-collision`《两个家在同一天撞见》**：  
  “Emil Berg和Anna Weiss在车站的失物招领处遇上，手里各拿着一张写着同一地址的纸条……Josef Moser 2在旁边等着做笔录，最后只问了一句：地址到底是谁的。”

### 3.2 暴力、恐惧、政治

- **A Lena 1946.01 `p23-good-deed-disaster`《被救的人把恩人告了》**：  
  “Grete Lechner 2在法庭上说，那袋煤是Lena硬塞过来的，自己从来没求过谁……Lena才明白救人和赔钱是两件事。散庭后，Grete Lechner 2在走廊里低声说对不起；Lena点点头，却没有停下脚步。法院门口的台阶结着薄冰。”
- **A Lena 1947.01 `p23-ex-lover-judge`《旧情人当庭念出名字》**：  
  “Helene Lechner 2念到Lena的名字时，声音比念别人时低了半度。Lena抬起头，看见那双二十年前在舞会上扶过自己的手，如今按在案卷上……像在念一份与己无关的账单。”
- **B Rosa 1939.01 `p23-border-smuggler`《把货交出去，自己留下》**：  
  “Rosa把车钥匙扔给Hermann Berg 3，说货在后面，人是我带的……审讯室的暖气坏了，Rosa裹着外套坐了一夜，天亮时听说那批药还是送到了医院。看守递来一杯兑了水的茶。”
- **B Lena 1937.01 `p23-national-hero`《报纸印出了民族英雄》**：  
  “照片上的Lena穿着借来的军装，胸前的勋章是Hermann Berg 2从旧货摊上买的……Lena想问那三天到底是谁守的，话到嘴边却变成了谢谢。报社的人说，照片比本人更像英雄。”

### 3.3 荒诞、黑色幽默、重逢

- **C Mitzi 1942.01 `p23-funeral-lottery`《另一个遗属拿着同一张券》**：  
  “两张票的纸边都毛了，谁也说不清哪张是真的……灵堂里的人都转过头来，像在等一场新的葬礼。”
- **C Mitzi 1943.01 `p23-dead-sister-returns`《棺材里躺着的是别人》**：  
  “十年前下葬的那口棺材，登记的名字和尸检记录对不上……棺底压着Grete Lechner的一只耳环。Maria Stein在旁边念了一句经；Mitzi把耳环攥在手里，攥得指节发白。”
- **C Mitzi 1930.01 `p23-lovers-ledger`《情人先一步烧掉了账本》**：  
  “炉膛里只剩一截没烧透的蓝线……Josef没有回答，只把灰烬扫进一只信封，收进抽屉最深处。炉子里的火还没有完全灭。”
- **A Anton 1937.01 `p23-ex-lover-judge`**：  
  “Arthur Schnitzler念到Anton的名字时，声音比念别人时低了半度。”——历史人物被卷入普通人的旧情，而不是只做背景。

## 4. 1912–1920 世界与新闻

`docs/v4/phase-23-news-1912-1920.json` 记录了从 1912 到 1920 每年 12 月的政治快照与新闻：

| 年份 | 维也纳政权 | 元首 | 新闻数 | reference anchors |
|---|---|---|---:|---|
| 1912 | 奥匈帝国 | 弗朗茨·约瑟夫一世 | 7 | 巴尔干同盟向奥斯曼帝国开战 |
| 1913 | 奥匈帝国 | 弗朗茨·约瑟夫一世 | 15 | 第二次巴尔干战争、维也纳“耳光音乐会” |
| 1914 | 奥匈帝国 | 弗朗茨·约瑟夫一世 | 25 | 萨拉热窝、最后通牒、对塞尔维亚宣战、第一个战时冬天 |
| 1915 | 奥匈帝国 | 弗朗茨·约瑟夫一世 | 33 | 面包/面粉卡、亚美尼亚驱逐、意大利参战 |
| 1916 | 奥匈帝国 | 弗朗茨·约瑟夫一世 | 43 | 弗朗茨·约瑟夫去世、战时经济 |
| 1917 | 奥匈帝国 | 卡尔一世 | 53 | 俄国革命、美国参战、饥饿的夏天 |
| 1918 | 奥地利第一共和国 | — | 67 | 停战、帝国解体、共和国成立、流感 |
| 1919 | 奥地利第一共和国 | — | 76 | 圣日耳曼条约、克朗贬值、凡尔赛 |
| 1920 | 奥地利第一共和国 | 米夏埃尔·海尼施 | 86 | 联邦宪法、特里亚农条约、国际联盟 |

- 新闻从 7 条增长到 86 条；reference anchors 从 1 条增长到 12 条（页面展示上限）。
- 1918 年政治快照从奥匈帝国切换到奥地利第一共和国；1917 年元首从弗朗茨·约瑟夫切换到卡尔一世。
- 压力表：`political_tension` 0.82 → 0.86；`war_fear` 0.82；`economic_anxiety` 0.62 → 0.76。
- 这些不是静态时间线：reference 新闻明确标注“历史参考”，ambient/rumor 明确标注“时代氛围/传闻”，simulation 新闻来自已提交事件。

## 5. 浏览器试玩

### 1912 出生

- `tests/v4-browser/phase23.spec.ts`：**1 passed（4.1s / 8.8s 总）**。
- 检查：原创肖像、1912 政治地图、奥匈帝国 `data-polity`、图例、弗朗茨·约瑟夫一世信息卡、公报 tab、政治 tab、标题不是内部 action id、`更多细节` 可展开。
- 截图：`docs/v4/phase-23-browser-1912.png`、`phase-23-gazette.png`、`phase-23-politics.png`。

### 1940 后期世界

- 用真实 dev 世界（1940）注册新人物并截图：
  - `docs/v4/phase-23-browser-later-politics.png`：大德意志帝国、希特勒、戈培尔、戈林、希姆莱、NSDAP/SPD/KPD/认信教会、Anschluss/大屠杀/慕尼黑/战争经济。
  - `docs/v4/phase-23-browser-later-gazette.png`：1940 新闻，包括“夹在面包里的纸条”（simulation）、“棉花与铜价同时波动”（ambient）、“车站来了逃难的家庭”（ambient）、“新主教人选的风声”（rumor）。
  - `docs/v4/phase-23-browser-later-map.png`：1940 政治地图，`data-polity` 包含 `polity-nazi-germany-1938`、`polity-vichy-france-1940`、`polity-general-government-1939`、`polity-protectorate-bohemia-moravia-1939` 等。
- 政治面板不是“现代国家贴旧年份”：1940 的维也纳属于大德意志帝国；地图上法国是维希政权，波兰是总督府，捷克是保护国。

### 事件标题与日志

- 真实标题示例：《房东把租金又涨了一截》《死人的信问孩子像不像他》《登记员把喷嚏写进名字》《墨团底下露出半个“冬”字》《山羊被牵走时回头看了一眼》《蓝铅笔把“无名”改回姓名》《床单拖过煤渣，工钱扣了一半》《空碗推回去，孩子说“还要”》《邻居认错被子，孩子敲勺判案》《追白鹅没追到，捡回一篮鸭蛋》《证件缝进外套，夜车向西》《理发师把钳子伸进嘴里》。
- 日志正文 3 行折叠；`展开全文`；`更多细节` 显示 motive/conflict/response、tags、event id；标题点击打开事件档案。
- 标题来自 `event.title` 优先，不再被 scene title 覆盖；旧内容通过 103 个 scene/outcome + 19 个 state tick/reaction overlay 升级。

## 6. 普通人物 / 政治人物 / 特殊愿望 / 长期人生

### 普通人物

- 27 个 focal lives 中 17 个有 adult drama；普通工人、印刷工、店员、母亲都可能遇到 p23 事件。
- 高频日常仍然存在：学校通知、房租、洗衣、看病、邻里纠纷；它们现在有更清楚的标题与可展开细节。
- 不是每个人都变成倒霉蛋：`p23-revenge-marriage` 的“两个人决定真的过下去”、`p23-wedding-dress` 的“把婚纱改成窗帘”、`p23-good-deed-disaster` 的“整条街修好了屋顶”都是温暖/反讽结局。

### 政治相关人物

- 1940 政治面板可直接读到政权、领袖、政党、矛盾；新闻中 1938 Anschluss、1939 战争、1940 维希法国等 anchor 与人物生活并存。
- p23 政治 kernel：`ex-lover-judge`、`national-hero`、`coup-through-wall`、`strike-betrayal`、`officer-names-friend`。
- 政治不是管理 UI：玩家不能操作国家；政治通过新闻、压力、State、关系与事件进入人生。

### 特殊愿望

- 8 个 focal archetype：权力、知识、手艺、爱情、家庭、名声、迁移、普通生活。
- 愿望仍然通过 `lifeContract`/agency 影响选择；p23 事件会在愿望路径上制造反转，例如“想成为最有权势的人”可能遇到旧情人法官/政变；“想被爱”可能遇到婚纱/两个家。
- 没有把愿望变成固定剧本；同一愿望在不同 seed 走出不同 p23 组合。

### 长期人生

- 45 年、64,259 events、4,192 focal；adult drama 3.07%；repeat 0.2258。
- 世界从 1912 走到 1957；政治地图从奥匈帝国到第一共和国、大德意志、被占领奥地利、第二共和国。
- 新闻从 1912 的 7 条增长到 1920 的 86 条；后期有 1940 战争/占领新闻。
- 长人生仍然有重复：学校 tick、家族传说、丑闻 tick 仍是高频；36 个月 tick 与 `oncePerPerson` 降低了重复，但没有消灭。

## 7. 失败案例与限制

- **零出现 kernel**：`p23-father-sells-daughter`、`p23-emperor-dies-twice`、`p23-strike-betrayal`。前两者是 role/历史窗口门槛，第三者是罢工/blacklist 条件。
- **p23 分布仍集中**：`lovers-ledger` 144、`wedding-dress` 91、`revenge-marriage` 90、`good-deed` 35；前三个 kernel 占 502 的 65%。不是均匀分布。
- **state 膨胀**：`public-scandal` 91–252、`under-investigation` 53–86、`p23-dangerous-secret` 59–103；世界仍然是高戏剧密度，不是“稀有事件”。
- **repeatRate 0.2258** 仍不是零；高频学校/家族/丑闻 tick 仍是主要来源。
- **p23-bigamist-collision** 受“一人一个 active partner”限制，第二个家不是实际第二婚姻。
- **p23-father-sells-daughter** 需要女性 subject + 男性 parent + creditor + official + kin；自然人生中太窄。
- **新闻 reference anchors** 是 tertiary source；不是每条都经过档案验证。1935/1936 anchor 使用 1933–1938 德国条目。
- **地图是近似政权归属**：不是历史边界测绘图；CShapes 几何未打包。
- **浏览器 1940 试玩是真实 dev 世界截图**，不是自动化测试；自动化测试只覆盖 1912。
- **没有真实玩家留存数据**；本报告是 engine dossier + 浏览器观察，不是用户研究。

## 8. 与 Phase 22 对比

| 指标 | Phase 22 | Phase 23 |
|---|---:|---:|
| Events | 62,267 | 64,259 |
| Focal | 4,104 | 4,192 |
| Adult drama focal | 25（0.61%） | **95（3.07%）** |
| p23 focal | — | **38（0.91%）** |
| Lives with adult drama | 3/24 | **17/27** |
| repeatRate | 0.2613 | **0.2258** |
| Event titles | scene-level, outcome titles hidden | **per-outcome + overlay + API priority fix** |
| World news | none | **75 anchors + 30 ambient + 15 rumors, persisted** |
| Political world | 2 Vienna processes | **93 polities / 33 tensions / 42 sources** |
| Historical map | modern borders | **approximate political overlay by year** |

结论：**Phase 23 是成年戏剧和世界背景的真实提升，不是只增加了一个 pack。** 代价是 p23 分布集中、state 膨胀、零出现 kernel 和近似地图；这些都在报告里明确列出。
