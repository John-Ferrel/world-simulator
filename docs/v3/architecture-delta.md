# v3 增量架构

## 权威与兼容

保持API/worker提案→commands/jobs→storage.step→advance→单事务state/journal/events/outbox。新增World.runtime（schemaVersion1）保存不可变Definition版本、激活/停用记录、LifePrograms、Ability状态、Process实例、Director审计和遥测。开发期断代：旧成人 create 指令/API/UI 已删除；公开创建只接受 BirthRequest。旧 worlds/events/users 已按用户要求清空并重建为 1900 新世界；`World.runtime` 随现有 JSONB/journal/备份保存。旧读模型/旧世界兼容不再承诺。

## 共同内核

版本化Definition = scopes/roles/conditions/triggers/effects/process/cooldown/caps/provenance。严格AST，bounded depth/gas/candidates/effects，资源转移检查余额，不直接凭空增资源。role由真实同地、年龄、关系、职业和能力匹配，拒绝瞬移/预定关系。效果以适配器调用现有行动、关系、知识、疾病、压力/旅程/机构机制；统一调度不另开平行人口或货币系统。Definition版本只追加，生命周期单独保存；Occurrence日志引用版本和真实causeIds。

发布前对JSON结构、引用、权限、语义、预算、有限步预演自动校验；成功直接Active，不人工审阅。执行实例先试算有限实体副本，验证成功后应用；失败不部分扣款，增加诊断并达到阈值暂停定义。每月建立地点/职业/触发索引一次，预算限制匹配及过程次数。未来版本不影响已存在实例。

## Birth与人生

BirthRequest姓名/性别/身体/外观/原始祝愿+可选地点。世界引擎决定真实家庭与出生环境；从群体儿童具名化，保持总人口不变，与既有出生核算一致。深度LLM预演多种隐藏可能性，编译条件人生计划，不写未来史实。fallback保留诚实来源，不能冒称深度LLM预演成功。LifeProgram作用于成长目标候选、适龄机会和重大经历重规划；实际人物可拒绝或放弃，不提供死亡保护。能力经共同规则效果与独立稀有配额/非线性成本/冷却/暴露/反制限制；社会只对实际目击记录反应。

## 异步任务

复用jobs表，增加birth、event_author、history_director任务种类。出生选择家庭发生在canonical提交时，旧slice生成结果须复验；作者定义可在deadline内使用新事实重新匹配，不能沿用普通人物actorVersion。worker只写proposal结果，runtime才激活并产出Occurrence。原始模型输出、编译器版本、job/model/slice保留，重复job拒绝。观察缺口→作者→自动发布→真实匹配→监控；导演通过同一压力/机会/过程效果提出有预算的转折，不写死亡名单和固定战争结局。

## 依赖与验证

M0实际审计/Reference Decision Record → M1共享契约与运行时 → M2出生/人生/能力 → M3异步事件作者 → M4强导演 → M5完整UI/旧模块适配 → M6恢复/多年代因果/CPU容量。每步集成到正式advance和API，不用独立脚本假代产品。先守护旧保存、人口/货币/死亡规则，再验证出生祝愿/条件事件/导演/能力的多年下游影响；实际模型访问与mock分开报告。

## 2026-10-31 实现落点（增量）

- 合约/状态：`packages/contracts/index.ts` 的 `World.runtime`、`BirthRequestSchema`、`birth`/`birth_compile`/`rule_proposal`/`director_action` 命令；`packages/rules/schema.ts` 的版本化 Definition、Predicate、Effect、Process、Ability、Birth/LifeProgram/HiddenFutures/DeathSummary。
- 规则：`packages/rules/compiler.ts` 严格编译/引用校验/有限 dry-run；`match.ts` 作用域/角色/谓词/余额检查；`runtime.ts` 激活/版本/冷却/gas/caps/过程/能力/暴露/机会/死亡总结；`packages/rules/index.ts` 统一导出。
- Birth：`packages/rules/birth.ts` 两阶段出生、真实家庭、人口守恒、fallback、LifeProgram、隐藏人生、稀有异常、里程碑；API `/api/births`、`/api/births/:id`；worker `birth` 任务；UI 新生儿表单。
- 动态事件：`packages/rules/author.ts` 确定性 Observer、作者 payload、后备定义、模型输出规范化；`apps/llm-worker` `event_author`；`storage.step` 自动投递/无模型或超时后备发布；`advance` 直接编译激活并记录拒绝。
- 导演：`packages/rules/director.ts` 五类操作、预算/同月/同 scope/年度上限、机会/历史人物接触、世界/区域多站点预算、审计和拒绝事件；`apps/llm-worker` `history_director`；`storage.step` 投递/后备；`advance` 直接应用。
- 能力：出生编译/独立定义授予、成本/冷却/使用上限/暴露/组织调查/`blockedUntil` 反制、自主使用；社会反应只对实际证人/组织。
- 集成：`simulation-core.advance` 在现有系统后运行 `expirePendingBirths`、`advanceLifePrograms`、`advanceRules`、`observeWorld/observeDirector`；`storage.step` 将 ready job 映射为新命令；旧 world 缺 runtime 时首次推进初始化。
- 兼容：未新增/修改已应用 SQL；runtime 随 worlds JSONB、journal patch、备份保存；旧成人 create 已删除；新增 `tests/v3-storage.test.ts` 与 `tests/storage.test.ts` 的数据库门禁。

**仍未完成**：真实模型对 birth/event_author/history_director 三条新任务的实测（本轮只有 mock 供应商测试）；历史回归压力只实现为偏好/压力，不是完整回归调度；能力七类的效果深度不等；死亡总结目前是结构化确定性总结，不是 LLM 对照叙事；Earth 单月 commit 约 4–5 秒，尚未达到精确 30 秒/年；10k 并发模型/生产部署未验证。详见 `implementation-report-v3.md`。
