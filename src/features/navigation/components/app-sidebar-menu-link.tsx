import type { LinkComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

export const AppSidebarMenuLink = ({
  href,
  className,
  ...props
}: LinkComponentProps) => {
  return (
    <Link
      href={href}
      data-sidebar="menu-link"
      className={cn(
        "text-new-neutral-7 rounded-3 flex w-full flex-col items-center justify-start gap-1 px-3 py-2 font-medium duration-200",
        "[&_svg]:stroke-new-neutral-7 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:duration-200",
        "hover:bg-new-neutral-2 hover:text-new-neutral-8 hover:[&_svg]:stroke-new-neutral-8 active:bg-new-neutral-2 active:text-new-neutral-8 active:[&_svg]:stroke-new-neutral-8",
        className,
      )}
      activeProps={{
        className:
          "text-new-neutral-8 [&_svg]:stroke-new-neutral-8 bg-new-neutral-2",
      }}
      {...props}
    />
  );
};
