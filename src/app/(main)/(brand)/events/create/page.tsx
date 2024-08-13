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
import { useCreateEvent, useUpdateEvent } from "@/hooks/react-query/useEvents";
import { Event } from "@/services/events";
import PaddingWrapper from "@/components/templates/padding-wrapper";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").default(""),
  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .default(""),
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
  images: z.array(z.string()).default([]),
});

type FormInputs = z.infer<typeof formSchema>;

export default function CreateEventPage() {
  const form = useForm<FormInputs>({
    defaultValues: {
      name: "",
      description: "",
      beginDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      images: [],
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;
  const images = watch("images");
  const [dialogOpen, setDialogOpen] = useState(false);
  const uploadFileMutation = useUploadFile();
  const createMutation = useCreateEvent();
  const queryClient = useQueryClient();

  const onSubmit = (data: FormInputs) => {
    createMutation.mutate(data);
  };

  const onUpload = async (files: File[]) => {
    const newImageIds: string[] = [];
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await uploadFileMutation.mutateAsync({
          filename: file.name,
          file,
        });
        newImageIds.push(result.id);
        queryClient.refetchQueries({
          queryKey: bucketKeys.detail(result.id),
        });
      } catch (e) {
        console.error(e);
      }
    });

    await Promise.all(uploadPromises);
    setDialogOpen(false);
    setValue("images", newImageIds);
  };

  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <h1 className="font-semibold text-3xl my-4">New event</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4 mb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid place-items-center gap-4">
              {images.length > 0 && (
                <Carousel className="w-full max-h-[250px]">
                  <CarouselContent>
                    {images.map((bucketId) => (
                      <CarouselItem>
                        <EventImage bucketId={bucketId} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
              <ImagesDialog
                title={images.length > 0 ? "Change images" : "Add images"}
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
                        <Input
                          {...field}
                          placeholder="Enter event's name"
                          error={Boolean(errors.name)}
                        />
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
                        <Textarea
                          {...field}
                          placeholder="Enter event's description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="inline-flex gap-4">
              {/* <Button
                type="button"
                variant="outline"
                className="w-fit"
                disabled={!isDirty || createMutation.isPending}
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </Button> */}
              <Button
                type="submit"
                className="w-fit"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending && (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                )}
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PaddingWrapper>
  );
}
