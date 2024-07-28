import { Role } from "@/types/enums";

import api, { apiAuth } from "./httpRequests";

const delay = 500;
const localStorageTokenKey = "auth_client_token";
const localStorageUserKey = "auth_client_user";

export type Session = {
  user?: AuthInfo;
};

export type AuthInfo = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

type AuthUser = { username: string; phone: string; role: Role };

type SignInParams = {
  username: string;
  password: string;
};

export const getAuthValueFromStorage = () => {
  return localStorage.getItem(localStorageTokenKey)
    ? (JSON.parse(localStorage.getItem(localStorageTokenKey) ?? "") as AuthInfo)
    : null;
};

export const getUserValueFromStorage = () => {
  return localStorage.getItem(localStorageUserKey)
    ? (JSON.parse(localStorage.getItem(localStorageUserKey) ?? "") as AuthUser)
    : null;
};

export const signIn = async (params: SignInParams) => {
  const data = await apiAuth.post<AuthInfo>("auth/login", { body: params });
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
};

export const signOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.clear();
      resolve(void 0);
    }, delay)
  );
};

export const getAuthUser = async () => {
  const data = await api.get<AuthUser>("auth/profile");
  localStorage.setItem(localStorageUserKey, JSON.stringify(data));
  return data;
};

export const refreshToken = async (refreshToken: string) => {
  const data = await apiAuth.post<AuthInfo>("auth/refresh", {
    body: { refreshToken },
  });
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));

  return data.accessToken;
};
