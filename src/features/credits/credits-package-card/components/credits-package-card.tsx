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
  isPreferred,
  isPurchasePending,
  onPurchase,
}: CreditsPackageCardProps) {
  return (
    <div
      className={cn(
        "border-neutral-3 bg-neutral-1 flex flex-col gap-3 rounded-2xl border p-4",
        {
          "bg-neutral-2 border-transparent": isPreferred,
        },
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-lg font-semibold whitespace-nowrap">
            {priceLabel}
          </p>
        </div>
        {description && <p className="text-neutral-6 text-sm">{description}</p>}
      </div>
      <div className="flex flex-wrap gap-1">
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
        {metricBadges}
      </div>
      <Button
        variant={isPreferred ? "accent" : "neutral"}
        priority={isPreferred ? "primary" : "secondary"}
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
