# v4 实现与验收报告

日期：2026-11-01
范围：`simulator-1031` 断代重写的 Vienna 1912 垂直切片及其通用人生延伸。
重要：本报告只记录 v4 实际运行过的证据。旧 v1–v3 的 318 项测试、长跑和备份恢复数字属于旧架构，不能替代 v4 验收。

> 2026-11-03 Phase 10 更新：新增 24 个手工重大事件 + 6 个手工任务、8 个真实模型生成 Family（48 nodes）；Phase 10 共 78 nodes / 233 outcomes，生成 tokens 141,933（含失败重生成约 171,333）。总池 140 Task / 333 Event definitions（254 generated + 79 authored），共 473 个可执行定义。45 年审计 employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→122；Critic 13 样本首轮 5 通过，定向改写后 11 个 P0 节点全部 ≥36/50（2 个窄过）。88 年 playtest 27,510 事件 / 3,490 Task / 44 重复 offender / 0 未解析 token。观察器新增稳定 Person/Event/Process ID 高亮、Hover 档案和事件/进程 modal，e2e 通过。完整报告见 [phase-10-report.md](phase-10-report.md)。不是百万/千级定义库，教育/出生覆盖下降，制度原语仍有缺口。

> 2026-11-03 Phase 9 更新：内容池从 Phase 8 的 50 Task / 104 generated event scenes 扩展到 **110 Task / 206 generated event scenes**。真实模型生产 27 Family / 162 nodes（60 Task + 102 Event）、487 outcomes、974 narration variants；最终发布 pack 的生成 tokens 530,721，含被丢弃重生成的累计 1,123,277；0 精确/近似重复，27/27 发布。3 seed × 35 年同 Engine 对照：在世人物平均 Task 候选 1.25→6.83、Event 候选 11.80→24.01、Task 事件 580→804、不同 Task 34→64、Task 候选为 0 的人 72→22.67；每年耗时 105.8→139.8 ms。45 年 treatment：11,349 事件 / 1,516 Task 事件 / 73 种 Task / 7 historical developments（control 9）。88 年 playtest：31,567 事件 / 3,673 Task 事件 / 0 未解析 token / 0 死亡后事件；control 29,737。20k 合成人口最坏 Task 选择 2,363 ms/年、400 MB。完整报告见 [phase-9-report.md](phase-9-report.md)。这不是千级/百万级内容库，也不是 20k 完整 DB/API 生产验收。

> 2026-11-03 Phase 8 更新：内容驱动 Task Pool (`TaskDefinition`/`taskUtility`/`auditCandidatePools`) 已接入；真实模型发布 48 个 task（另 2 个 authored 补充），144 outcomes/288 narrations，148,566 tokens（含重试）；同一世界五种人生产生 690 task events、36/50 unique tasks；88 年 treatment 24,991 events / 159 repeat offenders vs control 21,021 / 325。证据见 [phase-8-report.md](phase-8-report.md)、[phase-8-content-batch.json](phase-8-content-batch.json)、[phase-8-candidates.json](phase-8-candidates.json)、[phase-8-lives.json](phase-8-lives.json)。

> 2026-11-03 Phase 7 更新：确定性自主行动 (`agency.ts`)、组织主动行为、底部历史进程、进程 `suspended`/分裂、持久 `MacroState.legacy`、Director 可执行 `actions`、legacy 生活内容、canonical 死亡时序已接入。自由演化 A–F 证据见 [phase-7-experiments.json](phase-7-experiments.json)；真实 Director 6,143 + 10,263 tokens，提出 6 条行动、5 条执行、1 条无进程 reform 跳过，见 [phase-7-director-demo.json](phase-7-director-demo.json)；Content Author 9,674 + 9,125 tokens，见 [phase-7-content-author.json](phase-7-content-author.json)。完整验收见 [phase-7-report.md](phase-7-report.md)。

> 2026-11-02 Phase 6 更新：可参与历史进程 (`WorldDevelopment.historical`)、4 位维也纳真实人物、13 个历史场景、Director historicalMoves、真实 Content Author 历史内容、战争/疫情/反事实测试已接入。88 年审计 381 人/217 在世/87.99 事件每年，历史事件 48 条；真实 Director 4,506 + 8,158 tokens，Content Author 8,744 tokens。验收见 [phase-6-report.md](phase-6-report.md)；这仍不是全球历史/20k 生产验收。

> 2026-11-02 可玩版本更新：家庭容量/分户、死亡后伴侣终止/监护补选、出生愿望确定性回退、已故年龄/死因/标题投影、1946–1999 战后 16 场景与 24 条时代记录已接入。88 年审计 420 人/236 在世/111.26 事件每年；8 人物 88 年试玩 373 人/199 在世/最大在世家庭 12。尚未完成的 canonical 时间顺序、多地区 Director、20k DB/API、通用内容工厂仍明确列出。验收见 [playable-report.md](playable-report.md)。全量测试数字以最后一轮为准。
> 2026-11-02 Phase 5 更新：具名化审计修复（318→63，不再机械触顶）、20k 分阶段性能（简化内容 0.59s/年）、组织生命周期、月度急性风险、frail_body/social_insight 真实效果已接入。Phase 5 验收见 [phase-5-report.md](phase-5-report.md)；完整复盘见 [phase-3-4-retrospective.md](phase-3-4-retrospective.md)。全量 377 项通过，构建和浏览器通过。

> 复盘与偏差分析见 [phase-2-retrospective.md](phase-2-retrospective.md)。Phase 2 的工程交付通过测试，但人口/历史模型未成立；该文记录了原因与 Phase 3 方案。

## 状态总表

| 项目                 | 状态               | 证据 / 边界                                                                                                                                                                  |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v4 领域契约          | 完成               | `packages/v4/domain.ts`；Person/Household/Place/Organization/Position/Project/Interaction/Relation/Knowledge/EventFact/SceneDefinition/SceneInstance；`assertWorldV4` 不变量 |
| 多事件年度运行时     | 完成               | rate/weight、每年多事件、followup 队列、请求/回应、fact-tag 订阅、lifecycle 优先；29 项 engine 测试                                                                          |
| Vienna 作者场景包    | 完成               | 19 个场景、10 家庭、26 人、23 地点、6 组织、20 来源；10 项测试通过                                                                                                           |
| 通用人生场景包       | 完成（切片级）     | 19 个场景；5 项内容测试 + 3 项玩家人生集成测试通过                                                                                                                           |
| 家庭/生育场景包      | 完成（自动场景）   | 8 个场景；3 项测试通过；新生儿是真实 Person，含父母/监护人/家庭/出生事件                                                                                                     |
| 1912–1918 作者人生链 | 完成               | 2 项 slice 测试通过；Anna/Josef 工伤、房租、学校、动员、流感                                                                                                                 |
| v4 PostgreSQL 存储   | 完成               | `v4_*` 实体/事件表、出生请求、出生契约队列；`saveV4World` revision 检查                                                                                                      |
| v4 API/认证/SSE      | 完成               | Fastify、scrypt 密码、cookie session、公开事件过滤、人物日志权限；world 分页、person/event detail、search、坏 cursor 400                                                     |
| v4 模拟器            | 完成               | 出生落地、愿望入队、年度推进、经济、2000 年明确终点                                                                                                                          |
| v4 出生契约 LLM      | 完成（2.0）        | Birth Contract：privateGoal/focus/capability/conditions/limits/costs；服务端复核；8 项 contract 测试；真实模型调用约 1,343 tokens                                            |
| 三栏观察器           | 完成               | 人物/家庭、个人日志、维也纳地图、时代/公开事件、出生页、等待页                                                                                                               |
| 年份推进与恢复       | 完成（小规模）     | 开发世界实际 1912→1913→… 连续推进；刷新从 PostgreSQL 读取                                                                                                                    |
| 完整人生经济         | 部分               | 工资/租金/食物/债务 + 显式月度外部营收/收入；无市场、税收、驱逐                                                                                                              |
| 婚姻/生育/代际       | 部分完成           | 玩家后代和初始人口可求偶/同居/生育；离婚、同性关系、家庭灭绝现金继承第一版；无玩家选择、再婚链、遗嘱/债务分配                                                                |
| 玩家间持久互动       | 未完成             | Relation/Interaction 可存储，但没有跨玩家场景或请求-答复 UI                                                                                                                  |
| LLM 场景/选择决策    | 未完成             | 引擎保留同步 policy 接口；默认确定性权重                                                                                                                                     |
| History Director     | 未完成             | 只有内容包中的公开时代记录和 pressures                                                                                                                                       |
| 内容工厂             | 完成（离线）       | 26 族 / 104 场景 / 519 narration；Phase 7 新增 2 族 legacy 内容；真实模型生成；审计 24/26 族触发（战争余波需实际战争进程）                                                   |
| 读取路径与规模       | 部分完成           | 世界摘要/人物 keyset 分页/单人详情/搜索；1k/5k PostgreSQL 实测；未做 20k 或并发 API 压测                                                                                     |
| 宏观多地区/全球      | 部分               | lower-austria + klosterneuburg 两地区数据/迁移；未做多地区长期真实 Director；不能宣称全球                                                                                    |
| 内容覆盖审计         | 完成               | 80 年：3,657 事件、279 focal、358 causal、75 出生；零事件年份 0；未解析 token 0；顶层场景占比 7.9%                                                                           |
| 可玩闭环             | 完成（单世界切片） | 注册→出生→家庭/关系/工作/死亡→2000 horizon；浏览器 e2e 通过；88 年试玩报告见 [playable-report.md](playable-report.md)                                                        |
| Historical Process   | 完成（通用最小）   | `WorldDevelopment.historical`；阶段/参与/metrics/组织/结果；战争 18 参与者、疫情 13 参与者                                                                                   |
| 真实历史人物         | 完成（4 人）       | Freud/Adler/Kraus/Schnitzler；稳定 Person/QID/来源/活动窗口；真实死亡只作参考                                                                                                |
| 历史参与与因果       | 完成（垂直）       | 地点/组织/费用/关系渠道；participation/influence/knowledge effects；反事实 mobilizing→institutionalizing                                                                     |
| 历史 Director/内容   | 完成（真实调用）   | 4,506 + 8,158 tokens、historicalMoves；Content Author 8,744 tokens、4/12/24、实际触发 2 条生成历史事件                                                                       |
| Task Pool            | 完成（内容驱动）   | `TaskDefinition` + `taskUtility` + `auditCandidatePools`；50 个 Task；无需为新行为改 Engine switch                                                                           |
| 真实 Task 内容       | 完成               | 8 族/48 个模型生成 Task + 2 authored；144 outcomes/288 narrations；148,566 tokens；0 语义重复                                                                                |
| 五种差异人生         | 完成               | 同一世界 45 年；贫穷学徒/富裕青年/医生/活动者/特殊能力；690 task events、36/50 unique tasks；历史人物接触与 legacy 并存                                                      |
| Phase 9 内容池       | 完成（真实模型）   | 27 Family / 162 nodes / 60 Task + 102 Event；487 outcomes / 974 narrations；发布 27/27；最终 pack tokens 530,721，累计 1,123,277 |
| Phase 9 有效候选     | 完成               | 3 seed × 35 年：Task 候选 1.25→6.83、Event 11.80→24.01、Task 事件 580→804、不同 Task 34→64、Task 候选为 0 的人 72→22.67 |
| Phase 9 长期人生     | 完成（部分）       | 45 年 11,349 事件 / 1,516 Task / 73 种 Task / 7 developments；control 9 developments；Task 仍替代部分 Agency 行动 |
| Phase 9 88 年审计    | 完成               | playtest treatment 31,567 事件 / 3,673 Task，control 29,737；audit 0 未解析 token、0 死亡后事件、0 零事件年；生成内容 share 65.5% |
| Phase 9 性能         | 完成（有限规模）   | 160 人真实内容 105.8→139.8 ms/年；20k 合成 Task 最坏 2,363 ms/年、400 MB；不是 20k 完整内容/DB/API |
| Phase 10 内容池     | 完成（真实模型）   | 24 authored events + 6 authored tasks + 8 generated families（48 nodes）；Phase 10 78 nodes / 233 outcomes；总池 140 Task / 333 Event / 473 可执行定义 |
| Phase 10 重大审计   | 完成（45 年）       | employment 2→11、unemployment 7→18、move 19→37、residence 24→50、death 97→122；education 29→10、birth 80→50 |
| Phase 10 文学审校   | 完成（抽样）       | 首轮 13 样本 5 通过 / 8 失败；定向改写后 11 个 P0 节点全部 ≥36/50（2 个窄过） |
| Phase 10 语义 UI    | 完成               | 稳定 Person/Event/Process ID；人物/事件/进程高亮、Hover 档案、事件/进程 modal；e2e 通过 |
| Phase 10 长周期     | 完成               | 88 年 27,510 事件 / 3,490 Task / 44 repeat offender；0 未解析 token、0 死亡后事件 |
| Phase 10 性能       | 完成（有限规模）   | 160 人真实内容 96.3→149.9 ms/年；20k 合成 140 Task 2,485 ms/年、393 MB；非 20k 完整 DB/API |
| Phase 9 浏览器       | 完成               | 三栏布局未改；`pnpm build` 通过，Playwright v4 1 项通过（9.3s） |
| 候选审计             | 完成               | 按人物年龄/职业/教育/关系/能力统计；50 个定义对具体人物仅 2–7 个有效候选；事件候选 3–34                                                                                      |
| 重复与叙事           | 部分完成           | treatment 159 vs control 325 prefix offenders；LifePassage 从已提交事实组织；仍有长期邻里/医疗重复，不能禁止真实持续照护                                                     |
| 自主行动循环         | 完成（确定性）     | `agency.ts`；人物/组织每年最多一次；历史人物、组织领袖、普通成年人均可行动；儿童不执行成人组织行动                                                                           |
| 组织主动行为         | 完成               | 招募/会议/会费/出版/互助/成立运动；真实 membership/treasury/project/relation/event；正式或非正式领袖                                                                         |
| 自下而上历史         | 完成（自由演化）   | 1912–1950 自由运行；印刷工会 1915 由持续行动生成 `development:initiative-org-printers-union-1915`，Director 未预先批准                                                       |
| 进程生命周期/遗产    | 完成（通用）       | end 为复查而非强制结束；suspended/declining/repression/institutionalizing/split/ended；legacy 改变 baseline、事件权重和内容条件                                              |
| Director actions     | 完成（真实调用）   | 6,143 + 10,263 tokens；6 条 organize/publish/relief/recruit/reform 提案，5 条执行、1 条 reform 无进程被跳过；pending queue + event 幂等                                      |
| canonical 时序       | 完成（新提交）     | 死亡日期锚定最后已提交人物事件；死亡事件日期同步；死亡后行动 0；原因不晚于后果；旧档保留                                                                                     |
| Legacy 生活内容      | 完成（真实生成）   | reform 9,674 tokens、war aftermath 9,125 tokens；各 4/12/24；跨代实验 53 条 vs 对照 0 条；战后 23 条                                                                         |
| 战后生活内容         | 完成（16 场景）    | 1946–1999 战后场景与 24 条时代记录；独立内容测试通过                                                                                                                         |
| 出生无模型回退       | 完成               | 五种白名单能力关键词回退；`deterministic-fallback` 设置 compiledAt，不伪造异能                                                                                               |
| Birth Contract 写入  | 完成               | `birth-contract-store.ts` 事务锁 + revision；`compiledAt` 防止重复应用；worker 已切到完整 contract                                                                           |
| 生产部署             | 未完成             | 仅本地 `pnpm dev`；Compose 未在 v4 实测                                                                                                                                      |

## 实际执行的命令与结果

### 类型检查

```text
pnpm typecheck
→ tsc --noEmit，退出码 0
```

### v4 测试

Phase 10 最终 v4 专项：

```text
pnpm exec vitest run tests/v4-*.test.ts
→ Test Files 29 passed | 2 skipped (31)
→ Tests 177 passed | 8 skipped (185)
→ 18.66s
```

Phase 10 最终全量仓库测试（包含冻结的 v1–v3 测试与 v4）：

```text
pnpm test
→ Test Files 78 passed | 7 skipped (85)
→ Tests 457 passed | 36 skipped (493)
→ 158.00s
```

旧测试通过不等于 v4 完成；v4 的独立证据是专项、长期试玩、浏览器与真实模型调用。

### 浏览器验收

```text
pnpm test:e2e --config playwright.v4.config.ts
→ Running 1 test using 1 worker
→ ✓ register, give birth, read a concrete log and inspect the map (9.5s)
→ 1 passed (13.3s total)
```

`pnpm build` 同时通过（Vite production bundle，2.92s）。

该流程使用独立 `living_world_e2e` 数据库，实际：

1. 注册随机用户名；
2. 填写出生表单并提交；
3. 在出生等待期间点击“先浏览世界”；
4. 等待异步出生完成并自动选中自己的孩子；
5. 检查出生日志、用户名、Anna Bauer 切换、地图 pin 与地点人物面板；
6. 断言无 console/page error。

### 真实模型调用

调用 `compileBirthWish`，模型 `deepseek-v4.1-flash`，返回严格 JSON：

```json
{
  "interpretation": "在这个排字工家庭里，识字不是装饰，而是从铅字与油墨之间挣出一条不那么伤手伤肺的路。……",
  "focus": "education",
  "traitDeltas": {
    "ambition": 0.03,
    "tradition": -0.02,
    "openness": 0.06,
    "conscientiousness": 0.04
  },
  "taboo": "她可能不愿被反复提醒‘为什么留下’……"
}
```

- 单次 usage：548 tokens。
- 验收期间共 4 次真实愿望调用（3 次归档世界回填 + 1 次活动世界出生），约 2,174 tokens；不是 mock。
- worker 端到端在活动世界把读法写入人物 `lifeContract` 并递增 revision，API/UI 能读到。
- 这**不是**完整出生契约：没有条件式潜质、私有系统、异能边界或长期策略编译。

## 实际生成的历史样本

活动世界或测试脚本实际产生的例子（未经润色）：

- 1912：`Klara在Bauer-Wohnung, Leopoldstadt出生。Katharina Bauer在生产后抱着孩子；这间住处现在住了5口人。`
- 1913：`奶水不够，Katharina Bauer把黑面包掰碎泡在热水里，加一点糖喂给Klara。孩子夜里哭得更久，肚子鼓胀。`
- 1914：`Klara烧了两夜。Katharina Bauer用湿布擦额头，天亮时体温退下去，孩子开始要水喝。`
- 1918：`Anna 把 Elisabeth 抱到厨房，整夜给她擦身、喂水；她自己只喝盐水。Elisabeth 退烧了，Anna 咳了三个星期……`
- 1914 作者链：`Winter 不愿再保留受伤的 Josef，把岗位给了 Otto 的妻弟；Josef 同一天收到征召令，去兵营报到。`
- 通用成人链：`Klara在换纸时左手被压板夹住。工友关掉机器，Buchdruckerei Winter & Söhne的工头拿来急救箱……`
- 1938：`Klara在登记桌旁说了句“这里以前不是这样”。Gustav Berg记下地址，当晚两个穿制服的人来敲门……`
- 1934：`Elisabeth Bauer和Franz Lechner在利奥波德城的教区教堂举行婚礼。Franz Lechner把一只箱子搬进Bauer-Wohnung……`
- 1935：`Elisabeth Bauer在Bauer-Wohnung, Leopoldstadt生下一个男婴，取名Hermann Lechner。`
- 1950：`Helene Weiss在Bauer-Wohnung, Leopoldstadt生下一个女婴，取名Anna Winter。`
- 死亡：`Klara因身体衰竭去世，死亡原因没有更完整的医疗记录。`

这些文本只来自已提交的 scene outcome 或系统死亡事实，不是日志模板拼接。通用场景的姓名/地点由 `{subject}`、`{mother}` 等 token 在当时解析。

## 经济实测

用 seed + 通用场景连续推进 30 年（经济开启、`maxScenesPerPerson=1`）：

```text
1913 alive 23 events 7 shortage 0
1914 alive 23 events 4 shortage 0
1915 alive 23 events 3 shortage 12
1916 alive 19 events 6 shortage 9
1917 alive 19 events 3 shortage 0
1920 alive 19 events 4 shortage 0
1930 alive 19 events 7 shortage 0
1938 alive 19 events 16 shortage 0
```

- 组织月度外部营收与家庭月度外部收入是显式建模输入；诊断 `revenue`/`transfers` 会累计。
- 1915–1916 出现真实食物短缺与死亡；不是所有家庭都繁荣。
- Bauer 家庭在工伤后可能长期靠 Katharina 的缝补/出租床铺收入和债务滚动维持，房东不驱逐；这是缺口。
- 组织没有完整生产/销售/税收链，富余家庭现金会长期累积。

## 运行方式

```sh
pnpm install --frozen-lockfile
pnpm db:local
pnpm dev
```

`pnpm dev` 启动 v4 API（3001）、v4 模拟器、v4 出生 worker、Vite（5173）。首次启动自动迁移并播种 Vienna 1912。`pnpm v4:reset` 归档当前世界并另起新切片。

## 未完成/阻塞

1. **婚配不是玩家选择**：求婚/同居/生育由加权场景自动发生；没有求婚对话、拒绝/接受、离婚、再婚、同性关系路径，也没有完整嫁妆/继承/住房容量规则。
2. **无完整出生契约**：只有愿望读法和 ±0.08 性格微调；没有条件式潜质、能力边界、私有系统、禁忌机制。
3. **无跨玩家互动**：没有请求/答复 UI、Scene 选角跨玩家、Relation 驱动的共同场景。
4. **无内容工厂/导演**：没有 LLM 自动编译新场景入库；内容包是手写 TS。
5. **无万人规模验证**：v4 存储按实体表存 JSONB，没有做 10k 人物/tick 压测或恢复压测。
6. **无生产部署**：本地启动已验证；Compose/公网/密钥注入未验收。
7. **旧代码未删除**：v1–v3 冻结在仓库，`pnpm dev` 不启动；旧测试仍计入 `pnpm test`。
8. **年份粒度**：一次推进一年，场景日期多为 1 月，不是逐月人口账本。
9. **`followupSceneIds` 未调度**：字段存在，引擎没有按它延迟触发后续场景。

## 结论

Vienna 1912 垂直切片现在是一个真实可运行的最小 v4：有持久化、单写者、真实角色/地点/因果、可读个人日志、可推进年份、真实模型愿望读法和三栏观察器。它还不是 `simulator-1031` 的完整成品；主要缺口是婚配选择与完整代际、完整出生契约、跨玩家互动、内容工厂/导演和规模验证。任何把这些缺口说成“已完成”的说法都不符合本报告。
