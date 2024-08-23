import { createFileRoute } from "@tanstack/react-router";

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

import AdminForm from "@components/organisms/update-admin-form";
import BrandForm from "@components/organisms/update-brand-form";
import PlayerForm from "@components/organisms/player-detail-form";

export const Route = createFileRoute("/_authenticated/_admin/users/$userId")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams<{ userId: string }>();
  const { data, isLoading, isError, isSuccess } = useGetUser(userId);
  const updateStatusMutation = useUpdateUser(userId);

  const handleChangeStatus = () => {
    data &&
      updateStatusMutation.mutate({
        id: userId,
        status: data.status == UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE,
      });
  };

  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex items-center justify-between">
          <h1 className="my-4 flex flex-col text-3xl font-semibold">
            Account Information
            <span className="mt-4 whitespace-nowrap text-xs font-normal text-muted-foreground">
              Id: #{userId}
            </span>
          </h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-destructive" disabled={isLoading}>
                {isSuccess &&
                  (data.status == UserStatus.ACTIVE ? "Deactivate user" : "Activate user")}
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
                <AlertDialogAction onClick={handleChangeStatus}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Separator orientation="horizontal" className="mb-8 w-full" />
        {isLoading && (
          <div className="grid min-h-[350px] place-items-center">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {isError && <div>Error</div>}
        {isSuccess ? (
          data.role == Role.ADMIN ? (
            <AdminForm user={data} />
          ) : data.role == Role.BRAND ? (
            <BrandForm user={data} />
          ) : (
            data.role == Role.PLAYER && <PlayerForm user={data} />
          )
        ) : null}
      </div>
    </PaddingWrapper>
  );
}
