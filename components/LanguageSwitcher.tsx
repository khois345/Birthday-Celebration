"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, getTranslations } from "@/i18n/translations";

function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/en/")) {
    return pathname.slice(3);
  }

  if (pathname === "/vi") {
    return "/";
  }

  if (pathname.startsWith("/vi/")) {
    return pathname.slice(3);
  }

  return pathname;
}

function getPathForLocale(pathname: string, locale: Locale) {
  const pathWithoutLocale = stripLocalePrefix(pathname);

  if (locale === "en") {
    return pathname.startsWith("/en") ? `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}` : pathWithoutLocale;
  }

  return `/vi${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const language = getTranslations(locale).language;

  const persistLocale = (nextLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="mx-auto mt-4 flex w-full max-w-md justify-end gap-2 px-4">
      <Link
        href={getPathForLocale(pathname, "en")}
        onClick={() => persistLocale("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          locale === "en" ? "bg-neutral-200 text-black" : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
        }`}
      >
        {language.english}
      </Link>
      <Link
        href={getPathForLocale(pathname, "vi")}
        onClick={() => persistLocale("vi")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          locale === "vi" ? "bg-neutral-200 text-black" : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
        }`}
      >
        {language.vietnamese}
      </Link>
    </div>
  );
}
