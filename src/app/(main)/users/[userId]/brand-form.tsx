"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import omit from "lodash.omit";
import { Loader2 } from "lucide-react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  bucketKeys,
  useGetFile,
  useUploadFile,
} from "@/hooks/react-query/useBucket";
import { userKeys, useUpdateUser } from "@/hooks/react-query/useUsers";
import useFiles from "@/hooks/zustand/useFiles";
import { User, UserBrand } from "@/services/users";
import { BrandField } from "@/types/enums";

const brandSchema = z.object({
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

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
  role: z.enum(["brand"]),
  email: z.string().email(),
  info: brandSchema,
});
type FormInputs = z.infer<typeof formSchema>;

export default function UserForm({ user }: { user: UserBrand }) {
  const form = useForm<FormInputs>({
    defaultValues: {
      username: user.username,
      phone: user.phone,
      role: user.role,
      email: user.email,
      info: {
        ...user.info,
        location: {
          lat:
            user.info && "gps" in user.info ? user.info.gps.coordinates[1] : 0,
          lng:
            user.info && "gps" in user.info ? user.info.gps.coordinates[0] : 0,
        },
      },
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const [avatarDialog, setAvatarDialog] = useState(false);
  const { files } = useFiles();
  const { data, isSuccess } = useGetFile(user.bucketId);
  const updateMutation = useUpdateUser(user.id);
  const changeAvatarMutation = useUploadFile();
  const queryClient = useQueryClient();

  const onSubmit = (data: FormInputs) => {
    const submitData = {
      ...data,
      id: user.id,
      info: {
        ...omit(data.info, ["location"]),
        gps: {
          type: "Point",
          coordinates: [data.info.location.lng, data.info.location.lat],
        },
      },
    };

    updateMutation.mutate(submitData, {
      onSuccess: (data: User) => {
        if (data.role == "brand") {
          reset({
            username: data.username,
            phone: data.phone,
            email: data.email,
            info: {
              ...data.info,
              location: {
                lat: "gps" in data.info ? data.info.gps.coordinates[1] : 0,
                lng: "gps" in data.info ? data.info.gps.coordinates[0] : 0,
              },
            },
          });
        }
      },
    });
  };

  const changeAvatar = () => {
    changeAvatarMutation.mutate(
      {
        id: user.bucketId ? user.bucketId : undefined,
        filename: files[0].name,
        file: files[0] as File,
      },
      {
        onSuccess: (result) => {
          if (!user.bucketId) {
            updateMutation.mutate(
              {
                id: user.id,
                bucketId: result.id,
              },
              {
                onSuccess: (data) => {
                  queryClient.setQueryData(userKeys.detail(user.id), data);
                },
              }
            );
          }
          setAvatarDialog(false);
          queryClient.refetchQueries({
            queryKey: bucketKeys.detail(result.id),
          });
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 mb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full gap-10 md:flex-col-reverse md:items-center">
          <div className="flex flex-col gap-4 flex-1 md:w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(errors.username)}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} error={Boolean(errors.role)} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} error={Boolean(errors.email)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} error={Boolean(errors.phone)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:hidden">
            <Separator orientation="vertical" />
          </div>
          <div className="flex flex-col gap-4 items-center">
            {user.bucketId && isSuccess && data.url ? (
              <div className="rounded-full w-48 h-48 relative overflow-hidden">
                <Image fill src={data.url} alt={user.username} />
              </div>
            ) : (
              <div className="w-[200px] h-[200px] rounded-full bg-muted-foreground/20 grid place-items-center">
                <UserRound className="text-muted-foreground w-24 h-24" />
              </div>
            )}
            <Dialog
              open={avatarDialog}
              onOpenChange={(open) => {
                setAvatarDialog(open);
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline">Change avatar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change avatar</DialogTitle>
                </DialogHeader>
                <DropAndDragZone maxFiles={1} />
                <DialogFooter className="flex flex-row gap-4 justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button onClick={changeAvatar} disabled={files.length === 0}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <h1 className="font-semibold text-3xl mt-8 flex flex-col capitalize">
          {user.role} details
        </h1>
        <Separator orientation="horizontal" className="w-full " />
        <div className="flex flex-col gap-4 flex-1 md:w-full">
          <FormField
            control={form.control}
            name="info.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand's name</FormLabel>
                <FormControl>
                  <Input {...field} error={Boolean(errors.info?.name)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} error={Boolean(errors.info?.address)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.field"
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
              name="info.location.lat"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(errors.info?.location?.lat)}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.location.lng"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lng</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(errors.info?.location?.lng)}
                      disabled
                    />
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
