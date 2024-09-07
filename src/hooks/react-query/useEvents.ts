import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { createEvent, Event, getEvent, getEvents, updateEvent } from "@/services/events";
import { PagingSchema } from "@/types";

import { useToast } from "../useToast";

export const eventKeys = {
  key: ["events"] as const,
  list: (paging: PagingSchema) => [...eventKeys.key, "list", paging] as const,
  detail: (id: string) => [...eventKeys.key, "detail", id] as const,
};

export const useGetEvents = (params: PagingSchema) => {
  return useQuery({
    queryKey: eventKeys.list(params),
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
      queryClient.invalidateQueries({ queryKey: [...eventKeys.key, "list"] });
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
      queryClient.invalidateQueries({ queryKey: [...eventKeys.key, "list"] });
      queryClient.setQueryData(eventKeys.detail(returnData.id), returnData);
      toast({
        description: "Create event successfully!",
      });
      router.navigate({ to: `/events` });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Failed to create event!",
        variant: "destructive",
      });
      console.log("toast");
    },
  });
};
