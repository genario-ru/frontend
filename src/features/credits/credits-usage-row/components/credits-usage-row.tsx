import type { LucideIcon as LucideIconType } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Item } from "@/shared/components/ui/item";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { DOT } from "@/shared/constants/unicode";

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

  const left = useMemo(
    () => (
      <div className="bg-neutral-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <LucideIcon icon={Icon} />
      </div>
    ),
    [Icon],
  );

  const description = useMemo(
    () => (
      <>
        {footerLeft}
        <span className="mx-1">{DOT}</span>
        {formattedDate}
      </>
    ),
    [footerLeft, formattedDate],
  );

  const right = useMemo(
    () => (
      <Badge color="neutral" variant="tertiary" className="ml-auto shrink-0">
        {amountLabel}
      </Badge>
    ),
    [amountLabel],
  );

  const titleContent = useMemo(
    () => (
      <span className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
        {title}
      </span>
    ),
    [title],
  );

  return (
    <Item
      className={className}
      left={left}
      title={titleContent}
      description={description}
      right={right}
    />
  );
}

export function CreditsUsageRowSkeleton() {
  return (
    <Item
      left={<Skeleton className="size-10 shrink-0 rounded-xl" />}
      title={<TextSkeleton fontSize={16} lineHeight={24} className="w-3/4" />}
      description={
        <TextSkeleton fontSize={14} lineHeight={20} className="w-1/2" />
      }
      right={<Skeleton className="rounded-2 h-6 w-16 shrink-0" />}
    />
  );
}
