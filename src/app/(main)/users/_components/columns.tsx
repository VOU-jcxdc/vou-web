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
import formatDate from "@/lib/utils/functions/formatDate";

export type User = {
  id: string;
  username: string;
  role: string;
  avatar: string;
  phone: string;
  createdAt: string;
};

const roleVariants = cva("border", {
  variants: {
    role: {
      admin: "border-green-600 bg-green-100 text-green-900 hover:bg-green-100",
      player: "border-blue-500 bg-blue-100 text-blue-900 hover:bg-blue-100",
      brand:
        "border-orange-600 bg-orange-100 text-orange-900 hover:bg-orange-100",
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
      const role = row.original.role;

      return (
        <Badge variant="secondary" className={roleVariants({ role: "brand" })}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex w-32 items-center justify-center border-none">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = formatDate(date);

      return (
        <div className="w-32 text-center">
          {row.getValue("createdAt") ? formatted : "__"}
        </div>
      );
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
            <DropdownMenuItem>Deactivate user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
