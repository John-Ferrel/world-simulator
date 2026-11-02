# v4 Phase 6：Living History 验收报告

日期：2026-11-02  
基线：`3123a4c`（可玩版本）  
目标：让普通人通过真实社会关系进入历史；真实历史人物是稳定 Person；历史进程有多阶段、多角色、可被行动改变。

## 0. 状态总表

| 项目                | 状态               | 证据 / 边界                                                                                                   |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| 真实历史人物 Person | 完成（4 人）       | Freud/Adler/Kraus/Schnitzler；稳定 ID、来源、活动范围、realWorldDeath 参考；共用 Person/Organization/Relation |
| 历史进程            | 完成（最小通用）   | `WorldDevelopment.historical`；kind/phase/objectives/participants/metrics/history/outcome；无独立历史状态表   |
| 多角色参与          | 完成               | participation/influence 只由已提交 effect 产生；战争 18 人、疫情 13 人有不同角色                              |
| 普通人改变进程      | 完成（受控反事实） | 同一 seed，仅增加一次组织者行动：mobilizing → institutionalizing                                              |
| 真实人物持续接触    | 完成               | Freud 挂号信→关系/知识→复诊；12 年接触情境中 7 条 Freud acquaintance、35 条 knowledge                         |
| Director 多轮       | 完成（真实模型）   | 1914：4,506 tokens；1920：8,158 tokens；读取已有进程并给出 historicalMoves；1914 未强行制造战争               |
| Content Author      | 完成（真实模型）   | 8,744 tokens，4 nodes/12 outcomes/24 narrations；historicalProcess 条件；场景实际触发 2 次                    |
| 战争情境            | 完成（受控进程）   | 31 war-history 事件、18 参与者；结局 `war_ended_without_scripted_victor`，不宣布胜利者                        |
| 疫情情境            | 完成（受控进程）   | 14 epidemic 事件、13 参与者；最终 `epidemic_receded`                                                          |
| 浏览器可读          | 完成               | e2e 实际选中 Freud，看到“历史人物/历史参与”；世界显示历史进程                                                 |
| 长期全量            | 部分               | 88 年审计/试玩通过；未做 1900–2000 全球历史长跑                                                               |

## 1. 架构契约

- `Person.historicalIdentity` 是公开身份/来源/活动窗口/真实死亡参考，不是第二套演员系统。
- `WorldDevelopment.historical` 是进程唯一持久状态；development ID 就是 process ID。
- `historical_participation` 和 `historical_influence` 是唯一改变进程参与/metrics 的事件原语。
- 阶段由 `advanceHistoricalProcesses()` 每年根据参与、组织成员/资源、metrics 和结束时间计算；LLM 不直接设置 phase/outcome。
- `historical_process` effect 允许真实组织/行动从下往上创建进程，但必须有现存组织/范围/来源。
- `knowledge` effect 区分 witnessed/told/document/inferred，不把“听说”当目击。
- 历史人物不进入玩家新生儿家庭：4 个 curated household 的 `guardianIds` 为空。
- 场景 `placeId` 允许把见面事件落在真实地址（如 Berggasse 19），但不会把人物永久传送过去。
- Director `historicalMoves` 只允许 support/oppose/escalate/deescalate，magnitude≤0.2，最多 6 条；应用只改 metrics。
- 进程按 region/kind/ID 和进程内 participant map 查找；没有每 tick 扫描全部历史人物。

关键文件：

```text
packages/v4/domain.ts              historicalIdentity / HistoricalProcess / roles / conditions / effects
packages/v4/history.ts               phase/metrics/participation/influence/advance
packages/v4/macro.ts                WorldDevelopment.historical / snapshot / proposed moves
packages/v4/engine.ts               kind-key resolution / role historical / knowledge / phase transition event
packages/v4/content/vienna-history-people.ts
packages/v4/content/vienna-history-seed.ts
packages/v4/content/vienna-history.ts
packages/v4/content/vienna-history-world.ts
```

## 2. 真实历史人物

四位人物以普通 Person 加入 1912 维也纳：

| 人物              | QID     | 模拟角色                   | 来源                                                 |
| ----------------- | ------- | -------------------------- | ---------------------------------------------------- |
| Sigmund Freud     | Q9215   | 精神分析学家，Berggasse 19 | Wien Geschichte Wiki, Wikidata                       |
| Victor Adler      | Q366845 | SDAP 领袖/编辑             | Wien Geschichte Wiki, Parlament Österreich, Wikidata |
| Karl Kraus        | Q44328  | Die Fackel 编辑/公开朗读者 | Wien Geschichte Wiki, Wikidata                       |
| Arthur Schnitzler | Q44331  | 医生/剧作家                | Wien Geschichte Wiki, Schnitzler-Briefe, Wikidata    |

- 真实死亡日期只存 `historicalIdentity.realWorldDeath`；`died` 不设置。模拟死亡仍只能由 `applyDeath`/统计入口提交。
- 只声明有公开依据的 acquaintance：Freud–Schnitzler（1906 年信件）、Kraus–Schnitzler（1908 年信件）；不编造亲属或亲密关系。
- 四个 household 是单成员模拟单位，不声称真实人物独居；家人被有意不建模，避免伪造。
- `activeTo` 是公开活动窗口边界，不是死亡命令；超出后不再作为新的历史接触角色，但 Person 仍可活着。

## 3. 两个初始历史进程

1. `development:seed-vienna-social-democracy-1912`
   - kind: social_movement；SDAP；Victor Adler 为 leader。
   - objectives：普选、劳动保护、社会救济。
   - event families：`vienna-history-social-democracy`, `vienna-social-movement`。
2. `development:seed-vienna-psychoanalytic-circle-1912`
   - kind: cultural_movement；周三心理学会；Freud 为 leader。
   - event families：`vienna-history-psychoanalysis`。

它们不是未来剧本：1912 年这两个组织和人物已经在活动；进程只暴露当前条件/参与渠道。

## 4. 历史内容（13 个作者场景 + 4 个真实模型生成节点）

作者场景：

- SDAP 公开集会/街区组织；
- Freud 来信与候诊室复诊；
- Kraus 在 Café Central 的朗读；
- Schnitzler 在 Burgtheater 的演出后接触；
- 1914 征兵、反战组织、医院/家庭后方；
- 1918 邻里照护、诊所分诊、葬礼；
- 印刷工会互助基金的 bottom-up 进程创建。

真实 Content Author：

```text
pnpm exec tsx scripts/v4-content-author.ts --generate vienna-historical-social-movement
→ model: deepseek-v4.1-flash
→ tokens: 8,744
→ 4 nodes / 12 outcomes / 24 narrations
→ file: packages/v4/content/generated/vienna-historical-social-movement.json
```

在 12 年历史接触情境中，该生成包实际触发 **2** 条 `vienna-historical-social-movement` 事件。  
第一次生成尝试（19,713 tokens）被严格内容 validator 拒绝，原因是 strict validator 还没有承认 `historicalProcess` 条件；修复后第二次真实生成一次通过，失败内容没有发布。

## 5. 实际场景证据

### A. 战争进程

```text
process: confrontation → ended
war-history events: 31
participants: 18
roles seen: participant, organizer, opponent, rescuer, victim, affected, witness
outcome: war_ended_without_scripted_victor
```

样本：

- 1915-08：Berta Weiss 在医院走廊帮护士换床单；
- 1915-12：Emil Weiss 在名单上看到自己的名字，进兵营后被分到连部抄名单；
- 1916：Alois Lechner 在工友聚会上说前线需要面包和停战，次日被车间主任问话；
- 1916：Luise Kral 把逃兵藏在印报间纸库。

### B. 1918 公共卫生危机

```text
process: confrontation → ended
epidemic events: 14
participants: 13
roles: victim, rescuer, witness, executor, affected
outcome: epidemic_receded
```

样本：

- 邻居整夜咳嗽，有人选择不开门、烧掉门缝里的报纸；
- Ferdinand Winter 给 Anna Moser 送水、煮布，自己随后喉咙疼；
- Helene Winter 按市政通知关闭街角学校；
- Josef Bauer 抄死亡名单，写到熟人名字时放慢手。

### C. Freud 接触

12 年接触情境：

```text
history events (incl. generated): 40
Freud acquaintance relations: 7
knowledge created around historical persons: 35
```

接触不是“全城自动认识”：

- 需要 21–59 岁、secondary/higher 教育、家庭现金≥20、同地区且有心理分析进程；
- 场景落在 `place-wien-bergasse-19`；
- 先建立 acquaintance 和 knowledge，再通过 `hasRelationWith` 触发复诊；
- 历史人物作为 subject 被排除，不会出现“Freud 自己去挂 Freud 的号”。

### D. 底向上进程

`vienna-history-printers-mutual-aid` 由真实印刷工会/成员行动通过 `historical_process` effect 创建 `development:event-vienna-printers-mutual-aid`，而不是等 Director 批准。  
它随后有成员、会费和自己的 phase。

### E. 反事实

```text
control:   support 0.4, no committed influence action → mobilizing
treatment: same seed/world + one organizer influence event → institutionalizing
```

这是固定 seed、受控事件的受控反事实，不是仅共享 PRNG 的顺序差异。测试见 `tests/v4-history.test.ts`。

## 6. 真实 Director 多轮

`pnpm v4:history-director-demo`（测试库，真实模型）：

| 轮次 | tokens | 模型行为                                                                                      |
| ---: | -----: | --------------------------------------------------------------------------------------------- |
| 1914 |  4,506 | 读到两个既有进程；提出 support 0.06/0.05；明确没有制造尚未发生的大战                          |
| 1920 |  8,158 | 读到进程已进入 institutionalizing/participants 9；提出社会民主党 support 0.06；没有创建新进程 |

证据：`docs/v4/phase-6-director-demo.json`。  
第一、二次调用遇到上游连接中断/JSON schema 失败；没有把失败写成成功。成功调用是真实模型和 revision-locked 事务路径。

正式活动世界 `world-vienna-1912-v45-mvz8uwrz` 启动后，后台 Macro Director 也完成了一次真实调用（5,289 tokens，revision 2）：它明确写出“1913 年没有战争动员的现实依据，因此不推进战争伤亡”，并只调整稳定性、粮食、医疗、结核/流感压力和两个历史事件族的权重。这验证了“不以真实年表强推历史”。

## 7. 长期与性能

`pnpm v4:audit 88`（带历史层）：

- 381 人 / 217 在世；
- 7,743 事件 / 87.99 事件每年；
- 历史场景 48 条；
- 两个 seed 进程在 88 年末均为 ended；
- 零事件年份 0。

当前活动世界：`world-vienna-1912-v45-mvz8uwrz`，从 1912-01 开始；交付检查时为 1919 年、41 个具名人物/35 人在世。初始世界包含 4 位真实历史人物和两个 1912 历史进程；真实 Director 调用后社会民主党进程有 5 名参与者，心理分析圈有 2 名。

`pnpm v4:playtest`（带历史层）：

- 563 人 / 324 在世；
- 14,356 事件 / 163.14 事件每年；
- 最大在世家庭 12；
- 19.56s wall；
- 21 条 canonical 事件日期晚于死亡；API 个人日志已过滤，原始事实保留；
- 模板 token/None/空参与者 0；
- 76 个同一人物场景前缀重复标记（长跨度邻里/生育参与）；不是同一年自触发。

## 7.1 12 人物人生演示

`pnpm v4:life-demo`（带历史层）：11,359 事件 / 141.99 事件每年；12 人中 3 人活到 80；死亡年龄 74、11、22、79、80、60、65、80、80、77、75、68。单人物事件 22–488。

## 8. 浏览器

```text
pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed
```

E2E 世界现在带历史层：

- 注册并创建玩家孩子；
- 世界侧栏显示历史进程；
- 选中 `person-sigmund-freud` 显示“历史人物”badge 和“历史参与”；
- 再切回 Anna/死亡人物；
- 无 `None`/原始 action 标题；
- 地图仍可点击；
- console/page error 0。

## 9. 测试与构建

```text
pnpm typecheck → 通过
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 22 files / 150 tests passed (13.55s)
pnpm test
→ 69 files passed / 7 skipped
→ 422 tests passed / 36 skipped (458)
→ 160.73s
pnpm build
→ 通过 (3.10s)
pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed (9.1s test / 13.8s wall)
```

浏览器 e2e 世界实际带历史层；它选中 Freud 并检查“历史人物/历史参与”，不是仅有 FC 层静态断言。

## 10. 仍未完成

1. 真实人物只有 4 位；不是完整历史名人库。
2. 1914/1918 情境是场景夹具/受控进程，不是全球战争或流行病仿真。
3. 进程阶段目前是通用阈值 + 组织资源，不是复杂策略模型；特定历史机制可能需要新的有界原语。
4. Director 成功两轮，但多地区长期运行、跨地区传播和真实人物主动行动仍未完整验证。
5. 历史人物没有完整家庭建模；不声称他们独居。
6. Content Author 只生成一个历史进程族；通用 war/epidemic budget/queue/rollback 仍未完成。
7. 25 条 canonical 事件日期/死亡顺序倒置仍未从事实层消除，只在个人日志投影过滤。
8. 20k 持久化/API/WAL、Commons 部署未测。
9. 不能宣称“任何自由祝愿都能改变历史”或“真实历史人物一定按真实结局”。
10. Director 也会创建长期停留在 emerging、零参与者的发展对象；它们不会自动产生历史影响，但需要后续内容/组织机制才能变成真实进程。

## 11. 结论

这轮不是增加几个参与者字段，而是打通了：

```text
真实历史人物 Person
  → 可信接触（地点/费用/教育/组织/公开活动）
  → 真实关系与 Knowledge
  → 历史进程 participation/influence
  → 组织成员/资源/指标
  → Engine 阶段变化与宏观条件
  → 个人日志和世界历史事实
```

普通人可以从街区会议、医院、兵营、印刷所或 Berggasse 候诊室进入历史；行动通过 bounded effects 改变进程；真实人物仍然会病死、失势或改变，不被姓名免疫。  
这仍是一个可审计的垂直切片，不是完成版历史模拟器。
