import type { GeneratedPack } from '../generated.js';
import type { MacroState } from '../macro.js';

/**
 * Map active macro conditions to concrete content gaps. This is deliberately
 * advisory: it tells the Content Author which event families are missing, but
 * never publishes or mutates content itself.
 */
export type MacroContentGap = {
  kind: 'war' | 'epidemic' | 'famine' | 'medical' | 'unrest' | 'migration';
  reason: string;
  severity: number;
  suggestedTags: string[];
  matchingFamilies: string[];
};

function hasTag(packs: GeneratedPack[], tags: string[]): string[] {
  return packs.filter((pack) => tags.some((tag) => pack.tags.includes(tag))).map((pack) => pack.id);
}

export function macroContentGaps(state: MacroState, packs: GeneratedPack[]): MacroContentGap[] {
  const regions = Object.values(state.regions);
  const max = (key: keyof (typeof regions)[number]['parameters']) =>
    regions.reduce((value, region) => Math.max(value, region.parameters[key]), 0);
  const gaps: MacroContentGap[] = [];
  const war = max('warIntensity');
  if (war >= 0.25) {
    const matches = hasTag(packs, ['war', 'military', 'conscription', 'homefront']);
    if (matches.length === 0)
      gaps.push({
        kind: 'war',
        reason: `warIntensity=${war.toFixed(2)} but no generated family has war/military/homefront tags`,
        severity: war,
        suggestedTags: ['war', 'military', 'homefront', 'separation', 'injury'],
        matchingFamilies: matches,
      });
  }
  const epidemic = Math.max(
    max('epidemicInfluenza'),
    max('epidemicCholera'),
    max('epidemicTyphus'),
  );
  if (epidemic >= 0.2) {
    const matches = hasTag(packs, ['epidemic', 'influenza', 'cholera', 'typhus']);
    if (matches.length === 0)
      gaps.push({
        kind: 'epidemic',
        reason: `epidemic pressure=${epidemic.toFixed(2)} but no generated epidemic family`,
        severity: epidemic,
        suggestedTags: ['epidemic', 'health', 'care', 'burial'],
        matchingFamilies: matches,
      });
  }
  const food = 1 - max('foodSupply');
  if (food >= 0.25) {
    const matches = hasTag(packs, ['famine', 'hunger', 'ration', 'food_shortage']);
    if (matches.length === 0)
      gaps.push({
        kind: 'famine',
        reason: `food shortage=${food.toFixed(2)} but no generated famine/ration family`,
        severity: food,
        suggestedTags: ['famine', 'hunger', 'ration', 'market'],
        matchingFamilies: matches,
      });
  }
  const medical = max('healthcare');
  if (medical < 0.25) {
    const matches = hasTag(packs, ['medical', 'hospital', 'doctor', 'treatment']);
    if (matches.length === 0)
      gaps.push({
        kind: 'medical',
        reason: `healthcare=${medical.toFixed(2)} but no generated medical family`,
        severity: 1 - medical,
        suggestedTags: ['medical', 'hospital', 'doctor', 'treatment'],
        matchingFamilies: matches,
      });
  }
  const unrest = 1 - max('stability');
  if (unrest >= 0.25) {
    const matches = hasTag(packs, ['unrest', 'protest', 'strike', 'political']);
    if (matches.length === 0)
      gaps.push({
        kind: 'unrest',
        reason: `instability=${unrest.toFixed(2)} but no generated unrest/protest family`,
        severity: unrest,
        suggestedTags: ['unrest', 'protest', 'strike', 'political'],
        matchingFamilies: matches,
      });
  }
  return gaps.sort((a, b) => b.severity - a.severity || a.kind.localeCompare(b.kind));
}
