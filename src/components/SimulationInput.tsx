import { useState } from 'react';
import { DIVISIONS } from '../data/hyroxData';
import type { DivisionId } from '../data/hyroxData';
import { useI18n } from '../i18n/context';

interface Props {
  onSimulate: (divisionId: DivisionId, totalSeconds: number) => void;
}

const PRESETS: { label: string; seconds: number; descKey: 'presetElite' | 'presetAdvanced' | 'presetStrong' | 'presetChallenge' }[] = [
  { label: 'Sub-60', seconds: 58 * 60, descKey: 'presetElite' },
  { label: 'Sub-75', seconds: 73 * 60, descKey: 'presetAdvanced' },
  { label: 'Sub-90', seconds: 88 * 60, descKey: 'presetStrong' },
  { label: 'Sub-2h', seconds: 118 * 60, descKey: 'presetChallenge' },
];

export default function SimulationInput({ onSimulate }: Props) {
  const { t, divisionName, categoryLabel } = useI18n();
  const [divisionId, setDivisionId] = useState<DivisionId>('openMen');
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (totalSeconds > 0) {
      onSimulate(divisionId, totalSeconds);
    }
  }

  function handlePreset(presetSeconds: number) {
    const h = Math.floor(presetSeconds / 3600);
    const m = Math.floor((presetSeconds % 3600) / 60);
    const s = presetSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    onSimulate(divisionId, presetSeconds);
  }

  const grouped = DIVISIONS.reduce(
    (acc, div) => {
      (acc[div.category] ??= []).push(div);
      return acc;
    },
    {} as Record<string, typeof DIVISIONS>,
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-hyrox-text-bright mb-2">
          {t.selectDivision}
        </label>
        <select
          value={divisionId}
          onChange={(e) => setDivisionId(e.target.value as DivisionId)}
          className="w-full bg-hyrox-card border border-hyrox-border rounded-lg px-4 py-3 text-hyrox-text-bright focus:outline-none focus:border-hyrox-yellow transition-colors appearance-none cursor-pointer"
        >
          {Object.entries(grouped).map(([cat, divs]) => (
            <optgroup key={cat} label={categoryLabel(cat)}>
              {divs.map((d) => (
                <option key={d.id} value={d.id}>
                  {divisionName(d.id)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-hyrox-text-bright mb-2">
          {t.targetTime}
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="number"
              min={0}
              max={3}
              value={hours}
              onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
              className="w-full bg-hyrox-card border border-hyrox-border rounded-lg px-4 py-3 text-center text-hyrox-text-bright text-lg font-mono focus:outline-none focus:border-hyrox-yellow transition-colors"
            />
            <span className="block text-xs text-hyrox-text text-center mt-1">{t.hours}</span>
          </div>
          <span className="text-2xl text-hyrox-text-bright font-bold pb-5">:</span>
          <div className="flex-1">
            <input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
              className="w-full bg-hyrox-card border border-hyrox-border rounded-lg px-4 py-3 text-center text-hyrox-text-bright text-lg font-mono focus:outline-none focus:border-hyrox-yellow transition-colors"
            />
            <span className="block text-xs text-hyrox-text text-center mt-1">{t.minutes}</span>
          </div>
          <span className="text-2xl text-hyrox-text-bright font-bold pb-5">:</span>
          <div className="flex-1">
            <input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
              className="w-full bg-hyrox-card border border-hyrox-border rounded-lg px-4 py-3 text-center text-hyrox-text-bright text-lg font-mono focus:outline-none focus:border-hyrox-yellow transition-colors"
            />
            <span className="block text-xs text-hyrox-text text-center mt-1">{t.seconds}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs text-hyrox-text mb-2">{t.quickSelect}</label>
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePreset(p.seconds)}
              className="bg-hyrox-card border border-hyrox-border rounded-lg py-2 px-1 text-center hover:border-hyrox-yellow hover:text-hyrox-yellow transition-all cursor-pointer group"
            >
              <div className="text-sm font-bold text-hyrox-text-bright group-hover:text-hyrox-yellow transition-colors">
                {p.label}
              </div>
              <div className="text-[10px] text-hyrox-text">{t[p.descKey]}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-hyrox-yellow text-hyrox-dark font-bold py-3.5 rounded-lg text-lg hover:bg-yellow-400 transition-colors cursor-pointer active:scale-[0.98]"
      >
        {t.runSimulation}
      </button>
    </form>
  );
}
