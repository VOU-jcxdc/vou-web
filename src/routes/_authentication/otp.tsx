import { createFileRoute } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/_authentication/otp")({
  component: OTPPage,
});

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function OTPPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    console.log(data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Verify your OTP</CardTitle>
        <CardDescription className="text-center">
          A 6-digit verification code has been sent to your phone number. Please enter the code
          below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid place-items-center space-y-12"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-14 w-14 text-xl font-medium" />
                        <InputOTPSlot index={1} className="h-14 w-14 text-xl font-medium" />
                        <InputOTPSlot index={2} className="h-14 w-14 text-xl font-medium" />
                        <InputOTPSlot index={3} className="h-14 w-14 text-xl font-medium" />
                        <InputOTPSlot index={4} className="h-14 w-14 text-xl font-medium" />
                        <InputOTPSlot index={5} className="h-14 w-14 text-xl font-medium" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
