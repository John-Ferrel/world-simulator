import { describe, expect, it } from 'vitest';
import { population, type HistoricalEvent, type World } from '../packages/contracts/index.js';
import { createWorld } from '../packages/world-packs/index.js';
import {
  authorityAt,
  applyHistoricalStartControl,
  diplomaticCamp,
  diplomacyDecision,
  enforceDependentDiplomacy,
  foreignAuthority,
  initializeSovereignty,
  materializeHistoricalAuthorities,
  remitSovereignRevenue,
  requestSovereigntyTransition,
  synchronizeSovereigntyControl,
  type SovereigntyState,
} from '../packages/sovereignty/index.js';

function fixture(settlementIds: string[], modernIds: string[]) {
  const w = createWorld('sovereignty-test');
  w.pack.id = 'earth-1900';
  w.calendar = { startYear: 1900, mode: 'historical-simulation', sources: [] };
  w.polities = modernIds.map((id, i) => ({
    id,
    name: id,
    color: '#456789',
    treasury: 100,
    legitimacy: 0.7,
    tax: 0.1,
    leaderId: '',
    military: 1,
    research: 0,
  }));
  w.settlements = settlementIds.map((id, i) => {
    const original = structuredClone(w.settlements[i]);
    original.id = id;
    original.polityId = modernIds[i % modernIds.length]!;
    original.coin = 40;
    original.unrest = 0;
    return original;
  });
  const locationId = w.settlements[0]!.id;
  w.persons = w.persons.slice(0, 3);
  for (const person of w.persons) person.locationId = locationId;
  w.organizations = w.organizations.slice(0, 1);
  w.organizations[0]!.locationId = locationId;
  w.organizations[0]!.memberIds = w.persons.map((person) => person.id);
  w.organizations[0]!.treasury = 20;
  const events: HistoricalEvent[] = [];
  const emit = (
    kind: string,
    personIds: string[],
    locationId: string | undefined,
    text: string,
    data: Record<string, unknown> = {},
    causeIds: string[] = [],
    significance = 0.5,
  ): HistoricalEvent => {
    const event: HistoricalEvent = {
      id: `event-${++w.eventSeq}`,
      worldId: w.id,
      month: w.month,
      kind,
      personIds,
      locationId,
      text,
      data,
      causeIds,
      significance,
    };
    events.push(event);
    return event;
  };
  return { w, events, emit };
}

describe('historical sovereignty', () => {
  it('initializes 1900 control separately from modern region identity', () => {
    const { w, emit } = fixture(['earth-city-234', 'earth-city-219'], ['IND', 'GBR']);
    const state = initializeSovereignty(w, emit)!;
    expect(state.mode).toBe('historical-start');
    expect(w.settlements[0]!.polityId).toBe('IND');
    expect(authorityAt(w, 'earth-city-234')?.baseline.historicalUnitCode).toBe(750);
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('GBR');
    expect(authorityAt(w, 'earth-city-234')?.current.status).toBe('colony');
    expect(foreignAuthority(w, 'IND').authorityPolityId).toBe('GBR');
    expect(authorityAt(w, 'earth-city-219')?.current.controllerPolityId).toBe('GBR');
  });

  it('keeps non-1900 worlds reference-only and never rewrites current settlement control', () => {
    const { w } = fixture(['earth-city-234'], ['IND', 'GBR']);
    w.month = 2;
    const state = initializeSovereignty(w)!;
    expect(state.mode).toBe('reference-only');
    expect(w.settlements[0]!.polityId).toBe('IND');
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('IND');
  });

  it('leaves an explicit missing crosswalk unknown instead of guessing', () => {
    const { w } = fixture(['earth-city-234'], ['IND']);
    const state = initializeSovereignty(w, undefined, { gwToIso3: {} })!;
    expect(state.authorities['earth-city-234']?.baseline.historicalUnitCode).toBe(750);
    expect(state.authorities['earth-city-234']?.baseline.sovereignPolityId).toBeUndefined();
    expect(state.authorities['earth-city-234']?.current.controllerPolityId).toBeUndefined();
    expect(foreignAuthority(w, 'IND').kind).toBe('unknown');
  });

  it("keeps an occupied city's actual controller ahead of the historical sovereign reference", () => {
    const { w } = fixture(['earth-city-159'], ['CUB', 'USA']);
    const state = initializeSovereignty(w)!;
    expect(state.authorities['earth-city-159']?.baseline.status).toBe('occupied');
    expect(state.authorities['earth-city-159']?.baseline.sovereignPolityId).toBe('USA');
    expect(state.authorities['earth-city-159']?.current.controllerPolityId).toBe('USA');
  });

  it('materializes the four non-ISO 1900 independent authorities without minting population or assets', () => {
    const { w } = fixture(
      [
        'earth-city-130',
        'earth-ne-1159136687',
        'earth-city-67',
        'earth-ne-1159127509',
        'earth-ne-1159116707',
      ],
      ['BIH', 'ZAF', 'KOR', 'PRK', 'AUT', 'HUN'],
    );
    w.settlements[0]!.polityId = 'BIH';
    w.settlements[1]!.polityId = 'ZAF';
    w.settlements[2]!.polityId = 'ZAF';
    w.settlements[3]!.polityId = 'KOR';
    w.settlements[4]!.polityId = 'PRK';
    const beforePopulation = population(w);
    const beforeMoney =
      w.settlements.reduce((sum, settlement) => sum + settlement.coin, 0) +
      w.polities.reduce((sum, polity) => sum + polity.treasury, 0);
    expect(materializeHistoricalAuthorities(w)).toEqual([
      'historical-gw-300',
      'historical-gw-563',
      'historical-gw-564',
      'historical-gw-730',
    ]);
    const state = initializeSovereignty(w)!;
    const historicalPolities = w.polities.filter((polity) =>
      polity.id.startsWith('historical-gw-'),
    );
    expect(historicalPolities.map((polity) => [polity.id, polity.name])).toEqual([
      ['historical-gw-300', 'Austria-Hungary'],
      ['historical-gw-563', 'Transvaal'],
      ['historical-gw-564', 'Orange Free State'],
      ['historical-gw-730', 'Korea'],
    ]);
    expect(
      historicalPolities.every(
        (polity) =>
          polity.treasury === 0 &&
          polity.military === 0 &&
          polity.research === 0 &&
          polity.leaderId === '',
      ),
    ).toBe(true);
    expect(state.authorities['earth-city-130']?.current.controllerPolityId).toBe(
      'historical-gw-300',
    );
    expect(state.authorities['earth-ne-1159136687']?.current.controllerPolityId).toBe(
      'historical-gw-563',
    );
    expect(state.authorities['earth-city-67']?.current.controllerPolityId).toBe(
      'historical-gw-564',
    );
    expect(state.authorities['earth-ne-1159127509']?.current.controllerPolityId).toBe(
      'historical-gw-730',
    );
    expect(state.authorities['earth-ne-1159116707']?.current.controllerPolityId).toBe(
      'historical-gw-730',
    );
    expect(['AUT', 'HUN']).not.toContain(
      state.authorities['earth-city-130']?.current.controllerPolityId,
    );
    expect(['KOR', 'PRK']).not.toContain(
      state.authorities['earth-ne-1159127509']?.current.controllerPolityId,
    );
    expect(diplomaticCamp(w, 'historical-gw-730')).toEqual(expect.arrayContaining(['KOR', 'PRK']));
    expect(population(w)).toBe(beforePopulation);
    expect(
      w.settlements.reduce((sum, settlement) => sum + settlement.coin, 0) +
        w.polities.reduce((sum, polity) => sum + polity.treasury, 0),
    ).toBe(beforeMoney);
  });

  it('does not create historical authorities in a month-positive existing world', () => {
    const { w } = fixture(['earth-city-130'], ['BIH', 'AUT', 'HUN']);
    w.month = 1;
    expect(materializeHistoricalAuthorities(w)).toEqual([]);
    applyHistoricalStartControl(w);
    expect(w.polities.some((polity) => polity.id.startsWith('historical-gw-'))).toBe(false);
    expect(w.settlements[0]!.polityId).toBe('BIH');
    expect(w.settlements[0]!.regionId).toBeUndefined();
  });

  it('retags only fresh 1900 control and conserves populations and source-polity assets', () => {
    const { w } = fixture(
      ['earth-city-234', 'earth-city-219', 'earth-city-159'],
      ['IND', 'GBR', 'CUB', 'USA'],
    );
    w.polities.find((polity) => polity.id === 'IND')!.military = 80;
    w.polities.find((polity) => polity.id === 'GBR')!.military = 20;
    w.polities.find((polity) => polity.id === 'CUB')!.military = 60;
    w.polities.find((polity) => polity.id === 'USA')!.military = 100;
    w.polities.find((polity) => polity.id === 'IND')!.research = 0.5;
    w.polities.find((polity) => polity.id === 'GBR')!.research = 0.8;
    w.polities.find((polity) => polity.id === 'CUB')!.research = 0.2;
    w.polities.find((polity) => polity.id === 'USA')!.research = 0.3;
    const maxMilitary = Math.max(...w.polities.map((polity) => polity.military));
    const maxResearch = Math.max(...w.polities.map((polity) => polity.research));
    const beforePopulation = population(w);
    const beforeMoney =
      w.settlements.reduce((sum, settlement) => sum + settlement.coin, 0) +
      w.polities.reduce((sum, polity) => sum + polity.treasury, 0);
    const state = applyHistoricalStartControl(w)!;
    const regionSettlements = w.settlements as ((typeof w.settlements)[number] & {
      regionId?: string;
    })[];
    expect(
      regionSettlements.map((settlement) => [settlement.regionId, settlement.polityId]),
    ).toEqual([
      ['IND', 'GBR'],
      ['GBR', 'GBR'],
      ['CUB', 'USA'],
    ]);
    expect(state.controlApplied).toBe(true);
    expect(state.modernPolityRegistry.some((polity) => polity.id === 'IND')).toBe(true);
    expect(w.polities.some((polity) => polity.id === 'IND')).toBe(false);
    expect(w.polities.find((polity) => polity.id === 'GBR')!.treasury).toBe(200);
    expect(w.polities.find((polity) => polity.id === 'GBR')!.military).toBe(50);
    expect(Math.max(...w.polities.map((polity) => polity.military))).toBeLessThanOrEqual(
      maxMilitary,
    );
    expect(Math.max(...w.polities.map((polity) => polity.research))).toBeLessThanOrEqual(
      maxResearch,
    );
    expect(population(w)).toBe(beforePopulation);
    expect(
      w.settlements.reduce((sum, settlement) => sum + settlement.coin, 0) +
        w.polities.reduce((sum, polity) => sum + polity.treasury, 0),
    ).toBe(beforeMoney);
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('GBR');
  });

  it('averages bounded military and research indices across regions under a historical authority', () => {
    const { w } = fixture(['earth-city-130', 'earth-ne-1159114055'], ['BIH', 'HUN', 'AUT']);
    w.settlements[0]!.polityId = 'BIH';
    w.settlements[1]!.polityId = 'HUN';
    w.polities.find((polity) => polity.id === 'BIH')!.military = 80;
    w.polities.find((polity) => polity.id === 'HUN')!.military = 20;
    w.polities.find((polity) => polity.id === 'BIH')!.research = 0.8;
    w.polities.find((polity) => polity.id === 'HUN')!.research = 0.2;
    applyHistoricalStartControl(w);
    const austriaHungary = w.polities.find((polity) => polity.id === 'historical-gw-300')!;
    expect(w.settlements.map((settlement) => settlement.polityId)).toEqual([
      'historical-gw-300',
      'historical-gw-300',
    ]);
    expect(austriaHungary.military).toBe(50);
    expect(austriaHungary.research).toBeCloseTo(0.5, 12);
    expect(austriaHungary.military).toBeLessThanOrEqual(80);
    expect(austriaHungary.research).toBeLessThanOrEqual(0.8);
  });

  it('reactivates only a registered modern polity for a real independence transition and changes live owner', () => {
    const { w, emit } = fixture(['earth-city-234', 'earth-city-219'], ['IND', 'GBR']);
    applyHistoricalStartControl(w);
    w.settlements[0]!.unrest = 0.5;
    w.polities.find((polity) => polity.id === 'GBR')!.legitimacy = 0.1;
    const organizationCoin = w.organizations[0]!.treasury;
    const result = requestSovereigntyTransition(
      w,
      { action: 'independence', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
      emit,
    );
    expect(result.ok).toBe(true);
    expect(w.polities.some((polity) => polity.id === 'IND')).toBe(true);
    expect(w.polities.find((polity) => polity.id === 'IND')!).toMatchObject({
      treasury: 0,
      military: 0,
      research: 0,
      leaderId: '',
    });
    expect(w.settlements[0]!.regionId).toBe('IND');
    expect(w.settlements[0]!.polityId).toBe('IND');
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('IND');
    expect(w.organizations[0]!.treasury).toBe(organizationCoin - 5);
  });

  it('keeps autonomy administratively local but sovereign diplomacy and remittance with the parent', () => {
    const { w, emit } = fixture(['earth-city-234', 'earth-city-219'], ['IND', 'GBR']);
    initializeSovereignty(w);
    w.settlements[0]!.unrest = 0.5;
    const denied = requestSovereigntyTransition(
      w,
      { action: 'autonomy', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
      emit,
    );
    expect(denied.ok).toBe(false);
    w.polities.find((p) => p.id === 'GBR')!.legitimacy = 0.3;
    const result = requestSovereigntyTransition(
      w,
      { action: 'autonomy', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
      emit,
    );
    expect(result.ok).toBe(true);
    expect(authorityAt(w, 'earth-city-234')?.current).toMatchObject({
      status: 'autonomous',
      controllerPolityId: 'IND',
      sovereignPolityId: 'GBR',
    });
    expect(foreignAuthority(w, 'IND').authorityPolityId).toBe('GBR');
    expect(diplomaticCamp(w, 'IND')).toEqual(expect.arrayContaining(['IND', 'GBR']));
    const before = w.polities.find((polity) => polity.id === 'GBR')!.treasury;
    remitSovereignRevenue(w, 'earth-city-234', 10);
    expect(w.polities.find((polity) => polity.id === 'GBR')!.treasury).toBe(before + 10);
    expect(w.polities.find((polity) => polity.id === 'IND')!.treasury).toBe(100);
    w.polities.find((polity) => polity.id === 'GBR')!.legitimacy = 0.1;
    const independence = requestSovereigntyTransition(
      w,
      { action: 'independence', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
      emit,
    );
    expect(independence.ok).toBe(true);
    expect(authorityAt(w, 'earth-city-234')?.current).toMatchObject({
      status: 'independent',
      controllerPolityId: 'IND',
      sovereignPolityId: 'IND',
    });
    expect(foreignAuthority(w, 'IND').authorityPolityId).toBe('IND');
  });

  it('requires a parent authority collapse before independence', () => {
    const { w, emit } = fixture(['earth-city-234'], ['IND', 'GBR']);
    initializeSovereignty(w);
    w.settlements[0]!.unrest = 0.5;
    expect(
      requestSovereigntyTransition(
        w,
        { action: 'independence', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
        emit,
      ),
    ).toMatchObject({ ok: false, error: expect.stringContaining('parent authority to collapse') });
  });

  it('remits only available settlement money to the actual controller', () => {
    const { w } = fixture(['earth-city-234'], ['IND', 'GBR']);
    initializeSovereignty(w);
    const before = w.settlements[0]!.coin + w.polities.reduce((sum, p) => sum + p.treasury, 0);
    const result = remitSovereignRevenue(w, 'earth-city-234', 100);
    expect(result.ok).toBe(true);
    expect(w.settlements[0]!.coin).toBe(0);
    expect(w.polities.find((p) => p.id === 'GBR')!.treasury).toBe(140);
    expect(w.settlements[0]!.coin + w.polities.reduce((sum, p) => sum + p.treasury, 0)).toBe(
      before,
    );
    expect(remitSovereignRevenue(w, 'earth-city-234', 1)).toMatchObject({
      ok: false,
      reason: 'no-available-funds',
    });
  });

  it('uses live occupation control for authority and revenue without mutating the baseline on reads', () => {
    const { w } = fixture(
      ['earth-city-234', 'earth-ne-1159122449', 'earth-city-219'],
      ['IND', 'DEU', 'GBR'],
    );
    initializeSovereignty(w);
    const storedAuthority = (w as World & { sovereignty?: SovereigntyState }).sovereignty!
      .authorities['earth-city-234']!;
    const originalBaseline = structuredClone(storedAuthority.baseline);
    w.settlements[0]!.polityId = 'DEU';
    expect(authorityAt(w, 'earth-city-234')?.current).toMatchObject({
      controllerPolityId: 'DEU',
      source: 'live-settlement-controller',
    });
    expect(foreignAuthority(w, 'IND').authorityPolityId).toBe('DEU');
    expect(diplomacyDecision(w, 'IND', 'GBR').allowed).toBe(true);
    expect(storedAuthority.current.controllerPolityId).toBe('GBR');
    expect(storedAuthority.baseline).toEqual(originalBaseline);
    const beforeGbr = w.polities.find((polity) => polity.id === 'GBR')!.treasury;
    const beforeDeu = w.polities.find((polity) => polity.id === 'DEU')!.treasury;
    remitSovereignRevenue(w, 'earth-city-234', 10);
    expect(w.polities.find((polity) => polity.id === 'GBR')!.treasury).toBe(beforeGbr);
    expect(w.polities.find((polity) => polity.id === 'DEU')!.treasury).toBe(beforeDeu + 10);
  });

  it('records committed capture and liberation events so recapture by the original local polity stays current', () => {
    const { w } = fixture(['earth-city-234'], ['IND', 'GBR', 'DEU']);
    const state = initializeSovereignty(w)!;
    const authority = state.authorities['earth-city-234']!;
    w.settlements[0]!.polityId = 'DEU';
    expect(synchronizeSovereigntyControl(w, ['earth-city-234'], 'event-capture')[0]).toMatchObject({
      action: 'control',
      previousControllerPolityId: 'GBR',
      newControllerPolityId: 'DEU',
      causeIds: ['event-capture'],
    });
    w.settlements[0]!.polityId = 'IND';
    expect(
      synchronizeSovereigntyControl(w, ['earth-city-234'], 'event-liberation')[0],
    ).toMatchObject({
      previousControllerPolityId: 'DEU',
      newControllerPolityId: 'IND',
      causeIds: ['event-liberation'],
    });
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('IND');
    expect(authority.baseline.sovereignPolityId).toBe('GBR');
    expect(authority.current.causeIds).toEqual(['event-liberation']);
  });

  it('reuses indexed world references across repeated region and camp queries', () => {
    const { w } = fixture(['earth-city-234', 'earth-city-219'], ['IND', 'GBR']);
    initializeSovereignty(w);
    let numericReads = 0;
    w.settlements = new Proxy(w.settlements, {
      get(target, property, receiver) {
        if (typeof property === 'string' && /^\d+$/.test(property)) numericReads++;
        return Reflect.get(target, property, receiver);
      },
    });
    foreignAuthority(w, 'IND');
    numericReads = 0;
    for (let i = 0; i < 20; i++) {
      foreignAuthority(w, 'IND');
      diplomaticCamp(w, 'IND');
      authorityAt(w, 'earth-city-234');
    }
    expect(numericReads).toBe(0);
  });

  it('blocks diplomacy between known dependent polities under the same authority', () => {
    const { w, emit, events } = fixture(['earth-city-234', 'earth-city-219'], ['IND', 'GBR']);
    initializeSovereignty(w);
    expect(diplomacyDecision(w, 'IND', 'GBR')).toMatchObject({
      allowed: false,
      reason: 'same-sovereign-authority',
      sharedAuthorityPolityId: 'GBR',
    });
    w.geopolitics = {
      version: 1,
      governments: {},
      relations: {
        'GBR~IND': {
          id: 'GBR~IND',
          a: 'GBR',
          b: 'IND',
          affinity: 0,
          dispute: 1,
          trade: 0,
          status: 'war',
          treatySince: 0,
          causeIds: ['war-cause'],
        },
      },
      wars: [
        {
          id: 'war-dependencies',
          a: 'GBR',
          b: 'IND',
          campA: ['GBR'],
          campB: ['IND'],
          started: 0,
          status: 'active',
          causeIds: ['war-cause'],
          fronts: [],
          mobilized: { GBR: 3, IND: 2 },
          supplyFulfillment: {},
          consumedSupplies: {},
          casualties: {},
          occupied: [],
          months: 2,
          settlementOwnerBefore: {},
        },
      ],
      atrocities: [],
      lastEventIds: [],
      pendingCasualties: [],
      lastAdvancedMonth: 0,
      lastEffectsMonth: 0,
      routeBaseCapacity: {},
      routeBaseStatus: {},
      lastAtrocityStarted: {},
    };
    const cancelled = enforceDependentDiplomacy(w, emit);
    expect(cancelled).toHaveLength(1);
    expect(w.geopolitics.wars[0]!.status).toBe('ended');
    expect(w.geopolitics.wars[0]!.mobilized).toEqual({ GBR: 0, IND: 0 });
    expect(events[0]!.kind).toBe('dependent_diplomacy_blocked');
  });

  it('requires a crisis and local organization, then records and applies a funded independence transition', () => {
    const { w, emit, events } = fixture(['earth-city-234'], ['IND', 'GBR']);
    const state = initializeSovereignty(w)!;
    const request = {
      action: 'independence' as const,
      settlementIds: ['earth-city-234'],
      targetPolityId: 'IND',
    };
    expect(requestSovereigntyTransition(w, request, emit).ok).toBe(false);
    w.settlements[0]!.unrest = 0.4;
    w.persons[0]!.journey = {
      planId: 'plan',
      routeId: 'route',
      fromId: 'origin',
      toId: 'destination',
      departed: 0,
      distanceKm: 100,
      progressKm: 1,
      lastApplied: 0,
      blockedMonths: 0,
      causeIds: [],
    };
    w.coercion = {
      version: 1,
      lastAdvancedMonth: 0,
      activities: {},
      custody: {
        [w.persons[1]!.id]: {
          id: 'detention',
          personId: w.persons[1]!.id,
          polityId: 'GBR',
          locationId: 'earth-city-234',
          axis: 'political',
          started: 0,
          deadline: 12,
          detentionEventId: 'detained',
          causeIds: [],
          leaderIdAtIntake: 'leader',
          pressFreedomAtIntake: 0,
          religiousFreedomAtIntake: 0,
        },
      },
      facilities: {},
      lastEventIds: [],
    };
    expect(requestSovereigntyTransition(w, request, emit).ok).toBe(false);
    w.persons[0]!.journey = undefined;
    delete w.coercion.custody[w.persons[1]!.id];
    w.polities.find((polity) => polity.id === 'GBR')!.legitimacy = 0.1;
    const result = requestSovereigntyTransition(w, request, emit);
    expect(result.ok).toBe(true);
    expect(w.organizations[0]!.treasury).toBe(15);
    expect(w.settlements[0]!.coin).toBe(45);
    expect(authorityAt(w, 'earth-city-234')?.current.controllerPolityId).toBe('IND');
    expect(authorityAt(w, 'earth-city-234')?.baseline.sovereignPolityId).toBe('GBR');
    expect(state.changes[0]?.id).toBe(result.ok ? result.eventId : undefined);
    expect(w.settlements[0]!.polityId).toBe('IND');
  });

  it('scales minimum local organization support with the represented population', () => {
    const { w, emit } = fixture(['earth-city-234'], ['IND', 'GBR']);
    initializeSovereignty(w);
    w.settlements[0]!.unrest = 0.5;
    w.settlements[0]!.cohort.adults = 10_000_000;
    expect(
      requestSovereigntyTransition(
        w,
        { action: 'independence', settlementIds: ['earth-city-234'], targetPolityId: 'IND' },
        emit,
      ),
    ).toMatchObject({ ok: false, error: expect.stringContaining('Local organizations need') });
  });
});
