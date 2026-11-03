# Phase 8：Life Diversity & Content-Driven Agency

更新：2026-11-03  
目标：让主动任务成为内容层可扩展的一等公民，让不同人物主动做不同的事，经历不同的人生；不是继续扩宏观系统。

## 核心契约

1. `TaskDefinition` 复用 `SceneDefinition` 的角色、条件、outcome、narration、effect、followup 语法；额外携带 `task` 元数据（domain/goals/needs/baseUtility/risk/skills/capability）。
2. Task 从 Agency 进入，Event 从年度发生率进入。二者共享：
   - `RoleRequirement`、`SceneCondition`；
   - `castSceneRoles`、`selectOutcome`；
   - `EventEffect`、`EventFact`、`Project`、`Interaction`、`Knowledge`；
   - 后续事件、冷却、事件历史。
3. 内容工厂生成 Task 时，结构由 brief 固定；模型只写具体 outcome 和叙事。新增 Task 不需要修改 `agency.ts` 的 switch。
4. `taskUtility()` 是可解释的轻量选择模型：
   - 目标匹配；
   - 现金/食物/健康/归属/地位/照护需求；
   - 大五人格；
   - 技能匹配；
   - 风险和健康折损；
   - 特殊 capability；
   - 最近同 domain 的重复惩罚。
5. 硬编码行动保留为基线：求职、照护、组织会议、支持/反对进程等；内容 Task 扩展具体情境。
6. 内容工厂批量生产 8 族、48 个 Task、144 outcomes、288 narrations；元数据、角色、条件、效果和 token 在发布前验证。
7. Task 实际候选池按人物处境审计，不把“定义总数”当“有效候选数”。
8. 重复来源分三类处理：
   - 扩大 Task/Event 候选；
   - 给 Task 默认冷却和重复惩罚；
   - 用 `LifePassage` 把真实事实组织成可读片段，但不删除事实。
9. 五种人生在同一实际世界中运行：贫穷学徒、富裕青年、医生、政治活动者、特殊出生能力者。

## 实施顺序

1. 定义 `TaskDefinition` / `GeneratedTaskMeta`，扩展生成与验证。
2. 在 Engine 建立 tasksByStage 索引和内容 Task 选择；接入实时 simulator、API、脚本。
3. 增加 `auditCandidatePools()`，按事件/任务/人物处境统计有效候选。
4. 编写 Phase 8 Task Briefs（8 族 × 6 nodes）。
5. 真实 LLM 批量生成并验证；记录 tokens、通过数、语义重复。
6. 运行五种人生与 control/treatment 对比；检查任务、历史接触、重复、叙事。
7. 运行 v4 专项、长期试玩、审计、构建、浏览器和性能对比。
8. 更新报告、README、implementation report；保护旧世界。

## 验收命令

```text
pnpm typecheck
pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm v4:phase8-content
pnpm v4:phase8-candidates
pnpm v4:phase8-lives
pnpm v4:playtest
V4_PLAYTEST_TASKS=0 pnpm v4:playtest
pnpm v4:audit 88
V4_AUDIT_TASKS=0 pnpm v4:audit 88
pnpm v4:runtime-benchmark 20000 1
V4_BENCH_TASKS=0 pnpm v4:runtime-benchmark 20000 1
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
```

## 非目标

- 不实现百万级事件数据库或全球城市迁移网络。
- 不把每个任务都做成 Interaction；只有真实需要对方回应的内容才使用。
- 不让模型直接执行代码、SQL、HTTP 或写任意 effect。
- 不删除长期照护/工作/组织的真实事实，只为阅读组织 passage。
- 不用放宽核心验证来换取生成通过率。
