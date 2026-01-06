import { usePrefetchQuery } from "@tanstack/react-query";

import {
  getApiV1PlatformsOptions,
  getApiV1ProfilesMyOptions,
  getApiV1TonesOptions,
  getApiV1VideoDurationsOptions,
  getApiV1VideoTypesOptions,
} from "@/codegen/api/product/@tanstack/react-query.gen";

export function usePrefetchListDialogSubformsData() {
  usePrefetchQuery(getApiV1ProfilesMyOptions());
  usePrefetchQuery(getApiV1PlatformsOptions());
  usePrefetchQuery(getApiV1VideoTypesOptions());
  usePrefetchQuery(getApiV1VideoDurationsOptions());
  usePrefetchQuery(getApiV1TonesOptions());
}
