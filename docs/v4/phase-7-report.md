# Phase 7：Autonomous Living World 验收报告

日期：2026-11-03  
基线：`394d72b`  
目标：让人物和组织拥有主动性；让历史自然产生、演化并留下持久后果；让历史进入普通人的长期人生；修正 canonical 时序。

## 0. 状态总表

| 项目              | 状态             | 证据 / 边界                                                                                                           |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| 人物自主行动      | 完成（确定性）   | `agency.ts`；自由运行 38 年产生 528 条 agency 事件；找工、入会、开会、招募、筹款、出版、照护、求助、支持/反对历史进程 |
| 组织自主行动      | 完成             | 正式或非正式领袖代表组织；真实 membership/treasury/project/relation；印刷工会从 1 人起步，持续招募/开会               |
| 自下而上历史      | 完成（自由演化） | 1915 年印刷工会成员 Alois Lechner 创立 `development:initiative-org-printers-union-1915`；Director 没有预先创建或批准  |
| 历史进程生命周期  | 完成（通用）     | 取消固定 end 强制结束；可继续、衰退、`suspended`、升级、制度化、压制、分裂、结束                                      |
| 持久历史遗产      | 完成（通用）     | `MacroState.legacy`；改革/压制/战后/公共卫生/文化/分裂/记忆；改变 baseline 参数、事件权重和内容条件                   |
| Director 实际行动 | 完成（真实调用） | 6,143 + 10,263 tokens；5 条行动执行，1 条 reform 因没有真实进程被跳过（organize/publish/relief/recruit）              |
| 时序              | 完成（新提交）   | 死亡日期锚定最后已提交事实；长期试玩 `anyEventAfterSubjectDeath=false`；原因不晚于后果                                |
| Content Author    | 完成（真实生成） | 两族 legacy 内容：9,674 / 9,125 tokens；各 4 nodes/12 outcomes/24 narrations；实际触发                                |
| 自由演化 A–F      | 完成             | `docs/v4/phase-7-experiments.json`                                                                                    |
| 浏览器            | 完成             | e2e 注册/出生/日志/地图；选中 Freud 显示历史人物/历史参与；世界侧栏历史进程/历史遗产；1 passed                        |
| 全球/多地区历史   | 未完成           | 仍是 Vienna 垂直切片；不声称完整 1900–2000 全球历史                                                                   |

## 1. 机制

### 1.1 人物自主行动

`packages/v4/agency.ts` 是 Engine 内的确定性年度循环：

```text
Person / Household / Health / Employment
  + Relation / Organization / Position
  + Knowledge / HistoricalProcess
  → 目标（survival/work/family/belonging/status/cause/care/rest）
  → 最多 8 个可行候选
  → 资源/年龄/地点/组织/关系/风险过滤
  → seeded 选择
  → AgencyPlan（typed effects）
  → Engine commitEvent
```

- 每个 actor 每年最多一次；历史人物、玩家人物、组织领袖优先，普通成年人按年份确定性轮转采样。
- 儿童（<14）不执行成人组织/工作/招募行动。
- 失败会留下真实后果：mood、reputation、未完成项目、失败会议、被拒绝的请求等。
- `Person.agency` 保存目标类型、摘要、起始时间、上次行动；目标会随家庭、健康、工作、组织和历史参与改变。

### 1.2 组织自主行动

- 有正式职位时由职位持有人代表；职位持有人死亡或失能时由最健康、社会能力最高的活成员代表。
- 招募成员、开会议、收会费、出版、组织互助、成立持续运动都使用现有 membership/treasury/project/relation/knowledge/effect。
- 不新建组织 AI、组织 DSL 或第二套行动系统。

### 1.3 底部历史

`planBottomUpProcess()` 要求：

- 活动组织；
- 至少 2 名活成员；
- 近 5 年至少有 2 条真实 agency 行动；
- 该组织还没有活动中的 historical process；
- 确定性概率通过。

满足后，Engine 提交 `historical_process` 事件并创建真实 `WorldDevelopment.historical`。Director 之后才能在快照中看到并回应它。

### 1.4 生命周期

- `development.end` 是 expected review date，不是命令。
- 进程由 support/opposition/resources/legitimacy/escalation/information、活参与者、活组织成员、最近一次真实参与/影响行动、overdue 时长共同计算。
- `suspended` 表示还活着但近期没有行动；连续无载体/无活动才 `ended`。
- 反对者真实存在且冲突强时，可按确定性概率分裂成子进程；子进程有独立参与者、资源、阶段和 legacy。

### 1.5 持久 legacy

`MacroState.legacy` 记录：

- `kind`：reform / repression / war_aftermath / public_health_regime / cultural_institution / organization_split / social_memory；
- 来源进程、地区、开始时间、标签、来源事件；
- `parameterChanges`：一次性写入地区 baseline，改变长期统计条件；
- `eventWeights`：改变未来事件族权重；
- 内容通过 `legacy` 条件读取。

不是永久 `support +0.1`。例如改革会改变 foodSupply/stability/persecution baseline；战后会改变 warIntensity/militaryExposure/foodSupply；压制会提高 persecution、降低 stability。

### 1.6 Director actions

`MacroProposal.actions` 最多 6 条，schema 验证 actor/org/process/target IDs 和 intensity。MacroStore 只写入 `pendingActions`；Engine 下一 tick 执行：

- organize → Project + participation + support；
- recruit → membership + relation + knowledge；
- negotiate → Pending Interaction（对方独立接受/拒绝）；
- publish → Knowledge + information；
- relief → 真实 cash/food（从组织资金）；
- repress → health/mood/reputation + escalation/opposition；
- reform → 制度化 legacy；
- spawn_process → 从现有组织形成新的 historical process。

重复 tick 通过 action id + event marker 幂等；失败/跳过有 reason。

Director 如果只写了一个没有组织、没有参与者的 regional development，它仍可影响参数/事件池，但不会被当作历史进程；Engine 会在下一次 tick 明确结束这种零载体 pseudo-process，避免“历史进程”列表被空壳占据。

## 2. 实验 A：无预编排的社会运动

自由运行 1912–1950，不注入最终结果：

```text
agency events: 528
bottom-up processes: 6
first: development:initiative-org-printers-union-1915
founding: 1915-01, initiative:found_process:org-printers-union, subject Alois Lechner
```

后续自由演化出的底部进程包括：

- `development:initiative-org-printers-union-1915` → ended；
- `development:initiative-org-die-fackel-1923` → ended；
- `development:initiative-org-sdap-1935` → institutionalizing → ended（12 参与者）；
- `development:initiative-org-printers-union-1939` → active；
- `development:initiative-org-wednesday-psychological-society-1940` → active；
- `development:initiative-org-die-fackel-1945` → active（9 参与者）。

这些不是预先写好的剧本；印刷工会一开始只有 1 名成员，通过招募、会议和持续行动才达到条件。

## 3. 实验 B：同一进程，不同结局

同一初始世界、同一进程模板，只改变成员、资源和反对/冲突条件，运行 7–20 年：

| 变体       | 最终进程                               | 持久 legacy                     | 后续世界差异                                 |
| ---------- | -------------------------------------- | ------------------------------- | -------------------------------------------- |
| decline    | ended                                  | social_memory                   | 无组织资源，进程结束但保留记忆               |
| reform     | institutionalizing                     | reform                          | baseline foodSupply 0.94、persecution 0.0556 |
| repression | confrontation（经过 repression）       | repression                      | persecution 0.0874；参与者 mood 更低         |
| split      | 父进程 ended，子进程 1919 出现后 ended | repression + organization_split | 1919 分裂出独立子进程，拥有 4 名参与者       |

分裂不是 phase 字符串差异：`development:experiment-split:split:1919` 是真实 `WorldDevelopment.historical`，有独立参与者、资源、阶段历史和 legacy。

## 4. 实验 C：真实历史人物主动行动

自由运行 1912–1950，没有注入他们的下一步行动：

| 人物              | 自主行动                                                                                        | 结果                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Sigmund Freud     | organize_meeting / publish / recruit_members / request_help / support_process                   | 维持心理分析圈，进入制度化；参与自下而上的周三讨论会进程 |
| Victor Adler      | found_process / organize_meeting / recruit_members / support_process / care_for_kin             | 领导社民党进程制度化，并参与 1938 年自下而上的 SDAP 进程 |
| Karl Kraus        | publish / recruit_members / organize_meeting / attend_meeting / support_process / found_process | 把 Die Fackel 网络转成多个持续进程                       |
| Arthur Schnitzler | publish / attend_meeting / support_process / care_for_kin                                       | 作为参与者/支持者进入社民党与心理分析网络                |

四人都不是只被动等待玩家触发专属场景。

## 5. 实验 D：跨代历史影响

固定 seed，控制/处理世界都有 4 个 1912 年出生的普通孩子；处理世界有一个已制度化的 reform legacy，控制世界没有。

```text
control legacy life events: 0
treatment legacy life events: 66
treatment reform legacy: 一项被制度化的改革
generation:
  Legacy Child t4: 98 events, 6 legacy events
  Legacy Child t1: 92 events, 4 legacy events
  Legacy Child t3: 79 events, 3 legacy events
  Legacy Child t2: 76 events, 0 legacy events
beneficiary: Legacy Child t1 (born 1912)
```

处理世界的地区 baseline：foodSupply 0.92、stability 0.7675；控制世界 foodSupply 0.90、stability 0.7225。差异来自改革 legacy，不是日志叙述。Legacy 事件持续到 1936 年；下一代在成年后实际遇到工时表、病假/互助金、工会办公室等生活事件。

## 6. 实验 E：完整人生与叙事

同一自由世界运行 60 年，三个玩家出生的普通人和两个初始职业人物：

| 人物             | 出生 | 结局          | 事件数 | 职业记录               |
| ---------------- | ---- | ------------- | -----: | ---------------------- |
| Klara Drucker    | 1912 | 在世（60+）   |    526 | 印刷工，1926 起        |
| Rudolf Schneider | 1912 | 1972 暴力死亡 |    440 | 印刷工，1928/1940/1952 |
| Franz Zugführer  | 1912 | 在世（60+）   |    422 | 印刷工，1929/1941      |
| Friedrich Hofer  | 1868 | 1943 去世     |    178 | 市府职员/保险官员      |
| Grete Stein      | 1884 | 1918 去世     |     27 | 小学教师               |

时间线同时包含童年、家庭、学校、工作、疾病、工会、历史参与、legacy 事件和死亡。儿童不再执行成人组织行动；成年后目标会随工作/家庭/健康变化。示例：

- Klara 1926 进入印刷厂；1930 年代遇到工时表和工会 legacy；1972 年退休。
- Rudolf 1928/1940/1952 多次进入印刷厂，1972 年在街区冲突中死亡。
- Franz 1929/1941 进入印刷厂，经历家庭、工会、legacy 工时事件。
- Friedrich 是市府职员/保险官员，经历改革后的行政与保险事务。
- Grete 是小学教师，1918 年去世，人生短但有自己的职业与家庭关系。

## 7. 实验 F：战争后果内容

一个战争进程在没有活参与者/组织后自然进入 ended，留下 `war_aftermath` legacy。随后 12 年：

```text
war aftermath legacy events: 24
sample dates: 1926-06, 1926-09, 1927-07, 1927-11
```

生成内容实际触发：抚恤金窗口、停摆的挂钟、空出来的床铺、修屋顶的临时工。

## 8. 真实模型

### Director

`docs/v4/phase-7-director-demo.json`：

| 年份 | tokens | 行动                                                               |
| ---: | -----: | ------------------------------------------------------------------ |
| 1914 |  6,143 | organize SDAP、publish 心理分析会、relief 医院                     |
| 1920 | 10,263 | relief 社民党、recruit 印刷工会、reform 市政厅（无 process，跳过） |

6 条 action 中 5 条以 `macro_action:*` 事件执行；`recruit` 增加印刷工会成员；`relief` 真实转移组织资金/食物；`publish` 生成知识。1920 年的 `reform` 指向没有 process 的市政厅，被 Engine 以 `reform action needs a process` 跳过；这不是伪造成功。`reform` 由已有的社民党进程通过历史生命周期留下改革 legacy。模型没有直接设置 phase/胜负/死亡。

### Content Author

`docs/v4/phase-7-content-author.json`：

| family                    | tokens | nodes/outcomes/narrations | actual trigger              |
| ------------------------- | -----: | ------------------------- | --------------------------- |
| vienna-legacy-worklife    |  9,674 | 4/12/24                   | 处理世界 66 条 vs 控制 0 条 |
| vienna-war-aftermath-life |  9,125 | 4/12/24                   | 战后 24 条                  |

两族都只在真实 `legacy` 条件存在后触发。内容生成通过 strict schema、token、角色、效果和来源验证；失败尝试不会发布。

## 9. 时序

修复：

- 死亡日期取该人物截至当时已提交事件的最晚日期；
- 携带 death effect 的事件日期不早于死亡日期；
- 死亡后不再进入场景/agency/Director action；
- 年度顺序统一；
- outcome 文本引用未 cast 的可选角色时过滤该 outcome，避免 `{neighbor}` 泄漏。

长期试玩中 `anyEventAfterSubjectDeath=false`，`anyEventBeforeSubjectBirth=false`，未解析 token 0；旧存档历史事实保留。

## 10. 测试、构建与长期运行

### v4 专项

```text
pnpm exec vitest run tests/v4-*.test.ts
→ 23 files passed | 2 skipped
→ 152 tests passed | 8 skipped
→ 14.86s
```

新增测试覆盖：

- `v4-agency.test.ts`：历史人物/普通人主动行动、组织成员变化、底部进程、固定 seed 确定性、Director action 执行；
- `v4-legacy.test.ts`：expected end 不强制结束、reform legacy、baseline/事件权重、失败记忆、进程分裂、跨代内容触发；
- `v4-timeline.test.ts`：死亡后无事件、原因不晚于后果。

### 88 年试玩

```text
pnpm v4:playtest
→ 453 persons / 259 alive / 194 dead
→ 18,133 events / 206.06 events per year
→ 55.96s wall
→ maxLivingHousehold 12
→ unresolved template tokens 0
→ event after subject death 0
→ event before subject birth 0
```

`anyScenePrefixRepeatedOver12ForOnePerson=true` 仍存在（232 个 offender，max 56），主要是长期邻里/工会/照护事件；不是死亡后行动或时间倒置。Phase 7 不把重复当作历史丰富度。

### 88 年审计

```text
pnpm v4:audit 88
→ 362 persons / 198 alive
→ 13,708 events / 155.77 events per year
→ 16 historical processes
→ 87 historical events
→ 26 generated packs / 104 generated scenes / 519 narrations
→ generated share 53.4%
```

审计中的 16 个进程包含两个 seed 进程、底部工会/政党/文化进程和历史事件产物；不是 16 个预写剧本。`vienna-wartime-homefront` 与 `vienna-war-aftermath-life` 在该审计中没有触发，因为该世界没有实际战争进程；战争后果由实验 F 单独验证。

### 12 人物人生演示

```text
pnpm v4:life-demo
→ 14,034 events / 175.43 events per year
→ 30.28s wall
→ 12 人中 3 人活到 80；死亡年龄 74/11/22/79/80/60/65/80/80/77/75/68
→ 单人物事件 21–583
```

### 构建/浏览器

```text
pnpm build
→ 通过（2.84s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（9.3s test / 12.8s wall）
```

e2e 在独立 `living_world_e2e` 数据库运行，播种历史层并写入 reform legacy；浏览器实际注册、出生、读取个人日志、选中 Sigmund Freud（历史人物/历史参与），并检查世界侧栏的历史进程与历史遗产。

### 全量仓库测试

```text
pnpm test
→ 72 files passed | 7 skipped (79)
→ 432 tests passed | 36 skipped (468)
→ 157.28s
```

这包含冻结的 v1–v3 测试与 v4；不以 mock LLM 为真实模型证据。

## 11. 性能

Phase 7 合成运行时基准（1 年，agency 开启）：

```text
1k:  81 ms, 12,305 persons/s
5k:  246 ms, 20,330 persons/s
20k: 932 ms, 21,452 persons/s
```

这是简化 in-memory 世界，没有完整历史/组织密度，不是 20k PostgreSQL/API/WAL 验收。但新增 agency 没有让采样和年度步骤出现超线性爆炸。

## 12. 仍未完成

1. 真实人物仍只有 4 位；不是全球历史人物库。
2. 历史进程仍是 Vienna 单地区；没有跨地区传播、全球战争/疫情仿真。
3. 自主行动是确定性规则循环，不是通用规划器；长期照护/支持进程等行动会重复，内容多样性仍需继续扩展。
4. Legacy 目前只改变 baseline、事件权重和内容条件；没有政策废除、预算执行、正式制度机构或跨地区扩散。
5. 分裂是低频确定性规则，不是完整派系/组织政治模拟。
6. Director 行动已真实执行，但仍可能指错目标；失败会跳过并记录 reason。Director 仍可能提出零载体发展；它们会作为地区条件生效或被结束，不会自动变成有参与者的历史。
7. Content Author 只生成两个 legacy 内容族；自动 enqueue 仍只有 social_change。
8. 20k PostgreSQL/API/WAL/恢复、公网部署未测。
9. 婚姻/生育仍是自动场景，不是玩家选择或完整婚配系统。
10. 旧历史档案保留原始事实，不做 retroactive rewrite。

## 13. 结论

Phase 7 打通了：

```text
Person / Organization state
  → self-formed goal
  → feasible action
  → seeded choice
  → typed effects + EventFact
  → changed person/organization/process
  → durable legacy
  → future event eligibility, weights and structural conditions
  → later people's concrete lives
```

同时，Director 只能提出有界 action，Engine 执行并可能失败；底层历史不需要 Director 先批准；死亡后不再出现新行动。  
这仍是一个可审计的 Vienna 垂直切片，不是完整历史模拟器；但普通人可以自主进入、维持、反对或改变历史，历史人物也有自己的行动，历史后果能跨代进入日常人生。
