# 世界人生 · Another History

1900 年前后的真实地球，历史尚未确定。玩家创造一个新生儿：名字、性别、身体条件、外貌和一段自由祝愿。孩子进入一个已经存在的家庭，之后基本不再受玩家指挥；家庭、学校、工作、疾病、战争与制度会共同改变他的一生。

当前交付是一个 **v4 断代重写**，不是旧 v1–v3 的补丁。旧世界已经归档，旧日志/旧出生流程不再由开发服务器启动。当前唯一可玩的垂直切片是 **维也纳 1912–1918 及其后的通用人生线**。Phase 3 已加入可版本化的宏观状态、统计死亡/感染风险、真实 LLM Macro Director 和 macro-driven 事件池。Phase 4 又接入了单岁×性别人口队列、背景人口具名化、WorldDevelopment→组织、运行时 Content Author 和回归式事件内容。

## 现在实际能做什么

- 注册/登录，写下一个新生儿的姓名、性别、身体条件、外观与自由祝愿。
- 出生请求立即返回；孩子先进入 Bauer 家庭的真实住址，愿望的模型解释在后台异步完成，不阻塞世界时钟。
- 三栏观察器：左侧人物档案与家庭，中间只读的个人日志，右侧维也纳示意地图与时代背景。
- 世界约每 30 秒推进一年；已提交事件写进 PostgreSQL，刷新/重连后从记录恢复。
- 19 个维也纳 1912–1918 作者场景：印刷厂工伤、房租与医疗、学校/学费、女子中学、家庭折页、工会、1914 动员、配给队列、1918 流感、孤儿监护。
- 19 个通用人生场景：婴儿喂养/发烧、入学、课堂、童工、1918 流感、学徒、工伤、1930 年代失业、1938、二战征召/空袭、1945、退休与老年死亡。通用场景只使用角色相对引用，可以落到玩家新生儿身上。
- 8 个家庭/关系场景：求婚/同居、婚礼、女性生育、男性成为父亲、离婚、女性同性共同生活、男性同性关系风险。孩子是真实 Person，拥有父母/监护人关系、家庭住址和自己的出生事件。
- 92 个由 LLM 内容工厂生成并验证的维也纳场景（23 个事件族），另有 447 条条件化叙事变体；覆盖印刷厂、合租楼、学校、市场、学徒、疾病、教区、街头童年、青春期、成年社交、婴儿期、老年、恋爱、住房、医疗、教区互助、债务、女性家务和战时家庭。
- 年度事件运行时不再“一年只选一个场景”：按年龄/身份/地点的发生率抽样多个普通事件，事实/后续事件进入队列，人物请求由对方独立回应。
- 每个事件有真实参与角色、年龄、地点、类型化效果和后续记录；文本来自场景 outcome，不由日志模板生成。

**尚未完成**：完整多地区长期 Director、具名人口迁出/迁入账本、联合分布具名化、20k 完整持久化/并发压测、公网部署。内容工厂已有 runtime job → 真实生成 → 验证 → DB 发布 → 下一 tick 动态加载链路，但只有 social_change 自动触发，且不是无限/无人值守内容生产。婚姻/生育仍是自动场景，不是玩家选择或完整婚配系统。Phase 4 证据见 [phase-4-report.md](docs/v4/phase-4-report.md)。

## 启动

```sh
pnpm install --frozen-lockfile
pnpm db:local
pnpm dev
```

打开 <http://localhost:5173>。`pnpm dev` 启动：

- `apps/v4-api`：认证、世界读取、出生请求、SSE
- `apps/v4-simulator`：v4 单写者、年度场景推进、出生落地
- `apps/v4-birth-worker`：异步出生愿望解释（无 key 时失败重试后保留原愿望）
- `apps/v4-macro-worker`：异步 LLM Macro Director（真实提案、验证、revision-locked 应用）
- `apps/v4-content-worker`：运行时 Content Author（job → 真实生成 → 验证 → 动态发布）
- Vite 观察器

首次启动会自动应用 `003_v4.sql`、`004_v4_birth_contracts.sql`、`005_v4_macro.sql` 与 `006_v4_runtime_content.sql`，并在没有活动世界时播种 Vienna 1912。宏观状态、单岁人口和发展对象随世界写入 `v4_worlds.macro`。环境变量见 `.env.example`；`.env` 不应提交。

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

## 已知限制与边界

- **内容范围**：静态运行时 138 个场景（含 92 个生成场景、447 条生成叙事变体）；另有运行时 content pack 机制，发布后动态加载，仍只是维也纳切片，不是完整 1900 地球人生。离婚、再婚、同性关系、继承和住房容量已有第一版机制，但缺少玩家选择、完整法律程序、再婚/继承分配策略和大规模内容覆盖。
- **人口与生命周期**：已加入单岁×性别人口队列、背景人口具名化和跨区迁移守恒；但具名人物迁出/迁入、联合分布（职业/阶层/家庭）和完整人口学仍是缺口。
- **WorldDevelopment**：目前支持 `social_change` 创建真实组织、事件池和成员事件；其他类型仍可能只记录为参数/能力缺口，不能凭空创建任意机制。
- **运行时内容**：content worker 已能真实生成/验证/发布并在下一 tick 加载，但自动 enqueue 只覆盖 social_change，没有完整预算/审批/版本管理。
- **宏观与 LLM**：Director 只验证了维也纳/1917 的真实路径；多地区、多年代长期自主运行、无法映射的新组织/技术仍会记录为能力缺口。
- **经济**：家庭/组织账本包含工资、租金、食物、债务和显式月度外部收入/营收；没有完整市场、价格形成、税收、生产链或驱逐机制。Bauer 家庭在工伤后可能长期欠租而不被驱逐，这是当前缺口。
- **时间**：世界按年推进，普通场景日期分布到 12 个月，但仍是年度 tick，不是逐月事务队列。模型/场景决策是同步的确定性权重，异步 LLM 用于 Birth Contract 和 Macro Director。
- **出生契约**：Birth Contract 2.0 返回有界 reading/privateGoal/focus/trait/skill/capability/conditions/limits/costs；服务端复核后持久化。能力只改变事件权重/资格并产生年度代价，不保证实现；文本过滤仍是启发式。
- **统计模型**：不是医学或人口学精确模型；1912 基准约 45 年预期寿命/24% 5 岁以下死亡是当前夹具，需继续用来源校准；四个情境是测试夹具，不是历史预测。
- **旧代码**：v1–v3 的引擎、旧 UI、旧测试仍在仓库中作为冻结参考；`pnpm dev` 不启动它们，旧世界已归档。不要用旧报告数字代表 v4。
- **部署**：未做生产部署、Compose 实测、万人负载或公网验收。

## 资料与许可

维也纳内容使用 `packages/v4/content/vienna-1912.ts` 中登记的 20 条公开来源，包括 Wien Geschichte Wiki、Habsburger.net、ÖAW、ORF、Parlament 等，均是社会/制度史层面的定性引用，不是档案页码。画面纸娃娃素材来自 LPC，作者与许可证保存在 `apps/web/public/lpc/`。

旧 v3 文献、Earth 数据、地图与历史来源仍保留在仓库中；它们支撑 v4 的后续扩展，但不自动等于 v4 已实现的机制。v3 的旧验收报告见 [docs/v3/implementation-report-v3.md](docs/v3/implementation-report-v3.md)，v4 的当前证据见 [docs/v4/implementation-report.md](docs/v4/implementation-report.md) 与 [事件运行时/内容工厂报告](docs/v4/content-runtime-report.md)。
