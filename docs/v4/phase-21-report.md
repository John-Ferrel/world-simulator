# Phase 21 — Make It a Game 实施报告

日期：2026-11-08  
基线：Phase 20 `7506db6` — 111 states / 2,108 kernels / 31 packs；Critic Life 18/30、Scene 22/30。  
设计：`docs/v4/phase-21-game-design.md`  
体验审计：`docs/v4/phase-21-experience-audit.md`  
视觉：`docs/v4/phase-21-visual-design.md`  
戏剧：`docs/v4/phase-21-dramatic-content.md`  
试玩：`docs/v4/phase-21-playtest.md`  
Critic：`docs/v4/phase-21-critique.md`

## 1. 结论摘要

Phase 21 没有重写 Engine。它先修了三个真实玩家体验问题：

1. **左侧人物消失**：`.portrait` 在 flex column + `overflow-y:auto` 的 pane 里被压成 **2px**，Canvas 被裁掉；修复为 260px 肖像舞台 + 192×192 Canvas + 裁边 LPC 分层合成。
2. **右栏不是世界地图**：`WorldPane` 硬编码 `ViennaMap`；替换为真实 `countries.geojson` 世界地图（177 个国家/地区轮廓），支持缩放/拖动/人物定位。
3. **出生后长时间没有事件**：玩家出生角色使用通用 `vienna-life` 场景，但 infant feeding/fever 的 rate 低，且 authored infant scenes 只对 Elisabeth 生效；新增 5 个通用早期场景并提高 rate。Engine 7 年 cohort 现在有 **16 条**儿童/家庭事件；浏览器 e2e 在 5 秒/年下 30 秒内出现第 3 条以上日志。

同时新增 **`pack-dramatic-lives`**：16 kernels、2 states、71 adaptive contexts、16 check kernels、16 conditional-outcome kernels、224 compiled scenes。规模从 Phase 20 的 111/2,108/31 增至 **113 states / 2,124 kernels / 32 packs**。

## 2. 视觉

- 肖像：260px 舞台；192×192 Canvas；64×64 LPC 图层先离屏合成，裁掉透明边距，再按年龄比例绘制（婴儿 0.76、儿童 0.88、成人 1.0）；死亡灰度、低健康标记、姓名首字 fallback。
- 自动外观：医生/官员眼镜与外衣、学生背包、艺术家头巾；显式 `doll` 选择优先。
- 世界地图：真实地理轮廓；默认欧洲视角，全球/欧洲/人物按钮；滚轮缩放、拖动；维也纳/克洛斯特新堡可点击；人物位置金色脉冲。
- 截图：`phase-21-audit-observer.png`（修复前，空白）、`phase-21-ui-first.png`（修复后）、`phase-21-browser-final.png`（1913/1 岁/4 条记录）。

## 3. 出生与 0–5 岁

- `createV4Birth` birth event 加入父母姓名/职业、家庭现金/债务、兄弟姐妹、拥挤程度；不再是一句通用模板。
- 新增 `vienna-life-infant-first-smile`、`toddler-first-words`、`toddler-accident`、`child-family-legend`、`child-first-friend`；feeding/fever rate 0.6/0.45。
- 真实 Engine 7 年 cohort：**16 条**儿童/家庭事件；第一年出现第一句话/第一次笑/喂养；3–5 岁有家庭故事/第一个朋友/楼梯事故。
- 浏览器 e2e：1913 年、1 岁、4 条记录（第一次笑、第一句话、出生、出生愿望）。

## 4. 戏剧内容

`pack-dramatic-lives`：

- 16 kernels、2 states（`p21-scandal-web` / `p21-fortune-reversal`）、71 adaptive contexts、16 checks、16 conditional outcomes、224 compiled scenes。
- 方向：秘密继承人、勒索婚礼、决斗、假死、可疑死亡、旧敌、假认罪、公开羞辱、荒诞继承、身份错位、爱情×权力、家族秘密、破产逆转、复仇账本、丑闻拍卖、老年证词。
- 结果持久：State / Relation / Knowledge / Flag / Cash / Health / Death / Position / Organization。
- 自然 A/B/C（chronology 修复后）：**61,718 events / 5,123 focal**；drama **203 世界事件（0.33%）/ 22 focal（0.43%）**；两个新 State 都出现；16 个 Kernel 中 10 个自然出现；`p21-elder-testimony` 63、`p21-mistaken-identity` 50、`p21-returned-enemy` 28、`p21-absurd-inheritance` 28、`p21-scandal-auction` 14。
- repeatRate **0.2423**，高于 Phase 20 的 0.2290 和 Phase 19 的 0.2104；chronology + follow-up due 修复改变了世界线，这是真实回归。

## 5. 独立 Critic

独立 Critic（修订前 dossier）给 **Scene 24/30、Life 19/30**；Phase 20 是 **22/30、18/30**。这是 **+2 Scene / +1 Life**，不是跃迁。完整批评见 `docs/v4/phase-21-critique.md`。

Critic 的核心判断：

- **肖像/地图**：2px 消失 bug 真修好，260px/216px 可见；177 国世界地图真可用；但人物仍是放大的 LPC 地图小人，不是 DoL 级肖像；地图是现代地理，不是 1914 边界。
- **出生/0–5**：birth text 有母亲/职业/贫困/家庭人数；5 个新场景 + 7 年 16 条 child/family 事件；但仍有 15–16 个月空档、birth detail 被 `slice(0,2)` 截断、baptism 把 Josef 投成 mother、first-friend 可让别的 child 当 subject。
- **戏剧**：19 focal kernel / 39 state tick；24 focal lives 中只有 7 个有 drama，17 个为零；`p21-mistaken-identity` 55、`p21-elder-testimony` 42、`p21-absurd-inheritance` 31 占 128/174；`p21-elder-testimony` 在 Alois C 重复 4–6 次；`p21-secret-heir`/`p21-false-confession` 自然 0；0.41% focal 不可接受。
- **Chronology**：Critic 抓到 header 1914-01 但日志 1914.09、时代面板同时显示 1914-07/06 的硬 bug。Main Agent 已修 ordinary event 使用 elapsed year，并加 `never stamps an ordinary event after the world clock` 测试；自然 A/B/C 已重跑。
- **五分钟**：童年可看；普通玩家仍缺少继续看的戏剧问题；30 秒/年下成年戏剧在 10–12 分钟后。
- **分数**：Scene 24/30、Life 19/30；Specificity 4、Causality 3、Character continuity 3、Relationship continuity 2、Historical texture 4、Dramatic shape 3。

Main Agent 修订响应（不改变 Critic 的 19/24）：

- 修 chronology 并加测试；重跑 A/B/C。
- 记录未修：per-life drama director、per-kernel cooldown、role casting/命名、state 参数可视化、trace adaptive context、LPC 美术、历史边界、birth detail 截断、first-friend subject swap。
- 最终自然数字以重跑后的 `phase-21-playtests.json` 为准。

## 6. 测试与命令

```bash
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:creative-index
pnpm v4:story-editor
pnpm v4:phase20-lives 45 phase21-a,phase21-b,phase21-c
pnpm exec vitest run tests/v4-vienna-life.test.ts tests/v4-player-life.test.ts tests/v4-phase21-content.test.ts
LD_LIBRARY_PATH=.data/browser-libs/root/usr/lib/x86_64-linux-gnu \
  pnpm exec playwright test --config playwright.v4.config.ts tests/v4-browser/phase21.spec.ts
pnpm exec tsc --noEmit
pnpm build
pnpm test
```

| 命令 | 结果 |
|---|---|
| `pnpm v4:validate-packs` | **32 packs / 0 failed**；`pack-dramatic-lives` `compiledScenes: 224`、`errors: []` |
| `pnpm v4:content-catalog` | **113 states / 2,124 kernels / 32 packs**；45 high-similarity pairs |
| `pnpm v4:creative-index` | 2,124 records；45 high-similarity pairs |
| `pnpm v4:story-editor` | 2,124 kernels / 2,093 distinct shapes |
| `pnpm v4:phase20-lives 45 phase21-a,phase21-b,phase21-c` | 61,718 events / 5,123 focal；drama 203/22；repeat 0.2423；badDates 0 |
| `pnpm exec vitest run tests/v4-vienna-life.test.ts tests/v4-player-life.test.ts tests/v4-phase21-content.test.ts` | 14/14 passed |
| `tests/v4-browser/phase21.spec.ts` | **1 passed（9.5s）** |
| `pnpm exec tsc --noEmit` | 通过 |
| `pnpm build` | 通过（Vite built in 2.98s） |
| `pnpm test` | **101 files passed / 8 skipped（109）**；**572 tests passed / 37 skipped（609）**；213.23s |

## 7. 未完成与限制

- **Drama focal share 0.43% 仍低**：戏剧内容存在、可读，但还没有成为人生的主纹理。`p21-secret-heir`、`p21-staged-death`、`p21-false-confession`、`p21-public-humiliation`、`p21-love-power-bargain`、`p21-revenge-ledger` 自然 0；角色门槛/权重/竞争仍需调整。
- **`p21-elder-testimony` 重复**：C 中多次出现同一文本；outcome/条件分支需要更多变体。
- **RepeatRate 0.2423**：高于 Phase 20 0.2290；chronology + follow-up due 修复后的世界线更差，不能隐藏。
- **美术仍是 LPC 64×64**：放大后是清晰像素风，但不是 DoL 级精细纸娃娃；服装/表情/姿态数量有限。
- **地图没有逐年历史国界**；只有维也纳/克洛斯特新堡是真实可点击地点；其他世界城市是尺度参照。
- **观察界面仍偏解释性**：历史进程卡多、经济/State/组织不可视化；5 分钟主要看童年，成年戏剧需要更长观察。
- **没有大规模用户留存数据**；本报告是单次真实浏览器 + Engine cohort，不是用户研究。
- **世界时钟 30 秒/年**；5 分钟约 10 年，成年戏剧出现较晚。
- 没有生产部署/公网验收；没有 runtime LLM 参与本轮内容。

## 8. 结论

Phase 21 是**真实的视觉/早期人生成功 + 部分戏剧内容成功**：

- 可以声称：人物不再消失；地图是真实世界；出生和 0–5 岁不再空白（仍有 15–16 月空档）；戏剧 pack 验证并自然出现（0.43% focal，仍低）；浏览器 e2e 通过。
- 不能声称：戏剧已经成为人生主纹理；美术达到 DoL 级；历史边界/经济/组织可视化完成；游戏已经通过大规模玩家留存验证。

下一步最值得投入：提高 drama 权重/桥接、修 elder-testimony 重复、增加服装/表情、历史边界与 State/经济可视化。
