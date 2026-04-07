import { useMemo } from "react";

import { useGetMyCreditsBatches } from "@/actions/credits/hooks/use-get-my-credits-batches";

import { formatCreditsBatchRow } from "../utils/format-credits-batch-row";

export function useCreditsMyBalanceList() {
  const {
    myCreditsBatchesData,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  } = useGetMyCreditsBatches();

  const rows = useMemo(() => {
    const batches = myCreditsBatchesData?.data ?? [];
    return batches.map(formatCreditsBatchRow);
  }, [myCreditsBatchesData?.data]);

  return {
    rows,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  };
}
