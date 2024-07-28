"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OTPPage() {
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
          A 6-digit verification code has been sent to your phone number. Please
          enter the code below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-12 grid place-items-center"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="w-14 h-14 text-xl font-medium"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-14 h-14 text-xl font-medium"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-14 h-14 text-xl font-medium"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-14 h-14 text-xl font-medium"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-14 h-14 text-xl font-medium"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-14 h-14 text-xl font-medium"
                        />
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
