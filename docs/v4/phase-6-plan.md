# Phase 6 关键路径：Living History

更新：2026-11-02  
目标：让普通人通过真实社会接触进入历史进程；历史人物是稳定 Person；重大历史不是固定剧情；个人行动可以通过有界原语改变进程。

## 核心契约

1. `Person.historicalIdentity` 只是身份/来源/活动范围元数据；历史人物仍共用 Person、Relation、Organization、Action、EventEffect。
2. `WorldDevelopment.historical` 是可参与历史进程的唯一持久状态。进程阶段、参与者、组织、指标、目标、结果和阶段历史都存在 macro JSON；不新建第二套世界状态。
3. 参与和影响只通过提交事件里的类型化 effect 改变进程：
   - `historical_participation`：真实行动产生角色；
   - `historical_influence`：真实资源/组织/信息行动改变指标；
   - `knowledge`：见证/听说/文书产生知识，不等于目击；
   - `historical_process`：底向上从真实组织/行动创建有界进程。
4. 阶段由 Engine 每年根据 support/opposition/resources/legitimacy/escalation/information、组织成员和事件历史计算；LLM 只能提出参数/机会/intent，不能直接宣布阶段、胜负或死亡。
5. 历史人物真实死亡日期只是参考资料；不自动成为模拟死亡。玩家/普通人接触必须经过地点、组织、公开活动、书信或实际事件渠道。
6. 真实历史人物不进入玩家新生儿家庭；历史人家属也不作为普通 birth household 候选。
7. 进程必须按 region/phase/role/person 索引或直接 map 读取；不得每 tick 扫描全部历史人物/事件。

## 初步实现范围

- 维也纳 1912 真实人物：Sigmund Freud、Victor Adler、Karl Kraus、Arthur Schnitzler（必要时加 Freud 家庭，但不以大量人物充数）。
- 已存在的初始历史进程：维也纳社会民主党（真实组织/人物为种子）；心理分析圈作为文化/知识进程。
- Director/engine 创建的进程：war mobilization、public health crisis（1918）、social movement。
- 内容：Freud 接触与后续关系；Adler/SDAP 集会与参与；战争动员多角色；1918 公共卫生多角色；Kraus/Schnitzler 公共文化接触。
- 验收：多角色参与、至少一个人推动进程阶段变化、固定 seed 反事实、真实 LLM 多轮、浏览器可读。

## 非目标

- 不复刻 1900–2000 全部真实历史。
- 不新建大型 HistoricalSimulationEngine。
- 不让 LLM 直接写死亡、胜负或已提交历史。
- 不把同一条世界新闻复制到所有人日志。
- 不做复杂战争策略/政治经济数字孪生。

## 完成情况（2026-11-02）

- 真实人物：Freud、Adler、Kraus、Schnitzler；稳定 Person/QID/来源/活动窗口；4 个 curated household 不进入玩家出生选择。
- 进程：`WorldDevelopment.historical`；社会民主党与心理分析圈两个 1912 进程；战争/疫情由实际进程创建后才触发内容。
- 参与：participation/influence/knowledge effects；战争 18 参与者、疫情 13 参与者；角色来自已提交事件。
- 反事实：同 seed、只增加一次组织者 influence：mobilizing → institutionalizing。
- Director：真实模型两轮 4,506 + 8,158 tokens；正式活动世界 5,289 tokens；不强制 1913 战争。
- Content Author：真实模型 8,744 tokens，4 nodes / 12 outcomes / 24 narrations；生成包在场景中触发 2 次。
- 浏览器：e2e 选中 Freud，读取“历史人物/历史参与”。
- 报告：[phase-6-report.md](phase-6-report.md)。

仍未完成：全球历史人物/事件、多地区长期 Director、完整 war/epidemic 内容工厂预算、20k 历史索引/DB/恢复。该垂直切片不等于完整历史模拟器。
