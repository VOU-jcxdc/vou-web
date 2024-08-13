"use client";
import PaddingWrapper from "@components/templates/padding-wrapper";
import { Loader } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetUser, useUpdateUser } from "@/hooks/react-query/useUsers";
import { Role, UserStatus } from "@/types/enums";

import AdminForm from "./admin-form";
import BrandForm from "./brand-form";

export default function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const { data, isLoading, isError, isSuccess } = useGetUser(userId);
  const updateStatusMutation = useUpdateUser(userId);

  const handleChangeStatus = () => {
    data &&
      updateStatusMutation.mutate({
        id: userId,
        status:
          data.status == UserStatus.ACTIVE
            ? UserStatus.INACTIVE
            : UserStatus.ACTIVE,
      });
  };

  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl my-4 flex flex-col">
            Account Information
            <span className="mt-4 text-xs font-normal text-muted-foreground whitespace-nowrap">
              Id: #{userId}
            </span>
          </h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                disabled={isLoading}
              >
                {isSuccess &&
                  (data.status == UserStatus.ACTIVE
                    ? "Deactivate user"
                    : "Activate user")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you really sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {isSuccess &&
                    (data.status == UserStatus.ACTIVE
                      ? "You are deactivating this user. After being deactivated, this user cannot perform any action on your platform except log in and log out."
                      : "You are activating this user. After being activated, this user can perform any action on your platform.")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleChangeStatus}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Separator orientation="horizontal" className="w-full mb-8" />
        {isLoading && (
          <div className="grid place-items-center min-h-[350px]">
            <Loader className="animate-spin text-primary w-10 h-10" />
          </div>
        )}
        {isError && <div>Error</div>}
        {isSuccess ? (
          data.role == Role.ADMIN ? (
            <AdminForm user={data} />
          ) : (
            data.role == Role.BRAND && <BrandForm user={data} />
          )
        ) : null}
      </div>
    </PaddingWrapper>
  );
}
