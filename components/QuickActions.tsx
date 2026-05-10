"use client";

import { usePathname, useRouter } from "next/navigation";
import ShareUrlSection from "@/components/ShareUrlSection";
import { Locale, getLocalePrefix, getTranslations } from "@/i18n/translations";

interface CelebrationActionsProps {
  shareUrl: string;
  onSwitchColors: () => void;
  locale: Locale;
}

export default function QuickActions({ shareUrl, onSwitchColors, locale }: CelebrationActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const texts = getTranslations(locale);

  const getHomePath = () => {
    const localePrefix = getLocalePrefix(pathname);
    // If localePrefix is empty (english version), return "/". Otherwise, we return the locale-specific path.
    return localePrefix ? `/${locale}` : "/";
  };

  return (
    <div className="mt-8 px-4 flex flex-col items-stretch justify-center gap-4">
      <div className="w-full min-w-0 max-w-[420px] mx-auto">
        <ShareUrlSection shareUrl={shareUrl} locale={locale} />
      </div>
      <div className="w-full min-w-0 max-w-[420px] mx-auto">
        <div className="flex w-full gap-1">
          <button
            type="button"
            onClick={onSwitchColors}
            className="inline-flex w-[90%] items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-5 rounded-md"
          >
            {texts.actions.switchColor}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            aria-label="Refresh page"
            className="group inline-flex w-[5%] items-center justify-center gap-2 bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-300 text-black font-bold py-2 px-5 rounded-2xl transition-colors"
          >
            <span className="inline-flex h-6 w-4 items-center justify-center rounded-full bg-neutral-400 group-hover:bg-neutral-300 group-active:bg-neutral-300 transition-colors">
              <i className="fa-solid fa-rotate-right" aria-hidden="true" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => router.push(getHomePath())}
            aria-label={texts.actions.backToHome}
            className="group inline-flex w-[5%] items-center justify-center gap-2 bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-300 text-black font-bold py-2 px-5 rounded-2xl transition-colors"
          >
            <span className="inline-flex h-6 w-4 items-center justify-center rounded-full bg-neutral-400 group-hover:bg-neutral-300 group-active:bg-neutral-300 transition-colors">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}