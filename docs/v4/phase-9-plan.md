# Phase 9：Large-Scale Life Content & Coverage

更新：2026-11-03  
目标：不新增 Engine，使用已有 Task/Event 执行层，真实生产并发布一大批多样内容；用有效候选与长期人生验证覆盖，而不是只增加 JSON。

## 核心契约

1. 继续使用 `TaskDefinition`（主动）与 `SceneDefinition`（遭遇），共享 roles/conditions/outcomes/narration/effects。
2. 不新增 Task System、Life Planner、Narrative Planner 或第二套动作执行器。
3. 内容生产以 **生活领域 × 年龄/阶层/职业/关系** 组织：
   - childhood / education；
   - work / occupation；
   - family / social / daily culture；
   - health / politics / history / cultural contact；
   - elderhood / solitude / unemployment（第二轮按有效候选缺口补充）。
4. 每批内容必须有事件与任务，而不是只扩被动场景或只扩 Task。
5. 任务和事件定义必须通过现有验证；失败内容不发布。
6. 发布后按有效候选池审计，不以定义总数作为覆盖证明。
7. 对比 Phase 8 与 Phase 9 内容池，固定 seed + 多个 seed，比较候选、实际经历、重复、职业/阶层差异、历史参与、统计与性能。
8. 保留 Phase 8 的 5 类人生，并加入多个随机出生样本。

## 实际生产结果

真实模型：`opencode-go/deepseek-v4.1-flash`。全部经由现有 `generatePack`、schema/role/condition/effect 校验、`validateAuthoredPack` 与语义近似去重。

| 项目 | 实际值 |
| --- | ---: |
| Phase 9 Family / pack | 27 |
| six-node definitions | 162 |
| Task nodes | 60 |
| Event nodes | 102 |
| outcomes | 487 |
| narration variants | 974 |
| 最终发布 pack 的 tokens | 530,721 |
| 累计 tokens（含被丢弃重生成） | 1,123,277 |
| 发布失败 | 0（最终） |
| 精确重复 outcome | 0 |
| 近似重复（bigram ≥ 0.82） | 0 |

Phase 9 发布后的总池：

- 110 个 Task（Phase 8 50 + Phase 9 60）；
- 206 个 generated event scenes（Phase 8 104 + Phase 9 102）；
- 连同作者场景共 285 个 event definitions；
- `ALL_TASKS` / `ALL_EVENT_SCENES` 用于实际游戏，Phase 8/9 数组保留用于 before/after。

### 生产批次

1. childhood（5 包：家庭、学校、青春期、学徒、青年志向）
2. work（5 包：印刷、商店、运输、求职、职业生涯）
3. social（5 包：求偶、家庭照护、邻里、关系主动、日常文化）
4. history（5 包：医疗、工会政治、战争后方、公共行动、文化接触）
5. gaps（5 包：儿童家务任务、失业者事件、普通成人日常、老年日常、老年主动任务）
6. solitude（2 包：独居成人与独居老人的普通事件）

失败与修复记录：

- childhood 首次一处 narration 未声明 token，修复后重跑。
- history 的 medical/cultural-contact 首次 knowledge effect 形状错误；生成器加入 knowledge 规范化后重跑。
- union-political 生成的 `food`/`knowledge`/organization role 与 brief 不一致；按语义补入允许 effect 和 `union` organization role 后重跑。
- gaps 的 unemployed 包首次使用未允许的 knowledge effect；补入“求职线索”语义后重跑。
- 修复了 narration token 过滤过严的问题：只丢弃真正未解析的 token，不再丢弃所有含角色 token 的变体。

## 有效候选与长期人生

同一 Engine、同一初始世界：

- `scripts/v4-phase9-coverage.ts`：35 年、全 living 人物候选审计；
- `scripts/v4-phase9-compare.ts`：Phase 8 vs Phase 9，3 个 seed × 35 年；
- `scripts/v4-phase9-lives.ts`：45 年 treatment/control，五种固定人生 + 6 个随机出生；
- `scripts/v4-playtest.ts`：88 年 treatment/control；
- `scripts/v4-content-audit.ts`：88 年内容/统计审计。

实际结果见 [phase-9-report.md](phase-9-report.md)、[phase-9-compare.json](phase-9-compare.json)、[phase-9-coverage.json](phase-9-coverage.json)、[phase-9-lives.json](phase-9-lives.json)、[phase-9-content-report.json](phase-9-content-report.json)。

## 关键实现修正

1. **有效候选预筛选**：`chooseContentTask` 只在真正可 cast、可选 outcome 的 Task 中加权选择，避免高分数但不可执行的 Task 占掉年度行动。
2. **Task 与 Agency 共存**：内容 Task 必须超过计划阈值才替代 Agency plan；组织领袖的会议/招募/出版/过程行动优先，避免大 Task 池静默取代自下而上历史。
3. **事件 provenance 扩展**：生成事件从仅 `birth`/`initial` 扩展到 `materialized_population`/`historical_activation`。否则 materialized 成人只有 Task、没有被动事件，候选审计出现 79/164 人事件池为 0。
4. **独居内容**：新增 subject-only 事件族，保证没有可 cast 邻居/工人的成人也有普通生活事件。
5. **Task 事件识别**：Phase 9 Task id 不以 `task-` 开头；报告按 `TASK_IDS` 分类，不再漏计。

## 验收命令

```text
pnpm typecheck
pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm exec tsx scripts/v4-phase9-content-batch.ts --group <group>
pnpm exec tsx scripts/v4-merge-phase9-content.ts
pnpm exec tsx scripts/v4-build-phase9-registry.ts
pnpm exec tsx scripts/v4-phase9-content-report.ts
pnpm exec tsx scripts/v4-phase9-coverage.ts
pnpm exec tsx scripts/v4-phase9-compare.ts
pnpm exec tsx scripts/v4-phase9-lives.ts
pnpm v4:playtest
V4_PLAYTEST_TASKS=0 pnpm v4:playtest
pnpm v4:audit 88
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
```

## 非目标 / 明确限制

- 不实现百万级内容数据库/全球城市迁移。
- 不为数量放宽年龄、职业、地点、时代或关系验证。
- 内容仍按单一 lifecycle stage 索引；大量 authored ageWindow 被 stage bucket 裁剪；不能声称所有窗口都实际可达。
- 童年 Task 平均有效候选仍低于成人；儿童主动行动受家庭/学校条件限制。
- 老年内容只有两族，覆盖已有提升但仍不如成人丰富。
- 生成事件现在可作用于 materialized population，因此事件总量上升；必须继续监控基础风险是否被内容数量放大。
- 组织领袖优先计划后，45 年 treatment 仍有 7 个 historical developments，低于 control 的 9 个；Task 内容尚未包含“创建组织/过程”的原语组合。
