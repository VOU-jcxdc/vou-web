import PaddingWrapper from "@components/templates/padding-wrapper";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { User } from "../_components/columns";
import Form from "./form";

async function getUser({ userId }: { userId: string }): Promise<User> {
  const res = await fetch(
    `https://669beb23276e45187d36d75f.mockapi.io/api/users/${userId}`
  );
  const data = await res.json();
  return data;
}

export default async function page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const data = await getUser({ userId });
  return (
    <PaddingWrapper className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10 lg:col-span-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl my-4">User Detail</h1>
          <Button size="sm" variant="outline" className="text-destructive">
            Deactivate user
          </Button>
        </div>
        <Separator orientation="horizontal" className="w-full mb-8" />
        <Form user={data} />
      </div>
    </PaddingWrapper>
  );
}
