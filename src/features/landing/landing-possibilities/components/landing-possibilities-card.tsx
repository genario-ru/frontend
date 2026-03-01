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
    <div className="relative flex-1">
      <div
        className={cn("rounded-4 flex flex-1 flex-col gap-3 p-6", {
          "bg-neutral-1/30": !disabled,
          "bg-neutral-1/15 pointer-events-none": disabled,
        })}
      >
        <div className="flex items-center gap-1.5 [&_svg]:size-6">
          {icon}
          <p className="text-neutral-1 text-xl">{title}</p>
        </div>
        <p className="text-neutral-1/60">{description}</p>
      </div>
      {soon && (
        <Badge
          icon={<ZapIcon />}
          className="text-accent-6 [&_svg]:stroke-accent-6 absolute top-3 right-3"
        >
          Скоро
        </Badge>
      )}
    </div>
  );
}
