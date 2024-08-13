"use client";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import useAuthUser, { AuthUser } from "@/hooks/zustand/useAuthUser";
import { AuthInfo } from "@/services/auth";

const localStorageTokenKey = "auth_client_token";

export default function Template({ children }: { children: React.ReactNode }) {
  const { setAuthUser, clearAuthUser } = useAuthUser();
  const [accessToken] = useLocalStorage<AuthInfo | null>(
    localStorageTokenKey,
    null
  );
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      const decoded = jwt.decode(accessToken.access_token) as AuthUser;
      setAuthUser(decoded);
    } else {
      clearAuthUser();
    }
  }, [accessToken]);

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
