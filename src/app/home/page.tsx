"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function HomePage() {
  return (
    <>
      <h1>HOME PAGE</h1>
      <Button onClick={() => signOut()}>Sign OUT</Button>
    </>
  );
}
