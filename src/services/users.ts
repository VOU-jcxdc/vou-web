import { PagedData, PagingSchema, PagingSchema } from "@/types";
import { Role } from "@/types/enums";

import api from "./httpRequests";
import { fromPageToOffset, generateSearchParams } from "./utils";

export type User = {
  id: string;
  username: string;
  role: string;
  avatar: string;
  phone: string;
  email: string;
  createdOn: string;
};

export type UpdateUserParams = User;

export const getUsers = async (params: PagingSchema) => {
  const searchParams = generateSearchParams(fromPageToOffset(params));
  return await api.get<
    PagedData & {
      accounts: User[];
    }
  >("admin/users", { searchParams });
};

export const getUser = async (id: string) => {
  return await api.get<User>(`admin/users/${id}`);
};

export const updateUser = async (body: UpdateUserParams) => {
  return await api.put<User>(`users/${body.id}`, { body });
};
