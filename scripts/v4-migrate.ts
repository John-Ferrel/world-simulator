import { migrateV4 } from '../packages/v4/store.js';
import { pool } from '../packages/storage/index.js';
await migrateV4();
console.log('v4 schema ready');
await pool.end();
