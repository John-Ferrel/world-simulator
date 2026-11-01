# Reference research — 研究清单与决策准则

该文档是研究入口，不是对当前仓库的已核实结论。必须在本地审阅现有实现后对照比较。

| 项目 | 要读到的实际机制 | 需要决定的问题 | 参考入口 |
|---|---|---|---|
| Crusader Kings III（社区整理的 modding 资料） | `on_action`、事件触发条件、人物作用域、随机事件权重、可执行效果 | 如何把社会事件与世界事实连接，避免对每个角色全表扫描 | https://github.com/jesec/ck3-modding-wiki/blob/master/wiki_pages/Event_modding.md |
| Wildermyth | `Effects`、`Outcomes`、`Aspects`、`History`、动态 role matching | 角色经历怎样长期改变人格和能力，如何为故事选择合适的真实参与者 | https://www.wildermyth.com/wiki/Data_Format_Overview 和 https://www.wildermyth.com/wiki/Comic_Editor_Reference |
| RimWorld | `IncidentDef`、`IncidentWorker`、Storyteller 事件调度 | 世界级导演如何产生有条件的机会，而非直接改结果 | https://github.com/Dev-Jahn/rimworld-modding-reference/blob/main/05-events-incidents/incident-system.md（社区整理资料，需交叉验证） |
| Fallen London / Quality-Based Narrative | Storylet 的 Qualities、条件开放、后果与持续内容 | 如何扩增事件而不写一条固定分支主线 | https://www.failbettergames.com/ （查官方设计文章及开发者资料） |
| Dwarf Fortress | Histfig、Legends、抽象人口与具名人物 | 跨代人口规模与持久身份一致性 | https://dwarffortresswiki.org/index.php/Historical_figure |
| 人生重开模拟器 | 可公开访问的天赋、事件与角色发展源码 | 如何编译条件式人生程序、避免预定剧情 | https://github.com/VickScarlet/lifeRestart |
| ink | 分支、变量与叙事脚本集成 | 是否适合用于只读叙事；不默认作为世界权威规则执行器 | https://github.com/inkle/ink |

## 每个项目必须输出的研究卡片

- 机制问题：该项目要解决什么？哪些规则有强耦合关系？
- 证据：**具体脚本文件、类型、调用链或官方开发者文档**；不可仅仅引用营销文字或 AI 总结。
- 代价：规模/运行时成本、可组合性、数据一致性、开发/修改难度。
- 结论：`adopt / adapt / reject` 及理由；当前仓库哪些可保留，哪些需迁移。
- 版权：借鉴思想和复用代码必须区分；许可证与许可证冲突、不可公开脚本来源均需记录。

重点研究 CK3 的 `on_action` 中有避免大规模嵌套循环的性能提醒；Wildermyth 的 `History` 能永久挂载 Aspects、改变角色未来；这两个模式特别有助于我们的长期人生模拟和动态事件注册。
