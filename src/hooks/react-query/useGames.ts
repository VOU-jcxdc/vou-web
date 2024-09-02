import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Game,
  getGamesInTheSystem,
  updateGameInEvent,
  updateGameInTheSystem,
  UpdateGameParams,
} from "@/services/games";
import { useToast } from "../useToast";
import { Event, UpdateEventParams } from "@/services/events";
import { eventKeys } from "./useEvents";

export const gameKeys = {
  key: ["games"] as const,
  list: () => [...gameKeys.key] as const,
  detail: (id: string) => [...gameKeys.list(), "detail", id] as const,
};

export const useGetGamesInSystem = () => {
  return useQuery({
    queryKey: gameKeys.list(),
    queryFn: getGamesInTheSystem,
  });
};

export const useGetGameDetail = (id: string) => {
  return useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: async () => {
      const games = await getGamesInTheSystem();
      const selectedGame = games.find((game) => game.id == id);
      return selectedGame;
    },
  });
};

export const useUpdateGameDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (body: UpdateGameParams) => updateGameInTheSystem(id, body),
    onSuccess: (returnData: Game) => {
      // queryClient.setQueryData(gameKeys.list(), (games: Game[]) => {
      //   return games.map((game) => {
      //     if (game.id == returnData.id) return returnData;
      //     return game;
      //   });
      // });
      queryClient.invalidateQueries({ queryKey: gameKeys.list() });
      toast({
        description: "Update event successfully!",
      });
      queryClient.setQueryData(gameKeys.detail(id), returnData);
    },
    onError: () => {
      toast({
        description: "Failed to update game!",
        variant: "destructive",
      });
    },
  });
};
