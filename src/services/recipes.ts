import { RecipeTarget } from "@/types/enums";
import api from "./kyInstance";

type ItemRecipe = {
  itemId: string;
  quantity: number;
};
export type Recipe = {
  eventId: string;
  itemRecipe: ItemRecipe[];
  targetType: RecipeTarget;
  targetId: string;
  target?: {
    id: string;
    name: string;
    imageId: string;
  };
};
export type CreateRecipeParams = Recipe;

export const createGameRecipe = async (body: CreateRecipeParams) => {
  return (await api.post(`items/recipes`, { json: body }).json<{ data: CreateRecipeParams }>())
    .data;
};

export const getGameRecipe = async (eventId: string) => {
  return (await api.get(`events/${eventId}/recipes`).json<{ data: CreateRecipeParams[] }>()).data;
};
