"use client";

import { signIn } from "next-auth/react";

import { Button } from "./ui/button";

export const SignInGithubButton = () => {
  return (
    <Button
      className="bg-blue-500 text-black hover:bg-slate-700 hover:text-white"
      onClick={() => signIn("github", { callbackUrl: "/home" })}
    >
      Sign In With GitHub
    </Button>
  );
};
