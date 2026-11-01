import {
  MACRO_DEFAULT_PARAMETERS,
  defaultMacroState,
  type MacroParameters,
  type MacroState,
} from './macro.js';
import type { WorldDate, WorldState } from './domain.js';

/**
 * Explicit scenario parameters for statistical tests and the Phase 3 scenario
 * report. These are calibration fixtures, not a hidden world timeline: the
 * runtime Director can choose a completely different path.
 */

export type MacroScenarioName =
  | 'historical-vienna-1912-1920'
  | 'peaceful-vienna'
  | 'public-health-improvement'
  | 'food-and-sanitation-crisis';

export type ScenarioProfile = {
  name: MacroScenarioName;
  label: string;
  parametersForYear: (year: number) => MacroParameters;
};

const historical: ScenarioProfile = {
  name: 'historical-vienna-1912-1920',
  label: '接近真实历史的维也纳 1912–1920',
  parametersForYear: (year) => {
    if (year < 1914) return { ...MACRO_DEFAULT_PARAMETERS };
    if (year < 1918) {
      return {
        ...MACRO_DEFAULT_PARAMETERS,
        warIntensity: 0.62,
        militaryExposure: 0.55,
        civilianExposure: 0.22,
        foodSupply: 0.58,
        sanitation: 0.42,
        healthcare: 0.25,
        stability: 0.48,
        epidemicTuberculosis: 0.38,
      };
    }
    if (year <= 1920) {
      return {
        ...MACRO_DEFAULT_PARAMETERS,
        warIntensity: 0.22,
        militaryExposure: 0.15,
        civilianExposure: 0.12,
        foodSupply: 0.62,
        sanitation: 0.44,
        healthcare: 0.3,
        stability: 0.52,
        epidemicInfluenza: 0.85,
        epidemicTuberculosis: 0.38,
      };
    }
    return { ...MACRO_DEFAULT_PARAMETERS };
  },
};

const peaceful: ScenarioProfile = {
  name: 'peaceful-vienna',
  label: '没有同规模战争的架空维也纳',
  parametersForYear: () => ({
    ...MACRO_DEFAULT_PARAMETERS,
    foodSupply: 0.88,
    sanitation: 0.6,
    healthcare: 0.4,
    stability: 0.78,
    epidemicTuberculosis: 0.25,
  }),
};

const improved: ScenarioProfile = {
  name: 'public-health-improvement',
  label: '公共卫生与医疗显著改善',
  parametersForYear: () => ({
    ...MACRO_DEFAULT_PARAMETERS,
    foodSupply: 0.96,
    sanitation: 0.9,
    healthcare: 0.82,
    medicalTech: 0.62,
    stability: 0.86,
    epidemicTuberculosis: 0.08,
  }),
};

const crisis: ScenarioProfile = {
  name: 'food-and-sanitation-crisis',
  label: '严重粮食与公共卫生危机',
  parametersForYear: () => ({
    ...MACRO_DEFAULT_PARAMETERS,
    foodSupply: 0.3,
    sanitation: 0.32,
    healthcare: 0.18,
    stability: 0.42,
    epidemicCholera: 0.32,
    epidemicTyphus: 0.18,
    epidemicTuberculosis: 0.42,
    migrationPressure: 0.35,
  }),
};

export const MACRO_SCENARIOS: Record<MacroScenarioName, ScenarioProfile> = {
  'historical-vienna-1912-1920': historical,
  'peaceful-vienna': peaceful,
  'public-health-improvement': improved,
  'food-and-sanitation-crisis': crisis,
};

export function applyScenarioToMacro(
  state: MacroState,
  scenario: MacroScenarioName,
  year: number,
): MacroState {
  const next = structuredClone(state);
  const profile = MACRO_SCENARIOS[scenario];
  const parameters = profile.parametersForYear(year);
  for (const region of Object.values(next.regions)) region.parameters = { ...parameters };
  next.updatedAt = { year, month: 1 };
  next.version += 1;
  return next;
}

export function scenarioWorldMacro(
  world: WorldState,
  scenario: MacroScenarioName,
  date: WorldDate = world.date,
): MacroState {
  return applyScenarioToMacro(defaultMacroState(world, date), scenario, date.year);
}
