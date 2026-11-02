import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { activeV4WorldMeta, archiveV4World, migrateV4, seedV4World } from '../packages/v4/store.js';

await migrateV4();
const active = await activeV4WorldMeta();
if (active) {
  await archiveV4World(active.id, '开发期重置：内容与场景契约更新后另起新世界；旧世界只读归档。');
  console.log(`archived ${active.id}`);
}
const id = `${VIENNA_1912_SEED.id}-v${Date.now().toString(36)}`;
const meta = await seedV4World(
  applyViennaHistoricalWorld({ ...structuredClone(VIENNA_1912_SEED), id }),
);
console.log(JSON.stringify({ world: meta.id, date: meta.date, status: meta.status }));
await pool.end();
