import type { PerformanceClassification } from '../utils/performanceLevel';
import { formatTime } from '../utils/formatting';
import { useI18n } from '../i18n/context';

interface Props {
  classification: PerformanceClassification;
  totalSeconds: number;
}

export default function PerformanceBadge({ classification, totalSeconds }: Props) {
  const { levelLabel, levelDesc } = useI18n();

  return (
    <div className="text-center space-y-3">
      <div className="text-sm text-hyrox-text">{useI18n().t.targetFinishTime}</div>
      <div className="text-5xl font-extrabold text-hyrox-text-bright font-mono tracking-tight">
        {formatTime(totalSeconds)}
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: classification.color }}>
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: classification.color }}
        />
        <span className="font-bold text-sm" style={{ color: classification.color }}>
          {levelLabel(classification.level)}
        </span>
      </div>
      <div className="text-xs text-hyrox-text">
        {levelDesc(classification.level)}
      </div>
    </div>
  );
}
