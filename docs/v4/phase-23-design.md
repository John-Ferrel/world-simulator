# Phase 23 — Blood, Desire & History: Design

日期：2026-11-12  
基线：Phase 22 `00f36ed` — 117 states / 2,160 kernels / 34 packs；自然 A/B/C 62,267 events / 4,104 focal；总 drama 144（3.51%），其中 adult 25（0.61%）；repeatRate 0.2613；Critic Scene 24/30、Life 20/30。  
目标：让成年人生更尖锐，同时让这些人生发生在一个有政权、领袖、政党、派系、民族矛盾、战争与新闻的历史世界中。

## 1. 审计结论

### 已有基础

- `packages/v4/history-db/`：79 countries、166 cities、93 people、98 events（90 fact / 8 inference）、10 fiction hooks、517 sources。适合做参考索引，不是世界状态。
- `packages/v4/macro.ts`：MacroState、WorldDevelopment、HistoricalProcess、legacy、eventPool、historyReview。已有“低频宏观世界”的骨架。
- `packages/v4/content/vienna-history-seed.ts`：1912 年 SDAP 与弗洛伊德圈子的 HistoricalProcess，但只有两个组织，且没有政党/政府/领袖的完整背景。
- `packages/v4/content/vienna-1912.ts`：Vienna chronicle（巴尔干、萨拉热窝、战争、1918、1934、1938、1945 等）与压力表；是本地历史锚点，不是全球新闻。
- `apps/web/src/WorldMap.tsx`：Natural Earth `countries.geojson` 的现代国家轮廓；没有历史政治层。
- `apps/v4-api/index.ts`：事件投影存在一个关键问题：`projectEvent` 优先使用 `sceneTitles`，覆盖了 `event.title`；即使内容写了 outcome 标题，玩家也看不到。
- `apps/web/src/main.tsx`：日志已显示标题，但正文不可折叠，标题不是每 outcome 独立；右侧只有地图/时代/历史进程，没有新闻。
- `packages/v4/domain.ts`：`EventFact.title` 已存在，但 `SceneOutcome` 没有 `title`；composer 不传递 outcome 标题。
- 世界存档：`v4_worlds` 只保存 macro/historyMeta；没有新闻表。新闻若要持久化，需要自己的存储路径。

### 主要缺口

1. **成年人生仍太安全**：Phase 22 的 3.51% 总量里 119 是 early-life，adult 只有 25（0.61%）；13/24 成年 focal lives 没有成年 drama。
2. **事件不可扫读**：标题被 scene title 覆盖，outcome 没有标题；日志正文长且不可折叠。
3. **政治世界是文本背景，不是可查询对象**：没有 1912 国家/领袖/政党/派系/民族矛盾的统一快照；组织层只有维也纳的印刷厂、工会、学校等。
4. **地图是现代边界**：1912 的维也纳被画在 2019 的国家轮廓里；没有帝国、殖民地、占领区的政治归属层。
5. **世界没有新闻**：只有 chronicle 和 public events；没有独立的 gazette，也没有 reference / simulation / ambient / rumor 的区分。
6. **政治与个人故事没有稳定接口**：新闻不能给人物制造压力/机会，人物重大事件也不能进入世界新闻。

## 2. 设计原则

1. **一个引擎，三个逻辑层。** Reference World 是只读历史资料；Living World 是 `WorldState` / `EventFact` / `Organization` / `Position` / `HistoricalProcess` / `MacroState`；Narrative World 是新闻与传闻。三者不各自建引擎。
2. **历史是强参考，不是剧本。** 真实事件只作为 `reference` 新闻和可选锚点；模拟世界可以偏离。真实人物的死亡日期不是死亡命令。
3. **新闻必须可追溯。** 每条新闻有 `provenance`（reference / simulation / ambient / rumor）、`reliability`、日期、来源或关联 EventFact。传闻明确标注为传闻。
4. **政治世界轻量但持续。** 国家/领袖/政党/派系/矛盾按时代快照查询；每年只做一次新闻与压力更新，不对每个国家做复杂政治推理。
5. **地图先诚实，再精确。** 不把现代边界冒充历史边界。使用 Natural Earth 现代几何 + 历史政权归属叠层，明确标注“近似政治地图”；CShapes 2.0 的覆盖/许可/几何限制写入文档。
6. **标题是内容的一部分。** 每个 outcome 可以有自己的标题；旧内容通过 title overlay 升级；日志正文可折叠，标题可点击打开事件档案。
7. **戏剧要伤害人物，也要给他们幸福。** 高赌注不等于纯悲剧；包括暴力、恐惧、欲望、欺骗、背叛、痴迷、复仇、爱、权力、财富、荒诞好运与真实幸福。
8. **政治是戏剧素材，不是管理 UI。** 玩家不管理国家；新闻、政党、领袖、民族矛盾通过人物处境、State、关系、事件和压力进入人生。

## 3. 工作包

### A. Event Presentation

- `SceneOutcome.title?: string`、`KernelOutcome.title?: string`。
- Composer 复制 outcome title；Engine 提交 `EventFact.title` 时使用 `outcome.title ?? overlay ?? definition.title`。
- `packages/v4/event-titles.ts`：`eventTitleFor(sceneId, outcomeId, sceneTitle)`，支持 `packages/v4/content/event-title-overrides.ts` 的旧内容覆盖。
- API `projectEvent` 改为优先 `event.title`，再 fallback 到 scene title。
- 日志：标题更醒目；正文默认 3 行折叠；`展开全文`；`细节` 显示 trace（motive/conflict/response）、tags、事件 id；标题点击仍打开档案。
- 旧内容 retrofit：为高频 base scene / Phase 21–22 内容补 per-outcome 标题。

### B. Historical Political World

新增 `packages/v4/political-world/`：

- `types.ts`：Polity、Leader、Party、Faction、Tension、NewsAnchor、PoliticalSnapshot。
- `data.ts`：1912 / 1918 / 1938 / 1945 / 1955 / 1991 时代快照；优先欧洲与维也纳，全球主要政权有背景覆盖。
- `sources.ts`：可核查来源（Wikipedia、Britannica、CShapes、USHMM 等），标注 tertiary / reference。
- `index.ts`：`politicalSnapshot(year)`、`politicalMapForYear(year)`、`activeTensions(year)`、`newsAnchorsForYear(year)`、`validatePoliticalWorld()`。
- 世界种子：在 `applyViennaHistoricalWorld` 中加入维也纳政党/国家机构 Organization 与 Position（SDAP、Christian Social、German National、Austrian state），使用现有契约；领袖以 reference public figure 形式查询，不强制全部变成模拟 Person。
- API：`/api/v4/world` 返回 `politicalWorld`；新增 `/api/v4/political-world?year=` 可选查询。

### C. Historical Map

- `WorldMap` 接收 `politicalWorld` 与 `year`。
- 用 `polity.isoCodes` 将现代国家几何着色为历史政权；`approximate` 政权显示斜线/虚线/说明。
- 图例、hover/click 信息卡：政权名、政府、领袖、首都、主要矛盾、近似说明。
- 年份切换只跟随世界年份；不提供“现代地图”默认，避免把现代边界当作历史事实。
- 明确说明：这是“政权归属叠层”，不是测绘图；CShapes 2.0 的精确几何未打包。

### D. World News

新增 `packages/v4/world-news.ts` + migration `009_v4_world_news.sql`：

- `WorldNewsItem`：id、date、scope（global/regional/local）、category、title、summary、provenance、reliability、polityId、placeId、sourceIds、relatedEventIds。
- 生成器每年一次：
  - `reference`：策展历史锚点（1912 巴尔干、1914 萨拉热窝、1918 停战、1938 合并、1945 解放等），明确标注“历史参考”。
  - `simulation`：过去 12 个月 significance ≥ 0.45 的 EventFact，标题取 `event.title`，关联事件 id。
  - `ambient`：由政治快照 + 年份种子确定性生成的地方/社会/文化新闻，不改变世界状态。
  - `rumor`：明确标注“传闻”，可不可靠，不写成事实。
- 持久化：`v4_world_news` 表；`seedV4World` / `saveV4World` / `loadV4World` / API 读取。
- 压力桥：从新闻/政治快照计算 `political_tension`、`war_fear`、`persecution_pressure`、`economic_anxiety`，写入 `world.pressures`，供现有 `pressure` 条件使用。
- UI：右侧 `世界公报` tab；全球/地区/本地过滤；provenance badge；日期、标题、短描述；点击展开；与个人日志视觉统一但信息结构不同。

### E. High-Stakes Drama

新增 `pack-phase23-high-stakes`：

- 16–20 kernels、2 states（`p23-dangerous-secret` / `p23-political-debt`）。
- 主题：爱情/欲望/嫉妒/痴迷/背叛；暴力/恐惧/犯罪/复仇/痛苦；财富/权力/政治阴谋/命运逆转；荒诞/黑色幽默/极端幸运；家庭秘密/代际悲剧/重逢。
- 每个 outcome 有短标题；3–4 outcomes；4–6 adaptive contexts；checks + conditional outcomes；高权重、宽 eligibility，覆盖普通成年人生。
- 使用现有 `fame`、`public-scandal`、`known-affair`、`office-patronage`、`debt-bondage`、`raising-child`、`grief`、`political-suspect`、`under-investigation`、`blacklisted`、`cursed-by-wish`、`df18-borrowed-luck` 等 State。
- 政治世界接口：使用 `pressure` 条件（`political_tension` / `war_fear` / `persecution_pressure`），让新闻时代影响个人故事。

### F. Integration

- 新闻中的重大事件可被人物内容引用为 `history` / `pressure` / `hasState` 背景。
- 人物重大事件（significance ≥ 0.7）进入 simulation news，形成“个人 → 世界”的回声。
- 政治组织/职位可被内容引用；加入政党、被调查、罢工、政治丑闻等故事使用现有 Organization/Position/State。
- 不新增策略管理 UI；政治世界只提供观察、氛围和故事机会。

## 4. 数据与许可

- **Natural Earth**：现代国家几何，public domain；用于底图。
- **CShapes 2.0**：历史主权参考，CC BY-NC-SA 4.0；覆盖 1886–2019，含独立国/殖民地/保护国，但本项目不打包其几何，只用其方法/参考与既有 1900 jurisdiction index。历史地图是“现代几何 + 政权归属叠层”，明确近似。
- **Wikipedia / Britannica / USHMM / Wien Geschichte Wiki**：tertiary reference；用于领袖、政党、日期、背景。所有政治数据记录 `sourceIds`，报告中说明未做逐条档案验证。
- **历史人物**：reference public figures；只有少数以普通 Person 进入世界，且无脚本化命运。

## 5. 验收

- 每个新 outcome 有标题；API 返回 `event.title` 而不是 scene title；日志可折叠并显示细节。
- 1912 政治快照可查询：奥匈帝国、德意志帝国、俄罗斯帝国、奥斯曼帝国、英国、法国、意大利、塞尔维亚等；领袖、政府、政党、矛盾、来源齐全。
- 1918 / 1938 / 1945 / 1955 政治快照有可见变化；地图随年份改变政权归属。
- 世界新闻持续生成并持久化；reference / simulation / ambient / rumor 可区分；UI 可浏览全球/地区/本地。
- 新 drama pack 注册、验证、自然出现；成年 drama focal share 相比 Phase 22 的 0.61% 有实质提高。
- 浏览器试玩覆盖 1912 出生、1912–1920、普通人生、政治相关人生、特殊愿望、长期人生；至少一轮修订。
- `pnpm test`、typecheck、build、content validation 通过；独立 Critic 报告与真实数据一致。

## 6. 不做什么

- 不重建三套数据库/引擎。
- 不模拟完整全球经济、议会投票、人口迁移或外交博弈。
- 不把现代国界标成 1912 国界；不伪造 CShapes 几何精度。
- 不让 LLM 即时代替 Runtime 因果；新闻不能凭空改写已提交事件。
- 不做国家管理/政党管理/战争操作 UI。
- 不把“新增新闻条数”当作世界已经活的证据；必须看人物故事与政治背景的实际连接。
