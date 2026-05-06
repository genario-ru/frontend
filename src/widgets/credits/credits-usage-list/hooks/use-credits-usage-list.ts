import { useMemo } from "react";

import { useGetMyCreditsUsageInfinite } from "@/actions/credits/hooks/use-get-my-credits-usage-infinite";

import { formatCreditsUsageRow } from "../utils/format-credits-usage-row";

export function useCreditsUsageList() {
  const {
    hasNextCreditsUsagePage,
    isFetchingNextCreditsUsagePage,
    creditsUsageItems,
    isCreditsUsageLoading,
    isCreditsUsageError,
    fetchNextCreditsUsagePage,
  } = useGetMyCreditsUsageInfinite();

  const rows = useMemo(
    () => creditsUsageItems.map(formatCreditsUsageRow),
    [creditsUsageItems],
  );

  return {
    rows,
    hasNextCreditsUsagePage,
    isFetchingNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    fetchNextCreditsUsagePage,
  };
}
