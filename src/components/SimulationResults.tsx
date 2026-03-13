import type { SimulationResult } from '../utils/timeDistribution';
import type { PerformanceClassification } from '../utils/performanceLevel';
import { useI18n } from '../i18n/context';
import PerformanceBadge from './PerformanceBadge';
import PerformanceChart from './PerformanceChart';
import TimeBreakdown from './TimeBreakdown';
import RunSplits from './RunSplits';
import StationCard from './StationCard';

interface Props {
  result: SimulationResult;
  classification: PerformanceClassification;
}

export default function SimulationResults({ result, classification }: Props) {
  const { t, divisionName } = useI18n();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="inline-block px-3 py-1 bg-hyrox-card border border-hyrox-border rounded-full text-xs text-hyrox-text mb-4">
          {divisionName(result.divisionId)}
        </div>
        <PerformanceBadge
          classification={classification}
          totalSeconds={result.targetTotalSeconds}
        />
      </div>

      <div className="bg-hyrox-card/50 border border-hyrox-border rounded-2xl p-5">
        <PerformanceChart result={result} />
      </div>

      <div className="bg-hyrox-card/50 border border-hyrox-border rounded-2xl p-5">
        <RunSplits result={result} />
      </div>

      <div className="bg-hyrox-card/50 border border-hyrox-border rounded-2xl p-5">
        <TimeBreakdown result={result} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-hyrox-text-bright mb-3">
          {t.stationDetailGuide}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.stations.map((split) => (
            <StationCard
              key={split.stationId}
              split={split}
              divisionId={result.divisionId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
