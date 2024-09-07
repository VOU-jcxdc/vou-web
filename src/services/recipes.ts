import { RecipeTarget } from "@/types/enums";
import api from "./kyInstance";

type ItemRecipe = {
  itemId: string;
  quantity: number;
};
export type CreateRecipeParams = {
  eventId: string;
  itemRecipe: ItemRecipe[];
  targetType: RecipeTarget;
  targetId: string;
};

export const createGameRecipe = async (body: CreateRecipeParams) => {
  console.log(body);
  return (await api.post(`items/recipes`, { json: body }).json<{ data: CreateRecipeParams }>())
    .data;
};
