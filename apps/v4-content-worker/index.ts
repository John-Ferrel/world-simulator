import '../../packages/model/config.js';
import { migrateV4 } from '../../packages/v4/store.js';
import {
  claimV4ContentJob,
  finishV4ContentJob,
  publishV4ContentPack,
} from '../../packages/v4/content-runtime-store.js';
import { generatePack } from '../../packages/v4/content-author/generate.js';
import { PHASE4_FAMILY_BRIEFS } from '../../packages/v4/content-author/phase4-briefs.js';
import type { ContentFamilyBrief } from '../../packages/v4/content-author/briefs.js';

/**
 * Runtime Content Author worker.
 *
 * A development/gap enqueues a brief. The worker calls the real model, validates
 * the generated pack, publishes it to the shared content table, and the next
 * simulator tick can compile/load it without a restart.
 */
await migrateV4();
const briefs = new Map<string, ContentFamilyBrief>(
  PHASE4_FAMILY_BRIEFS.map((brief) => [brief.id, brief]),
);
console.log('v4 content worker: ready');

let stopped = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    stopped = true;
  });

while (!stopped) {
  const job = await claimV4ContentJob();
  if (!job) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    continue;
  }
  const brief = briefs.get(job.brief_id);
  if (!brief) {
    await finishV4ContentJob(job.id, 'failed', { error: `no brief ${job.brief_id}` });
    continue;
  }
  try {
    const result = await generatePack(brief, {
      maxAttempts: 3,
      maxTokens: 8000,
      timeoutMs: 180000,
      onAttempt: (attempt) =>
        console.error(
          `${job.brief_id} attempt ${attempt.attempt}: ${attempt.tokens} tokens, ${attempt.errors.length} errors`,
        ),
    });
    if (!result.ok || !result.pack) {
      const retry = job.attempts < 3;
      await finishV4ContentJob(job.id, retry ? 'pending' : 'failed', {
        tokens: result.tokens,
        error: result.errors.slice(0, 4).join(' | ').slice(0, 500),
      });
      continue;
    }
    await publishV4ContentPack(result.pack, 'runtime-author');
    await finishV4ContentJob(job.id, 'published', { tokens: result.successTokens });
    console.log(
      JSON.stringify({
        kind: 'v4-content-published',
        job: job.id,
        pack: result.pack.id,
        nodes: result.pack.nodes.length,
        outcomes: result.pack.nodes.reduce((sum, node) => sum + node.outcomes.length, 0),
        tokens: result.successTokens,
        model: result.model,
      }),
    );
  } catch (error) {
    const message = (error as Error).message.slice(0, 500);
    const retry = job.attempts < 3;
    await finishV4ContentJob(job.id, retry ? 'pending' : 'failed', { error: message }).catch(
      () => undefined,
    );
    console.error('v4 content worker:', retry ? 'retry' : 'failed', message);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}
