# Phase 23 — Blood, Desire & History 实施报告

日期：2026-11-12  
基线：Phase 22 `00f36ed` — 117 states / 2,160 kernels / 34 packs；62,267 events / 4,104 focal；adult drama 25（0.61%）；repeatRate 0.2613；Critic Scene 24/30、Life 20/30。  
设计：`docs/v4/phase-23-design.md`  
戏剧内容：`docs/v4/phase-23-dramatic-content.md`  
政治世界：`docs/v4/phase-23-political-world.md`  
历史地理：`docs/v4/phase-23-historical-geography.md`  
世界新闻：`docs/v4/phase-23-world-news.md`  
试玩：`docs/v4/phase-23-playtests.md`  
Critic：`docs/v4/phase-23-critique.md`

## 1. 结论摘要

Phase 23 是 **presentation + historical texture 的真实进步**，不是完成的“living historical world”。

- **事件标题**：`SceneOutcome.title` / `KernelOutcome.title` 进入 runtime；API 不再用 scene title 覆盖 outcome title；日志 3 行折叠、展开全文、细节折叠；122 个旧 scene/outcome + state tick/reaction 标题 overlay。
- **高赌注内容**：`pack-phase23-high-stakes` — 18 kernels / 2 states / 72 outcomes / 97 adaptive contexts / 15 checks / 18 conditional / 252 scenes。爱情、欲望、背叛、暴力、恐惧、政治、荒诞、家庭秘密、重逢。
- **政治世界**：93 polities / 33 tensions / 42 sources / 107 ISO；1912 / 1918 / 1938 / 1945 / 1955 / 1991 快照；领袖、政府、政党、派系、民族矛盾、盟友/对手。
- **历史地图**：现代国家几何 + 历史政权归属叠层；1912 奥匈/德意志/俄罗斯/奥斯曼，1938 大德意志/保护国/总督府，1945 被占领奥地利/德国，1955 第二共和国；明确“近似”，不是测绘图。
- **世界新闻**：75 historical anchors / 30 ambient templates / 15 rumors；`v4_world_news` 持久化；reference / simulation / ambient / rumor 四类 provenance；UI 世界公报 tab。
- **自然 A/B/C**：64,259 events / 4,192 focal；**adult drama 95（3.07%）**，Phase 22 0.61%；p23 focal 38（0.91%）；**17/27 lives with adult drama**，14/27 with p23；**repeatRate 0.2258**（Phase 22 0.2613）。
- **独立 Critic**：Scene **26/30**、Life **20/30**（Phase 22 24/20）。页面文字更好；被生活出来的世界没有同步提升。完整批评与修订响应见 `phase-23-critique.md`。

## 2. 实际交付

### 2.1 Event Presentation

- `packages/v4/domain.ts`：`SceneOutcome.title?: string`。
- `packages/v4/composition/types.ts`：`KernelOutcome.title?: string`、`PlotKernel.oncePerPerson?: boolean`。
- `packages/v4/composition/composer.ts`：复制 outcome title / oncePerPerson。
- `packages/v4/event-titles.ts`：exact action → baseScene/outcome → outcome title → scene title → fallback。
- `packages/v4/content/event-title-overrides.ts`：**122** 个旧内容标题 + **9** 个 fallback。
- `packages/v4/engine.ts`：scene/state tick/state reaction 提交 `EventFact.title`；`resolvedSceneHistory` 同时记录 compiled id 与 base id，`oncePerPerson`/cooldown 跨年生效；trace 不再用 `agency.summary` 冒充 motive。
- `apps/v4-api/index.ts`：`projectEvent` 优先 `event.title`；标题 overlay 对旧事件也生效。
- `apps/web/src/main.tsx`：标题 serif/加粗；正文 3 行 clamp；`展开全文`；`更多细节` 显示 motive/conflict/response、中文 tag、event id；机制字符串进入“技术细节”折叠。

真实标题例子：

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

### 2.2 High-Stakes Drama

`pack-phase23-high-stakes`：

| 项 | 数值 |
|---|---:|
| Kernels | 18 |
| States | 2（`p23-dangerous-secret` / `p23-political-debt`） |
| Outcomes | 72（每个 kernel 4 个） |
| Adaptive contexts | 97 |
| Checks | 15 |
| Conditional outcomes | 18/18 kernels，28 个 |
| Compiled scenes | 252 |
| 每个 outcome 标题 | 72/72 |
| Weight | 1.5–3.1 |
| baseRate | 0.05–0.27 |
| Cooldown | 5–7 年 |

强场景：

- `p23-lovers-ledger`：账本被锁进保险箱，“钥匙很小，锁孔却很深。”
- `p23-wedding-dress`：婚纱改成窗帘，“阳光透进来时，屋里像落了一层很淡的粉。”
- `p23-good-deed-disaster`：一袋煤引发火灾，被救的人把恩人告上法庭。
- `p23-ex-lover-judge`：旧情人当庭念出名字，“像在念一份与己无关的账单。”
- `p23-dead-sister-returns`：棺材里躺着别人，棺底压着一只耳环。
- `p23-funeral-lottery`：另一个遗属拿着同一张奖券，“像在等一场新的葬礼。”
- `p23-border-smuggler`：把药送到医院，自己在审讯室坐一夜。
- `p23-national-hero`：报纸把无名者写成民族英雄，“照片比本人更像英雄。”
- `p23-emperor-dies-twice`：1916–1918 的皇帝死讯与替身。
- `p23-bigamist-collision`：两个家在同一天撞见（引擎限制下第二个家不是实际婚姻）。

State / pressure 使用：

- 18/18 使用现有 State：fame、public-scandal、known-affair、office-patronage、debt-bondage、raising-child、grief、failed-apprentice、political-suspect、under-investigation、blacklisted、cursed-by-wish、df18-borrowed-luck。
- 18/18 使用 hasState/hasRelation/relationHistory/attribute/history。
- `political_tension` 6、`war_fear` 6、`persecution_pressure` 3、`economic_anxiety` 7。

### 2.3 Political World

`packages/v4/political-world/`：

- `types.ts`、`sources.ts`、`data-1912/1918/1938/1945/1955/1991.ts`、`index.ts`。
- **93 polities / 33 tensions / 42 sources / 107 ISO**。
- 1912 快照 14 政权；1918 13/17（1 月/12 月）；1938 17/16；1945 17/18；1955 18；1991 14。
- 月粒度：Vichy 1940-06、Anschluss 1938-03、奥地利第一共和国 1918-11、第二共和国 1955-05、被占领奥地利 1945-04。
- 1991 过渡去重：只保留仍拥有至少一个 ISO 的政权；苏联/俄罗斯、分裂德国/德国不再同时列出。
- `Organization` / `Position`：新增基督教社会党、德意志民族联盟、k.k. Ministerium des Innern；皇帝、首相、党魁职位。
- API：`/api/v4/world` 返回 `politicalWorld`；`/api/v4/political-world?year=` 可查询。

### 2.4 Historical Map

- `WorldMap` 接收 `politicalWorld` / `year`。
- 现代 Natural Earth 几何按政权颜色着色；`data-polity` 属性；hover/click 信息卡；图例优先显示维也纳所属政权。
- 1912 奥匈/德意志/俄罗斯/奥斯曼/英法/意大利/塞尔维亚/保加利亚/罗马尼亚/希腊/美国/日本/中国。
- 1938 大德意志/保护国/斯洛伐克/总督府；1940 维希法国；1945 被占领奥地利/德国；1955 第二共和国/分裂德国。
- 明确标注“近似政权归属，不是测绘图”。

### 2.5 World News

- `packages/v4/world-news.ts`：`ensureWorldNews`、`recentWorldNews`、四类 provenance、pressure 桥。
- `infra/migrations/009_v4_world_news.sql`：`v4_world_news` 表。
- `packages/v4/store.ts`：seed/save/load/recentV4News。
- `packages/v4/content/world-news/anchors.json`：**75** anchors，1912-10 至 1955-11。
- `templates.json`：**30** ambient + **15** rumors。
- UI：世界公报 tab，全部/全球/地区/本地过滤，badge，展开，来源，关联事件 id；按 `date <= world.date` 过滤。
- 1912–1920 新闻：7 → 86 条；reference anchors 1 → 12（展示上限）；政治从奥匈帝国到奥地利第一共和国。
- 新闻计数（三个 dossier 合计）：reference **108**、simulation **635**、ambient **345**、rumor **172**。

### 2.6 其他修复

- `oncePerPerson` / cooldown 历史 key 跨年修复；state ticks 36 个月。
- `p23` pack 平衡：`good-deed` 降权 + debt 条件；`duel` fame 0.45 + rival；`national-hero` 降权；`lovers-ledger`/`wedding-dress`/`revenge` 降权。
- `p23` 语义一致性：移除温暖 outcome 的 `p23-dangerous-secret`；移除隐藏账本的 `known-affair`；加 witness/under-investigation、revenge/rival、ex-lover/known-affair、dead-sister/history、bigamy/known-affair 门槛。
- 新闻 category/scope 改为 exact tag matching；`postwar` 不再被当成 `war`；births/deaths 默认不进入 simulation news。
- 地图 click 固定信息卡；legend 当前政权优先。
- 日志 tag 中文化；机制字符串折叠。

## 3. 自然 A/B/C

| Seed | Events | Focal | Adult focal | Adult drama | Adult % | p23 focal | p23 % | p23 world | repeat |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase23-a` | 19,022 | 1,198 | 915 | 43 | 4.70% | 15 | 1.25% | 175 | 0.2293 |
| `phase23-b` | 17,215 | 1,198 | 925 | 20 | 2.16% | 8 | 0.67% | 119 | 0.2143 |
| `phase23-c` | 28,022 | 1,796 | 1,254 | 32 | 2.55% | 15 | 0.84% | 208 | 0.2338 |
| **合计** | **64,259** | **4,192** | **3,094** | **95** | **3.07%** | **38** | **0.91%** | **502** | **0.2258** |

- Adult drama 从 Phase 22 的 0.61% 升到 **3.07%**（约 5×）。
- p23 focal 0.91%；17/27 lives with adult drama，14/27 with p23。
- p23 world 502；state adds `p23-dangerous-secret` 242、`p23-political-debt` 15。
- 头部 kernel：lovers-ledger 144、wedding-dress 91、revenge-marriage 90、good-deed 35、border 28、coup 26、bigamist 23。
- 零出现：`p23-father-sells-daughter`、`p23-dead-sister-returns`。`emperor-dies-twice` 5、`strike-betrayal` 6 修订后可达。
- repeatRate **0.2258**，低于 Phase 22 的 0.2613 与 Phase 21 的 0.2423。

具体片段见 `phase-23-playtests.md`：保险箱账本、窗帘婚纱、法庭旧情人、棺材耳环、葬礼奖券、边境药品、面包纸条、1940 政治面板。

## 4. 浏览器与截图

- `tests/v4-browser/phase23.spec.ts`：**1 passed（4.1s / 8.8s 总）**。
- 检查：1912 政治地图、奥匈 `data-polity`、图例、弗朗茨·约瑟夫信息卡、公报 tab、政治 tab、标题不是 action id、更多细节可展开、无 console error。
- 截图：
  - `docs/v4/phase-23-browser-1912.png`
  - `docs/v4/phase-23-gazette.png`
  - `docs/v4/phase-23-politics.png`
  - `docs/v4/phase-23-browser-later-politics.png`（1940）
  - `docs/v4/phase-23-browser-later-gazette.png`（1940）
  - `docs/v4/phase-23-browser-later-map.png`（1940）
- 1940 面板：大德意志帝国、希特勒、戈培尔、戈林、希姆莱、NSDAP/SPD/KPD/认信教会、Anschluss/大屠杀/慕尼黑/战争经济；地图含维希法国、总督府、保护国。
- 1940 新闻：面包里的纸条（simulation）、棉花/铜价、逃难家庭、电影院、主教传闻。

## 5. 独立 Critic

**Scene 26/30、Life 20/30**（Phase 22 24/20）。Critic 的关键判断：

- 标题系统真实改善，但 state tick 仍有泛化标题；129/4,354 focal events 没有存储 title（修订前）。
- 3.43%（修订前）不是 Phase 23 单独效果：41 p23、55 p22、18 p21；p23 0.94%；11/26 lives 仍无 adult drama。
- p23 focal 全部 1 月；top 4 占 61%；20/72 outcomes 出现；三个 kernel 死掉（修订前）。
- bigamy/revenge/dead-sister/ex-lover 的前提是文本断言，不是世界状态；state effects 与 prose 矛盾。
- 1940 Vichy 在 1 月就 active；“总体战”文本泄漏 1941；1991 政权重叠。
- Gazette 在 1912-01 显示 1912.11/08/06；1940-01 显示 1940.02；1912–1920 simulation 为 0；news category 把警察搜查标成 war/global。
- 只有 7 条可见 news 引用 focal event；政治面板不可点击到新闻/事件；pressures 不可见。
- Scene 26/30（11 个 2、4 个 1）；Life 20/30（Specificity 5、Causality 2、Character 3、Relationship 2、Historical texture 4、Dramatic shape 4）。

Main Agent 修订响应：

- 已修 news 未来日期（UI/API/ambient 月份）、Vichy/Anschluss/占领月份、1991 去重、1941 文本、trace boilerplate、英文 tag、state/prose 矛盾、premise gates、news category/scope、地图 click、p23 平衡。
- 未修：p23 分布集中/全部 1 月、两个 dead kernels、bigamy 引擎限制、premise 仍是 asserted、personal→world `newsRefs`、政治面板到新闻/事件链接、pressures 可视化、CShapes 精确几何、1940 adult browser scene、真实玩家留存。
- Critic 分数仍是修订前；最终数字以 `phase-23-playtests.json` 为准。

## 6. 测试与命令

| 命令 | 结果 |
|---|---|
| `pnpm v4:validate-packs` | **35 packs / 0 failed**；`pack-phase23-high-stakes` 252 scenes，errors 0 |
| `pnpm v4:content-catalog` | **119 states / 2,178 kernels / 35 packs**；44 high-similarity pairs |
| `pnpm v4:creative-index` | 2,178 records；44 high-similarity pairs |
| `pnpm v4:story-editor` | 2,178 kernels / 2,147 distinct shapes |
| `pnpm v4:phase20-lives 45 phase23-a,phase23-b,phase23-c` | 64,259 events / 4,192 focal；adult drama 95（3.07%）；p23 focal 38（0.91%）；repeat 0.2258；p23 world 502 |
| `pnpm exec vitest run tests/v4-phase23-world.test.ts` | 12/12 passed |
| `pnpm exec vitest run tests/v4-phase23-world.test.ts tests/v4-phase22-content.test.ts tests/v4-kernels.test.ts tests/v4-vienna-life.test.ts` | 24/24 passed |
| `tests/v4-browser/phase23.spec.ts` | **1 passed（4.1s / 8.8s 总）** |
| `pnpm exec tsc --noEmit` | 通过 |
| `pnpm build` | 通过（Vite built in 3.06s） |
| `pnpm test` | **103 files passed / 8 skipped（111）**；**588 tests passed / 37 skipped（625）**；222.51s |

## 7. 未完成 / 限制

- **成人戏剧仍不是“多数人生”**：17/27 lives with adult drama；10/27 没有；p23 focal 0.91%。
- **p23 分布集中**：lovers-ledger 144、wedding-dress 91、revenge 90；前三个占 502 的 65%。
- **两个 dead kernels**：father-sells-daughter、dead-sister-returns；role/state 门槛太窄。
- **p23 focal 全部 1 月**：年度调度没有月级分布。
- **bigamy 不是实际双重婚姻**：引擎一人一 partner；第二个家是 neighbor/flag/state。
- **premise 仍是 asserted**：revenge wedding、dead sister、ex-lover judge 的过去不一定有对应历史事件。
- **personal→world echo 弱**：没有 `newsRefs`；gazette 关联事件 id 只是文本；政治面板不能点到新闻/事件。
- **pressures 不可见**：`political_tension`/`war_fear`/`persecution_pressure`/`economic_anxiety` 参与内容，但玩家看不到；`Math.max` 仍让压力单调。
- **地图是近似政权归属**：不是历史边界测绘图；CShapes 几何未打包；殖民地/占领区/争议区只能国家级别。
- **历史来源是 tertiary**：Wikipedia/Britannica/Wien Geschichte Wiki/USHMM；未逐条档案验证。
- **1940 浏览器截图仍是 newborn + 系统参数行**；没有 adult p23 browser scene。
- **没有真实玩家留存数据**；不是用户研究。
- **没有生产部署/公网验收**。

## 8. 结论

Phase 23 可以声称：

- 119 states / 2,178 kernels / 35 packs；2,147 story shapes；44 high-similarity pairs。
- 18-kernel high-stakes pack / 2 states / 72 outcomes / 252 scenes；72/72 outcome titles。
- 122 个旧内容标题 overlay + 9 fallback；API 标题优先级修复；日志折叠/细节。
- 93 polities / 33 tensions / 42 sources / 107 ISO；1912/1918/1938/1945/1955/1991 快照；月粒度关键转折。
- 75 anchors / 30 ambient / 15 rumors；`v4_world_news` 持久化；四类 provenance；UI 公报。
- 64,259 events / 4,192 focal；adult drama 95（3.07%）；p23 focal 38（0.91%）；17/27 lives with adult drama；repeat 0.2258；p23 world 502。
- 1912 + 1940 浏览器截图；Phase23 browser test 1 passed。
- Critic Scene 26/30、Life 20/30。

不能声称：

- 3.07% 全是 Phase 23；多数成年人生有 high-stakes drama；18/18 kernels 与 72/72 outcomes 可达；gazette 是 simulation feed；news/politics 因果驱动个人生活；地图是历史边界测绘图；五分钟体验已修；真实玩家留存已验证；生产部署已完成。

Phase 23 是一个更好看、更有历史质感的事件模拟器，带 gazette 和 atlas；下一步不是更多内容，而是让世界的时钟、前提和后果变成真的。
