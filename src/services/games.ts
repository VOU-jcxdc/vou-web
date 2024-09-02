import { GameEnum } from "@/types/enums";
import api from "./kyInstance";
import { UpdateEventParams } from "./events";

export type Game = {
  id: string;
  name: string;
  type: GameEnum;
  exchangeStatus: boolean;
  instruction: string;
  images: {
    bucketId: string;
  }[];
};

export type UpdateGameParams = {
  exchangeStatus: boolean;
  instruction: string;
};

export const getGamesInTheSystem = async () => {
  return (await api.get(`games-in-system`).json<{ data: Game[] }>()).data;
};

export const updateGameInTheSystem = async (id: string, body: UpdateGameParams) => {
  return (
    await api
      .put(`games-in-system/${id}`, {
        json: body,
      })
      .json<{ data: Game }>()
  ).data;
};

export const updateGameInEvent = async (id: string, gameId: string) => {
  return (
    await api
      .put(`events/${id}`, {
        json: {
          gameId,
        },
      })
      .json<{ data: UpdateEventParams }>()
  ).data;
};
