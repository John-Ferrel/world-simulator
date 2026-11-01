import { expect, it } from 'vitest';
import { checksum } from '../packages/storage/index.js';

it('preserves the persisted canonical SHA-256 format for Unicode and JSONB normalization', () => {
  // SHA-256 of the independent byte vector:
  // {"a":0,"b":[null,"雪😀","\ud800"],"z":null}
  const value = { z: Infinity, omitted: undefined, b: [undefined, '雪😀', '\ud800'], a: -0 };
  expect(checksum(value)).toBe('125dcd9af86fdc54dc7acfa4a55966f7cec0660ba97bc485520d0142c98ab81a');
  expect(checksum({ a: -0, b: value.b, z: Infinity })).toBe(checksum(value));
});
