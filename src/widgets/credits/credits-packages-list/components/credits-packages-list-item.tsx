import { useMemo } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { CreditsPackageCard } from "@/features/credits/credits-package-card/components/credits-package-card";
import { CreditsPackagePaymentMethodDialog } from "@/features/credits/credits-package-payment-method-dialog/components/credits-package-payment-method-dialog";
import { CreditsPackagePaymentMethodDrawer } from "@/features/credits/credits-package-payment-method-dialog/components/credits-package-payment-method-drawer";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

import { useCreditsPackagesListItem } from "../hooks/use-credits-packages-list-item";
import type { CreditsPackageView } from "../utils/format-credits-package-card";

type CreditsPackagesListItemProps = {
  view: CreditsPackageView;
  paymentMethods: PaymentMethodSchema[];
  isMobile: boolean;
  redirect: string;
};

export function CreditsPackagesListItem({
  view,
  paymentMethods,
  isMobile,
  redirect,
}: CreditsPackagesListItemProps) {
  const {
    isPaymentMethodDialogOpen,
    handlePurchaseClick,
    handleDialogOpenChange,
    handlePayWithSavedMethod,
    handlePayWithNewCard,
  } = useCreditsPackagesListItem({ view, paymentMethods, redirect });

  const card = useMemo(() => {
    const buttonVariant = view.isPreferred ? "accent" : "neutral";
    const buttonPriority = view.isPreferred ? "primary" : "secondary";
    const badgeVariant = view.isPreferred ? "tertiary" : "secondary";

    return (
      <CreditsPackageCard
        title={view.title}
        priceLabel={view.priceLabel}
        description={view.description}
        isPreferred={view.isPreferred}
        button={
          <Button
            variant={buttonVariant}
            priority={buttonPriority}
            size="base"
            className="w-full"
            onClick={handlePurchaseClick}
          >
            {view.purchaseButtonLabel}
          </Button>
        }
        metricBadges={view.metricBadgeLabels.map((label) => (
          <Badge key={label} color="neutral" variant={badgeVariant} size="sm">
            {label}
          </Badge>
        ))}
      />
    );
  }, [view, handlePurchaseClick]);

  const paymentMethodDialog = useMemo(() => {
    if (isMobile) {
      return (
        <CreditsPackagePaymentMethodDrawer
          isOpen={isPaymentMethodDialogOpen}
          setIsOpen={handleDialogOpenChange}
          packageTitle={view.title}
          packagePriceLabel={view.priceLabel}
          paymentMethods={paymentMethods}
          onPayWithSavedMethod={handlePayWithSavedMethod}
          onPayWithNewCard={handlePayWithNewCard}
        />
      );
    }

    return (
      <CreditsPackagePaymentMethodDialog
        isOpen={isPaymentMethodDialogOpen}
        setIsOpen={handleDialogOpenChange}
        packageTitle={view.title}
        packagePriceLabel={view.priceLabel}
        paymentMethods={paymentMethods}
        onPayWithSavedMethod={handlePayWithSavedMethod}
        onPayWithNewCard={handlePayWithNewCard}
      />
    );
  }, [
    isMobile,
    view,
    paymentMethods,
    isPaymentMethodDialogOpen,
    handleDialogOpenChange,
    handlePayWithSavedMethod,
    handlePayWithNewCard,
  ]);

  return (
    <>
      {card}
      {paymentMethodDialog}
    </>
  );
}
