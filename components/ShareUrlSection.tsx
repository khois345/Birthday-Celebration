"use client";

import { toast } from "react-toastify";

interface ShareUrlSectionProps {
  shareUrl: string;
}

export default function ShareUrlSection({ shareUrl }: ShareUrlSectionProps) {
  if (!shareUrl) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="w-full max-w-xs">
      <label className="block text-gray-300 text-sm font-bold mb-2">
        Share this celebration:
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="shadow appearance-none rounded flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="bg-neutral-400 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded"
        >
          Copy
        </button>
      </div>
    </div>
  );
}