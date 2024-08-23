import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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

export type Game = {
  id: string;
  name: string;
  image: string;
  exchangeStatus: boolean;
  instruction?: string;
};

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const game = row.original;
      return <img src={game.image} alt={game.name} className="size-[100px] rounded-md" />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "exchangeStatus",
    header: "Exchange Items",
    cell: ({ row }) => {
      const game = row.original;

      return (
        <Badge
          variant="secondary"
          className={
            game.exchangeStatus
              ? "border border-green-600 bg-green-100 text-green-900 hover:bg-green-100"
              : "border border-orange-600 bg-orange-100 text-orange-900 hover:bg-orange-100"
          }
        >
          {game.exchangeStatus ? "Allow" : "No"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const game = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(game.id)}>
              Copy game ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/games/${game.id}`}>View game</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Deactivate user</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
