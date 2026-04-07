import { useGetApiV1CreditsBatchesMy } from "@/codegen/api/product";

export function useGetMyCreditsBatches() {
  const {
    data: myCreditsBatchesData,
    isLoading: isMyCreditsBatchesLoading,
    isError: isMyCreditsBatchesError,
  } = useGetApiV1CreditsBatchesMy();

  return {
    myCreditsBatchesData,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  };
}
