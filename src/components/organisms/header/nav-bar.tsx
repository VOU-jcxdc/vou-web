"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useAuthUser from "@/hooks/zustand/useAuthUser";
import { cn } from "@/lib/utils";

import navUrls from "./navUrls.json";

export default function NavBar() {
  const path = usePathname();
  const { authUser } = useAuthUser();

  return (
    <NavigationMenu>
      <NavigationMenuList className="h-[80px] w-fit px-3">
        {navUrls.map((navUrl, index: number) =>
          authUser?.role == navUrl.permission ? (
            <NavigationMenuItem key={index}>
              <Link href={navUrl.url}>
                <NavigationMenuLink
                  className={cn(
                    navUrl.url == path ||
                      (navUrl.url !== "/" && path.startsWith(navUrl.url))
                      ? "text-slate-50"
                      : "hover:bg-accent",
                    "hover:text-accent-foreground focus:text-accent-foreground relative h-10 w-fit text-nowrap rounded-full px-4 py-2 text-sm font-medium focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[active]:text-primary data-[state=open]:bg-accent/50"
                  )}
                >
                  {(navUrl.url == path ||
                    (navUrl.url !== "/" && path.startsWith(navUrl.url))) && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -z-10 top-0 block w-full h-full rounded-full bg-primary  focus:bg-primary/90 transition-colors"
                    />
                  )}
                  <span>{navUrl.name}</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
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
            "hover:text-accent-foreground focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
