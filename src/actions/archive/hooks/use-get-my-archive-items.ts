import { isEmpty } from "es-toolkit/compat";

import {
  type GetApiV1ArchiveItemsMyQueryParams,
  useGetApiV1ArchiveItemsMyInfinite,
} from "@/codegen/api/product";
import { removeUndefinedFields } from "@/shared/utils/remove-undefined-fields";

type UseGetMyArchiveItemsProps = GetApiV1ArchiveItemsMyQueryParams;

export function useGetMyArchiveItems(params: UseGetMyArchiveItemsProps = {}) {
  const cleanedParams = removeUndefinedFields(params);
  const query = isEmpty(cleanedParams) ? undefined : cleanedParams;

  const {
    data: archiveItemsData = [],
    hasNextPage: hasNextArchiveItemsPage,
    isLoading: isLoadingArchiveItems,
    isError: isErrorArchiveItems,
    isFetchingNextPage: isFetchingNextArchiveItemsPage,
    fetchNextPage: fetchNextArchiveItemsPage,
  } = useGetApiV1ArchiveItemsMyInfinite(
    {
      params: query,
    },
    {
      query: {
        select: (data) => {
          return data.pages.flatMap((page) => page.data);
        },
      },
    },
  );

  return {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    isFetchingNextArchiveItemsPage,
    fetchNextArchiveItemsPage,
  };
}
