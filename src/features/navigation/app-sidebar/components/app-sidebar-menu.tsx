import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const AppSidebarMenu = ({
  className,
  ...props
}: ComponentProps<"ul">) => (
  <ul
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-2", className)}
    {...props}
  />
);
