import type { WorldDate } from '../domain.js';

export type PoliticalLeaderRole =
  | 'head_of_state'
  | 'head_of_government'
  | 'foreign_minister'
  | 'party_leader'
  | 'other';

export type PoliticalLeader = {
  role: PoliticalLeaderRole;
  title: string;
  name: string;
  from?: number;
  to?: number;
  partyId?: string;
  sourceIds?: string[];
};

export type PartyInfluence = 'ruling' | 'major' | 'opposition' | 'fringe' | 'banned' | 'underground';

export type PoliticalParty = {
  id: string;
  name: string;
  englishName?: string;
  ideology: string;
  leader?: string;
  influence: PartyInfluence;
  from?: number;
  to?: number;
  notes?: string;
};

export type PolityKind =
  | 'empire'
  | 'monarchy'
  | 'dual_monarchy'
  | 'republic'
  | 'kingdom'
  | 'federation'
  | 'occupation'
  | 'protectorate'
  | 'client_state'
  | 'dictatorship'
  | 'other';

export type PoliticalPolity = {
  id: string;
  name: string;
  englishName: string;
  /** Inclusive start year. */
  from: number;
  /** Inclusive end year. */
  to: number;
  /** Optional month within the start year (1–12). */
  fromMonth?: number;
  /** Optional month within the end year (1–12). */
  toMonth?: number;
  kind: PolityKind;
  capital: string;
  government: string;
  leaders: PoliticalLeader[];
  parties: PoliticalParty[];
  factions?: string[];
  tensions: string[];
  allies?: string[];
  rivals?: string[];
  /** Modern ISO3 codes used only for a country-level map overlay. */
  isoCodes: string[];
  color: string;
  /** Higher wins when several polities share a modern ISO code. */
  mapPriority?: number;
  /** True when the overlay cannot represent subnational or disputed borders. */
  approximate?: boolean;
  notes?: string;
  sourceIds: string[];
};

export type TensionRegion =
  | 'global'
  | 'europe'
  | 'central_europe'
  | 'balkans'
  | 'vienna'
  | 'asia'
  | 'americas'
  | 'africa';

export type PoliticalTension = {
  id: string;
  from: number;
  to: number;
  title: string;
  description: string;
  severity: number;
  region: TensionRegion;
  polityIds?: string[];
  sourceIds: string[];
};

export type PoliticalSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessed: string;
  kind: 'tertiary_reference' | 'structured_data' | 'museum' | 'government' | 'intergovernmental';
  license?: string;
  note?: string;
};

export type PoliticalMapEntry = {
  iso: string;
  polityId: string;
  name: string;
  color: string;
  status: PolityKind;
  approximate: boolean;
  capital: string;
};

export type PoliticalSnapshot = {
  date: WorldDate;
  /** Polities active at the requested year, highest map priority first. */
  polities: PoliticalPolity[];
  /** Active leaders with their polity id attached. */
  leaders: (PoliticalLeader & { polityId: string; polityName: string })[];
  parties: (PoliticalParty & { polityId: string; polityName: string })[];
  tensions: PoliticalTension[];
  /** The polity covering Vienna in this year. */
  viennaPolity?: PoliticalPolity;
  map: Record<string, PoliticalMapEntry>;
  sources: PoliticalSource[];
  note: string;
};
