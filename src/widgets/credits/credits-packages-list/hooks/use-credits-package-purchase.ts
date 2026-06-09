import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useGetMyPaymentMethods } from "@/actions/billing/hooks/use-get-my-payment-methods";

import type { formatCreditsPackageCard } from "../utils/format-credits-package-card";

type CreditsPackageView = ReturnType<typeof formatCreditsPackageCard>;

type UseCreditsPackagePurchaseParams = {
  redirect: string;
};

export function useCreditsPackagePurchase({
  redirect,
}: UseCreditsPackagePurchaseParams) {
  const navigate = useNavigate();

  const { myPaymentMethodsData } = useGetMyPaymentMethods();
  const paymentMethods = myPaymentMethodsData?.data ?? [];

  // Пакет, для которого открыта модалка выбора способа оплаты
  // (null — модалка закрыта).
  const [selectedPackageView, setSelectedPackageView] =
    useState<CreditsPackageView | null>(null);

  const navigateToPaymentRedirect = (
    creditsPackageSlug: string,
    paymentMethodId?: string,
  ) => {
    navigate({
      to: "/payment-redirect",
      search: {
        redirect,
        creditsPackageSlug,
        paymentMethodId,
      },
    });
  };

  // Модалка выбора способа оплаты показывается только при наличии хотя бы
  // одного сохраненного способа; иначе сразу переходим к обычному флоу оплаты
  // через ЮКассу.
  const handlePurchaseClick = (view: CreditsPackageView) => {
    if (!paymentMethods.length) {
      navigateToPaymentRedirect(view.slug);

      return;
    }

    setSelectedPackageView(view);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedPackageView(null);
    }
  };

  const handlePayWithSavedMethod = (paymentMethodId: string) => {
    if (!selectedPackageView) {
      return;
    }

    navigateToPaymentRedirect(selectedPackageView.slug, paymentMethodId);
  };

  const handlePayWithNewCard = () => {
    if (!selectedPackageView) {
      return;
    }

    navigateToPaymentRedirect(selectedPackageView.slug);
  };

  return {
    paymentMethods,
    selectedPackageView,
    handlePurchaseClick,
    handleDialogOpenChange,
    handlePayWithSavedMethod,
    handlePayWithNewCard,
  };
}
