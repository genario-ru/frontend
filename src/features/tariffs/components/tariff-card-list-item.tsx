import { CheckIcon, XIcon } from "lucide-react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

type TariffCardListItem = {
  title: string;
  negative?: boolean;
};

export function TariffCardListItem({
  title,
  negative = false,
}: TariffCardListItem) {
  const Icon = negative ? XIcon : CheckIcon;

  return (
    <li className="flex gap-2">
      <LucideIcon
        size="sm"
        icon={Icon}
        className={cn("stroke-neutral-6 mt-0.5", {
          "stroke-positive-6 group-data-[inverse=true]/tariff-card:stroke-positive-4":
            !negative,
          "group-data-[inverse=true]/tariff-card:stroke-neutral-3": negative,
        })}
      />
      <span className="text-neutral-7 group-data-[inverse=true]/tariff-card:text-neutral-3">
        {title}
      </span>
    </li>
  );
}

export function TariffCardListItemSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="rounded-1.5 size-5" />
      <TextSkeleton fontSize={16} lineHeight={24} className="w-3/4" />
    </div>
  );
}
