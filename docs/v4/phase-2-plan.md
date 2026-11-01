# v4 Phase 2 — 内容规模、出生契约与读取路径

状态：完成（2026-11-01）  
基线：`52ab5a4`  
主代理：架构、契约、审查、集成、验收  
子代理：按文件边界执行，不修改他人负责的文件

## 阶段目标

### A. 内容运行时与内容工厂 2.0

- 新增 8 个 Vienna 事件族（每族 4 个节点，每节点 2–3 outcome，每 outcome ≥2 narration）。
- 覆盖当前薄弱区：12–18 岁、成年恋爱/分手、住房搬迁、疾病治疗、教区互助、市场/债务、女性家务劳动、老年失亲。
- 增加 content-author CLI：
  - 读取当前 pack 列表和审计指标；
  - 发现缺失的年龄/主题覆盖；
  - 调真实模型生成一个包；
  - 用 `packages/v4/generated.ts` 验证；
  - 失败不落库；
  - 输出实际 tokens。
- 增加可达性/覆盖率审计，而不是只数定义数。

**允许修改**：`packages/v4/content/generated/`、`packages/v4/content/generated/index.ts`、`scripts/generate-v4-events.ts`、`scripts/v4-content-audit.ts`、`tests/v4-generated-content.test.ts`、新增 `packages/v4/content-author/`。  
**禁止修改**：`engine.ts`、`domain.ts`、`store.ts`、`apps/v4-*`。

### B. Birth Compiler 2.0

- 把当前 Wish Reading 扩展成有界 Birth Contract：
  - `privateGoal`
  - `focus`
  - `skillDeltas`
  - `capability`
  - 条件式 `conditions` / `limits` / `costs`
- 能力只能使用白名单原语，例如：
  - `literacy`：识字/阅读事件资格与少量技能；
  - `social_insight`：社交事件权重与知识获取；
  - `craft_affinity`：手艺/学徒事件；
  - `frail_body`：健康代价与照护事件。
- 能力必须有真实代价/限制，且不保证实现。
- 编译结果必须结构化、可验证、可回退。
- 失败/超时保留原愿望，不阻塞出生。

**允许修改**：`packages/v4/wish.ts`、新增 `packages/v4/birth-contract.ts`、`apps/v4-birth-worker/`、`tests/v4-wish.test.ts`、新增 `tests/v4-birth-contract.test.ts`。  
**禁止修改**：`store.ts`（由主代理集成）、`engine.ts`、content packs、web。

### C. 读取路径与规模

- 当前 `loadV4World` 全量加载、`saveV4World` 全量 upsert；API 每次请求整世界。
- 增加：
  - world index / person summaries 增量查询；
  - `/api/v4/world` 不返回全部 persons，改为分页/摘要；
  - `/api/v4/persons/:id` 只查目标人物、家庭、关系、事件；
  - 1k/5k 具名人物持久化读写 benchmark；
  - 不破坏现有 UI。
- 不 reset 数据库，不动归档世界。

**允许修改**：`packages/v4/store.ts`、`apps/v4-api/index.ts`、`apps/web/src/main.tsx`（仅适配新读取契约）、`scripts/v4-runtime-benchmark.ts`、新增 `scripts/v4-db-benchmark.ts`、相关 tests。  
**禁止修改**：`engine.ts`、content packs、`domain.ts`（除非只加只读投影类型并由主代理审查）。

## 主代理负责

- 统一事件/内容契约；
- 审查子代理 diff；
- 解决跨文件冲突；
- 集成 generated packs；
- 跑全量测试、浏览器、审计、benchmark；
- 更新 README、实现报告、阶段验收；
- 只有在阶段完成后向用户汇报。

## 验收门槛

- `pnpm typecheck` 通过。
- v4 专项测试 ≥ 60 项通过。
- 全量 `pnpm test` 通过。
- `pnpm build` 通过。
- `pnpm test:e2e` 通过。
- 内容审计：新增族实际触发，未解析 token 为 0，重复文本告警可解释。
- Birth Contract：至少一个 capability 真正改变事件资格/权重，并有测试。
- 读取路径：1k/5k 人物读写 benchmark 有实际数字；不宣称 20k 完整性能。

## 完成结果

| 门槛                                             | 结果                                                                                                  |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                 | 通过                                                                                                  |
| v4 专项测试                                      | 10 文件，79 项通过（`TEST_DATABASE=1`，含 9 项读取路径集成）                                          |
| 全量 `pnpm test`                                 | 59 文件通过 / 5 跳过；353 项通过 / 34 跳过（153.96s）                                                 |
| `pnpm build`                                     | 通过（3.11s）                                                                                         |
| `pnpm test:e2e --config playwright.v4.config.ts` | 1 passed（6.8s）                                                                                      |
| 内容审计                                         | 22/22 生成族触发；未解析 token 0；未知 effect 0；重复文本告警 0；最高频场景 7.9%                      |
| 内容规模                                         | 8 个新族 / 32 场景 / 96 outcome / 193 narration；总计 22 族 / 88 场景 / 239 outcome / 423 narration   |
| Birth Contract                                   | 8 项 contract 测试；capability/condition/limit/cost 均有 engine 测试；worker 使用完整 contract 持久化 |
| 读取路径                                         | 1k/5k 实际 benchmark；默认 200/最大 500 keyset 分页；无 20k 声明                                      |

详见 [Phase 2 验收报告](phase-2-report.md) 和 [ADR 019](../decisions/019-v4-phase-2-content-contract-read-path.md)。

阶段中额外修复：老年死亡一次性豁免、`$eventId` 嵌入引用塌缩、初始人口不繁殖、生命周期事件被普通事件淹没、出生条件错误拒绝富裕家庭、非同居 partner 阻挡求偶、`compiledAt` 判断、participants 事件可见性。
