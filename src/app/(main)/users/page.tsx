import { DataTable } from "@components/Table/DataTable";
import PaddingWrapper from "@components/templates/padding-wrapper";

import { columns, User } from "./_components/columns";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://669beb23276e45187d36d75f.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUsers();

  return (
    <PaddingWrapper>
      <h1 className="font-semibold text-3xl my-4">User List</h1>
      <DataTable
        columns={columns}
        data={data}
        isPaginationEnabled={true}
        defaultPageSize={10}
      />
    </PaddingWrapper>
  );
}
