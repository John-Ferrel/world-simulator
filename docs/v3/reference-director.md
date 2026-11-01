# Reference Decision Record — triggers, director, storylets, historical identity

研究时间：2026-10-31。范围：按 v3 在改造前阅读真实文档/公开代码及本仓库调用链。本记录不声称取得 CK3、RimWorld 或 DF 的商业引擎源码；不复制商业脚本或素材。来源中的设定不自动成为本游戏正确性/性能证据。

## R-D1：CK3 事件是作用域内的订阅，而非全人物扫描

**证据。** 指定的 [Event_modding.md 镜像](https://github.com/jesec/ck3-modding-wiki/blob/db66965014483aa1a0e0905e5a922be9ee3b9a2f/wiki_pages/Event_modding.md) 可读取，`On Actions`、`Scopes`、`Properties` 和 `Strategy` 节包含实质脚本示例。`on_birth_child` 调用事件；`random_events` 做条件过滤后的权重选择，允许无事件；延迟事件在调度与到期均检查有效性。回退环可阻塞时间；已有逐角色 pulse 再遍历所有人物会形成平方成本。`on_action.effect` 与触发事件不是可靠顺序链。原 [Paradox wiki](https://ck3.paradoxwikis.com/Event_modding) 当前访问返回401，不能称已直接核验原站。

**决定：adapt。** 按真实提交事件种类、地点和到期月建立候选索引。birth/death/maturation/migration/war/shortage 只检查相关定义；低频周期规则轮转分桶。角色匹配有候选数/gas/因果链深度上限；到期再检查死亡、位置、资源、规则版本。事件可不发生，拒绝把唯一合法事件必然选中。

**拒绝与代价。** 不复制其并发 effect 语义；本仓库必须有确定性串行原子结算。索引重建、失效检查和持久游标增加复杂度，但避免 rules × people × people；规则级候选与扫描次数应实测。

**版权。** [镜像 LICENSE](https://github.com/jesec/ck3-modding-wiki/blob/db66965014483aa1a0e0905e5a922be9ee3b9a2f/LICENSE) 区分 wiki 的 CC BY-SA3.0 与 Paradox 游戏内容专有版权。这里只独立实现思想，不导入脚本。

## R-D2：RimWorld 调度者提出 incident，worker 验证实际执行

**来源可靠性发现。** 入口 [Dev-Jahn incident 文档](https://github.com/Dev-Jahn/rimworld-modding-reference/blob/main/05-events-incidents/incident-system.md) 及 [storyteller 文档](https://github.com/Dev-Jahn/rimworld-modding-reference/blob/main/05-events-incidents/storyteller-system.md) 已读。但其 [README](https://github.com/Dev-Jahn/rimworld-modding-reference/blob/main/README.md) 明确声明全文由 AI agents 生成、可能错误；即使 CC BY4.0 也不能当原版源码事实。不据此断言原版1000tick间隔或精确曲线常数。

**一手代码交叉验证。** 公开 mod 的 [StorytellerComp_IncidentSpawner.cs](https://github.com/Vanilla-Expanded/VanillaExpandedFramework/blob/70a6cf3a6903d52e1ab287df1c934faa253c354a/Source/VEF/Storyteller/StorytellerComps/StorytellerComp_IncidentSpawner.cs) 实际调用 `IncidentCycleUtility.IncidentCountThisInterval`，带最低间隔和年频率参数；再 `GenerateParms` → `incident.Worker.CanFireNow` → 产出 `FiringIncident`。其 [IncidentWorker_Reinforcements.cs](https://github.com/Vanilla-Expanded/VanillaExpandedFramework/blob/70a6cf3a6903d52e1ab287df1c934faa253c354a/Source/VEF/Storyteller/IncidentWorkers/IncidentWorker_Reinforcements.cs) 的 `TryExecuteWorker` 检查阵营、入场点与实际生成者，可能返回失败。可确认“调度—合法性—实际执行”分层；这证明 mod 的调用，不证明商业引擎全部实现。

**决定：adapt。** 强 Director 可创建危机、邀请、外生输入和事件创作任务；提案与 occurrence 分离。Director 不能调用直接死亡/胜利捷径；其压力进入已有疾病、外交、供给、旅行和自主选择 resolver。记录预算、冷却、最近实体曝光与结果；世界级冲击有频率上限，和平不是调度故障。

**拒绝与代价。** 不采用以玩家损失补偿为中心的保命曲线，也不随账户人物数量抬高伤害；共享世界没有主角。预算应按scope与可解释扰动，不以剧情精彩程度兑换生命。跨区域调度需聚合快照，不能每tick复制全量人物记忆。

**版权。** VEF [LICENSE](https://github.com/Vanilla-Expanded/VanillaExpandedFramework/blob/70a6cf3a6903d52e1ab287df1c934faa253c354a/LICENSE) 为 CC BY-NC-ND4.0；不拷贝/改编其代码进入产品。只独立设计相同工程分层。

## R-D3：Fallen London 的 storylet 以事实状态重新开放未来

**一手设计资料。** Failbetter 的 [2010结构说明](https://www.failbettergames.com/news/echo-bazaar-narrative-structures-part-two) 展示资格开放分支、结果修改状态、调查进度解锁后续，以及一次性完成标记。其 [2012开发日志](https://www.failbettergames.com/news/storynexus-developer-diary-2-fewer-spreadsheets-less-swearing) 说明共享质量契约和单次变化上限使不同作者能扩充内容，而不维护整棵分支树。这里读的是开发者机制文档，并非后台源码。

**决定：adapt。** 自动创作事件只能组合已知事实谓词与真实效果；可发布新定义而不预订人物未来。持续过程持有阶段、维护、取消与资源，不靠单个flag伪造制度。定义自动门禁通过即可 Active，历史实例绑定不可变版本；NPC自主权负责候选行为选择。

**拒绝与代价。** 不把硬币/粮食/疾病/政策压扁成无类型任意数字quality，也不采用体力售卖/手动选项UI。内容语义去重、冷却和“本次失败但将来可能成立”需分别建模，增加监控成本。文章为版权内容，无源码许可；不复用其文字、剧情或数据库。

## R-D4：DF 历史人物与抽象人口可以共存，但不得重复计数

**一手机制依据。** [Bay12官方托管 DF Talk20 转录](https://bay12games.com/media/df_talk_20_transcript.html) 中 Tarn Adams 解释具名历史移民、抽象entity population、居民升格历史人物，以及在任人物死亡后从实际社会补位。该历史开发访谈不能证明2026版本所有细节；[官方development页](https://www.bay12games.com/dwarves/dev.html) 还是包含未来计划的路线图，不能把待开发魔法当已实现机制。参考入口 wiki 被429限流，未依赖其未经读取的正文。

**决定：adopt/adapt。** 复用已有 cohort + Person；出生/升格/死亡必须明确 cohort来源和人口账本，注册人物无免死。历史人物持续ID、关系和提交记录；能力暴露只能经实际证人/传播触发社会反应。旧历史人物不可为了现实回归而复活。

**代价与拒绝。** 全员永久高精度状态成本高；保持具名人物连续身份和粗粒度群体，但不因为账户拥有者而优先物理。禁止每次接触“重新生成”同一人物或补写既往认识。DF闭源，不复用其实现或文本；独立实现人口与身份边界。

## 本仓库实际适配位置与缺口

审阅路径为源码，不以旧报告的模块名替代行为：

- `packages/simulation-core/index.ts` 的 `advance` 先运行 `advanceEarthEvents`、依赖外交、`advanceCrises`，之后 `advanceWorldlines/applyWorldlineEffects`、工业、地缘、旅行与世界系统。保持唯一规范写入与现有提交边界；统一规则在此接入，不让worker创建旁路世界。
- `packages/worldlines/index.ts` 已有严格有界 `WorldCondition`、`HistoricalInput`、`WorldlineEffect`、到期提案；`WORLDLINE_RULES` 实际只有三个预设后果适配。`historicalDisposition` 会检查已故历史人物和因果父来源。**可wrap但不是强Director，也不是动态定义生态。** 其 `condition` 可迁移到新谓词适配器，来源锚点保留。
- `packages/worldlines/apply.ts` 直接施加有限国家/地区delta并发事件；应扩展成统一effect resolver的兼容适配，保留旧存档；不能将这种裸delta开放成导演任意改变宏观结果的接口。
- `packages/world-packs/earth/history.ts` 的Zod严格解析和来源目录可复用；它是数据输入，不是在线新事件编译发布器。现有静态锚点并不满足自动事件验收。
- `packages/crises/index.ts` 有 `CrisisOfferProposal`、证据版本、期限、已执行行动记录、资金和军备消耗，可成为Director外交输入的真实结算目标。保留现有谈判权限，不让导演伪造领导人已完成谈判。
- `packages/geopolitics/index.ts` 的 `advanceWars`、`advanceAtrocities`，以及工业/军需库和 `runWorldSystems` 的粮食、群体人口、财政账本应复用。事件效果通过适配层调用机制，不直接贴“战争爆发”或指定死亡人数。
- `tests/crises.test.ts`、`tests/worldlines.test.ts`、`tests/war-causality.test.ts`、`tests/military-attrition.test.ts` 可作为守护回归；未在本研究任务中运行，不能称测试已通过。新增证据必须包括proposal失败、实际资源变化、后续多年代影响及恢复版本一致。

## 对主架构的具体建议

统一可执行定义按 `trigger kind / location / due month` 索引；Context显式绑定scope和roles，AST无任意路径/函数。Director拥有创设条件权限而无改写历史权限；动态发布编译器在单写者事务接纳新版本。跨模块只保留一个最终resolver，旧grammar接兼容适配。调度前观测与执行前校验分开，发生实例记录定义版本、真实角色、已扣成本、失败原因、父事件和后续过程ID。持续规则必须在作者死亡后仍可运行，无LLM也继续结算。
