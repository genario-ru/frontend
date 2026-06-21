import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type WaitlistLandingPossibilitiesCard = {
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
};

export function WaitlistLandingPossibilitiesCard({
  icon,
  title,
  description,
  disabled,
}: WaitlistLandingPossibilitiesCard) {
  return (
    <div
      className={cn(
        "rounded-4 bg-neutral-1/30 dark:bg-neutral-8/30 flex h-full flex-col gap-3 p-5 sm:p-6",
        {
          "opacity-60": disabled,
        },
      )}
    >
      <div className="flex items-center gap-1.5 [&_svg]:size-6">
        {icon}
        <p className="text-neutral-1 dark:text-neutral-8 text-lg sm:text-xl">
          {title}
        </p>
      </div>
      <p className="text-neutral-1/60 dark:text-neutral-8/60">{description}</p>
    </div>
  );
}
