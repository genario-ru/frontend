import { useMemo } from "react";

import { useGetMyPaymentMethods } from "@/actions/billing/hooks/use-get-my-payment-methods";
import { useGetCreditsPackages } from "@/actions/credits/hooks/use-get-credits-packages";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { formatCreditsPackageCard } from "../utils/format-credits-package-card";

export function useCreditsPackagesList() {
  const { isMobile } = useBreakpoints();

  const {
    creditsPackagesData,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  } = useGetCreditsPackages();

  const { myPaymentMethodsData, isMyPaymentMethodsLoading } =
    useGetMyPaymentMethods();

  const creditsPackageViews = useMemo(
    () => creditsPackagesData?.data?.map(formatCreditsPackageCard) ?? [],
    [creditsPackagesData],
  );

  const paymentMethods = useMemo(
    () => myPaymentMethodsData?.data ?? [],
    [myPaymentMethodsData],
  );

  return {
    isMobile,
    paymentMethods,
    creditsPackageViews,
    isCreditsPackagesLoading,
    isMyPaymentMethodsLoading,
    isCreditsPackagesError,
  };
}
