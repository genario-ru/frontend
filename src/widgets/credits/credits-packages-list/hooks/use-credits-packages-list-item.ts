import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";

import type { CreditsPackageView } from "../utils/format-credits-package-card";

type UseCreditsPackagesListItemParams = {
  view: CreditsPackageView;
  paymentMethods: PaymentMethodSchema[];
  redirect: string;
};

export function useCreditsPackagesListItem({
  view,
  paymentMethods,
  redirect,
}: UseCreditsPackagesListItemParams) {
  const navigate = useNavigate();

  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] =
    useState(false);

  const navigateToPaymentRedirect = useCallback(
    (paymentMethodId?: string) => {
      navigate({
        to: "/payment-redirect",
        search: {
          redirect,
          creditsPackageSlug: view.slug,
          paymentMethodId,
        },
      });
    },
    [navigate, redirect, view.slug],
  );

  // Модалка выбора способа оплаты показывается только при наличии хотя бы
  // одного сохраненного способа; иначе сразу переходим к обычному флоу оплаты
  // через ЮКассу.
  const handlePurchaseClick = useCallback(() => {
    if (!paymentMethods.length) {
      navigateToPaymentRedirect();

      return;
    }

    setIsPaymentMethodDialogOpen(true);
  }, [paymentMethods.length, navigateToPaymentRedirect]);

  const handleDialogOpenChange = useCallback((isOpen: boolean) => {
    setIsPaymentMethodDialogOpen(isOpen);
  }, []);

  const handlePayWithSavedMethod = useCallback(
    (paymentMethodId: string) => {
      navigateToPaymentRedirect(paymentMethodId);
    },
    [navigateToPaymentRedirect],
  );

  const handlePayWithNewCard = useCallback(() => {
    navigateToPaymentRedirect();
  }, [navigateToPaymentRedirect]);

  return {
    isPaymentMethodDialogOpen,
    handlePurchaseClick,
    handleDialogOpenChange,
    handlePayWithSavedMethod,
    handlePayWithNewCard,
  };
}
