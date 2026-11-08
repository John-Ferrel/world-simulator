# Phase 22 — Playtests & Player Experience

日期：2026-11-09  
基线：Phase 21 `10925ba` — 61,718 events / 5,123 focal；drama 203 world / 22 focal（0.43%）；repeatRate 0.2423。  
本次：`pack-dramatic-overhaul`（20 kernels）+ `pack-early-life-drama`（16 kernels）+ 3 个早期 base scenes + 4 个 base scene retrofit + `high_drama`/`drama` weight multiplier。

## 1. 自然 A/B/C

| Seed | Events | Focal | Drama focal | Drama % | Early-life world | Overhaul world | P21 world | repeatRate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase22-a` | 23,649 | 1,260 | 30 | 2.38% | 459 | 245 | 107 | 0.2511 |
| `phase22-b` | 17,950 | 1,206 | 56 | 4.64% | 364 | 240 | 49 | 0.2702 |
| `phase22-c` | 20,668 | 1,638 | 58 | 3.54% | 460 | 226 | 79 | 0.2627 |
| **合计** | **62,267** | **4,104** | **144** | **3.51%** | **1,283（2.06% 世界）** | **711** | **235** | **0.2613** |

- Drama focal share 从 Phase 21 的 **0.43%** 升到 **3.51%**，约 **8×**；但其中 **119 是 early-life**，**adult drama 只有 25（0.61%）**。3.51% 不是“成年戏剧主纹理”。
- Early-life pack 在世界中 **1,283** 个事件（2.06%），focal early events **119**；0–7 岁不再只靠喂养/发烧/学校。
- 4 个新 State 全部自然出现：`p22-scandal-engine` 318、`p22-wild-fortune` 175、`p22-family-legend` 373、`p22-child-omen` 39。
- 20 个 overhaul kernels 中 **18 个**自然出现；`p22-banker-novel`、`p22-cursed-lottery`、`p22-strange-midwife-face` 为 0；`p22-lost-circus`、`p22-love-letter-serial`、`p22-blacklist-soup` 仅 1 次。
- repeatRate **0.2613**，高于 Phase 21 的 0.2423；内容密度提高带来真实重复回归，不能隐藏。

## 2. 具体自然故事

- **A 1942.03 `p22-goat-heir`**：“公证人念完遗嘱，整栋楼归一只叫‘伯爵’的山羊所有，条件是它继续住在天井里……那天夜里，羊睡在门房，钥匙挂在它的角上。”
- **A 1912.12 `p22-warm-fathers-letter`**：“信是叔叔死前写的，在邮袋里压了两年才到……里面没有遗言，只有一张李子饺子的做法和一个关于祖母的笨笑话。那天晚上，全家真的吃了饺子。”
- **A 1913.02 `p22-strange-cradle-secret`**：“邻居说，这只摇篮是从另一户人家借来的，那家的孩子没活过第一个冬天。Josef Bauer想把它劈了烧火，斧子举起来又放下，最后靠在门后；那天夜里，孩子还是睡在里面。”
- **A 1941.01 `p22-fake-engagement`**：“Emil在债主的账本和婚礼请柬之间来回翻，发现两边写的都是同一个日期。房子还没到手，酒席的定金已经付了。”
- **B 1912.12 `p22-comic-name-register`**：“登记员把Klara打喷嚏的声音当成了名字，低头就写……等到拿着纸回家，才发现孩子的名字里多了一个‘嚏’。”
- **B 1913.12 `p22-warm-anonymous-gifts`**：“门口多了一小包煤，用旧报纸裹着，纸上没有字，还沾着一点面粉……那堆煤让屋里暖了整整一个星期。”
- **B 1915.02 `p22-strange-grandmother-voice`**：“Mitzi报出祖母做李子饺子的步骤，连她总把糖放两遍这个错也记得。Rosa Lechner先是笑，笑着笑着去擦眼睛。”
- **C 1912.03 `p22-comic-name-register`**：“登记员叹了口气，收了三克朗，把‘嚏’划掉，在旁边写上正确的字……Klara全程睡着，什么也没损失，只是那张纸被折成了四折。”
- **C 1915.02 `p22-comic-mistaken-child`**：“两个孩子的帽子一模一样，两个大人在摊子前换了半天，才发现怀里的孩子都在睡。”

这些不是文学示例，而是 `phase-15-phase22-a/b/c.json` 中已提交的 focal 事件。

## 3. 出生与 0–5 岁

- 早期 pack 16 kernels：warm/comic/strange/dark/dramatic 各 4；8 个 infancy、8 个 childhood。
- 浏览器 e2e 在 5 秒/年下 30 秒内出现第 3 条以上日志；真实截图见 `docs/v4/phase-22-browser-final.png`。
- 0–5 岁事件包括：匿名礼物、死人的信、洗礼喷嚏、登记员把喷嚏写成名字、摇篮里的当票、医生预言、火灾、搬家、命名宴。
- 仍有空档和重复；早期 pack 的 `p22-child-matchmaker` 203、`p22-comic-mistaken-child` 155 是世界级高频，需要在下一轮降权/增加变体。

## 4. 五分钟玩家体验

- 第一分钟：原创肖像、动态时代文本、出生家庭细节、愿望、真实世界地图。
- 1 岁左右：早期 pack 或 base scene 开始出现，不再只有喂养/发烧。
- 5 分钟约 10 年：会看到童年/学校/家庭故事；成年 drama 仍需要更长观察，但 A 的 1912–1942 故事证明它会在自然人生中出现。
- 主要剩余问题：repeatRate 0.2613；早期 pack 高频模板；State 参数不可见；肖像仍是程序化 SVG 半身像，不是 DoL 级。

## 5. 对比 Phase 21

| 指标 | Phase 21 | Phase 22 |
|---|---:|---:|
| Drama focal share | 0.43% | **3.51%** |
| Drama focal events | 22 | **144** |
| Early-life world events | 0（新 pack） | **1,283** |
| New States observed | 2/2 P21 | **4/4 P22** |
| repeatRate | 0.2423 | **0.2613** |
| Portrait | LPC 64×64 放大 | **原创 200×240 SVG 半身像** |
| Browser e2e | 9.4s | **9.4s（Phase22 test）** |

结论：**戏剧密度是真提升，重复率是代价；视觉是真实替换，不是 DoL 级完成。**

## 6. 限制

- 4,104 focal 是三个 45 年 seed 的合计；单个 seed 的 focal 波动大（920–1,662），不能只看比例。
- Drama focal 3.51% 仍低于 12% 目标；但它已从“稀有 garnish”变成“多数人生可遇到”。
- repeatRate 0.2613 高于 Phase 21；早期 pack 的高频模板是主要来源之一。
- `p22-strange-midwife-face`、`p22-drama-factory-accident`、`p22-cursed-lottery` 自然 0/极低；需要角色门槛/权重调整。
- 没有真实玩家留存数据；本报告是真实浏览器 + Engine dossier，不是用户研究。
- 没有逐年历史国界、State 参数可视化、装备/关系管理 UI。
