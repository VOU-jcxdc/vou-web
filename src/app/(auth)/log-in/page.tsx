"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/react-query/useAuth";

const formSchema = z.object({
  phone: z.string(),
  password: z.string().min(1, "Password is required"),
});

type FormInputs = z.infer<typeof formSchema>;

export default function SignIn() {
  const form = useForm<FormInputs>({
    defaultValues: {
      phone: "0939074483",
      password: "12345678",
    },
    resolver: zodResolver(formSchema),
  });
  const signInMutation = useSignIn();

  function onSubmit(data: FormInputs) {
    signInMutation.mutate(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your account information here, and click Log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="+84 123 456 789"
                        error={Boolean(form.formState.errors.phone)}
                        {...field}
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
              <div className="w-full flex flex-row-reverse">
                <Link
                  href="/auth/forget-password"
                  className="text-sm text-foreground hover:text-primary/90"
                >
                  Forget Password
                </Link>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full bg-primary"
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending && (
                  <Loader2 className="animate-spin text-white w-5 h-5 mr-1" />
                )}
                Log in
              </Button>
              <p className="text-center text-sm text-foreground">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold hover:text-primary/90"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
          {/* <GoogleOAuthForm /> */}
        </div>
      </CardContent>
    </Card>
  );
}
