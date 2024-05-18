"use client";
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
import NavigationHeader from "./NavigationHeader";

export function Header() {
  const pathname = usePathname();

  if (!pathname.includes("/login"))
    return (
      <header className="border-2 flex h-16 w-full shrink-0 items-center justify-between bg-purple-100 p-4 absolute">
        <div className="flex items-center space-x-1">
          <h1 className="text-lg font-medium">Study APP</h1>
        </div>

        <NavigationHeader />

        <div className=" flex gap-2">
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
