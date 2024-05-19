"use client";

import { signIn } from "next-auth/react";

import { useCurrentLocale } from "@/../locales/client";

import { Button } from "./ui/button";

export const SignInGithubButton = () => {
  const locale = useCurrentLocale();

  return (
    <Button
      className="bg-blue-500 text-black hover:bg-slate-700 hover:text-white"
      onClick={() => signIn("github", { callbackUrl: `${locale}/home` })}
    >
      Sign In With GitHub
    </Button>
  );
};
