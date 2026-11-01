# ADR 016 — v4 断代与 person-first 领域模型

日期：2026-11-01
状态：accepted

## 背景

v1–v3 把人物、事件、叙事投影和机构混在 `World` 巨型 JSON 与扁平 `HistoricalEvent` 中。`simulator-1031` 要求以 Person 为中心、场景有真实角色/年龄/地点/因果、机构有可执行规则、日志只写已提交事实。继续兼容旧记录会让新引擎继承旧日志与旧出生流程。

## 决定

- 旧 `world-1/2/3` 与早期 v4 世界只归档，不迁移。
- 新领域拆为 Person/Household/Place/Organization/Position/Project/Interaction/Relation/Knowledge/EventFact/SceneDefinition/SceneInstance。
- 实体按 `v4_*` 表存储；世界状态、实体、事件、修订号在同一事务提交。
- `pnpm dev` 只启动 v4 API、v4 模拟器、v4 出生 worker 与观察器；旧 API/模拟器冻结但不删除。

## 后果

- 不能直接读取旧世界继续玩；旧档案只读。
- 旧引擎测试仍保留，但它们不构成 v4 验收。
- v4 可以先在小切片上验证因果，再扩展内容；未完成的能力必须明示。

## 备选

- 把旧 `World.runtime` 增量改造成 v4：会保留旧日志、旧 birth 两阶段和旧叙事投影，违反断代目标。
- 从空仓库重写：可行但会丢弃已经验证的 PostgreSQL 单写者、认证、地图和素材；用户确认保留基础设施。
