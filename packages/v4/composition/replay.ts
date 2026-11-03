export type ComposedActionRef = {
  kernelId: string;
  contextId: string;
  milieuId: string;
  variantId?: string;
};

/**
 * Parse a committed event action back to the exact kernel/context/milieu that
 * produced it. No world state or model memory is needed for replay.
 */
export function parseComposedAction(action: string): ComposedActionRef | undefined {
  const sceneId = action.includes('/') ? action.split('/')[0]! : action;
  const [kernelId, contextId, milieuId, variantId, ...rest] = sceneId.split('::');
  if (!kernelId || !contextId || !milieuId || rest.length > 0) return undefined;
  return {
    kernelId,
    contextId,
    milieuId,
    ...(variantId ? { variantId } : {}),
  };
}
