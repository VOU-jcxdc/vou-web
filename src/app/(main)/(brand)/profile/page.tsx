import PaddingWrapper from "@/components/templates/padding-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/services";

import Form from "./form";

async function getUser({ userId }: { userId: string }): Promise<User> {
  const res = await fetch(
    `https://669beb23276e45187d36d75f.mockapi.io/api/users/${userId}`
  );
  const data = await res.json();
  return data;
}

export default async function ProfilePage() {
  const user = await getUser({ userId: "1" });
  return (
    <PaddingWrapper className="grid grid-cols-12 bg-muted h-fit min-h-screen">
      <Card className="mt-10 h-fit flex flex-col gap-4 col-start-3 col-end-11 md:col-start-1 md:col-end-13">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form user={user} />
        </CardContent>
      </Card>
    </PaddingWrapper>
  );
}
