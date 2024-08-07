"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Role } from "@/types/enums";

import useSignUpStepper from "./useSignUpStepper";

const FormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "Username is required" })
      .default(""),
    phone: z.string().trim().min(1, "Phone is required").default(""),
    password: z.string().trim().min(6, "Password is required").default(""),
    email: z.string().email("Invalid email format").default(""),
    confirm: z
      .string()
      .trim()
      .min(6, "Confirm password is required")
      .default(""),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function AccountIdentifierForm() {
  const { setStep, setAccountIdentifier } = useSignUpStepper();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setAccountIdentifier({
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: Role.BRAND,
    });
    setStep(1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Hello new friend</CardTitle>
        <CardDescription className="text-center">
          Enter your account information here, and click Next.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-fit gap-4 w-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+84 123 456 789"
                      error={Boolean(form.formState.errors.phone)}
                      {...field}
                      type="text"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      error={Boolean(form.formState.errors.username)}
                      {...field}
                      type="text"
                      onChange={field.onChange}
                    />
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
                      placeholder="Email"
                      error={Boolean(form.formState.errors.email)}
                      {...field}
                      type="text"
                      onChange={field.onChange}
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
                      {...field}
                      error={Boolean(form.formState.errors.password)}
                      type="password"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      error={Boolean(form.formState.errors.confirm)}
                      type="password"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Next
            </Button>
            <p className="text-center text-sm text-foreground">
              Already have an account?{" "}
              <Link
                href="/log-in"
                className="font-semibold hover:text-primary/90"
              >
                Log in
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
