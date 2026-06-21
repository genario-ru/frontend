import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type WaitlistLandingSectionHeaderProps = Omit<
  ComponentProps<"header">,
  "title"
> & {
  badge?: ReactNode;
  title: string;
  description?: string | null;
  inverseColors?: boolean;
  align?: "center" | "left";
};

export function WaitlistLandingSectionHeader({
  badge,
  title,
  description,
  inverseColors,
  align = "center",
  className,
  ...props
}: WaitlistLandingSectionHeaderProps) {
  const isAlignCenter = align === "center";

  return (
    <header
      className={cn(
        "flex max-w-[800px] flex-col gap-3",
        {
          "items-center": isAlignCenter,
        },
        className,
      )}
      {...props}
    >
      {badge}
      <h2
        className={cn("text-2xl font-semibold sm:text-3xl", {
          "text-neutral-8": !inverseColors,
          "text-neutral-1 dark:text-neutral-8": inverseColors,
          "text-center": isAlignCenter,
        })}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("text-base sm:text-lg lg:text-xl", {
            "text-neutral-8/60": !inverseColors,
            "text-neutral-1/60 dark:text-neutral-8/60": inverseColors,
            "text-center": isAlignCenter,
          })}
        >
          {description}
        </p>
      )}
    </header>
  );
}
