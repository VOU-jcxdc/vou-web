import { Card } from "@/components/ui/card";
import { Recipe } from "@/services";
import { ShakeGameItem } from "@/services/items";
import { Voucher } from "@/services/vouchers";
import { Equal, Plus } from "lucide-react";
import { useMemo } from "react";

interface RecipeItemProps {
  recipe: Recipe;
  vouchers: Voucher[];
  items: ShakeGameItem[];
}
export default function RecipeItem({ recipe, vouchers, items }: RecipeItemProps) {
  const { itemRecipe, targetId } = recipe;

  const mappedVoucher = useMemo(() => {
    return vouchers.find(({ id }) => targetId == id);
  }, [vouchers, recipe]);

  return (
    <div className="grid w-full flex-1 grid-cols-[6fr_48px_6fr_48px_6fr] items-center justify-items-center gap-4">
      {itemRecipe.map((ingredient, index) => (
        <>
          <Card
            key={index * 2}
            className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center "
          >
            x{ingredient.quantity} {items.find((item) => item.id == ingredient.itemId)?.name ?? ""}
          </Card>
          {index < recipe.itemRecipe.length - 1 && (
            <Plus size={48} className="text-muted-foreground" key={index * 2 + 1} />
          )}
        </>
      ))}
      <Equal className="text-muted-foreground" size={48} />
      <Card className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center ">
        <div>
          <p>{mappedVoucher?.code ?? ""}</p>
          <p className="text-sm italic text-muted-foreground">{mappedVoucher?.name ?? ""}</p>
        </div>
      </Card>
    </div>
  );
}
