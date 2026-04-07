import { useMemo } from "react";

import { useGetMyCreditsBatches } from "@/actions/credits/hooks/use-get-my-credits-batches";

export function useCreditsMyBalance() {
  const {
    myCreditsBatchesData,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  } = useGetMyCreditsBatches();

  const totalRemaining = useMemo(() => {
    const batches = myCreditsBatchesData?.data ?? [];
    return batches.reduce((sum, batch) => sum + batch.remainingAmount, 0);
  }, [myCreditsBatchesData?.data]);

  return {
    totalRemaining,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  };
}
