import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-max pt-16">{children}</main>;
}
