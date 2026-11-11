# v4 实现与验收报告

日期：2026-11-12（滚动更新；最近一轮为 Phase 23）
范围：`simulator-1031` 断代重写的 Vienna 1912 垂直切片及其通用人生延伸。
重要：本报告只记录 v4 实际运行过的证据。旧 v1–v3 的 318 项测试、长跑和备份恢复数字属于旧架构，不能替代 v4 验收。

> 2026-11-12 Phase 23 更新：Blood, Desire & History。内容库 **119 states / 2,178 kernels / 35 packs**；新增 `pack-phase23-high-stakes`（18 kernels/2 states/72 outcomes/97 adaptive/15 checks/18 conditional/252 scenes）。事件 outcome title 进入 runtime；API 标题优先级修复；122 个旧内容标题 overlay；日志 3 行折叠 + 展开 + 细节。新增 `packages/v4/political-world/`：**93 polities / 33 tensions / 42 sources / 107 ISO**，1912/1918/1938/1945/1955/1991 快照，月粒度关键转折；历史地图用现代几何 + 政权归属叠层（近似）。新增 `packages/v4/world-news.ts` + `v4_world_news`：75 anchors / 30 ambient / 15 rumors，reference/simulation/ambient/rumor 四类 provenance；UI 世界公报。自然 A/B/C：64,259 events / 4,192 focal；**adult drama 95（3.07%）**；p23 focal 38（0.91%）；17/27 lives with adult drama；repeatRate **0.2258**；p23 world 502。浏览器 Phase23 test 4.1s；`pnpm test` **103 files / 588 pass / 37 skip（625）**；build 3.06s；35 packs validate。Critic 修订前 **Scene 26/30、Life 20/30**。完整报告见 [phase-23-report.md](phase-23-report.md)、[design](phase-23-design.md)、[dramatic content](phase-23-dramatic-content.md)、[political world](phase-23-political-world.md)、[historical geography](phase-23-historical-geography.md)、[world news](phase-23-world-news.md)、[playtests](phase-23-playtests.md)、[critique](phase-23-critique.md)。

> 2026-11-09 Phase 22 更新：Creative Overhaul。内容库 **117 states / 2,160 kernels / 34 packs**；新增 `pack-dramatic-overhaul`（20 kernels/2 states/100 adaptive/20 checks/20 conditional/280 scenes）与 `pack-early-life-drama`（16/2/49/8/16/224），3 个早期 base scenes、4 个 base retrofit，`high_drama` ×1.9 / `drama` ×1.4。自然 A/B/C：62,267 events / 4,104 focal；总 drama 144（3.51%），其中 early 119、adult 25（0.61%）；early-life 1,283 world（2.06%）；4/4 新 State；repeatRate 0.2613。原创 200×240 分层 SVG 半身像替换 LPC。浏览器 Phase22 test 9.4s。Critic 修订前 Scene 24/30、Life 20/30；Visual Critic 4.5/10、4/10。完整报告见 [phase-22-report.md](phase-22-report.md)、[creative direction](phase-22-creative-direction.md)、[dramatic content](phase-22-dramatic-content.md)、[visual design](phase-22-visual-design.md)、[playtests](phase-22-playtests.md)、[critique](phase-22-critique.md)。

> 2026-11-08 Phase 21 更新：把“能不能玩”作为验收目标。修复左侧肖像 flex 压缩成 2px 的消失 bug；260px 肖像舞台、192×192 Canvas、裁边 LPC 分层纸娃娃、年龄缩放与职业配件。右栏从维也纳示意图换成真实 `countries.geojson` 世界地图（177 轮廓、缩放/拖动、维也纳/克洛斯特新堡、人物脉冲）。出生文本加入父母/职业/家庭现金债务（兄弟姐妹/拥挤细节可能被截断）；新增 5 个通用早期人生场景，Engine 7 年 cohort 16 条儿童/家庭事件，浏览器 e2e 30 秒内看到第 3 条日志。注册 `pack-dramatic-lives`：16 kernels / 2 states / 71 adaptive contexts / 16 checks / 16 conditional / 224 scenes。规模 **113 states / 2,124 kernels / 32 packs**。自然 A/B/C：61,718 events / 5,123 focal；drama 203 world（0.33%）/ 22 focal（0.43%）；repeatRate 0.2423；两个新 State 出现。浏览器 `tests/v4-browser/phase21.spec.ts` 通过（9.5s）。完整报告见 [phase-21-report.md](phase-21-report.md)、[experience audit](phase-21-experience-audit.md)、[visual design](phase-21-visual-design.md)、[dramatic content](phase-21-dramatic-content.md)、[playtest](phase-21-playtest.md)、[critique](phase-21-critique.md)。

> 2026-11-07 Phase 20 更新：内容库从 **107 / 2,060 / 29** 扩展到 **111 states / 2,108 kernels / 31 packs**；新增 2 个 Adaptive Pack（48 kernels / 4 states）与 8 个旧 Kernel 的 AdaptiveContext retrofit（25 contexts）。`AdaptiveContext` 不 gate，只改选择权重和 d20 检定；受控实验 A–D 4/4（同一面试 fame DC 9 success vs scandal DC 15 failure、curse-lifted、same-key、re-accused）。自然 A/B/C：65,137 events / 5,593 focal；新 Pack 1,227（1.88%）、focal 97（1.73%）、adaptive-capable Kernel focal 125（2.23%）；4/4 新 State 出现；repeatRate 0.2290（高于 Phase 19 的 0.2104，真实回归）。`pnpm test` 100 files / 567 pass / 37 skip；build、typecheck、31 packs validate 通过。完整报告见 [phase-20-report.md](phase-20-report.md)、[design](phase-20-design.md)、[content](phase-20-content.md)、[critique](phase-20-critique.md) 与 [ADR-020](../decisions/ADR-020-adaptive-storylets-and-living-consequences.md)。

> 2026-11-05 Phase 15 更新：新增 State 机制层（48 个定义、state_add/remove/parameter/transition、slot、typed links、d10/d20 检定、tick/reaction/transition、真实 Position 与 organization_found）。内容工厂含 schema/类型/编译可达性验证、registry、provenance 和确定性 fallback；真实模型 API 在本次环境返回 HTTP 403，因此实际 pack 由 LLM 子代理撰写并离线验证，不能宣称运行时模型内容工厂已成功调用。新增 446 条历史参考记录（79 国、166 城、93 人、98 事件、10 个明确 fiction hook、517 来源）、五年历史 review 与 Macro Director 快照。60 年两个 seed：16,438/18,555 事件，386/439 条 state facts，254/278 ticks，24/23 reactions，13/21 transitions，17/20 种 state，16/14 个 Position。A–F 实验 6/6 通过。`pnpm test` 88 files / 517 pass / 36 skip；v4 39 files / 237 pass / 8 skip；build 通过；20k 性能基线 4.28 s/年、1% state 6.41 s/年、5% state 8.29 s/年。PostgreSQL 与真实模型调用仍未验证。完整报告见 [phase-15-report.md](phase-15-report.md)。


> 2026-11-06 Phase 17 更新：内容库从 52 states / 1,652 kernels / 6 packs 扩展到 **79 states / 1,740 kernels / 15 packs**；新增 8 个主题 pack（life-course、desire-scandal、crime-justice、migration-belonging、faith-miracles、fame-art、absurd-fortune、work-craft）与真实模型 Content Factory pack `pack-factory-education`。新增 generated Content Catalog、pack metadata、consumer/creation QA 测试、crossPack/contentSamples 诊断。真实模型 `/models` 200、chat 成功；education brief 8,653 tokens 1 次通过并注册，power brief 12,465 tokens 两次失败后 fallback（不冒充成功）。自然人生 final-f：45 年 18,134 events / 347 persons / 51 distinct states / repeatRate 0.1965；final-c 21,173 / 52 states；final-e 20,790 / 50 states。独立 Critic 修订前主样本 **16/30**（Phase 16 18/30），核心批评是关系/子女 slot machine、死状态、重复率上升、无 horizon、组织重复。测试 89 files / 526 pass / 37 skip；15 packs validate；PG state/macro 2 passed；e2e 1 passed。完整报告见 [phase-17-report.md](phase-17-report.md)、[critique](phase-17-critique.md)。仍未完成：new→new 组合弱、签名状态可达性、家庭连续性、历史日期、horizon、稳定批量 Content Factory、20k 新内容 profile。

> 2026-11-06 Phase 16 更新：不再扩 State 数量，而是让已有机制进入自然人生。新增 state/position opportunity lane（cast 预检、最低 rate 0.35、每人年一次）、`autoAttachOnBirth`、通用 `child` role、StateInstance 级 tick/reaction 绑定、最近有效 Position 的 `$positionOrg`、place/region state anchor 与 1945 liberation 移除占领。自然 run `phase16-final-c`：40 年 14,435 事件 / 342 人 / 146 births / 132 deaths / 30 distinct states / 972 ticks / 559 reactions / 318 resolved state opportunities；office pack 85 events / 25 Position 创建 / 10 结束；family pack 141 states / 24 child-leaves / 6 returns；curse 在 1931 对真实 betrayer 提交 health -0.18 + condition；history occupation 11 states 全部结束。`phase16-final-a` 50 年 22,102 事件 / 33 Position 创建 / 10 curse reactions。真实模型 `/models` 200、chat 403（无 active Go subscription），两个新 pack 是离线 LLM 子代理创作并验证；PostgreSQL 18.6 state persistence + macro store 2/2、真实 stop/start 重启恢复 ok=true、e2e 1 passed；`pnpm test` 88 files / 521 pass / 37 skip；20k baseline 4.57 s/年、1% 6.63、5% 10.28。仍未完成：widow/inheritance 内容可达性、office 持续下游、love/knowledge/craft 愿望、生产规模 DB/API、runtime LLM worker。完整报告见 [phase-16-report.md](phase-16-report.md)。

> 2026-11-04 Phase 11 更新：新增 Context × Milieu × Plot Kernel 组合编译层；150 个 Kernel（100 Event / 50 Task）、10 Context、12 Milieu、98 variants、450 base outcomes。默认 Vienna 年编译 255 Scene / 151 Task，跨四情境 996 个 compiled scene IDs；35 年 5,027 事件中 293 composed events、56 个 Kernel 实际触发。1.265M 是 naive 上界，不是已验证实例。88 年 playtest 23,802 事件 / 2,965 Task / 27 repeat offenders；20k 合成人口 composition 仍约 252 秒/年。Critic 20 样本 9 通过 / 11 失败，文学质量未通过。完整报告见 [phase-11-report.md](phase-11-report.md)。

> 2026-11-03 Phase 10 更新：新增 24 个手工重大事件 + 6 个手工任务、8 个真实模型生成 Family（48 nodes）；Phase 10 共 78 nodes / 233 outcomes，生成 tokens 141,933（含失败重生成约 171,333）。总池 140 Task / 333 Event definitions（254 generated + 79 authored），共 473 个可执行定义。45 年审计 employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→125；Critic 13 样本首轮 5 通过，定向改写后 11 个 P0 节点全部 ≥36/50（2 个窄过）。88 年 playtest 27,510 事件 / 3,490 Task / 44 重复 offender / 0 未解析 token。观察器新增稳定 Person/Event/Process ID 高亮、Hover 档案和事件/进程 modal，e2e 通过。完整报告见 [phase-10-report.md](phase-10-report.md)。不是百万/千级定义库，教育/出生覆盖下降，制度原语仍有缺口。

> 2026-11-03 Phase 9 更新：内容池从 Phase 8 的 50 Task / 104 generated event scenes 扩展到 **110 Task / 206 generated event scenes**。真实模型生产 27 Family / 162 nodes（60 Task + 102 Event）、487 outcomes、974 narration variants；最终发布 pack 的生成 tokens 530,721，含被丢弃重生成的累计 1,123,277；0 精确/近似重复，27/27 发布。3 seed × 35 年同 Engine 对照：在世人物平均 Task 候选 1.25→6.83、Event 候选 11.80→24.01、Task 事件 580→804、不同 Task 34→64、Task 候选为 0 的人 72→22.67；每年耗时 105.8→139.8 ms。45 年 treatment：11,349 事件 / 1,516 Task 事件 / 73 种 Task / 7 historical developments（control 9）。88 年 playtest：31,567 事件 / 3,673 Task 事件 / 0 未解析 token / 0 死亡后事件；control 29,737。20k 合成人口最坏 Task 选择 2,363 ms/年、400 MB。完整报告见 [phase-9-report.md](phase-9-report.md)。这不是千级/百万级内容库，也不是 20k 完整 DB/API 生产验收。

> 2026-11-03 Phase 8 更新：内容驱动 Task Pool (`TaskDefinition`/`taskUtility`/`auditCandidatePools`) 已接入；真实模型发布 48 个 task（另 2 个 authored 补充），144 outcomes/288 narrations，148,566 tokens（含重试）；同一世界五种人生产生 690 task events、36/50 unique tasks；88 年 treatment 24,991 events / 159 repeat offenders vs control 21,021 / 325。证据见 [phase-8-report.md](phase-8-report.md)、[phase-8-content-batch.json](phase-8-content-batch.json)、[phase-8-candidates.json](phase-8-candidates.json)、[phase-8-lives.json](phase-8-lives.json)。

> 2026-11-03 Phase 7 更新：确定性自主行动 (`agency.ts`)、组织主动行为、底部历史进程、进程 `suspended`/分裂、持久 `MacroState.legacy`、Director 可执行 `actions`、legacy 生活内容、canonical 死亡时序已接入。自由演化 A–F 证据见 [phase-7-experiments.json](phase-7-experiments.json)；真实 Director 6,143 + 10,263 tokens，提出 6 条行动、5 条执行、1 条无进程 reform 跳过，见 [phase-7-director-demo.json](phase-7-director-demo.json)；Content Author 9,674 + 9,125 tokens，见 [phase-7-content-author.json](phase-7-content-author.json)。完整验收见 [phase-7-report.md](phase-7-report.md)。

> 2026-11-02 Phase 6 更新：可参与历史进程 (`WorldDevelopment.historical`)、4 位维也纳真实人物、13 个历史场景、Director historicalMoves、真实 Content Author 历史内容、战争/疫情/反事实测试已接入。88 年审计 381 人/217 在世/87.99 事件每年，历史事件 48 条；真实 Director 4,506 + 8,158 tokens，Content Author 8,744 tokens。验收见 [phase-6-report.md](phase-6-report.md)；这仍不是全球历史/20k 生产验收。

> 2026-11-02 可玩版本更新：家庭容量/分户、死亡后伴侣终止/监护补选、出生愿望确定性回退、已故年龄/死因/标题投影、1946–1999 战后 16 场景与 24 条时代记录已接入。88 年审计 420 人/236 在世/111.26 事件每年；8 人物 88 年试玩 373 人/199 在世/最大在世家庭 12。尚未完成的 canonical 时间顺序、多地区 Director、20k DB/API、通用内容工厂仍明确列出。验收见 [playable-report.md](playable-report.md)。全量测试数字以最后一轮为准。
> 2026-11-02 Phase 5 更新：具名化审计修复（318→63，不再机械触顶）、20k 分阶段性能（简化内容 0.59s/年）、组织生命周期、月度急性风险、frail_body/social_insight 真实效果已接入。Phase 5 验收见 [phase-5-report.md](phase-5-report.md)；完整复盘见 [phase-3-4-retrospective.md](phase-3-4-retrospective.md)。全量 377 项通过，构建和浏览器通过。

> 复盘与偏差分析见 [phase-2-retrospective.md](phase-2-retrospective.md)。Phase 2 的工程交付通过测试，但人口/历史模型未成立；该文记录了原因与 Phase 3 方案。

## 状态总表

| 项目                 | 状态               | 证据 / 边界                                                                                                                                                                  |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v4 领域契约          | 完成               | `packages/v4/domain.ts`；Person/Household/Place/Organization/Position/Project/Interaction/Relation/Knowledge/EventFact/SceneDefinition/SceneInstance；`assertWorldV4` 不变量 |
| 多事件年度运行时     | 完成               | rate/weight、每年多事件、followup 队列、请求/回应、fact-tag 订阅、lifecycle 优先；29 项 engine 测试                                                                          |
| Vienna 作者场景包    | 完成               | 19 个场景、10 家庭、26 人、23 地点、6 组织、20 来源；10 项测试通过                                                                                                           |
| 通用人生场景包       | 完成（切片级）     | 19 个场景；5 项内容测试 + 3 项玩家人生集成测试通过                                                                                                                           |
| 家庭/生育场景包      | 完成（自动场景）   | 8 个场景；3 项测试通过；新生儿是真实 Person，含父母/监护人/家庭/出生事件                                                                                                     |
| 1912–1918 作者人生链 | 完成               | 2 项 slice 测试通过；Anna/Josef 工伤、房租、学校、动员、流感                                                                                                                 |
| v4 PostgreSQL 存储   | 完成               | `v4_*` 实体/事件表、出生请求、出生契约队列；`saveV4World` revision 检查                                                                                                      |
| v4 API/认证/SSE      | 完成               | Fastify、scrypt 密码、cookie session、公开事件过滤、人物日志权限；world 分页、person/event detail、search、坏 cursor 400                                                     |
| v4 模拟器            | 完成               | 出生落地、愿望入队、年度推进、经济、2000 年明确终点                                                                                                                          |
| v4 出生契约 LLM      | 完成（2.0）        | Birth Contract：privateGoal/focus/capability/conditions/limits/costs；服务端复核；8 项 contract 测试；真实模型调用约 1,343 tokens                                            |
| 三栏观察器           | 完成               | 人物/家庭、个人日志、维也纳地图、时代/公开事件、出生页、等待页                                                                                                               |
| 年份推进与恢复       | 完成（小规模）     | 开发世界实际 1912→1913→… 连续推进；刷新从 PostgreSQL 读取                                                                                                                    |
| 完整人生经济         | 部分               | 工资/租金/食物/债务 + 显式月度外部营收/收入；无市场、税收、驱逐                                                                                                              |
| 婚姻/生育/代际       | 部分完成           | 玩家后代和初始人口可求偶/同居/生育；离婚、同性关系、家庭灭绝现金继承第一版；无玩家选择、再婚链、遗嘱/债务分配                                                                |
| 玩家间持久互动       | 未完成             | Relation/Interaction 可存储，但没有跨玩家场景或请求-答复 UI                                                                                                                  |
| LLM 场景/选择决策    | 未完成             | 引擎保留同步 policy 接口；默认确定性权重                                                                                                                                     |
| History Director     | 未完成             | 只有内容包中的公开时代记录和 pressures                                                                                                                                       |
| 内容工厂             | 完成（离线）       | 26 族 / 104 场景 / 519 narration；Phase 7 新增 2 族 legacy 内容；真实模型生成；审计 24/26 族触发（战争余波需实际战争进程）                                                   |
| 读取路径与规模       | 部分完成           | 世界摘要/人物 keyset 分页/单人详情/搜索；1k/5k PostgreSQL 实测；未做 20k 或并发 API 压测                                                                                     |
| 宏观多地区/全球      | 部分               | lower-austria + klosterneuburg 两地区数据/迁移；未做多地区长期真实 Director；不能宣称全球                                                                                    |
| 内容覆盖审计         | 完成               | 80 年：3,657 事件、279 focal、358 causal、75 出生；零事件年份 0；未解析 token 0；顶层场景占比 7.9%                                                                           |
| 可玩闭环             | 完成（单世界切片） | 注册→出生→家庭/关系/工作/死亡→2000 horizon；浏览器 e2e 通过；88 年试玩报告见 [playable-report.md](playable-report.md)                                                        |
| Historical Process   | 完成（通用最小）   | `WorldDevelopment.historical`；阶段/参与/metrics/组织/结果；战争 18 参与者、疫情 13 参与者                                                                                   |
| 真实历史人物         | 完成（4 人）       | Freud/Adler/Kraus/Schnitzler；稳定 Person/QID/来源/活动窗口；真实死亡只作参考                                                                                                |
| 历史参与与因果       | 完成（垂直）       | 地点/组织/费用/关系渠道；participation/influence/knowledge effects；反事实 mobilizing→institutionalizing                                                                     |
| 历史 Director/内容   | 完成（真实调用）   | 4,506 + 8,158 tokens、historicalMoves；Content Author 8,744 tokens、4/12/24、实际触发 2 条生成历史事件                                                                       |
| Task Pool            | 完成（内容驱动）   | `TaskDefinition` + `taskUtility` + `auditCandidatePools`；50 个 Task；无需为新行为改 Engine switch                                                                           |
| 真实 Task 内容       | 完成               | 8 族/48 个模型生成 Task + 2 authored；144 outcomes/288 narrations；148,566 tokens；0 语义重复                                                                                |
| 五种差异人生         | 完成               | 同一世界 45 年；贫穷学徒/富裕青年/医生/活动者/特殊能力；690 task events、36/50 unique tasks；历史人物接触与 legacy 并存                                                      |
| Phase 9 内容池       | 完成（真实模型）   | 27 Family / 162 nodes / 60 Task + 102 Event；487 outcomes / 974 narrations；发布 27/27；最终 pack tokens 530,721，累计 1,123,277 |
| Phase 9 有效候选     | 完成               | 3 seed × 35 年：Task 候选 1.25→6.83、Event 11.80→24.01、Task 事件 580→804、不同 Task 34→64、Task 候选为 0 的人 72→22.67 |
| Phase 9 长期人生     | 完成（部分）       | 45 年 11,349 事件 / 1,516 Task / 73 种 Task / 7 developments；control 9 developments；Task 仍替代部分 Agency 行动 |
| Phase 9 88 年审计    | 完成               | playtest treatment 31,567 事件 / 3,673 Task，control 29,737；audit 0 未解析 token、0 死亡后事件、0 零事件年；生成内容 share 65.5% |
| Phase 9 性能         | 完成（有限规模）   | 160 人真实内容 105.8→139.8 ms/年；20k 合成 Task 最坏 2,363 ms/年、400 MB；不是 20k 完整内容/DB/API |
| Phase 10 内容池     | 完成（真实模型）   | 24 authored events + 6 authored tasks + 8 generated families（48 nodes）；Phase 10 78 nodes / 233 outcomes；总池 140 Task / 333 Event / 473 可执行定义 |
| Phase 10 重大审计   | 完成（45 年）       | employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→125；education 29→10、birth 80→50 |
| Phase 10 文学审校   | 完成（抽样）       | 首轮 13 样本 5 通过 / 8 失败；定向改写后 11 个 P0 节点全部 ≥36/50（2 个窄过） |
| Phase 10 语义 UI    | 完成               | 稳定 Person/Event/Process ID；人物/事件/进程高亮、Hover 档案、事件/进程 modal；e2e 通过 |
| Phase 10 长周期     | 完成               | 88 年 27,510 事件 / 3,490 Task / 44 repeat offender；0 未解析 token、0 死亡后事件 |
| Phase 11 组合层     | 完成               | Context × Milieu × Plot Kernel → Scene/Task；不新增执行器；稳定 `kernel::context::milieu` ID 可回放 |
| Phase 11 Kernel     | 完成（150）        | 100 Event / 50 Task；98 variants；450 base outcomes；5 个领域 |
| Phase 11 容量       | 完成（透明上界）   | naive 1,265,143；默认编译 255 Scene / 151 Task；跨四情境 996 compiled scene IDs；35 年 293 composed / 56 kernels |
| Phase 11 性能       | 部分完成           | 160 人真实内容 147.7 ms/年；1k 535 ms、5k 10.4s、20k 252.7s/年；20k 仍是瓶颈 |
| Phase 11 文学       | 未通过             | Critic 20 样本 9 通过 / 11 失败，均分 31.5/40；性别代词/货币/集体效果/条件/重复缺口 |
| Phase 11 浏览器     | 完成               | 组合事件沿用 semantic UI；e2e 1 passed |
| Phase 10 性能       | 完成（有限规模）   | 160 人真实内容 96.3→149.9 ms/年；20k 合成 140 Task 2,485 ms/年、393 MB；非 20k 完整 DB/API |
| Phase 9 浏览器       | 完成               | 三栏布局未改；`pnpm build` 通过，Playwright v4 1 项通过（9.3s） |
| 候选审计             | 完成               | 按人物年龄/职业/教育/关系/能力统计；50 个定义对具体人物仅 2–7 个有效候选；事件候选 3–34                                                                                      |
| 重复与叙事           | 部分完成           | treatment 159 vs control 325 prefix offenders；LifePassage 从已提交事实组织；仍有长期邻里/医疗重复，不能禁止真实持续照护                                                     |
| 自主行动循环         | 完成（确定性）     | `agency.ts`；人物/组织每年最多一次；历史人物、组织领袖、普通成年人均可行动；儿童不执行成人组织行动                                                                           |
| 组织主动行为         | 完成               | 招募/会议/会费/出版/互助/成立运动；真实 membership/treasury/project/relation/event；正式或非正式领袖                                                                         |
| 自下而上历史         | 完成（自由演化）   | 1912–1950 自由运行；印刷工会 1915 由持续行动生成 `development:initiative-org-printers-union-1915`，Director 未预先批准                                                       |
| 进程生命周期/遗产    | 完成（通用）       | end 为复查而非强制结束；suspended/declining/repression/institutionalizing/split/ended；legacy 改变 baseline、事件权重和内容条件                                              |
| Director actions     | 完成（真实调用）   | 6,143 + 10,263 tokens；6 条 organize/publish/relief/recruit/reform 提案，5 条执行、1 条 reform 无进程被跳过；pending queue + event 幂等                                      |
| canonical 时序       | 完成（新提交）     | 死亡日期锚定最后已提交人物事件；死亡事件日期同步；死亡后行动 0；原因不晚于后果；旧档保留                                                                                     |
| Legacy 生活内容      | 完成（真实生成）   | reform 9,674 tokens、war aftermath 9,125 tokens；各 4/12/24；跨代实验 53 条 vs 对照 0 条；战后 23 条                                                                         |
| 战后生活内容         | 完成（16 场景）    | 1946–1999 战后场景与 24 条时代记录；独立内容测试通过                                                                                                                         |
| 出生无模型回退       | 完成               | 五种白名单能力关键词回退；`deterministic-fallback` 设置 compiledAt，不伪造异能                                                                                               |
| Birth Contract 写入  | 完成               | `birth-contract-store.ts` 事务锁 + revision；`compiledAt` 防止重复应用；worker 已切到完整 contract                                                                           |
| 生产部署             | 未完成             | 仅本地 `pnpm dev`；Compose 未在 v4 实测                                                                                                                                      |

## 实际执行的命令与结果

### 类型检查

```text
pnpm typecheck
→ tsc --noEmit，退出码 0
```

### v4 测试

Phase 11 最终 v4 专项：

```text
pnpm exec vitest run tests/v4-*.test.ts
→ Test Files 31 passed | 2 skipped (33)
→ Tests 183 passed | 8 skipped (191)
→ 20.25s
```

Phase 11 最终全量仓库测试（包含冻结的 v1–v3 测试与 v4）：

```text
pnpm test
→ Test Files 80 passed | 7 skipped (87)
→ Tests 463 passed | 36 skipped (499)
→ 160.97s
```

旧测试通过不等于 v4 完成；v4 的独立证据是专项、长期试玩、浏览器与真实模型调用。

### 浏览器验收

```text
pnpm test:e2e --config playwright.v4.config.ts
→ Running 1 test using 1 worker
→ ✓ register, give birth, read a concrete log and inspect the map (9.1s)
→ 1 passed (12.6s total)
```

`pnpm build` 同时通过（Vite production bundle，2.95s）。

该流程使用独立 `living_world_e2e` 数据库，实际：

1. 注册随机用户名；
2. 填写出生表单并提交；
3. 在出生等待期间点击“先浏览世界”；
4. 等待异步出生完成并自动选中自己的孩子；
5. 检查出生日志、用户名、Anna Bauer 切换、地图 pin 与地点人物面板；
6. 断言无 console/page error。

### 真实模型调用

调用 `compileBirthWish`，模型 `deepseek-v4.1-flash`，返回严格 JSON：

```json
{
  "interpretation": "在这个排字工家庭里，识字不是装饰，而是从铅字与油墨之间挣出一条不那么伤手伤肺的路。……",
  "focus": "education",
  "traitDeltas": {
    "ambition": 0.03,
    "tradition": -0.02,
    "openness": 0.06,
    "conscientiousness": 0.04
  },
  "taboo": "她可能不愿被反复提醒‘为什么留下’……"
}
```

- 单次 usage：548 tokens。
- 验收期间共 4 次真实愿望调用（3 次归档世界回填 + 1 次活动世界出生），约 2,174 tokens；不是 mock。
- worker 端到端在活动世界把读法写入人物 `lifeContract` 并递增 revision，API/UI 能读到。
- 这**不是**完整出生契约：没有条件式潜质、私有系统、异能边界或长期策略编译。

## 实际生成的历史样本

活动世界或测试脚本实际产生的例子（未经润色）：

- 1912：`Klara在Bauer-Wohnung, Leopoldstadt出生。Katharina Bauer在生产后抱着孩子；这间住处现在住了5口人。`
- 1913：`奶水不够，Katharina Bauer把黑面包掰碎泡在热水里，加一点糖喂给Klara。孩子夜里哭得更久，肚子鼓胀。`
- 1914：`Klara烧了两夜。Katharina Bauer用湿布擦额头，天亮时体温退下去，孩子开始要水喝。`
- 1918：`Anna 把 Elisabeth 抱到厨房，整夜给她擦身、喂水；她自己只喝盐水。Elisabeth 退烧了，Anna 咳了三个星期……`
- 1914 作者链：`Winter 不愿再保留受伤的 Josef，把岗位给了 Otto 的妻弟；Josef 同一天收到征召令，去兵营报到。`
- 通用成人链：`Klara在换纸时左手被压板夹住。工友关掉机器，Buchdruckerei Winter & Söhne的工头拿来急救箱……`
- 1938：`Klara在登记桌旁说了句“这里以前不是这样”。Gustav Berg记下地址，当晚两个穿制服的人来敲门……`
- 1934：`Elisabeth Bauer和Franz Lechner在利奥波德城的教区教堂举行婚礼。Franz Lechner把一只箱子搬进Bauer-Wohnung……`
- 1935：`Elisabeth Bauer在Bauer-Wohnung, Leopoldstadt生下一个男婴，取名Hermann Lechner。`
- 1950：`Helene Weiss在Bauer-Wohnung, Leopoldstadt生下一个女婴，取名Anna Winter。`
- 死亡：`Klara因身体衰竭去世，死亡原因没有更完整的医疗记录。`

这些文本只来自已提交的 scene outcome 或系统死亡事实，不是日志模板拼接。通用场景的姓名/地点由 `{subject}`、`{mother}` 等 token 在当时解析。

## 经济实测

用 seed + 通用场景连续推进 30 年（经济开启、`maxScenesPerPerson=1`）：

```text
1913 alive 23 events 7 shortage 0
1914 alive 23 events 4 shortage 0
1915 alive 23 events 3 shortage 12
1916 alive 19 events 6 shortage 9
1917 alive 19 events 3 shortage 0
1920 alive 19 events 4 shortage 0
1930 alive 19 events 7 shortage 0
1938 alive 19 events 16 shortage 0
```

- 组织月度外部营收与家庭月度外部收入是显式建模输入；诊断 `revenue`/`transfers` 会累计。
- 1915–1916 出现真实食物短缺与死亡；不是所有家庭都繁荣。
- Bauer 家庭在工伤后可能长期靠 Katharina 的缝补/出租床铺收入和债务滚动维持，房东不驱逐；这是缺口。
- 组织没有完整生产/销售/税收链，富余家庭现金会长期累积。

## 运行方式

```sh
pnpm install --frozen-lockfile
pnpm db:local
pnpm dev
```

`pnpm dev` 启动 v4 API（3001）、v4 模拟器、v4 出生 worker、Vite（5173）。首次启动自动迁移并播种 Vienna 1912。`pnpm v4:reset` 归档当前世界并另起新切片。

## 未完成/阻塞

1. **婚配不是玩家选择**：求婚/同居/生育由加权场景自动发生；没有求婚对话、拒绝/接受、离婚、再婚、同性关系路径，也没有完整嫁妆/继承/住房容量规则。
2. **无完整出生契约**：只有愿望读法和 ±0.08 性格微调；没有条件式潜质、能力边界、私有系统、禁忌机制。
3. **无跨玩家互动**：没有请求/答复 UI、Scene 选角跨玩家、Relation 驱动的共同场景。
4. **无内容工厂/导演**：没有 LLM 自动编译新场景入库；内容包是手写 TS。
5. **无万人规模验证**：v4 存储按实体表存 JSONB，没有做 10k 人物/tick 压测或恢复压测。
6. **无生产部署**：本地启动已验证；Compose/公网/密钥注入未验收。
7. **旧代码未删除**：v1–v3 冻结在仓库，`pnpm dev` 不启动；旧测试仍计入 `pnpm test`。
8. **年份粒度**：一次推进一年，场景日期多为 1 月，不是逐月人口账本。
9. **`followupSceneIds` 未调度**：字段存在，引擎没有按它延迟触发后续场景。

## 结论

Vienna 1912 垂直切片现在是一个真实可运行的最小 v4：有持久化、单写者、真实角色/地点/因果、可读个人日志、可推进年份、真实模型愿望读法和三栏观察器。它还不是 `simulator-1031` 的完整成品；主要缺口是婚配选择与完整代际、完整出生契约、跨玩家互动、内容工厂/导演和规模验证。任何把这些缺口说成“已完成”的说法都不符合本报告。

## Phase 12（2026-11-04）— Event Recipes / 事实驱动事件

完整报告：`docs/v4/phase-12-report.md`；文学批评：`docs/v4/phase-12-critique.md`；机制批评：`docs/v4/phase-12-mechanics-critique.md`。

| 项 | 实测 |
|---|---|
| 内核 | 1,011（960 event + 51 task），31 域 |
| 分支 | 740 variants；692 个带人物条件的 outcome |
| 编译 | Vienna 1912：2,551 scenes + 191 tasks，8,188 outcome paths；四情境 5,960 distinct compiled scene IDs |
| 百万容量 | 3,000 个合成有效人物档案，1,073,786 个通过真实资格/选角/条件检查的 person×scene×outcome 情境 |
| 实际事件 | 88 年 playtest：20,186 events，443 composed events，203 composed kernels |
| 性能 | 20k：2,515 ms/年（composed-only） / 2,760 ms/年（原 Phase 11 benchmark）；397–444 MB heap |
| 验证 | `pnpm test` 81 files/475 pass/36 skip；`pnpm build` 通过；e2e 1 pass；截图 `phase-12-browser.png`、`phase-12-incident-trace.png` |
| 文学 | 首轮 2/20 pass，mean 28.75/40；12 个改写 9/12 pass，mean 33.58；最终 excerpt 3/12 pass，mean 30.50 — **未达标** |
| 机制 | 修复 subject 角色缓存串人和“陌生人当父亲”两个硬 bug；仍存在出生率下降（100 vs Phase 11 237）、代词残留、效果可见性不足 |

未完成/限制：composed events 仍只占 443/20,186；基础内容重复严重；16 个农村占位符编译错误；91 个 `unresolved_effect_ref`、33 个 `invalid_relation` 运行警告；没有 1M 实际提交事件、生产 DB/API 压测或运行时 LLM 叙事。不得把 1,073,786 候选情境或 8,694,688 naive 上界称为已执行事件。

## Phase 13（2026-11-04）— Living Stories

完整报告：`docs/v4/phase-13-report.md`；文学批评：`phase-13-critique.md`；机制批评：`phase-13-mechanics-critique.md`；五段真实人生：`phase-13-lives.md`。

| 项 | 实测 |
|---|---|
| 内核 | 1,311（1,060 event + 251 task），5,290 outcomes，914 variants，1,047 人物分支 |
| 内容新增 | 200 Task + 100 Event recipes；86 base scenes rewritten；484 narration variants |
| 运行 | 88 年 31,830 events；6,227 composed actions（3,573 scenes + 2,654 tasks）；661 kernels |
| 人口 | 367 births / 449 deaths / 757 persons / 306 alive（Phase 12: 100/482） |
| 文学 | 首轮 10/20 (30.55)；最终 12/15 (80%, 33.67/40)，刚好过 75% 门槛 |
| 机制 | subject cache / stranger father / same-sex & divorce deadlock / empty-effect / cash sign / post-death participant 修复；最终 0 unresolved token、0 post-death subject/participant（death event 除外） |
| 调度 | base scene 18,737；composed scene 3,573；base task 3,357；composed task 2,654；20,472 blocked casts |
| 性能 | 20k 3,611 ms/年 composed-only；原 benchmark 4,475 ms/年；heap 378–465 MB |
| 容量 | 3,000 profiles / 1,174,428 eligible situations |
| 验证 | `pnpm test` 83 files/481 pass/36 skip；v4 201 pass；build 3.25s；e2e 1 pass |

未完成：文学样本仅 15 条且零余量；367 births 仍低于 449 deaths，家庭/宏观仍依赖 materialization；20,472 blocked casts；304 unresolved_effect_ref、33 invalid_relation；无生产 PostgreSQL/API 规模验证、无运行时 LLM 叙事、无多城市 world pack。不得把 1,174,428 候选情境称为已执行事件。

## Phase 14（2026-11-05）— Life Continuity & Dramatic Narrative

完整报告：`docs/v4/phase-14-report.md`；机制审计：`phase-14-mechanics-findings.md` / `phase-14-mechanics-critique.md`；文学评审：`phase-14-critique.md`；18 段完整人生：`phase-14-lives.md`；能力人生：`phase-14-special-life.md`。

| 项 | 实测 |
|---|---|
| 因果层 | EventFact 语义 tags、`history`/`knowledge`/`project`/`relationHistory`/`hasFlag` 条件、`historyRefs`、`sharedHistoryTag` 选角、composed follow-up（含 Task 目标）、延迟重试、cause 参与者复用 |
| 目标 | Agency goal history + focus；失业/丧亲/战争/迫害/毕业/奖学金/晋升/出版改变目标 |
| 内容 | 265 个新 kernel（111 Task + 154 Event）、792 outcomes；全库 1,576 kernels / 6,082 outcomes；193 个 history 条件、196 个 follow-up、129 个 sharedHistoryTag 角色 |
| 88 年 run | 35,234 events；8,266 composed（1,064 kernels）；634 r14 events / 255 r14 tasks / 105 kernels；1,488 条显式前因；245 条 historyRefs |
| 人口 | 357 出生 / 464 死亡 / 739 人物 / 273 存活；max living household 12 |
| 文本 | 31,930 distinct texts；reuse 0.0938；0 unresolved tokens；0 post-death subject/participant |
| 因果证据 | 同 seed 60 年：19,569 events / 870 显式链接 / 152 条 ≥3 年链 / 70 人；18 段人生内部 96 条链接；70 年独立 seed 1,057/161/73 |
| 机制 | 修复 cash 符号/债务、commit 原子性、雇主组织代表、未成年家庭、伴侣唯一性、参与者去重、任务 follow-up、关键效果阻断、死亡地点/见证人 |
| 文学 | Critic 阶段样本：整生均分 19/30；事件 7/15（46.7%，均分 29.73），composed 5/8；结局 0/2。不是“已写出 lives”的证明 |
| 性能 | 20k composed-only 2,757 ms/年；原 benchmark 3,631 ms/年；heap 453–514 MB |
| 验证 | `pnpm test` 85 files/497 pass/36 skip；v4 36 files/217 pass；build 3.00s；e2e 1 pass 13.4s |

未完成/限制：文学仍在结局、女性主体代词、伴侣/子女连续性上失败；r14 覆盖 105/265；出生仍略低于死亡（357/464）；12,392 次 blocked casts；79 scheduled expired、30 household_full；没有生产 PostgreSQL/API 规模验证与运行时 LLM 叙事。不得把 870/1,057 条链接或 1,174,428 候选情境称为全部已演出人生。

## Phase 15（2026-11-05）— Composable Story Engine

完整报告：`docs/v4/phase-15-report.md`；设计：`phase-15-design.md`；ADR：`ADR-016-state-mechanism-layer.md`；独立机制评审：`phase-15-mechanics-review.md`；文学评审：`phase-15-critique.md`。

| 项 | 实测 |
|---|---|
| State 层 | 48 个 StateDefinition；state_add/remove/parameter/transition；slot/conflict；typed links；tick/reaction/transition；d20 check；真实 Position 与 organization_found |
| 查询/条件 | `hasState`/`notHasState`/`attribute`/`position`；state weight/check modifiers；per-tick history |
| 内容工厂 | brief→prompt→JSON→forbidden/typed/compile/reachability 验证→registry/hash/provenance；确定性 fallback 明确标为无 event scaffold |
| 真实模型 | **HTTP 403 (server_error)**，两次尝试均失败；4 个交付 pack 由 LLM 子代理撰写并离线验证，不能宣称运行时 worker 成功 |
| 历史 | 446 条参考记录：79 国、166 城、93 人、98 事件（90 fact/8 inference）、10 fiction hooks、517 来源；五年 review 写入 macro/Director snapshot |
| 60 年人生 A | 16,438 events / 432 persons / 213 alive；386 state facts / 254 ticks / 24 reactions / 13 transitions / 17 state types / 16 positions |
| 60 年人生 B | 18,555 events / 438 persons / 221 alive；439 state facts / 278 ticks / 23 reactions / 21 transitions / 20 state types / 14 positions |
| A–F 实验 | 6/6：教育连续、真实权力 vs 舞台、诅咒反噬/伤害、间接资助、组织状态、历史 review |
| 性能 | 20k 基线 4,283 ms/年；1% state 6,414 ms/年；5% state 8,286 ms/年；heap 471/711/526 MB |
| 验证 | `pnpm test` 88 files/517 pass/36 skip；v4 39 files/237 pass/8 skip；build 2.96s；e2e 因无 PostgreSQL 阻塞 |

未完成/限制：State 内容可达性不均（curse、university、war-widow 在最终人生中未稳定出现）、子女仍是 birth/relation 而非可靠 State、局部 Position 不随搬家关闭、嵌套 onEnter/onExit 的关键效果失败仍可能留下已创建 State；真实 PostgreSQL 迁移、模型 API、20k DB/API 和生产规模均未验证；5% 密度性能超过 5s/年目标；历史覆盖严重偏欧洲/Vienna；文学质量由独立 Critique 判断，不能由确定性 critic 的 “pass” 代替。

## Phase 16（2026-11-06）— Living Stories（activation / playtest / iteration）

完整报告：`docs/v4/phase-16-report.md`；设计：`phase-16-design.md`；独立批评与修订：`phase-16-critique.md`；ADR：`ADR-017-state-activation-children-history.md`。

| 项 | 实测 |
|---|---|
| 激活 | state/position opportunity lane：cast 预检、最低 rate 0.35、权重 ×1.5、每人年一次；final-c 1,193 castable candidates / 367 selected / 318 resolved / 1,280 availability failures / 57 blocked |
| 子女 | `autoAttachOnBirth` + household `raising-child` + 通用 `child` role + StateInstance 级 tick/reaction 绑定；final-c 146 births / 141 states / 710 school ticks / 24 leaves / 6 returns |
| 职位 | `$positionOrg/$positionId/$positionTitle` 取最近有效 Position；final-c 85 office events / 25 positions created / 10 ended；final-a 95 / 33 / 11 |
| 诅咒 | final-c 1931.01 真实背叛后 reaction 提交 health -0.18 + condition + triggers；final-a 10 reactions，final-b 0，自然稀有性可见 |
| 历史 | occupation/purge/strike 种子；place/region state anchor + expiry + 1945 liberation reaction；final-c 11 occupation states 全部 ended；live-e 9 个 review 窗口 21 matched / 7 unobserved |
| 内容 | office 2/9/126；curse 2/8/112；family 3/7/98；history 3/10/140；全部 validator `ok:true`；两个新 pack 由离线 LLM 子代理创作并标注 provenance |
| 模型 | `/models` 200，chat **403** “An active OpenCode Go subscription is required to use Go models.”；实际 author 运行 2 次均 403，fallback 且 `ok:false`，不冒充成功 |
| PostgreSQL | embedded PostgreSQL 18.6；state persistence + macro store **2 passed**；真实 stop/start 重启恢复 **ok=true**（`v4-postgres-restart-check.ts`）；browser e2e **1 passed**；顺序执行，未触碰生产数据 |
| 自然人生 | final-c 40 年 14,435 events / 342 persons / 208 alive / 30 distinct states；final-a 50 年 22,102 events；final-b 45 年 19,512 events |
| 性能 | 20k baseline **4,569 ms/年**；1% **6,628 ms/年**；5% **10,283 ms/年**；从初期 8.29/11.99 优化下来，1% 仍未完全回到 5s |
| 验证 | `pnpm test` 88 files / **521 pass / 37 skip**；typecheck 无输出；A–F 6/6（受控实验） |

## Phase 17（2026-11-06）— Living Content Library

完整报告：`docs/v4/phase-17-report.md`；设计：`phase-17-content-architecture.md`；研究：`phase-17-research.md`；覆盖：`phase-17-content-coverage.md`；独立批评：`phase-17-critique.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **79 states / 1,740 kernels / 15 generated packs**；新增 24 个写手 State + 3 个 factory State；generated kernels 47→135 |
| Catalog | `scripts/v4-content-catalog.ts` 从 runtime 生成 `content-catalog.json/md`，含 consumers/consumerPacks/stage/domain gaps/unconsumed/pack metadata |
| 新 Pack | life-course、desire-scandal、crime-justice、migration-belonging、faith-miracles、fame-art、absurd-fortune、work-craft + factory-education；全部 validator `ok:true` |
| 真实模型 | `/models` 200，chat 成功；education brief 8,653 tokens / 1 attempt / 3 states / 4 kernels / 56 scenes；power brief 12,465 tokens 两次失败后 fallback，保留记录 |
| 自然人生 | final-f 45 年 18,134 events / 347 persons / 51 distinct states / repeatRate 0.1965；final-c 50 年 21,173 / 52 states；final-e 50 年 20,790 / 50 states |
| 交叉组合 | final-f new→base 99+ effects；`work→office`、`under-investigation→cj17-wanted`、`courtship→forbidden-attachment`、`life-course→chronic-illness/care`、`migration→family` |
| Content Factory | 真实模型 pack `pack-factory-education` 注册；之前的 403 不再复现；只成功验证一个 brief，不宣称稳定批量生产 |
| 测试 | `pnpm test` 89 files / **526 pass / 37 skip**；typecheck/build 通过；15 packs validate；PG state/macro 2 passed；e2e 1 passed |
| 独立 Critic | 修订前主样本 **16/30**（Phase 16 为 18/30）：关系/子女 slot machine、死状态、重复率 0.1978、无 horizon、组织重复 |

未完成/限制：新包仍主要消费旧 states，new→new 组合弱；`ds17-double-life`、`af17-mistaken-heir`、`af17-cursed-luck`、`cj17-prison-term`、`mb17-stateless`、`thesis-candidate` 等签名状态仍 0/稀有；家庭/伴侣/生育连续性未修；历史日期与组织类型仍有 base 错误；49% focal 样本 25 岁前死亡或活到观察终点无 coda；Content Factory 只验证一个 brief；20k + 79 states 未重新 profile。不得把 79 states/1,740 kernels 当作已演出人生。

未完成/限制：widow-pension / inheritance-division / family-estate 仍零自然触发；office follow-up 0–6 个/seed，`office-patronage` 仅 2–3 adds；love/knowledge/craft 愿望仍弱；final-c repeatRate 0.1543；work-permit 未创建就业；组织 treasury 尺度不合理；历史日期为 1 月占位；生产 DB/API、runtime LLM worker、公网部署未验证；独立 Critic 修订前 19/30，不能把机制激活等同于文学质量提升。

## Phase 18（2026-11-07）— Expanding Possibilities

完整报告：`docs/v4/phase-18-report.md`；设计：`phase-18-content-design.md`；多样性方法：`phase-18-content-diversity.md`；独立批评：`phase-18-critique.md`；ADR：`ADR-018-creative-index-and-content-production.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **99 states / 1,973 kernels / 25 generated packs**（Phase 17: 79 / 1,740 / 15）；新增 **10 packs / 233 kernels / 710 outcomes / 20 states** |
| 新 Pack | infant-wonder、youth-fire、elder-memory、odd-jobs、black-comedy、dark-fantasy、history-street、love-desire、small-mysteries、money-luck；全部 validator `ok:true` |
| Creative Index | 1,973 records；中文 char n-gram + Latin word TF-IDF；`--query` / `--kernel` / `--gaps` / `--duplicates` / `--pack`；阈值 0.20；43 对 ≥0.20，0 个新 Kernel 与旧库跨库 ≥0.20 |
| 阶段/语气 | infancy 2→4、childhood 63→82、adolescence 143→165、elderhood 21→53；stage effective number 1.66→1.81；tone effective number 7.25→8.28 |
| 自然人生 A/B/C | 3×45 年，60,074 events / 5,067 focal events；新 Pack 9.45% 世界事件、**8.37% focal events**（Phase 17: 3.1%）；20/20 新 State 至少出现一次；185/232 新 Kernel 触发；repeatRate ~0.220 |
| 修订 | A/B 中 `em18-family-archive` 缺席；新增 `em18-setup.cellar-box`（45–70 岁，无外部 State）；D seed 20/20 State，archive 1 add / 9 ticks / 6 reactions |
| 测试修复 | 全库测试发现重复标题 `楼梯间的第三个人` 和未解析的 `{link:beloved}` / `{link:other}`；已改名/替换并复测 |
| 测试 | `pnpm test` **91 files passed / 8 skipped（99 files）；533 pass / 37 skip**；首轮 2 个内容缺陷（重复标题、未解析 link token）修复后通过；typecheck/build 通过；25 packs validate |
| 独立 Critic | Life **17/30**（Phase 17 16/30）；scene sample **22/30**；最强场景 8 个，结构性重复 3 组；focal 层面仅 113/232 Kernel 到达；未执行 odd-jobs/elder/mystery 的下一轮修订 |

未完成/限制：focal share 8.37% 未达 12%；repeatRate ~0.220 高于 Phase 17 的 0.1965；47 个修订前 Kernel 零触发；`em18-family-archive` 仍稀有；新 State 的 focal 分布不均（2–19 个事件）；Creative Index 是 lexical，不是 semantic embedding；未做 runtime LLM 叙事、生产 DB/公网部署。不得把 99 states/1,973 kernels 或 8.37% focal share 称为生活质量问题已解决。

## Phase 19（2026-11-07）— Stories in Collision

完整报告：`docs/v4/phase-19-report.md`；设计：`phase-19-design.md`；碰撞内容：`phase-19-content-collisions.md`；独立批评：`phase-19-critique.md`；ADR：`ADR-019-cross-pack-collisions-and-life-continuity.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **107 states / 2,060 kernels / 29 generated packs**（Phase 18: 99 / 1,973 / 25）；新增 **4 packs / 87 kernels / 8 states** |
| Collision Packs | power-love 22、family-war 20、luck-craft 22、elder-history 23；全部 validate；76/87 双 Pack Kernel；family-war 第一稿 84 intra-pack pairs → 第二稿 0 个 ≥0.20 |
| Cross-Pack Map | 107 states / 2,060 kernels / 3,710 open pairs / 152 covered；`--state` / `--pair` / `--gaps`；输出 `cross-pack-opportunities.json/md` |
| Co-occurrence | 最终 5 dossier；230 pairs / 219 open / 11 covered；top open `ml18-sudden-fortune + raising-child` 148、`eh19-late-testimony + em18-late-bloom` 13 |
| Story Editor v2 | 2,060 kernels / 2,029 shapes / 27 shape clusters；state-core 召回 `bc18-ghost` 5 核；production cluster 召回 `oj18` entry 10 核 |
| 节奏 | odd-jobs entry `notHasState` + cooldown 6 + 24 月 tick + 2 变体；主 A/B/C add 87/95/70，top tick 5/4/4/3（Phase 18 537 / 70+52）；cross-state/cross-pack weight 只在 state lane |
| 自然 A/B/C | 57,514 events / 4,190 focal；新 Pack 78 事件（0.14%）、6 focal（0.14%）；repeat 0.2104；新 State 4/8（加 cohort 6/8） |
| Cohort | elder 6,286 events、`eh19-late-testimony` 18 add / 1 focal；mixed 13,966 events、`eh19-late-testimony` 28 add、`eh19-inherited-cause` 1 add / 5 focal |
| 受控实验 | 4/4 allPassed；power/family/luck/elder 多 State 场景执行 |
| 测试 | `pnpm test` **97 files passed / 8 skipped（105 files）；553 pass / 37 skip**；首轮发现并修复 `eh19-bridge` 悬空 `$official`/`$sibling` relation；typecheck/build 通过；29 packs validate |
| 独立 Critic | Life **17/30**（Phase 18 17/30）；Scene **21/30**（Phase 18 22/30）；严格双 Pack **76/87**；主 focal collision 0.14%；修订前 154 个新事件只有 10 个消费新 State；工具成功、转化弱 |

未完成/限制：focal 转化仍弱；`fw19-separated-household` 自然 0；`eh19-inherited-cause` 仅 mixed 1 次；新 Pack 下游仍少；45 年新生 cohort 无法验证老年内容，必须用 existing-person cohort；家庭/伴侣 slot machine、horizon、历史日期、生产级 LLM runtime 未修。不得把 107 states / 2,060 kernels 或 76/87 双 State 当作人生质量已经提升。

## Phase 20（2026-11-07）— Living Consequences

完整报告：`docs/v4/phase-20-report.md`；设计：`phase-20-design.md`；内容：`phase-20-content.md`；独立批评：`phase-20-critique.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **111 states / 2,108 kernels / 31 generated packs**（Phase 19: 107 / 2,060 / 29）；新增 2 packs / 48 kernels / 4 states |
| AdaptiveContext | 可选 State/Relation/Attribute/History context；不 gate，改 weight/check；普通/生命周期/state lane 生效；validator 0.25–4 / -10..10 |
| Adaptive Packs | `pack-adaptive-everyday` 24/108 contexts/8 check/16 conditional；`pack-living-consequences` 24/97/9/24；4 新 State 全部 creation+consumer |
| Retrofit | 8 个旧 Kernel、25 contexts（odd-jobs/elder/money/mystery/love）；多数无 check，checkBonus 休眠 |
| 受控实验 | A/B/C/D 4/4；同一面试 fame DC 9 success vs scandal DC 15 failure；curse-lifted；same-key；re-accused |
| 自然 A/B/C | 65,137 events / 5,593 focal；新 Pack 1,227（1.88%）、focal 97（1.73%）、来自 adaptive-capable Kernel 的 focal 125（2.23%）；4/4 新 State；repeat 0.2290 |
| Cohort | elder 7,116 / 84 / 3；mixed 15,468 / 361 / 40 |
| Adaptive audit | 56 adaptive kernels / 230 contexts；A/B/C 37 observed，加 cohort 40（16 未出现）；181 adaptive focal / 7,751 = 2.34% |
| 测试 | `pnpm test` **100 files passed / 8 skipped（108）**、**567 tests passed / 37 skipped（604）**；`pnpm build` 通过；`pnpm v4:validate-packs` **31 packs / 0 failed**；targeted Phase 20 tests **14/14** |
| 独立 Critic | 修订前 **Scene 22/30、Life 18/30**（Phase 19: 21/17）；5 个 outcome flips、42/62 adaptive DC shifts；separation birth/divorce 碰撞、testimony truth 重置、retrofit checkBonus 休眠、repeatRate 0.2274 回归被点名（修订后 0.2290）。修订响应：补 `ad20-job-interview` 的 `public-scandal` context 并重跑实验/自然 dossier；未重跑 Critic 分数。完整见 `phase-20-critique.md` |

未完成/限制：focal share 1.73% 仍低于 12%；repeatRate 0.2290 高于 Phase 19 0.2104；部分 `pc20` 分支未自然出现；旧 Kernel 的 checkBonus 多数休眠；家庭/伴侣 slot machine、horizon、生产 runtime 未修。不得把 111 states / 2,108 kernels 或 2.23% focal share 当作生活质量问题已解决。

## Phase 21（2026-11-08）— Make It a Game

完整报告：`docs/v4/phase-21-report.md`；体验审计：`phase-21-experience-audit.md`；视觉：`phase-21-visual-design.md`；戏剧：`phase-21-dramatic-content.md`；试玩：`phase-21-playtest.md`；Critic：`phase-21-critique.md`。

| 项 | 实测 |
|---|---|
| 人物 | 修复 `.portrait` 2px flex bug；260px 舞台 / 192×192 Canvas / 裁边 LPC 分层 / 年龄缩放 / 职业配件 / fallback |
| 世界地图 | `WorldMap.tsx` + `countries.geojson` 177 轮廓；全球/欧洲/人物、缩放、拖动；维也纳/克洛斯特新堡可点击；人物脉冲 |
| 出生/早期 | 家庭细节 birth text；5 个新 `vienna-life-*` 场景；feeding/fever rate 0.6/0.45；Engine 7 年 16 条儿童/家庭事件 |
| 戏剧 | `pack-dramatic-lives` 16 kernels / 2 states / 71 contexts / 16 checks / 16 conditional / 224 scenes |
| 规模 | **113 states / 2,124 kernels / 32 packs**；2,093 story shapes；45 high-similarity pairs |
| 自然 A/B/C | 61,718 events / 5,123 focal；drama 203 world（0.33%）/ 22 focal（0.43%）；两个新 State；10/16 kernels 出现；repeat 0.2423 |
| 浏览器 | `tests/v4-browser/phase21.spec.ts` 1 passed（9.5s）；肖像 260、Canvas 216、地图 177 paths、日志 4 条 |
| 测试 | `pnpm test`、`tsc`、`build`、`v4:validate-packs` 结果见 phase-21-report |
| 独立 Critic | 修订前 **Scene 24/30、Life 19/30**（Phase 20: 22/18）；肖像/地图真修好，但 LPC 不是 DoL 级；0–5 有 16 条事件但仍有 15–16 月空档；drama 22 focal/0.43%，elder-testimony 重复，secret-heir/false-confession 自然 0；抓到 1914-01 header vs 1914.09 日志的 chronology bug。修订已修 chronology 并加测试/重跑；分数不冒充修订后。完整见 `phase-21-critique.md` |

未完成/限制：Drama focal 0.43% 仍低；`p21-elder-testimony` 重复；`p21-secret-heir`/`p21-false-confession` 自然 0；LPC 美术仍非 DoL 级；无逐年历史国界；历史进程/经济/组织不可视化；没有大规模用户留存数据。不得把 113/2,124/32 或 4 条早期日志当作“游戏已经好玩”的充分证明。

## Phase 22（2026-11-09）— Creative Overhaul

完整报告：`docs/v4/phase-22-report.md`；创意方向：`phase-22-creative-direction.md`；戏剧：`phase-22-dramatic-content.md`；视觉：`phase-22-visual-design.md`；试玩：`phase-22-playtests.md`；Critic：`phase-22-critique.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **117 states / 2,160 kernels / 34 packs**；新增 2 packs / 36 kernels / 4 states；3 early base scenes + 4 retrofit |
| Dramatic Overhaul | 20 kernels / 2 states / 100 adaptive / 20 checks / 20 conditional / 280 scenes；5 comic / 5 romantic / 5 dark / 5 warm |
| Early-Life Drama | 16 kernels / 2 states / 49 adaptive / 8 checks / 16 conditional / 224 scenes；0–7 岁，subjectProvenance birth |
| Drama Density | `high_drama` ×1.9 / `drama` ×1.4；自然 62,267 events / 4,104 focal；总 drama 144（3.51%），early 119，adult 25（0.61%） |
| 早期人生 | early pack 1,283 world（2.06%）；119 focal early；4/4 新 State；高频 `p22-child-matchmaker` 221、`p22-comic-mistaken-child` 244 |
| 视觉 | 原创 200×240 分层 SVG 半身像；年龄/职业/状态/情绪/死亡；Visual Critic 4.5/10、4/10 |
| 自然 A/B/C | repeatRate 0.2613；adult drama 仍低；4/4 State；`p22-strange-midwife-face`/`p22-banker-novel`/`p22-cursed-lottery` 自然 0 |
| 浏览器 | Phase22 test 1 passed（9.4s）；截图 `phase-22-browser-final.png` |
| 测试 | `pnpm test` **102 files / 576 pass / 37 skip（613）**；`build` 2.91s；`tsc` 通过；`v4:validate-packs` **34 packs / 0 failed**；Phase22 browser **1 passed（9.4s）**；targeted **14/14** |
| 独立 Critic | 修订前 **Scene 24/30、Life 20/30**（Phase 21: 24/19）；3.51% 主要是 early-life、adult 0.61%、repeat 0.2613、role/POV/name bug、State 不可见、肖像同一张脸。完整见 `phase-22-critique.md` |

未完成/限制：adult drama 0.61% 仍低；repeat 0.2613 高于 Phase 21；early 前重后轻；`p22-strange-midwife-face`/`p22-banker-novel`/`p22-cursed-lottery` 自然 0；全库 role/pronoun/name 未修；State 参数不可视；历史国界未做；没有玩家留存数据。不得把 117/2,160/34 或 3.51% total drama 当作“成年戏剧主纹理”已解决。

## Phase 23（2026-11-12）— Blood, Desire & History

完整报告：`docs/v4/phase-23-report.md`；设计：`phase-23-design.md`；戏剧：`phase-23-dramatic-content.md`；政治世界：`phase-23-political-world.md`；历史地理：`phase-23-historical-geography.md`；新闻：`phase-23-world-news.md`；试玩：`phase-23-playtests.md`；Critic：`phase-23-critique.md`。

| 项 | 实测 |
|---|---|
| 内容规模 | **119 states / 2,178 kernels / 35 packs**；2,147 story shapes；44 high-similarity pairs |
| High-Stakes Pack | 18 kernels / 2 states / 72 outcomes / 97 adaptive / 15 checks / 18 conditional / 252 scenes；72/72 outcome titles |
| 事件标题 | `SceneOutcome.title` + API priority fix + 122 overlay + 9 fallback；日志折叠/展开/细节 |
| 政治世界 | 93 polities / 33 tensions / 42 sources / 107 ISO；1912/1918/1938/1945/1955/1991；月粒度关键转折 |
| 历史地图 | 现代几何 + 政权归属叠层；1912/1938/1940/1945/1955 政权变化；明确近似，不是测绘图 |
| 世界新闻 | 75 anchors / 30 ambient / 15 rumors；`v4_world_news` 持久化；四类 provenance；UI 公报 |
| 自然 A/B/C | 64,259 events / 4,192 focal；adult drama 95（3.07%）；p23 38（0.91%）；17/27 lives adult drama；repeat 0.2258；p23 world 502 |
| 浏览器 | Phase23 test **1 passed（4.1s）**；1912 + 1940 截图 |
| 测试 | `pnpm test` **103 files / 588 pass / 37 skip（625）**；build 3.06s；tsc 通过；35 packs validate |
| 独立 Critic | 修订前 **Scene 26/30、Life 20/30**；指出标题进步、adult drama 仍窄、p23 分布集中/全部 1 月、premise asserted、gazette future date/category bug、政治面板静态、地图近似。修订响应见 critique |

未完成/限制：adult drama 3.07% 仍不是多数人生（10/27 没有）；p23 top 3 占 65%；father-sells-daughter/dead-sister-returns 零出现；p23 focal 全部 1 月；bigamy 不是实际双重婚姻；personal→world echo 弱；pressures 不可见；地图是近似；1940 浏览器截图仍是 newborn + 参数行；没有真实玩家留存。不得把 3.07% 说成全部 Phase 23，也不得说 18/18 kernels/72/72 outcomes 可达。
