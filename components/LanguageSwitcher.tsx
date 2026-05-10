"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale, getTranslations, supportedLocales } from "@/i18n/translations";

function stripLocalePrefix(pathname: string) {
  const normalizedPathname = pathname.toLowerCase();

  for (const candidate of supportedLocales) {
    const prefix = `/${candidate}`;

    if (normalizedPathname === prefix) {
      return "/";
    }

    if (normalizedPathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length);
    }
  }

  return pathname || "/";
}

function getPathForLocale(pathname: string, locale: Locale) {
  const pathWithoutLocale = stripLocalePrefix(pathname);
  
  // English has no locale prefix (it's the default)
  if (locale === "en") {
    return pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
  }
  
  return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const language = getTranslations(locale).language;

  const persistLocale = (nextLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  const localeLabels: Record<Locale, string> = {
    en: language.english,
    vi: language.vietnamese,
    zh: language.chinese,
    ko: language.korean,
    ja: language.japanese,
    es: language.spanish,
    id: language.indonesian,
    th: language.thai,
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    persistLocale(nextLocale);
    router.push(getPathForLocale(pathname, nextLocale));
  };

  return (
    <div className="mx-auto mt-4 flex w-full max-w-md justify-end px-4">
      <label className="sr-only" htmlFor="language-selector">
        Language
      </label>
      <select
        id="language-selector"
        value={locale}
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
        className="rounded-md border border-neutral-500 bg-neutral-700 px-3 py-1 text-sm font-semibold text-neutral-100 outline-none transition hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-300"
      >
        {supportedLocales.map((optionLocale) => (
          <option key={optionLocale} value={optionLocale}>
            {localeLabels[optionLocale]}
          </option>
        ))}
      </select>
    </div>
  );
}
