import { writeFile } from 'node:fs/promises';
const base = process.env.API_URL ?? 'http://localhost:3001';
const world = (await (await fetch(`${base}/api/world/active`)).json()) as any;
async function collect(cursor: number, count: number, header = false) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  const response = await fetch(
    `${base}/api/stream?worldId=${world.id}&events=1${header ? '' : `&cursor=${cursor}`}`,
    { headers: header ? { 'Last-Event-ID': String(cursor) } : {}, signal: controller.signal },
  );
  const ids: number[] = [];
  let buffer = '';
  try {
    for await (const chunk of response.body!) {
      buffer += new TextDecoder().decode(chunk);
      const blocks = buffer.split('\n\n');
      buffer = blocks.pop()!;
      for (const block of blocks) {
        const id = block.match(/^id: (\d+)/m)?.[1];
        if (id) ids.push(Number(id));
        if (ids.length >= count) {
          controller.abort();
          return ids;
        }
      }
    }
  } catch (e) {
    if ((e as Error).name === 'AbortError' && ids.length >= count) return ids;
    throw e;
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
  return ids;
}
const start = Math.max(0, world.cursor - 30);
const first = await collect(start, 5),
  second = await collect(first.at(-1)!, 10, true);
const expected = (await (
  await fetch(`${base}/api/world/events?worldId=${world.id}&cursor=${first.at(-1)}`)
).json()) as any;
const wanted = expected.events.slice(0, 10).map((e: any) => e.cursor);
if (
  JSON.stringify(second) !== JSON.stringify(wanted) ||
  new Set([...first, ...second]).size !== first.length + second.length
)
  throw new Error('Reconnect gap or duplicate');
const report = {
  worldId: world.id,
  first,
  second,
  expected: wanted,
  duplicateCount: 0,
  missingCount: 0,
};
await writeFile('docs/metrics/sse-reconnect.json', JSON.stringify(report, null, 2));
console.log(report);
