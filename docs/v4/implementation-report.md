# v4 实现与验收报告

日期：2026-11-01
范围：`simulator-1031` 断代重写的 Vienna 1912 垂直切片及其通用人生延伸。
重要：本报告只记录 v4 实际运行过的证据。旧 v1–v3 的 318 项测试、长跑和备份恢复数字属于旧架构，不能替代 v4 验收。

> 2026-11-01 后续更新：已实现多事件年度运行时、事件队列、人物请求/回应、住房/离婚/同性关系/继承第一版、LLM 内容工厂与 56 个生成场景；最新数字见 [content-runtime-report.md](content-runtime-report.md)。本页下方部分旧数字（42 场景、45 项测试）保留为上一阶段快照。

## 状态总表

| 项目                 | 状态             | 证据 / 边界                                                                                                                                                                  |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v4 领域契约          | 完成             | `packages/v4/domain.ts`；Person/Household/Place/Organization/Position/Project/Interaction/Relation/Knowledge/EventFact/SceneDefinition/SceneInstance；`assertWorldV4` 不变量 |
| 多事件年度运行时     | 完成（第一版）   | rate/weight、每年多事件、followup 队列、请求/回应、24 项 engine 测试                                                                                                         |
| Vienna 作者场景包    | 完成             | 19 个场景、10 家庭、26 人、23 地点、6 组织、20 来源；10 项测试通过                                                                                                           |
| 通用人生场景包       | 完成（切片级）   | 19 个场景；5 项内容测试 + 3 项玩家人生集成测试通过                                                                                                                           |
| 家庭/生育场景包      | 完成（自动场景） | 8 个场景；3 项测试通过；新生儿是真实 Person，含父母/监护人/家庭/出生事件                                                                                                     |
| 1912–1918 作者人生链 | 完成             | 2 项 slice 测试通过；Anna/Josef 工伤、房租、学校、动员、流感                                                                                                                 |
| v4 PostgreSQL 存储   | 完成             | `v4_*` 实体/事件表、出生请求、出生契约队列；`saveV4World` revision 检查                                                                                                      |
| v4 API/认证/SSE      | 完成             | Fastify、scrypt 密码、cookie session、公开事件过滤、人物日志权限                                                                                                             |
| v4 模拟器            | 完成             | 出生落地、愿望入队、年度推进、经济、2000 年明确终点                                                                                                                          |
| v4 出生愿望 LLM      | 完成（有界读法） | 真实 `deepseek-v4.1-flash` 调用成功；严格 JSON 校验；异步重试 3 次                                                                                                           |
| 三栏观察器           | 完成             | 人物/家庭、个人日志、维也纳地图、时代/公开事件、出生页、等待页                                                                                                               |
| 年份推进与恢复       | 完成（小规模）   | 开发世界实际 1912→1913→… 连续推进；刷新从 PostgreSQL 读取                                                                                                                    |
| 完整人生经济         | 部分             | 工资/租金/食物/债务 + 显式月度外部营收/收入；无市场、税收、驱逐                                                                                                              |
| 婚姻/生育/代际       | 部分完成         | 玩家出生人物可自动求婚/同居/生育，后代继续走通用场景；无玩家选择、离婚、再婚、同性路径、完整继承                                                                             |
| 玩家间持久互动       | 未完成           | Relation/Interaction 可存储，但没有跨玩家场景或请求-答复 UI                                                                                                                  |
| LLM 场景/选择决策    | 未完成           | 引擎保留同步 policy 接口；默认确定性权重                                                                                                                                     |
| History Director     | 未完成           | 只有内容包中的公开时代记录和 pressures                                                                                                                                       |
| 内容工厂             | 未完成           | 无自动内容编译入库                                                                                                                                                           |
| 10k/万人规模         | 未完成           | 未跑 v4 负载；不能引用旧 v3 的 12k 数字                                                                                                                                      |
| 生产部署             | 未完成           | 仅本地 `pnpm dev`；Compose 未在 v4 实测                                                                                                                                      |

## 实际执行的命令与结果

### 类型检查

```text
pnpm typecheck
→ tsc --noEmit，退出码 0
```

### v4 测试

```text
pnpm exec vitest run tests/v4-engine.test.ts tests/v4-vienna-content.test.ts \
  tests/v4-vienna-slice.test.ts tests/v4-vienna-life.test.ts \
  tests/v4-player-life.test.ts tests/v4-wish.test.ts

→ Test Files 7 passed (7)
→ Tests 45 passed (45)
```

最终全量仓库测试（包含冻结的 v1–v3 测试与 v4）：

```text
pnpm test
→ Test Files 56 passed | 5 skipped (61)
→ Tests 333 passed | 28 skipped (361)
→ 153.06s
```

旧测试通过不等于 v4 完成；v4 的独立证据是上面的 45 项与浏览器流程。

### 浏览器验收

```text
pnpm test:e2e --config playwright.v4.config.ts
→ Running 1 test using 1 worker
→ ✓ register, give birth, read a concrete log and inspect the map (3.4s)
→ 1 passed (7.0s total)
```

`pnpm build` 同时通过（Vite production bundle，2.93s）。

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
