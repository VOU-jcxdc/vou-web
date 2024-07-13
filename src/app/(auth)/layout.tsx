import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen sm:pt-10 sm:pb-16 overflow-auto flex flex-col justify-center items-center gap-2 bg-slate-50">
      <div className="w-[30%] sm:w-full h-fit sm:px-2 flex flex-col gap-2">
        <span className="w-fit">
          <Link
            href="/"
            className="py-2 px-4 text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </span>
        {children}
      </div>
    </div>
  );
}
