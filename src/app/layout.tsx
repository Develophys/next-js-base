import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@/styles/globals.css";

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
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} overflow-y-hidden`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
