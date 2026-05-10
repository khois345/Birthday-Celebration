import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/context/userContext";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday! 🎉🎂🎈",
  description: "A virtual birthday celebration with a birthday cake and a form to enter your name and age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}
      bg-neutral-800`}
      >
        <Suspense>
          <UserProvider>
            <ToastContainer />
            {children}
          </UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
