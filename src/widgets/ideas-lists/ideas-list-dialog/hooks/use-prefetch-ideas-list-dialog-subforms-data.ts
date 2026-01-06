import { usePrefetchQuery } from "@tanstack/react-query";

import {
  getApiV1PlatformsOptions,
  getApiV1ProfilesMyOptions,
  getApiV1TonesOptions,
  getApiV1VideoTypesOptions,
} from "@/codegen/api/product/@tanstack/react-query.gen";

export function usePrefetchIdeasListDialogSubformsData() {
  usePrefetchQuery(getApiV1ProfilesMyOptions());
  usePrefetchQuery(getApiV1PlatformsOptions());
  usePrefetchQuery(getApiV1VideoTypesOptions());
  usePrefetchQuery(getApiV1TonesOptions());
}
