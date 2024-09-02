import PaddingWrapper from "@/components/templates/padding-wrapper";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetGameDetail, useUpdateGameDetail } from "@/hooks/react-query/useGames";
import { Game } from "@/services/games";
import { createFileRoute } from "@tanstack/react-router";
import { Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/_admin/games/$gameId")({
  component: GameDetailPage,
});

const formSchema = z.object({
  exchangeStatus: z.boolean(),
  instruction: z.string(),
});
type FormInputs = z.infer<typeof formSchema>;

const GameForm = ({ game }: { game: Game }) => {
  const form = useForm<FormInputs>({
    defaultValues: {
      exchangeStatus: game.exchangeStatus,
      instruction: game.instruction,
    },
  });
  console.log(game);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const updateMutation = useUpdateGameDetail(game.id);
  const onSubmit = (data: FormInputs) => {
    updateMutation.mutate(data, {
      onSuccess: (data) => {
        reset(data);
      },
    });
  };

  return (
    <Form {...form}>
      <form className="mb-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="exchangeStatus"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Exchange status</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="inline-flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            disabled={!isDirty || updateMutation.isPending}
            onClick={() => {
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-fit" disabled={!isDirty || updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

function GameDetailPage() {
  const { gameId } = Route.useParams<{ gameId: string }>();
  const { data, isLoading, isError, isSuccess } = useGetGameDetail(gameId);
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex items-center justify-between">
          <h1 className="my-4 flex flex-col text-3xl font-semibold">
            {data ? data.name : "Game Information"}
          </h1>
        </div>
        <Separator orientation="horizontal" className="mb-8 w-full" />
        {isLoading && (
          <div className="grid min-h-[350px] place-items-center">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {isError && <div>Error</div>}
        {isSuccess && data ? <GameForm game={data} /> : null}
      </div>
    </PaddingWrapper>
  );
}
