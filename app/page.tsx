"use client";

import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import CelebrationPageContent from "@/components/CelebrationPageContent";

export default function Home() {
  // Check if the component is mounted to prevent rendering on the server
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {
        /* Check if the components are mounted 
        as NextJS tends to render the page on the server side if not specified */
        isMounted && (
          <body className="bg-neutral-700">
            <CelebrationPageContent />
            <ToastContainer />
          </body>
        )
      }
    </>
  );
}
