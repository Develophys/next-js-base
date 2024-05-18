"use client";
import React from "react";
import { BookA } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface IHeaderMenuItem {
  title: string;
  href: string;
  description: string;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-8 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function NavigationHeader() {
  const components: IHeaderMenuItem[] = [
    {
      title: "All Courses",
      href: "/courses",
      description: "A page with all available courses.",
    },
    {
      title: "Add a new Course",
      href: "/courses/new-course",
      description: "A page to Teacher add new Courses.",
    },
    {
      title: "Your Courses",
      href: "/courses",
      description: "A page to Teacher or student show your courses.",
    },
  ];
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/home"
                    >
                      <BookA className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        study-app
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        dedicated app designed to assist individuals in Rio
                        Grande do Sul with career transitions into the software
                        development field.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/courses" title="Show all courses">
                  Explore our catalog to master essential software development
                  skills, from beginner to advanced levels, and support your
                  career transition.
                </ListItem>
                <ListItem href="/profile" title="I'm a Teacher">
                  Are you an experienced software development professional?
                  Share your expertise and help others transition into tech
                  careers by becoming an instructor.
                </ListItem>
                <ListItem href="/contact" title="I need Help">
                  If you have any questions or need support, we&apos;re here to
                  help. Visit our &quot;I Need Help&quot; page for resources,
                  FAQs, and contact information to get the assistance you need.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
