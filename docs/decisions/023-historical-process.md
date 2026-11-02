# ADR 023：用 WorldDevelopment 承载可参与历史进程

日期：2026-11-02  
状态：接受  
相关：`packages/v4/domain.ts`, `packages/v4/macro.ts`, `packages/v4/history.ts`, `packages/v4/engine.ts`

## 背景

Phase 5 的 `WorldDevelopment` 已能创建组织、事件池政策和生命周期，但人物只能通过事件池被动受影响。再建 `HistoricalSimulationEngine` 会产生第二套状态、两套阶段/参与/结果权威，以及新的持久化与一致性风险。

## 决策

1. `WorldDevelopment.historical` 是历史进程的唯一持久状态。进程身份沿用 development ID；不再建立独立的 process 表。
2. 进程状态包含 kind、phase、phaseStarted、regionIds、objectives、sourceIds、participants、organizationRoles、metrics、outcome、history、lastUpdated。全部是有界 JSON 数据。
3. 人物参与使用 `historical_participation` effect；影响使用 `historical_influence` effect。二者只能由已提交事件应用，并记录 event ID、日期、角色、影响值和来源。
4. 阶段转换是 Engine 的纯函数：读取参与人物、组织成员/资源、metrics 和日期，决定 emerging/mobilizing/confrontation/institutionalizing/repression/declining/ended。LLM 只通过 `historicalMoves` 提出 support/oppose/escalate/deescalate，不能直接改 phase 或 outcome。
5. `historical_process` effect 允许真实组织/行动从下往上创建进程；只在满足组织、人物和内容范围时生效。
6. 真实历史人物使用普通 Person + `historicalIdentity`。他们的历史死亡日期只存为 reference；模拟死亡仍走 `applyDeath`。历史人物所在 household 不进入玩家出生候选。
7. 新场景条件 `historicalProcess`、`hasRelationWith` 和角色 `historical` 只做有界匹配；历史人物不会被所有同城人物自动认识。
8. Director 快照增加历史进程摘要和已有组织/参与者；提案增加有界的 `historicalMoves`。应用时只改指标，不下结论。
9. 历史进程相关事件仍进入现有 EventFact、journal、outbox、revision 与单写者事务。

## 替代方案

- 独立历史引擎/表：会重复状态和事务边界，放弃。
- 把真实历史人物写成日志字符串：无法产生关系、行动和后续，放弃。
- LLM 直接输出 phase/outcome：无法验证因果和权限，放弃。
- 固定历史年表自动推进：违反架空世界线，放弃。

## 后果

- 历史进程会随宏观 JSON 持久化，适合当前单世界规模；将来大规模多进程需要索引/分区，但本轮不提前建空表。
- 进程阶段由年度结算推进，普通人行动有一年以内的反馈延迟；这是可接受的模拟粒度。
- 历史人物与普通人共享所有 Person 风险，可能早死、失势或被历史改变；真实死亡日期不作为命令。
- 内容作者必须使用有界 effect；生成内容不能包含任意代码/SQL/HTTP。
