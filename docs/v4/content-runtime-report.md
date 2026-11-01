# v4 事件运行时与内容工厂报告

日期：2026-11-01  
基线：`fa59e83`（v4 审计前快照）  
本轮目标：把年度单场景选择器改成多事件运行时；接入真实 LLM 内容工厂；加入独立叙事、人物请求/回应、离婚/同性关系/住房/继承的第一版机制。

## 实际完成

### 1. 新事件运行时

`packages/v4/engine.ts` 新增：

- `eventRuntime: true` 路径，不再依赖每年一个场景。
- 事件级 `rate`、`weight`、`familyId`、`triggerMode`。
- 每个普通人物每年可触发多个统计事件，软上限默认 4；玩家人物上限 6。
- 事件按 stage 建索引，不再对每个人扫描全部场景。
- 事实/后续事件队列：`ScheduledEvent`，保存在 `WorldState.historyMeta.scheduledEvents`。
- `followupSceneIds` 真正进入队列并在后续年份执行（不是只存在 JSON 里）。
- 队列事件在主角不适用时，会尝试事件参与者/同住家庭成员作为替代主体。
- 人物请求/回应：
  - `Interaction` 到期后由对方独立判定接受/拒绝。
  - 接受/拒绝有独立 effects、文本、事实事件和 cause。
- 新增/接线的类型化效果：
  - `mood`、`reputation`、`skill`、`flag`
  - `relation_end`
  - `residence`
  - `estate`
  - `householdSize`、`overcrowded` 条件
  - `notHasRole` 条件
- 人物 `life` 初始化：mood、reputation、skills、flags。
- 死亡时，若家庭已无在世成员，现金可转移到在世继承人家庭。
- 住房超过 `Place.capacity` 时，月度结算会记录 overcrowding 并降低居住者健康。

### 2. LLM 内容工厂

新增：

- `packages/v4/generated.ts`
  - GeneratedPack / GeneratedNode / GeneratedOutcome schema
  - schema、角色、条件、效果、文本 token、资源引用、重复/近似重复文本验证
  - 编译器：把生成包编译成有界 `SceneDefinition`
  - 事件族总发生率不随叶子节点数量增长：节点 rate 会按 family baseRate 归一化
- `scripts/generate-v4-events.ts`
  - 真实模型生成事件族
  - 严格 JSON、自动验证、失败不落库
- `packages/v4/content/generated/`
  - 14 个事件族
  - 56 个具体场景
  - 230 条叙事变体

事件族：

- 印刷厂普通一天
- 合租楼邻里
- 国民学校
- 市场与家庭锅灶
- 排字房学徒
- 家庭疾病与照护
- 教区/葬礼/互助
- 街头童年
- 老年照护
- 婴儿期
- 幼儿期
- 童年朋友
- 青春期
- 成年社交

实际成功返回并记录的 9 次模型调用共 **49,935 tokens**；另有 5 个包首次输出未通过验证，经过修复/重试后才落库，失败调用 token 未完整记录。模型为 `deepseek-v4.1-flash`。

### 3. 叙事系统

- `NarrationVariant` 与 `SceneOutcome.narrationKey`。
- 生成场景带 230 条条件化叙事变体。
- 运行时按 subject、关系、条件、seed 选择变体。
- 未解析的 `{token}` 变体会被跳过，不会把后台占位符写进日志。
- 日志 UI 已改为**最新在上、向下读旧记录**；浏览器实测顺序正确。

### 4. 家庭与社会机制内容

新增/接线：

- `vienna-family-courtship`：提出共同生活，进入 PendingInteraction，由对方回应后才改变关系/家庭。
- `vienna-family-divorce`：关系结束；共同居住或搬去合租房。
- `vienna-family-same-sex-female` / `male`：私密共同生活、社会暴露、警察记录/离开城市等时代风险。
- `vienna-life-overcrowded-flat`：拥挤住房 → 搬去合租房/招房客/申请市营住宅。
- `vienna-family-childbirth`：活产创建真实 Person 和 birth fact；死产不创建人物。
- `estate`：无在世成员的家庭死亡时，现金转给继承人家庭。

### 5. 模拟器与性能

- 模拟器在无 pending birth 且未到 tick 时不再每 500ms 全量加载世界。
- 只有到期 tick 或存在 pending birth 才加载世界。
- 事件提交不再在每个事件后做全量 `assertWorldV4`；改为推进结束时统一检查。
- 场景选择按 stage 建索引。

实际 benchmark（合成事件，economy off，内存态）：

```text
1,000 人 / 5 年：272 ms，54 ms/年，18,403 人/秒
5,000 人 / 3 年：3,220 ms，1,073 ms/年，4,659 人/秒
20,000 人 / 1 年：19,250 ms，19,250 ms/年，1,039 人/秒
```

这些只是**合成事件引擎**，不含 PostgreSQL 全量加载/保存、真实内容索引、API 和 LLM。不能当作 20k 完整游戏性能。

## 实际长跑审计

`pnpm v4:audit 80`（seed + 玩家出生 + 全部 101 个运行时场景，economy on，eventRuntime，max ordinary 4）：

```text
80 年，1992 年结束
27 人，存活 18
519 条事件，6.49 条/年
玩家 focal 事件 130 条，覆盖 54 个年份
零事件年份 16
生成内容事件 283 条，占 54.5%
叙事变体 230 条
最高频场景约 9.6%
因果事件 1 条
人物请求回应 1 条
```

这比旧版 **416/514 全是 old-age** 有明显改善：

- old-age 从 80.9% 降到约 8%；
- 玩家人物一生有 100+ 条具体事件；
- 生成内容提供了半数以上事件；
- 多次事件/年已经真实发生。

但仍然不够：

- `causalEvents` 仍低，说明作者内容里的 followup 大量因主体/角色不匹配而未执行；
- 玩家有约 26 个年份完全没有事件；
- `market-credit`、`lost_room_key` 这类生成事件仍会重复同一 outcome 文本；
- 出生、离婚、同性关系、继承在真实长跑中出现次数仍少。

## 测试与构建

```text
pnpm typecheck
→ 通过

pnpm test
→ 57 files passed | 5 skipped
→ 333 tests passed | 28 skipped
→ 147.23s

pnpm build
→ 通过（2.99s）

pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed（6.8s）
```

v4 专项测试：

- engine：24 项
- Vienna 作者内容：10 项
- 1912 slice：2 项
- 通用人生：5 项
- 家庭：3 项
- 玩家一生：3 项
- wish：3 项
- generated content：3 项

## 当前限制（必须保留）

1. **内容规模仍是首批**：56 个生成场景、14 族，不是“数万内容”；需要继续批量生成和验证。
2. **因果链内容不足**：引擎的 followup/queue/response 测试通过，但作者内容中的 `followupSceneIds` 很多指向不适用主体；需要给 followup 显式角色/目标条件。
3. **没有运行时 Content Author**：当前内容工厂是离线脚本；运行期自动补缺尚未接入。
4. **Birth Compiler 仍浅**：新增 privateGoal、skillDeltas、capability 和技能初始化，但没有条件式能力/代价/深层人生预演。
5. **继承是家庭灭绝时的现金转移**，不是完整遗嘱/债务/资产/多继承人分配。
6. **同性关系/离婚只有第一版内容**，没有玩家选择、法律程序、再婚链和完整社会反应。
7. **年度推进、日期多为 1 月**，不是逐月/逐日事务队列。
8. **存储仍是全量 load/save**；20k 合成 benchmark 不代表完整持久化吞吐。
9. **API 仍加载整世界**，没有分页读模型。
10. **旧 v1–v3 代码仍冻结在仓库**；未删除。

## 下一步

1. 给 followup 增加显式目标角色/条件，修内容因果链；把 `causalEvents` 从 1 提到可观测的数十条。
2. 继续用内容工厂批量生成 10–20 个新事件族，优先补齐 12–18 岁、成年恋爱、离婚/再婚、住房、疾病、教区、市场。
3. 把生成内容验证加入 CI：schema、token、资源、可达性、重复文本、角色匹配率。
4. 接入运行时 Content Author：发现覆盖缺口 → 生成事件族 → 编译验证 → 发布。
5. 扩展 Birth Compiler：条件式能力/代价/私人目标，并接入真实事件资格。
6. 存储/API 分区、增量保存、分页；再做 20k 完整持久化压测。
