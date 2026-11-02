import type { HistoricalProcessMetrics, WorldDate, WorldState } from '../domain.js';
import { defaultMacroState, type WorldDevelopment } from '../macro.js';
import { ensureHistoricalProcess } from '../history.js';

/**
 * Initial historical conditions for the 1912 Vienna slice.
 *
 * These are not future-history scripts. The Social Democratic party and the
 * Wednesday Psychological Society already existed in 1912; the processes expose
 * their current organizations and participants to ordinary people without
 * predetermining what they will become.
 */
export { VIENNA_HISTORY_PEOPLE_SOURCES } from './vienna-history-people.js';

function processHistoryDate(date: WorldDate): WorldDate {
  return { ...date };
}

export function seedViennaHistoricalProcesses(world: WorldState): WorldState {
  const next = structuredClone(world);
  if (!next.macro) next.macro = defaultMacroState(next);
  const date = { ...next.date };
  if (!next.macro.developments) next.macro.developments = {};

  const addProcess = (
    id: string,
    type: string,
    organizationId: string,
    organizationName: string,
    description: string,
    eventFamilyIds: string[],
    sourceIds: string[],
    leaderIds: Array<{ id: string; role: 'leader' | 'organizer'; influence: number }>,
    metrics: HistoricalProcessMetrics,
    kind: NonNullable<WorldDevelopment['historical']>['kind'],
  ): void => {
    if (next.macro!.developments![id]) return;
    const development: WorldDevelopment = {
      id,
      type,
      regionId: 'region-lower-austria',
      description,
      severity: 0.55,
      start: date,
      end: { year: date.year + 22, month: 12 },
      status: 'active',
      eventFamilyIds,
      organizationId,
      organization: { name: organizationName, kind: 'other', placeId: undefined },
      source: 'historical-seed',
    };
    const historical = ensureHistoricalProcess(development, date);
    historical.kind = kind;
    historical.phase = 'mobilizing';
    historical.phaseStarted = processHistoryDate(date);
    historical.regionIds = ['region-lower-austria'];
    historical.objectives = [description];
    historical.sourceIds = [...sourceIds];
    historical.source = 'seed';
    historical.metrics = { ...metrics };
    historical.organizationRoles = { [organizationId]: ['vehicle'] };
    historical.history = [
      {
        date: processHistoryDate(date),
        phase: 'mobilizing',
        note: `1912 年时已经存在的真实组织与社会条件：${description}`,
      },
    ];
    const seedEventId = `seed:${id}`;
    for (const leader of leaderIds) {
      if (!next.persons[leader.id]) continue;
      historical.participants[leader.id] = {
        roles: [leader.role],
        influence: leader.influence,
        firstEventId: seedEventId,
        lastEventId: seedEventId,
        joinedAt: processHistoryDate(date),
      };
    }
    historical.realWorldReference = {
      sourceIds: [...sourceIds],
      note: '真实组织/人物的公开历史背景；模拟中的阶段、成员、行动和结果由世界状态决定。',
    };
    development.historical = historical;
    next.macro!.developments![id] = development;
    for (const familyId of eventFamilyIds) {
      next.macro!.eventPool[familyId] = {
        familyId,
        enabled: true,
        weightMultiplier: Math.max(next.macro!.eventPool[familyId]?.weightMultiplier ?? 1, 1.1),
        source: `historical-seed:${id}`,
        updatedAt: processHistoryDate(date),
      };
    }
  };

  addProcess(
    'development:seed-vienna-social-democracy-1912',
    'social_change',
    'org-sdap',
    'Sozialdemokratische Arbeiterpartei (SDAP)',
    '维也纳社会民主党在工人街区、工会和报刊网络中持续活动，争取普选、劳动保护与社会救济。',
    ['vienna-history-social-democracy', 'vienna-social-movement'],
    ['source-wien-geschichte-sdap', 'source-wien-geschichte-victor-adler'],
    [{ id: 'person-victor-adler', role: 'leader', influence: 0.12 }],
    {
      support: 0.3,
      opposition: 0.25,
      resources: 0.28,
      legitimacy: 0.42,
      escalation: 0.08,
      information: 0.22,
    },
    'social_movement',
  );

  addProcess(
    'development:seed-vienna-psychoanalytic-circle-1912',
    'social_change',
    'org-wednesday-psychological-society',
    'Wednesday Psychological Society',
    '弗洛伊德周围的医生、作家和学生以周三讨论会、病例和出版物形成一个小型知识网络。',
    ['vienna-history-psychoanalytic'],
    ['source-wien-geschichte-freud', 'source-wikipedia-vienna-psychoanalytic-society'],
    [{ id: 'person-sigmund-freud', role: 'leader', influence: 0.1 }],
    {
      support: 0.16,
      opposition: 0.1,
      resources: 0.18,
      legitimacy: 0.38,
      escalation: 0.03,
      information: 0.3,
    },
    'cultural_movement',
  );

  return next;
}
