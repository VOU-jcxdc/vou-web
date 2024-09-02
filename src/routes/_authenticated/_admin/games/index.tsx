import { createFileRoute } from "@tanstack/react-router";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "@components/organisms/games-table/columns";
import { useGetGamesInSystem } from "@/hooks/react-query/useGames";

export const Route = createFileRoute("/_authenticated/_admin/games/")({
  component: GamePage,
});

function GamePage() {
  const { data, isSuccess, isError } = useGetGamesInSystem();
  return (
    <PaddingWrapper>
      <h1 className="my-4 text-3xl font-semibold">Game List</h1>
      {isError && <div>Error</div>}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={data}
          isPaginationEnabled={true}
          defaultPageSize={10}
          totalPages={1}
        />
      )}
    </PaddingWrapper>
  );
}
