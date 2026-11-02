# v4 可玩版本验收报告

日期：2026-11-02  
范围：Vienna 1912–2000 单世界观察器、玩家新生儿、家庭/关系/工作/死亡/战后生活内容。  
原则：区分“已跑过”“仅测试夹具”“未完成”；不用接口或 mock 代替交付。

## 1. 现在实际能做什么

- `pnpm dev` 自动启动本地 PostgreSQL（默认 `postgres://localhost:55432/living_world`），启动 v4 API、年度模拟器、出生愿望 worker 和观察器；外部 `DATABASE_URL` 不会启动本地库。
- 注册/登录后填写姓名、性别、体质、外观、自由祝愿和人生模式；出生请求立即写入，世界时钟不等待愿望模型。
- 孩子进入一个真实存在的家庭：优先有 18–45 岁在世女性监护人、再有男性成人、按家庭当前在世人数和稳定 ID 选择；住址容量满时不会直接塞人，而是由家庭生命周期分户或在场景层阻止。
- 孩子出生后由世界自行推进；个人日志来自已提交事件，支持按年筛选、家庭/关系、地图地点和公开事件。
- 世界到 2000 年明确归档，`terminalReason` 说明这是内容切片终点，不是模拟灾难；旧世界和新世界都保留，世界 ID 不复用。

## 2. 本轮实际修复

### 2.1 家庭/死亡生命周期

- 已故人物年龄固定为死亡时年龄；家庭当前在世人数只统计未死亡成员，历史成员记录保留。API 个人日志还过滤“事件日期晚于死亡日期”的普通事件，原始事实不重写。
- 死亡会结束未结束的伴侣关系；否则寡妇/鳏夫永远无法再求偶。
- 监护人死亡时，从同一住址的在世成人中补选监护人，并写入真实 guardian 关系；没有成人时不凭空创造父母。
- 单户在世人数硬上限 12；满户时新生儿父母建立新的租赁户，落在真实合租楼住址，带租金/食物义务。旧世界 63/85 人单户不会被复制到新世界。
- 家庭场景允许 `initial`、`birth` 和 `materialized_population`；具名化的邻居/工人不再是“不能成家”的假人口。

### 2.2 关系与生育

- 求偶只允许没有任何未结束伴侣关系的人；已有伴侣但未同住也不能再次求偶。
- 伴侣关系一对一排他；同一个 pending proposal 不会在对方已有伴侣后继续创建第二段关系。
- 离婚每个角色最多一次，避免两个配偶轮流作为 subject 把新家庭在 1–2 年内反复拆掉。
- 生育接受真实伴侣，不要求事先同住；孩子出生时，父亲在容量允许时迁入母亲家庭，容量满则父母建立新户。
- 88 年无头试玩的最大在世家庭为 12 人，不再是 63/85 人。

### 2.3 内容

- 新增 `packages/v4/content/vienna-postwar.ts`：16 个 1946–1999 生活场景（重建、学校牛奶、学徒、第一份工资、市营住宅、电视咖啡馆、自助商店、工厂倒班、带薪休假、医疗保险、舞蹈社交、汽车、失业、1990 年代电脑工作、退休、老年孤独），24 条 1946–1999 时代记录。
- 场景只使用已有 `SceneDefinition`/`SceneEffect` 语法，没有新增任意代码、SQL、HTTP 或未受支持的条件。
- 战后内容已接入 API、simulator、Macro Director known families、life demo、content audit 和 playtest。
- 旧 1912–1945 生活内容继续保留；战后内容是补充，不是重写。

### 2.4 出生契约回退

- 模型不可用时，`fallbackBirthContract` 只按关键词匹配 literacy/numeracy/social_insight/craft_affinity/frail_body，输出同一套有界条件/上限/代价，写 `deterministic-fallback` 并设置 `compiledAt`，不会让能力场景永久卡住。
- 没有匹配关键词时返回空能力契约，不伪造异能。

### 2.5 可读性

- API 本地化常见死因（肺炎、肺结核、产后并发症、中风、意外等），未知死因保留原文而不是内部枚举。
- 事件标题优先使用内容标题；统计事件和 interaction response 有中文兜底；观察器拒绝 `None`、`null`、`undefined` 和原始 action ID。
- 已故人物显示生卒日期和“享年”；家庭显示“X 人在世 / Y 条成员记录”；年份筛选可横向滚动。

## 3. 实际运行证据

### 3.1 88 年内容审计（1 个焦点人物）

命令：`pnpm v4:audit 88`  
实际结果（`docs/v4/content-audit.json`）：

- 人物 420；在世 236；事件 9,791；111.26 事件/年；
- 出生 313；死亡 182；统计死亡 181；
- 5 岁以下死亡 24；产妇死亡 7；中位死亡年龄 41；
- 无事件年份 0；
- 生成内容占比 65.6%；
- 战后场景触发 122 次；
- 具名化 80 次：neighbor 38、worker 24、partner 18。

这些是单 seed、单焦点人物的模拟结果，不是历史拟合，也不代表 10k 生产负载。

### 3.2 8 人物长期试玩

命令：`pnpm v4:playtest`  
报告：`docs/v4/playtest.json`  
实际结果：

- 88 年 10,147 事件，115.31 事件/年；
- 373 个具名人物，199 在世；
- 出生 271，死亡 172；
- 最大在世家庭 12 人；
- 8 个焦点人物事件数：139、151、5、165、286、14、312、232；
- 模板 token、字面 `None`、`undefined`、空参与者：0；
- 所有焦点人物在 1989 年前死亡；本 seed 偏严酷，不是每个孩子都能活到老。
- 审计仍标出 17 条“事件日期晚于死亡日期”的原始事实；API 个人日志已隐藏，但原始事实保留。该问题来自年度事件月份分配与当年死亡提交顺序，未伪称已从 canonical 记录消除。
- 仍有 38 个“同一人物某 scene prefix 超过 12 次”标记；主要是 88 年跨度的邻里/互助/生育参与，不是一年内自触发。最高 43 次的 `sublet-room` 已加冷却，但仍需继续做内容去重。

### 3.3 12 人物人生演示

命令：`pnpm v4:life-demo`  
证据：`docs/v4/phase-3-life-demo.json`

- 12,148 事件，151.85/年；
- 12 人中 2 人活到 80；
- 死亡年龄：74、11、22、79、80、60、65、80、71、77、75、68；
- 单人物事件数 21–367；
- 死亡原因可读：意外事故、肺炎、急性疾病、老年衰竭。

### 3.4 浏览器

```text
pnpm test:e2e --config playwright.v4.config.ts
→ 1 passed (9.4s test / 14.0s wall)
```

真实注册、创建 E2E Klara、等待异步出生、读取出生日志、切换到已故 Anton Huber（断言“享年”）、切换到 Anna Bauer、检查无 `None`/原始 action 标题、打开地图地点。

### 3.5 Macro Director 实际调用

首次启动日志中，旧数据库缺少 `world_year` 列，导致 enqueue SQL 失败。已新增 `infra/migrations/007_v4_macro_world_year.sql` 并执行 `pnpm v4:migrate`；之后真实 worker 成功：

```text
model: deepseek-v4.1-flash
tokens: 3,329
world_year: 1914
summary: 1915 年初维也纳仍远离主战场，但战争动员、征兵与战时配给开始重塑城市生活……
status: applied, revision 4
```

这不是 mock；它通过 revision-locked 事务写入宏观状态，并创建了一个真实的 `WorldDevelopment`、`Vienna War Welfare Committees` 组织、5 条事件池调整。随后运行时 Content Author 自动生成了 `vienna-social-movement` 内容包：

```text
content job: v4-content-mvyujndu-5c6571
brief: vienna-social-movement
tokens: 11,476
errors: 0
status: published, pack version 1
```

这证明“宏观发展 → 组织 → 事件池 → 运行时内容发布”的纵向链路在正式数据库中实际走通，而不只是单元测试。该包在后续年份实际触发了 17 条 `vienna-social-movement` 事件：会议、招募、警察搜捕；例如 `Josef Bauer` 在楼梯下拿到传单、报名成为 `Vienna War Welfare Committees` 成员，并在一次搜捕后留下警察记录。

### 3.6 构建与类型

```text
pnpm typecheck
→ 通过

pnpm build
→ 通过（3.33s）
```

### 3.7 全量测试

```text
TEST_DATABASE=1 pnpm exec vitest run tests/v4-*.test.ts
→ 17 files passed / 122 tests passed / 12.91s

pnpm test
→ 64 files passed / 7 skipped (71)
→ 394 tests passed / 36 skipped (430)
→ 160.68s
```

## 4. 世界状态与启动

- 旧活动世界 `world-vienna-1912-vmvyrtquw` 已于 2001 年自然到达 horizon，状态 `archived`，实体与事件保留。
- 自动启动的无玩家世界 `world-vienna-1912-vmvytn6cs` 已归档，原因写明“无观察者角色，保留实体与事件”。
- 最终世界 `world-vienna-1912-playable-mvytzmqe` 从 1912 年 1 月开始；由 `pnpm dev` 启动后每 30 秒推进一年。验收时已推进到 1918 年，并已通过真实 DeepSeek Macro Director 提案（3,329 tokens，revision 4）应用了 1915 年战争动员、配给与稳定度变化；运行时内容 worker 又真实生成了 11,476-token 的 `vienna-social-movement` 包并发布。
- 启动后打开 <http://localhost:5173>。

## 5. 仍未完成

1. 年度事件月份分配造成少量“死亡日期之后的普通事件”；API 已隐藏，未从 canonical 事实层修复。
2. 旧 1912 内容仍占晚期生活的大部分；战后 16 场景只是补充，不是完整 1946–2000 生活库。
3. 多地区长期真实 LLM Director、跨区组织/迁移对账仍未完成。
4. Runtime Content Author 自动 enqueue 仍主要覆盖 social_change；没有完整 war/epidemic/famine 通用服务。
5. 20k PostgreSQL/API/WAL/恢复/内容密度没有实测；只有简化 in-memory 20k。
6. 背景具名化的职业/阶层/家庭联合分布仍是简化抽样；具名迁移后的工作/关系/组织资格未完整对账。
7. 本 seed 的 12 人物演示只有 2 人活到 80；死亡率偏严酷，尚未做来源校准。
8. 出生契约回退只覆盖五种白名单能力，不是任意自由祝愿。

## 6. 结论

这一版可以实际打开、注册、生孩子并观察一条持续到 2000 年的生活线；家庭、死亡、求偶、生育、战后内容和观察器已经形成可运行纵向链路。它不再是“只有架构和 mock”的状态，但仍不是完整 10k 生产世界：人口结构、历史多地区、内容工厂通用化、20k 持久化和部分 canonical 时间顺序问题仍然存在。

**不能宣称**：完整 Phase 5、所有出生祝愿可执行、20k 生产容量、长期多地区 LLM、或公网已部署。
