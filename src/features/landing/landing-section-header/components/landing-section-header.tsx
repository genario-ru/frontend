import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type LandingSectionHeader = Omit<ComponentProps<"header">, "title"> & {
  badge: ReactNode;
  title: string;
  description?: string;
  inverseColors?: boolean;
};

export function LandingSectionHeader({
  badge,
  title,
  description,
  inverseColors,
}: LandingSectionHeader) {
  return (
    <header className="flex max-w-[800px] flex-col items-center gap-3">
      {badge}
      <h2
        className={cn("text-center text-3xl font-semibold", {
          "text-neutral-8": !inverseColors,
          "text-neutral-1": inverseColors,
        })}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("text-center text-xl", {
            "text-neutral-8/60": !inverseColors,
            "text-neutral-1/60": inverseColors,
          })}
        >
          {description}
        </p>
      )}
    </header>
  );
}
