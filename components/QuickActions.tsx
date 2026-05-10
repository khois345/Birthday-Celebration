"use client";

import { useRouter } from "next/navigation";
import ShareUrlSection from "@/components/ShareUrlSection";

interface CelebrationActionsProps {
  shareUrl: string;
  onSwitchColors: () => void;
}

export default function QuickActions({ shareUrl, onSwitchColors }: CelebrationActionsProps) {
  const router = useRouter();

  return (
    <div className="mt-8 px-4 flex flex-col items-stretch justify-center gap-4">
      <div className="w-full min-w-0 max-w-[420px] mx-auto">
        <ShareUrlSection shareUrl={shareUrl} />
      </div>
      <div className="w-full min-w-0 max-w-[420px] mx-auto">
        <div className="flex w-full gap-1">
          <button
            type="button"
            onClick={onSwitchColors}
            className="inline-flex w-[85%] items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-5 rounded-md"
          >
            Switch Color
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex w-[15%] items-center justify-center gap-2 bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-5 rounded-2xl"
          >
            <span className="inline-flex h-6 w-4 items-center justify-center rounded-full bg-neutral-400">
              <i className="fa-solid fa-arrow-rotate-left" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}