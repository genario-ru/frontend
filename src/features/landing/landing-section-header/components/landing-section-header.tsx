import type { ComponentProps, ReactNode } from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

export type LandingSectionHeaderProps = Omit<
  ComponentProps<"header">,
  "title"
> & {
  badge?: ReactNode;
  title: string;
  description?: string | null;
  inverseColors?: boolean;
  align?: "center" | "left";
};

type LandingSectionHeaderSkeleton = {
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
}: LandingSectionHeaderProps) {
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
          "text-neutral-1 dark:text-neutral-8": inverseColors,
          "text-center": isAlignCenter,
        })}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("text-xl", {
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

export function LandingSectionHeaderSkeleton({
  align = "center",
}: LandingSectionHeaderSkeleton) {
  const isAlignCenter = align === "center";

  return (
    <header
      className={cn("flex w-full max-w-[800px] flex-col gap-3", {
        "items-center": isAlignCenter,
      })}
    >
      <Skeleton className="rounded-3 h-8 w-32" />
      <TextSkeleton fontSize={30} lineHeight={36} className="w-80" />
      <TextSkeleton
        fontSize={20}
        lineHeight={28}
        linesCount={2}
        className="w-full items-center"
        lineClassName="mx-auto"
      />
    </header>
  );
}
