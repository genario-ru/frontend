import { useMemo } from "react";

import { useGetCreditsPackages } from "@/actions/credits/hooks/use-get-credits-packages";
import { useInitiateCreditsPackagePayment } from "@/actions/credits/hooks/use-initiate-credits-package-payment";

import { formatCreditsPackageCard } from "../utils/format-credits-package-card";

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

  const creditsPackageViews = useMemo(
    () => creditsPackagesData?.data?.map(formatCreditsPackageCard) ?? [],
    [creditsPackagesData],
  );

  const handlePurchase = (packageId: string) => {
    initiateCreditsPackagePayment(
      {
        data: {
          creditsPackageId: packageId,
          redirect: `${window.location.origin}/billing/credits`,
        },
      },
      {
        onSuccess: ({ data }) => {
          window.location.href = data.paymentLink;
        },
      },
    );
  };

  return {
    creditsPackageViews,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
    isInitiateCreditsPackagePaymentPending,
    handlePurchase,
  };
}
