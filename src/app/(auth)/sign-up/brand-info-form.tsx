"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useSignUp } from "@/hooks/react-query/useAuth";
import { BrandField } from "@/types/enums";

import useSignUpStepper from "./useSignUpStepper";

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Brand name is required" })
    .default(""),
  address: z
    .string()
    .trim()
    .min(1, { message: "Address is required" })
    .default(""),
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
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .default({ lat: 0, lng: 0 }),
});

export default function BrandInfoForm() {
  const { accountIdentifier, reset, setBrandInfo } = useSignUpStepper();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const signUpMutation = useSignUp();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setBrandInfo({
      ...data,
      location: {
        lat: data.location.lat.toString(),
        lng: data.location.lng.toString(),
      },
    });
    if (accountIdentifier) {
      const body = {
        ...accountIdentifier,
        data: {
          ...data,
          location: {
            lat: data.location.lat.toString(),
            lng: data.location.lng.toString(),
          },
        },
      };
      signUpMutation.mutate(body);
    }
  }

  useEffect(() => {
    if (!accountIdentifier) {
      reset();
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Brand information</CardTitle>
        <CardDescription className="text-center">
          Enter your brand information here, and click Register.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your brand's name"
                      error={Boolean(form.formState.errors.name)}
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      error={Boolean(form.formState.errors.address)}
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
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand field</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={(newValue) => {
                        form.setValue(field.name, newValue as BrandField, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <SelectTrigger className="capitalize">
                        {field.value ?? "Select a field"}
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
            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending && (
                <Loader2 className="animate-spin text-white w-5 h-5 mr-1" />
              )}
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
