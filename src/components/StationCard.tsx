import { STATIONS, DIVISION_WEIGHTS } from '../data/hyroxData';
import type { DivisionId } from '../data/hyroxData';
import type { StationSplit } from '../utils/timeDistribution';
import { formatMMSS } from '../utils/formatting';
import { useI18n } from '../i18n/context';

interface Props {
  split: StationSplit;
  divisionId: DivisionId;
}

export default function StationCard({ split, divisionId }: Props) {
  const { t, stationName, executionCue } = useI18n();
  const station = STATIONS.find((s) => s.id === split.stationId)!;
  const cue = executionCue(split.stationId);
  const weights = DIVISION_WEIGHTS[divisionId];
  const weightKey = split.stationId as keyof NonNullable<typeof weights>;
  const weight = weights?.[weightKey];

  return (
    <div className="bg-hyrox-card border border-hyrox-border rounded-xl p-4 hover:border-hyrox-yellow/40 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{station.icon}</span>
          <div>
            <div className="font-bold text-hyrox-text-bright text-sm">{stationName(split.stationId)}</div>
            <div className="text-[11px] text-hyrox-text">{station.distance}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-extrabold text-xl text-hyrox-yellow">
            {formatMMSS(split.targetSeconds)}
          </div>
        </div>
      </div>

      {typeof weight === 'string' && (
        <div className="text-xs text-hyrox-text mb-2">
          {t.weight}: <span className="text-hyrox-text-bright">{weight}</span>
        </div>
      )}

      <div className="text-xs text-hyrox-text leading-relaxed bg-hyrox-dark/50 rounded-lg px-3 py-2">
        💡 {cue}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="text-hyrox-text">{t.avg}: {formatMMSS(split.baselineSeconds)}</span>
        <span className={split.deltaSeconds < 0 ? 'text-green-400' : 'text-red-400'}>
          {split.deltaSeconds < 0 ? '▼' : '▲'} {formatMMSS(Math.abs(split.deltaSeconds))}
        </span>
      </div>
    </div>
  );
}
