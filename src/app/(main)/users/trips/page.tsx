import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";

import { columns, User } from "@/app/(main)/users/trips/Components/Columns";
import { Button } from "@/components/ui/button";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUsers();

  return (
    <section className="px-4 sm:px-2">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="my-2 text-2xl font-medium">All trips</h1>
        <Link href="#">
          <Button>Create new trip</Button>
        </Link>
      </div>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          isPaginationEnabled={true}
          defaultPageSize={10}
        />
      )}
    </section>
  );
}
