import type { Settlement } from '../contracts/index.js';
export const settlementMass = (s: Settlement) =>
  Math.max(1, s.cohort.children + s.cohort.adults + s.cohort.elders);
/** Geography detail must not create extra national voters or industrial workforce. */
export function populationMean(places: Settlement[], value: (s: Settlement) => number) {
  let total = 0,
    mass = 0;
  for (const s of places) {
    const n = settlementMass(s);
    total += value(s) * n;
    mass += n;
  }
  return mass ? total / mass : 0;
}
