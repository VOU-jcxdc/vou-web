"use client";
import { Loader } from "lucide-react";

import PaddingWrapper from "@/components/templates/padding-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserProfile } from "@/hooks/react-query/useUsers";

import BrandForm from "./brand-form";
import Form from "./form";

export default function ProfilePage() {
  const { isLoading, isSuccess, isError, data } = useGetUserProfile();
  return (
    <PaddingWrapper className="grid grid-cols-12 bg-muted h-fit min-h-screen py-10 gap-10">
      <Card className="h-fit flex flex-col gap-4 col-start-3 col-end-11 md:col-start-1 md:col-end-13">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="grid place-items-center min-h-[350px]">
              <Loader className="animate-spin text-primary w-10 h-10" />
            </div>
          )}
          {isError && <div>Error</div>}
          {isSuccess && <Form user={data} />}
        </CardContent>
      </Card>
      {isSuccess && data.role == "brand" && (
        <Card className="h-fit flex flex-col gap-4 col-start-3 col-end-11 md:col-start-1 md:col-end-13">
          <CardHeader>
            <CardTitle>Brand information</CardTitle>
          </CardHeader>
          <CardContent>
            <BrandForm user={data} />
          </CardContent>
        </Card>
      )}
    </PaddingWrapper>
  );
}
