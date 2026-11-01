# Reference Decision Record — v3架构取舍

2026-10-31，开始产品改造前完成。已核查实际源码、数据库及三个工程文件；详细一手/可得源码、固定commit、失败访问与许可见 [人生研究](reference-life.md)、[导演研究](reference-director.md)。这些来源是设计依据，不是本游戏性能证据。

| 决定                             | 证据与取舍                                                                       | 本仓库后果                                                   |
| -------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| adapt CK3订阅/作用域             | 实读固定镜像on_action脚本；拒绝嵌套全角色遍历和无限递归                          | 同地候选索引+触发订阅+gas/冷却；到期复验                     |
| adapt Wildermyth角色与历史aspect | 官方role score/threshold、History附加Aspects；历史文字本身不可查询               | 结构化LifeProgram与能力状态，occurrence证据，真实角色硬条件  |
| adapt RimWorld incident分层      | 公开mod CanFireNow→FiringIncident→TryExecuteWorker调用链；入口AI生成资料只作线索 | 强导演提出条件与外生输入，世界引擎裁决，不直接指定死者/胜利  |
| adapt Fallen London storylets    | 官方开发文章的quality资格/后果/后续开放                                          | 自动定义版本、动态条件匹配和持续过程；拒绝无类型任意数值权威 |
| adapt DF人口/历史身份            | Bay12官方访谈具名与抽象人口共存                                                  | cohort→Person具名化守恒；保持家庭与真实历史人物ID，不复活    |
| adapt lifeRestart条件人生        | 实读TS event/talent/game/condition，MIT                                          | 条件候选与触发次数；拒绝单人年龄事件脚本和无上限branch       |
| reject ink作世界权威             | 实读Story/StoryState与lookaheadSafe官方说明，MIT                                 | 不加第二VM；预演隔离真实副作用，版本/随机/实例单独保存       |

不复制商业脚本、事件文本、源码或艺术。CK3镜像CC BY-SA3.0；VEF mod CC BY-NC-ND4.0不能直接复制改编；lifeRestart/ink若未来复用须保留MIT版权。未核实资料明确标记，不把闭源游戏实现猜测写成事实。

最终判断：保留单写者与现有社会经济/战争结算；增加一个定义调度/校验层与明确适配器。定义与实例分开，发布自动、导演有强条件创设权、异常有真实效果；三者共同遵守成本、范围、因果、冷却和不可改写过去。嵌入可选World.runtime避免增加独立权威表和改变已应用001迁移。数据兼容/回退见architecture-delta.md。

## 2026-10-31 主代理来源复核

以下来源在方向确认前重新实际读取，不以“入口存在”代替内容核验：

- CK3：`jesec/ck3-modding-wiki` 固定提交 `db66965014483aa1a0e0905e5a922be9ee3b9a2f` 的 `wiki_pages/Event_modding.md` 可读，含 `on_action`、`trigger`、`scope`、`cooldown`、`random_events` 等实际脚本；镜像 LICENSE 为 CC BY-SA 3.0，游戏内容仍为 Paradox 专有。仅借鉴作用域/订阅/触发语义，不复制脚本。
- Wildermyth：官方 wiki `History` 明确“History lines cannot be queried, but can apply aspects, which can be queried”；`Comic Editor Reference` 的 Story Roles 有 `scoreFunction/scoreThreshold` 与 required/optional/forbidden 目标。结论是结构化 aspect 才能驱动资格，叙事文本不能当状态；不复制 wiki 文本或游戏资产。
- RimWorld：VEF 固定提交 `70a6cf3a6903d52e1ab287df1c934faa253c354a` 的 `StorytellerComp_IncidentSpawner.cs` 可读，调用 `IncidentCycleUtility.IncidentCountThisInterval`，再 `GenerateParms`、`Worker.CanFireNow` 产出 `FiringIncident`。结论是调度、合法性、执行分层；VEF 为 CC BY-NC-ND 4.0，不复制/改编其代码。
- lifeRestart：固定提交 `f04888e202e5dfca0df48c51b8a099dc03cf08b4` 的 `packages/core/src/game.ts` 可读，`next` 执行增龄→天赋触发→年龄事件池过滤→权重选择→事件 trigger→结束判定；MIT。仅借鉴条件事件/触发次数/定义与实例分离，不采用单人生回合或无界递归。
- Fallen London：Failbetter 2010/2012 官方设计文章可读，确认 quality 资格、后果、调查进度和一次性完成标记的 storylet 结构；无源码许可，不复制文本/剧情/数据库。
- DF：Bay12 官方 DF Talk 转录可读，确认具名历史人物与抽象 entity population 共存、在任者死亡后从实际社会补位；闭源，不复制实现。wiki 入口曾 429，未把未读正文当证据。
- BitLife：闭源商业产品，没有可核验的公开运行时源码；只作为“世代/特质/选择”产品形态参考，**不作为机制正确性证据**。开源的条件人生参考仍以 lifeRestart 为主。

**复核结论**：现有 Reference Decision Record 的技术取舍成立；需要补充的不是更多二手摘要，而是把上述语义落成有界 AST、索引、预算和 occurrence，并用真实世界状态测试。`docs/v3/direction-confirmation.md` 记录本轮审计事实与关键路径。
