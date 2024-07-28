import api from "./httpRequests";

export type Event = {
  id: string;
  name: string;
  beginDate: string;
  endDate: string;
  description?: string;
  images?: string[];
};

export type CreateEventParams = Event;

export const getEvents = async () => {
  return await api.get<Event[]>("events");
};

export const getEvent = async (id: string) => {
  return await api.get<Event>(`events/${id}`);
};

export const createEvent = async (body: CreateEventParams) => {
  return await api.post<Event>("events", { body });
};

export const updateEvent = async (body: CreateEventParams) => {
  return await api.put<Event>(`events/${body.id}`, { body });
};
