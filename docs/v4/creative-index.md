# Creative Index

Generated: 2026-11-06T17:52:32.336Z

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
| States | 99 |
| Kernels | 1973 |
| Generated packs | 25 |
| Creative records | 1973 |

## Stage coverage

| Stage | Kernels |
|---|---:|
| adulthood | 1669 |
| adolescence | 165 |
| childhood | 82 |
| elderhood | 53 |
| infancy | 4 |

## Underused motifs

| Motif | Kernels |
|---|---:|
| office | 240 |
| travel | 231 |
| debt | 162 |
| secret | 155 |
| marriage | 140 |
| migration | 128 |
| mistaken_identity | 85 |
| inheritance | 82 |
| birth | 67 |
| love | 65 |
| escape | 55 |
| betrayal | 51 |
| luck | 46 |
| supernatural | 46 |
| revolution | 21 |

## Tone distribution

| Tone | Kernels |
|---|---:|
| dark | 895 |
| historical | 753 |
| warm | 547 |
| gritty | 340 |
| suspense | 154 |
| political | 144 |
| everyday | 139 |
| melancholy | 131 |
| religious | 70 |
| absurd | 61 |
| romantic | 59 |
| triumphant | 33 |
| eerie | 30 |
| erotic | 25 |
| comic | 19 |

## High-similarity pairs

Pairs >= 0.20: **43**. These are candidates for an editor, not automatic rejects.

| Score | A | B |
|---:|---|---|
| 0.612 | 下班后的两小时 | 夜校的制图桌 |
| 0.468 | 不能带到饭桌上的名字 | 借来的房间 |
| 0.397 | 厂里送来的工具袋 | 双人床空出的那一半 |
| 0.369 | 解剖教室的福尔马林 | 解剖教室的福尔马林味 |
| 0.314 | 客房床垫下的戒指 | 客房床垫下的信 |
| 0.311 | 少了两克朗的信封 | 信封里少了三克朗 |
| 0.287 | 伤残抚恤窗口的旧军牌 | 伤残抚恤窗口的号码 |
| 0.278 | 毕业照上的空椅子 | 学费、房租和最后一学期 |
| 0.277 | 凌晨三点的铅尘 | 凌晨三点的铅版 |
| 0.277 | 车站长椅上的两只手套 | 车站长椅上的两个人 |
| 0.272 | 研讨课上的第七页 | 研讨课上的第二排 |
| 0.269 | 名单上的空白 | 名单上的一道横线 |
| 0.267 | 给床上的老人翻身 | 给床上的老人翻个身 |
| 0.261 | 黎明前的手枪 | 黎明前的两把手枪 |
| 0.254 | 三个师傅，一双手 | 沿街敲门 |
| 0.254 | 半夜的敲门 | 半夜的敲门声 |
| 0.247 | 第二次戴上的戒指 | 旧戒指第二次戴上 |
| 0.245 | 车站长椅上的两只手套 | 公园长椅上的两只手套 |
| 0.240 | 师傅留下的那把尺 | 师傅留下的那把刨子 |
| 0.240 | 门口多出来的一双小鞋 | 门口多出来的一双鞋 |
| 0.238 | 一张给熟人的椅子 | 档案室的空编制 |
| 0.237 | 借书卡上的第三个名字 | 借书卡上的地址栏 |
| 0.229 | 厨房桌上的第三副碗筷 | 星期天的第三副碗筷 |
| 0.228 | 舞会上的手套 | 乐队奏到第三支曲子 |
| 0.227 | 院子门口的石灰线 | 村口的石灰线 |
| 0.225 | 股金簿上的最后一个名字 | 股金簿上的名字 |
| 0.221 | 学费、房租和最后一学期 | 论文、夜班和最后一学期 |
| 0.221 | 推荐信上的名字 | 推荐信上的图章 |
| 0.216 | 洗衣盆边的眩晕 | 洗衣盆边的验孕布 |
| 0.215 | 报纸第二版的照片 | 报纸第二版的姓名 |

## Metadata schema

Each record has: `premise`, `situation`, `motivation`, `conflict`, `twist`, `outcomePattern`, `tone`, `setting`, `motifs` and `searchText` (searchText is omitted from JSON for size; the CLI recomputes it from the runtime).

Use semantic similarity as a prompt for divergence, not a prohibition. A shared motif is allowed if the conflict, motivation, twist or outcome pattern differs.
