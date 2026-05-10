"use client";

import './globals.css'
import { ToastContainer } from "react-toastify";
import Form from "@/components/Form";
import PageFooter from '@/components/PageFooter';

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Form />
      <PageFooter />
    </>
  );
}
