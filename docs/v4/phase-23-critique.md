# Phase 23 — Independent Critique and Revision Response

日期：2026-11-12  
Reviewer：独立 Player Experience / World-Building Critic（不改代码、不改内容）  
Evidence：`phase-15-phase23-a/b/c.json`（修订前）、`phase-23-playtests.json`、`phase-23-news-1912-1920.json`、`phase-23-*.md`、6 张浏览器截图、`pack-phase23-high-stakes.json`、`packages/v4/political-world/`、`packages/v4/world-news.ts`、`apps/web/src/main.tsx`、`WorldMap.tsx`。  
Baseline：Phase 22 Critic **Scene 24/30、Life 20/30**；adult drama 0.61%；repeatRate 0.2613。

> 以下为独立 Critic 对**修订前** dossier 的判断；Main Agent 的修订响应单独记录，不把修订后的内容重新冒充为同一轮独立评分。截图已按修订后的日期过滤重新生成；Critic 对 1940.02 的观察属于修订前状态。

## 1. 分数

**Scene 26/30。Life 20/30。**

Phase 22 是 24/30、20/30。Phase 23 在**页面级文字**上更好：标题、具体意象、可扫读性都提升；但**被生活出来的世界**没有同步提升。Scene +2，Life 0。

## 2. Event Readability

Critic 认为标题系统是真实改进：

- 《死人的信问孩子像不像他》
- 《墨团底下露出半个“冬”字》
- 《山羊被牵走时回头看了一眼》
- 《蓝铅笔把“无名”改回姓名》
- 《床单拖过煤渣，工钱扣了一半》
- 《空碗推回去，孩子说“还要”》
- 《理发师把钳子伸进嘴里》
- 《新娘在圣坛前念出借据》
- 《两个人把婚纱改成了窗帘》
- 《棺材里躺着的是别人》

标题具体、多样、通常描述 outcome 而不是类别；3 行折叠 + 标题打开档案确实改善浏览。

批评：

- 高频 state tick 仍是《危险的秘密》《被看见的日常》《无法登记的伴侣》《世界消息》这类泛化标题；129/4,354 focal events 没有存储 `title`，UI fallback 只能给通用标签。
- 事件档案暴露 `p23-ex-lover-judge / ctx-vienna-authoritarian-1934 / milieu-tenement` 这类机制字符串，以及 `love`、`bigamy`、`high_drama` 等英文 tag。
- “更多细节”大多是假细节：**1,825/2,677 traces 使用同一句 motive**“身体已经吃不消，先减少外出和重活”；只有 10 条有 conflict/response。打开婚礼/重婚/审判的细节，看到的却是健康借口。
- 中英混排仍存在（Bauer-Wohnung、Buchdrucker (Handsetzer) 等）。

## 3. Drama Quality / Density

3.43% 在报告口径下是真实的，但不是 Phase 23 单独的效果：

- 114 个 adult drama 中，**41 是 p23**，**55 是 p22**，**18 是 p21**；只有 36% 是新 Phase 23 内容。
- p23 focal share **0.94%**；15/26 lives 有 adult drama，但 **11/26 仍然为零**。
- “5.6×”比较的是 p21/p22/p23 全部 adult events，不是新 pack。

Critic 认可的好场景：

- A Lena 1937-01 `p23-lovers-ledger/the-ledger-in-the-safe`：“钥匙很小，锁孔却很深。”
- A Lena 1940-01 `p23-wedding-dress/the-curtains-from-the-dress`：“阳光透进来时，屋里像落了一层很淡的粉。”
- A Lena 1946-01 `p23-good-deed-disaster/the-rescued-sue-her`：“Lena才明白救人和赔钱是两件事……法院门口的台阶结着薄冰。”
- A Lena 1947-01 `p23-ex-lover-judge/the-judge-reads-her-name`：“声音比念别人时低了半度……像在念一份与己无关的账单。”
- C Mitzi 1943-01 `p23-dead-sister-returns/the-wrong-body-in-the-coffin`：“棺底压着Grete Lechner的一只耳环……攥得指节发白。”
- C Mitzi 1942-01 `p23-funeral-lottery/another-widow-has-the-same-ticket`：“灵堂里的人都转过头来，像在等一场新的葬礼。”
- A Anton 1940-01 `p22-goat-heir/goat-sold-at-auction`：“买主把它牵走时，它回头看了一眼那栋楼。”
- A Anton 1952-01 `p22-enemy-wedding/the-bride-names-the-debt`：“散场后，借据被钉在教堂门口的告示板上。”
- B Rosa 1939-01 `p23-border-smuggler/he-gives-up-the-cargo`：“天亮时听说那批药还是送到了医院。看守递来一杯兑了水的茶。”

问题：

- **41 个 p23 focal 全部发生在 1 月**，像年度内容注入，不像后果。
- Focal 分布更集中：`ex-lover-judge` 9/41、`lovers-ledger` 6、`revenge-marriage` 6、`bigamist` 4；**25/41（61%）来自四个 kernel**。Outcome 级更糟：`the-ledger-burns-first` 5/6、`the-two-wives-meet-at-the-station` 4/4、`the-judge-reads-her-name` 4/9；只有 20/72 outcomes 出现在 focal 样本。
- `p23-bigamist-collision` 需要 partner，但 `second` 是 neighbor；没有第二个 household。引擎只允许一个 active partner。
- `p23-revenge-marriage` 需要 partner，不是 rival/wedding；文本直接说“婚礼后的第三个月”，但婚礼没有发生。
- `p23-dead-sister-returns` 需要 grief，不是 dead sibling；C Mitzi 的 history refs 是 remittance/grief，不是 death；sibling 是活着的 child-cast 人物。
- `p23-ex-lover-judge` 需要 under-investigation，不是 old lover；judge 是 generic official。
- State effects 与 prose 矛盾：`the-ledger-in-the-safe` 添加 `known-affair`（exposure 70）并声称 affair became public，文本却说 Lena 谎称烧了；`the-curtains-from-the-dress` 给温暖窗帘场景添加 `p23-dangerous-secret`；`they-decide-to-stay-married` 也添加 dangerous secret。
- 三个 kernel 死掉：`p23-father-sells-daughter`、`p23-emperor-dies-twice`、`p23-strike-betrayal`。`emperor-dies-twice` 对主 cohort 结构性不可达：1916–1918 时 1912 出生的人只有 4–6 岁，而 kernel 要求 18–75。

## 4. Political World

1912 在**年粒度**上像真实政治世界：弗朗茨·约瑟夫、施蒂尔克、贝希托尔德、SDAP、基督教社会党、德意志民族联盟、波兰俱乐部、捷克民族社会党，以及二元制、民族、普选、巴尔干、工人运动、反犹主义。

1940 更黑暗、更具体：希特勒、戈培尔、戈林、希姆莱；NSDAP 执政，SPD/KPD 被禁，认信教会地下；总体战 100%、迫害与大屠杀 100%、维也纳纳粹化 94%。地图显示大德意志、总督府、保护国、维希法国。

但 chronology 不可信：

- 1940-01 快照包含 `polity-vichy-france-1940`（`from: 1940`），维希 1940 年 6 月才成立；1940 截图已经显示它。
- “总体战”描述（`data-1938.ts`）说战争扩展到“苏联与太平洋”——1941 事件——却出现在 1940-01 面板。
- 1912 也是年粒度：大正（1912）与袁世凯（1912）在 1 月就 active。
- 1991 同时包含 1955 和 1991 政权（`to: 1991` 与 `from: 1991` 都 inclusive）：分裂德国与德国、苏联与俄罗斯联邦并存。

国家级别 overlay 诚实标注近似，作为 atlas 有用，但不能显示加利西亚、特兰西瓦尼亚、伏伊伏丁那、南蒂罗尔、殖民地、前线、营地。UI 用“1940 一月”暗示月精度，数据却是年精度。

政治面板是百科全书，不是故事引擎：领袖/政党/矛盾不可点击到新闻或人物事件；地图 path 只有 hover，没有 click，触屏无法打开其他政权卡片；百分比是静态标签，实际 `world.pressures` 不显示。

## 5. World News

Gazette 视觉上 distinct，provenance badge 清楚。Critic 认可：

- `anchor-1912-10-balkan-war`：“巴尔干同盟向奥斯曼帝国开战……维也纳担心塞尔维亚坐大，帝国南部边境骤然紧张。”
- `anchor-1914-06-sarajevo`：“斐迪南大公夫妇在萨拉热窝遇刺……维也纳的咖啡馆外挤满读号外的人。”
- `anchor-1938-03-anschluss`：“德国军队进入奥地利……欢呼、沉默与突然的暴力同时出现。”
- `anchor-1945-04-vienna-offensive`：“苏军发动维也纳攻势……居民在废墟中寻找水和食物。”
- Ambient：“房租通知贴在楼道口……几户人家凑在楼梯间算账。”
- Rumor：“新主教人选的风声……消息没有正式公布，教堂门口已经有人打听弥撒时间会不会变。”

但 feed 没有报告说的那么“活”：

- `phase-23-news-1912-1920.json` 中 **1912–1920 simulation 每年为 0**；7→86 的增长是 cumulative anchors + deterministic ambient/rumor，不是 simulated events。
- 1950s dossier 可见 80 条中 41 条 simulation；其中 55/123 是“世界消息” births，12 是“历史进程转折”，56 被标为 war。`categoryForEvent` 先检查 `war`，所以 police stop、wedding scandal、war-era birth 都变成“战争/全球”；1940 截图的“夹在面包里的纸条”（警察搜查）被标为“战争·全球”。
- Gazette 显示未来：1912-01 截图有 1912.11/1912.08/1912.06；1940-01 截图第一条是 1940.02。UI 没有按 `date <= world.date` 过滤。
- 直接 personal→world echo 很少：240 条可见 news 中只有 **7 条**引用 focal event（A 0、B 2、C 5）。Gazette 主要是 births、别人的丑闻、anchors、templates，不像同一个世界。

## 6. Integration

真实连接：

1. **1938 Anschluss → personal occupation**：news 说德军进入奥地利；A Lena 1939-01 `hist15-occ.seed-occupation/the-flag-changes` 说“城门口的岗哨换了旗”；1940 政治面板说维也纳属于大德意志，个人日志有配给/空袭地下室。
2. **1945 liberation → personal aftermath**：news 的维也纳攻势与 A Hedwig 1945-01 `vienna-life-1945-liberation/displaced` 在日期与情绪上对齐；但个人事件是 generic seed，不是 linked anchor。

平行案例：

1. **1947 ex-lover trial vs. Marshall Plan/India news**：Lena 的审判是私人法庭剧；gazette 的 1947 是马歇尔计划与印巴，审判完全不提战后重建/去纳粹化/news。
2. **1912 rent notice vs. birth log**：gazette 的房租通知正是 tenement family 该感受的压力，但个人日志是出生+愿望，没有 rent event 引用 news。

p23 政治 kernel 使用 generic states（`political-suspect`、`under-investigation`）和 generic officials；`officer-names-friend` 说“警察”不是 Gestapo；`coup-through-wall` 说“政变”不是具体 1934/1945 阴谋。政治世界不在 scene 里。Pressure bridge 在代码里，但 `world.pressures` 不可见，`Math.max` 让 1945 的迫害压力一直高到 1955。

## 7. Player Judgment

1912：atlas 丰富、gazette 有时代感、首屏好看；但个人日志只有一条出生，gazette future-dated，地图小且暗，颜色难分辨。历史向玩家会点 tab；普通玩家没有理由等。

1940：政治面板是 build 里最好的屏幕——希特勒、NSDAP、被禁政党、100% 战争/迫害、维希/总督府；gazette 有警察搜查、难民、电影院、主教传闻。但个人日志是新生儿 + “出生愿望成形”，打印“强度 0.75，反讽倾向 0.30；这只是机会与注意力，不是结果。”——系统参数进入人生故事。gazette 第一条 1940.02 在 1940-01 世界；政治面板“总体战”知道 1941。1940 屏幕内容更沉浸，chronology 更不可信。

核心 loop 仍被动：30 秒/年，无选择，无 replay/catch-up；p23 从 18 岁开始，前五分钟是童年。截图没有 adult p23 scene in browser；最好的内容只在 dossier 里被证明。Critic 会继续读 dossier，但不会在浏览器里看一小时。

## 8. Literary Quality

15 个代表场景 0–2：

| # | Scene | Score |
|---|---|---:|
| 1 | `vienna-life-birth-letter-from-the-dead/the-letter-is-real` | 2 |
| 2 | `p22-warm-fathers-letter/the-recipe-arrives` | 2 |
| 3 | `p22-comic-name-register/the-clerk-hears-a-sneeze` | 2 |
| 4 | `p22-strange-doctor-prediction/the-doctor-writes-nothing` | 2 |
| 5 | `p23-lovers-ledger/the-ledger-in-the-safe` | 2 |
| 6 | `p23-wedding-dress/the-curtains-from-the-dress` | 2 |
| 7 | `p23-good-deed-disaster/the-rescued-sue-her` | 2 |
| 8 | `p23-ex-lover-judge/the-judge-reads-her-name` | 1 |
| 9 | `p23-bigamist-collision/the-two-wives-meet-at-the-station` | 1 |
| 10 | `p23-dead-sister-returns/the-wrong-body-in-the-coffin` | 2 |
| 11 | `p23-funeral-lottery/another-widow-has-the-same-ticket` | 2 |
| 12 | `p22-goat-heir/goat-sold-at-auction` | 2 |
| 13 | `p22-enemy-wedding/the-bride-names-the-debt` | 2 |
| 14 | `p22-inherited-debt/the-debt-is-the-house` | 1 |
| 15 | `p22-child-matchmaker/the-album-is-shown-at-school` | 1 |

**Scene 26/30**（11 个 2、4 个 1）。六维：Specificity 5、Causality 2、Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 4 = **Life 20/30**。Specificity 比 Phase 22 的 4 高；Causality 从 3 降到 2：p23 的 `causes` 为 0，trace motive 是 boilerplate，states 与 text 矛盾。Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 4。

## 9. Main Agent 修订响应

Critic 读的是修订前 dossier。Main Agent 在最终提交前做了以下修正，并重新跑自然 A/B/C：

### 已修

- **News 未来日期**：`WorldNewsPanel` 按 `date <= world.date` 过滤；API `/api/v4/world` 与 `/api/v4/news` 同样过滤；ambient/rumor 月份 clamp 到当前月。1912-01 截图现在全部是 1912.01。
- **Vichy / Anschluss / 占领月份**：`PoliticalPolity` 增加 `fromMonth` / `toMonth`；`politicalSnapshot` 月感知；维希从 1940-06、Anschluss 从 1938-03、奥地利第一共和国从 1918-11、第二共和国从 1955-05、被占领奥地利从 1945-04。
- **1991 重叠**：`politicalSnapshot` 只保留仍拥有至少一个 ISO 的政权；1955/1991 过渡不再把苏联与俄罗斯、分裂德国与德国同时列出。
- **1941 文本泄漏**：`tension-total-war-1939` 不再在 1940 面板提“苏联与太平洋”。
- **Trace boilerplate**：`buildIncidentTrace` 不再把 `subject.agency.summary` 当作每个事件的 motive；没有 explicit trace 就不显示动机。1,825/2,677 同一句动机的问题被移除。
- **英文 tag**：日志细节把 common tags 映射为中文；机制字符串移入“技术细节”折叠，不再直接暴露。
- **State 与 prose 矛盾**：移除 `the-ledger-in-the-safe` 的 `known-affair`、`the-curtains-from-the-dress` 与 `they-decide-to-stay-married` 的 `p23-dangerous-secret`。
- **Premise gates**：`witness-recants` 需要 `under-investigation`；`revenge-marriage` 需要 `rival`；`ex-lover-judge` 需要 `known-affair`；`dead-sister-returns` 需要 sibling death history；`bigamist-collision` 需要 `known-affair`。
- **News category/scope**：改为 exact tag matching；`postwar` 不再被当成 `war`；births/deaths 默认不进入 simulation news。
- **Map touch**：国家 path 与图例支持 click 固定信息卡；legend 优先显示当前维也纳政权。
- **p23 平衡**：`oncePerPerson` 历史 key 修复（跨年也生效）；state ticks 36 个月；`good-deed` 降权/加 debt 条件；`duel` 加 fame 0.45 + rival；`national-hero` 降权；top 4 集中度下降。

### 未修 / 仍需下一轮

- **p23 focal 仍集中在少数 kernel**；`lovers-ledger`/`revenge-marriage`/`wedding-dress`/`bigamist` 仍占大头。
- **p23 focal 全部 1 月**：engine 的年度调度仍把多数 scene 放在 1 月；没有月级分布。
- **三个 dead kernels**：`father-sells-daughter`、`emperor-dies-twice`、`strike-betrayal` 仍可能零出现；`emperor-dies-twice` 的 1916–1918 窗口与 1912 cohort 年龄冲突。
- **Premises 仍是 asserted**：bigamy 没有第二个 household；revenge marriage 的婚礼没有单独 event；dead sister 的死亡事实不一定被 history 精确匹配；ex-lover judge 的旧情是文本断言。引擎的一人一 partner 限制没有改。
- **Personal→world echo**：没有 `newsRefs` 字段；gazette 关联事件 id 仍只是文本，不能点击打开档案。
- **政治面板不可点击到新闻/事件**；pressures 仍不可视化；`Math.max` 仍让压力单调。
- **地图仍是国家级别近似**；CShapes 几何未打包。
- **1940 浏览器截图仍是 newborn + 系统参数行**；没有 adult p23 browser scene。
- **没有真实玩家留存数据**。

最终数字以 `docs/v4/phase-23-playtests.json` 为准；Critic 的 **Scene 26/30、Life 20/30** 仍是修订前评分，不冒充修订后。修订后自然 A/B/C 为 64,259 events / 4,192 focal；adult drama 95（3.07%）；p23 focal 38（0.91%）；17/27 lives with adult drama；14/27 with p23；repeatRate 0.2258；p23 world 502。

## 10. 结论

Phase 23 是 **presentation + historical texture 的真实进步**：per-outcome titles、可读的 gazette、政治 atlas、若干真正好的场景。它还不是一个“living historical world”：adult drama 增加真实但比 headline 窄；gazette 仍常是 births/别人的丑闻/模板的独立 feed；政治面板是静态百科全书；个人日志很少回声。

可以声称：64,259 events / 4,192 focal；adult drama 95（3.07%，p21/p22/p23 口径）；p23 focal 38（0.91%）；17/27 lives with adult drama；14/27 with p23；repeatRate 0.2258；502 p23 world events；18 kernels / 252 scenes；75 anchors / 30 ambient / 15 rumors；93 polities / 33 tensions / 42 sources / 107 ISO；1912/1940 面板与近似地图；Scene 26/30、Life 20/30。

不能声称：3.07% 全是 Phase 23；多数成年人生有 high-stakes drama（10/27 没有）；18/18 kernels 与 72/72 outcomes 可达；gazette 是 simulation feed（1912–1920 simulation 为 0）；news/politics 因果驱动个人生活（7 条 focal links、压力不可见、政治 kernel 泛化）；地图是历史边界测绘图；五分钟体验已修（1940 截图仍是 newborn + 参数行）。

**Phase 23 是一个更好看的事件模拟器，带 gazette 和 atlas；下一步不是更多内容，而是让世界的时钟、前提和后果变成真的。**
