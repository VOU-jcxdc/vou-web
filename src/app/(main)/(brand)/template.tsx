"use client";
import { useRouter } from "next/navigation";

import useAuthUser from "@/hooks/zustand/useAuthUser";
import { Role } from "@/types/enums";

export default function Template({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuthUser();
  const router = useRouter();
  if (authUser?.role == Role.BRAND) return children;
  else {
    // router.push("/users");
    return <div>Unauthorized</div>;
  }
}
