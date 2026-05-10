"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BirthdayCake from "@/components/BirthdayCake";
import { CakeColors, getRandomCakeColors } from "@/components/cakePalettes";
import QuickActions from "@/components/QuickActions";
import { useUser } from "@/context/userContext";
import { Locale, getLocalePrefix, getTranslations } from "@/i18n/translations";

interface CelebrationPageContentProps {
  sessionId: string;
  locale: Locale;
}

export default function CelebrationPageContent({ sessionId, locale }: CelebrationPageContentProps) {
  const router = useRouter();
  const { name, regard, loadUserData } = useUser();
  const [shareUrl, setShareUrl] = useState("");
  const [cakeColors, setCakeColors] = useState<CakeColors>(() => getRandomCakeColors());
  const texts = getTranslations(locale);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionId) {
      const localePrefix = getLocalePrefix(window.location.pathname);
      setShareUrl(`${window.location.origin}${localePrefix}/${sessionId}`);
    }
  }, [sessionId]);

  useEffect(() => {
    (window as unknown as { __cakeColors?: CakeColors }).__cakeColors = cakeColors;
  }, [cakeColors]);

  useEffect(() => {
    if (sessionId) {
      loadUserData(sessionId).then((success) => {
        if (!success) {
          toast.error(texts.celebration.sessionMissing);
          router.push(locale === "en" ? "/" : `/${locale}`);
        }
      });
    }
  }, [sessionId, loadUserData, router, locale, texts.celebration.sessionMissing]);

  const handleSwitchColors = () => {
    let nextColors = getRandomCakeColors();

    while (nextColors.top === cakeColors.top) {
      nextColors = getRandomCakeColors();
    }

    setCakeColors(nextColors);
  };

  return (
    <>
      <div className="items-center justify-center flex flex-col text-white text-center">
        <h1 className="text-4xl font-medium mb-2 mt-8">
          {name},{" "}
          <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 via-30% to-sky-400">
            {texts.celebration.happyBirthday}
          </span>
        </h1>
        <div className="max-w-md mx-auto">
          {" "}
          {/* Centered container with maximum width of 500px */}
          <p className="text-lg mb-4 whitespace-normal font-light break-words text-gray-300">{regard}</p>
        </div>
      </div>
      <BirthdayCake cakeColors={cakeColors} locale={locale} />
      <QuickActions shareUrl={shareUrl} onSwitchColors={handleSwitchColors} locale={locale} />
    </>
  );
}
