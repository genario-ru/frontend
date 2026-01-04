import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const AppSidebarHeader = ({
  className,
  ...props
}: ComponentProps<"header">) => {
  return (
    <header
      data-sidebar="header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};
