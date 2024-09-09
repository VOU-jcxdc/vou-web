import { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { Link } from "@tanstack/react-router";

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
import { Event } from "@/services/events";
import { useGetGamesInSystem } from "@/hooks/react-query/useGames";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariants = cva("border", {
  variants: {
    status: {
      ongoing: "border-green-600 bg-green-100 text-green-900 hover:bg-green-100",
      planning: "border-blue-600 bg-blue-100 text-blue-900 hover:bg-blue-100",
      finished: "border-gray-600 bg-gray-100 text-gray-900 hover:bg-gray-100",
    },
  },
});

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="w-20 overflow-hidden text-ellipsis text-nowrap">{row.getValue("id")}</div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "beginDate",
    header: "Timeline",
    cell: ({ row }) => {
      const { beginDate, endDate } = row.original;
      return (
        <div>
          {moment(beginDate).calendar().split(" at")[0]} -{" "}
          {moment(endDate).calendar().split(" at")[0]}
        </div>
      );
    },
  },
  {
    accessorKey: "gameId",
    header: "Game type",
    cell: ({ row }) => {
      const gameId = row.original.gameId;
      const { data, isLoading, isSuccess } = useGetGamesInSystem();
      if (isLoading) return <Skeleton className="h-5" />;
      if (gameId && data && isSuccess)
        return <div>{data.find((game) => game.id == gameId)?.name}</div>;
      return <div>No game assigned</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as "ongoing" | "planning" | "finished";
      return (
        <Badge variant="secondary" className={cn(statusVariants({ status }), "capitalize")}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(event.id)}>
              Copy event ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/events/${event.id}`}>View event</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
