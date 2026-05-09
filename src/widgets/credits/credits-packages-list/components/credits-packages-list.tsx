import { RotateCwIcon } from "lucide-react";
import { useMemo } from "react";

import { CreditsPackageCard } from "@/features/credits/credits-package-card/components/credits-package-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsPackagesList } from "../hooks/use-credits-packages-list";

export function CreditsPackagesList() {
  const {
    creditsPackageViews,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
    isInitiateCreditsPackagePaymentPending,
    handlePurchase,
  } = useCreditsPackagesList();

  const body = useMemo(() => {
    if (isCreditsPackagesLoading) {
      return <CreditsPackagesListSkeleton />;
    }

    if (isCreditsPackagesError) {
      return <CreditsPackagesListError />;
    }

    if (creditsPackageViews.length === 0) {
      return <CreditsPackagesListEmpty />;
    }

    return (
      <>
        {creditsPackageViews.map((view) => (
          <CreditsPackageCard
            key={view.id}
            title={view.title}
            priceLabel={view.priceLabel}
            description={view.description}
            purchaseButtonLabel={view.purchaseButtonLabel}
            isPreferred={view.isPreferred}
            isHighlighted={view.isPreferred}
            isPurchasePending={isInitiateCreditsPackagePaymentPending}
            onPurchase={() => handlePurchase(view.id)}
            metricBadges={view.metricBadgeLabels.map((label) => (
              <Badge key={label} color="neutral" variant="secondary" size="sm">
                {label}
              </Badge>
            ))}
          />
        ))}
      </>
    );
  }, [
    isCreditsPackagesLoading,
    isCreditsPackagesError,
    creditsPackageViews,
    isInitiateCreditsPackagePaymentPending,
    handlePurchase,
  ]);

  return (
    <Island
      grow
      roundedBottom={false}
      roundedTop={false}
      className="gap-2 pt-0"
    >
      {body}
    </Island>
  );
}

export function CreditsPackagesListSkeleton() {
  return (
    <ItemsList
      noParent
      count={4}
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
        <Button icon={<RotateCwIcon />} onClick={reloadPage} className="mt-2">
          Обновить
        </Button>
      }
      className="m-auto"
    />
  );
}

export function CreditsPackagesListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет доступных пакетов"
      description="Здесь появятся операции списания кредитов"
      className="m-auto py-8"
    />
  );
}
