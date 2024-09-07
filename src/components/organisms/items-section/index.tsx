import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFile, useUploadFile } from "@/hooks/react-query/useBucket";
import {
  useCreateShakeGameItems,
  useDeleteShakeGameItem,
  useGetShakeGameItems,
  useUpdateShakeGameItem,
} from "@/hooks/react-query/useItems";
import useFiles from "@/hooks/zustand/useFiles";
import { Route } from "@/routes/_authenticated/_brand/events/$eventId/_$eventId/game";
import { ShakeGameItem, UpdateItemParams } from "@/services/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader, Minus, Plus, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Item name can not be empty"),
  imageId: z.string(),
  type: z.string().default("crafting_material"),
  quantity: z.number().positive().default(1),
});

type FormInputs = z.infer<typeof itemSchema>;

type ItemDialogContentProps = {
  item?: ShakeGameItem;
  onSubmit: (value: FormInputs) => void;
  onDelete?: () => void;
};

function ItemImage({ bucketId }: { bucketId: string }) {
  const { data, isSuccess, isLoading, isError } = useGetFile(bucketId);
  if (isLoading) return <Skeleton className="size-[5rem] rounded-full" />;
  if (isError) return <CircleAlert className="h-8 w-8 text-muted-foreground" />;
  if (isSuccess && data.url)
    return (
      <img
        src={data.url}
        alt={`Image ${bucketId}`}
        className="size-[5rem] rounded-full object-cover"
      />
    );
  return null;
}

function ItemDialogContent({ item, onSubmit, onDelete }: ItemDialogContentProps) {
  const { files, clearFiles } = useFiles();
  const uploadFileMutation = useUploadFile();
  useEffect(() => {
    return () => {
      reset(item);
      clearFiles();
    };
  }, []);
  const form = useForm<FormInputs>({
    defaultValues: item
      ? {
          ...item,
        }
      : {},
    resolver: zodResolver(itemSchema),
  });
  const {
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = form;
  useEffect(() => {
    if (files.length == 0) return;
    uploadFileMutation.mutate(
      {
        filename: files[0].name,
        file: files[0],
      },
      {
        onSuccess: ({ id }) => {
          setValue("imageId", id);
        },
      }
    );
  }, [files]);
  return (
    <Form {...form}>
      <DialogTitle>
        <DialogHeader>Item details</DialogHeader>
      </DialogTitle>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {item?.imageId ? (
          <div className="grid w-full place-items-center">
            <ItemImage bucketId={item.imageId} />
          </div>
        ) : (
          !uploadFileMutation.isPending && <DropAndDragZone maxFiles={1} />
        )}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item name:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Bảo bối thần kỳ của Doraemon"
                  error={Boolean(errors.name)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="quantity"
          render={() => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="mr-4">Quantity</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setValue("quantity", getValues("quantity") - 1, { shouldValidate: true });
                  }}
                >
                  <Minus size={16} />
                </Button>
                <FormControl>
                  <Input
                    {...register("quantity", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="1"
                    className="w-[8rem] text-center"
                    error={Boolean(errors.quantity)}
                    defaultValue={1}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setValue("quantity", getValues("quantity") + 1, { shouldValidate: true });
                  }}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {item && (
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-destructive"
                onClick={() => {
                  onDelete && onDelete();
                }}
              >
                Delete
              </Button>
            </DialogClose>
          )}
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default function ItemsSection() {
  const { eventId } = Route.useParams();
  const [itemDialog, setItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShakeGameItem>();
  const [newItems, setNewItems] = useState<FormInputs[]>([]);
  const createItemsMutation = useCreateShakeGameItems(eventId);
  const updateItemMutation = useUpdateShakeGameItem(eventId);
  const deleteItemMutation = useDeleteShakeGameItem(eventId);
  const { data, isLoading, isSuccess, isError } = useGetShakeGameItems(eventId);
  const createItems = () => {
    createItemsMutation.mutate(newItems, {
      onSuccess: () => {
        setNewItems([]);
      },
    });
  };
  return (
    <div>
      <Separator orientation="horizontal" className="my-5" />
      <h6 className="text-xl font-semibold">Items</h6>
      <div className="mt-2  grid grid-cols-4 gap-4">
        {isError && <div>Error</div>}
        {isLoading && (
          <div className="grid min-h-[350px] place-items-center">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        <Dialog
          open={itemDialog}
          onOpenChange={(open) => {
            setItemDialog(open);
            if (!open) setSelectedItem(undefined);
          }}
        >
          <DialogTrigger asChild>
            <Card className="relative grid cursor-pointer place-items-center content-center gap-4 overflow-hidden text-muted-foreground hover:shadow-lg">
              <PlusCircle size={48} />
              <p>Add new item</p>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <ItemDialogContent
              item={selectedItem}
              onSubmit={(value) => {
                if (value.id) {
                  updateItemMutation.mutate(value as UpdateItemParams);
                } else setNewItems((prev) => [...prev, value]);
                setItemDialog(false);
              }}
              onDelete={
                selectedItem
                  ? selectedItem.id
                    ? () => deleteItemMutation.mutate(selectedItem.id)
                    : () =>
                        setNewItems((items) =>
                          items.filter((item) => (item as ShakeGameItem) !== selectedItem)
                        )
                  : () => {}
              }
            />
          </DialogContent>
          {isSuccess &&
            data.map((item, index) => (
              <DialogTrigger asChild>
                <Card
                  className="relative cursor-pointer overflow-hidden hover:shadow-lg"
                  key={`Item ${index}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="absolute right-0 top-0 bg-slate-600 px-2 py-1 text-xs text-white">
                    x{item.quantity}
                  </div>
                  <CardHeader className="flex flex-col items-center gap-2 p-4">
                    <ItemImage bucketId={item.imageId} />
                    <CardTitle className="text-center text-base">{item.name}</CardTitle>
                  </CardHeader>
                </Card>
              </DialogTrigger>
            ))}
          {newItems.map((item, index) => (
            <DialogTrigger asChild>
              <Card
                className="relative cursor-pointer overflow-hidden hover:shadow-lg"
                key={`New item ${index}`}
                onClick={() => setSelectedItem(item as ShakeGameItem)}
              >
                <div className="absolute right-0 top-0 bg-slate-600 px-2 py-1 text-xs text-white">
                  x{item.quantity}
                </div>
                <CardHeader>
                  <ItemImage bucketId={item.imageId} />
                  <CardTitle className="text-center text-base">{item.name}</CardTitle>
                </CardHeader>
              </Card>
            </DialogTrigger>
          ))}
        </Dialog>
      </div>
      <Button className="mt-4" onClick={createItems}>
        Save changes
      </Button>
    </div>
  );
}
