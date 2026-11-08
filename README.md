# 世界人生 · Another History

1900 年前后的真实地球，历史尚未确定。玩家创造一个新生儿：名字、性别、身体条件、外貌和一段自由祝愿。孩子进入一个已经存在的家庭，之后基本不再受玩家指挥；家庭、学校、工作、疾病、战争与制度会共同改变他的一生。

当前交付是一个 **v4 断代重写**，不是旧 v1–v3 的补丁。旧世界已经归档，旧日志/旧出生流程不再由开发服务器启动。当前唯一可玩的垂直切片是 **维也纳 1912–2000 及其后的通用人生线**。Phase 3 已加入可版本化的宏观状态、统计死亡/感染风险、真实 LLM Macro Director 和 macro-driven 事件池。Phase 4 又接入了单岁×性别人口队列、背景人口具名化、WorldDevelopment→组织、运行时 Content Author 和回归式事件内容。Phase 5 进一步修正了具名化机械触顶、20k 性能、组织生命周期、月度急性风险和两种真实出生能力。Phase 6 接入了可参与历史进程、4 位维也纳真实历史人物、战争/疫情/社会运动多角色场景、Director historicalMoves 和真实 Content Author 历史内容生成。Phase 7 进一步加入了确定性自主行动循环、组织主动行为、自下而上的历史进程、进程生命周期/分裂、持久历史遗产（制度/战后/记忆）、Director 可执行行动队列、legacy 生活内容与 canonical 死亡时序修复。Phase 8 加入了内容驱动的 Task Pool、轻量任务效用选择、50 个跨领域主动任务、按人物处境的有效候选审计、Life Passage 投影，以及同一世界的五种差异人生验证。

## 现在实际能做什么

- 注册/登录，写下一个新生儿的姓名、性别、身体条件、外观与自由祝愿。
- 出生请求立即返回；孩子先进入 Bauer 家庭的真实住址，愿望的模型解释在后台异步完成，不阻塞世界时钟。
- 三栏观察器：左侧人物档案与家庭，中间只读的个人日志，右侧维也纳示意地图与时代背景。
- 世界约每 30 秒推进一年；已提交事件写进 PostgreSQL，刷新/重连后从记录恢复。
- 19 个维也纳 1912–1918 作者场景：印刷厂工伤、房租与医疗、学校/学费、女子中学、家庭折页、工会、1914 动员、配给队列、1918 流感、孤儿监护。
- 19 个通用人生场景：婴儿喂养/发烧、入学、课堂、童工、1918 流感、学徒、工伤、1930 年代失业、1938、二战征召/空袭、1945、退休与老年死亡。通用场景只使用角色相对引用，可以落到玩家新生儿身上。
- 16 个战后生活场景：1950 年代重建与市营住宅、学校牛奶、车间学徒、第一份工资、电视咖啡馆、自助商店、工厂倒班、带薪休假、医疗保险、舞蹈社交、汽车、失业与 1990 年代电脑工作；另有 24 条 1946–1999 时代记录。战后场景仍挂在真实人物、住址、工作和关系上。
- 8 个家庭/关系场景：求婚/同居、婚礼、女性生育、男性成为父亲、离婚、女性同性共同生活、男性同性关系风险。孩子是真实 Person，拥有父母/监护人关系、家庭住址和自己的出生事件。
- 104 个由 LLM 内容工厂生成并验证的维也纳事件场景（26 个事件族），另有 519 条条件化叙事变体；覆盖印刷厂、合租楼、学校、市场、学徒、疾病、教区、街头童年、青春期、成年社交、婴儿期、老年、恋爱、住房、医疗、教区互助、债务、女性家务、战时家庭，以及 Phase 7 的改革后工场生活与战后余波。
- 50 个内容驱动的主动 Task（48 个真实模型生成 + 2 个 authored 补充），144 outcomes、288 narrations；覆盖工作/教育/医疗/政治/能力/日常文化/家庭照护/写作研究。Task 由人物按目标、需求、性格、技能、风险和实际条件选择，不需要修改 Engine switch。
- 年度事件运行时不再“一年只选一个场景”：按年龄/身份/地点的发生率抽样多个普通事件，事实/后续事件进入队列，人物请求由对方独立回应。
- 每个事件有真实参与角色、年龄、地点、类型化效果和后续记录；文本来自场景 outcome，不由日志模板生成。

### Phase 6 Living History 现在实际可读

- 1912 维也纳世界中存在 `Sigmund Freud`（Q9215）、`Victor Adler`（Q366845）、`Karl Kraus`（Q44328）、`Arthur Schnitzler`（Q44331）四个稳定 Person；他们有真实来源、组织/住址和活动窗口，真实死亡日期只作参考，不自动成为模拟死亡。
- 两个 1912 年已存在的历史进程：社会民主党动员、弗洛伊德心理分析圈。进程有阶段、参与者、组织、资源/支持/反对/合法性/升级/信息指标和阶段历史。
- 普通人可以通过公开集会、印刷工会、Berggasse 19 的来信/会诊、Café Central 朗读、Burgtheater 演出、战争动员、医院和 1918 流感照护进入历史；参与角色和知识来自已提交事件，不是把同一条世界新闻复制到所有日志。
- 战争/疫情内容只有在实际存在对应 `historicalProcess` 时才触发；1914 场景不会因现实年表自动强推。Engine 结算阶段，Director 只能提出有界 `historicalMoves`。
- 真实模型证据：两轮 Director 4,506 + 8,158 tokens 读取已有进程；Content Author 生成 8,744-token 历史内容包（4 nodes/12 outcomes/24 narrations），实际触发。

### Phase 8 Content-Driven Agency 现在实际可读

- 主动任务现在来自内容层：`TaskDefinition` 复用现有 Scene 的角色、条件、outcome、narration、effect 和事件提交路径；新增具体行动不需要改 `agency.ts` 的 switch。
- 50 个 Task 由真实内容生成（48 个模型发布 + 2 个 authored 补充）覆盖学徒、富裕青年、医生、政治活动者、特殊能力者、日常文化、家庭照护和写作研究。
- `taskUtility()` 使用人物目标、现金/食物/健康、家庭照护、性格、技能、风险和特殊 capability；同一批内容对不同人物形成不同候选池。
- 88 年对照：无 Task 21,021 事件 / 325 个 prefix repeat offender；有 Task 24,991 事件 / 2,705 条 Task 事件 / 159 个 prefix repeat offender。不是用降低实际事件数换报表。
- 五个同一世界人物：贫穷学徒、富裕青年、医生、政治活动者、特殊能力者；都有实际 Task、历史人物接触、家庭/工作/历史 legacy 后果。
- `LifePassage` 从已提交事实组织人生片段，API/UI 显示；不删除长期照护/工作事实。

### Phase 7 Autonomous Living World 现在实际可读

- 人物每年可以自主形成目标并尝试行动：找工作、加入组织、开会、招募、筹款、出版、照护家人、求助、支持/反对历史进程。行动来自 `Person`/`Organization`/`Relation`/`Knowledge`/`HistoricalProcess` 状态，不是预编排脚本。儿童不执行成人组织行动。
- 组织在没有正式职位时由最健康的非正式领袖代表；招募、会费、会议、项目和成员变化都会真实改变组织与世界状态。
- 当有真实成员、持续行动和组织的团体达到条件时，Engine 可以自下而上创建新的 `historical_process`，不需要 Director 先批准。
- 历史进程不再因预设 `end` 年份直接消失；它可以继续、衰退、停滞、升级、制度化、压制、分裂或结束。结束/转化会留下 `MacroState.legacy`（改革、压制、战后余波、公共卫生制度、文化机构、组织分裂、社会记忆），改变地区结构参数、未来事件权重和后续内容资格。
- Director 现在可以提出有界 `actions`（组织、招募、谈判、出版、救济、压制、改革、生成新进程）；MacroStore 只排队，Engine 在下一 tick 用真实 Project/Interaction/membership/legacy/事件执行。
- 真实模型两轮 Phase 7 Director 证据：6,143 + 10,263 tokens，提出 6 条行动，5 条执行，1 条无进程的 reform 被跳过，最终留下改革 legacy。
- 真实 Content Author 生成两族 legacy 生活内容：`vienna-legacy-worklife` 9,674 tokens、4 nodes/12 outcomes/24 narrations；`vienna-war-aftermath-life` 9,125 tokens、4/12/24。固定种子跨代实验：有 reform legacy 的世界产生 53 条 legacy 生活事件，无 legacy 的对照世界 0 条。

**尚未完成**：完整多地区长期 Director、具名人口迁出/迁入账本、联合分布具名化、20k 完整持久化/并发压测、公网部署。Phase 7 已修正新提交事件的死亡后日期问题；旧存档中的历史事实按原样保留。1946–2000 具体内容仍偏少。内容工厂已有 runtime job → 真实生成 → 验证 → DB 发布 → 下一 tick 动态加载链路，但只有 social_change 自动触发，且不是无限/无人值守内容生产。当前活动世界 `world-vienna-1912-vmw093z4j` 带有 Phase 8 Task Pool，交付检查时到 1950 年、161 人/98 人在世；旧世界 `world-vienna-1912-v45-mw00vcj2` 已归档到 2001 年，`world-vienna-1912-vmvzyetyo` 到 2001 年归档，`world-vienna-1912-vmw002ff6` 到 1956 年归档，`world-vienna-1912-v45-mvz8uwrz` 到 2001 年归档，全部保留，不覆盖、不 reset。Phase 6 另有 4,506 + 8,158 tokens 的测试库多轮 Director 证据，Phase 7 另有 6,143 + 10,263 tokens 的行动提案证据。婚姻/生育仍是自动场景，不是玩家选择或完整婚配系统。Phase 5 证据见 [phase-5-report.md](docs/v4/phase-5-report.md)；可玩闭环见 [playable-report.md](docs/v4/playable-report.md)；Phase 6 验收见 [phase-6-report.md](docs/v4/phase-6-report.md)。

## 启动

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开 <http://localhost:5173>。`pnpm dev` 会先启动本地 PostgreSQL（默认 `postgres://localhost:55432/living_world`，外部 `DATABASE_URL` 则跳过），然后启动：

- `apps/v4-api`：认证、世界读取、出生请求、SSE
- `apps/v4-simulator`：v4 单写者、年度场景推进、出生落地
- `apps/v4-birth-worker`：异步出生愿望解释（无 key 时失败重试后保留原愿望）
- `apps/v4-macro-worker`：异步 LLM Macro Director（真实提案、验证、revision-locked 应用）
- `apps/v4-content-worker`：运行时 Content Author（job → 真实生成 → 验证 → 动态发布）
- Vite 观察器

首次启动会自动应用 `003_v4.sql`、`004_v4_birth_contracts.sql`、`005_v4_macro.sql` 与 `006_v4_runtime_content.sql`，并在没有活动世界时播种 Vienna 1912。世界 ID 不复用；到达 2000 年地平线后旧世界只读归档，重启开发服务器会播种新的 1912 世界，不覆盖旧档。宏观状态、单岁人口和发展对象随世界写入 `v4_worlds.macro`。环境变量见 `.env.example`；`.env` 不应提交。

把当前 v4 世界归档并另起一个干净切片：

```sh
pnpm v4:reset
pnpm dev
```

归档世界保留实体与事件行，不会被删除。`V4_ECONOMY=0` 可关闭家庭/组织经济结算；`V4_HORIZON_YEAR` 默认为 2000，世界到点后明确标记为切片终点并停止写时钟。`V4_WISH_WORKER=0` 关闭出生愿望 worker；`V4_DIRECTOR=0` 关闭宏观 Director/事件池 worker；`V4_DIRECTOR_INTERVAL_YEARS` 默认 10；`V4_CONTENT_WORKER=0` 关闭运行时内容 worker。

## 验证

```sh
pnpm typecheck
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm test:e2e --config playwright.v4.config.ts
pnpm build
pnpm v4:audit 80
pnpm v4:phase3-scenarios
pnpm v4:life-demo
pnpm v4:multi-cycle                        # 两次真实 LLM 历史决策
pnpm v4:phase4-demo                        # development→组织→运行时内容→具名事件；需测试库
pnpm v4:runtime-benchmark 20000 1          # 20k 具名 in-memory 分阶段计时
pnpm v4:playtest                          # 8 个玩家人物、88 年无头试玩与异常审计
pnpm v4:history-scenarios                 # 战争/疫情/历史接触/反事实四组证据
pnpm v4:history-director-demo             # 真实 LLM 两轮历史 Director；需 *_test 数据库
pnpm v4:phase7-experiments                # 自由演化 A–F、反事实、跨代、完整人生证据
pnpm v4:phase8-content                    # 8 族 Task 的真实模型批量生成/验证（需模型 key）
pnpm v4:phase8-candidates                 # 五种人生的有效事件/Task 候选审计
pnpm v4:phase8-lives                      # 同一世界的五种差异人生
pnpm v4:migrate                           # 应用 007：为旧 DB 补 v4_macro_proposals.world_year
pnpm exec tsx scripts/v4-content-author.ts
pnpm v4:macro-demo                         # 需独立 *_test/_e2e 数据库和模型 key
pnpm exec tsx scripts/v4-db-benchmark.ts   # 需独立 *_test/_e2e 数据库
```

`pnpm test:e2e` 使用独立 `living_world_e2e` 数据库，清空 v4/认证表，播种 5 秒/年的测试世界；不会碰开发世界。浏览器流程实际注册、出生、读取日志、切换 Anna Bauer 并打开地图地点。

## 当前实现结构

```text
packages/v4/domain.ts                 Person/Household/Place/Organization/Position/
                                      Project/Interaction/Relation/Knowledge/EventFact/
                                      SceneDefinition/SceneInstance + invariants
packages/v4/engine.ts                 纯函数年度场景引擎、角色选角、类型化效果、
                                      家庭经济、项目/交互生命周期
packages/v4/store.ts                  v4 实体表、事件表、出生请求/契约队列表
packages/v4/birth.ts                  立即出生事务
packages/v4/wish.ts                   Birth Contract 编译入口与模型提示
packages/v4/birth-contract.ts         结构、白名单、严格验证与不可信愿望边界
packages/v4/birth-contract-store.ts   contract 持久化、revision 锁、增量只应用一次
packages/v4/content/vienna-1912.ts    作者场景、26 人 seed、地点/组织/来源/时代
packages/v4/content/vienna-life.ts    角色相对通用人生场景
packages/v4/content/vienna-family.ts  婚姻、同居、生育、离婚、同性关系与新生儿 Person 创建
packages/v4/content/generated/        LLM 生成的 23 个事件族（92 场景、251 outcome、447 叙事变体）
packages/v4/macro.ts                  宏观状态、单岁×性别人口队列、development、事件池、proposal 验证
packages/v4/statistics.ts             年龄/原因别风险、感染/恢复/战争/产妇/聚合人口/迁移
packages/v4/macro-director.ts         真实 LLM Director prompt 与提案编译
packages/v4/macro-store.ts            提案队列、revision-locked 应用、macro 读取、组织持久化
packages/v4/content-runtime-store.ts  运行时内容 pack/job 发布与加载
apps/v4-macro-worker/index.ts         异步宏观提案 worker
apps/v4-content-worker/index.ts       运行时内容生成/验证/发布 worker
packages/v4/content/vienna-developments.ts  development 驱动的组织事件
packages/v4/content-author/           覆盖报告、macro gap、内容 brief、真实模型生成与严格校验
scripts/v4-phase3-scenarios.ts        四种历史情境统计夹具
scripts/v4-life-demo.ts               12 个具名人物、80 年事件验证
scripts/v4-macro-demo.ts              真实 LLM→验证→应用→统计事件演示
scripts/v4-phase4-demo.ts             development→组织→运行时内容→人物事件演示
scripts/v4-multi-cycle-demo.ts        两轮真实 LLM 历史决策演示
packages/v4/generated.ts              生成内容 schema、验证与编译
scripts/generate-v4-events.ts        LLM 内容工厂入口
scripts/v4-content-audit.ts          80 年内容/事件分布与可达性审计
scripts/v4-content-author.ts          内容作者 CLI（macro gap / 生成 / 验证）
scripts/v4-content-author.ts         离线内容作者 CLI（覆盖/生成缺失族/验证）
scripts/v4-db-benchmark.ts           1k/5k 具名人物 PostgreSQL 读写基准
scripts/v4-runtime-benchmark.ts      1k/5k/20k 合成运行时基准
apps/v4-api/index.ts                  Fastify API/SSE/认证/公开信息过滤
apps/v4-simulator/index.ts            v4 时钟与出生处理
apps/v4-birth-worker/index.ts         异步愿望解释，最多重试 3 次
apps/web/src/main.tsx                 React 三栏观察器
infra/migrations/003_v4.sql           v4 实体/事件/出生表
infra/migrations/004_v4_birth_contracts.sql
infra/migrations/005_v4_macro.sql
```

不变量：死亡不可逆；现金/食物不出现负余额；正现金/食物必须有明确来源（组织、工资或场景 reason）；角色缺失时场景 blocked 而不是生成假人；未知 effect 被拒绝；每个提交事件引用真实人物；世界状态、实体、事件和修订号在同一事务内保存。

## Phase 15 组合故事引擎

Phase 15 在现有 v4 Scene/Task/Kernel 之上增加 State 机制层，而不是第二套 Engine。`StateDefinition` 可声明 slot、参数、typed links、duration、weight/check modifiers、ticks、transitions、reactions 和 onEnter/onExit；`StateInstance` 由 EventFact 创建并持久化。一个 `university-student` 会真正占用 education slot、每年检定、交学费并在毕业/退学时提交 `state_transition`；一个 `cursed-by-wish` 会监听真实 `betrayal` 事件、指向真实 `betrayer` 并造成/承受健康后果；一个 `position` effect 创建真实 Position，而舞台国王只是 state，不获得 authority。

内容工厂位于 `packages/v4/content-factory/`，验证 schema、typed effects/conditions、文本 token、state 引用和真实 composer 编译后才登记。历史索引位于 `packages/v4/history-db/`（446 条参考记录），每五年生成 macro `historyReview`，只记录有/无 committed analogue，不重置时间线。

关键命令：

```bash
pnpm v4:phase15-author -- --all --fallback   # 工厂 gate + 明确 fallback scaffold
pnpm v4:phase16-experiments                    # A–F 机制实验
pnpm v4:phase15-lives -- 60 phase15-a,phase15-b
```

完整证据与限制见 [Phase 15 report](docs/v4/phase-15-report.md)、[design](docs/v4/phase-15-design.md)、[independent critique](docs/v4/phase-15-critique.md) 与 [ADR 016](docs/decisions/ADR-016-state-mechanism-layer.md)。真实模型 API 在本次环境返回 HTTP 403；交付 pack 是 LLM 子代理撰写并离线验证，不是运行时 worker 成功。


## Phase 16 活起来的人生（activation / playtest）

Phase 16 没有重写 Engine。它把 Phase 15 的 State / Position / Content Factory / History 真正接入完整人生：

- **state/position opportunity lane**：已获得的处境获得一次有界机会；先 cast 预检，再加权选择；每人年最多结算一个 state/position 场景。
- **真实子女**：`autoAttachOnBirth` 创建 household `raising-child`；通用 `child` role 选真实子女；tick/reaction 使用 `links.child`，每个孩子的 school progress 独立。
- **真实职位权力**：`$positionOrg/$positionId/$positionTitle` 使用最近获得的有效 Position；自然人生中实际发生 hire、预算、私人人情、审计、丑闻与投票移除。
- **诅咒后果**：自然背叛触发 `cursed-by-wish` reaction，对真实 betrayer 提交 health/condition；失败也推进 triggers，自我 cast 不触发。
- **历史进入生活**：占领、清洗、罢工委员会成为 place/organization State；place state 会 tick/expire；1945 liberation 会移除占领。work permit 仍未创建就业，这是已知缺口。
- **数据库与性能**：embedded PostgreSQL 18.6 实际执行 migration/persistence/reload/e2e；20k baseline 4.57 s/年、1% 6.63 s/年、5% 10.28 s/年。

主要命令：

```bash
pnpm v4:phase16-lives -- 40 phase16-final-c
pnpm v4:phase16-experiments
pnpm v4:with-postgres "pnpm exec vitest run tests/v4-state-persistence.test.ts tests/v4-macro-store.test.ts"
pnpm v4:with-postgres "pnpm test:e2e --config playwright.v4.config.ts"
# 真实 PostgreSQL stop/start 恢复：
pnpm v4:with-postgres "pnpm exec tsx scripts/v4-postgres-restart-check.ts seed"
pnpm v4:with-postgres "pnpm exec tsx scripts/v4-postgres-restart-check.ts load"
```

完整证据与限制见 [Phase 16 report](docs/v4/phase-16-report.md)、[design](docs/v4/phase-16-design.md)、[critique + revision](docs/v4/phase-16-critique.md)、[model probe](docs/v4/phase-16-model-probe.json) 与 [ADR 017](docs/decisions/ADR-017-state-activation-children-history.md)。真实模型 `/models` 返回 200，但 chat 返回 403（无 active OpenCode Go subscription）；两个新 pack 是离线 LLM 子代理创作并验证，不是 runtime worker 成功。

## Phase 17 内容库

Phase 17 把内容库从 52 states / 1,652 kernels / 6 generated packs 扩展到 **79 / 1,740 / 15**，并建立可查询的 Content Catalog。新增 8 个主题 Pack（life-course、desire-scandal、crime-justice、migration-belonging、faith-miracles、fame-art、absurd-fortune、work-craft）和一个真实 Content Factory pack。

```bash
pnpm v4:content-catalog      # 重新生成 docs/v4/content-catalog.json/md
pnpm v4:validate-packs       # 验证全部 15 个 generated pack
pnpm v4:phase17-lives -- 45 phase17-final-f
```

真实模型 `/models` 返回 200，chat 成功；`pack-factory-education` 来自一次 8,653-token 成功生成。之前的 403 不再是当前阻塞。内容工厂仍只验证了一个 brief，不能宣称稳定批量生产。

自然人生 final-f：45 年 18,134 events / 347 persons / 51 distinct states / repeatRate 0.1965。独立 Critic 对修订前主样本评为 **16/30**（Phase 16 18/30），指出关系/子女 slot machine、死状态、重复率、无 horizon、组织重复。Phase 17 是内容生产成功、转化仍不足，不是生活质量的最终提升。完整证据见 [report](docs/v4/phase-17-report.md)、[critique](docs/v4/phase-17-critique.md)、[coverage](docs/v4/phase-17-content-coverage.md) 与 [research](docs/v4/phase-17-research.md)。

## Phase 18 故事空间扩张

Phase 18 把内容库从 **79 states / 1,740 kernels / 15 packs** 扩展到 **99 / 1,973 / 25**，新增 10 个主题 Pack、233 个 Kernel、710 个 Outcome、20 个 State，并建立可查询的 Creative Index。

新增 Pack：infant-wonder、youth-fire、elder-memory、odd-jobs、black-comedy、dark-fantasy、history-street、love-desire、small-mysteries、money-luck。覆盖婴幼儿、童年、青春期、老年、荒诞、黑色喜剧、暗色幻想、历史街面、欲望、小谜案与金钱运气。

```bash
pnpm v4:creative-index
pnpm v4:creative-index -- --query "一个贫穷裁缝收到律师来信，继承了陌生人的城堡"
pnpm v4:creative-index -- --gaps
pnpm v4:creative-index -- --duplicates 0.2
pnpm v4:creative-index -- --pack packages/v4/content/states/generated/pack-elder-memory.json
pnpm v4:validate-packs
pnpm v4:content-catalog
pnpm v4:phase18-lives 45 phase18-a,phase18-b,phase18-c
pnpm v4:phase18-coverage docs/v4/phase-15-phase18-a.json
```

自然人生 A/B/C 合计 60,074 events；新 Pack 贡献 9.45% 世界事件、8.37% focal events（Phase 17 为 3.1%）。20/20 新 State 至少出现一次，185/232 修订前新 Kernel 在世界中触发，但只有 113/232 到达 focal person。独立 Critic 给 Life 17/30（Phase 17 16/30）、Scene 22/30，并指出官僚幽灵/奇职秘密测试/横财抽成三组结构重复。focal share 仍低于 12%，repeatRate 约 0.220 高于 Phase 17 的 0.1965；不能把 233 kernels 当作生活质量已修复。

完整证据见 [report](docs/v4/phase-18-report.md)、[design](docs/v4/phase-18-content-design.md)、[diversity](docs/v4/phase-18-content-diversity.md)、[critique](docs/v4/phase-18-critique.md) 与 [ADR 018](docs/decisions/ADR-018-creative-index-and-content-production.md)。

## Phase 19 故事碰撞

Phase 19 把内容库从 **99 / 1,973 / 25** 扩展到 **107 states / 2,060 kernels / 29 packs**，新增 4 个 Collision Pack、87 个 Kernel、8 个 State，并建立 Cross-Pack Opportunity Map、Observed Co-occurrence 与 Story Shape v2 编辑工具。

```bash
pnpm v4:cross-pack-map
pnpm v4:cross-pack-map -- --pair known-affair,office-patronage
pnpm v4:cross-pack-map -- --state known-affair
pnpm v4:phase19-cooccurrence
pnpm v4:story-editor
pnpm v4:story-editor -- --pack packages/v4/content/states/generated/pack-collision-power-love.json
pnpm v4:phase19-experiments
pnpm v4:phase19-lives 45 phase19-a,phase19-b,phase19-c
pnpm v4:phase19-lives 30 phase19-elder --existing=person-theresia-huber,person-hedwig-stein,person-anna-moser,person-hermann-kral,person-maria-kral --existing-only
pnpm v4:phase19-summary
```

四个 Pack：power-love（私情×权力/丑闻）、family-war（家庭×战争/占领）、luck-craft（手艺×借来的好运）、elder-history（老年记忆×历史遗产）。76/87 个 Kernel 同时消费两个不同 Pack 的 State；每个新 State 有 creation path + consumer。

自然 A/B/C：57,514 events / 4,190 focal；新 Pack 78 事件（0.14% 世界）、6 个 focal 事件（0.14% focal）；repeatRate 0.2104。老年 cohort 6,286 events，`eh19-late-testimony` 18 次 add、1 个 focal；混合 cohort 13,966 events，`eh19-late-testimony` 28 次 add、`eh19-inherited-cause` 1 次 add、5 个 focal。Odd-jobs tick 文本从 Phase 18 的 70/52 降到主 seed 的 5/4/4/3。

这是工具与节奏改进成功、focal 转化仍弱的结果：新 Pack 能进入世界，但 45 年新生 focal 里仍然稀有；不能把 87 kernels 当作人生已经改变。完整证据见 [report](docs/v4/phase-19-report.md)、[design](docs/v4/phase-19-design.md)、[content collisions](docs/v4/phase-19-content-collisions.md)、[critique](docs/v4/phase-19-critique.md) 与 [ADR 019](docs/decisions/ADR-019-cross-pack-collisions-and-life-continuity.md)。

## Phase 20 有后果的人生

Phase 20 把内容库从 **107 / 2,060 / 29** 扩展到 **111 states / 2,108 kernels / 31 packs**，新增 2 个 Adaptive Pack（48 kernels / 4 states）和 8 个旧 Kernel 的 AdaptiveContext retrofit。

核心机制是 `AdaptiveContext`：一个主 eligibility 提供事件机会，其他 State / Relation / Attribute / History 作为可选情境改变权重、检定和 conditional outcome，而不是硬性 gate。普通求职、房东、学校会议、市场日、葬礼、贷款、演讲等事件，会因 fame、scandal、curse、wealth、debt、blacklisted、relationship history 产生不同结果。

```bash
pnpm v4:phase20-adaptive-audit
pnpm v4:phase20-experiments
pnpm v4:phase20-lives 45 phase20-a,phase20-b,phase20-c
pnpm v4:phase20-lives 30 phase20-elder --existing=person-theresia-huber,person-hedwig-stein,person-anna-moser,person-hermann-kral,person-maria-kral --existing-only
pnpm v4:phase20-summary
```

自然 A/B/C：65,137 events；新 Pack 1,227 事件（1.88% 世界）、97 个 focal 事件（1.73%）、125 个来自带 `adaptiveContexts` Kernel 的 focal 事件（2.23%）；4/4 新 State 出现；repeatRate 0.2290。Elder 84/3，mixed 361/40。Phase 19 的 focal share 是 0.14%，Phase 20 有显著提升，但仍低于 12%；repeatRate 上升是真实回归，不能隐藏。

受控实验 A–D 4/4：同一面试因 fame/scandal 产生不同 DC 和 outcome；诅咒进入普通愿望；分居家庭重新开门；政治嫌疑翻案/再次指控。独立 Critic（修订前）给 **Scene 22/30、Life 18/30**（Phase 19: 21/17），并指出多数 adaptive context 只改赔率、separation 仍有 birth/divorce 碰撞、testimony truth 会被重置、旧 Kernel checkBonus 休眠、repeatRate 0.2274 回归（修订后 0.2290）。修订补了 `ad20-job-interview` 的 public-scandal context 并重跑实验/自然 dossier；Critic 分数不冒充修订后评分。完整证据见 [report](docs/v4/phase-20-report.md)、[design](docs/v4/phase-20-design.md)、[content](docs/v4/phase-20-content.md)、[critique](docs/v4/phase-20-critique.md) 与 [ADR 020](docs/decisions/ADR-020-adaptive-storylets-and-living-consequences.md)。

## Phase 21 让它成为游戏

Phase 21 不增加 Engine 复杂度，而是先修玩家真正看到的东西：

- **人物**：修复 `.portrait` 被 flex 压成 2px 的 bug；260px 肖像舞台、192×192 Canvas、裁掉透明边距的 LPC 分层纸娃娃、年龄缩放、职业配件、素材失败 fallback。
- **世界地图**：右栏从维也纳示意图换成真实 `countries.geojson`（177 个国家/地区轮廓）；支持全球/欧洲/人物视角、滚轮缩放、拖动；维也纳与克洛斯特新堡可点击，人物位置有金色脉冲。
- **出生与 0–5 岁**：出生文本加入父母、职业、家庭现金/债务、兄弟姐妹；新增 5 个通用早期人生场景并提高 infant feeding/fever rate。真实 Engine 7 年 cohort 产生 **16 条**儿童/家庭事件；浏览器 e2e 在 5 秒/年下 30 秒内看到第 3 条以上日志。
- **戏剧内容**：`pack-dramatic-lives`，16 kernels、2 states（`p21-scandal-web` / `p21-fortune-reversal`）、71 adaptive contexts、16 check kernels、16 conditional-outcome kernels、224 compiled scenes；秘密继承人、勒索婚礼、决斗、假死、毒酒、遗嘱、旧敌、假认罪、公开羞辱等。
- **规模**：**113 states / 2,124 kernels / 32 packs**。
- **自然 A/B/C**：61,718 events / 5,123 focal；drama 203 世界事件（0.33%）、22 focal（0.43%）；两个新 State 都出现；10/16 drama Kernel 自然出现；repeatRate 0.2423（高于 Phase 20 0.2290 和 Phase 19 0.2104）。
- **浏览器验收**：`tests/v4-browser/phase21.spec.ts` 通过（9.5s）；截图 `docs/v4/phase-21-browser-final.png`。

独立 Critic（修订前）给 **Scene 24/30、Life 19/30**（Phase 20: 22/18），并抓到 1914-01 header vs 1914.09 日志的 chronology bug；修订已修 chronology 并重跑，分数不冒充修订后。完整见 `docs/v4/phase-21-critique.md`；完整证据见 [report](docs/v4/phase-21-report.md)、[experience audit](docs/v4/phase-21-experience-audit.md)、[visual design](docs/v4/phase-21-visual-design.md)、[dramatic content](docs/v4/phase-21-dramatic-content.md)、[playtest](docs/v4/phase-21-playtest.md)。

## Phase 22 Creative Overhaul

Phase 22 把内容库从 **113 / 2,124 / 32** 扩展到 **117 states / 2,160 kernels / 34 packs**，新增：

- `pack-dramatic-overhaul`：20 kernels、2 states、100 adaptive contexts、20 checks、20 conditional outcomes、280 compiled scenes；山羊继承、仇人婚礼、道歉变求婚、假订婚、继承债务、假剧评、诅咒彩票等，5 comic / 5 romantic / 5 dark / 5 warm。
- `pack-early-life-drama`：16 kernels、2 states、49 adaptive contexts、8 checks、16 conditional outcomes；0–7 岁，家庭/产婆/医生/邻居/公证人视角。
- 3 个早期 base scenes（死人的信、抱错孩子的传闻、孩子重复外婆的愿望）+ 4 个高频 base scene retrofit。
- `high_drama` ×1.9 / `drama` ×1.4 权重层，让带 tag 的内容更常出现。
- **原创 200×240 分层 SVG 半身像**替换 LPC 64×64：年龄、发型、服装、职业配件、fame/scandal/grief/illness/debt/curse、情绪/健康、死亡。

自然 A/B/C：**62,267 events / 4,104 focal**；总 drama focal **144（3.51%）**，其中 **early 119 / adult 25（0.61%）**；early-life pack **1,283 world（2.06%）**；4/4 新 State 出现；repeatRate **0.2613**。

独立 Critic（修订前）给 **Scene 24/30、Life 20/30**（Phase 21: 24/19）；Visual Critic 给 Character art **4.5/10**、Visual identity **4/10**。完整证据见 [report](docs/v4/phase-22-report.md)、[creative direction](docs/v4/phase-22-creative-direction.md)、[dramatic content](docs/v4/phase-22-dramatic-content.md)、[visual design](docs/v4/phase-22-visual-design.md)、[playtests](docs/v4/phase-22-playtests.md)、[critique](docs/v4/phase-22-critique.md)。

## 已知限制与边界

- **内容范围**：静态运行时 183 个事件场景（含 104 个生成场景、519 条生成叙事变体）和 50 个主动 Task（144 outcomes/288 narrations）；另有运行时 content pack 机制，发布后动态加载，仍只是维也纳切片，不是完整 1900 地球人生。离婚、再婚、同性关系、继承和住房容量已有第一版机制，但缺少玩家选择、完整法律程序、再婚/继承分配策略和大规模内容覆盖。
- **人口与生命周期**：已加入单岁×性别人口队列、背景人口具名化、跨区迁移和具名化审计；具名化不再被 4/年上限机械打满。求偶、生育和死亡现在共享同一家庭生命周期：已有伴侣不能重复求偶，死者的伴侣关系会结束，新生儿进入有真实容量和监护人的家庭，单户在世人数受住址硬上限约束。88 年试玩中最大在世家庭 12 人，不再是单户 60+ 人。仍缺具名人物迁出/迁入的完整工作/关系对账，以及职业/阶层/家庭联合分布。
- **性能**：20k 简化 in-memory 单年约 0.59s；1k/5k/10k/20k 线性化改善。完整 20k PostgreSQL/API/WAL/内容密度未测。
- **历史参与**：4 个真实人物、2 个初始历史进程、13 个历史场景是深度垂直切片，不是全球历史名人库。Phase 7 已让真实人物和组织自主行动、底部进程自然出现，但多地区传播、完整战争/疫情仿真和 20k 历史索引仍有限。
- **可读性**：已故人物年龄固定在死亡时，API 本地化死因，普通事件有中文标题。Phase 7 已让死亡日期锚定到该人物最后一条已提交事实，长期试玩不再出现“死亡后行动”；旧存档中的历史事实仍按原样保留。
- **自主行动**：agency 是确定性规则循环，不是通用规划器；长期照护、支持进程等行动可能重复出现，内容多样性仍需继续扩展。
- **历史遗产**：legacy 目前只做结构性参数变化和事件权重/条件，不做政策废除、预算或跨地区传播。分裂是低频确定性规则，不是完整派系政治。
- **组织/历史**：social_change 可创建组织并经历成员/dues/declining/ended；多地区长期 LLM 历史仍只做了两轮单地区真实调用。
- **WorldDevelopment**：目前支持 `social_change` 创建真实组织、事件池和成员事件；其他类型仍可能只记录为参数/能力缺口，不能凭空创建任意机制。
- **运行时内容**：content worker 已能真实生成/验证/发布并在下一 tick 加载，但自动 enqueue 只覆盖 social_change，没有完整预算/审批/版本管理。
- **宏观与 LLM**：Director 只验证了维也纳/1917 的真实路径；多地区、多年代长期自主运行、无法映射的新组织/技术仍会记录为能力缺口。
- **经济**：家庭/组织账本包含工资、租金、食物、债务和显式月度外部收入/营收；没有完整市场、价格形成、税收、生产链或驱逐机制。Bauer 家庭在工伤后可能长期欠租而不被驱逐，这是当前缺口。
- **时间**：世界按年推进，普通场景日期分布到 12 个月，但仍是年度 tick，不是逐月事务队列。模型/场景决策是同步的确定性权重，异步 LLM 用于 Birth Contract 和 Macro Director。
- **出生契约**：Birth Contract 2.0 返回有界 reading/privateGoal/focus/trait/skill/capability/conditions/limits/costs；服务端复核后持久化。能力只改变事件权重/资格并产生年度代价，不保证实现；文本过滤仍是启发式。
- **统计模型**：不是医学或人口学精确模型；1912 基准约 45 年预期寿命/24% 5 岁以下死亡是当前夹具，需继续用来源校准；四个情境是测试夹具，不是历史预测。感染/产妇已按月推进，但没有治疗资源、医院容量和疾病分型。
- **旧代码**：v1–v3 的引擎、旧 UI、旧测试仍在仓库中作为冻结参考；`pnpm dev` 不启动它们，旧世界已归档。不要用旧报告数字代表 v4。
- **部署**：未做生产部署、Compose 实测、万人负载或公网验收。

## 资料与许可

维也纳内容使用 `packages/v4/content/vienna-1912.ts` 中登记的 20 条公开来源，包括 Wien Geschichte Wiki、Habsburger.net、ÖAW、ORF、Parlament 等，均是社会/制度史层面的定性引用，不是档案页码。画面纸娃娃素材来自 LPC，作者与许可证保存在 `apps/web/public/lpc/`。

旧 v3 文献、Earth 数据、地图与历史来源仍保留在仓库中；它们支撑 v4 的后续扩展，但不自动等于 v4 已实现的机制。v3 的旧验收报告见 [docs/v3/implementation-report-v3.md](docs/v3/implementation-report-v3.md)，v4 的当前证据见 [docs/v4/implementation-report.md](docs/v4/implementation-report.md)、[Phase 7 验收报告](docs/v4/phase-7-report.md)、[Phase 8 验收报告](docs/v4/phase-8-report.md) 与 [事件运行时/内容工厂报告](docs/v4/content-runtime-report.md)。
