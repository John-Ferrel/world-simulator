import { writeFile } from 'node:fs/promises';
const base = process.env.API_URL ?? 'http://localhost:3001';
const started = performance.now();
const world = (await (await fetch(`${base}/api/world/active`)).json()) as any;
const clients = 100;
const readLatencies = await Promise.all(
  Array.from({ length: clients }, async () => {
    const begin = performance.now();
    const paths = [
      '/world/active',
      '/world/map',
      `/persons/${world.people[0].id}`,
      `/persons/${world.people[0].id}/chronicle`,
    ];
    await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${base}/api${path}`);
        if (response.status !== 200) throw new Error(`Observer read HTTP ${response.status}`);
        await response.json();
      }),
    );
    return performance.now() - begin;
  }),
);
readLatencies.sort((a, b) => a - b);
const controllers = Array.from({ length: clients }, () => new AbortController());
const latencies: number[] = [];
let connected = 0,
  events = 0;
const seen = new Map<number, Set<string>>();
const tasks = controllers
  .map(async (controller, i) => {
    const begin = performance.now();
    const response = await fetch(
      `${base}/api/stream?worldId=${world.id}&events=1&cursor=${Math.max(0, world.cursor - 100)}`,
      { signal: controller.signal },
    );
    if (response.status !== 200) throw new Error(`SSE HTTP ${response.status}`);
    connected++;
    latencies.push(performance.now() - begin);
    const reader = response.body!.getReader();
    let text = '';
    seen.set(i, new Set());
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      text += new TextDecoder().decode(value);
      const chunks = text.split('\n\n');
      text = chunks.pop()!;
      for (const chunk of chunks)
        if (chunk.includes('event: world')) {
          const id = chunk.match(/^id: (\d+)/m)?.[1];
          if (id) {
            if (seen.get(i)!.has(id)) throw new Error(`Duplicate cursor ${id}`);
            seen.get(i)!.add(id);
            events++;
          }
        }
    }
  })
  .map((p) =>
    p.catch((e) => {
      if (e.name !== 'AbortError') throw e;
    }),
  );
await new Promise((r) => setTimeout(r, 6000));
controllers.forEach((c) => c.abort());
await Promise.all(tasks);
latencies.sort((a, b) => a - b);
const report = {
  clients,
  connected,
  bootstrapReadRequests: clients * 4,
  bootstrapP95Ms: readLatencies[Math.floor(clients * 0.95)],
  events,
  perClient: [...seen.values()].map((ids) => ids.size),
  connectP50Ms: latencies[Math.floor(clients * 0.5)],
  connectP95Ms: latencies[Math.floor(clients * 0.95)],
  elapsedMs: performance.now() - started,
  world: {
    population: world.population,
    named: world.named,
    settlements: world.settlements.length,
  },
  duplicates: 0,
};
await writeFile('docs/metrics/sse-load.json', JSON.stringify(report, null, 2));
console.log(report);
if (connected !== clients || report.perClient.some((n) => n < 100))
  throw new Error('Observer target not met');
