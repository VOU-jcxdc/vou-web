"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User } from "@/services";
import { BrandField } from "@/types/enums";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
});

const brandSchema = z.object({
  name: z.string().trim().min(1, "Brand name cannot be empty"),
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
  address: z.string().trim().min(1, "Address cannot be empty"),
});

type Brand = z.infer<typeof brandSchema> & User;

export default function ProfileForm({ user }: { user: User }) {
  const form = useForm<Brand>({
    defaultValues: {
      ...user,
      field: BrandField.CAFE,
      address: "",
      name: "",
    },
    resolver: zodResolver(formSchema.merge(brandSchema)),
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const onSubmit = (data: User) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 w-full md:flex-col-reverse md:items-center">
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      error={Boolean(errors.name)}
                    />
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
                      onValueChange={(newValue) => {
                        setValue(field.name, newValue as BrandField, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a field">
                          {field.value}
                        </SelectValue>
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
          </div>
          <div className="md:hidden">
            <Separator orientation="vertical" />
          </div>
          <div className="relative">
            <Image
              className="rounded-full"
              src={user.avatar}
              alt={user.username}
              width={200}
              height={200}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-fit"
          disabled={!isDirty}
          onClick={() => {
            console.log(isDirty);
          }}
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
}
