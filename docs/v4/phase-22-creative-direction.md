# Phase 22 — Creative Direction

日期：2026-11-09  
基线：Phase 21 `10925ba` — 113 states / 2,124 kernels / 32 packs；Critic Life 19/30、Scene 24/30；自然 A/B/C 61,718 events / 5,123 focal；drama 203 world / 22 focal（0.43%）；repeatRate 0.2423。  
目标：不是再加一个 Drama Pack，而是让整个内容库和人物表现都更接近“狗血、荒诞、有情感、让人想继续看”的游戏。

## 1. 创意审计

Phase 21 的真实体验问题不是“没有戏剧内容”，而是：

- **高频内容仍是日常结算**：focal 日志里最多的是 `agency:support_process`、`raising-child` state tick、`statistical_illness`、学校/邻里/房租/工伤等 base scenes。
- **Drama 太稀**：Phase 21 drama pack 只有 16 kernels，自然 focal share 0.43%；24 个 focal lives 中 17 个没有任何 drama kernel。
- **Drama 太集中**：`p21-elder-testimony`、`p21-mistaken-identity`、`p21-absurd-inheritance` 占世界 drama 的 74%；elder-testimony 在同一人物身上重复 4–6 次。
- **早期人生仍偏薄**：Phase 21 把 0–5 从空白变成 16 条事件，但仍有 15–16 个月空档；多数是喂养/生病/学校，缺少家庭秘密、荒诞巧合和真正的命运钩子。
- **人物仍不是“肖像”**：LPC 64×64 放大后只是可见，不是值得凝视的角色；职业/年龄/状态变化有限。
- **系统不可见**：State 参数、adaptive context 匹配、经济/组织后果大多不在 UI 里；玩家看到的是文本，不是可追踪的因果。

## 2. Phase 22 创意原则

1. **故事先于 Schema。** Authors 先写前提、人物欲望、秘密、误会、反转、荒诞结局；Mechanics Architect 再决定 State/Event/Outcome/AdaptiveContext。
2. **戏剧不等于黑暗。** 至少 1/3 的新内容应是温暖、幽默、反讽、荒诞或意外善意；不要把所有人物写成倒霉蛋。
3. **多人物动机。** 好故事至少有两个人想要不同的东西；最好还有第三个人误解了局面。
4. **成功可以有代价，失败可以打开新路。** 每个高价值 Kernel 至少有一个“意外代价/意外机会” outcome。
5. **常见内容也要被处境改变。** 求职、房租、学校、婚礼、葬礼、邻里纠纷、贷款、疾病都应对 fame/scandal/curse/debt/relationship history 敏感。
6. **早期人生用家庭视角。** 婴儿不行动；父母、亲属、邻居、产婆、医生、时代压力替他们行动。
7. **人物要能被爱上。** 原创肖像、年龄变化、职业服装、状态表情和可读的家庭关系，比多 10 个数值更重要。
8. **Drama Density 是产品指标。** 目标不是“新 Pack 占比”，而是多数成年人生有 2–4 个值得记住的 kernel 事件，前 15 分钟至少一个。

## 3. 本阶段工作包

### A. Dramatic Overhaul Pack

`pack-dramatic-overhaul`：

- 20 kernels、2 states（`p22-scandal-engine` / `p22-wild-fortune`）。
- 高权重（2.0–3.2）、宽 primary eligibility，覆盖爱情×权力、荒诞继承、身份错位、黑色喜剧、家庭秘密、意外善意。
- 每个 Kernel 3–4 outcomes、3–5 adaptive contexts；至少 8 个 check、10 个 conditional outcome。
- 目标：让戏剧不只属于 Phase 21 的 16 条，而是成为内容库的一层。

### B. Early-Life Drama Pack

`pack-early-life-drama`：

- 16 kernels、2 states（`p22-family-legend` / `p22-child-omen`）。
- 年龄 0–7，`subjectProvenance: ['birth']`，家庭/产婆/邻居/医生/官方角色。
- 高 baseRate 0.32–0.6；温暖、滑稽、诡异、黑暗各 4 条。
- 目标：出生后每 1–2 年都有家庭故事，不再只有喂养/发烧。

### C. 旧内容 Retrofit

优先 retrofit 高频 base scenes 和旧 Pack 中反复出现的日常内容：

- 房租、学校、邻里、工伤、求偶、葬礼、贷款、求职。
- 通过 AdaptiveContext（weight/check）和 conditional outcome，让同一事件因 fame/scandal/grief/debt/relationship history 而不同。
- 不重写全部 2,124 kernels；先做高影响、可验证的一层。

### D. 原创人物美术

- 新增 `OriginalPortrait`：200×240 SVG 分层半身像，包含头型、脸、眼、眉、鼻、嘴、头发、服装、领口、纽扣、职业配件、状态配件、年龄阶段、表情。
- 不再以“放大 LPC”作为美术升级；LPC 只保留为旧资产/fallback。
- 自动外观：年龄、性别、职业/角色、fame/scandal/grief/chronic-illness/debt-bondage/office-patronage/cursed-by-wish、健康/情绪。
- 目标：人物可辨认、可凝视、有年龄和身份差异；不是 DoL 级，但明显超过 64×64 地图小人。

### E. 真实试玩与 Critic

- 浏览器：出生、0–5、成年、drama、地图、肖像。
- 自然 A/B/C：与 Phase 21 同条件对比；新增随机 seed。
- 独立 Critic：阅读真实人生，不只读单个 Scene；给出具体精彩/失败片段。
- 至少一轮内容/视觉修订后再试玩。

## 4. 不做什么

- 不重写 Entity/State/Event/Outcome/Engine。
- 不做装备管理/任务管理 UI。
- 不做完整 3D 地球或逐年历史国界。
- 不复制 DoL 资产；只借鉴分层纸娃娃的组织方式。
- 不用 LLM 即兴替代 Runtime 因果。
- 不把“新增 20 个 Kernel”当作戏剧体验已经解决。

## 5. 验收

- 新内容真实注册、验证、在自然人生中出现；不是只存在文件里。
- 浏览器真实截图：原创肖像、地图、出生/早期日志。
- 0–5 岁持续有家庭/儿童事件；至少 1 个家庭秘密/荒诞钩子。
- 自然 A/B/C 的 drama focal share、repeatRate、早期事件数可对比 Phase 21。
- 独立 Critic 给出 Scene/Life 分数、具体片段和失败案例。
- 测试、typecheck、build、32+ packs validate 通过。
