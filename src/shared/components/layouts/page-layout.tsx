import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type PageLayoutProps = ComponentProps<"main">;

export const PageLayout = ({
  className,
  children,
  ...props
}: PageLayoutProps) => {
  return (
    <main
      className={cn(
        "flex w-full max-w-7xl min-w-0 flex-col items-center gap-2 md:pr-8 md:pl-5",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};
