import { useState } from 'react';
import type { DivisionId } from './data/hyroxData';
import { simulate } from './utils/timeDistribution';
import type { SimulationResult } from './utils/timeDistribution';
import { classifyPerformance } from './utils/performanceLevel';
import type { PerformanceClassification } from './utils/performanceLevel';
import { useI18n } from './i18n/context';
import SimulationInput from './components/SimulationInput';
import SimulationResults from './components/SimulationResults';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function App() {
  const { t } = useI18n();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [classification, setClassification] = useState<PerformanceClassification | null>(null);

  function handleSimulate(divisionId: DivisionId, totalSeconds: number) {
    const simResult = simulate(divisionId, totalSeconds);
    const perf = classifyPerformance(divisionId, totalSeconds);
    setResult(simResult);
    setClassification(perf);
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b border-hyrox-border bg-hyrox-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-hyrox-yellow rounded-lg flex items-center justify-center text-hyrox-dark font-extrabold text-sm">
            H
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-hyrox-text-bright leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-[11px] text-hyrox-text truncate">
              {t.appSubtitle}
            </p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-[360px] flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-hyrox-card/50 border border-hyrox-border rounded-2xl p-6">
                <SimulationInput onSimulate={handleSimulate} />
              </div>

              <div className="bg-hyrox-card/30 border border-hyrox-border/50 rounded-2xl p-4 text-xs text-hyrox-text space-y-2">
                <div className="font-semibold text-hyrox-text-bright text-sm">{t.howToTitle}</div>
                <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                  <li>{t.howToStep1}</li>
                  <li>{t.howToStep2}</li>
                  <li>{t.howToStep3}</li>
                  <li>{t.howToStep4}</li>
                </ol>
                <p className="text-[11px] text-hyrox-text/70 pt-1">
                  {t.howToNote}
                </p>
              </div>
            </div>
          </aside>

          <section className="flex-1 min-w-0">
            {result && classification ? (
              <SimulationResults result={result} classification={classification} />
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="text-6xl">🏁</div>
                  <h2 className="text-xl font-bold text-hyrox-text-bright">
                    {t.emptyTitle}
                  </h2>
                  <p className="text-sm text-hyrox-text leading-relaxed">
                    {t.emptyDescription}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {[t.tagRunning, t.tagStations, t.tagRoxZone].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-hyrox-card border border-hyrox-border rounded-full text-xs text-hyrox-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-hyrox-border mt-12 py-6 text-center text-xs text-hyrox-text/50">
        {t.footer}
      </footer>
    </div>
  );
}
