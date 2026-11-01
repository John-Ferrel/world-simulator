# v4 Phase 4 实现与验收报告：自主演化、具名化与运行时内容

日期：2026-11-02  
基线：Phase 3 提交 `03d072b`  
原则：明确区分已实现、测试验证、模型假设、未完成。本轮不是全球历史数字孪生。

## 0. 状态总表

| 项目                  | 状态                | 证据 / 边界                                                              |
| --------------------- | ------------------- | ------------------------------------------------------------------------ |
| 单岁 × 性别人口队列   | 已实现              | `POPULATION_MAX_AGE` + `unnamedByAgeSex`；旧 5 段存档可迁移              |
| 人口守恒              | 已测试              | 出生/死亡、跨地区 `moveBackgroundCohorts`、具名化前后总人口              |
| 背景人口 → 具名人物   | 已实现              | required role 缺失时从真实 cohort 取人；稳定 Person/household            |
| 社会接触              | 已实现              | 具名化后写入 acquaintance relation；后续场景复用同一身份                 |
| 统一死亡语义          | 已实现              | Phase 4 世界普通 health 伤害不归零；统计/显式 death 统一走 applyDeath    |
| 月度/到期急性风险     | 部分                | 感染/恢复/恶化按年度推进；产妇/婴儿仍按年度竞争风险，不是逐月医疗仿真    |
| 宏观时间语义          | 已实现              | `MacroEffect` 有 start/end；到期回退基线；单次 ±0.5 边界                 |
| WorldDevelopment/组织 | 已实现（有限类型）  | `social_change` 可创建真实 Organization；事件条件/成员/事件池接通        |
| 运行时 Content Author | 已实现              | 内容 job → 真实模型 → 验证 → `v4_content_packs` → 下一 tick 动态加载     |
| 新内容真实触发        | 已实现              | `vienna-social-movement` 4 场景/12 outcome；开发演示实际发生             |
| 多轮 Director         | 已实现（单地区）    | 1917/1918 两次真实 LLM；第二轮看到第一轮组织/发展                        |
| 出生能力门控          | 已实现              | `capability` 场景条件；literacy 能力实际决定事件是否出现                 |
| 两地区                | 已实现（数据/迁移） | lower-austria + klosterneuburg；跨区迁移守恒；两地区独立参数             |
| 20k 具名完整压测      | 未完成              | 20k 单年 in-memory benchmark 19.5s；未做 20k PostgreSQL/事件内容完整压测 |
| 全球多地区/生产部署   | 未完成              | 只验证维也纳与 Klosterneuburg 数据模型                                   |

## 1. 人口：单岁队列与具名化

### 1.1 单岁 × 性别

`packages/v4/macro.ts` 的 `RegionalPopulation` 新增：

```text
unnamedByAgeSex: { female: number[101], male: number[101] }
```

- index 0–99 是单岁；100 是 100+；
- 旧存档只有 5 段 `unnamedByAgeBand` 时，读取时按年龄均匀拆分到单岁；
- `populationTotal` 只计算未具名队列 + namedAlive，避免重复。

`advanceAggregatePopulation` 每一年：

- 每个 cohort 精确老化一岁；
- 出生按 15–44 女性数量生成，分男女入 age 0；
- 死亡按 age/sex 单元格扣除；
- 迁移不在这里凭空生成；跨区移动走 `moveBackgroundCohorts`，source/destination 同时更新；
- 总人口变化 = 出生 − 死亡 + 净迁移。

### 1.2 具名化

`packages/v4/engine.ts`：

- 一个 required role（neighbor/worker/teacher/official/partner）找不到候选时，从 subject 所在地区的对应年龄/性别 cohort 取一人；
- 每次具名化必须扣减背景人口；没有 cohort 就 blocked，不能凭空造人；
- 创建 Person + 独立 household + 真实住址；
- `provenance.kind = 'materialized_population'`，稳定 ID；
- 参与场景后写入 acquaintance relation（如果 outcome 没有创建关系）；
- 同一人物后续被 `roleCandidates` 复用；
- 每年最多 4 个新具名人物，防止事件/内容无限扩散。

**测试**：`tests/v4-macro.test.ts` 的“materializes a background person…”验证：

- Person/household 存在；
- 与 subject 有持久 relation；
- 背景队列减少 1；
- 第二年不会因同一 role 再生成第二个人。

### 1.3 两地区

默认 seed 现在有两个 macro 区域：

- `region-lower-austria`（1.9M 背景）
- `region-klosterneuburg`（5k 背景）

`moveBackgroundCohorts` 保持两端守恒；`syncMacroPressures` 仍是全局投影，但内容 `pressure` 条件会优先读取 subject 所在地区的 macro 参数，避免一个地区战争自动让另一个地区也按同一战争压力触发内容。

## 2. 死亡语义

- `applyHealth` 在 Phase 4 世界最低到 0.01；普通内容伤害不能通过 health=0 产生隐式死亡。
- 统计引擎产生 `statistical_death/<cause>`，带具体中文原因。
- 内容显式 `death` effect 继续用于工伤/战争等外部原因；最终仍走 `applyDeath`。
- 感染状态 `health.lastIllness`：感染 → 下一年恢复/恶化/死亡；每个事件提交事实。
- 死亡/继承/项目关闭仍由同一 `applyDeath` 处理。
- 旧 `vienna-life-death-old-age`、婴儿热病、1918 流感等基线死亡场景在 macro 世界被 `baseline_mortality` 标记过滤，避免与统计引擎重复。
- 旧 `vitality_exhausted` 只会在没有 macro 的旧夹具/旧流程中出现；Phase 4 世界 fallback 使用具体中文原因。

**测试**：

- `v4-macro` 统计死亡无 internal cause、同一人最多一次死亡；
- `v4-engine` capability gate；
- `v4-scenarios` 四情境；
- `v4-counterfactual` 组织反事实；
- `v4-macro-store` persistence。

## 3. 宏观时间语义

`MacroRegion` 增加：

```text
baselineParameters
effects: [{ start, end, changes, source }]
```

- proposal 的 `parameterChanges` 变成有期限的 effect；
- 每个 tick 由 `expireMacroEffects` 删除过期 effect；
- 当前参数 = baseline + 所有 active effects，逐项 clamp；
- 不会因为每年重复 +0.1 永久饱和；
- `effectiveFrom` 必须是当前或过去 12 个月；不允许未来参数立即生效；
- development 到期标记 `ended`，事件条件失败。

**测试**：`v4-macro` 的 expiry 测试验证 1 个月 effect 到期后 foodSupply 回基线。

## 4. WorldDevelopment 与组织

`packages/v4/macro.ts`：

```text
WorldDevelopment {
  id, type, regionId, description, severity,
  start, end, status,
  eventFamilyIds, organizationId,
  organization: { name, kind?, placeId? },
  source
}
```

- Director 的 development 可以带 `organization` 和 `eventFamilyIds`；
- `materializeDevelopments`：
  - 在地区中选择合法 Place；
  - 创建真实 `Organization`，写入 `v4_organizations`；
  - 同名组织复用，避免多轮重复创建；
  - 无合法地点则 status=blocked，不假装生效；
- `applyMacroProposal` 为 development 的 eventFamilyIds 建立/提高事件池权重；
- 事件池角色 `organization` 会优先选择该 development 的组织，而不是任意军队/教会/政党；
- 新增 `organization_membership` effect，真实加入/退出组织；
- 新增 authored 事件 `vienna-social-movement.*`（传单、会议、警察突袭、名单），条件为 `developmentType: social_change`。

**实际证据** `docs/v4/phase-4-development-demo.json`：

- 真实 Director 提案创建了两个组织：
  - Vienna Women's Anti-War Committee
  - Vienna Sanitary Commission
- 在 8 年运行中：
  - 301 个事件
  - 8 个 `vienna-social-movement.*` 事件
  - 2 名具名人物成为反战委员会成员
- 生成内容包 `docs/v4/phase-4-social-movement-pack.json` 的 4 个场景也在 runtime 中加载并触发（`vienna-social-movement.leaflet/*`）。

这是“development → Organization → 事件池 → 具体人物成员/经历”的真实链，而不是只改 `stability -0.05`。

## 5. 运行时 Content Author

新增：

- `infra/migrations/006_v4_runtime_content.sql`
- `packages/v4/content-runtime-store.ts`
- `apps/v4-content-worker/index.ts`
- `packages/v4/content-author/phase4-briefs.ts`

流程：

```text
development/social_change
  → v4_content_jobs pending
  → content worker 取 job
  → 真实模型生成
  → validateGeneratedPack
  → v4_content_packs published
  → simulator 下一 tick loadPublishedV4Scenes()
  → 事件池/具名人物使用新场景
```

实际 worker 证据：

- job `v4-content-mvy2lq2x-0d9585`
- pack `vienna-social-movement`
- 4 nodes / 12 outcomes
- **11,046 tokens**
- 模型 `deepseek-v4.1-flash`
- 结果文件 `docs/v4/phase-4-content-worker.json`
- 数据库发布后 `loadPublishedV4Scenes()` 返回 4 个场景；`v4-runtime-content` 测试验证。

当前动态内容局限：

- 只有 `social_change` 组织 development 会自动 enqueue；
- 生成内容不写入静态 `generated/index.ts`，只通过 DB 发布；
- 失败重试上限 3，旧内容不删除；
- 没有预算/队列调度策略的细粒度控制；
- 不是“无限生成”，避免资源失控。

## 6. 多轮 Director

`v4:multi-cycle` 使用真实模型两次调用：

- cycle 1：1917，2,538 tokens
- cycle 2：1918，3,026 tokens
- 第二轮 snapshot 包含第一轮创建的 development/organization；
- 第二轮 summary 明确提到前一轮的反战/组织背景；
- 结果：`docs/v4/phase-4-multi-cycle.json`

这不是“每年互不相关的参数修改”，但仍是单地区、两次调用，不是长期全球自主运行。

## 7. 出生能力门控

新增场景条件：

```text
capability: literacy
```

- `conditionPasses` 同时检查 `lifeContract.capability` 和 runtime capability flag；
- 新增 `vienna-life-literacy-gate`：只有 literacy 能力者能读房租通知/替邻居读药房说明/发现家信；
- 无能力者不会看到该场景；
- 能力仍有 contract 的 costs/limits/权重；
- `tests/v4-engine.test.ts` 验证同一人物无 capability 不触发、有 capability 触发。

这是一个真正的“文字愿望 → 编译 capability → 事件资格 → 具体经历”，不是只给 social +0.08。

## 8. 反事实测试

`tests/v4-counterfactual.test.ts`：

- 相同初始世界、相同 seed；
- 一个世界应用 `social_change` + 组织 development；
- 对照世界不应用；
- 6 年运行；
- 结果：
  - 对照没有 `vienna-social-movement.*`；
  - 处理世界出现该事件；
  - 组织成员 >0；
  - 事件效果包含 `organization_membership`。

这是当前最直接的“宏观发展造成具体人生差异”证据。

## 9. 人口/统计结果

### 9.1 80 年审计

`docs/v4/content-audit.json`（baseline）与 `docs/v4/content-audit-historical.json`：

| 指标            |  baseline | historical |
| --------------- | --------: | ---------: |
| 具名总数 / 存活 | 586 / 298 |  524 / 225 |
| 事件            |     9,130 |      9,246 |
| 出生            |       241 |        178 |
| 死亡            |       286 |        297 |
| 统计死亡        |       274 |        280 |
| 统计感染/恢复   |   626 / — |    556 / — |
| 5 岁以下死亡    |        22 |         22 |
| 产妇死亡        |         4 |          2 |
| 死亡年龄中位数  |        61 |         63 |
| 零事件年份      |         0 |          0 |
| 生成内容占比    |     63.3% |      61.6% |

死因包含肺炎、结核、婴幼儿腹泻、产后感染、意外、暴力、老年衰竭、饥饿等；`stroke` 与 `crushing injury at the printing press` 是作者内容中的英文原因，说明原因展示仍需统一本地化，不是内部字段。

**注意**：586 个具名人物仍不是人口统计样本；0 个“<1 岁”死亡字段受出生月份/年份口径影响，5 岁以下死亡 22 是更可靠的口径。人口统计结论以聚合队列/情景测试为准。

### 9.2 12 个具名人物、80 年

`docs/v4/phase-3-life-demo.json`：

- 9,030 个事件，112.88/年；
- 5/12 活到 80；
- 死亡年龄：22（产后感染）、67、68、74、75、79、80；
- 具体事件包含传单、会议、组织、配给、住房、疾病、家庭、照护、老年失亲；
- 单人物 73–327 个事件。

## 10. 四情境统计

`pnpm v4:phase3-scenarios`（单岁队列版本）：

| 情境                 | 1912 预期寿命 | 5 岁以下死亡 | 1916 军人战争风险 | 1918 肺炎风险 | 1920 聚合人口 |
| -------------------- | ------------: | -----------: | ----------------: | ------------: | ------------: |
| 历史维也纳 1912–1920 |          45.4 |        24.4% |              5.7% |          3.8% |       740,727 |
| 无同规模战争         |          46.1 |        23.7% |                 0 |         0.07% |       886,326 |
| 公共卫生/医疗改善    |          60.1 |        12.7% |             0.37% |         0.03% |       949,534 |
| 严重粮食/卫生危机    |          21.2 |        45.3% |              2.5% |         0.14% |       713,465 |

这些是模型夹具，不是精确历史预测。历史情境的战争/流感参数由 `macro-scenarios.ts` 显式设置，不由 `VIENNA_1912_TIMELINE` 强制。

## 11. 性能

### 11.1 运行时 in-memory（含 macro）

`scripts/v4-runtime-benchmark.ts`，3 年（20k 为 1 年）：

| 具名人物 |  事件 |    总耗时 |   每年 | 每秒人物年 |
| -------: | ----: | --------: | -----: | ---------: |
|    1,000 | 1,346 |    168 ms |  56 ms |     17,837 |
|    5,000 | 6,690 |  2,984 ms | 995 ms |      5,026 |
|   20,000 | 8,097 | 19,514 ms | 19.5 s |      1,025 |

20k 单年 19.5s 接近 30–60 秒/年的目标下限，但这是**简化 benchmark**，不是完整内容/数据库/20k API 压测。

### 11.2 数据库

Phase 3 的 1k/5k PostgreSQL 基准仍有效：

- 1k：save 69.43ms，load 28.16ms，人物页 4.35ms
- 5k：save 327.05ms，load 63.26ms，人物页 10.44ms

没有 20k PostgreSQL/完整事件写入的实测数字；不能宣称 20k 生产容量。

## 12. 测试与构建

```text
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 15 files passed
→ 103 tests passed

pnpm test
→ 62 files passed / 7 skipped
→ 375 tests passed / 36 skipped
→ 154.37s

pnpm build
→ 通过（2.85s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（7.0s）
```

新增测试覆盖：

- 单岁队列/跨区迁移守恒；
- 具名化扣减背景人口、稳定身份、持久关系；
- 社会变化 organization/development；
- capability 场景门控；
- 运行时内容发布/加载；
- 同一世界有/无 development 的反事实；
- 统计死亡无内部原因；
- macro effect 到期回退。

## 13. 仍未完成

1. **具名迁移**：背景人口可迁移，具名人物迁出/迁入尚未同步到家庭/住址/关系账本。
2. **具名化质量**：只按年龄/性别/地区抽取；没有职业、阶层、家庭关系、宗教、语言的联合分布。
3. **急性疾病/产妇**仍主要按年度竞争风险；没有月度病房、治疗和转归队列。
4. **两地区历史走势**：数据模型/迁移已接通，但真实 Director 多地区长期测试仍不足。
5. **运行时内容**：只自动 enqueue `social_change`，content worker 没有全局预算/优先级/审批；动态内容只存 DB，不是完整内容版本管理。
6. **WorldDevelopment**：支持 `social_change` 组织；未知类型仍会记录为 `other` 或能力缺口，不能创建任意新机制。
7. **20k**：in-memory 19.5s/年，未做完整 PostgreSQL/API/事件内容压测。
8. **UI**：没有完整的宏观/发展/组织面板；API 有 world.macro，但观察器仍以人物/家庭/地图为主。
9. **统计校准**：1912 预期寿命/5 岁以下死亡仍是夹具，需来源与区间校准。
10. **内容原因本地化**：`stroke` 等英文原因尚未统一成中文可读文本。
11. **旧存档**：5 段人口自动迁移到单岁队列，但没有回写/验证所有旧世界的长期一致性。

## 14. 结论

Phase 4 完成了三个真实闭环：

```text
背景人口 → 具名人物 → 持续关系 → 事件
LLM development → 真实 Organization → 事件池 → 人物加入/经历
macro gap → runtime content job → 真实生成 → 验证 → 发布 → 动态加载
```

同时：

- 单岁人口队列与两地区迁移守恒；
- 宏观 effect 到期回退；
- 出生 capability 真正门控事件；
- 固定 seed 反事实能看到组织/成员/事件差异。

但它不是完整全球模拟，也不是 20k 生产验收。下一步应优先补具名迁移/联合分布、月度疾病转归、多地区长期 Director、内容 worker 预算与完整 20k DB/API 压测。
