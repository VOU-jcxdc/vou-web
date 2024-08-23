import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AuthUser } from "@/hooks/zustand/useAuthUser";
import { Role } from "@/types/enums";

import Footer from "@/components/molecules/footer";
import Header from "@/components/organisms/header";
import { authKeys } from "@/hooks/react-query/useAuth";
import ErrorFallback from "@/components/ErrorFallback";

export const Route = createFileRoute("/_authenticated/_admin")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const user = queryClient.getQueryData(authKeys.detail()) as AuthUser | null;
    if (user && user.role !== Role.ADMIN) return redirect({ to: "/events" });
  },
  pendingComponent: () => {
    return <span>Checking permissions</span>;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <>
      <Header />
      <div className="flex h-fit min-h-screen w-full flex-col gap-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
