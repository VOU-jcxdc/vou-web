import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Minus, Plus, Equal, Ticket, PlusCircle, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { useGetShakeGameItems, useCreateShakeGameRecipe } from "@/hooks/react-query/useItems";
import { useGetVouchers } from "@/hooks/react-query/useVouchers";
import { RecipeTargetEnum } from "@/types/enums";
import { Button } from "@/components/ui/button";

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

export default function AddRecipeDialog() {
  const { eventId } = Route.useParams();
  const form = useForm<RecipeSchema>({
    resolver: zodResolver(recipeSchema),
  });
  const { control, setValue, getValues, register, watch, reset } = form;
  const { data: items, isLoading: isLoadingItems } = useGetShakeGameItems(eventId);
  const { data: vouchers, isLoading: isLoadingVouchers } = useGetVouchers(eventId);
  const { fields, append } = useFieldArray({ control, name: "itemRecipe" });
  const selectedVoucher = useMemo(() => {
    return vouchers ? vouchers.find((vou) => vou.eventVoucherId == watch("targetId")) : null;
  }, [watch("targetId")]);
  const createRecipeMutation = useCreateShakeGameRecipe(eventId);
  const [open, setOpen] = useState(false);
  if (isLoadingItems || isLoadingVouchers)
    return (
      <div className="grid min-h-[350px] place-items-center">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex min-h-36 w-full flex-col gap-2 text-muted-foreground hover:shadow-2xl"
        >
          <PlusCircle size={48} />
          Add new recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl content-center gap-10">
        <DialogHeader>
          <DialogTitle>Add new recipe</DialogTitle>
        </DialogHeader>
        <div className="grid place-items-center">
          <div className="min-w-2xl grid max-w-2xl flex-1 grid-cols-[6fr_48px_6fr_48px_6fr] place-items-center items-center justify-items-center gap-4">
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
                            {items?.find((item) => field.value == item.id)?.name ??
                              "Select an item"}
                          </SelectTrigger>
                          <SelectContent>
                            {items?.map(({ id, name }) => (
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
                  className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center text-muted-foreground hover:shadow-2xl"
                  onClick={() => append({ itemId: "", quantity: 1 })}
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
                      <Card className="grid h-full min-h-20 w-full cursor-pointer place-items-center content-center text-muted-foreground hover:shadow-2xl">
                        {selectedVoucher ? (
                          <>
                            <p className="text-black">{selectedVoucher.name}</p>
                            <p className="mt-2 text-sm italic">Code: {selectedVoucher.code}</p>
                          </>
                        ) : (
                          <>
                            <Ticket size={24} />
                            Add result
                          </>
                        )}
                      </Card>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {vouchers?.map((voucher) => (
                        <DropdownMenuItem
                          onClick={() => setValue("targetId", voucher.eventVoucherId)}
                        >
                          <div>
                            {voucher.name} &ensp;
                            <span className="italic">{voucher.code}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </Form>
          </div>
        </div>
        <DialogFooter className="flex w-full flex-row-reverse">
          <Button
            onClick={() => {
              createRecipeMutation.mutate(
                {
                  ...getValues(),
                  eventId,
                  targetType: RecipeTargetEnum.voucher,
                },
                {
                  onSuccess: () => {
                    setOpen(false);
                  },
                }
              );
            }}
            className="my-4"
            disabled={createRecipeMutation.isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
