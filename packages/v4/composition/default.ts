import { KERNEL_LIBRARY } from '../content/kernels/index.js';
import { createCompositionSource } from './composer.js';

/** Shared default composition source used by the simulator and audits. */
export const DEFAULT_COMPOSITION = createCompositionSource(KERNEL_LIBRARY);
