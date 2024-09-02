import ky from "ky";

import { getAuthValueFromStorage, signOut } from "./auth";
import { redirect } from "@tanstack/react-router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const authInfo = getAuthValueFromStorage();
        request.headers.set("Authorization", `Bearer ${authInfo?.access_token}`);
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          signOut();
          throw redirect({ to: "/log-in" });
        }
      },
    ],
  },
});

export const apiAuth = ky.create({ prefixUrl: BASE_URL });

export default api;
