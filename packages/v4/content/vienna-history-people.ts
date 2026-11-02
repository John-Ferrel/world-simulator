/**
 * Stable historical people and institutions for the Vienna 1912 world.
 *
 * These records are identities, not scripts. They use the ordinary Person,
 * Household, Place, Organization, Position and Relation contracts, so the
 * engine can include them in the same simulation as everyone else. Their real
 * death dates are reference metadata only; `died` is deliberately unset.
 *
 * The activation function is additive and idempotent. It never creates a
 * historical process, never mutates the input world and never gives a curated
 * person a guardian role. In particular, the four historical households have
 * empty guardianIds so `createV4Birth` cannot place a player's newborn into a
 * famous family.
 */

import type {
  Household,
  Organization,
  Person,
  PersonLife,
  Place,
  Position,
  Relation,
  WorldDate,
  WorldState,
} from '../domain.js';
import { assertWorldV4 } from '../domain.js';
import type { ViennaSource } from './vienna-1912.js';

export const VIENNA_HISTORY_PEOPLE_SOURCES: Record<string, ViennaSource> = {
  'source-wikidata-q9215': {
    id: 'source-wikidata-q9215',
    title: 'Sigmund Freud (Q9215)',
    publisher: 'Wikidata',
    year: '2026',
    url: 'https://www.wikidata.org/wiki/Q9215',
    note: 'Stable identifier, birth date 6 May 1856 and death date 23 September 1939. Used for identity metadata only.',
  },
  'source-wikidata-q366845': {
    id: 'source-wikidata-q366845',
    title: 'Victor Adler (Q366845)',
    publisher: 'Wikidata',
    year: '2026',
    url: 'https://www.wikidata.org/wiki/Q366845',
    note: 'Stable identifier, birth date 24 June 1852 and death date 11 November 1918. Used for identity metadata only.',
  },
  'source-wikidata-q44328': {
    id: 'source-wikidata-q44328',
    title: 'Karl Kraus (Q44328)',
    publisher: 'Wikidata',
    year: '2026',
    url: 'https://www.wikidata.org/wiki/Q44328',
    note: 'Stable identifier, birth date 28 April 1874 and death date 12 June 1936. Used for identity metadata only.',
  },
  'source-wikidata-q44331': {
    id: 'source-wikidata-q44331',
    title: 'Arthur Schnitzler (Q44331)',
    publisher: 'Wikidata',
    year: '2026',
    url: 'https://www.wikidata.org/wiki/Q44331',
    note: 'Stable identifier, birth date 15 May 1862 and death date 21 October 1931. Used for identity metadata only.',
  },
  'source-wien-geschichte-freud': {
    id: 'source-wien-geschichte-freud',
    title: 'Sigmund Freud',
    publisher: 'Wien Geschichte Wiki',
    year: '2025',
    url: 'https://www.geschichtewiki.wien.gv.at/Sigmund_Freud',
    note: 'Neurologist and founder of psychoanalysis; residence and practice at Berggasse 19 in the 9th district. The page gives the 1856-05-06 birth and 1939-09-23 death dates.',
  },
  'source-wikipedia-vienna-psychoanalytic-society': {
    id: 'source-wikipedia-vienna-psychoanalytic-society',
    title: 'Vienna Psychoanalytic Society',
    publisher: 'Wikipedia',
    year: '2025',
    url: 'https://en.wikipedia.org/wiki/Vienna_Psychoanalytic_Society',
    note: 'The Wednesday Psychological Society began meeting at Freud’s Berggasse 19 home in 1902 and was reconstituted as the Vienna Psychoanalytic Society in 1908. New members were admitted with the consent of the group.',
  },
  'source-wien-geschichte-victor-adler': {
    id: 'source-wien-geschichte-victor-adler',
    title: 'Victor Adler',
    publisher: 'Wien Geschichte Wiki',
    year: '2026',
    url: 'https://www.geschichtewiki.wien.gv.at/Victor_Adler',
    note: 'Physician, journalist and SDAP chairman from the Hainfeld congress (1888/89) until 1918; founder of Gleichheit and the Arbeiter-Zeitung. The page records his residence at Gumpendorfer Straße 54 / Blümelgasse 1 from 1905 to 1918.',
  },
  'source-parlament-oesterreich-victor-adler': {
    id: 'source-parlament-oesterreich-victor-adler',
    title: 'Dr. Victor Adler',
    publisher: 'Parlament Österreich',
    year: '2014',
    url: 'https://www.parlament.gv.at/person/11',
    note: 'Parliamentary biography: Reichsrat mandates, SDAP founding chairman 1888/89 and chairman 1889–1918, founder of the Arbeiter-Zeitung in 1889.',
  },
  'source-wien-geschichte-karl-kraus': {
    id: 'source-wien-geschichte-karl-kraus',
    title: 'Karl Kraus',
    publisher: 'Wien Geschichte Wiki',
    year: '2026',
    url: 'https://www.geschichtewiki.wien.gv.at/Karl_Kraus',
    note: 'Satirist, publicist and writer; editor of Die Fackel and, from 1911, its sole author. The page lists Lothringerstraße 6 as his residence and records his 1936-06-12 death.',
  },
  'source-karl-kraus-net-fackel-lauf': {
    id: 'source-karl-kraus-net-fackel-lauf',
    title: 'Der „Fackel“ Lauf (1899–1914)',
    publisher: 'karl-kraus.net',
    year: '2001–2003',
    url: 'http://www.karl-kraus.net/II.%20Der%20Fackel%20Lauf.htm',
    note: 'Chronology of Kraus’s addresses and the Fackel publishing office. Kraus moved into Lothringerstraße 6 on 12 February 1912; the Fackel was printed by Jahoda & Siegel.',
  },
  'source-wien-geschichte-die-fackel': {
    id: 'source-wien-geschichte-die-fackel',
    title: 'Die Fackel',
    publisher: 'Wien Geschichte Wiki',
    year: '2024',
    url: 'https://www.geschichtewiki.wien.gv.at/Die_Fackel',
    note: 'Satirical magazine founded by Karl Kraus in April 1899 and published until February 1936; the publisher’s office was at the Jahoda & Siegel printing house, Hintere Zollamtsstraße 3.',
  },
  'source-wien-geschichte-arthur-schnitzler': {
    id: 'source-wien-geschichte-arthur-schnitzler',
    title: 'Arthur Schnitzler',
    publisher: 'Wien Geschichte Wiki',
    year: '2025',
    url: 'https://www.geschichtewiki.wien.gv.at/Arthur_Schnitzler',
    note: 'Physician and writer; bought the villa at Sternwartestraße 71 in April 1910 and lived there until his 1931-10-21 death. Professor Bernhardi was completed in 1912 but could not be performed in Vienna until 1918.',
  },
  'source-wien-geschichte-cafe-central': {
    id: 'source-wien-geschichte-cafe-central',
    title: 'Café Central',
    publisher: 'Wien Geschichte Wiki',
    year: '2025',
    url: 'https://www.geschichtewiki.wien.gv.at/Caf%C3%A9_Central',
    note: 'Café at Herrengasse 14, a meeting place of Vienna’s literary circles. The page lists Karl Kraus and Arthur Schnitzler among its prominent literary visitors.',
  },
  'source-wien-geschichte-burgtheater': {
    id: 'source-wien-geschichte-burgtheater',
    title: 'Burgtheater',
    publisher: 'Wien Geschichte Wiki',
    year: '2026',
    url: 'https://www.geschichtewiki.wien.gv.at/Burgtheater',
    note: 'The court theatre at Universitätsring 2 since 1888. Its pre-war repertoire included Arthur Schnitzler’s plays; Hugo Thimig directed it from 1912.',
  },
  'source-wien-geschichte-arbeiterzeitung': {
    id: 'source-wien-geschichte-arbeiterzeitung',
    title: 'Arbeiterzeitung',
    publisher: 'Wien Geschichte Wiki',
    year: '2025',
    url: 'https://www.geschichtewiki.wien.gv.at/Arbeiterzeitung',
    note: 'Social-democratic daily founded in 1889 by Victor Adler’s circle. From 1910 its editorial office, administration and printing press were in the Vorwärts building at Rechte Wienzeile 97.',
  },
  'source-wien-geschichte-sdap': {
    id: 'source-wien-geschichte-sdap',
    title: 'Sozialdemokratische Arbeiterpartei (SDAP)',
    publisher: 'Wien Geschichte Wiki',
    year: '2025',
    url: 'https://www.geschichtewiki.wien.gv.at/Sozialdemokratische_Arbeiterpartei_(SDAP)',
    note: 'The SDAP was founded at the Hainfeld party congress of 1888/89 when Victor Adler unified the Austrian labour movement; it was the mass Social Democratic party of the Habsburg monarchy.',
  },
  'source-schnitzler-briefe-freud-1906': {
    id: 'source-schnitzler-briefe-freud-1906',
    title: 'Sigmund Freud an Arthur Schnitzler, 8. Mai 1906',
    publisher: 'Arthur Schnitzler: Briefwechsel mit Autorinnen und Autoren (ACDH-OEAW)',
    year: '2026',
    url: 'https://schnitzler-briefe.acdh.oeaw.ac.at/L03819.html',
    note: 'Freud writes from Berggasse 19 to Schnitzler about their long-recognised psychological affinities. This documents a public professional acquaintance, not a claim of close friendship or family ties.',
  },
  'source-schnitzler-briefe-kraus-1908': {
    id: 'source-schnitzler-briefe-kraus-1908',
    title: 'Karl Kraus an Arthur Schnitzler, 20. Jänner 1908',
    publisher: 'Arthur Schnitzler: Briefwechsel mit Autorinnen und Autoren (ACDH-OEAW)',
    year: '2026',
    url: 'https://schnitzler-briefe.acdh.oeaw.ac.at/L01754.html',
    note: 'Kraus writes from Schwindgasse 3 to Schnitzler about a translation request and congratulates him on the Grillparzer Prize. This is evidence of a literary acquaintance.',
  },
};

const ID = {
  places: {
    berggasse19: 'place-wien-bergasse-19',
    adlerHome: 'place-wien-adler-home',
    krausHome: 'place-wien-kraus-home',
    schnitzlerHome: 'place-wien-schnitzler-home',
    arbeiterZeitung: 'place-wien-arbeiter-zeitung',
    dieFackel: 'place-wien-die-fackel',
    cafeCentral: 'place-wien-cafe-central',
    burgtheater: 'place-wien-burgtheater',
  },
  households: {
    freud: 'hh-freud',
    adler: 'hh-adler',
    kraus: 'hh-kraus',
    schnitzler: 'hh-schnitzler',
  },
  persons: {
    freud: 'person-sigmund-freud',
    adler: 'person-victor-adler',
    kraus: 'person-karl-kraus',
    schnitzler: 'person-arthur-schnitzler',
  },
  organizations: {
    wednesdaySociety: 'org-wednesday-psychological-society',
    sdap: 'org-sdap',
    fackel: 'org-die-fackel',
  },
  positions: {
    freudWednesday: 'pos-freud-wednesday-founder',
    adlerSdap: 'pos-adler-sdap-chair',
    krausFackel: 'pos-kraus-fackel-editor',
  },
  relations: {
    freudSchnitzler: 'rel-freud-schnitzler',
    krausSchnitzler: 'rel-kraus-schnitzler',
  },
} as const;

const traits = (overrides: Partial<Person['traits']> = {}): Person['traits'] => ({
  care: 0.5,
  ambition: 0.5,
  tradition: 0.5,
  openness: 0.5,
  conscientiousness: 0.5,
  extraversion: 0.5,
  agreeableness: 0.5,
  neuroticism: 0.5,
  ...overrides,
});

const health = (vitality: number, overrides: Partial<Person['health']> = {}): Person['health'] => ({
  vitality,
  conditions: [],
  nutrition: 0.82,
  ...overrides,
});

const life = (reputation: number, skills: PersonLife['skills'], flags: string[]): PersonLife => ({
  mood: 0.55,
  reputation,
  skills,
  flags,
});

const relation = (
  id: string,
  a: string,
  b: string,
  kind: Relation['kind'],
  start: WorldDate,
  values: Partial<Omit<Relation, 'id' | 'a' | 'b' | 'kind' | 'start' | 'sharedEventIds'>> = {},
): Relation => ({
  id,
  a,
  b,
  kind,
  trust: 0.5,
  affection: 0.2,
  obligation: 0.1,
  fear: 0,
  respect: 0.5,
  start,
  sharedEventIds: [],
  ...values,
});

/**
 * Places are real addresses where a public page supports them. The three
 * additional home places are separate from every seed tenement and only carry
 * the curated person, because the rest of each historical household is not
 * being invented as named Persons.
 */
export const VIENNA_HISTORICAL_PLACES: Record<string, Place> = {
  [ID.places.berggasse19]: {
    id: ID.places.berggasse19,
    name: 'Berggasse 19, Wohnung und Ordination',
    kind: 'home',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 8,
    offers: ['sleep', 'medical_consultation', 'psychoanalytic_session', 'receive_callers'],
  },
  [ID.places.adlerHome]: {
    id: ID.places.adlerHome,
    name: 'Wohnhaus Victor Adler, Gumpendorfer Straße 54 / Blümelgasse 1',
    kind: 'home',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 4,
    offers: ['sleep', 'receive_callers', 'political_discussion'],
  },
  [ID.places.krausHome]: {
    id: ID.places.krausHome,
    name: 'Wohnung Karl Kraus, Lothringerstraße 6',
    kind: 'home',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 3,
    offers: ['sleep', 'write', 'receive_callers'],
  },
  [ID.places.schnitzlerHome]: {
    id: ID.places.schnitzlerHome,
    name: 'Villa Schnitzler, Sternwartestraße 71',
    kind: 'home',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 6,
    offers: ['sleep', 'write', 'receive_callers'],
  },
  [ID.places.arbeiterZeitung]: {
    id: ID.places.arbeiterZeitung,
    name: 'Arbeiter-Zeitung im Vorwärts-Haus',
    kind: 'other',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 80,
    offers: ['publish_newspaper', 'political_organizing', 'party_meeting', 'read_press'],
  },
  [ID.places.dieFackel]: {
    id: ID.places.dieFackel,
    name: 'Verlag Die Fackel, Hintere Zollamtsstraße 3',
    kind: 'other',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 12,
    offers: ['publish_magazine', 'satirical_writing', 'public_reading'],
  },
  [ID.places.cafeCentral]: {
    id: ID.places.cafeCentral,
    name: 'Café Central',
    kind: 'cafe',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 150,
    offers: ['coffee', 'read_newspapers', 'public_conversation', 'meet_writers'],
  },
  [ID.places.burgtheater]: {
    id: ID.places.burgtheater,
    name: 'Burgtheater',
    kind: 'other',
    settlementId: 'place-wien',
    regionId: 'region-lower-austria',
    polityId: 'polity-austria-hungary',
    capacity: 1200,
    offers: ['attend_performance', 'public_cultural_event', 'meet_audience'],
  },
};

/**
 * One-person historical households. guardianIds must stay empty: these homes
 * are not valid destinations for `createV4Birth`.
 */
export const VIENNA_HISTORICAL_HOUSEHOLDS: Record<string, Household> = {
  [ID.households.freud]: {
    id: ID.households.freud,
    residenceId: ID.places.berggasse19,
    memberIds: [ID.persons.freud],
    guardianIds: [],
    cash: 350,
    food: 25,
    debt: 0,
    rent: 120,
    obligations: [
      { id: 'ob-freud-rent', kind: 'rent', amount: 120 },
      { id: 'ob-freud-food', kind: 'food', amount: 70 },
    ],
    assets: [{ id: 'asset-freud-library', kind: 'consulting library and antiquities', value: 900 }],
    monthlyIncome: [
      { id: 'income-freud-practice', amount: 450, reason: 'medical consultations and writings' },
    ],
    sharingRules: 'separate',
  },
  [ID.households.adler]: {
    id: ID.households.adler,
    residenceId: ID.places.adlerHome,
    memberIds: [ID.persons.adler],
    guardianIds: [],
    cash: 180,
    food: 18,
    debt: 0,
    rent: 70,
    obligations: [
      { id: 'ob-adler-rent', kind: 'rent', amount: 70 },
      { id: 'ob-adler-food', kind: 'food', amount: 50 },
    ],
    assets: [{ id: 'asset-adler-library', kind: 'political library', value: 250 }],
    monthlyIncome: [{ id: 'income-adler-party', amount: 200, reason: 'party and editorial work' }],
    sharingRules: 'separate',
  },
  [ID.households.kraus]: {
    id: ID.households.kraus,
    residenceId: ID.places.krausHome,
    memberIds: [ID.persons.kraus],
    guardianIds: [],
    cash: 240,
    food: 12,
    debt: 0,
    rent: 60,
    obligations: [
      { id: 'ob-kraus-rent', kind: 'rent', amount: 60 },
      { id: 'ob-kraus-food', kind: 'food', amount: 30 },
    ],
    assets: [{ id: 'asset-kraus-library', kind: 'library and Fackel files', value: 400 }],
    monthlyIncome: [
      { id: 'income-kraus-fackel', amount: 180, reason: 'Fackel subscriptions and readings' },
    ],
    sharingRules: 'separate',
  },
  [ID.households.schnitzler]: {
    id: ID.households.schnitzler,
    residenceId: ID.places.schnitzlerHome,
    memberIds: [ID.persons.schnitzler],
    guardianIds: [],
    cash: 500,
    food: 24,
    debt: 0,
    rent: 110,
    obligations: [
      { id: 'ob-schnitzler-rent', kind: 'rent', amount: 110 },
      { id: 'ob-schnitzler-food', kind: 'food', amount: 80 },
    ],
    assets: [{ id: 'asset-schnitzler-library', kind: 'library and manuscripts', value: 500 }],
    monthlyIncome: [
      {
        id: 'income-schnitzler-royalties',
        amount: 350,
        reason: 'royalties and theatre income',
      },
    ],
    sharingRules: 'separate',
  },
};

/**
 * The Wednesday circle became the Vienna Psychoanalytic Society in 1908. The
 * stable content ID keeps the earlier name; the display name reflects 1912.
 * Only Freud is modelled by name, so the organization claims no invented
 * membership beyond the people in this file.
 */
export const VIENNA_HISTORICAL_ORGANIZATIONS: Record<string, Organization> = {
  [ID.organizations.wednesdaySociety]: {
    id: ID.organizations.wednesdaySociety,
    name: 'Wiener Psychoanalytische Vereinigung',
    kind: 'other',
    placeId: ID.places.berggasse19,
    memberIds: [ID.persons.freud],
    positions: [ID.positions.freudWednesday],
    treasury: 40,
    monthlyRevenue: 10,
    authorityRules: [
      'members_meet_to_present_and_discuss_cases',
      'new_members_are_admitted_by_member_consent',
      'society_cannot_command_public_institutions',
    ],
    projects: [],
    status: 'active',
    causeIds: [],
  },
  [ID.organizations.sdap]: {
    id: ID.organizations.sdap,
    name: 'Sozialdemokratische Arbeiterpartei Österreichs (SDAP)',
    kind: 'party',
    placeId: ID.places.arbeiterZeitung,
    memberIds: [ID.persons.adler],
    positions: [ID.positions.adlerSdap],
    treasury: 1200,
    monthlyRevenue: 350,
    authorityRules: [
      'party_congress_sets_program_and_leadership',
      'chair_represents_party_and_convenes_leadership',
      'membership_dues_and_press_sales_fund_party_work',
      'party_cannot_command_state_organs',
    ],
    projects: [],
    status: 'active',
    causeIds: [],
  },
  [ID.organizations.fackel]: {
    id: ID.organizations.fackel,
    name: 'Die Fackel',
    kind: 'other',
    placeId: ID.places.dieFackel,
    memberIds: [ID.persons.kraus],
    positions: [ID.positions.krausFackel],
    treasury: 200,
    monthlyRevenue: 70,
    authorityRules: [
      'editor_selects_and_publishes_texts',
      'subscribers_receive_issues',
      'editor_cannot_command_public_institutions',
    ],
    projects: [],
    status: 'active',
    causeIds: [],
  },
};

export const VIENNA_HISTORICAL_POSITIONS: Record<string, Position> = {
  [ID.positions.freudWednesday]: {
    id: ID.positions.freudWednesday,
    organizationId: ID.organizations.wednesdaySociety,
    title: 'Gründer und Lehranalytiker',
    holderId: ID.persons.freud,
    authority: ['convene_discussion', 'present_case', 'invite_guest'],
    start: { year: 1902, month: 10 },
  },
  [ID.positions.adlerSdap]: {
    id: ID.positions.adlerSdap,
    organizationId: ID.organizations.sdap,
    title: 'Parteivorsitzender',
    holderId: ID.persons.adler,
    authority: ['represent_party', 'convene_leadership', 'speak_for_party'],
    start: { year: 1889, month: 1 },
  },
  [ID.positions.krausFackel]: {
    id: ID.positions.krausFackel,
    organizationId: ID.organizations.fackel,
    title: 'Herausgeber',
    holderId: ID.persons.kraus,
    authority: ['select_texts', 'publish_issue', 'answer_subscribers'],
    start: { year: 1899, month: 4 },
  },
};

/**
 * Only two public acquaintanceships are asserted. Both are documented by
 * surviving correspondence; neither is a family tie or a claim of intimacy.
 */
export const VIENNA_HISTORICAL_RELATIONS: Record<string, Relation> = {
  [ID.relations.freudSchnitzler]: relation(
    ID.relations.freudSchnitzler,
    ID.persons.freud,
    ID.persons.schnitzler,
    'acquaintance',
    { year: 1906, month: 5 },
    { trust: 0.55, affection: 0.25, obligation: 0.1, fear: 0, respect: 0.8 },
  ),
  [ID.relations.krausSchnitzler]: relation(
    ID.relations.krausSchnitzler,
    ID.persons.kraus,
    ID.persons.schnitzler,
    'acquaintance',
    { year: 1908, month: 1 },
    { trust: 0.4, affection: 0.15, obligation: 0.1, fear: 0.05, respect: 0.55 },
  ),
};

const relationIdsFor = (personId: string): string[] =>
  Object.values(VIENNA_HISTORICAL_RELATIONS)
    .filter((entry) => entry.a === personId || entry.b === personId)
    .map((entry) => entry.id);

/**
 * Curated historical Person records. Traits, skills and household budgets are
 * simulation parameters, not biographical assertions; the historicalIdentity
 * notes are the sourced identity claims.
 */
export const VIENNA_HISTORICAL_PEOPLE: Record<string, Person> = {
  [ID.persons.freud]: {
    id: ID.persons.freud,
    name: 'Sigmund Freud',
    sex: 'male',
    born: { year: 1856, month: 5 },
    locationId: ID.places.berggasse19,
    householdId: ID.households.freud,
    parentIds: [],
    guardianIds: [],
    health: health(0.7, { nutrition: 0.85 }),
    traits: traits({
      care: 0.55,
      ambition: 0.8,
      tradition: 0.55,
      openness: 0.85,
      conscientiousness: 0.85,
      extraversion: 0.45,
      agreeableness: 0.45,
      neuroticism: 0.5,
    }),
    education: { status: 'higher', level: 8 },
    roles: ['physician', 'psychoanalyst', 'professor', 'historical'],
    projectIds: [],
    relationshipIds: relationIdsFor(ID.persons.freud),
    knowledgeIds: [],
    life: life(0.82, { literacy: 0.98, numeracy: 0.7, craft: 0.3, social: 0.8 }, [
      'physician',
      'public_intellectual',
    ]),
    historicalIdentity: {
      id: 'Q9215',
      sourceIds: [
        'source-wikidata-q9215',
        'source-wien-geschichte-freud',
        'source-wikipedia-vienna-psychoanalytic-society',
        'source-schnitzler-briefe-freud-1906',
      ],
      birthPrecision: 'day',
      occupation: 'Neurologe und Psychoanalytiker',
      publicRole: 'Arzt und Begründer der Psychoanalyse',
      activityRegionIds: ['region-lower-austria'],
      activeFrom: { year: 1886, month: 4 },
      activeTo: { year: 1939, month: 9 },
      realWorldDeath: { year: 1939, month: 9, day: 23 },
      biographyIsNotFate: true,
      notes:
        'Lived and practised at Berggasse 19 from 1891. The Wednesday evening group met there from 1902 and was reconstituted as the Vienna Psychoanalytic Society in 1908. Identity and public activity only; the simulator may diverge.',
    },
    provenance: { kind: 'historical_activation', sourceId: 'Q9215' },
  },
  [ID.persons.adler]: {
    id: ID.persons.adler,
    name: 'Victor Adler',
    sex: 'male',
    born: { year: 1852, month: 6 },
    locationId: ID.places.adlerHome,
    householdId: ID.households.adler,
    parentIds: [],
    guardianIds: [],
    health: health(0.62, { nutrition: 0.8 }),
    traits: traits({
      care: 0.7,
      ambition: 0.8,
      tradition: 0.4,
      openness: 0.65,
      conscientiousness: 0.8,
      extraversion: 0.65,
      agreeableness: 0.6,
      neuroticism: 0.4,
    }),
    education: { status: 'higher', level: 7 },
    roles: ['politician', 'party_chairman', 'journalist', 'historical'],
    projectIds: [],
    relationshipIds: relationIdsFor(ID.persons.adler),
    knowledgeIds: [],
    life: life(0.88, { literacy: 0.95, numeracy: 0.7, craft: 0.25, social: 0.9 }, [
      'party_leader',
      'public_speaker',
    ]),
    historicalIdentity: {
      id: 'Q366845',
      sourceIds: [
        'source-wikidata-q366845',
        'source-wien-geschichte-victor-adler',
        'source-parlament-oesterreich-victor-adler',
        'source-wien-geschichte-sdap',
      ],
      birthPrecision: 'day',
      occupation: 'Politiker, Arzt und Journalist',
      publicRole: 'Vorsitzender der Sozialdemokratischen Arbeiterpartei',
      activityRegionIds: ['region-lower-austria'],
      activeFrom: { year: 1889, month: 1 },
      activeTo: { year: 1918, month: 11 },
      realWorldDeath: { year: 1918, month: 11, day: 11 },
      biographyIsNotFate: true,
      notes:
        'Chairman of the SDAP from the Hainfeld congress (1888/89) until 1918; founder of the Arbeiter-Zeitung. Lived at Gumpendorfer Straße 54 / Blümelgasse 1 from 1905 to 1918. Identity and public activity only; the simulator may diverge.',
    },
    provenance: { kind: 'historical_activation', sourceId: 'Q366845' },
  },
  [ID.persons.kraus]: {
    id: ID.persons.kraus,
    name: 'Karl Kraus',
    sex: 'male',
    born: { year: 1874, month: 4 },
    locationId: ID.places.krausHome,
    householdId: ID.households.kraus,
    parentIds: [],
    guardianIds: [],
    health: health(0.7, { nutrition: 0.8 }),
    traits: traits({
      care: 0.45,
      ambition: 0.75,
      tradition: 0.6,
      openness: 0.8,
      conscientiousness: 0.8,
      extraversion: 0.4,
      agreeableness: 0.25,
      neuroticism: 0.65,
    }),
    education: { status: 'higher', level: 5 },
    roles: ['writer', 'editor', 'satirist', 'historical'],
    projectIds: [],
    relationshipIds: relationIdsFor(ID.persons.kraus),
    knowledgeIds: [],
    life: life(0.8, { literacy: 0.99, numeracy: 0.6, craft: 0.2, social: 0.65 }, [
      'editor',
      'public_lecturer',
    ]),
    historicalIdentity: {
      id: 'Q44328',
      sourceIds: [
        'source-wikidata-q44328',
        'source-wien-geschichte-karl-kraus',
        'source-karl-kraus-net-fackel-lauf',
        'source-wien-geschichte-die-fackel',
      ],
      birthPrecision: 'day',
      occupation: 'Schriftsteller, Satiriker und Publizist',
      publicRole: 'Herausgeber der Fackel',
      activityRegionIds: ['region-lower-austria'],
      activeFrom: { year: 1899, month: 4 },
      activeTo: { year: 1936, month: 6 },
      realWorldDeath: { year: 1936, month: 6, day: 12 },
      biographyIsNotFate: true,
      notes:
        'Founded Die Fackel in April 1899 and was its sole author from 1911. Moved to Lothringerstraße 6 in February 1912. Identity and public activity only; the simulator may diverge.',
    },
    provenance: { kind: 'historical_activation', sourceId: 'Q44328' },
  },
  [ID.persons.schnitzler]: {
    id: ID.persons.schnitzler,
    name: 'Arthur Schnitzler',
    sex: 'male',
    born: { year: 1862, month: 5 },
    locationId: ID.places.schnitzlerHome,
    householdId: ID.households.schnitzler,
    parentIds: [],
    guardianIds: [],
    health: health(0.75, { nutrition: 0.85 }),
    traits: traits({
      care: 0.6,
      ambition: 0.65,
      tradition: 0.5,
      openness: 0.85,
      conscientiousness: 0.7,
      extraversion: 0.55,
      agreeableness: 0.55,
      neuroticism: 0.6,
    }),
    education: { status: 'higher', level: 7 },
    roles: ['writer', 'physician', 'dramatist', 'historical'],
    projectIds: [],
    relationshipIds: relationIdsFor(ID.persons.schnitzler),
    knowledgeIds: [],
    life: life(0.85, { literacy: 0.98, numeracy: 0.6, craft: 0.2, social: 0.8 }, [
      'playwright',
      'physician_writer',
    ]),
    historicalIdentity: {
      id: 'Q44331',
      sourceIds: [
        'source-wikidata-q44331',
        'source-wien-geschichte-arthur-schnitzler',
        'source-wien-geschichte-cafe-central',
        'source-wien-geschichte-burgtheater',
        'source-schnitzler-briefe-freud-1906',
      ],
      birthPrecision: 'day',
      occupation: 'Arzt und Schriftsteller',
      publicRole: 'Dramatiker und Erzähler',
      activityRegionIds: ['region-lower-austria'],
      activeFrom: { year: 1893, month: 1 },
      activeTo: { year: 1931, month: 10 },
      realWorldDeath: { year: 1931, month: 10, day: 21 },
      biographyIsNotFate: true,
      notes:
        'Physician and writer; lived at Sternwartestraße 71 from 1910. Professor Bernhardi was completed in 1912 but censored in Vienna until 1918. Identity and public activity only; the simulator may diverge.',
    },
    provenance: { kind: 'historical_activation', sourceId: 'Q44331' },
  },
};

function addMissing<T>(target: Record<string, T>, records: Record<string, T>): void {
  for (const [id, record] of Object.entries(records)) {
    if (!target[id]) target[id] = structuredClone(record);
  }
}

/**
 * Add the curated historical cast to a world. Pure with respect to the input:
 * the returned world is a clone. Existing records with the same stable IDs are
 * left in place so a loaded save is not rewritten by a seed call.
 *
 * This function deliberately does not create a HistoricalProcess. Historical
 * process state belongs to the engine/main integration and must be created
 * through the normal WorldDevelopment path.
 */
export function applyViennaHistoricalPeople(world: WorldState): WorldState {
  const next = structuredClone(world);

  addMissing(next.places, VIENNA_HISTORICAL_PLACES);
  addMissing(next.households, VIENNA_HISTORICAL_HOUSEHOLDS);
  addMissing(next.organizations, VIENNA_HISTORICAL_ORGANIZATIONS);
  addMissing(next.positions, VIENNA_HISTORICAL_POSITIONS);
  addMissing(next.persons, VIENNA_HISTORICAL_PEOPLE);
  addMissing(next.relations, VIENNA_HISTORICAL_RELATIONS);

  // Keep the bidirectional convenience index consistent without duplicating it.
  for (const entry of Object.values(VIENNA_HISTORICAL_RELATIONS)) {
    for (const personId of [entry.a, entry.b]) {
      const person = next.persons[personId];
      if (person && !person.relationshipIds.includes(entry.id))
        person.relationshipIds.push(entry.id);
    }
  }

  // A curated person must appear in their own one-person household even if a
  // caller had already created the household without the member link.
  for (const person of Object.values(VIENNA_HISTORICAL_PEOPLE)) {
    const household = next.households[person.householdId];
    if (household && !household.memberIds.includes(person.id)) household.memberIds.push(person.id);
  }

  // The same for curated organizations and their named member(s).
  for (const organization of Object.values(VIENNA_HISTORICAL_ORGANIZATIONS)) {
    const current = next.organizations[organization.id];
    if (!current) continue;
    for (const memberId of organization.memberIds) {
      if (next.persons[memberId] && !current.memberIds.includes(memberId))
        current.memberIds.push(memberId);
    }
    for (const positionId of organization.positions) {
      if (next.positions[positionId] && !current.positions.includes(positionId))
        current.positions.push(positionId);
    }
  }

  assertWorldV4(next);
  return next;
}
