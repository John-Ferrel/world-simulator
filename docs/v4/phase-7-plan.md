# Phase 7 关键路径：Autonomous Living World

更新：2026-11-03  
目标：让普通人和组织拥有可观察的主动行动；让历史进程通过实际参与、资源和冲突演化，并把结果沉淀为跨代制度/记忆；修正 canonical 时序。不是新增大型 Agent Framework，也不是继续堆人物数量。

## 核心契约

1. **行动仍使用现有原语**：`Person`、`Organization`、`Project`、`Interaction`、`Relation`、`Knowledge`、`EventEffect`、`EventFact`。不建立第二套人物或历史行动系统。
2. **自主行动是确定性的年度 initiative 循环**：`packages/v4/agency.ts` 从人物目标、关系、组织、位置、健康、资源和历史参与生成最多 8 个候选；Engine 选择、结算、提交事件。不是每人每月调用 LLM，也不使用预编排测试脚本。
3. **人物目标**：`Person.agency` 只保存目标类型、短摘要、起始时间和上次行动；目标由当前家庭/工作/健康/组织/历史参与派生，遇到重大变化会改变。儿童不执行成人组织/工作/招募行动。
4. **组织自主性**：组织可由正式职位持有人或（无职位时）最健康、社会能力最高的成员代表行动；招募、开会、筹款、出版、互助、成立持续运动都产生真实 membership/treasury/project/relation/event 后果。
5. **反向历史**：当一个有真实成员、持续 agency 行动和组织的团体达到条件时，`planBottomUpProcess()` 可创建 `WorldDevelopment.historical`；不需要 Director 先批准。Director 在之后快照中识别它。
6. **生命周期**：`development.end` 只是复查日期，不是强制结束。阶段由参与人数、活着的组织成员、资源、行动 recency、支持/反对/升级/合法性计算；可继续、衰退、停滞、升级、制度化、压制、分裂、结束。停滞进程需要连续无活动才结束。
7. **持久 legacy**：`MacroState.legacy` 保存 `reform`、`repression`、`war_aftermath`、`public_health_regime`、`cultural_institution`、`organization_split`、`social_memory`。Legacy 改变地区结构性 baseline 参数和事件池权重，进入内容条件；不是永久 `support +0.1`。
8. **Director 行动**：提案可包含最多 6 个有界 `actions`（organize/recruit/negotiate/publish/relief/repress/reform/spawn_process）。MacroStore 只验证并排队；Engine 在下一 tick 以真实项目、关系、membership、资金、Interaction、legacy 和事件执行，失败/跳过可审计。
9. **时序**：死亡事件日期锚定到该人物已提交事实的最晚日期；年度统计/经济/到期项目/交互/场景/死亡按统一年度顺序；死亡后不再选择行动，原因不晚于后果。
10. **内容**：Content Author 继续使用严格 schema；新增 `legacy` 条件与 `organization_funds` 原语。内容围绕真实 legacy 生活，而不是世界状态叙述。

## 实施顺序

1. 修复死亡日期与 canonical 事件时序，增加长期回归。
2. 实现 `agency.ts` 人物/组织 initiative、儿童年龄边界、底部进程。
3. 重写历史进程生命周期与 legacy；把 legacy 接入 Macro、事件权重、场景条件、API/UI。
4. 增加 Director actions 的 schema、验证、pending queue、Engine 执行。
5. 扩展 Content Author：`legacy` 条件、`organization_funds`、Phase 7 briefs；真实 LLM 生成并验证。
6. 运行自由演化 A–F、反事实、跨代、完整人生、性能、构建、浏览器。
7. 只归档不删除旧世界；新建世界用当前代码，保留归档证据。

## 验收证据

- `pnpm typecheck`
- `pnpm test`
- `pnpm exec vitest run tests/v4-*.test.ts`
- `pnpm v4:phase7-experiments` → `docs/v4/phase-7-experiments.json`
- `pnpm v4:history-director-demo` → `docs/v4/phase-7-director-demo.json`
- `pnpm exec tsx scripts/v4-content-author.ts --generate vienna-legacy-worklife`
- `pnpm exec tsx scripts/v4-content-author.ts --generate vienna-war-aftermath-life`
- `pnpm v4:playtest`, `pnpm v4:audit 88`, `pnpm v4:life-demo`
- `pnpm build`, `pnpm test:e2e --config playwright.v4.config.ts`

## 非目标

- 不新增 20 位名人；不把人物数量当成功标准。
- 不实现完整战争策略、政治经济数字孪生、全球历史年表。
- 不让 LLM 直接设置阶段/胜负/死亡，不执行任意模型代码。
- 不重写 PostgreSQL 存储，不 reset 旧世界。
