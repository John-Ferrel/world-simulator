# Phase 10：Million Stories · 重大人生事件、文学叙事与语义观察器

日期：2026-11-03  
基线：Phase 9 `b05ce22`  
目标：在既有 Engine 上增加真正改变人生轨迹的内容，建立可并行的内容生产/审校流水线，并让观察器用稳定 ID 展示人物、重大事件与历史进程。

## 0. 状态总表

| 项目 | 状态 | 证据 / 边界 |
| --- | --- | --- |
| 手工重大事件 | 完成 | 24 个事件 + 6 个主动任务；真实 education/employment/death/birth/move/relation 等 effect |
| 生成重大事件 | 完成（真实模型） | 8 个 Family / 48 nodes / 144 outcomes / 286 narrations；141,933 tokens |
| 内容总池 | 完成 | 140 Task / 333 Event definitions（254 generated + 79 authored） |
| 文学审校 | 完成（抽样） | 首轮 13 样本 5 通过 / 8 失败；定向改写后 11 个 P0 节点全部 ≥36/50 |
| 重大 effect 实际触发 | 完成（45 年） | 6,741 事件 / 1,048 major / 245 changed persons；employment 11、unemployment 18、death 122、move 37、residence 50 |
| 多 Agent 生产 | 完成 | 4 个内容 Subagent + 1 个 UI Subagent + Critic；主代理集成/验证 |
| 有效候选 | 完成 | 136 living；avg Task 7.13 / Event 23.95；76/140 Task 实际触发 |
| 长周期试玩 | 完成 | 88 年 playtest；见第 6 节 |
| 语义 UI | 完成 | 人物/事件/进程稳定 ID、高亮、Hover 档案、点击档案/跳转；e2e 通过 |
| 百万级定义 | 未完成 | 本轮 473 个可执行定义，不是百万 JSON；不能把组合数当已生成内容 |

## 1. 实际内容规模

### 1.1 新增

| 类别 | nodes | outcomes | narrations |
| --- | ---: | ---: | ---: |
| authored events | 24 | 72 | 0（immediateText 直接承载事实） |
| authored tasks | 6 | 17 | 0 |
| generated events | 24 | 72 | 143 |
| generated tasks | 24 | 72 | 143 |
| **Phase 10 新增** | **78** | **233** | **286** |

生成生产：8 packs / 48 nodes / 144 outcomes / 286 narrations，最终 141,933 tokens（明细见 `phase-10-production-cost.json`）；包含第一次失败 family 重生成的累计约 **171,333 tokens**。失败 1 次（birth effect 使用 `motherId`/`fatherId`），生成器加入 birth 形状规范化后重跑成功。

### 1.2 总池

| 项目 | Phase 9 | Phase 10 |
| --- | ---: | ---: |
| Task | 110 | **140** |
| generated Event scenes | 206 | **254** |
| 全部 Event definitions | 285 | **333** |
| 可执行定义合计（Task+Event） | 395 | **473** |

Phase 10 相对 Phase 9 增加 30 Task / 48 Event / 78 个可执行定义（+19.7%）。这不是千级或百万级定义库；百万级是实例化/持续生产目标，本轮没有用排列组合冒充。

### 1.3 覆盖领域

- 教育：奖学金考试、学徒出师、退学/半工半读、夜校、大学注册、教师推荐/申诉。
- 职业：第一份工作、晋升、解雇/短时工、工伤、自己的小作坊、病退/养老金。
- 家庭：求婚、拒婚、嫁妆、婚姻/同居、生育、婴幼儿死亡、分居/丧偶。
- 危机：驱逐/涨租、工伤残疾、警察突袭、街头暴力、战争创伤、边境/移民。
- 主动任务：申请奖学金、资格考试、要求晋升、求婚、组织罢工、迁居/流亡。
- 生成补充：教育门槛、职业转折、家庭命运、危机迁移，以及四个领域的主动任务。

## 2. 决定性事实审计

`phase-10-major-audit.json`：同一 Vienna 世界 45 年，全部 140 Task / 333 Event。

| 指标 | Phase 9 基线 | Phase 10 |
| --- | ---: | ---: |
| 总事件 | 7,412 | 6,741 |
| major effect 事件 | 1,103（14.9%） | 1,048（15.5%） |
| 经历重大变化的人物 | 246 | 245 |
| employment | 2 | **11** |
| unemployment | 7 | **18** |
| education | 29 | 10 |
| birth | 80 | 50 |
| death | 97 | 122 |
| move | 19 | 37 |
| residence | 24 | 50 |
| relation_end | 29 | 28 |
| household | 56 | 57 |
| condition | 344 | 350 |

解释：

- 正式就业、失业、迁移、住址变化、死亡明显增加；这是本轮“决定性人生事件”的主要成果。
- 总事件和出生/教育 effect 下降，不是“内容更多所以更好”的单向指标。Phase 10 内容改变了人口/行动路径，样本中年轻人口更少；不能宣称教育/出生覆盖同步提升。
- major effect 的绝对数略降（1,103→1,048），但 major share 略升（14.9%→15.5%）。这不是失败，也不能包装成全面增长。
- 45 年样本中 Phase 10 Family 实际触发 24 个 family；最高频是本轮新增/已有的危机、家庭、工作事件。

## 3. 文学流水线

### 3.1 角色分工

- **Content Architect**：Main 根据 Phase 9 coverage 确定教育/工作/家庭/危机/迁移缺口。
- **Plot & Incident**：4 个内容 Subagent 生成具体情境、目标、阻碍、行动、结果。
- **Mechanics & Consequence**：Subagent 写 typed effects；Main 用静态 validator、runtime audit、effect-text consistency 检查。
- **Literary Writer**：Subagent 写具体动作、对话、身体细节、不同语气。
- **Critic**：独立 Subagent 抽读 13 个 outcome；首轮 5 通过 / 8 失败，指出重复事故、效果与文本矛盾、时代错误、单一节奏。
- **Validator & Publisher**：Main 运行 `pnpm typecheck`、v4 专项、runtime smoke、build/e2e；失败不发布。
- **Playtest & Feedback**：Main 运行 45 年 major audit、35 年 coverage、88 年 playtest。

### 3.2 定向改写

Critic 报告见 `phase-10-critique.md` / `phase-10-critique-addendum.md`。首轮失败节点做了局部改写，不重生成整个包：

- 病退：改为 1909+ 的铅中毒病退，移除硬编码 1907–1909，替换“尘肺”。
- 婴幼儿死亡：白喉血清代替白粉；`bereaved_parent` → `bereaved_guardian`，避免把邻居孩子说成亲生。
- 警察突袭：警车 → 分局囚车；市政府 → 区公所；`police_record` → `detained_activist`。
- 战争伤：移除医生在救护所发银质奖章/抚恤金的荒谬流程；改为欠饷/士兵证/军邮；修正“换弹匣”。
- 边境：护照“退回原籍”改为申请表驳回 + 限期离境回执；32 克朗跨大西洋票改为 82 克朗（32 定金）。
- 罢工：把殴打、肋骨伤、十克朗罚款写进正文，匹配 health/condition/cash effects。
- 迁居：改为“有工作承诺”而非“有工作”；加火车/手推车；用“原作坊退工证明”替代与边境重复的姓名问题。
- 退学：14–15 岁、街角印刷作坊/家庭作坊，不再把 12 岁进工厂当正常选择。
- 婚姻：教堂行礼 + 市政补登记；求婚任务只给 engaged，不假装已结婚。
- 重复事故：工作工伤与危机工伤互斥 `disabled_worker`/`injured_worker`/`light_duty_worker`；警察突袭与罢工任务互斥相关 role。

**复核结果**：11 个 P0 节点全部达到 36/50；其中病退与腹部伤为 36 分窄过，仍有“人物被动/基金机构不够具体”等余留问题。不能宣称整库文学质量已达标，只证明定向重写有效。

## 4. 有效候选与性能

### 4.1 Coverage（35 年，全部 living）

`phase-10-coverage.json`：

| 指标 | Phase 9 | Phase 10 |
| --- | ---: | ---: |
| Task definitions | 110 | 140 |
| Event definitions | 285 | 333 |
| 在世人物 | 139 | 136 |
| 实际事件 | 5,672 | 5,910 |
| Task 事件 | 754 | 798 |
| 实际不同 Task | 64 | 76 |
| 平均 Task 候选 | 7.17 | 7.13 |
| 平均 Event 候选 | 24.21 | 23.95 |
| 未触发 Task | 46 | 64 |

Phase 10 新增 30 Task，但单人物平均候选没有上升（7.17→7.13）；新增内容有更多条件门控/职业/阶段限制。实际不同 Task 与 Task 事件上升（64→76、754→798），但不能说每个新增定义都会让所有人物更丰富。

按 stage（Phase 10）：

| stage | 人数 | 平均 Task | 平均 Event |
| --- | ---: | ---: | ---: |
| adulthood | 59 | 11.31 | 41.81 |
| elderhood | 46 | 5.76 | 14.85 |
| childhood | 17 | 1.59 | 3.94 |
| adolescence | 6 | 1.67 | 4.00 |
| infancy | 8 | 0 | 2.00 |

### 4.2 Phase 8 vs Phase 10（3 seed × 35 年）

`phase-10-compare.json`（脚本仍名 phase9，其 `all*` 即 Phase 10 全池）：

| 指标 | Phase 8 | Phase 10 |
| --- | ---: | ---: |
| 事件 | 4,677.33 | 5,778.67 |
| 每年事件 | 133.64 | 165.10 |
| Task 事件 | 580.33 | 823.00 |
| 不同 Task | 34 | 83 |
| action prefix | 169.67 | 313.33 |
| living Task 候选 | 1.25 | 7.83 |
| living Event 候选 | 11.80 | 24.03 |
| Task 候选为 0 | 72 | 14.67 |
| 历史人物关系 | 107.67 | 119.33 |
| 每年耗时 | 96.27 ms | 149.90 ms |
| 候选审计 | 3.12 ms/人 | 8.18 ms/人 |

Phase 10 内容池的 Task 候选、Event 候选、Task 事件、不同 Task 与历史关系均高于 Phase 8；代价是每年耗时 +56%、候选审计 +162%。

### 4.3 1k / 5k / 20k 合成人口

`phase-10-benchmark.json`，3 年，macro 开启，合成人物全部成年、Task 条件近似全通过（最坏 Task 选择负载）：

| 人口 | 无 Task | Phase 8 50 Task | Phase 10 140 Task |
| ---: | ---: | ---: | ---: |
| 1,000 | 60 ms/年 | 98 ms/年 | 97 ms/年 |
| 5,000 | 234 ms/年 | 553 ms/年 | 481 ms/年 |
| 20,000 | 967 ms/年 | 3,169 ms/年 | 2,485 ms/年 |

20k Phase 10 heap 约 393 MB；合成事件 29,681。140 Task 没有比 50 Task 更慢，因为 `chooseContentTask` 只对预筛选后的少量候选做 cast，失败时最多重试 8 次；没有“每人每 Tick 扫描全部内容”。

## 5. 语义 UI

实现位置：`packages/v4/store.ts`、`apps/v4-api/index.ts`、`apps/web/src/main.tsx`、`apps/web/src/style.css`。

- `V4EventLookups.personHistorical`：从 Person payload 读取历史身份，仅用于展示。
- `projectEvent` 新增 `kind`、`major`、`segments`、`processRefs`：
  - segments 只从**该事件实际 participants 的姓名**生成，不猜任意文本；
  - person segment 携带稳定 Person ID、role、historical；
  - processRefs 来自 `historical_participation`/`historical_influence`/`historical_process` effect 的 processId。
- UI：
  - 玩家人物、普通人物、历史人物、当前人物的不同样式；
  - Hover/focus 人物小档案：姓名、生卒/年龄、职业、地点、与当前人物关系、历史角色、当前目标/参与；
  - 重大事件独立视觉层和“重大”标记；点击打开事件档案（日期、地点、显著度、参与人、语义文本、进程链接）；
  - 历史进程 chip/卡片可 Hover/点击打开进程档案；
  - 触屏点击人物切换观察，进程/事件点击打开档案；键盘 focus 可用。
- e2e 实际验证 person hover dossier、event modal、process modal，且 console/page error 为 0。

## 6. 88 年 playtest

`phase-10-playtest.json`：

| 指标 | Phase 10 |
| --- | ---: |
| 年份 | 1912–2000 |
| 事件 | 27,510 |
| 事件/年 | 312.61 |
| 具名人物 | 730 |
| 在世 | 341 |
| 出生 | 351 |
| 死亡 | 387 |
| 统计死亡 | 376 |
| Task 事件 | 3,490 |
| 每具名人物年事件 | 0.428 |
| scene prefix >12/人 | 44 人 |
| 最高单人同 prefix | 81 |
| 未解析 token | 0 |
| 死亡后事件 | 0 |
| 运行耗时 | 72.2 s |

Phase 9 88 年 treatment 为 31,567 事件 / 3,673 Task / 126 重复 offender / 115.3s。Phase 10 总事件更少、人口更少（730 vs 806），重复 offender 从 126 降到 44；最高单人同 prefix 仍为 81，来自 base `vienna-social-movement.meeting`，不是本轮生成内容。不能把两边总事件直接比较为内容效果。

## 7. 验证命令

```text
pnpm typecheck
pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
pnpm exec tsx scripts/v4-phase10-major-audit.ts
```

本轮最后执行结果：

```text
pnpm typecheck
→ 通过

pnpm exec vitest run tests/v4-*.test.ts
→ 29 files passed / 2 skipped；177 tests passed / 8 skipped

pnpm test
→ 78 files passed / 7 skipped；457 tests passed / 36 skipped；158.00s

pnpm build
→ 通过，2.92s

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed (13.1s total; test 9.5s)
→ 覆盖出生日志、人物切换、语义 person hover、事件档案、进程档案、地图
```

## 8. 未完成 / 真实限制

- 473 个可执行定义，不是千级/百万级 JSON；百万级仍是实例化/持续生产目标。
- Phase 10 新增 78 个定义，但平均 Task/Event 候选没有上升；新增内容更多是条件门控的特定人生，而不是普惠每个处境。
- 45 年审计中 education effect 从 29 降到 10、birth 从 80 降到 50；总事件也从 7,412 降到 6,741。内容改变人口/行动路径，不能宣称所有重大事件覆盖都提高。
- 64/140 Task 在 35 年单样本未触发；不能据此判断不可达，但也没有证明全部可达。
- 文学评审是 13 个样本的编辑抽读，不是全库审阅；11 个 P0 节点通过，其中 2 个仅 36/50。
- 仍有制度细节缺口：无正式逮捕/监禁 effect、无养老金/租金持久收支 effect、无独立 child role、无跨世界迁徙地点；相关内容只能降级为 role/flag/cash 或明确不声称。
- 生成内容仍有职业/场所固定、工资数值手工、条件角色不足等问题；`p10-work-shop` 类可达性缺口仍存在。
- 20k 测试是合成人口最坏 Task 选择，不是 20k 完整内容 + PostgreSQL/API；未做公网部署。
- UI 进程名部分来自 description 截断；`/api/v4/world` 不提供进程参与者全名单。

## 9. 结论

Phase 10 交付了三件实际东西：

1. **决定性事件内容**：78 个新定义，新增 employment/unemployment/migration/death 等真实后果；45 年审计中 employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→122。
2. **文学生产/审校流水线**：多 Subagent 并行写作，独立 Critic 抽读，首轮 5/13 通过；定向改写后 11 个 P0 节点全部过线；不是“增加几个叙事变体”。
3. **语义观察器**：稳定 Person/Event/Process ID 的高亮、Hover 档案和点击档案/跳转，e2e 实际通过。

这不是百万故事已经完成。它是可扩展内容体系的一次真实扩容，并明确保留了教育/出生覆盖下降、重复、制度原语缺口和 20k 完整负载未测等问题。
