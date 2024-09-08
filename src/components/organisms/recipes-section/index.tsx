import { Loader, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";
import { useGetShakeGameItems, useGetShakeGameRecipe } from "@/hooks/react-query/useItems";
import { useGetVouchers } from "@/hooks/react-query/useVouchers";
import AddRecipeDialog from "./add-recipe-dialog";
import { Button } from "@/components/ui/button";
import RecipeItem from "./recipe-item";

export default function RecipesSection() {
  const { eventId } = Route.useParams();
  const { data } = useGetShakeGameItems(eventId);
  const { data: vouchers } = useGetVouchers(eventId);
  const { data: recipes, isLoading, isSuccess, isError } = useGetShakeGameRecipe(eventId);

  return (
    <div>
      <Separator orientation="horizontal" className="my-5" />
      <h6 className="text-xl font-semibold">Recipes</h6>
      <div className="my-4 flex flex-col gap-4">
        {isLoading && (
          <div className="grid min-h-[350px] place-items-center">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {isError && <div>Error</div>}
        {isSuccess &&
          vouchers &&
          data &&
          recipes.map((recipe) => (
            <div className="flex w-full flex-row items-center gap-4">
              <RecipeItem recipe={recipe} vouchers={vouchers ?? []} items={data ?? []} />
              <Button size="sm" variant="ghost" className="w-fit">
                <Pencil size={16} />
              </Button>
            </div>
          ))}
        <AddRecipeDialog />
      </div>
    </div>
  );
}
