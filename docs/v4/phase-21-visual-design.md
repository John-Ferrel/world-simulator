# Phase 21 — Visual Design & Asset Pipeline

日期：2026-11-08  
范围：PaperDoll、自动外观、世界地图、观察界面视觉。  
原则：不复制 DoL 的受版权保护素材；借鉴分层纸娃娃的组织方式，使用仓库已有 LPC 资产与原创组合/CSS。

## 1. PaperDoll 资产规范

### 1.1 来源

- 现有 `apps/web/public/lpc/`：Universal LPC Spritesheet Character Generator 的 64×64 walk sheet。
- 许可证与作者在 `apps/web/public/lpc/LICENSES.txt`、`CREDITS.csv`、`catalog.json` 中逐项登记（OGA-BY 3.0 / CC-BY-SA 3.0 / GPL 3.0）。
- 新增代码只做图层合成、裁剪、缩放、着色和职业配件选择，不修改原始素材授权。

### 1.2 图层与 z-order

当前 catalog slots：

| z 区间 | slot | 作用 |
|---:|---|---|
| 10 | body | 身体/肤色 |
| 20 | head | 头型/肤色 |
| 30 | eyes / brows / nose / ears / expression | 面部 |
| 40 | hair / beard | 发型与胡须 |
| 50 | bottom / shoes | 下装与鞋 |
| 60 | top | 上衣 |
| 70 | coat | 外套 |
| 80 | glasses / mask / earrings | 面部配件 |
| 90 | hat / backpack | 外层配件 |

`appearanceLayers()` 统一返回 `{asset, color, scale}`，由 `PaperDoll` 按 z 排序绘制。

### 1.3 年龄与身体

- `age < 3`：child body + child head，无头发或短发型，绘制比例 0.76。
- `3–12`：child body，比例 0.88。
- `13–17`：teen body。
- `18–64`：adult（female/male/muscular）。
- `65+`：elderly head + 灰白发色。
- 死亡：灰度 + 降低亮度；低健康：面部小标记。

### 1.4 自动服装

玩家不管理装备。系统根据公开身份自动叠加：

- 医生/官员/Beamter：深色外套 + 圆框眼镜。
- 学生/学徒/学者：背包 + 眼镜。
- 士兵：深色外套。
- 艺术家/画家：头巾。
- 儿童不叠加成人职业配件。
- 显式 `doll` 选择优先于自动层。

这套规则只改变视觉，不改变 State/属性；未来可接入财富、季节、时代与特殊 State。

### 1.5 肖像构图

- 舞台 260px；内框、聚光、地面阴影、状态标签。
- 64×64 合成后裁掉透明边距，按目标高度 184px（婴儿 76%）绘制到 192×192 canvas。
- 素材加载失败：显示姓名首字 fallback；不出现空白框。
- 出生页预览继续使用同一 PaperDoll，保持创建/观察一致。

## 2. 世界地图规范

### 2.1 数据

- `apps/web/public/earth/countries.geojson`：177 个 Feature，Polygon/MultiPolygon。
- 投影：等距圆柱；经度 -180..180 → 0..720；纬度 85..-85 → 0..360。
- 城市坐标硬编码在 `WorldMap.tsx`，只用于可点击的 v4 settlement：
  - 维也纳 48.2082N, 16.3738E → `place-wien`
  - 克洛斯特新堡 48.3049N, 16.3255E → `place-klosterneuburg`
- 其他世界城市（伦敦、巴黎、柏林、罗马、伊斯坦布尔、莫斯科、开罗、纽约、东京等）只作尺度参照，不参与模拟。

### 2.2 视觉

- 深海底色 `#0b171b`；陆地 `#30443a`；国界 `#16241f`；经纬线低透明度。
- 当前人物：金色脉冲环；当前选中/查看城市：橙色点。
- 城市标签只在高 zoom 或 major 城市显示，避免 390px 右栏拥挤。
- 控件：全球 / 欧洲 / 人物；滚轮缩放；拖动平移；+/− 按钮。

### 2.3 未来扩展

- 历史国界（逐年 GeoJSON/TopoJSON）；
- 迁移路线、战争战线、历史事件位置；
- 地点故事层与“此处发生过什么”；
- 地图与日志联动（点击事件定位）。

## 3. 观察界面

- 三栏：290px 人物 / 自适应日志 / 390px 世界。
- 左栏：肖像 → 姓名/年龄/身份 → 住处/教育/角色 → 人生片段 → 家庭 → 关系 → 历史关系。
- 中栏：个人日志，最新在上，按年份分组；“重大”标签。
- 右栏：真实世界地图 → 在场人物 → 时代 → 历史进程 → 历史遗产 → 公开事件。
- 桌面优先；980px 以下纵向堆叠。
- 当前限制：地图不显示历史边界；历史进程卡仍偏解释性；没有家庭账本/State 可视化。

## 4. 截图

- 修复前：`docs/v4/phase-21-audit-observer.png`（肖像空白、维也纳示意图）。
- 修复后：`docs/v4/phase-21-ui-first.png`（肖像可见、真实世界地图、家庭出生文本）。
- 最终试玩截图在 `docs/v4/phase-21-playtest.md` 引用。
