import { expect, it } from 'vitest';
import { mkdtemp, readFile, stat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { writeJsonCheckpoint } from '../scripts/json-checkpoint.js';

it('writes exact Unicode JSON across chunks and preserves the last checkpoint on a serialization failure', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'world-checkpoint-'));
  const path = join(directory, 'checkpoint.json');
  try {
    const value = {
      names: Array.from({ length: 3000 }, (_, i) => `雪😀${i}`),
      text: '生'.repeat(70000),
      omitted: undefined,
      arrays: [undefined, -0, Infinity],
    };
    const result = await writeJsonCheckpoint(path, value);
    const raw = await readFile(path);
    expect(raw.toString()).toBe(JSON.stringify(value));
    expect(result.bytes).toBe(raw.length);
    expect(result.sha256).toBe(createHash('sha256').update(raw).digest('hex'));
    expect((await stat(path)).mode & 0o777).toBe(0o600);
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    await expect(writeJsonCheckpoint(path, cyclic)).rejects.toThrow('Cyclic checkpoint');
    expect(await readFile(path, 'utf8')).toBe(raw.toString());
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
