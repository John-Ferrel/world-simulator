import { afterAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { pool } from '../packages/storage/index.js';
import type { GeneratedPack } from '../packages/v4/generated.js';
import {
  enqueueV4ContentJob,
  loadPublishedV4Scenes,
  publishV4ContentPack,
} from '../packages/v4/content-runtime-store.js';

const databaseUrl = process.env.DATABASE_URL ?? '';
const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
const enabled = process.env.TEST_DATABASE === '1' && /_test$/.test(databaseName);
const pack = JSON.parse(
  readFileSync('docs/v4/phase-4-social-movement-pack.json', 'utf8'),
) as GeneratedPack;

describe.skipIf(!enabled)('v4 runtime content publication', () => {
  afterAll(async () => {
    await pool.query("DELETE FROM v4_content_jobs WHERE brief_id='vienna-social-movement'");
    await pool.query("DELETE FROM v4_content_packs WHERE pack_id='vienna-social-movement'");
    await pool.end();
  });

  it('publishes a validated pack and loads its scenes without a restart', async () => {
    await publishV4ContentPack(pack, 'test-runtime');
    const scenes = await loadPublishedV4Scenes();
    expect(scenes.map((scene) => scene.id).sort()).toEqual(
      [
        'vienna-social-movement.aftermath',
        'vienna-social-movement.leaflet',
        'vienna-social-movement.meeting',
        'vienna-social-movement.raid',
      ].sort(),
    );
    expect(
      await enqueueV4ContentJob(undefined, 'vienna-social-movement', 'already published'),
    ).toBe(undefined);
  });
});
