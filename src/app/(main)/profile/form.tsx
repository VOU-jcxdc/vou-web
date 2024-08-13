"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, UserRound } from "lucide-react";
import Image from "next/image";
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
import {
  bucketKeys,
  useGetFile,
  useUploadFile,
} from "@/hooks/react-query/useBucket";
import { userKeys, useUpdateUserProfile } from "@/hooks/react-query/useUsers";
import useFiles from "@/hooks/zustand/useFiles";
import { User } from "@/services";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username cannot be empty"),
  phone: z.string().trim().min(1, "Phone cannot be empty"),
  email: z.string().email(),
});

export default function ProfileForm({ user }: { user: User }) {
  const form = useForm<User>({
    defaultValues: {
      ...user,
    },
    resolver: zodResolver(formSchema),
  });
  const [avatarDialog, setAvatarDialog] = useState(false);
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  const { files } = useFiles();
  const { data, isSuccess } = useGetFile(user.bucketId);
  const changeAvatarMutation = useUploadFile();
  const updateProfileMutation = useUpdateUserProfile();
  const queryClient = useQueryClient();

  const onSubmit = (data: User) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (returnData) => {
        reset(returnData);
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
            updateProfileMutation.mutate(
              { id: user.id, bucketId: result.id },
              {
                onSuccess: (returnData) => {
                  queryClient.setQueryData(userKeys.profile(), returnData);
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 w-full md:flex-col-reverse md:items-center">
          <div className="flex flex-col gap-4 flex-1 md:w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(errors.username)}
                      disabled
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
                    <Input {...field} error={Boolean(errors.phone)} disabled />
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
          </div>
          <div className="md:hidden">
            <Separator orientation="vertical" />
          </div>
          <div className="flex flex-col gap-4 items-center">
            {user.bucketId && isSuccess && data.url ? (
              <div className="rounded-full w-48 h-48 relative overflow-hidden">
                <Image fill src={data.url} alt={user.username} />
              </div>
            ) : (
              <div className="w-[200px] h-[200px] rounded-full bg-muted-foreground/20 grid place-items-center">
                <UserRound className="text-muted-foreground w-24 h-24" />
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
                <DialogFooter className="flex flex-row gap-4 justify-end">
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
        <Button
          type="submit"
          className="w-fit"
          disabled={!isDirty || updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending && (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          )}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
