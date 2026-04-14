import { useGetApiV1CreditsUsageMyInfinite } from "@/codegen/api/product";

const DEFAULT_PER_PAGE = 20;

export function useGetMyCreditsUsageInfinite() {
  const {
    data: creditsUsageItems = [],
    hasNextPage: hasNextCreditsUsagePage,
    isLoading: isCreditsUsageLoading,
    isError: isCreditsUsageError,
    isFetchingNextPage: isFetchingNextCreditsUsagePage,
    fetchNextPage: fetchNextCreditsUsagePage,
  } = useGetApiV1CreditsUsageMyInfinite(
    {
      params: {
        perPage: DEFAULT_PER_PAGE,
      },
    },
    {
      query: {
        select: (data) => data.pages.flatMap((page) => page.data),
      },
    },
  );

  return {
    creditsUsageItems,
    hasNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    isFetchingNextCreditsUsagePage,
    fetchNextCreditsUsagePage,
  };
}
