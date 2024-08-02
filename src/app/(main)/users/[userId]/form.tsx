"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useUpdateUser } from "@/hooks/react-query/useUsers";
import { User } from "@/services/users";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
  role: z.string(),
  email: z.string().email(),
});

type FormInputs = z.infer<typeof formSchema>;

export default function UserForm({ user }: { user: User }) {
  const form = useForm<FormInputs>({
    defaultValues: {
      username: user.username,
      phone: user.phone,
      role: user.role,
      email: user.email,
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const updateMutation = useUpdateUser(user.id);

  const onSubmit = (data: FormInputs) => {
    const newValue = {
      ...data,
      id: user.id,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };
    updateMutation.mutate(newValue, {
      onSuccess: (data) => {
        reset(data);
      },
    });
  };
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
