"use client";

import { useEffect } from "react";
import BirthdayCake from "@/components/BirthdayCake";
import { useUser } from "@/context/userContext";

interface CelebrationPageContentProps {
  sessionId: string;
}

export default function CelebrationPageContent({ sessionId }: CelebrationPageContentProps) {
  const { name, regard, loadUserData } = useUser();

  useEffect(() => {
    if (sessionId) {
      loadUserData(sessionId);
    }
  }, [sessionId, loadUserData]);

  return (
    <>
      <div className="items-center justify-center flex flex-col text-white text-center">
        <h1 className="text-4xl font-medium mb-2 mt-8">
          {name},{" "}
          <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 via-30% to-sky-400">
            Happy Birthday!
          </span>
        </h1>
        <div className="max-w-md mx-auto">
          {" "}
          {/* Centered container with maximum width of 500px */}
          <p className="text-lg mb-4 whitespace-normal font-light break-words text-gray-300">{regard}</p>
        </div>
      </div>
      <BirthdayCake />
    </>
  );
}
