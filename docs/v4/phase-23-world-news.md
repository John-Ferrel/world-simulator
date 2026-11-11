# Phase 23 — World News

日期：2026-11-12  
代码：`packages/v4/world-news.ts`、`infra/migrations/009_v4_world_news.sql`、`apps/web/src/main.tsx`  
内容：`packages/v4/content/world-news/anchors.json`、`templates.json`  
截图：`docs/v4/phase-23-gazette.png`

## 1. 目标

世界不能只在人物事件里存在。Phase 23 增加一个持续运行的 **世界公报**：

- 真实历史锚点；
- 当前模拟中已提交的公共事件；
- 不改变世界状态的时代氛围；
- 明确标注的传闻/猜测。

新闻不是 EventFact 的替代品，也不是世界状态的权威。它让玩家感到“即使人物暂时没有经历大事，世界仍在变化”。

## 2. 内容规模

| 类型 | 数量 | 说明 |
|---|---:|---|
| Historical anchors | **75** | 1912-10 至 1955-11，全球 40 / 本地 29 / 地区 6 |
| Ambient templates | **30** | 本地 15 / 地区 8 / 全球 7 |
| Rumor templates | **15** | 明确未经证实 |
| 类别 | war, diplomacy, politics, economy, society, culture, science, scandal, disaster, other |
| 来源 | 75 个 anchor 各 1–2 个 URL；多数 Wikipedia/Wien Geschichte Wiki/USHMM/ORF |

Anchor 示例：

- 1912-10 巴尔干同盟向奥斯曼帝国开战。
- 1914-06 萨拉热窝刺杀与七月危机。
- 1916-12 维也纳煤荒：学校、剧院、医院和面包房都在等煤。
- 1918-11 奥匈在维拉朱斯蒂签署停战；德意志奥地利共和国成立。
- 1927-07 维也纳七月起义：法院枪击、司法宫大火、政治极化。
- 1938-03 Anschluss；1938-11 十一月 pogrom（以严肃、非猎奇方式处理）。
- 1945-04/05 维也纳解放与四国占领。
- 1947 马歇尔计划；1948 柏林封锁；1955 奥地利国家条约与永久中立。

Ambient 示例：

- 《房租通知贴在楼道口》——房东把新租金钉在楼道口，几户人家凑在楼梯间算账。
- 《面包房前的清晨长队》——面粉到得晚，每人限购两条。
- 《咖啡馆里的三份报纸》——君主派、共和派、工人报纸在同一张大理石桌上互相攻击。
- 《边境火车晚点四小时》——检查、货物与日常摩擦。

Rumor 示例：

- 《内阁改组的深夜风声》——据说总理准备撤换两位部长，消息未经证实。
- 《银行要停付的传闻》——储户在门口排队，银行职员反复说一切正常。
- 《报社被工业家买下》——编辑部的社论语气突然变软。

## 3. 四种 provenance

| provenance | 含义 | 可靠性 | 是否改变世界 |
|---|---|---|---|
| `reference` | 真实历史参考，明确标注“历史参考” | confirmed | 否 |
| `simulation` | 当前世界已提交的公共 EventFact | confirmed | 是（事件已提交） |
| `ambient` | 时代氛围模板， deterministic | reported | 否 |
| `rumor` | 传闻/猜测，明确标注“传闻” | rumor | 否 |

UI 用不同颜色的 badge 区分。`reference` 新闻不会冒充“这个世界真的发生了”；`rumor` 不会被写成事实。

## 4. 生成与持久化

### 生成

`ensureWorldNews(world, date)`：

1. 加入所有日期 ≤ 当前年月的 `reference` anchors。
2. 从当前年份的已提交事件中选取公共/名声/丑闻/政治/战争/罢工事件，生成 `simulation` 新闻（最多 8 条）。
3. 按 `world.seed + year` 确定性选择 2 条本地、1 条地区、1 条全球 ambient 模板。
4. 选择 2 条 rumor 模板。
5. 按 id 去重，按日期倒序，最多保留 420 条。
6. 写入四个压力键：`political_tension`、`war_fear`、`persecution_pressure`、`economic_anxiety`。

`ensureWorldNews` 是幂等的：重复调用不会重复插入。它在世界种子、每年 engine tick 结束时运行；不需要 LLM，也不阻塞时钟。

### 持久化

Migration `009_v4_world_news.sql`：

```sql
CREATE TABLE v4_world_news (
  world_id text REFERENCES v4_worlds(id) ON DELETE CASCADE,
  id text,
  date_year integer,
  date_month integer,
  scope text,
  category text,
  provenance text,
  title text,
  summary text,
  payload jsonb,
  PRIMARY KEY (world_id, id)
);
```

`seedV4World` / `saveV4World` 写入；`loadV4World` 读取；API `recentV4News` 读取。

### API

- `GET /api/v4/world` 返回 `news`（最多 140 条）。
- `GET /api/v4/news?scope=local&limit=80` 返回过滤后的新闻。
- `GET /api/v4/political-world?year=1912` 返回政治快照。

## 5. UI

右侧世界面板新增三个 tab：**地图 / 公报 / 政治**。

公报 tab：

- 标题 `WORLD GAZETTE / 世界公报`；
- 当前年月；
- 全部 / 全球 / 地区 / 本地过滤；
- provenance 图例；
- 每条新闻：日期、badge、类别、范围、标题、2 行摘要、展开按钮、来源链接、关联事件 id；
- 底部说明“历史参考来自公开资料；模拟事实来自已提交事件；时代氛围与传闻不改变世界状态”。

截图：`docs/v4/phase-23-gazette.png`。1912-01 时显示房租、煤车、多瑙河水位、边境增兵、警察档案室等 6 条本地/地区/传闻新闻；没有伪造“历史大事”，因为 1912-01 还没有 anchor 到期。

## 6. 与人物故事的连接

- `simulation` 新闻来自已提交事件，因此人物/组织的公共行动可以进入世界公报。
- `political_tension` / `war_fear` / `persecution_pressure` / `economic_anxiety` 被 Phase 23 drama pack 的 adaptive contexts 使用；新闻时代会改变个人故事的权重。
- 新闻中的政治背景可以成为人物故事的素材：政党集会、罢工、审查、难民、边境、报纸丑闻。
- 新闻不会直接改写人物状态；它只提供压力与背景。

## 7. 真实数据与限制

- 75 个 anchor 中 73 个的年份落在所引用政权的 `from/to` 内；1935 纽伦堡法与 1936 柏林奥运使用 1933–1938 德国条目。
- 81/86 个来源 URL 在构建环境返回 200；4 个 USHMM 页面与 1 个 Federal Reserve History 页面因 bot 保护/超时返回 000，仍保留为 canonical citation。
- 覆盖偏维也纳/奥地利/中欧；非洲、拉美、南亚/东南亚较薄。
- 历史参考是 tertiary source，不是逐条档案验证；不声称完整。
- Ambient/rumor 是原创模板，不是历史事实；rumor 明确标注。
- 没有 LLM 实时新闻生成；没有把“新闻条数”当作世界已经活的证明。
- 没有新闻编辑/辟谣/宣传系统；传闻的“真假”目前只是 provenance 标记，不是可操作的媒体机制。
- `phase-23-news-1912-1920.json` 是 news-only 时间推进脚本：它只调用 `ensureWorldNews`，没有推进人物事件，因此该文件的 simulation 为 0。实际 45 年 dossiers 中有 simulation 635 条；两者不能混为一谈。
- 新闻 category/scope 已改为 exact tag matching；`postwar` 不再被当成 `war`，births/deaths 默认不进入 simulation news。
- UI/API 已按 `date <= world.date` 过滤；修订前截图中的 1912.11/1940.02 未来日期问题已修。
