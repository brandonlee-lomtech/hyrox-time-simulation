import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Locale, Translations } from './types';
import { TRANSLATIONS } from './translations';
import type { StationId, DivisionId } from '../data/hyroxData';
import type { PerformanceLevel } from '../utils/performanceLevel';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  stationName: (id: StationId) => string;
  divisionName: (id: DivisionId) => string;
  executionCue: (id: StationId) => string;
  levelLabel: (level: PerformanceLevel) => string;
  levelDesc: (level: PerformanceLevel) => string;
  categoryLabel: (cat: string) => string;
}

const STATION_KEY_MAP: Record<StationId, keyof Translations> = {
  skiErg: 'stSkiErg',
  sledPush: 'stSledPush',
  sledPull: 'stSledPull',
  burpeeBroadJump: 'stBurpeeBroadJump',
  rowing: 'stRowing',
  farmersCarry: 'stFarmersCarry',
  sandbagLunges: 'stSandbagLunges',
  wallBalls: 'stWallBalls',
};

const CUE_KEY_MAP: Record<StationId, keyof Translations> = {
  skiErg: 'cueSkiErg',
  sledPush: 'cueSledPush',
  sledPull: 'cueSledPull',
  burpeeBroadJump: 'cueBurpeeBroadJump',
  rowing: 'cueRowing',
  farmersCarry: 'cueFarmersCarry',
  sandbagLunges: 'cueSandbagLunges',
  wallBalls: 'cueWallBalls',
};

const DIVISION_KEY_MAP: Record<DivisionId, keyof Translations> = {
  proMen: 'divProMen',
  proWomen: 'divProWomen',
  openMen: 'divOpenMen',
  openWomen: 'divOpenWomen',
  doublesMen: 'divDoublesMen',
  doublesWomen: 'divDoublesWomen',
  doublesMixed: 'divDoublesMixed',
  relayMen: 'divRelayMen',
  relayWomen: 'divRelayWomen',
  relayMixed: 'divRelayMixed',
};

const LEVEL_KEY_MAP: Record<PerformanceLevel, keyof Translations> = {
  elite: 'levelElite',
  advanced: 'levelAdvanced',
  strong: 'levelStrong',
  average: 'levelAverage',
  beginner: 'levelBeginner',
};

const LEVEL_DESC_MAP: Record<PerformanceLevel, keyof Translations> = {
  elite: 'descElite',
  advanced: 'descAdvanced',
  strong: 'descStrong',
  average: 'descAverage',
  beginner: 'descBeginner',
};

const CAT_KEY_MAP: Record<string, keyof Translations> = {
  pro: 'catPro',
  open: 'catOpen',
  doubles: 'catDoubles',
  relay: 'catRelay',
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem('hyrox-locale');
    if (stored === 'en' || stored === 'ko' || stored === 'my' || stored === 'th') return stored;
  } catch {
    // ignore
  }
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem('hyrox-locale', l);
    } catch {
      // ignore
    }
    document.documentElement.lang = l;
  }, []);

  const t = TRANSLATIONS[locale];

  const stationName = useCallback(
    (id: StationId) => t[STATION_KEY_MAP[id]],
    [t],
  );
  const divisionName = useCallback(
    (id: DivisionId) => t[DIVISION_KEY_MAP[id]],
    [t],
  );
  const executionCue = useCallback(
    (id: StationId) => t[CUE_KEY_MAP[id]],
    [t],
  );
  const levelLabel = useCallback(
    (level: PerformanceLevel) => t[LEVEL_KEY_MAP[level]],
    [t],
  );
  const levelDesc = useCallback(
    (level: PerformanceLevel) => t[LEVEL_DESC_MAP[level]],
    [t],
  );
  const categoryLabel = useCallback(
    (cat: string) => t[CAT_KEY_MAP[cat] ?? 'catOpen'],
    [t],
  );

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, stationName, divisionName, executionCue, levelLabel, levelDesc, categoryLabel }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
