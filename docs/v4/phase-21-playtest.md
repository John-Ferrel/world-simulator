# Phase 21 — Playtest & Browser Acceptance

日期：2026-11-08  
环境：真实 dev server（`http://localhost:5173`）+ Chromium 1440×1100；另用 v4 e2e server（5 秒/年，`living_world_e2e`）跑浏览器验收。  
证据：`docs/v4/phase-21-browser-final.png`、`docs/v4/phase-21-ui-first.png`、`/tmp/opencode/early-engine.log`、`tests/v4-browser/phase21.spec.ts`。

## 1. 浏览器验收

命令：

```bash
LD_LIBRARY_PATH=.data/browser-libs/root/usr/lib/x86_64-linux-gnu \
  pnpm exec playwright test --config playwright.v4.config.ts tests/v4-browser/phase21.spec.ts
```

结果：**1 passed (9.5s)**。

验收内容：

- 注册 → 出生 → observer；
- `.portrait` 高度 **260px**，canvas **216px**；
- `.world-map-svg` 可见，`countries.geojson` 渲染 **177** 个 path；
- 日志含“出生”和家庭细节；
- 5 秒/年下，等待不到 30 秒就出现第 3 条以上日志（早期人生事件）；
- 控制台错误为 0。

截图：`docs/v4/phase-21-browser-final.png`（1913 年、1 岁、4 条记录：第一次笑、第一句话、出生、出生愿望）。

## 2. 早期人生 Engine cohort

用真实 `advanceV4Year` 跑一个 player-born child 7 年，收集 child/family 事件：

- 共 **16 条**儿童/家庭事件（不是 0，也不是等到 5 岁）。
- 具体例子：
  - 1913 `vienna-life-toddler-first-words/first-word-more`：“Early Engine把空碗推回Josef Bauer面前，清清楚楚地说了一个字：‘还要。’”
  - 1913 `vienna-life-infant-first-smile/neighbour-warning`：“隔壁的女人探头进来，说孩子笑得太早……孩子却伸手去抓那女人围裙上的扣子。”
  - 1913 `vienna-infant-household.baptism-gift/silver-spoon-pawned`：“洗礼后邻居送的小银勺被Josef Bauer裹进手帕，拿到当铺换了两个克朗。”
  - 1915 `vienna-life-child-family-legend/happy-legend`：“Josef Bauer讲起自己小时候在乡下追一只白鹅……这个家不是只有欠账和葬礼。”
  - 1916 `vienna-life-child-first-friend/stolen-marble`：“两个人蹲在墙根，把一只蚂蚁看了很久，谁也没有先回家。”
- 0–5 岁不再有五年空白；第一年就有第一句话/第一次笑/喂养/家庭事件。仍有 15–16 个月的空档（见限制），不能说“完全连续”。

## 3. 自然人生 A/B/C

| Seed | Events | Focal | Drama world | Drama focal | repeatRate | 新 State |
|---|---:|---:|---:|---:|---:|---|
| `phase21-a` | 16,957 | 1,358 | 50 | 4 | 0.2367 | `p21-scandal-web` 22 / `p21-fortune-reversal` 13 |
| `phase21-b` | 21,860 | 1,737 | 66 | 6 | 0.2414 | 27 / 14 |
| `phase21-c` | 22,901 | 2,028 | 87 | 12 | 0.2489 | 39 / 29 |
| **合计** | **61,718** | **5,123** | **203（0.33% 世界）** | **22（0.43% focal）** | **0.2423** | 两个 State 都出现 |

- 16 个 Drama Kernel 中 **10 个**自然出现；`p21-secret-heir`、`p21-staged-death`、`p21-false-confession`、`p21-public-humiliation`、`p21-love-power-bargain`、`p21-revenge-ledger` 为 0。
- 命中最多：`p21-elder-testimony` 63、`p21-mistaken-identity` 50、`p21-returned-enemy` 28、`p21-absurd-inheritance` 28、`p21-scandal-auction` 14。
- repeatRate 0.2423，高于 Phase 20 的 0.2290 和 Phase 19 的 0.2104；chronology + follow-up due 修复改变了世界线，这是真实回归，不能隐藏。
- Drama focal share 0.43% 仍低：戏剧内容存在、可读，但还没有成为人生的主纹理。
- **Chronology**：A/B/C 的 `badDates = 0`；所有已提交事件日期都不超过世界时钟。

## 4. Drama 自然场景

- **A 1934.07 `p21-mistaken-identity`**：“银怀表、一张电车票和半包烟；表盖打开时，里面那张小照片上的人不是Klara……拘留室的门关上时，Klara才发现自己一直攥着那张电车票。”
- **A 1935.01 `p21-duel-at-dawn`**：“子弹擦过Josef的左肩，把外套和衬衫一起撕开……医生在运河桥边缝了六针，警察来问话时，Josef只说是在石头上滑了一跤。”
- **B 1952.01 `p21-blackmail-wedding`**：“戒指还是戴上了……Mitzi在婚宴上敬了三桌酒，回到新房才发现门锁已经换了，钥匙放在门垫下面。邻居在门外放了一挂鞭。”
- **B 1951.01 `p21-scandal-auction`**：“把第七号信封拆开，念了第一页……Josef听见自己的名字被念了两次，第二次比第一次轻。”
- **C 1945.01 `p21-family-secret`**：“‘原来我一直在替别人守孝。’……Mitzi听见走廊里有人把箱子拖下楼。”
- **C 1942.01 `p21-ruin-reversal`**：“警察在运河边找到他的外套和一只空药瓶……Mitzi翻开第二本账，发现最后一页被撕掉了，只剩一道毛边。”

这些不是文学示例，而是 `phase-15-phase21-a/b/c.json` 中已提交的 focal 事件。

## 5. 五分钟观察判断

- 打开后 5 分钟内能看到：出生文本（父母、职业、家庭现金/债务等，兄弟姐妹/拥挤细节可能被截断）、愿望、肖像、真实世界地图、家庭/住处。
- 1 岁左右开始出现第一句话、喂养、第一次笑、楼梯事故、家庭故事、第一个朋友；不再需要等到 5 岁。
- 世界 30 秒/年；5 分钟约 10 年，足够看到童年和学校，但不足以看到成年戏剧。成年戏剧需要继续观察或使用已有世界。
- 日志的“重大”标签、年份分组、最新在上和 4 秒轮询保留；新增“新的经历已写入”提示（2.2 秒高亮）。
- 主要仍欠缺：历史进程卡偏多、地图没有历史边界、State/经济/组织不可视化、戏剧内容自然 focal share 仍低。

## 6. 视觉判断

- 人物不再消失；肖像 260px，人物按年龄缩放；婴儿仍无头发（测试要求不把成人发型放到新生儿），职业配件开始生效。
- 地图从维也纳示意图变成真实世界轮廓；欧洲/地中海/北非可辨，维也纳和克洛斯特新堡可点击，人物位置有金色脉冲。
- 仍是 LPC 64×64 资产放大，不是 DoL 级精细纸娃娃；服装/表情/姿态数量有限。

## 7. 限制

- 没有逐年历史国界。
- 戏剧 pack 的角色门槛与基础率导致自然 focal share 仍低；具体数字见下表。
- 世界时钟 30 秒/年，5 分钟只能覆盖约 10 年；成年戏剧需要更长观察。
- 没有真实玩家长期留存数据；本报告是单次真实浏览器 + Engine cohort，不是大规模用户测试。
