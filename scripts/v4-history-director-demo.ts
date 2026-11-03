import { mkdirSync, writeFileSync } from 'node:fs';
import { pool } from '../packages/storage/index.js';
import { advanceV4Year } from '../packages/v4/engine.js';
import { VIENNA_1912_SCENES, VIENNA_1912_SEED } from '../packages/v4/content/vienna-1912.js';
import { VIENNA_LIFE_SCENES } from '../packages/v4/content/vienna-life.js';
import { VIENNA_POSTWAR_SCENES } from '../packages/v4/content/vienna-postwar.js';
import { VIENNA_HISTORY_SCENES } from '../packages/v4/content/vienna-history.js';
import { VIENNA_DEVELOPMENT_SCENES } from '../packages/v4/content/vienna-developments.js';
import { VIENNA_FAMILY_RUNTIME_SCENES } from '../packages/v4/content/vienna-family.js';
import { GENERATED_SCENES } from '../packages/v4/content/generated/index.js';
import { applyViennaHistoricalWorld } from '../packages/v4/content/vienna-history-world.js';
import { compileMacroProposal, knownMacroFamilyIds } from '../packages/v4/macro-director.js';
import { applyV4MacroProposal } from '../packages/v4/macro-store.js';
import {
  archiveV4World,
  loadV4World,
  saveV4World,
  seedV4World,
  v4WorldMeta,
} from '../packages/v4/store.js';
import type { MacroProposal } from '../packages/v4/macro.js';

const databaseName = (() => {
  try {
    return new URL(process.env.DATABASE_URL ?? '').pathname.replace(/^\//, '');
  } catch {
    return '';
  }
})();
if (!/_(test|e2e)$/.test(databaseName)) {
  console.error('v4-history-director-demo requires DATABASE_URL ending in _test or _e2e');
  process.exit(1);
}
const existing = (await pool.query("SELECT id FROM v4_worlds WHERE status='running' LIMIT 1"))
  .rows[0];
if (existing) {
  console.error(`v4-history-director-demo refuses to run while a world is active (${existing.id})`);
  await pool.end();
  process.exit(1);
}

const worldId = `phase6-history-${Date.now().toString(36)}`;
const seed = applyViennaHistoricalWorld(structuredClone(VIENNA_1912_SEED));
seed.id = worldId;
seed.date = { year: 1914, month: 1 };
await seedV4World(seed);
const evidence: any[] = [];
const allActionEvents: any[] = [];

try {
  for (const year of [1914, 1920]) {
    const meta = await v4WorldMeta(worldId);
    const world = await loadV4World(worldId);
    if (!meta || !world?.macro) throw new Error('demo world missing macro');
    world.date = { year, month: 1 };
    meta.date = { year, month: 1 };
    const before = structuredClone(world.macro.developments ?? {});
    const compiled = await compileMacroProposal({
      world,
      state: world.macro,
      knownFamilies: knownMacroFamilyIds(),
      maxTokens: 5200,
    });
    const applied = await applyV4MacroProposal(
      worldId,
      compiled.proposal,
      compiled.model,
      `history-demo-${year}-${Date.now().toString(36)}`,
      new Set(knownMacroFamilyIds()),
    );
    const afterState = await loadV4World(worldId);
    const after = afterState?.macro?.developments ?? {};
    const pendingAfterApply = (afterState?.macro?.pendingActions ?? []).map((action) => ({
      id: action.id,
      kind: action.kind,
      status: action.status,
      organizationId: action.organizationId,
      actorPersonId: action.actorPersonId,
      processId: action.processId,
      title: action.title,
    }));
    evidence.push({
      year,
      model: compiled.model,
      tokens: compiled.tokens,
      proposal: {
        summary: compiled.proposal.summary,
        developments: compiled.proposal.developments,
        historicalMoves: compiled.proposal.historicalMoves ?? [],
        actions: compiled.proposal.actions ?? [],
        parameterChanges: compiled.proposal.parameterChanges,
        eventPoolChanges: compiled.proposal.eventPoolChanges,
      },
      beforeProcesses: Object.values(before).map((development) => ({
        id: development.id,
        phase: development.historical?.phase,
        participants: Object.keys(development.historical?.participants ?? {}).length,
      })),
      pendingAfterApply,
      afterProcesses: Object.values(after).map((development) => ({
        id: development.id,
        phase: development.historical?.phase,
        participants: Object.keys(development.historical?.participants ?? {}).length,
      })),
      revision: applied.revision,
    });
    // Advance the real year runtime so the second call sees actual changes,
    // not a static initial snapshot.
    let current = await loadV4World(worldId);
    if (!current) throw new Error('world disappeared');
    const scenes = [
      ...VIENNA_1912_SCENES,
      ...VIENNA_LIFE_SCENES,
      ...VIENNA_POSTWAR_SCENES,
      ...VIENNA_HISTORY_SCENES,
      ...VIENNA_DEVELOPMENT_SCENES,
      ...VIENNA_FAMILY_RUNTIME_SCENES,
      ...GENERATED_SCENES,
    ];
    for (let index = 0; index < 6; index += 1) {
      const result = advanceV4Year(current, scenes, {
        economy: { enabled: true },
        eventRuntime: true,
        agency: true,
        maxOrdinaryEventsPerPerson: 4,
      });
      current = result.world;
      allActionEvents.push(
        ...result.events
          .filter((event) => event.action.startsWith('macro_action:'))
          .map((event) => ({
            date: event.date,
            action: event.action,
            subjectId: event.subjectId,
            title: event.title,
            text: event.immediateText,
            effects: event.effects.map((effect) => effect.type),
          })),
      );
      const nextMeta = await v4WorldMeta(worldId);
      if (!nextMeta) throw new Error('world meta disappeared');
      await saveV4World(current, nextMeta.revision, { lastTickAt: Date.now() });
    }
  }
  const finalWorld = await loadV4World(worldId);
  const report = {
    worldId,
    status: 'ok',
    evidence,
    actionEvents: allActionEvents,
    finalPendingActions: (finalWorld?.macro?.pendingActions ?? []).map((action) => ({
      id: action.id,
      kind: action.kind,
      status: action.status,
      eventId: action.eventId,
      reason: action.reason,
    })),
    finalLegacy: Object.values(finalWorld?.macro?.legacy ?? {}).map((legacy) => ({
      id: legacy.id,
      kind: legacy.kind,
      title: legacy.title,
      processId: legacy.processId,
    })),
  };
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync('docs/v4/phase-7-director-demo.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await archiveV4World(worldId, 'Phase 7 Director demo archive').catch(() => undefined);
  await pool.end();
}
