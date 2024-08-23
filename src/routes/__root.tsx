import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <main>
      <Outlet />
      <Suspense />
    </main>
  ),
});
