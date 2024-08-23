import { createFileRoute } from "@tanstack/react-router";

import { Loader, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetEvent, useUpdateEvent } from "@/hooks/react-query/useEvents";
import { Event } from "@/services/events";
import { EventStatusEnum } from "@/types/enums";

import Form from "@components/organisms/event-detail-form";

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/")({
  component: Page,
});

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
          ? "border border-green-500 bg-green-50 text-green-500"
          : "border border-destructive bg-destructive-bg text-destructive"
      }
    >
      {updateStatusMutation.isPending && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
      )}
      {event.status == EventStatusEnum.PLANNING ? "Start event" : "End event"}
    </Button>
  );
}
function Page() {
  const { eventId } = Route.useParams<{ eventId: string }>();
  const { data, isLoading, isError, isSuccess } = useGetEvent(eventId);
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-semibold">Event General Information</h1>
        {data && <StatusButton event={data} />}
      </div>
      <Separator orientation="horizontal" className="mb-8 w-full" />
      {isLoading && (
        <div className="grid min-h-[350px] place-items-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      {isError && <div>Error</div>}
      {isSuccess && <Form event={data} />}
    </>
  );
}
