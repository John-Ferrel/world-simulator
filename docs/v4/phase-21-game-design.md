# Phase 21 — Make It a Game 设计

日期：2026-11-08  
目标：让 Another History 从“机制丰富的人生模拟器”变成“玩家愿意持续观看的命运游戏”。  
原则：**Fun >> Rigor. Drama, Surprise, Emotion & Creativity.** 不重写 Engine；优先复用 State / Event / Outcome / AdaptiveContext / Content Factory / Persistence。

## 1. 产品承诺

玩家在出生时写下一个人的名字、身体、家庭位置与自由祝愿，然后观察这个人在真实历史背景中自行生活。玩家的主要动作是：

1. 看人物；
2. 看世界；
3. 读日志；
4. 对下一步产生好奇。

Phase 21 不把游戏改成需要频繁点击的 RPG，而是让“观察”本身更有吸引力。

## 2. 五个体验支柱

### 2.1 人物必须先被看见

左侧人物不是装饰，而是玩家情感连接的锚点。要求：

- 人物在出生后立即可见，不因 flex 压缩/素材失败而消失；
- 年龄、职业、死亡、低健康、表情有视觉差异；
- 服装与身份有最低限度的自动变化；
- 素材失败时有可读的 fallback，不出现空白。

### 2.2 世界必须是世界

右侧地图必须首先是真实地球，而不是城市关系示意图。要求：

- 使用真实国家/陆地轮廓；
- 维也纳与克洛斯特新堡有真实经纬度；
- 当前人物位置有标记；
- 支持全球/欧洲/人物视角、缩放与拖动；
- 未来可加历史边界、迁移路线、战争战线。

### 2.3 出生就是故事

出生事件不能只是“某人在某地出生”。要求：

- 文本包含母亲/父亲、职业、家庭现金/债务、兄弟姐妹、拥挤程度；
- 出生后立即显示人物、家庭、住处、愿望、世界位置；
- 0–5 岁有持续的家庭/儿童事件，而不是等到 5 岁才出现第一条日志。

### 2.4 戏剧性必须进入自然人生

Phase 20 的 adaptive context 机制保留；Phase 21 增加高戏剧内容，但必须：

- 主 eligibility 宽，不靠稀有双 State；
- 有真正的动机、秘密、误会、反转和代价；
- 结果能持久（State/Relation/Position/Knowledge/Flag/Cash/Health）；
- 通过 adaptive context 对人物处境敏感；
- 在自然人生中实际出现，而不是只在受控实验里。

### 2.5 观察界面要能读

- 日志仍是核心；
- 个人事件、家庭事件、世界事件有层次；
- 重要事件有“重大”标记；
- 新事件到达有反馈；
- 左侧人物、右侧地图、中央日志互相指向。

## 3. 本阶段实现

### 3.1 PaperDoll / 人物

- 修复 `.person-pane` flex 压缩导致 `.portrait` 高度变成 2px 的 bug；固定 260px 肖像舞台。
- 64×64 LPC 图层先在离屏 canvas 合成，裁掉透明边距，再按年龄比例绘制到 192×192 canvas；人物不再缩在角落。
- 自动职业/身份配件：医生/官员眼镜与外衣、学生背包、艺术家头巾；年龄阶段控制儿童/少年/老年头身与发色。
- 素材失败时显示姓名首字 fallback；死亡灰度、低健康标记保留。
- 肖像舞台增加内框、聚光、地面阴影、状态标签。

### 3.2 世界地图

- 新增 `apps/web/src/WorldMap.tsx`，读取 `apps/web/public/earth/countries.geojson`（177 个国家/地区轮廓）。
- 等距圆柱投影；默认欧洲视角，支持全球/欧洲/人物、滚轮缩放、拖动。
- 维也纳、克洛斯特新堡真实经纬度；当前人物位置金色脉冲环；世界城市作为尺度参照。
- 右侧 pane 从 `ViennaMap` 切换为 `WorldMap`；点击城市按 settlement 前缀列出在场人物。
- 数据来源：仓库已有 Earth 地理数据；不新增外部运行时依赖。

### 3.3 出生与早期人生

- `createV4Birth` 的 birth event 文本加入家庭细节：父母姓名/职业、现金/债务、兄弟姐妹、拥挤程度。
- 保留出生愿望事件；愿望只是机会与注意力，不是命令。
- `vienna-life` 通用场景增加：
  - `vienna-life-infant-first-smile`（0–1，rate 0.55）
  - `vienna-life-toddler-first-words`（1–3，rate 0.55）
  - `vienna-life-toddler-accident`（2–4，rate 0.38）
  - `vienna-life-child-family-legend`（3–5，rate 0.5）
  - `vienna-life-child-first-friend`（4–6，rate 0.5）
- 提高已有 infant feeding/fever 的 rate（0.6/0.45），让玩家孩子不再等到 5 岁。
- 所有通用场景 `subjectProvenance: ['birth']`，不会污染作者种子人物。

### 3.4 戏剧内容

- 新增并注册 `pack-dramatic-lives`：16 kernels、2 states、71 adaptive contexts、16 check kernels、16 conditional-outcome kernels、224 compiled scenes。
- 方向：秘密继承人、爱情×权力、背叛、公开羞辱、复仇、荒诞继承、身份错位、假死、勒索婚礼、暴富/破产、家族秘密、假认罪、决斗、旧敌归来、可疑死亡、公共奇观。
- 使用现有 State + AdaptiveContext；每个 Kernel 至少有 2 个 optional contexts，至少 8 个带 check，至少 8 个 conditional outcome。
- 结果必须持久；不以 mood 代替重大转折。

### 3.5 观察界面

- 保持三栏：人物 / 日志 / 世界。
- 肖像固定；地图真实；日志保持最新在上、按年份分组。
- 新增世界地图控件与人物定位；日志“重大”标签保留。
- 后续可加新事件 pulse、家庭账本、State 可视化；本轮先保证人物/地图/日志三件事成立。

## 4. 非目标

- 不做完整 3D 地球或 GIS 平台；
- 不做逐年历史国界（数据工作留待后续）；
- 不做装备管理/任务管理 UI；
- 不做多人/MMO；
- 不重写 State/Event/Engine；
- 不用 LLM 即兴替代 Runtime 因果；
- 不复制 Degrees of Lewdity 的受版权保护资产；只借鉴分层纸娃娃的组织方式，使用仓库已有 LPC 资产（OGA-BY/CC-BY-SA/GPL）与原创 CSS/组合逻辑。

## 5. 验收

- 真实浏览器截图：人物可见、地图为真实世界、出生日志有家庭细节；
- Engine 7 年儿童 cohort：≥10 条儿童/家庭事件，0–5 岁无长空白；
- Drama pack 验证通过，并在自然/受控运行中出现；
- 独立 Critic 阅读真实人生，给出具体场景与分数；
- `pnpm test` / `tsc` / `build` / `v4:validate-packs` 通过；
- 报告明确未完成项（美术精度、历史边界、drama 自然分布等）。
