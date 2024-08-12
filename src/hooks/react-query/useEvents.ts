import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  createEvent,
  Event,
  getEvent,
  getEvents,
  updateEvent,
} from "@/services/events";
import { PagedData, PagingSchema } from "@/types";

import { useToast } from "../useToast";

export const eventKeys = {
  key: ["events"] as const,
  list: () => [...eventKeys.key] as const,
  detail: (id: string) => [...eventKeys.list(), "detail", id] as const,
};

export const useGetEvents = (params: PagingSchema) => {
  return useQuery({
    queryKey: eventKeys.list(),
    queryFn: () => getEvents(params),
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
      const existingEvents = queryClient.getQueryData<
        PagedData & { events: Event[] }
      >(eventKeys.list());
      if (existingEvents && existingEvents.events) {
        queryClient.setQueryData(
          eventKeys.list(),
          (
            data: PagedData & {
              events: Event[];
            }
          ) => {
            return {
              ...data,
              events: data.events.map((event) => {
                return event.id === id ? { ...event, ...returnData } : event;
              }),
            };
          }
        );
      }
      toast({
        description: "Update event successfully!",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update event!",
        variant: "destructive",
      });
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: (returnData: Event) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
      queryClient.setQueryData(eventKeys.detail(returnData.id), returnData);
      toast({
        description: "Create event successfully!",
      });
      router.push(`/events`);
    },
    onError: () => {
      toast({
        description: "Failed to create event!",
        variant: "destructive",
      });
    },
  });
};
