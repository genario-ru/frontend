import { useInfiniteQuery } from "@tanstack/react-query";

import { getApiV1ArchiveItemsMyInfiniteOptions } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { GetApiV1ArchiveItemsMyData } from "@/codegen/api/product/types.gen";

type UseGetMyArchiveItemsProps = GetApiV1ArchiveItemsMyData["query"] & {};

export function useGetMyArchiveItems(params?: UseGetMyArchiveItemsProps) {
  const queryParams = params ?? {};

  const {
    data: archiveItemsData,
    hasNextPage: hasNextArchiveItemsPage,
    isLoading: isLoadingArchiveItems,
    isError: isErrorArchiveItems,
    fetchNextPage: fetchNextArchiveItemsPage,
  } = useInfiniteQuery({
    ...getApiV1ArchiveItemsMyInfiniteOptions({
      query: queryParams,
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextPage;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.meta.previousPage;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });

  return {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    fetchNextArchiveItemsPage,
  };
}
