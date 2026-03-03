import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type LandingSectionHeader = Omit<ComponentProps<"header">, "title"> & {
  badge?: ReactNode;
  title: string;
  description?: string;
  inverseColors?: boolean;
  align?: "center" | "left";
};

export function LandingSectionHeader({
  badge,
  title,
  description,
  inverseColors,
  align = "center",
  className,
  ...props
}: LandingSectionHeader) {
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
        className={cn("text-3xl font-semibold", {
          "text-neutral-8": !inverseColors,
          "text-neutral-1": inverseColors,
          "text-center": isAlignCenter,
        })}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("text-xl", {
            "text-neutral-8/60": !inverseColors,
            "text-neutral-1/60": inverseColors,
            "text-center": isAlignCenter,
          })}
        >
          {description}
        </p>
      )}
    </header>
  );
}
