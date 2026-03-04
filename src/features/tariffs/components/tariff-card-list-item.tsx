import { CheckIcon, CrossIcon } from "lucide-react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

type TariffCardListItem = {
  title: string;
  negative?: boolean;
};

export function TariffCardListItem({
  title,
  negative = false,
}: TariffCardListItem) {
  const Icon = negative ? CrossIcon : CheckIcon;

  return (
    <li className="flex items-center gap-2">
      <LucideIcon
        size="sm"
        icon={Icon}
        className={cn({
          "stroke-positive-6 group-data-[inverse=true]/tariff-card:stroke-positive-4":
            !negative,
          "stroke-neutral-6 group-data-[inverse=true]/tariff-card:stroke-neutral-3":
            negative,
        })}
      />
      <span className="stroke-neutral-6 group-data-[inverse=true]/tariff-card:stroke-neutral-3">
        {title}
      </span>
    </li>
  );
}
