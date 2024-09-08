import {
  createGameItems,
  CreateItemsParams,
  deleteGameItem,
  getGameItems,
  ShakeGameItem,
  updateGameItem,
  UpdateItemParams,
} from "@/services/items";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import { eventKeys } from "./useEvents";
import { createGameRecipe, getGameRecipe, Recipe } from "@/services";

export const itemKeys = {
  key: (id: string) => [...eventKeys.detail(id), "items"],
  recipeList: (eventId: string) => [...eventKeys.detail(eventId), "recipes"],
};
export const useCreateShakeGameItems = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (body: CreateItemsParams) => createGameItems(eventId, body),
    onSuccess: (returnData) => {
      queryClient.setQueryData(itemKeys.key(eventId), (prev: ShakeGameItem[]) => [
        ...prev,
        ...returnData,
      ]);
      toast({
        title: "Create items successfully!",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: "Create items failed!",
        variant: "destructive",
      });
    },
  });
};

export const useGetShakeGameItems = (eventId: string) => {
  return useQuery({
    queryKey: itemKeys.key(eventId),
    queryFn: () => getGameItems(eventId),
  });
};

export const useUpdateShakeGameItem = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (body: UpdateItemParams) => updateGameItem(eventId, body),
    onSuccess: (returnData) => {
      queryClient.setQueryData(itemKeys.key(eventId), (prev: ShakeGameItem[]) => {
        return prev.map((game) => {
          if (game.id == returnData.id) return returnData;
          return game;
        });
      });
      toast({
        title: "Update items successfully!",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: "Update items failed!",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteShakeGameItem = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (itemId: string) => deleteGameItem(eventId, itemId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(itemKeys.key(eventId), (prev: ShakeGameItem[]) => {
        return prev.filter((game) => game.id !== variables);
      });
      toast({
        title: "Delete item successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Delete item failed!",
        variant: "destructive",
      });
    },
  });
};

export const useCreateShakeGameRecipe = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createGameRecipe,
    onSuccess: (returnData) => {
      queryClient.setQueryData(itemKeys.recipeList(eventId), (prev: Recipe[]) => [
        ...prev,
        returnData,
      ]);
      toast({
        title: "Create recipes successfully!",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Failed to create recipes!",
        variant: "destructive",
      });
    },
  });
};

export const useGetShakeGameRecipe = (eventId: string) => {
  return useQuery({
    queryKey: itemKeys.recipeList(eventId),
    queryFn: () => getGameRecipe(eventId),
  });
};
