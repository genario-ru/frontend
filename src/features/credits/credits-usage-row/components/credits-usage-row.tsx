import type { LucideIcon as LucideIconType } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { DOT } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

type CreditsUsageRowProps = {
  icon: LucideIconType;
  title: string;
  creditsAmount: number;
  footerLeft: string;
  formattedDate: string;
  className?: string;
};

export function CreditsUsageRow({
  icon: Icon,
  title,
  creditsAmount,
  footerLeft,
  formattedDate,
  className,
}: CreditsUsageRowProps) {
  const amountLabel = `-${Math.abs(creditsAmount).toLocaleString("ru-RU")}`;

  return (
    <Island row className={cn("bg-neutral-2 items-center", className)}>
      <div className="bg-neutral-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <LucideIcon icon={Icon} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
          {title}
        </p>
        <p className="text-neutral-6 text-sm">
          {footerLeft}
          <span className="mx-1">{DOT}</span>
          {formattedDate}
        </p>
      </div>
      <Badge color="neutral" variant="tertiary" className="ml-auto shrink-0">
        {amountLabel}
      </Badge>
    </Island>
  );
}

export function CreditsUsageRowSkeleton() {
  return <Skeleton className="h-[76px] w-full rounded-2xl" />;
}
