import api from "./kyInstance";

export type ShakeGameItem = {
  id: string;
  name: string;
  imageId: string;
  type: string;
  quantity: number;
};
export type CreateItemsParams = Omit<ShakeGameItem, "id">[];
export type UpdateItemParams = Partial<ShakeGameItem> & { id: string };
export const createGameItems = async (eventId: string, body: CreateItemsParams) => {
  return (
    await api
      .post(`events/${eventId}/items`, {
        json: {
          items: body,
        },
      })
      .json<{ data: ShakeGameItem[] }>()
  ).data;
};

export const getGameItems = async (eventId: string) => {
  return (await api.get(`events/${eventId}/items`).json<{ data: ShakeGameItem[] }>()).data;
};

export const updateGameItem = async (eventId: string, body: UpdateItemParams) => {
  return (
    await api
      .put(`events/${eventId}/items/${body.id}`, {
        json: body,
      })
      .json<{ data: ShakeGameItem }>()
  ).data;
};

export const deleteGameItem = async (eventId: string, itemId: string) => {
  return await api.delete(`events/${eventId}/items/${itemId}`);
};
