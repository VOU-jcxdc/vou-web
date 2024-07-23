"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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

import { Game } from "../_components/columns";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  exchangeStatus: z.boolean().catch(true),
  instruction: z.string().trim().min(1, "Instruction cannot be empty"),
});

export default function GameForm({ game }: { game: Game }) {
  const form = useForm<Game>({
    defaultValues: game,
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: Game) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid place-items-center gap-4">
          <Image
            className="rounded-md w-full max-h-[250px] object-cover"
            src={game.image}
            alt={game.name}
            width={200}
            height={250}
          />
          <Button variant="outline">Change image</Button>
        </div>
        <div className="flex items-start gap-4 w-full">
          <div className="flex flex-col gap-4 flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} error={Boolean(errors.name)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exchangeStatus"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel>Exchange status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instruction</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-fit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
