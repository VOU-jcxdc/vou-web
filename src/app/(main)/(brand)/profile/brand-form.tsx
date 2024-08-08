"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import omit from "lodash.omit";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useUpdateUserProfile } from "@/hooks/react-query/useUsers";
import { User, UserBrand } from "@/services";
import { BrandField } from "@/types/enums";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Brand name is required" })
    .default(""),
  address: z
    .string()
    .trim()
    .min(1, { message: "Address is required" })
    .default(""),
  field: z.enum([
    BrandField.CAFE,
    BrandField.FASHION,
    BrandField.FnB,
    BrandField.GAMES,
    BrandField.HEALTH,
    BrandField.LIFESTYLE,
    BrandField.SPORTS,
    BrandField.TECHNOLOGY,
    BrandField.TRAVEL,
  ]),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .default({ lat: 0, lng: 0 }),
});

type FormInputs = z.infer<typeof formSchema>;
export default function BrandForm({ user }: { user: UserBrand }) {
  const form = useForm<FormInputs>({
    defaultValues: {
      ...user.info,
      location: {
        lat: user.info && "gps" in user.info ? user.info.gps.coordinates[1] : 0,
        lng: user.info && "gps" in user.info ? user.info.gps.coordinates[0] : 0,
      },
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const updateProfileMutation = useUpdateUserProfile();
  const onSubmit = (data: FormInputs) => {
    updateProfileMutation.mutate(
      {
        info: {
          ...omit(data, ["location"]),
          gps: {
            type: "Point",
            coordinates: [data.location.lat, data.location.lng],
          },
        },
      },
      {
        onSuccess: (data: User) => {
          if (data.role == "brand") {
            reset({
              ...data.info,
              location: {
                lat: "gps" in data.info ? data.info.gps.coordinates[1] : 0,
                lng: "gps" in data.info ? data.info.gps.coordinates[0] : 0,
              },
            });
          }
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand's name</FormLabel>
              <FormControl>
                <Input {...field} error={Boolean(errors.name)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} error={Boolean(errors.address)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand field</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={(newValue) => {
                    form.setValue(field.name, newValue as BrandField, {
                      shouldDirty: true,
                    });
                  }}
                >
                  <SelectTrigger className="capitalize">
                    {field.value ?? "Select a field"}
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(BrandField).map((value) => (
                      <SelectItem
                        key={value}
                        value={value}
                        className="capitalize"
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="location.lat"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lat</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    error={Boolean(errors.location?.lat)}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.lng"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lng</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    error={Boolean(errors.location?.lng)}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-fit"
          disabled={!isDirty || updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending && (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          )}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
