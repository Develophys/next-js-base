"use client";

import { signIn } from "next-auth/react";

export const SignInGithubButton = () => {
  return (
    <button
      className="bg-slate-600 px-4 py-2 text-white rounded"
      onClick={() => signIn("github", { callbackUrl: "/products" })}
      type="button"
    >
      Sign In With GitHub
    </button>
  );
};
