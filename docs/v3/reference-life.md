# Reference Decision Record：人物、人生规则与叙事执行

研究日期：2026-10-31。范围为 Wildermyth、lifeRestart、ink，以及本仓库实际 planning/identity 代码。此文是设计依据与源码审阅，不是 v3 功能完成证明；本轮没有复制参考项目代码、事件文本或美术。网络获取失败也在下文保留，不以推测填补。

## R-L1 — Wildermyth：角色匹配和可持续人物变化（adapt）

**证据及调用语义。** [Data Format Overview](https://www.wildermyth.com/wiki/Data_Format_Overview) 区分 Effect 的触发/目标匹配与 Outcome 的实际结算，Aspect 同时承载属性及能力。该开发者维护的游戏官方域名 wiki 是机制文档，不是公开游戏引擎源码；未声称看过内部实现。

[Comic Editor Reference 的 Story Roles](https://www.wildermyth.com/wiki/Comic_Editor_Reference#Story_Roles) 给出了实际字段：`scoreFunction`、`scoreThreshold`；required/optional/forbidden targets；`Not Already Matched As`。角色名只是绑定标签，不能把角色名 `doctor` 当作职业校验。目标按序匹配，缺少必需目标则事件不发生。

[History](https://www.wildermyth.com/wiki/History) 明确 History Line 可以增删 Aspects、数值和 Hooks，但 History 文本本身不可查询。永久历史必须留下可查询状态，不能靠扫描故事文字判断资格。[Outcomes](https://www.wildermyth.com/wiki/Outcomes) 列出 `AddHistory`、`DoAll`、`DoFirstValid`、`Test`、`Trigger`、`Branch`；`Trigger` 匹配目标事件，`Branch` 携带当前角色绑定进入后续事件。[Effects](https://www.wildermyth.com/wiki/Effects) 包含触发 type、目标、执行 sort、AI priority 及 declared encounter results，显示定义需要明确输出契约。

**本项目取舍。** adopt 角色绑定与真实状态分离；adapt 为 `RoleSelector` 的硬条件、偏好分数、互异约束和本地候选池。重要角色先匹配，但排序和种子必须记录，避免隐式不稳定。人物重大经历应提交 occurrence，再更新有证据的 Aspect/能力/目标；未来规则读结构化状态并引用原始事件。Life Program 的出生愿望只能设置候选倾向和条件，不能预写恋人/盟友的忠诚。

**成本与边界。** 多角色全局组合最坏随候选数的角色次方增长；本项目应先按触发、地点、组织索引，限制候选/角色/匹配尝试。此复杂度是本项目推导，不是已测 Wildermyth 性能。事件链需统一 gas、深度、实例预算；不直接复制文档列出的全部 Outcome。reject 以漫画剧情或玩家对话选择作为共享世界权威；NPC 仍须自主选择，资源由现有引擎结算。

**许可。** 官方游戏并未在这些页面提供游戏源代码开源许可。wiki版权页及独立 Aspects 页本次读取失败，未核实其具体再分发条款；只引用机制、链接与字段，不复制完整文本、脚本或资产。商业游戏的 mod 能力不等于其内容获开源授权。

## R-L2 — lifeRestart：条件式人生事件与天赋（adapt，拒绝照搬世界模型）

**真实版本。** 指定入口的旧 `master/src/modules/life.js` 返回404。通过 GitHub 仓库元数据及树核实当前默认分支 `main`，本次固定 commit **`f04888e202e5dfca0df48c51b8a099dc03cf08b4`**。源码取到本地 `.data/v3-reference-life/`，而非仅阅读README。

**调用链。** [`packages/core/src/game.ts`](https://github.com/VickScarlet/lifeRestart/blob/f04888e202e5dfca0df48c51b8a099dc03cf08b4/packages/core/src/game.ts)：`next` 增龄 → 天赋 `trigger` → 取年龄事件池 → 事件 `check` 过滤 → 带 RNG 的权重选择 → 事件 `trigger` → 成就检查 → `life<1` 判终。它是单人回合推进，不是共享世界编排。

[`packages/core/src/event.ts`](https://github.com/VickScarlet/lifeRestart/blob/f04888e202e5dfca0df48c51b8a099dc03cf08b4/packages/core/src/event.ts)：`include/exclude/NoRandom` 控制可随机资格；`trigger` 记录事件ID并应用效果，按更新后的状态检查首个可用 branch，递归执行。这是条件重算而非完整预写人生；该函数内没有显式链深度上限，不能直接用于不可信在线生成规则。

[`packages/core/src/talent.ts`](https://github.com/VickScarlet/lifeRestart/blob/f04888e202e5dfca0df48c51b8a099dc03cf08b4/packages/core/src/talent.ts)：天赋有条件、触发计数、max、排斥与替换链；可分离先天定义与运行中次数。[`packages/condition/index.ts`](https://github.com/VickScarlet/lifeRestart/blob/f04888e202e5dfca0df48c51b8a099dc03cf08b4/packages/condition/index.ts)：字符串经括号/逻辑符解析成树，再进行数值、集合/数组包含比较；不是 eval。解析树和运行期属性容器仍较宽松，不能作为本项目权限与气量预算的替代。

**本项目取舍。** adopt 定义与人物激活实例/触发次数分离；adapt 按生命阶段索引候选及条件分支为 Life Program。不同家庭/时代使用出生世界切片构造不同条件，实际经历到来才解锁机会；保留旧版本和偏离理由。reject 每岁强选一个故事、孤立属性加钱、单人 `LIF` 直接终止、全局年龄事件池代替政治经济因果。预演只是一组隐含可能性，不对 canonical 世界调用 `next` 或预扣未来资源。

**成本。** 原项目每岁扫描该年龄候选、已选天赋；在线世界不能把全体人物×全库每月扫描。编译时提取年龄窗口/事件订阅，稀疏唤醒；循环/递归转显式有界队列。异能的触发上限还必须叠加资源、作用域、冷却、世界稀有性和可反制条件，不能只借一个 `max`。

**许可。** 当前固定版本 [LICENSE](https://github.com/VickScarlet/lifeRestart/blob/f04888e202e5dfca0df48c51b8a099dc03cf08b4/LICENSE) 为 MIT；如未来复用代码须保留版权及许可。此研究未导入源码或事件数据，未推定第三方资产也自动获MIT。

## R-L3 — ink：编译与状态格式分离，但不作为世界规则权威（reject as authority；adapt versioning）

固定源码树 commit **`35c63e52f1d36060930dc7ed3cfba38ea224b528`**。[`Story.cs`](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/Story.cs) 读取编译 JSON，检查 `inkVersion`，构造容器并初始化状态；公开 `Continue/currentChoices/ChooseChoiceIndex`。[`StoryState.cs`](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/StoryState.cs) 将变量、调用栈、visit counts、turn indices、种子/随机状态序列化；`inkSaveVersion` 独立于编译内容格式，并有旧格式加载路径。

[官方运行文档](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md) 解释外部函数可发生状态副作用，叙事引擎会前瞻求值，需区分 `lookaheadSafe`。这正是不能把文字预演直接连接 canonical 扣款/伤害的原因。文档建议 wrapper，而不是继承扩大公开API。

**取舍。** 不新增 ink 依赖，不让动态规则成为任意 ink/外部函数脚本。若将来用于只读死亡总结或回顾分支，应只接 immutable committed occurrence，禁止权威副作用。当前 adopt 独立 `schemaVersion/compilerVersion/definitionVersion` 与 runtime instance state，保存随机状态/外部输出；版本升级保持旧实例引用旧定义。不能只保存新JSON然后假定旧栈还能恢复。

**成本/许可。** 每人物一套故事VM会增加栈、访问计数、解释执行和双重状态恢复负担；对当前TS模拟器收益不足。此为工程判断，未测ink万人吞吐。[MIT LICENSE](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/LICENSE.txt) 已查验；不拷贝代码，无新运行依赖。

## 本仓库实际核查与适配边界

| 实际位置                                                                  | 所读行为                                                                                                                                      | 复用结论与 v3 缺口                                                                                                                      |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/planning/schema.ts`                                             | Zod strict；14种短期动作，1–12步，每步1–24月；actor/job/version/deadline/evidence提案                                                         | reuse 旧动作定义；wrap 成统一 effect/action adapter。不是条件式 Life Program、角色选择器或版本化事件库。                                |
| `packages/planning/compiler.ts`                                           | 正则字面别名映射既有动作，然后 schema parse                                                                                                   | reuse 为旧模型输出兼容；不能称为通用语义/规则编译器。v3需带类型、权限、预算、引用及可终止性检查的新编译层。                             |
| `packages/planning/index.ts:adoptAgenda`                                  | 校验存活、在途、拘留、人物版本、deadline、job幂等；证据必须是人物memory；care/socialize目标需观察范围，迁移相邻校验；新Agenda记事件并递增版本 | reuse 验证和实际执行成本；Birth/Director的权限不可冒充普通人物观察范围，需显式 authority capability，并在一个世界提交器内执行。         |
| `packages/planning/index.ts:advanceAgency`                                | 每月构建人物/地点本地索引，执行agenda及项目、失败/重规划；后备短期意图不覆盖已有长程意图                                                      | wrap 生命周期唤醒，不新增第二套扣资源逻辑。现有顺序计划不能代表几十年条件机会。                                                         |
| `packages/planning/baseline.ts`                                           | 本地候选、地点、组织、项目、风险/路网索引；未成年统一返回practice；成年根据状态选择有界短期计划                                               | reuse 共享索引和无模型后备；extend 婴儿照护/依恋、不同成长阶段与Life Program机会选择，不能把新生儿当自立行动者。                        |
| `packages/identity/index.ts:advanceIdentity`                              | 新事件按人物汇总，选至多8条显著经历；计算实际after-before变动，保存证据；重大变化发replan，传播依赖接触与来源                                 | reuse 经验归因与防止饱和值假日志；extend 让统一occurrence提供结构化experience adapter。不能扫描生成文本直接改人格或把wish当已发生经历。 |
| `tests/planning.test.ts`、`planning-baseline.test.ts`、`identity.test.ts` | 所读用例覆盖过期/版本/证据/重复job、目标范围、未知动作拒绝、owner对等、经验归因/传播                                                          | 保留作为迁移守护；本次仅阅源码，未独立重跑，不冒称这些测试证明v3已实现。                                                                |

## 给统一运行时的具体约束

1. 角色选择 = 有界索引池 + 类型/年龄/位置/关系硬条件 + 排序偏好 + distinctness；无必需角色则不发生，不生成假的医生补位。
2. 持久人生变化 = 已提交事件 + 可查询结构化trait/能力/目标 + 原因链接；每项变化保留定义版本。永久文本不构成效果。
3. 预演与执行严格分开：dry-run、Birth可能人生和作者预览不得调用现有 mutation adapter；正式提交时重新检查当前资源/对象/期限。
4. 生命周期/能力/动态事件共同使用运行时预算、冷却、版本实例与显式失败；不允许递归文本跳转无限占用时钟。
5. 统一层优先调用既有行动、家庭、旅程、经济/政治结算器，不复制一套“简化世界”。只有未覆盖效果需要新增可执行模块并提供因果与恢复证据。
