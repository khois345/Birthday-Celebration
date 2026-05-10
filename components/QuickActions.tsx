"use client";

import { useRouter } from "next/navigation";
import ShareUrlSection from "@/components/ShareUrlSection";

interface CelebrationActionsProps {
  shareUrl: string;
}

export default function QuickActions({ shareUrl }: CelebrationActionsProps) {
  const router = useRouter();

  return (
    <div className="mt-8 px-4 flex flex-row flex-nowrap items-end justify-center gap-2 overflow-x-auto">
      <ShareUrlSection shareUrl={shareUrl} />
      <button
        type="button"
        onClick={() => router.push("/")}
        className="inline-flex items-center gap-2 bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-5 rounded-full"
      >
        <span className="inline-flex h-6 w-4 items-center justify-center rounded-full bg-neutral-400">
          <i className="fa-solid fa-arrow-rotate-left" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}