"use client";
import React from "react";

import { signOut } from "next-auth/react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SignOutButton = (props: ButtonProps) => {
  const { ...otherProps } = props;

  return (
    <button
      className="w-full h-full px-4 py-2 text-black"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
      {...otherProps}
    >
      Sign Out
    </button>
  );
};
