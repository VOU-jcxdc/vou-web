import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type PaddingWrapperProps = PropsWithChildren<{
  className?: string;
}>;

const PaddingWrapper = ({ children, className }: PaddingWrapperProps) => {
  return <div className={cn("xs:px-4 relative px-20 md:px-10", className)}>{children}</div>;
};

export default PaddingWrapper;
