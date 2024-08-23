import { Link } from "@tanstack/react-router";
import React from "react";

import { cn } from "@/lib/utils";

type SideBarItemProps = {
  href?: string;
  children: React.ReactNode;
  active?: boolean;
};
export default function SideBarItem({ href = "", active = false, children }: SideBarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "grid h-10 items-center border-l-4 pl-4",
        active
          ? "border-primary text-primary hover:bg-primary/5"
          : "border-primary/0 hover:bg-slate-50"
      )}
    >
      {children}
    </Link>
  );
}
