import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full pt-16">{children}</main>;
}
