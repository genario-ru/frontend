import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type MainLayoutProps = ComponentProps<"main">;

export function MainLayout({ className, ...props }: MainLayoutProps) {
  return (
    <main
      className={cn(
        "flex h-full w-full flex-1 flex-col items-center",
        className,
      )}
      {...props}
    />
  );
}
