"use client";
// eslint-disable-next-line simple-import-sort/imports
import { DataTable } from "@components/Table/DataTable";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import { useGetUsers } from "@/hooks/react-query/useUsers";

import { columns } from "./_components/columns";
import usePushSearchParams from "@/hooks/usePushSearchParams";
import { pagingSchema } from "@/types";

export default function Page() {
  const searchParams = useSearchParams();
  const pushSearch = usePushSearchParams();
  const params = pagingSchema.parse(searchParams);
  pushSearch(params);
  const { isLoading, data, isSuccess, isError } = useGetUsers(params);

  return (
    <PaddingWrapper>
      <h1 className="font-semibold text-3xl my-4">User List</h1>
      {isLoading && (
        <div className="grid place-items-center min-h-[350px]">
          <Loader className="animate-spin text-primary w-10 h-10" />
        </div>
      )}
      {isError && <div>Error</div>}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={data.accounts}
          isPaginationEnabled={true}
          defaultPageSize={10}
        />
      )}
    </PaddingWrapper>
  );
}
