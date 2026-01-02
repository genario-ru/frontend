import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const AppSidebarFooter = ({
  className,
  ...props
}: ComponentProps<"footer">) => {
  return (
    <footer
      data-sidebar="footer"
      className={cn("flex flex-col p-3", className)}
      {...props}
    />
  );
};
