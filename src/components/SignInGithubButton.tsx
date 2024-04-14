"use client";

import { signIn } from "next-auth/react";

import { Button } from "./ui/button";

export const SignInGithubButton = () => {
  return (
    <Button
      className="bg-blue-500 hover:bg-black"
      onClick={() => signIn("github", { callbackUrl: "/products" })}
    >
      Sign In With GitHub
    </Button>
  );
};
