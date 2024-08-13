import PaddingWrapper from "@components/templates/padding-wrapper";

import { DataTable } from "@/components/Table/DataTable";

import { columns, Game } from "./_components/columns";

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
export default function page() {
  return (
    <PaddingWrapper>
      <h1 className="font-semibold text-3xl my-4">Game List</h1>
      <DataTable
        columns={columns}
        data={data}
        isPaginationEnabled={true}
        defaultPageSize={10}
      />
    </PaddingWrapper>
  );
}
