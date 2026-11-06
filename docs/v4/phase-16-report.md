# Phase 16 — Living Stories 实施与验收报告

日期：2026-11-06  
设计：`docs/v4/phase-16-design.md`  
独立批评：`docs/v4/phase-16-critique.md`  
主要自然人生证据：`docs/v4/phase-15-phase16-final-c.md/json`（40 年，14,435 事件，342 人，8 focals）  
补充证据：`phase-15-phase16-final-a.md/json`（50 年，22,102 事件）、`phase-15-phase16-final-b.md/json`（45 年，19,512 事件）、`phase-15-phase16-live-e.md/json`（45 年，14,491 事件）

## 1. 结论摘要

Phase 16 没有重写 Engine，也没有新增第二个导演。它把 Phase 15 已有的 State / Position / Event / Kernel 能力真正接入完整人生：

- 专用 state/position opportunity lane：已存在的处境不再被数千普通场景淹没；候选先做 cast 过滤，成功结算后每人年只执行一次。
- 子女成为真实人物：`autoAttachOnBirth` 创建 household `raising-child`，`child` role 选真实子女，tick/reaction 使用 `links.child` 并绑定到具体 StateInstance。
- 职位成为可使用的权力：`$positionOrg` / `$positionId` / `$positionTitle` 让 hire、budget、favor、removal、scandal 落在真实组织与职位；最近获得的职位优先。
- 诅咒在自然人生中触发并留下后果：final-c 的 1931.01 reaction 对真实 betrayer 提交 `health -0.18`、condition 与 trigger。
- 历史从宏观日志进入生活：占领、清洗、罢工委员会成为真实 place/organization State，产生征用、工作许可、忠诚问卷、职位空缺与结算；place state 现在会 tick/expire，1945 liberation 会移除占领。
- Content Factory 的外部模型仍被 403 阻塞；两个新 pack 由 OpenCode LLM 子代理离线创作、验证并注册，明确不冒充运行时 worker 成功。
- PostgreSQL 18.6 真实执行了 migration、state persistence、save/reload 和浏览器 e2e。
- 20k 性能从 Phase 16 初期的 1% ≈ 8.3 s/年降到 **6.63 s/年**；baseline **4.57 s/年**；5% **10.28 s/年**。仍未完全回到 5 s，但 profile 和优化有真实证据。

**Phase 16 确实比 Phase 15 多了“获得的东西被后续使用”的案例；它还没有把八条人生整体提升到稳定高质量。** 独立 Critic 对修订前 live-g 的评分是 19/30，并指出家庭 tick 重复、诅咒成功分支缺少健康效果、占领不结束、office 下游不足。修订解决了其中最具体的执行问题，但没有重新宣称文学分数。

## 2. 激活数据

### 2.1 final-c（主证据，40 年）

| 指标 | 数值 |
|---|---:|
| 事件 | 14,435 |
| 人物 / 存活 | 342 / 208 |
| 出生 / 死亡 | 146 / 132 |
| distinct state definitions | 30 |
| state-tagged events（critic 口径） | 2,247 |
| state ticks（`state_tick:` action） | 972 |
| state reactions（`state_reaction:` action） | 559 |
| state transitions（`state_transition:` action） | 16 |
| active / ended states at end | 150 / 224 |
| repeatRate | 0.1543 |
| stateOpportunity candidates | 1,193 |
| selected | 375 |
| resolved | 318 |
| cast/availability failures | 1,280 |
| noOutcome | 0 |
| blocked | 57 |

`stateOpportunity` 的含义：

- `candidates` 是已通过结构、条件、rate 和 **cast 预检** 的候选数；
- `missingRole` 是未通过 cast 预检的候选数（availability，不是选中后失败）；
- `selected` 是实际进入加权尝试的候选；
- `resolved` 是真正提交了 EventFact 的候选；
- `blocked` 是提交时效果失败/被不变量阻断的候选。

final-c 的选中后执行成功率是 **318 / 375 = 84.8%**。这比 Phase 16 初期“选中后大量 missingRole”更接近可解释的执行链。

### 2.2 新 pack 的实际触发

final-c 的 `activationDiagnostics.packActivation`：

| Pack | States | Kernels | 实际 kernel events | state adds |
|---|---:|---:|---:|---|
| `pack-love-secrecy` | 3 | 6 | 14 | forbidden-attachment 7, known-affair 1, jealous-rival 1 |
| `pack-family-continuity` | 3 | 7 | 95 | raising-child 141 |
| `pack-history-fork` | 3 | 10 | 144 | occupied-city-regime 11, institution-purge 7, strike-committee 6 |
| `pack-absurd-power` | 3 | 7 | 49 | stage-sovereign 40 |
| `pack-curse-betrayal` | 2 | 8 | 80 | suspected-witchcraft 1 |
| `pack-office-influence` | 2 | 9 | 85 | office-patronage 3, office-under-siege 8 |

横向对比：

| Seed | 年 | 事件 | office events | office positions created | curse reactions | history state adds |
|---|---:|---:|---:|---:|---:|---:|
| final-a | 50 | 22,102 | 95 | 33 | 10 | 30 |
| final-b | 45 | 19,512 | 84 | 26 | 0 | 35 |
| final-c | 40 | 14,435 | 85 | 25 | 1 | 24 |

注：final-a 在最后一次 betrayer-alive guard 之前生成，是同一修订轮的中间证据；最终代码证据以 final-c 为主，final-b/final-c 在 guard 之后运行。

诅咒是稀有机制：不同 seed 的自然触发为 0、1、10 次；这不是“每次人生必然出现”，但已经不再是受控实验专属。final-a 的 10 次反应中，success/recoil 都出现；final-c 的 1931.01 success 有 `health -0.18`、`condition` 和 `triggers 0→1`。

## 3. 真实人生中的因果案例

以下全部来自完整自然运行，不是 forced outcome。

### 3.1 Klara：职位被使用，也被夺走（final-c）

- 1940.01 `office16-scandal.public-hearing/resigned`：公开质询后，Klara 交出办公室钥匙，`position_end 发起人 @org:r15-faction...`，reputation -0.08，condition，`flag +resigned_over_scandal`。这不是“成为礼仪官”的日志，而是真实职位被公开压力结束。
- 1945.01 `office16-rival.removal-motion/counter-motion`：Klara 让 Helene Winter 2 复印委员会三年差旅账目；对手动议被“程序审查”取代；org funds 变化、rival 关系、`flag +rival_audited`、knowledge。权力被用于程序操作，并留下可检查的后果。
- 1947.01 `office16-corruption.inspection/clean-audit`：审计员带两只空箱子来，抽查十二份合同，全部对上签字人；`organization_funds`、reputation +0.05、`flag +passed_audit`、knowledge。
- 1948.01 `office16-budget.sign-or-block/signed-for-a-favor`：剧院票根留在桌上，排水图缺一页，许可证当天盖章；`organization_funds`、friend 关系、`flag +permit_for_favor`、knowledge。权力不是必然腐败，也不是必然成功；它产生具体代价。

final-a 的 office pack 更大：95 events、23 subjects、33 个 Position 被创建、11 个被结束、organizationFunds 净 -41.3、6 个 office 事件有下游 cause 事件。final-b 有 26 个 Position 创建、14 个结束。注意：每个 seed 的 `followUpEvents` 只有 0–6，office 还没有形成持续官僚机构；这是明确限制。

### 3.2 Hedwig 与 Klara：诅咒打中真实背叛者（final-c / final-a）

final-c，Hedwig 1931.01：

> `curse15-betrayal.../denounced` 先提交真实背叛，betrayer = Luise Berg 2；同月 `state_reaction:cursed-by-wish/curse-betrayal`：  
> “背叛发生后的夜里，Hedwig听见墙里有一声很轻的响。第二天，Luise Berg 2病倒了；没有人把这两件事放在一起。”  
> `_effects: health -0.18 (the curse answers a real betrayal); condition; state_parameter cursed-by-wish.triggers 0 -> 1; mood 0.02_`

final-a，Klara 1958.01 success 也提交了 `condition` 与 trigger；final-a 的 Hedwig 链有 10 次 reaction，包含 success 与 recoil。失败分支现在也增加 triggers；如果 betrayer 已死或 cast 成 subject 自己，reaction 不执行。仍存在的限制：如果 betrayer 的 vitality 已在 floor，`health` 可能没有 delta，只剩 condition；这条边界在报告中保留，不宣称每次都有健康伤害。

### 3.3 子女：名字、独立进度与离家（final-c）

final-c 1950.01，Klara 同时有三个 `raising-child` states：

- Maria Bauer：`schoolProgress 37 -> 45`
- Mitzi Bauer：`40 -> 48`
- Anna Bauer：`42 -> 50`

三条 tick 文本分别命名为 `Maria Bauer`、`Mitzi Bauer`、`Anna Bauer`；每条 effect 绑定自己的 StateInstance。修订前，三条 tick 会写到同一个 state，出现 22→17→12→7→2 的连续倒退；修订后每个孩子有独立进度。

final-c：146 births、141 个 raising-child states、710 school ticks、**24 child-leaves、6 child-returns**。  
final-a：191 births、184 states、1,015 school ticks、24 leaves、7 returns。  
final-b：183 births、180 states、989 school ticks、12 leaves、1 return。

孩子仍会占用大量事件（family pack 95 events + 710 ticks 等），但不再是“出生一条日志”。`school-registration` 现在消费已有 household state，并 cast 真实 child；`child-leaves` / `child-returns` 在自然人生中真实发生。

### 3.4 历史：占领会结束，解放会移除它（final-c）

- 1940.10 `hist15-occ.seed-occupation/the-old-clerk-stays` 在真实年代窗口创建 `occupied-city-regime` place state。
- 1943.01 `state_expire:occupied-city-regime`：`state_remove ...`，占领状态到期。
- 1944.08 `state_reaction:occupied-city-regime/curfew-detention`：状态产生实际宵禁后果。
- 1945.01 `vienna-life-1945-liberation/survives` 触发 `state_reaction:occupied-city-regime/liberation-ends-occupation`：`state_remove occupied-city-regime`，占领结束。

final-c 的 11 个占领状态全部 ended；final-b 的 6 个也全部 ended。Phase 16 初期 live-g 的“19 active / 0 ended”已修复。仍存在的限制：日期主要是 1 月占位，占领/解放不是逐月精确历史；work-permit 仍主要提交 role/flag/knowledge，没有稳定创建就业。

### 3.5 历史惯性

live-e 的 9 个五年 review 窗口共：

- **21 个 historical candidates matched**（July Crisis、WWI、1918 influenza、Republic of German-Austria、Anschluss、WWII、Vienna Offensive、Marshall Plan、1955 State Treaty 等）；
- **7 个 unobserved**（Austro-Hungarian armistice、Saint-Germain、Austrian Federal Constitution、Austrian Civil War、Dollfuss assassination、Kristallnacht、Declaration of Neutrality）。

这些是“committed event 与历史候选共享 hook/title term”的相似性匹配，不是“真实事件必然发生”的证明；但足以说明历史背景仍以高惯性进入普通人生。final-c 的 fork signals 包括 SDAP 的 participation influence、2 个仍有 authority 的 active offices、68 个 player-born persons 拥有 3 个以上 public role。

## 4. Content Factory

### 4.1 真实模型：仍被外部订阅阻塞

`docs/v4/phase-16-model-probe.json` 记录了实际探测：

- `GET /models` → **200**，可见 `deepseek-v4.1-flash`；
- `POST /chat/completions` → **403**，`server_error: "Upstream request failed: An active OpenCode Go subscription is required to use Go models."`；
- 实际运行 `tsx scripts/v4-phase15-author.ts --brief=brief-power-and-irony` 两次 attempt 都是 `Model HTTP 403 (server_error)`，`ok: false`、`usedFallback: true`、tokens 0，report 写入 `data/phase15-content/generation-report.json`。

这不是 endpoint、key 缺失或 schema 错误；模型发现可用，但 Go 模型 entitlement 不活跃。没有硬编码成功响应，也没有把 fallback 冒充模型输出。

### 4.2 离线 LLM 子代理创作并注册的 pack

两个 Phase 16 pack 由 OpenCode 子代理创作，provenance 记录 `model: deepseek-v4.1-flash-subagent`；它们不是 runtime API worker 的成功。

| Pack | 验证输出 | 主要机制 |
|---|---|---|
| `pack-office-influence` | 2 states / 9 kernels / 126 compiled scenes；`ok:true` | position → hire / budget / favor / removal / scandal / audit；`$positionOrg`、`$positionId` |
| `pack-curse-betrayal` | 2 states / 8 kernels / 112 compiled scenes；`ok:true` | wish/ritual → real betrayal → `cursed-by-wish` reaction → notice / suspected-witchcraft / aftermath |
| `pack-family-continuity`（Phase 15 pack，Phase 16 修订） | 3 states / 7 kernels / 98 compiled scenes；`ok:true` | raising-child auto attach、真实 child role、school/leave/return |
| `pack-history-fork`（Phase 15 pack，Phase 16 修订） | 3 states / 10 kernels / 140 compiled scenes；`ok:true` | occupation/purge/strike 种子与消费 kernel；place/org state |

注册路径：`packages/v4/content/states/generated/index.ts` 导入 JSON，`GENERATED_STATE_PACKS` / `GENERATED_STATE_KERNELS` 进入 `ALL_STATES` / `KERNEL_LIBRARY` / `DEFAULT_COMPOSITION`。所有 pack 先经过 `scripts/v4-validate-state-pack.ts` 的 schema、text token、state 引用、effect/condition 和真实 composer 编译验证。

## 5. PostgreSQL

使用 `embedded-postgres@18.6.0-beta.19` 启动真实本地 PostgreSQL 18.6，而不是内存 mock：

```bash
./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm exec vitest run tests/v4-state-persistence.test.ts tests/v4-macro-store.test.ts --reporter=dot"
# Test Files  2 passed (2)
# Tests       2 passed (2)
```

- `tests/v4-state-persistence.test.ts`：seed 一个 `wish-power` StateInstance → `seedV4World` → `loadV4World` → 修改 parameters/tickCount → `saveV4World` revision+1 → reload，indexed active/owner 列正确。
- `tests/v4-macro-store.test.ts`：真实 PostgreSQL 上 seed/load/enqueue/claim/apply macro proposal，revision bump。
- **真实重启恢复**：同一个持久化 PostgreSQL data directory，先 seed 并保存，再让 wrapper 完全停止服务器；第二个进程重新启动服务器后读取同一个 world/state。结果：

```bash
tsx scripts/v4-with-postgres.ts "pnpm exec tsx scripts/v4-postgres-restart-check.ts seed"
# {"mode":"seed", ... "revision":1, "stateId":"state:world-phase16-postgres-restart:restart"}

tsx scripts/v4-with-postgres.ts "pnpm exec tsx scripts/v4-postgres-restart-check.ts load"
# {"mode":"load","ok":true,"revision":1,"stateDefinition":"wish-power",
#  "intensity":0.61,"tickCount":3}
```

这不是同一进程内的内存 reload；第二个命令在 PostgreSQL 完全 stop/start 后连接同一个 data directory。

- 浏览器 e2e：

```bash
./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm test:e2e --config playwright.v4.config.ts"
# 1 passed
```

e2e 仍出现启动前的 transient `ECONNREFUSED 127.0.0.1:3012` 日志，但测试进程随后成功启动并通过；这是 server readiness 噪声，不是测试失败。并行启动两个 wrapper 会争用同一 `postmaster.pid`；必须顺序执行，报告记录该操作约束。

没有连接或清理任何真实生产数据库。没有做生产规模/并发 API 压测。

## 6. 性能

20k synthetic、composition、2 年，最终测量（同一台机器，顺序执行）：

| 场景 | ms/年 | heap | 事件 | 备注 |
|---|---:|---:|---:|---|
| baseline（无 state） | **4,569** | 439 MB | 23,595 | 与 Phase 15 的 4.28 s 接近 |
| 1% state density | **6,628** | 512 MB | 26,523 | 200 states；478 state reactions |
| 5% state density | **10,283** | 538 MB | 28,774 | 1000 states；941 state reactions |

优化前后：

- Phase 16 初期 1% ≈ 8.29 s/年、5% ≈ 11.99 s/年；
- 最终 1% 6.63 s/年、5% 10.28 s/年；
- 主要优化：`v4EventRate` 缓存 state modifiers、去掉 per-call Set/capability map 分配；relation index 从 `world.events.length` 改为 `relationRevision`；`personOrganizations` 用 organizationRevision 并分离 employment；state/org 查询分缓存。
- profile 最终仍显示 `taskUtility`、agency、`conditionPasses`、`stateOwnersFor` 是主要自身耗时；5% 下 `stateOwnersFor` 仍约 5%。这说明剩余成本主要来自真实状态参与和普通内容匹配，而不是单纯扫描 State 定义。

目标“恢复接近 5 s/年”在 1% 下是 6.63，仍未完全达到；5% 是 10.28。没有通过禁用 reaction、减少 active state 或隐藏内容来修饰指标。

## 7. 测试与命令

最终验证：

```bash
pnpm exec tsc --noEmit
# no output

pnpm exec vitest run --reporter=dot
# Test Files  88 passed | 8 skipped (96)
# Tests       521 passed | 37 skipped (558)

pnpm build
# tsc --noEmit + vite build; built in ~3s

./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm exec vitest run tests/v4-state-persistence.test.ts tests/v4-macro-store.test.ts --reporter=dot"
# 2 passed

./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm test:e2e --config playwright.v4.config.ts"
# 1 passed

./node_modules/.bin/pnpm v4:phase16-experiments
# A–F 6/6 passed（受控实验，不作为自然人生证据）

./node_modules/.bin/pnpm v4:phase16-lives -- 40 phase16-final-c
# 14,435 events / 342 persons / 208 alive
```

测试新增/覆盖：

- state opportunity lane 与最低 rate；
- `autoAttachOnBirth` + household `raising-child`；
- `$positionOrg` 选择最近获得的有效 Position；
- `child` role cast 真实子女；
- State tick/reaction 绑定具体实例；
- PostgreSQL state persistence（真实 DB）；
- 现有 88 files / 521 tests 无回归。

## 8. 未完成与限制

必须明确区分已完成和未完成：

1. **运行时 LLM Content Factory 仍未成功**。`/chat/completions` 返回 403，原因是 OpenCode Go 订阅不活跃。两个新 pack 是离线 LLM 子代理创作，provenance 已标注；不能宣称 runtime worker 端到端成功。
2. **家庭 pack 仍有 3 个 kernel 零触发**：`widow-pension`、`remarriage-widow`、`inheritance-division`、`ordinary-supper`（以及 `war-widow-with-children` / `family-estate` 状态）在 final seeds 中为 0。条件包括真实丧偶/兄弟姐妹/官方角色，稀有是设计的一部分，但也可能是 cast/条件过窄；未证明它们在实际游戏中可达。
3. **office 还不是机构**。final-c 85 events、25 Position 创建、10 结束、0 个 office follow-up；final-a 6 个 follow-up，final-b 1 个。`office-patronage` 只有 2–3 adds；大多数权力场景是单次事件，不是持续官僚关系。
4. **愿望不均衡**。power wish 有真实 arc；love/knowledge/craft 仍主要是 `wish-*` ticks 和普遍内容，未稳定连接到各自 pack。
5. **重复仍高**。final-c repeatRate 0.1543；家庭 school tick 虽已按孩子命名并独立进度，模板句仍重复。独立 Critic 的 19/30 不因这些修订自动提高。
6. **历史日期是 1 月占位**，占领/解放不是逐月精确；work-permit 还没有稳定就业效果。
7. **focal 短命样本**。final-c 有一位 focal 较早死亡；final-a/b 也有短命/单事件样本。8 个 focals 不等于 8 条完整长命。
8. **生产规模未验证**。只有本地 embedded PostgreSQL、20k in-memory benchmark；没有生产部署、并发 API、20k DB/WAL、真实公网验收。
9. **horizon**。引擎有 2000 年明确终点，但 40–50 年 dossier 是观察窗口，不是每个 focal 的显式结局；报告没有把停止观察说成模拟灾难。
10. **组织资金尺度**仍不合理（数百万 treasury 与 1–2 克朗 office 费用并存）；这是经济模型遗留问题。

## 9. 下一步建议

1. 修 `widow-pension` / `inheritance-division` 的可达性：为丧偶/继承增加真实种子条件，而不是继续加定义；验证角色 cast 和 state 创建。
2. 把 `office-patronage` 做成真实持续状态：至少一个后续 hire/budget/removal 链读取它，并让 office 场景在文本中命名职位/组织。
3. 给 `work-permit` 增加真实 employment 或项目机会，而不是重复 role/flag。
4. 连接 love/knowledge/craft wish 到各自 pack；不要让每个愿望只剩同一条 pressure tick。
5. 继续降低家庭 school tick 的模板重复，增加 age gate / school-leaver transition；让 State snapshot 在 UI 中也显示 household states。
6. 在真实模型 entitlement 可用后，重跑 Content Factory API worker，区分“subagent 离线创作”与“runtime worker 成功”。
7. 在生产 PostgreSQL/API 环境复测 20k 与并发；当前 1% 6.63 s/年仍未回到 5 s。

## 10. 最终判断

Phase 16 的真实差异不是“新增了多少 State”，而是：

- 一个真实 Position 可以在后续 hire/budget/favor/removal/scandal 中被使用，也可以被公开压力夺走；
- 一个诅咒可以在自然背叛后对真实 betrayer 提交 health/condition，而不是只在 forced experiment 中成立；
- 一个孩子会被命名、被 cast、拥有独立 school progress，并在多年后离家/归来；
- 一个历史状态会 tick、到期，并在解放事件中被移除；
- PostgreSQL、e2e、性能 profile 和 A–F 实验都有可复现证据。

但它不是“所有人生都变成好故事”。家庭内容仍占大量事件，office 仍缺少持续下游，愿望仍不均衡，独立 Critic 的 19/30 和 Phase 15 相同的 18/30 八人均值仍是有效批评。Phase 16 的交付是一个**更可检查、更可组合、偶尔真正产生后果的机制层**，不是文学质量的最终解决。
