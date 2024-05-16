"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { HomeIcon, BookIcon } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  if (!pathname.includes("/login"))
    return (
      <aside className="sticky top-0 w-56 bg-purple-100 text-gray-800 p-4 pt-16 mt-2">
        <nav className="space-y-2">
          <Link
            className={`${
              pathname === "/home" ? "bg-purple-300" : ""
            } w-full flex items-center space-x-2 hover:bg-purple-400 hover:text-gray-500 py-2 px-2 rounded-lg text-gray-500 transition`}
            href="/home"
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          <Link
            className={`${
              pathname === "/courses" ? "bg-purple-300 py-2 " : ""
            } w-full flex items-center space-x-2 hover:bg-purple-400 hover:text-gray-500 py-2 px-2 rounded-lg text-gray-500 transition`}
            href="/courses"
          >
            <BookIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Courses</span>
          </Link>
        </nav>
      </aside>
    );
}
