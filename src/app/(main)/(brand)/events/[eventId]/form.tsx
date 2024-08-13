"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EventImage } from "@/components/molecules/event-image";
import ImagesDialog from "@/components/molecules/images-dialog";
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
import { bucketKeys, useUploadFile } from "@/hooks/react-query/useBucket";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateMutation = useUpdateEvent(event.id);
  const uploadFileMutation = useUploadFile();
  const updateEventMutation = useUpdateEvent(event.id);
  const queryClient = useQueryClient();

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

  const onUpload = async (files: File[]) => {
    const newImageIds = event.images ?? [];
    const uploadPromises = files.map(async (file, index) => {
      try {
        const result = await uploadFileMutation.mutateAsync({
          id:
            event.images && index < event.images.length
              ? event.images[index]
              : undefined,
          filename: file.name,
          file,
        });
        if (event.images && index >= event.images.length) {
          newImageIds.push(result.id);
        } else {
          queryClient.refetchQueries({
            queryKey: bucketKeys.detail(result.id),
          });
        }
      } catch (e) {
        console.error(e);
      }
    });

    await Promise.all(uploadPromises);
    updateEventMutation.mutate(
      {
        id: event.id,
        images: newImageIds,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid place-items-center gap-4">
          {event.images && event.images.length > 0 && (
            <Carousel className="w-full max-h-[250px]">
              <CarouselContent>
                {event.images.map((_, index) => (
                  <CarouselItem>
                    <EventImage bucketId={event.images[index]} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <ImagesDialog
            title={
              event.images && event.images.length
                ? "Change images"
                : "Add images"
            }
            onUpload={onUpload}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
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
