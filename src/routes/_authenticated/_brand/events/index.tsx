import { createFileRoute, Link, SearchSchemaInput } from "@tanstack/react-router";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader, Plus } from "lucide-react";

import { DataTable } from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useGetEvents } from "@/hooks/react-query/useEvents";
import { PagingSchema, pagingSchema } from "@/types";

import { columns } from "@components/organisms/events-table/columns";

export const Route = createFileRoute("/_authenticated/_brand/events/")({
  component: EventsPage,
  validateSearch: (search: PagingSchema & SearchSchemaInput) => pagingSchema.parse(search),
});

function EventsPage() {
  const searchParams = Route.useSearch();
  const { isLoading, data, isSuccess, isError } = useGetEvents(searchParams);
  return (
    <PaddingWrapper>
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-semibold">My Event List</h1>
        <Link to="/events/create">
          <Button size="sm">
            <Plus size={16} className="mr-2" /> Create event
          </Button>
        </Link>
      </div>
      {isLoading && (
        <div className="grid min-h-[350px] place-items-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      {isError && <div>Error</div>}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={data.events}
          isPaginationEnabled={true}
          defaultPageSize={10}
        />
      )}
    </PaddingWrapper>
  );
}
