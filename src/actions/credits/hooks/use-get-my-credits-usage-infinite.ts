import { isEmpty } from "es-toolkit/compat";

import {
  type GetApiV1CreditsUsageMyQueryParams,
  useGetApiV1CreditsUsageMyInfinite,
} from "@/codegen/api/product";
import { removeUndefinedFields } from "@/shared/utils/remove-undefined-fields";

const DEFAULT_PER_PAGE = 20;

type UseGetMyCreditsUsageInfiniteParams = Pick<
  GetApiV1CreditsUsageMyQueryParams,
  "perPage"
>;

export function useGetMyCreditsUsageInfinite(
  params: UseGetMyCreditsUsageInfiniteParams = {},
) {
  const perPage = params.perPage ?? DEFAULT_PER_PAGE;
  const cleaned = removeUndefinedFields({ perPage });
  const queryParams = isEmpty(cleaned) ? undefined : cleaned;

  const {
    data: creditsUsageItems = [],
    hasNextPage: hasNextCreditsUsagePage,
    isLoading: isCreditsUsageLoading,
    isError: isCreditsUsageError,
    isFetchingNextPage: isFetchingNextCreditsUsagePage,
    fetchNextPage: fetchNextCreditsUsagePage,
  } = useGetApiV1CreditsUsageMyInfinite(
    {
      params: queryParams,
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
