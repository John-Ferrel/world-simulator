# Phase 17 — The Living Content Library 实施报告

日期：2026-11-06  
基线：Phase 16 `703500f`（52 states / 1,652 kernels / 6 generated packs）  
设计：`docs/v4/phase-17-content-architecture.md`  
研究：`docs/v4/phase-17-research.md`  
覆盖：`docs/v4/phase-17-content-coverage.md`  
独立批评：`docs/v4/phase-17-critique.md`

## 1. 结论摘要

Phase 17 把内容库从 **52 states / 1,652 kernels / 6 generated packs** 扩展到 **79 states / 1,740 kernels / 15 generated packs**，新增 24 个 State 与约 88 个可执行 kernel。内容不再是几个机制示例，而是覆盖童年、照护、空巢、欲望、犯罪、迁徙、信仰、艺术、荒诞运气、工厂与手艺的多个主题包。

同时，Phase 17 建立了：

- 可重建的 **Content Catalog**（states、kernels、packs、consumer packs、stage/domain gaps、unconsumed states、pack metadata）；
- 8 个并行 Content Author Pack + 1 个真实 Content Factory pack；
- 真实模型连接验证：`/models` 200，chat 成功；之前的 403 已不再复现；
- 新的内容 QA 测试（验证、唯一 ID、state creation path、consumer、compiled scenes、≥2 outcomes）；
- 多 Seed 自然人生与独立 Critic 阅读。

**但内容库变大了，人生质量的提升并不成比例。** 独立 Critic 对修订前主样本的评分是 **16/30**（Phase 16 为 18/30），明确指出：家庭/关系层仍是“老虎机”，一半样本在 25 岁前死亡，幸存者没有 horizon，许多新 State 是 NPC 墙纸，重复率反而上升，组织/职位重复而非累积。Phase 17 是**内容生产成功、转化失败**，不是“人生已经足够丰富”的证明。

## 2. 内容架构与 Catalog

新增 `docs/v4/phase-17-content-architecture.md`，规定：

- State / Kernel / Outcome / Pack / Runtime Registry 的层次；
- pack id、state prefix、作者/模型/provenance、metadata（themes/era/tone/scope/rarity/contentWarnings）；
- 共享 hooks（`secret-lover`、`cursed-by-wish`、`raising-child`、`office-patronage`、`occupied-city-regime` 等）；
- 作者工作流：catalog → pack → validate → register → catalog regenerate → typecheck/tests；
- “no duplicate concept / no empty chain / no template inflation / no moralizing / runtime is sole writer” 的编辑规则。

`scripts/v4-content-catalog.ts` 从实际 `ALL_STATES` / `KERNEL_LIBRARY` / `GENERATED_STATE_PACKS` 生成：

- `docs/v4/content-catalog.json`
- `docs/v4/content-catalog.md`

Catalog 包含每个 State 的 consumer 数量、consumer packs、可用阶段、pack metadata、stage/domain 分布与 unconsumed/low-consumption 列表。运行：

```bash
pnpm v4:content-catalog
pnpm v4:validate-packs
```

## 3. Research

`docs/v4/phase-17-research.md` 汇总：

- Fallen London / StoryNexus：quality/storylet、quality bands、deck/pinned content、one-shot locks；
- Cultist Simulator：recipe/predicate 表、input scarcity、aspect thresholds、legible failure；
- Reigns：compact two-axis choices、once-per-reign、explicit end；
- CK / RimWorld / Sims：traits/states、offices/obligations、mood/health ledgers、life stages、event pacing；
- Dwarf Fortress / Caves of Qud / BitLife / tabletop：history as residue、portable memory、fronts/clocks、beliefs/instincts、readability vs noise。

提取出的核心规则：consumer-first、parameter bands、collision scenes、two-axis outcomes、phase/exits、tone as consequence ratio、pacing memory、legibility、content budget、no hidden director。这些规则直接用于作者 brief。

## 4. 新增内容包

| Pack | 主题 | States | Kernels | Compiled scenes | 真实模型/作者 |
|---|---|---|---:|---:|---:|---|
| `pack-life-course` | 童年天赋、照护、空巢、继承、晚年重启 | 3 | 12 | 168 | `phase17-content-author/life-course` |
| `pack-desire-scandal` | 欲望、秘密、嫉妒、曝光、办公室私情 | 3 | 10 | 140 | `phase17-content-author/desire-scandal` |
| `pack-crime-justice` | 债务、巡警、法庭、监狱、出狱、保护费 | 3 | 10 | 140 | `phase17-content-author/crime-justice` |
| `pack-migration-belonging` | 边境、护照、侨民、汇款、返乡、归属 | 3 | 10 | 140 | `phase17-content-author/migration-belonging` |
| `pack-faith-miracles` | 降神会、圣物、治愈、教派、欺诈、安慰 | 3 | 10 | 140 | `phase17-content-author/faith-miracles` |
| `pack-fame-art` | 首演、赞助、抄袭、缪斯、迟来的回顾 | 3 | 10 | 140 | `phase17-content-author/fame-art` |
| `pack-absurd-fortune` | 错认继承人、借来的好运、反着实现的愿望 | 3 | 11 | 154 | `phase17-content-author/absurd-fortune` |
| `pack-work-craft` | 师傅、作坊、罢工、告密、机器破坏、转型 | 3 | 11 | 154 | `phase17-content-author/work-craft` |
| `pack-factory-education` | 夜校、奖学金、论文候选人、毕业错配 | 3 | 4 | 56 | 真实 Content Factory `deepseek-v4.1-flash` |

所有 pack 通过：

```bash
pnpm v4:validate-packs
# 15 packs, ok: true
```

`pack-factory-education` 来自真实模型运行：1 次成功 attempt，8,653 tokens，3 states / 4 kernels / 56 compiled scenes；原始输出在 `data/phase15-content/packs/`，集成时只规范了 pack metadata 和少量文本/字段。另一个 power brief 的 2 次 attempt 共 12,465 tokens，但未通过 effect schema，明确 fallback；见 `docs/v4/phase-17-content-factory.json`。

## 5. 激活与自然人生

### 5.1 主样本

`phase17-final-f`：

- 45 年，**18,134 events**，347 persons，188 alive；
- 129 births / 157 deaths；
- **51 distinct state definitions**；
- 1,715 state ticks / 850 reactions / 27 transitions；
- repeatRate **0.1965**；
- state opportunity：1,741 castable candidates / 517 selected / 480 resolved / 1,982 availability failures / 37 blocked。

补充样本：

| Seed | Years | Events | Persons | Distinct states | RepeatRate | New pack highlights |
|---|---:|---:|---:|---:|---:|---|
| `final-c` | 50 | 21,173 | 402 | **52** | 0.1892 | 40 child-prodigy, 10 caregiver, 97 office events, 29 scholarship |
| `final-e` | 50 | 20,790 | 374 | 50 | 0.1843 | 41 child-prodigy, 7 muse, 5 cult-initiate, 51 office events |
| `final-f` | 45 | 18,134 | 347 | 51 | 0.1965 | 33 child-prodigy, 6 caregiver, 19 starving-artist, 10 muse |

New pack activation in `final-f`:

| Pack | Kernel events | State adds |
|---|---:|---|
| life-course | 129 | child-prodigy 33, caregiver 6, empty-nest 3 |
| fame-art | 37 | starving-artist 19, muse 10, plagiarist 3 |
| migration-belonging | 63 | newcomer 19, remittance-web 19 |
| absurd-fortune | 44 | lucky-idiot 15 |
| faith-miracles | 35 | miracle-witness 3, cult-initiate 1, saint-or-fraud 1 |
| office-influence | 107 | office-patronage 3, office-under-siege 15 |
| crime-justice | 7 | wanted 2 |
| desire-scandal | 14 | kept-secret 1 |
| work-craft | 10 | master-craftsperson 2, machine-breaker 1 |
| factory-education | 17 | night-school 6, scholarship-holder 9 |

### 5.2 强场景（自然人生，非 forced）

- **Josef，1934.01** `wc17-commission.masterwork/design-copied`：学徒把约瑟夫的图纸带走，市场上出现铜边更薄、价格低三成的同款书柜。约瑟夫收下尾款，回去把原图锁进柜子。真实的手艺、价格、背叛与后果。
- **Lena，1931.01** `af17-luck.quiet-windfall/returned-at-the-box-office`：她在歌剧院雪地里捡到鳄鱼皮钱包，里面有九克朗、一张当晚站票和钢琴调音师的名片。她归还钱包；Anna Hofer 问她会不会弹琴，三天后免费调了一架旧钢琴，又写了介绍信。诚实换来机会，也带来可见度。
- **Lena，1962.01** `lc17-nest.last-child-leaves/takes-a-lodger`：一个只带大提琴盒的音乐学生来看北屋。Lena 把房间租给他，租金够付煤和电；夜里她隔着墙听见钢琴，想起 Otto Winter 小时候练琴。
- **Mitzi，1941.04** `fa17-studio.private-failure/sell-as-pulp`：她把未完成的手稿卖给通俗杂志，换一个月房租。编辑把结尾改成火车相撞，署上一个陌生笔名；在报摊上，她先认出自己写雨的那句话，再认出不是自己的名字。
- **Klara，1962.01** `cj17-police.lineup/bought-the-witness`：家人凑了三克朗，在咖啡馆后门交给证人；证人说光线太暗，认不出人。巡警合上本子，但没有结案。
- **Klara，1957.01** `curse15-bargain.borrowed-name`：旧名册的空页、铜钥匙、三人夜校同学会、坏掉的储物间锁；权力愿望以最小的形式兑现。
- **Sigmund Freud 坐在窗边打毛线**（`ds17-courtship.parlour`，1928.10）——历史人物作为荒诞的陪衬，而不是被膜拜的雕像。
- **Josef，1944.05** `r2-law.smuggling-cigarettes/caught-at-the-gate`：棺材底板敲起来太实，打开是整齐的香烟，没有尸体。黑暗、具体、不说教。

### 5.3 交叉组合

`final-f` 的 `crossPack` 统计显示新内容确实消费旧状态：

- `life-course -> base` 33；`life-course -> family-continuity` 2
- `work-craft -> base` 6；`work-craft -> history-fork` 1（此前另有 7）
- `fame-art -> base` 14；`fame-art -> absurd-power` 7
- `faith-miracles -> base` 13
- `desire-scandal -> love-secrecy` 8
- `migration-belonging -> family-continuity` 6
- `crime-justice -> base` 7
- `absurd-fortune -> office-influence` 3

具体案例：

- `journeyman` → `wc17-commission.masterwork` → 真实 “师傅” Position + household workshop → `office-under-siege`；
- `under-investigation` → `cj17-police.lineup` → `cj17-wanted`；
- `ds17-courtship.parlour` → `forbidden-attachment`；
- `lc17-health.chronic-onset` → `chronic-illness` → `lc17-care.parent-illness` → `lc17-caregiver`；
- `mb17-border` → `mb17-newcomer` + `mb17-remittance-web` → `raising-child` / `factory-employment` / `occupied-city-regime`；
- `curse-bargain` → `office-patronage` / historical process。

**缺口：** 新包之间几乎没有 new→new 消费；18 个新 State 的 consumer packs 基本都是自己的 pack。它们主要是旧库的并行消费者，而不是彼此的生产者。报告的覆盖文档将这一点列为主要后续工作。

## 6. Content Factory

### 6.1 连接状态

之前的 403 不再复现：

- `GET /models` → **200**；
- `POST /chat/completions` → **成功**；
- 真实 `brief-education-continuity` → **1 attempt, 8,653 tokens, ok: true, usedFallback: false, 3 states, 4 kernels, 56 compiled scenes**；
- 集成时只改 pack metadata/provenance 和少量文本，不伪造模型内容。

历史失败保留：`brief-power-and-irony` 两次 attempt 共 12,465 tokens，第一次 effect 无 type，第二次把 `debt-bondage` 当 effect；最终 fallback 且 `ok:false`。我们在提示中增加“每个 effect 必须有 literal type + state effect 形状”的硬规则后，education brief 首次通过。证据：`docs/v4/phase-17-content-factory.json`。

### 6.2 边界

- 只有 `pack-factory-education` 是真实 Content Factory 输出并注册；其他 8 个是 OpenCode LLM 子代理创作，provenance 明确为 subagent。
- 不能把 subagent 创作说成 runtime worker 成功。
- 未做自动发布/审批/版本回滚；`data/phase15-content/registry.json` 是本地记录，runtime 仍只读代码内注册的 pack。

## 7. 测试与验证

```bash
pnpm exec tsc --noEmit
# no output

pnpm exec vitest run --reporter=dot
# Test Files  89 passed | 8 skipped (97)
# Tests       526 passed | 37 skipped (563)

pnpm v4:validate-packs
# 15 packs, all ok:true

pnpm v4:content-catalog
# 79 states / 1,740 kernels / 15 packs

pnpm build
# tsc --noEmit + vite build; success
```

新增 `tests/v4-phase17-content.test.ts` 检查：

- 所有 pack 通过 schema + typed vocabulary + real composer；
- state/kernel ID 全局唯一；
- 每个 Phase 17 state 至少有一个真实 consumer（不是只有 state_add）；
- 每个 Phase 17 state 有真实 creation path（state_add/transition/tick/reaction）；
- 每个 kernel 至少两个 outcomes；
- 每个 pack 至少编译出一个 scene。

PostgreSQL 与浏览器 e2e 在 Phase 17 最终代码上重跑：

```bash
./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm exec vitest run tests/v4-state-persistence.test.ts tests/v4-macro-store.test.ts --reporter=dot"
# Test Files  2 passed (2)
# Tests       2 passed (2)

./node_modules/.bin/tsx scripts/v4-with-postgres.ts \
  "pnpm test:e2e --config playwright.v4.config.ts"
# 1 passed
```

测试数据库里如果残留其他 integration script 的 running world，`seedV4World` 会保持单一 running world 而返回旧世界；两个 DB test 的 beforeAll 现在先 archive running worlds，restart-check 在验证后归档自己的世界。生产环境没有执行 archive。

## 8. 独立 Critic

`docs/v4/phase-17-critique.md` 记录独立 Critic 对修订前主样本的评分：**16/30**，低于 Phase 16 的 18/30。主要发现：

- 家庭/关系层是 slot machine：Lena 14 年 14 次生育，Josef 15 年 8 个伴侣，同一 text 反复出现；
- 8/24 新状态在主样本中完全不出现，29/79 states 缺席；
- `raising-child` 1,045 ticks / 683 reactions，repeatRate 0.1978；
- 死者的 household states、caregiver 自链接、空巢与 school note 矛盾；
- 历史年份错位（1936 liberation、1946 liberation、1938.01 Anschluss）；
- 诅咒仍出现 self-cast/prose-only；
- 一半样本 25 岁前死亡，幸存者没有 horizon。

修订已处理部分具体问题：

- 18 个 `cash` effect 从 `personId` 改为 `householdId`；
- Phase 17 状态 slot 去冲突（`childhood_talent`/`double_life`/`kept_secret`/`muse_identity`/`false_heir`/`office_pressure`）；
- 新增 player-subject `lc17-care.offers-to-care`；
- `fa17-muse` link `artist` 修复，避免 `{artist}` unresolved；
- night-school graduation transition、factory 文本/ageWindow、graduation cash gate；
- fame stage/age 边界、plagiarist exposure gate；
- dossier 不再显示死者的 household/org states；
- 新增 catalog/crossPack/contentSamples 与 QA tests。

修订后 `final-f` 仍为 51 distinct states、repeatRate 0.1965；Critic 的 16/30 没有被重评为更高分，报告不声称文学质量已经修复。

## 9. 未完成与阻塞

1. **内容转化率仍低。** 新包只占 focal events 的 3–10%；很多新 State 只在 NPC 身上出现。`ds17-double-life`、`af17-mistaken-heir`、`af17-cursed-luck`、`cj17-prison-term`、`mb17-stateless`、`thesis-candidate` 在最终样本中仍为 0 或极稀有。
2. **家庭/关系层没有修。** 多次伴侣、连续生育、同名子女、死后的 household states 仍是 base content 问题；Phase 17 没有重写它。
3. **历史日期与组织类型错误**仍在 base content：liberation 1936/1946、Anschluss 1 月、心理分析学会/《火炬》被当成政党。
4. **horizon 缺失。** 活到 1962 的 focal 没有 coda；报告的 45/50 年观察窗口不等于模拟终点。
5. **new→new 组合弱。** 新包主要消费旧 states，尚未互相成为条件；下一步应写 collision kernels，而不是继续加 pack。
6. **参数/flag/role 仍有装饰性。** 跨审阅统计 69 个新参数只有 13 个被读取，211 个 flags 没有一个 `hasFlag` consumer；很多职业 role 没有消费者。
7. **内容工厂只验证了一个 brief。** 成功一次不等于稳定生产；需要批量、重试、评估和编辑流程。
8. **性能/数据库没有因内容扩容重新做大规范测试。** 本次全量测试通过，但 79 states/1,740 kernels 的 20k 行为需要后续单独 profile。

## 10. 后续建议

1. 先做“conversion pass”，不要加第九个 pack：为每个在自然人生中为 0 的新 state 增加可达入口或删除；为每个 pressure parameter 增加 threshold gate；为每个 flag/role 增加 consumer 或改成 organization/position。
2. 修家庭/关系层：partner/birth interval/once-per-person、子女唯一 ID、school note 年龄门、停学/离家/归来 transition、死后 household state 清理。
3. 给每个活到观察终点的 focal 加 explicit horizon/coda；不要把“文件停止”当成结局。
4. 修复历史日期/组织类型；把 liberation 限制在 1945+，Anschluss 3 月，招募场景按组织类型 gate。
5. 增加 new→new collision kernels（caregiver × wanted、newcomer × master-craftsperson、muse × kept-secret、remittance × debt）。
6. 用真实 Content Factory 批量生成 3–5 个 briefs，做 validation/acceptance 指标，而不是只证明一次成功。
7. 对 20k + 新内容做一次 profile，确认 state lane/cast 成本；本轮目标是内容，不是性能，但不能让新内容破坏 Phase 16 的基线。

## 11. 最终判断

Phase 17 交付了一个真实的内容库：

- 79 states / 1,740 kernels / 15 packs；
- 8 个主题 pack + 1 个真实模型 factory pack；
- 可重建的 catalog、作者 brief、研究资料、QA 测试；
- 自然人生中确实出现了新的工作、迁徙、信仰、艺术、照护、犯罪、荒诞运气场景；
- 真实模型 Content Factory 从 403 恢复到一次成功并注册的 pack。

但它不是“所有人生都变好了”。独立 Critic 的 16/30 和“内容生产成功、转化失败”的判断是有效的。Phase 17 最值得保留的是：**内容生产流程、catalog、pack 组织、真实模型成功、以及那些已经出现在自然人生中的具体场景**。下一步必须是转化、家庭连续性和 horizon，而不是再堆 100 个 kernel。
