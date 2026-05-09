import { StarIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

type CreditsPackageCardProps = {
  title: string;
  priceLabel: string;
  description: string | null;
  metricBadges: ReactNode;
  purchaseButtonLabel: string;
  isHighlighted: boolean;
  isPreferred: boolean;
  isPurchasePending: boolean;
  onPurchase: () => void;
};

export function CreditsPackageCard({
  title,
  priceLabel,
  description,
  metricBadges,
  purchaseButtonLabel,
  isHighlighted,
  isPreferred,
  isPurchasePending,
  onPurchase,
}: CreditsPackageCardProps) {
  return (
    <div
      className={cn(
        "border-neutral-3 bg-neutral-1 flex flex-col gap-3 rounded-2xl border p-4",
        {
          "ring-accent-6 border-transparent ring-2": isHighlighted,
        },
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">{title}</span>
          {isPreferred && (
            <Badge
              color="custom"
              customColor="var(--color-accent-6)"
              size="sm"
              icon={<StarIcon />}
              className="w-fit"
            >
              Самый популярный
            </Badge>
          )}
        </div>
        <span className="text-lg font-semibold whitespace-nowrap">
          {priceLabel}
        </span>
      </div>
      {description && <p className="text-neutral-6 text-sm">{description}</p>}
      <div className="flex flex-wrap gap-2">{metricBadges}</div>
      <Button
        variant={isHighlighted ? "accent" : "neutral"}
        priority={isHighlighted ? "primary" : "secondary"}
        size="base"
        className="w-full"
        state={isPurchasePending ? "loading" : "default"}
        onClick={onPurchase}
      >
        {purchaseButtonLabel}
      </Button>
    </div>
  );
}
