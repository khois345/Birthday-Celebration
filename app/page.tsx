"use client";

import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import CelebrationPageContent from "@/components/CelebrationPageContent";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/userContext";
import Form from "@/components/Form";

export default function Home() {
  // Check if the component is mounted to prevent rendering on the server
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const { name, age, setName, setAge } = useUser();

  const username = searchParams.get("name");
  const userAge = searchParams.get("age");

  useEffect(() => {
    setIsMounted(true);

    // Set the name and age from the URL if available
    // Example: http://localhost:3000/?name=John&age=25
    if (username) {
      if (name === null || name === "") {
        console.log("Setting name from URL")
        setName(username as string);
      }
    }
  
    if (userAge) {
      console.log("Setting age from URL")
      setAge(Number(userAge));
    }

  }, []);

  useEffect(() => {
    console.log("Name: ", name);
    console.log("Age: ", age);
  }, [name, age]);

  return (
    <>
      {
        /* Check if the components are mounted 
        as NextJS tends to render the page on the server side if not specified */
        isMounted && (
          <> 
            {name && age >= 1
            ? (<CelebrationPageContent />)
            : (<Form />)
            }
            <ToastContainer />
          </>
        )
      }
    </>
  );
}
