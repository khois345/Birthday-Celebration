"use client";

import { toast } from "react-toastify";
import { Locale, getTranslations } from "@/i18n/translations";

interface ShareUrlSectionProps {
  shareUrl: string;
  locale: Locale;
}

export default function ShareUrlSection({ shareUrl, locale }: ShareUrlSectionProps) {
  const texts = getTranslations(locale);

  if (!shareUrl) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success(texts.actions.copied);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="block text-gray-300 text-sm font-bold lg:mb-2">
        {texts.actions.shareLabel}
      </label>
      <div className="flex w-full flex-row gap-1">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="shadow appearance-none rounded w-[60%] min-w-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded w-[40%] whitespace-nowrap"
        >
          {texts.actions.copy}
        </button>
      </div>
    </div>
  );
}