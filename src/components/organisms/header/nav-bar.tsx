import { motion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AuthUser } from "@/hooks/zustand/useAuthUser";
import { cn } from "@/lib/utils";

import navUrls from "./navUrls.json";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/react-query/useAuth";

export default function NavBar() {
  const {
    location: { pathname },
  } = useRouterState();
  const queryClient = useQueryClient();
  const authUser: AuthUser | undefined = queryClient.getQueryData(authKeys.detail());

  return (
    <NavigationMenu>
      <NavigationMenuList className="h-[80px] w-fit px-3">
        {navUrls.map((navUrl, index: number) =>
          authUser?.role == navUrl.permission ? (
            <NavigationMenuItem key={index}>
              <Link to={navUrl.url}>
                <NavigationMenuLink
                  className={cn(
                    navUrl.url == pathname ||
                      (navUrl.url !== "/" && pathname.startsWith(navUrl.url))
                      ? "text-slate-50"
                      : "hover:bg-accent",
                    "hover:text-accent-foreground focus:text-accent-foreground relative h-10 w-fit text-nowrap rounded-full px-4 py-2 text-sm font-medium focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active]:text-primary"
                  )}
                >
                  {(navUrl.url == pathname ||
                    (navUrl.url !== "/" && pathname.startsWith(navUrl.url))) && (
                    <motion.span
                      layoutId="underline"
                      className="absolute top-0 -z-10 block h-full w-full rounded-full bg-primary  transition-colors focus:bg-primary/90"
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

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
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
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
