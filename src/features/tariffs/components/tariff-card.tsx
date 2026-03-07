import type { ReactNode } from "react";

import { NBSP, RUBBLE_SIGN, SLASH } from "@/shared/constants/unicode";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import { TariffCardListItem } from "./tariff-card-list-item";

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
        "group/tariff-card rounded-4 bg-neutral-1 flex flex-col gap-6 p-6",
        className,
      )}
    >
      <header className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <p className="group-data-[inverse=true]/tariff-card:text-neutral-1 text-2xl font-semibold">
            {name}
          </p>
          <p className="text-neutral-6 group-data-[inverse=true]/tariff-card:text-neutral-3">
            {description}
          </p>
        </div>
        <div className="w-full">
          <span className="group-data-[inverse=true]/tariff-card:text-neutral-1 text-2xl font-semibold">
            {price}
            {NBSP}
            {RUBBLE_SIGN}
            {NBSP}
            {oldPrice && (
              <span className="text-neutral-6 group-data-[inverse=true]/tariff-card:text-neutral-3 line-through">
                {oldPrice}
                {NBSP}
                {RUBBLE_SIGN}
              </span>
            )}
          </span>
          <span className="text-neutral-6 group-data-[inverse=true]/tariff-card:text-neutral-3">
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
