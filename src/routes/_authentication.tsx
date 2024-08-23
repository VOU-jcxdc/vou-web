import { ChevronLeft } from "lucide-react";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication")({
  component: AuthLayout,
});

export default function AuthLayout() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 overflow-auto bg-slate-50 sm:pb-16 sm:pt-10">
      <div className="flex h-fit w-[30%] flex-col gap-2 lg:w-[50%] sm:w-full sm:px-2">
        <span className="w-fit">
          <p
            onClick={() => {
              router.history.back();
            }}
            className="group flex items-center bg-btn-background px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:cursor-pointer hover:bg-btn-background-hover hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </p>
        </span>
        <Outlet />
      </div>
    </div>
  );
}
