# v4 Phase 5 实现与验收报告：真实社会生成、长期演化与规模优化

日期：2026-11-02  
基线：Phase 4 `1a73e73`  
原则：区分已实现、已测试、仍是假设、未完成；不以测试数量或内容数量替代质量。

## 0. 状态总表

| 项目                      | 状态               | 证据 / 边界                                                                        |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| P0 具名化审计             | 完成               | 80 年 materialization 从 318 降到 63；不是靠提高上限，而是分类/限制                |
| 20k 性能分阶段计时        | 完成（简化内容）   | 1k 43ms、5k 162ms、10k 339ms、20k 591ms/年                                         |
| 单岁人口                  | 已实现             | Phase 4 已有；Phase 5 继续保留                                                     |
| 具名迁移                  | 部分               | 跨区 move 会迁移 household 住址；named 计数/关系/工作未完整对账                    |
| 背景具名化分布            | 部分               | worker 绑定 workplace/employment；neighbor 绑定 subject 住址；partner 仅 courtship |
| 社会关系持续              | 已实现（基础）     | 具名化 + relation + 后续 roleCandidates；不保证预编写情侣                          |
| WorldDevelopment 生命周期 | 已实现（最小）     | 组织成员、dues、inactiveYears、declining/ended；测试                               |
| 多地区 Director           | 部分               | 两地区数据/迁移；无长期多地区真实 LLM 运行                                         |
| Runtime Content Author    | 部分               | 真实 worker/发布/动态加载；仅 social_change 自动 enqueue                           |
| 出生能力                  | 已实现（两种语义） | literacy 门控；frail_body 健康代价/风险；social_insight 关系效果                   |
| 月度急性风险              | 已实现（简化）     | 感染/恢复/恶化/产妇按月度；非完整医疗仿真                                          |
| 20k 完整 DB/API           | 未完成             | 只有 in-memory + 1k/5k DB                                                          |

## 1. P0：具名化上限审计

### 1.1 Phase 4 现象确认

Phase 4 baseline：

- 初始 26 人；
- 80 年 241 births；
- total 586；
- 每年上限 4 人；
- 推算 319 来自具名化，正好接近 80×4。

Phase 5 加入 materialization 诊断后确认：

- Phase 4 规则下 80 年 **318 次 materialization**；
- 其中 **258 次是 partner**，46 次 worker，8 officer，3 teacher，2 neighbor，1 official；
- 这不是“随机社会接触”，而是 childbirth/fatherhood 等场景缺 partner 时机械补人。

### 1.2 修复

- 从默认可具名化角色中移除 `partner`；
- `partner` 只在 `vienna-family-courtship`（社交求偶）中允许作为 open social role；
- childbirth/fatherhood 的 partner 必须是已有真实关系/同居者；
- 移除 teacher/official 的自动具名化；必须已有机构/身份；
- worker 具名化必须找到 workplace 和 subject 的 employment organization；否则 blocked；
- neighbor 具名化优先使用 subject 的住址；
- 每次 materialization 记录 role/kind/region/reason/personId 到 diagnostics/audit。

### 1.3 修复后实际数据

80 年 baseline：

- materializations：**63**，不是 320；
- partner：45（只来自 courtship）；
- worker：9；
- neighbor：9；
- 没有再机械触顶；
- 出生 94，死亡 86，存活 96；
- 说明人口结构由社会事件和真实关系产生，而不是被 4/年上限填满。

历史情境：

- materializations 87；
- partner 56（courtship）；
- worker 23；
- neighbor 8。

**仍有限制**：partner 具名化仍可能变成“每年认识新对象”，但已不再直接生成配偶；需要进一步用关系深度/社会网络限制求偶频率。

## 2. P0：20k 性能

### 2.1 分阶段计时

`V4AdvanceDiagnostics.timings` 增加：

- clone；
- scenes/economy；
- statistics；
- lifecycle/interactions；
- events；
- assert；
- total。

20k 单年最终：

```json
{
  "persons": 20000,
  "events": 8097,
  "timings": {
    "clone": 249,
    "scenes": 5,
    "statistics": 71,
    "events": 230,
    "assert": 38,
    "total": 584
  },
  "msPerYear": 591
}
```

1k/5k/10k/20k：

|   人物 |   事件 | 每年耗时 | 每秒人物年 |
| -----: | -----: | -------: | ---------: |
|  1,000 |  1,346 |    43 ms |     23,052 |
|  5,000 |  6,690 |   162 ms |     30,788 |
| 10,000 | 13,430 |   339 ms |     29,479 |
| 20,000 |  8,097 |   591 ms |     33,819 |

### 2.2 主要耗时/修复

- 之前 `roleCandidates()` 在每次 role 查询前 `Object.keys(world.persons).sort()`；subject role 也会排序 20k 人物，造成 O(n²)。
- 修复：subject role 直接返回；其他 role 使用稳定的 sortedPeople 缓存。
- 之前 `nextSceneId` 每个事件扫描全部 scenes，O(n²)；改为使用 `historyMeta.sequence`/ordinal。
- `nextEventIdentity` 之前扫描全部 events；已改为序号。
- 关系索引改为按 person 缓存（Phase 4 已做）；Phase 5 修复了新 relation 加入索引的 bug。
- `assertWorldV4` 的 event cause 检查改为 Set。
- 具名化上限 4/年，但不是主要 20k 耗时来源（benchmark 无 missing role）。

### 2.3 限制

20k benchmark 是简化的事件集，不是完整内容/数据库/API 负载：

- 没有 PostgreSQL 写入、WAL、API 延迟；
- 没有 20k 事件内容、关系、组织；
- 不能把 591ms/年当作完整生产数字。

Phase 4 的 1k/5k PostgreSQL 基准仍有效；20k DB 未测。

## 3. 人口与具名化

### 3.1 单岁 × 性别

- `unnamedByAgeSex[female|male][0..100]`；
- 年龄逐年推进；
- 出生/死亡/迁移改变具体单元格；
- 旧 5 段兼容。

### 3.2 具名化规则

- 只有 required role 缺失且没有候选时；
- open role：neighbor/worker；
- courtship partner：允许，但不直接生成配偶；
- relational roles：parent/guardian/sibling/employer/organization 不生成；
- teacher/official 需要已有机构，不自动生成；
- worker 必须有 workplace/employment；
- neighbor 优先 subject 住址；
- 每年最多 4 个；
- 记录原因。

### 3.3 迁移

- `move` 跨区时把 household 注册住址和同住成员迁到目标地区的 home；
- 迁移后 `refreshNamedPopulation` 更新地区 named 计数；
- 背景人口跨区 move 使用 `moveBackgroundCohorts`，两端守恒；
- 仍未完整处理：工作、组织成员资格、原有关系、跨区事件池的逐项变化。

## 4. WorldDevelopment 生命周期

新增 `advanceDevelopmentLifecycle`：

- 组织存在 → active；
- 无成员一年 → declining；
- 连续两年无成员 → ended；
- 有成员 → active；
- 成员每年缴纳 0.1 现金到组织 treasury（从 household 扣除，不是凭空造钱）；
- 到期 effect 由 `expireMacroEffects` 回退；
- 没有合法地点/组织 → blocked/ended。

测试：

- `v4-macro` 的 empty movement 从 active → declining → ended；
- 组织 treasury 的真实 dues。

实际开发演示仍有 Phase 4 的 301 事件、8 个 movement 事件、2 名成员；Phase 5 生命周期测试证明无成员组织会结束。

## 5. 月度急性风险

Phase 3/4 的问题：感染/产妇按年结算。

Phase 5：

- `applyStatisticalMonth` 每 12 个月循环；
- 感染：`1 - (1-annualRisk)^(1/12)`；
- 恢复/恶化/死亡按月度；
- 产后窗口在月度内检查，产妇风险月度结算；
- 年度 `applyStatisticalYear` 排除 pneumonia/tuberculosis/infant diarrhoea/childbirth，避免重复；
- 死亡仍统一 `commitStatisticalDeath`/`applyDeath`；
- 统计感染/恢复/死亡事件日期落在具体月份。

80 年 baseline 当前：

- 184 人、96 存活；
- 94 出生、86 死亡；
- 统计感染 215；
- 5 岁以下死亡 6；
- 产妇死亡 0（样本/概率）；
- 中位死亡年龄 53。

历史情境：210 人/118 存活，96 出生/90 死亡，5 岁以下 12，产妇 1。

**限制**：仍不是完整医疗仿真；没有治疗资源、医院容量、疾病分型、逐月慢性病。

## 6. 出生能力

两种语义不同的能力已实际影响状态：

### literacy

- capability 条件门控；
- 只有 contract compiled 后才允许 capability 场景；
- `vienna-life-literacy-gate` 的读信/读药签/藏信事件。

### frail_body

- 负 health 效果 ×1.2；
- 正 health 效果 ×0.85；
- 统计风险 ×1.15；
- Birth Contract 仍要求价/限制。

### social_insight

- 新建关系 trust +0.03（a 侧）；
- 对 b 侧 respect +0.02；
- 有实际事件/关系状态变化。

测试：

- `v4-engine` 验证 health 从 0.8 → 0.68（frail）vs 0.70；
- relation trust 0.10 → 0.13（social_insight）；
- literacy capability gate。

## 7. 运行时内容

Phase 4 的 content worker/runtime store 保留：

- job → 真实模型 → validate → `v4_content_packs` → dynamic load；
- 真实 worker 11,046 tokens，4/12；
- 当前仍只自动 enqueue social_change。

Phase 5 没有新增大量内容；重点是生命周期/人口/性能。内容服务仍需泛化。

## 8. 多地区

- 默认 lower-austria + klosterneuburg；
- 两地区独立 macro 参数；
- 背景迁移守恒；
- 内容 pressure 条件按 subject 地区读 macro；
- 仍未完成：真实 LLM 多地区多轮长期运行、地区影响传播、跨区组织/迁移事件。

## 9. 多轮 Director 证据

Phase 4 证据仍有效：

- 1917：2,538 tokens；
- 1918：3,026 tokens；
- 第二轮看到第一轮组织/发展。

Phase 5 新增：组织生命周期测试，但未重跑真实多轮多地区模型。

## 10. 反事实与人生

- `v4-counterfactual`：相同 seed，有/无 social_change organization；
- 处理组有 movement 事件、组织成员、membership effect；
- 对照组没有。
- `v4-life-demo` 当前（月度/新具名化）：
  - 7,125 事件，89.06/年；
  - 12 个玩家出生，2 个活到 80；
  - 死亡年龄：22、34、65、66、67、70、72、75、75、77、80；
  - 单人物 73–449 事件；
  - 死因包含肺炎、急性疾病、老年衰竭。

实际人生比 Phase 4 更严酷，原因是月度急性和少量自动配偶；这不是统计拟合成功，而是当前参数/规则的结果。

## 11. 测试与构建

```text
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 15 files passed
→ 105 tests passed

pnpm test
→ 62 files passed / 7 skipped
→ 377 tests passed / 36 skipped
→ 155.29s

pnpm build
→ 通过（2.92s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（6.8s）
```

新增测试：

- materialization 诊断/role 分类；
- frail_body/social_insight 状态效果；
- organization lifecycle；
- 单岁/迁移；
- runtime content；
- 反事实。

## 12. 未完成/偏差

1. **具名化上限虽不再打满，但 partner 仍集中在 courtship**；需要用关系深度/社交网络限制求偶，而不是每年新对象。
2. **具名迁移不完整**：工作、组织成员、关系、事件池没有逐项对账。
3. **多地区真实 Director 未长期运行**。
4. **Runtime content 自动 enqueue 仍仅 social_change**；没有 epidemic/famine/war 通用 brief 和预算/队列治理。
5. **20k 只测 in-memory 简化内容**；没有 20k DB/API/WAL/恢复。
6. **月度疾病仍简化**；没有治疗/医院容量/疾病分型。
7. **特殊能力只有 literacy/frail_body/social_insight**；不是任意自由祝愿。
8. **没有 UI 宏观/发展/组织面板**。
9. **死亡原因仍混有英文 content cause**。
10. **population audit 184/96 是小样本**；聚合场景仍不是历史拟合。

## 13. 结论

Phase 5 的主要实际变化：

- 确认并修复了具名化机械触顶：318 → 63，partner 不再从 childbirth 直接补人；
- 20k in-memory 从 19.5s/年降到 0.59s/年，定位并修复 subject role 全排序与 scene/event ID 扫描；
- 组织 development 有成员、dues、declining/ended；
- 月度感染/产妇风险接入；
- frail_body/social_insight 成为真实状态效果；
- 单岁人口/两地区/迁移/内容运行时继续保留。

仍未达到：

- 完整具名迁移与联合分布；
- 多地区长期 LLM 历史；
- 通用 runtime content 服务；
- 20k DB/API 生产验证；
- 完整疾病/能力/UI。

下一步优先级：

1. 具名迁移/关系/职业对账；
2. 具名化联合分布与社交网络约束；
3. 多地区长周期 Director；
4. Content Author 通用 gap/预算/版本；
5. 20k DB/API/WAL/恢复；
6. 月度疾病/产妇完整状态；
7. UI/原因本地化。
