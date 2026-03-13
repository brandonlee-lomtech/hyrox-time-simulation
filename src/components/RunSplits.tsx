import type { SimulationResult } from '../utils/timeDistribution';
import { formatMMSS } from '../utils/formatting';
import { useI18n } from '../i18n/context';

interface Props {
  result: SimulationResult;
}

export default function RunSplits({ result }: Props) {
  const { t } = useI18n();
  const avgPace = result.runTotalSeconds / 8;
  const fastest = Math.min(...result.runs.map((r) => r.targetSeconds));
  const slowest = Math.max(...result.runs.map((r) => r.targetSeconds));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-hyrox-text-bright">
          🏃 {t.runSplitsTitle}
        </h3>
        <div className="text-xs text-hyrox-text">
          {t.avgPace} <span className="text-hyrox-yellow font-mono font-bold">{formatMMSS(avgPace)}</span>/km
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {result.runs.map((run) => {
          const range = slowest - fastest;
          const intensity = range > 0 ? (run.targetSeconds - fastest) / range : 0;

          return (
            <div
              key={run.runNumber}
              className="bg-hyrox-card border border-hyrox-border/50 rounded-lg p-2 text-center transition-all hover:border-hyrox-yellow/50"
            >
              <div className="text-[10px] text-hyrox-text mb-1">Run {run.runNumber}</div>
              <div className="font-mono font-bold text-sm text-hyrox-text-bright">
                {formatMMSS(run.targetSeconds)}
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-hyrox-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${20 + intensity * 80}%`,
                    backgroundColor: `color-mix(in srgb, #FFD700 ${100 - intensity * 60}%, #ff3b5c ${intensity * 60}%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-hyrox-text px-1">
        <span>{t.total}: <span className="text-hyrox-text-bright font-mono">{formatMMSS(result.runTotalSeconds)}</span></span>
        <span>{t.range}: {formatMMSS(fastest)} ~ {formatMMSS(slowest)}</span>
      </div>
    </div>
  );
}
