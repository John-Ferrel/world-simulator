import { writeFile } from 'node:fs/promises';
import { activeWorld, pool } from '../packages/storage/index.js';
import { population } from '../packages/contracts/index.js';

// Read-only evidence from the running world, never a second simulation writer.
try {
  const w = await activeWorld();
  if (!w) throw new Error('No running world');
  const kinds = (
    await pool.query(
      "SELECT payload->>'kind' AS kind,count(*)::integer AS count FROM events WHERE world_id=$1 GROUP BY 1 ORDER BY 2 DESC",
      [w.id],
    )
  ).rows;
  const samples = (
    await pool.query(
      `SELECT payload FROM events WHERE world_id=$1 AND payload->>'kind' IN
      ('war_started','peace_treaty','election','regime_changed','labor_dispute_started',
       'society_aid','agenda_step_completed','project_completed','occupation_changed',
       'earth_land_route_modes_migrated') ORDER BY cursor DESC LIMIT 12`,
      [w.id],
    )
  ).rows.map((r) => r.payload);
  const count = (x: object | undefined) => Object.keys(x ?? {}).length;
  const report = {
    recordedAt: new Date().toISOString(),
    world: w.id,
    month: w.month,
    revision: w.revision,
    population: population(w),
    livingNamed: w.persons.filter((p) => p.death === undefined).length,
    materializedHistoricalPeople: w.persons.filter((p) => p.historicalIdentity).length,
    governments: count(w.geopolitics?.governments),
    diplomaticRelations: count(w.geopolitics?.relations),
    wars: w.geopolitics?.wars.length ?? 0,
    activeWars: w.geopolitics?.wars.filter((x) => x.status === 'active').length ?? 0,
    socialProfiles: count(w.society?.profiles),
    socialRelations: count(w.society?.relations),
    socialInstitutions: count(w.society?.institutions),
    industrialPolities: count(w.industry?.polities),
    agendas: count(w.agency?.agendas),
    projects: count(w.agency?.projects),
    migrations: w.migrations,
    eventKinds: kinds,
    samples,
    limitation:
      'Counts describe this snapshot; they do not demonstrate historical accuracy or enjoyable gameplay.',
  };
  await writeFile('docs/metrics/current-world.json', JSON.stringify(report, null, 2));
  console.log({
    world: w.id,
    month: w.month,
    revision: w.revision,
    governments: report.governments,
    agendas: report.agendas,
  });
} finally {
  await pool.end();
}
