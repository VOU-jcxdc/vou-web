import { PagedData, PagingSchema } from "@/types";
import { EventStatusEnum } from "@/types/enums";

import api from "./kyInstance";
import { fromPageToOffset, generateSearchParams } from "./utils";

export type Event = {
  id: string;
  name: string;
  beginDate: string;
  endDate: string;
  description?: string;
  images: string[];
  status: EventStatusEnum;
};

export type CreateEventParams = Omit<Event, "id" | "status">;
export type UpdateEventParams = Partial<Event>;

export const getEvents = async (params: PagingSchema) => {
  const searchParams = generateSearchParams(fromPageToOffset(params));
  return (
    await api
      .get("events", {
        searchParams,
      })
      .json<{ data: PagedData & { events: Event[] } }>()
  ).data;
};

export const getEvent = async (id: string) => {
  return (await api.get(`events/${id}`).json<{ data: Event }>()).data;
};

export const createEvent = async (body: CreateEventParams) => {
  return (await api.post("events", { json: body }).json<{ data: Event }>()).data;
};

export const updateEvent = async (body: UpdateEventParams) => {
  // return await api.put<Event>(`events/${body.id}`, { body });
  return (await api.put("events", { json: body }).json<{ data: Event }>()).data;
};
