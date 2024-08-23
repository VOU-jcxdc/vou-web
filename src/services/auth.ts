import { BrandField } from "@/types/enums";

import { apiAuth } from "@/services/kyInstance";
import { AuthUser } from "@/hooks/zustand/useAuthUser";
import { jwtDecode } from "jwt-decode";
import { queryClient } from "@/App";

const delay = 500;
const localStorageTokenKey = "auth_client_token";

export type Session = {
  user?: AuthInfo;
};

export type AuthInfo = {
  access_token: string;
};

export type BrandInfo = {
  name: string;
  field: BrandField;
  address: string;
  location: {
    lng: string;
    lat: string;
  };
};

export type AccountIdentifier = {
  phone: string;
  password: string;
  username: string;
  email: string;
  role: string;
};

type SignInParams = Pick<AccountIdentifier, "phone" | "password">;

export type SignUpParams = AccountIdentifier & {
  data: BrandInfo;
};

export const getAuthUser = () => {
  const authInfo = getAuthValueFromStorage();
  if (authInfo) {
    const decoded = jwtDecode(authInfo.access_token) as AuthUser;
    return decoded;
  }
  return null;
};

export const getAuthValueFromStorage = () => {
  return localStorage.getItem(localStorageTokenKey)
    ? (JSON.parse(localStorage.getItem(localStorageTokenKey) ?? "") as AuthInfo)
    : null;
};

export const signIn = async (params: SignInParams) => {
  const data = (
    await apiAuth.post("auth/sign-in", { json: params }).json<{
      data: AuthInfo;
    }>()
  ).data;
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data;
};

export const signOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.clear();
      resolve(void 0);
    }, delay)
  );
};

export const signUp = async (params: SignUpParams) => {
  return (
    await apiAuth.post("auth/sign-up", { json: params }).json<{
      data: AuthInfo;
    }>()
  ).data;
};
