import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { bucketKeys, useGetFile, useUploadFile } from "@/hooks/react-query/useBucket";
import { userKeys, useUpdateUser } from "@/hooks/react-query/useUsers";
import useFiles from "@/hooks/zustand/useFiles";
import { User, UserAdmin } from "@/services/users";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
  role: z.enum(["admin"]),
  email: z.string().email(),
});
type FormInputs = z.infer<typeof formSchema>;

export default function AdminForm({ user }: { user: UserAdmin }) {
  const form = useForm<FormInputs>({
    defaultValues: {
      username: user.username,
      phone: user.phone,
      role: user.role,
      email: user.email,
    },
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const [avatarDialog, setAvatarDialog] = useState(false);
  const { files } = useFiles();
  const { data, isSuccess } = useGetFile(user.bucketId);
  const updateMutation = useUpdateUser(user.id);
  const changeAvatarMutation = useUploadFile();
  const queryClient = useQueryClient();

  const onSubmit = (data: FormInputs) => {
    const submitData = {
      ...data,
      id: user.id,
    };

    updateMutation.mutate(submitData, {
      onSuccess: (data: User) => {
        reset({
          username: data.username,
          phone: data.phone,
          email: data.email,
        });
      },
    });
  };

  const changeAvatar = () => {
    changeAvatarMutation.mutate(
      {
        id: user.bucketId ? user.bucketId : undefined,
        filename: files[0].name,
        file: files[0] as File,
      },
      {
        onSuccess: (result) => {
          if (!user.bucketId) {
            updateMutation.mutate(
              {
                id: user.id,
                bucketId: result.id,
              },
              {
                onSuccess: (data) => {
                  queryClient.setQueryData(userKeys.detail(user.id), data);
                },
              }
            );
          }
          setAvatarDialog(false);
          queryClient.refetchQueries({
            queryKey: bucketKeys.detail(result.id),
          });
        },
      }
    );
  };
  return (
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
                    <Input {...field} error={Boolean(errors.username)} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} error={Boolean(errors.role)} disabled />
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
                    <Input {...field} error={Boolean(errors.email)} />
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
                    <Input {...field} error={Boolean(errors.phone)} />
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
            {user.bucketId && isSuccess && data.url ? (
              <div className="relative h-48 w-48 overflow-hidden rounded-full">
                <img src={data.url} alt={user.username} className="size-full" />
              </div>
            ) : (
              <div className="grid h-[200px] w-[200px] place-items-center rounded-full bg-muted-foreground/20">
                <UserRound className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            <Dialog
              open={avatarDialog}
              onOpenChange={(open) => {
                setAvatarDialog(open);
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline">Change avatar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change avatar</DialogTitle>
                </DialogHeader>
                <DropAndDragZone maxFiles={1} />
                <DialogFooter className="flex flex-row justify-end gap-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={changeAvatar} disabled={files.length === 0}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="inline-flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            disabled={!isDirty || updateMutation.isPending}
            onClick={() => {
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-fit" disabled={!isDirty || updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
