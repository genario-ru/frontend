import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const AppSidebarMenuItem = ({
  className,
  ...props
}: ComponentProps<"li">) => (
  <li
    data-sidebar="menu-item"
    className={cn("group/menu-item", className)}
    {...props}
  />
);
