"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { SignOutButton } from "./SignOutButton";

export function Header() {
  const pathname = usePathname();

  if (!pathname.includes("/login"))
    return (
      <header className="border-2 flex h-16 w-full shrink-0 items-center bg-purple-100 p-4 absolute">
        <div className="flex items-center space-x-1">
          <h1 className="text-lg font-medium">Study APP</h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/home"
          >
            Home
          </Link>
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/courses"
          >
            Courses
          </Link>

          <Menubar className="border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem disabled>Profile</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Classes</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="cursor-pointer w-auto p-0">
                  <SignOutButton className="m-2 text-left w-full h-full" />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </header>
    );
}
