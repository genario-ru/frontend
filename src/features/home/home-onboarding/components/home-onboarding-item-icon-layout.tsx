import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type HomeOnboardingItemIconLayoutProps = ComponentProps<"div">;

export function HomeOnboardingItemIconLayout({
  className,
  ...props
}: HomeOnboardingItemIconLayoutProps) {
  return (
    <div
      className={cn(
        "rounded-3 flex size-10 shrink-0 items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}
