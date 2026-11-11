# Phase 23 — Historical Geography

日期：2026-11-12  
代码：`packages/v4/political-world/`、`apps/web/src/WorldMap.tsx`  
截图：`docs/v4/phase-23-browser-1912.png`

## 1. 问题

Phase 22 的世界地图使用 `apps/web/public/earth/countries.geojson` 的 177 个现代国家/地区轮廓。它地理真实，但 1912 年的维也纳被画在 2019 年的国界里：

- 奥匈帝国不存在；
- 德意志帝国、俄罗斯帝国、奥斯曼帝国不存在；
- 殖民地、保护国、占领区没有表达；
- 1938 年 Anschluss、1945 年四国占领、1955 年第二共和国都无法显示。

Phase 23 不把现代边界贴上过去年份。它新增 **历史政权归属叠层**：用现代国家几何按年份着色为历史政权，并明确标注近似。

## 2. 数据研究

### CShapes 2.0

- 来源：ETH Zurich International Conflict Research，https://icr.ethz.ch/data/cshapes/
- 覆盖：1886–2019，独立国、殖民地、保护国、占领等主权状态。
- 许可：**CC BY-NC-SA 4.0**（非商业、相同方式共享）。
- 已有引用：`data/historical-sovereignty/cshapes-1900-jurisdictions.json`，包含 149 个 1900 年 units、7,280 个 settlement 映射、来源 SHA-256 与 codebook 链接。
- 优点：时间精度高、含殖民地/保护国、有学界 citation。
- 限制：几何是 shapefile/多边形，体积大；本项目没有打包其几何；1900 baseline 不能直接表示 1912/1918/1938/1945；国家继承、占领与争议边界需要额外处理。

### Natural Earth

- 来源：https://www.naturalearthdata.com/
- 许可：public domain。
- 用途：`countries.geojson` 的现代国家几何，作为底图。
- 限制：现代主权边界，不是历史边界；小岛、争议区、殖民地边界被简化。

### 其他参考

- Wikipedia / Britannica / Wien Geschichte Wiki / USHMM：用于领袖、政党、日期、占领与迫害背景。
- `packages/v4/history-db/`：79 countries、166 cities、93 people、98 events；作为 reference index，不是地图几何。
- 研究简报：`docs/v4/phase-23-political-world-research.md`，含 35 个来源 URL 与不确定性说明。

## 3. 实现方式

### 政权周期

`PoliticalPolity` 有 `from` / `to` 年份和 `isoCodes`。`politicalSnapshot(year)` 过滤当前年份活跃政权，`politicalMapForYear(year)` 生成 `ISO3 -> { polityId, name, color, status, approximate, capital }`。

优先级：

1. `mapPriority` 高者优先（用于分裂德国等共享 ISO 的情况）。
2. `from` 更新者优先（1918 年奥地利共和国优先于奥匈帝国；1938 年大德意志优先于魏玛/1933 德国）。
3. 名称排序作为稳定 fallback。

### 1912 叠层

| 政权 | 现代 ISO3 叠层 |
|---|---|
| 奥匈帝国 | AUT, HUN, CZE, SVK, SVN, HRV, BIH |
| 德意志帝国 | DEU |
| 俄罗斯帝国 | RUS, FIN, EST, LVA, LTU, BLR, UKR, MDA, GEO, ARM, AZE, KAZ, UZB, TKM, TJK, KGZ |
| 奥斯曼帝国 | TUR, SYR, IRQ, ISR, PSE, JOR, LBN |
| 大英帝国 | GBR, IRL, IND, PAK, BGD, LKA, MMR, AUS, NZL, CAN, ZAF, EGY, SDN, NGA, GHA, KEN, UGA, TZA, ZMB, ZWE, BWA, MWI, SLE, GMB, GUY, TTO, JAM, BHS, BLZ, CYP, MLT, SGP, MYS |
| 法兰西第三共和国 | FRA, DZA, TUN, MAR, VNM, LAO, KHM, MLI, NER, TCD, CAF, COG, GAB, SEN, CIV, BFA, BEN, TGO, MDG, DJI |
| 意大利王国 | ITA, LBY, ERI, SOM |
| 塞尔维亚 / 保加利亚 / 罗马尼亚 / 希腊 | SRB / BGR / ROU / GRC |
| 美国 / 日本 / 中国 | USA+PHL+CUB+PRI / JPN+KOR+TWN / CHN |

### 1938 / 1945 / 1955

- 1938：`polity-nazi-germany-1938` 覆盖 DEU+AUT；`polity-protectorate-bohemia-moravia-1939` 覆盖 CZE；`polity-slovak-republic-1939` 覆盖 SVK；`polity-general-government-1939` 覆盖 POL。
- 1945：`polity-occupied-austria-1945` 覆盖 AUT；`polity-occupied-germany-1945` 覆盖 DEU；1949 后 `polity-divided-germany-1949` 用 `mapPriority` 覆盖 DEU。
- 1955：`polity-austria-second-republic-1955` 覆盖 AUT；`polity-divided-germany-1955` 用 `mapPriority: 10` 覆盖 DEU，信息卡说明 FRG/GDR 分裂。
- 1991：`polity-serbia-1991` 覆盖 SRB/MNE/KOS；`polity-yugoslavia-1955` 到 1991 结束。

## 4. UI

`WorldMap` 现在接收 `politicalWorld` 与 `year`：

- 每个国家 path 用政权颜色填充（`fillOpacity 0.62`），带 `data-polity` 属性，hover 显示 `<title>`。
- 图例显示地图上出现次数最多的 7 个政权；hover 图例会高亮对应 ISO 的第一个国家。
- 地图下方信息卡显示：政权名、英文名、首都、近似标记、政府结构、国家元首/政府首脑、说明。
- 工具栏显示 `政治地图 · 1912` 和“近似政权归属”。
- 地图 caption 显示人物位置与“政权归属叠层，不是测绘图”。

实际截图：`docs/v4/phase-23-browser-1912.png`。1912 年地图上奥匈帝国为金色，德意志帝国为钢蓝，俄罗斯帝国为橄榄绿，奥斯曼为棕色，英国为暗红，法国为蓝色，意大利为绿色。右侧政治面板显示奥匈帝国、弗朗茨·约瑟夫一世、施蒂尔克、贝希托尔德、SDAP/基督教社会党等。

## 5. 诚实边界

- 这是 **国家级别** 叠层，不是历史边界测绘图。现代国家几何无法表达：
  - 加利西亚（奥匈/俄罗斯/波兰）；
  - 特兰西瓦尼亚（匈牙利/罗马尼亚）；
  - 伏伊伏丁那（匈牙利/塞尔维亚）；
  - 南蒂罗尔/的里雅斯特（奥地利/意大利）；
  - 殖民地内部边界、保护国、租借地；
  - 1938–1945 的占领区、前线、隔都、营地。
- 所有相关政权都有 `approximate: true` 与 `notes`，UI 显示“近似边界”。
- 没有把 CShapes 几何打包进仓库；没有声称 CShapes 的精度被继承。
- 没有做逐年（monthly）边界变化；快照按关键年份/政权周期。
- 没有玩家改变历史后的架空边界生成器；如果模拟产生新政权，目前只能通过新增 `PoliticalPolity` 条目或未来几何层表达。

## 6. 后续路径

1. **CShapes 几何**：在许可允许的前提下，下载 1912/1918/1938/1945/1955 的简化多边形，按 GW code 映射到政权；先做 1–2 MB 的简化版本，避免浏览器负担。
2. **Historical Basemaps**：研究其许可与覆盖，作为 CShapes 的补充。
3. **子国家几何**：为加利西亚、特兰西瓦尼亚、伏伊伏丁那、南蒂罗尔等争议区增加 overlay polygons。
4. **架空政权**：当模拟产生独立/合并/占领事件时，用现有 `PoliticalPolity` + 简化几何生成新的叠层；仍然需要明确“模拟事实”标记。
5. **地图交互**：点击政权打开政治档案；目前只有 hover 信息卡与政治 tab。
