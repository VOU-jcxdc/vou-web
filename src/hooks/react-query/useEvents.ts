import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getEvent, getEvents, updateEvent } from "@/services/events";
import { Event } from "@/services/events";

import { useToast } from "../useToast";

const eventKeys = {
  list: () => ["events"] as const,
  detail: (id: string) => [...eventKeys.list(), id] as const,
};

export const useGetEvents = () => {
  return useQuery({
    queryKey: eventKeys.list(),
    queryFn: getEvents,
  });
};

export const useGetEvent = (id: string) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEvent(id),
  });
};

export const useUpdateEvent = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["update", ...eventKeys.detail(id)],
    mutationFn: updateEvent,
    onSuccess: (returnData: Event) => {
      queryClient.setQueryData(eventKeys.detail(id), (event: Event) => {
        return {
          ...event,
          ...returnData,
        };
      });
      const existingEvents = queryClient.getQueryData<Event[]>(
        eventKeys.list()
      );
      if (existingEvents) {
        queryClient.setQueryData(eventKeys.list(), (events: Event[]) => {
          return events.map((event) => {
            if (event.id === returnData.id) return returnData;
            return event;
          });
        });
      }
      toast({
        description: "Update event successfully!",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update event!",
      });
    },
  });
};
