"use client";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useGetEvents } from "@/hooks/react-query/useEvents";
import usePushSearchParams from "@/hooks/usePushSearchParams";
import { pagingSchema } from "@/types";

import { columns } from "./_components/columns";

export default function Page() {
  const searchParams = useSearchParams();
  const pushSearch = usePushSearchParams();
  const params = pagingSchema.parse(searchParams);
  pushSearch(params);
  const { isLoading, data, isSuccess, isError } = useGetEvents(params);
  return (
    <PaddingWrapper>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl my-4">My Event List</h1>
        <Link href="/events/create">
          <Button size="sm">
            <Plus size={16} className="mr-2" /> Create event
          </Button>
        </Link>
      </div>
      {isLoading && (
        <div className="grid place-items-center min-h-[350px]">
          <Loader className="animate-spin text-primary w-10 h-10" />
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
