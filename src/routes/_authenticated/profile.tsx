import { createFileRoute } from "@tanstack/react-router";

import { Loader } from "lucide-react";

import PaddingWrapper from "@/components/templates/padding-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserProfile } from "@/hooks/react-query/useUsers";

import BrandForm from "@components/organisms/profile-brand-form";
import Form from "@components/organisms/profile-form";
import Header from "@/components/organisms/header";
import Footer from "@/components/molecules/footer";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { isLoading, isSuccess, isError, data } = useGetUserProfile();
  return (
    <>
      <Header />
      <PaddingWrapper className="grid h-fit min-h-screen grid-cols-12 gap-10 bg-muted py-10">
        <Card className="col-start-3 col-end-11 flex h-fit flex-col gap-4 md:col-start-1 md:col-end-13">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="grid min-h-[350px] place-items-center">
                <Loader className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            {isError && <div>Error</div>}
            {isSuccess && <Form user={data} />}
          </CardContent>
        </Card>
        {isSuccess && data.role == "brand" && (
          <Card className="col-start-3 col-end-11 flex h-fit flex-col gap-4 md:col-start-1 md:col-end-13">
            <CardHeader>
              <CardTitle>Brand information</CardTitle>
            </CardHeader>
            <CardContent>
              <BrandForm user={data} />
            </CardContent>
          </Card>
        )}
      </PaddingWrapper>
      <Footer />
    </>
  );
}
