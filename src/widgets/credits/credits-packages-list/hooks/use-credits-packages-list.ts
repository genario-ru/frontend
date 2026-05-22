import { useMemo } from "react";

import { useGetCreditsPackages } from "@/actions/credits/hooks/use-get-credits-packages";

import { formatCreditsPackageCard } from "../utils/format-credits-package-card";

export function useCreditsPackagesList() {
  const {
    creditsPackagesData,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  } = useGetCreditsPackages();

  const creditsPackageViews = useMemo(
    () => creditsPackagesData?.data?.map(formatCreditsPackageCard) ?? [],
    [creditsPackagesData],
  );

  return {
    creditsPackageViews,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  };
}
