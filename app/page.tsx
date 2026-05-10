"use client";

import './globals.css'
import Form from "@/components/Form";
import PageFooter from '@/components/PageFooter';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  return (
    <>
      <LanguageSwitcher locale="en" />
      <Form locale="en" />
      <PageFooter locale="en" />
    </>
  );
}
