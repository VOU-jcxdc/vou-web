"use client";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader } from "lucide-react";

import { DataTable } from "@/components/Table/DataTable";
import { useGetEvents } from "@/hooks/react-query/useEvents";

import { columns } from "./_components/columns";

export default function Page() {
  const { isLoading, data, isSuccess, isError } = useGetEvents();
  return (
    <PaddingWrapper>
      <h1 className="font-semibold text-3xl my-4">My Event List</h1>
      {isLoading && (
        <div className="grid place-items-center min-h-[350px]">
          <Loader className="animate-spin text-primary w-10 h-10" />
        </div>
      )}
      {isError && <div>Error</div>}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={data}
          isPaginationEnabled={true}
          defaultPageSize={10}
        />
      )}
    </PaddingWrapper>
  );
}
