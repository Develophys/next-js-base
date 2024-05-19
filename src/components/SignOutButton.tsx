"use client";
import React from "react";

import { signOut } from "next-auth/react";
import { useCurrentLocale } from "@/../locales/client";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SignOutButton = (props: ButtonProps) => {
  const { ...otherProps } = props;

  const locale = useCurrentLocale();

  return (
    <button
      className="w-full h-full px-4 py-2 text-black"
      onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
      type="button"
      {...otherProps}
    >
      Sign Out
    </button>
  );
};
