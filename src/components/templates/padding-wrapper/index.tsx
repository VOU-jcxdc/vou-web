import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type PaddingWrapperProps = PropsWithChildren<{
  className?: string;
}>;

const PaddingWrapper = ({ children, className }: PaddingWrapperProps) => {
  return <div className={cn("relative px-20", className)}>{children}</div>;
};

export default PaddingWrapper;
