import { create } from "zustand";

import { Role } from "@/types/enums";

export type AuthUser = {
  userId: string;
  role: Role;
};

type useAuthUserState = {
  authUser: AuthUser | null;
  setAuthUser: (authUser: AuthUser) => void;
  clearAuthUser: () => void;
};

const useAuthUser = create<useAuthUserState>((set) => ({
  authUser: null,
  setAuthUser: (authUser: AuthUser) => set({ authUser }),
  clearAuthUser: () => set({ authUser: null }),
}));

export default useAuthUser;
