import { pool } from '../packages/storage/index.js';
import { applyViennaTimeline, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { activeV4WorldMeta, migrateV4, seedV4World } from '../packages/v4/store.js';

await migrateV4();
const active = await activeV4WorldMeta();
if (active) {
  console.log(JSON.stringify({ world: active.id, status: 'already-running' }));
  await pool.end();
  process.exit(0);
}
const id = `${VIENNA_1912_SEED.id}-v45-${Date.now().toString(36)}`;
const meta = await seedV4World(
  applyViennaHistoricalWorld({ ...structuredClone(applyViennaTimeline(VIENNA_1912_SEED)), id }),
);
console.log(JSON.stringify({ world: meta.id, date: meta.date, status: meta.status }));
await pool.end();
