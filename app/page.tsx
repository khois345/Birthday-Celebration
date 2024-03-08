"use client";

import BirthdayCake from "@/components/BirthdayCake";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

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
          <body className="bg-neutral-700 items-center justify-center flex flex-col">
            <h1>Happy Birthday</h1>
            <p className="pb-2">Wishing you a wonderful day and a year filled with happiness!</p>
            <BirthdayCake />
            <ToastContainer />
          </body>
        )
      }
    </>
  );
}
