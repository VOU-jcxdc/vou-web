"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Voucher } from "@/services/vouchers";
import { VoucherType, VoucherTypeEnum } from "@/types/enums";

type VoucherFormProps = {
  editMode?: boolean;
  voucher?: Voucher;
  onSubmit: (data: Voucher) => void;
  onDelete?: (data: Voucher) => void;
};

const voucherSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  value: z.number().positive("Value must be positive"),
  code: z.string().trim().min(1, "Code is required"),
  duration: z.number().positive("Duration must be positive"),
  quantity: z.number().positive("Quantity must be positive"),
  usageMode: z.enum(["online", "offline"]).default("online"),
  type: z.nativeEnum(VoucherTypeEnum).default(VoucherTypeEnum.amount),
});

export default function VoucherForm({
  editMode = true,
  voucher,
  onSubmit,
  onDelete,
}: VoucherFormProps) {
  const form = useForm<Voucher>({
    defaultValues: voucher,
    resolver: zodResolver(voucherSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  return (
    <>
      <DialogHeader>
        <DialogTitle>{editMode ? "Edit" : "Create"} voucher</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ScrollArea>
            <div className="h-80 flex flex-col gap-4 mb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Voucher name"
                        error={Boolean(errors.name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter voucher's description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={() => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <div className="flex gap-4">
                      <FormControl>
                        <Input
                          {...form.register("value", {
                            valueAsNumber: true,
                          })}
                          placeholder="Voucher value"
                          type="number"
                          error={Boolean(errors.name)}
                          className="w-full"
                        />
                      </FormControl>
                      <FormControl>
                        <Select
                          {...form.register("type")}
                          onValueChange={(value) => {
                            form.setValue("type", value as VoucherType);
                          }}
                          defaultValue="amount"
                        >
                          <SelectTrigger className="capitalize w-40">
                            {form.watch("type") == VoucherTypeEnum.rate
                              ? "%"
                              : "VND"}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={VoucherTypeEnum.amount}
                              className="capitalize"
                            >
                              VND
                            </SelectItem>
                            <SelectItem
                              value={VoucherTypeEnum.rate}
                              className="capitalize"
                            >
                              %
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter an unique code"
                        error={Boolean(errors.code)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={() => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 items-center">
                        <Input
                          {...form.register("duration", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          placeholder="Enter a duration time"
                          error={Boolean(errors.duration)}
                        />
                        <p>days</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={() => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel className="mr-4">Quantity</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          form.setValue(
                            "quantity",
                            form.getValues("quantity") - 1
                          );
                        }}
                      >
                        <Minus size={16} />
                      </Button>
                      <FormControl>
                        <Input
                          {...form.register("quantity", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          placeholder="1"
                          className="w-20 text-center"
                          error={Boolean(errors.quantity)}
                          defaultValue={1}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          form.setValue(
                            "quantity",
                            form.getValues("quantity") - 1
                          );
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usageMode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel className="mr-4">Usage mode</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? "online"}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="online" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Online
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="offline" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Offline
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <div className="flex gap-4">
            {editMode && (
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => onDelete && voucher && onDelete(voucher)}
                >
                  Delete
                </Button>
              </DialogClose>
            )}
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
