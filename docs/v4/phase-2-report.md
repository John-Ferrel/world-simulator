# v4 Phase 2 验收报告：内容规模、出生契约与读取路径

日期：2026-11-01  
基线：`52ab5a4`  
范围：同一 v4 Vienna 人生的内容运行时扩展、Birth Contract 2.0、观察 API 投影。  
原则：只记录本工作树实际跑过的命令和结果；Phase 1 数字只作对照，不替代本轮验收。

## 状态总表

| 工作项             | 状态   | 实际证据                                                                                                                      |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 内容工厂新增 8 族  | 完成   | 22 族 / 88 场景 / 239 outcome / 423 narration；22/22 族在 80 年审计中触发                                                     |
| 覆盖审计           | 完成   | `pnpm v4:audit 80` 生成 `docs/v4/content-audit.json`：3,657 事件、零事件年份 0、未解析 token 0、未知 effect 0、重复文本告警 0 |
| 内容作者 CLI       | 完成   | `scripts/v4-content-author.ts` 报告覆盖；`--generate-missing` 返回 `complete`；生成必须验证后落盘                             |
| Birth Contract 2.0 | 完成   | 结构、严格验证、真实模型调用、`applyV4BirthContract` 持久化、engine 权重/代价/上限消费                                        |
| 出生能力影响事件   | 完成   | `tests/v4-engine.test.ts` 覆盖 capability 权重、condition 权重、limit 上限、年度 cost；8 项 contract 测试                     |
| 读取投影与分页     | 完成   | 世界摘要/人物分页/单人详情/事件详情/搜索；1k/5k PostgreSQL 实测                                                               |
| UI 分页兼容        | 完成   | 首屏 200、加载更多、地图已载入提示、后台刷新保留已加载页                                                                      |
| 全量回归           | 完成   | `pnpm test` 353 passed / 34 skipped；`pnpm build` 通过；Playwright v4 1 passed                                                |
| 20k 完整压测       | 未完成 | 只跑了 1k/5k 持久化基准，不能宣称 20k                                                                                         |
| 运行时自动内容发布 | 未完成 | 内容工厂仍是离线/运维调用，不在共享时钟内自动发布                                                                             |
| 完整人口学         | 部分   | 老年死亡、求偶/出生/离婚/同性关系已有机制；婴儿死亡、迁移、遗嘱分配仍不完整                                                   |

## 1. 实际新增内容

### 内容工厂产出

| 指标       | Phase 1 | Phase 2 | 变化 |
| ---------- | ------: | ------: | ---: |
| 生成事件族 |      14 |      22 |   +8 |
| 生成场景   |      56 |      88 |  +32 |
| outcome    |     143 |     239 |  +96 |
| narration  |     230 |     423 | +193 |

新增族：

- `vienna-youth-threshold`：12–17 岁离校、第一份工资、夜校、兄姐离家。
- `vienna-courtship-courtyard`：成年恋爱、见家长、非同居分手。
- `vienna-housing-move`：涨租通知、看房、搬家、出租空床。
- `vienna-medical-treatment`：高烧、牙痛、工伤、疗养院。
- `vienna-parish-aid`：教区食物援助、丧葬互助会、汤厨房、探病。
- `vienna-market-debt`：当铺、煤账、欠租、工资扣款。
- `vienna-women-housework`：洗衣日、生炉子、计件活、照护老母。
- `vienna-elder-bereavement`：配偶去世、老同事葬礼、空房间、扫墓。

内容验证：

- 每族 4 个节点；每节点 2–3 个 outcome；每 outcome ≥2 条 narration。
- 生成包先通过 `packages/v4/generated.ts`，失败内容不落盘。
- 13 个既有生成包修正了无效的 skill/education/flag/condition 字段，未重写正文。
- 新增 `education.status`、`skill` 白名单校验；`vocational` 这类模型自造枚举被拒绝并修正为 `adolescence/apprenticeship`。

### 内容审计（80 年、固定审计出生 ID）

```text
pnpm v4:audit 80
```

| 指标                  | Phase 1 基线 |  Phase 2 |
| --------------------- | -----------: | -------: |
| 年份                  |           80 |       80 |
| 结束时间              |         1992 |     1992 |
| 人物总数 / 存活       |      27 / 18 | 102 / 69 |
| 事件总数              |          506 |    3,657 |
| 事件/年               |         6.33 |    45.71 |
| focal 事件            |           97 |      279 |
| focal 覆盖年份        |           52 |       66 |
| 因果事件              |           31 |      358 |
| 人物请求/回应         |            1 |       74 |
| 出生                  |            0 |       75 |
| 死亡                  |            8 |       31 |
| 零事件年份            |           13 |        0 |
| 生成内容占比          |        56.1% |    81.1% |
| 最高频场景占比        |        13.4% |     7.9% |
| 未触发生成族          |            — |        0 |
| 未解析文本 token      |            — |        0 |
| 未知 effect           |            — |        0 |
| 重复/近似重复文本告警 |            — |        0 |

审计同时输出按 stage/family 的事件数、8 个新族实际触发数、`scene_blocked` 原因和家族分布、focal 事件族分布、生成内容比例、文本告警和样例事件。完整数据见 `docs/v4/content-audit.json`。

`scene_blocked` 共 2,304 次，主因：

- `missing_role:partner` 955
- `missing_role:subject,partner` 452
- `missing_role:subject` 372
- `missing_role:worker` 236

这些是选角失败，不是 schema/文本错误。审计报告保留这个数字，不把它隐藏成“全部场景都成功”。

### 内容作者 CLI

```text
pnpm exec tsx scripts/v4-content-author.ts
```

返回当前 22 包、88 场景、423 narration，以及按 stage 的覆盖和审计摘要。

```text
pnpm exec tsx scripts/v4-content-author.ts --generate-missing
→ {"status":"complete","reason":"all Phase-2 briefs already have generated packs", ...}
```

真实模型生成（子代理执行，`deepseek-v4.1-flash`）：

- 8 个成功调用合计 **73,458 tokens**。
- 另有 10 次失败/重试调用合计 **82,941 tokens**（含一次 `fetch failed`，0 token）。
- 失败内容只写在 `/tmp/opencode/*.attempt-*.raw.json`，未进入仓库。

## 2. Birth Contract 2.0

### 结构

新增 `packages/v4/birth-contract.ts`，`BirthContract` 包含：

- `interpretation`（≤300 字）
- `privateGoal`（≤200 字）
- `focus`：education / work / family / faith / politics / health / craft / none
- `traitDeltas`：最多 4 项，±0.08
- `skillDeltas`：最多 4 项，仅 literacy/numeracy/craft/social，±0.15
- `capability`：none / literacy / numeracy / social_insight / craft_affinity / frail_body
- `conditions`、`limits`、`costs`：各最多 3 条，带白名单标签和数值上限

### 真实模型与持久化

真实 `compileBirthContract` 调用返回合法契约，模型 `deepseek-v4.1-flash`，约 **1,343 tokens**。模型把 `traitDeltas`/`skillDeltas` 输出为数组的情况已被规范化；不在 schema 内的键被剥离。

新增 `packages/v4/birth-contract-store.ts`：

- 服务端再次 `validateBirthContract()`。
- 同一事务锁定 world/person row，更新 payload 和 world revision。
- 以 `compiledAt` 判断是否已经应用增量；出生时的占位 interpretation 不会阻止首次应用。
- 只应用一次 trait/skill delta，写入 capability flag 以及完整 conditions/limits/costs。
- worker 已从旧的 `compileBirthWish().reading` 切换到 `compileBirthContract()` + `applyV4BirthContract()`。

### engine 实际消费

- `focus` 与匹配标签：事件权重 ×1.5。
- `conditions`：按匹配标签增加权重，总增量有界。
- capability：literacy → education/school；numeracy → work/market；social_insight → social/family；craft_affinity → craft/work/apprentice；frail_body → health/infancy/care，权重 ×1.2。
- `limits`：给契约带来的总权重优势设上限，不让多个 clause 无限叠加。
- `costs`：匹配事件每年最多结算一次，产生真实 health/mood/care condition 代价，并写入年度 flag 防止重复扣费。

测试：

```text
tests/v4-birth-contract.test.ts  8 passed
tests/v4-wish.test.ts            3 passed
```

覆盖合法契约、超界 trait/skill、未知 capability、额外字段剥除、禁止字段、能力条件/上限/代价、prompt 不可信标记、数组 delta 规范化。

## 3. 读取路径与规模

### API/store

新增：

- `latestV4WorldMeta`
- `v4PersonSummaries(worldId, {limit, cursor})`：keyset 分页，默认 200、最大 500
- `v4PersonSummariesByIds`
- `v4PersonDetail`：只查单人、家庭、关系、本人事件和最近公共事件
- `v4EventDetail`
- `v4WorldIndex`
- `v4PersonSearch`
- `v4EventLookups`
- `encodeV4PersonCursor` / `decodeV4PersonCursor` / `V4CursorError`

`/api/v4/world` 返回 `people` 当前页、`peopleTotal`、`peopleAlive`、`householdCount`、`peopleLimit`、`peopleNextCursor`、`peopleHasMore`；不再默认返回全部人物 payload。

实际 smoke（本地运行中的世界）：

- `limit=5` 返回 5 人、`peopleHasMore=true`。
- 连续两页人物 id 无重叠。
- 损坏 cursor 返回 HTTP 400。
- `/api/v4/persons/:id` 返回单人、家庭成员、关系、本人事件。
- `/api/v4/search?q=anna` 返回名字匹配。
- participants-only 事件现在只允许当前用户拥有任一参与者时读取。

### 持久化基准

命令：

```text
DATABASE_URL=postgres://localhost:55432/living_world_test \
  pnpm exec tsx scripts/v4-db-benchmark.ts
```

实际结果（PostgreSQL 16，测试库 `living_world_test`；每项读取为多次中位数，save/load 为单次实际测量）：

|  人物 |  家庭 |  事件 | 首次 save | 重复 save | 全量 load | world overview | 人物页 200 |   第二页 | 单人详情 |    搜索 |
| ----: | ----: | ----: | --------: | --------: | --------: | -------------: | ---------: | -------: | -------: | ------: |
| 1,000 |   200 | 1,000 |  69.43 ms |  52.49 ms |  28.16 ms |        1.58 ms |    4.35 ms |  3.69 ms |  4.11 ms | 0.96 ms |
| 5,000 | 1,000 | 5,000 | 327.05 ms | 303.66 ms |  63.26 ms |        3.38 ms |   10.44 ms | 10.93 ms |  5.25 ms | 3.04 ms |

内存：

- 1k：save heap +1.3 MB，load +6.9 MB，RSS 418 MB。
- 5k：save heap +6.2 MB，load +22.6 MB，RSS 480 MB。

基准只写入自己创建的 `db-bench-*` 世界并在结束后清理；未触碰归档世界或开发世界。没有做 20k 完整持久化/并发压测，因此不能宣称 20k 容量。

## 4. 浏览器与回归

```text
pnpm typecheck
→ 通过

TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 10 files passed
→ 79 tests passed

pnpm test
→ 59 files passed | 5 skipped
→ 353 tests passed | 34 skipped
→ 153.96s

pnpm build
→ 通过（3.11s / Vite production bundle）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（3.2s；总 6.8s）
```

浏览器流程实际：

1. 注册随机用户；
2. 提交出生表单；
3. 在等待期间浏览世界；
4. 异步出生完成后自动选中孩子；
5. 读取具体个人日志；
6. 切换 Anna Bauer；
7. 检查地图地点与人物面板；
8. 断言无 console/page error。

构建时 Vite 仍会先打印一次 `/api/health` 的 `ECONNREFUSED`（API 还没起好），随后测试通过；这是启动时序日志，不是应用失败。

## 5. 本轮额外修复的真实问题

这些不是“顺手重构”，而是长跑/测试暴露的机制问题：

1. **老年死亡一次性豁免**：`vienna-life-death-old-age` 原来 `oncePerPerson` 且要求 health ≤0.45；存活一次后可能活到 140 岁。改为 72–118 岁、每年可重复的风险，并移除健康门槛。
2. **嵌入引用不展开**：`courtship:$eventId` 只处理整串 `$` 引用，id 一直是字面量，所有求偶互动塌缩到同一个 id，后续提议被覆盖。已改为展开字符串内 token。
3. **家庭场景只对玩家后代开放**：初始 1912 人口只死亡不繁殖。现对 `birth` 和 `initial` 开放，并加入 `lifecycle` 专用尝试槽。
4. **生命周期被普通事件淹没**：88 个场景竞争每人数个事件槽，生育/求偶经常不触发。engine 在 milestone 之后给 `lifecycle` 场景一次独立尝试，仍经过完整规则验证。
5. **出生条件错误拒绝富裕家庭**：`childbirth` 的 `cash max:120` 会让现金超过 120 的家庭无法生育，已移除。
6. **伙伴关系不区分同居**：生成内容可创建 `partner` 但不搬入；家庭求偶被 `notHasRelation partner` 误挡。新增 `sameHousehold` 条件，允许非同居恋爱继续发展，同时避免重复同居。
7. **server 出生增量重复应用**：`alreadyCompiled` 曾用 interpretation 判断，而出生时已有占位文本。改为以 `compiledAt` 为准。
8. **participants 事件可见性判断错误**：原逻辑把 subject 和 participants 比较，几乎总是放行。现按“当前用户是否拥有任一参与者”判断。

## 6. 当前限制（必须保留）

1. 内容规模是 22 族 / 88 场景，不是“数万内容”；81.1% 事件来自生成包，作者内容仍需继续补。
2. `scene_blocked` 2,304 次；大量 partner/worker 角色找不到，说明社会网络和内容角色供给仍不足。
3. 内容工厂是离线 CLI，没有运行时自动生成/审核/发布；`--generate-missing` 当前因 8 族齐备直接返回 complete。
4. Birth Contract 的文本过滤是启发式；`limits` 只限制契约权重优势，不截断所有下游效果类型。
5. 家庭/求偶/生育仍是自动场景，没有玩家选择婚姻、离婚、再婚、遗嘱。
6. 人口模型不是完整人口学：75 次出生与 31 次死亡是当前内容/引擎组合的结果，不是历史出生率拟合。
7. 读取 API 分页，但模拟器仍全量 load/save；单人详情一次取本人最多 200 条事件，长时间人物没有事件分页。
8. 只实测 1k/5k 持久化；没有 20k/并发 API/内存上限结论。
9. `/api/v4/world` 的最近公共事件仍可能为空，因为绝大多数场景事件是 participants 可见；世界栏主要依靠 chronicle。
10. 当前活动世界和旧归档世界都保留；本报告不把旧世界的数据混入新世界指标。
