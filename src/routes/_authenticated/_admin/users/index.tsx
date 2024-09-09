import { createFileRoute, Link, SearchSchemaInput } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DataTable } from "@components/Table/DataTable";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader, Plus } from "lucide-react";

import { useGetUsers } from "@/hooks/react-query/useUsers";

import { columns } from "@components/organisms/users-table/columns";
import { PagingSchema, pagingSchema } from "@/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/_admin/users/")({
  component: UsersPage,
  validateSearch: (search: PagingSchema & SearchSchemaInput) => pagingSchema.parse(search),
});

function UsersPage() {
  const searchParams = Route.useSearch();
  const { isLoading, data, isSuccess, isError } = useGetUsers(searchParams);

  return (
    <div className="max-w-screen flex min-h-screen w-full flex-row xl:flex-col">
      <TooltipProvider>
        <div className="flex w-full flex-col gap-4 pt-4 sm:pt-2">
          <PaddingWrapper>
            <div className="flex items-center justify-between">
              <h1 className="my-4 text-3xl font-semibold">User List</h1>
              <Link to="/users/create">
                <Button size="sm">
                  <Plus size={16} className="mr-2" /> Create admin account
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
                data={data.accounts}
                totalPages={Math.floor((data.total - 1) / data.limit) + 1}
                isPaginationEnabled={true}
                defaultPageSize={10}
              />
            )}
          </PaddingWrapper>
        </div>
      </TooltipProvider>
    </div>
  );
}
