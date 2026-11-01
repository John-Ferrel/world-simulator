# v3 实现与验收报告

更新：2026-10-31。本文只记录本轮实际运行与代码事实，不把旧报告、模块数量或 schema 存在当作完成证明。入口文档见 `docs/v3/direction-confirmation.md`；架构落点见 `docs/v3/architecture-delta.md`。

## 状态总表

| 能力                      | 状态                                        | 实际证据                                                                                                                                                                                                                                                                                       | 未完成/限制                                                                                                                                                        |
| ------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 统一版本化规则内核        | **implemented（核心）**                     | `packages/rules/{schema,compiler,match,runtime}.ts`；严格 AST、scope/role/trigger/condition/effect/process、cooldown/caps/gas、版本不可变、dry-run、拒绝事件、旧快照初始化；`tests/rules-runtime.test.ts` 9 项。                                                                               | 效果语义仍是白名单子集；尚未覆盖所有旧机构/政治动作的完整适配；定义 catalogue 上限 512。                                                                           |
| BirthRequest + 两阶段出生 | **implemented（fallback 路径）**            | `packages/rules/birth.ts`、`apps/api` `/api/births`、`apps/web` 新生儿表单、`storage.step` birth job/无模型 fallback；真实家庭/cohort 扣减/人口守恒/父母 kin/隐藏人生/`LifeProgram`/稀有异常；`tests/birth.test.ts` 8 项；`tests/v3-storage.test.ts` 2 项；Playwright 新出生链路通过。         | 真实模型 birth 编译只有 adapter 与 mock 证据；错误/等待状态仍简单。                                                                                                |
| LifeProgram / 人生里程碑  | **implemented（确定性 + 可选模型）**        | 出生时设置目标候选/性情/健康/机会；6/12/18 岁里程碑写入真实 goals/education；重大暴露触发 replan；`tests/birth.test.ts` 含模型 proposal 与里程碑；30 年连续脚本 `docs/metrics/v3-long-life-1.json`。                                                                                           | 里程碑后的职业/关系仍主要靠旧 baseline/agenda；LLM Replan 未接入，只有确定性重估；30 年脚本不是 Earth 全图。                                                       |
| 动态事件自动发布          | **implemented（fallback + mock 模型链路）** | `packages/rules/author.ts` Observer/后备定义；`apps/llm-worker` `event_author`；`storage.step` 自动投递/超时后备；`advance` 编译并直接 Active；拒绝事件；`tests/author.test.ts` 6 项；`tests/model-worker.test.ts` mock 作者任务；Earth 验收脚本产生 `auto.shortage.*` 定义与真实 occurrence。 | 真实模型作者任务未实测；无人工审核符合边界；事件语义去重仍以 id/近似规则为主；自动监控只做失败暂停，退役/合并策略尚未完善。                                        |
| 强 History Director       | **implemented（五类操作）**                 | `packages/rules/director.ts`：seed pressure、exogenous incident、open opportunity、commission event、reshape agenda；同月/年度/同 scope 预算；实际人物接触；世界/多站点预算；拒绝事件；`tests/director.test.ts` 10 项；Earth 验收脚本有历史人物机会与压力干预。                                | 历史回归压力目前是偏好/压力偏置，不是完整历史回归调度；真实模型导演任务只有 adapter 与 mock 证据；历史人物曝光上限尚未单独计数。                                   |
| 稀有超常能力              | **implemented（受限机制）**                 | 出生愿望编译为 `AbilityDefinition`；全局配额；成本/冷却/使用上限/暴露/组织调查/`blockedUntil`；七种 mode 有基础执行；自主使用；`tests/rules-runtime.test.ts` 含暴露/调查/自主使用；Earth 验收脚本有独立能力社会反应。                                                                          | 七种 mode 的深度不等（movement/communication 仍是轻量）；NPC 自发异常未铺开；真实模型 birth 能力编译未实测；社会反应内容仍是模板事件，不是完整媒体/政府/宗教机制。 |
| 历史人物                  | **partially implemented**                   | 既有 Pantheon 目录与 activation 保留；Director 可在同地、真实在场条件下创建与历史人物的 `socialize` 机会；Earth 验收脚本在罗马为成年居民创建了与 Pope Leo XIII 的接触机会；Playwright 已验证真实账户出生链路，但未在浏览器里走历史人物接触。                                                   | 验收脚本中该请求在已有 open 导演请求时由脚本构造，不是 Observer 自动产生；真实历史人物后续职业/死亡仍由旧系统决定。                                                |
| 残酷命运/死亡归档         | **partially implemented**                   | 旧战争/疾病/贫困/死亡核算保留；出生人物无 owner 保护；死亡时若存在 LifeProgram，`runtime.deathSummaries` 保存结构化总结、愿望、里程碑、事件 ID；API owner 可读。                                                                                                                               | 死亡总结不是 LLM 对照叙事；未在本轮长跑中验证用户子代未成年死亡样本；展示仍是 UI 文本。                                                                            |
| UI                        | **implemented（出生-only 重做）**           | 三栏保留；单窗口新生儿表单、owner 生命愿望/能力/死亡总结；旧成年创建已删除；地图/人物/世界新闻/日志统一由同一 `at` 时间轴驱动；Playwright 2 项覆盖出生、回放、预览、移动端与本地新章节插入。                                                                                                   | 日志中定义/导演/拒绝来源的专门视觉层未做；历史人物接触未做浏览器流程；能力/死亡总结的视觉层未专项验证。                                                            |
| 数据兼容/恢复             | **reset（开发期断代）**                     | 用户要求删除旧兼容：旧 worlds/events/users/commands 已清空；`world-1-tide1` 从 1900 重建后已归档，当前为 `world-3-tide3`；`World.runtime` 随 JSONB/journal 保存；batch step 保留每月 journal/map/event。                                                                                       | 不提供旧成人创建/旧世界兼容；备份恢复未对新世界长跑重验。                                                                                                          |
| 负载/生产                 | **not implemented（v3）**                   | 旧 12k/长跑指标仍属旧机制；本轮 Earth 验收种子 2 约 36 个月、11.6 万事件；30 年原创包 4.7 万事件。                                                                                                                                                                                             | 未测 v3 规则/事件库/导演在 10k 账户下的 CPU/p95；未测真实模型并发；未部署公网/Compose。                                                                            |

## 实际运行结果

### 静态与单元

- `pnpm typecheck`：通过。
- `pnpm test`：当前非数据库全量 **48 文件 / 272 项通过，28 项跳过**，164.41 秒；跳过来自数据库/浏览器门禁，不是失败。
- 新增定向测试：`tests/rules-runtime.test.ts` 9、`tests/birth.test.ts` 8、`tests/author.test.ts` 6、`tests/director.test.ts` 10、`tests/opportunity.test.ts` 2。
- `pnpm build`：通过；Vite 3.67 秒，存在 Pixi/字体体积提示。

### 数据库/worker（独立门禁）

- `TEST_DATABASE=1 V3_DATABASE=1 pnpm exec vitest run tests/storage.test.ts tests/v3-storage.test.ts`：**11 项通过**；实际覆盖 birth API → pending → fallback/job → 新生儿 atomic commit、时间轴新闻 `at`、失败回滚、归档与 event-author 自动 Active。
- `TEST_DATABASE=1 pnpm exec vitest run tests/model-worker.test.ts`：**4 项通过**；mock provider 实际走 worker `event_author`，结果 ready 后由 simulator 激活，worker 未直接写 world。两次数据库门禁若并行运行会共享 `living_world_test` 导致 revision 断言竞争；本轮最终按顺序运行通过，失败运行未当作产品失败。
- `pnpm test:e2e`：**1 项通过**（约 8 秒）。新出生表单 → 真实新生儿 → owner 可见出生愿望、统一时间轴回放、地点预览、移动端均通过；旧成年创建测试已删除。首次直接运行因本机 Chromium 缺 `libnspr4.so` 失败；仓库 `.data/browser-libs` 已存在所需库，新增 `scripts/run-e2e.ts` 自动注入 `LD_LIBRARY_PATH`，所以现在 `pnpm test:e2e` 一条命令通过。该失败保留为真实环境修复记录。

### Earth 1900 验收脚本

命令：`pnpm acceptance:v3 v3-acceptance-1 docs/metrics/v3-acceptance-1.json`。

实际输出（约 27–36 个模拟月，Earth 1900）：

- 2 个出生：真实家庭、父母、cohort 守恒、LifeProgram；首个愿望被编译为受限 `sense` 能力。偏好上海没有具名照护者时，世界实际选择了有真实家庭的北京；这是设计行为，已由 E2E/脚本确认。
- 动态事件：Observer 在北京短缺压力下产生 author request；后备定义 `auto.shortage.earth-city-227.12@1` 自动 Active；第 13 月实际 occurrence，角色为周邻/林雾，执行 `relate`、`policy`、`offer`。
- Director：历史人物 Pope Leo XIII 在罗马与成年居民形成 `socialize` 机会；该机会被成年居民接受，执行后双方形成 `acquaintance` 关系（trust 0.2，causeId 指向真实事件）。另一条 `seed_pressure` 使北京 unrest 从约 0.849 升到 0.929。
- 能力：种子 2 中出生能力使用有事件；另一定义 `acceptance.social.healing@1` 在真实证人面前暴露，下一月产生 `anomaly_witnessed`。种子 1 在本轮脚本重跑中出生者未满足能力使用/目标条件，`abilityEvidence` 为空——这被保留为真实结果，而不是补齐成成功。
- 种子 2 计数：`ruleOccurrences` 1、`directorActions` 2、`abilityEvents` 12、`definitions` 3、总事件 116,256，历史人物关系已形成，能力暴露为真。种子 1 为 38,603 事件、1 次 occurrence、2 次导演动作、3 个定义、历史人物关系已形成、能力未触发。两份报告分别为 `docs/metrics/v3-acceptance-1.json`、`docs/metrics/v3-acceptance-2.json`。

限制：历史人物机会因已有 open 导演请求由脚本构造 request；不是 Observer 在该次自动产生，但机会的参与、位置、关系与事件链均由真实世界结算。出生能力在种子 1 未触发；种子 2 的出生能力触发但未自然暴露，社会反应由第二个已编译能力场景证明。

### 30 年连续人生脚本

命令：`pnpm exec tsx scripts/v3-long-life.ts v3-long-life-1 30 docs/metrics/v3-long-life-1.json`。

实际结果：原创包 360 月，初始人口 65,520，结束 86,594，47,598 事件；出生者活到 30 岁，`LifeProgram` 里程碑为 `education-6`、`apprenticeship-12`、`adult-18`，教育状态 level 2 / 144 月；目标包含 belong/reform/learn/prosper；能力状态仍存在但该 seed 未自动使用（能力使用由 Earth 验收与单元测试覆盖）。该脚本不是 Earth 全图，也不是 10k 并发。

## 真实模型与外部限制

- 真实模型配置仍为 `opencode-go/deepseek-v4.1-flash` + 稳定 `x-opencode-session`；本轮没有额外购买额度。
- 新任务 `birth`/`event_author`/`history_director` 的 worker prompt/parse 已接入，但只由 mock provider 实测；不能宣称真实模型已成功完成这些任务。
- 未公网部署，未验证 Compose 端到端；旧世界已按断代要求清空，不提供回滚。
- **旧世界处理**：旧开发世界已清空；`world-1-tide1` 经正常 close 归档，保留 741,307 条事件；当前活动世界为 `world-3-tide3`，从 1900/revision 0 启动。
- 历史人物目录、城市/主权数据仍是旧来源与旧许可；CShapes 非商业限制未改变。
- 10k 参与规模仍只有旧机制负载证据；v3 规则库/导演/能力的负载需要单独压测。

## 下一步（未完成）

1. 用真实模型跑一次 birth / event_author / history_director 的受控 smoke，保存原始输出、输入 hash、编译结果与拒绝样本；不泄露 key。
2. 运行 60–120 月 Earth 连续验收，统计规则匹配/事件/导演/能力对 CPU 与 DB 增长的影响。
3. 对当前活动世界做只读兼容检查与备份恢复演练；不直接清空/覆盖。
4. 浏览器 E2E 已覆盖新出生、统一时间轴/回放、预览和移动端；剩余：历史人物接触、能力暴露/死亡总结、日志定义/导演来源的专项视觉回归。
5. 完善事件去重/退役/合并、历史回归调度、历史人物曝光上限、七类能力深度和社会反应机制。

## 2026-10-31 断代前端重做（本轮）

用户要求开发期不再保留历史兼容，直接断代。实际执行：

- 删除 `DraftSchema`、`Draft`、`create` Command、成人创建 `POST /api/persons`、`creation-draft`、`interpretCreation`、旧成年 UI/测试与旧后台世界。
- 清空旧 worlds/events/users/commands 并重建 `world-1-tide1`：Earth 1900、1,500 初始具名人物、7,239 城、revision 0；该世界已完成历史归档，现由 `world-3-tide3` 接续。
- 三栏改为 **单一时间轴状态**：人物、地图、世界动态、个人纪事全部由同一个 `at` 请求；世界新闻查询增加 `at` 截止，历史回放不再只换地图。
- 出生页改为单窗口：姓名/性别/健康/身体备注/自由祝愿/出生地偏好 + 紧凑外观（体型、8 色肤色/发色/衣服、随机）。旧 DollEditor 多标签 UI 删除。
- 人物外观按阶段选素材：0–2 岁 child body/head 且不套成人头发；6–12 岁 child body/head + 缩小头发；13–17 岁 teen body + child head；成人 body/head；65+ elderly head、灰发。
- 速度目标 0.5 分钟/世界年（30 秒/年），开发期使用 `SIM_MONTHS_PER_STEP=6`：内部仍逐月 advance，保留每月事件/map/journal，但一次事务写最终 world。首批 6 个月实测约 20 秒（折合约 40 秒/世界年）；随状态增长会变慢，不宣称恒定 30 秒。
- 更早阶段为 44 文件/236 项；本阶段最终为 48 文件/272 项通过、28 跳过；数据库 12 项、model-worker mock 4 项、Playwright 2 项通过；`pnpm build` 通过。
- 新世界尚未跑 30 年/10k 负载；真实模型三条新任务仍未实测。

## 2026-10-31 收束：叙事、单屏与增量更新

本轮针对用户指出的三个根因做了整体改造，而不是只改 UI 文案。

### 1. 人物纪事改为真实年度叙事

`packages/narratives/life.ts` 不再把原始事件逐条当作故事，也不再用当前职业/地点/心愿倒推早年。新的确定性编译器：

- 以 `personIds`、`birth.data.childId` 和死亡事件的 `personIds[0]` 区分“本人出生/本人死亡/他人的出生或死亡”。父母看到孩子出生时不会再写成自己出生；亲人离世不再被误写成本人死亡。
- 只从当年事件中选择最多三个互不重复的主题（迁徙、关系、疾病、工作、教育、时代、失去、异常等），并压缩接济、重复计划、生日、日常记录等机械事件。
- 开场只使用当事人出生年、年龄和当年真实地点；每章附 `sourceIds`，原始事件退到 `<details>` 中，不伪造因果。
- 跳过 `无` 等占位愿望；同一人生阶段意图连续多年重复时不再机械复读。
- 新增回归覆盖：他死与己死、父/母与子女出生混淆、占位愿望、重复计划。

实际读取仍在世与已故人物的历史生成章节时，1910 年章节已正确写为“失去 Wilhelm ...”，不再把对方死亡写成 John Ferrel 的死亡。

### 2. SSE 从逐事件洪水改为提交摘要

此前一个 6 个月提交会写入约 2–3 万条事件，旧 `/api/stream` 把每一条都推给浏览器；前端每条都触发 `setWorld` 与日志/地图/新闻刷新，这是“消息更新像整页刷新”的真正根因之一。

- 默认 SSE 每个 outbox 提交只发送一条 `{cursor, month, revision, status, terminalReason, count}` 摘要；浏览器每次提交只做一次局部人物/地图/纪事/新闻刷新。
- 仍保留 `?events=1` 原始事件流用于诊断和断线续传验证。
- 前端不再每 10 秒轮询完整 `/world/active`；由摘要驱动局部状态更新。
- 历史时间轴不会因实时 SSE 改写当前阅读；选择人物/时间轴切换使用请求令牌丢弃过期响应。
- 日志在顶部插入新章节；用户停在顶部时保持顶部，滚到下方时保持原阅读位置。
- 实际浏览器回归 `pnpm test:e2e` 第 2 项把 E2E 时钟加速后，真实模拟器推进世界，页面出现新年度章节；验证了 `window` 标记未丢失（未整页 reload）、导航次数为 0、`/api/world/active` 新增请求为 0、页面仍无页面级滚动。截图为 `docs/metrics/observer-live-chapter.png`。

### 3. 单屏与移动端

- `html/body/#root/main` 均限制为一屏高，文档不滚动；桌面三栏各自内部滚动。
- 桌面左栏压缩人物卡：近况、最多两个心愿、出生愿望、当前打算、四项状态条、关系双列、搜索框在同一屏内可见。
- 移动端改为“人物 / 人生纪事 / 世界”三个标签页，一次只显示一个全高面板；每个面板内部滚动，页面本身不滚动。
- 地球地图与城镇搜索改为覆盖在地图视口内，世界动态仍保留在下方；图例在窄屏隐藏，避免挤掉世界新闻。
- 实际移动截图：`observer-mobile.png`、`observer-mobile-person.png`、`observer-mobile-world.png`。

### 4. 世界新闻过滤

`/api/world/events?recent=1` 不再把随机人物的求婚、求职、性格变化当世界新闻。现在只接受历史冲击、战争、规则、导演行动、饥荒、政变、继任、机构、运动、选举、改革、制裁、研究等世界级事件，并对同类事件去重和限额。仍可能是地方性新闻，但不再伪装成全球事件。

### 5. 本轮实际验证

| 命令                                                                                                | 实际结果                                                                       |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `pnpm typecheck`                                                                                    | 通过                                                                           |
| `pnpm test`                                                                                         | **48 文件 / 272 项通过，28 项跳过，164.41 秒**                                 |
| `TEST_DATABASE=1 V3_DATABASE=1 pnpm exec vitest run tests/storage.test.ts tests/v3-storage.test.ts` | **12 项通过**，7.33 秒                                                         |
| `TEST_DATABASE=1 pnpm exec vitest run tests/model-worker.test.ts`                                   | **4 项通过**，5.29 秒                                                          |
| `pnpm test:e2e`                                                                                     | **2 项通过**，16.2 秒：出生/统一时间轴/预览/移动端；加速时钟后的本地顶部新章节 |
| `pnpm build`                                                                                        | 通过，Vite 4.15 秒；仍有 Pixi 大于 500 kB 的提示                               |

### 6. 干净纪元与速度

旧 `world-1-tide1` 经正常 `close` 命令归档，保留 741,307 条事件与历史；新活动世界 `world-3-tide3` 从 Earth 1900、revision 0 启动。当前开发时钟仍为 0.5 世界分钟/年、每批 6 个模拟月。

速度仍未达到 30 秒/世界年：干净世界首批 6 个月实测 **20.176 秒 / 7,435 事件**，折合约 40 秒/年；旧世界到第 192 月时 6 个月提交约 **97 秒**，约 194 秒/年。原因不是 clock 配置，而是每批要生成约 2–3 万事件、对 115 MiB 规范世界做多次 checksum/state patch、写约 20 MiB/月的 journal 和逐月地图。此目标仍未完成，不能把 40 秒/年或长期更慢写成 30 秒/年。

真实模型的三条新任务、Compose 端到端、公网部署、v3 10k 负载和长期数据库容量仍未验证。

## 2026-10-31 内容层 v4：出生即人生底稿，随机创建，真实人生 beat

上一版的“年度叙事编译器”只是把已有事件写短句，根因是事件源没有人生结构。本轮加入的是**出生时生成概率化人生底稿，再由引擎在真实状态中消耗**，不是把日志 prompt 写长。

### 1. 出生时的人生底稿

新增 `packages/life-trajectory/`：

- `catalog.ts`：77 条 1900–1950 人生 beat，其中 34 条的年龄窗口起点 ≤6 岁；覆盖婴儿哺乳/断奶/肺炎/腹泻、产褥、弃婴/育婴堂、童工、饥荒、战争失散、孤儿列车、街头跑腿、传染病、家庭暴力/冷漠、性工作（仅成年人、非露骨）、成瘾、邪教、监禁、迁徙、阶级流动、贫困老年等。
- 每条 beat 有阶段、年龄窗口、时代/地区/阶层/性别/健康/压力触发条件、2–3 个加权分支、抽象 effects、历史依据、来源和标签。
- `generateLifeTrajectory(world, person, options)` 是纯函数，使用 seeded random；`ordinary` / `legendary` 改变波动率和极端分支权重，不提供主角保护。
- 输出明确标记 `ending.certainty = 'projection'` 和 disclaimer：底稿不是保证发生的未来，整个世界状态可以推翻未发生分支。

`LifeProgram.lifeTrajectory` 只存在 runtime 私有层，不写 Person、不公开给非 owner；每个玩家出生生成最多 12 个可执行 beat。创建时通过 `creationHints.tags`（来自随机人物草案的家庭/命运钩子）影响 beat 权重。

### 2. 引擎消费，而不是只写文本

`packages/life-trajectory/apply.ts` 在现有 `advanceLifePrograms` 中按年龄推进：

- 已死亡：轨迹中断；
- 旅途中/被拘留：暂停；
- 到年龄窗口才触发；
- 已错过/无支持效果的分支记录为 skipped，不伪造日志；
- `life_beat` 事件进入 canonical event/outbox，引用出生等真实 cause ID；
- 已接真实字段的 effect：健康、压力、安全需要、教育、职业、童工工资门槛、财富（从地点/人物转移，守恒）、已有关系信任/依恋；
- 尚未接真实状态的 effect：迁徙、法律状态、成瘾、污名、生育、死亡风险直接处死。它们只会在 `resolution.skipped` 中记录，不会被写成已发生事实。
- `deathRisk` 只降低健康和造成长期后果，实际死亡仍由既有 mortality/health 系统决定，不执行剧本式死亡。

叙事编译器把 `life_beat` 作为优先 beat；`career_progress`、`agenda_step_completed` 等机械句不再进入章节正文，只保留在原始记录中。

### 3. 随机丰富创建

新增 `packages/creation/random.ts` 和 `/api/creation/random`：

- 33 个姓名文化组、304 个姓/家族名、573 个 given name、28 个愿望、30 个秘密/执念、38 个命运钩子、24 个家庭背景、18 种性格倾向、28 种身体备注。
- 一键生成姓名、性别、健康、身体备注、愿望、真实出生地、外观、时代、家庭背景、性格、秘密、命运钩子、普通/传奇模式。
- 所有 random 使用 seeded random，不修改 world。
- UI 出生窗口先显示“世界已经写好的形状”（时代/地点/家庭/命运钩子/秘密），姓名、性别、健康、命运模式、身体备注、自由祝愿、出生地和补充命运线索均可修改或重掷。
- `lifeMode` 和 `creationHints` 已进入 BirthRequest；hints 是私有偏好，不是已成立的世界事实。

### 4. 世界线偏移基础模块

新增 `packages/worldline/`：

- 7 维偏移评估（政治/战争/经济/人口/技术/社会/人物历史），每项必须引用真实 event/person/location 证据；未知维度标记 unknown，不伪造 0。
- 严格 schema 禁止死亡、复活、篡改历史、代码/SQL/HTTP；干预只能映射到现有 bounded grammar，且需审核。
- 确定性 `assessWorldline` fallback 和 LLM prompt/validator 已完成。
- `pnpm worldline` 可对当前世界运行 fallback 评估并输出 JSON。**尚未接入周期性 worker/自动干预队列**；LLM 评估和真实周期任务仍待接入。

### 5. 本轮实际验证

| 命令                                                                                                | 实际结果                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `pnpm typecheck`                                                                                    | 通过                                                               |
| `pnpm test`                                                                                         | **48 文件 / 272 项通过，28 项跳过，164.41 秒**                     |
| `TEST_DATABASE=1 V3_DATABASE=1 pnpm exec vitest run tests/storage.test.ts tests/v3-storage.test.ts` | **12 项通过**                                                      |
| `TEST_DATABASE=1 pnpm exec vitest run tests/model-worker.test.ts`                                   | **4 项通过**                                                       |
| `pnpm test:e2e`                                                                                     | **2 项通过**；出生页随机草案、命运钩子、统一时间轴、实时顶部新章节 |
| `pnpm build`                                                                                        | 通过，仍有 Pixi bundle 体积提示                                    |
| `pnpm worldline`                                                                                    | fallback 实际输出 7 维评估，当前样本含政治/经济/人物历史等真实证据 |

新增内容测试：

- `tests/life-trajectory.test.ts` 10 项：seeded 稳定、阶层/危机/普通-传奇差异、0–6 岁覆盖、早期阶层差异、premiseTags 权重。
- `tests/creation-random.test.ts` 11 项：33 文化、覆盖、分布、JSON/BirthRequest、同 seed 稳定。
- `tests/birth.test.ts` 新增轨迹持久化与真实 `life_beat` 推进测试。
- `tests/narrative.test.ts` 新增“life_beat 覆盖 career/practice 模板”测试。

### 6. 仍不够，不能吹

- 底稿只有 12 个关键 beat，不是每一年都覆盖；很多年份仍可能只有环境/关系事件或平静章。
- 迁徙、法律状态、成瘾、污名、生育、死亡直接执行尚未接入真实状态；对应的黑暗分支目前会被安全跳过。
- 童工工资门槛和职业/教育状态已经接真实字段，但还没有完整的童工劳动保护/辍学/工伤链。
- 真实 LLM 叙事写作未接入 UI；当前日志仍是确定性编译，`life_beat` 文本是具体事件但还不是小说级场景。
- 世界线 LLM 周期评估/干预审核队列未接入。
- 30 秒/世界年未达成；当前干净世界首批 6 个月约 20 秒，长期更慢。
- 当前活动世界在正常 close 后为 `world-3-tide3`，从 1900/revision 0 启动；旧 `world-1-tide1` 与 `world-2-tide2` 已归档保留。
