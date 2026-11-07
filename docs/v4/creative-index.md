# Creative Index

Generated: 2026-11-07T07:44:25.605Z

A deterministic author/editor aid over the runtime content. It is not the registry and does not change runtime behavior.

## Query

```bash
pnpm v4:creative-index -- --query "一个贫穷裁缝收到律师来信，继承了陌生人的城堡"
pnpm v4:creative-index -- --kernel office16-hire.protege
pnpm v4:creative-index -- --gaps
pnpm v4:creative-index -- --duplicates 0.15
pnpm v4:creative-index -- --pack packages/v4/content/states/generated/pack-<name>.json
```

## Counts

| Metric | Count |
|---|---:|
| States | 107 |
| Kernels | 2060 |
| Generated packs | 29 |
| Creative records | 2060 |

## Stage coverage

| Stage | Kernels |
|---|---:|
| adulthood | 1727 |
| adolescence | 171 |
| childhood | 84 |
| elderhood | 74 |
| infancy | 4 |

## Underused motifs

| Motif | Kernels |
|---|---:|
| death | 252 |
| travel | 236 |
| debt | 173 |
| secret | 171 |
| marriage | 147 |
| migration | 131 |
| inheritance | 96 |
| mistaken_identity | 92 |
| love | 85 |
| birth | 70 |
| luck | 63 |
| escape | 58 |
| betrayal | 55 |
| supernatural | 50 |
| revolution | 24 |

## Tone distribution

| Tone | Kernels |
|---|---:|
| dark | 904 |
| historical | 763 |
| warm | 592 |
| gritty | 343 |
| political | 180 |
| suspense | 163 |
| melancholy | 147 |
| everyday | 140 |
| religious | 73 |
| absurd | 71 |
| romantic | 70 |
| triumphant | 43 |
| eerie | 33 |
| comic | 31 |
| erotic | 26 |

## High-similarity pairs

Pairs >= 0.20: **44**. These are candidates for an editor, not automatic rejects.

| Score | A | B |
|---:|---|---|
| 0.612 | 下班后的两小时 | 夜校的制图桌 |
| 0.466 | 不能带到饭桌上的名字 | 借来的房间 |
| 0.397 | 厂里送来的工具袋 | 双人床空出的那一半 |
| 0.369 | 解剖教室的福尔马林 | 解剖教室的福尔马林味 |
| 0.315 | 客房床垫下的戒指 | 客房床垫下的信 |
| 0.312 | 少了两克朗的信封 | 信封里少了三克朗 |
| 0.287 | 伤残抚恤窗口的旧军牌 | 伤残抚恤窗口的号码 |
| 0.278 | 凌晨三点的铅尘 | 凌晨三点的铅版 |
| 0.278 | 毕业照上的空椅子 | 学费、房租和最后一学期 |
| 0.277 | 车站长椅上的两只手套 | 车站长椅上的两个人 |
| 0.273 | 研讨课上的第七页 | 研讨课上的第二排 |
| 0.267 | 名单上的空白 | 名单上的一道横线 |
| 0.267 | 给床上的老人翻身 | 给床上的老人翻个身 |
| 0.262 | 黎明前的手枪 | 黎明前的两把手枪 |
| 0.255 | 半夜的敲门 | 半夜的敲门声 |
| 0.253 | 三个师傅，一双手 | 沿街敲门 |
| 0.248 | 第二次戴上的戒指 | 旧戒指第二次戴上 |
| 0.244 | 车站长椅上的两只手套 | 公园长椅上的两只手套 |
| 0.239 | 师傅留下的那把尺 | 师傅留下的那把刨子 |
| 0.239 | 门口多出来的一双小鞋 | 门口多出来的一双鞋 |
| 0.238 | 借书卡上的第三个名字 | 借书卡上的地址栏 |
| 0.238 | 提前寄来的问话单 | 区里寄来的问话单 |
| 0.236 | 一张给熟人的椅子 | 档案室的空编制 |
| 0.229 | 舞会上的手套 | 乐队奏到第三支曲子 |
| 0.228 | 院子门口的石灰线 | 村口的石灰线 |
| 0.226 | 股金簿上的最后一个名字 | 股金簿上的名字 |
| 0.226 | 厨房桌上的第三副碗筷 | 星期天的第三副碗筷 |
| 0.221 | 学费、房租和最后一学期 | 论文、夜班和最后一学期 |
| 0.220 | 推荐信上的名字 | 推荐信上的图章 |
| 0.216 | 洗衣盆边的眩晕 | 洗衣盆边的验孕布 |

## Metadata schema

Each record has: `premise`, `situation`, `motivation`, `conflict`, `twist`, `outcomePattern`, `tone`, `setting`, `motifs` and `searchText` (searchText is omitted from JSON for size; the CLI recomputes it from the runtime).

Use semantic similarity as a prompt for divergence, not a prohibition. A shared motif is allowed if the conflict, motivation, twist or outcome pattern differs.
