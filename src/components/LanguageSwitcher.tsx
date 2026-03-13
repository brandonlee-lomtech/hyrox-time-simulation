import { useI18n } from '../i18n/context';
import { LOCALE_LABELS } from '../i18n/translations';
import type { Locale } from '../i18n/types';

const LOCALES: Locale[] = ['en', 'ko', 'my'];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-hyrox-card border border-hyrox-border rounded-lg p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
            locale === l
              ? 'bg-hyrox-yellow text-hyrox-dark'
              : 'text-hyrox-text hover:text-hyrox-text-bright'
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
