import { RotateCwIcon } from "lucide-react";

import { CreditsPackageCard } from "@/features/credits/credits-package-card/components/credits-package-card";
import { CreditsPackagePaymentMethodDialog } from "@/features/credits/credits-package-payment-method-dialog/components/credits-package-payment-method-dialog";
import { ItemsList } from "@/shared/components/common/items-list";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsPackagePurchase } from "../hooks/use-credits-package-purchase";
import { useCreditsPackagesList } from "../hooks/use-credits-packages-list";

type CreditsPackagesListProps = {
  redirect?: string;
};

export function CreditsPackagesList({
  redirect = "/billing/credits",
}: CreditsPackagesListProps) {
  const {
    creditsPackageViews,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  } = useCreditsPackagesList();

  const {
    paymentMethods,
    selectedPackageView,
    handlePurchaseClick,
    handleDialogOpenChange,
    handlePayWithSavedMethod,
    handlePayWithNewCard,
  } = useCreditsPackagePurchase({ redirect });

  if (isCreditsPackagesLoading) {
    return <CreditsPackagesListSkeleton />;
  }

  if (isCreditsPackagesError) {
    return <CreditsPackagesListError />;
  }

  if (!creditsPackageViews.length) {
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
          isPreferred={view.isPreferred}
          button={
            <Button
              variant={view.isPreferred ? "accent" : "neutral"}
              priority={view.isPreferred ? "primary" : "secondary"}
              size="base"
              className="w-full"
              onClick={() => handlePurchaseClick(view)}
            >
              {view.purchaseButtonLabel}
            </Button>
          }
          metricBadges={view.metricBadgeLabels.map((label) => (
            <Badge
              key={label}
              color="neutral"
              variant={view.isPreferred ? "tertiary" : "secondary"}
              size="sm"
            >
              {label}
            </Badge>
          ))}
        />
      ))}
      {selectedPackageView && (
        <CreditsPackagePaymentMethodDialog
          isOpen
          setIsOpen={handleDialogOpenChange}
          packageTitle={selectedPackageView.title}
          packagePriceLabel={selectedPackageView.priceLabel}
          paymentMethods={paymentMethods}
          onPayWithSavedMethod={handlePayWithSavedMethod}
          onPayWithNewCard={handlePayWithNewCard}
        />
      )}
    </>
  );
}

export function CreditsPackagesListSkeleton() {
  return (
    <ItemsList
      noParent
      count={3}
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
      description="Здесь появятся доступные пакеты для покупки"
      className="m-auto py-8"
    />
  );
}
