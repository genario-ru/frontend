import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

export const AppSidebarMenuLink = ({
  className,
  ...props
}: LinkComponentProps) => {
  return (
    <Link
      data-sidebar="menu-link"
      className={cn(
        "text-neutral-7 rounded-3 flex w-full flex-col items-center justify-start gap-1 px-3 py-2 font-medium duration-200",
        "[&_svg]:stroke-neutral-7 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:duration-200",
        "hover:bg-neutral-2 hover:text-neutral-8 hover:[&_svg]:stroke-neutral-8 active:bg-neutral-2 active:text-neutral-8 active:[&_svg]:stroke-neutral-8",
        className,
      )}
      activeProps={{
        className: "text-neutral-8 [&_svg]:stroke-neutral-8 bg-neutral-2",
      }}
      {...props}
    />
  );
};
