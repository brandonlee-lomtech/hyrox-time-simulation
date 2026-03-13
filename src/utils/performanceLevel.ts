import { PERFORMANCE_BANDS } from '../data/hyroxData';
import type { DivisionId, PerformanceBand } from '../data/hyroxData';

export type PerformanceLevel = PerformanceBand['level'];

export interface PerformanceClassification {
  level: PerformanceLevel;
  color: string;
}

const LEVEL_COLORS: Record<PerformanceLevel, string> = {
  elite: '#ff3b5c',
  advanced: '#ff8c00',
  strong: '#FFD700',
  average: '#00c8ff',
  beginner: '#8b8ba0',
};

export function classifyPerformance(
  divisionId: DivisionId,
  totalSeconds: number,
): PerformanceClassification {
  const bands = PERFORMANCE_BANDS[divisionId];
  const band = bands.find((b) => totalSeconds <= b.maxSeconds) ?? bands[bands.length - 1];

  return {
    level: band.level,
    color: LEVEL_COLORS[band.level],
  };
}
