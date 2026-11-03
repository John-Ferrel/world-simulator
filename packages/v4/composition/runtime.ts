import { createCompositionSource } from './composer.js';
import type { PlotKernel } from './types.js';

/**
 * The default source is intentionally built from the checked-in kernel registry.
 * It has no database dependency and can be used by the simulator, API, tests,
 * playtest and audit scripts without changing the engine's world authority.
 */
export function makeDefaultComposition(kernels: PlotKernel[]) {
  return createCompositionSource(kernels);
}
