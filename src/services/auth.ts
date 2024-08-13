import { BrandField, Role } from "@/types/enums";

import api, { apiAuth } from "./httpRequests";

const delay = 500;
const localStorageTokenKey = "auth_client_token";

export type Session = {
  user?: AuthInfo;
};

export type AuthInfo = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
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

export const getAuthValueFromStorage = () => {
  return localStorage.getItem(localStorageTokenKey)
    ? (JSON.parse(localStorage.getItem(localStorageTokenKey) ?? "") as AuthInfo)
    : null;
};

export const signIn = async (params: SignInParams) => {
  const data = await apiAuth.post<AuthInfo>("auth/sign-in", { body: params });
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
  return await apiAuth.post<AuthInfo>("auth/sign-up", { body: params });
};

export const refreshToken = async (refreshToken: string) => {
  const data = await apiAuth.post<AuthInfo>("auth/refresh", {
    body: { refreshToken },
  });
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data.access_token;
};
