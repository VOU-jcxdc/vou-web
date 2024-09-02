import { createFileRoute } from "@tanstack/react-router";

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
import { useCreateEvent } from "@/hooks/react-query/useEvents";
import PaddingWrapper from "@/components/templates/padding-wrapper";

export const Route = createFileRoute("/_authenticated/_brand/events/create")({
  component: CreateEventPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").default(""),
  description: z.string().trim().min(1, "Description cannot be empty").default(""),
  beginDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (typeof val !== "string") return val.toISOString();
      return new Date(val).toISOString();
    }),
  endDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (typeof val !== "string") return val.toISOString();
      return new Date(val).toISOString();
    }),
  images: z.array(z.string()).default([]),
});

type FormInputs = z.infer<typeof formSchema>;

function CreateEventPage() {
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
    setValue,
    watch,
    formState: { errors },
  } = form;
  const images = watch("images");
  const [dialogOpen, setDialogOpen] = useState(false);
  const uploadFileMutation = useUploadFile();
  const createMutation = useCreateEvent();
  const queryClient = useQueryClient();

  const onSubmit = (data: FormInputs) => {
    createMutation.mutate({
      ...data,
      gameId: null,
      vouchers: [],
    });
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
        <h1 className="my-4 text-3xl font-semibold">New event</h1>

        <Form {...form}>
          <form className="mb-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid place-items-center gap-4">
              {images.length > 0 && (
                <Carousel className="max-h-[250px] w-full">
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
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-1 flex-col gap-4">
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
                        <Textarea {...field} placeholder="Enter event's description" />
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
              <Button type="submit" className="w-fit" disabled={createMutation.isPending}>
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PaddingWrapper>
  );
}
