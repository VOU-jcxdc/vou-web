"use client";
import { Loader, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetEvent, useUpdateEvent } from "@/hooks/react-query/useEvents";
import { Event } from "@/services/events";
import { EventStatusEnum } from "@/types/enums";

import Form from "./form";

function StatusButton({ event }: { event: Event }) {
  const updateStatusMutation = useUpdateEvent(event.id);
  const onClick = () => {
    if (event.status == EventStatusEnum.FINISHED) return;
    updateStatusMutation.mutate({
      id: event.id,
      status:
        event.status == EventStatusEnum.PLANNING
          ? EventStatusEnum.ONGOING
          : EventStatusEnum.FINISHED,
    });
  };

  if (event.status == EventStatusEnum.FINISHED) return null;
  return (
    <Button
      onClick={onClick}
      disabled={updateStatusMutation.isPending}
      variant="outline"
      className={
        event.status == EventStatusEnum.PLANNING
          ? "text-green-500 bg-green-50 border border-green-500"
          : "text-destructive bg-destructive-bg border border-destructive"
      }
    >
      {updateStatusMutation.isPending && (
        <Loader2 className="animate-spin text-primary w-4 h-4 mr-2" />
      )}
      {event.status == EventStatusEnum.PLANNING ? "Start event" : "End event"}
    </Button>
  );
}
export default function Page({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  const { data, isLoading, isError, isSuccess } = useGetEvent(eventId);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl my-4">
          Event General Information
        </h1>
        {data && <StatusButton event={data} />}
      </div>
      <Separator orientation="horizontal" className="w-full mb-8" />
      {isLoading && (
        <div className="grid place-items-center min-h-[350px]">
          <Loader className="animate-spin text-primary w-10 h-10" />
        </div>
      )}
      {isError && <div>Error</div>}
      {isSuccess && <Form event={data} />}
    </>
  );
}
