import { useMemo } from "react";

import { useGetCreditsPackages } from "@/actions/credits/hooks/use-get-credits-packages";
import { useInitiateCreditsPackagePayment } from "@/actions/credits/hooks/use-initiate-credits-package-payment";

import { formatCreditsPackageCard } from "../utils/format-credits-package-card";
import { pickPopularCreditsPackageId } from "../utils/pick-popular-credits-package-id";

export function useCreditsPackagesList() {
  const {
    creditsPackagesData,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  } = useGetCreditsPackages();

  const {
    initiateCreditsPackagePayment,
    isInitiateCreditsPackagePaymentPending,
  } = useInitiateCreditsPackagePayment();

  const purchasablePackages = useMemo(() => {
    const list = creditsPackagesData?.data ?? [];
    return list.filter((pkg) => pkg.forPurchase);
  }, [creditsPackagesData]);

  const popularPackageId = useMemo(
    () => pickPopularCreditsPackageId(creditsPackagesData?.data ?? []),
    [creditsPackagesData],
  );

  const cardViews = useMemo(
    () => purchasablePackages.map(formatCreditsPackageCard),
    [purchasablePackages],
  );

  const handlePurchase = (packageId: string) => {
    initiateCreditsPackagePayment({
      data: {
        creditsPackageId: packageId,
        redirect: `${window.location.origin}/billing/credits`,
      },
    });
  };

  return {
    cardViews,
    purchasablePackages,
    popularPackageId,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
    isInitiateCreditsPackagePaymentPending,
    handlePurchase,
  };
}
