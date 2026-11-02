import { pool } from '../packages/storage/index.js';
import { VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { migrateV4, seedV4World } from '../packages/v4/store.js';
await migrateV4();
const meta = await seedV4World(applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED)));
console.log(JSON.stringify({ world: meta.id, date: meta.date, status: meta.status }));
await pool.end();
