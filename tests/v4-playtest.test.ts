import { describe, expect, it } from 'vitest';
import { runV4Playtest } from '../scripts/v4-playtest.js';

/**
 * A short fixed-seed version of the long playtest. Assertions deliberately use
 * invariants and presence, not exact counts: the long report is expected to
 * change when the main agent adds postwar content.
 */
describe('v4 long-life playtest audit', () => {
  const report = runV4Playtest({
    years: 30,
    focalCount: 2,
    maxOrdinaryEventsPerPerson: 2,
  });

  it('runs the real event runtime for every requested year', () => {
    expect(report.yearsRun).toBe(30);
    expect(report.events).toBeGreaterThan(0);
    expect(report.eventsPerYear).toBeGreaterThan(0);
    expect(report.perDecade.length).toBeGreaterThan(0);
    expect(report.date.year).toBe(1942);
  });

  it('gives every focal person committed events', () => {
    expect(report.focalLives).toHaveLength(2);
    expect(report.anomalies.focalPersonsWithZeroEvents).toEqual([]);
    for (const life of report.focalLives) {
      expect(life.events).toBeGreaterThan(0);
      expect(life.yearsWithEvents).toBeGreaterThan(0);
      expect(life.name).toBeTruthy();
      expect(life.born).toBeTruthy();
      expect(Array.isArray(life.topActionPrefixes)).toBe(true);
      expect(Array.isArray(life.topActions)).toBe(true);
    }
  });

  it('contains no unresolved template tokens or literal None in committed text', () => {
    expect(report.anomalies.unresolvedTemplateTokenEvents).toBe(0);
    expect(report.anomalies.anyUnresolvedTemplateToken).toBe(false);
    expect(report.anomalies.literalNoneEvents).toBe(0);
    expect(report.anomalies.literalUndefinedEvents).toBe(0);
    expect(report.anomalies.emptyParticipantEvents).toBe(0);
    for (const life of report.focalLives) {
      expect(life.textAnomalies.flaggedEvents).toBe(0);
      expect(life.textAnomalies.anyTextAnomaly).toBe(false);
    }
  });

  it('keeps every living household within the fourteen-person limit (emergency guardian reunification)', () => {
    expect(report.anomalies.anyLivingHouseholdOver12).toBe(false);
    expect(report.anomalies.livingHouseholdsOver12).toBe(0);
    expect(report.anomalies.overfullLivingHouseholdObservations).toBe(0);
    expect(report.households.maxLiving).toBeLessThanOrEqual(14);
    for (const household of report.households.worstRecordCounts) {
      expect(household.living).toBeLessThanOrEqual(14);
      expect(household.recordedMemberIds).toBeGreaterThanOrEqual(household.living);
    }
  });

  it('records at least one birth and one death without pinning fragile counts', () => {
    expect(report.births).toBeGreaterThan(0);
    expect(report.deathEvents).toBeGreaterThan(0);
    expect(report.deaths).toBeGreaterThan(0);
    expect(report.statisticalDeaths).toBeGreaterThan(0);
  });

  it('exposes the report shape and anomaly fields required by the audit', () => {
    expect(report.anomalies).toMatchObject({
      anyLivingHouseholdOver12: expect.any(Boolean),
      anyUnresolvedTemplateToken: expect.any(Boolean),
      anyFocalPersonWithZeroEvents: expect.any(Boolean),
      anyScenePrefixRepeatedOver12ForOnePerson: expect.any(Boolean),
      anyDeadPersonMissingDeathCause: expect.any(Boolean),
      anyDiedYearBeforeBorn: expect.any(Boolean),
      anyEventAfterSubjectDeath: expect.any(Boolean),
      anyEventBeforeSubjectBirth: expect.any(Boolean),
      scenePrefixRepeatOffenderCount: expect.any(Number),
      deadPersonsMissingDeathCause: expect.any(Number),
      diedYearBeforeBornCount: expect.any(Number),
      eventsAfterSubjectDeath: expect.any(Number),
      overfullLivingHouseholdObservations: expect.any(Number),
    });
    expect(report.households.worstRecordCounts.length).toBeGreaterThan(0);
    expect(report.households.worstByRecordedMembers.length).toBeGreaterThan(0);
    expect(report.excerpts).toHaveLength(3);
    for (const excerpt of report.excerpts) {
      expect(excerpt.personId).toBeTruthy();
      expect(excerpt.events.length).toBeGreaterThan(0);
      for (const event of excerpt.events) {
        expect(event.date.year).toBeGreaterThanOrEqual(1912);
        expect(event.action.length).toBeGreaterThan(0);
        expect(event.text.length).toBeGreaterThan(10);
      }
    }
    expect(report.runtimeMs).toBeGreaterThan(0);
  });
});
