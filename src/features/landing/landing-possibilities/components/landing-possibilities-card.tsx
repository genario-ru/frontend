import { ZapIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/cn";

type LandingPossibilitiesCard = {
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  soon?: boolean;
};

export function LandingPossibilitiesCard({
  icon,
  title,
  description,
  disabled,
  soon,
}: LandingPossibilitiesCard) {
  return (
    <div className="relative h-full">
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
        <p className="text-neutral-1/60 dark:text-neutral-8/60">
          {description}
        </p>
      </div>
      {soon && (
        <Badge
          icon={<ZapIcon />}
          color="custom"
          className="bg-neutral-1 dark:bg-neutral-8 text-accent-7 [&_svg]:stroke-accent-7 dark:text-accent-2 dark:[&_svg]:stroke-accent-2 absolute top-3 right-3"
        >
          Скоро
        </Badge>
      )}
    </div>
  );
}
