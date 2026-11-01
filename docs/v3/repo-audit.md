# v3 源码与运行审计

**本文是改造前审计，不是当前完成状态；当前实现见 `implementation-report-v3.md`。**

2026-10-31，先读实际文件，未将旧报告当作实现证明。v3三份文件从用户放入的world-simulator-v3-overlay.zip读取到仓库根目录，未覆盖旧规格。旧实现报告仅作此前证据索引。

| 路径/链路                                                                      | 实际行为                                                                        | 决策及缺口                                                                                              |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| apps/api/index.ts → cognition/creation.ts → commands → simulation-core.advance | Draft.age18..45，成年人口减一，arrival，普通成人职业初始化                      | extend；新公开创建改为BirthRequest与新生儿，保留旧指令读取与已有成人                                    |
| simulation-core/index.ts 年度具名出生                                          | 从children cohort具名化；实际父母、同地、家庭、kin；群体人口由world-systems推进 | reuse；注册出生同样从真实儿童群体实体化，不重复增加总人口；无合适父母需真实群体照护家庭而非凭空指定名人 |
| cognition/life.ts                                                              | 生命需求、疾病、未成年不工作；未成年education.months仍每月增长                  | extend；婴儿不得被当作适龄学生，家庭照护与年龄条件需要补齐                                              |
| planning/schema.ts/compiler.ts/index.ts/baseline.ts                            | 固定短期动作，编译别名，多步agenda与确定性fallback                              | wrap；无隐藏多人生预演与持续LifeProgram，不能叫LifeCompiler                                             |
| dynamics/index.ts及organizations                                               | 三类机构、费用/成员/维护、具体行为                                              | wrap；不是可自动注册的通用事件定义系统                                                                  |
| worldlines、earth/events/pressure、crises                                      | 来源压力和条件分歧、历史人物激活、外交危机                                      | reuse/extend；不是强Director提案运行时，不得将静态锚点称动态作者                                        |
| storage/index.ts → advance → statePatch → events/outbox                        | 唯一writer事务、lease fencing、job ready适配、journal恢复                       | reuse；新规则嵌入canonical World，用既有事务/备份，不另建权威状态                                       |
| apps/llm-worker/index.ts                                                       | deliberation/proposal/narrative，预算、过期、ready结果                          | extend；没有birth/event_author/director任务，现有非narrative一律短时过期需按任务类型分离                |
| contracts.publicPerson 与 API projection                                       | 公开person多数状态，剔除owner/background                                        | extend；隐藏人生预演/原始祝愿不能借publicPerson泄漏                                                     |
| apps/web/src/main.tsx                                                          | 成人年龄、描述、三栏地图/事件                                                   | reuse/extend；改出生表单，保留既有成年人物与回放                                                        |
| infra/migrations/001_initial.sql,storage.migrate                               | 已应用SQL hash校验，版本2，现有JSONB world和jobs                                | reuse；不改已应用SQL。v3嵌入可选World.runtime字段、追加新Command/Job，旧快照可读、旧版本归档不改写      |

数据库只读证据另见database-audit.json；读取失败如实记录在本地诊断日志，不用猜测代替。基线typecheck实际通过。当前测试源码有43文件（不含浏览器）；本轮变更后必须重跑，不直接沿用225通过作为v3证明。

专项更细审计见audit-systems.md。参考研究完成和架构取舍在开始规则改造前落盘；原规格禁止miracle的旧约束由用户明确确认的稀有受限超常边界替代，仍禁止任意代码和无限权力。
