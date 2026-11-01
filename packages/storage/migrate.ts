import { migrate, pool } from './index.js';
await migrate();
console.log('Migration 001 applied');
await pool.end();
