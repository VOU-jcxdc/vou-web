import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CircleAlert, Loader, Minus, Plus, PlusCircle, Equal, Ticket } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";
import { useCreateShakeGameRecipe, useGetShakeGameItems } from "@/hooks/react-query/useItems";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RecipeTargetEnum } from "@/types/enums";
import { Card } from "@/components/ui/card";
import { useGetVouchers } from "@/hooks/react-query/useVouchers";
import { Command, CommandItem, CommandList } from "@/components/ui/command";

const recipeSchema = z.object({
  itemRecipe: z
    .array(
      z.object({
        itemId: z.string().uuid(),
        quantity: z.number().positive().catch(1),
      })
    )
    .max(2),
  targetType: z
    .nativeEnum(RecipeTargetEnum)
    .default(RecipeTargetEnum.voucher)
    .catch(RecipeTargetEnum.voucher),
  targetId: z.string().uuid(),
});
type RecipeSchema = z.infer<typeof recipeSchema>;

export default function RecipesSection() {
  const { eventId } = Route.useParams();
  const { isLoading, isSuccess, isError, data } = useGetShakeGameItems(eventId);
  const { data: vouchers } = useGetVouchers(eventId);
  const createRecipeMutation = useCreateShakeGameRecipe(eventId);
  const form = useForm<RecipeSchema>({
    resolver: zodResolver(recipeSchema),
  });
  const {
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "itemRecipe" });

  return (
    <div>
      <Separator orientation="horizontal" className="my-5" />
      <h6 className="text-xl font-semibold">Recipes</h6>
      <div className="grid  grid-cols-[30%_5%_30%_5%_30%] items-center justify-items-center gap-4">
        <Form {...form}>
          {fields.map((field, index) => (
            <>
              <div className="flex w-full flex-col items-center gap-2">
                <FormField
                  key={field.id}
                  control={control}
                  name={`itemRecipe.${index}.itemId`}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={(newValue) => {
                        setValue(field.name, newValue, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <SelectTrigger className="capitalize">
                        {data?.find((item) => field.value == item.id)?.name ?? "Select an item"}
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map(({ id, name }) => (
                          <SelectItem key={id} value={id} className="capitalize">
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={control}
                  name={`itemRecipe.${index}.quantity`}
                  render={() => (
                    <FormItem>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setValue(
                              `itemRecipe.${index}.quantity`,
                              getValues(`itemRecipe.${index}.quantity`) - 1,
                              { shouldValidate: true }
                            );
                          }}
                        >
                          <Minus size={16} />
                        </Button>
                        <FormControl>
                          <Input
                            {...register(`itemRecipe.${index}.quantity`, {
                              valueAsNumber: true,
                              min: 1,
                            })}
                            type="number"
                            placeholder="1"
                            className="w-[4rem] text-center"
                            defaultValue={1}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setValue(
                              `itemRecipe.${index}.quantity`,
                              getValues(`itemRecipe.${index}.quantity`) + 1,
                              { shouldValidate: true }
                            );
                          }}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              {index == 0 && <Plus size={48} className="text-muted-foreground" />}
            </>
          ))}
          {fields.length < 2 && (
            <Card
              className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center text-muted-foreground hover:shadow-lg"
              onClick={() => append({})}
            >
              Add ingredient
            </Card>
          )}
          <Equal size={48} className="text-muted-foreground" />

          <FormField
            control={control}
            name={`targetId`}
            render={({ field }) => (
              <DropdownMenu {...field}>
                <DropdownMenuTrigger asChild>
                  <Card className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center text-muted-foreground hover:shadow-lg">
                    <Ticket size={24} />
                    Add result
                  </Card>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {vouchers?.map((voucher) => (
                    <DropdownMenuItem onClick={() => setValue("targetId", voucher.id)}>
                      {voucher.id}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </Form>
      </div>
      <Button
        onClick={() => {
          console.log("value", getValues());
          createRecipeMutation.mutate({
            ...getValues(),
            eventId,
            targetType: RecipeTargetEnum.voucher,
          });
        }}
      >
        Save changes
      </Button>
    </div>
  );
}
