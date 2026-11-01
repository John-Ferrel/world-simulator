# v3 专项源码、测试与数据库审计

**本文是改造前审计，不是当前完成状态；当前实现见 `implementation-report-v3.md`。**

审计时间：2026-10-31；范围为实际读取本仓库三份 v3 文件、源码、SQL、测试与 `docs/implementation-report.md`，不把旧总结作为实现证据。本次只修改审计文档，不修改活动数据库或产品代码。以下行号会随后续开发变化，函数名/类型名为主要定位依据。

## 当前事实与 v3 差距

| 系统            | 实际位置与行为                                                                                                                                                                                                                                                            | 判断及 v3 缺口                                                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 玩家创建        | `apps/api/index.ts` 的 `POST /api/persons/creation-draft` 调 `interpretCreation`，`POST /api/persons` 将 `kind:create` 写 commands；`packages/contracts/index.ts:DraftSchema` 明确 `age:18..45`，`simulation-core.advance` 扣 `cohort.adults`、发 `arrival`，`parents=[]` | **extend/wrap**。不是出生系统；新生儿、性别/身体输入、父母确定、出生愿望、隐藏可能人生与 LifeProgram 都不存在。不能将现有“描述解析”称 Birth Simulator。保留旧 create 命令读取和执行兼容，新 UI/API 应走独立 BirthRequest。                                 |
| 创建模型        | `packages/cognition/creation.ts:interpretCreation` 在 API 请求中同步调用 chat；提示明确“ordinary adult”“Do not ... special powers”，主要编译职业、人格、2–4 步计划；有限正则后备                                                                                          | **wrap**。v3 深度预演、愿望保留/转译理由、多个未来可能性、人生条件程序和能力编译均缺失。现有正则成人职业判断不适合新生儿。                                                                                                                                 |
| 人口出生        | `packages/simulation-core/index.ts` 每12月筛20–42岁、同地未被拘留/不在途的伴侣；概率触发，扣一个 `cohort.children`，建立孩子与双亲的 kin/household                                                                                                                        | **reuse/extend**。已有真实关系和具名化人口守恒，不是新生人口凭空增加。玩家新生儿应复用儿童群体具名化策略或另设可对账真正出生，并准确区分。现有代码无独立 Household 实体，只有 Person.householdId/parents/relationships。                                   |
| 年龄成长        | Person.birth 是世界月份；core生日、成年（216月）、衰老/死亡；`cognition/life.ts:advanceLife` 有年龄分支、教育、工作、住房、疾病、照料；core亲属继承、丧亲与目标重估                                                                                                       | **reuse/extend**。`initializeLife` 默认配置就业/教育/住房偏成人，Birth 必须专门初始化婴儿，不能只把 age 改0。未见完整怀孕、抚养预算/监护权、失依儿童机制。                                                                                                 |
| 人物自主性      | `planning/schema.ts:StepSchema` 实际14种动作；compiler做字面语义别名，`planning/index.ts` 复核目标、位置、证据、成本，baseline接管模型失败；identity按已发生经历改值/信念/目标                                                                                            | **reuse/wrap**。这是有界多步 agenda，不是条件式 LifeProgram；没有人生版本、机会条件、生命周期订阅、人物否决人生期望等单独协议。保持当前动作结算为唯一效果实现，统一规则层应调用适配器而非复制另一套效果。                                                  |
| 现有 Definition | `contracts.DefinitionSchema` 只有 guild/academy/council 对应 pooled_production/research/mutual_aid，含 dues/upkeep/effect/TTL；`dynamics.compileDefinition` 验机制配对                                                                                                    | **extend**。确有可维护机构，不能称统一规则内核。缺 Condition/Scope/Role/Trigger/EffectAST、定义注册表/不可变版本、权限、gas、链深、dry-run、生命周期监控。建议避免复用过泛名字 Definition 引起旧机构类型混淆。                                             |
| 世界历史条件    | `worldlines/index.ts:WorldCondition` 已有 all/any/not、人物存活、国家、冲击、库存、技术、合法性、月份；`HistoricalInput` 与现实来源映射可 branched/suppressed；`apply.ts` 结算 bounded modifier/pending effect                                                            | **reuse/wrap**。现有是静态来源规则，不是 LLM 动态发布或强导演。把该谓词适配入新 Condition 协议，保留旧判定/因果；不要直接允许模型任意填宏观delta。                                                                                                         |
| 事件与导演      | core实际调用 EarthEvents→Crises→Worldlines→Industry/Geopolitics→Travel→Life→Society/Agency→出生/Politics→Movements/Coercion→Identity/StateEvolution。历史事件均由 emit 分配单调ID                                                                                         | **extend**。没有 Observer→Author→compile→preview→auto-publish 队列；没有动态角色匹配索引或定义遥测；没有有预算强导演任务。旧静态事件源码不能当动态生态验收。                                                                                               |
| 超常能力        | 当前创建提示拒绝 special powers；contracts.Person 没有 ability/loadout/charge/cooldown/visibility；未找到受限真实能力执行器                                                                                                                                               | **新增并适配旧生理/交通/知识/组织接口**。必须有7类语义可扩展、有实际成本与知情传播、反制、损害与社会反应；不能仅把 values/fame 改成能力文本。                                                                                                              |
| 模型队列        | `storage.step` 同一事务投递 jobs；worker `SKIP LOCKED`，最多3attempts、90s领取重试，模型调用前过期检查；narrative直写派生narratives，其余ready等待simulator；每月默认最多16人物、上限64                                                                                   | **reuse/extend**。当前 job kinds 无birth/event/director/death-comparison。actor_id/actor_version均NOT NULL，出生前/世界级任务需scope化payload或新protocol；不能假装所有任务都是已有actor。日常模型派发仍偏多，v3应改为出生/重大Replan/导演/作者/死亡总结。 |
| 模型配置        | `model/config.ts`读取.env，OpenCode映射精确model与base；wire model去provider前缀；`modelHeaders(conversation)` SHA生成稳定 `x-opencode-session`；`budget.ts`限额                                                                                                          | **reuse**。真实调用证明与全量模型成功不同。chat没有自身循环重试，worker失败标fallback；不应宣称无限可靠重试。保留key于服务端，不打印.env。                                                                                                                 |
| 事务与历史      | `storage.step` 锁writer_lease/world/commands/jobs，调用纯advance，验证旧checksum，再原子写world/journal/events/outbox/结果/投递；core Command包含create/proposal/agenda/close/expand_earth                                                                                | **reuse/extend**。适合将发布、Birth、Director作为新command，所有canonical修改仍在step。HistoricalEvent目前没有强类型definition/version/provenance，data可扩展但需正式契约。                                                                                |
| 迁移            | `infra/migrations/001_initial.sql`；`storage.migrate` INITIAL_SCHEMA_VERSION=2，串行事务+内容hash，已应用后直接return                                                                                                                                                     | **extend**。当前不是通用多文件增量运行器；不得改001已应用hash。需要003独立迁移版本/hash、dry-run、老客户端只读兼容、明确回退范围。                                                                                                                         |
| 备份恢复        | `storage/backup.ts` v2固定15表清单、EOFhash、原子输出/空库事务恢复；journal patch v2人物ID增量；recover按固定revision逐条验hash                                                                                                                                           | **reuse/extend**。如新增定义/发布/遥测表，必须同步备份白名单、恢复版本兼容、列元数据验证与测试；否则“完整备份”会漏新世界语义。若规则放World可由旧patch自然保存，但需限制体积/索引。                                                                        |
| 权限            | API/worker/simulator均import同一个 `storage.pool`，无单独数据库角色；SQL有历史不可变触发器，但无GRANT/REVOKE角色隔离                                                                                                                                                      | **重要差距**。唯一写者目前是应用约定；worker凭证实际上可写worlds。v3“不具备权威表写权限”需要真正DB role/credentials或窄接口。不得在报告称已经有权限层隔离。                                                                                                |
| 读模型/UI       | 三栏与纸娃娃、地图、个人纪事、preview、SSE、catch-up/replay/archive存在；API人物projection需检查私有字段，不能自动暴露新birth hidden futures                                                                                                                              | **reuse/extend**。出生表单需替代成人创建；Log要显示可追溯定义/导演/异常发起源。隐藏可能人生仅owner可见或完全私有，不能从公开world JSON泄露。                                                                                                               |

## 实际只读数据库取证

使用 node `pg` 连接 `postgres://localhost:55432/living_world`，显式 `BEGIN READ ONLY`，读取schema元数据/world头与数组长度/队列分组，结束 `ROLLBACK`；未调用migrate、step、admin变更。首次查询中month别名造成SQL语法错误，连接关闭后修正为world_month并成功；没有掩盖失败。

2026-10-31约16:52本机采样（活动世界继续演进，数字不是固定配置）：

- schema_migrations：1（旧marker无hash）、2（hash `b4eaa5dfedbba362a8400774528f8d4a08ce74f68a6c475e484aaabacb2331f8`）；17个public表（含schema/lease）。不存在规则定义/人生程序/导演专用表。
- world1/2：原创包1.0.0归档；world3：earth-2020/1.0.0归档；world4：earth-1900/2.0.0 revision349 month343归档，8061人物/7239城市；world5：earth-1900/3.0.0 **revision158、month156、6117人物、7239城市**运行中。
- jobs分组：decision applied7/fallback30/rejected2；deliberation expired903/fallback4306/rejected7；innovation fallback26；narrative applied3/fallback58；organization_strategy applied7/fallback1/rejected9。采样时无ready/pending；不是模型长期请求成功率。
- model_calls：complete42；并不能把4306fallback解释为同数付费请求失败。
- current_user=`rust1`，rolsuper=true。与源码共用连接一起证明本地DB权限未隔离。

## 自动检查：本次执行

命令：`pnpm exec vitest run tests/core.test.ts tests/planning-compiler.test.ts tests/storage-checksum.test.ts`。

实际 **3文件19项通过，16.27秒**，日志 `.data/v3-audit-targeted-tests.log`。验证当前创建具名化/确定性/守恒/所有权对等/旧机构/编译拒绝与checksum等守护性质；这不是v3验收，也不是重跑旧225全量。未执行会清空独立测试库的集成测试，避免与主代理调度争用；主代理仍需自行全量验收。

实现报告“本轮完成”仅适用旧轮；v3的Birth、LifeProgram、自动事件、强导演、真实能力尚缺，必须在新报告分 implemented/partial/not implemented/evidence。旧负载报告为旧机制性能，不预测v3 CPU预算。

## 建议集成契约与依赖

1. 在contracts旁新增独立versioned rule契约，旧 `Definition` 保持不动，通过 `LegacyInstitutionAdapter`/`AgendaActionAdapter` 调既有结算器。RuleProposal不直接写state；CompiledDefinition包含hash、compilerVersion、scope权限、预算、immutable version、activatedMonth。
2. RuleRuntime置于core内，输入World+clock+本月已发生事件，先匹配trigger索引/已定位作用域，编译时限AST节点、匹配角色候选、作用域半径/数量、gas、链深、冷却和月预算。事务局部preview/effect失败须回滚该occurrence而非保留半次扣款；整个step依旧PG事务。
3. 新BirthRequest与旧Draft分离：client不能自选父母/阶层/影响他人；simulator基于真实家庭/儿童cohort分配合法场景后生成birth任务。LLM输出保存但不等于事实；最终新生儿+家庭+人口+birth occurrence一次提交。需要考虑任务过期时家庭迁移/父母死亡；不能依靠API中提前取的快照保证合法。
4. LifeProgram是versioned policy/opportunity，而不是agenda的未来固定列表；重大经历失效或replan，保留旧版本及cause。婴儿不执行成人research/就业，也不能默认自付住房/拥有成年技能。
5. Ability通过同一RuleRuntime权限执行；真实消耗走原有coin/food/medicine/health/交通/认知接口；社会后果由知情者经历/组织规则产生，不能全世界瞬间知晓。
6. 新world级job必须不依赖伪造actor；统一task scope+observed revision+proposal revision+deadline+idempotency。Dynamic author和Director拥有不同编译权限，均只写proposal/ready；simulator写definition activation和occurrence。
7. 加003迁移与备份扩展前，先测旧快照读取/历史patch恢复/旧命令兼容。任何升级不得触碰旧事件或清空世界；回退可停用新定义/只读旧快照，不能宣称旧引擎能结算不认识的新规则。
8. 真实验收需固定运行配置，保存原始模型输出、输入world slice hash、定义hash、拒绝诊断、逐月occurrence及几十年后续状态；对照同seed无干预世界，不能用“注册模块数”证明有效。

## 公开读模型与隐藏人生泄漏复查

- `/api/world/active`、mapProjection、personAt、auth/me、archives均使用显式字段，不会因新增World.runtime自动泄漏隐藏预演。不要为方便在这些路由spread runtime。
- **危险扩展点**：`contracts.publicPerson` 仅剔ownerId/background，API详情再剔5个认知字段后spread剩余全部。若新Person直接挂hiddenFutures/LifeProgram私有字段，将默认公开。推荐隐藏资料集中World.runtime并在Person只存公开ID，或将publicPerson改为明确白名单；需要匿名/另账号/owner三种视角回归。
- world/events、chronicle、SSE直接发布完整event payload；birth occurrence不能嵌入原始模型输出、隐藏可能人生、私有祝愿分析。发布事件只留定义版本/hash、公开发生效果与原因，敏感编译结果保留任务/runtime私有区。
- `/api/commands/:id`已按user_id限制，可以返回出生编译状态；creation-draft只对当前登录请求响应。任何LifeProgram owner读取端点必须显式身份校验，不能信client传ownerId。
- JSON API当前未设置Cache-Control，只有SSE no-cache；账号/人物私有详情/命令/birth接口应明确`private, no-store`，不能依赖无CDN现状。公开不可变章节另行显式缓存策略。
- 历史回放personAt是只读白名单，但occupation取当前字段（现有说明明确不还原心理属性）；不得把当前隐藏预演当历史事件补写。
