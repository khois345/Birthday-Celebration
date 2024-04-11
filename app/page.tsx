"use client";

import './globals.css'
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import CelebrationPageContent from "@/components/CelebrationPageContent";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/userContext";
import Form from "@/components/Form";

export default function Home() {
  // Check if the component is mounted to prevent rendering on the server
  const searchParams = useSearchParams();
  const { name, age, setName, setAge } = useUser();

  const username = searchParams.get("name");
  const userAge = searchParams.get("age");

  useEffect(() => {
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
      {/* Check if the name and age are set */}
      {name && age >= 1
      ? (<CelebrationPageContent />)
      : (<Form />)
      }
      <ToastContainer />
    </>
  );
}
