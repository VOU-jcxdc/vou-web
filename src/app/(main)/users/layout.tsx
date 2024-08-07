import { TooltipProvider } from "@/components/ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <div className="max-w-screen flex min-h-screen w-full flex-row xl:flex-col">
      <TooltipProvider>
        <div className="flex w-full flex-col gap-4 pt-4 sm:pt-2">
          {children}
        </div>
      </TooltipProvider>
    </div>
  );
}
