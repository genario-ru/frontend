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
      className={cn("flex w-full flex-col items-center pt-2 pb-8", className)}
      {...props}
    >
      {children}
    </main>
  );
};
