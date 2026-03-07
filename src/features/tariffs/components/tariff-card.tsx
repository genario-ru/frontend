import type { ReactNode } from "react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { NBSP, RUBBLE_SIGN, SLASH } from "@/shared/constants/unicode";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import {
  TariffCardListItem,
  TariffCardListItemSkeleton,
} from "./tariff-card-list-item";

type TariffCardProps = PropsWithClassName<{
  name: string;
  description: string | null;
  price: number;
  oldPrice?: number | null;
  features?: string[];
  limitations?: string[];
  inverseColors?: boolean;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
}>;

export function TariffCard({
  name,
  description,
  price,
  oldPrice,
  features = [],
  limitations = [],
  inverseColors = false,
  primaryAction,
  secondaryAction,
  className,
}: TariffCardProps) {
  const hasList = features.length + limitations.length > 0;

  return (
    <div
      data-inverse={inverseColors}
      className={cn(
        "group/tariff-card rounded-6 bg-neutral-1 flex flex-col gap-6 p-6",
        className,
      )}
    >
      <header className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <p className="group-data-[inverse=true]/tariff-card:text-neutral-1 text-2xl font-semibold">
            {name}
          </p>
          <p className="text-neutral-8/70 group-data-[inverse=true]/tariff-card:text-neutral-1/70">
            {description}
          </p>
        </div>
        <div className="w-full">
          <span className="text-2xl font-semibold">
            <span className="group-data-[inverse=true]/tariff-card:text-neutral-1">
              {price}
              {NBSP}
              {RUBBLE_SIGN}
              {NBSP}
            </span>
            {oldPrice && (
              <span className="text-neutral-8/50 group-data-[inverse=true]/tariff-card:text-neutral-1/50 line-through">
                {oldPrice}
                {NBSP}
                {RUBBLE_SIGN}
              </span>
            )}
          </span>
          <span className="text-neutral-8/70 group-data-[inverse=true]/tariff-card:text-neutral-1/70">
            {SLASH}
            мес
          </span>
        </div>
      </header>
      <div className="flex flex-col items-center gap-2">
        {primaryAction}
        {secondaryAction}
      </div>
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
    </div>
  );
}

export function TariffCardSkeleton({ className }: PropsWithClassName) {
  return (
    <Skeleton className={cn("rounded-6 flex flex-col gap-6 p-6", className)}>
      <header className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <TextSkeleton fontSize={24} lineHeight={32} className="w-2/3" />
          <TextSkeleton fontSize={16} lineHeight={24} linesCount={2} />
        </div>
        <TextSkeleton fontSize={24} lineHeight={32} className="w-2/3" />
      </header>
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="rounded-4 h-15 w-full" />
        <TextSkeleton
          fontSize={16}
          lineHeight={24}
          lineClassName="mx-auto w-2/3"
        />
      </div>
      <ItemsList
        count={8}
        className="w-full gap-2"
        item={<TariffCardListItemSkeleton />}
      />
    </Skeleton>
  );
}
