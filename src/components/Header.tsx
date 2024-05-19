"use client";
import { usePathname, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { useCurrentLocale } from "@/../locales/client";

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
import SelectLanguage from "./SelectLanguage";
import { isExpired } from "@/lib/utils";

export function Header() {
  const locale = useCurrentLocale();

  const pathname = usePathname();

  const router = useRouter();

  const { data: session } = useSession();

  if (
    pathname.includes(`/${locale}/login`) &&
    !isExpired(session?.expires as string)
  )
    router.push(`/${locale}/home`);

  if (!pathname.includes(`/${locale}/login`))
    return (
      <header className="border-2 flex  h-16 w-full shrink-0 items-center justify-between bg-purple-100 p-4 absolute">
        <div className="flex items-center space-x-1 gap-2">
          <h1 className="text-lg font-medium">Study APP</h1>
          <SelectLanguage />
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
