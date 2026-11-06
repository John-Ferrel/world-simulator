import { pool } from '../../packages/storage/index.js';
import { advanceV4Year } from '../../packages/v4/engine.js';
import { createV4Birth } from '../../packages/v4/birth.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../../packages/v4/content/vienna-1912.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../../packages/v4/content/vienna-family.js';
import {
  GENERATED_SCENES,
  GENERATED_TASKS,
  ALL_EVENT_SCENES,
  ALL_TASKS,
} from '../../packages/v4/content/generated/index.js';
import { ALL_STATES } from '../../packages/v4/content/states/index.js';
import { DEFAULT_COMPOSITION } from '../../packages/v4/composition/default.js';
import { defaultMacroState } from '../../packages/v4/macro.js';
import { applyViennaHistoricalWorld } from '../../packages/v4/content/vienna-history-world.js';
import { enqueueV4MacroProposal } from '../../packages/v4/macro-store.js';
import { loadPublishedV4Scenes } from '../../packages/v4/content-runtime-store.js';
import { VIENNA_LIFE_SCENES } from '../../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../../packages/v4/content/vienna-developments.js';
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
  // World ids are never reused: archived worlds keep their id, so a fresh
  // automatic seed gets a new stable suffix instead of colliding with history.
  const seed = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
  seed.id = `${seed.id}-v${Date.now().toString(36)}`;
  await seedV4World(seed);
  console.log('v4 simulator: seeded Vienna 1912', seed.id);
}

let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopped = true;
  });

const economyEnabled = process.env.V4_ECONOMY !== '0';
const horizonYear = Number(process.env.V4_HORIZON_YEAR ?? 2000);
const directorEnabled = process.env.V4_DIRECTOR !== '0';
const directorIntervalYears = Math.max(1, Number(process.env.V4_DIRECTOR_INTERVAL_YEARS ?? 10));

while (!stopped) {
  const started = Date.now();
  try {
    const currentMeta = await activeV4WorldMeta();
    if (!currentMeta) {
      console.log('v4 simulator: no active world; exiting');
      break;
    }
    const pendingProbe = await pendingV4Births(currentMeta.id);
    const tickDue = Date.now() - currentMeta.lastTickAt >= currentMeta.secondsPerYear * 1000;
    if (pendingProbe.length === 0 && !tickDue) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }
    const active = await loadActiveV4World();
    if (!active) {
      console.log('v4 simulator: no active world; exiting');
      break;
    }
    let world = active.world;
    let revision = active.meta.revision;
    if (!world.macro) world.macro = defaultMacroState(world);

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
    if (directorEnabled) {
      await enqueueV4MacroProposal(meta.id, meta.date.year, directorIntervalYears).catch((error) =>
        console.error('v4 macro enqueue failed', (error as Error).message),
      );
    }
    const elapsed = Date.now() - meta.lastTickAt;
    if (elapsed >= meta.secondsPerYear * 1000) {
      const runtimeScenes = await loadPublishedV4Scenes().catch(() => []);
      const result = advanceV4Year(
        world,
        [
          ...VIENNA_1912_SCENES,
          ...VIENNA_LIFE_SCENES,
          ...VIENNA_POSTWAR_SCENES,
          ...VIENNA_HISTORY_SCENES,
          ...VIENNA_DEVELOPMENT_SCENES,
          ...VIENNA_FAMILY_RUNTIME_SCENES,
          ...ALL_EVENT_SCENES,
          ...runtimeScenes,
        ],
        {
          economy: { enabled: economyEnabled },
          eventRuntime: true,
          agency: true,
          tasks: ALL_TASKS,
          composition: DEFAULT_COMPOSITION,
          states: ALL_STATES,
          maxOrdinaryEventsPerPerson: 4,
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
