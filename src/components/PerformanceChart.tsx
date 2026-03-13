import type { SimulationResult } from '../utils/timeDistribution';
import { formatMMSS } from '../utils/formatting';
import { useI18n } from '../i18n/context';

interface Props {
  result: SimulationResult;
}

const COLORS = {
  running: '#FFD700',
  stations: '#ff3b5c',
  roxZone: '#00c8ff',
};

export default function PerformanceChart({ result }: Props) {
  const { t } = useI18n();
  const total = result.targetTotalSeconds;
  const runPct = (result.runTotalSeconds / total) * 100;
  const stationPct = (result.stationTotalSeconds / total) * 100;
  const roxPct = (result.roxZoneSeconds / total) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const runLen = (runPct / 100) * circumference;
  const stationLen = (stationPct / 100) * circumference;
  const roxLen = (roxPct / 100) * circumference;

  const runOffset = 0;
  const stationOffset = -(runLen);
  const roxOffset = -(runLen + stationLen);

  const segments = [
    { label: t.chartRunning, pct: runPct, seconds: result.runTotalSeconds, color: COLORS.running },
    { label: t.chartStations, pct: stationPct, seconds: result.stationTotalSeconds, color: COLORS.stations },
    { label: t.chartRoxZone, pct: roxPct, seconds: result.roxZoneSeconds, color: COLORS.roxZone },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-hyrox-text-bright">{t.timeComposition}</h3>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r={radius}
              fill="none" stroke="#1a1a2e" strokeWidth="18"
            />
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke={COLORS.running}
              strokeWidth="18"
              strokeDasharray={`${runLen} ${circumference - runLen}`}
              strokeDashoffset={runOffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              className="transition-all duration-700"
            />
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke={COLORS.stations}
              strokeWidth="18"
              strokeDasharray={`${stationLen} ${circumference - stationLen}`}
              strokeDashoffset={stationOffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              className="transition-all duration-700"
            />
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke={COLORS.roxZone}
              strokeWidth="18"
              strokeDasharray={`${roxLen} ${circumference - roxLen}`}
              strokeDashoffset={roxOffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] text-hyrox-text">{t.chartRunning}</div>
              <div className="text-lg font-bold text-hyrox-yellow">{runPct.toFixed(0)}%</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-hyrox-text-bright font-medium">{seg.label}</span>
                  <span className="font-mono text-sm font-bold text-hyrox-text-bright">
                    {formatMMSS(seg.seconds)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 bg-hyrox-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
                  />
                </div>
                <div className="text-[10px] text-hyrox-text mt-0.5">{seg.pct.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
