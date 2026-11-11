import {
  EVENT_TITLE_FALLBACKS,
  EVENT_TITLE_OVERRIDES,
} from './content/event-title-overrides.js';

/** The authored base scene id, without composition context/milieu suffixes. */
export function baseSceneId(sceneId: string): string {
  return sceneId.split('::')[0] ?? sceneId;
}

/** The outcome segment of a scene action or state tick action. */
export function actionOutcomeId(action: string): string {
  const slash = action.lastIndexOf('/');
  return slash >= 0 ? action.slice(slash + 1) : '';
}

/**
 * Resolve the player-facing title for a committed action.
 *
 * Priority: exact action override, base-scene/outcome override, outcome title,
 * scene title, action fallback. The overlay exists so high-frequency legacy
 * scenes get per-outcome titles without rewriting their prose.
 */
export function eventTitleFor(
  action: string,
  sceneTitle?: string,
  outcomeTitle?: string,
): string {
  const exact = EVENT_TITLE_OVERRIDES[action];
  if (exact) return exact;
  const key = `${baseSceneId(action)}/${actionOutcomeId(action)}`;
  const overridden = EVENT_TITLE_OVERRIDES[key];
  if (overridden) return overridden;
  const authored = outcomeTitle?.trim();
  if (authored) return authored;
  const fallback = EVENT_TITLE_FALLBACKS[action];
  if (fallback) return fallback;
  const scene = sceneTitle?.trim();
  if (scene) return scene;
  return '生活记录';
}
