import { PagedData, PagingSchema } from "@/types";
import { BrandField, UserGender, UserStatus } from "@/types/enums";

import api from "./kyInstance";
import { fromPageToOffset, generateSearchParams } from "./utils";

type UserBaseInfo = {
  id: string;
  username: string;
  phone: string;
  email: string;
  status: UserStatus;
  bucketId: string | null;
  createdOn: string;
  updatedOn: string;
};

export type UserBrand = UserBaseInfo & {
  role: "brand";
  info: {
    id?: string;
    name: string;
    field: BrandField;
    address: string;
    gps: {
      type: string;
      coordinates: number[];
    };
  };
};

export type UserPlayer = UserBaseInfo & {
  role: "player";
  info: {
    id?: string;
    name: string;
    gender: UserGender;
  };
};

export type UserAdmin = UserBaseInfo & {
  role: "admin";
};

export type User = UserBrand | UserPlayer | UserAdmin;

export type UpdateUserParams = Partial<User>;

export const getUsers = async (params: PagingSchema) => {
  const searchParams = generateSearchParams(fromPageToOffset(params));
  return (
    await api.get("admin/users", { searchParams }).json<{
      data: PagedData & {
        accounts: User[];
      };
    }>()
  ).data;
};

export const getUser = async (id: string) => {
  return (await api.get(`admin/user/${id}`).json<{ data: User }>()).data;
};

export const updateUser = async (params: UpdateUserParams) => {
  return (await api.put(`admin/user/${params.id}`, { json: params }).json<{ data: User }>()).data;
};

export const getUserProfile = async () => {
  return (await api.get(`users/profile`).json<{ data: User }>()).data;
};

export const updateUserProfile = async (params: UpdateUserParams) => {
  return (await api.put(`user/profile`, { json: params }).json<{ data: User }>()).data;
};
