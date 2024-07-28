"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { signUpWithEmailAndPassword } from "@/app/(auth)/_actions/signUp";
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

const FormSchema = z
  .object({
    username: z.string().trim().min(1, { message: "Username is required" }),
    phone: z.string().trim().min(1, "Phone is required"),
    password: z.string().trim().min(6, "Password is required"),
    confirm: z.string().trim().min(6, "Confirm password is required"),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function SignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const result = await signUpWithEmailAndPassword(data);
    // const resultJson = JSON.parse(result);

    // if (resultJson?.error?.message) {
    //   toast.error(resultJson.error.message);
    // } else {
    //   toast.success("Successfully. Check your email verification.");
    //   router.push("/");
    // }
    router.push("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Hello new friend</CardTitle>
        <CardDescription className="text-center">
          Enter your account information here, and click Register.
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
              Register
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
