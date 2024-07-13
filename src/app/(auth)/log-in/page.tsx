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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { signInWithEmailAndPassword } from "@/app/(auth)/_actions/signIn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import GoogleOAuthForm from "../OAuth/GoogleOAuth";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export default function SignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await signInWithEmailAndPassword(data);
    const resultJson = JSON.parse(result);

    if (resultJson?.data?.session) {
      toast.success("Log in successfully.");
      router.push("/");
    } else if (resultJson?.error?.message) {
      toast.error(resultJson.error.message);
    } else {
      router.push("/");
    }
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        error={Boolean(form.formState.errors.email)}
                        {...field}
                        type="email"
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
                        placeholder="password"
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
              >
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
