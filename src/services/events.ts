import { PagedData, PagingSchema } from "@/types";

import api from "./httpRequests";
import { fromPageToOffset, generateSearchParams } from "./utils";

export type Event = {
  id: string;
  name: string;
  beginDate: string;
  endDate: string;
  description?: string;
  images: string[];
};

export type CreateEventParams = Omit<Event, "id">;
export type UpdateEventParams = Partial<Event>;

export const getEvents = async (params: PagingSchema) => {
  const searchParams = generateSearchParams(fromPageToOffset(params));
  return await api.get<PagedData & { events: Event[] }>("events", {
    searchParams,
  });
};

export const getEvent = async (id: string) => {
  return await api.get<Event>(`events/${id}`);
};

export const createEvent = async (body: CreateEventParams) => {
  return await api.post<Event>("events", { body });
};

export const updateEvent = async (body: UpdateEventParams) => {
  // return await api.put<Event>(`events/${body.id}`, { body });
  return await api.put<Event>("events", { body });
};
