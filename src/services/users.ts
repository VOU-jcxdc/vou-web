import { PagedData, PagingSchema } from "@/types";
import { BrandField, UserGender, UserStatus } from "@/types/enums";

import api from "./httpRequests";
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
  return await api.get<
    PagedData & {
      accounts: User[];
    }
  >("admin/users", { searchParams });
};

export const getUser = async (id: string) => {
  return await api.get<User>(`admin/user/${id}`);
};

export const updateUser = async (body: UpdateUserParams) => {
  return await api.put<User>(`admin/user/${body.id}`, { body });
};

export const getUserProfile = async () => {
  return await api.get<User>(`user/profile`);
};

export const updateUserProfile = async (body: UpdateUserParams) => {
  return await api.put<User>(`user/profile`, { body });
};
