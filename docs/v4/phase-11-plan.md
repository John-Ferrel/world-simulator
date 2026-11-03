# Phase 11：Compositional Story Engine

更新：2026-11-03  
基线：Phase 10 `bc47bd2`  
目标：把内容生产从“静态 Family/Node”转为 **Context × Milieu × Plot Kernel × Person** 的组合编译，并让现有 Engine 消费组合结果。

## 1. 五层模型

1. **World Context**：`WorldState.macro` 的 developments、legacy、战争/改革/医疗/经济进程；不按年份强制播放。
2. **Historical / Geographic Context**：`ContextProfile`，覆盖年代、地区、制度、工资乘数、场所与因果说明。
3. **Social Milieu**：`MilieuProfile`，家庭、学校、印刷厂、工厂、商店、医院、工会、咖啡馆、军队、农庄、大学、市政。
4. **Plot Kernel**：可复用的具体因果机制，含角色、条件、2–3 个 outcome、typed effects、context variant。
5. **Personal Realization**：现有 Engine 的 cast/role/outcome/effect 管线把 Kernel 绑定到真实人物并提交 EventFact。

流程：

```text
WorldState + date
  → active Contexts (year/process/legacy)
  → matching Milieus (context tags + conditions)
  → eligible Plot Kernels (context/milieu tags)
  → compiled SceneDefinition / TaskDefinition
  → existing engine cast/select/effect/EventFact
```

## 2. 关键实现

- `packages/v4/composition/types.ts`：Context / Milieu / Kernel / Trace 契约。
- `contexts.ts`：10 个 Context、12 个 Milieu。
- `composer.ts`：上下文激活、Kernel 选择、variant 选择、place/wage 解析、稳定 ID、缓存、统计。
- `default.ts`：`DEFAULT_COMPOSITION`。
- `engine.ts`：`V4AdvanceOptions.composition` 编译后把 Scene/Task 交给原执行器；不新增执行器。
- 组合场景 ID：`kernel::context::milieu[::variant]`，可从 EventFact action 反查 Kernel/Context/Milieu。
- `auditCandidatePools` 也接受 composition，用于有效候选审计。

## 3. 因果变化层级

- **A 叙事变化**：文本中的 `{milieu}`/`{context}`、角色名、语气。
- **B 情境变化**：不同 Context/Milieu 改变地点、工资、角色、条件、可达性。
- **C 因果变化**：Kernel `variants` 在 war/rural/reform/crisis 等上下文替换 outcomes/roles/conditions，改变实际后果。

只把 A 计入“叙事变体”，不把 B/C 混成文字变体。

## 4. Kernel 生产

目标：5 个领域并行生产约 150 个 Kernel：

- childhood-education：30
- work-commerce：30
- family-social：30
- health-violence-war：30
- civic-culture-migration：30

每个 Kernel 至少 2 个 outcome，部分带 context variant。实际数量以 `phase-11-composition-audit.json` 为准。

## 5. 容量统计

必须分开报告：

- Kernel 数；
- Context / Milieu 数；
- authored outcome 数；
- 理论组合上界（明确标注 naive，不等于有效实例）；
- 编译验证过的 Scene/Task 数；
- 编译 outcome paths；
- 实际 35 年触发的 composed events / Kernel / Context / Milieu；
- 不同因果机制数；
- 运行时内存与耗时。

## 6. 验收

```text
pnpm typecheck
pnpm exec vitest run tests/v4-*.test.ts
pnpm test
pnpm build
pnpm test:e2e --config playwright.v4.config.ts
pnpm v4:phase11-composition-audit
pnpm v4:phase11-coverage
pnpm v4:playtest
```

## 7. 非目标

- 不生成百万份静态 JSON；百万级指有效组合/实例化空间。
- 不把理论组合上界当成实际触发数。
- 不引入新 Event/Task 执行器。
- 不为组合而放宽年龄、职业、历史状态或 effect 验证。

## 8. 实际结果（2026-11-04）

| 项目                            |                                         实际值 |
| ------------------------------- | ---------------------------------------------: |
| Kernel                          |                     150（100 Event / 50 Task） |
| Context / Milieu                |                                        10 / 12 |
| Variants                        |                                             98 |
| Base outcomes                   |                                            450 |
| 默认 Vienna 编译                |                           255 Scene / 151 Task |
| 跨四情境 compiled scene IDs     |                                            996 |
| Naive 上界                      |                                      1,265,143 |
| 35 年 composed events / kernels |                                       293 / 56 |
| 88 年 playtest                  | 23,802 事件 / 2,965 Task / 27 repeat offenders |
| 20k 合成 composition            |                       约 252,657 ms/年、447 MB |

文学 Critic：20 样本 9 通过 / 11 失败，均分 31.5/40；文学质量未通过。组合架构与含量完成，不能把上界当实例数，也不能把测试通过当文学合格。
