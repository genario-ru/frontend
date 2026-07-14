import type { LucideIcon as LucideIconType } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Item } from "@/shared/components/ui/item";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { DOT } from "@/shared/constants/unicode";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

type CreditsUsageRowProps = PropsWithClassName<{
  icon: LucideIconType;
  title: string;
  creditsAmount: number;
  footerLeft: string;
  formattedDate: string;
}>;

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
    <Item
      className={className}
      left={
        <div className="bg-neutral-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <LucideIcon icon={Icon} />
        </div>
      }
      title={
        <span className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
          {title}
        </span>
      }
      description={
        <>
          {footerLeft}
          <span className="mx-1">{DOT}</span>
          {formattedDate}
        </>
      }
      right={
        <Badge color="neutral" variant="tertiary" className="ml-auto shrink-0">
          {amountLabel}
        </Badge>
      }
    />
  );
}

export function CreditsUsageRowSkeleton() {
  return <Skeleton className="h-[76px] w-full rounded-2xl" />;
}
