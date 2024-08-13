"use client";
import { useRouter } from "next/navigation";

import useAuthUser from "@/hooks/zustand/useAuthUser";
import { Role } from "@/types/enums";

export default function Template({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuthUser();
  const router = useRouter();
  if (authUser?.role == Role.ADMIN) return children;
  else {
    // router.push("/events");
    return <div>Unauthorized</div>;
  }
}
