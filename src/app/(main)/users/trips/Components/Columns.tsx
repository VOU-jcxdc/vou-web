"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown,MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatDate from "@/lib/utils/functions/formatDate";

export type User = {
  id: string;
  name: string;
  emaiL: string;
  image: string;
  lastSeen: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Trip",
  },
  {
    accessorKey: "email",
    header: "Customer",
  },
  {
    accessorKey: "lastSeen",
    header: ({ column }) => {
      return (
        <div className="flex w-32 items-center justify-center border-none">
          <Button
            variant="outline"
            className="border-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastSeen"));
      const formatted = formatDate(date);

      return (
        <div className="w-32 text-center">
          {row.getValue("lastSeen") ? formatted : "Unknown"}
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
              Copy trip ID
            </DropdownMenuItem>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
