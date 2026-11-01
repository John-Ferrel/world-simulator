import { readFile, writeFile } from 'node:fs/promises';
import pg from 'pg';
const read = async (path: string) => JSON.parse(await readFile(path, 'utf8'));
const long = await read('docs/metrics/headless-150.json'),
  horizon = await read('docs/metrics/headless-300-slow-research.json'),
  load = await read('docs/metrics/sse-load.json'),
  reconnect = await read('docs/metrics/sse-reconnect.json');
if (
  long.seeds.length !== 3 ||
  !long.seeds.every((s: any) => s.focusEvents) ||
  horizon.seeds[0].months !== 3600
)
  throw new Error('Final long-run artifacts are incomplete');
const tests = await readFile('.data/tests-final.log', 'utf8'),
  build = await readFile('.data/build-final.log', 'utf8'),
  e2e = await readFile('.data/e2e-final.log', 'utf8');
const testCount = Number(tests.match(/Tests\s+(\d+) passed/)?.[1]);
if (!testCount || !build.includes('built in') || !e2e.includes('2 passed'))
  throw new Error('Verification evidence not passing');
const db = new pg.Pool({
  connectionString: process.env.E2E_DATABASE_URL ?? 'postgres://localhost:55432/living_world_e2e',
});
const shared = (
  await db.query(
    "SELECT payload FROM events WHERE person_ids @> ARRAY['person-world-1-browser1:browser-alice','person-world-1-browser1:browser-bob']::text[] ORDER BY cursor LIMIT 1",
  )
).rows[0]?.payload;
if (!shared) throw new Error('Missing recorded shared browser event');
const databaseBytes = Number(
  (await db.query('SELECT pg_database_size(current_database()) AS bytes')).rows[0].bytes,
);
await db.end();
const backup = await read('.data/backup-final.json');
const backedUp = backup.worlds.find((w: any) => w.status === 'running');
const restoreDB = new pg.Pool({
  connectionString: 'postgres://localhost:55432/living_world_restore_final',
});
const restored = (
  await restoreDB.query('SELECT revision,checksum FROM worlds WHERE id=$1', [backedUp.id])
).rows[0];
await restoreDB.end();
if (restored?.checksum !== backedUp.checksum)
  throw new Error('Backup restoration checksum differs');
const metrics = long.seeds
  .map(
    (s: any) =>
      `| ${s.seed} | ${s.months / 12} | ${s.terminalReason ?? s.reason} | ${(s.elapsedMs / 1000).toFixed(2)} | ${Math.round(s.finalMemoryBytes / 1048576)} | ${s.population.toLocaleString('en-US')} | ${s.eventCount.toLocaleString('en-US')} |`,
  )
  .join('\n');
const slow = horizon.seeds[0];
const histories = long.seeds
  .map((s: any, i: number) => {
    const p = s.firstPerson,
      focus = s.focusEvents;
    const examples = [
      'encounter',
      'friendship',
      'partnership',
      'bereavement',
      'innovation',
      'death',
    ]
      .map((kind) =>
        focus.find((e: any) => e.kind === kind && (kind !== 'death' || e.personIds[0] === p.id)),
      )
      .filter(Boolean);
    const evidence = examples
      .map(
        (e: any) =>
          `- 第 ${(e.month / 12).toFixed(2)} 年，\`${e.id}\`：${e.text}${e.causeIds.length ? `（直接来源：${e.causeIds.map((id: string) => '`' + id + '`').join('、')}）` : ''}`,
      )
      .join('\n');
    return `### ${i + 1}. ${s.seed}\n\n${p.name}在初始化时 ${Math.floor(-p.birth / 12)} 岁，最终因${p.deathCause}离世，终年 ${Math.floor((p.death - p.birth) / 12)} 岁。全世界记录 ${s.kinds.war_started ?? 0} 次边境冲突、${s.kinds.birth ?? 0} 次具名出生、${s.kinds.conviction_changed ?? 0} 次困顿引发的目标转变。以下直接摘录该人的实测事件，不是另外编写的故事：\n\n${evidence}\n\n可以沿相遇 → 信任/共同生活，以及失去 → 记忆/目标变化的引用检查因果。首个人物是预置议事长，不代表所有普通人物都具有相同影响力。\n`;
  })
  .join('\n');
const verification = {
  recordedAt: new Date().toISOString(),
  environment: long.environment,
  tests: { command: 'pnpm test:integration', passed: testCount, files: 4 },
  typecheck: { command: 'pnpm typecheck', passed: true },
  build: { command: 'pnpm build', passed: true, warning: 'Pixi bundle exceeds 500 kB before gzip' },
  browser: { command: 'pnpm test:e2e', passed: 2, sharedEvent: shared },
  load,
  reconnect,
  databaseBytes,
  backupRestore: {
    worldId: backedUp.id,
    revision: Number(restored.revision),
    checksum: restored.checksum,
    result: 'exact',
    commands: [
      'pnpm admin backup .data/backup-final.json',
      'DATABASE_URL=postgres://localhost:55432/living_world_restore_final pnpm admin restore .data/backup-final.json',
      'DATABASE_URL=postgres://localhost:55432/living_world_restore_final pnpm admin verify',
    ],
  },
};
await writeFile('docs/metrics/verification.json', JSON.stringify(verification, null, 2));
await writeFile(
  'docs/implementation-report.md',
  `# 实现与验收报告\n\n本地可运行的共享世界游戏已交付，主要游戏流程及所有主要模拟子系统均有真实可执行状态。公开托管、真实付费模型与 Docker 运行验证没有被冒充为完成。下面区分实现能力、实际测量和未覆盖的生产验证。\n\n## 已执行的检查\n\n环境：Ubuntu 24.04 / WSL2，Node ${long.environment.node}，pnpm 10.32.1，用户目录内 PostgreSQL 16.15；${long.environment.cpu}，${long.environment.cores} 个逻辑核心，主机内存约 ${(long.environment.hostMemoryBytes / 1073741824).toFixed(1)} GiB。部分长跑与浏览器测试同时执行，因此这些时间不是独占机器的 SLA。\n\n| 命令 | 实际结果 |\n|---|---|\n| \`pnpm install --frozen-lockfile --offline\` | 通过；锁文件一致，离线缓存安装和 esbuild 安装脚本成功 |\n| \`pnpm test:integration\` | ${testCount} 项通过，4 个测试文件；真实 PostgreSQL + 本地 HTTP 模型替身 |\n| \`pnpm typecheck\` | 通过 |\n| \`pnpm build\` | TypeScript 与 Vite 构建通过；Pixi 仍有一个超过 500 kB 的未压缩 bundle 提示 |\n| \`pnpm test:e2e\` | Chromium 2 项通过；桌面、390px 手机、两账户共享事件、补看、回放、只读归档 |\n| \`pnpm load\` | 100 个观察者完成 400 次初始化读取并维持 100 个 SSE 连接 |\n| \`pnpm exec tsx scripts/reconnect.ts\` | Last-Event-ID 断线续传与规范事件查询一致；0 重复、0 缺失 |\n| \`pnpm admin backup / restore / verify\` | 独立空库恢复通过；revision 35 的规范状态校验和完全一致 |\n\n本机 Chromium 缺失的系统库通过忽略目录 \`.data/browser-libs\` 提供；实际执行浏览器命令时附加了 \`LD_LIBRARY_PATH=$PWD/.data/browser-libs/root/usr/lib/x86_64-linux-gnu\`。标准装好依赖的机器和 CI 不需要此路径。浏览器测试会清空专用 \`*_e2e\` 库，集成测试使用独立 \`living_world_test\`，不清空运行中的游戏。\n\n## 长期模拟与负载\n\n以下是最终规则的无网络、无数据库纯核心长跑。150 年命令为 \`BENCH_YEARS=150 BENCH_SEEDS=3 pnpm benchmark\`；为了可重复地结束测试，其管理年限设为 150 年。正常游戏默认仍为 300 年。\n\n| 种子 | 演化年数 | 归档原因 | 墙钟秒数 | 最终 RSS MiB | 最终人口 | 事件数 |\n|---|---:|---|---:|---:|---:|---:|\n${metrics}\n\n300 年命令为 \`BENCH_YEARS=300 BENCH_SEEDS=1 BENCH_RESEARCH_RATE=0.1 pnpm benchmark\`：实际经过 3,600 个月，以 \`horizon\` 归档，耗时 ${(slow.elapsedMs / 1000).toFixed(2)} 秒，最终 RSS ${Math.round(slow.finalMemoryBytes / 1048576)} MiB，人口 ${slow.population.toLocaleString('en-US')}，${slow.eventCount.toLocaleString('en-US')} 条事件，${slow.kinds.birth ?? 0} 次具名出生。研究速度 0.1 是明确的稳定测试场景，避免知识变革提前终结；没有直接设置终结状态或伪造灾难。\n\n100 观察者测试初始化读取 p95 为 ${load.bootstrapP95Ms.toFixed(1)} ms，SSE 建连 p95 为 ${load.connectP95Ms.toFixed(1)} ms，${(load.elapsedMs / 1000).toFixed(2)} 秒内收到 ${load.events.toLocaleString('en-US')} 条记录，0 重复游标；测试时实际有 ${load.world.population.toLocaleString('en-US')} 人、${load.world.named} 位具名人物和 ${load.world.settlements} 个聚落。包含真实模拟月提交期间的推送。这是短期本机测试，不是公网长期并发保证。浏览器流程结束时，独立测试库实际大小 ${(databaseBytes / 1048576).toFixed(1)} MiB。\n\n纯核心长期检查没有把 150/300 年全部写入 PostgreSQL；数据库故障恢复、归档、备份和浏览器流程另行用真实库验证。完整周期的数据库容量、磁盘恢复时间和公网持续流量仍需部署环境实测。初期质量诊断保留在 \`metrics/baseline\` 与 \`metrics/social-baseline\`；最终验收数据为根目录的 \`headless-150.json\`、\`headless-300-slow-research.json\` 和 \`verification.json\`。\n\n## 验收矩阵\n\n| 要求 | 状态 | 实现与证据 |\n|---|---|---|\n| 单一共享世界、统一时钟、一个活动纪元 | complete | PostgreSQL 唯一索引，原子纪元切换；模拟器离线推进，持久化墙钟水位且不跳过逻辑月 |\n| 权威唯一写入、原子历史、fencing | complete | 事务内 lease 行锁、epoch 校验、revision、状态补丁、事件和 outbox 同提交；旧写入者拒绝 |\n| 完整恢复、崩溃前后与幂等 | complete | 检查点 + 无损 journal 校验和；提交前回滚、提交后恢复、重复指令和模型回复检查 |\n| 30–50 聚落、5–8 势力、50k+ / 1k 人物 | complete | 默认 36 / 6 / 65,520 / 1,000，真实群体人口与具名身份 |\n| 地理、粮食、贸易、人口、政治和冲突 | complete | 相邻路线、容量限流的真实粮食/钱币转移、价格与工资、税收、合法统属、军需/伤亡/边界变化 |\n| 人物心理、关系、生命史与无主角保护 | complete | 持久目标、记忆、信念、承诺、计划、信任、家庭、出生、衰老、继承和不可逆死亡；匹配玩家/NPC 规则完全相同 |\n| 经历引起的性格/目标变化 | complete | 困顿和亲密关系损失引用真实来源；普通熟人的离世只产生低显著记忆，避免无差别身份剧变 |\n| 可执行 Actions / Processes / Institutions / Agent Policies | complete | 严格版本化、费用/维护/TTL/上限；运行中的迁居、研究、招募与机构过程；禁止生成代码 |\n| 新机构、研究与文化扩散三条路径 | complete | 公会、学社、互助议会；实际增益的持久发现；愿意接纳的本地联系人采用有期限政策 |\n| 机构独立于创办者和模型存续 | complete | 会费/维护、继任、解散、可选章程分裂；创办者死亡后继续运作的机制测试 |\n| 受限自然语言创建与先确认后入场 | complete | 本地受限解析和可选模型解析；展示规范化结果；消费现有成年群体人口，钱币有来源 |\n| 认证、并发创建、隐私与输入边界 | complete | scrypt 密码、哈希会话、SameSite/来源检查、限流、严格 schema、1 位在世人物/账户；原始描述与私人心理不公开 |\n| 创造性模型异步、预算、过期和 fallback | complete | 分类型任务、全局/人物 token 预留、超时、观测事实、actor version/deadline、失败审计；本地 HTTP 替身验证 |\n| 三栏人物/纪事/实际地图 | complete | React、组合像素人物、Pixi 地形/势力/聚落/位置；手机适配，轻量预览，公开世界活动 |\n| 补看、完整历史分页、独立回放 | complete | 事件来源 ID、向前/向后分页、每月地图投影；历史心理不从当前值反推 |\n| 两位用户共享事实与各自视角 | complete | 浏览器中真实独立登录，人物在第 ${shared?.month ?? 107} 个月合法相遇，共享 \`${shared?.id ?? 'see verification.json'}\` |\n| SSE 单调游标和重连 | complete | 事务 outbox、Last-Event-ID、回填；100 观察者与显式断线检查 |\n| 动态终结、明确 horizon、只读档案 | complete | 持续全局崩溃、实际知识变革和运营年限分别验证；已封存世界与事件有 SQL 不可修改约束 |\n| 运维、备份恢复、诊断、默认世界包 | complete | CLI init/status/pause/resume/speed/close/verify/backup/restore；原创包、字体许可、部署文档和 CI |\n| 真实外部模型调用 | blocked | 没有提供付费 API 凭据；只验证了兼容协议的模拟服务，未声称真实模型可用或计费正常 |\n| Docker Compose 运行 | blocked | 配置与 Dockerfile 已提供，本机没有 Docker daemon 且无 sudo 授权；本地同栈实际启动成功 |\n| 公网托管/生产负载和长期数据库容量 | blocked | 没有托管环境；不把本地服务冒充为公开上线 |\n\n## 三段实际生成的历史\n\n完整采样和个人事件在 [150 年记录](metrics/headless-150.json)；诊断只保留选样，正常游戏数据库则保留完整事件账本。\n\n${histories}\n## 质量观察与能力边界\n\n- 早期诊断曾几乎没有具名家庭形成；熟人接触权重修正后，每个最终 150 年样本实际出现 ${long.seeds.map((s: any) => s.kinds.birth ?? 0).join(' / ')} 次具名出生。没有硬编码婚配或出生配额。\n- 早期所有熟人离世都触发大幅反思，产生过多丧亲文字；现在只有亲密关系进入强烈目标变化，其余保留低显著见闻。年度平静生活仍占事件主体，模板文字会重复，这不等同于艺术质量已经通过测试。\n- 经济只细分主粮与钱币，群体人口按月推进；军力、边境冲突和税制是聚合规则。没有完整工业商品链、个体物理移动或通用司法/财产权模拟。\n- 创造性只覆盖本包声明的四种动作、三种机构机制及三种政策偏向。未知魔法或不受支持的制度不能凭文本生效；摘要是有事实来源的摘录式选择，不保证自由散文创作。\n- 用户输入的公开显示有基础隐私/敏感内容过滤与抽象暴力描述，但这不是已经运营成熟的社区治理体系。\n- 当前规范状态使用 JSONB 投影和整组字段补丁，查询通过 revision 共享反序列化缓存。长期历史人物仍然增长；扩大负载前应实测磁盘、内存、分区与读模型。没有把 100 人短时测试宣称为无限容量。\n\n[机器可读验收证据](metrics/verification.json) · [桌面截图](metrics/observer-desktop.png) · [手机截图](metrics/observer-mobile.png)\n`,
);
console.log({
  report: 'docs/implementation-report.md',
  tests: testCount,
  browser: 2,
  sharedEvent: shared?.id,
});
