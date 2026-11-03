# Phase 8：Life Diversity & Content-Driven Agency 验收报告

日期：2026-11-03  
基线：`0e8c8ab`  
目标：让主动任务可以由内容层扩展；让不同人物主动做不同的事，经历不同的人生；不是继续扩宏观系统。

## 0. 状态总表

| 项目               | 状态             | 证据 / 边界                                                                                                                |
| ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 内容驱动 Task Pool | 完成             | `TaskDefinition` 复用 Scene 的 roles/conditions/outcomes/narration/effects；Task 从 Agency 进入，Event 从 annual rate 进入 |
| Task 内容生成      | 完成（真实模型） | 8 族 48 个 task，144 outcomes，288 narrations；加上 2 个 authored 补充 task，共 50                                         |
| 任务选择模型       | 完成（轻量）     | 目标、需求、性格、技能、风险、capability、近期同 domain 惩罚；不是 LLM 逐人决策                                            |
| 有效候选审计       | 完成             | `phase-8-candidates.json`；按人物/年龄/处境统计事件和任务候选，不把定义总数当有效数                                        |
| 五种人生           | 完成             | 同一实际世界：贫穷学徒、富裕青年、医生、政治活动者、特殊能力者；任务/历史接触/legacy 同时存在                              |
| 重复改善           | 完成（部分）     | treatment 2705 task events；playtest prefixRepeatOffenders 159 vs control 325；仍非零                                      |
| Task 生成成本      | 已审计           | 148,566 tokens（含失败重试）；48 个发布 task；0 个近似语义重复                                                             |
| 叙事               | 完成（投影级）   | `LifePassage` 从已提交 EventFact 组织；API/UI 显示人生片段；不删除事实                                                     |
| 浏览器             | 完成             | e2e 通过；世界/人物/历史/legacy 仍可读                                                                                     |
| 全球/大规模内容库  | 未完成           | 50 个 task 是垂直切片；无全球 10k 历史人物/百万 task                                                                       |

## 1. Task 与 Event 的统一执行契约

`TaskDefinition = SceneDefinition & { task: TaskMeta }`。

共享：

- `RoleRequirement`、`SceneCondition`、`SceneOutcome`；
- `castSceneRoles`、`selectOutcome`、`conditionsPass`；
- `EventEffect`、`EventFact`、`Project`、`Interaction`、`Knowledge`；
- scene history、cooldown、followup、narration。

不同入口：

```text
Event: runEventYear → rate/weight → scene
Task:  runAgencyYear → taskUtility → cast/outcome → scene
```

新增 task 不需要改 `engine.ts` 的 switch。硬编码的求职、照护、组织会议等仍是 baseline；内容 task 负责具体情境。

### Task 元数据

```ts
{
  domain: 'work' | 'education' | 'health' | ...;
  goals: PersonAgencyGoal[];
  needs: TaskNeed[];
  baseUtility: number;
  risk?: number;
  skills?: Skill[];
  capability?: string;
}
```

`taskUtility()` 使用：

- 当前 goal 匹配；
- 家庭现金/食物/健康/照护需求；
- 大五人格；
- 技能；
- 风险与健康折损；
- 特殊 capability；
- 最近同 domain 的 0.55 倍重复惩罚。

Task 是否可行仍由 age/stage/conditions/role casting/outcome conditions 决定。任务有默认 `cooldownYears=2`。

## 2. 内容生成

### 生成规模

`docs/v4/phase-8-content-batch.json`

| 指标                    |    数值 |
| ----------------------- | ------: |
| 请求 pack               |       8 |
| 生成并通过的 task       |      48 |
| authored 补充 task      |       2 |
| 总 task                 |      50 |
| outcomes                |     144 |
| narrations              |     288 |
| 总 tokens（含失败重试） | 148,566 |
| 近似语义重复            |       0 |
| 精确重复 outcome        |       0 |

8 个 pack：

- `task-vienna-poor-apprentice`
- `task-vienna-bourgeois-youth`
- `task-vienna-medical-work`
- `task-vienna-activist`
- `task-vienna-special-capability`
- `task-vienna-daily-culture`
- `task-vienna-family-care`
- `task-vienna-writer-researcher`

domain 分布：

```text
work 8, education 6, social 3, culture 4, migration 1,
health 6, knowledge 8, politics 6, daily 2, family 6
```

生成失败主要来自：

- 未知 role token（`{foreman}` 等）；
- 模型输出 4 nodes 而不是 brief 要求的 6；
- 零 amount；
- 未声明的 education status；
- narration key 不匹配。

修复包括：prompt 明确节点数量/角色 token；`vocational → apprenticeship`；narration key 固定；cash/food 强制 `$household`；零数值 effect 丢弃；自然角色别名映射到已声明角色。没有放宽核心角色/条件/效果验证。

### 实际触发

`docs/v4/phase-8-lives.json`，45 年同一世界：

```text
taskEvents: 690
uniqueTasks: 36 / 50
agencyEvents: 384
```

在不同人生中：

| 人物           | task events | unique tasks |
| -------------- | ----------: | -----------: |
| 贫穷学徒 Franz |          56 |           21 |
| 富裕青年 Otto  |          46 |           17 |
| 医生 Emil      |         127 |           17 |
| 活动者 Alois   |          49 |           20 |
| 特殊能力 Sofia |          41 |           19 |

不是每个任务都每年发生；未触发的 14 个任务主要因为职业/年龄/教育/关系/capability 条件，不能通过放宽条件来伪造覆盖。

## 3. 五种人生

同一实际世界，运行 45 年（1912–1957），使用全部事件、历史进程、任务和 legacy。

| 人物               | 身份/能力                 | 事件 | 任务 | 任务域                                                                    | 历史人物接触                    |
| ------------------ | ------------------------- | ---: | ---: | ------------------------------------------------------------------------- | ------------------------------- |
| Franz Lechner      | 贫穷印刷学徒              |  208 |   56 | health/family/education/politics/social/culture/migration/knowledge       | Schnitzler、Kraus               |
| Otto Winter        | 富裕印刷厂主之子/Faktor   |  199 |   46 | social/family/migration/culture/knowledge/daily/health/politics           | Kraus、Adler                    |
| Emil Weiss         | 医生                      |  338 |  127 | knowledge/health/social/family/culture/daily/migration                    | Schnitzler、Freud、Kraus、Adler |
| Alois Lechner      | 印刷工/工会秘书/活动者    |  225 |   49 | politics/health/daily/knowledge/education/migration/family/social/culture | Freud、Adler、Kraus、Schnitzler |
| Sofia Beobachterin | `social_insight` 特殊能力 |  288 |   41 | health/family/education/culture/daily/social/politics/migration           | Kraus                           |

实际任务例子：

- Franz 主动找印刷厂学徒位置、问老工人手势、参加工会、在家庭照护和疾病中行动。
- Otto 参加沙龙、音乐会、大学/家庭生意选择、旅行和出版。
- Emil 做研究、出诊、公共卫生宣传、向《火炬》投稿、与 Freud/Adler 建立关系。
- Alois 招募、发言、出版传单、与雇主谈判、联系 Adler。
- Sofia 用 social_insight 调解院子纠纷，并进入家庭/照护网络。

这些不是为每个人硬编码的人生；任务来自同一内容池和同一 Agency 结算。

## 4. 候选池审计

`docs/v4/phase-8-candidates.json`

50 个 task；183 个事件定义。按人物处境：

| 人物     | 事件候选 | Task 候选（无内容→有内容） | 域                                                |
| -------- | -------: | -------------------------: | ------------------------------------------------- |
| 贫穷学徒 |        3 |                      0 → 2 | work                                              |
| 富裕青年 |       34 |                      0 → 7 | health/family/politics/social/education/migration |
| 医生     |       23 |                      0 → 5 | knowledge/health                                  |
| 活动者   |       33 |                      0 → 5 | health/politics                                   |
| 特殊能力 |       28 |                      0 → 2 | social/family                                     |

这体现“定义数量 ≠ 有效候选数量”：50 个 task 对某个具体人物只有 2–7 个可执行入口。更多内容仍需继续扩展，而不是只增加 JSON 总数。

## 5. 重复与长期运行

### 88 年审计，对照

| 配置                         | events | events/year | persons | alive | task events |
| ---------------------------- | -----: | ----------: | ------: | ----: | ----------: |
| 无 Task (`V4_AUDIT_TASKS=0`) | 13,281 |      150.92 |     389 |   223 |           0 |
| 有 Task                      | 15,704 |      178.45 |     638 |   326 |       1,859 |

Task 增加了事件和具名人口（任务角色可能从背景人口中具名化），但基础疾病/死亡仍走原统计路径，不是把基础风险乘以内容数量。

### 88 年试玩，对照

| 配置    | events | events/year | persons | alive | task events | prefixRepeatOffenders | max |
| ------- | -----: | ----------: | ------: | ----: | ----------: | --------------------: | --: |
| 无 Task | 21,021 |      238.88 |     449 |   278 |           0 |                   325 |  72 |
| 有 Task | 24,991 |      283.99 |     803 |   420 |       2,705 |                   159 |  74 |

Task treatment 的重复 offender 约减半，但仍有 159。主要剩余重复来自长期邻里/工会/照护事件，以及同一医生被许多病人选择的 `second-opinion`。这不是死亡后行动或时间倒置；两配置的 `anyEventAfterSubjectDeath=false`、`anyEventBeforeSubjectBirth=false`、未解析 token 0。

### 性能

1 年、简化 in-memory、agency 开启：

| persons | 无 Task |  有 Task |
| ------: | ------: | -------: |
|      1k |   84 ms |   123 ms |
|      5k |  243 ms |   501 ms |
|     20k |  961 ms | 2,341 ms |

任务选择增加约 0.9–1.4s/20k 年，主要来自任务角色 cast；不是每人扫描全部 50 个 task（tasksByStage 只扫描当前 stage）。这不是 20k PostgreSQL/API/WAL 验收。

## 6. 叙事

- `packages/v4/passages.ts`：`LifePassage` 只投影已提交 EventFact，按同年/同行动族组织；不产生新事实、不删除长期事实。
- API `lifePassages` 与 UI “人生片段”显示 title/日期/事实文本。
- 生成 task 使用具体 outcome 和 narration；普通生活内容保持克制，历史政治内容保持严肃。
- 仍非每位人物实时 LLM 叙事组织；重要章节未来可低频模型组织。

## 7. 测试、构建与浏览器

```text
pnpm typecheck
→ 通过

pnpm exec vitest run tests/v4-*.test.ts
→ 25 files passed | 2 skipped
→ 163 tests passed | 8 skipped
→ 15.68s

pnpm test
→ 74 files passed | 7 skipped (81)
→ 443 tests passed | 36 skipped (479)
→ 157.50s

pnpm build
→ 通过（2.89s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（9.3s test / 13.3s wall）
```

e2e 在独立 `living_world_e2e` 数据库运行，实际注册、出生、读取个人日志、选中 Sigmund Freud，并检查历史人物/历史参与/历史遗产。

Content Author 证据：

- 8 个 task pack，真实模型 `deepseek-v4.1-flash`；
- 148,566 tokens（含失败重试）；
- 48 个发布 task / 144 outcomes / 288 narrations；
- 2 个 authored 补充 task；
- 0 个近似语义重复、0 个精确重复 outcome。

## 8. 仍未完成

1. 50 个 task 是内容垂直切片，不是百万级任务库。
2. 生成 task 主要覆盖 Vienna 1912–1957 的成年生活；童年/老年任务仍少。
3. 未触发 task 仍多；不能通过放宽条件伪造覆盖。
4. Task 选择是启发式效用，不是通用规划器；长期目标仍简化。
5. 生成内容可能需要人工审查；语义去重是字符 n-gram 阈值，不是人工语义审计。
6. 任务角色 cast 在 20k 合成基准上有明显开销；需要未来按职业/组织/关系索引。
7. 内容自动 enqueue 仍不覆盖所有 Task 族；批量生成是显式命令。
8. 20k PostgreSQL/API/WAL、恢复、公网部署未测。

## 9. 结论

Phase 8 打通了：

```text
Content Author → validated TaskDefinition
  → Task pool (stage/conditions/roles)
  → person goal/needs/traits/skills/risk
  → taskUtility + cast + outcome
  → typed effects + EventFact
  → long-term life and history
```

新增主动行为不再需要修改 `agency.ts` switch。不同人物有不同有效任务池，实际人生出现不同的工作、文化、医疗、政治、家庭和特殊能力行动；任务内容扩大了真实生活，而不仅是数据库数量。

它仍是一个 Vienna 垂直切片，不是完整世界模拟器；剩余限制在报告中逐项列出。
