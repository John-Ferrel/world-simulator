import type { WorldState } from '../domain.js';
import { applyViennaHistoricalPeople } from './vienna-history-people.js';
import { seedViennaHistoricalProcesses } from './vienna-history-seed.js';
import { ensureWorldNews } from '../world-news.js';

/**
 * Install the curated 1912 historical layer into a new/loaded world. This is an
 * additive initial-condition change: it does not advance history, kill a real
 * person on their historical death date or create a future event.
 */
export function applyViennaHistoricalWorld(world: WorldState): WorldState {
  const withPeople = applyViennaHistoricalPeople(world);
  return ensureWorldNews(seedViennaHistoricalProcesses(withPeople));
}
