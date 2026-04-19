import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const AppSidebarContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-sidebar="content"
      className={cn("flex flex-1 flex-col gap-2 overflow-auto px-2", className)}
      {...props}
    />
  );
};
