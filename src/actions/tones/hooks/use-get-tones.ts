import { useQuery } from "@tanstack/react-query";

import { getApiV1TonesOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetTones() {
  const {
    data: tonesData,
    isLoading: isTonesLoading,
    isError: isTonesError,
  } = useQuery({
    ...getApiV1TonesOptions(),
    select: (data) => data.data,
  });

  return {
    tonesData,
    isTonesLoading,
    isTonesError,
  };
}
