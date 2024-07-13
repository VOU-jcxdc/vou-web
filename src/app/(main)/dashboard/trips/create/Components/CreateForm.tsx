"use client";

import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddressSelects from "@/hooks/zustand/useAddressSelects";

const FormSchema = z.object({
  customerName: z.string().min(2, "Name is compulsory."),
  customerPhone: z
    .string()
    .min(6)
    .max(12)
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Enter a valid phone number.",
    }),
  customerProvince: z.string().min(2, "Province is compulsory."),
  customerDistrict: z.string().min(2, "District is compulsory."),
  customerWard: z.string().min(2, "Ward is compulsory."),
  customerAddress: z.string().min(2, "Address is compulsory."),
  customerNote: z.string().nullable(),
});

export default function CreateForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerProvince: "",
      customerDistrict: "",
      customerWard: "",
      customerAddress: "",
      customerNote: "",
    },
  });

  const { addressValues, clearAll } = useAddressSelects();
  useEffect(() => {
    if (addressValues) {
      form.setValue("customerProvince", addressValues.province);
      form.setValue("customerDistrict", addressValues.district);
      form.setValue("customerWard", addressValues.commune);
    }
    form.trigger("customerWard");
  }, [addressValues]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // if (resultJson?.data?.session) {
    //   toast.success("Log in successfully.");
    //   router.push("/");
    // } else if (resultJson?.error?.message) {
    //   toast.error(resultJson.error.message);
    // } else {
    //   router.push("/");
    // }
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
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
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number"
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
            name="customerDistrict"
            render={() => (
              <FormItem>
                <FormLabel>Pick address</FormLabel>
                <FormControl>
                  <FormAddressPicker />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-44 min-h-28 border-[#E5E7EB]"
                    placeholder="Note for the trip..."
                    {...field}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="w-full bg-foreground text-background"
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
