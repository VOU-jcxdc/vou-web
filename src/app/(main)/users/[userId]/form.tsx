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

import { User } from "../_components/columns";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
});
export default function UserForm({ user }: { user: User }) {
  const form = useForm<User>({
    defaultValues: user,
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: User) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-4 w-full">
          <div className="flex flex-col gap-4 flex-1">
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
        <Button type="submit" className="w-fit" disabled>
          Save changes
        </Button>
      </form>
    </Form>
  );
}
