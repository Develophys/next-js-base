"use client";

import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
    >
      Sign Out
    </button>
  );
};
