import { randomUUID } from 'node:crypto';
import { migrate, bootstrap, acquireLease, step, pool } from '../../packages/storage/index.js';
const owner = randomUUID();
await migrate();
await bootstrap();
let stopped = false;
process.on('SIGTERM', () => {
  stopped = true;
});
process.on('SIGINT', () => {
  stopped = true;
});
await pool.query("INSERT INTO settings(key,value) VALUES('lastTickAt',$1) ON CONFLICT DO NOTHING", [
  Date.now(),
]);
while (!stopped) {
  const started = Date.now();
  try {
    const epoch = await acquireLease(owner);
    if (epoch) {
      const settings = (await pool.query('SELECT key,value FROM settings')).rows;
      const get = (key: string) => settings.find((s) => s.key === key)?.value;
      const interval =
        (Number(get('minutesPerYear') ?? process.env.WORLD_MINUTES_PER_YEAR ?? 20) * 60_000) / 12;
      const lastTick = Number(get('lastTickAt') ?? Date.now());
      const paused = !!get('paused');
      if (paused)
        await pool.query("UPDATE settings SET value=$1 WHERE key='lastTickAt'", [Date.now()]);
      const tick = !paused && Date.now() - lastTick >= interval;
      const pending = Number(
        (await pool.query("SELECT count(*) FROM commands WHERE status='pending'")).rows[0].count,
      );
      const ready = Number(
        (await pool.query("SELECT count(*) FROM jobs WHERE status='ready'")).rows[0].count,
      );
      if (tick || pending || ready) {
        const monthsPerStep = Math.max(
          1,
          Math.min(12, Number(process.env.SIM_MONTHS_PER_STEP ?? 1)),
        );
        const result = await step(
          owner,
          epoch,
          tick,
          undefined,
          tick ? lastTick + interval * monthsPerStep : undefined,
        );
        console.log(
          JSON.stringify({
            kind: 'commit',
            world: result?.world.id,
            month: result?.world.month,
            revision: result?.world.revision,
            events: result?.events.length,
            lagMs: Math.max(0, Date.now() - lastTick - interval),
            ms: Date.now() - started,
          }),
        );
      }
    }
  } catch (e) {
    console.error(e);
  }
  await new Promise((r) => setTimeout(r, 200));
}
await pool.end();
