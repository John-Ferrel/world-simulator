# Phase 20 — Independent Critique and Revision Response

日期：2026-11-07  
Reviewer：独立 Playtest / 文学 Critic（不改代码、不改内容）  
Evidence：`phase-15-phase20-a/b/c/elder/mixed.json`（3×45 年 + 30 年老年 cohort + 35 年混合 cohort）、`phase-20-playtests.json`、`phase-20-adaptive-audit.json`、`phase-20-experiments.json`、`phase-20-content.md`、`content-catalog.md`、`creative-index.md`、`story-shapes.md`。  
Baseline：Phase 19 独立 Critic — Life **17/30**，Scene **21/30**；主 A/B/C focal 新 Pack share **0.14%**，repeatRate **0.2104**。

> 以下为独立 Critic 的修订前判断；Main Agent 的修订响应单独记录，不把修订后的内容重新冒充为同一轮独立评分。

## 1. 分数

**Scene 22/30。Life 18/30。** Phase 19 是 21/30 与 17/30。Phase 20 是真实但温和的进步，不是跃迁。它是真正的 content/tooling success，也是部分的 living-consequences success；它还不是“玩到的人生层面”的 living-consequences phase。

## 2. Adaptive storylet 是否真的有效

178 个 adaptive-kernel focal 事件中，62 个有 check；42 个有非零 adaptive DC 变化；只有 **5 个真正翻转 success/failure**（占 adaptive 事件的 2.8%）。多数 adaptive context 改变的是赔率，不是已经实现的故事。

| Scene | Context / effect | 没有它会怎样 |
|---|---|---|
| Josef A 1930-05 `evt:world-vienna-1912:004517` `ad20-apprenticeship-review/kept-on` | `failed-apprentice` → `k16-failed` −3；DC 12→15；die 16+1=17，success | 更容易的 DC 12，同 outcome；概率 55%→40% |
| Rosa mixed 1935-02 `evt:world-vienna-1912:006849` 同 Kernel | 同 −3；DC 15；die 19+1=20，critical success | 同 outcome，检定更难 |
| Lena A 1934-11 `evt:world-vienna-1912:006668` `ad20-police-stop/taken-in` | `ad20-private-bargain` → `k14-bargain` +1；DC 13→12；die 2−1=1，failure | 同 failure；只改赔率 |
| Hedwig A 1944-09 `evt:world-vienna-1912:012276` `ad20-newspaper-interview/story-prints-wrong` | `public-scandal` → `k15-scandal` −2；DC 12→14；die 9，failure | 同 failure；文本从未提到丑闻 |
| Hedwig C 1943-01 `evt:world-vienna-1912:010408` `pc20-separation.return-key/sign-here` | long partner history +2；DC 12→10；die 7+1=8，failure | 同 failure；正式离婚仍然发生 |
| Hermann Stein mixed 1947-01 `evt:world-vienna-1912:014835` `pc20-testimony.retraction/retract` | long testimony +1、stubborn witness +2；DC 12→9；die 11，success | **翻成 failure** |
| Josef Bauer B 1945-08 `evt:world-vienna-1912:008800` 同 Kernel | 同 +3；DC 9；die 8+1=9，success | **翻成 failure** |
| Klara B 1950-02 `evt:world-vienna-1912:017363` `ad20-job-interview/hired-on-probation` | work history +1；DC 12→11；die 11，success | **翻成 failure**。Hedwig mixed 1941-08 `evt:world-vienna-1912:010482` `ad20-loan/loan-refused` 是负向翻转：debt history −1，DC 13，die 11+1=12，failure；没有它则 success |

三个装饰性/硬贴上的案例：

- `ad20-lucky-coincidence/the-coin-on-the-track`（`evt:...007248`，重复四次）：文本相同，这些人生中没有匹配的 context，只有 cash/mood/flag。它是 randomizer，不是 storylet。
- `ad20-neighbor-dispute/the-line-moves`（`evt:...014724`，八次）：attention/bargain/child context 不可见；效果是 relation −0.03 和一个 flag，没有后续后果。
- `ad20-child-teacher/the-teacher-has-a-question`（`evt:...010011`，六次）：fame/blacklisted/attention context 从未出现；只有 mood 和 school-progress 参数。14 个 `oj18-zoo.night` retrofit 事件同样如此，fame/grief/chronic-illness context 在这些 dossier 中从未激活。

## 3. 同一事件，不同人生

**Mitzi A 1947-07**（`evt:...014151`，critical failure）：“环城大道写字楼管理处没有抬头，只问Mitzi是不是那个在报纸上被提过的人……那行字不是评语，是让下一个雇主去问谁。” **Mitzi mixed 1947-05**（`evt:...014947`，success）：“面试在一间改作办公室的公寓里进行……在纸上画了一个圈，又把它涂成实心。” 同一 Kernel、同一年、不同人生。但两者都有相同的 +1 work-history modifier；差别是骰子。Mitzi A 没有活跃的 `public-scandal` 或 `fame`，所以报纸句子是 false specificity：`name-stays-on-the-list` 是无条件 critical-failure outcome。

**Rosa A 1947-01**（`evt:...014155`）：“Rosa看见Mitzi站在最后一排，手里攥着一只手套。Rosa说‘不愿意’，声音不大，但前排的人全听见了。” **Mitzi Lechner A 1942-06**：“Mitzi Lechner说‘愿意’，声音稳得连自己都意外。” 同一个 retrofit `ld18-wedding.objection`；Rosa 的 `known-affair` context 给 1.9× weight，且爱人 visibly present。这是最好的 retrofit 案例：optional context 让拒绝变得可读。但 outcome 文本本身没有以 affair 为条件；差别来自 scene selection + role casting。

**Hedwig B 1939-01**（`evt:...009654`，curse-lifted）：“这顿饭终于只是顿饭；那天夜里，Hedwig第一次没有梦见门被推开。” **Hedwig mixed 1947-01**（`evt:...014931`，curse-returns）：“厨房的灯就灭了……回来时看见Hedwig把同一句话又写在了纸上。” 同一个 `pc20-wish.literal-return`；一个解除诅咒，一个恶化。这是真实的 different version，由 check band 和 state 驱动。

**Josef A** 是最强的 focal arc：1941-09 `evt:...010556` “不是手艺不好，是‘店里养不起’……布袋比来时轻，因为有一把凿子已经磨短了”；1942-01 `evt:...011105` “把工作台擦干净，把刨花扫进麻袋……木牌背面还留着当年没刻完的名字”；1945-01 `evt:...012894` “不是来收徒，是来找一个能一起接活的人”；1949-03 `evt:...015342` “病假可以补，别的东西补不了”；1950-01 `evt:...015995` “名单上不止自己一个名字”。这是跨多年、state-linked 的。但文本不显示哪个 adaptive context 触发。trace 只有 net DC；weight 完全没有 trace。`trace.mechanism` 有 kernel/outcome/milieu，没有 adaptive IDs。“Causality inspectable” 对 AdaptiveContext 不成立。

## 4. Living consequences

**Failed apprenticeship** 最成功。Josef A 的 1941 failure 创建 `failed-apprentice`；1942 second-workshop `sweep-up` 添加 `pc20-second-chance`；1945 master-return 再加一个；1949 parent-mistake 再加一个，1950 friend-betrayal 消费它：suspicion 50→58。最后一条是因果的。1942→1945 较弱：master-return 由 `failed-apprentice` gate，不由 1942 second-chance state gate，所以是 sequence，不是 consequence。

**Separation** 很薄。自然人生中恰好只有一个 `pc20-separation.return-key` 事件，Hedwig C 1943-01，而且是离婚 outcome，不是复合。正式效果真实——`relation_end`、`state_remove fw19-separated-household`、`state_add pc20-second-chance`——但新 state 只 tick `kept-word` 并在 1946 过期。没有 consumer kernel 跟上。更糟的是，同月出生 `evt:...010406` 说“Josef Huber 2把消息带到工厂，回来时把唯一的摇篮重新刷了一遍”，紧接着 `evt:...010408` 让他读分居协议并离开。Birth 和 divorce 碰撞。报告不能声称 separation 现在有三个自然 follow-up。

**Public reversal** 半真实。Hermann Stein mixed 1947-01 retraction 创建 `pc20-public-reversal`；1947-12 `evt:...014836` quiet-exoneration 消费它：“把整份档案借出来……更正有没有登报，反而成了次要的事。” 这是干净的两步链。Theresia Huber 的 1928 reversal 却产生三次相同的 `state_tick:pc20-public-reversal/file-moves/the-file-disappears` 文本（“只剩空架子和一层灰”）在 1929、1930、1931，然后过期。没有 exoneration。Public reversal 主要是 tick state。

**Testimony** 有最强的 check，却有最差的 continuity。Josef Bauer B 1945 retraction 把 failure 翻成 success，但 1946 `eh19-testimony.newspaper-caption` 把 truth 18→12（“死人需要一个好听的名字……活人还可以不说话”），1947 `wrong-apology` 把 truth 10→4，1950 `question-arrives` 又创建新的 `eh19-late-testimony`，truth 51。过去被重新参数化，而不是被携带。并且 `pc20-testimony.retraction/retract` 说“把上一次的日期改了回来”，效果却是 `truth −15`；文本说 correction，效果说 regression。

**Affair** 在 Rosa A 中是真实的：wedding refusal → `public-scandal` + `ld18-impossible-attachment` → 1948 public rumor → 1952 `evt:...017270` old-enemy alliance：“当年那件事他也有一半责任……想要一个能一起把旧账查清的人。” 这是 emergent、focal。**Curse/wish** 真实但小：两个自然 `pc20-wish.literal-return`，一个 lifted，一个 returned。其他 wish consumer 未出现。

## 5. 自然涌现

1. **Josef A（focal）** — failed apprenticeship → second workshop → shared bench → parent cover → friend betrayal。多 state、跨多年，不是预写链。
2. **Rosa A（focal）** — affair → wedding refusal → public scandal → unregistered attachment → old enemy alliance。最强的 love/reputation/later-life 组合。
3. **Hedwig C（focal）** — stillbirth → births → divorce → same-sex household（`evt:...010987`：“对外说是表姐妹……窗台上还并排晾着两只杯子”）→ displacement。很强，但 1943 birth/divorce 碰撞伤害了它。
4. **Josef Bauer B（state-rich NPC，不是玩家路径）** — 1938/1945 testimony → public reversal → uncorrected caption → 1954 archive photo：“背面用铅笔写着一个不是祖母的名字……那个名字的笔迹和Josef Bauer平时记账的字一模一样。” 这是优秀的 late-life emergence。
5. **Hermann Stein（state-rich NPC）** — testimony retraction → public reversal → quiet exoneration。干净但只有两场。

Theresia Huber 是反例：public reversal 变成三次相同的 file-disappearance ticks，然后死掉。

## 6. 重复与分布

`repeatRate` **0.2274** vs Phase 19 **0.2104** 是真实回归：A 0.2372，B 0.2143，C 0.2307。原因不是 AdaptiveContext。focal dossier 中，新 Pack 的 exact duplicates 是零（mixed 有两场 `ad20-shop-opening`）；duplicate mass 是旧 state tick：`raising-child/school-year/learns`、`school-note`、`ld18-impossible-attachment/invented-anniversary`、`wish-power/power-office`、`eh19-late-testimony/version-drift/rehearsed`，以及新的 `pc20-public-reversal/file-moves` tick。Gate 仍然失败。

新 Pack share **1.90% world / 1.60% focal / 2.07% adaptive focal** 是相对 0.14% 的 11–15× 真实改善，但仍远低于 12% 目标。它大约是每个 focal life 3.5 个新 Pack 事件，而且集中：Josef A 占 A 的 40 个中的 15 个；C 的 18 个中有 9 个在一个 state-rich life。`pack-living-consequences` 大多是 wallpaper：24 个 Kernel 中 13 个未出现，包括 `pc20-investigation.exoneration`、`pc20-public.monument`、`pc20-affair.return`、`pc20-separation.last-box`、`pc20-family.secret-papers`、`pc20-home.return`、`pc20-reversal.renewed-accusation`。实际游玩被三个模板主导：`pc20-family.parent-mistake` 8 次、`pc20-testimony.retraction` 7 次、`pc20-apprentice.second-workshop` 6 次。`pack-adaptive-everyday` 更广（23/24 出现），但 `ad20-lucky-coincidence`、`ad20-neighbor-dispute`、`ad20-child-teacher` 是 wallpaper。

## 7. 文学质量

| Scene | Score |
|---|---:|
| `ad20-job-interview/hired-on-probation` | 1 |
| `ad20-job-interview/name-stays-on-the-list` | 1 |
| `ad20-loan/sign-here` | 2 |
| `ad20-favor-called-in/the-old-favor-returns` | 2 |
| `ad20-police-stop/sent-on` | 2 |
| `ad20-census-form/the-clerk-reads-aloud` | 2 |
| `ad20-market-day/the-scale-is-light` | 1 |
| `ad20-lucky-coincidence/the-coin-on-the-track` | 0 |
| `ad20-neighbor-dispute/the-line-moves` | 1 |
| `ad20-apprenticeship-review/tools-returned` | 2 |
| `pc20-apprentice.second-workshop/sweep-up` | 2 |
| `pc20-family.parent-mistake/cover` | 1 |
| `pc20-testimony.retraction/retract` | 1 |
| `pc20-separation.return-key/sign-here` | 2 |
| `pc20-wish.literal-return/curse-lifted` | 2 |

**Total 22/30。** 八个 2，六个 1，一个 0。Phase 19 是 21/30；这是 +1，不是 round-up。

项目级六维：Specificity 4、Causality 3、Character continuity 2、Relationship continuity 2、Historical texture 4、Dramatic shape 3 = **18/30**。Phase 19 是 17/30。强 arc 提高了上限；中位人生仍靠 birth spam 和重复 tick 运行。

## 8. 旧 Kernel retrofit

八个 retrofit 全部**没有 check**，所以 25 个 `checkBonus` 全部休眠。weight 效果在游玩中也大多休眠。43 个 observed retrofit 事件中，14 个 `oj18-zoo.night` 和 8 个 `oj18-cinema.reel` 没有匹配 fame/grief/chronic-illness context；6 个 `oj18-mortuary.first-body` 有一个 `under-investigation`；1 个 `sm18-object.false-accusation` 和 1 个 `em18-family-archive.grandchild-photo` 没有。明确成功是 `ld18-wedding.objection`（Rosa A，`known-affair` 1.9×），拒绝变得可读。`ml18-lottery.same-numbers` 可能匹配 `raising-child`；`em18-late-bloom.radio-hour` 可能匹配 fame history。Retrofit 结构有效，但行为上薄；报告不能说旧 Kernel 广泛获得了 adaptive 行为。

## 9. 结论：Phase 20 是什么

**两者都是，但偏向 content/tooling success with weak-to-moderate conversion。** Phase 20 证明了机制，并产生了一些真实链条；它没有让 living consequences 成为人生的正常纹理。

报告可以声称：AdaptiveContext schema/validator/engine；56 adaptive kernels / 229 contexts；8 retrofits / 25 contexts；4 个新 State 有 creation 和至少一个 consumer；1.90%/1.60%/2.07% shares；62 个 check 中 42 个有 adaptive DC shift，5 个 outcome flips；强场景；repeatRate 0.2274。不能声称：12% 目标达成；“living consequences phase” 在 life level 成立；adaptive context 可 trace 或改变 role；retrofit weight 广泛生效；separation 有三个自然 follow-up；public reversal 是完整 arc；birth after separation 已修；repeatRate 改善；五个 controlled experiments（JSON 只有 A–D）；39 observed/17 unobserved（audit 是 42/14）。Experiment A 的 “public-scandal” arm 在修订前无效：`ad20-job-interview` 没有 public-scandal context，Klara Shamed 的 DC 仍是 12；只有 fame 的 +3 是真的。修订后已补 context，见第 11 节。

## 10. 下一步修订建议

1. **让 adaptive causality inspectable。** Trace matched context IDs、weight multiplier、base/effective DC 和 check breakdown。加一个同 subject、同 seed、只 toggle 一个 state 的 A/B 实验。
2. **把 creation 变成 consumption。** `pc20-second-chance` 有 13 creators / 2 consumers；`pc20-public-reversal` 6 / 3。加 6–8 个 common-state bridge consumer；让 `pc20-separation.return-key` success 可达；给 `pc20-affair.return` 和 `pc20-public.monument` 非老年入口。
3. **修 continuity。** 让 `eh19-late-testimony` truth 跨 instance 携带；让 retraction 增加 truth 或改名；防止 `newspaper-caption`/`wrong-apology` 静默重置已修正 state；给 birth 加 `notHasState fw19-separated-household` 或 reconciliation gate；限制每 household/partner 的 birth 数。
4. **去重 tick/template。** 降低 `raising-child` 和 `ld18-impossible-attachment` tick 频率；加 child-age/sex/school variants；让 `pc20-family.parent-mistake/cover`、`pc20-testimony.retraction/retract`、`pc20-apprentice.second-workshop` 的文本按 context/outcome 变化。加 semantic-template metric，不只 exact-text duplicate rate。
5. **Retrofit or remove。** 给八个旧 Kernel 加 check，让 `checkBonus` 有意义，或删掉休眠 bonus；收窄 context 到真正会发生的 state；加 fame/grief/chronic illness 的 conditional text/outcome；修 `em18-late-bloom.radio-hour` 的 `notHasState fame` gate 与它创建的 fame 冲突。

## 11. Main Agent 修订响应

Critic 阅读的是修订前 dossier。Main Agent 的响应限定在可验证的修正，不把未重跑的内容写成已完成：

- **已修正 Experiment A 的 public-scandal arm**：在 `ad20-job-interview` 增加 `k01-scandal`（`public-scandal`，weight 1.5，checkBonus −3），adaptive contexts 从 229 变为 230，并重新生成 `phase-20-experiments.json`。现在 Klara Shamed 的 DC 是 15（failure），Klara Famous 是 9（success）；同一事件、同一检查、不同处境，arm 不再无效。自然 dossier 与 summary/audit 已重跑，最终数字以重跑后的 `phase-20-playtests.json` / `phase-20-adaptive-audit.json` 为准；Critic 的 18/30 仍是修订前评分。
- **修正口径**：自然 audit 的 “adaptive focal events” 改为“来自 adaptive-capable Kernel 的 focal 事件”，明确它不证明某次事件匹配了具体 context；context 生效证据来自受控实验与 `trace.check.dc`。
- **修正未观测数**：5 个 dossier 下是 **40 observed / 16 unobserved**，不是 17；报告与 audit 已同步。
- **记录 role 绑定缺陷**：`ad20-job-interview` / `ad20-apprenticeship-review` / `ad20-former-employer` 的 `employer` role 有时投成组织，prose 按 person 写；少数 relation effect 被丢弃或文本出现组织名。没有在 Critic 阅读后偷偷改文本再冒充同一轮结果。
- **保留未修订项**：separation 的 birth/divorce 碰撞、testimony truth 重置、`pc20-public-reversal` 的 6 个月 tick、旧 Kernel 的休眠 checkBonus、base scene 未接入 AdaptiveContext、adaptive context 未写入 trace。它们是下一轮的首要修正。
- **测试**：新增 B/C/D 具体 outcome 断言（`curse-lifted`、`same-key`、`re-accused`）；`pnpm test` 全量通过，build/typecheck/31 packs validate 通过。

如果 Critic 的结论与本响应冲突，以 Critic 的独立判断为准；本响应不修改其分数。
