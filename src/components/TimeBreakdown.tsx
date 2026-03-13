import { STATIONS, DIVISION_WEIGHTS } from '../data/hyroxData';
import type { SimulationResult } from '../utils/timeDistribution';
import { formatMMSS, formatDelta } from '../utils/formatting';
import { useI18n } from '../i18n/context';

interface Props {
  result: SimulationResult;
}

export default function TimeBreakdown({ result }: Props) {
  const { t, stationName } = useI18n();
  const weights = DIVISION_WEIGHTS[result.divisionId];

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-hyrox-text-bright mb-3">
        {t.stationTimeBreakdown}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-hyrox-text text-xs border-b border-hyrox-border">
              <th className="text-left py-2 px-2 font-medium">{t.thStation}</th>
              <th className="text-left py-2 px-2 font-medium hidden sm:table-cell">{t.thDistance}</th>
              {weights && (
                <th className="text-left py-2 px-2 font-medium hidden md:table-cell">{t.thWeight}</th>
              )}
              <th className="text-right py-2 px-2 font-medium">{t.thTarget}</th>
              <th className="text-right py-2 px-2 font-medium">{t.thVsAvg}</th>
            </tr>
          </thead>
          <tbody>
            {result.stations.map((split) => {
              const station = STATIONS.find((s) => s.id === split.stationId)!;
              const weightKey = split.stationId as keyof NonNullable<typeof weights>;
              const weight = weights?.[weightKey];
              const isNegative = split.deltaSeconds < 0;

              return (
                <tr
                  key={split.stationId}
                  className="border-b border-hyrox-border/50 hover:bg-hyrox-card/50 transition-colors"
                >
                  <td className="py-2.5 px-2">
                    <span className="mr-1.5">{station.icon}</span>
                    <span className="text-hyrox-text-bright font-medium">
                      {stationName(split.stationId)}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-hyrox-text hidden sm:table-cell">
                    {station.distance}
                  </td>
                  {weights && (
                    <td className="py-2.5 px-2 text-hyrox-text text-xs hidden md:table-cell">
                      {typeof weight === 'string' ? weight : '-'}
                    </td>
                  )}
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-hyrox-yellow">
                    {formatMMSS(split.targetSeconds)}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-mono text-xs ${isNegative ? 'text-green-400' : 'text-red-400'}`}>
                    {formatDelta(split.deltaSeconds)}
                  </td>
                </tr>
              );
            })}

            <tr className="border-b border-hyrox-border/50 hover:bg-hyrox-card/50 transition-colors">
              <td className="py-2.5 px-2">
                <span className="mr-1.5">🔄</span>
                <span className="text-hyrox-text-bright font-medium">{t.roxZone}</span>
              </td>
              <td className="py-2.5 px-2 text-hyrox-text hidden sm:table-cell">{t.transitionZone}</td>
              {weights && <td className="py-2.5 px-2 hidden md:table-cell">-</td>}
              <td className="py-2.5 px-2 text-right font-mono font-bold text-hyrox-yellow">
                {formatMMSS(result.roxZoneSeconds)}
              </td>
              <td className={`py-2.5 px-2 text-right font-mono text-xs ${result.roxZoneSeconds - result.roxZoneBaselineSeconds < 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatDelta(result.roxZoneSeconds - result.roxZoneBaselineSeconds)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
