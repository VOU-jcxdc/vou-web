import { createFileRoute } from "@tanstack/react-router";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { DataTable } from "@components/Table/DataTable";
import { columns, Game } from "@components/organisms/games-table/columns";

export const Route = createFileRoute("/_authenticated/_admin/games/")({
  component: GamePage,
});

const data: Game[] = [
  {
    id: "1",
    name: "Quiz game",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/742.jpg",
    exchangeStatus: true,
  },
  {
    id: "2",
    name: "Shake game",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/740.jpg",
    exchangeStatus: false,
  },
];

function GamePage() {
  return (
    <PaddingWrapper>
      <h1 className="my-4 text-3xl font-semibold">Game List</h1>
      <DataTable columns={columns} data={data} isPaginationEnabled={true} defaultPageSize={10} />
    </PaddingWrapper>
  );
}
