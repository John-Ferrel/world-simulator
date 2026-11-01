import { open, rename, unlink } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';

/** Diagnostic checkpoints must not require a single multi-hundred-MiB JSON string. */
export async function writeJsonCheckpoint(path: string, value: unknown) {
  const temporary = `${path}.partial-${randomUUID()}`;
  const file = await open(temporary, 'wx', 0o600);
  const hash = createHash('sha256');
  let parts: string[] = [],
    length = 0,
    bytes = 0;
  const ancestors = new Set<object>();
  function* tokens(node: unknown, depth = 0): Generator<string> {
    if (depth > 100) throw new Error('Checkpoint nesting exceeds bounds');
    if (['function', 'symbol', 'bigint'].includes(typeof node))
      throw new Error('Non-JSON checkpoint value');
    if (node === null || typeof node !== 'object') {
      yield JSON.stringify(node) ?? 'null';
      return;
    }
    if (ancestors.has(node)) throw new Error('Cyclic checkpoint');
    if (!Array.isArray(node) && ![Object.prototype, null].includes(Object.getPrototypeOf(node)))
      throw new Error('Non-plain checkpoint object');
    ancestors.add(node);
    if (Array.isArray(node)) {
      yield '[';
      for (let i = 0; i < node.length; i++) {
        if (i) yield ',';
        yield* tokens(node[i], depth + 1);
      }
      yield ']';
    } else {
      yield '{';
      let first = true;
      for (const [key, child] of Object.entries(node)) {
        if (child === undefined) continue;
        if (!first) yield ',';
        first = false;
        yield JSON.stringify(key);
        yield ':';
        yield* tokens(child, depth + 1);
      }
      yield '}';
    }
    ancestors.delete(node);
  }
  const flush = async () => {
    const chunk = parts.join('');
    hash.update(chunk);
    bytes += Buffer.byteLength(chunk);
    await file.writeFile(chunk);
    parts = [];
    length = 0;
  };
  try {
    for (const token of tokens(value)) {
      parts.push(token);
      length += token.length;
      if (length >= 65536) await flush();
    }
    if (parts.length) await flush();
    await file.sync();
    await file.close();
    await rename(temporary, path);
    return { path, bytes, sha256: hash.digest('hex') };
  } finally {
    await file.close().catch(() => {});
    await unlink(temporary).catch(() => {});
  }
}
