"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DateRangePicker } from "@/components/Picker/RangeDate/DateRangePicker";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateEvent } from "@/hooks/react-query/useEvents";
import { Event } from "@/services/events";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  description: z.string().trim().min(1, "Description cannot be empty"),
  beginDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (typeof val !== "string") return val.toString();
      return val;
    }),
  endDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (typeof val !== "string") return val.toString();
      return val;
    }),
});

type FormInputs = z.infer<typeof formSchema>;

export default function EventForm({ event }: { event: Event }) {
  const form = useForm<FormInputs>({
    defaultValues: {
      name: event.name,
      description: event.description,
      beginDate: event.beginDate,
      endDate: event.endDate,
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = form;
  const updateMutation = useUpdateEvent(event.id);

  const onSubmit = (data: FormInputs) => {
    const newValue = {
      ...data,
      id: event.id,
    };
    updateMutation.mutate(newValue, {
      onSuccess: (data) => {
        reset(data);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid place-items-center gap-4">
          <Carousel className="w-full max-h-[250px]">
            <CarouselContent>
              {event.images?.map((image, index) => (
                <CarouselItem>
                  <Image
                    key={index}
                    className="rounded-md w-full max-h-[250px] object-cover"
                    src={`/assets/slides/School-${Math.floor(index / 4) + 1}.jpg`}
                    alt={`Image ${index}`}
                    width={200}
                    height={250}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button variant="outline">Change images</Button>
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
              name="beginDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeline</FormLabel>
                  <FormControl className="">
                    <DateRangePicker
                      showCompare={false}
                      initialDateFrom={new Date(field.value)}
                      initialDateTo={new Date(getValues("endDate"))}
                      onUpdate={(range) => {
                        field.onChange(range.from);
                        setValue("endDate", range.to?.toString() ?? "", {
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
          <Button
            type="submit"
            className="w-fit"
            disabled={!isDirty || updateMutation.isPending}
          >
            {updateMutation.isPending && (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            )}
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
