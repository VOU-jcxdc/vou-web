import PaddingWrapper from "@/components/templates/padding-wrapper";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { UserRound } from "lucide-react";
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
import { useCreateAdmin } from "@/hooks/react-query/useUsers";
import { Role } from "@/types/enums";

export const Route = createFileRoute("/_authenticated/_admin/users/create")({
  component: CreateAdminPage,
});

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormInputs = z.infer<typeof formSchema>;

function CreateAdminPage() {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = form;
  const createMutation = useCreateAdmin();

  const onSubmit = (data: FormInputs) => {
    createMutation.mutate({ ...data, role: Role.ADMIN });
  };

  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <h1 className="my-4 text-3xl font-semibold">Create admin account</h1>
        <Separator orientation="horizontal" className="mb-8 w-full" />
        <Form {...form}>
          <form className="mb-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full gap-10 md:flex-col-reverse md:items-center">
              <div className="flex flex-1 flex-col gap-4 md:w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} error={Boolean(errors.username)} placeholder="ngantruc" />
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
                        <Input
                          {...field}
                          error={Boolean(errors.email)}
                          placeholder="example@gmail.com"
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
                        <Input
                          {...field}
                          error={Boolean(errors.phone)}
                          placeholder="0123 456 789"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          error={Boolean(form.formState.errors.password)}
                          {...field}
                          type="password"
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:hidden">
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="grid h-[200px] w-[200px] place-items-center rounded-full bg-muted-foreground/20">
                  <UserRound className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="inline-flex gap-4">
              <Button
                type="submit"
                className="w-fit"
                disabled={!isDirty || createMutation.isPending}
              >
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PaddingWrapper>
  );
}
