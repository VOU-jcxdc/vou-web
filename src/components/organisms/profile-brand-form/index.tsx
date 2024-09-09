import { zodResolver } from "@hookform/resolvers/zod";
import omit from "lodash.omit";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Map, APIProvider, Marker } from "@vis.gl/react-google-maps";

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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useUpdateUserProfile } from "@/hooks/react-query/useUsers";
import { User, UserBrand } from "@/services";
import { BrandField } from "@/types/enums";
import PlaceAutocomplete from "@/components/molecules/place-autocomplete";

const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || "";
const GG_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY || "";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Brand name is required" }).default(""),
  address: z.string().trim().min(1, { message: "Address is required" }).default(""),
  field: z.nativeEnum(BrandField),
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
        lat: user.info && "gps" in user.info ? user.info.gps.coordinates[0] : 0,
        lng: user.info && "gps" in user.info ? user.info.gps.coordinates[1] : 0,
      },
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = form;
  const position = watch("location");
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
                      <SelectItem key={value} value={value} className="capitalize">
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
        <FormLabel>Address</FormLabel>
        <APIProvider apiKey={GG_MAP_API_KEY}>
          <PlaceAutocomplete
            inputProps={{
              defaultValue: user.info.address,
            }}
            onPlaceSelect={(value: google.maps.places.PlaceResult) => {
              setValue("location.lat", value.geometry?.location?.lat() ?? 0, { shouldDirty: true });
              setValue("location.lng", value.geometry?.location?.lng() ?? 0, { shouldDirty: true });
              setValue("address", value.formatted_address ?? "", { shouldDirty: true });
            }}
          />
          <Map
            className="h-40 w-full"
            defaultCenter={position}
            defaultZoom={15}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            id={GOOGLE_MAP_ID}
          >
            <Marker position={position} />
          </Map>
        </APIProvider>
        <Button
          type="submit"
          className="w-fit"
          disabled={!isDirty || updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
