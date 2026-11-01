import { assessWorldline } from '../packages/worldline/drift.js';
import type { HistoricalEvent } from '../packages/contracts/index.js';
import { activeWorld, pool } from '../packages/storage/index.js';

const world = await activeWorld();
if (!world) throw new Error('没有活动世界');
const rows = (
  await pool.query(
    'SELECT payload FROM events WHERE world_id=$1 AND month<=$2 ORDER BY cursor DESC LIMIT 240',
    [world.id, world.month],
  )
).rows;
const events = rows.map((row) => row.payload as HistoricalEvent).reverse();
const assessment = assessWorldline(world, events);
console.log(JSON.stringify({ world: world.id, month: world.month, assessment }, null, 2));
await pool.end();
