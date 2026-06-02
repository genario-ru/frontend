import type { ReactNode } from "react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import {
  TariffCardListItem,
  TariffCardListItemSkeleton,
} from "./tariff-card-list-item";
import { TariffPrice } from "./tariff-price";

type TariffMiniCardProps = PropsWithClassName<{
  name: string;
  price: number;
  oldPrice?: number | null;
  features?: string[];
  limitations?: string[];
  action: ReactNode;
}>;

export function TariffMiniCard({
  name,
  price,
  oldPrice,
  features = [],
  limitations = [],
  action,
  className,
}: TariffMiniCardProps) {
  const hasList = features.length + limitations.length > 0;

  return (
    <div
      className={cn(
        "rounded-6 bg-neutral-2 flex flex-col gap-4 p-4",
        className,
      )}
    >
      <header className="flex w-full flex-col gap-2">
        <p className="text-lg font-semibold">{name}</p>
        <TariffPrice price={price} oldPrice={oldPrice} />
      </header>
      {hasList && (
        <ul className="flex w-full flex-col gap-1">
          {features.map((feature, index) => (
            <TariffCardListItem
              key={`tariff-card-${name}-feature-${index}`}
              title={feature}
            />
          ))}
          {limitations.map((feature, index) => (
            <TariffCardListItem
              key={`tariff-card-${name}-limitation-${index}`}
              title={feature}
              negative
            />
          ))}
        </ul>
      )}
      {action}
    </div>
  );
}

export function TariffMiniCardSkeleton({ className }: PropsWithClassName) {
  return (
    <Skeleton className={cn("rounded-6 flex flex-col gap-6 p-6", className)}>
      <header className="flex w-full flex-col gap-3">
        <TextSkeleton fontSize={18} lineHeight={24} className="w-2/3" />
        <TextSkeleton fontSize={24} lineHeight={32} className="w-2/3" />
      </header>
      <ItemsList
        count={8}
        className="w-full gap-2"
        item={<TariffCardListItemSkeleton />}
      />
      <Skeleton className="rounded-4 h-10 w-full" />
    </Skeleton>
  );
}
