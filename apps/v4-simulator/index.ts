import { pool } from '../../packages/storage/index.js';
import { advanceV4Year } from '../../packages/v4/engine.js';
import { createV4Birth } from '../../packages/v4/birth.js';
import {
  applyViennaTimeline,
  VIENNA_1912_SCENES,
  VIENNA_1912_SEED,
} from '../../packages/v4/content/vienna-1912.js';
import { VIENNA_FAMILY_SCENES } from '../../packages/v4/content/vienna-family.js';
import { VIENNA_LIFE_SCENES } from '../../packages/v4/content/vienna-life.js';
import {
  activeV4WorldMeta,
  enqueueMissingV4BirthContracts,
  enqueueV4BirthContract,
  loadActiveV4World,
  markV4Birth,
  migrateV4,
  pendingV4Births,
  saveV4World,
  seedV4World,
  type V4BirthRequest,
} from '../../packages/v4/store.js';

const LOCK_KEY = 880103;
const client = await pool.connect();
const lock = (await client.query('SELECT pg_try_advisory_lock($1) AS locked', [LOCK_KEY])).rows[0]
  ?.locked;
if (!lock) {
  console.error('v4 simulator: another writer holds the advisory lock');
  process.exit(1);
}

await migrateV4();
await enqueueMissingV4BirthContracts();
if (!(await activeV4WorldMeta())) {
  await seedV4World(VIENNA_1912_SEED);
  console.log('v4 simulator: seeded Vienna 1912');
}

let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopped = true;
  });

const economyEnabled = process.env.V4_ECONOMY !== '0';
const horizonYear = Number(process.env.V4_HORIZON_YEAR ?? 2000);

while (!stopped) {
  const started = Date.now();
  try {
    const active = await loadActiveV4World();
    if (!active) {
      console.log('v4 simulator: no active world; exiting');
      break;
    }
    let world = active.world;
    let revision = active.meta.revision;

    const pending = (await pendingV4Births(world.id)) as unknown as Array<
      V4BirthRequest & { user_id: string; life_mode: 'ordinary' | 'legendary'; userId?: string }
    >;
    for (const row of pending) {
      try {
        const child = createV4Birth(
          world,
          {
            name: row.name,
            sex: row.sex as any,
            health: row.health,
            body: row.body ?? undefined,
            wish: row.wish,
            lifeMode: row.life_mode ?? row.lifeMode ?? 'ordinary',
            appearance: row.appearance as any,
          },
          row.id,
          row.user_id ?? row.userId,
        );
        revision = await saveV4World(child.world, revision, { lastTickAt: Date.now() });
        await markV4Birth(row.id, 'born', child.childId);
        await enqueueV4BirthContract(world.id, child.childId, row.id).catch((error) => {
          console.error('v4 birth contract enqueue failed', row.id, (error as Error).message);
        });
        world = child.world;
        console.log(
          JSON.stringify({
            kind: 'v4-birth',
            world: world.id,
            child: child.childId,
            date: world.date,
          }),
        );
      } catch (error) {
        await markV4Birth(row.id, 'failed', undefined, (error as Error).message.slice(0, 240));
        console.error('v4 birth failed', row.id, (error as Error).message);
      }
    }

    const meta = await activeV4WorldMeta();
    if (!meta) continue;
    const elapsed = Date.now() - meta.lastTickAt;
    if (elapsed >= meta.secondsPerYear * 1000) {
      const timeline = applyViennaTimeline(world);
      const result = advanceV4Year(
        timeline,
        [...VIENNA_1912_SCENES, ...VIENNA_LIFE_SCENES, ...VIENNA_FAMILY_SCENES],
        {
          economy: { enabled: economyEnabled },
          maxScenesPerPerson: 1,
        },
      );
      if (result.world.date.year > horizonYear) {
        result.world.status = 'archived';
        result.world.terminalReason = `历史地平线 ${horizonYear} 年：这个内容包的人生场景到此结束；这是明确的切片终点，不是模拟灾难。`;
      }
      const nextRevision = await saveV4World(result.world, revision, { lastTickAt: Date.now() });
      console.log(
        JSON.stringify({
          kind: 'v4-year',
          world: result.world.id,
          date: result.world.date,
          revision: nextRevision,
          events: result.events.length,
          scenes: result.scenes.length,
          warnings: result.diagnostics.warnings.length,
          economy: economyEnabled,
          status: result.world.status,
          terminalReason: result.world.terminalReason,
        }),
      );
      if (result.world.status === 'archived') break;
    }
  } catch (error) {
    console.error('v4 simulator:', error);
  }
  const sleep = Math.max(50, 500 - (Date.now() - started));
  await new Promise((resolve) => setTimeout(resolve, sleep));
}

await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]).catch(() => undefined);
client.release();
await pool.end();
