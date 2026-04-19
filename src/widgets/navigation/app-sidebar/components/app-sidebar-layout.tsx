import type { ComponentProps } from "react";

import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

export function AppSidebarLayout({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <Island
      grow
      noPadding
      noGap
      data-slot="sidebar"
      className={cn("h-full w-40 justify-between", className)}
      {...props}
    >
      {children}
    </Island>
  );
}
