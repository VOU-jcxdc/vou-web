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
import { useGetUser } from "@/hooks/react-query/useUsers";

import Form from "./form";

export default function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const { data, isLoading, isError, isSuccess } = useGetUser(userId);
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl my-4">
            User Detail
            <span className="text-sm font-normal text-muted-foreground ml-2">
              Id: #{userId}
            </span>
          </h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-destructive">
                Deactivate user
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you really sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are deactivating this user. After being deactivated, this
                  user cannot perform any action on your platform except log in
                  and log out.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
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
        {isSuccess && <Form user={data} />}
      </div>
    </PaddingWrapper>
  );
}
