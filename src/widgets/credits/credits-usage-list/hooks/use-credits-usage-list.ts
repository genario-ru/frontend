import { useMemo } from "react";

import { useGetMyCreditsUsageInfinite } from "@/actions/credits/hooks/use-get-my-credits-usage-infinite";

import { formatCreditsUsageRow } from "../utils/format-credits-usage-row";

export function useCreditsUsageList() {
  const {
    creditsUsageItems,
    hasNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    isFetchingNextCreditsUsagePage,
    fetchNextCreditsUsagePage,
  } = useGetMyCreditsUsageInfinite();

  const rows = useMemo(
    () => creditsUsageItems.map(formatCreditsUsageRow),
    [creditsUsageItems],
  );

  return {
    rows,
    hasNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    isFetchingNextCreditsUsagePage,
    fetchNextCreditsUsagePage,
  };
}
