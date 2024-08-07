"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import formatDate from "@/lib/utils/functions/formatDate";
import { User } from "@/services";

const roleVariants = cva("border", {
  variants: {
    role: {
      admin: "border-green-600 bg-green-100 text-green-900 hover:bg-green-100",
      player: "border-blue-500 bg-blue-100 text-blue-900 hover:bg-blue-100",
      brand:
        "border-orange-600 bg-orange-100 text-orange-900 hover:bg-orange-100",
    },
    status: {
      active: "border-green-600 bg-green-100 text-green-900 hover:bg-green-100",
      inactive: "border-red-600 bg-red-100 text-red-900 hover:bg-red-100",
    },
  },
  defaultVariants: {
    role: "admin",
  },
});
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="w-20 overflow-hidden text-nowrap text-ellipsis">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role as
        | "admin"
        | "player"
        | "brand"
        | null
        | undefined;

      return (
        <Badge
          variant="secondary"
          className={cn(roleVariants({ role }), "capitalize")}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as
        | "active"
        | "inactive"
        | null
        | undefined;

      return (
        <Badge
          variant="secondary"
          className={cn(roleVariants({ status }), "capitalize")}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdOn"));
      const formatted = formatDate(date);

      return <div>{row.getValue("createdOn") ? formatted : "__"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/users/${user.id}`}>View user</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
