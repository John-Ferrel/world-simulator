# v3 方向确认：审计事实、架构取舍与关键路径

日期：2026-10-31。**本文是改造前的方向确认，不是实施完成报告。** 实际实现与验收结果见 `implementation-report-v3.md`；本文保留当时审计事实，便于对照哪些缺口后来已关闭。

本文是进入 v3 改造前的方向确认，不把旧实现报告或模块名当作完成证明。所有结论来自当前工作树源码、迁移、只读数据库、测试和文档的交叉核对。

## 1. 审计命令与基线

| 检查             | 实际结果                                                                                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck` | 通过，无输出错误。                                                                                                                                                                                         |
| `pnpm test`      | 39 个文件通过、4 个数据库测试文件跳过；201 项通过、24 项跳过；137.57 秒。跳过来自 `TEST_DATABASE=1` 守护，不是失败。                                                                                       |
| 只读数据库       | 17 张 public 表；migrations 1（无 hash）与 2；活动世界 `world-5-tide5` revision 165、month 163、6,167 人物、7,239 城市、无 `runtime` 字段；四个旧世界归档保留。                                            |
| 代码检索         | `packages/rules/schema.ts` 是唯一 v3 形状代码，未被任何文件 import；`World`、`Command`、`jobs`、`simulation-core.advance`、`storage.step`、`apps/llm-worker` 均没有 v3 执行链。                            |
| 参考来源         | CK3 固定 commit 的 `Event_modding.md`、Wildermyth `History`、VEF `StorytellerComp_IncidentSpawner.cs`、lifeRestart 固定 commit `game.ts` 已实际读取；其余见 `reference-life.md`、`reference-director.md`。 |

## 2. 实际完成度（不是模块数量）

| v3 能力                     | 真实状态           | 证据                                                                                                                                                                                                         |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Birth Simulator             | **未实现**         | `DraftSchema` 强制 age 18..45；`POST /api/persons` 走 `kind:create`；`advance` 扣 `cohort.adults`、发 `arrival`、`parents=[]`。自然生育只发生在 NPC partner 之间，见 `simulation-core/index.ts` 年度出生段。 |
| Life Compiler / LifeProgram | **未实现**         | 只有 14 种短期 action 的 `Agenda`；`adoptAgenda` 覆盖旧 agenda，没有版本、隐藏可能人生、条件机会或人生阶段订阅。                                                                                             |
| 统一可执行规则              | **仅 schema 存根** | `packages/rules/schema.ts` 无 export function、无 import、无持久化、无运行时；`World` 没有 `runtime`。                                                                                                       |
| 动态事件自动发布            | **未实现**         | 只有静态史料 `advanceEarthEvents`、`worldlines` 三条硬编码效果和外交危机；没有 Observer/Author/Compiler/Auto-publish/Match/Monitor。                                                                         |
| 强 History Director         | **未实现**         | 无 director job、command、预算、冷却、审计；最接近的是 `worldlines/apply.ts` 的有限 delta，不能当导演。                                                                                                      |
| 稀有超常能力                | **仅 schema 片段** | `EffectSchema` 有 `ability`、`AbilityState` 有冷却字段，但无执行、无消耗、无暴露、无社会反应；创建提示仍明确拒绝 special powers。                                                                            |
| 家庭/人口/历史人物底座      | **真实可用**       | cohort 人口守恒、自然出生/亲属、7,239 城、28,711 历史人物目录、Pantheon 来源、按年龄激活、不强制现实死亡。                                                                                                   |
| 经济/政治/战争/组织         | **真实可用**       | 工业账本、军需、战损、外交危机、组织维护、运动/拘禁/继任等均由 `advance` 结算。                                                                                                                              |
| 单写者事务                  | **真实可用**       | `storage.step` 锁 lease/world/commands/jobs，`advance` 后原子写 world/journal/events/outbox；旧 checksum 校验和恢复链已存在。                                                                                |
| 异步模型链                  | **可扩展**         | jobs + budget + worker `SKIP LOCKED` + ready→step 已验证；但 job→Command 映射目前把非 deliberation 一律当旧 proposal，且 `actor_id/actor_version` NOT NULL。                                                 |

结论：现有仓库不是空壳，也不是 v3 完成品。它是一个可运行的 1900 地球社会模拟器，v3 的四项新玩法尚未接入。

## 3. 方向：增量嵌入，不重写

### 3.1 权威边界

保持唯一链路：

```text
API / worker proposal
  -> commands 或 jobs(result=ready)
  -> storage.step (lease + transaction)
  -> simulation-core.advance (pure transition)
  -> world/journal/events/outbox 原子提交
```

- 新增 `World.runtime?: RuntimeState`，随现有 JSONB world 持久化，旧快照缺字段按未升级处理；不改已应用的 001/002 迁移，不清空旧世界。
- 新定义、LifeProgram、Process、Ability、Director 审计全部进 `runtime`；历史 occurrence 继续用 `events`，引用定义版本和真实 causeIds。
- worker 仍只写 `jobs.result`，由 simulator 提交；模型输出永远不是事实。
- 不在运行时执行 LLM 返回的 JS/Python/SQL/shell/HTTP；只接受严格 Zod AST 和白名单 effect。

### 3.2 统一规则内核

一个版本化定义模型服务 life/event/institution/ability/process：

- `Scope`：person/household/organization/site/region/polity/world，显式 id 或查询范围。
- `Role`：真实世界硬条件（年龄、职业、地点、关系、组织、能力、信任、意愿），有候选上限和去重。
- `Trigger`：birth/maturation/death/migration/war/shortage/periodic/event；按月建立索引，不做 rules × people 全表扫描。
- `Condition`：有界、无副作用、深度/节点/字符串上限的谓词 AST。
- `Effect`：只调用现有 resolver 的适配器：资源转移、健康/疾病、知识/技能、关系、职业、组织、政策、旅程、压力、过程、许可。资源必须守恒，人口必须对账，死亡必须走同一生命核算。
- `Process`：持续月数、结算节奏、维护成本、取消条件、创建者死亡后仍可运行；机构/宗教/地下组织/新技术不能只 setFlag。
- `Caps/Gas`：作用域预算、最大 occurrence、冷却、链深、候选数、每月全局预算；超限拒绝并记录诊断。
- `Definition` 不可变版本；老 occurrence 引用老版本；新版本只影响未来。
- 失败自动暂停定义，保留 rejected 诊断和修复机会；已提交历史不追溯改写。

第一个落地范围不追求“全语义”，但必须覆盖验收所需的真实因果：资源、健康、关系、知识、职业、组织、压力、旅程、能力、过程。任何未接入的 effect 必须返回 `unsupported_effect`，不能假装成功。

### 3.3 Birth Simulator + Life Compiler

采用两阶段、非阻塞共享时钟：

1. `POST /api/births` 接收 `BirthRequest`：姓名、性别、身体状态、外观、自由祝愿、可选出生偏好、幂等键；不接受父母/阶层/历史人物/他国领土等越权字段。
2. 下一 `advance` 校验世界状态，选择真实家庭/地点/cohort 来源，建立 `pendingBirth` 预留（不创建人），发 `birth` 任务；模型编译隐藏可能人生、愿望语义、LifeProgram、可选 AbilityDefinition。
3. worker 只返回 proposal；simulator 在 `advance` 中重新校验家庭/地点/人口/预算，原子创建新生儿、扣减 cohort、建立真实父母/kin/household、提交 `birth` occurrence、挂载 LifeProgram v1。
4. 模型失败/超时/预算耗尽使用确定性 fallback：仍创建合法新生儿，LifeProgram 标记 `fallback`，原始祝愿和编译理由保留；不冒充深度预演成功。
5. LifeProgram 不是未来剧本：保存先天特质/健康条件、成长目标候选、条件机会、关系/信念演变倾向、风险、重规划触发；日常行为继续走 `advanceAgency`/baseline。
6. 只有重大转折（重大丧失、战争、迁徙、能力暴露、关键机会）触发 replan；旧版本和原因保留。
7. 隐藏可能人生、原始祝愿分析、私有 LifeProgram 只存 `runtime` 私有区，公开 API 不 spread；owner 读取需显式鉴权。

出生愿望处理：

- “希望她幸福” → 初始潜质/目标候选，不保证结果。
- “能听见他人情绪” → 受限 `sense` 能力，有范围、消耗、冷却、暴露、反制。
- “出生就是全球统治者/让真实人物立刻死亡” → 拒绝直接效果，转译成志向、误解、传闻或未来条件性愿望；保存拒绝/转译理由。

### 3.4 稀有超常能力

- 全球活跃异常配额与人口/时代挂钩，默认极低；不按 owner 身份分配，不因付费/在线时长提高。
- 能力定义必须包含：mode（sense/knowledge/influence/healing/movement/production/communication）、范围、目标条件、强度、消耗、冷却、最大使用、失败概率、环境限制、暴露概率、反制路径、外部性。
- 效果走统一 resolver：例如 healing 走健康/疾病，production 走工业/粮食账本，movement 走真实路线/时间，influence 走压力/信任且有抵抗。
- 暴露只对实际目击者/知情组织记录；媒体、政府、宗教、科学、军事的反应由已知信息和时代规则产生，不能全世界瞬间知道，也不能只改 `fame`。
- 能力、疾病、战争、事故共用生命/伤亡/人口核算；owner 不免疫死亡。
- 能力不能凭空夺取其他用户资产、不能无限复制、不能绕过资源/地理/政治约束。

### 3.5 动态事件生态

```text
WorldObserver (deterministic aggregates)
  -> author request (gap, scope, budget, observed month)
  -> EventAuthor (LLM, bounded world slice)
  -> DefinitionCompiler (Zod AST + semantic checks)
  -> dry-run (bounded clone/sample, termination, conservation)
  -> auto-publish Active (no human review)
  -> indexed match + role selection
  -> actual occurrence + effects + process
  -> telemetry / pause / retire / supersede
```

- Observer 按国家/城市压力、关系密度、事件类型缺口、重复度、技术/制度变化生成目标化任务，不按固定频率灌事件。
- 编译门槛：严格 JSON、引用可解析、scope/role 可行、资源/人口守恒、无直接死亡/胜利/资产夺取、无强制真实人物关系、链深/冷却/预算/重复检测。
- 通过即 Active，不请求人审；失败保留 rejected 诊断，允许作者自修复；运行故障自动暂停并回滚本次 occurrence。
- 定义版本不可变；历史 occurrence 引用旧版本；新版本只影响未来。
- 验收必须包含：真实匹配、可失败结果、资源/健康/关系后续变化、至少一个编译失败样本及拒绝原因。

### 3.6 强 History Director

Director 是权威模拟器的提案者，不是旁白，也不是第二套世界：

- `SeedPressure`：在有地理/社会/产业/政治基础的区域增加可解释压力（经济、思潮、外交紧张、传染风险），带来源、成本、持续曲线。
- `CreateExogenousIncident`：引入符合世界条件的疾病输入、市场冲击、事故、发现、自然灾害、外交危机；后果由现有机制结算，不能直接写“死 100 万人”。
- `OpenOpportunity`：创建讲座、咖啡馆交集、政治联盟沟通、科研协作、地下组织招募；检查双方位置/交通/日程/参与意愿，不瞬移、不预订关系。
- `CommissionEventDefinition`：要求事件作者补事件族/机制组合/长期链，共用自动发布门槛。
- `ReshapeAgenda`：调整导演偏好权重（冲突/创新/运动/历史回归吸引力），有 TTL，不覆盖人物当前合法目标和已提交事件。

预算与限制：局部/区域/国家/全球预算、同实体冷却、历史人物曝光上限、世界级冲击频率上限、链深；和平年代允许平淡，不制造无因果惨剧。历史回归只提高条件概率，不强制现实时间线；已死历史人物不复活；与现实人物互动后的架空发展明确标记虚构世界线。

### 3.7 与现有系统整合

- 家庭/教育/职业：新生儿走真实家庭；LifeProgram 影响成长目标和条件机会；学校/职业/住房仍由 `life.ts` 和 `planning` 结算。
- 政治/战争：Director 压力和能力暴露进入现有 `crises`、`geopolitics`、`military`、`sovereignty`；不另建战争系统。
- 经济/工业：资源转移、生产、贸易、药价、黑市走 `industry`/`world-systems` 账本；不凭空生成物资。
- 历史人物：继续用 Pantheon 目录和现有激活逻辑；Director/事件只能创造相遇条件，历史人物后续职业/关系/死亡由世界状态决定；不强制现实死亡。
- 日志/UI：三栏不变；日志显示定义版本、导演/能力/出生来源和因果；死亡总结基于已提交事件与出生祝愿/隐藏预演对照；不增加管理菜单。

## 4. 关键路径

| 阶段 | 交付                                                                                            | 自动验收                                                                                   |
| ---- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| M0   | 审计、Reference Decision Record、架构 delta、基线测试                                           | 本文 + `reference-*.md` + `architecture-delta.md`；`pnpm typecheck`/`pnpm test` 基线记录。 |
| M1   | `World.runtime`、规则 AST/编译器/resolver、版本/生命周期/预算/索引、旧 action 适配              | 编译拒绝、守恒、cooldown/gas/链深、原子失败、旧存档读取、旧测试全绿。                      |
| M2   | BirthRequest、两阶段出生、隐藏人生、LifeProgram、婴儿/儿童生命周期、AbilityDefinition/状态/暴露 | 同祝愿不同家庭不同人生；新生儿人口对账；能力消耗/冷却/暴露；fallback 诚实标记。            |
| M3   | Observer、Author job、自动编译/发布、匹配/结算/监控/退役                                        | 真实世界缺口→新事件→自动 Active→真实 occurrence→后续状态变化；失败样本。                   |
| M4   | Director job、五种操作、预算/冷却/审计、历史人物机会                                            | 非脚本干预产生新状态；拒绝样本；不瞬移/不复活/不改写历史。                                 |
| M5   | 家庭/教育/职业/政治/战争/经济/历史人物整合、死亡总结、UI                                        | 跨系统因果链、日志溯源、三栏浏览器回归。                                                   |
| M6   | 多世代长跑、恢复、负载、真实模型/CPU 指标、报告                                                 | 固定种子可回放；旧世界迁移/回退；实现报告 implemented/partial/not implemented/evidence。   |

## 5. 不变量

1. 唯一规范写入者是 simulator；API/worker 只提交命令/提案。
2. 一个 `step` 内 world/revision/journal/events/outbox 同事务；失败不留下半次扣款/半次死亡。
3. 已提交历史不可改写；新事实只能是新 occurrence。
4. 资源/人口/健康/死亡不因 owner 身份获得豁免。
5. 模型输出、worldpack 字符串、belief、叙事输入全部不可信；只走 AST/白名单。
6. 没有合适角色/地点/资源就不发生；不生成假医生、假关系、假死亡。
7. 定义版本不可变；旧 occurrence 引用旧版本；新版本只影响未来。
8. 模型失败/迟到不阻塞共享时钟；确定性 fallback 继续世界。
9. 隐藏人生/愿望分析不进入公开读模型。
10. 不用“模块数量/测试数量/12k 模拟账户”替代真实因果证据。

## 6. 主要风险与应对

| 风险                                               | 应对                                                                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `World.runtime` 使 world JSONB 变大                | 定义/程序/过程分版本、按需裁剪、上限；测量序列化/checksum/备份体积；必要时再把定义目录迁到只读表，但先保持单事务兼容。                 |
| `jobs.actor_id/actor_version` NOT NULL             | 世界级任务用明确 scope sentinel（如 `world:<id>` / `birth:<id>`）并加 kind-specific 校验；不改旧列语义，必要时 003 迁移加 `scope` 列。 |
| `storage.step` 把所有非 deliberation 当旧 proposal | 新增显式 job kind 映射和 contract；未知 kind 拒绝，不猜测。                                                                            |
| 规则匹配退化为全表扫描                             | 按月/地点/trigger 建索引，候选/角色/链深/gas 上限；测量匹配次数和 p95。                                                                |
| 隐藏预演泄漏                                       | `runtime.private` 与公开投影分离；API 白名单；匿名/他人/owner 三视角测试。                                                             |
| 旧世界兼容                                         | `runtime` optional；旧快照首次 advance 初始化；归档只读；测试旧 checkpoint/patch/backup 恢复。                                         |
| 真实模型不可用/预算                                | 确定性 fallback；mock 测试与真实 smoke 分开报告；不把 mock 通过当真实模型成功。                                                        |
| 历史人物被导演过度使用                             | 曝光计数/冷却/全球频率上限；只创造相遇条件，不预订结果。                                                                               |

## 7. 下一步

先做 M1，不先写宏大 prompt：完成 `World.runtime` 契约、规则 AST/compiler/resolver、索引/预算/生命周期和旧 action 适配，接入 `advance` 的空跑路径并用测试守护旧行为。M1 通过后再做 M2 Birth/LifeProgram，之后 M3/M4，最后 M5/M6。每个阶段都在正式 `advance`/`storage.step` 中集成，不做独立 Demo。
