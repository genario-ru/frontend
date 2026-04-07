import { RotateCwIcon } from "lucide-react";

import { CreditsPackageCard } from "@/features/credits/credits-package-card/components/credits-package-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import type { CreditsPackageCardView } from "../utils/format-credits-package-card";

type CreditsPackagesListProps = {
  cardViews: CreditsPackageCardView[];
  popularPackageId: string | null;
  isCreditsPackagesLoading: boolean;
  isCreditsPackagesError: boolean;
  isInitiateCreditsPackagePaymentPending: boolean;
  onPurchase: (packageId: string) => void;
};

export function CreditsPackagesList({
  cardViews,
  popularPackageId,
  isCreditsPackagesLoading,
  isCreditsPackagesError,
  isInitiateCreditsPackagePaymentPending,
  onPurchase,
}: CreditsPackagesListProps) {
  if (isCreditsPackagesLoading) {
    return <CreditsPackagesListSkeleton />;
  }

  if (isCreditsPackagesError) {
    return <CreditsPackagesListError />;
  }

  if (cardViews.length === 0) {
    return <CreditsPackagesListEmpty />;
  }

  return (
    <div className="flex flex-col gap-3">
      {cardViews.map((view) => {
        const isPopular = view.id === popularPackageId;

        return (
          <CreditsPackageCard
            key={view.id}
            title={view.title}
            priceLabel={view.priceLabel}
            description={view.description}
            purchaseButtonLabel={view.purchaseButtonLabel}
            isPopular={isPopular}
            isHighlighted={isPopular}
            isPurchasePending={isInitiateCreditsPackagePaymentPending}
            onPurchase={() => onPurchase(view.id)}
            metricBadges={view.metricBadgeLabels.map((label) => (
              <Badge key={label} color="neutral" variant="secondary" size="sm">
                {label}
              </Badge>
            ))}
          />
        );
      })}
    </div>
  );
}

export function CreditsPackagesListSkeleton() {
  return (
    <ItemsList
      count={2}
      gap={12}
      item={<Skeleton className="min-h-[200px] w-full rounded-2xl" />}
    />
  );
}

export function CreditsPackagesListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить пакеты"
      description="Произошла ошибка при загрузке данных"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
      className="m-auto py-8"
    />
  );
}

export function CreditsPackagesListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет доступных пакетов"
      description="Пакеты для покупки временно недоступны"
      className="m-auto py-8"
    />
  );
}
