import { BASELINE_TIMES, STATIONS } from '../data/hyroxData';
import type { DivisionId, StationId, SegmentId, BaselineTimes } from '../data/hyroxData';

export interface StationSplit {
  stationId: StationId;
  targetSeconds: number;
  baselineSeconds: number;
  deltaSeconds: number;
}

export interface RunSplit {
  runNumber: number;
  targetSeconds: number;
  pacePerKm: number;
}

export interface SimulationResult {
  divisionId: DivisionId;
  targetTotalSeconds: number;
  baselineTotalSeconds: number;
  stations: StationSplit[];
  runs: RunSplit[];
  roxZoneSeconds: number;
  roxZoneBaselineSeconds: number;
  runTotalSeconds: number;
  stationTotalSeconds: number;
}

function computeBaselineTotal(baseline: BaselineTimes): number {
  const stationSum = STATIONS.reduce((sum, s) => sum + baseline[s.id], 0);
  return stationSum + baseline.roxpiZone + baseline.runTotal;
}

const FATIGUE_FACTORS = [0.96, 0.97, 0.99, 1.0, 1.01, 1.02, 1.03, 1.04];

function distributeRunsWithFatigue(totalRunSeconds: number): RunSplit[] {
  const rawSum = FATIGUE_FACTORS.reduce((s, f) => s + f, 0);

  return FATIGUE_FACTORS.map((factor, i) => {
    const targetSeconds = totalRunSeconds * (factor / rawSum);
    return {
      runNumber: i + 1,
      targetSeconds,
      pacePerKm: targetSeconds,
    };
  });
}

export function simulate(
  divisionId: DivisionId,
  targetTotalSeconds: number,
): SimulationResult {
  const baseline = BASELINE_TIMES[divisionId];
  const baselineTotal = computeBaselineTotal(baseline);
  const scale = targetTotalSeconds / baselineTotal;

  const stations: StationSplit[] = STATIONS.map((station) => {
    const baselineSeconds = baseline[station.id];
    const targetSeconds = baselineSeconds * scale;
    return {
      stationId: station.id,
      targetSeconds,
      baselineSeconds,
      deltaSeconds: targetSeconds - baselineSeconds,
    };
  });

  const roxZoneSeconds = baseline.roxpiZone * scale;
  const runTotalSeconds = baseline.runTotal * scale;
  const runs = distributeRunsWithFatigue(runTotalSeconds);

  const stationTotalSeconds = stations.reduce((s, st) => s + st.targetSeconds, 0);

  return {
    divisionId,
    targetTotalSeconds,
    baselineTotalSeconds: baselineTotal,
    stations,
    runs,
    roxZoneSeconds,
    roxZoneBaselineSeconds: baseline.roxpiZone,
    runTotalSeconds,
    stationTotalSeconds,
  };
}

export function getSegmentRatios(divisionId: DivisionId): Record<string, number> {
  const baseline = BASELINE_TIMES[divisionId];
  const total = computeBaselineTotal(baseline);
  const ratios: Record<string, number> = {};

  for (const station of STATIONS) {
    ratios[station.id] = baseline[station.id] / total;
  }
  ratios['roxZone'] = baseline.roxpiZone / total;
  ratios['runTotal'] = baseline.runTotal / total;

  return ratios;
}

export function getSegmentKeys(): SegmentId[] {
  return [...STATIONS.map((s) => s.id), 'roxpiZone', 'runTotal'];
}
