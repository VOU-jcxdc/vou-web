"use client";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useGetEvent } from "@/hooks/react-query/useEvents";

import Form from "./form";

export default function Page({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  const { data, isLoading, isError, isSuccess } = useGetEvent(eventId);
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl my-4">Event Detail</h1>
        </div>
        <Separator orientation="horizontal" className="w-full mb-8" />
        {isLoading && (
          <div className="grid place-items-center min-h-[350px]">
            <Loader className="animate-spin text-primary w-10 h-10" />
          </div>
        )}
        {isError && <div>Error</div>}
        {isSuccess && <Form event={data} />}
      </div>
    </PaddingWrapper>
  );
}
