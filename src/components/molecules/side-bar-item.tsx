import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

type SideBarItemProps = {
  href?: string;
  children: React.ReactNode;
  active?: boolean;
};
export default function SideBarItem({
  href = "",
  active = false,
  children,
}: SideBarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "h-10 grid items-center pl-4 border-l-4",
        active
          ? "border-primary text-primary hover:bg-primary/5"
          : "border-primary/0 hover:bg-slate-50"
      )}
    >
      {children}
    </Link>
  );
}
