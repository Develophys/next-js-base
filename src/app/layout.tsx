import React from "react";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

import NextAuthProvider from "./auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Base",
  description: "Develophys project base.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.className} `}>
        <NextAuthProvider>
          <main className="h-screen">
            <Header />

            <div className="flex h-full">
              <div className="border-2 border-t-0 p-3 flex-1 overflow-y-auto">
                {children}
              </div>
            </div>
          </main>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
