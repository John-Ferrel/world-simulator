# ADR 014 — v3 rule runtime, two-phase birth, auto events and bounded director

- 日期：2026-10-31
- 状态：accepted
- 关联：`IMPLEMENTATION_SPEC_V3.md`、`docs/v3/architecture-delta.md`、`docs/v3/implementation-report-v3.md`

## 背景

旧仓库已有成熟的单写者事务、人群/家庭、经济/工业、战争/外交、组织、历史人物目录和异步模型队列。v3 需要新增四类能力，但不能推倒这些结算，也不能清空活动世界：

1. 版本化、可编译、可自动发布的事件/人生/能力/过程规则；
2. 新生儿出生请求 + 隐藏人生预演 + 条件式 LifeProgram；
3. 世界观察者驱动的动态事件自动发布；
4. 有预算、有审计、可拒绝的强 History Director；
5. 稀有、真实生效、有成本/暴露/反制的超常能力。

## 决策

### 1. Runtime 嵌入 World JSONB，不新增权威表

新增可选 `World.runtime: RuleState`，保存不可变 Definition 版本、激活/停用记录、Process、Ability、Exposure、Opportunity、LifeProgram、HiddenFutures、DeathSummary、Director 审计和遥测。

理由：

- 现有唯一 writer 的 `storage.step` 已经原子保存 `worlds.state`、journal patch、events/outbox；
- 旧世界缺字段时可在首次 advance 初始化，无需修改已应用 001/002 migration；
- 备份/恢复白名单不需要新增表，恢复旧快照仍可读；
- 定义/实例与世界 revision 同事务，回放时能精确重放规则版本。

代价：world 体积增长、定义目录按世界重复、JSONB patch 可能变大。用 512 定义、4096 过程/机会/暴露、20k 出生/LifeProgram 上限和 journal patch 兼容约束控制。若未来规则库显著增长，再评估只读定义表，但不能在未迁移前拆成第二套权威。

### 2. 所有新能力复用同一 Effect resolver 和旧系统状态

规则效果只通过 `packages/rules/runtime.ts` 的白名单适配器执行：资源转移、健康、知识、关系、政策、压力/疾病、机会、能力、过程；资源余额、同地关系、人口/健康核算在提交前检查。没有第二套货币、人口或死亡系统。

拒绝：让 LLM 直接写 world、执行 JS/SQL/HTTP、直接指定死亡/胜利/资产夺取、用自由文本代替状态变化。

### 3. Birth 采用两阶段、非阻塞时钟

`POST /api/births` → command → 世界选择真实家庭/地点并建立 pending birth → `birth` job → worker proposal/fallback → simulator 重新校验并原子创建新生儿。

理由：模型可能慢/失败；共享时钟不能等待单个出生；家庭/地点在编译期间可能变化。最终提交仍在一个事务内完成，模型不能直接创建人物。超时/解析失败用确定性 fallback，保留原始愿望与诚实来源。

拒绝：API 同步阻塞模型后直接写库；把新生儿当成成人 Draft；在模型输出里预写父母/财富/关系。

### 4. 动态事件自动发布，但必须编译/预演/可失败

Observer 只产生 author request；worker 只写 proposal；simulator 编译、引用/预算/资源/角色检查后直接 Active，无人审。运行失败自动暂停，旧 occurrence 引用旧版本。无模型/超时时用同一语法的确定性后备作者。

拒绝：人审必经环节、固定频率灌事件、模型写任意宏观数值、把预演当事实。

### 5. Director 只创设条件，不写结果

五类操作：`seed_pressure`、`exogenous_incident`、`open_opportunity`、`commission_event`、`reshape_agenda`。预算/同月/同 scope/年度上限；机会必须检查目标实际在场；历史人物接触不瞬移、不预订关系；不复活死者、不强制现实时间线、不指定战争胜负/死亡名单。

历史回归通过压力、偏好和机会提高条件概率，不覆盖已提交历史。

### 6. 异常能力走同一规则/生命核算

出生愿望可编译为 `AbilityDefinition`，有全局稀有配额、范围、成本、冷却、使用上限、暴露风险、组织调查和 `blockedUntil` 反制。能力使用、疾病、战争、事故共享健康/伤亡/人口状态；owner 不免疫。社会反应只来自实际证人和组织，不全球瞬间知晓。

## 备选方案

- **独立规则表 + 外键**：查询/索引更清晰，但需要新 migration、备份白名单和跨表事务；当前单写者 JSONB 已能承载，先不引入。
- **同步 birth 模型**：用户等待、阻塞风险高，拒绝。
- **Director 直接改宏观值**：会绕过角色/过程，拒绝。
- **纯文本异常能力**：不能满足“真实生效”，拒绝。
- **人工审核事件**：与已确认产品边界冲突，拒绝。

## 后果与未完成

- 已实现核心与 fallback/mock/DB 链路；真实模型对三条新任务的实测、v3 10k 负载、浏览器新出生表单 E2E 未完成。
- 规则效果仍是白名单子集；七类能力深度不等；历史回归调度、事件去重/退役/合并、历史人物曝光上限仍需增强。
- 活动世界尚未执行升级演练；回退旧写程序前必须暂停 writer。
