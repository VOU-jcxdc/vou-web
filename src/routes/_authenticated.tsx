import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import ErrorFallback from "@/components/ErrorFallback";
import { getAuthUser, signOut } from "@/services";
import { authKeys } from "@/hooks/react-query/useAuth";

const AuthenticatedPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context: { queryClient } }) => {
    if (location.href == "/") {
      return redirect({ to: "/users" });
    }
    const user = await queryClient?.ensureQueryData({
      queryKey: authKeys.detail(),
      queryFn: () => getAuthUser(),
      staleTime: Infinity,
    });
    if (!user) {
      signOut();
      return redirect({ to: "/log-in" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AuthenticatedPage,
});
