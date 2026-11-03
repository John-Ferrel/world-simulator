# Phase 10：Million Stories · 重大人生事件与文学叙事工厂

更新：2026-11-03  
目标：在既有 Engine / Agency / Task / Event / Historical Process / Content Author 上，增加真正改变人生轨迹的内容，并把内容生产拆成可并行的架构、情节、机制、文学、审校、验证和试玩流水线。

## 1. 不可破坏的契约

1. 不新增第二套 Task/Event 执行器；新内容仍编译为 `SceneDefinition` / `TaskDefinition`。
2. 重大叙事必须对应真实 typed effect：教育、就业、失业、关系、婚姻同居、出生、死亡、伤病、迁移、组织、财产、角色。
3. Narration 不得宣布 Engine 没有发生的变化。
4. 生成内容必须通过现有 schema/role/condition/effect 校验；失败不发布。
5. 历史事件只在真实世界状态满足时发生；不按 1914/1918 固定播放。
6. 观察器使用稳定 Person/Event/Process ID 做语义高亮，不对任意文字做正则猜测。

## 2. 内容结构

### 2.1 手工重大事件

新增四个 authored 内容文件，作为 Phase 10 的“决定性事件”骨架：

- `major-education-work.ts`：奖学金考试、学徒出师、退学、夜校、大学注册、第一份工作、晋升、解雇、工伤、创业、退休。
- `major-family.ts`：求婚、拒婚、婚姻、怀孕生育、婴幼儿死亡、分居/丧偶。
- `major-crisis.ts`：驱逐、工伤残疾、警察突袭、街头政治暴力、战争动员、难民迁移。
- `major-life-tasks.ts`：申请奖学金、资格考试、要求晋升、求婚、组织罢工、迁居/流亡。

这些内容必须包含具体人物、目标、阻碍、行动、结果和真实 effect。

### 2.2 生成内容扩容

在手工骨架之外，用现有 Content Author 批量生产教育/职业/家庭/危机/政治领域的具体事件族；每包 6 nodes，仍按 group 生成、验证、去重、发布。目标是在本轮真实增加数百个可执行定义，而不是只增加 30 条手工样例。

### 2.3 文学风格

每个事件按情境选择不同叙事气质：冷峻现实、黑色幽默、官僚荒诞、心理恐怖、身体恐怖、战争残酷、讽刺、温情、日常喜剧、悲剧、反转。禁止统一 AI 文风；禁止用煤灰、雨水、石阶等装饰词代替事件核心。

## 2.4 Phase 9 基线（45 年）

`phase-10-major-audit-baseline.json`：

- 7,412 事件；按严格 major effect 统计 1,103 件（14.9%）；246 名人物经历至少一次重大变化。
- employment effect 仅 2 次、education 29、unemployment 7。
- 重大变化主要由组织招募、统计死亡、生育和医疗事件贡献；正式就业/失业/教育转折明显不足。

Phase 10 的内容与审计要直接改善这些数字，而不是只增加总事件数。

## 2.5 实际结果

| 项目 | 实际值 |
| --- | ---: |
| authored nodes | 30（24 Event + 6 Task） |
| generated packs | 8 |
| generated nodes | 48（24 Event + 24 Task） |
| Phase 10 新增 nodes | 78 |
| Phase 10 新增 outcomes | 233 |
| generated narrations | 286 |
| generated tokens（最终发布） | 141,933 |
| 含失败 family 重生成累计 | 约 171,333 |
| 最终发布失败 | 0（family 重跑后） |
| 总 Task | 140 |
| 总 generated Event scenes | 254 |
| 总 Event definitions | 333 |
| 可执行定义合计 | 473 |

45 年 major audit：6,741 事件 / 1,048 major（15.5%）/ 245 changed persons；employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→122。education 29→10、birth 80→50，不能宣称所有重大覆盖都提高。

Critic 首轮 13 样本 5 通过 / 8 失败；定向改写后 11 个 P0 节点全部 ≥36/50（2 个窄过）。详见 `phase-10-critique.md` / `phase-10-critique-addendum.md`。

## 3. 多 Agent 生产流水线

| 角色 | 职责 | 本轮实际执行 |
| --- | --- | --- |
| A Content Architect | 领域/空白/优先级 | Main + coverage 数据 |
| B Plot & Incident | 具体情境、目标、冲突、结果 | 4 个内容 Subagent |
| C Mechanics & Consequence | roles/conditions/effects | 内容 Subagent + Main review |
| D Literary Writer | 具体动作、对话、节奏、风格 | 内容 Subagent |
| E Critic & Rewrite | 具体性/因果/张力/重复 | Critic Subagent + Main 定向改写 |
| F Validator & Publisher | schema/effect/runtime/duplicate | Main + tests + scripts |
| G Playtest & Feedback | 实际触发、重复、缺口 | Main + coverage/lives/playtest |

并行批次不共享文件；Main 固定 schema、effect 词汇、place ID 和验收命令。

## 4. UI 语义层

API 在 `projectEvent` 中返回稳定实体引用：

- `kind`: birth/death/history/major/ordinary
- `segments`: 文本 + person id/name/role/historical
- `processRefs`: process id/name/phase/description

前端：

- 普通人物可点击；历史人物更醒目；玩家本人有专属样式；
- Hover/focus 小档案：姓名、年龄/生卒、职业、地点、关系、历史身份、当前目标、重要参与；
- 重大事件有独立视觉层，点击打开事件档案；
- 历史进程 chip 可 Hover/点击打开进程档案；
- 触屏点击等价于 hover；键盘可聚焦。

## 5. 验收

```text
pnpm typecheck
pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
pnpm v4:phase10-content
pnpm v4:phase10-registry
pnpm v4:phase10-consistency
pnpm v4:phase10-coverage
pnpm v4:phase10-major-audit
pnpm v4:playtest
```

必须统计：

- 新增定义 / 可执行定义 / 语义不同事件；
- 重大 effect 实际触发：就业、失业、教育、婚姻、出生、死亡、伤病、迁移、组织参与；
- 文学评审样本与定向改写；
- 生产 tokens、失败、返工；
- 长期人生和性能；
- UI 实际浏览器验证。

## 6. 非目标

- 本轮不实际生成百万份 JSON；百万级指可扩展实例化目标。
- 不伪造“千级”数量；实际新增数以发布报告为准。
- 不为戏剧性强迫每个人结婚、成功、参战或死亡。
- 不引入任意模型代码、SQL、HTTP 或未声明 effect。
